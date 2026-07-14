# Sahar — Digital Public Goods (DPG) readiness scorecard

*Honest self-assessment against the [DPG Standard](https://digitalpublicgoods.net/standard/)'s 9 indicators, for submission to the Digital Public Goods Alliance registry (digitalpublicgoods.net). Assessed 2026-07-14.*

**Bottom line: strong on principles (~85%). Sahar was built with DPG values by design — open, offline, privacy-first, safeguarded. The gaps are DOCUMENTATION/explicitness, not fundamentals. ~5 small fixes → submission-ready.**

| # | DPG indicator | Status | Evidence / Gap |
|---|---|---|---|
| 1 | **SDG relevance** | 🟡 90% | Clearly serves **SDG 4** (education), and **SDG 5 / 10** (girls & children denied school). GAP: state it **explicitly** in a short mapping. |
| 2 | **Open licensing** | 🟢 100% | `LICENSE` = MIT (code) + `LICENSE-CONTENT.md` (content). Both open. *(confirm content license is CC BY-SA.)* |
| 3 | **Clear ownership** | 🟢 90% | "Copyright (c) 2026 Mohammadali Masjedi" in LICENSE. GAP: one explicit ownership line in README. |
| 4 | **Platform independence** | 🟡 80% | Open-web PWA (HTML/JS/CSS, service worker) — no lock-in. GAP: **audio uses edge-tts (Azure = closed)** — note it's a temporary machine voice; plan open TTS / real recordings. |
| 5 | **Documentation** | 🟢 95% | README, INSTALL, `docs/ARCHITECTURE`, `CURRICULUM-MAP`, `handbook/`, `learning/`. Strong. |
| 6 | **Data extraction (non-PII)** | 🟡 60% | Offline, data is local (profiles/progress). GAP: **document** that stored data is local non-PII and can be exported in a non-proprietary format (add a small export or a statement). |
| 7 | **Privacy & applicable laws** | 🟡 85% | **Excellent by design** — offline-first, no tracking, no accounts, no PII. GAP: add a short **`PRIVACY.md`** stating this (GDPR/COPPA-aligned). |
| 8 | **Standards & best practices** | 🟢 85% | Open web standards + spaced-repetition pedagogy + curriculum map. |
| 9 | **Do no harm by design** | 🟢 90% | **Real strength** — `docs/RED-TEAM-PEDAGOGY-SAFEGUARDING` + age-band red-teams + safeguarding gate; offline (no social/harassment surface). GAP: consolidate into one DPG-facing **`DO-NO-HARM.md`**. |

## The ~5 fixes to be submission-ready (small, ~1 focused pass)
1. **`SDG-MAPPING.md`** — explicitly map to SDG 4 (+5, +10), one paragraph each.
2. **`PRIVACY.md`** — offline · no tracking · no accounts · no PII · GDPR/COPPA-aligned.
3. **`DO-NO-HARM.md`** — consolidate the safeguarding/red-team discipline for reviewers.
4. **Data note** — state local non-PII storage + a non-proprietary export path.
5. **Platform-independence note** — flag edge-tts/Azure as a temporary voice with an open-alternative plan (ties to the legal-audit flag on the Azure mp3s).
6. *(minor)* one ownership line in README; confirm `LICENSE-CONTENT` = CC BY-SA.

## Honest maturity note
Sahar is a **runnable prototype** ("scaffold + working prototype", gated on an adult-supervised pilot). DPG **does** register early-stage projects, and being genuinely runnable + open + safeguarded is what matters — but reviewers value real use. The prototype status is fine to submit with; just keep the "not-yet-piloted" honesty (no over-claim).

## When
Close the ~5 doc fixes (days) → submit the DPG form → DPGA review takes **~weeks**. No fee. Mo submits; LooLoo preps.
