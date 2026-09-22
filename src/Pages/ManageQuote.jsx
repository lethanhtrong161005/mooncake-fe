import React, { useEffect } from 'react';

export default function ManageQuote({ onNavigate }) {

  useEffect(() => {
    try {
      
    function selectVendor(name, price) {
      const modal = document.getElementById('selectionModal');
      const vendorNameEl = document.getElementById('modalVendorName');
      const vendorPriceEl = document.getElementById('modalVendorPrice');
      const vendorDepositEl = document.getElementById('modalVendorDeposit');
      const modalDescEl = document.getElementById('modalDescription');

      if (vendorNameEl) vendorNameEl.innerText = name;
      if (vendorPriceEl) vendorPriceEl.innerText = price;
      
      // Calculate 30% deposit approximation
      let numericVal = parseInt(price.replace(/\D/g, '')) || 120000000;
      let deposit = Math.round(numericVal * 0.3);
      if (vendorDepositEl) vendorDepositEl.innerText = deposit.toLocaleString('vi-VN') + 'đ';

      if (modalDescEl) {
        modalDescEl.innerText = 'Hệ thống sẽ khóa 3 hồ sơ còn lại và chuyển sang trạng thái khởi tạo Hợp đồng điện tử kèm quy chế bảo hiểm mẫu thử của Nguyệt Phố.';
      }

      if (modal) modal.classList.remove('hidden');
    }

    function closeModal() {
      const modal = document.getElementById('selectionModal');
      if (modal) modal.classList.add('hidden');
    }

    function confirmSelection() {
      alert('Đang tiến hành tạo mã Hợp đồng điện tử và kết nối cổng ký quỹ SafeTrade Escrow...');
      closeModal();
    }
  
    } catch (err) {
      console.warn('Script execution notice:', err);
    }
  }, []);

  return (
    <main className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]"><div className="flex flex-col w-full">
{/* Subtle Ambient Glow Canvas */}
<div className="relative w-full overflow-hidden bg-surface pb-16">
<div className="absolute -top-32 right-12 w-96 h-96 bg-secondary-fixed/20 rounded-full blur-3xl pointer-events-none"></div>
<div className="absolute top-80 -left-20 w-80 h-80 bg-primary-fixed/25 rounded-full blur-3xl pointer-events-none"></div>
<div className="max-w-7xl mx-auto px-margin pt-6">
{/* 1. HEADER & BREADCRUMB */}
<nav className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant mb-4">
<a className="hover:text-primary transition-colors flex items-center gap-1" href="#">
<span className="material-symbols-outlined text-[16px]">home</span>
          Trang chủ
        </a>
<span className="text-outline-variant">/</span>
<a className="hover:text-primary transition-colors" href="#">Quản lý Đấu thầu B2B</a>
<span className="text-outline-variant">/</span>
<span className="text-primary font-semibold">Chi tiết RFQ #RFQ-2024-8892</span>
</nav>
{/* Main Header Bar */}
<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
<div className="space-y-2">
<div className="flex items-center gap-3 flex-wrap">
<span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold inline-flex items-center gap-1.5 shadow-sm">
<span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              Đang mở nhận thầu (Còn 18 giờ)
            </span>
<span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
              Mã hồ sơ: RFQ-2024-8892
            </span>
<span className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">verified</span>
              Xác thực Doanh nghiệp VIP
            </span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Quản lý Báo giá &amp; So sánh Thầu
          </h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
            Đối chiếu minh bạch báo giá, năng lực sản xuất và điều khoản hợp đồng từ các xưởng bánh nghệ nhân đạt chuẩn kiểm định.
          </p>
</div>
{/* Action Buttons */}
<div className="flex items-center gap-3 shrink-0 flex-wrap">
<button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all text-label-md font-label-md shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">edit_note</span>
            Chỉnh sửa yêu cầu
          </button>
<button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all text-label-md font-label-md shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">table_view</span>
            Xuất file Excel so sánh
          </button>
<button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-surface-container-lowest text-outline hover:text-error hover:bg-error-container/30 transition-all text-label-md font-label-md shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">lock_clock</span>
            Đóng thầu sớm
          </button>
</div>
</div>
{/* Live Count Down & Project Summary Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
{/* Quy mô & Dự toán */}
<div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between text-secondary mb-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider">Dự toán &amp; Quy mô</span>
<span className="material-symbols-outlined text-[20px]">payments</span>
</div>
<div>
<div className="font-headline-md text-headline-md text-primary font-bold">200 Hộp Quà</div>
<div className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Ngân sách: <span className="font-semibold text-on-surface">120M - 160M VNĐ</span>
</div>
</div>
<div className="mt-3 pt-3 bg-surface-container-low rounded-lg px-2.5 py-1.5 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span>Định mức trần / set:</span>
<span className="font-semibold text-primary">800.000đ</span>
</div>
</div>
{/* Quy cách bao bì */}
<div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between text-secondary mb-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider">Bao bì &amp; Thiết kế</span>
<span className="material-symbols-outlined text-[20px]">package_2</span>
</div>
<div>
<div className="font-title-md text-title-md text-on-surface font-semibold line-clamp-1">Giấy Mỹ Thuật Ép Kim 24K</div>
<div className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Khắc chìm logo doanh nghiệp Vingroup
            </div>
</div>
<div className="mt-3 pt-3 bg-surface-container-low rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
<span>Yêu cầu dập nổi khay cao cấp</span>
</div>
</div>
{/* Tiến độ nhận hàng */}
<div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between text-secondary mb-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider">Tiến độ giao nhận</span>
<span className="material-symbols-outlined text-[20px]">local_shipping</span>
</div>
<div>
<div className="font-title-md text-title-md text-on-surface font-semibold">Trước 12/08 Âm Lịch</div>
<div className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Giao song song Hà Nội &amp; TP.HCM
            </div>
</div>
<div className="mt-3 pt-3 bg-surface-container-low rounded-lg px-2.5 py-1.5 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span>Yêu cầu giao mẫu:</span>
<span className="font-semibold text-secondary">Trước 24h</span>
</div>
</div>
{/* Tình trạng phản hồi */}
<div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between text-secondary mb-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider">Phản hồi Báo giá</span>
<span className="material-symbols-outlined text-[20px]">quickreply</span>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-headline-md text-headline-md text-tertiary font-bold">4/8</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">xưởng đã nộp hồ sơ</span>
</div>
{/* Progress Bar */}
<div className="w-full bg-surface-container-highest h-2 rounded-full mt-2 overflow-hidden">
<div className="bg-tertiary h-full rounded-full transition-all duration-500" style={{"width":"50%"}}></div>
</div>
</div>
<div className="mt-3 pt-3 bg-secondary-fixed/40 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-on-secondary-fixed font-label-sm text-label-sm">
<span>Đã khóa 3 báo giá cạnh tranh nhất</span>
<span className="material-symbols-outlined text-[16px]">stars</span>
</div>
</div>
</div>
{/* 2. AI SMART INSIGHT BANNER */}
<section className="relative rounded-2xl p-6 mb-10 overflow-hidden bg-gradient-to-r from-primary-container via-primary to-primary-container text-on-primary shadow-xl">
<div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none">
<span className="material-symbols-outlined text-[220px]">auto_awesome</span>
</div>
<div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
<div className="space-y-2 max-w-4xl">
<div className="flex items-center gap-2 font-label-sm text-label-sm tracking-wider uppercase text-secondary-fixed">
<span className="material-symbols-outlined text-[18px]">auto_awesome</span>
<span>Nguyệt Phố AI Procurement Intelligence™</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container-lowest/20 backdrop-blur-md text-[10px] text-white">Khuyến nghị độc quyền</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-primary font-bold leading-tight">
              Phân tích tổng hợp: Tối ưu chi phí từ Madame Hương &amp; Đẳng cấp di sản từ Hưng Ký
            </h2>
<p className="font-body-md text-body-md text-on-primary-container/90 leading-relaxed">
              Dựa trên ngân sách mục tiêu 120M - 160M VNĐ và yêu cầu 200 suất VIP: <strong className="text-white">Madame Hương</strong> đem lại mức tối ưu ngân sách tốt nhất (tiết kiệm 42.000.000đ, giao sớm 2 ngày). Nếu dự án hướng đến đối tác HĐQT ngoại giao cao cấp nhất, <strong className="text-white">Nghệ Nhân Hưng Ký 1954</strong> dẫn đầu về độ hoàn thiện chi tiết dát vàng 24K và điểm uy tín 5.0/5.
            </p>
</div>
<div className="flex flex-row lg:flex-col items-center gap-3 shrink-0">
<button className="w-full lg:w-auto px-4 py-2.5 rounded-lg bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed transition-colors font-title-sm text-title-sm flex items-center justify-center gap-2 shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">analytics</span>
              Xem báo cáo thẩm định AI (PDF)
            </button>
<span className="font-label-sm text-label-sm text-on-primary-container/80 text-center">Đã đối soát ISO/HACCP &amp; tồn kho</span>
</div>
</div>
</section>
{/* SECTION TITLE */}
<div className="flex items-center justify-between mb-6">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">RFQ Comparison Matrix</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Đối Chiếu Trực Tiếp 3 Nhà Thầu Dẫn Đầu</h2>
</div>
<div className="hidden sm:flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm bg-surface-container-low px-3 py-1.5 rounded-lg">
<span className="material-symbols-outlined text-[16px] text-secondary">security</span>
          Bảo chứng thanh toán tạm giữ SafeTrade Escrow
        </div>
</div>
{/* 3. COMPARISON GRID (3 CARDS) */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 items-stretch">
{/* SUPPLIER 1: MADAME HƯƠNG BAKERY */}
<div className="rounded-2xl bg-surface-container-lowest shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group">
<div className="p-6">
{/* Badge */}
<div className="flex items-center justify-between mb-4">
<span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold tracking-wide inline-flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[14px]">price_check</span>
                Giá Tốt Nhất &amp; Đầy Đủ Cam Kết
              </span>
<span className="text-primary text-label-sm font-label-sm font-bold bg-primary-fixed/40 px-2.5 py-0.5 rounded">Chiết khấu 26%</span>
</div>
{/* Atelier Header */}
<div className="flex items-center gap-3.5 mb-4">
<img className="w-12 h-12 rounded-xl object-cover shadow-inner" data-alt="Madame Huong artisan bakery logo in elegant Hanoi french colonial style with gold accents on clean cream ground" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXs9WXs7G95o0sRIjKhf76NrPATJJ8vGXaK0HFj3YSC2UDEpFAu0xlEtIFUqDJ8rycoUAyrrg-y2B-6gX4jFMuGMKusPUcTe0vxPBitgyEVFpWLu0mWtxN-tuSuO74RJoviPYtBo1g6wA6p3y5OfuZ3_yr_vMSQ76LPIu_q6dsFE9JPDsGOaYoPttZyk-lQcgPLAH9t5OOCh_a4Ix6XgFKY5QVggHsfbEFYpw9U2ZUil-jwMZ4sc4MCg"/>
<div>
<h3 className="font-title-md text-title-md text-on-surface font-bold leading-tight">Madame Hương Bakery</h3>
<div className="flex items-center gap-1.5 mt-0.5">
<span className="material-symbols-outlined text-[16px] text-secondary" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-title-sm text-title-sm text-on-surface font-bold">4.9</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">(410 đánh giá • 99.4% đúng hẹn)</span>
</div>
</div>
</div>
{/* Financials Highlight Box */}
<div className="p-4 rounded-xl bg-surface-container-low mb-5">
<div className="text-on-surface-variant font-label-sm text-label-sm">Đơn giá dự thầu trọn gói:</div>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-headline-lg text-headline-lg text-primary font-bold">590.000đ</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">/ hộp quà VIP</span>
</div>
<div className="flex items-center justify-between pt-2 mt-2 bg-surface-container-lowest/70 rounded-md px-2.5 py-1 text-label-sm font-label-sm">
<span className="text-on-surface">Tổng thanh toán: <strong className="text-on-surface font-bold">118.000.000đ</strong></span>
<span className="text-tertiary font-semibold">-42.000.000đ</span>
</div>
</div>
{/* Product Showcase Micro Preview */}
<div className="mb-5 rounded-xl overflow-hidden bg-surface-container-high relative h-40 group-hover:brightness-105 transition-all">
<img className="w-full h-full object-cover" data-alt="Luxury corporate mid autumn festival mooncake gift box by Madame Huong, red textured fine art paper with 24K gold foil stamping and neat arrangement of 4 artisanal mooncakes with jasmine tea" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDEGeNMkx_U2--M6qrDOLzm3coCkNubOh14uwIvmo178WnpVieL96g5sxcxb2tnhQua3r5fUmxwozd3BJhDtJ4TGPdWXjLqKV0GPbJM0vSk6MJRw3Sl9oZxL7fx3_yejDnGxrGWTSNaZi6k6b7SOYD6nPXqxeXEJCEmGRUk0snw3dmuo5KEHlSu8yUDS-5EizqErMEXzcyP-Mq8sNmlWLaCrgab_VrUonu0cY_L2-XInal7VW9jRGZFA"/>
<div className="absolute bottom-2 left-2 right-2 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg flex items-center justify-between text-body-sm font-body-sm text-on-surface">
<span className="line-clamp-1 font-medium">Hộp Vọng Nguyệt Sơn Mài Đỏ</span>
<button className="text-primary font-semibold text-label-sm hover:underline shrink-0 flex items-center" type="button">
                  3D View <span className="material-symbols-outlined text-[14px]">view_in_ar</span>
</button>
</div>
</div>
{/* Detailed Criteria Bullet Points */}
<div className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">verified_user</span>
<div>
<strong className="text-on-surface font-medium">Bao bì &amp; Dập logo:</strong> Hộp Giấy mỹ thuật ép kim đồng bộ, <span className="text-primary font-medium">miễn phí khuôn dập logo nổi Vingroup</span>.
                </div>
</div>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">timer</span>
<div>
<strong className="text-on-surface font-medium">Thời gian gửi mẫu (Sampling):</strong> <span className="text-on-surface font-semibold">24 giờ</span> giao trực tiếp văn phòng thu mua.
                </div>
</div>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">local_shipping</span>
<div>
<strong className="text-on-surface font-medium">Cam kết giao hàng:</strong> Ngày 10/08 Âm lịch (<span className="text-tertiary font-semibold">Sớm hơn tiến độ 2 ngày</span>).
                </div>
</div>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">account_balance_wallet</span>
<div>
<strong className="text-on-surface font-medium">Thanh toán:</strong> Cọc 30% qua Nguyệt Phố SafeTrade, 70% sau khi nghiệm thu kho.
                </div>
</div>
</div>
</div>
{/* Card CTA Action Area */}
<div className="p-6 pt-0 mt-4 flex flex-col gap-2.5">
<button className="w-full py-3 px-4 rounded-lg bg-primary text-on-primary font-title-sm text-title-sm font-semibold hover:bg-primary-container transition-all active:scale-[0.99] shadow-md flex items-center justify-center gap-2" onclick="selectVendor('Madame Hương Bakery', '118.000.000đ')" type="button">
<span className="material-symbols-outlined text-[20px]">check_circle</span>
              Chọn Nhà Thầu Này
            </button>
<div className="grid grid-cols-2 gap-2">
<button className="py-2 px-3 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5" type="button">
<span className="material-symbols-outlined text-[16px]">chat</span>
                Thương lượng
              </button>
<button className="py-2 px-3 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5" type="button">
<span className="material-symbols-outlined text-[16px]">visibility</span>
                Hồ sơ xưởng
              </button>
</div>
</div>
</div>
{/* SUPPLIER 2: NGHỆ NHÂN HƯNG KÝ 1954 (FEATURED PREMIUM) */}
<div className="rounded-2xl bg-surface-container-lowest shadow-xl flex flex-col justify-between overflow-hidden relative transform lg:-translate-y-2">
{/* Top Accent Ribbon */}
<div className="w-full bg-secondary text-on-secondary py-1.5 px-4 text-center font-label-sm text-label-sm font-semibold tracking-wider flex items-center justify-center gap-1.5">
<span className="material-symbols-outlined text-[16px]">workspace_premium</span>
            LỰA CHỌN THƯỢNG HẠNG CHO ĐỐI TÁC CẤP CAO
          </div>
<div className="p-6">
{/* Badge */}
<div className="flex items-center justify-between mb-4">
<span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold tracking-wide inline-flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[14px]">military_tech</span>
                Di Sản 70 Năm • Uy Tín 5.0/5
              </span>
<span className="text-secondary text-label-sm font-label-sm font-bold bg-secondary-fixed/50 px-2.5 py-0.5 rounded">Chiết khấu 20%</span>
</div>
{/* Atelier Header */}
<div className="flex items-center gap-3.5 mb-4">
<img className="w-12 h-12 rounded-xl object-cover shadow-inner" data-alt="Hung Ky 1954 heritage artisanal mooncake atelier emblem Saigon vintage traditional luxury crest warm gold and vermilion" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrM2u6w3708yykmR_c8arNaO9qPLeIs5Xs3nGfD0_JMErGrMnskceaysORxP8U8oX6Jdx3U1bGLiAdWxzjrMDV-cRdUGwyVKgdn5QGYu8ms95KfIS-Be-g93ybWmuLp7FH5xqcxgDmlftpSAwS3UgVSyV927KG5ejS1QPc9pesjn_ohCHgc5CeA0cSQdzeapd6GV9VIQiEdM_BUnrcuvDLzrMOdZn2CISW9PvcIsQIb4zkE0edfHZPGg"/>
<div>
<h3 className="font-title-md text-title-md text-on-surface font-bold leading-tight">Nghệ Nhân Hưng Ký 1954</h3>
<div className="flex items-center gap-1.5 mt-0.5">
<span className="material-symbols-outlined text-[16px] text-secondary" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-title-sm text-title-sm text-on-surface font-bold">5.0</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">(390 đánh giá • 100% đúng hạn)</span>
</div>
</div>
</div>
{/* Financials Highlight Box */}
<div className="p-4 rounded-xl bg-surface-container-low mb-5">
<div className="text-on-surface-variant font-label-sm text-label-sm">Đơn giá dự thầu trọn gói:</div>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-headline-lg text-headline-lg text-primary font-bold">720.000đ</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">/ hộp quà VIP</span>
</div>
<div className="flex items-center justify-between pt-2 mt-2 bg-surface-container-lowest/70 rounded-md px-2.5 py-1 text-label-sm font-label-sm">
<span className="text-on-surface">Tổng thanh toán: <strong className="text-on-surface font-bold">144.000.000đ</strong></span>
<span className="text-secondary font-semibold">Đúng khung ngân sách</span>
</div>
</div>
{/* Product Showcase Micro Preview */}
<div className="mb-5 rounded-xl overflow-hidden bg-surface-container-high relative h-40">
<img className="w-full h-full object-cover" data-alt="Nghệ Nhân Hưng Ký 1954 royal mid autumn mooncake hamper with gold brocade fabric lining, intricate lacquer carving and embossed 24K gold foil emblem" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0QTRnAvgABjcqIrb7DU1em6hmE5evE5MxXodQLlJY0mPEnDC1AEt4FwzmwWvgcb5SbQb4lQOZ9S6T-wIC4XoQeeJXOoe_ptqxetksZ1yAxMQVjTcnFvW3-wctfiu52Ki5GPKSI9oAocBF-bRw9gqjgkOjD6Cr0IFszXCu7ymf1g4i6R-liHVCz5sifYVqKuyKdLX_xh8HMr60XOF-3Pt2cFYNL_lzAgB445XsjzDUZDj0JfyP926eFQ"/>
<div className="absolute bottom-2 left-2 right-2 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg flex items-center justify-between text-body-sm font-body-sm text-on-surface">
<span className="line-clamp-1 font-medium">Hộp Gấm Hoàng Triều Cung Đình</span>
<button className="text-primary font-semibold text-label-sm hover:underline shrink-0 flex items-center" type="button">
                  3D View <span className="material-symbols-outlined text-[14px]">view_in_ar</span>
</button>
</div>
</div>
{/* Detailed Criteria Bullet Points */}
<div className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">palette</span>
<div>
<strong className="text-on-surface font-medium">Bao bì &amp; Dát vàng:</strong> Nâng cấp miễn phí lớp <span className="text-secondary font-semibold">lụa gấm vàng hoàng gia</span>, logo dát vàng lá 24K thủ công.
                </div>
</div>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">inventory_2</span>
<div>
<strong className="text-on-surface font-medium">Thời gian gửi mẫu:</strong> <span className="text-on-surface font-semibold">48 giờ</span> kèm hộp mẫu thật hoàn thiện 100%.
                </div>
</div>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">timeline</span>
<div>
<strong className="text-on-surface font-medium">Kế hoạch giao hàng:</strong> Đợt 1 ngày 08/08 Âm lịch, Đợt 2 ngày 11/08 Âm lịch tại 2 kho.
                </div>
</div>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">verified</span>
<div>
<strong className="text-on-surface font-medium">Đặc quyền nghệ nhân:</strong> Kèm thư tay chúc mừng có con dấu son mộc truyền thống.
                </div>
</div>
</div>
</div>
{/* Card CTA Action Area */}
<div className="p-6 pt-0 mt-4 flex flex-col gap-2.5">
<button className="w-full py-3 px-4 rounded-lg bg-primary text-on-primary font-title-sm text-title-sm font-semibold hover:bg-primary-container transition-all active:scale-[0.99] shadow-md flex items-center justify-center gap-2" onclick="selectVendor('Nghệ Nhân Hưng Ký 1954', '144.000.000đ')" type="button">
<span className="material-symbols-outlined text-[20px]">check_circle</span>
              Chọn Nhà Thầu Này
            </button>
<div className="grid grid-cols-2 gap-2">
<button className="py-2 px-3 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5" type="button">
<span className="material-symbols-outlined text-[16px]">chat</span>
                Thương lượng
              </button>
<button className="py-2 px-3 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5" type="button">
<span className="material-symbols-outlined text-[16px]">menu_book</span>
                Xem chi tiết thầu
              </button>
</div>
</div>
</div>
{/* SUPPLIER 3: KINH ĐÔ GRAND (ENTERPRISE SCALE) */}
<div className="rounded-2xl bg-surface-container-lowest shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group">
<div className="p-6">
{/* Badge */}
<div className="flex items-center justify-between mb-4">
<span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-bold tracking-wide inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">factory</span>
                Năng Lực Sản Xuất Lớn
              </span>
<span className="text-primary text-label-sm font-label-sm font-bold bg-primary-fixed/40 px-2.5 py-0.5 rounded">Chiết khấu 24%</span>
</div>
{/* Atelier Header */}
<div className="flex items-center gap-3.5 mb-4">
<img className="w-12 h-12 rounded-xl object-cover shadow-inner" data-alt="Kinh Do Grand modern bakery industrial standard emblem gold and deep red luxury corporate edition" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmVqaxiUk-thoc47-mS_iomUIHZsA1aCCwqBtA4G5FPk0oGETFms43rhneVkS7esf7smN18FRScs34On0M91F9GRyr3Mra15k3xGKcoYdh0ubsEF32kOvo7LZOTIdgztcZMixjyU9ZBadYzLMLzLAxnjxvvoNSEN2fmscKog7QXxE_Yz-Uyw7ubPWEdKPSY-302f2-Yr3spb8a4tFAmYFXkcUQqeTTOc3uzEWxWVnkGBKvEC_R2mHbyw"/>
<div>
<h3 className="font-title-md text-title-md text-on-surface font-bold leading-tight">Xưởng Kinh Đô Grand</h3>
<div className="flex items-center gap-1.5 mt-0.5">
<span className="material-symbols-outlined text-[16px] text-secondary" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-title-sm text-title-sm text-on-surface font-bold">4.9</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">(840 đánh giá • 99.8% đúng hẹn)</span>
</div>
</div>
</div>
{/* Financials Highlight Box */}
<div className="p-4 rounded-xl bg-surface-container-low mb-5">
<div className="text-on-surface-variant font-label-sm text-label-sm">Đơn giá dự thầu trọn gói:</div>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-headline-lg text-headline-lg text-primary font-bold">610.000đ</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">/ hộp quà VIP</span>
</div>
<div className="flex items-center justify-between pt-2 mt-2 bg-surface-container-lowest/70 rounded-md px-2.5 py-1 text-label-sm font-label-sm">
<span className="text-on-surface">Tổng thanh toán: <strong className="text-on-surface font-bold">122.000.000đ</strong></span>
<span className="text-tertiary font-semibold">-38.000.000đ</span>
</div>
</div>
{/* Product Showcase Micro Preview */}
<div className="mb-5 rounded-xl overflow-hidden bg-surface-container-high relative h-40 group-hover:brightness-105 transition-all">
<img className="w-full h-full object-cover" data-alt="Kinh Do Grand corporate mid autumn gift box ruby red with gold foiling and crisp clean corporate packaging aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB36daFTfL2FnJEjtGnkG-gX_HpqNrkx2uMnpuPYZ0avb7k6tR8B0zGOe3nTuXfOG1jCoqmtMlqWKEjrgGiuNMgXmE46ot3xtWFip27KWotaE7Sbc4AJLkbauImD4JRm-yxSMEQbXVZ5q00y6jvLbtd4XPJa7b3ngTLpA-omwG550KUd4KV31voqDz4ny-DpZ6e45TScBC-EQhyjWUeEc13EM05E4kuTenO7kCgdJcFeIzF57GGUKDouw"/>
<div className="absolute bottom-2 left-2 right-2 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg flex items-center justify-between text-body-sm font-body-sm text-on-surface">
<span className="line-clamp-1 font-medium">Hộp Trăng Vàng Ruby Doanh Nghiệp</span>
<button className="text-primary font-semibold text-label-sm hover:underline shrink-0 flex items-center" type="button">
                  3D View <span className="material-symbols-outlined text-[14px]">view_in_ar</span>
</button>
</div>
</div>
{/* Detailed Criteria Bullet Points */}
<div className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">featured_seasonal_and_gifts</span>
<div>
<strong className="text-on-surface font-medium">Bao bì &amp; Quà tặng:</strong> Giấy mỹ thuật dập kim đỏ ruby, tặng kèm <span className="text-on-surface font-medium">200 thiệp chúc mừng</span> thiết kế riêng.
                </div>
</div>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">schedule</span>
<div>
<strong className="text-on-surface font-medium">Thời gian gửi mẫu:</strong> <span className="text-on-surface font-semibold">Trong ngày</span> (đội ngũ B2B giao trực tiếp).
                </div>
</div>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">alt_route</span>
<div>
<strong className="text-on-surface font-medium">Hình thức giao hàng:</strong> Hỗ trợ giao phân tán đa điểm theo danh sách chi nhánh công ty.
                </div>
</div>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">fact_check</span>
<div>
<strong className="text-on-surface font-medium">Thủ tục B2B:</strong> Hợp đồng chuẩn ISO, giải ngân linh hoạt 30/70 qua SafeTrade.
                </div>
</div>
</div>
</div>
{/* Card CTA Action Area */}
<div className="p-6 pt-0 mt-4 flex flex-col gap-2.5">
<button className="w-full py-3 px-4 rounded-lg bg-primary text-on-primary font-title-sm text-title-sm font-semibold hover:bg-primary-container transition-all active:scale-[0.99] shadow-md flex items-center justify-center gap-2" onclick="selectVendor('Xưởng Bánh Kinh Đô Grand', '122.000.000đ')" type="button">
<span className="material-symbols-outlined text-[20px]">check_circle</span>
              Chọn Nhà Thầu Này
            </button>
<div className="grid grid-cols-2 gap-2">
<button className="py-2 px-3 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5" type="button">
<span className="material-symbols-outlined text-[16px]">chat</span>
                Thương lượng
              </button>
<button className="py-2 px-3 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5" type="button">
<span className="material-symbols-outlined text-[16px]">visibility</span>
                Hồ sơ xưởng
              </button>
</div>
</div>
</div>
</div>
{/* 4. SPEC COMPARISON DRAWER / MATRIX TABLE */}
<div className="rounded-2xl bg-surface-container-lowest shadow-md overflow-hidden mb-10">
<div className="p-6 bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<h3 className="font-title-md text-title-md text-on-surface font-bold">Bảng Chi Tiết Thông Số Kỹ Thuật &amp; Cam Kết Chất Lượng</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Tiêu chuẩn kiểm nghiệm độc quyền bắt buộc cho đơn hàng B2B của Nguyệt Phố</p>
</div>
<div className="flex items-center gap-2">
<span className="px-3 py-1 rounded-md bg-surface text-secondary text-label-sm font-label-sm font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">task_alt</span>
              4/4 Tiêu chuẩn đã thẩm duyệt
            </span>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left font-body-sm text-body-sm">
<thead>
<tr className="bg-surface-container-high/60 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-4 px-6 w-1/4">Hạng Mục Kỹ Thuật</th>
<th className="py-4 px-6 w-1/4 text-primary font-bold">Madame Hương</th>
<th className="py-4 px-6 w-1/4 text-secondary font-bold">Nghệ Nhân Hưng Ký 1954</th>
<th className="py-4 px-6 w-1/4 text-on-surface font-bold">Kinh Đô Grand</th>
</tr>
</thead>
<tbody className="divide-y-0 text-on-surface">
{/* Hàng 1 */}
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-4 px-6 font-semibold bg-surface-container-lowest">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[18px]">bakery_dining</span>
                    Hương vị set bánh đề xuất
                  </div>
</td>
<td className="py-4 px-6">
                  4 bánh 180g: Thập cẩm xá xíu gà quay, Sen nhuyễn hạt dưa, Trà xanh matcha trứng muối, Đậu xanh hạt sen cao cấp.
                </td>
<td className="py-4 px-6 bg-secondary-fixed/10">
                  4 bánh 200g: Bào ngư vi cá thượng hạng, Thập cẩm lạp xưởng Mai Quế Lộ gia truyền 1954, Hạt sen tuyết yến, Mè đen óc chó.
                </td>
<td className="py-4 px-6">
                  4 bánh 180g: Gà quay sốt X.O trứng muối, Cua huỳnh đế, Đậu xanh hạnh nhân, Hạt sen hạt chia bổ dưỡng.
                </td>
</tr>
{/* Hàng 2 */}
<tr className="hover:bg-surface-container-low/50 transition-colors bg-surface-container-lowest/40">
<td className="py-4 px-6 font-semibold bg-surface-container-lowest">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[18px]">calendar_month</span>
                    Hạn sử dụng &amp; Ngày ra lò
                  </div>
</td>
<td className="py-4 px-6">
<span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold">Date mới trong 72h</span><br/>
                  HSD 45 ngày, không chất bảo quản công nghiệp.
                </td>
<td className="py-4 px-6 bg-secondary-fixed/10">
<span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold">Nướng mẻ mới trong 24h</span><br/>
                  HSD 30 ngày (Bảo quản mát tiêu chuẩn nghệ nhân).
                </td>
<td className="py-4 px-6">
<span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold">Date mới trong 48h</span><br/>
                  HSD 60 ngày đóng gói hút chân không khí trơ.
                </td>
</tr>
{/* Hàng 3 */}
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-4 px-6 font-semibold bg-surface-container-lowest">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[18px]">receipt_long</span>
                    Hóa đơn VAT &amp; Chứng nhận
                  </div>
</td>
<td className="py-4 px-6">
                  Hóa đơn VAT điện tử 100% (Thuế suất 8%). Đạt chuẩn <strong className="text-on-surface">ISO 22000:2018 &amp; HACCP</strong>.
                </td>
<td className="py-4 px-6 bg-secondary-fixed/10">
                  Hóa đơn VAT đầy đủ. Chứng nhận OCOP 4 sao quốc gia &amp; Chứng chỉ Nghệ Nhân Làng Nghề Di Sản.
                </td>
<td className="py-4 px-6">
                  Hóa đơn điện tử tức thì. Chứng nhận Chuỗi an toàn thực phẩm Quốc tế FSSC 22000.
                </td>
</tr>
{/* Hàng 4 */}
<tr className="hover:bg-surface-container-low/50 transition-colors bg-surface-container-lowest/40">
<td className="py-4 px-6 font-semibold bg-surface-container-lowest">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[18px]">local_shipping</span>
                    Chính sách vận chuyển
                  </div>
</td>
<td className="py-4 px-6">
<span className="text-tertiary font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Miễn phí 100%
                  </span>
                  Giao pallet tận 02 kho tổng Hà Nội &amp; TP.HCM.
                </td>
<td className="py-4 px-6 bg-secondary-fixed/10">
<span className="text-tertiary font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Miễn phí 100%
                  </span>
                  Xe tải chuyên dụng bọc chống sốc vận chuyển riêng.
                </td>
<td className="py-4 px-6">
<span className="text-tertiary font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Miễn phí 100%
                  </span>
                  Hỗ trợ phân bổ theo 12 chi nhánh nội thành.
                </td>
</tr>
</tbody>
</table>
</div>
</div>
{/* 5. ESCROW PROTECTION & NEXT STEPS */}
<section className="p-6 md:p-8 rounded-2xl bg-surface-container-low shadow-sm mb-8 relative overflow-hidden">
<div className="flex flex-col md:flex-row items-start md:items-center gap-6">
<div className="w-16 h-16 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-md">
<span className="material-symbols-outlined text-[36px]">security</span>
</div>
<div className="space-y-1.5 flex-1">
<div className="flex items-center gap-2">
<h3 className="font-title-md text-title-md text-primary font-bold">
                Quy Trình Chấp Thuận Thầu &amp; Bảo Vệ Ký Quỹ SafeTrade Escrow
              </h3>
<span className="px-2 py-0.5 rounded bg-surface-container-highest text-secondary font-label-sm text-label-sm font-semibold">
                An toàn tuyệt đối
              </span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Khi bạn nhấn <strong>"Chọn Nhà Thầu Này"</strong>, các báo giá cạnh tranh còn lại sẽ tự động lưu trữ vào hồ sơ. Hệ thống khởi tạo ngay Hợp đồng Kinh tế Điện tử (e-Contract) có chữ ký số. Khoản tiền đặt cọc được <strong>Nguyệt Phố SafeTrade tạm giữ trung lập</strong> và chỉ giải ngân cho xưởng sản xuất sau khi Ban Thu Mua nghiệm thu mẫu vật lý đạt chuẩn 100%.
            </p>
</div>
<div className="shrink-0 flex items-center gap-3">
<button className="px-4 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface hover:text-primary transition-all font-label-md text-label-md shadow-sm" type="button">
              Đọc quy chế Ký Quỹ
            </button>
</div>
</div>
</section>
</div>
</div>
{/* Interactive Confirmation Modal (Vanilla JS Controlled) */}
<div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/50 backdrop-blur-sm hidden p-4" id="selectionModal">
<div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
<div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center mb-4">
<span className="material-symbols-outlined text-[28px]">verified</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">
        Xác nhận chọn đơn vị trúng thầu?
      </h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-6" id="modalDescription">
        Bạn đang lựa chọn tiến hành tạo hợp đồng điện tử với nhà xưởng.
      </p>
<div className="p-4 rounded-xl bg-surface-container-low mb-6 space-y-2 font-body-sm text-body-sm text-on-surface">
<div className="flex justify-between">
<span className="text-on-surface-variant">Nhà xưởng:</span>
<span className="font-bold text-primary" id="modalVendorName">Madame Hương Bakery</span>
</div>
<div className="flex justify-between">
<span className="text-on-surface-variant">Tổng giá trị dự thầu:</span>
<span className="font-bold" id="modalVendorPrice">118.000.000đ</span>
</div>
<div className="flex justify-between">
<span className="text-on-surface-variant">Tiền ký quỹ tạm giữ (30%):</span>
<span className="font-bold text-tertiary" id="modalVendorDeposit">35.400.000đ</span>
</div>
</div>
<div className="flex items-center gap-3">
<button className="flex-1 py-2.5 px-4 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-title-sm text-title-sm" onclick="closeModal()" type="button">
          Xem lại báo giá
        </button>
<button className="flex-1 py-2.5 px-4 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-all font-title-sm text-title-sm font-semibold shadow-md flex items-center justify-center gap-1.5" onclick="confirmSelection()" type="button">
<span>Ký Hợp Đồng &amp; Cọc</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
</div>
</div>
{/* Micro Interaction Script */}

</div></main>
  );
}
