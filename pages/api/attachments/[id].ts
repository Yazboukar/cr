import type { NextApiRequest, NextApiResponse } from 'next';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { prisma } from '../../../src/lib/prisma';
import { requireAuth, userCanAccessMeeting } from '../../../src/lib/permissions';
import { attachmentHeader } from '../../../src/lib/validation';
import { contentTypeFromName, resolveStoredPath } from '../../../src/lib/uploads';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  }

  const { id } = req.query as { id: string };
  const session = await requireAuth(req, res);
  if (!session) return;

  const attachment = await prisma.attachment.findUnique({
    where: { id },
    select: {
      filename: true,
      url: true,
      meetingId: true,
      report: { select: { meetingId: true } },
    },
  });
  if (!attachment) return res.status(404).json({ error: 'Pièce jointe introuvable' });

  const targetMeetingId = attachment.meetingId || attachment.report?.meetingId || null;
  if (!targetMeetingId) {
    if (session.user.role !== 'ADMIN') return res.status(403).json({ error: 'Accès refusé' });
  } else if (!(await userCanAccessMeeting(session, targetMeetingId))) {
    return res.status(403).json({ error: 'Accès refusé' });
  }

  // Legacy/external attachments store a real URL: redirect instead of serving.
  if (/^https?:\/\//i.test(attachment.url)) {
    res.redirect(307, attachment.url);
    return;
  }

  const storedPath = resolveStoredPath(attachment.url);
  if (!storedPath || !existsSync(storedPath)) {
    return res.status(404).json({ error: 'Fichier introuvable' });
  }

  const buffer = await readFile(storedPath);
  res.setHeader('Content-Type', contentTypeFromName(attachment.filename));
  res.setHeader('Content-Disposition', attachmentHeader(attachment.filename, 'piece-jointe'));
  return res.send(buffer);
}
