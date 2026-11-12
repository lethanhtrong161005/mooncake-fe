import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert, Button, Card, Col, Descriptions, Drawer, Form, Input, InputNumber,
  Modal, Row, Space, Table, Tag, Tooltip, Typography, message,
} from 'antd';
import { CloseOutlined, QuestionCircleOutlined, ReloadOutlined, SendOutlined } from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import rfqService from '../../services/rfqService';
import usePagedList from '../../hooks/usePagedList';
import FilterBar from '../../components/common/FilterBar';
import { signalRManager } from '../../services/signalrService';

const { Text, Title } = Typography;
const { TextArea } = Input;
const formatMoneyInput = (value) => value === undefined || value === null || value === '' ? '' : Number(value).toLocaleString('en-US', { maximumFractionDigits: 2 });
function MoneyInput({ value, onChange, ...props }) {
  const update = (event) => {
    const input = event.target;
    const raw = input.value;
    const digitsBeforeCursor = raw.slice(0, input.selectionStart ?? raw.length).replace(/\D/g, '').length;
    const normalized = raw.replace(/,/g, '').replace(/[^\d.]/g, '');
    const amount = normalized === '' ? null : Number(normalized);
    if (normalized === '' || Number.isFinite(amount)) onChange?.(amount);
    const formatted = formatMoneyInput(normalized);
    requestAnimationFrame(() => {
      let position = 0;
      let digits = 0;
      while (position < formatted.length && digits < digitsBeforeCursor) {
        if (/\d/.test(formatted[position])) digits += 1;
        position += 1;
      }
      input.setSelectionRange(position, position);
    });
  };
  return <Input {...props} inputMode="decimal" value={formatMoneyInput(value)} onChange={update} />;
}
const money = (amount) => `${Number(amount || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) => error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.';
const statusColor = { Open: 'processing', InNegotiation: 'warning', Closed: 'gold', Awarded: 'success', Cancelled: 'error' };
const helpLabel = (label, explanation) => <Space size={4}>{label}<Tooltip title={explanation}><QuestionCircleOutlined
  tabIndex={0} aria-label={`Giải thích: ${label}`} style={{ color: '#8c8c8c', cursor: 'help' }} /></Tooltip></Space>;

export default function BiddingPage({ onNavigate }) {
  const rfqPage = usePagedList(rfqService.listSupplierInvitationsPaged);
  const rfqs = rfqPage.items;
  const loading = rfqPage.loading;
  const [selectedRfq, setSelectedRfq] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const quoteLines = Form.useWatch('items', form);

  const loadRfqs = rfqPage.refresh;
  useEffect(() => { if (rfqPage.error) message.error(errorMessage(rfqPage.error)); }, [rfqPage.error]);
  useEffect(() => {
    const refreshRfqs = (notification) => {
      if (notification?.type?.startsWith('bid.') || notification?.type?.startsWith('rfq.')) loadRfqs();
    };
    signalRManager.on('ReceiveNotification', refreshRfqs);
    signalRManager.on('MarketplaceChanged', refreshRfqs);
    return () => {
      signalRManager.off('ReceiveNotification', refreshRfqs);
      signalRManager.off('MarketplaceChanged', refreshRfqs);
    };
  }, [loadRfqs]);

  const openBid = async (rfq) => {
    setSubmitting(true);
    try {
      const detail = await rfqService.get(rfq.id);
      setSelectedRfq(detail);
      const myBid = detail.myBid;
      const remainingValidityDays = Math.max(1, Math.ceil((new Date(detail.bidDeadline).getTime() - Date.now()) / 86400000));
      form.setFieldsValue({
        estimatedDeliveryDays: myBid?.estimatedDeliveryDays ?? 7,
        validityDays: Math.min(myBid?.validityDays ?? 30, remainingValidityDays),
        notes: myBid?.notes ?? '',
        items: detail.items.map((item) => {
          const bidItem = myBid?.items.find((line) => line.rfqItemId === item.id);
          return { rfqItemId: item.id, unitPrice: bidItem?.unitPrice ?? 0, notes: bidItem?.notes ?? '' };
        }),
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
      message.success(selectedRfq.myBid
        ? 'Đã cập nhật báo giá. Khách hàng đã được thông báo.'
        : 'Đã nộp báo giá niêm phong. Khách hàng đã được thông báo.');
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

  const respondToSelection = (rfq, accept) => {
    Modal.confirm({
      title: accept ? 'Xác nhận nhận đơn hàng?' : 'Từ chối yêu cầu chọn?',
      content: accept
        ? 'Sau khi xác nhận, hệ thống sẽ tạo hợp đồng để customer xem và tiếp tục các bước thanh toán.'
        : 'RFQ sẽ được mở lại để customer có thể chọn supplier khác.',
      okText: accept ? 'Xác nhận' : 'Từ chối lựa chọn',
      okButtonProps: accept ? {} : { danger: true },
      cancelText: 'Quay lại',
      onOk: async () => {
        setSubmitting(true);
        try {
          const result = await rfqService.respondToBidSelection(rfq.id, rfq.myBid.id, accept);
          message.success(result.message || 'Đã ghi nhận phản hồi.');
          await loadRfqs();
          if (accept) onNavigate?.('hop-dong-tien-do');
        } catch (error) {
          message.error(errorMessage(error));
        } finally {
          setSubmitting(false);
        }
      },
    });
  };

  const total = useMemo(() => selectedRfq?.items?.reduce((sum, item, index) =>
    sum + Number(quoteLines?.[index]?.unitPrice || 0) * item.quantity, 0) || 0,
  [quoteLines, selectedRfq]);
  const columns = [
    { title: 'RFQ', dataIndex: 'rfqNumber', render: (value) => <Text strong>{value}</Text> },
    { title: 'Người tạo / thời gian', render: (_, item) => <Space direction="vertical" size={0}><Text>{item.customerName || 'Không rõ người tạo'}</Text><Text type="secondary">{item.createdAt ? new Date(item.createdAt).toLocaleString('vi-VN') : 'Không có thời gian'}</Text></Space> },
    { title: 'Gói thầu', dataIndex: 'title', render: (value, item) => <Space direction="vertical" size={0}><Text>{value}</Text><Text type="secondary">Giao trước: {item.deliveryDateRequired}</Text></Space> },
    { title: 'Hạn báo giá', dataIndex: 'bidDeadline', render: (value) => new Date(value).toLocaleString('vi-VN') },
    { title: 'Nguồn', dataIndex: 'isInvited', render: (value) => <Tag color={value ? 'blue' : 'default'}>{value ? 'Được mời' : 'Đang mở'}</Tag> },
    { title: 'Trạng thái', dataIndex: 'status', render: (value) => <Tag color={statusColor[value]}>{value === 'InNegotiation' ? 'Chờ bạn xác nhận' : value}</Tag> },
    { title: 'Thao tác', render: (_, item) => item.awaitingSupplierConfirmation
      ? <Space><Button type="primary" loading={submitting} onClick={() => respondToSelection(item, true)}>Xác nhận</Button><Button danger loading={submitting} onClick={() => respondToSelection(item, false)}>Từ chối</Button></Space>
      : <Space><Button type="primary" icon={<SendOutlined />} disabled={item.status !== 'Open' || new Date(item.bidDeadline) <= new Date()} onClick={() => openBid(item)}>{item.myBid ? 'Sửa báo giá' : 'Nộp báo giá'}</Button>{item.canDecline && item.status === 'Open' && <Button danger icon={<CloseOutlined />} onClick={() => decline(item)}>Từ chối</Button>}</Space> },
  ];

  return <ColonyAdminLayout role="Supplier" activeKey="nha-cung-cap/dau-thau" onNavigate={onNavigate}
    title="RFQ đang mở & báo giá niêm phong" subtitle="Supplier đủ điều kiện có thể tham gia RFQ đang mở, dù được mời hay tự tìm thấy.">
    <Alert type="info" showIcon style={{ marginBottom: 20 }} message="Quy tắc báo giá" description="Chỉ nộp hoặc sửa khi RFQ còn mở và trước hạn chót; cần báo giá cho toàn bộ hạng mục. Báo giá của bạn được niêm phong với các xưởng khác." />
    <Card extra={<Button icon={<ReloadOutlined />} onClick={loadRfqs}>Tải lại</Button>}>
      <FilterBar search={rfqPage.search} onSearchChange={rfqPage.setSearch}
        status={rfqPage.query.status} onStatusChange={rfqPage.setStatus} onReset={rfqPage.reset}
        placeholder="Tìm mã RFQ hoặc tiêu đề"
        statusOptions={Object.keys(statusColor).map((value) => ({ value, label: value }))} />
      <Table rowKey="id" loading={loading} columns={columns} dataSource={rfqs} scroll={{ x: 920 }}
        pagination={{ current: rfqPage.query.page, pageSize: rfqPage.query.pageSize,
          total: rfqPage.totalCount, onChange: rfqPage.setPage,
          showSizeChanger: true, pageSizeOptions: [10, 20, 50, 100] }} />
    </Card>
    <Drawer title={`${selectedRfq?.myBid ? 'Sửa báo giá' : 'Nộp báo giá'} · ${selectedRfq?.rfqNumber || ''}`} width={760} open={drawerOpen} onClose={() => setDrawerOpen(false)} footer={<Space><Button onClick={() => setDrawerOpen(false)}>Đóng</Button><Button type="primary" loading={submitting} onClick={() => form.submit()}>{selectedRfq?.myBid ? 'Cập nhật báo giá' : 'Gửi báo giá niêm phong'}</Button></Space>}>
      {selectedRfq && <><Descriptions bordered size="small" column={1} style={{ marginBottom: 18 }}><Descriptions.Item label="Gói thầu">{selectedRfq.title}</Descriptions.Item><Descriptions.Item label="Người tạo">{selectedRfq.customerName || 'Không rõ người tạo'}</Descriptions.Item><Descriptions.Item label="Thời gian tạo">{selectedRfq.createdAt ? new Date(selectedRfq.createdAt).toLocaleString('vi-VN') : 'Không có thời gian'}</Descriptions.Item><Descriptions.Item label="Hạn nộp">{new Date(selectedRfq.bidDeadline).toLocaleString('vi-VN')}</Descriptions.Item><Descriptions.Item label="Ngày giao">{selectedRfq.deliveryDateRequired}</Descriptions.Item></Descriptions>
        <Form form={form} layout="vertical" onFinish={submitBid}>
        <Form.List name="items">{(fields) => <Space direction="vertical" style={{ width: '100%' }}>{fields.map((field, index) => { const item = selectedRfq.items[index]; return <Card key={field.key} size="small" title={`${item.productName} × ${item.quantity} ${item.unit}`}><Form.Item {...field} name={[field.name, 'rfqItemId']} hidden><Input /></Form.Item><Row gutter={12}><Col xs={24} md={12}><Form.Item {...field} name={[field.name, 'unitPrice']} label={helpLabel('Đơn giá', 'Giá cho một đơn vị sản phẩm (ví dụ: một hộp), tính bằng đồng. Tổng dòng hàng được tính bằng đơn giá nhân số lượng.')} rules={[{ required: true, message: 'Nhập đơn giá.' }]}><MoneyInput min={0.01} style={{ width: '100%' }} /></Form.Item></Col><Col xs={24} md={12}><Form.Item {...field} name={[field.name, 'notes']} label={helpLabel('Ghi chú dòng hàng', 'Thông tin riêng cho mặt hàng này như quy cách, bao bì, thương hiệu hoặc điều kiện giá.')}><Input /></Form.Item></Col></Row></Card>; })}</Space>}</Form.List>
          <Row gutter={12} style={{ marginTop: 16 }}><Col span={12}><Form.Item name="estimatedDeliveryDays" label={helpLabel('Số ngày giao hàng', 'Số ngày dự kiến để chuẩn bị và giao đủ hàng theo yêu cầu của RFQ.')} rules={[{ required: true }]}><InputNumber min={1} max={365} style={{ width: '100%' }} /></Form.Item></Col><Col span={12}><Form.Item name="validityDays" label={helpLabel('Hiệu lực báo giá', 'Báo giá có hiệu lực từ lúc gửi đến khi hết hạn nhận thầu.')} rules={[{ required: true }, { validator: (_, value) => {
            const remaining = Math.ceil((new Date(selectedRfq.bidDeadline).getTime() - Date.now()) / 86400000);
            return value <= Math.max(1, remaining) ? Promise.resolve() : Promise.reject(new Error('Hiệu lực không được vượt quá thời gian còn lại đến hạn nhận thầu.'));
          } }]}><InputNumber min={1} max={Math.max(1, Math.ceil((new Date(selectedRfq.bidDeadline).getTime() - Date.now()) / 86400000))} style={{ width: '100%' }} /></Form.Item></Col></Row>
          <Form.Item name="notes" label={helpLabel('Cam kết / ưu đãi', 'Ghi điều kiện chung cho báo giá như phí vận chuyển, phương thức thanh toán, chiết khấu hoặc cam kết chất lượng.')}><TextArea rows={4} maxLength={4000} showCount /></Form.Item>
          <Card size="small"><Title level={5}>Tổng báo giá dự kiến: {money(total)}</Title></Card>
        </Form></>}
    </Drawer>
  </ColonyAdminLayout>;
}
