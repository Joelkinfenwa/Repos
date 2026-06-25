# ALTR Patient Portal — Build Spec (MVP)

Stack: Next.js (App Router) · Supabase (Auth + DB) · Stripe · Vercel
Scope: MVP — auth + onboarding + portal home + blood-test hand-off + MANUAL status

This is the source-of-truth spec for the build. Hand it to Claude Code along with the three reference HTML prototypes. Claude Code should PORT the exact design of those prototypes into React/Next — same layout, copy, colours, type, components — not redesign.

## 0. REFERENCE FILES (the approved design — match these exactly)

- `altr-onboarding.html` — sign-up screen (free blood test hook, fields, consent)
- `altr-bloods-handoff.html` — post-signup "your test is ready" screen + full-screen menu
- `altr-patient-portal.html` — the portal home (journey, care team, results, program, updates)
- `altr-brand-system.html` — colour tokens, type scale, button system

Design is locked. Do not invent new styles. Extract the CSS variables and components from the prototypes.

## 1. NON-NEGOTIABLE PRINCIPLES (carry into the code)

1. The Dad Test. Every screen must be usable by a non-technical 55-year-old without thinking. One obvious next action per screen. Large tap targets. Plain English.
2. Strict black & white. Warm B&W palette only. Status colours (green/amber/red) appear ONLY as functional indicators inside the portal — never as decoration or branding.
3. One status field drives everything. The patient's journey stage decides the hero message, the primary action, and the reminders. This is the spine.
4. MediRecords is the future clinical source of truth. For MVP, status is set MANUALLY (admin updates a field). Architect so the data source can later swap to a MediRecords sync WITHOUT rebuilding the UI. The UI reads `patient.journey_stage` and never cares where it came from.
5. Mobile-first. Most patients are on phones. Build mobile, scale up.
6. Accessibility floor: visible keyboard focus, reduced-motion respected, semantic HTML.

## 2. DESIGN TOKENS (from altr-brand-system.html / portal prototype — strict warm B&W)

```css
--bg:#121110; --surface:#1A1917; --surface-2:#211F1C;
--hairline:#2A2825; --hairline-2:#363330;
--text:#F4F2EE; --text-2:#A8A39A; --text-3:#6E685E; --emph:#F4F2EE;
/* status — functional UI only */
--ok:#6E8A5A; --warn:#CE9A4F; --alert:#BC5E48;
--radius:10px; --radius-sm:8px;
--ease:cubic-bezier(.2,.6,.2,1);
/* font */
--font: 'Hanken Grotesk', system-ui, sans-serif;  /* weights 400-900 */
```

Use Tailwind with these as CSS variables (extend theme), or CSS modules — Claude Code's call, but the values are fixed.

## 3. THE JOURNEY STATUS ENUM (the spine — build first)

A single enum on the patient record. Everything keys off it.

```
journey_stage:
  'signed_up'        -> next: complete medical history (or book bloods if no history step)
  'bloods_ready'     -> next: download form + find centre   (hand-off screen)
  'bloods_pending'   -> next: nothing, "we'll let you know"  (waiting state)
  'results_review'   -> next: nothing, "doctor reviewing"    (waiting state)
  'consult_ready'    -> next: book consultation
  'plan_active'      -> next: ongoing — reviews, repeat bloods
```

The portal home reads this and renders the correct hero headline + primary CTA + reminders. For MVP an admin sets this value manually (see section 7).

## 4. DATA MODEL (Supabase / Postgres)

Keep it minimal for MVP. Supabase owns ACCOUNT + EXPERIENCE. Clinical data stays in MediRecords later — do NOT store blood results values in MVP, only document links/metadata.

```
profiles
  id (uuid, = auth.users.id)   pk
  full_name        text
  dob              date
  email            text
  mobile           text
  address          text
  journey_stage    text   default 'signed_up'   -- the spine
  care_coordinator text   default 'Sarah Whitlock'
  doctor_name      text
  created_at       timestamptz default now()

documents
  id            uuid pk
  profile_id    uuid fk -> profiles.id
  type          text   -- 'request_form' | 'results_summary' | 'doctor_letter' | 'invoice'
  title         text
  file_url      text   -- supabase storage signed url or external
  created_at    timestamptz default now()

appointments
  id          uuid pk
  profile_id  uuid fk
  type        text   -- 'consultation' | 'blood_collection'
  status      text   -- 'pending' | 'booked' | 'completed'
  scheduled_at timestamptz null
  created_at  timestamptz default now()

notifications        -- the "Recent updates" / "What's changed" timeline
  id          uuid pk
  profile_id  uuid fk
  message     text
  created_at  timestamptz default now()

memberships          -- billing status mirror (Stripe is source of truth)
  id                  uuid pk
  profile_id          uuid fk
  plan_name           text
  status              text   -- 'active' | 'paused' | 'cancelled'
  price_label         text   -- e.g. '$89 / week'
  next_billing_date   date
  stripe_customer_id  text
  stripe_subscription_id text
```

Row Level Security: ON for every table. A patient can only ever read/write their own rows (`auth.uid() = profile_id`). This is healthcare data — RLS is mandatory, not optional.

## 5. ROUTES (Next.js App Router)

```
/                      -> redirect: logged in -> /home, else -> /login
/signup                -> onboarding screen (altr-onboarding.html)  [public]
/login                 -> email + password sign in                  [public]
/home                  -> portal home (altr-patient-portal.html)    [auth]
/blood-test            -> hand-off screen (altr-bloods-handoff.html)[auth]
/documents             -> results & documents list                 [auth]
/program               -> membership & billing                      [auth]
/care                  -> care team / contact                       [auth]
/account               -> profile & details                         [auth]
/api/...               -> route handlers (Stripe webhook, etc.)
```

All `[auth]` routes protected by Supabase middleware — no session -> redirect to /login.

## 6. WHAT CONNECTS TO WHAT (MVP)

- Auth: Supabase email/password. Signup creates `auth.users` + `profiles` row.
- Stripe: Checkout for the program. Webhook updates `memberships`. (Can be stubbed in first pass and wired in a later prompt — see prompt sequence.)
- MediRecords: NOT integrated in MVP. `journey_stage` set manually.
- Documents: Supabase Storage bucket, signed URLs, RLS-protected.

## 7. MANUAL STATUS ADMIN (MVP only)

A minimal internal page at `/admin` (protected — allowlist of admin emails, or a simple Supabase role) where an ALTR staffer can:

- search a patient by email,
- change their `journey_stage`,
- add a document (upload + type),
- add a notification message.

Plain, ugly, functional. This replaces MediRecords sync for MVP. Keep it dead simple.

## 8. BUILD ORDER (do not skip ahead)

1. Scaffold Next.js + Tailwind + Supabase client + design tokens + Hanken Grotesk.
2. Supabase schema + RLS + seed one test patient.
3. Auth: /signup, /login, middleware, session.
4. Portal home /home driven by journey_stage (the spine).
5. Blood-test hand-off /blood-test + the full-screen menu component (shared nav).
6. Documents, program, care, account pages.
7. /admin manual status tool.
8. Stripe checkout + webhook.
9. Polish: loading states, empty states, error states, mobile QA, a11y pass.

## 9. DEFINITION OF DONE (MVP)

- A patient can sign up, log in, and see a portal home that correctly reflects their stage.
- An admin can move them through the stages and the home updates accordingly.
- Documents appear and download. Menu works on every screen. Looks identical to the prototypes. Passes the Dad Test on a phone. RLS verified (a patient cannot see another's data).
