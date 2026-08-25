# DIRA — Deshpande Immunology & Rheumatology Association

Marketing and patient-information site for a rheumatology and clinical
immunology practice. Nine static pages, no server, no database.

Design direction, compliance notes and the build schedule: `docs/dira-plan.html`.

---

## Before launch: fill in the clinic details

**Every unresolved detail lives in one file: `content/clinic.ts`** (plus one
field in `content/doctor.ts`). Nothing else needs editing.

```bash
npm run check      # lists exactly what is still missing, with hints
```

Anything left unfilled renders on the live page as a loud dashed
`[ADD PHONE NUMBER]` marker rather than silently showing nothing — so a
missed field cannot ship by accident.

Currently outstanding: 15 fields, including city, full address, phone,
WhatsApp, email, clinic timings, the MBBS college name, the medical council
registration number, and the production domain.

---

## Commands

```bash
npm run dev            # local development, http://localhost:3000
npm run build          # static export to out/
npm run check          # what clinic details are still missing
npm run check:contrast # verifies every colour pair against WCAG AA
npm run check:layout   # renders every page at 360/390/768px, reports overflow
npm run build:logo     # regenerates logo assets from public/logo.jpeg
npm run typecheck      # tsc --noEmit
```

`npm run build` writes plain HTML to `out/`. Deploy that directory to Vercel,
Netlify, Cloudflare Pages, or any static host.

`check:layout` needs Google Chrome installed and starts its own static server.
Note that Chrome's `--window-size` clamps to ~500px on macOS, so genuine phone
widths must be emulated — that is what `scripts/shoot.mjs` and the iframe-based
probe do. `node scripts/shoot.mjs <url> <out.png> <w> <h> <mobile> [yOffset]`
screenshots any page at real device metrics.

---

## Structure

```
app/                     one folder per page, App Router
  layout.tsx             fonts, metadata, header/footer, structured data
  globals.css            the whole design system — palette, type scale, components
  icon.png               favicon, generated from the logo
components/              header, footer, logo, icons, contact actions, form
content/
  clinic.ts              ← ALL placeholder details live here
  doctor.ts              qualifications, special interests, the personal note
  site.ts                nav, services, conditions, approach, FAQ
lib/schema.tsx           MedicalClinic + Physician + FAQPage structured data
docs/dira-plan.html      the design and build plan
scripts/                 the two verification scripts described above
```

## Design system

Defined once in `app/globals.css` and used everywhere — do not introduce ad-hoc
colours or font sizes in components.

- **Logo** — the supplied artwork lives at `public/logo.jpeg`. Everything else
  is derived from it by `npm run build:logo` (needs Python + Pillow):
  `public/logo-mark.png` (emblem alone, background removed), `public/logo-full.png`
  (full lockup with wordmark and tagline), `app/icon.png` (favicon).
  **To change the logo:** replace `public/logo.jpeg`, re-measure the two crop
  boxes at the top of `scripts/build-logo.py`, and re-run. Do not hand-edit the
  derived files — they are overwritten.
- **Palette** — sampled from the logo. Royal blue (`#123A83`) is the brand and
  fills the hero, footer and page bands. Blue, teal, green and plum colour-code
  the four condition families via the `cat-brand` / `cat-teal` / `cat-fresh` /
  `cat-plum` utilities, so colour encodes category rather than decorating the
  page. Amber (`#AC4A08`) is reserved for **actions only** — buttons and the
  placeholder markers — never as a category. Light and dark both defined.
- **Fixed backgrounds need fixed text colours.** Three token pairs exist because
  of this, and merging them breaks dark mode:
  - `--c-brand` is the *text* accent and goes light in dark mode;
    `--c-brand-surface` is the *band fill* and stays deep. Using `--c-brand` as a
    full-width background turns the hero into a bright slab in dark mode.
  - `--c-on-warm` is the label on the amber button. It is white in light mode and
    near-black in dark, because the amber itself goes light.
  - `--c-on-white` is the label on the fixed-white button that sits on the deep
    band. It never flips, because its background never flips.
- **Type** — Spectral (display), IBM Plex Sans (body), IBM Plex Mono (labels).
  Downloaded at build time and served from our own origin; no request ever
  leaves for a third-party font server.
- **Icons** — fifteen marks in `components/icons.tsx`, drawn for this site at one
  stroke weight. Do not add an icon library; draw what you need at the same
  weight instead.

### Changing a colour

Edit `scripts/check-contrast.mjs` first, run `npm run check:contrast`, and only
copy the values into `app/globals.css` once every pair passes. The palette was
designed against that check rather than eyeballed.

### Ask the designer for a vector logo

`public/logo.jpeg` is a raster on a white background with bevels and a drop
shadow baked into the pixels. Because of that the emblem sits on a white chip
wherever the surface behind it isn't already white, and it will never be
perfectly crisp at small sizes. **An SVG master, or a transparent PNG at 1024px
or larger, fixes both** and is a quick export for whoever produced it. Drop the
replacement in, re-run `npm run build:logo`, and the site picks it up.

## Deliberate choices worth knowing about

- **No booking system.** WhatsApp deep link first, phone second, form third.
  The form composes a message and hands it to WhatsApp or the patient's email
  client — nothing patient-identifying is transmitted to or stored on this site.
- **No cookie banner, chat widget, newsletter pop-up or analytics tracker.**
- **No patient testimonials, superlatives, or success rates** anywhere, and the
  medical council registration number is displayed. Advertising by registered
  medical practitioners in India is restricted — see `docs/dira-plan.html`,
  Section 08. Keep new copy within these limits.
- **No stock photography.** Portrait slots are built and show a visible
  `[ADD PORTRAIT OF DR DESHPANDE]` marker until real images exist. When they are
  added they must be of the actual clinic and the actual doctor — see Section 05
  of the plan for why this matters more than anything else here.
- **"DIRA" is also a rare autoinflammatory disease** (Deficiency of the
  Interleukin-1 Receptor Antagonist). The clinic will never rank for the bare
  acronym, so every page title pairs the name with the speciality and the city.
  Keep it that way in any new page.

## Accessibility

Keyboard navigable throughout with visible focus states, a skip link, labelled
form fields with error messages tied via `aria-describedby`, and generous tap
targets — patients with inflammatory arthritis may have real difficulty with
fine pointer control. The mobile menu and the FAQ accordion are `<details>`
elements, so they work without JavaScript.
