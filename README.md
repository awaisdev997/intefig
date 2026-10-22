# INTEFIG — Premium 3D Website Redesign

A premium, immersive 3D redesign of the INTEFIG website — an email / SMS retention agency site rebuilt as a high-end 2026 digital experience with React Three Fiber scenes, scroll-driven service transitions, and cinematic micro-interactions, while preserving INTEFIG's real brand, services, statistics, testimonials, partners, and contact details.

## Brand source

Palette and content were extracted from the live site at **intefig.com on 2026-10-22**:

- Sage greens: `#EBF5DD` (page background), `#D3E0C9`, `#9AB395`, `#88A286`, `#7A957E` (dark sections / footer)
- Ink: `#3B3F42` primary text, `#232628` darkest sections
- Terracotta accent: `#C8401B` (hover `#A83315`), white cards
- All statistics, testimonials, partners, team, and contact facts are taken verbatim from the live site / brief — nothing is invented. Dashboard values in the Results section are explicitly labelled “Illustrative”.

Typography: **Sora** (display, tight tracking) + **DM Sans** (body), loaded from Google Fonts.

## Stack

- React 18 + TypeScript (strict) + Vite 5
- Three.js via React Three Fiber v8 + Drei v9 (lazy-loaded scenes)
- Framer Motion 11 (UI, reveals, page transition, testimonial depth transitions)
- Anime.js 3 (stat counters, hero utilities)
- Lenis (smooth scrolling, disabled under reduced-motion)
- Tailwind CSS v3, Lucide icons

## Run

```bash
npm install
npm run dev      # development server
npm run build    # tsc --noEmit + production build into dist/
npm run preview  # preview the production build
```

## Routing & deployment

The site is a client-routed SPA (react-router-dom). Routes: `/` (home — the
original single-page sections), `/services` (detailed services, deep-linkable
per service as `/services#<slug>`), `/team`, `/contact`, and a branded 404 for
everything else. In-page home sections are addressed as `/#about`, `/#work`,
`/#testimonials`.

Because routing happens in the browser, the static host must serve the app
for deep links. A `public/404.html` shim is included (the spa-github-pages
pattern, `pathSegmentsToKeep = 0`): unknown paths bounce to `index.html` with
the path encoded in the query string, and a restore snippet in `index.html`'s
`<head>` turns it back into the real URL before the app boots. On Vercel or
Netlify, a rewrite of all paths to `/index.html` does the same job — no shim
needed there.

## Architecture

```
src/
  data/content.ts          # all content, separated from presentation
  components/              # Navbar, Hero, Services, About, Stats, Partners,
                           # Testimonials, Results, Process, Contact,
                           # Newsletter, Footer, CustomCursor, Loader, …
  components/three/        # MarketingScene, ServiceObjects, CameraRig,
                           # FloatingNodes, DataNetwork, ParticleField
  hooks/                   # useScrollProgress, useMousePosition, useMagnetic,
                           # useReducedMotion, useDevicePerformance, useInView
  animations/              # hero / service / text / page-transition variants
```

- **Services** is a pinned (sticky) tall section on desktop: scroll progress selects service 01–06 and the R3F scene morphs (rotation / scale / colour) between them; hover/focus gives a list item depth.
- **Hero** shows a floating marketing ecosystem (Email → Automation → Data → Customers → Revenue) with curved dashed connections and a mouse-parallax camera rig.
- **About** orbits EMAIL / CREATIVE / DATA / AUTOMATION / STRATEGY / RESULTS around a 3D core.

## Performance

- All Canvas scenes are `React.lazy` + `Suspense` with a CSS-3D fallback.
- Canvases only animate while their section is in the viewport (`frameloop` toggled via IntersectionObserver).
- `dpr={[1, 1.75]}`, low particle counts on mobile / low-core devices, sparse particles, no continuous off-screen rendering.
- Manual chunks split Three.js and motion libraries out of the main bundle.

## Accessibility & fallbacks

- Semantic HTML, heading hierarchy, aria labels, focus-visible styles, keyboard-focusable service list, skip link.
- `prefers-reduced-motion`: Lenis, heavy 3D, parallax, and the custom cursor are disabled; counters and content remain fully accessible.
- If WebGL is unavailable, tasteful CSS-3D/static fallbacks render instead of any Canvas.
- Custom cursor only appears on fine-pointer devices.
- Contact and newsletter forms POST to the existing Formspree endpoint with success/error states.

## Refinement pass — 2026-10-22

- Hero node labels now render as 3D text on the card faces (per-label card widths), using Sora Bold bundled locally (`src/data/labelFont.ts`) instead of a runtime CDN font; each label is isolated in its own `Suspense` so a label can never blank the scene. Node motion was calmed (bob 0.055, sway ≤0.05 rad) and the camera reframes on narrow canvases (`ResponsiveFraming`) so edge cards never clip on mobile.
- Services scene rebuilt: the rotating slab carousel is now a constant central "UI card" whose accent bar lerps to the active service colour, with five satellite nodes damped between per-service layouts and a thin ellipse ring that no longer intersects geometry.
- About/Contact cores: faceted flat-shaded icosahedra replaced with smooth physical-material spheres (clearcoat, subtle wireframe shell on About); orbit words moved out of the 3D scene into an accessible HTML chip row; lighting softened (hemisphere fill, point intensities 12/10 → 6/5).
- Team section now uses the real portraits published on intefig.com (`src/data/teamPhotos.ts`, WebP, lazy-loaded as a separate chunk), matched to each member by the source site's own team ordering; the founder card uses the site's founder portrait. One exception: the photo served in Abdur Rafy's slot on the source site is a generic stock image that cannot be verified as him, so his card intentionally uses a monogram placeholder until a real photo is provided.

## Lottie animations

The site's section illustrations are now lightweight Lottie animations (via `lottie-react`) instead of Three.js/WebGL scenes — Three.js, React Three Fiber and Drei were removed from the project entirely. All animations are rendered by the reusable `src/components/LottieIllustration.tsx`: each animation's JSON lazy-loads as its own chunk only when its section approaches the viewport (the hero animation loads eagerly), playback pauses while off-screen, and under `prefers-reduced-motion` no animation autoplays — a single static frame (~55% through the animation) is shown instead. If an animation fails to load, its section simply renders without it.

Colors in the animations below were adapted to the INTEFIG brand palette (sage / ink / terracotta). All are free animations used under the **Lottie Simple License** (commercial use permitted; attribution is not required and is credited here voluntarily).

| File | Animation | Author | Source | License |
| --- | --- | --- | --- | --- |
| hero-envelope.json | mail | Andrea Fortuna | https://lottiefiles.com/free-animation/mail-mByfOKyVpN | Lottie Simple License |
| email-campaigns.json | Successful mail | mohan | https://lottiefiles.com/free-animation/successful-mail-ZXFSWJuL8c | Lottie Simple License |
| ecommerce-automation.json | ecommerce blue | Brendan Stanton | https://lottiefiles.com/free-animation/ecommerce-blue-uoxZDjqcp8 | Lottie Simple License |
| sms-automation.json | Chat / Messenger | Ali | https://lottiefiles.com/free-animation/chat-messenger-8k9G6ELAMG | Lottie Simple License |
| tools-integration.json | Settings icon | Poritos Roy | https://lottiefiles.com/free-animation/settings-icon-OLsDEyaAJi | Lottie Simple License |
| landing-pages.json | List | Creative | https://lottiefiles.com/free-animation/list-vAak6TBfEY | Lottie Simple License |
| lead-generation.json | Email capture | LottieFiles free library (email marketing collection) | https://lottiefiles.com/free-animations/email-marketing | Lottie Simple License |
| global-network.json | Internet or Website | Grabill Ribble | https://lottiefiles.com/free-animation/internet-or-website-vEdSeWqmIZ | Lottie Simple License |
| contact-message.json | Inbox message animation | Poritos Roy | https://lottiefiles.com/free-animation/inbox-message-animation-BB63H1d1YZ | Lottie Simple License |

Where each animation is used:

- **Hero** — `hero-envelope.json`, above the headline, with the five pipeline labels (EMAIL, AUTOMATION, DATA, CUSTOMERS, REVENUE) as gently floating HTML pills.
- **Services** — one animation per service in the scroll-pinned panel, crossfading as the active service changes: Email Campaigns → `email-campaigns.json`, eCommerce Automation → `ecommerce-automation.json`, SMS Automation → `sms-automation.json`, Tools Integration → `tools-integration.json`, Landing Pages → `landing-pages.json`, Lead Generation / Surveys → `lead-generation.json`.
- **About** — `global-network.json` in the framed area above the discipline chips.
- **Contact** — `contact-message.json` on a light panel beside the form (the ink line-draw needs a light ground on the dark section).

## SEO, metadata & deployment notes

- **Canonical domain** is `https://intefig.com`, defined once in `src/lib/seo.ts`
  (`SITE_URL`). If the production domain changes, also update the static copies in
  `index.html`, `public/robots.txt` and `public/sitemap.xml`.
- **Per-page metadata** (title, description, canonical, Open Graph/Twitter) is set
  by `src/components/Seo.tsx` from `PAGE_SEO` in `src/lib/seo.ts`. Structured data:
  Organization + WebSite (static, `index.html`), BreadcrumbList on subpages, and
  Service entries on `/services` — all matching visible page content.
- **Sitemap** is the static `public/sitemap.xml` (4 canonical URLs). Update it when
  routes are added or removed. `robots.txt` references it.
- **Social image:** meta tags point to `https://intefig.com/og-image.png`
  (1200×630). The design source is `public/og-image.svg`; the rendered PNG must be
  placed at `public/og-image.png` in the deployed build (binary assets are added
  outside the text snapshot flow used for source pushes).
- **Security headers** live in `public/_headers` (honoured by Netlify/Cloudflare
  Pages; GitHub Pages ignores the file — configure headers at the host there).
- **Analytics / Search Console:** not yet connected. To add: verify the domain in
  Google Search Console (DNS TXT), submit `/sitemap.xml`, and add an analytics
  tag (e.g. GA4 or Plausible) to `index.html` with the property ID — no IDs are
  hardcoded today.
