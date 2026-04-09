import { getCsrfToken } from 'next-auth/react';

export default function SignIn({ csrfToken }: { csrfToken: string | null }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form method="post" action="/api/auth/callback/credentials" className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken ?? ''} />
        <h1 className="text-xl mb-4">Se connecter à MeetingFlow</h1>
        <label className="block mb-2">Email <input name="email" type="email" className="input" /></label>
        <label className="block mb-4">Mot de passe <input name="password" type="password" className="input" /></label>
        <button type="submit" className="btn">Se connecter</button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const token = await getCsrfToken(context);
  return { props: { csrfToken: typeof token === 'undefined' ? null : token } };
}
