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

const THREAD_1 = {
  id: 'thread-1111-1111-1111-111111111111',
  viewerRole: 'Customer',
  partner: {
    userId: 'sup-user-1',
    displayName: 'Xưởng Bánh Xuân Hương',
    avatarUrl: null,
    role: 'Supplier',
    shopId: 'shop-1',
    shopSlug: 'xuan-huong',
    presence: { isOnline: true, lastSeenAt: null },
  },
  lastMessagePreview: 'Dạ xưởng nhận đơn bánh từ 50 hộp ạ.',
  lastMessageSenderId: 'sup-user-1',
  lastActivityAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  unreadCount: 2,
  partnerLastReadMessageId: 'msg-1',
  isBlocked: false,
  isBlockedByMe: false,
};

const THREAD_2 = {
  id: 'thread-2222-2222-2222-222222222222',
  viewerRole: 'Customer',
  partner: {
    userId: 'sup-user-2',
    displayName: 'Xưởng Bánh Kinh Đô VIP',
    avatarUrl: null,
    role: 'Supplier',
    shopId: 'shop-2',
    shopSlug: 'kinh-do-vip',
    presence: { isOnline: false, lastSeenAt: new Date(Date.now() - 35 * 60 * 1000).toISOString() },
  },
  lastMessagePreview: 'Đã gửi báo giá hộp sơn mài.',
  lastMessageSenderId: 'sup-user-2',
  lastActivityAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
  unreadCount: 0,
  partnerLastReadMessageId: 'msg-2',
  isBlocked: false,
  isBlockedByMe: false,
};

const SAMPLE_MESSAGES = [
  {
    id: 'msg-1',
    threadId: THREAD_1.id,
    senderId: customerAccount.id,
    senderRole: 'Customer',
    type: 'Text',
    body: 'Chào xưởng, em muốn hỏi số lượng tối thiểu đặt hộp quà?',
    clientMessageId: 'c-1',
    isRecalled: false,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    product: null,
    attachments: [],
    isEdited: false,
    editedAt: null,
  },
  {
    id: 'msg-2',
    threadId: THREAD_1.id,
    senderId: 'sup-user-1',
    senderRole: 'Supplier',
    type: 'Text',
    body: 'Dạ xưởng nhận đơn bánh từ 50 hộp ạ.',
    clientMessageId: 's-1',
    isRecalled: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    product: null,
    attachments: [],
    isEdited: false,
    editedAt: null,
  },
];

async function setupChatMocks(page, options = {}) {
  const { authenticated = true } = options;
  const account = options.account || customerAccount;
  const threads = options.threads || [THREAD_1, THREAD_2];
  const messages = options.messages || SAMPLE_MESSAGES;

  if (authenticated) {
    const token = `test.${Buffer.from(JSON.stringify({
      exp: Math.floor(Date.now() / 1000) + 3600,
    })).toString('base64url')}.test`;

    await page.addInitScript(({ account, accessToken }) => {
      localStorage.setItem('mooncake_auth_user', JSON.stringify(account));
      localStorage.setItem('mooncake_auth_token', JSON.stringify(accessToken));
      localStorage.setItem('mooncake_auth_refresh_token', JSON.stringify('refresh-test'));
    }, { account, accessToken: token });
  }

  await page.route('**/api/v1/**', (route) => {
    const url = new URL(route.request().url());
    const path = url.pathname;
    const method = route.request().method();

    if (path.endsWith('/auth/me') && authenticated) {
      return route.fulfill({ json: { status: 200, data: account } });
    }

    if (path.endsWith('/chat/unread-count') && method === 'GET') {
      return route.fulfill({ json: { status: 200, data: { total: 2 } } });
    }

    if (path.endsWith('/chat/threads') && method === 'GET') {
      return route.fulfill({
        json: {
          status: 200,
          data: {
            items: threads,
            hasMore: false,
            nextCursor: null,
          },
        },
      });
    }

    if (path.endsWith('/chat/threads') && method === 'POST') {
      return route.fulfill({
        json: {
          status: 200,
          data: THREAD_1,
        },
      });
    }

    if (path.includes('/chat/threads/') && path.endsWith('/messages') && method === 'GET') {
      return route.fulfill({
        json: {
          status: 200,
          data: {
            items: messages,
            hasMore: false,
            nextCursor: null,
          },
        },
      });
    }

    if (path.includes('/chat/threads/') && path.endsWith('/messages') && method === 'POST') {
      const postData = route.request().postDataJSON() || {};
      const newMsg = {
        id: `msg-${Date.now()}`,
        threadId: THREAD_1.id,
        senderId: customerAccount.id,
        senderRole: 'Customer',
        type: 'Text',
        body: postData.body || 'Tin nhắn mới',
        clientMessageId: postData.clientMessageId || 'c-new',
        isRecalled: false,
        createdAt: new Date().toISOString(),
        product: null,
        attachments: [],
        isEdited: false,
        editedAt: null,
      };
      return route.fulfill({ status: 201, json: { status: 201, data: newMsg } });
    }

    if (path.includes('/chat/threads/') && path.endsWith('/read') && method === 'POST') {
      return route.fulfill({
        json: {
          status: 200,
          data: { threadId: THREAD_1.id, lastReadMessageId: 'msg-2', unreadCount: 0, totalUnread: 0 },
        },
      });
    }

    if (path.endsWith('/wishlist/check')) {
      return route.fulfill({ json: { status: 200, data: { savedIds: [] } } });
    }

    if (path.endsWith('/notifications/unread-count')) {
      return route.fulfill({ json: { status: 200, data: { unreadCount: 0 } } });
    }

    // Default 200 fallback
    return route.fulfill({ json: { status: 200, data: {} } });
  });

  // Mock SignalR Hub endpoints so it doesn't fail
  await page.route('**/api/v1/hubs/**', (route) => {
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ availableTransports: [{ transport: 'LongPolling', transferFormats: ['Text'] }] }),
    });
  });
}

test.describe('B2B Realtime Customer <-> Supplier Chat', () => {
  test('Header displays Chat icon with unread badge and dropdown menu contains Tin nhắn', async ({ page }) => {
    await setupChatMocks(page);
    await page.goto('/');

    // Header Chat button with unread count
    const chatBtn = page.getByRole('button', { name: 'Tin nhắn' });
    await expect(chatBtn).toBeVisible();
    await expect(page.locator('.ant-badge-count')).toContainText('2');

    // Profile dropdown contains "Tin nhắn" with unread badge
    const accountBtn = page.getByRole('button', { name: 'Tài khoản' });
    await accountBtn.click();

    const dropdown = page.locator('.ant-dropdown-menu');
    await dropdown.waitFor({ state: 'visible' });
    await expect(dropdown.getByText('Tin nhắn')).toBeVisible();
    await expect(page.getByTestId('header-chat-unread-count')).toContainText('2');
  });

  test('Navigating to /tin-nhan loads thread list and conversation history', async ({ page }) => {
    await setupChatMocks(page);
    await page.goto('/tin-nhan');

    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
    // Page title and threads
    await expect(page.getByText('Hộp thư tin nhắn')).toBeVisible();
    await expect(page.getByText('Xưởng Bánh Xuân Hương')).toBeVisible();
    await expect(page.getByText('Xưởng Bánh Kinh Đô VIP')).toBeVisible();

    // Select first thread
    await page.getByText('Xưởng Bánh Xuân Hương').click();

    // Chat window header & messages
    await expect(page.getByRole('heading', { name: 'Xưởng Bánh Xuân Hương' })).toBeVisible();
    await expect(page.getByText('Đang hoạt động')).toBeVisible();
    await expect(page.getByRole('log').getByText('Chào xưởng, em muốn hỏi số lượng tối thiểu đặt hộp quà?')).toBeVisible();
    await expect(page.getByRole('log').getByText('Dạ xưởng nhận đơn bánh từ 50 hộp ạ.')).toBeVisible();

    // Sending a message
    const input = page.getByPlaceholder('Nhập tin nhắn... (Enter để gửi, Shift+Enter xuống dòng)');
    await input.fill('Xưởng có chiết khấu thêm không ạ?');
    await page.getByRole('button', { name: 'Gửi tin nhắn' }).click();

    await expect(page.getByRole('log').getByText('Xưởng có chiết khấu thêm không ạ?')).toBeVisible();
  });

  test('Supplier opens customer messages inside supplier workspace', async ({ page }) => {
    const supplier = {
      id: 'sup-user-1',
      fullName: 'Chủ xưởng Xuân Hương',
      role: 'Supplier',
      capabilities: { canCreateShop: true, canFulfillExistingOrders: true },
    };
    const supplierThread = {
      ...THREAD_1,
      viewerRole: 'Supplier',
      partner: {
        userId: customerAccount.id,
        displayName: customerAccount.fullName,
        avatarUrl: null,
        role: 'Customer',
        presence: { isOnline: true, lastSeenAt: null },
      },
    };
    await setupChatMocks(page, { account: supplier, threads: [supplierThread] });
    await page.goto('/nha-cung-cap/tin-nhan');

    await expect(page.getByRole('heading', { name: 'Hộp thư tin nhắn' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Mở cuộc trò chuyện với Trong An' })).toBeVisible();
    await page.getByRole('button', { name: 'Mở cuộc trò chuyện với Trong An' }).click();
    await expect(page.getByRole('log').getByText('Dạ xưởng nhận đơn bánh từ 50 hộp ạ.')).toBeVisible();
    await expect(page.locator('.chat-page-wrapper--workspace')).toBeVisible();
  });

  test('Mobile inbox switches between thread list and conversation', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await setupChatMocks(page);
    await page.goto('/tin-nhan');

    const list = page.locator('.chat-sidebar');
    const conversation = page.locator('.chat-main-area');
    await expect(list).toBeVisible();
    await expect(conversation).toBeHidden();
    await page.getByRole('button', { name: 'Mở cuộc trò chuyện với Xưởng Bánh Xuân Hương' }).click();
    await expect(list).toBeHidden();
    await expect(conversation).toBeVisible();
  });

  test('Thẻ sản phẩm trong tin nhắn mở được trang chi tiết', async ({ page }) => {
    const productId = '3227c92c-4e64-42af-b05c-ba827f200d95';
    await setupChatMocks(page, { messages: [{
      ...SAMPLE_MESSAGES[1],
      id: 'product-message-1',
      type: 'ProductCard',
      body: null,
      product: { productId, name: 'Bánh trung thu Hoàng Kim', imageUrl: null, price: 680000 },
    }] });
    await page.goto('/tin-nhan');
    await page.getByRole('button', { name: 'Mở cuộc trò chuyện với Xưởng Bánh Xuân Hương' }).click();

    const productLink = page.getByRole('link', { name: 'Xem chi tiết sản phẩm Bánh trung thu Hoàng Kim' });
    await expect(productLink).toHaveAttribute('href', `/san-pham/${productId}`);
    await productLink.click();
    await expect(page).toHaveURL(new RegExp(`/san-pham/${productId}$`));
  });

  test('Messenger-style Floating ChatDock minimizes and expands properly', async ({ page }) => {
    await setupChatMocks(page);
    await page.goto('/tin-nhan');

    // Trigger dock opening from mock by interacting with thread
    await page.getByText('Xưởng Bánh Xuân Hương').click();
    await expect(page.getByRole('heading', { name: 'Xưởng Bánh Xuân Hương' })).toBeVisible();

    // Check search functionality
    const searchInput = page.getByPlaceholder('Tìm kiếm cuộc trò chuyện...');
    await searchInput.fill('Kinh Đô');
    await expect(page.locator('.chat-sidebar').getByText('Xưởng Bánh Kinh Đô VIP')).toBeVisible();
    await expect(page.locator('.chat-sidebar').getByText('Xưởng Bánh Xuân Hương')).not.toBeVisible();
  });
});
