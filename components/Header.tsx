import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const navItems = [
  { href: '/', label: 'Tableau de bord' },
  { href: '/meetings', label: 'Réunions' },
  { href: '/participants', label: 'Participants' },
  { href: '/calendar', label: 'Calendrier' },
];

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 border-b border-white/50 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#14553f,_#2f9d6d)] text-lg font-bold text-white shadow-lg shadow-emerald-900/20">
              MF
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-800/80">
                Édition institutionnelle
              </p>
              <p className="text-lg font-semibold text-[color:var(--brand-green-900)]">
                MeetingFlow
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-emerald-950/8 bg-white/60 p-1 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="topbar-link">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <div className="hidden rounded-full border border-emerald-950/10 bg-white/70 px-4 py-2 text-right sm:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-800/70">
                  Session active
                </p>
                <p className="text-sm text-slate-700">{session.user.email}</p>
              </div>
              <button onClick={() => signOut()} className="btn-secondary" type="button">
                Déconnexion
              </button>
            </>
          ) : (
            <Link href="/auth/signin" className="btn">
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
