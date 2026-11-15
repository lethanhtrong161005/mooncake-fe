// Vietnamese labels for delivery-dispute enums so raw API codes never reach the UI.
// Only the displayed text is translated; values sent to the API stay unchanged.

export const DISPUTE_STATUS_META = {
  AwaitingSupplierRebuttal: { label: 'Chờ xưởng phản biện', color: 'warning' },
  Open: { label: 'Chờ Admin phân xử', color: 'processing' },
  Reported: { label: 'Đang khiếu nại', color: 'error' },
  Investigating: { label: 'Đang xem xét', color: 'error' },
  ResolvedRefund: { label: 'Đã phân xử: hoàn tiền cho khách', color: 'success' },
  ResolvedReleasePayout: { label: 'Đã phân xử: thanh toán cho xưởng', color: 'success' },
  Resolved: { label: 'Đã phân xử', color: 'success' },
};

export const disputeStatusLabel = (status) => {
  if (!status) return '—';
  if (DISPUTE_STATUS_META[status]) return DISPUTE_STATUS_META[status].label;
  return status.startsWith('Resolved') ? 'Đã phân xử' : 'Đang xử lý';
};

export const disputeStatusColor = (status) => {
  if (DISPUTE_STATUS_META[status]) return DISPUTE_STATUS_META[status].color;
  return status?.startsWith('Resolved') ? 'success' : 'default';
};

export const DISPUTE_ISSUE_TYPE_LABELS = {
  DamagedGoods: 'Hàng hư hỏng / bể vỡ',
  BrokenCakes: 'Bánh bị vỡ / móp méo khi vận chuyển',
  MissingItems: 'Thiếu hàng',
  WrongQuantity: 'Thiếu số lượng so với hợp đồng',
  WrongItems: 'Sai quy cách / mẫu mã',
  DefectivePackaging: 'Bao bì in sai màu / logo lem mờ',
  LateDelivery: 'Giao hàng trễ',
  Other: 'Lý do khác',
};

export const disputeIssueTypeLabel = (type) =>
  DISPUTE_ISSUE_TYPE_LABELS[type] || (type ? 'Vấn đề khác' : '—');
