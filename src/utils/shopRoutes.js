export function currentRoute() {
  const match = /^\/shop\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/.exec(window.location.pathname);
  if (match) return `shop/${match[1]}`;
  const raw = decodeURI(window.location.hash.slice(1)).replace(/^\/+/, '');
  const queryIdx = raw.indexOf('?');
  const clean = queryIdx !== -1 ? raw.substring(0, queryIdx) : raw;
  return clean || 'trang-chu';
}

export function routeUrl(key) {
  return key.startsWith('shop/') ? `/${key}` : `/#${encodeURI(key)}`;
}
