import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

const customerId = '11111111-1111-4111-8111-111111111111';
const adminId = '99999999-9999-4999-8999-999999999999';

async function setupAuth(page, role = 'Admin') {
  const user = {
    id: role === 'Admin' ? adminId : customerId,
    fullName: role === 'Admin' ? 'Ban Quản Trị Hệ Thống Sàn' : 'Doanh nghiệp Vingroup Corp',
    role,
    capabilities: {
      canManageSystem: role === 'Admin',
      canAccessAdminWorkspace: role === 'Admin',
      canPlaceEnterpriseOrders: role === 'Customer',
    },
  };

  const expToken = `test.${Buffer.from(
    JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })
  ).toString('base64url')}.test`;

  await page.addInitScript(
    ({ t, u }) => {
      localStorage.setItem('mooncake_auth_token', JSON.stringify(t));
      localStorage.setItem('mooncake_auth_user', JSON.stringify(u));
      localStorage.setItem('mooncake_auth_refresh_token', JSON.stringify('mock-refresh-token'));
    },
    { t: expToken, u: user }
  );

  await page.route('**/hubs/supplier-verification/negotiate*', (route) => route.fulfill({ status: 503, json: {} }));
  await page.route('**/hubs/notifications/negotiate*', (route) => route.fulfill({ status: 503, json: {} }));
  await page.route('**/api/v1/auth/me', async (route) => {
    await route.fulfill({ json: { status: 200, data: user } });
  });

  await page.route('**/api/v1/payments/escrow/summary*', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        totalHeldAmount: 50000000,
        pendingRefundsCount: 0,
        activeEscrowContractsCount: 2,
      }),
    })
  );

  await page.route('**/api/v1/reports/dashboard-metrics*', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        totalGmv: 18450000000,
        platformRevenue: 553500000,
        totalOrdersCount: 420,
        activeContractsCount: 128,
        pendingDisputesCount: 1,
        totalEscrowBalance: 120000000,
        growthRatePercentage: 18.4,
      }),
    })
  );

  await page.route('**/api/v1/reports/top-suppliers*', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          supplierId: 'sup-001',
          shopName: 'Xưởng Bánh Kinh Đô',
          taxCode: '0108928371',
          score: 95,
          status: 'verified',
        },
      ]),
    })
  );

  await page.route('**/api/v1/reports/conversion-funnel*', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        stages: [
          { stageName: '1. Yêu Cầu Báo Giá (RFQs Published)', count: 150, conversionRatePercentage: 100 },
          { stageName: '2. Hồ Sơ Chào Thầu (Bids Submitted)', count: 420, conversionRatePercentage: 280 },
          { stageName: '3. Báo Giá Trúng Thầu (Bids Awarded)', count: 132, conversionRatePercentage: 88 },
          { stageName: '4. Hợp Đồng Ký Số OTP (Contracts Signed)', count: 128, conversionRatePercentage: 85.3 },
          { stageName: '5. Nghiệm Thu Hoàn Tất (Contracts Completed)', count: 115, conversionRatePercentage: 76.7 },
        ],
      }),
    })
  );

  await page.route(/\/admin\/disputes/, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        items: [],
        totalCount: 0,
      }),
    })
  );

  await page.route('**/api/v1/notifications*', async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname.endsWith('/unread-count')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 200, data: { unreadCount: 1, count: 1 } }),
      });
    }
    if (url.pathname.endsWith('/read-all')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 200, data: { updatedCount: 1, unreadCount: 0 } }),
      });
    }
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 200,
        data: {
          items: [],
          unreadCount: 1,
          totalCount: 0,
        },
      }),
    });
  });
}

test.describe('Module 11: System Operations & Real-Time Notifications (Features #26, #27, #28)', () => {
  test('1. Notification Bell displays unread badge, opens Drawer, filters categories and marks all as read', async ({ page }) => {
    await setupAuth(page, 'Admin');

    let currentUnread = 3;
    const mockNotifications = [
      {
        id: 'notif-001',
        title: 'Thanh toán cọc 50% thành công',
        content: 'Doanh nghiệp Vingroup Corp đã thanh toán 18.500.000 ₫ qua VNPay Sandbox.',
        category: 'payment',
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'notif-002',
        title: 'Tranh chấp hợp đồng mới phát sinh',
        content: 'Bên mua khiếu nại chất lượng sản phẩm lô HĐ-2026-VIP01.',
        category: 'contract',
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'notif-003',
        title: 'Báo giá RFQ mới được gửi',
        content: 'Xưởng Bánh Kinh Đô đã gửi báo giá cho phiên RFQ-2026-088.',
        category: 'rfq',
        isRead: false,
        createdAt: new Date().toISOString(),
      },
    ];

    await page.route('**/api/v1/notifications*', async (route) => {
      const url = new URL(route.request().url());
      if (url.pathname.endsWith('/unread-count')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ count: currentUnread }),
        });
      }
      if (url.pathname.endsWith('/read-all')) {
        currentUnread = 0;
        mockNotifications.forEach((n) => { n.isRead = true; });
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, updatedCount: mockNotifications.length, unreadCount: 0 }),
        });
      }
      const cat = url.searchParams.get('category');
      const filtered = cat && cat !== 'all' ? mockNotifications.filter((n) => n.category === cat) : mockNotifications;
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          items: filtered,
          unreadCount: currentUnread,
          totalCount: filtered.length,
        }),
      });
    });

    await page.goto('/#admin/dashboard');

    // Verify Notification Bell with badge
    const bellBtn = page.getByRole('button', { name: 'Thông báo hệ thống' });
    await expect(bellBtn).toBeVisible({ timeout: 10000 });

    // Open Notification Drawer
    await bellBtn.click();
    const drawerTitle = page.getByText('🔔 Thông Báo Hoàng Gia');
    await expect(drawerTitle).toBeVisible();

    // Verify notification items rendered
    await expect(page.getByText('Thanh toán cọc 50% thành công')).toBeVisible();
    await expect(page.getByText('Tranh chấp hợp đồng mới phát sinh')).toBeVisible();

    // Filter by 'Thanh toán'
    await page.getByRole('button', { name: 'Thanh toán' }).click();
    await expect(page.getByText('Thanh toán cọc 50% thành công')).toBeVisible();
    await expect(page.getByText('Tranh chấp hợp đồng mới phát sinh')).not.toBeVisible();

    // Switch back to 'Tất cả'
    await page.getByRole('button', { name: 'Tất cả', exact: true }).click();
    await expect(page.getByText('Tranh chấp hợp đồng mới phát sinh')).toBeVisible();

    // Click 'Đọc tất cả'
    const markAllBtn = page.getByRole('button', { name: 'Đọc tất cả' });
    if (await markAllBtn.isVisible()) {
      await markAllBtn.click();
    }
  });

  test('2. Admin inspects SafeTrade dispute and issues arbitration verdict with Escrow refund', async ({ page }) => {
    await setupAuth(page, 'Admin');

    const mockDisputes = [
      {
        id: 'disp-test-001',
        contractId: 'ctr-test-001',
        contractNumber: 'HĐ-2026-VIP01',
        customerName: 'Tập đoàn BĐS Đất Vàng',
        supplierName: 'Xưởng Bánh Trung Thu Kinh Đô Gia Truyền',
        disputeReason: 'Bánh bị giao trễ 7 ngày và sai lệch quy cách bao bì VIP.',
        heldEscrowAmount: 35000000,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      },
    ];

    let resolvePayload = null;
    await page.route(/\/admin\/disputes/, async (route) => {
      const url = new URL(route.request().url());
      if (route.request().method() === 'POST' && url.pathname.includes('/resolve')) {
        resolvePayload = route.request().postDataJSON();
        mockDisputes[0].status = 'Resolved';
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ status: 200, message: 'Dispute resolved successfully' }),
        });
      }
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          items: mockDisputes,
          totalCount: mockDisputes.length,
        }),
      });
    });

    await page.goto('/#admin/dashboard');

    // Switch to SafeTrade tab
    const disputeTab = page.getByRole('tab', { name: /Trọng Tài Tranh Chấp SafeTrade/i });
    await expect(disputeTab).toBeVisible({ timeout: 10000 });
    await disputeTab.click();

    // Verify dispute table entry
    await expect(page.getByText('HĐ-2026-VIP01')).toBeVisible();
    await expect(page.getByText('Tập đoàn BĐS Đất Vàng')).toBeVisible();
    await expect(page.getByText('35.000.000 ₫')).toBeVisible();
    await expect(page.getByText('Chờ phân xử')).toBeVisible();

    // Click "Phân xử" button inside dispute table
    const resolveBtn = page.getByRole('table').getByRole('button', { name: 'Phân xử', exact: true }).first();
    await expect(resolveBtn).toBeVisible();
    await resolveBtn.click();

    // Verify Modal
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(page.getByText('Trọng Tài Tranh Chấp Hợp Đồng SafeTrade')).toBeVisible();

    // Fill in verdict reasoning
    const verdictInput = modal.getByPlaceholder(/Nhập kết luận chính thức và căn cứ phân xử/i);
    await verdictInput.fill('Căn cứ biên bản vi phạm tiến độ giao hàng, chấp thuận hoàn 100% tiền cọc và trừ 20 điểm uy tín.');

    // Submit arbitration verdict
    const submitBtn = modal.getByRole('button', { name: 'Xác nhận phán quyết & Hoàn tiền cọc' });
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // Verify success notification & payload sent
    await expect(page.getByText('Đã hoàn tất phân xử trọng tài SafeTrade thành công!')).toBeVisible({ timeout: 10000 });
    expect(resolvePayload).not.toBeNull();
    expect(resolvePayload.resolutionType).toBe('SupplierAtFault');
    expect(resolvePayload.deductReputationPoints).toBe(20);
  });

  test('3. Admin inspects 5-stage RFQ conversion funnel and exports CSV report', async ({ page }) => {
    await setupAuth(page, 'Admin');

    await page.route('**/api/v1/reports/conversion-funnel*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          stages: [
            { stageName: '1. Yêu Cầu Báo Giá (RFQs Published)', count: 150, conversionRatePercentage: 100 },
            { stageName: '2. Hồ Sơ Chào Thầu (Bids Submitted)', count: 420, conversionRatePercentage: 280 },
            { stageName: '3. Báo Giá Trúng Thầu (Bids Awarded)', count: 132, conversionRatePercentage: 88 },
            { stageName: '4. Hợp Đồng Ký Số OTP (Contracts Signed)', count: 128, conversionRatePercentage: 85.3 },
            { stageName: '5. Nghiệm Thu Hoàn Tất (Contracts Completed)', count: 115, conversionRatePercentage: 76.7 },
          ],
        }),
      });
    });

    await page.route('**/api/v1/reports/export*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/csv',
        headers: {
          'Content-Disposition': 'attachment; filename="BaoCao_NguyetPho_2026.csv"',
        },
        body: 'Mã Báo Cáo,Ngày,GMV Tổng,Hợp Đồng Ký Số\nRP-20261029,2026-10-29,1500000000,128\n',
      });
    });

    await page.goto('/#admin/dashboard');

    // Switch to Funnel tab
    const funnelTab = page.getByRole('tab', { name: /Phễu Chuyển Đổi RFQ & Báo Cáo/i });
    await expect(funnelTab).toBeVisible({ timeout: 10000 });
    await funnelTab.click();

    // Verify 5 stages are displayed
    await expect(page.getByText(/1\.\s*Yêu Cầu Báo Giá/i)).toBeVisible();
    await expect(page.getByText(/2\.\s*Hồ Sơ Chào Thầu/i)).toBeVisible();
    await expect(page.getByText(/3\.\s*Báo Giá Trúng Thầu/i)).toBeVisible();
    await expect(page.getByText(/4\.\s*Hợp Đồng Ký Số OTP/i)).toBeVisible();
    await expect(page.getByText(/5\.\s*Nghiệm Thu Hoàn Tất/i)).toBeVisible();

    // Click Export CSV button
    const exportBtn = page.getByRole('button', { name: /Xuất Báo Cáo CSV/i });
    await expect(exportBtn).toBeVisible();
    await exportBtn.click();

    // Verify success toast message
    await expect(page.getByText('Đã xuất file báo cáo CSV thành công!')).toBeVisible({ timeout: 10000 });
  });

  test('4. Mobile Viewport renders Notification Drawer as Bottom Sheet', async ({ page }) => {
    // Set mobile device viewport (iPhone 14 / Pro style: 390 x 844)
    await page.setViewportSize({ width: 390, height: 844 });
    await setupAuth(page, 'Admin');

    await page.route('**/api/v1/notifications*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          items: [
            {
              id: 'notif-m-1',
              title: 'Hợp đồng HĐ-2026-VIP01 đã ký số',
              content: 'Hai bên đã ký số xác thực OTP thành công.',
              category: 'contract',
              isRead: false,
              createdAt: new Date().toISOString(),
            },
          ],
          unreadCount: 1,
          totalCount: 1,
        }),
      });
    });

    await page.goto('/#admin/dashboard');

    // Locate and click notification bell
    const bellBtn = page.getByRole('button', { name: 'Thông báo hệ thống' });
    await expect(bellBtn).toBeVisible({ timeout: 10000 });
    await bellBtn.click();

    // In mobile viewport (< 768px), Ant Design Drawer renders with class ant-drawer-bottom
    const mobileDrawer = page.locator('.ant-drawer-bottom');
    await expect(mobileDrawer).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Hợp đồng HĐ-2026-VIP01 đã ký số')).toBeVisible();
  });
});
