import { Injectable } from '@nestjs/common';
import { convertHtmlToDocx } from 'html-to-docx';

@Injectable()
export class WordService {
  async generateDocx(report: any): Promise<Buffer> {
    const html = this.buildReportHtml(report);
    const docxBuffer = await convertHtmlToDocx(html);
    return Buffer.from(docxBuffer);
  }

  async generateSectionDocx(section: any): Promise<Buffer> {
    const html = this.buildSectionHtml(section);
    const docxBuffer = await convertHtmlToDocx(html);
    return Buffer.from(docxBuffer);
  }

  private buildReportHtml(report: any): string {
    const sectionsHtml = report.sections
      .map((section: any) => {
        const content = section.content[0]?.content || '';
        return `
          <div>
            <h2>${section.title}</h2>
            <div>${content}</div>
          </div>
        `;
      })
      .join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          <h1>${report.title}</h1>
          <p><strong>Client:</strong> ${report.clientName}</p>
          <p><strong>Property Address:</strong> ${report.propertyAddress}</p>
          <p><strong>Effective Date:</strong> ${new Date(report.effectiveDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> ${report.status}</p>
          <hr />
          ${sectionsHtml}
        </body>
      </html>
    `;
  }

  private buildSectionHtml(section: any): string {
    const content = section.content[0]?.content || '';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          <h1>${section.title}</h1>
          <div>${content}</div>
        </body>
      </html>
    `;
  }
}
