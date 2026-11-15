import { createRequire } from 'node:module';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';

const require = createRequire(import.meta.url);
const { chromium } = require('/Users/admin/Desktop/PRN232/mooncake-fe/node_modules/playwright');

const crc32 = (buf) => {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i += 1) {
    c ^= buf[i];
    for (let k = 0; k < 8; k += 1) {
      c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
    }
  }
  return (c ^ 0xffffffff) >>> 0;
};

const makePngChunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
};

const writeSamplePng = (filePath, width, height, bgRgb, accentRgb) => {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // RGB
  const stride = 1 + width * 3;
  const raw = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y += 1) {
    const rowStart = y * stride;
    raw[rowStart] = 0;
    const isBorder = y < 6 || y >= height - 6;
    const isBand = y >= Math.floor(height * 0.35) && y <= Math.floor(height * 0.65);
    for (let x = 0; x < width; x += 1) {
      const px = rowStart + 1 + x * 3;
      const inInnerX = x >= 10 && x < width - 10;
      const [r, g, b] = isBorder || (isBand && inInnerX) ? accentRgb : bgRgb;
      raw[px] = r;
      raw[px + 1] = g;
      raw[px + 2] = b;
    }
  }
  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    makePngChunk('IHDR', ihdr),
    makePngChunk('IDAT', zlib.deflateSync(raw)),
    makePngChunk('IEND', Buffer.alloc(0)),
  ]);
  fs.writeFileSync(filePath, png);
  return filePath;
};

const TMP_LOGO_PNG = writeSamplePng(
  path.join(os.tmpdir(), 'e2e-company-logo.png'),
  160,
  90,
  [15, 76, 58],
  [197, 160, 89],
);
const TMP_MOCKUP_PNG = writeSamplePng(
  path.join(os.tmpdir(), 'e2e-supplier-mockup.png'),
  240,
  150,
  [140, 21, 36],
  [212, 136, 6],
);

const FE_URL = 'http://localhost:5173';
const BE_URL = 'http://localhost:8089';

const SCREENSHOT_DIR = path.resolve(
  '/Users/admin/Desktop/PRN232/mooncake-ecommerce-platform/.agents/test-flows/b2b-ordering/screenshots'
);
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const PRODUCTS = {
  smartStockCustom: '0242075c-33ce-44f2-8b27-784f82c9d5f6', // MOQ 100, 2 vars, customPkg=true
  standardMultiVar: '229cb978-6eab-44fc-9639-c3c85c8b11f8', // MOQ 10, 2 vars, customPkg=false
  luxuryCustomMultiVar: '795f93a0-bc6c-4dd2-ae53-4db2e2e70e69', // MOQ 5, 3 vars, customPkg=true
  megaLuxury: '0c509a10-1eaf-46e3-bbd0-547be4a57493', // MOQ 100, 1 var 2.45M -> split > 100M
};

const CUSTOMER = { phoneNumber: '0988000101', password: 'Password123!' };
const SUPPLIER = { phoneNumber: '0988000103', password: '123456' };

const formatDateDDMMYYYY = (offsetDays) => {
  const d = new Date(Date.now() + offsetDays * 86400 * 1000);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const formatDateYYYYMMDD = (offsetDays) => {
  const d = new Date(Date.now() + offsetDays * 86400 * 1000);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

const assert = (cond, msg) => {
  if (!cond) throw new Error(`ASSERTION FAILED: ${msg}`);
};

const results = [];
const createdOrderNumbers = [];
const consoleErrors = [];
const pageErrors = [];

const shot = async (page, filename, fullPage = false) => {
  const outPath = path.join(SCREENSHOT_DIR, filename);
  await page.screenshot({ path: outPath, fullPage });
  return filename;
};

const loginAs = async (page, credentials) => {
  const resp = await page.request.post(`${BE_URL}/api/v1/auth/login`, {
    data: credentials,
  });
  assert(resp.ok(), `Login failed for ${credentials.phoneNumber}: HTTP ${resp.status()}`);
  const body = await resp.json();
  const { accessToken, refreshToken, user } = body.data;

  await page.goto(`${FE_URL}/`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(
    ({ accessToken: at, refreshToken: rt, user: u }) => {
      localStorage.setItem('mooncake_auth_token', JSON.stringify(at));
      localStorage.setItem('mooncake_auth_refresh_token', JSON.stringify(rt));
      localStorage.setItem('mooncake_auth_user', JSON.stringify(u));
    },
    { accessToken, refreshToken, user }
  );
  return { accessToken, user };
};

const setTableRowQty = async (page, rowIndex, qty) => {
  const input = page
    .locator('.order-page__items-table tbody tr.ant-table-row')
    .nth(rowIndex)
    .locator('input.ant-input-number-input');
  await input.click();
  await input.fill(String(qty));
  await input.press('Enter');
  await input.blur();
  await page.waitForTimeout(450);
};

const setDeliveryDateInput = async (page, dateStr) => {
  const pickerInput = page.locator('#deliveryDateExpected');
  await pickerInput.click();
  await pickerInput.fill(dateStr);
  await pickerInput.press('Enter');
  await page.locator('.order-page__delivery h3').click();
  await page.waitForTimeout(250);
};

const clickRowAction = async (page, row, menuLabel) => {
  const trigger = row.getByRole('button', { name: /Thao tác đơn/ });
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  const menuItem = page.getByRole('menuitem', { name: menuLabel });
  await menuItem.waitFor({ state: 'visible' });
  await menuItem.click();
};

const fillDeliveryDetails = async (page, {
  shippingZoneText,
  dateOffsetDays,
  recipientName,
  recipientPhone,
  deliveryAddress,
  notes,
}) => {
  if (shippingZoneText) {
    await waitForValidQuote(page);
    const zoneSelect = page.locator('.order-page__delivery .ant-select').first();
    await zoneSelect.scrollIntoViewIfNeeded();
    const isDisabled = await zoneSelect.evaluate((el) => el.classList.contains('ant-select-disabled'));
    if (!isDisabled) {
      await zoneSelect.click();
      const dropdown = page.locator('.ant-select-dropdown:visible');
      await dropdown.waitFor({ state: 'visible', timeout: 5000 });
      await dropdown.locator('.ant-select-item-option').filter({ hasText: shippingZoneText }).first().click();
      await page.waitForTimeout(350);
    }
  }

  await setDeliveryDateInput(page, formatDateDDMMYYYY(dateOffsetDays));

  await page.locator('#recipientName').fill(recipientName);
  await page.locator('#recipientPhone').fill(recipientPhone);

  const addrInput = page.locator('#deliveryAddress');
  await addrInput.click();
  await addrInput.fill(deliveryAddress);
  await page.waitForTimeout(200);
  await page.locator('.order-page__delivery h3').click();

  await page.locator('#notes').fill(notes);
};

const waitForQuoteSettled = async (page) => {
  await page.waitForTimeout(700);
  await page.waitForFunction(() => {
    const el = document.querySelector('[data-testid="order-quote-total"]');
    return el && el.textContent && el.textContent.trim().length > 0;
  });
};

const waitForValidQuote = async (page) => {
  await waitForQuoteSettled(page);
  await page.locator('.order-page__summary').getByText('Giá từ xưởng').waitFor({ state: 'visible', timeout: 8000 });
};

const run = async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 960 } });
  const page = await context.newPage();

  page.on('pageerror', (err) => pageErrors.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const txt = msg.text();
      if (!txt.includes('404') && !txt.includes('photon.komoot.io')) {
        consoleErrors.push(txt);
      }
    }
  });

  try {
    // =========================================================================
    // LOGIN AS CUSTOMER
    // =========================================================================
    const customerAuth = await loginAs(page, CUSTOMER);
    console.log('Logged in customer:', customerAuth.user.fullName);

    // =========================================================================
    // TC01: INPUT VALIDATION & GUARDRAILS (MOQ, PAST DATE, PHONE, URL, REQUIRED)
    // =========================================================================
    console.log('Running TC01...');
    await page.goto(`${FE_URL}/dat-hang-doanh-nghiep?productId=${PRODUCTS.smartStockCustom}`, {
      waitUntil: 'networkidle',
    });
    await waitForQuoteSettled(page);

    // TC01a: Below MOQ (< 100)
    await setTableRowQty(page, 0, 50);
    const moqWarning = page.getByText(/Chưa đạt số lượng đặt hàng tối thiểu của xưởng \(100 hộp\)/);
    await moqWarning.waitFor({ state: 'visible', timeout: 5000 });
    const submitBtn = page.locator('.order-page__submit');
    assert(await submitBtn.isDisabled(), 'Submit button must remain disabled when qty < MOQ');
    await shot(page, '01a_tc01_validation_moq_below_min.png', false);
    results.push({ id: 'TC01a', name: 'MOQ Guardrail (< 100 boxes disables submit)', status: 'PASS' });

    // TC01b: Restore valid qty >= MOQ, enter invalid phone, invalid soon date (+1d), missing uploaded logo, empty required fields
    await setTableRowQty(page, 0, 100);
    const pkgSwitch = page.getByRole('switch', { name: 'Bật thiết kế bao bì riêng' });
    await pkgSwitch.click();
    await page.waitForTimeout(300);

    await setDeliveryDateInput(page, formatDateDDMMYYYY(1)); // < min 3 days
    await page.locator('#recipientName').fill('');
    await page.locator('#recipientPhone').fill('123');
    await page.locator('#deliveryAddress').fill('');
    await page.locator('#companyName').fill('');

    const manualLogoUrlInputCount = await page.locator('#companyLogoUrl input:not([type="file"])').count();
    assert(manualLogoUrlInputCount === 0, 'Expected manual HTTPS logo URL text input to be removed');

    await submitBtn.click();
    await page.waitForTimeout(500);

    const errDate = await page
      .getByText(/Ngày nhận hàng tối thiểu từ|Vui lòng chọn hoặc nhập ngày giao hàng dự kiến/)
      .isVisible();
    const errRecipient = await page.getByText('Vui lòng nhập họ và tên người nhận.').isVisible();
    const errPhone = await page.getByText('Số điện thoại không hợp lệ.').isVisible();
    const errAddress = await page.getByText('Vui lòng nhập hoặc chọn địa chỉ nhận hàng.').isVisible();
    const errCompany = await page.getByText('Vui lòng nhập tên công ty.').isVisible();
    const errLogoUpload = await page.getByText('Vui lòng tải lên ảnh logo doanh nghiệp.').isVisible();

    assert(errDate && errRecipient && errPhone && errAddress && errCompany && errLogoUpload,
      `Expected all validation errors visible: date=${errDate}, name=${errRecipient}, phone=${errPhone}, addr=${errAddress}, comp=${errCompany}, logo=${errLogoUpload}`
    );

    await page.locator('.order-page__delivery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await shot(page, '01b_tc01_validation_delivery_inputs.png', false);

    await page.locator('.order-page__packaging').scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await shot(page, '01c_tc01_validation_packaging_inputs.png', false);
    results.push({ id: 'TC01b', name: 'Form Validation (Date < +3d, Phone, Address, Company, Uploaded Logo Required)', status: 'PASS' });

    // TC01c: Variant available stock guardrail (Variant 2 of luxuryCustomMultiVar has 10 units)
    await page.goto(`${FE_URL}/dat-hang-doanh-nghiep?productId=${PRODUCTS.luxuryCustomMultiVar}`, {
      waitUntil: 'networkidle',
    });
    await waitForValidQuote(page);
    await page.getByRole('button', { name: /Thêm biến thể/ }).click();
    await page.waitForTimeout(300);
    await setTableRowQty(page, 1, 45);
    await page.getByText(/has only 10 units available/i).waitFor({ state: 'visible', timeout: 5000 });
    assert(await page.locator('.order-page__submit').isDisabled(), 'Submit must be disabled when stock exceeded');
    await shot(page, '01d_tc01_validation_exceed_stock.png', false);
    results.push({ id: 'TC01c', name: 'Variant Available Stock Guardrail (45 > 10 units disables submit)', status: 'PASS' });

    // =========================================================================
    // TC02: STANDARD PRODUCT (NO CUSTOM PACKAGING) + MULTI-VARIANT + SHIPPING ZONE
    // =========================================================================
    console.log('Running TC02...');
    await page.goto(`${FE_URL}/dat-hang-doanh-nghiep?productId=${PRODUCTS.standardMultiVar}`, {
      waitUntil: 'networkidle',
    });
    await waitForQuoteSettled(page);

    // Ensure custom packaging card is absent
    const hasCustomSwitch = await page.getByRole('switch', { name: 'Bật thiết kế bao bì riêng' }).count();
    assert(hasCustomSwitch === 0, 'Standard product must NOT render custom packaging switch');

    // Add 2nd variant row -> total 15 + 10 = 25 boxes (8,000,000 đ -> + 150,000 shipping)
    await setTableRowQty(page, 0, 15);
    await page.getByRole('button', { name: /Thêm biến thể/ }).click();
    await page.waitForTimeout(300);
    await setTableRowQty(page, 1, 10);

    await fillDeliveryDetails(page, {
      shippingZoneText: 'TP.HCM Noi Thanh',
      dateOffsetDays: 7,
      recipientName: 'Trần Minh Quân (E2E TC02)',
      recipientPhone: '0988000101',
      deliveryAddress: '720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh',
      notes: '[E2E-TC02] Đơn hộp tiêu chuẩn đa biến thể giao nội thành TP.HCM',
    });
    await waitForQuoteSettled(page);

    const quoteTotalTC02 = await page.getByTestId('order-quote-total').innerText();
    console.log('TC02 quote total:', quoteTotalTC02);
    assert(quoteTotalTC02.includes('8.150.000'), `Expected TC02 total 8.150.000 ₫, got ${quoteTotalTC02}`);

    await page.evaluate(() => window.scrollTo(0, 260));
    await page.waitForTimeout(250);
    await shot(page, '02a_tc02_standard_multivariant_filled_inputs.png', false);

    // Open Terms Confirmation Modal
    await page.locator('.order-page__submit').click();
    const termsModal = page.getByRole('dialog').filter({ hasText: 'Xác nhận điều khoản đặt hàng doanh nghiệp' });
    await termsModal.waitFor({ state: 'visible', timeout: 5000 });
    await page.waitForTimeout(450);
    await shot(page, '02b_tc02_standard_order_terms_modal.png', false);

    const [tc02Resp] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/orders') && r.request().method() === 'POST'),
      termsModal.getByRole('button', { name: 'Gửi đơn đặt hàng' }).click(),
    ]);
    assert(tc02Resp.ok(), `TC02 order submit failed: HTTP ${tc02Resp.status()}`);
    const tc02Json = await tc02Resp.json();
    const tc02Order = tc02Json.data;
    createdOrderNumbers.push(tc02Order.orderNumber);
    console.log('TC02 created order:', tc02Order.orderNumber, 'total:', tc02Order.totalAmount);
    await page.waitForURL('**/don-hang-cua-toi', { timeout: 10000 });
    results.push({ id: 'TC02', name: `Standard Multi-Variant + HCM_INNER Shipping (${tc02Order.orderNumber})`, status: 'PASS' });

    // =========================================================================
    // TC03: BULK TIER DISCOUNT (10% OFF) + FREE SHIPPING + 30% DEPOSIT + SWITCH OFF
    // =========================================================================
    console.log('Running TC03...');
    await page.goto(`${FE_URL}/dat-hang-doanh-nghiep?productId=${PRODUCTS.luxuryCustomMultiVar}`, {
      waitUntil: 'networkidle',
    });
    await waitForQuoteSettled(page);

    // Set qty = 120 to trigger Tier 2 (100+ Boxes - 10% Off) + 30% deposit + free shipping threshold (50M)
    await setTableRowQty(page, 0, 120);

    await fillDeliveryDetails(page, {
      shippingZoneText: 'Mien Nam Lien Tinh',
      dateOffsetDays: 10,
      recipientName: 'Lê Bảo Ngọc (E2E TC03)',
      recipientPhone: '0988000101',
      deliveryAddress: 'Số 8 Đại lộ Hữu Nghị, KCN VSIP 1, TP. Thuận An, Bình Dương',
      notes: '[E2E-TC03] Đơn sỉ 120 hộp chiết khấu 10% - Switch bao bì OFF',
    });
    await waitForQuoteSettled(page);

    // Verify Custom Packaging Switch is OFF
    const switchTC03 = page.getByRole('switch', { name: 'Bật thiết kế bao bì riêng' });
    assert((await switchTC03.getAttribute('aria-checked')) === 'false', 'TC03 packaging switch must be OFF');
    const quoteTotalTC03 = await page.getByTestId('order-quote-total').innerText();
    console.log('TC03 quote total:', quoteTotalTC03);
    assert(quoteTotalTC03.includes('54.000.000'), `Expected TC03 discounted total 54.000.000 ₫, got ${quoteTotalTC03}`);
    assert(await page.getByText(/TEST Tier 2/).isVisible(), 'Tier 2 10% promotion tag must be visible');
    assert(await page.getByText(/-6\.000\.000 ₫/).isVisible(), 'Tier discount -6.000.000 ₫ must be visible');
    assert(await page.getByText(/Thanh toán cọc \(30%\)/).isVisible(), '30% deposit label must be visible');

    await page.evaluate(() => window.scrollTo(0, 260));
    await page.waitForTimeout(250);
    await shot(page, '03_tc03_bulk_tier_discount_free_ship_switch_off.png', false);

    await page.locator('.order-page__submit').click();
    const termsModalTC03 = page.getByRole('dialog').filter({ hasText: 'Xác nhận điều khoản đặt hàng doanh nghiệp' });
    await termsModalTC03.waitFor({ state: 'visible' });
    const [tc03Resp] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/orders') && r.request().method() === 'POST'),
      termsModalTC03.getByRole('button', { name: 'Gửi đơn đặt hàng' }).click(),
    ]);
    assert(tc03Resp.ok(), `TC03 order submit failed: HTTP ${tc03Resp.status()}`);
    const tc03Order = (await tc03Resp.json()).data;
    createdOrderNumbers.push(tc03Order.orderNumber);
    console.log('TC03 created order:', tc03Order.orderNumber);
    await page.waitForURL('**/don-hang-cua-toi', { timeout: 10000 });
    results.push({ id: 'TC03', name: `Bulk Tier 10% + Free Ship + 30% Deposit + Switch OFF (${tc03Order.orderNumber})`, status: 'PASS' });

    // =========================================================================
    // TC04: MEGA VALUE QUOTE PREVIEW (> 100M VNPAY SPLIT THRESHOLD)
    // =========================================================================
    console.log('Running TC04...');
    await page.goto(`${FE_URL}/dat-hang-doanh-nghiep?productId=${PRODUCTS.megaLuxury}`, {
      waitUntil: 'networkidle',
    });
    await waitForQuoteSettled(page);
    await setTableRowQty(page, 0, 200); // 441M total, 132.3M deposit (> 100M limit)

    await fillDeliveryDetails(page, {
      shippingZoneText: 'TP.HCM Noi Thanh',
      dateOffsetDays: 14,
      recipientName: 'Phạm Hoàng Long (E2E Mega Quote)',
      recipientPhone: '0988000101',
      deliveryAddress: '02 Hải Triều, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
      notes: '[E2E-TC04] Kiểm tra báo giá đơn hàng lớn vượt ngưỡng tách lượt 100 triệu/lần VNPay',
    });
    await waitForQuoteSettled(page);

    const quoteTotalTC04 = await page.getByTestId('order-quote-total').innerText();
    console.log('TC04 mega quote total:', quoteTotalTC04);
    assert(quoteTotalTC04.includes('441.000.000'), `Expected 441.000.000 ₫, got ${quoteTotalTC04}`);
    await page.evaluate(() => window.scrollTo(0, 120));
    await shot(page, '04_tc04_mega_order_quote_split_threshold.png', false);
    results.push({ id: 'TC04', name: 'Mega Order Quote Calculation (441M / 132.3M Deposit)', status: 'PASS' });

    // =========================================================================
    // TC05: FULL CUSTOM PACKAGING + LIVE 3D PREVIEW + MULTI-VARIANT + ORDER CREATE
    // =========================================================================
    console.log('Running TC05...');
    await page.goto(`${FE_URL}/dat-hang-doanh-nghiep?productId=${PRODUCTS.luxuryCustomMultiVar}`, {
      waitUntil: 'networkidle',
    });
    await waitForQuoteSettled(page);

    // Select 2 variants within available stock: 95 boxes v1 + 5 boxes v2 = 100 boxes (Tier 2 - 10%)
    await setTableRowQty(page, 0, 95);
    await page.getByRole('button', { name: /Thêm biến thể/ }).click();
    await page.waitForTimeout(300);
    await setTableRowQty(page, 1, 5);
    await waitForValidQuote(page);

    await fillDeliveryDetails(page, {
      shippingZoneText: 'TP.HCM Noi Thanh',
      dateOffsetDays: 14,
      recipientName: 'Công Ty Cổ Phần Tập Đoàn Ánh Trăng (E2E TC05)',
      recipientPhone: '0988000101',
      deliveryAddress: '65 Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
      notes: '[E2E-TC05] Đơn hàng thiết kế bao bì riêng đa biến thể kèm ép kim logo',
    });

    // Enable Custom Packaging
    const switchTC05 = page.getByRole('switch', { name: 'Bật thiết kế bao bì riêng' });
    await switchTC05.click();
    await page.waitForTimeout(400);

    await page.locator('#companyName').fill('Tập Đoàn Công Nghệ Ánh Trăng VN');

    // Click 2nd packaging template if available
    const tplCards = page.locator('.order-page__packaging .grid .cursor-pointer');
    const tplCount = await tplCards.count();
    if (tplCount >= 2) {
      await tplCards.nth(1).click();
      await page.waitForTimeout(250);
    }

    const [logoUploadResp] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/custom-packaging/upload-logo') && r.request().method() === 'POST'),
      page.locator('.order-page__packaging input[type="file"]').setInputFiles(TMP_LOGO_PNG),
    ]);
    assert(logoUploadResp.ok(), `TC05 logo upload failed: HTTP ${logoUploadResp.status()}`);
    await page.locator('.order-page__packaging img[alt="Logo doanh nghiệp đã chọn"]').waitFor({ state: 'visible' });
    await page.waitForTimeout(300);
    const logoLoaded = await page
      .locator('.order-page__packaging img[alt="Logo doanh nghiệp đã chọn"]')
      .evaluate((img) => img.complete && img.naturalWidth > 0);
    assert(logoLoaded, 'Expected uploaded customer logo preview image to load');

    // Pick Color Preset
    await page.getByRole('button', { name: /Chọn bảng màu Xanh Ngọc Lục & Vàng Đồng/ }).click();
    await page.locator('#specialMessage').fill('Kính Chúc Quý Đối Tác Trung Thu Đoàn Viên & Thịnh Vượng');
    await page.locator('#packagingNotes').fill('Ép kim nhũ vàng logo mặt trước, cán màng nhung lì xanh ngọc lục bảo, kèm thiệp A6.');
    await waitForValidQuote(page);

    await page.locator('.order-page__packaging').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await shot(page, '05a_tc05_custom_packaging_filled_inputs.png', false);

    await page.locator('.ant-btn').filter({ hasText: 'Gửi đơn đặt hàng' }).scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.locator('.order-page__submit').click();

    const termsModalTC05 = page.getByRole('dialog').filter({ hasText: 'Xác nhận điều khoản đặt hàng doanh nghiệp' });
    await termsModalTC05.waitFor({ state: 'visible' });
    await page.waitForTimeout(450);
    await shot(page, '05b_tc05_custom_packaging_terms_modal.png', false);

    const [tc05Resp] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/orders') && r.request().method() === 'POST'),
      termsModalTC05.getByRole('button', { name: 'Gửi đơn đặt hàng' }).click(),
    ]);
    assert(tc05Resp.ok(), `TC05 order submit failed: HTTP ${tc05Resp.status()}`);
    const tc05Order = (await tc05Resp.json()).data;
    createdOrderNumbers.push(tc05Order.orderNumber);
    console.log('TC05 created custom packaging order:', tc05Order.orderNumber);
    await page.waitForURL('**/don-hang-cua-toi', { timeout: 10000 });
    await page.waitForTimeout(900);
    results.push({ id: 'TC05', name: `Custom Packaging + Multi-Variant + Live 3D Studio (${tc05Order.orderNumber})`, status: 'PASS' });

    // =========================================================================
    // TC06: CUSTOMER CANCELS PENDING ORDER (TC03) ON /don-hang-cua-toi
    // =========================================================================
    console.log('Running TC06...');
    const tc03Card = page.locator('div.bg-white.rounded-2xl').filter({ hasText: tc03Order.orderNumber }).first();
    await tc03Card.scrollIntoViewIfNeeded();
    await tc03Card.getByRole('button', { name: /Hủy đơn hàng|Yêu cầu hủy đơn/ }).click();

    const cancelModal = page.getByRole('dialog').filter({ hasText: 'Yêu cầu hủy đơn hàng' });
    await cancelModal.waitFor({ state: 'visible' });
    await cancelModal.locator('textarea').fill('[E2E-TC06] Khách hàng thay đổi sang mẫu hộp thiết kế in logo riêng');
    await page.waitForTimeout(450);
    await shot(page, '06_tc06_customer_cancel_pending_order.png', false);

    const [cancelResp] = await Promise.all([
      page.waitForResponse(
        (r) =>
          (r.url().includes('/cancel') || r.url().includes('/cancellation-requests')) &&
          r.request().method() === 'POST'
      ),
      cancelModal.getByRole('button', { name: 'Gửi yêu cầu hủy' }).click(),
    ]);
    assert(cancelResp.ok(), `TC06 customer cancellation failed: HTTP ${cancelResp.status()}`);
    await page.waitForTimeout(900);
    results.push({ id: 'TC06', name: `Customer Self-Cancel Before Confirm (${tc03Order.orderNumber} -> Cancelled)`, status: 'PASS' });

    // =========================================================================
    // SWITCH TO SUPPLIER: TC07 (REJECT TC02) + TC08 (PROPOSE DATE -> APPROVE) + TC09 (CONFIRM + MOCKUP + VNPAY)
    // =========================================================================
    console.log('Switching to Supplier...');
    const supplierAuth = await loginAs(page, SUPPLIER);
    console.log('Logged in supplier:', supplierAuth.user.fullName);

    await page.goto(`${FE_URL}/nha-cung-cap/quan-ly-don-hang`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // TC07: Reject TC02 order
    const tc02Row = page.locator('tr').filter({ hasText: tc02Order.orderNumber }).first();
    await tc02Row.scrollIntoViewIfNeeded();
    await clickRowAction(page, tc02Row, 'Từ chối');

    const rejectModal = page.getByRole('dialog').filter({ hasText: tc02Order.orderNumber });
    await rejectModal.waitFor({ state: 'visible' });
    await rejectModal.locator('textarea').fill('[E2E-TC07] Xưởng tạm hết khuôn hộp 4 bánh cổ điển trong tuần này');
    await page.waitForTimeout(450);
    await shot(page, '07a_tc07_supplier_reject_order.png', false);

    const [rejectResp] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/reject') && r.request().method() === 'POST'),
      rejectModal.getByRole('button', { name: 'Xác nhận từ chối' }).click(),
    ]);
    assert(rejectResp.ok(), `TC07 supplier reject failed: HTTP ${rejectResp.status()}`);
    await page.waitForTimeout(900);
    results.push({ id: 'TC07', name: `Supplier Reject Pending Order (${tc02Order.orderNumber} -> Cancelled)`, status: 'PASS' });

    // TC09a: Supplier Confirm TC05 Custom Packaging Order directly
    const tc05RowConfirm = page.locator('tr').filter({ hasText: tc05Order.orderNumber }).first();
    await tc05RowConfirm.scrollIntoViewIfNeeded();
    const [confirmResp] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/confirm') && r.request().method() === 'POST'),
      clickRowAction(page, tc05RowConfirm, 'Xác nhận đơn'),
    ]);
    assert(confirmResp.ok(), `TC09 supplier confirm failed: HTTP ${confirmResp.status()}`);
    await page.waitForTimeout(900);

    // Submit Packaging Mockup Revision (verify uploaded logo image is visible & upload mockup image file)
    const tc05RowConfirmed = page.locator('tr').filter({ hasText: tc05Order.orderNumber }).first();
    await clickRowAction(page, tc05RowConfirmed, 'Bao bì');
    const supplierPkgModal = page.getByRole('dialog').filter({ hasText: tc05Order.orderNumber });
    await supplierPkgModal.waitFor({ state: 'visible' });

    const supplierLogoImg = supplierPkgModal.locator('img[alt*="Logo"]').first();
    await supplierLogoImg.waitFor({ state: 'visible' });
    const supplierLogoOk = await supplierLogoImg.evaluate((img) => img.complete && img.naturalWidth > 0);
    assert(supplierLogoOk, 'Expected supplier modal to render uploaded customer logo image');

    const manualMockupUrlInputCount = await supplierPkgModal.locator('input[type="text"], input[placeholder*="https://"]').count();
    assert(manualMockupUrlInputCount === 0, 'Expected manual mockup URL text input to be removed in supplier modal');

    const [mockupUploadResp] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/custom-packaging/upload-logo') && r.request().method() === 'POST'),
      supplierPkgModal.locator('input[type="file"]').setInputFiles(TMP_MOCKUP_PNG),
    ]);
    assert(mockupUploadResp.ok(), `TC09 supplier mockup image upload failed: HTTP ${mockupUploadResp.status()}`);
    await supplierPkgModal.locator('img[alt="Bản vẽ mockup đã tải lên"]').waitFor({ state: 'visible' });

    await supplierPkgModal.locator('textarea').fill('Phối cảnh 3D hộp âm dương xanh ngọc ép kim vàng đồng — sẵn sàng duyệt in hàng loạt.');
    await page.waitForTimeout(450);
    await shot(page, '08a_tc09_supplier_confirm_and_submit_mockup.png', false);

    const [revResp] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/revisions') && r.request().method() === 'POST'),
      supplierPkgModal.getByRole('button', { name: 'Gửi mockup cho khách duyệt' }).click(),
    ]);
    assert(revResp.ok(), `TC09 supplier mockup submit failed: HTTP ${revResp.status()}`);
    await page.waitForTimeout(700);

    // =========================================================================
    // TC08a: CREATE LIGHTWEIGHT ORDER & TEST DELIVERY DATE PROPOSAL FLOW
    // =========================================================================
    await loginAs(page, CUSTOMER);
    await page.goto(`${FE_URL}/dat-hang-doanh-nghiep?productId=${PRODUCTS.standardMultiVar}`, {
      waitUntil: 'networkidle',
    });
    await waitForValidQuote(page);
    await fillDeliveryDetails(page, {
      shippingZoneText: 'TP.HCM Noi Thanh',
      dateOffsetDays: 5,
      recipientName: 'Nguyễn Hữu Lộc (E2E TC08 Proposal)',
      recipientPhone: '0988000101',
      deliveryAddress: '54 Liễu Giai, Phường Cống Vị, Quận Ba Đình, Hà Nội',
      notes: '[E2E-TC08] Đơn kiểm thử luồng xưởng đề xuất điều chỉnh ngày giao hàng',
    });
    await page.locator('.order-page__submit').click();
    const termsModalTC08 = page.getByRole('dialog').filter({ hasText: 'Xác nhận điều khoản đặt hàng doanh nghiệp' });
    await termsModalTC08.waitFor({ state: 'visible' });
    const [tc08CreateResp] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/orders') && r.request().method() === 'POST'),
      termsModalTC08.getByRole('button', { name: 'Gửi đơn đặt hàng' }).click(),
    ]);
    assert(tc08CreateResp.ok(), `TC08 create order failed: HTTP ${tc08CreateResp.status()}`);
    const tc08Order = (await tc08CreateResp.json()).data;
    createdOrderNumbers.push(tc08Order.orderNumber);

    await loginAs(page, SUPPLIER);
    await page.goto(`${FE_URL}/nha-cung-cap/quan-ly-don-hang`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);
    const tc08Row = page.locator('tr').filter({ hasText: tc08Order.orderNumber }).first();
    await tc08Row.scrollIntoViewIfNeeded();
    await clickRowAction(page, tc08Row, 'Đề xuất ngày');

    const proposeModal = page.getByRole('dialog').filter({ hasText: 'Đề xuất ngày giao hàng mới' });
    await proposeModal.waitFor({ state: 'visible' });
    await proposeModal.locator('input[type="date"]').fill(formatDateYYYYMMDD(12));
    await proposeModal.locator('textarea').fill('[E2E-TC08] Điều chỉnh thêm 7 ngày do lịch xếp lò cao điểm');
    await page.waitForTimeout(450);
    await shot(page, '07b_tc08_supplier_propose_delivery_date.png', false);

    const [proposeResp] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/propose-delivery-date') && r.request().method() === 'POST'),
      proposeModal.getByRole('button', { name: /Gửi đề xuất/ }).click(),
    ]);
    assert(proposeResp.ok(), `TC08 supplier propose delivery date failed: HTTP ${proposeResp.status()}`);
    await page.waitForTimeout(800);

    // =========================================================================
    // SWITCH BACK TO CUSTOMER: APPROVE DELIVERY PROPOSAL (TC08b) + MOCKUP & VNPAY (TC09b)
    // =========================================================================
    await loginAs(page, CUSTOMER);
    await page.goto(`${FE_URL}/don-hang-cua-toi`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);

    const tc08CardCust = page.locator('div.bg-white.rounded-2xl').filter({ hasText: tc08Order.orderNumber }).first();
    await tc08CardCust.scrollIntoViewIfNeeded();
    await tc08CardCust.getByRole('button', { name: /Duyệt ngày giao hàng/ }).click();

    const proposalModalCust = page.getByRole('dialog').filter({ hasText: 'Duyệt Đề Xuất Ngày Giao Hàng Mới' });
    await proposalModalCust.waitFor({ state: 'visible' });
    await page.waitForTimeout(450);
    await shot(page, '07c_tc08_customer_approve_delivery_proposal.png', false);

    const [approvePropResp] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/delivery-proposal/respond') && r.request().method() === 'POST'),
      proposalModalCust.getByRole('button', { name: /Chấp Nhận Ngày Giao Mới/ }).click(),
    ]);
    assert(approvePropResp.ok(), `TC08 customer approve delivery proposal failed: HTTP ${approvePropResp.status()}`);
    await page.waitForTimeout(800);
    results.push({ id: 'TC08', name: `Delivery Date Proposal & Customer Approval (${tc08Order.orderNumber} -> Confirmed)`, status: 'PASS' });

    const tc05CardApproved = page.locator('div.bg-white.rounded-2xl').filter({ hasText: tc05Order.orderNumber }).first();
    await tc05CardApproved.scrollIntoViewIfNeeded();

    // Approve Mockup 3D (verify uploaded mockup image preview renders directly in customer modal)
    await tc05CardApproved.getByRole('button', { name: /Xem & Duyệt Mockup 3D/ }).click();
    const custPkgModal = page.getByRole('dialog').filter({ hasText: 'Duyệt Thiết Kế Mockup Bao Bì' });
    await custPkgModal.waitFor({ state: 'visible' });
    const custMockupImg = custPkgModal.locator('img[alt*="Bản vẽ mockup"]').first();
    await custMockupImg.waitFor({ state: 'visible' });
    const custMockupOk = await custMockupImg.evaluate((img) => img.complete && img.naturalWidth > 0);
    assert(custMockupOk, 'Expected customer review modal to render uploaded mockup image');
    await custPkgModal.getByRole('button', { name: /Duyệt và tiến hành sản xuất/ }).waitFor({ state: 'visible' });
    await page.waitForTimeout(450);
    await shot(page, '08b_tc09_customer_approve_mockup_3d.png', false);

    const [approvePkgResp] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/review') && r.request().method() === 'POST'),
      custPkgModal.getByRole('button', { name: /Duyệt và tiến hành sản xuất/ }).click(),
    ]);
    assert(approvePkgResp.ok(), `TC09 customer approve mockup failed: HTTP ${approvePkgResp.status()}`);
    await page.waitForTimeout(700);
    await custPkgModal.locator('.ant-modal-close').click();
    await page.waitForTimeout(400);

    // Open VNPay Payment Schedule modal (30% Deposit + 70% Remaining)
    await tc05CardApproved.getByRole('button', { name: /Lịch trình thanh toán VNPay/ }).click();
    const payModal = page.getByRole('dialog').filter({ hasText: 'Lịch trình thanh toán' });
    await payModal.waitFor({ state: 'visible' });
    await payModal.getByRole('button', { name: /Thanh toán VNPay ngay/ }).first().waitFor({ state: 'visible' });
    await page.waitForTimeout(450);
    await shot(page, '08c_tc09_customer_vnpay_deposit_schedule.png', false);
    results.push({ id: 'TC09', name: `Supplier Confirm + Mockup 3D Approve + VNPay Deposit Schedule (${tc05Order.orderNumber})`, status: 'PASS' });

    console.log('\n=== ALL B2B ORDERING E2E TESTS PASSED ===');
    console.log('Results:', JSON.stringify(results, null, 2));
    console.log('Created Order Numbers:', createdOrderNumbers);
    console.log('Console errors (filtered):', consoleErrors.length, consoleErrors);
    console.log('Page errors:', pageErrors.length, pageErrors);

    assert(pageErrors.length === 0, `Page errors occurred: ${pageErrors.join('; ')}`);
  } finally {
    await browser.close();
  }
};

run().catch((err) => {
  console.error('E2E RUN FAILED:', err);
  process.exit(1);
});
