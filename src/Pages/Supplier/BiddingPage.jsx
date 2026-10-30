import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert, Button, Card, Col, Descriptions, Drawer, Form, Input, InputNumber,
  Modal, Row, Space, Table, Tag, Typography, message,
} from 'antd';
import { CloseOutlined, ReloadOutlined, SendOutlined } from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import rfqService from '../../services/rfqService';

const { Text, Title } = Typography;
const { TextArea } = Input;
const money = (amount) => `${Number(amount || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) => error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.';
const statusColor = { Open: 'processing', Closed: 'gold', Awarded: 'success', Cancelled: 'error' };

export default function BiddingPage({ onNavigate }) {
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRfq, setSelectedRfq] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const quoteLines = Form.useWatch('items', form);

  const loadRfqs = useCallback(async () => {
    setLoading(true);
    try {
      setRfqs(await rfqService.listSupplierInvitations());
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

  const openBid = async (rfq) => {
    setSubmitting(true);
    try {
      const detail = await rfqService.get(rfq.id);
      setSelectedRfq(detail);
      form.setFieldsValue({
        estimatedDeliveryDays: 7,
        validityDays: 30,
        notes: '',
        items: detail.items.map((item) => ({ rfqItemId: item.id, unitPrice: 0, notes: '' })),
      });
      setDrawerOpen(true);
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const submitBid = async (values) => {
    setSubmitting(true);
    try {
      await rfqService.submitBid(selectedRfq.id, values);
      message.success('Đã nộp báo giá niêm phong. Khách hàng đã được thông báo.');
      setDrawerOpen(false);
      await loadRfqs();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const decline = (rfq) => {
    let reason = '';
    Modal.confirm({
      title: `Từ chối lời mời ${rfq.rfqNumber}`,
      content: <TextArea rows={3} onChange={(event) => { reason = event.target.value; }} placeholder="Lý do từ chối (ít nhất 3 ký tự)" />,
      okText: 'Từ chối lời mời',
      okButtonProps: { danger: true },
      cancelText: 'Quay lại',
      onOk: async () => {
        if (reason.trim().length < 3) throw new Error('Vui lòng nhập lý do từ chối.');
        await rfqService.decline(rfq.id, reason.trim());
        message.success('Đã gửi phản hồi từ chối.');
        await loadRfqs();
      },
    });
  };

  const total = useMemo(() => selectedRfq?.items?.reduce((sum, item, index) =>
    sum + Number(quoteLines?.[index]?.unitPrice || 0) * item.quantity, 0) || 0,
  [quoteLines, selectedRfq]);
  const columns = [
    { title: 'RFQ', dataIndex: 'rfqNumber', render: (value) => <Text strong>{value}</Text> },
    { title: 'Gói thầu', dataIndex: 'title', render: (value, item) => <Space direction="vertical" size={0}><Text>{value}</Text><Text type="secondary">Giao trước: {item.deliveryDateRequired}</Text></Space> },
    { title: 'Hạn báo giá', dataIndex: 'bidDeadline', render: (value) => new Date(value).toLocaleString('vi-VN') },
    { title: 'Trạng thái', dataIndex: 'status', render: (value) => <Tag color={statusColor[value]}>{value}</Tag> },
    { title: 'Thao tác', render: (_, item) => <Space><Button type="primary" icon={<SendOutlined />} disabled={item.status !== 'Open'} onClick={() => openBid(item)}>Nộp báo giá</Button>{item.status === 'Open' && <Button danger icon={<CloseOutlined />} onClick={() => decline(item)}>Từ chối</Button>}</Space> },
  ];

  return <ColonyAdminLayout role="Supplier" activeKey="nha-cung-cap/dau-thau" onNavigate={onNavigate}
    title="RFQ được mời & báo giá niêm phong" subtitle="Báo giá đầy đủ từng hạng mục; các xưởng khác không thể xem giá của bạn.">
    <Alert type="info" showIcon style={{ marginBottom: 20 }} message="Quy tắc báo giá" description="Chỉ nộp khi RFQ còn mở và phải báo giá cho toàn bộ hạng mục. Báo giá có thể được cập nhật trước hạn chót theo chính sách RFQ." />
    <Card extra={<Button icon={<ReloadOutlined />} onClick={loadRfqs}>Tải lại</Button>}><Table rowKey="id" loading={loading} columns={columns} dataSource={rfqs} scroll={{ x: 920 }} /></Card>
    <Drawer title={`Nộp báo giá · ${selectedRfq?.rfqNumber || ''}`} width={760} open={drawerOpen} onClose={() => setDrawerOpen(false)} footer={<Space><Button onClick={() => setDrawerOpen(false)}>Đóng</Button><Button type="primary" loading={submitting} onClick={() => form.submit()}>Gửi báo giá niêm phong</Button></Space>}>
      {selectedRfq && <><Descriptions bordered size="small" column={1} style={{ marginBottom: 18 }}><Descriptions.Item label="Gói thầu">{selectedRfq.title}</Descriptions.Item><Descriptions.Item label="Hạn nộp">{new Date(selectedRfq.bidDeadline).toLocaleString('vi-VN')}</Descriptions.Item><Descriptions.Item label="Ngày giao">{selectedRfq.deliveryDateRequired}</Descriptions.Item></Descriptions>
        <Form form={form} layout="vertical" onFinish={submitBid}>
          <Form.List name="items">{(fields) => <Space direction="vertical" style={{ width: '100%' }}>{fields.map((field, index) => { const item = selectedRfq.items[index]; return <Card key={field.key} size="small" title={`${item.productName} × ${item.quantity} ${item.unit}`}><Form.Item {...field} name={[field.name, 'rfqItemId']} hidden><Input /></Form.Item><Row gutter={12}><Col xs={24} md={12}><Form.Item {...field} name={[field.name, 'unitPrice']} label="Đơn giá" rules={[{ required: true, message: 'Nhập đơn giá.' }]}><InputNumber min={0.01} style={{ width: '100%' }} /></Form.Item></Col><Col xs={24} md={12}><Form.Item {...field} name={[field.name, 'notes']} label="Ghi chú dòng hàng"><Input /></Form.Item></Col></Row></Card>; })}</Space>}</Form.List>
          <Row gutter={12} style={{ marginTop: 16 }}><Col span={12}><Form.Item name="estimatedDeliveryDays" label="Số ngày giao hàng" rules={[{ required: true }]}><InputNumber min={1} max={365} style={{ width: '100%' }} /></Form.Item></Col><Col span={12}><Form.Item name="validityDays" label="Hiệu lực báo giá" rules={[{ required: true }]}><InputNumber min={1} max={365} style={{ width: '100%' }} /></Form.Item></Col></Row>
          <Form.Item name="notes" label="Cam kết / ưu đãi"><TextArea rows={4} maxLength={4000} showCount /></Form.Item>
          <Card size="small"><Title level={5}>Tổng báo giá dự kiến: {money(total)}</Title></Card>
        </Form></>}
    </Drawer>
  </ColonyAdminLayout>;
}
