import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'http://localhost:8089';
const EVIDENCE_DIR = path.resolve('d:/PRN232/mooncake-fe/.agents/evidence/P3');
const API_DIR = path.join(EVIDENCE_DIR, 'api');

fs.mkdirSync(API_DIR, { recursive: true });

async function api(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    ...(options.headers || {})
  };
  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  let json = null;
  const text = await res.text();
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  return { status: res.status, ok: res.ok, data: json };
}

async function login(phoneNumber, password = 'Password123!') {
  const res = await api('/api/v1/auth/login', {
    method: 'POST',
    body: { phoneNumber, password }
  });
  if (!res.ok || !res.data?.data?.accessToken) {
    throw new Error(`Failed to log in as ${phoneNumber}: ${JSON.stringify(res.data)}`);
  }
  return res.data.data.accessToken;
}

async function main() {
  console.log('--- Logging in test accounts ---');
  const tokenCustA = await login('0988000101');
  const tokenCustB = await login('0988000102');
  const tokenSupA = await login('0988000103');
  const tokenSupB = await login('0988000104');
  const tokenAdmin = await login('0988000106');
  console.log('Tokens obtained successfully.');

  // Fetch shopA ID
  const meRes = await api('/api/v1/suppliers/me/order-policy', { token: tokenSupA });
  const shopId = meRes.data?.data?.policy?.shopId || 'bbd5db09-f029-43ab-903d-524a4a65fac6';
  const prodPackagingId = '022deb30-1359-45e4-b0c9-2be003237dc7';
  const varPackaging1Id = '26903438-d59d-4409-b484-415e5c209c12';
  const varPackaging2Id = 'e2945aa5-650f-4b5f-b1d1-b83af9cc1697';

  // 1. Authoritative Quote Preview
  console.log('1. Testing Authoritative Quote Preview...');
  const previewReq = {
    shopId,
    shippingZoneCode: 'HCM_INNER',
    items: [
      { productId: prodPackagingId, variantId: varPackaging1Id, quantity: 50 },
      { productId: prodPackagingId, variantId: varPackaging2Id, quantity: 50 }
    ],
    customPackagingBrief: {
      boxStyle: 'Premium Gold Leaf Box',
      pantoneColorCode: 'PANTONE 872 C',
      notes: 'Debossed gold foil enterprise branding'
    }
  };
  const previewRes = await api('/api/v1/orders/preview', {
    method: 'POST',
    token: tokenCustA,
    body: previewReq
  });
  fs.writeFileSync(
    path.join(API_DIR, '01_quote_preview_authoritative.json'),
    JSON.stringify({ request: previewReq, response: previewRes }, null, 2)
  );

  // 2. Order Creation & Idempotency Matrix
  console.log('2. Testing Order Creation & Idempotency Matrix...');
  const idempotencyKey = `P3-IDEMP-${Date.now()}`;
  const expectedDate = new Date();
  expectedDate.setDate(expectedDate.getDate() + 15);
  const deliveryDateExpected = expectedDate.toISOString().split('T')[0];

  const orderReq = {
    shopId,
    shippingZoneCode: 'HCM_INNER',
    deliveryAddress: '101 Le Loi, District 1, Ho Chi Minh City',
    recipientName: 'Enterprise Procurement Alpha',
    recipientPhone: '0988000101',
    deliveryDateExpected,
    acceptedPriceVersion: previewRes.data?.data?.priceVersion,
    notes: 'Urgent festival delivery batch',
    items: [
      { productId: prodPackagingId, variantId: varPackaging1Id, quantity: 50 }
    ],
    customPackagingBrief: {
      boxStyle: 'Corporate Hexagonal Box',
      pantoneColorCode: 'PANTONE 186 C',
      notes: 'Red lacquer finish with corporate logo'
    }
  };

  // Call 1: New order creation
  const create1 = await api('/api/v1/orders', {
    method: 'POST',
    token: tokenCustA,
    headers: { 'Idempotency-Key': idempotencyKey },
    body: orderReq
  });

  // Call 2: Exact duplicate key & body -> should return 200/201 with SAME orderId
  const create2 = await api('/api/v1/orders', {
    method: 'POST',
    token: tokenCustA,
    headers: { 'Idempotency-Key': idempotencyKey },
    body: orderReq
  });

  // Call 3: Same key with ALTERED body -> should return 409 Conflict
  const alteredReq = { ...orderReq, recipientName: 'Malicious Hijacker' };
  const create3 = await api('/api/v1/orders', {
    method: 'POST',
    token: tokenCustA,
    headers: { 'Idempotency-Key': idempotencyKey },
    body: alteredReq
  });

  const createdOrderId = create1.data?.data?.id;
  fs.writeFileSync(
    path.join(API_DIR, '02_order_creation_idempotency_matrix.json'),
    JSON.stringify({
      idempotencyKey,
      call1_initial_creation: { status: create1.status, orderId: createdOrderId },
      call2_exact_replay: { status: create2.status, orderId: create2.data?.data?.id, matched: create2.data?.data?.id === createdOrderId },
      call3_altered_payload_conflict: { status: create3.status, error: create3.data }
    }, null, 2)
  );

  // 3. Order State Transitions & Negotiation
  console.log('3. Testing Order State Transitions...');
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + 20);
  const proposedDeliveryDate = newDate.toISOString().split('T')[0];

  // Supplier proposes new delivery date
  const proposeRes = await api(`/api/v1/orders/${createdOrderId}/propose-delivery-date`, {
    method: 'POST',
    token: tokenSupA,
    body: { proposedDeliveryDate, reason: 'High packaging production queue at workshop' }
  });

  // Customer responds to proposal (Approve)
  const respondRes = await api(`/api/v1/orders/${createdOrderId}/delivery-proposal/respond`, {
    method: 'POST',
    token: tokenCustA,
    body: { approve: true, responseNote: 'Approved revised delivery timeline' }
  });

  // Order detail after proposal acceptance
  const detailRes = await api(`/api/v1/orders/${createdOrderId}`, { token: tokenCustA });

  fs.writeFileSync(
    path.join(API_DIR, '03_order_state_transitions_matrix.json'),
    JSON.stringify({
      orderId: createdOrderId,
      supplier_proposal: proposeRes,
      customer_response: respondRes,
      order_state_after_approval: {
        status: detailRes.data?.data?.status,
        confirmedDeliveryDate: detailRes.data?.data?.confirmedDeliveryDate,
        allowedActions: detailRes.data?.data?.allowedActions
      }
    }, null, 2)
  );

  // 4. Multi-Part VNPay URL Generation
  console.log('4. Testing Multi-part VNPay URL Generation...');
  const paymentSummaryRes = await api(`/api/v1/orders/${createdOrderId}/payment-summary`, { token: tokenCustA });
  const firstObligation = paymentSummaryRes.data?.data?.obligations?.[0];
  const firstPart = firstObligation?.parts?.[0];

  let vnpUrlRes = null;
  if (firstPart) {
    vnpUrlRes = await api(`/api/v1/orders/${createdOrderId}/payment-parts/${firstPart.id}/vnpay-url`, {
      method: 'POST',
      token: tokenCustA,
      body: { returnUrl: 'http://localhost:5173/#/thanh-toan/ket-qua' }
    });
  }

  fs.writeFileSync(
    path.join(API_DIR, '04_multipart_vnpay_url_generation.json'),
    JSON.stringify({
      orderId: createdOrderId,
      paymentSummary: paymentSummaryRes.data?.data,
      firstPartRequested: firstPart,
      vnpayUrlResult: vnpUrlRes?.data
    }, null, 2)
  );

  // 5. PoD Submission & Customer Receipt Confirmation Flow
  console.log('5. Testing PoD Submission & Customer Confirmation Flow...');
  // Create an order specifically to test shipment & PoD
  const podOrderReq = {
    shopId,
    shippingZoneCode: 'HCM_INNER',
    deliveryAddress: '202 Nguyen Hue, District 1, Ho Chi Minh City',
    recipientName: 'PoD Receiver Alpha',
    recipientPhone: '0988000101',
    deliveryDateExpected,
    acceptedPriceVersion: previewRes.data?.data?.priceVersion,
    items: [{ productId: prodPackagingId, variantId: varPackaging1Id, quantity: 50 }]
  };
  const podOrderCreate = await api('/api/v1/orders', {
    method: 'POST',
    token: tokenCustA,
    headers: { 'Idempotency-Key': `P3-POD-${Date.now()}` },
    body: podOrderReq
  });
  const podOrderId = podOrderCreate.data?.data?.id;

  // Confirm order
  await api(`/api/v1/orders/${podOrderId}/confirm`, { method: 'POST', token: tokenSupA });
  // Move to processing
  await api(`/api/v1/orders/${podOrderId}/processing`, { method: 'POST', token: tokenSupA });
  // Ship order
  const shipRes = await api(`/api/v1/orders/${podOrderId}/ship`, { method: 'POST', token: tokenSupA });

  // Get active delivery
  const deliveryListRes = await api(`/api/v1/deliveries/order/${podOrderId}`, { token: tokenSupA });
  const deliveryId = deliveryListRes.data?.data?.id;

  // Supplier submits proof photo
  let proofSubmitRes = null;
  if (deliveryId) {
    proofSubmitRes = await api(`/api/v1/deliveries/${deliveryId}/proof`, {
      method: 'POST',
      token: tokenSupA,
      body: {
        proofType: 'Photo',
        recipientSignatureName: 'Nguyen Van Nhan Hang',
        proofPhotoUrls: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48'],
        notes: 'Handed over at building loading dock with recipient signature stamp'
      }
    });
  }

  // Customer confirms receipt
  const confirmReceiptRes = await api(`/api/v1/orders/${podOrderId}/delivery/confirm-receipt`, {
    method: 'POST',
    token: tokenCustA,
    body: { rating: 5, feedback: 'Delivery on time and packaging pristine.' }
  });

  const finalPodOrderRes = await api(`/api/v1/orders/${podOrderId}`, { token: tokenCustA });

  fs.writeFileSync(
    path.join(API_DIR, '05_pod_submission_and_customer_confirmation.json'),
    JSON.stringify({
      orderId: podOrderId,
      shipment: shipRes.data,
      deliveryId,
      supplierProofSubmission: proofSubmitRes?.data,
      customerReceiptConfirmation: confirmReceiptRes.data,
      finalOrderStatus: finalPodOrderRes.data?.data?.status
    }, null, 2)
  );

  // 6. Role-Based Access Control (RBAC) Matrix
  console.log('6. Testing Role-Based Access Control Matrix...');
  const rbacTests = [
    {
      action: 'Unauthenticated GET /api/v1/orders/mine',
      call: () => api('/api/v1/orders/mine'),
      expectedStatus: 401
    },
    {
      action: 'Customer calls Supplier endpoint /api/v1/orders/supplier',
      call: () => api('/api/v1/orders/supplier', { token: tokenCustA }),
      expectedStatus: 403
    },
    {
      action: 'Cross-tenant Supplier B attempts GET /api/v1/orders/{orderId} of Shop A',
      call: () => api(`/api/v1/orders/${createdOrderId}`, { token: tokenSupB }),
      expectedStatus: 404
    },
    {
      action: 'Customer attempts POST /api/v1/orders/{orderId}/confirm (Supplier only)',
      call: () => api(`/api/v1/orders/${createdOrderId}/confirm`, { method: 'POST', token: tokenCustA }),
      expectedStatuses: [403, 404]
    },
    {
      action: 'Supplier attempts POST /api/v1/admin/orders/refund-cases/{id}/process (Admin only)',
      call: () => api(`/api/v1/admin/orders/refund-cases/00000000-0000-0000-0000-000000000000/process`, {
        method: 'POST',
        token: tokenSupA,
        body: { approve: true, approvedAmount: 1000 }
      }),
      expectedStatuses: [403]
    },
    {
      action: 'Admin accesses /api/v1/admin/orders/operations (Admin only)',
      call: () => api('/api/v1/admin/orders/operations', { token: tokenAdmin }),
      expectedStatuses: [200]
    }
  ];

  const rbacResults = [];
  for (const test of rbacTests) {
    const res = await test.call();
    const expected = test.expectedStatuses || [test.expectedStatus];
    const passed = expected.includes(res.status);
    console.log(`  [RBAC] ${test.action} => Status ${res.status} (Expected ${expected.join('/')}) - ${passed ? 'PASS' : 'FAIL'}`);
    rbacResults.push({
      action: test.action,
      expectedStatuses: expected,
      actualStatus: res.status,
      passed,
      responseSummary: res.data?.message || res.data?.error || res.data?.title || 'OK'
    });
  }

  fs.writeFileSync(
    path.join(API_DIR, '06_role_based_access_control_matrix.json'),
    JSON.stringify(rbacResults, null, 2)
  );

  // 7. Browser Screenshots of Swagger UI
  console.log('7. Capturing Swagger UI Browser Screenshots with Playwright (using installed Chrome)...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1400, height: 1200 } });
  const page = await context.newPage();

  await page.goto(`${BASE_URL}/swagger/index.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Expand Orders tag
  console.log('Capturing Swagger Orders endpoints...');
  const ordersTag = page.locator('h3:has-text("Orders")').first();
  if (await ordersTag.count() > 0) {
    await ordersTag.click();
    await page.waitForTimeout(1000);
  }
  await page.screenshot({
    path: path.join(EVIDENCE_DIR, '01_swagger_orders_endpoints.png'),
    fullPage: false
  });

  // Expand Admin and Supplier tags
  console.log('Capturing Swagger Admin and Supplier operations...');
  const adminTag = page.locator('h3:has-text("AdminOrderOperations")').first();
  if (await adminTag.count() > 0) {
    await adminTag.click();
  }
  const supTag = page.locator('h3:has-text("SupplierOrderOperations")').first();
  if (await supTag.count() > 0) {
    await supTag.click();
  }
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(EVIDENCE_DIR, '02_swagger_admin_and_supplier_operations.png'),
    fullPage: false
  });

  // Expand Deliveries and Packaging
  console.log('Capturing Swagger Deliveries and CustomPackaging...');
  const delivTag = page.locator('h3:has-text("Deliveries")').first();
  if (await delivTag.count() > 0) {
    await delivTag.click();
  }
  const packTag = page.locator('h3:has-text("CustomPackaging")').first();
  if (await packTag.count() > 0) {
    await packTag.click();
  }
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(EVIDENCE_DIR, '03_swagger_deliveries_and_packaging.png'),
    fullPage: false
  });

  await browser.close();
  console.log('=== Pha 3 Evidence Capture Completed Successfully! ===');
}

main().catch(err => {
  console.error('Fatal Error during Pha 3 evidence capture:', err);
  process.exit(1);
});