import type { NextApiRequest, NextApiResponse } from 'next';
import { randomBytes } from 'crypto';
import { writeFile } from 'fs/promises';
import { prisma } from '../../../src/lib/prisma';
import { requireAuth, userCanAccessMeeting } from '../../../src/lib/permissions';
import { normalizeOptionalString, normalizeString } from '../../../src/lib/validation';
import {
  ensureUploadDir,
  extensionFromName,
  MAX_UPLOAD_BYTES,
  resolveStoredPath,
} from '../../../src/lib/uploads';
import { logAction } from '../../../src/lib/audit';

// Base64 payloads inflate the body ~33%; allow headroom over the 8 MB file cap.
export const config = { api: { bodyParser: { sizeLimit: '12mb' } } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  }

  const session = await requireAuth(req, res);
  if (!session) return;

  const filename = normalizeString(req.body?.filename);
  const data = typeof req.body?.data === 'string' ? req.body.data : '';
  const meetingId = normalizeOptionalString(req.body?.meetingId);
  const reportId = normalizeOptionalString(req.body?.reportId);

  if (!filename || !data) return res.status(400).json({ error: 'Fichier requis' });
  if (!meetingId && !reportId) {
    return res.status(400).json({ error: 'Identifiant de réunion ou de compte rendu requis' });
  }

  // Resolve the meeting the upload belongs to, for the access check.
  let targetMeetingId = meetingId || null;
  if (!targetMeetingId && reportId) {
    const report = await prisma.report.findUnique({
      where: { id: reportId },
      select: { meetingId: true },
    });
    if (!report) return res.status(404).json({ error: 'Compte rendu introuvable' });
    targetMeetingId = report.meetingId;
  }
  if (meetingId) {
    const meeting = await prisma.meeting.findUnique({ where: { id: meetingId }, select: { id: true } });
    if (!meeting) return res.status(404).json({ error: 'Réunion introuvable' });
  }
  if (!targetMeetingId || !(await userCanAccessMeeting(session, targetMeetingId))) {
    return res.status(403).json({ error: 'Accès refusé' });
  }

  // Accept either a raw base64 string or a data: URL.
  const base64 = data.includes(',') ? data.slice(data.indexOf(',') + 1) : data;
  const buffer = Buffer.from(base64, 'base64');
  if (buffer.length === 0) return res.status(400).json({ error: 'Fichier vide ou invalide' });
  if (buffer.length > MAX_UPLOAD_BYTES) {
    return res.status(413).json({ error: 'Fichier trop volumineux (8 Mo maximum).' });
  }

  await ensureUploadDir();
  const ext = extensionFromName(filename);
  const key = randomBytes(16).toString('hex') + (ext ? `.${ext}` : '');
  const storedPath = resolveStoredPath(key);
  if (!storedPath) return res.status(500).json({ error: 'Erreur de stockage' });
  await writeFile(storedPath, buffer);

  const attachment = await prisma.attachment.create({
    data: {
      filename,
      url: key,
      meetingId: meetingId || undefined,
      reportId: reportId || undefined,
      uploadedById: session.user.id,
    },
    select: { id: true, filename: true, createdAt: true },
  });

  await logAction('Attachment', attachment.id, 'CREATE', session.user.id, {
    meetingId,
    reportId,
    bytes: buffer.length,
  });

  return res.status(201).json({ attachment });
}
