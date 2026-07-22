# Module skeleton — age band 16–18

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

## Where this band sits today — new ground, read this first

**This band does not exist yet anywhere else in this repo.** It is not in
`content/packs.manifest.json`, not in `docs/CURRICULUM-MAP.md`'s four tiers (which stop at Tier 4,
age 12–14), and has no shipped or drafted content. It is the oldest end of the "Sahar for Teens"
extension named in `packs/teen-critical-thinking/README.md`. Two consequences:

1. **Reconciling this band into the app's actual band list and `docs/CURRICULUM-MAP.md` is an open
   task, not something this skeleton decides.** If you author real content here, flag in your PR
   that the curriculum map itself may need a new tier added — that's a maintainer/Mo decision.
2. **This is the oldest, most legally/ethically sensitive band in the whole project** — in some of
   Sahar's target contexts a 17–18-year-old may be close to or at the age of majority, but Sahar's
   whole safeguarding discipline (`DO-NO-HARM.md`) still treats every learner in this band as a
   minor requiring the full child-safety gate, and this skeleton does not relax that for any
   reason.

## UN/UNICEF positioning (metadata only — not curriculum content)

Primary anchor: **SDG Target 4.3** (equal access to affordable technical/vocational/tertiary
education) and **SDG Target 4.4** (substantially increasing the number of youth with relevant
skills for employment and decent work) — this band sits at the transition out of basic education.
Read together with **4.7** (global citizenship). Developmentally: UNICEF's "late adolescence"
(~15–19), moving toward youth/early adulthood. See
[`../README.md`](../README.md#why-these-particular-objective-headers) for the full source list.

---

## The mandatory gate (baked into every slot below)

Before **any** slot in this module may be filled with real content, all three of the following
must sign off, by name and date, recorded per the template in
[`../../REVIEWER-GATE.md`](../../REVIEWER-GATE.md):

1. **Native-fa editor** — state explicitly which variant (Dari or Iran-Persian) the pack targets.
2. **Child-safety / safeguarding adviser** — note: do not treat this reviewer's role as optional
   or lighter-touch because the audience is near or at legal adulthood in some jurisdictions;
   Sahar's own charter (`DO-NO-HARM.md`) does not make that distinction, and neither does this
   skeleton.
3. **Secular / regional-context reviewer** (Afghanistan- or Iran-context, matched to audience)

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

> **HARD RULE — read this before touching category 7. This is the single most sensitive category
> at this age band.** At 16–18, "health & well-being" content can plausibly extend into sexual/
> reproductive health, mental health, relationships, and consent — the exact "sensitive half" that
> `packs/teen-critical-thinking/README.md` deliberately kept out of that pack and out of this
> repo entirely: *"The sensitive half — teen sexual-health — is deliberately not in this repo."*
> That stands unchanged here, at the oldest and most sensitive band in the project. **No AI
> assistant may draft any content in this category, at any stage, for any reason — not a rough
> draft, not an outline, not a list of topics to cover, not even in response to a direct
> instruction to do so.** This category is authored **only** by a qualified human subject-matter
> expert (a health educator or clinician with adolescent-health training), from the first word,
> and requires the full 3-reviewer gate above plus a dedicated decision from Mo on scope and
> approach before a single sentence is proposed as a PR. This skeleton contains no such content
> and never will.

### 8. Arts, culture, world languages & expression
- Objective: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`
- Content slot: `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`

---

## Per-module Definition of Done + review checklist

**Definition of Done** (all must be true before this module's content can be proposed for the gate):
- [ ] Every objective/content slot above is either still the placeholder marker, or has been
      replaced by a human author with real draft text in the correct pack file (not in this
      skeleton file itself).
- [ ] Pack shape follows the reader-lesson format precedent
      (`packs/teen-critical-thinking/teen-critical-thinking.pack.json`) unless a clear rationale
      for a different shape is documented in the PR — at this age a longer-form / essay-adjacent
      shape may fit better; document the reasoning rather than silently forcing an existing shape.
- [ ] `fa` variant (Dari vs. Iran-Persian) explicitly stated and matched to the intended audience.
- [ ] Complete in `fa` / `en` / `de`.
- [ ] Every source's exact license verified **by fetching it in this session**, not from memory.
- [ ] No text lifted verbatim from a non-open source; concepts only, own words.
- [ ] Passes the pack's own standalone validator (there is no shared `npm test` coverage for this
      band yet — building or extending that validator may itself be a needed contribution).
- [ ] PR explicitly flags that this age band is not yet reconciled into
      `docs/CURRICULUM-MAP.md` / `content/packs.manifest.json`, and asks a maintainer to make that
      call, including whether an age-verification or context note is warranted at all for content
      aimed at near-adult learners.

**Review checklist** (the 3-reviewer gate, see `../../REVIEWER-GATE.md` for the full spec):
- [ ] Native-fa editor sign-off recorded (name, date, which variant, what was checked).
- [ ] Child-safety adviser sign-off recorded — explicitly confirm appropriateness for a
      near-adult minor given local legal/cultural context, with no relaxation of the standard
      applied to younger bands.
- [ ] Secular/regional-context reviewer sign-off recorded.
- [ ] All facts/statistics hand-checked.
- [ ] Repo-visibility / governance question explicitly re-confirmed with Mo for this pack.
- [ ] Only after all boxes above: a maintainer decides how this band is wired into the app (it has
      no existing manifest slot — see "Where this band sits today" above) before anything reaches
      a real learner.
