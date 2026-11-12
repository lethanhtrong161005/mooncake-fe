import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

async function signIn(page, role) {
  const account = {
    id: '33333333-3333-4333-8333-333333333333',
    fullName: 'Tài khoản thử nghiệm',
    role,
    capabilities: { canCreateShop: role === 'Supplier', canReadSupplierVerification: role === 'Supplier' },
  };
  const token = `test.${Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url')}.test`;
  await page.addInitScript(({ account, token }) => {
    localStorage.setItem('mooncake_auth_user', JSON.stringify(account));
    localStorage.setItem('mooncake_auth_token', JSON.stringify(token));
    localStorage.setItem('mooncake_auth_refresh_token', JSON.stringify('refresh-test'));
  }, { account, token });
  return account;
}

test('Đường dẫn cũ được đổi sang URL sạch và nút Back/Forward vẫn hoạt động', async ({ page }) => {
  await page.route('**/api/v1/**', (route) => route.fulfill({ json: { status: 200, data: [] } }));
  await page.goto('/#trang-chu');
  await expect(page).toHaveURL(/\/trang-chu$/);
  await expect(page.getByRole('heading', { name: 'Món quà xứng với lời tri ân.' })).toBeVisible();

  await page.getByRole('banner').getByText('Sản phẩm', { exact: true }).click();
  await expect(page).toHaveURL(/\/tim-kiem(?:\?.*)?$/);
  await expect(page.getByRole('heading', { name: 'Chọn món quà đúng ý.' })).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/trang-chu$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/tim-kiem(?:\?.*)?$/);
  expect(await page.evaluate(() => window.location.hash)).toBe('');
});

test('Mở trực tiếp URL sản phẩm và URL tìm kiếm cũ có query không còn dấu #', async ({ page }) => {
  await page.route('**/api/v1/**', (route) => {
    if (new URL(route.request().url()).pathname.endsWith('/products/00000000-0000-0000-0000-000000000000')) {
      return route.fulfill({ status: 404, json: { status: 404, message: 'Không tìm thấy sản phẩm.' } });
    }
    return route.fulfill({ json: { status: 200, data: [] } });
  });
  await page.goto('/san-pham/00000000-0000-0000-0000-000000000000');
  await expect(page.getByText('Sản phẩm không tồn tại hoặc chưa được xuất bản')).toBeVisible();
  await expect(page).toHaveURL(/\/san-pham\/00000000-0000-0000-0000-000000000000$/);

  await page.goto('/#tim-kiem?q=banh');
  await expect(page).toHaveURL(/\/tim-kiem\?.*q=banh/);
  expect(await page.evaluate(() => window.location.hash)).toBe('');
});

test('URL VNPay mới giữ nguyên query để xác thực giao dịch', async ({ page }) => {
  const account = await signIn(page, 'Customer');
  let verifiedQuery = '';
  await page.route('**/api/v1/**', (route) => {
    const url = new URL(route.request().url());
    if (url.pathname.endsWith('/auth/me')) return route.fulfill({ json: { status: 200, data: account } });
    if (url.pathname.endsWith('/payments/vnpay/return-callback')) {
      verifiedQuery = url.search;
      return route.fulfill({ json: { status: 200, data: { isSuccess: true, responseCode: '00', amount: 150000 } } });
    }
    return route.fulfill({ json: { status: 200, data: [] } });
  });
  await page.goto('/thanh-toan/ket-qua?vnp_ResponseCode=00&vnp_TxnRef=PAY-1');
  await expect.poll(() => verifiedQuery).toContain('vnp_TxnRef=PAY-1');
  expect(await page.evaluate(() => window.location.hash)).toBe('');
});

test('Supplier mở trực tiếp giao diện tài xế bằng URL không dấu #', async ({ page }) => {
  const account = await signIn(page, 'Supplier');
  const deliveryId = 'dddddddd-dddd-4ddd-8ddd-dddddddddddd';
  await page.route('**/api/v1/**', (route) => {
    const url = new URL(route.request().url());
    if (url.pathname.endsWith('/auth/me')) return route.fulfill({ json: { status: 200, data: account } });
    if (url.pathname.endsWith(`/deliveries/${deliveryId}`)) {
      return route.fulfill({ json: { status: 200, data: { id: deliveryId, deliveryNumber: 'DEL-1', status: 'InTransit' } } });
    }
    return route.fulfill({ json: { status: 200, data: [] } });
  });
  await page.goto(`/driver-delivery-view?id=${deliveryId}`);
  await expect(page.getByText('DEL-1').first()).toBeVisible();
  expect(await page.evaluate(() => window.location.hash)).toBe('');
});
