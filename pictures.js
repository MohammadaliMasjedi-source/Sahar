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
  </svg>`,

  /* ---- added for the Tier-1 picture-first migration (SAHAR-COVERAGE §6.5 A).
   * Deliberately simple placeholders, same spirit as the set above — NOT the
   * final illustrated design pass (§6.5 C, out of scope for this lane). ---- */

  garden: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#1c3a24"/>
    <rect x="0" y="72" width="100" height="28" fill="#2f5233"/>
    <circle cx="30" cy="60" r="14" fill="#6fcf97"/>
    <rect x="27" y="60" width="6" height="18" fill="#8a5a2b"/>
    <circle cx="66" cy="50" r="8" fill="#e0719b"/>
    <circle cx="76" cy="56" r="8" fill="#ffd89b"/>
    <rect x="69" y="58" width="5" height="20" fill="#5bbd85"/>
  </svg>`,

  circle: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#20304a"/>
    <circle cx="50" cy="50" r="34" fill="#4db6e6"/>
  </svg>`,

  square: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#20304a"/>
    <rect x="20" y="20" width="60" height="60" rx="6" fill="#f4a259"/>
  </svg>`,

  triangle: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#20304a"/>
    <path d="M50 18 L82 78 L18 78 Z" fill="#e0719b"/>
  </svg>`,

  'swatch-red': `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#2a2350"/>
    <circle cx="50" cy="50" r="32" fill="#e0575e"/>
  </svg>`,

  'swatch-blue': `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#2a2350"/>
    <circle cx="50" cy="50" r="32" fill="#4d8fe6"/>
  </svg>`,

  stone: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#1f2733"/>
    <path d="M20 66 q-4 -22 22 -26 q20 -10 38 2 q22 6 18 26 q2 14 -20 16 h-40 q-20 -2 -18 -18Z" fill="#93a1ad"/>
    <path d="M32 58 q10 -6 20 -2" stroke="#6f7b87" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,

  robot: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#1c2436"/>
    <rect x="28" y="34" width="44" height="38" rx="8" fill="#b7c4d1"/>
    <circle cx="42" cy="52" r="5" fill="#1c1430"/>
    <circle cx="58" cy="52" r="5" fill="#1c1430"/>
    <rect x="38" y="64" width="24" height="5" rx="2" fill="#1c1430"/>
    <rect x="46" y="20" width="8" height="14" fill="#b7c4d1"/>
    <circle cx="50" cy="18" r="5" fill="#f4a259"/>
    <rect x="18" y="42" width="10" height="22" rx="4" fill="#93a1ad"/>
    <rect x="72" y="42" width="10" height="22" rx="4" fill="#93a1ad"/>
  </svg>`,

  leaf: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#1c3a24"/>
    <path d="M50 18 C74 30 78 60 50 86 C22 60 26 30 50 18Z" fill="#6fcf97"/>
    <path d="M50 26 L50 78" stroke="#2f5233" stroke-width="3" fill="none"/>
  </svg>`,

  'check-mark': `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#123a2c"/>
    <circle cx="50" cy="50" r="34" fill="#6fcf97"/>
    <path d="M34 52 L46 64 L68 38" stroke="#0b2417" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  'cross-mark': `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#3a1c1c"/>
    <circle cx="50" cy="50" r="34" fill="#e0575e"/>
    <path d="M38 38 L62 62 M62 38 L38 62" stroke="#3a0f0f" stroke-width="7" fill="none" stroke-linecap="round"/>
  </svg>`,

  'thought-bubble': `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#2a2350"/>
    <ellipse cx="52" cy="42" rx="30" ry="22" fill="#c9b6ff"/>
    <circle cx="30" cy="70" r="7" fill="#c9b6ff"/>
    <circle cx="20" cy="82" r="4" fill="#c9b6ff"/>
    <circle cx="44" cy="38" r="4" fill="#2a2350"/>
    <circle cx="58" cy="38" r="4" fill="#2a2350"/>
    <circle cx="72" cy="38" r="4" fill="#2a2350"/>
  </svg>`,

  'guess-cloud': `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#20304a"/>
    <path d="M30 60 a16 16 0 1 1 4 -31 a20 20 0 0 1 38 6 a15 15 0 0 1 -4 30 Z" fill="#ffd89b" opacity=".9"/>
    <text x="50" y="58" text-anchor="middle" font-size="26" font-weight="700" fill="#1c1430">?</text>
  </svg>`,

  'question-mark': `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#2a2350"/>
    <path d="M22 34 Q30 46 46 40 Q68 32 74 46 Q78 58 60 62 L58 68" stroke="#ffd89b" stroke-width="8" fill="none" stroke-linecap="round"/>
    <circle cx="56" cy="80" r="5" fill="#ffd89b"/>
  </svg>`,

  statement: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#1c3350"/>
    <rect x="18" y="26" width="64" height="40" rx="14" fill="#bfe3ff"/>
    <path d="M30 78 L30 62 L46 62Z" fill="#bfe3ff"/>
    <rect x="30" y="40" width="40" height="6" rx="3" fill="#1c3350"/>
    <rect x="30" y="52" width="26" height="6" rx="3" fill="#1c3350"/>
  </svg>`,

  'quiet-icon': `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#241d44"/>
    <path d="M32 40 h14 l16 -14 v48 l-16 -14 h-14Z" fill="#c9b6ff"/>
    <path d="M62 36 L82 64 M82 36 L62 64" stroke="#e0575e" stroke-width="6" fill="none" stroke-linecap="round"/>
  </svg>`,

  sky: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#2a6fb3"/>
    <ellipse cx="42" cy="52" rx="22" ry="14" fill="#fff" opacity=".92"/>
    <ellipse cx="62" cy="46" rx="16" ry="11" fill="#fff" opacity=".92"/>
    <circle cx="78" cy="26" r="10" fill="#ffd89b"/>
  </svg>`,

  /* ---- added for the Tier-1 life-skills pack (health/safety/feelings,
   * SAHAR-COVERAGE §4 "life"). Deliberately simple placeholders, same spirit
   * as the sets above — NOT the final illustrated design pass (§6.5 C). ---- */

  soap: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#1b3a5b"/>
    <rect x="24" y="38" width="52" height="30" rx="14" fill="#bfe3ff"/>
    <circle cx="70" cy="30" r="6" fill="#eaf7ff"/>
    <circle cx="80" cy="42" r="4" fill="#eaf7ff"/>
    <circle cx="62" cy="24" r="4" fill="#eaf7ff"/>
    <path d="M32 50 q6 -4 12 0" stroke="#4db6e6" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,

  'muddy-water': `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <circle cx="50" cy="50" r="46" fill="#3a2a1c"/>
    <path d="M50 20 C64 44 72 56 72 66 a22 22 0 1 1 -44 0 C28 56 36 44 50 20Z" fill="#8a6a3a"/>
    <circle cx="42" cy="60" r="3" fill="#5c4526"/>
    <circle cx="58" cy="64" r="2.4" fill="#5c4526"/>
    <circle cx="50" cy="70" r="2" fill="#5c4526"/>
  </svg>`,

  toothbrush: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#20304a"/>
    <rect x="18" y="58" width="56" height="12" rx="6" fill="#eaf7ff" transform="rotate(-30 18 58)"/>
    <rect x="58" y="30" width="26" height="16" rx="6" fill="#4db6e6" transform="rotate(-30 58 30)"/>
    <g stroke="#ffffff" stroke-width="3" stroke-linecap="round" transform="rotate(-30 58 30)">
      <line x1="60" y1="26" x2="60" y2="36"/>
      <line x1="68" y1="24" x2="68" y2="34"/>
      <line x1="76" y1="22" x2="76" y2="32"/>
    </g>
  </svg>`,

  bed: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#0b1026"/>
    <rect x="16" y="52" width="68" height="28" rx="6" fill="#4db6e6"/>
    <rect x="16" y="46" width="20" height="16" rx="6" fill="#eaf7ff"/>
    <rect x="12" y="78" width="8" height="10" rx="2" fill="#8a5a2b"/>
    <rect x="80" y="78" width="8" height="10" rx="2" fill="#8a5a2b"/>
    <text x="68" y="34" font-size="16" fill="#ffd89b" font-weight="700">z</text>
    <text x="78" y="24" font-size="12" fill="#ffd89b" font-weight="700">z</text>
  </svg>`,

  ball: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#173a4a"/>
    <circle cx="50" cy="50" r="34" fill="#f4a259"/>
    <path d="M50 16 v68 M16 50 h68" stroke="#ffd89b" stroke-width="4"/>
    <circle cx="50" cy="50" r="34" fill="none" stroke="#e0719b" stroke-width="4"/>
  </svg>`,

  'happy-face': `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#123a2c"/>
    <circle cx="50" cy="50" r="34" fill="#ffd89b"/>
    <circle cx="38" cy="44" r="4" fill="#1c1430"/>
    <circle cx="62" cy="44" r="4" fill="#1c1430"/>
    <path d="M34 60 q16 16 32 0" stroke="#1c1430" stroke-width="4" fill="none" stroke-linecap="round"/>
  </svg>`,

  'sad-face': `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#20304a"/>
    <circle cx="50" cy="50" r="34" fill="#bcd2e0"/>
    <circle cx="38" cy="44" r="4" fill="#1c1430"/>
    <circle cx="62" cy="44" r="4" fill="#1c1430"/>
    <path d="M34 66 q16 -16 32 0" stroke="#1c1430" stroke-width="4" fill="none" stroke-linecap="round"/>
  </svg>`,

  /* ---- added so each lesson-tile on the shelf gets its own distinct house
   * icon instead of 10 identical 🌅 emoji (design fix — SAHAR-COVERAGE §6.5 C).
   * Same deliberately-simple placeholder spirit as the sets above. ---- */

  letters: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#241d44"/>
    <text x="32" y="68" text-anchor="middle" font-size="48" font-weight="800" fill="#ffd89b" font-family="sans-serif">A</text>
    <text x="70" y="66" text-anchor="middle" font-size="30" font-weight="800" fill="#f4a259" font-family="sans-serif">b</text>
  </svg>`,

  book: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#1c3350"/>
    <path d="M50 32 C42 26 28 24 18 28 V72 C28 68 42 70 50 76 C58 70 72 68 82 72 V28 C72 24 58 26 50 32Z" fill="#bfe3ff"/>
    <path d="M50 32 V76" stroke="#1c3350" stroke-width="2"/>
    <path d="M24 38 H40 M24 46 H40 M60 38 H76 M60 46 H76" stroke="#1c3350" stroke-width="2.4" stroke-linecap="round"/>
  </svg>`,

  dawn: `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#171436"/>
    <path d="M50 12 a38 38 0 0 1 0 76Z" fill="#3b2f63"/>
    <path d="M50 12 a38 38 0 0 0 0 76Z" fill="#f4a259"/>
    <circle cx="62" cy="34" r="1.6" fill="#ffd89b"/>
    <circle cx="72" cy="48" r="1.2" fill="#ffd89b"/>
    <path d="M67 38 a13 13 0 1 0 0 24 a10 10 0 1 1 0 -24Z" fill="#ffd89b"/>
  </svg>`,

  'shapes-trio': `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">
    <rect width="100" height="100" rx="12" fill="#20304a"/>
    <circle cx="32" cy="66" r="16" fill="#4db6e6"/>
    <rect x="54" y="52" width="28" height="28" rx="5" fill="#f4a259"/>
    <path d="M50 18 L66 46 L34 46Z" fill="#e0719b"/>
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
