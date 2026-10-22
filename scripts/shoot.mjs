#!/usr/bin/env node
// elan screenshot check.
// Usage: node <elan>/scripts/shoot.mjs <url> [--stress] [--out .elan/shots]
// Screenshots full pages at 1440, 768 and 390px plus 390px with reduced motion, and reports
// horizontal scroll and text overflowing its container. --stress injects long strings first.
// Uses elan's own playwright-core (npm install in the elan folder) driving the installed Chrome.

import { mkdirSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith("--"));
const stress = args.includes("--stress");
const outIdx = args.indexOf("--out");
const out = outIdx > -1 ? args[outIdx + 1] : ".elan/shots";
if (!url) {
  console.error("Usage: node shoot.mjs <url> [--stress] [--out dir]");
  process.exit(2);
}

let pw;
for (const name of ["playwright", "playwright-core"]) {
  try { pw = await import(name); break; } catch {}
}
if (!pw) {
  console.error("Playwright not found. Run `npm install` in the elan folder.");
  process.exit(2);
}

mkdirSync(out, { recursive: true });
const browser = await pw.chromium.launch({ channel: "chrome" }).catch(() => pw.chromium.launch());

const runs = [
  { name: "1440", width: 1440, height: 900 },
  { name: "768", width: 768, height: 1024 },
  { name: "390", width: 390, height: 844 },
  { name: "390-reduced", width: 390, height: 844, reducedMotion: "reduce" },
];

const LONG = "Maximiliana Wolfeschlegelsteinhausen-Bergerdorff Supercalifragilisticexpialidocious";

let problems = 0;
for (const r of runs) {
  const page = await browser.newPage({ viewport: { width: r.width, height: r.height }, reducedMotion: r.reducedMotion ?? "no-preference" });
  await page.goto(url, { waitUntil: "networkidle" });
  // Scroll through once so scroll-triggered content renders, then return to top.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo(0, y);
      await new Promise((res) => setTimeout(res, 120));
    }
    window.scrollTo(0, 0);
  });
  if (stress) {
    await page.evaluate((long) => {
      document.querySelectorAll("h1,h2,h3,h4,button,a,label,li,td,th,[class*=name],[class*=title]").forEach((el) => {
        const t = [...el.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
        if (t) t.textContent = t.textContent + " " + long;
      });
    }, LONG);
  }
  await page.waitForTimeout(400);
  const report = await page.evaluate(() => {
    const issues = [];
    const doc = document.documentElement;
    if (doc.scrollWidth > doc.clientWidth + 1) issues.push(`horizontal scroll: page is ${doc.scrollWidth}px wide in a ${doc.clientWidth}px viewport`);
    for (const el of document.querySelectorAll("body *")) {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden" || !el.textContent.trim()) continue;
      const hasOwnText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (!hasOwnText) continue;
      const clipsX = ["hidden", "clip"].includes(cs.overflowX) && cs.textOverflow !== "ellipsis";
      if (el.scrollWidth > el.clientWidth + 1 && (clipsX || cs.overflowX === "visible")) {
        const label = el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : "");
        issues.push(`text overflow: ${label} "${el.textContent.trim().slice(0, 40)}" (${el.scrollWidth}px in ${el.clientWidth}px)`);
      }
      if (issues.length > 40) break;
    }
    return issues;
  });
  const file = join(out, `${r.name}${stress ? "-stress" : ""}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`\n[${r.name}${stress ? " stress" : ""}] ${file}`);
  if (report.length === 0) console.log("  ok");
  for (const line of report) console.log("  ✗ " + line);
  problems += report.length;
  await page.close();
}
await browser.close();
console.log(problems ? `\n${problems} problem(s) found.` : "\nAll clean.");
process.exit(problems ? 1 : 0);
