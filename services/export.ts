import puppeteer from 'puppeteer';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export async function generatePdf(report: { title: string; content?: string }) {
  const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>body{font-family: Arial, sans-serif; padding:40px}</style>
      </head>
      <body>
        <h1>${report.title}</h1>
        <div>${report.content || ''}</div>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html);
  const buffer = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();
  return buffer;
}

export async function generateDocx(report: { title: string; content?: string }) {
  const doc = new Document({ sections: [{ properties: {}, children: [new Paragraph({ children: [new TextRun({ text: report.title, bold: true, size: 32 })] }), new Paragraph(report.content || '')] }] });
  const buffer = await Packer.toBuffer(doc);
  return buffer;
}
