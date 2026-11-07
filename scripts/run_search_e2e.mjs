import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';
import {
  ENCODED_PAGE_NUMBER_PARAM,
  ENCODED_PAGE_SIZE_PARAM,
  encodePageNumber,
  encodePageSize,
} from '../src/utils/searchQuery.js';

const BASE_URL = 'http://127.0.0.1:5173';
const API_BASE = 'http://localhost:8089';
const AFTER_DIR = path.resolve('d:/PRN232/mooncake-fe/.agents/evidence/SEARCH/AFTER');
const RESP_DIR = path.resolve('d:/PRN232/mooncake-fe/.agents/evidence/SEARCH/responsive');
const API_DIR = path.resolve('d:/PRN232/mooncake-fe/.agents/evidence/SEARCH/AFTER/api');

function assert(condition, message) {
  if (!condition) {
    throw new Error(`ASSERTION FAILED: ${message}`);
  }
}

function unwrapData(json) {
  return json?.data ?? json;
}

async function waitForSearchIdle(page) {
  await page.waitForTimeout(350);
  await page
    .locator('[data-testid="search-loading-skeleton"]')
    .waitFor({ state: 'detached', timeout: 10000 })
    .catch(() => {});
  await page.waitForTimeout(200);
}

async function main() {
  await fs.mkdir(AFTER_DIR, { recursive: true });
  await fs.mkdir(RESP_DIR, { recursive: true });
  await fs.mkdir(API_DIR, { recursive: true });

  const reportLog = {
    executedAt: new Date().toISOString(),
    scenarios: [],
    responsiveChecks: [],
    apiValidationChecks: [],
  };

  // 1. Direct Backend API Validation Checks
  const apiDefaultRes = await fetch(`${API_BASE}/api/v1/products?pageSize=9`);
  const apiDefaultJson = unwrapData(await apiDefaultRes.json());
  assert(apiDefaultRes.status === 200, 'GET /api/v1/products returns 200');
  assert(apiDefaultJson.pageSize === 9, `pageSize is 9 (got ${apiDefaultJson.pageSize})`);
  assert(apiDefaultJson.page === 1, `Default page is 1 (got ${apiDefaultJson.page})`);
  assert(apiDefaultJson.items.length === 9, `Default items length is 9 (got ${apiDefaultJson.items.length})`);

  const apiPageNumberRes = await fetch(`${API_BASE}/api/v1/products?pageNumber=2&pageSize=9`);
  const apiPageNumberJson = unwrapData(await apiPageNumberRes.json());
  assert(apiPageNumberRes.status === 200, 'GET /api/v1/products?pageNumber=2&pageSize=9 returns 200');
  assert(apiPageNumberJson.page === 2, `pageNumber=2 maps to page=2 (got ${apiPageNumberJson.page})`);

  const apiInvalidSizeRes = await fetch(`${API_BASE}/api/v1/products?pageSize=101`);
  assert(apiInvalidSizeRes.status === 400, `pageSize=101 returns 400 (got ${apiInvalidSizeRes.status})`);

  const apiInvalidSortRes = await fetch(`${API_BASE}/api/v1/products?sort=invalidSort`);
  assert(apiInvalidSortRes.status === 400, `sort=invalidSort returns 400 (got ${apiInvalidSortRes.status})`);

  reportLog.apiValidationChecks.push(
    { check: 'Default pageSize=9 & page=1', status: 'PASSED', totalCount: apiDefaultJson.totalCount },
    { check: 'pageNumber=2 parameter binding', status: 'PASSED', page: apiPageNumberJson.page },
    { check: 'pageSize=101 rejected with 400 Bad Request', status: 'PASSED', httpStatus: apiInvalidSizeRes.status },
    { check: 'sort=invalidSort rejected with 400 Bad Request', status: 'PASSED', httpStatus: apiInvalidSortRes.status }
  );

  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    page.on('pageerror', (err) => {
      console.error('[PAGE ERROR]', err);
    });
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error('[CONSOLE ERROR]', msg.text());
      }
    });

    const capturedSearches = [];
    page.on('response', async (res) => {
      const url = res.url();
      if (
        url.includes('/api/v1/products') &&
        !url.includes('/categories') &&
        !url.includes('/regions') &&
        !url.includes('/autocomplete')
      ) {
        try {
          const rawBody = await res.json();
          const body = unwrapData(rawBody);
          capturedSearches.push({ url, status: res.status(), body });
        } catch {
          // ignore
        }
      }
    });

    // =========================================================================
    // S1: Initial load -> pageSize=10, pageNumber=1, NO maxPrice=1000000 bug,
    //     and NO transient error flash on reload (StrictMode AbortController check)
    // =========================================================================
    let transientErrorFlashDetected = false;
    await page.goto(`${BASE_URL}/#tim-kiem`, { waitUntil: 'domcontentloaded' });
    if ((await page.locator('[data-testid="search-error-alert"]').count()) > 0) {
      transientErrorFlashDetected = true;
    }
    await page.waitForTimeout(100);
    if ((await page.locator('[data-testid="search-error-alert"]').count()) > 0) {
      transientErrorFlashDetected = true;
    }
    await waitForSearchIdle(page);
    assert(
      !transientErrorFlashDetected,
      'Must NOT flash transient error alert during initial StrictMode load/reload'
    );

    const s1LastSearch = capturedSearches[capturedSearches.length - 1];
    assert(s1LastSearch, 'Initial search request captured');
    assert(!s1LastSearch.url.includes('maxPrice='), `Initial URL must not include maxPrice: ${s1LastSearch.url}`);
    assert(s1LastSearch.url.includes('pageNumber=1&pageSize=9'), `API request must send raw pageNumber=1&pageSize=9: ${s1LastSearch.url}`);
    assert(!page.url().includes('pageNumber=') && !page.url().includes('pageSize='), `UI URL must encode both param names and values: ${page.url()}`);
    assert(
      page.url().includes(`${ENCODED_PAGE_NUMBER_PARAM}=${encodePageNumber(1)}`) &&
        page.url().includes(`${ENCODED_PAGE_SIZE_PARAM}=${encodePageSize(9)}`),
      `UI URL contains encoded param keys and values: ${page.url()}`
    );
    assert(s1LastSearch.body.totalCount >= 64, `Unfiltered totalCount >= 64 (got ${s1LastSearch.body.totalCount})`);

    const s1CardCount = await page.locator('[data-testid="product-search-card"]').count();
    assert(s1CardCount === 9, `Initial page renders 9 product cards (got ${s1CardCount})`);
    assert(
      (await page.locator('[data-testid="toolbar-pagesize-select"]').count()) === 0,
      'Toolbar pageSize selector is removed'
    );
    assert(
      (await page.locator('.ant-pagination-options').count()) === 0,
      'Pagination showSizeChanger & showQuickJumper options are removed'
    );
    assert(
      (await page.locator('.ant-pagination-total-text').count()) === 0,
      'Pagination showTotal text is removed'
    );

    await page.screenshot({
      path: path.join(AFTER_DIR, 'S1_01_initial_load_pageSize10_all_prices.png'),
      fullPage: true,
    });
    const page1Ids = s1LastSearch.body.items.map((x) => x.productId);
    reportLog.scenarios.push({
      id: 'S1',
      name: 'Initial Load (pageSize=9 fixed, pageNumber=1, full price catalog, no pageSize changer)',
      status: 'PASSED',
      url: page.url(),
      apiUrl: s1LastSearch.url,
      totalCount: s1LastSearch.body.totalCount,
      renderedCards: s1CardCount,
      screenshot: 'AFTER/S1_01_initial_load_pageSize10_all_prices.png',
    });

    // =========================================================================
    // S2: Navigate to Page 2 -> disjoint items, URL sync
    // =========================================================================
    await page.locator('.ant-pagination-item-2').click();
    await waitForSearchIdle(page);

    const s2LastSearch = capturedSearches[capturedSearches.length - 1];
    assert(
      page.url().includes(`${ENCODED_PAGE_NUMBER_PARAM}=${encodePageNumber(2)}`) &&
        !page.url().includes('pageNumber='),
      `UI URL updated with encoded page 2 param & value: ${page.url()}`
    );
    assert(
      s2LastSearch.url.includes('pageNumber=2&pageSize=9'),
      `API request sends raw pageNumber=2&pageSize=9: ${s2LastSearch.url}`
    );
    const page2Ids = s2LastSearch.body.items.map((x) => x.productId);
    const overlapIds = page1Ids.filter((id) => page2Ids.includes(id));
    assert(overlapIds.length === 0, `Page 1 and Page 2 items must be disjoint (overlap: ${overlapIds.length})`);

    await page.screenshot({
      path: path.join(AFTER_DIR, 'S2_01_pagination_page2_disjoint_items.png'),
      fullPage: true,
    });
    reportLog.scenarios.push({
      id: 'S2',
      name: 'Pagination Page 2 Navigation & Disjoint Item Verification',
      status: 'PASSED',
      url: page.url(),
      apiUrl: s2LastSearch.url,
      overlapCount: overlapIds.length,
      screenshot: 'AFTER/S2_01_pagination_page2_disjoint_items.png',
    });

    // =========================================================================
    // S3: URL Tampering raw pageNumber=99&pageSize=100 -> Stripped & Re-encoded on UI URL, raw 1&9 on API
    // =========================================================================
    await page.goto(`${BASE_URL}/#tim-kiem?pageNumber=99&pageSize=100`, {
      waitUntil: 'networkidle',
    });
    await waitForSearchIdle(page);

    assert(
      !page.url().includes('pageNumber=') &&
        !page.url().includes('pageSize=') &&
        page.url().includes(`${ENCODED_PAGE_NUMBER_PARAM}=${encodePageNumber(1)}`) &&
        page.url().includes(`${ENCODED_PAGE_SIZE_PARAM}=${encodePageSize(9)}`),
      `Tampered raw params stripped and replaced with encoded tokens on UI URL: ${page.url()}`
    );
    const s3LastSearch = capturedSearches[capturedSearches.length - 1];
    assert(
      s3LastSearch.url.includes('pageNumber=1&pageSize=9'),
      `API request still sends raw pageNumber=1&pageSize=9: ${s3LastSearch.url}`
    );
    const s3CardCount = await page.locator('[data-testid="product-search-card"]').count();
    assert(s3CardCount === 9, `Fixed pageSize=9 renders 9 cards (got ${s3CardCount})`);

    await page.screenshot({
      path: path.join(AFTER_DIR, 'S3_01_pageSize20_resets_to_page1.png'),
      fullPage: true,
    });
    reportLog.scenarios.push({
      id: 'S3',
      name: 'Enforce Fixed pageSize=10 When URL Tampered (?pageSize=100 -> pageSize=10)',
      status: 'PASSED',
      url: page.url(),
      renderedCards: s3CardCount,
      screenshot: 'AFTER/S3_01_pageSize20_resets_to_page1.png',
    });

    // =========================================================================
    // S4: Keyword Search + Quick Tag + Active Chip
    // =========================================================================
    const searchInput = page.locator('input[placeholder="Tìm theo tên sản phẩm hoặc gian hàng"]');
    await searchInput.fill('Hoàng Kim');
    await searchInput.press('Enter');
    await waitForSearchIdle(page);

    const s4LastSearch = capturedSearches[capturedSearches.length - 1];
    assert(s4LastSearch.body.totalCount > 0, 'Keyword "Hoàng Kim" returns matching products');
    const chipsText = await page.locator('[data-testid="active-filter-chips"]').innerText();
    assert(chipsText.includes('Hoàng Kim'), `Active chip shows keyword: ${chipsText}`);

    await page.screenshot({
      path: path.join(AFTER_DIR, 'S4_01_keyword_search_hoang_kim.png'),
      fullPage: true,
    });
    reportLog.scenarios.push({
      id: 'S4',
      name: 'Keyword Search ("Hoàng Kim") & Active Filter Chip',
      status: 'PASSED',
      url: page.url(),
      matchedCount: s4LastSearch.body.totalCount,
      screenshot: 'AFTER/S4_01_keyword_search_hoang_kim.png',
    });

    // =========================================================================
    // S5: Category + Region Filter Data Consistency
    // =========================================================================
    await page.locator('[data-testid="clear-all-chips-btn"]').click();
    await waitForSearchIdle(page);

    await page.locator('[data-testid="filter-category-group"] label', { hasText: 'Bánh nướng truyền thống' }).click();
    await waitForSearchIdle(page);
    await page.locator('[data-testid="filter-region-group"] label', { hasText: 'TP. Hồ Chí Minh' }).click();
    await waitForSearchIdle(page);

    const s5LastSearch = capturedSearches[capturedSearches.length - 1];
    assert(s5LastSearch.body.items.length > 0, 'Category + Region filter returns matching items');
    for (const item of s5LastSearch.body.items) {
      assert(
        item.category.name === 'Bánh nướng truyền thống',
        `Item category must be Bánh nướng truyền thống (got ${item.category.name})`
      );
      assert(
        item.shop.regionCode === 'HCM',
        `Item shop regionCode must be HCM (got ${item.shop.regionCode})`
      );
    }

    await page.screenshot({
      path: path.join(AFTER_DIR, 'S5_01_category_and_region_filter.png'),
      fullPage: true,
    });
    reportLog.scenarios.push({
      id: 'S5',
      name: 'Multi-Filter Consistency: Category ("Bánh nướng truyền thống") + Region ("HCM")',
      status: 'PASSED',
      url: page.url(),
      matchedCount: s5LastSearch.body.totalCount,
      verifiedAllItemsMatch: true,
      screenshot: 'AFTER/S5_01_category_and_region_filter.png',
    });

    // =========================================================================
    // S6: Price Filter Presets ("Trên 1 Triệu" & "Dưới 500K") + Ceiling Preservation
    // =========================================================================
    await page.locator('[data-testid="clear-all-chips-btn"]').click();
    await waitForSearchIdle(page);

    await page.locator('.ant-tag', { hasText: 'Trên 1 Triệu' }).click();
    await waitForSearchIdle(page);
    const s6HighPriceSearch = capturedSearches[capturedSearches.length - 1];
    assert(
      s6HighPriceSearch.body.totalCount >= 13,
      `Products >= 1,000,000 VND found: ${s6HighPriceSearch.body.totalCount}`
    );
    for (const item of s6HighPriceSearch.body.items) {
      assert(
        item.maxPrice >= 1000000,
        `Item maxPrice must be >= 1,000,000 (got ${item.maxPrice})`
      );
    }

    // Now click "Dưới 500K" and verify slider ceiling does NOT shrink to 500K/1M
    await page.locator('.ant-tag', { hasText: 'Dưới 500K' }).click();
    await waitForSearchIdle(page);
    const sliderUpperHandle = page.locator('.ant-slider-handle').nth(1);
    const ariaMaxAfterLowFilter = Number(await sliderUpperHandle.getAttribute('aria-valuemax'));
    assert(
      ariaMaxAfterLowFilter >= 3600000,
      `Slider ceiling preserved at >= 3,600,000 after filtering <= 500K (got ${ariaMaxAfterLowFilter})`
    );

    await page.screenshot({
      path: path.join(AFTER_DIR, 'S6_01_price_filter_and_ceiling_preserved.png'),
      fullPage: true,
    });
    reportLog.scenarios.push({
      id: 'S6',
      name: 'Price Range Filter & Slider Ceiling Preservation (>= 3.6M VND)',
      status: 'PASSED',
      highPriceProductCount: s6HighPriceSearch.body.totalCount,
      preservedSliderCeiling: ariaMaxAfterLowFilter,
      screenshot: 'AFTER/S6_01_price_filter_and_ceiling_preserved.png',
    });

    // =========================================================================
    // S7: B2B Filters (Reputation >= 90, MOQ <= 20, Custom Packaging, In Stock)
    // =========================================================================
    await page.locator('[data-testid="clear-all-chips-btn"]').click();
    await waitForSearchIdle(page);

    await page.locator('[data-testid="filter-reputation-select"]').click();
    await page.locator('.ant-select-item-option-content', { hasText: 'Từ 90 điểm' }).click();
    await waitForSearchIdle(page);

    await page.locator('[data-testid="filter-moq-select"]').click();
    await page.locator('.ant-select-item-option-content', { hasText: 'MOQ ≤ 20 hộp' }).click();
    await waitForSearchIdle(page);

    await page.locator('label', { hasText: 'Có bao bì tuỳ chỉnh' }).click();
    await waitForSearchIdle(page);

    await page.locator('label', { hasText: 'Còn hàng' }).click();
    await waitForSearchIdle(page);

    const s7LastSearch = capturedSearches[capturedSearches.length - 1];
    assert(s7LastSearch.body.items.length > 0, 'Combined B2B filters return matching items');
    for (const item of s7LastSearch.body.items) {
      assert(item.shop.reputationScore >= 90, `Reputation >= 90 (got ${item.shop.reputationScore})`);
      assert(item.minOrderQty <= 20, `MOQ <= 20 (got ${item.minOrderQty})`);
      assert(item.supportsCustomPackaging === true, 'supportsCustomPackaging === true');
      assert(item.effectiveStatus === 'Active', `effectiveStatus === Active (got ${item.effectiveStatus})`);
    }

    await page.screenshot({
      path: path.join(AFTER_DIR, 'S7_01_b2b_reputation_moq_custom_instock.png'),
      fullPage: true,
    });
    reportLog.scenarios.push({
      id: 'S7',
      name: 'B2B Combined Filters (Reputation >= 90, MOQ <= 20, Custom Packaging, In Stock)',
      status: 'PASSED',
      url: page.url(),
      matchedCount: s7LastSearch.body.totalCount,
      screenshot: 'AFTER/S7_01_b2b_reputation_moq_custom_instock.png',
    });

    // =========================================================================
    // S8: Sort Options & List View Mode Toggle
    // =========================================================================
    await page.locator('[data-testid="clear-all-chips-btn"]').click();
    await waitForSearchIdle(page);

    await page.locator('[data-testid="search-sort-select"]').click();
    await page.locator('.ant-select-item-option-content', { hasText: 'Giá giảm dần' }).click();
    await waitForSearchIdle(page);

    const s8LastSearch = capturedSearches[capturedSearches.length - 1];
    const s8Prices = s8LastSearch.body.items.map((x) => x.minPrice);
    for (let i = 1; i < s8Prices.length; i += 1) {
      assert(
        s8Prices[i - 1] >= s8Prices[i],
        `priceDesc order violated at index ${i}: ${s8Prices[i - 1]} < ${s8Prices[i]}`
      );
    }

    // Switch to List View
    await page.locator('[data-testid="search-view-mode"] .ant-segmented-item').nth(1).click();
    await page.waitForTimeout(250);
    const listVisible = await page.locator('[data-testid="search-results-list"]').isVisible();
    assert(listVisible, 'List view container is visible');

    await page.screenshot({
      path: path.join(AFTER_DIR, 'S8_01_sort_priceDesc_and_list_view.png'),
      fullPage: true,
    });
    reportLog.scenarios.push({
      id: 'S8',
      name: 'Sort by Price Descending ("priceDesc") & List View Mode',
      status: 'PASSED',
      topPrices: s8Prices.slice(0, 5),
      screenshot: 'AFTER/S8_01_sort_priceDesc_and_list_view.png',
    });

    // Switch back to Grid View
    await page.locator('[data-testid="search-view-mode"] .ant-segmented-item').nth(0).click();
    await page.waitForTimeout(200);

    // =========================================================================
    // S9: Deep-link Out-of-Range Page Auto-Clamping (encoded page 999 -> maxValidPage 8)
    // =========================================================================
    await page.goto(
      `${BASE_URL}/#tim-kiem?${ENCODED_PAGE_NUMBER_PARAM}=${encodePageNumber(999)}&${ENCODED_PAGE_SIZE_PARAM}=${encodePageSize(9)}`,
      {
        waitUntil: 'networkidle',
      }
    );
    await waitForSearchIdle(page);
    await page.waitForTimeout(400);

    const clampedUrl = page.url();
    assert(
      clampedUrl.includes(`${ENCODED_PAGE_NUMBER_PARAM}=${encodePageNumber(8)}`) &&
        !clampedUrl.includes('pageNumber=') &&
        !clampedUrl.includes('pageSize='),
      `Out-of-range encoded page 999 auto-clamped to encoded page 8 (got ${clampedUrl})`
    );
    const clampedCards = await page.locator('[data-testid="product-search-card"]').count();
    assert(clampedCards > 0, `Clamped last page renders ${clampedCards} cards`);

    await page.screenshot({
      path: path.join(AFTER_DIR, 'S9_01_out_of_range_page_auto_clamped.png'),
      fullPage: true,
    });
    reportLog.scenarios.push({
      id: 'S9',
      name: 'URL Deep-Link & Out-of-Range Page Auto-Clamping (pageNumber=999 -> 8)',
      status: 'PASSED',
      clampedUrl,
      renderedCards: clampedCards,
      screenshot: 'AFTER/S9_01_out_of_range_page_auto_clamped.png',
    });

    // =========================================================================
    // S10: Empty State & One-Click Reset
    // =========================================================================
    await page.goto(`${BASE_URL}/#tim-kiem?q=KHONG_TON_TAI_SAN_PHAM_99999`, {
      waitUntil: 'networkidle',
    });
    await waitForSearchIdle(page);

    const emptyStateVisible = await page.locator('[data-testid="search-empty-state"]').isVisible();
    assert(emptyStateVisible, 'Empty state card is visible when 0 items match');

    await page.screenshot({
      path: path.join(AFTER_DIR, 'S10_01_empty_state_with_reset_cta.png'),
      fullPage: true,
    });

    await page.locator('[data-testid="empty-reset-filters-btn"]').click();
    await waitForSearchIdle(page);
    const restoredCount = await page.locator('[data-testid="product-search-card"]').count();
    assert(restoredCount === 9, `Clicking reset restores 9 cards on page 1 (got ${restoredCount})`);

    reportLog.scenarios.push({
      id: 'S10',
      name: 'Empty Search Result State & One-Click Filter Reset',
      status: 'PASSED',
      restoredCardsAfterReset: restoredCount,
      screenshot: 'AFTER/S10_01_empty_state_with_reset_cta.png',
    });

    // =========================================================================
    // S11: API Error Alert & Retry Recovery (Fixes T0 Swallowed Error Bug)
    // =========================================================================
    let failOnce = true;
    await page.route('**/api/v1/products*', async (route) => {
      const reqUrl = route.request().url();
      if (
        failOnce &&
        !reqUrl.includes('/categories') &&
        !reqUrl.includes('/regions') &&
        !reqUrl.includes('/autocomplete')
      ) {
        failOnce = false;
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Lỗi kết nối máy chủ tìm kiếm tạm thời (Simulated 500)' }),
        });
        return;
      }
      await route.continue();
    });

    await page.goto(`${BASE_URL}/#tim-kiem?q=TestErrorRetry`, { waitUntil: 'networkidle' });
    await waitForSearchIdle(page);

    const errorAlertVisible = await page.locator('[data-testid="search-error-alert"]').isVisible();
    assert(errorAlertVisible, 'Error Alert is displayed when API returns 500');

    await page.screenshot({
      path: path.join(AFTER_DIR, 'S11_01_api_error_alert_with_retry.png'),
      fullPage: true,
    });

    await page.unroute('**/api/v1/products*');
    await page.locator('[data-testid="search-retry-btn"]').click();
    await waitForSearchIdle(page);
    const errorAlertAfterRetry = await page.locator('[data-testid="search-error-alert"]').count();
    assert(errorAlertAfterRetry === 0, 'Error Alert cleared after clicking Retry');

    reportLog.scenarios.push({
      id: 'S11',
      name: 'API 500 Error Alert & Retry Button Recovery',
      status: 'PASSED',
      errorAlertDisplayed: true,
      recoveredOnRetry: true,
      screenshot: 'AFTER/S11_01_api_error_alert_with_retry.png',
    });

    await context.close();

    // =========================================================================
    // RESPONSIVE VIEWPORT VERIFICATION (5 Viewports)
    // =========================================================================
    const viewports = [
      { name: 'mobile_sm_375x812', width: 375, height: 812, file: 'resp_01_mobile_375x812.png', expectMobileDrawer: true },
      { name: 'mobile_lg_430x932', width: 430, height: 932, file: 'resp_02_mobile_large_430x932.png', expectMobileDrawer: true },
      { name: 'tablet_768x1024', width: 768, height: 1024, file: 'resp_03_tablet_768x1024.png', expectMobileDrawer: false },
      { name: 'desktop_1440x900', width: 1440, height: 900, file: 'resp_04_desktop_1440x900.png', expectMobileDrawer: false },
      { name: 'fhd_1920x1080', width: 1920, height: 1080, file: 'resp_05_fhd_1920x1080.png', expectMobileDrawer: false },
    ];

    for (const vp of viewports) {
      const vpContext = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const vpPage = await vpContext.newPage();
      await vpPage.goto(`${BASE_URL}/#tim-kiem`, { waitUntil: 'networkidle' });
      await waitForSearchIdle(vpPage);

      const overflowInfo = await vpPage.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      const hasHorizontalOverflow = overflowInfo.scrollWidth > overflowInfo.clientWidth + 2;
      assert(
        !hasHorizontalOverflow,
        `No horizontal overflow on ${vp.name} (scrollWidth=${overflowInfo.scrollWidth}, clientWidth=${overflowInfo.clientWidth})`
      );

      await vpPage.screenshot({
        path: path.join(RESP_DIR, vp.file),
        fullPage: true,
      });

      if (vp.name === 'mobile_sm_375x812') {
        const trigger = vpPage.locator('[data-testid="mobile-filter-trigger"]');
        assert(await trigger.isVisible(), 'Mobile filter drawer button is visible at 375px');
        await trigger.click();
        await vpPage.waitForTimeout(400);
        await vpPage.screenshot({
          path: path.join(RESP_DIR, 'resp_01b_mobile_filter_drawer_375x812.png'),
          fullPage: false,
        });
      }

      reportLog.responsiveChecks.push({
        viewport: `${vp.width}x${vp.height}`,
        name: vp.name,
        clientWidth: overflowInfo.clientWidth,
        scrollWidth: overflowInfo.scrollWidth,
        horizontalOverflow: hasHorizontalOverflow,
        status: 'PASSED',
        screenshot: `responsive/${vp.file}`,
      });

      await vpContext.close();
    }

    await fs.writeFile(
      path.join(API_DIR, 'e2e_verification_summary.json'),
      JSON.stringify(reportLog, null, 2),
      'utf8'
    );

    console.log('ALL SEARCH E2E & RESPONSIVE CHECKS PASSED:', JSON.stringify(reportLog, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error('SEARCH E2E FAILED:', err);
  process.exit(1);
});
