import { Input, Button, Typography, Space } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  KeyOutlined,
  ArrowLeftOutlined,
  SendOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function ForgotPasswordForm({
  forgotEmail,
  setForgotEmail,
  otpSent,
  otpCode,
  setOtpCode,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
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
        {otpSent
          ? `Nhập mã xác minh 6 số đã gửi về ${forgotEmail} và thiết lập mật khẩu mới.`
          : 'Nhập địa chỉ email tài khoản đã đăng ký để nhận mã OTP đặt lại mật khẩu.'}
      </Text>

      {!otpSent ? (
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#333', display: 'block', marginBottom: 6 }}>
              Địa chỉ email đăng ký <span style={{ color: '#cf1322' }}>*</span>
            </label>
            <Input
              prefix={<MailOutlined style={{ color: '#8c1524' }} />}
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="example@doanhnghiep.vn"
              size="large"
              autoFocus
              type="email"
              style={{ borderRadius: 8 }}
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={isLoading}
            style={{ background: '#8c1524', borderColor: '#8c1524', fontWeight: 700, borderRadius: 8 }}
            icon={<SendOutlined />}
          >
            Gửi mã OTP xác minh qua Email
          </Button>
        </form>
      ) : (
        <form onSubmit={onConfirmReset}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#333', display: 'block', marginBottom: 4 }}>
              Mã OTP xác minh (6 chữ số) <span style={{ color: '#cf1322' }}>*</span>
            </label>
            <Input
              size="large"
              prefix={<KeyOutlined style={{ color: '#8c1524' }} />}
              placeholder="Nhập 6 chữ số OTP"
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
              style={{ textAlign: 'center', letterSpacing: 4, fontWeight: 700, borderRadius: 8 }}
              autoFocus
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#333', display: 'block', marginBottom: 4 }}>
              Mật khẩu mới (tối thiểu 8 ký tự) <span style={{ color: '#cf1322' }}>*</span>
            </label>
            <Input.Password
              size="large"
              prefix={<LockOutlined style={{ color: '#8c1524' }} />}
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ borderRadius: 8 }}
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#333', display: 'block', marginBottom: 4 }}>
              Xác nhận mật khẩu mới <span style={{ color: '#cf1322' }}>*</span>
            </label>
            <Input.Password
              size="large"
              prefix={<LockOutlined style={{ color: '#8c1524' }} />}
              placeholder="Nhập lại mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ borderRadius: 8 }}
            />
          </div>

          <Space direction="vertical" style={{ width: '100%' }} size="small">
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={isLoading}
              style={{ background: '#8c1524', borderColor: '#8c1524', fontWeight: 700, borderRadius: 8 }}
              icon={<CheckCircleOutlined />}
            >
              Cập nhật mật khẩu mới
            </Button>
            <Button
              type="link"
              block
              onClick={onSubmit}
              disabled={isLoading}
              style={{ fontSize: 12, color: '#8c1524' }}
            >
              Chưa nhận được mã? Gửi lại OTP
            </Button>
          </Space>
        </form>
      )}
    </div>
  );
}
