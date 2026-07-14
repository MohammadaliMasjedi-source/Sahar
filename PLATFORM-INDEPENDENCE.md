# Sahar — Platform Independence & Audio Provenance

*Written 2026-07-14 for Digital Public Goods Alliance review (indicator: platform independence).
Two things, both honest: the app itself is fully open-platform; the audio pipeline currently leans
on one closed vendor as a temporary, flagged compromise.*

## The app: open-web, no lock-in

Sahar is a **Progressive Web App** — plain HTML, CSS, and JavaScript plus a service worker, no
proprietary runtime, no app-store gatekeeping, and no framework lock-in (there is no build step at
all in the prototype). It runs in any modern standards-compliant browser on Android, iOS, desktop,
or a cheap secondhand phone, and installs to the home screen like a native app without going
through Google Play or the App Store — which matters specifically because app-store accounts and
approval processes are exactly the kind of gatekeeping a child hiding that she is learning cannot
risk. The code is [MIT-licensed](LICENSE): anyone — another NGO, another diaspora, another
country's denied children — can fork it with no platform permission needed. See
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) §1 and [`docs/OSS-REUSE.md`](docs/OSS-REUSE.md) for
the full dependency list; every runtime dependency in that list is MIT/OFL/public-domain, vendored
locally, never CDN-loaded.

## The flag: audio generation currently depends on a closed vendor

**The one real exception is audio.** The 245 spoken-word draft clips currently in `audio/` were
generated with **edge-tts**, an unofficial client for **Microsoft Edge's neural text-to-speech
service — which runs on Azure, a closed, proprietary cloud backend.** This is a real
platform-independence gap, named plainly rather than glossed over:

- **What it affects:** only the *generation* of draft audio files (`tools/generate-draft-audio.py`,
  run offline-of-the-app, once, by the maintainer). The **app itself makes no calls to Azure or
  Microsoft at runtime** — the generated `.mp3` files are static assets, committed to the repo and
  served same-origin, exactly like every other asset. A user's device never talks to Microsoft.
- **What it doesn't affect:** Sahar's offline-first guarantee for the *learner* is intact — the
  closed dependency lives entirely in the maintainer's build tooling, not in anything a child's
  device does.
- **Why it's still a real flag, not a non-issue:** the *content itself* (245 audio files) was
  produced by a closed vendor's model, which is a supply-chain dependency the project doesn't
  control — if that free, unofficial API changed terms or disappeared, regenerating drafts would
  need a different tool. That is exactly the kind of lock-in a Digital Public Good should minimize
  and disclose.

## This is explicitly temporary — and it is not the real fix anyway

Every one of the 245 clips is a **draft, machine-generated placeholder voice**, flagged as such in
the pack data (`audioNote`, `audioStatus: "draft"`) and in the in-app banner the child/caregiver
sees during playback (`app.js`/`bootstrap.js`, fa/en/de: *"this voice is a temporary machine voice
for now… a real human voice is coming"*). Two separate gaps are being closed by two separate plans:

1. **The platform-independence gap (this document): move draft generation off a closed vendor.**
   [`docs/voice-research/VOICE-RESEARCH.md`](docs/voice-research/VOICE-RESEARCH.md) (researched
   2026-07-12, re-verified 2026-07-14) evaluated seven TTS options against exactly this question.
   Finding: **Piper** (MIT-licensed, fully offline, open model weights, runs on-device) is a real
   open-source alternative and the only genuinely offline option researched — but it currently has
   no Dari voice, only Iranian-Persian community voices, same as edge-tts. Switching `en`/`de`
   drafts to an open engine (Piper or similar) is a viable, honestly-scoped near-term swap; it does
   not by itself fix the accent problem for `fa` (see next point), so it has not been prioritized
   over the human-recording plan below. Not yet decided or scheduled — named here as the concrete
   open-source path, not a promise of a date.
2. **The accent-honesty gap (the bigger one): real human recordings.** The research is blunt about
   this — no vendor, free or paid, open or closed (Azure, Google, Amazon, Piper, Coqui, ElevenLabs),
   has a Dari (Afghan Persian) voice model at any price; it is an industry-wide gap, not a Sahar
   shortcoming. So the actual v1 plan was never "wait for better TTS" — it is **real recordings**,
   ideally in Mo's or Neda's native Dari voice, with the exact ask already written out line-by-line
   in [`audio/RECORDING-MANIFEST.md`](audio/RECORDING-MANIFEST.md) (every Tier-1 prompt + word,
   target filename, recording instructions). A real recording at an existing file path
   automatically wins over the draft — `tools/generate-draft-audio.py` is idempotent and never
   overwrites one. This closes both gaps at once: real recordings are open by construction (no
   vendor at all) and solve the accent problem no TTS engine currently can.

## Honest status, in one line

Today: **0 human recordings, 245 closed-vendor draft clips, both facts disclosed in-app and in this
repo.** The plan is not aspirational — it is written down, scoped, and gated on Mo/Neda's time, not
on any unresolved technical question.

*Related: [`docs/voice-research/VOICE-RESEARCH.md`](docs/voice-research/VOICE-RESEARCH.md),
[`audio/README.md`](audio/README.md), [`audio/RECORDING-MANIFEST.md`](audio/RECORDING-MANIFEST.md),
[`tools/generate-draft-audio.py`](tools/generate-draft-audio.py),
[`docs/OSS-REUSE.md`](docs/OSS-REUSE.md).*
