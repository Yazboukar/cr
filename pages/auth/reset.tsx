import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ResetPassword() {
  const router = useRouter();
  const token = typeof router.query.token === 'string' ? router.query.token : '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Les deux mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    const response = await fetch('/api/auth/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    setLoading(false);

    if (response.ok) {
      setDone(true);
      setTimeout(() => router.push('/auth/signin'), 1600);
      return;
    }

    const data = await response.json().catch(() => ({}));
    setError(data?.error || 'La réinitialisation a échoué.');
  }

  return (
    <div className="page-shell max-w-xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
        Accès sécurisé
      </p>
      <h1 className="section-title mt-2">Définir un nouveau mot de passe</h1>

      {!token ? (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-800">
          Lien invalide : aucun jeton fourni.
        </div>
      ) : done ? (
        <div className="mt-5 rounded-2xl border border-emerald-950/8 bg-emerald-50/70 px-4 py-4 text-sm leading-6 text-slate-700">
          Mot de passe mis à jour. Redirection vers la connexion…
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5">
          <label className="label block">
            Nouveau mot de passe
            <input
              className="input"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Au moins 8 caractères"
            />
          </label>
          <label className="label mt-4 block">
            Confirmer le mot de passe
            <input
              className="input"
              type="password"
              required
              minLength={8}
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
            />
          </label>
          {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
          <button className="btn mt-5" disabled={loading} type="submit">
            {loading ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </form>
      )}

      <p className="mt-6 text-sm text-slate-600">
        <Link href="/auth/signin" className="card-link">
          Retour à la connexion
        </Link>
      </p>
    </div>
  );
}
