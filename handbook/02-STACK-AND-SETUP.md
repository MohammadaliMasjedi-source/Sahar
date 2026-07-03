# 02 — Stack & setup (from zero)

Sahar is deliberately dependency-free. You need almost nothing.

## Install list

| Tool | Version | Why | Where |
|---|---|---|---|
| A modern browser | any recent Chrome/Edge/Firefox/Safari | run the app | you already have one |
| **Python** *or* **Node.js** | Python 3.x / Node 18+ | serve the folder over `http://` (needed for the service worker) | <https://www.python.org/downloads/> · <https://nodejs.org/> |
| **Node.js** | 18+ | run the headless tests (`node:assert`) | <https://nodejs.org/> |
| A text editor | any (VS Code recommended) | edit code and packs | <https://code.visualstudio.com/> |

There is **no `npm install`** — the project has zero dependencies, no build step, no `.env`, no keys.

## From-zero setup

1. Clone or download the repo:
   `git clone https://github.com/MohammadaliMasjedi-source/Sahar.git`
2. Open the folder in your editor. That's the whole setup.

## Run

```bash
# from the repo root — either of these:
python -m http.server 8000
npx serve .
```

Open `http://localhost:8000`.

**Verify it works:** you see the dawn-colored page with Sahar (a girl in an SVG), three language
buttons (دری / EN / DE), and a shelf of lesson tiles. Pick a lesson → *Show me* → *Got it / Again*.
Reload the page: your progress is remembered. Then stop the server and reload — after the first
visit the page still opens (service worker cache).

## Test

```bash
npm test        # = node test/core.test.js
```

**Success looks like:** `28 passed, 0 failed, 28 total` and exit code 0.

## Common problems

- **Opened `index.html` by double-click and offline mode doesn't work** — service workers need
  `http://`, not `file://`. Serve the folder (see Run above). The UI itself still renders on `file://`.
- **Persian text looks like boxes** — install/enable a font with Arabic-script coverage; the app
  requests Vazirmatn and falls back to system fonts.
- **Changes don't show up** — the service worker serves the old cache. Bump `CACHE` in `sw.js`
  (e.g. `sahar-v4` → `sahar-v5`) or hard-reload with DevTools → Application → "Update on reload".
