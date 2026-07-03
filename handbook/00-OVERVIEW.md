# 00 — Overview

- **L1 (ELI5):** Sahar is a small app that teaches children who cannot go to school. It works with
  no internet, speaks Dari, English, and German, and a friendly girl named Sahar learns with you.
- **L2 (ELI15):** Some children — first of all Afghan girls shut out of school since 2021 — have a
  borrowed phone, no data plan, and no classroom. Sahar is a free, offline-first learning app for
  them: small lesson cards (letters, counting, shapes, science, critical thinking) that come back
  on a spaced-repetition schedule, so what is learned actually sticks. No accounts, no ads, no
  tracking — using it should never put a child at risk.
- **L3 (practitioner):** A vanilla-JS Progressive Web App: static files, a cache-first service
  worker, JSON content packs, and a Leitner-box scheduler persisted in `localStorage`. Current
  stage: **working prototype** — 7 Tier-1 packs in fa/en/de, a lesson shelf, 28 headless core
  tests. Pack signing, audio, and Tiers 2–4 are designed but not built (see
  [`../docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md), §9 "Real vs. mocked").
- **L4 (architect):** The project's deepest constraint is that the learner may need to hide the
  fact that she is learning. Every architectural choice follows from that: offline-first (no
  network dependency), privacy-by-default (no data exists to seize), no app store required
  (sideloadable folder), and content-as-data (packs can never carry code). Timeline: 2026-06 —
  vision, docs, and prototype; 2026-06-30 — Tier-1 packs and test suite; 2026-07 — public-repo
  professional pass and dual license (MIT code / CC-BY-SA content).

**Read next:** [`../README.md`](../README.md) (vision + quickstart) ·
[`../learning/PROJECT-EXPLAINED.md`](../learning/PROJECT-EXPLAINED.md) (four-layer explanation) ·
[`01-ARCHITECTURE.md`](01-ARCHITECTURE.md).
