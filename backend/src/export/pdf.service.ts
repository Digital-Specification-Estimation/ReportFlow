import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  async generatePdf(report: any): Promise<Buffer> {
    const html = this.buildReportHtml(report);
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm',
        },
        displayHeaderFooter: true,
        headerTemplate: `
          <div style="font-size: 10px; text-align: center; width: 100%; padding: 5px;">
            <span>${report.title}</span>
          </div>
        `,
        footerTemplate: `
          <div style="font-size: 10px; text-align: center; width: 100%; padding: 5px;">
            <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
          </div>
        `,
      });

      return Buffer.from(pdfBuffer);
    } finally {
      await browser.close();
    }
  }

  async generateSectionPdf(section: any): Promise<Buffer> {
    const html = this.buildSectionHtml(section);
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm',
        },
      });

      return Buffer.from(pdfBuffer);
    } finally {
      await browser.close();
    }
  }

  private buildReportHtml(report: any): string {
    const sectionsHtml = report.sections
      .map((section: any) => {
        const content = section.content[0]?.content || '';
        return `
          <div class="section" style="page-break-inside: avoid;">
            <h2>${section.title}</h2>
            <div class="content">${content}</div>
          </div>
        `;
      })
      .join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
            }
            h1 {
              color: #2c3e50;
              border-bottom: 2px solid #3498db;
              padding-bottom: 10px;
            }
            h2 {
              color: #34495e;
              margin-top: 30px;
            }
            .header {
              margin-bottom: 30px;
            }
            .section {
              margin-bottom: 20px;
            }
            .content {
              margin-top: 10px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
            }
            table, th, td {
              border: 1px solid #ddd;
            }
            th, td {
              padding: 12px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            img {
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${report.title}</h1>
            <p><strong>Client:</strong> ${report.clientName}</p>
            <p><strong>Property Address:</strong> ${report.propertyAddress}</p>
            <p><strong>Effective Date:</strong> ${new Date(report.effectiveDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> ${report.status}</p>
          </div>
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
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
            }
            h1 {
              color: #2c3e50;
              border-bottom: 2px solid #3498db;
              padding-bottom: 10px;
            }
            .content {
              margin-top: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
            }
            table, th, td {
              border: 1px solid #ddd;
            }
            th, td {
              padding: 12px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            img {
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          <h1>${section.title}</h1>
          <div class="content">${content}</div>
        </body>
      </html>
    `;
  }
}
