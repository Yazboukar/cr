import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/lib/prisma';
import { generatePdf, generateDocx } from '../../../../services/export';
import { requireAuth } from '../../../../src/lib/permissions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { meetingId } = req.query as { meetingId: string };
  const format = (req.query.format as string) || 'pdf';

  const session = await requireAuth(req, res);
  if (!session) return;

  const report = await prisma.report.findUnique({ where: { meetingId } });
  if (!report) return res.status(404).json({ error: 'Report not found' });

  if (format === 'docx') {
    const buffer = await generateDocx({ title: report.title, content: report.content || '' });
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${report.title.replace(/\s+/g, '_')}.docx"`);
    return res.send(buffer);
  }

  const pdf = await generatePdf({ title: report.title, content: report.content || '' });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${report.title.replace(/\s+/g, '_')}.pdf"`);
  return res.send(pdf);
}
