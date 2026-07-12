# The "Storybook" skin — inspiration, credits, and honest boundaries

**What this is:** a loadable visual-identity layer for Sahar (`themes/kanoon/`),
built in homage to the design culture of **Kānoon-e Parvaresh-e Fekri-ye
Koodakān va Nojavānān** (کانون پرورش فکری کودکان و نوجوانان — the Institute for
the Intellectual Development of Children and Young Adults) in its **pre-1979
era** — arguably the finest children's design culture the Persian-speaking
world has produced. Its books, posters, and films treated children as
intelligent, imaginative people who deserve real art. That posture — *dignity
over cuteness* — is exactly Sahar's own value, and it is the only thing we
take.

## Artists studied (homage, with respect)

- **Farshid Mesghali** — Kanoon's defining graphic voice: bold flat color
  blocks, a confident line, modernism married to folklore. Winner of the Hans
  Christian Andersen Award for Illustration (1974). What we learned from him:
  build figures from distinct flat shapes; never gradient what a silkscreen
  could not print; leave generous air around the art.
- **Ali Akbar Sadeghi** — saturated, symmetrical, folk-tale richness rooted in
  Persian miniature and coffeehouse painting. What we learned: symmetry and
  medallion composition as celebration (our done-screen rosette), warm earths
  against deep teal and indigo.
- **Noureddin Zarrinkelk** — the father of Iranian animation; character
  economy and warmth. What we learned: a mascot can be dignified and friendly
  with a dot for an eye and no eyelashes.
- **Nikzad Nodjoumi and Parviz Kalantari** — texture, earth, storytelling
  restraint. What we learned: paper is a color; grain is warmth, not noise.

Referenced-in-spirit works we studied (not copied): Mesghali's illustrations
for *The Little Black Fish* (Māhi-e Siāh-e Kuchulu, 1968), his Kanoon film
posters of the early 1970s, and Sadeghi's poster/plate compositions of the
same era. A side-by-side self-review against these three anchors is part of
the skin's acceptance gate.

## Inspiration, not reproduction — the hard rails

- **No Kanoon logo, wordmark, or trademark** appears anywhere in this layer.
- **No illustration is copied or traced.** Every SVG in this skin (the folk
  bird, the six-petal bloom, the sun disc, the garden plants, the frieze band,
  the rosette medallion, the paper grain) was drawn from scratch in code for
  this project, in the *language* of that era — flat blocks, one line weight,
  folk geometry — not from any specific work.
- **No proprietary typeface is imitated or embedded.** The historical Kanoon
  lettering was largely hand-drawn and/or proprietary; we do not ship a copy.
- **No affiliation or endorsement is implied.** Kanoon exists today as an
  Iranian state institution; Sahar has no relationship with it, and this skin
  is deliberately named **"Storybook" (کتابِ قصه / Bilderbuch)** in the user
  interface — the Kanoon name appears only here and in the folder name, as an
  honest citation of the inspiration.

## Typography — evaluated and chosen honestly

**Body text: Vazirmatn** (by Saber Rastikerdar and contributors, SIL Open Font
License 1.1 — the licence text is vendored at `fonts/LICENSE-OFL.txt`).
Unchanged from the first build of this skin. Reasons, in order:

1. It is **already vendored** in this repo (six subset woff2 files, < 100 KB
   total, precached offline) — choosing it adds **zero bytes** to the
   cheap-phone payload.
2. Excellent Dari/Farsi legibility with generous counters — the calm,
   slightly geometric warmth the charter asks for.
3. Latin coverage harmonizes for EN/DE without a second family.

**Display face (headings only): Estedad**, heavy (800) weight — added in
this pass after re-evaluating the charter's §3 ask for "a display face for
headings that echoes hand-lettered Kanoon titles" with real, LIVE licence
verification (2026-07-12, against the canonical `google/fonts` GitHub repo,
same method as Vazirmatn above):

| Candidate | Licence (verified live) | Category / weights | Verdict |
|---|---|---|---|
| **Estedad** | OFL-1.1, "Copyright 2022/2026 The Estedad Project Authors" | Sans-serif, variable 100–900 | **Chosen.** A heavy (800) static instance, subset to arabic+latin only, is **~38 KB** (27 KB arabic + 11 KB latin) — confident, modernist-geometric, and the lightest of the three for one bold heading job. |
| **Lalezar** | OFL-1.1, "Copyright 2015 The Lalezar Project Authors" | Sans-serif, single (already-bold) weight | Not chosen: its arabic+latin subset is **~69 KB** (~1.8x Estedad's) for the same job, and its rounder, more novelty/poster letterforms read closer to a party invite than the calm modernist confidence the charter asks for. |
| **Markazi Text** | OFL-1.1, "Copyright 2017 The Markazi Text Project Authors" | **Serif**, variable 400–700 | Not chosen: Google's own category calls it a serif *text* face, not a display face — the wrong job for a bold heading regardless of payload. |

Applied ONLY to actual headings (`.brand h1`, the hero greeting `h2`, the
done-screen celebration `h2`, the profile-gate title, bootstrap's page title)
— never to body copy, buttons, or small labels, which all stay Vazirmatn.
Self-hosted the same way as Vazirmatn (no Google Fonts CDN call at runtime;
the woff2 files were fetched once to vendor them, then committed), precached
by the service worker, licence text at `fonts/LICENSE-OFL-ESTEDAD.txt`.

**Honest limitation:** the hand-lettered display feel of 1970s Kanoon covers
is still *approximated*, now with a heavy geometric sans instead of a true
hand-lettered face — exact historical Kanoon lettering is proprietary/hand-
drawn and is not shipped, per the rails above. Persian text is never letter-
spaced in either face (it would break letterforms) — the display-face CSS
rule deliberately omits `letter-spacing`.

## Secular audit (every asset, per Sahar's hard rule)

Zero religion, zero politics, zero nationalism. Each new drawing was checked
against known misread risks:

| Asset | Risk checked | Resolution |
|---|---|---|
| Folk bird (mascot redraw) | winged-disc (Faravahar) read; crescent silhouette | perched side-profile, full-ellipse body, no disc, no star/moon anywhere near it |
| Six-petal bloom (celebration glyph) | star-and-crescent; Rub-el-Hizb (8-point star) | six fat ROUNDED petals + center dot — botanical, not a pointed star |
| Sun disc (progress goal, garden) | sun-face / lion-and-sun heraldry | plain disc + straight ray ticks, no face, never paired with a crescent |
| Garden tulip | red tulip = post-1979 martyrdom/state symbolism | tulip printed in OCHRE, never red |
| Pomegranate | none (fruit; folk-art staple) | kept, terracotta |
| Frieze band | religious geometric patterning | textile diamond + dot-blossom only |
| Rosette medallion | mandala/religious rose-window read | 12 scalloped petals reading as marigold/sunflower; purely botanical |
| Palette | flag tricolor (green-white-red banding) | no tricolor adjacency; earths + teal on cream |
| Heroine redraw (kanoon.js `kanoonHeroine()`) | headscarf/veil silhouette | short tousled crop stops at the temple, above the ear/jaw line — same rule the dawn original was fixed to (index.html, commit d822812), re-verified not re-broken |
| Lesson-icon redraws (`KANOON_PICTURES`, 28 keys) | crescent+star (caught twice today in the *default* theme's own `pictures.js` 'dawn' glyph, see main's d10859a) | `moon` is a lone crescent, `star` a plain 5-point star, never drawn together in one glyph or one screen slot |
| Lesson-icon `hand` | Hamsa/Khamsa amulet (symmetric stylized-palm) silhouette | drawn deliberately ASYMMETRIC — four fingers of different lengths + one offset thumb, same construction as the pre-existing dawn `hand` glyph |
| Lesson-icon `cross-mark` | Latin/Christian cross | a diagonal X ("wrong answer" mark), never an upright cross |

The dawn theme's own original assets (heroine, avatars, glyphs) are unchanged
and were audited separately (see `docs/ARCHITECTURE.md` §10 and the V3
religion/culture audit notes in `index.html`); the *default* theme's `dawn`
picture glyph was itself re-audited and fixed today for a crescent+star
combo (main's d10859a) — the kanoon-redrawn `dawn` glyph in this file was
built crescent/star-free from the start (see table above).

## What ships, technically (cheap-phone honesty)

- `themes/kanoon/kanoon.css` — design tokens (light + warm-dark variants),
  flat-surface overrides, SVG-data-URI frieze/rosette/grain, the Estedad
  `@font-face` + heading rule. No raster images, no external requests.
- `themes/kanoon/kanoon.js` — theme loader + folk-redrawn mascot variants
  (bird, bloom, sun, garden), the folk-print heroine redraw, the
  `KANOON_PICTURES` lesson-icon restyle (28 of ~38 keys — the most-visible
  tier: every shelf/pack icon, every band icon, every avatar icon, every
  in-lesson icon used 2+ times in shipped content; the honest remainder —
  house, robot, triangle, swatch-red/blue, toothbrush, happy/sad-face,
  quiet-icon, muddy-water — keeps the dawn-theme original art for now, each
  used 0-1 times in shipped content today), and the footer theme picker.
  The default dawn theme stays the default and renders byte-identical
  original art throughout.
- Fonts: Vazirmatn (body, reused, zero added bytes) + **Estedad 800**, new
  in this pass, self-hosted, arabic+latin subset only, ~38 KB total —
  `fonts/estedad-arabic-800-normal.woff2`, `fonts/estedad-latin-800-normal.
  woff2`, licence at `fonts/LICENSE-OFL-ESTEDAD.txt`.
- All of the above are precached by the service worker (`sw.js`, cache
  version bumped) for offline use.

*Filed as the honest homage/credits page required by the Sahar–Kanoon visual
charter (§6). Inspiration, not reproduction.*
