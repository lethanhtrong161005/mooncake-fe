import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

const customerId = '11111111-1111-4111-8111-111111111111';
const supplierId = '22222222-2222-4222-8222-222222222222';
const productId = '88888888-8888-4888-8888-888888888888';

async function setupAuth(page, role = 'Customer') {
  const user = {
    id: role === 'Supplier' ? supplierId : customerId,
    fullName: role === 'Supplier' ? 'Xưởng Bánh Tràng An Nghệ Nhân' : 'Tập đoàn Vingroup',
    role,
    capabilities: {
      canCreateShop: role === 'Supplier',
      canReadSupplierVerification: role === 'Supplier',
      canFulfillExistingOrders: role === 'Supplier',
    },
    supplierVerification: role === 'Supplier' ? { verificationStatus: 'Verified' } : null,
  };

  const token = `test.${Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url')}.test`;

  await page.addInitScript(
    ({ t, u }) => {
      localStorage.setItem('mooncake_auth_token', JSON.stringify(t));
      localStorage.setItem('mooncake_auth_user', JSON.stringify(u));
      localStorage.setItem('mooncake_auth_refresh_token', JSON.stringify('test-refresh'));
    },
    { t: token, u: user }
  );

  await page.route('https://cdn.tailwindcss.com/**', (route) => route.fulfill({ body: 'window.tailwind = {};', contentType: 'text/javascript' }));
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.abort());
  await page.route('**/api/v1/auth/me', (route) => route.fulfill({ json: { status: 200, data: user } }));
  await page.route('**/api/v1/notifications', (route) => route.fulfill({ json: { status: 200, data: { items: [], unreadCount: 0, totalCount: 0 } } }));
}

async function setupProductMock(page) {
  await page.route(`**/api/v1/products/${productId}`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 200,
        data: {
          id: productId,
          name: 'Bánh Trung Thu Thập Cẩm Bát Bửu Thượng Hạng',
          basePrice: 120000,
          unit: 'hộp',
          minOrderQty: 10,
          description: 'Bánh nướng truyền thống nhân thập cẩm xá xíu lạp xưởng trứng muối.',
          ingredients: 'Bột mì thượng hạng, xá xíu, lạp xưởng, hạt sen, trứng muối.',
          averageRating: 4.9,
          reviewCount: 42,
          shop: {
            name: 'Xưởng Bánh Tràng An Nghệ Nhân',
            reputationScore: 88.5,
          },
          category: { name: 'Bánh nướng cao cấp' },
          variants: [
            { id: 'v1', name: 'Hộp 4 Bánh 180g', price: 480000, isAvailable: true, sku: 'TC-180' },
          ],
          images: [],
        },
      }),
    });
  });

  await page.route(`**/api/v1/products/${productId}/reviews*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 200,
        data: {
          productId,
          productName: 'Bánh Trung Thu Thập Cẩm Bát Bửu Thượng Hạng',
          summary: {
            averageRating: 4.9,
            totalReviews: 42,
            verifiedPurchaseCount: 38,
            withMediaCount: 15,
            starDistribution: {
              star5: 36,
              star4: 4,
              star3: 2,
              star2: 0,
              star1: 0,
            },
          },
          items: [
            {
              id: 'rev-prod-001',
              authorName: 'Đoàn Minh Khoa (FPT Telecom)',
              authorAvatarUrl: null,
              isVerifiedPurchase: true,
              variantId: 'v1',
              variantName: 'Hộp VIP 4 Bánh 180g (Kèm Trà Ô Long)',
              rating: 5,
              title: 'Chất lượng bánh hoàn hảo',
              content: 'Bánh nướng thơm lừng, trà Ô Long chất lượng.',
              mediaUrls: [],
              likeCount: 28,
              isLikedByMe: false,
              supplierReply: 'Xưởng Bánh Tràng An xin chân thành cảm ơn FPT Telecom đã ủng hộ!',
              supplierRepliedAt: '2026-09-02T10:00:00Z',
              createdAt: '2026-09-01T15:30:00Z',
            },
          ],
          pageNumber: 1,
          pageSize: 10,
          totalCount: 42,
        },
      }),
    });
  });
}

test.describe('Module 8: Reviews & Reputation Management (Features #21 & #22)', () => {
  test('1. Customer submits 4-criteria transaction review for completed order (Feature #21)', async ({ page }) => {
    await setupAuth(page, 'Customer');

    await page.route('**/api/v1/reviews/transaction', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 201,
          data: {
            id: 'rev-trans-001',
            orderId: 'ord-202610-001',
            overallRating: 5,
            reputationScoreDelta: 3.0,
            newSupplierReputationScore: 91.5,
          },
          message: 'Gửi đánh giá giao dịch thành công.',
        }),
      });
    });

    await page.goto('/#thanh-toan-danh-gia');

    // Verify page header
    await expect(page.getByRole('heading', { name: /Đánh Giá Chất Lượng 4 Tiêu Chí/i })).toBeVisible();

    // Verify 4-criteria review form is present
    await expect(page.getByText('Gửi Đánh Giá Cho Đơn Hàng Hoàn Thành Gần Nhất')).toBeVisible();
    await expect(page.getByText('Xưởng Bánh Tràng An Nghệ Nhân')).toBeVisible();

    // Verify 4 criteria labels
    await expect(page.getByText('1. Chất Lượng Bánh & An Toàn Thực Phẩm')).toBeVisible();
    await expect(page.getByText('2. Đúng Hạn Giao Hàng & Bảo Quản Vận Chuyển')).toBeVisible();
    await expect(page.getByText('3. Dịch Vụ Hỗ Trợ & Thiết Kế Logo Mockup')).toBeVisible();
    await expect(page.getByText('4. Mức Độ Hài Lòng Tổng Thể')).toBeVisible();

    // Fill in custom comment
    const commentInput = page.getByRole('textbox', { name: /Nhận Xét Chi Tiết/i });
    await commentInput.fill('Chất lượng bánh nướng thập cẩm rất đậm đà, bao bì sang trọng dập kim logo tập đoàn sắc nét. Giao hàng đúng cam kết.');

    // Submit review
    const submitBtn = page.getByRole('button', { name: /Gửi Đánh Giá Xác Thực/i });
    await submitBtn.click();

    // Verify success feedback with reputation score boost
    await expect(page.getByText(/Đã gửi đánh giá thành công! Xưởng Bánh Tràng An được cộng \+3 điểm uy tín/i)).toBeVisible();

    // Verify new review appears in enterprise history table (using exact: true to avoid substring clash with strong header)
    await expect(page.getByText('HD-2025-08910', { exact: true })).toBeVisible();
  });

  test('2. Product Detail Page displays Rating Histogram, Badges, and Social Review Stream (Feature #22)', async ({ page }) => {
    await setupAuth(page, 'Customer');
    await setupProductMock(page);

    await page.goto(`/#san-pham/${productId}`);

    // Verify Product title and Luxury Reputation Badge
    await expect(page.getByRole('heading', { name: 'Bánh Trung Thu Thập Cẩm Bát Bửu Thượng Hạng' })).toBeVisible();
    await expect(page.getByText('Đối tác Vàng')).toBeVisible();

    // Scroll down to Social Review Stream section
    const reviewsHeader = page.getByRole('heading', { name: /Đánh Giá & Nhận Xét Mạng Xã Hội/i });
    await reviewsHeader.scrollIntoViewIfNeeded();
    await expect(reviewsHeader).toBeVisible();

    // Verify Histogram & Summary stats
    await expect(page.getByText('Dựa trên')).toBeVisible();
    await expect(page.getByText('Mua hàng xác thực')).toBeVisible();

    // Verify Social Stream items with author and variant tag
    await expect(page.getByText('Đoàn Minh Khoa (FPT Telecom)')).toBeVisible();
    await expect(page.getByText('Đã mua hàng').first()).toBeVisible();
    await expect(page.getByText('Hộp VIP 4 Bánh 180g (Kèm Trà Ô Long)')).toBeVisible();

    // Verify Official Supplier reply card
    await expect(page.getByText('Phản hồi chính thức từ Nhà cung cấp')).toBeVisible();
    await expect(page.getByText(/Xưởng Bánh Tràng An xin chân thành cảm ơn FPT Telecom/i)).toBeVisible();
  });

  test('3. Interactive Filter Chips and Like Button Toggle on Product Reviews (Feature #22)', async ({ page }) => {
    await setupAuth(page, 'Customer');
    await setupProductMock(page);

    await page.route(`**/api/v1/products/reviews/rev-prod-001/like`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 200,
          data: {
            reviewId: 'rev-prod-001',
            isLiked: true,
            likeCount: 29,
          },
        }),
      });
    });

    await page.goto(`/#san-pham/${productId}`);

    // Scroll to review stream
    const reviewsHeader = page.getByRole('heading', { name: /Đánh Giá & Nhận Xét Mạng Xã Hội/i });
    await reviewsHeader.scrollIntoViewIfNeeded();

    // Verify filter chips
    const allChip = page.getByRole('button', { name: /Tất cả/i });
    await expect(allChip).toBeVisible();

    const star5Chip = page.getByRole('button', { name: /5 ★/i });
    await expect(star5Chip).toBeVisible();
    await star5Chip.click();

    // Verify Like button interaction
    const likeButton = page.locator('button', { hasText: 'Hữu ích (28)' }).first();
    await expect(likeButton).toBeVisible();

    // Click like
    await likeButton.click();

    // Verify like count increments to 29
    await expect(page.locator('button', { hasText: 'Hữu ích (29)' }).first()).toBeVisible();
  });

  test('4. Verified Purchase Review Modal submission from Product Detail Page (Feature #22)', async ({ page }) => {
    await setupAuth(page, 'Customer');
    await setupProductMock(page);

    await page.route(`**/api/v1/products/${productId}/eligible-order-items`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 200,
          data: [
            {
              orderItemId: 'oi-001',
              orderId: 'ord-001',
              orderNumber: 'ORD-2026-8889',
              productId,
              productName: 'Bánh Trung Thu Thập Cẩm Bát Bửu Thượng Hạng',
              productVariantId: 'v1',
              variantName: 'Hộp 4 Bánh 180g',
              deliveredAt: '2026-09-01T10:00:00Z',
            },
          ],
        }),
      });
    });

    await page.route(`**/api/v1/products/${productId}/reviews`, async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 201,
          data: {
            id: 'rev-prod-002',
            authorName: 'Tập đoàn Vingroup',
            isVerifiedPurchase: true,
            rating: 5,
            title: 'Bánh nướng đậm đà, quà tặng hoàn hảo cho đối tác',
            content: 'Công ty mình đã nhận đủ 200 hộp. Vỏ bánh nướng thơm lừng, nhân trứng muối dẻo bùi không ngấy, in logo ép kim rất đẹp.',
            likeCount: 0,
            createdAt: new Date().toISOString(),
          },
        }),
      });
    });

    await page.goto(`/#san-pham/${productId}`);

    // Click Write Review button
    const writeBtn = page.getByRole('button', { name: /Viết Đánh Giá Sản Phẩm/i });
    await writeBtn.scrollIntoViewIfNeeded();
    await writeBtn.click();

    // Verify modal appears
    await expect(page.getByText('Đánh Giá Mua Hàng Xác Thực (Verified Purchase)')).toBeVisible();

    // Fill in review content
    const titleInput = page.getByPlaceholder('Tóm tắt ngắn gọn cảm nhận của bạn');
    await titleInput.fill('Bánh nướng đậm đà, quà tặng hoàn hảo cho đối tác');

    const contentInput = page.getByPlaceholder(/Chia sẻ về độ tươi ngon/i);
    await contentInput.fill('Công ty mình đã nhận đủ 200 hộp. Vỏ bánh nướng thơm lừng, nhân trứng muối dẻo bùi không ngấy, in logo ép kim rất đẹp.');

    // Submit review
    const submitReviewBtn = page.getByRole('button', { name: 'Đăng Đánh Giá Xác Thực' });
    await submitReviewBtn.click();

    // Verify success toast
    await expect(page.getByText('Đăng đánh giá sản phẩm thành công!')).toBeVisible();

    // Verify modal closes
    await expect(page.getByText('Đánh Giá Mua Hàng Xác Thực (Verified Purchase)')).not.toBeVisible();
  });
});
