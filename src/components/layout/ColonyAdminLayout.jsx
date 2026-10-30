import VerificationBell from '../supplier-verification/VerificationBell';
import NotificationBell from '../notification/NotificationBell';
import { VERIFICATION_LABELS } from '../../constants/supplierVerification';
import { useState } from 'react';
import {
  Layout,
  Menu,
  Input,
  Badge,
  Dropdown,
  Avatar,
  Breadcrumb,
  Tag,
  Space,
  Button,
  Divider,
  Drawer,
  Grid,
} from 'antd';
import {
  DashboardOutlined,
  ShopOutlined,
  AppstoreOutlined,
  SolutionOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  CarOutlined,
  TrophyOutlined,
  SafetyCertificateOutlined,
  AuditOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';

const { Header, Sider, Content, Footer } = Layout;

export default function ColonyAdminLayout({
  role = 'Admin', // 'Admin' | 'Supplier'
  activeKey = 'admin/dashboard',
  onNavigate,
  title,
  subtitle,
  extra,
  children,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const screens = Grid.useBreakpoint();
  const compact = !screens.lg;
  const { user, logout } = useAuth();

  const isAdmin = role === 'Admin';

  const adminMenuItems = [
    { key: 'admin/gian-hang', icon: <ShopOutlined />, label: 'Quản lý gian hàng' },
    { key: 'admin/mau-gian-hang', icon: <AppstoreOutlined />, label: 'Mẫu giao diện gian hàng' },
    {
      key: 'admin/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard Tổng quan',
    },
    {
      key: 'admin/phe-duyet',
      icon: <SafetyCertificateOutlined />,
      label: (
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Duyệt Nhà cung cấp</span>

        </span>
      ),
    },
    {
      key: 'admin/van-hanh-giao-dich',
      icon: <AuditOutlined />,
      label: (
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Giao dịch & Tranh chấp</span>
          <Badge count={2} style={{ backgroundColor: '#d48806' }} />
        </span>
      ),
    },
    {
      key: 'admin/kiem-soat-he-thong',
      icon: <SettingOutlined />,
      label: 'Kiểm soát Hệ thống & Catalog',
    },
    {
      key: 'admin/dieu-khien',
      icon: <TeamOutlined />,
      label: 'Người dùng & Gian hàng',
    },
    {
      key: 'admin/ho-so',
      icon: <UserOutlined />,
      label: 'Hồ sơ Quản trị viên',
    },
  ];

  const supplierMenuItems = [
    { key: 'nha-cung-cap/giao-dien-gian-hang', icon: <SettingOutlined />, label: 'Giao diện gian hàng' },
    {
      key: 'nha-cung-cap/thiet-lap-gian-hang',
      icon: <ShopOutlined />,
      label: 'Thiết lập Gian hàng',
    },
    {
      key: 'nha-cung-cap/quan-ly-san-pham',
      icon: <AppstoreOutlined />,
      label: 'Sản phẩm & Biến thể',
    },
    {
      key: 'nha-cung-cap/dau-thau',
      icon: <SolutionOutlined />,
      label: (
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Đấu thầu RFQ & Báo giá</span>
          <Badge count={3} style={{ backgroundColor: '#8c1524' }} />
        </span>
      ),
    },
    {
      key: 'nha-cung-cap/quan-ly-don-hang',
      icon: <ShoppingOutlined />,
      label: (
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Đơn hàng & In ấn logo</span>
          <Badge count={2} style={{ backgroundColor: '#2e7d32' }} />
        </span>
      ),
    },
    {
      key: 'nha-cung-cap/quan-ly-hop-dong',
      icon: <FileTextOutlined />,
      label: 'Hợp đồng & Milestone',
    },
    {
      key: 'nha-cung-cap/quan-ly-giao-hang',
      icon: <CarOutlined />,
      label: 'Giao vận & Bằng chứng PoD',
    },
    {
      key: 'nha-cung-cap/xac-minh',
      icon: <TrophyOutlined />,
      label: (
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Hồ sơ xác minh doanh nghiệp</span>
          <Tag style={{ margin: 0, fontSize: 10 }}>{VERIFICATION_LABELS[user?.supplierVerification?.onboardingState] || 'Chưa xác minh'}</Tag>
        </span>
      ),
    },
  ];

  const currentMenuItems = isAdmin ? adminMenuItems : supplierMenuItems.map((item) => ({
    ...item,
    disabled: item.key !== 'nha-cung-cap/xac-minh' && !user?.capabilities?.canCreateShop &&
      !(user?.capabilities?.canFulfillExistingOrders && [
        'nha-cung-cap/quan-ly-don-hang', 'nha-cung-cap/quan-ly-hop-dong',
        'nha-cung-cap/quan-ly-giao-hang',
      ].includes(item.key)),
  }));

  const handleMenuClick = ({ key }) => {
    setMobileMenuOpen(false);
    onNavigate?.(key);
  };



  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: isAdmin ? 'Hồ sơ Quản trị' : 'Hồ sơ Xưởng bánh',
      onClick: () => onNavigate?.(isAdmin ? 'admin/ho-so' : 'nha-cung-cap/ho-so'),
    },
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Về Cổng Khách hàng (B2B)',
      onClick: () => onNavigate?.('trang-chu'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      danger: true,
      label: 'Đăng xuất',
      onClick: async () => {
        await logout();
        onNavigate?.('trang-chu');
      },
    },
  ];


  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f7' }}>
      {/* Sider Colony Style */}
      {!compact && <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(val) => setCollapsed(val)}
        width={260}
        theme="light"
        style={{
          boxShadow: '1px 0 10px rgba(0, 0, 0, 0.05)',
          zIndex: 100,
          position: 'sticky',
          top: 0,
          height: '100vh',
          left: 0,
        }}
      >
        {/* Brand Logo Header */}
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? 0 : '0 20px',
            borderBottom: '1px solid #f0f0f0',
            cursor: 'pointer',
          }}
          onClick={() => onNavigate?.(isAdmin ? 'admin/dashboard' : 'nha-cung-cap/thiet-lap-gian-hang')}
        >
          <img
            src="/logo.svg"
            alt="Nguyệt Phố Logo"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              boxShadow: '0 2px 6px rgba(140, 21, 36, 0.2)',
              marginRight: collapsed ? 0 : 12,
              flexShrink: 0,
            }}
          />
          {!collapsed && (
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#8c1524', letterSpacing: '-0.3px' }}>
                Nguyệt Phố B2B
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <Tag color={isAdmin ? 'volcano' : 'gold'} style={{ margin: 0, fontSize: 10, padding: '0 4px', lineHeight: '16px' }}>
                  {isAdmin ? 'HQ Admin' : 'Xưởng Cung Cấp'}
                </Tag>
                <span style={{ fontSize: 10, color: '#999' }}>Colony v4.5</span>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Menu */}
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          items={currentMenuItems}
          onClick={handleMenuClick}
          style={{ borderRight: 0, marginTop: 8 }}
        />
      </Sider>}
      {compact && <Drawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} placement="left"
        title={isAdmin ? 'Quản trị sàn' : 'Kênh nhà cung cấp'} size={280} styles={{ body: { padding: 0 } }}>
        <Menu selectedKeys={[activeKey]} items={currentMenuItems} onClick={handleMenuClick} />
      </Drawer>}

      {/* Main Layout Area */}
      <Layout style={{ minWidth: 0 }}>
        {/* Colony Header */}
        <Header
          style={{
            background: '#ffffff',
            padding: compact ? '0 12px' : '0 24px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #f0f0f0',
            position: 'sticky',
            top: 0,
            zIndex: 90,
          }}
        >
          {/* Left: Collapse Button + Breadcrumbs */}
          <Space orientation="horizontal" size="middle">
            <Button
              type="text"
              icon={compact || collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              aria-label="Mở điều hướng"
              onClick={() => compact ? setMobileMenuOpen(true) : setCollapsed(!collapsed)}
              style={{ fontSize: 16, width: 36, height: 36 }}
            />
            {!compact && <Breadcrumb
              items={[
                { title: <HomeOutlined onClick={() => onNavigate?.('trang-chu')} style={{ cursor: 'pointer' }} /> },
                { title: isAdmin ? 'Ban Quản Trị HQ' : 'Kênh Nhà Cung Cấp' },
                { title: title || 'Tổng quan' },
              ]}
            />}
          </Space>

          {/* Right: Search, Role Switcher, Notifications, User */}
          <Space size="middle" align="center">
            {/* Global Search */}
            {!compact && <Input
              placeholder={isAdmin ? 'Tìm mã RFQ, HĐ, MST, SKU...' : 'Tra cứu đơn B2B, SKU, phiên RFQ...'}
              prefix={<SearchOutlined style={{ color: '#aaa' }} />}
              style={{ width: 220, borderRadius: 20 }}
            />}

            {/* Notifications */}
            <NotificationBell onNavigate={onNavigate} />
            <VerificationBell onNavigate={onNavigate} />

            <Divider orientation="vertical" style={{ height: 24, margin: '0 4px' }} />

            {/* User Profile */}
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <Space style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: 6 }}>
                <Avatar
                  style={{
                    backgroundColor: isAdmin ? '#8c1524' : '#d48806',
                    verticalAlign: 'middle',
                  }}
                >
                  {isAdmin ? 'AD' : 'NCC'}
                </Avatar>
                <div style={{ lineHeight: 1.2, textAlign: 'left', display: compact ? 'none' : 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>
                    {user?.fullName || (isAdmin ? 'Quản trị viên' : 'Tài khoản nhà cung cấp')}
                  </span>
                  <span style={{ fontSize: 11, color: '#888' }}>
                    {isAdmin ? 'Quản trị viên' : VERIFICATION_LABELS[user?.supplierVerification?.onboardingState] || 'Chưa xác minh'}
                  </span>
                </div>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        {/* Colony Content Area */}
        <Content style={{ margin: compact ? '16px 12px 0' : '20px 24px 0', overflow: 'initial', minWidth: 0 }}>
          {/* Page Banner / Header */}
          {(title || extra) && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 16,
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 20,
                background: '#ffffff',
                padding: '16px 20px',
                borderRadius: 10,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              <div>
                <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1f1f1f' }}>{title}</h1>
                {subtitle && <p style={{ margin: '4px 0 0', color: '#666', fontSize: 13 }}>{subtitle}</p>}
              </div>
              {extra && <div>{extra}</div>}
            </div>
          )}

          {/* Child Page Views */}
          <div style={{ minHeight: 480 }}>{children}</div>
        </Content>

        {/* Colony Footer */}
        <Footer style={{ textAlign: 'center', color: '#999', fontSize: 12, padding: '24px 50px' }}>
          Nguyệt Phố B2B Marketplace © 2025 · Hệ thống Sàn Giao Dịch Bánh Trung Thu Doanh Nghiệp Chuẩn Enterprise
        </Footer>
      </Layout>
    </Layout>
  );
}
