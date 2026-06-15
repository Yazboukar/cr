// Minimal RFC 5545 (iCalendar) generator for meeting events.

function pad(n: number) {
  return String(n).padStart(2, '0');
}

// UTC basic date-time form: YYYYMMDDTHHMMSSZ
export function toIcsUtc(value: Date): string {
  return (
    value.getUTCFullYear().toString() +
    pad(value.getUTCMonth() + 1) +
    pad(value.getUTCDate()) +
    'T' +
    pad(value.getUTCHours()) +
    pad(value.getUTCMinutes()) +
    pad(value.getUTCSeconds()) +
    'Z'
  );
}

// Escape TEXT values per RFC 5545 (backslash, semicolon, comma, newlines).
export function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

export type IcsMeeting = {
  id: string;
  title: string;
  description?: string | null;
  location?: string | null;
  date: string | Date;
  startTime?: string | Date | null;
  endTime?: string | Date | null;
  organizer?: { name?: string | null; email?: string | null } | null;
  participants?: Array<{ contact?: { name?: string | null; email?: string | null } | null }> | null;
};

export function buildEvent(meeting: IcsMeeting, stamp: Date): string[] {
  const start = new Date(meeting.startTime || meeting.date);
  const end = meeting.endTime
    ? new Date(meeting.endTime)
    : new Date(start.getTime() + 60 * 60 * 1000);

  const lines = [
    'BEGIN:VEVENT',
    `UID:${meeting.id}@meetingflow`,
    `DTSTAMP:${toIcsUtc(stamp)}`,
    `DTSTART:${toIcsUtc(start)}`,
    `DTEND:${toIcsUtc(end)}`,
    `SUMMARY:${escapeIcsText(meeting.title || 'Réunion')}`,
  ];

  if (meeting.description) lines.push(`DESCRIPTION:${escapeIcsText(meeting.description)}`);
  if (meeting.location) lines.push(`LOCATION:${escapeIcsText(meeting.location)}`);

  if (meeting.organizer?.email) {
    const cn = meeting.organizer.name ? `;CN=${escapeIcsText(meeting.organizer.name)}` : '';
    lines.push(`ORGANIZER${cn}:mailto:${meeting.organizer.email}`);
  }

  for (const participant of meeting.participants || []) {
    const contact = participant.contact;
    if (contact?.email) {
      const cn = contact.name ? `;CN=${escapeIcsText(contact.name)}` : '';
      lines.push(`ATTENDEE${cn};ROLE=REQ-PARTICIPANT:mailto:${contact.email}`);
    }
  }

  lines.push('END:VEVENT');
  return lines;
}

export function buildCalendar(meetings: IcsMeeting[], stamp = new Date()): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MeetingFlow//Republique Togolaise//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];
  for (const meeting of meetings) lines.push(...buildEvent(meeting, stamp));
  lines.push('END:VCALENDAR');
  // RFC 5545 mandates CRLF line endings.
  return lines.join('\r\n') + '\r\n';
}
