# assets/

Put your brand artwork here.

## Logo (required)

Save the Express Pathology logo you supplied as:

```
assets/express-pathology-logo.png
```

The site (nav + footer + browser-tab favicon) already points at this path. Until the
file is added, the header/footer automatically fall back to a simple text version of
the name — nothing will look broken.

Notes:
- A **PNG with a transparent background** works best (the logo sits on light backgrounds).
- An **SVG** is even better (sharper at any size). If you use SVG, name it
  `express-pathology-logo.svg` and change the two `<img src="assets/express-pathology-logo.png">`
  references (nav + footer) and the favicon `<link>` in `index.html` to `.svg`.
- Recommended height is ~40px in the header, so a source image around 400–600px wide is plenty.

## Optional
- `og-image.png` (1200×630) — a social-share preview image. If you add one, set
  `<meta property="og:image" content="https://yourdomain.com.au/assets/og-image.png">`
  in `index.html` (use the full https URL of your live site).
