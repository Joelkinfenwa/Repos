# Add this as a landing page on Shopify (same domain)

This puts the page live at **`expresspathology.com.au/pages/partners`** — your existing
Shopify store and domain stay exactly as they are. No new hosting, no DNS changes.

It takes ~5 minutes. You'll do two things: (1) add a template, (2) create a page that uses it.

---

## Step 1 — Add the template to your theme

1. Shopify admin → **Online Store** → **Themes**.
2. On your current theme, click **⋯ (three dots)** → **Edit code**.
3. In the left sidebar find the **Templates** folder → **Add a new template**.
4. In the dialog:
   - **Create a new template for:** `Page`
   - **As:** choose **`liquid`** (not JSON)
   - **Name:** `partners`
   - Click **Create template**.
5. Shopify opens the new file `templates/page.partners.liquid` with some default content.
   **Select all of it and delete it**, so the file is empty.
6. Open **`shopify-page.partners.liquid`** from this repo, copy **everything** in it, and
   **paste** it into that empty Shopify template.
7. Click **Save**.

> What you're pasting already starts with `{% layout none %}` — that tells Shopify to show
> only this page (no store header/footer), so the design appears exactly as built.

---

## Step 2 — Create the page

1. Shopify admin → **Online Store** → **Pages** → **Add page**.
2. **Title:** `Partners` (or whatever you like — this affects the URL).
3. Leave the content box empty.
4. On the right, under **Theme template**, select **`partners`** (the template you just made).
5. Click **Save**.
6. Click **View page** (or **Preview**) — you'll see the full landing page at
   `…/pages/partners`.

That's it — it's live on your domain.

---

## Notes

- **The enquiry form works as-is.** It submits to your Formspree endpoint, so enquiries go
  to **express@expresspathology.com.au** regardless of where the page is hosted. (Approve
  Formspree's one-time confirmation email after the first real submission.)
- **Want it at a nicer URL** like `/partners` instead of `/pages/partners`? Shopify keeps
  pages under `/pages/…` by default; a navigation link or a redirect can point a cleaner
  path to it. Ask me and I'll explain.
- **Updating the page later:** when we change the site, copy the latest
  `shopify-page.partners.liquid` and paste it over the template again (Step 1, points 6–7).
- **Linking to it:** add it to your menu via **Online Store → Navigation**, or just share
  the `…/pages/partners` URL.
- If your theme blocks external scripts via a strict content policy (rare), the styling
  (Tailwind) loads from a CDN — tell me and I can inline everything so it has zero external
  dependencies.
