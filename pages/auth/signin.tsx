import { getCsrfToken } from 'next-auth/react';

export default function SignIn({ csrfToken }: { csrfToken: string | null }) {
  return (
    <div className="mx-auto flex min-h-[78vh] max-w-6xl items-center">
      <div className="grid w-full gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hero-card min-h-[420px]">
          <span className="eyebrow">Accès sécurisé</span>
          <h1 className="max-w-xl text-4xl font-semibold leading-tight md:text-5xl">
            Connectez-vous à une interface claire pour piloter les réunions.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-emerald-50/82 md:text-base">
            Accédez au tableau de bord, aux invitations, aux présences et aux comptes rendus depuis un espace sécurisé.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/10 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-50/70">
                Rôle admin
              </p>
              <p className="mt-2 text-sm text-white">Pilotage global et supervision.</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-50/70">
                Rôle organisateur
              </p>
              <p className="mt-2 text-sm text-white">Création et gestion des réunions.</p>
            </div>
          </div>
        </section>

        <form
          method="post"
          action="/api/auth/callback/credentials"
          className="panel w-full self-center px-6 py-7 md:px-8 md:py-8"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken ?? ''} />
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Connexion
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[color:var(--brand-green-900)]">
            MeetingFlow
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Saisissez vos identifiants pour accéder au tableau de bord, aux réunions et aux comptes rendus.
          </p>

          <label className="label mt-6 block">
            Email
            <input name="email" type="email" className="input" placeholder="organizer@example.com" />
          </label>
          <label className="label mt-4 block">
            Mot de passe
            <input name="password" type="password" className="input" placeholder="Votre mot de passe" />
          </label>

          <button type="submit" className="btn mt-6 w-full">
            Se connecter
          </button>

          <p className="mt-4 text-center text-sm text-slate-600">
            <a href="/auth/forgot" className="card-link">
              Mot de passe oublié ?
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const token = await getCsrfToken(context);
  return { props: { csrfToken: typeof token === 'undefined' ? null : token } };
}
