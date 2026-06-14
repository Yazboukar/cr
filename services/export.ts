import puppeteer, { Browser } from 'puppeteer';
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
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

export type ReportMeta = {
  status?: string;
  approvedByName?: string | null;
  approvedAt?: Date | string | null;
};

// Official Togolese Republic letterhead: state name, national motto and the
// tricolour rule — turns the export into an institutional document.
function officialHeaderHtml() {
  return `
    <div style="text-align:center;margin-bottom:6px">
      <div style="font-weight:bold;letter-spacing:2px;color:#006a4e;font-size:16px">RÉPUBLIQUE TOGOLAISE</div>
      <div style="font-size:11px;color:#444;margin-top:2px">Travail &ndash; Liberté &ndash; Patrie</div>
    </div>
    <div style="height:4px;background:linear-gradient(90deg,#006a4e 0 40%,#ffce00 40% 70%,#d21034 70%);margin:8px 0 28px"></div>
  `;
}

function approvalStampHtml(meta: ReportMeta) {
  if (meta.approvedAt) {
    const who = escapeHtml(meta.approvedByName || '—');
    const when = meta.approvedAt ? new Date(meta.approvedAt).toLocaleDateString('fr-FR') : '';
    return `
      <div style="margin-top:48px;display:inline-block;border:2px solid #006a4e;border-radius:8px;padding:10px 18px;color:#006a4e">
        <div style="font-weight:bold;text-transform:uppercase;letter-spacing:1px;font-size:12px">Approuvé</div>
        <div style="font-size:12px;margin-top:3px">Par ${who} le ${escapeHtml(when)}</div>
      </div>`;
  }
  const label = meta.status === 'UNDER_REVIEW' ? 'En revue' : 'Projet';
  return `<div style="margin-top:48px;color:#9a3412;font-size:12px;font-style:italic">${escapeHtml(
    label
  )} &mdash; compte rendu non approuvé</div>`;
}

export async function generatePdf(report: { title: string; content?: string }, meta: ReportMeta = {}) {
  // Report fields are user-controlled, so they must be escaped before being
  // injected into the HTML. Newlines are kept as <br> to preserve layout.
  const safeTitle = escapeHtml(report.title || '');
  const safeContent = escapeHtml(report.content || '').replace(/\r?\n/g, '<br />');

  const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>body{font-family: Arial, sans-serif; padding:40px; color:#1f2937}</style>
      </head>
      <body>
        ${officialHeaderHtml()}
        <h1 style="font-size:20px;color:#0f3b2e">${safeTitle}</h1>
        <div style="font-size:13px;line-height:1.6">${safeContent}</div>
        ${approvalStampHtml(meta)}
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

export async function generateDocx(report: { title: string; content?: string }, meta: ReportMeta = {}) {
  const children: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'RÉPUBLIQUE TOGOLAISE', bold: true, size: 28, color: '006A4E' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'Travail – Liberté – Patrie', italics: true, size: 18, color: '444444' })],
    }),
    new Paragraph({ text: '' }),
    new Paragraph({ children: [new TextRun({ text: report.title, bold: true, size: 32 })] }),
    new Paragraph(report.content || ''),
  ];

  if (meta.approvedAt) {
    const who = meta.approvedByName || '—';
    const when = new Date(meta.approvedAt).toLocaleDateString('fr-FR');
    children.push(new Paragraph({ text: '' }));
    children.push(
      new Paragraph({
        children: [new TextRun({ text: `Approuvé par ${who} le ${when}`, bold: true, color: '006A4E' })],
      })
    );
  }

  const doc = new Document({ sections: [{ properties: {}, children }] });
  const buffer = await Packer.toBuffer(doc);
  return buffer;
}
