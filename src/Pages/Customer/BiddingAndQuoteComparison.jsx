import { useEffect, useState } from 'react';
import { Button, Card, DatePicker, Form, Input, InputNumber, Modal, Space, Table, Tag, message } from 'antd';
import dayjs from 'dayjs';
import CustomerHeader from '../../components/layout/CustomerHeader';
import rfqService from '../../services/rfqService';
import { DEMO_BIDS, DEMO_RFQS } from '../../constants/demoMarketplaceData';
import DemoIllustrationNotice from '../../components/DemoIllustrationNotice';

const { TextArea } = Input;

export default function BiddingAndQuoteComparison({ onNavigate }) {
  const [form] = Form.useForm();
  const [rfqs, setRfqs] = useState([]);
  const [bids, setBids] = useState([]);
  const [activeRfq, setActiveRfq] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [bidsOpen, setBidsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try { const rows = await rfqService.listMine(); const live = rows.items ?? rows ?? []; setRfqs(live.length ? live : DEMO_RFQS); }
    catch (error) { message.error(error.message || 'Không thể tải RFQ.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const create = async (values) => {
    setSaving(true);
    try {
      const created = await rfqService.create({
        title: values.title,
        description: values.description || null,
        deliveryAddress: values.deliveryAddress,
        deliveryDateRequired: values.deliveryDateRequired.format('YYYY-MM-DD'),
        budgetRangeMin: values.budgetRangeMin ?? null,
        budgetRangeMax: values.budgetRangeMax ?? null,
        bidDeadline: values.bidDeadline.toISOString(),
        items: [{ productName: values.productName, description: values.itemDescription || null, quantity: values.quantity,
          unit: values.unit || 'box', targetPrice: values.targetPrice ?? null, specifications: values.specifications || null,
          packagingRequirements: values.packagingRequirements || null, needsCustomPackaging: false }],
      });
      await rfqService.publish(created.id);
      message.success('Đã tạo và phát hành RFQ.');
      setCreateOpen(false); form.resetFields(); await load();
    } catch (error) { message.error(error.message || 'Không thể tạo RFQ.'); }
    finally { setSaving(false); }
  };

  const openBids = async (rfq) => {
    setActiveRfq(rfq); setBidsOpen(true);
    try { const result = await rfqService.listBids(rfq.id); setBids(result.items ?? result ?? []); }
    catch (error) { setBids([]); message.error(error.message || 'Không thể tải báo giá.'); }
  };

  const acceptBid = async (bid) => {
    try {
      await rfqService.acceptBid(activeRfq.id, bid.id);
      message.success('Đã chấp nhận báo giá; backend đã khởi tạo hợp đồng nháp.');
      setBidsOpen(false); await load(); onNavigate?.('hop-dong-tien-do');
    } catch (error) { message.error(error.message || 'Không thể chấp nhận báo giá.'); }
  };

  const columns = [
    { title: 'Mã RFQ', dataIndex: 'rfqNumber', key: 'rfqNumber' },
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
    { title: 'Ngày giao', dataIndex: 'deliveryDateRequired', key: 'deliveryDateRequired' },
    { title: 'Báo giá', dataIndex: 'bidCount', key: 'bidCount' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (value) => <Tag>{value}</Tag> },
    { title: 'Thao tác', key: 'actions', render: (_, row) => row.isDemo ? <Tag color="blue">Chỉ xem</Tag> : <Space><Button onClick={() => openBids(row)}>So sánh báo giá</Button>{row.status === 'Draft' && <Button onClick={async () => { try { await rfqService.publish(row.id); await load(); } catch (error) { message.error(error.message); } }}>Phát hành</Button>}</Space> },
  ];

  const bidColumns = [
    { title: 'Nhà cung cấp', dataIndex: 'supplierName', key: 'supplierName' },
    { title: 'Mã báo giá', dataIndex: 'bidNumber', key: 'bidNumber' },
    { title: 'Tổng giá', dataIndex: 'totalPrice', key: 'totalPrice', render: (value) => `${value?.toLocaleString('vi-VN')} ₫` },
    { title: 'Giao hàng (ngày)', dataIndex: 'estimatedDeliveryDays', key: 'estimatedDeliveryDays' },
    { title: 'Hiệu lực (ngày)', dataIndex: 'validityDays', key: 'validityDays' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (value) => <Tag>{value}</Tag> },
    { title: 'Chi tiết', dataIndex: 'items', key: 'items', render: (items) => items?.map((item) => `${item.productName}: ${item.unitPrice?.toLocaleString('vi-VN')} ₫ × ${item.quantity}`).join(' · ') },
    { title: '', key: 'accept', render: (_, bid) => activeRfq?.isDemo ? <Tag>Minh họa</Tag> : activeRfq?.status === 'Open' && <Button type="primary" onClick={() => acceptBid(bid)}>Chấp nhận</Button> },
  ];

  return <div style={{ minHeight: '100vh', background: '#faf8f6' }}>
    <CustomerHeader activeKey="in-an-bao-bi" onNavigate={onNavigate} />
    <main style={{ maxWidth: 1200, margin: '24px auto', padding: '0 20px' }}>
      <Card title="RFQ và so sánh báo giá" extra={<Space><Button onClick={load}>Tải lại</Button><Button type="primary" onClick={() => setCreateOpen(true)}>Tạo RFQ</Button></Space>}>
        {rfqs.some((row) => row.isDemo) && <DemoIllustrationNotice description="Chưa có RFQ trong database. Các dòng có nhãn minh họa chỉ để xem và không thể phát hành hoặc chấp nhận báo giá." />}
        <Table rowKey="id" loading={loading} columns={columns} dataSource={rfqs} pagination={{ pageSize: 10 }} />
        {rfqs.some((row) => row.isDemo) && <Card type="inner" title="Ví dụ so sánh báo giá" style={{ marginTop: 16 }}><Table rowKey="id" columns={bidColumns} dataSource={DEMO_BIDS} pagination={false} /></Card>}
      </Card>
      <Modal title="Tạo yêu cầu báo giá" open={createOpen} confirmLoading={saving} onCancel={() => setCreateOpen(false)} onOk={() => form.submit()} width={720}>
        <Form form={form} layout="vertical" onFinish={create}>
          <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="description" label="Mô tả"><TextArea rows={2} /></Form.Item>
          <Form.Item name="productName" label="Tên sản phẩm" rules={[{ required: true }]}><Input /></Form.Item>
          <Space style={{ display: 'flex' }} align="start"><Form.Item name="quantity" label="Số lượng" rules={[{ required: true }]}><InputNumber min={1} /></Form.Item><Form.Item name="unit" label="Đơn vị" initialValue="box"><Input /></Form.Item><Form.Item name="targetPrice" label="Giá mục tiêu"><InputNumber min={0} /></Form.Item></Space>
          <Form.Item name="specifications" label="Yêu cầu kỹ thuật"><TextArea rows={2} /></Form.Item>
          <Form.Item name="deliveryAddress" label="Địa chỉ giao hàng" rules={[{ required: true }]}><Input /></Form.Item>
          <Space style={{ display: 'flex' }} align="start"><Form.Item name="deliveryDateRequired" label="Ngày cần giao" rules={[{ required: true }]}><DatePicker disabledDate={(date) => date.isBefore(dayjs(), 'day')} /></Form.Item><Form.Item name="bidDeadline" label="Hạn nhận báo giá" rules={[{ required: true }]}><DatePicker showTime disabledDate={(date) => date.isBefore(dayjs(), 'day')} /></Form.Item></Space>
          <Space style={{ display: 'flex' }}><Form.Item name="budgetRangeMin" label="Ngân sách từ"><InputNumber min={0} /></Form.Item><Form.Item name="budgetRangeMax" label="Đến"><InputNumber min={0} /></Form.Item></Space>
        </Form>
      </Modal>
      <Modal title={`Báo giá · ${activeRfq?.rfqNumber ?? ''}`} open={bidsOpen} onCancel={() => setBidsOpen(false)} footer={null} width={1000}>
        <Table rowKey="id" columns={bidColumns} dataSource={bids} pagination={false} />
      </Modal>
    </main>
  </div>;
}
