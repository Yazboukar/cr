import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';


import { requireAuth, requireRole } from '../../../src/lib/permissions';
import {
  DEFAULT_TIMEZONE,
  isValidEmail,
  isValidTimeZone,
  normalizeOptionalString,
  normalizeString,
  parseZonedDate,
} from '../../../src/lib/validation';
import { buildReminderTimes } from '../../../src/lib/reminders';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const session = await requireAuth(req, res);
    if (!session) return;

    const role = session.user.role;
    const userId = session.user.id;
    // Admins see everything; everyone else is scoped to meetings they organize
    // or take part in (prevents reading other people's meetings and emails).
    const where =
      role === 'ADMIN'
        ? {}
        : { OR: [{ organizerId: userId }, { participants: { some: { userId } } }] };

    // Opt-in pagination (defaults to all scoped meetings for backward compat
    // with the dashboard aggregates that count over the full set).
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    const take = Number.isInteger(limit) && limit > 0 ? limit : undefined;
    const skip = Number.isInteger(offset) && offset > 0 ? offset : undefined;

    const meetings = await prisma.meeting.findMany({
      where,
      // Explicit select: never expose User.hashedPassword and ship only the
      // fields the list/dashboard actually use.
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
          select: { id: true, status: true, user: { select: { id: true, name: true, email: true } } },
        },
        report: { select: { id: true, actionItems: { select: { done: true } } } },
      },
      orderBy: { date: 'asc' },
      take,
      skip,
    });

    return res.status(200).json({ meetings });
  }

  if (req.method === 'POST') {
    try {
      const session = await requireRole(req, res, ['ADMIN', 'ORGANIZER']);
      if (!session) return;

      const {
        title,
        description,
        type,
        date,
        startTime,
        endTime,
        location,
        agenda,
        participants,
        organizerId,
        timezone,
      } = req.body;

      const titleValue = normalizeString(title);
      const descriptionValue = normalizeOptionalString(description);
      const typeValue = normalizeOptionalString(type);
      const dateValue = normalizeString(date);
      const startTimeValue = normalizeString(startTime);
      const endTimeValue = normalizeString(endTime);
      const locationValue = normalizeOptionalString(location);
      const agendaValue = normalizeOptionalString(agenda);
      const participantValues = Array.isArray(participants)
        ? Array.from(new Set(participants.map((value) => String(value).trim()).filter(Boolean)))
        : [];

      const fieldErrors: Record<string, string> = {};

      if (!titleValue) {
        fieldErrors.title = 'Le titre de la réunion est obligatoire.';
      }

      if (!dateValue) {
        fieldErrors.date = 'La date de la réunion est obligatoire.';
      }

      if (!startTimeValue) {
        fieldErrors.startTime = "L'heure de debut est obligatoire.";
      }

      if (!endTimeValue) {
        fieldErrors.endTime = "L'heure de fin est obligatoire.";
      }

      if (participantValues.length === 0) {
        fieldErrors.participants = 'Ajoutez au moins un participant à la réunion.';
      }

      const timezoneRaw = normalizeOptionalString(timezone);
      let timezoneValue = DEFAULT_TIMEZONE;
      if (timezoneRaw) {
        if (!isValidTimeZone(timezoneRaw)) {
          fieldErrors.timezone = 'Fuseau horaire invalide.';
        } else {
          timezoneValue = timezoneRaw;
        }
      }

      // Times are entered as wall-clock values in the meeting timezone and stored
      // as absolute UTC instants, so reminders fire correctly regardless of the
      // server's timezone.
      const meetingDate = dateValue ? parseZonedDate(dateValue, '00:00', timezoneValue) : null;
      const meetingStart =
        dateValue && startTimeValue ? parseZonedDate(dateValue, startTimeValue, timezoneValue) : null;
      const meetingEnd =
        dateValue && endTimeValue ? parseZonedDate(dateValue, endTimeValue, timezoneValue) : null;

      if (dateValue && !meetingDate) {
        fieldErrors.date = 'La date fournie est invalide.';
      }

      if (startTimeValue && !meetingStart) {
        fieldErrors.startTime = "L'heure de début est invalide.";
      }

      if (endTimeValue && !meetingEnd) {
        fieldErrors.endTime = "L'heure de fin est invalide.";
      }

      if (meetingStart && meetingEnd && meetingEnd.getTime() <= meetingStart.getTime()) {
        fieldErrors.endTime = "L'heure de fin doit être postérieure à l'heure de début.";
      }

      const invalidParticipantEmails = participantValues.filter(
        (value) => value.includes('@') && !isValidEmail(value)
      );

      if (invalidParticipantEmails.length > 0) {
        fieldErrors.participants = `Adresse email invalide: ${invalidParticipantEmails[0]}`;
      }

      if (Object.keys(fieldErrors).length > 0) {
        return res.status(400).json({
          error: "Merci de corriger les champs obligatoires avant d'enregistrer la réunion.",
          fieldErrors,
        });
      }

      const currentUserId = session.user.id;
      const organizerConnect =
        organizerId && session.user.role === 'ADMIN'
          ? { connect: { id: organizerId } }
          : { connect: { id: currentUserId } };

      const meeting = await prisma.$transaction(async (tx) => {
        const createdMeeting = await tx.meeting.create({
          data: {
            title: titleValue,
            description: descriptionValue,
            type: typeValue,
            date: meetingDate as Date,
            startTime: meetingStart,
            endTime: meetingEnd,
            location: locationValue,
            agenda: agendaValue,
            timezone: timezoneValue,
            status: 'PLANNED',
            organizer: organizerConnect,
          },
        });

        const participantIds: string[] = [];

        for (const value of participantValues) {
          if (value.includes('@')) {
            const participantUser = await tx.user.upsert({
              where: { email: value.toLowerCase() },
              // Never alter an existing user's role here: adding someone as a
              // participant must not downgrade an ADMIN/ORGANIZER account.
              update: {},
              create: {
                email: value.toLowerCase(),
                role: 'PARTICIPANT',
              },
              select: { id: true },
            });

            participantIds.push(participantUser.id);
            continue;
          }

          const participantUser = await tx.user.findUnique({
            where: { id: value },
            select: { id: true },
          });

          if (!participantUser) {
            throw new Error(`Participant introuvable: ${value}`);
          }

          participantIds.push(participantUser.id);
        }

        const uniqueParticipantIds = Array.from(new Set(participantIds));

        if (uniqueParticipantIds.length > 0) {
          await tx.meetingParticipant.createMany({
            data: uniqueParticipantIds.map((userId) => ({
              meetingId: createdMeeting.id,
              userId,
            })),
            skipDuplicates: true,
          });
        }

        const reminderTimes = buildReminderTimes(meetingStart as Date);
        if (reminderTimes.length > 0 && uniqueParticipantIds.length > 0) {
          await tx.notification.createMany({
            data: uniqueParticipantIds.flatMap((userId) =>
              reminderTimes.map((scheduledAt) => ({
                meetingId: createdMeeting.id,
                userId,
                channel: 'EMAIL' as const,
                scheduledAt,
              }))
            ),
          });
        }

        return createdMeeting;
      });

      return res.status(201).json({ meeting });
    } catch (err: any) {
      console.error('Erreur lors de la création de la réunion :', err);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Méthode ${req.method} non autorisée`);
}
