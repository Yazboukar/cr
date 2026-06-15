import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';
import { requireAuth } from '../../../src/lib/permissions';
import { buildCalendar } from '../../../src/lib/ics';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  }

  const session = await requireAuth(req, res);
  if (!session) return;

  // Same scope as the meeting list: admins see everything, others their own.
  const role = session.user.role;
  const where = role === 'ADMIN' ? {} : { organizerId: session.user.id };

  const meetings = await prisma.meeting.findMany({
    where,
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
    orderBy: { date: 'asc' },
  });

  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="meetingflow.ics"');
  return res.send(buildCalendar(meetings));
}
