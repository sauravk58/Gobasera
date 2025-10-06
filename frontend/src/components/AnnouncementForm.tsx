import { useState } from 'react';

export default function AnnouncementForm({ onSubmit }: { onSubmit: (title: string, description?: string) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    await onSubmit(title, description);
    setTitle('');
    setDescription('');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        placeholder="Title (required)"
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={loading}
        required
        style={{ display: 'block', width: '100%', marginBottom: 8 }}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        disabled={loading}
        style={{ display: 'block', width: '100%', marginBottom: 8 }}
      />
      <button type="submit" disabled={!title.trim() || loading}>
        {loading ? 'Creating...' : 'Create Announcement'}
      </button>
    </form>
  );
}