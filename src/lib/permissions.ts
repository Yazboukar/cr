import { getServerSession } from 'next-auth/next';
import authOptions from './authOptions';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function requireAuth(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req as any, res as any, authOptions as any);
  if (!session || !session.user) {
    res.status(401).json({ error: 'Authentication required' });
    return null;
  }
  return session as any;
}

export async function requireRole(req: NextApiRequest, res: NextApiResponse, roles: string[]) {
  const session = await requireAuth(req, res);
  if (!session) return null;
  if (!roles.includes((session.user as any).role)) {
    res.status(403).json({ error: 'Insufficient permissions' });
    return null;
  }
  return session as any;
}

export async function requireOrganizerOrAdmin(req: NextApiRequest, res: NextApiResponse, organizerId: string) {
  const session = await requireAuth(req, res);
  if (!session) return null;
  const role = (session.user as any).role;
  const userId = (session.user as any).id;
  if (role === 'ADMIN' || userId === organizerId) return session as any;
  res.status(403).json({ error: 'Forbidden' });
  return null;
}
