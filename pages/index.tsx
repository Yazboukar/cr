import useSWR from 'swr';
import Link from 'next/link';
import MeetingCard from '../components/MeetingCard';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Dashboard() {
  const { data } = useSWR('/api/meetings', fetcher);
  const meetings = data?.meetings || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Tableau de bord</h1>
      <div className="mb-4">
        <Link href="/meetings/create" className="btn">Créer une réunion</Link>
      </div>

      <section>
        <h2 className="text-xl mb-2">Prochaines réunions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {meetings.map((m: any) => (
            <MeetingCard key={m.id} meeting={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
