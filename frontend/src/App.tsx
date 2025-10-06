import { useEffect, useState } from 'react';
import type { Announcement } from './types';
import { fetchAnnouncements, createAnnouncement, updateAnnouncementStatus } from './api';
import AnnouncementForm from './components/AnnouncementForm';
import AnnouncementList from './components/AnnouncementList';

export default function App() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAnnouncements();
      setAnnouncements(data);
    } catch {
      setError('Failed to fetch announcements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (title: string, description?: string) => {
    try {
      await createAnnouncement({ title, description });
      load();
    } catch {
      setError('Failed to create announcement');
    }
  };

  const handleStatusChange = async (id: string, status: 'closed' | 'active') => {
    try {
      await updateAnnouncementStatus(id, status);
      load();
    } catch {
      setError('Failed to update status');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>GoBasera Noticeboard</h1>
      <AnnouncementForm onSubmit={handleCreate} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? <p>Loading...</p> : <AnnouncementList announcements={announcements} onStatusChange={handleStatusChange} />}
    </div>
  );
}