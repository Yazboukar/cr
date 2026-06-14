import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';
import { requireRole } from '../../../src/lib/permissions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  }

  // The audit trail can expose who did what across the whole system, so it is
  // strictly admin-only.
  const session = await requireRole(req, res, ['ADMIN']);
  if (!session) return;

  const limit = Math.min(Number(req.query.limit) || 100, 500);

  const logs = await prisma.auditLog.findMany({
    orderBy: { timestamp: 'desc' },
    take: limit,
    include: { actor: { select: { id: true, name: true, email: true } } },
  });

  return res.status(200).json({ logs });
}
