import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { meetingStatusLabels, participantStatusLabels } from '../../src/lib/meetings';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const meetingStatuses = Object.entries(meetingStatusLabels);
const participantStatuses = Object.entries(participantStatusLabels);

function formatDate(value: string, timeZone?: string | null) {
  return new Date(value).toLocaleString('fr-FR', timeZone ? { timeZone } : undefined);
}

export default function MeetingDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate, isLoading } = useSWR(id ? `/api/meetings/${id}` : null, fetcher);
  const meeting = data?.meeting;
  const [statusSaving, setStatusSaving] = useState(false);
  const [participantSavingId, setParticipantSavingId] = useState('');
  const [newParticipantName, setNewParticipantName] = useState('');
  const [newParticipantEmail, setNewParticipantEmail] = useState('');
  const [addingParticipant, setAddingParticipant] = useState(false);
  const [error, setError] = useState('');

  if (isLoading || !meeting) {
    return <div className="page-shell text-sm text-slate-600">Chargement de la réunion...</div>;
  }

  async function updateMeetingStatus(status: string) {
    setStatusSaving(true);
    setError('');

    const response = await fetch(`/api/meetings/${meeting.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    setStatusSaving(false);

    if (!response.ok) {
      setError("Le statut de la réunion n'a pas pu être mis à jour.");
      return;
    }

    await mutate();
  }

  async function updateParticipantStatus(participantId: string, status: string) {
    setParticipantSavingId(participantId);
    setError('');

    const response = await fetch(`/api/meetings/${meeting.id}/participants`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participantId, status }),
    });

    setParticipantSavingId('');

    if (!response.ok) {
      setError("La présence du participant n'a pas pu être mise à jour.");
      return;
    }

    await mutate();
  }

  async function addParticipant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAddingParticipant(true);
    setError('');

    const response = await fetch(`/api/meetings/${meeting.id}/participants`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newParticipantName, email: newParticipantEmail }),
    });

    setAddingParticipant(false);

    if (!response.ok) {
      setError("Le participant n'a pas pu être ajouté à la réunion.");
      return;
    }

    setNewParticipantName('');
    setNewParticipantEmail('');
    await mutate();
  }

  async function removeParticipant(participantId: string) {
    const confirmed = window.confirm('Retirer ce participant de la réunion ?');
    if (!confirmed) return;

    const response = await fetch(`/api/meetings/${meeting.id}/participants`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participantId }),
    });

    if (!response.ok) {
      setError("Le participant n'a pas pu être retiré.");
      return;
    }

    await mutate();
  }

  async function scheduleNotifications() {
    const response = await fetch('/api/notifications/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ meetingId: meeting.id }),
    });

    if (!response.ok) {
      setError("Les rappels n'ont pas pu être planifiés.");
      return;
    }

    setError('');
    await mutate();
  }

  async function deleteMeeting() {
    const confirmed = window.confirm('Supprimer définitivement cette réunion et ses données liées ?');
    if (!confirmed) return;

    const response = await fetch(`/api/meetings/${meeting.id}`, { method: 'DELETE' });
    if (!response.ok) {
      setError("La réunion n'a pas pu être supprimée.");
      return;
    }

    router.push('/meetings');
  }

  const meetingDate = formatDate(meeting.startTime || meeting.date, meeting.timezone);
  const reportLabel = meeting.report ? 'Compte rendu disponible' : 'Compte rendu à rédiger';

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="hero-card">
          <span className="eyebrow">Fiche réunion</span>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">
            {meeting.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-50/82 md:text-base">
            {meeting.description || 'Cette réunion ne contient pas encore de description détaillée.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="muted-chip">{meetingDate}</span>
            {meeting.timezone ? <span className="muted-chip">Fuseau: {meeting.timezone}</span> : null}
            <span className="muted-chip">Statut: {meetingStatusLabels[meeting.status as keyof typeof meetingStatusLabels] || meeting.status}</span>
            {meeting.location ? <span className="muted-chip">Lieu: {meeting.location}</span> : null}
          </div>
        </div>

        <aside className="hero-aside">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Pilotage
          </p>
          <label className="label mt-4 block">
            Statut de la réunion
            <select
              className="input"
              disabled={statusSaving}
              value={meeting.status}
              onChange={(event) => updateMeetingStatus(event.target.value)}
            >
              {meetingStatuses.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Rapport
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">{reportLabel}</p>
        </aside>
      </section>

      {error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="panel">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
                Mobilisation
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[color:var(--brand-green-900)]">
                Participants
              </h2>
            </div>
            <span className="status-chip">{meeting.participants?.length || 0} personnes</span>
          </div>

          {meeting.participants?.length ? (
            <ul className="space-y-3">
              {meeting.participants.map((participant: any) => (
                <li
                  key={participant.id}
                  className="grid gap-3 rounded-2xl border border-emerald-950/8 bg-white/70 px-4 py-4 md:grid-cols-[1fr_190px_auto] md:items-center"
                >
                  <div>
                    <p className="font-semibold text-slate-800">
                      {participant.contact?.name || participant.contact?.email}
                    </p>
                    <p className="text-sm text-slate-500">{participant.contact?.email}</p>
                  </div>
                  <select
                    className="input mt-0"
                    disabled={participantSavingId === participant.id}
                    value={participant.status}
                    onChange={(event) => updateParticipantStatus(participant.id, event.target.value)}
                  >
                    {participantStatuses.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn-secondary"
                    type="button"
                    onClick={() => removeParticipant(participant.id)}
                  >
                    Retirer
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-600">Aucun participant n&apos;est encore attaché à cette réunion.</p>
          )}

          <form onSubmit={addParticipant} className="mt-6 rounded-2xl border border-emerald-950/8 bg-emerald-50/60 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
              Ajouter un invite
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
              <label className="label">
                Nom
                <input
                  className="input"
                  value={newParticipantName}
                  onChange={(event) => setNewParticipantName(event.target.value)}
                  placeholder="Nom complet"
                />
              </label>
              <label className="label">
                Email
                <input
                  className="input"
                  required
                  type="email"
                  value={newParticipantEmail}
                  onChange={(event) => setNewParticipantEmail(event.target.value)}
                  placeholder="participant@example.com"
                />
              </label>
              <button className="btn" disabled={addingParticipant} type="submit">
                {addingParticipant ? 'Ajout...' : 'Ajouter'}
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-6">
          <section className="panel">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
              Actions
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <Link href={`/reports/${meeting.id}`} className="btn">
                {meeting.report ? 'Ouvrir le compte rendu' : 'Rédiger le compte rendu'}
              </Link>
              <button className="btn-secondary" type="button" onClick={scheduleNotifications}>
                Reprogrammer les rappels
              </button>
              <Link href="/meetings" className="btn-secondary">
                Retour aux réunions
              </Link>
              <button className="btn-danger" type="button" onClick={deleteMeeting}>
                Supprimer la réunion
              </button>
            </div>
          </section>

          <section className="panel">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
              Agenda
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {meeting.agenda || 'Aucun agenda n&apos;a encore été saisi pour cette réunion.'}
            </p>
          </section>

          <section className="panel">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
              Organisateur
            </p>
            <p className="mt-3 text-lg font-semibold text-[color:var(--brand-green-900)]">
              {meeting.organizer?.name || meeting.organizer?.email || 'Non défini'}
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
