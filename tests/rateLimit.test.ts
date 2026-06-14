import { describe, it, expect, beforeEach } from 'vitest';
import { isRateLimited, recordFailure, resetAttempts } from '../src/lib/rateLimit';

const key = 'ip:user@example.com';

describe('login rate limiter', () => {
  beforeEach(() => resetAttempts(key));

  it('is not limited below the threshold', () => {
    for (let i = 0; i < 4; i++) recordFailure(key);
    expect(isRateLimited(key)).toBe(false);
  });

  it('locks after 5 failures within the window', () => {
    for (let i = 0; i < 5; i++) recordFailure(key);
    expect(isRateLimited(key)).toBe(true);
  });

  it('reset clears the lock (successful login path)', () => {
    for (let i = 0; i < 5; i++) recordFailure(key);
    resetAttempts(key);
    expect(isRateLimited(key)).toBe(false);
  });
});
