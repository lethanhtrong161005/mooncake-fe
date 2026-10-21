import { Input, Button, Typography } from 'antd';
import {
  ArrowLeftOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function RegisterOtpStep({
  phone,
  otp,
  setOtp,
  onSubmit,
  onResendOtp,
  onBackToPhone,
  canResend,
  countdown,
  isLoading,
}) {
  return (
    <div>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={onBackToPhone}
        style={{ padding: 0, fontSize: 12, color: '#666', marginBottom: 10 }}
      >
        Đổi số điện thoại khác
      </Button>

      <div style={{ marginBottom: 16 }}>
        <Title level={4} style={{ margin: '0 0 4px', color: '#1f1f1f' }}>
          Xác Thực Mã OTP
        </Title>
        <Text type="secondary" style={{ fontSize: 12 }}>
          Mã xác thực 6 chữ số đã được gửi tới SĐT: <strong style={{ color: '#1f1f1f' }}>{phone}</strong>
        </Text>
      </div>

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#333', display: 'block', marginBottom: 6, textAlign: 'left' }}>
            Nhập mã OTP 6 chữ số <span style={{ color: '#cf1322' }}>*</span>
          </label>
          <Input
            size="large"
            placeholder="______"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
            style={{ textAlign: 'center', letterSpacing: 8, fontSize: 20, fontWeight: 700, borderRadius: 8 }}
            autoFocus
          />
        </div>

        {/* Countdown / Resend Bar */}
        <div
          style={{
            background: '#fafafa',
            border: '1px solid #f0f0f0',
            padding: '10px 14px',
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
            fontSize: 12,
          }}
        >
          <span style={{ color: '#666' }}>Chưa nhận được mã?</span>
          {canResend ? (
            <Button
              type="link"
              size="small"
              icon={<ReloadOutlined />}
              onClick={onResendOtp}
              style={{ padding: 0, fontWeight: 700, color: '#8c1524' }}
            >
              Gửi lại mã OTP
            </Button>
          ) : (
            <span style={{ color: '#999' }}>
              Gửi lại sau <strong style={{ color: '#1f1f1f' }}>{countdown}s</strong>
            </span>
          )}
        </div>

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
          }}
          icon={<CheckCircleOutlined />}
        >
          Xác nhận mã OTP
        </Button>
      </form>
    </div>
  );
}
