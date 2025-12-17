import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { ReorderSectionsDto } from './dto/reorder-sections.dto';

@Injectable()
export class SectionsService {
  constructor(
    private prisma: PrismaService,
    private auditLog: AuditLogService,
  ) {}

  async create(reportId: string, createSectionDto: CreateSectionDto, userId: string) {
    const report = await this.prisma.report.findUnique({
      where: { id: reportId },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    const maxOrder = await this.prisma.section.findFirst({
      where: { reportId, parentId: createSectionDto.parentId || null },
      orderBy: { orderIndex: 'desc' },
    });

    const section = await this.prisma.section.create({
      data: {
        ...createSectionDto,
        reportId,
        orderIndex: maxOrder ? maxOrder.orderIndex + 1 : 0,
      },
      include: {
        children: true,
      },
    });

    await this.auditLog.log({
      userId,
      action: 'CREATE_SECTION',
      objectType: 'Section',
      objectId: section.id,
      meta: { reportId, title: section.title },
    });

    return section;
  }

  async findByReport(reportId: string) {
    const sections = await this.prisma.section.findMany({
      where: { reportId },
      include: {
        children: {
          orderBy: { orderIndex: 'asc' },
        },
        content: {
          orderBy: { version: 'desc' },
          take: 1,
        },
      },
      orderBy: { orderIndex: 'asc' },
    });

    return this.buildTree(sections);
  }

  private buildTree(sections: any[]) {
    const map = new Map();
    const roots = [];

    sections.forEach((section) => {
      map.set(section.id, { ...section, children: [] });
    });

    sections.forEach((section) => {
      const node = map.get(section.id);
      if (section.parentId) {
        const parent = map.get(section.parentId);
        if (parent) {
          parent.children.push(node);
        }
      } else {
        roots.push(node);
      }
    });

    return roots;
  }

  async findOne(id: string) {
    const section = await this.prisma.section.findUnique({
      where: { id },
      include: {
        children: {
          orderBy: { orderIndex: 'asc' },
        },
        content: {
          orderBy: { version: 'desc' },
          take: 1,
        },
        assets: true,
      },
    });

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    return section;
  }

  async update(id: string, updateSectionDto: UpdateSectionDto, userId: string) {
    await this.findOne(id);

    const section = await this.prisma.section.update({
      where: { id },
      data: updateSectionDto,
      include: {
        children: true,
      },
    });

    await this.auditLog.log({
      userId,
      action: 'UPDATE_SECTION',
      objectType: 'Section',
      objectId: id,
      meta: updateSectionDto,
    });

    return section;
  }

  async reorder(reportId: string, reorderDto: ReorderSectionsDto, userId: string) {
    const { sections } = reorderDto;

    await this.prisma.$transaction(
      sections.map((item) =>
        this.prisma.section.update({
          where: { id: item.id },
          data: {
            orderIndex: item.orderIndex,
            parentId: item.parentId || null,
          },
        }),
      ),
    );

    await this.auditLog.log({
      userId,
      action: 'REORDER_SECTIONS',
      objectType: 'Section',
      objectId: reportId,
      meta: { count: sections.length },
    });

    return { message: 'Sections reordered successfully' };
  }

  async remove(id: string, userId: string) {
    const section = await this.findOne(id);

    await this.prisma.section.delete({
      where: { id },
    });

    await this.auditLog.log({
      userId,
      action: 'DELETE_SECTION',
      objectType: 'Section',
      objectId: id,
      meta: { title: section.title },
    });

    return { message: 'Section deleted successfully' };
  }
}
