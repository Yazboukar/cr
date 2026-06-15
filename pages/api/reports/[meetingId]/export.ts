import type { NextApiRequest, NextApiResponse } from 'next';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { prisma } from '../../../../src/lib/prisma';
import { generatePdf, generateDocx } from '../../../../services/export';
import { requireAuth, requireMeetingAccess } from '../../../../src/lib/permissions';
import { attachmentHeader } from '../../../../src/lib/validation';
import { resolveLayout } from '../../../../src/lib/documentTemplates';

// Optional official coat of arms: drop a PNG at public/emblem.png to embed it in
// the letterhead (inlined as a data URI so the sandboxed renderer can load it).
function readEmblem(): string | null {
  try {
    const path = join(process.cwd(), 'public', 'emblem.png');
    if (!existsSync(path)) return null;
    return `data:image/png;base64,${readFileSync(path).toString('base64')}`;
  } catch {
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { meetingId } = req.query as { meetingId: string };
  const format = (req.query.format as string) || 'pdf';

  const session = await requireAuth(req, res);
  if (!session) return;
  if (!(await requireMeetingAccess(res, session, meetingId))) return;

  const report = await prisma.report.findUnique({
    where: { meetingId },
    include: {
      approvedBy: { select: { name: true, email: true } },
      author: { select: { name: true, email: true } },
    },
  });
  if (!report) return res.status(404).json({ error: 'Compte rendu introuvable' });

  const meta = {
    documentType: report.documentType,
    status: report.status,
    approvedByName: report.approvedBy?.name || report.approvedBy?.email || null,
    approvedAt: report.approvedAt,
    recipient: report.recipient,
    objet: report.title,
    authorName: report.author?.name || report.author?.email || null,
    documentDate: report.approvedAt || report.createdAt,
    emblemDataUri: readEmblem(),
    layout: resolveLayout(report.template, report.layout),
  };

  if (format === 'docx') {
    const buffer = await generateDocx({ title: report.title, content: report.content || '' }, meta);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', attachmentHeader(`${report.title}.docx`, 'rapport'));
    return res.send(buffer);
  }

  const pdf = await generatePdf({ title: report.title, content: report.content || '' }, meta);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', attachmentHeader(`${report.title}.pdf`, 'rapport'));
  return res.send(pdf);
}
