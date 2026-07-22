# Sahar — Prototype Fund · Application Draft

**Status: DRAFT for Mo. Nothing submitted. No account created. Gate below NOT resolved.**
This document prepares Sahar's strongest single real grant shot, per
`Mo-Finance/FUNDING-EXACT-2026-07-22.html` (checked live 2026-07-22), which ranks Prototype
Fund as the **best of only three real chances** out of ~20 funds surveyed — "MEDIUM, best
shot," not easy, and gated on two things resolved below.

> **House rules honoured:** *REAL 90 > FAKE 100* · child-safety and do-no-harm first ·
> **zero Iran-politics content — education/infrastructure project only** · nothing here
> claims a partnership, a deadline, or an impact number that does not exist.

---

## 1. VERIFIED-FACTS box

| Fact | Status | Source / note |
|---|---|---|
| Round window: **1 Oct – 30 Nov 2026** | **Confirmed** (live-checked 2026-07-22) | `Mo-Finance/FUNDING-EXACT-2026-07-22.html`, Prototype Fund entry. Re-verify on `prototypefund.de` close to filing — round dates can shift. |
| Amount: **~€47,500**, team format **up to ~€95k** | **Confirmed range**; the exact mechanism (solo vs. team split) **unconfirmed** | Report gives the range only, not the internal rule for who gets which figure. Verify live before budgeting. |
| Eligibility: **individual or small team, open-source project** | **Confirmed** (individual eligibility explicitly stated) | Report: "open-source Germany, individual." |
| Eligibility: **residency in Germany required** | **NOT explicitly confirmed in the report** — flagged here as the most likely gap | The report doesn't state a residency clause outright; it's typical for a BMBF-adjacent German program. **Must verify on the live guidelines** before assuming "Mo qualifies." Do not treat this as settled. |
| Program funded **through 2029** | **Confirmed** | Report: "funded through 2029" — i.e., this is not a one-off round, so missing Oct–Nov 2026 is not fatal. |
| Thematic focus has shifted to **"data security & software infrastructure"** (2025+) | **Confirmed** | Report: "focus has moved to security/infrastructure — Sahar (education) must be hard-framed into offline/privacy architecture." This is the honest crux of §3 below. |

**Bottom line from the source report:** of ~20 funds checked, Prototype Fund is explicitly
named the **best single shot** — but the report itself calls it "MEDIUM, not easy," names
two real catches, and its own final recommendation says grants overall are a poor use of
Mo's scarce weekly hours during thesis/exam season, and to **park grant-chasing until
after thesis**, doing at most this one if any.

---

## 2. ⚠️ GATE — read this before anything else

**Prototype Fund money is NOT a clean stipend. It is structured as self-employed /
freelance income.** This is the exact same gate the funding report flags for GitHub
Sponsors and Patreon — grant money that pays out as freelance/self-employment income is
**not automatically safe** for someone on a residence permit tied to employment. Only a
genuinely no-strings-attached scholarship (Stipendium) is safe by default; this is not
confirmed to be one.

Two things must be resolved **before applying**, not after an award:

1. **Ausländerbehörde §21.6 self-employment question.** Mo's current permit is tied to his
   SincoTec employment. Taking on €47.5k+ of self-employed-structured income is very
   plausibly a status change requiring **prior written permission**, not a formality to
   sort out after the money lands. This must be asked and answered **before** submitting
   an application, not during the round, not after acceptance.
2. **Written employer (SincoTec) Nebentätigkeit permission.** Separately from immigration
   law, an employment contract typically requires written employer sign-off for outside
   paid work of this kind and scale. This is Mo's own written permission to obtain, not
   something a grant committee cares about — but it is still a precondition for this to be
   real.

**Do not start an application and plan to "ask later."** If either the §21.6 answer or the
Nebentätigkeit permission comes back negative, this entire draft is moot and Sahar
continues exactly as it is today — funded by nothing, at no risk to Mo. The gate exists to
be resolved *first*, cheaply, before any of the writing effort below is spent on a real
submission (the writing itself, as a thinking exercise, is fine and is what this file is).

I am not a lawyer or tax adviser. Both questions go to the **Ausländerbehörde** and, for
the tax/income side, a **Steuerberater** — see the same standing rule in
`Mo-Finance/FUNDING-EXACT-2026-07-22.html`.

---

## 3. The honest reframing: an education app pitched into an infrastructure fund

**The tension, stated plainly:** Prototype Fund's current (2025+) thematic core is *data
security and software infrastructure*. Sahar is, at its heart, an **education app** for
out-of-school children. This is a **stretch fit**, not a natural one, and the committee may
reasonably say "this is an education project, not an infrastructure project" and reject it
on scope grounds alone. This section reframes honestly to the parts of Sahar that really
are infrastructural — it does not pretend the whole project is something it isn't.

### What is genuinely infrastructural about Sahar (the real angle)

Per `docs/ARCHITECTURE.md`, several pieces of Sahar's real, built-and-documented
architecture *are* legitimately security/infrastructure work, independent of the education
content sitting on top of them:

- **Offline-first sync architecture.** The app is designed so a device that has *never*
  touched the internet still runs the full learning engine, and content packs propagate
  by download **or by sideload** (Bluetooth / SD card / a shared phone) — a genuine
  offline-distribution and resilience problem, not merely "an app that also has an offline
  mode."
- **Data-minimization / privacy-by-design for at-risk users.** No accounts, no telemetry,
  no third-party SDKs, no server round-trip on any critical path, all progress local-only
  (§8 of `ARCHITECTURE.md`). This is not a generic "we respect privacy" line — for a child
  whose *device itself* could be searched, "no evidence of use" is a real security
  property, engineered on purpose (plausible-deniability-by-design, §8).
- **Signed content packs (designed, not yet built).** The architecture already specifies
  detached Ed25519 signatures over every content pack so a device **refuses to load a
  tampered or hostile pack** — a real software-supply-chain-integrity problem for content
  that may travel hand-to-hand through informal networks with no central authority
  verifying it. This is currently the single most important *unbuilt* piece of the
  architecture (honestly flagged as a gap in the repo itself).
- **Resilience for low-connectivity / restricted environments.** A cache-first service
  worker, versioned atomic updates, and a content model that assumes intermittent power
  and no data plan are infrastructure decisions made for censorship- and
  poverty-constrained networks, not just "nice to have offline."

### The honest caveat

This is a **reframing**, not a hidden truth suddenly revealed. Sahar's actual product is
an education tool; the sync/signing/privacy layer is real but currently a *minority* of
the built work, and some of it (pack signing) is designed-only, not shipped. A fair
committee could read this application as "education project wearing an infrastructure
costume" and pass. That risk is real and is stated here on purpose so Mo goes in
clear-eyed, not surprised by a rejection.

---

## 4. Milestone plan (6 months) — what the money would actually build

If funded, the honest ask is **not** "finish the whole app" — it is the two things Sahar
genuinely lacks and that map onto the fund's real focus: real audio, and a hardened
offline-sync/privacy layer.

| Month | Milestone |
|---|---|
| 1 | Kick-off; lock scope to the infra deliverables below (not full curriculum); commission real human Dari audio via the two tracks already researched (`audio/DARI-AUDIO-SOURCING-2026-07-19.md`: paid Afghan-Dari VO, ~$150–400, ~85 lines, explicit CC-BY-SA/CC0 release; and/or a diaspora volunteer track) |
| 2 | Implement **pack signing** (Ed25519, detached signature over canonical JSON) — the currently-designed-but-unbuilt piece named as the top safety gap in `ARCHITECTURE.md` §4; app refuses to load an unsigned/tampered pack |
| 3 | Build the **multi-pack sideload/sync catalog** — real download-or-sideload distribution (Bluetooth/SD/shared-phone transfer), replacing today's bundled-only prototype packs |
| 4 | Real human Dari audio lands in-app, replacing the flagged machine-voice draft; independent native-Dari review of the audio |
| 5 | Security/privacy hardening pass: independent review of the "zero network calls, zero accounts, local-only progress" claims against the real shipped code; add optional encrypted backup (opt-in only, never on by default, per §8) |
| 6 | Real offline/airplane-mode device testing (`docs/PHONE-TEST.md`, not yet run); honest final report — what shipped, what didn't, documented gaps, public release under the existing MIT/CC-BY-SA licenses |

This plan deliberately does **not** promise Tier 2–4 curriculum, a measured learning
impact, or a finished consumer product — none of that is real today and none of it is
what this fund is actually paying for.

---

## 5. What Mo must decide / do FIRST

1. **Resolve the §21.6 Ausländerbehörde question — before anything else.** Ask directly:
   does Prototype Fund's self-employed-structured payout require prior permission under his
   current permit? This gates everything below; do not proceed past this until answered.
2. **Get written SincoTec Nebentätigkeit permission** for outside paid work of this scale,
   separately from the immigration question.
3. **Only after both above are resolved:** decide whether the infrastructure reframing in
   §3 is honest enough to submit, or whether it reads as too much of a stretch — this is a
   judgment call, not a technical one.
4. **Verify live on `prototypefund.de`** before writing a real submission: the exact
   1 Oct–30 Nov 2026 window, the real solo-vs-team amount split, and the current published
   thematic-fit criteria (confirm the "security/infrastructure" framing is still accurate
   at filing time, not just as of this report's 2026-07-22 check).
5. **Weigh it against the source report's own recommendation:** the funding report's
   honest bottom line is that grant-chasing overall is a poor use of thesis-season hours,
   and that if Mo does only one, this is the one — but "the one" still means real hours on
   an uncertain-fit application, not a fast or easy win.

---

## 6. Sources & honesty note

- Fund facts, amount, dates, thematic shift, and both gates: `Mo-Finance/FUNDING-EXACT-2026-07-22.html`
  (live-checked 2026-07-22; sources therein include `prototypefund.de`).
- Sahar facts: `Sahar/README.md`, `Sahar/docs/ARCHITECTURE.md`,
  `Sahar/audio/DARI-AUDIO-SOURCING-2026-07-19.md`.
- Everything else in `funding/` (Fonds Soziokultur, Goslar, DPG docs) for cross-reference —
  not duplicated here.
- **No application submitted. No deadline re-confirmed live. No amount secured. No impact
  measured. §21.6 and Nebentätigkeit questions open.**

*For the children who were told to stop. Learn to live, live to learn.*
