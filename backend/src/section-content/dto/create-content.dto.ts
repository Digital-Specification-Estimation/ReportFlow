import { IsString, IsEnum } from 'class-validator';
import { ContentFormat } from '@prisma/client';

export class CreateContentDto {
  @IsEnum(ContentFormat)
  format: ContentFormat;

  @IsString()
  content: string;
}
