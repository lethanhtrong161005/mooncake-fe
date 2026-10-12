import React, { useState, useEffect, useRef } from 'react';

export default function Header({ activePage = 'trang-chu', onNavigate }) {
  // Navigation & Auth State (Default: false = Chưa đăng nhập như ảnh 3)
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('b2b_logged_in') === 'true';
  });
  const [selectedRegion, setSelectedRegion] = useState(() => {
    return isLoggedIn ? 'Toàn quốc' : 'Chọn khu vực';
  });

  // Dropdown & Drawer Visibility
  const [showDrawer, setShowDrawer] = useState(false);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [showNotiDropdown, setShowNotiDropdown] = useState(false);
  const [showContactPopover, setShowContactPopover] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Refs for click outside
  const regionRef = useRef(null);
  const searchRef = useRef(null);
  const notiRef = useRef(null);
  const contactRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (regionRef.current && !regionRef.current.contains(e.target)) {
        setShowRegionDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchSuggestions(false);
      }
      if (notiRef.current && !notiRef.current.contains(e.target)) {
        setShowNotiDropdown(false);
      }
      if (contactRef.current && !contactRef.current.contains(e.target)) {
        setShowContactPopover(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (path) => {
    onNavigate?.(path);
    setShowDrawer(false);
    setShowRegionDropdown(false);
    setShowSearchSuggestions(false);
    setShowNotiDropdown(false);
    setShowContactPopover(false);
    setShowUserDropdown(false);
  };

  const handleToggleAuth = (state) => {
    const nextState = state !== undefined ? state : !isLoggedIn;
    setIsLoggedIn(nextState);
    localStorage.setItem('b2b_logged_in', nextState ? 'true' : 'false');
    if (!nextState && selectedRegion === 'Toàn quốc') {
      setSelectedRegion('Chọn khu vực');
    } else if (nextState && selectedRegion === 'Chọn khu vực') {
      setSelectedRegion('Toàn quốc');
    }
    setShowUserDropdown(false);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    handleNav('tim-kiem');
  };

  const handleSaveToggle = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  const regions = [
    'Toàn quốc',
    'TP. Hồ Chí Minh',
    'Hà Nội',
    'Đà Nẵng',
    'Bình Dương',
    'Cần Thơ',
    'Hải Phòng',
    'Đồng Nai',
  ];

  const trendingSearches = [
    'Hộp Sơn Mài VIP',
    'Bào Ngư Vi Cá',
    'Healthy Isomalt',
    'Chiết khấu 35%',
    'Xưởng OCOP 4 sao',
  ];

  return (
    <>
      {/*
        Sleek Single-Row Chợ Tốt Style Header
        Hỗ trợ 2 trạng thái:
        - Chưa đăng nhập (Ảnh 3): "Chọn khu vực ▾", "Đăng nhập", nút vàng "+ Tạo RFQ Báo Giá", icon người [ 👤 ▾ ]
        - Đã đăng nhập (Ảnh 2): "Toàn quốc ▾", "Quản lý đơn", nút vàng "+ Tạo RFQ Báo Giá", avatar công ty [ AP ▾ ]
      */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#fff8f5]/95 backdrop-blur-md border-b border-[#ebdcd5] shadow-[0_2px_10px_rgba(122,0,16,0.04)] h-[64px] sm:h-[68px]">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 h-full flex items-center justify-between gap-1.5 sm:gap-3">

          {/* ================= LEFT SECTION: Hamburger + Logo + Location Pill ================= */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* Hamburger Button [ ≡ ] */}
            <button
              type="button"
              onClick={() => setShowDrawer(true)}
              className="p-1.5 sm:p-2 text-stone-800 hover:text-primary hover:bg-[#f4ebe6] rounded-lg transition-colors cursor-pointer flex items-center justify-center"
              title="Danh mục & Menu hệ thống"
              aria-label="Mở menu hệ thống"
            >
              <span className="material-symbols-outlined text-[24px] sm:text-[26px]">menu</span>
            </button>

            {/* Brand Logo [ Nguyệt Phố B2B ] */}
            <button
              type="button"
              onClick={() => handleNav('trang-chu')}
              className="flex items-center gap-1.5 group cursor-pointer text-left mr-0.5 sm:mr-1"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[20px] text-secondary-container">cookie</span>
              </div>
              <div className="hidden xs:flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-primary leading-tight">
                    Nguyệt Phố
                  </span>
                  <span className="bg-[#ffba00] text-[#410005] font-extrabold text-[9px] px-1 py-0.2 rounded-xs uppercase tracking-wider">
                    B2B
                  </span>
                </div>
                <span className="text-[10px] text-stone-500 font-medium leading-none hidden md:block">
                  Sàn Bánh Trung Thu Luxury
                </span>
              </div>
            </button>

            {/* Region / Location Selector Pill [ 📍 Chọn khu vực / Toàn quốc ▾ ] */}
            <div ref={regionRef} className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setShowRegionDropdown(!showRegionDropdown)}
                className="rounded-full bg-[#fffbeb] hover:bg-[#fef3c7] border border-[#fcd34d] text-[#92400e] px-2.5 lg:px-3 py-1.5 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                title="Chọn khu vực giao hàng"
              >
                <span className="material-symbols-outlined text-[16px] text-amber-600">location_on</span>
                <span className="max-w-[110px] truncate">{selectedRegion}</span>
                <span className="material-symbols-outlined text-[16px] text-amber-700">keyboard_arrow_down</span>
              </button>

              {/* Region Dropdown */}
              {showRegionDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in duration-100">
                  <div className="px-3 py-1 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    Chọn khu vực giao bánh
                  </div>
                  {regions.map((region) => (
                    <button
                      key={region}
                      type="button"
                      onClick={() => {
                        setSelectedRegion(region);
                        setShowRegionDropdown(false);
                      }}
                      className={`w-full px-3 py-1.5 text-xs text-left flex items-center justify-between hover:bg-[#fff8f5] hover:text-primary transition-colors cursor-pointer ${selectedRegion === region ? 'font-bold text-primary bg-[#fff4ee]' : 'text-stone-700'
                        }`}
                    >
                      <span>{region}</span>
                      {selectedRegion === region && (
                        <span className="material-symbols-outlined text-[14px] text-primary">check</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ================= CENTER SECTION: Search Pill Bar ================= */}
          <div ref={searchRef} className="relative flex-1 max-w-xl mx-1 sm:mx-2 lg:mx-3 min-w-[140px]">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="relative flex items-center bg-[#f4ebe6]/70 hover:bg-[#eee3dc] focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/40 border border-[#ebdcd5] rounded-full h-10 px-3 transition-all shadow-2xs">
                {/* Search Icon */}
                <span className="material-symbols-outlined text-stone-400 text-[18px] mr-1.5 shrink-0 hidden xs:inline">
                  search
                </span>

                {/* Search Input */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchSuggestions(true)}
                  placeholder="Tìm sản phẩm, xưởng, set quà VIP..."
                  className="w-full bg-transparent text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none pr-8"
                />

                {/* Circular Gold Search Button on Right [ (Q) ] */}
                <button
                  type="submit"
                  className="absolute right-1 w-8 h-8 rounded-full bg-[#ffba00] hover:bg-[#f0af00] text-stone-950 flex items-center justify-center font-bold shadow-xs cursor-pointer active:scale-95 transition-all shrink-0"
                  title="Tìm kiếm"
                  aria-label="Tìm kiếm sản phẩm"
                >
                  <span className="material-symbols-outlined text-[18px]">search</span>
                </button>
              </div>
            </form>

            {/* Quick Search Suggestions Popover */}
            {showSearchSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 p-3.5 z-50 text-xs animate-in fade-in duration-100">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                  <span className="font-bold text-stone-500 text-[11px] uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-amber-600">trending_up</span>
                    Tìm kiếm phổ biến B2B
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSearchSuggestions(false)}
                    className="text-stone-400 hover:text-stone-600 text-[11px] cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {trendingSearches.map((tag, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSearchQuery(tag);
                        handleNav('tim-kiem');
                      }}
                      className="px-2.5 py-1 rounded-full bg-[#fbf2ed] hover:bg-[#f5e6de] text-stone-800 text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                  Gợi ý dòng bánh doanh nghiệp
                </div>
                <div className="space-y-1">
                  {[
                    { title: 'Hộp Sơn Mài Hoàng Kim Liên Hoa (4 bánh 200g)', price: 'Từ 490.000đ' },
                    { title: 'Set Yến Sào Vi Cá Nguyệt Dạ Thượng Uyển', price: 'Từ 850.000đ' },
                    { title: 'Bánh Trung Thu Healthy Isomalt Hạt Macca', price: 'Từ 350.000đ' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSearchQuery(item.title);
                        handleNav('tim-kiem');
                      }}
                      className="p-1.5 rounded-lg hover:bg-[#fff8f5] cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <span className="text-stone-800 font-medium truncate pr-2">{item.title}</span>
                      <span className="text-primary font-bold text-[11px] shrink-0">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ================= RIGHT SECTION: Wishlist + Noti + Contact + Auth + CTA + Avatar ================= */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">

            {/* Wishlist / Saved Items [ ♡ ] */}
            <button
              type="button"
              onClick={handleSaveToggle}
              className="p-1.5 sm:p-2 text-stone-700 hover:text-primary hover:bg-[#f4ebe6] rounded-full transition-colors relative cursor-pointer flex items-center justify-center"
              title="Danh sách yêu thích & quan tâm"
              aria-label="Danh sách yêu thích"
            >
              <span className="material-symbols-outlined text-[21px] sm:text-[23px]">favorite_border</span>
              {isLoggedIn && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  2
                </span>
              )}
            </button>

            {/* Notifications Bell [ 🔔 ] with Popover */}
            <div ref={notiRef} className="relative">
              <button
                type="button"
                onClick={() => setShowNotiDropdown(!showNotiDropdown)}
                className="p-1.5 sm:p-2 text-stone-700 hover:text-primary hover:bg-[#f4ebe6] rounded-full transition-colors relative cursor-pointer flex items-center justify-center"
                title="Thông báo đơn hàng & RFQ"
                aria-label="Thông báo"
              >
                <span className="material-symbols-outlined text-[21px] sm:text-[23px]">notifications</span>
                {isLoggedIn && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                    3
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotiDropdown && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-xl border border-stone-200 p-3.5 z-50 animate-in fade-in duration-100">
                  <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
                    <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-[17px]">notifications_active</span>
                      {isLoggedIn ? 'Thông Báo B2B Mới' : 'Thông Báo Hệ Thống'}
                    </span>
                    {isLoggedIn && (
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        3 chưa đọc
                      </span>
                    )}
                  </div>

                  <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto my-1">
                    <div
                      onClick={() => handleNav(isLoggedIn ? 'so-sanh-bao-gia' : 'dang-nhap')}
                      className="py-2 px-1 hover:bg-[#fff8f5] rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
                        <span>Ưu đãi B2B mùa trăng 2025</span>
                        <span className="text-[10px] text-stone-400 font-normal">Hôm nay</span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                        Chiết khấu tới 35% cho đơn hàng doanh nghiệp từ 100 hộp. Miễn phí in khắc logo.
                      </p>
                    </div>

                    {isLoggedIn && (
                      <>
                        <div
                          onClick={() => handleNav('giao-hang-pod')}
                          className="py-2 px-1 hover:bg-[#fff8f5] rounded-lg cursor-pointer transition-colors"
                        >
                          <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
                            <span>Mẫu thử bánh đã giao thành công</span>
                            <span className="text-[10px] text-stone-400 font-normal">2h trước</span>
                          </div>
                          <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                            Xe lạnh IoT đã bàn giao hộp nếm thử 4 vị tại văn phòng đại diện.
                          </p>
                        </div>

                        <div
                          onClick={() => handleNav('hop-dong-tien-do')}
                          className="py-2 px-1 hover:bg-[#fff8f5] rounded-lg cursor-pointer transition-colors"
                        >
                          <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
                            <span>Hợp đồng điện tử sẵn sàng ký số</span>
                            <span className="text-[10px] text-stone-400 font-normal">1 ngày</span>
                          </div>
                          <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                            Hợp đồng cung ứng lô 500 hộp VIP đã hoàn tất thẩm định điều khoản Escrow.
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleNav(isLoggedIn ? 'thong-bao' : 'dang-nhap')}
                    className="w-full pt-2 text-center text-xs font-bold text-primary hover:underline cursor-pointer block border-t border-stone-100"
                  >
                    {isLoggedIn ? 'Xem tất cả thông báo →' : 'Đăng nhập để xem thông báo cá nhân →'}
                  </button>
                </div>
              )}
            </div>

            {/* Contact Pill [ 💬 Liên hệ ] with Popover */}
            <div ref={contactRef} className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setShowContactPopover(!showContactPopover)}
                className="rounded-full border border-stone-200 hover:border-primary/40 hover:bg-[#fff8f5] text-stone-700 hover:text-primary px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Liên hệ tư vấn B2B"
              >
                <span className="material-symbols-outlined text-[17px] text-stone-600">chat_bubble_outline</span>
                <span>Liên hệ</span>
              </button>

              {/* Contact Popover */}
              {showContactPopover && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 z-50 text-xs animate-in fade-in duration-100">
                  <div className="font-bold text-sm text-stone-900 mb-2 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[18px]">support_agent</span>
                    Hỗ Trợ B2B Trực Tiếp
                  </div>
                  <div className="space-y-2 text-stone-700 mb-3">
                    <a
                      href="tel:18006886"
                      className="flex items-center gap-2 p-2 rounded-lg bg-[#fff8f5] border border-[#ebdcd5] hover:border-primary transition-colors text-primary font-bold"
                    >
                      <span className="material-symbols-outlined text-[18px]">call</span>
                      <div>
                        <div className="text-[10px] font-normal text-stone-500">Hotline B2B (Miễn phí)</div>
                        <div className="text-sm">1800 6886</div>
                      </div>
                    </a>
                    <div className="p-2 rounded-lg bg-stone-50 border border-stone-200">
                      <div className="font-semibold text-stone-800 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-green-600">verified</span>
                        Zalo Thu Mua Doanh Nghiệp
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        Báo giá nhanh trong 15 phút, gửi brochure &amp; mẫu bánh tận nơi.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNav('yeu-cau-bao-gia')}
                    className="w-full py-1.5 bg-primary text-white rounded-lg font-bold text-xs hover:bg-primary-container transition-colors cursor-pointer text-center"
                  >
                    Gửi Yêu Cầu Báo Giá Nhanh
                  </button>
                </div>
              )}
            </div>

            {/* Auth Action: [ Đăng nhập ] khi chưa đăng nhập (Ảnh 3) HOẶC [ Quản lý đơn ] khi đã đăng nhập (Ảnh 2) */}
            {isLoggedIn ? (
              <button
                type="button"
                onClick={() => handleNav('hop-dong-tien-do')}
                className="rounded-full border border-stone-200 hover:border-primary/40 hover:bg-[#fff8f5] text-stone-800 hover:text-primary px-2.5 lg:px-3 py-1.5 text-xs font-semibold hidden sm:flex items-center gap-1 transition-colors cursor-pointer"
                title="Quản lý đơn hàng & hợp đồng"
              >
                <span className="material-symbols-outlined text-[16px] text-stone-600">receipt_long</span>
                <span>Quản lý đơn</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleNav('dang-nhap')}
                className="rounded-full border border-stone-200 hover:border-primary/40 hover:bg-[#fff8f5] text-stone-800 hover:text-primary px-3 sm:px-3.5 py-1.5 text-xs font-semibold hidden sm:flex items-center gap-1 transition-colors cursor-pointer"
                title="Đăng nhập tài khoản B2B"
              >
                <span>Đăng nhập</span>
              </button>
            )}

            {/* Primary Action Button [ Đăng tin / Tạo RFQ ] in Chợ Tốt Bright Yellow/Gold */}
            <button
              type="button"
              onClick={() => handleNav('yeu-cau-bao-gia')}
              className="rounded-full bg-[#ffba00] hover:bg-[#f0af00] text-stone-950 font-bold px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm flex items-center gap-1 shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              title="Đăng thầu RFQ để nhận báo giá từ các xưởng"
            >
              <span className="material-symbols-outlined text-[17px] sm:text-[18px]">post_add</span>
              <span className="hidden sm:inline">Tạo RFQ Báo Giá</span>
              <span className="sm:hidden">Tạo RFQ</span>
            </button>

            {/* Account / Avatar Dropdown:
                - Chưa đăng nhập (Ảnh 3): Icon người outline [ 👤 ▾ ]
                - Đã đăng nhập (Ảnh 2): Avatar chữ nổi [ AP ▾ ]
            */}
            <div ref={userRef} className="relative">
              <button
                type="button"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-1 p-0.5 sm:p-1 pl-1 sm:pl-1.5 pr-1.5 sm:pr-2 rounded-full hover:bg-stone-100 border border-stone-200 transition-colors cursor-pointer select-none"
                aria-label="Menu tài khoản"
              >
                {isLoggedIn ? (
                  /* Logged-in Avatar: Colorful initials AP */
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    AP
                  </div>
                ) : (
                  /* Logged-out Avatar: Outline user icon person (Ảnh 3) */
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-100 border border-stone-300 text-stone-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[19px] sm:text-[20px]">person</span>
                  </div>
                )}
                <span className="material-symbols-outlined text-[16px] text-stone-600">keyboard_arrow_down</span>
              </button>

              {/* User Menu Dropdown */}
              {showUserDropdown && (
                <div className="absolute right-0 top-full mt-2 w-[315px] sm:w-[335px] max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl border border-stone-200 p-3.5 z-50 text-xs animate-in fade-in duration-100">
                  {isLoggedIn ? (
                    /* ====== 1. ĐÃ ĐĂNG NHẬP (LOGGED IN MENU) ====== */
                    <>
                      <div className="p-3 bg-[#fff8f5] border border-[#ebdcd5] rounded-xl mb-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-stone-900 text-sm whitespace-nowrap">Tập đoàn An Phát</span>
                          <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap shrink-0">
                            VIP B2B
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500 mt-1 whitespace-nowrap">MST: 0108923481 • Hà Nội &amp; TP.HCM</div>
                        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-emerald-800 font-bold whitespace-nowrap">
                          <span className="material-symbols-outlined text-[15px] text-emerald-600 shrink-0">verified</span>
                          <span>Hạn mức trả chậm: 500 Triệu VNĐ</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <button
                          type="button"
                          onClick={() => handleNav('ho-so-khach-hang')}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-stone-50 text-stone-800 text-left cursor-pointer transition-colors group"
                        >
                          <span className="material-symbols-outlined text-[19px] text-secondary shrink-0">corporate_fare</span>
                          <span className="font-medium text-xs whitespace-nowrap text-stone-800 group-hover:text-primary transition-colors">
                            Hồ sơ doanh nghiệp &amp; Hạn mức
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNav('dat-hang-thiet-ke')}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-stone-50 text-stone-800 text-left cursor-pointer transition-colors group"
                        >
                          <span className="material-symbols-outlined text-[19px] text-primary shrink-0">draw</span>
                          <span className="font-medium text-xs whitespace-nowrap text-stone-800 group-hover:text-primary transition-colors">
                            Đơn hàng &amp; Giỏ thiết kế riêng
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNav('hop-dong-tien-do')}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-stone-50 text-stone-800 text-left cursor-pointer transition-colors group"
                        >
                          <span className="material-symbols-outlined text-[19px] text-tertiary shrink-0">history_edu</span>
                          <span className="font-medium text-xs whitespace-nowrap text-stone-800 group-hover:text-primary transition-colors">
                            Hợp đồng điện tử &amp; Tiến độ PoD
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNav('so-sanh-bao-gia')}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-stone-50 text-stone-800 text-left cursor-pointer transition-colors group"
                        >
                          <span className="material-symbols-outlined text-[19px] text-amber-600 shrink-0">gavel</span>
                          <span className="font-medium text-xs whitespace-nowrap text-stone-800 group-hover:text-primary transition-colors">
                            Đấu thầu RFQ &amp; So sánh báo giá
                          </span>
                        </button>

                        <div className="my-1.5 border-t border-stone-100"></div>

                        <button
                          type="button"
                          onClick={() => handleNav('nha-cung-cap/thiet-lap-gian-hang')}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-stone-50 text-stone-800 text-left cursor-pointer transition-colors group"
                        >
                          <span className="material-symbols-outlined text-[19px] text-stone-500 shrink-0">storefront</span>
                          <span className="font-medium text-xs whitespace-nowrap text-stone-800 group-hover:text-amber-700 transition-colors">
                            Chuyển sang Kênh Xưởng (Supplier)
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNav('admin/dashboard')}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-stone-50 text-stone-800 text-left cursor-pointer transition-colors group"
                        >
                          <span className="material-symbols-outlined text-[19px] text-stone-500 shrink-0">shield</span>
                          <span className="font-medium text-xs whitespace-nowrap text-stone-800 group-hover:text-primary transition-colors">
                            Bàn điều hành Sàn (Admin Portal)
                          </span>
                        </button>

                        <div className="my-1.5 border-t border-stone-100"></div>

                        <div className="flex gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleToggleAuth(false)}
                            className="flex-1 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-center font-bold text-xs cursor-pointer transition-colors"
                          >
                            Đăng xuất (Khách)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleNav('dang-nhap')}
                            className="flex-1 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-center font-bold text-xs cursor-pointer transition-colors shadow-xs"
                          >
                            Đổi tài khoản
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* ====== 2. CHƯA ĐĂNG NHẬP (GUEST MENU - ẢNH 3) ====== */
                    <>
                      <div className="p-3 bg-[#fff8f5] border border-[#ebdcd5] rounded-xl mb-2.5 text-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-1.5">
                          <span className="material-symbols-outlined text-[22px]">corporate_fare</span>
                        </div>
                        <div className="font-bold text-stone-900 text-sm">Chào mừng bạn đến với Nguyệt Phố</div>
                        <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                          Đăng nhập để nhận chiết khấu B2B tới 35%, lưu giỏ hàng &amp; xuất VAT điện tử.
                        </p>

                        <div className="grid grid-cols-2 gap-1.5 mt-2.5">
                          <button
                            type="button"
                            onClick={() => handleNav('dang-nhap')}
                            className="py-2 rounded-lg bg-primary hover:bg-primary-container text-white font-bold text-xs cursor-pointer shadow-xs transition-colors"
                          >
                            Đăng nhập
                          </button>
                          <button
                            type="button"
                            onClick={() => handleNav('dang-ky')}
                            className="py-2 rounded-lg border border-primary text-primary hover:bg-primary/5 font-bold text-xs cursor-pointer transition-colors"
                          >
                            Đăng ký mới
                          </button>
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <button
                          type="button"
                          onClick={() => handleNav('tim-kiem')}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-50 text-stone-800 text-left cursor-pointer transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px] text-stone-500">search</span>
                          <span>Tra cứu bánh &amp; Catalog 2025</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNav('nha-cung-cap/thiet-lap-gian-hang')}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-50 text-stone-800 text-left cursor-pointer transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px] text-amber-600">storefront</span>
                          <span>Dành cho Xưởng: Mở gian hàng B2B</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNav('admin/dashboard')}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-50 text-stone-800 text-left cursor-pointer transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px] text-stone-500">shield</span>
                          <span>Bàn điều hành Sàn (Admin Portal)</span>
                        </button>

                        <div className="my-1.5 border-t border-stone-100"></div>

                        {/* Quick Demo Switcher to view Logged-In state */}
                        <button
                          type="button"
                          onClick={() => handleToggleAuth(true)}
                          className="w-full py-2 px-3 rounded-lg bg-[#fff8eb] border border-[#fcd34d] hover:bg-[#fef3c7] text-[#92400e] font-bold text-center flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px] text-amber-600">bolt</span>
                          <span>Xem thử: Đã đăng nhập (VIP)</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* ================= TOAST NOTIFICATION: Saved Wishlist ================= */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <span className="material-symbols-outlined text-amber-400 text-[18px]">favorite</span>
          <span>Đã cập nhật danh sách yêu thích &amp; lưu tin B2B!</span>
        </div>
      )}

      {/* ================= SLIDE-OVER DRAWER MENU (When Hamburger [ ≡ ] is clicked) ================= */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs transition-opacity"
            onClick={() => setShowDrawer(false)}
          ></div>

          {/* Drawer Content */}
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-4 bg-[#fff8f5] border-b border-[#ebdcd5] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px] text-secondary-container">cookie</span>
                </div>
                <div>
                  <div className="font-serif font-bold text-base text-primary">Nguyệt Phố B2B</div>
                  <div className="text-[10px] text-stone-500">Hệ thống phân phối quà tặng doanh nghiệp</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDrawer(false)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/50 cursor-pointer"
                aria-label="Đóng menu"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Region Selector in Drawer (for mobile) */}
            <div className="p-3 bg-stone-50 border-b border-stone-200">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-amber-600">location_on</span>
                Khu vực hiện tại: <strong className="text-stone-800">{selectedRegion}</strong>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {regions.slice(0, 4).map((reg) => (
                  <button
                    key={reg}
                    type="button"
                    onClick={() => setSelectedRegion(reg)}
                    className={`px-2 py-1 rounded text-xs text-left cursor-pointer transition-colors ${selectedRegion === reg ? 'bg-[#ffba00] font-bold text-stone-950' : 'bg-white border border-stone-200 text-stone-700'
                      }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Links in Drawer */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Main App Routes */}
              <div>
                <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
                  Chức Năng Chính
                </div>
                <div className="space-y-1 text-sm">
                  {[
                    { key: 'trang-chu', label: 'Trang chủ', icon: 'home', desc: 'Cổng giao dịch chính' },
                    { key: 'tim-kiem', label: 'Sản phẩm có sẵn', icon: 'inventory_2', desc: 'Giao ngay 24h, chiết khấu tới 35%', badge: 'Mua ngay' },
                    { key: 'dat-hang-thiet-ke', label: 'Đặt bánh & In logo', icon: 'draw', desc: 'Khắc logo, hộp quà độc quyền' },
                    { key: 'so-sanh-bao-gia', label: 'Đấu thầu RFQ & Báo giá', icon: 'gavel', desc: 'Nhận 3-5 báo giá cạnh tranh', badge: 'Hot' },
                    { key: 'hop-dong-tien-do', label: 'Hợp đồng & Tiến độ PoD', icon: 'description', desc: 'Ký số điện tử & xe lạnh IoT' },
                    { key: 'giao-hang-pod', label: 'Giao hàng đa điểm', icon: 'local_shipping', desc: 'Bàn giao đúng hẹn toàn quốc' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleNav(item.key)}
                      className={`w-full p-2.5 rounded-xl flex items-start gap-3 text-left transition-colors cursor-pointer ${activePage === item.key ? 'bg-[#fff4ee] text-primary font-bold' : 'hover:bg-stone-50 text-stone-800'
                        }`}
                    >
                      <span className="material-symbols-outlined text-[20px] text-primary shrink-0 mt-0.5">
                        {item.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold">{item.label}</span>
                          {item.badge && (
                            <span className="bg-[#ffba00] text-stone-950 font-bold text-[9px] px-1.5 py-0.2 rounded">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Danh Mục Dòng Bánh */}
              <div>
                <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
                  Danh Mục Phân Loại
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {[
                    { label: 'Hộp Quà Sơn Mài VIP', icon: 'stars' },
                    { label: 'Bánh Di Sản Cổ Truyền', icon: 'history_edu' },
                    { label: 'Healthy Đường Isomalt', icon: 'eco' },
                    { label: 'Xưởng Đã Kiểm Định', icon: 'verified' },
                  ].map((cat, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleNav('tim-kiem')}
                      className="p-2 rounded-lg bg-[#fff8f5] hover:bg-[#f5e6de] text-stone-800 text-left flex items-center gap-1.5 border border-[#ebdcd5] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px] text-primary">{cat.icon}</span>
                      <span className="font-medium text-[11px] truncate">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Portals Switcher */}
              <div>
                <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
                  Cổng Nghiệp Vụ
                </div>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => handleNav('nha-cung-cap/thiet-lap-gian-hang')}
                    className="w-full p-2 rounded-lg hover:bg-stone-50 text-stone-700 text-left flex items-center gap-2 cursor-pointer text-xs"
                  >
                    <span className="material-symbols-outlined text-[18px] text-stone-500">storefront</span>
                    <span>Kênh Nhà Cung Cấp (Xưởng sản xuất)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('admin/dashboard')}
                    className="w-full p-2 rounded-lg hover:bg-stone-50 text-stone-700 text-left flex items-center gap-2 cursor-pointer text-xs"
                  >
                    <span className="material-symbols-outlined text-[18px] text-stone-500">shield</span>
                    <span>Bàn điều hành Sàn (Admin Portal)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-stone-500">Hotline B2B:</span>
                <a href="tel:18006886" className="font-bold text-primary hover:underline">
                  1800 6886 (Miễn phí)
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>SafeTrade Escrow: Bảo chứng 100% thanh toán</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
