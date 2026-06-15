import puppeteer, { Browser } from 'puppeteer';
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { escapeHtml } from '../src/lib/validation';
import { orgInfo, formatLongFrDate } from '../src/lib/org';

// Reuse a single Chromium instance across requests.
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
  recipient?: string | null;
  objet?: string | null;
  authorName?: string | null;
  documentDate?: Date | string | null;
  emblemDataUri?: string | null;
};

const TRICOLOR = 'linear-gradient(90deg,#006a4e 0 40%,#ffce00 40% 70%,#d21034 70%)';

function headerHtml(meta: ReportMeta): string {
  const org = orgInfo();
  const date = meta.documentDate ? formatLongFrDate(new Date(meta.documentDate)) : '';
  const emblem = meta.emblemDataUri
    ? `<img src="${meta.emblemDataUri}" style="width:74px;height:auto" alt="" />`
    : `<div style="width:62px;height:62px;border-radius:50%;border:2px solid #006a4e;display:flex;align-items:center;justify-content:center;color:#006a4e;font-weight:bold;font-size:11px">RT</div>`;

  return `
    <table style="width:100%;border-collapse:collapse">
      <tr>
        <td style="vertical-align:top;width:62%">
          <div style="display:flex;gap:12px;align-items:center">
            ${emblem}
            <div>
              <div style="font-weight:bold;font-size:13px;color:#0f3b2e">${escapeHtml(org.country)}</div>
              <div style="height:3px;width:96px;background:${TRICOLOR};margin:4px 0"></div>
            </div>
          </div>
          <div style="font-size:10px;color:#333;margin-top:8px;max-width:330px;line-height:1.35">${escapeHtml(
            org.ministry
          )}</div>
        </td>
        <td style="vertical-align:top;text-align:right;width:38%">
          <div style="font-weight:bold;font-size:12px;text-transform:uppercase;letter-spacing:0.5px">${escapeHtml(
            org.department
          )}</div>
          <div style="font-size:11px;color:#333;margin-top:24px">${escapeHtml(date)}<br/>à ${escapeHtml(
            org.place
          )}</div>
        </td>
      </tr>
    </table>
    <div style="height:3px;background:${TRICOLOR};margin:10px 0 24px"></div>
  `;
}

function approvalStampHtml(meta: ReportMeta): string {
  if (meta.approvedAt) {
    const who = escapeHtml(meta.approvedByName || '—');
    const when = escapeHtml(new Date(meta.approvedAt).toLocaleDateString('fr-FR'));
    return `
      <div style="margin-top:40px;display:inline-block;border:2px solid #006a4e;border-radius:8px;padding:8px 16px;color:#006a4e">
        <div style="font-weight:bold;text-transform:uppercase;letter-spacing:1px;font-size:11px">Approuvé</div>
        <div style="font-size:11px;margin-top:3px">Par ${who} le ${when}</div>
      </div>`;
  }
  const label = meta.status === 'UNDER_REVIEW' ? 'En revue' : 'Projet';
  return `<div style="margin-top:36px;color:#9a3412;font-size:11px;font-style:italic">${escapeHtml(
    label
  )} &mdash; compte rendu non approuvé</div>`;
}

export async function generatePdf(
  report: { title: string; content?: string },
  meta: ReportMeta = {}
) {
  const safeContent = escapeHtml(report.content || '').replace(/\r?\n/g, '<br />');
  const objet = escapeHtml(meta.objet || report.title || '');
  const recipient = meta.recipient ? escapeHtml(meta.recipient) : '';
  const signatory = meta.authorName ? escapeHtml(meta.authorName) : '';

  const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>body{font-family:Arial,sans-serif;padding:40px;color:#1f2937;font-size:13px}</style>
      </head>
      <body>
        ${headerHtml(meta)}
        <h1 style="text-align:center;font-size:18px;text-decoration:underline;margin:0 0 18px">Compte rendu</h1>
        ${
          recipient
            ? `<p style="text-align:center;font-weight:bold;text-transform:uppercase;font-size:12px;line-height:1.4">À l'attention de ${recipient}</p>`
            : ''
        }
        <p style="margin-top:16px"><span style="text-decoration:underline;font-weight:bold">Objet</span> : ${objet}</p>
        <div style="margin-top:14px;line-height:1.6">${safeContent}</div>
        ${approvalStampHtml(meta)}
        ${
          signatory
            ? `<p style="text-align:right;margin-top:64px;font-weight:600">${signatory}</p>`
            : ''
        }
      </body>
    </html>
  `;

  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    await page.setJavaScriptEnabled(false);
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const url = request.url();
      // Allow the main-frame document and inline data: assets (the emblem),
      // block any outbound http/file request.
      if (
        (request.isNavigationRequest() && request.frame() === page.mainFrame()) ||
        url.startsWith('data:')
      ) {
        request.continue();
      } else {
        request.abort();
      }
    });
    await page.setContent(html, { waitUntil: 'load' });
    const buffer = await page.pdf({ format: 'A4', printBackground: true });
    return buffer;
  } finally {
    await page.close();
  }
}

export async function generateDocx(
  report: { title: string; content?: string },
  meta: ReportMeta = {}
) {
  const org = orgInfo();
  const date = meta.documentDate ? formatLongFrDate(new Date(meta.documentDate)) : '';
  const objet = meta.objet || report.title || '';

  const children: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: org.country, bold: true, size: 26, color: '006A4E' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: org.motto, italics: true, size: 16, color: '444444' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: org.ministry, size: 16 })],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: org.department, bold: true, size: 18 })],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: date ? `${date} — à ${org.place}` : `à ${org.place}`, size: 16 })],
    }),
    new Paragraph({ text: '' }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'Compte rendu', bold: true, underline: {}, size: 28 })],
    }),
  ];

  if (meta.recipient) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: `À l'attention de ${meta.recipient}`, bold: true, size: 20 })],
      })
    );
  }

  children.push(new Paragraph({ text: '' }));
  children.push(
    new Paragraph({ children: [new TextRun({ text: 'Objet : ', bold: true }), new TextRun({ text: objet })] })
  );
  children.push(new Paragraph({ text: '' }));
  children.push(new Paragraph(report.content || ''));

  if (meta.approvedAt) {
    const when = new Date(meta.approvedAt).toLocaleDateString('fr-FR');
    children.push(new Paragraph({ text: '' }));
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Approuvé par ${meta.approvedByName || '—'} le ${when}`,
            bold: true,
            color: '006A4E',
          }),
        ],
      })
    );
  }

  if (meta.authorName) {
    children.push(new Paragraph({ text: '' }));
    children.push(
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: meta.authorName, bold: true })],
      })
    );
  }

  const doc = new Document({ sections: [{ properties: {}, children }] });
  return Packer.toBuffer(doc);
}
