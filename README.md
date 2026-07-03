# Sahar — سحر · "Learn to live, live to learn."

**Sahar is a free, offline-first education app for children denied school** — literacy, numeracy,
science, and critical thinking as small spaced-repetition lessons, in Dari (RTL), English, and German.

> **Status: scaffold + working prototype.** This repo is the *foundation* — an honest, runnable
> offline-first prototype plus the architecture, curriculum, naming, and open-source plan that the
> full app will grow from. It is **not** a finished product, and nothing here pretends to be.
> (House rule: *REAL 90 > FAKE 100*.)

## Quickstart

```bash
# serve the folder (any static server works), then open http://localhost:8000
python -m http.server 8000

# run the headless core tests (pure Node, no dependencies)
npm test
```

Double-clicking `index.html` also works for a quick look; serving over `http://` enables the full
service-worker/offline behaviour. After the first visit, the app runs with **zero internet**.

---

## The vision

**Sahar** (Dari/Persian: *سحر*, "dawn / the last hour before sunrise") is a **free, offline-first
education app for girls barred from school** — built first for Afghan girls shut out of school
since 2021, and for **any child anywhere denied an education.** It runs as a serious, game-like learning world
on a phone, tablet, or PC, **online or fully offline**, because the children who need it most often
have a borrowed phone, no data, and no permission to be seen learning.

The promise: a girl who starts at age 7 and stays with Sahar should, by the end, **know everything a
UN-"educated person" is meant to know** — literacy, numeracy, the sciences (Crash-Course breadth),
critical thinking, digital literacy, health and her own body, civics / economy / politics basics,
survival skills, the arts and literature, and a window into world languages — **plus** a shelf of
short illustrated companion books on thinking clearly, science, friendship, money, and survival.

### Motto
**"Learn to live, live to learn."** — یاد بگیر تا زندگی کنی، زندگی کن تا یاد بگیری.

### Languages
Persian / **Dari (RTL)**, English, German — at launch. Architected so a **5th and 6th language is a
file, not a rewrite.** Dari is first-class, not an afterthought.

### Age-tiered editions
Four editions so the same child grows up *inside* the app:

| Tier | Age | Heart of it |
|------|-----|-------------|
| **T1** | 7 | Letters, sounds, counting, "what is a question?" |
| **T2** | 8–9 | Reading sentences, arithmetic, the world around me |
| **T3** | 10–11 | Paragraphs, fractions, how things work, first science |
| **T4** | 12–13–14 | Algebra, the scientific method, the body, money, civics, media literacy |

---

## Who it is for

- Girls in Afghanistan locked out of secondary school since 2021.
- Refugee and displaced children with interrupted schooling.
- Any child — girl or boy — with a device but no school.
- Adults who never got the chance and want to start at the beginning, privately.

Designed **icon-first and low-literacy-friendly** so a child who *cannot yet read the menu* can still
start the first lesson. Designed **private by default** so using it is never evidence against anyone.

---

## Not-for-profit, free forever

Sahar is **not a business.** It is free, with no ads, no tracking, no in-app purchases, and no data
sold — *ever*. The children are never the customer and never the product.

**How it is meant to be funded** (none of these touch the learner):

- Grants and educational foundations.
- UNICEF-style / NGO institutional partners who sponsor content packs and translations.
- **Diaspora "pay-it-forward":** Afghans and others abroad fund a child's pack, never their own access.
- Volunteer educators and translators contributing Open Educational Resources.

If money ever flows, it flows *toward* the child (devices, offline distribution, translation),
never *from* her.

---

## What's actually in this repo right now (honest inventory)

```
Sahar/
├─ README.md                  ← you are here
├─ LICENSE                    ← MIT (the code)
├─ LICENSE-CONTENT.md         ← CC-BY-SA 4.0 (the original learning packs)
├─ LICENSE-NOTE.md            ← how the dual license was decided
├─ docs/
│  ├─ ARCHITECTURE.md         ← offline-first PWA, Clean-Arch + MVVM, signed packs, i18n, Leitner, a11y, child-safety
│  ├─ NAME.md                 ← name shortlist + the Sahar-as-heroine idea
│  ├─ CURRICULUM-MAP.md       ← the UN "educated person" body of knowledge mapped to 4 tiers + companion books
│  └─ OSS-REUSE.md            ← concrete open-source to reuse, with licenses
├─ learning/
│  └─ PROJECT-EXPLAINED.md    ← the project explained in four layers (child → architect)
├─ handbook/                  ← maintainer handbook: overview, setup, standards, diagrams, task guides
├─ test/
│  └─ core.test.js            ← 28 headless tests for the UI-free core (node:assert, no framework)
├─ content/                   ← versioned Tier-1 learning packs (fa/en/de), JSON
│  ├─ t1-literacy-first-letters.json
│  ├─ t1-numeracy-counting-0-20.json
│  ├─ t1-numeracy-shapes-patterns.json
│  ├─ t1-science-living-things.json
│  ├─ t1-thinking-what-is-a-question.json
│  ├─ t1-thinking-fact-vs-guess.json
│  └─ tier1-demo.json
└─ (prototype — runnable, offline)
   ├─ index.html
   ├─ manifest.webmanifest
   ├─ sw.js                   ← cache-first service worker
   ├─ app.js                  ← state + render + Leitner flow (logic separated from view)
   └─ styles.css              ← dawn palette, RTL-aware, design tokens
```

### The working prototype

Open **`index.html`** in any modern browser (double-click works; for full PWA/service-worker
behaviour serve the folder over `http://`). With **zero internet** you can:

- meet **Sahar**, the girl-at-dawn character (inline SVG, secular — no religious symbols);
- switch language **fa (RTL) / en / de** and watch every lesson re-render in all three;
- pick from a shelf of **seven real Tier-1 packs** — first letters, counting 0–20, shapes &
  patterns, living things, "what is a question?", "guess first, then check", and fact vs. opinion;
- run a real **spaced-repetition card flow** (show → reveal → *got it / again*);
- see review progress **persist** in `localStorage` using a classic **Leitner box model**
  (`1 → 2 → 4 → 9 → 21` day intervals; *got it* climbs a box, *again* falls to box 1).

It is a **prototype**: seven Tier-1 packs, three languages, the engine real and tested. The full
curriculum, the pack signing pipeline, audio, and the higher tiers are documented but **not yet built**.

---

## Architecture, in one breath

Offline-first **PWA** · Clean-Architecture + MVVM (logic separated from view) · content shipped as
**versioned, signed JSON packs** downloaded per age-tier so a phone stores only what it needs ·
**i18n from day one** (fa-RTL / en / de) · spaced repetition on a classic **Leitner box engine** ·
accessibility and **low-literacy icon-first UX** · **privacy by default — no tracking, no ads, no
accounts required.** See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## License

Dual-licensed on purpose, so the engine travels far and the lessons stay free:

- **Code → [MIT](LICENSE).** Fork it, build your own Sahar for your own denied children.
- **Original learning packs → [CC-BY-SA 4.0](LICENSE-CONTENT.md).** Use and adapt them freely,
  credit the source, and keep derivatives free under the same terms.

See [`LICENSE-NOTE.md`](LICENSE-NOTE.md) for the reasoning.

---

*For the girls who were told to stop. Learn to live, live to learn.*
