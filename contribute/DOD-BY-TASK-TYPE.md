# Definition of Done, by task type

*Pick your task type below. Every type ends the same way — a pull request that a maintainer can
merge without guessing whether it's finished. "Done" here means the same thing
`SAHAR-COVERAGE-STATUS.md` means it: honest and checkable, not "I think it's fine."*

Two task types below (Code, Docs/tooling) touch **no learner-facing text** and skip the 3-reviewer
gate. Everything else produces or edits something a child could eventually read/hear/see, so the
gate in [`REVIEWER-GATE.md`](REVIEWER-GATE.md) applies before it can ever ship — but the gate is
about *shipping*, not about *contributing a draft*. You can and should open a PR with a draft; it
just merges as a labeled DRAFT until the gate clears.

**Three companion files this checklist leans on, for every task type below:**
- [`DEVICE-SUPPORT-MATRIX.md`](DEVICE-SUPPORT-MATRIX.md) — which device tier(s) (low-end Android,
  offline, shared/multi-child, screen-reader) your change needs to keep working on.
- [`PROTOCOLS-AND-STANDARDS.md`](PROTOCOLS-AND-STANDARDS.md) — the seven checkable standards
  (offline-first, i18n/RTL, accessibility, child-safety-by-design, licensing, data-minimization,
  performance budgets) referenced by number below.
- [`INTERACTIVE-GUIDE.md`](INTERACTIVE-GUIDE.md) — a step-by-step walkthrough of the same nine task
  types, if you'd rather follow a guided path than a checklist.

Now nine task types (the original six, plus Art and Audio split apart, plus Accessibility and
Testing added at §7–§8) — every one still ends at [`REVIEW-PATH.md`](REVIEW-PATH.md) and, for
anything learner-facing, [`REVIEWER-GATE.md`](REVIEWER-GATE.md).

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
- [ ] Meets `PROTOCOLS-AND-STANDARDS.md` §1 (Offline-first) and §6 (Data-minimization) in full —
      these two are the standards a code change most often breaks silently.
- [ ] If the change touches a UI surface, checked against `DEVICE-SUPPORT-MATRIX.md` Tier A (low-end
      Android floor) and Tier D (per-profile namespacing) as relevant.
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
- [ ] Meets `PROTOCOLS-AND-STANDARDS.md` §2 (i18n + RTL) in full, including the logical-CSS-property
      check for any layout the translation affects.
- [ ] A new language addition is checked against `DEVICE-SUPPORT-MATRIX.md` — does it need a new
      font (Tier A storage budget, `PROTOCOLS-AND-STANDARDS.md` §7) or change RTL direction (Tier E
      screen-reader `lang`/`dir` handling)?

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
- [ ] Meets `PROTOCOLS-AND-STANDARDS.md` §2 (i18n/RTL), §3 (accessibility — audio-first path for
      pre-readers, per `docs/ARCHITECTURE.md` §7), §4 (child-safety-by-design), and §5
      (licensing/attribution) in full — content authoring is where all four standards apply
      together.
- [ ] Sized and shaped to work within `DEVICE-SUPPORT-MATRIX.md` Tier A's storage/performance floor
      (`PROTOCOLS-AND-STANDARDS.md` §7) — a pack that assumes unlimited storage or bandwidth doesn't
      fit this project.
- [ ] **Stop here if this touches body, health, puberty, or relationships**: it must be authored by
      a human subject-matter expert from the first word, per every module skeleton's HARD RULE — no
      AI-assisted draft of any kind for this specific content category, at any stage.

**Gate:** full 3-reviewer gate, always, no exceptions — this is the core case the gate exists for.

---

## 4. Art, icons, audio

Split into two sub-types below — both share the secular-by-construction rule, but the checkable
specifics differ enough to list separately.

### 4a. Art & icons

**Examples:** a new inline-SVG icon for `pictures.js`, a new mascot pose for `mascot.js`, a new
theme palette or color combination.

**Definition of Done:**
- [ ] Secular by construction — no religious, political, or nationalist symbol in any glyph,
      color combination, or pose (`DO-NO-HARM.md`'s absolute rule). Explicitly check against the
      documented moon-and-star adjacency trap before submitting anything celestial.
- [ ] Inline SVG only (no external image host, no font-icon CDN) — offline-first is architectural,
      not optional (`PLATFORM-INDEPENDENCE.md`; `PROTOCOLS-AND-STANDARDS.md` §1).
- [ ] Every new `pic` key referenced by content actually resolves in `pictures.js` (validator-
      enforced).
- [ ] Meets `PROTOCOLS-AND-STANDARDS.md` §3 (accessibility) — color is never the only signal, and
      contrast against the dawn palette meets WCAG AA (§3's exact ratios).
- [ ] Checked against `DEVICE-SUPPORT-MATRIX.md` Tier A — SVG stays small/simple enough for a
      low-end device to render smoothly; no asset meaningfully grows the app's total install size
      (`PROTOCOLS-AND-STANDARDS.md` §7) without saying so in the PR.

**Gate:** secular/context reviewer's sign-off required for anything symbolic (icons, mascot art,
theme colors).

### 4b. Audio

**Examples:** a draft-voice audio batch via `tools/generate-draft-audio.py`, (future) a real human
recording, a change to `audio/audio-manifest.json`.

**Definition of Done:**
- [ ] Draft machine-voice files are clearly distinguishable from real recordings in the manifest
      (`audioDraft` vs. a real recording path) — never silently presented as real; see
      `docs/CONTENT-MODEL.md` §4's tri-state contract.
- [ ] **Real human recordings must be from an adult narrator — never a child's voice** (standing
      rule, `DO-NO-HARM.md` / `audio/DARI-AUDIO-SOURCING-2026-07-19.md`).
- [ ] Audio is optional at runtime — every lesson stays fully usable with audio missing, blocked, or
      failing (matches the existing "degrades to a silent no-op" architecture, `DO-NO-HARM.md`).
- [ ] File format/compression follows the existing `.mp3` convention (`PROTOCOLS-AND-STANDARDS.md`
      §7 performance budget) — the current audio total is ~11 MB across 245 files; a new batch
      states its added size in the PR.
- [ ] New/changed audio is added to `sw.js`'s precache and `audio/audio-manifest.json` so it
      actually works offline (`PROTOCOLS-AND-STANDARDS.md` §1) — an audio file that plays online but
      wasn't precached will silently fail on `DEVICE-SUPPORT-MATRIX.md` Tier A/C.
- [ ] For `fa` audio specifically: states whether the voice/script is Dari or Iran-Persian, matching
      the pack it belongs to.

**Gate:** child-safety review required for audio scripts/tone. Native-fa (or relevant-language)
review required for any spoken script.

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
- [ ] If you're documenting a standard or device requirement, it's checkable — a box someone can
      actually verify, not an aspiration (matches `PROTOCOLS-AND-STANDARDS.md`/
      `DEVICE-SUPPORT-MATRIX.md`'s own format; follow it rather than inventing a new style).

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

## 7. Accessibility

**Examples:** an audit against `PROTOCOLS-AND-STANDARDS.md` §3 (contrast, keyboard nav,
screen-reader flow), a fix to an ARIA attribute or focus order, adding a missing accessible name,
a `prefers-reduced-motion` fix.

**Definition of Done:**
- [ ] Meets `PROTOCOLS-AND-STANDARDS.md` §3 (Accessibility, WCAG 2.1 AA) in full for the surface you
      touched — every checkbox in that section, not a subset.
- [ ] Checked against `DEVICE-SUPPORT-MATRIX.md` Tier E specifically: a real screen reader (Android
      TalkBack on a Tier-A device, or a free desktop reader like NVDA) navigating the surface by
      keyboard/swipe alone, no mouse/touch.
- [ ] RTL checked together with accessibility, not separately — `fa` users are disproportionately
      likely to also rely on `lang`/`dir`-aware assistive tech (`PROTOCOLS-AND-STANDARDS.md` §2).
- [ ] If the fix touches learner-facing text (e.g., adding a missing label a child would hear read
      aloud), that string is added in `fa`/`en`/`de` together, same as any other learner-facing
      string.
- [ ] Findings recorded honestly — pass/fail per check, tool + version used — the same standard
      `docs/PHONE-TEST.md` sets for device testing (see §8 below).
- [ ] PR or issue states exactly what was checked and with what tool, so a reviewer doesn't have to
      re-derive your test setup.

**Gate:** none for a pure markup/CSS/ARIA fix that adds no new learner-facing string or symbolic
content. Full gate if the fix adds/changes text a learner would see or hear.

---

## 8. Testing & QA

**Examples:** running `docs/PHONE-TEST.md` on a real Android phone and recording the result,
running `npm test` and reporting a failure, an exploratory bug hunt, adding a new automated test
case, a screen-reader pass recorded per §7 above.

**Definition of Done:**
- [ ] For a real-device pass: every checkbox in `docs/PHONE-TEST.md` (or the relevant section of it)
      is actually exercised, not assumed — device model, Android version, and browser version
      recorded.
- [ ] Result is written back into `SAHAR-COVERAGE-STATUS.md` under a new dated entry, honestly
      (pass/fail per checkbox, any console errors seen) — per `docs/PHONE-TEST.md`'s own closing
      instruction. A test run that isn't recorded doesn't count as done.
- [ ] For a new automated test: added to the correct suite (`test/core.test.js`,
      `test/bootstrap.test.js`, `test/content-validator.test.js`, or `test/profiles.test.js`) and
      `npm test` still exits 0 with it included.
- [ ] For a found bug without a fix yet: a reproducible issue is filed with exact steps, expected vs.
      actual behavior, and which `DEVICE-SUPPORT-MATRIX.md` tier it affects.
- [ ] For a found bug with a fix: the fix itself follows the relevant task type above (usually §1
      Code) and this section covers only the verification that proves the fix works.
- [ ] No test or QA report claims a broader "ready" status than what was actually tested — matches
      the standing rule that whoever applies a fix may never certify their own fix as ready
      (`REVIEW-PATH.md`'s "A change resets the gate").

**Gate:** none for the testing/reporting activity itself. If a test reveals a learner-facing content
problem, the content fix (not the test report) routes through the gate.

---

See [`REVIEW-PATH.md`](REVIEW-PATH.md) for what happens to your PR after you open it, and
[`INTERACTIVE-GUIDE.md`](INTERACTIVE-GUIDE.md) for a step-by-step walkthrough of any of the nine
task types above.
