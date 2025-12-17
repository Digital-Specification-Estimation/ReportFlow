import { IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ReportStatus } from '@prisma/client';

export class CreateReportDto {
  @IsString()
  title: string;

  @IsString()
  clientName: string;

  @IsString()
  propertyAddress: string;

  @IsDateString()
  effectiveDate: string;

  @IsEnum(ReportStatus)
  @IsOptional()
  status?: ReportStatus;
}
