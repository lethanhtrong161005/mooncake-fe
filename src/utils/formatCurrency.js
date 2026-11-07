export function formatNumber(value) {
  return Number(value || 0).toLocaleString('vi-VN');
}

export function formatVnd(value) {
  return `${formatNumber(value)} đ`;
}

export function formatPriceRange(minPrice, maxPrice, fallbackPrice = 0) {
  const resolvedMin = Number(minPrice ?? fallbackPrice ?? 0);
  const resolvedMax = Number(maxPrice ?? resolvedMin);
  if (resolvedMax > resolvedMin) {
    return `${formatNumber(resolvedMin)} – ${formatNumber(resolvedMax)} đ`;
  }
  return `${formatNumber(resolvedMin)} đ`;
}

