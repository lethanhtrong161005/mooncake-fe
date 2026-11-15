import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  Descriptions,
  Divider,
  Drawer,
  Empty,
  Image,
  Spin,
  Table,
  Tabs,
  Tag,
} from 'antd';
import {
  CreditCardOutlined,
  FileTextOutlined,
  HistoryOutlined,
  PictureOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import orderService from '../../services/orderService';

const money = (value) => `${Number(value || 0).toLocaleString('vi-VN')} ₫`;

const formatDateTime = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString('vi-VN');
};

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
  AwaitingSupplierRebuttal: { label: 'Chờ xưởng phản biện', color: 'orange' },
};

const OBLIGATION_STATUS_META = {
  Paid: { label: 'Đã thanh toán', color: 'green' },
  PartiallyPaid: { label: 'Thanh toán một phần', color: 'blue' },
  Pending: { label: 'Chờ thanh toán', color: 'gold' },
  Waived: { label: 'Đã miễn', color: 'default' },
  Cancelled: { label: 'Đã hủy', color: 'default' },
};

const PAYMENT_TX_STATUS_META = {
  Paid: { label: 'Thành công', color: 'green' },
  Succeeded: { label: 'Thành công', color: 'green' },
  Completed: { label: 'Thành công', color: 'green' },
  Pending: { label: 'Đang chờ VNPay', color: 'gold' },
  Failed: { label: 'Thất bại', color: 'red' },
  Cancelled: { label: 'Đã hủy', color: 'default' },
  Refunded: { label: 'Đã hoàn tiền', color: 'purple' },
  PartiallyRefunded: { label: 'Hoàn một phần', color: 'orange' },
};

const REFUND_CASE_META = {
  Requested: { label: 'Chờ duyệt', color: 'gold' },
  Approved: { label: 'Đã duyệt', color: 'blue' },
  Processed: { label: 'Đã hoàn (Sandbox)', color: 'green' },
  Completed: { label: 'Đã hoàn tiền', color: 'green' },
  Rejected: { label: 'Từ chối', color: 'red' },
};

function AutoConfirmAlert({ deadline }) {
  const [hours, setHours] = useState(() => {
    if (!deadline) return 0;
    const diffMs = new Date(deadline).getTime() - Date.now();
    return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60)));
  });

  useEffect(() => {
    if (!deadline) return undefined;
    const interval = setInterval(() => {
      const diffMs = new Date(deadline).getTime() - Date.now();
      setHours(Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60))));
    }, 60000);
    return () => clearInterval(interval);
  }, [deadline]);

  if (!deadline) return null;

  return (
    <Alert
      type="info"
      showIcon
      message="Thông báo tự động xác nhận đã nhận hàng (SLA 72h)"
      description={`Hệ thống sẽ tự xác nhận đã nhận hàng lúc ${formatDateTime(deadline)} (còn ${hours} giờ). Nếu có vấn đề hãy khiếu nại trước thời điểm này.`}
    />
  );
}

/**
 * Shared drawer displaying complete B2B order details, VNPay payment schedule/transactions,
 * and paginated financial escrow ledger history for both customer and supplier roles.
 */
export default function OrderDetailDrawer({
  open,
  order,
  role = 'customer',
  onClose,
  onOpenPaymentSchedule,
}) {
  const [manualRefreshing, setManualRefreshing] = useState(false);
  const [snapshot, setSnapshot] = useState({
    orderId: null,
    order: null,
    payment: null,
    finance: null,
  });
  const [ledgerState, setLedgerState] = useState({
    orderId: null,
    page: 1,
    pageSize: 10,
    items: [],
    total: 0,
  });
  const [manualLedgerLoading, setManualLedgerLoading] = useState(false);

  const orderId = order?.id || null;

  const fetchOrderSnapshotData = useCallback(async (targetId) => {
    const [fullRes, paymentRes, financeRes] = await Promise.allSettled([
      orderService.get(targetId),
      orderService.getPaymentSummary(targetId),
      orderService.getFinancialSummary(targetId),
    ]);
    return {
      orderId: targetId,
      order: fullRes.status === 'fulfilled' ? fullRes.value : null,
      payment: paymentRes.status === 'fulfilled' ? paymentRes.value : null,
      finance: financeRes.status === 'fulfilled' ? financeRes.value : null,
    };
  }, []);

  const fetchOrderLedgerData = useCallback(async (targetId, page = 1, pageSize = 10) => {
    try {
      const paged = await orderService.getFinancialLedgerPage(targetId, { page, pageSize });
      const items = Array.isArray(paged) ? paged : (paged?.items || []);
      const total = Array.isArray(paged) ? paged.length : Number(paged?.totalCount ?? items.length);
      return { orderId: targetId, page, pageSize, items, total };
    } catch {
      return { orderId: targetId, page, pageSize, items: [], total: 0 };
    }
  }, []);

  useEffect(() => {
    if (!open || !orderId) return undefined;
    let cancelled = false;

    fetchOrderSnapshotData(orderId).then((nextSnapshot) => {
      if (!cancelled && nextSnapshot) setSnapshot(nextSnapshot);
    });
    fetchOrderLedgerData(orderId, 1, 10).then((nextLedger) => {
      if (!cancelled && nextLedger) setLedgerState(nextLedger);
    });

    return () => {
      cancelled = true;
    };
  }, [fetchOrderLedgerData, fetchOrderSnapshotData, open, orderId]);

  const handleManualRefresh = async () => {
    if (!orderId) return;
    setManualRefreshing(true);
    setManualLedgerLoading(true);
    try {
      const [nextSnapshot, nextLedger] = await Promise.all([
        fetchOrderSnapshotData(orderId),
        fetchOrderLedgerData(orderId, ledgerState.page, ledgerState.pageSize),
      ]);
      setSnapshot(nextSnapshot);
      setLedgerState(nextLedger);
    } finally {
      setManualRefreshing(false);
      setManualLedgerLoading(false);
    }
  };

  const handleLedgerPageChange = async (nextPage) => {
    if (!orderId) return;
    setManualLedgerLoading(true);
    try {
      const nextLedger = await fetchOrderLedgerData(orderId, nextPage, ledgerState.pageSize);
      setLedgerState(nextLedger);
    } finally {
      setManualLedgerLoading(false);
    }
  };

  const isSnapshotMatched = snapshot.orderId === orderId;
  const isLedgerMatched = ledgerState.orderId === orderId;
  const loading = manualRefreshing || (open && Boolean(orderId) && !isSnapshotMatched);
  const ledgerLoading = manualLedgerLoading || (open && Boolean(orderId) && !isLedgerMatched);

  const current = (isSnapshotMatched && snapshot.order) || order;
  const resolvedPayment = (isSnapshotMatched && snapshot.payment) || current?.paymentSummary || null;
  const resolvedFinance = (isSnapshotMatched && snapshot.finance) || current?.financialSummary || null;

  const displayedLedger = useMemo(() => {
    if (isLedgerMatched && ledgerState.items.length > 0) return ledgerState.items;
    return resolvedFinance?.ledgerEntries || [];
  }, [isLedgerMatched, ledgerState.items, resolvedFinance]);

  const statusMeta = STATUS_META[current?.status] || {
    label: current?.status || 'Không xác định',
    color: 'default',
  };

  const podProofs = (current?.latestDelivery?.proofs || []).filter((p) => Boolean(p?.photoUrl));

  const itemColumns = [
    {
      title: 'Sản phẩm & quy cách',
      key: 'product',
      render: (_, item) => (
        <div>
          <div className="font-semibold text-stone-900">{item.productName}</div>
          <div className="text-xs text-stone-500">
            {item.variantName}
            {item.sku ? ` · SKU: ${item.sku}` : ''}
          </div>
        </div>
      ),
    },
    {
      title: 'SL',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 72,
      align: 'right',
      render: (qty) => <span className="font-semibold tabular-nums">{qty}</span>,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      width: 120,
      align: 'right',
      render: (val) => <span className="tabular-nums">{money(val)}</span>,
    },
    {
      title: 'Chiết khấu',
      dataIndex: 'discountAmount',
      key: 'discountAmount',
      width: 110,
      align: 'right',
      render: (val) => (
        <span className="tabular-nums text-emerald-700">
          {Number(val || 0) > 0 ? `-${money(val)}` : '0 ₫'}
        </span>
      ),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'subtotal',
      key: 'subtotal',
      width: 130,
      align: 'right',
      render: (val) => <span className="font-semibold tabular-nums text-[#8c1524]">{money(val)}</span>,
    },
  ];

  const txColumns = [
    {
      title: 'Mã giao dịch',
      dataIndex: 'paymentNumber',
      key: 'paymentNumber',
      render: (val, row) => (
        <div>
          <div className="font-mono text-xs font-semibold text-stone-900">{val}</div>
          {row.transactionId && (
            <div className="font-mono text-[11px] text-stone-500">VNP: {row.transactionId}</div>
          )}
        </div>
      ),
    },
    {
      title: 'Phương thức',
      dataIndex: 'method',
      key: 'method',
      width: 110,
      render: (val) => <Tag className="m-0">{val || 'VNPay'}</Tag>,
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      width: 130,
      align: 'right',
      render: (val, row) => (
        <div className="tabular-nums">
          <div className="font-semibold text-stone-900">{money(val)}</div>
          {Number(row.refundedAmount || 0) > 0 && (
            <div className="text-[11px] text-purple-700">Hoàn: {money(row.refundedAmount)}</div>
          )}
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (val) => {
        const meta = PAYMENT_TX_STATUS_META[val] || { label: val || 'N/A', color: 'default' };
        return <Tag color={meta.color} className="m-0">{meta.label}</Tag>;
      },
    },
    {
      title: 'Thời điểm',
      key: 'time',
      width: 165,
      render: (_, row) => (
        <div className="text-xs text-stone-600 tabular-nums">
          <div>Tạo: {formatDateTime(row.createdAtUtc)}</div>
          {row.paidAtUtc && <div className="text-emerald-700">TT: {formatDateTime(row.paidAtUtc)}</div>}
        </div>
      ),
    },
  ];

  const ledgerColumns = [
    {
      title: 'Thời gian',
      dataIndex: 'createdAtUtc',
      key: 'createdAtUtc',
      width: 165,
      render: (val) => <span className="text-xs text-stone-600 tabular-nums">{formatDateTime(val)}</span>,
    },
    {
      title: 'Loại bút toán',
      dataIndex: 'entryType',
      key: 'entryType',
      width: 160,
      render: (val) => <Tag color="geekblue" className="m-0 font-mono text-[11px]">{val}</Tag>,
    },
    {
      title: 'Nhóm quỹ',
      dataIndex: 'balanceBucket',
      key: 'balanceBucket',
      width: 130,
      render: (val) => <span className="text-xs font-medium text-stone-700">{val}</span>,
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      width: 135,
      align: 'right',
      render: (val) => {
        const num = Number(val || 0);
        return (
          <span
            className={`font-semibold tabular-nums ${
              num < 0 ? 'text-red-700' : 'text-emerald-700'
            }`}
          >
            {num > 0 ? `+${money(num)}` : money(num)}
          </span>
        );
      },
    },
    {
      title: 'Diễn giải',
      dataIndex: 'description',
      key: 'description',
      render: (val) => <span className="text-xs text-stone-700">{val || '—'}</span>,
    },
  ];

  const tabItems = [
    {
      key: 'overview',
      label: (
        <span>
          <FileTextOutlined /> Chi tiết đơn hàng
        </span>
      ),
      children: (
        <div className="space-y-4">
          {current?.status === 'Shipped' && (current?.autoConfirmAt || current?.autoConfirmAtUtc) && (
            <AutoConfirmAlert deadline={current.autoConfirmAt || current.autoConfirmAtUtc} />
          )}

          {current?.cancellationReason && (
            <Alert
              type="error"
              showIcon
              message="Thông báo hủy đơn"
              description={current.cancellationReason}
            />
          )}

          {current?.pendingCancellationRequest && (
            <Alert
              type="warning"
              showIcon
              message={
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold">
                    Yêu cầu hủy đơn ({current.pendingCancellationRequest.status === 'Pending' ? 'Đang chờ xử lý' : current.pendingCancellationRequest.status})
                  </span>
                  <Tag color="volcano" className="m-0 font-semibold">
                    Đề xuất hoàn: {money(current.pendingCancellationRequest.suggestedRefundAmount ?? current.pendingCancellationRequest.proposedRefundAmount)}
                    {current.pendingCancellationRequest.suggestedRefundPercent != null ? ` (${current.pendingCancellationRequest.suggestedRefundPercent}%)` : ''}
                  </Tag>
                </div>
              }
              description={
                <div className="space-y-1 text-xs mt-1">
                  <div>
                    <span className="font-semibold text-stone-700">Người gửi:</span> {current.pendingCancellationRequest.requestedByRole} · <span className="font-semibold text-stone-700">Lý do:</span> {current.pendingCancellationRequest.reason}
                  </div>
                  {current.pendingCancellationRequest.suggestionReason && (
                    <div className="text-stone-600">
                      <span className="font-semibold text-stone-700">Căn cứ đề xuất:</span> {current.pendingCancellationRequest.suggestionReason}
                    </div>
                  )}
                  {current.pendingCancellationRequest.createdAtUtc && (
                    <div className="text-stone-400 text-[11px]">
                      Thời điểm gửi: {formatDateTime(current.pendingCancellationRequest.createdAtUtc)}
                    </div>
                  )}
                </div>
              }
            />
          )}

          {current?.activeDispute && (() => {
            const dispute = current.activeDispute;
            const deadline = dispute.rebuttalDeadlineAtUtc || dispute.rebuttalDeadlineAt;
            const isAwaitingRebuttal = dispute.status === 'AwaitingSupplierRebuttal';
            const disputeStatusLabel = isAwaitingRebuttal
              ? `Chờ xưởng phản hồi${deadline ? ` (hạn ${formatDateTime(deadline)})` : ''}`
              : dispute.status === 'Open'
                ? 'Đang giải quyết (Xưởng đã nộp phản biện)'
                : dispute.status;

            return (
              <Alert
                type="warning"
                showIcon
                message={
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold">Khiếu nại giao hàng · {disputeStatusLabel}</span>
                    <Tag color={isAwaitingRebuttal ? 'orange' : 'volcano'} className="m-0 font-semibold">
                      {isAwaitingRebuttal ? 'Chờ xưởng phản biện' : dispute.status}
                    </Tag>
                  </div>
                }
                description={
                  <div className="space-y-2 text-xs mt-1">
                    <div>
                      <span className="font-semibold text-stone-700">Vấn đề khiếu nại:</span>{' '}
                      <b>{dispute.issueType}</b> — {dispute.description}
                    </div>

                    {isAwaitingRebuttal && (
                      <div className="text-[11px] text-amber-800 italic">
                        * Xưởng sản xuất có 48 giờ để nộp phản biện và bằng chứng. Ban Quản Trị sẽ đối soát xử lý sau thời hạn này hoặc sau khi xưởng phản biện.
                      </div>
                    )}

                    {dispute.supplierRebuttalNotes && (
                      <div className="p-3 rounded-lg bg-stone-100/90 border border-stone-200 space-y-1.5">
                        <div className="font-semibold text-stone-800 flex flex-wrap items-center justify-between gap-1">
                          <span>Nội dung phản biện từ xưởng:</span>
                          {(dispute.supplierRebuttalAtUtc || dispute.supplierRebuttalAt) && (
                            <span className="text-[11px] font-normal text-stone-500">
                              Phản biện lúc: {formatDateTime(dispute.supplierRebuttalAtUtc || dispute.supplierRebuttalAt)}
                            </span>
                          )}
                        </div>
                        <div className="text-stone-700 whitespace-pre-line">{dispute.supplierRebuttalNotes}</div>
                        {Array.isArray(dispute.supplierRebuttalEvidenceUrls) && dispute.supplierRebuttalEvidenceUrls.length > 0 && (
                          <div className="pt-1">
                            <span className="text-[11px] font-semibold text-stone-700 block mb-1">
                              Bằng chứng phản biện ({dispute.supplierRebuttalEvidenceUrls.length} tệp):
                            </span>
                            <Image.PreviewGroup>
                              <div className="flex flex-wrap gap-2">
                                {dispute.supplierRebuttalEvidenceUrls.map((url, idx) => (
                                  <Image
                                    key={url || idx}
                                    src={url}
                                    alt={`Bằng chứng phản biện ${idx + 1}`}
                                    width={60}
                                    height={60}
                                    className="rounded-md object-cover border border-stone-200"
                                  />
                                ))}
                              </div>
                            </Image.PreviewGroup>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                }
              />
            );
          })()}

          {current?.proposedDeliveryDate && (
            <Alert
              type="info"
              showIcon
              message={`Đề xuất ngày giao mới: ${current.proposedDeliveryDate}`}
              description={current.deliveryProposalReason || 'Xưởng đề xuất điều chỉnh tiến độ giao.'}
            />
          )}

          <Descriptions
            bordered
            size="small"
            column={{ xs: 1, sm: 2 }}
            styles={{ label: { backgroundColor: '#faf7f2', fontWeight: 600, width: 150 } }}
          >
            <Descriptions.Item label="Người nhận">{current?.recipientName || '—'}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{current?.recipientPhone || '—'}</Descriptions.Item>
            <Descriptions.Item label={role === 'supplier' ? 'Khách hàng' : 'Xưởng cung cấp'}>
              {role === 'supplier' ? (current?.customerName || 'Doanh nghiệp') : (current?.shopName || '—')}
            </Descriptions.Item>
            <Descriptions.Item label="Khu vực giao">
              {current?.shippingZoneName || current?.shippingZoneCode || 'Tiêu chuẩn'}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày giao dự kiến">
              {current?.confirmedDeliveryDate || current?.deliveryDateExpected || 'Theo thỏa thuận'}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo đơn">
              {formatDateTime(current?.createdAtUtc)}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ nhận hàng" span={2}>
              {current?.deliveryAddress || '—'}
            </Descriptions.Item>
            {current?.notes && (
              <Descriptions.Item label="Ghi chú đơn" span={2}>
                {current.notes}
              </Descriptions.Item>
            )}
          </Descriptions>

          <div>
            <div className="text-sm font-semibold text-stone-800 mb-2">
              Danh sách sản phẩm ({current?.items?.length || 0} dòng hàng)
            </div>
            <Table
              rowKey={(item) => `${item.productId}-${item.variantId}`}
              columns={itemColumns}
              dataSource={current?.items || []}
              pagination={false}
              size="small"
              scroll={{ x: 560 }}
            />
          </div>

          <div className="rounded-xl border border-[#e8e0d5] bg-[#faf7f2] p-4 space-y-1.5 text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Tạm tính hàng hóa</span>
              <span className="tabular-nums font-medium">{money(current?.subtotal)}</span>
            </div>
            {Number(current?.discountAmount || 0) > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Chiết khấu số lượng</span>
                <span className="tabular-nums font-medium">-{money(current.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>Phí thiết kế bao bì</span>
              <span className="tabular-nums font-medium">{money(current?.packagingFee)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Phí vận chuyển</span>
              <span className="tabular-nums font-medium">{money(current?.shippingFee)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>
                Thuế GTGT ({Number(current?.taxRate || 0)}%{current?.taxIncluded ? ', đã gồm' : ''})
              </span>
              <span className="tabular-nums font-medium">{money(current?.taxAmount)}</span>
            </div>
            <Divider className="my-2" />
            <div className="flex justify-between text-base font-bold text-[#8c1524]">
              <span>Tổng giá trị đơn hàng</span>
              <span className="tabular-nums">{money(current?.totalAmount)}</span>
            </div>
          </div>

          {(current?.customPackaging || podProofs.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {current?.customPackaging && (() => {
                const freeUsed = current.customPackaging.freeRevisionsUsed;
                const freeLimit = current.customPackaging.freeRevisionsLimit ?? 3;
                const surcharge = Number(current.customPackaging.revisionSurcharge || 0);

                return (
                  <div className="rounded-xl border border-[#e8e0d5] bg-white p-4 space-y-2">
                    <div className="text-sm font-semibold text-stone-800">
                      Bao bì doanh nghiệp in logo
                    </div>
                    <div className="text-xs text-stone-600 space-y-1">
                      <div>
                        Thương hiệu: <b>{current.customPackaging.companyName}</b>
                      </div>
                      <div>
                        Kiểu hộp: <b>{current.customPackaging.packagingType}</b>
                      </div>
                      <div>
                        Trạng thái duyệt: <Tag color="gold">{current.customPackaging.status}</Tag>
                      </div>
                      {freeUsed != null && (
                        <div>
                          Lượt sửa mockup miễn phí:{' '}
                          <Tag color={freeUsed >= freeLimit ? 'volcano' : 'blue'}>
                            Đã dùng {freeUsed}/{freeLimit} lần sửa miễn phí
                          </Tag>
                        </div>
                      )}
                      {surcharge > 0 && (
                        <div>
                          Phụ phí sửa mockup:{' '}
                          <b className="text-amber-700">{money(surcharge)}</b>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {podProofs.length > 0 && (
                <div className="rounded-xl border border-[#e8e0d5] bg-white p-4 space-y-2">
                  <div className="text-sm font-semibold text-stone-800 flex items-center gap-1.5">
                    <PictureOutlined className="text-[#2d5a43]" />
                    <span>Biên bản bàn giao PoD ({podProofs.length} ảnh)</span>
                  </div>
                  <Image.PreviewGroup>
                    <div className="flex flex-wrap gap-2">
                      {podProofs.map((proof, idx) => (
                        <Image
                          key={proof.id || idx}
                          src={proof.photoUrl}
                          alt={`Biên bản PoD ${idx + 1}`}
                          width={72}
                          height={72}
                          className="rounded-lg object-cover border border-stone-200"
                        />
                      ))}
                    </div>
                  </Image.PreviewGroup>
                </div>
              )}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'payments',
      label: (
        <span>
          <CreditCardOutlined /> Thanh toán &amp; Giao dịch ({resolvedPayment?.transactions?.length || 0})
        </span>
      ),
      children: (
        <div className="space-y-4">
          {role === 'customer'
            && Number(resolvedPayment?.remainingAmount || 0) > 0
            && onOpenPaymentSchedule && (
              <div className="flex items-center justify-between gap-3 rounded-xl border border-[#e8d5b7] bg-[#fffaf0] px-4 py-3">
                <span className="text-xs sm:text-sm text-stone-700">
                  Còn <b>{money(resolvedPayment.remainingAmount)}</b> chưa thanh toán theo lịch trình.
                </span>
                <Button
                  type="primary"
                  size="small"
                  icon={<CreditCardOutlined />}
                  onClick={() => onOpenPaymentSchedule(current)}
                  style={{ background: '#8c1524', borderColor: '#8c1524', fontWeight: 600 }}
                >
                  Thanh toán VNPay ngay
                </Button>
              </div>
          )}

          <div>
            <div className="text-sm font-semibold text-stone-800 mb-2">
              Các đợt nghĩa vụ thanh toán ({resolvedPayment?.obligations?.length || 0})
            </div>
            {(resolvedPayment?.obligations || []).length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Đơn hàng chưa phát sinh lịch thanh toán (chờ xưởng xác nhận)."
              />
            ) : (
              <div className="space-y-2.5">
                {resolvedPayment.obligations.map((ob) => {
                  const obMeta = OBLIGATION_STATUS_META[ob.status] || { label: ob.status, color: 'default' };
                  return (
                    <div
                      key={ob.id}
                      className="rounded-xl border border-stone-200 bg-white p-3.5 space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="font-semibold text-stone-900">
                            Đợt {ob.sequenceNo}: {ob.title}
                          </span>
                          <div className="text-xs text-stone-500 mt-0.5">
                            Đã thu: <b>{money(ob.paidAmount)}</b> / Tổng: <b>{money(ob.totalAmount)}</b>
                            {ob.dueAtUtc ? ` · Hạn: ${formatDateTime(ob.dueAtUtc)}` : ''}
                          </div>
                        </div>
                        <Tag color={obMeta.color} className="m-0 font-semibold">
                          {obMeta.label}
                        </Tag>
                      </div>

                      {ob.parts?.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-stone-100">
                          {ob.parts.map((part) => (
                            <div
                              key={part.id}
                              className="flex items-center justify-between text-xs rounded-lg bg-[#faf9f6] px-2.5 py-1.5 border border-stone-200/70"
                            >
                              <span>
                                Kỳ {part.partIndex}/{part.totalParts} ·{' '}
                                <b className="tabular-nums">{money(part.amount)}</b>
                              </span>
                              <Tag
                                color={part.status === 'Paid' ? 'green' : 'gold'}
                                className="m-0 text-[11px]"
                              >
                                {part.status === 'Paid' ? 'Đã trả' : part.status}
                              </Tag>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <div className="text-sm font-semibold text-stone-800 mb-2">
              Lịch sử giao dịch cổng VNPay
            </div>
            <Table
              rowKey={(row) => row.id}
              columns={txColumns}
              dataSource={resolvedPayment?.transactions || []}
              pagination={false}
              size="small"
              locale={{ emptyText: 'Chưa có lượt giao dịch thanh toán nào.' }}
              scroll={{ x: 580 }}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'ledger',
      label: (
        <span>
          <HistoryOutlined /> Sổ cái &amp; Hoàn tiền (
          {isLedgerMatched ? ledgerState.total : displayedLedger.length})
        </span>
      ),
      children: (
        <div className="space-y-4">
          {resolvedFinance && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              <div className="rounded-xl border border-stone-200 bg-white p-3">
                <div className="text-[11px] text-stone-500">Đã thu vào hệ thống</div>
                <div className="text-sm font-bold text-stone-900 tabular-nums mt-0.5">
                  {money(resolvedFinance.capturedAmount)}
                </div>
              </div>
              <div className="rounded-xl border border-stone-200 bg-white p-3">
                <div className="text-[11px] text-stone-500">Đang tạm giữ</div>
                <div className="text-sm font-bold text-amber-700 tabular-nums mt-0.5">
                  {money(resolvedFinance.heldAmount)}
                </div>
              </div>
              <div className="rounded-xl border border-stone-200 bg-white p-3">
                <div className="text-[11px] text-stone-500">Khóa tranh chấp</div>
                <div className="text-sm font-bold text-red-700 tabular-nums mt-0.5">
                  {money(resolvedFinance.disputedLockedAmount)}
                </div>
              </div>
              <div className="rounded-xl border border-stone-200 bg-white p-3">
                <div className="text-[11px] text-stone-500">Đã hoàn khách</div>
                <div className="text-sm font-bold text-purple-700 tabular-nums mt-0.5">
                  {money(resolvedFinance.refundedSimulatedAmount)}
                </div>
              </div>
              <div className="rounded-xl border border-stone-200 bg-white p-3">
                <div className="text-[11px] text-stone-500">Khả dụng / Đã chi</div>
                <div className="text-sm font-bold text-[#2d5a43] tabular-nums mt-0.5">
                  {money(
                    Number(resolvedFinance.eligibleAmount || 0)
                    + Number(resolvedFinance.paidOutSimulatedAmount || 0),
                  )}
                </div>
              </div>
            </div>
          )}

          <div>
            <div className="text-sm font-semibold text-stone-800 mb-2">
              Nhật ký sổ cái giao dịch
            </div>
            <Table
              rowKey={(row) => row.id}
              loading={ledgerLoading}
              columns={ledgerColumns}
              dataSource={displayedLedger}
              size="small"
              scroll={{ x: 640 }}
              locale={{ emptyText: 'Chưa phát sinh bút toán sổ cái cho đơn hàng này.' }}
              pagination={{
                current: isLedgerMatched ? ledgerState.page : 1,
                pageSize: ledgerState.pageSize,
                total: isLedgerMatched ? ledgerState.total : displayedLedger.length,
                showSizeChanger: false,
                onChange: handleLedgerPageChange,
              }}
            />
          </div>

          {(resolvedFinance?.refundCases || []).length > 0 && (
            <div>
              <div className="text-sm font-semibold text-stone-800 mb-2">
                Hồ sơ hoàn tiền B2B
              </div>
              <div className="space-y-2">
                {resolvedFinance.refundCases.map((rc) => {
                  const rcMeta = REFUND_CASE_META[rc.status] || { label: rc.status, color: 'default' };
                  return (
                    <div
                      key={rc.id}
                      className="rounded-xl border border-stone-200 bg-white p-3 flex flex-wrap items-center justify-between gap-2 text-xs"
                    >
                      <div>
                        <span className="font-mono font-semibold text-stone-900">{rc.caseNumber}</span>
                        {rc.refundReferenceCode && (
                          <span className="text-stone-500 ml-2">Mã GD: {rc.refundReferenceCode}</span>
                        )}
                        <div className="text-stone-600 mt-0.5">{rc.reason}</div>
                        {rc.suggestedRefundAmount != null && (
                          <div className="text-[11px] text-stone-500 mt-0.5">
                            Đề xuất hoàn: <b className="text-stone-800">{money(rc.suggestedRefundAmount)}</b>
                            {rc.suggestedRefundPercent != null ? ` (${rc.suggestedRefundPercent}%)` : ''}
                            {rc.suggestionReason ? ` · ${rc.suggestionReason}` : ''}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#8c1524] tabular-nums">
                          {money(rc.approvedAmount || rc.requestedAmount)}
                        </div>
                        <Tag color={rcMeta.color} className="m-0 mt-1">
                          {rcMeta.label}
                        </Tag>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Drawer
      title={
        <div className="flex flex-wrap items-center gap-2 pr-4">
          <span className="font-serif text-lg font-bold text-stone-900">
            Đơn hàng #{current?.orderNumber || ''}
          </span>
          <Tag color={statusMeta.color} className="m-0 font-semibold">
            {statusMeta.label}
          </Tag>
        </div>
      }
      extra={
        <Button
          size="small"
          icon={<ReloadOutlined />}
          loading={loading}
          onClick={handleManualRefresh}
        >
          Làm mới
        </Button>
      }
      width={860}
      open={open}
      onClose={onClose}
      destroyOnHidden
      styles={{ body: { backgroundColor: '#faf9f6', padding: 20 } }}
    >
      <Spin spinning={loading}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="rounded-xl bg-white border border-stone-200 p-3">
            <div className="text-[11px] text-stone-500">Tổng đơn hàng</div>
            <div className="text-base font-bold text-[#8c1524] tabular-nums mt-0.5">
              {money(current?.totalAmount)}
            </div>
          </div>
          <div className="rounded-xl bg-white border border-stone-200 p-3">
            <div className="text-[11px] text-stone-500">Đã thanh toán</div>
            <div className="text-base font-bold text-emerald-700 tabular-nums mt-0.5">
              {money(resolvedPayment?.totalPaidAmount)}
            </div>
          </div>
          <div className="rounded-xl bg-white border border-stone-200 p-3">
            <div className="text-[11px] text-stone-500">Còn lại phải thu</div>
            <div className="text-base font-bold text-amber-700 tabular-nums mt-0.5">
              {money(resolvedPayment?.remainingAmount)}
            </div>
          </div>
          <div className="rounded-xl bg-white border border-stone-200 p-3">
            <div className="text-[11px] text-stone-500">Đã hoàn tiền</div>
            <div className="text-base font-bold text-purple-700 tabular-nums mt-0.5">
              {money(
                resolvedFinance?.refundedSimulatedAmount
                ?? resolvedPayment?.totalRefundedAmount
                ?? 0,
              )}
            </div>
          </div>
        </div>

        <Tabs key={orderId || 'empty'} defaultActiveKey="overview" items={tabItems} />
      </Spin>
    </Drawer>
  );
}
