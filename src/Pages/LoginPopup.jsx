import { useEffect, useState } from 'react';
import { Modal, Alert } from 'antd';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/authService';
import AppLogo from '../components/layout/AppLogo';
import LoginForm from './Auth/LoginForm';
import ForgotPasswordForm from './Auth/ForgotPasswordForm';
import { postLoginRoute } from '../utils/roleNavigation';

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
  const [forgotEmail, setForgotEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      onNavigate?.(postLoginRoute(account, returnPage));
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

  // Xử lý quên mật khẩu - gửi mã OTP qua Email
  const handleForgotSubmit = async (e) => {
    e?.preventDefault?.();
    setErrorMsg('');
    setSuccessMsg('');
    const cleanEmail = forgotEmail.trim();
    if (!cleanEmail) {
      setErrorMsg('Vui lòng nhập email đăng ký tài khoản.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMsg('Địa chỉ email không đúng định dạng.');
      return;
    }

    setIsLoading(true);
    try {
      await authService.forgotPassword(cleanEmail);
      setOtpSent(true);
      setSuccessMsg(`Mã xác thực OTP đã được gửi tới email ${cleanEmail}. Vui lòng kiểm tra hộp thư.`);
    } catch (error) {
      setErrorMsg(error.message || 'Không thể gửi mã xác nhận. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý xác nhận OTP và đặt lại mật khẩu mới
  const handleResetPasswordConfirm = async (e) => {
    e?.preventDefault?.();
    setErrorMsg('');
    setSuccessMsg('');

    if (!otpCode.trim() || !/^[0-9]{6}$/.test(otpCode.trim())) {
      setErrorMsg('Vui lòng nhập đúng 6 chữ số mã OTP.');
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      setErrorMsg('Mật khẩu mới phải có tối thiểu 8 ký tự.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp.');
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword({
        email: forgotEmail.trim(),
        code: otpCode.trim(),
        newPassword,
      });
      setSuccessMsg('Đặt lại mật khẩu thành công! Vui lòng đăng nhập với mật khẩu mới.');
      setView('login');
      setOtpSent(false);
      setOtpCode('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setErrorMsg(error.message || 'Không thể đặt lại mật khẩu. Mã OTP có thể đã hết hạn.');
    } finally {
      setIsLoading(false);
    }
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
            forgotEmail={forgotEmail}
            setForgotEmail={setForgotEmail}
            otpSent={otpSent}
            otpCode={otpCode}
            setOtpCode={setOtpCode}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            onSubmit={handleForgotSubmit}
            onConfirmReset={handleResetPasswordConfirm}
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
