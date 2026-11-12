import ErrorPage from './ErrorPage';

export default function AccessDeniedPage({ onNavigate, onLogin }) {
  return (
    <ErrorPage
      code="403"
      title="Bạn chưa thể vào trang này."
      description={onLogin
        ? 'Hãy đăng nhập bằng tài khoản có quyền truy cập để tiếp tục.'
        : 'Tài khoản hiện tại không có quyền truy cập. Bạn có thể quay về trang chủ hoặc xem sản phẩm.'}
      onNavigate={onNavigate}
      onLogin={onLogin}
    />
  );
}
