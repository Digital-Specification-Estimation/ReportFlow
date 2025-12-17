import { IsString, IsEnum, IsOptional, IsObject } from 'class-validator';
import { SectionType } from '@prisma/client';

export class CreateSectionDto {
  @IsString()
  @IsOptional()
  parentId?: string;

  @IsString()
  slug: string;

  @IsString()
  title: string;

  @IsEnum(SectionType)
  @IsOptional()
  type?: SectionType;

  @IsObject()
  @IsOptional()
  metadata?: any;
}
