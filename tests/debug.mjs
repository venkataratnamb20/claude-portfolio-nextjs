import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();

// --- Debug article card click ---
console.log('\n=== Article card click debug ===');
await page.goto(`${BASE}/articles`, { waitUntil: 'networkidle' });

const allArticleLinks = await page.locator('a[href*="/articles/"]').all();
console.log(`Found ${allArticleLinks.length} links with /articles/`);
for (const link of allArticleLinks.slice(0, 3)) {
  console.log('  href:', await link.getAttribute('href'), '| text:', (await link.textContent())?.trim().slice(0, 40));
}

const firstCard = page.locator('a[href*="/articles/"]').first();
const href = await firstCard.getAttribute('href');
console.log('Clicking:', href);
await Promise.all([
  page.waitForURL(`**${href}`),
  firstCard.click(),
]);
console.log('After click URL:', page.url());

// --- Debug mobile nav ---
console.log('\n=== Mobile nav debug ===');
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mob = await mobile.newPage();
await mob.goto(BASE, { waitUntil: 'domcontentloaded' });

const hamburger = mob.locator('button[aria-label="Toggle menu"]');
console.log('Hamburger visible:', await hamburger.isVisible());

await hamburger.click();
await mob.waitForTimeout(800);

// Check all navs
const navs = await mob.locator('nav').all();
console.log(`Found ${navs.length} nav elements`);
for (let i = 0; i < navs.length; i++) {
  const visible = await navs[i].isVisible();
  const cls = await navs[i].getAttribute('class');
  console.log(`  nav[${i}] visible=${visible} class="${cls?.slice(0, 80)}"`);
}

// Check the animated wrapper
const animatedWrapper = mob.locator('.md\\:hidden').last();
console.log('Mobile menu wrapper visible:', await animatedWrapper.isVisible().catch(() => 'error'));

// Check for any overflow-hidden elements
const mobileMenuDiv = mob.locator('div.md\\:hidden');
console.log('div.md:hidden count:', await mobileMenuDiv.count());

// Try to find the mobile nav links
const mobileLinks = await mob.locator('a[href="/#about"]').all();
console.log('Mobile about links:', mobileLinks.length);
for (const l of mobileLinks) {
  console.log('  visible:', await l.isVisible(), 'text:', await l.textContent());
}

// Check mobileOpen state via DOM
const html = await mob.locator('body').innerHTML();
const hasMobileNav = html.includes('py-3 px-4 rounded-lg');
console.log('Mobile nav HTML present:', hasMobileNav);

await browser.close();
