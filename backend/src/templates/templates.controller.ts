import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { ApplyTemplateDto } from './dto/apply-template.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@Controller('templates')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  create(@Body() createTemplateDto: CreateTemplateDto, @CurrentUser() user: any) {
    return this.templatesService.create(createTemplateDto, user.id);
  }

  @Get()
  findAll() {
    return this.templatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templatesService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  update(
    @Param('id') id: string,
    @Body() updateTemplateDto: UpdateTemplateDto,
    @CurrentUser() user: any,
  ) {
    return this.templatesService.update(id, updateTemplateDto, user.id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.templatesService.remove(id, user.id);
  }

  @Post('apply/:reportId')
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  applyToReport(
    @Param('reportId') reportId: string,
    @Body() applyDto: ApplyTemplateDto,
    @CurrentUser() user: any,
  ) {
    return this.templatesService.applyToReport(reportId, applyDto, user.id);
  }
}
