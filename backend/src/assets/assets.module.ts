import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { AuditLogModule } from '../audit-log/audit-log.module';
import { StorageService } from './storage.service';

@Module({
  imports: [AuditLogModule],
  providers: [AssetsService, StorageService],
  controllers: [AssetsController],
  exports: [AssetsService],
})
export class AssetsModule {}
