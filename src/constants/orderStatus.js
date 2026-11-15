// Single source for how B2B order statuses are shown (label + antd Tag color).
// Supplier dashboard and order management previously each had their own partial map,
// and order management fell back to the raw English enum value.
export const ORDER_STATUS_META = {
  Pending: { label: 'Chờ xác nhận', color: 'gold' },
  AwaitingCustomerDeliveryApproval: { label: 'Chờ khách duyệt ngày giao', color: 'orange' },
  Confirmed: { label: 'Đã xác nhận', color: 'blue' },
  Processing: { label: 'Đang sản xuất', color: 'purple' },
  Shipped: { label: 'Đang giao hàng', color: 'cyan' },
  Delivered: { label: 'Đã giao', color: 'green' },
  CancellationRequested: { label: 'Yêu cầu hủy', color: 'volcano' },
  Cancelled: { label: 'Đã hủy', color: 'red' },
  Expired: { label: 'Hết hạn', color: 'default' },
  Disputed: { label: 'Đang khiếu nại', color: 'red' },
};

export const orderStatusLabel = (status) => ORDER_STATUS_META[status]?.label || status || '—';
export const orderStatusColor = (status) => ORDER_STATUS_META[status]?.color || 'default';
export const orderStatusOptions = (statuses = Object.keys(ORDER_STATUS_META)) =>
  statuses.map((value) => ({ value, label: orderStatusLabel(value) }));

export const PACKAGING_STATUS_LABELS = {
  Pending: 'Chờ xử lý',
  DesignReview: 'Đang duyệt thiết kế',
  Approved: 'Đã duyệt',
  InProduction: 'Đang sản xuất',
  Rejected: 'Bị từ chối',
};

export const packagingStatusLabel = (status) =>
  PACKAGING_STATUS_LABELS[status] || (status ? 'Đang xử lý' : '—');
