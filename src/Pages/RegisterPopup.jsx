import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Checkbox, Form, Input, Modal, Result, Space, Steps, Typography } from 'antd';
import AppLogo from '../components/layout/AppLogo';
import authService from '../services/authService';

function RegistrationFlow({ onClose, onNavigate, onSwitchToLogin }) {
  const [step, setStep] = useState(0);
  const [account, setAccount] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [resendAt, setResendAt] = useState(0);
  const [now, setNow] = useState(Date.now);
  const submitting = useRef(false);
  const remaining = Math.max(0, Math.ceil((resendAt - now) / 1000));
  useEffect(() => {
    if (step !== 1) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [step]);
  const run = async (action) => {
    if (submitting.current) return;
    submitting.current = true;
    setBusy(true);
    setError('');
    try { await action(); }
    catch (failure) { setError(failure.message); }
    finally { submitting.current = false; setBusy(false); }
  };
  const login = () => {
    if (onSwitchToLogin) onSwitchToLogin(account?.phone || '');
    else { onClose?.(); onNavigate?.('dang-nhap'); }
  };
  const cooldown = () => { setNow(Date.now()); setResendAt(Date.now() + 60000); };
  return <Modal open centered width={520} footer={null} destroyOnHidden
    onCancel={busy ? undefined : onClose} closable={!busy} maskClosable={!busy} keyboard={!busy}>
    <AppLogo subtitle="Đăng ký tài khoản Mooncake" style={{ marginBottom: 24 }} />
    <Steps size="small" current={step === 3 ? 1 : step} style={{ marginBottom: 24 }} items={[
      { title: 'Thông tin' }, { title: 'Xác minh email' }, { title: 'Hoàn tất' },
    ]} />
    {error && <Alert type="error" showIcon title={error} style={{ marginBottom: 16 }} />}
    {step === 0 && <Form layout="vertical" disabled={busy}
      onFinish={(values) => run(async () => {
        await authService.register(values);
        // Passwords are only passed to the API, never stored in browser storage.
        setAccount({ email: values.email.trim(), phone: values.phone });
        cooldown();
        setStep(1);
      })}>
      <Alert type="info" showIcon title="Tạo tài khoản khách hàng. Sau khi đăng nhập, bạn có thể đăng ký mở gian hàng và gửi hồ sơ xét duyệt."
        style={{ marginBottom: 16 }} />
      <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true, whitespace: true, max: 100 }]}><Input maxLength={100} autoComplete="name" /></Form.Item>
      <Form.Item name="email" label="Email nhận mã xác minh" rules={[{ required: true }, { type: 'email', max: 255 }]}><Input autoComplete="email" /></Form.Item>
      <Form.Item name="phone" label="Số điện thoại đăng nhập" rules={[{ required: true },
        { pattern: /^(?:0[35789]\d{8}|(?:\+?84)[35789]\d{8})$/, message: 'Nhập số điện thoại di động hợp lệ.' }]}><Input autoComplete="tel" maxLength={20} /></Form.Item>
      <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, min: 8, max: 100 }]}><Input.Password autoComplete="new-password" /></Form.Item>
      <Form.Item name="confirmPassword" label="Xác nhận mật khẩu" dependencies={['password']} rules={[{ required: true },
        ({ getFieldValue }) => ({ validator: (_, value) => !value || value === getFieldValue('password') ?
          Promise.resolve() : Promise.reject(new Error('Mật khẩu xác nhận không khớp.')) })]}><Input.Password autoComplete="new-password" /></Form.Item>
      <Form.Item name="agreeTerms" valuePropName="checked" rules={[{ validator: (_, value) => value ?
        Promise.resolve() : Promise.reject(new Error('Vui lòng đồng ý với điều khoản dịch vụ.')) }]}>
        <Checkbox>Tôi đồng ý với điều khoản dịch vụ và chính sách bảo mật</Checkbox>
      </Form.Item>
      <Button block type="primary" htmlType="submit" loading={busy}>Đăng ký & nhận mã email</Button>
      <Button block type="link" onClick={login}>Đã có tài khoản? Đăng nhập</Button>
      <Button block type="link" onClick={() => setStep(3)}>Đã đăng ký? Tiếp tục xác minh email</Button>
    </Form>}
    {step === 1 && <Space orientation="vertical" style={{ width: '100%' }}>
      <Typography.Paragraph>Nhập mã 6 số của <strong>{account.email}</strong>. Mã có hiệu lực 10 phút; nếu chưa nhận được, hãy gửi lại mã.</Typography.Paragraph>
      <Form layout="vertical" disabled={busy} onFinish={({ code }) => run(async () => {
        await authService.verifyEmail(account.email, code);
        setStep(2);
      })}>
        <Form.Item name="code" label="Mã xác minh email" rules={[{ required: true },
          { pattern: /^[0-9]{6}$/, message: 'Nhập đủ 6 chữ số.' }]}><Input autoComplete="one-time-code" inputMode="numeric" maxLength={6} /></Form.Item>
        <Button block type="primary" htmlType="submit" loading={busy}>Xác minh email</Button>
      </Form>
      <Button disabled={remaining > 0 || busy} onClick={() => run(async () => {
        await authService.resendVerification(account.email);
        cooldown();
      })}>{remaining > 0 ? 'Gửi lại sau ' + remaining + 's' : 'Gửi lại mã xác minh'}</Button>
      <Button type="link" disabled={busy} onClick={login}>Đăng nhập hoặc tiếp tục xác minh sau</Button>
    </Space>}
    {step === 2 && <Result status="success" title="Email đã được xác minh"
      subTitle="Đăng nhập để mua hàng hoặc đăng ký mở gian hàng từ trang chủ."
      extra={<Button type="primary" onClick={login}>Đăng nhập ngay</Button>} />}
    {step === 3 && <Form layout="vertical" onFinish={({ email }) => {
      setAccount({ email: email.trim() });
      setStep(1);
    }}>
      <Form.Item name="email" label="Email đã đăng ký" rules={[{ required: true }, { type: 'email' }]}><Input autoComplete="email" /></Form.Item>
      <Button block type="primary" htmlType="submit">Tiếp tục xác minh</Button>
    </Form>}
  </Modal>;
}

export default function RegisterPopup({ isOpen = true, ...props }) {
  return isOpen ? <RegistrationFlow {...props} /> : null;
}
