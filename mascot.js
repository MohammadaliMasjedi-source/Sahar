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

  /** One plant "slot" in the garden row. `species` cycles 0..2 for gentle
   *  variety (a bush+blossom, a tulip, a daisy cluster) — all flat shapes,
   *  no gradients, in the dawn palette (folk-art bloom, not a glossy sticker).
   *  `bloomed` false draws a small, quiet, low-opacity sprout instead — "not
   *  grown yet", never sad or broken-looking. */
  function gardenPlant(cx, groundY, species, bloomed) {
    if (!bloomed) {
      return `<g opacity=".38">
        <line x1="${cx}" y1="${groundY}" x2="${cx}" y2="${groundY - 10}" stroke="var(--good)" stroke-width="2" stroke-linecap="round"/>
        <circle cx="${cx}" cy="${groundY - 13}" r="3.2" fill="var(--good)"/>
      </g>`;
    }
    if (species === 1) { // tulip
      return `<g>
        <line x1="${cx}" y1="${groundY}" x2="${cx}" y2="${groundY - 22}" stroke="var(--good)" stroke-width="3" stroke-linecap="round"/>
        <path d="M${cx - 8} ${groundY - 22} Q${cx} ${groundY - 40} ${cx + 8} ${groundY - 22} Q${cx} ${groundY - 27} ${cx - 8} ${groundY - 22}Z" fill="var(--amber)"/>
      </g>`;
    }
    if (species === 2) { // daisy cluster
      return `<g>
        <line x1="${cx}" y1="${groundY}" x2="${cx}" y2="${groundY - 16}" stroke="var(--good)" stroke-width="3" stroke-linecap="round"/>
        <circle cx="${cx - 6}" cy="${groundY - 22}" r="4" fill="var(--cream)"/>
        <circle cx="${cx + 6}" cy="${groundY - 22}" r="4" fill="var(--cream)"/>
        <circle cx="${cx}" cy="${groundY - 28}" r="4" fill="var(--cream)"/>
        <circle cx="${cx}" cy="${groundY - 16}" r="4" fill="var(--cream)"/>
        <circle cx="${cx}" cy="${groundY - 22}" r="3.4" fill="var(--gold)"/>
      </g>`;
    }
    // species 0: round bush + blossom (default)
    return `<g>
      <line x1="${cx}" y1="${groundY}" x2="${cx}" y2="${groundY - 18}" stroke="var(--good)" stroke-width="3" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${groundY - 24}" r="9" fill="var(--good)"/>
      <circle cx="${cx}" cy="${groundY - 30}" r="4.4" fill="var(--rose)"/>
    </g>`;
  }

  /** The child-visible progress GARDEN (SAHAR-V3 CORE slice #1, feature 2):
   *  one plant per lesson pack, blooming left-to-right as the child completes
   *  packs. Gentle and glanceable — no numbers required to "read" progress,
   *  just how much of the row has bloomed. Purely a rendering helper; ALL
   *  progress data comes from GardenProvider (profiles.js), never from here.
   *  @param {number} completed  distinct packs completed by the active profile
   *  @param {number} total      total packs in the shelf
   */
  function garden(completed, total, extraClass) {
    const n = Math.max(1, total || 1);
    const done = Math.max(0, Math.min(completed || 0, n));
    const w = 320, h = 108, groundY = 80;
    const slotW = (w - 32) / n;
    let plants = '';
    for (let i = 0; i < n; i++) {
      const cx = 16 + slotW * (i + 0.5);
      plants += gardenPlant(cx, groundY, i % 3, i < done);
    }
    const fullyBloomed = done >= n;
    const bird = fullyBloomed
      ? `<g transform="translate(${w - 44},${groundY - 40})">${svg(30)}</g>`
      : '';
    const cls = extraClass ? ('garden-scene ' + extraClass) : 'garden-scene';
    // Design-critic fix: the ground/plants used to be painted as plain
    // rects, so the square-cornered dusk ground band overshot the outer
    // rx="16" corners (SVG content isn't clipped by CSS border-radius).
    // A <clipPath> matching the outer rounded rect fixes the seam. RTL
    // mirroring (garden blooms right-to-left for Dari) is handled purely in
    // CSS — same `[dir="rtl"] { transform: scaleX(-1) }` pattern already
    // used for `.hero-bird` / `.dawn-progress .bird` (profiles.css).
    return `<svg class="${cls}" viewBox="0 0 ${w} ${h}" role="img" aria-hidden="true">
      <defs><clipPath id="garden-clip"><rect x="0" y="0" width="${w}" height="${h}" rx="16"/></clipPath></defs>
      <rect x="0" y="0" width="${w}" height="${h}" rx="16" fill="var(--night-2)"/>
      <g clip-path="url(#garden-clip)">
        <rect x="0" y="${groundY}" width="${w}" height="${h - groundY}" fill="var(--dusk)"/>
        <path d="M0 ${groundY + 1} Q ${w / 2} ${groundY - 7} ${w} ${groundY + 1}" fill="none" stroke="var(--good)" stroke-width="2.5" opacity=".45"/>
        ${plants}
        ${bird}
      </g>
    </svg>`;
  }

  return { svg, sunrise, speaker, star, garden };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SaharMascot };
}
if (typeof window !== 'undefined') {
  window.SaharMascot = SaharMascot;
}
