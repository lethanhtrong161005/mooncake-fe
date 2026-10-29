import { useEffect, useState } from 'react';
import { Alert, Button, Card, Rate, Space, Table, Tag, message } from 'antd';
import CustomerHeader from '../../components/layout/CustomerHeader';
import paymentService from '../../services/paymentService';
import { DEMO_PAYMENTS } from '../../constants/demoMarketplaceData';

export default function PaymentAndRate({ onNavigate }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const illustrativeReviews = [
    {
      key: 'illustration-1',
      contractNo: 'HD-2025-08500',
      supplierName: 'Hữu Nghị Luxury Mooncake',
      variant: 'Set Hộp VIP Dạ Nguyệt 6 Bánh',
      qualityRating: 5,
      deliveryRating: 5,
      serviceRating: 4,
      overallRating: 5,
      comment: 'Bánh rất ngon, vị ngọt thanh vừa phải, vỏ hộp sơn mài bóng bẩy sang trọng. Cán bộ nhân viên tập đoàn khen ngợi rất nhiều.',
      supplierResponse: 'Cảm ơn quý tập đoàn đã tin tưởng lựa chọn Hữu Nghị Luxury! Rất vinh hạnh được phục vụ mùa vụ tiếp theo.',
      reviewedAt: '2025-08-11',
    },
  ];
  const load = async () => {
    setLoading(true);
    try { const result = await paymentService.listMine(); const live = result.items ?? result ?? []; setPayments(live.length ? live : DEMO_PAYMENTS); }
    catch (error) { message.error(error.message || 'Không thể tải giao dịch thanh toán.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  const columns = [
    { title: 'Mã giao dịch', dataIndex: 'paymentNumber', key: 'paymentNumber' },
    { title: 'Hợp đồng', dataIndex: 'contractId', key: 'contractId', render: (value) => value || '—' },
    { title: 'Số tiền', dataIndex: 'amount', key: 'amount', render: (value, row) => `${value?.toLocaleString('vi-VN')} ${row.currency || 'VND'}` },
    { title: 'Phương thức', dataIndex: 'method', key: 'method' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (value) => <Tag>{value}</Tag> },
    { title: 'Ngày thanh toán', dataIndex: 'paidAt', key: 'paidAt', render: (value) => value ? new Date(value).toLocaleString('vi-VN') : 'Chưa thanh toán' },
  ];
  const reviewColumns = [
    { title: 'Hợp đồng / Nhà cung cấp', key: 'supplier', render: (_, row) => <Space direction="vertical" size={0}><strong>{row.contractNo}</strong><span>{row.supplierName}</span><Tag color="purple">{row.variant}</Tag></Space> },
    { title: 'Đánh giá', key: 'ratings', render: (_, row) => <Space direction="vertical" size={2}><span>Chất lượng <Rate disabled value={row.qualityRating} /></span><span>Giao hàng <Rate disabled value={row.deliveryRating} /></span><span>Dịch vụ <Rate disabled value={row.serviceRating} /></span><span>Tổng thể <Rate disabled value={row.overallRating} /></span></Space> },
    { title: 'Nhận xét', dataIndex: 'comment', key: 'comment', render: (comment, row) => <Space direction="vertical"><span>{comment}</span><span><strong>Phản hồi nhà cung cấp:</strong> {row.supplierResponse}</span></Space> },
    { title: 'Ngày', dataIndex: 'reviewedAt', key: 'reviewedAt' },
  ];
  return <div style={{ minHeight: '100vh', background: '#faf8f6' }}>
    <CustomerHeader activeKey="thanh-toan-danh-gia" onNavigate={onNavigate} />
    <main style={{ maxWidth: 1200, margin: '24px auto', padding: '0 20px' }}>
      <Card title="Giao dịch thanh toán" extra={<Button onClick={load}>Tải lại</Button>}>
        {payments.some((payment) => payment.isDemo) && <Alert style={{ marginBottom: 16 }} type="info" showIcon message="Giao dịch minh họa · Chỉ xem" description="Database chưa có giao dịch thanh toán. Các dòng mẫu không phải giao dịch thật và không thực hiện thanh toán." />}
        <Table rowKey="id" loading={loading} columns={columns} dataSource={payments} pagination={{ pageSize: 10 }} />
      </Card>
      <Card style={{ marginTop: 16 }} title="Đánh giá giao dịch · Dữ liệu minh họa" extra={<Tag color="blue">Chỉ xem</Tag>}>
        <Alert style={{ marginBottom: 16 }} type="info" showIcon message="Nội dung mẫu để minh họa giao diện; không được lưu vào DB hoặc dùng như đánh giá giao dịch thật." />
        <Table rowKey="key" columns={reviewColumns} dataSource={illustrativeReviews} pagination={false} />
      </Card>
    </main>
  </div>;
}
