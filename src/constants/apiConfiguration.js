// REST and SignalR must resolve to the same backend, including when .env is absent.
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:8089/api').replace(/\/$/, '');

const apiLocation = new URL(API_BASE_URL, window.location.origin);
export const VERIFICATION_HUB_URL = new URL(
  `${apiLocation.pathname.replace(/\/api\/?$/, '')}/hubs/supplier-verification`,
  apiLocation.origin
).href;
