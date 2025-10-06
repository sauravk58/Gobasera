const BASE_URL = 'http://localhost:4000';

export async function fetchAnnouncements() {
  const res = await fetch(`${BASE_URL}/announcements`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function createAnnouncement(data: { title: string; description?: string }) {
  const res = await fetch(`${BASE_URL}/announcements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create');
  return res.json();
}

export async function updateAnnouncementStatus(id: string, status: string) {
  const res = await fetch(`${BASE_URL}/announcements/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update');
  return res.json();
}