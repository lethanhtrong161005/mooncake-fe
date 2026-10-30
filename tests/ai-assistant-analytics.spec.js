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
  await page.route('**/api/v1/auth/me', (route) => route.fulfill({ json: { status: 200, data: user } }));
  await page.route('**/api/v1/notifications', (route) => route.fulfill({ json: { status: 200, data: { items: [], unreadCount: 0, totalCount: 0 } } }));

  // Mock common dashboard endpoints to avoid noise
  await page.route('**/api/v1/reports/**', (route) => route.fulfill({ json: { status: 200, data: {} } }));
  await page.route('**/api/v1/admin/disputes**', (route) => route.fulfill({ json: { status: 200, data: [] } }));
  await page.route('**/api/v1/payments/escrow-summary**', (route) => route.fulfill({ json: { status: 200, data: {} } }));
}

async function setupAiMocks(page) {
  // Session initialization
  await page.route('**/api/v1/ai/chat/sessions', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 200,
        data: {
          conversationId: 'conv-ai-001',
          sessionToken: 'aic-test-session-token',
          conversationType: 'General',
          createdAt: new Date().toISOString(),
        },
      }),
    });
  });

  // Session history
  await page.route('**/api/v1/ai/chat/sessions/*/history', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 200,
        data: {
          conversationId: 'conv-ai-001',
          sessionToken: 'aic-test-session-token',
          messages: [],
        },
      }),
    });
  });

  // Chat message processing with RAG and cultural wisdom
  await page.route('**/api/v1/ai/chat/messages', async (route) => {
    const postData = route.request().postDataJSON() || {};
    const content = (postData.content || '').toLowerCase();

    if (content.includes('500k') || content.includes('ngân sách') || content.includes('100 hộp')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 200,
          data: {
            messageId: 'msg-rec-001',
            role: 'Assistant',
            content: 'Kính chào quý khách! Với ngân sách 500.000 đ/hộp cho 100 hộp quà tặng doanh nghiệp, Nguyệt Phố AI xin gợi ý set bánh cao cấp nhất dưới đây:',
            recommendedProducts: [
              {
                productId: '88888888-8888-4888-8888-888888888888',
                productName: 'Hộp Quà VIP Bát Bửu Thượng Hạng',
                shopName: 'Xưởng Bánh Tràng An Nghệ Nhân',
                primaryImageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600',
                basePrice: 480000,
                minOrderQty: 10,
                variantName: 'Set 4 Bánh 180g (Kèm Trà Ô Long)',
                variantPrice: 480000,
                reputationBadgeTitle: 'Đối tác Vàng',
                reputationScore: 92.5,
                recommendationReason: 'Phù hợp ngân sách 500k, mẫu hộp dập kim logo sắc nét, tặng kèm Trà Ô Long hảo hạng.',
              },
            ],
            suggestedFollowUps: [
              'Ý nghĩa set 4 bánh Tứ Quý & Loại trà phối kèm',
              'Tạo yêu cầu báo giá RFQ cho 100 hộp',
            ],
          },
        }),
      });
      return;
    }

    if (content.includes('tứ quý') || content.includes('ý nghĩa') || content.includes('trà')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 200,
          data: {
            messageId: 'msg-rec-002',
            role: 'Assistant',
            content: 'Set 4 bánh Trung thu Tứ Quý mang ý nghĩa phong thủy sâu sắc, biểu trưng cho bốn mùa bình an, mưa thuận gió hòa và sự hưng thịnh vẹn tròn. Để tôn vinh hương vị bánh nướng truyền thống, quý khách nên phối cùng Trà Ô Long hoặc Trà Sen, Trà Thiết Quan Âm giúp khai mở hậu vị thanh tao, giảm cảm giác ngọt sắc.',
            recommendedProducts: [],
            suggestedFollowUps: [
              'Gợi ý: Tư vấn thêm về dịch vụ in logo ép kim',
              'Gợi ý: Tạo yêu cầu báo giá RFQ',
            ],
          },
        }),
      });
      return;
    }

    // Default response
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 200,
        data: {
          messageId: 'msg-default',
          role: 'Assistant',
          content: 'Dạ em có thể tư vấn các set quà theo ngân sách và thông điệp văn hóa Trung thu ạ.',
          recommendedProducts: [],
          suggestedFollowUps: ['Tư vấn set quà 500k'],
        },
      }),
    });
  });

  // AI Analytics report generation
  await page.route('**/api/v1/ai/analytics/generate', async (route) => {
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 201,
        data: {
          reportId: 'rep-analytics-001',
          reportType: 'SalesTrend',
          status: 'Completed',
          result: {
            executiveSummary: 'Thị trường B2B ghi nhận sức mua tăng trưởng ổn định trong mùa cao điểm Tết Trung Thu với tổng GMV toàn sàn đạt mức kỷ lục. Tỷ lệ giao hàng đúng cam kết đạt 98.2% và tỷ lệ chuyển đổi thầu RFQ đạt 76.5%.',
            keyHighlights: [
              'Điểm Sáng Thị Trường & Động Lực Doanh Thu: Nhóm khách hàng tài chính tăng trưởng 42%',
              'Dòng bánh VIP truyền thống chiếm 68% doanh thu toàn sàn',
            ],
            riskAlerts: [
              {
                severity: 'Medium',
                description: 'Cảnh Báo Vận Hành & Điểm Nghẽn Cung Ứng: 2 xưởng bánh đạt 95% công suất nướng',
                potentialImpact: 'Nguy cơ quá tải nếu phát sinh đơn gấp cận ngày Rằm',
              },
            ],
            strategicRecommendations: [
              {
                priority: 'High',
                action: 'Kiến Nghị Chiến Lược Hành Động Cho Ban Điều Hành: Đẩy mạnh các gói combo bánh kèm Trà Ô Long',
                expectedOutcome: 'Tăng biên lợi nhuận ròng 12%',
              },
            ],
            metricsSummary: {
              totalGmv: 48500000000,
              gmvGrowthRate: 18.4,
              totalOrders: 142,
              totalContracts: 58,
              onTimeDeliveryRate: 98.2,
              rfqWinRate: 76.5,
            },
          },
        },
      }),
    });
  });

  // Realtime dashboard KPIs
  await page.route('**/api/v1/ai/analytics/dashboard-summary*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 200,
        data: {
          totalGmv: 48500000000,
          gmvGrowthRate: 18.4,
          totalOrders: 142,
          totalContracts: 58,
          onTimeDeliveryRate: 98.2,
          rfqWinRate: 76.5,
        },
      }),
    });
  });
}

test.describe('Module 9: AI Chatbot & Sales Analytics Intelligence (Features #23 & #24)', () => {
  test('1. Customer opens AI Chat Widget, sends budget query, receives recommendations with product card (Feature #23)', async ({ page }) => {
    await setupAuth(page, 'Customer');
    await setupAiMocks(page);
    await page.goto('/');

    // 1. Locate floating AI button and open drawer
    const aiFloatBtn = page.getByRole('button', { name: /Mở Trợ lý AI Nguyệt Phố/i });
    await expect(aiFloatBtn).toBeVisible();
    await aiFloatBtn.click();

    // 2. Verify drawer opens with enterprise AI branding
    await expect(page.getByText('Nguyệt Phố AI Concierge')).toBeVisible();
    await expect(page.getByText('Gemini Flash')).toBeVisible();
    await expect(page.getByText(/Trợ lý Quà tặng & Tri thức Mùa Trăng B2B/i)).toBeVisible();

    // 3. Enter budget consultation inquiry
    const inputArea = page.getByPlaceholder(/Hỏi về set bánh, ngân sách/i);
    await expect(inputArea).toBeVisible();
    await inputArea.fill('Tư vấn 100 hộp quà tặng doanh nghiệp ngân sách 500k');

    const sendBtn = page.locator('.luxury-ai-drawer').getByRole('button', { name: /Gửi/i });
    await sendBtn.click();

    // 4. Verify AI returns response with product cards
    await expect(page.getByText(/Hộp Quà VIP Bát Bửu Thượng Hạng/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/Xưởng Bánh Tràng An Nghệ Nhân/i).first()).toBeVisible();
    await expect(page.getByText(/480.000 đ/i).first()).toBeVisible();

    // 5. Verify action buttons inside recommendation cards
    const viewDetailBtn = page.getByRole('button', { name: /Xem chi tiết bánh/i }).first();
    await expect(viewDetailBtn).toBeVisible();

    const rfqBtn = page.getByRole('button', { name: /Tạo RFQ chào thầu/i }).first();
    await expect(rfqBtn).toBeVisible();
  });

  test('2. Customer inquires Mooncake Cultural Heritage and Tea Pairing advice (Feature #23)', async ({ page }) => {
    await setupAuth(page, 'Customer');
    await setupAiMocks(page);
    await page.goto('/');

    // Open AI Chat Drawer
    const aiFloatBtn = page.getByRole('button', { name: /Mở Trợ lý AI Nguyệt Phố/i });
    await aiFloatBtn.click();
    await expect(page.getByText('Nguyệt Phố AI Concierge')).toBeVisible();

    // Click suggestion chip for 4-cake box symbolism & tea pairing
    const chipBtn = page.getByRole('button', { name: /Ý nghĩa set 4 bánh Tứ Quý & Loại trà phối kèm/i });
    await expect(chipBtn).toBeVisible();
    await chipBtn.click();

    // Verify AI responds with cultural heritage advice and tea pairings
    await expect(
      page.getByText(/Ý nghĩa phong thủy|bốn mùa bình an|Trà Ô Long|Trà Sen|Trà Thiết Quan Âm/i).first()
    ).toBeVisible({ timeout: 10000 });

    // Verify quick follow-up chips update
    await expect(page.getByText(/Gợi ý:/i).first()).toBeVisible();
  });

  test('3. Admin navigates to Admin Dashboard, accesses AI Analytics Panel (Feature #24)', async ({ page }) => {
    await setupAuth(page, 'Admin');
    await setupAiMocks(page);
    await page.goto('/#admin/dashboard');

    // Switch to AI Analytics tab
    const aiTab = page.getByRole('tab', { name: /Báo Cáo AI Analytics/i });
    await expect(aiTab).toBeVisible();
    await aiTab.click();

    // Verify AI Analytics Panel Header & Badge
    await expect(page.getByRole('heading', { name: /Báo Cáo Phân Tích Thị Trường & GMV Toàn Sàn B2B/i })).toBeVisible();
    await expect(page.getByText('Gemini Flash').first()).toBeVisible();

    // Verify KPI Scorecard metrics
    await expect(page.getByText('Tổng GMV Giao Dịch')).toBeVisible();
    await expect(page.getByText('Đơn Trực Tiếp & Hợp Đồng')).toBeVisible();
    await expect(page.getByText('Tỷ Lệ Giao Đúng Hạn (PoD)')).toBeVisible();
    await expect(page.getByText('Tỷ Lệ Chốt Thầu RFQ')).toBeVisible();

    // Verify Executive Summary card
    await expect(page.getByText(/Bản Tóm Tắt Chiến Lược Từ Nguyệt Phố AI/i)).toBeVisible();
    await expect(page.getByText(/Thị trường B2B ghi nhận sức mua/i)).toBeVisible();

    // Verify Highlights & Risk Alerts sections
    await expect(page.getByText(/Điểm Sáng Thị Trường & Động Lực Doanh Thu/i).first()).toBeVisible();
    await expect(page.getByText(/Cảnh Báo Vận Hành & Điểm Nghẽn Cung Ứng/i).first()).toBeVisible();

    // Verify Strategic Action Recommendations
    await expect(page.getByText(/Kiến Nghị Chiến Lược Hành Động Cho Ban Điều Hành/i).first()).toBeVisible();
    await expect(page.getByText(/Đẩy mạnh các gói combo bánh kèm Trà Ô Long/i).first()).toBeVisible();
  });

  test('4. Admin triggers fresh AI market analysis report generation (Feature #24)', async ({ page }) => {
    await setupAuth(page, 'Admin');
    await setupAiMocks(page);
    await page.goto('/#admin/dashboard');

    // Switch to AI Analytics tab
    const aiTab = page.getByRole('tab', { name: /Báo Cáo AI Analytics/i });
    await aiTab.click();

    // Locate refresh button
    const refreshBtn = page.getByRole('button', { name: /Cập nhật phân tích AI/i });
    await expect(refreshBtn).toBeVisible();
    await refreshBtn.click();

    // Verify panel remains fully rendered with updated content
    await expect(page.getByRole('heading', { name: /Báo Cáo Phân Tích Thị Trường & GMV Toàn Sàn B2B/i })).toBeVisible();
    await expect(page.getByText(/Bản Tóm Tắt Chiến Lược Từ Nguyệt Phố AI/i)).toBeVisible();

    // Verify export/print button is present
    const printBtn = page.getByRole('button', { name: /In Báo Cáo \/ Xuất PDF/i });
    await expect(printBtn).toBeVisible();
  });
});
