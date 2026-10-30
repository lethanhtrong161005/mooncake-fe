import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

const tokens = { primaryColor: '#8C1524', backgroundColor: '#FAF8F6', textColor: '#222222',
  surfaceColor: '#FFFFFF', buttonTextColor: '#FFFFFF', borderRadiusPx: 12, fontScale: 1 };
const renderers = ['heritage', 'royal-gift', 'minimal-grid', 'artisan-story', 'modern-catalog'];
const templates = renderers.map((rendererKey, index) => ({
  id: `90000000-0000-4000-8000-${String(index + 1).padStart(12, '0')}`, code: rendererKey, name: rendererKey,
  version: 1, isActive: true, isPremium: index === 1, sortOrder: index,
  currentRevision: { id: `91000000-0000-4000-8000-${String(index + 1).padStart(12, '0')}`,
    rendererKey, schemaVersion: 1, revision: 1, defaults: tokens,
    layout: { sectionOrder: ['Hero', 'Story', 'Products', 'Reviews', 'Contact'], productColumnsDesktop: 3 } },
}));
function appearance(index = 0) {
  const template = templates[index];
  return { templateId: template.id, templateRevisionId: template.currentRevision.id, templateName: template.name,
    templateCode: template.code, rendererKey: template.code, schemaVersion: 1, revision: 1, isSelectable: true,
    isPremium: template.isPremium, defaults: tokens, effectiveTokens: tokens, overrides: {}, layout: template.currentRevision.layout, version: 1 };
}
const shop = () => ({ shopId: '11111111-1111-4111-8111-111111111111', supplierId: '22222222-2222-4222-8222-222222222222',
  name: 'An Nhiên Bakery', slug: 'an-nhien-bakery', description: 'Bánh trung thu thủ công.',
  status: 'Inactive', version: 1, appearance: appearance(), allowedActions: ['Update', 'SetVisibility', 'UpdateAppearance'] });

async function session(page, { role = 'Supplier', exists = true } = {}) {
  const state = { shop: exists ? shop() : null, commands: [], queries: [], mediaUploads: [], conflict: false, unavailable: false };
  const user = { id: '33333333-3333-4333-8333-333333333333', fullName: 'Shop Test', role,
    capabilities: { canCreateShop: role === 'Supplier', canReadSupplierVerification: role === 'Supplier' },
    supplierVerification: { verificationStatus: role === 'Supplier' ? 'Verified' : null } };
  await page.addInitScript(({ user, token }) => {
    localStorage.setItem('mooncake_auth_user', JSON.stringify(user));
    localStorage.setItem('mooncake_auth_token', JSON.stringify(token));
    localStorage.setItem('mooncake_auth_refresh_token', JSON.stringify('test-refresh'));
  }, { user, token: `test.${Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url')}.test` });
  await page.route('https://cdn.tailwindcss.com/**', (route) => route.fulfill({ body: 'window.tailwind = {};', contentType: 'text/javascript' }));
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.abort());
  await page.route('**/hubs/supplier-verification/negotiate*', (route) => route.fulfill({ status: 503, json: {} }));
  await page.route('**/api/v1/**', async (route) => {
    const request = route.request(); const url = new URL(request.url()); const path = url.pathname.replace(/^.*\/api\/v1/, '');
    const ok = (data, status = 200) => route.fulfill({ status, json: { status, data } });
    const error = (errorCode, status) => route.fulfill({ status, json: { status, errorCode, message: errorCode } });
    if (path === '/auth/me') return ok(user);
    if (path === '/notifications') return ok({ items: [], unreadCount: 0, totalCount: 0 });
    if (request.method() !== 'GET') {
      if (path === '/shops/me/media') {
        const purpose = request.postDataBuffer().includes(Buffer.from('\r\nLogo\r\n')) ? 'Logo' : 'Banner';
        state.mediaUploads.push({ purpose, key: request.headers()['idempotency-key'] });
        if (state.mediaFailure) return error('SHOP_MEDIA_STORAGE_UNAVAILABLE', 503);
        return ok({ mediaAssetId: purpose === 'Logo' ? 'a1111111-1111-4111-8111-111111111111' : 'b2222222-2222-4222-8222-222222222222',
          purpose, status: 'Ready', url: `https://example.test/${purpose}.png` }, 201);
      }
      const body = request.postDataJSON();
      state.commands.push({ path, body, key: request.headers()['idempotency-key'] });
      if (state.conflict) return error('SHOP_VERSION_CONFLICT', 409);
      if (path === '/shops/me') {
        state.shop = { ...(state.shop || shop()), ...body, version: state.shop ? state.shop.version + 1 : 1 };
        return ok(state.shop, request.method() === 'POST' ? 201 : 200);
      }
      if (path === '/shops/me/appearance') {
        const index = templates.findIndex((item) => item.id === body.templateId);
        state.shop = { ...state.shop, version: state.shop.version + 1, appearance: { ...appearance(index), overrides: body.overrides, effectiveTokens: body.overrides } };
        return ok(state.shop);
      }
      if (path === '/shops/me/visibility') { state.shop.status = body.status; state.shop.version++; return ok(state.shop); }
      if (path.endsWith('/status')) { state.shop.status = body.action === 'Suspend' ? 'Suspended' : 'Inactive'; state.shop.version++; return ok(state.shop); }
      if (path.includes('/admin/shop-templates/')) return error('TEMPLATE_MINIMUM_CATALOG', 409);
      return error('UNMOCKED_COMMAND', 500);
    }
    state.queries.push(url);
    if (path === '/shops/me') return state.shop ? ok(state.shop) : error('SHOP_NOT_FOUND', 404);
    if (path === '/shop-templates') return ok({ items: templates, hasMore: false, nextCursor: null });
    if (path === '/shops/me/preview') return ok({ shop: state.shop, products: [] });
    if (path === '/admin/shops') return ok({ items: [{ ...state.shop, productCount: 0 }], totalCount: 1, page: 1, pageSize: 20 });
    if (path.startsWith('/admin/shops/')) return ok(state.shop);
    if (path === '/admin/shop-templates') return ok({ items: templates, totalCount: 5, page: 1, pageSize: 20 });
    if (path.startsWith('/admin/shop-templates/')) return ok(templates.find((item) => path.endsWith(item.id)));
    if (path.startsWith('/shops/an-nhien-bakery')) {
      if (state.unavailable) return error('SHOP_UNAVAILABLE', 404);
      if (/\/(products|categories|reviews)$/.test(path)) return ok({ items: [], hasMore: false, nextCursor: null });
      return ok({ ...state.shop, isVerified: true, reputationScore: 90, reviewCount: 0, averageRating: null });
    }
    return error('UNMOCKED_QUERY', 500);
  });
  return state;
}

test('approved supplier creates an inactive shop through the API', async ({ page }) => {
  const state = await session(page, { exists: false });
  await page.goto('/#nha-cung-cap/thiet-lap-gian-hang');
  await page.getByLabel('Tên gian hàng', { exact: true }).fill('An Nhiên Bakery');
  await page.getByLabel('Đường dẫn gian hàng', { exact: true }).fill('an-nhien-bakery');
  await page.getByRole('button', { name: 'Tạo gian hàng', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Hiển thị gian hàng', exact: true })).toBeVisible();
  expect(state.commands[0].body.templateRevisionId).toBe(templates[0].currentRevision.id);
  expect(state.commands[0].key).toMatch(/^[a-f0-9-]{36}$/);
  expect(state.shop.status).toBe('Inactive');
});

test('supplier uploads logo and banner before creating a shop', async ({ page }) => {
  const state = await session(page, { exists: false });
  await page.goto('/#nha-cung-cap/thiet-lap-gian-hang');
  await page.getByLabel('Tên gian hàng', { exact: true }).fill('An Nhiên Bakery');
  await page.getByLabel('Đường dẫn gian hàng', { exact: true }).fill('an-nhien-bakery');
  const image = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aV1cAAAAASUVORK5CYII=', 'base64');
  await page.locator('input[type=file]').nth(0).setInputFiles({ name: 'logo.png', mimeType: 'image/png', buffer: image });
  await expect.poll(() => state.mediaUploads.length).toBe(1);
  await page.locator('input[type=file]').nth(1).setInputFiles({ name: 'banner.png', mimeType: 'image/png', buffer: image });
  await expect.poll(() => state.mediaUploads.length).toBe(2);
  await expect(page.getByRole('button', { name: 'Tạo gian hàng', exact: true })).toBeEnabled();
  await page.getByRole('button', { name: 'Tạo gian hàng', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Hiển thị gian hàng', exact: true })).toBeVisible();
  expect(state.commands[0].body).toMatchObject({ logoAssetId: 'a1111111-1111-4111-8111-111111111111', bannerAssetId: 'b2222222-2222-4222-8222-222222222222' });
  expect(state.mediaUploads.map((item) => item.purpose)).toEqual(['Logo', 'Banner']);
});

test('failed optional image upload still allows creating a shop without branding', async ({ page }) => {
  const state = await session(page, { exists: false }); state.mediaFailure = true;
  await page.goto('/#nha-cung-cap/thiet-lap-gian-hang');
  await page.getByLabel('Tên gian hàng', { exact: true }).fill('An Nhiên Bakery');
  await page.getByLabel('Đường dẫn gian hàng', { exact: true }).fill('an-nhien-bakery');
  await page.locator('input[type=file]').nth(0).setInputFiles({ name: 'logo.png', mimeType: 'image/png', buffer: Buffer.from('image fixture') });
  await expect(page.getByText('Dịch vụ lưu ảnh đang gián đoạn. Vui lòng thử lại.', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Tạo gian hàng', exact: true })).toBeEnabled();
  await page.getByRole('button', { name: 'Tạo gian hàng', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Hiển thị gian hàng', exact: true })).toBeVisible();
  expect(state.commands[0].body.logoAssetId).toBeNull();
});

test('all five renderers preview locally and save a pinned revision', async ({ page }) => {
  const state = await session(page);
  await page.goto('/#nha-cung-cap/giao-dien-gian-hang');
  await expect(page.locator('.shop-heritage')).toBeVisible();
  for (const renderer of renderers.slice(1)) {
    await page.getByRole('combobox', { name: 'Chọn mẫu giao diện' }).click();
    await page.locator('.ant-select-item-option').filter({ hasText: renderer }).click();
    const confirmation = page.getByRole('dialog').filter({ hasText: 'Đổi mẫu sẽ đặt lại' });
    if (await confirmation.isVisible()) await confirmation.getByRole('button', { name: 'OK', exact: true }).click();
    await expect(page.locator(`.shop-${renderer}`)).toBeVisible();
  }
  expect(state.commands).toHaveLength(0);
  await page.getByRole('button', { name: 'Lưu giao diện', exact: true }).click();
  await expect(page.getByText('Đã lưu giao diện gian hàng.', { exact: true })).toBeVisible();
  expect(state.commands[0].body.templateRevisionId).toBe(templates[4].currentRevision.id);
  expect(state.commands[0].body.expectedVersion).toBe(1);
  await page.reload(); await expect(page.locator('.shop-modern-catalog')).toBeVisible();
});

test('conflict preserves information draft and does not show success', async ({ page }) => {
  const state = await session(page); state.conflict = true;
  await page.goto('/#nha-cung-cap/thiet-lap-gian-hang');
  await page.getByLabel('Tên gian hàng', { exact: true }).fill('Bản nháp cần giữ');
  await page.getByRole('button', { name: 'Lưu thông tin gian hàng', exact: true }).click();
  await expect(page.getByText(/Gian hàng đã thay đổi/)).toBeVisible();
  await expect(page.getByLabel('Tên gian hàng', { exact: true })).toHaveValue('Bản nháp cần giữ');
  await expect(page.getByText('Đã lưu thông tin gian hàng.', { exact: true })).toHaveCount(0);
});

test('customer cannot open supplier shop workspace', async ({ page }) => {
  const state = await session(page, { role: 'Customer' });
  await page.goto('/#nha-cung-cap/thiet-lap-gian-hang');
  await expect(page.getByText('Hoàn tất xác minh doanh nghiệp để sử dụng chức năng này')).toBeVisible();
  expect(state.queries.some((url) => url.pathname.endsWith('/shops/me'))).toBe(false);
});

test('public path survives reload and filters use public API', async ({ page }) => {
  const state = await session(page);
  await page.goto('/shop/an-nhien-bakery');
  await expect(page.getByRole('heading', { name: 'An Nhiên Bakery', exact: true })).toBeVisible();
  await page.getByLabel('Tìm sản phẩm', { exact: true }).fill('Sen');
  await page.getByRole('button', { name: 'Áp dụng bộ lọc' }).click();
  await expect.poll(() => state.queries.some((url) => url.pathname.endsWith('/products') && url.searchParams.get('q') === 'Sen')).toBe(true);
  await page.reload(); await expect(page.locator('.shop-heritage')).toBeVisible();
  state.unavailable = true; await page.reload();
  await expect(page.getByText('Gian hàng hiện chưa khả dụng', { exact: true })).toBeVisible();
});

test('admin moderation requires reason and sends displayed version', async ({ page }) => {
  const state = await session(page, { role: 'Admin' });
  await page.goto('/#admin/gian-hang');
  await page.getByRole('button', { name: 'Đình chỉ', exact: true }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'OK', exact: true }).click();
  expect(state.commands).toHaveLength(0);
  await page.getByLabel('Lý do xử lý').fill('Vi phạm chính sách gian hàng.');
  await page.getByRole('dialog').getByRole('button', { name: 'OK', exact: true }).click();
  await expect(page.getByText('Đã cập nhật trạng thái gian hàng.', { exact: true })).toBeVisible();
  expect(state.commands[0].body).toMatchObject({ action: 'Suspend', expectedVersion: 1 });
});

test('admin template minimum failure is displayed without fake success', async ({ page }) => {
  const state = await session(page, { role: 'Admin' });
  await page.goto('/#admin/mau-gian-hang');
  await page.getByRole('button', { name: 'Ẩn mẫu', exact: true }).nth(1).click();
  await page.getByRole('dialog').getByRole('button', { name: 'OK', exact: true }).click();
  await expect(page.getByText('Cần giữ ít nhất 5 mẫu đang hiển thị.', { exact: true })).toBeVisible();
  expect(state.commands[0].body).toEqual({ expectedVersion: 1, isActive: false });
  await expect(page.getByText('Đã cập nhật mẫu.', { exact: true })).toHaveCount(0);
});

test('dirty draft blocks menu navigation until explicitly discarded', async ({ page }) => {
  await session(page);
  await page.goto('/#nha-cung-cap/thiet-lap-gian-hang');
  await page.getByLabel('Tên gian hàng', { exact: true }).fill('Bản nháp chưa lưu');
  await page.getByRole('menuitem', { name: /Giao diện gian hàng$/ }).click();
  const dialog = page.getByRole('dialog');
  await expect(page.getByRole('dialog', { name: 'Rời trang và bỏ thay đổi chưa lưu?' })).toBeVisible();
  await dialog.getByRole('button', { name: 'Cancel', exact: true }).click();
  await expect(page.getByLabel('Tên gian hàng', { exact: true })).toHaveValue('Bản nháp chưa lưu');
  await page.getByRole('menuitem', { name: /Giao diện gian hàng$/ }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'OK', exact: true }).click();
  await expect(page.locator('.shop-live-preview')).toBeVisible();
});

test('public storefront remains usable on a mobile viewport', async ({ page }) => {
  await session(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/shop/an-nhien-bakery');
  await expect(page.getByRole('heading', { name: 'An Nhiên Bakery', exact: true })).toBeVisible();
  await page.getByLabel('Tìm sản phẩm', { exact: true }).fill('Bánh sen');
  await page.getByRole('button', { name: 'Áp dụng bộ lọc' }).click();
  await expect(page.getByText('Chưa có sản phẩm phù hợp', { exact: true })).toBeVisible();
  await expect(page.locator('.shop-root')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: 'test-results/shop-public-mobile.png', fullPage: true });
});

test('supplier shop form and navigation fit a mobile viewport', async ({ page }) => {
  await session(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#nha-cung-cap/thiet-lap-gian-hang');
  await expect(page.getByLabel('Tên gian hàng', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Mở điều hướng', exact: true }).click();
  await page.getByRole('menuitem', { name: /Giao diện gian hàng$/ }).click();
  await expect(page.locator('.shop-live-preview')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
