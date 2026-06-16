import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';
import { requireRole } from '../../../src/lib/permissions';
import { isValidEmail, normalizeEmail, normalizeString } from '../../../src/lib/validation';

type ImportRow = {
  name?: string;
  email?: string;
};

function normalizeName(value: unknown) {
  return normalizeString(value);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  }

  const session = await requireRole(req, res, ['ADMIN', 'ORGANIZER']);
  if (!session) return;

  const rows = Array.isArray(req.body?.rows) ? (req.body.rows as ImportRow[]) : [];

  if (rows.length === 0) {
    return res.status(400).json({ error: 'Lignes à importer requises' });
  }

  let imported = 0;
  let skipped = 0;
  const seenEmails = new Set<string>();

  for (const row of rows) {
    const email = normalizeEmail(row.email);
    const name = normalizeName(row.name);

    if (!email || !isValidEmail(email) || seenEmails.has(email)) {
      skipped += 1;
      continue;
    }

    seenEmails.add(email);

    await prisma.contact.upsert({
      where: { email },
      update: {
        name: name || undefined,
      },
      create: {
        email,
        name: name || null,
      },
    });

    imported += 1;
  }

  return res.status(200).json({ imported, skipped });
}
