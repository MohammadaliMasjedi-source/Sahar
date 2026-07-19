/* Sahar — DRAFT geography icons (companion to DRAFT-t2-world-maps-and-places.json)
 * =====================================================================
 * PENDING RED-TEAM + SECULAR AUDIT — NOT MERGED, NOT SHIPPED.
 *
 * This file is NOT pictures.js. It lives in docs/drafts/ on purpose so the live
 * picture library and the content validator stay untouched. It holds the THREE
 * new inline-SVG icons the draft geography pack needs and that the live library
 * (pictures.js) does not yet have — exactly the gap that
 * docs/COVERAGE-8-10-2026-07-14.md §1 named as the reason geography was deferred
 * ("no globe / land-vs-water / map icon").
 *
 * These are DELIBERATELY SIMPLE placeholders in the same dawn-palette spirit as
 * pictures.js — NOT the final §6.5 C illustrated design pass. Before the
 * geography pack may ship, a reviewer MUST:
 *   1. SECULAR-AUDIT each icon (the project's absolute rule): the globe carries
 *      NO country borders, NO flags, NO recognizable single nation; the map is an
 *      abstract folded sheet with a generic pin (no country outline); the mountain
 *      is generic. Confirm none reads as a national/political/religious emblem,
 *      and that neither the moon nor star icon is placed adjacent to them in any
 *      card (the standing moon+star adjacency rule — these three do not use
 *      either, but re-check when composing rounds).
 *   2. Merge the three keys below into pictures.js (PICTURES object).
 *   3. Then follow the promotion checklist in the pack file's own _draft header.
 * =====================================================================
 */
'use strict';

const DRAFT_GEOGRAPHY_PICTURES = {
  /* A blue planet with generic green landmasses and faint grid lines.
   * Intentionally NON-map: no country is recognizable, no borders, no flag. */
  globe: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#0b1026"/>
    <circle cx="50" cy="50" r="34" fill="#2a6fb3"/>
    <path d="M28 42 q10 -7 20 -1 q9 -4 17 3 q-4 8 -15 8 q-9 6 -17 -1 q-9 1 -5 -9Z" fill="#6fcf97"/>
    <path d="M40 66 q9 -4 17 1 q6 4 1 10 q-13 4 -19 -5Z" fill="#5bbd85"/>
    <circle cx="50" cy="50" r="34" fill="none" stroke="#eaf7ff" stroke-width="2" opacity=".45"/>
    <path d="M16 50 H84 M50 16 V84" stroke="#eaf7ff" stroke-width="1.4" fill="none" opacity=".3"/>
  </svg>`,

  /* A folded paper map (three panels), a dotted route and a single red pin.
   * No country shape, no borders — a generic "places, and where a thing is". */
  map: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#1c3350"/>
    <path d="M18 28 L38 22 L62 30 L82 24 V72 L62 78 L38 70 L18 76 Z" fill="#eaf7ff"/>
    <path d="M38 22 V70 M62 30 V78" stroke="#9fb4c4" stroke-width="2" fill="none"/>
    <path d="M26 42 q9 7 20 2 q9 -5 18 3" stroke="#4db6e6" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="1 6"/>
    <path d="M64 34 a8 8 0 0 1 8 8 c0 6 -8 15 -8 15 c0 0 -8 -9 -8 -15 a8 8 0 0 1 8 -8Z" fill="#e0575e"/>
    <circle cx="64" cy="42" r="3" fill="#eaf7ff"/>
  </svg>`,

  /* Two rocky peaks with snow caps and a sun. Generic — no place, no emblem. */
  mountain: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#20304a"/>
    <path d="M6 80 L38 30 L54 56 L68 38 L94 80 Z" fill="#6f7b87"/>
    <path d="M38 30 L48 46 L42 46 L38 40 L30 52 Z" fill="#eaf7ff"/>
    <path d="M68 38 L76 52 L71 52 L68 47 L62 55 Z" fill="#eaf7ff"/>
    <circle cx="80" cy="24" r="7" fill="#ffd89b"/>
  </svg>`
};

/* Headless export only — this is a draft, not wired into the browser globals. */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DRAFT_GEOGRAPHY_PICTURES };
}
