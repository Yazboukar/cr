import { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';

const roles = [
  { value: 'ORGANIZER', label: 'Organisateur' },
  { value: 'REPORTER', label: 'Rapporteur' },
  { value: 'ADMIN', label: 'Administrateur' },
];

export default function AdminUsers() {
  const { data: session, status } = useSession();
  const isAdmin = (session?.user as any)?.role === 'ADMIN';

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('ORGANIZER');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const response = await fetch('/api/users/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, role }),
    });
    setLoading(false);

    if (response.ok) {
      setMessage(`Invitation envoyée à ${email}.`);
      setEmail('');
      setName('');
      setRole('ORGANIZER');
      return;
    }

    const data = await response.json().catch(() => ({}));
    setError(data?.error || "L'invitation n'a pas pu être envoyée.");
  }

  if (status === 'loading') {
    return <div className="page-shell text-sm text-slate-600">Chargement…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="page-shell">
        <h1 className="section-title">Comptes</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Cette page est réservée aux administrateurs.
        </p>
      </div>
    );
  }

  return (
    <div className="page-shell max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
        Administration
      </p>
      <h1 className="section-title mt-2">Inviter un compte</h1>
      <p className="section-copy mt-3">
        Créez un compte pour un agent (organisateur, rapporteur ou administrateur). Un email lui
        permettra de définir son mot de passe et d&apos;activer son accès.
      </p>

      <form onSubmit={handleSubmit} className="mt-5">
        <div className="form-grid">
          <label className="label">
            Email
            <input
              className="input"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="agent@example.com"
            />
          </label>
          <label className="label">
            Nom
            <input
              className="input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nom complet"
            />
          </label>
          <label className="label">
            Rôle
            <select className="input" value={role} onChange={(event) => setRole(event.target.value)}>
              {roles.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {message ? (
          <div className="mt-4 rounded-2xl border border-emerald-950/8 bg-emerald-50/70 px-4 py-3 text-sm text-slate-700">
            {message}
          </div>
        ) : null}
        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

        <button className="btn mt-5" disabled={loading} type="submit">
          {loading ? 'Envoi…' : 'Envoyer l’invitation'}
        </button>
      </form>
    </div>
  );
}
