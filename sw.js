/* Sahar — service worker.  Cache-first, offline-first.
 * After the first visit, the whole app + demo pack runs at ZERO internet.
 * Makes NO external network calls (privacy by default — ARCHITECTURE §0/§8).
 * Bump CACHE to ship an update; old caches are retired atomically on activate.
 */
const CACHE = 'sahar-v16';

const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './mascot.js',
  './manifest.webmanifest',
  './teacher.html',
  // SAHAR-V3 CORE slice #1: local-first child profiles + the child-visible
  // garden (profiles.js/profiles.css).
  './profiles.js',
  './profiles.css',
  // real PNG icon set (installability: manifest + apple-touch-icon need these
  // to actually be fetchable offline, not just declared)
  './icons/icon-192-any.png',
  './icons/icon-192-maskable.png',
  './icons/icon-512-any.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png',
  // Vazirmatn, self-hosted (design fix: was declared in styles.css with no
  // file behind it, so offline reloads silently fell back to Segoe UI).
  './fonts/vazirmatn-arabic-400-normal.woff2',
  './fonts/vazirmatn-arabic-700-normal.woff2',
  './fonts/vazirmatn-latin-400-normal.woff2',
  './fonts/vazirmatn-latin-700-normal.woff2',
  './fonts/vazirmatn-latin-ext-400-normal.woff2',
  './fonts/vazirmatn-latin-ext-700-normal.woff2',
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
  './content/t1-literacy-first-words.json',
  './content/t1-numeracy-counting-0-20.json',
  './content/t1-numeracy-shapes-patterns.json',
  './content/t1-science-living-things.json',
  './content/t1-science-day-and-night.json',
  './content/t1-thinking-what-is-a-question.json',
  './content/t1-thinking-fact-vs-guess.json',
  './content/t1-life-healthy-and-safe.json'
];

self.addEventListener('install', (event) => {
  // Precache the shell + the demo pack so the first offline open works, then
  // best-effort precache every draft/real audio file listed in the manifest
  // that tools/generate-draft-audio.py keeps in sync (audio/RECORDING-MANIFEST.md
  // explains how real recordings replace these in place). Audio precache is
  // wrapped separately so a slow/failed fetch of one clip never breaks the
  // core app shell install.
  event.waitUntil(
    caches.open(CACHE).then(async (c) => {
      await c.addAll(APP_SHELL);
      try {
        const res = await fetch('./audio/audio-manifest.json');
        if (res && res.ok) {
          const files = await res.json();
          const urls = files.map((p) => './' + p);
          await c.addAll(urls);
        }
      } catch (_) { /* offline-first best effort: runtime cache-on-fetch below still covers it later */ }
      return self.skipWaiting();
    })
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
