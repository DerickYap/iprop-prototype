# iProp — Singapore New Launches in 3D

A polished front-end prototype for browsing Singapore new-launch condo projects:
a **3D twilight map of Singapore** where each development is a stylized 3D
"scale-model" you can click into, plus **per-project showcase pages** styled like
Apple product pages — each with its own visual identity.

It's demo-quality: all data is static and imagery/video are placeholders. There is
no backend, auth, or CMS. Built with Next.js 16 (App Router) + React 19, Tailwind
CSS v4, MapLibre GL JS, and motion (Framer Motion).

## 📄 Start with the handoff doc

**[`HANDOFF.md`](./HANDOFF.md) is the source of truth for how this project works** —
architecture, the data-driven section system, the map internals, theming, the
scroll-video technique, and gotchas learned the hard way. **Read it before making
changes.**

## Getting started

```bash
npm install
npm run dev      # dev server on http://localhost:3000
npm run build    # production build (also the basic TypeScript/static-gen gate)
npm run start    # serve the production build
```

There are no automated tests; verification is visual (see "Verifying changes" in
[`HANDOFF.md`](./HANDOFF.md)). Deployable to Vercel as-is.
