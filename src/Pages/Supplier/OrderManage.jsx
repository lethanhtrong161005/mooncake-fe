import { useEffect, useState } from 'react';
import { Button, Card, Input, Space, Table, Tag, message } from 'antd';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import { orderService } from '../../services/orderService';
import { DEMO_ORDERS } from '../../constants/demoMarketplaceData';
import DemoIllustrationNotice from '../../components/DemoIllustrationNotice';

export default function OrderManage({ onNavigate }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const result = await orderService.listSupplierOrders();
      const live = result.items ?? result ?? [];
      setOrders(live.length ? live : DEMO_ORDERS);
    } catch (error) {
      message.error(error.message || 'Không thể tải đơn hàng.');
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const run = async (record, action) => {
    setBusyId(record.id);
    try {
      if (action === 'confirm') await orderService.confirm(record.id);
      if (action === 'reject') await orderService.reject(record.id, 'Supplier rejected this order.');
      if (action === 'processing') await orderService.startProcessing(record.id);
      if (action === 'ship') await orderService.ship(record.id);
      message.success('Đã cập nhật trạng thái đơn hàng.');
      await load();
    } catch (error) { message.error(error.message || 'Không thể cập nhật đơn hàng.'); }
    finally { setBusyId(null); }
  };

  const columns = [
    { title: 'Mã đơn', dataIndex: 'orderNumber', key: 'orderNumber' },
    { title: 'Khách hàng', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Sản phẩm', dataIndex: 'items', key: 'items', render: (items) => items?.map((item) => `${item.productName} × ${item.quantity}`).join(', ') || '—' },
    { title: 'Tổng tiền', dataIndex: 'totalAmount', key: 'totalAmount', render: (amount) => `${amount?.toLocaleString('vi-VN')} ₫` },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (status) => <Tag>{status}</Tag> },
    { title: 'Thao tác', key: 'actions', render: (_, record) => record.isDemo ? <Tag color="blue">Chỉ xem</Tag> : <Space wrap>
      {record.status === 'Pending' && <><Button loading={busyId === record.id} onClick={() => run(record, 'confirm')}>Xác nhận</Button><Button danger loading={busyId === record.id} onClick={() => run(record, 'reject')}>Từ chối</Button></>}
      {record.status === 'Confirmed' && <Button loading={busyId === record.id} onClick={() => run(record, 'processing')}>Bắt đầu xử lý</Button>}
      {record.status === 'Processing' && <Button loading={busyId === record.id} onClick={() => run(record, 'ship')}>Đánh dấu đã gửi</Button>}
    </Space> },
  ];

  return <ColonyAdminLayout role="Supplier" activeKey="nha-cung-cap/quan-ly-don-hang" onNavigate={onNavigate}
    title="Quản lý đơn hàng B2B" subtitle="Xử lý đơn hàng và cập nhật trạng thái trực tiếp qua hệ thống.">
    {orders.some((order) => order.isDemo) && <DemoIllustrationNotice style={{ marginBottom: 16 }} description="Database chưa có đơn hàng. Các đơn dưới đây chỉ minh họa bố cục và không thể xác nhận, từ chối hoặc cập nhật." />}
    <Card title="Đơn hàng nhận được" extra={<Button onClick={load}>Tải lại</Button>}><Table rowKey="id" loading={loading} columns={columns} dataSource={orders} pagination={{ pageSize: 10 }} /></Card>
  </ColonyAdminLayout>;
}
