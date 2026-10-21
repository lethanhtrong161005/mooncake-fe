import { Input, Button, Divider, Typography } from 'antd';
import {
  PhoneOutlined,
  LockOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function LoginForm({
  phone,
  setPhone,
  password,
  setPassword,
  onSubmit,
  onGoogleLogin,
  onForgotPassword,
  onGoToRegister,
  isLoading,
}) {
  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0, color: '#1f1f1f' }}>
          Đăng Nhập Tài Khoản
        </Title>
        <Text type="secondary" style={{ fontSize: 12 }}>
          Đăng nhập để xem bảng chiết khấu sỉ B2B, quản lý đơn hàng & yêu cầu báo giá.
        </Text>
      </div>

      <form onSubmit={onSubmit}>
        {/* SĐT */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#333', display: 'block', marginBottom: 4 }}>
            Số điện thoại <span style={{ color: '#cf1322' }}>*</span>
          </label>
          <Input
            prefix={<PhoneOutlined style={{ color: '#8c1524' }} />}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ví dụ: 0912 345 678"
            size="large"
            autoFocus
            style={{ borderRadius: 8 }}
          />
        </div>

        {/* Mật khẩu */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#333' }}>
              Mật khẩu <span style={{ color: '#cf1322' }}>*</span>
            </label>
            <Button
              type="link"
              onClick={onForgotPassword}
              style={{ padding: 0, height: 'auto', fontSize: 11, color: '#8c1524', fontWeight: 600 }}
            >
              Quên mật khẩu?
            </Button>
          </div>
          <Input.Password
            prefix={<LockOutlined style={{ color: '#8c1524' }} />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu của bạn"
            size="large"
            style={{ borderRadius: 8 }}
          />
        </div>

        {/* Nút Đăng nhập */}
        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={isLoading}
          style={{
            background: '#8c1524',
            borderColor: '#8c1524',
            fontWeight: 700,
            height: 42,
            borderRadius: 8,
            marginTop: 4,
          }}
          icon={<ArrowRightOutlined />}
        >
          Đăng nhập
        </Button>
      </form>

      {/* Hoặc đăng nhập với */}
      <Divider style={{ margin: '18px 0', fontSize: 11, color: '#999' }}>
        HOẶC TIẾP TỤC VỚI
      </Divider>

      {/* Google Login Button */}
      <Button
        block
        size="large"
        onClick={onGoogleLogin}
        disabled={isLoading}
        style={{
          borderRadius: 8,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          borderColor: '#d9d9d9',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Đăng nhập với Google</span>
      </Button>

      {/* Switch to Register */}
      <div style={{ textAlign: 'center', marginTop: 18, paddingTop: 14, borderTop: '1px solid #f0f0f0', fontSize: 12 }}>
        <span style={{ color: '#666' }}>Chưa có tài khoản Doanh nghiệp?</span>
        <Button
          type="link"
          style={{ padding: '0 4px', fontSize: 12, fontWeight: 700, color: '#8c1524' }}
          onClick={onGoToRegister}
        >
          Đăng ký ngay
        </Button>
      </div>
    </div>
  );
}
