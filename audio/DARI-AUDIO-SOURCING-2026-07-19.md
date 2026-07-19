# Sahar — sourcing REAL Dari audio when Mo & Neda cannot record

Date: 2026-07-19 · Author: research lane (non-native; native-Dari review still owed).
Scope: find a **realistic source of real Afghan Dari (`prs`/`fa-AF`) audio** for the
Sahar prompt lines, given the new constraint that **Mo and Neda cannot record it
themselves**. This does not replace the earlier engine survey — it extends it.

> **Read first:** `docs/voice-research/VOICE-RESEARCH.md` (2026-07-12, re-verified
> 2026-07-14) already surveyed 7 TTS engines and concluded there is **no real Dari
> TTS voice at any price**, and recommended "Mo/Neda record the ~85 core lines."
> That recommendation is now **blocked** (Mo/Neda out), so this doc re-checks the
> tech once more and then answers the question that actually matters now: *if not
> Mo/Neda, then who or what produces real Dari audio?*

House rule in force: **REAL 90 > FAKE 100.** A flagged Iranian-Persian draft that
says so is honest; an Iranian-Persian voice quietly shipped *as* Dari is not.
Today's in-app audio is edge-tts `fa-IR-DilaraNeural` — **Iranian Persian standing
in for Dari**, already labelled as a draft. That honesty is the baseline this doc
protects.

---

## DECISION (Mo, 2026-07-19): v1 goes text-first — human Dari audio moves to the funded phase

Mo read this doc and decided the same evening: **Sahar v1 ships text-first.**
Real human Dari audio (Track 1 paid VO and/or Track 2 diaspora volunteer, below)
is a **funded-phase deliverable**, not a v1 blocker. The next realistic grant
window on the tracker is the **Prototype Fund round expected 1 Oct–30 Nov 2026**
(`funding/FUNDING-SPONSORSHIP-MEDIA-STRATEGY-2026-07-12.md`, row 10 — a candidate
window, not committed money), alongside the other tracks in `funding/`.

What this means in practice:

- The app must be — and now verifiably is — **fully usable with audio missing or
  off**: audio never blocks a lesson (`app.js`/`bootstrap.js` degrade to a silent
  no-op when the audio layer is absent or fails).
- The flagged edge-tts **draft voice stays as an optional extra**, labelled
  honestly in the in-app caregiver panel. It is never presented as real Dari.
- The **"What NOT to do" list (§2) stays fully in force**: no Iranian voice
  shipped *as* Dari, no waiting for a better TTS, no recording children.
- Tracks 1 & 2 below stay written up so the funded phase can execute them
  without re-research. The pilot ahead is a **text-first pilot**.

---

## 1. Re-verified today: still no Dari TTS — with two findings the prior doc missed

The 2026-07-12 verdict holds. Two things were checked **live today** because they
are the only items likely to have moved, and both are new to the record:

### 1a. Meta **MMS-TTS** — has Persian, does **not** have Dari (verified)

Meta's Massively Multilingual Speech project ships open VITS TTS checkpoints for
1,100+ languages. Checked the Hugging Face API directly today:

| Checkpoint | HF API status | Meaning |
|---|---|---|
| `facebook/mms-tts-fas` | **200 (exists)** | Persian (macrolanguage `fas`) TTS **does exist** |
| `facebook/mms-tts-prs` | 401 / not found | **No Dari (`prs`) checkpoint** |
| `facebook/mms-tts-pes` | 401 / not found | no separate Western/Iranian Persian one either |

So MMS gives a **new, genuinely-offline, open-weights Persian voice** that the
prior doc (Piper-only for offline) didn't list. But for Sahar it is **not** an
upgrade, for three concrete reasons:

1. **Wrong language, same gap.** `fas` is the Persian macrolanguage; the MMS
   checkpoint's pronunciation leans **Iranian**, not Afghan Dari. The core
   accent-honesty problem is unchanged.
2. **Licence blocker.** `facebook/mms-tts-fas` is released under **CC-BY-NC-4.0**
   (non-commercial — confirmed on its model card today). Sahar's content is
   **CC-BY-SA-4.0** and Sahar is pursued as a **Digital Public Good**, which
   requires an open licence permitting commercial/derivative use. A NC-only voice
   cannot ship in a DPG the way edge-tts drafts (rendered, not redistributed as a
   model) currently do. This is a real, not theoretical, conflict.
3. **Provenance = secular-audit concern.** MMS TTS voices were trained largely on
   **religious (New-Testament) readings**; the voices are single-speaker and
   noticeably robotic. For a project whose absolute rule is *no religious framing*,
   a voice whose prosody was learned from scripture is at best neutral-risk and
   worth naming, not silently adopting.

**Net:** MMS-fas is a second Iranian-leaning Persian robot, NC-licensed. Log it so
nobody re-proposes it as "the open Dari voice." It is not one.

### 1b. Mozilla **Common Voice** — **no Dari locale exists** (verified)

Common Voice is the obvious place a Dari *dataset* would live (the raw material to
one day train a Dari voice). Checked the newest release live today —
**cv-corpus-26.0 (delta 2026-06-12)**:

- `prs` (Dari): **absent**
- `fa-AF` (Afghan Persian): **absent**
- `fa` (Persian): present — but it is the **Iranian-dominated** Persian locale.

So there is **no open Dari speech data** to fine-tune any model on. This is the
root cause behind 1a: you cannot train a Dari `mms-tts-prs`/Piper/XTTS voice
because the training corpus does not exist yet. Common Voice matters here **not as
a voice** (it is many volunteers reading sentences, never a single warm narrator)
but as the honest explanation of *why* the whole vendor+open-source field is empty,
and as the one realistic place to *create* Dari data later (a diaspora-driven
`prs` locale request).

**Bottom line unchanged and now doubly-sourced: there is still no real Dari TTS
voice, and no Dari speech dataset, anywhere, at any price.** The gap is
architectural, not a quality gap a newer model closes. Only a human Afghan voice
closes it.

---

## 2. The real question now: a human Afghan-Dari voice that is *not* Mo or Neda

Since tech is a dead end and Mo/Neda are out, the v1 Dari audio has to be **a real
native Afghan-Dari human**, sourced from someone else. There are two realistic
tracks. **Recommend running them in parallel** — they de-risk each other.

### Track 1 — Paid professional Afghan-Dari voice-over (fastest, most reliable)

A small but real pool of professional **Afghan Dari** voice actors exists, mostly
in the diaspora (Germany, US, Canada, plus Iran/Pakistan). They are bookable today
on VO marketplaces (Voice123, Voices.com, Bunny Studio, Fiverr, VoiceBunny), which
all carry a "Dari" / "Farsi — Afghanistan" filter.

- **Scope & cost:** the job is small — the ~85 Tier-1 lines in
  `audio/RECORDING-MANIFEST.md` (+ ~32 Tier-2 lines once Mo confirms topics).
  Realistic budget **~$150–$400** for a native pro on a short-form buyout; some
  will discount for a children's-education non-profit. Fast turnaround (days).
- **The two gotchas that decide success:**
  1. **Screen for genuine Afghan Dari.** Many profiles tagged "Farsi/Persian" (and
     some tagged "Dari") are **Iranian**. Audition 2–3 with one Sahar line each and
     have a native ear (Mo/Neda can *judge* even if they can't *record*) confirm
     Kabuli-Dari vowels and word choice before booking. Judging is a 5-minute task;
     it is not recording.
  2. **Licence must be explicit and open.** Standard VO contracts are **not**
     open-licensed. The order must include a written **CC-BY-SA-4.0 (or CC0)
     release / full buyout** so the audio can ship in a DPG. Put this in writing
     *before* payment — retrofitting a licence later is the classic trap.
- **Nice-to-have:** a warm **female** voice fits Sahar (a girls-first app) and its
  gentle tone; make it a selection criterion, and respect that some Afghan women
  VOs may decline — that is their call, not a defect.

### Track 2 — Afghan-diaspora volunteer (durable, community-owned, free)

Mo is **in Germany**, which has one of the largest Afghan diasporas, and Mo is
himself a native Dari speaker and teacher with community ties. Recruiting **one or
two** volunteer narrators (ideally a warm woman's voice — a parent or teacher) is
very realistic.

- **Where to look (secular, education-framed — not via religious channels):**
  Afghan student associations at German universities; Afghan teacher/refugee and
  parent networks; Afghan-Institute-of-Learning (AIL) / ACKU diaspora contacts;
  DAAD Afghan-scholar networks; `r/afghanistan` and Dari-language Discord/Telegram
  learning groups; local Afghan community/cultural centers.
- **Why it fits Sahar:** free, authentic, warm, potentially a real parent's voice;
  it also seeds a **long-term Dari voice bank** as tiers 3–4 grow, and gives the
  community ownership of a tool built for their children.
- **Limits to plan for:**
  - **Quality control:** phone-mic variance, consistency, retakes. The repo already
    has `audio/RECORDING-MANIFEST.md` (line-by-line) and `docs/PHONE-TEST.md`; add a
    one-page "record on your phone" guide (quiet room, consistent distance, WhatsApp
    voice-note is fine to start).
  - **Consent + licence + safeguarding:** every contributor signs a short written
    **CC release** and a consent note; collect **no PII**; and — a safeguarding line
    — **use adult narrators only, never record an actual child's voice** (privacy +
    child-safety). This matches Sahar's `DO-NO-HARM.md` discipline.
  - **Timeline:** less predictable than paid. That is exactly why Track 1 runs in
    parallel.

### What NOT to do

- Do **not** ship MMS-fas or any Iranian-Persian voice *as* Dari (§1). It fails the
  accent-honesty rule and, for MMS, the licence and secular tests too.
- Do **not** wait for a better TTS. There is no data to build one (§1b); "wait for
  tech" is not a path, it is a stall.
- Do **not** record children.

---

## 3. Recommendation (for Mo to decide — not a decision)

1. **Keep the honest draft running.** Leave edge-tts `fa-IR-DilaraNeural` as the
   clearly-flagged Iranian-Persian draft so the app is not silent. Unchanged from
   the prior doc. Do **not** machine-render the 8-10 packs until Mo confirms their
   topics (they stay `audioPending` — see `VOICE-RESEARCH.md` 2026-07-14 addendum).
2. **Open Track 1 now:** post the ~85-line job to one VO marketplace with the two
   guardrails baked in — *Afghan-Dari audition screen* + *explicit CC-BY-SA/CC0
   release*. Budget ~$150–$400. This is the fastest route to real, warm, native
   Dari audio and needs **zero** recording from Mo/Neda — only a 5-minute native
   ear to pick the winner.
3. **Open Track 2 in parallel:** put out one warm ask in German-Afghan
   education/community networks for a volunteer narrator (a woman's voice
   preferred), armed with `RECORDING-MANIFEST.md`, a phone-recording one-pager, and
   a CC-release + consent form.
4. **Long-game watch item:** if the diaspora effort grows, a **Common Voice `prs`
   (Dari) locale request** + an MMS/Piper-style fine-tune is the only real road to
   an actual Dari TTS someday. It needs data that does not exist today, so it is a
   future project, not a v1 dependency.

### The crux, stated plainly

Dari is **not** Persian, and no vendor, open model, or dataset closes that gap in
2026 — verified twice now. The only thing that produces real Dari audio is a real
Afghan-Dari human. Mo and Neda being unavailable does **not** block that: a paid
Afghan-Dari pro (days, ~$150–$400, explicit open licence) or a recruited
diaspora volunteer (free, community-owned) each closes it, and Mo's only remaining
job is the 5-minute native-ear judgement of "is this really Dari?" — which is
listening, not recording.

---

## Sources (checked 2026-07-19)

- `docs/voice-research/VOICE-RESEARCH.md` — prior 7-engine survey (this repo).
- Hugging Face API, `facebook/mms-tts-fas` (exists, licence **cc-by-nc-4.0**),
  `facebook/mms-tts-prs` (not found): https://huggingface.co/facebook/mms-tts-fas
- Meta MMS project (1,100+ languages, VITS, religious-corpus provenance):
  https://huggingface.co/docs/transformers/model_doc/mms
- Mozilla Common Voice cv-corpus-26.0 (2026-06-12) language list — **no `prs`,
  no `fa-AF`; only Iranian-dominated `fa`**:
  https://github.com/common-voice/cv-dataset
- VO marketplaces with Afghan-Dari talent: Voice123, Voices.com, Bunny Studio
  (public listings; audition before booking).
