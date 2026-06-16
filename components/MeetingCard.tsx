import Link from 'next/link';
import { meetingStatusLabels } from '../src/lib/meetings';

export default function MeetingCard({ meeting }: { meeting: any }) {
  const date = new Date(meeting.startTime || meeting.date);
  const dateLabel = date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: meeting.timezone || undefined,
  });
  const participantsCount = meeting.participants?.length ?? 0;
  const organizer = meeting.organizer?.name || meeting.organizer?.email || 'Equipe';
  const actionItems = meeting.report?.actionItems || [];
  const pendingActions = actionItems.filter((item: any) => !item.done).length;

  return (
    <article className="panel group relative overflow-hidden">
      {/* National tricolour of the Togolese Republic: green / yellow / red */}
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,_#006a4e,_#006a4e_40%,_#ffce00_40%,_#ffce00_70%,_#d21034_70%)]" />

      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <span className="status-chip">{meetingStatusLabels[meeting.status as keyof typeof meetingStatusLabels] || meeting.status}</span>
          <h3 className="mt-3 text-xl font-semibold text-[color:var(--brand-green-900)]">
            {meeting.title}
          </h3>
        </div>
        <div className="rounded-2xl bg-emerald-950/5 px-3 py-2 text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-800/60">
            Organisateur
          </p>
          <p className="text-sm text-slate-700">{organizer}</p>
        </div>
      </div>

      <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/70 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800/60">
            Date
          </p>
          <p className="mt-1 text-sm font-medium text-slate-700">{dateLabel}</p>
        </div>
        <div className="rounded-2xl bg-white/70 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800/60">
            Participants
          </p>
          <p className="mt-1 text-sm font-medium text-slate-700">{participantsCount} invités</p>
        </div>
        <div className="rounded-2xl bg-white/70 px-4 py-3 sm:col-span-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800/60">
            Suivi
          </p>
          <p className="mt-1 text-sm font-medium text-slate-700">
            {meeting.report ? `${pendingActions} action(s) ouverte(s)` : 'Compte rendu à créer'}
          </p>
        </div>
      </div>

      {meeting.description ? (
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{meeting.description}</p>
      ) : (
        <p className="mt-4 text-sm italic text-slate-500">Aucune description pour cette réunion.</p>
      )}

      <div className="mt-5 flex items-center justify-between">
        <div className="muted-chip">
          {meeting.location || meeting.type || 'Organisation interne'}
        </div>
        <Link href={`/meetings/${meeting.id}`} className="card-link">
          Ouvrir la réunion
          <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
    </article>
  );
}
