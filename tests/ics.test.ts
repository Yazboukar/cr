import { describe, it, expect } from 'vitest';
import { toIcsUtc, escapeIcsText, buildCalendar } from '../src/lib/ics';

const stamp = new Date('2026-06-15T08:00:00.000Z');

describe('toIcsUtc', () => {
  it('formats a UTC instant in basic form', () => {
    expect(toIcsUtc(new Date('2026-09-15T12:00:00.000Z'))).toBe('20260915T120000Z');
  });
});

describe('escapeIcsText', () => {
  it('escapes special characters and newlines', () => {
    expect(escapeIcsText('a; b, c\\ d\ne')).toBe('a\\; b\\, c\\\\ d\\ne');
  });
});

describe('buildCalendar', () => {
  const meeting = {
    id: 'm1',
    title: 'Réunion stratégie',
    description: 'Ordre du jour: point 1; point 2',
    location: 'Lomé',
    date: '2026-09-15T00:00:00.000Z',
    startTime: '2026-09-15T12:00:00.000Z',
    endTime: '2026-09-15T13:00:00.000Z',
    organizer: { name: 'Org', email: 'org@example.com' },
    participants: [{ contact: { name: 'Inv', email: 'inv@example.com' } }],
  };

  const ics = buildCalendar([meeting], stamp);

  it('wraps events in a VCALENDAR with CRLF endings', () => {
    expect(ics.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true);
    expect(ics.trimEnd().endsWith('END:VCALENDAR')).toBe(true);
    expect(ics.includes('\r\n')).toBe(true);
  });

  it('emits the event fields with UTC times', () => {
    expect(ics).toContain('UID:m1@meetingflow');
    expect(ics).toContain('DTSTART:20260915T120000Z');
    expect(ics).toContain('DTEND:20260915T130000Z');
    expect(ics).toContain('SUMMARY:Réunion stratégie');
    expect(ics).toContain('DESCRIPTION:Ordre du jour: point 1\\; point 2');
    expect(ics).toContain('ORGANIZER;CN=Org:mailto:org@example.com');
    expect(ics).toContain('ATTENDEE;CN=Inv;ROLE=REQ-PARTICIPANT:mailto:inv@example.com');
  });

  it('defaults DTEND to one hour after start when missing', () => {
    const noEnd = buildCalendar([{ ...meeting, endTime: null }], stamp);
    expect(noEnd).toContain('DTEND:20260915T130000Z');
  });
});
