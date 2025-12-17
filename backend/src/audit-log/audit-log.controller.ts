import { Controller, Get, Query, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@Controller('audit-logs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 50,
  ) {
    return this.auditLogService.findAll(page, limit);
  }

  @Get('user/:userId')
  @Roles(UserRole.ADMIN)
  findByUser(
    @Param('userId') userId: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 50,
  ) {
    return this.auditLogService.findByUser(userId, page, limit);
  }

  @Get('me')
  findMyLogs(
    @CurrentUser() user: any,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 50,
  ) {
    return this.auditLogService.findByUser(user.id, page, limit);
  }

  @Get('object/:objectType/:objectId')
  findByObject(@Param('objectType') objectType: string, @Param('objectId') objectId: string) {
    return this.auditLogService.findByObject(objectType, objectId);
  }
}
