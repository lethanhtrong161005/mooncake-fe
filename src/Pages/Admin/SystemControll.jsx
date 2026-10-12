
export default function SystemControll({ onNavigate }) {
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest z-50 flex flex-col shadow-[0_1px_12px_rgba(0,0,0,0.06)] border-r border-outline-variant/30"><div className="h-20 px-space-md flex items-center gap-space-sm border-b border-outline-variant/20 bg-surface-container-low/40"><img alt="Logo biểu trưng thương hiệu sàn giao dịch B2B Bánh Trung Thu Mooncake Marketplace: biểu tượng vầng trăng rằm thanh lịch kết hợp hoa văn khuôn bánh truyền thống dập nổi vàng kim sang trọng trên nền đỏ trầm nhã nhặn.. Brand logo. - Primary color: #991b1b - Font: plusJakartaSans - Mode: light - Roundness: rounded-sm" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XeDH3ml-Oxy9w5fl0xKcYXZzLGzRPMBJAZpR8G80tab0cBtZrQ7_YfYflhLzmRN2uHc0sjIfX29rFpAto5mkXK_8CJNAc90yvMwH19nziuf_fMyXQbHwnnELW7O0Mtg7oUTPBeNuNccNI7sLjO5237vuzDzQnM78HYxZ3YuZpo2tjH0FZgBw7Woz7vXVCIGNjMsJ21mfCfp7P4n7MMkcw6U9YIFhCLwHrHNoPdUCq2mPD45CuedGPUF-0" /><div className="flex flex-col min-w-0 flex-1"><div className="flex items-center gap-space-xs"><span className="font-headline-sm text-headline-sm text-primary font-bold truncate leading-none">MoonMarket</span></div><div className="flex items-center gap-1.5 mt-1"><span className="inline-flex items-center px-1.5 py-0.5 rounded-DEFAULT bg-primary-container text-on-primary font-label-sm text-label-sm tracking-wider uppercase font-bold">Super Admin</span><span className="font-data-mono text-data-mono text-on-surface-variant text-[10px]">v4.2</span></div></div></div><div className="flex-1 overflow-y-auto px-space-sm py-space-md space-y-space-md"><nav className="space-y-space-md" data-active-classes="bg-primary-container text-on-primary font-title-md text-title-md shadow-[0_2px_8px_rgba(153,27,27,0.25)]"><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Tổng quan &amp; Điều hành</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="dashboard-tong-quan" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">grid_view</span><span className="font-body-md text-body-md">Dashboard Tổng quan</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#27</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="bao-cao-ai-analytics" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">insights</span><span className="font-body-md text-body-md">Báo cáo &amp; AI Analytics</span></div><span className="inline-flex items-center px-1.5 py-0.5 rounded-DEFAULT bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm font-bold">AI Live</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Duyệt &amp; Kiểm soát</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="duyet-nha-cung-cap" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">verified_user</span><span className="font-body-md text-body-md">Duyệt Nhà cung cấp</span></div><span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary-container text-on-primary font-data-mono text-data-mono font-bold text-[11px]">4</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="tranh-chap-khieu-nai" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">gavel</span><span className="font-body-md text-body-md">Tranh chấp &amp; Khiếu nại</span></div><span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-secondary-container text-on-secondary-container font-data-mono text-data-mono font-bold text-[11px]">2</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="kiem-duyet-noi-dung-review" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">rate_review</span><span className="font-body-md text-body-md">Kiểm duyệt Review</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#21</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Quản lý Thực thể</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="quan-ly-nguoi-dung" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">groups</span><span className="font-body-md text-body-md">Quản lý Người dùng</span></div><span className="font-data-mono text-data-mono text-on-surface-variant text-[11px]">B2B/B2C</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="quan-ly-gian-hang" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">storefront</span><span className="font-body-md text-body-md">Quản lý Gian hàng</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#3</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="danh-muc-template-shop" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">category</span><span className="font-body-md text-body-md">Danh mục &amp; Template</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#4</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Giao dịch &amp; Vận hành</div><div className="space-y-1"><a aria-current="page" className="flex items-center justify-between px-space-sm py-2 rounded-xl transition-all group bg-primary-container text-on-primary font-title-md text-title-md shadow-[0_2px_8px_rgba(153,27,27,0.25)]" data-path="dieu-phoi-giao-van" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">local_shipping</span><span className="font-body-md text-body-md">Điều phối Giao vận</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#19</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="so-giao-dich-vi-escrow" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">account_balance_wallet</span><span className="font-body-md text-body-md">Sổ GD &amp; Ví Escrow</span></div><span className="font-data-mono text-data-mono text-tertiary font-bold text-[11px]">Escrow</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="ho-so-tra-cuu-hop-dong" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">description</span><span className="font-body-md text-body-md">Đơn / RFQ / Hợp đồng</span></div><span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Hệ thống</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="cau-hinh-quy-tac-uy-tin" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">tune</span><span className="font-body-md text-body-md">Quy tắc &amp; Uy tín</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">RuleEngine</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="audit-log-nhat-ky-he-thong" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">receipt_long</span><span className="font-body-md text-body-md">Audit Log Hệ thống</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">SOC2</span></a></div></div></nav></div><div className="p-space-sm border-t border-outline-variant/20 bg-surface-container-low/60"><div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30"><div className="flex items-center gap-2.5 min-w-0"><div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm ring-2 ring-primary-container/20 shrink-0">TM</div><div className="min-w-0"><div className="font-title-md text-body-md text-on-surface font-semibold truncate leading-tight">Trần Minh Quân</div><div className="font-body-sm text-body-sm text-on-surface-variant truncate">Head of Operations</div></div></div><button className="p-1.5 rounded-lg text-outline hover:text-error hover:bg-error-container/40 transition-colors shrink-0" title="Đăng xuất an toàn" type="button"><span className="material-symbols-outlined text-[20px]">logout</span></button></div></div></aside><div className="pl-72"><header className="fixed top-0 left-72 right-0 h-20 bg-surface/90 backdrop-blur-xl z-40 border-b border-outline-variant/20 shadow-[0_1px_8px_rgba(0,0,0,0.03)]"><div className="h-20 w-full px-space-md flex items-center justify-between gap-space-md"><div className="flex-1 max-w-xl"><div className="relative flex items-center"><span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">search</span><input className="w-full pl-11 pr-20 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/40 font-body-md text-body-md text-on-surface placeholder:text-outline/70 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Tra cứu nhanh MST, Mã RFQ, Số HĐ, SKU, Người dùng, Gian hàng..." type="text" /><div className="absolute right-2.5 flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded-DEFAULT bg-surface-container text-outline font-data-mono text-[11px] font-semibold border border-outline-variant/30">Ctrl</kbd><kbd className="px-1.5 py-0.5 rounded-DEFAULT bg-surface-container text-outline font-data-mono text-[11px] font-semibold border border-outline-variant/30">K</kbd></div></div></div><div className="flex items-center gap-space-sm"><div className="hidden xl:flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30"><div className="flex items-center gap-1.5 pr-2.5 border-r border-outline-variant/20"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span className="font-data-mono text-data-mono text-on-surface font-semibold text-[12px]">B2B Core: 99.98%</span></div><div className="flex items-center gap-1 pl-1"><span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">Escrow Pool:</span><span className="font-data-mono text-data-mono text-primary font-bold text-[12px]">42.8 Tỷ VNĐ</span></div></div><div className="flex items-center bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30"><button className="px-2.5 py-1 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold tracking-wide" type="button">LIVE</button><button className="px-2.5 py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-semibold tracking-wide transition-colors" type="button">STAGING</button></div><button className="relative p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary-container transition-all group" title="Cảnh báo khẩn cấp" type="button"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] px-1 items-center justify-center rounded-full bg-error text-on-error font-data-mono text-[10px] font-bold ring-2 ring-surface">6</span></button><div className="flex items-center gap-2 pl-2 border-l border-outline-variant/20"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div className="hidden md:flex flex-col text-left"><span className="font-title-md text-label-md text-on-surface font-semibold leading-tight">HQ Ops Admin</span><span className="font-body-sm text-body-sm text-tertiary font-medium">Cấp 1 • Toàn quyền</span></div></div></div></div></header><main className="w-full pt-20 bg-surface px-space-md pb-space-xl"><div className="flex flex-col w-full">

        <div className="relative w-full space-y-space-lg">

          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <div className="relative flex flex-col xl:flex-row items-start xl:items-center justify-between gap-space-md">
              <div className="space-y-1">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-DEFAULT bg-primary-container text-on-primary font-label-sm text-label-sm font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    Điều Hành Trực Tiếp
                  </span>
                  <span className="font-data-mono text-data-mono text-on-surface-variant text-[12px]">Hệ thống giám sát v4.2 • Core Sync: Realtime</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-DEFAULT bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm font-semibold">
                    Cold-Chain IoT 24°C Locked
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
                  Trung Tâm Điều Phối Giao Vận &amp; Quản Trị Dòng Tiền Ví Escrow B2B
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                  Giám sát vận chuyển xe lạnh liên tỉnh đa điểm, đối soát khép kín dòng tiền ký quỹ Escrow và tra cứu hồ sơ hợp đồng pháp lý thời gian thực.
                </p>
              </div>

              <div className="flex items-center gap-space-sm self-stretch xl:self-auto flex-wrap">
                <div className="flex items-center gap-3 px-space-md py-2.5 rounded-xl bg-surface-container-high/60 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">ac_unit</span>
                  </div>
                  <div>
                    <div className="font-label-sm text-label-sm text-outline uppercase font-semibold">Đội Xe Lạnh Active</div>
                    <div className="font-headline-sm text-headline-sm text-primary font-bold">18 / 20 Xe</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-space-md py-2.5 rounded-xl bg-surface-container-high/60 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-tertiary-container text-on-tertiary flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">lock_clock</span>
                  </div>
                  <div>
                    <div className="font-label-sm text-label-sm text-outline uppercase font-semibold">Ví Ký Quỹ Đang Khóa</div>
                    <div className="font-headline-sm text-headline-sm text-tertiary font-bold">46.25 Tỷ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-surface-container-high p-space-md shadow-sm">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-11 h-11 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-[24px]">quick_reference_all</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-title-md text-title-md text-on-surface font-bold">Tra Cứu Hồ Sơ &amp; Hợp Đồng Giao Dịch Siêu Tốc (#27)</span>
                    <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded-DEFAULT bg-surface-container-lowest text-secondary font-semibold">Read-Only Hotline Ops</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Tra cứu tức thì dữ liệu gốc: HĐ-..., RFQ-..., ORD-..., BID-... để đối soát thắc mắc khách hàng ngay trên phiên trực.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-space-sm flex-1 max-w-2xl">
                <div className="relative w-full">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">document_scanner</span>
                  <input className="w-full pl-11 pr-24 py-2.5 rounded-lg bg-surface-container-lowest font-data-mono text-data-mono text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" id="fastLookupInput" placeholder="Nhập HĐ-2025-..., RFQ-8821, ORD-9912..." type="text" value="HĐ-2025-00892" />
                  <button className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-DEFAULT bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:opacity-95 shadow-sm transition-all" type="button">
                    Mở Xem
                  </button>
                </div>
                <div className="hidden xl:flex items-center gap-1.5 shrink-0">
                  <button className="px-2 py-1 rounded-DEFAULT bg-surface-container-lowest text-on-surface-variant hover:text-primary font-data-mono text-[11px] font-semibold transition-colors" >HĐ-00892</button>
                  <button className="px-2 py-1 rounded-DEFAULT bg-surface-container-lowest text-on-surface-variant hover:text-primary font-data-mono text-[11px] font-semibold transition-colors" >RFQ-8841</button>
                  <button className="px-2 py-1 rounded-DEFAULT bg-surface-container-lowest text-on-surface-variant hover:text-primary font-data-mono text-[11px] font-semibold transition-colors" >ORD-3091</button>
                </div>
              </div>
            </div>
          </div>

          <section className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm space-y-space-md">

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
              <div>
                <div className="flex items-center gap-space-xs">
                  <span className="font-data-mono text-data-mono text-primary font-bold">SECTION 1</span>
                  <span className="text-outline">•</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Cold-Chain Fleet Logistics Engine</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Điều Phối Giao Hàng &amp; Giám Sát Chuyến Xe Lạnh Đa Điểm (#19)
                </h2>
              </div>

              <div className="flex items-center gap-space-sm flex-wrap">
                <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest font-label-md text-label-md font-semibold shadow-sm transition-all" type="button">
                  <span className="material-symbols-outlined text-[18px] text-error">warning</span>
                  Ghi nhận sự cố giao chậm bất khả kháng
                </button>
                <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary-container text-on-primary hover:opacity-95 font-label-md text-label-md font-semibold shadow-sm transition-all" type="button">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  Điều phối lại đội xe dự phòng
                </button>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-space-md pt-space-xs">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container-high overflow-x-auto">
                <button className="fleet-filter-btn px-3.5 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md font-semibold shadow-sm transition-all" >
                  Tất cả đơn (24)
                </button>
                <button className="fleet-filter-btn px-3.5 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-semibold transition-all" >
                  Đơn nền tảng điều phối (MoonMarket Express) (16)
                </button>
                <button className="fleet-filter-btn px-3.5 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-semibold transition-all" >
                  Xưởng tự vận chuyển (8)
                </button>
                <button className="fleet-filter-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-error hover:bg-error-container/20 font-label-md text-label-md font-bold transition-all" >
                  <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                  Cảnh báo nhiệt độ xe lạnh (2)
                </button>
              </div>

              <div className="flex items-center gap-space-md px-space-md py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">thermostat</span>
                  <span className="font-data-mono text-data-mono text-[12px]">Nhiệt chuẩn: <strong className="text-on-surface">22°C - 24.5°C</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]">satellite_alt</span>
                  <span className="font-data-mono text-data-mono text-[12px]">GPS Ping: <strong className="text-on-surface">15s/lần</strong></span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl bg-surface-container-lowest shadow-sm">
              <table className="w-full text-left font-body-md text-body-md border-collapse">
                <thead>
                  <tr className="bg-surface-container-high/70 text-outline font-label-sm text-label-sm uppercase tracking-wider">
                    <th className="py-3 px-4 font-semibold">Mã Vận Đơn / HĐ</th>
                    <th className="py-3 px-4 font-semibold">Lộ Trình B2B</th>
                    <th className="py-3 px-4 font-semibold text-right">Số Lượng Hộp</th>
                    <th className="py-3 px-4 font-semibold">Đội Xe &amp; Nhiệt Độ IoT</th>
                    <th className="py-3 px-4 font-semibold">Trạng Thái Vận Chuyển</th>
                    <th className="py-3 px-4 font-semibold text-center">Bằng Chứng PoD</th>
                    <th className="py-3 px-4 font-semibold text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y-0 space-y-2">

                  <tr className="bg-surface-container-low/40 hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-data-mono text-data-mono font-bold text-primary">MM-LOG-HN7709</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Liên kết:</span>
                        <button className="font-data-mono text-[12px] text-tertiary font-semibold hover:underline" >HĐ-2025-00892</button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-title-md text-body-md font-semibold text-on-surface">Hà Nội ➔ Đà Nẵng ➔ TP.HCM</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">pin_drop</span>
                        Hiện tại: Km 592 QL1A (Đèo Ngang, Hà Tĩnh)
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">1.200</span>
                      <span className="font-body-sm text-body-sm text-outline block">Hộp Thượng Phẩm</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-title-md text-body-md text-on-surface font-medium">MoonMarket Cold-Chain Fleet 04</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-DEFAULT bg-tertiary-container text-on-tertiary font-data-mono text-[11px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          23.8°C (Chuẩn)
                        </span>
                        <span className="font-data-mono text-[11px] text-outline">BKS: 29H-882.11</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/20 text-secondary font-label-md text-label-md font-semibold">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                        Đang trên đường - Đèo Ngang
                      </span>
                      <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">Dự kiến đến ĐN: 18:30 hôm nay</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest font-label-sm text-label-sm font-semibold shadow-sm transition-all" type="button">
                        <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                        Xem Seal &amp; GPS
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors" title="Theo dõi lộ trình vệ tinh">
                          <span className="material-symbols-outlined text-[20px]">near_me</span>
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors" title="Điều phối xe thay thế">
                          <span className="material-symbols-outlined text-[20px]">alt_route</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr className="bg-error-container/30 hover:bg-error-container/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-data-mono text-data-mono font-bold text-error">MM-LOG-SG3021</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Liên kết:</span>
                        <button className="font-data-mono text-[12px] text-tertiary font-semibold hover:underline" >HĐ-2025-00714</button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-title-md text-body-md font-semibold text-on-surface">Bình Dương ➔ Cần Thơ ➔ Rạch Giá</div>
                      <div className="font-body-sm text-body-sm text-error flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-[14px]">warning</span>
                        Vừa dừng đột xuất tại Cái Bè (Tiền Giang)
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-headline-sm text-headline-sm text-error font-bold">2.500</span>
                      <span className="font-body-sm text-body-sm text-outline block">Hộp Quà Cao Cấp</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-title-md text-body-md text-on-surface font-medium">MoonMarket Cold-Chain Fleet 08</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-DEFAULT bg-error text-on-error font-data-mono text-[11px] font-bold animate-pulse">
                          <span className="material-symbols-outlined text-[12px]">thermostat_carbon</span>
                          26.8°C (VƯỢT NGƯỠNG)
                        </span>
                        <span className="font-data-mono text-[11px] text-outline">BKS: 51C-994.20</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error text-on-error font-label-md text-label-md font-bold">
                        Cảnh Báo Lốc Lạnh Khẩn Cấp
                      </span>
                      <div className="font-body-sm text-body-sm text-error font-semibold mt-1">Đã kích hoạt xe lạnh backup Mỹ Tho</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-error text-on-error font-label-sm text-label-sm font-semibold shadow-sm hover:opacity-95 transition-all" type="button">
                        <span className="material-symbols-outlined text-[16px]">emergency_home</span>
                        Kiểm tra Sự cố
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="px-3 py-1.5 rounded-DEFAULT bg-primary-container text-on-primary font-label-sm text-label-sm font-bold shadow-sm hover:opacity-90" >
                        Cứu Hàng Ngay
                      </button>
                    </td>
                  </tr>

                  <tr className="bg-surface-container-low/40 hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-data-mono text-data-mono font-bold text-on-surface">MM-LOG-DN4410</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Liên kết:</span>
                        <button className="font-data-mono text-[12px] text-tertiary font-semibold hover:underline" >HĐ-2025-00632</button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-title-md text-body-md font-semibold text-on-surface">Đà Nẵng ➔ KCN Hòa Khánh (FPT Complex)</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-tertiary">task_alt</span>
                        Đã hạ hàng vào kho mát tổng DN
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">850</span>
                      <span className="font-body-sm text-body-sm text-outline block">Set Trăng Rằm Kim Sa</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-title-md text-body-md text-on-surface font-medium">MoonMarket Cold-Chain Fleet 02</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-DEFAULT bg-tertiary-container text-on-tertiary font-data-mono text-[11px] font-bold">
                          22.5°C (Hoàn tất)
                        </span>
                        <span className="font-data-mono text-[11px] text-outline">BKS: 43B-112.90</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-label-md text-label-md font-semibold">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        Đã giao thành công
                      </span>
                      <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">Ký nhận: 10:15 Sáng nay</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-tertiary-container text-on-tertiary font-label-sm text-label-sm font-semibold shadow-sm hover:opacity-95 transition-all" type="button">
                        <span className="material-symbols-outlined text-[16px]">assignment_turned_in</span>
                        Xem ảnh PoD &amp; GPS
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="px-3 py-1.5 rounded-DEFAULT bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold shadow-sm hover:opacity-90" >
                        Duyệt Giải Ngân M3
                      </button>
                    </td>
                  </tr>

                  <tr className="bg-surface-container-low/40 hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-data-mono text-data-mono font-bold text-on-surface">MM-LOG-XUONG02</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Liên kết:</span>
                        <button className="font-data-mono text-[12px] text-tertiary font-semibold hover:underline" >HĐ-2025-00901</button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-title-md text-body-md font-semibold text-on-surface">Xưởng Bảo Phương (HN) ➔ Keangnam Landmark 72</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Bàn giao tại cửa kho đối tác</div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">500</span>
                      <span className="font-body-sm text-body-sm text-outline block">Hộp Thập Cẩm Cổ Truyền</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-title-md text-body-md text-on-surface font-medium">Xe Tải Xưởng Bảo Phương Tự Điều</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-DEFAULT bg-surface-container text-on-surface-variant font-data-mono text-[11px]">
                          Nội Thành Hà Nội (&lt; 2 Giờ)
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md font-semibold">
                        <span className="material-symbols-outlined text-[16px]">pending_actions</span>
                        Chờ lấy hàng tại xưởng
                      </span>
                      <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">Giờ xuất xưởng hẹn: 14:00</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-body-sm text-body-sm text-outline italic">Chưa có PoD</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="p-1.5 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors" title="Gọi đôn đốc xưởng">
                        <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md pt-space-xs">
              <div className="lg:col-span-2 rounded-xl bg-surface-container-high p-space-md flex flex-col sm:flex-row items-center gap-space-md">
                <div className="w-full sm:w-44 h-28 rounded-lg overflow-hidden shrink-0 shadow-sm relative">
                  <img className="w-full h-full object-cover" data-alt="Chuyên viên giám sát trung tâm điều phối chuỗi xe tải lạnh chở bánh trung thu cao cấp chạy trên cao tốc Bắc Nam, ánh nắng hoàng hôn vàng ấm áp rực rỡ, góc chụp flycam từ trên cao theo phong cách logistics enterprise hiện đại." src="https://lh3.googleusercontent.com/aida-public/AB6AXuByLIj_4eZVgNT_u1IQdkkWFC_cbpq1qs0l-g2phnIMr5v6xsOsUzypAdH3q96I6uOaaPNaVVHU1ORgD459x2iJMNFi7S9ANCw4gD0dUkF1xlCRUNx28jPoDaYySkr6YyWMfSjXtj-xonxZNb35c8V9rE56jwbap-dbQTEsCpMChb7fPql8yH4TToAQwnTWrdMKGCdWVLUo4koHNTvV4av18XLilgqvrY7kUPpe0rBNQj8qUdWABML1" />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-DEFAULT bg-surface/90 text-primary font-data-mono text-[10px] font-bold">GPS Cam #04</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-[20px]">verified</span>
                    <span className="font-title-md text-title-md text-on-surface font-bold">Chính Sách Bồi Thường Đứt Gãy Chuỗi Lạnh</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Tất cả chuyến xe MoonMarket Express đều được mua bảo hiểm hàng hóa thực phẩm tươi sống 100%. Nếu nhiệt độ vượt 26°C quá 45 phút, tiền ký quỹ Escrow tự động phong tỏa và kích hoạt cấp bù lô mới ngay lập tức.
                  </p>
                </div>
              </div>
              <div className="rounded-xl bg-surface-container-high p-space-md flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Tỷ Lệ Đúng Hạn 2025</span>
                  <span className="font-data-mono text-data-mono text-tertiary font-bold">99.4%</span>
                </div>
                <div className="my-2">
                  <div className="w-full h-2 rounded-full bg-surface-container">
                    <div className="h-2 rounded-full bg-tertiary" style={{ "width": "99.4%" }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Đã giao 148.900 hộp</span>
                  <span className="text-error font-semibold">0 sự cố hư hỏng</span>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm space-y-space-md">

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
              <div>
                <div className="flex items-center gap-space-xs">
                  <span className="font-data-mono text-data-mono text-secondary font-bold">SECTION 2</span>
                  <span className="text-outline">•</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">B2B Financial Trust Infrastructure</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Sổ Giao Dịch Ký Quỹ Toàn Nền Tảng (Platform Escrow Ledger - #25)
                </h2>
              </div>

              <div className="flex items-center gap-space-sm flex-wrap">
                <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest font-label-md text-label-md font-semibold shadow-sm transition-all" type="button">
                  <span className="material-symbols-outlined text-[18px] text-secondary">approval</span>
                  Xác Nhận Thanh Toán Thủ Công (Treo Lệnh Ngân Hàng)
                </button>
                <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-error-container text-on-error-container hover:bg-error-container/80 font-label-md text-label-md font-bold shadow-sm transition-all" type="button">
                  <span className="material-symbols-outlined text-[18px] text-error">currency_exchange</span>
                  Xử Lý Hoàn Tiền (Refund Escrow 2-Step OTP)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">

              <div className="rounded-xl bg-surface-container-low p-space-md shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Tổng Tiền Đang Khóa Ký Quỹ</span>
                  <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                  </div>
                </div>
                <div className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight mt-2">
                  46.250.000.000 <span className="font-label-md text-label-md text-on-surface-variant font-medium">VNĐ</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 font-body-sm text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">shield</span>
                  <span>Bảo chứng bởi Vietcombank Escrow Trust Pool</span>
                </div>
              </div>

              <div className="rounded-xl bg-surface-container-low p-space-md shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Đã Giải Ngân Thành Công (Mùa 2025)</span>
                  <div className="w-8 h-8 rounded-lg bg-tertiary-container text-on-tertiary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  </div>
                </div>
                <div className="font-headline-lg text-headline-lg text-tertiary font-bold tracking-tight mt-2">
                  82.350.000.000 <span className="font-label-md text-label-md text-on-surface-variant font-medium">VNĐ</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 font-body-sm text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">trending_up</span>
                  <span>Tăng 215% so với cùng kỳ trung thu 2024</span>
                </div>
              </div>

              <div className="rounded-xl bg-surface-container-low p-space-md shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Cọc Chờ Đối Soát Ngân Hàng</span>
                  <div className="w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">sync_problem</span>
                  </div>
                </div>
                <div className="font-headline-lg text-headline-lg text-secondary font-bold tracking-tight mt-2">
                  620.000.000 <span className="font-label-md text-label-md text-on-surface-variant font-medium">VNĐ</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 font-body-sm text-body-sm text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  <span>3 giao dịch KBNN &amp; Ủy Nhiệm Chi doanh nghiệp lớn</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl bg-surface-container-lowest shadow-sm">
              <table className="w-full text-left font-body-md text-body-md border-collapse">
                <thead>
                  <tr className="bg-surface-container-high/70 text-outline font-label-sm text-label-sm uppercase tracking-wider">
                    <th className="py-3 px-4 font-semibold">Mã GD Escrow</th>
                    <th className="py-3 px-4 font-semibold">Hợp Đồng / Đơn Hàng</th>
                    <th className="py-3 px-4 font-semibold">Khách Hàng (Bên Mua)</th>
                    <th className="py-3 px-4 font-semibold">Xưởng Thụ Hưởng</th>
                    <th className="py-3 px-4 font-semibold text-right">Số Tiền (VNĐ)</th>
                    <th className="py-3 px-4 font-semibold">Loại Giao Dịch</th>
                    <th className="py-3 px-4 font-semibold">Phương Thức</th>
                    <th className="py-3 px-4 font-semibold text-center">Trạng Thái</th>
                    <th className="py-3 px-4 font-semibold text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y-0 space-y-2">

                  <tr className="bg-surface-container-low/40 hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4 font-data-mono text-data-mono font-bold text-primary">
                      TX-ES-99410
                      <span className="block text-[11px] text-outline font-normal">10:45:12 • 28/08</span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="font-data-mono text-data-mono font-semibold text-on-surface hover:text-primary underline" >
                        HĐ-2025-00892
                      </button>
                      <div className="font-body-sm text-body-sm text-outline">ORD-B2B-8819</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-title-md text-body-md text-on-surface font-semibold">Tập Đoàn FPT Software</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant font-data-mono">MST: 0101248141</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-title-md text-body-md text-on-surface font-medium">Bánh Trung Thu Kinh Đô Mondelez</div>
                      <div className="font-body-sm text-body-sm text-tertiary">Xưởng Cấp 1 Verified</div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-headline-sm text-headline-sm text-tertiary font-bold">1.250.000.000</span>
                      <span className="font-body-sm text-body-sm text-outline block">50% Giá Trị HĐ</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-DEFAULT bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">
                        Thanh toán cọc M1
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface font-medium">
                        <span className="material-symbols-outlined text-[16px] text-primary">qr_code_2</span>
                        VietQR B2B Escrow
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-label-md text-label-md font-semibold">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                        Thành công
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="px-2.5 py-1 rounded-DEFAULT bg-surface-container-high text-on-surface hover:bg-surface-container-highest font-label-sm text-label-sm font-semibold" >
                        Chi tiết
                      </button>
                    </td>
                  </tr>

                  <tr className="bg-secondary-container/10 hover:bg-secondary-container/20 transition-colors">
                    <td className="py-3 px-4 font-data-mono text-data-mono font-bold text-secondary">
                      TX-ES-99388
                      <span className="block text-[11px] text-outline font-normal">08:12:05 • 28/08</span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="font-data-mono text-data-mono font-semibold text-on-surface hover:text-primary underline" >
                        HĐ-2025-00810
                      </button>
                      <div className="font-body-sm text-body-sm text-outline">ORD-B2B-7721</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-title-md text-body-md text-on-surface font-semibold">Công Ty Điện Lực EVN HCMC</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant font-data-mono">UNC Kho Bạc: UNC-77210</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-title-md text-body-md text-on-surface font-medium">Bánh Mứt Kẹo Hà Nội (Hanobake)</div>
                      <div className="font-body-sm text-body-sm text-tertiary">Xưởng Cấp 1 Verified</div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-headline-sm text-headline-sm text-secondary font-bold">420.000.000</span>
                      <span className="font-body-sm text-body-sm text-outline block">Giải ngân M2</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-DEFAULT bg-secondary-container/20 text-secondary font-label-sm text-label-sm font-bold">
                        Giải ngân M2
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface font-medium">
                        <span className="material-symbols-outlined text-[16px] text-secondary">account_balance</span>
                        Vietcombank UNC
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold animate-pulse">
                        <span className="material-symbols-outlined text-[14px]">hourglass_empty</span>
                        Chờ duyệt thủ công
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="px-2.5 py-1 rounded-DEFAULT bg-primary-container text-on-primary font-label-sm text-label-sm font-bold shadow-sm hover:opacity-90" >
                        Duyệt Khẩn
                      </button>
                    </td>
                  </tr>

                  <tr className="bg-surface-container-low/40 hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4 font-data-mono text-data-mono font-bold text-on-surface">
                      TX-ES-99201
                      <span className="block text-[11px] text-outline font-normal">16:30:19 • 27/08</span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="font-data-mono text-data-mono font-semibold text-on-surface hover:text-primary underline" >
                        HĐ-2025-00632
                      </button>
                      <div className="font-body-sm text-body-sm text-outline">ORD-B2B-6500</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-title-md text-body-md text-on-surface font-semibold">Tập Đoàn Công Nghệ CMC Corp</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant font-data-mono">MST: 0100244192</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-title-md text-body-md text-on-surface font-medium">Bánh Trung Thu Như Lan Gia Truyền</div>
                      <div className="font-body-sm text-body-sm text-tertiary">Xưởng Cấp 1 Verified</div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">890.000.000</span>
                      <span className="font-body-sm text-body-sm text-outline block">Tất toán 100% (M3)</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-DEFAULT bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">
                        Tất toán M3
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface font-medium">
                        <span className="material-symbols-outlined text-[16px] text-tertiary">swap_horiz</span>
                        Chuyển khoản định danh
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-label-md text-label-md font-semibold">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        Thành công
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="px-2.5 py-1 rounded-DEFAULT bg-surface-container-high text-on-surface hover:bg-surface-container-highest font-label-sm text-label-sm font-semibold" >
                        Chi tiết
                      </button>
                    </td>
                  </tr>

                  <tr className="bg-surface-container-low/40 hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4 font-data-mono text-data-mono font-bold text-error">
                      TX-ES-98902
                      <span className="block text-[11px] text-outline font-normal">14:02:11 • 26/08</span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="font-data-mono text-data-mono font-semibold text-on-surface hover:text-primary underline" >
                        HĐ-2025-00501
                      </button>
                      <div className="font-body-sm text-body-sm text-outline">ORD-B2B-5100</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-title-md text-body-md text-on-surface font-semibold">VietinBank Chi Nhánh 1</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant font-data-mono">MST: 0100111948</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-title-md text-body-md text-on-surface font-medium">Xưởng Bánh Đồng Khánh Bông Lúa</div>
                      <div className="font-body-sm text-body-sm text-error">Hủy do chậm tiến độ khuôn hộp</div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-headline-sm text-headline-sm text-error font-bold">180.000.000</span>
                      <span className="font-body-sm text-body-sm text-outline block">Hoàn 100% Cọc M1</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-DEFAULT bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                        Hoàn tiền hủy đơn
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface font-medium">
                        <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
                        MoMo B2B Corporate
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md font-semibold">
                        Đã hoàn tiền
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="px-2.5 py-1 rounded-DEFAULT bg-surface-container-high text-on-surface hover:bg-surface-container-highest font-label-sm text-label-sm font-semibold" >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-high flex flex-col md:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[28px]">account_balance</span>
                <div>
                  <div className="font-title-md text-title-md text-on-surface font-bold">Cổng Thanh Toán Tự Động VietQR PRO &amp; VCB Host-to-Host</div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Chu kỳ đối soát tự động diễn ra mỗi 15 phút. Tất cả tiền ký quỹ được bảo hiểm tại tài khoản phong tỏa số <code className="font-data-mono font-bold text-on-surface">VCB-9988-MOONMARKET-ESCROW</code>.</p>
                </div>
              </div>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-md text-label-md font-semibold shadow-sm shrink-0 transition-all" >
                <span className="material-symbols-outlined text-[18px]">table_view</span>
                Xuất Sổ Phụ Ký Quỹ (.XLSX)
              </button>
            </div>
          </section>
        </div>

        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm hidden flex justify-end transition-opacity" id="contractDrawer">
          <div className="w-full max-w-2xl bg-surface-container-lowest h-full shadow-2xl flex flex-col overflow-hidden">

            <div className="p-space-md bg-surface-container-low flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">description</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold" id="drawerContractCode">HĐ-2025-00892</span>
                    <span className="px-2 py-0.5 rounded-DEFAULT bg-tertiary-container text-on-tertiary font-label-sm text-label-sm font-bold">Hợp Đồng Hợp Lệ</span>
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">Chữ ký số VNPT-CA / Hiệu lực pháp lý điện tử Nghị định 52/2013</div>
                </div>
              </div>
              <button className="p-2 rounded-lg text-outline hover:bg-surface-container-high transition-colors" >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-space-lg space-y-space-md">

              <div className="grid grid-cols-2 gap-space-sm p-space-md rounded-xl bg-surface-container-low">
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase block font-semibold">Bên Mua (Doanh Nghiệp)</span>
                  <span className="font-title-md text-body-md text-on-surface font-bold block mt-0.5">Tập Đoàn FPT Software</span>
                  <span className="font-data-mono text-[12px] text-on-surface-variant">Đại diện: Nguyễn Thế Phương (CFO)</span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase block font-semibold">Bên Bán (Xưởng Bánh Cấp 1)</span>
                  <span className="font-title-md text-body-md text-on-surface font-bold block mt-0.5">Bánh Trung Thu Kinh Đô Mondelez</span>
                  <span className="font-data-mono text-[12px] text-on-surface-variant">Đại diện: Bùi Khánh Ly (GĐ Bán Hàng B2B)</span>
                </div>
                <div className="mt-2">
                  <span className="font-label-sm text-label-sm text-outline uppercase block font-semibold">Tổng Giá Trị Hợp Đồng</span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold block mt-0.5">2.500.000.000 VNĐ</span>
                  <span className="font-body-sm text-body-sm text-outline">Đã bao gồm VAT 8%</span>
                </div>
                <div className="mt-2">
                  <span className="font-label-sm text-label-sm text-outline uppercase block font-semibold">Điều Khoản Escrow Giải Ngân</span>
                  <span className="font-body-md text-body-md text-tertiary font-bold block mt-0.5">50% Cọc (M1) - 30% Xuất Xưởng (M2) - 20% Nghiệm Thu (M3)</span>
                </div>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low space-y-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-title-md text-title-md text-on-surface font-bold">Chi Tiết Sản Phẩm Ký Kết</span>
                  <span className="font-data-mono text-[12px] text-outline">1.200 Hộp Thượng Phẩm</span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-surface-container-lowest flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-surface-container-high overflow-hidden shrink-0">
                        <img className="w-full h-full object-cover" data-alt="Hộp quà bánh trung thu doanh nghiệp hoàng gia sang trọng thiết kế gỗ phủ nhung đỏ kim sa dập nổi logo doanh nghiệp tinh xảo đặt trên nền lụa vàng." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbMtQ-aTc26q2jurYpiwpLV3lWIbpceSQx7SCFp_5agiw6VNLcKcWNvB7sEkbx7qu-D8smT79V5HXpEyz1WokWmATcNwG4j0g3X_bA--vSEUiDj5Nmju1Ky69WDargqUQRkxvpLk4Ipx4rbnGo5W5qjrDZUNawfGj4Jrn3363tD3sDIsOQcsPfea32vF2PhErXlfLlpguVt0ArSiPJxbnGyO8NoSH1HGE5oS-zQwHMwMYHxvs1j0l_" />
                      </div>
                      <div>
                        <div className="font-title-md text-body-md text-on-surface font-semibold">Hộp 4 Bánh Thượng Hạng Khắc Laser Logo FPT</div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">Nhân Yến Sào Vi Cá 180g, Tôm Hùm Sốt XO, Hạt Sen Trà Xanh, Thập Cẩm Bát Bửu</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-data-mono text-data-mono font-bold text-on-surface">1.200 Hộp</div>
                      <div className="font-body-sm text-body-sm text-primary font-semibold">2.083.333 VNĐ / Hộp</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low space-y-2">
                <span className="font-title-md text-title-md text-on-surface font-bold block">Cam Kết Vận Chuyển &amp; Quy Chuẩn Nhiệt Độ</span>
                <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Xe vận chuyển bắt buộc có lốc lạnh chuyên dụng duy trì 22°C - 24.5°C toàn tuyến hành trình.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Giao trước ngày 10/08 âm lịch tại 3 điểm văn phòng: Cầu Giấy (Hà Nội), FPT Complex (Đà Nẵng), Khu CNC Quận 9 (TP.HCM).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Phạt 0.5% giá trị hợp đồng cho mỗi ngày chậm giao hàng không do sự cố thiên tai bất khả kháng.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-space-md bg-surface-container-low flex items-center justify-between shadow-sm">
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-md text-label-md font-semibold shadow-sm transition-all" >
                <span className="material-symbols-outlined text-[18px]">download</span>
                Tải Bản Gốc Đã Ký (.PDF)
              </button>
              <button className="px-5 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:opacity-90 shadow-sm transition-all" >
                Đóng Cửa Sổ
              </button>
            </div>
          </div>
        </div>

        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm hidden flex items-center justify-center p-4" id="podModal">
          <div className="w-full max-w-xl bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-space-md bg-surface-container-low flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Xác Thực PoD &amp; Metadata GPS Xe Lạnh</h3>
                  <span className="font-data-mono text-[12px] text-primary font-bold" id="podCodeHeader">MM-LOG-HN7709</span>
                </div>
              </div>
              <button className="p-1.5 rounded-lg text-outline hover:bg-surface-container-high transition-colors" >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-space-md space-y-space-md">

              <div className="rounded-xl overflow-hidden bg-surface-container-high relative">
                <img className="w-full h-64 object-cover" data-alt="Ảnh chụp thực tế biên bản bàn giao bánh trung thu có chữ ký tươi của thủ kho và dấu mộc đỏ, kèm tem niêm phong nhiệt độ xe lạnh 24 độ C còn nguyên vẹn." id="podImageElement" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhlHed2j1DzxYgvakgrI2hmIgu0m2HJD0s8ZVShXgLVo1FyEpHi21Afo_Wy6i3arkoimNDIS1nRnxAGBEi7pM7LQX8mtyjMW_6V-la5S0x_jFJxssSlF5-fGCsNdR1INcUgxWmzPUY3C0nWgxcvNZ8M9BRWgH5vwCjcuP9P62TM0Bv_7g3ZPlKJC0sPNCSWhohkmYePjdSxVWrOSaIlW8dUpgKbE4HiAxCKoQsD4TsCSEescqb4oYR" />
                <div className="absolute bottom-2 left-2 right-2 p-2.5 rounded-lg bg-surface/90 backdrop-blur-sm flex items-center justify-between text-on-surface shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-tertiary text-[18px]">satellite_alt</span>
                    <span className="font-data-mono text-[12px] font-semibold">GPS: 16.0544° N, 108.2022° E</span>
                  </div>
                  <span className="font-data-mono text-[11px] text-tertiary font-bold bg-tertiary-container/30 px-2 py-0.5 rounded-DEFAULT">Hash: SHA256-VALID</span>
                </div>
              </div>

              <div className="p-space-sm rounded-lg bg-surface-container-low space-y-1.5">
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="text-outline">Trạng thái ghi nhận:</span>
                  <span className="font-semibold text-on-surface" id="podStatusText">Đã giao thành công</span>
                </div>
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="text-outline">Nhiệt độ cảm biến thùng lạnh:</span>
                  <span className="font-data-mono font-bold text-tertiary">23.8°C (Ổn định suốt 48h)</span>
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant pt-1">
                  <strong className="text-on-surface">Ghi chú đối soát:</strong>
                  <p className="mt-0.5" id="podNoteText">Seal niêm phong số MM-SEAL-8891. Đại diện bên nhận đã ký xác nhận đủ 100% số lượng, không có bánh nào bị móp méo hay biến dạng do nhiệt độ.</p>
                </div>
              </div>
            </div>
            <div className="p-space-md bg-surface-container-low flex items-center justify-end gap-space-sm shadow-sm">
              <button className="px-4 py-2 rounded-lg bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors" >
                Đóng
              </button>
              <button className="px-4 py-2 rounded-lg bg-tertiary-container text-on-tertiary font-label-md text-label-md font-bold shadow-sm hover:opacity-95 transition-opacity" >
                Chấp Thuận PoD Hợp Lệ
              </button>
            </div>
          </div>
        </div>

        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm hidden flex items-center justify-center p-4" id="refundModal">
          <div className="w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-space-md bg-error-container text-on-error-container flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px]">gavel</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold">Xử Lý Hoàn Tiền Ví Escrow (Refund)</h3>
                  <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider">Thao tác tài chính nhạy cảm cấp HQ Ops</span>
                </div>
              </div>
              <button className="p-1 rounded-lg hover:bg-error/20 transition-colors" >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form className="p-space-lg space-y-space-md" id="refundForm" >
              <div className="p-3 rounded-lg bg-error-container/30 text-error flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">warning</span>
                <div className="font-body-sm text-body-sm leading-snug">
                  Cảnh báo: Hành động này sẽ hoàn trả tiền từ tài khoản ký quỹ Vietcombank về lại tài khoản doanh nghiệp mua hàng và giải phóng trách nhiệm hợp đồng. Yêu cầu 2 chữ ký số phê duyệt.
                </div>
              </div>
              <div className="space-y-space-sm">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">Mã Giao Dịch Escrow Cần Hoàn</label>
                  <input className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low font-data-mono text-data-mono text-on-surface focus:outline-none focus:ring-2 focus:ring-error shadow-sm" id="refundTxCode" type="text" value="TX-ES-98902" />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">Số Tiền Hoàn Trả (VNĐ)</label>
                  <input className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low font-data-mono text-headline-sm font-bold text-error focus:outline-none focus:ring-2 focus:ring-error shadow-sm" id="refundAmount" type="text" value="180.000.000" />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">Căn Cứ Pháp Lý &amp; Biên Bản Hủy Hợp Đồng</label>
                  <select className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-error shadow-sm">
                    <option value="supplier_default">Xưởng trễ hạn quá 7 ngày - Vi phạm điều 8.2 HĐ</option>
                    <option value="quality_failed">Bánh không đạt chuẩn kiểm định an toàn VSTP</option>
                    <option value="mutual_agreement">Hai bên đồng thuận chấm dứt trước ngày giao</option>
                    <option value="force_majeure">Sự cố thiên tai bất khả kháng</option>
                  </select>
                </div>

                <div className="pt-2 border-t-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-label-md text-primary font-bold">Mã Xác Thực OTP Admin (Google Authenticator / YubiKey)</label>
                    <span className="font-data-mono text-[11px] text-outline">Thời hạn: 30s</span>
                  </div>
                  <input className="w-full px-4 py-3 rounded-lg bg-surface-container-high text-center font-data-mono text-[22px] tracking-[0.5em] text-primary font-bold focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" maxLength="6" placeholder="• • • • • •" type="text" />
                  <span className="font-body-sm text-body-sm text-outline block">Nhập mã OTP 6 số từ thiết bị bảo mật của Quản trị viên Trần Minh Quân.</span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-space-sm pt-2">
                <button className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-highest transition-colors" type="button">
                  Hủy Bỏ
                </button>
                <button className="px-5 py-2.5 rounded-lg bg-error text-on-error font-label-md text-label-md font-bold shadow-sm hover:opacity-95 transition-opacity" type="submit">
                  Xác Nhận Ký Hoàn Tiền Escrow
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm hidden flex items-center justify-center p-4" id="manualModal">
          <div className="w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-space-md bg-secondary-container text-on-secondary-container flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px]">account_balance</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold">Xác Nhận Thủ Công Treo Lệnh Ngân Hàng</h3>
                  <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider">Đối soát B2B Kho Bạc &amp; Ủy Nhiệm Chi</span>
                </div>
              </div>
              <button className="p-1 rounded-lg hover:bg-black/10 transition-colors" >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-space-lg space-y-space-md">
              <div className="p-3 rounded-lg bg-secondary-container/20 text-on-surface flex items-start gap-2.5">
                <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">info</span>
                <p className="font-body-sm text-body-sm">
                  Áp dụng khi doanh nghiệp nhà nước hoặc tập đoàn chuyển khoản qua Kho Bạc Nhà Nước (KBNN) có độ trễ 24-48h nhưng đã gửi bản scan Ủy Nhiệm Chi (UNC) đóng mộc chuẩn.
                </p>
              </div>
              <div className="space-y-space-sm font-body-md text-body-md">
                <div className="p-3 rounded-lg bg-surface-container-low space-y-1">
                  <div className="flex justify-between">
                    <span className="text-outline">Mã giao dịch:</span>
                    <span className="font-data-mono font-bold text-primary" id="manualTxCode">TX-ES-99388</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">Khách hàng chuyển:</span>
                    <span className="font-semibold text-on-surface" id="manualBuyerName">EVN HCMC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">Số tiền xác nhận cọc:</span>
                    <span className="font-headline-sm font-bold text-secondary" id="manualAmount">420.000.000 VNĐ</span>
                  </div>
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">Mã Bút Toán Ngân Hàng Đối Chiếu</label>
                  <input className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low font-data-mono text-data-mono text-on-surface focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" type="text" value="VCB-REF-884920199" />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">Ghi Chú Kế Toán Trưởng</label>
                  <textarea className="w-full px-3.5 py-2 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" placeholder="Đã nhận ủy nhiệm chi đóng dấu mộc đỏ qua cổng văn phòng số..." rows="2">Đã đối chiếu khớp số tài khoản chuyên thu Vietcombank. Cho phép xưởng xuất kho sớm theo tiến độ.</textarea>
                </div>
              </div>
              <div className="flex items-center justify-end gap-space-sm pt-2">
                <button className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-highest transition-colors" type="button">
                  Hủy Bỏ
                </button>
                <button className="px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-sm hover:opacity-95 transition-opacity" type="button">
                  Xác Nhận Nạp Ký Quỹ Thành Công
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 right-6 z-50 pointer-events-none space-y-2" id="toastContainer"></div>
      </div>

      </main></div>
    </div>
  );
}
