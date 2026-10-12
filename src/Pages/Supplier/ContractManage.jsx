import React from 'react';

export default function ContractManage({ onNavigate }) {
  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-20 w-full px-margin flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-lg"><div className="flex items-center gap-space-sm"><div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary font-headline-md font-bold">M</div><div className="flex flex-col"><div className="flex items-center gap-space-xs"><span className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">MoonMarket</span><span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">B2B Hub</span></div><span className="font-label-sm text-label-sm text-on-surface-variant">Cổng Đối Tác Xưởng Bánh</span></div></div><div className="hidden xl:flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-xs rounded-full"><div className="flex items-center gap-space-xs"><span className="w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse"></span><span className="font-label-sm text-label-sm font-semibold text-on-surface">Đang mở bán</span></div><span className="text-outline-variant font-body-sm">|</span><div className="flex items-center gap-1 text-tertiary font-label-sm text-label-sm font-semibold"><span className="material-symbols-outlined text-[16px]">verified</span><span>Đối tác Vàng (98/100)</span></div></div></div><div className="hidden md:flex flex-1 max-w-md items-center bg-surface-container-low px-space-md py-space-xs rounded-lg"><span className="material-symbols-outlined text-outline text-[20px] mr-space-xs">search</span><input className="bg-transparent w-full text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none" placeholder="Tra cứu mã đơn B2B, SKU bánh, phiên RFQ..." type="text"/></div><div className="flex items-center gap-space-md"><div className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"><span className="material-symbols-outlined text-on-surface-variant text-[22px]">notifications</span><span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-on-primary text-[10px] font-bold rounded-full flex items-center justify-center">5</span></div><div className="flex items-center gap-space-sm pl-space-sm"><div className="hidden lg:flex flex-col text-right"><span className="font-label-md text-label-md font-semibold text-on-surface">Xưởng Tràng An Bakery</span><span className="font-label-sm text-label-sm text-on-surface-variant">Admin: Trần Đức Thắng</span></div><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></div><div className="w-full px-margin bg-surface-container-lowest"><nav className="flex items-center gap-space-xs overflow-x-auto py-space-xs" data-active-classes="bg-primary-container text-on-primary font-semibold shadow-sm"><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="dashboard-doanh-so" href="#">Dashboard & Doanh số</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="san-pham-khuyen-mai" href="#">Sản phẩm & Khuyến mãi (Bậc thang)</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="don-hang-dong-goi-b2b" href="#">Đơn hàng & Đóng gói B2B</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="dau-thau-rfq-bao-gia" href="#">Đấu thầu RFQ & Báo giá</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="hop-dong-milestone" href="#">Hợp đồng & Milestone</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="giao-van-vi-escrow" href="#">Giao vận & Ví Escrow</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="cai-dat-gian-hang" href="#">Cài đặt gian hàng</a></nav></div></header><main className="w-full pt-20 bg-surface min-h-screen"><div className="flex flex-col w-full">

<div className="w-full bg-surface-container-low px-margin py-space-md shadow-sm">
<div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-sm flex-wrap">
<a className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="#">
<span className="material-symbols-outlined text-[18px]">arrow_back</span>
<span>Danh sách hợp đồng</span>
</a>
<span className="text-outline-variant font-body-sm">/</span>
<span className="font-data-mono text-data-mono bg-surface-container-high px-2 py-0.5 rounded text-on-surface font-semibold">HD-2025-00892</span>
<span className="px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
          VNPT-CA Đã Ký Số
        </span>
</div>
<div className="flex items-center gap-space-sm w-full md:w-auto justify-end">
<button className="px-space-md py-space-xs rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors flex items-center gap-space-xs shadow-sm" id="btn-export-log">
<span className="material-symbols-outlined text-[18px] text-on-surface-variant">history_edu</span>
<span>Nhật ký Kiểm toán</span>
</button>
<button className="px-space-md py-space-xs rounded bg-surface-container-lowest hover:bg-surface-container-high text-primary font-label-md text-label-md transition-colors flex items-center gap-space-xs shadow-sm" >
<span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
<span>Xem bản PDF hợp đồng gốc có dấu mộc</span>
</button>
</div>
</div>
</div>
<div className="w-full px-margin py-space-lg max-w-[1440px] mx-auto flex flex-col gap-space-lg">

<div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-lg relative overflow-hidden">
<div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-primary/5 pointer-events-none blur-2xl"></div>
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-md bg-gradient-to-r from-transparent via-surface-container-low/40 to-transparent">
<div className="flex flex-col gap-space-xs">
<div className="flex items-center gap-space-sm flex-wrap">
<span className="text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">Hợp Đồng Thương Mại Điện Tử B2B</span>
<span className="text-outline-variant">•</span>
<span className="font-data-mono text-body-sm text-on-surface-variant">Ký duyệt ngày: 12/08/2025</span>
</div>
<h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
            Hợp Đồng Sản Xuất Bánh Trung Thu Doanh Nghiệp An Phát Corp
          </h1>
<div className="flex items-center gap-space-md flex-wrap mt-1">
<div className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
<span className="material-symbols-outlined text-secondary text-[20px]">apartment</span>
<span>Bên mua: <strong className="text-on-surface font-semibold">Tập Đoàn Công Nghệ An Phát</strong></span>
</div>
<span className="text-outline-variant">•</span>
<div className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
<span className="material-symbols-outlined text-tertiary text-[20px]">factory</span>
<span>Xưởng nhận: <strong className="text-on-surface font-semibold">Xưởng Tràng An Artisan Bakery</strong></span>
</div>
</div>
</div>
<div className="flex items-center gap-space-md bg-surface-container-low px-space-md py-space-sm rounded-xl">
<div className="flex flex-col text-right">
<span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Tổng giá trị Hợp đồng</span>
<span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">250.000.000 <span className="font-title-md text-title-md font-medium text-on-surface">VNĐ</span></span>
<div className="flex items-center gap-1 text-tertiary font-label-sm text-label-sm font-semibold justify-end">
<span className="material-symbols-outlined text-[15px]">verified_user</span>
<span>Bảo chứng Escrow 100% trung gian</span>
</div>
</div>
<div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-[26px]">account_balance</span>
</div>
</div>
</div>

<div className="w-full pt-space-xs">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-md text-label-md font-semibold text-on-surface">Vòng Đời Hợp Đồng (Lifecycle Pipeline)</span>
<span className="font-data-mono text-body-sm text-on-surface-variant">Giai đoạn hiện tại: <strong className="text-primary font-semibold">Mắt Xích #4 - Đang Sản Xuất</strong></span>
</div>
<div className="grid grid-cols-1 md:grid-cols-5 gap-space-sm relative">

<div className="flex flex-col gap-1 p-space-sm bg-surface-container-low rounded-lg relative overflow-hidden">
<div className="flex items-center justify-between text-tertiary">
<span className="font-data-mono text-label-sm font-semibold">01. DRAFT</span>
<span className="material-symbols-outlined text-[18px]">check_circle</span>
</div>
<span className="font-label-md text-label-md font-semibold text-on-surface">Bản nháp hợp đồng</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Pháp lý thẩm định</span>
</div>

<div className="flex flex-col gap-1 p-space-sm bg-surface-container-low rounded-lg relative overflow-hidden">
<div className="flex items-center justify-between text-tertiary">
<span className="font-data-mono text-label-sm font-semibold">02. SIGNED</span>
<span className="material-symbols-outlined text-[18px]">check_circle</span>
</div>
<span className="font-label-md text-label-md font-semibold text-on-surface">Đã ký 2 bên</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">VNPT CA / OTP xác nhận</span>
</div>

<div className="flex flex-col gap-1 p-space-sm bg-surface-container-low rounded-lg relative overflow-hidden">
<div className="flex items-center justify-between text-tertiary">
<span className="font-data-mono text-label-sm font-semibold">03. ESCROW M1</span>
<span className="material-symbols-outlined text-[18px]">check_circle</span>
</div>
<span className="font-label-md text-label-md font-semibold text-on-surface">Cọc Escrow M1</span>
<span className="font-body-sm text-body-sm text-tertiary font-medium">Đã xong lúc 14:00 hôm nay</span>
</div>

<div className="flex flex-col gap-1 p-space-sm bg-primary-container text-on-primary rounded-lg shadow-md relative overflow-hidden">
<div className="flex items-center justify-between text-on-primary">
<span className="font-data-mono text-label-sm font-bold tracking-wider">04. ACTIVE</span>
<span className="material-symbols-outlined text-[18px] animate-pulse">precision_manufacturing</span>
</div>
<span className="font-label-md text-label-md font-bold">ĐANG SẢN XUẤT</span>
<span className="font-body-sm text-body-sm text-on-primary-container">Tiến độ xưởng: 42%</span>
</div>

<div className="flex flex-col gap-1 p-space-sm bg-surface-container-low/60 rounded-lg text-on-surface-variant opacity-70">
<div className="flex items-center justify-between">
<span className="font-data-mono text-label-sm">05. HANDOVER</span>
<span className="material-symbols-outlined text-[18px]">radio_button_unchecked</span>
</div>
<span className="font-label-md text-label-md font-medium text-on-surface">Nghiệm thu bàn giao</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Giao 1.200 hộp & Tất toán</span>
</div>
</div>
</div>

<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
<span className="material-symbols-outlined text-[18px]">verified</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Chứng thực chữ ký số VNPT-CA đã khớp dữ liệu chuỗi khối</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Mã hash bảo mật: SHA256-08F9A43-MOONMARKET-ESCROW-2025</span>
</div>
</div>
<div className="flex items-center gap-space-sm self-end sm:self-auto">
<span className="font-data-mono text-label-sm text-tertiary font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">lock</span>
            Toàn vẹn 100%
          </span>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

<div className="lg:col-span-7 flex flex-col gap-space-lg">
<div className="flex items-center justify-between">
<div className="flex flex-col">
<h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Khu Vực Quản Lý 3 Mốc Tiến Độ (Milestone Tracker)</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Các mốc thanh toán tự động giải tỏa theo tiến độ nghiệm thu thực tế</p>
</div>
<span className="px-space-sm py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-data-mono text-label-sm font-semibold">
            TỔNG 3 MỐC: 250M
          </span>
</div>

<div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-start justify-between gap-space-sm">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed font-headline-sm font-bold">
                M1
              </div>
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<span className="font-title-md text-title-md font-bold text-on-surface">Mốc 1: Đặt cọc nguyên vật liệu 30%</span>
<span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">Hoàn tất</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Thời gian khớp cọc: 14:00 hôm nay • Ngân hàng liên kết Escrow Vietcombank</span>
</div>
</div>
<div className="text-right">
<span className="font-headline-sm text-headline-sm font-bold text-tertiary">75.000.000 <span className="font-body-sm text-body-sm text-on-surface">đ</span></span>
<div className="font-label-sm text-label-sm text-on-surface-variant">30% Tổng HĐ</div>
</div>
</div>
<div className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
<div className="flex items-center gap-space-xs text-tertiary">
<span className="material-symbols-outlined text-[20px]">check_circle</span>
<span className="font-label-md text-label-md font-semibold">ĐÃ GIẢI NGÂN VÀO VÍ TẠM GIỮ ESCROW</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant">Mã GD: #TX-ES-99410</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
            Hệ thống đã xác thực ký quỹ từ An Phát Corp. <strong className="text-on-surface font-semibold">Cho phép xưởng Tràng An nhập bột bánh cao cấp, lạp xưởng Mai Quế Lộ, hạt sen Huế và đặt phôi khuôn CNC đúc mẫu.</strong>
</p>
</div>

<div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col gap-space-md relative overflow-hidden">
<div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
<div className="flex items-start justify-between gap-space-sm">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary font-headline-sm font-bold">
                M2
              </div>
<div className="flex flex-col">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-title-md text-title-md font-bold text-on-surface">Mốc 2: Hoàn thành đúc khuôn CNC logo & Nướng 50% mẻ bánh</span>
<span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold animate-pulse">Đang tiến hành</span>
</div>
<div className="flex items-center gap-space-xs mt-0.5">
<span className="material-symbols-outlined text-error text-[16px]">timer</span>
<span className="font-label-sm text-label-sm font-semibold text-error">Hạn chót: 18/08/2025 (Còn 3 ngày)</span>
</div>
</div>
</div>
<div className="text-right">
<span className="font-headline-sm text-headline-sm font-bold text-primary">100.000.000 <span className="font-body-sm text-body-sm text-on-surface">đ</span></span>
<div className="font-label-sm text-label-sm text-on-surface-variant">40% Tổng HĐ</div>
</div>
</div>

<div className="flex flex-col gap-1">
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-on-surface-variant">Khối lượng sản xuất đạt được</span>
<span className="font-data-mono font-semibold text-primary">600 / 1.200 Chiếc (50%)</span>
</div>
<div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full transition-all duration-500" style={{"width": "50%"}}></div>
</div>
</div>

<div className="flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-xl">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-semibold text-on-surface">Bằng chứng hoàn thành Mốc M2 (Bắt buộc 3 tài liệu)</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Đã đính kèm: <span className="font-semibold text-primary" id="proof-counter">2/3</span></span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">

<div className="flex flex-col bg-surface-container-lowest p-space-sm rounded-lg shadow-sm group">
<div className="w-full h-24 rounded bg-surface-container overflow-hidden relative mb-space-xs">
<img className="w-full h-full object-cover" data-alt="Khuôn đúc bánh Trung Thu bằng hợp kim nhôm CNC tinh xảo khắc sắc nét logo An Phát Corp với họa tiết trăng tròn hoa sen, ánh kim loại mờ bóng bẩy sang trọng" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPsMaFOy-jeexzRcAh5WSEewtK5LVrAV58Zc7fp56yWRgdQ5Gm8HEoeyhHPKXoeh7KGsFMuh9bsWNz6Kg81z6OuXMc0WXICS4o_cysIzG6xj9nRP7__tqBtBdFM37XuOLMV-I4ZGDu8tzMM1Zm-LdlOWudAr1ihy2psEy1-gD3nNpzMV25WyBxM0qFK1q6GIhz5nvpjl_JpeiPnmu8B9ubgSyOIvx4Po-snx24Fn0P97ndwRUtUwhi"/>
<div className="absolute top-1 right-1 bg-tertiary text-on-tertiary rounded-full p-0.5 flex items-center justify-center">
<span className="material-symbols-outlined text-[14px]">check</span>
</div>
</div>
<span className="font-label-sm text-label-sm font-semibold text-on-surface truncate">1. Khuôn CNC Logo An Phát</span>
<span className="font-data-mono text-body-sm text-tertiary">cnc_anphat_spec.png</span>
</div>

<div className="flex flex-col bg-surface-container-lowest p-space-sm rounded-lg shadow-sm group">
<div className="w-full h-24 rounded bg-surface-container overflow-hidden relative mb-space-xs">
<img className="w-full h-full object-cover" data-alt="Mẻ bánh nướng trung thu thập cẩm gà quay 180g vỏ vàng ươm bóng dầu lòng đỏ trứng óng ả xếp ngay ngắn trên khay nướng xưởng artisan chuyên nghiệp" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpiFd1uG00oul8MqvFH90I_-6gdN-UtvnmI3XNerzj_-qQGwNcWRvCsPwQy84j65CxkqSmX4NBydlTrJRJncJpq_n5veDbhgM5PyDCjujusMzvrqEIbLVQ_YKhH0lQwFuztYtN68v87YjakHDi1FtMcFP7ySatE4z9n1v2KmWHOSaAHCHsku8zHUAFjDpjxQuT_-eKUtClCReZPmTtoF93hYUDAF0or20eFXqr3lT6uNGSJakrjR_c"/>
<div className="absolute top-1 right-1 bg-tertiary text-on-tertiary rounded-full p-0.5 flex items-center justify-center">
<span className="material-symbols-outlined text-[14px]">check</span>
</div>
</div>
<span className="font-label-sm text-label-sm font-semibold text-on-surface truncate">2. Ảnh mẻ bánh test lò</span>
<span className="font-data-mono text-body-sm text-tertiary">oven_batch_500pcs.jpg</span>
</div>

<div className="flex flex-col items-center justify-center p-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer border-dashed" id="dropzone-slot-3">
<div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1">
<span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
</div>
<span className="font-label-sm text-label-sm font-semibold text-primary text-center">3. Ảnh đo độ ẩm & ATTP</span>
<span className="font-body-sm text-body-sm text-on-surface-variant text-center">Chưa tải lên</span>
</div>
</div>
<div className="flex items-center justify-between pt-space-xs">
<span className="font-body-sm text-body-sm text-on-surface-variant italic">* An Phát Corp & MoonMarket QA sẽ duyệt bằng chứng trong vòng 4 giờ làm việc.</span>
<button className="px-space-md py-space-xs rounded bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold transition-colors flex items-center gap-space-xs shadow-sm" id="btn-submit-m2">
<span className="material-symbols-outlined text-[18px]">verified</span>
<span>Báo Cáo Hoàn Thành Mốc M2</span>
</button>
</div>
</div>
</div>

<div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md opacity-80">
<div className="flex items-start justify-between gap-space-sm">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant font-headline-sm font-bold">
                M3
              </div>
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<span className="font-title-md text-title-md font-bold text-on-surface">Mốc 3: Bàn giao 1.200 hộp tại 3 chi nhánh & Tất toán</span>
<span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Chưa đến hạn</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Phân bổ: Hà Nội (500), TP.HCM (500), Đà Nẵng (200) • Vận chuyển xe lạnh</span>
</div>
</div>
<div className="text-right">
<span className="font-headline-sm text-headline-sm font-bold text-on-surface-variant">75.000.000 <span className="font-body-sm text-body-sm text-on-surface">đ</span></span>
<div className="font-label-sm text-label-sm text-on-surface-variant">30% Còn lại</div>
</div>
</div>
<div className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between text-body-sm text-on-surface-variant">
<span className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px]">local_shipping</span>
              3 Điểm nhận hàng cần chữ ký biên bản giao nhận (POD)
            </span>
<span className="font-data-mono">Hạn giao: 25/08/2025</span>
</div>

<div className="relative pt-space-xs group">
<button className="w-full py-space-sm px-space-md rounded bg-surface-container-high text-on-surface-variant/50 font-label-md text-label-md font-semibold cursor-not-allowed flex items-center justify-center gap-space-xs shadow-none">
<span className="material-symbols-outlined text-[20px]">task_alt</span>
<span>Gửi Yêu Cầu Nghiệm Thu Hợp Đồng & Giải Phóng Escrow M3</span>
</button>

<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-sm px-space-md py-space-xs rounded-lg bg-inverse-surface text-inverse-on-surface font-body-sm text-body-sm shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none text-center">
              Chỉ kích hoạt khi mốc M2 và khâu giao nhận hoàn tất 100% biên bản đối soát chữ ký số.
            </div>
</div>
</div>
</div>

<div className="lg:col-span-5 flex flex-col gap-space-lg">

<div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
<span className="material-symbols-outlined text-[20px]">warning</span>
</div>
<div className="flex flex-col">
<h3 className="font-title-md text-title-md font-bold text-on-surface">Khai Báo Sự Cố & Đề Xuất Gia Hạn</h3>
<span className="font-label-sm text-label-sm text-on-surface-variant">Incident & Extension Protocol (#17)</span>
</div>
</div>
<form className="flex flex-col gap-space-md" id="incident-form" >

<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md font-semibold text-on-surface flex items-center justify-between">
<span>Lý do phát sinh sự cố</span>
<span className="text-error font-body-sm">* Bắt buộc</span>
</label>
<div className="relative">
<select className="w-full bg-surface-container-low text-on-surface px-space-md py-space-sm rounded-lg font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer" id="incident-reason">
<option value="customs">Hàng vỏ hộp nhập khẩu chậm thông quan tại cảng Hải Phòng</option>
<option value="weather">Thời tiết mưa bão ảnh hưởng đường chuyển xe lạnh Bắc - Nam</option>
<option value="client_design">Yêu cầu đổi thiết kế thiệp & dập chìm logo từ khách hàng</option>
<option value="other">Trường hợp bất khả kháng khác (Có xác nhận chính quyền)</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
</div>
</div>

<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md font-semibold text-on-surface flex items-center justify-between">
<span>Số ngày đề xuất gia hạn mốc M2</span>
<span className="font-data-mono text-tertiary font-semibold text-body-sm">Hạn mới dự kiến: 20/08/2025</span>
</label>
<div className="grid grid-cols-4 gap-space-xs">
<button className="btn-day-picker py-space-xs rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md text-center transition-colors" type="button">+1 Ngày</button>
<button className="btn-day-picker py-space-xs rounded bg-primary-container text-on-primary font-label-md text-label-md text-center font-bold transition-colors shadow-sm" type="button">+2 Ngày</button>
<button className="btn-day-picker py-space-xs rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md text-center transition-colors" type="button">+3 Ngày</button>
<button className="btn-day-picker py-space-xs rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md text-center transition-colors" type="button">+5 Ngày</button>
</div>
</div>

<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md font-semibold text-on-surface">Mô tả chi tiết phương án khắc phục</label>
<textarea className="w-full bg-surface-container-low text-on-surface p-space-sm rounded-lg font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant" placeholder="Ví dụ: Xưởng đã điều động tăng ca kíp 3 đêm, bổ sung 4 thợ làm khuôn CNC dự phòng để đảm bảo chất lượng..." rows="3"></textarea>
</div>

<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md font-semibold text-on-surface flex items-center justify-between">
<span>Biên bản xác thực từ đơn vị vận tải / Cảng</span>
<span className="font-label-sm text-label-sm text-tertiary">Đã nhận 1 tệp</span>
</label>
<div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
<div className="flex items-center gap-space-xs truncate">
<span className="material-symbols-outlined text-secondary text-[20px]">description</span>
<span className="font-data-mono text-body-sm text-on-surface truncate">xac-nhan-thong-quan-cang-0814.pdf</span>
</div>
<button className="text-error hover:text-on-error-container text-body-sm font-semibold flex items-center" type="button">
<span className="material-symbols-outlined text-[16px]">close</span>
</button>
</div>
</div>

<div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-sm">
<span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">policy</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">
<strong className="text-on-surface font-semibold">Chính sách bảo toàn điểm tín nhiệm:</strong> Nếu bên mua An Phát Corp chấp thuận gia hạn, hợp đồng sẽ không bị tính phạt vi phạm hợp đồng (late penalty) và xưởng Tràng An được giữ nguyên danh hiệu Đối tác Vàng (98/100).
              </p>
</div>
<button className="w-full py-space-sm px-space-md rounded bg-secondary hover:bg-on-secondary-fixed text-on-secondary font-label-md text-label-md font-semibold transition-colors flex items-center justify-center gap-space-xs shadow-sm" type="submit">
<span className="material-symbols-outlined text-[18px]">send</span>
<span>Gửi Đề Xuất Gia Hạn Tới An Phát Corp</span>
</button>
</form>
</div>

<div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
<span className="material-symbols-outlined text-[20px]">gavel</span>
</div>
<div className="flex flex-col">
<h3 className="font-title-md text-title-md font-bold text-on-surface">Theo Dõi Tranh Chấp</h3>
<span className="font-label-sm text-label-sm text-on-surface-variant">Dispute Case Tracker (#18)</span>
</div>
</div>
<span className="px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-data-mono text-label-sm font-bold">0 Active Case</span>
</div>

<div className="flex flex-col items-center justify-center p-space-lg rounded-xl bg-surface-container-low text-center gap-space-xs">
<div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-tertiary mb-1">
<span className="material-symbols-outlined text-[24px]">verified</span>
</div>
<span className="font-title-md text-title-md font-bold text-on-surface">Không có tranh chấp nào đang mở</span>
<p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
              Mọi thủ tục thực hiện đang tuân thủ đúng khung điều khoản HĐ số HD-2025-00892 và bảo chứng tài chính Escrow.
            </p>
</div>

<div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Trọng tài viên trung gian MoonMarket</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Hỗ trợ đối soát hóa đơn VAT & tranh chấp mẫu mã</span>
</div>
<a className="px-space-md py-space-xs rounded bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-semibold transition-colors flex items-center gap-space-xs self-start sm:self-auto shadow-sm whitespace-nowrap" href="tel:18006886">
<span className="material-symbols-outlined text-[18px]">support_agent</span>
<span>Hotline 1800 6886</span>
</a>
</div>
</div>
</div>
</div>
</div>

<div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/60 backdrop-blur-sm hidden" id="modal-pdf-view">
<div className="w-full max-w-4xl bg-surface-container-lowest rounded-xl shadow-2xl flex flex-col max-h-[921px] overflow-hidden">

<div className="px-space-lg py-space-md bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary text-[24px]">description</span>
<div className="flex flex-col">
<span className="font-title-md text-title-md font-bold text-on-surface">Hợp Đồng Thương Mại Sản Xuất Bánh Trung Thu 2025</span>
<span className="font-data-mono text-body-sm text-on-surface-variant">HD-2025-00892_AnPhat_TrangAn_Signed.pdf</span>
</div>
</div>
<button className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-on-surface-variant" >
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>

<div className="flex-1 overflow-y-auto p-space-lg bg-surface-container flex justify-center">
<div className="w-full max-w-2xl bg-surface-container-lowest shadow-md rounded p-space-xl flex flex-col gap-space-md font-body-md text-body-md text-on-surface leading-relaxed">
<div className="text-center pb-space-sm">
<h4 className="font-headline-sm text-headline-sm font-bold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
<p className="font-body-sm text-body-sm">Độc lập - Tự do - Hạnh phúc</p>
<div className="w-24 h-0.5 bg-on-surface-variant mx-auto mt-2"></div>
</div>
<div className="text-center font-title-md text-title-md font-bold text-primary">
            HỢP ĐỒNG GIA CÔNG & CUNG ỨNG BÁNH TRUNG THU THƯƠNG HIỆU DOANH NGHIỆP
          </div>
<div className="text-center font-data-mono text-body-sm text-on-surface-variant -mt-2">Số: 892/2025/HĐ-MM/AP-TA</div>
<div className="p-space-sm bg-surface-container-low rounded-lg text-body-sm">
<p><strong>BÊN A (BÊN ĐẶT HÀNG):</strong> CÔNG TY CỔ PHẦN CÔNG NGHỆ AN PHÁT</p>
<p>Đại diện: Ông Hoàng Minh Quân - Chức vụ: Tổng Giám Đốc</p>
<p className="mt-2"><strong>BÊN B (ĐƠN VỊ SẢN XUẤT):</strong> XƯỞNG BÁNH ARTISAN TRÀNG AN</p>
<p>Đại diện: Ông Trần Đức Thắng - Chức vụ: Giám Đốc Vận Hành</p>
<p className="mt-2"><strong>ĐƠN VỊ BẢO CHỨNG ESCROW:</strong> MOONMARKET ENTERPRISE PLATFORM</p>
</div>
<div className="flex flex-col gap-space-xs text-body-sm">
<span className="font-semibold text-on-surface">ĐIỀU 1: PHẠM VI VÀ QUY CÁCH HÀNG HÓA</span>
<p>Bên B cam kết sản xuất đúng 1.200 set quà bánh Trung thu theo tiêu chuẩn chất lượng ISO 22000, bánh nướng nhân hạt sen Huế, vi cá, thập cẩm thượng hạng kèm khuôn dập logo nổi An Phát sắc nét.</p>
</div>

<div className="grid grid-cols-2 gap-space-lg pt-space-lg mt-space-md">
<div className="flex flex-col items-center text-center p-space-sm bg-surface-container-low rounded-lg">
<span className="font-label-md text-label-md font-bold">ĐẠI DIỆN BÊN A</span>
<span className="text-body-sm text-tertiary font-data-mono mt-1">[VNPT-CA ĐÃ KÝ SỐ]</span>
<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary my-1">
<span className="material-symbols-outlined text-[32px]">verified</span>
</div>
<span className="font-label-sm text-label-sm font-semibold">Hoàng Minh Quân</span>
<span className="font-data-mono text-label-sm text-on-surface-variant">12/08/2025 09:15:22 GMT+7</span>
</div>
<div className="flex flex-col items-center text-center p-space-sm bg-surface-container-low rounded-lg">
<span className="font-label-md text-label-md font-bold">ĐẠI DIỆN BÊN B</span>
<span className="text-body-sm text-tertiary font-data-mono mt-1">[VNPT-CA ĐÃ KÝ SỐ]</span>
<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary my-1">
<span className="material-symbols-outlined text-[32px]">verified</span>
</div>
<span className="font-label-sm text-label-sm font-semibold">Trần Đức Thắng</span>
<span className="font-data-mono text-label-sm text-on-surface-variant">12/08/2025 10:40:05 GMT+7</span>
</div>
</div>
</div>
</div>

<div className="px-space-lg py-space-sm bg-surface-container-low flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">lock</span>
          Tệp tin mã hóa bảo mật chuẩn pháp lý hợp đồng điện tử Bộ Công Thương
        </span>
<div className="flex items-center gap-space-sm">
<button className="px-space-md py-space-xs rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md" >Đóng</button>
<button className="px-space-md py-space-xs rounded bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md flex items-center gap-1" >
<span className="material-symbols-outlined text-[16px]">download</span>
<span>Tải về PDF gốc</span>
</button>
</div>
</div>
</div>
</div>

</div></main><footer className="w-full bg-surface-container-low mt-space-xl shadow-[0_-1px_6px_rgba(0,0,0,0.02)]"><div className="w-full px-margin py-space-xl"><div className="grid grid-cols-1 md:grid-cols-4 gap-gutter"><div className="flex flex-col gap-space-sm"><div className="flex items-center gap-space-xs"><div className="w-7 h-7 rounded bg-primary-container flex items-center justify-center text-on-primary font-headline-sm font-bold text-sm">M</div><span className="font-headline-sm text-headline-sm font-bold text-primary">MoonMarket B2B</span></div><p className="font-body-sm text-body-sm text-on-surface-variant">Cổng vận hành thương mại & đấu thầu sản xuất bánh Trung Thu dành riêng cho xưởng bánh artisan và cơ sở sản xuất quy mô lớn.</p><div className="flex items-center gap-space-xs font-label-sm text-label-sm text-tertiary font-semibold"><span className="material-symbols-outlined text-[18px]">verified_user</span><span>Chuẩn kiểm duyệt HACCP / ISO 22000</span></div></div><div className="flex flex-col gap-space-sm"><span className="font-label-md text-label-md font-semibold text-on-surface">Hỗ trợ Xưởng bánh 24/7</span><p className="font-body-sm text-body-sm text-on-surface-variant">Hotline ưu tiên xưởng: <strong className="text-on-surface font-semibold">1800 6886 (Nhánh 2)</strong></p><p className="font-body-sm text-body-sm text-on-surface-variant">Tranh chấp & Đền bù đơn: <strong className="text-on-surface font-semibold">dispute@moonmarket.vn</strong></p><p className="font-body-sm text-body-sm text-on-surface-variant">Kỹ thuật sàn & Tích hợp ERP: 8h30 - 22h00</p></div><div className="flex flex-col gap-space-sm"><span className="font-label-md text-label-md font-semibold text-on-surface">Chính sách & Pháp chế B2B</span><div className="flex flex-col gap-space-xs"><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Quy chế bảo lãnh ký quỹ Escrow</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Cam kết tiêu chuẩn ATTP & Bao bì</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Chính sách phạt vi phạm tiến độ giao</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Quy trình đối soát hóa đơn VAT</a></div></div><div className="flex flex-col gap-space-sm"><span className="font-label-md text-label-md font-semibold text-on-surface">Bảo chứng Thanh toán & Pháp lý</span><div className="p-space-sm bg-surface-container rounded-lg"><div className="flex items-center gap-space-xs text-secondary mb-1"><span className="material-symbols-outlined text-[18px]">shield</span><span className="font-label-sm text-label-sm font-semibold">Bảo lãnh Escrow 100%</span></div><p className="font-body-sm text-body-sm text-on-surface-variant">Tiền cọc 40-70% phong tỏa an toàn ngay khi chốt PO. Tự động giải ngân theo mốc nghiệm thu thành công.</p></div></div></div><div className="mt-space-lg pt-space-md flex flex-col md:flex-row items-center justify-between text-on-surface-variant font-body-sm text-body-sm gap-space-sm"><div>© 2024 MoonMarket Enterprise Platform. Tất cả quyền được bảo lưu.</div><div className="flex gap-space-md font-label-sm text-label-sm"><span className="text-tertiary font-semibold">Hệ thống hoạt động bình thường (99.98%)</span><span>Phiên bản Hub: v4.2.0-b2b</span></div></div></div></footer>
    </div>
  );
}
