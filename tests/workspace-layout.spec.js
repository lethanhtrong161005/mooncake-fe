import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

async function signedIn(page, role, capabilities = {}) {
  const account = {
    id: '33333333-3333-4333-8333-333333333333', fullName: role === 'Admin' ? 'Quản trị viên' : 'Xưởng An Nhiên', role,
    capabilities: { canCreateShop: role === 'Supplier', canReadSupplierVerification: role === 'Supplier', ...capabilities },
  };
  const token = `test.${Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url')}.test`;
  await page.addInitScript(({ user, accessToken }) => {
    localStorage.setItem('mooncake_auth_user', JSON.stringify(user));
    localStorage.setItem('mooncake_auth_token', JSON.stringify(accessToken));
    localStorage.setItem('mooncake_auth_refresh_token', JSON.stringify('refresh-test'));
  }, { user: account, accessToken: token });
  await page.route('**/api/v1/**', (route) => {
    const path = new URL(route.request().url()).pathname;
    const data = path.endsWith('/auth/me') ? account : { items: [], totalCount: 0, unreadCount: 0, total: 0 };
    return route.fulfill({ status: 200, json: { status: 200, data } });
  });
}

test('supplier sees supplier workspace and cannot open admin routes', async ({ page }) => {
  await signedIn(page, 'Supplier');
  await page.goto('/nha-cung-cap');
  await expect(page.locator('.workspace-layout--supplier')).toBeVisible();
  await expect(page.getByRole('menuitem', { name: /Sản phẩm & biến thể/i })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: /Duyệt nhà cung cấp/ })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Thông báo', exact: true })).toHaveCount(1);
  await page.getByRole('button', { name: 'Thông báo', exact: true }).click();
  await expect(page).toHaveURL(/\/thong-bao$/);
  await page.goto('/nha-cung-cap');
  await page.screenshot({ path: 'test-results/workspace-supplier.png', fullPage: true });
  await page.goto('/admin/dashboard');
  await expect(page.getByRole('heading', { name: 'Bạn chưa thể vào trang này.' })).toBeVisible();
});

test('admin sees admin workspace and cannot open supplier routes', async ({ page }) => {
  await signedIn(page, 'Admin');
  await page.goto('/admin/ho-so');
  await expect(page.locator('.workspace-layout--admin')).toBeVisible();
  await expect(page.getByRole('menuitem', { name: /Duyệt nhà cung cấp/ })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: /Sản phẩm & biến thể/i })).toHaveCount(0);
  await page.screenshot({ path: 'test-results/workspace-admin.png', fullPage: true });
  await page.goto('/nha-cung-cap');
  await expect(page.getByRole('heading', { name: 'Bạn chưa thể vào trang này.' })).toBeVisible();
});

test('supplier mobile drawer contains only supplier navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await signedIn(page, 'Supplier');
  await page.goto('/nha-cung-cap');
  await page.getByRole('button', { name: 'Mở điều hướng' }).click();
  await expect(page.getByRole('menuitem', { name: /Tin nhắn khách hàng/ })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: /Duyệt nhà cung cấp/ })).toHaveCount(0);
});

test('supplier with fulfillment access sees only allowed actions', async ({ page }) => {
  await signedIn(page, 'Supplier', { canCreateShop: false, canReadSupplierVerification: false,
    canFulfillExistingOrders: true });
  await page.goto('/nha-cung-cap');
  await expect(page.getByRole('menuitem', { name: /Đơn hàng/ })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: /Thiết lập gian hàng/i })).toHaveCount(0);
  await expect(page.getByRole('menuitem', { name: /^Xác minh/ })).toHaveCount(0);
  await page.goto('/nha-cung-cap/quan-ly-san-pham');
  await expect(page.getByRole('heading', { name: 'Bạn chưa thể vào trang này.' })).toBeVisible();
});
