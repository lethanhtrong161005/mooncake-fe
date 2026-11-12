import NotificationBell from '../notification/NotificationBell';
import { useState } from 'react';
import {
  Menu,
  Input,
  Dropdown,
  Avatar,
  Space,
  Button,
  Divider,
  Grid,
  Badge,
} from 'antd';
import {
  ShopOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  SolutionOutlined,
  CarOutlined,
  StarOutlined,
  UserOutlined,
  HeartOutlined,
  LogoutOutlined,
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  SearchOutlined,
  ArrowRightOutlined,
  MenuOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import { useWishlist } from '../../hooks/useWishlist';
import { useChat } from '../../hooks/useChat';
import AppLogo from './AppLogo';
import './customer-header.css';

export default function CustomerHeader({
  activeKey = 'trang-chu',
  onNavigate,
}) {
  const { isLoggedIn, user, logout } = useAuth();
  const { totalCount: wishlistCount } = useWishlist();
  const { unreadCount } = useChat();
  const screens = Grid.useBreakpoint();
  const compact = !screens.lg;
  const [searchValue, setSearchValue] = useState('');
  const accountName = user?.fullName?.trim() || 'Khách hàng';
  const accountInitial = accountName[0].toLocaleUpperCase('vi-VN');
  const accountAvatarUrl = user?.avatar_url || user?.avatarUrl || undefined;

  const publicMenuItems = [
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
  ];
  const customerMenuItems = [
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
  const menuItems = isLoggedIn && user?.role === 'Customer'
    ? [...publicMenuItems, ...customerMenuItems]
    : publicMenuItems;

  const handleMenuClick = ({ key }) => {
    onNavigate?.(key);
  };

  const handleSearch = () => {
    onNavigate?.('tim-kiem');
  };


  const userMenuItems = [
    ...(['Supplier', 'Admin'].includes(user?.role) ? [{
      key: 'workspace',
      icon: <HomeOutlined />,
      label: user?.role === 'Admin' ? 'Về trang quản trị' : 'Về kênh nhà cung cấp',
      onClick: () => onNavigate?.(user?.role === 'Admin' ? 'admin/dashboard' : 'nha-cung-cap/dashboard'),
    }] : []),
    ...(user?.role === 'Customer' ? [{
      key: 'my-orders',
      icon: <ShoppingOutlined />,
      label: 'Đơn hàng của tôi',
      onClick: () => onNavigate?.('don-hang-cua-toi'),
    }] : []),
    ...(user?.role === 'Customer' && !user?.capabilities?.canReadSupplierVerification ? [{
      key: 'supplier-onboarding',
      icon: <ShopOutlined />,
      label: 'Đăng ký mở gian hàng',
      onClick: () => onNavigate?.('dang-ky-nha-cung-cap'),
    }] : []),
    ...(user?.role === 'Customer' && user?.capabilities?.canReadSupplierVerification ? [{
      key: 'supplier-verification',
      icon: <ShopOutlined />,
      label: 'Hồ sơ xác minh nhà cung cấp',
      onClick: () => onNavigate?.('dang-ky-nha-cung-cap'),
    }] : []),
    ...(user?.role === 'Customer' ? [{
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ của tôi',
      onClick: () => onNavigate?.('ho-so-khach-hang'),
    }] : []),
    ...(isLoggedIn ? [{
      key: 'wishlist',
      icon: <HeartOutlined />,
      label: (
        <span className="customer-header__wishlist-item">
          <span>Sản phẩm yêu thích</span>
          {wishlistCount > 0 && (
            <span
              className="customer-header__wishlist-count"
              data-testid="header-wishlist-count"
            >
              {wishlistCount > 99 ? '99+' : wishlistCount}
            </span>
          )}
        </span>
      ),
      onClick: () => onNavigate?.('san-pham-yeu-thich'),
    }] : []),
    ...(user?.role === 'Customer' ? [{
      key: 'rfq',
      icon: <SolutionOutlined />,
      label: 'Quản lý RFQ của tôi',
      onClick: () => onNavigate?.('so-sanh-bao-gia'),
    }] : []),
    ...(user?.role === 'Customer' ? [{
      key: 'contracts',
      icon: <FileTextOutlined />,
      label: 'Hợp đồng & Đặt cọc M1',
      onClick: () => onNavigate?.('hop-dong-tien-do'),
    }] : []),
    ...(isLoggedIn ? [{
      key: 'messages',
      icon: <MessageOutlined />,
      label: (
        <span className="customer-header__wishlist-item">
          <span>Tin nhắn</span>
          {unreadCount > 0 && (
            <span
              className="customer-header__wishlist-count"
              data-testid="header-chat-unread-count"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </span>
      ),
      onClick: () => onNavigate?.('tin-nhan'),
    }] : []),
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
      className="customer-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#faf9f6',
        borderBottom: '1px solid #e7dcd0',
        boxShadow: '0 2px 8px rgba(67, 18, 28, 0.04)',
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: compact ? '0 12px' : '0 20px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <AppLogo
          size={compact ? 'small' : 'default'}
          subtitle={compact ? '' : 'Bánh Trung Thu Cao Cấp'}
          onClick={() => onNavigate?.('trang-chu')}
          style={{ marginRight: 16 }}
        />

        {/* Navigation Menu */}
        {!compact && <div style={{ flex: 1, minWidth: 0 }}>
          <Menu
            className="customer-header__menu"
            mode="horizontal"
            selectedKeys={[activeKey]}
            items={menuItems}
            onClick={handleMenuClick}
            overflowedIndicator={
              <span className="customer-header__more">
                <MenuOutlined aria-hidden="true" /> Thêm
              </span>
            }
            style={{
              borderBottom: 'none',
              fontWeight: 500,
              fontSize: 13,
              justifyContent: 'flex-start',
            }}
          />
        </div>}

        {/* Right Section: Search, Role Switcher, Notifications, Auth */}
        <Space size={compact ? 'small' : 'middle'} align="center" style={{ flexShrink: 0 }}>
          {compact && <Dropdown menu={{ items: menuItems, onClick: handleMenuClick }} trigger={['click']}>
            <Button icon={<MenuOutlined />} aria-label="Mở điều hướng" />
          </Dropdown>}
          {/* Luxury Search Pill */}
          {!compact && <Input
            placeholder="Tìm bánh, xưởng, set quà VIP..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onPressEnter={handleSearch}
            prefix={<SearchOutlined style={{ color: '#742435', fontSize: 16, marginRight: 4 }} />}
            suffix={
              <Button
                type="primary"
                shape="circle"
                size="small"
                icon={<ArrowRightOutlined style={{ fontSize: 11 }} />}
                onClick={handleSearch}
                style={{
                  background: '#8c1524',
                  borderColor: 'transparent',
                  boxShadow: '0 2px 6px rgba(140, 21, 36, 0.22)',
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
              background: '#f3eee7',
              border: '1px solid #e7dcd0',
              paddingLeft: 14,
              paddingRight: 6,
              fontSize: 13,
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
            }}
          />}

          {/* Chat Messages */}
          {isLoggedIn && (
            <Badge count={unreadCount} overflowCount={99} size="small">
              <Button
                type="text"
                shape="circle"
                icon={<MessageOutlined style={{ fontSize: 18, color: '#444' }} />}
                onClick={() => onNavigate?.('tin-nhan')}
                aria-label="Tin nhắn"
                title="Tin nhắn"
              />
            </Badge>
          )}

          {/* Notifications */}
          {isLoggedIn && <NotificationBell onNavigate={onNavigate} />}

          {!compact && <Divider orientation="vertical" style={{ height: 24, margin: '0 4px', borderColor: '#e7dcd0' }} />}

          {/* Auth: Logged In or Login/Register Buttons */}
          {isLoggedIn ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <Button type="text" aria-label="Tài khoản" style={{ height: 44, padding: compact ? 4 : 8 }}><Space>
                <Avatar src={accountAvatarUrl} style={{ backgroundColor: '#8c1524' }}>
                  {accountInitial}
                </Avatar>
                {!compact && <span style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>
                  {accountName}
                </span>}
              </Space></Button>
            </Dropdown>
          ) : (
            <Space size="small">
              <Button
                type="text"
                icon={compact ? undefined : <LoginOutlined />}
                onClick={() => onNavigate?.('dang-nhap')}
                style={{ fontWeight: 600, color: '#8c1524' }}
              >
                Đăng nhập
              </Button>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                aria-label="Đăng ký"
                onClick={() => onNavigate?.('dang-ky')}
                style={{
                  background: '#8c1524',
                  borderColor: '#8c1524',
                  fontWeight: 600,
                }}
              >
                {!compact && 'Đăng ký'}
              </Button>
            </Space>
          )}
        </Space>
      </div>
    </header>
  );
}
