import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';
import { requireRole } from '../../../src/lib/permissions';
import { isValidEmail, normalizeEmail, normalizeString } from '../../../src/lib/validation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // The directory exposes every participant's email, so it is restricted to
    // the roles that actually compose meetings.
    const session = await requireRole(req, res, ['ADMIN', 'ORGANIZER']);
    if (!session) return;

    const participants = await prisma.user.findMany({
      where: { role: 'PARTICIPANT' },
      orderBy: [{ name: 'asc' }, { email: 'asc' }],
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        _count: {
          select: {
            participants: true,
          },
        },
      },
    });

    return res.status(200).json({ participants });
  }

  if (req.method === 'POST') {
    const session = await requireRole(req, res, ['ADMIN', 'ORGANIZER']);
    if (!session) return;

    const name = normalizeString(req.body?.name);
    const email = normalizeEmail(req.body?.email);

    if (!email) {
      return res.status(400).json({ error: 'Email requis' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Email invalide' });
    }

    const participant = await prisma.user.upsert({
      where: { email },
      // Do not touch role on update: avoids downgrading an existing
      // ADMIN/ORGANIZER when their email is re-added to the directory.
      update: {
        name: name || undefined,
      },
      create: {
        name: name || null,
        email,
        role: 'PARTICIPANT',
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return res.status(201).json({ participant });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Méthode ${req.method} non autorisée`);
}
