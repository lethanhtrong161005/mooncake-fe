import React, { useEffect } from 'react';

export default function HomePage({ onNavigate }) {

  useEffect(() => {
    try {
      
                (function initCalculator() {
    const slider = document.getElementById('box-range-slider');
                const display = document.getElementById('quantity-display');
                const discountEl = document.getElementById('tier-discount');
                const perksEl = document.getElementById('tier-perks');

                if (!slider || !display || !discountEl || !perksEl) return;

                function updateTier(qty) {
                    display.textContent = Number(qty).toLocaleString('vi-VN');

                if (qty < 100) {
                    discountEl.textContent = 'Giảm 15%';
                perksEl.innerHTML = `
                <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                    <span>Miễn phí thiệp chúc mừng theo mẫu trang trọng</span>
                </li>
                <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                    <span>Miễn phí vận chuyển nội thành 01 địa điểm</span>
                </li>
                <li class="flex items-center gap-2 text-outline">
                    <span class="material-symbols-outlined text-[18px]">radio_button_unchecked</span>
                    <span>In logo (áp dụng từ 100 hộp trở lên)</span>
                </li>
                `;
      } else if (qty < 500) {
                    discountEl.textContent = 'Giảm 25%';
                perksEl.innerHTML = `
                <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                    <span>Miễn phí in logo doanh nghiệp ép kim nhũ vàng</span>
                </li>
                <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                    <span>Tặng thiệp chúc Trung Thu thiết kế tone riêng</span>
                </li>
                <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                    <span>Cung cấp hộp mẫu thử tận nơi miễn phí</span>
                </li>
                `;
      } else {
                    discountEl.textContent = 'Giảm 35%';
                perksEl.innerHTML = `
                <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                    <span>Chiết khấu kịch trần 35% từ xưởng gốc</span>
                </li>
                <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                    <span>Tùy chỉnh thiết kế hộp riêng (khắc laser, sơn mài, đai lụa)</span>
                </li>
                <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                    <span>Phân luồng giao hàng tận nơi nhiều chi nhánh toàn quốc</span>
                </li>
                `;
      }
    }

                slider.addEventListener('input', function(e) {
                    updateTier(e.target.value);
    });

                window.setQuantity = function(val) {
                    slider.value = val;
                updateTier(val);
    };
  })();
            
    } catch (err) {
      console.warn('Script execution notice:', err);
    }
  }, []);

  return (
    <main className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]"><div className="flex flex-col w-full">
            {/* HERO SECTION */}
            <section className="relative w-full overflow-hidden bg-surface-container-low py-space-xl lg:py-24">
                {/* Subtle Golden Moon Glow in Background */}
                <div className="absolute -top-36 right-[-8%] w-[580px] h-[580px] rounded-full bg-secondary-container/20 blur-[130px] pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-20 w-[420px] h-[420px] rounded-full bg-primary/5 blur-[100px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-margin relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
                        {/* Text Column */}
                        <div className="lg:col-span-7 space-y-space-lg">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest shadow-sm">
                                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                                <span className="font-label-md text-label-md text-secondary font-medium tracking-wide">Mùa Trăng 2024 • Cổng Mua Sắm B2B Trực Tuyến</span>
                            </div>
                            <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-primary tracking-tight leading-[1.15]">
                                Tinh Hoa Trăng Rằm — <br className="hidden sm:inline" />
                                <span className="text-on-surface">Giải Pháp Quà Tặng</span> <br />
                                <span className="italic font-normal text-secondary">Doanh Nghiệp Toàn Diện</span>
                            </h1>
                            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                                Kết nối trực tiếp 50+ xưởng bánh nghệ nhân &amp; thương hiệu di sản hàng đầu. Tiết kiệm ngân sách với chiết khấu tới 35%, đồng hành cùng giải pháp in ấn logo độc quyền.
                            </p>
                            {/* Dual Buttons */}
                            <div className="flex flex-wrap items-center gap-space-md pt-2">
                                <a className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm shadow-md hover:bg-primary transition-all duration-200" data-path="yeu-cau-bao-gia" href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('yeu-cau-bao-gia'); }}>
                                    <span className="material-symbols-outlined text-[20px]">request_quote</span>
                                    Tạo Yêu Cầu Báo Giá (RFQ)
                                </a>
                                <a className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-lowest text-secondary font-title-sm text-title-sm shadow-sm hover:bg-secondary-fixed/40 transition-all duration-200" href="#ai-assistant-sec">
                                    <span className="material-symbols-outlined text-[20px] text-secondary">auto_awesome</span>
                                    Hỏi Trợ Lý AI Chọn Quà
                                </a>
                            </div>
                            {/* Value Proposition Pill Matrix */}
                            <div className="pt-space-md grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-lowest shadow-sm">
                                    <span className="material-symbols-outlined text-secondary text-[22px]">storefront</span>
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm uppercase text-outline">Thương hiệu</span>
                                        <span className="font-title-sm text-title-sm text-on-surface font-semibold">50+ Uy Tín</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-lowest shadow-sm">
                                    <span className="material-symbols-outlined text-primary text-[22px]">percent</span>
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm uppercase text-outline">Đơn Doanh Nghiệp</span>
                                        <span className="font-title-sm text-title-sm text-primary font-semibold">Giảm đến 35%</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-lowest shadow-sm">
                                    <span className="material-symbols-outlined text-secondary text-[22px]">brush</span>
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm uppercase text-outline">Gia Công Bao Bì</span>
                                        <span className="font-title-sm text-title-sm text-on-surface font-semibold">Khắc Logo Riêng</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-lowest shadow-sm">
                                    <span className="material-symbols-outlined text-tertiary text-[22px]">task_alt</span>
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm uppercase text-outline">Cam Kết Tiến Độ</span>
                                        <span className="font-title-sm text-title-sm text-tertiary font-semibold">100% Đúng Hạn</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Visual Hero Showcase */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container-lowest p-3">
                                <img className="w-full h-[440px] object-cover rounded-xl" data-alt="An exquisite high-end Vietnamese Mid-Autumn luxury mooncake gift set displayed on an opulent lacquer tray. Delicate traditional golden crust mooncakes with detailed floral patterns, resting beside a celadon porcelain teapot with steaming tea and golden lotus decor. Warm festive lighting, soft crimson and rich gold tones, high-end commercial editorial product photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5KYJBvLCMp7xupDx-gQDoScTKa2U2dcqnRBSub8sWPgH0wYoLUDuGyXFvrnYfQaTMrYyuNOEY1Xn0Bee6yPg_n-tsDcd3_T5cSaE_UGhNSj0UWvo73nDRHvFsl4OZS7P78Zup2sDWLnSXykjDBRXXtMmkU6M94d1KjHq0Ox75cvfYpXgGAeibwx5Qw3PSLTmfY64Uj9ljl0vcE5NLLbhUry6hrpbOHwKw1n-mfub11OleVIv82chGEg" />
                                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-surface/90 backdrop-blur-md shadow-lg flex items-center justify-between">
                                    <div>
                                        <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold">Bộ Sưu Tập Giới Hạn</span>
                                        <p className="font-headline-sm text-headline-sm text-primary">Nguyệt Dạ Hoàng Triều</p>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant">Sơn mài khắc thủ công dát vàng 24K</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-label-sm text-label-sm text-outline">Từ</span>
                                        <p className="font-price-display text-price-display text-primary">1.250k</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* INTERACTIVE TIERED DISCOUNT CALCULATOR */}
            <section className="w-full max-w-7xl mx-auto px-margin py-space-xl">
                <div className="bg-surface-container-lowest rounded-2xl p-6 lg:p-10 shadow-md">
                    <div className="max-w-3xl mb-8">
                        <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">Tiết Kiệm Chi Phí Thu Mua</span>
                        <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">Tính Dự Toán Chiết Khấu Theo Số Lượng</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                            Kéo chọn số lượng hộp bạn dự kiến đặt để xem ngay mức giảm giá trực tiếp và các đặc quyền đi kèm từ xưởng bánh.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Interactive Controls */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="font-title-md text-title-md text-on-surface">Quy mô đơn hàng:</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-price-display text-3xl text-primary font-bold" id="quantity-display">250</span>
                                    <span className="font-body-md text-body-md text-on-surface-variant">hộp quà</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <input className="w-full h-2.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" id="box-range-slider" max="1000" min="20" step="10" type="range" defaultValue="250" />
                                <div className="flex justify-between font-label-sm text-label-sm text-outline pt-1">
                                    <span>20 hộp</span>
                                    <span>100 hộp</span>
                                    <span>300 hộp</span>
                                    <span>500 hộp</span>
                                    <span>1,000+ hộp</span>
                                </div>
                            </div>
                            {/* Quick Select Buttons */}
                            <div className="flex items-center gap-2 pt-2">
                                <span className="font-label-sm text-label-sm text-on-surface-variant">Chọn nhanh:</span>
                                <button className="px-3 py-1.5 rounded-lg bg-surface-container-low font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-colors" onclick="setQuantity(50)">50 hộp</button>
                                <button className="px-3 py-1.5 rounded-lg bg-surface-container-low font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-colors" onclick="setQuantity(200)">200 hộp</button>
                                <button className="px-3 py-1.5 rounded-lg bg-surface-container-low font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-colors" onclick="setQuantity(500)">500 hộp</button>
                                <button className="px-3 py-1.5 rounded-lg bg-surface-container-low font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-colors" onclick="setQuantity(1000)">1,000+ hộp</button>
                            </div>
                        </div>
                        {/* Calculated Live Result Box */}
                        <div className="lg:col-span-5 bg-surface-container-low rounded-xl p-6 shadow-inner space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b-0">
                                <span className="font-label-md text-label-md text-on-surface-variant">Mức chiết khấu áp dụng:</span>
                                <span className="font-price-display text-2xl text-primary font-bold" id="tier-discount">Giảm 25%</span>
                            </div>
                            <div className="space-y-2">
                                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Đặc quyền đi kèm:</span>
                                <ul className="space-y-2 font-body-sm text-body-sm text-on-surface" id="tier-perks">
                                    <li className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                                        <span>Miễn phí in logo doanh nghiệp lên nắp hộp</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                                        <span>Tặng thiệp chúc Trung Thu thiết kế riêng theo tone brand</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                                        <span>Giao hàng chia đợt theo nhiều chi nhánh</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="pt-2">
                                <a className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-primary text-on-primary font-title-sm text-title-sm hover:bg-primary-container transition-all shadow-sm" data-path="yeu-cau-bao-gia" href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('yeu-cau-bao-gia'); }}>
                                    <span className="material-symbols-outlined text-[18px]">send</span>
                                    Nhận Báo Giá Dự Toán Ngay
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Tier Guide Minimal Indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6">
                        <div className="p-4 rounded-xl bg-surface-container-low/70">
                            <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Hạng Phổ Thông (20 - 99 hộp)</span>
                            <p className="font-title-md text-title-md text-primary mt-1">Giảm 15%</p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Miễn phí thiệp chúc + Miễn phí vận chuyển nội thành 01 điểm.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-surface-container-low/70">
                            <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Hạng Doanh Nghiệp (100 - 499 hộp)</span>
                            <p className="font-title-md text-title-md text-primary mt-1">Giảm 25%</p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Miễn phí in logo ép kim nhũ vàng + Tặng hộp mẫu thử tận nơi.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-surface-container-low/70">
                            <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Hạng VIP Toàn Diện (500+ hộp)</span>
                            <p className="font-title-md text-title-md text-primary mt-1">Giảm 35%</p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Tùy biến khay quà, vị nhân riêng, quản lý tiến độ bàn giao đa điểm.</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* FEATURED COLLECTIONS & GIFT SETS */}
            <section className="w-full max-w-7xl mx-auto px-margin py-space-xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">Mẫu Quà Mùa Trăng Tuyển Chọn</span>
                        <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">Bộ Sưu Tập Tiêu Biểu Cho Khách Hàng &amp; Đối Tác</h2>
                    </div>
                    <a className="inline-flex items-center gap-1 font-title-sm text-title-sm text-primary hover:text-primary-container font-semibold transition-colors" data-path="bo-suu-tap-banh" href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('bo-suu-tap-banh'); }}>
                        Xem tất cả 120+ mẫu quà
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </a>
                </div>
                {/* Minimal Category Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
                    <button className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md whitespace-nowrap shadow-sm">Tất cả</button>
                    <button className="px-4 py-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md whitespace-nowrap transition-colors">Set Quà Doanh Nghiệp</button>
                    <button className="px-4 py-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md whitespace-nowrap transition-colors">Hộp Sơn Mài Cao Cấp</button>
                    <button className="px-4 py-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md whitespace-nowrap transition-colors">Bánh Truyền Thống Nghệ Nhân</button>
                    <button className="px-4 py-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md whitespace-nowrap transition-colors">Bánh Healthy Ít Ngọt</button>
                </div>
                {/* 4 Clean Product Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1 */}
                    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                        <div className="relative aspect-square overflow-hidden bg-surface-container-low">
                            <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" data-alt="Premium Mid-Autumn corporate mooncake box named Nguyet Hoa Doan Vien. Deep crimson red rigid box embossed with delicate golden peony motifs, holding four exquisite artisanal mooncakes and a canister of organic Oolong tea. Studio lighting, pure clean backdrop." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc1iH9XqLqmSS73Hbc5pxnaJnMX4PxU874FB1i1aIl2PShasUrLjaBtz7KIPZ0bLU7ASrFpOuAyEEveXS_pQ6mhEcKFFQIOxqMzLktzCZTAgls94kvmziSr5EGneFLgeT8siCFSuBkP-oXF3fOLJwWfFZiLvvh3hcoK4EmBMBlIIhjPmZcC07zONw2wM2bs_EvrgMT7UVLSuzJFDQaaqwrtVza4gtkZArOSOoUFgYEwtA9D6itGtumwQ" />
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm uppercase tracking-wider font-semibold shadow-sm">
                                Bán Chạy B2B
                            </div>
                            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-surface/90 backdrop-blur-sm text-outline font-label-sm text-label-sm">
                                Tối thiểu 10 hộp
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                            <div>
                                <span className="font-label-sm text-label-sm text-secondary uppercase font-medium">Xưởng Bánh Kinh Đô Grand</span>
                                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 leading-snug">Hộp Nguyệt Hoa Đoàn Viên</h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 line-clamp-2">4 bánh 180g (Thập cẩm jambon xá xíu, Hạt sen trà xanh, Cua bát bửu, Đậu xanh hạt dưa).</p>
                            </div>
                            <div className="pt-3 flex items-center justify-between">
                                <div>
                                    <span className="font-label-sm text-label-sm text-outline">Đơn giá B2B:</span>
                                    <p className="font-price-display text-price-display text-primary">580.000đ</p>
                                </div>
                                <a className="px-3.5 py-2 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-title-sm text-body-sm font-semibold transition-all" data-path="yeu-cau-bao-gia" href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('yeu-cau-bao-gia'); }}>
                                    Báo giá
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                        <div className="relative aspect-square overflow-hidden bg-surface-container-low">
                            <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" data-alt="Luxury Vietnamese handcrafted wooden lacquer mooncake gift box with mother of pearl inlay art depicting the Autumn Full Moon. Containing four golden lotus seed mooncakes and a jar of premium saffron. Rich heritage aesthetic, elegant dark lacquer and warm champagne tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_HTr31JkVtuuJhZ9y170DJifZs1NJiJ3jaISJhDJHZCCZs76I-4Oqbej4UzhiRiFiIm_mmvp-WQPmsj8cM-SQCO53rs4uyUzQuUZCk7SsPesp7YvK1Jof3AXFRk427PaqceESTcBpwAPCTpuLfWqvjVut6EAY0XXbzXxnzI9X11xyDGb1vUguZnqHXPpQSiT4hfQJkiQ5AOpqXm9ZE1YvCBKPa4szn5zKTK_h51lLk3047-AZ1ZIsTg" />
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold shadow-sm">
                                VIP Sơn Mài
                            </div>
                            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-surface/90 backdrop-blur-sm text-outline font-label-sm text-label-sm">
                                Tối thiểu 5 hộp
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                            <div>
                                <span className="font-label-sm text-label-sm text-secondary uppercase font-medium">Nghệ Nhân Hưng Ký 1954</span>
                                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 leading-snug">Sơn Mài Khảm Xà Cừ Vọng Nguyệt</h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 line-clamp-2">Hộp gỗ sơn mài Tương Bình Hiệp thủ công + 4 bánh Yến sào Vi cá thượng hạng.</p>
                            </div>
                            <div className="pt-3 flex items-center justify-between">
                                <div>
                                    <span className="font-label-sm text-label-sm text-outline">Đơn giá B2B:</span>
                                    <p className="font-price-display text-price-display text-primary">1.850.000đ</p>
                                </div>
                                <a className="px-3.5 py-2 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-title-sm text-body-sm font-semibold transition-all" data-path="yeu-cau-bao-gia" href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('yeu-cau-bao-gia'); }}>
                                    Báo giá
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                        <div className="relative aspect-square overflow-hidden bg-surface-container-low">
                            <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" data-alt="Elegant contemporary mooncake gift set crafted with sage green textures and bamboo accents. Featuring healthy low-sugar mooncakes with chia seeds, matcha, and macadamia fillings. Modern minimalist gourmet styling, soft daylight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYtaeubsl4FTR25BPwU8EHtSvOMaFG3NggwAFJzzBa6MvUWiiZ6tvrACcC8Htz8EL0XDmFBrRaV1uUaXt_N7I5aCM6JELeR8ieSAHHXi1Z-Ap1dYnCfXB3YSJ5NkqpdvAs6LidBUrhdNOUbAbkYIAJQK1faENFgRMSYtmk6v_zWEXourZl-1MmwfUWp_RopvIM7rdfDMB90NdSf9WGEo6c4mArH2v7HEyOgYlWdlCvcvFTpsVgyixprQ" />
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-tertiary text-on-tertiary font-label-sm text-label-sm uppercase tracking-wider font-semibold shadow-sm">
                                Healthy Ít Đường
                            </div>
                            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-surface/90 backdrop-blur-sm text-outline font-label-sm text-label-sm">
                                Tối thiểu 10 hộp
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                            <div>
                                <span className="font-label-sm text-label-sm text-secondary uppercase font-medium">Madame Hương Hà Thành</span>
                                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 leading-snug">Thanh Nguyệt Dưỡng Tâm</h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 line-clamp-2">Đường Isomalt ăn kiêng, 4 bánh hạt Macca, Trà xanh Tuyết shan, Hạt chia mè đen.</p>
                            </div>
                            <div className="pt-3 flex items-center justify-between">
                                <div>
                                    <span className="font-label-sm text-label-sm text-outline">Đơn giá B2B:</span>
                                    <p className="font-price-display text-price-display text-primary">690.000đ</p>
                                </div>
                                <a className="px-3.5 py-2 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-title-sm text-body-sm font-semibold transition-all" data-path="yeu-cau-bao-gia" href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('yeu-cau-bao-gia'); }}>
                                    Báo giá
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Card 4 */}
                    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                        <div className="relative aspect-square overflow-hidden bg-surface-container-low">
                            <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" data-alt="Traditional Vietnamese mooncake gift box with nostalgic gold and imperial navy details. Authentic handcrafted mooncakes with salted egg yolk centers and glazed golden brown crusts. Beautiful tea set companion, clean composition on warm alabaster ground." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7_AfCeoxH2XheJs2tcQ7FGl3eqzMlf2WBg5wfXnAcsNxaGznSpjKsQM9uqDGscmlBnyx4Yck3QO___YahmqgsZPAeoR8t5fpKt_TeilViyvAQ8O4Q1XISPR9ICtBSdtO0wErU2C78FPkx3LYBzEHyxstWSdGH0ZvF3NjL7bBcY9uA1rEafZ4VflbW1LUJ3BeyN3VZW373AOgqrzbJTulht2qyZOLLhpgv1shtM0pALBEL0GgtoPRk2Q" />
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold shadow-sm">
                                Di Sản Cổ Truyền
                            </div>
                            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-surface/90 backdrop-blur-sm text-outline font-label-sm text-label-sm">
                                Tối thiểu 10 hộp
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                            <div>
                                <span className="font-label-sm text-label-sm text-secondary uppercase font-medium">Thu Hương Bakery</span>
                                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 leading-snug">Hộp Kim Cúc Tụ Phúc</h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 line-clamp-2">Hương vị Hà Nội xưa, vỏ bánh nướng thơm lừng lá chanh và mỡ phần ướp đường cát.</p>
                            </div>
                            <div className="pt-3 flex items-center justify-between">
                                <div>
                                    <span className="font-label-sm text-label-sm text-outline">Đơn giá B2B:</span>
                                    <p className="font-price-display text-price-display text-primary">450.000đ</p>
                                </div>
                                <a className="px-3.5 py-2 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-title-sm text-body-sm font-semibold transition-all" data-path="yeu-cau-bao-gia" href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('yeu-cau-bao-gia'); }}>
                                    Báo giá
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* VERIFIED WORKSHOPS & BAKERIES */}
            <section className="w-full bg-surface-container-low py-space-xl">
                <div className="max-w-7xl mx-auto px-margin">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                        <div>
                            <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">Đối Tác Bảo Chứng Nguồn Gốc</span>
                            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">Xưởng Bánh Nghệ Nhân &amp; Thương Hiệu Uy Tín</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                                Đã hoàn tất kiểm định an toàn vệ sinh thực phẩm ISO 22000, cam kết sản lượng và tiến độ hợp đồng B2B.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-lowest shadow-sm">
                            <span className="material-symbols-outlined text-tertiary text-[20px]">verified_user</span>
                            <span className="font-label-md text-label-md text-on-surface font-semibold">Đã hoàn thành 1,200+ hợp đồng B2B</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Bakery 1 */}
                        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center font-headline-sm text-headline-sm text-primary font-bold">
                                    KD
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <h4 className="font-title-md text-title-md text-on-surface">Kinh Đô Grand</h4>
                                        <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                                    </div>
                                    <span className="font-label-sm text-label-sm text-outline">26 năm kinh nghiệm • Toàn quốc</span>
                                </div>
                            </div>
                            <div className="space-y-1.5 text-body-sm font-body-sm text-on-surface-variant">
                                <p className="flex items-center justify-between">
                                    <span>Đánh giá tín nhiệm:</span>
                                    <span className="text-secondary font-semibold">⭐ 4.9/5 (840 đánh giá)</span>
                                </p>
                                <p className="flex items-center justify-between">
                                    <span>Tỷ lệ giao đúng hẹn:</span>
                                    <span className="text-tertiary font-semibold">99.8%</span>
                                </p>
                                <p className="flex items-center justify-between">
                                    <span>Thế mạnh đặc sắc:</span>
                                    <span className="text-on-surface font-medium">Bánh Trăng Vàng VIP &amp; Năng lực sx lớn</span>
                                </p>
                            </div>
                        </div>
                        {/* Bakery 2 */}
                        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center font-headline-sm text-headline-sm text-primary font-bold">
                                    TH
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <h4 className="font-title-md text-title-md text-on-surface">Thu Hương Bakery</h4>
                                        <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                                    </div>
                                    <span className="font-label-sm text-label-sm text-outline">18 năm kinh nghiệm • Hà Nội</span>
                                </div>
                            </div>
                            <div className="space-y-1.5 text-body-sm font-body-sm text-on-surface-variant">
                                <p className="flex items-center justify-between">
                                    <span>Đánh giá tín nhiệm:</span>
                                    <span className="text-secondary font-semibold">⭐ 4.9/5 (520 đánh giá)</span>
                                </p>
                                <p className="flex items-center justify-between">
                                    <span>Tỷ lệ giao đúng hẹn:</span>
                                    <span className="text-tertiary font-semibold">99.6%</span>
                                </p>
                                <p className="flex items-center justify-between">
                                    <span>Thế mạnh đặc sắc:</span>
                                    <span className="text-on-surface font-medium">Vị cổ truyền thanh tao, mẫu hộp hoa sen</span>
                                </p>
                            </div>
                        </div>
                        {/* Bakery 3 */}
                        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center font-headline-sm text-headline-sm text-primary font-bold">
                                    MH
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <h4 className="font-title-md text-title-md text-on-surface">Madame Hương</h4>
                                        <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                                    </div>
                                    <span className="font-label-sm text-label-sm text-outline">12 năm kinh nghiệm • Hà Nội / TP.HCM</span>
                                </div>
                            </div>
                            <div className="space-y-1.5 text-body-sm font-body-sm text-on-surface-variant">
                                <p className="flex items-center justify-between">
                                    <span>Đánh giá tín nhiệm:</span>
                                    <span className="text-secondary font-semibold">⭐ 4.8/5 (410 đánh giá)</span>
                                </p>
                                <p className="flex items-center justify-between">
                                    <span>Tỷ lệ giao đúng hẹn:</span>
                                    <span className="text-tertiary font-semibold">99.4%</span>
                                </p>
                                <p className="flex items-center justify-between">
                                    <span>Thế mạnh đặc sắc:</span>
                                    <span className="text-on-surface font-medium">Bao bì thời thượng phong cách Pháp &amp; Bánh dẻo</span>
                                </p>
                            </div>
                        </div>
                        {/* Bakery 4 */}
                        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center font-headline-sm text-headline-sm text-primary font-bold">
                                    HK
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <h4 className="font-title-md text-title-md text-on-surface">Nghệ Nhân Hưng Ký</h4>
                                        <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                                    </div>
                                    <span className="font-label-sm text-label-sm text-outline">70 năm di sản • Chợ Lớn Sài Gòn</span>
                                </div>
                            </div>
                            <div className="space-y-1.5 text-body-sm font-body-sm text-on-surface-variant">
                                <p className="flex items-center justify-between">
                                    <span>Đánh giá tín nhiệm:</span>
                                    <span className="text-secondary font-semibold">⭐ 5.0/5 (390 đánh giá)</span>
                                </p>
                                <p className="flex items-center justify-between">
                                    <span>Tỷ lệ giao đúng hẹn:</span>
                                    <span className="text-tertiary font-semibold">100%</span>
                                </p>
                                <p className="flex items-center justify-between">
                                    <span>Thế mạnh đặc sắc:</span>
                                    <span className="text-on-surface font-medium">Thập cẩm gà quay xá xíu chuẩn thủ công</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* CUSTOM CORPORATE RFQ WORKFLOW (3 STEPS) */}
            <section className="w-full max-w-7xl mx-auto px-margin py-space-xl">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">Quy Trình Tinh Gọn</span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">3 Bước Đặt Hàng B2B Nhanh Chóng</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                        Tối ưu hoá thủ tục cho phòng Thu mua &amp; Nhân sự. Minh bạch giá cả, bảo hộ thanh toán toàn diện.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Step 1 */}
                    <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm relative flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center font-headline-sm text-headline-sm text-primary font-bold mb-4">
                                01
                            </div>
                            <h3 className="font-title-md text-title-md text-on-surface">Gửi Yêu Cầu &amp; Ngân Sách</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                                Chọn mẫu bánh ưng ý, số lượng dự kiến và yêu cầu in ấn logo doanh nghiệp hoặc khắc thiệp chúc mừng.
                            </p>
                        </div>
                        <div className="mt-6 pt-4 flex items-center gap-2 text-primary font-label-md text-label-md font-medium">
                            <span className="material-symbols-outlined text-[18px]">touch_app</span>
                            <span>Chỉ mất 2 phút hoàn tất form</span>
                        </div>
                    </div>
                    {/* Step 2 */}
                    <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm relative flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-secondary-container/40 flex items-center justify-center font-headline-sm text-headline-sm text-secondary font-bold mb-4">
                                02
                            </div>
                            <h3 className="font-title-md text-title-md text-on-surface">Nhận Báo Giá Sau 2 Giờ</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                                Hệ thống so khớp với các xưởng đối tác để gửi bảng báo giá chi tiết kèm mức chiết khấu và ảnh mẫu demo hộp.
                            </p>
                        </div>
                        <div className="mt-6 pt-4 flex items-center gap-2 text-secondary font-label-md text-label-md font-medium">
                            <span className="material-symbols-outlined text-[18px]">timer</span>
                            <span>Phản hồi cam kết trong 120 phút</span>
                        </div>
                    </div>
                    {/* Step 3 */}
                    <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm relative flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed-dim/40 flex items-center justify-center font-headline-sm text-headline-sm text-tertiary font-bold mb-4">
                                03
                            </div>
                            <h3 className="font-title-md text-title-md text-on-surface">Hợp Đồng &amp; Giao Đúng Hạn</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                                Ký hợp đồng điện tử pháp lý đầy đủ, xuất VAT 100%. Thanh toán qua tài khoản ký quỹ bảo vệ người mua SafeTrade.
                            </p>
                        </div>
                        <div className="mt-6 pt-4 flex items-center gap-2 text-tertiary font-label-md text-label-md font-medium">
                            <span className="material-symbols-outlined text-[18px]">verified_user</span>
                            <span>Bảo chứng chất lượng &amp; hoàn tiền</span>
                        </div>
                    </div>
                </div>
            </section>
            {/* AI GIFT ASSISTANT HIGHLIGHT BANNER */}
            <section className="w-full max-w-7xl mx-auto px-margin pb-space-xl" id="ai-assistant-sec">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary-container via-primary to-primary-container text-on-primary p-8 lg:p-12 shadow-xl">
                    {/* Glow decoration */}
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
                    <div className="max-w-3xl space-y-4 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/15 backdrop-blur-md">
                            <span className="material-symbols-outlined text-secondary-fixed text-[18px]">auto_awesome</span>
                            <span className="font-label-sm text-label-sm text-secondary-fixed font-semibold uppercase tracking-wider">Trợ Lý AI Nguyệt Phố</span>
                        </div>
                        <h2 className="font-headline-lg text-headline-lg leading-tight text-on-primary">
                            Chưa rõ nên chọn set bánh nào cho đối tác &amp; nhân viên?
                        </h2>
                        <p className="font-body-lg text-body-lg text-on-primary-container">
                            Gợi ý giải pháp chuẩn ngân sách, số lượng nhân sự, khẩu vị vùng miền và ý nghĩa phong thủy doanh nghiệp chỉ trong 30 giây.
                        </p>
                        {/* Fast Interactive Prompt Input */}
                        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <div className="flex-1 relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search_spark</span>
                                <input className="w-full h-12 pl-12 pr-4 rounded-lg bg-surface text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="VD: Cần 150 hộp ngân sách 500k/hộp cho đối tác công nghệ..." type="text" />
                            </div>
                            <button className="h-12 px-6 rounded-lg bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-container font-title-sm text-title-sm font-semibold transition-colors flex items-center justify-center gap-2 shrink-0">
                                <span>Tư vấn ngay</span>
                                <span className="material-symbols-outlined text-[18px]">spark</span>
                            </button>
                        </div>
                        {/* Quick filter chips for AI */}
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                            <span className="font-label-sm text-label-sm text-on-primary-container">Gợi ý nhanh:</span>
                            <button className="px-3 py-1 rounded-full bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-on-primary font-label-sm text-label-sm transition-colors">VIP Cao cấp (&gt;1 triệu)</button>
                            <button className="px-3 py-1 rounded-full bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-on-primary font-label-sm text-label-sm transition-colors">Tặng Nhân viên (300k - 500k)</button>
                            <button className="px-3 py-1 rounded-full bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-on-primary font-label-sm text-label-sm transition-colors">Bánh chay &amp; ít ngọt</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
            {/* Inline JavaScript for Calculator slider micro-interaction */}
            </main>
  );
}
