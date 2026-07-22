# Module skeleton — age band 12–14

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

- **Already in the shipped charter:** `content/packs.manifest.json` band `"12-14"`, curriculum
  Tier 4 (`docs/CURRICULUM-MAP.md`, "Tier 4 — age 12–13–14"). Currently a **defined empty shell**
  with a curriculum-map preview only — `packs: []` in the manifest.
- **A real, unreviewed draft already exists for the top of this band:**
  `packs/teen-critical-thinking/` — an 8-lesson critical-thinking/media-literacy pack aimed at
  ~13–16, red-teamed 2026-07-17 and explicitly **held back**: repo-visibility question unresolved,
  and the native-Iran-Persian + child-safeguarding human reviews have not run. Read
  `packs/teen-critical-thinking/RED-TEAM.md` in full before starting new work in this band — it is
  the single best example in this repo of exactly what the gate in this skeleton is for, including
  what a real punch-list looks like.
- Tier 4's curriculum-map explicitly names puberty/reproductive-basics and media-literacy/
  propaganda as *planned topic headings* — see the HARD RULE under category 7 below before going
  anywhere near the first of those.

## UN/UNICEF positioning (metadata only — not curriculum content)

Primary anchor: **SDG Target 4.1** (lower-secondary completion) with **4.7** (global citizenship
and critical engagement) beginning to matter more at this age than at younger bands.
Developmentally: UNICEF's "early adolescence" (~10–14). See
[`../README.md`](../README.md#why-these-particular-objective-headers) for the full source list.

---

## The mandatory gate (baked into every slot below)

Before **any** slot in this module may be filled with real content, all three of the following
must sign off, by name and date, recorded per the template in
[`../../REVIEWER-GATE.md`](../../REVIEWER-GATE.md):

1. **Native-fa editor** — state explicitly which variant (Dari or Iran-Persian) the pack targets;
   `packs/teen-critical-thinking/` targets Iran-Persian, but Afghan-Dari content is equally valid
   for this band.
2. **Child-safety / safeguarding adviser**
3. **Secular / regional-context reviewer** (Afghanistan- or Iran-context, matched to the pack's
   audience)

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
- *Note: `packs/teen-critical-thinking/` already drafts this category for the top of this band —
  check it before starting a duplicate.*

### 5. Digital literacy & online safety
- Objective: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`
- Content slot: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`

### 6. Civics, rights & citizenship
- Objective: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`
- Content slot: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`

### 7. Health, well-being & life skills — age-appropriate
- Objective: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`
- Content slot: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`

> **HARD RULE — read this before touching category 7.** This is the band where
> `docs/CURRICULUM-MAP.md` Tier 4 names "puberty & adolescent development" and "reproductive
> basics" as planned topic headings. **Naming a topic heading in a planning document is not the
> same as content existing, and it changes nothing about this rule:** any actual content here that
> touches the body, puberty, sex, or relationships is **never** drafted by an AI assistant, at any
> stage, for any reason — not as a rough draft, not "just to start," not labeled DRAFT. It is
> authored **only** by a human subject-matter expert from the first word, and still requires the
> full 3-reviewer gate above plus `DO-NO-HARM.md`'s standing rules before it can even be proposed
> as a PR. This skeleton contains no such content and never will. The separate, more sensitive
> "teen sexual-health" idea is explicitly named and explicitly *not* drafted anywhere in this repo
> — see `packs/teen-critical-thinking/README.md`'s "Honest limits" section: *"This is the safe half
> only... a separate, sensitive decision for Mo (name, approach, and a real medical/psych review
> group)."* That stands unchanged.

### 8. Arts, culture, world languages & expression
- Objective: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`
- Content slot: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`

---

## Per-module Definition of Done + review checklist

**Definition of Done** (all must be true before this module's content can be proposed for the gate):
- [ ] Every objective/content slot above is either still the placeholder marker, or has been
      replaced by a human author with real draft text in the correct pack file (not in this
      skeleton file itself).
- [ ] Pack shape matches either the Tier-1/2 card schema (`docs/CONTENT-MODEL.md`) or the reader-
      lesson shape (`title`/`bigIdea`/`example`/`teaching`/`exercise`/`answerKey`/`sources`, per
      `packs/teen-critical-thinking/teen-critical-thinking.pack.json`) — pick whichever fits the
      pedagogy and say why in the PR, following that pack's own "Why a new pack shape" precedent.
- [ ] `fa` variant (Dari vs. Iran-Persian) explicitly stated and matched to the intended audience.
- [ ] Complete in `fa` / `en` / `de`.
- [ ] Every source's exact license verified **by fetching it in this session**, not from memory —
      the licence-table correction in `packs/teen-critical-thinking/RED-TEAM.md` is the cautionary
      example of why "verified by fetching" must be literally true.
- [ ] No text lifted verbatim from a non-open source; concepts only, own words (see that pack's
      source table for the pattern).
- [ ] Passes `npm test` or the pack's own standalone validator.
- [ ] Checked against `packs/teen-critical-thinking/` and the Tier-4 manifest preview so new work
      extends the plan rather than duplicating it.

**Review checklist** (the 3-reviewer gate, see `../../REVIEWER-GATE.md` for the full spec):
- [ ] Native-fa editor sign-off recorded (name, date, which variant, what was checked) — for
      Iran-Persian content, check specifically for the calque patterns already found in
      `packs/teen-critical-thinking/RED-TEAM.md` (e.g. literal English-idiom translations).
- [ ] Child-safety adviser sign-off recorded — specifically checked for disclosure prompts, ad
      hominem examples touching sensitive traits (e.g. body image), and age-fit cognitive load —
      the exact categories `packs/teen-critical-thinking/RED-TEAM.md` flagged.
- [ ] Secular/regional-context reviewer sign-off recorded — specifically checked for politically-
      loaded phrasing (that pack's "با منی یا دشمنِ منی" finding is the concrete example of what
      to look for) and religious-authority connotations in vocabulary choices.
- [ ] All arithmetic/factual content hand-checked.
- [ ] Repo-visibility / governance question resolved for this specific pack if it's the first of
      its kind to ship (per that pack's BLOCKER #1 — confirm with Mo whether public/DPG status
      applies, don't assume).
- [ ] Only after all boxes above: a maintainer adds the pack to `content/packs.manifest.json`
      under band `"12-14"`, replacing/extending the empty `packs: []`, and confirms `sw.js`
      precaches it.
