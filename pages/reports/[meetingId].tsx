import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('La requête a échoué');
  return response.json();
};

type ActionItemForm = {
  description: string;
  ownerId: string;
  dueDate: string;
  done: boolean;
};

const reportStatuses = [
  { value: 'DRAFT', label: 'Brouillon' },
  { value: 'UNDER_REVIEW', label: 'En revue' },
  { value: 'APPROVED', label: 'Approuve' },
  { value: 'ARCHIVED', label: 'Archive' },
];

function toDateInput(value: string | null | undefined) {
  if (!value) return '';
  return new Date(value).toISOString().slice(0, 10);
}

export default function ReportEditor() {
  const router = useRouter();
  const { meetingId } = router.query;
  const { data: meetingData } = useSWR(meetingId ? `/api/meetings/${meetingId}` : null, fetcher);
  const { data: reportData } = useSWR(meetingId ? `/api/reports/${meetingId}` : null, fetcher);
  const meeting = meetingData?.meeting;
  const report = reportData?.report;

  const [title, setTitle] = useState('Compte rendu');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('DRAFT');
  const [actionItems, setActionItems] = useState<ActionItemForm[]>([
    { description: '', ownerId: '', dueDate: '', done: false },
  ]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!report) return;

    setTitle(report.title || 'Compte rendu');
    setSummary(report.summary || '');
    setContent(report.content || '');
    setStatus(report.status || 'DRAFT');
    setActionItems(
      report.actionItems?.length
        ? report.actionItems.map((item: any) => ({
            description: item.description || '',
            ownerId: item.ownerId || '',
            dueDate: toDateInput(item.dueDate),
            done: Boolean(item.done),
          }))
        : [{ description: '', ownerId: '', dueDate: '', done: false }]
    );
  }, [report]);

  function updateActionItem(index: number, patch: Partial<ActionItemForm>) {
    setActionItems((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item))
    );
  }

  function addActionItem() {
    setActionItems((current) => [...current, { description: '', ownerId: '', dueDate: '', done: false }]);
  }

  function removeActionItem(index: number) {
    setActionItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');

    const response = await fetch(`/api/reports/${meetingId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        summary,
        content,
        status,
        actionItems: actionItems.filter((item) => item.description.trim().length > 0),
      }),
    });

    setSaving(false);

    if (response.ok) {
      router.push(`/meetings/${meetingId}`);
      return;
    }

    let message = "Le compte rendu n'a pas pu être sauvegardé.";
    try {
      const payload = await response.json();
      if (payload?.error) message = payload.error;
    } catch {
      // keep fallback
    }
    setError(message);
  }

  const participants = meeting?.participants || [];

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Documentation
          </p>
          <h1 className="section-title mt-2">Compte rendu</h1>
          <p className="section-copy mt-4">
            Formalise les décisions, les points d&apos;attention et les actions à suivre pour transformer la réunion en suivi opérationnel.
          </p>
        </div>
        <aside className="hero-aside">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Reunion
          </p>
          <p className="mt-3 text-lg font-semibold text-[color:var(--brand-green-900)]">
            {meeting?.title || 'Chargement...'}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {participants.length} participant(s) rattaché(s).
          </p>
        </aside>
      </section>

      {error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSave} className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="panel">
          <div className="form-grid">
            <label className="label">
              Titre
              <input className="input" required value={title} onChange={(event) => setTitle(event.target.value)} />
            </label>
            <label className="label">
              Statut du compte rendu
              <select className="input" value={status} onChange={(event) => setStatus(event.target.value)}>
                {reportStatuses.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="label mt-4 block">
            Synthese executive
            <textarea
              className="input min-h-[110px] resize-y"
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              placeholder="Resume court des decisions et points importants."
            />
          </label>

          <label className="label mt-4 block">
            Notes detaillees
            <textarea
              rows={14}
              className="input min-h-[280px] resize-y"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </label>
        </section>

        <aside className="space-y-6">
          <section className="panel">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
                  Suivi
                </p>
                <h2 className="mt-2 text-xl font-semibold text-[color:var(--brand-green-900)]">
                  Actions à suivre
                </h2>
              </div>
              <button className="btn-secondary" type="button" onClick={addActionItem}>
                Ajouter
              </button>
            </div>

            <div className="space-y-4">
              {actionItems.map((item, index) => (
                <div key={index} className="rounded-2xl border border-emerald-950/8 bg-white/70 px-4 py-4">
                  <label className="label block">
                    Action
                    <textarea
                      className="input min-h-[90px] resize-y"
                      value={item.description}
                      onChange={(event) => updateActionItem(index, { description: event.target.value })}
                      placeholder="Action, décision ou livrable attendu"
                    />
                  </label>
                  <label className="label mt-3 block">
                    Responsable
                    <select
                      className="input"
                      value={item.ownerId}
                      onChange={(event) => updateActionItem(index, { ownerId: event.target.value })}
                    >
                      <option value="">Non assigne</option>
                      {participants.map((participant: any) => (
                        <option key={participant.userId} value={participant.userId}>
                          {participant.user?.name || participant.user?.email}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="label mt-3 block">
                    Echeance
                    <input
                      className="input"
                      type="date"
                      value={item.dueDate}
                      onChange={(event) => updateActionItem(index, { dueDate: event.target.value })}
                    />
                  </label>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                      <input
                        checked={item.done}
                        className="h-4 w-4 accent-emerald-700"
                        type="checkbox"
                        onChange={(event) => updateActionItem(index, { done: event.target.checked })}
                      />
                      Terminé
                    </label>
                    {actionItems.length > 1 ? (
                      <button className="btn-secondary" type="button" onClick={() => removeActionItem(index)}>
                        Retirer
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="panel">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
              Publication
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <button className="btn" disabled={saving} type="submit">
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              {report ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <a className="btn-secondary" href={`/api/reports/${meetingId}/export?format=pdf`}>
                    Export PDF
                  </a>
                  <a className="btn-secondary" href={`/api/reports/${meetingId}/export?format=docx`}>
                    Export DOCX
                  </a>
                </div>
              ) : null}
              <button onClick={() => router.push(`/meetings/${meetingId}`)} className="btn-secondary" type="button">
                Retour à la réunion
              </button>
            </div>
          </section>
        </aside>
      </form>
    </div>
  );
}
