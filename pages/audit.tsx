import useSWR from 'swr';
import { useSession } from 'next-auth/react';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const actionLabels: Record<string, string> = {
  CREATE: 'Création',
  UPDATE: 'Modification',
  DELETE: 'Suppression',
  UPSERT: 'Enregistrement',
  STATUS_UPDATE: 'Changement de statut',
  RESCHEDULE: 'Reprogrammation',
};

function formatTimestamp(value: string) {
  return new Date(value).toLocaleString('fr-FR');
}

export default function AuditPage() {
  const { data: session, status } = useSession();
  const role = (session?.user as any)?.role;
  const isAdmin = role === 'ADMIN';

  const { data, isLoading } = useSWR(isAdmin ? '/api/audit' : null, fetcher);
  const logs = data?.logs || [];

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
            Historique des actions sensibles (réunions, participants, comptes rendus, rappels)
            avec leur auteur et leur horodatage.
          </p>
        </div>
        <div className="flex items-center justify-start gap-3 lg:justify-end">
          <span className="muted-chip">{logs.length} entrée(s)</span>
        </div>
      </section>

      <section className="panel overflow-x-auto">
        {isLoading ? (
          <p className="text-sm text-slate-600">Chargement des entrées…</p>
        ) : logs.length === 0 ? (
          <p className="text-sm text-slate-600">Aucune action enregistrée pour le moment.</p>
        ) : (
          <table className="w-full min-w-[720px] text-left text-sm">
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
              {logs.map((log: any) => (
                <tr key={log.id} className="border-t border-emerald-950/8 align-top">
                  <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                    {formatTimestamp(log.timestamp)}
                  </td>
                  <td className="px-3 py-3 text-slate-700">
                    {log.actor?.name || log.actor?.email || 'Système'}
                  </td>
                  <td className="px-3 py-3 text-slate-700">
                    {log.model}
                    <span className="block text-xs text-slate-400">{log.modelId}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="status-chip">{actionLabels[log.action] || log.action}</span>
                  </td>
                  <td className="px-3 py-3 text-xs text-slate-500">
                    {log.diff ? JSON.stringify(log.diff) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
