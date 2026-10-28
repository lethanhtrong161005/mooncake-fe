import { test, expect } from '@playwright/test';

test('account registration only creates Customer accounts before email verification', async ({ page }) => {
  const commands = [];
  await page.route('https://cdn.tailwindcss.com/**', (route) => route.fulfill({ body: 'window.tailwind = {};' }));
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.abort());
  await page.route('**/api/v1/auth/**', async (route) => {
    const path = new URL(route.request().url()).pathname;
    const payload = route.request().postDataJSON();
    commands.push({ path, payload });
    if (path.endsWith('/register')) return route.fulfill({ status: 202, json: { status: 202 } });
    if (path.endsWith('/verify-email') && payload.code === '123456') {
      return route.fulfill({ json: { status: 200 } });
    }
    return route.fulfill({ status: 400, json: { status: 400, message: 'Invalid verification code.' } });
  });
  await page.goto('/');
  await page.getByRole('banner').getByRole('button', { name: /Đăng ký$/ }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('combobox')).toHaveCount(0);
  await dialog.getByLabel('Họ và tên', { exact: true }).fill('Supplier UI Test');
  await dialog.getByLabel('Email nhận mã xác minh', { exact: true }).fill('supplier@example.test');
  await dialog.getByLabel('Số điện thoại đăng nhập', { exact: true }).fill('0901234567');
  await dialog.getByLabel('Mật khẩu', { exact: true }).fill('TestPassword123!');
  await dialog.getByLabel('Xác nhận mật khẩu', { exact: true }).fill('TestPassword123!');
  await dialog.getByRole('checkbox').check();
  await dialog.getByRole('button', { name: 'Đăng ký & nhận mã email' }).click();
  await expect(dialog.getByLabel('Mã xác minh email')).toBeVisible();
  expect(commands[0]).toEqual({ path: '/api/v1/auth/register', payload: {
    phone: '0901234567', password: 'TestPassword123!', fullName: 'Supplier UI Test',
    email: 'supplier@example.test', role: 'Customer',
  } });
  await dialog.getByLabel('Mã xác minh email').fill('000000');
  await dialog.getByRole('button', { name: /Xác minh email$/ }).click();
  await expect(dialog.getByText('Invalid verification code.')).toBeVisible();
  await expect(dialog.getByText('Email đã được xác minh', { exact: true })).toHaveCount(0);
  await dialog.getByLabel('Mã xác minh email').fill('123456');
  const verify = dialog.getByRole('button', { name: /Xác minh email$/ });
  await expect(verify).not.toHaveClass(/ant-btn-loading/);
  await verify.click();
  await expect(dialog.getByText('Email đã được xác minh', { exact: true })).toBeVisible();
  expect(commands.at(-1).payload).toEqual({ email: 'supplier@example.test', code: '123456' });
  expect(await page.evaluate(() => localStorage.getItem('mooncake_auth_token'))).toBeNull();
});
