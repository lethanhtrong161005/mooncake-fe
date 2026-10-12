/**
 * Input Validation Utilities
 */

/**
 * Validate Vietnamese Mobile Phone Number
 * Format: 10 digits starting with 03, 05, 07, 08, 09 or +84
 * @param {string} phone
 * @returns {boolean}
 */
export function validatePhone(phone) {
  if (!phone) return false;
  const cleaned = String(phone).trim().replace(/\s+/g, '');
  const phoneRegex = /^(84|0)(3|5|7|8|9)[0-9]{8}$/;
  return phoneRegex.test(cleaned);
}

/**
 * Validate password requirements
 * @param {string} password
 * @param {number} minLength
 * @returns {{ isValid: boolean, error?: string }}
 */
export function validatePassword(password, minLength = 6) {
  if (!password) {
    return { isValid: false, error: 'Mật khẩu không được để trống' };
  }
  if (password.length < minLength) {
    return { isValid: false, error: `Mật khẩu phải có ít nhất ${minLength} ký tự` };
  }
  return { isValid: true };
}

/**
 * Validate email address
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email) {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).trim());
}

/**
 * Validate Vietnamese Tax Code (Mã số thuế)
 * Format: 10 digits or 10-3 digits (e.g., 0108923481 or 0108923481-001)
 * @param {string} taxCode
 * @returns {boolean}
 */
export function validateTaxCode(taxCode) {
  if (!taxCode) return false;
  const taxRegex = /^[0-9]{10}(-[0-9]{3})?$/;
  return taxRegex.test(String(taxCode).trim());
}

export default {
  validatePhone,
  validatePassword,
  validateEmail,
  validateTaxCode,
};
