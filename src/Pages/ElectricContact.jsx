import React, { useEffect } from 'react';

export default function ElectricContact({ onNavigate }) {

  useEffect(() => {
    try {
      
    const btnAccept = document.getElementById('btnAcceptDelivery');
    const modal = document.getElementById('payoutModal');
    const btnClose = document.getElementById('btnCloseModal');
    const btnExecute = document.getElementById('btnExecutePayout');
    const btnReport = document.getElementById('btnReportIssue');

    if (btnAccept && modal && btnClose) {
      btnAccept.addEventListener('click', () => {
        modal.classList.remove('hidden');
      });
      btnClose.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
      });
    }

    if (btnExecute) {
      btnExecute.addEventListener('click', () => {
        btnExecute.innerHTML = '<span class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> Đang ký số Smart CA...';
        setTimeout(() => {
          modal.classList.add('hidden');
          alert('Thành công! Lệnh giải ngân 100.800.000 VNĐ đã được thực thi an toàn qua Nguyệt Phố SafeTrade. Hợp đồng chuyển sang trạng thái Hoàn Tất Toàn Phần.');
          if (btnAccept) {
            btnAccept.disabled = true;
            btnAccept.classList.replace('bg-primary-container', 'bg-tertiary');
            btnAccept.innerHTML = '<span class="material-symbols-outlined text-[20px]">task_alt</span> Đã Giải Ngân Thành Công';
          }
        }, 1500);
      });
    }

    if (btnReport) {
      btnReport.addEventListener('click', () => {
        const reason = prompt('Vui lòng nhập tóm tắt vấn đề phát sinh (hư hỏng bao bì, chậm tiến độ, hoặc nhiệt độ xe lạnh):');
        if (reason) {
          alert('Yêu cầu khiếu nại đã được ghi nhận vào hồ sơ hợp đồng. Chuyên viên Nguyệt Phố SafeTrade cùng đại diện xưởng Hưng Ký sẽ liên hệ lại trong vòng 15 phút.');
        }
      });
    }
  
    } catch (err) {
      console.warn('Script execution notice:', err);
    }
  }, []);

  return (
    <main className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]"><div className="flex flex-col w-full">
<div className="w-full max-w-7xl mx-auto px-margin py-space-xl space-y-space-xl">
{/* 1. Breadcrumb & Contract Header */}
<section className="space-y-space-md">
<nav className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
<a className="hover:text-primary transition-colors" href="#">Trang chủ</a>
<span className="text-outline/60">/</span>
<a className="hover:text-primary transition-colors" href="#">Quản lý Báo giá &amp; So sánh Thầu</a>
<span className="text-outline/60">/</span>
<span className="font-semibold text-primary">Hợp đồng #HD-2024-8892-HK</span>
</nav>
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="space-y-space-xs">
<div className="flex flex-wrap items-center gap-space-sm">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary/10 text-tertiary font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
              Hợp đồng đã ký số điện tử (Có hiệu lực)
            </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>lock</span>
              Bảo vệ ký quỹ SafeTrade Active
            </span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Mã số hồ sơ: VN-EC-889240</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            Hợp Đồng Điện Tử &amp; Tiến Độ Thực Hiện Đơn Hàng
          </h1>
<p className="font-body-md text-body-md text-on-surface-variant">
            Giao thức bảo đảm thương mại B2B Nguyệt Phố: Giám sát toàn trình từ xưởng nghệ nhân đến kho nhận hàng.
          </p>
</div>
<div className="flex flex-wrap items-center gap-space-sm shrink-0">
<button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-high text-on-surface font-title-sm text-title-sm hover:bg-surface-variant transition-colors shadow-sm">
<span className="material-symbols-outlined text-[20px] text-primary">download</span>
            Tải file Hợp đồng (PDF)
          </button>
<button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-high text-on-surface font-title-sm text-title-sm hover:bg-surface-variant transition-colors shadow-sm">
<span className="material-symbols-outlined text-[20px] text-secondary">forum</span>
            Liên hệ Trực tiếp Xưởng
          </button>
<button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm hover:bg-primary transition-colors shadow-sm">
<span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
            AI Giám Sát Tiến Độ
          </button>
</div>
</div>
</section>
{/* 2. Compact 4-Column Parties & Escrow Summary */}
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
{/* Bên A */}
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between space-y-space-sm relative overflow-hidden">
<div className="space-y-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Bên A (Bên Mua Hàng)</span>
<h3 className="font-title-md text-title-md text-on-surface font-bold">Tập đoàn Vingroup</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Phòng Mua hàng &amp; Nhân sự VIP</p>
</div>
<div className="pt-space-sm bg-surface-container-low/60 -mx-space-lg -mb-space-lg px-space-lg pb-space-md">
<div className="flex items-center gap-2 text-on-surface font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[18px] text-secondary">badge</span>
<span>Đại diện: <strong>Trần Đình Khang</strong></span>
</div>
<div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm mt-1">
<span className="material-symbols-outlined text-[18px] text-tertiary">fingerprint</span>
<span className="truncate">Smart CA: 0101245678-001</span>
</div>
</div>
</div>
{/* Bên B */}
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between space-y-space-sm relative overflow-hidden">
<div className="space-y-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Bên B (Xưởng Sản Xuất)</span>
<h3 className="font-title-md text-title-md text-on-surface font-bold">Xưởng Nghệ Nhân Hưng Ký 1954</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">OCOP 4 Sao • Làng Nghề Bánh Cổ Truyền</p>
</div>
<div className="pt-space-sm bg-surface-container-low/60 -mx-space-lg -mb-space-lg px-space-lg pb-space-md">
<div className="flex items-center gap-2 text-on-surface font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[18px] text-secondary">verified_user</span>
<span>Đại diện: <strong>NN. Nguyễn Văn Hưng</strong></span>
</div>
<div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm mt-1">
<span className="material-symbols-outlined text-[18px] text-primary">workspace_premium</span>
<span>Xưởng Nghệ Nhân Di Sản Bảo Chứng</span>
</div>
</div>
</div>
{/* Gói đặt thầu */}
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between space-y-space-sm relative overflow-hidden">
<div className="space-y-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Quy Cách &amp; Sản Phẩm</span>
<h3 className="font-title-md text-title-md text-primary font-bold">200 Hộp VIP Vượng Nguyệt</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Sơn mài khảm xà cừ • Dập logo vàng 24K</p>
</div>
<div className="pt-space-sm bg-surface-container-low/60 -mx-space-lg -mb-space-lg px-space-lg pb-space-md">
<div className="flex items-baseline justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">Tổng giá trị:</span>
<span className="font-price-display text-price-display text-primary">144.000.000₫</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant block mt-0.5">Đã bao gồm 8% VAT &amp; Vận chuyển xe lạnh</span>
</div>
</div>
{/* SafeTrade Escrow */}
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between space-y-space-sm relative overflow-hidden">
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Ký Quỹ SafeTrade</span>
<span className="text-tertiary font-label-sm text-label-sm font-bold bg-tertiary/10 px-2 py-0.5 rounded">Đã khóa 30%</span>
</div>
<h3 className="font-title-md text-title-md text-tertiary font-bold">43.200.000 VNĐ</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Số dư phong tỏa an toàn qua VPBank Escrow</p>
</div>
<div className="pt-space-sm bg-surface-container-low/60 -mx-space-lg -mb-space-lg px-space-lg pb-space-md">
<div className="w-full bg-surface-container rounded-full h-2 mb-1.5 overflow-hidden">
<div className="bg-tertiary h-2 rounded-full w-[30%] transition-all"></div>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant">Còn lại 100.800.000₫ (70%) thanh toán sau nghiệm thu</span>
</div>
</div>
</section>
{/* 3. 5-Step Visual Milestones Progress Tracker */}
<section className="bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-xl shadow-sm space-y-space-lg">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Quy trình vận hành chuẩn</span>
<h2 className="font-headline-sm text-headline-sm text-primary">Tiến Độ Thực Hiện &amp; Bàn Giao Đơn Hàng</h2>
</div>
<div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-lg">
<span className="relative flex h-2.5 w-2.5">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
</span>
<span className="font-label-md text-label-md text-on-surface font-medium">Đang tiến hành bước 3: Hoàn tất 85% mẻ bánh</span>
</div>
</div>
{/* Steps Visual Line */}
<div className="grid grid-cols-1 md:grid-cols-5 gap-space-md relative">
{/* Step 1 */}
<div className="flex flex-col space-y-space-xs bg-surface-container-low p-space-md rounded-lg relative overflow-hidden">
<div className="flex items-center justify-between">
<div className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-label-md">
<span className="material-symbols-outlined text-[18px]">check</span>
</div>
<span className="font-label-sm text-label-sm text-tertiary font-bold bg-tertiary/10 px-2 py-0.5 rounded">Hoàn tất</span>
</div>
<h4 className="font-title-sm text-title-sm text-on-surface font-semibold pt-1">1. Ký Kết Điện Tử</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Ký số Smart CA 10:30 ngày 01/08. Hợp đồng có mã bảo mật SHA-256.</p>
<span className="font-label-sm text-label-sm text-outline pt-2">Xác thực bởi Bộ Công Thương</span>
</div>
{/* Step 2 */}
<div className="flex flex-col space-y-space-xs bg-surface-container-low p-space-md rounded-lg relative overflow-hidden">
<div className="flex items-center justify-between">
<div className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-label-md">
<span className="material-symbols-outlined text-[18px]">check</span>
</div>
<span className="font-label-sm text-label-sm text-tertiary font-bold bg-tertiary/10 px-2 py-0.5 rounded">Hoàn tất</span>
</div>
<h4 className="font-title-sm text-title-sm text-on-surface font-semibold pt-1">2. Phê Duyệt Mẫu Thử</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Duyệt mẫu 4 vị &amp; hộp dập logo nhũ vàng 24K lúc 15:00 ngày 02/08.</p>
<span className="font-label-sm text-label-sm text-secondary pt-2">Xem 6 ảnh mẫu lưu ký →</span>
</div>
{/* Step 3 (Active) */}
<div className="flex flex-col space-y-space-xs bg-primary-container/10 p-space-md rounded-lg shadow-sm relative overflow-hidden">
<div className="flex items-center justify-between">
<div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-label-md animate-pulse">
              3
            </div>
<span className="font-label-sm text-label-sm text-primary font-bold bg-primary-container/20 px-2 py-0.5 rounded">Đang làm: 85%</span>
</div>
<h4 className="font-title-sm text-title-sm text-primary font-semibold pt-1">3. Sản Xuất Mẻ Tươi</h4>
<p className="font-body-sm text-body-sm text-on-surface">Nướng mẻ bánh tươi chuẩn nghệ nhân trong 24h &amp; hoàn thiện hộp sơn mài.</p>
<div className="w-full bg-surface-container-high rounded-full h-1.5 mt-2">
<div className="bg-primary h-1.5 rounded-full w-[85%]"></div>
</div>
</div>
{/* Step 4 */}
<div className="flex flex-col space-y-space-xs bg-surface-container-low p-space-md rounded-lg relative overflow-hidden">
<div className="flex items-center justify-between">
<div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-bold text-label-md">
              4
            </div>
<span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-variant/50 px-2 py-0.5 rounded">Còn 2 ngày</span>
</div>
<h4 className="font-title-sm text-title-sm text-on-surface font-semibold pt-1">4. Xe Lạnh &amp; Phân Điểm</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Dự kiến giao 08/08 Âm lịch tại Kho Hà Nội (120 hộp) &amp; TP.HCM (80 hộp).</p>
<span className="font-label-sm text-label-sm text-outline pt-2">Nhiệt độ bảo quản 20-22°C</span>
</div>
{/* Step 5 */}
<div className="flex flex-col space-y-space-xs bg-surface-container-low p-space-md rounded-lg relative overflow-hidden">
<div className="flex items-center justify-between">
<div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-bold text-label-md">
              5
            </div>
<span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-variant/50 px-2 py-0.5 rounded">Chờ nghiệm thu</span>
</div>
<h4 className="font-title-sm text-title-sm text-on-surface font-semibold pt-1">5. Nghiệm Thu &amp; Cấn Trừ</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Kiểm tra thực tế, ký biên bản điện tử và giải ngân 70% còn lại cho xưởng.</p>
<span className="font-label-sm text-label-sm text-outline pt-2">Nguyệt Phố SafeTrade Bảo trợ</span>
</div>
</div>
</section>
{/* 4. Fulfillment Verification Log & Live Proof of Delivery */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
{/* Left: Production Diary & Verification (7 cols) */}
<section className="lg:col-span-7 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-lg">
<div className="flex items-center justify-between">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Xác minh thực địa</span>
<h3 className="font-headline-sm text-headline-sm text-primary">Nhật Ký Xưởng Bánh &amp; Giám Sát Chất Lượng</h3>
</div>
<span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
</div>
<div className="space-y-space-lg">
{/* Update 1 */}
<div className="flex gap-space-md bg-surface-container-low p-space-md rounded-lg">
<img className="w-24 h-24 rounded-lg object-cover shrink-0 shadow-sm" data-alt="Close up photography of handcrafted luxury red lacquer Vietnamese mooncake gift boxes with intricate mother of pearl inlay and 24K gold stamped Vingroup corporate logo, artisan craftsmanship in studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAtahcqcRxiqafSyu5ddbacvyHHv2jeio4vlAC7ergNO_akTO4h3TRwfD1kvxklK_vd0dy_zgbSpP_Kvo60QdyvSfhrLAv498bEE0k--5yTcOTAghKMUxdDqDFOHzr3WR9PZ51ohSPdsI8fYvRpv7PLfITA4Oa4rSD9K6w0LpMUDs6leMxNz0Vx2YkSowRW-PobXaXYjBSdMi3zj6AYq70FjeDA6OWYUz50OCtK7ALrepnxa8rLW9zbw"/>
<div className="space-y-1.5 min-w-0">
<div className="flex flex-wrap items-center gap-2">
<span className="font-label-sm text-label-sm text-tertiary bg-tertiary/10 px-2 py-0.5 rounded font-bold">Kiểm định KCS đạt 100%</span>
<span className="font-body-sm text-body-sm text-outline">09:15 - Hôm nay</span>
</div>
<h4 className="font-title-sm text-title-sm text-on-surface font-semibold">Hoàn tất gia công 200 hộp sơn mài khảm xà cừ Vượng Nguyệt</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Đã chạm khắc chìm logo nhũ vàng 24K cho Vingroup. Toàn bộ khay nhung và lớp lót chống ẩm đã được hấp tiệt trùng công nghệ nhiệt Ozone.
              </p>
</div>
</div>
{/* Update 2 */}
<div className="flex gap-space-md bg-surface-container-low p-space-md rounded-lg">
<img className="w-24 h-24 rounded-lg object-cover shrink-0 shadow-sm" data-alt="Traditional Vietnamese artisan mooncakes freshly baked coming out of an artisan stone deck oven, golden crust with glossy egg wash, four premium flavors, culinary presentation on wooden board" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsrjyseDLc8bA8xqY2MgTolqd6I86ymMsGj1bbz_fYZovezMKak0PK6GKQ1cQXNpzExYD02W6iOKmpRQrzr7jv3wkUs0DWaq9RTdkAAgVwkJE52-ZIxwdoEgWcaeDGtEMBw0NUBUctXX9VT3BS3kcgW8QzjzhcTdoTVvmY7eMsEf0id7SdIxoC16i0bwq_j46M6hLTq2gaeT4W3sBNxzWwhfmTEf7W41uTvP9IGFn5w57eVSyTKQ3wCQ"/>
<div className="space-y-1.5 min-w-0">
<div className="flex flex-wrap items-center gap-2">
<span className="font-label-sm text-label-sm text-primary bg-primary/10 px-2 py-0.5 rounded font-bold">Mẻ nướng độc quyền</span>
<span className="font-body-sm text-body-sm text-outline">06:40 - Hôm nay</span>
</div>
<h4 className="font-title-sm text-title-sm text-on-surface font-semibold">Nướng mẻ bánh tươi thượng hạng 4 vị di sản</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Bao gồm: Bào ngư vi cá thượng hạng, Thập cẩm lạp xưởng Mai Quế Lộ, Hạt sen tuyết yến hữu cơ và Mè đen óc chó ít đường. Nhiệt độ lò duy trì nghiêm ngặt ở 210°C.
              </p>
</div>
</div>
{/* Update 3 */}
<div className="flex gap-space-md bg-surface-container-low p-space-md rounded-lg">
<img className="w-24 h-24 rounded-lg object-cover shrink-0 shadow-sm" data-alt="Elegant presentation of luxury mooncake boxes being sealed with tamper-proof holographic QR security seals and personalized corporate greeting cards handwritten for Vingroup executives" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj4RpqTPdlzUAPX8hCUIagXeQxGWUORSiWY6_4ORCmno4UMI7kQOoEvGZLsHUJHse_H17JkzXA3LKh79VBu9WmEPlLRQB3eoXaExBE0c_VH3cKBzRzs77khZDFpJ8bdEduCcF0mJwVqRhAPSXZKbbGIDRhV493eJoodxje_CZlHwFq7ZxS-CKpJuJHG5I4lgGbI347hcRWE7ilwwgqlEpq8sY_yrNVi-H-N1RQfSmchiqBOs6YfgHsgg"/>
<div className="space-y-1.5 min-w-0">
<div className="flex flex-wrap items-center gap-2">
<span className="font-label-sm text-label-sm text-secondary bg-secondary/10 px-2 py-0.5 rounded font-bold">Seal QR Chống Giả</span>
<span className="font-body-sm text-body-sm text-outline">16:30 - Ngày 02/08</span>
</div>
<h4 className="font-title-sm text-title-sm text-on-surface font-semibold">Đóng gói cá nhân hóa thiệp chúc &amp; mã truy xuất nguồn gốc</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Mỗi hộp quà được đính kèm thiệp ép kim riêng biệt gửi tặng đối tác VIP và dán tem niêm phong điện tử xác thực xuất xứ chính hiệu từ nghệ nhân Hưng Ký.
              </p>
</div>
</div>
</div>
</section>
{/* Right: Proof of Delivery (PoD) & Cold-chain tracking (5 cols) */}
<section className="lg:col-span-5 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
<div className="flex items-center justify-between">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Vận chuyển lạnh</span>
<h3 className="font-headline-sm text-headline-sm text-primary">Ảnh &amp; Dữ Liệu Bàn Giao (PoD)</h3>
</div>
<span className="material-symbols-outlined text-primary text-[24px]">local_shipping</span>
</div>
{/* GPS & Temp Telemetry */}
<div className="bg-surface-container-low p-space-md rounded-lg space-y-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary">thermostat</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Cảm biến nhiệt độ thùng lạnh</span>
</div>
<span className="font-label-md text-label-md font-bold text-tertiary">20.8°C (Đạt chuẩn)</span>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">location_on</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Đội xe chuyên dụng</span>
</div>
<span className="font-label-md text-label-md font-medium text-on-surface">29C-988.42 (Hà Nội Hub)</span>
</div>
</div>
{/* Interactive Map Element with data-location */}
<div className="w-full h-48 bg-cover bg-center rounded-lg shadow-inner relative flex items-end p-3" data-location="Vinhomes Riverside, Long Bien, Hanoi, Vietnam" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDSeBdorG1Y3DkSDC61AMTJFJMNzF-QlqvdUbMD7OTXPLA8OCrOw1ppBXMJ04f8iOeY1DTWO4CQ3h9DQ40J1l-qUhOb1zqDMkJTaZo0Gd0eRkkngKC2MiGZVTsgKKMfKAfgeMhsTW373oJ3aKOEQE48GRP9RIE7Vos-D1Xo45UFb02ND_NwWrcGFTZrNEtRrZrJ9n4kOW_STEPrfTBz9ErwwNoG_WYAuRa5H-qCOLewNJ7XokNmcOXeXg')"}}>
<div className="bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-md flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
<span className="font-label-sm text-label-sm text-on-surface font-semibold">Kho nhận đích: Trung tâm Hội nghị Almaz, Long Biên</span>
</div>
</div>
{/* Delivery Documentation Preview Grid */}
<div className="space-y-space-xs pt-space-xs">
<span className="font-label-sm text-label-sm uppercase text-outline font-bold">Chứng từ &amp; Hình ảnh mẫu đã phê duyệt</span>
<div className="grid grid-cols-2 gap-space-sm">
<div className="bg-surface-container-low p-2 rounded-lg space-y-1">
<img className="w-full h-24 object-cover rounded" data-alt="Official Vietnamese signed inspection certificate paper with red wax seal and quality assurance stamp for luxury food products, macro view" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApQymqRqYw4oHOPSFE5xHOxPD5sn6WoAhtXSxQPdbJD4cDVKdE_T9Fdjck0XbybHeNrYQTVoAU0x_cwboPQivky5H4MkUBeXyny6xdTcTtP_ZSA4L4Vd-fFfoYuAGZSfKSco1KEsG7RCAahihCcxmkW26hekVINjY5ln1BHATgQHdb0s8vdYsqedObjuo_uT0KgJCvBCrXsVEvEadYfbfMU2uCMg-35LuCEp-RjN9bZ8xNTD5aBcO-9A"/>
<span className="font-label-sm text-label-sm text-on-surface block truncate font-medium">Biên bản kiểm dịch VSATTP</span>
<span className="font-body-sm text-[11px] text-tertiary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">check_circle</span> Đã thẩm định
              </span>
</div>
<div className="bg-surface-container-low p-2 rounded-lg space-y-1">
<img className="w-full h-24 object-cover rounded" data-alt="Close up photograph of a proof of delivery manifest tablet signature by procurement manager in business suit, formal confirmation ceremony" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIQOteZlGGIUV90HGxr6LCxJnvbYOTOJbAeALScJyH3FhFaUrrwXu0GSy4CWOoleAsW274i-Vm8BLu1d9n1wkEM2tf6Rsnm_hf04Ns1pNAUniqZePl45E-RmlkSbna6ZF_16h8rAtc5-kK3Hw4SCXXNyLWpJ0CXtZixgXSchKanQzMN8gbBWf4tdYtjDWySkfINdgTUIK_dA6u2sytVQEtS6JoLY7FNz0pZIiwAptOCtHm78gKsZljSA"/>
<span className="font-label-sm text-label-sm text-on-surface block truncate font-medium">Mẫu phiếu giao nhận 2 kho</span>
<span className="font-body-sm text-[11px] text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">schedule</span> Sẵn sàng ký nhận
              </span>
</div>
</div>
</div>
</section>
</div>
{/* 5. SLA Guarantees & SafeTrade Settlement Actions */}
<section className="bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-xl shadow-sm space-y-space-lg">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Bảo chứng trách nhiệm</span>
<h3 className="font-headline-sm text-headline-sm text-primary">Điều Khoản Cam Kết SLA &amp; Giải Ngân Ký Quỹ SafeTrade</h3>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
<div className="bg-surface-container-low p-space-md rounded-lg space-y-2">
<div className="flex items-center gap-2 text-primary font-title-sm text-title-sm">
<span className="material-symbols-outlined text-[20px]">timelapse</span>
<span className="font-bold">Cam kết giao hàng đúng cam kết thời gian</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Nếu giao chậm quá thời gian cam kết mỗi 12 giờ, xưởng bánh chịu phạt <strong>2% tổng giá trị hợp đồng</strong> được tự động khấu trừ từ quỹ bảo lãnh ký thác để bồi hoàn cho Bên Mua.
          </p>
</div>
<div className="bg-surface-container-low p-space-md rounded-lg space-y-2">
<div className="flex items-center gap-2 text-primary font-title-sm text-title-sm">
<span className="material-symbols-outlined text-[20px]">verified</span>
<span className="font-bold">Cam kết tiêu chuẩn tươi mới &amp; Đền bù 200%</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Bảo đảm bánh ra lò trong vòng 24 giờ trước thời điểm xuất xưởng xe lạnh. Bồi hoàn <strong>200% giá trị lô hàng</strong> nếu phát hiện sai lệch vị bánh, quy cách hộp hoặc trọng lượng so với mẫu đã duyệt.
          </p>
</div>
</div>
{/* Action Confirmation Row */}
<div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-md bg-surface-container-low/50 p-space-lg rounded-xl">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
<span className="material-symbols-outlined text-[24px]">gavel</span>
</div>
<div className="space-y-0.5">
<h4 className="font-title-sm text-title-sm text-on-surface font-semibold">Quyền Quyết Toán Của Người Mua</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">
              Tiền cọc chỉ được giải ngân cho Xưởng sau khi Bên A kiểm đếm đủ số lượng và xác nhận nghiệm thu.
            </p>
</div>
</div>
<div className="flex flex-wrap items-center gap-space-sm w-full sm:w-auto justify-end">
<button className="px-5 py-3 rounded-lg bg-surface-container-high text-on-surface font-title-sm text-title-sm hover:bg-surface-variant transition-all" id="btnReportIssue">
            Báo cáo Sự cố / Khiếu nại
          </button>
<button className="px-6 py-3 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm hover:bg-primary transition-all shadow-md flex items-center gap-2" id="btnAcceptDelivery">
<span className="material-symbols-outlined text-[20px]">verified</span>
            Xác nhận Nghiệm Thu &amp; Giải Ngân SafeTrade
          </button>
</div>
</div>
</section>
</div>
{/* Interactive Modal for SafeTrade Payout Confirmation */}
<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 hidden" id="payoutModal">
<div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl p-space-xl shadow-2xl space-y-space-md">
<div className="flex items-center gap-3 text-primary">
<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[28px] text-primary">payments</span>
</div>
<div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Xác nhận quyết toán</span>
<h3 className="font-headline-sm text-headline-sm text-primary">Giải Ngân SafeTrade</h3>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
        Bạn đang thực hiện phê duyệt giải ngân <strong>100.800.000 VNĐ</strong> (70% còn lại) từ tài khoản ký quỹ cho <strong>Xưởng Nghệ Nhân Hưng Ký 1954</strong>. Hành động này đồng nghĩa với việc hai bên đã hoàn tất biên bản bàn giao.
      </p>
<div className="bg-surface-container-low p-space-md rounded-lg space-y-1 text-on-surface font-body-sm text-body-sm">
<div className="flex justify-between">
<span className="text-on-surface-variant">Hợp đồng:</span>
<span className="font-semibold">#HD-2024-8892-HK</span>
</div>
<div className="flex justify-between">
<span className="text-on-surface-variant">Số lượng nhận:</span>
<span className="font-semibold">200 Hộp quà Vượng Nguyệt</span>
</div>
<div className="flex justify-between">
<span className="text-on-surface-variant">Tài khoản thụ hưởng:</span>
<span className="font-semibold text-secondary">Xưởng Bánh Hưng Ký (VPBank)</span>
</div>
</div>
<div className="flex items-center justify-end gap-3 pt-2">
<button className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-title-sm text-title-sm hover:bg-surface-variant" id="btnCloseModal">
          Hủy bỏ
        </button>
<button className="px-5 py-2 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm hover:bg-primary shadow-sm flex items-center gap-2" id="btnExecutePayout">
<span className="material-symbols-outlined text-[18px]">lock_open</span>
          Ký số &amp; Giải ngân ngay
        </button>
</div>
</div>
</div>

</div></main>
  );
}
