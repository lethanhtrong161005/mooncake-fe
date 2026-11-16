import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Slider,
  Space,
  Switch,
  Table,
  Tag,
  Tooltip,
  Typography,
  Upload,
  message,
} from 'antd';
import {
  BankOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CrownOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  MoreOutlined,
  PictureOutlined,
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
  TruckOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { ORDER_STATUS_META, orderStatusOptions, packagingStatusLabel } from '../../constants/orderStatus';
import { disputeStatusLabel, disputeIssueTypeLabel } from '../../constants/disputeLabels';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import OrderDetailDrawer from '../../components/orders/OrderDetailDrawer';
import PackagingImageUpload from '../../components/packaging/PackagingImageUpload';
import customPackagingService from '../../services/customPackagingService';
import deliveryService from '../../services/deliveryService';
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

const STATUS_META = ORDER_STATUS_META;
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
  const [podFileList, setPodFileList] = useState([]);
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
  const [payoutRequestForm] = Form.useForm();
  const [payoutRequestLoadingAccount, setPayoutRequestLoadingAccount] = useState(false);
  const [payoutRequestSubmitting, setPayoutRequestSubmitting] = useState(false);
  const [detailOrder, setDetailOrder] = useState(null);

  // Supplier Delivery Dispute Rebuttal (D27)
  const [rebuttalModalOpen, setRebuttalModalOpen] = useState(false);
  const [rebuttalOrder, setRebuttalOrder] = useState(null);
  const [rebuttalFileList, setRebuttalFileList] = useState([]);
  const [rebuttalSubmitting, setRebuttalSubmitting] = useState(false);
  const [rebuttalForm] = Form.useForm();

  // Supplier Respond Cancellation Request (D24)
  const [respondCancelModalOpen, setRespondCancelModalOpen] = useState(false);
  const [respondCancelOrder, setRespondCancelOrder] = useState(null);
  const [respondCancelApprove, setRespondCancelApprove] = useState(true);
  const [respondCancelNotes, setRespondCancelNotes] = useState('');
  const [respondCancelSubmitting, setRespondCancelSubmitting] = useState(false);

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
    setPodFileList([]);
    setPodSignatureName(order.recipientName || '');
    setPodNotes('');
    setPodUploadModalOpen(true);
  };

  const handlePodUploadRequest = async ({ file, onSuccess, onError }) => {
    if (!file.type?.startsWith('image/')) {
      const err = new Error('Vui lòng chỉ chọn tệp hình ảnh (JPG, PNG, WEBP).');
      message.error(err.message);
      onError?.(err);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      const err = new Error('Dung lượng mỗi ảnh PoD không được vượt quá 10MB.');
      message.error(err.message);
      onError?.(err);
      return;
    }

    try {
      const uploaded = await deliveryService.uploadProofImage(file);
      const imageUrl = uploaded?.url;
      if (!imageUrl) {
        throw new Error('Không nhận được đường dẫn ảnh sau khi tải lên.');
      }
      onSuccess?.({ url: imageUrl, publicId: uploaded?.publicId }, file);
    } catch (error) {
      message.error(errorMessage(error));
      onError?.(error);
    }
  };

  const collectPodUrls = () => {
    const uploadedUrls = podFileList
      .filter((item) => item.status === 'done')
      .map((item) => item.url || item.response?.url)
      .filter(Boolean);

    return [...new Set(uploadedUrls)];
  };

  const submitPodProof = async () => {
    if (podFileList.some((item) => item.status === 'uploading')) {
      message.warning('Vui lòng đợi các ảnh đang tải lên hoàn tất.');
      return;
    }

    const photoUrls = collectPodUrls();
    if (photoUrls.length === 0) {
      message.warning('Vui lòng tải lên ít nhất 1 ảnh chụp biên bản bàn giao PoD.');
      return;
    }

    setPodSubmitting(true);
    try {
      let deliveryId = podOrder.latestDelivery?.deliveryId;
      if (!deliveryId) {
        const existingDeliveries = await deliveryService.getByOrder(podOrder.id).catch(() => []);
        if (Array.isArray(existingDeliveries) && existingDeliveries[0]?.id) {
          deliveryId = existingDeliveries[0].id;
        }
      }

      if (!deliveryId) {
        const todayIso = new Date().toISOString().slice(0, 10);
        const safeScheduledDate = podOrder.deliveryDateExpected && podOrder.deliveryDateExpected >= todayIso
          ? podOrder.deliveryDateExpected
          : todayIso;

        const createdDelivery = await deliveryService.create({
          orderId: podOrder.id,
          deliveryType: 'SelfArranged',
          scheduledDate: safeScheduledDate,
          fromAddress: 'Kho xưởng sản xuất bánh',
          toAddress: podOrder.deliveryAddress || 'Kho nhận khách hàng',
          recipientName: podOrder.recipientName || 'Đại diện nhận hàng',
          recipientPhone: podOrder.recipientPhone || '0900000000',
          trackingCode: `SHIP-${podOrder.orderNumber}`,
          notes: 'Chuyến giao nguyên lô',
        });
        deliveryId = createdDelivery?.id;
      }

      const takenBy = podSignatureName.trim() || podOrder.recipientName || 'Đại diện nhận hàng';
      const notes = podNotes.trim() || 'Đã bàn giao đơn hàng kèm biên bản PoD';

      for (const url of photoUrls) {
        await deliveryService.submitProof(deliveryId, {
          proofType: 'Delivery',
          photoUrl: url,
          takenBy,
          notes,
        });
      }

      message.success(`Đã nộp ${photoUrls.length} ảnh biên bản bàn giao PoD. Khách hàng có 48h để đối soát.`);
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
      const revInfo = customPackagingService.calculateMockupRevisionInfo(packaging);
      const payload = {
        ...values,
        revisionSurcharge: revInfo.isSurchargeAllowed ? Number(values.revisionSurcharge || 0) : 0,
      };
      await customPackagingService.submitRevision(selectedOrder.id, payload);
      message.success('Đã gửi bản vẽ mockup 3D để khách hàng duyệt.');
      setPackaging(await customPackagingService.get(selectedOrder.id));
      revisionForm.resetFields();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setPackagingLoading(false);
    }
  };

  const handleOpenRebuttalModal = (order) => {
    setRebuttalOrder(order);
    setRebuttalFileList([]);
    rebuttalForm.resetFields();
    setRebuttalModalOpen(true);
  };

  const handleRebuttalUploadRequest = async ({ file, onSuccess, onError }) => {
    if (!file.type?.startsWith('image/')) {
      const err = new Error('Vui lòng chỉ chọn tệp hình ảnh (JPG, PNG, WEBP).');
      message.error(err.message);
      onError?.(err);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      const err = new Error('Dung lượng ảnh bằng chứng không được vượt quá 10MB.');
      message.error(err.message);
      onError?.(err);
      return;
    }

    try {
      const uploaded = await deliveryService.uploadProofImage(file);
      const imageUrl = uploaded?.url;
      if (!imageUrl) {
        throw new Error('Không nhận được đường dẫn ảnh sau khi tải lên.');
      }
      onSuccess?.({ url: imageUrl, publicId: uploaded?.publicId }, file);
    } catch (error) {
      message.error(errorMessage(error));
      onError?.(error);
    }
  };

  const submitRebuttal = async (values) => {
    if (rebuttalFileList.some((item) => item.status === 'uploading')) {
      message.warning('Vui lòng đợi các ảnh bằng chứng đang tải lên hoàn tất.');
      return;
    }

    const disputeId = rebuttalOrder?.activeDispute?.id;
    if (!disputeId) {
      message.error('Không tìm thấy thông tin khiếu nại của đơn hàng.');
      return;
    }

    const photoUrls = rebuttalFileList
      .filter((item) => item.status === 'done')
      .map((item) => item.url || item.response?.url)
      .filter(Boolean);

    setRebuttalSubmitting(true);
    try {
      await orderService.submitDeliveryDisputeRebuttal(rebuttalOrder.id, disputeId, {
        notes: values.notes.trim(),
        evidenceUrls: photoUrls.slice(0, 10),
      });
      message.success('Đã nộp phản biện khiếu nại thành công đến Ban Quản Trị.');
      setRebuttalModalOpen(false);
      rebuttalForm.resetFields();
      setRebuttalFileList([]);
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setRebuttalSubmitting(false);
    }
  };

  const handleOpenRespondCancelModal = (order) => {
    setRespondCancelOrder(order);
    setRespondCancelApprove(true);
    setRespondCancelNotes('');
    setRespondCancelModalOpen(true);
  };

  const submitRespondCancel = async () => {
    const cancelReq = respondCancelOrder?.pendingCancellationRequest;
    if (!cancelReq?.id) {
      message.error('Không tìm thấy yêu cầu hủy của đơn hàng.');
      return;
    }

    setRespondCancelSubmitting(true);
    try {
      await orderService.respondCancellationRequest(respondCancelOrder.id, cancelReq.id, {
        approve: respondCancelApprove,
        notes: respondCancelNotes.trim(),
      });
      message.success(
        respondCancelApprove
          ? 'Đã đồng ý yêu cầu hủy đơn hàng. Hồ sơ đã chuyển đến Admin xử lý hoàn tiền.'
          : 'Đã từ chối yêu cầu hủy đơn hàng.'
      );
      setRespondCancelModalOpen(false);
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setRespondCancelSubmitting(false);
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

  const openPayoutRequestModal = async (order) => {
    setSelectedOrder(order);
    setPayoutRequestModalOpen(true);
    payoutRequestForm.resetFields();
    payoutRequestForm.setFieldsValue({
      notes: 'Yêu cầu quyết toán số dư khả dụng đơn hàng',
    });
    setPayoutRequestLoadingAccount(true);
    try {
      const account = await orderService.getMyPayoutAccount();
      if (account) {
        payoutRequestForm.setFieldsValue({
          bankCode: account.bankCode || '',
          bankName: account.bankName || '',
          accountNumber: account.accountNumber || '',
          accountHolderName: account.accountHolderName || '',
          branchName: account.branchName || '',
        });
      }
    } catch {
      // Allow manual entry even when no payout account was configured beforehand
    } finally {
      setPayoutRequestLoadingAccount(false);
    }
  };

  const submitPayoutRequest = async () => {
    setPayoutRequestSubmitting(true);
    try {
      const values = await payoutRequestForm.validateFields();
      await orderService.createPayoutRequest(selectedOrder?.id, {
        bankCode: values.bankCode?.trim() || undefined,
        bankName: values.bankName.trim(),
        accountNumber: values.accountNumber.trim(),
        accountHolderName: values.accountHolderName.trim(),
        branchName: values.branchName?.trim() || undefined,
        notes: values.notes?.trim() || 'Yêu cầu quyết toán số dư khả dụng đơn hàng',
      });
      message.success('Đã gửi yêu cầu giải ngân thành công. Admin sẽ chuyển khoản và đính kèm chứng từ.');
      setPayoutRequestModalOpen(false);
      await loadOrders();
    } catch (error) {
      if (!error?.errorFields) message.error(errorMessage(error));
    } finally {
      setPayoutRequestSubmitting(false);
    }
  };

  const columns = [
    {
      title: 'Đơn hàng & SLA',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      width: 150,
      render: (value, order) => {
        const sla = order.status === 'Pending'
          ? { date: order.responseDeadlineAtUtc || order.responseDeadlineAt, label: 'SLA phản hồi' }
          : order.status === 'AwaitingCustomerDeliveryApproval'
            ? { date: order.deliveryApprovalDeadlineAtUtc || order.deliveryApprovalDeadlineAt, label: 'Chờ khách duyệt' }
            : order.activeDispute?.status === 'AwaitingSupplierRebuttal'
              ? { date: order.activeDispute.rebuttalDeadlineAtUtc || order.activeDispute.rebuttalDeadlineAt, label: 'Hạn phản biện 48h' }
              : null;

        return (
          <div className="max-w-[160px] space-y-1">
            <Tooltip title={`#${value}`}>
              <div className="truncate font-mono text-[13px] font-semibold text-[#7d1322] leading-snug cursor-default">
                #{value}
              </div>
            </Tooltip>
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
      width: 175,
      render: (_, order) => {
        const companyOrName = order.customPackaging?.companyName || order.recipientName || 'Khách hàng B2B';

        return (
          <div className="max-w-[160px] space-y-0.5">
            <Tooltip title={companyOrName}>
              <div className="truncate font-medium text-sm text-[#231a18] cursor-default">
                {companyOrName}
              </div>
            </Tooltip>
            <div className="text-xs tabular-nums text-[#6c625e]">{order.recipientPhone}</div>
            {order.deliveryAddress && (
              <Tooltip title={order.deliveryAddress}>
                <div className="truncate text-[11px] text-[#8a7f7a] cursor-default">
                  {order.deliveryAddress}
                </div>
              </Tooltip>
            )}
            {order.pendingCancellationRequest && (
              <Tag color="volcano" className="m-0 mt-1 text-[10px] !whitespace-normal leading-tight">
                Đề xuất hoàn: {money(order.pendingCancellationRequest.suggestedRefundAmount ?? order.pendingCancellationRequest.proposedRefundAmount)}
              </Tag>
            )}
          </div>
        );
      },
    },
    {
      title: 'Hạng mục & bao bì',
      key: 'items',
      width: 235,
      render: (_, order) => {
        const items = order.items || [];
        const firstItem = items[0];
        const extraCount = Math.max(0, items.length - 1);
        const totalUnits = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
        const packagingStatusText = order.customPackaging
          ? packagingStatusLabel(order.customPackaging.status)
          : null;

        const hoverContent = (
          <div className="max-w-[320px] space-y-1.5 text-xs">
            <div className="border-b border-white/15 pb-1 font-semibold text-amber-200">
              Chi tiết đơn ({items.length} hạng mục · {totalUnits.toLocaleString('vi-VN')} hộp)
            </div>
            <div className="space-y-1">
              {items.map((item) => (
                <div key={item.variantId} className="flex items-start justify-between gap-3">
                  <span className="leading-snug text-stone-100">
                    {item.productName || 'Bánh Trung Thu'} ({item.variantName || 'Chuẩn'})
                  </span>
                  <span className="shrink-0 font-semibold tabular-nums text-amber-300">
                    ×{item.quantity}
                  </span>
                </div>
              ))}
            </div>
            {order.customPackaging && (
              <div className="border-t border-white/15 pt-1 text-[11px] text-stone-300">
                Bao bì: {order.customPackaging.packagingType || 'Thiết kế riêng'} · {packagingStatusText}
              </div>
            )}
          </div>
        );

        return (
          <Tooltip title={hoverContent} color="#231a18" placement="topLeft">
            <div className="max-w-[198px] space-y-1.5 text-xs text-[#231a18] cursor-help">
              {firstItem ? (
                <div className="flex items-center justify-between gap-1.5 leading-snug">
                  <span className="min-w-0 flex-1 truncate font-medium text-[#231a18]">
                    {firstItem.productName || 'Bánh Trung Thu'}
                    {firstItem.variantName ? ` · ${firstItem.variantName}` : ''}
                  </span>
                  <span className="shrink-0 font-semibold tabular-nums text-[#7d1322]">
                    ×{firstItem.quantity}
                  </span>
                </div>
              ) : (
                <span className="text-[#8a7f7a]">Chưa có hạng mục</span>
              )}
              <div className="flex flex-wrap items-center gap-1">
                {extraCount > 0 && (
                  <Tag className="m-0 border-[#e4dcd3] bg-[#faf7f2] text-[11px] tabular-nums text-[#6c625e]">
                    +{extraCount} dòng ({totalUnits} hộp)
                  </Tag>
                )}
                {order.customPackaging ? (
                  <Tag color="geekblue" icon={<CrownOutlined />} className="m-0 text-[11px]">
                    Bao bì: {packagingStatusText}
                  </Tag>
                ) : (
                  <Tag className="m-0 text-[11px] text-[#6c625e]">Bao bì tiêu chuẩn</Tag>
                )}
              </div>
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Ngày giao',
      key: 'deliveryDate',
      width: 120,
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
      width: 150,
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
      width: 150,
      render: (value, order) => {
        if (order.activeDispute?.status === 'AwaitingSupplierRebuttal') {
          return (
            <div className="space-y-1">
              <Tag color="warning" className="m-0 whitespace-nowrap">Chờ xưởng phản biện</Tag>
              {order.activeDispute.rebuttalDeadlineAtUtc && (
                <div>
                  <SlaCountdownBadge deadline={order.activeDispute.rebuttalDeadlineAtUtc} label="Hạn" />
                </div>
              )}
            </div>
          );
        }
        const meta = STATUS_META[value] || { label: value, color: 'default' };
        return <Tag color={meta.color} className="m-0 whitespace-nowrap">{meta.label}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'actions',
      align: 'right',
      width: 250,
      fixed: 'right',
      render: (_, order) => {
        const allowedActions = order.allowedActions || [];
        const moreItems = [];

        if (order.status === 'Pending') {
          moreItems.push({
            key: 'proposeDate',
            icon: <CalendarOutlined />,
            label: 'Đề xuất ngày',
            onClick: () => handleOpenProposeModal(order),
          });
          moreItems.push({
            key: 'reject',
            label: 'Từ chối',
            danger: true,
            onClick: () => rejectOrder(order),
          });
        }

        if (order.customPackaging) {
          moreItems.push({
            key: 'packaging',
            icon: <PictureOutlined />,
            label: 'Bao bì',
            onClick: () => openPackaging(order),
          });
        }

        if (allowedActions.includes('RequestSimulatedPayout')) {
          moreItems.push({
            key: 'payout',
            icon: <DollarCircleOutlined />,
            label: 'Giải ngân',
            onClick: () => openPayoutRequestModal(order),
          });
        }

        if (allowedActions.includes('RespondCancellationRequest')) {
          moreItems.push({
            key: 'respondCancel',
            label: 'Phản hồi hủy',
            onClick: () => handleOpenRespondCancelModal(order),
          });
        }

        let primaryAction = null;
        if (order.status === 'Pending') {
          primaryAction = (
            <Button
              type="primary"
              size="small"
              onClick={() => runAction(orderService.confirm, order, 'Đã xác nhận đơn hàng và tạo lịch thu cọc.')}
              style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
            >
              Xác nhận đơn
            </Button>
          );
        } else if (allowedActions.includes('StartProduction')) {
          primaryAction = (
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
              Sản xuất
            </Button>
          );
        } else if (allowedActions.includes('MarkShipped')) {
          primaryAction = (
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
          );
        } else if (order.status === 'Shipped') {
          primaryAction = (
            <Button
              type="primary"
              size="small"
              icon={<UploadOutlined />}
              onClick={() => handleOpenPodModal(order)}
              style={{ backgroundColor: '#2d5a43', borderColor: '#2d5a43' }}
            >
              {(order.latestDelivery?.proofCount || 0) > 0
                ? `Thêm ảnh PoD (${order.latestDelivery.proofCount})`
                : 'Tải ảnh PoD'}
            </Button>
          );
        } else if (allowedActions.includes('SubmitDeliveryDisputeRebuttal')) {
          primaryAction = (
            <Button
              type="primary"
              size="small"
              danger
              onClick={() => handleOpenRebuttalModal(order)}
            >
              Phản biện
            </Button>
          );
        }

        return (
          <Space size="small">
            <Button
              size="small"
              icon={<FileTextOutlined />}
              onClick={() => setDetailOrder(order)}
            >
              Chi tiết
            </Button>
            {primaryAction}
            {moreItems.length > 0 && (
              <Dropdown menu={{ items: moreItems }} placement="bottomRight">
                <Button size="small" icon={<MoreOutlined />} />
              </Dropdown>
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
      title="Đơn hàng doanh nghiệp"
      subtitle="Xác nhận đơn, duyệt mockup bao bì, theo dõi giao hàng và đối soát ký quỹ."
      extra={
        <Space wrap>
          <Button icon={<ReloadOutlined />} onClick={loadOrders} loading={loading}>
            Tải lại
          </Button>
          <Button icon={<SettingOutlined />} onClick={openPolicyDrawer}>
            Chính sách &amp; Biểu phí
          </Button>
          <Button icon={<BankOutlined />} onClick={openPayoutAccountDrawer}>
            Tài khoản nhận giải ngân
          </Button>
        </Space>
      }
    >
      <section
        aria-label="Danh sách đơn hàng B2B"
        className="rounded-2xl border border-[#e4dcd3] bg-white p-4 sm:p-6"
      >
        {(() => {
          const awaitingDisputes = orders.filter(
            (o) => o.activeDispute?.status === 'AwaitingSupplierRebuttal',
          );
          if (awaitingDisputes.length === 0) return null;

          return (
            <Alert
              type="warning"
              showIcon
              className="mb-4 rounded-xl border border-amber-300 bg-amber-50/90"
              message={
                <span className="font-semibold text-amber-900">
                  Có {awaitingDisputes.length} khiếu nại giao hàng cần phản biện
                </span>
              }
              description={
                <div className="mt-2 space-y-2.5">
                  {awaitingDisputes.map((ord) => {
                    const disp = ord.activeDispute;
                    const deadline = disp?.rebuttalDeadlineAtUtc || disp?.rebuttalDeadlineAt;
                    const canRebut = ord.allowedActions?.includes('SubmitDeliveryDisputeRebuttal');

                    return (
                      <div
                        key={ord.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-200 bg-white p-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono font-bold text-[#7d1322]">#{ord.orderNumber}</span>
                            <Tag color="volcano" className="m-0 font-semibold">{disputeStatusLabel('AwaitingSupplierRebuttal')}</Tag>
                            {deadline && (
                              <SlaCountdownBadge deadline={deadline} label="Hạn phản biện 48h" />
                            )}
                          </div>
                          <div className="text-stone-700">
                            <span className="font-semibold text-stone-900">Vấn đề:</span>{' '}
                            <b>{disputeIssueTypeLabel(disp?.issueType)}</b> — {disp?.description}
                          </div>
                          {disp?.evidenceUrls && disp.evidenceUrls.length > 0 && (
                            <div className="flex items-center gap-1.5 pt-1">
                              <span className="text-[11px] text-stone-500">Ảnh khách gửi:</span>
                              <Image.PreviewGroup>
                                <div className="flex gap-1.5">
                                  {disp.evidenceUrls.map((url, idx) => (
                                    <Image
                                      key={idx}
                                      src={url}
                                      alt={`Ảnh khách ${idx + 1}`}
                                      width={36}
                                      height={36}
                                      className="rounded object-cover border border-amber-200"
                                    />
                                  ))}
                                </div>
                              </Image.PreviewGroup>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {canRebut && (
                            <Button
                              type="primary"
                              danger
                              size="small"
                              onClick={() => handleOpenRebuttalModal(ord)}
                            >
                              Nộp phản biện ngay
                            </Button>
                          )}
                          <Button size="small" onClick={() => setDetailOrder(ord)}>
                            Chi tiết đơn
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              }
            />
          );
        })()}

        <div className="rounded-xl border border-[#ebe3da] bg-[#faf7f2] p-3.5">
          <FilterBar
            search={search}
            onSearchChange={setSearch}
            status={orderQuery.status}
            onStatusChange={setStatus}
            onReset={resetOrders}
            placeholder="Tìm mã đơn hoặc người nhận"
            statusOptions={orderStatusOptions()}
          />
        </div>

        <div className="mt-4">
          <Table
            rowKey="id"
            loading={loading}
            columns={columns}
            dataSource={orders}
            size="middle"
            scroll={{ x: 1250 }}
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
        okText="Gửi đề xuất"
        cancelText="Hủy"
        okButtonProps={{ style: { backgroundColor: '#8c1524', borderColor: '#8c1524' } }}
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
            <span>Tải ảnh biên bản giao hàng (PoD) · #{podOrder?.orderNumber}</span>
          </div>
        }
        open={podUploadModalOpen}
        onCancel={() => setPodUploadModalOpen(false)}
        confirmLoading={podSubmitting}
        onOk={submitPodProof}
        okText="Nộp bằng chứng PoD"
        cancelText="Hủy"
        okButtonProps={{ style: { backgroundColor: '#2d5a43', borderColor: '#2d5a43' } }}
        width={660}
        style={{ maxWidth: 'calc(100vw - 24px)' }}
        destroyOnHidden
      >
        <div className="my-3 space-y-4 text-xs sm:text-sm text-[#231a18]">
          <Alert
            type="info"
            showIcon
            title="Chứng từ hoàn tất giao nhận"
            description="Tải lên nhiều ảnh thực tế khi bàn giao (thùng hàng tại kho khách, biên bản ký nhận, con dấu...) làm căn cứ đối soát và mở khóa thanh toán."
          />

          {(podOrder?.latestDelivery?.proofs?.length || 0) > 0 && (
            <div className="rounded-xl border border-[#e4dcd3] bg-[#faf7f2] p-3">
              <div className="mb-2 text-xs font-medium text-[#231a18]">
                Ảnh PoD đã nộp trước đó ({podOrder.latestDelivery.proofs.length} ảnh):
              </div>
              <Image.PreviewGroup>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {podOrder.latestDelivery.proofs.map((proof, idx) => (
                    <Image
                      key={proof.id || idx}
                      src={proof.photoUrl}
                      alt={`PoD đã nộp ${idx + 1}`}
                      className="h-20 w-full rounded-lg object-cover border border-[#e4dcd3]"
                    />
                  ))}
                </div>
              </Image.PreviewGroup>
            </div>
          )}

          <div>
            <span className="mb-1.5 block text-xs font-medium text-[#231a18]">
              Ảnh biên bản &amp; kiện hàng bàn giao (chọn nhiều ảnh)
            </span>
            <Upload
              multiple
              accept="image/*"
              listType="picture-card"
              fileList={podFileList}
              customRequest={handlePodUploadRequest}
              onChange={({ fileList }) => setPodFileList(fileList)}
            >
              <div className="flex flex-col items-center justify-center text-xs text-[#6c625e]">
                <PlusOutlined className="text-base text-[#2d5a43]" />
                <span className="mt-1">Tải ảnh lên</span>
              </div>
            </Upload>
          </div>

          <div>
            <span className="mb-1 block text-xs font-medium text-[#231a18]">
              Họ tên người ký nhận
            </span>
            <Input
              size="large"
              value={podSignatureName}
              onChange={(e) => setPodSignatureName(e.target.value)}
              placeholder="Ví dụ: Nguyễn Văn A - Thủ kho nhận hàng"
            />
          </div>

          <div>
            <span className="mb-1 block text-xs font-medium text-[#231a18]">
              Ghi chú bàn giao
            </span>
            <TextArea
              rows={2}
              value={podNotes}
              onChange={(e) => setPodNotes(e.target.value)}
              placeholder="Mô tả tình trạng kiện hàng, số lượng bàn giao tại kho khách..."
            />
          </div>
        </div>
      </Modal>

      <Drawer
        title={
          <span className="font-serif text-lg font-semibold text-[#231a18]">
            Chính sách đơn hàng &amp; biểu phí vận chuyển xưởng
          </span>
        }
        open={policyDrawerOpen}
        onClose={() => setPolicyDrawerOpen(false)}
        width={mobile ? '100%' : 560}
        styles={{ wrapper: { maxWidth: '100vw' } }}
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
            <Col xs={24} sm={12}>
              <Form.Item
                name="minLeadTimeDays"
                label={<span className="text-xs font-medium">Thời gian chuẩn bị tối thiểu (ngày)</span>}
                rules={[{ required: true }]}
              >
                <InputNumber min={1} max={30} className="w-full" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
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
            label={<span className="text-xs font-semibold">TP.HCM nội thành (Q1, 3, 5, 10, Phú Nhuận...)</span>}
            rules={[{ required: true }]}
          >
            <InputNumber min={0} step={10000} className="w-full" />
          </Form.Item>

          <Form.Item
            name="rateHcmOuter"
            label={<span className="text-xs font-semibold">TP.HCM ngoại thành (Q7, 2, 9, Thủ Đức, Bình Tân, Q12...)</span>}
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
            style={{ backgroundColor: '#8c1524', borderColor: '#8c1524' }}
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
        width={mobile ? '100%' : 480}
        styles={{ wrapper: { maxWidth: '100vw' } }}
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
            style={{ backgroundColor: '#8c1524', borderColor: '#8c1524' }}
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
        style={{ maxWidth: 'calc(100vw - 24px)' }}
        loading={packagingLoading}
        destroyOnHidden
      >
        {!packaging ? (
          <Empty description="Đơn hàng không yêu cầu bao bì riêng." />
        ) : (
          <div className="space-y-5 pt-2">
            <Descriptions bordered column={{ xs: 1, sm: 2 }} size="small">
              <Descriptions.Item label="Doanh nghiệp">{packaging.companyName}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color="blue">{packagingStatusLabel(packaging.status)}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Quy cách">{packaging.packagingType}</Descriptions.Item>
              <Descriptions.Item label="Logo">
                {packaging.companyLogoUrl ? (
                  <div className="flex items-center gap-2.5">
                    <div className="overflow-hidden rounded-lg border border-stone-200 bg-white p-1">
                      <Image
                        src={packaging.companyLogoUrl}
                        alt={`Logo ${packaging.companyName || 'doanh nghiệp'}`}
                        width={64}
                        height={64}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <span className="text-xs text-stone-500">Nhấp ảnh để phóng to</span>
                  </div>
                ) : (
                  'Chưa tải lên'
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Thông điệp" span={{ xs: 1, sm: 2 }}>
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
                  <Tag>{packagingStatusLabel(revision.status)}</Tag>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  {revision.mockupUrl ? (
                    <div className="overflow-hidden rounded-lg border border-stone-200 bg-white p-1">
                      <Image
                        src={revision.mockupUrl}
                        alt={`Mockup phiên bản ${revision.revisionNumber}`}
                        width={120}
                        height={80}
                        style={{ objectFit: 'cover', borderRadius: 6 }}
                      />
                    </div>
                  ) : (
                    <span className="text-xs text-stone-400">Chưa có ảnh mockup</span>
                  )}
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

            {['Pending', 'DesignReview', 'RevisionRequested'].includes(packaging.status) && (() => {
              const revInfo = customPackagingService.calculateMockupRevisionInfo(packaging);
              return (
                <div className="rounded-xl border border-[#e4dcd3] bg-white p-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h4 className="m-0 font-medium text-[#231a18]">Gửi phiên bản mockup 3D mới</h4>
                    <Tag color={revInfo.isSurchargeAllowed ? 'volcano' : 'gold'}>
                      {revInfo.displayText}
                    </Tag>
                  </div>
                  <Form form={revisionForm} layout="vertical" onFinish={submitRevision}>
                    <Form.Item
                      name="mockupUrl"
                      label="Ảnh thiết kế mockup 3D/2D"
                      rules={[{ required: true, message: 'Vui lòng tải lên ảnh thiết kế mockup.' }]}
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
                      label="Phí thiết kế phát sinh (nếu có)"
                      initialValue={0}
                      rules={[{ required: true }]}
                    >
                      <InputNumber min={0} max={100000000} className="w-full" />
                    </Form.Item>
                    <Form.Item
                      name="revisionSurcharge"
                      label="Phụ phí sửa"
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
                        className="w-full"
                        placeholder={!revInfo.isSurchargeAllowed ? 'Chỉ bật khi revision #≥5' : 'Nhập phụ phí sửa'}
                      />
                    </Form.Item>
                    <Form.Item name="supplierNotes" label="Ghi chú cho khách hàng">
                      <TextArea rows={3} maxLength={2000} showCount placeholder="Mô tả kỹ thuật ép kim, phối cảnh..." />
                    </Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={packagingLoading}
                      style={{ backgroundColor: '#8c1524', borderColor: '#8c1524' }}
                    >
                      Gửi mockup cho khách duyệt
                    </Button>
                  </Form>
                </div>
              );
            })()}
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
        width={560}
        destroyOnHidden
      >
        <div className="my-3 space-y-3 text-xs sm:text-sm text-[#231a18]">
          <p className="text-[#6c625e]">
            Đơn hàng <strong className="text-[#231a18]">#{selectedOrder?.orderNumber}</strong> đã hoàn tất đối soát.
            Nhập thông tin tài khoản ngân hàng nhận tiền để Admin chuyển khoản thủ công và tải lên chứng từ PoD:
          </p>
          <Descriptions bordered size="small" column={1}>
            <Descriptions.Item label="Số tiền đề xuất giải ngân">
              <span className="text-base font-semibold tabular-nums text-[#2d5a43]">
                {money(selectedOrder?.financialSummary?.eligibleAmount ?? selectedOrder?.totalAmount ?? 0)}
              </span>
            </Descriptions.Item>
          </Descriptions>
          <Form form={payoutRequestForm} layout="vertical" disabled={payoutRequestLoadingAccount}>
            <Row gutter={12}>
              <Col xs={24} sm={14}>
                <Form.Item
                  label="Tên ngân hàng"
                  name="bankName"
                  rules={[{ required: true, message: 'Vui lòng nhập tên ngân hàng' }]}
                >
                  <Input placeholder="VD: Vietcombank, Techcombank..." />
                </Form.Item>
              </Col>
              <Col xs={24} sm={10}>
                <Form.Item label="Mã NH (tùy chọn)" name="bankCode">
                  <Input placeholder="VD: VCB, TCB..." />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Số tài khoản nhận tiền"
                  name="accountNumber"
                  rules={[{ required: true, message: 'Vui lòng nhập số tài khoản' }]}
                >
                  <Input placeholder="Nhập chính xác STK thụ hưởng" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Tên chủ tài khoản"
                  name="accountHolderName"
                  rules={[{ required: true, message: 'Vui lòng nhập tên chủ tài khoản' }]}
                >
                  <Input placeholder="Viết hoa không dấu" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Chi nhánh (tùy chọn)" name="branchName">
              <Input placeholder="VD: Sở Giao Dịch TP.HCM" />
            </Form.Item>
            <Form.Item label="Ghi chú quyết toán" name="notes" className="mb-0">
              <Input.TextArea rows={2} placeholder="Nội dung đề nghị giải ngân..." />
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* Modal Xưởng nộp phản biện khiếu nại (D27) */}
      <Modal
        title={
          <div className="flex items-center gap-2 font-serif text-lg font-semibold text-[#7d1322]">
            <ClockCircleOutlined className="text-[#cf1322]" />
            <span>Phản biện khiếu nại giao hàng · #{rebuttalOrder?.orderNumber}</span>
          </div>
        }
        open={rebuttalModalOpen}
        onCancel={() => setRebuttalModalOpen(false)}
        confirmLoading={rebuttalSubmitting}
        onOk={() => rebuttalForm.submit()}
        okText="Nộp phản biện"
        cancelText="Hủy"
        okButtonProps={{ danger: true, type: 'primary' }}
        width={680}
        destroyOnHidden
      >
        <div className="my-3 space-y-4 text-xs sm:text-sm text-[#231a18]">
          <Alert
            type="info"
            showIcon
            message={
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span>Hạn phản biện 48 giờ đối soát</span>
                {rebuttalOrder?.activeDispute?.rebuttalDeadlineAtUtc && (
                  <SlaCountdownBadge
                    deadline={rebuttalOrder.activeDispute.rebuttalDeadlineAtUtc}
                    label="Còn lại"
                  />
                )}
              </div>
            }
            description="Xưởng sản xuất cung cấp ghi chú giải trình và ảnh biên bản đối soát (PoD, tem niêm phong, cân nặng kiện hàng...). Sau 48h hoặc sau khi nộp phản biện, Admin sàn sẽ phân xử khiếu nại."
          />

          <Descriptions bordered size="small" column={1}>
            <Descriptions.Item label="Mã đơn hàng">
              <span className="font-mono font-semibold text-[#7d1322]">#{rebuttalOrder?.orderNumber}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Vấn đề khách khiếu nại">
              <b>{disputeIssueTypeLabel(rebuttalOrder?.activeDispute?.issueType)}</b> — {rebuttalOrder?.activeDispute?.description}
            </Descriptions.Item>
            {rebuttalOrder?.activeDispute?.evidenceUrls?.length > 0 && (
              <Descriptions.Item label="Ảnh bằng chứng từ khách">
                <Image.PreviewGroup>
                  <div className="flex flex-wrap gap-2">
                    {rebuttalOrder.activeDispute.evidenceUrls.map((url, idx) => (
                      <Image
                        key={idx}
                        src={url}
                        alt={`Khách cung cấp ${idx + 1}`}
                        width={70}
                        height={70}
                        className="rounded-lg object-cover border border-[#e4dcd3]"
                      />
                    ))}
                  </div>
                </Image.PreviewGroup>
              </Descriptions.Item>
            )}
          </Descriptions>

          <Form form={rebuttalForm} layout="vertical" onFinish={submitRebuttal}>
            <Form.Item
              name="notes"
              label={<span className="text-xs font-semibold">Nội dung phản biện từ xưởng (Bắt buộc)</span>}
              rules={[
                { required: true, message: 'Vui lòng nhập nội dung giải trình phản biện.' },
                { min: 5, message: 'Nội dung phản biện phải có ít nhất 5 ký tự.' },
                { max: 2000, message: 'Nội dung phản biện không vượt quá 2000 ký tự.' },
              ]}
            >
              <TextArea
                rows={4}
                showCount
                maxLength={2000}
                placeholder="Giải trình chi tiết: Kiện hàng đã được dán tem niêm phong nguyên vẹn khi xuất kho, ảnh chụp bàn giao cho đơn vị vận chuyển..."
              />
            </Form.Item>

            <div>
              <span className="mb-1.5 block text-xs font-semibold text-[#231a18]">
                Ảnh / biên bản bằng chứng phản biện (Tối đa 10 ảnh)
              </span>
              <Upload
                multiple
                maxCount={10}
                accept="image/*"
                listType="picture-card"
                fileList={rebuttalFileList}
                customRequest={handleRebuttalUploadRequest}
                onChange={({ fileList }) => setRebuttalFileList(fileList)}
              >
                {rebuttalFileList.length < 10 && (
                  <div className="flex flex-col items-center justify-center text-xs text-[#6c625e]">
                    <PlusOutlined className="text-base text-[#7d1322]" />
                    <span className="mt-1">Tải ảnh lên</span>
                  </div>
                )}
              </Upload>
            </div>
          </Form>
        </div>
      </Modal>

      {/* Modal Xưởng phản hồi yêu cầu hủy đơn hàng (D24) */}
      <Modal
        title={
          <div className="flex items-center gap-2 font-serif text-lg font-semibold text-[#231a18]">
            <ClockCircleOutlined className="text-[#d48806]" />
            <span>Phản hồi yêu cầu hủy đơn hàng · #{respondCancelOrder?.orderNumber}</span>
          </div>
        }
        open={respondCancelModalOpen}
        onCancel={() => setRespondCancelModalOpen(false)}
        confirmLoading={respondCancelSubmitting}
        onOk={submitRespondCancel}
        okText={respondCancelApprove ? 'Đồng ý hủy' : 'Từ chối hủy'}
        cancelText="Đóng"
        okButtonProps={{
          style: respondCancelApprove
            ? { backgroundColor: '#8c1524', borderColor: '#8c1524' }
            : undefined,
          danger: !respondCancelApprove,
        }}
        width={620}
        destroyOnHidden
      >
        {respondCancelOrder && (() => {
          const cancelReq = respondCancelOrder.pendingCancellationRequest;
          const cancelSuggestion = orderService.calculateCancellationRefundSuggestion(respondCancelOrder);
          const refundAmount = cancelReq?.suggestedRefundAmount ?? cancelReq?.proposedRefundAmount ?? cancelSuggestion.amount;
          const refundPercent = cancelReq?.suggestedRefundPercent ?? cancelSuggestion.percent;
          const refundReason = cancelReq?.suggestionReason || cancelSuggestion.reason;

          return (
            <div className="my-3 space-y-4 text-xs sm:text-sm text-[#231a18]">
              <Descriptions bordered size="small" column={1}>
                <Descriptions.Item label="Mã đơn hàng">
                  <span className="font-mono font-semibold text-[#7d1322]">#{respondCancelOrder.orderNumber}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Tổng tiền đơn">
                  <span className="font-semibold text-stone-800">{money(respondCancelOrder.totalAmount)}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Lý do khách xin hủy">
                  {cancelReq?.reason || 'Khách hàng yêu cầu hủy đơn hàng.'}
                </Descriptions.Item>
              </Descriptions>

              {/* Hiển thị mức hoàn đề xuất theo D24 */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-800">Mức hoàn đề xuất:</span>
                  <span className="font-bold text-[#8c1524] text-sm tabular-nums">
                    {money(refundAmount)} ({refundPercent}%)
                  </span>
                </div>
                {refundReason && (
                  <div className="text-xs text-stone-600">
                    <span className="font-semibold text-stone-700">Căn cứ đề xuất:</span> {refundReason}
                  </div>
                )}
                <div className="text-[11px] text-stone-500 italic pt-1 border-t border-amber-200/60">
                  * Theo quy chế bảo vệ D24: Đơn hàng đang sản xuất có bao bì in logo riêng đề xuất hoàn 50% số tiền đã cọc; đơn thông thường đề xuất hoàn 100%. Quản trị viên sẽ phê duyệt số tiền hoàn cuối cùng.
                </div>
              </div>

              <div>
                <span className="mb-2 block text-xs font-semibold text-[#231a18]">
                  Quyết định của xưởng
                </span>
                <Radio.Group
                  value={respondCancelApprove}
                  onChange={(e) => setRespondCancelApprove(e.target.value)}
                >
                  <Space direction="vertical">
                    <Radio value={true}>
                      <strong>Đồng ý hủy đơn:</strong> Chuyển hồ sơ cho Admin hoàn tiền theo mức đề xuất.
                    </Radio>
                    <Radio value={false}>
                      <strong>Từ chối hủy đơn:</strong> Tiếp tục sản xuất và bàn giao theo tiến độ đã cam kết.
                    </Radio>
                  </Space>
                </Radio.Group>
              </div>

              <div>
                <span className="mb-1 block text-xs font-medium text-[#231a18]">
                  Ghi chú phản hồi
                </span>
                <TextArea
                  rows={3}
                  value={respondCancelNotes}
                  onChange={(e) => setRespondCancelNotes(e.target.value)}
                  maxLength={1000}
                  showCount
                  placeholder="Ghi chú phản hồi cho khách hàng và bộ phận Admin sàn..."
                />
              </div>
            </div>
          );
        })()}
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
