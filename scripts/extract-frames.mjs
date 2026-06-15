/**
 * One-time, offline frame extraction for the scroll-scrubbed canvas
 * section. No ffmpeg required — drives system Chrome via playwright-core
 * to seek through a video and capture each frame off a <canvas> as WebP.
 *
 * Usage:
 *   node scripts/extract-frames.mjs \
 *     --src public/video/sora-district.mp4 \
 *     --out public/video/sora-frames \
 *     --fps 6 --width 1440 --quality 0.72
 */
import { chromium } from "playwright-core";
import {
  mkdirSync,
  rmSync,
  writeFileSync,
  readdirSync,
  statSync,
  readFileSync,
} from "node:fs";
import { join, resolve } from "node:path";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : fallback;
}

const src = resolve(arg("src", "public/video/sora-district.mp4"));
const outDir = resolve(arg("out", "public/video/sora-frames"));
const fps = Number(arg("fps", "6"));
const width = Number(arg("width", "1440"));
const quality = Number(arg("quality", "0.72"));

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage();

await page.setContent(`<!doctype html><body style="margin:0">
  <video id="v" muted playsinline preload="auto"></video>
  <canvas id="c"></canvas>
</body>`);

// Feed the video as a data URL — a file:// src is blocked from the
// about:blank context that setContent creates.
const videoDataUrl = `data:video/mp4;base64,${readFileSync(src).toString("base64")}`;
const meta = await page.evaluate(async (fileUrl) => {
  const v = document.getElementById("v");
  v.src = fileUrl;
  await new Promise((res, rej) => {
    v.onloadedmetadata = res;
    v.onerror = () => rej(new Error("video failed to load"));
  });
  return { duration: v.duration, vw: v.videoWidth, vh: v.videoHeight };
}, videoDataUrl);

const height = Math.round(width * (meta.vh / meta.vw));
const count = Math.max(2, Math.floor(meta.duration * fps));

console.log(
  `source: ${src}\n` +
    `duration ${meta.duration.toFixed(1)}s @ ${meta.vw}x${meta.vh} → ` +
    `${count} frames @ ${width}x${height} (${fps}fps, q${quality})`
);

await page.evaluate(
  ({ w, h }) => {
    const c = document.getElementById("c");
    c.width = w;
    c.height = h;
  },
  { w: width, h: height }
);

let total = 0;
for (let i = 0; i < count; i++) {
  const t = (i / (count - 1)) * Math.max(meta.duration - 0.05, 0);
  const dataUrl = await page.evaluate(
    async ({ time, q }) => {
      const v = document.getElementById("v");
      const c = document.getElementById("c");
      await new Promise((res) => {
        v.onseeked = res;
        v.currentTime = time;
      });
      c.getContext("2d").drawImage(v, 0, 0, c.width, c.height);
      return c.toDataURL("image/webp", q);
    },
    { time: t, q: quality }
  );
  const b64 = dataUrl.split(",")[1];
  const buf = Buffer.from(b64, "base64");
  total += buf.length;
  const name = `frame-${String(i).padStart(3, "0")}.webp`;
  writeFileSync(join(outDir, name), buf);
  if (i % 20 === 0) process.stdout.write(`  ${i + 1}/${count}\r`);
}

await browser.close();

const files = readdirSync(outDir).filter((f) => f.endsWith(".webp"));
const bytes = files.reduce((n, f) => n + statSync(join(outDir, f)).size, 0);
console.log(
  `\nwrote ${files.length} frames, ${(bytes / 1e6).toFixed(2)} MB total → ${outDir}`
);
console.log(`count for data file: ${files.length}`);
