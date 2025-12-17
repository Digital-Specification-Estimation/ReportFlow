import { Module } from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';
import { PdfService } from './pdf.service';
import { WordService } from './word.service';
import { AuditLogModule } from '../audit-log/audit-log.module';

@Module({
  imports: [AuditLogModule],
  providers: [ExportService, PdfService, WordService],
  controllers: [ExportController],
  exports: [ExportService],
})
export class ExportModule {}
