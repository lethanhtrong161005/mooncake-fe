import ErrorPage from './ErrorPage';

export default function NotFoundPage({ onNavigate }) {
  return (
    <ErrorPage
      code="404"
      title="Không tìm thấy trang bạn cần."
      description="Đường dẫn có thể đã thay đổi. Hãy về trang chủ hoặc tiếp tục khám phá sản phẩm."
      onNavigate={onNavigate}
    />
  );
}
