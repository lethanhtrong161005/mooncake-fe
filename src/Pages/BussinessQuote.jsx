import React, { useEffect } from 'react';

export default function BussinessQuote({ onNavigate }) {

  useEffect(() => {
    try {
      
  function setQty(val) {
    const input = document.getElementById('quantity-input');
    const summaryQty = document.getElementById('summary-qty');
    const summaryPrice = document.getElementById('summary-price');
    if (input) {
      input.value = val;
      if (summaryQty) summaryQty.textContent = val + ' Hộp quà';
      if (summaryPrice) {
        // Average unit price: 600,000 VND with 25% discount = 450,000 VND
        const total = val * 600000;
        summaryPrice.textContent = total.toLocaleString('vi-VN') + 'đ';
      }
    }
  }

  // Interactive FAQ Toggle
  document.querySelectorAll('.faq-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector('.material-symbols-outlined');
      if (content.style.display === 'none' || !content.style.display) {
        content.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
      } else {
        content.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
      }
    });
  });

  // Quantity input listener
  const qtyInput = document.getElementById('quantity-input');
  if (qtyInput) {
    qtyInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value) || 0;
      const summaryQty = document.getElementById('summary-qty');
      const summaryPrice = document.getElementById('summary-price');
      if (summaryQty) summaryQty.textContent = val + ' Hộp quà';
      if (summaryPrice) {
        const total = val * 600000;
        summaryPrice.textContent = total.toLocaleString('vi-VN') + 'đ';
      }
    });
  }

    } catch (err) {
      console.warn('Script execution notice:', err);
    }
  }, []);

  return (
    <main className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]"><div className="flex flex-col w-full">
{/* Subtle Ambient Glow */}
<div className="relative w-full max-w-7xl mx-auto px-margin pt-space-md pb-space-xl">
<div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-b from-secondary-fixed-dim/15 via-primary-fixed/20 to-transparent blur-3xl pointer-events-none -z-10"></div>
{/* Header & Breadcrumb */}
<header className="mb-space-lg">
<nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm mb-space-sm">
<a className="hover:text-primary transition-colors flex items-center gap-1" href="#">
<span className="material-symbols-outlined text-[16px]">home</span> Trang chủ
        </a>
<span className="text-outline-variant">/</span>
<span className="text-primary font-medium">Yêu cầu Báo giá B2B (RFQ)</span>
</nav>
<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md pb-space-md">
<div className="space-y-space-xs max-w-3xl">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed/50 text-secondary font-label-sm text-label-sm shadow-sm">
<span className="material-symbols-outlined text-[15px]" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
            Hệ thống Đấu thầu Minh bạch &amp; Chuẩn di sản
          </div>
<h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            Tạo Yêu Cầu Báo Giá Doanh Nghiệp (RFQ)
          </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">
            Nhận báo giá chiết khấu tối ưu và mẫu 3D dập logo nhận diện thương hiệu từ 50+ xưởng bánh di sản tuyển chọn chỉ sau 2 giờ.
          </p>
</div>
<div className="flex flex-wrap items-center gap-space-sm shrink-0">
<div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container shadow-sm">
<span className="material-symbols-outlined text-primary text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>lock</span>
<div className="flex flex-col text-left">
<span className="font-label-sm text-label-sm text-primary font-bold">Bảo Mật Thông Tin Thầu</span>
<span className="font-body-sm text-body-sm text-on-surface-variant leading-none">Chỉ xưởng đạt chuẩn tiếp cận</span>
</div>
</div>
<div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container shadow-sm">
<span className="material-symbols-outlined text-secondary text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<div className="flex flex-col text-left">
<span className="font-label-sm text-label-sm text-secondary font-bold">100% Miễn Phí Kết Nối</span>
<span className="font-body-sm text-body-sm text-on-surface-variant leading-none">Không phát sinh phụ phí</span>
</div>
</div>
</div>
</div>
</header>
{/* Visual Stepper Progress Bar */}
<div className="w-full bg-surface-container-low rounded-xl p-space-md mb-space-xl shadow-sm">
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
{/* Step 1 */}
<div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest shadow-sm">
<div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-title-sm text-title-sm font-bold shadow-sm">
            1
          </div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Bước 01 · Đang chọn</span>
<span className="font-title-sm text-title-sm text-on-surface truncate">Nhu cầu &amp; Dự toán ngân sách</span>
</div>
</div>
{/* Step 2 */}
<div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-high/40">
<div className="w-9 h-9 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-title-sm text-title-sm font-semibold">
            2
          </div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium tracking-wider">Bước 02</span>
<span className="font-title-sm text-title-sm text-on-surface-variant truncate">Tùy biến bao bì &amp; Khắc Logo</span>
</div>
</div>
{/* Step 3 */}
<div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-high/40">
<div className="w-9 h-9 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-title-sm text-title-sm font-semibold">
            3
          </div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium tracking-wider">Bước 03</span>
<span className="font-title-sm text-title-sm text-on-surface-variant truncate">Tiêu chuẩn xưởng &amp; Nhận mẫu</span>
</div>
</div>
</div>
</div>
{/* Main Content Workspace (Split Layout) */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
{/* Left Column: Primary RFQ Customization Form (8 cols) */}
<main className="lg:col-span-8 flex flex-col gap-space-lg">
{/* SECTION 1: Nhu cầu & Ngân sách */}
<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
<div className="flex items-center justify-between pb-space-xs">
<div className="flex items-center gap-space-sm">
<span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed font-title-sm text-title-sm font-bold">1</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-primary font-bold">Nhu cầu quà tặng &amp; Dự toán ngân sách</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Cung cấp thông tin chuẩn xác để xưởng cân đối tỷ lệ chiết khấu cao nhất.</p>
</div>
</div>
<span className="font-label-sm text-label-sm px-2.5 py-1 rounded bg-secondary-fixed/40 text-secondary uppercase font-semibold">Bắt buộc</span>
</div>
{/* Mục đích tặng */}
<div className="space-y-2">
<label className="font-title-sm text-title-sm text-on-surface block">Mục đích tặng quà chính của doanh nghiệp</label>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs" id="gift-purpose-group">
<button className="rfq-toggle-pill px-3 py-2.5 rounded-lg text-left bg-primary text-on-primary font-label-md text-label-md transition-all shadow-sm flex flex-col justify-between h-20 active" type="button">
<span className="material-symbols-outlined text-[20px]">workspace_premium</span>
<span>Đối tác VIP &amp; Cổ đông</span>
</button>
<button className="rfq-toggle-pill px-3 py-2.5 rounded-lg text-left bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-all flex flex-col justify-between h-20" type="button">
<span className="material-symbols-outlined text-[20px]">groups</span>
<span>Cán bộ &amp; Nhân viên</span>
</button>
<button className="rfq-toggle-pill px-3 py-2.5 rounded-lg text-left bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-all flex flex-col justify-between h-20" type="button">
<span className="material-symbols-outlined text-[20px]">loyalty</span>
<span>Khách hàng thân thiết</span>
</button>
<button className="rfq-toggle-pill px-3 py-2.5 rounded-lg text-left bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-all flex flex-col justify-between h-20" type="button">
<span className="material-symbols-outlined text-[20px]">celebration</span>
<span>Sự kiện Thu Tri ân</span>
</button>
</div>
</div>
{/* Số lượng hộp dự kiến */}
<div className="space-y-space-xs pt-2">
<div className="flex items-center justify-between">
<label className="font-title-sm text-title-sm text-on-surface">Số lượng set bánh dự kiến (Hộp)</label>
<span className="font-label-sm text-label-sm text-secondary font-semibold">Tự động áp dụng chiết khấu bậc thang B2B</span>
</div>
<div className="flex flex-col sm:flex-row items-center gap-space-sm">
<div className="relative w-full sm:w-48 shrink-0">
<input className="w-full h-11 px-3 bg-surface-container-low rounded-lg font-price-display text-price-display text-primary focus:outline-none focus:bg-surface-container-lowest text-center shadow-inner" id="quantity-input" max="10000" min="20" step="10" type="number" defaultValue="200"/>
<span className="absolute right-3 top-1/2 -translate-y-1/2 font-label-sm text-label-sm text-on-surface-variant pointer-events-none">Hộp</span>
</div>
<div className="flex flex-wrap gap-1.5 w-full">
<button className="px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors" onclick="setQty(50)" type="button">50 hộp</button>
<button className="px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors" onclick="setQty(150)" type="button">150 hộp</button>
<button className="px-3 py-2 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold shadow-sm" onclick="setQty(200)" type="button">200 hộp (Phổ biến)</button>
<button className="px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors" onclick="setQty(500)" type="button">500 hộp</button>
<button className="px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors" onclick="setQty(1000)" type="button">1.000+ hộp</button>
</div>
</div>
</div>
{/* Ngân sách trên mỗi hộp */}
<div className="space-y-space-xs pt-2">
<label className="font-title-sm text-title-sm text-on-surface block">Mức ngân sách dự trù cho mỗi hộp quà (VND)</label>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs">
<button className="budget-card p-3 rounded-lg text-left bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between" type="button">
<span className="font-label-sm text-label-sm text-on-surface-variant">Phổ thông tiêu chuẩn</span>
<span className="font-title-sm text-title-sm text-on-surface mt-1 font-bold">300k - 500k</span>
<span className="font-body-sm text-body-sm text-on-surface-variant/80 mt-1">Hộp 4 bánh mộc</span>
</button>
<button className="budget-card p-3 rounded-lg text-left bg-primary-container text-on-primary transition-all flex flex-col justify-between shadow-sm active" type="button">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-secondary-fixed">Trang trọng B2B</span>
<span className="material-symbols-outlined text-[16px]">check_circle</span>
</div>
<span className="font-title-sm text-title-sm text-on-primary mt-1 font-bold">600k - 850k</span>
<span className="font-body-sm text-body-sm text-surface-container-low mt-1">4 bánh + Hộp ép kim</span>
</button>
<button className="budget-card p-3 rounded-lg text-left bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between" type="button">
<span className="font-label-sm text-label-sm text-on-surface-variant">Cao cấp Đối tác</span>
<span className="font-title-sm text-title-sm text-on-surface mt-1 font-bold">900k - 1.500k</span>
<span className="font-body-sm text-body-sm text-on-surface-variant/80 mt-1">6 bánh + Trà Shan Tuyết</span>
</button>
<button className="budget-card p-3 rounded-lg text-left bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between" type="button">
<span className="font-label-sm text-label-sm text-secondary font-semibold">Thượng phẩm Hoàng gia</span>
<span className="font-title-sm text-title-sm text-secondary mt-1 font-bold">&gt; 1.500k / set</span>
<span className="font-body-sm text-body-sm text-on-surface-variant/80 mt-1">Sơn mài độc bản + Rượu</span>
</button>
</div>
</div>
{/* Khẩu vị / Phong cách nhân bánh */}
<div className="space-y-space-xs pt-2">
<label className="font-title-sm text-title-sm text-on-surface block">Gu ẩm thực &amp; Định hướng nhân bánh mong muốn</label>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
<label className="flex items-start gap-space-sm p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input defaultChecked className="mt-1 w-4 h-4 rounded text-primary accent-primary" type="checkbox"/>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">Truyền Thống Kinh Kỳ &amp; Cổ Truyền</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Thập cẩm xá xíu lạp xưởng Mai Quế Lộ, Sen nhuyễn Đầm Trị, Đậu xanh trứng muối.</span>
</div>
</label>
<label className="flex items-start gap-space-sm p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input defaultChecked className="mt-1 w-4 h-4 rounded text-primary accent-primary" type="checkbox"/>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">Healthy Dưỡng Sinh (Ít Ngọt / Vegan)</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Đường ăn kiêng Isomalt, hạt Macca, Óc chó đỏ, Tảo Spirulina thanh nhẹ tốt cho sức khỏe.</span>
</div>
</label>
<label className="flex items-start gap-space-sm p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input className="mt-1 w-4 h-4 rounded text-primary accent-primary" type="checkbox"/>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">Đương Đại Kết Hợp Trà &amp; Cà Phê</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Trà xanh matcha Uji, Cà phê Robusta Mộc Châu, Chocolate Lava tan chảy.</span>
</div>
</label>
<label className="flex items-start gap-space-sm p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input className="mt-1 w-4 h-4 rounded text-primary accent-primary" type="checkbox"/>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">Hải Vị Thượng Hạng &amp; Bào Ngư</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Bào ngư sốt XO, Vi cá hầm, Yến sào Khánh Hòa, Cua tuyết cao cấp thượng lưu.</span>
</div>
</label>
</div>
</div>
</section>
{/* SECTION 2: Tùy biến bao bì & In Logo */}
<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
<div className="flex items-center justify-between pb-space-xs">
<div className="flex items-center gap-space-sm">
<span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed font-title-sm text-title-sm font-bold">2</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-primary font-bold">Tùy biến bao bì &amp; Khắc chìm Logo Doanh nghiệp</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Khẳng định dấu ấn thương hiệu riêng trên từng hộp quà trao tặng đối tác.</p>
</div>
</div>
<span className="font-label-sm text-label-sm px-2.5 py-1 rounded bg-secondary-fixed/40 text-secondary uppercase font-semibold">Tùy Chọn B2B</span>
</div>
{/* Kiểu dáng hộp quà */}
<div className="space-y-space-xs">
<label className="font-title-sm text-title-sm text-on-surface block">Chất liệu &amp; Quy cách hộp mong muốn</label>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-xs">
<div className="box-spec-card p-3 rounded-lg bg-primary-container text-on-primary flex flex-col justify-between space-y-2 cursor-pointer shadow-sm">
<div className="flex items-center justify-between">
<span className="material-symbols-outlined text-[20px]">layers</span>
<span className="font-label-sm text-label-sm bg-surface-container-lowest/20 px-2 py-0.5 rounded text-white font-bold">Lựa chọn #1</span>
</div>
<div>
<h3 className="font-title-sm text-title-sm font-bold text-on-primary leading-tight">Hộp Giấy Mỹ Thuật Ép Kim</h3>
<p className="font-body-sm text-body-sm text-surface-container-low mt-1">Giấy Couche 1200gsm bồi nhung, dập nổi họa tiết gấm hoàng gia sang nhã.</p>
</div>
</div>
<div className="box-spec-card p-3 rounded-lg bg-surface-container hover:bg-surface-container-high flex flex-col justify-between space-y-2 cursor-pointer transition-colors">
<div className="flex items-center justify-between text-secondary">
<span className="material-symbols-outlined text-[20px]">draw</span>
<span className="font-label-sm text-label-sm bg-secondary-fixed px-2 py-0.5 rounded text-secondary font-bold">Di Sản</span>
</div>
<div>
<h3 className="font-title-sm text-title-sm font-semibold text-on-surface leading-tight">Hộp Sơn Mài Thủ Công</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Vỏ gỗ sơn mài then bóng cẩn ốc hoặc dát vàng lá tinh xảo lưu niệm trọn đời.</p>
</div>
</div>
<div className="box-spec-card p-3 rounded-lg bg-surface-container hover:bg-surface-container-high flex flex-col justify-between space-y-2 cursor-pointer transition-colors">
<div className="flex items-center justify-between text-on-surface-variant">
<span className="material-symbols-outlined text-[20px]">shelves</span>
</div>
<div>
<h3 className="font-title-sm text-title-sm font-semibold text-on-surface leading-tight">Hộp Ngăn Kéo 2 Tầng</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Thiết kế tủ cổ điển có khóa kim loại mạ đồng, kèm khay trà gốm mộc.</p>
</div>
</div>
<div className="box-spec-card p-3 rounded-lg bg-surface-container hover:bg-surface-container-high flex flex-col justify-between space-y-2 cursor-pointer transition-colors">
<div className="flex items-center justify-between text-on-surface-variant">
<span className="material-symbols-outlined text-[20px]">eco</span>
<span className="font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded font-bold">Eco-Friendly</span>
</div>
<div>
<h3 className="font-title-sm text-title-sm font-semibold text-on-surface leading-tight">Hộp Gỗ Thông Mộc Khắc Laser</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Gỗ thông tự nhiên nguyên khối phong cách mộc mạc, thân thiện môi trường.</p>
</div>
</div>
</div>
</div>
{/* Khu vực upload Logo & Giả lập Mockup Preview */}
<div className="p-space-md rounded-xl bg-surface-container-low space-y-space-sm">
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
<div>
<span className="font-title-sm text-title-sm text-on-surface font-semibold block">Đính kèm File Logo &amp; Bản vẽ nhận diện</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Hỗ trợ định dạng vector (.AI, .PDF, .EPS) hoặc ảnh nét trong suốt (.PNG)</span>
</div>
<span className="px-2.5 py-1 rounded bg-secondary-fixed/50 text-secondary font-label-sm text-label-sm font-semibold">Tặng miễn phí bản dựng 3D</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center">
{/* Upload Box */}
<div className="md:col-span-7 flex flex-col items-center justify-center p-space-md rounded-lg bg-surface-container-lowest text-center cursor-pointer hover:bg-surface-bright transition-colors">
<div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary mb-2">
<span className="material-symbols-outlined text-[26px]">cloud_upload</span>
</div>
<p className="font-label-md text-label-md text-on-surface font-semibold">Kéo thả file logo vào đây hoặc <span className="text-primary underline">chọn từ máy tính</span></p>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Dung lượng tối đa 25MB (Chúng tôi cam kết bảo mật quyền sở hữu trí tuệ)</p>
<div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-secondary text-[16px]">task_alt</span>
                  Đã tải lên: <span className="font-semibold text-on-surface">Vingroup_Brandmark_Gold_2024.ai (3.8MB)</span>
</div>
</div>
{/* Mockup Preview Box */}
<div className="md:col-span-5 rounded-lg overflow-hidden bg-surface-container-lowest p-space-sm flex flex-col items-center justify-center text-center shadow-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Mô Phỏng Ép Kim Lên Hộp</span>
<div className="relative w-full h-32 rounded-lg bg-gradient-to-tr from-primary via-primary-container to-primary-fixed-dim/60 p-4 flex flex-col items-center justify-center shadow-inner overflow-hidden">
<div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
{/* Gold foil logo mockup simulation */}
<div className="relative z-10 flex flex-col items-center">
<span className="material-symbols-outlined text-secondary-fixed text-[36px] drop-shadow-md">star_rate</span>
<span className="font-headline-sm text-headline-sm text-secondary-fixed font-bold tracking-widest drop-shadow">VINGROUP</span>
<span className="font-label-sm text-label-sm text-secondary-fixed/90 uppercase tracking-[0.2em] mt-0.5">TRÂN QUÝ TRI ÂN</span>
</div>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-2 italic">Hiệu ứng: Mạ nhũ vàng 24K vi tính dập nổi 0.5mm</span>
</div>
</div>
{/* Tùy chọn in thiệp & Ruy băng */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs pt-2">
<label className="flex items-center gap-space-sm p-2.5 rounded-lg bg-surface-container-lowest cursor-pointer shadow-sm">
<input defaultChecked className="w-4 h-4 rounded text-primary accent-primary" type="checkbox"/>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">In thiệp chúc mừng riêng từng hộp</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Giấy conqueror mỹ thuật, in sẵn lời chúc của Ban Lãnh Đạo</span>
</div>
</label>
<label className="flex items-center gap-space-sm p-2.5 rounded-lg bg-surface-container-lowest cursor-pointer shadow-sm">
<input defaultChecked className="w-4 h-4 rounded text-primary accent-primary" type="checkbox"/>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">Tùy biến dải Ruy-băng nhận diện</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Dệt lụa theo chuẩn mã màu thương hiệu Pantone của công ty</span>
</div>
</label>
</div>
</div>
</section>
{/* SECTION 3: Yêu cầu giao nhận & Tiêu chí xưởng bánh */}
<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
<div className="flex items-center justify-between pb-space-xs">
<div className="flex items-center gap-space-sm">
<span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed font-title-sm text-title-sm font-bold">3</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-primary font-bold">Tiêu chuẩn xưởng &amp; Kế hoạch phân phối</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Đảm bảo bánh tươi mới đúng hẹn và đáp ứng quy chuẩn thu mua nghiêm ngặt.</p>
</div>
</div>
<span className="font-label-sm text-label-sm px-2.5 py-1 rounded bg-secondary-fixed/40 text-secondary uppercase font-semibold">Tiến Độ</span>
</div>
{/* Thời gian và Địa điểm giao */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
<div className="space-y-1">
<label className="font-title-sm text-title-sm text-on-surface block">Thời điểm giao hàng mong muốn</label>
<div className="relative">
<input className="w-full h-11 px-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-inner" type="text" defaultValue="Giao trước 12/08 Âm lịch (Cách Rằm 3 ngày)"/>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">calendar_month</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Khuyến nghị: Nhận bánh trước Rằm 3-5 ngày để bánh đạt độ tươm dầu ngon nhất.</p>
</div>
<div className="space-y-1">
<label className="font-title-sm text-title-sm text-on-surface block">Phương thức phân phối giao nhận</label>
<div className="relative">
<select className="w-full h-11 px-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-inner cursor-pointer appearance-none">
<option selected="">Giao tập trung về 02 kho tổng (Hà Nội &amp; TP.HCM)</option>
<option>Giao đa điểm về từng chi nhánh (Đính kèm danh sách Excel)</option>
<option>Giao trực tiếp đến từng địa chỉ nhà cán bộ nhân viên</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">expand_more</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Nguyệt Phố hỗ trợ điều phối vận chuyển xe thùng lạnh chuyên dụng.</p>
</div>
</div>
{/* Tiêu chuẩn xưởng bánh bắt buộc */}
<div className="space-y-space-xs pt-2">
<label className="font-title-sm text-title-sm text-on-surface block">Chứng chỉ &amp; Điều kiện xưởng tham gia gửi báo giá</label>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
<label className="flex items-center gap-space-sm p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input defaultChecked className="w-4 h-4 rounded text-primary accent-primary" type="checkbox"/>
<span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
<span className="font-label-md text-label-md text-on-surface">Đạt chuẩn an toàn vệ sinh ISO 22000 / HACCP</span>
</label>
<label className="flex items-center gap-space-sm p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input defaultChecked className="w-4 h-4 rounded text-primary accent-primary" type="checkbox"/>
<span className="material-symbols-outlined text-secondary text-[20px]">receipt_long</span>
<span className="font-label-md text-label-md text-on-surface">Xuất hóa đơn GTGT (VAT 100%) hợp pháp</span>
</label>
<label className="flex items-center gap-space-sm p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input defaultChecked className="w-4 h-4 rounded text-primary accent-primary" type="checkbox"/>
<span className="material-symbols-outlined text-secondary text-[20px]">local_shipping</span>
<span className="font-label-md text-label-md text-on-surface">Hỗ trợ gửi mẫu thử nếm (Sampling) tận văn phòng</span>
</label>
<label className="flex items-center gap-space-sm p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input defaultChecked className="w-4 h-4 rounded text-primary accent-primary" type="checkbox"/>
<span className="material-symbols-outlined text-secondary text-[20px]">history_edu</span>
<span className="font-label-md text-label-md text-on-surface">Nghệ nhân gia truyền hoặc thương hiệu trên 10 năm</span>
</label>
</div>
</div>
{/* Thông tin cán bộ thu mua liên hệ */}
<div className="space-y-space-xs pt-2">
<label className="font-title-sm text-title-sm text-on-surface block">Thông tin liên hệ nhận danh sách chào thầu</label>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs">
<input className="h-11 px-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-inner" placeholder="Họ và tên người phụ trách" type="text" defaultValue="Trần Đình Khang"/>
<input className="h-11 px-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-inner" placeholder="Số điện thoại B2B" type="tel" defaultValue="0918 293 888"/>
<input className="h-11 px-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-inner" placeholder="Email công ty" type="email" defaultValue="khang.td@vingroup.net"/>
</div>
</div>
</section>
</main>
{/* Right Column: Live Floating Quote Estimator & Action Dock (4 cols) */}
<aside className="lg:col-span-4 sticky top-24 space-y-space-md">
{/* Live Calculation Card */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md space-y-space-md">
<div className="flex items-center justify-between pb-space-xs">
<span className="font-headline-sm text-headline-sm text-primary font-bold">Bảng Ước Tính RFQ</span>
<span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">B2B TIER-2</span>
</div>
{/* Visual Breakdown Data */}
<div className="space-y-space-xs">
<div className="flex justify-between items-center py-1">
<span className="font-body-md text-body-md text-on-surface-variant">Số lượng đăng ký:</span>
<span className="font-title-sm text-title-sm text-on-surface font-bold" id="summary-qty">200 Hộp quà</span>
</div>
<div className="flex justify-between items-center py-1">
<span className="font-body-md text-body-md text-on-surface-variant">Phân khúc đơn giá:</span>
<span className="font-body-md text-body-md text-on-surface font-semibold">600.000đ - 850.000đ</span>
</div>
<div className="flex justify-between items-center py-1 text-primary">
<span className="font-body-md text-body-md font-medium">Chiết khấu sàn B2B:</span>
<span className="font-title-sm text-title-sm font-bold">-25% (Tiết kiệm tối đa)</span>
</div>
<div className="flex justify-between items-center py-1 text-secondary">
<span className="font-body-md text-body-md font-medium">Phí gia công in ép kim:</span>
<span className="font-title-sm text-title-sm font-bold">0đ (Tài trợ 100%)</span>
</div>
</div>
{/* Perks Included List */}
<div className="p-space-sm rounded-lg bg-surface-container-low space-y-2">
<span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider block">Đặc Quyền Kèm Theo Cho Đơn RFQ Này:</span>
<ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface">
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[16px]">check</span>
<span>Miễn phí dập logo kim loại (Trị giá 3.500.000đ)</span>
</li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[16px]">check</span>
<span>Miễn phí 200 thiệp chúc mừng thiết kế riêng</span>
</li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[16px]">check</span>
<span>Gửi mẫu bánh ăn thử miễn phí tận tay trước ký kết</span>
</li>
</ul>
</div>
{/* Total Estimation */}
<div className="pt-2">
<div className="flex items-baseline justify-between mb-1">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Tổng ngân sách dự trù (sau giảm):</span>
</div>
<div className="flex items-baseline gap-2">
<span className="font-price-display text-[32px] text-primary font-bold leading-none" id="summary-price">120.000.000đ</span>
<span className="font-body-sm text-body-sm text-on-surface-variant line-through">160.000.000đ</span>
</div>
<span className="font-body-sm text-body-sm text-secondary font-medium block mt-1">Tiết kiệm dự kiến: ~40.000.000đ</span>
</div>
{/* Primary CTA Button */}
<div className="pt-space-xs space-y-2">
<button className="w-full py-3.5 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm font-bold transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2" type="button">
<span className="material-symbols-outlined text-[20px]">send</span>
<span>Gửi RFQ Đến 50+ Xưởng Bánh</span>
</button>
<p className="font-body-sm text-body-sm text-center text-on-surface-variant">Báo giá cạnh tranh kèm demo 3D gửi về sau 2 giờ</p>
</div>
{/* Escrow & Trust Badges */}
<div className="pt-space-xs space-y-2">
<div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-surface-container">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">verified_user</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-primary font-bold">Bảo Trợ Nguyệt Phố SafeTrade</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Giữ tiền thanh toán trung gian, chỉ chuyển khoản cho xưởng khi quý công ty nghiệm thu đủ chất lượng.</span>
</div>
</div>
<div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-surface-container">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">support_agent</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary font-bold">Chuyên Viên B2B Đồng Hành 1-1</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Hỗ trợ hợp đồng kinh tế, thủ tục hóa đơn và theo dõi tiến độ sản xuất 24/7.</span>
</div>
</div>
</div>
</div>
{/* Direct Atelier Concierge Callout */}
<div className="bg-gradient-to-br from-tertiary-container to-tertiary text-on-tertiary rounded-xl p-space-md shadow-sm space-y-2">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary-fixed text-[24px]">call_quality</span>
<span className="font-title-sm text-title-sm font-bold text-white">Bạn Cần Báo Giá Gấp Trong 30 Phút?</span>
</div>
<p className="font-body-sm text-body-sm text-surface-container-high/90">
            Gọi ngay đường dây nóng dành riêng cho Giám đốc Mua hàng &amp; Trưởng phòng Nhân sự B2B:
          </p>
<div className="flex items-baseline justify-between pt-1">
<span className="font-headline-sm text-headline-sm text-secondary-fixed font-bold">1800 6886</span>
<span className="font-label-sm text-label-sm text-surface-container-high uppercase tracking-widest">(Miễn cước 24/7)</span>
</div>
</div>
</aside>
</div>
{/* Section: Accordion FAQ (Frequently Asked Questions) */}
<section className="mt-space-xl pt-space-lg">
<div className="text-center max-w-2xl mx-auto mb-space-md">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold block mb-1">Giải Đáp Thắc Mắc</span>
<h2 className="font-headline-md text-headline-md text-primary font-bold">Câu hỏi thường gặp về Đặt hàng B2B</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Thông tin chi tiết về chính sách mẫu thử, quy trình ký kết và bảo hành chất lượng bánh.</p>
</div>
<div className="max-w-4xl mx-auto space-y-space-xs">
{/* FAQ 1 */}
<div className="faq-item rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all">
<button className="faq-toggle w-full flex items-center justify-between text-left focus:outline-none" type="button">
<span className="font-title-sm text-title-sm text-on-surface font-semibold">1. Quy trình gửi mẫu thử nếm bánh (Sampling) diễn ra như thế nào?</span>
<span className="material-symbols-outlined text-primary text-[22px] transition-transform duration-200">expand_more</span>
</button>
<div className="faq-content mt-2 text-on-surface-variant font-body-md text-body-md">
            Sau khi nhận được RFQ, các xưởng bánh có năng lực phù hợp nhất sẽ chuẩn bị set mẫu gồm 2 - 4 vị bánh tiêu biểu cùng mẫu vỏ hộp thực tế để gửi chuyển phát nhanh hỏa tốc đến tận bàn làm việc của bạn hoàn toàn miễn phí.
          </div>
</div>
{/* FAQ 2 */}
<div className="faq-item rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all">
<button className="faq-toggle w-full flex items-center justify-between text-left focus:outline-none" type="button">
<span className="font-title-sm text-title-sm text-on-surface font-semibold">2. Công ty có được kiểm tra bánh trước khi thanh toán hợp đồng không?</span>
<span className="material-symbols-outlined text-primary text-[22px] transition-transform duration-200">expand_more</span>
</button>
<div className="faq-content mt-2 text-on-surface-variant font-body-md text-body-md">
            Có. Với giải pháp SafeTrade Escrow, tiền cọc và thanh toán của doanh nghiệp được giữ an toàn trên sàn Nguyệt Phố. Chỉ khi bộ phận kho vận của bạn ký biên bản bàn giao kiểm định đúng số lượng, date bánh mới sản xuất và vỏ hộp nguyên vẹn thì sàn mới thực hiện giải ngân cho xưởng.
          </div>
</div>
{/* FAQ 3 */}
<div className="faq-item rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all">
<button className="faq-toggle w-full flex items-center justify-between text-left focus:outline-none" type="button">
<span className="font-title-sm text-title-sm text-on-surface font-semibold">3. Thời gian gia công in ép kim logo và hoàn thiện đơn hàng mất bao lâu?</span>
<span className="material-symbols-outlined text-primary text-[22px] transition-transform duration-200">expand_more</span>
</button>
<div className="faq-content mt-2 text-on-surface-variant font-body-md text-body-md">
            Thông thường đơn hàng từ 100 - 1.000 hộp có logo riêng mất từ 3 - 5 ngày để hoàn thiện khuôn kẽm ép kim và đóng gói. Đối với các đơn hàng gấp dịp cận rằm, xưởng trong liên minh Nguyệt Phố có thể ưu tiên dây chuyền xử lý hỏa tốc trong vòng 48 giờ.
          </div>
</div>
{/* FAQ 4 */}
<div className="faq-item rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all">
<button className="faq-toggle w-full flex items-center justify-between text-left focus:outline-none" type="button">
<span className="font-title-sm text-title-sm text-on-surface font-semibold">4. Doanh nghiệp có được hỗ trợ xuất đầy đủ hóa đơn đỏ VAT không?</span>
<span className="material-symbols-outlined text-primary text-[22px] transition-transform duration-200">expand_more</span>
</button>
<div className="faq-content mt-2 text-on-surface-variant font-body-md text-body-md">
            100% xưởng bánh trên hệ thống Nguyệt Phố đều là pháp nhân doanh nghiệp hợp pháp, cam kết xuất hóa đơn điện tử VAT đầy đủ theo đúng mã ngành hàng thực phẩm quà biếu, kèm theo đầy đủ hồ sơ công bố chất lượng và chứng nhận an toàn thực phẩm.
          </div>
</div>
</div>
</section>
</div>
</div>
</main>
  );
}
