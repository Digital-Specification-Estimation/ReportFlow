import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ExportService } from './export.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('export')
@UseGuards(JwtAuthGuard)
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('report/:id')
  async exportReport(
    @Param('id') id: string,
    @Query('format') format: 'pdf' | 'docx',
    @CurrentUser() user: any,
    @Res() res: Response,
  ) {
    const { buffer, filename, mimeType } = await this.exportService.exportReport(
      id,
      format || 'pdf',
      user.id,
    );

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(buffer);
  }

  @Get('section/:id')
  async exportSection(
    @Param('id') id: string,
    @Query('format') format: 'pdf' | 'docx',
    @CurrentUser() user: any,
    @Res() res: Response,
  ) {
    const { buffer, filename, mimeType } = await this.exportService.exportSection(
      id,
      format || 'pdf',
      user.id,
    );

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(buffer);
  }
}
