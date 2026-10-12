import React from 'react';

export default function OrderManage({ onNavigate }) {
  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-20 w-full px-margin flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-lg"><div className="flex items-center gap-space-sm"><div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary font-headline-md font-bold">M</div><div className="flex flex-col"><div className="flex items-center gap-space-xs"><span className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">MoonMarket</span><span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">B2B Hub</span></div><span className="font-label-sm text-label-sm text-on-surface-variant">Cổng Đối Tác Xưởng Bánh</span></div></div><div className="hidden xl:flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-xs rounded-full"><div className="flex items-center gap-space-xs"><span className="w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse"></span><span className="font-label-sm text-label-sm font-semibold text-on-surface">Đang mở bán</span></div><span className="text-outline-variant font-body-sm">|</span><div className="flex items-center gap-1 text-tertiary font-label-sm text-label-sm font-semibold"><span className="material-symbols-outlined text-[16px]">verified</span><span>Đối tác Vàng (98/100)</span></div></div></div><div className="hidden md:flex flex-1 max-w-md items-center bg-surface-container-low px-space-md py-space-xs rounded-lg"><span className="material-symbols-outlined text-outline text-[20px] mr-space-xs">search</span><input className="bg-transparent w-full text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none" placeholder="Tra cứu mã đơn B2B, SKU bánh, phiên RFQ..." type="text"/></div><div className="flex items-center gap-space-md"><div className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"><span className="material-symbols-outlined text-on-surface-variant text-[22px]">notifications</span><span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-on-primary text-[10px] font-bold rounded-full flex items-center justify-center">5</span></div><div className="flex items-center gap-space-sm pl-space-sm"><div className="hidden lg:flex flex-col text-right"><span className="font-label-md text-label-md font-semibold text-on-surface">Xưởng Tràng An Bakery</span><span className="font-label-sm text-label-sm text-on-surface-variant">Admin: Trần Đức Thắng</span></div><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></div><div className="w-full px-margin bg-surface-container-lowest"><nav className="flex items-center gap-space-xs overflow-x-auto py-space-xs" data-active-classes="bg-primary-container text-on-primary font-semibold shadow-sm"><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="dashboard-doanh-so" href="#">Dashboard & Doanh số</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="san-pham-khuyen-mai" href="#">Sản phẩm & Khuyến mãi (Bậc thang)</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="don-hang-dong-goi-b2b" href="#">Đơn hàng & Đóng gói B2B</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="dau-thau-rfq-bao-gia" href="#">Đấu thầu RFQ & Báo giá</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="hop-dong-milestone" href="#">Hợp đồng & Milestone</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="giao-van-vi-escrow" href="#">Giao vận & Ví Escrow</a><a className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" data-path="cai-dat-gian-hang" href="#">Cài đặt gian hàng</a></nav></div></header><main className="w-full pt-20 bg-surface min-h-screen"><div className="flex flex-col w-full">
<div className="w-full px-margin py-space-md bg-surface-container-low flex flex-col gap-space-xs">
<div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
<span>MoonMarket Supplier Portal</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span>Đơn hàng Doanh nghiệp</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-primary font-semibold">Đơn hàng #ORD-2025-0814</span>
</div>
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-md">
<h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">Quản lý Đơn Hàng B2B & Duyệt Mockup Đóng Gói</h1>
<span className="px-space-sm py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          Cần Xử Lý Ngay (SLA: 03h 42m)
        </span>
</div>
<div className="flex items-center gap-space-sm">
<button className="px-space-md py-space-xs rounded bg-surface-container text-on-surface font-label-md text-label-md font-semibold flex items-center gap-space-xs shadow-sm hover:bg-surface-container-high transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">print</span>
          Xuất PO & Bảng Kê Vật Tư
        </button>
<button className="px-space-md py-space-xs rounded bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center gap-space-xs shadow-sm hover:bg-primary-container transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">support_agent</span>
          Liên hệ AM MoonMarket
        </button>
</div>
</div>
</div>
<div className="w-full px-margin py-space-md bg-surface-container-lowest shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
<div className="flex items-center gap-space-xs overflow-x-auto pb-1" id="orderStatusFilters">
<button className="px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all whitespace-nowrap bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center gap-1.5">
<span>Tất cả</span>
<span className="px-1.5 py-0.2 rounded-full bg-surface-container-high font-data-mono text-label-sm">42</span>
</button>
<button className="px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all whitespace-nowrap bg-primary-container text-on-primary font-semibold shadow-sm flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-primary-fixed animate-ping"></span>
<span>Chờ xác nhận</span>
<span className="px-1.5 py-0.2 rounded-full bg-on-primary/20 font-data-mono text-label-sm font-bold">3 đơn mới</span>
</button>
<button className="px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all whitespace-nowrap bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center gap-1.5">
<span>Đã xác nhận & Chờ cọc</span>
<span className="px-1.5 py-0.2 rounded-full bg-surface-container-high font-data-mono text-label-sm">4</span>
</button>
<button className="px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all whitespace-nowrap bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center gap-1.5">
<span>Đang chuẩn bị & Nướng bánh</span>
<span className="px-1.5 py-0.2 rounded-full bg-surface-container-high font-data-mono text-label-sm">8</span>
</button>
<button className="px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all whitespace-nowrap bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center gap-1.5">
<span>Đang giao</span>
<span className="px-1.5 py-0.2 rounded-full bg-surface-container-high font-data-mono text-label-sm">5</span>
</button>
<button className="px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all whitespace-nowrap bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center gap-1.5">
<span>Đã giao hoàn tất</span>
<span className="px-1.5 py-0.2 rounded-full bg-surface-container-high font-data-mono text-label-sm">22</span>
</button>
</div>
</div>
<div className="w-full px-margin py-space-lg flex flex-col gap-space-lg">
<div className="w-full rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden">
<div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-primary-fixed/20 pointer-events-none blur-3xl"></div>
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-low p-space-md rounded-lg">
<div className="flex flex-col sm:flex-row sm:items-center gap-space-md">
<div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-md">
<span className="material-symbols-outlined text-[32px]">inventory_2</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-space-sm flex-wrap">
<span className="font-data-mono text-headline-sm font-bold text-primary">#ORD-2025-0814</span>
<span className="px-space-sm py-0.5 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold">Ưu tiên Gấp (P1)</span>
<span className="px-space-sm py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">verified</span>
                Khách VIP B2B Tự Doanh
              </span>
</div>
<span className="font-title-md text-title-md text-on-surface mt-1 font-bold">250 Hộp Bánh Tràng An Cao Cấp • Tập Đoàn Bất Động Sản An Phát</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Người đại diện mua: Nguyễn Tiến Huy (Phòng Hành chính - Đối ngoại) | MST: 0108923412</span>
</div>
</div>
<div className="flex items-center gap-space-sm">
<button className="px-space-lg py-space-sm rounded bg-surface-container-high hover:bg-error-container hover:text-on-error-container text-error font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5 shadow-sm"  type="button">
<span className="material-symbols-outlined text-[18px]">cancel</span>
            Từ chối đơn
          </button>
<button className="px-space-lg py-space-sm rounded bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5 shadow-md" id="btnConfirmOrder"  type="button">
<span className="material-symbols-outlined text-[18px]">task_alt</span>
            Xác nhận đơn hàng
          </button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Tổng giá trị đơn (Gồm VAT)</span>
<div className="mt-2 flex flex-col">
<span className="font-data-mono text-headline-sm font-bold text-on-surface">59.524.200 <span className="text-sm font-normal text-on-surface-variant">VNĐ</span></span>
<span className="font-body-sm text-body-sm text-tertiary font-medium">Đơn giá: 238.096 đ/hộp (Đã CK 18%)</span>
</div>
</div>
<div className="p-space-md rounded-lg bg-secondary-fixed/20 flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">Yêu cầu Cọc M1 (30%)</span>
<span className="material-symbols-outlined text-secondary text-[18px]">account_balance_wallet</span>
</div>
<div className="mt-2 flex flex-col">
<span className="font-data-mono text-headline-sm font-bold text-secondary">17.857.260 <span className="text-sm font-normal">VNĐ</span></span>
<span className="font-body-sm text-body-sm text-on-secondary-fixed-variant">MoonMarket Escrow bảo lãnh giải ngân</span>
</div>
</div>
<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Hạn giao hàng yêu cầu</span>
<span className="material-symbols-outlined text-primary text-[18px]">calendar_month</span>
</div>
<div className="mt-2 flex flex-col">
<span className="font-data-mono text-headline-sm font-bold text-primary">25/08/2025</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Trước Rằm Trung Thu 20 ngày</span>
</div>
</div>
<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Cấu hình nhân bánh SKU</span>
<span className="material-symbols-outlined text-tertiary text-[18px]">bakery_dining</span>
</div>
<div className="mt-2 flex flex-col">
<span className="font-title-md text-title-md font-semibold text-on-surface">Bào ngư xá xíu + Sen nhuyễn</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Trọng lượng: 180g / chiếc (Hộp 4 bánh)</span>
</div>
</div>
</div>
<div className="hidden p-space-md rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-between transition-all" id="statusAlertBox">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-[24px]">verified</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold">Xác nhận đơn thành công! Đã gửi thông báo ký hợp đồng điện tử.</span>
<span className="font-body-sm text-body-sm">Hệ thống đang chờ đối tác An Phát Corp giải ngân M1 (17.857.260 VNĐ) vào ví ký quỹ Escrow.</span>
</div>
</div>
<span className="font-data-mono text-label-sm font-semibold">Tự động đồng bộ ERP Xưởng</span>
</div>
</div>
<div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter">
<div className="lg:col-span-8 flex flex-col gap-space-lg">
<div className="w-full rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between pb-space-sm">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary text-[24px]">brush</span>
<h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Quy chuẩn Thiết kế & Đóng gói In Logo Doanh nghiệp</h2>
</div>
<span className="px-space-sm py-0.5 rounded bg-tertiary text-on-tertiary font-label-sm text-label-sm font-semibold">Hợp đồng mẫu B2B Custom</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md bg-surface-container-low p-space-md rounded-lg">
<div className="flex flex-col gap-space-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Quy cách vỏ hộp theo yêu cầu</span>
<div className="flex items-start gap-space-sm mt-1">
<span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">verified_user</span>
<p className="font-body-md text-body-md text-on-surface">
<strong className="font-semibold text-primary">Hộp gỗ sơn mài đỏ Ruby</strong>, phủ bóng piano 3 lớp. 
                  Khay lót lụa vàng ánh kim định hình 4 bánh 180g kèm ngăn trà Ô Long thượng hạng.
                </p>
</div>
</div>
<div className="flex flex-col gap-space-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Công nghệ in & Ép kim</span>
<div className="flex items-start gap-space-sm mt-1">
<span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">stars</span>
<p className="font-body-md text-body-md text-on-surface">
<strong className="font-semibold text-primary">Dập chìm nhũ vàng 18K</strong> chuẩn Pantone 10123C. 
                  Kích thước logo: <strong className="font-data-mono">60 x 25 mm</strong> chính giữa nắp hộp. Kèm túi xách giấy mỹ thuật ép kim quai lụa.
                </p>
</div>
</div>
</div>
<div className="flex flex-col sm:flex-row items-center justify-between gap-space-md p-space-md rounded-lg bg-surface-container">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary font-bold">
<span className="material-symbols-outlined text-[28px]">description</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<span className="font-title-md text-title-md font-semibold text-on-surface">AnPhatCorp_Logo_Vector.svg</span>
<span className="px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-data-mono text-label-sm">CMYK Ready</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Định dạng Vector chuẩn in ấn • Kích thước: 3.4 MB • Tải lên: 14/08/2025</span>
</div>
</div>
<a className="px-space-md py-space-xs rounded bg-surface-container-highest hover:bg-surface-dim text-on-surface font-label-md text-label-md font-semibold flex items-center gap-space-xs shadow-sm transition-colors whitespace-nowrap" href="#download">
<span className="material-symbols-outlined text-[18px]">download</span>
              Tải file gốc Vector
            </a>
</div>
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<label className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-space-xs">
<span>Upload Mockup Phối cảnh 3D Sản Phẩm Thực Tế</span>
<span className="text-error">*</span>
</label>
<span className="font-label-sm text-label-sm text-on-surface-variant">Tối thiểu 3 góc nhìn (Nắp hộp, Lòng khay, Túi xách)</span>
</div>
<div className="w-full p-space-lg rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container transition-all group">
<div className="w-16 h-16 rounded-full bg-surface-container-highest group-hover:scale-110 transition-transform flex items-center justify-center text-primary mb-space-sm">
<span className="material-symbols-outlined text-[32px]">cloud_upload</span>
</div>
<p className="font-title-md text-title-md font-semibold text-on-surface">Kéo và thả file Render Mockup 3D (.ZIP, .PDF, .GLB, .PNG cao phân giải)</p>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Dung lượng tối đa 100MB / file. Bản vẽ kỹ thuật bao bì phải có tỷ lệ chi tiết 1:1.</p>
<div className="mt-space-md flex gap-space-sm">
<button className="px-space-md py-space-xs rounded bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-sm" type="button">
                  Chọn file từ máy tính
                </button>
<button className="px-space-md py-space-xs rounded bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold" type="button">
                  Mẫu khung bao bì MoonMarket
                </button>
</div>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-xs">
<div className="flex flex-col gap-space-xs">
<div className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface-container-high shadow-sm group">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="Photorealistic 3D render of luxury ruby red lacquer mooncake box with 18k gold embossed corporate logo on top lid, warm festive lighting, high-end Vietnamese craftsmanship." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuvs4EMCidOPYH-WCYtHsUxgKRbKCfhl2muUUzI0SKwsfok5q1oKA37GfByWiCBhmvX7xtQRcxkCC9N5YmMse97LyrK9jR9IR2xYWBKrfUgD_ZhTzGMW3jsBAMQPUL3wQIXezTkG-2l5h2MGBWZ_Ue_l19hr975M3qpzFtjwwo13YljvcsNgtaXIQSytGvp8YqpcYQbs7UzvBuoEdznauNBa2SZ7oyTWNM4iwTqylvuHseB7ymydys"/>
<span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-inverse-surface/80 text-inverse-on-surface font-label-sm text-label-sm">Góc 1: Mặt nắp dập logo</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant truncate">AnPhat_BoxTop_18K_v2.png (14.2 MB)</span>
</div>
<div className="flex flex-col gap-space-xs">
<div className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface-container-high shadow-sm group">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="High quality mock-up photo of the open mooncake box revealing silk gold lining with four artisan mooncakes and premium Oolong tea tin, ruby red exterior with An Phat logo." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlxqlzJhuuBmOrZ0NGmCZLCsTc5t2SjLnfrvX2Lh-4de-HMlTNvgQWLjQn1zZYJHQBDTwFTAiNo9O_QuVW1Wd3pJUfrnwDO8CpXCPMfrB7vayQbRzKJ4EpNBUV7Bgcs-02JHyBlf5qBbUsUvVVi6mK5V4lxb--tmZT3IJdO0l10qi2v5fIFiB1Hi9qtzc5pdQoAWLsNWgGfjnbOJnGvzqUpkdTNJkdo5GjPWEUF80LwLQv7UlWtSII"/>
<span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-inverse-surface/80 text-inverse-on-surface font-label-sm text-label-sm">Góc 2: Khay lụa vàng lót bánh</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant truncate">AnPhat_Interior_Lining_v2.png (16.8 MB)</span>
</div>
<div className="flex flex-col gap-space-xs">
<div className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface-container-high shadow-sm group">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="Matching corporate gift paper bag crafted from heavyweight fine art paper with ruby red lacquer finish, gold foil embossed logo and thick ribbon handle." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAepgBN-dAIpJmw6glFdC1p08wD7BS0tf5oCB9Ox2yWklEnIOhL_3rhi4mmaeZf0_V9uX69H0raoDx5SrA86p0VCrITP7nKISgk49OJL7UUBptNVha7FK70NUmTnpjdquYnff8AC8GxK620_AiUp2-BtoAyBHeofDheJvHmQAQ4dVC52LFHAoB1pBJDHPOZwH0Gp8tSN-lR7FWOouVtlg6Ama9Stesan8duqmjubNJgy6s9NFXSFXB"/>
<span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-inverse-surface/80 text-inverse-on-surface font-label-sm text-label-sm">Góc 3: Túi xách giấy đồng bộ</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant truncate">AnPhat_PaperBag_Ribbon_v2.png (11.5 MB)</span>
</div>
</div>
<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="flex flex-col">
<label className="font-title-md text-title-md font-bold text-on-surface">Phụ phí thiết kế khuôn kẽm & ra mẫu thử</label>
<span className="font-body-sm text-body-sm text-on-surface-variant">Chính sách xưởng Tràng An: Miễn phí khuôn đúc nhũ cho đơn hàng &gt; 100 hộp.</span>
</div>
<div className="flex items-center gap-space-sm">
<div className="flex items-center gap-2 px-space-md py-space-xs rounded bg-surface-container-lowest shadow-sm">
<input className="w-16 text-right font-data-mono font-bold text-headline-sm text-tertiary bg-transparent focus:outline-none" type="text" value="0"/>
<span className="font-label-md text-label-md font-semibold text-on-surface-variant">VNĐ</span>
</div>
<span className="px-space-sm py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold uppercase">Ưu đãi B2B Miễn Phí</span>
</div>
</div>
</div>
<div className="w-full rounded-lg bg-secondary-fixed/30 p-space-md flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary text-[24px] mt-0.5">lock_clock</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-secondary-fixed">Cảnh báo pháp lý & Tiến độ chốt khuôn</span>
<p className="font-body-sm text-body-sm text-on-secondary-fixed-variant mt-0.5">
              Sau khi thiết kế Version 2 được khách hàng phê duyệt chính thức trên hệ thống, toàn bộ bản vẽ kỹ thuật sẽ bị khóa vĩnh viễn, được cấp mã băm SHA-256 đưa vào phụ lục hợp đồng B2B. Mọi sửa đổi sau thời điểm này sẽ tính chi phí hủy khuôn kẽm (1.500.000 VNĐ / lần).
            </p>
</div>
</div>
</div>
<div className="lg:col-span-4 flex flex-col gap-space-lg">
<div className="w-full rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between pb-space-sm">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[22px]">find_replace</span>
<h3 className="font-title-md text-title-md font-bold text-on-surface">Vòng Duyệt Thiết Kế (Version Log)</h3>
</div>
<span className="font-data-mono text-label-sm text-on-surface-variant">2 Lần Duyệt</span>
</div>
<div className="flex flex-col gap-space-md relative pl-4">
<div className="absolute left-1.5 top-3 bottom-3 w-0.5 bg-surface-container-highest"></div>
<div className="flex flex-col gap-space-xs relative">
<span className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-surface-variant"></span>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-bold text-on-surface-variant">Version 1.0 (Bản thảo đầu)</span>
<span className="font-data-mono text-body-sm text-on-surface-variant">11/08 - 14:20</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low p-space-sm rounded">
<strong className="text-on-surface font-semibold">Phản hồi từ Khách:</strong> "Kích thước logo 50mm trên nắp hơi nhỏ so với tổng thể hộp sơn mài. Xưởng hỗ trợ phóng to thêm 10% (lên 60x25mm) và căn lùi xuống dưới 5mm nhé."
              </p>
<div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px]">change_circle</span>
<span>Yêu cầu chỉnh sửa lại</span>
</div>
</div>
<div className="flex flex-col gap-space-xs relative">
<span className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-tertiary"></span>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-bold text-tertiary">Version 2.0 (Bản chốt duyệt)</span>
<span className="font-data-mono text-body-sm text-on-surface-variant">13/08 - 09:15</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface bg-tertiary-fixed/30 p-space-sm rounded">
<strong className="text-tertiary font-semibold">Khách hàng xác nhận:</strong> "Mockup v2 rất đẹp, màu nhũ 18K trên nền sơn mài Ruby khớp chuẩn nhận diện thương hiệu An Phát Corp. Chúng tôi duyệt bản thiết kế này."
              </p>
<div className="p-space-xs rounded bg-tertiary text-on-tertiary flex items-center justify-center gap-1 font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-[16px]">check_circle</span>
                ĐÃ DUYỆT THIẾT KẾ - CHUYỂN SANG BẮT KHUÔN ĐÚC
              </div>
</div>
</div>
<div className="pt-space-sm flex flex-col gap-space-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Tải lên phiên bản chỉnh sửa v2.1 (Nếu có)</span>
<button className="w-full py-space-xs rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-colors flex items-center justify-center gap-space-xs" type="button">
<span className="material-symbols-outlined text-[18px]">add_circle</span>
              Tạo phiên bản Mockup mới
            </button>
</div>
</div>
<div className="w-full rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between pb-space-sm">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[22px]">factory</span>
<h3 className="font-title-md text-title-md font-bold text-on-surface">Tiến Độ Kế Hoạch Sản Xuất</h3>
</div>
<span className="font-data-mono text-label-sm text-secondary font-bold">7 Ngày Làm Việc</span>
</div>
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between text-body-sm">
<span className="text-on-surface font-medium">1. Khắc khuôn đúc nhũ đồng</span>
<span className="text-tertiary font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">done</span> Xong 100%
              </span>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-tertiary h-full w-full rounded-full"></div>
</div>
<div className="flex items-center justify-between text-body-sm pt-space-xs">
<span className="text-on-surface font-medium">2. Sản xuất vỏ hộp sơn mài Ruby</span>
<span className="text-on-surface-variant font-data-mono">Dự kiến: 18/08</span>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-secondary h-full w-[40%] rounded-full"></div>
</div>
<div className="flex items-center justify-between text-body-sm pt-space-xs">
<span className="text-on-surface font-medium">3. Nướng bánh mẻ tươi đợt 1 (180g)</span>
<span className="text-on-surface-variant font-data-mono">Dự kiến: 22/08</span>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-outline h-full w-0 rounded-full"></div>
</div>
<div className="flex items-center justify-between text-body-sm pt-space-xs">
<span className="text-on-surface font-medium">4. Đóng hộp, gắn nơ & QC kiểm duyệt</span>
<span className="text-on-surface-variant font-data-mono">Dự kiến: 24/08</span>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-outline h-full w-0 rounded-full"></div>
</div>
</div>
<div className="p-space-sm rounded-lg bg-surface-container flex items-center justify-between mt-space-xs">
<span className="font-body-sm text-body-sm text-on-surface-variant">Địa chỉ kho giao hàng B2B:</span>
<span className="font-label-sm text-label-sm font-semibold text-on-surface text-right">Tòa nhà An Phát Tower, Cầu Giấy, HN</span>
</div>
</div>
</div>
</div>
</div>
<div className="fixed inset-0 z-50 hidden flex items-center justify-center p-space-md bg-inverse-surface/50 backdrop-blur-sm" id="rejectModal">
<div className="w-full max-w-lg rounded-xl bg-surface-container-lowest p-space-lg shadow-xl flex flex-col gap-space-md animate-in fade-in zoom-in duration-200">
<div className="flex items-center justify-between pb-space-xs">
<div className="flex items-center gap-space-xs text-error">
<span className="material-symbols-outlined text-[24px]">warning</span>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Từ chối Đơn hàng B2B</h3>
</div>
<button className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant"  type="button">
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
        Quý xưởng vui lòng chọn lý do chính xác để MoonMarket phản hồi lại phía doanh nghiệp người mua hoặc đề xuất phương án điều phối xưởng dự phòng:
      </p>
<form className="flex flex-col gap-space-md" id="rejectForm" >
<div className="flex flex-col gap-space-sm">
<label className="flex items-start gap-space-sm p-space-sm rounded-lg hover:bg-surface-container-low cursor-pointer">
<input defaultChecked className="mt-1 accent-primary" name="reject_reason" type="radio" value="capacity"/>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface font-semibold">Xưởng đã kín dây chuyền nướng bánh</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Công suất lò nướng đã đạt 100% trong khung thời gian yêu cầu.</span>
</div>
</label>
<label className="flex items-start gap-space-sm p-space-sm rounded-lg hover:bg-surface-container-low cursor-pointer">
<input className="mt-1 accent-primary" name="reject_reason" type="radio" value="packaging"/>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface font-semibold">Không kịp nhập vỏ hộp theo ngày yêu cầu</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Quy trình sơn mài Ruby 3 lớp cần tối thiểu 12 ngày hoàn thiện.</span>
</div>
</label>
<label className="flex items-start gap-space-sm p-space-sm rounded-lg hover:bg-surface-container-low cursor-pointer">
<input className="mt-1 accent-primary" name="reject_reason" type="radio" value="ingredients"/>
<div className="flex flex-col">
<span className="font-title-md text-title-md font-semibold text-on-surface">Hết nguyên liệu nhân Bào ngư xá xíu thượng hạng</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Nguồn cung nhân đặc biệt không đủ đáp ứng số lượng 250 hộp.</span>
</div>
</label>
<label className="flex items-start gap-space-sm p-space-sm rounded-lg hover:bg-surface-container-low cursor-pointer">
<input className="mt-1 accent-primary" name="reject_reason" type="radio" value="other"/>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface font-semibold">Lý do khác</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Nhập chi tiết giải trình bên dưới.</span>
</div>
</label>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-semibold text-on-surface">Ghi chú bổ sung cho Khách hàng & Điều phối viên MoonMarket</label>
<textarea className="w-full p-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none placeholder:text-on-surface-variant" placeholder="Nhập lý do chi tiết hoặc thời gian sớm nhất xưởng có thể nhận đơn..." rows="3"></textarea>
</div>
<div className="flex items-center justify-end gap-space-sm pt-space-xs">
<button className="px-space-md py-space-xs rounded bg-surface-container text-on-surface font-label-md text-label-md font-semibold"  type="button">
            Quay lại
          </button>
<button className="px-space-md py-space-xs rounded bg-error text-on-error font-label-md text-label-md font-semibold shadow-sm hover:opacity-90" type="submit">
            Xác nhận Từ Chối Đơn
          </button>
</div>
</form>
</div>
</div>

</div></main><footer className="w-full bg-surface-container-low mt-space-xl shadow-[0_-1px_6px_rgba(0,0,0,0.02)]"><div className="w-full px-margin py-space-xl"><div className="grid grid-cols-1 md:grid-cols-4 gap-gutter"><div className="flex flex-col gap-space-sm"><div className="flex items-center gap-space-xs"><div className="w-7 h-7 rounded bg-primary-container flex items-center justify-center text-on-primary font-headline-sm font-bold text-sm">M</div><span className="font-headline-sm text-headline-sm font-bold text-primary">MoonMarket B2B</span></div><p className="font-body-sm text-body-sm text-on-surface-variant">Cổng vận hành thương mại & đấu thầu sản xuất bánh Trung Thu dành riêng cho xưởng bánh artisan và cơ sở sản xuất quy mô lớn.</p><div className="flex items-center gap-space-xs font-label-sm text-label-sm text-tertiary font-semibold"><span className="material-symbols-outlined text-[18px]">verified_user</span><span>Chuẩn kiểm duyệt HACCP / ISO 22000</span></div></div><div className="flex flex-col gap-space-sm"><span className="font-label-md text-label-md font-semibold text-on-surface">Hỗ trợ Xưởng bánh 24/7</span><p className="font-body-sm text-body-sm text-on-surface-variant">Hotline ưu tiên xưởng: <strong className="text-on-surface font-semibold">1800 6886 (Nhánh 2)</strong></p><p className="font-body-sm text-body-sm text-on-surface-variant">Tranh chấp & Đền bù đơn: <strong className="text-on-surface font-semibold">dispute@moonmarket.vn</strong></p><p className="font-body-sm text-body-sm text-on-surface-variant">Kỹ thuật sàn & Tích hợp ERP: 8h30 - 22h00</p></div><div className="flex flex-col gap-space-sm"><span className="font-label-md text-label-md font-semibold text-on-surface">Chính sách & Pháp chế B2B</span><div className="flex flex-col gap-space-xs"><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Quy chế bảo lãnh ký quỹ Escrow</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Cam kết tiêu chuẩn ATTP & Bao bì</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Chính sách phạt vi phạm tiến độ giao</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Quy trình đối soát hóa đơn VAT</a></div></div><div className="flex flex-col gap-space-sm"><span className="font-label-md text-label-md font-semibold text-on-surface">Bảo chứng Thanh toán & Pháp lý</span><div className="p-space-sm bg-surface-container rounded-lg"><div className="flex items-center gap-space-xs text-secondary mb-1"><span className="material-symbols-outlined text-[18px]">shield</span><span className="font-label-sm text-label-sm font-semibold">Bảo lãnh Escrow 100%</span></div><p className="font-body-sm text-body-sm text-on-surface-variant">Tiền cọc 40-70% phong tỏa an toàn ngay khi chốt PO. Tự động giải ngân theo mốc nghiệm thu thành công.</p></div></div></div><div className="mt-space-lg pt-space-md flex flex-col md:flex-row items-center justify-between text-on-surface-variant font-body-sm text-body-sm gap-space-sm"><div>© 2024 MoonMarket Enterprise Platform. Tất cả quyền được bảo lưu.</div><div className="flex gap-space-md font-label-sm text-label-sm"><span className="text-tertiary font-semibold">Hệ thống hoạt động bình thường (99.98%)</span><span>Phiên bản Hub: v4.2.0-b2b</span></div></div></div></footer>
    </div>
  );
}
