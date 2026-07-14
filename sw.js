/* Sahar — service worker.  Cache-first, offline-first.
 * After the first visit, the whole app + demo pack runs at ZERO internet.
 * Makes NO external network calls (privacy by default — ARCHITECTURE §0/§8).
 * Bump CACHE to ship an update; old caches are retired atomically on activate.
 */
const CACHE = 'sahar-v21'; // v21: first REAL 8-10 (Tier-2) pack — numeracy add & subtract

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
  // the selectable "Storybook" skin (Kanoon-inspired theme layer) — precached
  // so the chosen look also works fully offline (themes/kanoon/INSPIRATION.md)
  './themes/kanoon/kanoon.css',
  './themes/kanoon/kanoon.js',
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
  // Estedad, self-hosted (the kanoon skin's heading-only display face —
  // themes/kanoon/INSPIRATION.md/kanoon.css §0), heavy weight, arabic+latin
  // subset only (~38 KB total)
  './fonts/estedad-arabic-800-normal.woff2',
  './fonts/estedad-latin-800-normal.woff2',
  // audio-first bootstrap slice (SAHAR-COVERAGE §6.5)
  './bootstrap.html',
  './bootstrap.css',
  './bootstrap.js',
  './bootstrap-core.js',
  './pictures.js',
  './audio.js',
  // the language-course pack (bootstrap.js flow — deliberately not in the
  // age-band manifest, so it is precached explicitly here)
  './content/lc-fa-en-first-words.json',
  // the single-source age-band pack manifest itself; every band's tier-1
  // Leitner pack is precached from it at install (see below) rather than
  // being duplicated in this list — add a pack = edit the manifest only.
  './content/packs.manifest.json'
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
      // Content packs: derived from the single-source age-band manifest (no
      // hardcoded pack list here). Required for offline use, so this is part
      // of waitUntil — a failure fails the install and the browser retries,
      // exactly like any APP_SHELL entry. The manifest was just precached
      // above, so read it back from the open cache.
      try {
        const manRes = await c.match('./content/packs.manifest.json');
        if (manRes) {
          const manifest = await manRes.json();
          const packUrls = (manifest.bands || [])
            .flatMap((b) => (b.packs || []).map((p) => './content/' + p.file));
          if (packUrls.length) await c.addAll(packUrls);
        }
      } catch (_) { /* runtime cache-on-fetch (below) still covers packs later */ }
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
