import { FormEvent, useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await fetch('/api/auth/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="page-shell max-w-xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
        Accès sécurisé
      </p>
      <h1 className="section-title mt-2">Mot de passe oublié</h1>

      {sent ? (
        <div className="mt-5 rounded-2xl border border-emerald-950/8 bg-emerald-50/70 px-4 py-4 text-sm leading-6 text-slate-700">
          Si un compte est associé à cette adresse, un lien de réinitialisation vient d&apos;être envoyé.
          Vérifiez votre boîte de réception (le lien est valable une heure).
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5">
          <p className="section-copy">
            Saisissez votre adresse email : un lien de réinitialisation vous sera envoyé.
          </p>
          <label className="label mt-4 block">
            Email
            <input
              className="input"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="vous@example.com"
            />
          </label>
          <button className="btn mt-5" disabled={loading} type="submit">
            {loading ? 'Envoi…' : 'Envoyer le lien'}
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
