import { THEME_DEFAULTS } from '../constants/shop';

export const effectiveTheme = (defaults = {}, overrides = {}) => ({ ...THEME_DEFAULTS, ...defaults,
  ...Object.fromEntries(Object.entries(overrides).filter(([, value]) => value !== null && value !== undefined)) });

export function colorContrast(a, b) {
  const luminance = (hex) => {
    if (!/^#[0-9a-f]{6}$/i.test(hex)) return 0;
    const channels = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255)
      .map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const x = luminance(a); const y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

export const hasThemeContrast = (tokens) => !!tokens && ['textColor', 'backgroundColor', 'surfaceColor', 'buttonTextColor', 'primaryColor']
  .every((key) => /^#[0-9a-f]{6}$/i.test(tokens[key])) && colorContrast(tokens.textColor, tokens.backgroundColor) >= 4.5 &&
  colorContrast(tokens.textColor, tokens.surfaceColor) >= 4.5 && colorContrast(tokens.buttonTextColor, tokens.primaryColor) >= 4.5;

export function shopVariables(tokens) {
  const value = effectiveTheme(tokens);
  return { '--shop-primary': value.primaryColor, '--shop-background': value.backgroundColor,
    '--shop-text': value.textColor, '--shop-surface': value.surfaceColor, '--shop-button-text': value.buttonTextColor,
    '--shop-radius': `${value.borderRadiusPx}px`, '--shop-font-scale': value.fontScale };
}

export function setShopFormErrors(form, error) {
  const errors = error?.data?.validationErrors;
  if (errors) form.setFields(errors.map((item) => ({
    name: item.field.replace(/^\$\./, '').split('.').map((part) => part[0]?.toLowerCase() + part.slice(1)),
    errors: [item.message],
  })));
}

export const formatShopPrice = (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value);
