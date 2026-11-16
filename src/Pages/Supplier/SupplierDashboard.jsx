import { useCallback, useEffect, useState } from 'react';
import {
  App,
  Avatar,
  Button,
  Descriptions,
  Empty,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  EyeOutlined,
  PictureOutlined,
  ReloadOutlined,
  SearchOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { orderStatusColor, orderStatusLabel } from '../../constants/orderStatus';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import OrderDetailDrawer from '../../components/orders/OrderDetailDrawer';
import PackagingImageUpload from '../../components/packaging/PackagingImageUpload';
import RowActionMenu from '../../components/common/RowActionMenu';
import SupplierRevenueCharts from '../../components/supplier/SupplierRevenueCharts';
import { OrderItemsHoverCell, TruncatedTooltip } from '../../components/common/TableCellHelpers';
import customPackagingService from '../../services/customPackagingService';
import orderService from '../../services/orderService';
import usePagedList from '../../hooks/usePagedList';
import '../../styles/supplier-dashboard.css';

const { Text } = Typography;
const { TextArea } = Input;

const money = (value) => `${Number(value || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) => (
  error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.'
);

const STATUS_META = {
  Pending: { label: 'Chờ xác nhận', color: 'gold' },
  Confirmed: { label: 'Đã xác nhận', color: 'blue' },
  AwaitingCustomerDeliveryApproval: { label: 'Chờ duyệt ngày giao', color: 'orange' },
  Processing: { label: 'Đang sản xuất', color: 'purple' },
  Shipped: { label: 'Đang giao hàng', color: 'cyan' },
  Delivered: { label: 'Đã hoàn thành', color: 'green' },
  CancellationRequested: { label: 'Yêu cầu hủy', color: 'volcano' },
  Cancelled: { label: 'Đã hủy', color: 'red' },
  Expired: { label: 'Hết hạn xử lý', color: 'default' },
  Disputed: { label: 'Đang khiếu nại', color: 'red' },
};

const PACKAGING_STATUS_LABEL = {
  Pending: 'Chờ thiết kế',
  DesignReview: 'Chờ duyệt mẫu',
  RevisionRequested: 'Cần chỉnh sửa',
  Approved: 'Đã duyệt mẫu',
};
export default function SupplierDashboard({ onNavigate }) {
  const { message, modal } = App.useApp();
  const orderPage = usePagedList(orderService.listSupplierOrdersPaged);
  const {
    items: orders,
    loading,
    query,
    search,
    setSearch,
    setPage,
    setStatus,
    totalCount,
    refresh: refreshPagedOrders,
  } = orderPage;

  const statusFilter = query.status || 'All';
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    processingOrders: 0,
    packagingOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0,
    directOrderRevenue: 0,
    directOrderPaidRevenue: 0,
    activeDirectOrdersCount: 0,
    contractRevenue: 0,
    contractPaidRevenue: 0,
    activeContractsCount: 0,
    completedContractsCount: 0,
    refundedAmount: 0,
    dailyTrend: [],
    monthlyTrend: [],
  });
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState(null);

  const [detailOrder, setDetailOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [packaging, setPackaging] = useState(null);
  const [packagingOpen, setPackagingOpen] = useState(false);
  const [packagingLoading, setPackagingLoading] = useState(false);
  const [revisionForm] = Form.useForm();

  const loadSummary = useCallback(async () => {
    setSummaryLoading(true);
    setSummaryError(null);
    try {
      const summary = await orderService.getSupplierDashboardSummary();
      if (summary) setMetrics(summary);
    } catch (error) {
      const errMsg = errorMessage(error);
      setSummaryError(errMsg);
      message.error(errMsg);
    } finally {
      setSummaryLoading(false);
    }
  }, [message]);

  const loadOrders = useCallback(async () => {
    refreshPagedOrders();
    await loadSummary();
  }, [loadSummary, refreshPagedOrders]);

  useEffect(() => {
    let active = true;
    orderService
      .getSupplierDashboardSummary()
      .then((summary) => {
        if (!active) return;
        setSummaryError(null);
        if (summary) setMetrics(summary);
      })
      .catch((error) => {
        if (active) {
          const errMsg = errorMessage(error);
          setSummaryError(errMsg);
          message.error(errMsg);
        }
      })
      .finally(() => {
        if (active) setSummaryLoading(false);
      });
    return () => {
      active = false;
    };
  }, [message]);

  const handleStatusChange = (value) => {
    setStatus(value === 'All' ? '' : value);
  };

  const handleConfirmOrder = async (order) => {
    try {
      await orderService.confirm(order.id);
      message.success(`Đã xác nhận đơn hàng #${order.orderNumber}.`);
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    }
  };

  const handleRejectOrder = (order) => {
    let reason = '';
    modal.confirm({
      title: `Từ chối đơn hàng #${order.orderNumber}`,
      content: (
        <div style={{ marginTop: 12 }}>
          <Text type="secondary">
            Nhập lý do từ chối để thông báo tới doanh nghiệp đặt hàng:
          </Text>
          <TextArea
            rows={3}
            style={{ marginTop: 8 }}
            placeholder="Ví dụ: Xưởng kín lịch sản xuất trong khung ngày yêu cầu..."
            onChange={(e) => {
              reason = e.target.value;
            }}
          />
        </div>
      ),
      okText: 'Xác nhận từ chối',
      okButtonProps: { danger: true },
      cancelText: 'Đóng',
      onOk: async () => {
        if (!reason.trim() || reason.trim().length < 3) {
          message.warning('Vui lòng nhập lý do từ chối tối thiểu 3 ký tự.');
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
      const revInfo = customPackagingService.calculateMockupRevisionInfo(packaging);
      const payload = {
        ...values,
        revisionSurcharge: revInfo.isSurchargeAllowed ? Number(values.revisionSurcharge || 0) : 0,
      };
      await customPackagingService.submitRevision(selectedOrder.id, payload);
      message.success('Đã gửi bản phối cảnh mockup cho khách hàng duyệt.');
      const updated = await customPackagingService.get(selectedOrder.id);
      setPackaging(updated);
      revisionForm.resetFields();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setPackagingLoading(false);
    }
  };

  const columns = [
    {
      title: 'Đơn hàng',
      key: 'orderNumber',
      width: 175,
      render: (_, order) => (
        <div className="max-w-[160px]">
          <Tooltip title={`#${order.orderNumber}`} color="#231a18" placement="topLeft">
            <button
              type="button"
              onClick={() => setDetailOrder(order)}
              className="sd-order-link"
            >
              #{order.orderNumber}
            </button>
          </Tooltip>
          <div className="sd-cell-muted">
            {new Date(order.createdAtUtc || order.createdAt).toLocaleString('vi-VN')}
          </div>
        </div>
      ),
    },
    {
      title: 'Khách hàng',
      key: 'customer',
      width: 175,
      render: (_, order) => {
        const customerName = order.customPackaging?.companyName || order.recipientName || 'Khách hàng B2B';
        return (
          <div className="max-w-[160px]">
            <TruncatedTooltip text={customerName} className="sd-customer-name" />
            {order.recipientPhone && (
              <div className="sd-customer-meta">{order.recipientPhone}</div>
            )}
            {order.deliveryAddress && (
              <TruncatedTooltip text={order.deliveryAddress} className="sd-customer-meta" />
            )}
          </div>
        );
      },
    },
    {
      title: 'Sản phẩm B2B',
      key: 'items',
      width: 240,
      render: (_, order) => (
        <OrderItemsHoverCell
          items={order.items || []}
          customPackaging={order.customPackaging}
          packagingStatusLabel={PACKAGING_STATUS_LABEL}
          showPackagingTag={false}
          maxWidthClass="max-w-[222px]"
        />
      ),
    },
    {
      title: 'Bao bì',
      key: 'packaging',
      width: 145,
      render: (_, order) => {
        if (!order.customPackaging) {
          return <span className="sd-cell-muted">Hộp tiêu chuẩn</span>;
        }
        const statusText = PACKAGING_STATUS_LABEL[order.customPackaging.status]
          || order.customPackaging.status
          || 'Chờ duyệt';
        const typeText = order.customPackaging.packagingType || 'Hộp thiết kế';
        return (
          <div className="sd-packaging-cell">
            {order.customPackaging.companyLogoUrl ? (
              <Image
                src={order.customPackaging.companyLogoUrl}
                alt={`Logo ${order.customPackaging.companyName || 'doanh nghiệp'}`}
                width={32}
                height={32}
                style={{
                  objectFit: 'contain',
                  borderRadius: 6,
                  border: '1px solid #e4dcd3',
                  padding: 2,
                  background: '#ffffff',
                }}
              />
            ) : (
              <Avatar
                shape="square"
                size={32}
                icon={<PictureOutlined />}
                style={{ backgroundColor: '#faf7f2', color: '#9a6b16', border: '1px solid #e4dcd3' }}
              />
            )}
            <div className="sd-packaging-info">
              <TruncatedTooltip
                text={typeText}
                tooltipContent={`${typeText} · ${statusText}`}
                className="sd-packaging-type"
              />
              <div className="sd-packaging-status">{statusText}</div>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: 'right',
      width: 120,
      render: (val) => (
        <span
          style={{
            whiteSpace: 'nowrap',
            fontWeight: 600,
            fontVariantNumeric: 'tabular-nums',
            color: '#8c1524',
          }}
        >
          {money(val)}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (val) => {
        const meta = STATUS_META[val] || { label: orderStatusLabel(val), color: orderStatusColor(val) };
        return (
          <Tag color={meta.color} style={{ margin: 0, whiteSpace: 'nowrap', fontWeight: 500 }}>
            {meta.label}
          </Tag>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'actions',
      align: 'center',
      width: 84,
      render: (_, order) => (
        <RowActionMenu
          ariaLabel={`Thao tác đơn ${order.orderNumber}`}
          actions={[
            {
              key: 'detail',
              label: 'Chi tiết đơn hàng',
              icon: <EyeOutlined />,
              onClick: () => setDetailOrder(order),
            },
            {
              key: 'mockup',
              label: 'Quản lý mockup bao bì',
              icon: <PictureOutlined />,
              show: Boolean(order.customPackaging),
              onClick: () => openPackagingModal(order),
            },
            { type: 'divider', show: order.status === 'Pending' },
            {
              key: 'confirm',
              label: 'Xác nhận đơn',
              icon: <CheckCircleOutlined />,
              show: order.status === 'Pending',
              onClick: () => handleConfirmOrder(order),
            },
            {
              key: 'reject',
              label: 'Từ chối đơn',
              danger: true,
              show: order.status === 'Pending',
              onClick: () => handleRejectOrder(order),
            },
          ]}
        />
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
        <Space wrap>
          <Button icon={<ReloadOutlined />} onClick={loadOrders} loading={loading || summaryLoading}>
            Làm mới
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
      {metrics.pendingOrders > 0 && (
        <div className="sd-notice" role="status">
          <div className="sd-notice__content">
            <ClockCircleOutlined style={{ color: '#9a6b16' }} />
            <span>
              Đang có <strong style={{ color: '#8c1524' }}>{metrics.pendingOrders} đơn hàng</strong>{' '}
              chờ xưởng xác nhận năng lực sản xuất.
            </span>
          </div>
          <Button
            size="small"
            type="primary"
            style={{ backgroundColor: '#9a6b16', borderColor: '#9a6b16' }}
            onClick={() => handleStatusChange('Pending')}
          >
            Lọc đơn chờ duyệt
          </Button>
        </div>
      )}

      <section aria-label="Chỉ số vận hành xưởng" className="sd-ribbon">
        <div className="sd-kpi">
          <div className="sd-kpi__label">
            <DollarOutlined style={{ color: '#7d1322' }} />
            Doanh thu ghi nhận (B2B + RFQ)
          </div>
          <div className="sd-kpi__value" style={{ color: '#7d1322' }}>
            {money(metrics.totalRevenue)}
          </div>
          <div className="sd-kpi__caption">
            Đơn B2B: {money(metrics.directOrderRevenue)} ({metrics.activeDirectOrdersCount || 0} đơn)
            {' · '}
            HĐ RFQ: {money(metrics.contractRevenue)} ({metrics.activeContractsCount || 0} HĐ)
          </div>
          <div className="sd-kpi__caption" style={{ marginTop: 2 }}>
            Thực thu đã thanh toán: {money((metrics.directOrderPaidRevenue || 0) + (metrics.contractPaidRevenue || 0))}
            {(metrics.refundedAmount || 0) > 0 && ` · Đã hoàn: ${money(metrics.refundedAmount)}`}
          </div>
        </div>

        <div className="sd-kpi">
          <div className="sd-kpi__label">
            <ClockCircleOutlined style={{ color: '#9a6b16' }} />
            Đơn chờ xác nhận
          </div>
          <div className="sd-kpi__value" style={{ color: '#9a6b16' }}>
            {metrics.pendingOrders}
          </div>
          <div className="sd-kpi__caption">Ưu tiên phản hồi đúng SLA 12h</div>
        </div>

        <div className="sd-kpi">
          <div className="sd-kpi__label">
            <SyncOutlined style={{ color: '#2d5a43' }} />
            Đang sản xuất
          </div>
          <div className="sd-kpi__value" style={{ color: '#2d5a43' }}>
            {metrics.processingOrders}
          </div>
          <div className="sd-kpi__caption">Đơn đang triển khai theo lịch giao</div>
        </div>

        <div className="sd-kpi">
          <div className="sd-kpi__label">
            <PictureOutlined style={{ color: '#7d1322' }} />
            Đơn thiết kế bao bì riêng
          </div>
          <div className="sd-kpi__value" style={{ color: '#231a18' }}>
            {metrics.packagingOrders}
          </div>
          <div className="sd-kpi__caption">Hồ sơ hộp in logo doanh nghiệp</div>
        </div>
      </section>

      <SupplierRevenueCharts
        metrics={metrics}
        loading={summaryLoading}
        error={summaryError}
        onRetry={loadSummary}
      />

      <section aria-label="Đơn hàng gần đây và gia công bao bì" className="sd-ledger">
        <div className="sd-ledger__header">
          <div>
            <h2 className="sd-ledger__title">Đơn hàng mới nhận &amp; Gia công bao bì</h2>
            <p className="sd-ledger__subtitle">
              Nhấn mã đơn hoặc Chi tiết để xem đủ sản phẩm, lịch sử thanh toán VNPay và sổ cái giao dịch.
            </p>
          </div>

          <div className="sd-ledger__controls">
            <Input
              allowClear
              prefix={<SearchOutlined style={{ color: '#6c625e' }} />}
              placeholder="Tìm mã đơn hoặc người nhận"
              aria-label="Tìm mã đơn hoặc người nhận"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sd-control-search"
            />
            <Select
              aria-label="Trạng thái"
              value={statusFilter}
              onChange={handleStatusChange}
              className="sd-control-select"
              options={[
                { value: 'All', label: 'Tất cả trạng thái' },
                { value: 'Pending', label: 'Chờ xác nhận' },
                { value: 'Confirmed', label: 'Đã xác nhận' },
                { value: 'Processing', label: 'Đang sản xuất' },
                { value: 'Shipped', label: 'Đang giao hàng' },
                { value: 'Delivered', label: 'Đã hoàn thành' },
                { value: 'Disputed', label: 'Đang khiếu nại' },
                { value: 'Cancelled', label: 'Đã hủy' },
              ]}
            />
            <Button className="sd-control-btn" onClick={() => onNavigate?.('nha-cung-cap/quan-ly-don-hang')}>
              Mở sổ đơn đầy đủ
            </Button>
          </div>
        </div>

        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={orders}
          tableLayout="fixed"
          scroll={{ x: 1020 }}
          pagination={{
            current: query.page,
            pageSize: query.pageSize,
            total: totalCount,
            onChange: setPage,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100],
          }}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Chưa có đơn hàng nào khớp bộ lọc hiện tại."
              />
            ),
          }}
        />
      </section>

      <Modal
        title={
          <Space wrap>
            <PictureOutlined style={{ color: '#7d1322' }} />
            <span>Hồ sơ bao bì thiết kế · #{selectedOrder?.orderNumber || ''}</span>
          </Space>
        }
        open={packagingOpen}
        onCancel={() => setPackagingOpen(false)}
        footer={null}
        width={760}
        style={{ maxWidth: 'calc(100vw - 24px)' }}
        loading={packagingLoading}
        destroyOnHidden
      >
        {!packaging ? (
          <Empty description="Đơn hàng sử dụng quy cách đóng hộp tiêu chuẩn của xưởng." />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Descriptions
              bordered
              column={{ xs: 1, sm: 2 }}
              size="small"
              styles={{ label: { backgroundColor: '#faf7f2', fontWeight: 600 } }}
            >
              <Descriptions.Item label="Doanh nghiệp">{packaging.companyName}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color="blue">{PACKAGING_STATUS_LABEL[packaging.status] || packaging.status}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Quy cách hộp">{packaging.packagingType}</Descriptions.Item>
              <Descriptions.Item label="Logo doanh nghiệp">
                {packaging.companyLogoUrl ? (
                  <Space>
                    <div className="overflow-hidden rounded-lg border border-stone-200 bg-white p-1">
                      <Image
                        src={packaging.companyLogoUrl}
                        alt={`Logo ${packaging.companyName || 'doanh nghiệp'}`}
                        width={56}
                        height={56}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <span className="text-xs text-stone-500">Nhấp ảnh để phóng to</span>
                  </Space>
                ) : (
                  'Chưa tải lên'
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Thông điệp nắp hộp" span={{ xs: 1, sm: 2 }}>
                {packaging.specialMessage || '—'}
              </Descriptions.Item>
            </Descriptions>

            {packaging.revisions?.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {packaging.revisions.map((revision) => (
                  <div key={revision.id} className="sd-revision-card">
                    <div className="sd-revision-card__top">
                      <strong>Phiên bản mockup {revision.revisionNumber}</strong>
                      <Tag color="purple" style={{ margin: 0 }}>{revision.status}</Tag>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
                      {revision.mockupUrl ? (
                        <div className="overflow-hidden rounded-lg border border-stone-200 bg-white p-1">
                          <Image
                            src={revision.mockupUrl}
                            alt={`Bản vẽ mockup phiên bản ${revision.revisionNumber}`}
                            width={120}
                            height={80}
                            style={{ objectFit: 'cover', borderRadius: 6 }}
                          />
                        </div>
                      ) : (
                        <span className="text-xs text-stone-400">Chưa có ảnh mockup</span>
                      )}
                      <span>
                        Phí thiết kế: <strong>{money(revision.designFee)}</strong>
                      </span>
                    </div>
                    {revision.supplierNotes && (
                      <div className="sd-cell-muted">Ghi chú xưởng: {revision.supplierNotes}</div>
                    )}
                    {revision.customerNotes && (
                      <div style={{ marginTop: 4, color: '#cf1322' }}>
                        Phản hồi khách hàng: {revision.customerNotes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {['Pending', 'DesignReview', 'RevisionRequested'].includes(packaging.status) && (() => {
              const revInfo = customPackagingService.calculateMockupRevisionInfo(packaging);
              return (
                <div className="sd-mockup-form">
                  <div
                    style={{
                      marginBottom: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#231a18' }}>
                      <CheckCircleOutlined style={{ color: '#9a6b16' }} />
                      <span>Gửi mẫu mockup mới cho khách hàng duyệt</span>
                    </div>
                    <Tag color={revInfo.isSurchargeAllowed ? 'volcano' : 'gold'}>
                      {revInfo.displayText}
                    </Tag>
                  </div>
                  <Form form={revisionForm} layout="vertical" onFinish={submitRevision}>
                    <Form.Item
                      name="mockupUrl"
                      label="Ảnh thiết kế mockup 3D/2D"
                      rules={[
                        { required: true, message: 'Vui lòng tải lên ảnh thiết kế mockup.' },
                      ]}
                    >
                      <PackagingImageUpload
                        uploader={(file) => customPackagingService.uploadMockup(file)}
                        dragTitle="Kéo thả hoặc nhấp để tải ảnh mockup lên"
                        dragHint="PNG, JPG, WEBP, SVG · Tối đa 10MB"
                        previewAlt="Bản vẽ mockup đã tải lên"
                        successText="Đã tải lên bản vẽ mockup"
                        removeText="Xóa"
                        previewWidth={96}
                        previewHeight={64}
                      />
                    </Form.Item>
                    <Form.Item
                      name="designFee"
                      label="Chi phí thiết kế & khuôn ép kim (VNĐ)"
                      initialValue={0}
                      rules={[{ required: true }]}
                    >
                      <InputNumber min={0} max={100000000} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                      name="revisionSurcharge"
                      label="Phụ phí sửa (VNĐ)"
                      initialValue={0}
                      extra={
                        !revInfo.isSurchargeAllowed
                          ? 'Ô phụ phí chỉ bật khi phiên bản từ #5 trở đi (hết 3 lượt sửa miễn phí).'
                          : undefined
                      }
                    >
                      <InputNumber
                        min={0}
                        max={100000000}
                        disabled={!revInfo.isSurchargeAllowed}
                        style={{ width: '100%' }}
                        placeholder={!revInfo.isSurchargeAllowed ? 'Chỉ bật khi revision #≥5' : 'Nhập phụ phí sửa'}
                      />
                    </Form.Item>
                    <Form.Item name="supplierNotes" label="Ghi chú kỹ thuật gia công">
                      <TextArea
                        rows={3}
                        maxLength={1000}
                        showCount
                        placeholder="Mô tả kỹ thuật: Ép kim vàng, khắc laser tên doanh nghiệp..."
                      />
                    </Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={packagingLoading}
                    >
                      Gửi mockup duyệt
                    </Button>
                  </Form>
                </div>
              );
            })()}
          </div>
        )}
      </Modal>

      <OrderDetailDrawer
        open={Boolean(detailOrder)}
        order={detailOrder}
        role="supplier"
        onClose={() => setDetailOrder(null)}
      />
    </ColonyAdminLayout>
  );
}
