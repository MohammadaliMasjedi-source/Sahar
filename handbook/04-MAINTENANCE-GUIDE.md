# 04 — Maintenance guide

Deterministic steps for the common changes. Follow them in order.

## Add a lesson pack

1. Copy an existing pack in `content/` (e.g. `t1-thinking-what-is-a-question.json`) to a new file
   named `t<tier>-<subject>-<topic>.json`.
2. Set `packId` (`t1.subject.topic`), `title`, `intro`, and the `cards` — every `prompt`/`answer`
   must exist in **all** of `fa`, `en`, `de`; card `id`s unique.
3. Content rules (non-negotiable): kid-safe, secular, politically neutral, factual; warm tone;
   the last card may invite the child to try something herself.
4. Register the pack in **two places**:
   - `app.js` → the `PACKS` array (id + path);
   - `sw.js` → the `APP_SHELL` list (so it precaches for offline).
5. If the pack introduces a new card `type`, add its label to `KIND_KEY` in `app.js` **and** a
   translated label to all three `STRINGS` dictionaries.
6. **Bump `CACHE` in `sw.js`** (`sahar-vN` → `sahar-vN+1`) — otherwise offline users never get it.
7. Validate + test (see "How to test a change" below).

## Fix a bug

1. Reproduce it in the browser (serve over `http://`).
2. Locate the layer: rendering → `render*()` functions; scheduling/dates → the CORE section of
   `app.js`; loading → the providers; offline → `sw.js`.
3. If the bug is in the CORE, **write the failing test first** in `test/core.test.js`, then fix.
4. Bump `CACHE` in `sw.js` if any shipped file changed.

## Change the UI / a screen

1. Styling lives in `styles.css` — change tokens in `:root` for palette-wide effects.
2. Structure lives in `index.html` (static chrome) or the `render*()` template strings in `app.js`
   (stage content). Keep logic out of the view.
3. Every new user-visible string goes into all three `STRINGS` dictionaries (the key-parity test
   fails otherwise) — never hardcode text.
4. Check **both directions**: switch to fa (RTL) and back. Use logical CSS properties only.
5. Bump `CACHE` in `sw.js`.

## Cut a release

1. `npm test` → must be `28+ passed, 0 failed`.
2. Validate every pack JSON parses (e.g. `python -m json.tool content/<file>` per file).
3. Bump `CACHE` in `sw.js`. Commit, push. The app *is* the repo — serving the folder is deploying.

## Risky parts — touch with care

- **`schedule()` / `INTERVALS`** — changing them silently rewrites every learner's review plan.
- **`PROGRESS_KEY` / the persisted shape** — changing it orphans existing progress; if you must,
  write a migration in `ProgressProvider.load()`.
- **`sw.js` fetch handler** — a mistake here can brick offline behaviour for installed users;
  the cache-version bump is the only safe update path.
- **Never** add an external network call, analytics, or a CDN link. Privacy is the safety model.

## Roll back

`git revert <commit>` (never force-push), bump `CACHE` again, push. The next online visit atomically
replaces the cached app.
