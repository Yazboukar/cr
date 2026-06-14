import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';
import { hashPassword } from '../../../src/lib/auth';
import { hashToken, isAcceptablePassword, MIN_PASSWORD_LENGTH } from '../../../src/lib/tokens';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  }

  const token = typeof req.body?.token === 'string' ? req.body.token : '';
  const password = req.body?.password;

  if (!token) {
    return res.status(400).json({ error: 'Lien invalide.' });
  }
  if (!isAcceptablePassword(password)) {
    return res
      .status(400)
      .json({ error: `Le mot de passe doit comporter au moins ${MIN_PASSWORD_LENGTH} caractères.` });
  }

  const record = await prisma.accountToken.findUnique({ where: { tokenHash: hashToken(token) } });
  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return res.status(400).json({ error: 'Lien invalide ou expiré.' });
  }

  const hashed = await hashPassword(password);
  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { hashedPassword: hashed } }),
    // Burn this token and any other outstanding ones for the account.
    prisma.accountToken.updateMany({
      where: { userId: record.userId, usedAt: null },
      data: { usedAt: new Date() },
    }),
  ]);

  return res.status(200).json({ ok: true });
}
