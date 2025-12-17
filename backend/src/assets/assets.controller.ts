import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AssetsService } from './assets.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('assets')
@UseGuards(JwtAuthGuard)
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadAsset(
    @UploadedFile() file: Express.Multer.File,
    @Query('reportId') reportId: string,
    @Query('sectionId') sectionId: string,
    @CurrentUser() user: any,
  ) {
    return this.assetsService.uploadAsset(reportId, file, user.id, sectionId);
  }

  @Get('report/:reportId')
  findByReport(@Param('reportId') reportId: string) {
    return this.assetsService.findByReport(reportId);
  }

  @Get('section/:sectionId')
  findBySection(@Param('sectionId') sectionId: string) {
    return this.assetsService.findBySection(sectionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetsService.findOne(id);
  }

  @Get(':id/url')
  getSignedUrl(@Param('id') id: string) {
    return this.assetsService.getSignedUrl(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.assetsService.remove(id, user.id);
  }
}
