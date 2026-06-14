import Link from 'next/link';
import useSWR from 'swr';
import MeetingCard from '../components/MeetingCard';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Dashboard() {
  const { data } = useSWR('/api/meetings', fetcher);
  const meetings = data?.meetings || [];
  const plannedCount = meetings.filter((meeting: any) => meeting.status === 'PLANNED').length;
  const completedCount = meetings.filter((meeting: any) => meeting.status === 'COMPLETED').length;
  const missingReportsCount = meetings.filter((meeting: any) => meeting.status === 'COMPLETED' && !meeting.report).length;
  const pendingActionsCount = meetings.reduce(
    (total: number, meeting: any) =>
      total + (meeting.report?.actionItems || []).filter((item: any) => !item.done).length,
    0
  );
  const participantsCount = meetings.reduce(
    (total: number, meeting: any) => total + (meeting.participants?.length || 0),
    0
  );

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="hero-card">
          <span className="eyebrow">Coordination et suivi</span>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">
            Espace de pilotage du Secrétariat général pour la coordination des réunions.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-50/82 md:text-base">
            Ce tableau de bord accompagne le Secrétariat général dans l&apos;organisation, la
            coordination et le suivi des réunions : une vue d&apos;ensemble claire des sessions,
            des participants et des comptes rendus.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/meetings/create" className="btn">
              Créer une réunion
            </Link>
            <Link href="/meetings" className="btn-secondary">
              Voir toutes les réunions
            </Link>
          </div>
        </div>

        <aside className="hero-aside">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-800/70">
            Synthèse rapide
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-3xl font-semibold text-[color:var(--brand-green-900)]">
                {meetings.length}
              </p>
              <p className="mt-1 text-sm text-slate-600">Réunions référencées au total.</p>
            </div>
            <div className="h-px bg-emerald-950/10" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl bg-white/70 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800/60">
                  À venir
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-800">{plannedCount}</p>
              </div>
              <div className="rounded-2xl bg-white/70 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800/60">
                  Actions
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-800">{pendingActionsCount}</p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="metric-grid">
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Volume
          </p>
          <p className="mt-3 text-3xl font-semibold text-[color:var(--brand-green-900)]">
            {meetings.length}
          </p>
          <p className="mt-2 text-sm text-slate-600">Réunions enregistrées dans la plateforme.</p>
        </div>
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Planification
          </p>
          <p className="mt-3 text-3xl font-semibold text-[color:var(--brand-green-900)]">
            {plannedCount}
          </p>
          <p className="mt-2 text-sm text-slate-600">Réunions planifiées, en attente de tenue.</p>
        </div>
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Participants
          </p>
          <p className="mt-3 text-3xl font-semibold text-[color:var(--brand-green-900)]">
            {participantsCount}
          </p>
          <p className="mt-2 text-sm text-slate-600">Participants rattachés à l&apos;ensemble des réunions.</p>
        </div>
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Comptes rendus
          </p>
          <p className="mt-3 text-3xl font-semibold text-[color:var(--brand-green-900)]">
            {missingReportsCount}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Réunions terminées sans compte rendu.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="panel">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Exécution
          </p>
          <p className="mt-3 text-3xl font-semibold text-[color:var(--brand-green-900)]">
            {completedCount}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">Réunions clôturées.</p>
        </div>
        <div className="panel">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Actions de suivi
          </p>
          <p className="mt-3 text-3xl font-semibold text-[color:var(--brand-green-900)]">
            {pendingActionsCount}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">Actions ouvertes issues des comptes rendus.</p>
        </div>
        <div className="panel">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Participation
          </p>
          <p className="mt-3 text-3xl font-semibold text-[color:var(--brand-green-900)]">
            {participantsCount}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">Invitations cumulées sur l&apos;ensemble des réunions.</p>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
              Réunions
            </p>
            <h2 className="section-title mt-2">Prochaines sessions</h2>
          </div>
          <Link href="/calendar" className="btn-secondary">
            Vue calendrier
          </Link>
        </div>

        {meetings.length > 0 ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {meetings.map((meeting: any) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        ) : (
          <div className="panel">
            <p className="text-lg font-semibold text-[color:var(--brand-green-900)]">
              Aucune réunion pour le moment.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Créez une première réunion pour structurer les invitations et les comptes rendus.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
