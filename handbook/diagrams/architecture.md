# Diagrams — the shape of Sahar

## Component map — who talks to whom

The view depends on the core; the core depends only on provider interfaces; nothing reaches an
external host, ever.

```mermaid
flowchart LR
  subgraph Browser
    View["VIEW\nindex.html + render() in app.js"]
    VM["VIEWMODEL\nstate"]
    Core["CORE\nLeitner: schedule / isDue / buildQueue\ni18n: STRINGS"]
    CP["ContentProvider"]
    PP["ProgressProvider"]
    SW["Service worker (sw.js)\ncache-first, same-origin only"]
  end
  Packs[("content/*.json\nlesson packs")]
  LS[("localStorage\nsahar.progress.v1")]

  View --> VM --> Core
  Core --> CP --> SW --> Packs
  Core --> PP --> LS
```

## Review flow — one card, one answer

```mermaid
sequenceDiagram
  actor Child
  participant View as render()
  participant Core as schedule()
  participant PP as ProgressProvider

  Child->>View: taps a lesson tile
  View->>PP: load()
  View->>View: buildQueue(pack, progress)
  loop each due card
    Child->>View: "Show me" → answer revealed
    Child->>View: "Got it" / "Again"
    View->>Core: schedule(card, gotIt)
    Core-->>View: new box + due date (pure, no mutation)
    View->>PP: save(progress)
  end
  View-->>Child: "Well done!" (dawn screen)
```

## Card lifecycle — the Leitner state machine

A card climbs one box per correct answer and waits longer each time; a miss sends it back to box 1
for tomorrow.

```mermaid
stateDiagram-v2
  [*] --> Box1
  Box1 --> Box2: got it (+2d)
  Box2 --> Box3: got it (+4d)
  Box3 --> Box4: got it (+9d)
  Box4 --> Box5: got it (+21d)
  Box5 --> Box5: got it (stays, +21d)
  Box2 --> Box1: again (+1d)
  Box3 --> Box1: again (+1d)
  Box4 --> Box1: again (+1d)
  Box5 --> Box1: again (+1d)
```
