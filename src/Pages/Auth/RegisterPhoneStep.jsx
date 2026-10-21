import { Input, Button, Typography } from 'antd';
import {
  PhoneOutlined,
  SafetyCertificateOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function RegisterPhoneStep({
  phone,
  setPhone,
  onSubmit,
  onGoToLogin,
  isLoading,
}) {
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0, color: '#1f1f1f' }}>
          Đăng Ký Tài Khoản B2B
        </Title>
        <Text type="secondary" style={{ fontSize: 12 }}>
          Nhập số điện thoại để nhận mã xác thực OTP tạo tài khoản mua sắm sỉ & tham gia RFQ.
        </Text>
      </div>

      <form onSubmit={onSubmit}>
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

        <div
          style={{
            background: '#fff9f9',
            border: '1px solid #ffd591',
            padding: '8px 12px',
            borderRadius: 8,
            fontSize: 11,
            color: '#666',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 16,
          }}
        >
          <SafetyCertificateOutlined style={{ color: '#8c1524', fontSize: 16 }} />
          <span>Nguyệt Phố cam kết bảo mật 100% thông tin số điện thoại của quý khách.</span>
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
          icon={<ArrowRightOutlined />}
        >
          Tiếp tục nhận mã OTP
        </Button>
      </form>

      <div style={{ textAlign: 'center', marginTop: 18, paddingTop: 14, borderTop: '1px solid #f0f0f0', fontSize: 12 }}>
        <span style={{ color: '#666' }}>Đã có tài khoản?</span>
        <Button
          type="link"
          style={{ padding: '0 4px', fontSize: 12, fontWeight: 700, color: '#8c1524' }}
          onClick={onGoToLogin}
        >
          Đăng nhập ngay
        </Button>
      </div>
    </div>
  );
}
