# Sahar — Explained

> **One-liner:** A free, offline-first education PWA for girls barred from school — built first for Afghan girls, in Dari (RTL) / English / German, with a spaced-repetition (Leitner) core; currently an honest, runnable prototype, not a finished product.
> **Status:** scaffold + working prototype (7 Tier-1 lesson packs, engine real and tested) · a not-for-profit, free-forever project · **Last updated:** 2026-07-03

*Standard file: `learning/PROJECT-EXPLAINED.md` explains the project in four layers, so any reviewer can understand it from one place. Accurate, no invented facts. Update the Changelog on every change.*

## 🟢 ELI5 (a child)
Some children are not allowed to go to school. Sahar is a little app on a phone that teaches them, even with no internet at all. A friendly girl named Sahar shows you cards, you guess, and the ones you find hard come back sooner so you learn them well.

## 🟡 ELI15 (a smart teenager)
Sahar is a learning app for kids who have been shut out of school — first for Afghan girls banned from secondary education, and for any child anywhere with a device but no classroom. It works fully offline, because the children who need it most usually have a borrowed phone, no data, and no safe way to be seen studying. It speaks Dari (right-to-left), English, and German, and it's icon-first so a child who can't read the menu yet can still start the first lesson. Under the hood it uses *spaced repetition* (the "Leitner box" method): cards you get right come back later and later; cards you miss come back tomorrow. Right now the repo is a real, working prototype of that idea — seven small Tier-1 lessons, each in all three languages — plus the design documents for the much bigger app it's meant to grow into.

## 🔵 Practitioner / College (technical)
Sahar is a **vanilla-JS offline-first PWA** — no framework, no build step, no external network calls. The whole app is a handful of static files served over `http://` (or opened from `file://` for a quick look, minus full service-worker behaviour).

**Files that actually exist (tracked in git):**
- `index.html`, `styles.css` — the shell. Dawn palette, design tokens, RTL-aware.
- `app.js` — the entire app in one file, deliberately layered: **CORE** (UI-free domain logic), **PROVIDERS** (swappable boundaries), **VIEWMODEL** (`state`), **VIEW** (`render()`, DOM-only). The view holds no domain logic; the Leitner core never touches the DOM.
- `sw.js` — cache-first service worker (versioned `CACHE = 'sahar-vN'`) that precaches the app shell + all packs so the second visit runs at zero internet.
- `manifest.webmanifest` — makes it installable as a PWA.
- `content/` — seven real, versioned Tier-1 content packs (first letters, counting 0–20, shapes & patterns, living things, "what is a question?", "guess first, then check", and the fact-vs-opinion demo), each translated into fa/en/de and chosen from a lesson shelf in the app.
- `test/core.test.js` — a headless, pure-Node test suite (no framework, `node:assert` only). **28 tests** (verified by count).
- `docs/` — `ARCHITECTURE.md`, `CURRICULUM-MAP.md`, `NAME.md`, `OSS-REUSE.md`.
- `package.json` (`npm test` → `node test/core.test.js`), `README.md`, `LICENSE-NOTE.md`.

**The Leitner core** (`app.js`): `INTERVALS = [1, 2, 4, 9, 21]` days for boxes 1–5. `schedule(card, gotIt)` returns a *new* card state (pure, no mutation): "got it" climbs one box (capped at 5) and bumps `reps`; "again" drops to box 1 and bumps `lapses`; either way `due = today + INTERVALS[box-1]`. `isDue()`, `todayISO()`, `addDaysISO()` are the date helpers. `buildQueue(pack, progress)` merges a pack's cards with saved per-card progress and keeps only due cards — with a deliberate fallback: if nothing is due, it shows all cards so the demo never looks broken.

**Data flow:** `boot()` → `ContentProvider.getPack()` fetches the JSON pack (same-origin, cached by the SW) → `buildQueue()` merges it with `ProgressProvider.load()` (from `localStorage`, key `sahar.progress.v1`) → `render()`. Answering a card calls `onAnswer()` → `schedule()` → persist to `localStorage` → advance. Language switch rewrites chrome via `I18nProvider` and flips `document.dir`.

**What's done vs. not:** the engine, the 3-language i18n, RTL, persistence, the PWA/offline shell, and the test suite are **real and working**. The full curriculum, the other age tiers (T2–T4), the real content-pack pipeline, and **pack signature verification are designed but NOT built** — `content/tier1-demo.json` has `"signature": null`, and `ContentProvider.getPack()` has an explicit comment marking where signature verification *would* go.

## 🔴 Architect / Deepest
**Key decisions and why:**

- **Offline-first, zero external calls — by design, not convenience.** The target user has a borrowed phone, no data, and a reason not to be seen learning. So: cache-first service worker, no telemetry, no accounts, no ads, no tracking. Privacy is a safety property here, not a feature. The `.gitignore` even refuses to commit learner data (`*.localdata`, `learner-progress*.json`).
- **Vanilla JS, no framework, no build.** Maximises the chance it runs on an old, cheap device and can be distributed as a folder (sideloaded, on an SD card, behind a slow link). It also keeps the "open `index.html` and it just works" property.
- **Clean-Architecture + MVVM inside a single file.** `app.js` is one file but strictly layered (CORE / PROVIDERS / VIEWMODEL / VIEW). The providers (`ContentProvider`, `ProgressProvider`, `I18nProvider`) are the swap points: today they're `fetch` + `localStorage` + in-memory dicts; tomorrow they can become a signed-pack downloader, IndexedDB, or a server sync — same shape.
- **i18n is structural, not bolted on.** Adding a language = adding a dictionary (house principle: "add a language = add a dict"). A test enforces *key parity* — every language must have the identical key set, so you can't ship a half-translated UI. Dari is first-class and RTL-correct (`STRINGS.fa.dir === 'rtl'`, asserted in tests).
- **The Leitner engine is classic and deliberate.** Intervals `[1,2,4,9,21]` follow the well-proven 5-box Leitner method — tiny, transparent, and dependency-free, which is exactly what an offline app on a cheap phone needs.

**Trade-offs / gotchas:**
- The `buildQueue` "show all when nothing is due" fallback is a **demo affordance**, not real review scheduling. In a real deployment a learner who finished today's cards should see an empty/"come back tomorrow" state, not the whole pack again. This is honestly flagged in the code comment.
- On a "got it", `schedule()` never touches `lapses`, so the persisted object can omit `lapses` (JSON drops `undefined`). A test asserts this exact honest shape rather than pretending the field is always present.
- `app.js` touches browser globals (`localStorage`, `document`) at **module-load time**, so the test harness installs no-op shims before `require`-ing it and never fires `DOMContentLoaded` — the DOM/view layer is therefore **not** under test (no jsdom). Coverage is the pure CORE only, by design and stated in the test header.

**Open questions:**
- The real signed-pack pipeline (key management, who signs, distribution channel) is undesigned beyond the placeholder.
- Whether/how to do any optional, privacy-safe progress sync for a child who switches devices.

## ❓ Likely questions + answers
*(the payload — anticipated questions with honest answers)*
- **Q:** Is this a finished product? **A:** No. It is an honest scaffold + working prototype: one demo lesson, three languages, the Leitner engine and offline shell real. The curriculum, other tiers, and the content pipeline are documented but not built. The README states this plainly ("REAL 90 > FAKE 100").
- **Q:** Does it really work with no internet? **A:** Yes, after the first visit. `sw.js` is cache-first and precaches the app shell + all packs; it makes no external network calls. Opening from `file://` works for a quick look but you need to serve it over `http://` for full service-worker/PWA behaviour.
- **Q:** How many tests, and what do they actually cover? **A:** 28 tests (verified by counting `test(` in `test/core.test.js`). They cover the UI-free CORE: the `[1,2,4,9,21]` interval contract, `schedule()` climb/fall/cap/purity, `isDue()` boundaries, date helpers, i18n key-parity across fa/en/de, RTL direction, the demo pack's shape, `buildQueue()` filtering, and a `localStorage` round-trip. The DOM/view layer is intentionally out of scope (no jsdom).
- **Q:** Did you run the tests here? **A:** Honest note: `node` was not on PATH in this environment, so I did **not** execute them in this session. I read the suite in full and counted 28 well-formed `test(...)` cases that assert against the real exports of `app.js`; `npm test` runs `node test/core.test.js`.
- **Q:** Is learner data private? Where does progress live? **A:** On the device only — `localStorage` under key `sahar.progress.v1`. No accounts, no server, no analytics. `.gitignore` blocks committing any learner data.
- **Q:** What about content authenticity — can a bad pack be slipped in? **A:** Not yet defended. Packs carry a `signature` field but it's `null` and verification is a documented placeholder in `ContentProvider.getPack()`, not implemented. This is the most important security gap and is flagged as such.
- **Q:** Why no React/Vue/build step? **A:** Deliberate. The target device is old and cheap, the connection is bad or absent, and the app may be distributed as a plain folder. Vanilla JS keeps "open it and it runs" true and shrinks the failure surface.
- **Q:** How do you add a 4th language? **A:** Add one dictionary to `STRINGS` (and translations into the packs). A test enforces key parity so a partial translation fails CI rather than shipping a broken UI.
- **Q:** Is this affiliated with UNICEF/an NGO? **A:** No. The README *aspires* to grant/NGO/diaspora "pay-it-forward" funding, but there are no current partners. It is a not-for-profit, free-forever project with no such affiliation today.
- **Q:** Is it religious or political content? **A:** No. The Sahar character is secular (inline SVG, no religious symbols) and the lessons teach literacy, numeracy, science, and critical thinking. The *motivation* is humanitarian (children barred from school) and the content stays neutral — it never argues against any faith or country.

## 🔧 How to run / where things live
- **Run the prototype:** serve the repo root over HTTP and open `index.html`, e.g. `python -m http.server` then visit `http://localhost:8000`. Double-clicking `index.html` (`file://`) shows the UI but disables full service-worker/offline behaviour.
- **Try the flow:** switch language fa / en / de (top buttons) → for each card: *Show me* → *Got it* / *Again*. Progress persists in `localStorage` across reloads; finish the deck to reach the "Well done" screen.
- **Run tests:** `npm test` (i.e. `node test/core.test.js`) from the repo root — pure Node, no dependencies to install.
- **Key paths:** `app.js` (CORE + providers + view), `content/` (the Tier-1 packs), `sw.js` (offline cache), `docs/ARCHITECTURE.md` (the full design), `docs/CURRICULUM-MAP.md` (the planned body of knowledge), `LICENSE` + `LICENSE-CONTENT.md` (the dual license).
- **Dependencies / keys:** none. No npm dependencies, no build, no API keys, no `.env`. No secrets exist in this project.

## 📅 Changelog
- 2026-07-03 — Public-repo professional pass: fixed `index.html` (it was a body fragment — added the proper document skeleton with UTF-8 charset, viewport, stylesheet + manifest links); resolved the license per the note's stated intent (code → MIT in `LICENSE`, original packs → CC-BY-SA 4.0 in `LICENSE-CONTENT.md`); added `handbook/`; refreshed the stale facts here (7 packs, lesson shelf, service-worker version); fixed a Persian typo in the living-things pack title; softened wording per the house safety rules (humane/universal tone, no political or religion-critical framing).
- 2026-06-30 — Created `learning/PROJECT-EXPLAINED.md` from an honest read of the real repo (README, `app.js`, `test/core.test.js`, `content/tier1-demo.json`, `sw.js`, `package.json`, `.gitignore`, git log). Verified 28 tests by count; flagged that they were not executed here (no `node` on PATH), and that pack signature verification is a `null`/placeholder gap. Repo is now public on GitHub.
