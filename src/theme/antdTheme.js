/**
 * Ant Design Theme Configuration
 * Enterprise Luxury B2B Theme for Mooncake Marketplace (Nguyệt Phố)
 */

export const antdTheme = {
  token: {
    colorPrimary: '#8c1524', // Luxury Mooncake Crimson / Deep Wine
    colorPrimaryHover: '#a81c2d',
    colorPrimaryActive: '#6e0f1b',
    colorSuccess: '#2e7d32',
    colorWarning: '#d48806', // Imperial Gold
    colorError: '#cf1322',
    colorInfo: '#1677ff',
    borderRadius: 8,
    fontFamily: "'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontSize: 14,
    colorBgLayout: '#f5f5f7',
    colorBgContainer: '#ffffff',
  },
  components: {
    Layout: {
      siderBg: '#ffffff',
      headerBg: '#ffffff',
      bodyBg: '#f8f9fa',
    },
    Menu: {
      itemSelectedColor: '#8c1524',
      itemSelectedBg: '#fff1f0',
      itemHoverBg: '#fff5f5',
    },
    Card: {
      borderRadiusLG: 12,
      boxShadowTertiary: '0 2px 10px rgba(0, 0, 0, 0.04)',
    },
    Button: {
      borderRadius: 6,
      controlHeight: 36,
    },
    Table: {
      borderRadius: 8,
      headerBg: '#fafafa',
    },
  },
};

export default antdTheme;
