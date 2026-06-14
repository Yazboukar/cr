import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const TIMEZONE_OPTIONS = [
  'Europe/Paris',
  'Europe/London',
  'UTC',
  'Africa/Casablanca',
  'Africa/Algiers',
  'Africa/Tunis',
  'Africa/Dakar',
  'America/New_York',
  'America/Los_Angeles',
  'Asia/Dubai',
];

export default function CreateMeeting() {
  const router = useRouter();
  const { data } = useSWR('/api/participants', fetcher);
  const savedParticipants = data?.participants || [];
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timezone, setTimezone] = useState('Europe/Paris');
  const [description, setDescription] = useState('');
  const [participantIds, setParticipantIds] = useState<string[]>([]);
  const [participants, setParticipants] = useState('');
  const [location, setLocation] = useState('');
  const [agenda, setAgenda] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedParticipantsCount = participantIds.length;

  function clearFieldError(fieldName: string) {
    setFieldErrors((current) => {
      if (!current[fieldName]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[fieldName];
      return nextErrors;
    });
    setSubmitError('');
  }

  function toggleParticipant(participantId: string) {
    clearFieldError('participants');
    setParticipantIds((current) =>
      current.includes(participantId)
        ? current.filter((id) => id !== participantId)
        : [...current, participantId]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const titleValue = String(formData.get('title') || '').trim();
    const dateValue = String(formData.get('date') || '').trim();
    const startTimeValue = String(formData.get('startTime') || '').trim();
    const endTimeValue = String(formData.get('endTime') || '').trim();
    const timezoneValue = String(formData.get('timezone') || '').trim();
    const descriptionValue = String(formData.get('description') || '').trim();
    const locationValue = String(formData.get('location') || '').trim();
    const agendaValue = String(formData.get('agenda') || '').trim();
    const additionalParticipants = String(formData.get('participants') || '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    const body = {
      title: titleValue,
      date: dateValue,
      startTime: startTimeValue,
      endTime: endTimeValue,
      timezone: timezoneValue,
      description: descriptionValue,
      location: locationValue,
      agenda: agendaValue,
      participants: [...participantIds, ...additionalParticipants],
    };

    const res = await fetch('/api/meetings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const { meeting } = await res.json();
      router.push(`/meetings/${meeting.id}`);
      return;
    }

    let errMsg = '';
    try {
      const data = await res.json();
      if (data?.fieldErrors) {
        setFieldErrors(data.fieldErrors);
      }
      if (data?.error) {
        errMsg = data.error;
      } else {
        errMsg = JSON.stringify(data, null, 2);
      }
    } catch (error) {
      try {
        errMsg = await res.text();
      } catch {
        errMsg = res.statusText;
      }
    }

    setSubmitError(errMsg || "La réunion n'a pas pu être enregistrée.");
    setIsSubmitting(false);
  }

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Planification
          </p>
          <h1 className="section-title mt-2">Créer une réunion</h1>
          <p className="section-copy mt-4">
            Prépare une fiche complète avec date, lieu, participants et agenda pour garder une organisation claire des séances à venir.
          </p>
        </div>
        <aside className="hero-aside">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Conseil
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Sélectionne d&apos;abord les participants déjà enregistrés dans la base, puis ajoute au besoin
            des emails ponctuels séparés par des virgules.
          </p>
        </aside>
      </section>

      <form onSubmit={handleSubmit} className="panel max-w-4xl">
        <div className="form-grid">
          <label className="label">
            Titre
            <input
              name="title"
              className="input"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                clearFieldError('title');
              }}
            />
            {fieldErrors.title ? <p className="mt-2 text-sm text-red-700">{fieldErrors.title}</p> : null}
          </label>

          <label className="label">
            Date
            <input
              name="date"
              type="date"
              className="input"
              required
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                clearFieldError('date');
              }}
            />
            {fieldErrors.date ? <p className="mt-2 text-sm text-red-700">{fieldErrors.date}</p> : null}
          </label>

          <label className="label">
            Heure de début
            <input
              name="startTime"
              type="time"
              className="input"
              required
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                clearFieldError('startTime');
              }}
            />
            {fieldErrors.startTime ? <p className="mt-2 text-sm text-red-700">{fieldErrors.startTime}</p> : null}
          </label>

          <label className="label">
            Heure de fin
            <input
              name="endTime"
              type="time"
              className="input"
              required
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                clearFieldError('endTime');
              }}
            />
            {fieldErrors.endTime ? <p className="mt-2 text-sm text-red-700">{fieldErrors.endTime}</p> : null}
          </label>

          <label className="label">
            Fuseau horaire
            <select
              name="timezone"
              className="input"
              value={timezone}
              onChange={(e) => {
                setTimezone(e.target.value);
                clearFieldError('timezone');
              }}
            >
              {TIMEZONE_OPTIONS.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
            {fieldErrors.timezone ? <p className="mt-2 text-sm text-red-700">{fieldErrors.timezone}</p> : null}
          </label>

          <label className="label">
            Lieu
            <input
              name="location"
              className="input"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                clearFieldError('location');
              }}
              placeholder="Salle, ministere, visio..."
            />
            {fieldErrors.location ? <p className="mt-2 text-sm text-red-700">{fieldErrors.location}</p> : null}
          </label>

          <label className="label">
            Agenda
            <input
              name="agenda"
              className="input"
              value={agenda}
              onChange={(e) => {
                setAgenda(e.target.value);
                clearFieldError('agenda');
              }}
              placeholder="Points a traiter"
            />
            {fieldErrors.agenda ? <p className="mt-2 text-sm text-red-700">{fieldErrors.agenda}</p> : null}
          </label>
        </div>

        <label className="label mt-4 block">
          Description
          <textarea
            name="description"
            className="input min-h-[140px] resize-y"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              clearFieldError('description');
            }}
          />
          {fieldErrors.description ? <p className="mt-2 text-sm text-red-700">{fieldErrors.description}</p> : null}
        </label>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <label className="label">Participants enregistres</label>
              <span className="muted-chip">{selectedParticipantsCount} selectionne(s)</span>
            </div>

            {savedParticipants.length > 0 ? (
              <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
                {savedParticipants.map((participant: any) => {
                  const checked = participantIds.includes(participant.id);

                  return (
                    <label
                      key={participant.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-4 transition ${
                        checked
                          ? 'border-emerald-700 bg-emerald-50/80'
                          : 'border-emerald-950/8 bg-white/70'
                      }`}
                    >
                      <input
                        checked={checked}
                        className="mt-1 h-4 w-4 accent-emerald-700"
                        onChange={() => toggleParticipant(participant.id)}
                        type="checkbox"
                      />
                      <div>
                        <p className="font-semibold text-slate-800">
                          {participant.name || 'Participant sans nom'}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">{participant.email}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-950/8 bg-white/70 px-4 py-4 text-sm leading-6 text-slate-600">
            Aucun participant enregistré pour le moment. Ajoute-les d&apos;abord depuis la page
                Participants.
              </div>
            )}
          </div>

          <label className="label block">
            Participants additionnels
            <input
              name="participants"
              className="input"
              value={participants}
              onChange={(e) => {
                setParticipants(e.target.value);
                clearFieldError('participants');
              }}
              placeholder="alice@example.com, bob@example.com"
            />
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Utilise ce champ pour des adresses email ponctuelles non encore présentes dans la base.
            </p>
            {fieldErrors.participants ? <p className="mt-2 text-sm text-red-700">{fieldErrors.participants}</p> : null}
          </label>
        </div>

        {submitError ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-800">
            {submitError}
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="btn" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer la réunion'}
          </button>
          <button className="btn-secondary" type="button" onClick={() => router.push('/meetings')}>
            Retour à la liste
          </button>
        </div>
      </form>
    </div>
  );
}
