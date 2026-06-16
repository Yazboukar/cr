import { randomBytes, createHash } from 'crypto';

// 256-bit random token. The raw value is e-mailed; only its hash is stored.
export function generateToken() {
  return randomBytes(32).toString('hex');
}

export function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export const PASSWORD_RESET_TTL_MS = 60 * 60 * 1000; // 1 hour
export const INVITE_TTL_MS = 72 * 60 * 60 * 1000; // 72 hours

// Minimum acceptable password length when (re)setting credentials.
export const MIN_PASSWORD_LENGTH = 8;

export function isAcceptablePassword(value: unknown): value is string {
  return typeof value === 'string' && value.length >= MIN_PASSWORD_LENGTH;
}
