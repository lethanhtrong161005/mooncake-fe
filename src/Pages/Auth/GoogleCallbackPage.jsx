import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const STATE_KEY = 'mooncake_google_state';
const RETURN_PAGE_KEY = 'mooncake_google_return_page';

/** Completes the Google redirect and opens the prior Mooncake page. */
export default function GoogleCallbackPage() {
  const { loginWithGoogle } = useAuth();
  const started = useRef(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    const googleError = params.get('error');
    window.history.replaceState(null, '', window.location.pathname);

    const expectedState = sessionStorage.getItem(STATE_KEY);
    const returnPage = sessionStorage.getItem(RETURN_PAGE_KEY) || 'trang-chu';
    sessionStorage.removeItem(STATE_KEY);
    sessionStorage.removeItem(RETURN_PAGE_KEY);
    const showError = (message) => queueMicrotask(() => setError(message));

    if (googleError === 'access_denied') {
      showError('Bạn đã hủy đăng nhập bằng Google.');
      return;
    }
    if (googleError || !code) {
      showError('Không thể xác thực tài khoản Google. Vui lòng thử lại.');
      return;
    }
    if (!state || !expectedState || state !== expectedState) {
      showError('Phiên đăng nhập Google không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.');
      return;
    }

    loginWithGoogle(code, state)
      .then(() => {
        window.location.replace(`/#${encodeURI(returnPage)}`);
      })
      .catch((requestError) => {
        setError(requestError.message || 'Không thể xác thực tài khoản Google. Vui lòng thử lại.');
      });
  }, [loginWithGoogle]);

  const hasError = Boolean(error);

  return (
    <main className={`google-callback${hasError ? ' google-callback--error' : ''}`}>
      <div className="google-callback-ambient" aria-hidden="true" />

      <section className="google-callback-card" aria-labelledby="google-callback-title">
        <div className="google-callback-brand-panel">
          <div className="google-callback-brand">
            <span className="google-callback-brand-mark" aria-hidden="true">N</span>
            <span>Nguyệt Phố</span>
          </div>

          <div className="google-callback-moon-wrap" aria-hidden="true">
            <span className="google-callback-orbit google-callback-orbit--outer" />
            <span className="google-callback-orbit google-callback-orbit--inner" />
            <span className="google-callback-moon">
              <span className="google-callback-moon-pattern" />
            </span>
            <span className="google-callback-star google-callback-star--one">✦</span>
            <span className="google-callback-star google-callback-star--two">✦</span>
          </div>

          <div className="google-callback-brand-copy">
            <span className="google-callback-overline">Một chạm kết nối</span>
            <p>Trở về hành trình quà tặng<br />cùng Nguyệt Phố.</p>
          </div>
        </div>

        <div className="google-callback-content">
          <div className="google-callback-provider">
            <span className="google-callback-provider-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </span>
            <span>Đăng nhập với Google</span>
          </div>

          <div className={`google-callback-status-icon${hasError ? ' is-error' : ''}`}
            aria-hidden="true">
            <span className="material-symbols-outlined">
              {hasError ? 'error_outline' : 'lock_open'}
            </span>
          </div>

          <div className="google-callback-state-label">
            <span className="google-callback-state-dot" aria-hidden="true" />
            {hasError ? 'Cần thử lại' : 'Đang xác thực'}
          </div>

          <h1 id="google-callback-title">
            {hasError ? 'Chưa thể đăng nhập' : 'Đang hoàn tất đăng nhập'}
          </h1>
          <p className="google-callback-message" role={hasError ? 'alert' : 'status'}>
            {error || 'Chúng tôi đang kết nối tài khoản Google của bạn với Nguyệt Phố.'}
          </p>

          {hasError ? (
            <a href="/" className="google-callback-action">
              <span>Về trang chủ để thử lại</span>
              <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
            </a>
          ) : (
            <div className="google-callback-progress" aria-hidden="true"><span /></div>
          )}

          <div className="google-callback-divider" />
          <p className="google-callback-footnote">
            <span className="material-symbols-outlined" aria-hidden="true">verified_user</span>
            {hasError
              ? 'Bạn có thể bắt đầu lại từ trang đăng nhập.'
              : 'Vui lòng giữ trang này mở trong giây lát.'}
          </p>
        </div>
      </section>

      <p className="google-callback-page-footer">NGUYỆT PHỐ · QUÀ TẶNG GẮN KẾT</p>
    </main>
  );
}
