# Sahar — 10-12 band, next-week deepening plan (honest tee-up)

Date: 2026-07-14 · Author: content-cadence lane (light tee-up, **not** a deepening) ·
Scope: prepare next week's ONE-band deepening of the **10-12** age band.

> **Cadence discipline.** The canon rule is: DEEPEN exactly **one** age band per
> **week**, with real, curriculum-mapped content, quality over speed, and the
> mandatory double red-team (pedagogy + child-safeguarding) + secular gate before
> anything ships. **Today (2026-07-14) the 8-10 band was already deepened** (four
> real Tier-2 packs — see `docs/COVERAGE-8-10-2026-07-14.md` and
> `docs/RED-TEAM-8-10-2026-07-14.md`). So this document does **not** author a
> second band today. It only maps the 10-12 band against the charter, flags the
> real gaps, and proposes what next week's dedicated lane should build. One
> genuinely-qualifying pack is **drafted** as a clearly-marked, non-shipping
> artifact (see §7) — it is *not* shelved, *not* in the manifest, and *not*
> through the red-team gate.

---

## 0. Terminology — "10-12" is charter **Tier 3** (one honest correction)

`content/packs.manifest.json` maps the four charter age bands to curriculum tiers:

| Age band | Curriculum tier (`docs/CURRICULUM-MAP.md`) | Pack file prefix |
|---|---|---|
| 6-8 | Tier 1 — *"I can begin."* | `t1-*.json` |
| 8-10 | Tier 2 — *"I can read and reckon."* | `t2-*.json` |
| **10-12** | **Tier 3 — *"I can understand how things work."*** | **`t3-*.json`** |
| 12-14 | Tier 4 — *"I can think for myself."* | `t4-*.json` |

The task brief called next week's packs "Tier-2 packs" — that phrasing is carried
over from this week's 8-10 (Tier-2) lane. To be precise and avoid a silent drift:
**next week's 10-12 packs are curriculum Tier-3 packs (`t3-*.json`).** Everything
below uses the correct Tier-3 framing.

---

## 1. What the 10-12 band is today (honest baseline)

`content/packs.manifest.json` is the single source of truth (three consumers read
it and nothing else: `app.js` builds the shelf, `sw.js` precaches for offline, and
`test/content-validator.test.js` gates every listed pack). The 10-12 band today is
an **honest empty shell**:

```
{ "band": "10-12", "curriculumTier": 3, "packs": [],
  "preview": {
    "fa": ["خواندن بندها","کسر و درصد","شاهد و ادعا","بدن و منظومهٔ شمسی","خط زمان و تاریخ","کمک‌های اولیه"],
    "en": ["Reading paragraphs","Fractions & percentages","Evidence vs. claim","The body & the solar system","Timelines & history","First aid & safety"],
    "de": ["Absätze lesen","Brüche & Prozente","Beleg gegen Behauptung","Körper & Sonnensystem","Zeitleisten & Geschichte","Erste Hilfe & Sicherheit"]
  } }
```

`packs: []` — **zero** authored lessons. The `preview` is six planned-topic
headings only (the charter's "defined shell WITH its curriculum map"); the app
shows them as a "coming soon" scaffold. Nothing here is invented or faked, and
nothing is claimed built.

---

## 2. Coverage of the 10-12 band vs. the charter spine (the real gaps)

Spine pillars from the task (literacy, numeracy, critical thinking, science,
life-skills, history, human-rights) mapped to what Tier 3 actually calls for
(`docs/CURRICULUM-MAP.md`, Tier 3 cell) and what exists. **Everything is a gap —
the band is empty** — so the useful column is *feasibility now*: can a real,
bar-clearing pack be built with the current engine (four non-read interaction
types) and the 38-icon secular picture library, or is it asset/engine-blocked?

| Spine pillar | Charter Tier-3 intent | Exists today | Feasible now? | Next-week proposal |
|---|---|---|---|---|
| **Critical thinking** | Evidence vs. claim; correlation ≠ cause (gently); reliable vs. unreliable source; how to check a fact | ❌ none (8-10 shipped *fact vs. opinion*; this is the next rung) | ✅ **fully** — reuses already-secular-audited icons (`check-mark`, `guess-cloud`, `thought-bubble`, `question-mark`, `statement`) + `repeat-aloud` | **Pack 1 — Evidence vs. Claim** (drafted, §7) |
| **Numeracy** | Fractions, decimals, percentages; ratios; multi-digit ×/÷; area & perimeter; negatives; read a simple chart | ❌ none | ⚠️ **yes, with a small icon ask** — fractions need ~4-6 new *secular* part-of-a-whole tiles (shaded bar/circle); the rest (charts, area) is a later gap | **Pack 2 — Fractions / parts of a whole** |
| **Science** | Cells & body systems; forces & energy; matter & chemistry; **the solar system**; ecosystems & food chains; how scientists ask questions | ❌ none | ✅ **ecosystems/food-chains fully** (reuses `sun`,`leaf`,`tree`,`fish`,`bird`,`water`,`stone`); ⚠️ solar-system & body need new icons + care (see gaps) | **Pack 3 — Ecosystems & food chains** |
| **History** | Timelines; ancient→modern in broad strokes; **my country's story (told plainly, multiple sides)**; "what is a rule, who makes it?" | ❌ none (8-10 correctly *deferred history to 10-12*) | ⚠️ **safe seed only** — sequencing/"then & now" + a civics/fairness seed is buildable; *national/political/religious* history is **not** safe for a picture-tap kids' pack (see gaps) | **Pack 4 — Then & Now + Fair Rules (history/civics + human-rights seed)** |
| **Human-rights** | Charter places full rights (incl. right to education) at **Tier 4**; a *fairness / being-heard* seed first fits Tier 3 civics | ❌ none | ✅ the **seed** is buildable (`statement`,`check-mark`,`cross-mark`,`hand`,`happy-face`,`sad-face` + `repeat-aloud`); full rights stay Tier 4 | folded into **Pack 4** as the civics/fairness seed |
| **Literacy** | Reading **paragraphs** & short non-fiction; **main idea & summary**; writing a paragraph; dictionary use | ❌ none | ❌ **engine-blocked** — the four interaction types can't fairly express *independent paragraph reading → main idea* on a phone tile; needs a new "read-passage" interaction (engine work, out of a content lane's scope) | **deferred — flagged as the top engine prerequisite** (see gaps) |
| **Life-skills** | **First aid** basics; water safety; fire safety; reading a map; basic budgeting | ❌ none | ⚠️ **needs sourced, red-teamed medical content + new icons** — first-aid for children must be citation-backed (e.g. WHO / Red Cross child-first-aid) and scoped to "get a grown-up / call for help," never partial procedures | **deferred to a later 10-12 lane** (see gaps) |

### The honest gaps, stated plainly

1. **Literacy (paragraph reading) is the biggest *engine* gap — not a content gap.**
   Tier 3's defining literacy leap is reading a paragraph and finding the main idea.
   The current engine (`app.js`) renders only `tap-the-picture`,
   `tap-the-letter-shape` (incl. localized word-glyphs), `match`, and `repeat-aloud`.
   None can present a paragraph and ask a *fair, non-reading-dependent* comprehension
   question — a full paragraph does not fit a tap-tile, and putting it on screen
   would recreate the "read-this-to-progress" hole the audio-first rule
   (`docs/CONTENT-MODEL.md` §0) exists to close. **Recommendation:** before (or as
   the opening move of) a literacy deepening, add ONE new interaction —
   e.g. `read-passage` (a short passage the child reads or has read aloud, then a
   picture/word-glyph "which is the main idea?" choice). This is engine work and
   should be its own small, tested lane; it is the gate for real Tier-3 literacy.
2. **Solar system trips the charter's absolute rule.** A solar-system pack naturally
   places sun + moon + stars together; the repo's **hard secular rule** forbids
   moon-icon + star-icon adjacency (the star-and-crescent misread — see
   `docs/RED-TEAM-8-10-2026-07-14.md` §3 and the 2026-07-13 red-team). It is
   buildable, but only with new *planet/Earth* icons and a deliberate layout that
   never co-locates the crescent and star. Higher asset + red-team cost → not Pack 1-4.
3. **Body & its systems** needs organ icons (heart/lungs/bones) not in the library,
   and child-body content needs safeguarding care. A good later pack; new-asset heavy.
4. **First aid & safety (in the preview)** is high-value but is the one pillar where
   "citations where factual claims are made" is load-bearing for child safety:
   it must be built from a reputable child-first-aid source and scoped to
   *recognise-danger + get-help*, never unsupervised procedures. Deferred to a
   sourced, carefully-red-teamed lane — not rushed into the first four.
5. **Breadth within every shipped subject** stays open by design: one solid pack per
   pillar is the *first* rung, not the whole tier (numeracy still needs decimals/%,
   ratios, ×/÷, area; science still needs forces/energy, matter, the solar system,
   body; critical thinking still needs media/source depth). This is the roadmap, not
   fakery — the same honest posture as the 8-10 coverage doc.

---

## 3. The content quality bar (applied to every proposed pack)

Carried unchanged from the shipped 8-10 packs and `docs/CONTENT-MODEL.md`:

- **Real, curriculum-mapped, never filler or invented.** Every card maps to a named
  charter Tier-3 cell. If it can't be built well, it is **not** built (REAL 90 > FAKE 100).
- **Critical-thinking spine throughout** — even the numeracy/science packs end with a
  "your turn / how do you know?" `repeat-aloud`, and prefer *checkable* claims.
- **Say-what-seems-true; cite where factual.** Settled textbook facts (a plant makes
  food from sunlight; a food chain carries energy from the sun) are stated plainly;
  any pack that makes empirical or *medical* claims (first aid, health) must carry a
  real citation to a reputable source — not asserted from memory.
- **No over-claim.** Distinguish *fact* from *good guess* from *opinion*; teach that a
  reasonable explanation can still be unproven (the evidence-vs-claim through-line).
- **Audio-first & secular by rule** — four non-read interactions only; `audioPending`
  honesty (no faked recordings); no religious/political/nationalist symbol; no
  moon+star adjacency; gentle, no fear/shame/scores/timers; caregiver read-aloud line
  in fa/en/de on every card.
- **Green Node validator + double red-team + secular audit** before any pack ships.

### Pedagogical / age-appropriateness basis (why these, at 10-12)

10-12 is the band where concrete-operational reasoning matures and the
**formal-operational** transition begins (Piaget) — children start to reason about
*hypotheses, evidence, and proportion*, not only concrete objects. That is why the
charter puts *evidence vs. claim*, *fractions/ratio*, *systems* (ecosystems), and the
first *civics/history* reasoning here, and it is the developmentally-right moment —
just before the largely-unsupervised teen years — to build the "so you can't be
fooled" toolkit. (These are named pedagogical frameworks and curricular norms, cited
as the *basis*; the eventual packs must still carry real citations for any specific
empirical claim, per the quality bar.)

---

## 4. Proposed 4 highest-value Tier-3 packs for next week

Chosen to (a) be highest-value on the charter, (b) be buildable to the bar with the
current engine (or a small, clearly-scoped, secular icon ask), (c) clearly pass the
secular + safeguarding red-team, and (d) advance spine **breadth** — deliberately
including the history + human-rights *seed* that 8-10 correctly deferred *to this
band*. This mirrors the 8-10 lane's four-core shape while adding the pillar that
first becomes charter-appropriate at Tier 3.

### Pack 1 — `t3.thinking.evidence-vs-claim` · Critical thinking  *(DRAFTED, §7)*
- **Objective (one line):** tell a *claim* from the *evidence* for it, ask "how could
  I check this?", and see (gently) that two things happening together isn't proof one
  caused the other.
- **Why at 10-12:** the direct next rung after the 8-10 *fact vs. opinion* pack, and
  the app's north-star skill; it lands exactly as hypothesis/evidence reasoning comes
  online (formal-operational transition) and just before unsupervised internet use,
  where source-checking and correlation≠cause are the core of media literacy.
- **Charter cell:** Tier-3 Critical thinking — *evidence vs. claim; correlation isn't
  cause (gently); reliable vs. unreliable source; how to check a fact.*
- **Feasibility:** ✅ zero new assets — reuses `statement`, `check-mark`, `guess-cloud`,
  `thought-bubble`, `cross-mark`, `question-mark` (+ `book` shelf tile), `repeat-aloud`.
- **Quality/citation:** definitional & logical content with everyday checkable
  examples (weather, a plant, a pond); no empirical claims needing citation.
- **Red-team pre-check:** examples kept neutral/universal (a hat & rain coincidence, a
  plant, "clear-looking water isn't proof it's safe" — which teaches *caution*, the
  safe direction); no politics/religion/nationalism; the **moon icon is not used**
  (the word "moon" never appears as the crescent glyph). See §7.

### Pack 2 — `t3.numeracy.fractions-first` · Numeracy
- **Objective (one line):** understand a fraction as equal parts of one whole — half,
  quarter, third — and recognise which picture shows a given fraction.
- **Why at 10-12:** fractions are the widely-documented "gateway" topic where math
  trajectories diverge, and 10-11 is the standard curricular entry point; they are the
  first move from *counting* (6-8) and *whole-number ± and place value* (8-10) into
  *proportional* reasoning — the Tier-3 leap.
- **Charter cell:** Tier-3 Numeracy — *fractions, decimals, percentages; ratios* (this
  pack is the fractions foundation; decimals/% follow in a later numeracy pack).
- **Feasibility:** ⚠️ small, clean icon ask — ~4-6 new **secular** "part of a whole"
  tiles (a bar or circle split into halves/quarters/thirds, part shaded), same
  simple-flat-SVG style as the existing set (cf. the life-skills lane that added 7
  placeholder icons). Numerals `½ ¼ ⅓` can also ride the localized word-glyph slot.
- **Quality/citation:** pure mathematics — answers are self-checking (½ = 2 equal parts,
  one shaded); no citation needed; verify every card's math like the 8-10 add/subtract pack.
- **Red-team pre-check:** shapes and food-sharing (an apple/bread split fairly) are
  neutral and universal; no sensitivities. Keep any "sharing" framing free of
  gendered or household-role assumptions.

### Pack 3 — `t3.science.ecosystems-food-chains` · Science
- **Objective (one line):** see that living things depend on each other — energy flows
  from the sun to plants to animals in a simple food chain.
- **Why at 10-12:** *systems / interdependence* thinking is the age-appropriate step up
  from the 8-10 *plants & habitats* pack (which taught single organisms and their
  homes); it introduces cause-and-effect across a system, reinforcing the
  critical-thinking spine, and is standard upper-primary science.
- **Charter cell:** Tier-3 Science — *ecosystems & food chains; how scientists ask
  questions (observe → guess → test).*
- **Feasibility:** ✅ zero-to-few new assets — builds on existing `sun`, `leaf`, `tree`,
  `fish`, `bird`, `water`, `stone`, `cat` via `tap-the-picture` + `match` sequences
  (sun → plant → animal). One optional herbivore/insect icon would enrich it but isn't required.
- **Quality/citation:** settled textbook science (photosynthesis captures the sun's
  energy; food chains transfer it) stated plainly; cite a standard primary-science
  source in the pack notes for the energy-flow claim.
- **Red-team pre-check:** all nature imagery, already secular-audited; no
  predator/prey content scarier than "a bird eats seeds, a fish is eaten" — keep it
  gentle, no gore. **Preferred over a solar-system pack** for Pack 3 precisely because
  solar-system risks the moon+star adjacency rule and needs new planet icons (gap §2.2).

### Pack 4 — `t3.history.then-now-and-fair-rules` · History & civics + human-rights **seed**
- **Objective (one line):** order things from *long-ago → now* (a timeline idea), and
  understand that a *rule* is a shared agreement meant to be *fair* — everyone gets a
  turn, everyone can be heard.
- **Why at 10-12:** perspective-taking and understanding rules/fairness as *social
  constructs* (not fixed facts) matures in this band; the charter first introduces
  *History & civics* — "what is a rule, who makes it?" — at Tier 3, and it is the
  right place for the **first human-rights seed** (fairness / being-heard), with the
  full right-to-education treatment reserved for Tier 4. For Sahar's actual audience —
  children, especially girls, denied school — a gentle "everyone deserves a turn and a
  voice" seed is quietly the most meaningful pillar in the band.
- **Charter cell:** Tier-3 History & civics — *timelines; "what is a rule, who makes
  it?"*; plus the Tier-4 human-rights pillar seeded gently.
- **Feasibility:** ⚠️ the **civics/fairness half is fully buildable now**
  (`statement`, `check-mark`, `cross-mark`, `thought-bubble`, `hand`, `happy-face`,
  `sad-face`, `repeat-aloud`); the **timeline half** may want 2-3 neutral "stage/age"
  sequence icons (e.g. seedling → sapling → tree, which partly exists; a
  baby→child→adult set would be new).
- **Quality/citation:** built from *concrete, universal* sequences (a seed growing; a
  day; a child growing up) and *fairness principles* — **not** dated historical facts,
  so it carries no contestable factual claims.
- **Red-team pre-check — HIGHEST ATTENTION of the four.** History is the single
  riskiest pillar for this project. The charter's "my country's story, told plainly,
  multiple sides" is a **minefield** (Afghanistan politics / religion / ethnicity) and
  is **explicitly out of scope for this first pack** and likely for the whole band's
  first lane. Pack 4 must be a **safe, secular, universal seed only**: sequencing +
  "a fair rule / everyone gets a turn / being heard." No nations, flags, dates,
  rulers, religions, wars, or "sides." This scoping is a *feature*, not a limitation —
  it is how history/human-rights can enter at 10-12 without failing the secular gate.

**Spine coverage of these four:** critical thinking ✅ · numeracy ✅ · science ✅ ·
history ✅ · human-rights ✅ (seed in Pack 4). **Deferred with reasons:** literacy
(engine-blocked, §2.1) · life-skills/first-aid (needs sourced medical content, §2.4).

---

## 5. Suggested next-week sequence (one band, quality over speed)

1. **Pack 1 — Evidence vs. Claim** — already drafted (§7); next week: run the formal
   double red-team + secular audit, add the tiny `book`/`question-mark` shelf tile,
   wire into `packs.manifest.json` (10-12 band), bump `sw.js` cache, `npm test` green,
   verify in-browser fa/en/de, then ship.
2. **Pack 3 — Ecosystems** — second, because it also needs zero/near-zero new assets.
3. **Pack 2 — Fractions** — third; do the small secular fraction-icon set first, then author.
4. **Pack 4 — Then & Now + Fair Rules** — fourth and most carefully red-teamed; keep it
   the safe universal seed described above.

If the small engine `read-passage` interaction (gap §2.1) is built as its own lane, a
real **literacy** pack can then replace whichever of the above proves weakest — REAL
first, always.

---

## 6. What this document deliberately did NOT do

No second band was deepened today (cadence rule — 8-10 was today's band). No pack was
shipped, shelved, or added to `content/packs.manifest.json`. The 10-12 band remains an
honest empty shell. No content was invented or faked. No claim of "ready" is made
anywhere. The single drafted pack (§7) is a **non-shipping** artifact that has **not**
passed the mandatory red-team gate.

---

## 7. Drafted pack (Pack 1) — **PENDING RED-TEAM GATE — NOT SHIPPED**

To make next week's lane fast and to prove the bar concretely, the single
highest-value, safest, zero-new-asset pack — **Evidence vs. Claim** — is drafted at:

> `docs/drafts/DRAFT-t3-thinking-evidence-vs-claim.json`

**Status: DRAFT. Not shipped. Deliberately kept OUT of `content/` and OUT of
`packs.manifest.json`** so that:
- the 10-12 shelf stays an honest empty shell (nothing ships without the gate), and
- the content validator stays green (its orphan-check only scans `content/`, so a
  draft under `docs/drafts/` is invisible to it and does not fake a shipped pack).

**Before it may ship, next week's lane MUST:**
1. Run the **double red-team** (pedagogy + child-safeguarding) **and secular audit**,
   and write the dated red-team doc — the gate is mandatory and is **not** cleared here.
2. Get the **native-Dari review** of the `fa` strings (standing repo caveat N-1 — the
   draft was authored to a clear standard-Dari register by a non-native author).
3. Move the file into `content/`, add its `{id,file,pic}` line to the 10-12 band in
   `packs.manifest.json`, bump the `sw.js` cache string, and confirm `npm test` green.
4. Verify in-browser (fa/en/de, RTL, gentle retry, `teacher.html`) with zero console errors.

The draft follows `docs/CONTENT-MODEL.md` exactly: 8 cards, one idea each, every card
`audioPending` (no faked audio), a fa/en/de caregiver line, only the four non-read
interaction types, only already-secular-audited icons, no moon+star adjacency, and a
closing open-ended `repeat-aloud`. A self red-team pre-check (not the formal gate) found
it clean: neutral/universal examples, no politics/religion/nationalism, no fear/shame,
and the one safety-adjacent card ("clear-looking water isn't proof it's safe") teaches
*caution*, which is the safe direction.
