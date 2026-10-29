import { useEffect, useState } from 'react';
import { Button, Card, Input, Modal, Space, Table, Tag, message } from 'antd';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import contractService from '../../services/contractService';
import { DEMO_CONTRACTS } from '../../constants/demoMarketplaceData';
import DemoIllustrationNotice from '../../components/DemoIllustrationNotice';

export default function ContractManage({ onNavigate }) {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [otp, setOtp] = useState('');
  const [signOpen, setSignOpen] = useState(false);
  const load = async () => {
    setLoading(true);
    try { const result = await contractService.listMine(); const live = result.items ?? result ?? []; setContracts(live.length ? live : DEMO_CONTRACTS); }
    catch (error) { message.error(error.message || 'Không thể tải hợp đồng.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  const beginSign = async (contract) => {
    try { await contractService.submitForSignature(contract.id); await contractService.requestSignatureOtp(contract.id); setSelected(contract); setOtp(''); setSignOpen(true); }
    catch (error) { message.error(error.message || 'Không thể yêu cầu ký hợp đồng.'); }
  };
  const sign = async () => {
    try { await contractService.sign(selected.id, otp, true); message.success('Đã gửi chữ ký điện tử.'); setSignOpen(false); await load(); }
    catch (error) { message.error(error.message || 'Không thể ký hợp đồng.'); }
  };
  const columns = [
    { title: 'Số hợp đồng', dataIndex: 'contractNumber', key: 'contractNumber' },
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
    { title: 'Giá trị', dataIndex: 'totalValue', key: 'totalValue', render: (value) => `${value?.toLocaleString('vi-VN')} ₫` },
    { title: 'Hạn giao', dataIndex: 'deliveryDeadline', key: 'deliveryDeadline', render: (value) => value || '—' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (value) => <Tag>{value}</Tag> },
    { title: 'Thao tác', key: 'action', render: (_, row) => row.isDemo ? <Tag color="blue">Chỉ xem</Tag> : ['Draft', 'PendingSignature'].includes(row.status) && <Button onClick={() => beginSign(row)}>Ký hợp đồng</Button> },
  ];
  return <ColonyAdminLayout role="Supplier" activeKey="nha-cung-cap/quan-ly-hop-dong" onNavigate={onNavigate} title="Hợp đồng" subtitle="Xem nội dung hợp đồng và ký xác nhận qua OTP.">
    <Card title="Hợp đồng của tôi" extra={<Space><Button onClick={load}>Tải lại</Button><Button onClick={() => onNavigate?.('nha-cung-cap/quan-ly-don-hang')}>Đơn hàng</Button></Space>}>
      {contracts.some((contract) => contract.isDemo) && <DemoIllustrationNotice description="Chưa có hợp đồng trong database. Bản ghi mẫu chỉ minh họa và không thể ký." />}
      <Table rowKey="id" loading={loading} columns={columns} dataSource={contracts} pagination={{ pageSize: 10 }} expandable={{ expandedRowRender: (row) => <div><p>{row.termsAndConditions || 'Không có điều khoản bổ sung.'}</p><p>Khách hàng ký: {row.signedByCustomerAt || 'Chưa ký'} · Nhà cung cấp ký: {row.signedBySupplierAt || 'Chưa ký'}</p></div>}} />
    </Card>
    <Modal title={`Ký hợp đồng ${selected?.contractNumber ?? ''}`} open={signOpen} onCancel={() => setSignOpen(false)} onOk={sign} okText="Xác nhận ký"><Input.OTP length={6} value={otp} onChange={setOtp} /></Modal>
  </ColonyAdminLayout>;
}
