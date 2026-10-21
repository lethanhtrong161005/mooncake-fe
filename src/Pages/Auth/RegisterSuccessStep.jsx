import { Button, Typography } from 'antd';
import {
  CheckCircleOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function RegisterSuccessStep({
  phone,
  onRedirectToLogin,
}) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: '#f6ffed',
          color: '#2e7d32',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: 36,
          boxShadow: '0 4px 12px rgba(46, 125, 50, 0.15)',
        }}
      >
        <CheckCircleOutlined />
      </div>

      <Title level={4} style={{ margin: '0 0 6px', color: '#1f1f1f' }}>
        Đăng Ký Thành Công!
      </Title>
      <Paragraph style={{ fontSize: 13, color: '#666', maxWidth: 300, margin: '0 auto 20px' }}>
        Tài khoản số <strong style={{ color: '#8c1524' }}>{phone}</strong> đã sẵn sàng. Hệ thống đang tự động chuyển về màn hình đăng nhập...
      </Paragraph>

      <Button
        type="primary"
        block
        size="large"
        style={{ background: '#8c1524', borderColor: '#8c1524', fontWeight: 700, borderRadius: 8 }}
        onClick={onRedirectToLogin}
        icon={<ArrowRightOutlined />}
      >
        Đăng nhập ngay
      </Button>
    </div>
  );
}
