# Sahar — Digital Public Goods (DPG) submission checklist

*The exact, ordered steps Mo follows to nominate Sahar to the **Digital Public Goods Alliance
registry** (digitalpublicgoods.net). Written 2026-07-16. Companion to
[`DPG-READINESS.md`](DPG-READINESS.md) (the scored self-assessment). This file is the "how to
actually submit" runbook: every DPG indicator is mapped to the repo file that backs it, and there
is a ready-to-paste, honest prototype disclosure so the submission cannot be read as over-claiming.*

> **One honest sentence to keep in front of you the whole time:** Sahar is a **runnable, open,
> safeguarded prototype that has not yet been piloted with real children.** Every field below is
> filled to be true at that maturity — not one notch above it. House rule: *REAL 90 > FAKE 100.*

---

## 0. What this submission is (and is not)

- **Is:** a nomination of Sahar as a Digital Public Good against the DPG Standard's **9 indicators**.
- **Is not:** an impact claim, a "deployed at scale" claim, or a certification. The DPGA reviews and
  either accepts, asks for more, or says "come back after real use." All three are fine outcomes.
- **Cost:** none. The DPGA charges no fee.
- **Time:** the doc fixes are done; the reviewer dialogue after you submit typically takes **weeks**.
- **Who does what:** LooLoo prepared the evidence; **Mo submits** (it needs his name, contact, and a
  couple of decisions only he can make — see §6).

---

## 1. Pre-flight — do these before opening the form

1. **Repo is public.** The DPGA reviewer must be able to read the source. Confirm
   `Git Mo/Sahar` (GitHub name) is a **public** repo. *(Per Mo's standing rule work repos live on
   his private GitHub — Sahar is a public-good project he intends to open, so this is a deliberate
   public exception, not an accident. Confirm before submitting.)*
2. **The six readiness docs are committed and pushed** (they are, as of this commit):
   - [`SDG-MAPPING.md`](../SDG-MAPPING.md)
   - [`PRIVACY.md`](../PRIVACY.md)
   - [`DO-NO-HARM.md`](../DO-NO-HARM.md)
   - [`DATA-HANDLING.md`](../DATA-HANDLING.md)
   - [`PLATFORM-INDEPENDENCE.md`](../PLATFORM-INDEPENDENCE.md)
   - ownership line + license block in [`README.md`](../README.md)
3. **Decide the public entry point / "website" URL.** Options: the GitHub repo URL itself (fine for
   a prototype), or a GitHub Pages deploy of the PWA if/when one exists. A repo URL is an honest
   answer today.
4. **Have the honest maturity disclosure ready to paste** — §5 below.

---

## 2. Where to submit (the mechanism)

The DPGA runs the nomination through a public GitHub repository, driven by a web form:

1. Go to **digitalpublicgoods.net → "Submit a Digital Public Good"** (the current live entry point;
   confirm the exact button label on the site, as the DPGA occasionally renames it).
2. The form walks the **9 indicators** as an eligibility questionnaire and, on submit, opens a
   **nominee entry as a pull request / issue in the `digitalpublicgoods/publicgoods-candidates`
   GitHub repo** under Sahar's name. (You can also open that PR directly if you prefer working in
   GitHub — the web form is just a friendlier front end to the same nominee file.)
3. A DPGA reviewer then works through the indicators **with you, in GitHub comments.** You answer by
   pointing at the repo files mapped in §4. This back-and-forth is the actual review.

> **Do not fabricate any field.** If a form field asks for something Sahar does not have (a live
> user count, a deployment country, an org registration number), answer honestly: "prototype, not
> yet piloted / not yet deployed / independent maintainer, no legal entity." An honest blank is
> stronger than an invented value and is exactly what keeps this submission clean.

---

## 3. Nominee form fields — the exact values for Sahar

The nominee submission asks for roughly the fields below. Confirm the current labels on the live
form; the **values** are what matters and are filled to be true today.

| Form field (approx.) | Value to enter |
|---|---|
| **Project name** | Sahar |
| **Website / demo URL** | the public GitHub repo URL *(or a Pages deploy if one exists)* — `[MO: paste URL]` |
| **Source-code repository** | same public GitHub repo URL — `[MO: paste URL]` |
| **Organization / owner** | Mohammadali Masjedi (independent maintainer; **no legal entity** — say so plainly) |
| **Contact** | `[MO: email you want on a public record]` |
| **License(s)** | **MIT** (code) + **CC-BY-SA 4.0** (original content) — both DPGA-approved open licenses |
| **Type** | Software **and** Content (Sahar is both an app and original open learning packs) |
| **Relevant SDG(s)** | **SDG 4** (primary), **SDG 5**, **SDG 10** — see [`SDG-MAPPING.md`](../SDG-MAPPING.md) |
| **Sector / tags** | Education; child rights; offline / low-connectivity; open educational resources |
| **Countries of deployment / use** | **None yet — prototype, not piloted.** (If a field forces a country, use the *intended* first context, Afghanistan, and label it clearly as "target, not current deployment.") |
| **Short description** | paste the block below |
| **Stage / maturity** | **Prototype / early-stage — runnable and open, not yet piloted.** Do not select "in production" or "scaling." |

**Short description (ready to paste — honest, no over-claim):**

> Sahar is a free, offline-first Progressive Web App that teaches literacy, numeracy, science, and
> critical thinking to children denied school — built first for Afghan girls barred from secondary
> education since 2021, and for any child anywhere with a device but no school. It runs fully
> offline after first load, collects no personal data, requires no account, and works on a cheap or
> borrowed phone. Content is original open learning packs in Dari (RTL), English, and German on a
> spaced-repetition engine. **Sahar is currently a runnable prototype that has not yet been piloted
> with real children;** it is open-licensed (MIT code, CC-BY-SA 4.0 content) and built to the
> Digital Public Goods principles by design.

---

## 4. The 9 DPG indicators → which repo file backs each

This is the table to keep open during the reviewer dialogue. For each indicator, point the reviewer
at the named file(s) and give the one-line answer.

| # | DPG indicator | Backing file(s) in the repo | One-line reviewer answer |
|---|---|---|---|
| 1 | **Relevance to SDGs** | [`SDG-MAPPING.md`](../SDG-MAPPING.md) | Primary SDG 4; also 5 and 10, mapped target-by-target, with an explicit "what it does NOT yet do." |
| 2 | **Use of approved open licenses** | [`LICENSE`](../LICENSE) (MIT), [`LICENSE-CONTENT.md`](../LICENSE-CONTENT.md) (CC-BY-SA 4.0), [`LICENSE-NOTE.md`](../LICENSE-NOTE.md) | Dual license, both on the DPGA-approved list; reasoning documented. |
| 3 | **Clear ownership** | [`README.md`](../README.md) "Ownership & License", [`LICENSE`](../LICENSE) copyright line | Owner: Mohammadali Masjedi © 2026; independent, not owned by any company. |
| 4 | **Platform independence** | [`PLATFORM-INDEPENDENCE.md`](../PLATFORM-INDEPENDENCE.md), [`docs/OSS-REUSE.md`](../docs/OSS-REUSE.md) | Open-web PWA, no lock-in; the one closed dependency (edge-tts/Azure for **draft** audio generation, not runtime) is disclosed with an open-alternative plan (Piper) and the real fix (human recordings). |
| 5 | **Documentation** | [`README.md`](../README.md), [`INSTALL.md`](../INSTALL.md), [`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md), [`docs/CURRICULUM-MAP.md`](../docs/CURRICULUM-MAP.md), [`handbook/`](../handbook), [`learning/`](../learning) | End-user, install, architecture, curriculum, and maintainer docs all present. |
| 6 | **Mechanism for extracting non-PII data** | [`DATA-HANDLING.md`](../DATA-HANDLING.md) | All stored data is local, non-PII, plain **JSON** (RFC 8259, non-proprietary), readable/extractable via the browser; an in-app one-click export is named as a small, scoped TODO (honest gap). |
| 7 | **Adherence to privacy & applicable laws** | [`PRIVACY.md`](../PRIVACY.md) | Offline-first, no tracking, no accounts, no PII; GDPR/COPPA alignment is **structural** (no data flow exists), not a policy promise. |
| 8 | **Adherence to standards & best practices** | [`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md), [`docs/CURRICULUM-MAP.md`](../docs/CURRICULUM-MAP.md), [`docs/CONTENT-MODEL.md`](../docs/CONTENT-MODEL.md) | Open web standards (PWA, service worker, standard JSON); spaced-repetition pedagogy; curriculum mapped to tiers. |
| 9 | **Do no harm by design** | [`DO-NO-HARM.md`](../DO-NO-HARM.md), [`docs/RED-TEAM-PEDAGOGY-SAFEGUARDING-2026-07-13.md`](../docs/RED-TEAM-PEDAGOGY-SAFEGUARDING-2026-07-13.md), [`docs/RED-TEAM-8-10-2026-07-14.md`](../docs/RED-TEAM-8-10-2026-07-14.md) | Double red-team gate (pedagogy + child-safeguarding) + secular audit; no social/harassment surface (offline, single-player); every claim sourced to a dated red-team doc. Stated plainly as **self-run**, not an external audit. |

---

## 5. The honest "prototype / not-yet-piloted" disclosure (paste verbatim)

Put this in the description, and repeat it in the reviewer dialogue the first time maturity comes
up. It is the single most important thing that keeps this submission from being read as
over-claiming.

> **Maturity disclosure.** Sahar is a **runnable prototype, not a piloted or deployed product.** As
> of submission it has: an offline-first PWA that runs on a real phone; original open learning
> content for ages 6–10 (Tiers 1–2 of a planned four-tier curriculum); a real, tested
> spaced-repetition engine; and a documented double red-team (pedagogy + child-safeguarding) plus
> secular audit run **internally by the maintainer.** It has **not** been used by, or tested with,
> any real child; there is **no measured learning-outcome data**, no independent third-party
> child-safety audit, no external legal/privacy certification, and no live deployment. The audio is
> a temporary machine voice, disclosed in-app, not final human recordings. Tiers 3–4 do not exist
> yet. These gaps are documented in the repo ([`SAHAR-COVERAGE-STATUS.md`](../SAHAR-COVERAGE-STATUS.md),
> [`DO-NO-HARM.md`](../DO-NO-HARM.md), [`DATA-HANDLING.md`](../DATA-HANDLING.md),
> [`PLATFORM-INDEPENDENCE.md`](../PLATFORM-INDEPENDENCE.md)) on purpose. "Serves SDG 4/5/10" here
> means *designed and built toward*, never *proven to deliver*.

---

## 6. What still needs Mo (decisions only he can make)

These are not doc gaps — they are choices/actions LooLoo cannot and should not make for him:

1. **Make the repo public** (or confirm it already is) before submitting — the reviewer needs to read it.
2. **Paste the public repo/website URL and a contact email** into the form (they go on a public record).
3. **Confirm CC-BY-SA 4.0 is the content license he wants** on a public registry (it is stated
   everywhere; this is just a final "yes").
4. **Confirm the "independent maintainer, no legal entity" framing** — or, if he wants, name an org.
5. **Decide timing vs. a pilot.** The DPGA may accept a strong prototype, or may ask him to return
   after real use. Either is fine — but he should submit knowing "come back after a pilot" is a
   realistic (and honest) possible answer, not a rejection.
6. *(Optional, strengthens indicator 6)* decide whether to add the small in-app **"export my data"
   button** before submitting — it is scoped in [`DATA-HANDLING.md`](../DATA-HANDLING.md) and would
   turn indicator 6 from "extractable, but manually" into "one-click export." Not required; a
   genuine near-term win.
7. *(Standing gate)* **native-Dari review** of the `fa` strings by Mo/Neda — already flagged open in
   [`DO-NO-HARM.md`](../DO-NO-HARM.md); not a submission blocker, but the right thing before any pilot.

---

## 7. Tie-in: the next startSocial round (~May 2027)

The 2026 startSocial cycle is closing now (see
[`STARTSOCIAL-2026-APPLICATION-DRAFT.md`](STARTSOCIAL-2026-APPLICATION-DRAFT.md)). The DPG work done
here is **directly reusable** for the next annual round (~May 2027):

- The nine-indicator evidence base and the honest maturity disclosure are exactly the credibility
  signals a social-startup jury wants — "open, private, safeguarded, honest about being early."
- If the DPGA has accepted Sahar (or is mid-review) by then, "recognized / under review as a Digital
  Public Good" is a concrete, verifiable line for the 2027 application — **not** an impact claim,
  which keeps it inside Mo's no-over-claim rule.
- Between now and May 2027, the honest levers that would most strengthen *both* the DPG entry and a
  startSocial re-apply are the same three: a **small supervised pilot**, **real Dari human audio**,
  and the **in-app data export**. None require new claims — only the work.

---

*Related: [`DPG-READINESS.md`](DPG-READINESS.md) (scored self-assessment),
[`SAHAR-COVERAGE-STATUS.md`](../SAHAR-COVERAGE-STATUS.md) (honest done-vs-open ledger),
[`STARTSOCIAL-2026-APPLICATION-DRAFT.md`](STARTSOCIAL-2026-APPLICATION-DRAFT.md).*
