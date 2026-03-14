import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'http://localhost:3000';
mkdirSync('./tests/screenshots', { recursive: true });

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

// Desktop screenshots
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.screenshot({ path: 'tests/screenshots/home.png', fullPage: false });

await page.goto(`${BASE}/projects`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.screenshot({ path: 'tests/screenshots/projects.png', fullPage: false });

await page.goto(`${BASE}/articles`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.screenshot({ path: 'tests/screenshots/articles.png', fullPage: false });

await page.goto(`${BASE}/articles/langchain-agentic-architectures`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.screenshot({ path: 'tests/screenshots/article-detail.png', fullPage: false });
await page.screenshot({ path: 'tests/screenshots/article-detail-full.png', fullPage: true });

// Mobile hamburger
const mob = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mobPage = await mob.newPage();
await mobPage.goto(BASE, { waitUntil: 'domcontentloaded' });
await mobPage.waitForTimeout(500);
await mobPage.screenshot({ path: 'tests/screenshots/mobile-closed.png' });
await mobPage.locator('button[aria-label="Toggle menu"]').click();
await mobPage.waitForTimeout(500);
await mobPage.screenshot({ path: 'tests/screenshots/mobile-open.png' });

await browser.close();
console.log('Screenshots saved to tests/screenshots/');
