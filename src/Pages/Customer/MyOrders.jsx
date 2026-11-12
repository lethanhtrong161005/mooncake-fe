import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Descriptions,
  Divider,
  Drawer,
  Empty,
  Image,
  Input,
  Modal,
  Pagination,
  Rate,
  Select,
  Space,
  Spin,
  Tag,
  message,
} from 'antd';
import {
  AlertOutlined,
  CalendarOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CreditCardOutlined,
  CrownOutlined,
  EyeOutlined,
  PictureOutlined,
  ReloadOutlined,
  TruckOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import CustomerFooter from '../../components/layout/CustomerFooter';
import CustomerBreadcrumbBar from '../../components/layout/CustomerBreadcrumbBar';
import customPackagingService from '../../services/customPackagingService';
import orderService from '../../services/orderService';
import usePagedList from '../../hooks/usePagedList';
import FilterBar from '../../components/common/FilterBar';
import useIsMobile from '../../hooks/useIsMobile';

const { TextArea } = Input;
const money = (value) => `${Number(value || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.';

const ORDER_STATUS_MAP = {
  Pending: { label: 'Chờ xưởng duyệt · SLA 12h', color: 'gold' },
  AwaitingCustomerDeliveryApproval: {
    label: 'Xưởng đề xuất ngày giao mới · SLA 12h',
    color: 'orange',
  },
  Confirmed: { label: 'Đã xác nhận · Chờ thanh toán cọc (24h)', color: 'blue' },
  Processing: { label: 'Đang sản xuất & đóng gói', color: 'purple' },
  Shipped: { label: 'Đang vận chuyển · Có ảnh PoD', color: 'cyan' },
  Delivered: { label: 'Đã nhận hàng · Hoàn tất', color: 'green' },
  CancellationRequested: { label: 'Đang yêu cầu hủy đơn', color: 'volcano' },
  Cancelled: { label: 'Đã hủy', color: 'default' },
  Expired: { label: 'Đã hết hạn SLA', color: 'default' },
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

export default function MyOrders({ onNavigate }) {
  const mobile = useIsMobile();
  const {
    items: orders,
    totalCount,
    loading: loadingOrders,
    error: orderError,
    query: orderQuery,
    search,
    setSearch,
    setPage,
    setStatus,
    refresh: loadOrders,
    reset: resetOrders,
  } = usePagedList(orderService.listMinePaged);

  // Modals & Drawers state
  const [reviewingOrder, setReviewingOrder] = useState(null);
  const [packaging, setPackaging] = useState(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);

  // Multi-part Payment Schedule Modal
  const [paymentScheduleOrder, setPaymentScheduleOrder] = useState(null);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [paymentSummaryLoading, setPaymentSummaryLoading] = useState(false);
  const [generatingUrlPartId, setGeneratingUrlPartId] = useState(null);

  // PoD Inspection & Confirm Receipt Modal
  const [podModalOrder, setPodModalOrder] = useState(null);
  const [podRating, setPodRating] = useState(5);
  const [podFeedback, setPodFeedback] = useState('Giao hàng đúng hẹn, bánh và bao bì nguyên vẹn.');
  const [podConfirming, setPodConfirming] = useState(false);

  // Delivery Dispute Modal
  const [disputeModalOrder, setDisputeModalOrder] = useState(null);
  const [disputeReason, setDisputeReason] = useState('BrokenCakes');
  const [disputeDescription, setDisputeDescription] = useState('');
  const [disputeSubmitting, setDisputeSubmitting] = useState(false);

  // Proposal Respond Modal
  const [proposalModalOrder, setProposalModalOrder] = useState(null);
  const [proposalResponding, setProposalResponding] = useState(false);

  // Cancellation Request Modal
  const [cancelModalOrder, setCancelModalOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelSubmitting, setCancelSubmitting] = useState(false);

  useEffect(() => {
    if (orderError) message.error(errorMessage(orderError));
  }, [orderError]);

  // Open multi-part payment schedule
  const openPaymentSchedule = async (order) => {
    setPaymentScheduleOrder(order);
    setPaymentSummary(null);
    setPaymentSummaryLoading(true);
    try {
      const summary = await orderService.getPaymentSummary(order.id);
      setPaymentSummary(summary);
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setPaymentSummaryLoading(false);
    }
  };

  const handlePayPartVnPay = async (orderId, partId) => {
    setGeneratingUrlPartId(partId);
    try {
      const returnUrl = `${window.location.origin}/thanh-toan/ket-qua`;
      const res = await orderService.createPartVnPayUrl(orderId, partId, returnUrl);
      if (res?.paymentUrl) {
        message.info('Đang chuyển hướng sang cổng thanh toán VNPay...');
        window.location.assign(res.paymentUrl);
      } else {
        message.error('Không tạo được liên kết thanh toán VNPay.');
      }
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setGeneratingUrlPartId(null);
    }
  };

  // Open packaging review
  const openPackaging = async (order) => {
    setReviewingOrder(order);
    setPackaging(null);
    setReviewLoading(true);
    try {
      setPackaging(await customPackagingService.get(order.id));
    } catch (error) {
      message.info(
        error?.response?.status === 404
          ? 'Đơn hàng không có yêu cầu bao bì riêng.'
          : errorMessage(error)
      );
      setReviewingOrder(null);
    } finally {
      setReviewLoading(false);
    }
  };

  const reviewRevision = async (action) => {
    const revision = packaging?.revisions?.find((item) => item.status === 'DesignReview');
    if (!revision) return;
    if (action === 'RequestRevision' && reviewNotes.trim().length < 10) {
      message.warning('Vui lòng mô tả nội dung cần chỉnh sửa ít nhất 10 ký tự.');
      return;
    }
    setReviewLoading(true);
    try {
      await customPackagingService.reviewRevision(reviewingOrder.id, revision.id, {
        action,
        notes: reviewNotes.trim() || null,
      });
      message.success(
        action === 'Approve' ? 'Đã duyệt mockup bao bì thành công.' : 'Đã gửi yêu cầu chỉnh sửa.'
      );
      setPackaging(await customPackagingService.get(reviewingOrder.id));
      setReviewNotes('');
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setReviewLoading(false);
    }
  };

  // Respond to delivery date proposal
  const handleRespondProposal = async (approve) => {
    if (!proposalModalOrder) return;
    setProposalResponding(true);
    try {
      await orderService.respondDeliveryProposal(proposalModalOrder.id, {
        approve,
        responseNote: approve ? 'Chấp thuận ngày giao mới' : 'Từ chối ngày giao đề xuất',
      });
      message.success(
        approve ? 'Đã chấp nhận ngày giao hàng mới.' : 'Đã từ chối ngày giao hàng đề xuất.'
      );
      setProposalModalOrder(null);
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setProposalResponding(false);
    }
  };

  // Confirm receipt of PoD
  const handleConfirmReceipt = async () => {
    if (!podModalOrder) return;
    setPodConfirming(true);
    try {
      await orderService.confirmDeliveryReceipt(podModalOrder.id, {
        rating: podRating,
        feedback: podFeedback,
      });
      message.success('Đã xác nhận nhận hàng và mở khóa ký quỹ cho xưởng thành công!');
      setPodModalOrder(null);
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setPodConfirming(false);
    }
  };

  // Report delivery dispute
  const handleReportDispute = async () => {
    if (!disputeModalOrder) return;
    if (disputeDescription.trim().length < 10) {
      message.warning('Vui lòng mô tả chi tiết vấn đề ít nhất 10 ký tự.');
      return;
    }
    setDisputeSubmitting(true);
    try {
      await orderService.reportDeliveryDispute(disputeModalOrder.id, {
        disputeReason,
        description: disputeDescription.trim(),
        evidencePhotoUrls: [],
      });
      message.success(
        'Đã ghi nhận khiếu nại giao nhận. Tiền ký quỹ đã được khóa bảo chứng để Ban Quản Trị đối soát.'
      );
      setDisputeModalOrder(null);
      setPodModalOrder(null);
      setDisputeDescription('');
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setDisputeSubmitting(false);
    }
  };

  // Cancellation request
  const handleRequestCancellation = async () => {
    if (!cancelModalOrder) return;
    if (cancelReason.trim().length < 5) {
      message.warning('Vui lòng nhập lý do hủy ít nhất 5 ký tự.');
      return;
    }
    setCancelSubmitting(true);
    try {
      await orderService.requestCancellation(cancelModalOrder.id, {
        reason: cancelReason.trim(),
      });
      message.success('Đã gửi yêu cầu hủy đơn hàng đến xưởng.');
      setCancelModalOrder(null);
      setCancelReason('');
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setCancelSubmitting(false);
    }
  };

  // Order history
  const ordersTab = (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <div>
          <h3 className="font-['Playfair_Display',serif] text-lg font-bold text-stone-900 m-0">
            Lịch Sử Đơn Đặt Hàng B2B &amp; Ký Quỹ VNPay
          </h3>
          <span className="text-xs text-stone-500">
            Theo dõi tiến độ sản xuất, thanh toán chia lượt VNPay và kiểm tra biên bản ảnh giao hàng
            PoD
          </span>
        </div>

        <Button
          icon={<ReloadOutlined />}
          onClick={loadOrders}
          loading={loadingOrders}
          style={{ borderRadius: 8 }}
        >
          Tải lại danh sách
        </Button>
      </div>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        status={orderQuery.status}
        onStatusChange={setStatus}
        onReset={resetOrders}
        placeholder="Tìm mã đơn hoặc người nhận"
        statusOptions={[
          'Pending',
          'Confirmed',
          'Processing',
          'Shipped',
          'Delivered',
          'Cancelled',
          'Expired',
          'Disputed',
        ].map((value) => ({ value, label: value }))}
      />

      {loadingOrders ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-stone-200">
          <Spin size="large" description="Đang tải danh sách đơn hàng..." />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 shadow-xs">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Quý khách chưa có đơn đặt hàng nào trong hệ thống."
          />
          <Button
            type="primary"
            onClick={() => onNavigate?.('tim-kiem')}
            style={{
              background: '#8c1524',
              borderColor: '#8c1524',
              marginTop: 16,
              borderRadius: 10,
            }}
          >
            Tạo đơn đặt hàng mới
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const statusConfig = ORDER_STATUS_MAP[order.status] || {
              label: order.status,
              color: 'default',
            };
            const totalQty = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
            const allowedActions = order.allowedActions || [];

            // Active deadline depending on state
            const activeDeadline =
              order.status === 'Pending'
                ? {
                    date: order.responseDeadlineAtUtc || order.responseDeadlineAt,
                    label: 'SLA phản hồi xưởng',
                  }
                : order.status === 'AwaitingCustomerDeliveryApproval'
                  ? {
                      date: order.deliveryApprovalDeadlineAtUtc || order.deliveryApprovalDeadlineAt,
                      label: 'SLA duyệt ngày giao',
                    }
                  : order.status === 'Confirmed' && order.reservationExpiresAtUtc
                    ? {
                        date: order.reservationExpiresAtUtc || order.reservationExpiresAt,
                        label: 'SLA cọc / giữ kho',
                      }
                    : null;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs hover:border-stone-300 transition-all flex flex-col gap-4"
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="font-mono font-bold text-stone-900 text-sm sm:text-base">
                      #{order.orderNumber}
                    </span>
                    <Tag color={statusConfig.color} className="m-0 font-semibold text-xs">
                      {statusConfig.label}
                    </Tag>

                    {activeDeadline && (
                      <SlaCountdownBadge
                        deadline={activeDeadline.date}
                        label={activeDeadline.label}
                      />
                    )}

                    {order.financialSummary && (
                      <Tag color="cyan" className="m-0 text-[11px] font-medium">
                        Tạm giữ ký quỹ: {money(order.financialSummary.heldAmount)}
                      </Tag>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-stone-500 block">Tổng thanh toán:</span>
                    <b className="text-base sm:text-lg font-extrabold text-[#8c1524]">
                      {money(order.totalAmount)}
                    </b>
                  </div>
                </div>

                {/* Proposal Alert if awaiting customer approval */}
                {order.status === 'AwaitingCustomerDeliveryApproval' &&
                  order.proposedDeliveryDate && (
                    <Alert
                      type="warning"
                      showIcon
                      message="Xưởng đề xuất điều chỉnh ngày giao hàng"
                      description={
                        <div className="space-y-2 mt-1">
                          <div>
                            Ngày giao mong muốn ban đầu: <b>{order.deliveryDateExpected}</b> ➔ Ngày
                            giao xưởng đề xuất:{' '}
                            <b className="text-amber-900">{order.proposedDeliveryDate}</b>
                          </div>
                          {order.deliveryProposalReason && (
                            <div className="text-stone-600">
                              Lý do từ xưởng: {order.deliveryProposalReason}
                            </div>
                          )}
                          <Space className="pt-1">
                            <Button
                              type="primary"
                              size="small"
                              onClick={() => setProposalModalOrder(order)}
                              style={{ background: '#d48806', borderColor: '#d48806' }}
                            >
                              Phản hồi đề xuất này
                            </Button>
                          </Space>
                        </div>
                      }
                    />
                  )}

                {/* Items & Delivery Body */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-stone-400 block mb-0.5 font-medium">
                      Sản phẩm &amp; số lượng:
                    </span>
                    <b className="text-stone-900 block text-sm">
                      {order.items?.[0]?.productName || 'Bánh Trung Thu Doanh Nghiệp'}
                    </b>
                    <span className="text-stone-600 block mt-0.5">
                      Quy mô: {totalQty} hộp{' '}
                      {order.items?.length > 1 ? `(${order.items.length} hạng mục vị bánh)` : ''}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 block mb-0.5 font-medium">
                      Thông tin giao nhận (1 chuyến v1):
                    </span>
                    <span className="text-stone-900 font-semibold block">
                      {order.recipientName} ({order.recipientPhone})
                    </span>
                    <span className="text-stone-600 block mt-0.5 truncate max-w-xs">
                      {order.deliveryAddress}
                    </span>
                    <span className="text-stone-500 block mt-0.5">
                      Vùng: {order.shippingZoneCode || 'Nội thành TP.HCM'}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 block mb-0.5 font-medium">
                      Thời gian &amp; Bao bì:
                    </span>
                    <span className="text-stone-900 block">
                      {order.confirmedDeliveryDate
                        ? `Xác nhận giao: ${order.confirmedDeliveryDate}`
                        : order.deliveryDateExpected
                          ? `Dự kiến: ${order.deliveryDateExpected}`
                          : 'Theo thỏa thuận xưởng'}
                    </span>
                    {order.customPackaging ? (
                      <span className="text-amber-700 font-semibold flex items-center gap-1 mt-0.5">
                        <CrownOutlined /> Có thiết kế bao bì in logo
                      </span>
                    ) : (
                      <span className="text-stone-400 block mt-0.5">
                        Quy cách hộp tiêu chuẩn xưởng
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-stone-100">
                  <div className="text-xs text-stone-500">
                    {order.paymentSummary ? (
                      <span>
                        Đã nộp cọc: <b>{money(order.paymentSummary.totalPaidAmount)}</b> / Còn lại:{' '}
                        <b>{money(order.paymentSummary.remainingAmount)}</b>
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* View/Pay Payment Schedule */}
                    <Button
                      icon={<CreditCardOutlined />}
                      onClick={() => openPaymentSchedule(order)}
                      style={{ borderRadius: 8, fontWeight: 600 }}
                    >
                      Lịch trình thanh toán VNPay
                    </Button>

                    {/* Respond Delivery Proposal */}
                    {allowedActions.includes('RespondDeliveryProposal') && (
                      <Button
                        type="primary"
                        onClick={() => setProposalModalOrder(order)}
                        style={{ background: '#d48806', borderColor: '#d48806', borderRadius: 8 }}
                      >
                        Duyệt ngày giao hàng
                      </Button>
                    )}

                    {/* View & Review Mockup */}
                    {order.customPackaging && (
                      <Button
                        icon={<EyeOutlined />}
                        onClick={() => openPackaging(order)}
                        style={{
                          borderRadius: 8,
                          fontWeight: 600,
                          color: '#b45309',
                          borderColor: '#f59e0b',
                        }}
                      >
                        Xem &amp; Duyệt Mockup 3D
                      </Button>
                    )}

                    {/* PoD Review & Confirm Receipt */}
                    {order.status === 'Shipped' && (
                      <Button
                        type="primary"
                        icon={<PictureOutlined />}
                        onClick={() => setPodModalOrder(order)}
                        style={{
                          background: '#16a34a',
                          borderColor: '#16a34a',
                          borderRadius: 8,
                          fontWeight: 700,
                        }}
                      >
                        Kiểm tra ảnh PoD &amp; Xác nhận nhận hàng
                      </Button>
                    )}

                    {/* Request Cancellation */}
                    {allowedActions.includes('RequestCancellation') && (
                      <Button
                        danger
                        onClick={() => setCancelModalOrder(order)}
                        style={{ borderRadius: 8 }}
                      >
                        Yêu cầu hủy đơn
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Pagination
        current={orderQuery.page}
        pageSize={orderQuery.pageSize}
        total={totalCount}
        onChange={setPage}
        simple={mobile}
        showSizeChanger={!mobile}
        pageSizeOptions={[10, 20, 50, 100]}
        responsive
        showTotal={(total) => `${total} đơn hàng`}
        className="flex justify-end pt-2"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col font-['Be_Vietnam_Pro',sans-serif]">
      <CustomerHeader activeKey="don-hang-cua-toi" onNavigate={onNavigate} />
      <CustomerBreadcrumbBar items={[{ label: 'Đơn hàng của tôi' }]} onNavigate={onNavigate} />
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1">
        <h1 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-extrabold text-stone-900 mb-6">
          Đơn hàng của tôi
        </h1>
        {ordersTab}
      </main>
      <CustomerFooter onNavigate={onNavigate} />

      {/* Modal 1: Multi-Part VNPay Payment Schedule Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-2">
            <CreditCardOutlined className="text-[#8c1524]" />
            <span className="font-bold">
              Lịch Trình Thanh Toán VNPay · #{paymentScheduleOrder?.orderNumber}
            </span>
          </div>
        }
        open={Boolean(paymentScheduleOrder)}
        onClose={() => setPaymentScheduleOrder(null)}
        width={680}
      >
        <Spin spinning={paymentSummaryLoading}>
          {paymentSummary && (
            <div className="space-y-5">
              <Alert
                type="info"
                showIcon
                message="Quy định hạn mức cổng thanh toán VNPay"
                description="Hạn mức tối đa 100.000.000 ₫ cho mỗi lượt giao dịch VNPay. Các khoản thanh toán trên 100M ₫ được tự động chia thành các lượt giao dịch hợp lệ để doanh nghiệp thanh toán thuận tiện."
              />

              <div className="grid grid-cols-3 gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <span className="text-xs text-stone-500 block">Tổng đơn hàng:</span>
                  <b className="text-base text-stone-900">
                    {money(paymentSummary.totalOrderAmount)}
                  </b>
                </div>
                <div>
                  <span className="text-xs text-stone-500 block">Đã thanh toán:</span>
                  <b className="text-base text-emerald-700">
                    {money(paymentSummary.totalPaidAmount)}
                  </b>
                </div>
                <div>
                  <span className="text-xs text-stone-500 block">Còn lại cần nộp:</span>
                  <b className="text-base text-[#8c1524]">
                    {money(paymentSummary.remainingAmount)}
                  </b>
                </div>
              </div>

              {/* Obligations list */}
              <div className="space-y-4">
                <span className="text-sm font-bold text-stone-800 block">
                  Các nghĩa vụ thanh toán:
                </span>
                {paymentSummary.obligations?.map((ob) => (
                  <Card
                    key={ob.id}
                    size="small"
                    title={
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{ob.title}</span>
                        <Tag
                          color={
                            ob.status === 'Paid'
                              ? 'green'
                              : ob.status === 'PartiallyPaid'
                                ? 'orange'
                                : 'gold'
                          }
                        >
                          {ob.status === 'Paid'
                            ? 'Đã hoàn tất'
                            : ob.status === 'PartiallyPaid'
                              ? 'Đã nộp 1 phần'
                              : 'Chưa thanh toán'}
                        </Tag>
                      </div>
                    }
                    className="rounded-xl border-stone-200"
                  >
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-stone-500">
                          Tổng nghĩa vụ: <b>{money(ob.totalAmount)}</b>
                        </span>
                        <span className="text-stone-500">
                          Đã nộp: <b className="text-emerald-700">{money(ob.paidAmount)}</b>
                        </span>
                        <span className="text-stone-500">
                          Còn lại: <b className="text-[#8c1524]">{money(ob.remainingAmount)}</b>
                        </span>
                      </div>

                      {ob.dueAtUtc && (
                        <div className="text-[11px] text-stone-400">
                          Hạn chót thanh toán: {new Date(ob.dueAtUtc).toLocaleString('vi-VN')}
                        </div>
                      )}

                      <Divider style={{ margin: '8px 0' }} />

                      {/* Parts breakdown */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-semibold text-stone-600 block">
                          Chi tiết từng lượt VNPay:
                        </span>
                        {ob.parts?.map((part) => (
                          <div
                            key={part.id}
                            className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200"
                          >
                            <div>
                              <span className="font-semibold text-stone-900 block">
                                Lượt {part.partIndex}/{part.totalParts}: {money(part.amount)}
                              </span>
                              <span className="text-[10px] text-stone-400">
                                {part.status === 'Paid'
                                  ? `Đã thanh toán lúc ${new Date(part.paidAtUtc).toLocaleString('vi-VN')}`
                                  : 'Chờ thanh toán qua VNPay'}
                              </span>
                            </div>

                            {part.status === 'Paid' ? (
                              <Tag color="success" icon={<CheckCircleFilled />}>
                                Đã nộp
                              </Tag>
                            ) : (
                              <Button
                                type="primary"
                                size="small"
                                icon={<CreditCardOutlined />}
                                loading={generatingUrlPartId === part.id}
                                onClick={() => handlePayPartVnPay(paymentScheduleOrder.id, part.id)}
                                style={{
                                  background: '#d48806',
                                  borderColor: '#d48806',
                                  borderRadius: 6,
                                  fontWeight: 600,
                                }}
                              >
                                Thanh toán VNPay ngay
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Spin>
      </Drawer>

      {/* Modal 2: PoD Photo Inspection & Confirm Receipt Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <TruckOutlined className="text-emerald-700" />
            <span className="font-bold">
              Kiểm Tra Biên Bản Giao Hàng PoD &amp; Xác Nhận Nhận Hàng
            </span>
          </div>
        }
        open={Boolean(podModalOrder)}
        onCancel={() => setPodModalOrder(null)}
        footer={[
          <Button key="dispute" danger onClick={() => setDisputeModalOrder(podModalOrder)}>
            Báo cáo vấn đề giao hàng
          </Button>,
          <Button key="cancel" onClick={() => setPodModalOrder(null)}>
            Đóng
          </Button>,
          <Button
            key="confirm"
            type="primary"
            loading={podConfirming}
            onClick={handleConfirmReceipt}
            style={{ background: '#16a34a', borderColor: '#16a34a', fontWeight: 700 }}
          >
            Xác Nhận Đã Nhận Đủ Hàng
          </Button>,
        ]}
        width={680}
      >
        <div className="space-y-4 my-3 text-xs sm:text-sm text-stone-700">
          <Alert
            type="info"
            showIcon
            message="Biên bản bàn giao hàng nguyên lô (SLA 48 giờ kiểm tra)"
            description="Sau khi Quý khách bấm xác nhận, hệ thống sẽ tự động giải phóng khoản tiền ký quỹ cho xưởng. Nếu phát hiện hư hỏng, quý khách có thể gửi khiếu nại trước thời hạn 48 giờ."
          />

          <Descriptions bordered size="small" column={2}>
            <Descriptions.Item label="Mã đơn hàng">#{podModalOrder?.orderNumber}</Descriptions.Item>
            <Descriptions.Item label="Đơn vị giao nhận">Chuyến giao nguyên lô</Descriptions.Item>
            <Descriptions.Item label="Người nhận">
              {podModalOrder?.recipientName} ({podModalOrder?.recipientPhone})
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">{podModalOrder?.deliveryAddress}</Descriptions.Item>
          </Descriptions>

          {/* PoD Photo viewer */}
          <div className="space-y-2">
            <span className="font-bold text-xs text-stone-800 block">
              Ảnh chụp thực tế lúc bàn giao (Proof-of-Delivery):
            </span>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center">
              <Image
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
                alt="Ảnh biên bản bàn giao PoD"
                className="rounded-lg max-h-64 object-contain mx-auto"
              />
              <span className="text-[11px] text-stone-400 block mt-2">
                * Nhấp vào ảnh để phóng to kiểm tra con dấu và chữ ký nhận hàng
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <span className="font-semibold text-xs text-stone-800 block">
              Đánh giá chất lượng bàn giao &amp; đóng gói:
            </span>
            <Rate value={podRating} onChange={setPodRating} />
            <TextArea
              rows={2}
              value={podFeedback}
              onChange={(e) => setPodFeedback(e.target.value)}
              placeholder="Nhận xét chất lượng bánh, thời gian giao hàng, độ hoàn thiện..."
              style={{ borderRadius: 8 }}
            />
          </div>
        </div>
      </Modal>

      {/* Modal 3: Delivery Dispute Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-red-600 font-bold">
            <AlertOutlined />
            <span>Báo Cáo Vấn Đề Giao Hàng &amp; Khiếu Nại Ký Quỹ</span>
          </div>
        }
        open={Boolean(disputeModalOrder)}
        onCancel={() => setDisputeModalOrder(null)}
        confirmLoading={disputeSubmitting}
        onOk={handleReportDispute}
        okText="Gửi Khiếu Nại & Khóa Ký Quỹ"
        okButtonProps={{ danger: true, style: { fontWeight: 700 } }}
        width={560}
      >
        <div className="space-y-3 my-3 text-xs sm:text-sm text-stone-700">
          <Alert
            type="warning"
            showIcon
            message="Khoản thanh toán của đơn hàng sẽ lập tức bị khóa bảo chứng"
            description="Ban Quản Trị sàn sẽ làm việc với xưởng sản xuất để đối soát biên bản và hoàn tiền theo mức độ thiệt hại."
          />

          <div>
            <span className="font-semibold text-xs text-stone-800 block mb-1">
              Lý do khiếu nại:
            </span>
            <Select
              value={disputeReason}
              onChange={setDisputeReason}
              style={{ width: '100%' }}
              options={[
                { value: 'BrokenCakes', label: 'Bánh bị vỡ / móp méo trong quá trình vận chuyển' },
                { value: 'WrongQuantity', label: 'Thiếu số lượng hộp so với hợp đồng' },
                { value: 'DefectivePackaging', label: 'Bao bì in sai màu sắc / logo bị lem mờ' },
                { value: 'LateDelivery', label: 'Giao hàng trễ nghiêm trọng ảnh hưởng kế hoạch' },
                { value: 'Other', label: 'Lý do khác' },
              ]}
            />
          </div>

          <div>
            <span className="font-semibold text-xs text-stone-800 block mb-1">
              Mô tả chi tiết vấn đề (tối thiểu 10 ký tự):
            </span>
            <TextArea
              rows={3}
              value={disputeDescription}
              onChange={(e) => setDisputeDescription(e.target.value)}
              placeholder="Mô tả cụ thể số lượng hộp bị ảnh hưởng, tình trạng thực tế..."
              style={{ borderRadius: 8 }}
            />
          </div>
        </div>
      </Modal>

      {/* Modal 4: Proposal Response Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 font-bold text-amber-800">
            <CalendarOutlined />
            <span>Duyệt Đề Xuất Ngày Giao Hàng Mới</span>
          </div>
        }
        open={Boolean(proposalModalOrder)}
        onCancel={() => setProposalModalOrder(null)}
        footer={[
          <Button
            key="reject"
            danger
            loading={proposalResponding}
            onClick={() => handleRespondProposal(false)}
          >
            Từ Chối Ngày Giao Này
          </Button>,
          <Button
            key="approve"
            type="primary"
            loading={proposalResponding}
            onClick={() => handleRespondProposal(true)}
            style={{ background: '#d48806', borderColor: '#d48806', fontWeight: 700 }}
          >
            Chấp Nhận Ngày Giao Mới
          </Button>,
        ]}
      >
        <div className="space-y-3 my-3 text-xs sm:text-sm text-stone-700">
          <p>
            Nhà cung cấp đề xuất điều chỉnh ngày bàn giao hàng cho đơn{' '}
            <b>#{proposalModalOrder?.orderNumber}</b>:
          </p>
          <Descriptions bordered size="small" column={1}>
            <Descriptions.Item label="Ngày khách mong muốn">
              {proposalModalOrder?.deliveryDateExpected}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày xưởng đề xuất">
              <b className="text-amber-800">{proposalModalOrder?.proposedDeliveryDate}</b>
            </Descriptions.Item>
            <Descriptions.Item label="Lý do từ xưởng">
              {proposalModalOrder?.deliveryProposalReason || 'Do lịch xếp lò và in ấn bao bì'}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Modal>

      {/* Modal 5: Request Cancellation Modal */}
      <Modal
        title="Yêu cầu hủy đơn hàng"
        open={Boolean(cancelModalOrder)}
        onCancel={() => setCancelModalOrder(null)}
        confirmLoading={cancelSubmitting}
        onOk={handleRequestCancellation}
        okText="Gửi yêu cầu hủy"
        okButtonProps={{ danger: true }}
      >
        <div className="space-y-3 my-3 text-xs sm:text-sm text-stone-700">
          <p>
            Nhập lý do Quý khách muốn hủy đơn hàng <b>#{cancelModalOrder?.orderNumber}</b>:
          </p>
          <TextArea
            rows={3}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Lý do hủy đơn..."
          />
        </div>
      </Modal>

      {/* Modal 6: Mockup Review Modal */}
      <Modal
        title={
          <span className="font-['Playfair_Display',serif] font-bold text-lg text-stone-900">
            Duyệt Thiết Kế Mockup Bao Bì · #{reviewingOrder?.orderNumber || ''}
          </span>
        }
        open={Boolean(reviewingOrder)}
        onCancel={() => setReviewingOrder(null)}
        footer={null}
        width={780}
        style={{ borderRadius: 16 }}
      >
        <Spin spinning={reviewLoading}>
          {packaging && (
            <div className="space-y-4 pt-2">
              <Descriptions bordered column={2} size="small">
                <Descriptions.Item label="Doanh nghiệp">{packaging.companyName}</Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  <Tag color="blue">{packaging.status}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Quy cách hộp">
                  {packaging.packagingType}
                </Descriptions.Item>
                <Descriptions.Item label="Thông điệp">
                  {packaging.specialMessage || '—'}
                </Descriptions.Item>
              </Descriptions>

              {packaging.revisions && packaging.revisions.length > 0 ? (
                <div className="space-y-3 mt-4">
                  <span className="text-xs font-bold text-stone-700 block">
                    Các phiên bản mockup từ xưởng:
                  </span>
                  {packaging.revisions.map((revision) => (
                    <Card
                      key={revision.id}
                      size="small"
                      title={
                        <span className="font-bold text-xs">
                          Phiên bản thiết kế #{revision.revisionNumber}
                        </span>
                      }
                      extra={<Tag color="purple">{revision.status}</Tag>}
                      className="rounded-xl border-stone-200"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <a
                            href={revision.mockupUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-bold text-[#8c1524] underline flex items-center gap-1"
                          >
                            <PictureOutlined /> Mở tệp thiết kế độ phân giải cao
                          </a>
                          <span className="text-xs font-semibold text-stone-800">
                            Phí gia công thiết kế: {money(revision.designFee)}
                          </span>
                        </div>

                        {revision.supplierNotes && (
                          <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700">
                            <b>Ghi chú từ xưởng:</b> {revision.supplierNotes}
                          </div>
                        )}

                        {revision.status === 'DesignReview' && (
                          <div className="space-y-2.5 pt-2 border-t border-stone-100">
                            <span className="text-xs text-stone-600 block">
                              Nếu cần chỉnh sửa, vui lòng nhập nhận xét chi tiết để nghệ nhân hoàn
                              thiện:
                            </span>
                            <TextArea
                              value={reviewNotes}
                              onChange={(event) => setReviewNotes(event.target.value)}
                              placeholder="Mô tả cụ thể vị trí cần căn chỉnh, màu sắc ép kim, hoa văn nắp hộp..."
                              rows={3}
                              style={{ borderRadius: 8 }}
                            />
                            <div className="flex items-center justify-end gap-2 pt-1">
                              <Button
                                onClick={() => reviewRevision('RequestRevision')}
                                style={{ borderRadius: 8 }}
                              >
                                Yêu cầu chỉnh sửa lại
                              </Button>
                              <Button
                                type="primary"
                                icon={<CheckCircleOutlined />}
                                onClick={() => reviewRevision('Approve')}
                                style={{
                                  background: '#8c1524',
                                  borderColor: '#8c1524',
                                  borderRadius: 8,
                                }}
                              >
                                Duyệt và tiến hành sản xuất
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-stone-500">
                  Xưởng đang tiến hành phối cảnh 3D. Bản thiết kế đầu tiên sẽ được tải lên trong
                  24h.
                </div>
              )}
            </div>
          )}
        </Spin>
      </Modal>
    </div>
  );
}
