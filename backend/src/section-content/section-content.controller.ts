import { Controller, Get, Post, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SectionContentService } from './section-content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('sections/:sectionId/content')
@UseGuards(JwtAuthGuard)
export class SectionContentController {
  constructor(private readonly contentService: SectionContentService) {}

  @Get()
  getLatest(@Param('sectionId') sectionId: string) {
    return this.contentService.getLatestContent(sectionId);
  }

  @Post()
  createVersion(
    @Param('sectionId') sectionId: string,
    @Body() createContentDto: CreateContentDto,
    @CurrentUser() user: any,
  ) {
    return this.contentService.createVersion(sectionId, createContentDto, user.id);
  }

  @Get('history')
  getHistory(@Param('sectionId') sectionId: string) {
    return this.contentService.getHistory(sectionId);
  }

  @Get('version/:version')
  getVersion(
    @Param('sectionId') sectionId: string,
    @Param('version', ParseIntPipe) version: number,
  ) {
    return this.contentService.getVersion(sectionId, version);
  }

  @Post('rollback/:version')
  rollback(
    @Param('sectionId') sectionId: string,
    @Param('version', ParseIntPipe) version: number,
    @CurrentUser() user: any,
  ) {
    return this.contentService.rollback(sectionId, version, user.id);
  }
}
