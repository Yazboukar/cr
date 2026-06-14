import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';
import { requireAuth, requireMeetingAccess, requireOrganizerOrAdmin } from '../../../src/lib/permissions';
import {
  DEFAULT_TIMEZONE,
  formatZonedYmd,
  isValidTimeZone,
  normalizeOptionalString,
  normalizeString,
  parseZonedDate,
} from '../../../src/lib/validation';
import { isMeetingStatus } from '../../../src/lib/meetings';
import { logAction } from '../../../src/lib/audit';

function buildMeetingUpdate(body: any, existing: { date: Date; timezone: string | null }) {
  const data: Record<string, unknown> = {};
  const fieldErrors: Record<string, string> = {};

  if ('title' in body) {
    const title = normalizeString(body.title);
    if (!title) {
      fieldErrors.title = 'Le titre de la réunion est obligatoire.';
    } else {
      data.title = title;
    }
  }

  for (const field of ['description', 'type', 'location', 'agenda'] as const) {
    if (field in body) {
      data[field] = normalizeOptionalString(body[field]);
    }
  }

  // Effective timezone: a freshly provided valid value, else the meeting's own.
  let timeZone = existing.timezone || DEFAULT_TIMEZONE;
  if ('timezone' in body) {
    const tz = normalizeString(body.timezone);
    if (!isValidTimeZone(tz)) {
      fieldErrors.timezone = 'Fuseau horaire invalide.';
    } else {
      data.timezone = tz;
      timeZone = tz;
    }
  }

  // Calendar day (YYYY-MM-DD, in the effective timezone) used to anchor times.
  let dateStr = formatZonedYmd(existing.date, timeZone);

  if ('date' in body) {
    const value = normalizeString(body.date);
    const parsed = value ? parseZonedDate(value, '00:00', timeZone) : null;
    if (!parsed) {
      fieldErrors.date = 'La date fournie est invalide.';
    } else {
      data.date = parsed;
      dateStr = value;
    }
  }

  for (const field of ['startTime', 'endTime'] as const) {
    if (field in body) {
      const value = normalizeString(body[field]);
      const parsed = value ? parseZonedDate(dateStr, value, timeZone) : null;
      if (value && !parsed) {
        fieldErrors[field] = 'La date ou l’heure fournie est invalide.';
      } else {
        data[field] = parsed;
      }
    }
  }

  if ('status' in body) {
    const status = normalizeString(body.status);
    if (!isMeetingStatus(status)) {
      fieldErrors.status = 'Le statut fourni est invalide.';
    } else {
      data.status = status;
    }
  }

  return { data, fieldErrors };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };
  if (req.method === 'GET') {
    const session = await requireAuth(req, res);
    if (!session) return;
    if (!(await requireMeetingAccess(res, session, id))) return;
    const meeting = await prisma.meeting.findUnique({
      where: { id },
      // Explicit select so User.hashedPassword is never returned to the client.
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        location: true,
        agenda: true,
        date: true,
        startTime: true,
        endTime: true,
        timezone: true,
        status: true,
        organizerId: true,
        organizer: { select: { id: true, name: true, email: true } },
        participants: {
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            status: true,
            role: true,
            user: { select: { id: true, name: true, email: true } },
          },
        },
        attachments: true,
        report: { select: { id: true, title: true, status: true, actionItems: true } },
        notifications: {
          where: { status: 'PENDING' },
          orderBy: { scheduledAt: 'asc' },
          select: { id: true, channel: true, scheduledAt: true, status: true },
        },
      },
    });
    if (!meeting) return res.status(404).json({ error: 'Réunion introuvable' });
    return res.status(200).json({ meeting });
  }

  if (req.method === 'PUT') {
    const meeting = await prisma.meeting.findUnique({ where: { id } });
    if (!meeting) return res.status(404).json({ error: 'Réunion introuvable' });
    const session = await requireOrganizerOrAdmin(req, res, meeting.organizerId);
    if (!session) return;

    const { data, fieldErrors } = buildMeetingUpdate(req.body || {}, {
      date: meeting.date,
      timezone: meeting.timezone,
    });
    if (Object.keys(fieldErrors).length > 0) {
      return res.status(400).json({ error: 'Validation échouée', fieldErrors });
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Aucun champ modifiable fourni' });
    }

    const updated = await prisma.meeting.update({ where: { id }, data });
    await logAction('Meeting', id, 'UPDATE', session.user.id, data);
    return res.status(200).json({ meeting: updated });
  }

  if (req.method === 'DELETE') {
    const meeting = await prisma.meeting.findUnique({ where: { id } });
    if (!meeting) return res.status(404).json({ error: 'Réunion introuvable' });
    const session = await requireOrganizerOrAdmin(req, res, meeting.organizerId);
    if (!session) return;
    await prisma.$transaction([
      prisma.notification.deleteMany({ where: { meetingId: id } }),
      prisma.meetingParticipant.deleteMany({ where: { meetingId: id } }),
      prisma.attachment.deleteMany({ where: { meetingId: id } }),
      prisma.reportActionItem.deleteMany({ where: { report: { meetingId: id } } }),
      prisma.report.deleteMany({ where: { meetingId: id } }),
      prisma.meeting.delete({ where: { id } }),
    ]);
    await logAction('Meeting', id, 'DELETE', session.user.id);
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Méthode ${req.method} non autorisée`);
}
