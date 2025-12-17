import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { SectionsModule } from '../sections/sections.module';
import { AuditLogModule } from '../audit-log/audit-log.module';

@Module({
  imports: [SectionsModule, AuditLogModule],
  providers: [TemplatesService],
  controllers: [TemplatesController],
  exports: [TemplatesService],
})
export class TemplatesModule {}
