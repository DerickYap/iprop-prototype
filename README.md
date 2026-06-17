# iProp — Singapore New Launches in 3D

A polished front-end prototype for browsing Singapore new-launch condo projects:
a **3D twilight map of Singapore** where each development is a stylized 3D
"scale-model" you can click into, plus **per-project showcase pages** styled like
Apple product pages — each with its own visual identity.

It's demo-quality: all data is static and imagery/video are placeholders. There is
no backend, auth, or CMS. Built with Next.js 16 (App Router) + React 19, Tailwind
CSS v4, MapLibre GL JS, and motion (Framer Motion).

## Branches

- **`main`** — the standalone 3D map as the homepage (the original version).
- **`editorial-landing`** — an editorial reframe: a Home landing with an
  interactive map teaser, a categorized **Journal** of articles, per-project
  "Related reading", and a macOS-style dock (Home / Explore / Journal). See
  [`HANDOFF.md`](./HANDOFF.md) → "Editorial layer".

## 📄 Start with the handoff doc

**[`HANDOFF.md`](./HANDOFF.md) is the source of truth for how this project works** —
architecture, the data-driven section system, the map internals, theming, the
scroll-video technique, and gotchas learned the hard way. **Read it before making
changes.**

## Prerequisites

- **Node.js 20+** (LTS recommended) and **npm** — required by Next.js 16.
- **Google Chrome** — only for the offline scripts in `scripts/` (frame
  extraction + visual screenshots); `playwright-core` drives your system Chrome
  rather than downloading a browser. Not needed to run the app.

## Getting started

```bash
npm install      # installs everything below
npm run dev      # dev server on http://localhost:3000
npm run build    # production build (also the basic TypeScript/static-gen gate)
npm run start    # serve the production build
```

`npm install` pulls every dependency from `package.json` — you don't need to
install anything individually. For reference, the project depends on:

### Runtime dependencies

| Package | Version | Used for |
|---|---|---|
| `next` | 16.2.9 | App Router framework |
| `react` / `react-dom` | 19.2.4 | UI runtime |
| `maplibre-gl` | ^5.24.0 | The 3D twilight map (keyless) |
| `motion` | ^12.40.0 | Scroll / scroll-scrub / entrance animation |

### Dev dependencies

| Package | Version | Used for |
|---|---|---|
| `typescript` | ^5 | TypeScript |
| `@types/node`, `@types/react`, `@types/react-dom` | ^20 / ^19 / ^19 | Type defs |
| `tailwindcss`, `@tailwindcss/postcss` | ^4 | Tailwind CSS v4 (PostCSS plugin) |
| `eslint`, `eslint-config-next` | ^9 / 16.2.9 | Linting |
| `playwright-core` | ^1.60.0 | Offline scripts + visual verification (drives system Chrome) |

There are no automated tests; verification is visual (see "Verifying changes" in
[`HANDOFF.md`](./HANDOFF.md)). Deployable to Vercel as-is.
