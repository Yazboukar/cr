import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';
import { requireOrganizerOrAdmin } from '../../../src/lib/permissions';
import { normalizeString } from '../../../src/lib/validation';
import { logAction } from '../../../src/lib/audit';

const REMINDER_OFFSETS_MINUTES = [24 * 60, 60, 30, 5];

function buildReminderTimes(start: Date, now = new Date()) {
  return REMINDER_OFFSETS_MINUTES
    .map((offset) => new Date(start.getTime() - offset * 60 * 1000))
    .filter((scheduledAt) => scheduledAt.getTime() > now.getTime());
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  }

  const meetingId = normalizeString(req.body?.meetingId);
  if (!meetingId) return res.status(400).json({ error: 'Identifiant de réunion requis' });

  const meeting = await prisma.meeting.findUnique({
    where: { id: meetingId },
    include: { participants: true },
  });

  if (!meeting) return res.status(404).json({ error: 'Réunion introuvable' });

  const session = await requireOrganizerOrAdmin(req, res, meeting.organizerId);
  if (!session) return;

  const start = meeting.startTime ?? meeting.date;
  const times = buildReminderTimes(start);

  await prisma.notification.deleteMany({
    where: {
      meetingId: meeting.id,
      status: 'PENDING',
    },
  });

  if (times.length > 0 && meeting.participants.length > 0) {
    await prisma.notification.createMany({
      data: meeting.participants.flatMap((participant) =>
        times.map((scheduledAt) => ({
          meetingId: meeting.id,
          userId: participant.userId,
          channel: 'EMAIL' as const,
          scheduledAt,
        }))
      ),
    });
  }

  await logAction('Notification', meeting.id, 'RESCHEDULE', session.user.id, {
    reminders: meeting.participants.length * times.length,
  });

  return res.status(200).json({ ok: true, reminders: meeting.participants.length * times.length });
}
