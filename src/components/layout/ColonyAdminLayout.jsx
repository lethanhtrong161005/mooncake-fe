import { VERIFICATION_LABELS } from '../../constants/supplierVerification';
import { useState } from 'react';
import {
  Layout,
  Menu,
  Badge,
  Dropdown,
  Avatar,
  Breadcrumb,
  Tag,
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
  GiftOutlined,
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
  MessageOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';
import { useNotifications } from '../../hooks/useNotifications';
import { useVerificationNotifications } from '../../hooks/useVerificationNotifications';
import './colony-admin-layout.css';

const { Header, Sider, Content, Footer } = Layout;

export default function ColonyAdminLayout({
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
  const { unreadCount } = useChat();
  const { unreadCount: activityUnread } = useNotifications();
  const verification = useVerificationNotifications();
  const notificationUnread = activityUnread + (verification?.unreadCount || 0);

  const isAdmin = user?.role === 'Admin';
  const canCreateShop = user?.capabilities?.canCreateShop === true;
  const canFulfill = user?.capabilities?.canFulfillExistingOrders === true;

  const adminMenuItems = [
    {
      key: 'admin/dashboard',
      icon: <DashboardOutlined />,
      label: 'Tổng quan',
    },
    {
      key: 'admin/phe-duyet',
      icon: <SafetyCertificateOutlined />,
      label: 'Duyệt nhà cung cấp',
    },
    { key: 'admin/gian-hang', icon: <ShopOutlined />, label: 'Quản lý gian hàng' },
    { key: 'admin/mau-gian-hang', icon: <AppstoreOutlined />, label: 'Mẫu giao diện' },
    {
      key: 'admin/van-hanh-giao-dich',
      icon: <AuditOutlined />,
      label: 'Giao dịch & tranh chấp',
    },
    {
      key: 'admin/kiem-soat-he-thong',
      icon: <SettingOutlined />,
      label: 'Hệ thống & danh mục',
    },
    {
      key: 'admin/dieu-khien',
      icon: <TeamOutlined />,
      label: 'Người dùng',
    },
    {
      key: 'admin/ho-so',
      icon: <UserOutlined />,
      label: 'Hồ sơ của tôi',
    },
  ];

  const supplierMenuItems = [
    {
      key: 'nha-cung-cap/dashboard',
      icon: <DashboardOutlined />,
      label: 'Tổng quan',
    },
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
      key: 'nha-cung-cap/tin-nhan',
      icon: <MessageOutlined />,
      label: <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>Tin nhắn khách hàng</span>
        {unreadCount > 0 && <Badge count={unreadCount} size="small" />}
      </span>,
    },
    {
      key: 'nha-cung-cap/dau-thau',
      icon: <SolutionOutlined />,
      label: 'Đấu thầu & báo giá',
    },
    {
      key: 'nha-cung-cap/quan-ly-don-hang',
      icon: <ShoppingOutlined />,
      label: 'Đơn hàng',
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
      key: 'nha-cung-cap/khuyen-mai',
      icon: <GiftOutlined />,
      label: 'Khuyến mãi & Voucher',
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

  const fulfillmentRoutes = new Set(['nha-cung-cap/dashboard', 'nha-cung-cap/quan-ly-don-hang',
    'nha-cung-cap/quan-ly-hop-dong', 'nha-cung-cap/quan-ly-giao-hang', 'nha-cung-cap/tin-nhan']);
  const currentMenuItems = isAdmin ? adminMenuItems : supplierMenuItems.filter((item) =>
    (item.key === 'nha-cung-cap/xac-minh' && user?.capabilities?.canReadSupplierVerification) ||
    canCreateShop || (canFulfill && fulfillmentRoutes.has(item.key)));

  const handleMenuClick = ({ key }) => {
    setMobileMenuOpen(false);
    onNavigate?.(key);
  };



  const userMenuItems = [
    (isAdmin || user?.capabilities?.canReadSupplierVerification) && {
      key: 'profile',
      icon: <UserOutlined />,
      label: isAdmin ? 'Hồ sơ Quản trị' : 'Hồ sơ Xưởng bánh',
      onClick: () => onNavigate?.(isAdmin ? 'admin/ho-so' : 'nha-cung-cap/ho-so'),
    },
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Trang tổng quan',
      onClick: () => onNavigate?.(isAdmin ? 'admin/dashboard' : 'nha-cung-cap/dashboard'),
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
  ].filter(Boolean);


  return (
    <Layout className={`workspace-layout ${isAdmin ? 'workspace-layout--admin' : 'workspace-layout--supplier'}`}>
      {/* Sider Colony Style */}
      {!compact && <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(val) => setCollapsed(val)}
        width={260}
        theme="light"
        className="workspace-sidebar"
      >
        {/* Brand Logo Header */}
        <button type="button" className={`workspace-brand${collapsed ? ' workspace-brand--collapsed' : ''}`}
          onClick={() => onNavigate?.(isAdmin ? 'admin/dashboard' : 'nha-cung-cap/dashboard')}
        >
          <img
            src="/logo.svg"
            alt="Nguyệt Phố Logo"
            className="workspace-brand__logo"
          />
          {!collapsed && (
            <span className="workspace-brand__copy"><strong>Nguyệt Phố</strong>
              <small>{isAdmin ? 'Không gian quản trị' : 'Kênh nhà cung cấp'}</small></span>
          )}
        </button>

        {/* Sidebar Menu */}
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          items={currentMenuItems}
          onClick={handleMenuClick}
          className="workspace-menu"
        />
      </Sider>}
      {compact && <Drawer className={`workspace-mobile-drawer${isAdmin ? ' workspace-mobile-drawer--admin' : ''}`}
        open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} placement="left"
        title={isAdmin ? 'Quản trị sàn' : 'Kênh nhà cung cấp'} size={280} styles={{ body: { padding: 0 } }}>
        <Menu className="workspace-menu" selectedKeys={[activeKey]} items={currentMenuItems} onClick={handleMenuClick} />
      </Drawer>}

      {/* Main Layout Area */}
      <Layout style={{ minWidth: 0 }}>
        {/* Colony Header */}
        <Header className="workspace-header">
          {/* Left: Collapse Button + Breadcrumbs */}
          <div className="workspace-header__left">
            <Button
              type="text"
              icon={compact || collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              aria-label="Mở điều hướng"
              onClick={() => compact ? setMobileMenuOpen(true) : setCollapsed(!collapsed)}
              className="workspace-header__toggle"
            />
            {!compact ? (
              <Breadcrumb
                items={[
                  { title: <HomeOutlined onClick={() => onNavigate?.(isAdmin ? 'admin/dashboard' : 'nha-cung-cap/dashboard')} style={{ cursor: 'pointer' }} /> },
                  { title: isAdmin ? 'Quản trị' : 'Nhà cung cấp' },
                  { title: title || 'Tổng quan' },
                ]}
              />
            ) : (
              <span className="workspace-header__mobile-title">{title || 'Tổng quan'}</span>
            )}
          </div>

          <div className="workspace-header__actions">
            {!isAdmin && (
              <button
                type="button"
                className={`workspace-icon-btn${activeKey === 'nha-cung-cap/tin-nhan' ? ' workspace-icon-btn--active' : ''}`}
                aria-label={unreadCount > 0 ? `Tin nhắn khách hàng (${unreadCount} chưa đọc)` : 'Tin nhắn khách hàng'}
                title="Tin nhắn khách hàng"
                onClick={() => onNavigate?.('nha-cung-cap/tin-nhan')}
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
                  <path d="M8.5 11.5h7" />
                  <path d="M8.5 14.5h4.5" />
                </svg>
                {unreadCount > 0 && (
                  <span className="workspace-icon-btn__badge" aria-hidden="true">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>
            )}

            <button
              type="button"
              className={`workspace-icon-btn${activeKey === 'thong-bao' ? ' workspace-icon-btn--active' : ''}`}
              aria-label={notificationUnread > 0 ? `Thông báo (${notificationUnread} chưa đọc)` : 'Thông báo'}
              title="Thông báo hoạt động và xác minh"
              onClick={() => onNavigate?.('thong-bao')}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6.8 9.2a5.2 5.2 0 1 1 10.4 0c0 4.6 1.8 6.4 2.6 7.3a.8.8 0 0 1-.6 1.3H4.8a.8.8 0 0 1-.6-1.3c.8-.9 2.6-2.7 2.6-7.3Z" />
                <path d="M9.8 20.3a2.4 2.4 0 0 0 4.4 0" />
                <path d="M12 2.5v1.5" />
              </svg>
              {notificationUnread > 0 && (
                <span className="workspace-icon-btn__badge workspace-icon-btn__badge--bell" aria-hidden="true">
                  {notificationUnread > 99 ? '99+' : notificationUnread}
                </span>
              )}
            </button>

            <Divider orientation="vertical" className="workspace-header__divider" />

            {/* User Profile */}
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <button type="button" className="workspace-account" aria-label="Tài khoản">
                <Avatar
                  src={user?.avatarUrl || undefined}
                  className="workspace-account__avatar"
                >
                  {user?.fullName?.trim()?.charAt(0)?.toUpperCase() || (isAdmin ? 'A' : 'N')}
                </Avatar>
                {!compact && <span className="workspace-account__copy">
                  <strong>
                    {user?.fullName || (isAdmin ? 'Quản trị viên' : 'Tài khoản nhà cung cấp')}
                  </strong><small>{isAdmin ? 'Quản trị viên' : 'Nhà cung cấp'}</small>
                </span>}
              </button>
            </Dropdown>
          </div>
        </Header>

        {/* Colony Content Area */}
        <Content className="workspace-content">
          {/* Page Banner / Header */}
          {(title || extra) && (
            <div className="workspace-page-heading">
              <div className="workspace-page-heading__copy">
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
              </div>
              {extra && <div className="workspace-page-heading__extra">{extra}</div>}
            </div>
          )}

          {/* Child Page Views */}
          <div style={{ minHeight: 480 }}>{children}</div>
        </Content>

        {/* Colony Footer */}
        <Footer className="workspace-footer">
          Nguyệt Phố · {isAdmin ? 'Không gian quản trị' : 'Kênh nhà cung cấp'}
        </Footer>
      </Layout>
    </Layout>
  );
}
