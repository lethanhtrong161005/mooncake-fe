/**
 * Safe LocalStorage & SessionStorage Helper
 */

const STORAGE_PREFIX = 'mooncake_';

export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn(`[Storage] Failed to read ${key}:`, e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn(`[Storage] Failed to write ${key}:`, e);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
      return true;
    } catch (e) {
      console.warn(`[Storage] Failed to remove ${key}:`, e);
      return false;
    }
  },

  clear() {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(STORAGE_PREFIX))
        .forEach((k) => localStorage.removeItem(k));
      return true;
    } catch (e) {
      console.warn('[Storage] Failed to clear items:', e);
      return false;
    }
  },
};

export default storage;
