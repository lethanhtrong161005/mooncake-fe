import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

const categoryFixture = [
  { id: '11111111-2222-3333-4444-555555555551', name: 'Bánh nướng truyền thống', slug: 'banh-nuong' },
  { id: '11111111-2222-3333-4444-555555555552', name: 'Bánh dẻo cao cấp', slug: 'banh-deo' },
  { id: '11111111-2222-3333-4444-555555555553', name: 'Hộp quà doanh nghiệp VIP', slug: 'hop-qua-vip' },
];

const productDetailFixture = {
  id: '77777777-7777-4777-8777-777777777777',
  name: 'Bánh Trung Thu Hoàng Kim B2B',
  description: 'Dòng sản phẩm cao cấp dành cho quà tặng doanh nghiệp.',
  ingredients: 'Hạt sen Huế, trứng muối thượng hạng, vi cá, bột mì hữu cơ.',
  basePrice: 150000,
  minOrderQty: 20,
  maxOrderQty: 5000,
  unit: 'box',
  supportsCustomPackaging: true,
  status: 'Active',
  version: 1,
  category: {
    id: '11111111-2222-3333-4444-555555555551',
    name: 'Bánh nướng truyền thống',
  },
  shop: {
    id: '88888888-8888-4888-8888-888888888888',
    name: 'Xưởng Bánh Hoàng Triều',
    slug: 'hoang-trieu',
    reputationScore: 4.9,
  },
  images: [
    {
      id: '99999999-9999-4999-8999-999999999991',
      mediaAssetId: '99999999-9999-4999-8999-999999999991',
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
      isPrimary: true,
      sortOrder: 0,
    },
  ],
  variants: [
    {
      id: 'aaaa1111-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      name: 'Thập cẩm jambon bát bửu (200g)',
      sku: 'SKU-TC-200',
      price: 150000,
      priceAdjustment: 0,
      stockQty: 250,
      isAvailable: true,
    },
    {
      id: 'aaaa2222-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      name: 'Hạt sen trứng muối 2 trứng (250g)',
      sku: 'SKU-HS-250',
      price: 180000,
      priceAdjustment: 30000,
      stockQty: 100,
      isAvailable: true,
    },
    {
      id: 'aaaa3333-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      name: 'Bào ngư vi cá thượng hạng (300g)',
      sku: 'SKU-BN-300',
      price: 250000,
      priceAdjustment: 100000,
      stockQty: 0,
      isAvailable: false,
    },
  ],
};

const supplierProductListFixture = {
  items: [
    {
      productId: '77777777-7777-4777-8777-777777777777',
      name: 'Bánh Trung Thu Hoàng Kim B2B',
      primaryImageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100',
      minPrice: 150000,
      maxPrice: 250000,
      variantCount: 3,
      totalStockQty: 350,
      effectiveStatus: 'Active',
      version: 1,
      updatedAtUtc: new Date().toISOString(),
    },
    {
      productId: '88888888-7777-4777-8777-888888888888',
      name: 'Hộp Quà Thượng Uyển 4 Bánh',
      primaryImageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100',
      minPrice: 650000,
      maxPrice: 850000,
      variantCount: 1,
      totalStockQty: 50,
      effectiveStatus: 'Inactive',
      version: 2,
      updatedAtUtc: new Date().toISOString(),
    },
  ],
  totalCount: 2,
};

async function setupSession(page, { role = 'Customer' } = {}) {
  const user = {
    id: '33333333-3333-4333-8333-333333333333',
    fullName: role === 'Supplier' ? 'Chủ Xưởng Hoàng Triều' : 'Công ty Thu Mua B2B',
    role,
    capabilities: {
      canCreateShop: role === 'Supplier',
      canReadSupplierVerification: role === 'Supplier',
    },
    supplierVerification: {
      verificationStatus: role === 'Supplier' ? 'Verified' : null,
    },
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

  const state = {
    products: [...supplierProductListFixture.items],
    viewRecorded: false,
    publicationPayload: null,
    removedProductId: null,
  };

  await page.route('**/api/v1/**', async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    const path = url.pathname.replace(/^.*\/api\/v1/, '');
    const ok = (data, status = 200) => route.fulfill({ status, json: { status, data } });

    if (path === '/auth/me') return ok(user);
    if (path === '/notifications') return ok({ items: [], unreadCount: 0, totalCount: 0 });

    // Public Categories & Regions
    if (path === '/categories') return ok(categoryFixture);
    if (path === '/regions') return ok([{ code: 'VN-SG', name: 'TP. Hồ Chí Minh' }]);

    // Public Product Search
    if (path === '/products' && req.method() === 'GET') {
      const q = url.searchParams.get('q');
      const items = q
        ? [productDetailFixture].filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
        : [productDetailFixture];
      return ok({
        items: items.map((p) => ({
          id: p.id,
          name: p.name,
          basePrice: p.basePrice,
          minOrderQty: p.minOrderQty,
          supportsCustomPackaging: p.supportsCustomPackaging,
          shop: p.shop,
          primaryImageUrl: p.images[0]?.imageUrl,
        })),
        totalCount: items.length,
        facets: {
          categories: categoryFixture.map((c) => ({ value: c.id, label: c.name, count: 1 })),
          minPrice: 100000,
          maxPrice: 300000,
        },
      });
    }

    // Public Product Details
    if (path === `/products/${productDetailFixture.id}` && req.method() === 'GET') {
      return ok(productDetailFixture);
    }

    // Record Product View
    if (path === `/products/${productDetailFixture.id}/views` && req.method() === 'POST') {
      state.viewRecorded = true;
      return ok({ success: true });
    }

    // Supplier Mine Products
    if (path === '/suppliers/me/products' && req.method() === 'GET') {
      return ok({ items: state.products, totalCount: state.products.length });
    }

    if (path === `/suppliers/me/products/${productDetailFixture.id}` && req.method() === 'GET') {
      return ok(productDetailFixture);
    }

    // Publication toggle
    if (path === `/suppliers/me/products/${productDetailFixture.id}/publication` && req.method() === 'PATCH') {
      state.publicationPayload = req.postDataJSON();
      const item = state.products.find((p) => p.productId === productDetailFixture.id);
      if (item) {
        item.effectiveStatus = state.publicationPayload.isPublished ? 'Active' : 'Inactive';
        item.version += 1;
      }
      return ok({ success: true, version: 2 });
    }

    // Remove product
    if (path.startsWith('/suppliers/me/products/') && req.method() === 'DELETE') {
      const productId = path.split('/')[4];
      state.removedProductId = productId;
      state.products = state.products.filter((p) => p.productId !== productId);
      return ok({ success: true });
    }

    return route.continue();
  });

  return state;
}

test.describe('Module 3: Sản phẩm & Danh mục B2B (Features #5 & #6)', () => {
  test('Khách hàng tìm kiếm sản phẩm và lọc theo từ khóa trên SearchPage', async ({ page }) => {
    await setupSession(page, { role: 'Customer' });
    await page.goto('/#tim-kiem');

    await expect(page.locator('h2')).toContainText('Khám phá catalog B2B');
    await expect(page.locator('text=Bánh nướng truyền thống')).toBeVisible();

    // Type query
    const searchInput = page.locator('input[placeholder="Tìm theo tên sản phẩm hoặc gian hàng"]');
    await searchInput.fill('Hoàng Kim');
    await page.keyboard.press('Enter');

    // Should display matched product
    await expect(page.locator('text=Bánh Trung Thu Hoàng Kim B2B')).toBeVisible();
    await expect(page.locator('text=Xưởng Bánh Hoàng Triều')).toBeVisible();
  });

  test('Khách hàng xem chi tiết sản phẩm, chọn biến thể và khởi tạo giỏ đặt hàng B2B', async ({ page }) => {
    const state = await setupSession(page, { role: 'Customer' });
    await page.goto(`/#san-pham/${productDetailFixture.id}`);

    // Verify Title and Shop Information
    await expect(page.locator('h1')).toContainText('Bánh Trung Thu Hoàng Kim B2B');
    await expect(page.locator('text=Xưởng Bánh Hoàng Triều')).toBeVisible();
    await expect(page.locator('text=Hạt sen Huế, trứng muối thượng hạng')).toBeVisible();

    // Verify Variants radio group
    await expect(page.locator('text=Thập cẩm jambon bát bửu (200g)')).toBeVisible();
    await expect(page.locator('text=Hạt sen trứng muối 2 trứng (250g)')).toBeVisible();
    await expect(page.locator('text=Hết hàng')).toBeVisible(); // 3rd variant is out of stock

    // Select variant 2 and check price update
    await page.locator('text=Hạt sen trứng muối 2 trứng (250g)').click();
    await expect(page.locator('h3:has-text("180.000 đ")')).toBeVisible();

    // Click Order button
    const orderButton = page.locator('button:has-text("Đặt hàng doanh nghiệp")');
    await expect(orderButton).toBeEnabled();
    await orderButton.click();

    // Verify Draft saved in sessionStorage and navigation triggered
    await expect(page).toHaveURL(/.*#dat-hang-thiet-ke/);
    const draft = await page.evaluate(() => JSON.parse(sessionStorage.getItem('b2b_order_draft')));
    expect(draft.productId).toBe(productDetailFixture.id);
    expect(draft.variantId).toBe('aaaa2222-aaaa-4aaa-8aaa-aaaaaaaaaaaa');
    expect(draft.quantity).toBe(20);
  });

  test('Nhà cung cấp quản lý danh sách sản phẩm, bật/tắt đăng bán và xóa sản phẩm', async ({ page }) => {
    const state = await setupSession(page, { role: 'Supplier' });
    await page.goto('/#nha-cung-cap/quan-ly-san-pham');

    await expect(page.getByRole('heading', { name: 'Sản phẩm và biến thể' })).toBeVisible();
    await expect(page.locator('text=Bánh Trung Thu Hoàng Kim B2B')).toBeVisible();
    await expect(page.locator('text=Hộp Quà Thượng Uyển 4 Bánh')).toBeVisible();

    // Verify publication toggle
    const hideButton = page.locator('button:has-text("Ẩn")').first();
    await hideButton.click();
    await expect(page.locator('text=Sản phẩm đã được ẩn khỏi catalog.')).toBeVisible();

    // Verify delete action with popconfirm
    const deleteButton = page.locator('tr:has-text("Hộp Quà Thượng Uyển") button.ant-btn-dangerous');
    await deleteButton.click();
    await page.locator('.ant-popover button:has-text("OK")').click();

    await expect(page.locator('text=Đã xoá sản phẩm.')).toBeVisible();
    expect(state.removedProductId).toBe('88888888-7777-4777-8777-888888888888');
  });

  test('Hiển thị thông báo khi sản phẩm không tồn tại hoặc bị ẩn', async ({ page }) => {
    await setupSession(page, { role: 'Customer' });
    await page.goto('/#san-pham/00000000-0000-0000-0000-000000000000');

    await expect(page.locator('text=Sản phẩm không tồn tại hoặc chưa được xuất bản')).toBeVisible();
  });
});

