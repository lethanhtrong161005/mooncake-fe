import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

const productId = '77777777-7777-4777-8777-777777777777';
const product = {
  id: productId,
  name: 'Hộp bánh Trăng Vàng',
  description: 'Quà Trung thu cho doanh nghiệp.',
  status: 'Active',
  basePrice: 150000,
  minOrderQty: 1,
  variants: [{ id: 'aaaa1111-aaaa-4aaa-8aaa-aaaaaaaaaaaa', name: 'Hộp 4 bánh', price: 150000, stockQty: 20, isAvailable: true }],
  images: [{ id: 'image-1', imageUrl: '/hero_mooncake_bg.jpg', isPrimary: true }],
  shop: { id: '88888888-8888-4888-8888-888888888888', name: 'Xưởng Nguyệt Phố', slug: 'nguyet-pho' },
};

async function mockApis(page, account) {
  await page.route('**/api/v1/**', (route) => {
    const url = new URL(route.request().url());
    const path = url.pathname;
    const data = path.endsWith('/auth/login') ? {
      accessToken: `test.${Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url')}.test`,
      refreshToken: 'refresh-test', user: account,
    }
      : path.endsWith('/auth/me') ? account
      : path.endsWith(`/products/${productId}`) ? product
        : path.endsWith('/products') ? { items: [product], totalCount: 1, facets: { categories: [], minPrice: 0, maxPrice: 200000 } }
          : path.endsWith('/categories') || path.endsWith('/regions') ? []
            : path.endsWith('/ai/chat/sessions') ? { sessionToken: 'guest-session' }
              : path.endsWith('/ai/chat/sessions/guest-session/messages') ? { reply: 'Xin chào' }
                : [];
    return route.fulfill({ status: 200, json: { status: 200, data } });
  });
}

test('Khách xem chi tiết sản phẩm và AI, thao tác đặt hàng mở đăng nhập', async ({ page }) => {
  await mockApis(page);
  await page.goto('/trang-chu');
  const header = page.getByRole('banner');
  await expect(header.getByText('Trang chủ', { exact: true })).toBeVisible();
  await expect(header.getByText('Sản phẩm', { exact: true })).toBeVisible();
  await expect(header.getByText('Yêu cầu Báo giá', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Mở trợ lý AI Nguyệt Phố' })).toBeVisible();
  await page.getByRole('button', { name: 'Mở trợ lý AI Nguyệt Phố' }).click();
  await expect(page.getByText('Tư vấn bánh và quà tặng Trung thu')).toBeVisible();
  await page.getByTitle('Đóng cửa sổ').click();

  await page.goto(`/san-pham/${productId}`);
  await expect(page.getByRole('heading', { name: product.name })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Mở trợ lý AI Nguyệt Phố' })).toBeVisible();
  await page.getByRole('button', { name: /Đặt hàng|Yêu cầu báo giá/i }).first().click();
  await expect(page.getByRole('dialog').filter({ has: page.getByPlaceholder('Nhập mật khẩu của bạn') })).toBeVisible();
  await expect(page).toHaveURL(new RegExp(`/san-pham/${productId}$`));
});

test('Nút nghiệp vụ mở đăng nhập; URL được bảo vệ hiển thị 403; URL lạ hiển thị 404', async ({ page }) => {
  await mockApis(page);
  await page.goto('/trang-chu');
  await page.getByRole('button', { name: 'Yêu cầu báo giá' }).first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.goto('/so-sanh-bao-gia');
  await expect(page.getByRole('heading', { name: 'Bạn chưa thể vào trang này.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Mở trợ lý AI Nguyệt Phố' })).toHaveCount(0);
  await page.goto('/admin/dashboard');
  await expect(page.getByRole('heading', { name: 'Bạn chưa thể vào trang này.' })).toBeVisible();
  await page.goto('/duong-dan-khong-ton-tai');
  await expect(page.getByRole('heading', { name: 'Không tìm thấy trang bạn cần.' })).toBeVisible();
  await page.goto('/duong-dan-khong-ton-tai');
  await expect(page.getByRole('heading', { name: 'Không tìm thấy trang bạn cần.' })).toBeVisible();
});

test('Đăng nhập từ nút báo giá đưa khách về đúng trang đã chọn', async ({ page }) => {
  const account = { id: '33333333-3333-4333-8333-333333333333', fullName: 'Khách hàng', role: 'Customer' };
  await mockApis(page, account);
  await page.goto('/trang-chu');
  await page.getByRole('button', { name: 'Yêu cầu báo giá' }).first().click();
  const dialog = page.getByRole('dialog');
  await dialog.getByPlaceholder('Ví dụ: 0912 345 678').fill('0901234567');
  await dialog.getByPlaceholder('Nhập mật khẩu của bạn').fill('TestPassword123!');
  await dialog.getByRole('button', { name: /Đăng nhập$/ }).click();
  await expect(page).toHaveURL(/\/so-sanh-bao-gia$/);
});

test('Tài khoản sai vai trò gặp 403 khi mở URL của vai trò khác', async ({ page }) => {
  const account = { id: '33333333-3333-4333-8333-333333333333', fullName: 'Quản trị viên', role: 'Admin' };
  const token = `test.${Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url')}.test`;
  await page.addInitScript(({ account, token }) => {
    localStorage.setItem('mooncake_auth_user', JSON.stringify(account));
    localStorage.setItem('mooncake_auth_token', JSON.stringify(token));
    localStorage.setItem('mooncake_auth_refresh_token', JSON.stringify('refresh-test'));
  }, { account, token });
  await mockApis(page, account);
  await page.goto('/don-hang-cua-toi');
  await expect(page.getByRole('heading', { name: 'Bạn chưa thể vào trang này.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Mở trợ lý AI Nguyệt Phố' })).toHaveCount(0);
});

test('Điều hướng khách và trang 403 hiển thị đúng trên điện thoại', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mockApis(page);
  await page.goto('/trang-chu');
  await page.getByRole('button', { name: 'Mở điều hướng' }).click();
  await expect(page.getByRole('menuitem', { name: /Trang chủ/ })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: /Sản phẩm/ })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: /Yêu cầu Báo giá/ })).toHaveCount(0);
  await page.goto('/admin/dashboard');
  await expect(page.getByRole('heading', { name: 'Bạn chưa thể vào trang này.' })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
});
