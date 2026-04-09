import useSWR from 'swr';
import MeetingCard from '../../components/MeetingCard';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function MeetingsList() {
  const { data } = useSWR('/api/meetings', fetcher);
  const meetings = data?.meetings || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Réunions</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {meetings.map((m: any) => (
          <MeetingCard key={m.id} meeting={m} />
        ))}
      </div>
    </div>
  );
}
