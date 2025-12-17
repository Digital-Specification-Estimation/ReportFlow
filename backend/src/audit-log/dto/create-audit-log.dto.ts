import { IsString, IsObject, IsOptional } from 'class-validator';

export class CreateAuditLogDto {
  @IsString()
  userId: string;

  @IsString()
  action: string;

  @IsString()
  objectType: string;

  @IsString()
  objectId: string;

  @IsObject()
  @IsOptional()
  meta?: any;
}
