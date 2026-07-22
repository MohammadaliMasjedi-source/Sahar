# Module skeleton — age band 8–10

> **STATUS: EMPTY SKELETON — STRUCTURE ONLY.** No lesson content exists in this file, and none
> should be added directly to this file. Copy this structure into your own working pack (see
> `docs/CONTENT-MODEL.md` for the real JSON shape) and fill *that* in.
>
> Every content slot below reads exactly:
> **`[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`**
> That marker means: a human may draft this, but it may never reach a child until the gate below
> clears. **This file itself must never be filled in by an AI assistant.** Human authors draft
> lesson content in their own pack files; human reviewers clear it; only then does a maintainer
> wire it into the app.

## Where this band sits today

- **Already in the shipped charter:** `content/packs.manifest.json` band `"8-10"`, curriculum
  Tier 2 (`docs/CURRICULUM-MAP.md`, "Tier 2 — age 8–9"). Four real packs already ship for this
  band (literacy: reading sentences; numeracy: add/subtract; thinking: fact vs. opinion; science:
  plants & habitats) — see `content/t2-*.json`.
- **This skeleton is for what's still missing** from that band's curriculum-map plan: geography,
  health & body, digital literacy (seed), arts & music, and deeper coverage of the four subjects
  already started. Check `docs/CURRICULUM-MAP.md`'s Tier 2 table before you start, so you don't
  duplicate an existing pack.

## UN/UNICEF positioning (metadata only — not curriculum content)

Primary anchor: **SDG Target 4.6** (foundational literacy and numeracy) and **SDG Target 4.1**
(free, equitable primary education) — this band is squarely inside primary schooling age.
Developmentally: UNICEF's "middle childhood" framing. See
[`../README.md`](../README.md#why-these-particular-objective-headers) for the full source list and
citation discipline.

---

## The mandatory gate (baked into every slot below)

Before **any** slot in this module may be filled with real content, all three of the following
must sign off, by name and date, recorded per the template in
[`../../REVIEWER-GATE.md`](../../REVIEWER-GATE.md):

1. **Native-fa editor** (Dari — this band's `fa` is Afghan-girls-first Dari, per
   `docs/CONTENT-MODEL.md` §1)
2. **Child-safety / safeguarding adviser**
3. **Secular / Afghanistan-context reviewer**

No slot ships with fewer than three. No AI-generated draft substitutes for any of the three.

---

## Learning-objective headers (headers only — no content)

### 1. Literacy & language
- Objective: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`
- Content slot: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`

### 2. Numeracy & mathematics
- Objective: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`
- Content slot: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`

### 3. Science & the scientific method
- Objective: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`
- Content slot: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`

### 4. Critical thinking & media/information literacy
- Objective: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`
- Content slot: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`

### 5. Digital literacy & online safety
- Objective: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`
- Content slot: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`

### 6. Civics, rights & citizenship
- Objective: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`
- Content slot: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`

### 7. Health, well-being & life skills — age-appropriate
- Objective: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`
- Content slot: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`

> **HARD RULE — read this before touching category 7.** Any content here that touches the body,
> puberty, health, or relationships is **never** drafted by an AI assistant, at any stage, for any
> reason — not as a rough draft, not "just to start," not labeled DRAFT. It is authored **only**
> by a human subject-matter expert from the first word, and still requires the full 3-reviewer
> gate above plus `DO-NO-HARM.md`'s standing rules before it can even be proposed as a PR. This
> skeleton contains no such content and never will. For this 8–10 band specifically, the existing
> shipped precedent is `content/t1-life-healthy-and-safe.json` (hygiene, safety, trusted grown-ups
> — reviewed per `docs/RED-TEAM-PEDAGOGY-SAFEGUARDING-2026-07-13.md`); nothing beyond that scope
> has been reviewed for this band.

### 8. Arts, culture, world languages & expression
- Objective: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`
- Content slot: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`

---

## Per-module Definition of Done + review checklist

**Definition of Done** (all must be true before this module's content can be proposed for the gate):
- [ ] Every objective/content slot above is either still the placeholder marker, or has been
      replaced by a human author with real draft text in the correct pack file (not in this
      skeleton file itself).
- [ ] The draft pack follows `docs/CONTENT-MODEL.md`'s Tier-1/2 card schema (audio-first,
      `interaction` from the approved list, `caregiver` line present, honest `audioPending`/
      `audioDraft` state).
- [ ] `fa` is confirmed Dari (not Iran-Persian) — matches this band's shipped-content convention.
- [ ] Complete in `fa` / `en` / `de`.
- [ ] Sources recorded and license-compatible per `docs/OSS-REUSE.md` §4.
- [ ] Passes `npm test` (specifically `test:content`).
- [ ] Does not duplicate a subject already covered by an existing shipped Tier-2 pack
      (`content/t2-*.json`) or Tier-1 pack, unless deliberately deepening it (say so in the PR).

**Review checklist** (the 3-reviewer gate, see `../../REVIEWER-GATE.md` for the full spec):
- [ ] Native Dari editor sign-off recorded (name, date, what was checked).
- [ ] Child-safety adviser sign-off recorded — specifically checked for shame/comparative-pressure
      framing (none allowed, per `DO-NO-HARM.md`) and any disclosure-prompt risk.
- [ ] Secular/Afghanistan-context reviewer sign-off recorded — specifically checked against the
      moon-and-star adjacency rule and any national/religious/political symbol.
- [ ] All arithmetic/factual content hand-checked (per the standard set in
      `packs/teen-critical-thinking/RED-TEAM.md`'s pedagogy audit).
- [ ] Only after all boxes above: a maintainer adds the pack to `content/packs.manifest.json`
      under band `"8-10"` and confirms `sw.js` precaches it.
