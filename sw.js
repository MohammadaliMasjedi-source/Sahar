/* Sahar — service worker.  Cache-first, offline-first.
 * After the first visit, the whole app + demo pack runs at ZERO internet.
 * Makes NO external network calls (privacy by default — ARCHITECTURE §0/§8).
 * Bump CACHE to ship an update; old caches are retired atomically on activate.
 */
const CACHE = 'sahar-v1';

const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './content/tier1-demo.json'
];

self.addEventListener('install', (event) => {
  // Precache the shell + the demo pack so the first offline open works.
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  // Drop any cache that isn't the current version.
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;            // never cache writes
  event.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;                     // cache-first
      // Same-origin only; we deliberately do not reach external hosts.
      return fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match('./index.html')); // offline fallback
    })
  );
});
