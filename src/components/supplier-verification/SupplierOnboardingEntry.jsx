import { useRef, useState } from 'react';
import { Alert, Button, Checkbox, Steps } from 'antd';
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
  const eligible = user?.capabilities?.canReadSupplierVerification
    || user?.requestedRole === 'Supplier'
    || user?.role === 'Supplier';

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
    } catch (failure) {
      setError(verificationError(failure));
    } finally {
      running.current = false;
      setBusy(false);
    }
  };

  return (
    <section className="rounded-2xl border border-[#e4dcd3] bg-white p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3 border-b border-[#ebe3da] pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e4dcd3] bg-[#faf7f2] text-[#7d1322]">
          <ShopOutlined className="text-lg" />
        </div>
        <div>
          <h2 className="font-serif text-xl font-semibold text-[#231a18]">
            Đăng ký trở thành nhà cung cấp
          </h2>
          <p className="text-xs text-[#6c625e]">
            Khởi tạo hồ sơ xưởng sản xuất trực tiếp từ tài khoản hiện có.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-sm leading-relaxed text-[#6c625e]">
          Bạn có thể đăng ký mở gian hàng bằng tài khoản Customer hiện tại, không cần tạo tài khoản mới.
          Chuẩn bị thông tin doanh nghiệp, giấy phép kinh doanh và chứng nhận an toàn thực phẩm.
        </p>

        <div className="rounded-xl border border-[#ebe3da] bg-[#faf7f2] p-4">
          <Steps
            size="small"
            current={0}
            items={[
              { title: 'Đăng ký nhà cung cấp' },
              { title: 'Gửi hồ sơ doanh nghiệp' },
              { title: 'Admin xét duyệt' },
            ]}
          />
        </div>

        <Alert
          type="info"
          showIcon
          title="Đăng ký chưa cấp quyền bán hàng"
          description="Tài khoản vẫn giữ role Customer và các chức năng mua hàng. Quyền Supplier chỉ được cấp khi hồ sơ được Admin phê duyệt."
        />

        {error && <Alert type="error" showIcon title={error} />}

        <div className="rounded-xl border border-[#e4dcd3] bg-[#fdfbf8] p-4">
          <Checkbox
            checked={confirmed}
            disabled={busy}
            onChange={(event) => setConfirmed(event.target.checked)}
          >
            Tôi muốn đăng ký trở thành nhà cung cấp và đồng ý gửi hồ sơ doanh nghiệp để xét duyệt
          </Checkbox>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Button
            type="primary"
            disabled={!confirmed}
            loading={busy}
            onClick={start}
            style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
          >
            Bắt đầu hồ sơ nhà cung cấp
          </Button>
          <Button type="link" disabled={busy} onClick={() => onNavigate?.('trang-chu')}>
            Quay về trang chủ
          </Button>
        </div>
      </div>
    </section>
  );
}
