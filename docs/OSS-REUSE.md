# Sahar — Open-Source Reuse Plan

*Principle: **reuse proven open source; hand-write only what is uniquely ours** — the curriculum
mapping, the Sahar character/UX, and the offline-pack glue. Every dependency below is permissively or
openly licensed and **offline-compatible** (vendored, not CDN-loaded — ARCHITECTURE §0/§8: zero
external calls).*

---

## 1. Spaced-repetition algorithm
| Option | License | Use |
|---|---|---|
| **SM-2 / Leitner box** (our current engine) | algorithm = public domain; our impl MIT | **Shipping now.** Classic Leitner — boxes 1–5, intervals `[1,2,4,9,21]` days. Tiny, transparent, **works fully offline with no library.** |
| **FSRS** (Free Spaced Repetition Scheduler) | **MIT** (`open-spaced-repetition/fsrs.js`) | **Upgrade path.** Better retention modeling. Drop-in behind the same `schedule()` function (provider-style, ARCHITECTURE §3/§6) when we have enough review data to benefit. |

We **hand-write the glue** (the `schedule()` + persistence) so it stays dependency-free for the
prototype; FSRS is adopted later behind the identical interface.

## 2. PWA / offline patterns
| Option | License | Use |
|---|---|---|
| **Workbox** (Google) | **MIT** | Reference patterns for cache-first, precache manifest, versioned caches. The prototype hand-writes a small `sw.js` in the Workbox *style* (no build step needed offline); Workbox itself can be vendored when the cache logic grows. |
| **Web App Manifest** spec | open standard | `manifest.webmanifest` — installable, standalone, theme color. |

## 3. Fonts — Persian / Dari (must render RTL offline)
| Option | License | Use |
|---|---|---|
| **Vazirmatn** | **OFL 1.1** (SIL Open Font License) | **Primary** Persian/Dari + Latin face; excellent Arabic-script shaping, modern, free. **Self-hosted/vendored** (no Google Fonts call). |
| **Noto Naskh Arabic / Noto Sans Arabic** (Google) | **OFL 1.1** | Fallback / wide script coverage for Dari, Pashto, Arabic, Urdu as languages are added. |

## 4. Open Educational Resources (the actual lesson content)
We **author the curriculum mapping ourselves** (CURRICULUM-MAP.md) but draw factual content,
exercises, and texts from open OER — adapted, translated, and re-illustrated into our pack format.
**Attribution + share-alike obligations are honored per pack** (`"license"` + `"attribution"` fields).

| Source | License | What we draw |
|---|---|---|
| **CK-12 Foundation** | **CC-BY-NC** | K-12 STEM concepts, exercises, "FlexBooks" — Tiers 2–4 science & math. *(NC = non-commercial; fits our not-for-profit stance — verify per-asset.)* |
| **OpenStax** (Rice Univ.) | **CC-BY 4.0** | Rigorous Tier-4 science/math (biology, physics, statistics, economics) — adapt down to age. |
| **Wikibooks / Wikijunior** | **CC-BY-SA 3.0** | Kid-level explanatory text; Wikijunior is purpose-built for young readers. |
| **Project Gutenberg** | **public domain** (US) | Classic literature & folk tales for the literature/arts strand and the companion books. |
| **Khan Academy** content | CC-BY-NC-SA (varies) | Reference for sequencing math/science; adapt, don't copy verbatim — verify per item. |
| **Storyweaver (Pratham)** | **CC-BY 4.0** (many titles) | Multilingual illustrated children's stories — strong for Tier-1/2 literacy + companion-book style. |

> License discipline: **CC-BY** → keep attribution. **CC-BY-SA** → our derived packs/content also
> CC-BY-SA. **CC-BY-NC** → fine for a free not-for-profit app; we must **never** sell it (we don't).
> Each pack records its sources; mixed-license content is kept in separate packs to keep obligations clean.

## 5. Accessibility kit
| Option | License | Use |
|---|---|---|
| **WAI-ARIA Authoring Practices** (W3C) | open standard | Patterns for the card flow, language switch, live regions (ARCHITECTURE §7). |
| **Native HTML semantics + CSS logical properties** | n/a | First line of a11y & RTL — no library needed; `margin-inline-*`, `dir="rtl"`. |
| **axe-core** (Deque) | **MPL-2.0** | Dev-time automated a11y testing (part of the future test suite, house principle #8). |

## 6. i18n
| Option | License | Use |
|---|---|---|
| **Hand-rolled `STRINGS[lang]` + `data-i18n`** | ours, MIT | **Shipping now** — a flat `STRINGS[lang][key]` dictionary; dependency-free, offline. |
| **FormatJS / `Intl` (built-in)** | MIT / platform | Plurals, dates, numbers per locale when content grows; `Intl` needs no dependency. |
| **Fluent (`@fluent/bundle`, Mozilla)** | **Apache-2.0** | Considered for rich RTL/plural grammar if `STRINGS` outgrows flat keys. |

## 7. (Future) pack signing
| Option | License | Use |
|---|---|---|
| **TweetNaCl.js** | **public domain (Unlicense-style)** | Tiny **Ed25519** verify in-browser for the signed-pack design (ARCHITECTURE §4) — app holds the public key, verifies each pack offline. Not yet wired in. |

---

## What we do **not** reuse (hand-write only these)
1. **The curriculum mapping** (`CURRICULUM-MAP.md`) — the editorial spine. Ours.
2. **The Sahar character & the warm dawn UX** — the soul/brand (`NAME.md`). Ours.
3. **The offline-pack glue** — pack schema, loader, versioning, the `ContentProvider`/`ProgressProvider`
   interfaces, and the Leitner `schedule()`/persistence. Ours, deliberately dependency-light so it
   survives offline on a cheap phone.

---

## License posture for Sahar itself
- **Code → MIT** (maximally reusable; let anyone fork the engine for their own denied children) — see [`../LICENSE`](../LICENSE).
- **Original content/packs → CC-BY-SA 4.0** (free, attributed, stays free) — see [`../LICENSE-CONTENT.md`](../LICENSE-CONTENT.md).
- Third-party OER keeps its own license, recorded per pack.

See [`../LICENSE-NOTE.md`](../LICENSE-NOTE.md) for the reasoning.
