import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

const profileId = '11111111-1111-4111-8111-111111111111';
const submissionId = '22222222-2222-4222-8222-222222222222';
const ownerId = '33333333-3333-4333-8333-333333333333';
const adminId = '44444444-4444-4444-8444-444444444444';
const uuid = /^[a-f0-9-]{36}$/;
const emptyProfile = () => ({
  profileId, version: 0, onboardingState: 'NotSubmitted', verificationStatus: null,
  currentSubmission: null, stagedDocuments: [], allowedActions: ['UploadDocument', 'Submit'],
});
const submitted = () => ({
  ...emptyProfile(), version: 7, onboardingState: 'Pending', verificationStatus: 'Pending',
  companyName: 'An Nhiên Test', taxCode: '0312345678', address: 'TP. Hồ Chí Minh',
  currentSubmission: { id: submissionId, revision: 1, companyName: 'An Nhiên Test',
    taxCode: '0312345678', address: 'TP. Hồ Chí Minh', status: 'Pending', submittedAtUtc: new Date().toISOString(), documents: [] },
  allowedActions: [],
});

const sessions = new WeakMap();
test.afterEach(async ({ page }) => {
  const state = sessions.get(page);
  if (state?.socket) await state.socket.close().catch(() => {});
  if (!page.isClosed()) {
    await page.evaluate(() => {
      localStorage.clear();
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    });
    await page.close();
  }
});

async function mockSession(page, role = 'Customer', profile = emptyProfile(), requestedRole = 'Supplier') {
  const state = { role, requestedRole, profile, uploads: 0, commands: [], authReads: 0, socket: null, handshake: false };
  sessions.set(page, state);
  const user = () => ({
    id: role === 'Admin' ? adminId : ownerId, fullName: 'Verification Test', phone: '0901234567',
    role: state.role, requestedRole: state.requestedRole,
    capabilities: { canReadSupplierVerification: state.requestedRole === 'Supplier',
      canSubmitSupplierVerification: state.profile.allowedActions.includes('Submit'),
      canCreateShop: state.profile.verificationStatus === 'Verified', canSubmitBid: state.profile.verificationStatus === 'Verified' },
    supplierVerification: { profileId, version: state.profile.version, onboardingState: state.profile.onboardingState,
      verificationStatus: state.profile.verificationStatus },
  });
  await page.addInitScript(({ account, token }) => {
    localStorage.setItem('mooncake_auth_user', JSON.stringify(account));
    localStorage.setItem('mooncake_auth_token', JSON.stringify(token));
    localStorage.setItem('mooncake_auth_refresh_token', JSON.stringify('test-refresh-token'));
  }, { account: user(), token: `test.${Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url')}.test` });
  await page.route('https://cdn.tailwindcss.com/**', (route) => route.fulfill({ contentType: 'text/javascript', body: 'window.tailwind = {};' }));
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.abort());
  await page.route('**/hubs/supplier-verification/negotiate*', (route) => route.fulfill({
    json: { negotiateVersion: 1, connectionId: 'test-connection', connectionToken: 'test-connection',
      availableTransports: [{ transport: 'WebSockets', transferFormats: ['Text'] }] },
  }));
  await page.routeWebSocket('**/hubs/supplier-verification*', (socket) => {
    state.socket = socket;
    socket.onMessage((message) => {
      if (String(message).includes('"protocol"')) {
        state.handshake = true;
        socket.send('{}\x1e');
      }
    });
  });
  await page.route('**/api/v1/**', async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const path = url.pathname.replace(/^.*\/api\/v1/, '');
    const ok = (data) => route.fulfill({ json: { status: 200, data } });
    if (path === '/auth/me') { state.authReads++; return ok(user()); }
    if (path === '/suppliers/me/onboarding') {
      state.commands.push({ path });
      state.requestedRole = 'Supplier';
      return ok(user());
    }
    if (path === '/suppliers/me') return ok(state.profile);
    if (path.endsWith('/history')) return ok({ items: [], totalCount: 0, page: 1, pageSize: 20 });
    if (path === '/notifications') return ok({ items: [], totalCount: 0, unreadCount: 0, readThroughToken: 'test-boundary' });
    if (path.endsWith('/content')) {
      state.contentReads = (state.contentReads || 0) + 1;
      state.contentAuthenticated = request.headers().authorization?.startsWith('Bearer ');
      if (state.contentError) return route.fulfill({ status: 403, json: {
        status: 403, errorCode: 'SUPPLIER_OPERATION_FORBIDDEN', message: 'Forbidden.',
      } });
      return route.fulfill({ contentType: state.contentMime || 'application/pdf',
        headers: { 'Content-Disposition': 'attachment; filename=certificate.pdf' },
        body: state.contentMime === 'image/png' ? Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aV1cAAAAASUVORK5CYII=', 'base64') :
          Buffer.from('%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\n%%EOF'),
      });
    }
    if (path === '/suppliers/me/documents' && request.method() === 'POST') {
      const type = request.postDataBuffer()?.includes(Buffer.from('FoodSafetyCertificate')) ? 'FoodSafetyCertificate' : 'BusinessLicense';
      const doc = { documentId: `00000000-0000-4000-8000-${String(++state.uploads).padStart(12, '0')}`,
        documentType: type, originalFileName: /filename="([^"]+)"/.exec(request.postData() || '')?.[1] || 'certificate.pdf', contentType: 'application/pdf',
        fileSizeBytes: 100, uploadStatus: state.uploadError ? 'Quarantined' : state.failUpload ? 'Failed' : 'Ready' };
      state.profile.stagedDocuments.push(doc);
      if (state.uploadError) return route.fulfill({ status: 415, json: {
        status: 415, errorCode: state.uploadError, message: 'Document inspection rejected the upload.',
      } });
      if (state.failUpload) return route.fulfill({ status: 503, json: {
        status: 503, errorCode: 'DOCUMENT_STORAGE_UNAVAILABLE', message: 'Document storage unavailable.',
      } });
      return ok(doc);
    }
    if (path === '/suppliers/me/apply') {
      const payload = request.postDataJSON();
      state.commands.push({ path, payload, key: request.headers()['idempotency-key'] });
      state.profile = { ...state.profile, ...payload, version: 1, onboardingState: 'Pending', verificationStatus: 'Pending',
        allowedActions: [], stagedDocuments: [], currentSubmission: { ...payload, id: submissionId, revision: 1,
          status: 'Pending', submittedAtUtc: new Date().toISOString(), documents: state.profile.stagedDocuments } };
      return ok({ profileId, version: 1, verificationStatus: 'Pending' });
    }
    if (path === '/suppliers/applications') return ok({ items: [{
      profileId, submissionId, revision: 1, version: 7, companyName: 'An Nhiên Test',
      taxCode: '0312345678', status: 'Pending', documentCount: 0, submittedAtUtc: new Date().toISOString(),
    }], totalCount: 1, page: 1, pageSize: 20 });
    if (path === `/suppliers/${profileId}/verification`) return ok(state.profile);
    if (path.endsWith('/review')) {
      state.commands.push({ path, payload: request.postDataJSON() });
      return route.fulfill({ status: 409, json: { status: 409, errorCode: 'SUPPLIER_VERSION_CONFLICT', message: 'Conflict.' } });
    }
    return route.fulfill({ status: 404, json: { status: 404, message: 'Unexpected test endpoint.' } });
  });
  return state;
}

test('ordinary Customer can start Supplier onboarding from the homepage without gaining selling rights', async ({ page }) => {
  const state = await mockSession(page, 'Customer', emptyProfile(), 'Customer');
  await page.goto('/');
  await page.getByRole('button', { name: /Đăng ký mở gian hàng/ }).click();
  await expect(page).toHaveURL(/#dang-ky-nha-cung-cap$/);
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.locator('.ant-layout-sider')).toHaveCount(0);
  await expect(page.getByText('Đăng ký trở thành nhà cung cấp', { exact: true })).toBeVisible();
  const start = page.getByRole('button', { name: 'Bắt đầu hồ sơ nhà cung cấp' });
  await expect(start).toBeDisabled();
  expect(state.commands).toHaveLength(0);
  await page.getByRole('checkbox').check();
  await start.click();
  await expect(page.getByRole('button', { name: /Tải giấy tờ lên/ })).toBeVisible();
  expect(state.commands.filter((command) => command.path === '/suppliers/me/onboarding')).toHaveLength(1);
  const account = await page.evaluate(() => JSON.parse(localStorage.getItem('mooncake_auth_user')));
  expect(account.role).toBe('Customer');
  expect(account.requestedRole).toBe('Supplier');
  expect(account.capabilities.canCreateShop).toBe(false);
  await expect(page.locator('.ant-layout-sider')).toHaveCount(0);
  await expect(page.getByRole('banner')).toBeVisible();
});

test('Customer awaiting Supplier approval can upload and submit an immutable application', async ({ page }) => {
  const state = await mockSession(page);
  await page.goto('/#nha-cung-cap/xac-minh');
  await expect(page.getByRole('heading', { name: 'Đăng ký mở gian hàng', exact: true })).toBeVisible();
  await expect(page.locator('.ant-layout-sider')).toHaveCount(0);
  await page.getByLabel('Tên doanh nghiệp').fill('An Nhiên Test');
  await page.getByLabel('Mã số thuế', { exact: true }).fill('0312345678');
  await page.getByLabel('Địa chỉ', { exact: true }).fill('TP. Hồ Chí Minh');
  const upload = () => page.locator('input[type=file]').setInputFiles({
    name: 'certificate.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.7 test document'),
  });
  await upload();
  await expect(page.getByText('Sẵn sàng', { exact: true })).toHaveCount(1);
  await page.getByLabel('Loại tài liệu', { exact: true }).click();
  await page.getByTitle('Chứng nhận an toàn thực phẩm', { exact: true }).click();
  await upload();
  await expect(page.getByText('Sẵn sàng', { exact: true })).toHaveCount(2);
  await page.getByRole('button', { name: 'Kiểm tra & gửi hồ sơ' }).click();
  const modal = page.getByRole('dialog', { name: 'Kiểm tra hồ sơ trước khi gửi' });
  await modal.getByRole('checkbox').check();
  await modal.getByRole('button', { name: 'Xác nhận gửi' }).click();
  await expect(page.getByText('Hồ sơ đang chờ Admin xét duyệt', { exact: true })).toBeVisible();
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.locator('.ant-layout-sider')).toHaveCount(0);
  expect(state.commands).toHaveLength(1);
  expect(state.commands[0].payload.documentIds).toHaveLength(2);
  expect(state.commands[0].payload.expectedVersion).toBe(0);
  expect(state.commands[0].key).toMatch(uuid);
});

test('plain Customer cannot open the Admin queue', async ({ page }) => {
  const state = await mockSession(page, 'Customer', emptyProfile(), 'Customer');
  await page.goto('/#admin/phe-duyet');
  await expect(page.getByText('Trang này dành cho quản trị viên', { exact: true })).toBeVisible();
  expect(state.commands).toHaveLength(0);
});

test('storage outage reports the service error and refreshes the failed document row', async ({ page }) => {
  const state = await mockSession(page);
  state.failUpload = true;
  await page.goto('/#dang-ky-nha-cung-cap');
  await page.locator('input[type=file]').setInputFiles({ name: 'certificate.pdf',
    mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.7 test document') });
  await expect(page.getByText('Dịch vụ kiểm tra/tải tài liệu đang chưa sẵn sàng. Vui lòng thử lại.')).toBeVisible();
  await expect(page.getByText('Thất bại', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Gỡ tài liệu chưa gửi' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Kiểm tra & gửi hồ sơ' })).toBeDisabled();
  expect(state.commands).toHaveLength(0);
});

for (const name of ['report.docx', 'archive.zip', 'program.exe', 'README', 'custom.data', 'contract.pdf']) {
  test(`document upload accepts ${name} without a file-type restriction`, async ({ page }) => {
    const state = await mockSession(page);
    await page.goto('/#dang-ky-nha-cung-cap');
    const input = page.locator('input[type=file]');
    await expect(input).not.toHaveAttribute('accept', /.+/);
    await input.setInputFiles({ name, mimeType: 'application/octet-stream', buffer: Buffer.from('arbitrary document bytes') });
    await expect(page.getByText('Đã tải tài liệu lên.', { exact: true })).toBeVisible();
    await expect(page.getByText(name, { exact: true })).toBeVisible();
    expect(state.uploads).toBe(1);
  });
}

for (const [size, message] of [[0, 'File không được rỗng.'], [10 * 1024 * 1024 + 1, 'File vượt quá 10 MiB.']]) {
  test(`invalid file size ${size} is rejected before upload`, async ({ page }) => {
    const state = await mockSession(page);
    await page.goto('/#dang-ky-nha-cung-cap');
    await page.locator('input[type=file]').setInputFiles({ name: 'data.anything', mimeType: 'application/octet-stream', buffer: Buffer.alloc(size) });
    await expect(page.getByText(message, { exact: true })).toBeVisible();
    expect(state.uploads).toBe(0);
  });
}

test('Admin version conflict does not approve locally or retry the decision automatically', async ({ page }) => {
  const state = await mockSession(page, 'Admin', submitted(), 'Admin');
  await page.goto('/#admin/phe-duyet');
  await page.getByRole('button', { name: 'Xem hồ sơ' }).click();
  await page.getByRole('button', { name: 'Phê duyệt', exact: true }).click();
  await page.getByRole('button', { name: 'Xác nhận quyết định' }).click();
  await expect(page.getByText('Hồ sơ đã thay đổi. Hãy tải phiên bản mới và kiểm tra lại.', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Xác nhận quyết định' })).toBeDisabled();
  expect(state.commands).toHaveLength(1);
  expect(state.profile.verificationStatus).toBe('Pending');
});

test('real SignalR client invalidates profile and account after an approval event', async ({ page }) => {
  const state = await mockSession(page, 'Customer', submitted());
  await page.goto('/#nha-cung-cap/xac-minh');
  await expect(page.getByText('Hồ sơ đang chờ Admin xét duyệt', { exact: true })).toBeVisible();
  await expect(page.locator('.ant-layout-sider')).toHaveCount(0);
  await expect.poll(() => state.handshake).toBe(true);
  state.profile = { ...state.profile, version: 8, onboardingState: 'Verified', verificationStatus: 'Verified' };
  state.role = 'Supplier';
  const event = JSON.stringify({ type: 1, target: 'SupplierVerificationChanged', arguments: [{
    schemaVersion: 1, eventId: 'test-approved', profileId, aggregateVersion: 8, eventType: 'SupplierVerificationApproved',
  }] }) + '\x1e';
  state.socket.send(event);
  state.socket.send(event);
  await expect(page.getByText('Doanh nghiệp đã được xác minh', { exact: true })).toBeVisible();
  await expect(page.locator('.ant-layout-sider')).toBeVisible();
  expect(state.authReads).toBeGreaterThan(1);
});

test('rejected and revoked applicants keep Customer layout for resubmission and notifications', async ({ page }) => {
  const profile = { ...submitted(), onboardingState: 'Rejected', verificationStatus: 'Rejected', allowedActions: ['UploadDocument', 'Submit'] };
  const state = await mockSession(page, 'Customer', profile);
  await page.goto('/#dang-ky-nha-cung-cap');
  await expect(page.getByRole('button', { name: /Tải giấy tờ lên/ })).toBeVisible();
  await expect(page.locator('.ant-layout-sider')).toHaveCount(0);
  state.profile = { ...profile, onboardingState: 'Revoked', verificationStatus: 'Revoked' };
  await page.reload();
  await expect(page.getByText('Quyền bán hàng mới đã bị thu hồi', { exact: true })).toBeVisible();
  await expect(page.locator('.ant-layout-sider')).toHaveCount(0);
  await page.goto('/#thong-bao');
  await expect(page.getByText('Thông báo xác minh nhà cung cấp', { exact: true })).toBeVisible();
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.locator('.ant-layout-sider')).toHaveCount(0);
});

for (const [role, mime, filename] of [
  ['Customer', 'application/pdf', 'certificate.pdf'],
  ['Customer', 'image/png', 'certificate.png'],
  ['Admin', 'application/pdf', 'certificate.pdf'],
]) {
  test(`${role} previews ${mime} in a modal without triggering a download`, async ({ page }) => {
    const document = { documentId: '55555555-5555-4555-8555-555555555555', originalFileName: filename,
      contentType: mime, documentType: 'BusinessLicense', uploadStatus: 'Ready' };
    const profile = role === 'Admin' ? submitted() : emptyProfile();
    if (role === 'Admin') profile.currentSubmission.documents = [document];
    else profile.stagedDocuments = [document];
    const state = await mockSession(page, role, profile, role === 'Admin' ? 'Admin' : 'Supplier');
    state.contentMime = mime;
    await page.addInitScript(() => {
      window.previewRevocations = [];
      const revoke = URL.revokeObjectURL.bind(URL);
      URL.revokeObjectURL = (url) => { window.previewRevocations.push(url); revoke(url); };
    });
    const downloads = [];
    page.on('download', (download) => downloads.push(download));
    await page.goto(role === 'Admin' ? '/#admin/phe-duyet' : '/#dang-ky-nha-cung-cap');
    if (role === 'Admin') await page.getByRole('button', { name: 'Xem hồ sơ' }).click();
    await page.getByRole('button', { name: `Xem ${filename}`, exact: true }).click();
    const modal = page.getByRole('dialog', { name: `Xem tài liệu: ${filename}` });
    const preview = mime === 'application/pdf' ? modal.locator('iframe') : modal.getByRole('img', { name: filename });
    await expect(preview).toBeVisible();
    await expect(preview).toHaveAttribute('src', /^blob:/);
    const objectUrl = await preview.getAttribute('src');
    expect(state.contentReads).toBe(1);
    expect(state.contentAuthenticated).toBe(true);
    expect(downloads).toHaveLength(0);
    await modal.getByRole('button', { name: 'Đóng xem trước' }).click();
    await expect(modal).toHaveCount(0);
    await expect.poll(() => page.evaluate((url) => window.previewRevocations.includes(url), objectUrl)).toBe(true);
  });
}

test('document preview displays authorization errors without exposing file content', async ({ page }) => {
  const profile = emptyProfile();
  profile.stagedDocuments = [{ documentId: '55555555-5555-4555-8555-555555555555',
    originalFileName: 'private.pdf', contentType: 'application/pdf', uploadStatus: 'Ready' }];
  const state = await mockSession(page, 'Customer', profile);
  state.contentError = true;
  await page.goto('/#dang-ky-nha-cung-cap');
  await page.getByRole('button', { name: 'Xem private.pdf', exact: true }).click();
  const modal = page.getByRole('dialog', { name: 'Xem tài liệu: private.pdf' });
  await expect(modal.getByRole('alert')).toContainText('Tài khoản hiện tại không có quyền thực hiện thao tác này.');
  await expect(modal.locator('iframe')).toHaveCount(0);
});
