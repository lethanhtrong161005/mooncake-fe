export function currentRoute() {
  const match = /^\/shop\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/.exec(window.location.pathname);
  return match ? `shop/${match[1]}` : decodeURI(window.location.hash.slice(1)) || 'trang-chu';
}

export function routeUrl(key) {
  return key.startsWith('shop/') ? `/${key}` : `/#${encodeURI(key)}`;
}
