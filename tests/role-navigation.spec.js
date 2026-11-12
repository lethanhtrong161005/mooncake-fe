import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

const token = `test.${Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url')}.test`;

for (const { role, destination, title } of [
  { role: 'Customer', destination: 'trang-chu', title: 'Trang chủ' },
  { role: 'Supplier', destination: 'nha-cung-cap/dashboard', title: 'Dashboard Nhà Cung Cấp' },
  { role: 'Admin', destination: 'admin/dashboard', title: 'Dashboard Điều Hành Toàn Nền Tảng' },
]) {
  test(`Đăng nhập ${role} mở đúng layout và giữ route sau khi tải lại`, async ({ page }) => {
    const account = {
      id: '33333333-3333-4333-8333-333333333333',
      fullName: `Tài khoản ${role}`,
      role,
      capabilities: {
        canCreateShop: role === 'Supplier',
        canReadSupplierVerification: role === 'Supplier',
      },
    };
    await page.route('https://cdn.tailwindcss.com/**', (route) => route.fulfill({ body: 'window.tailwind = {};', contentType: 'text/javascript' }));
    await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.abort());
    await page.route('**/hubs/supplier-verification/negotiate*', (route) => route.fulfill({ status: 503, json: {} }));
    await page.route('**/api/v1/**', (route) => {
      const path = new URL(route.request().url()).pathname;
      if (path.endsWith('/auth/login')) {
        return route.fulfill({ json: { status: 200, data: { accessToken: token, refreshToken: 'test-refresh', user: account } } });
      }
      if (path.endsWith('/auth/me')) return route.fulfill({ json: { status: 200, data: account } });
      return route.fulfill({ json: { status: 200, data: [] } });
    });

    await page.goto('/trang-chu');
    await page.getByRole('banner').getByRole('button', { name: 'Đăng nhập' }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByPlaceholder('Ví dụ: 0912 345 678').fill('0901234567');
    await dialog.getByPlaceholder('Nhập mật khẩu của bạn').fill('TestPassword123!');
    await dialog.getByRole('button', { name: /Đăng nhập$/ }).click();

    await expect(page).toHaveURL(new RegExp(`/${destination}$`));
    await page.reload();
    await expect(page).toHaveURL(new RegExp(`/${destination}$`));
    if (role === 'Customer') {
      await expect(page.getByRole('banner').getByRole('button', { name: 'Tài khoản' })).toBeVisible();
    } else {
      await expect(page.getByText(title, { exact: true }).first()).toBeVisible();
      await page.goto('/trang-chu');
      await expect(page).toHaveURL(new RegExp(`/${destination}$`));
    }
  });
}

test('Google đăng nhập Supplier về workspace dù trước đó ở trang khách hàng', async ({ page }) => {
  const account = {
    id: '33333333-3333-4333-8333-333333333333',
    fullName: 'Xưởng bánh',
    role: 'Supplier',
    capabilities: { canCreateShop: true, canReadSupplierVerification: true },
  };
  await page.addInitScript(() => {
    sessionStorage.setItem('mooncake_google_state', 'role-test-state');
    sessionStorage.setItem('mooncake_google_return_page', 'tim-kiem');
  });
  await page.route('https://cdn.tailwindcss.com/**', (route) => route.fulfill({ body: 'window.tailwind = {};', contentType: 'text/javascript' }));
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.abort());
  await page.route('**/api/v1/**', (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path.endsWith('/auth/google/login')) {
      return route.fulfill({ json: { status: 200, data: { accessToken: token, refreshToken: 'test-refresh', user: account } } });
    }
    if (path.endsWith('/auth/me')) return route.fulfill({ json: { status: 200, data: account } });
    return route.fulfill({ json: { status: 200, data: [] } });
  });

  await page.goto('/auth/google/callback?code=test-code&state=role-test-state');
  await expect(page).toHaveURL(/\/nha-cung-cap\/dashboard$/);
  await expect(page.getByText('Dashboard Nhà Cung Cấp', { exact: true }).first()).toBeVisible();
});
