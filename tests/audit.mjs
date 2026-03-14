/**
 * Portfolio audit script — tests every page and feature.
 * Run: node tests/audit.mjs
 */
import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const ISSUES = [];

function pass(msg) { console.log(`  ✅  ${msg}`); }
function fail(msg) { console.error(`  ❌  ${msg}`); ISSUES.push(msg); }
function section(title) { console.log(`\n━━━ ${title} ━━━`); }

async function run() {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();

  // ── 1. HOME PAGE ──────────────────────────────────────────────────────────
  section('HOME PAGE (/)');
  await page.goto(BASE, { waitUntil: 'networkidle' });

  // Title
  const title = await page.title();
  if (title.includes('John Doe')) pass(`Title: "${title}"`);
  else fail(`Bad title: "${title}"`);

  // Navbar visible
  const navbar = await page.$('header');
  if (navbar) pass('Navbar rendered');
  else fail('Navbar missing');

  // All nav links present
  for (const label of ['About', 'Skills', 'Experience', 'Projects', 'Articles', 'Contact']) {
    const link = await page.getByRole('link', { name: label }).first();
    if (await link.isVisible()) pass(`Nav link: ${label}`);
    else fail(`Nav link missing: ${label}`);
  }

  // Resume link in navbar
  const resumeLink = await page.getByRole('link', { name: /resume/i }).first();
  if (await resumeLink.isVisible()) pass('Resume link visible in navbar');
  else fail('Resume link missing in navbar');

  // Hero section
  const heroText = await page.locator('#hero').textContent();
  if (heroText?.includes('John')) pass('Hero section rendered with name');
  else fail('Hero section missing or name not shown');

  // About section
  await page.locator('#about').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const aboutVisible = await page.locator('#about').isVisible();
  if (aboutVisible) pass('About section visible');
  else fail('About section not visible');

  // Skills section
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const skillsVisible = await page.locator('#skills').isVisible();
  if (skillsVisible) pass('Skills section visible');
  else fail('Skills section not visible');

  // Experience section
  await page.locator('#experience').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const expVisible = await page.locator('#experience').isVisible();
  if (expVisible) pass('Experience section visible');
  else fail('Experience section not visible');

  // Featured projects section
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const projVisible = await page.locator('#projects').isVisible();
  if (projVisible) pass('Featured Projects section visible');
  else fail('Featured Projects section not visible');

  // Contact section
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const contactVisible = await page.locator('#contact').isVisible();
  if (contactVisible) pass('Contact section visible');
  else fail('Contact section not visible');

  // Footer
  const footer = await page.$('footer');
  if (footer) pass('Footer rendered');
  else fail('Footer missing');

  // No console errors on home
  const homeErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') homeErrors.push(msg.text()); });

  // ── 2. PROJECTS PAGE ──────────────────────────────────────────────────────
  section('PROJECTS PAGE (/projects)');
  await page.goto(`${BASE}/projects`, { waitUntil: 'networkidle' });

  const projTitle = await page.title();
  if (projTitle.includes('Projects')) pass(`Title: "${projTitle}"`);
  else fail(`Bad title: "${projTitle}"`);

  const projectCards = await page.locator('article, [class*="card"]').count();
  if (projectCards >= 6) pass(`${projectCards} project cards rendered`);
  else fail(`Expected ≥6 project cards, found ${projectCards}`);

  // Check "View All Projects" stats bar
  const statsBar = await page.locator('text=Major Projects').isVisible();
  if (statsBar) pass('Projects stats bar visible');
  else fail('Projects stats bar not visible');

  // ── 3. ARTICLES LISTING PAGE ──────────────────────────────────────────────
  section('ARTICLES PAGE (/articles)');
  await page.goto(`${BASE}/articles`, { waitUntil: 'networkidle' });

  const artTitle = await page.title();
  if (artTitle.includes('Articles')) pass(`Title: "${artTitle}"`);
  else fail(`Bad title: "${artTitle}"`);

  const articleCards = await page.locator('article').count();
  if (articleCards >= 6) pass(`${articleCards} article cards rendered`);
  else fail(`Expected ≥6 article cards, found ${articleCards}`);

  // Stats bar
  const artStats = await page.locator('text=Articles').first().isVisible();
  if (artStats) pass('Articles stats bar visible');
  else fail('Articles stats bar not visible');

  // ── 4. INDIVIDUAL ARTICLE PAGES ──────────────────────────────────────────
  section('ARTICLE DETAIL PAGES (/articles/[slug])');
  const slugs = [
    'langchain-agentic-architectures',
    'llamaindex-enterprise-rag',
    'crewai-multi-agent-orchestration',
    'transformers-fine-tuning-at-scale',
    'autogpt-autonomous-task-agents',
    'fastapi-ml-inference-apis',
  ];

  for (const slug of slugs) {
    await page.goto(`${BASE}/articles/${slug}`, { waitUntil: 'networkidle' });
    const status = page.url().includes(slug);
    const h1 = await page.locator('h1').first().textContent();
    if (status && h1 && h1.length > 5) pass(`${slug}: h1="${h1.slice(0, 60)}..."`);
    else fail(`${slug}: missing or broken`);

    // Back link
    const backLink = await page.locator('a', { hasText: 'All Articles' }).isVisible();
    if (backLink) pass(`  Back link present`);
    else fail(`  Back link missing on ${slug}`);

    // Article body rendered
    const articleBody = await page.locator('.article-content').isVisible();
    if (articleBody) pass(`  Article content rendered`);
    else fail(`  Article content missing on ${slug}`);

    // Related articles or sidebar
    const sidebar = await page.locator('text=Author').or(page.locator('text=Topics')).first().isVisible().catch(() => false);
    if (sidebar) pass(`  Sidebar visible`);
    else fail(`  Sidebar missing on ${slug}`);
  }

  // ── 5. NAVIGATION FLOW ───────────────────────────────────────────────────
  section('NAVIGATION FLOW');

  // Home → Projects via navbar
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  await page.getByRole('link', { name: 'Projects' }).first().click();
  await page.waitForURL('**/projects');
  if (page.url().includes('/projects')) pass('Navbar: Home → Projects navigation works');
  else fail('Navbar: Home → Projects navigation broken');

  // Projects → Articles via navbar
  await page.getByRole('link', { name: 'Articles' }).first().click();
  await page.waitForURL('**/articles');
  if (page.url().includes('/articles')) pass('Navbar: → Articles navigation works');
  else fail('Navbar: → Articles navigation broken');

  // Article card click — use waitForURL to avoid race condition
  const firstCard = page.locator('a[href*="/articles/"]').first();
  const firstHref = await firstCard.getAttribute('href');
  await Promise.all([
    page.waitForURL(`**${firstHref}`),
    firstCard.click(),
  ]);
  if (page.url().includes('/articles/') && !page.url().endsWith('/articles/')) pass(`Article card → detail page (${firstHref})`);
  else fail('Article card click did not navigate to detail page');

  // Back to articles
  await page.locator('a', { hasText: 'All Articles' }).first().click();
  await page.waitForURL('**/articles');
  if (page.url().endsWith('/articles')) pass('"All Articles" back link works');
  else fail('"All Articles" back link broken');

  // ── 6. MOBILE NAVBAR ─────────────────────────────────────────────────────
  section('MOBILE NAVBAR');
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(BASE, { waitUntil: 'domcontentloaded' });

  const hamburger = mobilePage.locator('button[aria-label="Toggle menu"]');
  if (await hamburger.isVisible()) {
    pass('Hamburger button visible on mobile');
    await hamburger.click();
    await mobilePage.waitForTimeout(600);
    // Check that a mobile nav link is now accessible
    const mobileAbout = mobilePage.locator('a[href="/#about"]').last();
    const mobileNavOpen = await mobileAbout.isVisible();
    if (mobileNavOpen) pass('Mobile nav opens on hamburger click');
    else fail('Mobile nav did not open');
  } else {
    fail('Hamburger button not visible on mobile');
  }
  await mobile.close();

  // ── 7. 404 PAGE ───────────────────────────────────────────────────────────
  section('404 PAGE');
  const resp = await page.goto(`${BASE}/does-not-exist`, { waitUntil: 'domcontentloaded' });
  const notFoundText = await page.locator('body').textContent();
  if (notFoundText?.toLowerCase().includes('not found') || resp?.status() === 404) pass('404 page renders correctly');
  else fail('404 page not working');

  // ── SUMMARY ───────────────────────────────────────────────────────────────
  section('SUMMARY');
  await browser.close();

  if (ISSUES.length === 0) {
    console.log('\n🎉 All checks passed!\n');
  } else {
    console.log(`\n⚠️  ${ISSUES.length} issue(s) found:\n`);
    ISSUES.forEach((i, n) => console.log(`  ${n + 1}. ${i}`));
    process.exit(1);
  }
}

run().catch(err => {
  console.error('\nFATAL:', err.message);
  process.exit(1);
});
