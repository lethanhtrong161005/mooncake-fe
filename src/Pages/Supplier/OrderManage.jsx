import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Drawer,
  Empty,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
  Upload,
  message,
} from 'antd';
import {
  BankOutlined,
  CalendarOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CrownOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  PictureOutlined,
  ReloadOutlined,
  SettingOutlined,
  TruckOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import customPackagingService from '../../services/customPackagingService';
import orderService from '../../services/orderService';
import usePagedList from '../../hooks/usePagedList';
import FilterBar from '../../components/common/FilterBar';
import useIsMobile from '../../hooks/useIsMobile';

const { Text, Title } = Typography;
const { TextArea } = Input;
const money = (value) => `${Number(value || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) => error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.';

const statusColor = {
  Pending: 'gold',
  AwaitingCustomerDeliveryApproval: 'orange',
  Confirmed: 'blue',
  Processing: 'purple',
  Shipped: 'cyan',
  Delivered: 'green',
  CancellationRequested: 'volcano',
  Cancelled: 'red',
  Expired: 'default',
};

function formatCountdown(targetDateStr) {
  if (!targetDateStr) return null;
  const target = new Date(targetDateStr).getTime();
  const now = Date.now();
  const diffMs = target - now;
  if (diffMs <= 0) return 'Đã hết hạn';
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${mins}m còn lại`;
}

function SlaCountdownBadge({ deadline, label }) {
  const [text, setText] = useState(() => formatCountdown(deadline));

  useEffect(() => {
    if (!deadline) return undefined;
    const interval = setInterval(() => {
      setText(formatCountdown(deadline));
    }, 30000);
    return () => clearInterval(interval);
  }, [deadline]);

  if (!deadline) return null;
  const isExpired = text === 'Đã hết hạn';

  return (
    <Tag
      color={isExpired ? 'red' : 'gold'}
      icon={<ClockCircleOutlined />}
      className="m-0 font-medium text-xs px-2 py-0.5"
    >
      {label}: {text}
    </Tag>
  );
}

export default function OrderManage({ onNavigate }) {
  const mobile = useIsMobile();
  const { items: orders, totalCount, loading, error: orderError, query: orderQuery,
    search, setSearch, setPage, setStatus, refresh: loadOrders,
    reset: resetOrders } = usePagedList(orderService.listSupplierOrdersPaged);

  // Supplier Financial Overview

  // Modals & Drawers
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [packaging, setPackaging] = useState(null);
  const [packagingOpen, setPackagingOpen] = useState(false);
  const [packagingLoading, setPackagingLoading] = useState(false);
  const [revisionForm] = Form.useForm();

  // Propose Delivery Date Modal
  const [proposeModalOpen, setProposeModalOpen] = useState(false);
  const [proposingOrder, setProposingOrder] = useState(null);
  const [proposedDate, setProposedDate] = useState('');
  const [proposedReason, setProposedReason] = useState('');
  const [proposeSubmitting, setProposeSubmitting] = useState(false);

  // PoD Upload Modal
  const [podUploadModalOpen, setPodUploadModalOpen] = useState(false);
  const [podOrder, setPodOrder] = useState(null);
  const [podPhotoUrl, setPodPhotoUrl] = useState('');
  const [podSignatureName, setPodSignatureName] = useState('');
  const [podNotes, setPodNotes] = useState('');
  const [podSubmitting, setPodSubmitting] = useState(false);

  // Shop Policy Drawer
  const [policyDrawerOpen, setPolicyDrawerOpen] = useState(false);
  const [policyForm] = Form.useForm();
  const [policySaving, setPolicySaving] = useState(false);

  // Payout Bank Account Drawer
  const [payoutDrawerOpen, setPayoutDrawerOpen] = useState(false);
  const [payoutAccountForm] = Form.useForm();
  const [payoutAccountSaving, setPayoutAccountSaving] = useState(false);

  // Create Payout Request Modal
  const [payoutRequestModalOpen, setPayoutRequestModalOpen] = useState(false);
  const [payoutRequestAmount, setPayoutRequestAmount] = useState(0);
  const [payoutRequestSubmitting, setPayoutRequestSubmitting] = useState(false);

  useEffect(() => { if (orderError) message.error(errorMessage(orderError)); }, [orderError]);

  const runAction = async (action, order, successText) => {
    try {
      await action(order.id);
      message.success(successText);
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    }
  };

  // Open & submit Shop Policy
  const openPolicyDrawer = async () => {
    setPolicyDrawerOpen(true);
    try {
      const data = await orderService.getMyShopOrderPolicy();
      const policy = data?.policy || {};
      const rates = data?.shippingRates || [];
      const innerRate = rates.find((r) => r.regionCode === 'HCM_INNER')?.feeAmount ?? 0;
      const outerRate = rates.find((r) => r.regionCode === 'HCM_OUTER')?.feeAmount ?? 50000;
      const provRate = rates.find((r) => r.regionCode === 'PROVINCIAL')?.feeAmount ?? 150000;

      policyForm.setFieldsValue({
        depositPercent: policy.depositPercent ?? 30,
        vatTaxPercent: policy.vatTaxPercent ?? 8,
        taxIncludedInPrice: policy.taxIncludedInPrice ?? true,
        minLeadTimeDays: policy.minLeadTimeDays ?? 3,
        rateHcmInner: innerRate,
        rateHcmOuter: outerRate,
        rateProvincial: provRate,
      });
    } catch (error) {
      message.error(errorMessage(error));
    }
  };

  const savePolicy = async (values) => {
    setPolicySaving(true);
    try {
      await orderService.upsertMyShopOrderPolicy({
        depositPercent: values.depositPercent,
        vatTaxPercent: values.vatTaxPercent,
        taxIncludedInPrice: values.taxIncludedInPrice,
        minLeadTimeDays: values.minLeadTimeDays,
        shippingRates: [
          { regionCode: 'HCM_INNER', regionName: 'TP.HCM Nội Thành', feeAmount: values.rateHcmInner },
          { regionCode: 'HCM_OUTER', regionName: 'TP.HCM Ngoại Thành', feeAmount: values.rateHcmOuter },
          { regionCode: 'PROVINCIAL', regionName: 'Các Tỉnh Thành Khác', feeAmount: values.rateProvincial },
        ],
      });
      message.success('Đã lưu cấu hình chính sách cọc và biểu phí vận chuyển!');
      setPolicyDrawerOpen(false);
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setPolicySaving(false);
    }
  };

  // Open & submit Payout Bank Account
  const openPayoutAccountDrawer = async () => {
    setPayoutDrawerOpen(true);
    try {
      const account = await orderService.getMyPayoutAccount();
      if (account) {
        payoutAccountForm.setFieldsValue({
          bankCode: account.bankCode,
          bankName: account.bankName,
          accountNumber: account.accountNumber,
          accountHolderName: account.accountHolderName,
        });
      }
    } catch (error) {
      message.error(errorMessage(error));
    }
  };

  const savePayoutAccount = async (values) => {
    setPayoutAccountSaving(true);
    try {
      await orderService.upsertMyPayoutAccount(values);
      message.success('Đã lưu thông tin tài khoản nhận giải ngân thành công!');
      setPayoutDrawerOpen(false);
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setPayoutAccountSaving(false);
    }
  };

  // Propose Delivery Date
  const handleOpenProposeModal = (order) => {
    setProposingOrder(order);
    setProposedDate(order.deliveryDateExpected || '');
    setProposedReason('Lịch xếp lò bánh và gia công nắp hộp ép kim');
    setProposeModalOpen(true);
  };

  const submitProposeDeliveryDate = async () => {
    if (!proposedDate) {
      message.warning('Vui lòng chọn ngày giao hàng đề xuất.');
      return;
    }
    setProposeSubmitting(true);
    try {
      await orderService.proposeDeliveryDate(proposingOrder.id, {
        proposedDeliveryDate: proposedDate,
        reason: proposedReason.trim() || 'Xưởng đề xuất điều chỉnh ngày giao',
      });
      message.success('Đã gửi đề xuất ngày giao hàng đến khách hàng (SLA 12h)!');
      setProposeModalOpen(false);
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setProposeSubmitting(false);
    }
  };

  // Open PoD Upload Modal
  const handleOpenPodModal = (order) => {
    setPodOrder(order);
    setPodPhotoUrl('https://images.unsplash.com/photo-1549465220-1a8b9238cd48');
    setPodSignatureName(order.recipientName || 'Người đại diện nhận hàng');
    setPodNotes('Đã bàn giao đủ số lượng hộp bánh kèm hóa đơn tại sảnh kho');
    setPodUploadModalOpen(true);
  };

  const submitPodProof = async () => {
    if (!podPhotoUrl.trim()) {
      message.warning('Vui lòng nhập đường dẫn ảnh chụp bàn giao PoD.');
      return;
    }
    setPodSubmitting(true);
    try {
      // Find or create active shipment delivery
      let deliveryId = podOrder.latestDelivery?.deliveryId;
      if (!deliveryId) {
        const createDeliv = await orderService.createDelivery({
          orderId: podOrder.id,
          deliveryType: 'SelfArranged',
          scheduledDate: podOrder.deliveryDateExpected,
          fromAddress: 'Kho xưởng sản xuất bánh',
          toAddress: podOrder.deliveryAddress,
          recipientName: podOrder.recipientName,
          recipientPhone: podOrder.recipientPhone,
          trackingCode: `SHIP-${podOrder.orderNumber}`,
          notes: 'Chuyến giao nguyên lô',
        });
        deliveryId = createDeliv?.id;
      }

      await orderService.submitDeliveryProof(deliveryId, {
        proofType: 'Delivery',
        photoUrl: podPhotoUrl.trim(),
        takenBy: podSignatureName.trim(),
        notes: podNotes.trim(),
      });

      message.success('Đã tải ảnh biên bản bàn giao PoD thành công! Khách hàng có 48h để đối soát.');
      setPodUploadModalOpen(false);
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setPodSubmitting(false);
    }
  };

  // Packaging review
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
      message.success('Đã gửi bản vẽ mockup 3D để khách hàng duyệt.');
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
      content: (
        <TextArea
          rows={3}
          placeholder="Lý do từ chối (ít nhất 3 ký tự)..."
          onChange={(event) => {
            reason = event.target.value;
          }}
        />
      ),
      okText: 'Xác nhận từ chối',
      okButtonProps: { danger: true },
      cancelText: 'Quay lại',
      onOk: async () => {
        if (reason.trim().length < 3) throw new Error('Vui lòng nhập lý do từ chối.');
        await runAction((id) => orderService.reject(id, reason.trim()), order, 'Đã từ chối đơn và hoàn tồn kho.');
      },
    });
  };

  // Submit Payout Request
  const submitPayoutRequest = async () => {
    setPayoutRequestSubmitting(true);
    try {
      await orderService.createPayoutRequest(selectedOrder?.id, {
        notes: 'Yêu cầu quyết toán số dư khả dụng đơn hàng',
      });
      message.success('Đã gửi yêu cầu giải ngân mô phỏng (Sandbox) thành công!');
      setPayoutRequestModalOpen(false);
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setPayoutRequestSubmitting(false);
    }
  };

  const columns = [
    {
      title: 'Đơn hàng & SLA',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      width: 220,
      render: (value, order) => {
        const sla =
          order.status === 'Pending'
            ? { date: order.responseDeadlineAtUtc || order.responseDeadlineAt, label: 'SLA phản hồi' }
            : order.status === 'AwaitingCustomerDeliveryApproval'
            ? { date: order.deliveryApprovalDeadlineAtUtc || order.deliveryApprovalDeadlineAt, label: 'Chờ khách duyệt' }
            : null;

        return (
          <Space direction="vertical" size={2}>
            <Text strong style={{ color: '#8c1524', fontFamily: 'monospace', fontSize: 13, whiteSpace: 'nowrap' }}>
              #{value}
            </Text>
            <Text type="secondary" style={{ fontSize: 11 }}>
              {new Date(order.createdAtUtc || order.createdAt).toLocaleString('vi-VN')}
            </Text>
            {sla && <SlaCountdownBadge deadline={sla.date} label={sla.label} />}
          </Space>
        );
      },
    },
    {
      title: 'Doanh nghiệp / Người nhận',
      key: 'customer',
      render: (_, order) => (
        <Space direction="vertical" size={1}>
          <Text strong>{order.customPackaging?.companyName || order.recipientName || 'Khách hàng B2B'}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>{order.recipientPhone}</Text>
          <Text type="secondary" style={{ fontSize: 11 }} className="truncate max-w-xs">{order.deliveryAddress}</Text>
        </Space>
      ),
    },
    {
      title: 'Hạng mục đặt hàng',
      key: 'items',
      render: (_, order) => (
        <Space direction="vertical" size={1}>
          {order.items?.map((item) => (
            <Text key={item.variantId} style={{ fontSize: 12 }}>
              • {item.productName || 'Bánh Trung Thu'} ({item.variantName || 'Chuẩn'}) × <b>{item.quantity}</b>
            </Text>
          ))}
        </Space>
      ),
    },
    {
      title: 'Ngày giao',
      key: 'deliveryDate',
      render: (_, order) => (
        <Space direction="vertical" size={0}>
          <Text style={{ fontSize: 12 }}>
            {order.confirmedDeliveryDate
              ? `Xác nhận: ${order.confirmedDeliveryDate}`
              : order.deliveryDateExpected
              ? `Dự kiến: ${order.deliveryDateExpected}`
              : 'Chưa đặt'}
          </Text>
          {order.proposedDeliveryDate && order.status === 'AwaitingCustomerDeliveryApproval' && (
            <Tag color="orange" className="m-0 text-[10px]">Đang đề xuất: {order.proposedDeliveryDate}</Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Tổng tiền & Cọc',
      key: 'totalAmount',
      align: 'right',
      render: (_, order) => (
        <Space direction="vertical" size={0} align="end">
          <Text strong className="text-[#8c1524]">{money(order.totalAmount)}</Text>
          {order.paymentSummary ? (
            <Tag color={order.paymentSummary.totalPaidAmount > 0 ? 'green' : 'gold'} className="m-0 text-[10px]">
              Đã cọc: {money(order.paymentSummary.totalPaidAmount)}
            </Tag>
          ) : null}
        </Space>
      ),
    },
    {
      title: 'Bao bì',
      key: 'packaging',
      render: (_, order) =>
        order.customPackaging ? (
          <Tag color="geekblue" icon={<CrownOutlined />}>
            {order.customPackaging.status}
          </Tag>
        ) : (
          <Tag>Tiêu chuẩn</Tag>
        ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (value) => <Tag color={statusColor[value]}>{value}</Tag>,
    },
    {
      title: 'Thao tác xưởng',
      key: 'actions',
      width: 280,
      render: (_, order) => {
        const allowedActions = order.allowedActions || [];

        return (
          <Space wrap size="small">
            {/* Confirm & Reject (Pending state) */}
            {order.status === 'Pending' && (
              <>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => runAction(orderService.confirm, order, 'Đã xác nhận đơn hàng và tạo lịch thu cọc.')}
                  style={{ background: '#16a34a', borderColor: '#16a34a', fontWeight: 600 }}
                >
                  Xác nhận đơn
                </Button>
                <Button
                  size="small"
                  onClick={() => handleOpenProposeModal(order)}
                  style={{ borderColor: '#d48806', color: '#d48806' }}
                >
                  Đề xuất ngày
                </Button>
                <Button size="small" danger onClick={() => rejectOrder(order)}>
                  Từ chối
                </Button>
              </>
            )}

            {/* Start Processing */}
            {allowedActions.includes('StartProcessing') && (
              <Button
                type="primary"
                size="small"
                onClick={() => runAction(orderService.startProcessing, order, 'Đơn hàng đã chuyển sang giai đoạn sản xuất.')}
                style={{ background: '#7c3aed', borderColor: '#7c3aed' }}
              >
                Bắt đầu sản xuất
              </Button>
            )}

            {/* Ship Order */}
            {allowedActions.includes('ShipOrder') && (
              <Button
                type="primary"
                size="small"
                onClick={() => runAction(orderService.ship, order, 'Đơn đã xuất kho, vui lòng tải ảnh biên bản PoD.')}
                style={{ background: '#0284c7', borderColor: '#0284c7' }}
              >
                Xuất kho giao
              </Button>
            )}

            {/* Upload PoD Proof */}
            {order.status === 'Shipped' && (
              <Button
                type="primary"
                size="small"
                icon={<UploadOutlined />}
                onClick={() => handleOpenPodModal(order)}
                style={{ background: '#059669', borderColor: '#059669' }}
              >
                Tải ảnh PoD
              </Button>
            )}

            {/* Packaging Drawer */}
            {order.customPackaging && (
              <Button size="small" icon={<PictureOutlined />} onClick={() => openPackaging(order)}>
                Bao bì
              </Button>
            )}

            {/* Payout Request */}
            {allowedActions.includes('CreatePayoutRequest') && (
              <Button
                size="small"
                icon={<DollarCircleOutlined />}
                onClick={() => {
                  setSelectedOrder(order);
                  setPayoutRequestAmount(order.totalAmount);
                  setPayoutRequestModalOpen(true);
                }}
                style={{ borderColor: '#16a34a', color: '#16a34a', fontWeight: 600 }}
              >
                Giải ngân
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <ColonyAdminLayout
      role="Supplier"
      activeKey="nha-cung-cap/quan-ly-don-hang"
      onNavigate={onNavigate}
      title="Quản Lý Đơn Hàng Doanh Nghiệp (B2B)"
      subtitle="Quy trình xác nhận đơn, duyệt mockup bao bì, quản lý chuyến giao PoD và đối soát sổ cái ký quỹ."
    >
      {/* 1. Financial Overview Cards */}
      <Alert type="info" showIcon className="mb-5"
        message="Tổng quan tài chính chưa khả dụng"
        description="Backend hiện chưa có API tổng hợp số dư ký quỹ, giải ngân và hoàn tiền theo từng supplier. Các số liệu này sẽ được hiển thị khi có nguồn dữ liệu chính xác." />

      {/* Main Order Card */}
      <Card
        extra={
          <Space wrap>
            <Button icon={<SettingOutlined />} onClick={openPolicyDrawer}>
              Chính sách &amp; Biểu phí
            </Button>
            <Button icon={<BankOutlined />} onClick={openPayoutAccountDrawer}>
              Tài khoản nhận giải ngân
            </Button>
            <Button icon={<ReloadOutlined />} onClick={loadOrders}>
              Tải lại
            </Button>
          </Space>
        }
      >
        <FilterBar search={search} onSearchChange={setSearch} status={orderQuery.status}
          onStatusChange={setStatus} onReset={resetOrders} placeholder="Tìm mã đơn hoặc người nhận"
          statusOptions={['Pending', 'AwaitingCustomerDeliveryApproval', 'Confirmed', 'Processing',
            'Shipped', 'Delivered', 'CancellationRequested', 'Cancelled', 'Expired']
            .map((value) => ({ value, label: value }))} />
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={orders}
          scroll={{ x: 1200 }}
          pagination={{ current: orderQuery.page, pageSize: orderQuery.pageSize,
            total: totalCount, onChange: setPage, simple: mobile, showSizeChanger: !mobile,
            pageSizeOptions: [10, 20, 50, 100], responsive: true }}
        />
      </Card>

      {/* Modal 1: Propose Delivery Date */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <CalendarOutlined className="text-amber-700" />
            <span>Đề Xuất Ngày Giao Hàng Mới · #{proposingOrder?.orderNumber}</span>
          </div>
        }
        open={proposeModalOpen}
        onCancel={() => setProposeModalOpen(false)}
        confirmLoading={proposeSubmitting}
        onOk={submitProposeDeliveryDate}
        okText="Gửi Đề Xuất (SLA 12h)"
        okButtonProps={{ style: { background: '#d48806', borderColor: '#d48806', fontWeight: 700 } }}
      >
        <div className="space-y-3 my-3 text-xs sm:text-sm text-stone-700">
          <p>
            Khách hàng mong muốn nhận vào ngày: <b>{proposingOrder?.deliveryDateExpected || 'Chưa đặt'}</b>. Quý xưởng có thể đề xuất ngày giao mới:
          </p>

          <div>
            <span className="font-semibold text-xs text-stone-800 block mb-1">Ngày xưởng đề xuất nhận hàng:</span>
            <Input
              type="date"
              size="large"
              value={proposedDate}
              onChange={(e) => setProposedDate(e.target.value)}
              style={{ borderRadius: 8 }}
            />
          </div>

          <div>
            <span className="font-semibold text-xs text-stone-800 block mb-1">Lý do điều chỉnh (thông báo đến khách):</span>
            <TextArea
              rows={3}
              value={proposedReason}
              onChange={(e) => setProposedReason(e.target.value)}
              placeholder="Giải thích lý do điều chỉnh tiến độ..."
              style={{ borderRadius: 8 }}
            />
          </div>
        </div>
      </Modal>

      {/* Modal 2: PoD Photo Upload */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <TruckOutlined className="text-emerald-700" />
            <span>Tải Ảnh Biên Bản Giao Hàng (Proof-of-Delivery) · #{podOrder?.orderNumber}</span>
          </div>
        }
        open={podUploadModalOpen}
        onCancel={() => setPodUploadModalOpen(false)}
        confirmLoading={podSubmitting}
        onOk={submitPodProof}
        okText="Nộp Bằng Chứng PoD"
        okButtonProps={{ style: { background: '#059669', borderColor: '#059669', fontWeight: 700 } }}
        width={600}
      >
        <div className="space-y-3 my-3 text-xs sm:text-sm text-stone-700">
          <Alert
            type="info"
            showIcon
            message="Chứng từ hoàn tất giao nhận"
            description="Ảnh chụp biên bản giao hàng có chữ ký / con dấu của đại diện doanh nghiệp là căn cứ giải phóng số tiền ký quỹ được tạm giữ an toàn."
          />

          <div>
            <span className="font-semibold text-xs text-stone-800 block mb-1">Đường dẫn ảnh chụp biên bản PoD (HTTPS):</span>
            <Input
              size="large"
              value={podPhotoUrl}
              onChange={(e) => setPodPhotoUrl(e.target.value)}
              placeholder="https://..."
              style={{ borderRadius: 8 }}
            />
          </div>

          <div>
            <span className="font-semibold text-xs text-stone-800 block mb-1">Họ tên người ký nhận:</span>
            <Input
              size="large"
              value={podSignatureName}
              onChange={(e) => setPodSignatureName(e.target.value)}
              style={{ borderRadius: 8 }}
            />
          </div>

          <div>
            <span className="font-semibold text-xs text-stone-800 block mb-1">Ghi chú bàn giao:</span>
            <TextArea
              rows={2}
              value={podNotes}
              onChange={(e) => setPodNotes(e.target.value)}
              style={{ borderRadius: 8 }}
            />
          </div>
        </div>
      </Modal>

      {/* Drawer 1: Shop Bulk Order Policy & Rates */}
      <Drawer
        title={<span className="font-bold">Chính Sách Đơn Hàng &amp; Biểu Phí Vận Chuyển Xưởng</span>}
        open={policyDrawerOpen}
        onClose={() => setPolicyDrawerOpen(false)}
        width={560}
      >
        <Form form={policyForm} layout="vertical" onFinish={savePolicy}>
          <Alert
            type="info"
            showIcon
            className="mb-4 text-xs"
            message="Chính sách được áp dụng tức thời cho các báo giá tạo mới của xưởng."
          />

          <Form.Item
            name="depositPercent"
            label={<span className="text-xs font-semibold">Tỷ lệ đặt cọc yêu cầu (%)</span>}
            rules={[{ required: true }]}
            extra="Quy định từ 10% đến 50% tổng giá trị đơn hàng."
          >
            <Slider min={10} max={50} step={5} marks={{ 10: '10%', 30: '30%', 50: '50%' }} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="minLeadTimeDays"
                label={<span className="text-xs font-semibold">Thời gian chuẩn bị tối thiểu (ngày)</span>}
                rules={[{ required: true }]}
              >
                <InputNumber min={1} max={30} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="vatTaxPercent"
                label={<span className="text-xs font-semibold">Thuế suất VAT (%)</span>}
                rules={[{ required: true }]}
              >
                <InputNumber min={0} max={10} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="taxIncludedInPrice"
            label={<span className="text-xs font-semibold">Thuế đã gồm trong giá niêm yết?</span>}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Divider orientation="left" style={{ fontSize: 12 }}>
            Biểu phí vận chuyển giao nguyên lô 1 chuyến (VND)
          </Divider>

          <Form.Item
            name="rateHcmInner"
            label={<span className="text-xs font-semibold">TP.HCM Nội Thành (Q1, 3, 5, 10, Phú Nhuận...)</span>}
            rules={[{ required: true }]}
          >
            <InputNumber min={0} step={10000} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="rateHcmOuter"
            label={<span className="text-xs font-semibold">TP.HCM Ngoại Thành (Q7, 2, 9, Thủ Đức, Bình Tân, Q12...)</span>}
            rules={[{ required: true }]}
          >
            <InputNumber min={0} step={10000} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="rateProvincial"
            label={<span className="text-xs font-semibold">Các tỉnh thành lân cận (Bình Dương, Đồng Nai, Long An...)</span>}
            rules={[{ required: true }]}
          >
            <InputNumber min={0} step={10000} style={{ width: '100%' }} />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={policySaving} block style={{ background: '#8c1524', borderColor: '#8c1524' }}>
            Lưu Thay Đổi Chính Sách
          </Button>
        </Form>
      </Drawer>

      {/* Drawer 2: Payout Bank Account */}
      <Drawer
        title={<span className="font-bold">Tài Khoản Ngân Hàng Nhận Giải Ngân (Simulated Sandbox)</span>}
        open={payoutDrawerOpen}
        onClose={() => setPayoutDrawerOpen(false)}
        width={480}
      >
        <Form form={payoutAccountForm} layout="vertical" onFinish={savePayoutAccount}>
          <Alert
            type="warning"
            showIcon
            className="mb-4 text-xs"
            message="Tài khoản này chỉ dùng để nhận giải ngân từ sàn sau khi đơn hàng hoàn tất; không dùng để nhận tiền thanh toán trực tiếp từ khách."
          />

          <Form.Item name="bankName" label={<span className="text-xs font-semibold">Ngân hàng thụ hưởng</span>} rules={[{ required: true }]}>
            <Input placeholder="Ngân hàng TMCP Ngoại Thương Việt Nam (Vietcombank)" />
          </Form.Item>

          <Form.Item name="bankCode" label={<span className="text-xs font-semibold">Mã ngân hàng (VietQR Code)</span>} rules={[{ required: true }]}>
            <Input placeholder="VCB" />
          </Form.Item>

          <Form.Item name="accountNumber" label={<span className="text-xs font-semibold">Số tài khoản</span>} rules={[{ required: true }]}>
            <Input placeholder="0071000123456" />
          </Form.Item>

          <Form.Item name="accountHolderName" label={<span className="text-xs font-semibold">Tên chủ tài khoản</span>} rules={[{ required: true }]}>
            <Input placeholder="NGUYEN VAN XUONG" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={payoutAccountSaving} block style={{ background: '#8c1524', borderColor: '#8c1524' }}>
            Lưu Tài Khoản Thụ Hưởng
          </Button>
        </Form>
      </Drawer>

      {/* Modal 3: Packaging Customization Detail & Mockup Upload */}
      <Modal
        title={`Bao bì tùy chỉnh · ${selectedOrder?.orderNumber || ''}`}
        open={packagingOpen}
        onCancel={() => setPackagingOpen(false)}
        footer={null}
        width={780}
        loading={packagingLoading}
      >
        {!packaging ? (
          <Empty description="Đơn hàng không yêu cầu bao bì riêng." />
        ) : (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="Doanh nghiệp">{packaging.companyName}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color="blue">{packaging.status}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Quy cách">{packaging.packagingType}</Descriptions.Item>
              <Descriptions.Item label="Logo">
                <a href={packaging.companyLogoUrl} target="_blank" rel="noreferrer">
                  <EyeOutlined /> Xem logo doanh nghiệp
                </a>
              </Descriptions.Item>
              <Descriptions.Item label="Thông điệp" span={2}>
                {packaging.specialMessage || '—'}
              </Descriptions.Item>
            </Descriptions>

            {packaging.revisions?.map((revision) => (
              <Card
                key={revision.id}
                size="small"
                title={`Phiên bản #${revision.revisionNumber}`}
                extra={<Tag>{revision.status}</Tag>}
              >
                <Space direction="vertical">
                  <a href={revision.mockupUrl} target="_blank" rel="noreferrer">
                    Mở tệp mockup
                  </a>
                  <Text>Phí thiết kế: {money(revision.designFee)}</Text>
                  {revision.customerNotes && <Text type="danger">Khách yêu cầu sửa: {revision.customerNotes}</Text>}
                </Space>
              </Card>
            ))}

            {['Pending', 'DesignReview', 'RevisionRequested'].includes(packaging.status) && (
              <Card size="small" title="Gửi phiên bản mockup 3D mới">
                <Form form={revisionForm} layout="vertical" onFinish={submitRevision}>
                  <Form.Item name="mockupUrl" label="URL mockup HTTPS" rules={[{ required: true }, { type: 'url' }]}>
                    <Input placeholder="https://..." />
                  </Form.Item>
                  <Form.Item name="designFee" label="Phí thiết kế phát sinh (nếu có)" initialValue={0} rules={[{ required: true }]}>
                    <InputNumber min={0} max={100000000} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item name="supplierNotes" label="Ghi chú cho khách hàng">
                    <TextArea rows={3} maxLength={2000} showCount placeholder="Mô tả kỹ thuật ép kim, phối cảnh..." />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" loading={packagingLoading} style={{ background: '#8c1524', borderColor: '#8c1524' }}>
                    Gửi Mockup Cho Khách Duyệt
                  </Button>
                </Form>
              </Card>
            )}
          </Space>
        )}
      </Modal>

      {/* Modal 4: Create Payout Request */}
      <Modal
        title="Yêu cầu giải ngân tiền ký quỹ (Simulated Sandbox)"
        open={payoutRequestModalOpen}
        onCancel={() => setPayoutRequestModalOpen(false)}
        confirmLoading={payoutRequestSubmitting}
        onOk={submitPayoutRequest}
        okText="Gửi Yêu Cầu Giải Ngân"
        okButtonProps={{ style: { background: '#16a34a', borderColor: '#16a34a', fontWeight: 700 } }}
      >
        <div className="space-y-3 my-3 text-xs sm:text-sm text-stone-700">
          <p>
            Đơn hàng <b>#{selectedOrder?.orderNumber}</b> đã được khách hàng xác nhận nhận hàng. Khoản tiền ký quỹ đã được mở khóa vào số dư khả dụng:
          </p>
          <Descriptions bordered size="small" column={1}>
            <Descriptions.Item label="Số tiền đề xuất giải ngân">
              <b className="text-[#16a34a] text-base">{money(selectedOrder?.totalAmount || 0)}</b>
            </Descriptions.Item>
            <Descriptions.Item label="Tài khoản thụ hưởng">
              Chuyển về tài khoản ngân hàng đã cấu hình của xưởng
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Modal>
    </ColonyAdminLayout>
  );
}
