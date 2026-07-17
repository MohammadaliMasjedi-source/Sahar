# Sahar — Teen Critical-Thinking / Media-Literacy Pack (DRAFT)

**What this is.** An original, trilingual (fa / en / de) 8-lesson pack that teaches an
Iranian teenager (age ~13–16) to think clearly and not be fooled — headlines, statistics,
correlation-vs-cause, base rates, checking a source, motivated reasoning, logical fallacies,
and how to change your mind well. It is the **safe half** of the "Sahar for Teens" idea: it
passes a secular/neutral review, needs no sensitive-topic decision, and is built entirely on
**openly licensed sources**. (The sensitive half — teen sexual-health — is deliberately **not**
in this repo; see the separate scope note held privately for Mo.)

**Status: DRAFT — NOT SHIPPED.** This pack is *not* listed in
[`../../content/packs.manifest.json`](../../content/packs.manifest.json) and *not* precached by
[`../../sw.js`](../../sw.js). That is on purpose:

- The live **12–14** shelf stays an honest empty shell (its curriculum *preview* already
  names "Media literacy / سواد رسانه‌ای"), exactly as the charter requires.
- The Tier-1 audio-first content validator ([`../../test/content-validator.test.js`](../../test/content-validator.test.js))
  only scans `content/`, so nothing here can break `npm test`.
- Sahar's charter ([`../../DO-NO-HARM.md`](../../DO-NO-HARM.md)) forbids shipping **any** content
  before a review gate. This pack has not been through it yet.

This mirrors the precedent already in the repo: the T3 "evidence vs. claim" draft lives in
`docs/drafts/` for the same reason. This teen pack lives under `packs/` instead because it is a
**different pedagogy** (reader lessons with a 5-minute exercise + answer key, for teens who
read) — not the audio-first, tap-only card schema. Forcing it into that schema would be
pedagogically wrong for the age band, so it gets its own shape and its own place, honestly
outside the shipped shelf until it earns its way in.

## Why a new pack shape

`docs/CONTENT-MODEL.md` documents two existing shapes (Tier-1 tap cards, and language-course
packs) and says plainly: *"Do not force one shape into the other … their JSON shapes differ
because the pedagogy differs."* A 13–16 media-literacy lesson is a third pedagogy. Each lesson
in `teen-critical-thinking.pack.json` therefore carries:

- `title`, `bigIdea` — the one core principle,
- `example` — an Iranian-teen-relevant scenario (social media, konkur exam pressure, ads),
- `teaching` — the explanation and the concrete "how to spot it" moves,
- `exercise` — a ~5-minute set of items, and
- `answerKey` — worked answers,
- `sources` — the licensed source(s) each lesson draws on.

Every one of those fields is complete in **fa / en / de**. Run the local check:

```
node packs/teen-critical-thinking/validate.js      # 124/124 (also verified via Python)
```

(It is intentionally standalone, not wired into `npm test`, so the shipped gate is untouched.)

## The 8 lessons

1. **How a headline lies** — technically-true-but-misleading headlines; "up to", dropped context, FOMO.
2. **Happening together is not causing** — reverse causation, hidden third cause, coincidence.
3. **Spotting a manipulated statistic** — percent without a base number, truncated graphs, mean vs. median, tiny samples.
4. **Base rates** — why a rare thing stays rare even after a "positive" sign (worked rare-illness example).
5. **How to check a source** — who / how do they know / who gains / where else; reverse image search; forwarded ≠ confirmed.
6. **Motivated reasoning** — confirmation bias, identity-protective belief, "what would change my mind?".
7. **Logical fallacies you can spot** — ad hominem, appeal to crowd/authority, false dilemma, slippery slope, straw man.
8. **How to change your mind (without losing)** — falsification, steelmanning, idea-vs-person, updating as strength.

## Sources and licences — verified by fetching (2026-07-17)

Every licence below was confirmed by fetching the source this session, not from memory. Sahar's
own content licence is **CC BY-SA 4.0**, which is compatible with CC BY and CC BY-SA inputs
(share-alike honored). **This pack is authored original text** built on the *ideas and data* of
these sources — it is **not** a translation of any one copyrighted book.

| Source | Exact licence | Verified at | How it was used |
|---|---|---|---|
| **M. Van Cleave, *Introduction to Logic and Critical Thinking* (2e)** | **CC BY 4.0** — translation & adaptation permitted with attribution | open.umn.edu (Open Textbook Library) | Spine for arguments, fallacies, causal & probabilistic reasoning. Adapted **down** to teen level, original examples. |
| **Wikipedia / Wikimedia text** (Correlation-does-not-imply-causation, Base rate fallacy, Confirmation bias, Motivated reasoning, List of fallacies, Misleading graph, Steelmanning, Falsifiability, WP:Evaluating sources) | **CC BY-SA 4.0** — translation & adaptation permitted; attribution + share-alike | foundation.wikimedia.org Terms of Use | Concept cross-check and scaffolding. **Rewritten in original words** — no text lifted. Share-alike satisfied (Sahar is CC BY-SA 4.0). |
| **Carl Sagan, "Baloney Detection Kit"** (*The Demon-Haunted World*, 1995) | **© copyrighted** — not open | en.wikipedia.org (provenance) | **Concept/ideas only** (facts and ideas aren't copyrightable): independent confirmation, falsifiability, guarding against your own favored hypothesis. **No text reproduced.** |
| **Calling Bullshit** (Bergstrom & West) | **Custom "personal educational use"** — NOT open, no redistribution/adaptation | callingbullshit.org | **Concept/ideas only** (spotting manipulated numbers). **No text copied or translated.** |
| **UNESCO Media & Information Literacy curriculum** | Licence **not stated on the public page (UNVERIFIED for direct text reuse)** | unesco.org | Used **only as a topical scaffold** (what themes to cover). **No UNESCO text translated.** |

**Deliberately excluded** (do not translate — NoDerivatives or not-open): *yourbias.is* and
*yourlogicalfallacyis.com* (CC BY-NC-**ND**), UNESCO ITGSE (CC BY-NC-**ND**), any all-rights-reserved
blog. Translation is a derivative work; ND forbids it.

## What must happen before this ships (the gate)

Per `DO-NO-HARM.md`, in order:

1. **Pedagogy red-team** — age-fit language/load; each idea scaffolds on the previous; fair examples; no shame.
2. **Child-safeguarding red-team** — no example could get a teen in trouble at home or with the state; nothing political/regime-adjacent; teen stays in control; no disclosure prompts.
3. **Secular audit** — no religious/political/nationalist framing anywhere.
4. **Native Iran-Persian review** — a native speaker reads and edits every `fa` string (this pack is Iran-Persian, *not* the Dari-flavored fa of the shipped Tier-1 packs — see the pack's `localizationNote`).
5. **Only then**: design a teen reader view in the app, add the pack to a manifest, and re-run the full test suite green.

## Honest limits

- **Nothing here is reviewed yet.** It is a first draft by one author (AI-assisted), pending the
  four gates above. The Persian especially needs a native editor before anyone reads it as final.
- **Examples are illustrative and non-political by design.** Numbers in the statistics/base-rate
  lessons are explicit hypotheticals, never invented figures presented as real data.
- **This is the safe half only.** The teen sexual-health half is a separate, sensitive decision
  for Mo (name, approach, and a real medical/psych review group) and was not drafted here.
