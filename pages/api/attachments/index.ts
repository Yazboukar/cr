import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';
import { requireAuth } from '../../../src/lib/permissions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await requireAuth(req, res);
    if (!session) return;
    const { meetingId, reportId, filename, url } = req.body;
    if (!filename || !url) return res.status(400).json({ error: 'filename and url required' });
    const attachment = await prisma.attachment.create({ data: { filename, url, meetingId, reportId, uploadedById: (session.user as any).id } as any });
    return res.status(201).json({ attachment });
  }

  if (req.method === 'GET') {
    const session = await requireAuth(req, res);
    if (!session) return;
    const { meetingId, reportId } = req.query as any;
    const where: any = {};
    if (meetingId) where.meetingId = meetingId;
    if (reportId) where.reportId = reportId;
    const attachments = await prisma.attachment.findMany({ where });
    return res.status(200).json({ attachments });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end();
}
