# Express Pathology — B2B lead-generation website

A single-file, production-ready marketing site for **Express Pathology**, Australia's
mobile pathology collection & clinical nursing network. Built to convert B2B clients
(aged care, GP clinics, NDIS, insurers/IME, corporate health, clinical trials, telehealth,
hospital-in-the-home) into qualified leads.

## Quick start

It's a single static file — no build step.

```bash
# just open it
open express-pathology/index.html        # macOS
xdg-open express-pathology/index.html    # Linux

# or serve locally
python3 -m http.server 8000   # then visit http://localhost:8000/express-pathology/
```

## What's inside `index.html`

- **Hero** with animated gradient mesh, live-network badge, dual CTA and a glass "network at a glance" stat card (animated counters).
- **Trust marquee** of the sectors served.
- **Who we serve** — 6 B2B sector cards.
- **Services** — full mobile clinical capability grid (dark section).
- **Coverage** — animated national-network graphic (capital-city nodes + connecting lines) and live stats.
- **How it works** — 4-step process.
- **Why us** — differentiators + sticky highlight panel.
- **Stat band**, **testimonial**, **compliance/accreditation strip**.
- **Lead capture form** with inline validation, accessible errors, loading + success states.
- **FAQ** accordion, **final CTA**, full **footer**.

## Design system (data-backed)

Generated with the `ui-ux-pro-max` skill for *healthcare / medical / B2B / lead generation*:

| Token | Value | Use |
|------|-------|-----|
| Primary (navy) | `#0F172A` | Headlines, dark sections, primary buttons |
| CTA blue | `#0369A1` | Accents, links, primary action hover |
| Sky | `#0EA5E9` | Gradients, highlights |
| Medical teal | `#0D9488` | Accent, gradients |
| Verified/live | `#10B981` | Trust signals, "live" dots |
| Background | `#F8FAFC` | Page background |

- **Type:** Figtree (display) + Noto Sans (body) — the skill's recommended medical pairing.
- **Style:** "Accessible & Ethical" (WCAG-first) elevated with glassmorphism + subtle motion.
- Deliberately avoids neon and AI purple/pink gradients (flagged anti-patterns for healthcare).

## Accessibility & performance

- Skip link, semantic landmarks, sequential headings, ARIA on icon-only controls.
- All interactive targets ≥44px; visible focus rings; `prefers-reduced-motion` fully respected
  (animations and counters degrade to static).
- Form: visible labels, inline validation on blur, errors beside fields, `aria-live` success,
  semantic input types & autocomplete.
- Responsive at 375 / 768 / 1024 / 1440. No layout shift from animations (transform/opacity only).

## ⚠️ Before going live — replace placeholders

These are **demonstration placeholders** and must be confirmed/replaced:

- Phone `1300 000 000`, email `partnerships@expresspathology.com.au`, ABN.
- Statistics (520+ clinicians, 2,800+ postcodes, 99% SLA, 50k+ collections).
- Accreditation claims (AHPRA, NATA/ISO 15189, NDIS registration) — only state what you hold.
- Testimonial copy.
- **Form submission** is currently simulated client-side. Wire the `<form id="leadForm">`
  submit handler to a real endpoint (HubSpot/Salesforce form, Formspree, or your CRM API)
  so leads are actually captured.
- Add real Privacy Policy / Terms / Accessibility pages behind the footer links.

## Suggested next steps

- Connect the form to your CRM and add a thank-you/redirect + analytics conversion event.
- Add `sitemap.xml`, `robots.txt`, favicon and OG share image for SEO/social.
- Consider per-sector landing pages (e.g. `/aged-care`, `/ndis`) for paid-search lead gen.
