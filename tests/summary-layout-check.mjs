import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const baseUrl = process.env.TEST_URL || 'http://127.0.0.1:8765';
const artifactsDir = path.resolve('test-artifacts');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function setupGame(page) {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.click('#start-btn');
  await page.fill('#player-name', 'Layout Test');
  await page.selectOption('#player-age', '30');
  await page.selectOption('#player-income', '75000');
  await page.click('#setup-form button[type="submit"]');
  await page.click('#tutorial-next');
  await page.click('#tutorial-next');
  await page.click('#tutorial-next');
  await page.waitForSelector('#game-screen.active');
}

async function completeGame(page) {
  for (let guard = 0; guard < 25; guard += 1) {
    await page.waitForSelector('#game-screen.active');
    await page.click('.choice-btn:first-child');
    await page.waitForSelector('#results-screen.active');
    const nextText = await page.textContent('#next-scenario-btn');
    await page.click('#next-scenario-btn');
    if (nextText.includes('Final')) {
      break;
    }
  }

  await page.waitForSelector('#summary-screen.active');
}

async function getSummaryMetrics(page) {
  return page.evaluate(() => {
    const rect = selector => {
      const r = document.querySelector(selector).getBoundingClientRect();
      return {
        top: r.top,
        bottom: r.bottom,
        left: r.left,
        right: r.right,
        width: r.width,
        height: r.height
      };
    };

    const chart = window.Charts?.instances?.['category-chart'];
    const finalTakeaways = rect('.final-takeaways');
    const summaryActions = rect('.summary-actions');

    return {
      appVersion: window.app?.version,
      categoryChartType: chart?.config?.type,
      categoryChartBox: rect('#category-chart'),
      finalTakeaways,
      summaryActions,
      actionGap: summaryActions.top - finalTakeaways.bottom,
      decisionCount: document.querySelectorAll('.decision-item').length,
      visibleToasts: document.querySelectorAll('.achievement-toast.visible').length,
      localCssVersioned: [...document.querySelectorAll('link[rel="stylesheet"]')]
        .filter(link => link.href.includes('/css/'))
        .every(link => link.href.includes('v=20260613-summary1')),
      localScriptsVersioned: [...document.querySelectorAll('script[src]')]
        .filter(script => script.src.includes('/js/'))
        .every(script => script.src.includes('v=20260613-summary1'))
    };
  });
}

async function main() {
  await mkdir(artifactsDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1174, height: 1085 },
    deviceScaleFactor: 1
  });

  const issues = [];
  page.on('console', message => {
    if (['error', 'warning'].includes(message.type())) {
      issues.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on('pageerror', error => issues.push(`pageerror: ${error.message}`));

  await setupGame(page);
  await completeGame(page);
  await page.locator('#category-chart').scrollIntoViewIfNeeded();
  await page.screenshot({
    path: path.join(artifactsDir, 'summary-layout-full.png'),
    fullPage: true
  });
  await page.locator('.summary-chart-container:has(#category-chart)').screenshot({
    path: path.join(artifactsDir, 'category-impact.png')
  });
  await page.locator('.final-takeaways').screenshot({
    path: path.join(artifactsDir, 'action-deck.png')
  });

  const metrics = await getSummaryMetrics(page);
  assert(metrics.appVersion === '2.0.3-summary', `Expected app version 2.0.3-summary, got ${metrics.appVersion}`);
  assert(metrics.localCssVersioned, 'Local CSS assets are not cache-busted with v=20260613-summary1');
  assert(metrics.localScriptsVersioned, 'Local JS assets are not cache-busted with v=20260613-summary1');
  assert(metrics.categoryChartType === 'bar', `Expected category impact bar chart, got ${metrics.categoryChartType}`);
  assert(metrics.categoryChartBox.height >= 320, `Category chart is too short: ${metrics.categoryChartBox.height}px`);
  assert(metrics.actionGap >= 24, `Summary buttons overlap or crowd action deck: ${metrics.actionGap}px gap`);
  assert(metrics.decisionCount === 19, `Expected 19 decisions in summary, got ${metrics.decisionCount}`);
  assert(metrics.visibleToasts === 0, `Expected no lingering summary toasts, got ${metrics.visibleToasts}`);

  await page.setViewportSize({ width: 390, height: 900 });
  await page.reload({ waitUntil: 'networkidle' });
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth
  }));
  assert(
    overflow.scrollWidth <= overflow.clientWidth + 2,
    `Mobile horizontal overflow: ${overflow.scrollWidth} > ${overflow.clientWidth}`
  );

  const realIssues = issues.filter(issue => !issue.includes('favicon'));
  assert(realIssues.length === 0, `Browser issues:\n${realIssues.join('\n')}`);

  await browser.close();
  console.log(JSON.stringify(metrics, null, 2));
}

main().catch(error => {
  console.error(error.stack || error.message);
  process.exit(1);
});
