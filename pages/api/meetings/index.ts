import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';
import { requireAuth, requireRole } from '../../../src/lib/permissions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const session = await requireAuth(req, res);
    if (!session) return;
    const meetings = await prisma.meeting.findMany({ include: { organizer: true, participants: { include: { user: true } } }, orderBy: { date: 'asc' } });
    return res.status(200).json({ meetings });
  }

  if (req.method === 'POST') {
    try {
      const session = await requireRole(req, res, ['ADMIN', 'ORGANIZER']);
      if (!session) return;

      const { title, description, type, date, startTime, endTime, location, agenda, participants, organizerId } = req.body;
      if (!title || !date) return res.status(400).json({ error: 'title and date required' });

      // Only ADMIN can assign a different organizer; otherwise use the current user
      const currentUserId = (session.user as any).id;
      const organizerConnect = (organizerId && (session.user as any).role === 'ADMIN') ? { connect: { id: organizerId } } : { connect: { id: currentUserId } };

      const meeting = await prisma.meeting.create({
        data: {
          title,
          description: description || '',
          type: type || '',
          date: new Date(date),
          startTime: startTime ? new Date(`${date}T${startTime}`) : null,
          endTime: endTime ? new Date(`${date}T${endTime}`) : null,
          location: location || null,
          agenda: agenda || null,
          status: 'PLANNED',
          organizer: organizerConnect
        }
      });

      // participants can be array of ids or emails
      if (Array.isArray(participants)) {
        for (const p of participants) {
          if (!p) continue;
          if (typeof p === 'string' && p.includes('@')) {
            // email
            const user = await prisma.user.findUnique({ where: { email: p } });
            if (user) {
              await prisma.meetingParticipant.create({ data: { meeting: { connect: { id: meeting.id } }, user: { connect: { id: user.id } } } });
            }
          } else {
            // assume id
            await prisma.meetingParticipant.create({ data: { meeting: { connect: { id: meeting.id } }, user: { connect: { id: p } } } });
          }
        }
      }

      // schedule basic notifications (J-1 and H-1) for participants created
      const allParticipants = await prisma.meetingParticipant.findMany({ where: { meetingId: meeting.id } });
      const start = meeting.startTime ?? meeting.date;
      const times = [ new Date(meeting.date.getTime() - 24 * 60 * 60 * 1000), new Date(new Date(start).getTime() - 60 * 60 * 1000) ];
      for (const mp of allParticipants) {
        for (const t of times) {
          await prisma.notification.create({ data: { meeting: { connect: { id: meeting.id } }, user: { connect: { id: mp.userId } }, channel: 'EMAIL', scheduledAt: t } });
        }
      }

      return res.status(201).json({ meeting });
    } catch (err: any) {
      console.error('Error creating meeting:', err);
      return res.status(500).json({ error: err?.message || 'Internal Server Error', stack: err?.stack });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
