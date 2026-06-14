import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/lib/prisma';
import { generatePdf, generateDocx } from '../../../../services/export';
import { requireAuth, requireMeetingAccess } from '../../../../src/lib/permissions';
import { attachmentHeader } from '../../../../src/lib/validation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { meetingId } = req.query as { meetingId: string };
  const format = (req.query.format as string) || 'pdf';

  const session = await requireAuth(req, res);
  if (!session) return;
  if (!(await requireMeetingAccess(res, session, meetingId))) return;

  const report = await prisma.report.findUnique({ where: { meetingId } });
  if (!report) return res.status(404).json({ error: 'Compte rendu introuvable' });

  if (format === 'docx') {
    const buffer = await generateDocx({ title: report.title, content: report.content || '' });
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', attachmentHeader(`${report.title}.docx`, 'rapport'));
    return res.send(buffer);
  }

  const pdf = await generatePdf({ title: report.title, content: report.content || '' });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', attachmentHeader(`${report.title}.pdf`, 'rapport'));
  return res.send(pdf);
}
