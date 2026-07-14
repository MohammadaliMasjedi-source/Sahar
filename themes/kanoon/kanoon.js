/* Sahar — themes/kanoon/kanoon.js
 * Loader for the "Storybook" skin (Kanoon-inspired visual identity layer —
 * see themes/kanoon/INSPIRATION.md for the honest homage/credits statement).
 *
 * Loaded in <head> so the theme attribute lands BEFORE first paint (no
 * flash of the wrong theme). Five responsibilities, all additive:
 *   1. apply(): read localStorage 'sahar.theme' and set html[data-theme] /
 *      [data-kvariant] — kanoon.css keys every rule off these attributes.
 *   2. patch SaharMascot (once the body scripts have loaded) so the
 *      dawn-bird / bloom / sun / garden render as folk-redrawn variants
 *      while the skin is active — and as the ORIGINAL art otherwise. The
 *      default dawn theme keeps its exact original drawings.
 *   3. patch window.pictureFor (pictures.js) so the most-visible tier of
 *      lesson/pack/band/avatar icons render as folk-modernist redraws while
 *      the skin is active (see the "Lesson-picture restyle" section below
 *      for the exact coverage list and the honest remainder).
 *   4. swap the static welcome-heroine SVG in index.html for a folk-print
 *      redraw while the skin is active (see kanoonHeroine() below).
 *   5. inject a small theme picker into the main app's footer (index.html
 *      only) and live-swap any mascot/heroine SVG + re-render any
 *      pictureFor()-drawn tile already on screen when toggled.
 *
 * SECULAR AUDIT of every drawing in this file (charter §5 hard rule):
 *  - kanoonBird: perched side-profile bird of flat color blocks. No spread
 *    wings flanking a disc (no winged-disc read), no star or moon anywhere
 *    near it, body is a full ellipse (no crescent silhouette).
 *  - kanoonBloom: SIX fat ROUNDED petals + center dot — reads botanical,
 *    deliberately not a 5/8-point geometric star (avoids star-and-crescent
 *    and Rub-el-Hizb misreads that a pointed star could invite).
 *  - kanoonSun: full disc + straight ray ticks. No face (avoids the
 *    Khorshid-Khanum / lion-and-sun heraldic territory), never paired with
 *    any crescent.
 *  - kanoonGarden: pomegranate bush / OCHRE tulip / cream blossom. The
 *    tulip is deliberately NOT red (a red tulip is a politicized martyrdom
 *    symbol in post-1979 Iranian state iconography — ochre keeps it a
 *    flower). No flag tricolor banding anywhere.
 *  - kanoonHeroine: short tousled hair stops at the temple, above the ear/
 *    jaw line — never a headscarf/veil silhouette (see its own doc comment).
 *  - KANOON_PICTURES (the redrawn lesson icons): audited as a set in the
 *    "Lesson-picture restyle" section below (crescent+star, Hamsa, cross).
 */
'use strict';

(function () {
  var KEY = 'sahar.theme';
  var THEMES = ['dawn', 'kanoon-light', 'kanoon-dark'];

  /* i18n for the picker chips only (self-contained: the skin layer never
   * touches app.js's STRINGS). Labels are child-warm and deliberately do
   * NOT use the Kanoon name in the UI — no implied affiliation. */
  var PICKER_STRINGS = {
    fa: { label: 'نما:', dawn: 'سپیده‌دم', light: 'کتابِ قصه', dark: 'قصهٔ شب', aria: 'انتخاب نما' },
    en: { label: 'Look:', dawn: 'Dawn', light: 'Storybook', dark: 'Storybook night', aria: 'Choose a look' },
    de: { label: 'Ansicht:', dawn: 'Morgenrot', light: 'Bilderbuch', dark: 'Bilderbuch Nacht', aria: 'Ansicht wählen' }
  };
  var META_THEME_COLOR = { dawn: '#f4a259', 'kanoon-light': '#f3e9d2', 'kanoon-dark': '#262138' };

  function stored() {
    try {
      var t = localStorage.getItem(KEY);
      return THEMES.indexOf(t) !== -1 ? t : 'dawn';
    } catch (_) { return 'dawn'; }
  }

  function apply(theme) {
    var html = document.documentElement;
    if (theme === 'kanoon-light' || theme === 'kanoon-dark') {
      html.setAttribute('data-theme', 'kanoon');
      html.setAttribute('data-kvariant', theme === 'kanoon-dark' ? 'dark' : 'light');
    } else {
      html.removeAttribute('data-theme');
      html.removeAttribute('data-kvariant');
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', META_THEME_COLOR[theme] || META_THEME_COLOR.dawn);
  }

  function isKanoon() {
    return document.documentElement.getAttribute('data-theme') === 'kanoon';
  }

  /* =======================================================================
   * The folk-redrawn art. Same signatures + same root class names as
   * mascot.js so every existing CSS animation/size rule applies unchanged.
   * Flat color blocks, ONE outline weight (1.8), tokens only (adapt to the
   * light/dark variant automatically).
   * ======================================================================= */

  /** The dawn-bird, redrawn as a perched folk bird: distinct flat blocks
   *  (teal head, ochre body, madder wing, fan tail of three feathers), a
   *  single confident line, standing on two legs — dignified, not cute. */
  function kanoonBird(size, extraClass) {
    var s = size || 34;
    var cls = extraClass ? ('dawnbird ' + extraClass) : 'dawnbird';
    return '<svg class="' + cls + '" width="' + s + '" height="' + s + '" viewBox="0 0 40 40" aria-hidden="true">' +
      // tail: a fan of three flat feathers (teal / madder / saffron)
      '<path d="M27 21 Q33 11 36.5 13.5 Q35 20 28 23 Z" fill="var(--k-teal, var(--dusk))" stroke="var(--k-outline, var(--ink))" stroke-width="1.8" stroke-linejoin="round"/>' +
      '<path d="M27.5 23 Q36 18.5 38 22 Q35.5 26.5 28.5 26 Z" fill="var(--k-terra, var(--rose))" stroke="var(--k-outline, var(--ink))" stroke-width="1.8" stroke-linejoin="round"/>' +
      '<path d="M28 25.5 Q36 26 36.5 29.5 Q33 31.5 27.5 28 Z" fill="var(--k-saffron, var(--gold))" stroke="var(--k-outline, var(--ink))" stroke-width="1.8" stroke-linejoin="round"/>' +
      // legs: two confident ink lines with feet ticks
      '<path d="M17 30.5 L16.2 36 M14 36 L18.4 36" stroke="var(--k-outline, var(--ink))" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
      '<path d="M22.5 30.5 L23.3 36 M21.1 36 L25.5 36" stroke="var(--k-outline, var(--ink))" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
      // body: one flat ochre block
      '<ellipse cx="19.5" cy="24" rx="9.5" ry="7.6" fill="var(--k-ochre, var(--amber))" stroke="var(--k-outline, var(--ink))" stroke-width="1.8"/>' +
      // wing: a flat madder leaf-block laid on the body
      '<path d="M14.5 22 Q20 18.8 25.5 22.2 Q21.5 27.6 14.5 25.4 Z" fill="var(--k-terra, var(--rose))" stroke="var(--k-outline, var(--ink))" stroke-width="1.8" stroke-linejoin="round"/>' +
      // head: a flat teal block with a small madder crest feather
      '<path d="M12.5 10.2 Q13.6 6.4 16.6 6.6 Q16 9.8 13.8 11 Z" fill="var(--k-terra, var(--rose))" stroke="var(--k-outline, var(--ink))" stroke-width="1.8" stroke-linejoin="round"/>' +
      '<circle cx="11.8" cy="15.6" r="5.7" fill="var(--k-teal, var(--dusk))" stroke="var(--k-outline, var(--ink))" stroke-width="1.8"/>' +
      // beak: flat saffron triangle
      '<path d="M6.2 14.4 L1.8 16 L6.2 17.7 Z" fill="var(--k-saffron, var(--gold))" stroke="var(--k-outline, var(--ink))" stroke-width="1.5" stroke-linejoin="round"/>' +
      // eye: cream ring + ink dot (awake, thoughtful — not Disney)
      '<circle cx="10.4" cy="14.9" r="1.9" fill="var(--k-paper-chip, var(--cream))"/>' +
      '<circle cx="10.4" cy="14.9" r="0.95" fill="var(--k-outline, var(--ink))"/>' +
      '</svg>';
  }

  /** Celebration glyph: a six-petal folk blossom (rounded petals — reads as
   *  a flower, deliberately not a pointed star). */
  function kanoonBloom(size, extraClass) {
    var s = size || 20;
    var cls = extraClass ? ('mascot-star ' + extraClass) : 'mascot-star';
    var petals = '';
    for (var i = 0; i < 6; i++) {
      petals += '<ellipse cx="20" cy="11" rx="4.6" ry="7.4" transform="rotate(' + (i * 60) + ' 20 20)"/>';
    }
    return '<svg class="' + cls + '" width="' + s + '" height="' + s + '" viewBox="0 0 40 40" aria-hidden="true">' +
      '<g fill="var(--k-terra, var(--rose))" stroke="var(--k-outline, var(--ink))" stroke-width="1.6">' + petals + '</g>' +
      '<circle cx="20" cy="20" r="4.6" fill="var(--k-saffron, var(--gold))" stroke="var(--k-outline, var(--ink))" stroke-width="1.6"/>' +
      '</svg>';
  }

  /** Progress-goal sun: a full flat disc with straight ray ticks. No face,
   *  no crescent anywhere near it. */
  function kanoonSun(size, extraClass) {
    var s = size || 28;
    var cls = extraClass ? ('mascot-sunrise ' + extraClass) : 'mascot-sunrise';
    var rays = '';
    for (var i = 0; i < 8; i++) {
      var a = (Math.PI * 2 * i) / 8 - Math.PI / 2;
      var x1 = 20 + Math.cos(a) * 12.5, y1 = 20 + Math.sin(a) * 12.5;
      var x2 = 20 + Math.cos(a) * 17, y2 = 20 + Math.sin(a) * 17;
      rays += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '"/>';
    }
    return '<svg class="' + cls + '" width="' + s + '" height="' + s + '" viewBox="0 0 40 40" aria-hidden="true">' +
      '<g stroke="var(--k-ochre, var(--amber))" stroke-width="2.4" stroke-linecap="round">' + rays + '</g>' +
      '<circle cx="20" cy="20" r="9.5" fill="var(--k-saffron, var(--gold))" stroke="var(--k-outline, var(--ink))" stroke-width="1.8"/>' +
      '</svg>';
  }

  /** One plant slot in the folk garden. Species: 0 = pomegranate bush,
   *  1 = ochre tulip, 2 = cream blossom. Unbloomed = quiet teal bud. */
  function kanoonPlant(cx, groundY, species, bloomed) {
    var line = 'stroke="var(--k-outline, var(--ink))" stroke-width="1.8"';
    if (!bloomed) {
      return '<g opacity=".45">' +
        '<line x1="' + cx + '" y1="' + groundY + '" x2="' + cx + '" y2="' + (groundY - 9) + '" stroke="var(--k-good-fill, var(--good))" stroke-width="2.2" stroke-linecap="round"/>' +
        '<circle cx="' + cx + '" cy="' + (groundY - 12) + '" r="3" fill="var(--k-teal, var(--dusk))"/>' +
        '</g>';
    }
    if (species === 1) { // tulip — ochre on purpose (see secular audit above)
      return '<g>' +
        '<line x1="' + cx + '" y1="' + groundY + '" x2="' + cx + '" y2="' + (groundY - 20) + '" stroke="var(--k-good-fill, var(--good))" stroke-width="2.6" stroke-linecap="round"/>' +
        '<path d="M' + (cx - 7.5) + ' ' + (groundY - 32) + ' Q' + cx + ' ' + (groundY - 26) + ' ' + (cx + 7.5) + ' ' + (groundY - 32) + ' L' + (cx + 6) + ' ' + (groundY - 20) + ' Q' + cx + ' ' + (groundY - 17) + ' ' + (cx - 6) + ' ' + (groundY - 20) + ' Z" fill="var(--k-ochre, var(--amber))" ' + line + ' stroke-linejoin="round"/>' +
        '</g>';
    }
    if (species === 2) { // blossom — five cream dots + saffron heart
      var d = '';
      for (var i = 0; i < 5; i++) {
        var a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
        d += '<circle cx="' + (cx + Math.cos(a) * 6.4).toFixed(1) + '" cy="' + (groundY - 24 + Math.sin(a) * 6.4).toFixed(1) + '" r="3.7" fill="var(--k-paper-chip, var(--cream))" ' + line + '/>';
      }
      return '<g>' +
        '<line x1="' + cx + '" y1="' + groundY + '" x2="' + cx + '" y2="' + (groundY - 16) + '" stroke="var(--k-good-fill, var(--good))" stroke-width="2.6" stroke-linecap="round"/>' +
        d +
        '<circle cx="' + cx + '" cy="' + (groundY - 24) + '" r="3.4" fill="var(--k-saffron, var(--gold))" ' + line + '/>' +
        '</g>';
    }
    // species 0: pomegranate bush — teal mound + terracotta fruit + tiny calyx
    return '<g>' +
      '<line x1="' + cx + '" y1="' + groundY + '" x2="' + cx + '" y2="' + (groundY - 14) + '" stroke="var(--k-good-fill, var(--good))" stroke-width="2.6" stroke-linecap="round"/>' +
      '<circle cx="' + cx + '" cy="' + (groundY - 21) + '" r="8.6" fill="var(--k-good-fill, var(--good))" ' + line + '/>' +
      '<circle cx="' + cx + '" cy="' + (groundY - 24) + '" r="4.6" fill="var(--k-terra, var(--rose))" ' + line + '/>' +
      '<path d="M' + (cx - 1.8) + ' ' + (groundY - 28.2) + ' L' + cx + ' ' + (groundY - 30.6) + ' L' + (cx + 1.8) + ' ' + (groundY - 28.2) + '" fill="none" stroke="var(--k-outline, var(--ink))" stroke-width="1.4" stroke-linecap="round"/>' +
      '</g>';
  }

  /** The garden, reprinted as a folk book plate: cream sky, flat sun disc,
   *  deep-teal ground with a scallop meadow line, folk plants. Same
   *  class/viewBox contract as mascot.js's garden() (RTL mirroring stays
   *  pure CSS: [dir="rtl"] .garden-scene { scaleX(-1) }). */
  function kanoonGarden(completed, total, extraClass) {
    var n = Math.max(1, total || 1);
    var done = Math.max(0, Math.min(completed || 0, n));
    var w = 320, h = 108, groundY = 80;
    var slotW = (w - 32) / n;
    var plants = '';
    for (var i = 0; i < n; i++) {
      var cx = 16 + slotW * (i + 0.5);
      plants += kanoonPlant(cx, groundY, i % 3, i < done);
    }
    var bird = (done >= n)
      ? '<g transform="translate(' + (w - 46) + ',' + (groundY - 38) + ')">' + kanoonBird(34) + '</g>'
      : '';
    // scallop meadow line along the ground's top edge
    var scallop = 'M0 ' + groundY;
    for (var x = 0; x < w; x += 20) scallop += ' Q' + (x + 10) + ' ' + (groundY - 6) + ' ' + (x + 20) + ' ' + groundY;
    var cls = extraClass ? ('garden-scene ' + extraClass) : 'garden-scene';
    return '<svg class="' + cls + '" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-hidden="true">' +
      '<defs><clipPath id="kanoon-garden-clip"><rect x="0" y="0" width="' + w + '" height="' + h + '" rx="14"/></clipPath></defs>' +
      '<rect x="0" y="0" width="' + w + '" height="' + h + '" rx="14" fill="var(--k-garden-sky, var(--night-2))"/>' +
      '<g clip-path="url(#kanoon-garden-clip)">' +
      '<circle cx="34" cy="24" r="10" fill="var(--k-saffron, var(--gold))" stroke="var(--k-outline, var(--ink))" stroke-width="1.8"/>' +
      '<rect x="0" y="' + groundY + '" width="' + w + '" height="' + (h - groundY) + '" fill="var(--k-garden-ground, var(--dusk))"/>' +
      '<path d="' + scallop + ' Z" fill="var(--k-garden-ground, var(--dusk))"/>' +
      plants + bird +
      '</g>' +
      '<rect x="1" y="1" width="' + (w - 2) + '" height="' + (h - 2) + '" rx="13" fill="none" stroke="var(--k-outline, var(--ink))" stroke-width="2" opacity=".55"/>' +
      '</svg>';
  }

  /* =======================================================================
   * Lesson-picture restyle (pictures.js) — folk-modernist redraws of the
   * MOST-VISIBLE tier of the ~38-key picture library: every shelf/pack icon
   * (app.js PACKS), every age-band icon (profiles.js BAND_META), every
   * avatar icon (profiles.js AVATARS), and every in-lesson picture-choice
   * key used 2+ times across shipped content/*.json today. 28 of ~38 keys.
   * HONEST REMAINDER (kept as the original dawn-theme art, each used 0-1
   * times in shipped content, no shelf/band/avatar role today): house,
   * robot, triangle, swatch-red, swatch-blue, toothbrush, sad-face,
   * happy-face, quiet-icon, muddy-water. Revisit if/when content grows.
   *
   * Style: one flat "book-plate" background rect per icon + flat color-
   * block glyphs + a single ~2px ink outline where the shape is something a
   * child taps/reads (charter §2/§4). Every fill/stroke is an explicit
   * var(--k-x, var(--core-y)) or var(--k-x, #hex) pair — NEVER a bare
   * var() — an undefined custom property renders BLACK, not transparent,
   * which is exactly the bug this convention exists to prevent.
   *
   * SECULAR AUDIT: 'star' is a plain 5-point star (a counting/night-sky
   * motif — common in secular Persian textile/folk art) and is never drawn
   * near a crescent anywhere in the app. 'moon' is a lone crescent, never
   * paired with a star in the same glyph or the same screen slot (this is
   * the same crescent+star check that caught the old 'dawn' glyph twice
   * today — see main's d10859a). 'cross-mark' is a diagonal X ("wrong
   * answer"), not an upright Latin cross. 'hand' is drawn deliberately
   * ASYMMETRIC (four fingers + one offset thumb, different lengths) so it
   * reads as an ordinary hand, never the symmetric Hamsa/Khamsa amulet
   * silhouette. No 8-point geometric stars, no sun-face, no flag tricolor.
   * ======================================================================= */
  var KI = {
    card:   'var(--k-card, var(--cream))',
    deep:   'var(--k-teal-deep, var(--night-2))',
    teal:   'var(--k-teal, var(--dusk))',
    terra:  'var(--k-terra, var(--rose))',
    saffron:'var(--k-saffron, var(--gold))',
    ochre:  'var(--k-ochre, var(--amber))',
    good:   'var(--k-good-fill, var(--good))',
    out:    'var(--k-outline, var(--ink))',
    chip:   'var(--k-paper-chip, var(--cream))'
  };

  /** Wrap a glyph in the shared plate + viewBox contract every pictures.js
   *  entry uses, so pictureFor() drop-in replacement needs no other change
   *  anywhere it's called (tile sizing, alt text, aria are all unaffected). */
  function kPlate(bg, glyph) {
    return '<svg viewBox="0 0 100 100" role="img" aria-hidden="true">' +
      '<rect width="100" height="100" rx="14" fill="' + bg + '"/>' + glyph + '</svg>';
  }

  var KANOON_PICTURES = {
    // fa/fa-AF is the first-class language and this is the "first letters"
    // pack: draw the alphabet's first two Dari letters (الف / ب) in the house
    // face — NOT a Latin serif foreign to the whole type system (was Georgia/
    // Times "A b"; design-critic fix). Single-glyph <text>es, so no RTL join.
    letters: kPlate(KI.card,
      '<text x="34" y="72" text-anchor="middle" font-size="54" font-weight="800" fill="' + KI.terra + '" font-family="Vazirmatn, \'Segoe UI\', sans-serif">آ</text>' +
      '<text x="70" y="66" text-anchor="middle" font-size="34" font-weight="800" fill="' + KI.teal + '" font-family="Vazirmatn, \'Segoe UI\', sans-serif">ب</text>'),

    book: kPlate(KI.deep,
      '<path d="M50 30 C40 24 24 22 14 26 V70 C24 66 40 68 50 74 C60 68 76 66 86 70 V26 C76 22 60 24 50 30Z" fill="' + KI.chip + '" stroke="' + KI.out + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M50 30 V74" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<path d="M22 36 H40 M22 44 H40 M60 36 H78 M60 44 H78" stroke="' + KI.teal + '" stroke-width="2.4" stroke-linecap="round"/>'),

    star: kPlate(KI.deep,
      '<path d="M50 16 L60 40 L86 42 L66 59 L73 85 L50 71 L27 85 L34 59 L14 42 L40 40Z" fill="' + KI.saffron + '" stroke="' + KI.out + '" stroke-width="2" stroke-linejoin="round"/>'),

    'shapes-trio': kPlate(KI.card,
      '<circle cx="30" cy="68" r="15" fill="' + KI.teal + '" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<rect x="54" y="52" width="26" height="26" rx="4" fill="' + KI.terra + '" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<path d="M50 18 L65 44 L35 44Z" fill="' + KI.saffron + '" stroke="' + KI.out + '" stroke-width="2" stroke-linejoin="round"/>'),

    leaf: kPlate(KI.card,
      '<path d="M50 16 C74 28 78 58 50 84 C22 58 26 28 50 16Z" fill="' + KI.good + '" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<path d="M50 24 L50 76" stroke="' + KI.out + '" stroke-width="1.8"/>'),

    dawn: kPlate(KI.card, // two-tone disc, no crescent anywhere (secular audit above)
      '<path d="M50 12 a38 38 0 0 1 0 76Z" fill="' + KI.teal + '"/>' +
      '<path d="M50 12 a38 38 0 0 0 0 76Z" fill="' + KI.ochre + '"/>' +
      '<circle cx="50" cy="50" r="14" fill="' + KI.saffron + '" stroke="' + KI.out + '" stroke-width="2"/>'),

    'question-mark': kPlate(KI.deep,
      '<path d="M24 34 Q32 44 46 39 Q66 32 72 44 Q76 55 60 60 L58 68" stroke="' + KI.saffron + '" stroke-width="8" fill="none" stroke-linecap="round"/>' +
      '<circle cx="56" cy="80" r="5.5" fill="' + KI.saffron + '"/>'),

    'guess-cloud': kPlate(KI.card,
      '<path d="M30 60 a16 16 0 1 1 4 -31 a20 20 0 0 1 38 6 a15 15 0 0 1 -4 30 Z" fill="' + KI.ochre + '" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<text x="50" y="58" text-anchor="middle" font-size="26" font-weight="800" fill="' + KI.out + '">?</text>'),

    soap: kPlate(KI.card,
      '<rect x="22" y="38" width="56" height="30" rx="14" fill="' + KI.chip + '" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<circle cx="72" cy="28" r="6" fill="' + KI.saffron + '"/><circle cx="82" cy="42" r="4" fill="' + KI.saffron + '"/><circle cx="64" cy="22" r="4" fill="' + KI.saffron + '"/>' +
      '<path d="M32 50 q6 -4 12 0" stroke="' + KI.teal + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>'),

    statement: kPlate(KI.card,
      '<rect x="16" y="24" width="66" height="42" rx="12" fill="' + KI.chip + '" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<path d="M28 80 L28 62 L44 62Z" fill="' + KI.chip + '" stroke="' + KI.out + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<rect x="30" y="38" width="42" height="5.5" rx="2.5" fill="' + KI.teal + '"/><rect x="30" y="50" width="26" height="5.5" rx="2.5" fill="' + KI.terra + '"/>'),

    garden: kPlate(KI.deep,
      '<rect x="0" y="70" width="100" height="30" fill="' + KI.teal + '"/>' +
      '<circle cx="34" cy="56" r="15" fill="' + KI.good + '" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<circle cx="34" cy="52" r="7" fill="' + KI.terra + '" stroke="' + KI.out + '" stroke-width="1.6"/>' +
      '<rect x="31" y="70" width="6" height="14" fill="' + KI.ochre + '"/>' +
      '<circle cx="70" cy="48" r="8" fill="' + KI.saffron + '" stroke="' + KI.out + '" stroke-width="1.8"/>' +
      '<circle cx="80" cy="56" r="7" fill="' + KI.chip + '" stroke="' + KI.out + '" stroke-width="1.8"/><rect x="73" y="58" width="5" height="18" fill="' + KI.good + '"/>'),

    sun: kPlate(KI.deep,
      '<g stroke="' + KI.ochre + '" stroke-width="4" stroke-linecap="round">' +
      '<path d="M69 50 L77 50 M63 63 L69 69 M50 69 L50 77 M37 63 L31 69 M31 50 L23 50 M37 37 L31 31 M50 31 L50 23 M63 37 L69 31"/></g>' +
      '<circle cx="50" cy="50" r="22" fill="' + KI.saffron + '" stroke="' + KI.out + '" stroke-width="2.2"/>'),

    tree: kPlate(KI.card, // stylized cypress — a secular, universally Persian folk motif
      '<rect x="46" y="70" width="8" height="16" fill="' + KI.ochre + '"/>' +
      '<path d="M50 14 L68 46 H32 Z" fill="' + KI.teal + '" stroke="' + KI.out + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M50 34 L64 62 H36 Z" fill="' + KI.teal + '" stroke="' + KI.out + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M50 50 L60 74 H40 Z" fill="' + KI.teal + '" stroke="' + KI.out + '" stroke-width="2" stroke-linejoin="round"/>'),

    fish: kPlate(KI.deep,
      '<path d="M70 50 L90 34 V66Z" fill="' + KI.ochre + '" stroke="' + KI.out + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<ellipse cx="44" cy="50" rx="32" ry="20" fill="' + KI.saffron + '" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<circle cx="28" cy="45" r="3.4" fill="' + KI.out + '"/>' +
      '<path d="M44 32 q8 8 0 36" stroke="' + KI.terra + '" stroke-width="2.6" fill="none"/>' +
      '<path d="M20 58 q6 5 13 0" stroke="' + KI.out + '" stroke-width="2" fill="none" stroke-linecap="round"/>'),

    cat: kPlate(KI.card,
      '<path d="M28 32 L36 16 L44 32Z" fill="' + KI.terra + '" stroke="' + KI.out + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M72 32 L64 16 L56 32Z" fill="' + KI.terra + '" stroke="' + KI.out + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<circle cx="50" cy="54" r="27" fill="' + KI.ochre + '" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<circle cx="40" cy="50" r="3" fill="' + KI.out + '"/><circle cx="60" cy="50" r="3" fill="' + KI.out + '"/>' +
      '<path d="M50 58 l-3.5 4 h7Z" fill="' + KI.teal + '"/>' +
      '<path d="M50 62 q-7 6 -13 3 M50 62 q7 6 13 3" stroke="' + KI.out + '" stroke-width="2" fill="none" stroke-linecap="round"/>'),

    moon: kPlate(KI.deep, // lone crescent — never paired with a star (secular audit above)
      '<path d="M64 18 a34 34 0 1 0 0 64 a26 26 0 1 1 0 -64Z" fill="' + KI.saffron + '" stroke="' + KI.out + '" stroke-width="2"/>'),

    'check-mark': kPlate(KI.card,
      '<circle cx="50" cy="50" r="34" fill="' + KI.good + '" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<path d="M34 52 L46 64 L68 38" stroke="' + KI.out + '" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'),

    stone: kPlate(KI.card,
      '<path d="M20 66 q-4 -22 22 -26 q20 -10 38 2 q22 6 18 26 q2 14 -20 16 h-40 q-20 -2 -18 -18Z" fill="' + KI.chip + '" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<path d="M32 58 q10 -6 20 -2" stroke="' + KI.ochre + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>'),

    'cross-mark': kPlate(KI.card, // a diagonal X ("wrong answer") — never an upright cross
      '<circle cx="50" cy="50" r="34" fill="' + KI.terra + '" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<path d="M38 38 L62 62 M62 38 L38 62" stroke="' + KI.chip + '" stroke-width="7" fill="none" stroke-linecap="round"/>'),

    water: kPlate(KI.deep,
      '<path d="M50 20 C64 44 72 56 72 66 a22 22 0 1 1 -44 0 C28 56 36 44 50 20Z" fill="' + KI.teal + '" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<path d="M42 60 a8 8 0 0 0 8 8" stroke="' + KI.chip + '" stroke-width="3" fill="none" stroke-linecap="round"/>'),

    'thought-bubble': kPlate(KI.card,
      '<ellipse cx="52" cy="42" rx="30" ry="22" fill="' + KI.saffron + '" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<circle cx="30" cy="70" r="7" fill="' + KI.saffron + '" stroke="' + KI.out + '" stroke-width="1.6"/>' +
      '<circle cx="20" cy="82" r="4" fill="' + KI.saffron + '" stroke="' + KI.out + '" stroke-width="1.4"/>' +
      '<circle cx="44" cy="38" r="4" fill="' + KI.out + '"/><circle cx="58" cy="38" r="4" fill="' + KI.out + '"/><circle cx="72" cy="38" r="4" fill="' + KI.out + '"/>'),

    circle: kPlate(KI.card, '<circle cx="50" cy="50" r="34" fill="' + KI.teal + '" stroke="' + KI.out + '" stroke-width="2"/>'),

    square: kPlate(KI.card, '<rect x="18" y="18" width="64" height="64" rx="8" fill="' + KI.terra + '" stroke="' + KI.out + '" stroke-width="2"/>'),

    sky: kPlate(KI.teal,
      '<ellipse cx="42" cy="54" rx="22" ry="14" fill="' + KI.chip + '" stroke="' + KI.out + '" stroke-width="1.8"/>' +
      '<ellipse cx="64" cy="48" rx="16" ry="11" fill="' + KI.chip + '" stroke="' + KI.out + '" stroke-width="1.8"/>' +
      '<circle cx="76" cy="26" r="10" fill="' + KI.saffron + '" stroke="' + KI.out + '" stroke-width="2"/>'),

    hand: kPlate(KI.card, // deliberately ASYMMETRIC — reads as a hand, not Hamsa (secular audit above)
      '<g fill="' + KI.ochre + '" stroke="' + KI.out + '" stroke-width="2" stroke-linejoin="round">' +
      '<rect x="34" y="20" width="9" height="34" rx="4.5"/><rect x="46" y="13" width="9" height="41" rx="4.5"/>' +
      '<rect x="58" y="18" width="9" height="36" rx="4.5"/><rect x="70" y="27" width="9" height="29" rx="4.5"/>' +
      '<path d="M28 46 q-8 4 -6 15 l10 21 q4 8 14 8 h19 q12 0 12 -14 V46 Z"/></g>'),

    bed: kPlate(KI.deep,
      '<rect x="16" y="52" width="68" height="26" rx="6" fill="' + KI.chip + '" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<rect x="16" y="46" width="20" height="14" rx="6" fill="' + KI.saffron + '" stroke="' + KI.out + '" stroke-width="1.8"/>' +
      '<rect x="12" y="78" width="8" height="10" rx="2" fill="' + KI.ochre + '"/><rect x="80" y="78" width="8" height="10" rx="2" fill="' + KI.ochre + '"/>' +
      '<text x="68" y="34" font-size="15" fill="' + KI.saffron + '" font-weight="800">z</text><text x="78" y="24" font-size="11" fill="' + KI.saffron + '" font-weight="800">z</text>'),

    ball: kPlate(KI.card,
      '<circle cx="50" cy="50" r="34" fill="' + KI.ochre + '" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<path d="M50 16 v68 M16 50 h68" stroke="' + KI.out + '" stroke-width="2.4"/>'),

    // reuses the mascot bird's own color language for a consistent character
    bird: kPlate(KI.deep,
      '<ellipse cx="52" cy="60" rx="24" ry="19" fill="' + KI.ochre + '" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<path d="M36 55 Q50 47 64 56 Q54 69 36 63Z" fill="' + KI.terra + '" stroke="' + KI.out + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<circle cx="35" cy="45" r="15" fill="' + KI.teal + '" stroke="' + KI.out + '" stroke-width="2"/>' +
      '<path d="M16 45 L6 42 L16 49Z" fill="' + KI.saffron + '" stroke="' + KI.out + '" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<circle cx="32" cy="43" r="2.6" fill="' + KI.chip + '"/><circle cx="32" cy="43" r="1.3" fill="' + KI.out + '"/>' +
      '<path d="M64 62 q18 -8 26 -2 q-11 12 -26 8Z" fill="' + KI.teal + '" stroke="' + KI.out + '" stroke-width="2" stroke-linejoin="round"/>')
  };

  /** Delegate pictureFor(): kanoon art only while the skin is active and only
   *  for keys we've redrawn; every other key keeps falling through to the
   *  original pictures.js art (both themes stay fully covered). */
  function patchPictures() {
    if (typeof window.pictureFor !== 'function' || window.__kanoonPicPatched) return;
    var orig = window.pictureFor;
    window.pictureFor = function (key) {
      return (isKanoon() && KANOON_PICTURES[key]) ? KANOON_PICTURES[key] : orig(key);
    };
    window.__kanoonPicPatched = true;
  }

  /* =======================================================================
   * EMOJI → INK GLYPH SWAP (design-critic fix): app.js prints three raw OS
   * emoji directly into markup — 🔊 in every "listen" pill's `.lico` span
   * (renderComingSoonBand / renderInteractiveCard), 👪 prefixing the
   * `.cg-toggle` "For grown-ups" button, and 📄 prefixing index.html's
   * static "for teachers" link. Unlike the mascot/picture art above, these
   * are literal characters baked into template-string HTML, not calls
   * through a function this file can delegate — so instead this walks the
   * live DOM and swaps them for flat ink SVGs (kanoon.css §14 sizes them).
   * A MutationObserver re-runs the swap every time app.js redraws a card,
   * so pills rendered well after page load (every "next card") get the
   * same treatment. Fully reversible: leaving the skin restores the exact
   * original text, so nothing here can go stale if a toggle happens
   * mid-lesson. Total no-op anywhere the skin never touched (e.g. no
   * `.lico` on the page): querySelectorAll simply finds nothing.
   * ======================================================================= */
  var SPEAKER_EMOJI = '🔊'; // 🔊
  var FAMILY_EMOJI  = '👪'; // 👪
  var DOC_EMOJI     = '📄'; // 📄

  /** Adapted from mascot.js's own speaker() silhouette (same path data),
   *  redrawn flat + ink-outlined to match the folk book-plate language
   *  every other glyph in this file uses. */
  function kanoonSpeakerGlyph(size) {
    var s = size || 20;
    return '<svg class="k-ico k-ico-speaker" width="' + s + '" height="' + s + '" viewBox="0 0 40 40" aria-hidden="true">' +
      '<path d="M6 15 H12 L21 7 V33 L12 25 H6Z" fill="' + KI.saffron + '" stroke="' + KI.out + '" stroke-width="1.8" stroke-linejoin="round"/>' +
      '<path d="M26 14 a10.5 10.5 0 0 1 0 12" stroke="' + KI.out + '" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
      '<path d="M30.5 9 a17 17 0 0 1 0 22" stroke="' + KI.out + '" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".6"/>' +
      '</svg>';
  }

  /** A simple folk family glyph: three flat figures (two grown-ups flanking
   *  a smaller child), same one-line ink-outline treatment as every other
   *  redraw here. Secular by construction — plain rounded head+body blocks,
   *  no symbol, no religious or national iconography. */
  function kanoonFamilyGlyph(size) {
    var s = size || 18;
    return '<svg class="k-ico k-ico-family" width="' + s + '" height="' + s + '" viewBox="0 0 40 28" aria-hidden="true">' +
      '<circle cx="9" cy="7" r="5" fill="' + KI.teal + '" stroke="' + KI.out + '" stroke-width="1.6"/>' +
      '<path d="M1 27 v-6 a8 8 0 0 1 16 0 v6Z" fill="' + KI.teal + '" stroke="' + KI.out + '" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<circle cx="31" cy="7" r="5" fill="' + KI.terra + '" stroke="' + KI.out + '" stroke-width="1.6"/>' +
      '<path d="M23 27 v-6 a8 8 0 0 1 16 0 v6Z" fill="' + KI.terra + '" stroke="' + KI.out + '" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<circle cx="20" cy="12" r="3.6" fill="' + KI.saffron + '" stroke="' + KI.out + '" stroke-width="1.4"/>' +
      '<path d="M14.5 27 v-4.5 a5.5 5.5 0 0 1 11 0 v4.5Z" fill="' + KI.saffron + '" stroke="' + KI.out + '" stroke-width="1.4" stroke-linejoin="round"/>' +
      '</svg>';
  }

  /** A folded-corner page glyph for the "for teachers" printable-page link —
   *  a flat book-plate rectangle with a saffron folded corner + three ink
   *  rule-lines, reading as "document" without any OS emoji reference. */
  function kanoonDocGlyph(size) {
    var s = size || 18;
    return '<svg class="k-ico k-ico-doc" width="' + s + '" height="' + s + '" viewBox="0 0 28 32" aria-hidden="true">' +
      '<path d="M3 2 H17 L25 10 V30 H3Z" fill="' + KI.chip + '" stroke="' + KI.out + '" stroke-width="1.8" stroke-linejoin="round"/>' +
      '<path d="M17 2 V10 H25Z" fill="' + KI.saffron + '" stroke="' + KI.out + '" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<path d="M8 16 H20 M8 21 H20 M8 26 H15" stroke="' + KI.teal + '" stroke-width="1.8" stroke-linecap="round"/>' +
      '</svg>';
  }

  /** Swap `emoji` for `iconHtml` inside `el` while the skin is active,
   *  remembering the exact original text (in `data-k-orig`) so leaving the
   *  skin restores it byte-identical — same "reversible, never stale"
   *  contract as swapArt()'s heroine/mascot swap above. No-ops on any
   *  element that doesn't contain `emoji` and was never swapped. */
  function swapOrRestoreEmoji(el, emoji, iconHtml) {
    if (isKanoon()) {
      if (el.dataset.kOrig !== undefined) return; // already swapped this node
      var text = el.textContent;
      var idx = text.indexOf(emoji);
      if (idx === -1) return;
      el.dataset.kOrig = text;
      var rest = (text.slice(0, idx) + text.slice(idx + emoji.length)).trim();
      el.innerHTML = iconHtml;
      if (rest) el.appendChild(document.createTextNode(' ' + rest));
    } else if (el.dataset.kOrig !== undefined) {
      el.textContent = el.dataset.kOrig;
      delete el.dataset.kOrig;
    }
  }

  /** Find every live instance of the three emoji spots and swap/restore
   *  them. Cheap (a handful of small querySelectorAll calls) and idempotent
   *  — safe to call as often as needed. */
  function swapEmojiPills() {
    document.querySelectorAll('.lico').forEach(function (el) {
      swapOrRestoreEmoji(el, SPEAKER_EMOJI, kanoonSpeakerGlyph(20));
    });
    // '.cg-toggle' is app.js's caregiver toggle; '#bs-caregiver' is the
    // bootstrap first-contact flow's caregiver button (a <button class=
    // "link-btn">, which the a.link-btn selector below deliberately does NOT
    // match) — both print the raw 👪 (design-critic fix: it was unswapped).
    document.querySelectorAll('.cg-toggle, #bs-caregiver').forEach(function (el) {
      swapOrRestoreEmoji(el, FAMILY_EMOJI, kanoonFamilyGlyph(18));
    });
    document.querySelectorAll('a.link-btn').forEach(function (el) {
      swapOrRestoreEmoji(el, DOC_EMOJI, kanoonDocGlyph(18));
    });
  }

  /* =======================================================================
   * OFF-PALETTE TILE-COLOR REMAP (design-critic fix). Two avatar/band
   * identity colors in profiles.js are literal hexes (not house tokens), so
   * they bypass the token remap: fish/band-10-12 #4db6e6 (bright sky blue)
   * and moon #c9b6ff (lavender). app.js injects them as inline
   * `style="--tile-color:<hex>"` on the profile tiles / band chips / avatar
   * picks — off the charter's warm-earths+teal+indigo palette, on the
   * child's first screen. Map JUST those two literals onto charter tokens
   * while the skin is active (kept distinct from the other four avatar
   * colors: teal + ochre are otherwise unused here). Reversible with zero
   * stored state — leaving the skin triggers app.js's own re-render, which
   * rewrites the original inline hex. Idempotent: once remapped the inline
   * value is a var(), no longer a hex key, so re-running is a no-op. Only
   * touches inline style, never core files.
   * ======================================================================= */
  var TILE_COLOR_REMAP = { '#4db6e6': 'var(--k-teal)', '#c9b6ff': 'var(--k-ochre)' };

  function remapTileColors() {
    if (!isKanoon()) return; // dawn restores originals via app.js's re-render
    document.querySelectorAll('[style*="--tile-color"]').forEach(function (el) {
      var v = (el.style.getPropertyValue('--tile-color') || '').trim().toLowerCase();
      if (TILE_COLOR_REMAP[v]) el.style.setProperty('--tile-color', TILE_COLOR_REMAP[v]);
    });
  }

  /** Run every skin DOM-swap that must survive app.js's own re-renders:
   *  the emoji->ink-glyph pills and the off-palette tile-color remap. */
  function applySkinSwaps() { swapEmojiPills(); remapTileColors(); }

  /** app.js redraws a card's whole `.lico`/`.cg-toggle` markup from scratch
   *  on every "next card" (renderStage() -> renderInteractiveCard() etc.),
   *  and re-renders the band bar / profile gate on band/profile changes, each
   *  time baking the raw emoji and inline hex colors back in — a one-time
   *  swap at load or toggle-time alone would only last until the next redraw.
   *  Observing the document body's subtree (so the profile gate, which lives
   *  OUTSIDE #app, is covered too) re-runs the swaps after every such redraw.
   *  Cheap + idempotent; childList observation ignores our own style writes. */
  function observeEmojiSwap() {
    var root = document.body;
    if (!root || root.__kanoonEmojiObserved) return;
    new MutationObserver(function () { applySkinSwaps(); })
      .observe(root, { childList: true, subtree: true });
    root.__kanoonEmojiObserved = true;
  }

  /* =======================================================================
   * The heroine — a Kanoon-variant of the welcome girl, swapped in the same
   * way as the bird/bloom/sun (the original static markup in index.html is
   * captured once, then either art is re-printed on toggle).
   * ======================================================================= */

  /** Folk-print redraw of the Sahar hero figure. Same class ("sahar") and
   *  viewBox (0 0 96 110) as the original static markup in index.html, so
   *  every existing CSS sizing rule (.hero .sahar { width/height }) applies
   *  unchanged. Flat color blocks, ONE outline weight, warm dress in the
   *  charter palette — every var() below carries an explicit fallback.
   *  SECULAR: hair is a short tousled crop that stops at the temple, well
   *  above the ear/jaw line — never a headscarf/veil silhouette, matching
   *  the same rule the dawn-theme original was fixed to (index.html, commit
   *  d822812) and re-verified here, not re-broken. */
  function kanoonHeroine() {
    var out = 'var(--k-outline, var(--ink))';
    var halo = 'var(--k-halo, var(--gold))';
    var saffron = 'var(--k-saffron, var(--gold))';
    var terra = 'var(--k-terra, var(--rose))';
    var hair = '#3a2a1c';   // warm dark-umber ink — a literal hex, not a var, zero fallback risk
    var skin = '#f2c9a0';   // literal hex, matches the dawn original's convention exactly
    return '<svg class="sahar" viewBox="0 0 96 110" role="img" aria-label="Sahar, a girl at dawn">' +
      // flat print halo: two concentric discs, no gradient def needed
      '<circle cx="48" cy="58" r="44" fill="' + halo + '" opacity=".9"/>' +
      '<circle cx="48" cy="80" r="19" fill="' + saffron + '" opacity=".95"/>' +
      // dress: one flat terracotta block + a saffron hem trim + three dot
      // "beads" at the neckline (a folk-print nod, not a real garment copy)
      '<path d="M28 88 q20 -16 40 0 v20 h-40Z" fill="' + terra + '" stroke="' + out + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M28 100 h40" stroke="' + saffron + '" stroke-width="3" stroke-linecap="round"/>' +
      '<circle cx="36" cy="94" r="1.6" fill="' + saffron + '"/><circle cx="48" cy="96" r="1.6" fill="' + saffron + '"/><circle cx="60" cy="94" r="1.6" fill="' + saffron + '"/>' +
      // face
      '<circle cx="48" cy="50" r="16" fill="' + skin + '" stroke="' + out + '" stroke-width="1.6"/>' +
      // hair: short tousled crop, stays above the ears — secular, no
      // headscarf/veil silhouette, no drape past the jaw (see note above)
      '<path d="M31 43 A17 17 0 0 1 65 43 Z" fill="' + hair + '" stroke="' + out + '" stroke-width="1.8" stroke-linejoin="round"/>' +
      '<path d="M44 27 l4 -9 5 8Z" fill="' + hair + '" stroke="' + out + '" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<path d="M29 40 q-3 4 0 8" stroke="' + hair + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<path d="M67 40 q3 4 0 8" stroke="' + hair + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      // eyes + smile (hopeful, not saccharine)
      '<circle cx="42" cy="49" r="1.8" fill="' + out + '"/><circle cx="54" cy="49" r="1.8" fill="' + out + '"/>' +
      '<path d="M42 56 q6 5 12 0" stroke="' + out + '" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '</svg>';
  }

  var ORIGINAL_HEROINE_MARKUP = null;

  /** Grab the dawn-theme's original static heroine markup ONCE, before any
   *  swap ever runs, so toggling back to 'dawn' restores byte-identical
   *  original art (same contract as the mascot patch above). */
  function captureOriginalHeroine() {
    if (ORIGINAL_HEROINE_MARKUP !== null) return;
    var el = document.querySelector('svg.sahar');
    if (el) ORIGINAL_HEROINE_MARKUP = el.outerHTML;
  }

  /* =======================================================================
   * Mascot patch — delegates per call: kanoon art only while the skin is
   * active, byte-identical original art otherwise.
   * ======================================================================= */
  var lastGardenArgs = null;

  function patchMascot() {
    var M = window.SaharMascot;
    if (!M || M.__kanoonPatched) return;
    var orig = { svg: M.svg, star: M.star, sunrise: M.sunrise, garden: M.garden };
    M.svg = function (s, c) { return isKanoon() ? kanoonBird(s, c) : orig.svg(s, c); };
    M.star = function (s, c) { return isKanoon() ? kanoonBloom(s, c) : orig.star(s, c); };
    M.sunrise = function (s, c) { return isKanoon() ? kanoonSun(s, c) : orig.sunrise(s, c); };
    M.garden = function (done, total, c) {
      lastGardenArgs = [done, total, c];
      return isKanoon() ? kanoonGarden(done, total, c) : orig.garden(done, total, c);
    };
    M.__kanoonPatched = true;
  }

  /** bootstrap.html deliberately doesn't load mascot.js — bootstrap.js draws
   *  its own private bird/star/sunrise as top-level function declarations,
   *  which in a classic script are window globals. Patch those the same
   *  delegating way so the first-contact flow wears the skin too. */
  function patchBootstrapArt() {
    if (window.__kanoonBsPatched) return;
    if (typeof window.birdSVG === 'function') {
      var ob = window.birdSVG;
      window.birdSVG = function (s) { return isKanoon() ? kanoonBird(s) : ob(s); };
    }
    if (typeof window.starSVG === 'function') {
      var os = window.starSVG;
      window.starSVG = function (s) { return isKanoon() ? kanoonBloom(s) : os(s); };
    }
    if (typeof window.sunriseSVG === 'function') {
      var or = window.sunriseSVG;
      window.sunriseSVG = function (s) { return isKanoon() ? kanoonSun(s) : or(s); };
    }
    window.__kanoonBsPatched = true;
  }

  /** Re-print every mascot SVG already on screen after a theme toggle (CSS
   *  tokens swap live on their own; only the drawn shapes need re-render). */
  function swapArt() {
    var M = window.SaharMascot;
    if (!M) return;
    var swap = function (selector, fn) {
      document.querySelectorAll(selector).forEach(function (el) {
        var s = parseFloat(el.getAttribute('width')) || undefined;
        var extra = (el.getAttribute('class') || '')
          .replace(/\b(dawnbird|mascot-star|mascot-sunrise)\b/, '').trim();
        el.outerHTML = fn(s, extra || undefined);
      });
    };
    swap('svg.dawnbird', M.svg);
    swap('svg.mascot-star', M.star);
    swap('svg.mascot-sunrise', M.sunrise);
    var g = document.querySelector('svg.garden-scene');
    if (g && lastGardenArgs) g.outerHTML = M.garden.apply(null, lastGardenArgs);
    // the heroine: same re-print contract, original markup captured once
    var hero = document.querySelector('svg.sahar');
    if (hero && ORIGINAL_HEROINE_MARKUP) {
      hero.outerHTML = isKanoon() ? kanoonHeroine() : ORIGINAL_HEROINE_MARKUP;
    }
  }

  /** Best-effort re-render of anything drawn through window.pictureFor that
   *  may already be on screen (shelf tiles, band chips, avatar tiles) so a
   *  live theme toggle updates them immediately, not just on next render.
   *  Reuses the app's OWN re-render entry points (global function
   *  declarations in app.js are window globals — same reasoning already
   *  documented for patchBootstrapArt() above) instead of duplicating any
   *  view logic here; every one of these is internally guarded to no-op
   *  when its screen/element isn't current, so calling all of them is safe
   *  regardless of which screen is showing. Wrapped defensively: a missing
   *  or throwing global must never break the theme toggle itself. */
  function reprintAppRenders() {
    try {
      if (typeof window.render === 'function') window.render();
      if (typeof window.renderProfileGate === 'function' &&
          document.getElementById('profileGate') && !document.getElementById('profileGate').hidden) {
        window.renderProfileGate();
      }
    } catch (_) { /* static art already handled by swapArt() above */ }
  }

  /* =======================================================================
   * The theme picker (main app footer only) + live language relabeling
   * ======================================================================= */
  function pickerLang() {
    var l = document.documentElement.lang;
    return PICKER_STRINGS[l] ? l : 'en';
  }

  function renderPicker() {
    var host = document.querySelector('.theme-pick');
    if (!host) return;
    var t = PICKER_STRINGS[pickerLang()];
    var current = stored();
    host.setAttribute('aria-label', t.aria);
    host.innerHTML =
      '<span class="theme-pick-label">' + t.label + '</span>' +
      '<button type="button" data-theme-choice="dawn" class="' + (current === 'dawn' ? 'on' : '') + '">' + t.dawn + '</button>' +
      '<button type="button" data-theme-choice="kanoon-light" class="' + (current === 'kanoon-light' ? 'on' : '') + '">' + t.light + '</button>' +
      '<button type="button" data-theme-choice="kanoon-dark" class="' + (current === 'kanoon-dark' ? 'on' : '') + '">' + t.dark + '</button>';
  }

  function injectPicker() {
    if (!document.getElementById('app')) return;   // main app only
    var foot = document.querySelector('.foot');
    if (!foot || foot.querySelector('.theme-pick')) return;
    var host = document.createElement('div');
    host.className = 'theme-pick';
    host.setAttribute('role', 'group');
    foot.appendChild(host);
    renderPicker();
    host.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-theme-choice]');
      if (!b) return;
      var choice = b.getAttribute('data-theme-choice');
      try { localStorage.setItem(KEY, choice); } catch (_) {}
      apply(choice);
      swapArt();
      reprintAppRenders();
      applySkinSwaps();
      renderPicker();
    });
    // relabel the picker when the app's language switch changes html[lang]
    new MutationObserver(renderPicker)
      .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  /* boot: attribute before first paint; patch + picker once the DOM (and
   * mascot.js, loaded at the end of <body>) are ready. This listener is
   * registered before app.js's, so the patch is in place before any render. */
  apply(stored());
  document.addEventListener('DOMContentLoaded', function () {
    patchMascot();
    patchBootstrapArt();
    patchPictures();
    captureOriginalHeroine();
    injectPicker();
    // the hero bird AND the heroine on index.html are STATIC inline SVG in
    // the markup (not generated at boot) — when the skin is already active
    // on page load, re-print anything static once. Dynamic art (mascot +
    // every pictureFor() call app.js/bootstrap.js make from here on) renders
    // through the patched generators automatically, no re-print needed.
    if (isKanoon()) swapArt();
    // emoji glyph swap + off-palette tile-color remap: works on every page
    // (index.html, bootstrap.html, teacher.html), even ones with no
    // SaharMascot/pictureFor at all — an initial pass for whatever's already
    // in the DOM, then keep watching for app.js's own re-renders (see
    // observeEmojiSwap()'s doc comment).
    applySkinSwaps();
    observeEmojiSwap();
  });
})();
