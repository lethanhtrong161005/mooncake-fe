import { useCallback, useEffect, useState } from 'react';
import {
  Alert, App, Avatar, Button, Card, Descriptions,
  Empty, Form, Image, Input, InputNumber, Modal, Select,
  Space, Table, Tag, Tooltip, Typography,
} from 'antd';
import {
  CheckCircleOutlined, ClockCircleOutlined, DollarOutlined,
  EyeOutlined, FileTextOutlined, PictureOutlined, ReloadOutlined,
  ShoppingOutlined, SyncOutlined, WarningOutlined,
} from '@ant-design/icons';
import WorkspaceStats from '../../components/workspace/WorkspaceStats';
import { orderStatusColor, orderStatusLabel } from '../../constants/orderStatus';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import customPackagingService from '../../services/customPackagingService';
import orderService from '../../services/orderService';
import { useAuth } from '../../hooks/useAuth';
import usePagedList from '../../hooks/usePagedList';

const { Text } = Typography;
const { TextArea } = Input;

const money = (value) => `${Number(value || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) => error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.';

export default function SupplierDashboard({ onNavigate }) {
  const { user } = useAuth();
  const { message, modal } = App.useApp();
  const orderPage = usePagedList(orderService.listSupplierOrdersPaged);
  const orders = orderPage.items;
  const loading = orderPage.loading;
  const statusFilter = orderPage.query.status || 'All';
  const setStatusFilter = (value) => orderPage.setStatus(value === 'All' ? '' : value);
  const [metrics, setMetrics] = useState({ totalOrders: 0, pendingOrders: 0,
    processingOrders: 0, packagingOrders: 0, totalRevenue: 0 });

  // Modal Packaging State
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [packaging, setPackaging] = useState(null);
  const [packagingOpen, setPackagingOpen] = useState(false);
  const [packagingLoading, setPackagingLoading] = useState(false);
  const [revisionForm] = Form.useForm();

  // Load orders from API
  const loadOrders = useCallback(async () => {
    orderPage.refresh();
    try {
      setMetrics(await orderService.getSupplierDashboardSummary());
    } catch (error) {
      console.warn('Load supplier orders error:', error);
      message.error(errorMessage(error));
    }
  }, [message, orderPage.refresh]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // Actions
  const handleConfirmOrder = async (order) => {
    try {
      await orderService.confirm(order.id);
      message.success(`Đã xác nhận đơn hàng ${order.orderNumber}.`);
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    }
  };

  const handleRejectOrder = (order) => {
    let reason = '';
    modal.confirm({
      title: `Từ chối đơn hàng ${order.orderNumber}`,
      content: (
        <div style={{ marginTop: 12 }}>
          <Text type="secondary">Vui lòng cung cấp lý do từ chối để thông báo cho khách hàng:</Text>
          <TextArea
            rows={3}
            style={{ marginTop: 8 }}
            placeholder="Ví dụ: Xưởng quá tải công suất hoặc nguyên liệu tạm hết..."
            onChange={(e) => { reason = e.target.value; }}
          />
        </div>
      ),
      okText: 'Xác nhận từ chối',
      okButtonProps: { danger: true },
      cancelText: 'Hủy bỏ',
      onOk: async () => {
        if (!reason.trim() || reason.trim().length < 3) {
          message.warning('Vui lòng nhập lý do từ chối rõ ràng.');
          throw new Error('Lý do quá ngắn.');
        }
        try {
          await orderService.reject(order.id, reason.trim());
          message.success('Đã từ chối đơn hàng và hoàn lại tồn kho.');
          await loadOrders();
        } catch (error) {
          message.error(errorMessage(error));
        }
      },
    });
  };

  const openPackagingModal = async (order) => {
    setSelectedOrder(order);
    setPackagingOpen(true);
    setPackaging(null);
    setPackagingLoading(true);
    revisionForm.resetFields();
    try {
      const data = await customPackagingService.get(order.id);
      setPackaging(data);
    } catch (error) {
      if (error?.response?.status !== 404) {
        message.error(errorMessage(error));
      }
    } finally {
      setPackagingLoading(false);
    }
  };

  const submitRevision = async (values) => {
    setPackagingLoading(true);
    try {
      await customPackagingService.submitRevision(selectedOrder.id, values);
      message.success('Đã gửi phiên bản mockup cho khách hàng duyệt.');
      const updated = await customPackagingService.get(selectedOrder.id);
      setPackaging(updated);
      revisionForm.resetFields();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setPackagingLoading(false);
    }
  };

  // Columns for recent orders table
  const columns = [
    {
      title: 'Mã đơn hàng',
      key: 'orderNumber',
      width: 210,
      render: (_, order) => (
        <Space orientation="vertical" size={2}>
          <Text strong style={{ color: '#8c1524', fontFamily: 'monospace', fontSize: 13, whiteSpace: 'nowrap' }}>
            {order.orderNumber}
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {new Date(order.createdAtUtc || order.createdAt).toLocaleString('vi-VN')}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Doanh nghiệp / Khách hàng',
      key: 'customer',
      width: 260,
      render: (_, order) => (
        <Space orientation="vertical" size={2}>
          <Text strong style={{ fontSize: 13 }}>
            {order.customPackaging?.companyName || order.recipientName || 'Khách hàng B2B'}
          </Text>
          {order.recipientPhone && (
            <Text type="secondary" style={{ fontSize: 12 }}>
              Liên hệ: {order.recipientPhone}
            </Text>
          )}
          {order.deliveryAddress && (
            <Tooltip title={order.deliveryAddress}>
              <Text type="secondary" ellipsis style={{ maxWidth: 240, fontSize: 12 }}>
                📍 {order.deliveryAddress}
              </Text>
            </Tooltip>
          )}
        </Space>
      ),
    },
    {
      title: 'Sản phẩm B2B',
      key: 'items',
      width: 260,
      render: (_, order) => (
        <Space orientation="vertical" size={4}>
          {order.items?.map((item) => (
            <div key={item.variantId || item.productId} style={{ fontSize: 13 }}>
              <Text strong>{item.productName}</Text>
              <br />
              <Tag color="orange" style={{ fontSize: 11, marginTop: 2 }}>{item.quantity} cái</Tag>
            </div>
          ))}
          {(!order.items || order.items.length === 0) && <Text type="secondary">—</Text>}
        </Space>
      ),
    },
    {
      title: 'Quy cách & Mẫu hộp',
      key: 'packaging',
      width: 230,
      render: (_, order) => {
        if (!order.customPackaging) {
          return <Tag color="default">Hộp tiêu chuẩn</Tag>;
        }
        return (
          <Space align="center" size={8}>
            {order.customPackaging.companyLogoUrl ? (
              <Image
                src={order.customPackaging.companyLogoUrl}
                alt="Logo"
                width={38}
                height={38}
                style={{ objectFit: 'contain', borderRadius: 4, border: '1px solid #f0f0f0', padding: 2 }}
              />
            ) : (
              <Avatar shape="square" size={38} icon={<PictureOutlined />} />
            )}
            <Space orientation="vertical" size={2}>
              <Text strong style={{ fontSize: 12, lineHeight: 1.3 }}>
                {order.customPackaging.packagingType || 'Hộp theo yêu cầu'}
              </Text>
              <Tag color="geekblue" style={{ fontSize: 11, margin: 0, width: 'fit-content' }}>
                {order.customPackaging.status || 'Chờ duyệt'}
              </Tag>
            </Space>
          </Space>
        );
      },
    },
    {
      title: 'Tổng thanh toán',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: 'right',
      width: 150,
      render: (val) => (
        <Text strong style={{ color: '#8c1524', fontSize: 15, whiteSpace: 'nowrap' }}>
          {money(val)}
        </Text>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (val) => (
        <Tag color={orderStatusColor(val)} style={{ fontWeight: 500 }}>
          {orderStatusLabel(val)}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 230,
      render: (_, order) => (
        <Space wrap size={6}>
          {order.status === 'Pending' && (
            <>
              <Button
                type="primary"
                size="small"
                style={{ backgroundColor: '#2e7d32', borderColor: '#2e7d32' }}
                onClick={() => handleConfirmOrder(order)}
              >
                Xác nhận
              </Button>
              <Button
                danger
                size="small"
                onClick={() => handleRejectOrder(order)}
              >
                Từ chối
              </Button>
            </>
          )}
          {order.customPackaging && (
            <Button
              size="small"
              icon={<PictureOutlined />}
              onClick={() => openPackagingModal(order)}
            >
              Mockup
            </Button>
          )}
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => onNavigate?.('nha-cung-cap/quan-ly-don-hang')}
          >
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <ColonyAdminLayout
      role="Supplier"
      activeKey="nha-cung-cap/dashboard"
      onNavigate={onNavigate}
      title="Tổng quan nhà cung cấp"
      subtitle="Doanh thu, đơn hàng cần xử lý và yêu cầu bao bì riêng của xưởng."
      extra={
        <Space>
          <Button icon={<ReloadOutlined />} onClick={loadOrders} loading={loading}>
            Tải lại
          </Button>
          <Button
            type="primary"
            onClick={() => onNavigate?.('nha-cung-cap/quan-ly-don-hang')}
          >
            Quản lý đơn hàng
          </Button>
        </Space>
      }
    >
      {/* Alert banner if there are pending orders */}
      {metrics.pendingOrders > 0 && (
        <Alert
          type="warning"
          showIcon
          icon={<WarningOutlined />}
          style={{ marginBottom: 20, borderRadius: 8 }}
          message={
            <span>
              Bạn đang có <strong>{metrics.pendingOrders} đơn hàng B2B mới</strong> cần xác nhận và chuẩn bị phương án sản xuất.
            </span>
          }
          action={
            <Button
              size="small"
              type="primary"
              onClick={() => setStatusFilter('Pending')}
            >
              Xem ngay
            </Button>
          }
        />
      )}

      <WorkspaceStats
        items={[
          { key: 'revenue', label: 'Doanh thu nhận đơn', value: money(metrics.totalRevenue), hint: `Từ ${metrics.totalOrders} đơn hàng`, icon: <DollarOutlined />, tone: 'accent' },
          { key: 'pending', label: 'Đơn chờ xác nhận', value: metrics.pendingOrders, hint: 'Cần xưởng phản hồi', icon: <ClockCircleOutlined />, tone: 'gold', pulse: metrics.pendingOrders > 0 },
          { key: 'processing', label: 'Đang sản xuất', value: metrics.processingOrders, hint: 'Theo kế hoạch sản xuất', icon: <SyncOutlined />, tone: 'neutral' },
          { key: 'packaging', label: 'Bao bì & in logo riêng', value: metrics.packagingOrders, hint: 'Cần thiết kế mockup', icon: <PictureOutlined />, tone: 'success' },
        ]}
      />

      {/* Main Table Card */}
      <Card
        title={
          <Space align="center" size={8}>
            <ShoppingOutlined style={{ color: '#8c1524' }} />
            <Text strong style={{ fontSize: 16 }}>Đơn hàng mới nhận & Yêu cầu gia công bao bì</Text>
          </Space>
        }
        extra={
          <Space wrap>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 180 }}
              options={[
                { value: 'All', label: 'Tất cả trạng thái' },
                { value: 'Pending', label: 'Chờ xác nhận' },
                { value: 'Confirmed', label: 'Đã xác nhận' },
                { value: 'Processing', label: 'Đang sản xuất' },
                { value: 'Shipped', label: 'Đang giao hàng' },
                { value: 'Delivered', label: 'Đã giao' },
              ]}
            />
            <Button
              type="link"
              onClick={() => onNavigate?.('nha-cung-cap/quan-ly-don-hang')}
            >
              Xem toàn bộ →
            </Button>
          </Space>
        }
        style={{ borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
      >
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={orders}
          pagination={{ current: orderPage.query.page, pageSize: orderPage.query.pageSize,
            total: orderPage.totalCount, onChange: orderPage.setPage, showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100] }}
          locale={{ emptyText: <Empty description="Chưa có đơn hàng nào trong danh mục này." /> }}
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* Mockup & Custom Packaging Modal */}
      <Modal
        title={
          <Space>
            <PictureOutlined style={{ color: '#8c1524' }} />
            <span>Chi tiết bao bì tùy chỉnh · Đơn {selectedOrder?.orderNumber || ''}</span>
          </Space>
        }
        open={packagingOpen}
        onCancel={() => setPackagingOpen(false)}
        footer={null}
        width={780}
        loading={packagingLoading}
      >
        {!packaging ? (
          <Empty description="Đơn hàng sử dụng quy cách đóng hộp tiêu chuẩn của xưởng." />
        ) : (
          <Space orientation="vertical" size="large" style={{ width: '100%' }}>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="Doanh nghiệp">{packaging.companyName}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color="blue">{packaging.status}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Quy cách hộp">{packaging.packagingType}</Descriptions.Item>
              <Descriptions.Item label="Logo doanh nghiệp">
                {packaging.companyLogoUrl ? (
                  <Space>
                    <Image
                      src={packaging.companyLogoUrl}
                      alt="Logo"
                      width={32}
                      height={32}
                      style={{ objectFit: 'contain' }}
                    />
                    <a href={packaging.companyLogoUrl} target="_blank" rel="noreferrer">
                      <EyeOutlined /> Xem ảnh gốc
                    </a>
                  </Space>
                ) : 'Chưa tải lên'}
              </Descriptions.Item>
              <Descriptions.Item label="Thông điệp nắp hộp" span={2}>
                {packaging.specialMessage || '—'}
              </Descriptions.Item>
            </Descriptions>

            {/* Previous revisions */}
            {packaging.revisions?.map((revision) => (
              <Card
                key={revision.id}
                size="small"
                title={`Phiên bản mockup ${revision.revisionNumber}`}
                extra={<Tag color="purple">{revision.status}</Tag>}
                style={{ background: '#fafafa', borderRadius: 8 }}
              >
                <Space orientation="vertical" size={4} style={{ width: '100%' }}>
                  <a href={revision.mockupUrl} target="_blank" rel="noreferrer">
                    <EyeOutlined /> Mở bản vẽ mockup 3D/2D
                  </a>
                  <Text>Phí thiết kế: <strong>{money(revision.designFee)}</strong></Text>
                  {revision.supplierNotes && (
                    <Text type="secondary">Ghi chú từ xưởng: {revision.supplierNotes}</Text>
                  )}
                  {revision.customerNotes && (
                    <Text type="danger">Khách hàng phản hồi: {revision.customerNotes}</Text>
                  )}
                </Space>
              </Card>
            ))}

            {/* Submission form for new mockup */}
            {['Pending', 'DesignReview', 'RevisionRequested'].includes(packaging.status) && (
              <Card
                size="small"
                title="Gửi mẫu mockup mới cho khách hàng phê duyệt"
                style={{ borderRadius: 8, borderColor: '#d48806' }}
              >
                <Form form={revisionForm} layout="vertical" onFinish={submitRevision}>
                  <Form.Item
                    name="mockupUrl"
                    label="Đường dẫn file thiết kế mockup (HTTPS)"
                    rules={[{ required: true, message: 'Vui lòng nhập URL mockup' }, { type: 'url', message: 'URL không hợp lệ' }]}
                  >
                    <Input placeholder="https://res.cloudinary.com/.../mockup.png" />
                  </Form.Item>
                  <Form.Item
                    name="designFee"
                    label="Chi phí thiết kế & khuôn ép kim (VNĐ)"
                    initialValue={0}
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={0} max={100000000} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item name="supplierNotes" label="Ghi chú kỹ thuật gia công">
                    <TextArea rows={3} maxLength={1000} showCount placeholder="Mô tả kỹ thuật: Ép kim vàng 24K, khắc laser tên công ty trên mặt gỗ..." />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={packagingLoading}
                  >
                    Gửi mockup duyệt
                  </Button>
                </Form>
              </Card>
            )}
          </Space>
        )}
      </Modal>
    </ColonyAdminLayout>
  );
}
