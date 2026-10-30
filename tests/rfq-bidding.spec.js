import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

const customerId = '11111111-1111-4111-8111-111111111111';
const supplierId = '22222222-2222-4222-8222-222222222222';

const rfqItemFixture = {
  id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  productName: 'Bánh Trung Thu Thập Cẩm Bát Bửu',
  description: 'Trọng lượng 200g, 2 trứng muối',
  quantity: 500,
  unit: 'Hộp',
  targetPrice: 350000,
  specifications: 'Hạn sử dụng tối thiểu 45 ngày',
  packagingRequirements: 'Hộp giấy mỹ thuật dập nổi',
  needsCustomPackaging: true,
};

const rfqFixture = {
  id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  rfqNumber: 'RFQ-2026-TEST01',
  title: 'Gói thầu Quà tặng Trung Thu Tập đoàn 2026',
  description: 'Cung cấp quà tặng đối tác cấp cao',
  deliveryAddress: 'Tòa nhà Bitexco, Q1, TP. HCM',
  deliveryDateRequired: '2026-09-10',
  budgetRangeMin: 150000000,
  budgetRangeMax: 200000000,
  bidDeadline: '2026-08-30T17:00:00Z',
  status: 'Open',
  items: [rfqItemFixture],
  invitationCount: 3,
  bidCount: 2,
};

const bidsFixture = [
  {
    id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    bidNumber: 'BID-2026-001',
    supplierId: '33333333-3333-4333-8333-333333333333',
    totalPrice: 165000000,
    estimatedDeliveryDays: 7,
    validityDays: 30,
    submittedAt: '2026-08-15T08:00:00Z',
    isExpired: false,
    status: 'Submitted',
    items: [
      {
        rfqItemId: rfqItemFixture.id,
        productName: rfqItemFixture.productName,
        quantity: 500,
        unit: 'Hộp',
        unitPrice: 330000,
        subtotal: 165000000,
        notes: 'Chiết khấu 5% cho đơn thanh toán sớm',
      },
    ],
  },
  {
    id: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
    bidNumber: 'BID-2026-002',
    supplierId: '44444444-4444-4444-8444-444444444444',
    totalPrice: 180000000,
    estimatedDeliveryDays: 10,
    validityDays: 30,
    submittedAt: '2026-08-16T10:00:00Z',
    isExpired: false,
    status: 'Submitted',
    items: [
      {
        rfqItemId: rfqItemFixture.id,
        productName: rfqItemFixture.productName,
        quantity: 500,
        unit: 'Hộp',
        unitPrice: 360000,
        subtotal: 180000000,
        notes: 'Tặng kèm 50 hộp trà Ô Long',
      },
    ],
  },
];

const contractFixture = {
  id: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
  contractNumber: 'HD-2026-TEST01',
  rfqId: rfqFixture.id,
  bidId: bidsFixture[0].id,
  title: rfqFixture.title,
  totalValue: 165000000,
  deliveryDeadline: '2026-09-10',
  status: 'PendingDeposit',
  signedByCustomerAt: '2026-08-20T10:00:00Z',
  signedBySupplierAt: '2026-08-20T11:00:00Z',
};

const paymentFixture = {
  id: 'ffffffff-ffff-4fff-8fff-ffffffffffff',
  contractId: contractFixture.id,
  milestoneId: '99999999-9999-4999-8999-999999999999',
  paymentNumber: 'PAY-20260820-DEP001',
  amount: 49500000, // 30% deposit of 165,000,000
  method: 'VNPay',
  status: 'Pending',
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

test.describe('Module 5: RFQ & Bidding E2E Tests', () => {
  test('Customer loads RFQs, opens creation modal and creates new RFQ', async ({ page }) => {
    let createPayload = null;
    let publishedId = null;

    await setupAuth(page, 'Customer');

    await page.route('**/api/v1/auth/me', (route) => route.fulfill({ json: { status: 200, data: { id: customerId, role: 'Customer' } } }));
    await page.route('**/api/v1/notifications', (route) => route.fulfill({ json: { status: 200, data: { items: [], unreadCount: 0, totalCount: 0 } } }));

    await page.route('**/api/v1/rfqs/mine', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: [rfqFixture] }),
      });
    });

    await page.route('**/api/v1/rfqs', async (route) => {
      if (route.request().method() === 'POST') {
        createPayload = route.request().postDataJSON();
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            data: { ...rfqFixture, id: 'new-rfq-id', rfqNumber: 'RFQ-2026-NEW01', status: 'Draft' },
          }),
        });
      } else {
        await route.fallback();
      }
    });

    await page.route('**/api/v1/rfqs/*/publish', async (route) => {
      publishedId = route.request().url().split('/').slice(-2, -1)[0];
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: { ...rfqFixture, id: publishedId, status: 'Open' },
        }),
      });
    });

    await page.goto('/#so-sanh-bao-gia');
    await expect(page.getByRole('heading', { name: 'Yêu cầu báo giá & đấu thầu' })).toBeVisible();
    await expect(page.getByText('RFQ-2026-TEST01')).toBeVisible();

    await page.getByRole('button', { name: 'Tạo RFQ' }).click();
    await expect(page.getByText('Tạo yêu cầu báo giá')).toBeVisible();

    // Fill form
    await page.getByLabel('Tiêu đề').fill('Gói Bánh Trung Thu Tri Ân Đối Tác VIP');
    await page.getByLabel('Địa chỉ giao').fill('Toà nhà Saigon Centre, 65 Lê Lợi, Q1, TP. HCM');

    // Required delivery date
    await page.getByLabel('Ngày giao').click();
    await page.keyboard.type('2026-09-25');
    await page.keyboard.press('Enter');

    // Bid deadline with showTime
    await page.getByLabel('Hạn nhận báo giá').click();
    await page.keyboard.type('2026-08-30 18:00:00');
    await page.keyboard.press('Enter');

    // Product item 1
    await page.getByLabel('Sản phẩm').fill('Bánh Trung Thu Thập Cẩm Gà Quay');
    await page.getByRole('button', { name: 'Phát hành RFQ' }).click();

    await expect(page.getByText(/Đã phát hành/i)).toBeVisible({ timeout: 5000 });
    expect(createPayload).not.toBeNull();
    expect(publishedId).toBe('new-rfq-id');
  });

  test('Supplier views invited RFQ and submits sealed quotation', async ({ page }) => {
    let submittedBidPayload = null;

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

    await page.route('**/api/v1/rfqs/supplier', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: [rfqFixture] }),
      });
    });

    await page.route(`**/api/v1/rfqs/${rfqFixture.id}`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: rfqFixture }),
      });
    });

    await page.route(`**/api/v1/rfqs/${rfqFixture.id}/bids`, async (route) => {
      submittedBidPayload = route.request().postDataJSON();
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            id: 'new-bid-id',
            bidNumber: 'BID-2026-NEW',
            totalPrice: 175000000,
            status: 'Submitted',
          },
        }),
      });
    });

    await page.goto('/#nha-cung-cap/dau-thau');
    await expect(page.getByRole('heading', { name: 'RFQ được mời & báo giá niêm phong' })).toBeVisible();
    await expect(page.getByText(rfqFixture.rfqNumber)).toBeVisible();

    await page.getByRole('button', { name: /Nộp báo giá/i }).click();
    await expect(page.getByText(`Nộp báo giá · ${rfqFixture.rfqNumber}`)).toBeVisible();

    // Fill unit price for item
    await page.getByLabel('Đơn giá').fill('350000');
    await page.getByLabel('Số ngày giao hàng').fill('7');
    await page.getByLabel('Hiệu lực báo giá').fill('30');
    await page.getByLabel('Cam kết / ưu đãi').fill('Cam kết bao bì in logo chất lượng cao.');

    await page.getByRole('button', { name: /Gửi báo giá niêm phong/i }).click();
    await expect(page.getByText(/Đã nộp báo giá niêm phong/i)).toBeVisible({ timeout: 5000 });

    expect(submittedBidPayload).not.toBeNull();
    expect(submittedBidPayload.items[0].unitPrice).toBe(350000);
    expect(submittedBidPayload.estimatedDeliveryDays).toBe(7);
  });

  test('Customer compares quotations Side-by-Side and awards the winning bid', async ({ page }) => {
    let acceptedBidId = null;

    await setupAuth(page, 'Customer');

    await page.route('**/api/v1/auth/me', (route) => route.fulfill({ json: { status: 200, data: { id: customerId, role: 'Customer' } } }));
    await page.route('**/api/v1/notifications', (route) => route.fulfill({ json: { status: 200, data: { items: [], unreadCount: 0, totalCount: 0 } } }));

    await page.route('**/api/v1/rfqs/mine', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: [rfqFixture] }),
      });
    });

    await page.route(`**/api/v1/rfqs/${rfqFixture.id}/bids`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: bidsFixture }),
      });
    });

    await page.route(`**/api/v1/rfqs/${rfqFixture.id}/bids/*/accept`, async (route) => {
      acceptedBidId = route.request().url().split('/').slice(-2, -1)[0];
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: contractFixture }),
      });
    });

    await page.route('**/api/v1/contracts/mine', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: [contractFixture] }),
      });
    });

    await page.route('**/api/v1/payments/mine', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: [paymentFixture] }),
      });
    });

    await page.goto('/#so-sanh-bao-gia');
    await expect(page.getByText(rfqFixture.rfqNumber)).toBeVisible();

    // Click "So sánh"
    await page.getByRole('button', { name: /So sánh/i }).click();
    await expect(page.getByText(`So sánh báo giá · ${rfqFixture.rfqNumber}`)).toBeVisible();

    // Check that best price is highlighted
    await expect(page.getByText(/Tốt nhất/i)).toBeVisible();
    await expect(page.getByRole('cell', { name: 'BID-2026-001' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'BID-2026-002' })).toBeVisible();

    // Click "Chấp thuận" on best bid
    const acceptButtons = page.getByRole('button', { name: 'Chấp thuận' });
    await acceptButtons.first().click();

    await expect(page.getByText(/Đã chọn thầu/i)).toBeVisible({ timeout: 5000 });
    expect(acceptedBidId).toBe(bidsFixture[0].id);
  });

  test('Customer pays milestone M1 deposit via VNPay Sandbox integration', async ({ page }) => {
    let vnPayRequested = null;

    await setupAuth(page, 'Customer');

    await page.route('**/api/v1/auth/me', (route) => route.fulfill({ json: { status: 200, data: { id: customerId, role: 'Customer' } } }));
    await page.route('**/api/v1/notifications', (route) => route.fulfill({ json: { status: 200, data: { items: [], unreadCount: 0, totalCount: 0 } } }));

    await page.route('**/api/v1/contracts/mine', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: [contractFixture] }),
      });
    });

    await page.route('**/api/v1/payments/mine', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: [paymentFixture] }),
      });
    });

    await page.route('**/api/v1/payments/vnpay/create-url', async (route) => {
      vnPayRequested = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            paymentId: paymentFixture.id,
            paymentNumber: paymentFixture.paymentNumber,
            amount: paymentFixture.amount,
            paymentUrl: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=4950000000&vnp_TmnCode=BFYI47AF&vnp_SecureHash=mockhash123',
          },
        }),
      });
    });

    await page.goto('/#hop-dong-tien-do');
    await expect(page.getByRole('heading', { name: 'Hợp đồng & tiến độ thanh toán' })).toBeVisible();
    await expect(page.getByText(contractFixture.contractNumber)).toBeVisible();
    await expect(page.getByText('Chờ cọc M1')).toBeVisible();

    await page.getByRole('button', { name: /Thanh toán M1/i }).click();
    await expect(page.getByRole('dialog').getByText('Thanh toán tiền cọc M1')).toBeVisible();
    await expect(page.getByText(paymentFixture.paymentNumber)).toBeVisible();

    // Verify VNPay submission
    await page.getByRole('button', { name: /Thanh toán qua VNPay/i }).click();

    await expect.poll(() => vnPayRequested).not.toBeNull();
    expect(vnPayRequested.contractId).toBe(contractFixture.id);
    expect(vnPayRequested.milestoneId).toBe(paymentFixture.milestoneId);
  });
});
