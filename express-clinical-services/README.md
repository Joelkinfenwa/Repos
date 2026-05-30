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

## ⚠️ Before going live — replace placeholders

- **Imagery:** two photo-ready frames (hero, partner experience) are intentional
  placeholders. Drop in real nurse / collection photography (the brief specifically
  wants real imagery, not fake dashboards).
- **Contact:** phone `1300 000 000`, email `partners@expressclinical.com.au`.
- **Form submission is simulated client-side.** Wire `<form id="leadForm">` to your CRM
  / HubSpot / Formspree endpoint so partner enquiries are actually captured, and add a
  conversion event.
- Add real Privacy / Terms pages behind the footer links.
- Confirm any coverage claims (city chips) reflect actual serviced areas.
