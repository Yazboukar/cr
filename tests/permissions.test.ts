import { describe, it, expect, vi, beforeEach } from 'vitest';

// Isolate permissions.ts from the NextAuth runtime and the real DB.
const findFirst = vi.fn();
vi.mock('../src/lib/prisma', () => ({
  prisma: { meeting: { findFirst: (...args: unknown[]) => findFirst(...args) } },
}));
vi.mock('../src/lib/authOptions', () => ({ default: {}, authOptions: {} }));
vi.mock('next-auth/next', () => ({ getServerSession: vi.fn() }));

import { userCanAccessMeeting, requireMeetingAccess } from '../src/lib/permissions';

function makeSession(role: string, id = 'u1') {
  return { user: { id, role } } as any;
}

function makeRes() {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

beforeEach(() => {
  findFirst.mockReset();
});

describe('userCanAccessMeeting', () => {
  it('lets admins through without a membership query', async () => {
    expect(await userCanAccessMeeting(makeSession('ADMIN'), 'm1')).toBe(true);
    expect(findFirst).not.toHaveBeenCalled();
  });

  it('grants access when the user is the organizer', async () => {
    findFirst.mockResolvedValue({ id: 'm1' });
    expect(await userCanAccessMeeting(makeSession('ORGANIZER'), 'm1')).toBe(true);
    expect(findFirst).toHaveBeenCalledTimes(1);
  });

  it('denies access when the user does not organize the meeting', async () => {
    findFirst.mockResolvedValue(null);
    expect(await userCanAccessMeeting(makeSession('ORGANIZER'), 'm1')).toBe(false);
  });

  it('scopes the query to the meeting organized by the user', async () => {
    findFirst.mockResolvedValue(null);
    await userCanAccessMeeting(makeSession('ORGANIZER', 'user-42'), 'meeting-7');
    const arg = findFirst.mock.calls[0][0];
    expect(arg.where.id).toBe('meeting-7');
    expect(arg.where.organizerId).toBe('user-42');
    expect(arg.where.OR).toBeUndefined();
  });
});

describe('requireMeetingAccess', () => {
  it('returns true and never touches res when access is allowed', async () => {
    findFirst.mockResolvedValue({ id: 'm1' });
    const res = makeRes();
    expect(await requireMeetingAccess(res, makeSession('PARTICIPANT'), 'm1')).toBe(true);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('responds 403 and returns false when access is denied', async () => {
    findFirst.mockResolvedValue(null);
    const res = makeRes();
    expect(await requireMeetingAccess(res, makeSession('PARTICIPANT'), 'm1')).toBe(false);
    expect(res.status).toHaveBeenCalledWith(403);
  });
});
