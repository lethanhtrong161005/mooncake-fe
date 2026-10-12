
export default function TradingOperating({ onNavigate }) {
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest z-50 flex flex-col shadow-[0_1px_12px_rgba(0,0,0,0.06)] border-r border-outline-variant/30"><div className="h-20 px-space-md flex items-center gap-space-sm border-b border-outline-variant/20 bg-surface-container-low/40"><img alt="Logo biểu trưng thương hiệu sàn giao dịch B2B Bánh Trung Thu Mooncake Marketplace: biểu tượng vầng trăng rằm thanh lịch kết hợp hoa văn khuôn bánh truyền thống dập nổi vàng kim sang trọng trên nền đỏ trầm nhã nhặn.. Brand logo. - Primary color: #991b1b - Font: plusJakartaSans - Mode: light - Roundness: rounded-sm" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XeDH3ml-Oxy9w5fl0xKcYXZzLGzRPMBJAZpR8G80tab0cBtZrQ7_YfYflhLzmRN2uHc0sjIfX29rFpAto5mkXK_8CJNAc90yvMwH19nziuf_fMyXQbHwnnELW7O0Mtg7oUTPBeNuNccNI7sLjO5237vuzDzQnM78HYxZ3YuZpo2tjH0FZgBw7Woz7vXVCIGNjMsJ21mfCfp7P4n7MMkcw6U9YIFhCLwHrHNoPdUCq2mPD45CuedGPUF-0" /><div className="flex flex-col min-w-0 flex-1"><div className="flex items-center gap-space-xs"><span className="font-headline-sm text-headline-sm text-primary font-bold truncate leading-none">MoonMarket</span></div><div className="flex items-center gap-1.5 mt-1"><span className="inline-flex items-center px-1.5 py-0.5 rounded-DEFAULT bg-primary-container text-on-primary font-label-sm text-label-sm tracking-wider uppercase font-bold">Super Admin</span><span className="font-data-mono text-data-mono text-on-surface-variant text-[10px]">v4.2</span></div></div></div><div className="flex-1 overflow-y-auto px-space-sm py-space-md space-y-space-md"><nav className="space-y-space-md" data-active-classes="bg-primary-container text-on-primary font-title-md text-title-md shadow-[0_2px_8px_rgba(153,27,27,0.25)]"><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Tổng quan &amp; Điều hành</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="dashboard-tong-quan" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">grid_view</span><span className="font-body-md text-body-md">Dashboard Tổng quan</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#27</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="bao-cao-ai-analytics" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">insights</span><span className="font-body-md text-body-md">Báo cáo &amp; AI Analytics</span></div><span className="inline-flex items-center px-1.5 py-0.5 rounded-DEFAULT bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm font-bold">AI Live</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Duyệt &amp; Kiểm soát</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="duyet-nha-cung-cap" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">verified_user</span><span className="font-body-md text-body-md">Duyệt Nhà cung cấp</span></div><span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary-container text-on-primary font-data-mono text-data-mono font-bold text-[11px]">4</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="tranh-chap-khieu-nai" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">gavel</span><span className="font-body-md text-body-md">Tranh chấp &amp; Khiếu nại</span></div><span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-secondary-container text-on-secondary-container font-data-mono text-data-mono font-bold text-[11px]">2</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="kiem-duyet-noi-dung-review" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">rate_review</span><span className="font-body-md text-body-md">Kiểm duyệt Review</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#21</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Quản lý Thực thể</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="quan-ly-nguoi-dung" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">groups</span><span className="font-body-md text-body-md">Quản lý Người dùng</span></div><span className="font-data-mono text-data-mono text-on-surface-variant text-[11px]">B2B/B2C</span></a><a aria-current="page" className="flex items-center justify-between px-space-sm py-2 rounded-xl transition-all group bg-primary-container text-on-primary font-title-md text-title-md shadow-[0_2px_8px_rgba(153,27,27,0.25)]" data-path="quan-ly-gian-hang" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">storefront</span><span className="font-body-md text-body-md">Quản lý Gian hàng</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#3</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="danh-muc-template-shop" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">category</span><span className="font-body-md text-body-md">Danh mục &amp; Template</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#4</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Giao dịch &amp; Vận hành</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="dieu-phoi-giao-van" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">local_shipping</span><span className="font-body-md text-body-md">Điều phối Giao vận</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#19</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="so-giao-dich-vi-escrow" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">account_balance_wallet</span><span className="font-body-md text-body-md">Sổ GD &amp; Ví Escrow</span></div><span className="font-data-mono text-data-mono text-tertiary font-bold text-[11px]">Escrow</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="ho-so-tra-cuu-hop-dong" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">description</span><span className="font-body-md text-body-md">Đơn / RFQ / Hợp đồng</span></div><span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Hệ thống</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="cau-hinh-quy-tac-uy-tin" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">tune</span><span className="font-body-md text-body-md">Quy tắc &amp; Uy tín</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">RuleEngine</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="audit-log-nhat-ky-he-thong" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">receipt_long</span><span className="font-body-md text-body-md">Audit Log Hệ thống</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">SOC2</span></a></div></div></nav></div><div className="p-space-sm border-t border-outline-variant/20 bg-surface-container-low/60"><div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30"><div className="flex items-center gap-2.5 min-w-0"><div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm ring-2 ring-primary-container/20 shrink-0">TM</div><div className="min-w-0"><div className="font-title-md text-body-md text-on-surface font-semibold truncate leading-tight">Trần Minh Quân</div><div className="font-body-sm text-body-sm text-on-surface-variant truncate">Head of Operations</div></div></div><button className="p-1.5 rounded-lg text-outline hover:text-error hover:bg-error-container/40 transition-colors shrink-0" title="Đăng xuất an toàn" type="button"><span className="material-symbols-outlined text-[20px]">logout</span></button></div></div></aside><div className="pl-72"><header className="fixed top-0 left-72 right-0 h-20 bg-surface/90 backdrop-blur-xl z-40 border-b border-outline-variant/20 shadow-[0_1px_8px_rgba(0,0,0,0.03)]"><div className="h-20 w-full px-space-md flex items-center justify-between gap-space-md"><div className="flex-1 max-w-xl"><div className="relative flex items-center"><span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">search</span><input className="w-full pl-11 pr-20 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/40 font-body-md text-body-md text-on-surface placeholder:text-outline/70 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Tra cứu nhanh MST, Mã RFQ, Số HĐ, SKU, Người dùng, Gian hàng..." type="text" /><div className="absolute right-2.5 flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded-DEFAULT bg-surface-container text-outline font-data-mono text-[11px] font-semibold border border-outline-variant/30">Ctrl</kbd><kbd className="px-1.5 py-0.5 rounded-DEFAULT bg-surface-container text-outline font-data-mono text-[11px] font-semibold border border-outline-variant/30">K</kbd></div></div></div><div className="flex items-center gap-space-sm"><div className="hidden xl:flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30"><div className="flex items-center gap-1.5 pr-2.5 border-r border-outline-variant/20"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span className="font-data-mono text-data-mono text-on-surface font-semibold text-[12px]">B2B Core: 99.98%</span></div><div className="flex items-center gap-1 pl-1"><span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">Escrow Pool:</span><span className="font-data-mono text-data-mono text-primary font-bold text-[12px]">42.8 Tỷ VNĐ</span></div></div><div className="flex items-center bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30"><button className="px-2.5 py-1 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold tracking-wide" type="button">LIVE</button><button className="px-2.5 py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-semibold tracking-wide transition-colors" type="button">STAGING</button></div><button className="relative p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary-container transition-all group" title="Cảnh báo khẩn cấp" type="button"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] px-1 items-center justify-center rounded-full bg-error text-on-error font-data-mono text-[10px] font-bold ring-2 ring-surface">6</span></button><div className="flex items-center gap-2 pl-2 border-l border-outline-variant/20"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div className="hidden md:flex flex-col text-left"><span className="font-title-md text-label-md text-on-surface font-semibold leading-tight">HQ Ops Admin</span><span className="font-body-sm text-body-sm text-tertiary font-medium">Cấp 1 • Toàn quyền</span></div></div></div></div></header><main className="w-full pt-20 bg-surface px-space-md pb-space-xl"><div className="flex flex-col w-full space-y-space-lg">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
          <div className="space-y-1">
            <div className="flex items-center gap-space-xs text-outline">
              <span className="font-data-mono text-data-mono uppercase tracking-wider">Hệ Thống Phân Phối B2B</span>
              <span>/</span>
              <span className="font-data-mono text-data-mono text-primary font-semibold">Cụm Quản Trị #3 • #4 • #27</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Quản Lý Gian Hàng, Thư Viện Template &amp; Cấu Trúc Danh Mục B2B
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              Điều phối định danh 284 gian hàng xưởng bánh, quản lý bộ khung giao diện số hoá nhận diện thương hiệu và chuẩn hóa sơ đồ phân nhóm quà tặng mùa Trăng 2025.
            </p>
          </div>

          <div className="flex items-center gap-space-sm bg-surface-container-low p-2 rounded-xl shadow-sm self-start lg:self-auto">
            <div className="px-space-md py-1.5 bg-surface-container-lowest rounded-lg shadow-sm">
              <div className="font-label-sm text-label-sm text-outline uppercase font-semibold">Gian Hàng Active</div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-headline-sm text-headline-sm font-bold text-tertiary">268</span>
                <span className="font-data-mono text-[11px] text-tertiary font-bold">+12 shop mới</span>
              </div>
            </div>
            <div className="px-space-md py-1.5 bg-surface-container-lowest rounded-lg shadow-sm">
              <div className="font-label-sm text-label-sm text-outline uppercase font-semibold">Escrow Đang Giữ</div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-headline-sm text-headline-sm font-bold text-primary">18.6 Tỷ</span>
                <span className="font-data-mono text-[11px] text-on-surface-variant">Bảo chứng</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-surface-container-high rounded-2xl w-fit shadow-inner">
          <button className="tab-btn flex items-center gap-2 px-space-md py-2.5 rounded-xl font-title-md text-title-md font-semibold transition-all bg-primary-container text-on-primary shadow-md" id="tab-btn-shops" type="button">
            <span className="material-symbols-outlined text-[20px]">storefront</span>
            <span>Quản Lý Gian Hàng Đối Tác (#3)</span>
            <span className="font-data-mono text-xs px-2 py-0.5 rounded-full bg-surface-container-lowest/20 text-on-primary">284</span>
          </button>
          <button className="tab-btn flex items-center gap-2 px-space-md py-2.5 rounded-xl font-title-md text-title-md font-semibold transition-all text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest" id="tab-btn-templates" type="button">
            <span className="material-symbols-outlined text-[20px]">palette</span>
            <span>Kho Template Giao Diện Shop (#4)</span>
            <span className="font-data-mono text-xs px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">6 Bản Mẫu</span>
          </button>
          <button className="tab-btn flex items-center gap-2 px-space-md py-2.5 rounded-xl font-title-md text-title-md font-semibold transition-all text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest" id="tab-btn-categories" type="button">
            <span className="material-symbols-outlined text-[20px]">account_tree</span>
            <span>Cây Danh Mục Bánh Phân Cấp (Category Tree)</span>
            <span className="font-data-mono text-xs px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">4 Nhóm Gốc</span>
          </button>
        </div>



        <div className="tab-content flex flex-col space-y-space-md" id="tab-shops">

          <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-1">
              <div className="relative min-w-[260px] flex-1 max-w-md">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                <input className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-all" placeholder="Tìm theo tên shop, MST xưởng, slug URL..." type="text" />
              </div>
              <div className="flex items-center gap-2">
                <select className="px-3 py-2 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container">
                  <option>Tất cả trạng thái (284)</option>
                  <option>Đang Hoạt Động (268)</option>
                  <option>Tạm Ẩn / Nghỉ Vụ (11)</option>
                  <option>Bị Khóa Suspend (5)</option>
                </select>
                <select className="px-3 py-2 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container">
                  <option>Điểm Uy Tín: Tất cả</option>
                  <option>Xuất sắc (95 - 100)</option>
                  <option>Ổn định (80 - 94)</option>
                  <option>Cảnh báo (&lt; 80)</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end md:self-auto">
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container transition-colors shadow-sm" type="button">
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                <span>Xuất Báo Cáo Gian Hàng</span>
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold hover:brightness-95 transition-all shadow-sm" type="button">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Duyệt Mở Shop Mới</span>
              </button>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                    <th className="py-3.5 px-space-md">Gian Hàng &amp; Định Danh</th>
                    <th className="py-3.5 px-3">Chủ Sở Hữu / MST</th>
                    <th className="py-3.5 px-3 text-center">SKUs</th>
                    <th className="py-3.5 px-3">Uy Tín &amp; Đánh Giá</th>
                    <th className="py-3.5 px-3">Doanh Số Mùa Vụ</th>
                    <th className="py-3.5 px-3">Vận Hành &amp; Escrow</th>
                    <th className="py-3.5 px-3 text-center">Trạng Thái</th>
                    <th className="py-3.5 px-space-md text-right">Thao Tác Nhạy Cảm</th>
                  </tr>
                </thead>
                <tbody className="font-body-md text-body-md divide-y-0">

                  <tr className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-4 px-space-md">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container flex items-center justify-center shrink-0 shadow-sm">
                          <img className="w-full h-full object-cover" data-alt="Corporate minimalist bakery logo for Trang An Artisan Mooncake showing stylized golden harvest moon and woodblock seal on crimson background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKUD7Hc-iUbNUUk8v9N3vpWeKW8dHwEUg1HW5dM4gvpUM5loTgRfsx-kjeVeKmGQppBag4OBt7sbsZs8FjGHZrjJXOfK4Eai_euotrQAQnRFjRUdaJqJhvmxbtaeRlXfpOfaDhNKL9Ba3FjPkqh8vdl3A2M9NAKIeMW8Hy2Ec5ZwX2E9ks_h1SxdnYK_xgMnsGxrUtL8XMGzy7pGEl6Hl1o1Ar1zrvtlgBbqhaM--NyAPxCRcyHWnO" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-title-md text-title-md text-on-surface font-bold truncate">Tràng An Artisan Bakery</span>
                            <span className="material-symbols-outlined text-tertiary text-[16px]" title="Xưởng Đạt Chuẩn ISO / HACCP">verified</span>
                          </div>
                          <a className="font-data-mono text-data-mono text-primary hover:underline text-[12px] block truncate" href="#">/shop/trang-an-bakery</a>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Template: Artisan Heritage</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="font-title-md text-body-md text-on-surface font-medium truncate">CTCP Bánh Mứt Hà Nội</div>
                      <div className="font-data-mono text-data-mono text-outline text-[12px]">MST: 0102938472</div>
                    </td>
                    <td className="py-4 px-3 text-center font-data-mono text-data-mono font-bold text-on-surface">
                      48 <span className="text-[11px] text-outline font-normal">mẫu</span>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-md">
                          <span className="material-symbols-outlined text-secondary text-[16px]" style={{ "fontVariationSettings": "'FILL' 1" }}>star</span>
                          <span className="font-data-mono text-data-mono font-bold text-on-surface">4.9</span>
                        </div>
                        <span className="font-data-mono text-data-mono text-tertiary font-bold bg-tertiary-fixed/40 px-1.5 py-0.5 rounded text-[11px]">98/100 Điểm</span>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="font-data-mono text-title-md text-title-md font-bold text-primary">6.420.000.000 đ</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Đã chốt 34 Hợp Đồng B2B</div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center justify-between text-[11px] font-data-mono text-on-surface-variant">
                          <span>Đúng hạn: <strong className="text-tertiary">99.2%</strong></span>
                          <span>Hủy: <strong className="text-error">0.4%</strong></span>
                        </div>
                        <div className="font-data-mono text-data-mono text-[11px] text-primary font-medium">
                          Escrow: <strong>1.480.000.000 đ</strong>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Đang Hoạt Động
                      </span>
                    </td>
                    <td className="py-4 px-space-md text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="p-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors" title="Xem Báo Cáo Sâu" type="button">
                          <span className="material-symbols-outlined text-[18px]">query_stats</span>
                        </button>
                        <button className="p-2 rounded-xl bg-error-container/50 text-error hover:bg-error-container transition-colors" title="Tạm Khóa Gian Hàng (Suspend)" type="button">
                          <span className="material-symbols-outlined text-[18px]">block</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low/50 transition-colors bg-surface-container-low/20">
                    <td className="py-4 px-space-md">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container flex items-center justify-center shrink-0 shadow-sm">
                          <img className="w-full h-full object-cover" data-alt="Traditional luxury royal mooncake brand emblem showing imperial dragon motif with deep jade and gold accents on textured ivory paper background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxki_EHCvSrVnaOI_WXEEiaILZthvfv10UVRTBq3c6OiP5tpNVgnr_Iqk0yaVsRMiBT7764f2nJuoXnMBRjN-3aLXbrnTRgBnbQ_FbGZli5HfzOcHiTb-0Wq_EXcxl4LBgHqp3psUk9VIvnhvJNJ7jMlWj99M5NBGi8bW9OMXyXK_hzUWwHpB3wA1gIPybhDdRtyBbOLhYGEMTG-3_s3F7xVTwNlihJaFuhKcp0QBz4B1Y1cYSaaAA" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-title-md text-title-md text-on-surface font-bold truncate">Đại Nội Mooncake Hoàng Gia</span>
                            <span className="material-symbols-outlined text-tertiary text-[16px]" title="Xưởng Đạt Chuẩn ISO / HACCP">verified</span>
                          </div>
                          <a className="font-data-mono text-data-mono text-primary hover:underline text-[12px] block truncate" href="#">/shop/dai-noi-mooncake</a>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Template: Modern Royal</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="font-title-md text-body-md text-on-surface font-medium truncate">Công Ty TNHH Hoàng Gia Huế</div>
                      <div className="font-data-mono text-data-mono text-outline text-[12px]">MST: 3301827461</div>
                    </td>
                    <td className="py-4 px-3 text-center font-data-mono text-data-mono font-bold text-on-surface">
                      62 <span className="text-[11px] text-outline font-normal">mẫu</span>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-md">
                          <span className="material-symbols-outlined text-secondary text-[16px]" style={{ "fontVariationSettings": "'FILL' 1" }}>star</span>
                          <span className="font-data-mono text-data-mono font-bold text-on-surface">4.8</span>
                        </div>
                        <span className="font-data-mono text-data-mono text-tertiary font-bold bg-tertiary-fixed/40 px-1.5 py-0.5 rounded text-[11px]">94/100 Điểm</span>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="font-data-mono text-title-md text-title-md font-bold text-primary">8.950.000.000 đ</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Đã chốt 51 Hợp Đồng B2B</div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center justify-between text-[11px] font-data-mono text-on-surface-variant">
                          <span>Đúng hạn: <strong className="text-tertiary">97.8%</strong></span>
                          <span>Hủy: <strong className="text-error">1.1%</strong></span>
                        </div>
                        <div className="font-data-mono text-data-mono text-[11px] text-primary font-medium">
                          Escrow: <strong>2.910.000.000 đ</strong>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Đang Hoạt Động
                      </span>
                    </td>
                    <td className="py-4 px-space-md text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="p-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors" title="Xem Báo Cáo Sâu" type="button">
                          <span className="material-symbols-outlined text-[18px]">query_stats</span>
                        </button>
                        <button className="p-2 rounded-xl bg-error-container/50 text-error hover:bg-error-container transition-colors" title="Tạm Khóa Gian Hàng (Suspend)" type="button">
                          <span className="material-symbols-outlined text-[18px]">block</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low/50 transition-colors bg-error-container/10">
                    <td className="py-4 px-space-md">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container flex items-center justify-center shrink-0 grayscale opacity-80 shadow-sm">
                          <img className="w-full h-full object-cover" data-alt="Traditional artisan bakery brand icon stamped in vermilion red seal with golden wheat and lotus flowers, professional gourmet photography style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_Mf32tlBM9cxvHfbAMnSttDtiaW0JjZW7SsMDP6--uELXFditWWWschmGTFoBWxIqaDpm3W_7vNqiiz9F9hhEXetJnOuB1FBQXEpDrAbx8Zc2HmkxlicUouK4qeBVvHW2JJ0c56brYjWhBF5oAstgkIWVEU113Cwf5R-B1xrukOsxhisuOdqZ5xcO-MICYRk376a0S2YBA8w03yQqsAAJCs4vThkoVg0K5BKaWsK6pMpkicWSxBLD" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-title-md text-title-md text-on-surface font-bold line-through text-outline truncate">Bếp Vàng Tân Triều</span>
                            <span className="material-symbols-outlined text-error text-[16px]" title="Vi Phạm Chính Sách Chất Lượng">warning</span>
                          </div>
                          <a className="font-data-mono text-data-mono text-outline hover:underline text-[12px] block truncate" href="#">/shop/tan-trieu-bakery</a>
                          <span className="font-label-sm text-label-sm text-error font-medium">Lý do: Chậm giao &gt; 5 ngày hợp đồng B2B</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="font-title-md text-body-md text-on-surface font-medium truncate">HKD Tân Triều Gia Truyền</div>
                      <div className="font-data-mono text-data-mono text-outline text-[12px]">MST: 0319482019</div>
                    </td>
                    <td className="py-4 px-3 text-center font-data-mono text-data-mono font-bold text-outline">
                      19 <span className="text-[11px] text-error font-normal">(Bị ẩn)</span>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-md">
                          <span className="material-symbols-outlined text-secondary text-[16px]" style={{ "fontVariationSettings": "'FILL' 1" }}>star</span>
                          <span className="font-data-mono text-data-mono font-bold text-on-surface">3.2</span>
                        </div>
                        <span className="font-data-mono text-data-mono text-error font-bold bg-error-container px-1.5 py-0.5 rounded text-[11px]">54/100 Điểm</span>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="font-data-mono text-title-md text-title-md font-bold text-on-surface-variant">420.000.000 đ</div>
                      <div className="font-body-sm text-body-sm text-error">2 Tranh Chấp Khiếu Nại</div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center justify-between text-[11px] font-data-mono text-on-surface-variant">
                          <span>Đúng hạn: <strong className="text-error">71.0%</strong></span>
                          <span>Hủy: <strong className="text-error">12.5%</strong></span>
                        </div>
                        <div className="font-data-mono text-data-mono text-[11px] text-secondary font-medium">
                          Đang Đóng Băng Escrow: <strong>210.000.000 đ</strong>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> Bị Khóa Suspend
                      </span>
                    </td>
                    <td className="py-4 px-space-md text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-tertiary-container text-on-tertiary-container font-label-md text-label-md font-bold hover:brightness-110 transition-all shadow-sm" type="button">
                          <span className="material-symbols-outlined text-[16px]">lock_open</span>
                          <span>Mở Khóa</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-4 px-space-md">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container flex items-center justify-center shrink-0 shadow-sm">
                          <img className="w-full h-full object-cover" data-alt="Clean aesthetic botanical logo mark for organic vegetarian mooncake studio featuring emerald green tea leaf and full moon silhouette on linen textured background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBE-Y-eApdD7LdUBmq39MrYpGk7m_lW0LhT59dmPfLsU5Q2J-Clf5H1Pphop5ByvR-1DmS8HuW7Wrqu23a6CM9_PbeaXpLZ9UMmA98ncFxepb3XCiN5uO1h7FmSDIwbpx2t5uXlWCfyhfkVwvFw7AKW2eSWpPbok69bsyQAyzE6QPrsJCVFToQ-Ramo_qGmfFt650I7Fdj2GV3olNyQcz8uVkre_JWVA-XASR_ENgFYxKODAurPacC_" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-title-md text-title-md text-on-surface font-bold truncate">Thuần Chay Mộc Trà Moon</span>
                            <span className="material-symbols-outlined text-secondary text-[16px]" title="Xưởng Đang Bảo Trì Lò">pause_circle</span>
                          </div>
                          <a className="font-data-mono text-data-mono text-primary hover:underline text-[12px] block truncate" href="#">/shop/moc-tra-vegan</a>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Template: Minimalist Luxury</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="font-title-md text-body-md text-on-surface font-medium truncate">HTX Nông Sản Hữu Cơ Mộc Trà</div>
                      <div className="font-data-mono text-data-mono text-outline text-[12px]">MST: 0401928374</div>
                    </td>
                    <td className="py-4 px-3 text-center font-data-mono text-data-mono font-bold text-on-surface">
                      14 <span className="text-[11px] text-outline font-normal">mẫu</span>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-md">
                          <span className="material-symbols-outlined text-secondary text-[16px]" style={{ "fontVariationSettings": "'FILL' 1" }}>star</span>
                          <span className="font-data-mono text-data-mono font-bold text-on-surface">4.6</span>
                        </div>
                        <span className="font-data-mono text-data-mono text-tertiary font-bold bg-tertiary-fixed/40 px-1.5 py-0.5 rounded text-[11px]">88/100 Điểm</span>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="font-data-mono text-title-md text-title-md font-bold text-primary">1.240.000.000 đ</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Đã chốt 12 Hợp Đồng B2B</div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center justify-between text-[11px] font-data-mono text-on-surface-variant">
                          <span>Đúng hạn: <strong className="text-tertiary">96.0%</strong></span>
                          <span>Hủy: <strong className="text-on-surface-variant">2.0%</strong></span>
                        </div>
                        <div className="font-data-mono text-data-mono text-[11px] text-primary font-medium">
                          Escrow: <strong>320.000.000 đ</strong>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Tạm Ẩn Vụ Bánh
                      </span>
                    </td>
                    <td className="py-4 px-space-md text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="p-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors" title="Xem Báo Cáo Sâu" type="button">
                          <span className="material-symbols-outlined text-[18px]">query_stats</span>
                        </button>
                        <button className="p-2 rounded-xl bg-error-container/50 text-error hover:bg-error-container transition-colors" title="Tạm Khóa Gian Hàng (Suspend)" type="button">
                          <span className="material-symbols-outlined text-[18px]">block</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-space-md py-3 bg-surface-container-low text-on-surface-variant font-body-sm text-body-sm border-t border-outline-variant/10">
              <span className="font-data-mono">Hiển thị 1 - 4 của 284 nhà sản xuất đã xác thực B2B</span>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center hover:bg-surface-container-high text-on-surface" type="button"><span className="material-symbols-outlined text-[16px]">chevron_left</span></button>
                <button className="w-8 h-8 rounded-lg bg-primary-container text-on-primary font-bold text-xs" type="button">1</button>
                <button className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center hover:bg-surface-container-high text-on-surface font-semibold text-xs" type="button">2</button>
                <button className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center hover:bg-surface-container-high text-on-surface font-semibold text-xs" type="button">3</button>
                <span className="px-1 text-outline">...</span>
                <button className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center hover:bg-surface-container-high text-on-surface font-semibold text-xs" type="button">29</button>
                <button className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center hover:bg-surface-container-high text-on-surface" type="button"><span className="material-symbols-outlined text-[16px]">chevron_right</span></button>
              </div>
            </div>
          </div>
        </div>



        <div className="tab-content hidden flex flex-col space-y-space-md" id="tab-templates">

          <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Kho Bản Mẫu Mặt Tiền Gian Hàng (Storefront Presets)</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Định dạng CSS Variables, grid mẫu RFQ và cấu hình dập logo doanh nghiệp riêng biệt cho từng phong cách xưởng.</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-title-md text-title-md font-semibold hover:bg-primary-container transition-all shadow-md" type="button">
                <span className="material-symbols-outlined text-[20px]">upload_file</span>
                <span>Thêm Template Mới (Upload JSON / CSS)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">

            <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-surface-container overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="B2B E-commerce storefront mockup layout showing traditional Artisan Heritage theme with warm cinnabar red accents, fine woodblock carvings, and bulk tiered pricing matrix for Mooncake procurement" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9I0YZRiNW__7BUHj_knryJKjVFn4yES_YDqUcam5_EoNgizKHk7xZ2og2cEl5AuVog76nSRT6ont4UlptpeBWNQ30btLmZyTb92RTco3e4c2L1fMjWZB26paJ54LQaprNFQiuYZTscZLQkhI5Y3HCMKU6tSoMC5S13OkhlS5fMpn5p9i1ZaJpBC1PyI_BmjspIcT41XJoOyN1EVmsdSujflwwe2gUz6iBslIKAAYR1637IwCDhD4q" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">Đang Hoạt Động Toàn Sàn</span>
                </div>
                <span className="absolute top-3 right-3 font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold shadow-sm">
                  Template Tiêu Chuẩn
                </span>
              </div>
              <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">Artisan Heritage (Cổ Điển)</h3>
                    <span className="font-data-mono text-data-mono text-tertiary font-bold text-xs">84 Shop Dùng</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Hài hoà nét mộc mạc cổ truyền, tối ưu cho xưởng làm bánh trung thu gia truyền 3 đời với hoa văn khuôn gỗ thủ công.
                  </p>
                </div>
                <div className="pt-space-sm border-t border-outline-variant/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#760009]" title="Crimson Primary"></span>
                    <span className="w-4 h-4 rounded-full bg-[#fdfbf7]" title="Warm Ivory"></span>
                    <span className="w-4 h-4 rounded-full bg-[#904d00]" title="Amber Accent"></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                    <button className="p-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors" title="Chỉnh sửa Biến CSS / Layout" type="button">
                      <span className="material-symbols-outlined text-[18px]">tune</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-surface-container overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="High-end royal bakery website template preview with imperial gold foil lettering, deep velvet red luxury box mockups, and corporate sample reservation slider" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5jho3aKDqKtPLhXE7OQsSsmnCBJ9lEgIye5V2Fi8CoLGUZTn_DxinIMAbQfN6_fM5UTEwHVy-acQdZYq2CblCvK1gJKAtYCDHuGf_ZW-SrTGaRUxSo6-NqblO3SnKIK3gUrhVjeN71CcHigDUkUYAnbmhT_Oqp0FVpTy8WRCVOMbAEHYL4BtKb9d0za3M8hzK4wFB7ZMSRzIrIrOSbELYn8pHARa_QWytexbLNaXB0ps2aelBNo4c" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">Đang Hoạt Động Toàn Sàn</span>
                </div>
                <span className="absolute top-3 right-3 font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-bold shadow-sm">
                  Premium (Đối Tác Vàng)
                </span>
              </div>
              <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">Modern Royal (Hoàng Gia)</h3>
                    <span className="font-data-mono text-data-mono text-tertiary font-bold text-xs">59 Shop Dùng</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Phong cách vương giả, viền dập nổi vàng kim, hỗ trợ trình diễn video 3D mở hộp bánh cao cấp và bộ quà VIP tặng đại sứ.
                  </p>
                </div>
                <div className="pt-space-sm border-t border-outline-variant/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#342f2b]" title="Obsidian Surface"></span>
                    <span className="w-4 h-4 rounded-full bg-[#fe932c]" title="Royal Gold"></span>
                    <span className="w-4 h-4 rounded-full bg-[#ffdad6]" title="Silk Pink"></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                    <button className="p-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors" type="button">
                      <span className="material-symbols-outlined text-[18px]">tune</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-surface-container overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Minimalist Scandinavian bakery storefront web UI preview featuring ultra-clean linen white aesthetic, typography-driven product layout, and organic mooncake gift baskets" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy0-szeLO2yFQ_OuW_rG6xSSp0r3mqm9kRSeOW-ed8b6pwvGEZ0k7aYhwDx9FXu9q3Fy5OYcgzQRyx4RlNLBZqrG8syGPA3MpP65bnubfsoRHxJSg_6sIn7KDI_rFA1vWnNel7JDSCS7TC97zFwowHnSPIflH0dFT-7nUi9KHM1B1Gr2oJAScN0OdWqzYvTH-4PCHdh4aWGvshNaES5Rw6n808vdlcxJ_PsQ-IJDIBh0bHQE7xS5cq" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">Đang Hoạt Động Toàn Sàn</span>
                </div>
                <span className="absolute top-3 right-3 font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold shadow-sm">
                  Template Tiêu Chuẩn
                </span>
              </div>
              <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">Minimalist Luxury (Tối Giản)</h3>
                    <span className="font-data-mono text-data-mono text-tertiary font-bold text-xs">42 Shop Dùng</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Tinh thần tối giản đương đại, font chữ editorial cao cấp, chuyên dùng cho các dòng bánh hữu cơ ít đường (Isomalt / Organic).
                  </p>
                </div>
                <div className="pt-space-sm border-t border-outline-variant/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#f6ece6]" title="Warm Linen"></span>
                    <span className="w-4 h-4 rounded-full bg-[#59413e]" title="Dark Walnut"></span>
                    <span className="w-4 h-4 rounded-full bg-[#175844]" title="Pine Accent"></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                    <button className="p-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors" type="button">
                      <span className="material-symbols-outlined text-[18px]">tune</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-surface-container overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Corporate enterprise mooncake purchasing portal UI showcasing matrix discount tier calculators, logo engraving simulator, and fast RFQ bid submission forms" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsOK4-G_URjsJC76qgDEJmbSSDWm0ZrjT7f6Ym0STP1SWDiWKDlDYrsZ8tPyfC9Evv7tcgOb2394IoqXEIzciheXado-lOuWksDAcJ2f9jrGxyg6FUm8_xORy6vaVvRSyjHemDTwwi42ns6eUNpklqH2wAO4IBugo1wQtgi1RXJ-EgdWDAj8Fv0Ufvog7CYzZf8R7mg4TeCIEsv-nWXYOE24vpQ7HxqBTiIvHnXFps-TWAFgoN_cEB" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">Đang Hoạt Động Toàn Sàn</span>
                </div>
                <span className="absolute top-3 right-3 font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-bold shadow-sm">
                  Premium (Đối Tác Vàng)
                </span>
              </div>
              <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">Corporate Gift (Quà Doanh Nghiệp)</h3>
                    <span className="font-data-mono text-data-mono text-tertiary font-bold text-xs">67 Shop Dùng</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Tích hợp sẵn bộ đo kích thước logo ép kim, bảng biểu mẫu hợp đồng B2B xuất hóa đơn GTGT tự động và MOQ 100+ hộp.
                  </p>
                </div>
                <div className="pt-space-sm border-t border-outline-variant/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#1f1b17]" title="Corporate Dark"></span>
                    <span className="w-4 h-4 rounded-full bg-[#991b1b]" title="Crimson"></span>
                    <span className="w-4 h-4 rounded-full bg-[#ffdcc3]" title="Warm Paper"></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                    <button className="p-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors" type="button">
                      <span className="material-symbols-outlined text-[18px]">tune</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-surface-container overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Vibrant festive red Mooncake marketplace e-commerce store layout preview with lantern banners, harvest festival illustrations, and multi-flavor sample bundles" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp6eyK87q0YdRYA9M3sC_yn32g5Rgv2CLXY4FTnrZQeIThM1CeS4r4sHrTk_Id9j0LR8rZjhS5RhSLNT8g_eLfuwmbeZtx50o3Kvv6PBX_67IQbQ5K6Rbc-gBeSyIW0ItO81z9eloIMOVM4-k-Dh3ETFNVtd0pe9IsYLF1HmVLgKIg4ytUVTeDK6D1A5UqgBiiJQoR_tMOkC9AYslVOu2346sEIz07S82xpTAKvLrKWvmjaz_1NNFj" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">Đang Hoạt Động Toàn Sàn</span>
                </div>
                <span className="absolute top-3 right-3 font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold shadow-sm">
                  Template Tiêu Chuẩn
                </span>
              </div>
              <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">Festive Red (Truyền Thống)</h3>
                    <span className="font-data-mono text-data-mono text-tertiary font-bold text-xs">26 Shop Dùng</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Sắc đỏ thắm hội trăng rằm rộn ràng, kích thích tâm lý biếu tặng gia đình và cán bộ công nhân viên dịp tết Trung Thu đoàn viên.
                  </p>
                </div>
                <div className="pt-space-sm border-t border-outline-variant/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#b02d29]" title="Festive Red"></span>
                    <span className="w-4 h-4 rounded-full bg-[#ffb77d]" title="Lantern Warm"></span>
                    <span className="w-4 h-4 rounded-full bg-[#fcf2eb]" title="Surface Tint"></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                    <button className="p-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors" type="button">
                      <span className="material-symbols-outlined text-[18px]">tune</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-surface-container overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Emerald jade green serene mooncake web template layout with porcelain tea set graphics, celadon glaze textures, and premium artisanal gift box showcases" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYEg-f30QbWjxK7W6wymAviJKcAWfl5BAkUqf0WAjvoQnCZ1Rw40vyxKk4RfenMJNnyOu2QE-4O2XOpvvZIVneR2kSqrXvX6tGGb42usWQGQcDOQ4k4FEDfZTU8GDj_1Vv1FHx-Rn4HT85qL1J__d4mMsqD6N-AVGW-t0XpwKe2GLOnKb7lWd0ZTFqI5THNT098Cg8Ai1H4eOPgJpeqs8Juf0n91bpFpswjprBxOJeoacEvTcx9MdX" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-surface-container-highest/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-outline"></span>
                  <span className="font-label-sm text-label-sm text-outline font-semibold">Tạm Khóa (Đang Nâng Cấp CSS)</span>
                </div>
                <span className="absolute top-3 right-3 font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-bold shadow-sm">
                  Premium (Đối Tác Vàng)
                </span>
              </div>
              <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">Emerald Jade (Ngọc Bích)</h3>
                    <span className="font-data-mono text-data-mono text-outline font-bold text-xs">6 Shop Dùng</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Màu ngọc bích quý phái mang biểu trưng thịnh vượng, chuyên dùng cho các xưởng bánh kết hợp cùng trà Shan Tuyết cổ thụ.
                  </p>
                </div>
                <div className="pt-space-sm border-t border-outline-variant/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#00402f]" title="Deep Jade"></span>
                    <span className="w-4 h-4 rounded-full bg-[#b0f0d6]" title="Mint Frost"></span>
                    <span className="w-4 h-4 rounded-full bg-[#1f1b17]" title="Charcoal"></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input className="sr-only peer" type="checkbox" />
                      <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                    <button className="p-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors" type="button">
                      <span className="material-symbols-outlined text-[18px]">tune</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="tab-content hidden flex flex-col space-y-space-md" id="tab-categories">

          <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Cây Danh Mục B2B &amp; Thuộc Tính Sản Phẩm (2 Cấp)</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Phân nhóm chuẩn hóa để người mua doanh nghiệp dễ dàng lọc theo trọng lượng (Gram), hạn bảo quản và dòng bánh.</p>
            </div>
            <div className="flex items-center gap-2 self-stretch sm:self-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary font-title-md text-title-md font-semibold hover:bg-primary transition-all shadow-md" type="button">
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                <span>Thêm Nhóm Danh Mục Gốc</span>
              </button>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm space-y-space-md">

            <div className="bg-surface-container-low rounded-xl p-space-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[24px]">bakery_dining</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">1. Bánh Nướng Truyền Thống &amp; Cao Cấp</span>
                      <span className="font-data-mono text-data-mono text-xs px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-bold">Sort: 01</span>
                      <span className="font-label-sm text-label-sm text-outline">182 SKUs trên sàn</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Vỏ vàng ươm truyền thống, trọng lượng chuẩn B2B 150g - 250g, hạn sử dụng 45 ngày.</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-semibold hover:bg-surface-container transition-colors shadow-sm" type="button">
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>Thêm Danh Mục Con</span>
                  </button>
                  <button className="p-1.5 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors" type="button">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pl-8">
                <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex items-center justify-between">
                  <div>
                    <div className="font-title-md text-body-md font-bold text-on-surface">Thập Cẩm Bát Bửu Cổ Truyền</div>
                    <span className="font-data-mono text-data-mono text-xs text-outline">Sort #01 • 74 SKUs</span>
                  </div>
                  <span className="material-symbols-outlined text-outline cursor-grab">drag_indicator</span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex items-center justify-between">
                  <div>
                    <div className="font-title-md text-body-md font-bold text-on-surface">Vi Cá Bào Ngư Thượng Hạng</div>
                    <span className="font-data-mono text-data-mono text-xs text-outline">Sort #02 • 38 SKUs</span>
                  </div>
                  <span className="material-symbols-outlined text-outline cursor-grab">drag_indicator</span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex items-center justify-between">
                  <div>
                    <div className="font-title-md text-body-md font-bold text-on-surface">Hạt Sen Long Nhãn Trà Xanh</div>
                    <span className="font-data-mono text-data-mono text-xs text-outline">Sort #03 • 42 SKUs</span>
                  </div>
                  <span className="material-symbols-outlined text-outline cursor-grab">drag_indicator</span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex items-center justify-between">
                  <div>
                    <div className="font-title-md text-body-md font-bold text-on-surface">Lava Hoàng Kim Trứng Chảy</div>
                    <span className="font-data-mono text-data-mono text-xs text-outline">Sort #04 • 28 SKUs</span>
                  </div>
                  <span className="material-symbols-outlined text-outline cursor-grab">drag_indicator</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-space-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary text-[24px]">cookie</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">2. Bánh Dẻo Thanh Nhã &amp; Ăn Kiêng</span>
                      <span className="font-data-mono text-data-mono text-xs px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant font-bold">Sort: 02</span>
                      <span className="font-label-sm text-label-sm text-outline">96 SKUs trên sàn</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Bột nếp cái hoa vàng hương bưởi tự nhiên, dòng dẻo ít đường tốt cho sức khỏe người lớn tuổi.</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-semibold hover:bg-surface-container transition-colors shadow-sm" type="button">
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>Thêm Danh Mục Con</span>
                  </button>
                  <button className="p-1.5 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors" type="button">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pl-8">
                <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex items-center justify-between">
                  <div>
                    <div className="font-title-md text-body-md font-bold text-on-surface">Đậu Xanh Hạt Dưa Truyền Thống</div>
                    <span className="font-data-mono text-data-mono text-xs text-outline">Sort #01 • 45 SKUs</span>
                  </div>
                  <span className="material-symbols-outlined text-outline cursor-grab">drag_indicator</span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex items-center justify-between">
                  <div>
                    <div className="font-title-md text-body-md font-bold text-on-surface">Trà Xanh Hạt Chia Hữu Cơ</div>
                    <span className="font-data-mono text-data-mono text-xs text-outline">Sort #02 • 31 SKUs</span>
                  </div>
                  <span className="material-symbols-outlined text-outline cursor-grab">drag_indicator</span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex items-center justify-between">
                  <div>
                    <div className="font-title-md text-body-md font-bold text-on-surface">Dẻo Chay Đường Ăn Kiêng Isomalt</div>
                    <span className="font-data-mono text-data-mono text-xs text-outline">Sort #03 • 20 SKUs</span>
                  </div>
                  <span className="material-symbols-outlined text-outline cursor-grab">drag_indicator</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-space-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[24px]">ac_unit</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">3. Bánh Hiện Đại Tươi Mới (Cold Chain)</span>
                      <span className="font-data-mono text-data-mono text-xs px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-bold">Sort: 03</span>
                      <span className="font-label-sm text-label-sm text-outline">52 SKUs trên sàn</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Yêu cầu bảo quản lạnh xe thùng chuyên dụng -18°C đến 4°C, giao hỏa tốc 4H.</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-semibold hover:bg-surface-container transition-colors shadow-sm" type="button">
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>Thêm Danh Mục Con</span>
                  </button>
                  <button className="p-1.5 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors" type="button">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 pl-8">
                <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex items-center justify-between">
                  <div>
                    <div className="font-title-md text-body-md font-bold text-on-surface">Snow-skin Vỏ Tuyết Đa Vị Nhân Kem Tươi</div>
                    <span className="font-data-mono text-data-mono text-xs text-outline">Sort #01 • 32 SKUs</span>
                  </div>
                  <span className="material-symbols-outlined text-outline cursor-grab">drag_indicator</span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex items-center justify-between">
                  <div>
                    <div className="font-title-md text-body-md font-bold text-on-surface">Mochi Trăng Lạnh Kiểu Nhật (Kem Sầu Riêng Musang)</div>
                    <span className="font-data-mono text-data-mono text-xs text-outline">Sort #02 • 20 SKUs</span>
                  </div>
                  <span className="material-symbols-outlined text-outline cursor-grab">drag_indicator</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-space-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[24px]">inventory_2</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">4. Bộ Hộp Quà Tặng Doanh Nghiệp VIP (Customized Sets)</span>
                      <span className="font-data-mono text-data-mono text-xs px-2 py-0.5 rounded bg-primary-container text-on-primary font-bold">Sort: 04</span>
                      <span className="font-label-sm text-label-sm text-outline">114 SKUs trên sàn</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Quy chuẩn bao bì khắc laser logo, kèm thiệp chúc mừng, bộ dao nĩa mạ vàng và bình trà danh tiếng.</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-semibold hover:bg-surface-container transition-colors shadow-sm" type="button">
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>Thêm Danh Mục Con</span>
                  </button>
                  <button className="p-1.5 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors" type="button">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pl-8">
                <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex items-center justify-between">
                  <div>
                    <div className="font-title-md text-body-md font-bold text-on-surface">Hộp Gỗ Sơn Mài Cẩn Ốc &amp; Khắc Kim Tinh Xảo</div>
                    <span className="font-data-mono text-data-mono text-xs text-outline">Sort #01 • 38 SKUs</span>
                  </div>
                  <span className="material-symbols-outlined text-outline cursor-grab">drag_indicator</span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex items-center justify-between">
                  <div>
                    <div className="font-title-md text-body-md font-bold text-on-surface">Hộp Nắp Nam Châm Ép Kim Dập Nổi Logo Công Ty</div>
                    <span className="font-data-mono text-data-mono text-xs text-outline">Sort #02 • 52 SKUs</span>
                  </div>
                  <span className="material-symbols-outlined text-outline cursor-grab">drag_indicator</span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex items-center justify-between">
                  <div>
                    <div className="font-title-md text-body-md font-bold text-on-surface">Hộp 2 Tầng Cánh Quạt Cung Đình Kèm Trà Quý</div>
                    <span className="font-data-mono text-data-mono text-xs text-outline">Sort #03 • 24 SKUs</span>
                  </div>
                  <span className="material-symbols-outlined text-outline cursor-grab">drag_indicator</span>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="fixed inset-0 z-50 hidden flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" id="suspend-modal">
          <div className="bg-surface-container-lowest w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">

            <div className="p-space-md bg-error-container text-on-error-container flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px]">gavel</span>
                <h3 className="font-headline-sm text-headline-sm font-bold">Xác Nhận Tạm Khóa Gian Hàng (Suspend)</h3>
              </div>
              <button className="p-1 rounded-lg hover:bg-on-error-container/10 transition-colors" type="button">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-space-lg space-y-space-md">

              <div className="bg-surface-container-low p-3.5 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-outline uppercase">Gian Hàng Mục Tiêu:</span>
                  <span className="font-data-mono text-data-mono text-xs text-outline" id="modal-shop-mst">MST: 0102938472</span>
                </div>
                <div className="font-title-md text-title-md font-bold text-on-surface" id="modal-shop-name">Tràng An Artisan Bakery</div>
              </div>

              <div className="p-space-sm bg-error/10 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-error font-title-md text-body-md font-bold">
                  <span className="material-symbols-outlined text-[18px]">warning</span>
                  <span>Hậu quả nghiệp vụ có hiệu lực tức thì:</span>
                </div>
                <ul className="text-body-sm text-on-surface-variant space-y-1 pl-6 list-disc">
                  <li>Ẩn toàn bộ <strong id="modal-shop-skus">48 SKUs</strong> khỏi kết quả tìm kiếm B2B và thư mục danh mục sàn.</li>
                  <li>Tạm dừng toàn bộ quyền bỏ thầu và đàm phán hợp đồng <strong>RFQ đang hoạt động</strong>.</li>
                  <li>Tự động đóng băng quỹ đối soát <strong>Escrow</strong> cho tới khi giải quyết dứt điểm khiếu nại.</li>
                  <li>Gửi email thông báo pháp lý tới đại diện pháp luật của xưởng bánh.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <label className="block font-label-md text-label-md font-bold text-on-surface">
                  Lý do vi phạm chính sách <span className="text-error">* (Bắt buộc ghi rõ)</span>
                </label>
                <select className="w-full px-3 py-2 rounded-xl bg-surface-container font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-error" id="suspend-reason-preset">
                  <option>-- Chọn lý do vi phạm định sẵn --</option>
                  <option value="quality">Không đạt kiểm định an toàn VSTP mùa vụ / Trộn nguyên liệu cận date</option>
                  <option value="delay">Tỷ lệ hủy hoặc trễ hẹn giao đơn hàng doanh nghiệp &gt; 10%</option>
                  <option value="counterfeit">Xâm phạm nhãn hiệu bao bì bảo hộ / Đạo nhái khuôn bánh độc quyền</option>
                  <option value="fraud">Có dấu hiệu gian lận thanh toán Escrow / Giao dịch ngoài sàn</option>
                </select>
                <textarea className="w-full px-3 py-2 rounded-xl bg-surface-container font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-error" id="suspend-reason-text" placeholder="Nhập diễn giải chi tiết biên bản kiểm tra hoặc mã hồ sơ tranh chấp (#TC-2025-xxx)..." rows="3"></textarea>
              </div>
            </div>

            <div className="p-space-md bg-surface-container-low flex items-center justify-end gap-2">
              <button className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-title-md text-title-md font-semibold hover:bg-surface-container-high transition-colors" type="button">
                Hủy Bỏ
              </button>
              <button className="px-5 py-2 rounded-xl bg-error text-on-error font-title-md text-title-md font-bold hover:brightness-110 transition-all shadow-md" type="button">
                Xác Nhận Khóa Gian Hàng
              </button>
            </div>
          </div>
        </div>



        <div className="fixed inset-0 z-50 hidden flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" id="details-modal">
          <div className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-space-md bg-surface-container-low flex items-center justify-between border-b border-outline-variant/10">
              <div>
                <span className="font-data-mono text-data-mono text-outline text-xs uppercase">Báo Cáo Sâu Nghiệp Vụ</span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface" id="details-shop-title">Tràng An Artisan Bakery</h3>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-surface-container transition-colors" type="button">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-space-lg space-y-space-md">

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-surface-container-low">
                  <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Tỷ Lệ Giao Đúng Hạn</span>
                  <div className="font-headline-md text-headline-md font-bold text-tertiary mt-1" id="details-on-time">99.2%</div>
                  <span className="font-data-mono text-[11px] text-tertiary font-medium">Đạt chuẩn B2B Gold</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-container-low">
                  <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Tỷ Lệ Hủy Đơn Hàng</span>
                  <div className="font-headline-md text-headline-md font-bold text-on-surface mt-1" id="details-cancel-rate">0.4%</div>
                  <span className="font-data-mono text-[11px] text-outline font-medium">Trung bình sàn: 2.1%</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-container-low">
                  <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Ví Escrow Giữ Chờ</span>
                  <div className="font-headline-md text-headline-md font-bold text-primary mt-1" id="details-escrow-amount">1.48 Tỷ</div>
                  <span className="font-data-mono text-[11px] text-primary font-medium">Bảo chứng 12 HĐ lớn</span>
                </div>
              </div>

              <div className="bg-surface-container-low p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-body-sm font-semibold text-on-surface">
                  <span>Tiến độ hoàn thành cam kết giao hàng 30 ngày qua (Tuần W1 - W4)</span>
                  <span className="font-data-mono text-tertiary">100% SLA</span>
                </div>
                <div className="h-20 w-full flex items-end gap-3 pt-2">
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-tertiary-container/30 rounded-t h-12 flex items-end justify-center">
                      <div className="w-full bg-tertiary rounded-t h-11"></div>
                    </div>
                    <span className="font-data-mono text-[10px] text-outline">W1 (840 Hộp)</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-tertiary-container/30 rounded-t h-16 flex items-end justify-center">
                      <div className="w-full bg-tertiary rounded-t h-14"></div>
                    </div>
                    <span className="font-data-mono text-[10px] text-outline">W2 (1.200 Hộp)</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-tertiary-container/30 rounded-t h-16 flex items-end justify-center">
                      <div className="w-full bg-tertiary rounded-t h-16"></div>
                    </div>
                    <span className="font-data-mono text-[10px] text-outline">W3 (1.950 Hộp)</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-tertiary-container/30 rounded-t h-16 flex items-end justify-center">
                      <div className="w-full bg-primary-container rounded-t h-15"></div>
                    </div>
                    <span className="font-data-mono text-[10px] text-outline">W4 (Đang giao)</span>
                  </div>
                </div>
              </div>
              <div className="text-body-sm text-on-surface-variant flex items-center justify-between">
                <span>Mã số thuế: <strong id="details-shop-mst">0102938472</strong></span>
                <button className="text-primary font-medium hover:underline text-xs" type="button">Xem hồ sơ hợp đồng B2B chi tiết →</button>
              </div>
            </div>
            <div className="p-space-md bg-surface-container-low flex justify-end">
              <button className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-title-md text-title-md font-semibold hover:bg-surface-container-high transition-colors" type="button">
                Đóng
              </button>
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 right-6 z-50 hidden bg-surface-container-lowest text-on-surface border border-outline-variant/30 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200" id="toast">
          <span className="material-symbols-outlined text-tertiary text-[22px]" id="toast-icon">check_circle</span>
          <span className="font-body-md text-body-md font-medium" id="toast-message">Thao tác thực hiện thành công</span>
        </div>
      </div>

      </main></div>
    </div>
  );
}
