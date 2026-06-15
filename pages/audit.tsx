import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { formatFrDateTime } from '../src/lib/dates';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const modelLabels: Record<string, string> = {
  Meeting: 'Réunion',
  Report: 'Compte rendu',
  MeetingParticipant: 'Participant',
  Notification: 'Rappel',
  Attachment: 'Pièce jointe',
  ReportActionItem: 'Action',
  User: 'Compte',
};

const actionLabels: Record<string, string> = {
  CREATE: 'Création',
  UPDATE: 'Modification',
  DELETE: 'Suppression',
  UPSERT: 'Enregistrement',
  STATUS_UPDATE: 'Changement de statut',
  RESCHEDULE: 'Reprogrammation',
  TRANSITION: 'Transition de statut',
  INVITE: 'Invitation',
};

const diffKeyLabels: Record<string, string> = {
  action: 'action',
  from: 'de',
  to: 'vers',
  reminders: 'rappels',
  role: 'rôle',
  status: 'statut',
  meetingId: 'réunion',
  reportId: 'compte rendu',
  contactId: 'contact',
  userId: 'utilisateur',
  actionItems: 'actions',
  bytes: 'taille',
};

function formatValue(key: string, value: unknown): string {
  if (key === 'bytes' && typeof value === 'number') {
    return value > 1024 ? `${Math.round(value / 1024)} Ko` : `${value} o`;
  }
  if (value === null || value === undefined) return '—';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function describeDiff(diff: any): { label: string; value: string }[] {
  if (!diff || typeof diff !== 'object') return [];
  return Object.entries(diff).map(([key, value]) => ({
    label: diffKeyLabels[key] || key,
    value: formatValue(key, value),
  }));
}

function actorLabel(log: any): string {
  return log.actor?.name || log.actor?.email || 'Système';
}

export default function AuditPage() {
  const { data: session, status } = useSession();
  const isAdmin = (session?.user as any)?.role === 'ADMIN';

  const { data, isLoading } = useSWR(isAdmin ? '/api/audit' : null, fetcher);
  const logs = data?.logs || [];

  const [query, setQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

  const availableActions = useMemo(
    () => Array.from(new Set(logs.map((l: any) => l.action))).sort() as string[],
    [logs]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return logs.filter((log: any) => {
      if (actionFilter !== 'ALL' && log.action !== actionFilter) return false;
      if (!q) return true;
      const haystack = [
        actorLabel(log),
        modelLabels[log.model] || log.model,
        actionLabels[log.action] || log.action,
        log.modelId,
        JSON.stringify(log.diff || {}),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [logs, query, actionFilter]);

  if (status === 'loading') {
    return <div className="page-shell text-sm text-slate-600">Chargement…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="page-shell">
        <h1 className="section-title">Journal d&apos;audit</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Cette page est réservée aux administrateurs.
        </p>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Traçabilité
          </p>
          <h1 className="section-title mt-2">Journal d&apos;audit</h1>
          <p className="section-copy mt-4">
            Historique des actions sensibles (réunions, participants, comptes rendus, rappels, comptes)
            avec leur auteur et leur horodatage.
          </p>
        </div>
        <div className="flex items-center justify-start gap-3 lg:justify-end">
          <span className="muted-chip">{filtered.length} entrée(s)</span>
        </div>
      </section>

      <section className="panel mb-6">
        <div className="grid gap-4 md:grid-cols-[1fr_220px_auto] md:items-end">
          <label className="label">
            Recherche
            <input
              className="input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Auteur, objet, identifiant, détail…"
            />
          </label>
          <label className="label">
            Action
            <select
              className="input"
              value={actionFilter}
              onChange={(event) => setActionFilter(event.target.value)}
            >
              <option value="ALL">Toutes les actions</option>
              {availableActions.map((action) => (
                <option key={action} value={action}>
                  {actionLabels[action] || action}
                </option>
              ))}
            </select>
          </label>
          <button
            className="btn-secondary"
            type="button"
            onClick={() => {
              setQuery('');
              setActionFilter('ALL');
            }}
          >
            Réinitialiser
          </button>
        </div>
      </section>

      <section className="panel overflow-x-auto">
        {isLoading ? (
          <p className="text-sm text-slate-600">Chargement des entrées…</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-slate-600">Aucune entrée ne correspond à ces critères.</p>
        ) : (
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-800/70">
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Auteur</th>
                <th className="px-3 py-2">Objet</th>
                <th className="px-3 py-2">Action</th>
                <th className="px-3 py-2">Détail</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log: any) => {
                const parts = describeDiff(log.diff);
                return (
                  <tr key={log.id} className="border-t border-emerald-950/8 align-top">
                    <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                      {formatFrDateTime(log.timestamp)}
                    </td>
                    <td className="px-3 py-3 text-slate-700">{actorLabel(log)}</td>
                    <td className="px-3 py-3 text-slate-700">
                      {modelLabels[log.model] || log.model}
                      <span className="block text-[11px] text-slate-400">{log.modelId}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="status-chip">{actionLabels[log.action] || log.action}</span>
                    </td>
                    <td className="px-3 py-3">
                      {parts.length ? (
                        <div className="flex flex-wrap gap-1.5">
                          {parts.map((part, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full bg-emerald-950/5 px-2 py-0.5 text-[11px] text-slate-600"
                            >
                              <span className="font-medium text-slate-700">{part.label}</span>
                              <span className="mx-1 text-slate-400">:</span>
                              {part.value}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
