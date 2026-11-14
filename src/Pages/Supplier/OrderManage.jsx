import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
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
  Slider,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
  message,
} from 'antd';
import {
  BankOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CrownOutlined,
  DollarCircleOutlined,
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

const { Text } = Typography;
const { TextArea } = Input;
const money = (value) => `${Number(value || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) => (
  error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.'
);

const STATUS_META = {
  Pending: { label: 'Chờ xác nhận', color: 'gold' },
  AwaitingCustomerDeliveryApproval: { label: 'Chờ khách duyệt ngày', color: 'orange' },
  Confirmed: { label: 'Đã xác nhận', color: 'blue' },
  Processing: { label: 'Đang sản xuất', color: 'purple' },
  Shipped: { label: 'Đã xuất kho', color: 'cyan' },
  Delivered: { label: 'Đã giao hàng', color: 'green' },
  CancellationRequested: { label: 'Yêu cầu hủy', color: 'volcano' },
  Cancelled: { label: 'Đã hủy', color: 'red' },
  Expired: { label: 'Hết hạn SLA', color: 'default' },
};

function formatCountdown(targetDateStr) {
  if (!targetDateStr) return null;
  const target = new Date(targetDateStr).getTime();
  const diffMs = target - Date.now();
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
      className="m-0 text-[11px] font-medium tabular-nums !whitespace-normal leading-tight"
    >
      {label}: {text}
    </Tag>
  );
}

export default function OrderManage({ onNavigate }) {
  const mobile = useIsMobile();
  const {
    items: orders,
    totalCount,
    loading,
    error: orderError,
    query: orderQuery,
    search,
    setSearch,
    setPage,
    setStatus,
    refresh: loadOrders,
    reset: resetOrders,
  } = usePagedList(orderService.listSupplierOrdersPaged);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [packaging, setPackaging] = useState(null);
  const [packagingOpen, setPackagingOpen] = useState(false);
  const [packagingLoading, setPackagingLoading] = useState(false);
  const [revisionForm] = Form.useForm();

  const [proposeModalOpen, setProposeModalOpen] = useState(false);
  const [proposingOrder, setProposingOrder] = useState(null);
  const [proposedDate, setProposedDate] = useState('');
  const [proposedReason, setProposedReason] = useState('');
  const [proposeSubmitting, setProposeSubmitting] = useState(false);

  const [podUploadModalOpen, setPodUploadModalOpen] = useState(false);
  const [podOrder, setPodOrder] = useState(null);
  const [podPhotoUrl, setPodPhotoUrl] = useState('');
  const [podSignatureName, setPodSignatureName] = useState('');
  const [podNotes, setPodNotes] = useState('');
  const [podSubmitting, setPodSubmitting] = useState(false);

  const [policyDrawerOpen, setPolicyDrawerOpen] = useState(false);
  const [policyForm] = Form.useForm();
  const [policySaving, setPolicySaving] = useState(false);

  const [payoutDrawerOpen, setPayoutDrawerOpen] = useState(false);
  const [payoutAccountForm] = Form.useForm();
  const [payoutAccountSaving, setPayoutAccountSaving] = useState(false);

  const [payoutRequestModalOpen, setPayoutRequestModalOpen] = useState(false);
  const [payoutRequestSubmitting, setPayoutRequestSubmitting] = useState(false);

  useEffect(() => {
    if (orderError) message.error(errorMessage(orderError));
  }, [orderError]);

  const runAction = async (action, order, successText) => {
    try {
      await action(order.id);
      message.success(successText);
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    }
  };

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
      message.success('Đã lưu cấu hình chính sách cọc và biểu phí vận chuyển.');
      setPolicyDrawerOpen(false);
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setPolicySaving(false);
    }
  };

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
      message.success('Đã lưu thông tin tài khoản nhận giải ngân.');
      setPayoutDrawerOpen(false);
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setPayoutAccountSaving(false);
    }
  };

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
      message.success('Đã gửi đề xuất ngày giao hàng đến khách hàng (SLA 12h).');
      setProposeModalOpen(false);
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setProposeSubmitting(false);
    }
  };

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

      message.success('Đã tải ảnh biên bản bàn giao PoD. Khách hàng có 48h để đối soát.');
      setPodUploadModalOpen(false);
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setPodSubmitting(false);
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
        await runAction(
          (id) => orderService.reject(id, reason.trim()),
          order,
          'Đã từ chối đơn và hoàn tồn kho.',
        );
      },
    });
  };

  const submitPayoutRequest = async () => {
    setPayoutRequestSubmitting(true);
    try {
      await orderService.createPayoutRequest(selectedOrder?.id, {
        notes: 'Yêu cầu quyết toán số dư khả dụng đơn hàng',
      });
      message.success('Đã gửi yêu cầu giải ngân thành công.');
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
      render: (value, order) => {
        const sla = order.status === 'Pending'
          ? { date: order.responseDeadlineAtUtc || order.responseDeadlineAt, label: 'SLA phản hồi' }
          : order.status === 'AwaitingCustomerDeliveryApproval'
            ? { date: order.deliveryApprovalDeadlineAtUtc || order.deliveryApprovalDeadlineAt, label: 'Chờ khách duyệt' }
            : null;

        return (
          <div className="max-w-[175px] space-y-1">
            <div className="font-mono text-sm font-semibold text-[#7d1322] whitespace-nowrap">
              #{value}
            </div>
            <div className="text-[11px] tabular-nums text-[#8a7f7a]">
              {new Date(order.createdAtUtc || order.createdAt).toLocaleString('vi-VN')}
            </div>
            {sla && <SlaCountdownBadge deadline={sla.date} label={sla.label} />}
          </div>
        );
      },
    },
    {
      title: 'Doanh nghiệp / người nhận',
      key: 'customer',
      render: (_, order) => (
        <div className="max-w-[145px] space-y-0.5">
          <div className="truncate font-medium text-sm text-[#231a18]">
            {order.customPackaging?.companyName || order.recipientName || 'Khách hàng B2B'}
          </div>
          <div className="text-xs tabular-nums text-[#6c625e]">{order.recipientPhone}</div>
          <div className="truncate text-[11px] text-[#8a7f7a]">{order.deliveryAddress}</div>
        </div>
      ),
    },
    {
      title: 'Hạng mục & bao bì',
      key: 'items',
      render: (_, order) => (
        <div className="max-w-[155px] space-y-1 text-xs text-[#231a18]">
          {order.items?.map((item) => (
            <div key={item.variantId} className="tabular-nums leading-snug">
              {item.productName || 'Bánh Trung Thu'} ({item.variantName || 'Chuẩn'}) ×{' '}
              <span className="font-semibold">{item.quantity}</span>
            </div>
          ))}
          <div>
            {order.customPackaging ? (
              <Tag color="geekblue" icon={<CrownOutlined />} className="m-0 text-[11px]">
                Bao bì: {order.customPackaging.status}
              </Tag>
            ) : (
              <Tag className="m-0 text-[11px]">Bao bì tiêu chuẩn</Tag>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Ngày giao',
      key: 'deliveryDate',
      render: (_, order) => (
        <div className="space-y-0.5 text-xs tabular-nums text-[#231a18] whitespace-nowrap">
          {order.confirmedDeliveryDate ? (
            <>
              <div className="text-[11px] text-[#6c625e]">Xác nhận</div>
              <div className="font-medium">{order.confirmedDeliveryDate}</div>
            </>
          ) : order.deliveryDateExpected ? (
            <>
              <div className="text-[11px] text-[#6c625e]">Dự kiến</div>
              <div className="font-medium">{order.deliveryDateExpected}</div>
            </>
          ) : (
            <span className="text-[#8a7f7a]">Chưa đặt</span>
          )}
          {order.proposedDeliveryDate && order.status === 'AwaitingCustomerDeliveryApproval' && (
            <Tag color="orange" className="m-0 mt-1 text-[11px]">
              Đề xuất: {order.proposedDeliveryDate}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Tổng tiền & cọc',
      key: 'totalAmount',
      align: 'right',
      render: (_, order) => (
        <div className="space-y-1 text-right whitespace-nowrap">
          <div className="font-semibold tabular-nums text-sm text-[#7d1322]">
            {money(order.totalAmount)}
          </div>
          {order.paymentSummary ? (
            <Tag
              color={order.paymentSummary.totalPaidAmount > 0 ? 'green' : 'gold'}
              className="m-0 text-[11px] tabular-nums"
            >
              Đã cọc: {money(order.paymentSummary.totalPaidAmount)}
            </Tag>
          ) : null}
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (value) => {
        const meta = STATUS_META[value] || { label: value, color: 'default' };
        return <Tag color={meta.color} className="m-0 whitespace-nowrap">{meta.label}</Tag>;
      },
    },
    {
      title: 'Thao tác xưởng',
      key: 'actions',
      align: 'right',
      width: 176,
      render: (_, order) => {
        const allowedActions = order.allowedActions || [];

        return (
          <div className="flex flex-wrap justify-end gap-1.5">
            {order.status === 'Pending' && (
              <>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => runAction(orderService.confirm, order, 'Đã xác nhận đơn hàng và tạo lịch thu cọc.')}
                  style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
                >
                  Xác nhận đơn
                </Button>
                <Button
                  size="small"
                  onClick={() => handleOpenProposeModal(order)}
                  style={{ borderColor: '#9a6b16', color: '#9a6b16' }}
                >
                  Đề xuất ngày
                </Button>
                <Button size="small" danger onClick={() => rejectOrder(order)}>
                  Từ chối
                </Button>
              </>
            )}

            {allowedActions.includes('StartProcessing') && (
              <Button
                type="primary"
                size="small"
                onClick={() => runAction(
                  orderService.startProcessing,
                  order,
                  'Đơn hàng đã chuyển sang giai đoạn sản xuất.',
                )}
                style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
              >
                Bắt đầu sản xuất
              </Button>
            )}

            {allowedActions.includes('ShipOrder') && (
              <Button
                type="primary"
                size="small"
                onClick={() => runAction(
                  orderService.ship,
                  order,
                  'Đơn đã xuất kho, vui lòng tải ảnh biên bản PoD.',
                )}
                style={{ backgroundColor: '#2d5a43', borderColor: '#2d5a43' }}
              >
                Xuất kho giao
              </Button>
            )}

            {order.status === 'Shipped' && (
              <Button
                type="primary"
                size="small"
                icon={<UploadOutlined />}
                onClick={() => handleOpenPodModal(order)}
                style={{ backgroundColor: '#2d5a43', borderColor: '#2d5a43' }}
              >
                Tải ảnh PoD
              </Button>
            )}

            {order.customPackaging && (
              <Button size="small" icon={<PictureOutlined />} onClick={() => openPackaging(order)}>
                Bao bì
              </Button>
            )}

            {allowedActions.includes('CreatePayoutRequest') && (
              <Button
                size="small"
                icon={<DollarCircleOutlined />}
                onClick={() => {
                  setSelectedOrder(order);
                  setPayoutRequestModalOpen(true);
                }}
                style={{ borderColor: '#2d5a43', color: '#2d5a43' }}
              >
                Giải ngân
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <ColonyAdminLayout
      role="Supplier"
      activeKey="nha-cung-cap/quan-ly-don-hang"
      onNavigate={onNavigate}
      title="Quản lý đơn hàng doanh nghiệp"
      subtitle="Xác nhận đơn theo SLA, duyệt mockup bao bì, bàn giao PoD và quản lý biểu phí xưởng."
      extra={
        <Space wrap>
          <Button icon={<SettingOutlined />} onClick={openPolicyDrawer}>
            Chính sách &amp; Biểu phí
          </Button>
          <Button icon={<BankOutlined />} onClick={openPayoutAccountDrawer}>
            Tài khoản nhận giải ngân
          </Button>
          <Button icon={<ReloadOutlined />} onClick={loadOrders} loading={loading}>
            Tải lại
          </Button>
        </Space>
      }
    >
      <section
        aria-label="Danh sách đơn hàng B2B"
        className="rounded-2xl border border-[#e4dcd3] bg-white p-4 sm:p-6"
      >
        <div className="rounded-xl border border-[#ebe3da] bg-[#faf7f2] p-3.5">
          <FilterBar
            search={search}
            onSearchChange={setSearch}
            status={orderQuery.status}
            onStatusChange={setStatus}
            onReset={resetOrders}
            placeholder="Tìm mã đơn hoặc người nhận"
            statusOptions={Object.keys(STATUS_META).map((value) => ({
              value,
              label: value,
            }))}
          />
        </div>

        <div className="mt-4 overflow-x-auto">
          <Table
            rowKey="id"
            loading={loading}
            columns={columns}
            dataSource={orders}
            size="middle"
            scroll={{ x: 900 }}
            pagination={{
              current: orderQuery.page,
              pageSize: orderQuery.pageSize,
              total: totalCount,
              onChange: setPage,
              simple: mobile,
              showSizeChanger: !mobile,
              pageSizeOptions: [10, 20, 50, 100],
              responsive: true,
            }}
          />
        </div>
      </section>

      <Modal
        title={
          <div className="flex items-center gap-2 font-serif text-lg font-semibold text-[#231a18]">
            <CalendarOutlined className="text-[#9a6b16]" />
            <span>Đề xuất ngày giao hàng mới · #{proposingOrder?.orderNumber}</span>
          </div>
        }
        open={proposeModalOpen}
        onCancel={() => setProposeModalOpen(false)}
        confirmLoading={proposeSubmitting}
        onOk={submitProposeDeliveryDate}
        okText="Gửi đề xuất (SLA 12h)"
        cancelText="Hủy"
        okButtonProps={{ style: { backgroundColor: '#7d1322', borderColor: '#7d1322' } }}
        destroyOnHidden
      >
        <div className="my-3 space-y-3 text-xs sm:text-sm text-[#231a18]">
          <p className="text-[#6c625e]">
            Khách hàng mong muốn nhận vào ngày:{' '}
            <strong className="text-[#231a18]">
              {proposingOrder?.deliveryDateExpected || 'Chưa đặt'}
            </strong>
            . Đề xuất ngày phù hợp với lịch xếp lò của xưởng:
          </p>

          <div>
            <span className="mb-1 block text-xs font-medium text-[#231a18]">
              Ngày xưởng đề xuất giao hàng
            </span>
            <Input
              type="date"
              size="large"
              value={proposedDate}
              onChange={(e) => setProposedDate(e.target.value)}
            />
          </div>

          <div>
            <span className="mb-1 block text-xs font-medium text-[#231a18]">
              Lý do điều chỉnh
            </span>
            <TextArea
              rows={3}
              value={proposedReason}
              onChange={(e) => setProposedReason(e.target.value)}
              placeholder="Giải thích lý do điều chỉnh tiến độ..."
            />
          </div>
        </div>
      </Modal>

      <Modal
        title={
          <div className="flex items-center gap-2 font-serif text-lg font-semibold text-[#231a18]">
            <TruckOutlined className="text-[#2d5a43]" />
            <span>Biên bản bàn giao (Proof-of-Delivery) · #{podOrder?.orderNumber}</span>
          </div>
        }
        open={podUploadModalOpen}
        onCancel={() => setPodUploadModalOpen(false)}
        confirmLoading={podSubmitting}
        onOk={submitPodProof}
        okText="Nộp bằng chứng PoD"
        cancelText="Hủy"
        okButtonProps={{ style: { backgroundColor: '#2d5a43', borderColor: '#2d5a43' } }}
        width={600}
        destroyOnHidden
      >
        <div className="my-3 space-y-3 text-xs sm:text-sm text-[#231a18]">
          <Alert
            type="info"
            showIcon
            title="Chứng từ hoàn tất giao nhận"
            description="Ảnh chụp biên bản có chữ ký hoặc con dấu đại diện doanh nghiệp là căn cứ mở khóa thanh toán."
          />

          <div>
            <span className="mb-1 block text-xs font-medium text-[#231a18]">
              Đường dẫn ảnh biên bản PoD (HTTPS)
            </span>
            <Input
              size="large"
              value={podPhotoUrl}
              onChange={(e) => setPodPhotoUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div>
            <span className="mb-1 block text-xs font-medium text-[#231a18]">
              Họ tên người ký nhận
            </span>
            <Input
              size="large"
              value={podSignatureName}
              onChange={(e) => setPodSignatureName(e.target.value)}
            />
          </div>

          <div>
            <span className="mb-1 block text-xs font-medium text-[#231a18]">
              Ghi chú bàn giao
            </span>
            <TextArea rows={2} value={podNotes} onChange={(e) => setPodNotes(e.target.value)} />
          </div>
        </div>
      </Modal>

      <Drawer
        title={
          <span className="font-serif text-lg font-semibold text-[#231a18]">
            Chính sách đơn hàng &amp; biểu phí vận chuyển
          </span>
        }
        open={policyDrawerOpen}
        onClose={() => setPolicyDrawerOpen(false)}
        width={560}
      >
        <Form form={policyForm} layout="vertical" onFinish={savePolicy}>
          <Alert
            type="info"
            showIcon
            className="mb-4 text-xs"
            title="Áp dụng tức thời cho các đơn hàng B2B tạo mới của xưởng."
          />

          <Form.Item
            name="depositPercent"
            label={<span className="text-xs font-medium">Tỷ lệ đặt cọc yêu cầu (%)</span>}
            rules={[{ required: true }]}
            extra="Quy định từ 10% đến 50% tổng giá trị đơn hàng."
          >
            <Slider min={10} max={50} step={5} marks={{ 10: '10%', 30: '30%', 50: '50%' }} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="minLeadTimeDays"
                label={<span className="text-xs font-medium">Thời gian chuẩn bị tối thiểu (ngày)</span>}
                rules={[{ required: true }]}
              >
                <InputNumber min={1} max={30} className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="vatTaxPercent"
                label={<span className="text-xs font-medium">Thuế suất VAT (%)</span>}
                rules={[{ required: true }]}
              >
                <InputNumber min={0} max={10} className="w-full" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="taxIncludedInPrice"
            label={<span className="text-xs font-medium">Thuế đã gồm trong giá niêm yết</span>}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Divider orientation="left" className="text-xs">
            Biểu phí vận chuyển nguyên lô (VNĐ)
          </Divider>

          <Form.Item
            name="rateHcmInner"
            label={<span className="text-xs font-medium">TP.HCM nội thành</span>}
            rules={[{ required: true }]}
          >
            <InputNumber min={0} step={10000} className="w-full" />
          </Form.Item>

          <Form.Item
            name="rateHcmOuter"
            label={<span className="text-xs font-medium">TP.HCM ngoại thành</span>}
            rules={[{ required: true }]}
          >
            <InputNumber min={0} step={10000} className="w-full" />
          </Form.Item>

          <Form.Item
            name="rateProvincial"
            label={<span className="text-xs font-medium">Các tỉnh thành lân cận</span>}
            rules={[{ required: true }]}
          >
            <InputNumber min={0} step={10000} className="w-full" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={policySaving}
            block
            style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
          >
            Lưu thay đổi chính sách
          </Button>
        </Form>
      </Drawer>

      <Drawer
        title={
          <span className="font-serif text-lg font-semibold text-[#231a18]">
            Tài khoản ngân hàng nhận giải ngân
          </span>
        }
        open={payoutDrawerOpen}
        onClose={() => setPayoutDrawerOpen(false)}
        width={480}
      >
        <Form form={payoutAccountForm} layout="vertical" onFinish={savePayoutAccount}>
          <Alert
            type="warning"
            showIcon
            className="mb-4 text-xs"
            title="Tài khoản nhận giải ngân từ sàn sau khi hoàn tất đơn hàng."
          />

          <Form.Item
            name="bankName"
            label={<span className="text-xs font-medium">Ngân hàng thụ hưởng</span>}
            rules={[{ required: true }]}
          >
            <Input placeholder="Ngân hàng TMCP Ngoại Thương Việt Nam (Vietcombank)" />
          </Form.Item>

          <Form.Item
            name="bankCode"
            label={<span className="text-xs font-medium">Mã ngân hàng (VietQR)</span>}
            rules={[{ required: true }]}
          >
            <Input placeholder="VCB" />
          </Form.Item>

          <Form.Item
            name="accountNumber"
            label={<span className="text-xs font-medium">Số tài khoản</span>}
            rules={[{ required: true }]}
          >
            <Input placeholder="0071000123456" />
          </Form.Item>

          <Form.Item
            name="accountHolderName"
            label={<span className="text-xs font-medium">Tên chủ tài khoản</span>}
            rules={[{ required: true }]}
          >
            <Input placeholder="NGUYEN VAN XUONG" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={payoutAccountSaving}
            block
            style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
          >
            Lưu tài khoản thụ hưởng
          </Button>
        </Form>
      </Drawer>

      <Modal
        title={
          <span className="font-serif text-lg font-semibold text-[#231a18]">
            {`Bao bì tùy chỉnh · ${selectedOrder?.orderNumber || ''}`}
          </span>
        }
        open={packagingOpen}
        onCancel={() => setPackagingOpen(false)}
        footer={null}
        width={780}
        loading={packagingLoading}
        destroyOnHidden
      >
        {!packaging ? (
          <Empty description="Đơn hàng không yêu cầu bao bì riêng." />
        ) : (
          <div className="space-y-5 pt-2">
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
              <div
                key={revision.id}
                className="rounded-xl border border-[#e4dcd3] bg-[#faf7f2] p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#231a18]">
                    Phiên bản #{revision.revisionNumber}
                  </span>
                  <Tag>{revision.status}</Tag>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <a href={revision.mockupUrl} target="_blank" rel="noreferrer" className="text-[#7d1322]">
                    Mở tệp mockup
                  </a>
                  <Text className="tabular-nums text-[#6c625e]">
                    Phí thiết kế: {money(revision.designFee)}
                  </Text>
                </div>
                {revision.customerNotes && (
                  <Text type="danger" className="block text-xs">
                    Khách yêu cầu sửa: {revision.customerNotes}
                  </Text>
                )}
              </div>
            ))}

            {['Pending', 'DesignReview', 'RevisionRequested'].includes(packaging.status) && (
              <div className="rounded-xl border border-[#e4dcd3] bg-white p-4">
                <h4 className="mb-3 font-medium text-[#231a18]">Gửi phiên bản mockup 3D mới</h4>
                <Form form={revisionForm} layout="vertical" onFinish={submitRevision}>
                  <Form.Item
                    name="mockupUrl"
                    label="URL mockup HTTPS"
                    rules={[{ required: true }, { type: 'url' }]}
                  >
                    <Input placeholder="https://..." />
                  </Form.Item>
                  <Form.Item
                    name="designFee"
                    label="Phí thiết kế phát sinh (nếu có)"
                    initialValue={0}
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={0} max={100000000} className="w-full" />
                  </Form.Item>
                  <Form.Item name="supplierNotes" label="Ghi chú cho khách hàng">
                    <TextArea rows={3} maxLength={2000} showCount placeholder="Mô tả kỹ thuật ép kim, phối cảnh..." />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={packagingLoading}
                    style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
                  >
                    Gửi mockup cho khách duyệt
                  </Button>
                </Form>
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal
        title={
          <span className="font-serif text-lg font-semibold text-[#231a18]">
            Yêu cầu giải ngân tiền ký quỹ
          </span>
        }
        open={payoutRequestModalOpen}
        onCancel={() => setPayoutRequestModalOpen(false)}
        confirmLoading={payoutRequestSubmitting}
        onOk={submitPayoutRequest}
        okText="Gửi yêu cầu giải ngân"
        cancelText="Hủy"
        okButtonProps={{ style: { backgroundColor: '#2d5a43', borderColor: '#2d5a43' } }}
        destroyOnHidden
      >
        <div className="my-3 space-y-3 text-xs sm:text-sm text-[#231a18]">
          <p className="text-[#6c625e]">
            Đơn hàng <strong className="text-[#231a18]">#{selectedOrder?.orderNumber}</strong> đã hoàn tất đối soát.
            Khoản ký quỹ sẵn sàng giải ngân về tài khoản xưởng:
          </p>
          <Descriptions bordered size="small" column={1}>
            <Descriptions.Item label="Số tiền đề xuất giải ngân">
              <span className="text-base font-semibold tabular-nums text-[#2d5a43]">
                {money(selectedOrder?.totalAmount || 0)}
              </span>
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
