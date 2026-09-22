import React, { useEffect } from 'react';

export default function Booth({ onNavigate }) {

  return (
    <main className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]"><div className="flex flex-col w-full">
{/* Vendor Hero Section */}
<section className="relative w-full bg-gradient-to-b from-surface-container-high via-surface to-background pb-12 pt-6 overflow-hidden">
{/* Atmospheric gold and imperial lacquer ambient glow */}
<div className="absolute -top-32 right-10 w-96 h-96 rounded-full bg-secondary-fixed-dim/20 blur-3xl pointer-events-none"></div>
<div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
<div className="max-w-7xl mx-auto px-margin">
{/* Breadcrumb & Tagline */}
<div className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant mb-6">
<a className="hover:text-primary transition-colors" href="#">Xưởng Bánh Uy Tín</a>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<a className="hover:text-primary transition-colors" href="#">Bánh Di Sản Hà Nội &amp; Chợ Lớn</a>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-primary font-semibold">Xưởng Hưng Ký 1954</span>
</div>
{/* Main Storefront Card */}
<div className="bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden">
{/* Visual Brand Banner */}
<div className="relative h-64 md:h-80 w-full overflow-hidden">
<div className="bg-cover bg-center w-full h-full transform scale-105 transition-transform duration-1000" data-alt="A master Vietnamese baker meticulously hand-carving vintage wooden mooncake molds in an ancient lacquer workshop, rich dark mahogany wood tones, warm golden ambient sunlight, dust motes floating, glowing embers, luxury editorial heritage craft aesthetic" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuCAJoxZt1tO5UriFAkJTODuPu-inhWYLvGlmGRMYn9g7jNEuecCd5nhfESmf9jbaUIJPEuNEk3aJcUtKAq2utWCoEom5F5bK8NZ3pPYql7kCsemjezTKvHi9lWTzZw9KvJPCbCXnyYr5NeWyciqiKEV_7bCU1abS00R0IGpnnzUhNhMK_7_4WsPuYMOoxtDwhwYC7g6RDS61migGd9bzw4aeEMxKQjDiUlV8oBS7LlYh0p-HCFGA4R5CQ')"}}></div>
<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
<div className="absolute top-4 right-4 flex flex-wrap gap-2">
<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-secondary font-bold shadow-sm">
<span className="material-symbols-outlined text-secondary text-[16px]">stars</span> 70 Năm Di Sản (1954 - 2024)
            </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary-container/90 backdrop-blur-md font-label-sm text-label-sm text-tertiary-fixed shadow-sm">
<span className="material-symbols-outlined text-tertiary-fixed text-[16px]">verified_user</span> SafeTrade Escrow Bảo Chứng
            </span>
</div>
<div className="absolute bottom-6 left-6 md:left-10 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4 text-surface">
<div>
<div className="flex items-center gap-2 mb-2">
<span className="px-2.5 py-0.5 rounded bg-secondary text-surface font-label-sm text-label-sm tracking-wider uppercase font-semibold">Hoàng Triều Di Sản</span>
<span className="px-2.5 py-0.5 rounded bg-surface-container-lowest/20 backdrop-blur font-label-sm text-label-sm text-surface-bright">Chợ Lớn • Thăng Long</span>
</div>
<h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-surface-bright font-bold leading-tight drop-shadow-md">
                Xưởng Bánh Nghệ Nhân Hưng Ký 1954
              </h1>
<p className="font-body-md text-body-md text-surface/90 max-w-2xl mt-1">
                Kỷ niệm 70 năm gìn giữ phong vị Trung Thu cung đình, gìn giữ công thức nướng than củi nguyên bản và kỹ nghệ khuôn gỗ gia truyền độc bản.
              </p>
</div>
<div className="flex items-center gap-6 shrink-0 bg-surface-container-lowest/15 backdrop-blur-md px-5 py-3 rounded-lg">
<div className="text-center">
<div className="flex items-center justify-center gap-1 text-secondary-fixed">
<span className="font-price-display text-price-display font-bold text-surface-bright">5.0</span>
<span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</div>
<div className="font-label-sm text-label-sm text-surface/80">390 Hợp đồng B2B</div>
</div>
<div className="w-px h-8 bg-surface-bright/25"></div>
<div className="text-center">
<div className="font-title-md text-title-md font-bold text-surface-bright">100%</div>
<div className="font-label-sm text-label-sm text-surface/80">Đúng hạn giao hàng</div>
</div>
<div className="w-px h-8 bg-surface-bright/25"></div>
<div className="text-center">
<div className="font-title-md text-title-md font-bold text-secondary-fixed">0</div>
<div className="font-label-sm text-label-sm text-surface/80">Khiếu nại KCS</div>
</div>
</div>
</div>
</div>
{/* Vendor Badges & Quick Capabilities */}
<div className="p-6 md:p-8 bg-surface-container-lowest grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
<div className="lg:col-span-8 flex flex-col gap-4">
<div className="flex flex-wrap items-center gap-2">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container font-label-md text-label-md text-on-surface">
<span className="material-symbols-outlined text-secondary text-[18px]">workspace_premium</span>
                Nghệ Nhân Di Sản Quốc Gia
              </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container font-label-md text-label-md text-on-surface">
<span className="material-symbols-outlined text-primary text-[18px]">military_tech</span>
                OCOP 4 Sao Thượng Hạng
              </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container font-label-md text-label-md text-on-surface">
<span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
                Chuẩn ISO 22000:2018 &amp; HACCP
              </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-primary/10 font-label-md text-label-md text-primary font-semibold">
<span className="material-symbols-outlined text-primary text-[18px]">handshake</span>
                Đối Tác Cung Ứng Trọng Điểm
              </span>
</div>
{/* Workshop Highlights Bar */}
<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-on-surface-variant font-body-sm text-body-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">precision_manufacturing</span>
<span>Công suất: <strong>15.000 hộp/mùa</strong></span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">local_fire_department</span>
<span>Nướng lò tươi trong <strong>24 giờ</strong></span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary text-[20px]">imagesmode</span>
<span>Khắc Logo dát vàng từ <strong>50 hộp</strong></span>
</div>
</div>
</div>
{/* B2B Action Buttons */}
<div className="lg:col-span-4 flex flex-col gap-2.5">
<button className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm hover:bg-primary shadow-md hover:shadow-lg transition-all active:scale-[0.99]" onclick="document.getElementById('rfqModal').classList.remove('hidden')">
<span className="material-symbols-outlined text-[20px]">contract_edit</span>
              Yêu Cầu Báo Giá Riêng (RFQ B2B)
            </button>
<div className="grid grid-cols-2 gap-2">
<button className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-surface-container font-label-md text-label-md text-primary hover:bg-surface-container-high transition-colors text-center" onclick="alert('Đã ghi nhận yêu cầu gửi hộp Sampling Box miễn phí tận văn phòng quý công ty!')">
<span className="material-symbols-outlined text-[18px]">redeem</span>
                Nhận Mẫu Thử
              </button>
<button className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-surface-container font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high transition-colors text-center" onclick="alert('Đang kết nối qua kênh tư vấn riêng với Nghệ Nhân Trưởng Hưng Ký...')">
<span className="material-symbols-outlined text-[18px]">forum</span>
                Chat Nghệ Nhân
              </button>
</div>
</div>
</div>
{/* Storefront Sticky Navigation Tabs */}
<div className="bg-surface-container-low px-6 md:px-8 py-2 flex items-center gap-1 overflow-x-auto">
<button className="px-4 py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm shrink-0 shadow-sm">
            Bộ Sưu Tập Quà Tặng 2024
          </button>
<a className="px-4 py-2.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container font-label-md text-label-md shrink-0 transition-colors" href="#b2b-pricing">
            Bảng Chiết Khấu Theo Số Lượng
          </a>
<a className="px-4 py-2.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container font-label-md text-label-md shrink-0 transition-colors" href="#workshop-capability">
            Hồ Sơ Năng Lực &amp; Kỹ Nghệ Hộp
          </a>
<a className="px-4 py-2.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container font-label-md text-label-md shrink-0 transition-colors" href="#customization">
            Tùy Biến Ép Nhũ &amp; Logo
          </a>
<a className="px-4 py-2.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container font-label-md text-label-md shrink-0 transition-colors" href="#reviews">
            Đánh Giá Doanh Nghiệp (390)
          </a>
</div>
</div>
</div>
</section>
{/* Section 1: Tiered B2B Pricing Structure */}
<section className="w-full py-12 bg-surface" id="b2b-pricing">
<div className="max-w-7xl mx-auto px-margin">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Chính Sách Bán Buôn Doanh Nghiệp 2024</span>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mt-1">
            Bậc Thang Chiết Khấu &amp; Đặc Quyền Đơn Lớn
          </h2>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-md">
          Chính sách giá niêm yết minh bạch, chiết khấu trực tiếp trên hóa đơn VAT và bảo chứng thanh toán qua SafeTrade Escrow.
        </p>
</div>
{/* Pricing Tier Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{/* Tier 1: Cấp Đồng */}
<div className="bg-surface-container-lowest rounded-xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-4">
<span className="font-label-sm text-label-sm uppercase tracking-wider px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-bold">Cấp Đồng</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">20 - 99 hộp</span>
</div>
<div className="mb-4">
<div className="font-display-hero text-headline-lg text-primary font-bold leading-none">-15%</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Chiết khấu trực tiếp hợp đồng</p>
</div>
<div className="space-y-3 font-body-sm text-body-sm text-on-surface">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span>Miễn phí in thiệp chúc mừng thiết kế riêng</span>
</div>
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span>Miễn phí vận chuyển nội thành 1 điểm nhận</span>
</div>
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span>Hóa đơn điện tử VAT xuất ngay trong ngày</span>
</div>
</div>
</div>
<button className="mt-6 w-full py-2.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors font-semibold" onclick="document.getElementById('rfqModal').classList.remove('hidden')">
            Chọn Mức 20 - 99 Hộp
          </button>
</div>
{/* Tier 2: Cấp Bạc */}
<div className="bg-surface-container-lowest rounded-xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-4">
<span className="font-label-sm text-label-sm uppercase tracking-wider px-2.5 py-1 rounded bg-secondary-fixed/50 text-secondary font-bold">Cấp Bạc</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">100 - 299 hộp</span>
</div>
<div className="mb-4">
<div className="font-display-hero text-headline-lg text-primary font-bold leading-none">-20%</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Gói quà tặng doanh nghiệp tiêu chuẩn</p>
</div>
<div className="space-y-3 font-body-sm text-body-sm text-on-surface">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span><strong>Miễn phí khuôn dập &amp; ép nhũ kim logo</strong></span>
</div>
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span>Tặng 1 hộp Sampling Box trải nghiệm chất lượng</span>
</div>
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
<span>Miễn phí chia tải đóng gói quà tặng từng phần</span>
</div>
</div>
</div>
<button className="mt-6 w-full py-2.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors font-semibold" onclick="document.getElementById('rfqModal').classList.remove('hidden')">
            Chọn Mức 100 - 299 Hộp
          </button>
</div>
{/* Tier 3: Cấp Vàng (Featured) */}
<div className="bg-gradient-to-b from-primary-container to-primary text-on-primary rounded-xl p-6 shadow-xl relative flex flex-col justify-between transform md:-translate-y-2">
<div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold rounded-full uppercase shadow">
            Phổ Biến Cho Tập Đoàn
          </div>
<div>
<div className="flex items-center justify-between mb-4">
<span className="font-label-sm text-label-sm uppercase tracking-wider px-2.5 py-1 rounded bg-surface/20 text-on-primary font-bold">Cấp Vàng</span>
<span className="font-label-sm text-label-sm text-secondary-fixed font-semibold">300 - 499 hộp</span>
</div>
<div className="mb-4">
<div className="font-display-hero text-headline-lg text-secondary-fixed font-bold leading-none">-25%</div>
<p className="font-body-sm text-body-sm text-on-primary/80 mt-1">Tối ưu chi phí &amp; định danh thương hiệu</p>
</div>
<div className="space-y-3 font-body-sm text-body-sm text-surface">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-secondary-fixed text-[18px] shrink-0 mt-0.5">verified</span>
<span>Tùy biến dải ruy-băng dệt nơ chuẩn mã màu Pantone</span>
</div>
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-secondary-fixed text-[18px] shrink-0 mt-0.5">verified</span>
<span>Miễn phí giao hàng xe thùng lạnh tới <strong>3 địa chỉ</strong></span>
</div>
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-secondary-fixed text-[18px] shrink-0 mt-0.5">verified</span>
<span>Hỗ trợ lưu kho mát xưởng và giao theo 2 đợt</span>
</div>
</div>
</div>
<button className="mt-6 w-full py-2.5 rounded-lg bg-secondary text-surface font-title-sm text-title-sm hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors font-bold shadow-md" onclick="document.getElementById('rfqModal').classList.remove('hidden')">
            Nhận Báo Giá Mức Vàng
          </button>
</div>
{/* Tier 4: Cấp Hoàng Kim */}
<div className="bg-surface-container-lowest rounded-xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-4">
<span className="font-label-sm text-label-sm uppercase tracking-wider px-2.5 py-1 rounded bg-secondary-fixed-dim/40 text-on-secondary-fixed font-bold">Hoàng Kim VIP</span>
<span className="font-label-sm text-label-sm text-primary font-semibold">500+ hộp</span>
</div>
<div className="mb-4">
<div className="font-display-hero text-headline-lg text-primary font-bold leading-none">-30%</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Đặc quyền tùy biến bespoke cao nhất</p>
</div>
<div className="space-y-3 font-body-sm text-body-sm text-on-surface">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">stars</span>
<span><strong>Công thức nhân bánh độc quyền</strong> theo khẩu vị</span>
</div>
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">stars</span>
<span>Khắc la-de họ tên riêng từng lãnh đạo đối tác VIP</span>
</div>
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">stars</span>
<span>Nghệ nhân trưởng ký tay chứng thư bảo chứng di sản</span>
</div>
</div>
</div>
<button className="mt-6 w-full py-2.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors font-semibold" onclick="document.getElementById('rfqModal').classList.remove('hidden')">
            Liên Hệ Đơn Hoàng Kim
          </button>
</div>
</div>
</div>
</section>
{/* Section 2: Selected Curated Gift Box Catalog */}
<section className="w-full py-12 bg-surface-container-low">
<div className="max-w-7xl mx-auto px-margin">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Tuyển Tập Thượng Hạng</span>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mt-1">
            Bộ Sưu Tập Hộp Quà Trung Thu 2024
          </h2>
</div>
<div className="flex items-center gap-3">
<span className="font-body-sm text-body-sm text-on-surface-variant">Lọc theo dòng hộp:</span>
<button className="px-3 py-1.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm">Tất cả (4)</button>
<button className="px-3 py-1.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface hover:bg-surface-container-high">Sơn mài cao cấp</button>
<button className="px-3 py-1.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface hover:bg-surface-container-high">Gấm Hoàng Gia</button>
</div>
</div>
{/* Product Grid (4 Curated Boxes) */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{/* Box 1: VIP Vượng Nguyệt */}
<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col group">
<div className="relative h-60 w-full overflow-hidden bg-surface-container-high">
<div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" data-alt="Exquisite Vietnamese mother-of-pearl inlay lacquer mooncake gift box named Vuong Nguyet, deep cinnabar red lacquer, glossy polished finish, four ornate gourmet mooncakes cut open showing abalone and bird nest golden yolk filling, luxury product photography, soft studio lighting" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDEKlYxWu9ElYt5YkiMC0o7oXnz2ATMnOJn8A3uvd94Sjqvq2Gz8OgCagyeDlDljSOOiVYNPmWE8e-v-vhW3L0zJAD8TKZ1Ofcg9VsQi9FmFRbQ0k7T95W-9xGgkEtGR5OSi2bxfWL0Am-IxLJ7c1isbS_b6LA0XXzL8iHzkHCKdsh5Tdf15VmEFzrmLyvBlQDonZiJAHL92Hu583A6Sc32ViAOgvh4AHYfHnJs9x2pboOnV7f9fyuOHw')"}}></div>
<span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold shadow">
              Hạng Thượng Đỉnh VIP
            </span>
<span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-surface-container-lowest/90 font-label-sm text-label-sm text-on-surface-variant">
              MOQ: 10 Hộp
            </span>
</div>
<div className="p-5 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-bold mb-1">
<span className="material-symbols-outlined text-[16px]">draw</span> Sơn Mài Cẩn Ốc Xà Cừ
              </div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">
                Hộp VIP Vượng Nguyệt
              </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 line-clamp-2">
                4 bánh 200g: Bào ngư vi cá thượng phẩm, Tổ yến hạt sen Tây Hồ, Thập cẩm gà quay ngũ vị, Đậu xanh trứng muối bơ Pháp.
              </p>
</div>
<div className="pt-4 mt-4 bg-surface-container-low -mx-5 -mb-5 p-5">
<div className="flex items-baseline justify-between mb-3">
<div>
<div className="font-price-display text-price-display text-primary font-bold">720.000 đ</div>
<div className="font-body-sm text-body-sm text-outline line-through">900.000 đ (Giá Lẻ)</div>
</div>
<span className="font-label-sm text-label-sm font-bold text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded">
                  Tiết kiệm 20% B2B
                </span>
</div>
<div className="grid grid-cols-2 gap-2">
<button className="px-2 py-2 rounded bg-surface text-on-surface hover:bg-surface-container font-label-sm text-label-sm flex items-center justify-center gap-1" onclick="alert('Đang tải Specsheet kỹ thuật, chỉ tiêu kiểm nghiệm KCS hộp Vượng Nguyệt (PDF)...')">
<span className="material-symbols-outlined text-[16px]">description</span> Specsheet
                </button>
<button className="px-2 py-2 rounded bg-primary-container text-on-primary hover:bg-primary font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1" onclick="document.getElementById('rfqModal').classList.remove('hidden')">
<span className="material-symbols-outlined text-[16px]">add_shopping_cart</span> Thêm RFQ
                </button>
</div>
</div>
</div>
</div>
{/* Box 2: Gấm Hoàng Triều Cung Đình */}
<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col group">
<div className="relative h-60 w-full overflow-hidden bg-surface-container-high">
<div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" data-alt="Traditional luxury royal silk brocade mooncake gift box woven with shimmering gold threads, containing six artisanal mooncakes with intricate imperial dragon patterns, accompanied by a celadon ceramic tea canister of ancient Shan Tuyet tea, editorial still life, warm golden lighting" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9YGEUAQHQiwTND-PzvCDb5tj8Hg2Us8AEC0SsPLmWC8YcpbSQ4-4yXc8ECRi4przPZW-qgOPXWbzwuGUMAhUtq5r3JMOxBF_BNlk95lnlIs0ZOtMCQE1ekEbFKuMWnCZLXwbdCMJCR9qpLHQ2ItxgE5C_M_UDH8PzUn-eA-90Keh4uUWYkUrIqgUjC9xaKEe0ZC-aPVgvA6hya2ycPmMXvMqTpAhW3kvLT5b-9-3qvmo_jpPgEt015w')"}}></div>
<span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-secondary text-surface font-label-sm text-label-sm font-semibold shadow">
              Kèm Trà Cổ Thụ
            </span>
<span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-surface-container-lowest/90 font-label-sm text-label-sm text-on-surface-variant">
              MOQ: 10 Hộp
            </span>
</div>
<div className="p-5 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-bold mb-1">
<span className="material-symbols-outlined text-[16px]">texture</span> Gấm Thêu Chỉ Vàng Hoàng Gia
              </div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">
                Hộp Gấm Hoàng Triều
              </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 line-clamp-2">
                6 bánh 150g cổ truyền: Sen nhuyễn trứng muối, Trà xanh matcha, Mè đen óc chó + Hũ gốm trà Shan Tuyết cổ thụ Hà Giang.
              </p>
</div>
<div className="pt-4 mt-4 bg-surface-container-low -mx-5 -mb-5 p-5">
<div className="flex items-baseline justify-between mb-3">
<div>
<div className="font-price-display text-price-display text-primary font-bold">1.150.000 đ</div>
<div className="font-body-sm text-body-sm text-outline line-through">1.450.000 đ (Giá Lẻ)</div>
</div>
<span className="font-label-sm text-label-sm font-bold text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded">
                  Tiết kiệm 21% B2B
                </span>
</div>
<div className="grid grid-cols-2 gap-2">
<button className="px-2 py-2 rounded bg-surface text-on-surface hover:bg-surface-container font-label-sm text-label-sm flex items-center justify-center gap-1" onclick="alert('Đang tải Specsheet kỹ thuật, chỉ tiêu kiểm nghiệm KCS hộp Hoàng Triều (PDF)...')">
<span className="material-symbols-outlined text-[16px]">description</span> Specsheet
                </button>
<button className="px-2 py-2 rounded bg-primary-container text-on-primary hover:bg-primary font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1" onclick="document.getElementById('rfqModal').classList.remove('hidden')">
<span className="material-symbols-outlined text-[16px]">add_shopping_cart</span> Thêm RFQ
                </button>
</div>
</div>
</div>
</div>
{/* Box 3: Dạ Nguyệt Phú Quý */}
<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col group">
<div className="relative h-60 w-full overflow-hidden bg-surface-container-high">
<div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" data-alt="Artisanal pine wood carved mooncake box with detailed lotus petal carvings and brass clasp hardware, four traditionally baked golden brown Vietnamese mooncakes resting on red velvet interior, dramatic warm side-lighting, elegant corporate gift showcase" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuA1GeV2VrRazsr6I2OVJfWlRC4kjAIDgN5YvssaDUCCanBrAcTADBX__fNgRcTw_scjDMp9zFHRTix1sHifhAwrGG9B3EioeWKZqQLFmTz01iKLeFSPlr80z4G5bRcPkAEyOGh10Zukd7VePwhCq3XLLKy30T5aN0Ee-HXFtN_T65xM6QSCsck8Fvp5Hfkyvi6sOtx37mX3nfMObD134VhF4SwLVuIwFW6mtL5pZ0vhDQdIeAkJsYoESw')"}}></div>
<span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-tertiary-container text-on-tertiary font-label-sm text-label-sm font-semibold shadow">
              Gỗ Thông Tự Nhiên
            </span>
<span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-surface-container-lowest/90 font-label-sm text-label-sm text-on-surface-variant">
              MOQ: 20 Hộp
            </span>
</div>
<div className="p-5 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-bold mb-1">
<span className="material-symbols-outlined text-[16px]">carpenter</span> Khắc Hoa Sen Chạm Nổi
              </div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">
                Hộp Dạ Nguyệt Phú Quý
              </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 line-clamp-2">
                4 bánh 180g truyền thống: Thập cẩm xá xíu lạp xưởng Mai Quế Lộ, Hạt sen nhãn nhục, Khoai môn dẻo, Đậu đỏ hạt dưa.
              </p>
</div>
<div className="pt-4 mt-4 bg-surface-container-low -mx-5 -mb-5 p-5">
<div className="flex items-baseline justify-between mb-3">
<div>
<div className="font-price-display text-price-display text-primary font-bold">480.000 đ</div>
<div className="font-body-sm text-body-sm text-outline line-through">600.000 đ (Giá Lẻ)</div>
</div>
<span className="font-label-sm text-label-sm font-bold text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded">
                  Tiết kiệm 20% B2B
                </span>
</div>
<div className="grid grid-cols-2 gap-2">
<button className="px-2 py-2 rounded bg-surface text-on-surface hover:bg-surface-container font-label-sm text-label-sm flex items-center justify-center gap-1" onclick="alert('Đang tải Specsheet kỹ thuật, chỉ tiêu kiểm nghiệm KCS hộp Phú Quý (PDF)...')">
<span className="material-symbols-outlined text-[16px]">description</span> Specsheet
                </button>
<button className="px-2 py-2 rounded bg-primary-container text-on-primary hover:bg-primary font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1" onclick="document.getElementById('rfqModal').classList.remove('hidden')">
<span className="material-symbols-outlined text-[16px]">add_shopping_cart</span> Thêm RFQ
                </button>
</div>
</div>
</div>
</div>
{/* Box 4: Nguyệt Phố Tứ Quý */}
<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col group">
<div className="relative h-60 w-full overflow-hidden bg-surface-container-high">
<div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" data-alt="Refined contemporary papercraft mooncake box with gold hot foil stamping of royal cranes and moon patterns, four mini pastries with healthy ingredients like chia seeds and dragon fruit, clean minimalist luxury layout, soft warm beige and crimson background" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDQbC-RyF8Nm2H9CTN9aX7NBwDSFBZVD7OoNtImvANywhKtk3BdoG0yiARRkzCWv5uamDtDC6-hhec1nhaSzo4KyTK4O0o-zNAImOUuxX9-f1VoT488nczUBe5SincgPuBboxlyzDynQRXoX7g2TCx22t-UuPx0751ChSvRVN2xN7bk1d6gk1kkykpqDVTSdTVvv_ZGCfiLOHLVBWwJmfK2CzqIEmHCr179JkBTRUIm2CXqysmsC88oXg')"}}></div>
<span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold shadow">
              Ít Ngọt Thanh Đạm
            </span>
<span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-surface-container-lowest/90 font-label-sm text-label-sm text-on-surface-variant">
              MOQ: 30 Hộp
            </span>
</div>
<div className="p-5 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-bold mb-1">
<span className="material-symbols-outlined text-[16px]">eco</span> Giấy Mỹ Thuật Ép Kim
              </div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">
                Hộp Nguyệt Phố Tứ Quý
              </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 line-clamp-2">
                4 bánh mini 120g: Bánh ăn kiêng đường Isomalt, Hạt sen kỷ tử, Tảo spirulina mè trắng, Đậu xanh hạt chia organic.
              </p>
</div>
<div className="pt-4 mt-4 bg-surface-container-low -mx-5 -mb-5 p-5">
<div className="flex items-baseline justify-between mb-3">
<div>
<div className="font-price-display text-price-display text-primary font-bold">350.000 đ</div>
<div className="font-body-sm text-body-sm text-outline line-through">420.000 đ (Giá Lẻ)</div>
</div>
<span className="font-label-sm text-label-sm font-bold text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded">
                  Tiết kiệm 17% B2B
                </span>
</div>
<div className="grid grid-cols-2 gap-2">
<button className="px-2 py-2 rounded bg-surface text-on-surface hover:bg-surface-container font-label-sm text-label-sm flex items-center justify-center gap-1" onclick="alert('Đang tải Specsheet kỹ thuật, chỉ tiêu kiểm nghiệm KCS hộp Tứ Quý (PDF)...')">
<span className="material-symbols-outlined text-[16px]">description</span> Specsheet
                </button>
<button className="px-2 py-2 rounded bg-primary-container text-on-primary hover:bg-primary font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1" onclick="document.getElementById('rfqModal').classList.remove('hidden')">
<span className="material-symbols-outlined text-[16px]">add_shopping_cart</span> Thêm RFQ
                </button>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/* Section 3: Workshop Capability & 4-Step Craft Process */}
<section className="w-full py-16 bg-surface" id="workshop-capability">
<div className="max-w-7xl mx-auto px-margin">
<div className="text-center max-w-3xl mx-auto mb-12">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Quy Chuẩn Nghệ Nhân Hưng Ký</span>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mt-1">
          Hành Trình Tinh Hoa Từ Khâu Chọn Lọc Đến Nắp Hộp Doanh Nghiệp
        </h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-2">
          Kết hợp hài hòa phương pháp đúc nặn thủ công 7 thập kỷ với hệ thống kiểm soát vệ sinh an toàn thực phẩm chuẩn ISO quốc tế.
        </p>
</div>
{/* 4-Step Horizontal Process Timeline */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
{/* Step 1 */}
<div className="bg-surface-container-low p-6 rounded-xl relative flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-headline-md text-headline-md font-bold mb-4 shadow">
              01
            </div>
<h4 className="font-title-md text-title-md font-bold text-on-surface mb-2">Nguyên Liệu Tuyển Chọn</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">
              Sen Tây Hồ thơm bùi, lạp xưởng Mai Quế Lộ Chợ Lớn ủ men cổ truyền, trứng muối vịt thả đồng ủ trấu đủ 45 ngày đạt độ đỏ au béo ngậy.
            </p>
</div>
<div className="mt-4 pt-4 border-t-0 flex items-center gap-2 text-primary font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-[18px]">verified</span> 100% Nguồn gốc OCOP
          </div>
</div>
{/* Step 2 */}
<div className="bg-surface-container-low p-6 rounded-xl relative flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-lg bg-surface-container-highest text-primary flex items-center justify-center font-headline-md text-headline-md font-bold mb-4 shadow-sm">
              02
            </div>
<h4 className="font-title-md text-title-md font-bold text-on-surface mb-2">Khuôn Gỗ Thủ Công 70 Năm</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">
              Mỗi chiếc bánh được nén trong khuôn gỗ xà cừ cổ chế tác từ thập niên 1950, tạo nên đường viền cánh hoa cúc và mây rồng sắc nét đặc trưng.
            </p>
</div>
<div className="mt-4 pt-4 border-t-0 flex items-center gap-2 text-primary font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-[18px]">architecture</span> Nghệ nhân chạm khắc thủ công
          </div>
</div>
{/* Step 3 */}
<div className="bg-surface-container-low p-6 rounded-xl relative flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-lg bg-surface-container-highest text-primary flex items-center justify-center font-headline-md text-headline-md font-bold mb-4 shadow-sm">
              03
            </div>
<h4 className="font-title-md text-title-md font-bold text-on-surface mb-2">Lò Nướng Than Củi Kép</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">
              Canh lửa 3 lần nướng - 2 lần quét trứng gà ta mật ong hoa nhãn, giữ lớp vỏ mỏng giòn thơm ngát mà không gãy vỡ, nhân bên trong ẩm mượt.
            </p>
</div>
<div className="mt-4 pt-4 border-t-0 flex items-center gap-2 text-primary font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-[18px]">temp_preferences_custom</span> Nhiệt độ chuẩn 210°C
          </div>
</div>
{/* Step 4 */}
<div className="bg-surface-container-low p-6 rounded-xl relative flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-lg bg-tertiary-container text-on-tertiary flex items-center justify-center font-headline-md text-headline-md font-bold mb-4 shadow">
              04
            </div>
<h4 className="font-title-md text-title-md font-bold text-on-surface mb-2">Đóng Gói Khí Trơ KCS</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">
              Dây chuyền buồng lạnh vô trùng Class 10.000, bơm khí Ni-tơ bảo vệ bánh tươi tự nhiên 45 ngày mà không dùng bất kỳ chất bảo quản hóa học.
            </p>
</div>
<div className="mt-4 pt-4 border-t-0 flex items-center gap-2 text-tertiary font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-[18px]">format_image_left</span> Chứng nhận ISO 22000
          </div>
</div>
</div>
</div>
</section>
{/* Section 4: Corporate Customization & Foil Stamping Showcase */}
<section className="w-full py-16 bg-surface-container-low" id="customization">
<div className="max-w-7xl mx-auto px-margin">
<div className="bg-surface-container-lowest rounded-2xl p-8 md:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
{/* Interactive Preview Left Column */}
<div className="lg:col-span-6 space-y-4">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Xưởng In &amp; Chế Tác Riêng</span>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold leading-tight">
            Tùy Biến Định Danh Thương Hiệu Quý Doanh Nghiệp
          </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant">
            Khẳng định vị thế và lòng tri ân chân thành tới đối tác với những chi tiết gia công tinh tế: dập nổi logo dát vàng 24K, thiệp chúc mừng viết tay, và nơ ruy-băng nhận diện chuẩn sắc thái công ty.
          </p>
<div className="space-y-3 pt-2">
<div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low">
<span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
<div>
<div className="font-title-sm text-title-sm font-bold text-on-surface">Miễn phí tạo khuôn dập kim</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Áp dụng cho mọi đơn hàng từ 100 hộp trở lên (tiết kiệm 2.500.000đ chi phí khuôn)</div>
</div>
</div>
<div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low">
<span className="material-symbols-outlined text-primary text-[24px]">palette</span>
<div>
<div className="font-title-sm text-title-sm font-bold text-on-surface">Chọn màu nhũ vàng kim hoàng gia hoặc bạc bạch kim</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Mực dập nhập khẩu Đức, không bong tróc, sắc nét trên cả chất liệu sơn mài &amp; da cao cấp</div>
</div>
</div>
<div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low">
<span className="material-symbols-outlined text-tertiary text-[24px]">approval_delegation</span>
<div>
<div className="font-title-sm text-title-sm font-bold text-on-surface">Gửi mẫu maquette 3D trong 4 giờ</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Đội ngũ thiết kế Hưng Ký dựng mẫu xem trước chuẩn xác tỷ lệ trước khi bấm máy sản xuất</div>
</div>
</div>
</div>
<div className="pt-2 flex items-center gap-4">
<button className="px-6 py-3 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm hover:bg-primary shadow-md transition-all font-semibold" onclick="document.getElementById('rfqModal').classList.remove('hidden')">
              Đăng Ký Khắc Mẫu Logo
            </button>
<span className="font-body-sm text-body-sm text-outline">Bàn giao mẫu vật lý trong 48h</span>
</div>
</div>
{/* Preview Visual Right Column */}
<div className="lg:col-span-6 relative">
<div className="relative rounded-xl overflow-hidden shadow-2xl">
<div className="h-96 md:h-[460px] w-full bg-cover bg-center" data-alt="Close-up macro detail of a red luxury lacquer mooncake box with metallic 24K gold foil stamping of a corporate logo, exquisite precision, crisp embossed edges, surrounded by high-grade satin ribbons and golden tea cups, cinematic lighting" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuAV9I9u9tXB5d3WRY7eO0O1IsY2TrGS_06QAtZjbnGHci5Z0v4kYB8eIwiSizU6-agyUtds4sKi4tmneAXVAJ3U1Tlo9NbnjevD5j6MAy_E1E_j-fIA56aZJk6jvN-Ae5EPsKtuWznH9ibxPiYbqA-T4CD6rWEU-JLAeJBw5Z5qB7sckzmamDxycwg0kKItahXU2sazbxD7dpZ63not4IXZ6G4f6g9bQKyZVEhFLO2dympyonIVydBJew')"}}></div>
<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
{/* Live mock badge tag */}
<div className="absolute bottom-6 left-6 right-6 bg-surface-container-lowest/90 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center justify-between">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Mẫu Thực Tế Tham Chiếu</span>
<div className="font-title-sm text-title-sm text-on-surface font-semibold">Logo Dát Vàng Hộp Vượng Nguyệt (Đơn 800 Hộp Vingroup)</div>
</div>
<span className="px-3 py-1 rounded bg-secondary-fixed/60 text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                KCS Đạt 100%
              </span>
</div>
</div>
</div>
</div>
</div>
</section>
{/* Section 5: Verified B2B Reviews (Trust & Escrow Proof) */}
<section className="w-full py-16 bg-surface" id="reviews">
<div className="max-w-7xl mx-auto px-margin">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
<div>
<div className="flex items-center gap-2 mb-1">
<span className="material-symbols-outlined text-secondary text-[22px]">verified_user</span>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Được Xác Thực Qua SafeTrade Escrow</span>
</div>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
            Phản Hồi Từ Các Trưởng Phòng Thu Mua Doanh Nghiệp
          </h2>
</div>
<div className="flex items-center gap-3">
<span className="font-title-md text-title-md font-bold text-on-surface">Điểm Trung Bình:</span>
<div className="flex items-center gap-1 bg-secondary-fixed/40 px-3 py-1.5 rounded-lg text-secondary">
<span className="font-price-display text-price-display font-bold">5.0 / 5.0</span>
<span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</div>
</div>
</div>
{/* Reviews Bento Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{/* Review 1: Vingroup */}
<div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
<div>
<div className="flex items-center justify-between mb-4">
<div className="flex text-secondary">
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</div>
<span className="font-label-sm text-label-sm text-secondary font-bold bg-surface-container px-2 py-0.5 rounded">Hợp đồng: 800 Hộp</span>
</div>
<p className="font-body-md text-body-md text-on-surface italic mb-4">
              "Bộ phận Thu mua Vingroup đặt 800 hộp Vượng Nguyệt biếu đối tác ngoại giao. Chất lượng sơn mài cẩn ốc xà cừ bóng không tì vết, bánh dẻo bùi không bị ngọt khé. Giao đủ 100% trước 2 ngày so với cam kết."
            </p>
</div>
<div className="pt-4 border-t-0 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold font-title-sm text-title-sm shrink-0">
              VG
            </div>
<div>
<div className="font-title-sm text-title-sm font-bold text-on-surface">Ban Mua Sắm Tập Đoàn Vingroup</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Xác thực hợp đồng SafeTrade #NP-2023-8891</div>
</div>
</div>
</div>
{/* Review 2: FPT Software */}
<div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
<div>
<div className="flex items-center justify-between mb-4">
<div className="flex text-secondary">
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</div>
<span className="font-label-sm text-label-sm text-secondary font-bold bg-surface-container px-2 py-0.5 rounded">Hợp đồng: 1.200 Hộp</span>
</div>
<p className="font-body-md text-body-md text-on-surface italic mb-4">
              "Ấn tượng nhất là xưởng Hưng Ký đáp ứng dòng bánh mini thanh đạm ít đường cho cán bộ công nghệ. Phần dập nhũ cam thương hiệu FPT lên nắp hộp giấy mỹ thuật cực kỳ chuẩn màu pantone."
            </p>
</div>
<div className="pt-4 border-t-0 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary text-surface flex items-center justify-center font-bold font-title-sm text-title-sm shrink-0">
              FPT
            </div>
<div>
<div className="font-title-sm text-title-sm font-bold text-on-surface">Procurement Department - FPT Software</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Xác thực hợp đồng SafeTrade #NP-2023-4412</div>
</div>
</div>
</div>
{/* Review 3: Vietcombank */}
<div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
<div>
<div className="flex items-center justify-between mb-4">
<div className="flex text-secondary">
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</div>
<span className="font-label-sm text-label-sm text-secondary font-bold bg-surface-container px-2 py-0.5 rounded">Hợp đồng: 550 Hộp</span>
</div>
<p className="font-body-md text-body-md text-on-surface italic mb-4">
              "Khách hàng VIP của Vietcombank khen ngợi hương vị thập cẩm truyền thống thơm lá chanh và rượu Mai Quế Lộ rất khác biệt so với bánh công nghiệp. Hồ sơ kiểm nghiệm KCS và hóa đơn VAT chuẩn chỉnh."
            </p>
</div>
<div className="pt-4 border-t-0 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold font-title-sm text-title-sm shrink-0">
              VCB
            </div>
<div>
<div className="font-title-sm text-title-sm font-bold text-on-surface">Trung Tâm Phục Vụ Khách Hàng Ưu Tiên VCB</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Xác thực hợp đồng SafeTrade #NP-2023-9031</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/* Final Call to Action Banner */}
<section className="w-full py-16 bg-surface-container-low">
<div className="max-w-7xl mx-auto px-margin">
<div className="relative bg-gradient-to-r from-primary via-primary-container to-primary text-on-primary rounded-2xl p-8 md:p-14 shadow-2xl overflow-hidden">
{/* Decorative background circle */}
<div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-secondary/30 blur-2xl pointer-events-none"></div>
<div className="relative z-10 max-w-3xl">
<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary-fixed/30 text-secondary-fixed font-label-sm text-label-sm font-bold mb-4">
<span className="material-symbols-outlined text-[16px]">alarm</span> Giới Hạn Công Suất Mùa Bánh 2024
          </div>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold leading-tight text-surface-bright">
            Đặt Lịch Trước Rằm Tháng 7 Để Đảm Bảo Tiến Độ Ép Logo Dát Vàng
          </h2>
<p className="font-body-lg text-body-lg text-on-primary/90 mt-3 mb-8">
            Do kỹ nghệ thủ công và lò nướng than củi chỉ đáp ứng tối đa 15.000 hộp/mùa, xưởng Hưng Ký ưu tiên giữ mức chiết khấu cao nhất và miễn phí khuôn dập cho 20 doanh nghiệp chốt hợp đồng sớm nhất.
          </p>
<div className="flex flex-col sm:flex-row items-center gap-4">
<button className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-secondary text-surface hover:bg-secondary-fixed hover:text-on-secondary-fixed font-title-sm text-title-sm font-bold shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2" onclick="document.getElementById('rfqModal').classList.remove('hidden')">
<span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
              Khởi Tạo Báo Giá Riêng (RFQ) Ngay
            </button>
<a className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 backdrop-blur text-surface-bright font-title-sm text-title-sm font-semibold transition-colors flex items-center justify-center gap-2" href="tel:18006886">
<span className="material-symbols-outlined text-[20px]">call</span>
              Hotline Cấp Cao: 1800 6886 (Nhánh 2)
            </a>
</div>
</div>
</div>
</div>
</section>
{/* Quick B2B RFQ Modal Drawer (Client-Side Dialog) */}
<div className="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" id="rfqModal">
<div className="bg-surface-container-lowest rounded-xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative max-h-[921px] overflow-y-auto">
<button className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors" onclick="document.getElementById('rfqModal').classList.add('hidden')">
<span className="material-symbols-outlined text-[24px]">close</span>
</button>
<div className="mb-6">
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">Hưng Ký 1954 • SafeTrade RFQ</span>
<h3 className="font-headline-md text-headline-md text-primary font-bold mt-1">Yêu Cầu Báo Giá Riêng Doanh Nghiệp</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Nghệ nhân và ban quản lý xưởng sẽ gửi bảng chiết khấu kèm maket logo sau tối đa 2 giờ làm việc.</p>
</div>
<form className="space-y-4 font-body-sm text-body-sm" onsubmit="event.preventDefault(); alert('Yêu cầu RFQ đã được gửi thành công đến Xưởng Hưng Ký và hệ thống SafeTrade Escrow!'); document.getElementById('rfqModal').classList.add('hidden');">
<div>
<label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">Tên Doanh nghiệp / Tổ chức *</label>
<input className="w-full h-11 px-3.5 rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-inner" placeholder="Ví dụ: Tập Đoàn FPT Telecom" required="" type="text"/>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
<label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">Họ tên người đại diện *</label>
<input className="w-full h-11 px-3.5 rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-inner" placeholder="Nguyễn Văn A" required="" type="text"/>
</div>
<div>
<label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">Số điện thoại / Zalo *</label>
<input className="w-full h-11 px-3.5 rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-inner" placeholder="0912 345 678" required="" type="tel"/>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
<label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">Số lượng dự kiến (Hộp) *</label>
<input className="w-full h-11 px-3.5 rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-inner" min="20" placeholder="Ví dụ: 150" required="" type="number"/>
</div>
<div>
<label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">Ngân sách dự tính / Hộp</label>
<select className="w-full h-11 px-3.5 rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-inner">
<option>Dưới 400.000 đ</option>
<option>400.000 đ - 700.000 đ</option>
<option selected="">700.000 đ - 1.200.000 đ</option>
<option>Trên 1.200.000 đ (VIP Sơn Mài)</option>
</select>
</div>
</div>
<div>
<label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">Yêu cầu gia công nhận diện</label>
<div className="grid grid-cols-2 gap-2 text-on-surface-variant">
<label className="flex items-center gap-2 cursor-pointer">
<input defaultChecked className="accent-primary" type="checkbox"/> Khắc dập logo dát vàng
            </label>
<label className="flex items-center gap-2 cursor-pointer">
<input defaultChecked className="accent-primary" type="checkbox"/> In thiệp chúc mừng riêng
            </label>
<label className="flex items-center gap-2 cursor-pointer">
<input className="accent-primary" type="checkbox"/> Tùy biến ruy-băng nhận diện
            </label>
<label className="flex items-center gap-2 cursor-pointer">
<input className="accent-primary" type="checkbox"/> Nhận mẫu thử Sampling Box
            </label>
</div>
</div>
<div className="pt-2">
<button className="w-full py-3 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm hover:bg-primary transition-all font-semibold shadow-md" type="submit">
            Gửi Yêu Cầu Cho Xưởng Hưng Ký (Miễn Phí)
          </button>
<p className="font-body-sm text-body-sm text-outline text-center mt-2">
            Được bảo vệ bởi điều khoản bảo mật B2B &amp; SafeTrade Escrow Nguyệt Phố
          </p>
</div>
</form>
</div>
</div>
</div></main>
  );
}
