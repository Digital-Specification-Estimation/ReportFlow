import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { CreateContentDto } from './dto/create-content.dto';

@Injectable()
export class SectionContentService {
  constructor(
    private prisma: PrismaService,
    private auditLog: AuditLogService,
  ) {}

  async getLatestContent(sectionId: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
    });

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    const content = await this.prisma.sectionContent.findFirst({
      where: { sectionId },
      orderBy: { version: 'desc' },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return content;
  }

  async createVersion(sectionId: string, createContentDto: CreateContentDto, userId: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
    });

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    const latestContent = await this.prisma.sectionContent.findFirst({
      where: { sectionId },
      orderBy: { version: 'desc' },
    });

    const newVersion = latestContent ? latestContent.version + 1 : 1;

    const content = await this.prisma.sectionContent.create({
      data: {
        sectionId,
        version: newVersion,
        format: createContentDto.format,
        content: createContentDto.content,
        createdById: userId,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    await this.auditLog.log({
      userId,
      action: 'CREATE_CONTENT_VERSION',
      objectType: 'SectionContent',
      objectId: content.id,
      meta: { sectionId, version: newVersion },
    });

    return content;
  }

  async getHistory(sectionId: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
    });

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    return this.prisma.sectionContent.findMany({
      where: { sectionId },
      orderBy: { version: 'desc' },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async getVersion(sectionId: string, version: number) {
    const content = await this.prisma.sectionContent.findUnique({
      where: {
        sectionId_version: {
          sectionId,
          version,
        },
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!content) {
      throw new NotFoundException('Content version not found');
    }

    return content;
  }

  async rollback(sectionId: string, version: number, userId: string) {
    const oldContent = await this.getVersion(sectionId, version);

    const latestContent = await this.prisma.sectionContent.findFirst({
      where: { sectionId },
      orderBy: { version: 'desc' },
    });

    const newVersion = latestContent ? latestContent.version + 1 : 1;

    const content = await this.prisma.sectionContent.create({
      data: {
        sectionId,
        version: newVersion,
        format: oldContent.format,
        content: oldContent.content,
        createdById: userId,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    await this.auditLog.log({
      userId,
      action: 'ROLLBACK_CONTENT',
      objectType: 'SectionContent',
      objectId: content.id,
      meta: { sectionId, rolledBackTo: version, newVersion },
    });

    return content;
  }
}
