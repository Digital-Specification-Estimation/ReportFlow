import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { StorageService } from './storage.service';

@Injectable()
export class AssetsService {
  constructor(
    private prisma: PrismaService,
    private auditLog: AuditLogService,
    private storage: StorageService,
  ) {}

  async uploadAsset(
    reportId: string,
    file: Express.Multer.File,
    userId: string,
    sectionId?: string,
  ) {
    const report = await this.prisma.report.findUnique({
      where: { id: reportId },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    const storagePath = await this.storage.uploadFile(file, `reports/${reportId}`);

    const asset = await this.prisma.asset.create({
      data: {
        reportId,
        sectionId: sectionId || null,
        fileName: file.originalname,
        storagePath,
        mimeType: file.mimetype,
        size: file.size,
      },
    });

    await this.auditLog.log({
      userId,
      action: 'UPLOAD_ASSET',
      objectType: 'Asset',
      objectId: asset.id,
      meta: { reportId, fileName: file.originalname },
    });

    return asset;
  }

  async findByReport(reportId: string) {
    return this.prisma.asset.findMany({
      where: { reportId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySection(sectionId: string) {
    return this.prisma.asset.findMany({
      where: { sectionId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const asset = await this.prisma.asset.findUnique({
      where: { id },
    });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    return asset;
  }

  async getSignedUrl(id: string) {
    const asset = await this.findOne(id);
    const url = await this.storage.getSignedUrl(asset.storagePath);

    return { url, asset };
  }

  async remove(id: string, userId: string) {
    const asset = await this.findOne(id);

    await this.storage.deleteFile(asset.storagePath);

    await this.prisma.asset.delete({
      where: { id },
    });

    await this.auditLog.log({
      userId,
      action: 'DELETE_ASSET',
      objectType: 'Asset',
      objectId: id,
      meta: { fileName: asset.fileName },
    });

    return { message: 'Asset deleted successfully' };
  }
}
