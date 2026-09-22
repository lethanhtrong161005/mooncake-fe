import React from 'react';

export default function Header({ activePage = 'trang-chu', onNavigate }) {
  const navItems = [
    { key: 'trang-chu', label: 'Trang chủ' },
    { key: 'bo-suu-tap-banh', label: 'Bộ sưu tập Bánh' },
    { key: 'dat-hang-doanh-nghiep', label: 'Đặt hàng Doanh nghiệp (B2B)' },
    { key: 'yeu-cau-bao-gia', label: 'Yêu cầu Báo giá (RFQ)' },
    { key: 'so-sanh-thau-rfq', label: 'Quản lý Báo giá & So sánh Thầu' },
    { key: 'dang-ky-mau-thu', label: 'Đăng ký Mẫu thử' },
    { key: 'danh-gia-va-phe-duyet-mau-thu', label: 'Phê duyệt Mẫu thử' },
    { key: 'hop-dong-dien-tu', label: 'Hợp đồng Điện tử' },
  ];

  const handleNav = (path) => {
    onNavigate?.(path);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-xl border-b border-secondary/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-margin flex items-center justify-between gap-space-md">
        {/* Brand Logo */}
        <div className="flex items-center gap-space-lg shrink-0">
          <a
            className="flex items-center gap-space-sm cursor-pointer"
            onClick={(e) => { e.preventDefault(); handleNav('trang-chu'); }}
            href="#trang-chu"
          >
            <img
              alt="Nguyệt Phố Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJveLEK_wGE2KRnLsCiAvUmuX7W6vXgqjm6RLxajD-2yTZlgRorM4Lv1TABx4HseDrFH-6QwbM7hencCJeSoKo_EIiNVKF6-UO3FQReiq2Jmr8Xp7UVtBsFcCbljpDAbOkSRIgAXQSkgyk2amHhVEIEbKkDjZ8xzeOdrCYzIoKvdCbrdTSQTdPzeOSGjeeJOF8pS8A4Vo7fsESC4tydQAkyexGdYame7qDCvLzP2RgqdfNsKvps8jbqA"
            />
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-sm text-primary tracking-tight leading-none">
                Nguyệt Phố
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary mt-0.5">
                Artisanal Mooncake
              </span>
            </div>
          </a>

          {/* Search Box */}
          <div className="hidden xl:flex items-center bg-surface-container-low rounded-lg px-3 py-1.5 w-64 shadow-inner">
            <span className="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
            <input
              className="bg-transparent w-full text-on-surface placeholder:text-outline text-body-sm font-body-sm focus:outline-none"
              placeholder="Tìm xưởng bánh, vị bánh..."
              type="text"
            />
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 bg-surface-container-low/60 p-1 rounded-xl overflow-x-auto max-w-2xl">
          {navItems.map((item) => {
            const isActive = activePage === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNav(item.key)}
                className={`px-2.5 py-1.5 rounded-lg font-label-md text-label-md whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* CTA & Profile */}
        <div className="flex items-center gap-space-md shrink-0">
          <button
            type="button"
            onClick={() => handleNav('yeu-cau-bao-gia')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm hover:bg-primary transition-all active:scale-[0.99] shadow-sm whitespace-nowrap"
          >
            Tạo RFQ Báo giá
          </button>
          
          <div className="flex items-center gap-2.5 pl-2 border-l border-outline-variant/50">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-secondary/40"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD25PEZy7dhtg-6utRLtifBrXH5Y01cdK-ehF3-1ok4nscaIloRRpEFebCXdeZeX8p4vmbDj6e-P4RLZinYLtxetapsl1FtAcyC0Stym5Lh-oXBvXfMQKjjo7aA5jLw1Cj5xBWn92OJQDqYdlMGVMDwlQgvtGiKiDHJ7mrL_BSR0t6d_3__PTvQelM9NLIMKGvkbEhA3_u5z5PgL-nid_xcrFabKNotUJELMya4sI-aA3tnEcx4-A51Nw"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="font-label-md text-label-md text-on-surface leading-tight font-semibold">
                Vingroup Procurement
              </span>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                Doanh nghiệp VIP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="lg:hidden flex items-center gap-1.5 px-4 py-2 overflow-x-auto bg-surface-container-low border-t border-outline-variant/20 scrollbar-none">
        {navItems.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => handleNav(item.key)}
            className={`px-2.5 py-1 rounded text-xs whitespace-nowrap ${
              activePage === item.key
                ? 'bg-primary-container text-on-primary font-medium'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
