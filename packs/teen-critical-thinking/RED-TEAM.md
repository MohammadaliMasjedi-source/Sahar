# RED-TEAM — Teen Critical-Thinking / Media-Literacy Pack

Adversarial review run 2026-07-17 by an automated red-team gate acting as four
domain experts (critical-thinking pedagogy, child-safeguarding, secular/Iran-context
audit, native Iran-Persian language). This is the DO-NO-HARM gate required by Sahar's
charter before any human-facing content ships. Read it as hostile, not polite.

---

## VERDICT

**NO — this pack CANNOT pass the do-no-harm gate as-is, and it must not ship.** The
content itself is unusually solid (every worked number and every answer key checks out;
examples are deliberately non-political), so the reasons are governance and un-run
mandatory human gates, not broken lessons:

1. **The repository is PUBLIC, not private.** Verified this session with `gh`:
   `MohammadaliMasjedi-source/Sahar` is `visibility: PUBLIC`, `isPrivate: false`. The
   un-reviewed `fa` strings are therefore ALREADY publicly readable (they were pushed in
   commit `9af8bae`). This violates the run's non-negotiable "nothing outward / private
   repo only" law. The repo was almost certainly flipped public on purpose for the active
   DPG (Digital Public Goods) submission — so this is a decision only Mo can make, NOT a
   setting a review agent should silently flip. It was left as-is; see the ACTION line.
2. **The mandatory native Iran-Persian edit (gate 4) has not run** — and the language
   review below found concrete calques that prove this is a non-native first draft.
3. **The mandatory child-safeguarding / developmental-psych review (gate 2) has not run**
   — and several examples below genuinely need a human safety eye before a teen reads them.

The pack's own `status` field and README already say DRAFT / NOT SHIPPED and it is correctly
kept out of `content/packs.manifest.json` and `sw.js` (verified). That honesty scaffolding
is good and should stay. But "held out of the shelf" is not the same as "gate-passed"; the
three points above must be resolved first.

**One genuinely reassuring finding:** every worked statistic and every answer key is
arithmetically and logically correct (details under the pedagogy section). The base-rate
worked example in `ct-4` (90 true positives / 10,080 total positives = under 1 %) is exactly
right. No wrong-number BLOCKER exists — so there was nothing of that kind to fix.

---

## PUNCH-LIST

Priority tags: **[BLOCKER]** = unsafe / wrong-fact / law-violation, must resolve before
ship. **[SHOULD-FIX]** = pedagogy / clarity / secular / language. **[NICE]** = polish.

### BLOCKER (3)

- **[BLOCKER] governance — repo is PUBLIC.** (whole pack) Verified `isPrivate:false,
  visibility:PUBLIC`. The "nothing outward, private repo only" law is not met; the
  un-native-reviewed `fa` is already public. Not auto-fixed: flipping repo visibility is a
  repo-settings change that would likely break the in-flight DPG submission, so it is Mo's
  call. **ACTION for Mo:** decide public (DPG, and then update the run law) vs. private (flip
  it) — do not treat "private repo confirmed" as true, because it is not.
- **[BLOCKER] native Iran-Persian human review (gate 4) NOT done.** (all `fa` strings) An
  automated pass cannot certify Persian naturalness or teen register. Concrete calques found
  below confirm a non-native draft. Hard ship-blocker until a native editor signs off.
- **[BLOCKER] child-safeguarding / developmental-psych review (gate 2) NOT done.** Specific
  examples below (`ct-7` body-weight ad hominem, `ct-7` "with me or my enemy", `ct-5` q2
  flood-in-your-city, `ct-8` reflective prompts) each need a human safety eye. None is
  clearly harmful, but the gate exists precisely so a human — not an AI — makes that call.

### SHOULD-FIX (8)

- **[SHOULD-FIX] licensing accuracy (README table is wrong).** README claims
  *yourbias.is* and *yourlogicalfallacyis.com* are **CC BY-NC-ND** and excludes them because
  "ND forbids translation." Fetched this session: both are **CC BY-NC 3.0 Unported** — there
  is **no ND term.** The real reason they cannot be reused is **NonCommercial + share-alike
  incompatibility** with Sahar's CC BY-SA 4.0, not ND. The exclusion outcome is still correct,
  but the stated licence and reason are factually wrong in a table that claims "verified by
  fetching," and this repo is a PUBLIC DPG submission where licensing IS scrutinised. The
  README line was corrected in this pass; the whole "verified" table should be re-checked by
  a human before a DPG reviewer relies on it. (Van Cleave = CC BY 4.0 was re-verified and is
  correct.)
- **[SHOULD-FIX] ct-2 overstates.** "The only reliable way to prove cause is a controlled
  experiment" — true experiments are the gold standard, but "the only" is too strong for a
  teaching claim (natural experiments, longitudinal controls exist). Prefer "the most
  reliable way." Small but it is a critical-thinking pack; precision matters.
- **[SHOULD-FIX] ct-7 secular flag — "توسل به مرجع" for appeal-to-authority.** In Iran
  "مرجع" strongly connotes "مرجعِ تقلید" (religious authority). For the secular audit, use a
  neutral term such as "توسل به اتوریته/صاحب‌نظر". Native + secular reviewer to confirm.
- **[SHOULD-FIX] ct-7 secular/safeguarding flag — false-dilemma example.** The `fa` example
  "«یا با منی یا دشمنِ منی»" echoes the politically loaded Iranian "با ما / بر ما" ("with us
  or against us") framing. It is personal, not about the State, so the risk is mild — but a
  fully neutral interpersonal example removes any resonance. Safety reviewer to confirm.
- **[SHOULD-FIX] ct-7 q1 safeguarding — body-weight ad hominem.** The example "«...چون خودش
  هم که لاغر نیست»" / "he isn't even thin" ties the fallacy to body weight. For a 13-16
  audience this can brush body-image sensitivity even though it does not endorse thinness.
  Swap for a non-body ad-hominem (e.g. attacking someone's age or accent instead).
- **[SHOULD-FIX] ct-4 cognitive load.** The base-rate worked example is CORRECT but is by far
  the heaviest lesson (a false-positive computation with 100,000 / 99,900 / 9,990 / 10,080).
  For the 13-year-old end this likely needs a simple 2x2 table or tree diagram plus a
  one-sentence plain restatement ("a positive still usually means healthy, because healthy
  people vastly outnumber sick ones"). Keep the numbers; add scaffold.
- **[SHOULD-FIX] ct-8 reflective prompts — make privacy explicit.** q1/q2/q3 ask the teen to
  name "a strong belief you hold" and "a topic you disagree with a friend about." These are
  meant to be internal, but the text should say so plainly ("just for yourself — you do not
  have to show or post this") so it can never read as a disclosure prompt. Charter gate 2
  bars disclosure prompts; this keeps it clearly on the safe side.
- **[SHOULD-FIX] Persian naturalness — calque bundle (for the native editor).** These read as
  literal English-to-Persian and are not Iran-Persian idiom:
  | id | current `fa` | issue | native direction (suggestion only) |
  |---|---|---|---|
  | title | «روشن فکر کردن» | risks reading as «روشنفکر» (= intellectual) | «درست فکر کردن» / «شفاف فکر کردن» |
  | ct-1 | «فنی-درست» | calque of "technically true"; hyphen is un-Persian | «از نظرِ فنی درست» |
  | ct-1 | «کلماتِ لاستیکی» | calque of "rubbery words"; not a Persian idiom | «واژه‌های کِش‌دار / مبهم» |
  | ct-6, ct-7 | «مردِ حصیری» | literal "straw man"; Persian idiom differs | «پهلوانِ پنبه» |
  | ct-8 | «مردِ آهنین» | coinage for "steelman"; collides with Iron Man | needs a clearer native coinage |
  A native must judge each; the list is concrete but not exhaustive.

### NICE (4)

- **[NICE] ct-3 q2.** "8 out of 10 ... based on 12 people asked" — the 8/10 ratio does not map
  cleanly onto a 12-person base. It is a realistic ad, so it works, but a reviewer may tidy the
  numbers.
- **[NICE] ct-4 wording.** "90 % accuracy" is used to mean both 90 % sensitivity AND 90 %
  specificity (10 % false positives). The lesson applies it consistently, but a one-line note
  that "accuracy" hides two different error types would sharpen it.
- **[NICE] ezafe diacritics.** The `fa` uses explicit ezafe marks (ِ) throughout. Helpful for a
  learner, unusual for teen-casual text — native reviewer decides keep/drop for register.
- **[NICE] title syntax.** ct-2 «با هم اتفاق افتادن، علت‌بودن نیست» and the ct-6 title read
  slightly clunky; native polish.

---

## PEDAGOGY — arithmetic and answer-key audit (all PASS)

Every worked number and every answer key was checked by hand this session:

- **ct-1** q1: 90 % of 10 = 9. Correct. "up to 3x" logic correct.
- **ct-3** example: 2 -> 8 is +6 on a base of 2 = 300 % growth. Correct. q1: 1 -> 6 is +5 on a
  base of 1 = 500 % growth. Correct.
- **ct-4** worked example: prevalence 1/1000 in a city of 100,000 -> 100 sick, 99,900 healthy;
  90 % sensitivity -> ~90 true positives; 10 % false-positive rate on 99,900 -> ~9,990 false
  positives; 90 / (90 + 9,990) = 90/10,080 = 0.89 % ("under 1 %"). Correct.
- **Answer keys** for ct-2 (hidden cause / reversed direction / coincidence), ct-4 (base-rate &
  selection bias), ct-6 (confirmation bias remedies), ct-7 (ad hominem / false dilemma / appeal
  to crowd / slippery slope): all logically correct, none itself misleading.

Sequencing (headline -> correlation -> stats -> base rate -> source -> motivated reasoning ->
fallacies -> change your mind) is coherent and each idea scaffolds on the last; the only
altitude concern is the load of ct-4 for the youngest readers (see SHOULD-FIX).

---

## STILL NEEDS A HUMAN (nothing below can be signed off by an AI)

1. **A native Iran-Persian editor.** Must read and edit every `fa` string for naturalness,
   teen register, and the specific calques flagged above (فنی-درست, کلماتِ لاستیکی, مردِ
   حصیری, مردِ آهنین, روشن فکر کردن, توسل به مرجع). This gate CANNOT be satisfied by an
   automated pass — stated plainly, the reviewer here is not a native speaker and does not
   certify the Persian.
2. **A child-safety / developmental-psychology adviser.** Must confirm that no example could
   get an Iranian teen in trouble or cause harm — specifically the "with me or my enemy"
   false dilemma, the flood-in-your-city verification example, the Telegram rare-illness test
   ("should you panic?"), the body-weight ad hominem, and the ct-8 reflective prompts — and
   must confirm the ct-4 base-rate lesson is age-appropriate for the 13-year-old end.
3. **A secular / Iran-context reviewer.** Must confirm "توسل به مرجع" and the "با منی یا دشمنِ
   منی" framing carry no religious or political loading to an Iranian ear.
4. **Mo — a governance decision.** PUBLIC vs private repo: is the public state intended (DPG),
   in which case the "nothing outward" run-law needs updating, or must the repo be flipped
   private? And the "verified by fetching" licence table must be re-checked by a human before
   any DPG reviewer relies on it (one entry was already found wrong — see SHOULD-FIX).

Until items 1-4 are done, this pack stays a DRAFT and does not ship, is not added to any
manifest, and is not precached.
