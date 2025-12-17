import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { ReorderSectionsDto } from './dto/reorder-sections.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('reports/:reportId/sections')
@UseGuards(JwtAuthGuard)
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  create(
    @Param('reportId') reportId: string,
    @Body() createSectionDto: CreateSectionDto,
    @CurrentUser() user: any,
  ) {
    return this.sectionsService.create(reportId, createSectionDto, user.id);
  }

  @Get()
  findAll(@Param('reportId') reportId: string) {
    return this.sectionsService.findByReport(reportId);
  }

  @Patch('reorder')
  reorder(
    @Param('reportId') reportId: string,
    @Body() reorderDto: ReorderSectionsDto,
    @CurrentUser() user: any,
  ) {
    return this.sectionsService.reorder(reportId, reorderDto, user.id);
  }
}

@Controller('sections')
@UseGuards(JwtAuthGuard)
export class SectionController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSectionDto: UpdateSectionDto,
    @CurrentUser() user: any,
  ) {
    return this.sectionsService.update(id, updateSectionDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.sectionsService.remove(id, user.id);
  }
}
