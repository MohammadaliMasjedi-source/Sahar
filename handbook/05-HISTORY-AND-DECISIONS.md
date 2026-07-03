# 05 — History & decisions

## Milestones

| Date | What shipped |
|---|---|
| 2026-06 | Vision + docs (`ARCHITECTURE`, `CURRICULUM-MAP`, `NAME`, `OSS-REUSE`) and the runnable offline prototype (1 demo pack, 3 languages, real Leitner engine) |
| 2026-06-30 | Headless test suite (28 tests, pure Node) · `learning/PROJECT-EXPLAINED.md` · repo made public |
| 2026-06-30 | Six new Tier-1 packs (first letters, counting 0–20, shapes & patterns, living things, what-is-a-question, guess-then-check) + lesson shelf + precache v3 |
| 2026-07-03 | Public-repo professional pass: proper HTML document skeleton, dual license (MIT code / CC-BY-SA 4.0 content), `handbook/`, doc refresh |

## Decisions (ADR style)

**D1 — Offline-first PWA, not a native app** · 2026-06
Why: one codebase reaches phone/tablet/PC, installs without an app store, and can be sideloaded as
a folder. *Rejected:* native Android (store gatekeeping, build complexity), Electron (desktop-only,
heavy).

**D2 — Vanilla JS, zero dependencies, no build** · 2026-06
Why: runs on old cheap devices, survives being copied over Bluetooth, "open it and it runs".
*Rejected:* React/Vue/Svelte — nothing here needs them, and every dependency is attack surface and
weight.

**D3 — Leitner box over fancier schedulers** · 2026-06
Why: transparent enough to *show the child the rule* (the footer ladder `1→2→4→9→21`), trivially
testable, no library. *Rejected for now:* FSRS — better retention modeling but needs review data;
kept as a documented drop-in upgrade behind `schedule()` (see `docs/OSS-REUSE.md` §1).

**D4 — Content as data-only JSON packs** · 2026-06
Why: translators and educators can add lessons without touching code; packs can be sideloaded and
(future) signed; a hostile pack can never execute. *Rejected:* lessons in JS modules — would make
content executable code.

**D5 — Privacy as the safety model** · 2026-06
Why: for the target learner, *being seen learning* can be dangerous. No accounts, no telemetry, no
server, progress on-device only. The compliant path (COPPA/GDPR-K) and the safe path are the same
path. *Rejected:* any analytics, any cloud sync by default.

**D6 — Dual license: MIT code / CC-BY-SA 4.0 content** · 2026-07-03
Why: the engine should travel as far as possible (MIT); the lessons should stay free forever and
uncloseable (share-alike). See `LICENSE-NOTE.md`. *Rejected:* single MIT for everything (content
could be enclosed/sold), GPL for code (would slow NGO adoption).

Future decisions go here, same format: **Decision · Date · Why · Alternatives rejected.**
