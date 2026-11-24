# Joshua Bacay — Portfolio

A responsive, motion-led portfolio built with the Next.js App Router, React, Tailwind CSS, shadcn/ui primitives, Three.js, anime.js v4, and GSAP. The site is a static frontend with pre-rendered project pages; it does not require a backend or database.

## Run locally

Use Node.js 20.9 or newer (the current project uses Node.js 22) and npm:

```bash
npm ci
npm run dev
```

The development server listens on port 3000. Check source diagnostics and produce the production static export with:

```bash
npm run lint
npm run typecheck
npm run build
```

Next.js writes the deployable site to `out/`. Upload that directory to a static host configured to serve the generated HTML files and directories. The App Router statically generates the home page and the five known `/projects/{slug}` detail pages from `src/data/content.js`; no Vite SPA rewrite is needed. Do not use `dist/` as the output directory.

## Update portfolio content

Edit `src/data/content.js` to change the name, role, biography, location, stats, skills, project data, experience, icon identifiers, contact information, links, and section copy. Replace seeded concepts, example links, placeholder dates, and sample statistics with verified details before launch. The project-detail pages explicitly identify their content as concept placeholders.

The contact form validates fields and shows a success state for demonstration only. It does not send or store messages. Connect a form provider or endpoint before presenting it as a working contact channel.

## Motion, carousel, and theme

The project carousel uses GSAP and provides previous/next controls, slide indicators, keyboard navigation, and touch/pointer swiping. It does not autoplay. React Bits Grid Motion adds a project-data-driven moving tile wall above the carousel; its offscreen work pauses and reduced-motion preferences remove drift, pointer parallax, and the entrance animation. Existing anime.js effects remain responsible for the intro and section reveals.

The theme toggle follows the operating-system preference on first visit, falls back to dark when unavailable, and persists an explicit selection in `localStorage` as `joshua-bacay-theme` (with a one-time read fallback for the previous key). Tailwind and copied shadcn/ui components use CSS tokens mapped to the existing charcoal, warm-paper, and Signal Orange palette. The technology names use Devicon font icons loaded from the version-pinned jsDelivr stylesheet, with visible text labels retained as fallbacks.

## Portrait and project assets

The hero Lanyard uses the supplied portrait for its front face and static fallback, with the JB identity on the reverse. Replace or update the source asset only with Joshua’s approved portrait.

## Notes

The Three.js hero scene is lazy-loaded and has a CSS fallback for unavailable WebGL. Rendering pauses when hidden or offscreen, its pixel ratio is capped, and particle work is reduced on small screens. The custom cursor is disabled for coarse pointers and reduced-motion preferences. The contact form validates and previews the note in the current tab, offers an email draft link, and does not send or persist contact data. The theme, navigation, project-detail routes, and main portfolio content remain browser-facing and static.
