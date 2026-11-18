// Retakes projects/img/tfiish.webp: the projects page, in the arcade theme, with the
// tfiish card open as the fourth card and its own screenshot inside it. Each pass
// shoots the page with the previous pass's picture in it, so after a few passes
// every nested level shows the current page. Run from tools/: npm install, then npm run shot.
import { chromium } from 'playwright-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'projects/img/tfiish.webp');
const PASSES = 4;
const WIDTH = 1600, HEIGHT = 1000; // what the card's <img> says
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' };

// A static server for the repo, so the shot sees the working copy, not the live site.
const server = http.createServer((req, res) => {
  let p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(ROOT)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  if (!fs.existsSync(p)) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(p)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(p).pipe(res);
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = 'http://127.0.0.1:' + server.address().port;

// The installed Google Chrome; set CHROME to use another build.
const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : { channel: 'chrome' });

for (let i = 1; i <= PASSES; i++) {
  // A fresh context each pass, so the previous pass's picture isn't cached.
  // 1440×900 at 2x, scaled down to 1600×1000 below, matches the earlier shots.
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => { try { localStorage.setItem('theme', 'arcade'); localStorage.removeItem('sort'); } catch (e) {} });
  const page = await ctx.newPage();
  await page.goto(base + '/projects/', { waitUntil: 'networkidle' });
  // Wait for the last-updated time from GitHub; without it the subheader is the date alone.
  await page.waitForFunction(() => / \d\d:\d\d /.test(document.getElementById('updated').textContent), null, { timeout: 15000 })
    .catch(() => console.warn('No time from GitHub (rate limit?); the subheader shows the date alone.'));
  // Show the first three cards, collapsed, then tfiish open as the fourth, with Managing closed.
  await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.cards > details.card')];
    const name = c => c.querySelector('h2').textContent.trim();
    const own = cards.find(c => name(c) === 'tfiish');
    const others = cards.filter(c => c !== own);
    cards.forEach(c => { c.hidden = true; c.open = false; });
    others.slice(0, 3).concat(own).forEach(c => { c.hidden = false; c.parentNode.appendChild(c); });
    own.open = true;
    document.querySelectorAll('details.managing').forEach(d => { d.open = false; });
    document.getElementById('expand').textContent = 'expand';
  });
  // Wait for the shown pictures only: lazy images in hidden cards never load, so their decode() never settles.
  await page.evaluate(() => Promise.all([...document.querySelectorAll('.cards > details.card:not([hidden]) img')]
    .map(img => { img.loading = 'eager'; return img.decode().catch(() => {}); })));
  // Scroll so the tfiish card ends 30px above the bottom of the window.
  await page.evaluate(() => {
    const own = [...document.querySelectorAll('.cards > details.card')].find(c => !c.hidden && c.open);
    window.scrollTo(0, Math.max(0, own.getBoundingClientRect().bottom + scrollY - (innerHeight - 30)));
  });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(500);
  const png = await page.screenshot({ type: 'png' });

  // Scale to 1600×1000 and encode as WebP in the browser, so nothing else needs installing.
  const webp = await page.evaluate(async ({ src, w, h }) => {
    const img = new Image();
    img.src = src;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const g = c.getContext('2d');
    g.imageSmoothingQuality = 'high';
    g.drawImage(img, 0, 0, w, h);
    return c.toDataURL('image/webp', 0.82).split(',')[1];
  }, { src: 'data:image/png;base64,' + png.toString('base64'), w: WIDTH, h: HEIGHT });
  fs.writeFileSync(OUT, Buffer.from(webp, 'base64'));
  console.log('pass ' + i + ': ' + await page.evaluate(() => document.querySelector('.sub').textContent));
  await ctx.close();
}

await browser.close();
server.close();
console.log('Wrote ' + path.relative(ROOT, OUT));
