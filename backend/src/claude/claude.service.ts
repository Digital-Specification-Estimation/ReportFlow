import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface AnalyzeRequest {
  inputText: string;
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  imageBase64?: string;
  imageMediaType?: string;
}

@Injectable()
export class ClaudeService {
  private readonly logger = new Logger(ClaudeService.name);
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.anthropic.com/v1/messages';

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('CLAUDE_API_KEY') || '';
  }

  async analyzeTableData(request: AnalyzeRequest): Promise<{ analysis: string; tableHtml: string; tableData?: { headers: string[]; rows: string[][] } }> {
    if (!this.apiKey) {
      this.logger.warn('Claude API key not configured');
      throw new Error('Claude API key not configured');
    }

    try {
      const content = this.buildContent(request);

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5-20250929',
          max_tokens: 8000,
          messages: [
            {
              role: 'user',
              content: content,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Claude API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const fullResponse = data.content[0].text;
      
      this.logger.log('Claude response length:', fullResponse.length);
      this.logger.log('Contains EXTRACTED_TABLE_DATA:', fullResponse.includes('EXTRACTED_TABLE_DATA:'));
      
      // Extract table data from Claude's response if present
      let analysis = fullResponse;
      let extractedTableData = request.tableData;
      
      if (fullResponse.includes('EXTRACTED_TABLE_DATA:')) {
        const parts = fullResponse.split('EXTRACTED_TABLE_DATA:');
        analysis = parts[0].trim();
        
        if (parts[1]) {
          const tableSection = parts[1].trim();
          const lines = tableSection.split('\n').filter(line => line.trim());
          
          this.logger.log('Extracted table lines:', lines.length);
          
          if (lines.length >= 2) {
            const headers = lines[0].split(',').map(h => h.trim());
            const rows = lines.slice(1).map(line => 
              line.split(',').map(cell => cell.trim())
            );
            
            extractedTableData = { headers, rows };
            this.logger.log('Successfully extracted table data:', { headers: headers.length, rows: rows.length });
          }
        }
      } else {
        this.logger.log('No EXTRACTED_TABLE_DATA found, trying to parse from markdown tables');
        // Fallback: try to extract table from markdown
        extractedTableData = this.extractTableFromMarkdown(fullResponse);
      }
      
      const tableHtml = extractedTableData ? this.generateTableHtml(extractedTableData) : '';

      return { 
        analysis, 
        tableHtml,
        tableData: extractedTableData 
      };
    } catch (error) {
      this.logger.error('Claude API error:', error.message);
      throw error;
    }
  }

  private buildContent(request: AnalyzeRequest): any {
    const contentParts: any[] = [];

    // Add image if provided
    if (request.imageBase64 && request.imageMediaType) {
      contentParts.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: request.imageMediaType,
          data: request.imageBase64,
        },
      });
    }

    // Build text prompt
    let textPrompt = '';
    if (request.tableData && request.tableData.headers && request.tableData.rows && request.tableData.rows.length > 0) {
      const tableText = [
        request.tableData.headers.join('\t'),
        ...request.tableData.rows.map((row) => row.join('\t')),
      ].join('\n');

      textPrompt = `You are Claude, integrated into ReportFlow - a real estate appraisal software. The user has provided table data:

${tableText}

User's request: ${request.inputText || 'Please analyze this data'}

Analyze this data and respond naturally. Use markdown formatting for clarity.`;
    } else if (request.imageBase64) {
      textPrompt = `You are Claude, integrated into ReportFlow - a real estate appraisal software. 

User's request: ${request.inputText || 'Please analyze this image'}

If this image contains tabular data (like property listings, comparable sales, financial data, etc.), please:
1. Provide your comprehensive analysis in markdown format
2. At the end of your response, include the structured data in this exact format:

EXTRACTED_TABLE_DATA:
Header1,Header2,Header3
Row1Col1,Row1Col2,Row1Col3
Row2Col1,Row2Col2,Row2Col3

This will help create visual charts alongside your analysis. If no tabular data is present, just provide your analysis without the EXTRACTED_TABLE_DATA section.`;
    } else {
      textPrompt = request.inputText || 'Please analyze this image.';
    }

    contentParts.push({
      type: 'text',
      text: textPrompt,
    });

    return contentParts;
  }

  private extractTableFromMarkdown(text: string): { headers: string[]; rows: string[][] } | null {
    // Look for markdown tables in the response
    const lines = text.split('\n');
    const tables: Array<{ headers: string[]; rows: string[][] }> = [];
    
    let i = 0;
    while (i < lines.length) {
      const line = lines[i].trim();
      
      // Check if this line starts a table
      if (line.includes('|') && line.split('|').length >= 3) {
        const tableStart = i;
        let tableEnd = i;
        
        // Find the end of this table
        for (let j = i + 1; j < lines.length; j++) {
          const nextLine = lines[j].trim();
          if (nextLine.includes('|')) {
            tableEnd = j;
          } else {
            break;
          }
        }
        
        // Extract this table
        const tableLines = lines.slice(tableStart, tableEnd + 1);
        const headers: string[] = [];
        const rows: string[][] = [];
        
        for (let k = 0; k < tableLines.length; k++) {
          const tableLine = tableLines[k].trim();
          if (!tableLine.includes('|')) continue;
          
          // Skip separator lines (like |---|---|)
          if (tableLine.includes('---')) continue;
          
          const cells = tableLine.split('|')
            .map(cell => cell.trim())
            .filter(cell => cell.length > 0);
          
          if (headers.length === 0) {
            headers.push(...cells);
          } else if (cells.length > 0) {
            rows.push(cells);
          }
        }
        
        if (headers.length > 0 && rows.length > 0) {
          tables.push({ headers, rows });
        }
        
        i = tableEnd + 1;
      } else {
        i++;
      }
    }
    
    // Return the table with the most data rows (likely the main data table)
    if (tables.length > 0) {
      const bestTable = tables.reduce((prev, current) => 
        current.rows.length > prev.rows.length ? current : prev
      );
      
      this.logger.log('Extracted table from markdown:', { 
        headers: bestTable.headers.length, 
        rows: bestTable.rows.length,
        totalTables: tables.length 
      });
      
      return bestTable;
    }
    
    return null;
  }

  private generateTableHtml(tableData: { headers: string[]; rows: string[][] }): string {
    const headerRow = tableData.headers
      .map((h) => `<th class="border border-gray-300 p-2 bg-gray-100 font-semibold text-left">${h}</th>`)
      .join('');

    const bodyRows = tableData.rows
      .map(
        (row) =>
          `<tr>${row.map((cell) => `<td class="border border-gray-300 p-2">${cell}</td>`).join('')}</tr>`,
      )
      .join('');

    return `<table class="w-full border-collapse border border-gray-300 my-4">
      <thead><tr>${headerRow}</tr></thead>
      <tbody>${bodyRows}</tbody>
    </table>`;
  }
}
