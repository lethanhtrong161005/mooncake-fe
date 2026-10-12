import React from 'react';

export default function ProductInformation({ onNavigate }) {
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50"><div className="bg-primary text-on-primary"><div className="max-w-7xl mx-auto px-margin h-8 flex items-center justify-between text-body-sm"><div className="flex items-center gap-space-lg"><span className="flex items-center gap-space-xs font-data-mono"><span className="material-symbols-outlined text-[15px]">call</span> Hotline Doanh nghiệp: <strong className="font-label-md text-secondary-fixed">1800 6886</strong></span><span className="hidden md:flex items-center gap-space-xs"><span className="material-symbols-outlined text-[15px]">receipt_long</span> Xuất hóa đơn VAT điện tử 100% hợp lệ</span></div><div className="flex items-center gap-space-md"><span className="hidden sm:flex items-center gap-space-xs"><span className="material-symbols-outlined text-[15px]">verified_user</span> Hợp đồng mẫu &amp; Bảo chứng ký quỹ</span><div className="flex items-center gap-space-xs cursor-pointer hover:text-secondary-fixed transition-colors"><span className="material-symbols-outlined text-[16px]">language</span><span>VN / VNĐ</span></div></div></div></div><div className="h-20 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="max-w-7xl mx-auto px-margin h-20 flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-md shrink-0"><img alt="Logo biểu trưng thương hiệu sàn giao dịch B2B Bánh Trung Thu Mooncake Marketplace: biểu tượng vầng trăng rằm thanh lịch kết hợp hoa văn khuôn bánh truyền thống dập nổi vàng kim sang trọng trên nền đỏ trầm nhã nhặn.. Brand logo. - Primary color: #991b1b
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-sm
" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1V_fR3x5E0gRCMt0OUxR4aFiB0BqkMtpf12-bPVc7FYwH3DP8_YhmUjCxjPTQQnbj1Z4NVOCpNnZrhkjl0OGUQrYdjX1vTUbbtAF-kqe-9RQs3z0CnCv8AeixyAEl02PZnMU7HxooAOZlWmwHiC7KXzLjoMIGpZqEK68HzfR4mcHFRhUQcSUEVvDtx_mnsJOmEDznf-L4TAfQBAdrBRVBKZv21qBUjWxWgxHWS-tPaEhbO3nfA2EWiWqAU" /><div className="flex flex-col"><span className="font-headline-sm text-headline-sm text-primary leading-none">MoonMarket</span><span className="font-label-sm text-label-sm text-secondary tracking-wider uppercase leading-none mt-1">B2B Enterprise Portal</span></div></div><div className="relative flex-1 max-w-md hidden lg:block"><div className="relative flex items-center"><input className="w-full bg-surface-container-low pl-10 pr-4 py-2 rounded-xl text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-inner" placeholder="Tìm kiếm nhân bánh, xưởng sản xuất, hộp quà tặng VIP..." type="text" /><span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">search</span></div></div><nav className="hidden xl:flex items-center gap-space-xs" data-active-classes="bg-primary-container text-on-primary font-title-md rounded-lg"><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="trang-chu" href="#">Trang chủ</a><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="san-pham-co-san" href="#">Sản phẩm có sẵn</a><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="tim-xuong-gian-hang" href="#">Tìm xưởng &amp; Gian hàng</a><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="bao-gia-rfq" href="#">Báo giá &amp; RFQ</a><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="bang-gia-si" href="#">Bảng giá sỉ</a></nav><div className="flex items-center gap-space-md shrink-0"><button aria-label="Thông báo đơn hàng" className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary font-label-sm text-label-sm text-on-primary leading-none">3</span></button><div className="flex items-center gap-space-sm pl-space-sm cursor-pointer group"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div className="hidden md:flex flex-col text-left"><span className="font-label-md text-label-md text-on-surface leading-tight">Nguyễn Văn An</span><span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">An Phát Corp (Buyer)</span></div><span className="material-symbols-outlined text-on-surface-variant text-[18px] group-hover:text-on-surface transition-colors hidden md:inline">expand_more</span></div></div></div></div></header><main className="w-full pt-28 bg-surface"><div className="flex flex-col w-full">

        <div className="w-full bg-surface-container-low px-margin py-3 mb-space-lg">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2">
            <nav className="flex items-center gap-space-xs text-body-sm font-body-sm text-on-surface-variant">
              <a className="hover:text-primary transition-colors flex items-center gap-1" href="#">
                <span className="material-symbols-outlined text-[16px]">home</span>Trang chủ
              </a>
              <span className="text-outline">/</span>
              <a className="hover:text-primary transition-colors" href="#">Danh mục Quà tặng Doanh nghiệp</a>
              <span className="text-outline">/</span>
              <a className="hover:text-primary transition-colors" href="#">Hộp quà Trăng Vàng</a>
              <span className="text-outline">/</span>
              <span className="text-on-surface font-title-md truncate max-w-xs md:max-w-none">Bộ Hộp Quà Trăng Vàng Dạ Nguyệt</span>
            </nav>
            <div className="flex items-center gap-space-md text-label-sm font-label-sm text-on-surface-variant">
              <span className="flex items-center gap-1 bg-surface-container-lowest px-2.5 py-1 rounded shadow-sm text-on-surface">
                <span className="material-symbols-outlined text-primary text-[15px]">inventory_2</span>
                SKU: <span className="font-data-mono font-semibold text-primary">MM-HKDN-2025</span>
              </span>
              <span className="flex items-center gap-1 text-tertiary font-medium">
                <span className="material-symbols-outlined text-[15px]">warehouse</span>
                Phôi sẵn xưởng: <strong className="font-data-mono">8.500 hộp</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-margin w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">

            <div className="lg:col-span-5 flex flex-col gap-space-md">

              <div className="relative w-full aspect-square bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm group">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Góc chụp cận cảnh bộ quà tặng bánh trung thu doanh nghiệp cao cấp Trăng Vàng Dạ Nguyệt, hộp gỗ sơn mài đỏ thẫm bóng bẩy nạm hoa văn mạ vàng tinh xảo, bên trong đặt 4 bánh nướng hoàng kim dập nổi hoa văn truyền thống, một lọ trà gốm sứ sang trọng và phụ kiện cắt bánh kim loại mạ vàng trên nền lụa vàng ánh kim ấm áp." id="main-gallery-img" src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg" />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm shadow-sm">
                    <span className="material-symbols-outlined text-[14px]">workspace_premium</span> Hộp Gỗ Sơn Mài VIP
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur text-tertiary font-label-sm text-label-sm shadow-sm">
                    <span className="material-symbols-outlined text-[13px]">speed</span> Khắc Logo 48H
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-inverse-surface/85 backdrop-blur px-2.5 py-1 rounded text-inverse-on-surface font-data-mono text-label-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">photo_camera</span> 1 / 4
                </div>
              </div>

              <div className="grid grid-cols-4 gap-space-sm">
                <button className="aspect-square rounded-lg overflow-hidden bg-surface-container-lowest shadow-sm ring-2 ring-primary p-0.5 transition-all" >
                  <img className="w-full h-full object-cover rounded" data-alt="Ảnh chính diện toàn bộ set hộp quà trung thu Trăng Vàng Dạ Nguyệt gồm hộp gỗ sơn mài nắp âm dương, 4 khuôn bánh trung thu và túi xách mỹ thuật cao cấp dập nhũ vàng son." src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg" />
                </button>
                <button className="aspect-square rounded-lg overflow-hidden bg-surface-container-lowest shadow-sm opacity-70 hover:opacity-100 p-0.5 transition-all" >
                  <img className="w-full h-full object-cover rounded" data-alt="Cận cảnh phôi kim loại đồng nguyên khối dập nổi logo doanh nghiệp công nghệ cao mạ vàng sáng bóng được gắn tinh tế trên nắp hộp gỗ sơn mài đỏ trầm sang trọng." src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg" />
                </button>
                <button className="aspect-square rounded-lg overflow-hidden bg-surface-container-lowest shadow-sm opacity-70 hover:opacity-100 p-0.5 transition-all" >
                  <img className="w-full h-full object-cover rounded" data-alt="Ảnh cận cảnh lát cắt chiếc bánh nướng thập cẩm xá xíu gà quay nghệ nhân thơm ngậy với 2 tròng đỏ trứng muối béo vàng ươm, vỏ mỏng hạt sen đậu xanh tinh khiết." src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg" />
                </button>
                <button className="aspect-square rounded-lg overflow-hidden bg-surface-container-lowest shadow-sm opacity-70 hover:opacity-100 p-0.5 transition-all" >
                  <img className="w-full h-full object-cover rounded" data-alt="Set hoàn chỉnh bao gồm túi xách quai tơ lụa cao cấp, thiệp chúc mừng thiết kế đồng bộ cho khách hàng doanh nghiệp đối tác VIP mùa trăng tròn." src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg" />
                </button>
              </div>

              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm mt-space-xs">
                <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-high">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-11 h-11 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-headline-sm">
                      <span className="material-symbols-outlined text-[24px]">storefront</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-title-md text-title-md text-on-surface">Xưởng Nghệ Nhân Đại Phát</span>
                        <span className="material-symbols-outlined text-tertiary text-[17px]" title="Xưởng đạt chứng nhận kiểm duyệt B2B">verified</span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-2">
                        <span>Hà Nội &amp; Hưng Yên</span>
                        <span>•</span>
                        <span>Hoạt động 14 năm</span>
                      </span>
                    </div>
                  </div>
                  <a className="px-3 py-1.5 rounded-lg bg-surface-container text-primary font-label-md text-label-md hover:bg-surface-container-high transition-colors" href="#">
                    Xem gian hàng
                  </a>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-space-sm text-center">
                  <div className="p-2 bg-surface-container-low rounded-lg">
                    <span className="font-headline-sm text-headline-sm text-primary font-data-mono">96/100</span>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Điểm Uy Tín B2B</p>
                  </div>
                  <div className="p-2 bg-surface-container-low rounded-lg">
                    <span className="font-headline-sm text-headline-sm text-tertiary font-data-mono">1.200+</span>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Hợp đồng Doanh nghiệp</p>
                  </div>
                  <div className="p-2 bg-surface-container-low rounded-lg">
                    <span className="font-headline-sm text-headline-sm text-secondary font-data-mono">99.4%</span>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Đúng Hẹn Giao Hàng</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-surface-container-high text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">verified_user</span>
                  <span>Bảo chứng ký quỹ ngân hàng: <strong>500.000.000đ</strong> tại Vietcombank</span>
                </div>
              </div>

              <div className="bg-secondary-fixed/30 rounded-xl p-space-md flex items-start gap-space-sm">
                <span className="material-symbols-outlined text-secondary text-[24px] mt-0.5 shrink-0">inventory</span>
                <div>
                  <h4 className="font-title-md text-title-md text-on-surface">Đăng ký Hộp Mẫu Thử Nghiệm (Sample Box)</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Dành riêng cho ban giám đốc &amp; hội đồng mua sắm nếm thử nhân bánh thực tế và kiểm tra chất lượng vỏ gỗ sơn mài thực tế trước khi ký hợp đồng lớn. Hoàn lại 100% phí mẫu khi chốt hợp đồng.
                  </p>
                  <button className="mt-space-sm inline-flex items-center gap-1.5 text-secondary font-label-md text-label-md hover:underline">
                    Đặt hộp mẫu 1 ngày có ngay (190.000đ/set) <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-space-lg">

              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-tertiary-container text-on-tertiary-container px-2.5 py-0.5 rounded font-label-sm text-label-sm uppercase">Bộ Sưu Tập Doanh Nghiệp 2025</span>
                  <span className="bg-surface-container-high text-on-surface px-2.5 py-0.5 rounded font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">military_tech</span> Tiêu chuẩn Nghệ nhân
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Bộ Hộp Quà Trung Thu Trăng Vàng Dạ Nguyệt (Set 4 - 6 Bánh Nghệ Nhân)
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                  Thiết kế sơn mài nghệ thuật kết hợp hoa văn trăng rằm dạ nguyệt vương giả. Tùy biến khắc logo kim loại nổi, thẻ quà cá nhân hóa từng đối tác và định vị thương hiệu đẳng cấp cho các tập đoàn tài chính, bất động sản, ngân hàng.
                </p>
              </div>

              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                <div>
                  <div className="flex items-baseline gap-space-sm">
                    <span className="font-headline-lg text-headline-lg text-primary font-data-mono" id="display-unit-price">405.000đ</span>
                    <span className="font-body-md text-body-md text-on-surface-variant line-through font-data-mono">450.000đ</span>
                    <span className="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold" id="display-discount-badge">-10% cho 120 hộp</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
                    Đơn giá sỉ động theo số lượng • Chưa bao gồm 8% VAT
                  </p>
                </div>
                <div className="bg-surface-container-low px-space-md py-2 rounded-lg text-right">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">Thời gian bàn giao</span>
                  <span className="font-title-md text-title-md text-on-surface flex items-center justify-end gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-tertiary text-[18px]">local_shipping</span> 3 - 5 ngày làm việc
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-space-md bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
                <h2 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-label-sm flex items-center justify-center">1</span>
                  Tùy biến quy cách &amp; biến thể B2B
                </h2>

                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface flex justify-between items-center">
                    <span>Bước 1: Quy cách hộp quà tặng</span>
                    <span className="text-body-sm text-primary font-medium" id="selected-spec-text">Set 4 bánh tiêu chuẩn (150g/bánh)</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                    <button className="spec-btn p-space-sm rounded-lg bg-surface-container text-left transition-all ring-2 ring-primary bg-primary-fixed/20" type="button">
                      <span className="font-title-md text-title-md text-on-surface block">Set 4 Bánh Chuẩn</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">4 bánh 150g + Khay gỗ lụa</span>
                      <span className="font-data-mono text-label-sm text-primary block mt-1">Giá chuẩn gốc</span>
                    </button>
                    <button className="spec-btn p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container text-left transition-all" type="button">
                      <span className="font-title-md text-title-md text-on-surface block">Set 6 Bánh + Trà Cổ Thụ</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">6 bánh 120g + Trà Shan Tuyết</span>
                      <span className="font-data-mono text-label-sm text-secondary block mt-1">+75.000đ / hộp</span>
                    </button>
                    <button className="spec-btn p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container text-left transition-all" type="button">
                      <span className="font-title-md text-title-md text-on-surface block">Hộp VIP + Vang Đỏ</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">4 bánh 180g + Vang Pháp 750ml</span>
                      <span className="font-data-mono text-label-sm text-secondary block mt-1">+190.000đ / hộp</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <label className="font-label-md text-label-md text-on-surface flex justify-between items-center">
                    <span>Bước 2: Chất liệu vỏ bánh nghệ nhân</span>
                    <span className="text-body-sm text-on-surface-variant" id="selected-crust-text">Nướng truyền thống hoàng kim</span>
                  </label>
                  <div className="grid grid-cols-3 gap-space-sm">
                    <button className="crust-btn py-2 px-3 rounded-lg text-center bg-primary-fixed/20 ring-2 ring-primary text-on-surface transition-all font-label-md text-label-md" type="button">
                      Nướng truyền thống
                    </button>
                    <button className="crust-btn py-2 px-3 rounded-lg text-center bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-all font-label-md text-label-md" type="button">
                      Dẻo hoa bưởi thơm
                    </button>
                    <button className="crust-btn py-2 px-3 rounded-lg text-center bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-all font-label-md text-label-md" type="button">
                      Snow-skin ít ngọt
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <label className="font-label-md text-label-md text-on-surface flex justify-between items-center">
                    <span>Bước 3: Tỷ lệ phối nhân bánh nghệ nhân trong mỗi hộp</span>
                    <span className="text-body-sm text-tertiary font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">tune</span> Đã phân bổ đủ 4 chiếc/hộp
                    </span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm bg-surface-container-low p-space-sm rounded-lg">
                    <div className="bg-surface-container-lowest p-2 rounded shadow-sm flex flex-col justify-between">
                      <span className="font-label-sm text-label-sm text-on-surface truncate" title="Thập cẩm xá xíu gà quay">Thập Cẩm Gà Quay</span>
                      <div className="flex items-center justify-between mt-2">
                        <button className="w-6 h-6 rounded bg-surface-container text-on-surface flex items-center justify-center font-bold text-sm" type="button">-</button>
                        <span className="font-data-mono font-bold text-primary" id="f1-val">1</span>
                        <button className="w-6 h-6 rounded bg-surface-container text-on-surface flex items-center justify-center font-bold text-sm" type="button">+</button>
                      </div>
                    </div>
                    <div className="bg-surface-container-lowest p-2 rounded shadow-sm flex flex-col justify-between">
                      <span className="font-label-sm text-label-sm text-on-surface truncate" title="Hạt sen trà xanh Long Tỉnh">Sen Trà Xanh Cổ</span>
                      <div className="flex items-center justify-between mt-2">
                        <button className="w-6 h-6 rounded bg-surface-container text-on-surface flex items-center justify-center font-bold text-sm" type="button">-</button>
                        <span className="font-data-mono font-bold text-primary" id="f2-val">1</span>
                        <button className="w-6 h-6 rounded bg-surface-container text-on-surface flex items-center justify-center font-bold text-sm" type="button">+</button>
                      </div>
                    </div>
                    <div className="bg-surface-container-lowest p-2 rounded shadow-sm flex flex-col justify-between">
                      <span className="font-label-sm text-label-sm text-on-surface truncate" title="Đậu xanh 2 trứng muối">Đậu Xanh 2 Trứng</span>
                      <div className="flex items-center justify-between mt-2">
                        <button className="w-6 h-6 rounded bg-surface-container text-on-surface flex items-center justify-center font-bold text-sm" type="button">-</button>
                        <span className="font-data-mono font-bold text-primary" id="f3-val">1</span>
                        <button className="w-6 h-6 rounded bg-surface-container text-on-surface flex items-center justify-center font-bold text-sm" type="button">+</button>
                      </div>
                    </div>
                    <div className="bg-surface-container-lowest p-2 rounded shadow-sm flex flex-col justify-between">
                      <span className="font-label-sm text-label-sm text-on-surface truncate" title="Lava sầu riêng Musang King">Lava Sầu Riêng</span>
                      <div className="flex items-center justify-between mt-2">
                        <button className="w-6 h-6 rounded bg-surface-container text-on-surface flex items-center justify-center font-bold text-sm" type="button">-</button>
                        <span className="font-data-mono font-bold text-primary" id="f4-val">1</span>
                        <button className="w-6 h-6 rounded bg-surface-container text-on-surface flex items-center justify-center font-bold text-sm" type="button">+</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-surface-container-high flex flex-col gap-space-sm">
                  <div className="flex items-start justify-between gap-4">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input defaultChecked className="mt-1 accent-primary w-4 h-4 rounded" id="logo-branding-check" type="checkbox" />
                      <div>
                        <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                          Gia công dập nhũ kim loại Logo doanh nghiệp &amp; In thiệp chúc tết
                          <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded">Miễn phí ≥ 100 hộp</span>
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          Hỗ trợ dựng mô hình 3D duyệt mẫu trong 4 giờ. Miễn phí đúc khuôn đồng phôi kim loại dập nóng.
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-space-sm bg-surface-container-low p-space-sm rounded-lg">
                    <div className="w-full sm:w-auto flex-1 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[22px]">cloud_upload</span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-surface font-medium">Tải lên Logo Doanh nghiệp (.AI, .EPS, .PDF, .PNG vector)</span>
                        <span className="text-body-sm text-on-surface-variant" id="file-status">anphat_holdings_logo_vector_2025.ai (2.4 MB) - Đã sẵn sàng</span>
                      </div>
                    </div>
                    <button className="w-full sm:w-auto px-3 py-1.5 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-label-md text-label-md shadow-sm shrink-0 flex items-center justify-center gap-1" type="button">
                      <span className="material-symbols-outlined text-[16px]">attach_file</span> Đổi tệp logo
                    </button>
                    <input className="hidden" id="logo-file-input" type="file" />
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-sm gap-2">
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-[20px]">equalizer</span>
                      Bảng Giá Chiết Khấu Sỉ Bậc Thang (Tiered Matrix)
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Chiết khấu tự động trừ thẳng vào hợp đồng kinh tế theo mốc số lượng</p>
                  </div>
                  <span className="text-label-sm font-label-sm bg-surface-container text-on-surface px-2.5 py-1 rounded">MOQ: 50 hộp</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-space-xs pt-space-xs" id="tier-container">

                  <div className="tier-card p-space-sm rounded-lg bg-surface-container-low flex flex-col text-center transition-all" id="tier-card-1">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Bậc 1</span>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">50 - 99 hộp</span>
                    <span className="font-title-md text-title-md text-on-surface font-data-mono mt-1">427.500đ</span>
                    <span className="font-label-sm text-label-sm text-secondary font-bold mt-0.5">Giảm -5%</span>
                  </div>

                  <div className="tier-card p-space-sm rounded-lg bg-primary-fixed/30 ring-2 ring-primary flex flex-col text-center transition-all shadow-sm" id="tier-card-2">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                      <span className="font-label-sm text-label-sm text-primary uppercase font-bold">Bậc 2 (Đang chọn)</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface font-semibold">100 - 299 hộp</span>
                    <span className="font-title-md text-title-md text-primary font-bold font-data-mono mt-1">405.000đ</span>
                    <span className="font-label-sm text-label-sm text-primary font-bold mt-0.5">Giảm -10%</span>
                  </div>

                  <div className="tier-card p-space-sm rounded-lg bg-surface-container-low flex flex-col text-center transition-all" id="tier-card-3">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Bậc 3</span>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">300 - 499 hộp</span>
                    <span className="font-title-md text-title-md text-on-surface font-data-mono mt-1">360.000đ</span>
                    <span className="font-label-sm text-label-sm text-secondary font-bold mt-0.5">Giảm -20%</span>
                  </div>

                  <div className="tier-card p-space-sm rounded-lg bg-surface-container-low flex flex-col text-center transition-all" id="tier-card-4">
                    <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Bậc VIP</span>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">≥ 500 hộp</span>
                    <span className="font-title-md text-title-md text-on-surface font-data-mono mt-1">315.000đ</span>
                    <span className="font-label-sm text-label-sm text-primary font-bold mt-0.5">Giảm -30%</span>
                  </div>
                </div>

                <div className="mt-space-md p-space-sm rounded-lg bg-secondary-fixed/20 flex items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">tips_and_updates</span>
                    <p className="font-body-sm text-body-sm text-on-surface" id="tier-incentive-msg">
                      Bạn đang đặt <strong className="font-data-mono">120 hộp</strong> (-10%). Đặt thêm <strong className="text-primary font-data-mono">180 hộp</strong> để nhận mức chiết khấu Bậc 3 (-20%)!
                    </p>
                  </div>
                  <button className="shrink-0 px-2.5 py-1 bg-surface-container-lowest rounded text-secondary font-label-md text-label-md hover:bg-secondary-fixed transition-colors" type="button">
                    Nâng lên 300 hộp
                  </button>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                  <div>
                    <label className="font-label-md text-label-md text-on-surface block">Số lượng hộp quà đặt sản xuất:</label>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Tối thiểu: 50 hộp • Bội số đóng thùng: 10 hộp/thùng</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-bold text-lg flex items-center justify-center" type="button">-</button>
                    <input className="w-24 h-10 text-center font-data-mono font-bold text-title-md bg-surface-container-low rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" id="bulk-qty-input" min="50" step="10" type="number" value="120" />
                    <button className="w-10 h-10 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-bold text-lg flex items-center justify-center" type="button">+</button>
                  </div>
                </div>

                <div className="pt-space-md border-t border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant block">Tổng giá trị tạm tính (Chưa VAT):</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display-hero text-headline-lg md:text-display-hero text-primary font-data-mono font-bold" id="total-estimation-price">48.600.000đ</span>
                      <span className="font-body-sm text-body-sm text-tertiary font-medium flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[15px]">local_shipping</span> Miễn phí vận chuyển nội thành Hà Nội &amp; TP.HCM
                      </span>
                    </div>
                  </div>
                  <div className="text-right sm:text-right">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Hóa đơn VAT điện tử:</span>
                    <span className="font-data-mono font-medium text-on-surface block" id="vat-calc">+3.888.000đ (8%)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">

                  <button className="w-full bg-primary hover:bg-primary-container text-on-primary py-3.5 px-space-md rounded-lg font-title-md text-title-md shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">shopping_cart_checkout</span>
                    <span>Đặt hàng ngay</span>
                  </button>

                  <button className="w-full bg-surface-container hover:bg-surface-container-high text-on-surface py-3.5 px-space-md rounded-lg font-title-md text-title-md transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">box</span>
                    <span>Đặt Hộp Mẫu Thử</span>
                  </button>

                  <button className="w-full bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim py-3.5 px-space-md rounded-lg font-title-md text-title-md transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">request_quote</span>
                    <span>Yêu cầu Báo Giá Sỉ (RFQ)</span>
                  </button>
                </div>
                <div className="flex items-center justify-center gap-space-lg text-body-sm text-on-surface-variant pt-2">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">gavel</span> Hợp đồng kinh tế bảo đảm
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span> Thanh toán bảo chứng ký quỹ
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">credit_card</span> Hỗ trợ công nợ 30 ngày (cho VIP)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-surface-container-low mt-space-xl py-space-xl">
          <div className="max-w-7xl mx-auto px-margin">
            <div className="flex flex-col gap-space-lg">
              <div>
                <span className="text-secondary font-label-md text-label-md uppercase tracking-wider font-semibold">Quy chuẩn chất lượng &amp; Hồ sơ thầu</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">Thông số kỹ thuật sản phẩm &amp; Cam kết pháp lý hợp đồng</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">

                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-sm">
                  <div className="flex items-center gap-2 text-primary font-title-md text-title-md">
                    <span className="material-symbols-outlined">nutrition</span>
                    <h3>Đặc tính kỹ thuật &amp; Hạn dùng</h3>
                  </div>
                  <ul className="flex flex-col gap-2.5 text-body-sm text-on-surface-variant pt-2">
                    <li className="flex justify-between pb-1.5 border-b border-surface-container-high">
                      <span>Hạn sử dụng bánh nướng:</span>
                      <strong className="text-on-surface">45 ngày kể từ ngày đóng gói</strong>
                    </li>
                    <li className="flex justify-between pb-1.5 border-b border-surface-container-high">
                      <span>Hạn dùng bánh dẻo / Snow-skin:</span>
                      <strong className="text-on-surface">25 ngày (bảo quản mát)</strong>
                    </li>
                    <li className="flex justify-between pb-1.5 border-b border-surface-container-high">
                      <span>Trọng lượng chuẩn:</span>
                      <strong className="text-on-surface">150g - 180g (±5g) / chiếc</strong>
                    </li>
                    <li className="flex justify-between pb-1.5 border-b border-surface-container-high">
                      <span>Quy chuẩn đóng gói:</span>
                      <strong className="text-on-surface">Khí Ni-tơ &amp; Túi hút ẩm y tế O2</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Độ ngọt (Brix scale):</span>
                      <strong className="text-tertiary">38 - 42% (Ít ngọt công sở)</strong>
                    </li>
                  </ul>
                </div>

                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-sm">
                  <div className="flex items-center gap-2 text-secondary font-title-md text-title-md">
                    <span className="material-symbols-outlined">pallet</span>
                    <h3>Quy chuẩn bao bì &amp; Sơn mài</h3>
                  </div>
                  <ul className="flex flex-col gap-2.5 text-body-sm text-on-surface-variant pt-2">
                    <li className="flex justify-between pb-1.5 border-b border-surface-container-high">
                      <span>Chất liệu vỏ hộp:</span>
                      <strong className="text-on-surface">Gỗ MDF nguyên khối sơn mài 5 lớp</strong>
                    </li>
                    <li className="flex justify-between pb-1.5 border-b border-surface-container-high">
                      <span>Kích thước phủ bì:</span>
                      <strong className="text-on-surface">36cm x 36cm x 9.5cm</strong>
                    </li>
                    <li className="flex justify-between pb-1.5 border-b border-surface-container-high">
                      <span>Quy cách in logo:</span>
                      <strong className="text-on-surface">Mạ đồng kim loại hoặc khắc Laser chìm</strong>
                    </li>
                    <li className="flex justify-between pb-1.5 border-b border-surface-container-high">
                      <span>Túi giấy đi kèm:</span>
                      <strong className="text-on-surface">Giấy Ivory 350gsm cán mờ quai lụa</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Chịu lực vận chuyển:</span>
                      <strong className="text-on-surface">Thùng carton sóng 5 lớp gia cố</strong>
                    </li>
                  </ul>
                </div>

                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-sm">
                  <div className="flex items-center gap-2 text-tertiary font-title-md text-title-md">
                    <span className="material-symbols-outlined">policy</span>
                    <h3>Cam kết pháp lý &amp; SLA giao nhận</h3>
                  </div>
                  <ul className="flex flex-col gap-2.5 text-body-sm text-on-surface-variant pt-2">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0">verified</span>
                      <span><strong>Chứng nhận ATVSTP:</strong> Đầy đủ chứng chỉ ISO 22000:2018 và HACCP còn hiệu lực của Bộ Y Tế.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0">timer_off</span>
                      <span><strong>Phạt giao trễ:</strong> Cam kết bồi thường 1%/ngày trên tổng giá trị đơn nếu trễ hạn giao hẹn trước Rằm.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0">published_with_changes</span>
                      <span><strong>Đổi trả 100%:</strong> Đổi mới miễn phí trong vòng 24 giờ nếu có sự cố nứt vỡ hộp hoặc xì bao bì bảo quản.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-secondary text-[18px] shrink-0">receipt</span>
                      <span><strong>Hóa đơn VAT:</strong> Phát hành hóa đơn điện tử hợp lệ ngay trong ngày giao hàng đợt 1.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-margin w-full py-space-xl">
          <div className="flex flex-col gap-space-lg">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-sm border-b border-surface-container-high">
              <div>
                <span className="text-primary font-label-md text-label-md uppercase tracking-wider font-semibold">Khảo sát chất lượng</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">Đánh giá từ các Trưởng ban Thu mua Doanh nghiệp</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">100% đánh giá từ các chuyên viên phụ trách quà tặng đã ký kết hợp đồng và nghiệm thu</p>
              </div>
              <div className="flex items-center gap-space-md">
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <span className="material-symbols-outlined text-secondary text-[24px]" style={{ "fontVariationSettings": "'FILL' 1" }}>star</span>
                    <span className="font-display-hero text-headline-md md:text-headline-lg font-bold text-on-surface font-data-mono">4.9</span>
                    <span className="text-body-sm text-on-surface-variant font-data-mono">/ 5.0</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Dựa trên 342 doanh nghiệp đã mua sỉ</span>
                </div>
                <button className="bg-surface-container hover:bg-surface-container-high text-on-surface px-space-md py-2.5 rounded-lg font-label-md text-label-md flex items-center gap-1.5 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">rate_review</span> Viết nhận xét
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center bg-surface-container-lowest p-space-md rounded-xl shadow-sm">

              <div className="lg:col-span-4 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-body-sm">
                  <span className="font-data-mono w-10 text-on-surface-variant">5 sao</span>
                  <div className="flex-1 h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ "width": "92%" }}></div>
                  </div>
                  <span className="font-data-mono w-10 text-right text-on-surface-variant">92%</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm">
                  <span className="font-data-mono w-10 text-on-surface-variant">4 sao</span>
                  <div className="flex-1 h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ "width": "7%" }}></div>
                  </div>
                  <span className="font-data-mono w-10 text-right text-on-surface-variant">7%</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm">
                  <span className="font-data-mono w-10 text-on-surface-variant">3 sao</span>
                  <div className="flex-1 h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ "width": "1%" }}></div>
                  </div>
                  <span className="font-data-mono w-10 text-right text-on-surface-variant">1%</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm">
                  <span className="font-data-mono w-10 text-on-surface-variant">2 sao</span>
                  <div className="flex-1 h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ "width": "0%" }}></div>
                  </div>
                  <span className="font-data-mono w-10 text-right text-on-surface-variant">0%</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm">
                  <span className="font-data-mono w-10 text-on-surface-variant">1 sao</span>
                  <div className="flex-1 h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ "width": "0%" }}></div>
                  </div>
                  <span className="font-data-mono w-10 text-right text-on-surface-variant">0%</span>
                </div>
              </div>

              <div className="lg:col-span-8 flex flex-wrap gap-2">
                <button className="px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md">Tất cả (342)</button>
                <button className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">photo_library</span> Có hình ảnh thực tế (128)
                </button>
                <button className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md">Đơn vị &gt; 300 hộp (84)</button>
                <button className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md">Khắc Logo Doanh Nghiệp (195)</button>
                <button className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md">Kèm Rượu Vang VIP (46)</button>
              </div>
            </div>

            <div className="flex flex-col gap-space-md">

              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary font-headline-sm flex items-center justify-center">
                      TH
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-title-md text-title-md text-on-surface">Trần Hoàng Mai</span>
                        <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">check_circle</span> Đã mua 450 hộp (Bậc 3)
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Trưởng phòng Mua hàng - Tập đoàn Tài chính MB Capital</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-secondary">
                    <span className="material-symbols-outlined text-[18px]" style={{ "fontVariationSettings": "'FILL' 1, 'wght' 400" }}><button className="flex items-center gap-space-sm bg-primary text-on-primary px-space-md py-3 rounded-full shadow-[0_4px_16px_-2px_rgba(120,113,108,0.25),0_2px_6px_-1px_rgba(153,27,27,0.2)] hover:bg-primary-container transition-all group"><span className="material-symbols-outlined text-[20px] text-secondary-fixed group-hover:scale-110 transition-transform">support_agent</span><div className="flex flex-col text-left"><span className="font-label-md text-label-md leading-none text-white">Trợ lý AI Trăng Vàng</span><span className="font-label-sm text-label-sm text-on-primary-container leading-none mt-1">Báo giá tức thì 24/7</span></div><span className="flex h-2 w-2 rounded-full bg-tertiary-fixed ml-1 animate-pulse"></span></button><footer className="w-full bg-surface-container-low mt-space-xl shadow-[0_-1px_8px_rgba(0,0,0,0.03)]"><div className="max-w-7xl mx-auto px-margin pt-space-xl pb-space-lg"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-lg"><div className="lg:col-span-2 flex flex-col gap-space-sm"><div className="flex items-center gap-space-sm"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">bakery_dining</span></div><span className="font-headline-sm text-headline-sm text-primary">MoonMarket B2B</span></div><p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mt-space-xs">Sàn giao dịch thương mại điện tử chuyên biệt kết nối doanh nghiệp mua sỉ bánh trung thu với các xưởng làm bánh nghệ nhân và nhà sản xuất đạt chứng nhận an toàn thực phẩm trên toàn quốc.</p><div className="flex flex-wrap gap-space-xs mt-space-sm"><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm"><span className="material-symbols-outlined text-[14px]">verified</span> HACCP / ISO 22000</span><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm"><span className="material-symbols-outlined text-[14px]">gavel</span> Hợp đồng điện tử FPT.eContract</span><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm"><span className="material-symbols-outlined text-[14px]">account_balance</span> Ký quỹ bảo chứng ngân hàng</span></div></div><div className="flex flex-col gap-space-xs"><span className="font-title-md text-title-md text-on-surface mb-2">Dành cho Doanh Nghiệp</span><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" data-path="san-pham-co-san" href="#">Danh mục quà tặng doanh nghiệp</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" data-path="bao-gia-rfq" href="#">Gửi yêu cầu báo giá (RFQ)</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" data-path="bang-gia-si" href="#">Chính sách chiết khấu theo số lượng</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Đăng ký gửi hộp mẫu thử (Sample Box)</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Gia công in logo &amp; khắc hộp gỗ</a></div><div className="flex flex-col gap-space-xs"><span className="font-title-md text-title-md text-on-surface mb-2">Dành cho Nhà Xưởng</span><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" data-path="tim-xuong-gian-hang" href="#">Mở gian hàng cung ứng</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Quy chuẩn kiểm định chất lượng</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Đấu thầu đơn hàng lớn (Bulk Bidding)</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Quy định giao hàng &amp; Logistics bảo quản</a></div><div className="flex flex-col gap-space-xs"><span className="font-title-md text-title-md text-on-surface mb-2">Hỗ trợ &amp; Pháp lý</span><p className="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-1 py-1"><span className="material-symbols-outlined text-[16px] text-primary shrink-0">headset_mic</span> CSKH B2B: 1800 6886 (8h - 21h)</p><p className="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-1 py-1"><span className="material-symbols-outlined text-[16px] text-primary shrink-0">mail</span> corporate@moonmarket.vn</p><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Chính sách bảo mật &amp; thanh toán ký quỹ</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Điều khoản sử dụng sàn TMĐT B2B</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Quy chuẩn kiểm nghiệm ATVSTP</a></div></div><div className="mt-space-lg pt-space-md flex flex-col md:flex-row items-center justify-between text-body-sm font-body-sm text-on-surface-variant gap-space-sm"><p>© 2024 MoonMarket B2B Vietnam Co., Ltd. Bảo lưu mọi quyền.</p><div className="flex items-center gap-space-md"><span className="flex items-center gap-1 font-label-sm"><span className="material-symbols-outlined text-[15px] text-tertiary">shield_lock</span> Giao dịch an toàn 100% qua Escrow</span><span className="font-label-sm text-on-surface-variant/80">Mã số thuế: 0109886886 cấp bởi Sở Kế Hoạch &amp; Đầu Tư TP. Hà Nội</span></div></div></div></footer></span></div></div></div></div></div></div></div></main>
    </div>
  );
}
