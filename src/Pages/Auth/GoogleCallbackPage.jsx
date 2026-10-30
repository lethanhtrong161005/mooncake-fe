import { useEffect, useRef, useState } from 'react';
import { Card, Result, Button, Spin, Typography, Divider } from 'antd';
import {
  LoadingOutlined,
  HomeOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import AppLogo from '../../components/layout/AppLogo';

const { Title, Paragraph } = Typography;

const STATE_KEY = 'mooncake_google_state';
const RETURN_PAGE_KEY = 'mooncake_google_return_page';

/**
 * Completes the Google OAuth redirect and opens the prior Mooncake page.
 * Powered by Ant Design.
 */
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
      .then((response) => {
        const account = response?.data?.user;
        const destination = returnPage !== 'trang-chu' ? returnPage :
          account?.role === 'Admin' ? 'admin/phe-duyet' :
            account?.role === 'Supplier' && account?.capabilities?.canCreateShop ? 'nha-cung-cap/ho-so' :
              account?.requestedRole === 'Supplier' ? 'dang-ky-nha-cung-cap' : 'trang-chu';
        window.location.replace(`/#${encodeURI(destination)}`);
      })
      .catch((requestError) => {
        setError(requestError.message || 'Không thể xác thực tài khoản Google. Vui lòng thử lại.');
      });
  }, [loginWithGoogle]);

  const hasError = Boolean(error);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fdf8f5 0%, #f7ece5 50%, #eee0d7 100%)',
        padding: '24px 16px',
      }}
    >
      <Card
        bordered={false}
        style={{
          width: 460,
          maxWidth: '100%',
          borderRadius: 20,
          boxShadow: '0 20px 60px rgba(140, 21, 36, 0.1)',
          border: '1px solid #ebdcd5',
          overflow: 'hidden',
          textAlign: 'center',
        }}
        styles={{
          body: {
            padding: '36px 32px',
          },
        }}
      >
        {/* Brand Header */}
        <div style={{ marginBottom: 24 }}>
          <AppLogo
            size="large"
            subtitle="Xác Thực Đăng Nhập Google"
            onClick={() => window.location.replace('/#trang-chu')}
            style={{ cursor: 'pointer' }}
          />
        </div>

        {hasError ? (
          /* Error State */
          <Result
            status="error"
            title="Chưa Thể Đăng Nhập"
            subTitle={error || 'Không thể xác thực tài khoản Google của bạn.'}
            extra={[
              <Button
                type="primary"
                key="home"
                size="large"
                icon={<HomeOutlined />}
                style={{
                  background: '#8c1524',
                  borderColor: '#8c1524',
                  fontWeight: 700,
                  borderRadius: 8,
                  padding: '0 28px',
                }}
                onClick={() => window.location.replace('/#trang-chu')}
              >
                Về Trang Chủ Thử Lại
              </Button>,
            ]}
          />
        ) : (
          /* Loading & Processing State */
          <div>
            {/* Google provider badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#ffffff',
                border: '1px solid #e0e0e0',
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                color: '#555',
                marginBottom: 28,
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Đăng nhập với Google</span>
            </div>

            <div style={{ margin: '10px 0 24px' }}>
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 48, color: '#8c1524' }}
                    spin
                  />
                }
              />
            </div>

            <Title level={4} style={{ margin: '0 0 8px', color: '#1f1f1f' }}>
              Đang Hoàn Tất Đăng Nhập...
            </Title>
            <Paragraph style={{ fontSize: 13, color: '#666', maxWidth: 340, margin: '0 auto 20px', lineHeight: 1.6 }}>
              Chúng tôi đang kết nối tài khoản Google của bạn với Nguyệt Phố. Vui lòng giữ trang này mở trong giây lát.
            </Paragraph>
          </div>
        )}

        <Divider style={{ margin: '20px 0 16px', borderColor: '#f0e6e0' }} />

        {/* Security Footnote */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 11, color: '#888' }}>
          <SafetyCertificateOutlined style={{ color: '#2e7d32', fontSize: 14 }} />
          <span>Bảo mật an toàn chuẩn SSL 256-bit</span>
        </div>
      </Card>

      <div style={{ marginTop: 20, fontSize: 11, color: '#999', letterSpacing: '0.5px' }}>
        NGUYỆT PHỐ · SÀN GIAO DỊCH BÁNH TRUNG THU DOANH NGHIỆP
      </div>
    </main>
  );
}
