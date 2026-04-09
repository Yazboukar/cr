import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';
import { requireRole } from '../../../src/lib/permissions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const session = await requireRole(req, res, ['ADMIN', 'ORGANIZER']);
  if (!session) return;
  const { meetingId } = req.body;
  if (!meetingId) return res.status(400).json({ error: 'meetingId required' });

  const meeting = await prisma.meeting.findUnique({ where: { id: meetingId }, include: { participants: true } });
  if (!meeting) return res.status(404).json({ error: 'Meeting not found' });

  const start = meeting.startTime ?? meeting.date;
  const times = [ new Date(meeting.date.getTime() - 24 * 60 * 60 * 1000), new Date(new Date(start).getTime() - 60 * 60 * 1000) ];

  for (const mp of meeting.participants) {
    for (const t of times) {
      await prisma.notification.create({ data: { meeting: { connect: { id: meeting.id } }, user: { connect: { id: mp.userId } }, channel: 'EMAIL', scheduledAt: t } });
    }
  }

  return res.status(200).json({ ok: true });
}
