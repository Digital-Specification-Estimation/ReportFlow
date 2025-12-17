import { Module } from '@nestjs/common';
import { SectionContentService } from './section-content.service';
import { SectionContentController } from './section-content.controller';
import { AuditLogModule } from '../audit-log/audit-log.module';

@Module({
  imports: [AuditLogModule],
  providers: [SectionContentService],
  controllers: [SectionContentController],
  exports: [SectionContentService],
})
export class SectionContentModule {}
