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
  return { svg };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SaharMascot };
}
if (typeof window !== 'undefined') {
  window.SaharMascot = SaharMascot;
}
