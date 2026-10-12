
export default function ApprovePage({ onNavigate }) {
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest z-50 flex flex-col shadow-[0_1px_12px_rgba(0,0,0,0.06)] border-r border-outline-variant/30"><div className="h-20 px-space-md flex items-center gap-space-sm border-b border-outline-variant/20 bg-surface-container-low/40"><img alt="Logo biểu trưng thương hiệu sàn giao dịch B2B Bánh Trung Thu Mooncake Marketplace: biểu tượng vầng trăng rằm thanh lịch kết hợp hoa văn khuôn bánh truyền thống dập nổi vàng kim sang trọng trên nền đỏ trầm nhã nhặn.. Brand logo. - Primary color: #991b1b - Font: plusJakartaSans - Mode: light - Roundness: rounded-sm" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XeDH3ml-Oxy9w5fl0xKcYXZzLGzRPMBJAZpR8G80tab0cBtZrQ7_YfYflhLzmRN2uHc0sjIfX29rFpAto5mkXK_8CJNAc90yvMwH19nziuf_fMyXQbHwnnELW7O0Mtg7oUTPBeNuNccNI7sLjO5237vuzDzQnM78HYxZ3YuZpo2tjH0FZgBw7Woz7vXVCIGNjMsJ21mfCfp7P4n7MMkcw6U9YIFhCLwHrHNoPdUCq2mPD45CuedGPUF-0" /><div className="flex flex-col min-w-0 flex-1"><div className="flex items-center gap-space-xs"><span className="font-headline-sm text-headline-sm text-primary font-bold truncate leading-none">MoonMarket</span></div><div className="flex items-center gap-1.5 mt-1"><span className="inline-flex items-center px-1.5 py-0.5 rounded-DEFAULT bg-primary-container text-on-primary font-label-sm text-label-sm tracking-wider uppercase font-bold">Super Admin</span><span className="font-data-mono text-data-mono text-on-surface-variant text-[10px]">v4.2</span></div></div></div><div className="flex-1 overflow-y-auto px-space-sm py-space-md space-y-space-md"><nav className="space-y-space-md" data-active-classes="bg-primary-container text-on-primary font-title-md text-title-md shadow-[0_2px_8px_rgba(153,27,27,0.25)]"><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Tổng quan &amp; Điều hành</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="dashboard-tong-quan" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">grid_view</span><span className="font-body-md text-body-md">Dashboard Tổng quan</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#27</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="bao-cao-ai-analytics" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">insights</span><span className="font-body-md text-body-md">Báo cáo &amp; AI Analytics</span></div><span className="inline-flex items-center px-1.5 py-0.5 rounded-DEFAULT bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm font-bold">AI Live</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Duyệt &amp; Kiểm soát</div><div className="space-y-1"><a aria-current="page" className="flex items-center justify-between px-space-sm py-2 rounded-xl transition-all group bg-primary-container text-on-primary font-title-md text-title-md shadow-[0_2px_8px_rgba(153,27,27,0.25)]" data-path="duyet-nha-cung-cap" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">verified_user</span><span className="font-body-md text-body-md">Duyệt Nhà cung cấp</span></div><span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary-container text-on-primary font-data-mono text-data-mono font-bold text-[11px]">4</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="tranh-chap-khieu-nai" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">gavel</span><span className="font-body-md text-body-md">Tranh chấp &amp; Khiếu nại</span></div><span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-secondary-container text-on-secondary-container font-data-mono text-data-mono font-bold text-[11px]">2</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="kiem-duyet-noi-dung-review" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">rate_review</span><span className="font-body-md text-body-md">Kiểm duyệt Review</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#21</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Quản lý Thực thể</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="quan-ly-nguoi-dung" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">groups</span><span className="font-body-md text-body-md">Quản lý Người dùng</span></div><span className="font-data-mono text-data-mono text-on-surface-variant text-[11px]">B2B/B2C</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="quan-ly-gian-hang" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">storefront</span><span className="font-body-md text-body-md">Quản lý Gian hàng</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#3</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="danh-muc-template-shop" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">category</span><span className="font-body-md text-body-md">Danh mục &amp; Template</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#4</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Giao dịch &amp; Vận hành</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="dieu-phoi-giao-van" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">local_shipping</span><span className="font-body-md text-body-md">Điều phối Giao vận</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#19</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="so-giao-dich-vi-escrow" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">account_balance_wallet</span><span className="font-body-md text-body-md">Sổ GD &amp; Ví Escrow</span></div><span className="font-data-mono text-data-mono text-tertiary font-bold text-[11px]">Escrow</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="ho-so-tra-cuu-hop-dong" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">description</span><span className="font-body-md text-body-md">Đơn / RFQ / Hợp đồng</span></div><span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Hệ thống</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="cau-hinh-quy-tac-uy-tin" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">tune</span><span className="font-body-md text-body-md">Quy tắc &amp; Uy tín</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">RuleEngine</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="audit-log-nhat-ky-he-thong" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">receipt_long</span><span className="font-body-md text-body-md">Audit Log Hệ thống</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">SOC2</span></a></div></div></nav></div><div className="p-space-sm border-t border-outline-variant/20 bg-surface-container-low/60"><div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30"><div className="flex items-center gap-2.5 min-w-0"><div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm ring-2 ring-primary-container/20 shrink-0">TM</div><div className="min-w-0"><div className="font-title-md text-body-md text-on-surface font-semibold truncate leading-tight">Trần Minh Quân</div><div className="font-body-sm text-body-sm text-on-surface-variant truncate">Head of Operations</div></div></div><button className="p-1.5 rounded-lg text-outline hover:text-error hover:bg-error-container/40 transition-colors shrink-0" title="Đăng xuất an toàn" type="button"><span className="material-symbols-outlined text-[20px]">logout</span></button></div></div></aside><div className="pl-72"><header className="fixed top-0 left-72 right-0 h-20 bg-surface/90 backdrop-blur-xl z-40 border-b border-outline-variant/20 shadow-[0_1px_8px_rgba(0,0,0,0.03)]"><div className="h-20 w-full px-space-md flex items-center justify-between gap-space-md"><div className="flex-1 max-w-xl"><div className="relative flex items-center"><span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">search</span><input className="w-full pl-11 pr-20 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/40 font-body-md text-body-md text-on-surface placeholder:text-outline/70 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Tra cứu nhanh MST, Mã RFQ, Số HĐ, SKU, Người dùng, Gian hàng..." type="text" /><div className="absolute right-2.5 flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded-DEFAULT bg-surface-container text-outline font-data-mono text-[11px] font-semibold border border-outline-variant/30">Ctrl</kbd><kbd className="px-1.5 py-0.5 rounded-DEFAULT bg-surface-container text-outline font-data-mono text-[11px] font-semibold border border-outline-variant/30">K</kbd></div></div></div><div className="flex items-center gap-space-sm"><div className="hidden xl:flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30"><div className="flex items-center gap-1.5 pr-2.5 border-r border-outline-variant/20"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span className="font-data-mono text-data-mono text-on-surface font-semibold text-[12px]">B2B Core: 99.98%</span></div><div className="flex items-center gap-1 pl-1"><span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">Escrow Pool:</span><span className="font-data-mono text-data-mono text-primary font-bold text-[12px]">42.8 Tỷ VNĐ</span></div></div><div className="flex items-center bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30"><button className="px-2.5 py-1 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold tracking-wide" type="button">LIVE</button><button className="px-2.5 py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-semibold tracking-wide transition-colors" type="button">STAGING</button></div><button className="relative p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary-container transition-all group" title="Cảnh báo khẩn cấp" type="button"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] px-1 items-center justify-center rounded-full bg-error text-on-error font-data-mono text-[10px] font-bold ring-2 ring-surface">6</span></button><div className="flex items-center gap-2 pl-2 border-l border-outline-variant/20"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div className="hidden md:flex flex-col text-left"><span className="font-title-md text-label-md text-on-surface font-semibold leading-tight">HQ Ops Admin</span><span className="font-body-sm text-body-sm text-tertiary font-medium">Cấp 1 • Toàn quyền</span></div></div></div></div></header><main className="w-full pt-20 bg-surface px-space-md pb-space-xl"><div className="flex flex-col w-full space-y-space-md">

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-DEFAULT bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-wider font-bold">Hồ Sơ #2 / Audit ID #27</span>
              <span className="font-data-mono text-data-mono text-outline font-semibold">Tỉ lệ đạt chuẩn ISO/HACCP: 96.4%</span>
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Hàng Đợi Thẩm Định &amp; Phê Duyệt Hồ Sơ Nhà Cung Cấp</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Thẩm tra năng lực sản xuất, pháp lý vệ sinh an toàn thực phẩm và điều kiện kết nối sàn B2B MoonMarket 2025.</p>
          </div>

          <div className="flex flex-wrap items-center gap-space-xs bg-surface-container p-1 rounded-xl">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-lowest text-primary shadow-sm font-label-md text-label-md font-semibold transition-all" type="button">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              <span>Chờ Thẩm Định</span>
              <span className="px-1.5 py-0.2 rounded-DEFAULT bg-primary-container text-on-primary font-data-mono text-data-mono text-[11px] font-bold">4</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md text-label-md font-medium transition-all" type="button">
              <span className="material-symbols-outlined text-[16px] text-tertiary">verified</span>
              <span>Đã Phê Duyệt</span>
              <span className="px-1.5 py-0.2 rounded-DEFAULT bg-surface-container-highest text-on-surface-variant font-data-mono text-data-mono text-[11px]">158</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md text-label-md font-medium transition-all" type="button">
              <span className="material-symbols-outlined text-[16px] text-error">cancel</span>
              <span>Bị Từ Chối</span>
              <span className="px-1.5 py-0.2 rounded-DEFAULT bg-surface-container-highest text-on-surface-variant font-data-mono text-data-mono text-[11px]">12</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md text-label-md font-medium transition-all" type="button">
              <span className="material-symbols-outlined text-[16px] text-secondary">gavel</span>
              <span>Thu Hồi Giấy Phép</span>
              <span className="px-1.5 py-0.2 rounded-DEFAULT bg-surface-container-highest text-on-surface-variant font-data-mono text-data-mono text-[11px]">3</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm bg-surface-container-low p-space-sm rounded-xl">
          <div className="md:col-span-6 relative">
            <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-outline text-[20px]">search</span>
            <input className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" placeholder="Tìm theo Mã số thuế, Tên xưởng bánh, Người đại diện..." type="text" value="0108928371" />
          </div>
          <div className="md:col-span-3">
            <select className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary shadow-sm">
              <option>Tất cả Tỉnh/Thành phố (Hà Nội, TP.HCM...)</option>
              <option defaultValue>Hà Nội &amp; Vùng phụ cận</option>
              <option>TP. Hồ Chí Minh &amp; Miền Nam</option>
              <option>Đà Nẵng &amp; Miền Trung</option>
            </select>
          </div>
          <div className="md:col-span-3 flex items-center gap-2">
            <select className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary shadow-sm">
              <option>Quy mô: Mọi hạn mức</option>
              <option defaultValue>Quy mô lớn &gt; 50.000 hộp/vụ</option>
              <option>Xưởng nghệ nhân &lt; 20.000 hộp</option>
            </select>
            <button className="p-2 rounded-lg bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors shrink-0" title="Đặt lại bộ lọc" type="button">
              <span className="material-symbols-outlined text-[20px]">refresh</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">

          <div className="lg:col-span-4 space-y-space-sm">
            <div className="flex items-center justify-between px-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-bold">Hồ sơ tiếp nhận mới (4)</span>
              <span className="font-data-mono text-data-mono text-[11px] text-tertiary font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Sắp xếp: Thời gian nộp
              </span>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-md transition-all cursor-pointer relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex flex-col">
                  <span className="font-data-mono text-data-mono text-primary font-bold text-[11px]">MST: 0108928371</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">Xưởng Bánh Nghệ Nhân Thăng Long</h3>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Công ty Cổ phần Thực Phẩm Thăng Long</span>
                </div>
                <span className="px-2 py-0.5 rounded-DEFAULT bg-primary-container text-on-primary font-label-sm text-label-sm font-bold shrink-0">ĐANG CHỌN</span>
              </div>
              <div className="grid grid-cols-2 gap-2 my-space-sm p-2 rounded-lg bg-surface-container-low font-body-sm text-body-sm">
                <div>
                  <span className="text-outline block text-[11px]">Hạn mức mùa vụ:</span>
                  <span className="font-data-mono text-data-mono text-on-surface font-bold">80.000 Hộp</span>
                </div>
                <div>
                  <span className="text-outline block text-[11px]">Thời gian nộp:</span>
                  <span className="font-data-mono text-data-mono text-on-surface">Hôm nay, 09:30</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-DEFAULT bg-tertiary-container text-on-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">verified</span> ISO 22000
                  </span>
                  <span className="px-2 py-0.5 rounded-DEFAULT bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">Gia truyền B2B</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-bold flex items-center">
                  Chi tiết <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </span>
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer opacity-90 hover:opacity-100">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <span className="font-data-mono text-data-mono text-outline font-semibold text-[11px]">MST: 0319284751</span>
                  <h4 className="font-title-md text-title-md text-on-surface font-bold">HKD Bánh Trung Thu Gia Hảo</h4>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Quận 5, TP. Hồ Chí Minh</span>
                </div>
                <span className="px-2 py-0.5 rounded-DEFAULT bg-error-container text-on-error-container font-label-sm text-label-sm font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">warning</span> Thiếu HS
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-error bg-error-container/30 p-2 rounded-lg my-2">Cảnh báo: Thiếu chứng chỉ HACCP bản công chứng &amp; mẫu cam kết xuất hóa đơn điện tử.</p>
              <div className="flex items-center justify-between text-[11px] text-outline pt-1 font-data-mono">
                <span>Quy mô: 15.000 hộp</span>
                <span>Nộp: 22 giờ trước</span>
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer opacity-90 hover:opacity-100">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <span className="font-data-mono text-data-mono text-outline font-semibold text-[11px]">MST: 0300918234</span>
                  <h4 className="font-title-md text-title-md text-on-surface font-bold">Cty TNHH Bánh Ngọt Á Châu</h4>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">ABC Bakery B2B Wholesale Division</span>
                </div>
                <span className="px-2 py-0.5 rounded-DEFAULT bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">HỎA TỐC</span>
              </div>
              <div className="flex items-center gap-1.5 my-2">
                <span className="px-2 py-0.5 rounded-DEFAULT bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">Đầy đủ ISO 22000</span>
                <span className="px-2 py-0.5 rounded-DEFAULT bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">MOQ 500 hộp</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-outline pt-1 font-data-mono">
                <span>Đề xuất: 250.000 hộp/vụ</span>
                <span>Nộp: 1 ngày trước</span>
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer opacity-80 hover:opacity-100">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <span className="font-data-mono text-data-mono text-outline font-semibold text-[11px]">MST: 3702910394</span>
                  <h4 className="font-title-md text-title-md text-on-surface font-bold">Xưởng Bánh Đậu Xanh Hải Dương Quê Hương</h4>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Hải Dương • Chuyên nhân nhuyễn B2B</span>
                </div>
                <span className="px-2 py-0.5 rounded-DEFAULT bg-surface-container-high text-on-surface font-label-sm text-label-sm">Bước 1/3</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-outline pt-2 font-data-mono">
                <span>Quy mô: 40.000 hộp</span>
                <span>Nộp: 2 ngày trước</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-space-md">

            <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-md space-y-space-md">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-md">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-DEFAULT bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">check_circle</span> ĐÃ XÁC MINH CỔNG DVC QUỐC GIA
                    </span>
                    <span className="px-2 py-0.5 rounded-DEFAULT bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Đơn đăng ký: #AP-2025-0891</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-primary font-bold">Công ty Cổ phần Thực Phẩm Thăng Long</h2>
                  <p className="font-title-md text-title-md text-on-surface-variant font-medium">Thương hiệu đại diện: Xưởng Bánh Nghệ Nhân Thăng Long (Gia truyền từ 1954)</p>
                </div>
                <div className="flex md:flex-col items-end justify-between shrink-0 p-3 rounded-xl bg-surface-container-low text-right">
                  <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Công suất cam kết B2B</span>
                  <span className="font-headline-md text-headline-md text-primary font-bold">80.000 <span className="text-sm font-normal text-on-surface">hộp/mùa</span></span>
                  <span className="font-data-mono text-data-mono text-tertiary font-bold text-[11px]">Hạn mức Escrow: 10 Tỷ VNĐ</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm p-space-md rounded-xl bg-surface-container-low">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">Người đại diện pháp luật</span>
                  <span className="font-title-md text-title-md text-on-surface font-bold">Nguyễn Hoàng Long</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block">Chức vụ: Tổng Giám đốc</span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">Số Đăng ký kinh doanh / MST</span>
                  <span className="font-data-mono text-data-mono text-on-surface font-bold text-base">0108928371</span>
                  <span className="font-body-sm text-body-sm text-tertiary block">Cấp bởi: Sở KH&amp;ĐT Hà Nội (Lần 8)</span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">Địa chỉ nhà máy chính</span>
                  <span className="font-body-md text-body-md text-on-surface font-semibold">Lô CN4, KCN Quang Minh, Mê Linh, Hà Nội</span>
                  <span className="font-data-mono text-data-mono text-outline text-[11px] block">Diện tích: 4.800 m² sàn sạch</span>
                </div>
              </div>

              <div className="space-y-space-sm pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-title-md text-title-md text-on-surface font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">folder_open</span> Thư Viện Hồ Sơ Pháp Lý &amp; Kiểm Định ATTP
                  </h3>
                  <span className="font-label-sm text-label-sm text-tertiary font-semibold">4/4 Tài liệu tải lên hợp lệ</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">

                  <div className="p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-14 rounded-lg bg-surface-container-lowest flex flex-col items-center justify-center text-primary shadow-sm shrink-0">
                        <span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
                        <span className="font-data-mono text-[9px] font-bold">DKKD.PDF</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-title-md text-body-md font-bold text-on-surface truncate">Giấy chứng nhận ĐKKD &amp; Mã số thuế</h4>
                          <span className="material-symbols-outlined text-tertiary text-[16px]">verified</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant truncate">Bản số hóa có dấu mộc đỏ công chứng số 142/2024</p>
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded-DEFAULT bg-tertiary-fixed text-on-tertiary-fixed font-data-mono text-[10px] font-bold">
                          Khớp 100% Cổng DVC Quốc Gia
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between pt-2">
                      <span className="font-data-mono text-[11px] text-outline">1.8 MB • PDF</span>
                      <div className="flex items-center gap-1">
                        <button className="px-2.5 py-1 rounded bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary font-label-sm text-label-sm font-semibold transition-colors" type="button">Xem Bản To</button>
                        <button className="p-1 rounded bg-surface-container-lowest text-on-surface-variant hover:text-on-surface" title="Tải về" type="button"><span className="material-symbols-outlined text-[16px]">download</span></button>
                      </div>
                    </div>
                  </div>

                  <div className="p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-14 rounded-lg bg-surface-container-lowest flex flex-col items-center justify-center text-tertiary shadow-sm shrink-0">
                        <span className="material-symbols-outlined text-[24px]">verified_user</span>
                        <span className="font-data-mono text-[9px] font-bold">ATTP.PDF</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-title-md text-body-md font-bold text-on-surface truncate">Giấy chứng nhận ATTP số 582/2024</h4>
                          <span className="material-symbols-outlined text-tertiary text-[16px]">verified</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant truncate">Cơ sở đủ điều kiện sản xuất bánh nướng dẻo truyền thống</p>
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded-DEFAULT bg-surface-container-highest text-on-surface-variant font-data-mono text-[10px] font-bold">
                          Hiệu lực: Đến 18/08/2027
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between pt-2">
                      <span className="font-data-mono text-[11px] text-outline">2.4 MB • Chi Cục ATVSTP Hà Nội</span>
                      <div className="flex items-center gap-1">
                        <button className="px-2.5 py-1 rounded bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary font-label-sm text-label-sm font-semibold transition-colors" type="button">Xem Chi Tiết</button>
                        <button className="p-1 rounded bg-surface-container-lowest text-on-surface-variant hover:text-on-surface" type="button"><span className="material-symbols-outlined text-[16px]">download</span></button>
                      </div>
                    </div>
                  </div>

                  <div className="p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-14 rounded-lg bg-surface-container-lowest flex flex-col items-center justify-center text-secondary shadow-sm shrink-0">
                        <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
                        <span className="font-data-mono text-[9px] font-bold">ISO.PDF</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-title-md text-body-md font-bold text-on-surface truncate">Hệ thống Quản lý ISO 22000:2018</h4>
                          <span className="material-symbols-outlined text-tertiary text-[16px]">verified</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant truncate">Phạm vi: Chế biến bánh nướng thập cẩm và nhân lava</p>
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded-DEFAULT bg-tertiary-container text-on-tertiary font-data-mono text-[10px] font-bold">
                          Tổ chức cấp: QUACERT
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between pt-2">
                      <span className="font-data-mono text-[11px] text-outline">3.1 MB • Hiệu lực quốc tế</span>
                      <div className="flex items-center gap-1">
                        <button className="px-2.5 py-1 rounded bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary font-label-sm text-label-sm font-semibold transition-colors" type="button">Kiểm Tra Mã QR</button>
                        <button className="p-1 rounded bg-surface-container-lowest text-on-surface-variant hover:text-on-surface" type="button"><span className="material-symbols-outlined text-[16px]">download</span></button>
                      </div>
                    </div>
                  </div>

                  <div className="p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-14 rounded-lg bg-surface-container-lowest flex flex-col items-center justify-center text-primary-container shadow-sm shrink-0">
                        <span className="material-symbols-outlined text-[24px]">science</span>
                        <span className="font-data-mono text-[9px] font-bold">TEST.PDF</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-title-md text-body-md font-bold text-on-surface truncate">Phiếu kiểm nghiệm vi sinh lô xuất khẩu</h4>
                          <span className="material-symbols-outlined text-tertiary text-[16px]">verified</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant truncate">Chỉ số vi sinh E.coli, Coliform, Nấm mốc: Âm tính</p>
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded-DEFAULT bg-tertiary-fixed text-on-tertiary-fixed font-data-mono text-[10px] font-bold">
                          Viện Kiểm Nghiệm VSATTP Quốc Gia
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between pt-2">
                      <span className="font-data-mono text-[11px] text-outline">1.2 MB • Cấp ngày 10/08/2024</span>
                      <div className="flex items-center gap-1">
                        <button className="px-2.5 py-1 rounded bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary font-label-sm text-label-sm font-semibold transition-colors" type="button">Xem Báo Cáo</button>
                        <button className="p-1 rounded bg-surface-container-lowest text-on-surface-variant hover:text-on-surface" type="button"><span className="material-symbols-outlined text-[16px]">download</span></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-space-xs pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-bold">Hình ảnh thực địa nhà xưởng &amp; dây chuyền công nghệ (Thẩm tra thực tế)</span>
                  <span className="font-data-mono text-data-mono text-[11px] text-primary font-bold">3 Khu Vực Đã Thẩm Định</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
                  <div className="space-y-1">
                    <div className="h-28 rounded-lg overflow-hidden bg-surface-container relative shadow-sm">
                      <img className="w-full h-full object-cover" data-alt="Bên trong phân xưởng sản xuất bánh trung thu hiện đại quy mô công nghiệp với lò nướng băng chuyền tự động inox sáng bóng, khay bánh nướng vàng ruộm, công nhân mặc đồ bảo hộ phòng sạch tiêu chuẩn ISO 22000, ánh sáng nhà xưởng rõ nét." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHCIZz_VvC5AJTxCz6H6MB2EAhd4HbxXqvIvtwvvHYg26kf2CxM-wbqJBCYPrE6BdToyPJtHA_ljAjMTCGSPc3uU1ALEj0lhBGcoWMHBpQ4-OvX3RA1Yok_nkBSuyhCdTFzLz0wJhs9JiYfxqyEI2O8wmp43M9uWeanTXT6EEl524I5bcLdiezKOKhJ5A3LOlgTsz9h_5I8eZMjHGmlWsDNO6-Lnqev2vkOlBE8pckUurK4JXLMFRI" />
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-DEFAULT bg-inverse-surface/80 text-inverse-on-surface font-label-sm text-[10px]">Lò Nướng Băng Chuyền</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px] block">Dây chuyền nướng nhiệt đa tầng 1200 bánh/giờ</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-28 rounded-lg overflow-hidden bg-surface-container relative shadow-sm">
                      <img className="w-full h-full object-cover" data-alt="Khu vực phòng sạch đóng gói và dập khuôn logo bánh trung thu tự động, môi trường áp suất dương vô trùng, băng tải đóng màng hút chân không bảo vệ bánh dập nổi hoa văn tinh xảo." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIVZK8sSiExyLS3qTU0AGaSifU6j6YuaWzz-xIJf6tAUiAIwF6crXsiWJaBsO8nuwj8gCtY38jiPnl1drhh-N4yBt2oVBn_Op3VFHE4lJaH91lnfCOLwaaphCOc7YQKB6OrhWCKOMKJACWrYB517BSFiPIskSd8J4x3cbN0sKZNhQlrIIZt88kUNS0zkiX8MN61_1WW1eG9jf2Hx7HrXf0epOjnvj1ojEemky07_lmjmX3xddkYigF" />
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-DEFAULT bg-inverse-surface/80 text-inverse-on-surface font-label-sm text-[10px]">Phòng Sạch Đóng Gói</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px] block">Áp suất dương, màng tiệt trùng khí trơ</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-28 rounded-lg overflow-hidden bg-surface-container relative shadow-sm">
                      <img className="w-full h-full object-cover" data-alt="Kho lạnh công nghiệp bảo quản nguyên liệu làm bánh trung thu hạt sen, trứng muối và bột hảo hạng xếp ngay ngắn trên pallet gỗ chuyên dụng, hệ thống điều hòa kiểm soát nhiệt độ nghiêm ngặt." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDseUkSWGI9Z_PDwzLqshRIO8c2KdgD98293VehI-fZg3Q_Y-0ueyEN2wlB6AKqVaoMv6LWFEfjSXQoliGY5IZLU1aHLzDb2jk4hzfYphrfCp7vLVUXubN41nxll1orDNBf1fF26W3PxCve270Tm4FXfOpEDJ1M7lxo9GSSKbj0mwRwqR3JxTRhiPsNMmvz8ZNf9Qs_SV5SBJeURLXFqPIj9muFRqNTKOVbs58LDFeZ5VbsjBgqjt62" />
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-DEFAULT bg-inverse-surface/80 text-inverse-on-surface font-label-sm text-[10px]">Kho Lạnh Nguyên Liệu</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px] block">Bảo quản trứng muối &amp; hạt sen ở nhiệt độ 4-8°C</span>
                  </div>
                </div>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container space-y-space-sm">
                <div className="flex items-center justify-between">
                  <h4 className="font-title-md text-title-md text-on-surface font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">fact_check</span> Biên Bản Đánh Giá Của Thẩm Định Viên (Checklist Bắt Buộc)
                  </h4>
                  <span className="px-2 py-0.5 rounded-DEFAULT bg-surface-container-highest text-on-surface font-data-mono text-data-mono text-[11px] font-bold">4/4 Đạt Yêu Cầu</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm pt-1">
                  <label className="flex items-start gap-2.5 p-2 rounded-lg bg-surface-container-lowest cursor-pointer hover:bg-surface-container-low transition-colors">
                    <input defaultChecked className="mt-1 accent-primary w-4 h-4 rounded" type="checkbox" />
                    <div className="min-w-0">
                      <span className="font-body-md text-body-md font-semibold text-on-surface block">Mã số thuế &amp; Pháp nhân thực tế</span>
                      <span className="font-body-sm text-body-sm text-outline">Đã tra cứu Cổng thuế, không nợ thuế quá 90 ngày.</span>
                    </div>
                  </label>
                  <label className="flex items-start gap-2.5 p-2 rounded-lg bg-surface-container-lowest cursor-pointer hover:bg-surface-container-low transition-colors">
                    <input defaultChecked className="mt-1 accent-primary w-4 h-4 rounded" type="checkbox" />
                    <div className="min-w-0">
                      <span className="font-body-md text-body-md font-semibold text-on-surface block">Chứng chỉ VSATTP / ISO còn hạn &gt; 12 tháng</span>
                      <span className="font-body-sm text-body-sm text-outline">Đã xác minh tem QR Quacert cấp đến 2027.</span>
                    </div>
                  </label>
                  <label className="flex items-start gap-2.5 p-2 rounded-lg bg-surface-container-lowest cursor-pointer hover:bg-surface-container-low transition-colors">
                    <input defaultChecked className="mt-1 accent-primary w-4 h-4 rounded" type="checkbox" />
                    <div className="min-w-0">
                      <span className="font-body-md text-body-md font-semibold text-on-surface block">Năng lực cung ứng tối thiểu &gt; 20.000 hộp</span>
                      <span className="font-body-sm text-body-sm text-outline">Dây chuyền đáp ứng đơn hàng B2B dồn dập rằm tháng 8.</span>
                    </div>
                  </label>
                  <label className="flex items-start gap-2.5 p-2 rounded-lg bg-surface-container-lowest cursor-pointer hover:bg-surface-container-low transition-colors">
                    <input defaultChecked className="mt-1 accent-primary w-4 h-4 rounded" type="checkbox" />
                    <div className="min-w-0">
                      <span className="font-body-md text-body-md font-semibold text-on-surface block">Ký quỹ Đảm bảo Giao dịch Escrow MoonMarket</span>
                      <span className="font-body-sm text-body-sm text-outline">Đã nộp quỹ bảo chứng 200.000.000 VNĐ vào tài khoản phong tỏa.</span>
                    </div>
                  </label>
                </div>

                <div className="pt-2">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-1">Ghi chú biên bản thẩm định nội bộ (Lưu vết vĩnh viễn):</label>
                  <textarea className="w-full p-2.5 rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" placeholder="Nhập nhận định nghiệp vụ, đánh giá độ rủi ro, các cam kết đặc thù của xưởng bánh..." rows="2">Hồ sơ hoàn hảo, đã có kinh nghiệm gia công bánh quà tặng cho khối Ngân hàng và Tập đoàn viễn thông vụ Trung thu năm ngoái. Đủ tiêu chuẩn gắn huy hiệu Verified Supplier Top-Tier và mở phân hệ nhận thầu RFQ theo hợp đồng khung.</textarea>
                </div>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2.5 rounded-lg bg-surface-container-lowest text-error hover:bg-error-container hover:text-on-error-container font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5 shadow-sm" type="button">
                    <span className="material-symbols-outlined text-[18px]">cancel</span> Từ Chối Hồ Sơ
                  </button>
                  <button className="px-4 py-2.5 rounded-lg bg-surface-container-lowest text-secondary hover:bg-secondary-container hover:text-on-secondary-container font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5 shadow-sm" type="button">
                    <span className="material-symbols-outlined text-[18px]">edit_document</span> Yêu Cầu Bổ Sung
                  </button>
                  <button className="px-3 py-2.5 rounded-lg text-outline hover:text-error transition-colors" title="Thu hồi xác minh đối với tài khoản cũ vi phạm" type="button">
                    <span className="material-symbols-outlined text-[20px]">block</span>
                  </button>
                </div>

                <button className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-title-md text-title-md font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2" type="button">
                  <span className="material-symbols-outlined text-[20px]">verified</span> Phê Duyệt &amp; Cấp Huy Hiệu Verified Supplier
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm space-y-space-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b-0 pb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-outline">history</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Lịch Sử Thao Tác &amp; Audit Trail Thẩm Tra (SOC2 Log)</h3>
            </div>
            <span className="font-data-mono text-data-mono text-outline text-[12px]">Hệ thống ghi nhận bất biến • Giờ chuẩn UTC+7</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-body-sm">
              <thead>
                <tr className="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase tracking-wider">
                  <th className="py-2.5 px-3 rounded-l-lg">Thời Gian</th>
                  <th className="py-2.5 px-3">Thẩm Định Viên</th>
                  <th className="py-2.5 px-3">Đối Tượng / MST</th>
                  <th className="py-2.5 px-3">Hành Động Nghiệp Vụ</th>
                  <th className="py-2.5 px-3">Chi Tiết Biên Bản</th>
                  <th className="py-2.5 px-3 rounded-r-lg text-right">Mã Hash Báo Cáo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-transparent">
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-2.5 px-3 font-data-mono text-on-surface">11:05 - Hôm nay</td>
                  <td className="py-2.5 px-3 font-medium text-on-surface flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary text-[10px] flex items-center justify-center font-bold">TM</span>
                    Trần Minh Quân (HQ Ops)
                  </td>
                  <td className="py-2.5 px-3 font-data-mono text-primary font-semibold">0108928371</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-DEFAULT bg-tertiary-fixed text-on-tertiary-fixed font-data-mono text-[11px] font-bold">VERIFY_DVC_MATCH</span>
                  </td>
                  <td className="py-2.5 px-3 text-on-surface-variant">Tra cứu tự động thành công dữ liệu Cổng Dịch vụ công Quốc gia</td>
                  <td className="py-2.5 px-3 font-data-mono text-outline text-right text-[11px]">#0x8f2a...c19</td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-2.5 px-3 font-data-mono text-on-surface">09:42 - Hôm nay</td>
                  <td className="py-2.5 px-3 font-medium text-on-surface flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary text-[10px] flex items-center justify-center font-bold">LN</span>
                    Lê Thùy Nga (Legal Lead)
                  </td>
                  <td className="py-2.5 px-3 font-data-mono text-outline font-semibold">0319284751</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-DEFAULT bg-error-container text-on-error-container font-data-mono text-[11px] font-bold">REQUEST_DOC_ADD</span>
                  </td>
                  <td className="py-2.5 px-3 text-on-surface-variant">Yêu cầu bổ sung chứng chỉ HACCP có công chứng trước 18:00 ngày mai</td>
                  <td className="py-2.5 px-3 font-data-mono text-outline text-right text-[11px]">#0x3b1c...99a</td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-2.5 px-3 font-data-mono text-on-surface">17:15 - Hôm qua</td>
                  <td className="py-2.5 px-3 font-medium text-on-surface flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-surface-container-highest text-on-surface text-[10px] flex items-center justify-center font-bold">AI</span>
                    MoonMarket Bot OCR
                  </td>
                  <td className="py-2.5 px-3 font-data-mono text-outline font-semibold">0300918234</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-DEFAULT bg-surface-container-highest text-on-surface font-data-mono text-[11px] font-bold">OCR_AUTO_PARSE</span>
                  </td>
                  <td className="py-2.5 px-3 text-on-surface-variant">Trích xuất thành công 4 văn bằng ISO, tỉ lệ chính xác trường dữ liệu 99.2%</td>
                  <td className="py-2.5 px-3 font-data-mono text-outline text-right text-[11px]">#0x9d4e...e21</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="hidden fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 backdrop-blur-sm p-4" id="rejectModal">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-xl shadow-xl p-space-md space-y-space-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-error">
                <span className="material-symbols-outlined text-[24px]">gavel</span>
                <h3 className="font-headline-sm text-headline-sm font-bold">Từ Chối Phê Duyệt Nhà Cung Cấp</h3>
              </div>
              <button className="p-1 rounded-lg text-outline hover:text-on-surface" type="button">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Hành động này sẽ gửi thư thông báo chính thức có chữ ký số của MoonMarket B2B Hub đến doanh nghiệp và khóa tạm thời quyền mở shop trong 30 ngày.
            </p>
            <div className="space-y-2">
              <label className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">Chọn Lý Do Từ Chối Bắt Buộc:</label>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container">
                  <input defaultChecked className="accent-primary" name="rejectReason" type="radio" />
                  <span className="font-body-md text-body-md text-on-surface">Sai lệch thông tin đăng ký kinh doanh với dữ liệu Thuế quốc gia</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container">
                  <input className="accent-primary" name="rejectReason" type="radio" />
                  <span className="font-body-md text-body-md text-on-surface">Giấy chứng nhận VSATTP hoặc ISO đã hết hạn / Bị đình chỉ hiệu lực</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container">
                  <input className="accent-primary" name="rejectReason" type="radio" />
                  <span className="font-body-md text-body-md text-on-surface">Thiếu kết quả kiểm nghiệm vi sinh lô sản xuất độc lập từ viện đo lường</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container">
                  <input className="accent-primary" name="rejectReason" type="radio" />
                  <span className="font-body-md text-body-md text-on-surface">Cơ sở vật chất nhà xưởng không đáp ứng quy chuẩn phòng sạch đóng gói</span>
                </label>
              </div>
            </div>
            <div>
              <label className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-1">Tin nhắn hướng dẫn khắc phục gửi xưởng:</label>
              <textarea className="w-full p-2.5 rounded-lg bg-surface-container font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Nhập yêu cầu chi tiết để doanh nghiệp có cơ sở hoàn thiện và nộp lại hồ sơ..." rows="2"></textarea>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button className="px-4 py-2 rounded-lg bg-surface-container text-on-surface-variant font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors" type="button">
                Hủy Bỏ
              </button>
              <button className="px-4 py-2 rounded-lg bg-error hover:bg-on-error-container text-on-error font-label-md text-label-md font-bold transition-all shadow-sm" type="button">
                Xác Nhận &amp; Gửi Email Từ Chối
              </button>
            </div>
          </div>
        </div>

        <div className="hidden fixed bottom-6 right-6 z-50 max-w-md bg-surface-container-lowest p-space-md rounded-xl shadow-xl flex items-start gap-3" id="successToast">
          <div className="w-10 h-10 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">check</span>
          </div>
          <div className="space-y-1">
            <h4 className="font-title-md text-title-md font-bold text-on-surface">Đã Phê Duyệt Thành Công!</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Xưởng Bánh Nghệ Nhân Thăng Long đã được cấp huy hiệu <strong>Verified Supplier</strong>, tự động mở gian hàng B2B và mở hạn mức Escrow 10 Tỷ VNĐ.</p>
          </div>
          <button className="text-outline hover:text-on-surface p-1" type="button">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      </div></main></div>
    </div>
  );
}
