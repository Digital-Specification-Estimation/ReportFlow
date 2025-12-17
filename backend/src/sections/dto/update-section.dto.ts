import { IsString, IsEnum, IsOptional, IsObject } from 'class-validator';
import { SectionType } from '@prisma/client';

export class UpdateSectionDto {
  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(SectionType)
  @IsOptional()
  type?: SectionType;

  @IsObject()
  @IsOptional()
  metadata?: any;
}
