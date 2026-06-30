# Sahar — سحر · "Learn to live, live to learn."

> **Status: scaffold + working prototype.** This repo is the *foundation* — an honest, runnable
> offline-first prototype plus the architecture, curriculum, naming, and open-source plan that the
> full app will grow from. It is **not** a finished product, and nothing here pretends to be.
> (House rule: *REAL 90 > FAKE 100*.)

---

## The vision

**Sahar** (Dari/Persian: *سحر*, "dawn / the last hour before sunrise") is a **free, offline-first
education app for girls barred from school** — built first for Afghan girls shut out by the Taliban,
and for **any child anywhere denied an education.** It runs as a serious, game-like learning world
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
├─ LICENSE-NOTE.md            ← recommended dual license (code MIT / content CC-BY-SA) — Mo's final call
├─ .gitignore
├─ docs/
│  ├─ ARCHITECTURE.md         ← offline-first PWA, Clean-Arch + MVVM, signed packs, i18n, Leitner, a11y, child-safety
│  ├─ NAME.md                 ← name shortlist + the Sahar-as-heroine idea (Mo's final call)
│  ├─ CURRICULUM-MAP.md       ← the UN "educated person" body of knowledge mapped to 4 tiers + companion books
│  └─ OSS-REUSE.md            ← concrete open-source to reuse, with licenses
└─ (prototype — runnable, offline)
   ├─ index.html
   ├─ manifest.webmanifest
   ├─ sw.js                   ← cache-first service worker
   ├─ app.js                  ← state + render + Leitner flow (logic separated from view)
   ├─ styles.css              ← dawn palette, RTL-aware, design tokens
   └─ content/tier1-demo.json ← one real demo lesson as a versioned content pack
```

### The working prototype

Open **`index.html`** in any modern browser (double-click works; for full PWA/service-worker
behaviour serve the folder over `http://`). With **zero internet** you can:

- meet **Sahar**, the girl-at-dawn character (inline SVG, secular — no religious symbols);
- switch language **fa (RTL) / en / de** and watch one real lesson re-render in all three;
- run a real **spaced-repetition card flow** (show → reveal → *got it / again*) over ~5 cards drawn
  from a tiny "fact vs. opinion" + counting micro-lesson;
- see review progress **persist** in `localStorage` using the same **Leitner box model** as internal
  (`1 → 2 → 4 → 9 → 21` day intervals; *got it* climbs a box, *again* falls to box 1).

It is a **prototype**: one demo pack, three languages, the engine real. The curriculum, the full pack
pipeline, signing, and the other tiers are documented but **not yet built**.

---

## Architecture, in one breath

Offline-first **PWA** · Clean-Architecture + MVVM (logic separated from view) · content shipped as
**versioned, signed JSON packs** downloaded per age-tier so a phone stores only what it needs ·
**i18n from day one** (fa-RTL / en / de) · spaced repetition reusing our **Leitner engine** ·
accessibility and **low-literacy icon-first UX** · **privacy by default — no tracking, no ads, no
accounts required.** Aligned to the house **EMotion 3 Architecture Standard**
(`internal-path`). See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## Public when Mo says

This repository is **private until Mo decides to publish.** Do not create a public mirror, do not
push to a public remote, and do not announce it. Mo publishes Sahar to the world himself, on his own
timing. Until then it lives locally and grows quietly, like its name — the hour before dawn.

---

*For the girls who were told to stop. Learn to live, live to learn.*
