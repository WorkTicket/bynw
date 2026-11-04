# Manos Creativas Bynmw — Next.js + Tailwind CSS

This is the editable Next.js project, not a folder of standalone HTML pages.

## Run locally (Windows, macOS, Linux)

Use Node.js 20.9 or later.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

```bash
npm run build
npm start
```

The production build exports the site to `out/`. Upload that folder to Cloudflare Pages or another static host. Build command: `npm run build`. Output directory: `out`.

The build includes optimized WebP assets, SEO metadata, `robots.txt`, `sitemap.xml`, a web manifest, and Cloudflare-compatible cache/security headers. Run `npm run optimize:images` after adding or replacing source artwork, then commit the generated `public/optimized/` files.

## Source files

- `app/page.jsx`: homepage composition.
- `app/globals.css`: Tailwind import and custom responsive styling.
- `app/layout.jsx`: App Router layout, metadata and local fonts.
- `app/coleccion-princesas/page.jsx`, `app/coleccion-premium/page.jsx`: the two product pages.
- `app/sobre-nosotras`, `app/testimonios`, `app/contacto`: supporting pages.
- `components/Sections.jsx`: shared sections and product-page composition.
- `components/Header.jsx`, `Gallery.jsx`, `Lightbox.jsx`, `ReviewForm.jsx`: React interactions.
- `lib/store.js`: collection details, prices, supplied Hotmart checkout links, testimonials and FAQ data.
- `public/assets`: included images, icons and local fonts.
- `next.config.mjs`, `postcss.config.mjs`: Next.js static export and Tailwind v4 configuration.

Only the Princesas and Premium 1,000+ collections are included. Prices are €9.90 and €14.87, with the original checkout links. Bundle graphics use the actual Google Drive folder screenshots. Natalia's supplied transparent PNG is included.

The supplied Spanish marketing wording is used for the hero, collections, benefits, guarantee, founder support, testimonials and about content. The other seven collections are intentionally excluded.

## Integration status

- Hotmart links are connected; checkout and paid-file delivery are handled by Hotmart.
- Contact email: `bynw808@gmail.com`.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` can connect WhatsApp when a number is supplied. Without it, the contact button uses the provided email.
- The actual free-pattern PDF was not supplied. No placeholder is presented as a real download.
- Reviews prepare an email for the visitor to review and send; there is no automatic publication, upload endpoint or review database.
- The 52 reviews and 14 customer photos are a static snapshot migrated from the previous live site, not a live review feed.

## Lead funnel setup

The `/recursos-gratis/` landing page and home lead section post to `/api/leads`. The Cloudflare Worker stores subscribers in D1 and can send a welcome email through Resend.

1. Create a D1 database: `npx wrangler d1 create bynmw-leads`.
2. Add the returned `database_id` to the commented `d1_databases` binding in `wrangler.toml`.
3. Initialize it: `npx wrangler d1 execute bynmw-leads --remote --file=schema.sql`.
4. Add `RESEND_API_KEY` as a Worker secret and `LEAD_FROM_EMAIL` as a Worker variable after verifying the sender domain in Resend.
5. Deploy with `npm run deploy`.

Without the D1 binding the form intentionally returns a configuration message instead of pretending that a subscriber was saved.

No passwords, API keys, repository credentials or payment secrets are included.
