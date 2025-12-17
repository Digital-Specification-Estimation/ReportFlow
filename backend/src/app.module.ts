import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { SectionsModule } from './sections/sections.module';
import { SectionContentModule } from './section-content/section-content.module';
import { AssetsModule } from './assets/assets.module';
import { TemplatesModule } from './templates/templates.module';
import { ExportModule } from './export/export.module';
import { AuditLogModule } from './audit-log/audit-log.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.THROTTLE_TTL) || 60,
        limit: parseInt(process.env.THROTTLE_LIMIT) || 10,
      },
    ]),
    PrismaModule,
    AuthModule,
    UsersModule,
    ReportsModule,
    SectionsModule,
    SectionContentModule,
    AssetsModule,
    TemplatesModule,
    ExportModule,
    AuditLogModule,
  ],
})
export class AppModule {}
