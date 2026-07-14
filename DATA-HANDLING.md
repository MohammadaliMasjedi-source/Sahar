# Sahar — Data Handling

*Written 2026-07-14 for Digital Public Goods Alliance review (indicator: data extraction /
non-PII). Answers one question precisely: what data does Sahar store, in what format, and can it
get out again?*

## What is stored

Everything is **local to the device** (browser `localStorage`), plain **JSON**, and **non-PII** by
design — see [`PRIVACY.md`](PRIVACY.md) for the full privacy reasoning. In data-format terms:

| Key | Shape | Contents |
|---|---|---|
| `sahar.profiles.v1` | `{ profiles: [{ id, name, ageBand, avatar, createdAt }], activeId }` | Per-child: a generated id, an optional freetext display name (caregiver-typed, capped 40 chars, never required), an age band (`"6-8"`/`"8-10"`/`"10-12"`/`"12-14"`), a chosen avatar id, and a creation date (`YYYY-MM-DD`). |
| `sahar.garden.v1` | `{ [profileId]: { packsCompleted: { [packId]: count } } }` | How many times each profile has completed each lesson pack. |
| `sahar.progress.v1` / `sahar.progress.v1.<profileId>` | `{ [cardId]: { box, due, reps, lapses } }` | Per-card spaced-repetition state: Leitner box (1–5), next-due date, repeat count, lapse count. |
| `sahar.lang` | string | Selected UI language code. |
| `sahar.theme` | string | Selected visual theme name. |

No field above identifies a real-world person unless a caregiver *chooses* to type a real name
into the optional name field — and even then, that value never leaves the device (see
[`PRIVACY.md`](PRIVACY.md)'s "what is stored" section for the full honesty note on that one field).

## Format: non-proprietary, by construction

Every value above is stored as **JSON** (`JSON.stringify`/`JSON.parse` throughout `profiles.js` and
`app.js`) — an open, standard, human-readable text format (RFC 8259), not a proprietary database or
binary blob. Any tool that can read `localStorage` and parse JSON can read Sahar's data; there is
no vendor-specific encoding anywhere in the storage layer.

## Getting data out today — honest status

**No in-app "export" button exists yet.** This is a real, named gap, not a hidden one. Today, the
only way to extract the data is manually, through the browser's own developer tools (Application →
Local Storage in Chrome/Edge, Storage tab in Firefox) — technically possible (it's plain JSON,
readable the moment you look at it), but not a feature built for a caregiver to use.

**Planned (TODO, not yet built):** a small "export my data" action in-app that serializes the
active profile's `sahar.profiles.v1` + `sahar.garden.v1` + `sahar.progress.v1.<id>` entries into one
downloadable `.json` file — a few dozen lines behind the existing `ProfileProvider`/
`GardenProvider`/`ProgressProvider` interfaces (`docs/ARCHITECTURE.md` §3), since the providers
already read this exact data; the only new work is serializing it to a `Blob`/`download` link
instead of only to `localStorage`. Scoped small on purpose — this is the concrete next step, named
here so it doesn't get lost.

## Data flow, for completeness

Data only ever moves **within the device**: the app writes to `localStorage`, and reads it back on
the next visit. Nothing is uploaded, synced, or mirrored anywhere by default (see
[`PRIVACY.md`](PRIVACY.md)'s "Network behavior" section — the service worker makes zero external
calls). There is currently no cloud backup, encrypted or otherwise; that is a separate, larger,
explicitly designed-but-not-built feature (`docs/ARCHITECTURE.md` §8), not to be confused with the
small local-export TODO above.

## Deletion

Because there is no second copy anywhere, deletion is trivial and complete: clearing the site's
storage in the browser, or uninstalling the installed PWA, removes all of it immediately. No
request process is needed because there is no external party holding a copy to delete.

*Related: [`PRIVACY.md`](PRIVACY.md), [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) §3 (provider
interfaces) and §8 (child safety / privacy by default).*
