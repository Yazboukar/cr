import { describe, it, expect } from 'vitest';
import {
  parseZonedDate,
  formatZonedYmd,
  isValidTimeZone,
  escapeHtml,
  isValidEmail,
  normalizeEmail,
  safeExportFilename,
  attachmentHeader,
} from '../src/lib/validation';

describe('parseZonedDate (wall-clock in tz -> UTC instant)', () => {
  it('converts Paris summer time (CEST = UTC+2)', () => {
    expect(parseZonedDate('2026-07-01', '14:00', 'Europe/Paris')?.toISOString()).toBe(
      '2026-07-01T12:00:00.000Z'
    );
  });

  it('converts Paris winter time (CET = UTC+1)', () => {
    expect(parseZonedDate('2026-01-15', '14:00', 'Europe/Paris')?.toISOString()).toBe(
      '2026-01-15T13:00:00.000Z'
    );
  });

  it('treats UTC as identity', () => {
    expect(parseZonedDate('2026-07-01', '14:00', 'UTC')?.toISOString()).toBe(
      '2026-07-01T14:00:00.000Z'
    );
  });

  it('handles the spring-forward DST boundary in Paris (29 Mar 2026)', () => {
    // 01:30 is still CET (UTC+1) -> 00:30Z
    expect(parseZonedDate('2026-03-29', '01:30', 'Europe/Paris')?.toISOString()).toBe(
      '2026-03-29T00:30:00.000Z'
    );
    // 03:30 is already CEST (UTC+2) -> 01:30Z
    expect(parseZonedDate('2026-03-29', '03:30', 'Europe/Paris')?.toISOString()).toBe(
      '2026-03-29T01:30:00.000Z'
    );
  });

  it('returns null on invalid timezone or malformed input', () => {
    expect(parseZonedDate('2026-07-01', '14:00', 'Not/AZone')).toBeNull();
    expect(parseZonedDate('not-a-date', '14:00', 'UTC')).toBeNull();
    expect(parseZonedDate('2026-07-01', '99:99', 'UTC')).toBeNull();
  });
});

describe('formatZonedYmd (instant -> calendar day in tz)', () => {
  it('reflects the day as seen in the target zone', () => {
    // 23:30Z on 30 Jun is already 01:30 on 1 Jul in Paris (summer, UTC+2)
    expect(formatZonedYmd(new Date('2026-06-30T23:30:00.000Z'), 'Europe/Paris')).toBe('2026-07-01');
  });

  it('round-trips with parseZonedDate', () => {
    const instant = parseZonedDate('2026-12-31', '23:00', 'Europe/Paris');
    expect(instant).not.toBeNull();
    expect(formatZonedYmd(instant as Date, 'Europe/Paris')).toBe('2026-12-31');
  });
});

describe('isValidTimeZone', () => {
  it('accepts IANA zones', () => {
    expect(isValidTimeZone('Europe/Paris')).toBe(true);
    expect(isValidTimeZone('UTC')).toBe(true);
  });

  it('rejects junk and empty values', () => {
    expect(isValidTimeZone('Mars/Olympus')).toBe(false);
    expect(isValidTimeZone('')).toBe(false);
    expect(isValidTimeZone(null)).toBe(false);
    expect(isValidTimeZone(undefined)).toBe(false);
  });
});

describe('escapeHtml (PDF export XSS guard)', () => {
  it('escapes the dangerous characters', () => {
    expect(escapeHtml('<script>alert("x")</script>')).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'
    );
    expect(escapeHtml("a & b ' c")).toBe('a &amp; b &#39; c');
  });
});

describe('email helpers', () => {
  it('isValidEmail accepts/rejects', () => {
    expect(isValidEmail('a@b.co')).toBe(true);
    expect(isValidEmail('nope')).toBe(false);
    expect(isValidEmail('a@b')).toBe(false);
  });

  it('normalizeEmail lowercases and trims', () => {
    expect(normalizeEmail('  A@B.CO ')).toBe('a@b.co');
  });
});

describe('safeExportFilename', () => {
  it('strips path and illegal characters', () => {
    expect(safeExportFilename('a/b:c*?', 'fallback')).not.toMatch(/[/\\:*?"<>|]/);
  });

  it('falls back when nothing usable remains', () => {
    expect(safeExportFilename('   ', 'fallback')).toBe('fallback');
  });

  it('strips non-ASCII so the result is HTTP-header-safe', () => {
    const out = safeExportFilename('CR — Réunion test', 'rapport');
    // eslint-disable-next-line no-control-regex
    expect(out).toMatch(/^[\x20-\x7E]*$/);
    expect(out).not.toBe('');
  });
});

describe('attachmentHeader (RFC 6266/5987)', () => {
  it('produces an ASCII-only header value even for accented titles', () => {
    const header = attachmentHeader('CR — Réunion test fuseau.pdf', 'rapport');
    // The whole header must be ASCII (this is what previously threw ERR_INVALID_CHAR)
    // eslint-disable-next-line no-control-regex
    expect(header).toMatch(/^[\x20-\x7E]*$/);
    expect(header).toContain('filename="');
    expect(header).toContain(".pdf");
    // and it keeps the accented original in the UTF-8 variant
    expect(header).toContain("filename*=UTF-8''");
    expect(header).toContain(encodeURIComponent('CR — Réunion test fuseau.pdf'));
  });

  it('uses the fallback when the title has no ASCII characters', () => {
    const header = attachmentHeader('日本語.pdf', 'rapport');
    expect(header).toContain('filename="rapport.pdf"');
  });
});
