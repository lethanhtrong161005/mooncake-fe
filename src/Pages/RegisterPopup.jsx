import { useEffect, useState, useRef } from 'react';
import { Modal, Steps, Alert } from 'antd';
import AppLogo from '../components/layout/AppLogo';
import RegisterPhoneStep from './Auth/RegisterPhoneStep';
import RegisterOtpStep from './Auth/RegisterOtpStep';
import RegisterPasswordStep from './Auth/RegisterPasswordStep';
import RegisterSuccessStep from './Auth/RegisterSuccessStep';

export default function RegisterPopup({
  isOpen = true,
  onClose,
  onNavigate,
  onSwitchToLogin,
}) {
  // Steps: 1: 'phone' -> 2: 'otp' -> 3: 'password' -> 4: 'success'
  const [step, setStep] = useState(1);

  // Form states
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  // BƯỚC 1: Xử lý nhập SĐT -> Gửi OTP -> Chuyển sang Bước 2
  const handlePhoneSubmit = (e) => {
    e?.preventDefault?.();
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
    e?.preventDefault?.();
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
    e?.preventDefault?.();
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
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={460}
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
          subtitle="Tạo Tài Khoản Khách Hàng Doanh Nghiệp"
          style={{ marginBottom: 18 }}
        />

        {/* Stepper (3 Bước) */}
        {step <= 3 && (
          <div style={{ marginBottom: 20 }}>
            <Steps
              size="small"
              current={step - 1}
              items={[
                { title: 'Nhập SĐT' },
                { title: 'Nhận OTP' },
                { title: 'Tạo Mật Khẩu' },
              ]}
            />
          </div>
        )}

        {/* Feedback Notifications */}
        {errorMsg && (
          <Alert message={errorMsg} type="error" showIcon style={{ marginBottom: 14, borderRadius: 8 }} />
        )}
        {successMsg && (
          <Alert message={successMsg} type="success" showIcon style={{ marginBottom: 14, borderRadius: 8 }} />
        )}

        {/* Step 1: Nhập Số Điện Thoại */}
        {step === 1 && (
          <RegisterPhoneStep
            phone={phone}
            setPhone={setPhone}
            onSubmit={handlePhoneSubmit}
            onGoToLogin={handleRedirectToLogin}
            isLoading={isLoading}
          />
        )}

        {/* Step 2: Xác Thực Mã OTP */}
        {step === 2 && (
          <RegisterOtpStep
            phone={phone}
            otp={otp}
            setOtp={setOtp}
            onSubmit={handleOtpSubmit}
            onResendOtp={handleResendOtp}
            onBackToPhone={() => {
              setStep(1);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            canResend={canResend}
            countdown={countdown}
            isLoading={isLoading}
          />
        )}

        {/* Step 3: Thiết Lập Mật Khẩu */}
        {step === 3 && (
          <RegisterPasswordStep
            phone={phone}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            agreeTerms={agreeTerms}
            setAgreeTerms={setAgreeTerms}
            onSubmit={handlePasswordSubmit}
            isLoading={isLoading}
          />
        )}

        {/* Step 4: Hoàn Tất Đăng Ký */}
        {step === 4 && (
          <RegisterSuccessStep
            phone={phone}
            onRedirectToLogin={handleRedirectToLogin}
          />
        )}
      </div>
    </Modal>
  );
}
