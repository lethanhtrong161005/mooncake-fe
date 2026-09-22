import React, { useEffect } from 'react';

export default function SamplingBox({ onNavigate }) {

  useEffect(() => {
    try {
      
  // Workshop selection handler
  const workshopCards = document.querySelectorAll('.workshop-card');
  const workshopLabel = document.getElementById('selected-workshop-label');

  workshopCards.forEach(card => {
    card.addEventListener('click', () => {
      workshopCards.forEach(c => {
        c.classList.remove('bg-surface', 'shadow-md');
        c.classList.add('bg-surface-container-low');
        const icon = c.querySelector('.check-icon');
        if (icon) {
          icon.textContent = 'radio_button_unchecked';
          icon.classList.remove('text-primary');
          icon.classList.add('text-outline');
        }
      });
      card.classList.remove('bg-surface-container-low');
      card.classList.add('bg-surface', 'shadow-md');
      const activeIcon = card.querySelector('.check-icon');
      if (activeIcon) {
        activeIcon.textContent = 'check_circle';
        activeIcon.classList.remove('text-outline');
        activeIcon.classList.add('text-primary');
      }
      const workshopTitle = card.querySelector('.font-bold')?.innerText || '';
      if (workshopLabel) workshopLabel.textContent = workshopTitle;
    });
  });

  // Packaging material selection handler
  const materialCards = document.querySelectorAll('.material-card');
  materialCards.forEach(card => {
    card.addEventListener('click', () => {
      materialCards.forEach(c => {
        c.classList.remove('bg-surface', 'shadow-md');
        c.classList.add('bg-surface-container-low');
        const icon = c.querySelector('.check-material');
        if (icon) {
          icon.textContent = 'radio_button_unchecked';
          icon.classList.remove('text-primary');
          icon.classList.add('text-outline');
        }
      });
      card.classList.remove('bg-surface-container-low');
      card.classList.add('bg-surface', 'shadow-md');
      const activeIcon = card.querySelector('.check-material');
      if (activeIcon) {
        activeIcon.textContent = 'check_circle';
        activeIcon.classList.remove('text-outline');
        activeIcon.classList.add('text-primary');
      }
    });
  });

  // Flavor limit counter (Exact 4 items limit logic)
  const flavorCheckboxes = document.querySelectorAll('.flavor-checkbox');
  const counterDisplay = document.getElementById('flavor-counter');

  function updateFlavorCount() {
    const checkedCount = document.querySelectorAll('.flavor-checkbox:checked').length;
    if (counterDisplay) {
      counterDisplay.textContent = checkedCount + ' / 4 vị';
      if (checkedCount === 4) {
        counterDisplay.classList.add('text-primary');
        counterDisplay.classList.remove('text-error');
      } else {
        counterDisplay.classList.remove('text-primary');
        counterDisplay.classList.add('text-error');
      }
    }
  }

  flavorCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const checkedCount = document.querySelectorAll('.flavor-checkbox:checked').length;
      if (checkedCount > 4) {
        cb.checked = false;
        alert('Quý khách vui lòng chọn đúng tối đa 4 vị bánh tiêu chuẩn cho 01 Hộp nếm thử.');
      }
      updateFlavorCount();
    });
  });

  // Submit Modal Logic
  const submitBtn = document.getElementById('submit-btn');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');

  if (submitBtn && successModal) {
    submitBtn.addEventListener('click', () => {
      const checkedCount = document.querySelectorAll('.flavor-checkbox:checked').length;
      if (checkedCount !== 4) {
        alert('Vui lòng chọn đủ 4 vị bánh để chuyên viên có thể hoàn tất việc đóng gói hộp thử!');
        return;
      }
      successModal.classList.remove('hidden');
    });
  }

  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.add('hidden');
    });
  }

    } catch (err) {
      console.warn('Script execution notice:', err);
    }
  }, []);

  return (
    <main className="w-full pt-24 bg-surface min-h-[calc(100vh-200px)]"><div className="flex flex-col w-full">
{/* Top Banner & Breadcrumb Header Section */}
<section className="relative w-full bg-surface-container-low overflow-hidden py-space-xl">
<div className="max-w-[1280px] mx-auto px-margin">
{/* Breadcrumb */}
<nav className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm mb-space-md">
<a className="hover:text-primary transition-colors" href="#">Trang chủ</a>
<span className="material-symbols-outlined text-xs">chevron_right</span>
<a className="hover:text-primary transition-colors" href="#">Dịch vụ Doanh nghiệp B2B</a>
<span className="material-symbols-outlined text-xs">chevron_right</span>
<span className="text-primary font-semibold">Đăng ký Hộp Mẫu Thử (Sampling Box)</span>
</nav>
{/* Badges & Headline */}
<div className="flex flex-col gap-space-sm max-w-4xl">
<div className="flex flex-wrap items-center gap-space-sm">
<span className="inline-flex items-center gap-1.5 bg-primary-container text-on-primary px-space-sm py-1 rounded text-label-sm font-label-sm uppercase tracking-wider font-semibold shadow-sm">
<span className="material-symbols-outlined text-sm">verified_user</span>
            Chính Sách Tài Trợ B2B 100%
          </span>
<span className="inline-flex items-center gap-1.5 bg-secondary-container text-on-secondary-container px-space-sm py-1 rounded text-label-sm font-label-sm uppercase tracking-wider font-semibold">
<span className="material-symbols-outlined text-sm">bolt</span>
            Giao Nhanh 24h Tận Bàn Làm Việc
          </span>
<span className="inline-flex items-center gap-1.5 bg-surface-container text-on-surface-variant px-space-sm py-1 rounded text-label-sm font-label-sm">
<span className="material-symbols-outlined text-sm">inventory_2</span>
            Dành Riêng Cho Đơn Hàng Tổ Chức &gt; 50 Hộp
          </span>
</div>
<h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
          Trải Nghiệm Hương Vị &amp; Chất Liệu Thực Tế Trước Khi Ký Hợp Đồng
        </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
          Nguyệt Phố gửi tặng bộ Hộp Mẫu Thử (Sampling Kit) gồm 4 vị bánh tuyển chọn từ các xưởng danh tiếng, kèm mẫu thực tế chất liệu nắp hộp ép kim dập nổi logo doanh nghiệp, catalog bảng giá chiết khấu niên vụ 2024.
        </p>
</div>
{/* Highlight Stats Row */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-gutter mt-space-lg pt-space-md">
<div className="flex items-center gap-space-sm bg-surface p-space-sm rounded-lg shadow-sm">
<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined">kitchen</span>
</div>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">4 Vị Bánh</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Trọng lượng chuẩn 120g</span>
</div>
</div>
<div className="flex items-center gap-space-sm bg-surface p-space-sm rounded-lg shadow-sm">
<div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined">workspace_premium</span>
</div>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">Mẫu Logo Thật</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Dát kim nhũ vàng 24K</span>
</div>
</div>
<div className="flex items-center gap-space-sm bg-surface p-space-sm rounded-lg shadow-sm">
<div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined">schedule</span>
</div>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">Hỏa Tốc 24h</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Bảo quản mát tiêu chuẩn</span>
</div>
</div>
<div className="flex items-center gap-space-sm bg-surface p-space-sm rounded-lg shadow-sm">
<div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
<span className="material-symbols-outlined">handshake</span>
</div>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">0 VNĐ Chi Phí</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Tài trợ 100% không ràng buộc</span>
</div>
</div>
</div>
</div>
</section>
{/* Main Content Layout */}
<section className="max-w-[1280px] w-full mx-auto px-margin py-space-xl">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
{/* Left Column: Step-by-Step Interactive Form */}
<div className="lg:col-span-8 flex flex-col gap-space-xl">
{/* BƯỚC 1: CHỌN XƯỞNG BÁNH & BỘ SƯU TẬP */}
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-sm">
<span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-title-sm text-sm">1</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Chọn Xưởng Bánh &amp; Bộ Sưu Tập Mẫu</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Lựa chọn phong vị chế tác đại diện từ xưởng uy tín đã chứng nhận OCOP &amp; HACCP</p>
</div>
</div>
<span className="hidden sm:inline-flex text-label-sm font-label-sm text-secondary bg-surface-container px-space-xs py-1 rounded">
              Bước 1/4
            </span>
</div>
{/* Workshops Radio Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md" id="workshop-container">
{/* Workshop 1 (Active) */}
<label className="cursor-pointer relative flex flex-col p-space-md rounded-lg bg-surface-container-low transition-all duration-200 hover:shadow-md workshop-card selected-workshop" data-workshop="hungky">
<input defaultChecked className="sr-only" name="workshop" type="radio" defaultValue="hungky"/>
<div className="flex items-start justify-between mb-space-xs">
<span className="inline-flex items-center gap-1 text-label-sm font-label-sm px-2 py-0.5 rounded bg-primary text-on-primary font-semibold">
                  Di Sản 70 Năm
                </span>
<span className="material-symbols-outlined text-primary check-icon">check_circle</span>
</div>
<span className="font-title-sm text-title-sm text-on-surface font-bold mt-space-xs">Nghệ Nhân Hưng Ký 1954</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-1">Bánh than củi truyền thống, bí quyết gia truyền Chợ Lớn.</span>
<div className="mt-space-md pt-space-xs flex items-center justify-between text-label-sm font-label-sm">
<span className="text-secondary font-semibold flex items-center gap-0.5">
<span className="material-symbols-outlined text-sm">star</span> 5.0 (340 đánh giá)
                </span>
<span className="text-tertiary flex items-center gap-0.5">
<span className="material-symbols-outlined text-xs">local_shipping</span> Sẵn sàng 24h
                </span>
</div>
</label>
{/* Workshop 2 */}
<label className="cursor-pointer relative flex flex-col p-space-md rounded-lg bg-surface-container-low transition-all duration-200 hover:shadow-md workshop-card" data-workshop="madamehuong">
<input className="sr-only" name="workshop" type="radio" defaultValue="madamehuong"/>
<div className="flex items-start justify-between mb-space-xs">
<span className="inline-flex items-center gap-1 text-label-sm font-label-sm px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-semibold">
                  Hà Thành Tinh Tế
                </span>
<span className="material-symbols-outlined text-outline check-icon">radio_button_unchecked</span>
</div>
<span className="font-title-sm text-title-sm text-on-surface font-bold mt-space-xs">Madame Hương Bakery</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-1">Bánh dưỡng sinh cao cấp, hạt hữu cơ và thảo mộc thanh tao.</span>
<div className="mt-space-md pt-space-xs flex items-center justify-between text-label-sm font-label-sm">
<span className="text-secondary font-semibold flex items-center gap-0.5">
<span className="material-symbols-outlined text-sm">star</span> 4.9 (512 đánh giá)
                </span>
<span className="text-tertiary flex items-center gap-0.5">
<span className="material-symbols-outlined text-xs">local_shipping</span> Sẵn sàng 24h
                </span>
</div>
</label>
{/* Workshop 3 */}
<label className="cursor-pointer relative flex flex-col p-space-md rounded-lg bg-surface-container-low transition-all duration-200 hover:shadow-md workshop-card" data-workshop="kinhdo">
<input className="sr-only" name="workshop" type="radio" defaultValue="kinhdo"/>
<div className="flex items-start justify-between mb-space-xs">
<span className="inline-flex items-center gap-1 text-label-sm font-label-sm px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-semibold">
                  Quy Mô Hiện Đại
                </span>
<span className="material-symbols-outlined text-outline check-icon">radio_button_unchecked</span>
</div>
<span className="font-title-sm text-title-sm text-on-surface font-bold mt-space-xs">Kinh Đô Grand Atelier</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-1">Công suất 50.000 hộp/ngày, hương vị sốt X.O hải vị thượng hạng.</span>
<div className="mt-space-md pt-space-xs flex items-center justify-between text-label-sm font-label-sm">
<span className="text-secondary font-semibold flex items-center gap-0.5">
<span className="material-symbols-outlined text-sm">star</span> 4.9 (890 đánh giá)
                </span>
<span className="text-tertiary flex items-center gap-0.5">
<span className="material-symbols-outlined text-xs">local_shipping</span> Sẵn sàng 24h
                </span>
</div>
</label>
</div>
</div>
{/* BƯỚC 2: TÙY CHỌN 4 VỊ BÁNH NẾM THỬ */}
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-space-md">
<div className="flex items-center gap-space-sm">
<span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-title-sm text-sm">2</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Tùy Chọn 4 Vị Bánh Nếm Thử</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Chọn đúng 4 vị bánh để chuyên viên bếp đóng gói riêng từng hộp chân không</p>
</div>
</div>
<div className="flex items-center gap-space-xs bg-surface-container px-space-sm py-1 rounded text-label-md font-label-md">
<span className="text-on-surface-variant">Đã chọn:</span>
<span className="text-primary font-bold" id="flavor-counter">4 / 4 vị</span>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm" id="flavor-list">
{/* Flavor 1 */}
<label className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors flavor-item selected-flavor">
<div className="flex items-center gap-space-sm">
<input defaultChecked className="flavor-checkbox w-4 h-4 rounded text-primary focus:ring-0" name="flavor" type="checkbox" defaultValue="Bào Ngư Vi Cá Thượng Hạng"/>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">1. Bào Ngư Vi Cá Thượng Hạng</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Hương vị mặn vương giả, nhân hải vị chọn lọc sốt XO đậm đà</span>
</div>
</div>
<span className="text-label-sm font-label-sm bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold whitespace-nowrap">VIP Gifting</span>
</label>
{/* Flavor 2 */}
<label className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors flavor-item selected-flavor">
<div className="flex items-center gap-space-sm">
<input defaultChecked className="flavor-checkbox w-4 h-4 rounded text-primary focus:ring-0" name="flavor" type="checkbox" defaultValue="Thập Cẩm Xá Xíu Lạp Xưởng Mai Quế Lộ"/>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">2. Thập Cẩm Xá Xíu Lạp Xưởng Mai Quế Lộ</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Hương vị di sản cung đình 10 loại hạt phối rượu ủ gỗ sồi</span>
</div>
</div>
<span className="text-label-sm font-label-sm bg-surface-container-highest text-on-surface px-2 py-0.5 rounded font-semibold whitespace-nowrap">Cổ Truyền</span>
</label>
{/* Flavor 3 */}
<label className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors flavor-item selected-flavor">
<div className="flex items-center gap-space-sm">
<input defaultChecked className="flavor-checkbox w-4 h-4 rounded text-primary focus:ring-0" name="flavor" type="checkbox" defaultValue="Sen Nhuyễn Hạt Dưa Trứng Muối"/>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">3. Sen Nhuyễn Hạt Dưa Trứng Muối</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Hạt sen Tịnh Tâm Huế xay nhuyễn mịn, 1 trứng muối bùi béo</span>
</div>
</div>
<span className="text-label-sm font-label-sm bg-surface-container-highest text-on-surface px-2 py-0.5 rounded font-semibold whitespace-nowrap">Thanh Nhã</span>
</label>
{/* Flavor 4 */}
<label className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors flavor-item selected-flavor">
<div className="flex items-center gap-space-sm">
<input defaultChecked className="flavor-checkbox w-4 h-4 rounded text-primary focus:ring-0" name="flavor" type="checkbox" defaultValue="Yến Sào Tuyết Nham Dưỡng Sinh"/>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">4. Yến Sào Tuyết Nham Dưỡng Sinh</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Sợi yến đảo nguyên chất kết hợp đường ăn kiêng Isomalt</span>
</div>
</div>
<span className="text-label-sm font-label-sm bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded font-semibold whitespace-nowrap">Ít Ngọt</span>
</label>
{/* Optional Alternative 1 */}
<label className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors flavor-item">
<div className="flex items-center gap-space-sm">
<input className="flavor-checkbox w-4 h-4 rounded text-primary focus:ring-0" name="flavor" type="checkbox" defaultValue="Trà Xanh Uji Matcha Hạnh Nhân"/>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">5. Trà Xanh Uji Matcha Hạnh Nhân</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Bột trà xanh Nhật thượng hạng phối hạt hạnh nhân rang bơ</span>
</div>
</div>
<span className="text-label-sm font-label-sm bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded">Tùy Chọn</span>
</label>
{/* Optional Alternative 2 */}
<label className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors flavor-item">
<div className="flex items-center gap-space-sm">
<input className="flavor-checkbox w-4 h-4 rounded text-primary focus:ring-0" name="flavor" type="checkbox" defaultValue="Hải Vị Sốt X.O Tôm Khô Cực Phẩm"/>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">6. Hải Vị Sốt X.O Tôm Khô Cực Phẩm</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Hải sản sấy dẻo tẩm ướp cay dịu vị sốt gia truyền Hồng Kông</span>
</div>
</div>
<span className="text-label-sm font-label-sm bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded">Tùy Chọn</span>
</label>
</div>
</div>
{/* BƯỚC 3: MẪU CHẤT LIỆU HỘP & ÉP KIM LOGO */}
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-sm">
<span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-title-sm text-sm">3</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Đăng Ký Mẫu Thử Chất Liệu &amp; Ép Kim Logo</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Nguyệt Phố chế tác 01 thẻ mẫu mini dập nổi logo doanh nghiệp gửi kèm hộp</p>
</div>
</div>
<span className="hidden sm:inline-flex text-label-sm font-label-sm text-secondary bg-surface-container px-space-xs py-1 rounded">
              Bước 3/4
            </span>
</div>
{/* Packaging Material Options */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mb-space-md" id="material-container">
{/* Material 1: Lacquer */}
<label className="cursor-pointer p-space-md rounded-lg bg-surface-container-low hover:shadow-md transition-all flex flex-col justify-between material-card selected-material" data-material="lacquer">
<input defaultChecked className="sr-only" name="packaging_material" type="radio" defaultValue="lacquer"/>
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="material-symbols-outlined text-secondary">palette</span>
<span className="material-symbols-outlined text-primary check-material">check_circle</span>
</div>
<span className="font-title-sm text-title-sm text-on-surface block font-bold">Hộp Sơn Mài Cung Đình</span>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Cốt gỗ MDF phủ 12 lớp sơn mài ta bóng gương, dập logo lá vàng 24K thủ công.</p>
</div>
<div className="mt-space-md text-label-sm font-label-sm text-secondary font-semibold">Phân khúc VIP Quà Ngoại Giao</div>
</label>
{/* Material 2: Art Paper */}
<label className="cursor-pointer p-space-md rounded-lg bg-surface-container-low hover:shadow-md transition-all flex flex-col justify-between material-card" data-material="paper">
<input className="sr-only" name="packaging_material" type="radio" defaultValue="paper"/>
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="material-symbols-outlined text-secondary">layers</span>
<span className="material-symbols-outlined text-outline check-material">radio_button_unchecked</span>
</div>
<span className="font-title-sm text-title-sm text-on-surface block font-bold">Giấy Mỹ Thuật Dập Nổi 3D</span>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Giấy mỹ thuật nhập khẩu Ý vân sần, ép kim nhũ vàng champagne đa tầng sắc nét.</p>
</div>
<div className="mt-space-md text-label-sm font-label-sm text-secondary font-semibold">Phân khúc Nhân Viên &amp; Đối Tác</div>
</label>
{/* Material 3: Pine Wood */}
<label className="cursor-pointer p-space-md rounded-lg bg-surface-container-low hover:shadow-md transition-all flex flex-col justify-between material-card" data-material="wood">
<input className="sr-only" name="packaging_material" type="radio" defaultValue="wood"/>
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="material-symbols-outlined text-secondary">carpenter</span>
<span className="material-symbols-outlined text-outline check-material">radio_button_unchecked</span>
</div>
<span className="font-title-sm text-title-sm text-on-surface block font-bold">Gỗ Thông Khắc Laser Mộc</span>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Gỗ thông tự nhiên nguyên khối xử lý ẩm, khắc laser chìm phủ màu vàng đồng sang trọng.</p>
</div>
<div className="mt-space-md text-label-sm font-label-sm text-secondary font-semibold">Phân khúc Thân Thiện Môi Trường</div>
</label>
</div>
{/* Logo Auto-detected preview banner */}
<div className="p-space-md rounded-lg bg-surface-container flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center shadow-sm">
<span className="font-headline-sm text-headline-sm text-secondary font-bold">V</span>
</div>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface flex items-center gap-1">
                  Logo đồng hành: Tập đoàn Vingroup
                  <span className="material-symbols-outlined text-xs text-secondary" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Tệp đang chọn: <strong className="text-on-surface">Vingroup_Brandmark_Gold_2024.ai</strong> (Vector chuẩn xưởng in)</span>
</div>
</div>
<div className="flex items-center gap-space-sm w-full md:w-auto">
<button className="text-on-surface hover:text-primary font-label-md text-label-md px-space-sm py-2 rounded transition-colors flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-sm">visibility</span>
                Xem Bản Thử Mockup
              </button>
<button className="bg-surface hover:bg-surface-variant text-on-surface font-label-md text-label-md px-space-md py-2 rounded-lg transition-colors flex items-center gap-1 shadow-sm" type="button">
<span className="material-symbols-outlined text-sm">upload_file</span>
                Đổi Tệp Logo Khác
              </button>
</div>
</div>
</div>
{/* BƯỚC 4: THÔNG TIN TIẾP NHẬN VĂN PHÒNG */}
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-sm">
<span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-title-sm text-sm">4</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Thông Tin Tiếp Nhận Văn Phòng &amp; Quy Mô</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Chuyên viên giao vận mang trực tiếp đến lễ tân hoặc văn phòng đại diện</p>
</div>
</div>
<span className="hidden sm:inline-flex text-label-sm font-label-sm text-secondary bg-surface-container px-space-xs py-1 rounded">
              Bước 4/4
            </span>
</div>
<form className="space-y-space-md" id="sampling-form">
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
<div className="flex flex-col gap-1.5">
<label className="font-title-sm text-body-sm text-on-surface">Họ &amp; Tên Người Nhận (Ban Mua Sắm / C&amp;B) *</label>
<input className="w-full bg-surface-container-low rounded-lg px-space-md py-2.5 text-on-surface font-body-md focus:outline-none focus:bg-surface shadow-inner" required="" type="text" defaultValue="Trần Đình Khang"/>
</div>
<div className="flex flex-col gap-1.5">
<label className="font-title-sm text-body-sm text-on-surface">Số Điện Thoại Trực Tiếp *</label>
<input className="w-full bg-surface-container-low rounded-lg px-space-md py-2.5 text-on-surface font-body-md focus:outline-none focus:bg-surface shadow-inner" required="" type="tel" defaultValue="0918 293 888"/>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
<div className="flex flex-col gap-1.5">
<label className="font-title-sm text-body-sm text-on-surface">Tên Công Ty / Doanh Nghiệp *</label>
<input className="w-full bg-surface-container-low rounded-lg px-space-md py-2.5 text-on-surface font-body-md focus:outline-none focus:bg-surface shadow-inner" required="" type="text" defaultValue="Tập đoàn Vingroup (Trụ sở chính)"/>
</div>
<div className="flex flex-col gap-1.5">
<label className="font-title-sm text-body-sm text-on-surface">Quy Mô Đơn Dự Kiến (Giúp áp dụng khung chiết khấu VIP)</label>
<select className="w-full bg-surface-container-low rounded-lg px-space-md py-2.5 text-on-surface font-body-md focus:outline-none focus:bg-surface shadow-inner">
<option value="50-150">50 - 150 Hộp (Chiết khấu cơ bản 15% - 20%)</option>
<option selected="" value="200-500">200 - 500 Hộp (Chiết khấu Doanh Nghiệp VIP 25% - 28%)</option>
<option value="500-1000">500 - 1.000 Hộp (Chiết khấu Đại Tập Đoàn 30% - 32%)</option>
<option value="over-1000">&gt; 1.000 Hộp (Gói Bespoke tùy biến 100% chi phí)</option>
</select>
</div>
</div>
<div className="flex flex-col gap-1.5">
<label className="font-title-sm text-body-sm text-on-surface">Địa Chỉ Nhận Hộp Mẫu Thử *</label>
<input className="w-full bg-surface-container-low rounded-lg px-space-md py-2.5 text-on-surface font-body-md focus:outline-none focus:bg-surface shadow-inner" required="" type="text" defaultValue="Tòa nhà Symphony, Đường Chu Huy Mân, KĐT Vinhomes Riverside, Long Biên, Hà Nội"/>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
<div className="flex flex-col gap-1.5">
<label className="font-title-sm text-body-sm text-on-surface">Khung Giờ Tiếp Nhận Thuận Tiện</label>
<select className="w-full bg-surface-container-low rounded-lg px-space-md py-2.5 text-on-surface font-body-md focus:outline-none focus:bg-surface shadow-inner">
<option selected="">Giờ hành chính: Sáng 09:00 - 11:30</option>
<option>Giờ hành chính: Chiều 14:00 - 16:30</option>
<option>Hẹn trước qua điện thoại 30 phút</option>
</select>
</div>
<div className="flex flex-col gap-1.5">
<label className="font-title-sm text-body-sm text-on-surface">Ghi Chú Đặc Biệt Cho Xưởng &amp; Bếp</label>
<input className="w-full bg-surface-container-low rounded-lg px-space-md py-2.5 text-on-surface font-body-md focus:outline-none focus:bg-surface shadow-inner" placeholder="Ví dụ: Gửi kèm túi giấy mẫu, kèm hóa đơn mẫu VAT..." type="text"/>
</div>
</div>
<div className="pt-space-xs flex items-center gap-space-xs">
<input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-0" id="policy_agree" type="checkbox"/>
<label className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer" htmlFor="policy_agree">
                Tôi xác nhận đại diện cho doanh nghiệp đăng ký thẩm định mẫu và đồng ý nhận tư vấn từ chuyên viên tài khoản B2B Nguyệt Phố.
              </label>
</div>
</form>
</div>
</div>
{/* Right Column: Sticky Summary & Confirmation Box */}
<div className="lg:col-span-4 sticky top-28 space-y-space-md">
{/* Summary Box Card */}
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-md flex flex-col gap-space-md">
{/* Image Header Placeholder of the actual Luxury Sampling Box */}
<div className="relative w-full h-48 rounded-lg overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" data-alt="A luxury artisanal Mid-Autumn Festival sampling gift box for Vietnamese corporate B2B tasting. The box is elegant deep crimson and lacquer gold, open to reveal 4 exquisite mooncakes stamped with traditional patterns, accompanied by fine tea sachets, swatches of brocade fabric, and a 24k gold stamped logo plaque on fine paper. Cinematic warm editorial studio lighting, immaculate presentation." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_VeDSdlEyYZiCDTy3nG-CHfype_6xyRpdLiO9K-IhEum9M6ydIj6jkop8GO7fWkgrMLbBTF1QN4b94WJi2Zu4hZDnZVSEDl4Z41hqKEf9xWHFy9761VMVmtZGI_Hw2TEXdOi1n4gTwVtrBsipWxBdOaK9yBRatwXxmhguPVBDcsJAG39p1Yn86K1Nb2DG5vuRBKsOAYnGo3MusYljuaGnALxug7cZ2uMGsdlrUnzqN5NGpciD13pqzw"/>
<div className="absolute top-2 left-2 bg-primary/90 backdrop-blur-sm text-on-primary px-space-xs py-0.5 rounded text-label-sm font-label-sm uppercase font-semibold">
              Sampling Box B2B
            </div>
<div className="absolute bottom-2 right-2 bg-surface/90 backdrop-blur-sm text-on-surface px-space-xs py-0.5 rounded text-label-sm font-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-secondary text-sm">award_star</span>
              Mẫu Thực Tế 100%
            </div>
</div>
<div>
<span className="font-label-sm text-label-sm uppercase text-secondary font-bold tracking-wider">HỘP THỬ NGHIỆM THƯƠNG PHẨM</span>
<h3 className="font-headline-sm text-headline-sm text-primary">Bộ Mẫu Thử Doanh Nghiệp VIP</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Được chuẩn bị riêng cho <strong className="text-on-surface">Tập đoàn Vingroup</strong></p>
</div>
{/* Included items breakdown list */}
<div className="space-y-space-xs pt-space-xs text-body-sm font-body-sm">
<div className="flex items-start gap-space-xs text-on-surface">
<span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_box</span>
<span><strong>04 Bánh Thử Nghiệm:</strong> 120g/bánh đóng khay vàng &amp; túi hút oxy cao cấp.</span>
</div>
<div className="flex items-start gap-space-xs text-on-surface">
<span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_box</span>
<span><strong>01 Thẻ Mẫu Ép Kim:</strong> Nhũ vàng 24K logo doanh nghiệp xem chất lượng dập nổi.</span>
</div>
<div className="flex items-start gap-space-xs text-on-surface">
<span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_box</span>
<span><strong>01 Bộ Bảng Màu Chất Liệu:</strong> Mẫu vải gấm thêu tay &amp; các dòng giấy mỹ thuật Ý.</span>
</div>
<div className="flex items-start gap-space-xs text-on-surface">
<span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_box</span>
<span><strong>Tài Liệu Chiết Khấu B2B 2024:</strong> Bảng chào giá chi tiết có dấu đỏ ủy quyền xưởng.</span>
</div>
</div>
{/* Selected workshop badge live indicator */}
<div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">Xưởng chế tác đại diện:</span>
<span className="font-title-sm text-body-sm text-primary font-bold" id="selected-workshop-label">Nghệ Nhân Hưng Ký 1954</span>
</div>
{/* Cost calculation */}
<div className="pt-space-xs flex items-baseline justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Chi phí mẫu thử:</span>
<span className="text-label-sm text-on-surface-variant line-through">680.000 đ</span>
</div>
<div className="text-right">
<span className="font-price-display text-price-display text-tertiary">0 VNĐ</span>
<span className="block font-label-sm text-label-sm text-tertiary font-semibold uppercase">Tài trợ 100% (Free Shipping)</span>
</div>
</div>
{/* Big Submit CTA Button */}
<button className="w-full bg-primary-container hover:bg-primary text-on-primary font-title-sm text-title-sm py-3.5 px-space-md rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-space-xs" id="submit-btn" type="button">
<span className="material-symbols-outlined">send</span>
<span>Xác Nhận Đăng Ký Gửi Mẫu Thử</span>
</button>
<p className="font-body-sm text-body-sm text-center text-on-surface-variant">
            Cam kết hoàn toàn <span className="text-on-surface font-semibold">không ràng buộc ký kết</span> hợp đồng nếu chưa đạt yêu cầu của Hội đồng nếm thử.
          </p>
</div>
{/* SafeTrade Assurance Card */}
<div className="bg-surface-container p-space-md rounded-xl flex flex-col gap-space-xs">
<div className="flex items-center gap-space-xs text-secondary font-title-sm text-title-sm">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>security</span>
<span>Quyền Lợi Độc Quyền Tại Nguyệt Phố</span>
</div>
<ul className="space-y-space-xs text-body-sm font-body-sm text-on-surface-variant mt-1">
<li className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Đổi vị thử lại miễn phí nếu ban lãnh đạo muốn khảo sát vị khác
            </li>
<li className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Có chuyên viên tư vấn mang mẫu thực tế đến thuyết trình tại công ty
            </li>
<li className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Bảo mật tuyệt đối thông tin chào giá và bản quyền logo doanh nghiệp
            </li>
</ul>
</div>
</div>
</div>
</section>
{/* 3-Step Process Flow Section */}
<section className="w-full bg-surface-container-low py-space-xl">
<div className="max-w-[1280px] mx-auto px-margin">
<div className="text-center max-w-2xl mx-auto mb-space-xl">
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-widest">Quy Trình Chuẩn B2B</span>
<h2 className="font-headline-md text-headline-md text-primary mt-space-xs">3 Bước Tiếp Theo Sau Khi Đăng Ký Mẫu Thử</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Minh bạch, tốc độ và cam kết chất lượng tuyệt đối theo tiêu chuẩn quốc tế</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
{/* Step 1 Card */}
<div className="bg-surface p-space-lg rounded-xl shadow-sm flex flex-col items-start gap-space-sm relative">
<div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold">
            01
          </div>
<h3 className="font-title-sm text-title-sm text-on-surface font-bold">Giao Hỏa Tốc Trong 24 Giờ</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Hộp nếm thử được bếp ra lò tươi mới, đóng gói hút chân không kèm đá gel giữ nhiệt và giao trực tiếp đến tay người phụ trách tại văn phòng.
          </p>
<div className="mt-auto pt-space-xs flex items-center gap-1 text-label-sm font-label-sm text-secondary font-semibold">
<span className="material-symbols-outlined text-sm">schedule</span>
            Giao đúng khung giờ đã hẹn
          </div>
</div>
{/* Step 2 Card */}
<div className="bg-surface p-space-lg rounded-xl shadow-sm flex flex-col items-start gap-space-sm relative">
<div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-headline-sm text-headline-sm font-bold">
            02
          </div>
<h3 className="font-title-sm text-title-sm text-on-surface font-bold">Hội Đồng Nếm Thử &amp; Duyệt Mẫu</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Ban Mua sắm cùng Lãnh đạo trực tiếp nếm thử chất lượng nhân bánh, độ ngọt và kiểm tra độ tinh xảo của mẫu logo dập nổi ép kim thực tế.
          </p>
<div className="mt-auto pt-space-xs flex items-center gap-1 text-label-sm font-label-sm text-secondary font-semibold">
<span className="material-symbols-outlined text-sm">rate_review</span>
            Phản hồi nhanh qua Zalo/Hotline VIP
          </div>
</div>
{/* Step 3 Card */}
<div className="bg-surface p-space-lg rounded-xl shadow-sm flex flex-col items-start gap-space-sm relative">
<div className="w-12 h-12 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center font-headline-sm text-headline-sm font-bold">
            03
          </div>
<h3 className="font-title-sm text-title-sm text-on-surface font-bold">Ký Hợp Đồng &amp; Ký Quỹ SafeTrade</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Áp dụng chính sách chiết khấu tốt nhất, ký hợp đồng điện tử và được bảo đảm giao hàng đúng hẹn bằng tài khoản ký quỹ SafeTrade Escrow.
          </p>
<div className="mt-auto pt-space-xs flex items-center gap-1 text-label-sm font-label-sm text-tertiary font-semibold">
<span className="material-symbols-outlined text-sm">verified_user</span>
            Bảo hiểm tiến độ đơn hàng 100%
          </div>
</div>
</div>
</div>
</section>
{/* Modal / Toast Confirmation Container (Hidden by default) */}
<div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm hidden flex items-center justify-center p-4" id="success-modal">
<div className="bg-surface rounded-xl max-w-lg w-full p-space-xl shadow-2xl flex flex-col items-center text-center">
<div className="w-16 h-16 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center mb-space-md">
<span className="material-symbols-outlined text-3xl">task_alt</span>
</div>
<span className="font-label-sm text-label-sm uppercase text-secondary font-bold tracking-wider">ĐĂNG KÝ THÀNH CÔNG</span>
<h3 className="font-headline-md text-headline-md text-primary mt-1">Hộp Mẫu Thử Đang Được Chuẩn Bị</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-xs leading-relaxed">
        Chuyên viên phụ trách tài khoản Doanh nghiệp Vingroup sẽ liên hệ với Anh <strong>Trần Đình Khang</strong> trong vòng 15 phút để xác nhận giờ giao hàng chính xác.
      </p>
<div className="w-full bg-surface-container p-space-md rounded-lg mt-space-md text-left space-y-1">
<div className="flex justify-between text-body-sm font-body-sm">
<span className="text-on-surface-variant">Mã yêu cầu gửi mẫu:</span>
<span className="font-bold text-on-surface">SMP-2024-88921</span>
</div>
<div className="flex justify-between text-body-sm font-body-sm">
<span className="text-on-surface-variant">Thời gian dự kiến nhận:</span>
<span className="font-bold text-primary">Sáng mai (09:30)</span>
</div>
</div>
<button className="mt-space-lg w-full bg-primary-container text-on-primary font-title-sm text-title-sm py-3 rounded-lg shadow-sm hover:bg-primary transition-colors" id="close-modal-btn">
        Hoàn Tất &amp; Quay Về Trang Chủ
      </button>
</div>
</div>
</div>
</main>
  );
}
