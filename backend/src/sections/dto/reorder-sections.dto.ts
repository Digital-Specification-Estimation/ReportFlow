import { IsArray, ValidateNested, IsString, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class SectionOrderItem {
  @IsString()
  id: string;

  @IsInt()
  orderIndex: number;

  @IsString()
  @IsOptional()
  parentId?: string;
}

export class ReorderSectionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionOrderItem)
  sections: SectionOrderItem[];
}
