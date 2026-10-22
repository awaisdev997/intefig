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
