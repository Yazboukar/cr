import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function MeetingDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(id ? `/api/meetings/${id}` : null, fetcher);
  const meeting = data?.meeting;

  if (!meeting) return <div className="p-6">Chargement...</div>;

  const meetingDate = new Date(meeting.date).toLocaleString();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">{meeting.title}</h1>
      <p className="text-sm text-gray-600">{meetingDate} — Statut: {meeting.status}</p>
      <p className="mt-4">{meeting.description}</p>

      <div className="mt-6">
        <h3 className="font-semibold">Participants</h3>
        <ul>
          {meeting.participants?.map((p: any) => (
            <li key={p.id}>{p.user?.name || p.user?.email} — {p.status}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 space-x-3">
        <Link href={`/reports/${meeting.id}`} className="btn">Rédiger le compte rendu</Link>
      </div>
    </div>
  );
}
