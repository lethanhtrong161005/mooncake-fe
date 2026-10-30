import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

const customerId = '11111111-1111-4111-8111-111111111111';
const adminId = '99999999-9999-4999-8999-999999999999';

async function setupAuth(page, role = 'Customer') {
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

  await page.route('https://cdn.tailwindcss.com/**', (route) => route.fulfill({ body: 'window.tailwind = {};', contentType: 'text/javascript' }));
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.abort());
  await page.route('**/hubs/supplier-verification/negotiate*', (route) => route.fulfill({ status: 503, json: {} }));
  await page.route('**/api/v1/auth/me', async (route) => {
    await route.fulfill({ json: { status: 200, data: user } });
  });
  await page.route('**/api/v1/notifications', async (route) => {
    await route.fulfill({ json: { status: 200, data: { items: [], unreadCount: 0, totalCount: 0 } } });
  });
}

test.describe('Module 10: Order & Contract Payment (Feature #25)', () => {
  test('1. Customer selects Bulk Order and opens Payment Checkout Modal with VNPay Sandbox option', async ({ page }) => {
    await setupAuth(page, 'Customer');

    // Mock orders list API returning a Confirmed order
    await page.route('**/api/v1/orders/mine', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 200,
          data: [
            {
              id: 'ord-test-001',
              orderNumber: 'ORD-20261029-VIP01',
              totalAmount: 18500000,
              packagingFee: 0,
              status: 'Confirmed',
              items: [{ productName: 'Hộp VIP Trăng Vàng B2B', quantity: 50 }],
            },
          ],
        }),
      });
    });

    await page.goto('/#dat-hang-thiet-ke');
    await expect(page.locator('h2')).toContainText('Đặt hàng doanh nghiệp');

    // Switch to "Đơn của tôi" tab
    await page.getByRole('tab', { name: 'Đơn của tôi' }).click();

    // Verify order is listed with "Thanh toán ngay" button
    await expect(page.getByText('ORD-20261029-VIP01')).toBeVisible();
    const payBtn = page.getByRole('button', { name: /Thanh toán ngay/i }).first();
    await expect(payBtn).toBeVisible();
    await payBtn.click();

    // Verify Payment Checkout Dialog opens
    const checkoutDialog = page.getByRole('dialog');
    await expect(checkoutDialog).toBeVisible({ timeout: 10000 });
    await expect(checkoutDialog.getByText(/Cổng Thanh Toán B2B An Toàn/i)).toBeVisible();
    await expect(checkoutDialog.getByText(/18.500.000 VNĐ/i)).toBeVisible();

    // Verify VNPay Sandbox method is present and recommended
    await expect(checkoutDialog.getByText(/Cổng VNPay Sandbox/i)).toBeVisible();
    await expect(checkoutDialog.getByText(/Tức thời • Đề xuất/i)).toBeVisible();

    // Verify COD is disabled due to exceeding 10,000,000 VND limit
    await expect(checkoutDialog.getByText(/Hạn mức COD tối đa 10.000.000 đ/i)).toBeVisible();
  });

  test('2. Customer initiates VietQR Bank Transfer for contract milestone M1 deposit, copies memo, and uploads UNC', async ({ page }) => {
    await setupAuth(page, 'Customer');

    const contractId = 'ctr-test-001';
    const milestoneId = 'mil-test-001';

    // Mock contracts list API
    await page.route('**/api/v1/contracts/mine', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 200,
          data: [
            {
              id: contractId,
              contractNumber: 'HD-2026-TEST01',
              title: 'Hợp đồng Cung cấp Bánh Trung Thu B2B',
              totalValue: 150000000,
              status: 'PendingDeposit',
              depositAmount: 45000000,
              supplierCompanyName: 'Xưởng Bánh Tràng An Nghệ Nhân',
            },
          ],
        }),
      });
    });

    // Mock payments list API
    await page.route('**/api/v1/payments/mine', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 200,
          data: [
            {
              id: 'pay-mil-001',
              contractId,
              milestoneId,
              amount: 45000000,
              status: 'Pending',
              paymentNumber: 'PAY-CTR-20261029-001',
            },
          ],
        }),
      });
    });

    // Mock bank transfer API
    await page.route('**/api/v1/payments/bank-transfer', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 200,
          data: {
            paymentId: 'pay-mil-001',
            paymentNumber: 'PAY-CTR-20261029-001',
            amount: 45000000,
            bankName: 'Ngân hàng Quân Đội (MB Bank)',
            bankBin: '970422',
            accountNumber: '0988668899',
            accountName: 'CONG TY CP NGUYET PHO B2B',
            transferMemo: 'PAY-CTR-20261029-001',
            qrCodeUrl: 'https://img.vietqr.io/image/MB-0988668899-compact.png?amount=45000000&addInfo=PAY-CTR-20261029-001',
            expiresAt: '2026-10-31T12:00:00Z',
          },
        }),
      });
    });

    // Mock evidence upload API
    await page.route('**/api/v1/payments/*/evidence', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 200,
          data: {
            id: 'pay-mil-001',
            evidenceUrl: 'https://storage.mooncake.vn/evidence/unc-45m.pdf',
          },
        }),
      });
    });

    await page.goto('/#hop-dong-tien-do');

    // Click "Thanh toán M1"
    const payDepositBtn = page.getByRole('button', { name: /Thanh toán M1/i }).first();
    await expect(payDepositBtn).toBeVisible();
    await payDepositBtn.click();

    // Verify unified Checkout Dialog opens
    const checkoutDialog = page.getByRole('dialog');
    await expect(checkoutDialog).toBeVisible({ timeout: 10000 });
    await expect(checkoutDialog.getByText(/Cổng Thanh Toán B2B An Toàn/i)).toBeVisible();
    await expect(checkoutDialog.getByText(/45.000.000 VNĐ/i)).toBeVisible();

    // Select VietQR Bank Transfer
    const vietQrOption = checkoutDialog.getByText(/Chuyển khoản VietQR \(MB Bank 24\/7\)/i);
    await expect(vietQrOption).toBeVisible();
    await vietQrOption.click();

    // Click "Tạo mã VietQR"
    const createQrBtn = checkoutDialog.getByRole('button', { name: /Tạo mã VietQR/i });
    await expect(createQrBtn).toBeVisible();
    await createQrBtn.click();

    // Verify VietQR Modal opens
    const vietQrDialog = page.getByRole('dialog');
    await expect(vietQrDialog.getByText(/Chuyển Khoản Ngân Hàng VietQR Napas 247/i)).toBeVisible();
    await expect(vietQrDialog.getByText(/0988668899/i)).toBeVisible();
    await expect(vietQrDialog.getByText(/CONG TY CP NGUYET PHO B2B/i)).toBeVisible();
    await expect(vietQrDialog.getByText(/Thời hạn thanh toán:/i)).toBeVisible();

    // Fill evidence notes and confirm
    const notesInput = vietQrDialog.getByPlaceholder(/Ghi chú thêm về giao dịch/i);
    await expect(notesInput).toBeVisible();
    await notesInput.fill('Doanh nghiệp Vingroup đã chuyển khoản 45 triệu từ Techcombank');

    const finishBtn = vietQrDialog.getByRole('button', { name: /Tôi đã chuyển khoản xong/i });
    await expect(finishBtn).toBeVisible();
    await finishBtn.click();

    // Verify modal closes and feedback toast shown
    await expect(page.getByText(/Đã ghi nhận chứng từ chuyển khoản/i)).toBeVisible({ timeout: 5000 });
  });

  test('3. VNPay Return Callback view (E-Receipt) displays verified status, amounts, bank code, and Escrow guarantee', async ({ page }) => {
    await setupAuth(page, 'Customer');

    // Mock return callback verification API
    await page.route('**/api/v1/payments/vnpay/return-callback*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 200,
          data: {
            paymentNumber: 'PAY-20261029-A78F21B3',
            amount: 45000000,
            isSuccess: true,
            responseCode: '00',
            bankCode: 'NCB',
            transactionNo: '14567890',
            paidAt: '2026-10-29T10:30:00Z',
          },
        }),
      });
    });

    // Navigate to payment result URL with successful return query parameters
    await page.goto('/#thanh-toan/ket-qua?vnp_TxnRef=PAY-20261029-A78F21B3&vnp_Amount=4500000000&vnp_ResponseCode=00&vnp_BankCode=NCB&vnp_TransactionNo=14567890');

    // Verify Success Receipt details
    await expect(page.getByText('Thanh Toán Thành Công!')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/ĐÃ THANH TOÁN/i)).toBeVisible();
    await expect(page.getByText(/45.000.000 VNĐ/i)).toBeVisible();
    await expect(page.getByText('NCB')).toBeVisible();
    await expect(page.getByText('14567890')).toBeVisible();
    await expect(page.getByText(/Bảo chứng Ký quỹ Escrow an toàn/i)).toBeVisible();

    // Verify action buttons
    await expect(page.getByRole('button', { name: /In Biên Lai/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Về Danh Sách Đơn Hàng/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Xem Hợp Đồng & Ký Quỹ/i })).toBeVisible();
  });

  test('4. Admin monitors Escrow Ledger, checks escrow balance metrics, and processes escrow refund', async ({ page }) => {
    await setupAuth(page, 'Admin');

    // Mock escrow summary API
    await page.route('**/api/v1/payments/escrow/summary', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 200,
          data: {
            totalEscrowBalance: 1285000000,
            totalActiveContracts: 24,
            pendingDisbursementAmount: 340000000,
            disputedEscrowAmount: 45000000,
            escrowLedgerItems: [
              {
                contractId: 'ctr-test-001',
                contractNumber: 'HD-2026-TEST01',
                customerName: 'Tập đoàn Vingroup',
                supplierName: 'Xưởng Bánh Tràng An Nghệ Nhân',
                contractTotalValue: 150000000,
                heldEscrowAmount: 45000000,
                paidMilestonesCount: 1,
                totalMilestonesCount: 3,
                escrowStatus: 'Active',
                lastDepositDate: '2026-10-29T10:30:00Z',
              },
            ],
          },
        }),
      });
    });

    // Mock refund API
    await page.route('**/api/v1/payments/*/refund', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 200,
          data: {
            id: 'pay-mil-001',
            status: 'Refunded',
          },
        }),
      });
    });

    // Mock other dashboard endpoints
    await page.route('**/api/v1/reports/**', (route) => route.fulfill({ json: { status: 200, data: {} } }));
    await page.route('**/api/v1/admin/disputes**', (route) => route.fulfill({ json: { status: 200, data: [] } }));

    await page.goto('/#admin/dashboard');

    // Switch to Escrow Tab
    const escrowTab = page.getByRole('tab', { name: /Sổ Giám Sát Ký Quỹ Escrow/i });
    await expect(escrowTab).toBeVisible();
    await escrowTab.click();

    // Verify 4 Escrow summary metrics cards
    await expect(page.getByText(/Số Dư Ký Quỹ Đang Giữ/i)).toBeVisible();
    await expect(page.getByText(/1.285.000.000 ₫/i)).toBeVisible();
    await expect(page.getByText(/Hợp Đồng Bảo Chứng/i)).toBeVisible();
    await expect(page.getByText(/24 HĐ/i)).toBeVisible();
    await expect(page.getByText(/Chờ Nghiệm Thu \/ Giải Ngân/i)).toBeVisible();
    await expect(page.getByText(/340.000.000 ₫/i)).toBeVisible();
    await expect(page.getByText(/Đang Khiếu Nại \/ Đóng Băng/i)).toBeVisible();
    await expect(page.getByText(/45.000.000 ₫/i).first()).toBeVisible();

    // Verify Refund button opens Refund Modal
    const refundBtn = page.getByRole('button', { name: /Hoàn Tiền/i }).first();
    await expect(refundBtn).toBeVisible();
    await refundBtn.click();

    await expect(page.getByText(/Xác nhận hoàn tiền ký quỹ/i)).toBeVisible();
    const reasonInput = page.getByPlaceholder(/Nhập lý do hoàn tiền/i);
    await expect(reasonInput).toBeVisible();
    await reasonInput.fill('Hoàn cọc theo thỏa thuận hủy hợp đồng song phương');

    const confirmRefundBtn = page.getByRole('button', { name: /Xác nhận hoàn tiền/i });
    await expect(confirmRefundBtn).toBeVisible();
    await confirmRefundBtn.click();

    await expect(page.getByText(/Đã hoàn tiền ký quỹ thành công/i)).toBeVisible({ timeout: 5000 });
  });
});
