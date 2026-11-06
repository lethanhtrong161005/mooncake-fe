import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('.agents/evidence/PAGING');
const viewports = [
  ['mobile_375', 375, 812], ['mobile_430', 430, 932],
  ['tablet_768', 768, 1024], ['desktop_1440', 1440, 900],
];
const token = `test.${Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url')}.test`;

const orders = Array.from({ length: 250 }, (_, index) => ({
  id: `00000000-0000-4000-8000-${String(index + 1).padStart(12, '0')}`,
  orderNumber: `MC-PAGING-${String(index + 1).padStart(4, '0')}`,
  status: index % 2 ? 'Confirmed' : 'Pending',
  totalAmount: 1000000 + index * 1000,
  subtotal: 1000000 + index * 1000,
  discountAmount: 0,
  shippingFee: 0,
  recipientName: `Khách hàng ${index + 1}`,
  recipientPhone: '0901234567',
  deliveryAddress: '123 Nguyễn Huệ, TP.HCM',
  deliveryDateExpected: '2026-12-01',
  createdAtUtc: new Date(Date.UTC(2026, 10, 5) - index * 60000).toISOString(),
  items: [], allowedActions: [],
}));
const users = Array.from({ length: 250 }, (_, index) => ({
  id: `10000000-0000-4000-8000-${String(index + 1).padStart(12, '0')}`,
  email: `user${index + 1}@test.mooncake.local`,
  fullName: `Tài khoản ${index + 1}`,
  phone: '0901234567', role: index % 2 ? 'Customer' : 'Supplier', isActive: true,
}));
const deliveries = Array.from({ length: 250 }, (_, index) => ({
  id: `20000000-0000-4000-8000-${String(index + 1).padStart(12, '0')}`,
  deliveryNumber: `DL-PAGING-${String(index + 1).padStart(4, '0')}`,
  contractNumber: `CT-PAGING-${String(index + 1).padStart(4, '0')}`,
  trackingCode: `TRACK-${index + 1}`, status: index % 2 ? 'InTransit' : 'Pending',
  scheduledDate: '2026-12-01',
}));
const contracts = Array.from({ length: 250 }, (_, index) => ({
  id: `30000000-0000-4000-8000-${String(index + 1).padStart(12, '0')}`,
  contractNumber: `CT-PAGING-${String(index + 1).padStart(4, '0')}`,
  title: `Hợp đồng ${index + 1}`, totalValue: 1000000 + index * 1000,
  status: index % 2 ? 'Active' : 'Draft', deliveryDeadline: '2026-12-01',
}));
const auditLogs = Array.from({ length: 250 }, (_, index) => ({
  id: `40000000-0000-4000-8000-${String(index + 1).padStart(12, '0')}`,
  action: `AuditPaging${String(index + 1).padStart(4, '0')}`,
  entityName: 'Order', entityId: String(index + 1),
  createdAtUtc: new Date(Date.UTC(2026, 10, 5) - index * 60000).toISOString(),
}));
const adminRows = Array.from({ length: 250 }, (_, index) => ({
  id: `50000000-0000-4000-8000-${String(index + 1).padStart(12, '0')}`,
  orderNumber: `ADMIN-PAGING-${String(index + 1).padStart(4, '0')}`,
  caseNumber: `REF-PAGING-${String(index + 1).padStart(4, '0')}`,
  requestNumber: `PAY-PAGING-${String(index + 1).padStart(4, '0')}`,
  contractNumber: `CT-PAGING-${String(index + 1).padStart(4, '0')}`,
  customerName: 'Khách hàng test', supplierName: 'Supplier test',
  issueType: 'MissingItems', description: 'Thiếu một kiện', evidenceUrls: [],
  requestedAmount: 1000000, amount: 1000000, heldEscrowAmount: 1000000,
  reason: 'Hàng bị thiếu', status: 'PendingAdminReview',
  createdAtUtc: new Date(Date.UTC(2026, 10, 5) - index * 60000).toISOString(),
}));

async function setup(page, role, requests) {
  const account = { id: '33333333-3333-4333-8333-333333333333', fullName: 'Tài khoản thử nghiệm',
    role, capabilities: { canCreateShop: role === 'Supplier', canReadSupplierVerification: role === 'Supplier' },
    supplierVerification: { verificationStatus: role === 'Supplier' ? 'Verified' : null } };
  await page.addInitScript(({ account, token }) => {
    localStorage.setItem('mooncake_auth_user', JSON.stringify(account));
    localStorage.setItem('mooncake_auth_token', JSON.stringify(token));
    localStorage.setItem('mooncake_auth_refresh_token', JSON.stringify('test-refresh'));
  }, { account, token });
  await page.route('https://cdn.tailwindcss.com/**', (route) => route.fulfill({
    body: 'window.tailwind = {};', contentType: 'text/javascript',
  }));
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.abort());
  await page.route('**/hubs/**', (route) => route.fulfill({ status: 503, json: {} }));
  await page.route('**/api/v1/**', (route) => {
    const url = new URL(route.request().url());
    const pathname = url.pathname;
    requests.push({ pathname, query: Object.fromEntries(url.searchParams) });
    if (pathname.endsWith('/auth/me')) return route.fulfill({ json: { status: 200, data: account } });
    if (pathname.endsWith('/notifications')) return route.fulfill({ json: { status: 200,
      data: { items: [], unreadCount: 0, totalCount: 0 } } });
    if (pathname.endsWith('/orders/supplier/dashboard-summary')) return route.fulfill({ json: { status: 200, data: {
      totalOrders: 250, pendingOrders: 125, confirmedOrders: 125, totalRevenue: 300000000,
    } } });
    if (pathname.endsWith('/admin/orders/operations/summary')) return route.fulfill({ json: { status: 200, data: {
      platformHeldAmount: 250000000, platformDisputedAmount: 10000000,
      platformEligibleAmount: 20000000, platformPaidOutSimulatedAmount: 0,
      platformRefundedSimulatedAmount: 0,
    } } });
    if (pathname.includes('/admin/orders/operations/') || pathname.endsWith('/admin/disputes')) {
      const pageNumber = Number(url.searchParams.get('page') || 1);
      const pageSize = Number(url.searchParams.get('pageSize') || 10);
      return route.fulfill({ json: { status: 200, data: {
        items: adminRows.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
        page: pageNumber, pageSize, totalCount: adminRows.length,
      } } });
    }
    if (pathname.endsWith('/orders/supplier/financial-overview')) return route.fulfill({ json: { status: 200, data: {} } });
    if (pathname.endsWith('/orders/mine/paged') || pathname.endsWith('/orders/supplier/paged')) {
      const pageNumber = Number(url.searchParams.get('page') || 1);
      const pageSize = Number(url.searchParams.get('pageSize') || 10);
      const q = url.searchParams.get('q')?.toLowerCase();
      const status = url.searchParams.get('status');
      const filtered = orders.filter((order) => (!q || order.orderNumber.toLowerCase().includes(q)
        || order.recipientName.toLowerCase().includes(q)) && (!status || order.status === status));
      return route.fulfill({ json: { status: 200, data: {
        items: filtered.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
        page: pageNumber, pageSize, totalCount: filtered.length,
      } } });
    }
    if (pathname.endsWith('/users')) {
      const pageNumber = Number(url.searchParams.get('page') || 1);
      const pageSize = Number(url.searchParams.get('pageSize') || 10);
      const q = url.searchParams.get('q')?.toLowerCase();
      const roleFilter = url.searchParams.get('role');
      const filtered = users.filter((user) => (!q || user.email.includes(q)
        || user.fullName.toLowerCase().includes(q)) && (!roleFilter || user.role === roleFilter));
      return route.fulfill({ json: { status: 200, data: {
        items: filtered.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
        page: pageNumber, pageSize, totalCount: filtered.length,
      } } });
    }
    if (pathname.endsWith('/deliveries') || pathname.endsWith('/contracts/mine')) {
      const source = pathname.endsWith('/deliveries') ? deliveries : contracts;
      if (!url.searchParams.has('page')) return route.fulfill({ json: { status: 200, data: [] } });
      const pageNumber = Number(url.searchParams.get('page') || 1);
      const pageSize = Number(url.searchParams.get('pageSize') || 10);
      const q = url.searchParams.get('q')?.toLowerCase();
      const status = url.searchParams.get('status');
      const filtered = source.filter((item) => (!q || (item.deliveryNumber || item.contractNumber)
        .toLowerCase().includes(q)) && (!status || item.status === status));
      return route.fulfill({ json: { status: 200, data: {
        items: filtered.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
        page: pageNumber, pageSize, totalCount: filtered.length,
      } } });
    }
    if (pathname.endsWith('/admin/audit-logs')) {
      const pageNumber = Number(url.searchParams.get('page') || 1);
      const pageSize = Number(url.searchParams.get('pageSize') || 10);
      return route.fulfill({ json: { status: 200, data: {
        items: auditLogs.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
        page: pageNumber, pageSize, totalCount: auditLogs.length,
      } } });
    }
    return route.fulfill({ json: { status: 200, data: [] } });
  });
}

test('admin_audit: paging and responsive', async ({ page }) => {
  const requests = [];
  await setup(page, 'Admin', requests);
  await page.goto('/#admin/dieu-khien');
  await page.getByRole('tab', { name: /Nhật ký quản trị/ }).click();
  await expect(page.getByText('AuditPaging0001')).toBeVisible();
  const folder = path.join(root, 'admin_audit');
  await mkdir(folder, { recursive: true });
  for (const [name, width, height] of viewports) {
    await page.setViewportSize({ width, height });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.screenshot({ path: path.join(folder, `${name}.png`), fullPage: true });
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.locator('.ant-pagination-item-2:visible').click();
  await expect(page.getByText('AuditPaging0011')).toBeVisible();
  await page.screenshot({ path: path.join(folder, 'page_2.png'), fullPage: true });
  await writeFile(path.join(folder, 'api-log.json'), JSON.stringify(requests, null, 2));
});

test('admin_operations: four server-paged tables', async ({ page }) => {
  const requests = [];
  await setup(page, 'Admin', requests);
  await page.goto('/#admin/van-hanh-giao-dich');
  const screens = [
    { name: 'admin_delivery_disputes', tab: null, first: 'ADMIN-PAGING-0001', second: 'ADMIN-PAGING-0011' },
    { name: 'admin_refund_cases', tab: /Hồ Sơ Yêu Cầu Hoàn Tiền/, first: 'REF-PAGING-0001', second: 'REF-PAGING-0011' },
    { name: 'admin_payout_requests', tab: /Yêu Cầu Giải Ngân NCC/, first: 'PAY-PAGING-0001', second: 'PAY-PAGING-0011' },
    { name: 'admin_contract_disputes', tab: /Hàng Đợi Tranh Chấp Hợp Đồng/, first: 'CT-PAGING-0001', second: 'CT-PAGING-0011' },
  ];
  for (const screen of screens) {
    if (screen.tab) await page.getByRole('tab', { name: screen.tab }).click();
    await expect(page.getByText(screen.first).first()).toBeVisible();
    const folder = path.join(root, screen.name);
    await mkdir(folder, { recursive: true });
    for (const [name, width, height] of viewports) {
      await page.setViewportSize({ width, height });
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      await page.screenshot({ path: path.join(folder, `${name}.png`), fullPage: true });
    }
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.locator('.ant-pagination-item-2:visible').last().click();
    await expect(page.getByText(screen.second).first()).toBeVisible();
    await page.screenshot({ path: path.join(folder, 'page_2.png'), fullPage: true });
  }
  await writeFile(path.join(root, 'admin_operations_api-log.json'), JSON.stringify(requests, null, 2));
});

for (const screen of [
  { name: 'supplier_deliveries', role: 'Supplier', route: 'nha-cung-cap/quan-ly-giao-hang',
    api: '/deliveries', first: 'DL-PAGING-0001', second: 'DL-PAGING-0011' },
  { name: 'supplier_contracts', role: 'Supplier', route: 'nha-cung-cap/quan-ly-hop-dong',
    api: '/contracts/mine', first: 'CT-PAGING-0001', second: 'CT-PAGING-0011' },
  { name: 'customer_deliveries', role: 'Customer', route: 'giao-hang-pod',
    api: '/deliveries', first: 'DL-PAGING-0001', second: 'DL-PAGING-0011' },
  { name: 'supplier_dashboard', role: 'Supplier', route: 'nha-cung-cap/dashboard',
    api: '/orders/supplier/paged', first: 'MC-PAGING-0001', second: 'MC-PAGING-0011' },
]) {
  test(`${screen.name}: paging and responsive`, async ({ page }) => {
    const requests = [];
    await setup(page, screen.role, requests);
    await page.goto(`/#${screen.route}`);
    await expect(page.getByText(screen.first).first()).toBeVisible();
    const folder = path.join(root, screen.name);
    await mkdir(folder, { recursive: true });
    for (const [name, width, height] of viewports) {
      await page.setViewportSize({ width, height });
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      await page.screenshot({ path: path.join(folder, `${name}.png`), fullPage: true });
    }
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.locator('.ant-pagination-item-2').first().click();
    await expect(page.getByText(screen.second).first()).toBeVisible();
    await page.screenshot({ path: path.join(folder, 'page_2.png'), fullPage: true });
    await writeFile(path.join(folder, 'api-log.json'), JSON.stringify(requests, null, 2));
  });
}

for (const screen of [
  { name: 'customer_orders', role: 'Customer', route: 'don-hang-cua-toi', api: '/orders/mine/paged' },
  { name: 'supplier_orders', role: 'Supplier', route: 'nha-cung-cap/quan-ly-don-hang', api: '/orders/supplier/paged' },
  { name: 'admin_users', role: 'Admin', route: 'admin/dieu-khien', api: '/users' },
]) {
  test(`${screen.name}: paging, search, URL, responsive`, async ({ page }) => {
    const requests = [];
    await setup(page, screen.role, requests);
    await page.goto(`/#${screen.route}`);
    await expect.poll(() => requests.filter((entry) => entry.pathname.endsWith(screen.api)).length).toBeGreaterThan(0);
    await expect(page.getByText(screen.name === 'admin_users' ? 'user1@test.mooncake.local' : 'MC-PAGING-0001').first()).toBeVisible();

    const folder = path.join(root, screen.name);
    await mkdir(folder, { recursive: true });
    for (const [name, width, height] of viewports) {
      await page.setViewportSize({ width, height });
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      await page.screenshot({ path: path.join(folder, `${name}.png`), fullPage: true });
    }

    await page.setViewportSize({ width: 1440, height: 900 });
    const pagination = page.locator('.ant-pagination').first();
    await pagination.locator('.ant-pagination-item-2').click();
    await expect(page.getByText(screen.name === 'admin_users' ? 'user11@test.mooncake.local' : 'MC-PAGING-0011').first()).toBeVisible();
    await page.screenshot({ path: path.join(folder, 'page_2.png'), fullPage: true });
    expect(requests.some((entry) => entry.pathname.endsWith(screen.api) && entry.query.page === '2')).toBeTruthy();

    await page.goto(`/#${screen.route}?page=25&pageSize=10`);
    await expect(page.getByText(screen.name === 'admin_users' ? 'user241@test.mooncake.local' : 'MC-PAGING-0241').first()).toBeVisible();
    await page.screenshot({ path: path.join(folder, 'last_page.png'), fullPage: true });
    const sizeSelect = page.locator('.ant-pagination-options-size-changer').first();
    await sizeSelect.click();
    await page.locator('.ant-select-item-option').filter({ hasText: '20' }).first().click();
    await expect.poll(() => requests.some((entry) => entry.pathname.endsWith(screen.api)
      && entry.query.pageSize === '20')).toBeTruthy();
    await page.screenshot({ path: path.join(folder, 'page_size_20.png'), fullPage: true });

    const filter = page.locator('select[aria-label="Trạng thái"], [role="combobox"][aria-label="Trạng thái"], [role="combobox"][aria-label="Vai trò"]').first();
    await filter.click();
    await page.getByText(screen.name === 'admin_users' ? 'Supplier' : 'Pending', { exact: true }).last().click();
    await expect.poll(() => requests.some((entry) => entry.pathname.endsWith(screen.api)
      && (entry.query.status === 'Pending' || entry.query.role === 'Supplier'))).toBeTruthy();
    await page.screenshot({ path: path.join(folder, 'status_filter.png'), fullPage: true });
    await page.getByRole('button', { name: 'Đặt lại' }).first().click();

    const search = page.locator('input[aria-label^="Tìm"]').first();
    await search.fill(screen.name === 'admin_users' ? 'user250@' : 'MC-PAGING-0250');
    await expect(page.getByText(screen.name === 'admin_users' ? 'user250@test.mooncake.local' : 'MC-PAGING-0250').first()).toBeVisible();
    await page.screenshot({ path: path.join(folder, 'search.png'), fullPage: true });
    await page.reload();
    await expect(page.getByText(screen.name === 'admin_users' ? 'user250@test.mooncake.local' : 'MC-PAGING-0250').first()).toBeVisible();
    await search.fill('no-matching-record-999');
    await expect(page.getByText(screen.name === 'admin_users' ? 'user250@test.mooncake.local' : 'MC-PAGING-0250').first()).not.toBeVisible();
    await page.screenshot({ path: path.join(folder, 'empty.png'), fullPage: true });
    await page.getByRole('button', { name: 'Đặt lại' }).first().click();
    await expect(page.getByText(screen.name === 'admin_users' ? 'user1@test.mooncake.local' : 'MC-PAGING-0001').first()).toBeVisible();
    await page.screenshot({ path: path.join(folder, 'reset.png'), fullPage: true });
    await writeFile(path.join(folder, 'api-log.json'), JSON.stringify(requests, null, 2));
  });
}
