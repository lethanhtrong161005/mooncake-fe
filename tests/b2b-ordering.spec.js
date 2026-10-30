import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

const productFixture = {
  id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  name: 'Bánh Trung Thu Hoàng Kim',
  basePrice: 120000,
  minOrderQty: 50,
  maxOrderQty: 1000,
  supportsCustomPackaging: true,
  status: 'Active',
  shop: {
    id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    name: 'Xưởng Bánh Hoàng Triều',
    slug: 'hoang-trieu',
  },
  variants: [
    {
      id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      name: 'Thập cẩm gà quay 2 trứng (200g)',
      sku: 'SKU-TC-200',
      priceAdjustment: 10000,
      stockQty: 500,
      isAvailable: true,
    },
  ],
};

const quoteFixture = {
  subtotal: 13000000,
  totalDiscount: 1300000,
  finalTotal: 11700000,
  effectiveDiscountRate: 10,
  lineBreakdown: [
    {
      productId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      variantId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      quantity: 100,
      originalUnitPrice: 130000,
      discountedUnitPrice: 117000,
      lineSubtotal: 13000000,
      lineDiscount: 1300000,
      lineTotal: 11700000,
      appliedPromotion: {
        id: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
        name: 'Chiết khấu doanh nghiệp 10%',
        discountType: 'Percentage',
        discountValue: 10,
      },
    },
  ],
};

const orderFixture = {
  id: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
  orderNumber: 'MC-20261029-TEST01',
  customerId: '33333333-3333-4333-8333-333333333333',
  shopId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  status: 'Pending',
  subtotal: 13000000,
  discountAmount: 1300000,
  taxAmount: 0,
  shippingFee: 0,
  totalAmount: 11700000,
  deliveryAddress: 'Tòa nhà Landmark 81, TP. HCM',
  recipientName: 'Nguyễn Văn Doanh Nghiệp',
  recipientPhone: '0901234567',
  deliveryDateExpected: '2026-09-15',
  notes: 'Giao giờ hành chính',
  createdAtUtc: new Date().toISOString(),
  items: [
    {
      productId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      variantId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      productName: 'Bánh Trung Thu Hoàng Kim',
      variantName: 'Thập cẩm gà quay 2 trứng (200g)',
      sku: 'SKU-TC-200',
      quantity: 100,
      unitPrice: 130000,
      discountAmount: 1300000,
      subtotal: 11700000,
    },
  ],
  customPackaging: {
    id: 'ffffffff-ffff-4fff-8fff-ffffffffffff',
    companyName: 'Công ty Công nghệ Việt',
    companyLogoUrl: 'https://example.com/logo.svg',
    packagingType: 'lacquer-4',
    status: 'Pending',
    revisionsCount: 0,
  },
};

const packagingFixture = {
  id: 'ffffffff-ffff-4fff-8fff-ffffffffffff',
  orderId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
  companyName: 'Công ty Công nghệ Việt',
  companyLogoUrl: 'https://example.com/logo.svg',
  packagingType: 'lacquer-4',
  specialMessage: 'Kính chúc vạn sự như ý',
  status: 'Pending',
  revisions: [],
};

async function setupAuth(page, role = 'Customer') {
  const user = {
    id: '33333333-3333-4333-8333-333333333333',
    fullName: role === 'Customer' ? 'Khách hàng B2B Test' : 'Chủ Xưởng Bánh Test',
    role,
    capabilities: {
      canCreateShop: role === 'Supplier',
      canReadSupplierVerification: role === 'Supplier',
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

test.describe('Module 4: B2B Ordering & Custom Packaging E2E', () => {
  test('Customer sees empty state without preselected product and can view existing orders', async ({ page }) => {
    await setupAuth(page, 'Customer');

    await page.route('**/api/v1/**', async (route) => {
      const url = new URL(route.request().url());
      const path = url.pathname.replace(/^.*\/api\/v1/, '');
      if (path === '/auth/me') return route.fulfill({ json: { status: 200, data: { id: '33333333-3333-4333-8333-333333333333', role: 'Customer' } } });
      if (path === '/notifications') return route.fulfill({ json: { status: 200, data: { items: [], unreadCount: 0, totalCount: 0 } } });
      if (path === '/orders/mine') return route.fulfill({ json: { status: 200, data: [orderFixture] } });
      return route.continue();
    });

    await page.goto('/#dat-hang-thiet-ke');
    await expect(page.locator('h2')).toContainText('Đặt hàng doanh nghiệp');
    await expect(page.locator('.ant-result-title')).toContainText('Chưa có sản phẩm để đặt');

    // Switch to order tracking tab
    await page.getByRole('tab', { name: 'Đơn của tôi' }).click();
    await expect(page.locator('text=MC-20261029-TEST01')).toBeVisible();
    await expect(page.locator('text=11.700.000 ₫')).toBeVisible();
  });

  test('Customer with draft product calculates tiered pricing quote and places bulk order', async ({ page }) => {
    await setupAuth(page, 'Customer');

    await page.addInitScript((draft) => {
      sessionStorage.setItem('b2b_order_draft', JSON.stringify(draft));
    }, {
      productId: productFixture.id,
      variantId: productFixture.variants[0].id,
      quantity: 100,
    });

    let quoteRequested = false;
    let orderCreated = false;

    await page.route('**/api/v1/**', async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = url.pathname.replace(/^.*\/api\/v1/, '');

      if (path === '/auth/me') return route.fulfill({ json: { status: 200, data: { id: '33333333-3333-4333-8333-333333333333', role: 'Customer' } } });
      if (path === '/notifications') return route.fulfill({ json: { status: 200, data: { items: [], unreadCount: 0, totalCount: 0 } } });
      if (path === `/products/${productFixture.id}`) return route.fulfill({ json: { status: 200, data: productFixture } });
      if (path === '/orders/quote-preview') {
        quoteRequested = true;
        return route.fulfill({ json: { status: 200, data: quoteFixture } });
      }
      if (path === '/orders' && request.method() === 'POST') {
        orderCreated = true;
        return route.fulfill({ status: 201, json: { status: 201, data: orderFixture } });
      }
      if (path === `/orders/${orderFixture.id}/custom-packaging` && request.method() === 'POST') {
        return route.fulfill({ status: 201, json: { status: 201, data: packagingFixture } });
      }
      if (path === '/orders/mine') return route.fulfill({ json: { status: 200, data: [orderFixture] } });
      return route.continue();
    });

    await page.goto('/#dat-hang-thiet-ke');
    await expect(page.locator('text=Bánh Trung Thu Hoàng Kim')).toBeVisible();
    await expect(page.locator('text=Chiết khấu doanh nghiệp 10%')).toBeVisible();
    await expect(page.locator('text=11.700.000 ₫')).toBeVisible();
    expect(quoteRequested).toBeTruthy();

    // Fill delivery form
    await page.fill('#deliveryAddress', 'Tòa nhà Landmark 81, TP. HCM');
    await page.fill('#recipientName', 'Nguyễn Văn Doanh Nghiệp');
    await page.fill('#recipientPhone', '0901234567');

    // Fill custom packaging form fields
    await page.fill('#companyName', 'Công ty Công nghệ Việt');
    await page.fill('#companyLogoUrl', 'https://example.com/logo.svg');

    await page.getByRole('button', { name: /Gửi đơn đặt hàng/i }).click();
    await expect(page.locator('.ant-message-success')).toContainText('MC-20261029-TEST01');
    expect(orderCreated).toBeTruthy();
  });

  test('Supplier manages orders, reviews packaging, and confirms order', async ({ page }) => {
    await setupAuth(page, 'Supplier');

    let orderConfirmed = false;

    await page.route('**/api/v1/**', async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = url.pathname.replace(/^.*\/api\/v1/, '');

      if (path === '/auth/me') {
        return route.fulfill({
          json: {
            status: 200,
            data: {
              id: '33333333-3333-4333-8333-333333333333',
              role: 'Supplier',
              capabilities: { canCreateShop: true, canReadSupplierVerification: true },
              supplierVerification: { verificationStatus: 'Verified' },
            },
          },
        });
      }
      if (path === '/notifications') return route.fulfill({ json: { status: 200, data: { items: [], unreadCount: 0, totalCount: 0 } } });
      if (path === '/orders/supplier') return route.fulfill({ json: { status: 200, data: [orderFixture] } });
      if (path === `/orders/${orderFixture.id}/confirm` && request.method() === 'POST') {
        orderConfirmed = true;
        return route.fulfill({ status: 200, json: { status: 200, data: { ...orderFixture, status: 'Confirmed' } } });
      }
      if (path === `/orders/${orderFixture.id}/custom-packaging`) {
        return route.fulfill({ json: { status: 200, data: packagingFixture } });
      }
      return route.continue();
    });

    await page.goto('/#nha-cung-cap/quan-ly-don-hang');
    await expect(page.locator('text=MC-20261029-TEST01')).toBeVisible();
    await expect(page.locator('text=11.700.000 ₫')).toBeVisible();

    // Confirm order
    await page.getByRole('button', { name: /^Xác nhận$/i }).click();
    await expect(page.locator('.ant-message-success')).toContainText('Đã xác nhận đơn hàng');
    expect(orderConfirmed).toBeTruthy();
  });
});
