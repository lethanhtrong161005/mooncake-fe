/**
 * Ant Design Theme Configuration
 * Enterprise Luxury B2B Theme for Mooncake Marketplace (Nguyệt Phố)
 */

export const antdTheme = {
  token: {
    colorPrimary: '#7d1322', // Luxury Mooncake Ruby / Deep Lacquer
    colorPrimaryHover: '#96192b',
    colorPrimaryActive: '#5c0c17',
    colorSuccess: '#2d5a43',
    colorWarning: '#9a6b16', // Imperial Gold
    colorError: '#cf1322',
    colorInfo: '#1677ff',
    borderRadius: 8,
    fontFamily: "'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontSize: 14,
    colorBgLayout: '#faf9f6',
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
      borderRadius: 8,
      controlHeight: 36,
      primaryShadow: 'none',
      colorBgContainerDisabled: '#f3ede6',
      colorTextDisabled: '#8c7f77',
      borderColorDisabled: '#dfd6cb',
    },
    Table: {
      borderRadius: 8,
      headerBg: '#fafafa',
    },
  },
};

export default antdTheme;
