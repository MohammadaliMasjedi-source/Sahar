# Sahar Dari TTS Research — is there a good-enough Dari voice, or must Mo/Neda record?

Date: 2026-07-12. Scope: 75 Tier-1 Dari prompt lines (+10 single words = 85 total)
per `E:\Mo Pers\Sahar\audio\RECORDING-MANIFEST.md`. Sahar today uses edge-tts
`fa-IR-DilaraNeural` (Iranian Persian) as a flagged DRAFT voice — confirmed by
reading `tools/generate-draft-audio.py` and `audio/README.md`, which already
say plainly: "no reliable Dari/Persian voice" exists and real Dari needs a
human.

This research **independently verified that claim live** rather than trusting
the existing comment, across 7 realistic TTS options.

## Comparison table

| Engine | Real Dari (`prs-AF`/`fa-AF`) voice? | Quality | Licence/cost | Offline? | Child-suitable? |
|---|---|---|---|---|---|
| **edge-tts** | **No.** Only `fa-IR-DilaraNeural` (F) and `fa-IR-FaridNeural` (M) — Iranian Persian only. Verified live via `edge-tts --list-voices` on this machine (v7.2.8). | High (Azure neural backend), but wrong accent for Afghan ears | Free, unofficial (scrapes Edge's read-aloud service; no SLA) | **No** — needs a live network call to Microsoft's endpoint per synth. Can be pre-rendered offline-for-playback, but generation itself is online-only. | Voice tone is warm/friendly; accent is the honesty problem |
| **Azure Speech (official/paid)** | **No.** Same TTS backend as edge-tts. Microsoft Q&A (Mar 2026, official MS staff reply): Dari (`fa-AF`) and Pashto (`ps-AF`) speech *synthesis* remain in Microsoft's backlog with **no public ETA** (STT for `fa-IR`/`ps-AF` exists, TTS does not). | N/A (doesn't exist) | Would be metered/paid, needs Azure account | No (cloud API) | N/A |
| **Google Cloud TTS** | **No.** No Persian or Dari voice of any kind in the official supported-voices list (verified against the live docs page). | N/A | N/A | No | N/A |
| **Amazon Polly** | **No.** Persian/Farsi/Dari absent entirely from Polly's supported-language table (confirmed against the live AWS docs — the list runs Arabic → Welsh with no Persian entry at all). | N/A | N/A | No | N/A |
| **Piper (offline, open)** | **No** — only Iranian Persian. 5 community-trained `fa_IR` voices exist on `rhasspy/piper-voices` (amir, ganji, ganji_adabi, gyro, reza_ibrahim), MIT-licensed. No Dari model exists anywhere in the Piper ecosystem. | Community-trained, varies by voice/quality tier (x_low–high); generally noticeably more robotic than Azure/edge-tts neural | Free, MIT, fully open weights | **Yes — genuinely offline**, tiny (~15-60MB/voice), runs on-device (even Raspberry Pi). This is the only offline option researched. | Not evaluated for child-warmth — not rendered here (installing Piper + downloading a model file needs your go-ahead first; flagging rather than guessing) |
| **Coqui XTTS-v2** | **No.** Official supported-language list is 17 languages (en/es/fr/de/it/pt/pl/tr/ru/nl/cs/ar/zh/ja/hu/ko/hi) — Persian/Dari is not among them. Community requests to add Persian exist but are unmerged. | N/A here | Open (but heavier: needs a GPU-class model for good quality; voice-cloning capable) | Can run locally (given the model), but no Persian/Dari model exists to run | N/A |
| **ElevenLabs** | **Partial/no.** Eleven v3 lists "Persian" generically (fas) among 70+ TTS languages — no distinct Dari/Afghan voice or locale is offered; Dari is recognized only as an *accent* on their Speech-to-Text side, not as a selectable TTS voice. Public info only (no signup, per rails). | Reportedly the most natural-sounding generative TTS on the market for supported languages, but untested here for Persian specifically | Not free beyond 10k chars/month; paid tiers beyond that | No (cloud API) | Unverified for Persian; can't confirm child-tone without hands-on testing |

## Bottom line: nobody has a real Dari (prs-AF) TTS voice, at any price

Every major cloud vendor (Microsoft/Azure, Google, Amazon) and every open engine
(Piper, Coqui) currently has **zero** Afghan Dari synthesis voices — this
isn't an edge-tts limitation, it's an industry-wide gap. Azure's own staff
confirm it is backlogged with no ETA. ElevenLabs is the closest thing to an
exception in principle (broad language claims, generative quality) but does
not expose Dari as a selectable option, only as an STT accent tag.

## Sample clips generated (scratchpad, this folder)

Sentence used (simple, secular greeting a child would hear):
**"سلام! امروز چطور هستی؟"** ("Hello! How are you today?")
Both rendered with edge-tts (installed, v7.2.8) at `-15%` rate — the same
child-directed pace `tools/generate-draft-audio.py` already uses.

- `sample_fa-IR-Dilara.mp3` — `fa-IR-DilaraNeural` (F), **current Sahar draft baseline**
- `sample_fa-IR-Farid.mp3` — `fa-IR-FaridNeural` (M), the only other edge-tts option

No third clip was rendered: no free, account-free, no-download Dari or
better-than-these-two voice exists to render. Piper's `fa_IR` voices could be
rendered, but that requires installing `piper-tts` and downloading a model
file (~15-60MB from Hugging Face) — a download action, so it's flagged here
for your go-ahead rather than done silently; it would still be Iranian accent,
not Dari, so it doesn't change the recommendation below.

**Listen to both and judge the accent yourself** — that's the actual test.
Mo/Neda (native Dari speakers) will hear the Iranian vowel shapes and lexical
choices immediately; that gap is exactly what a Kabul-raised child would also
notice.

## Recommendation

**(a) Best engine for DRAFT audio going forward:** keep **edge-tts**, no
change. It's free, already wired into `tools/generate-draft-audio.py`,
produces the highest-quality neural voice of anything free, and — crucially —
no paid alternative (Azure/Google/Polly/ElevenLabs) does any better on the one
axis that matters (Dari accent), so paying for any of them buys nothing here.
Between Dilara and Farid, that's Mo's ear call from the two samples — both are
equally "not Dari," so pick on warmth/personality alone, not accuracy.

**(b) The honest gap only a human voice fills:** the Dari accent itself
(vowel quality, some vocabulary — e.g. "بچه" vs "بچگک" type register/word
choices differ Iran/Afghanistan), plus the warmth and trust of a familiar
voice. This is not a "polish" gap TTS will close with a better model — it's
architectural: nobody has trained a Dari voice model, publicly or
commercially, as of today. Only Mo's or Neda's real voice closes it.

**(c) Direct answer to the Mo-gate:** **hybrid — TTS draft now, human
recording is the real v1 for the 75 (85) core lines, not a nice-to-have.**
Concretely:
- Ship/keep shipping with edge-tts Dilara as the flagged draft (already
  labeled honestly in-app per `audio/README.md` and the `audioNote` fields) —
  this is fine for internal testing, layout/UX iteration, and so the app
  isn't silent while recording happens.
- Recording the 75 Tier-1 lines (+10 words) in Mo's or Neda's real voice is
  the thing that actually ships to real Afghan children — this research
  confirms there is **no shortcut**: no TTS vendor, free or paid, offers a
  real Dari voice today, so "wait for a better TTS" is not a viable
  alternative path. `RECORDING-MANIFEST.md` already estimates this at a
  realistic weekend project (~5-15 min per pack, 10 packs).
- Re-check Azure's Dari backlog occasionally (their own staff imply it's
  planned, just undated) — if/when `fa-AF` TTS ships from Microsoft, it would
  be worth a quick re-eval, but do not block v1 on it.
