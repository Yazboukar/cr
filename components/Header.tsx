import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-semibold">MeetingFlow</Link>
          <nav className="hidden md:flex gap-3 text-sm text-gray-600">
            <Link href="/meetings">Réunions</Link>
            <Link href="/calendar">Calendrier</Link>
          </nav>
        </div>
        <div>
          {session?.user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm">{session.user?.email}</span>
              <button onClick={() => signOut()} className="btn">Se déconnecter</button>
            </div>
          ) : (
            <Link href="/auth/signin" className="btn">Se connecter</Link>
          )}
        </div>
      </div>
    </header>
  );
}
