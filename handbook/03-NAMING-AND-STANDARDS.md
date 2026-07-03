# 03 — Naming & standards

## Folder / file layout

| Path | What lives there | Why |
|---|---|---|
| repo root | `index.html`, `app.js`, `styles.css`, `sw.js`, `manifest.webmanifest` | the runnable app, flat on purpose (sideloadable folder) |
| `content/` | one JSON file per lesson pack | data-only content, translatable, precached |
| `docs/` | architecture, curriculum map, name, OSS plan | the design the app grows toward |
| `test/` | `core.test.js` | headless tests for the UI-free core |
| `learning/` | `PROJECT-EXPLAINED.md` | the four-layer explanation of the project |
| `handbook/` | these files | how to maintain the project |

## Naming system

- **Pack ids:** `t<tier>.<subject>.<topic>` — e.g. `t1.numeracy.counting-0-20`.
- **Pack files:** `t<tier>-<subject>-<topic>.json` — kebab-case, matches the id.
- **Card ids:** short prefix + number per pack (`ct-1`, `gc-3`, `lt-8`) — unique within a pack
  (tested).
- **i18n keys:** camelCase in `STRINGS` (`doneTitle`, `guessCheck`); every language must have the
  identical key set (tested).
- **CSS:** design tokens as `--custom-properties` in `:root`; class names kebab-case; logical
  properties (`margin-inline-*`) instead of left/right, so RTL mirrors automatically.
- **Commits:** imperative, prefixed when it helps (`content:`, `chore:`, `fix:`); one topic per
  commit. Work happens on `main` (single-maintainer prototype).

## Quality bar

- **Honesty rule:** designed-but-not-built things are *labeled as such* everywhere (README,
  ARCHITECTURE §9, code comments). Never present a mock as real. *REAL 90 > FAKE 100.*
- **Child-safety rule (content):** every pack must be kid-safe, secular, and politically neutral —
  it teaches critical thinking and science, and never argues against any faith or country.
- **No dependencies without a reason** written into `docs/OSS-REUSE.md` (license + why).
- **Zero external network calls** — anywhere, ever. The service worker is same-origin only.
- **Tests:** pure Node, no framework. New core logic gets a test in `test/core.test.js`; new packs
  are covered by the pack-shape tests (id uniqueness, all languages present).
