import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert, Button, Card, Col, DatePicker, Descriptions, Drawer, Form, Input,
  InputNumber, Modal, Row, Select, Space, Table, Tag, Typography, message,
} from 'antd';
import { PlusOutlined, ReloadOutlined, SolutionOutlined, TeamOutlined } from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import rfqService from '../../services/rfqService';

const { Title, Text } = Typography;
const { TextArea } = Input;
const money = (amount) => `${Number(amount || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) => error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.';
const statusColor = { Draft: 'default', Open: 'processing', Closed: 'gold', Awarded: 'success', Cancelled: 'error' };

export default function BiddingAndQuoteComparison({ onNavigate }) {
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [selectedRfq, setSelectedRfq] = useState(null);
  const [bids, setBids] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [form] = Form.useForm();
  const [inviteForm] = Form.useForm();

  const loadRfqs = useCallback(async () => {
    setLoading(true);
    try {
      setRfqs(await rfqService.listMine());
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(loadRfqs, 0);
    return () => window.clearTimeout(timeout);
  }, [loadRfqs]);

  const createRfq = async (values) => {
    setActionLoading(true);
    try {
      const draft = await rfqService.create({
        title: values.title,
        description: values.description || null,
        deliveryAddress: values.deliveryAddress,
        deliveryDateRequired: values.deliveryDateRequired.format('YYYY-MM-DD'),
        budgetRangeMin: values.budgetRangeMin || null,
        budgetRangeMax: values.budgetRangeMax || null,
        bidDeadline: values.bidDeadline.toDate().toISOString(),
        items: values.items.map((item) => ({
          productName: item.productName,
          description: item.description || null,
          quantity: item.quantity,
          unit: item.unit,
          targetPrice: item.targetPrice || null,
          specifications: item.specifications || null,
          packagingRequirements: item.packagingRequirements || null,
          needsCustomPackaging: Boolean(item.needsCustomPackaging),
        })),
      });
      await rfqService.publish(draft.id);
      message.success(`Đã phát hành ${draft.rfqNumber}.`);
      setCreateOpen(false);
      await loadRfqs();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const openCompare = async (rfq) => {
    setSelectedRfq(rfq);
    setCompareOpen(true);
    setActionLoading(true);
    try {
      setBids(await rfqService.listBids(rfq.id));
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const openInvite = async (rfq) => {
    setSelectedRfq(rfq);
    setInviteOpen(true);
    setSuggestions([]);
    inviteForm.resetFields();
    setActionLoading(true);
    try {
      setSuggestions(await rfqService.suggestedSuppliers(rfq.id));
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const inviteSuppliers = async ({ supplierUserIds }) => {
    setActionLoading(true);
    try {
      await rfqService.invite(selectedRfq.id, supplierUserIds);
      message.success('Đã gửi lời mời tham gia báo giá.');
      setInviteOpen(false);
      await loadRfqs();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const acceptBid = async (bid) => {
    setActionLoading(true);
    try {
      const contract = await rfqService.acceptBid(selectedRfq.id, bid.id,
        'Báo giá đáp ứng tiến độ và yêu cầu kỹ thuật.');
      message.success(`Đã chọn thầu. Hợp đồng ${contract.contractNumber} đã được tạo.`);
      setCompareOpen(false);
      await loadRfqs();
      onNavigate?.('hop-dong-tien-do');
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const bestBidId = useMemo(() => bids.filter((bid) => !bid.isExpired && bid.status === 'Submitted')
    .sort((left, right) => Number(left.totalPrice) - Number(right.totalPrice))[0]?.id, [bids]);
  const columns = [
    { title: 'RFQ', dataIndex: 'rfqNumber', render: (value) => <Text strong>{value}</Text> },
    { title: 'Nhu cầu', dataIndex: 'title', render: (value, item) => <Space direction="vertical" size={0}><Text>{value}</Text><Text type="secondary">{item.items?.reduce((total, line) => total + line.quantity, 0)} sản phẩm</Text></Space> },
    { title: 'Ngân sách', render: (_, item) => `${money(item.budgetRangeMin)} – ${money(item.budgetRangeMax)}` },
    { title: 'Hạn nhận thầu', dataIndex: 'bidDeadline', render: (value) => new Date(value).toLocaleString('vi-VN') },
    { title: 'Báo giá', dataIndex: 'bidCount', align: 'center', render: (value) => <Tag color={value ? 'blue' : 'default'}>{value}</Tag> },
    { title: 'Trạng thái', dataIndex: 'status', render: (value) => <Tag color={statusColor[value]}>{value}</Tag> },
    { title: 'Thao tác', render: (_, item) => <Space wrap>
      {item.status === 'Open' && <Button icon={<TeamOutlined />} onClick={() => openInvite(item)}>Mời xưởng</Button>}
      <Button type="primary" icon={<SolutionOutlined />} disabled={!item.bidCount} onClick={() => openCompare(item)}>So sánh</Button>
    </Space> },
  ];

  return <div style={{ minHeight: '100vh', background: '#f5f5f7' }}>
    <CustomerHeader activeKey="so-sanh-bao-gia" onNavigate={onNavigate} />
    <main style={{ maxWidth: 1320, margin: '0 auto', padding: '28px 20px 64px' }}>
      <Space direction="vertical" size={4} style={{ marginBottom: 20 }}><Title level={2} style={{ margin: 0 }}>Yêu cầu báo giá & đấu thầu</Title><Text type="secondary">Phát hành RFQ, mời xưởng đã xác minh và chọn báo giá phù hợp.</Text></Space>
      <Alert type="info" showIcon style={{ marginBottom: 20 }} message="Báo giá được niêm phong" description="Chỉ doanh nghiệp tạo RFQ mới xem và so sánh toàn bộ báo giá." />
      <Card extra={<Space><Button icon={<ReloadOutlined />} onClick={loadRfqs}>Tải lại</Button><Button type="primary" icon={<PlusOutlined />} onClick={() => { form.resetFields(); setCreateOpen(true); }}>Tạo RFQ</Button></Space>}>
        <Table rowKey="id" loading={loading} columns={columns} dataSource={rfqs} scroll={{ x: 1000 }} />
      </Card>
    </main>

    <Modal title="Tạo yêu cầu báo giá" open={createOpen} onCancel={() => setCreateOpen(false)} footer={null} width={850}>
      <Form form={form} layout="vertical" onFinish={createRfq} initialValues={{ items: [{ unit: 'Hộp', quantity: 100 }] }}>
        <Row gutter={16}><Col xs={24} md={12}><Form.Item name="title" label="Tiêu đề" rules={[{ required: true, min: 5 }]}><Input /></Form.Item></Col><Col xs={24} md={12}><Form.Item name="deliveryAddress" label="Địa chỉ giao" rules={[{ required: true, min: 10 }]}><Input /></Form.Item></Col></Row>
        <Form.Item name="description" label="Mô tả"><TextArea rows={2} maxLength={5000} showCount /></Form.Item>
        <Row gutter={16}><Col xs={24} md={8}><Form.Item name="deliveryDateRequired" label="Ngày giao" rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} /></Form.Item></Col><Col xs={24} md={8}><Form.Item name="bidDeadline" label="Hạn nhận báo giá" rules={[{ required: true }]}><DatePicker showTime style={{ width: '100%' }} /></Form.Item></Col><Col xs={12} md={4}><Form.Item name="budgetRangeMin" label="Ngân sách từ"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item></Col><Col xs={12} md={4}><Form.Item name="budgetRangeMax" label="Đến"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item></Col></Row>
        <Form.List name="items">{(fields, { add, remove }) => <Space direction="vertical" style={{ width: '100%' }}>
          {fields.map((field) => <Card key={field.key} size="small" title={`Mặt hàng ${field.name + 1}`} extra={fields.length > 1 && <Button danger type="link" onClick={() => remove(field.name)}>Xóa</Button>}><Row gutter={12}><Col xs={24} md={10}><Form.Item {...field} name={[field.name, 'productName']} label="Sản phẩm" rules={[{ required: true }]}><Input /></Form.Item></Col><Col xs={12} md={4}><Form.Item {...field} name={[field.name, 'quantity']} label="Số lượng" rules={[{ required: true }]}><InputNumber min={1} style={{ width: '100%' }} /></Form.Item></Col><Col xs={12} md={4}><Form.Item {...field} name={[field.name, 'unit']} label="Đơn vị" rules={[{ required: true }]}><Input /></Form.Item></Col><Col xs={24} md={6}><Form.Item {...field} name={[field.name, 'targetPrice']} label="Giá mục tiêu"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item></Col></Row><Form.Item {...field} name={[field.name, 'specifications']} label="Quy cách"><Input /></Form.Item></Card>)}
          <Button onClick={() => add({ unit: 'Hộp', quantity: 1 })}>Thêm mặt hàng</Button>
        </Space>}</Form.List>
        <Space style={{ marginTop: 18 }}><Button onClick={() => setCreateOpen(false)}>Hủy</Button><Button type="primary" htmlType="submit" loading={actionLoading}>Phát hành RFQ</Button></Space>
      </Form>
    </Modal>

    <Modal title={`Mời xưởng · ${selectedRfq?.rfqNumber || ''}`} open={inviteOpen} onCancel={() => setInviteOpen(false)} footer={null}>
      <Form form={inviteForm} layout="vertical" onFinish={inviteSuppliers}><Form.Item name="supplierUserIds" label="Xưởng được gợi ý" rules={[{ required: true }]}><Select mode="multiple" loading={actionLoading} optionFilterProp="label" options={suggestions.map((supplier) => ({ value: supplier.userId, label: `${supplier.companyName} · Uy tín ${supplier.reputationScore}` }))} /></Form.Item><Button type="primary" htmlType="submit" loading={actionLoading}>Gửi lời mời</Button></Form>
    </Modal>

    <Drawer title={`So sánh báo giá · ${selectedRfq?.rfqNumber || ''}`} open={compareOpen} onClose={() => setCompareOpen(false)} width={960}>
      <Table rowKey="id" loading={actionLoading} dataSource={bids} pagination={false} scroll={{ x: 850 }} columns={[
        { title: 'Mã bid', dataIndex: 'bidNumber' }, { title: 'Tổng giá', dataIndex: 'totalPrice', render: (value, bid) => <Text strong type={bid.id === bestBidId ? 'success' : undefined}>{money(value)}{bid.id === bestBidId && ' · Tốt nhất'}</Text> },
        { title: 'Giao hàng', dataIndex: 'estimatedDeliveryDays', render: (value) => `${value} ngày` }, { title: 'Hiệu lực', dataIndex: 'validityDays', render: (value) => `${value} ngày` }, { title: 'Trạng thái', dataIndex: 'status', render: (value) => <Tag>{value}</Tag> },
        { title: 'Chọn thầu', render: (_, bid) => <Button type="primary" disabled={bid.status !== 'Submitted' || bid.isExpired} loading={actionLoading} onClick={() => acceptBid(bid)}>Chấp thuận</Button> },
      ]} />
      {bids.map((bid) => <Card key={bid.id} size="small" title={bid.bidNumber} style={{ marginTop: 16 }}><Descriptions size="small" column={1}>{bid.items.map((line) => <Descriptions.Item key={line.rfqItemId} label={`${line.productName} × ${line.quantity}`}>{money(line.unitPrice)} / {line.unit} · {money(line.subtotal)}</Descriptions.Item>)}</Descriptions></Card>)}
    </Drawer>
  </div>;
}
