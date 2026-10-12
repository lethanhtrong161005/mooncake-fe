import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Danh sách hoạt động đặt hàng & RFQ thực tế theo thời gian thực (Social Proof Ticker)
const LIVE_B2B_ACTIVITIES = [
  {
    icon: 'order_approve',
    company: 'FPT Software',
    action: 'vừa chốt 350 Hộp Nguyệt Viên Tri Kỷ',
    time: '2 phút trước',
    badge: 'Đơn Sẵn Kho',
    badgeColor: 'bg-emerald-100 text-emerald-800'
  },
  {
    icon: 'gavel',
    company: 'Techcombank Chi nhánh Thăng Long',
    action: 'vừa mở thầu RFQ 500 hộp sơn mài',
    time: '4 phút trước',
    badge: 'Đấu Thầu RFQ',
    badgeColor: 'bg-amber-100 text-amber-900'
  },
  {
    icon: 'local_shipping',
    company: 'Vingroup Retail',
    action: 'đã hoàn tất nghiệm thu & bàn giao xe lạnh PoD',
    time: '6 phút trước',
    badge: 'Đã Nghiệm Thu',
    badgeColor: 'bg-blue-100 text-blue-900'
  },
  {
    icon: 'draw',
    company: 'Vinamilk Corporation',
    action: 'vừa ký kết hợp đồng điện tử e-Contract 400 hộp',
    time: '9 phút trước',
    badge: 'Ký Số B2B',
    badgeColor: 'bg-purple-100 text-purple-900'
  }
];

export default function HomePage({ onNavigate }) {
  // Trạng thái thông báo hoạt động thời gian thực (Live Toast)
  const [noticeIdx, setNoticeIdx] = useState(0);
  const [showNotice, setShowNotice] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setNoticeIdx((prev) => (prev + 1) % LIVE_B2B_ACTIVITIES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const currentNotice = LIVE_B2B_ACTIVITIES[noticeIdx];

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">
      {/* Redesigned E-Commerce Header */}
      <Header activePage="trang-chu" onNavigate={onNavigate} />

      <main className="w-full pt-[68px] sm:pt-[72px] bg-surface min-h-[calc(100vh-280px)]">
        <div className="flex flex-col w-full">

          {/* 1. HERO SECTION CÓ ANIMATION & HIỆU ỨNG TƯƠNG TÁC */}
          <section className="relative w-full overflow-hidden py-10 sm:py-14 px-4 sm:px-6">
            {/* Background Image & Soft Transparent Gradient Scrim */}
            <div className="absolute inset-0 z-0">
              <img
                src="/hero_mooncake_bg.jpg"
                alt="Bánh Trung Thu Doanh Nghiệp"
                className="w-full h-full object-cover object-center transform scale-100 animate-float-slow"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-stone-950/45 via-stone-950/25 to-stone-950/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
              {/* Season Tag with Golden Glow Pulse */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-[#ffba00]/80 text-[#fec971] mb-3 shadow-sm animate-pulse-glow cursor-default select-none transition-transform hover:scale-105">
                <span className="material-symbols-outlined text-[15px] text-[#ffba00] animate-spin-slow">verified</span>
                <span className="text-[11px] font-bold uppercase tracking-wider">Cổng Phân Phối Quà Tặng Doanh Nghiệp 2025</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] animate-fade-in-up">
                Nền Tảng Cung Ứng Bánh Trung Thu Doanh Nghiệp
              </h1>

              {/* Subtitle */}
              <p className="mt-2.5 text-xs sm:text-sm md:text-base text-stone-100 max-w-2xl leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                Kết nối trực tiếp 50+ xưởng bánh &amp; thương hiệu uy tín — Chiết khấu tới 35% — Hợp đồng &amp; VAT minh bạch.
              </p>

              {/* 3 Trust Badges (Compact) */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-white">
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs hover:border-[#ffba00]/60 transition-colors">
                  <span className="material-symbols-outlined text-[#ffba00] text-[16px]">verified</span>
                  <span className="font-medium">50+ Xưởng Đã Duyệt</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs hover:border-emerald-400/60 transition-colors">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px]">receipt_long</span>
                  <span className="font-medium">100% Xuất VAT &amp; Hợp Đồng</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs hover:border-[#fec971]/60 transition-colors">
                  <span className="material-symbols-outlined text-[#fec971] text-[16px]">local_shipping</span>
                  <span className="font-medium">Giao PoD Toàn Quốc</span>
                </div>
              </div>

              {/* 2 Sleek Action Cards với hiệu ứng Hover Lift & Shimmer Button */}
              <div className="mt-5 sm:mt-6 w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 text-left">
                {/* Card 1: Hàng Sẵn Kho */}
                <div
                  onClick={() => onNavigate?.('tim-kiem')}
                  className="group bg-white/95 hover:bg-white backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-md hover:shadow-2xl border border-white/80 hover:border-primary/30 flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-105 shadow-xs">
                      <span className="material-symbols-outlined text-[24px]">inventory_2</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600"></span>
                          </span>
                          Sẵn Kho 24h
                        </span>
                        <span className="text-[11px] text-stone-500 font-medium hidden xs:inline">• Đơn từ 20 hộp</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-primary transition-colors truncate">
                        Bánh Sẵn Kho Giao Hỏa Tốc
                      </h3>
                      <p className="text-[11px] text-stone-600 truncate">
                        Chiết khấu bậc thang tới 35% • Xuất VAT tức thì
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="animate-shimmer px-3 sm:px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shrink-0 flex items-center gap-1 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Mua Ngay</span>
                    <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>

                {/* Card 2: Thiết Kế & Báo Giá RFQ */}
                <div
                  onClick={() => onNavigate?.('yeu-cau-bao-gia')}
                  className="group bg-white/95 hover:bg-white backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-md hover:shadow-2xl border border-white/80 hover:border-amber-400/50 flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 group-hover:bg-[#ffba00] group-hover:text-stone-950 transition-all duration-300 group-hover:scale-105 shadow-xs">
                      <span className="material-symbols-outlined text-[24px]">draw</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-900">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-600"></span>
                          </span>
                          Báo giá xưởng
                        </span>
                        <span className="text-[11px] text-stone-500 font-medium hidden xs:inline">• Đơn từ 50 hộp</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors truncate">
                        Báo Giá Xưởng
                      </h3>
                      <p className="text-[11px] text-stone-600 truncate">
                        Khắc logo doanh nghiệp • Nhận 3–5 bản chào giá
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="animate-shimmer px-3 sm:px-3.5 py-2 rounded-xl bg-[#ffba00] hover:bg-[#f0af00] text-stone-950 text-xs font-bold shrink-0 flex items-center gap-1 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Tạo báo giá</span>
                    <span className="material-symbols-outlined text-[15px] group-hover:rotate-12 transition-transform">gavel</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 2. THANH LOGO ĐỐI TÁC DOANH NGHIỆP CUỘN MARQUEE MƯỢT MÀ */}
          <div className="w-full bg-[#f8ece4] border-y border-[#ebdcd5] py-2.5 sm:py-3 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-2.5 sm:gap-4">
              <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-stone-800 whitespace-nowrap">
                <span className="material-symbols-outlined text-[16px] text-amber-600">stars</span>
                <span>500+ Doanh nghiệp đã tin chọn:</span>
              </div>
              <div className="overflow-hidden relative w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <div className="animate-marquee flex items-center gap-8 text-xs font-semibold text-stone-600 uppercase tracking-wider select-none py-0.5">
                  {[
                    'Vietcombank', 'FPT Corporation', 'Vingroup Retail', 'Techcombank', 'Viettel Telecom',
                    'Vinamilk', 'Masan Consumer', 'MB Bank', 'Shopee Việt Nam', 'Samsung Vina',
                    'Vietcombank', 'FPT Corporation', 'Vingroup Retail', 'Techcombank', 'Viettel Telecom',
                    'Vinamilk', 'Masan Consumer', 'MB Bank', 'Shopee Việt Nam', 'Samsung Vina'
                  ].map((brand, idx) => (
                    <span key={idx} className="flex items-center gap-2 hover:text-primary transition-colors cursor-default whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffba00]"></span>
                      <span>{brand}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. BỘ SƯU TẬP TIÊU BIỂU VỚI CARD HOVER MICRO-ANIMATIONS */}
          <section className="w-full bg-surface py-space-xl px-gutter">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    <span>Sản phẩm nổi bật vụ mùa 2025</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">Bộ Sưu Tập Bánh Trung Thu Tiêu Biểu</h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate?.('tim-kiem')}
                  className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-bold hover:text-primary-container transition-colors group mt-2 md:mt-0 cursor-pointer"
                >
                  <span>Xem tất cả 120+ mẫu hộp 2025</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">

                {/* PRODUCT 1 */}
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-stone-200/70 hover:border-[#ffba00]/40">
                  <div className="relative w-full aspect-square bg-surface-container overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0gce54U1n3kxiDSj_WZFJlCiiqIoXmsqFi5RYcNbE-HyrDYGdatgnVooMWFft7pgTd6ywe3cnZFmwRXVj6-HW98F0Fwk3gNfTVBSw7rBLbrF33ZhdDpVwyiRH56g4-dfFbFya0reGpmL-Hg-p2xW4ghvbZt-9XsLApvBWLRHyojKhGRFcCW7kp_sDFULOOcoXGqIknBa3fyYIkUUZ5QoR6YDPYuQqPll4ZIqIrynw9uXYHAPGqKJt"
                      alt="Hộp Nguyệt Viên Tri Kỷ"
                    />
                    <span className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-0.5 rounded font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">verified</span> NCC Xác Minh
                    </span>
                    <span className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-md text-white px-2 py-0.5 rounded text-[11px] font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Giao trong 48h
                    </span>
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-1">
                        <span className="truncate font-medium">Kinh Đô B2B</span>
                        <span className="flex items-center gap-0.5 text-secondary font-semibold"><span className="material-symbols-outlined text-[14px]" style={{ "fontVariationSettings": "'FILL' 1" }}>star</span> 4.9 (1.2k)</span>
                      </div>
                      <h3 className="font-title-md text-title-md font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                        Hộp Thượng Hạng “Nguyệt Viên Tri Kỷ”
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">4 bánh x 180g • Thập cẩm sò điệp, sen dừa</p>
                      <div className="mt-space-sm flex flex-wrap gap-1">
                        <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface">Tối thiểu: 30 hộp</span>
                        <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface">Hỗ trợ in logo</span>
                      </div>
                    </div>
                    <div className="mt-space-md pt-space-xs">
                      <div className="flex items-baseline justify-between mb-space-sm">
                        <div>
                          <span className="text-body-sm font-body-sm text-on-surface-variant block">Từ (đã giảm 12%):</span>
                          <span className="font-headline-sm text-headline-sm font-bold text-primary">480.000 ₫</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-tertiary bg-tertiary-fixed px-1.5 py-0.5 rounded font-semibold">-12%</span>
                      </div>
                      <div className="grid grid-cols-2 gap-space-xs">
                        <button
                          onClick={() => onNavigate?.('san-pham')}
                          className="py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors cursor-pointer"
                          type="button"
                        >
                          Mẫu thử
                        </button>
                        <button
                          onClick={() => onNavigate?.('tim-kiem')}
                          className="animate-shimmer py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-all shadow-sm cursor-pointer"
                          type="button"
                        >
                          Đặt ngay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PRODUCT 2 */}
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-stone-200/70 hover:border-[#ffba00]/40">
                  <div className="relative w-full aspect-square bg-surface-container overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQMG1AQ2M24puU7Wk-qFSPiPY5ooN2Vb1C-bf4rPc15CeqNt3b2CutQ0_J8tcAIyIjgguRLdgomEbGT7FWt_c6rsBDZsd4VMHA6_R31OVY3bcB2Yyh4NXr4fFrt1Yy38xhNpyqGWpywfcMC0_YsZu2Ph5y0ASpB1YxK4_Mez7znUkz_xaEJAIG-EeOdZn6pKU2ilOsgbPZ7QnMUu7J5UHMQi_5e8ByNty_3-SxqavFi2-TZSOB3Aog"
                      alt="Hộp Sơn Mài Hoàng Kim Vọng Nguyệt"
                    />
                    <span className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-0.5 rounded font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">verified</span> NCC Xác Minh
                    </span>
                    <span className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-md text-white px-2 py-0.5 rounded text-[11px] font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                      Sản xuất: 5 ngày
                    </span>
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-1">
                        <span className="truncate font-medium">Madame Hương</span>
                        <span className="flex items-center gap-0.5 text-secondary font-semibold"><span className="material-symbols-outlined text-[14px]" style={{ "fontVariationSettings": "'FILL' 1" }}>star</span> 5.0 (860)</span>
                      </div>
                      <h3 className="font-title-md text-title-md font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                        Hộp Sơn Mài “Hoàng Kim Vọng Nguyệt”
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">6 bánh Lava trứng chảy + Hũ trà sen Tây Hồ</p>
                      <div className="mt-space-sm flex flex-wrap gap-1">
                        <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface">Tối thiểu: 20 hộp</span>
                        <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface">Hộp gỗ sơn mài</span>
                      </div>
                    </div>
                    <div className="mt-space-md pt-space-xs">
                      <div className="flex items-baseline justify-between mb-space-sm">
                        <div>
                          <span className="text-body-sm font-body-sm text-on-surface-variant block">Từ (bậc B2B):</span>
                          <span className="font-headline-sm text-headline-sm font-bold text-primary">850.000 ₫</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-secondary bg-secondary-fixed px-1.5 py-0.5 rounded font-semibold">VIP</span>
                      </div>
                      <div className="grid grid-cols-2 gap-space-xs">
                        <button
                          onClick={() => onNavigate?.('san-pham')}
                          className="py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors cursor-pointer"
                          type="button"
                        >
                          Mẫu thử
                        </button>
                        <button
                          onClick={() => onNavigate?.('yeu-cau-bao-gia')}
                          className="animate-shimmer py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-secondary text-on-secondary hover:opacity-95 transition-all shadow-sm cursor-pointer"
                          type="button"
                        >
                          Gửi RFQ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PRODUCT 3 */}
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-stone-200/70 hover:border-[#ffba00]/40">
                  <div className="relative w-full aspect-square bg-surface-container overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSUU9euk8QszNuwm4Nu_KHGlyRVO6UZa1xAl1qcfUXYkLsaNkL_fo9Y0eBt_pwk-0eq4n7nXJd22bVLwySIH28YqkxQLX1sH74WnTPo1OmweLxstBD8bq7nZpvvI6hI1yfphoRnfldacMi4cEWs-EbM0ix2RwtoGX0Ip90H7Xk7euQe5hhZqxAlK5KNUXqbAtTq5HnS100yvTqcSeSIXTgqcollqTsTw7gCUY5IETDzQU9UuMPqq2H"
                      alt="Bánh Dưỡng Sinh Thanh Nguyệt Yến"
                    />
                    <span className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-0.5 rounded font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">verified</span> NCC Xác Minh
                    </span>
                    <span className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-md text-white px-2 py-0.5 rounded text-[11px] font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Giao trong 24h
                    </span>
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-1">
                        <span className="truncate font-medium">Nghệ Nhân Hữu Nghị</span>
                        <span className="flex items-center gap-0.5 text-secondary font-semibold"><span className="material-symbols-outlined text-[14px]" style={{ "fontVariationSettings": "'FILL' 1" }}>star</span> 4.8 (950)</span>
                      </div>
                      <h3 className="font-title-md text-title-md font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                        Bánh Dưỡng Sinh “Thanh Nguyệt Yến”
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">4 bánh yến sào hạt sen • Ít ngọt ăn kiêng</p>
                      <div className="mt-space-sm flex flex-wrap gap-1">
                        <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface">Tối thiểu: 50 hộp</span>
                        <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface">Healthy ít đường</span>
                      </div>
                    </div>
                    <div className="mt-space-md pt-space-xs">
                      <div className="flex items-baseline justify-between mb-space-sm">
                        <div>
                          <span className="text-body-sm font-body-sm text-on-surface-variant block">Từ (đã giảm 10%):</span>
                          <span className="font-headline-sm text-headline-sm font-bold text-primary">390.000 ₫</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-tertiary bg-tertiary-fixed px-1.5 py-0.5 rounded font-semibold">-10%</span>
                      </div>
                      <div className="grid grid-cols-2 gap-space-xs">
                        <button
                          onClick={() => onNavigate?.('san-pham')}
                          className="py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors cursor-pointer"
                          type="button"
                        >
                          Mẫu thử
                        </button>
                        <button
                          onClick={() => onNavigate?.('tim-kiem')}
                          className="animate-shimmer py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-all shadow-sm cursor-pointer"
                          type="button"
                        >
                          Đặt ngay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PRODUCT 4 */}
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-stone-200/70 hover:border-[#ffba00]/40">
                  <div className="relative w-full aspect-square bg-surface-container overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOL-Cav9v6rbL1i553OXUyPC1E2zvaok6KNoZjacOPOUdvERGXoE-Wh7kXxHfJEW2bvbWVefYDVCEQ5DAOc4m9LJlOWah_9tg75rJy6I6bysyxwwsNXa6GbzQb4lcysJAIM8wkk7aei8UgYBX40_YCYa1UmqA4X_uylmQwjBQiMcpuN4txuO9dekT-HywkN-YeCgIvkq1Aq-D2vCp8-cG5ZdaSAOc_PGVCOWZqT5EDsT5PZthuvrb3"
                      alt="Set Quà Đoàn Viên Phú Quý"
                    />
                    <span className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-0.5 rounded font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">verified</span> NCC Xác Minh
                    </span>
                    <span className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-md text-white px-2 py-0.5 rounded text-[11px] font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                      Sản xuất: 3 ngày
                    </span>
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-1">
                        <span className="truncate font-medium">Thu Hương Bakery</span>
                        <span className="flex items-center gap-0.5 text-secondary font-semibold"><span className="material-symbols-outlined text-[14px]" style={{ "fontVariationSettings": "'FILL' 1" }}>star</span> 4.9 (620)</span>
                      </div>
                      <h3 className="font-title-md text-title-md font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                        Set Quà “Đoàn Viên Phú Quý”
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">4 bánh thượng hạng + 1 Chai vang cao cấp</p>
                      <div className="mt-space-sm flex flex-wrap gap-1">
                        <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface">Tối thiểu: 25 hộp</span>
                        <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface">Kèm túi &amp; thiệp</span>
                      </div>
                    </div>
                    <div className="mt-space-md pt-space-xs">
                      <div className="flex items-baseline justify-between mb-space-sm">
                        <div>
                          <span className="text-body-sm font-body-sm text-on-surface-variant block">Từ (bậc 100 hộp):</span>
                          <span className="font-headline-sm text-headline-sm font-bold text-primary">720.000 ₫</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-secondary bg-secondary-fixed px-1.5 py-0.5 rounded font-semibold">-15%</span>
                      </div>
                      <div className="grid grid-cols-2 gap-space-xs">
                        <button
                          onClick={() => onNavigate?.('san-pham')}
                          className="py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors cursor-pointer"
                          type="button"
                        >
                          Mẫu thử
                        </button>
                        <button
                          onClick={() => onNavigate?.('yeu-cau-bao-gia')}
                          className="animate-shimmer py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-secondary text-on-secondary hover:opacity-95 transition-all shadow-sm cursor-pointer"
                          type="button"
                        >
                          Gửi RFQ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 4. BANNER DÀNH CHO NHÀ SẢN XUẤT CÓ ANIMATION TỎA SÁNG */}
          <section className="w-full bg-surface py-space-lg px-gutter">
            <div className="max-w-7xl mx-auto">
              <div className="relative overflow-hidden bg-gradient-to-r from-[#7a0010] via-[#8f0e19] to-[#7a0010] text-on-primary rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
                {/* Background decorative glowing orb */}
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#ffba00]/15 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 max-w-2xl space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 font-label-sm text-label-sm font-bold uppercase px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container shadow-xs">
                    <span className="material-symbols-outlined text-[15px] text-amber-900">storefront</span>
                    <span>Dành cho Nhà Sản Xuất &amp; Nghệ Nhân</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-primary leading-tight">
                    Bạn là xưởng sản xuất hoặc thương hiệu bánh Trung Thu uy tín?
                  </h3>
                  <p className="font-body-md text-body-md text-rose-100/90 leading-relaxed">
                    Gia nhập mạng lưới B2B Nguyệt Phố, tiếp cận hàng nghìn khách hàng doanh nghiệp trong mùa vụ 2025. Hỗ trợ hợp đồng e-Contract, ký quỹ và vận hành trọn gói.
                  </p>
                </div>
                <div className="relative z-10 shrink-0 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => onNavigate?.('nha-cung-cap/thiet-lap-gian-hang')}
                    className="animate-shimmer w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white text-primary hover:bg-[#fff8f5] font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Đăng ký mở gian hàng (Xét duyệt 24h)</span>
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* 5. FLOATING LIVE SOCIAL PROOF TICKER (TOAST THÔNG BÁO HOẠT ĐỘNG THỜI GIAN THỰC) */}
      {showNotice && (
        <aside className="fixed bottom-5 left-5 z-40 max-w-sm hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-[0_10px_35px_-5px_rgba(0,0,0,0.15)] border border-[#ebdcd5] animate-fade-in-up transition-all hover:scale-[1.02]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-primary-container text-[#fec971] flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[19px]">
              {currentNotice.icon}
            </span>
          </div>
          <div className="min-w-0 pr-1">
            <div className="flex items-center gap-1.5 leading-tight">
              <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded ${currentNotice.badgeColor}`}>
                {currentNotice.badge}
              </span>
              <span className="text-[10px] text-stone-500">
                • {currentNotice.time}
              </span>
            </div>
            <p className="text-xs text-stone-800 font-medium truncate mt-0.5">
              <strong className="text-stone-900 font-bold">
                {currentNotice.company}
              </strong>{' '}
              {currentNotice.action}
            </p>
          </div>
          <button
            onClick={() => setShowNotice(false)}
            className="text-stone-400 hover:text-stone-700 shrink-0 p-1 cursor-pointer transition-colors"
            title="Đóng thông báo"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">close</span>
          </button>
        </aside>
      )}

      {/* Standard E-Commerce Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
