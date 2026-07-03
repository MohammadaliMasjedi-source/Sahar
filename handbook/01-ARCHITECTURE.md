# 01 — Architecture

The full design lives in [`../docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) — this file is the
short map, not a copy.

## The approach, and why

- **Offline-first PWA** — the target child has a borrowed phone and no data. The whole app is
  static files, precached by a cache-first service worker (`sw.js`). Online is optional.
- **Vanilla JS, no framework, no build step** — maximises the chance it runs on an old cheap
  device, keeps "open `index.html` and it works" true, and lets the app be distributed as a plain
  folder (SD card, Bluetooth). *Alternative rejected:* React/Vue — a build chain and larger bundle
  buy nothing here.
- **Clean Architecture + MVVM in one file** — `app.js` is layered CORE → PROVIDERS → VIEWMODEL →
  VIEW. The core never touches the DOM; the view holds no logic. Splitting into modules later is
  mechanical.
- **Content as versioned JSON packs** — lessons are data, never code. A pack can be translated,
  sideloaded, and (future) signed. *Alternative rejected:* baking lessons into the app — would
  force an app update for every new lesson.
- **Leitner box spaced repetition** — 5 boxes, intervals `[1,2,4,9,21]` days. Tiny, transparent,
  dependency-free. FSRS is the documented upgrade path behind the same `schedule()` interface.

## Languages / parts

| Part | Language / tech | Why |
|---|---|---|
| App shell + view | HTML + CSS (design tokens, logical properties) | RTL mirroring for free; runs everywhere |
| Core + view logic | Plain JavaScript (`app.js`) | no build step, testable headless in Node |
| Offline layer | Service Worker (`sw.js`) | cache-first, zero external calls |
| Content | JSON packs (`content/*.json`) | data-only, translatable, sideloadable |
| Tests | Node + `node:assert` (`test/core.test.js`) | zero dependencies |

## Data flow

`boot()` → `ContentProvider.getPack()` (fetch, SW-cached) → `buildQueue()` merges pack cards with
`ProgressProvider.load()` (`localStorage`) → `render()`. An answer flows back through
`onAnswer()` → `schedule()` (pure core) → `ProgressProvider.save()`.

See [`diagrams/architecture.md`](diagrams/architecture.md) for the visual maps.
