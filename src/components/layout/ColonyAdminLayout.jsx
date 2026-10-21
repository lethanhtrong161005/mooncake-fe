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
  Select,
  Space,
  Button,
  Divider,
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
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SwapOutlined,
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
  const { user, logout } = useAuth();

  const isAdmin = role === 'Admin';

  const adminMenuItems = [
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
          <Badge count={4} style={{ backgroundColor: '#8c1524' }} />
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
      key: 'nha-cung-cap/ho-so',
      icon: <TrophyOutlined />,
      label: (
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Hồ sơ & Điểm uy tín</span>
          <Tag color="gold" style={{ margin: 0, fontSize: 10 }}>98/100</Tag>
        </span>
      ),
    },
  ];

  const currentMenuItems = isAdmin ? adminMenuItems : supplierMenuItems;

  const handleMenuClick = ({ key }) => {
    onNavigate?.(key);
  };

  const handleRoleChange = (selectedRole) => {
    if (selectedRole === 'Customer') {
      onNavigate?.('trang-chu');
    } else if (selectedRole === 'Supplier') {
      onNavigate?.('nha-cung-cap/thiet-lap-gian-hang');
    } else if (selectedRole === 'Admin') {
      onNavigate?.('admin/dashboard');
    }
  };

  const notificationItems = [
    {
      key: '1',
      label: (
        <div style={{ maxWidth: 280, padding: 4 }}>
          <div style={{ fontWeight: 600, color: '#8c1524' }}>
            {isAdmin ? 'Hồ sơ NCC mới chờ duyệt' : 'Lời mời RFQ mới (BID-2025)'}
          </div>
          <div style={{ fontSize: 12, color: '#666' }}>
            {isAdmin ? 'Xưởng Bánh Kinh Đô Nghệ Nhân gửi hồ sơ ISO 22000' : 'Tập đoàn Vingroup mời tham gia thầu 500 hộp VIP'}
          </div>
          <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>5 phút trước</div>
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: (
        <div style={{ maxWidth: 280, padding: 4 }}>
          <div style={{ fontWeight: 600, color: '#2e7d32' }}>
            {isAdmin ? 'Hợp đồng giải ngân Escrow #MC-881' : 'Khoản cọc M1 đã thanh toán thành công'}
          </div>
          <div style={{ fontSize: 12, color: '#666' }}>Hợp đồng #HD-2025-001 đã chuyển sang trạng thái Active</div>
          <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>30 phút trước</div>
        </div>
      ),
    },
  ];

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

  const currentRoleValue = isAdmin ? 'Admin' : 'Supplier';

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f7' }}>
      {/* Sider Colony Style */}
      <Sider
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
      </Sider>

      {/* Main Layout Area */}
      <Layout>
        {/* Colony Header */}
        <Header
          style={{
            background: '#ffffff',
            padding: '0 24px',
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
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: 16, width: 36, height: 36 }}
            />
            <Breadcrumb
              items={[
                { title: <HomeOutlined onClick={() => onNavigate?.('trang-chu')} style={{ cursor: 'pointer' }} /> },
                { title: isAdmin ? 'Ban Quản Trị HQ' : 'Kênh Nhà Cung Cấp' },
                { title: title || 'Tổng quan' },
              ]}
            />
          </Space>

          {/* Right: Search, Role Switcher, Notifications, User */}
          <Space size="middle" align="center">
            {/* Global Search */}
            <Input
              placeholder={isAdmin ? 'Tìm mã RFQ, HĐ, MST, SKU...' : 'Tra cứu đơn B2B, SKU, phiên RFQ...'}
              prefix={<SearchOutlined style={{ color: '#aaa' }} />}
              style={{ width: 220, borderRadius: 20 }}
            />

            {/* Quick Role Switcher for demo & validation */}
            <Space size={4} style={{ background: '#f5f5f7', padding: '3px 8px', borderRadius: 8 }}>
              <SwapOutlined style={{ color: '#8c1524' }} />
              <span style={{ fontSize: 12, color: '#666' }}>Vai trò:</span>
              <Select
                value={currentRoleValue}
                onChange={handleRoleChange}
                size="small"
                variant="borderless"
                style={{ width: 120, fontWeight: 600 }}
                options={[
                  { value: 'Customer', label: '🛒 Customer B2B' },
                  { value: 'Supplier', label: '🏭 Supplier (Xưởng)' },
                  { value: 'Admin', label: '🛡️ Admin HQ' },
                ]}
              />
            </Space>

            {/* Notifications */}
            <Dropdown menu={{ items: notificationItems }} placement="bottomRight" arrow>
              <Badge count={isAdmin ? 6 : 3} size="small" offset={[-2, 4]}>
                <Button type="text" shape="circle" icon={<BellOutlined style={{ fontSize: 18 }} />} />
              </Badge>
            </Dropdown>

            <Divider type="vertical" style={{ height: 24, margin: '0 4px' }} />

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
                <div style={{ lineHeight: 1.2, textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>
                    {user?.fullName || (isAdmin ? 'Quản Trị Viên HQ' : 'Xưởng Bánh Tràng An')}
                  </span>
                  <span style={{ fontSize: 11, color: '#888' }}>
                    {isAdmin ? 'Super Admin' : 'Đối tác Vàng (98/100)'}
                  </span>
                </div>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        {/* Colony Content Area */}
        <Content style={{ margin: '20px 24px 0', overflow: 'initial' }}>
          {/* Page Banner / Header */}
          {(title || extra) && (
            <div
              style={{
                display: 'flex',
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
