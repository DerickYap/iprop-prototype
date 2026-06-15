import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const outDir = "/tmp/iprop-shots";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await (
  await browser.newContext({ viewport: { width: 1440, height: 900 } })
).newPage();

const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

// 1. Map landing page — wait for tiles + intro flyTo to settle
await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(6000);
await page.screenshot({ path: `${outDir}/01-map.png` });

// Click a marker to open the preview card (dispatch directly — markers
// shift during camera animation, which trips Playwright's stability check)
await page.evaluate(() =>
  document
    .querySelectorAll(".project-marker")[0]
    .dispatchEvent(new MouseEvent("click", { bubbles: true }))
);
await page.waitForTimeout(1800);
await page.screenshot({ path: `${outDir}/02-map-preview.png` });

// Project list panel
await page.click("text=Projects (8)");
await page.waitForTimeout(900);
await page.screenshot({ path: `${outDir}/03-map-panel.png` });

// 2. Showcase pages
for (const slug of ["marina-view-residences", "lentor-mansion", "the-sora"]) {
  await page.goto(`http://localhost:3000/projects/${slug}`, {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${outDir}/${slug}-hero.png` });
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.6));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${outDir}/${slug}-mid.png` });
  await page.evaluate(() =>
    window.scrollTo(0, document.body.scrollHeight - window.innerHeight)
  );
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${outDir}/${slug}-end.png` });
}

console.log("ERRORS:", errors.length ? errors.slice(0, 10) : "none");
await browser.close();
