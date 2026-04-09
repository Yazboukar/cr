import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';
import { requireRole } from '../../../src/lib/permissions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { meetingId } = req.query as { meetingId: string };
  if (req.method === 'POST') {
    const session = await requireRole(req, res, ['ADMIN', 'ORGANIZER', 'REPORTER']);
    if (!session) return;

    const { title, content } = req.body;
    const meeting = await prisma.meeting.findUnique({ where: { id: meetingId } });
    if (!meeting) return res.status(404).json({ error: 'Meeting not found' });

    const now = new Date();
    if (meeting.status !== 'COMPLETED' && meeting.date > now) {
      return res.status(400).json({ error: 'Report can only be created for past or completed meetings' });
    }

    const existing = await prisma.report.findUnique({ where: { meetingId } });
    if (existing) {
      // only author or admin can update
      const userId = (session.user as any).id;
      if (existing.authorId !== userId && (session.user as any).role !== 'ADMIN') {
        return res.status(403).json({ error: 'Not allowed to edit this report' });
      }
      const updated = await prisma.report.update({ where: { id: existing.id }, data: { title, content } });
      return res.status(200).json({ report: updated });
    }

    const report = await prisma.report.create({ data: { meeting: { connect: { id: meetingId } }, title, content, author: { connect: { id: (session.user as any).id } } } as any });
    return res.status(201).json({ report });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
