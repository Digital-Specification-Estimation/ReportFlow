import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { PdfService } from './pdf.service';
import { WordService } from './word.service';

@Injectable()
export class ExportService {
  constructor(
    private prisma: PrismaService,
    private auditLog: AuditLogService,
    private pdfService: PdfService,
    private wordService: WordService,
  ) {}

  async exportReport(reportId: string, format: 'pdf' | 'docx', userId: string) {
    const report = await this.prisma.report.findUnique({
      where: { id: reportId },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        sections: {
          orderBy: { orderIndex: 'asc' },
          include: {
            content: {
              orderBy: { version: 'desc' },
              take: 1,
            },
            assets: true,
          },
        },
        assets: true,
      },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    let buffer: Buffer;
    let filename: string;
    let mimeType: string;

    if (format === 'pdf') {
      buffer = await this.pdfService.generatePdf(report);
      filename = `${report.title.replace(/[^a-z0-9]/gi, '_')}.pdf`;
      mimeType = 'application/pdf';
    } else {
      buffer = await this.wordService.generateDocx(report);
      filename = `${report.title.replace(/[^a-z0-9]/gi, '_')}.docx`;
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }

    await this.auditLog.log({
      userId,
      action: 'EXPORT_REPORT',
      objectType: 'Report',
      objectId: reportId,
      meta: { format, filename },
    });

    return {
      buffer,
      filename,
      mimeType,
    };
  }

  async exportSection(sectionId: string, format: 'pdf' | 'docx', userId: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: {
        content: {
          orderBy: { version: 'desc' },
          take: 1,
        },
        assets: true,
        report: true,
      },
    });

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    let buffer: Buffer;
    let filename: string;
    let mimeType: string;

    if (format === 'pdf') {
      buffer = await this.pdfService.generateSectionPdf(section);
      filename = `${section.title.replace(/[^a-z0-9]/gi, '_')}.pdf`;
      mimeType = 'application/pdf';
    } else {
      buffer = await this.wordService.generateSectionDocx(section);
      filename = `${section.title.replace(/[^a-z0-9]/gi, '_')}.docx`;
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }

    await this.auditLog.log({
      userId,
      action: 'EXPORT_SECTION',
      objectType: 'Section',
      objectId: sectionId,
      meta: { format, filename },
    });

    return {
      buffer,
      filename,
      mimeType,
    };
  }
}
