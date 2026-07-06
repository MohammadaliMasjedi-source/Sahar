/* Sahar — pictures.js
 * Inline SVG picture library for the audio-first / picture-first bootstrap.
 * NO external image assets: everything is drawn in code so it works fully
 * offline on a cheap phone. Each picture is a self-contained <svg> string
 * keyed by the pack item's `pic` field.
 *
 * Style: simple, warm, high-contrast, recognizable to a young child at a
 * glance (picture-first pedagogy — SAHAR-COVERAGE §6.5 A). Colors come from
 * the dawn palette so the bootstrap matches the rest of Sahar.
 *
 * These are DELIBERATELY simple placeholders. The real design language
 * (per-item illustrations by the PC/Firefly design pass, §6.5 C) replaces
 * them later — the `pic` key is the stable slot.
 */
'use strict';

const PICTURES = {
  water: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <circle cx="50" cy="50" r="46" fill="#1b3a5b"/>
    <path d="M50 20 C64 44 72 56 72 66 a22 22 0 1 1 -44 0 C28 56 36 44 50 20Z" fill="#4db6e6"/>
    <path d="M42 60 a8 8 0 0 0 8 8" stroke="#eaf7ff" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,

  sun: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#2a2350"/>
    <g stroke="#ffd89b" stroke-width="5" stroke-linecap="round">
      <line x1="50" y1="8" x2="50" y2="20"/><line x1="50" y1="80" x2="50" y2="92"/>
      <line x1="8" y1="50" x2="20" y2="50"/><line x1="80" y1="50" x2="92" y2="50"/>
      <line x1="20" y1="20" x2="29" y2="29"/><line x1="71" y1="71" x2="80" y2="80"/>
      <line x1="80" y1="20" x2="71" y2="29"/><line x1="29" y1="71" x2="20" y2="80"/>
    </g>
    <circle cx="50" cy="50" r="22" fill="#f4a259"/>
    <circle cx="50" cy="50" r="22" fill="none" stroke="#ffd89b" stroke-width="3"/>
  </svg>`,

  bird: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#173a4a"/>
    <ellipse cx="52" cy="58" rx="22" ry="18" fill="#f4a259"/>
    <circle cx="38" cy="46" r="13" fill="#f4a259"/>
    <circle cx="34" cy="44" r="2.6" fill="#1c1430"/>
    <path d="M24 46 l-10 -3 10 -3Z" fill="#ffd89b"/>
    <path d="M56 56 q16 -8 24 -2 q-10 10 -24 6Z" fill="#e0719b"/>
    <path d="M50 74 l-4 10 M60 72 l2 10" stroke="#ffd89b" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  tree: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#20304a"/>
    <rect x="45" y="58" width="10" height="30" rx="3" fill="#8a5a2b"/>
    <circle cx="50" cy="42" r="24" fill="#6fcf97"/>
    <circle cx="34" cy="50" r="15" fill="#5bbd85"/>
    <circle cx="66" cy="50" r="15" fill="#5bbd85"/>
  </svg>`,

  house: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#241d44"/>
    <path d="M20 50 L50 24 L80 50Z" fill="#e0719b"/>
    <rect x="28" y="50" width="44" height="34" fill="#ffd89b"/>
    <rect x="44" y="62" width="14" height="22" fill="#8a5a2b"/>
    <rect x="34" y="56" width="9" height="9" fill="#4db6e6"/>
  </svg>`,

  cat: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#2c2350"/>
    <path d="M30 34 L38 20 L44 34Z" fill="#f4a259"/>
    <path d="M70 34 L62 20 L56 34Z" fill="#f4a259"/>
    <circle cx="50" cy="54" r="26" fill="#f4a259"/>
    <circle cx="41" cy="50" r="3" fill="#1c1430"/>
    <circle cx="59" cy="50" r="3" fill="#1c1430"/>
    <path d="M50 58 l-3 4 h6Z" fill="#e0719b"/>
    <path d="M50 62 q-6 6 -12 3 M50 62 q6 6 12 3" stroke="#1c1430" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`,

  hand: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#1f2f4a"/>
    <g fill="#f6c9a4">
      <rect x="34" y="20" width="8" height="34" rx="4"/>
      <rect x="46" y="14" width="8" height="40" rx="4"/>
      <rect x="58" y="18" width="8" height="36" rx="4"/>
      <rect x="70" y="26" width="8" height="30" rx="4"/>
      <path d="M28 46 q-8 4 -6 14 l10 22 q4 8 14 8 h20 q12 0 12 -14 V46 Z"/>
    </g>
  </svg>`,

  moon: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#0b1026"/>
    <circle cx="72" cy="24" r="2" fill="#ffd89b"/>
    <circle cx="24" cy="70" r="2" fill="#ffd89b"/>
    <circle cx="80" cy="60" r="1.6" fill="#ffd89b"/>
    <path d="M62 20 a34 34 0 1 0 0 60 a26 26 0 1 1 0 -60Z" fill="#ffd89b"/>
  </svg>`,

  fish: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#123a52"/>
    <path d="M70 50 L88 36 V64Z" fill="#f4a259"/>
    <ellipse cx="46" cy="50" rx="30" ry="20" fill="#f4a259"/>
    <circle cx="30" cy="46" r="3.4" fill="#1c1430"/>
    <path d="M46 34 q6 6 0 32" stroke="#e0719b" stroke-width="3" fill="none"/>
    <path d="M22 58 q6 4 12 0" stroke="#1c1430" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`,

  star: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#171436"/>
    <path d="M50 14 L61 40 L89 42 L67 60 L74 88 L50 72 L26 88 L33 60 L11 42 L39 40Z"
          fill="#ffd89b" stroke="#f4a259" stroke-width="2"/>
  </svg>`
};

/** Return the SVG string for a pic key, or a gentle fallback. */
function pictureFor(key) {
  return PICTURES[key] || `<svg viewBox="0 0 100 100" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#2a2350"/>
    <text x="50" y="60" text-anchor="middle" font-size="40" fill="#ffd89b">?</text></svg>`;
}

/* Headless export (for tests / node). Browser just reads the globals. */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PICTURES, pictureFor };
}
if (typeof window !== 'undefined') {
  window.PICTURES = PICTURES;
  window.pictureFor = pictureFor;
}
