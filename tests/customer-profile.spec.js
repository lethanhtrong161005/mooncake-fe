import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

const initialProfile = {
  id: '32e57dbe-6b3d-4949-8af8-b7d44ca023d5',
  email: 'trongan@example.com',
  fullName: 'Trong An',
  phone: null,
  avatarUrl: null,
  role: 'Customer',
};

const VALID_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

async function mockProfileApi(page, options = {}) {
  const { failSave = false, failUpload = false, initialAvatarUrl = null } =
    typeof options === 'boolean' ? { failSave: options } : options;
  const token = `test.${Buffer.from(JSON.stringify({
    exp: Math.floor(Date.now() / 1000) + 3600,
  })).toString('base64url')}.test`;
  let profile = { ...initialProfile, avatarUrl: initialAvatarUrl };
  let submitted = null;
  let avatarUploads = 0;
  let avatarRemovals = 0;

  await page.addInitScript(({ account, accessToken }) => {
    localStorage.setItem('mooncake_auth_user', JSON.stringify(account));
    localStorage.setItem('mooncake_auth_token', JSON.stringify(accessToken));
    localStorage.setItem('mooncake_auth_refresh_token', JSON.stringify('refresh-test'));
  }, { account: { ...initialProfile, avatarUrl: initialAvatarUrl }, accessToken: token });

  await page.route('**/api/v1/**', (route) => {
    const path = new URL(route.request().url()).pathname;
    const method = route.request().method();
    if (path.endsWith('/users/me/avatar') && method === 'POST') {
      avatarUploads += 1;
      if (failUpload) {
        return route.fulfill({
          status: 400,
          json: { message: 'Tệp tải lên không phải ảnh hợp lệ.' },
        });
      }
      profile = {
        ...profile,
        avatarUrl: 'https://res.cloudinary.com/mooncake-test/image/upload/v1/avatar-demo.png',
      };
      return route.fulfill({ json: { status: 200, data: profile } });
    }
    if (path.endsWith('/users/me/avatar') && method === 'DELETE') {
      avatarRemovals += 1;
      profile = { ...profile, avatarUrl: null };
      return route.fulfill({ json: { status: 200, data: profile } });
    }
    if (path.endsWith('/users/me') && method === 'PUT') {
      submitted = route.request().postDataJSON();
      if (failSave) {
        return route.fulfill({ status: 500, json: { message: 'Không thể lưu hồ sơ.' } });
      }
      profile = { ...profile, ...submitted };
      return route.fulfill({ json: { status: 200, data: profile } });
    }
    if (path.endsWith('/users/me')) {
      return route.fulfill({ json: { status: 200, data: profile } });
    }
    if (path.endsWith('/auth/me')) {
      return route.fulfill({ json: { status: 200, data: {
        id: profile.id,
        fullName: profile.fullName,
        phone: profile.phone,
        avatar_url: profile.avatarUrl,
        role: profile.role,
      } } });
    }
    return route.fulfill({ json: { status: 200, data: [] } });
  });

  return {
    submitted: () => submitted,
    avatarUploads: () => avatarUploads,
    avatarRemovals: () => avatarRemovals,
  };
}

test('Cập nhật hồ sơ cá nhân qua API và đồng bộ tên trên header', async ({ page }) => {
  const api = await mockProfileApi(page);
  await page.goto('/ho-so-khach-hang');

  await expect(page.getByRole('heading', { name: 'Hồ sơ của tôi' })).toBeVisible();
  await expect(page.getByLabel('Họ và tên')).toHaveValue('Trong An');
  await expect(page.getByLabel('Email đăng nhập')).toHaveValue('trongan@example.com');
  await expect(page.getByLabel('Email đăng nhập')).toBeDisabled();
  await expect(page.getByText('Tài Khoản Doanh Nghiệp')).toHaveCount(0);

  await page.getByLabel('Họ và tên').fill('Trọng An');
  await page.getByLabel('Số điện thoại').fill('0901234567');
  await page.getByRole('button', { name: 'Lưu thay đổi' }).click();

  await expect(page.getByText('Đã cập nhật hồ sơ cá nhân.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Tài khoản' })).toContainText('Trọng An');
  expect(api.submitted()).toEqual({ fullName: 'Trọng An', phone: '0901234567', avatarUrl: null });

  await page.reload();
  await expect(page.getByLabel('Họ và tên')).toHaveValue('Trọng An');
});

test('Tải lên ảnh đại diện, đồng bộ header và gỡ ảnh hoạt động ổn định', async ({ page }) => {
  const api = await mockProfileApi(page);
  await page.goto('/ho-so-khach-hang');

  await page.getByLabel('Ảnh đại diện').setInputFiles({
    name: 'portrait.png',
    mimeType: 'image/png',
    buffer: Buffer.from(VALID_PNG_BASE64, 'base64'),
  });

  await expect(page.getByText('Đã cập nhật ảnh đại diện.')).toBeVisible();
  expect(api.avatarUploads()).toBe(1);

  const uploadedUrl = 'https://res.cloudinary.com/mooncake-test/image/upload/v1/avatar-demo.png';
  await expect(page.locator('.customer-profile-page__avatar img')).toHaveAttribute('src', uploadedUrl);
  await expect(page.getByRole('button', { name: 'Tài khoản' }).locator('img')).toHaveAttribute('src', uploadedUrl);

  await page.getByRole('button', { name: 'Lưu thay đổi' }).click();
  await expect(page.getByText('Đã cập nhật hồ sơ cá nhân.')).toBeVisible();
  expect(api.submitted()).toEqual({ fullName: 'Trong An', phone: null, avatarUrl: uploadedUrl });

  await page.reload();
  await expect(page.locator('.customer-profile-page__avatar img')).toHaveAttribute('src', uploadedUrl);

  await page.getByRole('button', { name: /Gỡ ảnh/i }).click();
  await expect(page.getByText('Đã gỡ ảnh đại diện.')).toBeVisible();
  expect(api.avatarRemovals()).toBe(1);
  await expect(page.locator('.customer-profile-page__avatar img')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Tài khoản' }).locator('img')).toHaveCount(0);
});

test('Từ chối tệp không phải ảnh hợp lệ trước khi gọi API', async ({ page }) => {
  const api = await mockProfileApi(page);
  await page.goto('/ho-so-khach-hang');

  await page.getByLabel('Ảnh đại diện').setInputFiles({
    name: 'document.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('%PDF-1.4 mock'),
  });

  await expect(page.getByRole('alert').filter({
    hasText: 'Chỉ hỗ trợ ảnh định dạng JPG, PNG hoặc WEBP.',
  })).toBeVisible();
  expect(api.avatarUploads()).toBe(0);
});

test('Hiển thị lỗi khi máy chủ từ chối ảnh tải lên và giữ nguyên ảnh cũ', async ({ page }) => {
  const existingUrl = 'https://res.cloudinary.com/mooncake-test/image/upload/v1/existing.png';
  await mockProfileApi(page, { failUpload: true, initialAvatarUrl: existingUrl });
  await page.goto('/ho-so-khach-hang');

  await expect(page.locator('.customer-profile-page__avatar img')).toHaveAttribute('src', existingUrl);
  await page.getByLabel('Ảnh đại diện').setInputFiles({
    name: 'portrait.png',
    mimeType: 'image/png',
    buffer: Buffer.from(VALID_PNG_BASE64, 'base64'),
  });

  await expect(page.getByRole('alert').filter({
    hasText: 'Tệp tải lên không phải ảnh hợp lệ.',
  })).toBeVisible();
  await expect(page.locator('.customer-profile-page__avatar img')).toHaveAttribute('src', existingUrl);
});

test('API lỗi giữ nguyên hồ sơ và hiển thị lỗi lưu', async ({ page }) => {
  await mockProfileApi(page, true);
  await page.goto('/ho-so-khach-hang');
  await page.getByLabel('Họ và tên').fill('Tên mới');
  await page.getByRole('button', { name: 'Lưu thay đổi' }).click();

  await expect(page.getByRole('alert').filter({ hasText: 'Không thể lưu hồ sơ.' })).toBeVisible();
  await expect(page.getByText('Đã cập nhật hồ sơ cá nhân.')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Tài khoản' })).toContainText('Trong An');
});

test('Hồ sơ cá nhân hiển thị gọn trên điện thoại', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mockProfileApi(page);
  await page.goto('/ho-so-khach-hang');

  await expect(page.getByRole('heading', { name: 'Hồ sơ của tôi' })).toBeVisible();
  await expect(page.getByLabel('Họ và tên')).toBeVisible();
  await expect(page.getByRole('button', { name: /Tải ảnh lên/i })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
});
