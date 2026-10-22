import { useState } from 'react';
import CustomerHeader from '../components/layout/CustomerHeader';
import CustomerFooter from '../components/layout/CustomerFooter';
import AnnouncementPill from '../components/lucian/AnnouncementPill';
import B2BPriceCalculator from '../components/lucian/B2BPriceCalculator';
import TearOffCoupon from '../components/lucian/TearOffCoupon';
import TrustSecurityBadges from '../components/lucian/TrustSecurityBadges';
import FaqAccordion from '../components/lucian/FaqAccordion';
import RecentOrderToast from '../components/lucian/RecentOrderToast';

export default function HomePage({ onNavigate }) {
  const categories = [
    {
      key: 'nuong',
      image: '/categories/banh-nuong.jpg',
      title: 'Bánh Nướng Truyền Thống',
      desc: 'Thập cẩm gà quay, vi cá, jambon hảo hạng',
    },
    {
      key: 'deo',
      image: '/categories/banh-deo.jpg',
      title: 'Bánh Dẻo Truyền Thống',
      desc: 'Hạt sen hoa bưởi, đậu xanh cốm non',
    },
    {
      key: 'hop-vip',
      image: '/categories/hop-son-mai.jpg',
      title: 'Hộp Quà Sơn Mài Cao Cấp',
      desc: 'Sơn mài khóa đồng, khắc logo theo yêu cầu',
    },
    {
      key: 'healthy',
      image: '/categories/banh-dinh-duong.jpg',
      title: 'Bánh Dinh Dưỡng Ít Ngọt',
      desc: 'Đường ăn kiêng tự nhiên, hạt dinh dưỡng',
    },
  ];

  const featuredSuppliers = [
    {
      id: 'trang-an',
      name: 'Xưởng Bánh Tràng An',
      image: '/suppliers/xuong-trang-an.jpg',
      avatarText: 'TA',
      desc: 'Nghề truyền thống gia truyền 4 đời tại Hà Nội. Năng lực sản xuất quy mô lớn, chuyên set quà doanh nghiệp thượng hạng.',
      badge: '★ Đối Tác Tiêu Biểu',
      location: 'Hà Nội',
      capacity: '50.000 hộp/vụ',
      rating: 4.9,
      reviewsCount: 128,
      cert: 'Chuẩn An Toàn Thực Phẩm',
      tags: ['Bánh nướng gia truyền', 'Hộp sơn mài', 'In logo riêng'],
    },
    {
      id: 'huu-nghi',
      name: 'Xưởng Bánh Hữu Nghị',
      image: '/suppliers/xuong-huu-nghi.jpg',
      avatarText: 'HN',
      desc: 'Thương hiệu lâu năm, dây chuyền sản xuất hiện đại, chuyên cung cấp các gói quà tặng số lượng lớn cho tập đoàn.',
      badge: '★ Đối Tác Tiêu Biểu',
      location: 'Hà Nội & TP. HCM',
      capacity: '120.000 hộp/vụ',
      rating: 4.8,
      reviewsCount: 215,
      cert: 'Tiêu Chuẩn Xuất Khẩu',
      tags: ['Sản xuất số lượng lớn', 'Hộp cao cấp', 'Chiết khấu cao'],
    },
    {
      id: 'bao-phuong',
      name: 'Xưởng Bánh Bảo Phương',
      image: '/suppliers/xuong-bao-phuong.jpg',
      avatarText: 'BP',
      desc: 'Bánh tươi thủ công truyền thống phố cổ Thụy Khuê, hương vị sen nhài cốm non nguyên bản nổi tiếng thủ đô.',
      badge: '★ Đối Tác Tiêu Biểu',
      location: 'Hà Nội - Thụy Khuê',
      capacity: '35.000 hộp/vụ',
      rating: 4.9,
      reviewsCount: 96,
      cert: 'Chứng Nhận Vệ Sinh An Toàn',
      tags: ['Bánh dẻo cốm non', 'Bánh tươi thủ công', 'Quà biếu nghệ nhân'],
    },
  ];

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      {/* 1. Customer Navigation Header */}
      <CustomerHeader activeKey="trang-chu" onNavigate={onNavigate} />

      <main className="w-full bg-surface flex-1">
        <div className="flex flex-col w-full">

          {/* 2. HERO SECTION WITH LUCIAN #252 ANNOUNCEMENT PILL & CALL TO ACTION */}
          <section className="relative w-full overflow-hidden py-12 sm:py-16 px-4 sm:px-6">
            <div className="absolute inset-0 z-0">
              <img
                src="/hero_mooncake_bg.jpg"
                alt="Bánh Trung Thu Doanh Nghiệp"
                className="w-full h-full object-cover object-center transform scale-100 animate-float-slow"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-stone-950/65 via-stone-950/45 to-stone-950/75" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
              {/* Lucian Element #252: Shining Expandable Announcement Pill */}
              <AnnouncementPill onNavigate={onNavigate} />

              <h1 className="font-['Playfair_Display','Be_Vietnam_Pro',serif] text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Nền Tảng Cung Ứng Bánh Trung Thu Doanh Nghiệp
              </h1>

              <p className="mt-3 text-xs sm:text-sm md:text-base text-stone-100 max-w-2xl leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                Kết nối trực tiếp 50+ xưởng bánh &amp; thương hiệu uy tín — Chiết khấu tới 35% — Hợp đồng ký số e-Contract &amp; 100% xuất hóa đơn VAT minh bạch.
              </p>

              {/* 3 Trust Badges */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-white">
                <div className="flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs hover:border-[#ffba00]/60 transition-colors">
                  <span className="material-symbols-outlined text-[#ffba00] text-[16px]">verified</span>
                  <span className="font-medium">50+ Xưởng Đã Duyệt</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs hover:border-emerald-400/60 transition-colors">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px]">receipt_long</span>
                  <span className="font-medium">100% Xuất VAT &amp; Hợp Đồng</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs hover:border-[#fec971]/60 transition-colors">
                  <span className="material-symbols-outlined text-[#fec971] text-[16px]">local_shipping</span>
                  <span className="font-medium">Giao Xe Lạnh PoD Toàn Quốc</span>
                </div>
              </div>

              {/* 2 Sleek Action Cards */}
              <div className="mt-6 sm:mt-7 w-full grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 text-left max-w-3xl">
                <div
                  onClick={() => onNavigate?.('tim-kiem')}
                  className="group bg-white/95 hover:bg-white backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-2xl border border-white/80 hover:border-primary/40 flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-105 shadow-xs">
                      <span className="material-symbols-outlined text-[24px]">inventory_2</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
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
                    aria-label="Mua ngay bánh sẵn kho"
                    className="px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shrink-0 flex items-center gap-1 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Mua Ngay</span>
                    <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>

                <div
                  onClick={() => onNavigate?.('so-sanh-bao-gia')}
                  className="group bg-white/95 hover:bg-white backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-2xl border border-white/80 hover:border-amber-400/50 flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 group-hover:bg-[#ffba00] group-hover:text-stone-950 transition-all duration-300 group-hover:scale-105 shadow-xs">
                      <span className="material-symbols-outlined text-[24px]">draw</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-900">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-600" />
                          </span>
                          Báo giá xưởng
                        </span>
                        <span className="text-[11px] text-stone-500 font-medium hidden xs:inline">• Đơn từ 50 hộp</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors truncate">
                        Yêu Cầu Báo Giá Xưởng
                      </h3>
                      <p className="text-[11px] text-stone-600 truncate">
                        Khắc logo doanh nghiệp • Nhận 3–5 bản chào giá
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Tạo yêu cầu báo giá RFQ"
                    className="px-3.5 py-2 rounded-xl bg-[#ffba00] hover:bg-[#f0af00] text-stone-950 text-xs font-bold shrink-0 flex items-center gap-1 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Tạo RFQ</span>
                    <span className="material-symbols-outlined text-[15px] group-hover:rotate-12 transition-transform">gavel</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 3. LOGO MARQUEE */}
          <div className="w-full bg-[#f8ece4] border-y border-[#ebdcd5] py-3 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-3">
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
                    'Vinamilk', 'Masan Consumer', 'MB Bank', 'Shopee Việt Nam', 'Samsung Vina',
                  ].map((brand, idx) => (
                    <span key={idx} className="flex items-center gap-2 hover:text-primary transition-colors cursor-default whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffba00]" />
                      <span>{brand}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4. PRODUCT CATEGORIES GRID (MERGED FROM DEV) */}
          <section className="w-full py-12 px-gutter bg-white border-b border-stone-200/60">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>Danh Mục Quà Tặng 2025</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">Phân Loại Dòng Bánh B2B</h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate?.('tim-kiem')}
                  className="inline-flex items-center gap-1 text-sm text-primary font-bold hover:text-primary-container transition-colors group mt-2 md:mt-0 cursor-pointer"
                >
                  <span>Khám phá toàn bộ danh mục</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {categories.map((cat) => (
                  <div
                    key={cat.key}
                    onClick={() => onNavigate?.('tim-kiem')}
                    className="group bg-surface-container-low rounded-2xl overflow-hidden border border-stone-200 hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-stone-900 group-hover:text-primary transition-colors">
                          {cat.title}
                        </h3>
                        <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                          {cat.desc}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs font-bold text-primary">
                        <span>Xem chi tiết</span>
                        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. LUCIAN B2B PRICE CALCULATOR (#278) & TEAR-OFF COUPON (#298) */}
          <section className="w-full bg-gradient-to-b from-surface-container-low to-surface py-12 sm:py-16 px-gutter border-b border-stone-200/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="material-symbols-outlined text-[16px] text-amber-700">calculate</span>
                  <span>Công Cụ Báo Giá Tức Thì</span>
                </div>
                <h2 className="font-['Playfair_Display','Be_Vietnam_Pro',serif] text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">
                  Dự Toán Ngân Sách &amp; Nhận Ưu Đãi Doanh Nghiệp
                </h2>
                <p className="text-sm text-stone-600 mt-2">
                  Kéo thanh trượt để tính toán chiết khấu tự động theo số lượng hộp và nhận mã ưu đãi mùa vụ độc quyền.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 flex flex-col items-center">
                  <B2BPriceCalculator onNavigate={onNavigate} />
                </div>

                <div className="lg:col-span-5 flex flex-col gap-5 items-center">
                  <TearOffCoupon />

                  <div className="w-full max-w-[440px] bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-primary tracking-wider">
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      <span>Đặc Quyền Khách Hàng Doanh Nghiệp</span>
                    </div>
                    <ul className="text-xs text-stone-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-emerald-600 text-[16px] shrink-0 mt-0.5">check_circle</span>
                        <span><strong>01 Hộp mẫu thử tận nơi:</strong> Trải nghiệm thực tế vị bánh &amp; bao bì trước khi chốt hợp đồng.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-emerald-600 text-[16px] shrink-0 mt-0.5">check_circle</span>
                        <span><strong>Bảo chứng SafeTrade:</strong> Tiền được giữ an toàn, chỉ giải ngân khi ký nghiệm thu PoD.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-emerald-600 text-[16px] shrink-0 mt-0.5">check_circle</span>
                        <span><strong>Đội xe lạnh chuyên dụng:</strong> Đảm bảo 100% hộp bánh nguyên vẹn, không móp méo chảy dầu.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. FEATURED PRODUCTS COLLECTION */}
          <section className="w-full bg-surface py-space-xl px-gutter">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
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
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Giao trong 48h
                    </span>
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-1">
                        <span className="truncate font-medium">Kinh Đô B2B</span>
                        <span className="flex items-center gap-0.5 text-secondary font-semibold"><span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.9 (1.2k)</span>
                      </div>
                      <h3 className="font-title-md text-title-md font-bold text-on-surface line-clamp-2 min-h-[48px] group-hover:text-primary transition-colors">
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
                          className="py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-all shadow-sm cursor-pointer"
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
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      Sản xuất: 5 ngày
                    </span>
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-1">
                        <span className="truncate font-medium">Madame Hương</span>
                        <span className="flex items-center gap-0.5 text-secondary font-semibold"><span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 5.0 (860)</span>
                      </div>
                      <h3 className="font-title-md text-title-md font-bold text-on-surface line-clamp-2 min-h-[48px] group-hover:text-primary transition-colors">
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
                          onClick={() => onNavigate?.('so-sanh-bao-gia')}
                          className="py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-secondary text-on-secondary hover:opacity-95 transition-all shadow-sm cursor-pointer"
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
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Giao trong 24h
                    </span>
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-1">
                        <span className="truncate font-medium">Nghệ Nhân Hữu Nghị</span>
                        <span className="flex items-center gap-0.5 text-secondary font-semibold"><span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.8 (950)</span>
                      </div>
                      <h3 className="font-title-md text-title-md font-bold text-on-surface line-clamp-2 min-h-[48px] group-hover:text-primary transition-colors">
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
                          className="py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-all shadow-sm cursor-pointer"
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
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      Sản xuất: 3 ngày
                    </span>
                  </div>
                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-1">
                        <span className="truncate font-medium">Thu Hương Bakery</span>
                        <span className="flex items-center gap-0.5 text-secondary font-semibold"><span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.9 (620)</span>
                      </div>
                      <h3 className="font-title-md text-title-md font-bold text-on-surface line-clamp-2 min-h-[48px] group-hover:text-primary transition-colors">
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
                          onClick={() => onNavigate?.('so-sanh-bao-gia')}
                          className="py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-secondary text-on-secondary hover:opacity-95 transition-all shadow-sm cursor-pointer"
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

          {/* 7. FEATURED SUPPLIERS SHOWCASE (MERGED FROM DEV) */}
          <section className="w-full py-12 px-gutter bg-surface-container-low border-b border-stone-200/60">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Mạng Lưới Sản Xuất B2B</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">Đối Tác Xưởng Bánh Tiêu Biểu</h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate?.('tim-kiem')}
                  className="inline-flex items-center gap-1 text-sm text-primary font-bold hover:text-primary-container transition-colors group mt-2 md:mt-0 cursor-pointer"
                >
                  <span>Xem tất cả 50+ xưởng đối tác</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredSuppliers.map((sup) => (
                  <div
                    key={sup.id}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
                      <img
                        src={sup.image}
                        alt={sup.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-full">
                        {sup.badge}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-stone-900">{sup.name}</h3>
                          <span className="text-xs text-amber-600 font-bold flex items-center gap-0.5">
                            ★ {sup.rating} ({sup.reviewsCount})
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-stone-500 mt-1 mb-2">
                          <span>{sup.location}</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-semibold">{sup.capacity}</span>
                        </div>

                        <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                          {sup.desc}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {sup.tags.map((tag, idx) => (
                            <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => onNavigate?.('tim-kiem')}
                          className="py-2 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                        >
                          Xem Sản Phẩm
                        </button>
                        <button
                          type="button"
                          onClick={() => onNavigate?.('so-sanh-bao-gia')}
                          className="py-2 text-xs font-bold text-white bg-primary hover:bg-primary-container rounded-lg transition-colors cursor-pointer shadow-xs"
                        >
                          Nhận Báo Giá
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 8. LUCIAN TRUST & SECURITY BADGES (#243) */}
          <section className="w-full bg-[#fbf5f2] py-12 sm:py-16 px-gutter border-b border-stone-200/60">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px] text-emerald-700">security</span>
                    <span>An Toàn &amp; Pháp Lý Tuyệt Đối</span>
                  </div>

                  <h2 className="font-['Playfair_Display','Be_Vietnam_Pro',serif] text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">
                    Chuẩn Mực Vận Hành B2B Chuyên Nghiệp Hàng Đầu
                  </h2>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    Khác biệt với việc mua lẻ trôi nổi trên thị trường, Nguyệt Phố bảo vệ quyền lợi doanh nghiệp bằng hợp đồng ký số pháp lý, hóa đơn VAT điện tử, kiểm soát xe lạnh và bảo chứng dòng tiền SafeTrade.
                  </p>

                  <div className="pt-2 space-y-2.5">
                    <div className="flex items-center gap-3 text-xs text-stone-700">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">✓</div>
                      <span><strong>Kiểm định xưởng nghiêm ngặt:</strong> 100% cơ sở sản xuất có giấy chứng nhận ISO / HACCP.</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-stone-700">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">✓</div>
                      <span><strong>Không rủi ro thanh toán:</strong> Tiền được bảo chứng ký quỹ, giải ngân khi quý công ty nghiệm thu xong.</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-stone-700">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">✓</div>
                      <span><strong>Cam kết thời gian:</strong> Đền bù thiệt hại và đổi 100% sản phẩm nếu chậm trễ tiến độ trao tặng.</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 flex justify-center">
                  <TrustSecurityBadges />
                </div>
              </div>
            </div>
          </section>

          {/* 9. VENDOR BANNER */}
          <section className="w-full bg-surface py-space-lg px-gutter">
            <div className="max-w-7xl mx-auto">
              <div className="relative overflow-hidden bg-gradient-to-r from-[#7a0010] via-[#8f0e19] to-[#7a0010] text-on-primary rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#ffba00]/15 rounded-full blur-3xl pointer-events-none" />

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
                    onClick={() => onNavigate?.('thiet-lap-gian-hang')}
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white text-primary hover:bg-[#fff8f5] font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    <span>Đăng ký mở gian hàng (Xét duyệt 24h)</span>
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 10. LUCIAN FAQ ACCORDION (#044) */}
          <section className="w-full bg-surface-container-low py-12 sm:py-16 px-gutter border-t border-stone-200/50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="material-symbols-outlined text-[16px] text-amber-700">help</span>
                  <span>Giải Quyết Mọi Thắc Mắc Đặt Hàng</span>
                </div>
                <h2 className="font-['Playfair_Display','Be_Vietnam_Pro',serif] text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">
                  Câu Hỏi Thường Gặp Của Doanh Nghiệp (FAQ)
                </h2>
                <p className="text-sm text-stone-600 mt-2 max-w-xl mx-auto">
                  Tất cả thông tin minh bạch về xuất hóa đơn VAT, nhận hộp mẫu thử, ký quỹ an toàn và cam kết giao vận PoD xe lạnh.
                </p>
              </div>

              {/* Lucian Element #044: FAQ Accordion */}
              <FaqAccordion onNavigate={onNavigate} />
            </div>
          </section>

          {/* 11. CLOSING CTA SECTION */}
          <section className="w-full bg-gradient-to-b from-stone-100 to-surface py-12 sm:py-16 px-gutter border-t border-stone-200/60">
            <div className="max-w-5xl mx-auto text-center bg-gradient-to-br from-[#7a0010] via-[#541829] to-[#3c1723] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-amber-500/30">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-[#ffba00]/60 text-[#fec971] text-xs font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px] text-[#ffba00]">verified</span>
                  <span>Giải Pháp Quà Tặng Doanh Nghiệp 2025</span>
                </div>

                <h2 className="font-['Playfair_Display','Be_Vietnam_Pro',serif] text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  Sẵn Sàng Chuẩn Bị Quà Tặng Trung Thu Cho Doanh Nghiệp?
                </h2>

                <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
                  Nhận trọn bộ catalog 120+ mẫu hộp cao cấp, bảng báo giá chiết khấu xưởng tới 35% và đăng ký nhận 01 hộp mẫu thử miễn phí tận nơi.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => onNavigate?.('so-sanh-bao-gia')}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#ffba00] hover:bg-[#f0af00] text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">gavel</span>
                    <span>Tạo Yêu Cầu Báo Giá (RFQ)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate?.('tim-kiem')}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">menu_book</span>
                    <span>Xem 120+ Mẫu Hộp 2025</span>
                  </button>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-stone-300">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-amber-400 text-[16px]">call</span>
                    Hotline B2B: <strong className="text-white font-bold">1800 6886</strong> (Miễn phí)
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-emerald-400 text-[16px]">verified_user</span>
                    Ký quỹ SafeTrade 100% An Toàn
                  </span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* 12. LUCIAN RECENT ORDER TOAST (#253) */}
      <RecentOrderToast />

      {/* 13. Customer Footer */}
      <CustomerFooter onNavigate={onNavigate} />
    </div>
  );
}
