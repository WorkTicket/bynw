# Dev Instructions for Coding Agent

You are building a professional, polished e-commerce/marketing website for
**Manos Creativas Bynmw**, a real handmade-crochet-pattern business, based on
this boilerplate. The reference site is https://www.craftingpattern.com/ (a
Shopify store) — your job is to recreate its spirit (warm, crafty, feminine)
but make it look noticeably more professional, modern, and fast, using
Next.js (App Router) + Tailwind CSS, deployed to Cloudflare Pages with
Cloudflare Workers for any backend logic.

Real business content (copy, pricing, images, links) is provided in §0 below
and in `public/images/`. Use this real data instead of placeholders wherever
it's given — only invent placeholder content for things explicitly not
covered (e.g. legal page boilerplate, About page story details beyond what's
given).

Read this whole file before writing code.

## 0. Real business content

**Business name:** Manos Creativas Bynmw
**Niche:** Digital, downloadable crochet patterns (PDF), in Spanish.
**Site language:** All copy should be in Spanish (the source content below is
in Spanish — keep it in Spanish, don't translate to English).
**Owner / contact person:** Natalia
**WhatsApp:** https://wa.me/573008504709
**Social links:**
- TikTok: https://www.tiktok.com/@bynmw8
- Instagram: https://www.instagram.com/bynmw12_
- Facebook: https://www.facebook.com/share/1L3pLJdqvm/

**Logo:** `public/images/LOGO.jpeg`

**Mission statement (use on /about and/or homepage):**
"Empoderar a tejedores de todo el mundo mediante recursos digitales
educativos y prácticos, facilitando la creación de productos artesanales de
alta calidad que conviertan su pasión por el crochet en un proyecto exitoso
o en piezas especiales llenas de significado."

**What they sell:** Specialized digital crochet pattern collections —
step-by-step PDF guides — currently 3 collections (100+ Chenille
Amigurumis, 200+ Disney Princesses, 200+ Eternal Flowers), each bundled with
exclusive bonus patterns/guides. Delivery is automatic via email immediately
after payment (Hotmart handles checkout/delivery).

**Target customers:** Crochet enthusiasts of all levels, from beginners
wanting clear guides to experienced makers wanting to expand their catalog.

**Differentiator:** Step-by-step precision and ease of following, plus
exclusive bonus gifts with every purchase.

**Homepage intro / general title:** "Colección Maestra de Patrones de
Amigurumis y Flores en Crochet" — hero image: `public/images/IMAGEN 1.jpeg`

**Beginner-friendly callout section** (use near top of homepage):
Title: "APRENDE DESDE CERO: ¡IDEAL PARA PRINCIPIANTES!"
Copy: Every package includes theoretical-practical videos for beginners
covering every crochet abbreviation/stitch, so customers can confidently
read and follow the patterns from day one.
Image: `public/images/IMAGEN 19.jpeg`

### Product 1 — Princesas Disney
- Title: "Colección de más de 200 Patrones de Princesas Disney + 16 bonos de regalo"
- Price: ~~60€~~ **11€**
- Buy button text: "OBTENER ACCESO INMEDIATO"
- Buy link (Hotmart): https://pay.hotmart.com/L104751068L?off=8o21yf1f
- Carousel images (2s autoplay): `IMAGEN 2.jpeg`, `IMAGEN 2.1.jpeg`, `IMAGEN 2.2.jpeg`, `IMAGEN 2.3.jpeg`
- Small caption under carousel: "Y muchos diseños exclusivos más…"
- Description: "La Colección Maestra de Princesas Disney es un compendio
  digital diseñado para artesanas que buscan elevar la calidad de sus
  creaciones en crochet. Con más de 200 patrones únicos, este material
  técnico proporciona instrucciones detalladas para la elaboración de
  personajes icónicos, garantizando acabados de alta gama y resultados
  consistentes."
- Specs: Contenido: 200+ patrones digitales · Idioma: Español · Formato: PDF
  descargable e imprimible · Entrega: acceso inmediato por correo tras el pago.
- Bonus gifts image: `IMAGEN 3.jpeg`. 9 numbered bonuses (Amigurumis bebés,
  Amigurumis, patrones día del niño, muñecos para abrazar, sonajero y
  mantas, bolsas, mantas, almohadones, animalitos) plus extra gifts on
  `IMAGEN 4.jpeg` (muñecas reversibles, guía de empaque, guía de fotografía,
  50 llaveros, Stitch y novia, Virgen del Carmen, Virgen de Guadalupe, guía
  de abreviaturas, 16 patrones de animalitos, 100 patrones amigurumis).
- "How delivery works" 3-step explainer + carousel (2s autoplay):
  `IMAGEN 5.jpeg` through `IMAGEN 5.9.jpeg`
- Quality showcase carousel (2s autoplay): `IMAGEN 6.jpeg`, `6.1`, `6.2`, `6.3`
- Payment-methods small image under buy button: `IMAGEN 7.jpeg`
- Trust badges: "🛡️ PAGO 100% SEGURO — SOCIO OFICIAL DE PAGOS: HOTMART."

### Product 2 — Flores Eternas en Crochet
- Title: "Colección de más de 200 Patrones de Flores Eternas en Crochet"
- Price: ~~60€~~ **12€**
- Buy button text: "OBTENER ACCESO INMEDIATO"
- Buy link (Hotmart): https://pay.hotmart.com/O106393812M?off=nfyomffe
- Carousel images (2s autoplay): `IMAGEN 8.jpeg`, `8.1`, `8.2`
- Caption: "Y muchos diseños exclusivos más…"
- Description: "Compendio digital de alta gama diseñado para artesanas que
  buscan crear hermosas flores en crochet con acabados profesionales,
  listos para tejer y vender."
- Content: 200+ patrones (tulipanes, girasoles, margaritas, rosas, cactus,
  azucenas, claveles, campanillas, lirios, orquídeas, plantas, macetas, etc).
- Extras: video tutorial para armar ramos con papel coreano + videos
  teórico-prácticos para principiantes.
- Bonus image: `IMAGEN 9.jpeg`, 14 bonuses (Amigurumis religiosos, Mochi,
  Rosita Fresita, Harry Potter, Frozen, muñecas de flores reversibles,
  Chavo del 8, Caperucita Roja, Eva y Wall-e, Lilo y Stitch).
- Delivery carousel (2s autoplay): `IMAGEN 10.jpeg` through `10.8.jpeg`
- Quality carousel (2s autoplay): `IMAGEN 11.jpeg`, `11.1`–`11.4` (note: file
  is literally named "IMAGEN 11,1.jpeg" with a comma — rename or reference
  carefully)
- Payment image: `IMAGEN 7.jpeg`

### Product 3 — Amigurumis en Chenille
- Title: "Colección de más de 100 Patrones de Amigurumis en Chenille"
- Price: ~~60€~~ **11€**
- Buy button text: "OBTENER ACCESO INMEDIATO"
- Buy link (Hotmart): https://pay.hotmart.com/A104843589W?off=a9plv7ym
- Carousel images: `IMAGEN 12.jpeg`, `12.1` (note file is "IMAGEN 12,1.jpeg")
- Description: "Compendio digital de alta gama con más de 100 patrones de
  personajes favoritos, diseñado para artesanas que buscan elevar la
  calidad de sus creaciones en Chenille con acabados profesionales, listos
  para tejer y vender."
- Specs: 100+ patrones únicos · PDF · Español.
- Bonus image: `IMAGEN 13.jpeg`, 11+ bonuses (mini amigurumis, conejo orejas
  largas, 2 abejitas, Stitch en chenille, tulipán, 50 amigurumis
  adicionales, rosa Antonella, Piggy, guía de ejercicios, princesa Ariel).
- Delivery carousel: `IMAGEN 14.jpeg` through `14.5.jpeg`
- Quality carousel: `IMAGEN 15.jpeg`, `15.1`–`15.3`
- Payment image: `IMAGEN 7.jpeg`

### WhatsApp support section
- Title: "¿NECESITÁIS AYUDA CON VUESTRO PEDIDO?"
- Image: `IMAGEN 16.jpeg`
- Copy: "Si tenéis alguna duda sobre el proceso de pago o el acceso a
  vuestros patrones, escribidnos. Soy Natalia, de Manos Creativas, y estoy
  aquí para guiaros personalmente en cada paso."
- Button: "MAS INFORMACION" → https://wa.me/573008504709

### Guarantee section
- Image: `IMAGEN 17.png`
- Copy: "GARANTÍA DE 7 DÍAS — Inversión segura. Si no estáis satisfechas con
  la calidad de nuestros patrones, os devolvemos el dinero sin preguntas."

### Reviews / testimonials section
- Title: "VUESTRA FELICIDAD ES NUESTRA PRIORIDAD"
- Carousel (2s autoplay): `IMAGEN 18.jpeg` through `18.5.jpeg`
- Copy: "GARANTÍA DE SATISFACCIÓN TOTAL. No hay nada que nos haga más felices
  que ver a nuestras clientas disfrutando de sus labores. Vuestra confianza
  es nuestro motor diario."

**Note on filenames:** two image files in `public/images/` have commas
instead of dots in their names ("IMAGEN 11,1.jpeg", "IMAGEN 12,1.jpeg") and
several have spaces and mixed casing — rename them to URL-safe kebab-case
(e.g. `imagen-11-1.jpeg`) as part of setup, and update references
accordingly, rather than fighting with spaces/commas in `<img src>` paths.

## 1. Stack & constraints

- Framework: Next.js 14 (App Router), TypeScript.
- Styling: Tailwind CSS only. Do not add a second UI/CSS framework.
- Hosting: Cloudflare Pages. Build adapter: `@cloudflare/next-on-pages`.
- Every route/page that needs to run server-side on Cloudflare MUST export
  `export const runtime = "edge";`. The Node.js runtime does NOT work on
  Cloudflare Pages — only the Edge runtime is supported. Pages/components
  that are fully static do not need this.
- No Node-only APIs (fs, child_process, etc.) anywhere in app code — these
  will break the Cloudflare build.
- Images: `next/image` optimization is disabled in `next.config.js`
  (`images.unoptimized: true`) because Cloudflare Pages has no built-in image
  optimizer. Either use plain `<img>` tags, or wire up Cloudflare Images /
  an external image CDN later.
- Color theme: pink, defined in `tailwind.config.js` under the `brand`
  color scale (50–950) plus `cream` (background) and `ink` (text). Always use
  these theme tokens (`bg-brand-500`, `text-ink`, etc.) instead of hardcoded
  hex values or Tailwind's default `pink-*` palette, so the whole site stays
  consistent and easy to re-theme later.

## 2. What's already in the boilerplate

- `app/layout.tsx` — root layout, fonts (Inter + Playfair Display), header/footer.
- `app/page.tsx` — homepage assembling Hero, FeatureGrid, ProductGrid, Testimonials, ContactForm.
- `app/api/contact/route.ts` — Edge API route stub for the contact form (logs to console; needs a real email integration, see §5).
- `components/` — Header, Footer, Hero, FeatureGrid, ProductGrid, ProductCard, Testimonials, ContactForm.
- `tailwind.config.js` — pink "brand" theme.
- `wrangler.toml` — Cloudflare Pages config.

This is intentionally a skeleton with placeholder copy/images. Your job is to
flesh it out into a complete, professional site.

## 3. Pages to build out

Create these as new folders under `app/` (each with its own `page.tsx`,
`export const runtime = "edge"` if it fetches data or handles forms):

1. `/` — homepage (already scaffolded, refine content/imagery).
2. `/shop` — full product listing/grid with filtering by category if there's
   more than ~12 products. Pull from whatever product data source is chosen
   in §4.
3. `/shop/[slug]` — individual product/pattern detail page: images, price,
   description, skill level, materials needed, and a clear purchase/download
   CTA.
4. `/about` — the business's story, photo of the owner/maker, mission.
5. `/contact` — larger version of the contact form plus business hours,
   email, and (if applicable) social links.
6. `/cookies-policy`, `/refund-policy`, `/terms` — simple static legal pages.
   Use clear placeholder legal text and flag to the human that a lawyer
   should review before launch.

Keep the same Header/Footer across all pages by leaving them in `app/layout.tsx`.

## 4. Product data & checkout — DECIDED: Option C (Hotmart)

This is resolved — no need to ask the human. The business already sells via
**Hotmart** (digital-download checkout, not Shopify, not Stripe). There are
only 3 products today, each with a real Hotmart payment link (see §0). This
matches "Option C — digital downloads only, no live store": each product
page/card is just a buy button linking straight to its Hotmart checkout URL.
No cart, no custom payment integration, no D1/Stripe needed.

Replace the placeholder `products` array in `components/ProductGrid.tsx`
with the 3 real products from §0 (id, name/title, price, image, and a
`buyUrl` field for the Hotmart link). `ProductCard.tsx` should render the
buy button as a plain `<a href={buyUrl}>` (external link, opens Hotmart's
hosted checkout) rather than any internal cart/checkout route.

If the business adds more products later, the same pattern (one Hotmart
link per product) should still work — just keep the data source easy to
extend (a local JSON/TS array is fine for this catalog size, well under the
~50-product threshold for needing a database).

## 5. Contact form → email

`app/api/contact/route.ts` currently only logs submissions. Wire it to an
actual email/notification service that works on Cloudflare Workers' edge
runtime (do NOT use nodemailer — it requires Node APIs and will not run on
Workers). Recommended, in order of simplicity:

1. **Resend** (https://resend.com) — plain `fetch()` call to their REST API,
   works natively on Workers. Store the API key as a Cloudflare secret
   (`wrangler secret put RESEND_API_KEY`), never commit it.
2. **Cloudflare Email Workers** — native Cloudflare email routing.
3. A webhook to Slack/Discord/Zapier if the business owner wants
   notifications somewhere other than email.

Add basic spam protection: a honeypot field, and/or Cloudflare Turnstile
(free CAPTCHA alternative, integrates cleanly with Pages).

## 6. Visual polish checklist

The current boilerplate is functional but plain — your job is to make it
feel premium, not templated:

- Replace every placeholder image block with real photography (product
  shots, lifestyle photos of finished crochet pieces, a photo of the maker).
  Until real images exist, use a small set of consistent, high-quality
  stock/AI-generated placeholders rather than gray boxes.
- Add subtle motion: fade/slide-in on scroll for sections (e.g. via
  `framer-motion` — fine to add as a dependency since it works on Pages/edge
  for client components), hover states on cards and buttons, smooth
  transitions on the sticky header.
- Typography: lean into the `font-display` (Playfair Display) for headings
  and `font-sans` (Inter) for body text — this pairing is already wired up,
  use it consistently.
- Make sure the pink theme reads as elegant, not childish: use `brand-500/600`
  for primary actions and accents, `brand-50/100` for soft backgrounds, and
  plenty of white/cream space. Avoid using saturated pink for large blocks of
  text or backgrounds.
- Mobile-first: test every page at 375px width before considering it done.
  The mobile nav menu (hamburger) is not yet built in `Header.tsx` — add it.
- Add an `og:image` and proper metadata per page using Next's `Metadata` API
  (each `page.tsx` can export its own `metadata` object) for good link
  previews on social/Facebook (the client likely shares links via Facebook,
  per the original URL's fbclid tracking param).

## 7. Performance & SEO

- Use `next/font` (already set up) — never load fonts via a `<link>` tag.
- Add `app/sitemap.ts` and `app/robots.ts` once the final domain is known.
- Add structured data (JSON-LD `Product` schema) on product pages once real
  product data exists — this matters a lot for an e-commerce site's SEO.
- Run Lighthouse before calling any page "done"; target 90+ on Performance,
  Accessibility, Best Practices, SEO.

## 8. Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Visit http://localhost:3000.

## 9. Deploying to Cloudflare Pages

First-time setup:

```bash
npm install -g wrangler   # or use npx wrangler
wrangler login
```

Build and preview locally against the Cloudflare runtime (catches edge-runtime
bugs that `next dev` won't):

```bash
npm run preview
```

Deploy:

```bash
npm run deploy
```

Or connect the GitHub repo directly in the Cloudflare dashboard
(Pages → Create a project → Connect to Git) and set:

- Build command: `npx @cloudflare/next-on-pages`
- Build output directory: `.vercel/output/static`
- Add any secrets (e.g. `RESEND_API_KEY`) under Settings → Environment Variables.

After the first deploy, connect the custom domain under
Pages → Custom domains, and update `NEXT_PUBLIC_SITE_URL` accordingly.

## 10. Things to flag to the human, not assume

Most of the previously-unknown items are now answered in §0 (business name
Manos Creativas Bynmw, logo at `public/images/LOGO.jpeg`, real product
catalog/pricing/Hotmart links, pink brand theme already in
`tailwind.config.js`). Still flag/confirm:

- Final domain (none specified yet — `NEXT_PUBLIC_SITE_URL` and
  `wrangler.toml` need it once chosen).
- Legal page content (terms, refund/cookies policy) — still placeholder
  only, needs a lawyer's review before launch. Refund policy should mention
  the 7-day guarantee from §0 as a starting point.
- Whether the owner wants email notifications (via Resend, §5) sent to a
  specific inbox, and whether WhatsApp (already used for support, §0) should
  also be the contact-form fallback instead of email.
- The "About" page needs a maker bio/story beyond the mission statement in
  §0 — ask the human (no owner photo or personal story was included in the
  source material besides the WhatsApp intro from Natalia).
