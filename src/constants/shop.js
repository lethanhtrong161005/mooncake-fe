export const SHOP_STATUS = { Active: 'Đang hiển thị', Inactive: 'Đang ẩn', Suspended: 'Bị đình chỉ' };
export const SHOP_ERRORS = {
  SHOP_INVALID_REQUEST: 'Vui lòng kiểm tra thông tin đã nhập.',
  SHOP_OPERATION_FORBIDDEN: 'Tài khoản không có quyền thực hiện thao tác này.',
  SUPPLIER_NOT_VERIFIED: 'Bạn cần được duyệt nhà cung cấp trước khi quản lý gian hàng.',
  SHOP_ALREADY_EXISTS: 'Tài khoản đã có một gian hàng. Hãy tải lại thông tin.',
  SHOP_SLUG_IN_USE: 'Đường dẫn gian hàng này đã được sử dụng.',
  SHOP_VERSION_CONFLICT: 'Gian hàng đã thay đổi. Giữ bản nháp và tải phiên bản mới trước khi lưu lại.',
  SHOP_SUSPENDED: 'Gian hàng đang bị đình chỉ. Chỉ Admin có thể khôi phục.',
  SHOP_STATE_CONFLICT: 'Trạng thái đã thay đổi. Vui lòng tải lại.',
  SHOP_MEDIA_NOT_READY: 'Ảnh chưa sẵn sàng hoặc không thuộc tài khoản này.',
  SHOP_MEDIA_TOO_LARGE: 'Ảnh vượt quá dung lượng hoặc số pixel được phép.',
  SHOP_MEDIA_UNSUPPORTED: 'Ảnh không hợp lệ. Dùng JPG/PNG/WebP, đúng kích thước yêu cầu.',
  DOCUMENT_SCANNER_UNAVAILABLE: 'Dịch vụ quét ảnh chưa sẵn sàng. Vui lòng thử lại sau.',
  DOCUMENT_MALWARE_DETECTED: 'Ảnh bị công cụ quét an toàn chặn. Hãy kiểm tra và dùng bản sạch.',
  SHOP_MEDIA_STORAGE_UNAVAILABLE: 'Dịch vụ lưu ảnh đang gián đoạn. Vui lòng thử lại.',
  SHOP_IDEMPOTENCY_PAYLOAD_MISMATCH: 'Lần gửi này đã có nội dung khác. Vui lòng tải lại thông tin.',
  SHOP_RATE_LIMITED: 'Bạn thao tác quá nhanh. Vui lòng chờ rồi thử lại.',
  SHOP_BUSY: 'Gian hàng đang được cập nhật. Vui lòng thử lại.',
  TEMPLATE_NOT_SELECTABLE: 'Mẫu hiện không còn cho chọn mới.',
  TEMPLATE_REVISION_CHANGED: 'Mẫu có phiên bản mới. Vui lòng tải lại danh sách mẫu.',
  TEMPLATE_VERSION_CONFLICT: 'Mẫu đã được chỉnh sửa ở phiên khác. Vui lòng tải lại.',
  TEMPLATE_MINIMUM_CATALOG: 'Cần giữ ít nhất 5 mẫu đang hiển thị.',
  TEMPLATE_DEFAULT_REQUIRED: 'Không thể ẩn mẫu mặc định của hệ thống.',
  TEMPLATE_CODE_IN_USE: 'Mã mẫu đã tồn tại.',
  THEME_TOKENS_INVALID: 'Thông số giao diện không hợp lệ.',
  THEME_CONTRAST_INVALID: 'Độ tương phản chữ và nền phải đạt ít nhất 4.5:1.',
  SHOP_CURSOR_INVALID: 'Danh sách đã thay đổi hoặc hết hạn. Hãy tải lại từ đầu.',
};
export const shopError = (error) => SHOP_ERRORS[error?.errorCode] || error?.message || 'Không thể tải gian hàng.';
export const RENDERERS = [
  { value: 'heritage', label: 'Di sản — banner và lưới sản phẩm' },
  { value: 'royal-gift', label: 'Quà tặng — hero chia đôi' },
  { value: 'minimal-grid', label: 'Tối giản — danh mục bên cạnh' },
  { value: 'artisan-story', label: 'Nghệ nhân — câu chuyện thương hiệu' },
  { value: 'modern-catalog', label: 'Danh mục hiện đại — danh sách sản phẩm' },
];
export const THEME_DEFAULTS = {
  primaryColor: '#8C1524', backgroundColor: '#FAF8F6', textColor: '#222222',
  surfaceColor: '#FFFFFF', buttonTextColor: '#FFFFFF', borderRadiusPx: 12, fontScale: 1,
};
export const TOKEN_LABELS = {
  primaryColor: 'Màu chủ đạo', backgroundColor: 'Nền trang', textColor: 'Màu chữ',
  surfaceColor: 'Nền thẻ', buttonTextColor: 'Chữ trên màu chủ đạo',
};
export const SECTION_OPTIONS = ['Hero', 'Story', 'Products', 'Reviews', 'Contact'].map((value) => ({
  value, label: { Hero: 'Banner', Story: 'Giới thiệu', Products: 'Sản phẩm', Reviews: 'Đánh giá', Contact: 'Liên hệ' }[value],
}));
