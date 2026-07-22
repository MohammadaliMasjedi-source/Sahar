# Module skeleton — age band 10–12

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

- **Already in the shipped charter:** `content/packs.manifest.json` band `"10-12"`, curriculum
  Tier 3 (`docs/CURRICULUM-MAP.md`, "Tier 3 — age 10–11"). Currently a **defined empty shell**
  with a curriculum-map preview only — `packs: []` in the manifest. No packs authored yet. This
  band is genuinely open ground within the existing, already-charted plan.
- The preview headings already committed in the manifest (reading paragraphs; fractions &
  percentages; evidence vs. claim; the body & the solar system; timelines & history; first aid &
  safety) are Mo's own existing planning labels — read them in `content/packs.manifest.json` and
  `docs/CURRICULUM-MAP.md` Tier 3 before choosing what to author, so your pack lines up with the
  plan instead of duplicating or contradicting it.
- Also relevant: `docs/drafts/DRAFT-t3-thinking-evidence-vs-claim.json` already exists as an
  unreviewed draft for this band's critical-thinking slot — check it before starting a new one.

## UN/UNICEF positioning (metadata only — not curriculum content)

Primary anchor: **SDG Target 4.1** (the upper-primary / lower-secondary transition) alongside
**4.6** (literacy/numeracy, now at paragraph/fraction depth). Developmentally: UNICEF's "middle
childhood" moving toward "early adolescence" (~10–14). See
[`../README.md`](../README.md#why-these-particular-objective-headers) for the full source list.

---

## The mandatory gate (baked into every slot below)

Before **any** slot in this module may be filled with real content, all three of the following
must sign off, by name and date, recorded per the template in
[`../../REVIEWER-GATE.md`](../../REVIEWER-GATE.md):

1. **Native-fa editor** (Dari — matches this band's existing shipped/planned content convention
   unless a specific pack explicitly targets an Iran-Persian audience, in which case say so and
   use that variant instead)
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
> skeleton contains no such content and never will. Nothing for this band has been reviewed yet;
> the manifest's own preview lists "the body" only as a topic *heading* (`docs/CURRICULUM-MAP.md`
> Tier 3), not as content — treat that heading the same as every other slot on this page.

### 8. Arts, culture, world languages & expression
- Objective: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`
- Content slot: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`

---

## Per-module Definition of Done + review checklist

**Definition of Done** (all must be true before this module's content can be proposed for the gate):
- [ ] Every objective/content slot above is either still the placeholder marker, or has been
      replaced by a human author with real draft text in the correct pack file (not in this
      skeleton file itself).
- [ ] The draft pack follows `docs/CONTENT-MODEL.md`'s card schema, or — if the pedagogy genuinely
      doesn't fit the audio-first tap-card shape at this reading level — a documented rationale
      for a new shape, following the precedent set by `packs/teen-critical-thinking/README.md`'s
      "Why a new pack shape" section (never force one shape into another).
- [ ] `fa` variant (Dari vs. Iran-Persian) explicitly stated and matched to the intended audience.
- [ ] Complete in `fa` / `en` / `de`.
- [ ] Sources recorded and license-compatible per `docs/OSS-REUSE.md` §4.
- [ ] Passes `npm test` (or the pack's own standalone validator, if it has one).
- [ ] Checked against `docs/drafts/DRAFT-t3-thinking-evidence-vs-claim.json` and the manifest's
      Tier-3 preview list so you're extending the plan, not duplicating it.

**Review checklist** (the 3-reviewer gate, see `../../REVIEWER-GATE.md` for the full spec):
- [ ] Native-fa editor sign-off recorded (name, date, what was checked, which `fa` variant).
- [ ] Child-safety adviser sign-off recorded — specifically checked for shame/comparative-pressure
      framing (none allowed, per `DO-NO-HARM.md`) and any disclosure-prompt risk.
- [ ] Secular/Afghanistan-context reviewer sign-off recorded — specifically checked against the
      moon-and-star adjacency rule and any national/religious/political symbol.
- [ ] All arithmetic/factual content hand-checked (per the standard set in
      `packs/teen-critical-thinking/RED-TEAM.md`'s pedagogy audit).
- [ ] Only after all boxes above: a maintainer adds the pack to `content/packs.manifest.json`
      under band `"10-12"`, replacing/extending the empty `packs: []`, and confirms `sw.js`
      precaches it.
