import Link from 'next/link';

export default function MeetingCard({ meeting }: { meeting: any }) {
  const date = new Date(meeting.date);
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{meeting.title}</h3>
      <p className="text-sm text-gray-600">{date.toLocaleString()}</p>
      <p className="text-sm">Statut: {meeting.status}</p>
      <div className="mt-2">
        <Link href={`/meetings/${meeting.id}`} className="text-blue-600">Voir</Link>
      </div>
    </div>
  );
}
