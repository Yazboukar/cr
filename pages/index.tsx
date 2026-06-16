import Link from 'next/link';
import { useMemo } from 'react';
import useSWR from 'swr';
import { formatZonedYmd } from '../src/lib/validation';
import { meetingStatusLabels } from '../src/lib/meetings';
import { reportStatusLabels } from '../src/lib/reportWorkflow';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function ymd(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`;
}

function meetingDay(meeting: any) {
  return formatZonedYmd(new Date(meeting.startTime || meeting.date), meeting.timezone || 'Europe/Paris');
}

function fmtDate(meeting: any) {
  try {
    return new Date(meeting.startTime || meeting.date).toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      timeZone: meeting.timezone || undefined,
    });
  } catch {
    return '';
  }
}

function fmtTime(meeting: any) {
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

export default function Dashboard() {
  const { data } = useSWR('/api/meetings', fetcher);
  const meetings = data?.meetings || [];

  const stats = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayKey = ymd(now);
    const instant = (m: any) => new Date(m.startTime || m.date).getTime();

    const upcoming = meetings
      .filter((m: any) => instant(m) >= startOfToday.getTime() && m.status !== 'CANCELLED')
      .sort((a: any, b: any) => instant(a) - instant(b));

    const todayMeetings = meetings.filter((m: any) => meetingDay(m) === todayKey && m.status !== 'CANCELLED');
    const completedNoReport = meetings.filter((m: any) => m.status === 'COMPLETED' && !m.report);
    const reportsToValidate = meetings.filter((m: any) => m.report?.status === 'UNDER_REVIEW');

    const actions = meetings.flatMap((m: any) =>
      (m.report?.actionItems || []).map((a: any) => ({ ...a, meetingId: m.id, meetingTitle: m.title }))
    );
    const openActions = actions.filter((a: any) => !a.done);
    const overdueActions = openActions
      .filter((a: any) => a.dueDate && new Date(a.dueDate) < startOfToday)
      .sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    return { upcoming, todayMeetings, completedNoReport, reportsToValidate, openActions, overdueActions };
  }, [meetings]);

  const kpis = [
    { label: 'À venir', value: stats.upcoming.length, href: '/meetings', hint: 'réunions à tenir' },
    { label: "Aujourd'hui", value: stats.todayMeetings.length, href: '/calendar', hint: 'séances du jour' },
    {
      label: 'CR à rédiger',
      value: stats.completedNoReport.length,
      href: '/meetings',
      hint: 'réunions sans compte rendu',
      alert: stats.completedNoReport.length > 0,
    },
    {
      label: 'CR à valider',
      value: stats.reportsToValidate.length,
      href: '/meetings',
      hint: 'en attente de validation',
      alert: stats.reportsToValidate.length > 0,
    },
    { label: 'Actions ouvertes', value: stats.openActions.length, hint: 'à suivre' },
    {
      label: 'Actions en retard',
      value: stats.overdueActions.length,
      hint: 'échéance dépassée',
      danger: stats.overdueActions.length > 0,
    },
  ];

  const nothingToHandle =
    stats.completedNoReport.length === 0 &&
    stats.reportsToValidate.length === 0 &&
    stats.overdueActions.length === 0;

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="hero-card">
          <span className="eyebrow">Coordination et suivi</span>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">
            Espace de pilotage du Secrétariat général pour la coordination des réunions.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-50/82 md:text-base">
            Suivez en un coup d&apos;œil les réunions à venir, les comptes rendus à produire ou à
            valider et les actions à relancer.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/meetings/create" className="btn">
              Créer une réunion
            </Link>
            <Link href="/calendar" className="btn-secondary">
              Vue calendrier
            </Link>
          </div>
        </div>

        <aside className="hero-aside">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-800/70">
            Aujourd&apos;hui
          </p>
          {stats.todayMeetings.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {stats.todayMeetings.map((meeting: any) => (
                <li key={meeting.id}>
                  <Link
                    href={`/meetings/${meeting.id}`}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-white/70 px-4 py-3 transition hover:bg-white"
                  >
                    <span className="truncate text-sm font-medium text-slate-800">{meeting.title}</span>
                    <span className="shrink-0 text-sm font-semibold text-[color:var(--brand-green-900)]">
                      {fmtTime(meeting) || '—'}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Aucune réunion programmée aujourd&apos;hui.
            </p>
          )}
        </aside>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((kpi) => {
          const card = (
            <div
              className={`metric-card h-full ${kpi.danger ? 'ring-1 ring-red-300' : ''} ${
                kpi.href ? 'transition hover:-translate-y-0.5' : ''
              }`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800/70">
                {kpi.label}
              </p>
              <p
                className={`mt-3 text-3xl font-semibold ${
                  kpi.danger
                    ? 'text-red-700'
                    : kpi.alert
                    ? 'text-[color:var(--brand-gold-400)]'
                    : 'text-[color:var(--brand-green-900)]'
                }`}
              >
                {kpi.value}
              </p>
              <p className="mt-1 text-xs text-slate-500">{kpi.hint}</p>
            </div>
          );
          return kpi.href ? (
            <Link key={kpi.label} href={kpi.href} className="block">
              {card}
            </Link>
          ) : (
            <div key={kpi.label}>{card}</div>
          );
        })}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="panel">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
                Réunions
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[color:var(--brand-green-900)]">
                Prochaines réunions
              </h2>
            </div>
            <Link href="/meetings" className="btn-secondary">
              Toutes
            </Link>
          </div>

          {stats.upcoming.length > 0 ? (
            <ul className="divide-y divide-emerald-950/8">
              {stats.upcoming.slice(0, 6).map((meeting: any) => (
                <li key={meeting.id}>
                  <Link
                    href={`/meetings/${meeting.id}`}
                    className="flex items-center gap-4 py-3 transition hover:opacity-80"
                  >
                    <div className="w-28 shrink-0">
                      <p className="text-sm font-semibold capitalize text-slate-800">{fmtDate(meeting)}</p>
                      <p className="text-xs text-slate-500">{fmtTime(meeting) || 'Heure à définir'}</p>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-slate-800">{meeting.title}</p>
                      <p className="truncate text-xs text-slate-500">
                        {meeting.location || meeting.type || 'Organisation interne'} ·{' '}
                        {meeting.participants?.length || 0} participant(s)
                      </p>
                    </div>
                    <span className="status-chip shrink-0">
                      {meetingStatusLabels[meeting.status as keyof typeof meetingStatusLabels] || meeting.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-emerald-950/8 bg-white/60 px-4 py-6 text-center">
              <p className="font-semibold text-[color:var(--brand-green-900)]">Aucune réunion à venir.</p>
              <p className="mt-1 text-sm text-slate-600">
                <Link href="/meetings/create" className="card-link">
                  Créer une réunion
                </Link>
              </p>
            </div>
          )}
        </div>

        <div className="panel">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            À traiter
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[color:var(--brand-green-900)]">Suivi</h2>

          {nothingToHandle ? (
            <p className="mt-4 rounded-2xl bg-emerald-50/70 px-4 py-4 text-sm leading-6 text-slate-700">
              Rien en attente — tout est à jour. 🎉
            </p>
          ) : (
            <div className="mt-4 space-y-5">
              {stats.completedNoReport.length > 0 ? (
                <div>
                  <p className="text-xs font-semibold text-slate-700">
                    Comptes rendus à rédiger ({stats.completedNoReport.length})
                  </p>
                  <ul className="mt-2 space-y-1">
                    {stats.completedNoReport.slice(0, 4).map((meeting: any) => (
                      <li key={meeting.id} className="truncate">
                        <Link href={`/reports/${meeting.id}`} className="card-link text-sm">
                          {meeting.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {stats.reportsToValidate.length > 0 ? (
                <div>
                  <p className="text-xs font-semibold text-slate-700">
                    Comptes rendus à valider ({stats.reportsToValidate.length})
                  </p>
                  <ul className="mt-2 space-y-1">
                    {stats.reportsToValidate.slice(0, 4).map((meeting: any) => (
                      <li key={meeting.id} className="flex items-center justify-between gap-2">
                        <Link href={`/reports/${meeting.id}`} className="card-link truncate text-sm">
                          {meeting.title}
                        </Link>
                        <span className="status-chip shrink-0">
                          {reportStatusLabels[meeting.report.status as keyof typeof reportStatusLabels]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {stats.overdueActions.length > 0 ? (
                <div>
                  <p className="text-xs font-semibold text-red-700">
                    Actions en retard ({stats.overdueActions.length})
                  </p>
                  <ul className="mt-2 space-y-1">
                    {stats.overdueActions.slice(0, 4).map((action: any) => (
                      <li key={action.id} className="text-sm">
                        <Link href={`/reports/${action.meetingId}`} className="text-slate-700 hover:underline">
                          <span className="truncate">{action.description}</span>
                          <span className="ml-1 text-xs text-red-600">
                            ({new Date(action.dueDate).toLocaleDateString('fr-FR')})
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
