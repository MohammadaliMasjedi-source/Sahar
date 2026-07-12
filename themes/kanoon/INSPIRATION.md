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

Candidates evaluated (all open licences): **Vazirmatn** (OFL-1.1), **Estedad**
(OFL-1.1), **Sahel**, **Shabnam**, **Gandom** (Rastikerdar faces, OFL/SIL).

**Chosen: Vazirmatn** (by Saber Rastikerdar and contributors, SIL Open Font
License 1.1 — the licence text is vendored at `fonts/LICENSE-OFL.txt`).
Reasons, in order:

1. It is **already vendored** in this repo (six subset woff2 files, < 100 KB
   total, precached offline) — choosing it adds **zero bytes** to the
   cheap-phone payload. The other candidates would each add 80–300 KB.
2. Excellent Dari/Farsi legibility with generous counters — the calm,
   slightly geometric warmth the charter asks for.
3. Latin coverage harmonizes for EN/DE without a second family.

**Honest limitation:** the hand-lettered display feel of 1970s Kanoon covers
is *approximated* with Vazirmatn's bold weight, tighter plate-like layout, and
the frieze/rosette ornaments — not with a new display face. Exact historical
Kanoon lettering is proprietary/hand-drawn and is not shipped, per the rails
above. Persian text is never letter-spaced (it would break letterforms).

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

The pre-existing dawn theme's assets (heroine, avatars, glyphs) are unchanged
and were audited separately (see `docs/ARCHITECTURE.md` §10 and the V3
religion/culture audit notes in `index.html`).

## What ships, technically (cheap-phone honesty)

- `themes/kanoon/kanoon.css` (~13 KB) — design tokens (light + warm-dark
  variants), flat-surface overrides, SVG-data-URI frieze/rosette/grain. No
  raster images, no external requests.
- `themes/kanoon/kanoon.js` (~12 KB) — theme loader + folk-redrawn mascot
  variants (bird, bloom, sun, garden) + the footer theme picker. The default
  dawn theme stays the default and renders byte-identical original art.
- Fonts: **zero new font files** (reuses the vendored Vazirmatn subsets).
- Both files are precached by the service worker for offline use.

*Filed as the honest homage/credits page required by the Sahar–Kanoon visual
charter (§6). Inspiration, not reproduction.*
