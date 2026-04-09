import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';
import { requireAuth, requireOrganizerOrAdmin } from '../../../src/lib/permissions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };
  if (req.method === 'GET') {
    const session = await requireAuth(req, res);
    if (!session) return;
    const meeting = await prisma.meeting.findUnique({ where: { id }, include: { participants: { include: { user: true } }, organizer: true, attachments: true, report: true } });
    if (!meeting) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json({ meeting });
  }

  if (req.method === 'PUT') {
    const meeting = await prisma.meeting.findUnique({ where: { id } });
    if (!meeting) return res.status(404).json({ error: 'Not found' });
    const session = await requireOrganizerOrAdmin(req, res, meeting.organizerId);
    if (!session) return;
    const data = req.body;
    const updated = await prisma.meeting.update({ where: { id }, data });
    return res.status(200).json({ meeting: updated });
  }

  if (req.method === 'DELETE') {
    const meeting = await prisma.meeting.findUnique({ where: { id } });
    if (!meeting) return res.status(404).json({ error: 'Not found' });
    const session = await requireOrganizerOrAdmin(req, res, meeting.organizerId);
    if (!session) return;
    await prisma.meeting.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
