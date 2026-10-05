import React from 'react';

export default function ProductManage({ onNavigate }) {
  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-20 w-full px-margin flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-lg"><div className="flex items-center gap-space-sm"><div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary font-headline-md font-bold">M</div><div className="flex flex-col"><div className="flex items-center gap-space-xs"><span className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">MoonMarket</span><span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">B2B Hub</span></div><span className="font-label-sm text-label-sm text-on-surface-variant">Cổng Đối Tác Xưởng Bánh</span></div></div><div className="hidden xl:flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-xs rounded-full"><div className="flex items-center gap-space-xs"><span className="w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse"></span><span className="font-label-sm text-label-sm font-semibold text-on-surface">Đang mở bán</span></div><span className="text-outline-variant font-body-sm">|</span><div className="flex items-center gap-1 text-tertiary font-label-sm text-label-sm font-semibold"><span className="material-symbols-outlined text-[16px]">verified</span><span>Đối tác Vàng (98/100)</span></div></div></div><div className="hidden md:flex flex-1 max-w-md items-center bg-surface-container-low px-space-md py-space-xs rounded-lg"><span className="material-symbols-outlined text-outline text-[20px] mr-space-xs">search</span><input className="bg-transparent w-full text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none" placeholder="Tra cứu mã đơn B2B, SKU bánh, phiên RFQ..." type="text"/></div><div className="flex items-center gap-space-md"><div className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"><span className="material-symbols-outlined text-on-surface-variant text-[22px]">notifications</span><span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-on-primary text-[10px] font-bold rounded-full flex items-center justify-center">5</span></div><div className="flex items-center gap-space-sm pl-space-sm"><div className="hidden lg:flex flex-col text-right"><span className="font-label-md text-label-md font-semibold text-on-surface">Xưởng Tràng An Bakery</span><span className="font-label-sm text-label-sm text-on-surface-variant">Admin: Trần Đức Thắng</span></div><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></div><div className="w-full px-margin bg-surface-container-lowest"><nav className="flex items-center gap-space-xs overflow-x-auto py-space-xs" data-active-classes="bg-primary-container text-on-primary font-semibold shadow-sm"><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="dashboard-doanh-so" href="#">Dashboard & Doanh số</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="san-pham-khuyen-mai" href="#">Sản phẩm & Khuyến mãi (Bậc thang)</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="don-hang-dong-goi-b2b" href="#">Đơn hàng & Đóng gói B2B</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="dau-thau-rfq-bao-gia" href="#">Đấu thầu RFQ & Báo giá</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="hop-dong-milestone" href="#">Hợp đồng & Milestone</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="giao-van-vi-escrow" href="#">Giao vận & Ví Escrow</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="cai-dat-gian-hang" href="#">Cài đặt gian hàng</a></nav></div></header><main className="w-full pt-20 bg-surface min-h-screen"><div className="flex flex-col w-full">
<div className="w-full px-margin py-space-lg flex flex-col gap-space-lg">

<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-xs">
<div className="flex flex-col gap-space-xs">
<div className="flex items-center gap-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Xưởng Tràng An Bakery • ID: SUP-HN-882</span>
<span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
<span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">verified</span> Chứng nhận VSATTP HACCP v4
          </span>
</div>
<h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
          Quản lý Sản Phẩm, Biến Thể & Chiết Khấu Bậc Thang B2B
        </h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
          Cổng cấu hình danh mục sản phẩm bánh Trung Thu nguyên liệu chuẩn, kiểm soát ma trận biến thể (Variant Matrix) và cơ chế biểu phí chiết khấu sỉ tự động cho doanh nghiệp đặt số lượng lớn.
        </p>
</div>

<div className="flex items-center gap-space-sm flex-wrap">
<button className="px-space-md py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md font-semibold transition-all flex items-center gap-space-xs shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">inventory_2</span>
<span>Cập nhật tồn kho hàng loạt</span>
</button>
<button className="px-space-lg py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold transition-all flex items-center gap-space-xs shadow-md" type="button">
<span className="material-symbols-outlined text-[18px]">add_circle</span>
<span>Thêm sản phẩm mới</span>
</button>
</div>
</div>

<div className="w-full bg-surface-container-low p-1.5 rounded-xl flex items-center gap-2">
<button className="flex-1 py-2.5 px-space-md rounded-lg font-label-md text-label-md font-semibold transition-all flex items-center justify-center gap-space-xs bg-surface-container-lowest text-primary shadow-sm" id="tab-btn-catalog" >
<span className="material-symbols-outlined text-[20px]">dataset</span>
<span>Tab 1: Danh sách & Quản lý Biến thể Sản phẩm (#5)</span>
<span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-data-mono text-body-sm font-bold ml-1">3 SP</span>
</button>
<button className="flex-1 py-2.5 px-space-md rounded-lg font-label-md text-label-md font-medium text-on-surface-variant hover:text-on-surface transition-all flex items-center justify-center gap-space-xs" id="tab-btn-pricing" >
<span className="material-symbols-outlined text-[20px]">stacked_line_chart</span>
<span>Tab 2: Thiết lập Chiết khấu Bậc thang & Máy tính thử (#8)</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-data-mono text-body-sm font-bold ml-1">4 Bậc Sỉ</span>
</button>
</div>

<div className="flex flex-col gap-space-lg" id="tab-content-catalog">

<div className="w-full bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md relative overflow-hidden">
<div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
<div className="flex items-start gap-space-md">
<div className="w-10 h-10 rounded-lg bg-error-container text-on-error-container flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[22px]">warning</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-label-md text-label-md font-bold text-primary uppercase tracking-wide">Cảnh Báo Tồn Kho Thấp (Low Stock Alert)</span>
<span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">SKU: DN-BAONGU-180</span>
</div>
<p className="font-body-md text-body-md text-on-surface mt-1">
              Biến thể <strong className="font-semibold text-primary">Bánh nướng Thập cẩm Bào ngư 180g</strong> chỉ còn <span className="font-data-mono font-bold text-primary">120 chiếc</span> (Dưới mức an toàn kho sỉ khuyến nghị: 300 chiếc cho đơn MOQ 50 hộp).
            </p>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Nguy cơ thiếu hụt cấu phần cho các đơn RFQ Doanh nghiệp cần xuất hàng trong 7 ngày tới.</span>
</div>
</div>
<div className="flex items-center gap-space-xs shrink-0 self-end md:self-center">
<button className="px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-sm text-label-sm font-semibold transition-all" type="button">
            Lịch Sản Xuất Bổ Sung
          </button>
<button className="px-space-md py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold transition-all shadow-sm" type="button">
            Nhập Kho Ngay (+300)
          </button>
</div>
</div>

<div className="flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div>
<h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Danh mục Sản phẩm Đang mở bán B2B</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Click vào sản phẩm để kiểm tra và biên tập ma trận phân bổ biến thể con.</p>
</div>
<div className="flex items-center gap-space-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant">Lọc nhanh:</span>
<button className="px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-medium">Tất cả (3)</button>
<button className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-medium">Sơn mài cao cấp</button>
<button className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-medium">Hộp Nghệ Nhân</button>
<button className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-medium">Ăn kiêng / Chay</button>
</div>
</div>

<div className="grid grid-cols-1 gap-space-md">

<div className="w-full bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
<div className="p-space-md md:p-space-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md bg-surface-container-low/40">
<div className="flex items-center gap-space-md">
<img className="w-24 h-24 object-cover rounded-xl shadow-sm shrink-0" data-alt="A luxury lacquered crimson and gold Vietnamese Mid-Autumn mooncake gift box with artisan carved wooden lid, 4 gourmet mooncakes, tea tin set, warm studio lighting, commercial product photography for corporate luxury gifts" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEw34BU_y0suldBvCyZojspUJ0iiwNNedpB1p71HohwQU0FNCvoKBLprWwOlCqo22x72OUaD0oVwnr0cl-glJlLJssZmnBLYPchyiF8Urp8hhgjus58uODIafjF5cFgwfC4-Gm8jEVca3CpjWMcr0g7-yJn0Ai4Mm74AyBWfCDChqqRgUxKcJp7gqVRD8HII53Y9Lj653034SrqCIunvjx-6gV-odz3bjbIEK6QtCPluZ7DMB69x1r"/>
<div className="flex flex-col gap-1">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="px-2 py-0.5 rounded bg-tertiary text-on-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed"></span> Đang bán
                    </span>
<span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">SKU: MM-DNDV-04</span>
<span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">branding_watermark</span> Hỗ trợ đóng gói doanh nghiệp: BẬT
                    </span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Hộp Quà Cao Cấp Dạ Nguyệt Đoàn Viên (Hộp sơn mài 4 bánh + Trà)
                  </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                    Hộp sơn mài chạm khắc thủ công phủ bóng đỏ nhung, lót lụa tơ tằm vàng đồng kèm hũ Trà Shan Tuyết Cổ Thụ 50g. Cho phép khắc chìm logo kim loại doanh nghiệp từ 100 hộp.
                  </p>
</div>
</div>

<div className="flex items-center gap-space-lg flex-wrap lg:flex-nowrap shrink-0">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">MOQ Tối Thiểu</span>
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">50 <span className="text-body-sm font-normal text-on-surface-variant">hộp</span></span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Giá Cơ Bản (Tham chiếu)</span>
<div className="flex items-baseline gap-1">
<span className="font-headline-sm text-headline-sm font-bold text-primary">685.000đ</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">/hộp</span>
</div>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Biến thể cấu hình</span>
<span className="font-headline-sm text-headline-sm font-bold text-tertiary">4 SKU Biến thể</span>
</div>
<div className="flex items-center gap-space-xs">
<button className="w-9 h-9 rounded-lg bg-surface-container hover:bg-surface-variant flex items-center justify-center text-on-surface-variant transition-colors" title="Chỉnh sửa sản phẩm" type="button">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
<button className="w-9 h-9 rounded-lg bg-surface-container hover:bg-surface-variant flex items-center justify-center text-on-surface-variant transition-colors" title="Sao chép" type="button">
<span className="material-symbols-outlined text-[20px]">content_copy</span>
</button>
</div>
</div>
</div>

<div className="p-space-md md:p-space-lg flex flex-col gap-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-high/60 p-space-sm rounded-lg">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[20px]">schema</span>
<span className="font-title-md text-title-md font-bold text-on-surface">Ma Trận Biến Thể Chi Tiết (Variant Matrix)</span>
<span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">Hộp Dạ Nguyệt</span>
</div>

<div className="flex items-center gap-1.5 text-on-tertiary-fixed-variant bg-tertiary-fixed/40 px-space-sm py-1 rounded font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px] text-tertiary">info</span>
<span className="font-medium">Quy tắc hệ thống: Mỗi sản phẩm bắt buộc có ít nhất 1 biến thể và khách hàng B2B chỉ được đặt theo biến thể cụ thể.</span>
</div>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-3 px-space-md rounded-l-lg">Mã SKU</th>
<th className="py-3 px-space-sm">Loại Vỏ Bánh</th>
<th className="py-3 px-space-sm">Nhân Thượng Hạng</th>
<th className="py-3 px-space-sm">Trọng Lượng</th>
<th className="py-3 px-space-sm">Điều Chỉnh Giá</th>
<th className="py-3 px-space-sm">Giá Thành Phẩm</th>
<th className="py-3 px-space-sm">Tồn Kho (Chiếc)</th>
<th className="py-3 px-space-sm">Trạng thái Cung ứng</th>
<th className="py-3 px-space-md rounded-r-lg text-right">Thao tác</th>
</tr>
</thead>
<tbody className="font-body-sm text-body-sm divide-y divide-transparent">

<tr className="hover:bg-surface-container-low transition-colors bg-error-container/10">
<td className="py-3.5 px-space-md font-data-mono font-semibold text-primary">DN-BAONGU-180</td>
<td className="py-3.5 px-space-sm font-medium">Bánh nướng truyền thống</td>
<td className="py-3.5 px-space-sm">
<div className="flex items-center gap-1.5">
<span className="font-semibold text-on-surface">Thập cẩm Bào ngư Vi cá</span>
<span className="px-1.5 py-0.2 bg-secondary-container/20 text-secondary font-label-sm text-[10px] rounded">Artisan</span>
</div>
</td>
<td className="py-3.5 px-space-sm font-data-mono font-semibold">180g</td>
<td className="py-3.5 px-space-sm font-data-mono text-primary font-bold">+45.000đ</td>
<td className="py-3.5 px-space-sm font-data-mono font-bold text-on-surface">730.000đ</td>
<td className="py-3.5 px-space-sm">
<div className="flex items-center gap-1.5">
<span className="font-data-mono font-bold text-primary">120 chiếc</span>
<span className="material-symbols-outlined text-primary text-[16px]" title="Cảnh báo tồn kho thấp">warning</span>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-medium">Sắp cạn kho sỉ</span>
</td>
<td className="py-3.5 px-space-md text-right">
<button className="text-primary hover:text-primary-container font-label-sm text-label-sm font-semibold" type="button">Sửa giá/kho</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-space-md font-data-mono font-semibold text-on-surface">DN-YENSAO-180</td>
<td className="py-3.5 px-space-sm font-medium">Bánh nướng hoàng kim</td>
<td className="py-3.5 px-space-sm">
<div className="flex items-center gap-1.5">
<span className="font-semibold text-on-surface">Yến sào Hạt sen Táo đỏ</span>
<span className="px-1.5 py-0.2 bg-tertiary/10 text-tertiary font-label-sm text-[10px] rounded">Bán chạy</span>
</div>
</td>
<td className="py-3.5 px-space-sm font-data-mono font-semibold">180g</td>
<td className="py-3.5 px-space-sm font-data-mono text-tertiary font-bold">+35.000đ</td>
<td className="py-3.5 px-space-sm font-data-mono font-bold text-on-surface">720.000đ</td>
<td className="py-3.5 px-space-sm font-data-mono font-semibold text-on-surface">650 chiếc</td>
<td className="py-3.5 px-space-sm">
<span className="px-2 py-0.5 rounded-full bg-surface-container-high text-tertiary font-label-sm text-label-sm font-medium">Sẵn sàng xuất</span>
</td>
<td className="py-3.5 px-space-md text-right">
<button className="text-primary hover:text-primary-container font-label-sm text-label-sm font-semibold" type="button">Sửa giá/kho</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-space-md font-data-mono font-semibold text-on-surface">DN-TRATRAI-150</td>
<td className="py-3.5 px-space-sm font-medium">Bánh dẻo hoa bưởi</td>
<td className="py-3.5 px-space-sm">
<span className="font-medium text-on-surface">Trà xanh Matcha Macca</span>
</td>
<td className="py-3.5 px-space-sm font-data-mono font-semibold">150g</td>
<td className="py-3.5 px-space-sm font-data-mono text-on-surface-variant font-medium">0đ (Chuẩn)</td>
<td className="py-3.5 px-space-sm font-data-mono font-bold text-on-surface">685.000đ</td>
<td className="py-3.5 px-space-sm font-data-mono font-semibold text-on-surface">920 chiếc</td>
<td className="py-3.5 px-space-sm">
<span className="px-2 py-0.5 rounded-full bg-surface-container-high text-tertiary font-label-sm text-label-sm font-medium">Sẵn sàng xuất</span>
</td>
<td className="py-3.5 px-space-md text-right">
<button className="text-primary hover:text-primary-container font-label-sm text-label-sm font-semibold" type="button">Sửa giá/kho</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-space-md font-data-mono font-semibold text-on-surface">DN-TRUNGCHAY-210</td>
<td className="py-3.5 px-space-sm font-medium">Bánh nướng than tre Nhật</td>
<td className="py-3.5 px-space-sm">
<span className="font-medium text-on-surface">Đậu xanh Kim sa Trứng chảy 2 trứng</span>
</td>
<td className="py-3.5 px-space-sm font-data-mono font-semibold">210g</td>
<td className="py-3.5 px-space-sm font-data-mono text-primary font-bold">+50.000đ</td>
<td className="py-3.5 px-space-sm font-data-mono font-bold text-on-surface">735.000đ</td>
<td className="py-3.5 px-space-sm font-data-mono font-semibold text-on-surface">480 chiếc</td>
<td className="py-3.5 px-space-sm">
<span className="px-2 py-0.5 rounded-full bg-surface-container-high text-tertiary font-label-sm text-label-sm font-medium">Sẵn sàng xuất</span>
</td>
<td className="py-3.5 px-space-md text-right">
<button className="text-primary hover:text-primary-container font-label-sm text-label-sm font-semibold" type="button">Sửa giá/kho</button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="flex items-center justify-between pt-2">
<span className="font-body-sm text-body-sm text-on-surface-variant">Tổng tồn kho khả dụng nhóm Hộp Dạ Nguyệt: <strong className="font-data-mono font-semibold text-on-surface">2.170 chiếc bánh lẻ (~542 set hoàn chỉnh)</strong></span>
<button className="px-space-md py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-[16px]">add</span>
<span>Thêm biến thể mới vào set này</span>
</button>
</div>
</div>
</div>

<div className="w-full bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
<div className="p-space-md md:p-space-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md">
<img className="w-24 h-24 object-cover rounded-xl shadow-sm shrink-0" data-alt="Exquisite corporate Mid-Autumn festival mooncake gift box made from textured art paper with foil stamped gold accents, traditional artisan geometric pattern, clean warm presentation with 4 delicate pastries" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRjLEABgtfFMXx8FiRVJlR6Q-DtCG3oFrRq4_vSbSO8LEtnuiCrBe2w1g21e-ZcAwFf-jAqnAnud4--oVj53s6Dd06tx0CkGenuKy2v-Yfc0CJT11tiahkOH3anMSzqb2_px0TFPAfGGZ1TNnTh5Vm-WHYf37TS0_Zfh664csnMOt6Xz11oD8WEdjwSSBb88oI9EieEd-rkI2HlACxLq4pvdkT6gNFn67P5jMvu9T-fxDxkvZ7gnZw"/>
<div className="flex flex-col gap-1">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="px-2 py-0.5 rounded bg-tertiary text-on-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed"></span> Đang bán
                    </span>
<span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">SKU: MM-TTNN-02</span>
<span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Bao bì giấy mỹ thuật dập nổi</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Set Trăng Thu Nghệ Nhân (Hộp giấy mỹ thuật ép kim 4 bánh)
                  </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                    Thiết kế tối giản sang trọng theo phong cách Art Deco kết hợp họa tiết Trống Đồng Đông Sơn, tối ưu chi phí làm quà tặng nhân viên & đại lý số lượng lớn.
                  </p>
</div>
</div>

<div className="flex items-center gap-space-lg flex-wrap lg:flex-nowrap shrink-0">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">MOQ Tối Thiểu</span>
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">100 <span className="text-body-sm font-normal text-on-surface-variant">hộp</span></span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Giá Cơ Bản (Tham chiếu)</span>
<div className="flex items-baseline gap-1">
<span className="font-headline-sm text-headline-sm font-bold text-primary">395.000đ</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">/hộp</span>
</div>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Biến thể cấu hình</span>
<span className="font-headline-sm text-headline-sm font-bold text-tertiary">3 SKU Biến thể</span>
</div>
<div className="flex items-center gap-space-xs">
<button className="px-space-md py-2 rounded-lg bg-surface-container hover:bg-surface-variant text-on-surface font-label-sm text-label-sm font-semibold transition-all" type="button">
                    Xem 3 Biến Thể
                  </button>
</div>
</div>
</div>
</div>

<div className="w-full bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
<div className="p-space-md md:p-space-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md">
<img className="w-24 h-24 object-cover rounded-xl shadow-sm shrink-0" data-alt="Minimalist eco-friendly wooden and kraft paper Mid-Autumn mooncake gift box with artisan vegan ingredients, organic lotus seeds, edible dried flowers, soft natural sunlight, premium healthy corporate gift" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACpfA7nmLT7KovpaA0E2_OIzyLTdTQkFs7eUg0ikv_5fhlZMhgPiRSeGYC3vDf-GMibdjjtsTpT4py2XDm0mdVRBKwZ6XdBvnNRxm8NCupbL9elxkk6CMpMBu4j15q9wruQv8WFyUD7zn3TW7b-6ad-JS9_bK4PjlctQQoqoT4FR1A0_z2B6HW1jmH0WYoxfTDKk-GOtIFrD7cC4XGlZIphMuS9YFxp2-vPVnXPZW0k4-x93-cM-dg"/>
<div className="flex flex-col gap-1">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="px-2 py-0.5 rounded bg-tertiary text-on-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed"></span> Đang bán
                    </span>
<span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">SKU: MM-CHAY-AL</span>
<span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">Thuần chay • 100% Isomalt</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Hộp Bánh Thuần Chay An Lạc (Đường ăn kiêng Isomalt)
                  </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                    Bao bì giấy tái chế kraft thân thiện môi trường FSC, sử dụng hoàn toàn đường củ cải Isomalt Đức thích hợp cho đối tác doanh nghiệp khối Y tế, Chăm sóc sức khỏe và Lãnh sự.
                  </p>
</div>
</div>

<div className="flex items-center gap-space-lg flex-wrap lg:flex-nowrap shrink-0">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">MOQ Tối Thiểu</span>
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">40 <span className="text-body-sm font-normal text-on-surface-variant">hộp</span></span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Giá Cơ Bản (Tham chiếu)</span>
<div className="flex items-baseline gap-1">
<span className="font-headline-sm text-headline-sm font-bold text-primary">480.000đ</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">/hộp</span>
</div>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Biến thể cấu hình</span>
<span className="font-headline-sm text-headline-sm font-bold text-tertiary">2 SKU Biến thể</span>
</div>
<div className="flex items-center gap-space-xs">
<button className="px-space-md py-2 rounded-lg bg-surface-container hover:bg-surface-variant text-on-surface font-label-sm text-label-sm font-semibold transition-all" type="button">
                    Xem 2 Biến Thể
                  </button>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

<div className="hidden flex-col gap-space-lg" id="tab-content-pricing">

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

<div className="lg:col-span-7 flex flex-col gap-space-md">

<div className="w-full bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-xs">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase font-bold text-secondary">Cơ Chế Khuyến Mãi Sỉ (#8)</span>
<h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Thiết Lập Chính Sách Chiết Khấu Bậc Thang B2B</h2>
</div>
<span className="px-2.5 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold self-start sm:self-auto">
                Trạng thái: Đang áp dụng
              </span>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md bg-surface-container-low p-space-md rounded-xl">

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-semibold text-on-surface">
                  Phạm vi áp dụng
                </label>
<div className="flex items-center gap-space-sm">
<label className="flex items-center gap-2 cursor-pointer">
<input defaultChecked className="accent-primary w-4 h-4 cursor-pointer" name="scope_tier" type="radio" value="all"/>
<span className="font-body-md text-body-md text-on-surface font-medium">Toàn gian hàng (All Store)</span>
</label>
<label className="flex items-center gap-2 cursor-pointer">
<input className="accent-primary w-4 h-4 cursor-pointer" name="scope_tier" type="radio" value="specific"/>
<span className="font-body-md text-body-md text-on-surface-variant">Sản phẩm cụ thể</span>
</label>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Ưu đãi áp dụng tự động cho mọi hợp đồng PO sỉ hợp lệ.</span>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-semibold text-on-surface">
                  Loại chiết khấu tính toán
                </label>
<select className="w-full bg-surface-container-lowest px-space-sm py-2 rounded-lg text-on-surface font-body-md text-body-md focus:outline-none" id="discount-calc-type">
<option defaultValue value="percent">% Phần trăm chiết khấu (Percentage %)</option>
<option value="fixed_amount">Trừ số tiền cố định (Fixed Amount đ/hộp)</option>
<option value="fixed_price">Đồng giá sàn cố định (Fixed Price đ/hộp)</option>
</select>
<span className="font-body-sm text-body-sm text-on-surface-variant">Quy đổi linh hoạt theo mô hình doanh số của xưởng.</span>
</div>
</div>

<div className="flex flex-col gap-space-sm mt-space-xs">
<div className="flex items-center justify-between">
<h3 className="font-title-md text-title-md font-bold text-on-surface">Bảng Bậc Thang Doanh Số Sỉ Đang Áp Dụng</h3>
<span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">task_alt</span> Đã thẩm định không chồng chéo khoảng
                </span>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase">
<th className="py-3 px-space-md rounded-l-lg">Bậc Thang</th>
<th className="py-3 px-space-sm">Khoảng Số Lượng</th>
<th className="py-3 px-space-sm">Mức Giảm</th>
<th className="py-3 px-space-sm">Đặc Quyền Kèm Theo</th>
<th className="py-3 px-space-md rounded-r-lg text-right">Tình Trạng</th>
</tr>
</thead>
<tbody className="font-body-sm text-body-sm divide-y divide-transparent">

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-space-md font-label-md text-label-md font-bold text-on-surface">
                        Bậc 1
                      </td>
<td className="py-3.5 px-space-sm font-data-mono font-medium">50 – 99 hộp</td>
<td className="py-3.5 px-space-sm">
<span className="px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-data-mono font-bold">Giảm 5%</span>
</td>
<td className="py-3.5 px-space-sm text-on-surface-variant">Hỗ trợ thiệp chúc mừng tiêu chuẩn</td>
<td className="py-3.5 px-space-md text-right">
<span className="text-tertiary font-semibold font-label-sm text-label-sm">Kích hoạt</span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-space-md font-label-md text-label-md font-bold text-on-surface">
                        Bậc 2
                      </td>
<td className="py-3.5 px-space-sm font-data-mono font-medium">100 – 249 hộp</td>
<td className="py-3.5 px-space-sm">
<span className="px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-data-mono font-bold">Giảm 12%</span>
</td>
<td className="py-3.5 px-space-sm text-on-surface-variant">In logo thẻ tag theo thương hiệu</td>
<td className="py-3.5 px-space-md text-right">
<span className="text-tertiary font-semibold font-label-sm text-label-sm">Kích hoạt</span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors bg-secondary-fixed/20">
<td className="py-3.5 px-space-md font-label-md text-label-md font-bold text-primary flex items-center gap-1.5">
<span>Bậc 3</span>
<span className="px-1.5 py-0.5 rounded bg-primary text-on-primary text-[10px] uppercase font-bold tracking-tight">Phổ Biến Nhất</span>
</td>
<td className="py-3.5 px-space-sm font-data-mono font-bold text-primary">250 – 499 hộp</td>
<td className="py-3.5 px-space-sm">
<span className="px-2.5 py-1 rounded bg-primary-container text-on-primary font-data-mono font-bold">Giảm 18%</span>
</td>
<td className="py-3.5 px-space-sm font-medium text-on-surface">Khắc laser logo lên mặt nắp hộp gỗ/sơn mài</td>
<td className="py-3.5 px-space-md text-right">
<span className="text-tertiary font-semibold font-label-sm text-label-sm">Kích hoạt</span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-space-md font-label-md text-label-md font-bold text-tertiary">
                        Bậc 4 (VIP Corp)
                      </td>
<td className="py-3.5 px-space-sm font-data-mono font-bold text-tertiary">Từ 500 hộp trở lên</td>
<td className="py-3.5 px-space-sm">
<span className="px-2.5 py-1 rounded bg-tertiary-container text-on-tertiary font-data-mono font-bold">Giảm 25%</span>
</td>
<td className="py-3.5 px-space-sm font-semibold text-primary">
                        Miễn phí vận chuyển nội thành & Miễn phí làm khuôn logo kim loại
                      </td>
<td className="py-3.5 px-space-md text-right">
<span className="text-tertiary font-semibold font-label-sm text-label-sm">Kích hoạt</span>
</td>
</tr>
</tbody>
</table>
</div>

<div className="p-space-sm rounded-lg bg-surface-container flex items-start gap-space-xs mt-space-xs">
<span className="material-symbols-outlined text-outline text-[18px] shrink-0 mt-0.5">lock_clock</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                  Quy định kiểm duyệt thuật toán: Hệ thống tự động kiểm tra biên độ số lượng (Range Validation), ngăn chặn xung đột nếu min_qty của bậc tiếp theo nhỏ hơn hoặc bằng max_qty của bậc trước.
                </p>
</div>
<div className="flex items-center justify-end gap-space-sm pt-space-xs">
<button className="px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md font-medium transition-all" type="button">
                  Khôi phục mặc định
                </button>
<button className="px-space-lg py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold transition-all shadow-sm" type="button">
                  Lưu cấu hình chiết khấu
                </button>
</div>
</div>
</div>

<div className="w-full bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md font-bold text-on-surface">Tỷ lệ đơn hàng đóng sỉ theo Bậc (Mùa 2023 - 2024)</span>
<span className="font-data-mono text-body-sm text-on-surface-variant">Tổng: 18.450 Hộp</span>
</div>

<div className="w-full pt-space-xs">
<div className="flex items-end justify-between gap-4 h-32 px-4 bg-surface-container-low rounded-lg pt-4">
<div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
<span className="font-data-mono text-[11px] font-bold text-on-surface-variant">14%</span>
<div className="w-full bg-surface-variant rounded-t" style={{"height": "28%"}}></div>
<span className="font-label-sm text-[10px] text-on-surface-variant">Bậc 1 (50-99)</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
<span className="font-data-mono text-[11px] font-bold text-on-surface-variant">26%</span>
<div className="w-full bg-surface-variant rounded-t" style={{"height": "52%"}}></div>
<span className="font-label-sm text-[10px] text-on-surface-variant">Bậc 2 (100-249)</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
<span className="font-data-mono text-[11px] font-bold text-primary">48%</span>
<div className="w-full bg-primary rounded-t" style={{"height": "96%"}}></div>
<span className="font-label-sm text-[10px] font-bold text-primary">Bậc 3 (250-499)</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
<span className="font-data-mono text-[11px] font-bold text-tertiary">12%</span>
<div className="w-full bg-tertiary rounded-t" style={{"height": "24%"}}></div>
<span className="font-label-sm text-[10px] text-tertiary font-semibold">Bậc 4 (&gt;500)</span>
</div>
</div>
</div>
</div>
</div>

<div className="lg:col-span-5 sticky top-28 flex flex-col gap-space-md">
<div className="w-full bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-md flex flex-col gap-space-md">
<div className="flex items-center gap-space-xs pb-space-xs">
<div className="w-9 h-9 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">calculate</span>
</div>
<div className="flex flex-col">
<h3 className="font-title-md text-title-md font-bold text-on-surface">Máy Tính Thử Giá Chiết Khấu (Live)</h3>
<span className="font-body-sm text-body-sm text-on-surface-variant">Mô phỏng tức thì trước khi chốt báo giá / RFQ</span>
</div>
</div>

<div className="flex flex-col gap-1.5">
<label className="font-label-sm text-label-sm font-semibold text-on-surface">Chọn mẫu hộp kiểm tra</label>
<select className="w-full bg-surface-container-low px-space-sm py-2 rounded-lg text-on-surface font-body-md text-body-md focus:outline-none" id="calc-product-select" >
<option defaultValue value="685000">Hộp Dạ Nguyệt Đoàn Viên (Chuẩn 685.000đ/hộp)</option>
<option value="395000">Set Trăng Thu Nghệ Nhân (Chuẩn 395.000đ/hộp)</option>
<option value="480000">Hộp Bánh Thuần Chay An Lạc (Chuẩn 480.000đ/hộp)</option>
</select>
</div>

<div className="flex flex-col gap-1.5">
<div className="flex items-center justify-between">
<label className="font-label-sm text-label-sm font-semibold text-on-surface">Nhập số lượng hộp thử nghiệm</label>
<span className="font-data-mono text-body-sm text-primary font-bold">Thử nghiệm mẫu: 260 hộp</span>
</div>
<div className="relative flex items-center">
<input className="w-full bg-surface-container-low pl-space-md pr-16 py-3 rounded-lg text-on-surface font-data-mono text-headline-sm font-bold focus:outline-none focus:bg-surface-container-lowest transition-all" id="calc-qty-input" max="10000" min="1"  type="number" value="260"/>
<span className="absolute right-4 font-label-md text-label-md text-on-surface-variant font-semibold">Hộp</span>
</div>

<div className="flex items-center gap-space-xs mt-1">
<span className="font-label-sm text-label-sm text-on-surface-variant">Preset:</span>
<button className="px-2 py-0.5 rounded bg-surface-container hover:bg-surface-variant font-data-mono text-body-sm"  type="button">60 hộp</button>
<button className="px-2 py-0.5 rounded bg-surface-container hover:bg-surface-variant font-data-mono text-body-sm"  type="button">150 hộp</button>
<button className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-data-mono text-body-sm"  type="button">260 hộp</button>
<button className="px-2 py-0.5 rounded bg-surface-container hover:bg-surface-variant font-data-mono text-body-sm"  type="button">550 hộp</button>
</div>
</div>

<div className="flex flex-col gap-space-sm p-space-md rounded-xl bg-surface-container-low">

<div className="flex items-center justify-between pb-space-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant">Bậc áp dụng tự động:</span>
<div className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-bold flex items-center gap-1 shadow-sm" id="calc-badge-tier">
<span className="material-symbols-outlined text-[16px]">stars</span>
<span id="calc-tier-text">Bậc 3 (250 - 499 hộp)</span>
</div>
</div>

<div className="flex items-center justify-between">
<span className="font-body-md text-body-md text-on-surface-variant">Tỷ lệ chiết khấu:</span>
<span className="font-data-mono font-bold text-headline-sm text-primary" id="calc-discount-percent">18%</span>
</div>

<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">Tổng giá trị niêm yết (Gross):</span>
<span className="font-data-mono text-body-md font-medium text-on-surface" id="calc-gross-price">178.100.000đ</span>
</div>

<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm text-tertiary font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">savings</span> Khách tiết kiệm được:
                </span>
<span className="font-data-mono font-bold text-body-md text-tertiary" id="calc-savings">-32.058.000đ</span>
</div>

<div className="pt-space-xs flex flex-col gap-1">
<div className="flex items-baseline justify-between">
<span className="font-title-md text-title-md font-bold text-on-surface">Doanh thu xưởng thu về:</span>
<span className="font-data-mono font-bold text-headline-md text-primary tracking-tight" id="calc-net-revenue">146.042.000đ</span>
</div>
<div className="flex items-center justify-between text-[11px] font-body-sm text-on-surface-variant">
<span>Giá trung bình sau giảm:</span>
<span className="font-data-mono font-semibold text-on-surface" id="calc-unit-price">561.700đ / hộp</span>
</div>
</div>

<div className="p-space-xs rounded bg-surface-container-highest/60 flex items-start gap-1.5 mt-space-xs" id="calc-perks-box">
<span className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-0.5">verified</span>
<span className="font-body-sm text-body-sm text-on-surface" id="calc-perks-text">
                  Đặc quyền Bậc 3: Khắc laser logo lên mặt nắp hộp gỗ/sơn mài miễn phí cho khách hàng.
                </span>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<button className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold transition-all flex items-center justify-center gap-space-xs shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">post_add</span>
<span>Tạo báo giá dự thảo từ kết quả này</span>
</button>
<button className="w-full py-2 rounded-lg bg-surface-container hover:bg-surface-variant text-on-surface font-label-sm text-label-sm font-medium transition-all text-center" type="button">
                Xuất file Excel đối soát chiết khấu
              </button>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary text-[22px] shrink-0">encrypted</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Cam kết an toàn ký quỹ Escrow B2B</span>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Khi áp dụng chiết khấu bậc thang trên sàn, toàn bộ tiền cọc 50-70% của người mua sẽ được ký quỹ Escrow an toàn trước khi xưởng tiến hành sản xuất mẻ bánh.
              </p>
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
