import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

const customerId = '11111111-1111-4111-8111-111111111111';
const supplierId = '22222222-2222-4222-8222-222222222222';
const contractId = 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';
const milestone1Id = '11111111-2222-3333-4444-555555555551';
const milestone2Id = '11111111-2222-3333-4444-555555555552';
const milestone3Id = '11111111-2222-3333-4444-555555555553';

const contractDraftFixture = {
  id: contractId,
  contractNumber: 'HD-2026-TEST01',
  title: 'Hợp đồng Cung cấp Quà tặng Doanh nghiệp B2B',
  totalValue: 150000000,
  deliveryDeadline: '2026-09-15',
  status: 'PendingSignature',
  signedByCustomerAt: null,
  signedBySupplierAt: null,
  signedDocumentSha256: null,
};

const contractActiveFixture = {
  id: contractId,
  contractNumber: 'HD-2026-TEST01',
  title: 'Hợp đồng Cung cấp Quà tặng Doanh nghiệp B2B',
  totalValue: 150000000,
  deliveryDeadline: '2026-09-15',
  status: 'Active',
  signedByCustomerAt: '2026-08-20T10:00:00Z',
  signedBySupplierAt: '2026-08-20T11:00:00Z',
  signedDocumentSha256: 'E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855',
  depositAmount: 45000000,
  depositPaidAt: '2026-08-21T09:00:00Z',
  milestones: [
    {
      id: milestone1Id,
      sequenceNumber: 1,
      name: 'Đặt cọc kích hoạt hợp đồng (M1)',
      isDeposit: true,
      amount: 45000000,
      percentage: 30,
      status: 'Paid',
      dueDate: '2026-08-23',
      completionDate: '2026-08-21',
    },
    {
      id: milestone2Id,
      sequenceNumber: 2,
      name: 'Sản xuất & Giao hàng đợt 1 (M2)',
      isDeposit: false,
      amount: 75000000,
      percentage: 50,
      status: 'InProgress',
      dueDate: '2026-09-01',
      completionDate: null,
    },
    {
      id: milestone3Id,
      sequenceNumber: 3,
      name: 'Nghiệm thu toàn bộ & Quyết toán (M3)',
      isDeposit: false,
      amount: 30000000,
      percentage: 20,
      status: 'Pending',
      dueDate: '2026-09-15',
      completionDate: null,
    },
  ],
};

async function setupAuth(page, role = 'Customer') {
  const user = {
    id: role === 'Customer' ? customerId : supplierId,
    fullName: role === 'Customer' ? 'B2B Procurement Manager' : 'Xưởng Bánh Hoàng Triều',
    role,
    capabilities: {
      canCreateShop: role === 'Supplier',
      canReadSupplierVerification: role === 'Supplier',
      canFulfillExistingOrders: role === 'Supplier',
    },
    supplierVerification: { verificationStatus: role === 'Supplier' ? 'Verified' : null },
  };

  await page.addInitScript(({ user, token }) => {
    localStorage.setItem('mooncake_auth_user', JSON.stringify(user));
    localStorage.setItem('mooncake_auth_token', JSON.stringify(token));
    localStorage.setItem('mooncake_auth_refresh_token', JSON.stringify('test-refresh'));
  }, {
    user,
    token: `test.${Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url')}.test`,
  });

  await page.route('https://cdn.tailwindcss.com/**', (route) => route.fulfill({ body: 'window.tailwind = {};', contentType: 'text/javascript' }));
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.abort());
  await page.route('**/hubs/supplier-verification/negotiate*', (route) => route.fulfill({ status: 503, json: {} }));
}

test.describe('Module 6: Contract Management & Milestones E2E Tests', () => {
  test('Customer performs OTP digital signature on pending contract (Feature #15)', async ({ page }) => {
    let otpRequested = false;
    let signedOtpCode = null;

    await setupAuth(page, 'Customer');
    await page.route('**/api/v1/auth/me', (route) => route.fulfill({ json: { status: 200, data: { id: customerId, role: 'Customer' } } }));
    await page.route('**/api/v1/notifications', (route) => route.fulfill({ json: { status: 200, data: { items: [], unreadCount: 0, totalCount: 0 } } }));
    await page.route('**/api/v1/payments/mine', (route) => route.fulfill({ json: { status: 200, data: [] } }));

    await page.route('**/api/v1/contracts/mine', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 200,
          data: [signedOtpCode ? { ...contractDraftFixture, signedByCustomerAt: '2026-08-20T10:00:00Z' } : contractDraftFixture],
        }),
      });
    });

    await page.route(`**/api/v1/contracts/${contractId}/signature-otp`, async (route) => {
      otpRequested = true;
      await route.fulfill({ status: 200, json: { status: 200, data: contractDraftFixture, message: 'OTP sent' } });
    });

    await page.route(`**/api/v1/contracts/${contractId}/sign`, async (route) => {
      const payload = JSON.parse(route.request().postData());
      signedOtpCode = payload.otpCode;
      await route.fulfill({
        status: 200,
        json: {
          status: 200,
          data: { ...contractDraftFixture, signedByCustomerAt: '2026-08-20T10:00:00Z' },
        },
      });
    });

    await page.goto('/#hop-dong-tien-do');
    await expect(page.getByRole('heading', { name: /Hợp Đồng & Tiến Độ/i })).toBeVisible();
    await expect(page.getByText('HD-2026-TEST01')).toBeVisible();

    // Click "Ký OTP"
    await page.getByRole('button', { name: 'Ký OTP' }).click();
    await expect(page.getByRole('dialog').getByText('Ký Hợp Đồng Bằng Mã OTP')).toBeVisible();
    expect(otpRequested).toBe(true);

    // Enter OTP code and confirm
    await page.getByPlaceholder('Nhập 6 chữ số OTP').fill('123456');
    await page.getByRole('button', { name: 'Xác nhận ký điện tử' }).click();

    await expect(page.getByText('Đã ghi nhận chữ ký điện tử.')).toBeVisible();
    expect(signedOtpCode).toBe('123456');
  });

  test('Supplier reports milestone progress with evidence and Customer verifies (Feature #16)', async ({ page }) => {
    let progressNotesSubmitted = null;
    let verifiedApproved = null;

    // --- STEP 1: Supplier logs in and submits progress evidence ---
    await setupAuth(page, 'Supplier');
    await page.route('**/api/v1/auth/me', (route) => route.fulfill({
      json: {
        status: 200,
        data: {
          id: supplierId,
          role: 'Supplier',
          capabilities: { canCreateShop: true, canReadSupplierVerification: true, canFulfillExistingOrders: true },
          supplierVerification: { verificationStatus: 'Verified' },
        },
      },
    }));
    await page.route('**/api/v1/notifications', (route) => route.fulfill({ json: { status: 200, data: { items: [], unreadCount: 0, totalCount: 0 } } }));

    await page.route('**/api/v1/contracts/mine', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 200, data: [contractActiveFixture] }),
      });
    });

    await page.route(`**/api/v1/contracts/${contractId}`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 200, data: contractActiveFixture }),
      });
    });

    await page.route(`**/api/v1/contracts/${contractId}/milestones/${milestone2Id}/submit-progress`, async (route) => {
      const payload = JSON.parse(route.request().postData());
      progressNotesSubmitted = payload.progressNotes;
      await route.fulfill({
        status: 200,
        json: {
          status: 200,
          data: {
            ...contractActiveFixture.milestones[1],
            status: 'PendingReview',
            progressNotes: payload.progressNotes,
            evidenceUrls: payload.evidenceUrls,
          },
        },
      });
    });

    await page.goto('/#nha-cung-cap/quan-ly-hop-dong');
    await expect(page.getByText('HD-2026-TEST01')).toBeVisible();

    // Open milestones modal
    await page.getByRole('button', { name: 'Tiến độ Mốc' }).click();
    await expect(page.getByRole('dialog').getByText('Tiến Độ Các Mốc Hợp Đồng: HD-2026-TEST01')).toBeVisible();

    // Click "Báo cáo tiến độ & Nộp ảnh bằng chứng" on milestone 2
    await page.getByRole('button', { name: 'Báo cáo tiến độ & Nộp ảnh bằng chứng' }).first().click();
    await expect(page.getByText('Báo Cáo Tiến Độ Mốc: Sản xuất & Giao hàng đợt 1 (M2)')).toBeVisible();

    // Fill progress report
    await page.getByPlaceholder('VD: Đã làm xong 500 khuôn bánh thập cẩm gà quay, đóng gói màng co và dán tem phụ...').fill('Đã hoàn thành nướng 500 bánh thập cẩm và đóng hộp.');
    await page.getByRole('button', { name: 'Nộp Báo Cáo Tiến Độ' }).click();

    expect(progressNotesSubmitted).toBe('Đã hoàn thành nướng 500 bánh thập cẩm và đóng hộp.');
  });

  test('Customer reviews pending milestone and verifies approval (Feature #16)', async ({ page }) => {
    let verifiedApproved = false;

    const contractWithReviewMilestone = {
      ...contractActiveFixture,
      milestones: [
        contractActiveFixture.milestones[0],
        {
          ...contractActiveFixture.milestones[1],
          status: 'PendingReview',
          progressNotes: 'Đã hoàn thành nướng 500 bánh thập cẩm và đóng hộp.',
          evidenceUrls: ['https://example.com/batch1.jpg'],
        },
        contractActiveFixture.milestones[2],
      ],
    };

    await setupAuth(page, 'Customer');
    await page.route('**/api/v1/auth/me', (route) => route.fulfill({ json: { status: 200, data: { id: customerId, role: 'Customer' } } }));
    await page.route('**/api/v1/notifications', (route) => route.fulfill({ json: { status: 200, data: { items: [], unreadCount: 0, totalCount: 0 } } }));
    await page.route('**/api/v1/payments/mine', (route) => route.fulfill({ json: { status: 200, data: [] } }));

    await page.route('**/api/v1/contracts/mine', async (route) => {
      await route.fulfill({ status: 200, json: { status: 200, data: [contractWithReviewMilestone] } });
    });

    await page.route(`**/api/v1/contracts/${contractId}`, async (route) => {
      await route.fulfill({ status: 200, json: { status: 200, data: contractWithReviewMilestone } });
    });

    await page.route(`**/api/v1/contracts/${contractId}/milestones/${milestone2Id}/verify`, async (route) => {
      const payload = JSON.parse(route.request().postData());
      verifiedApproved = payload.isApproved;
      await route.fulfill({
        status: 200,
        json: {
          status: 200,
          data: {
            ...contractWithReviewMilestone.milestones[1],
            status: 'CompletedOnTime',
            completionDate: '2026-08-25',
          },
        },
      });
    });

    await page.goto('/#hop-dong-tien-do');
    await page.getByRole('button', { name: 'Tiến độ & Mốc' }).click();

    // Verify milestone drawer is visible
    await expect(page.getByText('Tiến độ & Mốc nghiệm thu: HD-2026-TEST01')).toBeVisible();
    await expect(page.getByText('Chờ khách nghiệm thu')).toBeVisible();

    // Click approve button
    await page.getByRole('button', { name: 'Phê duyệt nghiệm thu mốc' }).click();
    await expect(page.getByText('Đã phê duyệt mốc tiến độ "Sản xuất & Giao hàng đợt 1 (M2)" thành công!')).toBeVisible();
    expect(verifiedApproved).toBe(true);
  });

  test('Customer performs final acceptance and settles contract (Feature #18)', async ({ page }) => {
    let finalAcceptanceConfirmed = false;

    await setupAuth(page, 'Customer');
    await page.route('**/api/v1/auth/me', (route) => route.fulfill({ json: { status: 200, data: { id: customerId, role: 'Customer' } } }));
    await page.route('**/api/v1/notifications', (route) => route.fulfill({ json: { status: 200, data: { items: [], unreadCount: 0, totalCount: 0 } } }));
    await page.route('**/api/v1/payments/mine', (route) => route.fulfill({ json: { status: 200, data: [] } }));

    await page.route('**/api/v1/contracts/mine', async (route) => {
      await route.fulfill({ status: 200, json: { status: 200, data: [contractActiveFixture] } });
    });

    await page.route(`**/api/v1/contracts/${contractId}/confirm-final-acceptance`, async (route) => {
      const payload = JSON.parse(route.request().postData());
      finalAcceptanceConfirmed = payload.confirmedQualityAndQuantity;
      await route.fulfill({
        status: 200,
        json: {
          status: 200,
          data: { ...contractActiveFixture, status: 'CompletedOnTime', completedAt: '2026-09-08T15:00:00Z' },
        },
      });
    });

    await page.goto('/#hop-dong-tien-do');
    await page.getByRole('button', { name: 'Nghiệm thu dứt điểm' }).click();

    await expect(page.getByText('Biên Bản Nghiệm Thu Tổng Thể & Hoàn Tất Hợp Đồng')).toBeVisible();

    // Check confirmation checkbox
    await page.getByRole('checkbox').check();
    await page.getByPlaceholder('VD: Hàng giao đúng hẹn, bánh thơm ngon, đóng gói rất cẩn thận...').fill('Chất lượng bánh hoàn hảo, giao đúng cam kết.');

    await page.getByRole('button', { name: 'Ký biên bản & Hoàn tất hợp đồng' }).click();

    await expect(page.getByText('Chúc mừng! Hợp đồng kinh tế đã được nghiệm thu và hoàn tất thành công.')).toBeVisible();
    expect(finalAcceptanceConfirmed).toBe(true);
  });
});

