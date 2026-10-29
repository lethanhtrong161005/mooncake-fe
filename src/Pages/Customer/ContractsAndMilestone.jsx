import { useEffect, useState } from 'react';
import { Button, Card, Input, Modal, Space, Table, Tag, message } from 'antd';
import CustomerHeader from '../../components/layout/CustomerHeader';
import contractService from '../../services/contractService';
import paymentService from '../../services/paymentService';
import { DEMO_CONTRACTS } from '../../constants/demoMarketplaceData';
import DemoIllustrationNotice from '../../components/DemoIllustrationNotice';

export default function ContractsAndMilestone({ onNavigate }) {
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
    try {
      await contractService.submitForSignature(contract.id);
      await contractService.requestSignatureOtp(contract.id);
      setSelected(contract); setOtp(''); setSignOpen(true);
      message.info('Mã OTP đã được gửi theo cấu hình xác thực của hệ thống.');
    } catch (error) { message.error(error.message || 'Không thể bắt đầu ký hợp đồng.'); }
  };

  const sign = async () => {
    try {
      await contractService.sign(selected.id, otp, true);
      message.success('Đã gửi chữ ký điện tử.'); setSignOpen(false); await load();
    } catch (error) { message.error(error.message || 'Không thể ký hợp đồng.'); }
  };

  const payDeposit = async (contract) => {
    try {
      const payment = await paymentService.create({ contractId: contract.id, method: 'BankTransfer' });
      message.success('Đã khởi tạo yêu cầu thanh toán đặt cọc.');
      if (payment.paymentUrl) window.location.assign(payment.paymentUrl);
      await load();
    } catch (error) { message.error(error.message || 'Không thể tạo thanh toán.'); }
  };

  const columns = [
    { title: 'Số hợp đồng', dataIndex: 'contractNumber', key: 'contractNumber' },
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
    { title: 'Giá trị', dataIndex: 'totalValue', key: 'totalValue', render: (value) => `${value?.toLocaleString('vi-VN')} ₫` },
    { title: 'Hạn giao', dataIndex: 'deliveryDeadline', key: 'deliveryDeadline', render: (value) => value || '—' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (value) => <Tag>{value}</Tag> },
    { title: 'Thao tác', key: 'actions', render: (_, row) => row.isDemo ? <Tag color="blue">Chỉ xem</Tag> : <Space>
      {['Draft', 'PendingSignature'].includes(row.status) && <Button onClick={() => beginSign(row)}>Ký hợp đồng</Button>}
      {['Signed', 'PendingDeposit'].includes(row.status) && <Button type="primary" onClick={() => payDeposit(row)}>Tạo thanh toán cọc</Button>}
    </Space> },
  ];

  return <div style={{ minHeight: '100vh', background: '#faf8f6' }}>
    <CustomerHeader activeKey="hop-dong-tien-do" onNavigate={onNavigate} />
    <main style={{ maxWidth: 1200, margin: '24px auto', padding: '0 20px' }}>
      <Card title="Hợp đồng của tôi" extra={<Button onClick={load}>Tải lại</Button>}>
        {contracts.some((contract) => contract.isDemo) && <DemoIllustrationNotice description="Chưa có hợp đồng trong database. Hợp đồng mẫu chỉ để minh họa và không thể ký hoặc tạo thanh toán." />}
        <Table rowKey="id" loading={loading} columns={columns} dataSource={contracts} pagination={{ pageSize: 10 }} expandable={{ expandedRowRender: (row) => <div><p>{row.termsAndConditions || 'Không có điều khoản bổ sung.'}</p><p>Khách hàng ký: {row.signedByCustomerAt || 'Chưa ký'} · Nhà cung cấp ký: {row.signedBySupplierAt || 'Chưa ký'}</p></div>}} />
      </Card>
      <Modal title={`Ký hợp đồng ${selected?.contractNumber ?? ''}`} open={signOpen} onCancel={() => setSignOpen(false)} onOk={sign} okText="Xác nhận ký">
        <Input.OTP length={6} value={otp} onChange={setOtp} />
      </Modal>
    </main>
  </div>;
}
