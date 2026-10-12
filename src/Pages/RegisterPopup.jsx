import { useEffect, useState, useRef } from 'react';

export default function RegisterPopup({
  isOpen = true,
  onClose,
  onNavigate,
  onSwitchToLogin
}) {
  // Steps: 1: 'phone' -> 2: 'otp' -> 3: 'password' -> 4: 'success'
  const [step, setStep] = useState(1);

  // Form states
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Feedback & Loading
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Countdown timer for OTP resend (60s)
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef(null);

  // Start countdown when entering step 2
  useEffect(() => {
    if (step === 2 && isOpen) {
      setCountdown(60);
      setCanResend(false);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset modal when opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setOtp('');
      setPassword('');
      setConfirmPassword('');
      setErrorMsg('');
      setSuccessMsg('');
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ==========================================
  // HANDLERS
  // ==========================================

  // BƯỚC 1: Xử lý nhập SĐT -> Gửi OTP -> Chuyển sang Bước 2
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanPhone = phone.trim().replace(/\s+/g, '');
    if (!cleanPhone) {
      setErrorMsg('Vui lòng nhập số điện thoại');
      return;
    }

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(cleanPhone)) {
      setErrorMsg('Số điện thoại không đúng định dạng di động (VD: 0912 345 678)');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setSuccessMsg(`Mã xác thực OTP đã được gửi đến số ${cleanPhone}`);
    }, 600);
  };

  // BƯỚC 2: Xử lý Gửi lại OTP
  const handleResendOtp = () => {
    if (!canResend) return;
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCountdown(60);
      setCanResend(false);
      setSuccessMsg('Đã gửi lại mã OTP mới. Vui lòng kiểm tra tin nhắn!');

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 600);
  };

  // BƯỚC 2: Xử lý Xác nhận OTP -> Chuyển sang Bước 3
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanOtp = otp.trim();
    if (!cleanOtp) {
      setErrorMsg('Vui lòng nhập mã OTP gồm 6 chữ số');
      return;
    }
    if (cleanOtp.length < 6) {
      setErrorMsg('Mã OTP phải có đủ 6 chữ số');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
      setSuccessMsg('Xác thực số điện thoại thành công!');
    }, 600);
  };

  // BƯỚC 3: Xử lý Điền mật khẩu -> Hoàn tất đăng ký -> Quay về Login
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!password) {
      setErrorMsg('Vui lòng nhập mật khẩu');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('Vui lòng đồng ý với Điều khoản dịch vụ');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(4); // Màn hình thành công
      // Tự động chuyển về popup login sau 1.8 giây
      setTimeout(() => {
        handleRedirectToLogin();
      }, 1800);
    }, 800);
  };

  // Chuyển sang Popup Login
  const handleRedirectToLogin = () => {
    if (onSwitchToLogin) {
      onSwitchToLogin(phone.trim().replace(/\s+/g, ''));
    } else {
      onClose?.();
      onNavigate?.('dang-nhap');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs transition-opacity"
        id="registerModalOverlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose?.();
        }}
      >
        {/* Modal Box */}
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden transform transition-all duration-300 animate-fade-in-up">

          {/* Top Decorative Gradient Accent */}
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
              title="Đóng modal"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Stepper Progress Bar (3 Bước rõ ràng) */}
          {step <= 3 && (
            <div className="px-6 pt-1 pb-3">
              <div className="flex items-center justify-between relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-stone-200 -translate-y-1/2 z-0"></div>
                <div
                  className="absolute top-1/2 left-4 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-500"
                  style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                ></div>

                {/* Step 1 Node */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= 1 ? 'bg-primary text-white shadow-xs' : 'bg-stone-200 text-stone-500'
                      }`}
                  >
                    {step > 1 ? <span className="material-symbols-outlined text-[15px]">check</span> : '1'}
                  </div>
                  <span className={`text-[10px] mt-1 font-semibold ${step >= 1 ? 'text-primary' : 'text-stone-400'}`}>
                    Nhập SĐT
                  </span>
                </div>

                {/* Step 2 Node */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= 2 ? 'bg-primary text-white shadow-xs' : 'bg-stone-200 text-stone-500'
                      }`}
                  >
                    {step > 2 ? <span className="material-symbols-outlined text-[15px]">check</span> : '2'}
                  </div>
                  <span className={`text-[10px] mt-1 font-semibold ${step >= 2 ? 'text-primary' : 'text-stone-400'}`}>
                    Nhận OTP
                  </span>
                </div>

                {/* Step 3 Node */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === 3 ? 'bg-primary text-white shadow-xs' : 'bg-stone-200 text-stone-500'
                      }`}
                  >
                    3
                  </div>
                  <span className={`text-[10px] mt-1 font-semibold ${step === 3 ? 'text-primary' : 'text-stone-400'}`}>
                    Tạo Mật Khẩu
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Modal Body */}
          <div className="px-6 pb-6 pt-1 space-y-4">

            {/* Feedback Notifications */}
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

            {/* ======================================================= */}
            {/* BƯỚC 1: NHẬP SỐ ĐIỆN THOẠI                               */}
            {/* ======================================================= */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in-up">
                <div>
                  <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                    Đăng Ký Tài Khoản
                  </h2>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    Nhập số điện thoại để nhận mã xác thực OTP tạo tài khoản mua sắm B2B.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handlePhoneSubmit}>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-stone-800">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined text-[18px] text-stone-400 absolute left-3 pointer-events-none">
                        phone_iphone
                      </span>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-stone-900 placeholder:text-stone-400 text-xs transition-all font-medium"
                        placeholder="Ví dụ: 0912 345 678"
                        type="tel"
                        autoFocus
                        required
                      />
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-[#fff8f5] border border-[#ebdcd5] text-[11px] text-stone-600 flex items-start gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-primary shrink-0 mt-0.5">verified_user</span>
                    <span>Nguyệt Phố cam kết bảo mật 100% thông tin số điện thoại của bạn.</span>
                  </div>

                  <button
                    disabled={isLoading}
                    className="animate-shimmer w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-container active:scale-[0.99] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    type="submit"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Đang gửi mã...</span>
                      </span>
                    ) : (
                      <>
                        <span>Tiếp tục nhận mã OTP</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="pt-2 text-center text-xs text-stone-600 border-t border-stone-200">
                  <span>Đã có tài khoản?</span>
                  <button
                    type="button"
                    onClick={handleRedirectToLogin}
                    className="font-bold text-primary hover:underline ml-1.5 cursor-pointer"
                  >
                    Đăng nhập ngay
                  </button>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* BƯỚC 2: NHẬP MÃ OTP & GỬI LẠI OTP                       */}
            {/* ======================================================= */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in-up">
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setErrorMsg('');
                      setSuccessMsg('');
                    }}
                    className="text-xs text-stone-500 hover:text-primary flex items-center gap-1 mb-2 font-medium cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    <span>Đổi số điện thoại khác</span>
                  </button>
                  <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                    Xác Thực Mã OTP
                  </h2>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    Mã xác thực gồm 6 chữ số đã được gửi tới số: <strong className="text-stone-800 font-bold">{phone}</strong>
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleOtpSubmit}>
                  <div className="space-y-1.5 text-center">
                    <label className="block text-xs font-bold text-stone-800 text-left">
                      Nhập mã OTP 6 chữ số <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                      className="w-full py-3 px-4 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-center font-mono text-xl tracking-[0.5em] font-bold text-stone-900 transition-all placeholder:text-stone-300"
                      placeholder="______"
                      maxLength={6}
                      autoFocus
                      required
                    />
                    <div className="text-[11px] text-stone-400">
                      💡 Thử nghiệm nhanh: nhập bất kỳ 6 số (VD: <span className="text-primary font-bold">123456</span>)
                    </div>
                  </div>

                  {/* Resend OTP Bar */}
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs flex items-center justify-between">
                    <span className="text-stone-600">Chưa nhận được mã?</span>
                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-primary font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">refresh</span>
                        <span>Gửi lại mã OTP</span>
                      </button>
                    ) : (
                      <span className="text-stone-400 font-medium">
                        Gửi lại sau <strong className="text-stone-700 font-bold">{countdown}s</strong>
                      </span>
                    )}
                  </div>

                  <button
                    disabled={isLoading}
                    className="animate-shimmer w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-container active:scale-[0.99] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    type="submit"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Đang kiểm tra...</span>
                      </span>
                    ) : (
                      <>
                        <span>Xác nhận mã OTP</span>
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* ======================================================= */}
            {/* BƯỚC 3: ĐIỀN MẬT KHẨU MỚI                                */}
            {/* ======================================================= */}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in-up">
                <div>
                  <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                    Thiết Lập Mật Khẩu
                  </h2>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    Tạo mật khẩu đăng nhập an toàn cho tài khoản SĐT: <strong className="text-stone-800">{phone}</strong>
                  </p>
                </div>

                <form className="space-y-3.5" onSubmit={handlePasswordSubmit}>
                  {/* Password Field */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-stone-800">
                      Mật khẩu mới <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined text-[18px] text-stone-400 absolute left-3 pointer-events-none">
                        lock
                      </span>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-stone-900 placeholder:text-stone-400 text-xs transition-all"
                        placeholder="Tối thiểu 6 ký tự"
                        type={showPassword ? 'text' : 'password'}
                        autoFocus
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer p-0.5"
                        title={showPassword ? 'Ẩn' : 'Hiện'}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-stone-800">
                      Xác nhận mật khẩu <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined text-[18px] text-stone-400 absolute left-3 pointer-events-none">
                        lock_reset
                      </span>
                      <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-stone-900 placeholder:text-stone-400 text-xs transition-all"
                        placeholder="Nhập lại mật khẩu mới"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer p-0.5"
                        title={showConfirmPassword ? 'Ẩn' : 'Hiện'}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showConfirmPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Agree to terms */}
                  <label className="flex items-start gap-2 pt-1 text-xs cursor-pointer select-none">
                    <input
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded text-primary accent-primary cursor-pointer border-stone-300"
                      type="checkbox"
                    />
                    <span className="text-stone-600 text-[11px] leading-tight">
                      Tôi đồng ý với <strong className="text-stone-800">Điều khoản dịch vụ</strong> &amp; <strong className="text-stone-800">Chính sách bảo mật</strong> của Nguyệt Phố.
                    </span>
                  </label>

                  <button
                    disabled={isLoading}
                    className="animate-shimmer w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-container active:scale-[0.99] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    type="submit"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Đang tạo tài khoản...</span>
                      </span>
                    ) : (
                      <>
                        <span>Hoàn tất đăng ký</span>
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* ======================================================= */}
            {/* BƯỚC 4: HOÀN TẤT & QUAY VỀ POPUP LOGIN                  */}
            {/* ======================================================= */}
            {step === 4 && (
              <div className="py-6 text-center space-y-4 animate-fade-in-up">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md animate-pulse">
                  <span className="material-symbols-outlined text-[36px]">check_circle</span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                    Đăng Ký Thành Công!
                  </h2>
                  <p className="text-xs text-stone-600 mt-1 max-w-xs mx-auto leading-relaxed">
                    Tài khoản số <strong className="text-primary font-bold">{phone}</strong> đã sẵn sàng. Đang chuyển về màn hình đăng nhập...
                  </p>
                </div>

                <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary h-full animate-[marqueeScroll_1.8s_linear_infinite]"></div>
                </div>

                <button
                  type="button"
                  onClick={handleRedirectToLogin}
                  className="w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Đăng nhập ngay</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
