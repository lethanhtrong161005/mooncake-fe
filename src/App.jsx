import { useState, useEffect, lazy, Suspense } from 'react';
import { App as AntApp, Button, ConfigProvider, FloatButton, Dropdown, Result, Spin } from 'antd';
import { useAuth } from './hooks/useAuth';
import { hasSupplierWorkspace } from './utils/supplierAccess';
import SupplierRegistration from './Pages/Customer/SupplierRegistration';
import { CompassOutlined } from '@ant-design/icons';
import antdTheme from './theme/antdTheme';

// Customer / General Pages
import HomePage from './Pages/HomePage';
import SearchPage from './Pages/SearchPage';
import Notification from './Pages/Notification';
import ProductInformation from './Pages/Products/ProductInformation';
import OrderAndDesgin from './Pages/Customer/OrderAndDesgin';
import PackagingAndLogoPrinting from './Pages/Customer/PackagingAndLogoPrinting';
import BiddingAndQuoteComparison from './Pages/Customer/BiddingAndQuoteComparison';
import ContractsAndMilestone from './Pages/Customer/ContractsAndMilestone';
import DeliveryPoD from './Pages/Customer/DeliveryPoD';
import PaymentAndRate from './Pages/Customer/PaymentAndRate';
import CustomerProfile from './Pages/Customer/CustomerProfile';

// Supplier Pages
import { currentRoute, routeUrl } from './utils/shopRoutes';
import ProductManage from './Pages/Supplier/ProductManage';
import BiddingPage from './Pages/Supplier/BiddingPage';
import OrderManage from './Pages/Supplier/OrderManage';
import ContractManage from './Pages/Supplier/ContractManage';
import DeliverManage from './Pages/Supplier/DeliverManage';
import SuppilerProfile from './Pages/Supplier/SuppilerProfile';

// Admin Pages
import DashBoard from './Pages/Admin/DashBoard';
import ApprovePage from './Pages/Admin/ApprovePage';
import TradingOperating from './Pages/Admin/TradingOperating';
import SystemControll from './Pages/Admin/SystemControll';
import ControllerPage from './Pages/Admin/ControllerPage';
import AdminProfile from './Pages/Admin/AdminProfile';

// Popups (Preserved Auth Flow)
import LoginPopup from './Pages/LoginPopup';
import RegisterPopup from './Pages/RegisterPopup';
import GoogleCallbackPage from './Pages/Auth/GoogleCallbackPage';

const StoreSetUp = lazy(() => import('./Pages/Supplier/StoreSetUp'));
const ShopAppearance = lazy(() => import('./Pages/Supplier/ShopAppearance'));
const PublicShopPage = lazy(() => import('./Pages/PublicShopPage'));
const ShopManagement = lazy(() => import('./Pages/Admin/ShopManagement'));
const ShopTemplates = lazy(() => import('./Pages/Admin/ShopTemplates'));

export default function App() {
  const { user, isLoggedIn, isRestoring } = useAuth();
  const [currentPage, setCurrentPage] = useState(currentRoute);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [prefilledPhone, setPrefilledPhone] = useState('');

  const navigateTo = (pageKey) => {
    let target = pageKey;

    // Normalizations & aliases
    if (pageKey === 'thiet-lap-gian-hang') target = 'dang-ky-nha-cung-cap';
    if (pageKey === 'bo-suu-tap-banh' || pageKey === 'san-pham-co-san') target = 'tim-kiem';
    if (pageKey === 'dat-hang-doanh-nghiep') target = 'dat-hang-thiet-ke';
    if (pageKey === 'yeu-cau-bao-gia') target = 'in-an-bao-bi';
    if (pageKey === 'so-sanh-thau-rfq' || pageKey === 'bao-gia-va-so-sanh-thau') target = 'so-sanh-bao-gia';
    if (pageKey === 'dang-ky-mau-thu') target = 'san-pham';
    if (pageKey === 'danh-gia-va-phe-duyet-mau-thu') target = 'thanh-toan-danh-gia';
    if (pageKey === 'hop-dong-dien-tu' || pageKey === 'electric-contact') target = 'hop-dong-tien-do';
    if (pageKey === 'dang-nhap') {
      setShowLogin(true);
      return;
    }
    if (pageKey === 'dang-ky') {
      setShowRegister(true);
      return;
    }

    const proceed = () => {
      setCurrentPage(target);
      window.history.pushState(null, '', routeUrl(target));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    if (window.dispatchEvent(new CustomEvent('app:before-navigate', { cancelable: true, detail: { proceed } }))) proceed();
  };

  useEffect(() => {
    const handleHashChange = () => {
      const target = currentRoute();
      if (target === currentPage) return;
      const proceed = () => { setCurrentPage(target); window.history.replaceState(null, '', routeUrl(target)); };
      if (window.dispatchEvent(new CustomEvent('app:before-navigate', { cancelable: true, detail: { proceed } }))) proceed();
      else window.history.replaceState(null, '', routeUrl(currentPage));
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [currentPage]);

  useEffect(() => {
    const handleExpiredSession = () => setShowLogin(true);
    window.addEventListener('auth:unauthorized', handleExpiredSession);
    return () => window.removeEventListener('auth:unauthorized', handleExpiredSession);
  }, []);

  const renderPage = () => {
    if (currentPage.startsWith('shop/')) return <PublicShopPage key={currentPage} slug={currentPage.slice(5)} onNavigate={navigateTo} />;
    switch (currentPage) {
      // Role 1: Customer (Khách hàng doanh nghiệp B2B)
      case 'trang-chu':
        return <HomePage onNavigate={navigateTo} />;
      case 'tim-kiem':
      case 'bo-suu-tap-banh':
        return <SearchPage onNavigate={navigateTo} />;
      case 'san-pham':
        return <ProductInformation onNavigate={navigateTo} />;
      case 'dat-hang-thiet-ke':
      case 'dat-hang-doanh-nghiep':
        return <OrderAndDesgin onNavigate={navigateTo} />;
      case 'in-an-bao-bi':
      case 'yeu-cau-bao-gia':
        return <PackagingAndLogoPrinting onNavigate={navigateTo} />;
      case 'so-sanh-bao-gia':
      case 'so-sanh-thau-rfq':
        return <BiddingAndQuoteComparison onNavigate={navigateTo} />;
      case 'hop-dong-tien-do':
      case 'hop-dong-dien-tu':
        return <ContractsAndMilestone onNavigate={navigateTo} />;
      case 'giao-hang-pod':
        return <DeliveryPoD onNavigate={navigateTo} />;
      case 'thanh-toan-danh-gia':
      case 'danh-gia-va-phe-duyet-mau-thu':
        return <PaymentAndRate onNavigate={navigateTo} />;
      case 'ho-so-khach-hang':
        return <CustomerProfile onNavigate={navigateTo} />;
      case 'thong-bao':
        return <Notification onNavigate={navigateTo} />;

      // Role 2: Supplier (Nhà cung cấp / Xưởng bánh B2B)
      case 'dang-ky-nha-cung-cap':
      case 'nha-cung-cap/xac-minh':
        return hasSupplierWorkspace(user) ? <SuppilerProfile onNavigate={navigateTo} /> :
          <SupplierRegistration onNavigate={navigateTo} />;
      case 'nha-cung-cap/thiet-lap-gian-hang':
        return <StoreSetUp onNavigate={navigateTo} />;
      case 'nha-cung-cap/giao-dien-gian-hang':
        return <ShopAppearance onNavigate={navigateTo} />;
      case 'nha-cung-cap/quan-ly-san-pham':
        return <ProductManage onNavigate={navigateTo} />;
      case 'nha-cung-cap/dau-thau':
        return <BiddingPage onNavigate={navigateTo} />;
      case 'nha-cung-cap/quan-ly-don-hang':
        return <OrderManage onNavigate={navigateTo} />;
      case 'nha-cung-cap/quan-ly-hop-dong':
        return <ContractManage onNavigate={navigateTo} />;
      case 'nha-cung-cap/quan-ly-giao-hang':
        return <DeliverManage onNavigate={navigateTo} />;
      case 'nha-cung-cap/ho-so':
        return hasSupplierWorkspace(user) ? <SuppilerProfile onNavigate={navigateTo} /> :
          <SupplierRegistration onNavigate={navigateTo} />;

      // Role 3: Admin (Quản trị viên sàn B2B)
      case 'admin/dashboard':
        return <DashBoard onNavigate={navigateTo} />;
      case 'admin/phe-duyet':
        return <ApprovePage onNavigate={navigateTo} />;
      case 'admin/van-hanh-giao-dich':
        return <TradingOperating onNavigate={navigateTo} />;
      case 'admin/kiem-soat-he-thong':
        return <SystemControll onNavigate={navigateTo} />;
      case 'admin/dieu-khien':
        return <ControllerPage onNavigate={navigateTo} />;
      case 'admin/gian-hang':
        return <ShopManagement onNavigate={navigateTo} />;
      case 'admin/mau-gian-hang':
        return <ShopTemplates onNavigate={navigateTo} />;
      case 'admin/ho-so':
        return <AdminProfile onNavigate={navigateTo} />;

      default:
        if (currentPage.startsWith('san-pham/')) {
          return <ProductInformation onNavigate={navigateTo} productId={currentPage.slice('san-pham/'.length)} />;
        }
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  if (window.location.pathname === '/auth/google/callback') {
    return <GoogleCallbackPage />;
  }

  // Quick Navigator Menu Items for testing & preview
  const renderAuthorizedPage = () => {
    const admin = currentPage.startsWith('admin/');
    const supplier = currentPage.startsWith('nha-cung-cap/');
    const registration = currentPage === 'dang-ky-nha-cung-cap';
    if (!admin && !supplier && !registration && currentPage !== 'thong-bao') return renderPage();
    if (isRestoring) return <Spin fullscreen description="Đang kiểm tra phiên đăng nhập…" />;
    if (!isLoggedIn) return <Result status="403" title="Vui lòng đăng nhập để tiếp tục"
      extra={<Button type="primary" onClick={() => setShowLogin(true)}>Đăng nhập</Button>} />;
    if (admin && user?.role !== 'Admin') return <Result status="403" title="Trang này dành cho quản trị viên" />;
    if (registration && !['Customer', 'Supplier'].includes(user?.role)) {
      return <Result status="403" title="Trang đăng ký nhà cung cấp dành cho tài khoản khách hàng" />;
    }
    if (supplier) {
      const onboarding = currentPage === 'nha-cung-cap/ho-so' || currentPage === 'nha-cung-cap/xac-minh';
      const eligible = user?.capabilities?.canReadSupplierVerification;
      const fulfillment = user?.capabilities?.canFulfillExistingOrders &&
        ['nha-cung-cap/quan-ly-don-hang', 'nha-cung-cap/quan-ly-hop-dong', 'nha-cung-cap/quan-ly-giao-hang'].includes(currentPage);
      const canStartOnboarding = onboarding && user?.role === 'Customer';
      if ((!eligible && !canStartOnboarding) || (!onboarding && !user?.capabilities?.canCreateShop && !fulfillment)) {
        return <Result status="403" title="Hoàn tất xác minh doanh nghiệp để sử dụng chức năng này"
          extra={eligible && <Button type="primary" onClick={() => navigateTo('nha-cung-cap/ho-so')}>Xem hồ sơ xác minh</Button>} />;
      }
    }
    return renderPage();
  };
  const quickNavMenuItems = [
    {
      key: 'grp-customer',
      type: 'group',
      label: '🛒 KHÁCH HÀNG DOANH NGHIỆP (B2B)',
      children: [
        { key: 'trang-chu', label: '1. Trang chủ' },
        { key: 'tim-kiem', label: '2. Khám phá sản phẩm B2B' },
        { key: 'san-pham', label: '3. Chi tiết sản phẩm & Biến thể' },
        { key: 'dat-hang-thiet-ke', label: '4. Đặt hàng & In logo' },
        { key: 'in-an-bao-bi', label: '5. Tùy biến bao bì' },
        { key: 'so-sanh-bao-gia', label: '6. Yêu cầu báo giá (RFQ)' },
        { key: 'hop-dong-tien-do', label: '7. Hợp đồng & Cọc M1' },
        { key: 'giao-hang-pod', label: '8. Giao nhận PoD' },
        { key: 'thanh-toan-danh-gia', label: '9. Thanh toán & Đánh giá' },
        { key: 'ho-so-khach-hang', label: '10. Hồ sơ doanh nghiệp' },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'grp-supplier',
      type: 'group',
      label: '🏭 NHÀ CUNG CẤP / XƯỞNG BÁNH (COLONY)',
      children: [
        { key: 'nha-cung-cap/thiet-lap-gian-hang', label: '1. Thiết lập gian hàng' },
        { key: 'nha-cung-cap/quan-ly-san-pham', label: '2. Sản phẩm & Biến thể' },
        { key: 'nha-cung-cap/dau-thau', label: '3. Đấu thầu RFQ & Báo giá' },
        { key: 'nha-cung-cap/quan-ly-don-hang', label: '4. Đơn hàng & Mockup bao bì' },
        { key: 'nha-cung-cap/quan-ly-hop-dong', label: '5. Hợp đồng & Milestone' },
        { key: 'nha-cung-cap/quan-ly-giao-hang', label: '6. Giao vận & Bằng chứng PoD' },
        { key: 'nha-cung-cap/ho-so', label: '7. Hồ sơ & Điểm uy tín' },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'grp-admin',
      type: 'group',
      label: '🛡️ QUẢN TRỊ VIÊN HQ (COLONY)',
      children: [
        { key: 'admin/dashboard', label: '1. Dashboard điều hành' },
        { key: 'admin/phe-duyet', label: '2. Phê duyệt xưởng bánh' },
        { key: 'admin/van-hanh-giao-dich', label: '3. Giao dịch & Tranh chấp' },
        { key: 'admin/kiem-soat-he-thong', label: '4. Kiểm soát hệ thống & Catalog' },
        { key: 'admin/dieu-khien', label: '5. Người dùng & Gian hàng' },
        { key: 'admin/ho-so', label: '6. Hồ sơ Admin' },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'auth-triggers',
      type: 'group',
      label: '🔐 THỬ NGHIỆM ĐĂNG NHẬP / ĐĂNG KÝ',
      children: [
        {
          key: 'trigger-login',
          label: 'Mở Popup Đăng Nhập',
          onClick: () => setShowLogin(true),
        },
        {
          key: 'trigger-register',
          label: 'Mở Popup Đăng Ký',
          onClick: () => setShowRegister(true),
        },
      ],
    },
  ];

  return (
    <ConfigProvider theme={antdTheme}>
      <AntApp>
      <div style={{ minHeight: '100vh', background: '#f5f5f7', display: 'flex', flexDirection: 'column' }}>
        {/* Dynamic Render of Active Page */}
        <div style={{ flex: 1, width: '100%' }}>
          <Suspense fallback={<Spin fullscreen description="Đang tải trang…" />}>{renderAuthorizedPage()}</Suspense>
        </div>

        {/* Floating Quick Navigation Hub */}
        {import.meta.env.DEV && <Dropdown
          menu={{
            items: quickNavMenuItems,
            onClick: ({ key }) => {
              if (key !== 'trigger-login' && key !== 'trigger-register') {
                navigateTo(key);
              }
            },
            style: { maxHeight: '75vh', overflowY: 'auto', width: 280 },
          }}
          placement="topLeft"
          arrow
        >
          <FloatButton
            icon={<CompassOutlined />}
            type="primary"
            style={{
              right: 24,
              bottom: 24,
              width: 52,
              height: 52,
              boxShadow: '0 4px 16px rgba(140, 21, 36, 0.4)',
            }}
            tooltip="Điều Hướng Nhanh 3 Roles (Customer - Supplier - Admin)"
          />
        </Dropdown>}

        {/* Popups (Preserved Auth Flow) */}
        <LoginPopup
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onNavigate={navigateTo}
          initialPhone={prefilledPhone}
          returnPage={['dang-ky-nha-cung-cap', 'nha-cung-cap/xac-minh', 'nha-cung-cap/ho-so'].includes(currentPage) ? currentPage : undefined}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />

        <RegisterPopup
          isOpen={showRegister}
          onClose={() => setShowRegister(false)}
          onNavigate={navigateTo}
          onSwitchToLogin={(phone) => {
            if (phone) setPrefilledPhone(phone);
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      </div>
      </AntApp>
    </ConfigProvider>
  );
}
