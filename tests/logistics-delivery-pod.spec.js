import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

const customerId = '11111111-1111-4111-8111-111111111111';
const supplierId = '22222222-2222-4222-8222-222222222222';
const contractId = 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';
const deliveryId = 'dddddddd-dddd-4ddd-8ddd-dddddddddddd';
const proofId = 'pppppppp-pppp-4ppp-8ppp-pppppppppppp';

const mockDeliveryActive = {
  id: deliveryId,
  deliveryNumber: 'DEL-202610-001',
  contractId,
  contractNumber: 'HD-2026-TEST01',
  supplierName: 'Xưởng Bánh Tràng An Nghệ Nhân',
  customerName: 'Tập đoàn Vingroup (Khối Mua Hàng)',
  fromAddress: 'Kho Xưởng Tràng An, Lô B4 Cụm CN Bát Tràng, Gia Lâm, Hà Nội',
  toAddress: 'Tổng kho Vingroup, Cổng số 3, KCN Quang Minh, Mê Linh, Hà Nội',
  recipientName: 'Bác Nguyễn Văn Hùng (Thủ kho)',
  recipientPhone: '0912345678',
  trackingCode: 'TA-TRUCK-889',
  deliveryType: 'SelfArranged',
  status: 'InTransit',
  scheduledDate: '2026-10-30',
  notes: 'Đợt 1: 1.500 hộp sơn mài Trăng Vàng Bích Ngọc.',
  proofCount: 1,
  createdAt: '2026-10-29T08:00:00Z',
};

const mockDeliveryDelivered = {
  ...mockDeliveryActive,
  status: 'Delivered',
  actualDeliveryDate: '2026-10-29',
  proofCount: 2,
};

const mockProof = {
  id: proofId,
  deliveryId,
  proofType: 'Delivery',
  photoUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
  signatureUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Signature_sample.svg',
  takenBy: 'Bác Nguyễn Văn Hùng (Thủ kho)',
  takenAt: '2026-10-29T10:15:00Z',
  locationLat: 21.0168,
  locationLng: 105.7838,
  notes: 'Đã nhận đủ 1.500 hộp nguyên vẹn.',
  tamperProofHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  isVerified: true,
  createdAt: '2026-10-29T10:15:00Z',
};

async function setupAuth(page, role = 'Supplier') {
  const user = {
    id: role === 'Supplier' ? supplierId : customerId,
    fullName: role === 'Supplier' ? 'Xưởng Bánh Tràng An Nghệ Nhân' : 'Tập đoàn Vingroup',
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
}

test.describe('Module 7: Logistics & Delivery Proof of Delivery (PoD)', () => {
  test('Supplier manages deliveries and creates split shipment (Feature #19)', async ({ page }) => {
    let createdPayload = null;

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
    await page.route('**/api/v1/notifications', (route) => route.fulfill({ json: { status: 200, data: { items: [], unreadCount: 0 } } }));

    await page.route('**/api/v1/contracts/mine', (route) => route.fulfill({
      json: {
        status: 200,
        data: [{ id: contractId, contractNumber: 'HD-2026-TEST01', title: 'Hợp đồng B2B Vingroup', status: 'Active' }],
      },
    }));

    await page.route('**/api/v1/deliveries', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          json: { status: 200, data: createdPayload ? [createdPayload, mockDeliveryActive] : [mockDeliveryActive] },
        });
      } else if (route.request().method() === 'POST') {
        const payload = JSON.parse(route.request().postData());
        createdPayload = {
          ...mockDeliveryActive,
          id: 'new-deliv-id',
          deliveryNumber: 'DEL-202610-009',
          recipientName: payload.recipientName,
          status: 'Pending',
        };
        await route.fulfill({ status: 201, json: { status: 201, data: createdPayload } });
      }
    });

    await page.goto('/#nha-cung-cap/quan-ly-giao-hang');
    await expect(page.getByRole('heading', { name: /Quản Lý Vận Chuyển/i })).toBeVisible();
    await expect(page.getByText('DEL-202610-001')).toBeVisible();

    // Click "Tạo Chuyến Giao (Chia Đợt)"
    await page.getByRole('button', { name: 'Tạo Chuyến Giao (Chia Đợt)' }).click();
    await expect(page.getByRole('dialog').getByText('Tạo Chuyến Giao Hàng Mới')).toBeVisible();

    // Select contract
    await page.getByRole('combobox', { name: '* Hợp đồng thực hiện' }).click();
    await page.locator('.ant-select-item-option').first().click();

    // Fill fields
    await page.getByLabel('Địa chỉ nhận hàng (Kho khách hàng)').fill('Kho Chi Nhánh 2, KCN Đình Vũ, Hải Phòng');
    await page.getByLabel('Họ tên người nhận (Thủ kho / Đại diện)').fill('Trần Văn Bình');
    await page.getByLabel('Số điện thoại người nhận').fill('0987654321');
    await page.getByPlaceholder('Chọn ngày giao').fill('2026-10-30');
    await page.getByPlaceholder('Chọn ngày giao').press('Enter');

    // Submit modal
    await page.getByRole('button', { name: 'Xác nhận Tạo Chuyến Giao' }).click();
    await expect(page.getByText('Khởi tạo chuyến giao hàng (Đợt hàng) thành công!')).toBeVisible();
  });

  test('Supplier advances shipment workflow status (Feature #19)', async ({ page }) => {
    let currentStatus = 'PickedUp';

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
    await page.route('**/api/v1/notifications', (route) => route.fulfill({ json: { status: 200, data: { items: [], unreadCount: 0 } } }));
    await page.route('**/api/v1/contracts/mine', (route) => route.fulfill({ json: { status: 200, data: [] } }));

    await page.route('**/api/v1/deliveries', async (route) => {
      await route.fulfill({
        status: 200,
        json: { status: 200, data: [{ ...mockDeliveryActive, status: currentStatus }] },
      });
    });

    await page.route(`**/api/v1/deliveries/${deliveryId}/status`, async (route) => {
      const payload = JSON.parse(route.request().postData());
      currentStatus = payload.status;
      await route.fulfill({
        status: 200,
        json: { status: 200, data: { ...mockDeliveryActive, status: currentStatus } },
      });
    });

    await page.goto('/#nha-cung-cap/quan-ly-giao-hang');
    await expect(page.getByText('DEL-202610-001')).toBeVisible();

    // When PickedUp, button "Xuất bến (In-Transit)" appears
    const transitBtn = page.getByRole('button', { name: 'Xuất bến (In-Transit)' });
    await expect(transitBtn).toBeVisible();
    await transitBtn.click();

    await expect(page.getByText('Đã cập nhật trạng thái chuyến giao sang: Đang vận chuyển')).toBeVisible();
  });

  test('Driver Mobile Web-First View: captures signature, photo, and submits PoD (Feature #20 & Mobile)', async ({ page }) => {
    let proofSubmitted = false;

    await setupAuth(page, 'Supplier');
    await page.route('**/api/v1/auth/me', (route) => route.fulfill({
      json: { status: 200, data: { id: supplierId, role: 'Supplier' } },
    }));

    await page.route(`**/api/v1/deliveries/${deliveryId}`, (route) => route.fulfill({
      status: 200,
      json: { status: 200, data: mockDeliveryActive },
    }));

    await page.route(`**/api/v1/deliveries/${deliveryId}/proofs`, async (route) => {
      proofSubmitted = true;
      await route.fulfill({
        status: 201,
        json: { status: 201, data: mockProof },
      });
    });

    await page.goto(`/#driver-delivery-view?id=${deliveryId}`);

    // Verify Mobile UX Header & Destination Card
    await expect(page.getByText('DEL-202610-001')).toBeVisible();
    await expect(page.getByText('ĐIỂM GIAO HÀNG')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Gọi Ngay' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Chỉ Đường' })).toBeVisible();

    // Verify GPS Coordinates display
    await expect(page.getByText('Tọa độ thực địa:')).toBeVisible();

    // Fill form
    await page.locator('input[placeholder="Nhập họ tên người ký nhận"]').fill('Bác Nguyễn Văn Hùng (Thủ kho)');

    // Simulate Signature drawing on canvas
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    const box = await canvas.boundingBox();
    if (box) {
      await page.mouse.move(box.x + 20, box.y + 20);
      await page.mouse.down();
      await page.mouse.move(box.x + 80, box.y + 60);
      await page.mouse.up();
    }
    await expect(page.getByText('Đã ghi nhận chữ ký')).toBeVisible();

    // Simulate Camera photo upload via file input
    const testImageBuffer = Buffer.from('fake-png-photo-data');
    await page.locator('input[type="file"]').setInputFiles({
      name: 'dock_photo.png',
      mimeType: 'image/png',
      buffer: testImageBuffer,
    });
    await expect(page.getByText('Đã chụp')).toBeVisible();

    // Submit Proof of Delivery
    const submitBtn = page.getByRole('button', { name: 'XÁC NHẬN BÀN GIAO & NỘP PoD' });
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    await expect(page.getByText('Bàn giao thành công!')).toBeVisible();
    expect(proofSubmitted).toBe(true);
  });

  test('Customer views delivery list and inspects PoD with SHA-256 and GPS (Feature #20)', async ({ page }) => {
    await setupAuth(page, 'Customer');
    await page.route('**/api/v1/auth/me', (route) => route.fulfill({
      json: { status: 200, data: { id: customerId, role: 'Customer' } },
    }));
    await page.route('**/api/v1/notifications', (route) => route.fulfill({ json: { status: 200, data: { items: [], unreadCount: 0 } } }));

    await page.route('**/api/v1/deliveries', (route) => route.fulfill({
      status: 200,
      json: { status: 200, data: [mockDeliveryDelivered] },
    }));

    await page.route(`**/api/v1/deliveries/${deliveryId}/proofs`, (route) => route.fulfill({
      status: 200,
      json: { status: 200, data: [mockProof] },
    }));

    await page.goto('/#giao-hang-pod');
    await expect(page.getByRole('heading', { name: /Theo Dõi Giao Nhận & Xác Minh Bằng Chứng PoD/i })).toBeVisible();
    await expect(page.getByText('DEL-202610-001')).toBeVisible();
    await expect(page.getByText('Đã bàn giao (PoD)')).toBeVisible();

    // Click "Xem PoD"
    await page.getByRole('button', { name: 'Xem PoD' }).first().click();

    // Verify PoDViewerModal contents
    await expect(page.getByRole('dialog').getByText('Bằng Chứng Giao Nhận Điện Tử (PoD)')).toBeVisible();
    await expect(page.getByRole('dialog').getByText('Toàn vẹn SHA-256')).toBeVisible();
    await expect(page.getByRole('dialog').getByText('Bàn giao thành công')).toBeVisible();
    await expect(page.getByRole('dialog').getByText('Bác Nguyễn Văn Hùng (Thủ kho)').first()).toBeVisible();
    await expect(page.getByRole('dialog').getByText('21.0168, 105.7838 (Xem Maps)')).toBeVisible();
    await expect(page.getByRole('dialog').getByText('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')).toBeVisible();

    // Close modal
    await page.getByRole('button', { name: 'Đóng' }).click();
  });
});
