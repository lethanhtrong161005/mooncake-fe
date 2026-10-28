export const VERIFICATION_LABELS = {
  NotSubmitted: 'Chưa gửi hồ sơ', Pending: 'Chờ xác minh', Verified: 'Đã xác minh',
  Rejected: 'Cần bổ sung hồ sơ', Revoked: 'Đã thu hồi xác minh',
};
export const VERIFICATION_COLORS = {
  Pending: 'gold', Verified: 'success', Rejected: 'warning', Revoked: 'error',
};
export const DOCUMENT_TYPES = [
  { value: 'BusinessLicense', label: 'Giấy phép kinh doanh' },
  { value: 'FoodSafetyCertificate', label: 'Chứng nhận an toàn thực phẩm' },
  { value: 'OptionalOther', label: 'Tài liệu bổ sung' },
];
export const DOCUMENT_PREVIEW_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
export const VERIFICATION_ERRORS = {
  SUPPLIER_VERSION_CONFLICT: 'Hồ sơ đã thay đổi. Hãy tải phiên bản mới và kiểm tra lại.',
  SUPPLIER_ALREADY_PENDING: 'Hồ sơ đang chờ duyệt. Bạn chưa thể gửi lại.',
  SUPPLIER_ALREADY_VERIFIED: 'Hồ sơ đã được xác minh.',
  SUPPLIER_TAX_CODE_IN_USE: 'Mã số thuế này không khả dụng.',
  SUPPLIER_OPERATION_FORBIDDEN: 'Tài khoản hiện tại không có quyền thực hiện thao tác này.',
  SUPPLIER_INVALID_REQUEST: 'Kiểm tra lại thông tin và các tài liệu bắt buộc.',
  DOCUMENT_NOT_READY: 'Tài liệu chưa sẵn sàng, đã hết hạn hoặc chưa đủ loại bắt buộc.',
  DOCUMENT_TOO_LARGE: 'Vượt giới hạn dung lượng hoặc số lượng tài liệu.',
  DOCUMENT_STORAGE_UNAVAILABLE: 'Dịch vụ kiểm tra/tải tài liệu đang chưa sẵn sàng. Vui lòng thử lại.',
  DOCUMENT_ALREADY_ATTACHED: 'Không thể xóa tài liệu đã thuộc hồ sơ gửi đi.',
  DOCUMENT_UPLOAD_IN_PROGRESS: 'Tài liệu đang được xử lý. Vui lòng chờ trước khi thử lại.',
  IDEMPOTENCY_PAYLOAD_MISMATCH: 'Lần gửi này đã được dùng với nội dung khác. Hãy tải lại hồ sơ.',
};
export const verificationError = (error) => VERIFICATION_ERRORS[error?.errorCode] ||
  (error?.status === 429 ? 'Bạn thao tác quá nhanh. Vui lòng chờ rồi thử lại.' :
    error?.status === 403 ? 'Bạn không có quyền truy cập. Hãy kiểm tra lại phiên đăng nhập.' :
      error?.message || 'Không thể hoàn tất yêu cầu.');
