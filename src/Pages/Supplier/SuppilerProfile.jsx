import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import SupplierOnboardingEntry from '../../components/supplier-verification/SupplierOnboardingEntry';

export default function SuppilerProfile({ onNavigate }) {
  return <ColonyAdminLayout role="Supplier" activeKey="nha-cung-cap/xac-minh" onNavigate={onNavigate}
    title="Hồ sơ & xác minh nhà cung cấp"
    subtitle="Hoàn thiện pháp lý, theo dõi xét duyệt và xem lịch sử xác minh doanh nghiệp.">
    <SupplierOnboardingEntry onNavigate={onNavigate} />
  </ColonyAdminLayout>;
}
