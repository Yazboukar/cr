import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';
import { normalizeEmail } from '../../../src/lib/validation';
import { generateToken, hashToken, PASSWORD_RESET_TTL_MS } from '../../../src/lib/tokens';
import { sendPasswordResetEmail } from '../../../services/notification';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  }

  const email = normalizeEmail(req.body?.email);

  // Always answer 200 so the endpoint cannot be used to enumerate accounts.
  if (email) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      const token = generateToken();
      await prisma.accountToken.create({
        data: {
          userId: user.id,
          type: 'PASSWORD_RESET',
          tokenHash: hashToken(token),
          expiresAt: new Date(Date.now() + PASSWORD_RESET_TTL_MS),
        },
      });
      try {
        await sendPasswordResetEmail(user.email, token);
      } catch (err) {
        console.error('Échec d’envoi de l’email de réinitialisation', err);
      }
    }
  }

  return res.status(200).json({ ok: true });
}
