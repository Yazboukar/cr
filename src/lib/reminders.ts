// Reminder offsets before a meeting start, in minutes: 24h, 1h, 30min, 5min.
// Shared by the meeting-creation and reschedule endpoints so the cadence stays
// defined in a single place.
export const REMINDER_OFFSETS_MINUTES = [24 * 60, 60, 30, 5];

export function buildReminderTimes(start: Date, now = new Date()) {
  return REMINDER_OFFSETS_MINUTES.map(
    (offset) => new Date(start.getTime() - offset * 60 * 1000)
  ).filter((scheduledAt) => scheduledAt.getTime() > now.getTime());
}
