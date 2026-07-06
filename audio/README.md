# Sahar — audio slots (REAL recordings go here)

> **Status: EMPTY on purpose.** The app runs today without any file in here — it
> falls back to the browser voice (English only) or a placeholder chime, and it
> says so honestly in the prototype banner. This folder is the **slot** the real
> recordings drop into. **Mo-gated.**

## Why pre-recorded voice (not TTS)

A pre-literate child learns a sound by hearing it said **correctly, by a real
native speaker**. Browser text-to-speech has **no reliable Dari/Persian voice**,
and a wrong-accent robot would teach the wrong sound. So for the mother tongue
(`fa-AF` Dari) the honest answer is: **record a human.** Ideally **Mo's or Neda's
voice** — they are native speakers, and it makes Sahar warm and personal.

## What to record

For the seed pack `content/lc-fa-en-first-words.json`, each item names two files:

```
audio/fa-AF/<word>.mp3   ← the Dari word, said slowly and clearly
audio/en/<word>.mp3      ← the English word, said slowly and clearly
```

Words in the seed pack (10 × 2 = **20 short clips** for this pack):
`water, sun, bird, tree, house, cat, hand, moon, fish, star`

A whole tier batch is ~50 clips per the coverage contract. Keep each clip:
- **1–2 seconds**, one word, no background noise.
- Warm, slow, smiling. Say it the way you would to a small child.
- `.mp3` (or `.ogg`) — small, so it stays offline-friendly on a cheap phone.

Once a file exists at the slot path, `audio.js` plays it automatically (it tries
the real file first, every time) and the honesty banner flips to "real recordings".

## Caregiver record mode (designed, not wired yet)

`audio.js → AudioEngine.CaregiverRecorder` is a **stub**. The intended flow: an
older sibling or parent records the word **once, on the device**, and it becomes
the real audio for that item. **No child's voice or data ever leaves the machine**
(local-only, IndexedDB). Wiring is Mo-gated.

## Privacy

No audio here is fetched from the network. Nothing is uploaded. This folder is
local files served same-origin, exactly like the rest of Sahar.
