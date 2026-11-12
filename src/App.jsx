import { useState, useEffect, lazy, Suspense } from 'react';
import { App as AntApp, ConfigProvider, Empty, Spin } from 'antd';
import viVN from 'antd/locale/vi_VN';
import { useAuth } from './hooks/useAuth';
import { WishlistProvider } from './context/WishlistContext';
import { ChatProvider } from './context/ChatContext';
import ChatDock from './components/chat/ChatDock';
import { hasSupplierWorkspace } from './utils/supplierAccess';
import { roleHomeRoute } from './utils/roleNavigation';
import SupplierRegistration from './Pages/Customer/SupplierRegistration';
import antdTheme from './theme/antdTheme';
import storage from './utils/storage';
import { ADMIN_ROUTES, AUTHENTICATED_ROUTES, CUSTOMER_ROUTES, DRIVER_ROUTES, ONBOARDING_ROUTES, SUPPLIER_ROUTES, isKnownRoute, isPublicRoute } from './utils/accessRoutes';
import AccessDeniedPage from './Pages/Errors/AccessDeniedPage';
import NotFoundPage from './Pages/Errors/NotFoundPage';

// Customer / General Pages
import HomePage from './Pages/HomePage';
import SearchPage from './Pages/SearchPage';
import Notification from './Pages/Notification';
import ProductInformation from './Pages/Products/ProductInformation';
import OrderAndDesgin from './Pages/Customer/OrderAndDesgin';
import MyOrders from './Pages/Customer/MyOrders';
import PackagingAndLogoPrinting from './Pages/Customer/PackagingAndLogoPrinting';
import BiddingAndQuoteComparison from './Pages/Customer/BiddingAndQuoteComparison';
import ContractsAndMilestone from './Pages/Customer/ContractsAndMilestone';
import DeliveryPoD from './Pages/Customer/DeliveryPoD';
import DriverMobileView from './Pages/Delivery/DriverMobileView';
import PaymentAndRate from './Pages/Customer/PaymentAndRate';
import CustomerProfile from './Pages/Customer/CustomerProfile';
import WishlistPage from './Pages/Customer/WishlistPage';
import ChatPage from './Pages/Chat/ChatPage';

// Supplier Pages
import { currentRouteQuery, currentRoute, normalizeLegacyRoute, routeUrl } from './utils/shopRoutes';
import SupplierDashboard from './Pages/Supplier/SupplierDashboard';
import ProductManage from './Pages/Supplier/ProductManage';
import BiddingPage from './Pages/Supplier/BiddingPage';
import OrderManage from './Pages/Supplier/OrderManage';
import ContractManage from './Pages/Supplier/ContractManage';
import DeliverManage from './Pages/Supplier/DeliverManage';
import SuppilerProfile from './Pages/Supplier/SuppilerProfile';
import PromotionManage from './Pages/Supplier/PromotionManage';

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
import AiChatWidget from './components/ai/AiChatWidget';
import PaymentResultView from './components/payment/PaymentResultView';

const StoreSetUp = lazy(() => import('./Pages/Supplier/StoreSetUp'));
const ShopAppearance = lazy(() => import('./Pages/Supplier/ShopAppearance'));
const PublicShopPage = lazy(() => import('./Pages/PublicShopPage'));
const ShopManagement = lazy(() => import('./Pages/Admin/ShopManagement'));
const ShopTemplates = lazy(() => import('./Pages/Admin/ShopTemplates'));

export default function App() {
  const { user, isLoggedIn, isRestoring } = useAuth();
  const isSupplierUser = String(user?.role || '').toLowerCase() === 'supplier';
  const [currentPage, setCurrentPage] = useState(currentRoute);
  const [routeQuery, setRouteQuery] = useState(currentRouteQuery);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [prefilledPhone, setPrefilledPhone] = useState('');
  const [pendingPage, setPendingPage] = useState(null);

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
    if (isSupplierUser && ['hop-dong-tien-do', 'hop-dong-dien-tu'].includes(target)) target = 'nha-cung-cap/quan-ly-hop-dong';
    if (pageKey === 'dang-nhap') {
      setShowLogin(true);
      return;
    }
    if (pageKey === 'dang-ky') {
      setShowRegister(true);
      return;
    }

    const targetRoute = target.split('?')[0];
    if (isKnownRoute(targetRoute) && !isPublicRoute(targetRoute) &&
      !isLoggedIn && !storage.get('auth_token')) {
      setPendingPage(target);
      setShowLogin(true);
      return;
    }

    const proceed = () => {
      const [routeKey, query] = target.split('?');
      const querySuffix = query ? `?${query}` : '';
      setCurrentPage(routeKey);
      setRouteQuery(querySuffix);
      window.history.pushState(null, '', `${routeUrl(routeKey)}${querySuffix}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    if (window.dispatchEvent(new CustomEvent('app:before-navigate', { cancelable: true, detail: { proceed } }))) proceed();
  };

  useEffect(() => {
    const handleLocationChange = () => {
      normalizeLegacyRoute();
      const target = currentRoute();
      if (target === currentPage && currentRouteQuery() === routeQuery) return;
      const proceed = () => { const q = currentRouteQuery(); setCurrentPage(target); setRouteQuery(q); };
      if (window.dispatchEvent(new CustomEvent('app:before-navigate', { cancelable: true, detail: { proceed } }))) proceed();
      else window.history.replaceState(null, '', `${routeUrl(currentPage)}${routeQuery}`);
    };
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
    }, [currentPage, routeQuery]);

  useEffect(() => {
    const openLoginModal = () => setShowLogin(true);
    window.addEventListener('auth:unauthorized', openLoginModal);
    window.addEventListener('app:require-login', openLoginModal);
    return () => {
      window.removeEventListener('auth:unauthorized', openLoginModal);
      window.removeEventListener('app:require-login', openLoginModal);
    };
  }, []);

  useEffect(() => {
    const destination = roleHomeRoute(user);
    if (isRestoring || !isLoggedIn || currentPage !== 'trang-chu' || destination === 'trang-chu') return undefined;
    window.history.replaceState(null, '', routeUrl(destination));
    const timer = window.setTimeout(() => setCurrentPage(destination), 0);
    return () => window.clearTimeout(timer);
  }, [currentPage, isLoggedIn, isRestoring, user]);

  const renderPage = () => {
    if (currentPage.startsWith('shop/')) return <PublicShopPage key={currentPage} slug={currentPage.slice(5)} onNavigate={navigateTo} />;
    if (currentPage.startsWith('dat-hang-thiet-ke') || currentPage.startsWith('dat-hang-doanh-nghiep')) {
      return <OrderAndDesgin key={`${currentPage}${routeQuery}`} onNavigate={navigateTo} />;
    }
    switch (currentPage) {
      // Role 1: Customer (Khách hàng doanh nghiệp B2B)
      case 'trang-chu':
        return <HomePage onNavigate={navigateTo} />;
      case 'tim-kiem':
      case 'bo-suu-tap-banh':
        return <SearchPage key={`${currentPage}${routeQuery}`} onNavigate={navigateTo} />;
      case 'san-pham':
        return <ProductInformation onNavigate={navigateTo} />;
      case 'dat-hang-thiet-ke':
      case 'dat-hang-doanh-nghiep':
        return <OrderAndDesgin onNavigate={navigateTo} />;
      case 'don-hang-cua-toi':
        return <MyOrders onNavigate={navigateTo} />;
      case 'in-an-bao-bi':
      case 'yeu-cau-bao-gia':
        return <PackagingAndLogoPrinting onNavigate={navigateTo} />;
      case 'so-sanh-bao-gia':
      case 'so-sanh-thau-rfq':
        return <BiddingAndQuoteComparison onNavigate={navigateTo} />;
      case 'hop-dong-tien-do':
      case 'hop-dong-dien-tu':
        return isSupplierUser
          ? <ContractManage onNavigate={navigateTo} />
          : <ContractsAndMilestone onNavigate={navigateTo} />;
      case 'giao-hang-pod':
      case 'van-chuyen-pod':
        return <DeliveryPoD onNavigate={navigateTo} />;
      case 'driver-delivery-view':
      case 'driver-pod':
        return (
          <DriverMobileView
            onBack={() => navigateTo(isSupplierUser ? 'nha-cung-cap/quan-ly-giao-hang' : 'giao-hang-pod')}
            onComplete={() => navigateTo(isSupplierUser ? 'nha-cung-cap/quan-ly-giao-hang' : 'giao-hang-pod')}
          />
        );
      case 'thanh-toan-danh-gia':
      case 'danh-gia-va-phe-duyet-mau-thu':
        return <PaymentAndRate onNavigate={navigateTo} />;
      case 'thanh-toan/ket-qua':
      case 'ket-qua-thanh-toan':
        return <PaymentResultView onNavigate={navigateTo} />;
      case 'ho-so-khach-hang':
        return <CustomerProfile onNavigate={navigateTo} />;
      case 'san-pham-yeu-thich':
        return <WishlistPage onNavigate={navigateTo} />;
      case 'tin-nhan':
      case 'nha-cung-cap/tin-nhan':
        return <ChatPage onNavigate={navigateTo} />;
      case 'thong-bao':
        return <Notification onNavigate={navigateTo} />;

      // Role 2: Supplier (Nhà cung cấp / Xưởng bánh B2B)
      case 'nha-cung-cap':
      case 'nha-cung-cap/dashboard':
        return <SupplierDashboard onNavigate={navigateTo} />;
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
      case 'nha-cung-cap/don-hang':
      case 'nha-cung-cap/quan-ly-don-hang':
        return <OrderManage onNavigate={navigateTo} />;
      case 'nha-cung-cap/quan-ly-hop-dong':
        return <ContractManage onNavigate={navigateTo} />;
      case 'nha-cung-cap/quan-ly-giao-hang':
        return <DeliverManage onNavigate={navigateTo} />;
      case 'nha-cung-cap/khuyen-mai':
      case 'nha-cung-cap/quan-ly-khuyen-mai':
        return <PromotionManage onNavigate={navigateTo} />;
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
        return <NotFoundPage onNavigate={navigateTo} />;
    }
  };

  if (window.location.pathname === '/auth/google/callback') {
    return <GoogleCallbackPage />;
  }

  // Quick Navigator Menu Items for testing & preview
  const renderAuthorizedPage = () => {
    if (!isKnownRoute(currentPage)) return <NotFoundPage onNavigate={navigateTo} />;
    if (currentPage === 'trang-chu' && isLoggedIn &&
        (isRestoring || roleHomeRoute(user) !== 'trang-chu')) {
      return <Spin fullscreen description="Đang mở không gian làm việc…" />;
    }
    if (isPublicRoute(currentPage)) return renderPage();
    if (isRestoring) return <Spin fullscreen description="Đang kiểm tra phiên đăng nhập…" />;
    if (!isLoggedIn) return <AccessDeniedPage onNavigate={navigateTo} onLogin={() => setShowLogin(true)} />;
    if (ADMIN_ROUTES.has(currentPage) && user?.role !== 'Admin') return <AccessDeniedPage onNavigate={navigateTo} />;
    if (CUSTOMER_ROUTES.has(currentPage) && user?.role !== 'Customer') return <AccessDeniedPage onNavigate={navigateTo} />;
    if (DRIVER_ROUTES.has(currentPage) && !['Customer', 'Supplier'].includes(user?.role)) return <AccessDeniedPage onNavigate={navigateTo} />;
    if (ONBOARDING_ROUTES.has(currentPage) && !['Customer', 'Supplier'].includes(user?.role)) {
      return <AccessDeniedPage onNavigate={navigateTo} />;
    }
    if (SUPPLIER_ROUTES.has(currentPage) || ONBOARDING_ROUTES.has(currentPage)) {
      const onboarding = ONBOARDING_ROUTES.has(currentPage);
      const eligible = user?.capabilities?.canReadSupplierVerification;
      const fulfillment = user?.capabilities?.canFulfillExistingOrders &&
        ['nha-cung-cap', 'nha-cung-cap/dashboard', 'nha-cung-cap/quan-ly-don-hang', 'nha-cung-cap/quan-ly-hop-dong',
          'nha-cung-cap/quan-ly-giao-hang', 'nha-cung-cap/tin-nhan'].includes(currentPage);
      const canStartOnboarding = onboarding && user?.role === 'Customer';
      if (SUPPLIER_ROUTES.has(currentPage) && user?.role !== 'Supplier') return <AccessDeniedPage onNavigate={navigateTo} />;
      if ((!eligible && !canStartOnboarding && !fulfillment && !user?.capabilities?.canCreateShop) ||
        (!onboarding && !user?.capabilities?.canCreateShop && !fulfillment)) {
        return <AccessDeniedPage onNavigate={navigateTo} />;
      }
    }
    return renderPage();
  };
  return (
    <ConfigProvider theme={antdTheme} locale={viVN}
      renderEmpty={() => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có dữ liệu" />}>
      <AntApp>
      <WishlistProvider>
      <ChatProvider>
      <div style={{ minHeight: '100vh', background: '#f5f5f7', display: 'flex', flexDirection: 'column' }}>
        {/* Dynamic Render of Active Page */}
        <div style={{ flex: 1, width: '100%' }}>
          <Suspense fallback={<Spin fullscreen description="Đang tải trang…" />}>{renderAuthorizedPage()}</Suspense>
        </div>

        {/* Popups (Preserved Auth Flow) */}
        <LoginPopup
          isOpen={showLogin}
          onClose={() => { setShowLogin(false); setPendingPage(null); }}
          onNavigate={navigateTo}
          initialPhone={prefilledPhone}
          returnPage={pendingPage || (ONBOARDING_ROUTES.has(currentPage) ? currentPage : undefined)}
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

        {/* Global AI Chatbot Concierge Widget */}
        {!currentPage.startsWith('shop/') && (!isLoggedIn || user?.role === 'Customer') &&
          (isPublicRoute(currentPage) || (isLoggedIn &&
            (CUSTOMER_ROUTES.has(currentPage) || DRIVER_ROUTES.has(currentPage) || ONBOARDING_ROUTES.has(currentPage) || AUTHENTICATED_ROUTES.has(currentPage)))) &&
          <AiChatWidget onNavigate={navigateTo} />}
        {/* Real-time B2B Customer <-> Supplier Floating Messenger Dock */}
        {isLoggedIn && <ChatDock onNavigate={navigateTo} />}
      </div>
      </ChatProvider>
      </WishlistProvider>
      </AntApp>
    </ConfigProvider>
  );
}
