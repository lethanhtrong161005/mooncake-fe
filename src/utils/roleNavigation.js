const CUSTOMER_ONBOARDING_ROUTES = new Set([
  'dang-ky-nha-cung-cap',
  'nha-cung-cap/xac-minh',
  'nha-cung-cap/ho-so',
]);

export function roleHomeRoute(account) {
  if (account?.role === 'Admin') return 'admin/dashboard';
  if (account?.role === 'Supplier') return 'nha-cung-cap/dashboard';
  return 'trang-chu';
}

export function postLoginRoute(account, returnPage) {
  const home = roleHomeRoute(account);
  if (home !== 'trang-chu') return home;

  const target = typeof returnPage === 'string' ? returnPage.replace(/^#?\/?/, '') : '';
  const path = target.split('?')[0];
  if (target && path !== 'trang-chu' &&
      (!path.startsWith('admin/') && !path.startsWith('nha-cung-cap/') ||
        CUSTOMER_ONBOARDING_ROUTES.has(path))) {
    return target;
  }
  return account?.requestedRole === 'Supplier' ? 'dang-ky-nha-cung-cap' : home;
}
