import { IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ReportStatus } from '@prisma/client';

export class UpdateReportDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  clientName?: string;

  @IsString()
  @IsOptional()
  propertyAddress?: string;

  @IsDateString()
  @IsOptional()
  effectiveDate?: string;

  @IsEnum(ReportStatus)
  @IsOptional()
  status?: ReportStatus;
}
