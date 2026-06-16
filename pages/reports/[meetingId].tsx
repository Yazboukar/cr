import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import {
  reportStatusLabels,
  reportActionLabels,
  availableActions,
  isReportEditable,
  type ReportAction,
} from '../../src/lib/reportWorkflow';
import {
  resolveLayout,
  templateLabels,
  TEMPLATE_KEYS,
  DOCUMENT_TYPE_SUGGESTIONS,
} from '../../src/lib/documentTemplates';

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

function toDateInput(value: string | null | undefined) {
  if (!value) return '';
  return new Date(value).toISOString().slice(0, 10);
}

export default function ReportEditor() {
  const router = useRouter();
  const { meetingId } = router.query;
  const { data: session } = useSession();
  const { data: meetingData } = useSWR(meetingId ? `/api/meetings/${meetingId}` : null, fetcher);
  const { data: reportData, mutate: mutateReport } = useSWR(
    meetingId ? `/api/reports/${meetingId}` : null,
    fetcher
  );
  const meeting = meetingData?.meeting;
  const report = reportData?.report;
  const role = (session?.user as any)?.role || '';

  const [title, setTitle] = useState('Compte rendu');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [recipient, setRecipient] = useState('');
  const [documentType, setDocumentType] = useState('Compte rendu');
  const [template, setTemplate] = useState('OFFICIAL');
  const [layout, setLayout] = useState<Record<string, any>>({});
  const [status, setStatus] = useState('DRAFT');
  const [actionItems, setActionItems] = useState<ActionItemForm[]>([
    { description: '', ownerId: '', dueDate: '', done: false },
  ]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [previewing, setPreviewing] = useState(false);

  useEffect(() => {
    if (!report) return;

    setTitle(report.title || 'Compte rendu');
    setSummary(report.summary || '');
    setContent(report.content || '');
    setRecipient(report.recipient || '');
    setDocumentType(report.documentType || 'Compte rendu');
    setTemplate(report.template || 'OFFICIAL');
    setLayout(report.layout && typeof report.layout === 'object' ? report.layout : {});
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
        recipient,
        documentType,
        template,
        layout,
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
  const editable = isReportEditable(status, role);
  const effectiveLayout = resolveLayout(template, layout);
  const sectionToggles: { key: string; label: string }[] = [
    { key: 'showHeader', label: 'En-tête' },
    { key: 'showEmblem', label: 'Blason' },
    { key: 'showRecipient', label: 'Destinataire' },
    { key: 'showObjet', label: 'Objet' },
    { key: 'showDate', label: 'Date / lieu' },
    { key: 'showApproval', label: "Tampon d'approbation" },
    { key: 'showSignatory', label: 'Signataire' },
  ];
  function changeTemplate(value: string) {
    setTemplate(value);
    setLayout((current) => {
      const next: Record<string, any> = { ...current };
      sectionToggles.forEach(({ key }) => delete next[key]);
      return next;
    });
  }
  function setOverride(field: string, value: string) {
    setLayout((current) => ({ ...current, [field]: value }));
  }
  function setToggle(key: string, value: boolean) {
    setLayout((current) => ({ ...current, [key]: value }));
  }

  async function openPreview() {
    setPreviewing(true);
    setError('');
    try {
      const response = await fetch(`/api/reports/${meetingId}/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, recipient, documentType, template, layout }),
      });
      if (response.ok) {
        setPreviewHtml(await response.text());
      } else {
        setError("L'aperçu n'a pas pu être généré.");
      }
    } catch {
      setError("L'aperçu n'a pas pu être généré.");
    } finally {
      setPreviewing(false);
    }
  }
  const workflowActions: ReportAction[] = report
    ? availableActions(report.status, {
        role,
        userId: (session?.user as any)?.id || '',
        authorId: report.authorId,
        organizerId: meeting?.organizerId || '',
      })
    : [];

  async function doTransition(action: ReportAction) {
    setError('');
    const response = await fetch(`/api/reports/${meetingId}/transition`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    if (response.ok) {
      await mutateReport();
      return;
    }
    const payload = await response.json().catch(() => ({}));
    setError(payload?.error || "La transition n'a pas pu être effectuée.");
  }

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
          <fieldset disabled={!editable} className="contents">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Format du document
          </p>
          <div className="form-grid mt-3">
            <label className="label">
              Type de document
              <input
                className="input"
                list="doctypes"
                value={documentType}
                onChange={(event) => setDocumentType(event.target.value)}
              />
              <datalist id="doctypes">
                {DOCUMENT_TYPE_SUGGESTIONS.map((suggestion) => (
                  <option key={suggestion} value={suggestion} />
                ))}
              </datalist>
            </label>
            <label className="label">
              Modèle
              <select
                className="input"
                value={template}
                onChange={(event) => changeTemplate(event.target.value)}
              >
                {TEMPLATE_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {templateLabels[key]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {effectiveLayout.showHeader ? (
            <div className="form-grid mt-3">
              <label className="label">
                Ministère
                <input
                  className="input"
                  value={layout.ministry || ''}
                  placeholder="Défaut de l'organisation"
                  onChange={(event) => setOverride('ministry', event.target.value)}
                />
              </label>
              <label className="label">
                Service / Direction
                <input
                  className="input"
                  value={layout.department || ''}
                  placeholder="Secrétariat Général"
                  onChange={(event) => setOverride('department', event.target.value)}
                />
              </label>
              <label className="label">
                Lieu
                <input
                  className="input"
                  value={layout.place || ''}
                  placeholder="Lomé"
                  onChange={(event) => setOverride('place', event.target.value)}
                />
              </label>
              <label className="label">
                Signataire
                <input
                  className="input"
                  value={layout.signatory || ''}
                  placeholder="Auteur par défaut"
                  onChange={(event) => setOverride('signatory', event.target.value)}
                />
              </label>
            </div>
          ) : null}

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-700">
            {sectionToggles.map(({ key, label }) => (
              <label key={key} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-emerald-700"
                  checked={Boolean((effectiveLayout as any)[key])}
                  onChange={(event) => setToggle(key, event.target.checked)}
                />
                {label}
              </label>
            ))}
          </div>

          <div className="my-5 h-px bg-emerald-950/10" />

          <div className="form-grid">
            <label className="label">
              Objet
              <input className="input" required value={title} onChange={(event) => setTitle(event.target.value)} />
            </label>
            <div className="label">
              Statut du compte rendu
              <div className="mt-2">
                <span className="status-chip">
                  {reportStatusLabels[status as keyof typeof reportStatusLabels] || status}
                </span>
                {!editable ? <span className="ml-2 text-xs text-slate-500">— lecture seule</span> : null}
              </div>
            </div>
          </div>

          <label className="label mt-4 block">
            Destinataire (À l&apos;attention de)
            <input
              className="input"
              value={recipient}
              onChange={(event) => setRecipient(event.target.value)}
              placeholder="Monsieur le Secrétaire Général…"
            />
          </label>

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
          </fieldset>
        </section>

        <aside className="space-y-6">
          <section className="panel">
            <fieldset disabled={!editable} className="contents">
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
                        <option key={participant.contact?.id} value={participant.contact?.id}>
                          {participant.contact?.name || participant.contact?.email}
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
            </fieldset>
          </section>

          <section className="panel">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
              Publication
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <button className="btn" disabled={saving || !editable} type="submit">
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>

              <button
                className="btn-secondary"
                type="button"
                onClick={openPreview}
                disabled={previewing}
              >
                {previewing ? 'Génération…' : 'Aperçu avant impression'}
              </button>

              {workflowActions.length > 0 ? (
                <div className="flex flex-col gap-2 rounded-2xl border border-emerald-950/8 bg-emerald-50/60 px-3 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800/70">
                    Validation
                  </p>
                  {workflowActions.map((action) => (
                    <button
                      key={action}
                      type="button"
                      className={action === 'approve' ? 'btn' : 'btn-secondary'}
                      onClick={() => doTransition(action)}
                    >
                      {reportActionLabels[action]}
                    </button>
                  ))}
                </div>
              ) : null}

              {report?.status === 'APPROVED' && report?.approvedBy ? (
                <p className="text-xs leading-5 text-emerald-800">
                  Approuvé par {report.approvedBy.name || report.approvedBy.email}
                  {report.approvedAt
                    ? ` le ${new Date(report.approvedAt).toLocaleDateString('fr-FR')}`
                    : ''}
                  .
                </p>
              ) : null}

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

      {previewHtml !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setPreviewHtml(null)}
        >
          <div
            className="flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-emerald-950/8 px-4 py-3">
              <p className="text-sm font-semibold text-[color:var(--brand-green-900)]">
                Aperçu du document
              </p>
              <button className="btn-secondary" type="button" onClick={() => setPreviewHtml(null)}>
                Fermer
              </button>
            </div>
            <iframe title="Aperçu du document" sandbox="" srcDoc={previewHtml} className="w-full flex-1 bg-white" />
            <p className="border-t border-emerald-950/8 px-4 py-2 text-xs text-slate-500">
              L&apos;aperçu reflète vos modifications en cours. Enregistrez avant d&apos;exporter.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
