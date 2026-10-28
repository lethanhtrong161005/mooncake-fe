import { test, expect } from '@playwright/test';
import process from 'node:process';

// Opt-in read-only smoke test against the running API; no database fixtures or account credentials.
test('running API exposes the FE contracts and permits the configured frontend origin', async ({ request }) => {
  test.skip(!process.env.LIVE_API_ORIGIN, 'Set LIVE_API_ORIGIN to run the live API contract check.');
  const origin = process.env.LIVE_API_ORIGIN;
  const swagger = await request.get(`${origin}/swagger/v1/swagger.json`);
  expect(swagger.ok()).toBeTruthy();
  const schema = await swagger.json();
  for (const path of ['/api/v1/auth/register', '/api/v1/auth/verify-email',
    '/api/v1/auth/resend-verification', '/api/v1/suppliers/me/onboarding', '/api/v1/suppliers/me', '/api/v1/suppliers/me/apply',
    '/api/v1/suppliers/me/documents', '/api/v1/suppliers/applications',
    '/api/v1/suppliers/{profileId}/review', '/api/v1/suppliers/{profileId}/revoke', '/api/v1/notifications',
    '/api/v1/shops/me', '/api/v1/shops/me/appearance', '/api/v1/shops/me/visibility', '/api/v1/shops/me/media',
    '/api/v1/shops/me/preview', '/api/v1/shops/{slug}', '/api/v1/shops/{slug}/products',
    '/api/v1/shops/{slug}/categories', '/api/v1/shops/{slug}/reviews', '/api/v1/shop-templates',
    '/api/v1/admin/shops', '/api/v1/admin/shops/{shopId}/status', '/api/v1/admin/shop-templates']) {
    expect(schema.paths[path], path).toBeDefined();
  }
  expect(schema.components.schemas.RegisterRequest.properties.role).toBeDefined();
  expect(schema.components.schemas.VerifyEmailRequest.properties.code).toBeDefined();
  const preflight = await request.fetch(`${origin}/api/v1/suppliers/applications`, {
    method: 'OPTIONS', headers: { Origin: 'http://localhost:5173',
      'Access-Control-Request-Method': 'GET', 'Access-Control-Request-Headers': 'authorization' },
  });
  expect(preflight.status()).toBe(204);
  expect(preflight.headers()['access-control-allow-origin']).toBe('http://localhost:5173');
  const protectedResponse = await request.get(`${origin}/api/v1/suppliers/applications`);
  expect(protectedResponse.status()).toBe(401);
  const onboarding = await request.post(`${origin}/api/v1/suppliers/me/onboarding`, { data: {} });
  expect(onboarding.status()).toBe(401);
  expect((await request.get(`${origin}/api/v1/shops/me`)).status()).toBe(401);
  const publicShop = await request.get(`${origin}/api/v1/shops/smoke-shop-does-not-exist`);
  expect(publicShop.status()).toBe(404);
  expect((await publicShop.json()).errorCode).toBe('SHOP_UNAVAILABLE');
});
