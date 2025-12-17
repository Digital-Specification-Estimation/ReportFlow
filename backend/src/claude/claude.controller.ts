import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ClaudeService } from './claude.service';
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TableDataDto {
  @IsArray()
  headers: string[];

  @IsArray()
  rows: string[][];
}

class AnalyzeDto {
  @IsString()
  inputText: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TableDataDto)
  tableData?: TableDataDto;

  @IsOptional()
  @IsString()
  imageBase64?: string;

  @IsOptional()
  @IsString()
  imageMediaType?: string;
}

@Controller('claude')
export class ClaudeController {
  constructor(private readonly claudeService: ClaudeService) {}

  @Post('analyze')
  async analyzeData(@Body() analyzeDto: AnalyzeDto) {
    try {
      const result = await this.claudeService.analyzeTableData(analyzeDto);
      return {
        success: true,
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Failed to analyze data',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
