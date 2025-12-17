import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class ReportsService {
  constructor(
    private prisma: PrismaService,
    private auditLog: AuditLogService,
  ) {}

  async create(createReportDto: CreateReportDto, userId: string) {
    const report = await this.prisma.report.create({
      data: {
        ...createReportDto,
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
      action: 'CREATE_REPORT',
      objectType: 'Report',
      objectId: report.id,
      meta: { title: report.title },
    });

    return report;
  }

  async findAll(userId: string, userRole: UserRole) {
    const where = userRole === UserRole.ADMIN ? {} : { createdById: userId };

    return this.prisma.report.findMany({
      where,
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            sections: true,
            assets: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string, userRole: UserRole) {
    const report = await this.prisma.report.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        sections: {
          orderBy: {
            orderIndex: 'asc',
          },
        },
        assets: true,
      },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    if (userRole !== UserRole.ADMIN && report.createdById !== userId) {
      throw new ForbiddenException('You do not have access to this report');
    }

    return report;
  }

  async update(id: string, updateReportDto: UpdateReportDto, userId: string, userRole: UserRole) {
    const report = await this.findOne(id, userId, userRole);

    if (userRole !== UserRole.ADMIN && report.createdById !== userId) {
      throw new ForbiddenException('You can only update your own reports');
    }

    const updated = await this.prisma.report.update({
      where: { id },
      data: updateReportDto,
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
      action: 'UPDATE_REPORT',
      objectType: 'Report',
      objectId: id,
      meta: updateReportDto,
    });

    return updated;
  }

  async remove(id: string, userId: string, userRole: UserRole) {
    const report = await this.findOne(id, userId, userRole);

    if (userRole !== UserRole.ADMIN && report.createdById !== userId) {
      throw new ForbiddenException('You can only delete your own reports');
    }

    await this.prisma.report.delete({
      where: { id },
    });

    await this.auditLog.log({
      userId,
      action: 'DELETE_REPORT',
      objectType: 'Report',
      objectId: id,
      meta: { title: report.title },
    });

    return { message: 'Report deleted successfully' };
  }
}
