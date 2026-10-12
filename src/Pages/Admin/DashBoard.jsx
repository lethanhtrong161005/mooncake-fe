
export default function DashBoard({ onNavigate }) {
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest z-50 flex flex-col shadow-[0_1px_12px_rgba(0,0,0,0.06)] border-r border-outline-variant/30"><div className="h-20 px-space-md flex items-center gap-space-sm border-b border-outline-variant/20 bg-surface-container-low/40"><img alt="Logo biểu trưng thương hiệu sàn giao dịch B2B Bánh Trung Thu Mooncake Marketplace: biểu tượng vầng trăng rằm thanh lịch kết hợp hoa văn khuôn bánh truyền thống dập nổi vàng kim sang trọng trên nền đỏ trầm nhã nhặn.. Brand logo. - Primary color: #991b1b - Font: plusJakartaSans - Mode: light - Roundness: rounded-sm" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XeDH3ml-Oxy9w5fl0xKcYXZzLGzRPMBJAZpR8G80tab0cBtZrQ7_YfYflhLzmRN2uHc0sjIfX29rFpAto5mkXK_8CJNAc90yvMwH19nziuf_fMyXQbHwnnELW7O0Mtg7oUTPBeNuNccNI7sLjO5237vuzDzQnM78HYxZ3YuZpo2tjH0FZgBw7Woz7vXVCIGNjMsJ21mfCfp7P4n7MMkcw6U9YIFhCLwHrHNoPdUCq2mPD45CuedGPUF-0" /><div className="flex flex-col min-w-0 flex-1"><div className="flex items-center gap-space-xs"><span className="font-headline-sm text-headline-sm text-primary font-bold truncate leading-none">MoonMarket</span></div><div className="flex items-center gap-1.5 mt-1"><span className="inline-flex items-center px-1.5 py-0.5 rounded-DEFAULT bg-primary-container text-on-primary font-label-sm text-label-sm tracking-wider uppercase font-bold">Super Admin</span><span className="font-data-mono text-data-mono text-on-surface-variant text-[10px]">v4.2</span></div></div></div><div className="flex-1 overflow-y-auto px-space-sm py-space-md space-y-space-md"><nav className="space-y-space-md" data-active-classes="bg-primary-container text-on-primary font-title-md text-title-md shadow-[0_2px_8px_rgba(153,27,27,0.25)]"><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Tổng quan &amp; Điều hành</div><div className="space-y-1"><a aria-current="page" className="flex items-center justify-between px-space-sm py-2 rounded-xl transition-all group bg-primary-container text-on-primary font-title-md text-title-md shadow-[0_2px_8px_rgba(153,27,27,0.25)]" data-path="dashboard-tong-quan" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">grid_view</span><span className="font-body-md text-body-md">Dashboard Tổng quan</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#27</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="bao-cao-ai-analytics" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">insights</span><span className="font-body-md text-body-md">Báo cáo &amp; AI Analytics</span></div><span className="inline-flex items-center px-1.5 py-0.5 rounded-DEFAULT bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm font-bold">AI Live</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Duyệt &amp; Kiểm soát</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="duyet-nha-cung-cap" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">verified_user</span><span className="font-body-md text-body-md">Duyệt Nhà cung cấp</span></div><span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary-container text-on-primary font-data-mono text-data-mono font-bold text-[11px]">4</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="tranh-chap-khieu-nai" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">gavel</span><span className="font-body-md text-body-md">Tranh chấp &amp; Khiếu nại</span></div><span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-secondary-container text-on-secondary-container font-data-mono text-data-mono font-bold text-[11px]">2</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="kiem-duyet-noi-dung-review" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">rate_review</span><span className="font-body-md text-body-md">Kiểm duyệt Review</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#21</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Quản lý Thực thể</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="quan-ly-nguoi-dung" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">groups</span><span className="font-body-md text-body-md">Quản lý Người dùng</span></div><span className="font-data-mono text-data-mono text-on-surface-variant text-[11px]">B2B/B2C</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="quan-ly-gian-hang" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">storefront</span><span className="font-body-md text-body-md">Quản lý Gian hàng</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#3</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="danh-muc-template-shop" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">category</span><span className="font-body-md text-body-md">Danh mục &amp; Template</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#4</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Giao dịch &amp; Vận hành</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="dieu-phoi-giao-van" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">local_shipping</span><span className="font-body-md text-body-md">Điều phối Giao vận</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">#19</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="so-giao-dich-vi-escrow" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">account_balance_wallet</span><span className="font-body-md text-body-md">Sổ GD &amp; Ví Escrow</span></div><span className="font-data-mono text-data-mono text-tertiary font-bold text-[11px]">Escrow</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="ho-so-tra-cuu-hop-dong" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">description</span><span className="font-body-md text-body-md">Đơn / RFQ / Hợp đồng</span></div><span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span></a></div></div><div className="space-y-space-xs"><div className="px-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Hệ thống</div><div className="space-y-1"><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="cau-hinh-quy-tac-uy-tin" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">tune</span><span className="font-body-md text-body-md">Quy tắc &amp; Uy tín</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">RuleEngine</span></a><a className="flex items-center justify-between px-space-sm py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group" data-path="audit-log-nhat-ky-he-thong" href="#"><div className="flex items-center gap-space-sm"><span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">receipt_long</span><span className="font-body-md text-body-md">Audit Log Hệ thống</span></div><span className="font-data-mono text-data-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-DEFAULT text-[11px]">SOC2</span></a></div></div></nav></div><div className="p-space-sm border-t border-outline-variant/20 bg-surface-container-low/60"><div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30"><div className="flex items-center gap-2.5 min-w-0"><div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm ring-2 ring-primary-container/20 shrink-0">TM</div><div className="min-w-0"><div className="font-title-md text-body-md text-on-surface font-semibold truncate leading-tight">Trần Minh Quân</div><div className="font-body-sm text-body-sm text-on-surface-variant truncate">Head of Operations</div></div></div><button className="p-1.5 rounded-lg text-outline hover:text-error hover:bg-error-container/40 transition-colors shrink-0" title="Đăng xuất an toàn" type="button"><span className="material-symbols-outlined text-[20px]">logout</span></button></div></div></aside><div className="pl-72"><header className="fixed top-0 left-72 right-0 h-20 bg-surface/90 backdrop-blur-xl z-40 border-b border-outline-variant/20 shadow-[0_1px_8px_rgba(0,0,0,0.03)]"><div className="h-20 w-full px-space-md flex items-center justify-between gap-space-md"><div className="flex-1 max-w-xl"><div className="relative flex items-center"><span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">search</span><input className="w-full pl-11 pr-20 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/40 font-body-md text-body-md text-on-surface placeholder:text-outline/70 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Tra cứu nhanh MST, Mã RFQ, Số HĐ, SKU, Người dùng, Gian hàng..." type="text" /><div className="absolute right-2.5 flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded-DEFAULT bg-surface-container text-outline font-data-mono text-[11px] font-semibold border border-outline-variant/30">Ctrl</kbd><kbd className="px-1.5 py-0.5 rounded-DEFAULT bg-surface-container text-outline font-data-mono text-[11px] font-semibold border border-outline-variant/30">K</kbd></div></div></div><div className="flex items-center gap-space-sm"><div className="hidden xl:flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30"><div className="flex items-center gap-1.5 pr-2.5 border-r border-outline-variant/20"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span className="font-data-mono text-data-mono text-on-surface font-semibold text-[12px]">B2B Core: 99.98%</span></div><div className="flex items-center gap-1 pl-1"><span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">Escrow Pool:</span><span className="font-data-mono text-data-mono text-primary font-bold text-[12px]">42.8 Tỷ VNĐ</span></div></div><div className="flex items-center bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30"><button className="px-2.5 py-1 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold tracking-wide" type="button">LIVE</button><button className="px-2.5 py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-semibold tracking-wide transition-colors" type="button">STAGING</button></div><button className="relative p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary-container transition-all group" title="Cảnh báo khẩn cấp" type="button"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] px-1 items-center justify-center rounded-full bg-error text-on-error font-data-mono text-[10px] font-bold ring-2 ring-surface">6</span></button><div className="flex items-center gap-2 pl-2 border-l border-outline-variant/20"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div className="hidden md:flex flex-col text-left"><span className="font-title-md text-label-md text-on-surface font-semibold leading-tight">HQ Ops Admin</span><span className="font-body-sm text-body-sm text-tertiary font-medium">Cấp 1 • Toàn quyền</span></div></div></div></div></header><main className="w-full pt-20 bg-surface px-space-md pb-space-xl"><div className="flex flex-col w-full">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md py-space-md">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm uppercase font-bold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                Trung Tâm Chỉ Huy HQ • Live Engine
              </span>
              <span className="font-data-mono text-data-mono text-outline font-medium">Bản ghi #27-#24-#28</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
              Dashboard Điều Hành Toàn Nền Tảng <span className="text-primary font-serif">— Mùa Vụ Trung Thu 2025</span>
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              Hệ thống giám sát bảo chứng giao dịch Escrow, thẩm định năng lực chuỗi cung ứng xưởng bánh truyền thống và dòng chảy hợp đồng B2B số toàn quốc.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container-lowest shadow-sm">
              <span className="material-symbols-outlined text-secondary text-[20px]">calendar_month</span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline">Kỳ chiến dịch</span>
                <span className="font-title-md text-title-md text-on-surface font-bold">Mùa Vụ 2025 (15/07 - Rằm T8)</span>
              </div>
              <span className="material-symbols-outlined text-outline text-[18px]">expand_more</span>
            </div>
            <button className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all shadow-sm" type="button">
              <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
              <span className="font-label-md text-label-md font-semibold">Xuất PDF BĐH</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all shadow-md" type="button">
              <span className="material-symbols-outlined text-[20px]" style={{ "fontVariationSettings": "'FILL' 1" }}>auto_awesome</span>
              <span className="font-label-md text-label-md font-bold">Tạo Báo Cáo AI Tức Thì</span>
            </button>
          </div>
        </div>

        <div className="mt-space-md grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-sm">

          <div className="relative overflow-hidden p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between gap-space-xs">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary font-bold">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                </div>
                <div>
                  <div className="font-title-md text-title-md text-on-surface font-bold">Hồ sơ NCC Chờ Duyệt</div>
                  <div className="font-body-sm text-body-sm text-error font-semibold">Cần xử lý trong 24h</div>
                </div>
              </div>
              <span className="font-data-mono text-headline-sm text-primary font-extrabold leading-none">04</span>
            </div>
            <p className="mt-3 font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              4 xưởng bánh mới tải chứng thư ISO 22000 &amp; GPKD thực phẩm cần đối chiếu dữ liệu cục ATTP.
            </p>
            <div className="mt-4 flex items-center justify-between pt-2">
              <span className="font-label-sm text-label-sm uppercase font-semibold text-outline">Quy chuẩn SLA 24h</span>
              <button className="px-2.5 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold hover:bg-primary-container transition-colors" type="button">
                Xử lý ngay →
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between gap-space-xs">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-error-container flex items-center justify-center text-error font-bold">
                  <span className="material-symbols-outlined text-[20px]">gavel</span>
                </div>
                <div>
                  <div className="font-title-md text-title-md text-on-surface font-bold">Tranh Chấp HĐ &amp; Escrow</div>
                  <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-error text-on-error font-label-sm text-[10px] font-bold uppercase">Khẩn cấp</span>
                </div>
              </div>
              <span className="font-data-mono text-headline-sm text-error font-extrabold leading-none">02</span>
            </div>
            <p className="mt-3 font-body-sm text-body-sm text-on-surface-variant">
              1 vụ vi phạm mốc giao hàng HĐ #MC-7702, 1 khiếu nại chất lượng quy cách vỏ hộp sơn mài.
            </p>
            <div className="mt-4 flex items-center justify-between pt-2">
              <span className="font-data-mono text-data-mono text-error font-bold">Đóng băng 1.25 Tỷ</span>
              <button className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold hover:opacity-90" type="button">
                Phân xử
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between gap-space-xs">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary font-bold">
                  <span className="material-symbols-outlined text-[20px]">flip_camera_ios</span>
                </div>
                <div>
                  <div className="font-title-md text-title-md text-on-surface font-bold">Vi Phạm Nội Dung / Review</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">Cảnh báo Spam &amp; Bản quyền</div>
                </div>
              </div>
              <span className="font-data-mono text-headline-sm text-secondary font-extrabold leading-none">05</span>
            </div>
            <p className="mt-3 font-body-sm text-body-sm text-on-surface-variant">
              5 đánh giá có dấu hiệu cạnh tranh không lành mạnh và ảnh bao bì vi phạm nhãn hiệu đối thủ.
            </p>
            <div className="mt-4 flex items-center justify-between pt-2">
              <span className="font-label-sm text-label-sm text-outline">Kiểm duyệt AI 80%</span>
              <button className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container-highest" type="button">
                Rà soát
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between gap-space-xs">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary font-bold">
                  <span className="material-symbols-outlined text-[20px]">account_balance</span>
                </div>
                <div>
                  <div className="font-title-md text-title-md text-on-surface font-bold">Đối Soát Cọc Lớn (&gt;200M)</div>
                  <div className="font-body-sm text-body-sm text-tertiary font-semibold">Chờ kế toán chuẩn y</div>
                </div>
              </div>
              <span className="font-data-mono text-headline-sm text-tertiary font-extrabold leading-none">03</span>
            </div>
            <p className="mt-3 font-body-sm text-body-sm text-on-surface-variant">
              3 UNC doanh nghiệp chuyển tiền cọc đợt 1 vào tài khoản Escrow Vietcombank chưa gán auto.
            </p>
            <div className="mt-4 flex items-center justify-between pt-2">
              <span className="font-data-mono text-data-mono text-tertiary font-bold">Tổng: 840 Triệu</span>
              <button className="px-2.5 py-1 rounded bg-tertiary text-on-tertiary font-label-sm text-label-sm font-bold hover:bg-tertiary-container" type="button">
                Khớp lệnh
              </button>
            </div>
          </div>
        </div>

        <div className="mt-space-lg relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-container via-primary to-inverse-surface p-space-lg text-on-primary shadow-lg">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg">
            <div className="flex items-start gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-on-primary/10 backdrop-blur-md flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary-fixed text-[28px]" style={{ "fontVariationSettings": "'FILL' 1" }}>psychology</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase font-extrabold tracking-wider">
                    ✨ AI Analytics Insight #24
                  </span>
                  <span className="font-data-mono text-data-mono text-on-primary-container text-xs">Mô hình Dự Báo Cầu Mùa Cao Điểm v3.8</span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-primary font-bold">
                  Khuyến Nghị Điều Hành: Nhu Cầu Bánh Bào Ngư Vi Cá &amp; Hộp Gỗ Sơn Mài Tăng Đột Biến +42%
                </h2>
                <p className="font-body-md text-body-md text-surface-container-high/90 max-w-4xl">
                  Tuần cận kề rằm ghi nhận 142 RFQ từ các Tập đoàn Tài chính &amp; Bất động sản yêu cầu dòng sản phẩm thượng phẩm.
                  <span className="text-secondary-fixed font-semibold">Khuyến nghị Ban Giám Đốc:</span> Mở rộng trần bảo chứng lưu kho trung tâm Hà Nội &amp; TP.HCM thêm 2.000m², kích hoạt cơ chế ưu tiên điều phối 15 xe tải lạnh chuyên dụng tránh gián đoạn chuỗi cung ứng cao điểm từ 22/07 - 05/08 Âm lịch.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-sm shrink-0 self-end lg:self-center">
              <button className="px-4 py-2.5 rounded-lg bg-surface-container-lowest text-primary font-title-md text-title-md font-bold shadow-md hover:bg-surface-container-low transition-all" type="button">
                Kích Hoạt Điều Phối Xe Lạnh
              </button>
              <button className="p-2.5 rounded-lg bg-on-primary/10 hover:bg-on-primary/20 text-on-primary transition-colors" type="button">
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-space-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">

          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase font-bold text-outline">Tổng GMV Toàn Sàn</span>
                <span className="inline-flex items-center gap-0.5 text-tertiary font-data-mono text-data-mono font-bold">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  +34.2% YoY
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg font-black text-primary tracking-tight">128.6</span>
                <span className="font-title-md text-title-md font-bold text-on-surface-variant">Tỷ VNĐ</span>
              </div>

              <div className="mt-3 h-8 w-full flex items-end gap-1">
                <div className="flex-1 bg-primary/20 rounded-t h-[40%]"></div>
                <div className="flex-1 bg-primary/20 rounded-t h-[55%]"></div>
                <div className="flex-1 bg-primary/30 rounded-t h-[50%]"></div>
                <div className="flex-1 bg-primary/40 rounded-t h-[70%]"></div>
                <div className="flex-1 bg-primary/50 rounded-t h-[65%]"></div>
                <div className="flex-1 bg-primary/70 rounded-t h-[85%]"></div>
                <div className="flex-1 bg-primary rounded-t h-[100%]"></div>
              </div>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Escrow Đang Bảo Chứng:</span>
              <span className="font-data-mono text-data-mono font-bold text-secondary">46.2 Tỷ VNĐ</span>
            </div>
          </div>

          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase font-bold text-outline">Hợp Đồng B2B Đã Ký</span>
                <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-data-mono text-[11px] font-bold">
                  92.4% Ký Số
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg font-black text-on-surface tracking-tight">342</span>
                <span className="font-title-md text-title-md font-medium text-on-surface-variant">Hợp đồng pháp lý</span>
              </div>
              <div className="mt-3 w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                <div className="bg-tertiary h-full rounded-full" style={{ "width": "92.4%" }}></div>
              </div>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Còn 26 HĐ đang thẩm tra</span>
              <span className="font-data-mono text-data-mono text-outline font-semibold">FPT.eSign</span>
            </div>
          </div>

          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase font-bold text-outline">Tỷ Lệ Đấu Thầu RFQ</span>
                <span className="text-tertiary font-data-mono text-data-mono font-bold">+5.4% tháng này</span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg font-black text-on-surface tracking-tight">78.5%</span>
                <span className="font-title-md text-title-md font-medium text-on-surface-variant">Chốt thầu</span>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-secondary text-[18px]">balance</span>
                <span className="font-body-sm text-body-sm">Trung bình: <strong className="text-on-surface">3.8 Báo giá / RFQ</strong></span>
              </div>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Thời gian phản hồi TB:</span>
              <span className="font-data-mono text-data-mono font-bold text-on-surface">3.2 Giờ</span>
            </div>
          </div>

          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase font-bold text-outline">Chỉ Số Uy Tín Toàn Sàn</span>
                <span className="px-2 py-0.5 rounded bg-primary-fixed text-primary font-label-sm text-label-sm font-bold">Hạng A+</span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg font-black text-primary tracking-tight">94.2</span>
                <span className="font-title-md text-title-md font-bold text-outline">/ 100 Điểm</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Giao đúng tiến độ mốc: <strong className="text-tertiary">98.6%</strong>
                </span>
              </div>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Tỷ lệ hoàn trả mẫu kiểm định:</span>
              <span className="font-data-mono text-data-mono font-bold text-tertiary">0.4%</span>
            </div>
          </div>
        </div>

        <div className="mt-space-lg grid grid-cols-1 xl:grid-cols-12 gap-space-md">

          <div className="xl:col-span-8 p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-space-sm">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Phễu Chuyển Đổi Hợp Đồng B2B Doanh Nghiệp (Conversion Funnel)
                  </h3>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Giám sát thời gian thực chu kỳ từ RFQ doanh nghiệp tới kích hoạt mẻ nướng và hoàn tất giao quà
                </p>
              </div>
              <span className="font-data-mono text-data-mono text-outline bg-surface-container px-2.5 py-1 rounded">
                Cycle Time: 6.8 Ngày
              </span>
            </div>

            <div className="mt-space-md space-y-3">

              <div className="p-3 rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-data-mono text-data-mono font-bold flex items-center justify-center shrink-0">1</span>
                  <div className="min-w-0">
                    <div className="font-title-md text-title-md font-bold text-on-surface">512 Yêu Cầu RFQ Mua Sỉ Đăng Tải</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">Quy mô đơn hàng từ 100 đến 15.000 hộp quà doanh nghiệp</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 sm:text-right">
                  <div>
                    <div className="font-headline-sm text-headline-sm font-extrabold text-on-surface">512 <span className="text-xs font-normal text-outline">RFQ</span></div>
                    <div className="font-label-sm text-label-sm text-tertiary font-bold">100% Khởi tạo</div>
                  </div>
                  <div className="w-24 bg-surface-container-high h-2.5 rounded-full overflow-hidden hidden sm:block">
                    <div className="bg-primary h-full w-full"></div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-3 ml-0 sm:ml-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-8 h-8 rounded-full bg-secondary-fixed text-secondary font-data-mono text-data-mono font-bold flex items-center justify-center shrink-0">2</span>
                  <div className="min-w-0">
                    <div className="font-title-md text-title-md font-bold text-on-surface">1.840 Báo Giá Gửi Đi (Quotations)</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">Tỷ lệ chào thầu cạnh tranh: 3.6 nhà xưởng / gói thầu</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 sm:text-right">
                  <div>
                    <div className="font-headline-sm text-headline-sm font-extrabold text-secondary">1.840 <span className="text-xs font-normal text-outline">Bid</span></div>
                    <div className="font-label-sm text-label-sm text-secondary font-bold">Tốc độ +18%</div>
                  </div>
                  <div className="w-24 bg-surface-container-high h-2.5 rounded-full overflow-hidden hidden sm:block">
                    <div className="bg-secondary h-full w-[88%]"></div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-3 ml-0 sm:ml-8">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-8 h-8 rounded-full bg-primary-container text-on-primary font-data-mono text-data-mono font-bold flex items-center justify-center shrink-0">3</span>
                  <div className="min-w-0">
                    <div className="font-title-md text-title-md font-bold text-on-surface">342 Hợp Đồng Điện Tử Ký Số</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">Đã thẩm định điều khoản phụ lục khuôn dập logo ép kim</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 sm:text-right">
                  <div>
                    <div className="font-headline-sm text-headline-sm font-extrabold text-primary">342 <span className="text-xs font-normal text-outline">HĐ</span></div>
                    <div className="font-label-sm text-label-sm text-primary font-bold">66.8% RFQ-to-Contract</div>
                  </div>
                  <div className="w-24 bg-surface-container-high h-2.5 rounded-full overflow-hidden hidden sm:block">
                    <div className="bg-primary-container h-full w-[67%]"></div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-3 ml-0 sm:ml-12">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-8 h-8 rounded-full bg-tertiary-fixed text-tertiary font-data-mono text-data-mono font-bold flex items-center justify-center shrink-0">4</span>
                  <div className="min-w-0">
                    <div className="font-title-md text-title-md font-bold text-on-surface">318 Đã Đặt Cọc M1 (Kích Hoạt Nướng Bánh)</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">Tiền ký quỹ tạm khóa an toàn tại Vietcombank Escrow</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 sm:text-right">
                  <div>
                    <div className="font-headline-sm text-headline-sm font-extrabold text-tertiary">318 <span className="text-xs font-normal text-outline">Đơn</span></div>
                    <div className="font-label-sm text-label-sm text-tertiary font-bold">93% M1 Lock</div>
                  </div>
                  <div className="w-24 bg-surface-container-high h-2.5 rounded-full overflow-hidden hidden sm:block">
                    <div className="bg-tertiary h-full w-[62%]"></div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-3 ml-0 sm:ml-16">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary font-data-mono text-data-mono font-bold flex items-center justify-center shrink-0">5</span>
                  <div className="min-w-0">
                    <div className="font-title-md text-title-md font-bold text-on-surface">285 Đang Vận Chuyển Lô Lớn / Tất Toán M2</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">Nghiệm thu đạt 100% chỉ số vi sinh &amp; quy cách quà tặng</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 sm:text-right">
                  <div>
                    <div className="font-headline-sm text-headline-sm font-extrabold text-on-surface">285 <span className="text-xs font-normal text-outline">Lô</span></div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant font-bold">55.6% Hoàn Tất</div>
                  </div>
                  <div className="w-24 bg-surface-container-highest h-2.5 rounded-full overflow-hidden hidden sm:block">
                    <div className="bg-primary h-full w-[55%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-4 p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-outline">Kiểm Tra Mẫu Thực Tế</span>
                <span className="font-data-mono text-data-mono text-tertiary font-bold bg-tertiary-fixed px-2 py-0.5 rounded">QC Đạt 100%</span>
              </div>
              <h4 className="mt-2 font-headline-sm text-headline-sm text-on-surface font-bold">
                Bao Bì Sơn Mài &amp; Dòng Bánh Thượng Hạng
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Hộp quà đại diện mùa vụ 2025 phục vụ đơn vị ngân hàng tài chính với kỹ thuật ép kim dập nổi.
              </p>

              <div className="mt-4 relative rounded-xl overflow-hidden shadow-sm aspect-[4/3] bg-surface-container">
                <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" data-alt="Mid-autumn festival luxury corporate mooncake gift box with deep red lacquer finish and gold engraved lotus patterns, accompanied by delicate baked mooncakes cut to show salted egg yolk and lotus seed paste, dramatic warm studio lighting with rich dark crimson tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWvD7gqwbpdsanu4OapnYTKmDMFwLJwocbJjCPI5ZM2yJE010IvYEWM7WgWngsn_hR5zZAV-1Of0GRedazoJdDXmNuK6Wo_B1HpEJvGruHYPVdBvJD5vw3PD9WsjpuczIqyKrkFCn1VfJOszcDQYG1020UwW0Apb0ootKSWtKWbUdOMxJfqvUj6s22Rf97Q2hYGZcDnoXDhbo8Q44GoYIXaCUr4mlruzL12jrgdTeWp01_7KTPj1YS" />
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-inverse-surface/85 backdrop-blur text-inverse-on-surface flex items-center justify-between">
                  <span className="font-body-sm text-body-sm font-medium">Mẫu Hộp: Tràng An Kim Cúc</span>
                  <span className="font-data-mono text-data-mono text-secondary-fixed font-bold">SKU #TA-882</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
              <span>Tiêu chuẩn độ ẩm: <strong>16-18%</strong></span>
              <span>Hạn dùng: <strong>45 ngày</strong></span>
            </div>
          </div>
        </div>

        <div className="mt-space-lg grid grid-cols-1 xl:grid-cols-12 gap-space-md">

          <div className="xl:col-span-7 p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-space-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary-container"></div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Top 5 Nhà Cung Cấp Dẫn Đầu Doanh Số &amp; Uy Tín
                  </h3>
                </div>
                <span className="font-label-sm text-label-sm font-bold text-outline uppercase tracking-wider">Mùa Vụ 2025</span>
              </div>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left font-body-md text-body-md">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase">
                      <th className="py-2.5 px-3 rounded-l">Nhà Xưởng Cung Cấp</th>
                      <th className="py-2.5 px-3">Doanh Số Ký Kết</th>
                      <th className="py-2.5 px-3">Số Lượng HĐ</th>
                      <th className="py-2.5 px-3">Đúng Hạn</th>
                      <th className="py-2.5 px-3 rounded-r text-right">Uy Tín</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-transparent">

                    <tr className="hover:bg-surface-container-low/60 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">TA</div>
                          <div>
                            <div className="font-title-md text-title-md font-bold text-on-surface">Xưởng Bánh Tràng An</div>
                            <div className="font-body-sm text-body-sm text-tertiary flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">stars</span>
                              Đối Tác Vàng • ISO 22000
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-data-mono text-data-mono font-bold text-primary">32.4 Tỷ</td>
                      <td className="py-3 px-3 font-data-mono text-data-mono">84 HĐ</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-data-mono text-xs font-bold">99.2%</span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="font-data-mono text-data-mono font-black text-tertiary">98/100</span>
                      </td>
                    </tr>

                    <tr className="hover:bg-surface-container-low/60 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded bg-secondary-fixed text-secondary font-bold flex items-center justify-center shrink-0">KD</div>
                          <div>
                            <div className="font-title-md text-title-md font-bold text-on-surface">Kinh Đô Hoàng Gia B2B</div>
                            <div className="font-body-sm text-body-sm text-outline">Quy mô công nghiệp • HACCP</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-data-mono text-data-mono font-bold text-primary">28.1 Tỷ</td>
                      <td className="py-3 px-3 font-data-mono text-data-mono">72 HĐ</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-data-mono text-xs font-bold">98.5%</span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="font-data-mono text-data-mono font-black text-tertiary">96/100</span>
                      </td>
                    </tr>

                    <tr className="hover:bg-surface-container-low/60 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded bg-surface-container-high text-on-surface font-bold flex items-center justify-center shrink-0">TH</div>
                          <div>
                            <div className="font-title-md text-title-md font-bold text-on-surface">Thu Hương Bakery B2B</div>
                            <div className="font-body-sm text-body-sm text-outline">Bánh nướng phong vị Pháp-Việt</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-data-mono text-data-mono font-bold text-primary">19.5 Tỷ</td>
                      <td className="py-3 px-3 font-data-mono text-data-mono">53 HĐ</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-data-mono text-xs font-bold">97.8%</span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="font-data-mono text-data-mono font-black text-tertiary">94/100</span>
                      </td>
                    </tr>

                    <tr className="hover:bg-surface-container-low/60 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded bg-surface-container-high text-on-surface font-bold flex items-center justify-center shrink-0">BL</div>
                          <div>
                            <div className="font-title-md text-title-md font-bold text-on-surface">Bảo Phương Gia Truyền</div>
                            <div className="font-body-sm text-body-sm text-outline">Thập cẩm truyền thống Hà Nội</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-data-mono text-data-mono font-bold text-primary">14.8 Tỷ</td>
                      <td className="py-3 px-3 font-data-mono text-data-mono">41 HĐ</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-data-mono text-xs font-bold">96.4%</span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="font-data-mono text-data-mono font-black text-tertiary">92/100</span>
                      </td>
                    </tr>

                    <tr className="hover:bg-surface-container-low/60 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded bg-surface-container-high text-on-surface font-bold flex items-center justify-center shrink-0">HP</div>
                          <div>
                            <div className="font-title-md text-title-md font-bold text-on-surface">Hải Phòng Như Ý Artisan</div>
                            <div className="font-body-sm text-body-sm text-outline">Chuyên vỏ hộp sơn mài mỹ nghệ</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-data-mono text-data-mono font-bold text-primary">11.2 Tỷ</td>
                      <td className="py-3 px-3 font-data-mono text-data-mono">35 HĐ</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-data-mono text-xs font-bold">94.1%</span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="font-data-mono text-data-mono font-black text-on-surface">91/100</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="pt-3 flex items-center justify-between text-outline font-body-sm text-body-sm">
              <span>Xếp hạng dựa trên GMV &amp; Điểm SLA Escrow</span>
              <a className="text-primary font-title-md text-title-md font-bold hover:underline" href="#">Xem tất cả 48 NCC →</a>
            </div>
          </div>

          <div className="xl:col-span-5 p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-space-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-error animate-ping"></span>
                  <h3 className="font-headline-sm text-headline-sm text-error font-bold">
                    Cảnh Báo Sớm Rủi Ro (Early Warning System)
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-data-mono text-xs font-bold">3 Cảnh Báo Đỏ</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Hệ thống phát hiện tự động nguy cơ đứt gãy tiến độ giao hàng và suy giảm chất lượng cam kết.
              </p>
              <div className="mt-space-sm space-y-3">

                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-error text-[20px]">warning</span>
                      <span className="font-title-md text-title-md font-bold text-on-surface">Xưởng Đông Phương Gia Lâm</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-error text-on-error font-label-sm text-[11px] font-bold uppercase">Nguy Cơ Chậm M2</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Tiến độ đóng gói chậm 48h so với HĐ #MC-4491 (Trị giá 1.8 Tỷ VNĐ). Nguyên nhân: Thiếu hụt hộp giấy cứng định hình.
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-data-mono text-data-mono text-error font-bold">Dự kiến phạt trễ: 36 Tr/ngày</span>
                    <button className="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-bold hover:bg-surface-container-high" type="button">
                      Điều phối vỏ hộp
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[20px]">schedule</span>
                      <span className="font-title-md text-title-md font-bold text-on-surface">Cơ Sở Bánh Ngọt Sài Gòn Gourmet</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-bold uppercase">Áp Lực Milestone M2</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Tải lò nướng đạt 96% công suất tối đa. Hợp đồng 4.000 hộp quà cho Ngân hàng Techcombank cần xuất xưởng trước 20/07 Âm lịch.
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-data-mono text-data-mono text-secondary font-bold">Cần chia tải xưởng phụ</span>
                    <button className="px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-bold hover:opacity-90" type="button">
                      Gợi ý xưởng liên kết
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-error text-[20px]">person_off</span>
                      <span className="font-title-md text-title-md font-bold text-on-surface">Xưởng Bánh Mỹ Đình Food</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-[11px] font-bold uppercase">Điểm Uy Tín Giảm &lt;70</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Điểm uy tín tụt từ 88 xuống 68 điểm do 2 khiếu nại liên tiếp về độ đồng đều màu vỏ nướng và giao thiếu phụ kiện dao dĩa mạ vàng.
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-data-mono text-data-mono text-error font-bold">Đề xuất: Tạm dừng nhận RFQ mới</span>
                    <button className="px-2.5 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold hover:bg-primary-container" type="button">
                      Cử kiểm định viên
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-3 flex items-center justify-between text-outline font-body-sm text-body-sm">
              <span>Tự động cập nhật mỗi 5 phút</span>
              <button className="text-error font-title-md text-title-md font-bold hover:underline" type="button">
                Quy chế xử lý vi phạm →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-space-lg p-space-md rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-tertiary text-[24px]">verified_user</span>
            <div>
              <div className="font-title-md text-title-md font-bold text-on-surface">Đảm Bảo Khớp Lệnh &amp; Trích Quỹ Escrow An Toàn Tuyệt Đối</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Toàn bộ 128.6 Tỷ VNĐ được bảo trợ qua hợp đồng 3 bên với ngân hàng ủy thác.</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-data-mono text-data-mono text-outline">Audit ID: MOON-2025-HQ-OPS-9981</span>
            <button className="p-2 rounded bg-surface-container-lowest hover:bg-surface-container-high transition-colors" type="button">
              <span className="material-symbols-outlined text-[18px]">refresh</span>
            </button>
          </div>
        </div>
      </div></main></div>
    </div>
  );
}
