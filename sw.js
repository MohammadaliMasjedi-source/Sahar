/* Sahar — service worker.  Cache-first, offline-first.
 * After the first visit, the whole app + demo pack runs at ZERO internet.
 * Makes NO external network calls (privacy by default — ARCHITECTURE §0/§8).
 * Bump CACHE to ship an update; old caches are retired atomically on activate.
 */
const CACHE = 'sahar-v6';

const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './teacher.html',
  // audio-first bootstrap slice (SAHAR-COVERAGE §6.5)
  './bootstrap.html',
  './bootstrap.css',
  './bootstrap.js',
  './bootstrap-core.js',
  './pictures.js',
  './audio.js',
  './content/lc-fa-en-first-words.json',
  // tier-1 Leitner packs
  './content/tier1-demo.json',
  './content/t1-literacy-first-letters.json',
  './content/t1-numeracy-counting-0-20.json',
  './content/t1-numeracy-shapes-patterns.json',
  './content/t1-science-living-things.json',
  './content/t1-thinking-what-is-a-question.json',
  './content/t1-thinking-fact-vs-guess.json'
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
