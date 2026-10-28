import { Breadcrumb, Space, Typography } from 'antd';
import CustomerHeader from '../../components/layout/CustomerHeader';
import CustomerFooter from '../../components/layout/CustomerFooter';
import SupplierOnboardingEntry from '../../components/supplier-verification/SupplierOnboardingEntry';

export default function SupplierRegistration({ onNavigate }) {
  return <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#faf8f6' }}>
    <CustomerHeader onNavigate={onNavigate} activeKey="dang-ky-nha-cung-cap" />
    <main style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '28px 20px 48px', flex: 1 }}>
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        <Breadcrumb items={[{ title: 'Trang chủ', onClick: () => onNavigate?.('trang-chu') },
          { title: 'Đăng ký nhà cung cấp' }]} />
        <div>
          <Typography.Title level={2}>Đăng ký mở gian hàng</Typography.Title>
          <Typography.Paragraph type="secondary">
            Hoàn thiện hồ sơ doanh nghiệp và theo dõi xét duyệt tại đây.
            Bạn tiếp tục sử dụng tài khoản Customer; kênh Supplier sẽ mở khi hồ sơ được phê duyệt.
          </Typography.Paragraph>
        </div>
        <SupplierOnboardingEntry onNavigate={onNavigate} />
      </Space>
    </main>
    <CustomerFooter onNavigate={onNavigate} />
  </div>;
}
