import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CreateMeeting() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState(''); // comma-separated emails or ids

  async function handleSubmit(e: any) {
    e.preventDefault();
    const body = { title, date, startTime, endTime, description, participants: participants.split(',').map(s => s.trim()).filter(Boolean) };
    const res = await fetch('/api/meetings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (res.ok) {
      const { meeting } = await res.json();
      router.push(`/meetings/${meeting.id}`);
    } else {
      let errMsg = '';
      try {
        const data = await res.json();
        if (data?.error) {
          errMsg = data.error + (data.stack ? '\n\n' + data.stack : '');
        } else {
          errMsg = JSON.stringify(data, null, 2);
        }
      } catch (e) {
        try { errMsg = await res.text(); } catch (_) { errMsg = res.statusText; }
      }
      alert(`Erreur lors de la création (${res.status}):\n\n${errMsg}`);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Créer une réunion</h1>
      <form onSubmit={handleSubmit} className="max-w-lg bg-white p-4 rounded shadow">
        <label className="block mb-2">Titre<input name="title" className="input" value={title} onChange={e => setTitle(e.target.value)} /></label>
        <label className="block mb-2">Date<input name="date" type="date" className="input" value={date} onChange={e => setDate(e.target.value)} /></label>
        <label className="block mb-2">Heure début<input name="startTime" type="time" className="input" value={startTime} onChange={e => setStartTime(e.target.value)} /></label>
        <label className="block mb-2">Heure fin<input name="endTime" type="time" className="input" value={endTime} onChange={e => setEndTime(e.target.value)} /></label>
        <label className="block mb-2">Description<textarea name="description" className="input" value={description} onChange={e => setDescription(e.target.value)} /></label>
        <label className="block mb-2">Participants (emails séparés par des virgules)<input name="participants" className="input" value={participants} onChange={e => setParticipants(e.target.value)} /></label>
        <div className="mt-3"><button className="btn" type="submit">Enregistrer</button></div>
      </form>
    </div>
  );
}
