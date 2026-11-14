import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

const categoryFixture = [
  {
    id: '11111111-2222-3333-4444-555555555551',
    name: 'Bánh nướng truyền thống',
    slug: 'banh-nuong',
  },
  { id: '11111111-2222-3333-4444-555555555552', name: 'Bánh dẻo cao cấp', slug: 'banh-deo' },
  {
    id: '11111111-2222-3333-4444-555555555553',
    name: 'Hộp quà doanh nghiệp VIP',
    slug: 'hop-qua-vip',
  },
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
      categoryId: '11111111-2222-3333-4444-555555555551',
      skus: ['SKU-TC-200', 'SKU-HS-250'],
      primaryImageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100',
      minPrice: 150000,
      maxPrice: 250000,
      variantCount: 3,
      totalStockQty: 350,
      effectiveStatus: 'Active',
      version: 1,
      createdAtUtc: '2026-10-01T08:00:00Z',
      updatedAtUtc: new Date().toISOString(),
    },
    {
      productId: '88888888-7777-4777-8777-888888888888',
      name: 'Hộp Quà Thượng Uyển 4 Bánh',
      categoryId: '11111111-2222-3333-4444-555555555553',
      skus: ['SKU-TU-004'],
      primaryImageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100',
      minPrice: 650000,
      maxPrice: 850000,
      variantCount: 1,
      totalStockQty: 50,
      effectiveStatus: 'Inactive',
      version: 2,
      createdAtUtc: '2026-10-02T08:00:00Z',
      updatedAtUtc: new Date().toISOString(),
    },
  ],
  totalCount: 2,
};

function createPaginatedSupplierProducts() {
  const baseTime = Date.UTC(2026, 9, 20, 12, 0, 0);
  const items = [
    {
      productId: '10000000-0000-4000-8000-000000000001',
      name: 'Set Quà Long Phụng Cát Tường VIP',
      categoryId: '11111111-2222-3333-4444-555555555553',
      skus: ['SKU-LP-VIP'],
      primaryImageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100',
      minPrice: 1250000,
      maxPrice: 1650000,
      variantCount: 2,
      totalStockQty: 180,
      effectiveStatus: 'Active',
      version: 1,
      createdAtUtc: new Date(baseTime + 13 * 3600_000).toISOString(),
      updatedAtUtc: new Date(baseTime + 13 * 3600_000).toISOString(),
    },
    {
      productId: '10000000-0000-4000-8000-000000000002',
      name: 'Bánh Nướng Thập Cẩm Gà Quay Yến Sào',
      categoryId: '11111111-2222-3333-4444-555555555551',
      skus: ['SKU-TC-YS'],
      primaryImageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100',
      minPrice: 220000,
      maxPrice: 340000,
      variantCount: 3,
      totalStockQty: 0,
      effectiveStatus: 'OutOfStock',
      version: 2,
      createdAtUtc: new Date(baseTime + 12 * 3600_000).toISOString(),
      updatedAtUtc: new Date(baseTime + 12 * 3600_000).toISOString(),
    },
    {
      productId: '10000000-0000-4000-8000-000000000003',
      name: 'Bánh Dẻo Hoa Nhài Trứng Chảy',
      categoryId: '11111111-2222-3333-4444-555555555552',
      skus: ['SKU-BD-HN03'],
      primaryImageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100',
      minPrice: 145000,
      maxPrice: 195000,
      variantCount: 2,
      totalStockQty: 12,
      effectiveStatus: 'Active',
      version: 1,
      createdAtUtc: new Date(baseTime + 11 * 3600_000).toISOString(),
      updatedAtUtc: new Date(baseTime + 11 * 3600_000).toISOString(),
    },
  ];

  for (let i = 4; i <= 13; i += 1) {
    const padded = String(i).padStart(2, '0');
    items.push({
      productId: `10000000-0000-4000-8000-0000000000${padded}`,
      name: `Hộp Bánh Nghệ Nhân Số ${padded}`,
      categoryId:
        i % 3 === 0
          ? '11111111-2222-3333-4444-555555555553'
          : i % 2 === 0
            ? '11111111-2222-3333-4444-555555555552'
            : '11111111-2222-3333-4444-555555555551',
      skus: [`SKU-NN-${padded}`],
      primaryImageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100',
      minPrice: 180000 + i * 10000,
      maxPrice: 280000 + i * 10000,
      variantCount: (i % 3) + 1,
      totalStockQty: i * 15,
      effectiveStatus: i === 12 ? 'Inactive' : 'Active',
      version: 1,
      createdAtUtc: new Date(baseTime + (14 - i) * 3600_000).toISOString(),
      updatedAtUtc: new Date(baseTime + (14 - i) * 3600_000).toISOString(),
    });
  }

  return items;
}

async function setupSession(page, { role = 'Customer', products } = {}) {
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

  await page.addInitScript(
    ({ user, token }) => {
      localStorage.setItem('mooncake_auth_user', JSON.stringify(user));
      localStorage.setItem('mooncake_auth_token', JSON.stringify(token));
      localStorage.setItem('mooncake_auth_refresh_token', JSON.stringify('test-refresh'));
    },
    {
      user,
      token: `test.${Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url')}.test`,
    }
  );

  await page.route('https://cdn.tailwindcss.com/**', (route) =>
    route.fulfill({ body: 'window.tailwind = {};', contentType: 'text/javascript' })
  );
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.abort());
  await page.route('**/hubs/supplier-verification/negotiate*', (route) =>
    route.fulfill({ status: 503, json: {} })
  );

  const state = {
    products: products ? [...products] : [...supplierProductListFixture.items],
    supplierProductQueries: [],
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
      const q = (url.searchParams.get('q') || '').trim();
      const categoryId = url.searchParams.get('categoryId') || '';
      const status = url.searchParams.get('status') || '';
      const sort = url.searchParams.get('sort') || 'updatedAtDesc';
      const pageNum = Math.max(1, Number(url.searchParams.get('page') || 1));
      const pageSize = Math.max(1, Number(url.searchParams.get('pageSize') || 10));

      state.supplierProductQueries.push({
        q,
        categoryId,
        status,
        sort,
        page: pageNum,
        pageSize,
      });

      let filtered = [...state.products];
      if (q) {
        const needle = q.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.name.toLowerCase().includes(needle) ||
            (Array.isArray(item.skus) &&
              item.skus.some((sku) => sku.toLowerCase().includes(needle)))
        );
      }
      if (categoryId) {
        filtered = filtered.filter((item) => item.categoryId === categoryId);
      }
      if (status) {
        filtered = filtered.filter((item) => item.effectiveStatus === status);
      }

      filtered.sort((a, b) => {
        if (sort === 'nameAsc') return a.name.localeCompare(b.name, 'vi');
        if (sort === 'stockAsc') return a.totalStockQty - b.totalStockQty;
        if (sort === 'createdAtDesc') {
          return new Date(b.createdAtUtc || 0) - new Date(a.createdAtUtc || 0);
        }
        return new Date(b.updatedAtUtc || 0) - new Date(a.updatedAtUtc || 0);
      });

      const startIndex = (pageNum - 1) * pageSize;
      const sliced = filtered.slice(startIndex, startIndex + pageSize);
      return ok({ items: sliced, totalCount: filtered.length });
    }

    if (path === `/suppliers/me/products/${productDetailFixture.id}` && req.method() === 'GET') {
      return ok(productDetailFixture);
    }

    // Publication toggle
    if (
      path === `/suppliers/me/products/${productDetailFixture.id}/publication` &&
      req.method() === 'PATCH'
    ) {
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
    await page.goto('/tim-kiem');

    await expect(page.getByRole('heading', { name: 'Chọn món quà đúng ý.' })).toBeVisible();
    await expect(page.locator('text=Bánh nướng truyền thống')).toBeVisible();

    // Type query
    const searchInput = page.locator('input[placeholder="Tên bánh, hộp quà hoặc gian hàng"]');
    await searchInput.fill('Hoàng Kim');
    await page.keyboard.press('Enter');

    // Should display matched product
    await expect(page.locator('text=Bánh Trung Thu Hoàng Kim B2B')).toBeVisible();
    await expect(page.locator('text=Xưởng Bánh Hoàng Triều')).toBeVisible();
  });

  test('Khách hàng xem chi tiết sản phẩm, chọn biến thể và khởi tạo giỏ đặt hàng B2B', async ({
    page,
  }) => {
    await setupSession(page, { role: 'Customer' });
    await page.goto(`/san-pham/${productDetailFixture.id}`);

    // Verify Title and Shop Information
    await expect(page.locator('h1')).toContainText('Bánh Trung Thu Hoàng Kim B2B');
    await expect(page.locator('text=Xưởng Bánh Hoàng Triều')).toBeVisible();
    await page.getByRole('tab', { name: /Thành phần/ }).click();
    await expect(page.getByText(/Hạt sen Huế, trứng muối thượng hạng/)).toBeVisible();

    // Verify Variants radio group
    await expect(page.locator('text=Thập cẩm jambon bát bửu (200g)')).toBeVisible();
    await expect(page.locator('text=Hạt sen trứng muối 2 trứng (250g)')).toBeVisible();
    await expect(page.getByText('Tạm hết', { exact: true })).toBeVisible(); // 3rd variant is out of stock

    // Select variant 2 and check price update
    await page.locator('text=Hạt sen trứng muối 2 trứng (250g)').click();
    await expect(page.getByTestId('product-detail-unit-price')).toHaveText('180.000 ₫');

    // Click Order button
    const orderButton = page.locator('button:has-text("Đặt hàng doanh nghiệp")');
    await expect(orderButton).toBeEnabled();
    await orderButton.click();

    // Verify Draft saved in sessionStorage and navigation triggered
    await expect(page).toHaveURL(/.*\/dat-hang-thiet-ke/);
    const draft = await page.evaluate(() => JSON.parse(sessionStorage.getItem('b2b_order_draft')));
    expect(draft.productId).toBe(productDetailFixture.id);
    expect(draft.variantId).toBe('aaaa2222-aaaa-4aaa-8aaa-aaaaaaaaaaaa');
    expect(draft.quantity).toBe(20);
  });

  test('Từ sản phẩm mở đúng gian hàng công khai của nhà cung cấp', async ({ page }) => {
    await setupSession(page, { role: 'Customer' });
    await page.goto(`/san-pham/${productDetailFixture.id}`);

    await page.getByRole('button', { name: /Xem gian hàng/ }).click();
    await expect(page).toHaveURL(/\/shop\/hoang-trieu$/);
  });

  test('Nhà cung cấp quản lý danh sách sản phẩm, bật/tắt đăng bán và xóa sản phẩm', async ({
    page,
  }) => {
    const state = await setupSession(page, { role: 'Supplier' });
    await page.goto('/nha-cung-cap/quan-ly-san-pham');

    await expect(page.getByRole('heading', { name: 'Sản phẩm và biến thể' })).toBeVisible();
    await expect(page.locator('text=Bánh Trung Thu Hoàng Kim B2B')).toBeVisible();
    await expect(page.locator('text=Hộp Quà Thượng Uyển 4 Bánh')).toBeVisible();

    // Verify publication toggle
    const hideButton = page.locator('button:has-text("Ẩn")').first();
    await hideButton.click();
    await expect(page.locator('text=Sản phẩm đã được ẩn khỏi catalog.')).toBeVisible();

    // Verify delete action with popconfirm
    const deleteButton = page.locator(
      'tr:has-text("Hộp Quà Thượng Uyển") button.ant-btn-dangerous'
    );
    await deleteButton.click();
    await page.locator('.ant-popover button:has-text("OK")').click();

    await expect(page.locator('text=Đã xoá sản phẩm.')).toBeVisible();
    expect(state.removedProductId).toBe('88888888-7777-4777-8777-888888888888');
  });

  test('Nhà cung cấp phân trang cố định 10 sản phẩm mỗi trang và không cho chỉnh pageSize', async ({
    page,
  }) => {
    const paginatedProducts = createPaginatedSupplierProducts();
    const state = await setupSession(page, { role: 'Supplier', products: paginatedProducts });
    await page.goto('/nha-cung-cap/quan-ly-san-pham');

    await expect(page.getByRole('heading', { name: 'Sản phẩm và biến thể' })).toBeVisible();
    await expect(page.getByText('Hiển thị 1–10 trên tổng số 13 sản phẩm')).toBeVisible();
    await expect(page.getByText('Cố định 10 sản phẩm / trang')).toBeVisible();

    // Must render exactly 10 product rows on page 1 and forbid changing page size
    const rows = page.locator('.ant-table-tbody > tr.ant-table-row');
    await expect(rows).toHaveCount(10);
    await expect(page.locator('.ant-pagination-options-size-changer')).toHaveCount(0);

    // Navigate to page 2
    await page.locator('.ant-pagination-item-2').click();
    await expect(page.getByText('Hiển thị 11–13 trên tổng số 13 sản phẩm')).toBeVisible();
    await expect(rows).toHaveCount(3);
    await expect(page.getByText('Hộp Bánh Nghệ Nhân Số 13')).toBeVisible();

    const lastQuery = state.supplierProductQueries.at(-1);
    expect(lastQuery).toMatchObject({ page: 2, pageSize: 10 });
  });

  test('Nhà cung cấp tìm kiếm theo tên/SKU, lọc danh mục/trạng thái, sắp xếp và đặt lại bộ lọc', async ({
    page,
  }) => {
    const paginatedProducts = createPaginatedSupplierProducts();
    const state = await setupSession(page, { role: 'Supplier', products: paginatedProducts });
    await page.goto('/nha-cung-cap/quan-ly-san-pham');

    const rows = page.locator('.ant-table-tbody > tr.ant-table-row');
    await expect(rows).toHaveCount(10);

    // Move to page 2 first to verify filter resets page back to 1
    await page.locator('.ant-pagination-item-2').click();
    await expect(rows).toHaveCount(3);

    // 1) Filter by Category -> resets to page 1
    await page.locator('.ant-select', { hasText: 'Tất cả danh mục' }).click();
    await page.locator('.ant-select-item-option-content', { hasText: 'Hộp quà doanh nghiệp VIP' }).click();

    await expect(page.getByText('Set Quà Long Phụng Cát Tường VIP')).toBeVisible();
    await expect(rows).toHaveCount(4);
    expect(state.supplierProductQueries.at(-1)).toMatchObject({
      categoryId: '11111111-2222-3333-4444-555555555553',
      page: 1,
      pageSize: 10,
    });

    // 2) Filter by Status = Inactive inside that category
    await page.locator('.ant-select', { hasText: 'Tất cả trạng thái' }).click();
    await page.locator('.ant-select-item-option-content', { hasText: 'Bản nháp / Đang ẩn' }).click();

    await expect(rows).toHaveCount(1);
    await expect(page.getByText('Hộp Bánh Nghệ Nhân Số 12')).toBeVisible();
    expect(state.supplierProductQueries.at(-1)).toMatchObject({
      categoryId: '11111111-2222-3333-4444-555555555553',
      status: 'Inactive',
      page: 1,
      pageSize: 10,
    });

    // 3) Reset filters with Xóa lọc
    await page.getByRole('button', { name: 'Xóa bộ lọc' }).click();
    await expect(page.getByText('Hiển thị 1–10 trên tổng số 13 sản phẩm')).toBeVisible();
    await expect(rows).toHaveCount(10);

    // 4) Search by SKU (press Enter for immediate query)
    const searchInput = page.locator('input[placeholder="Tìm theo tên sản phẩm hoặc mã SKU..."]');
    await searchInput.fill('SKU-TC-YS');
    await searchInput.press('Enter');

    await expect(rows).toHaveCount(1);
    await expect(page.getByText('Bánh Nướng Thập Cẩm Gà Quay Yến Sào')).toBeVisible();
    expect(state.supplierProductQueries.at(-1)).toMatchObject({
      q: 'SKU-TC-YS',
      page: 1,
      pageSize: 10,
    });

    // 5) Search no-match shows filtered empty state & reset button
    await searchInput.fill('KHONG-TON-TAI-999');
    await searchInput.press('Enter');
    await expect(
      page.getByText('Không tìm thấy sản phẩm khớp với từ khóa hoặc bộ lọc.')
    ).toBeVisible();
    await page.locator('.ant-empty button', { hasText: 'Xóa bộ lọc' }).click();
    await expect(rows).toHaveCount(10);

    // 6) Sort by Tồn kho thấp trước (stockAsc)
    await page.locator('.ant-select', { hasText: 'Cập nhật gần nhất' }).click();
    await page.locator('.ant-select-item-option-content', { hasText: 'Tồn kho thấp trước' }).click();
    await expect(rows.first()).toContainText('Bánh Nướng Thập Cẩm Gà Quay Yến Sào');
    expect(state.supplierProductQueries.at(-1)).toMatchObject({
      sort: 'stockAsc',
      page: 1,
      pageSize: 10,
    });
  });

  test('Hiển thị thông báo khi sản phẩm không tồn tại hoặc bị ẩn', async ({ page }) => {
    await setupSession(page, { role: 'Customer' });
    await page.goto('/san-pham/00000000-0000-0000-0000-000000000000');

    await expect(page.locator('text=Sản phẩm không tồn tại hoặc chưa được xuất bản')).toBeVisible();
  });
});
