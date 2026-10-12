import React from 'react';

export default function ControllerPage({ onNavigate }) {
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest z-50 flex flex-col shadow-[0_1px_12px_rgba(0,0,0,0.06)] border-r border-outline-variant/30"><div className="h-20 px-space-md flex items-center gap-space-sm border-b border-outline-variant/20 bg-surface-container-low/40"><img alt="Logo biểu trưng thương hiệu sàn giao dịch B2B Bánh Trung Thu Mooncake Marketplace: biểu tượng vầng trăng rằm thanh lịch kết hợp hoa văn khuôn bánh truyền thống dập nổi vàng kim sang trọng trên nền đỏ trầm nhã nhặn.. Brand logo. - Primary color: #991b1b - Font: plusJakartaSans - Mode: light - Roundness: rounded-sm" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XeDH3ml-Oxy9w5fl0xKcYXZzLGzRPMBJAZpR8G80tab0cBtZrQ7_YfYflhLzmRN2uHc0sjIfX29rFpAto5mkXK_8CJNAc90yvMwH19nziuf_fMyXQbHwnnELW7O0Mtg7oUTPBeNuNccNI7sLjO5237vuzDzQnM78HYxZ3YuZpo2tjH0FZgBw7Woz7vXVCIGNjMsJ21mfCfp7P4n7MMkcw6U9YIFhCLwHrHNoPdUCq2mPD45CuedGPUF-0" /><div className="flex flex-col min-w-0 flex-1"><div className="flex items-center gap-space-xs"><span className="font-headline-sm text-headline-sm text-primary font-bold truncate leading-none">MoonMarket</span></div><div className="flex items-center gap-1.5 mt-1"><span className="inline-flex items-center px-1.5 py-0.5 rounded-DEFAULT bg-primary-container text-on-primary font-label-sm text-label-sm tracking-wider uppercase font-bold">Super Admin</span><span className="font-data-mono text-data-mono text-on-surface-variant text-[10px]">v4.2</span></div></div></div><div className="flex-1 overflow-y-auto px-space-sm py-space-md space-y-space-md"><nav className="space-y-space-md" data-active-classes="bg-primary-container text-on-primary font-title-md text-title-md shadow-[0_2px_8px_rgba(153,27,27,0.25)]"><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Tổng quan &amp; Điều hành</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="dashboard-tong-quan" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">grid_view</span><span className="font-body-md text-body-md">Dashboard Tổng quan</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#27</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="bao-cao-ai-analytics" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">insights</span><span className="font-body-md text-body-md">Báo cáo &amp; AI Analytics</span></div><span className="inline-flex items-center px-1.5 py-0.5 rounded-DEFAULT bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm font-bold">AI Live</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Duyệt &amp; Kiểm soát</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="duyet-nha-cung-cap" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">verified_user</span><span className="font-body-md text-body-md">Duyệt Nhà cung cấp</span></div><span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary-container text-on-primary font-data-mono text-data-mono font-bold text-[11px]">4</span></a><a aria-current="page" className="flex items-center justify-between px-space-sm py-2 rounded-xl transition-all group bg-primary-container text-on-primary font-title-md text-title-md shadow-[0_2px_8px_rgba(153,27,27,0.25)]" data-path="tranh-chap-khieu-nai" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">gavel</span><span className="font-body-md text-body-md">Tranh chấp &amp; Khiếu nại</span></div><span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-secondary-container text-on-secondary-container font-data-mono text-data-mono font-bold text-[11px]">2</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="kiem-duyet-noi-dung-review" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">rate_review</span><span className="font-body-md text-body-md">Kiểm duyệt Review</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#21</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Quản lý Thực thể</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="quan-ly-nguoi-dung" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">groups</span><span className="font-body-md text-body-md">Quản lý Người dùng</span></div><span className="font-data-mono text-data-mono text-on-surface-variant text-[11px]">B2B/B2C</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="quan-ly-gian-hang" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">storefront</span><span className="font-body-md text-body-md">Quản lý Gian hàng</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#3</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="danh-muc-template-shop" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">category</span><span className="font-body-md text-body-md">Danh mục &amp; Template</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#4</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Giao dịch &amp; Vận hành</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="dieu-phoi-giao-van" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">local_shipping</span><span className="font-body-md text-body-md">Điều phối Giao vận</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#19</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="so-giao-dich-vi-escrow" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">account_balance_wallet</span><span className="font-body-md text-body-md">Sổ GD &amp; Ví Escrow</span></div><span className="font-data-mono text-data-mono text-tertiary font-bold text-[11px]">Escrow</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="ho-so-tra-cuu-hop-dong" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">description</span><span className="font-body-md text-body-md">Đơn / RFQ / Hợp đồng</span></div><span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Hệ thống</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="cau-hinh-quy-tac-uy-tin" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">tune</span><span className="font-body-md text-body-md">Quy tắc &amp; Uy tín</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">RuleEngine</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="audit-log-nhat-ky-he-thong" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">receipt_long</span><span className="font-body-md text-body-md">Audit Log Hệ thống</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">SOC2</span></a></div></div></nav></div><div className="p-space-sm border-t border-outline-variant/20 bg-surface-container-low/60"><div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30"><div className="flex items-center gap-2.5 min-w-0"><div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm ring-2 ring-primary-container/20 shrink-0">TM</div><div className="min-w-0"><div className="font-title-md text-body-md text-on-surface font-semibold truncate leading-tight">Trần Minh Quân</div><div className="font-body-sm text-body-sm text-on-surface-variant truncate">Head of Operations</div></div></div><button className="p-1.5 rounded-lg text-outline hover:text-error hover:bg-error-container/40 transition-colors shrink-0" title="Đăng xuất an toàn" type="button"><span className="material-symbols-outlined text-[20px]">logout</span></button></div></div></aside><div className="pl-72"><header className="fixed top-0 left-72 right-0 h-20 bg-surface/90 backdrop-blur-xl z-40 border-b border-outline-variant/20 shadow-[0_1px_8px_rgba(0,0,0,0.03)]"><div className="h-20 w-full px-space-md flex items-center justify-between gap-space-md"><div className="flex-1 max-w-xl"><div className="relative flex items-center"><span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">search</span><input className="w-full pl-11 pr-20 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/40 font-body-md text-body-md text-on-surface placeholder:text-outline/70 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Tra cứu nhanh MST, Mã RFQ, Số HĐ, SKU, Người dùng, Gian hàng..." type="text" /><div className="absolute right-2.5 flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded-DEFAULT bg-surface-container text-outline font-data-mono text-[11px] font-semibold border border-outline-variant/30">Ctrl</kbd><kbd className="px-1.5 py-0.5 rounded-DEFAULT bg-surface-container text-outline font-data-mono text-[11px] font-semibold border border-outline-variant/30">K</kbd></div></div></div><div className="flex items-center gap-space-sm"><div className="hidden xl:flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30"><div className="flex items-center gap-1.5 pr-2.5 border-r border-outline-variant/20"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span className="font-data-mono text-data-mono text-on-surface font-semibold text-[12px]">B2B Core: 99.98%</span></div><div className="flex items-center gap-1 pl-1"><span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">Escrow Pool:</span><span className="font-data-mono text-data-mono text-primary font-bold text-[12px]">42.8 Tỷ VNĐ</span></div></div><div className="flex items-center bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30"><button className="px-2.5 py-1 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold tracking-wide" type="button">LIVE</button><button className="px-2.5 py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-semibold tracking-wide transition-colors" type="button">STAGING</button></div><button className="relative p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary-container transition-all group" title="Cảnh báo khẩn cấp" type="button"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] px-1 items-center justify-center rounded-full bg-error text-on-error font-data-mono text-[10px] font-bold ring-2 ring-surface">6</span></button><div className="flex items-center gap-2 pl-2 border-l border-outline-variant/20"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div className="hidden md:flex flex-col text-left"><span className="font-title-md text-label-md text-on-surface font-semibold leading-tight">HQ Ops Admin</span><span className="font-body-sm text-body-sm text-tertiary font-medium">Cấp 1 • Toàn quyền</span></div></div></div></div></header><main className="w-full pt-20 bg-surface px-space-md pb-space-xl"><div className="flex flex-col w-full space-y-space-lg">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm uppercase tracking-wider mb-1">
              <span>Sàn MoonMarket</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span>Pháp chế &amp; Hòa giải</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary font-bold">Trọng tài tranh chấp</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Trung Tâm Trọng Tài Phân Xử Tranh Chấp &amp; Khiếu Nại B2B</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">Cơ chế bảo vệ ký quỹ Escrow đa bên, giám định bằng chứng kiểm định và chế tài tự động theo quy chế sàn giao dịch.</p>
          </div>

          <div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-2.5 rounded-xl shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">gavel</span>
            </div>
            <div>
              <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Hạn Mức Đóng Băng Tạm Giữ</div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-data-mono text-[18px] font-bold text-primary">175.000.000 đ</span>
                <span className="font-data-mono text-[11px] text-tertiary font-semibold">(2 Mốc Ký Quỹ)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button className="flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-primary-container text-on-primary font-title-md text-title-md shadow-sm">
            <span className="material-symbols-outlined text-[18px]">emergency</span>
            <span>Đang Thụ Lý (2 Khẩn Cấp)</span>
            <span className="px-1.5 py-0.5 rounded-full bg-error text-on-error font-data-mono text-[11px] font-bold">Cấp 1</span>
          </button>
          <button className="flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors font-title-md text-title-md shadow-sm">
            <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
            <span>Chờ Các Bên Phản Hồi (3)</span>
          </button>
          <button className="flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors font-title-md text-title-md shadow-sm">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Đã Phán Quyết &amp; Đóng (28)</span>
          </button>
          <button className="flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors font-title-md text-title-md shadow-sm">
            <span className="material-symbols-outlined text-[18px]">cancel</span>
            <span>Khiếu Nại Đã Hủy (5)</span>
          </button>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-md">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="px-2.5 py-1 rounded bg-error-container text-on-error-container font-data-mono text-label-sm font-bold tracking-wider uppercase flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                ƯU TIÊN XỬ LÝ KHẨN CẤP
              </span>
              <span className="font-data-mono text-[15px] font-bold text-on-surface">Mã Vụ Việc: <span className="text-primary font-bold">DISPUTE-2025-0042</span></span>
              <span className="text-on-surface-variant">•</span>
              <span className="font-data-mono text-body-md text-on-surface-variant">HĐ Gốc: <span className="font-semibold text-on-surface">HĐ-2025-00892</span></span>
              <span className="text-on-surface-variant">•</span>
              <span className="font-title-md text-title-md text-on-surface">Tổng Giá Trị HĐ: <span className="font-data-mono text-primary font-bold">250.000.000 VNĐ</span></span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all" >
                <span className="material-symbols-outlined text-[18px] text-primary">phone_in_talk</span>
                Hotline Hòa Giải Trực Tuyến
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all" >
                <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
                Xuất Hồ Sơ PDF
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md pt-space-md">

            <div className="lg:col-span-4 bg-surface-container-low p-space-md rounded-xl space-y-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm font-bold text-outline uppercase tracking-wider">Bên Khiếu Nại (Bên Mua)</span>
                <span className="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm font-semibold">Tín Nhiệm AAA</span>
              </div>
              <div className="font-title-md text-title-md font-bold text-on-surface">CTCP Bất Động Sản An Phát</div>
              <div className="space-y-1 font-body-sm text-body-sm text-on-surface-variant">
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">person</span> Đại diện: <span className="font-semibold text-on-surface">Nguyễn Văn An (Giám đốc Thu Mua)</span></div>
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">call</span> SĐT: <span className="font-data-mono">0912.839.***</span> (Xác thực KYC)</div>
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">badge</span> Mã số thuế: <span className="font-data-mono">0108932451</span></div>
              </div>
            </div>

            <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-headline-sm font-bold text-outline">
                VS
              </div>
            </div>

            <div className="lg:col-span-4 bg-surface-container-low p-space-md rounded-xl space-y-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm font-bold text-outline uppercase tracking-wider">Bên Bị Khiếu Nại (Bên Bán)</span>
                <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">Xưởng Nghệ Nhân • Gold</span>
              </div>
              <div className="font-title-md text-title-md font-bold text-on-surface">Xưởng Bánh Nghệ Nhân Tràng An Bakery</div>
              <div className="space-y-1 font-body-sm text-body-sm text-on-surface-variant">
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">engineering</span> Quản đốc: <span className="font-semibold text-on-surface">Trần Đức Thắng</span></div>
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">factory</span> Nhà xưởng: CCN Ngọc Hồi, Thanh Trì, Hà Nội</div>
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">history</span> Hoạt động: 12 mùa trăng (Tỷ lệ hoàn thành 98.4%)</div>
              </div>
            </div>

            <div className="lg:col-span-3 bg-primary/5 p-space-md rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-primary font-label-sm text-label-sm uppercase font-bold tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                  Trạng Thái Quỹ Ký Quỹ Escrow
                </div>
                <div className="mt-2 space-y-1.5">
                  <div className="flex justify-between items-center text-body-sm">
                    <span className="text-on-surface-variant">Mốc M1 (Cọc 30%):</span>
                    <span className="font-data-mono font-medium text-tertiary">Đã giải ngân 75tr</span>
                  </div>
                  <div className="flex justify-between items-center text-body-sm">
                    <span className="text-on-surface-variant font-semibold">Mốc M2 (Giao đợt 1):</span>
                    <span className="font-data-mono font-bold text-error">100.000.000 đ (Khóa)</span>
                  </div>
                  <div className="flex justify-between items-center text-body-sm">
                    <span className="text-on-surface-variant font-semibold">Mốc M3 (Nghiệm thu):</span>
                    <span className="font-data-mono font-bold text-error">75.000.000 đ (Khóa)</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-2 text-[11px] font-body-sm text-on-surface-variant bg-surface-container-lowest px-2 py-1 rounded">
                Trọng tài MoonMarket có toàn quyền ký số phân bổ ngân quỹ.
              </div>
            </div>
          </div>

          <div className="mt-space-md p-space-sm bg-surface-container-high rounded-lg flex items-start gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">report</span>
            <div className="flex-1">
              <span className="font-title-md text-title-md font-bold text-on-surface">Tóm tắt nội dung khiếu nại: </span>
              <span className="font-body-md text-body-md text-on-surface">"Bên Mua khiếu nại Bên Bán giao trễ hạn Mốc M2 quá 3 ngày (so với cam kết ngày 12/08 Âm lịch) và bao bì hộp sơn mài sai mã màu nhận diện thương hiệu công ty (Pantone 188C thực tế ngả nâu tím, thay vì Pantone 1815C đỏ ruby sang trọng theo mockup 3D duyệt v2.0). Ngoài ra có 20 hộp bị trầy xước góc."</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">

          <div className="xl:col-span-7 space-y-space-md">

            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
              <div className="flex items-center justify-between pb-space-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[24px]">folder_special</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">Bộ Hồ Sơ Bằng Chứng Tổng Hợp Đa Chiều</span>
                </div>
                <span className="font-data-mono text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">6 Tệp Đính Kèm</span>
              </div>

              <div className="flex gap-1.5 p-1 bg-surface-container-low rounded-lg mb-space-md">
                <button className="flex-1 py-1.5 text-center font-label-md text-label-md font-bold rounded bg-surface-container-lowest text-primary shadow-xs" id="tab-btn-compare" >
                  Đối Soát Ảnh 3D vs Thực Tế
                </button>
                <button className="flex-1 py-1.5 text-center font-label-md text-label-md font-medium rounded text-on-surface-variant hover:text-on-surface" id="tab-btn-pod" >
                  Biên Bản PoD Kho Hà Nội
                </button>
                <button className="flex-1 py-1.5 text-center font-label-md text-label-md font-medium rounded text-on-surface-variant hover:text-on-surface" id="tab-btn-timeline" >
                  Timeline Sự Kiện HĐ
                </button>
                <button className="flex-1 py-1.5 text-center font-label-md text-label-md font-medium rounded text-on-surface-variant hover:text-on-surface" id="tab-btn-chat" >
                  Nhật Ký Chat &amp; Công Văn
                </button>
              </div>

              <div className="space-y-space-md" id="content-compare">
                <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary">palette</span>
                    <span className="font-title-md text-title-md text-on-surface font-semibold">Giám Định Độ Sai Lệch Mã Màu &amp; Bề Mặt Sơn Mài</span>
                  </div>
                  <span className="font-data-mono text-[12px] bg-error-container text-on-error-container px-2 py-0.5 rounded font-bold">Delta-E Sai Lệch: 4.8 (Vượt ngưỡng 2.0 cho phép)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm font-bold text-tertiary uppercase flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span> Mockup 3D Đã Duyệt v2.0
                      </span>
                      <span className="font-data-mono text-[11px] text-on-surface-variant">Chốt: 15/07 Âm lịch</span>
                    </div>
                    <div className="relative rounded-xl overflow-hidden shadow-sm bg-surface-container aspect-4/3 group">
                      <img className="w-full h-full object-cover" data-alt="A hyper-realistic 3D product render of an ultra-luxurious Vietnamese lacquer mooncake gift box in rich ruby red pantone 1815C with embossed gold dragon foil accents, elegant matte satin ribbon, pristine commercial photography studio lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuArZ4Arz3TQJgbps3evnVwpI_5Wj-stJ6Fv2XAP3nXhVG4NJNdTjFEJpchPZQJzVMrU40OLIwh1nLGDNEcfgYIMPD1dXKxSDtYfb1c3bMIDZkZuDoZLWfhTUeAYw9dtW0gsd48Q0DFdGc8KgQglebIbOOZZwOqaG91Vj0YrgpqRNOFfmHmPetPDiKHSs_N4bZWG5RNTZtepbQ_s7NDO1tcrUy5_AM4x_p3DdsdWJvvY2uQ6RQ16VLhI" />
                      <div className="absolute bottom-2 left-2 right-2 bg-inverse-surface/85 backdrop-blur text-inverse-on-surface p-2 rounded text-[11px] flex justify-between items-center">
                        <div>
                          <span className="font-bold text-on-primary">Pantone 1815C (Đỏ Ruby Hoàng Gia)</span>
                          <p className="text-[10px] text-outline-variant">Lớp phủ bóng mờ Satin 3 lớp không bọt khí</p>
                        </div>
                        <span className="px-1.5 py-0.5 rounded bg-tertiary font-data-mono text-[10px] text-on-tertiary">Chuẩn Chốt</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm font-bold text-error uppercase flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">warning</span> Bàn Giao Thực Tế (Bên Mua Chụp)
                      </span>
                      <span className="font-data-mono text-[11px] text-on-surface-variant">Kiểm nhận: 15/08 Âm lịch</span>
                    </div>
                    <div className="relative rounded-xl overflow-hidden shadow-sm bg-surface-container aspect-4/3 group">
                      <img className="w-full h-full object-cover" data-alt="High-resolution documentary macro photo taken in a warehouse receiving dock showing lacquer mooncake boxes in dark purplish brown pantone 188C with noticeable surface scuffs on lacquer corners and uneven varnish reflectiveness, harsh warehouse fluorescent lights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQpd7eHbE6EGUcheexOR0pzggYcd9ZZ1KlI-whaU6br-iIuGJQWGLZjtFc3ZFcvOQa7pI39vhwacbnIeeCrBKnH3QptdoI0QJotwGlej07hzjp9fPeLoB5NMuUOmXWsQznaCBpdDaxtzQf-CPmq8ISjKnSTUsGP5ign8OkZx6g6B3dSaxxiZIM7u2N7Nx9WuHMRn1X_3FGhtR8YmxIA8X8R4aRNMF_CB_COqgkoyLEzH5PkAYbFMy0" />
                      <div className="absolute bottom-2 left-2 right-2 bg-error/90 backdrop-blur text-on-error p-2 rounded text-[11px] flex justify-between items-center">
                        <div>
                          <span className="font-bold text-on-primary">Phát hiện: Pantone 188C (Đỏ Mận Nâu)</span>
                          <p className="text-[10px] text-primary-fixed">Độ bóng sai lệch 32% + 20 hộp có vết xước</p>
                        </div>
                        <span className="px-1.5 py-0.5 rounded bg-surface-container-lowest font-data-mono text-[10px] text-error font-bold">Lỗi Bề Mặt</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-space-sm bg-surface-container-low rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase">Giám Định Kỹ Thuật Số MoonMarket QA Hub</span>
                    <span className="font-data-mono text-label-sm text-tertiary font-semibold">Kết luận: Lỗi sản xuất lớp sơn lót xưởng bánh</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Ảnh chụp quang phổ phòng Lab khẳng định xưởng đã thay đổi nhà cung cấp phôi hộp sơn mài vào ngày 02/08 Âm lịch mà không thông báo phụ lục hợp đồng, dẫn tới sự sai lệch tông màu chủ đạo từ Đỏ Ruby sang Mận Đen.
                  </p>
                </div>
              </div>

              <div className="hidden space-y-space-md" id="content-pod">
                <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between">
                  <span className="font-title-md text-title-md text-on-surface font-semibold">Biên Bản Bàn Giao &amp; Giám Định Kho Bãi (PoD #HAN-8812)</span>
                  <span className="font-data-mono text-[12px] bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded">Có Chữ Ký Thủ Kho &amp; Tài Xế</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm text-body-sm">
                  <div className="bg-surface-container-lowest p-space-sm rounded-lg shadow-xs">
                    <div className="text-on-surface-variant text-[11px]">Tổng số lượng bàn giao</div>
                    <div className="font-data-mono text-[16px] font-bold text-on-surface">500 Hộp Sơn Mài VIP</div>
                    <div className="text-tertiary text-[11px]">Đủ bánh &amp; trà hảo hạng</div>
                  </div>
                  <div className="bg-surface-container-lowest p-space-sm rounded-lg shadow-xs">
                    <div className="text-on-surface-variant text-[11px]">Số lượng nguyên vẹn</div>
                    <div className="font-data-mono text-[16px] font-bold text-on-surface">480 Hộp (96%)</div>
                    <div className="text-on-surface-variant text-[11px]">Bao bì chấp nhận được</div>
                  </div>
                  <div className="bg-surface-container-lowest p-space-sm rounded-lg shadow-xs">
                    <div className="text-on-surface-variant text-[11px]">Số lượng trầy xước/lỗi</div>
                    <div className="font-data-mono text-[16px] font-bold text-error">20 Hộp (4%)</div>
                    <div className="text-error text-[11px]">Xước sơn mài góc cạnh</div>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden bg-surface-container p-2 flex items-center justify-center">
                  <div className="w-full bg-surface-container-lowest p-space-md rounded-lg space-y-2">
                    <div className="flex items-center justify-between pb-2">
                      <div>
                        <div className="font-title-md font-bold text-on-surface">Ghi chú thực địa của Ban Quản Lý Kho:</div>
                        <p className="font-body-sm text-on-surface-variant">"Giao hàng lúc 18h45 ngày 15/08 Âm lịch bằng xe tải 2.5T biển số 29C-741.90. Trong quá trình dỡ kiện pallet P04, phát hiện 2 thùng ngoài cùng bị móp góc khiến 20 hộp bên trong bị xát vào thành thùng gây trầy xước nước sơn bóng."</p>
                      </div>
                      <div className="w-24 h-12 bg-surface-container-low rounded flex items-center justify-center text-outline font-data-mono text-[10px]">
                        [Chữ ký điện tử]
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden space-y-space-md" id="content-timeline">
                <div className="relative pl-6 space-y-space-md before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant/50">

                  <div className="relative">
                    <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-tertiary"></span>
                    <div className="bg-surface-container-low p-space-sm rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-title-md text-title-md font-semibold text-on-surface">Ký Kết Hợp Đồng Điện Tử B2B &amp; Đặt Cọc M1</span>
                        <span className="font-data-mono text-[11px] text-on-surface-variant">01/07 Âm lịch</span>
                      </div>
                      <p className="font-body-sm text-on-surface-variant mt-1">Bên mua chuyển 75.000.000 VNĐ vào Ví Ký Quỹ Escrow MoonMarket. Bên Bán nhận tạm ứng M1 để nhập nguyên liệu đậu xanh hạt sen và phôi hộp.</p>
                    </div>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-tertiary"></span>
                    <div className="bg-surface-container-low p-space-sm rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-title-md text-title-md font-semibold text-on-surface">Chốt Duyệt Mockup Sơn Mài v2.0 (Pantone 1815C)</span>
                        <span className="font-data-mono text-[11px] text-on-surface-variant">15/07 Âm lịch</span>
                      </div>
                      <p className="font-body-sm text-on-surface-variant mt-1">Đại diện hai bên ký xác nhận mẫu Proofing vật lý tại trụ sở xưởng Tràng An Bakery.</p>
                    </div>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-secondary"></span>
                    <div className="bg-surface-container-low p-space-sm rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-title-md text-title-md font-semibold text-on-surface">Xưởng Gửi Công Văn Xin Gia Hạn +2 Ngày</span>
                        <span className="font-data-mono text-[11px] text-secondary font-bold">11/08 Âm lịch</span>
                      </div>
                      <p className="font-body-sm text-on-surface-variant mt-1">Lý do: Lò nướng gặp trục trặc kỹ thuật và thời tiết nồm ẩm ảnh hưởng tốc độ khô sơn mài. Bên mua chưa có văn bản chấp thuận chính thức.</p>
                    </div>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-error"></span>
                    <div className="bg-surface-container-low p-space-sm rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-title-md text-title-md font-semibold text-error">Bàn Giao Thực Tế Mốc M2 (Trễ 3 Ngày) &amp; Khởi Tạo Khiếu Nại</span>
                        <span className="font-data-mono text-[11px] text-error font-bold">15/08 Âm lịch</span>
                      </div>
                      <p className="font-body-sm text-on-surface-variant mt-1">Bên Mua từ chối ký xác nhận nghiệm thu mốc M2, kích hoạt tranh chấp trên hệ thống sàn MoonMarket và yêu cầu phong tỏa dòng tiền.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden space-y-space-sm" id="content-chat">
                <div className="max-h-72 overflow-y-auto space-y-3 p-space-sm bg-surface-container-low rounded-lg">

                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-xs font-bold shrink-0">AP</div>
                    <div className="bg-surface-container-lowest p-2.5 rounded-xl rounded-tl-none max-w-[80%] shadow-xs">
                      <div className="font-label-sm font-bold text-on-surface">Nguyễn Văn An (Bên Mua) • <span className="font-data-mono text-[10px] text-on-surface-variant">10/08 14:20</span></div>
                      <p className="font-body-sm text-on-surface mt-1">Anh Thắng ơi, tiến độ đóng hộp 500 set VIP bên em đến đâu rồi? Ngày 12 là bên em bắt đầu trao quà cho đối tác chiến lược cấp cao đấy nhé.</p>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-row-reverse">
                    <div className="w-7 h-7 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center text-xs font-bold shrink-0">TA</div>
                    <div className="bg-secondary-fixed/30 p-2.5 rounded-xl rounded-tr-none max-w-[80%] shadow-xs">
                      <div className="font-label-sm font-bold text-on-surface text-right">Trần Đức Thắng (Xưởng Tràng An) • <span className="font-data-mono text-[10px] text-on-surface-variant">11/08 09:15</span></div>
                      <p className="font-body-sm text-on-surface mt-1">Chào anh An, đợt phôi hộp này xưởng sấy bị nồm quá nên nước sơn mài khô chậm hơn 36 tiếng. Bên em xin phép anh dời lịch giao sang ngày 14 hoặc 15 để đảm bảo độ bóng tốt nhất.</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-xs font-bold shrink-0">AP</div>
                    <div className="bg-surface-container-lowest p-2.5 rounded-xl rounded-tl-none max-w-[80%] shadow-xs">
                      <div className="font-label-sm font-bold text-on-surface">Nguyễn Văn An (Bên Mua) • <span className="font-data-mono text-[10px] text-on-surface-variant">15/08 19:30</span></div>
                      <p className="font-body-sm text-on-surface mt-1 text-error">Hàng nhận trễ 3 ngày đã đành, giờ bóc hàng màu vỏ hộp đỏ mận tối sầm, lệch hẳn mã đỏ ruby thương hiệu bên em. Chưa kể 20 hộp bị xước toác mép nắp. Em mở tranh chấp trên sàn nhờ Ban quản trị MoonMarket đứng ra phân xử theo quy định HĐ!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline text-[20px]">history_edu</span>
                  <span className="font-title-md text-title-md font-bold text-on-surface">Lịch Sử Vi Phạm &amp; Hồ Sơ Tín Nhiệm Nhà Cung Cấp</span>
                </div>
                <span className="font-data-mono text-[11px] text-on-surface-variant">Hệ thống RuleEngine v4.2</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm text-body-sm">
                <div className="p-2.5 rounded-lg bg-surface-container-low">
                  <span className="text-[11px] text-on-surface-variant">Điểm Uy Tín Hiện Tại:</span>
                  <div className="font-data-mono text-[16px] font-bold text-tertiary">92 / 100 Điểm</div>
                  <span className="text-[10px] text-on-surface-variant">Hạng "Đối tác Vàng"</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low">
                  <span className="text-[11px] text-on-surface-variant">Tiền sử vi phạm giao trễ:</span>
                  <div className="font-data-mono text-[16px] font-bold text-on-surface">0 lần / 18 Hợp đồng</div>
                  <span className="text-[10px] text-tertiary">Lần đầu vi phạm SLA</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low">
                  <span className="text-[11px] text-on-surface-variant">Mức độ hợp tác hòa giải:</span>
                  <div className="font-data-mono text-[16px] font-bold text-secondary">Tích cực (Chấp thuận sửa chữa)</div>
                  <span className="text-[10px] text-on-surface-variant">Đã phản hồi trong 2h</span>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-5 space-y-space-md">

            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md space-y-space-md sticky top-24">

              <div className="flex items-center justify-between pb-space-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">balance</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">Bảng Phán Quyết Trọng Tài</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Chế tài tài chính &amp; lệnh điều chuyển Escrow</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-data-mono text-[11px] font-bold">Admin Cấp 1</span>
              </div>

              <div className="space-y-space-sm">
                <div className="font-label-sm text-label-sm uppercase font-bold text-outline tracking-wider">Nội Dung Quyết Định Hòa Giải (Bắt Buộc Cả 3 Điều Khoản)</div>

                <label className="flex items-start gap-space-sm p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                  <input defaultChecked className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary" id="clause-box-repair" type="checkbox" />
                  <div className="flex-1">
                    <div className="font-title-md text-title-md font-bold text-on-surface">1. Khắc Phục Lô Hàng Lỗi Sơn Mài</div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Yêu cầu xưởng sơn lại và đổi mới 20 vỏ hộp bị trầy xước trong vòng <strong className="text-on-surface">48 giờ</strong> (Hạn chót: 18h00 ngày 18/08 Âm lịch), giao bổ sung tận kho Hà Nội không tính phí vận chuyển.</p>
                  </div>
                </label>

                <label className="flex items-start gap-space-sm p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                  <input defaultChecked className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary" id="clause-delay-fine" type="checkbox" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-title-md text-title-md font-bold text-on-surface">2. Phạt Chậm Tiến Độ (5% Mốc M2)</span>
                      <span className="font-data-mono text-[13px] font-bold text-error">-5.000.000 VNĐ</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Khấu trừ trực tiếp từ quỹ ký quỹ Mốc M2 để hoàn trả ngay vào Ví Doanh Nghiệp của Bên Mua nhằm bù đắp tổn thất lịch trình trao tặng quà khách VIP.</p>
                  </div>
                </label>

                <label className="flex items-start gap-space-sm p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                  <input defaultChecked className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary" id="clause-escrow-release" type="checkbox" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-title-md text-title-md font-bold text-on-surface">3. Giải Ngân Phần Còn Lại Của Mốc M2</span>
                      <span className="font-data-mono text-[13px] font-bold text-tertiary">+95.000.000 VNĐ</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Giải phóng số tiền còn lại sau khấu trừ cho Xưởng Tràng An Bakery để duy trì dòng vốn làm mẻ bánh tươi cho đợt Mốc M3.</p>
                  </div>
                </label>
              </div>

              <div className="bg-surface-container-low p-space-sm rounded-xl space-y-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-bold text-outline uppercase tracking-wider">Chế Tài Điểm Tín Nhiệm (RuleEngine)</span>
                  <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-data-mono text-[11px] font-bold">-15 Điểm</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-title-md text-title-md text-on-surface font-semibold">Giáng Hạng Danh Hiệu Xưởng</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">Từ "Đối Tác Vàng" xuống "Nhà Cung Cấp Uy Tín" trong 60 ngày</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" id="reputation-deduct" type="checkbox" />
                    <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
              </div>

              <div className="bg-surface-container-high/60 p-space-md rounded-xl space-y-2">
                <div className="flex items-center justify-between text-body-sm">
                  <span className="font-bold text-on-surface">Mô Phỏng Lệnh Điều Chuyển Escrow Tự Động:</span>
                  <span className="font-data-mono text-tertiary font-bold">100.000.000 VNĐ (M2)</span>
                </div>
                <div className="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden flex">
                  <div className="bg-primary h-full transition-all duration-300" id="bar-refund" style={{ "width": "5%" }}></div>
                  <div className="bg-tertiary h-full transition-all duration-300" id="bar-vendor" style={{ "width": "95%" }}></div>
                </div>
                <div className="flex justify-between font-data-mono text-[11px]">
                  <span className="text-primary font-bold">Hoàn Bên Mua: <span id="label-refund">5.000.000 VNĐ (5%)</span></span>
                  <span className="text-tertiary font-bold">Giải ngân Xưởng: <span id="label-vendor">95.000.000 VNĐ (95%)</span></span>
                </div>
                <div className="pt-1 text-[11px] text-on-surface-variant font-body-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary">lock_clock</span>
                  Mốc M3 (75.000.000 VNĐ) tiếp tục giữ trạng thái Đóng Băng cho đến khi hoàn tất 20 hộp bù.
                </div>
              </div>

              <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px]">verified_user</span>
                  </div>
                  <div className="text-[12px] font-body-sm">
                    <div className="font-bold text-on-surface">Chữ Ký Số MoonMarket Adjudicator</div>
                    <div className="font-data-mono text-[10px] text-on-surface-variant">Hash: 8FA2-901B-CC34-FE90</div>
                  </div>
                </div>
                <span className="font-data-mono text-[11px] text-tertiary font-bold">SẴN SÀNG KÝ DUYỆT</span>
              </div>

              <div className="space-y-2 pt-1">
                <button className="w-full py-3 px-4 rounded-lg bg-primary text-on-primary font-title-md text-title-md font-bold hover:bg-primary/95 transition-all shadow-md flex items-center justify-center gap-2" >
                  <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
                  <span>Ban Hành Phán Quyết &amp; Kích Hoạt Lệnh Escrow</span>
                </button>
                <button className="w-full py-2.5 px-4 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2" >
                  <span className="material-symbols-outlined text-[18px]">more_time</span>
                  <span>Gia Hạn Hòa Giải Thêm 24H (Yêu cầu bổ sung chứng cứ)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed inset-0 z-50 flex items-center justify-center hidden bg-inverse-surface/60 backdrop-blur-sm p-4" id="modal-ruling-confirm">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl p-space-lg shadow-xl space-y-space-md">
            <div className="flex items-start gap-space-sm">
              <div className="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[28px]">gavel</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Xác Nhận Ban Hành Phán Quyết Trọng Tài?</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Phán quyết này mang tính tối cao, có hiệu lực pháp lý thi hành ngay lập tức trên hệ thống Escrow tự động của MoonMarket.</p>
              </div>
            </div>
            <div className="p-space-sm bg-surface-container-low rounded-xl space-y-2 text-body-sm">
              <div className="font-bold text-on-surface text-[13px] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
                Lệnh Hệ Thống Sẽ Tự Động Kích Hoạt Sau Khi Ký:
              </div>
              <ul className="list-disc list-inside space-y-1 text-on-surface-variant text-[12px]">
                <li>Trích hoàn <strong className="text-primary font-data-mono">5.000.000 VNĐ</strong> vào Ví Escrow Bên Mua (BĐS An Phát).</li>
                <li>Chuyển giải ngân <strong className="text-tertiary font-data-mono">95.000.000 VNĐ</strong> vào Ví Khả Dụng Xưởng Tràng An.</li>
                <li>Giảm <strong className="text-error font-data-mono">-15 điểm uy tín</strong> và hạ huy hiệu xưởng trong bảng xếp hạng.</li>
                <li>Bật đồng hồ đếm ngược <strong className="text-on-surface font-semibold">48h khắc phục 20 vỏ hộp lỗi</strong>.</li>
              </ul>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors" >
                Hủy Bỏ / Xem Lại
              </button>
              <button className="px-5 py-2 rounded-lg bg-primary text-on-primary font-title-md text-title-md font-bold hover:bg-primary/95 transition-all shadow-md flex items-center gap-1.5" >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                Ký Số &amp; Thực Thi
              </button>
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 right-6 z-50 transform translate-y-32 opacity-0 transition-all duration-300 pointer-events-none" id="toast-ruling-success">
          <div className="bg-tertiary text-on-tertiary px-space-md py-3 rounded-xl shadow-xl flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-[24px]">task_alt</span>
            <div>
              <div className="font-title-md text-title-md font-bold">Phán Quyết Đã Ban Hành Thành Công!</div>
              <div className="font-body-sm text-body-sm text-on-tertiary-container">Lệnh chuyển 5tr &amp; 95tr đã xử lý trong Escrow Pool #109.</div>
            </div>
          </div>
        </div>

        <div className="fixed inset-0 z-50 flex items-center justify-center hidden bg-inverse-surface/60 backdrop-blur-sm p-4" id="modal-hotline">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl p-space-lg shadow-xl space-y-space-md text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[32px]">support_agent</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Phiên Hòa Giải Trực Tuyến Đa Bên</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Đường dây nóng được ghi âm đối soát theo chuẩn Trọng Tài Thương Mại Việt Nam.</p>
            </div>
            <div className="bg-surface-container-low p-space-sm rounded-xl font-data-mono text-[15px] font-bold text-primary">
              Phòng Trọng Tài Ảo #ARB-2025-0042
            </div>
            <div className="flex justify-center gap-2">
              <button className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md" >Đóng</button>
              <button className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold" >Bắt Đầu Gọi Ngay</button>
            </div>
          </div>
        </div>
      </div>

      </main></div>
    </div>
  );
}
