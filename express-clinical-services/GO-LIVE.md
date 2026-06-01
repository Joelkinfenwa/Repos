# Go live — Express Clinical Services (plain-English guide)

You have **your own web host** and **your own domain**, and you want enquiries
**emailed straight to you**. That makes this a 3-step launch. No coding required.

Total time: ~20–30 minutes.

---

## Step 1 — Turn the form into real email (Formspree)

The form is already wired to work with **Formspree** (a free service that emails you
each submission). You just need to plug in your own ID.

1. Go to **https://formspree.io** → **Sign up** (free plan is fine to start).
2. Use the email address where you want enquiries to land (e.g. your work inbox).
3. Click **+ New form**, name it `Express Clinical Services`, and set the destination
   email to your inbox.
4. Formspree gives you an endpoint that looks like:
   `https://formspree.io/f/abcdwxyz`  ← the part after `/f/` is **your form ID**.
5. Open `index.html` in any text editor, press **Find** and search for:
   `YOUR_FORM_ID`
   You'll find it once, here:
   ```html
   <form id="leadForm" method="POST" action="https://formspree.io/f/YOUR_FORM_ID" ...>
   ```
   Replace `YOUR_FORM_ID` with your real ID, e.g.:
   ```html
   action="https://formspree.io/f/abcdwxyz"
   ```
6. Save the file.

> The first time a real enquiry is submitted, Formspree emails you to confirm the
> form once. After that, every submission lands in your inbox automatically.

**Don't want to edit code?** Send me your Formspree form ID and I'll plug it in for you.

---

## Step 2 — Update the placeholder details

Still in `index.html`, do a Find-and-Replace for these (they appear a few times):

| Find | Replace with |
|------|--------------|
| `1300000000` and `1300 000 000` | your real phone number |
| `partners@expressclinical.com.au` | your real contact email |

Also worth checking:
- The coverage chips in the hero (`Sydney`, `Melbourne`, `Brisbane`, `Perth`, `+ metro`)
  — edit to match where you actually operate.
- The two image placeholders (hero + "partner experience" section) — ideally swap in real
  nurse/collection photos later (see Step 4). The site looks complete without them for now.

---

## Step 3 — Upload it to your host

How you upload depends on your host, but the file to publish is just **`index.html`**.

**Common hosts:**
- **cPanel / shared hosting:** Log in → **File Manager** → open `public_html`
  (your website's root folder) → **Upload** `index.html`. If you want this to be your
  homepage, it should sit in the root as `index.html` (it will then show at
  `https://yourdomain.com.au`). To put it on a sub-page instead, upload it into a
  subfolder, e.g. `public_html/partners/` → shows at `yourdomain.com.au/partners/`.
- **WordPress site:** easiest is to put it on a subdomain or subfolder via your host's
  File Manager (above), rather than inside WordPress. Or tell me and I'll suggest the
  cleanest approach for your setup.
- **Squarespace / Wix / Shopify:** these don't allow raw HTML uploads as a full page.
  If that's your host, tell me — I'll give you the right path (usually a dedicated
  landing-page host or a subdomain).

Because you already own the domain and it points at your host, **as soon as the file is
uploaded it's live at your web address.** Visit it in your browser to confirm.

---

## Step 4 (optional, recommended soon)

- **Real photography** — replace the two placeholder image frames with real nurse /
  collection photos for maximum credibility.
- **Privacy & Terms pages** — the footer links point to `#`; add real pages.
- **Analytics** — add Google Analytics or similar so you can see traffic and enquiries.
- **Production polish** — the site currently loads its styling from a CDN (fine to launch).
  For a fully self-contained, faster file, I can pre-compile the styles so it has zero
  external dependencies. Ask me when you're ready.

---

## Quick test checklist (after uploading)

- [ ] Page loads at your domain and looks right on a phone and a laptop.
- [ ] Phone number and email show your real details.
- [ ] Fill in the form with a test enquiry → you receive the email.
- [ ] Click "Book a partner call" / phone / email links — they work.

If anything's off, tell me what you see and I'll fix it.
