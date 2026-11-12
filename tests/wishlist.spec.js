import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

const customerAccount = {
  id: '32e57dbe-6b3d-4949-8af8-b7d44ca023d5',
  email: 'trongan@example.com',
  fullName: 'Trong An',
  phone: '0901234567',
  avatarUrl: null,
  role: 'Customer',
};

const PRODUCT_1 = {
  wishlistId: '11111111-1111-1111-1111-111111111111',
  productId: 'aaaa1111-1111-1111-1111-111111111111',
  name: 'Hộp Sơn Mài Kim Bảo Tứ Quý',
  primaryImageUrl: '/hero_mooncake_bg.jpg',
  basePrice: 1250000,
  minPrice: 1180000,
  maxPrice: 1450000,
  minOrderQty: 20,
  unit: 'hộp',
  supportsCustomPackaging: true,
  effectiveStatus: 'Active',
  shop: {
    shopId: 'shop-1',
    slug: 'xuan-huong',
    name: 'Xưởng Xuân Hương',
    reputationScore: 96,
    isVerified: true,
    regionCode: 'HN',
  },
  category: { id: 'cat-1', name: 'Hộp quà sơn mài' },
  averageRating: 4.9,
  reviewCount: 24,
  savedAtUtc: '2026-11-12T04:30:00Z',
};

const PRODUCT_2 = {
  ...PRODUCT_1,
  wishlistId: '22222222-2222-2222-2222-222222222222',
  productId: 'bbbb2222-2222-2222-2222-222222222222',
  name: 'Bánh Nướng Thập Cẩm Lạp Xưởng Cao Cấp',
  minPrice: 680000,
  maxPrice: 820000,
  basePrice: 720000,
  category: { id: 'cat-2', name: 'Bánh nướng' },
  savedAtUtc: '2026-11-12T04:20:00Z',
};

const PRODUCT_3 = {
  ...PRODUCT_1,
  wishlistId: '33333333-3333-3333-3333-333333333333',
  productId: 'cccc3333-3333-3333-3333-333333333333',
  name: 'Bộ Quà Trung Thu Trăng Vàng Đoàn Viên',
  minPrice: 950000,
  maxPrice: 1100000,
  basePrice: 990000,
  category: { id: 'cat-3', name: 'Set quà VIP' },
  savedAtUtc: '2026-11-12T04:10:00Z',
};

const ALL_CATALOG_ITEMS = [PRODUCT_1, PRODUCT_2, PRODUCT_3];

async function setupWishlistMocks(page, options = {}) {
  const {
    authenticated = true,
    initialSavedIds = [PRODUCT_1.productId, PRODUCT_2.productId, PRODUCT_3.productId],
  } = options;

  let savedOrder = [...initialSavedIds];
  const cursorCalls = [];
  const toggleCalls = [];
  const checkCalls = [];

  if (authenticated) {
    const token = `test.${Buffer.from(JSON.stringify({
      exp: Math.floor(Date.now() / 1000) + 3600,
    })).toString('base64url')}.test`;

    await page.addInitScript(({ account, accessToken }) => {
      localStorage.setItem('mooncake_auth_user', JSON.stringify(account));
      localStorage.setItem('mooncake_auth_token', JSON.stringify(accessToken));
      localStorage.setItem('mooncake_auth_refresh_token', JSON.stringify('refresh-test'));
    }, { account: customerAccount, accessToken: token });
  }

  await page.route('**/api/v1/**', (route) => {
    const url = new URL(route.request().url());
    const path = url.pathname;
    const method = route.request().method();

    if (path.endsWith('/auth/me') && authenticated) {
      return route.fulfill({ json: { status: 200, data: customerAccount } });
    }

    if (path.endsWith('/wishlist/check') && method === 'GET') {
      const ids = (url.searchParams.get('ids') || '')
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean);
      checkCalls.push(ids);
      return route.fulfill({
        json: {
          status: 200,
          data: {
            savedIds: ids.filter((id) => savedOrder.includes(id)),
          },
        },
      });
    }

    const toggleMatch = path.match(/\/wishlist\/([^/]+)$/);
    if (toggleMatch && method === 'POST') {
      const productId = decodeURIComponent(toggleMatch[1]);
      toggleCalls.push(productId);
      const exists = savedOrder.includes(productId);
      if (exists) {
        savedOrder = savedOrder.filter((id) => id !== productId);
      } else {
        savedOrder = [productId, ...savedOrder];
      }
      return route.fulfill({
        json: {
          status: 200,
          message: exists ? 'Đã bỏ khỏi danh sách yêu thích.' : 'Đã lưu vào danh sách yêu thích.',
          data: {
            productId,
            isSaved: !exists,
            totalCount: savedOrder.length,
          },
        },
      });
    }

    if (path.endsWith('/wishlist') && method === 'GET') {
      const pageSize = Number(url.searchParams.get('pageSize') || 12);
      const cursor = url.searchParams.get('cursor');
      cursorCalls.push({ pageSize, cursor });

      const orderedItems = savedOrder
        .map((id) => ALL_CATALOG_ITEMS.find((item) => item.productId === id))
        .filter(Boolean);

      if (pageSize === 1) {
        return route.fulfill({
          json: {
            status: 200,
            data: {
              items: orderedItems.slice(0, 1),
              hasMore: orderedItems.length > 1,
              nextCursor: orderedItems.length > 1 ? 'cursor-page-2' : null,
              totalCount: orderedItems.length,
            },
          },
        });
      }

      if (!cursor) {
        const page1Items = orderedItems.slice(0, 2);
        const hasMore = orderedItems.length > 2;
        return route.fulfill({
          json: {
            status: 200,
            data: {
              items: page1Items,
              hasMore,
              nextCursor: hasMore ? 'cursor-page-2' : null,
              totalCount: orderedItems.length,
            },
          },
        });
      }

      if (cursor === 'cursor-page-2') {
        return route.fulfill({
          json: {
            status: 200,
            data: {
              items: orderedItems.slice(2),
              hasMore: false,
              nextCursor: null,
              totalCount: orderedItems.length,
            },
          },
        });
      }
    }

    if (path.endsWith('/categories')) {
      return route.fulfill({
        json: {
          status: 200,
          data: [
            { id: 'cat-1', name: 'Hộp quà sơn mài', productCount: 1 },
            { id: 'cat-2', name: 'Bánh nướng', productCount: 1 },
          ],
        },
      });
    }

    const productDetailMatch = path.match(/\/products\/([^/]+)$/);
    if (productDetailMatch && method === 'GET') {
      const productId = productDetailMatch[1];
      const found = ALL_CATALOG_ITEMS.find((item) => item.productId === productId) || PRODUCT_1;
      return route.fulfill({
        json: {
          status: 200,
          data: {
            ...found,
            description: 'Bánh Trung thu thượng hạng chế biến thủ công theo công thức truyền thống.',
            ingredients: 'Hạt sen Huế, lòng đỏ trứng muối, bột mì cao cấp.',
            images: [{ id: 'img-1', imageUrl: found.primaryImageUrl, isPrimary: true }],
            variants: [
              {
                id: 'var-1',
                name: 'Hộp 4 bánh 150g',
                price: found.minPrice,
                isAvailable: true,
              },
            ],
            maxOrderQty: 500,
          },
        },
      });
    }

    if (path.endsWith('/products') && method === 'GET') {
      return route.fulfill({
        json: {
          status: 200,
          data: {
            items: ALL_CATALOG_ITEMS,
            totalCount: ALL_CATALOG_ITEMS.length,
            pageNumber: 1,
            pageSize: 12,
          },
        },
      });
    }

    if (path.endsWith('/reviews')) {
      return route.fulfill({
        json: {
          status: 200,
          data: { items: [], totalCount: 0, pageNumber: 1, pageSize: 10 },
        },
      });
    }

    return route.fulfill({ json: { status: 200, data: [] } });
  });

  return { cursorCalls, toggleCalls, checkCalls };
}

test('Dropdown hồ sơ điều hướng đến Sản phẩm yêu thích và tải thêm theo cursor', async ({ page }) => {
  const api = await setupWishlistMocks(page, {
    authenticated: true,
    initialSavedIds: [PRODUCT_1.productId, PRODUCT_2.productId, PRODUCT_3.productId],
  });

  await page.goto('/tim-kiem');

  const accountBtn = page.getByRole('button', { name: 'Tài khoản' });
  await expect(accountBtn).toBeVisible();
  await accountBtn.click();

  const dropdownMenu = page.locator('.ant-dropdown-menu');
  await expect(dropdownMenu).toBeVisible();
  const labels = await dropdownMenu.getByRole('menuitem').allInnerTexts();
  const profileIdx = labels.findIndex((text) => text.includes('Hồ sơ của tôi'));
  const wishlistIdx = labels.findIndex((text) => text.includes('Sản phẩm yêu thích'));
  const rfqIdx = labels.findIndex((text) => text.includes('Quản lý RFQ của tôi'));

  expect(profileIdx).toBeGreaterThan(-1);
  expect(wishlistIdx).toBe(profileIdx + 1);
  expect(rfqIdx).toBe(wishlistIdx + 1);
  await expect(page.getByTestId('header-wishlist-count')).toHaveText('3');

  await dropdownMenu.getByRole('menuitem', { name: /Sản phẩm yêu thích/i }).click();

  await expect(page).toHaveURL(/\/san-pham-yeu-thich$/);
  await expect(page.getByRole('heading', { name: 'Sản phẩm yêu thích' })).toBeVisible();

  const cards = page.getByTestId('wishlist-grid').getByTestId('product-search-card');
  await expect(cards).toHaveCount(2);
  await expect(page.getByTestId('wishlist-progress-text')).toContainText('Đang hiển thị 2 / 3');

  const loadMoreBtn = page.getByTestId('wishlist-load-more-btn');
  await expect(loadMoreBtn).toBeVisible();
  await loadMoreBtn.click();

  await expect(cards).toHaveCount(3);
  await expect(page.getByTestId('wishlist-progress-text')).toContainText(
    'Đã hiển thị toàn bộ 3 sản phẩm đã lưu'
  );
  await expect(loadMoreBtn).toBeHidden();
  expect(api.cursorCalls.some((call) => call.cursor === 'cursor-page-2')).toBe(true);
});

test('Thao tác yêu thích đồng bộ giữa thẻ sản phẩm, trang chi tiết và xóa trực tiếp trên wishlist', async ({ page }) => {
  const api = await setupWishlistMocks(page, {
    authenticated: true,
    initialSavedIds: [PRODUCT_2.productId],
  });

  await page.goto('/tim-kiem');

  const cardBtn1 = page.getByTestId(`wishlist-toggle-${PRODUCT_1.productId}`);
  const cardBtn2 = page.getByTestId(`wishlist-toggle-${PRODUCT_2.productId}`);

  await expect(cardBtn1).toHaveAttribute('aria-pressed', 'false');
  await expect(cardBtn2).toHaveAttribute('aria-pressed', 'true');

  await cardBtn1.click();
  await expect(page).toHaveURL(/\/tim-kiem/);
  await expect(cardBtn1).toHaveAttribute('aria-pressed', 'true');
  expect(api.toggleCalls).toContain(PRODUCT_1.productId);

  await page.goto(`/san-pham/${PRODUCT_1.productId}`);
  const detailWishlistBtn = page.locator('.wishlist-btn--detail');
  await expect(detailWishlistBtn).toHaveAttribute('aria-pressed', 'true');
  await expect(detailWishlistBtn).toContainText('Đã lưu yêu thích');

  await detailWishlistBtn.click();
  await expect(detailWishlistBtn).toHaveAttribute('aria-pressed', 'false');
  await expect(detailWishlistBtn).toContainText('Yêu thích');

  await page.goto('/san-pham-yeu-thich');
  const cards = page.getByTestId('wishlist-grid').getByTestId('product-search-card');
  await expect(cards).toHaveCount(1);

  await page.getByTestId(`wishlist-toggle-${PRODUCT_2.productId}`).click();
  await expect(page.getByTestId('wishlist-empty-state')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Khám phá sản phẩm' })).toBeVisible();
});

test('Khách chưa đăng nhập nhấn yêu thích sẽ mở hộp thoại đăng nhập', async ({ page }) => {
  const api = await setupWishlistMocks(page, { authenticated: false });

  await page.goto('/tim-kiem');
  const cardBtn1 = page.getByTestId(`wishlist-toggle-${PRODUCT_1.productId}`);
  await expect(cardBtn1).toHaveAttribute('aria-pressed', 'false');

  await cardBtn1.click();

  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(cardBtn1).toHaveAttribute('aria-pressed', 'false');
  expect(api.toggleCalls).toHaveLength(0);
});

test('Trang Sản phẩm yêu thích hiển thị cân đối trên màn hình di động 390x844', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await setupWishlistMocks(page, {
    authenticated: true,
    initialSavedIds: [PRODUCT_1.productId, PRODUCT_2.productId, PRODUCT_3.productId],
  });

  await page.goto('/san-pham-yeu-thich');
  await expect(page.getByRole('heading', { name: 'Sản phẩm yêu thích' })).toBeVisible();
  await expect(page.getByTestId('wishlist-load-more-btn')).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

