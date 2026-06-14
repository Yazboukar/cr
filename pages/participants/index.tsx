import { ChangeEvent, FormEvent, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ParticipantsDirectory() {
  const { data, mutate } = useSWR('/api/participants', fetcher);
  const participants = data?.participants || [];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importSummary, setImportSummary] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    const response = await fetch('/api/participants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    setSaving(false);

    if (!response.ok) {
      let message = "Erreur lors de l'enregistrement du participant.";
      try {
        const payload = await response.json();
        if (payload?.error) {
          message = payload.error;
        }
      } catch {
        // keep fallback message
      }
      alert(message);
      return;
    }

    setName('');
    setEmail('');
    await mutate();
  }

  async function handleImportFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setImporting(true);
    setImportSummary(null);

    try {
      const XLSX = await import('xlsx');
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });

      const payloadRows = rows
        .map((row) => ({
          name: String(row.Nom || row.nom || row.Name || row.name || '').trim(),
          email: String(row.Email || row.email || '').trim(),
        }))
        .filter((row) => row.name || row.email);

      if (payloadRows.length === 0) {
        alert('Le fichier Excel ne contient aucune ligne exploitable.');
        return;
      }

      const response = await fetch('/api/participants/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows: payloadRows }),
      });

      if (!response.ok) {
        let message = "Erreur lors de l'import Excel.";
        try {
          const payload = await response.json();
          if (payload?.error) {
            message = payload.error;
          }
        } catch {
          // keep fallback message
        }
        alert(message);
        return;
      }

      const result = await response.json();
      setImportSummary(
        `${result.imported} participant(s) importé(s), ${result.skipped} ligne(s) ignorée(s).`
      );
      await mutate();
    } catch (error) {
      alert('Impossible de lire le fichier Excel fourni.');
    } finally {
      setImporting(false);
      event.target.value = '';
    }
  }

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Annuaire
          </p>
          <h1 className="section-title mt-2">Participants enregistrés</h1>
          <p className="section-copy mt-4">
            Constitue une base de participants réutilisables pour les réunions, afin de simplifier
            la planification et le suivi.
          </p>
        </div>
        <aside className="hero-aside">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Synthese
          </p>
          <p className="mt-3 text-3xl font-semibold text-[color:var(--brand-green-900)]">
            {participants.length}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Participant(s) disponibles pour les futures convocations.
          </p>
        </aside>
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={handleSubmit} className="panel">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Nouveau participant
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[color:var(--brand-green-900)]">
            Enregistrer dans la base
          </h2>

          <label className="label mt-5 block">
            Nom
            <input
              className="input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nom complet"
            />
          </label>

          <label className="label mt-4 block">
            Email
            <input
              className="input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="participant@example.com"
              required
            />
          </label>

          <button className="btn mt-6" disabled={saving} type="submit">
            {saving ? 'Enregistrement...' : 'Ajouter le participant'}
          </button>
        </form>

        <section className="panel">
          <div className="mb-5 rounded-2xl border border-emerald-950/8 bg-emerald-50/70 px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
                  Import Excel
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Importez une liste de participants depuis un fichier Excel basé sur le modèle fourni.
                </p>
              </div>
              <a className="btn-secondary" href="/api/participants/template">
                Télécharger le modèle
              </a>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <label className="btn cursor-pointer">
                {importing ? 'Import en cours...' : 'Importer un fichier Excel'}
                <input
                  accept=".xlsx,.xls"
                  className="hidden"
                  disabled={importing}
                  onChange={handleImportFile}
                  type="file"
                />
              </label>
              <span className="text-sm text-slate-500">Colonnes attendues : Nom, Email.</span>
            </div>

            {importSummary ? (
              <p className="mt-3 text-sm font-medium text-emerald-800">{importSummary}</p>
            ) : null}
          </div>

          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
                Base actuelle
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[color:var(--brand-green-900)]">
                Liste des participants
              </h2>
            </div>
            <span className="muted-chip">{participants.length} enregistré(s)</span>
          </div>

          {participants.length > 0 ? (
            <div className="space-y-3">
              {participants.map((participant: any) => (
                <article
                  key={participant.id}
                  className="rounded-2xl border border-emerald-950/8 bg-white/70 px-4 py-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-800">
                        {participant.name || 'Participant sans nom'}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">{participant.email}</p>
                    </div>
                    <span className="muted-chip">
                      {participant._count?.participants || 0} réunion(s)
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-6 text-slate-600">
              Aucun participant n&apos;est encore enregistré dans la base.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
