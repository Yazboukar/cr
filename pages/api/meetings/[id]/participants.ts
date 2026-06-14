import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/lib/prisma';
import { requireOrganizerOrAdmin } from '../../../../src/lib/permissions';
import { isParticipantStatus } from '../../../../src/lib/meetings';
import { isValidEmail, normalizeEmail, normalizeOptionalString, normalizeString } from '../../../../src/lib/validation';
import { logAction } from '../../../../src/lib/audit';

async function getEditableMeeting(req: NextApiRequest, res: NextApiResponse, meetingId: string) {
  const meeting = await prisma.meeting.findUnique({
    where: { id: meetingId },
    select: { id: true, organizerId: true },
  });

  if (!meeting) {
    res.status(404).json({ error: 'Réunion introuvable' });
    return null;
  }

  const session = await requireOrganizerOrAdmin(req, res, meeting.organizerId);
  if (!session) return null;

  return { meeting, session };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };
  const context = await getEditableMeeting(req, res, id);
  if (!context) return;

  if (req.method === 'POST') {
    const email = normalizeEmail(req.body?.email);
    const name = normalizeOptionalString(req.body?.name);
    const userId = normalizeOptionalString(req.body?.userId);
    const role = normalizeOptionalString(req.body?.role);

    let participantUserId = userId;

    if (!participantUserId) {
      if (!email || !isValidEmail(email)) {
        return res.status(400).json({ error: 'Email invalide' });
      }

      const user = await prisma.user.upsert({
        where: { email },
        // Preserve existing role on update (no downgrade of ADMIN/ORGANIZER).
        update: { name: name || undefined },
        create: { email, name, role: 'PARTICIPANT' },
        select: { id: true },
      });
      participantUserId = user.id;
    }

    const participant = await prisma.meetingParticipant.upsert({
      where: { meetingId_userId: { meetingId: id, userId: participantUserId } },
      update: { role },
      create: {
        meetingId: id,
        userId: participantUserId,
        role,
      },
      include: { user: true },
    });

    await logAction('MeetingParticipant', participant.id, 'UPSERT', context.session.user.id, {
      meetingId: id,
      userId: participantUserId,
    });

    return res.status(200).json({ participant });
  }

  if (req.method === 'PATCH') {
    const participantId = normalizeString(req.body?.participantId);
    const status = normalizeString(req.body?.status);

    if (!participantId) {
      return res.status(400).json({ error: 'Identifiant du participant requis' });
    }

    if (!isParticipantStatus(status)) {
      return res.status(400).json({ error: 'Statut invalide' });
    }

    const participant = await prisma.meetingParticipant.findFirst({
      where: { id: participantId, meetingId: id },
    });

    if (!participant) {
      return res.status(404).json({ error: 'Participant introuvable' });
    }

    const updated = await prisma.meetingParticipant.update({
      where: { id: participantId },
      data: { status },
      include: { user: true },
    });

    await logAction('MeetingParticipant', participantId, 'STATUS_UPDATE', context.session.user.id, {
      status,
    });

    return res.status(200).json({ participant: updated });
  }

  if (req.method === 'DELETE') {
    const participantId = normalizeString(req.body?.participantId);
    if (!participantId) {
      return res.status(400).json({ error: 'Identifiant du participant requis' });
    }

    const participant = await prisma.meetingParticipant.findFirst({
      where: { id: participantId, meetingId: id },
      select: { id: true },
    });

    if (!participant) {
      return res.status(404).json({ error: 'Participant introuvable' });
    }

    await prisma.meetingParticipant.delete({ where: { id: participantId } });
    await logAction('MeetingParticipant', participantId, 'DELETE', context.session.user.id, { meetingId: id });

    return res.status(204).end();
  }

  res.setHeader('Allow', ['POST', 'PATCH', 'DELETE']);
  return res.status(405).end(`Méthode ${req.method} non autorisée`);
}
