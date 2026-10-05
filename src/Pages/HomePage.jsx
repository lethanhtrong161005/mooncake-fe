import React from 'react';

export default function HomePage({ onNavigate }) {
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="w-full bg-primary text-on-primary py-space-xs px-gutter"><div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-body-sm font-body-sm"><div className="flex items-center gap-space-sm"><span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase px-space-xs py-0.5 rounded">Mùa Trăng 2025</span><span>Ưu đãi B2B: <strong>Khắc logo laser miễn phí</strong> cho đơn hàng từ 200 hộp trước 15/08</span></div><div className="flex items-center gap-space-lg"><span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">verified</span>Cam kết 100% xuất VAT điện tử</span><span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">call</span>Hotline B2B: <strong className="font-label-md text-label-md">1800 6886</strong></span></div></div></div><div className="h-20 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-space-lg"><div className="flex items-center gap-space-lg shrink-0"><div className="flex items-center gap-space-sm"><img alt="MoonMarket Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UPK8KyWGSoRS1SxHva-pYR4VbKwemTaKN3h4bN4Z7lNvwXGASUWKWOlLdQh6wDRzyNdT1kBCPAQzAwW984oNs0RP_4C8j-YEU1J6uJ00CRhOc3_qx10wNq917IAilkJvSB5cUnYxTZd-wckTotiL0nhmi9VbewvYhWW9n6CCj_88AfvfmVzDBDY-NkZeep3pfsKSblxM71kBNhxZ3srSodn8_v7vvO3v8GC_hPlF2bx107jdLGSuEFoUM"/><span className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary">MoonMarket</span></div><span className="hidden lg:inline-block font-label-sm text-label-sm text-tertiary-container bg-tertiary-fixed px-space-xs py-1 rounded font-semibold">B2B PORTAL</span></div><div className="flex-1 max-w-xl hidden md:block"><div className="relative flex items-center w-full bg-surface-container rounded-lg px-space-md py-space-xs"><span className="material-symbols-outlined text-outline mr-2 text-[20px]">search</span><input className="w-full bg-transparent border-0 focus:outline-none text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md" placeholder="Tìm kiếm bánh, hộp quà VIP, nhân thập cẩm, hoặc xưởng đã xác thực..." type="text"/><span className="font-label-sm text-label-sm text-tertiary font-semibold bg-surface-container-lowest px-2 py-1 rounded shrink-0 shadow-sm">Đã Kiểm Định</span></div></div><div className="flex items-center gap-space-md shrink-0"><a className="bg-primary-container text-on-primary font-label-md text-label-md px-space-md py-2 rounded-lg hover:bg-primary transition-colors flex items-center gap-1 shadow-sm" data-path="yeu-cau-bao-gia" href="#"><span className="material-symbols-outlined text-[18px]">request_quote</span>Tạo RFQ nhanh</a><a className="hidden xl:inline-flex text-on-surface-variant hover:text-on-surface font-label-md text-label-md py-2 px-space-xs transition-colors" data-path="dang-ky-gian-hang" href="#">Dành cho Nhà cung cấp</a><a className="text-on-surface-variant hover:text-on-surface font-label-md text-label-md py-2 px-space-xs transition-colors" data-path="dang-nhap" href="#">Đăng nhập / Đăng ký</a><div className="relative flex items-center justify-center p-2 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"><span className="material-symbols-outlined text-on-surface text-[22px]">shopping_bag</span><span className="absolute -top-1 -right-1 bg-secondary text-on-secondary font-label-sm text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">3</span></div><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div><div className="bg-surface-container-low"><div className="max-w-7xl mx-auto px-gutter"><nav className="flex items-center gap-space-lg py-2 overflow-x-auto" data-active-classes="bg-surface-container-highest text-on-surface font-semibold"><a aria-current="page" className="px-space-sm py-1 rounded transition-colors whitespace-nowrap bg-surface-container-highest text-on-surface font-semibold" data-path="trang-chu" href="#">Trang chủ</a><a className="text-on-surface-variant hover:text-on-surface font-label-md text-label-md px-space-sm py-1 rounded transition-colors whitespace-nowrap" data-path="san-pham-co-san" href="#">Sản phẩm có sẵn (Mua ngay)</a><a className="text-on-surface-variant hover:text-on-surface font-label-md text-label-md px-space-sm py-1 rounded transition-colors whitespace-nowrap" data-path="yeu-cau-bao-gia" href="#">Yêu cầu báo giá (Tạo RFQ)</a><a className="text-on-surface-variant hover:text-on-surface font-label-md text-label-md px-space-sm py-1 rounded transition-colors whitespace-nowrap" data-path="nha-cung-cap-uy-tin" href="#">Nhà cung cấp uy tín</a><a className="text-on-surface-variant hover:text-on-surface font-label-md text-label-md px-space-sm py-1 rounded transition-colors whitespace-nowrap" data-path="bang-gia-chiet-khau" href="#">Bảng giá chiết khấu</a><a className="text-on-surface-variant hover:text-on-surface font-label-md text-label-md px-space-sm py-1 rounded transition-colors whitespace-nowrap" data-path="don-hang-doanh-nghiep" href="#">Quản lý Đơn hàng B2B</a></nav></div></div></header><main className="w-full pt-36 bg-surface min-h-[calc(100vh-280px)]"><div className="flex flex-col w-full">

<section className="relative w-full overflow-hidden bg-surface py-space-xl px-gutter">
<div className="max-w-7xl mx-auto flex flex-col items-center text-center">

<div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed mb-space-md shadow-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Cổng Phân Phối Quà Tặng Doanh Nghiệp 2025</span>
</div>

<h1 className="font-headline-lg text-headline-lg md:text-display-hero font-bold tracking-tight text-on-surface max-w-4xl">
        Nền Tảng Cung Ứng Bánh Trung Thu Doanh Nghiệp
      </h1>

<p className="mt-space-sm font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
        Kết nối trực tiếp 50+ xưởng bánh &amp; thương hiệu uy tín — Chiết khấu tới 35% — Hợp đồng &amp; hóa đơn VAT minh bạch.
      </p>

<div className="mt-space-lg flex flex-wrap items-center justify-center gap-space-lg text-body-sm font-body-sm text-on-surface-variant">
<div className="flex items-center gap-1.5 bg-surface-container-low px-space-md py-1.5 rounded-lg shadow-sm">
<span className="material-symbols-outlined text-primary text-[18px]">verified</span>
<span className="font-label-md text-label-md text-on-surface">50+ Nhà Xưởng Đã Kiểm Định</span>
</div>
<div className="flex items-center gap-1.5 bg-surface-container-low px-space-md py-1.5 rounded-lg shadow-sm">
<span className="material-symbols-outlined text-tertiary text-[18px]">receipt_long</span>
<span className="font-label-md text-label-md text-on-surface">100% Xuất VAT &amp; Ký Hợp Đồng Điện Tử</span>
</div>
<div className="flex items-center gap-1.5 bg-surface-container-low px-space-md py-1.5 rounded-lg shadow-sm">
<span className="material-symbols-outlined text-secondary text-[18px]">local_shipping</span>
<span className="font-label-md text-label-md text-on-surface">Giao Hàng PoD Đa Điểm Toàn Quốc</span>
</div>
</div>

<div className="mt-space-xl w-full grid grid-cols-1 md:grid-cols-2 gap-space-lg text-left">

<div className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col justify-between group hover:shadow-xl transition-all duration-200">
<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm font-semibold uppercase px-2.5 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed">
<span className="material-symbols-outlined text-[14px]">inventory_2</span> Hàng Có Sẵn Trong Kho
              </span>
<span className="font-data-mono text-data-mono text-on-surface-variant">Tối thiểu: 20 hộp</span>
</div>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface mt-space-xs">
              ĐẶT HÀNG NGAY
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
              Sản phẩm đóng gói sẵn từ các thương hiệu lớn. Giao thần tốc 24–48h, có sẵn bảng giá bậc thang tự động, thanh toán nhận hóa đơn VAT tức thì.
            </p>
<div className="mt-space-md flex flex-wrap gap-space-xs">
<span className="text-body-sm font-body-sm bg-surface-container px-2 py-1 rounded text-on-surface">✓ Giao hỏa tốc 24-48h</span>
<span className="text-body-sm font-body-sm bg-surface-container px-2 py-1 rounded text-on-surface">✓ Giữ nguyên mẫu chuẩn hãng</span>
<span className="text-body-sm font-body-sm bg-surface-container px-2 py-1 rounded text-on-surface">✓ Đơn từ 20 hộp</span>
</div>
</div>
<div className="mt-space-lg pt-space-md">
<a className="w-full inline-flex items-center justify-center gap-space-xs bg-primary-container text-on-primary py-3 px-space-md rounded-lg font-label-md text-label-md shadow-sm hover:bg-primary transition-colors" data-path="san-pham-co-san" href="#">
<span>Xem Sản Phẩm Có Sẵn</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</a>
</div>
</div>

<div className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col justify-between group hover:shadow-xl transition-all duration-200">
<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm font-semibold uppercase px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed">
<span className="material-symbols-outlined text-[14px]">draw</span> Thiết Kế &amp; Số Lượng Lớn
              </span>
<span className="font-data-mono text-data-mono text-on-surface-variant">Tối thiểu: &gt;100 hộp</span>
</div>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface mt-space-xs">
              TẠO YÊU CẦU BÁO GIÁ (RFQ)
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
              Nhu cầu khắc logo doanh nghiệp, ép kim, hộp gỗ độc quyền hoặc đặt số lượng lớn. Đăng thầu 1 lần — nhận 3–5 báo giá cạnh tranh từ xưởng.
            </p>
<div className="mt-space-md flex flex-wrap gap-space-xs">
<span className="text-body-sm font-body-sm bg-surface-container px-2 py-1 rounded text-on-surface">✓ Khắc logo &amp; thiệp riêng</span>
<span className="text-body-sm font-body-sm bg-surface-container px-2 py-1 rounded text-on-surface">✓ Đấu thầu so sánh giá</span>
<span className="text-body-sm font-body-sm bg-surface-container px-2 py-1 rounded text-on-surface">✓ Hỗ trợ gửi mẫu tận nơi</span>
</div>
</div>
<div className="mt-space-lg pt-space-md">
<a className="w-full inline-flex items-center justify-center gap-space-xs bg-secondary-container text-on-secondary-container py-3 px-space-md rounded-lg font-label-md text-label-md shadow-sm hover:opacity-90 transition-opacity font-semibold" data-path="yeu-cau-bao-gia" href="#">
<span>Gửi RFQ Đấu Thầu (Miễn phí)</span>
<span className="material-symbols-outlined text-[18px]">gavel</span>
</a>
</div>
</div>
</div>

<div className="mt-space-md w-full max-w-4xl bg-surface-container-high px-space-md py-space-sm rounded-lg text-body-sm font-body-sm text-on-surface-variant text-center shadow-sm">
        💡 <strong>Chưa rõ nên chọn cách nào?</strong> Chọn <em>“Đặt hàng ngay”</em> nếu cần hộp tiêu chuẩn có sẵn; Chọn <em>“Tạo RFQ”</em> nếu cần in ấn logo riêng hoặc muốn so sánh giá từ nhiều xưởng.
      </div>
</div>
</section>

<section className="w-full bg-surface-container-low py-space-xl px-gutter">
<div className="max-w-7xl mx-auto">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">Quy Trình Chuẩn Doanh Nghiệp</span>
<h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-1">4 Lợi Thế Vận Hành Chuyên Biệt</h2>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-2 md:mt-0">
          Loại bỏ mọi rủi ro giao chậm, rủi ro pháp lý và chi phí trung gian không rõ ràng trong mùa cao điểm.
        </p>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-md">
<span className="material-symbols-outlined text-[28px]">trending_down</span>
</div>
<h4 className="font-title-md text-title-md font-bold text-on-surface">Chiết Khấu Bậc Thang Tự Động</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
              Đặt càng nhiều giá càng giảm: từ 50 hộp giảm 5%, từ 100 hộp giảm 10%, từ 500 hộp giảm 15% minh bạch.
            </p>
</div>
<div className="mt-space-md pt-space-xs font-data-mono text-data-mono text-secondary font-semibold">
            Tối ưu ngân sách tới 35%
          </div>
</div>

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-secondary mb-space-md">
<span className="material-symbols-outlined text-[28px]">palette</span>
</div>
<h4 className="font-title-md text-title-md font-bold text-on-surface">In Ấn Logo &amp; Thiết Kế Riêng</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
              Tải file PNG/SVG, xem trước bản dựng phối cảnh 3D trực quan trước khi xưởng xuất bản in hàng loạt.
            </p>
</div>
<div className="mt-space-md pt-space-xs font-data-mono text-data-mono text-secondary font-semibold">
            Duyệt mẫu trong 24 giờ
          </div>
</div>

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-tertiary mb-space-md">
<span className="material-symbols-outlined text-[28px]">draw</span>
</div>
<h4 className="font-title-md text-title-md font-bold text-on-surface">Hợp Đồng Điện Tử &amp; Ký OTP</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
              Hợp đồng tự sinh pháp lý chuẩn, thanh toán ký quỹ theo tiến độ nghiệm thu, cam kết phạt chậm trễ.
            </p>
</div>
<div className="mt-space-md pt-space-xs font-data-mono text-data-mono text-tertiary font-semibold">
            Bảo vệ dòng tiền doanh nghiệp
          </div>
</div>

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container mb-space-md">
<span className="material-symbols-outlined text-[28px]">pin_drop</span>
</div>
<h4 className="font-title-md text-title-md font-bold text-on-surface">Xác Thực Giao Hàng PoD</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
              Biên bản bàn giao ghi nhận ảnh chụp kiện hàng, tọa độ GPS và chữ ký điện tử trực tiếp lúc nhận.
            </p>
</div>
<div className="mt-space-md pt-space-xs font-data-mono text-data-mono text-primary font-semibold">
            Kiểm soát giao nhận đa điểm
          </div>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface py-space-xl px-gutter">
<div className="max-w-7xl mx-auto">
<div className="bg-surface-container rounded-2xl p-space-lg md:p-space-xl shadow-md">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">

<div className="lg:col-span-7 space-y-space-md">
<div>
<div className="inline-flex items-center gap-1 font-label-sm text-label-sm font-semibold uppercase px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed mb-1">
                Công cụ tính nhanh
              </div>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                Dự Toán Ngân Sách Quà Tặng Trung Thu
              </h3>
<p className="font-body-md text-body-md text-on-surface-variant">
                Chọn số lượng và yêu cầu gia công để nhận ngay mức giá dự kiến cùng mức chiết khấu tối ưu.
              </p>
</div>

<div>
<label className="block font-label-md text-label-md text-on-surface font-semibold mb-space-xs">
                1. Quy mô số lượng hộp quà:
              </label>
<div className="grid grid-cols-5 gap-space-xs" id="qty-selector-group">
<button className="estimator-qty-btn py-2 px-1 rounded-lg text-center font-label-md text-label-md transition-all bg-surface-container-lowest text-on-surface shadow-sm"  type="button">
                  50 hộp
                </button>
<button className="estimator-qty-btn py-2 px-1 rounded-lg text-center font-label-md text-label-md transition-all bg-primary text-on-primary shadow-sm font-bold"  type="button">
                  100 hộp
                </button>
<button className="estimator-qty-btn py-2 px-1 rounded-lg text-center font-label-md text-label-md transition-all bg-surface-container-lowest text-on-surface shadow-sm"  type="button">
                  300 hộp
                </button>
<button className="estimator-qty-btn py-2 px-1 rounded-lg text-center font-label-md text-label-md transition-all bg-surface-container-lowest text-on-surface shadow-sm"  type="button">
                  500 hộp
                </button>
<button className="estimator-qty-btn py-2 px-1 rounded-lg text-center font-label-md text-label-md transition-all bg-surface-container-lowest text-on-surface shadow-sm"  type="button">
                  1,000+
                </button>
</div>
</div>

<div>
<label className="block font-label-md text-label-md text-on-surface font-semibold mb-space-xs">
                2. Nhu cầu đóng gói &amp; nhận diện thương hiệu:
              </label>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm" id="package-type-group">
<label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest cursor-pointer shadow-sm">
<input className="w-4 h-4 accent-primary" name="pkg_option"  type="radio" value="standard"/>
<span className="font-body-md text-body-md text-on-surface">Hộp tiêu chuẩn có sẵn</span>
</label>
<label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest cursor-pointer shadow-sm">
<input defaultChecked className="w-4 h-4 accent-primary" name="pkg_option"  type="radio" value="custom_logo"/>
<span className="font-body-md text-body-md text-on-surface font-semibold">Khắc / In ép kim logo doanh nghiệp</span>
</label>
</div>
</div>
</div>

<div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col justify-between">
<div>
<div className="flex items-center justify-between pb-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Mức chiết khấu áp dụng:</span>
<span className="font-label-md text-label-md font-bold px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed" id="est-discount-tag">-12% Tier B2B</span>
</div>
<div className="mt-space-md">
<div className="text-body-sm font-body-sm text-on-surface-variant">Đơn giá dự kiến bình quân:</div>
<div className="flex items-baseline gap-space-xs mt-1">
<span className="font-headline-lg text-headline-lg font-bold text-primary" id="est-unit-price">450.000 ₫</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">/ hộp</span>
</div>
</div>

<div className="mt-space-md space-y-space-xs text-body-sm font-body-sm">
<div className="flex items-center justify-between">
<span className="text-on-surface-variant">Phí in ấn &amp; thiệp lời chúc:</span>
<span className="font-semibold text-tertiary" id="est-print-perk">MIỄN PHÍ</span>
</div>
<div className="flex items-center justify-between">
<span className="text-on-surface-variant">Tổng giá trị đơn hàng dự kiến:</span>
<span className="font-data-mono text-data-mono font-bold text-on-surface" id="est-total-amount">45.000.000 ₫</span>
</div>
<div className="flex items-center justify-between">
<span className="text-on-surface-variant">Tiết kiệm ngân sách:</span>
<span className="font-data-mono text-data-mono font-bold text-secondary" id="est-savings">6.000.000 ₫</span>
</div>
</div>
</div>
<div className="mt-space-lg pt-space-md space-y-space-xs">
<a className="w-full inline-flex items-center justify-center gap-space-xs bg-primary-container text-on-primary py-2.5 px-space-md rounded-lg font-label-md text-label-md shadow-sm hover:bg-primary transition-colors" data-path="yeu-cau-bao-gia" href="#">
<span>Tạo RFQ Đấu Thầu Theo Mức Này</span>
<span className="material-symbols-outlined text-[16px]">send</span>
</a>
<a className="w-full inline-flex items-center justify-center gap-space-xs text-on-surface-variant hover:text-on-surface py-1.5 font-label-md text-label-md transition-colors" data-path="san-pham-co-san" href="#">
<span>Hoặc chọn từ danh mục có sẵn →</span>
</a>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface py-space-xl px-gutter">
<div className="max-w-7xl mx-auto">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Danh Mục Được Đặt Nhiều Nhất</span>
<h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-1">Bộ Sưu Tập Bánh Trung Thu Tiêu Biểu</h2>
</div>
<a className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold hover:underline mt-2 md:mt-0" data-path="san-pham-co-san" href="#">
<span>Xem tất cả 120+ mẫu hộp 2025</span>
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</a>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">

<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-200">
<div className="relative w-full aspect-square bg-surface-container overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="High-end corporate Vietnamese mooncake gift box with golden calligraphy Nguyet Vien Tri Ky, containing four golden baked pastries on a silk red background, professional commercial lighting, luxury festive packaging" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0gce54U1n3kxiDSj_WZFJlCiiqIoXmsqFi5RYcNbE-HyrDYGdatgnVooMWFft7pgTd6ywe3cnZFmwRXVj6-HW98F0Fwk3gNfTVBSw7rBLbrF33ZhdDpVwyiRH56g4-dfFbFya0reGpmL-Hg-p2xW4ghvbZt-9XsLApvBWLRHyojKhGRFcCW7kp_sDFULOOcoXGqIknBa3fyYIkUUZ5QoR6YDPYuQqPll4ZIqIrynw9uXYHAPGqKJt"/>
<span className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-0.5 rounded font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[14px]">verified</span> NCC Xác Minh
            </span>
<span className="absolute bottom-2 right-2 bg-inverse-surface/80 text-inverse-on-surface px-2 py-0.5 rounded font-data-mono text-[11px]">
              Giao trong 48h
            </span>
</div>
<div className="p-space-md flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-1">
<span className="truncate">Kinh Đô B2B</span>
<span className="flex items-center gap-0.5 text-secondary font-semibold"><span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span> 4.9 (1.2k)</span>
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
<button className="py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors" type="button">
                  Mẫu thử
                </button>
<a className="py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-sm" data-path="san-pham-co-san" href="#">
                  Đặt ngay
                </a>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-200">
<div className="relative w-full aspect-square bg-surface-container overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Opulent lacquer mooncake box in dark burgundy and gold foil accents named Hoang Kim Vong Nguyet, 6 pieces of lava egg yolk pastry beside premium lotus tea canister, ultra-luxury B2B executive gift" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQMG1AQ2M24puU7Wk-qFSPiPY5ooN2Vb1C-bf4rPc15CeqNt3b2CutQ0_J8tcAIyIjgguRLdgomEbGT7FWt_c6rsBDZsd4VMHA6_R31OVY3bcB2Yyh4NXr4fFrt1Yy38xhNpyqGWpywfcMC0_YsZu2Ph5y0ASpB1YxK4_Mez7znUkz_xaEJAIG-EeOdZn6pKU2ilOsgbPZ7QnMUu7J5UHMQi_5e8ByNty_3-SxqavFi2-TZSOB3Aog"/>
<span className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-0.5 rounded font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[14px]">verified</span> NCC Xác Minh
            </span>
<span className="absolute bottom-2 right-2 bg-inverse-surface/80 text-inverse-on-surface px-2 py-0.5 rounded font-data-mono text-[11px]">
              Sản xuất: 5 ngày
            </span>
</div>
<div className="p-space-md flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-1">
<span className="truncate">Madame Hương</span>
<span className="flex items-center gap-0.5 text-secondary font-semibold"><span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span> 5.0 (860)</span>
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
<button className="py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors" type="button">
                  Mẫu thử
                </button>
<a className="py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-secondary text-on-secondary hover:opacity-90 transition-opacity shadow-sm" data-path="yeu-cau-bao-gia" href="#">
                  Gửi RFQ
                </a>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-200">
<div className="relative w-full aspect-square bg-surface-container overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Minimalist eco-friendly bamboo paper mooncake box Thanh Nguyet Yen, 4 artistic pastries made of bird nest and organic lotus seed, soft morning light, healthy modern pastry aesthetics" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSUU9euk8QszNuwm4Nu_KHGlyRVO6UZa1xAl1qcfUXYkLsaNkL_fo9Y0eBt_pwk-0eq4n7nXJd22bVLwySIH28YqkxQLX1sH74WnTPo1OmweLxstBD8bq7nZpvvI6hI1yfphoRnfldacMi4cEWs-EbM0ix2RwtoGX0Ip90H7Xk7euQe5hhZqxAlK5KNUXqbAtTq5HnS100yvTqcSeSIXTgqcollqTsTw7gCUY5IETDzQU9UuMPqq2H"/>
<span className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-0.5 rounded font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[14px]">verified</span> NCC Xác Minh
            </span>
<span className="absolute bottom-2 right-2 bg-inverse-surface/80 text-inverse-on-surface px-2 py-0.5 rounded font-data-mono text-[11px]">
              Giao trong 24h
            </span>
</div>
<div className="p-space-md flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-1">
<span className="truncate">Nghệ Nhân Hữu Nghị</span>
<span className="flex items-center gap-0.5 text-secondary font-semibold"><span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span> 4.8 (950)</span>
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
<button className="py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors" type="button">
                  Mẫu thử
                </button>
<a className="py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-sm" data-path="san-pham-co-san" href="#">
                  Đặt ngay
                </a>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-200">
<div className="relative w-full aspect-square bg-surface-container overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Corporate luxury mid-autumn hamper gift set with four mooncakes and a high-end French wine bottle in velvet lining wooden case Doan Vien Phu Quy, rich amber tones, elegant greeting cards" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOL-Cav9v6rbL1i553OXUyPC1E2zvaok6KNoZjacOPOUdvERGXoE-Wh7kXxHfJEW2bvbWVefYDVCEQ5DAOc4m9LJlOWah_9tg75rJy6I6bysyxwwsNXa6GbzQb4lcysJAIM8wkk7aei8UgYBX40_YCYa1UmqA4X_uylmQwjBQiMcpuN4txuO9dekT-HywkN-YeCgIvkq1Aq-D2vCp8-cG5ZdaSAOc_PGVCOWZqT5EDsT5PZthuvrb3"/>
<span className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-0.5 rounded font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[14px]">verified</span> NCC Xác Minh
            </span>
<span className="absolute bottom-2 right-2 bg-inverse-surface/80 text-inverse-on-surface px-2 py-0.5 rounded font-data-mono text-[11px]">
              Sản xuất: 3 ngày
            </span>
</div>
<div className="p-space-md flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-1">
<span className="truncate">Thu Hương Bakery</span>
<span className="flex items-center gap-0.5 text-secondary font-semibold"><span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span> 4.9 (620)</span>
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
<button className="py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors" type="button">
                  Mẫu thử
                </button>
<a className="py-2 px-1 text-center font-label-md text-label-md rounded-lg bg-secondary text-on-secondary hover:opacity-90 transition-opacity shadow-sm" data-path="yeu-cau-bao-gia" href="#">
                  Gửi RFQ
                </a>
</div>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface-container-low py-space-xl px-gutter">
<div className="max-w-7xl mx-auto">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold">Mạng Lưới Sản Xuất Được Kiểm Định</span>
<h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-1">Top Nhà Cung Cấp Đã Được Xác Thực</h2>
</div>
<a className="inline-flex items-center gap-1 font-label-md text-label-md text-tertiary font-semibold hover:underline mt-2 md:mt-0" data-path="nha-cung-cap-uy-tin" href="#">
<span>Xem tất cả 50+ xưởng đạt chuẩn</span>
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</a>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between">
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center font-bold text-primary text-title-md">
                KD
              </div>
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
<span className="material-symbols-outlined text-[14px]">verified</span> Verified Supplier
              </span>
</div>
<h3 className="font-title-md text-title-md font-bold text-on-surface mt-space-md">
              Kinh Đô Mondelez Enterprise
            </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Thương hiệu quốc dân quy mô công nghiệp lớn nhất Việt Nam. Năng lực cung ứng 500,000 hộp/mùa.
            </p>
<div className="mt-space-md space-y-1.5 text-body-sm font-body-sm">
<div className="flex items-center justify-between">
<span className="text-on-surface-variant">Xếp hạng uy tín:</span>
<span className="font-semibold text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings": "'FILL' 1"}}>workspace_premium</span> Đối tác Kim Cương (98đ)
                </span>
</div>
<div className="flex items-center justify-between">
<span className="text-on-surface-variant">Tỷ lệ giao đúng hẹn:</span>
<span className="font-data-mono text-data-mono font-semibold text-tertiary">99.8%</span>
</div>
<div className="flex items-center justify-between">
<span className="text-on-surface-variant">Tiêu chuẩn chất lượng:</span>
<span className="font-label-sm text-label-sm font-semibold text-on-surface bg-surface-container px-2 py-0.5 rounded">ISO 22000 • HACCP</span>
</div>
</div>
</div>
<div className="mt-space-lg pt-space-xs">
<a className="w-full inline-flex items-center justify-center gap-1 py-2 px-space-md rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" data-path="yeu-cau-bao-gia" href="#">
<span>Yêu cầu báo giá từ xưởng này</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between">
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center font-bold text-secondary text-title-md">
                MH
              </div>
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
<span className="material-symbols-outlined text-[14px]">verified</span> Verified Supplier
              </span>
</div>
<h3 className="font-title-md text-title-md font-bold text-on-surface mt-space-md">
              Xưởng Nghệ Nhân Madame Hương
            </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Chuyên dòng hộp sơn mài nghệ thuật &amp; nhân trứng chảy cao cấp. Tối ưu quà tặng VIP đối tác chiến lược.
            </p>
<div className="mt-space-md space-y-1.5 text-body-sm font-body-sm">
<div className="flex items-center justify-between">
<span className="text-on-surface-variant">Xếp hạng uy tín:</span>
<span className="font-semibold text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings": "'FILL' 1"}}>workspace_premium</span> Đối tác Vàng (96đ)
                </span>
</div>
<div className="flex items-center justify-between">
<span className="text-on-surface-variant">Tỷ lệ giao đúng hẹn:</span>
<span className="font-data-mono text-data-mono font-semibold text-tertiary">99.4%</span>
</div>
<div className="flex items-center justify-between">
<span className="text-on-surface-variant">Tiêu chuẩn chất lượng:</span>
<span className="font-label-sm text-label-sm font-semibold text-on-surface bg-surface-container px-2 py-0.5 rounded">HACCP • VSATTP TP.HN</span>
</div>
</div>
</div>
<div className="mt-space-lg pt-space-xs">
<a className="w-full inline-flex items-center justify-center gap-1 py-2 px-space-md rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" data-path="yeu-cau-bao-gia" href="#">
<span>Yêu cầu báo giá từ xưởng này</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between">
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center font-bold text-tertiary text-title-md">
                HN
              </div>
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
<span className="material-symbols-outlined text-[14px]">verified</span> Verified Supplier
              </span>
</div>
<h3 className="font-title-md text-title-md font-bold text-on-surface mt-space-md">
              Công Ty Cổ Phần Bánh Mứt Hữu Nghị
            </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Thế mạnh truyền thống lâu năm, công suất nhà máy 300,000 hộp, tối ưu chi phí cho cán bộ công nhân viên.
            </p>
<div className="mt-space-md space-y-1.5 text-body-sm font-body-sm">
<div className="flex items-center justify-between">
<span className="text-on-surface-variant">Xếp hạng uy tín:</span>
<span className="font-semibold text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings": "'FILL' 1"}}>workspace_premium</span> Đối tác Vàng (95đ)
                </span>
</div>
<div className="flex items-center justify-between">
<span className="text-on-surface-variant">Tỷ lệ giao đúng hẹn:</span>
<span className="font-data-mono text-data-mono font-semibold text-tertiary">99.1%</span>
</div>
<div className="flex items-center justify-between">
<span className="text-on-surface-variant">Tiêu chuẩn chất lượng:</span>
<span className="font-label-sm text-label-sm font-semibold text-on-surface bg-surface-container px-2 py-0.5 rounded">ISO 9001 • FSSC 22000</span>
</div>
</div>
</div>
<div className="mt-space-lg pt-space-xs">
<a className="w-full inline-flex items-center justify-center gap-1 py-2 px-space-md rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" data-path="yeu-cau-bao-gia" href="#">
<span>Yêu cầu báo giá từ xưởng này</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface py-space-lg px-gutter">
<div className="max-w-7xl mx-auto">
<div className="bg-primary text-on-primary rounded-2xl p-space-lg md:p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg shadow-lg">
<div className="max-w-2xl space-y-space-xs">
<div className="inline-flex items-center gap-1 font-label-sm text-label-sm font-semibold uppercase px-2.5 py-0.5 rounded bg-secondary-container text-on-secondary-container">
            Dành cho Nhà Sản Xuất &amp; Nghệ Nhân
          </div>
<h3 className="font-headline-md text-headline-md font-bold text-on-primary">
            Bạn là xưởng sản xuất hoặc thương hiệu bánh Trung Thu uy tín?
          </h3>
<p className="font-body-md text-body-md text-on-primary-container">
            Gia nhập mạng lưới B2B, tiếp cận hàng nghìn khách hàng doanh nghiệp trong mùa vụ 2025. Hỗ trợ hợp đồng, ký quỹ và vận hành trọn gói.
          </p>
</div>
<div className="shrink-0 w-full md:w-auto">
<a className="w-full md:w-auto inline-flex items-center justify-center gap-space-xs bg-surface-container-lowest text-primary hover:bg-surface-container-low font-label-md text-label-md font-bold px-space-lg py-3 rounded-lg shadow-sm transition-colors whitespace-nowrap" data-path="dang-ky-gian-hang" href="#">
<span>Đăng ký mở gian hàng (Xét duyệt 24h)</span>
<span className="material-symbols-outlined text-[18px]">verified</span>
</a>
</div>
</div>
</div>
</section>


</div></main><footer className="w-full bg-surface-container text-on-surface pt-space-xl pb-space-lg"><div className="max-w-7xl mx-auto px-gutter"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg mb-space-xl"><div className="space-y-space-md"><div className="flex items-center gap-space-xs"><span className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary">MoonMarket</span><span className="font-label-sm text-label-sm text-tertiary-container bg-tertiary-fixed px-1.5 py-0.5 rounded font-semibold">B2B</span></div><p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">Hệ sinh thái thương mại điện tử chuyên biệt kết nối doanh nghiệp với hơn 150+ xưởng bánh Trung Thu nghệ nhân &amp; nhà sản xuất quy mô lớn đạt chuẩn ISO/HACCP.</p><div className="flex items-center gap-space-sm pt-space-xs"><span className="material-symbols-outlined text-tertiary text-[20px]">verified_user</span><span className="font-label-sm text-label-sm text-tertiary font-semibold">100% Xưởng Được Giám Định An Toàn</span></div></div><div><h4 className="font-title-md text-title-md font-semibold text-on-surface mb-space-md">Quy Chuẩn Giao Dịch Doanh Nghiệp</h4><ul className="space-y-space-xs font-body-md text-body-md text-on-surface-variant"><li>Hợp đồng điện tử xác thực (e-Contract)</li><li>Cơ chế ký quỹ &amp; Escrow giải ngân an toàn</li><li>Cam kết kiểm duyệt định lượng &amp; bao bì VIP</li><li>Chính sách hoàn tiền trễ hạn mùa lễ</li><li>Hỗ trợ xuất hóa đơn VAT điện tử trong ngày</li></ul></div><div><h4 className="font-title-md text-title-md font-semibold text-on-surface mb-space-md">Hỗ Trợ &amp; Dịch Vụ Doanh Nghiệp</h4><ul className="space-y-space-xs font-body-md text-body-md text-on-surface-variant"><li>Tư vấn danh mục quà tặng theo ngân sách</li><li>Thiết kế ép kim, khắc laser logo theo nhận diện</li><li>Dịch vụ giao quà đa điểm tới 63 tỉnh thành</li><li>Đăng ký gửi bộ hộp mẫu (Sample Box) tận nơi</li><li>Tài liệu chính sách chiết khấu lũy tiến 2025</li></ul></div><div className="space-y-space-md"><h4 className="font-title-md text-title-md font-semibold text-on-surface mb-space-md">Bảo Đảm &amp; Pháp Lý B2B</h4><div className="bg-surface-container-lowest p-space-md rounded-lg space-y-space-xs"><div className="flex items-center gap-space-xs text-tertiary"><span className="material-symbols-outlined text-[18px]">policy</span><span className="font-label-md text-label-md font-bold">Giấy phép TMĐT &amp; ATTP</span></div><p className="font-body-sm text-body-sm text-on-surface-variant">Được cấp phép bởi Bộ Công Thương. Toàn bộ cơ sở đạt chứng chỉ HACCP / ISO 22000:2018.</p></div><div className="font-body-sm text-body-sm text-on-surface-variant space-y-1"><p><strong>Vận hành bởi:</strong> MoonMarket Enterprise JSC</p><p><strong>Mã số doanh nghiệp:</strong> 0109887766</p><p><strong>Văn phòng:</strong> Tầng 18, Toà tháp Landmark, Hà Nội &amp; TP. HCM</p></div></div></div><div className="pt-space-md flex flex-col md:flex-row items-center justify-between text-body-sm font-body-sm text-on-surface-variant gap-space-sm"><p>© 2025 MoonMarket Enterprise. Bản quyền thuộc về MoonMarket. Nền tảng phân phối Quà tặng Trung Thu Doanh Nghiệp số 1 Việt Nam.</p><div className="flex items-center gap-space-lg"><a className="hover:text-on-surface transition-colors" href="#">Điều khoản mua sắm B2B</a><a className="hover:text-on-surface transition-colors" href="#">Bảo mật thông tin thầu</a><a className="hover:text-on-surface transition-colors" href="#">Quy chế Escrow thanh toán</a></div></div></div></footer>
    </div>
  );
}
