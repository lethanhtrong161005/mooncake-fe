import React from 'react';

export default function StoreSetUp({ onNavigate }) {
  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-20 w-full px-margin flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-lg"><div className="flex items-center gap-space-sm"><div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary font-headline-md font-bold">M</div><div className="flex flex-col"><div className="flex items-center gap-space-xs"><span className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">MoonMarket</span><span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">B2B Hub</span></div><span className="font-label-sm text-label-sm text-on-surface-variant">Cổng Đối Tác Xưởng Bánh</span></div></div><div className="hidden xl:flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-xs rounded-full"><div className="flex items-center gap-space-xs"><span className="w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse"></span><span className="font-label-sm text-label-sm font-semibold text-on-surface">Đang mở bán</span></div><span className="text-outline-variant font-body-sm">|</span><div className="flex items-center gap-1 text-tertiary font-label-sm text-label-sm font-semibold"><span className="material-symbols-outlined text-[16px]">verified</span><span>Đối tác Vàng (98/100)</span></div></div></div><div className="hidden md:flex flex-1 max-w-md items-center bg-surface-container-low px-space-md py-space-xs rounded-lg"><span className="material-symbols-outlined text-outline text-[20px] mr-space-xs">search</span><input className="bg-transparent w-full text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none" placeholder="Tra cứu mã đơn B2B, SKU bánh, phiên RFQ..." type="text"/></div><div className="flex items-center gap-space-md"><div className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"><span className="material-symbols-outlined text-on-surface-variant text-[22px]">notifications</span><span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-on-primary text-[10px] font-bold rounded-full flex items-center justify-center">5</span></div><div className="flex items-center gap-space-sm pl-space-sm"><div className="hidden lg:flex flex-col text-right"><span className="font-label-md text-label-md font-semibold text-on-surface">Xưởng Tràng An Bakery</span><span className="font-label-sm text-label-sm text-on-surface-variant">Admin: Trần Đức Thắng</span></div><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></div><div className="w-full px-margin bg-surface-container-lowest"><nav className="flex items-center gap-space-xs overflow-x-auto py-space-xs" data-active-classes="bg-primary-container text-on-primary font-semibold shadow-sm"><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="dashboard-doanh-so" href="#">Dashboard & Doanh số</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="san-pham-khuyen-mai" href="#">Sản phẩm & Khuyến mãi (Bậc thang)</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="don-hang-dong-goi-b2b" href="#">Đơn hàng & Đóng gói B2B</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="dau-thau-rfq-bao-gia" href="#">Đấu thầu RFQ & Báo giá</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="hop-dong-milestone" href="#">Hợp đồng & Milestone</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="giao-van-vi-escrow" href="#">Giao vận & Ví Escrow</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="cai-dat-gian-hang" href="#">Cài đặt gian hàng</a></nav></div></header><main className="w-full pt-20 bg-surface min-h-screen"><div className="flex flex-col w-full">

<div className="w-full bg-surface-container-lowest px-margin py-space-md shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-md flex-shrink-0">
<span className="material-symbols-outlined text-[28px]" style={{"fontVariationSettings": "'FILL' 1"}}>storefront</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs flex-wrap">
<h1 className="font-headline-sm text-headline-sm text-on-surface truncate">Cài Đặt Gian Hàng & Tùy Biến Giao Diện Shop</h1>
<span className="px-space-xs py-0.5 rounded bg-tertiary/10 text-tertiary font-label-sm text-label-sm uppercase font-semibold">Đối tác Vàng B2B</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">Cấu hình định danh pháp lý xưởng, hồ sơ năng lực tiêu chuẩn ISO & phòng điều khiển thiết kế storefront theo thời gian thực.</p>
</div>
</div>

<div className="flex items-center gap-space-sm self-stretch md:self-auto justify-end">
<div className="flex items-center bg-surface-container-high p-1 rounded-xl shadow-inner">
<button className="flex items-center gap-space-xs px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-all bg-surface-container-lowest text-primary font-semibold shadow-sm" id="tabBtn1" >
<span className="material-symbols-outlined text-[18px]">verified</span>
<span>1. Hồ Sơ & Pháp Lý (#3)</span>
</button>
<button className="flex items-center gap-space-xs px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-all text-on-surface-variant hover:text-on-surface font-medium" id="tabBtn2" >
<span className="material-symbols-outlined text-[18px]">palette</span>
<span>2. Tùy Biến & Live Preview (#4)</span>
</button>
</div>
</div>
</div>
<div className="px-margin py-space-lg w-full max-w-[1440px] mx-auto">



<div className="flex flex-col gap-space-lg" id="tabContent1">

<div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
<div className="flex items-start gap-space-md">
<div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[24px]">power_settings_new</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<span className="font-title-md text-title-md text-on-surface">Trạng thái vận hành Gian Hàng B2B:</span>
<span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-tertiary-container/30 text-tertiary font-label-sm text-label-sm font-semibold" id="shopStatusBadge">
<span className="w-2 h-2 rounded-full bg-tertiary"></span> Đang Hoạt Động (Công khai)
              </span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Khi tạm ẩn, các đơn hàng B2B, hợp đồng RFQ và lệnh giao trong kỳ vẫn tiếp tục bình thường nhưng sản phẩm sẽ không hiển thị trên danh mục tìm kiếm công khai cho các đoàn thể thu mua mới.
            </p>
</div>
</div>
<div className="flex items-center gap-space-sm pl-space-lg lg:pl-0">
<label className="relative inline-flex items-center cursor-pointer select-none">
<input defaultChecked className="sr-only peer" id="shopStatusToggle"  type="checkbox"/>
<div className="w-14 h-8 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-surface-container-lowest after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-tertiary"></div>
</label>
<span className="font-label-md text-label-md font-semibold text-tertiary whitespace-nowrap" id="shopToggleLabel">Đang mở bán</span>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

<div className="lg:col-span-7 flex flex-col gap-space-lg">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between pb-space-xs">
<div className="flex items-center gap-space-xs text-primary">
<span className="material-symbols-outlined text-[20px]">badge</span>
<span className="font-title-md text-title-md font-semibold text-on-surface">Định Danh Thương Hiệu Xưởng</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high px-space-xs py-0.5 rounded">ID: MKT-B2B-8831</span>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-medium text-on-surface">Tên gian hàng chính thức <span className="text-primary">*</span></label>
<div className="flex items-center bg-surface-container-low rounded-lg px-space-md py-space-sm focus-within:bg-surface-container-lowest transition-colors shadow-inner">
<span className="material-symbols-outlined text-outline text-[20px] mr-space-sm">store</span>
<input className="bg-transparent w-full text-on-surface font-title-md text-title-md focus:outline-none" id="shopNameInput" placeholder="Nhập tên xưởng bánh..." type="text" value="Xưởng Bánh Nghệ Nhân Tràng An"/>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Tên pháp nhân hiển thị trên hóa đơn VAT và hợp đồng bảo trợ Escrow MoonMarket.</span>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-medium text-on-surface">Đường dẫn định danh (Slug URL B2B)</label>
<div className="flex flex-col sm:flex-row items-stretch gap-space-xs">
<div className="flex-1 flex items-center bg-surface-container-low rounded-lg px-space-md py-space-sm shadow-inner overflow-hidden">
<span className="font-data-mono text-data-mono text-outline select-none">moonmarket.vn/shop/</span>
<input className="bg-transparent flex-1 font-data-mono text-data-mono font-semibold text-on-surface focus:outline-none min-w-0" id="shopSlugInput" type="text" value="trang-an-bakery"/>
</div>
<div className="flex items-center gap-space-xs">
<button className="px-space-md py-space-sm bg-surface-container text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-container-high transition-colors flex items-center gap-1 shadow-sm"  type="button">
<span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
<span>Kiểm tra</span>
</button>
<button className="px-space-md py-space-sm bg-primary-fixed text-on-primary-fixed font-label-md text-label-md rounded-lg hover:bg-primary-fixed-dim transition-colors flex items-center gap-1 shadow-sm"  type="button">
<span className="material-symbols-outlined text-[16px]">content_copy</span>
<span id="copyBtnText">Copy Link</span>
</button>
</div>
</div>
<div className="flex items-center gap-space-xs text-tertiary font-label-sm text-label-sm" id="slugFeedback">
<span className="material-symbols-outlined text-[14px]">done_all</span>
<span>Đường dẫn khả dụng và đã được cấp chứng nhận SSL bảo mật cấp xưởng.</span>
</div>
</div>

<div className="flex flex-col gap-space-md pt-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface">Bộ nhận diện trực quan xưởng (Logo & Banner)</span>

<div className="relative w-full rounded-xl overflow-hidden bg-surface-container-high aspect-[1200/320] shadow-inner group">
<div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Panoramic artisan bakery master workshop with copper baking pans, warm hearth glow, handcrafted traditional mooncakes, and elegant harvest moon festival decorations in ruby and amber lighting." id="bannerDisplay" style={{"backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBwDeuye1qqRH9V01CMj1HT_b8w7tesG5fYBgdPNfOmijHIDr0eTx9MMDQFAdz4W73jxobOH7hYHJW2PweB48Iqc3lFz2yqlA4Ug4o5fZp19aYuPBxULUX9aS_5AAWOOozUpxzmmxTY6phrvutMIkZTua_tGPhoQ-NE6aysa0Ub2lq2YQOB7lIZWLsFtclb3HRTeghl63HjEZHW4wcMmG2dZMfGRu_BWFeyeERIuY7u6rjLQW44NaXu')"}}></div>
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-inverse-surface/20 to-transparent flex items-end justify-between p-space-md">
<div className="text-inverse-on-surface">
<span className="font-label-sm text-label-sm bg-primary/90 px-space-xs py-0.5 rounded text-on-primary uppercase font-bold">Banner Tiêu Chuẩn B2B</span>
<p className="font-body-sm text-body-sm text-inverse-on-surface/90 mt-1">Kích thước chuẩn: 1200 × 320 px (JPG/PNG ≤ 2MB)</p>
</div>
<button className="px-space-md py-space-xs bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-container-lowest transition-all shadow-md flex items-center gap-1"  type="button">
<span className="material-symbols-outlined text-[16px]">upload_file</span>
<span>Đổi ảnh bìa</span>
</button>
</div>
</div>

<div className="flex flex-col sm:flex-row items-center gap-space-lg">
<div className="relative flex-shrink-0">
<div className="w-24 h-24 rounded-2xl bg-surface-container-lowest shadow-md p-1.5 overflow-hidden">
<img className="w-full h-full object-cover rounded-xl" data-alt="Traditional round crest seal logo for Vietnamese artisan mooncake bakery, featuring a golden full moon, calligraphy typography of Trang An, in deep vermilion and burnished gold background." id="logoDisplay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3bSoh6qrRmcE9cx0MFXwIanzukpiPaESIYYrhepLhC45cOV5NqBciZQc3hyAAQba7FDTGp-Qnw4SZW5Ks3mo-DB2vTs7xKLJ6uJgQSivkxTxUPKMpMciCf4ya-Mnm1XnDcVlvZtRyh6s5CHq6SrRjnWH3CpqLTvq8eAQ9iY_5MzIkltsMU-5KsFygCAA5Ne33rIn6YgAVZA31Br5DG19jEhx0dpkjR_1sPudjxeQrGSmafG7wv99m"/>
</div>
<button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-on-primary shadow-lg flex items-center justify-center hover:bg-primary-container transition-transform active:scale-95"  type="button">
<span className="material-symbols-outlined text-[16px]">edit</span>
</button>
</div>
<div className="flex flex-col justify-center gap-1 text-center sm:text-left">
<span className="font-title-md text-title-md font-semibold text-on-surface">Biểu trưng xưởng (Logo Icon)</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Khuyến nghị tỉ lệ 1:1, tối thiểu 500x500px, định dạng PNG nền trong suốt để in dập nổi hợp đồng B2B.</span>
<div className="flex items-center gap-space-xs text-tertiary font-label-sm text-label-sm mt-1">
<span className="material-symbols-outlined text-[16px]">verified_user</span>
<span>Đã xác minh dấu mộc điện tử</span>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-medium text-on-surface">Năng lực sản xuất tối đa</label>
<div className="flex items-center bg-surface-container-low rounded-lg px-space-md py-space-sm shadow-inner">
<span className="material-symbols-outlined text-secondary text-[20px] mr-space-sm">factory</span>
<input className="bg-transparent w-full text-on-surface font-title-md text-title-md font-semibold focus:outline-none" type="text" value="50.000 hộp / mùa vụ"/>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Cam kết công suất cung ứng RFQ cấp tập đoàn.</span>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-medium text-on-surface">Thời gian xuất xưởng mẫu</label>
<div className="flex items-center bg-surface-container-low rounded-lg px-space-md py-space-sm shadow-inner">
<span className="material-symbols-outlined text-tertiary text-[20px] mr-space-sm">timer</span>
<input className="bg-transparent w-full text-on-surface font-title-md text-title-md focus:outline-none" type="text" value="24h - 48h đối với Sample Box"/>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Thời gian chuẩn bị hộp mẫu thử theo yêu cầu.</span>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-medium text-on-surface">Địa chỉ nhà máy & Cơ sở sản xuất thực địa</label>
<div className="flex items-start bg-surface-container-low rounded-lg px-space-md py-space-sm shadow-inner">
<span className="material-symbols-outlined text-outline text-[20px] mr-space-sm mt-0.5">location_on</span>
<textarea className="bg-transparent w-full text-on-surface font-body-md text-body-md focus:outline-none resize-none" rows="2">Lô CN-08, Đường CN5, Cụm Công nghiệp Nam Từ Liêm, Phường Phương Canh, Quận Nam Từ Liêm, TP. Hà Nội</textarea>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-medium text-on-surface">Giới thiệu nghệ nhân & Tôn chỉ sản xuất</label>
<textarea className="bg-surface-container-low rounded-lg p-space-md text-on-surface font-body-md text-body-md focus:outline-none shadow-inner resize-none" rows="3">Kế thừa bí quyết làm bánh cổ truyền Tràng An hơn 40 năm kết hợp cùng dây chuyền tự động hóa đạt chuẩn ISO 22000. Chuyên cung cấp các dòng bánh nướng, bánh dẻo thập cẩm truyền thống, lava trứng muối và hạt thực dưỡng cao cấp cho doanh nghiệp top Fortune 500 tại Việt Nam.</textarea>
</div>
</div>
</div>

<div className="lg:col-span-5 flex flex-col gap-space-lg">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between pb-space-xs">
<div className="flex items-center gap-space-xs text-tertiary">
<span className="material-symbols-outlined text-[22px]" style={{"fontVariationSettings": "'FILL' 1"}}>gavel</span>
<span className="font-title-md text-title-md font-semibold text-on-surface">Hồ Sơ Pháp Lý Đã Kiểm Duyệt</span>
</div>
<span className="px-space-xs py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">Đạt chuẩn 100%</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Bộ hồ sơ đã được tổ chức giám định độc lập và ban quản lý MoonMarket ký duyệt số thực. Tự động hiển thị huy hiệu xác thực trên mọi hợp đồng B2B.</p>

<div className="flex flex-col gap-space-sm mt-space-xs">

<div className="bg-surface-container-low hover:bg-surface-container transition-all rounded-xl p-space-md shadow-sm flex items-start gap-space-md">
<div className="w-12 h-12 rounded-lg bg-surface-container-lowest text-tertiary shadow-sm flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-[28px]">verified</span>
</div>
<div className="flex flex-col flex-1 min-w-0">
<div className="flex items-center justify-between gap-space-xs">
<span className="font-title-md text-title-md font-semibold text-on-surface truncate">Chứng nhận ISO 22000:2018</span>
<span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
</div>
<span className="font-data-mono text-data-mono text-on-surface-variant">Số hiệu: VN-FSMS/2022-8991</span>
<div className="flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm mt-1">
<span>Cấp ngày: 15/04/2023</span>
<span>•</span>
<span className="text-tertiary font-semibold">Còn hạn đến: 14/04/2026</span>
</div>
<div className="flex items-center gap-space-md mt-space-xs pt-space-xs">
<a className="font-label-sm text-label-sm text-primary font-semibold hover:underline flex items-center gap-0.5" href="#">
<span className="material-symbols-outlined text-[14px]">visibility</span> Xem bản scan PDF
                    </a>
<a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface flex items-center gap-0.5" href="#">
<span className="material-symbols-outlined text-[14px]">download</span> Tải bản sao công chứng
                    </a>
</div>
</div>
</div>

<div className="bg-surface-container-low hover:bg-surface-container transition-all rounded-xl p-space-md shadow-sm flex items-start gap-space-md">
<div className="w-12 h-12 rounded-lg bg-surface-container-lowest text-primary shadow-sm flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-[28px]">health_and_safety</span>
</div>
<div className="flex flex-col flex-1 min-w-0">
<div className="flex items-center justify-between gap-space-xs">
<span className="font-title-md text-title-md font-semibold text-on-surface truncate">Giấy chứng nhận ATTP số 452/2024</span>
<span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
</div>
<span className="font-data-mono text-data-mono text-on-surface-variant">Cục An Toàn Thực Phẩm Hà Nội phê duyệt</span>
<div className="flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm mt-1">
<span>Phạm vi: Sản xuất bánh trung thu truyền thống & hiện đại</span>
</div>
<div className="flex items-center gap-space-md mt-space-xs pt-space-xs">
<a className="font-label-sm text-label-sm text-primary font-semibold hover:underline flex items-center gap-0.5" href="#">
<span className="material-symbols-outlined text-[14px]">visibility</span> Xem giấy phép
                    </a>
<span className="font-label-sm text-label-sm text-tertiary bg-surface-container-lowest px-1.5 py-0.5 rounded">Hợp lệ mùa 2024</span>
</div>
</div>
</div>

<div className="bg-surface-container-low hover:bg-surface-container transition-all rounded-xl p-space-md shadow-sm flex items-start gap-space-md">
<div className="w-12 h-12 rounded-lg bg-surface-container-lowest text-secondary shadow-sm flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-[28px]">biotech</span>
</div>
<div className="flex flex-col flex-1 min-w-0">
<div className="flex items-center justify-between gap-space-xs">
<span className="font-title-md text-title-md font-semibold text-on-surface truncate">Kết quả kiểm nghiệm vi sinh lô bánh</span>
<span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
</div>
<span className="font-data-mono text-data-mono text-on-surface-variant">Viện Kiểm Nghiệm ATVSTP Quốc Gia (NIFC)</span>
<div className="flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm mt-1">
<span>Lô: 08-TT2024</span>
<span>•</span>
<span className="text-tertiary font-semibold">Chỉ số E.coli, Coliforms: Âm tính</span>
</div>
<div className="flex items-center gap-space-md mt-space-xs pt-space-xs">
<a className="font-label-sm text-label-sm text-primary font-semibold hover:underline flex items-center gap-0.5" href="#">
<span className="material-symbols-outlined text-[14px]">visibility</span> Báo cáo phân tích NIFC
                    </a>
</div>
</div>
</div>
</div>

<div className="p-space-md bg-surface-container-low rounded-xl flex flex-col gap-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface">Cập nhật bổ sung giấy kiểm định mới</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">Tải lên chứng nhận kiểm định Halal, HACCP Codex hoặc hợp đồng bảo hiểm trách nhiệm sản phẩm (Product Liability).</p>
<button className="mt-space-xs w-full py-space-sm bg-surface-container text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-space-xs shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">cloud_upload</span>
<span>Tải tệp PDF hồ sơ thẩm định (Tối đa 15MB)</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md font-semibold text-on-surface">Chỉ Số Sẵn Sàng Giao Vận (B2B SLA)</span>
<span className="font-label-sm text-label-sm text-tertiary font-bold bg-tertiary-container/30 px-space-xs py-0.5 rounded">99.4% Đạt chuẩn</span>
</div>
<div className="flex flex-col gap-space-sm">
<div className="flex flex-col gap-1">
<div className="flex justify-between font-label-sm text-label-sm">
<span className="text-on-surface">Tỉ lệ đáp ứng đơn gấp (&lt;72 giờ)</span>
<span className="font-bold text-primary">96%</span>
</div>
<div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{"width": "96%"}}></div>
</div>
</div>
<div className="flex flex-col gap-1">
<div className="flex justify-between font-label-sm text-label-sm">
<span className="text-on-surface">Sản lượng khay nướng tự động hóa</span>
<span className="font-bold text-secondary">88%</span>
</div>
<div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
<div className="bg-secondary-container h-full rounded-full" style={{"width": "88%"}}></div>
</div>
</div>
<div className="flex flex-col gap-1">
<div className="flex justify-between font-label-sm text-label-sm">
<span className="text-on-surface">Độ hài lòng mẫu thử doanh nghiệp</span>
<span className="font-bold text-tertiary">4.9 / 5.0 ★</span>
</div>
<div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
<div className="bg-tertiary h-full rounded-full" style={{"width": "98%"}}></div>
</div>
</div>
</div>

<div className="pt-space-xs flex justify-end">
<button className="w-full py-space-sm bg-primary text-on-primary font-label-md text-label-md font-semibold rounded-lg hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-space-xs active:scale-[0.99]"  type="button">
<span className="material-symbols-outlined text-[18px]">save</span>
<span>Lưu Hồ Sơ & Cập Nhật Gian Hàng</span>
</button>
</div>
</div>
</div>
</div>
</div>



<div className="hidden flex flex-col gap-space-lg" id="tabContent2">

<div className="w-full bg-secondary-fixed/50 rounded-xl p-space-md shadow-sm flex items-center gap-space-md">
<span className="material-symbols-outlined text-secondary text-[24px] flex-shrink-0" style={{"fontVariationSettings": "'FILL' 1"}}>info</span>
<div className="flex-1 min-w-0">
<p className="font-label-md text-label-md font-semibold text-on-secondary-fixed">
            Lưu ý bảo toàn dữ liệu thương mại B2B:
          </p>
<p className="font-body-sm text-body-sm text-on-secondary-fixed-variant">
            Thay đổi template và màu sắc giao diện không làm ảnh hưởng đến danh mục sản phẩm, bảng giá sỉ bậc thang và dữ liệu hợp đồng RFQ đang đàm phán với khách hàng.
          </p>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

<div className="lg:col-span-5 flex flex-col gap-space-md">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between pb-space-xs">
<div className="flex items-center gap-space-xs text-primary">
<span className="material-symbols-outlined text-[22px]">auto_awesome_motion</span>
<span className="font-title-md text-title-md font-semibold text-on-surface">Thư Viện 5 Template Giao Diện</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Bản quyền độc quyền B2B</span>
</div>

<div className="flex flex-col gap-space-sm" id="templateList">

<div className="cursor-pointer rounded-xl p-space-md transition-all shadow-md bg-surface-container-low relative group" id="card-t1" >
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined text-[10px]" style={{"fontVariationSettings": "'FILL' 1"}}>done</span>
</span>
<span className="font-title-md text-title-md font-semibold text-on-surface">Template 1: Di Sản Hoàng Gia</span>
</div>
<span className="px-space-xs py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold" id="badge-t1">Đang chọn</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Đỏ Ruby & Vàng Kim ấm áp, họa tiết trăng rằm hoa sen tinh xảo. Phù hợp xưởng bánh truyền thống cao cấp phục vụ doanh nghiệp lớn.</p>
<div className="flex items-center gap-space-xs mt-space-xs">
<span className="w-4 h-4 rounded-full bg-[#760009]" title="Ruby Crimson"></span>
<span className="w-4 h-4 rounded-full bg-[#FE932C]" title="Amber Gold"></span>
<span className="w-4 h-4 rounded-full bg-[#FFF8F5]" title="Silk Warm White"></span>
<span className="font-label-sm text-label-sm text-outline ml-2 font-data-mono">#760009 / #FE932C</span>
</div>
</div>

<div className="cursor-pointer rounded-xl p-space-md transition-all shadow-sm bg-surface-container-lowest hover:bg-surface-container-low relative group" id="card-t2" >
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="w-4 h-4 rounded-full bg-surface-container-highest flex items-center justify-center text-outline"></span>
<span className="font-title-md text-title-md font-semibold text-on-surface">Template 2: Nghệ Nhân Truyền Thống</span>
</div>
<span className="hidden px-space-xs py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold" id="badge-t2">Đang chọn</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Tông trầm cổ điển nâu gỗ gụ & đồng thau. Tôn vinh bề dày gia truyền, thợ làm bánh thủ công bậc thầy.</p>
<div className="flex items-center gap-space-xs mt-space-xs">
<span className="w-4 h-4 rounded-full bg-[#59413E]" title="Mahogany Wood"></span>
<span className="w-4 h-4 rounded-full bg-[#904D00]" title="Bronze"></span>
<span className="w-4 h-4 rounded-full bg-[#EAE1DA]" title="Old Parchment"></span>
<span className="font-label-sm text-label-sm text-outline ml-2 font-data-mono">#59413E / #904D00</span>
</div>
</div>

<div className="cursor-pointer rounded-xl p-space-md transition-all shadow-sm bg-surface-container-lowest hover:bg-surface-container-low relative group" id="card-t3" >
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="w-4 h-4 rounded-full bg-surface-container-highest flex items-center justify-center text-outline"></span>
<span className="font-title-md text-title-md font-semibold text-on-surface">Template 3: Tinh Tế Hiện Đại</span>
</div>
<span className="hidden px-space-xs py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold" id="badge-t3">Đang chọn</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Tối giản phong cách B2B Bắc Âu, bảng dữ liệu SKU trực quan, tối ưu cho nhà thu mua đối chiếu thông số bao bì.</p>
<div className="flex items-center gap-space-xs mt-space-xs">
<span className="w-4 h-4 rounded-full bg-[#1F1B17]" title="Nordic Charcoal"></span>
<span className="w-4 h-4 rounded-full bg-[#8D706D]" title="Slate Warm"></span>
<span className="w-4 h-4 rounded-full bg-[#F6ECE6]" title="Clean Paper"></span>
<span className="font-label-sm text-label-sm text-outline ml-2 font-data-mono">#1F1B17 / #8D706D</span>
</div>
</div>

<div className="cursor-pointer rounded-xl p-space-md transition-all shadow-sm bg-surface-container-lowest hover:bg-surface-container-low relative group" id="card-t4" >
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="w-4 h-4 rounded-full bg-surface-container-highest flex items-center justify-center text-outline"></span>
<span className="font-title-md text-title-md font-semibold text-on-surface">Template 4: Thuần Khiết Thiên Nhiên</span>
</div>
<span className="hidden px-space-xs py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold" id="badge-t4">Đang chọn</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Xanh ngọc bích & đồi trà olong, chuyên biệt cho xưởng bánh chay thực dưỡng, ít đường và organic.</p>
<div className="flex items-center gap-space-xs mt-space-xs">
<span className="w-4 h-4 rounded-full bg-[#00402F]" title="Emerald Jade"></span>
<span className="w-4 h-4 rounded-full bg-[#175844]" title="Matcha Green"></span>
<span className="w-4 h-4 rounded-full bg-[#B0F0D6]" title="Mint Mist"></span>
<span className="font-label-sm text-label-sm text-outline ml-2 font-data-mono">#00402F / #175844</span>
</div>
</div>

<div className="cursor-pointer rounded-xl p-space-md transition-all shadow-sm bg-surface-container-lowest hover:bg-surface-container-low relative group" id="card-t5" >
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="w-4 h-4 rounded-full bg-surface-container-highest flex items-center justify-center text-outline"></span>
<span className="font-title-md text-title-md font-semibold text-on-surface">Template 5: Đỉnh Cao Luxury Sơn Mài</span>
</div>
<div className="flex items-center gap-1">
<span className="px-space-xs py-0.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm uppercase font-bold tracking-wider">Premium</span>
<span className="hidden px-space-xs py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold" id="badge-t5">Đang chọn</span>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Huyền bí đen sơn mài & nhũ vàng kim loại sang trọng. Lý tưởng cho set quà VIP ngoại giao và đối tác chiến lược cấp cao.</p>
<div className="flex items-center gap-space-xs mt-space-xs">
<span className="w-4 h-4 rounded-full bg-[#1F1B17]" title="Gloss Lacquer"></span>
<span className="w-4 h-4 rounded-full bg-[#FE932C]" title="Gold Leaf"></span>
<span className="w-4 h-4 rounded-full bg-[#342F2B]" title="Deep Obsidian"></span>
<span className="font-label-sm text-label-sm text-outline ml-2 font-data-mono">#1F1B17 / #FE932C</span>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between pb-space-xs">
<div className="flex items-center gap-space-xs text-primary">
<span className="material-symbols-outlined text-[20px]">tune</span>
<span className="font-title-md text-title-md font-semibold text-on-surface">Bảng Tùy Chỉnh Màu & Nút Bấm</span>
</div>
<button className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1"  type="button">
<span className="material-symbols-outlined text-[14px]">refresh</span>
<span>Khôi phục mẫu</span>
</button>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-medium text-on-surface">Màu chủ đạo (Primary)</label>
<div className="flex items-center bg-surface-container-low rounded-lg p-space-xs shadow-inner">
<input className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent" id="primaryColorPicker"  type="color" value="#760009"/>
<input className="bg-transparent font-data-mono text-data-mono font-semibold text-on-surface px-space-xs focus:outline-none uppercase w-full" id="primaryColorText"  type="text" value="#760009"/>
</div>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-medium text-on-surface">Màu phụ / Điểm nhấn</label>
<div className="flex items-center bg-surface-container-low rounded-lg p-space-xs shadow-inner">
<input className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent" id="secondaryColorPicker"  type="color" value="#FE932C"/>
<input className="bg-transparent font-data-mono text-data-mono font-semibold text-on-surface px-space-xs focus:outline-none uppercase w-full" id="secondaryColorText"  type="text" value="#FE932C"/>
</div>
</div>
</div>

<div className="flex flex-col gap-space-xs pt-space-xs">
<div className="flex justify-between font-label-md text-label-md">
<span className="text-on-surface font-medium">Độ bo góc nút bấm & Thẻ (Border Radius)</span>
<span className="font-data-mono text-primary font-bold" id="radiusValueLabel">8px (Hài hòa)</span>
</div>
<input className="w-full accent-primary cursor-pointer h-2 bg-surface-container-high rounded-lg appearance-none" id="radiusSlider" max="20" min="0"  step="2" type="range" value="8"/>
<div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>0px (Vuông vức B2B)</span>
<span>8px (Hài hòa)</span>
<span>20px (Mềm mại)</span>
</div>
</div>

<div className="flex flex-col gap-space-xs pt-space-xs">
<label className="font-label-md text-label-md font-medium text-on-surface">Tỉ lệ hiển thị tiêu đề & cỡ chữ</label>
<div className="grid grid-cols-3 gap-space-xs">
<button className="py-space-xs rounded-lg font-label-sm text-label-sm bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-medium" id="fontBtn-compact"  type="button">Cô đọng</button>
<button className="py-space-xs rounded-lg font-label-sm text-label-sm bg-primary text-on-primary font-semibold shadow-sm" id="fontBtn-standard"  type="button">Tiêu chuẩn</button>
<button className="py-space-xs rounded-lg font-label-sm text-label-sm bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-medium" id="fontBtn-large"  type="button">Thoáng đãng</button>
</div>
</div>

<div className="flex flex-col sm:flex-row items-center gap-space-sm pt-space-sm">
<button className="w-full sm:w-auto flex-1 py-space-sm bg-surface-container text-on-surface font-label-md text-label-md font-medium rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1"  type="button">
<span className="material-symbols-outlined text-[18px]">undo</span>
<span>Khôi phục mặc định</span>
</button>
<button className="w-full sm:w-auto flex-1 py-space-sm bg-primary text-on-primary font-label-md text-label-md font-semibold rounded-lg hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-1 active:scale-[0.99]"  type="button">
<span className="material-symbols-outlined text-[18px]">check_circle</span>
<span>Lưu & Áp Dụng Ngay</span>
</button>
</div>
</div>
</div>

<div className="lg:col-span-7 flex flex-col gap-space-md sticky top-24">
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-lg flex flex-col gap-space-md">

<div className="flex items-center justify-between pb-space-xs">
<div className="flex items-center gap-space-xs">
<span className="w-3 h-3 rounded-full bg-red-400"></span>
<span className="w-3 h-3 rounded-full bg-amber-400"></span>
<span className="w-3 h-3 rounded-full bg-green-400"></span>
<span className="font-data-mono text-data-mono text-on-surface-variant font-medium ml-2">Cửa sổ Xem trước Trực tiếp (Live Interactive Preview)</span>
</div>

<div className="flex items-center bg-surface-container-high p-0.5 rounded-lg">
<button className="px-space-sm py-1 rounded bg-surface-container-lowest text-primary font-label-sm text-label-sm font-semibold shadow-sm flex items-center gap-1" id="btnPreviewDesktop"  type="button">
<span className="material-symbols-outlined text-[16px]">desktop_windows</span>
<span>Desktop B2B</span>
</button>
<button className="px-space-sm py-1 rounded text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-medium flex items-center gap-1" id="btnPreviewMobile"  type="button">
<span className="material-symbols-outlined text-[16px]">smartphone</span>
<span>Mobile Giao vận</span>
</button>
</div>
</div>

<div className="w-full flex justify-center bg-surface-container-high p-space-sm rounded-xl overflow-hidden transition-all duration-300" id="previewFrameWrapper">

<div className="w-full bg-surface rounded-lg shadow-sm overflow-hidden flex flex-col transition-all duration-300" id="previewCanvas">

<div className="relative w-full h-36 bg-cover bg-center" data-alt="Artisan bakery production floor for traditional Mooncake production with festive crimson lanterns and modern clean stainless steel ovens." id="simulatedBanner" style={{"backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAs6sq04mQ-3u31XH1e7IgzogqUfSXDj-n5G8ai3TvLg0QOvL_L6P8BTb3ECcw0QolJzfvtm9drz8y0aUHpJJjnxS5mEGrTgeEBeUNclOY2oPar6U-84AKNXCZK5fcWA9to3-uTVgw3TmW_NA6sKOYA3nCzYl_Yu06tWUsc_wtQAYx0mgqIZTUyZyb1BT6rdrpLCdnVTkxhp3Cf_Ipl6uFf8vcY-Wy9ajyqICy4aj7M05vqCTpOtys')"}}>
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-space-md">
<div className="flex items-center gap-space-md w-full">
<div className="w-14 h-14 rounded-lg bg-surface-container-lowest shadow-md p-1 flex-shrink-0" id="simulatedLogo">
<img className="w-full h-full object-cover rounded" data-alt="Seal logo of Trang An Bakery artisan workshop in Hanoi." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt8H4AtaDksusVS8RiqIJQoA0kF5SuzYmjQnx_xKXSwXJAzNGtZIVgoeb5rcGbBA0li3f2hscKQx9MZH_X3kRXfB61kE5BKjM_jiYWn9acs9d84YrRkDY1QJw489g__0zSzOd1IyqQwCgtJCbUCln1sMS6u_HGu893ae6kcnhaa388cRlrhzxx5d02tjqlhL_DTUcBIP7tOB2QvvMMrYDEtlGVfdJBD9Qk4swi1fHHf4vm2iaEHUvt"/>
</div>
<div className="flex flex-col text-white flex-1 min-w-0">
<div className="flex items-center gap-space-xs">
<h2 className="font-headline-sm text-headline-sm font-bold truncate" id="simulatedShopTitle">Xưởng Bánh Nghệ Nhân Tràng An</h2>
<span className="material-symbols-outlined text-tertiary-fixed text-[18px]">verified</span>
</div>
<p className="font-body-sm text-body-sm text-white/80 truncate">Cụm CN Nam Từ Liêm • Công suất 50.000 hộp/mùa • ISO 22000</p>
</div>
<div className="hidden sm:flex items-center gap-space-xs">
<button className="px-space-md py-1.5 text-white font-label-sm text-label-sm font-semibold rounded shadow-md transition-all" id="previewFollowBtn" style={{"backgroundColor": "#760009", "borderRadius": "8px"}} type="button">
                          + Lưu Hồ Sơ Xưởng
                        </button>
</div>
</div>
</div>
</div>

<div className="w-full bg-surface-container-lowest px-space-md py-space-xs shadow-sm flex items-center justify-between text-on-surface font-label-sm text-label-sm">
<div className="flex items-center gap-space-md overflow-x-auto py-1">
<span className="font-semibold pb-0.5 border-b-2" id="previewNavActive" style={{"color": "#760009", "borderColor": "#760009"}}>Tất Cả Hộp Quà Doanh Nghiệp (18)</span>
<span className="text-on-surface-variant hover:text-on-surface cursor-pointer whitespace-nowrap">Hộp 4 Bánh Nghệ Nhân</span>
<span className="text-on-surface-variant hover:text-on-surface cursor-pointer whitespace-nowrap">Hộp 6 Bánh Phú Quý</span>
<span className="text-on-surface-variant hover:text-on-surface cursor-pointer whitespace-nowrap">Đấu Thầu RFQ Logo Riêng</span>
</div>
<span className="material-symbols-outlined text-outline text-[18px] cursor-pointer">search</span>
</div>

<div className="p-space-md flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="flex flex-col">
<span className="font-title-md text-title-md font-bold text-on-surface" id="previewSectionHeader">Bộ Sưu Tập Tiêu Biểu Mùa Trăng 2024</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Chiết khấu bậc thang theo số lượng từ 50 - 5.000 hộp</span>
</div>
<span className="px-space-xs py-0.5 rounded font-label-sm text-label-sm font-semibold" id="previewTagHighlight" style={{"backgroundColor": "#FE932C", "color": "#ffffff", "borderRadius": "8px"}}>
                      Ưu Đãi Early Bird -15%
                    </span>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm" id="simulatedProductGrid">

<div className="bg-surface-container-lowest rounded p-space-sm shadow-sm flex flex-col justify-between" id="prodCard1" style={{"borderRadius": "8px"}}>
<div className="relative w-full aspect-[4/3] rounded overflow-hidden bg-surface-container-high" style={{"borderRadius": "6px"}}>
<img className="w-full h-full object-cover" data-alt="Corporate Mid-Autumn mooncake gift box with golden dragon embossing and red velvet lining containing four artisan mooncakes." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSf1QSuTC4mYcAHPNqTTPhKr33n5Smh-8nbniJKLUT28WrDn6tb5s0oU2a1NUkvL3V6Y5zxi5h8gKKp6ut90LDFLDRZg7-GC3PZFJCIw_UPg9HCb1JxbGByMZxKqDRKBWIPv2FRyCDic4N_RZ7qFHnUqMR7fNCcuJwPyc4gRFRewOjIhFpWQzcavDFdIn31vPqq5xQJn4YKo_a6IFwt32ZgPPc4-HbKpxEv4l520hIwIpAMW_VFRU4"/>
<span className="absolute top-2 left-2 bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface font-label-sm text-label-sm px-1.5 py-0.5 rounded">MOQ: 50 Hộp</span>
</div>
<div className="flex flex-col gap-1 mt-2">
<span className="font-title-md text-title-md font-semibold text-on-surface line-clamp-1">Hộp Vọng Nguyệt Phú Quý (4 Bánh)</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-title-md text-title-md font-bold" id="prod1Price" style={{"color": "#760009"}}>480.000₫</span>
<span className="font-body-sm text-body-sm text-outline line-through">650.000₫</span>
<span className="font-label-sm text-label-sm font-semibold text-tertiary">(-26%)</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">Nhân thập cẩm xá xíu gà quay, vi cá hảo hạng, hạt sen nhuyễn và mè đen hoàng kim.</p>
</div>
<div className="grid grid-cols-2 gap-space-xs mt-space-sm">
<button className="py-1.5 px-space-xs text-center font-label-sm text-label-sm font-medium bg-surface-container text-on-surface rounded hover:bg-surface-container-high transition-colors" style={{"borderRadius": "8px"}} type="button">
                          Mẫu Thử
                        </button>
<button className="py-1.5 px-space-xs text-center font-label-sm text-label-sm font-semibold text-white rounded transition-opacity hover:opacity-95" id="previewBtnOrder1" style={{"backgroundColor": "#760009", "borderRadius": "8px"}} type="button">
                          Đặt Hàng Ngay
                        </button>
</div>
</div>

<div className="bg-surface-container-lowest rounded p-space-sm shadow-sm flex flex-col justify-between" id="prodCard2" style={{"borderRadius": "8px"}}>
<div className="relative w-full aspect-[4/3] rounded overflow-hidden bg-surface-container-high" style={{"borderRadius": "6px"}}>
<img className="w-full h-full object-cover" data-alt="Luxury wooden box mooncake set with laser-engraved corporate branding, brass latches, including fine tea canister." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzeCsrZ4ju340BWdqBoLIDqzGcauT16ME9R0nqfAmOs7fFsfGFzRuH2HLtULLz83VjDi3aQ6fzUnrI7xWv5xK1B_pk-tc54vbqHRxpe6H1Z_IuCmFZ0SNTWDbguDZzgUWihjQL_KSqMxpaK-D86-rw9aB8_UuGhtrBJVthnNbgffUlU1jvXRWZa2a9YcL8z8Q7PuDz5O5vitVbqTy9IoX8QY5T4oTfwqZasXyjA1PVav0GBhM4CUkG"/>
<span className="absolute top-2 left-2 bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface font-label-sm text-label-sm px-1.5 py-0.5 rounded">MOQ: 100 Hộp</span>
</div>
<div className="flex flex-col gap-1 mt-2">
<span className="font-title-md text-title-md font-semibold text-on-surface line-clamp-1">Set Gỗ Sơn Mài Thượng Hạng (6 Bánh)</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-title-md text-title-md font-bold" id="prod2Price" style={{"color": "#760009"}}>920.000₫</span>
<span className="font-body-sm text-body-sm text-outline line-through">1.250.000₫</span>
<span className="font-label-sm text-label-sm font-semibold text-tertiary">(-26%)</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">Khắc laser logo doanh nghiệp miễn phí từ 200 hộp. Kèm hũ trà Ô Long Tuyết Shan.</p>
</div>
<div className="grid grid-cols-2 gap-space-xs mt-space-sm">
<button className="py-1.5 px-space-xs text-center font-label-sm text-label-sm font-medium bg-surface-container text-on-surface rounded hover:bg-surface-container-high transition-colors" style={{"borderRadius": "8px"}} type="button">
                          Mẫu Thử
                        </button>
<button className="py-1.5 px-space-xs text-center font-label-sm text-label-sm font-semibold text-white rounded transition-opacity hover:opacity-95" id="previewBtnOrder2" style={{"backgroundColor": "#760009", "borderRadius": "8px"}} type="button">
                          Yêu Cầu RFQ
                        </button>
</div>
</div>
</div>

<div className="p-space-sm bg-surface-container rounded flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm mt-space-xs">
<div className="flex items-center gap-1 text-tertiary font-semibold">
<span className="material-symbols-outlined text-[16px]">shield_with_heart</span>
<span>Ký Quỹ Escrow An Toàn 100%</span>
</div>
<span>Cung cấp hóa đơn VAT điện tử ngay sau nghiệm thu</span>
</div>
</div>
</div>
</div>

<div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm pt-space-xs">
<div className="flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
<span className="font-label-sm text-label-sm text-on-surface">Đồng bộ Live Preview tự động (0.1ms)</span>
</div>
<span className="font-data-mono text-data-mono text-outline">Độ phân giải: <strong id="previewResolutionLabel">100% Fluid Scaled</strong></span>
</div>
</div>
</div>
</div>
</div>
</div>


</div></main><footer className="w-full bg-surface-container-low mt-space-xl shadow-[0_-1px_6px_rgba(0,0,0,0.02)]"><div className="w-full px-margin py-space-xl"><div className="grid grid-cols-1 md:grid-cols-4 gap-gutter"><div className="flex flex-col gap-space-sm"><div className="flex items-center gap-space-xs"><div className="w-7 h-7 rounded bg-primary-container flex items-center justify-center text-on-primary font-headline-sm font-bold text-sm">M</div><span className="font-headline-sm text-headline-sm font-bold text-primary">MoonMarket B2B</span></div><p className="font-body-sm text-body-sm text-on-surface-variant">Cổng vận hành thương mại & đấu thầu sản xuất bánh Trung Thu dành riêng cho xưởng bánh artisan và cơ sở sản xuất quy mô lớn.</p><div className="flex items-center gap-space-xs font-label-sm text-label-sm text-tertiary font-semibold"><span className="material-symbols-outlined text-[18px]">verified_user</span><span>Chuẩn kiểm duyệt HACCP / ISO 22000</span></div></div><div className="flex flex-col gap-space-sm"><span className="font-label-md text-label-md font-semibold text-on-surface">Hỗ trợ Xưởng bánh 24/7</span><p className="font-body-sm text-body-sm text-on-surface-variant">Hotline ưu tiên xưởng: <strong className="text-on-surface font-semibold">1800 6886 (Nhánh 2)</strong></p><p className="font-body-sm text-body-sm text-on-surface-variant">Tranh chấp & Đền bù đơn: <strong className="text-on-surface font-semibold">dispute@moonmarket.vn</strong></p><p className="font-body-sm text-body-sm text-on-surface-variant">Kỹ thuật sàn & Tích hợp ERP: 8h30 - 22h00</p></div><div className="flex flex-col gap-space-sm"><span className="font-label-md text-label-md font-semibold text-on-surface">Chính sách & Pháp chế B2B</span><div className="flex flex-col gap-space-xs"><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Quy chế bảo lãnh ký quỹ Escrow</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Cam kết tiêu chuẩn ATTP & Bao bì</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Chính sách phạt vi phạm tiến độ giao</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Quy trình đối soát hóa đơn VAT</a></div></div><div className="flex flex-col gap-space-sm"><span className="font-label-md text-label-md font-semibold text-on-surface">Bảo chứng Thanh toán & Pháp lý</span><div className="p-space-sm bg-surface-container rounded-lg"><div className="flex items-center gap-space-xs text-secondary mb-1"><span className="material-symbols-outlined text-[18px]">shield</span><span className="font-label-sm text-label-sm font-semibold">Bảo lãnh Escrow 100%</span></div><p className="font-body-sm text-body-sm text-on-surface-variant">Tiền cọc 40-70% phong tỏa an toàn ngay khi chốt PO. Tự động giải ngân theo mốc nghiệm thu thành công.</p></div></div></div><div className="mt-space-lg pt-space-md flex flex-col md:flex-row items-center justify-between text-on-surface-variant font-body-sm text-body-sm gap-space-sm"><div>© 2024 MoonMarket Enterprise Platform. Tất cả quyền được bảo lưu.</div><div className="flex gap-space-md font-label-sm text-label-sm"><span className="text-tertiary font-semibold">Hệ thống hoạt động bình thường (99.98%)</span><span>Phiên bản Hub: v4.2.0-b2b</span></div></div></div></footer>
    </div>
  );
}
