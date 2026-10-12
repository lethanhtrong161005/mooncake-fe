import React from 'react';

export default function DeliverManage({ onNavigate }) {
  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-20 w-full px-margin flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-lg"><div className="flex items-center gap-space-sm"><div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary font-headline-md font-bold">M</div><div className="flex flex-col"><div className="flex items-center gap-space-xs"><span className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">MoonMarket</span><span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">B2B Hub</span></div><span className="font-label-sm text-label-sm text-on-surface-variant">Cổng Đối Tác Xưởng Bánh</span></div></div><div className="hidden xl:flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-xs rounded-full"><div className="flex items-center gap-space-xs"><span className="w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse"></span><span className="font-label-sm text-label-sm font-semibold text-on-surface">Đang mở bán</span></div><span className="text-outline-variant font-body-sm">|</span><div className="flex items-center gap-1 text-tertiary font-label-sm text-label-sm font-semibold"><span className="material-symbols-outlined text-[16px]">verified</span><span>Đối tác Vàng (98/100)</span></div></div></div><div className="hidden md:flex flex-1 max-w-md items-center bg-surface-container-low px-space-md py-space-xs rounded-lg"><span className="material-symbols-outlined text-outline text-[20px] mr-space-xs">search</span><input className="bg-transparent w-full text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none" placeholder="Tra cứu mã đơn B2B, SKU bánh, phiên RFQ..." type="text"/></div><div className="flex items-center gap-space-md"><div className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"><span className="material-symbols-outlined text-on-surface-variant text-[22px]">notifications</span><span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-on-primary text-[10px] font-bold rounded-full flex items-center justify-center">5</span></div><div className="flex items-center gap-space-sm pl-space-sm"><div className="hidden lg:flex flex-col text-right"><span className="font-label-md text-label-md font-semibold text-on-surface">Xưởng Tràng An Bakery</span><span className="font-label-sm text-label-sm text-on-surface-variant">Admin: Trần Đức Thắng</span></div><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></div><div className="w-full px-margin bg-surface-container-lowest"><nav className="flex items-center gap-space-xs overflow-x-auto py-space-xs" data-active-classes="bg-primary-container text-on-primary font-semibold shadow-sm"><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="dashboard-doanh-so" href="#">Dashboard & Doanh số</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="san-pham-khuyen-mai" href="#">Sản phẩm & Khuyến mãi (Bậc thang)</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="don-hang-dong-goi-b2b" href="#">Đơn hàng & Đóng gói B2B</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="dau-thau-rfq-bao-gia" href="#">Đấu thầu RFQ & Báo giá</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="hop-dong-milestone" href="#">Hợp đồng & Milestone</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="giao-van-vi-escrow" href="#">Giao vận & Ví Escrow</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="cai-dat-gian-hang" href="#">Cài đặt gian hàng</a></nav></div></header><main className="w-full pt-20 bg-surface min-h-screen"><div className="flex flex-col w-full">

<section className="w-full px-margin py-space-md bg-surface-container-low">
<div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-0.5 rounded bg-tertiary/10 text-tertiary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
            B2B Logistics & Escrow Settlement
          </span>
<span className="text-on-surface-variant font-label-sm text-label-sm">|</span>
<span className="font-data-mono text-data-mono text-on-surface-variant">HĐ Lô Hàng: HĐ-2025-00892</span>
</div>
<h1 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
          Quản Lý Giao Hàng Đa Điểm, Xác Minh PoD & Ví Thanh Toán Escrow
        </h1>
<p className="font-body-sm text-body-sm text-on-surface-variant">
          Theo dõi hành trình xe lạnh chuyên dụng, quản lý tài liệu PoD có chữ ký số pháp lý và đối soát giải ngân cọc tự động qua hợp đồng thông minh.
        </p>
</div>

<div className="flex items-center gap-space-sm bg-surface-container-lowest p-space-sm rounded-xl shadow-sm">
<div className="w-10 h-10 rounded-lg bg-tertiary-container flex items-center justify-center text-on-tertiary">
<span className="material-symbols-outlined text-[22px]">verified_user</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Bảo Lãnh Escrow 100%</span>
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md font-bold text-tertiary">Đã Ký Quỹ & Khóa Vốn</span>
<span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
</div>
</div>
</div>
</div>
</section>

<div className="w-full px-margin bg-surface sticky top-20 z-40">
<div className="max-w-7xl mx-auto flex items-center justify-between py-space-sm">
<div className="flex items-center gap-space-xs bg-surface-container-high p-1 rounded-xl">
<button className="flex items-center gap-space-xs px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-all bg-primary-container text-on-primary font-semibold shadow-sm" id="tab-logistics-btn" >
<span className="material-symbols-outlined text-[18px]">local_shipping</span>
<span>Quản lý Vận chuyển & Thư viện Ảnh PoD (#19, #20)</span>
<span className="w-5 h-5 rounded-full bg-white/20 text-on-primary text-[11px] font-bold flex items-center justify-center ml-1">3</span>
</button>
<button className="flex items-center gap-space-xs px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all" id="tab-escrow-btn" >
<span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
<span>Ví Doanh Thu & Dòng Tiền Escrow (#25)</span>
<span className="px-1.5 py-0.5 rounded text-[10px] bg-secondary-container text-on-secondary-container font-bold ml-1">345.5M</span>
</button>
</div>
<div className="hidden md:flex items-center gap-space-sm">
<button className="px-space-sm py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1 transition-colors" >
<span className="material-symbols-outlined text-[16px]">print</span>
          In Vận Đơn & Biên Bản
        </button>
<span className="text-outline-variant font-label-sm text-label-sm">HĐ: An Phát Corp (1.200 Hộp)</span>
</div>
</div>
</div>

<div className="w-full px-margin py-space-lg">
<div className="max-w-7xl mx-auto flex flex-col gap-space-xl">

<section className="flex flex-col gap-space-xl" id="panel-logistics">

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Cấu Hình Logistics Đa Điểm (#19)</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Chế độ vận hành & Điều phối vận chuyển</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Chọn đơn vị vận chuyển chịu trách nhiệm bảo quản nhiệt độ bánh tươi tiêu chuẩn (22°C - 26°C).</p>
</div>
<div className="flex items-center bg-surface-container-low p-1 rounded-xl">
<label className="cursor-pointer">
<input className="peer sr-only" name="dispatch_mode"  type="radio" value="workshop"/>
<span className="px-space-md py-space-xs rounded-lg font-label-md text-label-md block peer-checked:bg-surface-container-lowest peer-checked:text-on-surface peer-checked:shadow-sm text-on-surface-variant font-medium transition-all">
                  Tự vận chuyển (Xưởng điều phối xe)
                </span>
</label>
<label className="cursor-pointer">
<input defaultChecked className="peer sr-only" name="dispatch_mode"  type="radio" value="platform"/>
<span className="px-space-md py-space-xs rounded-lg font-label-md text-label-md block peer-checked:bg-primary-container peer-checked:text-on-primary peer-checked:font-semibold peer-checked:shadow-sm text-on-surface-variant transition-all flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px]">ac_unit</span>
                  MoonMarket Cold-Chain Express
                </span>
</label>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md" id="cold-chain-info">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-xl bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[28px]">ac_unit</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<span className="font-title-md text-title-md font-semibold text-on-surface">Đội Xe Lạnh Kiểm Soát Nhiệt 24/7 Của Nền Tảng</span>
<span className="px-space-xs py-0.5 rounded bg-tertiary/15 text-tertiary font-label-sm text-label-sm font-semibold">Tự động gắn mã Sensor IoT</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                  Cảm biến đo ẩm độ &lt; 60% và nhiệt độ ổn định 24°C ghi nhận dữ liệu liên tục mỗi 30 phút theo chuẩn bảo quản bánh nướng Thập Cẩm Bát Bửu & Trà Xanh Hạt Sen.
                </p>
</div>
</div>
<div className="flex flex-col md:items-end text-left md:text-right shrink-0">
<span className="font-label-sm text-label-sm text-on-surface-variant">Bảo hiểm va đập & trễ hạn:</span>
<span className="font-title-md text-title-md font-bold text-primary">Đền bù 100% giá trị lô</span>
</div>
</div>
</div>

<div className="flex flex-col gap-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div className="flex items-center gap-space-xs">
<h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Hành Trình 3 Chuyến Giao Đa Điểm</h2>
<span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-data-mono text-data-mono font-semibold">HĐ-2025-00892</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Tổng số lượng hợp đồng: <strong className="text-on-surface font-semibold">1.200 Hộp quà doanh nghiệp</strong></span>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between gap-space-md relative overflow-hidden">
<div className="absolute top-0 right-0 w-24 h-24 bg-tertiary/5 rounded-bl-full pointer-events-none"></div>
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="px-space-xs py-0.5 rounded bg-tertiary/10 text-tertiary font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">check_circle</span> ĐÃ GIAO THÀNH CÔNG
                  </span>
<span className="font-data-mono text-data-mono text-on-surface-variant font-semibold">Chuyến 01 / 03</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">Trụ sở Hà Nội</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Tòa nhà Keangnam Landmark 72, Mễ Trì, Nam Từ Liêm</span>
</div>
<div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1">
<div className="flex justify-between items-center text-body-sm">
<span className="text-on-surface-variant">Số lượng giao:</span>
<strong className="font-semibold text-on-surface">600 Hộp (Mẫu Dạ Nguyệt)</strong>
</div>
<div className="flex justify-between items-center text-body-sm">
<span className="text-on-surface-variant">Mã vận đơn:</span>
<span className="font-data-mono text-data-mono font-semibold text-primary">MM-LOG-HN7709</span>
</div>
<div className="flex justify-between items-center text-body-sm">
<span className="text-on-surface-variant">Thời gian nhận:</span>
<span className="font-body-sm text-body-sm text-tertiary font-medium">14/08/2025 15:45</span>
</div>
</div>

<div className="p-space-xs rounded bg-surface-container flex items-center justify-between text-body-sm">
<div className="flex items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-tertiary">task_alt</span>
<span>Biên bản PoD:</span>
</div>
<span className="font-label-sm text-label-sm text-tertiary font-semibold">Đã xác nhận & Ký mộc đỏ</span>
</div>
</div>
<div className="flex items-center justify-between pt-space-xs">
<a className="text-primary hover:text-primary-container font-label-sm text-label-sm font-semibold flex items-center gap-1" href="#pod-gallery">
                  Xem 3 ảnh PoD thực tế <span className="material-symbols-outlined text-[16px]">south</span>
</a>
<span className="font-data-mono text-data-mono text-on-surface-variant">Xe: 29C-881.92</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between gap-space-md relative overflow-hidden">
<div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-full pointer-events-none"></div>
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="px-space-xs py-0.5 rounded bg-secondary-container/20 text-secondary font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">local_shipping</span> ĐANG VẬN CHUYỂN
                  </span>
<span className="font-data-mono text-data-mono text-on-surface-variant font-semibold">Chuyến 02 / 03</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">Chi nhánh Đà Nẵng</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Đường Nguyễn Văn Linh, P. Hải Châu 1, Hải Châu</span>
</div>
<div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1">
<div className="flex justify-between items-center text-body-sm">
<span className="text-on-surface-variant">Số lượng giao:</span>
<strong className="font-semibold text-on-surface">200 Hộp (Mẫu Dạ Nguyệt)</strong>
</div>
<div className="flex justify-between items-center text-body-sm">
<span className="text-on-surface-variant">Mã vận đơn:</span>
<span className="font-data-mono text-data-mono font-semibold text-primary">MM-LOG-DN3310</span>
</div>
<div className="flex justify-between items-center text-body-sm">
<span className="text-on-surface-variant">Dự kiến đến:</span>
<span className="font-body-sm text-body-sm text-secondary font-medium">16/08/2025 (Trước 11h)</span>
</div>
</div>

<div className="p-space-xs rounded bg-surface-container flex items-center justify-between text-body-sm">
<div className="flex items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-primary">thermostat</span>
<span>Thùng lạnh: <strong>23.4°C</strong></span>
</div>
<span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Vị trí: Đèo Ngang (Quảng Bình)
                  </span>
</div>
</div>
<div className="flex items-center justify-between pt-space-xs">
<button className="text-secondary hover:text-on-secondary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1">
                  Theo dõi GPS xe lạnh <span className="material-symbols-outlined text-[16px]">navigation</span>
</button>
<span className="font-data-mono text-data-mono text-on-surface-variant">Xe: 43C-194.22</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between gap-space-md relative overflow-hidden">
<div className="absolute top-0 right-0 w-24 h-24 bg-outline-variant/10 rounded-bl-full pointer-events-none"></div>
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">inventory_2</span> ĐÓNG KIỆN XUẤT XƯỞNG
                  </span>
<span className="font-data-mono text-data-mono text-on-surface-variant font-semibold">Chuyến 03 / 03</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">Văn phòng TP.HCM</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Saigon Centre Tháp 2, Lê Lợi, Bến Nghé, Quận 1</span>
</div>
<div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1">
<div className="flex justify-between items-center text-body-sm">
<span className="text-on-surface-variant">Số lượng giao:</span>
<strong className="font-semibold text-on-surface">400 Hộp (Mẫu Dạ Nguyệt)</strong>
</div>
<div className="flex justify-between items-center text-body-sm">
<span className="text-on-surface-variant">Mã vận đơn:</span>
<span className="font-data-mono text-data-mono font-semibold text-primary">MM-LOG-SG1102</span>
</div>
<div className="flex justify-between items-center text-body-sm">
<span className="text-on-surface-variant">Thời gian xuất xưởng:</span>
<span className="font-body-sm text-body-sm text-on-surface font-medium">Hôm nay, 18:00</span>
</div>
</div>

<div className="p-space-xs rounded bg-surface-container flex items-center justify-between text-body-sm">
<div className="flex items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
<span>Quy cách:</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Đã bọc màng chống sốc & Pallet</span>
</div>
</div>
<div className="flex items-center justify-between pt-space-xs">
<button className="text-primary hover:underline font-label-sm text-label-sm font-semibold flex items-center gap-1">
                  In Tem Nhãn Thùng Giao <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
</button>
<span className="font-data-mono text-data-mono text-on-surface-variant">Chờ gán xe số 3</span>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-lg" id="pod-gallery">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-0.5 rounded bg-primary/10 text-primary font-label-sm text-label-sm uppercase font-bold tracking-wider">Hồ Sơ Pháp Lý Giao Nhận (#20)</span>
<span className="text-on-surface-variant font-label-sm text-label-sm">|</span>
<span className="font-data-mono text-data-mono text-on-surface-variant">Vận đơn: MM-LOG-HN7709</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Thư Viện Ảnh Bằng Chứng Giao Nhận PoD (Proof-of-Delivery) Thực Tế
              </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Hình ảnh hiện trường xác nhận nguyên vẹn niêm phong, biên bản ký nhận con dấu doanh nghiệp và ảnh kiểm mẫu mở hộp ngẫu nhiên.
              </p>
</div>

<div className="flex items-center gap-space-xs bg-tertiary-fixed text-on-tertiary-fixed p-space-sm rounded-xl">
<span className="material-symbols-outlined text-[20px] text-tertiary">gavel</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm font-bold">Metadata Đã Xác Thực Toàn Vẹn</span>
<span className="font-data-mono text-data-mono text-on-tertiary-fixed-variant">GPS 21.0168°N, 105.7838°E • SHA-256</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">

<div className="group bg-surface-container-low rounded-xl overflow-hidden shadow-sm flex flex-col">
<div className="relative w-full h-64 overflow-hidden bg-surface-dim">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Close up photograph of a refrigerated logistics transport truck rear door with an official MoonMarket high-security digital GPS QR cable lock seal, secure plastic shrink wrap around enterprise mooncake shipment cartons, high clarity commercial documentary lighting, warm neutral tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmAsj7rb7SQpabNreO4fFuYPO9UxuDl9PYQ1KfMfThtHojEPnh6OY8M4ywoHassaRsZANhPjDdPRkHijOqjDIr2OVp5de-CfKnUJrGtnYortuM8adEqOfAKRdgSLXIb7fPO0pp9WcVe8KtOJdW8KvWn7W-dYslNqtSp0gaUuOoSeltzY99b9lMsEJSTEPGpWr5UUv6QmWgslj6pQmCfgRMTMhHFPQVGaUtwR3_-dH9oAlzg1JFQ9en"/>
<div className="absolute top-space-sm left-space-sm bg-surface-container-lowest/90 backdrop-blur-md px-space-xs py-0.5 rounded font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[14px] text-tertiary">lock</span>
                  Ảnh 1: Niêm Phong Seal Thùng Lạnh
                </div>
<div className="absolute bottom-space-sm right-space-sm bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface px-space-xs py-0.5 rounded font-data-mono text-data-mono text-[11px]">
                  #SEAL-99824-QR
                </div>
</div>
<div className="p-space-md flex flex-col gap-space-xs">
<span className="font-title-md text-title-md font-semibold text-on-surface">Kiểm tra Seal Niêm Phong Xe Lạnh</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                  Dây seal cáp có gắn mã QR định vị vệ tinh GPS, pallet thùng carton được quấn 4 lớp màng co nhiệt bảo vệ chống ẩm và ẩm mốc trong suốt lộ trình.
                </p>
<div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-data-mono text-data-mono">
<span>Chụp: 14/08 14:20</span>
<span className="text-tertiary font-medium">Hợp lệ 100%</span>
</div>
</div>
</div>

<div className="group bg-surface-container-low rounded-xl overflow-hidden shadow-sm flex flex-col">
<div className="relative w-full h-64 overflow-hidden bg-surface-dim">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Editorial close up flat-lay of a crisp paper goods delivery confirmation report bearing an authentic red corporate official seal stamp and handwritten ink signature of the warehouse manager for An Phat Corp, clean daylight office setting, warm executive atmosphere" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASkT2CHy70iwK4oMdTFyZzauJaPH89vh1I6S0IQFAnZy-MPv50rbDEeJ2D59YRHVvvaRju81TP9ZMC9iGf5yMOrFVXiuvwc4d_3IzHCHF-aV3bbr-3kwLN0glQos8HagSvSs3tD7JYeXLsEkHNaRMo_gGCJEwBIYkaJuDTveyyZNgIYTz_25Qx5fQbzGvi4COAGDPSSsIgN5mFLVnlteOBvZ6BGZcxMvt40uRPpPRwjL0Dr2HE35eZ"/>
<div className="absolute top-space-sm left-space-sm bg-surface-container-lowest/90 backdrop-blur-md px-space-xs py-0.5 rounded font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[14px] text-primary">draw</span>
                  Ảnh 2: Biên Bản Ký Mộc Đỏ Pháp Nhân
                </div>
<div className="absolute bottom-space-sm right-space-sm bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface px-space-xs py-0.5 rounded font-data-mono text-data-mono text-[11px]">
                  BBBG-2025/AP-01
                </div>
</div>
<div className="p-space-md flex flex-col gap-space-xs">
<span className="font-title-md text-title-md font-semibold text-on-surface">Biên Bản Bàn Giao Ký Mộc Đỏ</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                  Chữ ký tươi và con dấu mộc đỏ pháp nhân Công ty Cổ phần Tập đoàn An Phát do Thủ kho trưởng Vũ Đình Nam đại diện ký duyệt nghiệm thu đủ 600 hộp.
                </p>
<div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-data-mono text-data-mono">
<span>Ký nhận: 14/08 15:45</span>
<span className="text-tertiary font-medium">Đã tải lên ERP</span>
</div>
</div>
</div>

<div className="group bg-surface-container-low rounded-xl overflow-hidden shadow-sm flex flex-col">
<div className="relative w-full h-64 overflow-hidden bg-surface-dim">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Photographic inspection of five luxury opened corporate mid-autumn mooncake gift boxes in crimson red and gold embossed foil, displaying pristine artisanal baked mooncakes with golden brown crust, quality audit inspection table, sharp editorial crisp detail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD8FqcW3AqjfhbUz6kULtHxCR-XBfMxoqAxPjRd7YV6XjAlL_q0tOlO_b8SzPy-b2ZolT9WvyhEjlOU2sRVGkhFr5MYrMTvREFfg1Izqwmj6UkVVksMqTUtHq8M5Fc34VfV6n6znhsQF_QpyINXPERwou3HuwjUpCas_YlILYauOeg6Sy7LSy8yOxq5LQ9-FERuVFn2B8hQ7_uZ3X9NdNVGmp0GNY6TzlgZg8cvdzyAcPUddqTS_gE"/>
<div className="absolute top-space-sm left-space-sm bg-surface-container-lowest/90 backdrop-blur-md px-space-xs py-0.5 rounded font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[14px] text-secondary">fact_check</span>
                  Ảnh 3: Mở Hộp Test Ngẫu Nhiên 5 Hộp
                </div>
<div className="absolute bottom-space-sm right-space-sm bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface px-space-xs py-0.5 rounded font-data-mono text-data-mono text-[11px]">
                  QC-AUDIT-PASS
                </div>
</div>
<div className="p-space-md flex flex-col gap-space-xs">
<span className="font-title-md text-title-md font-semibold text-on-surface">Kiểm Tra Ngẫu Nhiên 5 Hộp Tại Kho</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                  Đồng kiểm độ bóng, bao bì in nhũ kim, khay định hình không móp méo, gói hút oxy còn nguyên vẹn. Không phát sinh tình trạng nứt vỡ bánh do xóc rung.
                </p>
<div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-data-mono text-data-mono">
<span>Tỷ lệ lỗi: 0.0%</span>
<span className="text-tertiary font-medium">Đạt Chuẩn Loại A</span>
</div>
</div>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary text-[24px]">vpn_key</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Hash Khóa Pháp Lý: 7e8f52...98c1b4 (Chuẩn Proof of Delivery)</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Biên bản nghiệm thu Chuyến 1 đã kích hoạt điều kiện giải ngân tự động 75.000.000 VNĐ vào Ví Escrow.</span>
</div>
</div>
<button className="px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-colors shrink-0 flex items-center gap-1" >
              Xem Dòng Tiền Vừa Giải Ngân <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</div>
</section>

<section className="hidden flex-col gap-space-xl" id="panel-escrow">

<div className="flex flex-col gap-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Hệ Thống Ví Ký Quỹ Đảm Bảo (#25)</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Tài Chính Xưởng Bánh & Dòng Tiền Escrow</h2>
</div>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-tertiary text-[18px]">lock_clock</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Tài khoản ủy thác trung gian tại Ngân hàng TMCP Đầu tư & Phát triển Việt Nam</span>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between gap-space-md">
<div className="flex flex-col gap-1">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm font-semibold text-tertiary uppercase tracking-wider">Số dư khả dụng</span>
<div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">account_balance</span>
</div>
</div>
<div className="flex items-baseline gap-1 mt-1">
<span className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">345.500.000</span>
<span className="font-label-md text-label-md text-on-surface-variant font-medium">VNĐ</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Tiền đã nghiệm thu xong, sẵn sàng chuyển về tài khoản IBAN của xưởng.</p>
</div>
<div className="flex flex-col gap-space-xs pt-space-xs">
<button className="w-full py-space-xs px-space-md rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5" >
<span className="material-symbols-outlined text-[18px]">payments</span>
                  Yêu Cầu Rút Tiền Về Vietcombank
                </button>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm px-1">
<span>Số TK: 0011004889211</span>
<span>Phí rút: 0đ (Hỗ trợ 100%)</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between gap-space-md">
<div className="flex flex-col gap-1">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm font-semibold text-secondary uppercase tracking-wider">Tạm giữ bảo chứng (Escrow)</span>
<div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">shield_with_heart</span>
</div>
</div>
<div className="flex items-baseline gap-1 mt-1">
<span className="font-headline-lg text-headline-lg font-bold text-secondary tracking-tight">175.000.000</span>
<span className="font-label-md text-label-md text-on-surface-variant font-medium">VNĐ</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Khoản cọc M1 các đơn đang chạy sản xuất nướng vỏ và chuẩn bị nhân bánh.</p>
</div>
<div className="p-space-xs rounded bg-surface-container-low flex flex-col gap-1 text-body-sm">
<div className="flex justify-between items-center">
<span className="text-on-surface-variant">HĐ-2025-00892 (An Phát):</span>
<strong className="font-data-mono text-data-mono font-semibold text-on-surface">100.000.000đ</strong>
</div>
<div className="flex justify-between items-center">
<span className="text-on-surface-variant">HĐ-2025-01044 (FPT IS):</span>
<strong className="font-data-mono text-data-mono font-semibold text-on-surface">75.000.000đ</strong>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between gap-space-md">
<div className="flex flex-col gap-1">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm font-semibold text-outline uppercase tracking-wider">Chờ tất toán sau nghiệm thu</span>
<div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">hourglass_top</span>
</div>
</div>
<div className="flex items-baseline gap-1 mt-1">
<span className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">75.000.000</span>
<span className="font-label-md text-label-md text-on-surface-variant font-medium">VNĐ</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Tiền đợt cuối (30% nghiệm thu dứt điểm) dự kiến mở khóa khi giao xong chuyến 2 & 3.</p>
</div>
<div className="p-space-xs rounded bg-tertiary-fixed-dim/20 flex items-center justify-between text-body-sm">
<span className="text-on-surface-variant">Dự kiến mở khóa:</span>
<span className="font-label-sm text-label-sm text-tertiary font-bold">18/08/2025</span>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div>
<h3 className="font-title-md text-title-md font-semibold text-on-surface">Quy Trình Giải Ngân Theo Milestone Hợp Đồng An Phát Corp</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Tiền được tự động bơm từ Quỹ Tạm Giữ Escrow sang Số Dư Khả Dụng theo 3 mốc cam kết.</p>
</div>
<span className="font-data-mono text-data-mono text-tertiary font-bold bg-tertiary-fixed px-space-xs py-0.5 rounded">Milestone 2/3 Hoàn Thành</span>
</div>

<div className="w-full bg-surface-container-low p-space-md rounded-xl overflow-x-auto">
<svg className="w-full min-w-[700px] h-20 text-on-surface" fill="none" viewBox="0 0 800 80" xmlns="http://www.w3.org/2000/svg">

<line stroke="currentColor" strokeLinecap="round" strokeOpacity="0.15" strokeWidth="4" x1="120" x2="680" y1="40" y2="40"></line>
<line className="text-tertiary" stroke="currentColor" strokeLinecap="round" strokeWidth="4" x1="120" x2="400" y1="40" y2="40"></line>

<g transform="translate(120, 40)">
<circle className="fill-tertiary" r="16"></circle>
<path d="M-5 -1L-1 3L5 -3" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
<text className="font-label-sm text-label-sm fill-current font-bold" text-anchor="middle" y="-24">Cọc M1: 50% (75M)</text>
<text className="font-body-sm text-[11px] fill-current opacity-70" text-anchor="middle" y="30">Đã giải ngân khi duyệt khuôn</text>
</g>

<g transform="translate(400, 40)">
<circle className="fill-tertiary" r="16"></circle>
<path d="M-5 -1L-1 3L5 -3" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
<text className="font-label-sm text-label-sm fill-current font-bold" text-anchor="middle" y="-24">Giao Trụ Sở HN: (75M)</text>
<text className="font-body-sm text-[11px] fill-current text-tertiary font-semibold" text-anchor="middle" y="30">Đã mở khóa vào ví (14/08)</text>
</g>

<g transform="translate(680, 40)">
<circle className="fill-surface-container-highest" r="16"></circle>
<circle className="fill-outline-variant" r="6"></circle>
<text className="font-label-sm text-label-sm fill-current font-medium" text-anchor="middle" y="-24">Tất Toán 100%: (75M)</text>
<text className="font-body-sm text-[11px] fill-current opacity-60" text-anchor="middle" y="30">Chờ nhận hàng ĐN & HCM</text>
</g>
</svg>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Lịch Sử Giao Dịch & Giải Ngân Chi Tiết</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Toàn bộ biến động số dư được kiểm toán độc lập và đối chiếu theo mã số thuế xưởng.</p>
</div>

<div className="flex items-center gap-space-xs">
<button className="px-space-md py-space-xs rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1.5 transition-colors" >
<span className="material-symbols-outlined text-[18px] text-tertiary">table_view</span>
                Xuất Sao Kê Excel
              </button>
<button className="px-space-md py-space-xs rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-colors" >
<span className="material-symbols-outlined text-[18px]">receipt_long</span>
                Tải Hóa Đơn GTGT Điện Tử
              </button>
</div>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-space-sm px-space-md rounded-l-lg">Mã Giao Dịch</th>
<th className="py-space-sm px-space-md">Thời Gian</th>
<th className="py-space-sm px-space-md">Nội Dung Chi Tiết Giao Dịch</th>
<th className="py-space-sm px-space-md">Loại Hoạt Động</th>
<th className="py-space-sm px-space-md text-right">Số Tiền (VNĐ)</th>
<th className="py-space-sm px-space-md text-center rounded-r-lg">Trạng Thái</th>
</tr>
</thead>
<tbody className="font-body-sm text-body-sm divide-y-0">

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-space-md px-space-md font-data-mono text-data-mono font-semibold text-primary">TX-88910</td>
<td className="py-space-md px-space-md text-on-surface-variant font-data-mono text-data-mono">14/08/2025 16:02</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-semibold text-on-surface">Giải ngân cọc M1 từ Escrow HĐ An Phát Corp</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Kích hoạt sau khi thẩm định ảnh PoD chuyến giao HN7709</span>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="px-space-xs py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">Giải ngân Escrow</span>
</td>
<td className="py-space-md px-space-md text-right font-data-mono text-title-md font-bold text-tertiary">
                    +75.000.000
                  </td>
<td className="py-space-md px-space-md text-center">
<span className="inline-flex items-center gap-1 text-tertiary font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Thành công
                    </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors bg-surface-container-low/30">
<td className="py-space-md px-space-md font-data-mono text-data-mono font-semibold text-primary">TX-88764</td>
<td className="py-space-md px-space-md text-on-surface-variant font-data-mono text-data-mono">10/08/2025 09:15</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-semibold text-on-surface">Tất toán hoàn tất nghiệm thu HĐ Vingroup Retail</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Hợp đồng PO-VG-2025-4421: 2.000 hộp Bánh Trăng Thu Vàng</span>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="px-space-xs py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">Tất toán 100%</span>
</td>
<td className="py-space-md px-space-md text-right font-data-mono text-title-md font-bold text-tertiary">
                    +128.000.000
                  </td>
<td className="py-space-md px-space-md text-center">
<span className="inline-flex items-center gap-1 text-tertiary font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Thành công
                    </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-space-md px-space-md font-data-mono text-data-mono font-semibold text-on-surface-variant">TX-88510</td>
<td className="py-space-md px-space-md text-on-surface-variant font-data-mono text-data-mono">10/08/2025 09:16</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-semibold text-on-surface">Phí dịch vụ bảo chứng & sàn TMĐT B2B MoonMarket (1%)</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Khấu trừ tự động trên HĐ Vingroup Retail (Xuất e-VAT đầy đủ)</span>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-medium">Phí giao dịch</span>
</td>
<td className="py-space-md px-space-md text-right font-data-mono text-title-md font-bold text-error">
                    -1.250.000
                  </td>
<td className="py-space-md px-space-md text-center">
<span className="inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm font-medium">
                      Đã khấu trừ
                    </span>
</td>
</tr>
</tbody>
</table>
</div>
<div className="flex flex-col sm:flex-row items-center justify-between pt-space-sm text-on-surface-variant font-body-sm text-body-sm gap-space-xs">
<span>Hiển thị 3 / 24 giao dịch trong tháng 08/2025</span>
<div className="flex items-center gap-1">
<button className="px-space-xs py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm">Trang trước</button>
<button className="px-space-sm py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">1</button>
<button className="px-space-sm py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm">2</button>
<button className="px-space-xs py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm">Trang sau</button>
</div>
</div>
</div>
</section>
</div>
</div>


</div></main><footer className="w-full bg-surface-container-low mt-space-xl shadow-[0_-1px_6px_rgba(0,0,0,0.02)]"><div className="w-full px-margin py-space-xl"><div className="grid grid-cols-1 md:grid-cols-4 gap-gutter"><div className="flex flex-col gap-space-sm"><div className="flex items-center gap-space-xs"><div className="w-7 h-7 rounded bg-primary-container flex items-center justify-center text-on-primary font-headline-sm font-bold text-sm">M</div><span className="font-headline-sm text-headline-sm font-bold text-primary">MoonMarket B2B</span></div><p className="font-body-sm text-body-sm text-on-surface-variant">Cổng vận hành thương mại & đấu thầu sản xuất bánh Trung Thu dành riêng cho xưởng bánh artisan và cơ sở sản xuất quy mô lớn.</p><div className="flex items-center gap-space-xs font-label-sm text-label-sm text-tertiary font-semibold"><span className="material-symbols-outlined text-[18px]">verified_user</span><span>Chuẩn kiểm duyệt HACCP / ISO 22000</span></div></div><div className="flex flex-col gap-space-sm"><span className="font-label-md text-label-md font-semibold text-on-surface">Hỗ trợ Xưởng bánh 24/7</span><p className="font-body-sm text-body-sm text-on-surface-variant">Hotline ưu tiên xưởng: <strong className="text-on-surface font-semibold">1800 6886 (Nhánh 2)</strong></p><p className="font-body-sm text-body-sm text-on-surface-variant">Tranh chấp & Đền bù đơn: <strong className="text-on-surface font-semibold">dispute@moonmarket.vn</strong></p><p className="font-body-sm text-body-sm text-on-surface-variant">Kỹ thuật sàn & Tích hợp ERP: 8h30 - 22h00</p></div><div className="flex flex-col gap-space-sm"><span className="font-label-md text-label-md font-semibold text-on-surface">Chính sách & Pháp chế B2B</span><div className="flex flex-col gap-space-xs"><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Quy chế bảo lãnh ký quỹ Escrow</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Cam kết tiêu chuẩn ATTP & Bao bì</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Chính sách phạt vi phạm tiến độ giao</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Quy trình đối soát hóa đơn VAT</a></div></div><div className="flex flex-col gap-space-sm"><span className="font-label-md text-label-md font-semibold text-on-surface">Bảo chứng Thanh toán & Pháp lý</span><div className="p-space-sm bg-surface-container rounded-lg"><div className="flex items-center gap-space-xs text-secondary mb-1"><span className="material-symbols-outlined text-[18px]">shield</span><span className="font-label-sm text-label-sm font-semibold">Bảo lãnh Escrow 100%</span></div><p className="font-body-sm text-body-sm text-on-surface-variant">Tiền cọc 40-70% phong tỏa an toàn ngay khi chốt PO. Tự động giải ngân theo mốc nghiệm thu thành công.</p></div></div></div><div className="mt-space-lg pt-space-md flex flex-col md:flex-row items-center justify-between text-on-surface-variant font-body-sm text-body-sm gap-space-sm"><div>© 2024 MoonMarket Enterprise Platform. Tất cả quyền được bảo lưu.</div><div className="flex gap-space-md font-label-sm text-label-sm"><span className="text-tertiary font-semibold">Hệ thống hoạt động bình thường (99.98%)</span><span>Phiên bản Hub: v4.2.0-b2b</span></div></div></div></footer>
    </div>
  );
}
