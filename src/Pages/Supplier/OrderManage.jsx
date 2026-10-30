import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert, Button, Card, Descriptions, Empty, Form, Input, InputNumber, Modal,
  Select, Space, Table, Tag, Typography, message,
} from 'antd';
import { EyeOutlined, PictureOutlined, ReloadOutlined } from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import customPackagingService from '../../services/customPackagingService';
import orderService from '../../services/orderService';

const { Text } = Typography;
const { TextArea } = Input;
const money = (value) => `${Number(value || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) => error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.';
const statusColor = {
  Pending: 'gold', Confirmed: 'blue', Processing: 'purple', Shipped: 'cyan',
  Delivered: 'green', Cancelled: 'red',
};

export default function OrderManage({ onNavigate }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [packaging, setPackaging] = useState(null);
  const [packagingOpen, setPackagingOpen] = useState(false);
  const [packagingLoading, setPackagingLoading] = useState(false);
  const [revisionForm] = Form.useForm();

  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      setOrders(await orderService.listSupplierOrders());
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(loadOrders, 0);
    return () => window.clearTimeout(timeout);
  }, [loadOrders]);

  const filteredOrders = useMemo(
    () => status === 'All' ? orders : orders.filter((order) => order.status === status),
    [orders, status],
  );

  const runAction = async (action, order, successText) => {
    try {
      await action(order.id);
      message.success(successText);
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    }
  };

  const openPackaging = async (order) => {
    setSelectedOrder(order);
    setPackagingOpen(true);
    setPackaging(null);
    setPackagingLoading(true);
    revisionForm.resetFields();
    try {
      setPackaging(await customPackagingService.get(order.id));
    } catch (error) {
      if (error?.response?.status !== 404) message.error(errorMessage(error));
    } finally {
      setPackagingLoading(false);
    }
  };

  const submitRevision = async (values) => {
    setPackagingLoading(true);
    try {
      await customPackagingService.submitRevision(selectedOrder.id, values);
      message.success('Đã gửi mockup để khách hàng duyệt.');
      setPackaging(await customPackagingService.get(selectedOrder.id));
      revisionForm.resetFields();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setPackagingLoading(false);
    }
  };

  const rejectOrder = (order) => {
    let reason = '';
    Modal.confirm({
      title: `Từ chối đơn ${order.orderNumber}`,
      content: <Input.TextArea rows={3} placeholder="Lý do từ chối" onChange={(event) => { reason = event.target.value; }} />,
      okText: 'Xác nhận từ chối',
      okButtonProps: { danger: true },
      cancelText: 'Quay lại',
      onOk: async () => {
        if (reason.trim().length < 3) throw new Error('Vui lòng nhập lý do từ chối.');
        await runAction((id) => orderService.reject(id, reason.trim()), order, 'Đã từ chối đơn và hoàn tồn kho.');
      },
    });
  };

  const columns = [
    {
      title: 'Đơn hàng',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (value, order) => <Space direction="vertical" size={0}>
        <Text strong>{value}</Text>
        <Text type="secondary">{new Date(order.createdAtUtc).toLocaleString('vi-VN')}</Text>
      </Space>,
    },
    {
      title: 'Sản phẩm',
      key: 'items',
      render: (_, order) => <Space direction="vertical" size={0}>
        {order.items?.slice(0, 2).map((item) => <Text key={item.variantId}>{item.productName} · {item.quantity}</Text>)}
      </Space>,
    },
    { title: 'Ngày giao', dataIndex: 'deliveryDateExpected', key: 'deliveryDateExpected', render: (value) => value || 'Chưa đặt' },
    { title: 'Tổng tiền', dataIndex: 'totalAmount', key: 'totalAmount', align: 'right', render: money },
    {
      title: 'Bao bì',
      key: 'packaging',
      render: (_, order) => order.customPackaging
        ? <Tag color="geekblue">{order.customPackaging.status}</Tag>
        : <Tag>Tiêu chuẩn</Tag>,
    },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (value) => <Tag color={statusColor[value]}>{value}</Tag> },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 330,
      render: (_, order) => <Space wrap>
        {order.status === 'Pending' && <>
          <Button type="primary" onClick={() => runAction(orderService.confirm, order, 'Đã xác nhận đơn hàng.')}>Xác nhận</Button>
          <Button danger onClick={() => rejectOrder(order)}>Từ chối</Button>
        </>}
        {order.status === 'Confirmed' && <Button type="primary" onClick={() => runAction(orderService.startProcessing, order, 'Đơn đã chuyển sang sản xuất.')}>Bắt đầu sản xuất</Button>}
        {order.status === 'Processing' && <Button type="primary" onClick={() => runAction(orderService.ship, order, 'Đơn đã chuyển sang giao hàng.')}>Xuất hàng</Button>}
        {order.customPackaging && <Button icon={<PictureOutlined />} onClick={() => openPackaging(order)}>Bao bì</Button>}
      </Space>,
    },
  ];

  return <ColonyAdminLayout
    role="Supplier"
    activeKey="nha-cung-cap/quan-ly-don-hang"
    onNavigate={onNavigate}
    title="Đơn hàng B2B"
    subtitle="Xác nhận đơn, duyệt quy trình mockup và theo dõi giao hàng trong một màn hình."
  >
    <Alert type="info" showIcon style={{ marginBottom: 20 }}
      message="Đơn có bao bì tùy chỉnh chỉ được đưa vào sản xuất sau khi khách hàng duyệt mockup." />
    <Card extra={<Space>
      <Select value={status} onChange={setStatus} style={{ width: 170 }} options={[
        'All', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled',
      ].map((value) => ({ value, label: value === 'All' ? 'Tất cả trạng thái' : value }))} />
      <Button icon={<ReloadOutlined />} onClick={loadOrders}>Tải lại</Button>
    </Space>}>
      <Table rowKey="id" loading={loading} columns={columns} dataSource={filteredOrders}
        scroll={{ x: 1050 }} pagination={{ pageSize: 10, showSizeChanger: false }} />
    </Card>

    <Modal title={`Bao bì tùy chỉnh · ${selectedOrder?.orderNumber || ''}`} open={packagingOpen}
      onCancel={() => setPackagingOpen(false)} footer={null} width={780} loading={packagingLoading}>
      {!packaging ? <Empty description="Đơn hàng không yêu cầu bao bì riêng." /> : <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Descriptions bordered column={2} size="small">
          <Descriptions.Item label="Doanh nghiệp">{packaging.companyName}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái"><Tag color="blue">{packaging.status}</Tag></Descriptions.Item>
          <Descriptions.Item label="Quy cách">{packaging.packagingType}</Descriptions.Item>
          <Descriptions.Item label="Logo"><a href={packaging.companyLogoUrl} target="_blank" rel="noreferrer"><EyeOutlined /> Xem logo</a></Descriptions.Item>
          <Descriptions.Item label="Thông điệp" span={2}>{packaging.specialMessage || '—'}</Descriptions.Item>
        </Descriptions>

        {packaging.revisions?.map((revision) => <Card key={revision.id} size="small"
          title={`Phiên bản ${revision.revisionNumber}`} extra={<Tag>{revision.status}</Tag>}>
          <Space direction="vertical">
            <a href={revision.mockupUrl} target="_blank" rel="noreferrer">Mở mockup</a>
            <Text>Phí thiết kế: {money(revision.designFee)}</Text>
            {revision.customerNotes && <Text type="danger">Khách yêu cầu: {revision.customerNotes}</Text>}
          </Space>
        </Card>)}

        {['Pending', 'DesignReview', 'RevisionRequested'].includes(packaging.status) && <Card size="small" title="Gửi phiên bản mockup mới">
          <Form form={revisionForm} layout="vertical" onFinish={submitRevision}>
            <Form.Item name="mockupUrl" label="URL mockup HTTPS" rules={[{ required: true }, { type: 'url' }]}><Input placeholder="https://..." /></Form.Item>
            <Form.Item name="designFee" label="Phí thiết kế" initialValue={0} rules={[{ required: true }]}><InputNumber min={0} max={100000000} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="supplierNotes" label="Ghi chú cho khách hàng"><TextArea rows={3} maxLength={2000} showCount /></Form.Item>
            <Button type="primary" htmlType="submit" loading={packagingLoading}>Gửi mockup</Button>
          </Form>
        </Card>}
      </Space>}
    </Modal>
  </ColonyAdminLayout>;
}
