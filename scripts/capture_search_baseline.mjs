import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const API_BASE_URL = 'http://localhost:8089';
const FE_BASE_URL = 'http://127.0.0.1:5173';
const EVIDENCE_DIR = path.resolve('d:/PRN232/mooncake-fe/.agents/evidence/SEARCH/T0_baseline');
const API_DIR = path.join(EVIDENCE_DIR, 'api');

fs.mkdirSync(API_DIR, { recursive: true });

async function main() {
  console.log('=== Capturing SearchPage T0 Baseline Evidence ===');

  // 1. Query backend directly without maxPrice vs with maxPrice=1000000
  const unfilteredRes = await fetch(`${API_BASE_URL}/api/v1/products?page=1&pageSize=50`);
  const unfilteredJson = await unfilteredRes.json();

  const filtered1MRes = await fetch(`${API_BASE_URL}/api/v1/products?page=1&pageSize=24&maxPrice=1000000&sort=relevance`);
  const filtered1MJson = await filtered1MRes.json();

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const capturedRequests = [];
  page.on('request', (req) => {
    if (req.url().includes('/api/v1/products')) {
      capturedRequests.push({
        method: req.method(),
        url: req.url(),
      });
    }
  });

  try {
    // T0_01: Initial load - proves B1 (maxPrice=1000000 sent on initial load), B3 (pageSize=24 hardcoded, no URL sync)
    await page.goto(`${FE_BASE_URL}/tim-kiem`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(EVIDENCE_DIR, 'T0_01_initial_load_maxPrice_1000000_bug.png'),
      fullPage: true,
    });
    console.log('[Screenshot] T0_01_initial_load_maxPrice_1000000_bug.png');

    const totalUnfiltered = unfilteredJson?.data?.totalCount ?? 0;
    const totalShownOnInitialLoad = filtered1MJson?.data?.totalCount ?? 0;
    const hiddenHighValueProducts = (unfilteredJson?.data?.items || []).filter(
      (item) => item.minPrice > 1000000
    );

    fs.writeFileSync(
      path.join(API_DIR, '01_initial_search_query_and_response.json'),
      JSON.stringify(
        {
          bugId: 'B1_B3_INITIAL_LOAD_HIDDEN_PRODUCTS',
          feRequestsFiredOnLoad: capturedRequests,
          unfilteredCatalogTotalCount: totalUnfiltered,
          unfilteredMaxPriceFacet: unfilteredJson?.data?.facets?.maxPrice,
          initialLoadTotalCountWithDefault1MCeiling: totalShownOnInitialLoad,
          hiddenProductsAbove1MCount: totalUnfiltered - totalShownOnInitialLoad,
          sampleHiddenProductsAbove1M: hiddenHighValueProducts.slice(0, 5).map((p) => ({
            productId: p.productId,
            name: p.name,
            minPrice: p.minPrice,
            shopName: p.shop?.name,
          })),
          locationUrlAfterLoad: await page.evaluate(() => `${window.location.pathname}${window.location.search}`),
        },
        null,
        2
      )
    );

    // T0_02: Click category & page 2 -> URL path remains /tim-kiem, slider max locked at 1,000,000
    const firstCheckbox = page.locator('.ant-checkbox-input').first();
    if (await firstCheckbox.count()) {
      await firstCheckbox.check();
      await page.waitForTimeout(600);
    }
    await page.screenshot({
      path: path.join(EVIDENCE_DIR, 'T0_02_slider_ceiling_and_no_url_sync_bug.png'),
      fullPage: true,
    });
    console.log('[Screenshot] T0_02_slider_ceiling_and_no_url_sync_bug.png');

    fs.writeFileSync(
      path.join(API_DIR, '02_slider_ceiling_and_url_sync_evidence.json'),
      JSON.stringify(
        {
          bugId: 'B2_B3_SLIDER_CEILING_AND_NO_URL_SYNC',
          locationUrlAfterFilterChange: await page.evaluate(() => `${window.location.pathname}${window.location.search}`),
          sliderPriceText: await page.locator('.ant-card-body').first().innerText(),
        },
        null,
        2
      )
    );

    // T0_03: Mobile viewport 375x812 showing filter sidebar stacking & lack of Drawer on mobile
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(EVIDENCE_DIR, 'T0_03_mobile_unoptimized_filter_stack.png'),
      fullPage: true,
    });
    console.log('[Screenshot] T0_03_mobile_unoptimized_filter_stack.png');

    // T0_04: Simulate 500 API error -> swallowed as "0 sản phẩm phù hợp" (Bug B6)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.route('**/api/v1/products*', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ status: 500, message: 'Internal Server Error' }),
      })
    );
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(EVIDENCE_DIR, 'T0_04_api_error_swallowed_as_empty_bug.png'),
      fullPage: true,
    });
    console.log('[Screenshot] T0_04_api_error_swallowed_as_empty_bug.png');

    console.log('=== T0 Baseline Evidence Captured Successfully ===');
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
