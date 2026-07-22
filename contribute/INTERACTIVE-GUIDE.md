# The interactive contribution guide

*A choose-your-own-path walkthrough for a first-time contributor. Read top to bottom, or jump
straight to your task type below — either way you'll land on the exact steps, the exact Definition
of Done, and the exact review path for what you want to do. No prior knowledge of this repo
assumed. Structure and guidance only — no child-facing content.*

---

## Step 0 — Three things to read before anything else (5 minutes)

1. [`../CONTRIBUTING.md`](../CONTRIBUTING.md) — the front door. Read "The one rule that overrides
   everything else" at the top. That rule applies no matter which path you pick below.
2. [`../DO-NO-HARM.md`](../DO-NO-HARM.md) — why the rule exists. Skim it once; you don't need to
   memorize it, just understand the shape of it.
3. This file — keep it open while you work. It links to everything else so you never have to guess
   where to look next.

If you only read one more sentence: **Sahar serves real children in unsafe situations, so nothing a
child could read/hear/see ships without three named human reviewers — but almost everything else
(code, docs, translation of app chrome, a first content draft, a funding lead) doesn't need the gate
at all, or only needs it before something ships, not before you can start.**

---

## Step 1 — Pick your contribution type

Answer honestly: **what do you actually want to do right now?**

| I want to... | Go to |
|---|---|
| Fix a bug, add a feature, improve a test, touch `app.js`/`bootstrap.js`/`sw.js` | [Path A — Code](#path-a--code) |
| Fix or add a translation (`fa`/`en`/`de`, or a new language like Pashto) | [Path B — Translation](#path-b--translation) |
| Write a lesson — fill in an age-band module skeleton, draft a new content pack | [Path C — Content-pack authoring](#path-c--content-pack-authoring) |
| Draw an icon, design a mascot pose, or record/generate audio | [Path D — Art & audio](#path-d--art--audio) |
| Fix a doc, improve this scaffold, clarify something confusing | [Path E — Documentation](#path-e--documentation) |
| Find funding, write an outreach draft, add a partnership lead | [Path F — Funding & outreach](#path-f--funding--outreach) |
| Check color contrast, screen-reader flow, or RTL layout | [Path G — Accessibility](#path-g--accessibility) |
| Run the test suite, do a real-device phone test, hunt for bugs | [Path H — Testing & QA](#path-h--testing--qa) |

Not sure? Start with **Path E (Documentation)** or **Path H (Testing)** — both are low-risk, don't
need the gate, and are excellent ways to learn the repo's shape before touching anything
higher-stakes.

---

## Path A — Code

**Exact steps:**
1. Read [`../docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) — understand the Clean-Architecture/MVVM
   split (§2) and the provider-interface pattern (§3) before writing code that crosses a boundary.
2. Branch, make your change.
3. If you touched any learner-facing string, update `fa`/`en`/`de` together — this is
   test-enforced, not optional.
4. Run `npm test` — must exit 0 across all four suites.
5. Check the Offline-first and Data-minimization standards in
   [`PROTOCOLS-AND-STANDARDS.md`](PROTOCOLS-AND-STANDARDS.md) §1 and §6 — most code review feedback
   traces back to one of these two.
6. Open a PR describing what changed, why, and which test(s) prove it.

**Definition of Done:** [`DOD-BY-TASK-TYPE.md`](DOD-BY-TASK-TYPE.md) §1.
**Needs the gate?** Only if you added/edited learner-facing text — then just that string routes
through the gate, not the surrounding code.
**Review path:** [`REVIEW-PATH.md`](REVIEW-PATH.md) — automated checks → maintainer triage → merge.

---

## Path B — Translation

**Exact steps:**
1. Decide: are you fixing existing `fa`/`en`/`de`, or adding a new language (e.g., Pashto)?
2. If touching `fa`: state explicitly whether you're writing **Dari** or **Iran-Persian** — see
   [`PROTOCOLS-AND-STANDARDS.md`](PROTOCOLS-AND-STANDARDS.md) §2. This is not optional; the two are
   different audiences in this project.
3. Translate every string in the target file completely — no placeholders left where real text
   belongs.
4. Open `index.html` in a browser, switch to the language you touched, and look at it. For RTL
   languages, confirm nothing visually breaks — take a screenshot for the PR.
5. Declare your fluency in the PR description (native / fluent+reviewed-by-native).
6. Open a PR with the screenshot attached.

**Definition of Done:** [`DOD-BY-TASK-TYPE.md`](DOD-BY-TASK-TYPE.md) §2.
**Needs the gate?** Full gate if it's learner-facing content (a lesson card). Just a native-fa
naturalness pass if it's pure UI chrome (button labels, menus).
**Review path:** [`REVIEW-PATH.md`](REVIEW-PATH.md).

---

## Path C — Content-pack authoring

**This is the path with the most structure around it — read carefully.**

**Exact steps:**
1. Read [`REVIEWER-GATE.md`](REVIEWER-GATE.md) in full before opening any module skeleton. Every
   slot you'll see is deliberately marked `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]` —
   understand why before you start filling anything in.
2. Pick your age band: [`modules/README.md`](modules/README.md) lists all five (8–10 through 16–18)
   with what already exists in the shipped app for each, so you don't duplicate an existing pack.
3. Open that band's `modules/age-X-Y/MODULE-SKELETON.md` — it gives you the learning-objective
   headers, not content. **Do not fill the skeleton file itself.**
4. Copy the skeleton's structure into your own working pack file, shaped per
   [`../docs/CONTENT-MODEL.md`](../docs/CONTENT-MODEL.md)'s real JSON schema for your tier.
5. Draft real content in `fa`/`en`/`de`, sourcing honestly (see
   [`PROTOCOLS-AND-STANDARDS.md`](PROTOCOLS-AND-STANDARDS.md) §5 — Licensing & attribution).
   **Stop and re-read the HARD RULE in your band's skeleton if your content touches body, health,
   puberty, or relationships** — that content must be authored by a human subject-matter expert
   from the first word, never AI-drafted at any stage.
6. Run the content validator (`npm test` covers `content/*.json`; a standalone pack like
   `packs/teen-critical-thinking/` has its own `validate.js`).
7. Open a PR. It merges as a labeled **DRAFT**, outside `content/packs.manifest.json` and `sw.js`'s
   precache, until the gate clears — this is normal and expected, not a rejection.
8. Wait for or help recruit the three reviewers — see `REVIEWER-GATE.md`'s "Who these people are."

**Definition of Done:** [`DOD-BY-TASK-TYPE.md`](DOD-BY-TASK-TYPE.md) §3.
**Needs the gate?** Always, full gate, no exceptions — this is the core case the gate exists for.
**Review path:** [`REVIEW-PATH.md`](REVIEW-PATH.md) — note step 5, "If the gate finds a problem":
findings are logged, not a failure; the pack stays a helpful DRAFT for the next contributor.

---

## Path D — Art & audio

**Exact steps:**
1. Read `DO-NO-HARM.md`'s secular-framing rule and the moon-and-star adjacency trap before drawing
   anything celestial or symbolic.
2. For icons: build inline SVG (matches `pictures.js`'s existing pattern) — no external image host,
   no icon-font CDN.
3. For a mascot pose: match `mascot.js`'s existing style and pose vocabulary.
4. For audio: if generating a machine-voice draft, use the existing tooling
   (`tools/generate-draft-audio.py`) so the file is clearly tagged `audioDraft`, never presented as
   a real recording. **Real human recordings are adult-narrator-only — never a child's voice.**
5. Check every new `pic`/asset key referenced by content actually resolves (validator-enforced).
6. Open a PR.

**Definition of Done:** [`DOD-BY-TASK-TYPE.md`](DOD-BY-TASK-TYPE.md) §4.
**Needs the gate?** Secular/context reviewer for anything symbolic; child-safety reviewer for audio
scripts/tone; native-fa reviewer for any spoken script.
**Review path:** [`REVIEW-PATH.md`](REVIEW-PATH.md).

---

## Path E — Documentation

**Exact steps:**
1. Find the doc that's wrong, missing, or confusing — this scaffold itself is a valid target.
2. Fix it, matching the project's honesty style: state what's real vs. planned vs. not-yet-built,
   the way `README.md` and `SAHAR-COVERAGE-STATUS.md` do. No "coming soon" dressed up as done.
3. Check every relative link you touched actually resolves from the file's own location.
4. Confirm you introduced no learner-facing content — if you find yourself drafting a lesson, you're
   actually in Path C, not this one.
5. Open a PR.

**Definition of Done:** [`DOD-BY-TASK-TYPE.md`](DOD-BY-TASK-TYPE.md) §5.
**Needs the gate?** No.
**Review path:** maintainer triage only.

---

## Path F — Funding & outreach

**Exact steps:**
1. Read `SAHAR-COVERAGE-STATUS.md` and `SDG-MAPPING.md` first — any claim you make about what
   Sahar does must match what's actually true today (prototype, not yet piloted with real children).
2. Add your lead to `funding/OUTREACH-TRACKER-2026-07-12.csv`, or draft outreach material in the
   style of `funding/EMAIL-DRAFT-*.md`.
3. Double-check: no personal data about any real child, family, or contact anywhere in what you're
   about to commit — this is a **public** repo.
4. Open a PR.

**Definition of Done:** [`DOD-BY-TASK-TYPE.md`](DOD-BY-TASK-TYPE.md) §6.
**Needs the gate?** No for the mechanics; any public claim about Sahar still gets checked against
`SAHAR-COVERAGE-STATUS.md` for honesty.
**Review path:** maintainer triage only.

---

## Path G — Accessibility

**Exact steps:**
1. Read [`PROTOCOLS-AND-STANDARDS.md`](PROTOCOLS-AND-STANDARDS.md) §3 (Accessibility) and
   [`DEVICE-SUPPORT-MATRIX.md`](DEVICE-SUPPORT-MATRIX.md) Tier E — know the checkable standard
   before you start checking against it.
2. Pick a surface to audit (a specific screen, a specific interaction type) rather than "the whole
   app" — a focused, honest finding beats a vague sweep.
3. Check contrast ratios, keyboard-only navigation, screen-reader flow (TalkBack on a real Tier-A
   phone, or a free desktop screen reader like NVDA), `prefers-reduced-motion`, and RTL layout
   together (fa uses both RTL and, for many users, assistive tech).
4. Record findings honestly — pass/fail per check, tool + version used — the same style as
   `docs/PHONE-TEST.md`'s closing instructions.
5. If you found a real defect, either fix it (if it's a small code change — see Path A) or open an
   issue describing exactly what you found and how to reproduce it.
6. Open a PR (for a fix) or an issue (for a finding without a fix yet).

**Definition of Done:** [`DOD-BY-TASK-TYPE.md`](DOD-BY-TASK-TYPE.md) §7.
**Needs the gate?** Only if your fix changes learner-facing text or symbolic content; a pure
markup/CSS/ARIA fix does not.
**Review path:** [`REVIEW-PATH.md`](REVIEW-PATH.md).

---

## Path H — Testing & QA

**Exact steps:**
1. The single highest-value thing you can do here: **run [`../docs/PHONE-TEST.md`](../docs/PHONE-TEST.md)
   on a real, cheap Android phone.** It has never been fully run and recorded as of this writing —
   see that document's own opening line.
2. Alternatively: run `npm test` locally, try to break something (edge cases, unusual input,
   rapid interaction), and file what you find.
3. Record results the honest way this project already uses everywhere: pass/fail per checklist item,
   device/browser/tool version, and any console errors — into `SAHAR-COVERAGE-STATUS.md` under a
   new dated entry (for a full phone-test run) or as an issue (for a specific bug).
4. If you also fix what you found, that becomes a Path-A (Code) contribution on top — follow that
   path's steps for the fix itself.

**Definition of Done:** [`DOD-BY-TASK-TYPE.md`](DOD-BY-TASK-TYPE.md) §8.
**Needs the gate?** No for the testing/reporting itself; yes for any learner-facing content a fix
touches.
**Review path:** maintainer triage; a phone-test result updates `SAHAR-COVERAGE-STATUS.md` directly
per that document's existing convention.

---

## Step 2 — After you open a PR

Every path above ends the same way from here: [`REVIEW-PATH.md`](REVIEW-PATH.md) — automated checks,
maintainer triage, (content only) the 3-reviewer gate, merge, (content only) a maintainer wires it
into the live app. Read that document once so "what happens next" is never a mystery.

## Step 3 — If you get stuck

- Confused about the JSON shape for content? → `docs/CONTENT-MODEL.md`.
- Confused about the codebase's architecture? → `docs/ARCHITECTURE.md`.
- Confused about which device/tier your change needs to work on? → `DEVICE-SUPPORT-MATRIX.md`.
- Confused about a standard's exact bar (contrast ratio, license rule, etc.)? →
  `PROTOCOLS-AND-STANDARDS.md`.
- Confused about the reviewer gate itself? → `REVIEWER-GATE.md`.
- Still stuck? Open an issue and ask — a clear question about a confusing doc is itself a valid
  Path-E (Documentation) contribution once it's answered: fix the doc that confused you.

---

*A stranger who has never touched this repo before should be able to start at Step 0, pick a path
at Step 1, and land a mergeable PR without guessing. If you tried and couldn't, that gap is itself
worth reporting — see Path E.*
