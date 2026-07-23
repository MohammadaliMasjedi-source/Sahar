# TASKS.md — Sahar

Live backlog for external contributors — see `AGENTS.md` for classification, the do-no-harm gate,
and the PR protocol. **Every card below is code/structure/docs only — none of them touch
child-facing content.** Content changes (a lesson, a curriculum item) are out of scope for this
file entirely; they require the do-no-harm review described in `AGENTS.md` and `DO-NO-HARM.md`,
which no external, unreviewed contribution can satisfy on its own.

Phase reference: `.mc/project.json` has a single phase, `p0` ("Scaffold + offline-first
prototype", status `doing`) — all cards below sit inside it. Real gaps are pulled directly from
`SAHAR-COVERAGE-STATUS.md`'s own honest ❌ markers, not invented.

Status flow: `OPEN` → `CLAIMED` (draft PR link) → `DONE` (merge commit). Claiming a task = opening a
draft PR titled `T-SAHAR-xx: <title>`. One task per PR.

---

### T-SAHAR-01 · README top-structure pass [phase: p0 · size: S · status: OPEN]
**Context:** read the current `README.md` and `SAHAR-COVERAGE-STATUS.md` §5, which flags: "README
top structure (what-it-is → try-it-now → screenshots → contributor path) not reviewed/updated —
out of scope for prior lanes."
**Do:** reorder/rewrite the top of `README.md` into that structure — a one-line what-it-is, a
try-it-now section (`Start-Sahar.cmd` / static server steps from `INSTALL.md`), screenshots or a
clear description of what running it looks like, then a contributor path pointing at
`CONTRIBUTING.md` → `contribute/README.md`. Keep every existing claim as honest as it is today —
don't add "ready" language `SAHAR-COVERAGE-STATUS.md` explicitly disclaims.
**DoD:** `README.md`'s first screen (before scrolling on GitHub) covers what-it-is, try-it-now, and
a contributor pointer, in that order; no new unverified claims introduced (cross-check against
`SAHAR-COVERAGE-STATUS.md`).
**Don't:** touch `DO-NO-HARM.md`, `SAHAR-COVERAGE-STATUS.md`'s own status content, or any file
under `content/`/`contribute/modules/`.

---

### T-SAHAR-02 · Formalize the `fa-AF` / `fa-IR` locale split [phase: p0 · size: M · status: OPEN]
**Context:** read `docs/CONTENT-MODEL.md` and `SAHAR-COVERAGE-STATUS.md` §2, which flags: "`fa-AF`
/ `fa-IR` split still not formalized (still just `fa`)."
**Do:** extend the content-model schema and `test/content-validator.test.js` to accept (but not yet
require) an explicit `fa-AF` vs `fa-IR` locale tag alongside the existing generic `fa` field, with a
validator check that flags packs mixing dialect-specific vocabulary under the plain `fa` key once a
tagged alternative exists. Document the convention in `docs/CONTENT-MODEL.md`. Do not migrate or
rewrite any existing pack content's words — this task is schema/tooling only.
**DoD:** `npm test` passes with a new validator test proving the schema accepts a tagged locale
field and rejects an internally inconsistent one (e.g., a pack claiming `fa-AF` while reusing a
component that hardcodes `fa-IR`-only strings, if such a fixture is added for the test).
**Don't:** re-translate or edit any existing `content/*.json` pack's actual dictionary
entries — that's a content change requiring the do-no-harm review, out of scope here.

---

### T-SAHAR-03 · Accessibility audit against the repo's own WCAG checklist [phase: p0 · size: M · status: OPEN]
**Context:** read `contribute/PROTOCOLS-AND-STANDARDS.md` §3 ("Accessibility, WCAG 2.1 AA") and
`contribute/SAMPLE-TEMPLATES/ACCESSIBILITY-CHECK-TEMPLATE.md`.
**Do:** run the checklist in §3 against the live app (`index.html`/`app.js`/`bootstrap.html`):
touch-target sizes (≥44×44 CSS px), color contrast (≥4.5:1 normal text) on the actual computed
dawn-palette colors, that correct/incorrect state is never color-only, accessible names on every
interactive control, and semantic landmark/heading structure. Fix any gap you find in code/CSS
(never in lesson content).
**DoD:** fill out `contribute/SAMPLE-TEMPLATES/ACCESSIBILITY-CHECK-TEMPLATE.md` (or an equivalent
report) listing every checklist item's pass/fail with how you verified it, attach it to the PR, and
fix whatever failed; `npm test` still green after the fix.
**Don't:** change any lesson wording/content to "fix" an accessibility issue — if a fix would touch
`content/*.json` text, flag it instead of changing it (content change → do-no-harm gate).

---

### T-SAHAR-04 · Strengthen the content-validator's audio-schema checks [phase: p0 · size: S · status: OPEN]
**Context:** read `test/content-validator.test.js` and `docs/CONTENT-MODEL.md`'s audio-first schema
section (`audioPending`/`audio`/`audioStatus` fields, the `caregiver` read-aloud line).
**Do:** add validator checks (in `test/content-validator.test.js`) that every card in every
`content/*.json` pack has internally consistent audio-schema fields — e.g. `audioStatus: "draft"`
implies a real `audio` path exists in `audio/audio-manifest.json`, and `audioPending: true` implies
no stale `audio` reference is left over from a prior state. This is a tooling/tests task validating
the existing honest-labeling rule, not a content change.
**DoD:** `npm test` passes, and the new checks would have caught at least one deliberately-broken
fixture (add a small test fixture proving the check fires on an inconsistent record, then remove/
fix it so the suite is green).
**Don't:** edit any real pack under `content/` to "fix" something the new check flags — if the new
check finds a real inconsistency in shipped content, report it in the PR body instead of silently
patching content data.

---

### T-SAHAR-05 · Device-support matrix: automate what doesn't need a physical phone [phase: p0 · size: S · status: OPEN]
**Context:** read `contribute/DEVICE-SUPPORT-MATRIX.md` and `SAHAR-COVERAGE-STATUS.md` §6.5
Amendment A, which flags "still not phone-tested" (`docs/PHONE-TEST.md`) as a gap only a real
Android device can close — out of scope here — but several of that matrix's checks (service-worker
cache completeness, manifest validity, offline-first asset precaching) are checkable without a
physical device.
**Do:** write an automated check (Node script or test) that verifies `sw.js`'s `APP_SHELL` precache
list actually covers every asset the app currently loads (no missing/stale entries versus
`app.js`/`index.html`/pack files), and that the web-app manifest referenced by `index.html` is valid
JSON with the required PWA fields.
**DoD:** the new check is runnable via `npm test` (add it as a new script/test file wired into
`package.json`'s `test` script) and passes against the current `sw.js`/manifest; it fails on a
deliberately introduced stale-cache-list fixture, proving it actually checks something.
**Don't:** attempt or claim the real phone-test gate (`docs/PHONE-TEST.md`) is satisfied — this task
only automates the device-independent subset of that matrix.
