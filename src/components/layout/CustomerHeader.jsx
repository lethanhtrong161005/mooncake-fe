import { useState } from 'react';
import {
  Menu,
  Input,
  Badge,
  Dropdown,
  Avatar,
  Space,
  Button,
  Divider,
} from 'antd';
import {
  ShopOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  SolutionOutlined,
  CarOutlined,
  StarOutlined,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  SearchOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import AppLogo from './AppLogo';

export default function CustomerHeader({
  activeKey = 'trang-chu',
  onNavigate,
}) {
  const { isLoggedIn, user, logout } = useAuth();
  const [searchValue, setSearchValue] = useState('');

  const menuItems = [
    {
      key: 'trang-chu',
      icon: <HomeOutlined />,
      label: 'Trang chủ',
    },
    {
      key: 'tim-kiem',
      icon: <ShopOutlined />,
      label: 'Sản phẩm',
    },
    {
      key: 'dat-hang-thiet-ke',
      icon: <ShoppingOutlined />,
      label: 'Đặt hàng & In logo',
    },
    {
      key: 'so-sanh-bao-gia',
      icon: <SolutionOutlined />,
      label: 'Yêu cầu Báo giá',
    },
    {
      key: 'hop-dong-tien-do',
      icon: <FileTextOutlined />,
      label: 'Hợp đồng & Milestone',
    },
    {
      key: 'giao-hang-pod',
      icon: <CarOutlined />,
      label: 'Giao nhận',
    },
    {
      key: 'thanh-toan-danh-gia',
      icon: <StarOutlined />,
      label: 'Thanh toán & Đánh giá',
    },
  ];

  const handleMenuClick = ({ key }) => {
    onNavigate?.(key);
  };

  const handleSearch = (val) => {
    onNavigate?.('tim-kiem');
  };

  const notificationItems = [
    {
      key: '1',
      label: (
        <div style={{ maxWidth: 280, padding: 4 }}>
          <div style={{ fontWeight: 600, color: '#8c1524' }}>Báo giá mới cho RFQ-2025-08910</div>
          <div style={{ fontSize: 12, color: '#666' }}>Xưởng Tràng An đã gửi bảng chào giá chi tiết cho 500 hộp quà VIP.</div>
          <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>10 phút trước</div>
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
          <div style={{ fontWeight: 600, color: '#2e7d32' }}>Chuyến giao hàng thành công (PoD xác minh)</div>
          <div style={{ fontSize: 12, color: '#666' }}>Đơn hàng #DH-2025-772 đã được ký nhận tại toà nhà Landmark 81.</div>
          <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>1 giờ trước</div>
        </div>
      ),
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ Doanh nghiệp',
      onClick: () => onNavigate?.('ho-so-khach-hang'),
    },
    {
      key: 'rfq',
      icon: <SolutionOutlined />,
      label: 'Quản lý RFQ của tôi',
      onClick: () => onNavigate?.('so-sanh-bao-gia'),
    },
    {
      key: 'contracts',
      icon: <FileTextOutlined />,
      label: 'Hợp đồng & Đặt cọc M1',
      onClick: () => onNavigate?.('hop-dong-tien-do'),
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
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#ffffff',
        borderBottom: '1px solid #f0f0f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '0 20px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <AppLogo
          size="default"
          subtitle="Bánh Trung Thu B2B"
          onClick={() => onNavigate?.('trang-chu')}
          style={{ marginRight: 16 }}
        />

        {/* Navigation Menu */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Menu
            mode="horizontal"
            selectedKeys={[activeKey]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{
              borderBottom: 'none',
              fontWeight: 500,
              fontSize: 13,
              justifyContent: 'flex-start',
            }}
          />
        </div>

        {/* Right Section: Search, Role Switcher, Notifications, Auth */}
        <Space size="middle" align="center" style={{ flexShrink: 0 }}>
          {/* Luxury Search Pill */}
          <Input
            placeholder="Tìm bánh, xưởng, set quà VIP..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onPressEnter={handleSearch}
            prefix={<SearchOutlined style={{ color: '#8c1524', fontSize: 16, marginRight: 4 }} />}
            suffix={
              <Button
                type="primary"
                shape="circle"
                size="small"
                icon={<ArrowRightOutlined style={{ fontSize: 11 }} />}
                onClick={handleSearch}
                style={{
                  background: 'linear-gradient(135deg, #8c1524 0%, #d48806 100%)',
                  borderColor: 'transparent',
                  boxShadow: '0 2px 6px rgba(140, 21, 36, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 26,
                  height: 26,
                  cursor: 'pointer',
                }}
                title="Tìm kiếm ngay"
              />
            }
            style={{
              width: 310,
              height: 38,
              borderRadius: 20,
              background: '#f9f5f2',
              border: '1px solid #ebdcd5',
              paddingLeft: 14,
              paddingRight: 6,
              fontSize: 13,
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
            }}
          />

          {/* Notifications */}
          <Dropdown menu={{ items: notificationItems }} placement="bottomRight" arrow>
            <Badge count={2} size="small" offset={[-2, 3]} color="#cf1322">
              <Button
                type="text"
                shape="circle"
                style={{
                  width: 38,
                  height: 38,
                  background: '#f7f2ef',
                  border: '1px solid #ebdcd5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                icon={<BellOutlined style={{ fontSize: 18, color: '#8c1524' }} />}
                title="Thông báo hệ thống & đơn hàng"
              />
            </Badge>
          </Dropdown>

          <Divider type="vertical" style={{ height: 24, margin: '0 4px' }} />

          {/* Auth: Logged In or Login/Register Buttons */}
          {isLoggedIn ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <Space style={{ cursor: 'pointer' }}>
                <Avatar style={{ backgroundColor: '#8c1524' }}>
                  {user?.fullName ? user.fullName[0].toUpperCase() : 'KH'}
                </Avatar>
                <div style={{ lineHeight: 1.2, textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>
                    {user?.fullName || 'Khách Doanh Nghiệp'}
                  </span>
                  <span style={{ fontSize: 11, color: '#888' }}>Tập đoàn Vingroup</span>
                </div>
              </Space>
            </Dropdown>
          ) : (
            <Space size="small">
              <Button
                type="text"
                icon={<LoginOutlined />}
                onClick={() => onNavigate?.('dang-nhap')}
                style={{ fontWeight: 600, color: '#8c1524' }}
              >
                Đăng nhập
              </Button>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={() => onNavigate?.('dang-ky')}
                style={{
                  background: '#8c1524',
                  borderColor: '#8c1524',
                  fontWeight: 600,
                }}
              >
                Đăng ký
              </Button>
            </Space>
          )}
        </Space>
      </div>
    </header>
  );
}
