/* Sahar — mascot.js
 * Shared inline-SVG dawn-bird mascot generator (SAHAR-COVERAGE §6.5-C: the
 * missing Duolingo-grade kid visual identity for the MAIN app — the same bird
 * character bootstrap.js already draws privately for the first-contact flow,
 * factored out here so index.html/app.js can reuse the exact same mascot
 * without touching bootstrap.js/bootstrap.css (kept independent, unaffected).
 *
 * Vanilla, no deps, no external image assets — the SVG is drawn in code so
 * it works fully offline on a cheap phone (house principle: no heavy deps).
 */
'use strict';

const SaharMascot = (() => {
  /** The dawn-bird mascot as an inline <svg> string.
   * @param {number} [size] pixel width/height (square viewBox).
   * @param {string} [extraClass] extra CSS class(es) appended after "dawnbird".
   */
  function svg(size, extraClass) {
    const s = size || 34;
    const cls = extraClass ? ('dawnbird ' + extraClass) : 'dawnbird';
    return `<svg class="${cls}" width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="var(--amber)" opacity=".22"/>
      <ellipse cx="21" cy="23" rx="9" ry="7.5" fill="var(--amber)"/>
      <circle cx="14" cy="18" r="6" fill="var(--amber)"/>
      <circle cx="12" cy="17" r="1.3" fill="var(--ink)"/>
      <path d="M6 18 l-4 -1 4 -1Z" fill="var(--gold)"/>
      <path d="M23 22 q7 -4 11 -1 q-5 5 -11 3Z" fill="var(--rose)"/>
    </svg>`;
  }

  /** A small flat sunrise glyph — replaces the raw 🌅 emoji used as the
   * progress-path "goal" marker (design fix: house icon set, no OS emoji). */
  function sunrise(size, extraClass) {
    const s = size || 28;
    const cls = extraClass ? ('mascot-sunrise ' + extraClass) : 'mascot-sunrise';
    return `<svg class="${cls}" width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true">
      <g stroke="var(--gold)" stroke-width="2.6" stroke-linecap="round">
        <line x1="20" y1="2" x2="20" y2="8"/>
        <line x1="5" y1="9" x2="9.5" y2="13.5"/>
        <line x1="35" y1="9" x2="30.5" y2="13.5"/>
        <line x1="1" y1="22" x2="8" y2="22"/>
        <line x1="32" y1="22" x2="39" y2="22"/>
      </g>
      <circle cx="20" cy="24" r="10" fill="var(--amber)"/>
      <circle cx="20" cy="24" r="10" fill="none" stroke="var(--gold)" stroke-width="2"/>
    </svg>`;
  }

  /** A small flat speaker glyph — replaces the raw 🔊 half of the audio-first
   * CTA (design fix: house icon set, no OS emoji). */
  function speaker(size, extraClass) {
    const s = size || 26;
    const cls = extraClass ? ('mascot-speaker ' + extraClass) : 'mascot-speaker';
    return `<svg class="${cls}" width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M6 15 H12 L21 7 V33 L12 25 H6Z" fill="var(--gold)"/>
      <path d="M26 14 a10.5 10.5 0 0 1 0 12" stroke="var(--gold)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M30.5 9 a17 17 0 0 1 0 22" stroke="var(--gold)" stroke-width="3" fill="none" stroke-linecap="round" opacity=".65"/>
    </svg>`;
  }

  /** A small flat star glyph — replaces the raw 🌟 feedback emoji, and doubles
   * as the correct-tap celebration burst particle (SAHAR-COVERAGE §6.5-C). */
  function star(size, extraClass) {
    const s = size || 20;
    const cls = extraClass ? ('mascot-star ' + extraClass) : 'mascot-star';
    return `<svg class="${cls}" width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 3 L24.6 15.3 L37.8 15.8 L27.2 23.9 L30.9 36.6 L20 29.2 L9.1 36.6 L12.8 23.9 L2.2 15.8 L15.4 15.3Z"
            fill="var(--gold)" stroke="var(--amber)" stroke-width="1.4" stroke-linejoin="round"/>
    </svg>`;
  }

  return { svg, sunrise, speaker, star };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SaharMascot };
}
if (typeof window !== 'undefined') {
  window.SaharMascot = SaharMascot;
}
