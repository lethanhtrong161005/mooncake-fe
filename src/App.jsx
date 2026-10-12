import React, { useState, useEffect } from 'react';

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
import StoreSetUp from './Pages/Supplier/StoreSetUp';
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

// Popups
import LoginPopup from './Pages/LoginPopup';
import RegisterPopup from './Pages/RegisterPopup';

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'trang-chu';
  });

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [prefilledPhone, setPrefilledPhone] = useState('');
  const [showNavMenu, setShowNavMenu] = useState(false);

  const navigateTo = (pageKey) => {
    let target = pageKey;

    // Normalizations & aliases
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

    setCurrentPage(target);
    window.location.hash = target;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowNavMenu(false);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setCurrentPage(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      // Customer
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

      // Supplier
      case 'nha-cung-cap/thiet-lap-gian-hang':
        return <StoreSetUp onNavigate={navigateTo} />;
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
        return <SuppilerProfile onNavigate={navigateTo} />;

      // Admin
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
      case 'admin/ho-so':
        return <AdminProfile onNavigate={navigateTo} />;

      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-body-md antialiased relative">
      {/* Dynamic Render of Active Page */}
      <div className="flex-1 w-full">
        {renderPage()}
      </div>

      {/* Floating Quick Navigation & Demo Hub */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
        {showNavMenu && (
          <div className="mb-3 w-80 max-h-[80vh] overflow-y-auto bg-surface-container-lowest border border-outline-variant/60 rounded-2xl shadow-2xl p-4 text-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
              <span className="font-bold text-primary flex items-center gap-1.5 text-sm">
                <span className="material-symbols-outlined text-[18px]">explore</span>
                Điều Hướng Nhanh (Demo)
              </span>
              <button
                type="button"
                onClick={() => setShowNavMenu(false)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                ✕
              </button>
            </div>

            {/* Khách hàng B2B */}
            <div>
              <div className="font-bold text-secondary uppercase tracking-wider text-[10px] mb-1.5">
                Khách Hàng Doanh Nghiệp (B2B)
              </div>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { key: 'trang-chu', label: 'Trang chủ' },
                  { key: 'tim-kiem', label: 'Tìm kiếm & Bộ lọc' },
                  { key: 'san-pham', label: 'Chi tiết sản phẩm' },
                  { key: 'dat-hang-thiet-ke', label: 'Đặt hàng & Thiết kế' },
                  { key: 'in-an-bao-bi', label: 'Bao bì & Khắc logo' },
                  { key: 'so-sanh-bao-gia', label: 'So sánh thầu RFQ' },
                  { key: 'hop-dong-tien-do', label: 'Hợp đồng & Tiến độ' },
                  { key: 'giao-hang-pod', label: 'Giao hàng PoD' },
                  { key: 'thanh-toan-danh-gia', label: 'Thanh toán & Đánh giá' },
                  { key: 'ho-so-khach-hang', label: 'Hồ sơ doanh nghiệp' },
                  { key: 'thong-bao', label: 'Thông báo' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => navigateTo(item.key)}
                    className={`text-left px-2.5 py-1.5 rounded-lg transition-colors ${currentPage === item.key
                        ? 'bg-primary-container text-on-primary font-semibold'
                        : 'hover:bg-surface-container text-on-surface'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Nhà cung cấp */}
            <div className="pt-2 border-t border-outline-variant/20">
              <div className="font-bold text-secondary uppercase tracking-wider text-[10px] mb-1.5">
                Kênh Nhà Cung Cấp / Xưởng
              </div>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { key: 'nha-cung-cap/thiet-lap-gian-hang', label: 'Thiết lập gian hàng' },
                  { key: 'nha-cung-cap/quan-ly-san-pham', label: 'Quản lý sản phẩm' },
                  { key: 'nha-cung-cap/dau-thau', label: 'Đấu thầu RFQ' },
                  { key: 'nha-cung-cap/quan-ly-don-hang', label: 'Quản lý đơn hàng' },
                  { key: 'nha-cung-cap/quan-ly-hop-dong', label: 'Quản lý hợp đồng' },
                  { key: 'nha-cung-cap/quan-ly-giao-hang', label: 'Quản lý giao hàng' },
                  { key: 'nha-cung-cap/ho-so', label: 'Hồ sơ nhà cung cấp' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => navigateTo(item.key)}
                    className={`text-left px-2.5 py-1.5 rounded-lg transition-colors ${currentPage === item.key
                        ? 'bg-primary-container text-on-primary font-semibold'
                        : 'hover:bg-surface-container text-on-surface'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quản trị viên */}
            <div className="pt-2 border-t border-outline-variant/20">
              <div className="font-bold text-secondary uppercase tracking-wider text-[10px] mb-1.5">
                Quản Trị Viên (Admin Portal)
              </div>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { key: 'admin/dashboard', label: 'Dashboard điều hành' },
                  { key: 'admin/phe-duyet', label: 'Phê duyệt xưởng/mẫu' },
                  { key: 'admin/van-hanh-giao-dich', label: 'Vận hành giao dịch' },
                  { key: 'admin/kiem-soat-he-thong', label: 'Kiểm soát hệ thống' },
                  { key: 'admin/dieu-khien', label: 'Bộ điều khiển sàn' },
                  { key: 'admin/ho-so', label: 'Hồ sơ Admin' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => navigateTo(item.key)}
                    className={`text-left px-2.5 py-1.5 rounded-lg transition-colors ${currentPage === item.key
                        ? 'bg-primary-container text-on-primary font-semibold'
                        : 'hover:bg-surface-container text-on-surface'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Modals Popup Triggers */}
            <div className="pt-2 border-t border-outline-variant/20 flex gap-2">
              <button
                type="button"
                onClick={() => { setShowLogin(true); setShowNavMenu(false); }}
                className="flex-1 py-1.5 rounded-lg bg-surface border border-outline-variant hover:bg-surface-container text-center font-semibold text-primary"
              >
                Popup Login
              </button>
              <button
                type="button"
                onClick={() => { setShowRegister(true); setShowNavMenu(false); }}
                className="flex-1 py-1.5 rounded-lg bg-surface border border-outline-variant hover:bg-surface-container text-center font-semibold text-primary"
              >
                Popup Register
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowNavMenu(!showNavMenu)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-on-primary shadow-xl hover:bg-primary-container transition-all text-xs font-bold cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">menu</span>
          <span>Menu Chuyển Trang ({currentPage})</span>
        </button>
      </div>

      {/* Popups */}
      <LoginPopup
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onNavigate={navigateTo}
        initialPhone={prefilledPhone}
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
  );
}
