export function currentRoute() {
  try {
    const path = decodeURI(window.location.pathname).replace(/^\/+|\/+$/g, '');
    return !path || path === 'index.html' ? 'trang-chu' : path;
  } catch {
    return '__not_found__';
  }
}

export function currentRouteQuery() {
  return window.location.search;
}

export function routeUrl(key) {
  return `/${encodeURI(String(key || 'trang-chu').replace(/^\/+/, ''))}`;
}

export function normalizeLegacyRoute() {
  const legacy = window.location.hash.replace(/^#\/?/, '');
  if (legacy && ['/', '/index.html'].includes(window.location.pathname)) {
    const [path, ...query] = legacy.split('?');
    window.history.replaceState(null, '', `${routeUrl(path)}${query.length ? `?${query.join('?')}` : ''}`);
  } else if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    window.history.replaceState(null, '', `${routeUrl('trang-chu')}${window.location.search}`);
  }
}
