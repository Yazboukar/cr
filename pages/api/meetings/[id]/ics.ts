import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/lib/prisma';
import { requireAuth, requireMeetingAccess } from '../../../../src/lib/permissions';
import { buildCalendar } from '../../../../src/lib/ics';
import { attachmentHeader } from '../../../../src/lib/validation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  }

  const { id } = req.query as { id: string };
  const session = await requireAuth(req, res);
  if (!session) return;
  if (!(await requireMeetingAccess(res, session, id))) return;

  const meeting = await prisma.meeting.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      date: true,
      startTime: true,
      endTime: true,
      organizer: { select: { name: true, email: true } },
      participants: { select: { contact: { select: { name: true, email: true } } } },
    },
  });
  if (!meeting) return res.status(404).json({ error: 'Réunion introuvable' });

  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.setHeader('Content-Disposition', attachmentHeader(`${meeting.title}.ics`, 'reunion'));
  return res.send(buildCalendar([meeting]));
}
