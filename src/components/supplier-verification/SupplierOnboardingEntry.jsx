import { useRef, useState } from 'react';
import { Alert, Button, Card, Checkbox, Space, Steps, Typography } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import supplierService from '../../services/supplierService';
import { verificationError } from '../../constants/supplierVerification';
import SupplierVerificationPanel from './SupplierVerificationPanel';

export default function SupplierOnboardingEntry({ onNavigate }) {
  const { user, refreshCurrentUser } = useAuth();
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const running = useRef(false);
  const eligible = user?.capabilities?.canReadSupplierVerification ||
    user?.requestedRole === 'Supplier' || user?.role === 'Supplier';
  if (eligible) return <SupplierVerificationPanel onNavigate={onNavigate} />;
  const start = async () => {
    if (!confirmed || running.current) return;
    running.current = true;
    setBusy(true);
    setError('');
    try {
      // The backend changes requestedRole only; selling remains subject to administrator approval.
      await supplierService.startOnboarding();
      await refreshCurrentUser();
    } catch (failure) { setError(verificationError(failure)); }
    finally { running.current = false; setBusy(false); }
  };
  return <Card title={<Space><ShopOutlined /> Đăng ký trở thành nhà cung cấp</Space>}>
    <Space orientation="vertical" size="large" style={{ width: '100%' }}>
      <Typography.Paragraph>
        Bạn có thể đăng ký mở gian hàng bằng tài khoản Customer hiện tại, không cần tạo tài khoản mới.
        Chuẩn bị thông tin doanh nghiệp, giấy phép kinh doanh và chứng nhận an toàn thực phẩm.
      </Typography.Paragraph>
      <Steps size="small" current={0} items={[
        { title: 'Đăng ký nhà cung cấp' }, { title: 'Gửi hồ sơ doanh nghiệp' }, { title: 'Admin xét duyệt' },
      ]} />
      <Alert type="info" showIcon title="Đăng ký chưa cấp quyền bán hàng"
        description="Tài khoản vẫn giữ role Customer và các chức năng mua hàng. Quyền Supplier chỉ được cấp khi hồ sơ được Admin phê duyệt." />
      {error && <Alert type="error" showIcon title={error} />}
      <Checkbox checked={confirmed} disabled={busy} onChange={(event) => setConfirmed(event.target.checked)}>
        Tôi muốn đăng ký trở thành nhà cung cấp và đồng ý gửi hồ sơ doanh nghiệp để xét duyệt
      </Checkbox>
      <Button type="primary" disabled={!confirmed} loading={busy} onClick={start}>Bắt đầu hồ sơ nhà cung cấp</Button>
      <Button type="link" disabled={busy} onClick={() => onNavigate?.('trang-chu')}>Quay về trang chủ</Button>
    </Space>
  </Card>;
}
