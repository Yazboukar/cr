import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ReportEditor() {
  const router = useRouter();
  const { meetingId } = router.query;
  const [title, setTitle] = useState('Compte rendu');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    const res = await fetch(`/api/reports/${meetingId}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, content }) });
    setSaving(false);
    if (res.ok) {
      alert('Compte rendu sauvegardé');
      router.push(`/meetings/${meetingId}`);
    } else {
      alert('Erreur');
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Rédiger le compte rendu</h1>
      <div className="max-w-3xl bg-white p-4 rounded shadow">
        <label className="block mb-2">Titre<input className="input" value={title} onChange={e => setTitle(e.target.value)} /></label>
        <label className="block mb-2">Contenu<textarea rows={12} className="input" value={content} onChange={e => setContent(e.target.value)} /></label>
        <div className="mt-3">
          <button onClick={handleSave} className="btn" disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer'}</button>
        </div>
      </div>
    </div>
  );
}
