# Express Clinical Services — B2B collection infrastructure website

A single-file, premium B2B website for **Express Clinical Services**, the B2B arm of
Express Pathology / Express Health. It positions Express as **blood collection
infrastructure** for Australian healthcare companies — nurse network, patient
coordination, specimen logistics and quality control, delivered so partners don't
have to build their own clinical operations.

## Quick start

No build step — it's one static file.

```bash
open express-clinical-services/index.html        # macOS
xdg-open express-clinical-services/index.html    # Linux
# or: python3 -m http.server 8000  → http://localhost:8000/express-clinical-services/
```

## Page structure (matches the brief)

1. **Hero** — "Blood collection infrastructure for modern healthcare companies." + dual CTA + 5-item trust bar.
2. **Who we help** — 6 sector cards (telehealth, men's health/hormone, longevity, genetics, corporate, pathology partners).
3. **The problem** — dark band, 6 problem points.
4. **The solution** — "Your collection layer, handled." 6 pillars.
5. **How it works** — 5-step workflow diagram + white-label / partner-facing note.
6. **Service models** — Mobile, Clinic, Corporate/Onsite.
7. **Why Express** — 8 reliability points.
8. **Use cases** — 7 partner scenarios.
9. **Partner experience** — "Protect your patient experience."
10. **CTA + partner enquiry form** — all 9 requested fields.
11. **Footer.**

## Design — calm, operational, healthcare-grade

Grounded in the `ui-ux-pro-max` skill's "Trust & Authority" pattern, then tuned to
the brief's calm/premium-not-flashy direction. Deliberately **distinct** from the
consumer-facing Express Pathology site (no animated mesh, no hype).

| Token | Value | Use |
|------|-------|-----|
| Canvas | `#F7F7F2` | Warm off-white background |
| Ink | `#1B2420` | Warm charcoal text |
| Muted | `#5A6661` | Body / secondary text |
| Brand | `#2E6B52` | Muted clinical green accent / buttons |
| Brand deep | `#1E4A38` | Hover / emphasis |
| Brand soft | `#E9F1EC` | Tints, chips, callouts |
| Dark | `#15201B` | Deep charcoal-green contrast bands |

- **Type:** Lexend (headings) + Source Sans 3 (body) — the skill's recommended
  enterprise/healthcare pairing.
- **Motion:** gentle fade-up reveals only, fully disabled under `prefers-reduced-motion`.
  No counters, marquees or pulsing effects — calm by design.
- Tone follows the brief: "collection infrastructure", "clinical operations",
  "nurse network", "scalable workflows" — and avoids "Uber for healthcare", "AI-powered",
  "revolutionising", "wellness journey", etc.

## Accessibility & performance

- Skip link, semantic landmarks/headings, ARIA on icon-only controls, `<fieldset>/<legend>`
  for the state and collection-type chip groups.
- Targets ≥44px, visible focus rings, inline validation on blur, accessible errors,
  `aria-live` success state, semantic input types + autocomplete.
- Responsive at 375 / 768 / 1024 / 1440; transform/opacity-only animation (no layout shift).

## 🚀 Making it a usable, live site

**See [`GO-LIVE.md`](./GO-LIVE.md) for the full plain-English launch guide.** Short version:

1. **Form → email:** the form is wired for **Formspree**. Create a free form at
   formspree.io and replace `YOUR_FORM_ID` in the `<form ... action="...">` tag with your
   real form ID. Enquiries then land in your inbox. Until configured, the form runs in a
   harmless "demo" mode (shows success but doesn't send) and logs a console warning.
2. **Details:** replace placeholder phone `1300 000 000` and email
   `partners@expressclinical.com.au` with your real ones; check the coverage chips.
3. **Publish:** upload `index.html` to your host's web root (e.g. `public_html`). Since
   your domain points at your host, it's live immediately.

### Still worth doing
- **Imagery:** two photo-ready frames (hero, partner experience) are intentional
  placeholders — drop in real nurse / collection photography.
- Add real Privacy / Terms pages behind the footer links; add analytics.
- Optional production hardening: pre-compile the CSS so the file has zero external
  dependencies (currently styles load from the Tailwind CDN — fine to launch).
