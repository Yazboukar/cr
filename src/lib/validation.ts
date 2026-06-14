export function normalizeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export function normalizeOptionalString(value: unknown) {
  const normalized = normalizeString(value);
  return normalized.length > 0 ? normalized : null;
}

export function normalizeEmail(value: unknown) {
  return normalizeString(value).toLowerCase();
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function parseDateTime(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export const DEFAULT_TIMEZONE = process.env.DEFAULT_TIMEZONE || 'Europe/Paris';

const TIME_ONLY = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/;
const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;

export function isValidTimeZone(value: unknown): value is string {
  if (typeof value !== 'string' || value.length === 0) return false;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

// Offset (ms) between the given instant and how the same instant reads in `timeZone`.
function getTimeZoneOffsetMs(timeZone: string, date: Date) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const map: Record<string, string> = {};
  for (const part of dtf.formatToParts(date)) {
    if (part.type !== 'literal') map[part.type] = part.value;
  }
  const hour = map.hour === '24' ? 0 : Number(map.hour);
  const asUtc = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    hour,
    Number(map.minute),
    Number(map.second)
  );
  return asUtc - date.getTime();
}

/**
 * Converts a wall-clock date/time expressed in `timeZone` into the absolute UTC
 * instant. Refines once to stay correct across DST transitions.
 */
export function zonedTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string
) {
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0);
  const offset = getTimeZoneOffsetMs(timeZone, new Date(utcGuess));
  let result = utcGuess - offset;
  const offset2 = getTimeZoneOffsetMs(timeZone, new Date(result));
  if (offset2 !== offset) result = utcGuess - offset2;
  return new Date(result);
}

/**
 * Parses a "YYYY-MM-DD" date and "HH:MM" time interpreted in `timeZone` into a
 * UTC Date. Returns null on malformed input or unknown timezone.
 */
export function parseZonedDate(dateStr: string, timeStr: string, timeZone: string) {
  const dateMatch = DATE_ONLY.exec(dateStr);
  if (!dateMatch || !isValidTimeZone(timeZone)) return null;

  let hour = 0;
  let minute = 0;
  if (timeStr) {
    const timeMatch = TIME_ONLY.exec(timeStr);
    if (!timeMatch) return null;
    hour = Number(timeMatch[1]);
    minute = Number(timeMatch[2]);
    if (hour > 23 || minute > 59) return null;
  }

  return zonedTimeToUtc(
    Number(dateMatch[1]),
    Number(dateMatch[2]),
    Number(dateMatch[3]),
    hour,
    minute,
    timeZone
  );
}

// "YYYY-MM-DD" calendar day of an instant as seen in `timeZone`.
export function formatZonedYmd(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function safeExportFilename(value: string, fallback: string) {
  const normalized = value
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
    .replace(/\s+/g, '_')
    .slice(0, 80);

  return normalized || fallback;
}
