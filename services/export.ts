import puppeteer, { Browser } from 'puppeteer';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { escapeHtml } from '../src/lib/validation';

// Reuse a single Chromium instance across requests: launching a browser per
// export costs seconds of cold start and a lot of memory. Each export still
// gets its own isolated page.
let browserPromise: Promise<Browser> | null = null;

async function getBrowser() {
  if (browserPromise) {
    const existing = await browserPromise.catch(() => null);
    if (existing && existing.isConnected()) return existing;
  }
  browserPromise = puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  return browserPromise;
}

export async function generatePdf(report: { title: string; content?: string }) {
  // Report fields are user-controlled, so they must be escaped before being
  // injected into the HTML. Newlines are kept as <br> to preserve layout.
  const safeTitle = escapeHtml(report.title || '');
  const safeContent = escapeHtml(report.content || '').replace(/\r?\n/g, '<br />');

  const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>body{font-family: Arial, sans-serif; padding:40px}</style>
      </head>
      <body>
        <h1>${safeTitle}</h1>
        <div>${safeContent}</div>
      </body>
    </html>
  `;

  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    // Defense in depth: no script execution and no outbound resource loading,
    // so a malicious report cannot trigger SSRF or local file reads.
    await page.setJavaScriptEnabled(false);
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
        request.continue();
      } else {
        request.abort();
      }
    });
    await page.setContent(html, { waitUntil: 'load' });
    const buffer = await page.pdf({ format: 'A4', printBackground: true });
    return buffer;
  } finally {
    // Close only the page; the shared browser stays alive for reuse.
    await page.close();
  }
}

export async function generateDocx(report: { title: string; content?: string }) {
  const doc = new Document({ sections: [{ properties: {}, children: [new Paragraph({ children: [new TextRun({ text: report.title, bold: true, size: 32 })] }), new Paragraph(report.content || '')] }] });
  const buffer = await Packer.toBuffer(doc);
  return buffer;
}
