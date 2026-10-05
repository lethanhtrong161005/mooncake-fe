import React from 'react';

export default function ContractsAndMilestone({ onNavigate }) {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-20 w-full px-margin flex items-center justify-between gap-gutter"><div className="flex items-center gap-space-lg shrink-0"><a className="flex items-center gap-3" data-path="trang-chu" href="#"><img alt="Logo biểu trưng thương hiệu sàn giao dịch B2B Bánh Trung Thu Mooncake Marketplace: biểu tượng vầng trăng rằm thanh lịch kết hợp hoa văn khuôn bánh truyền thống dập nổi vàng kim sang trọng trên nền đỏ trầm nhã nhặn.. Brand logo. - Primary color: #991b1b
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-sm
" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XeDH3ml-Oxy9w5fl0xKcYXZzLGzRPMBJAZpR8G80tab0cBtZrQ7_YfYflhLzmRN2uHc0sjIfX29rFpAto5mkXK_8CJNAc90yvMwH19nziuf_fMyXQbHwnnELW7O0Mtg7oUTPBeNuNccNI7sLjO5237vuzDzQnM78HYxZ3YuZpo2tjH0FZgBw7Woz7vXVCIGNjMsJ21mfCfp7P4n7MMkcw6U9YIFhCLwHrHNoPdUCq2mPD45CuedGPUF-0"/><div className="flex flex-col"><span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-none">MoonMarket</span><span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">B2B Enterprise Portal</span></div></a><div className="relative hidden xl:block w-72"><span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span><input className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary-container transition-all" placeholder="Tìm xưởng, SKU, hương vị..." type="text"/></div></div><nav className="hidden lg:flex items-center gap-1 xl:gap-2" data-active-classes="bg-primary-container text-on-primary font-title-md"><a className="px-3 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors whitespace-nowrap" data-path="trang-chu" href="#">Trang chủ</a><a className="px-3 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors whitespace-nowrap" data-path="san-pham-co-san" href="#">Sản phẩm có sẵn</a><a className="px-3 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors whitespace-nowrap" data-path="tim-xuong-va-gian-hang" href="#">Tìm xưởng &amp; Gian hàng</a><a className="px-3 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors whitespace-nowrap" data-path="quan-ly-don-hang-va-gio" href="#">Quản lý Đơn hàng &amp; Giỏ</a><a className="px-3 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors whitespace-nowrap" data-path="dau-thau-rfq-va-bao-gia" href="#">Đấu thầu RFQ &amp; Báo giá</a><a className="px-3 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors whitespace-nowrap" data-path="hop-dong-va-tien-do" href="#">Hợp đồng &amp; Tiến độ</a><a className="px-3 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors whitespace-nowrap" data-path="thanh-toan-va-bao-cao" href="#">Thanh toán &amp; Báo cáo</a></nav><div className="flex items-center gap-space-md shrink-0"><div className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low"><span className="material-symbols-outlined text-secondary text-[20px]">support_agent</span><div className="flex flex-col text-left leading-none"><span className="font-label-sm text-label-sm text-on-surface-variant">Hotline Doanh nghiệp</span><span className="font-data-mono text-data-mono text-on-surface font-semibold">1800 6886</span></div></div><button className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-container text-on-primary font-data-mono text-[10px] font-bold">3</span></button><div className="flex items-center gap-3 pl-2"><div className="hidden md:flex flex-col text-right leading-snug"><span className="font-title-md text-label-md text-on-surface font-semibold">An Phát Corp</span><span className="font-body-sm text-body-sm text-on-surface-variant">Nguyễn Văn An (Thu mua)</span></div><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></div></header><main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]"><div className="flex flex-col w-full">
<div className="w-full px-margin py-space-lg flex flex-col gap-space-lg max-w-[1440px] mx-auto">

<div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md bg-surface-container-low p-space-lg rounded-xl shadow-sm">
<div className="flex flex-col gap-1 min-w-0">
<div className="flex items-center gap-2 flex-wrap">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary font-data-mono text-label-sm uppercase tracking-wide">
            Hợp Đồng #HD-2025-00892
          </span>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-container text-on-tertiary font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]">verified_user</span>
            Bảo chứng Ký quỹ Escrow Active
          </span>
<span className="font-data-mono text-label-sm text-on-surface-variant">Cập nhật 14:32:09 GMT+7</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Trung Tâm Quản Trị Đơn Hàng &amp; PoD</h1>
<p className="font-body-md text-body-md text-on-surface-variant">Doanh nghiệp thụ hưởng: <span className="font-title-md text-title-md text-on-surface">Tập đoàn Bất Động Sản An Phát (MST: 0108923481)</span> · Đơn vị thi công: <span className="font-title-md text-title-md text-secondary">Xưởng Nghệ Nhân Trăng Vàng Thăng Long</span></p>
</div>
<div className="flex items-center gap-space-sm shrink-0">
<button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-high text-on-surface font-title-md text-label-md hover:bg-surface-container-highest transition-all shadow-sm" id="btn-export-summary" >
<span className="material-symbols-outlined text-[18px]">download_for_offline</span>
<span>Xuất Báo Cáo Kế Toán</span>
</button>
<button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary font-title-md text-label-md hover:opacity-95 transition-opacity shadow-sm" >
<span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
<span>Thanh toán Mốc M1</span>
</button>
</div>
</div>

<div className="w-full bg-surface-container-lowest rounded-xl shadow-sm p-1.5 flex flex-wrap lg:flex-nowrap gap-1">
<button className="tab-button flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md transition-all" id="btn-tab-pod" >
<span className="material-symbols-outlined text-[20px]">local_shipping</span>
<span>1. Theo Dõi &amp; PoD Thư Viện</span>
<span className="ml-1 px-2 py-0.5 rounded-full bg-surface/20 text-on-primary font-data-mono text-label-sm">3 Điểm</span>
</button>
<button className="tab-button flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container font-title-md text-title-md transition-all" id="btn-tab-payment" >
<span className="material-symbols-outlined text-[20px]">shield_with_heart</span>
<span>2. Thanh Toán Escrow &amp; VAT</span>
<span className="ml-1 px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-data-mono text-label-sm">Chờ M1</span>
</button>
<button className="tab-button flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container font-title-md text-title-md transition-all" id="btn-tab-reviews" >
<span className="material-symbols-outlined text-[20px]">rate_review</span>
<span>3. Đánh Giá &amp; Báo Cáo Chất Lượng</span>
</button>
<button className="tab-button flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container font-title-md text-title-md transition-all" id="btn-tab-analytics" >
<span className="material-symbols-outlined text-[20px]">insights</span>
<span>4. Thống Kê &amp; Báo Cáo Mua Sắm</span>
</button>
</div>

<div className="tab-pane flex flex-col gap-space-lg w-full" id="tab-pod">

<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">

<div className="hub-selector cursor-pointer bg-surface-container-lowest p-space-md rounded-xl shadow-sm transition-all border-0 ring-0 ring-primary" id="card-hub-hn" >
<div className="flex items-center justify-between mb-2">
<span className="font-data-mono text-label-sm text-secondary uppercase tracking-wider font-semibold">Chặng 01 · Đã Hoàn Tất</span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-container text-on-tertiary font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]">check_circle</span> Đã Giao PoD
            </span>
</div>
<div className="flex items-baseline justify-between">
<span className="font-headline-sm text-headline-sm text-on-surface">Trụ sở Hà Nội</span>
<span className="font-data-mono text-title-md text-primary font-bold">350 / 350 Hộp</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Toà tháp Keangnam Landmark 72, Nam Từ Liêm</p>
</div>

<div className="hub-selector cursor-pointer bg-surface-container-lowest p-space-md rounded-xl shadow-sm transition-all opacity-85 hover:opacity-100" id="card-hub-dn" >
<div className="flex items-center justify-between mb-2">
<span className="font-data-mono text-label-sm text-secondary uppercase tracking-wider font-semibold">Chặng 02 · Đang Vận Chuyển</span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]">local_shipping</span> Đang Trên Đường
            </span>
</div>
<div className="flex items-baseline justify-between">
<span className="font-headline-sm text-headline-sm text-on-surface">Chi nhánh Đà Nẵng</span>
<span className="font-data-mono text-title-md text-primary font-bold">150 / 150 Hộp</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Tầng 12, Toà nhà Indochina Riverside, Hải Châu</p>
</div>

<div className="hub-selector cursor-pointer bg-surface-container-lowest p-space-md rounded-xl shadow-sm transition-all opacity-85 hover:opacity-100" id="card-hub-hcm" >
<div className="flex items-center justify-between mb-2">
<span className="font-data-mono text-label-sm text-secondary uppercase tracking-wider font-semibold">Chặng 03 · Chờ Lấy Hàng</span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]">hourglass_top</span> Sẵn Sàng Tại Kho
            </span>
</div>
<div className="flex items-baseline justify-between">
<span className="font-headline-sm text-headline-sm text-on-surface">Văn phòng TP.HCM</span>
<span className="font-data-mono text-title-md text-primary font-bold">250 / 250 Hộp</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Tầng 25, Bitexco Financial Tower, Quận 1</p>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 pb-2">
<div>
<span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Quy Trình Kiểm Tra &amp; Bàn Giao</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Tiến Độ Chặng 01: Trụ Sở Hà Nội (Mã Vận Đơn: MM-LOG-HN7709)</h2>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary text-[20px]">verified</span>
<span className="font-data-mono text-label-md text-tertiary font-semibold">Đã Đối Soát Chữ Ký Số &amp; Niêm Phong GPS</span>
</div>
</div>

<div className="relative w-full py-4">
<div className="absolute top-1/2 left-4 right-4 h-1 bg-surface-container -translate-y-1/2 -z-0"></div>
<div className="absolute top-1/2 left-4 w-full h-1 bg-primary-container -translate-y-1/2 -z-0"></div>
<div className="grid grid-cols-5 relative z-10 text-center">

<div className="flex flex-col items-center">
<div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-title-md text-title-md shadow-sm">
<span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
</div>
<span className="font-title-md text-label-md text-on-surface mt-2">Chờ xử lý</span>
<span className="font-data-mono text-body-sm text-on-surface-variant">12/08 08:30</span>
</div>

<div className="flex flex-col items-center">
<div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-title-md text-title-md shadow-sm">
<span className="material-symbols-outlined text-[20px]">fact_check</span>
</div>
<span className="font-title-md text-label-md text-on-surface mt-2">Đã xác nhận</span>
<span className="font-data-mono text-body-sm text-on-surface-variant">13/08 14:15</span>
</div>

<div className="flex flex-col items-center">
<div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-title-md text-title-md shadow-sm">
<span className="material-symbols-outlined text-[20px]">inventory_2</span>
</div>
<span className="font-title-md text-label-md text-on-surface mt-2">Đã lấy hàng</span>
<span className="font-data-mono text-body-sm text-on-surface-variant">14/08 09:00</span>
</div>

<div className="flex flex-col items-center">
<div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-title-md text-title-md shadow-sm">
<span className="material-symbols-outlined text-[20px]">local_shipping</span>
</div>
<span className="font-title-md text-label-md text-on-surface mt-2">Đang vận chuyển</span>
<span className="font-data-mono text-body-sm text-on-surface-variant">14/08 11:20</span>
</div>

<div className="flex flex-col items-center">
<div className="w-10 h-10 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-title-md text-title-md shadow-sm">
<span className="material-symbols-outlined text-[20px]">done_all</span>
</div>
<span className="font-title-md text-label-md text-tertiary font-bold mt-2">Đã giao thành công</span>
<span className="font-data-mono text-body-sm text-tertiary font-medium">14/08 15:45 (PoD Verified)</span>
</div>
</div>
</div>
</div>

<div className="flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[24px]">photo_camera</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Thư Viện Ảnh Bàn Giao PoD Thực Tế (Proof-of-Delivery)</h3>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-lg">Bảo chứng bằng Blockchain SHA-256 Timestamps</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col group">
<div className="relative w-full h-56 overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Clear high resolution documentary photograph of neatly wrapped wooden corporate mooncake gift crates on a wooden pallet inside an office reception lobby, sealed with heavy duty security tape and tamper-evident red holographic ribbons, crisp modern ambient indoor corporate lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKI04w1MxAzkLCYkXevOxIoCaSGG1GNKuv0bGKQQUoESuVbAwe8FKTtj5VjHVbtFmUdSpoMhSiwb1F56tWdtHLy4nb19qxs7EwSBnqHBp01vSMzNvi1zJc-4gWcAoyDTT_60PieFjgDI-OXQu6EJE5eKDFrS03rtBfYXjFeotC-zKYRZQm5luQ18U2-OKUztvrx4picIgszUmfv62anxethpUi-_bpwSQ2HzbFMKsLN6r5Cf7OLNSF"/>
<span className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface font-label-sm text-label-sm">
                Ảnh 1: Kiện Niêm Phong Seal
              </span>
<span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-tertiary text-on-tertiary font-data-mono text-[10px]">
                SHA-256: 4e9a...81c3
              </span>
</div>
<div className="p-space-md flex flex-col gap-2">
<div className="flex items-center justify-between text-body-sm">
<span className="text-on-surface-variant">Quy cách kiện:</span>
<span className="font-title-md text-on-surface">14 thùng carton màng co</span>
</div>
<div className="flex items-center justify-between text-body-sm">
<span className="text-on-surface-variant">Tọa độ GPS:</span>
<span className="font-data-mono text-on-surface">21.0168° N, 105.7838° E</span>
</div>
<div className="flex items-center justify-between text-body-sm">
<span className="text-on-surface-variant">Thời gian thực tế:</span>
<span className="font-data-mono text-primary font-semibold">14/08/2024 15:32:10 GMT+7</span>
</div>
<div className="mt-2 pt-2 bg-surface-container-low p-2 rounded-lg text-body-sm text-on-surface">
<span className="font-semibold text-secondary">Tình trạng:</span> Tem niêm phong nguyên vẹn, 0 bể vỡ, màng seal chống ẩm bảo toàn 100%.
              </div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col group">
<div className="relative w-full h-56 overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Macro corporate photograph of a signed physical paper handover receipt and legal corporate procurement bill sitting on a conference table alongside a luxury navy blue mooncake gift box with gold foil stamping and an official red rubber corporate stamp" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxYFHAxf9Q8hne58_ZoauFk6gYq4-vZpsE6_yRpABeIM1uiZbjnnZL3EEq6U2cNgC4Rb_aMKlCjwJYorWZ1F38-i9dopVnwBDBF5A7bRqurVMdOn8xRuKT2MTCCjMzdCewY-CHcR6a5Ae1cwWC_sAGpED-2xdN1FWhKu3kpJGDjTlSNVySRgqb8ZgW_Wy-WQUeVIUNZ4jTuX0D7cSsEAip4eDfVm7rLAZv8CGoRiaBSN2sgI7kCXAV"/>
<span className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface font-label-sm text-label-sm">
                Ảnh 2: Biên Bản &amp; Ký Nhận Văn Phòng
              </span>
<span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-tertiary text-on-tertiary font-data-mono text-[10px]">
                SHA-256: 7f12...bc90
              </span>
</div>
<div className="p-space-md flex flex-col gap-2">
<div className="flex items-center justify-between text-body-sm">
<span className="text-on-surface-variant">Người nhận:</span>
<span className="font-title-md text-on-surface">Trần Thị Mai (Hành chính An Phát)</span>
</div>
<div className="flex items-center justify-between text-body-sm">
<span className="text-on-surface-variant">Mã biên bản PoD:</span>
<span className="font-data-mono text-on-surface">POD-HN-2024-0814</span>
</div>
<div className="flex items-center justify-between text-body-sm">
<span className="text-on-surface-variant">Con dấu doanh nghiệp:</span>
<span className="font-data-mono text-tertiary font-semibold">Đã đóng dấu đỏ pháp nhân</span>
</div>
<div className="mt-2 pt-2 bg-surface-container-low p-2 rounded-lg text-body-sm text-on-surface">
<span className="font-semibold text-secondary">Xác nhận:</span> Kiểm đếm ngẫu nhiên 50 hộp chuẩn vị Thập Cẩm Bào Ngư &amp; Trà Xanh Hạt Sen.
              </div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col group">
<div className="relative w-full h-56 overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="High angle shot of unboxed luxury mooncake gift boxes placed elegantly on an executive boardroom desk displaying pristine golden baked crusts branded with company logo and fresh batch manufacturing inspection slips" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyru0D8hztZkIN65q-G9GqA0SQydGbGX1OWMBKJXknip1APklRnk0W_hGB-X-rAko-MuHAEUYm7INuisZSu3jOaVzKZ_Vn-_3RJQAzJ38heYIWpu-WEHpbUhoDj_M-BtVmrcn9rW2k_hi8kezvBj_YJt3rinhadFkySOAOS6mXW14T0UlZ-AzJYbMfRwbczNx7ZF_O9p4Wt1LQCvImn_j9oRJ0fyjYs1LcaN4CepwBXHRqkMspV6Vb"/>
<span className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface font-label-sm text-label-sm">
                Ảnh 3: Mở Hộp Kiểm Định Chất Lượng
              </span>
<span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-tertiary text-on-tertiary font-data-mono text-[10px]">
                SHA-256: 9b33...da41
              </span>
</div>
<div className="p-space-md flex flex-col gap-2">
<div className="flex items-center justify-between text-body-sm">
<span className="text-on-surface-variant">Kiểm định lô:</span>
<span className="font-title-md text-on-surface">Hạn sử dụng: 45 ngày</span>
</div>
<div className="flex items-center justify-between text-body-sm">
<span className="text-on-surface-variant">Tem chống hàng giả:</span>
<span className="font-data-mono text-tertiary">QR Code Check Pass</span>
</div>
<div className="flex items-center justify-between text-body-sm">
<span className="text-on-surface-variant">Phê duyệt bởi:</span>
<span className="font-title-md text-on-surface">Ban Thu Mua Tập Đoàn</span>
</div>
<div className="mt-2 pt-2 bg-surface-container-low p-2 rounded-lg text-body-sm text-on-surface">
<span className="font-semibold text-secondary">Nghiệm thu:</span> Đạt điều kiện để đề nghị giải ngân bảo lãnh mốc giao hàng M1.
              </div>
</div>
</div>
</div>
</div>
</div>

<div className="tab-pane hidden flex flex-col gap-space-lg w-full" id="tab-payment">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">

<div className="lg:col-span-7 flex flex-col gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="flex items-start justify-between">
<div>
<span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Tài Khoản Trung Gian Độc Lập</span>
<h2 className="font-headline-sm text-headline-sm text-primary">Thanh Toán Ký Quỹ Đợt 2 (Mốc Cọc M1)</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Số tiền sẽ được tạm giữ an toàn trong tài khoản Escrow cho tới khi đại diện An Phát ký duyệt biên bản giao nhận đủ tiêu chuẩn.</p>
</div>
<div className="p-3 rounded-lg bg-surface-container-low text-primary">
<span className="material-symbols-outlined text-[28px]">lock</span>
</div>
</div>

<div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between">
<div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Số tiền cần thanh toán Mốc M1:</span>
<div className="font-display-hero text-headline-lg lg:text-display-hero text-primary font-bold">75.000.000 <span className="text-headline-sm text-on-surface font-normal">VNĐ</span></div>
</div>
<div className="text-right">
<span className="font-label-sm text-label-sm text-secondary font-semibold">Hạn thanh toán:</span>
<div className="font-data-mono text-title-md text-on-surface font-semibold">18:00 - 18/08/2024</div>
<span className="font-body-sm text-tertiary">Không tính phí giao dịch B2B</span>
</div>
</div>

<div className="flex flex-col gap-3">
<span className="font-title-md text-title-md text-on-surface font-semibold">Chọn Phương Thức Thanh Toán Chuẩn Doanh Nghiệp:</span>

<div className="p-space-md rounded-xl bg-surface-bright shadow-sm flex flex-col md:flex-row items-center gap-space-md">
<div className="w-36 h-36 bg-surface-container flex flex-col items-center justify-center rounded-lg p-2 shrink-0">

<div className="w-full h-full bg-surface-container-highest rounded flex flex-col items-center justify-center text-center p-1">
<span className="material-symbols-outlined text-primary text-[32px]">qr_code_2</span>
<span className="font-data-mono text-[9px] text-on-surface-variant uppercase mt-1">VietQR Escrow 24/7</span>
<span className="font-data-mono text-[8px] text-primary font-bold">TECHCOMBANK B2B</span>
</div>
</div>
<div className="flex flex-col gap-1 w-full text-body-sm">
<div className="flex items-center justify-between">
<span className="text-on-surface-variant">Ngân hàng thụ hưởng:</span>
<span className="font-title-md text-on-surface">Techcombank - CN Hội Sở Hà Nội</span>
</div>
<div className="flex items-center justify-between">
<span className="text-on-surface-variant">Tên tài khoản:</span>
<span className="font-title-md text-on-surface uppercase">CTCP MOONMARKET ESCROW B2B</span>
</div>
<div className="flex items-center justify-between">
<span className="text-on-surface-variant">Số tài khoản định danh:</span>
<span className="font-data-mono text-title-md text-primary font-bold">1903 8899 2200 11</span>
</div>
<div className="flex items-center justify-between bg-surface-container-low p-1.5 rounded">
<span className="text-on-surface-variant">Cú pháp bắt buộc:</span>
<div className="flex items-center gap-2">
<span className="font-data-mono text-title-md text-secondary font-bold" id="transfer-code">PAY-HD2025-00892</span>
<button className="text-primary hover:opacity-80"  title="Sao chép cú pháp">
<span className="material-symbols-outlined text-[16px]">content_copy</span>
</button>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
<label className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-3 cursor-pointer hover:bg-surface-container">
<input defaultChecked className="accent-primary w-4 h-4" name="pay-option" type="radio"/>
<div className="flex flex-col">
<span className="font-title-md text-label-md text-on-surface font-semibold">Thẻ Doanh Nghiệp (Corporate Visa/Master)</span>
<span className="font-body-sm text-[11px] text-on-surface-variant">Hạn mức linh hoạt, sao kê chuẩn B2B</span>
</div>
</label>
<label className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-3 cursor-pointer hover:bg-surface-container">
<input className="accent-primary w-4 h-4" name="pay-option" type="radio"/>
<div className="flex flex-col">
<span className="font-title-md text-label-md text-on-surface font-semibold">Cổng VNPay-B2B / Viettel Money Pro</span>
<span className="font-body-sm text-[11px] text-on-surface-variant">Tích hợp sẵn chữ ký số token kế toán</span>
</div>
</label>
</div>
<button className="w-full py-3.5 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-colors flex items-center justify-center gap-2 shadow-md" >
<span className="material-symbols-outlined text-[20px]">verified</span>
<span>Xác Nhận Nạp Tiền Ký Quỹ Escrow (75.000.000đ)</span>
</button>
</div>
</div>

<div className="lg:col-span-5 flex flex-col gap-space-md">
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Tiến Độ Ký Quỹ Các Mốc Hợp Đồng</h3>
<div className="flex flex-col gap-3">

<div className="p-space-sm rounded-lg bg-surface-container-low flex items-start justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary text-[20px]">check_circle</span>
<div>
<div className="font-title-md text-label-md text-on-surface">Mốc M0: Cọc Giữ Chỗ &amp; Bao Bì</div>
<span className="font-body-sm text-on-surface-variant">Đã mở khuôn &amp; in ấn logo doanh nghiệp</span>
</div>
</div>
<div className="text-right">
<span className="font-data-mono text-label-md text-on-surface font-semibold">50.000.000đ</span>
<span className="block font-label-sm text-tertiary">Đã Giải Ngân</span>
</div>
</div>

<div className="p-space-sm rounded-lg bg-secondary-fixed/30 flex items-start justify-between ring-1 ring-secondary">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">schedule</span>
<div>
<div className="font-title-md text-label-md text-on-surface font-bold">Mốc M1: Giao Hàng Đợt 1 (Hà Nội)</div>
<span className="font-body-sm text-on-surface-variant">Đã nhận đủ 350 hộp có chữ ký đại diện</span>
</div>
</div>
<div className="text-right">
<span className="font-data-mono text-label-md text-primary font-bold">75.000.000đ</span>
<span className="block font-label-sm text-secondary font-bold">Đang Yêu Cầu</span>
</div>
</div>

<div className="p-space-sm rounded-lg bg-surface-container-low flex items-start justify-between opacity-70">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">hourglass_empty</span>
<div>
<div className="font-title-md text-label-md text-on-surface">Mốc M2: Giao Hàng Đợt 2 (Đà Nẵng &amp; HCM)</div>
<span className="font-body-sm text-on-surface-variant">Dự kiến hoàn thành 22/08/2024</span>
</div>
</div>
<div className="text-right">
<span className="font-data-mono text-label-md text-on-surface font-semibold">120.000.000đ</span>
<span className="block font-label-sm text-on-surface-variant">Chưa tới hạn</span>
</div>
</div>

<div className="p-space-sm rounded-lg bg-surface-container-low flex items-start justify-between opacity-70">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">inventory</span>
<div>
<div className="font-title-md text-label-md text-on-surface">Mốc M3: Quyết Toán &amp; Thanh Lý Hợp Đồng</div>
<span className="font-body-sm text-on-surface-variant">Xuất đủ hóa đơn VAT điện tử &amp; biên lai hoàn chỉnh</span>
</div>
</div>
<div className="text-right">
<span className="font-data-mono text-label-md text-on-surface font-semibold">35.000.000đ</span>
<span className="block font-label-sm text-on-surface-variant">Giữ bảo hành</span>
</div>
</div>
</div>
<div className="p-space-sm rounded-lg bg-tertiary-container text-on-tertiary flex items-center gap-3">
<span className="material-symbols-outlined text-[24px]">verified</span>
<p className="font-body-sm text-[12px] leading-tight">Mọi tranh chấp về chất lượng bánh hoặc sai sót số lượng được Trung tâm Phân xử Escrow MoonMarket bảo vệ 100% quyền lợi hoàn tiền trong vòng 24 giờ làm việc.</p>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Lịch Sử Giao Dịch &amp; Hóa Đơn Điện Tử VAT Đã Phát Hành</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Tra cứu và tải nhanh hóa đơn GTGT hợp lệ phục vụ kê khai thuế và đối soát tài chính.</p>
</div>
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container-highest">
<span className="material-symbols-outlined text-[18px]">sync</span>
<span>Đồng bộ phần mềm MISA/FAST</span>
</button>
</div>
<div className="overflow-x-auto w-full">
<table className="w-full text-left text-body-sm text-on-surface">
<thead className="bg-surface-container-low font-title-md text-label-sm uppercase text-on-surface-variant">
<tr>
<th className="py-3 px-4">Mã Giao Dịch</th>
<th className="py-3 px-4">Ngày Thực Hiện</th>
<th className="py-3 px-4">Nội Dung Thanh Toán</th>
<th className="py-3 px-4">Số Tiền (VNĐ)</th>
<th className="py-3 px-4">Mã Hóa Đơn VAT</th>
<th className="py-3 px-4">Trạng Thái</th>
<th className="py-3 px-4 text-right">Chứng Từ</th>
</tr>
</thead>
<tbody className="divide-y-0">
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-data-mono text-primary font-semibold">TRX-2024-0801-01</td>
<td className="py-3 px-4 font-data-mono">01/08/2024 10:15</td>
<td className="py-3 px-4">Đặt cọc M0: Hợp đồng bánh trung thu cao cấp 750 hộp</td>
<td className="py-3 px-4 font-data-mono font-semibold">50.000.000</td>
<td className="py-3 px-4 font-data-mono text-on-surface-variant">VAT-24-001928</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-container text-on-tertiary font-label-sm text-[11px]">Đã Hạch Toán</span>
</td>
<td className="py-3 px-4 text-right">
<button className="inline-flex items-center gap-1 text-primary hover:underline font-label-md text-label-md" >
<span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
<span>Tải PDF VAT</span>
</button>
</td>
</tr>
<tr className="bg-surface-container-low/50 hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-data-mono text-primary font-semibold">TRX-2024-0728-09</td>
<td className="py-3 px-4 font-data-mono">28/07/2024 16:40</td>
<td className="py-3 px-4">Phí làm hộp mẫu (Sample Box) ép kim logo An Phát</td>
<td className="py-3 px-4 font-data-mono font-semibold">2.500.000</td>
<td className="py-3 px-4 font-data-mono text-on-surface-variant">VAT-24-001850</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-container text-on-tertiary font-label-sm text-[11px]">Đã Hạch Toán</span>
</td>
<td className="py-3 px-4 text-right">
<button className="inline-flex items-center gap-1 text-primary hover:underline font-label-md text-label-md" >
<span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
<span>Tải PDF VAT</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

<div className="tab-pane hidden flex flex-col gap-space-lg w-full" id="tab-reviews">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">

<div className="lg:col-span-7 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between pb-2">
<div>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-tertiary-container text-on-tertiary font-data-mono text-label-sm font-semibold">
<span className="material-symbols-outlined text-[14px]">verified</span> Verified Corporate Purchase
              </span>
<h2 className="font-headline-sm text-headline-sm text-on-surface mt-1">Đánh Giá Nghiệm Thu Đơn Hàng Doanh Nghiệp</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Nhận xét của bạn được ghi nhận vào Hồ sơ Năng lực Công khai của nhà xưởng trên sàn MoonMarket.</p>
</div>
<div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[28px]">reviews</span>
</div>
</div>

<div className="flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-xl">
<span className="font-title-md text-label-md text-on-surface font-bold uppercase tracking-wider">Đánh Giá 4 Tiêu Chí B2B Trọng Yếu:</span>

<div className="flex items-center justify-between">
<div className="flex flex-col">
<span className="font-title-md text-body-md text-on-surface">1. Chất lượng &amp; Hương vị bánh:</span>
<span className="font-body-sm text-on-surface-variant">Độ tươi, vị thanh, độ ẩm chuẩn và độ bùi của nhân</span>
</div>
<div className="flex items-center gap-1 star-group" data-criterion="c1">
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
</div>
</div>

<div className="flex items-center justify-between">
<div className="flex flex-col">
<span className="font-title-md text-body-md text-on-surface">2. Đúng hạn tiến độ (Lead time):</span>
<span className="font-body-sm text-on-surface-variant">Bàn giao trước hoặc đúng giờ hẹn, không lỡ sự kiện</span>
</div>
<div className="flex items-center gap-1 star-group" data-criterion="c2">
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
<button className="text-surface-variant text-[22px] material-symbols-outlined" type="button">star</button>
</div>
</div>

<div className="flex items-center justify-between">
<div className="flex flex-col">
<span className="font-title-md text-body-md text-on-surface">3. Hỗ trợ in ấn &amp; Nhận diện hộp quà:</span>
<span className="font-body-sm text-on-surface-variant">Ép kim sắc nét, đúng mã màu pantone, thiệp chúc chỉn chu</span>
</div>
<div className="flex items-center gap-1 star-group" data-criterion="c3">
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
</div>
</div>

<div className="flex items-center justify-between">
<div className="flex flex-col">
<span className="font-title-md text-body-md text-on-surface">4. Tổng thể dịch vụ &amp; Hỗ trợ kỹ thuật:</span>
<span className="font-body-sm text-on-surface-variant">Phản hồi nhanh, linh hoạt chia tách điểm giao vận</span>
</div>
<div className="flex items-center gap-1 star-group" data-criterion="c4">
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
<button className="text-secondary text-[22px] material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}} type="button">star</button>
</div>
</div>
</div>

<div className="flex flex-col gap-2">
<span className="font-title-md text-label-md text-on-surface font-semibold">Chọn Biến Thể Sản Phẩm Để Ghi Nhận Chi Tiết:</span>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-body-sm cursor-pointer shadow-sm">
                Bánh Nướng Thập Cẩm Bào Ngư 180g (Trứng Muối)
              </span>
<span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-body-sm cursor-pointer hover:bg-surface-container-highest">
                Bánh Nướng Hạt Sen Hạt Dưa Hoàng Kim 180g
              </span>
<span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-body-sm cursor-pointer hover:bg-surface-container-highest">
                Hộp Sơn Mài Cao Cấp Dạ Nguyệt Đoàn Viên (Bộ 4 Bánh + Trà Ô Long)
              </span>
</div>
</div>

<div className="flex flex-col gap-2">
<label className="font-title-md text-label-md text-on-surface font-semibold" htmlFor="review-content">Nhận xét khách quan dành cho xưởng sản xuất:</label>
<textarea className="w-full p-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary-container resize-none" id="review-content" placeholder="Nhận xét về độ đều màu vỏ bánh, hương vị béo ngậy vừa phải, quy cách đóng gói hộp carton cứng cáp không bị móp méo khi vận chuyển đường dài..." rows="4"></textarea>
</div>

<div className="flex flex-col gap-2">
<span className="font-title-md text-label-md text-on-surface font-semibold">Tải lên hình ảnh thực tế lô quà tặng (Tối đa 6 ảnh):</span>
<div className="flex flex-wrap gap-3">
<div className="w-20 h-20 rounded-lg bg-surface-container-low flex flex-col items-center justify-center text-on-surface-variant cursor-pointer hover:bg-surface-container hover:text-primary transition-colors">
<span className="material-symbols-outlined text-[24px]">add_a_photo</span>
<span className="font-label-sm text-[10px] mt-1">Thêm ảnh</span>
</div>
<div className="w-20 h-20 rounded-lg overflow-hidden relative shadow-sm">
<img className="w-full h-full object-cover" data-alt="Close up photograph of freshly sliced baked golden brown mooncake showing rich salted egg yolk center with savory abalone filling on an elegant ceramic plate" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJJppD5-gp_3598HkgOBWxC9IPWkUF7NLMB-20RDGt2YH2kA89f_IjiIWKsJ76Yd5DN-YPj7JvfZpuGvcvHCV7SePBLx33lc2C8kNu5oQI5cUtlxmR8Tqm2tBtgb4yvpBcmIOKckK0gbES4jbk2r8DSKJ3ZYtUw4652DtMqzc-dgDcb0z7gJjL_4x4txNWNeTlltf2imj8EhQnJUGwxgELeCgxmcfozEqg-aIRdNOAbve1hhMfschc"/>
</div>
<div className="w-20 h-20 rounded-lg overflow-hidden relative shadow-sm">
<img className="w-full h-full object-cover" data-alt="Executive corporate premium gift box packaging with golden embossed enterprise crest and four elegant individual mooncake mini boxes neatly arranged inside velvet fabric lining" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKolUHgNDxAI0WhVFT4qdtoWMTyFy307r_d1BugEUfyLl6LJAeNEguSrcru59qK38uho4nlD9hgTQpdqSjKHlXR7UnoMltjEb-eYQOYmsRx0XWUehe4qMoe0xGu4u1w9fJch6qWJz8rpbfNYlLXOhh10QbhYCSoAH7BIthfTp5kQqnQYuQnLl8QGHKKHgcKMxg7Z2gnHbpPqKTIIPn1i_VOJTQeDbszplUMqzRfMDijZkq_BJZnaCH"/>
</div>
</div>
</div>
<div className="flex items-center justify-end gap-3 pt-2">
<button className="px-5 py-2.5 rounded-lg bg-surface-container-high text-on-surface font-title-md text-label-md hover:bg-surface-container-highest">
              Lưu Bản Nháp
            </button>
<button className="px-6 py-2.5 rounded-lg bg-primary-container text-on-primary font-title-md text-label-md hover:bg-primary transition-colors shadow-sm" >
              Gửi Đánh Giá Nghiệm Thu
            </button>
</div>
</div>

<div className="lg:col-span-5 flex flex-col gap-space-md">
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Đánh Giá Từ Doanh Nghiệp Khác</h3>
<span className="font-data-mono text-title-md text-secondary font-bold">4.9 / 5.0 ★</span>
</div>

<div className="flex flex-col gap-2 p-space-sm rounded-lg bg-surface-container-low">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-secondary-fixed text-on-secondary-fixed font-title-md text-label-sm flex items-center justify-center font-bold">VP</div>
<div className="flex flex-col">
<span className="font-title-md text-label-md text-on-surface">VPBank Securities</span>
<span className="font-body-sm text-[11px] text-on-surface-variant">Đơn hàng 1.200 hộp · Mùa 2024</span>
</div>
</div>
<div className="flex text-secondary text-[16px]">★★★★★</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface mt-1">"Bánh Nướng Thập Cẩm Bào Ngư vị đậm đà vừa vặn, không bị gắt đường. Khách hàng VIP của bên mình phản hồi rất tích cực về khâu đóng gói hộp gỗ ép kim logo."</p>
</div>

<div className="flex flex-col gap-2 p-space-sm rounded-lg bg-surface-container-low">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-primary-fixed text-on-primary-fixed font-title-md text-label-sm flex items-center justify-center font-bold">VN</div>
<div className="flex flex-col">
<span className="font-title-md text-label-md text-on-surface">Tập Đoàn Viettel IDC</span>
<span className="font-body-sm text-[11px] text-on-surface-variant">Đơn hàng 500 hộp · Mùa 2024</span>
</div>
</div>
<div className="flex text-secondary text-[16px]">★★★★★</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface mt-1">"Quy trình giao hàng chia làm 3 đợt rất đúng giờ. Bộ phận phụ trách PoD chụp ảnh cẩn thận và tài xế hỗ trợ bốc xếp lên tận sảnh văn phòng tầng 15."</p>
</div>
</div>
</div>
</div>
</div>

<div className="tab-pane hidden flex flex-col gap-space-lg w-full" id="tab-analytics">

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-1">
<div className="flex items-center justify-between text-on-surface-variant">
<span className="font-label-sm text-label-sm uppercase tracking-wide">Tổng Ngân Sách Đã Giải Ngân</span>
<span className="material-symbols-outlined text-[20px] text-primary">payments</span>
</div>
<div className="font-headline-lg text-headline-lg text-primary font-bold">125.000.000 <span className="text-body-md font-normal text-on-surface">đ</span></div>
<div className="flex items-center gap-1 font-body-sm text-[12px] text-on-surface-variant mt-1">
<span>Tiến độ ngân sách: </span>
<span className="font-data-mono text-tertiary font-semibold">44.6% kế hoạch mùa</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-1">
<div className="flex items-center justify-between text-on-surface-variant">
<span className="font-label-sm text-label-sm uppercase tracking-wide">Tổng Số Hộp Bánh Đã Đặt</span>
<span className="material-symbols-outlined text-[20px] text-secondary">takeout_dining</span>
</div>
<div className="font-headline-lg text-headline-lg text-on-surface font-bold">750 <span className="text-body-md font-normal text-on-surface-variant">hộp quà</span></div>
<div className="flex items-center gap-1 font-body-sm text-[12px] text-tertiary mt-1">
<span className="material-symbols-outlined text-[16px]">arrow_upward</span>
<span>+25% so với mùa Trung thu 2023</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-1">
<div className="flex items-center justify-between text-on-surface-variant">
<span className="font-label-sm text-label-sm uppercase tracking-wide">Chiết Khấu Đạt Được</span>
<span className="material-symbols-outlined text-[20px] text-tertiary">percent</span>
</div>
<div className="font-headline-lg text-headline-lg text-tertiary font-bold">21.4% <span className="text-body-md font-normal text-on-surface-variant">bình quân</span></div>
<div className="flex items-center gap-1 font-body-sm text-[12px] text-on-surface-variant mt-1">
<span>Tiết kiệm ngân sách: </span>
<span className="font-data-mono text-primary font-bold">38.200.000đ</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-1">
<div className="flex items-center justify-between text-on-surface-variant">
<span className="font-label-sm text-label-sm uppercase tracking-wide">Xưởng Đạt Chuẩn Hợp Tác</span>
<span className="material-symbols-outlined text-[20px] text-on-surface">storefront</span>
</div>
<div className="font-headline-lg text-headline-lg text-on-surface font-bold">02 <span className="text-body-md font-normal text-on-surface-variant">nhà sản xuất</span></div>
<div className="flex items-center gap-1 font-body-sm text-[12px] text-on-surface-variant mt-1">
<span>Tiêu chuẩn: </span>
<span className="font-title-md text-tertiary">ISO 22000 &amp; HACCP</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">

<div className="lg:col-span-8 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 pb-2">
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Phân Bổ Sản Phẩm Theo Vị &amp; Đối Tượng Tặng</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Dữ liệu phân bổ cho Khách hàng VIP, Đối tác chiến lược và Tập thể cán bộ công nhân viên.</p>
</div>
<span className="font-data-mono text-label-sm text-on-surface-variant bg-surface-container-low px-3 py-1 rounded">Dữ liệu hợp đồng #HD-2025-00892</span>
</div>

<div className="flex flex-col gap-space-md pt-2">

<div className="flex flex-col gap-1.5">
<div className="flex items-center justify-between font-body-sm">
<span className="font-title-md text-on-surface">Hộp VIP Sơn Mài (Bào Ngư, Yến Sào, Tôm Hùm)</span>
<span className="font-data-mono text-primary font-bold">180 Hộp (24%)</span>
</div>
<div className="w-full h-3 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-primary-container rounded-full" style={{"width": "24%"}}></div>
</div>
<span className="text-body-sm text-on-surface-variant">Đối tượng: Ban Lãnh Đạo cấp cao &amp; Đối tác Ngân hàng cấp 1</span>
</div>

<div className="flex flex-col gap-1.5">
<div className="flex items-center justify-between font-body-sm">
<span className="font-title-md text-on-surface">Hộp Doanh Nghiệp Truyền Thống (Thập Cẩm Xá Xíu &amp; Trà Xanh Hạt Sen)</span>
<span className="font-data-mono text-secondary font-bold">420 Hộp (56%)</span>
</div>
<div className="w-full h-3 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-secondary rounded-full" style={{"width": "56%"}}></div>
</div>
<span className="text-body-sm text-on-surface-variant">Đối tượng: Khách hàng dự án An Phát Complex &amp; Nhà thầu xây dựng</span>
</div>

<div className="flex flex-col gap-1.5">
<div className="flex items-center justify-between font-body-sm">
<span className="font-title-md text-on-surface">Hộp Nội Bộ Tri Ân Cán Bộ Nhân Viên (4 Vị Đương Đại)</span>
<span className="font-data-mono text-tertiary font-bold">150 Hộp (20%)</span>
</div>
<div className="w-full h-3 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-tertiary rounded-full" style={{"width": "20%"}}></div>
</div>
<span className="text-body-sm text-on-surface-variant">Đối tượng: Khối văn phòng Hà Nội, Chi nhánh Đà Nẵng &amp; HCM</span>
</div>
</div>

<div className="mt-4 p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-3">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-[28px]">receipt_long</span>
<div className="flex flex-col">
<span className="font-title-md text-label-md text-on-surface">Sẵn sàng xuất file đối soát quyết toán</span>
<span className="font-body-sm text-on-surface-variant">Bao gồm bảng kê định mức chiết khấu, biên bản giao nhận 3 miền và liên hóa đơn điện tử.</span>
</div>
</div>
<button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-highest text-on-surface font-title-md text-label-md hover:bg-surface-variant transition-all shrink-0" >
<span className="material-symbols-outlined text-[18px]">table_view</span>
<span>Xuất Hồ Sơ Kế Toán (Excel / PDF)</span>
</button>
</div>
</div>

<div className="lg:col-span-4 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Điều Phối Theo Điểm Đến</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Giám sát tải trọng và tỷ lệ hoàn tất giao nhận phân khu.</p>
<div className="flex flex-col gap-3">
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
<span className="font-title-md text-label-md text-on-surface">Hà Nội (Trụ sở chính)</span>
</div>
<div className="text-right">
<span className="font-data-mono text-label-md font-bold text-on-surface">350 hộp</span>
<span className="block font-label-sm text-tertiary">100% Hoàn Thành</span>
</div>
</div>
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<span className="font-title-md text-label-md text-on-surface">Đà Nẵng (VP Sông Hàn)</span>
</div>
<div className="text-right">
<span className="font-data-mono text-label-md font-bold text-on-surface">150 hộp</span>
<span className="block font-label-sm text-secondary">Đang Vận Chuyển</span>
</div>
</div>
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-surface-variant"></span>
<span className="font-title-md text-label-md text-on-surface">TP. Hồ Chí Minh</span>
</div>
<div className="text-right">
<span className="font-data-mono text-label-md font-bold text-on-surface">250 hộp</span>
<span className="block font-label-sm text-on-surface-variant">Sẵn Sàng Tại Kho</span>
</div>
</div>
</div>
<div className="mt-2 p-space-sm rounded-lg bg-surface-bright flex flex-col gap-2">
<span className="font-title-md text-label-sm text-primary font-bold uppercase">Cam Kết B2B MoonMarket</span>
<p className="font-body-sm text-[12px] text-on-surface-variant">100% chuyến xe chuyên dụng có kiểm soát nhiệt độ thùng mát (20°C - 24°C) bảo toàn độ tươm dầu tự nhiên của lớp vỏ bánh nướng truyền thống.</p>
</div>
</div>
</div>
</div>
</div>
</div>
</main><footer className="w-full bg-surface-container-low mt-space-xl"><div className="w-full px-margin py-space-xl"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-lg mb-space-lg"><div className="lg:col-span-2 space-y-3"><div className="flex items-center gap-3"><img alt="MoonMarket B2B" className="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XeDH3ml-Oxy9w5fl0xKcYXZzLGzRPMBJAZpR8G80tab0cBtZrQ7_YfYflhLzmRN2uHc0sjIfX29rFpAto5mkXK_8CJNAc90yvMwH19nziuf_fMyXQbHwnnELW7O0Mtg7oUTPBeNuNccNI7sLjO5237vuzDzQnM78HYxZ3YuZpo2tjH0FZgBw7Woz7vXVCIGNjMsJ21mfCfp7P4n7MMkcw6U9YIFhCLwHrHNoPdUCq2mPD45CuedGPUF-0"/><span className="font-headline-sm text-headline-sm text-primary">MoonMarket B2B</span></div><p className="font-body-md text-body-md text-on-surface-variant max-w-md">Nền tảng giao dịch và đấu thầu bánh Trung Thu doanh nghiệp hàng đầu Việt Nam. Kết nối trực tiếp các đơn vị thu mua số lượng lớn với các xưởng bánh uy tín, chuẩn hóa bao bì nhận diện và tiến độ giao hàng trên toàn quốc.</p><div className="flex flex-wrap items-center gap-2 pt-2"><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-tertiary-container text-on-tertiary font-label-sm text-label-sm"><span className="material-symbols-outlined text-[16px]">verified</span>ISO 22000:2018</span><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-tertiary-container text-on-tertiary font-label-sm text-label-sm"><span className="material-symbols-outlined text-[16px]">health_and_safety</span>HACCP Certified</span><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm"><span className="material-symbols-outlined text-[16px]">draw</span>e-Contract Pháp lý</span><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm"><span className="material-symbols-outlined text-[16px]">security</span>Bảo chứng Escrow</span></div></div><div className="space-y-2"><h4 className="font-title-md text-title-md text-on-surface font-semibold">Mua sắm Doanh nghiệp</h4><ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant"><li><a className="hover:text-primary transition-colors" data-path="san-pham-co-san" href="#">Danh mục Hộp quà Sẵn kho</a></li><li><a className="hover:text-primary transition-colors" data-path="dau-thau-rfq-va-bao-gia" href="#">Tạo Yêu cầu Báo giá (RFQ)</a></li><li><a className="hover:text-primary transition-colors" data-path="tim-xuong-va-gian-hang" href="#">Mạng lưới Xưởng đạt chuẩn</a></li><li><a className="hover:text-primary transition-colors" href="#">Chính sách Đặt hộp Mẫu (Sample)</a></li><li><a className="hover:text-primary transition-colors" href="#">Bảng chiết khấu theo Số lượng</a></li></ul></div><div className="space-y-2"><h4 className="font-title-md text-title-md text-on-surface font-semibold">Nghiệp vụ Hợp đồng</h4><ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant"><li><a className="hover:text-primary transition-colors" data-path="hop-dong-va-tien-do" href="#">Ký số &amp; Quản lý Hợp đồng</a></li><li><a className="hover:text-primary transition-colors" data-path="thanh-toan-va-bao-cao" href="#">Hóa đơn VAT &amp; Chứng từ điện tử</a></li><li><a className="hover:text-primary transition-colors" href="#">Cơ chế Ký quỹ Escrow an toàn</a></li><li><a className="hover:text-primary transition-colors" href="#">Quy trình Kiểm định &amp; Nghiệm thu</a></li><li><a className="hover:text-primary transition-colors" href="#">Chính sách Đổi trả &amp; Bồi hoàn</a></li></ul></div><div className="space-y-2"><h4 className="font-title-md text-title-md text-on-surface font-semibold">Trung tâm Hỗ trợ B2B</h4><div className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant"><p className="text-on-surface font-semibold">Tổng đài Chăm sóc Khách hàng Doanh nghiệp:</p><p className="font-data-mono text-data-mono text-primary font-bold text-headline-sm">1800 6886 (Miễn phí)</p><p>Email: <span className="text-on-surface">b2b@moonmarket.vn</span></p><p>Thời gian: 08:00 - 20:00 (Thứ 2 - Thứ 7)</p><p className="font-label-sm text-label-sm text-secondary pt-1">Mùa Trung Thu 2024: Hỗ trợ khẩn cấp 24/7</p></div></div></div><div className="pt-space-md border-t border-surface-container-highest flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant"><div>© 2024 MoonMarket B2B Platform. Bản quyền thuộc về MoonMarket Corporation.</div><div className="flex items-center gap-space-md"><span>Điều khoản sử dụng B2B</span><span>Quy chế sàn thương mại điện tử</span><span>Chính sách bảo mật thông tin</span></div></div></div></footer>
    </div>
  );
}
