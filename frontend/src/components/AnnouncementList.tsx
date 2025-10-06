// src/components/AnnouncementList.tsx
import type { Announcement } from '../types';

export default function AnnouncementList({
  announcements,
  onStatusChange,
}: {
  announcements: Announcement[];
  onStatusChange: (id: string, status: 'closed' | 'active') => void;
}) {
  if (!announcements.length) return <p>No announcements yet.</p>;

  return (
    <div>
      {announcements.map(a => (
        <div key={a.id} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 10 }}>
          <h3>{a.title}</h3>
          {a.description && <p>{a.description}</p>}
          <p>Status: {a.status}</p>
          <button onClick={() => onStatusChange(a.id, a.status === 'active' ? 'closed' : 'active')}>
            {a.status === 'active' ? 'Close' : 'Reopen'}
          </button>
        </div>
      ))}
    </div>
  );
}