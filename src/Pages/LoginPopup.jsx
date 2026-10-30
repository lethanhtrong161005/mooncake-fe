import { useEffect, useState } from 'react';
import { Modal, Alert } from 'antd';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/authService';
import AppLogo from '../components/layout/AppLogo';
import LoginForm from './Auth/LoginForm';
import ForgotPasswordForm from './Auth/ForgotPasswordForm';

export default function LoginPopup(props) {
  if (!props.isOpen) return null;
  return <LoginPopupContent {...props} />;
}

function LoginPopupContent({
  isOpen = true,
  onClose,
  onNavigate,
  onSwitchToRegister,
  initialPhone = '',
  returnPage,
}) {
  // Form states
  const [phone, setPhone] = useState(initialPhone);
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [view, setView] = useState('login'); // 'login' | 'forgot'
  const [forgotPhone, setForgotPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(
    initialPhone ? 'Đăng ký tài khoản thành công! Vui lòng nhập mật khẩu để đăng nhập.' : ''
  );
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
    e?.preventDefault?.();
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
      const response = await login(cleanPhone, password);
      setSuccessMsg('Đăng nhập thành công');
      setPassword('');
      onClose?.();
      const account = response?.data?.user;
      onNavigate?.(account?.role === 'Admin' ? 'admin/phe-duyet' :
        account?.role === 'Supplier' && account?.capabilities?.canCreateShop ? 'nha-cung-cap/ho-so' :
          returnPage || (account?.requestedRole === 'Supplier' ? 'dang-ky-nha-cung-cap' : 'trang-chu'));
    } catch (error) {
      setErrorMsg(error.message || 'Số điện thoại hoặc mật khẩu không chính xác.');
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
      sessionStorage.setItem(
        'mooncake_google_return_page',
        window.location.hash.replace(/^#/, '') || 'trang-chu'
      );
      window.location.assign(authorizationUrl);
    } catch (error) {
      setErrorMsg(error.message || 'Không thể bắt đầu đăng nhập Google. Vui lòng thử lại.');
      setIsLoading(false);
    }
  };

  // Xử lý quên mật khẩu
  const handleForgotSubmit = (e) => {
    e?.preventDefault?.();
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
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={440}
      styles={{
        content: {
          padding: 0,
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25)',
        },
      }}
    >
      <div style={{ padding: '24px 28px 28px' }}>
        {/* Brand Header */}
        <AppLogo
          size="default"
          subtitle="Sàn Giao Dịch Bánh Trung Thu Doanh Nghiệp"
          style={{ marginBottom: 18 }}
        />

        {/* Feedback Messages */}
        {errorMsg && (
          <Alert message={errorMsg} type="error" showIcon style={{ marginBottom: 14, borderRadius: 8 }} />
        )}
        {successMsg && (
          <Alert message={successMsg} type="success" showIcon style={{ marginBottom: 14, borderRadius: 8 }} />
        )}

        {/* View Switching: Login or Forgot Password */}
        {view === 'login' ? (
          <LoginForm
            phone={phone}
            setPhone={setPhone}
            password={password}
            setPassword={setPassword}
            onSubmit={handleLoginSubmit}
            onGoogleLogin={handleGoogleLogin}
            onForgotPassword={() => {
              setView('forgot');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            onGoToRegister={handleGoToRegister}
            isLoading={isLoading}
          />
        ) : (
          <ForgotPasswordForm
            forgotPhone={forgotPhone}
            setForgotPhone={setForgotPhone}
            otpSent={otpSent}
            otpCode={otpCode}
            setOtpCode={setOtpCode}
            onSubmit={handleForgotSubmit}
            onConfirmReset={() => {
              setSuccessMsg('Đã xác thực OTP thành công! Vui lòng đặt mật khẩu mới.');
            }}
            onBackToLogin={() => {
              setView('login');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            isLoading={isLoading}
          />
        )}
      </div>
    </Modal>
  );
}
