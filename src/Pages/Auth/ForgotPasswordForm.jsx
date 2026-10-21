import { Input, Button, Typography } from 'antd';
import {
  PhoneOutlined,
  ArrowLeftOutlined,
  SendOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function ForgotPasswordForm({
  forgotPhone,
  setForgotPhone,
  otpSent,
  otpCode,
  setOtpCode,
  onSubmit,
  onConfirmReset,
  onBackToLogin,
  isLoading,
}) {
  return (
    <div>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={onBackToLogin}
        style={{ padding: 0, fontSize: 12, color: '#666', marginBottom: 10 }}
      >
        Quay lại đăng nhập
      </Button>

      <Title level={4} style={{ margin: '0 0 4px', color: '#1f1f1f' }}>
        Khôi Phục Mật Khẩu
      </Title>
      <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>
        Nhập số điện thoại đã đăng ký để nhận mã xác thực OTP đặt lại mật khẩu.
      </Text>

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#333', display: 'block', marginBottom: 4 }}>
            Số điện thoại đăng ký <span style={{ color: '#cf1322' }}>*</span>
          </label>
          <Input
            prefix={<PhoneOutlined style={{ color: '#8c1524' }} />}
            value={forgotPhone}
            onChange={(e) => setForgotPhone(e.target.value)}
            placeholder="Nhập số điện thoại của bạn"
            size="large"
            autoFocus
            style={{ borderRadius: 8 }}
          />
        </div>

        {otpSent ? (
          <div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#333', display: 'block', marginBottom: 4 }}>
                Mã xác thực OTP (6 chữ số) <span style={{ color: '#cf1322' }}>*</span>
              </label>
              <Input
                size="large"
                placeholder="Nhập mã OTP gồm 6 chữ số"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                style={{ textAlign: 'center', letterSpacing: 6, fontWeight: 700, borderRadius: 8 }}
                autoFocus
              />
            </div>

            <Button
              type="primary"
              block
              size="large"
              style={{ background: '#8c1524', borderColor: '#8c1524', fontWeight: 700, borderRadius: 8 }}
              onClick={onConfirmReset}
            >
              Xác nhận & Đặt mật khẩu mới
            </Button>
          </div>
        ) : (
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={isLoading}
            style={{ background: '#8c1524', borderColor: '#8c1524', fontWeight: 700, borderRadius: 8 }}
            icon={<SendOutlined />}
          >
            Gửi mã OTP xác thực
          </Button>
        )}
      </form>
    </div>
  );
}
