const C = 'yy-thumbs-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || !u.pathname.startsWith('/f/') || !u.pathname.includes('/t_') || r.headers.has('range')) return;
  e.respondWith(caches.open(C).then(async c => {
    const key = u.origin + u.pathname;
    const hit = await c.match(key);
    if (hit) return hit;
    const res = await fetch(u.href, { mode: 'cors' });
    if (res.ok) c.put(key, res.clone());
    return res;
  }));
});
