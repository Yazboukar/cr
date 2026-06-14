// In-memory fixed-window login throttle. NOTE: per-process only — for a
// multi-instance deployment this must be backed by Redis (or similar). It is a
// first-line brute-force guard, intentionally simple.
type Attempt = { count: number; windowStart: number; lockedUntil: number };

const WINDOW_MS = 15 * 60 * 1000; // rolling window for counting failures
const MAX_ATTEMPTS = 5; // failures allowed within the window
const LOCK_MS = 15 * 60 * 1000; // lockout duration once the threshold is hit

const attempts = new Map<string, Attempt>();

export function isRateLimited(key: string, now = Date.now()) {
  const entry = attempts.get(key);
  return Boolean(entry && entry.lockedUntil > now);
}

export function recordFailure(key: string, now = Date.now()) {
  let entry = attempts.get(key);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    entry = { count: 0, windowStart: now, lockedUntil: 0 };
  }
  entry.count += 1;
  if (entry.count >= MAX_ATTEMPTS) {
    entry.lockedUntil = now + LOCK_MS;
  }
  attempts.set(key, entry);

  // Opportunistic cleanup so the map cannot grow unbounded.
  if (attempts.size > 5000) {
    for (const [k, e] of attempts) {
      if (e.lockedUntil < now && now - e.windowStart > WINDOW_MS) attempts.delete(k);
    }
  }
}

export function resetAttempts(key: string) {
  attempts.delete(key);
}
