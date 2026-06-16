import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { formatZonedYmd } from '../src/lib/validation';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];
const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

function ymd(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function meetingTime(meeting: any) {
  if (!meeting.startTime) return '';
  try {
    return new Date(meeting.startTime).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: meeting.timezone || undefined,
    });
  } catch {
    return '';
  }
}

export default function CalendarPage() {
  const { data } = useSWR('/api/meetings', fetcher);
  const meetings = data?.meetings || [];

  const [mounted, setMounted] = useState(false);
  const [cursor, setCursor] = useState({ y: 2026, m: 5 });

  useEffect(() => {
    const now = new Date();
    setCursor({ y: now.getFullYear(), m: now.getMonth() });
    setMounted(true);
  }, []);

  const byDay = useMemo(() => {
    const map: Record<string, any[]> = {};
    for (const meeting of meetings) {
      const key = formatZonedYmd(
        new Date(meeting.startTime || meeting.date),
        meeting.timezone || 'Europe/Paris'
      );
      (map[key] = map[key] || []).push(meeting);
    }
    return map;
  }, [meetings]);

  const cells = useMemo(() => {
    const first = new Date(cursor.y, cursor.m, 1);
    const startWeekday = (first.getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
    const out: (number | null)[] = [];
    for (let i = 0; i < startWeekday; i++) out.push(null);
    for (let d = 1; d <= daysInMonth; d++) out.push(d);
    while (out.length % 7 !== 0) out.push(null);
    return out;
  }, [cursor]);

  function prev() {
    setCursor((c) => (c.m === 0 ? { y: c.y - 1, m: 11 } : { y: c.y, m: c.m - 1 }));
  }
  function next() {
    setCursor((c) => (c.m === 11 ? { y: c.y + 1, m: 0 } : { y: c.y, m: c.m + 1 }));
  }

  const now = new Date();
  const todayKey = ymd(now.getFullYear(), now.getMonth(), now.getDate());

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Planification
          </p>
          <h1 className="section-title mt-2">Calendrier</h1>
          <p className="section-copy mt-4">
            Vue mensuelle des réunions. Téléchargez une réunion ou l&apos;ensemble du calendrier au
            format <span className="font-semibold">.ics</span> pour l&apos;ajouter à Outlook, Google
            Agenda ou tout autre agenda.
          </p>
        </div>
        <div className="flex items-center justify-start gap-3 lg:justify-end">
          <a className="btn-secondary" href="/api/calendar/ics">
            Exporter (.ics)
          </a>
          <Link href="/meetings/create" className="btn">
            Nouvelle réunion
          </Link>
        </div>
      </section>

      <section className="panel">
        <div className="mb-5 flex items-center justify-between">
          <button className="btn-secondary" onClick={prev} type="button" aria-label="Mois précédent">
            ←
          </button>
          <h2 className="text-xl font-semibold text-[color:var(--brand-green-900)]">
            {mounted ? `${MONTHS[cursor.m]} ${cursor.y}` : ''}
          </h2>
          <button className="btn-secondary" onClick={next} type="button" aria-label="Mois suivant">
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {WEEKDAYS.map((w) => (
            <div
              key={w}
              className="text-center text-[11px] font-semibold uppercase tracking-wide text-emerald-800/70"
            >
              {w}
            </div>
          ))}

          {mounted &&
            cells.map((d, index) => {
              const key = d ? ymd(cursor.y, cursor.m, d) : null;
              const dayMeetings = key ? byDay[key] || [] : [];
              const isToday = key === todayKey;
              return (
                <div
                  key={index}
                  className={`min-h-[96px] rounded-xl border p-2 ${
                    d ? 'border-emerald-950/8 bg-white/70' : 'border-transparent'
                  } ${isToday ? 'ring-2 ring-emerald-600' : ''}`}
                >
                  {d ? <p className="text-xs font-semibold text-slate-500">{d}</p> : null}
                  <div className="mt-1 space-y-1">
                    {dayMeetings.map((meeting) => (
                      <Link
                        key={meeting.id}
                        href={`/meetings/${meeting.id}`}
                        title={meeting.title}
                        className="block truncate rounded-lg bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-900"
                      >
                        {meetingTime(meeting)} {meeting.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}
