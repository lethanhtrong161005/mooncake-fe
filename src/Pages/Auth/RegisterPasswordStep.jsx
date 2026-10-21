import { Input, Button, Checkbox, Typography } from 'antd';
import {
  LockOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function RegisterPasswordStep({
  phone,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  agreeTerms,
  setAgreeTerms,
  onSubmit,
  isLoading,
}) {
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Title level={4} style={{ margin: '0 0 4px', color: '#1f1f1f' }}>
          Thiết Lập Mật Khẩu
        </Title>
        <Text type="secondary" style={{ fontSize: 12 }}>
          Tạo mật khẩu đăng nhập an toàn cho tài khoản SĐT: <strong>{phone}</strong>
        </Text>
      </div>

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#333', display: 'block', marginBottom: 4 }}>
            Mật khẩu mới <span style={{ color: '#cf1322' }}>*</span>
          </label>
          <Input.Password
            prefix={<LockOutlined style={{ color: '#8c1524' }} />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tối thiểu 6 ký tự"
            size="large"
            autoFocus
            style={{ borderRadius: 8 }}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#333', display: 'block', marginBottom: 4 }}>
            Xác nhận mật khẩu <span style={{ color: '#cf1322' }}>*</span>
          </label>
          <Input.Password
            prefix={<LockOutlined style={{ color: '#8c1524' }} />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Nhập lại mật khẩu mới"
            size="large"
            style={{ borderRadius: 8 }}
          />
        </div>

        {/* Đồng ý điều khoản */}
        <div style={{ marginBottom: 18 }}>
          <Checkbox checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)}>
            <span style={{ fontSize: 12, color: '#666' }}>
              Tôi đồng ý với <strong>Điều khoản dịch vụ</strong> & <strong>Chính sách bảo mật</strong> của Nguyệt Phố.
            </span>
          </Checkbox>
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
          Hoàn tất đăng ký
        </Button>
      </form>
    </div>
  );
}
