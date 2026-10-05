import React from 'react';

export default function BiddingPage({ onNavigate }) {
  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-20 w-full px-margin flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-lg"><div className="flex items-center gap-space-sm"><div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary font-headline-md font-bold">M</div><div className="flex flex-col"><div className="flex items-center gap-space-xs"><span className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">MoonMarket</span><span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">B2B Hub</span></div><span className="font-label-sm text-label-sm text-on-surface-variant">Cổng Đối Tác Xưởng Bánh</span></div></div><div className="hidden xl:flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-xs rounded-full"><div className="flex items-center gap-space-xs"><span className="w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse"></span><span className="font-label-sm text-label-sm font-semibold text-on-surface">Đang mở bán</span></div><span className="text-outline-variant font-body-sm">|</span><div className="flex items-center gap-1 text-tertiary font-label-sm text-label-sm font-semibold"><span className="material-symbols-outlined text-[16px]">verified</span><span>Đối tác Vàng (98/100)</span></div></div></div><div className="hidden md:flex flex-1 max-w-md items-center bg-surface-container-low px-space-md py-space-xs rounded-lg"><span className="material-symbols-outlined text-outline text-[20px] mr-space-xs">search</span><input className="bg-transparent w-full text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none" placeholder="Tra cứu mã đơn B2B, SKU bánh, phiên RFQ..." type="text"/></div><div className="flex items-center gap-space-md"><div className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"><span className="material-symbols-outlined text-on-surface-variant text-[22px]">notifications</span><span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-on-primary text-[10px] font-bold rounded-full flex items-center justify-center">5</span></div><div className="flex items-center gap-space-sm pl-space-sm"><div className="hidden lg:flex flex-col text-right"><span className="font-label-md text-label-md font-semibold text-on-surface">Xưởng Tràng An Bakery</span><span className="font-label-sm text-label-sm text-on-surface-variant">Admin: Trần Đức Thắng</span></div><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></div><div className="w-full px-margin bg-surface-container-lowest"><nav className="flex items-center gap-space-xs overflow-x-auto py-space-xs" data-active-classes="bg-primary-container text-on-primary font-semibold shadow-sm"><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="dashboard-doanh-so" href="#">Dashboard & Doanh số</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="san-pham-khuyen-mai" href="#">Sản phẩm & Khuyến mãi (Bậc thang)</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="don-hang-dong-goi-b2b" href="#">Đơn hàng & Đóng gói B2B</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="dau-thau-rfq-bao-gia" href="#">Đấu thầu RFQ & Báo giá</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="hop-dong-milestone" href="#">Hợp đồng & Milestone</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="giao-van-vi-escrow" href="#">Giao vận & Ví Escrow</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="cai-dat-gian-hang" href="#">Cài đặt gian hàng</a></nav></div></header><main className="w-full pt-20 bg-surface min-h-screen"><div className="flex flex-col w-full">

<section className="w-full px-margin py-space-md bg-surface-container-low">
<div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div className="flex flex-col gap-space-xs">
<div className="flex items-center gap-space-sm flex-wrap">
<span className="px-space-xs py-0.5 rounded bg-tertiary-container text-on-tertiary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
            RFQ Gateway Pro
          </span>
<span className="font-data-mono text-data-mono text-on-surface-variant">Sàn Đấu Thầu Doanh Nghiệp Mùa Vụ 2025</span>
<span className="text-outline-variant font-body-sm hidden sm:inline">•</span>
<span className="flex items-center gap-1 font-label-sm text-label-sm text-tertiary">
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings": "'FILL' 1"}}>shield_with_heart</span>
            Bảo mật cơ chế Niêm phong Báo giá (Sealed Bid)
          </span>
</div>
<h1 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
          Đấu Thầu RFQ, Hộp Thư Lời Mời & Soạn Báo Giá Bid
        </h1>
</div>

<div className="flex items-center gap-space-md">
<div className="bg-surface-container-lowest px-space-md py-space-xs rounded-xl shadow-sm flex items-center gap-space-md">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Năng suất xưởng khả dụng</span>
<span className="font-headline-sm text-headline-sm font-bold text-primary">12.500 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">bánh / tuần</span></span>
</div>
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[22px]">factory</span>
</div>
</div>
<div className="hidden sm:flex bg-surface-container-lowest px-space-md py-space-xs rounded-xl shadow-sm items-center gap-space-md">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Tỉ lệ Thắng Thầu (Q2-Q3)</span>
<span className="font-headline-sm text-headline-sm font-bold text-tertiary">68.4%</span>
</div>
<div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-[22px]">military_tech</span>
</div>
</div>
</div>
</div>
</section>

<div className="max-w-[1440px] w-full mx-auto px-margin py-space-lg">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

<div className="lg:col-span-5 flex flex-col gap-space-lg">

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[22px]">mail</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">Lời Mời Thầu Đích Danh</span>
<span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">1 Mới</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant">Cập nhật 4 phút trước</span>
</div>

<div className="flex items-center gap-space-xs p-1 bg-surface-container-low rounded-lg">
<button className="flex-1 py-1.5 px-space-sm rounded text-center font-label-sm text-label-sm font-semibold bg-surface-container-lowest text-primary shadow-xs">
              Đang mở thầu (3)
            </button>
<button className="flex-1 py-1.5 px-space-sm rounded text-center font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors">
              Chờ kết quả (4)
            </button>
<button className="flex-1 py-1.5 px-space-sm rounded text-center font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors">
              Đã xong (18)
            </button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-md p-space-md relative overflow-hidden flex flex-col gap-space-md">

<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>

<div className="flex items-start justify-between gap-space-sm pt-1">
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-data-mono text-data-mono font-semibold">
                  RFQ-2025-08910
                </span>
<span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping"></span>
                  Đang mở thầu
                </span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-1">Gói thầu quà tặng doanh nghiệp VVIP</span>
</div>

<div className="flex flex-col items-end">
<span className="px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">edit_note</span>
                Đang soạn báo giá
              </span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Xưởng đã mở xem</span>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<h2 className="font-title-md text-title-md text-on-surface font-bold leading-snug">
              500 Hộp Quà Tri Ân Doanh Nghiệp Ngân Hàng - Yêu cầu Hộp Gỗ Khắc Logo
            </h2>
<div className="flex items-center gap-space-sm flex-wrap text-on-surface-variant font-body-sm text-body-sm">
<div className="flex items-center gap-1 text-primary font-semibold">
<span className="material-symbols-outlined text-[16px]">business</span>
<span>Tập đoàn Tài chính MB / An Phát Corp</span>
</div>
<span>•</span>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">location_on</span>
<span>Hà Nội (Giao đa điểm 4 chi nhánh)</span>
</div>
</div>
</div>

<div className="relative w-full h-36 rounded-lg overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" data-alt="Premium wooden mooncake gift box with intricately laser engraved corporate logo, sitting on rich lacquer tray surrounded by gourmet Vietnamese mooncakes and golden tea set, soft luxury studio lighting, deep crimson velvet background, warm ambient glow, highly detailed product photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8tKATeRUWsYFLb0C4yU3cfpnQnxxLGiiOuJyDSpnzgpJesLkXaMsHrNrSj99FLSXoPobgeGlxpalCPH2DXVtUWT11K845lMaGa5EhgO3cBkkRJ_INniOB4J173NZr9BqPGBx5CG-gUs6GrihpUk_M_Ia54C61Blt1IrBrjxtcE8U3g5MZp_MsnKSQhpSEwxAUpU4sGnSpGILsayUwceU47lNW1jnFiXcuZggcz5xTY5t9mTWXnxTP"/>
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex items-end p-space-sm">
<span className="text-inverse-on-surface font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">verified</span>
                Quy cách: Hộp gỗ tự nhiên cao cấp • Ép kim & khắc laser 3D logo ngân hàng
              </span>
</div>
</div>

<div className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-xs text-primary">
<span className="material-symbols-outlined text-[22px] animate-pulse">timer</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase font-semibold tracking-wider text-on-surface-variant">Hạn chót gửi báo giá</span>
<span className="font-data-mono text-title-md font-bold text-primary">Còn 02 ngày 14 giờ 22 phút</span>
</div>
</div>
<div className="text-right">
<span className="font-label-sm text-label-sm text-on-surface-variant block">Đóng cổng nhận thầu:</span>
<span className="font-data-mono text-body-sm font-semibold text-on-surface">23:59 • 15/08/2025</span>
</div>
</div>

<div className="grid grid-cols-3 gap-space-xs text-center py-space-xs bg-surface-container rounded-lg">
<div className="flex flex-col p-1">
<span className="font-label-sm text-label-sm text-on-surface-variant">Tổng số lượng</span>
<span className="font-title-md text-title-md font-bold text-on-surface">500 Hộp</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">(2.000 bánh)</span>
</div>
<div className="flex flex-col p-1">
<span className="font-label-sm text-label-sm text-on-surface-variant">Ngân sách trần</span>
<span className="font-title-md text-title-md font-bold text-secondary">~325 Tr</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">650k/hộp trần</span>
</div>
<div className="flex flex-col p-1">
<span className="font-label-sm text-label-sm text-on-surface-variant">Hạn nhận hàng</span>
<span className="font-title-md text-title-md font-bold text-on-surface">25/08/2025</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">trước rằm 20 ngày</span>
</div>
</div>

<div className="flex flex-col sm:flex-row items-center gap-space-sm pt-space-xs">
<button className="w-full sm:flex-1 py-space-sm px-space-md bg-primary-container text-on-primary rounded-lg font-label-md text-label-md font-semibold flex items-center justify-center gap-space-xs shadow-sm hover:opacity-95 transition-opacity">
<span className="material-symbols-outlined text-[18px]">draw</span>
<span>Đang soạn Bid (Xem form)</span>
</button>
<button className="w-full sm:w-auto py-space-sm px-space-md bg-surface-container-high text-error hover:bg-error-container hover:text-on-error-container rounded-lg font-label-md text-label-md font-semibold flex items-center justify-center gap-space-xs transition-colors" id="btn-open-decline-modal" type="button">
<span className="material-symbols-outlined text-[18px]">block</span>
<span>Từ chối lời mời</span>
</button>
</div>
</div>

<div className="flex flex-col gap-space-sm">
<span className="font-label-md text-label-md font-semibold text-on-surface-variant uppercase tracking-wider">
            Các lời mời khác trong hộp thư
          </span>

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs hover:shadow-sm transition-shadow flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="font-data-mono text-data-mono text-on-surface-variant font-medium">RFQ-2025-08902</span>
<span className="font-data-mono text-body-sm text-secondary font-semibold">Còn 04 ngày</span>
</div>
<div className="font-title-md text-title-md font-semibold text-on-surface">
              1.200 Hộp Quà Đoàn Viên Sắc Màu - Khách Hàng Công Nghệ FPT
            </div>
<div className="flex items-center justify-between text-body-sm text-on-surface-variant pt-1">
<span>Đơn vị: Ban Mua Sắm FPT Soft</span>
<span className="font-semibold text-on-surface">MOQ: 1.200 hộp</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs hover:shadow-sm transition-shadow flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="font-data-mono text-data-mono text-on-surface-variant font-medium">RFQ-2025-08885</span>
<span className="font-data-mono text-body-sm text-error font-semibold">Còn 08 giờ (Gấp)</span>
</div>
<div className="font-title-md text-title-md font-semibold text-on-surface">
              300 Set Bánh Nướng Thập Cẩm Bát Bửu VIP Kèm Trà Ô Long Thượng Hạng
            </div>
<div className="flex items-center justify-between text-body-sm text-on-surface-variant pt-1">
<span>Đơn vị: BĐS Thuận Phát Land</span>
<span className="font-semibold text-on-surface">MOQ: 300 hộp</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[22px]">history_edu</span>
<h3 className="font-title-md text-title-md text-on-surface font-bold">Danh Sách Bid Gần Đây</h3>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant">3 gói mới nhất</span>
</div>
<div className="flex flex-col gap-space-sm">

<div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="font-data-mono text-data-mono font-semibold text-on-surface">RFQ-2025-07841</span>
<span className="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">check_circle</span>
                  ĐÃ THẮNG THẦU
                </span>
</div>
<div className="font-body-md text-body-md font-semibold text-on-surface line-clamp-1">
                800 Hộp Quà Thu Khang Thịnh Vượng - VCB Hoàn Kiếm
              </div>
<div className="flex items-center justify-between text-body-sm text-on-surface-variant pt-1">
<span className="font-data-mono font-semibold text-primary">Giá chốt: 448.000.000đ</span>
<span className="flex items-center gap-1 text-tertiary font-semibold">
<span className="material-symbols-outlined text-[16px]">description</span>
                  Đã ký HĐ: HD-00892
                </span>
</div>
</div>

<div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="font-data-mono text-data-mono font-semibold text-on-surface">RFQ-2025-08219</span>
<span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">hourglass_top</span>
                  ĐANG XÉT THẦU (Vòng 2)
                </span>
</div>
<div className="font-body-md text-body-md font-semibold text-on-surface line-clamp-1">
                600 Set Trăng Vàng Thưởng Nguyệt - Bảo Hiểm Dai-ichi
              </div>
<div className="flex items-center justify-between text-body-sm text-on-surface-variant pt-1">
<span className="font-data-mono font-medium text-on-surface">Giá nộp: 312.000.000đ</span>
<span className="text-on-surface-variant font-body-sm">Khách đang chấm mẫu test</span>
</div>
</div>

<div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="font-data-mono text-data-mono font-semibold text-on-surface">RFQ-2025-06915</span>
<span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-medium">
                  Chưa trúng đợt này
                </span>
</div>
<div className="font-body-md text-body-md font-semibold text-on-surface line-clamp-1">
                1.500 Hộp Bánh Dẻo Truyền Thống - Dược Phẩm Traphaco
              </div>
<div className="flex items-center justify-between text-body-sm text-on-surface-variant pt-1">
<span>Gói thầu đã hoàn tất chấm điểm</span>
<span className="text-outline font-data-mono">Niêm phong giá đối thủ 100%</span>
</div>
</div>
</div>
</div>
</div>

<div className="lg:col-span-7 flex flex-col gap-space-lg">

<div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col gap-space-lg">

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm">
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<span className="w-3 h-3 rounded-full bg-primary-container"></span>
<h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Soạn Báo Giá Cho Gói Thầu RFQ-2025-08910
                </h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Điền đơn giá từng phân bổ bánh và quy cách hộp đóng gói theo đúng yêu cầu bên mời thầu.
              </p>
</div>
<div className="flex items-center gap-space-xs self-start sm:self-auto bg-surface-container-low px-space-sm py-1 rounded-lg">
<span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
<span className="font-label-sm text-label-sm font-semibold text-on-surface">Xưởng Tràng An Bakery</span>
</div>
</div>

<div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">info</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm font-bold text-on-surface">Quy tắc nộp thầu niêm phong (Sealed Bidding)</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">
                Sau khi bấm "Gửi Báo Giá Ngay", xưởng vẫn có quyền cập nhật và chỉnh sửa đơn giá bất kỳ lúc nào cho đến hạn chót 23:59 ngày 15/08/2025. Sau thời điểm này, giá sẽ được khóa cứng tự động.
              </span>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md font-bold text-on-surface">
                1. Bảng Chi Tiết Giá Theo Dòng Hàng (4 Items)
              </span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Đơn vị: VNĐ</span>
</div>
<div className="overflow-x-auto rounded-lg bg-surface-container-low">
<table className="w-full text-left font-body-md text-body-md">
<thead>
<tr className="bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold">
<th className="py-space-sm px-space-md w-10">STT</th>
<th className="py-space-sm px-space-md min-w-[220px]">Quy cách & Mô tả Hạng mục</th>
<th className="py-space-sm px-space-sm text-center w-24">Số lượng</th>
<th className="py-space-sm px-space-md text-right w-44">Đơn giá Xưởng đề xuất</th>
<th className="py-space-sm px-space-md text-right w-40">Thành tiền</th>
</tr>
</thead>
<tbody className="text-on-surface">

<tr className="hover:bg-surface-container transition-colors">
<td className="py-space-sm px-space-md font-data-mono text-center text-on-surface-variant">01</td>
<td className="py-space-sm px-space-md">
<div className="flex flex-col">
<span className="font-semibold text-on-surface">Bánh Trung Thu Bào Ngư Vi Cá 180g</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Nướng trứng muối 1 tròng, đóng túi hút chân không + khay vàng</span>
</div>
</td>
<td className="py-space-sm px-space-sm text-center font-data-mono font-semibold">
                      500 cái
                    </td>
<td className="py-space-sm px-space-md text-right">
<div className="relative flex items-center">
<input className="w-full bg-surface-container-lowest text-right font-data-mono font-bold text-on-surface px-space-sm py-1.5 rounded focus:outline-none focus:bg-surface-container-high" id="price-item-1" type="text" value="145.000"/>
<span className="absolute right-2 text-on-surface-variant font-label-sm text-label-sm pointer-events-none">đ</span>
</div>
</td>
<td className="py-space-sm px-space-md text-right font-data-mono font-bold text-primary">
                      72.500.000 đ
                    </td>
</tr>

<tr className="hover:bg-surface-container transition-colors">
<td className="py-space-sm px-space-md font-data-mono text-center text-on-surface-variant">02</td>
<td className="py-space-sm px-space-md">
<div className="flex flex-col">
<span className="font-semibold text-on-surface">Bánh Trung Thu Trà Xanh Hạt Sen Macca 180g</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Nhân nhuyễn ít ngọt (đường Isomalt ăn kiêng), hạt macca Úc</span>
</div>
</td>
<td className="py-space-sm px-space-sm text-center font-data-mono font-semibold">
                      500 cái
                    </td>
<td className="py-space-sm px-space-md text-right">
<div className="relative flex items-center">
<input className="w-full bg-surface-container-lowest text-right font-data-mono font-bold text-on-surface px-space-sm py-1.5 rounded focus:outline-none focus:bg-surface-container-high" id="price-item-2" type="text" value="110.000"/>
<span className="absolute right-2 text-on-surface-variant font-label-sm text-label-sm pointer-events-none">đ</span>
</div>
</td>
<td className="py-space-sm px-space-md text-right font-data-mono font-bold text-primary">
                      55.000.000 đ
                    </td>
</tr>

<tr className="hover:bg-surface-container transition-colors">
<td className="py-space-sm px-space-md font-data-mono text-center text-on-surface-variant">03</td>
<td className="py-space-sm px-space-md">
<div className="flex flex-col">
<span className="font-semibold text-on-surface">Bánh Nướng Thập Cẩm Gà Quay Xốt X.O 180g</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Gà quay thượng hạng kết hợp xốt X.O sò điệp Hồng Kông</span>
</div>
</td>
<td className="py-space-sm px-space-sm text-center font-data-mono font-semibold">
                      500 cái
                    </td>
<td className="py-space-sm px-space-md text-right">
<div className="relative flex items-center">
<input className="w-full bg-surface-container-lowest text-right font-data-mono font-bold text-on-surface px-space-sm py-1.5 rounded focus:outline-none focus:bg-surface-container-high" id="price-item-3" type="text" value="125.000"/>
<span className="absolute right-2 text-on-surface-variant font-label-sm text-label-sm pointer-events-none">đ</span>
</div>
</td>
<td className="py-space-sm px-space-md text-right font-data-mono font-bold text-primary">
                      62.500.000 đ
                    </td>
</tr>

<tr className="hover:bg-surface-container transition-colors">
<td className="py-space-sm px-space-md font-data-mono text-center text-on-surface-variant">04</td>
<td className="py-space-sm px-space-md">
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<span className="font-semibold text-on-surface">Hộp Gỗ Cao Cấp Mài Sơn Bóng Khắc Laser Logo 3D</span>
<span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-[10px] font-bold uppercase">Bao Bì</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Bao gồm túi giấy quai nhung ép kim + thiệp tri ân thiết kế riêng</span>
</div>
</td>
<td className="py-space-sm px-space-sm text-center font-data-mono font-semibold">
                      500 hộp
                    </td>
<td className="py-space-sm px-space-md text-right">
<div className="relative flex items-center">
<input className="w-full bg-surface-container-lowest text-right font-data-mono font-bold text-on-surface px-space-sm py-1.5 rounded focus:outline-none focus:bg-surface-container-high" id="price-item-4" type="text" value="95.000"/>
<span className="absolute right-2 text-on-surface-variant font-label-sm text-label-sm pointer-events-none">đ</span>
</div>
</td>
<td className="py-space-sm px-space-md text-right font-data-mono font-bold text-primary">
                      47.500.000 đ
                    </td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row items-stretch justify-between gap-space-lg">

<div className="flex-1 flex flex-col justify-between gap-space-sm">
<div className="flex flex-col gap-1">
<span className="font-label-md text-label-md font-bold text-on-surface">Ghi chú hạch toán chi phí:</span>
<ul className="text-body-sm text-on-surface-variant flex flex-col gap-1 list-disc pl-4">
<li>Đã bao gồm 100% chi phí khuôn dập logo nổi trên mặt bánh riêng cho đối tác.</li>
<li>Bao gồm chi phí vận chuyển xe lạnh chuyên dụng nội thành Hà Nội (4 điểm giao).</li>
<li>Hóa đơn Giá Trị Gia Tăng (VAT) điện tử phát hành đúng mã ngành bánh mứt kẹo.</li>
</ul>
</div>
<div className="flex items-center gap-space-xs text-tertiary font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-[16px]">verified</span>
<span>Giá chào cạnh tranh hơn 4.6% so với trần ngân sách bên mua</span>
</div>
</div>

<div className="w-full md:w-80 bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col gap-space-xs">
<div className="flex justify-between items-center text-body-sm text-on-surface-variant">
<span>Tổng tiền hàng (chưa thuế):</span>
<span className="font-data-mono font-semibold text-on-surface">237.500.000 đ</span>
</div>
<div className="flex justify-between items-center text-body-sm text-on-surface-variant">
<span>Hộp gỗ khắc logo & Túi quà:</span>
<span className="font-data-mono font-semibold text-on-surface">47.500.000 đ</span>
</div>
<div className="flex justify-between items-center text-body-sm text-on-surface-variant">
<span>Phí kiểm nghiệm & Vận chuyển HN:</span>
<span className="font-data-mono text-tertiary font-semibold">Tài trợ 0 đ</span>
</div>
<div className="flex justify-between items-center text-body-sm text-on-surface-variant">
<span>Thuế VAT (8% ưu đãi thực phẩm):</span>
<span className="font-data-mono font-semibold text-on-surface">25.000.000 đ</span>
</div>
<div className="pt-space-xs mt-space-xs flex justify-between items-baseline bg-surface-container-low p-2 rounded">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">Tổng giá trị gói Bid</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">(Đã gồm 8% VAT & Vận chuyển)</span>
</div>
<div className="text-right">
<span className="font-headline-sm text-headline-sm font-bold text-primary">310.000.000</span>
<span className="font-label-sm text-label-sm font-bold text-primary">VNĐ</span>
</div>
</div>
<div className="text-right font-label-sm text-label-sm text-on-surface-variant">
                Tương đương: <strong className="text-on-surface font-data-mono">620.000 đ / Hộp trọn gói</strong>
</div>
</div>
</div>

<div className="flex flex-col gap-space-md">
<span className="font-title-md text-title-md font-bold text-on-surface">
              2. Cam Kết Tiến Độ & Điều Khoản Thương Mại (Milestone)
            </span>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">

<div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-xs">
<div className="flex items-center gap-space-xs text-primary font-semibold">
<span className="material-symbols-outlined text-[18px]">local_shipping</span>
<span className="font-label-md text-label-md">Cam kết tiến độ bàn giao</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface font-medium">
                  Giao hàng toàn bộ trong vòng <span className="font-bold text-primary">12 ngày</span> sau khi hai bên ký Hợp Đồng Điện Tử và nhận cọc Milestone 1 (M1).
                </p>
<div className="flex items-center gap-space-xs mt-1 p-1.5 rounded bg-surface-container-lowest font-data-mono text-body-sm text-on-surface">
<span className="material-symbols-outlined text-[16px] text-tertiary">calendar_today</span>
<span>Dự kiến giao hàng hoàn tất: <strong>22/08/2025</strong></span>
</div>
</div>

<div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-xs">
<div className="flex items-center gap-space-xs text-secondary font-semibold">
<span className="material-symbols-outlined text-[18px]">hourglass_bottom</span>
<span className="font-label-md text-label-md">Thời hạn hiệu lực của Báo giá</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface font-medium">
                  Báo giá này có giá trị hiệu lực thực hiện trong vòng <span className="font-bold text-on-surface">15 ngày</span> kể từ ngày nộp hồ sơ.
                </p>
<div className="flex items-center gap-space-xs mt-1 p-1.5 rounded bg-surface-container-lowest font-data-mono text-body-sm text-on-surface">
<span className="material-symbols-outlined text-[16px] text-secondary">event_available</span>
<span>Hết hạn giữ giá: <strong>28/08/2025</strong></span>
</div>
</div>
</div>

<div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs text-tertiary font-semibold">
<span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
<span className="font-label-md text-label-md">Đề xuất lộ trình thanh toán ký quỹ Escrow (3 Chặng)</span>
</div>
<span className="px-2 py-0.5 rounded bg-tertiary/10 text-tertiary font-label-sm text-label-sm font-semibold">
                  Chuẩn bảo chứng MoonMarket
                </span>
</div>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
<div className="p-space-sm bg-surface-container-lowest rounded-lg flex flex-col gap-1 shadow-xs">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm font-bold text-primary">Mốc 1 (M1): 30%</span>
<span className="font-data-mono text-data-mono font-bold text-on-surface">93.000.000đ</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface font-medium">Kích hoạt sản xuất & Đúc khuôn</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Giải ngân ngay khi ký HĐ điện tử & duyệt mẫu khắc gỗ laser.</span>
</div>
<div className="p-space-sm bg-surface-container-lowest rounded-lg flex flex-col gap-1 shadow-xs">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm font-bold text-secondary">Mốc 2 (M2): 40%</span>
<span className="font-data-mono text-data-mono font-bold text-on-surface">124.000.000đ</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface font-medium">Hoàn tất nướng & Lắp ráp 50%</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Nghiệm thu ảnh chụp xưởng & báo cáo kiểm định ATTP lô hàng.</span>
</div>
<div className="p-space-sm bg-surface-container-lowest rounded-lg flex flex-col gap-1 shadow-xs">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm font-bold text-tertiary">Mốc 3 (M3): 30%</span>
<span className="font-data-mono text-data-mono font-bold text-on-surface">93.000.000đ</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface font-medium">Bàn giao & Đối soát VAT</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Bàn giao đủ 500 hộp tại 4 chi nhánh MB Bank kèm hóa đơn đỏ.</span>
</div>
</div>
</div>
</div>

<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md font-bold text-on-surface">
                3. Đính Kèm Hồ Sơ Năng Lực Xưởng & Hồ Sơ Pháp Lý
              </span>
<span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">verified</span>
                Đã xác thực HACCP / ISO
              </span>
</div>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">

<div className="p-space-sm bg-surface-container-low rounded-lg flex items-center gap-space-sm">
<div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
</div>
<div className="flex flex-col min-w-0 flex-1">
<span className="font-label-md text-label-md font-semibold text-on-surface truncate">ISO_22000_TrangAn_2025.pdf</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">2.4 MB • Có dấu mộc đỏ</span>
</div>
<span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
</div>

<div className="p-space-sm bg-surface-container-low rounded-lg flex items-center gap-space-sm">
<div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[24px]">verified_user</span>
</div>
<div className="flex flex-col min-w-0 flex-1">
<span className="font-label-md text-label-md font-semibold text-on-surface truncate">Giay_Chung_Nhan_ATTP_CucATTP.pdf</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">1.8 MB • Hạn đến 2027</span>
</div>
<span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
</div>

<div className="p-space-sm bg-surface-container-low rounded-lg flex items-center gap-space-sm">
<div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[24px]">photo_library</span>
</div>
<div className="flex flex-col min-w-0 flex-1">
<span className="font-label-md text-label-md font-semibold text-on-surface truncate">Anh_Xuong_Phong_Sach_&_HopGo.zip</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">14.6 MB • 12 ảnh thực tế</span>
</div>
<span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
</div>
</div>

<label className="w-full p-space-sm rounded-lg bg-surface-container-lowest flex items-center justify-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
<span className="material-symbols-outlined text-[18px]">upload_file</span>
<span className="font-label-md text-label-md font-medium">Bấm để tải thêm tài liệu kiểm nghiệm nguyên liệu, hợp đồng mẫu tương tự (Tối đa 25MB)</span>
</label>
</div>

<div className="pt-space-md flex flex-col gap-space-sm">
<div className="flex flex-col sm:flex-row items-center justify-between gap-space-md">
<div className="flex items-center gap-space-xs text-on-surface-variant">
<span className="material-symbols-outlined text-[18px]">lock</span>
<span className="font-body-sm text-body-sm">
                  Gói thầu bảo mật hai chiều. Báo giá của bạn được mã hóa an toàn đến khi khách mở thầu.
                </span>
</div>

<div className="flex items-center gap-space-sm w-full sm:w-auto">
<button className="flex-1 sm:flex-none px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors font-label-md text-label-md font-semibold flex items-center justify-center gap-space-xs" id="btn-preview-bid" type="button">
<span className="material-symbols-outlined text-[18px]">preview</span>
<span>Xem lại trước khi gửi</span>
</button>
<button className="flex-1 sm:flex-none px-space-xl py-space-sm rounded-lg bg-primary-container text-on-primary hover:opacity-95 shadow-md transition-all font-label-md text-label-md font-bold flex items-center justify-center gap-space-xs" id="btn-submit-bid" type="button">
<span className="material-symbols-outlined text-[20px]">send</span>
<span>Gửi Báo Giá Ngay</span>
</button>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant text-center sm:text-right">
              * Lưu ý: Sau khi bấm gửi, xưởng có thể sửa đổi báo giá tự do cho đến khi hết hạn deadline nhận thầu (23:59 • 15/08/2025).
            </p>
</div>
</div>
</div>
</div>
</div>

<div className="fixed inset-0 z-50 hidden flex items-center justify-center p-space-md bg-inverse-surface/40 backdrop-blur-sm" id="decline-modal">
<div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl shadow-xl p-space-lg flex flex-col gap-space-md animate-in fade-in zoom-in-95 duration-200">
<div className="flex items-center justify-between pb-space-xs">
<div className="flex items-center gap-space-xs text-error">
<span className="material-symbols-outlined text-[24px]">cancel</span>
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">Từ chối tham gia RFQ</span>
</div>
<button className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant" id="btn-close-modal" type="button">
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
        Quý xưởng đang thực hiện từ chối lời mời thầu cho gói <strong className="text-on-surface">RFQ-2025-08910 (500 Hộp Quà Doanh Nghiệp Ngân Hàng)</strong>. Vui lòng chọn lý do để sàn và bên mua cập nhật danh sách nhà cung ứng:
      </p>

<div className="flex flex-col gap-space-xs">
<label className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-space-sm cursor-pointer hover:bg-surface-container transition-colors">
<input defaultChecked className="w-4 h-4 text-primary focus:ring-0" name="decline-reason" type="radio" value="capacity"/>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Không đủ năng lực sản xuất đúng hạn</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Xưởng đã kín công suất các mẻ bánh trước ngày 22/08/2025</span>
</div>
</label>
<label className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-space-sm cursor-pointer hover:bg-surface-container transition-colors">
<input className="w-4 h-4 text-primary focus:ring-0" name="decline-reason" type="radio" value="price"/>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Giá mục tiêu của bên mua quá thấp</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Không cân đối được chi phí phôi gỗ cao cấp và nhân vi cá hảo hạng</span>
</div>
</label>
<label className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-space-sm cursor-pointer hover:bg-surface-container transition-colors">
<input className="w-4 h-4 text-primary focus:ring-0" name="decline-reason" type="radio" value="material"/>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Hết nguyên liệu / Phôi hộp gỗ đặc biệt</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Đơn vị gia công phôi hộp gỗ chưa kịp bổ sung lượng gỗ tương ứng</span>
</div>
</label>
<label className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-space-sm cursor-pointer hover:bg-surface-container transition-colors">
<input className="w-4 h-4 text-primary focus:ring-0" name="decline-reason" type="radio" value="other"/>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Lý do điều phối nội bộ khác</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Ưu tiên phục vụ các hợp đồng B2B đã cam kết trước đó</span>
</div>
</label>
</div>

<div className="flex items-center justify-end gap-space-sm pt-space-sm">
<button className="px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-highest transition-colors" id="btn-cancel-decline" type="button">
          Giữ lại RFQ để suy nghĩ thêm
        </button>
<button className="px-space-md py-space-sm rounded-lg bg-error text-on-error font-label-md text-label-md font-semibold hover:opacity-90 shadow-sm transition-opacity" id="btn-confirm-decline" type="button">
          Xác nhận từ chối lời mời
        </button>
</div>
</div>
</div>

<div className="fixed bottom-6 right-6 z-50 hidden max-w-md p-space-md bg-inverse-surface text-inverse-on-surface rounded-xl shadow-xl flex items-center gap-space-sm animate-in slide-in-from-bottom duration-300" id="toast-notification">
<span className="material-symbols-outlined text-tertiary-fixed text-[24px]">task_alt</span>
<div className="flex flex-col flex-1">
<span className="font-label-md text-label-md font-bold" id="toast-title">Báo giá đã gửi thành công!</span>
<span className="font-body-sm text-body-sm text-on-surface-variant text-surface-container-high" id="toast-desc">
        Đã niêm phong gói bid 310.000.000 VNĐ. Bạn có thể sửa đổi đến trước deadline 15/08.
      </span>
</div>
</div>


</div></main><footer className="w-full bg-surface-container-low mt-space-xl shadow-[0_-1px_6px_rgba(0,0,0,0.02)]"><div className="w-full px-margin py-space-xl"><div className="grid grid-cols-1 md:grid-cols-4 gap-gutter"><div className="flex flex-col gap-space-sm"><div className="flex items-center gap-space-xs"><div className="w-7 h-7 rounded bg-primary-container flex items-center justify-center text-on-primary font-headline-sm font-bold text-sm">M</div><span className="font-headline-sm text-headline-sm font-bold text-primary">MoonMarket B2B</span></div><p className="font-body-sm text-body-sm text-on-surface-variant">Cổng vận hành thương mại & đấu thầu sản xuất bánh Trung Thu dành riêng cho xưởng bánh artisan và cơ sở sản xuất quy mô lớn.</p><div className="flex items-center gap-space-xs font-label-sm text-label-sm text-tertiary font-semibold"><span className="material-symbols-outlined text-[18px]">verified_user</span><span>Chuẩn kiểm duyệt HACCP / ISO 22000</span></div></div><div className="flex flex-col gap-space-sm"><span className="font-label-md text-label-md font-semibold text-on-surface">Hỗ trợ Xưởng bánh 24/7</span><p className="font-body-sm text-body-sm text-on-surface-variant">Hotline ưu tiên xưởng: <strong className="text-on-surface font-semibold">1800 6886 (Nhánh 2)</strong></p><p className="font-body-sm text-body-sm text-on-surface-variant">Tranh chấp & Đền bù đơn: <strong className="text-on-surface font-semibold">dispute@moonmarket.vn</strong></p><p className="font-body-sm text-body-sm text-on-surface-variant">Kỹ thuật sàn & Tích hợp ERP: 8h30 - 22h00</p></div><div className="flex flex-col gap-space-sm"><span className="font-label-md text-label-md font-semibold text-on-surface">Chính sách & Pháp chế B2B</span><div className="flex flex-col gap-space-xs"><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Quy chế bảo lãnh ký quỹ Escrow</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Cam kết tiêu chuẩn ATTP & Bao bì</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Chính sách phạt vi phạm tiến độ giao</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Quy trình đối soát hóa đơn VAT</a></div></div><div className="flex flex-col gap-space-sm"><span className="font-label-md text-label-md font-semibold text-on-surface">Bảo chứng Thanh toán & Pháp lý</span><div className="p-space-sm bg-surface-container rounded-lg"><div className="flex items-center gap-space-xs text-secondary mb-1"><span className="material-symbols-outlined text-[18px]">shield</span><span className="font-label-sm text-label-sm font-semibold">Bảo lãnh Escrow 100%</span></div><p className="font-body-sm text-body-sm text-on-surface-variant">Tiền cọc 40-70% phong tỏa an toàn ngay khi chốt PO. Tự động giải ngân theo mốc nghiệm thu thành công.</p></div></div></div><div className="mt-space-lg pt-space-md flex flex-col md:flex-row items-center justify-between text-on-surface-variant font-body-sm text-body-sm gap-space-sm"><div>© 2024 MoonMarket Enterprise Platform. Tất cả quyền được bảo lưu.</div><div className="flex gap-space-md font-label-sm text-label-sm"><span className="text-tertiary font-semibold">Hệ thống hoạt động bình thường (99.98%)</span><span>Phiên bản Hub: v4.2.0-b2b</span></div></div></div></footer>
    </div>
  );
}
