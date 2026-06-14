import { getServerSession } from 'next-auth/next';
import authOptions from './authOptions';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from 'next-auth';
import type { Role } from '@prisma/client';
import { prisma } from './prisma';

export async function requireAuth(req: NextApiRequest, res: NextApiResponse): Promise<Session | null> {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    res.status(401).json({ error: 'Authentification requise' });
    return null;
  }
  return session;
}

export async function requireRole(
  req: NextApiRequest,
  res: NextApiResponse,
  roles: Role[]
): Promise<Session | null> {
  const session = await requireAuth(req, res);
  if (!session) return null;
  if (!roles.includes(session.user.role)) {
    res.status(403).json({ error: 'Droits insuffisants' });
    return null;
  }
  return session;
}

export async function requireOrganizerOrAdmin(
  req: NextApiRequest,
  res: NextApiResponse,
  organizerId: string
): Promise<Session | null> {
  const session = await requireAuth(req, res);
  if (!session) return null;
  const { role, id } = session.user;
  if (role === 'ADMIN' || id === organizerId) return session;
  res.status(403).json({ error: 'Accès refusé' });
  return null;
}

/**
 * Returns true if the session user may read a meeting: admins see everything,
 * otherwise the user must be the organizer or one of its participants.
 */
export async function userCanAccessMeeting(session: Session, meetingId: string) {
  const { role, id: userId } = session.user;
  if (role === 'ADMIN') return true;
  const meeting = await prisma.meeting.findFirst({
    where: {
      id: meetingId,
      OR: [{ organizerId: userId }, { participants: { some: { userId } } }],
    },
    select: { id: true },
  });
  return Boolean(meeting);
}

/**
 * Guards a read on a single meeting. Responds with 403 and returns false when
 * the authenticated user is neither admin, organizer nor participant.
 */
export async function requireMeetingAccess(res: NextApiResponse, session: Session, meetingId: string) {
  if (await userCanAccessMeeting(session, meetingId)) return true;
  res.status(403).json({ error: 'Accès refusé' });
  return false;
}
