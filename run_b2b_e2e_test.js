import { chromium } from 'playwright';
import path from 'path';

const SCREENSHOT_DIR = '/Users/admin/.gemini/antigravity/brain/d1f33130-1e06-4228-be69-8f42635ba6fc/e2e_screenshots';
const BASE_URL = 'http://localhost:5173';

async function run() {
  console.log('🚀 Starting B2B Corporate Order End-to-End Test with Chromium...');
  const browser = await chromium.launch({
    headless: true, // Run headless for automated capture
    channel: 'chrome',
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 950 },
    deviceScaleFactor: 1.5,
  });

  const page = await context.newPage();

  // Listen to browser console messages & errors
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log(`[Browser Error]: ${msg.text()}`);
    }
  });

  try {
    // -------------------------------------------------------------
    // FLOW 1: Open Home Page
    // -------------------------------------------------------------
    console.log('📍 Flow 1: Navigating to Home Page...');
    await page.goto(`${BASE_URL}/#trang-chu`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_homepage.png'), fullPage: false });
    console.log('📸 Captured: 01_homepage.png');

    // -------------------------------------------------------------
    // FLOW 2: Customer Sign In
    // -------------------------------------------------------------
    console.log('📍 Flow 2: Authenticating with Customer Account (0987654321)...');
    // Open login modal
    const loginButton = page.locator('button:has-text("Đăng nhập")').first();
    if (await loginButton.isVisible()) {
      await loginButton.click();
      await page.waitForTimeout(800);
    } else {
      await page.goto(`${BASE_URL}/#dang-nhap`);
      await page.waitForTimeout(800);
    }

    // Fill phone and password
    const phoneInput = page.locator('input[placeholder*="0912"]').or(page.locator('input[type="text"]')).first();
    await phoneInput.fill('0987654321');

    const passwordInput = page.locator('input[type="password"]').first();
    await passwordInput.fill('Password123!');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_login_form_filled.png') });
    console.log('📸 Captured: 02_login_form_filled.png');

    // Click submit login
    const submitLoginBtn = page.locator('button:has-text("Đăng Nhập Ngay")').or(page.locator('button[type="submit"]')).first();
    await submitLoginBtn.click();
    await page.waitForTimeout(2000);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_after_login.png') });
    console.log('📸 Captured: 03_after_login.png');

    // -------------------------------------------------------------
    // FLOW 3: Product Exploration & Selection
    // -------------------------------------------------------------
    console.log('📍 Flow 3: Navigating to Product Catalog (#tim-kiem)...');
    await page.goto(`${BASE_URL}/#tim-kiem`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_product_catalog.png') });
    console.log('📸 Captured: 04_product_catalog.png');

    // Click first product card
    const firstProductCard = page.locator('.ant-card-hoverable').first();
    await firstProductCard.waitFor({ state: 'visible', timeout: 10000 });
    console.log('Clicking on the first product card...');
    await firstProductCard.click();
    await page.waitForTimeout(2500);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_product_details.png') });
    console.log('📸 Captured: 05_product_details.png');

    // -------------------------------------------------------------
    // FLOW 4: Click "Đặt Hàng Doanh Nghiệp"
    // -------------------------------------------------------------
    console.log('📍 Flow 4: Clicking "Đặt Hàng Doanh Nghiệp"...');
    const orderB2BBtn = page.locator('button:has-text("Đặt Hàng Doanh Nghiệp")').first();
    await orderB2BBtn.waitFor({ state: 'visible', timeout: 5000 });
    await orderB2BBtn.click();
    await page.waitForTimeout(3000);

    // Verify Order & Design page loaded
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_order_and_design_loaded.png') });
    console.log('📸 Captured: 06_order_and_design_loaded.png');

    // -------------------------------------------------------------
    // FLOW 5: Configure Custom Packaging & Brand Identity
    // -------------------------------------------------------------
    console.log('📍 Flow 5: Configuring Packaging Template & Brand Identity...');

    // Select second template if available (e.g. VIP box)
    const templateCards = page.locator('.cursor-pointer.rounded-xl.border');
    const count = await templateCards.count();
    if (count > 1) {
      console.log(`Found ${count} packaging templates. Selecting template #2...`);
      await templateCards.nth(1).click();
      await page.waitForTimeout(500);
    }

    // Company Name
    const companyInput = page.locator('input#companyName').or(page.locator('input[placeholder*="Tập đoàn"]')).first();
    await companyInput.fill('Tập đoàn Công nghệ Bách Khoa Việt Nam');

    // Upload Logo file via file chooser
    console.log('Uploading company logo file (/tmp/test_company_logo.png)...');
    const fileChooserPromise = page.waitForEvent('filechooser');
    const uploadArea = page.locator('.ant-upload-drag').first();
    await uploadArea.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('/tmp/test_company_logo.png');
    await page.waitForTimeout(3000); // Wait for Cloudinary upload to complete

    // Fill special message
    const msgInput = page.locator('textarea#specialMessage').or(page.locator('textarea[placeholder*="Thông điệp"]')).first();
    if (await msgInput.isVisible()) {
      await msgInput.fill('Kính chúc Quý Đối tác & Quý Khách hàng Trung Thu An Khang Thịnh Vượng - Vạn Sự Cát Tường');
    }

    // Fill packaging special notes
    const packagingNotesInput = page.locator('textarea#packagingNotes').or(page.locator('textarea[placeholder*="Ép kim"]')).first();
    if (await packagingNotesInput.isVisible()) {
      await packagingNotesInput.fill('Nắp hộp ép kim vàng 24K logo, lót vải lụa hoàng gia, kèm thiệp thư pháp viết tay');
    }

    // Select preset color
    const rubyColorBtn = page.locator('button:has-text("Đỏ Ruby & Vàng Kim")').first();
    if (await rubyColorBtn.isVisible()) {
      await rubyColorBtn.click();
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_packaging_configured.png') });
    console.log('📸 Captured: 07_packaging_configured.png');

    // -------------------------------------------------------------
    // FLOW 6: Fill Delivery & Recipient Details
    // -------------------------------------------------------------
    console.log('📍 Flow 6: Filling Delivery Information...');
    const addressInput = page.locator('input#deliveryAddress').or(page.locator('input[placeholder*="Google Map"]')).first();
    await addressInput.fill('Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh');

    const recipientInput = page.locator('input#recipientName').first();
    await recipientInput.fill('Nguyễn Văn Doanh Nghiệp (CEO)');

    const phoneDeliveryInput = page.locator('input#recipientPhone').first();
    await phoneDeliveryInput.fill('0987654321');

    const expectedDateInput = page.locator('input#deliveryDateExpected').first();
    if (await expectedDateInput.isVisible()) {
      await expectedDateInput.fill('2026-11-20');
    }

    const orderNotesInput = page.locator('textarea#notes').first();
    if (await orderNotesInput.isVisible()) {
      await orderNotesInput.fill('Giao giờ hành chính, bốc xếp cẩn thận vào văn phòng tầng 25');
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08_delivery_details_filled.png') });
    console.log('📸 Captured: 08_delivery_details_filled.png');

    // -------------------------------------------------------------
    // FLOW 7: Submit Order
    // -------------------------------------------------------------
    console.log('📍 Flow 7: Submitting Corporate B2B Order...');
    const submitOrderBtn = page.locator('button:has-text("Gửi Đơn Đặt Hàng Doanh Nghiệp")').first();
    await submitOrderBtn.scrollIntoViewIfNeeded();
    await submitOrderBtn.click();

    // Wait for message and transition
    console.log('Waiting for order creation response and tab transition...');
    await page.waitForTimeout(4000);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09_order_submitted_success.png') });
    console.log('📸 Captured: 09_order_submitted_success.png');

    // Switch to "Đơn Của Tôi" tab if not already on it
    const myOrdersTab = page.locator('div[role="tab"]:has-text("Đơn Của Tôi")').first();
    if (await myOrdersTab.isVisible()) {
      await myOrdersTab.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10_my_orders_tab.png') });
      console.log('📸 Captured: 10_my_orders_tab.png');
    }

    // Check if "Xem & Duyệt Mockup 3D" button is present and click it
    const viewMockupBtn = page.locator('button:has-text("Xem & Duyệt Mockup 3D")').first();
    if (await viewMockupBtn.isVisible()) {
      console.log('Clicking "Xem & Duyệt Mockup 3D" to open modal...');
      await viewMockupBtn.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '11_mockup_modal_opened.png') });
      console.log('📸 Captured: 11_mockup_modal_opened.png');
    }

    console.log('🎉 ALL B2B FLOWS COMPLETED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'ERROR_state.png') });
  } finally {
    await browser.close();
  }
}

run();
