# iProp — Prototype Handoff

> Snapshot for the next agent/developer. This documents **what this version
> is and how it works** so it can be preserved as-is while work pivots in a
> new direction. Nothing here is a TODO — it's the state of the build.

_Last updated: 2026-06-16_

## What this is

**iProp** is a demo-quality web app for browsing Singapore new-launch condo
projects. Two experiences:

1. **A 3D twilight map of Singapore** (landing page) with each development
   shown as a stylized 3D "scale-model" you can click into.
2. **Per-project showcase pages** styled like Apple product pages / Shopify
   Editions — sleek, scroll-driven, each with its own visual identity, so
   visiting each feels like stepping into a different developer's showflat.

It's a **polished front-end prototype**: all data is static, imagery/video are
placeholders, there is **no backend, auth, CMS, or real data pipeline**.
Deployable to Vercel as-is.

## Tech stack

- **Next.js 16 (App Router) + TypeScript**, **React 19**
- **Tailwind CSS v4** (`src/app/globals.css`, single file, `@import "tailwindcss"`)
- **MapLibre GL JS v5.24** — the 3D map (keyless; CARTO dark-matter basemap, recolored at runtime)
- **motion v12** (Framer Motion) — all scroll/scroll-scrub/entrance animation
- **playwright-core** (devDep) — used only for offline scripts + visual verification, drives the system Chrome (no bundled browser download)

Run: `npm run dev` · build: `npm run build` · prod: `npm run start`.
There are **no tests**; verification has been visual (see "Verifying changes").

## Repo map (what matters)

```
src/
  app/
    layout.tsx                  # fonts (Playfair, Fraunces, Space Grotesk, Inter, Manrope) as CSS vars
    page.tsx                    # renders <SingaporeMap/>
    globals.css                 # Tailwind + ALL map/beacon/showcase CSS
    projects/[slug]/page.tsx    # showcase route; generateStaticParams + generateMetadata from data
  components/
    map/
      SingaporeMap.tsx          # the whole map experience (see below)
      MapOverlay.tsx            # brand wordmark, project list panel, region filter
      ProjectPreviewCard.tsx    # bottom card when a project is selected
    showcase/
      ShowcaseRenderer.tsx      # maps project.sections[] -> section components, injects theme
      ShowcaseNav.tsx           # floating back-to-map / register nav
      sections/                 # one component per section "type" (see data model)
  data/
    types.ts                    # Project + Theme + the Section discriminated union
    projects.ts                 # the 8 sample projects + getProject() + formatPrice()
  lib/
    themes.ts                   # 4 theme presets + themeStyle() (CSS-var injection)
    towers.ts                   # procedural 3D massing geometry for the map
scripts/
  extract-frames.mjs            # offline: mp4 -> WebP frame sequence (headless Chrome, no ffmpeg)
  snap.mjs                      # visual smoke-test screenshotter (reference pattern)
public/video/
  sora-district.mp4             # placeholder aerial clip (Mixkit, license in README)
  sora-frames/ (125 .webp)      # extracted frames for the scroll-scrub section
  README.md                     # asset licenses + regen command
```

## The data model (this is the heart of it)

Everything is data-driven from `src/data/projects.ts`. A `Project` carries
identity/facts + a `themeId` + an **ordered `sections[]` array**. The showcase
page is just `sections.map(renderSection)` in `ShowcaseRenderer.tsx`. To change
a project's page you edit its data, not components.

`Section` is a discriminated union (`src/data/types.ts`); each `type` has a
matching component in `src/components/showcase/sections/`:

| `type`        | Component                  | What it does |
|---------------|----------------------------|--------------|
| `hero`        | HeroSection                | parallax full-screen hero |
| `zoomHero`    | ZoomHeroSection            | iPhone-style pinned hero that settles into a card |
| `statement`   | StatementSection           | scroll-linked word-by-word reveal |
| `pinnedScenes`| PinnedScenesSection        | pinned, scroll-scrubbed crossfading still scenes |
| `videoScrub`  | VideoScrubSection          | **scroll = playhead** over a canvas frame sequence |
| `zoomThrough` | ZoomThroughSection         | image scales from card to full-bleed on scroll |
| `stats`       | StatsSection               | big numerals that count up in view |
| `horizontal`  | HorizontalShowcaseSection  | vertical scroll drives a horizontal panel rail |
| `gallery`     | GallerySection             | reveal-on-scroll image grid |
| `stickyMedia` | StickyMediaSection         | pinned image while copy scrolls past |
| `residences`  | ResidencesSection          | unit-mix price list |
| `amenities`   | AmenitiesSection           | facilities grid |
| `location`    | LocationSection            | nearby POIs + a small live MapLibre mini-map |
| `factsCta`    | FactsCtaSection            | fact sheet + register-interest CTA |

**Theming:** `lib/themes.ts` has 4 presets (`noir`, `botanic`, `azure`,
`graphite`). `ShowcaseRenderer` calls `themeStyle(theme)` to set `--sc-*` CSS
variables (colors + font keys) on the page root; section components read
`var(--sc-bg)`, `var(--sc-accent)`, `.sc-display` / `.sc-body`, etc. Adding a
new look = a new preset, no component changes.

### The 8 sample projects

Real-ish current SG launches with real coordinates, plausible facts, **Unsplash
placeholder imagery**. Three are fully art-directed with distinct identities;
the other five use a shared default template (`defaultSections()` in
`projects.ts`):

- **Marina View Residences** (`noir`, gold/serif) — flagship; full iPhone-style
  choreography (`zoomHero` → `statement` → `pinnedScenes` → `zoomThrough` →
  `stats` → `horizontal` → …).
- **Lentor Mansion** (`botanic`, green/Fraunces) — editorial scroll.
- **The Sora** (`azure`, blue/Grotesk) — has the **`videoScrub`** scroll-video
  section.
- Watten House, Parktown Residence, The Continuum, Pinetree Hill, The Chuan
  Park — default template.

### River Modern — a 9th project with a *bespoke* showcase

**River Modern** (Kallang Riverside) is the one project whose showcase does
**not** go through the `sections[]` / `ShowcaseRenderer` system. It is a
self-contained **cinematic flythrough**: a sticky full-screen `<video>` whose
playhead is scrubbed by scroll, with six oversized copy "beats" fading in over
the film. It lives in `src/components/showcase/river-modern/`
(`RiverModernClient` → `RiverModernExperience` → `ScrubVideo` + `Overlay` +
`Chrome`, reduced-motion `Fallback`), driven by the `riverModern` data + types
(`RiverModern`/`RiverVideo`/`RiverBeat`) exported from `src/data/projects.ts`,
with the clip at `public/river-modern/flythrough.mp4`.

How it integrates:
- It still has a normal `Project` entry in `projects.ts` (`themeId: "noir"`,
  `sections: []`) — that's all the **map** needs for its tower cluster, beacon,
  preview card and fly-in.
- `src/app/projects/[slug]/page.tsx` **branches**: `slug === "river-modern"`
  renders `<RiverModernClient/>` (client-only via `next/dynamic({ ssr:false })`);
  every other slug renders `<ShowcaseRenderer/>` as before.
- Uses the **Cormorant Garamond** display font (added in `app/layout.tsx` as
  `--font-cormorant`). The `← Map` link in its `Chrome`/`Fallback` returns to the
  map's eased camera-back-out.
- Its imagery (`cover`/`poster`/`heroImage`) is **picsum.photos** placeholder, so
  that host is whitelisted in `next.config.ts` `images.remotePatterns`.

## The map (`SingaporeMap.tsx`) — most custom part

- **Basemap:** CARTO dark-matter, **recolored at runtime** into a *blue-hour /
  twilight* scene in `applyTwilight(map)` (called on `style.load`): MapLibre
  `setSky` (purple overhead → amber horizon), `setLight` (warm low sun), and
  `setPaintProperty` recolors (indigo land, teal water, dim warm roads).
- **Camera:** `OVERVIEW` is a high-pitch (73°) tilted view — **required** so the
  amber horizon is in frame; needs `maxPitch: 74` (default cap is 60). Gentle
  idle auto-rotation drifts the bearing after a few seconds idle and stops on
  interaction/selection.
- **Generic 3D buildings:** `buildings-3d` fill-extrusion (twilight gradient),
  visible at zoom ≥ 13.
- **Each project = a 3D "scale-model"** (the distinctive bit):
  - `lib/towers.ts` procedurally generates, **seeded by slug** (SSR-stable), a
    cluster of theme-colored extruded towers (`project-towers-3d`) sized by the
    project's `units`, sitting on a glowing ground "plot" disc (`project-plots`).
  - The project **name floats above** via an HTML beacon marker (beam + name
    tag + price chip). Labels reveal by zoom: top-3-by-units tagged at the wide
    overview; all names at zoom ≥ 12; full name+price card on hover/select.
  - Clicking a beacon **or** the 3D massing selects the project → preview card
    → "Enter showcase" does a cinematic `flyTo` into the site, fades through the
    project's theme color, and routes to `/projects/[slug]`. Returning eases the
    camera back out (uses `sessionStorage` key `iprop:last`).

## The scroll-video technique (important, reusable)

`videoScrub` does **not** scrub a `<video>` element — that was tried and felt
laggy because stock mp4s have sparse keyframes (each scroll seek forces a
decoder rewind). The working approach (Shopify/Apple-style):

1. `scripts/extract-frames.mjs` extracts the mp4 into a **WebP frame sequence**
   offline using headless Chrome (no ffmpeg). Feeds the mp4 as a base64 data
   URL because `file://` is blocked from `about:blank`.
2. `VideoScrubSection.tsx` preloads the frames (coarse pass first) and draws the
   scroll-mapped frame to a `<canvas>` each rAF with light time-based damping.
   Every "seek" is a sub-millisecond `drawImage`. Falls back to a Ken-Burns
   poster until frames load / on failure / reduced motion.
3. Data points at it via `frames: { dir, count, ext }` on the section; `src` is
   kept only as a fallback. The Sora uses `/video/sora-frames` (125 frames).

Regen command is in `public/video/README.md`.

## Gotchas worth knowing (learned the hard way)

- **MapLibre `["zoom"]` can't be nested** inside another expression (e.g.
  `["*", h, ["interpolate",["zoom"]...]]` throws). Zoom must be the **direct
  input** to interpolate/step; put per-feature math in the stop *outputs*.
- **maplibre-gl CSS overrides Tailwind positioning** — map containers need
  explicit `h-full w-full`, not just `inset-0`, or they collapse to 0 height.
- **motion v12 keyframe-array `useTransform`** produced a corrupted curve for
  one band-fade case; the **function form** `useTransform(p, (v)=>…)` is
  reliable for scroll band fades. Prefer it.
- **Project massing in warm theme colors blends** into the warm twilight base
  buildings — vivid tower colors + the glowing plot disc are what make a
  development read as distinct.
- **Twilight sky only shows at high pitch** — don't lower `OVERVIEW.pitch`
  below ~67 or the horizon glow disappears; keep the top scrim light (≤0.45) or
  it kills the glow.
- **Stale `next start`**: if edits seem to have "no effect" or you get
  EADDRINUSE/500s, an old server is still on :3000 — `lsof -ti :3000 | xargs
  kill -9` before restarting.

## Verifying changes (no test suite)

Pattern used throughout (see `scripts/snap.mjs`): start the app, then drive
**system Chrome headless via playwright-core** to screenshot/inspect. Example:

```bash
lsof -ti :3000 | xargs kill -9 2>/dev/null   # clear stale server
npm run build && (npm run start &)
# poll http://localhost:3000, then run a playwright-core script that does
# chromium.launch({ channel: "chrome", headless: true }) and screenshots.
```

`npm run build` (TypeScript + static generation of all 8 project pages) is the
basic gate.

## If you're pivoting — what's reusable vs. throwaway

- **Highly reusable:** the data-driven section system (`types.ts` union +
  `ShowcaseRenderer` + `sections/`), the theme-preset/CSS-var system
  (`lib/themes.ts`), the `videoScrub` canvas-scrub technique +
  `extract-frames.mjs`, the headless-Chrome verification pattern.
- **Map-specific (keep or drop as a unit):** `SingaporeMap.tsx`,
  `lib/towers.ts`, `MapOverlay`, `ProjectPreviewCard`, and the `.beacon`/map
  CSS block in `globals.css`.
- **Placeholder, expect to replace:** all imagery (Unsplash URLs), the video +
  frames, and every fact in `projects.ts`. There's a content disclaimer in the
  showcase footer.

## Known limitations

- No real data, backend, auth, CMS, analytics, or forms (the "Register" CTAs
  are inert).
- Map markers are stylized procedural massing, **not** real building models.
- Imagery/video are placeholders and not representative of the actual
  developments (some scenes are recognizably non-Singapore stock).
- No automated tests; no error monitoring; not accessibility-audited.
- `src/**/.DS_Store` files are committed noise; safe to delete.

## Suggestion for preserving this version

Before pivoting, snapshot it so it's recoverable: e.g. commit on a branch/tag
like `prototype-v1-3d-map` (this folder is currently **not a git repo** —
`git init` first if you want history), or copy the directory aside.
```
