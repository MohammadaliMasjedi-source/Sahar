# Definition of Done, by task type

*Pick your task type below. Every type ends the same way — a pull request that a maintainer can
merge without guessing whether it's finished. "Done" here means the same thing
`SAHAR-COVERAGE-STATUS.md` means it: honest and checkable, not "I think it's fine."*

Two task types below (Code, Docs/tooling) touch **no learner-facing text** and skip the 3-reviewer
gate. Everything else produces or edits something a child could eventually read/hear/see, so the
gate in [`REVIEWER-GATE.md`](REVIEWER-GATE.md) applies before it can ever ship — but the gate is
about *shipping*, not about *contributing a draft*. You can and should open a PR with a draft; it
just merges as a labeled DRAFT until the gate clears.

---

## 1. Code (engine, app, tooling, tests)

**Examples:** fixing a bug in `app.js`/`bootstrap.js`, extending the Leitner engine, adding a new
`interaction` type's rendering logic, improving `sw.js` caching, writing a new test.

**Definition of Done:**
- [ ] `npm test` passes locally (all four suites: core, bootstrap, content-validator, profiles) —
      exit code 0, no suite skipped.
- [ ] No new runtime dependency added without a note in `docs/OSS-REUSE.md` (license +
      offline-compatibility check — see that file's existing table for the format).
- [ ] No network call added anywhere (`fetch`/`XHR`/beacon) that isn't the app fetching its own
      bundled files — this is a hard architectural rule (`DO-NO-HARM.md`, `PRIVACY.md`), not a
      style preference.
- [ ] No learner-facing string touched without also updating `fa`/`en`/`de` (i18n parity is a
      test-enforced invariant, `test/core.test.js`).
- [ ] PR description states what changed and why, and which test(s) prove it.

**Gate:** none, *unless* the change adds or edits any string a learner would see/hear — then that
string alone routes through the gate, not the surrounding code.

---

## 2. Translation

**Examples:** adding a 4th/5th UI language (per `README.md`'s "a file, not a rewrite" promise),
fixing an existing `fa`/`en`/`de` string, adding Pashto.

**Definition of Done:**
- [ ] Every string in the target file has a translation — no empty/placeholder left where real
      text should be (the content-validator enforces this for `content/*.json`; UI-chrome strings
      are enforced by `test/core.test.js`'s parity check).
- [ ] Translator is a native or near-native speaker of the target language — self-declared in the
      PR description (name/handle, language, "native" or "fluent+reviewed-by-native").
- [ ] RTL languages: rendering checked in-browser (open `index.html`, switch language, confirm no
      broken layout) — screenshot in the PR.
- [ ] For `fa`: state explicitly whether this is Dari or Iran-Persian (see `REVIEWER-GATE.md`
      role 1) — the two are not interchangeable in this project.

**Gate:** full 3-reviewer gate if the translation is of learner-facing content (a card, a lesson).
Not required for pure UI chrome (button labels, menu items) that carries no educational content —
but still needs the native-fa editor's pass for naturalness before merge.

---

## 3. Content-pack authoring (age-band modules)

**Examples:** filling in a lesson inside one of the age-band module skeletons under
[`modules/`](modules/), proposing a new Tier-1/2/3 pack in `content/`, drafting a new
teen-facing pack like `packs/teen-critical-thinking/`.

**Definition of Done:**
- [ ] Follows the correct schema for the pack shape — see `docs/CONTENT-MODEL.md` §1–§2 (Tier-1
      audio-first cards) or §5 (language-course items); teen/reader-format packs follow
      `packs/teen-critical-thinking/teen-critical-thinking.pack.json`'s shape. **Do not invent a
      fourth shape** without discussing it first — `CONTENT-MODEL.md` is explicit that the shapes
      differ because the pedagogy differs, not by accident.
- [ ] Complete in all three languages the pack targets (`fa`, `en`, `de` at minimum).
- [ ] Every source is licensed compatibly and recorded (`docs/OSS-REUSE.md` §4's license
      discipline: CC-BY → attribute; CC-BY-SA → your pack must also be CC-BY-SA; CC-BY-NC → fine,
      never sell it; never use ND-licensed text for translation/adaptation).
- [ ] No text lifted verbatim from a copyrighted, non-open source — concepts and ideas may be
      drawn on; the words must be your own (see the "Concept/ideas only" pattern in
      `packs/teen-critical-thinking/README.md`'s source table for how this is done honestly).
- [ ] Passes the relevant automated validator (`npm test` for `content/*.json`; the pack's own
      `validate.js` if it's a standalone pack like the teen one) — 100%, not "mostly."
- [ ] Sits in DRAFT status, outside `content/packs.manifest.json` and `sw.js`, clearly labeled, per
      `REVIEWER-GATE.md` — **until the full 3-reviewer gate is recorded.**
- [ ] Never invents a statistic or fact presented as real data — the base-rate math check in
      `packs/teen-critical-thinking/RED-TEAM.md` is the standard: every number gets hand-checked.

**Gate:** full 3-reviewer gate, always, no exceptions — this is the core case the gate exists for.

---

## 4. Art, icons, audio

**Examples:** a new inline-SVG icon for `pictures.js`, a new mascot pose for `mascot.js`, a
draft-voice audio batch via `tools/generate-draft-audio.py`, (future) a real human recording.

**Definition of Done:**
- [ ] Secular by construction — no religious, political, or nationalist symbol in any glyph,
      color combination, or pose (`DO-NO-HARM.md`'s absolute rule). Explicitly check against the
      documented moon-and-star adjacency trap before submitting anything celestial.
- [ ] Inline SVG only (no external image host, no font-icon CDN) — offline-first is architectural,
      not optional (`PLATFORM-INDEPENDENCE.md`).
- [ ] For audio: draft machine-voice files are clearly distinguishable from real recordings in the
      manifest (`audioDraft` vs. a real recording path) — never silently presented as real; see
      `docs/CONTENT-MODEL.md` §4's tri-state contract. **Real human recordings must be from an
      adult narrator — never a child's voice** (standing rule, `DO-NO-HARM.md` / `audio/
      DARI-AUDIO-SOURCING-2026-07-19.md`).
- [ ] Every new `pic` key referenced by content actually resolves in `pictures.js` (validator-
      enforced).

**Gate:** secular/context reviewer's sign-off required for anything symbolic (icons, mascot art,
theme colors). Child-safety review required for audio scripts/tone. Native-fa review required for
any spoken script.

---

## 5. Documentation & tooling (this scaffold included)

**Examples:** improving `docs/ARCHITECTURE.md`, fixing a broken link, adding a new
`handbook/TASK-GUIDES.md` entry, improving this `contribute/` scaffold itself.

**Definition of Done:**
- [ ] No learner-facing content introduced (this category is *about* the project, not content
      *for* a child) — if you find yourself drafting a lesson, you're in category 3, not this one.
- [ ] Links resolve (relative paths correct from the file's own location).
- [ ] Matches the project's honesty style: state what's real vs. planned vs. not-yet-built, the
      same way `README.md` and `SAHAR-COVERAGE-STATUS.md` do — no "coming soon" dressed up as done.

**Gate:** none.

---

## 6. Funding / outreach / partnerships

**Examples:** adding a lead to `funding/OUTREACH-TRACKER-2026-07-12.csv`, drafting an outreach
email in the style of `funding/EMAIL-DRAFT-*.md`.

**Definition of Done:**
- [ ] No claim of impact or reach beyond what `SAHAR-COVERAGE-STATUS.md` and `SDG-MAPPING.md`
      already state honestly (prototype, not yet piloted with real children) — outreach material
      must not over-claim.
- [ ] No personal data about any real child, family, or contact collected or included anywhere in
      this repo (it's public) — see `PRIVACY.md`/`DATA-HANDLING.md`.

**Gate:** none for the mechanics; any new public-facing claim about what Sahar does should be
checked against `SAHAR-COVERAGE-STATUS.md` before it goes out, same as any other public claim.

---

See [`REVIEW-PATH.md`](REVIEW-PATH.md) for what happens to your PR after you open it.
