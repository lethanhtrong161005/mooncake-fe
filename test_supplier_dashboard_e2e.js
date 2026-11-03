import { chromium } from 'playwright';
import path from 'path';

const SCREENSHOT_DIR = '/Users/admin/.gemini/antigravity/brain/d1f33130-1e06-4228-be69-8f42635ba6fc/e2e_screenshots';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('1. Navigating to homepage...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Clear existing storage to ensure clean login
  await page.evaluate(() => {
    localStorage.clear();
  });
  await page.reload({ waitUntil: 'networkidle' });

  console.log('2. Opening login modal...');
  const loginBtn = page.locator('button:has-text("Đăng nhập"), a:has-text("Đăng nhập")').first();
  await loginBtn.click();
  await page.waitForTimeout(800);

  console.log('3. Filling supplier credentials (0356088749 / Password123!)...');
  const phoneInput = page.locator('input[placeholder*="0912"]').or(page.locator('input[type="text"]')).first();
  await phoneInput.fill('0356088749');

  const passwordInput = page.locator('input[type="password"]').first();
  await passwordInput.fill('Password123!');

  const submitLogin = page.locator('button:has-text("Đăng Nhập Ngay")').or(page.locator('button[type="submit"]')).first();
  await submitLogin.click();

  console.log('4. Waiting for authenticated session...');
  await page.waitForTimeout(2000);

  console.log('5. Navigating to Supplier Dashboard (nha-cung-cap/dashboard)...');
  await page.evaluate(() => {
    window.location.hash = '#nha-cung-cap/dashboard';
    window.dispatchEvent(new CustomEvent('app:navigate', { detail: 'nha-cung-cap/dashboard' }));
  });
  await page.waitForTimeout(3000);

  // Take screenshot of Supplier Dashboard
  const dashboardPath = path.join(SCREENSHOT_DIR, '12_supplier_dashboard_overview.png');
  await page.screenshot({ path: dashboardPath, fullPage: true });
  console.log(`Saved screenshot: ${dashboardPath}`);

  // Click on "Mockup" button in the table to test custom packaging modal
  const mockupBtn = page.locator('button:has-text("Mockup")').first();
  if (await mockupBtn.isVisible()) {
    console.log('6. Opening Mockup details modal...');
    await mockupBtn.click();
    await page.waitForTimeout(1500);

    const mockupModalPath = path.join(SCREENSHOT_DIR, '13_supplier_packaging_modal.png');
    await page.screenshot({ path: mockupModalPath, fullPage: true });
    console.log(`Saved screenshot: ${mockupModalPath}`);

    // Close modal
    const closeBtn = page.locator('.ant-modal-close').first();
    await closeBtn.click();
    await page.waitForTimeout(800);
  }

  // Navigate to Order Management page (nha-cung-cap/quan-ly-don-hang)
  console.log('7. Navigating to Supplier Order Management via sidebar menu...');
  const orderMenuItem = page.locator('.ant-menu-item:has-text("Đơn hàng & In ấn logo")').first();
  await orderMenuItem.click();
  await page.waitForTimeout(2500);

  const orderManagePath = path.join(SCREENSHOT_DIR, '14_supplier_order_manage.png');
  await page.screenshot({ path: orderManagePath, fullPage: true });
  console.log(`Saved screenshot: ${orderManagePath}`);

  await browser.close();
  console.log('E2E Supplier Dashboard verification completed successfully!');
}

run().catch((err) => {
  console.error('Test run failed:', err);
  process.exit(1);
});
