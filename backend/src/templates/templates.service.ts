import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { ApplyTemplateDto } from './dto/apply-template.dto';

@Injectable()
export class TemplatesService {
  constructor(
    private prisma: PrismaService,
    private auditLog: AuditLogService,
  ) {}

  async create(createTemplateDto: CreateTemplateDto, userId: string) {
    const template = await this.prisma.template.create({
      data: createTemplateDto,
    });

    await this.auditLog.log({
      userId,
      action: 'CREATE_TEMPLATE',
      objectType: 'Template',
      objectId: template.id,
      meta: { name: template.name },
    });

    return template;
  }

  async findAll() {
    return this.prisma.template.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const template = await this.prisma.template.findUnique({
      where: { id },
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    return template;
  }

  async update(id: string, updateTemplateDto: UpdateTemplateDto, userId: string) {
    await this.findOne(id);

    const template = await this.prisma.template.update({
      where: { id },
      data: updateTemplateDto,
    });

    await this.auditLog.log({
      userId,
      action: 'UPDATE_TEMPLATE',
      objectType: 'Template',
      objectId: id,
      meta: updateTemplateDto,
    });

    return template;
  }

  async remove(id: string, userId: string) {
    const template = await this.findOne(id);

    await this.prisma.template.delete({
      where: { id },
    });

    await this.auditLog.log({
      userId,
      action: 'DELETE_TEMPLATE',
      objectType: 'Template',
      objectId: id,
      meta: { name: template.name },
    });

    return { message: 'Template deleted successfully' };
  }

  async applyToReport(reportId: string, applyDto: ApplyTemplateDto, userId: string) {
    const template = await this.findOne(applyDto.templateId);
    const report = await this.prisma.report.findUnique({
      where: { id: reportId },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    const templateData = template.templateJson as any;
    const sections = templateData.sections || [];

    for (const sectionData of sections) {
      await this.prisma.section.create({
        data: {
          reportId,
          slug: sectionData.slug,
          title: sectionData.title,
          type: sectionData.type || 'TEXT',
          orderIndex: sectionData.orderIndex || 0,
          metadata: sectionData.metadata || {},
        },
      });
    }

    await this.auditLog.log({
      userId,
      action: 'APPLY_TEMPLATE',
      objectType: 'Template',
      objectId: template.id,
      meta: { reportId, templateName: template.name },
    });

    return { message: 'Template applied successfully', sectionsCreated: sections.length };
  }
}
