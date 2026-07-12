/* Sahar — themes/kanoon/kanoon.js
 * Loader for the "Storybook" skin (Kanoon-inspired visual identity layer —
 * see themes/kanoon/INSPIRATION.md for the honest homage/credits statement).
 *
 * Loaded in <head> so the theme attribute lands BEFORE first paint (no
 * flash of the wrong theme). Three responsibilities, all additive:
 *   1. apply(): read localStorage 'sahar.theme' and set html[data-theme] /
 *      [data-kvariant] — kanoon.css keys every rule off these attributes.
 *   2. patch SaharMascot (once the body scripts have loaded) so the
 *      dawn-bird / bloom / sun / garden render as folk-redrawn variants
 *      while the skin is active — and as the ORIGINAL art otherwise. The
 *      default dawn theme keeps its exact original drawings.
 *   3. inject a small theme picker into the main app's footer (index.html
 *      only) and live-swap any mascot SVG already on screen when toggled.
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
    injectPicker();
    // the hero bird on index.html is STATIC inline SVG in the markup (not
    // generated at boot) — when the skin is already active on page load,
    // re-print anything static once. Dynamic art renders through the
    // patched generators afterwards.
    if (isKanoon()) swapArt();
  });
})();
