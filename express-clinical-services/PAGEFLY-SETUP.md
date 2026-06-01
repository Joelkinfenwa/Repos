# Publish the landing page with PageFly (same domain)

You have two good ways to get this live on `expresspathology.com.au`. Both keep your domain.

---

## Option A (recommended) — Shopify page template, no PageFly needed

This is the most reliable: the page renders exactly as designed. See
**`SHOPIFY-SETUP.md`** — it takes ~5 min and lives at `…/pages/partners`. PageFly keeps
running your other pages; this just sits alongside it. Use this if you want it to look 100%
as built with no fuss.

---

## Option B — Inside PageFly (HTML element)

Use this if you'd rather keep everything in PageFly.

1. **PageFly** → **Pages** → **Create page** → **Regular Page** → start **Blank**.
2. Open **Page Settings** (gear icon) and **hide the theme header and footer** (PageFly has
   toggles for "Hide header" / "Hide footer"), so the design shows on its own.
3. From the left elements panel, drag an **HTML** element onto the blank page (make it
   full-width / full-container).
4. Open **`pagefly-embed.html`** from this repo, copy **everything**, and paste it into that
   HTML element's code box. Save.
5. **Publish** the PageFly page. Open the **live/published** URL to check it (the styling is
   loaded by a script, so it may look unstyled inside PageFly's editor but render correctly
   once published).
6. In PageFly page settings, set the **URL handle** (e.g. `partners`) and the **SEO title /
   description**. Add it to your menu via **Shopify → Online Store → Navigation** if you want.

### If it doesn't render right in PageFly
PageFly sometimes sanitises `<script>` inside HTML elements. If the styling doesn't show on
the published page:
- Move the two `<script>` tags at the **top** of `pagefly-embed.html` (the
  `cdn.tailwindcss.com` line and the `tailwind.config = …` block) into PageFly's
  **Page Settings → Custom Code → Header/HTML** section, and keep the rest in the HTML element.
- Or just use **Option A** (theme template), which has none of these limitations.

---

## Works either way
- The enquiry **form already submits to your Formspree endpoint**, so leads reach
  **express@expresspathology.com.au** no matter how the page is published. (Approve
  Formspree's one-time confirmation email after the first submission.)
- The logo is embedded in the code, so it needs no uploaded file.
- Want me to **inline the Tailwind styles** (so there are zero external scripts and it's
  immune to any PageFly script-sanitising)? Say the word and I'll build that version.
