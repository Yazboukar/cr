import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';
import { requireAuth, userCanAccessMeeting } from '../../../src/lib/permissions';
import { normalizeOptionalString } from '../../../src/lib/validation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await requireAuth(req, res);
    if (!session) return;

    const meetingId = normalizeOptionalString(req.body?.meetingId);
    const reportId = normalizeOptionalString(req.body?.reportId);
    const filename = normalizeOptionalString(req.body?.filename);
    const url = normalizeOptionalString(req.body?.url);

    if (!filename || !url) return res.status(400).json({ error: 'Nom de fichier et URL requis' });
    if (!meetingId && !reportId) return res.status(400).json({ error: 'Identifiant de réunion ou de compte rendu requis' });

    if (meetingId) {
      const meeting = await prisma.meeting.findUnique({ where: { id: meetingId }, select: { id: true } });
      if (!meeting) return res.status(404).json({ error: 'Réunion introuvable' });
    }

    if (reportId) {
      const report = await prisma.report.findUnique({ where: { id: reportId }, select: { id: true } });
      if (!report) return res.status(404).json({ error: 'Compte rendu introuvable' });
    }

    const attachment = await prisma.attachment.create({ data: { filename, url, meetingId, reportId, uploadedById: session.user.id } });
    return res.status(201).json({ attachment });
  }

  if (req.method === 'GET') {
    const session = await requireAuth(req, res);
    if (!session) return;
    const { meetingId, reportId } = req.query as any;

    // A scope is mandatory and the caller must be allowed to read that meeting,
    // otherwise attachments of any meeting could be enumerated.
    let scopedMeetingId: string | null = typeof meetingId === 'string' ? meetingId : null;
    if (!scopedMeetingId && typeof reportId === 'string') {
      const report = await prisma.report.findUnique({
        where: { id: reportId },
        select: { meetingId: true },
      });
      if (!report) return res.status(404).json({ error: 'Compte rendu introuvable' });
      scopedMeetingId = report.meetingId;
    }

    if (!scopedMeetingId) {
      return res.status(400).json({ error: 'Identifiant de réunion ou de compte rendu requis' });
    }

    if (!(await userCanAccessMeeting(session, scopedMeetingId))) {
      return res.status(403).json({ error: 'Accès refusé' });
    }

    const where: any = {};
    if (typeof meetingId === 'string') where.meetingId = meetingId;
    if (typeof reportId === 'string') where.reportId = reportId;
    const attachments = await prisma.attachment.findMany({ where });
    return res.status(200).json({ attachments });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end();
}
