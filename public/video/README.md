# Video assets

- `sora-district.mp4` — "Aerial view of the glass corporate buildings of a big city"
  Source: Mixkit, https://mixkit.co/free-stock-video/aerial-view-of-the-glass-corporate-buildings-of-a-big-49845/
  License: Mixkit Stock Video Free License (free for commercial use, no attribution required).
  Placeholder footage — not the actual development.

- `sora-frames/` — frame sequence derived from `sora-district.mp4` for the
  scroll-scrubbed canvas section (smooth scrubbing without decoder seeks).
  Regenerate with: `node scripts/extract-frames.mjs --src public/video/sora-district.mp4 --out public/video/sora-frames --fps 6 --width 1280 --quality 0.55`
  Update the `frames.count` in src/data/projects.ts if the count changes.
