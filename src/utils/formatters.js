/**
 * Utility Formatters for Currency, Dates, and Text
 */

/**
 * Format currency to Vietnamese Đồng (VNĐ)
 * @param {number|string} amount
 * @returns {string} e.g. "480.000 ₫"
 */
export function formatCurrency(amount) {
  if (amount == null || isNaN(amount)) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

/**
 * Format date string to Vietnamese localized format
 * @param {string|Date} date
 * @param {boolean} includeTime
 * @returns {string} e.g. "12/10/2026" or "14:30 12/10/2026"
 */
export function formatDate(date, includeTime = false) {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  if (includeTime) {
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  }

  return `${day}/${month}/${year}`;
}

/**
 * Format Vietnamese phone number nicely
 * @param {string} phone
 * @returns {string} e.g. "0912 345 678"
 */
export function formatPhoneNumber(phone) {
  if (!phone) return '';
  const cleaned = String(phone).replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
}

/**
 * Truncate text with ellipsis
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncateText(text, maxLength = 60) {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export default {
  formatCurrency,
  formatDate,
  formatPhoneNumber,
  truncateText,
};
