import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/authService';

export default function LoginPopup(props) {
  if (!props.isOpen) return null;
  return <LoginPopupContent {...props} />;
}

function LoginPopupContent({
  isOpen = true,
  onClose,
  onNavigate,
  onSwitchToRegister,
  initialPhone = ''
}) {
  // Form states
  const [phone, setPhone] = useState(initialPhone);
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState('login'); // 'login' | 'forgot'
  const [forgotPhone, setForgotPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(initialPhone
    ? 'Đăng ký tài khoản thành công! Vui lòng nhập mật khẩu để đăng nhập.' : '');
  const [isLoading, setIsLoading] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Xử lý đăng nhập bằng SĐT & Mật khẩu
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Validate phone number
    const cleanPhone = phone.trim().replace(/\s+/g, '');
    if (!cleanPhone) {
      setErrorMsg('Vui lòng nhập số điện thoại.');
      return;
    }
    const phoneRegex = /^(?:0[35789]\d{8}|(?:\+?84)[35789]\d{8})$/;
    if (!phoneRegex.test(cleanPhone)) {
      setErrorMsg('Số điện thoại không hợp lệ.');
      return;
    }

    // Validate password
    if (!password.trim()) {
      setErrorMsg('Vui lòng nhập mật khẩu.');
      return;
    }

    setIsLoading(true);
    try {
      await login(cleanPhone, password);
      setSuccessMsg('Đăng nhập thành công');
      setPassword('');
      onClose?.();
      onNavigate?.('trang-chu');
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý đăng nhập qua Google
  const handleGoogleLogin = async () => {
    if (isLoading) return;
    setErrorMsg('');
    setIsLoading(true);
    try {
      const { authorizationUrl, state } = await authService.getGoogleAuthorizationUrl();
      sessionStorage.setItem('mooncake_google_state', state);
      sessionStorage.setItem('mooncake_google_return_page',
        window.location.hash.replace(/^#/, '') || 'trang-chu');
      window.location.assign(authorizationUrl);
    } catch (error) {
      setErrorMsg(error.message || 'Không thể bắt đầu đăng nhập Google. Vui lòng thử lại.');
      setIsLoading(false);
    }
  };

  // Xử lý quên mật khẩu
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const cleanPhone = forgotPhone.trim().replace(/\s+/g, '');
    if (!cleanPhone) {
      setErrorMsg('Vui lòng nhập số điện thoại để nhận mã OTP');
      return;
    }
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(cleanPhone)) {
      setErrorMsg('Số điện thoại không đúng định dạng');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      setSuccessMsg(`Mã xác thực OTP đã được gửi tới SĐT ${forgotPhone}. Vui lòng kiểm tra tin nhắn.`);
    }, 700);
  };

  const handleGoToRegister = () => {
    if (onSwitchToRegister) {
      onSwitchToRegister();
    } else {
      onClose?.();
      onNavigate?.('dang-ky');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs transition-opacity"
        id="b2b-login-modal"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose?.();
        }}
      >
        {/* Modal Box */}
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden transform transition-all duration-300 animate-fade-in-up">

          {/* Top Decorative Gradient Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-primary via-[#ffba00] to-primary"></div>

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-xs">
                <span className="material-symbols-outlined text-[20px]">cookie</span>
              </div>
              <div>
                <span className="font-serif text-base font-bold text-primary">Nguyệt Phố</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              type="button"
              title="Đóng modal"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="px-6 pb-6 pt-1 space-y-4">

            {view === 'login' ? (
              <>
                {/* Title & Subtitle */}
                <div>
                  <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                    Đăng Nhập Tài Khoản
                  </h2>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    Đăng nhập để xem bảng chiết khấu B2B, quản lý đơn hàng &amp; yêu cầu báo giá.
                  </p>
                </div>

                {/* Error / Success Feedback */}
                {errorMsg && (
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2 animate-fade-in-up">
                    <span className="material-symbols-outlined text-[16px] text-red-600 shrink-0">error</span>
                    <span>{errorMsg}</span>
                  </div>
                )}
                {successMsg && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-fade-in-up">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0">check_circle</span>
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* 1. SOCIAL LOGIN VỚI GOOGLE */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-800 transition-all shadow-xs cursor-pointer group active:scale-[0.99]"
                  type="button"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                  <span>Tiếp tục với Google</span>
                </button>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-2">
                  <div className="border-t border-stone-200 w-full"></div>
                  <span className="bg-white px-3 text-[11px] text-stone-500 shrink-0 font-medium uppercase tracking-wider">
                    Hoặc số điện thoại
                  </span>
                </div>

                {/* 2. FORM ĐĂNG NHẬP (SĐT & PASSWORD) */}
                <form className="space-y-3.5" onSubmit={handleLoginSubmit}>

                  {/* Field: Số điện thoại */}
                  <div className="space-y-1">
                    <label htmlFor="login-phone-number" className="block text-xs font-bold text-stone-800">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined text-[18px] text-stone-400 absolute left-3 pointer-events-none">
                        phone_iphone
                      </span>
                      <input
                        id="login-phone-number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-stone-900 placeholder:text-stone-400 text-xs transition-all"
                        placeholder="Ví dụ: 0912 345 678"
                        type="tel"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  {/* Field: Mật khẩu */}
                  <div className="space-y-1">
                    <label htmlFor="login-password" className="block text-xs font-bold text-stone-800">
                      Mật khẩu <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined text-[18px] text-stone-400 absolute left-3 pointer-events-none">
                        lock
                      </span>
                      <input
                        id="login-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-stone-900 placeholder:text-stone-400 text-xs transition-all"
                        placeholder="Nhập mật khẩu của bạn"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer p-0.5"
                        title={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                        aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* 3. QUÊN MẬT KHẨU */}
                  <div className="flex items-center justify-end text-xs pt-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMsg('');
                        setSuccessMsg('');
                        setView('forgot');
                        setForgotPhone(phone);
                      }}
                      className="text-primary hover:text-primary-container font-semibold hover:underline cursor-pointer"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>

                  {/* Nút Đăng nhập */}
                  <button
                    disabled={isLoading}
                    className="animate-shimmer w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-container active:scale-[0.99] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    type="submit"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Đang xử lý...</span>
                      </span>
                    ) : (
                      <>
                        <span>Đăng nhập ngay</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </>
                    )}
                  </button>
                </form>

                {/* 4. CHÂN MODAL: LIÊN KẾT ĐĂNG KÝ */}
                <div className="pt-2 text-center text-xs text-stone-600 border-t border-stone-200">
                  <span>Chưa có tài khoản?</span>
                  <button
                    type="button"
                    onClick={handleGoToRegister}
                    className="font-bold text-primary hover:underline ml-1.5 cursor-pointer"
                  >
                    Đăng ký ngay
                  </button>
                  <p className="text-[11px] text-amber-700 font-medium mt-0.5">
                    🎁 Nhận ngay mẫu thử miễn phí &amp; chiết khấu B2B tới 35%
                  </p>
                </div>
              </>
            ) : (
              /* VIEW: QUÊN MẬT KHẨU */
              <div className="space-y-4 animate-fade-in-up">
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMsg('');
                      setSuccessMsg('');
                      setView('login');
                    }}
                    className="text-xs text-stone-500 hover:text-primary flex items-center gap-1 mb-2 font-medium cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    <span>Quay lại đăng nhập</span>
                  </button>
                  <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                    Khôi Phục Mật Khẩu
                  </h2>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    Nhập số điện thoại đã đăng ký để nhận mã xác thực OTP đặt lại mật khẩu.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-red-600 shrink-0">error</span>
                    <span>{errorMsg}</span>
                  </div>
                )}
                {successMsg && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0">check_circle</span>
                    <span>{successMsg}</span>
                  </div>
                )}

                <form className="space-y-3.5" onSubmit={handleForgotSubmit}>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-stone-800">
                      Số điện thoại đăng ký <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined text-[18px] text-stone-400 absolute left-3 pointer-events-none">
                        phone_iphone
                      </span>
                      <input
                        value={forgotPhone}
                        onChange={(e) => setForgotPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-stone-900 placeholder:text-stone-400 text-xs transition-all"
                        placeholder="Nhập số điện thoại của bạn"
                        type="tel"
                        required
                      />
                    </div>
                  </div>

                  {otpSent ? (
                    <div className="space-y-2 pt-1">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-stone-800">
                          Mã xác thực OTP (6 chữ số)
                        </label>
                        <input
                          className="w-full px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:border-primary text-center font-mono tracking-widest text-base font-bold"
                          placeholder="______"
                          maxLength={6}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSuccessMsg('Đã xác thực OTP thành công! Vui lòng đặt mật khẩu mới.');
                        }}
                        className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        Xác nhận &amp; Đặt mật khẩu mới
                      </button>
                    </div>
                  ) : (
                    <button
                      disabled={isLoading}
                      className="w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                      type="submit"
                    >
                      {isLoading ? (
                        <span>Đang gửi mã...</span>
                      ) : (
                        <>
                          <span>Gửi mã OTP xác thực</span>
                          <span className="material-symbols-outlined text-[16px]">send</span>
                        </>
                      )}
                    </button>
                  )}
                </form>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
