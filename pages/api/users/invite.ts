import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';
import { requireRole } from '../../../src/lib/permissions';
import { isValidEmail, normalizeEmail, normalizeOptionalString } from '../../../src/lib/validation';
import { generateToken, hashToken, INVITE_TTL_MS } from '../../../src/lib/tokens';
import { sendInviteEmail } from '../../../services/notification';
import { logAction } from '../../../src/lib/audit';

const INVITABLE_ROLES = ['ADMIN', 'ORGANIZER', 'REPORTER'] as const;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  }

  const session = await requireRole(req, res, ['ADMIN']);
  if (!session) return;

  const email = normalizeEmail(req.body?.email);
  const name = normalizeOptionalString(req.body?.name);
  const role = normalizeOptionalString(req.body?.role) || 'ORGANIZER';

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Email invalide' });
  }
  if (!INVITABLE_ROLES.includes(role as (typeof INVITABLE_ROLES)[number])) {
    return res.status(400).json({ error: 'Rôle invalide' });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing && existing.hashedPassword) {
    return res.status(409).json({ error: 'Un compte actif existe déjà avec cet email.' });
  }

  const user = existing
    ? await prisma.user.update({
        where: { id: existing.id },
        data: { role: role as any, name: name ?? existing.name },
      })
    : await prisma.user.create({ data: { email, name, role: role as any } });

  const token = generateToken();
  await prisma.accountToken.create({
    data: {
      userId: user.id,
      type: 'INVITE',
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + INVITE_TTL_MS),
    },
  });

  try {
    await sendInviteEmail(user.email, token, role);
  } catch (err) {
    console.error('Échec d’envoi de l’email d’invitation', err);
  }

  await logAction('User', user.id, 'INVITE', session.user.id, { role });

  return res.status(201).json({ ok: true, user: { id: user.id, email: user.email, role } });
}
