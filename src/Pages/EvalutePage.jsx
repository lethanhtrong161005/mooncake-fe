import React, { useEffect } from 'react';

export default function EvalutePage({ onNavigate }) {

  return (
    <main className="w-full pt-24 bg-surface min-h-[calc(100vh-200px)]"><div className="flex flex-col w-full">
{/* Content Wrapper within maximum desktop container */}
<div className="w-full max-w-[1280px] mx-auto px-margin py-space-md">
{/* Top Meta: Breadcrumb & Context Header */}
<div className="flex flex-col gap-space-sm mb-space-lg">
<nav className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm overflow-x-auto whitespace-nowrap py-1">
<a className="hover:text-primary transition-colors" href="#">Trang chủ</a>
<span className="material-symbols-outlined text-sm text-outline">chevron_right</span>
<a className="hover:text-primary transition-colors" href="#">Đặt hàng Doanh nghiệp</a>
<span className="material-symbols-outlined text-sm text-outline">chevron_right</span>
<span className="text-on-surface-variant">Hộp mẫu thử #SMP-2024-8892</span>
<span className="material-symbols-outlined text-sm text-outline">chevron_right</span>
<span className="text-primary font-title-sm">Đánh giá &amp; Phê duyệt Mẫu thử</span>
</nav>
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pt-space-xs">
<div>
<div className="flex flex-wrap items-center gap-space-sm mb-space-xs">
<span className="inline-flex items-center gap-1.5 bg-surface-container-high text-tertiary px-space-sm py-1 rounded-full font-label-sm text-label-sm font-semibold tracking-wide">
<span className="material-symbols-outlined text-base text-tertiary">local_shipping</span>
              Đã giao thành công ngày 02/08 • Xe Lạnh Chuyên Dụng
            </span>
<span className="inline-flex items-center gap-1 bg-secondary-container/40 text-on-secondary-container px-space-sm py-1 rounded-full font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-xs">verified</span>
              OCOP 4 Sao • Hưng Ký 1954
            </span>
</div>
<h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            Đánh Giá &amp; Phê Duyệt Mẫu Thử
          </h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-3xl">
            Khảo sát ý kiến hội đồng nếm thử nội bộ, chốt độ ngọt nhân bánh &amp; nghiệm thu mẫu dập logo 24K thực tế trước khi tiến hành ký kết hợp đồng sản xuất hàng loạt.
          </p>
</div>
<div className="flex items-center gap-space-md bg-surface-container-low p-space-sm px-space-md rounded-lg self-start lg:self-auto shadow-sm">
<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-xl">account_circle</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Đại diện Doanh Nghiệp</span>
<span className="font-title-sm text-title-sm text-on-surface">Trần Đình Khang</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Ban Mua sắm &amp; Công đoàn Vingroup</span>
</div>
</div>
</div>
</div>
{/* Main Grid: 8 Cols Workflow Content + 4 Cols Sticky Action Sidebar */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
{/* LEFT CONTENT COLUMN (8 Cols) */}
<div className="lg:col-span-8 flex flex-col gap-space-xl">
{/* SECTION 1: Taste Evaluation Matrix */}
<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between pb-space-sm">
<div className="flex items-center gap-space-sm">
<span className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-title-sm text-title-sm">1</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Khảo Sát &amp; Đánh Giá 4 Vị Bánh Nếm Thử</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Taste Evaluation Matrix • Ghi nhận trực tiếp từ Hội đồng nếm thử</p>
</div>
</div>
<span className="bg-tertiary/10 text-tertiary font-label-sm text-label-sm font-semibold px-space-sm py-1 rounded">
              4/4 Vị Đã Thử Nghiệm
            </span>
</div>
{/* Item 1: Bào Ngư Vi Cá */}
<div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm transition-all hover:shadow-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div className="flex items-center gap-space-sm">
<span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
<h3 className="font-title-md text-title-md text-on-surface">01. Bào Ngư Vi Cá Thượng Hạng</h3>
<span className="bg-surface-variant text-on-surface-variant font-label-sm text-label-sm px-2 py-0.5 rounded">120g • Vị Hải Vị Thượng Phẩm</span>
</div>
<div className="flex items-center gap-1 text-secondary">
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-title-sm text-body-sm font-bold text-on-surface ml-1">5.0/5</span>
</div>
</div>
{/* Parametric Badges */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs py-space-xs">
<div className="bg-surface-container p-space-xs px-space-sm rounded flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">Độ ngọt nhân:</span>
<span className="font-label-sm text-label-sm text-primary font-bold">Chuẩn vị thanh tao</span>
</div>
<div className="bg-surface-container p-space-xs px-space-sm rounded flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">Vỏ nướng:</span>
<span className="font-label-sm text-label-sm text-tertiary font-bold">Chuẩn than củi OCOP</span>
</div>
<div className="bg-surface-container p-space-xs px-space-sm rounded flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">Cảm quan sợi:</span>
<span className="font-label-sm text-label-sm text-on-surface font-semibold">Giòn sần sật 100%</span>
</div>
</div>
<div className="bg-surface-container-lowest p-space-sm rounded text-on-surface-variant font-body-sm text-body-sm italic">
<span className="font-title-sm not-italic font-semibold text-on-surface">Ý kiến Hội đồng:</span> 
              "Vị đậm đà vừa vặn, bào ngư xắt sợi giòn mềm ngậy nhẹ, thơm mùi rượu thuốc bắc dịu, cực kỳ thích hợp làm quà tặng phân khúc Ban Lãnh đạo và đối tác VIP."
            </div>
<div className="flex items-center justify-between pt-1">
<label className="flex items-center gap-space-xs cursor-pointer select-none">
<input defaultChecked className="w-4 h-4 rounded accent-primary text-primary focus:ring-primary" type="checkbox"/>
<span className="font-label-md text-label-md font-semibold text-primary">Duyệt đưa vào set sản xuất chính thức</span>
</label>
<span className="text-tertiary flex items-center gap-1 font-label-sm text-label-sm">
<span className="material-symbols-outlined text-sm">check_circle</span> Không yêu cầu chỉnh sửa
              </span>
</div>
</div>
{/* Item 2: Thập Cẩm Xá Xíu */}
<div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm transition-all hover:shadow-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div className="flex items-center gap-space-sm">
<span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<h3 className="font-title-md text-title-md text-on-surface">02. Thập Cẩm Xá Xíu Mai Quế Lộ</h3>
<span className="bg-surface-variant text-on-surface-variant font-label-sm text-label-sm px-2 py-0.5 rounded">120g • Cổ Truyền Di Sản</span>
</div>
<div className="flex items-center gap-1 text-secondary">
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 0.8"}}>star_half</span>
<span className="font-title-sm text-body-sm font-bold text-on-surface ml-1">4.8/5</span>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs py-space-xs">
<div className="bg-surface-container p-space-xs px-space-sm rounded flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">Độ ngọt nhân:</span>
<span className="font-label-sm text-label-sm text-on-surface font-bold">Vừa miệng truyền thống</span>
</div>
<div className="bg-surface-container p-space-xs px-space-sm rounded flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">Hương Mai Quế Lộ:</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">Gia truyền 10 vị hạt</span>
</div>
<div className="bg-surface-container p-space-xs px-space-sm rounded flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">Mỡ phần xá xíu:</span>
<span className="font-label-sm text-label-sm text-on-surface font-semibold">Giòn trong suốt</span>
</div>
</div>
<div className="bg-secondary-container/20 p-space-sm rounded flex flex-col gap-1">
<div className="flex items-center gap-1 text-secondary">
<span className="material-symbols-outlined text-base">edit_note</span>
<span className="font-title-sm text-body-sm font-bold text-on-secondary-container">Đề xuất tinh chỉnh gửi Nghệ nhân:</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface">
                "Giảm khoảng 5% lượng mỡ đường để người lớn tuổi dùng thanh đạm và dễ tiêu hóa hơn. Giữ nguyên tỷ lệ lá chanh và hạt điều."
              </p>
</div>
<div className="flex items-center justify-between pt-1">
<label className="flex items-center gap-space-xs cursor-pointer select-none">
<input defaultChecked className="w-4 h-4 rounded accent-primary text-primary focus:ring-primary" type="checkbox"/>
<span className="font-label-md text-label-md font-semibold text-primary">Duyệt đưa vào set quà (Đã đính kèm lưu ý giảm 5% ngọt mỡ)</span>
</label>
<span className="text-secondary font-label-sm text-label-sm font-semibold">Chờ xác nhận công thức</span>
</div>
</div>
{/* Item 3: Sen Nhuyễn Hạt Dưa */}
<div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm transition-all hover:shadow-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div className="flex items-center gap-space-sm">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
<h3 className="font-title-md text-title-md text-on-surface">03. Sen Nhuyễn Hạt Dưa Trứng Muối</h3>
<span className="bg-surface-variant text-on-surface-variant font-label-sm text-label-sm px-2 py-0.5 rounded">120g • Thanh Nhã Cố Đô</span>
</div>
<div className="flex items-center gap-1 text-secondary">
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-title-sm text-body-sm font-bold text-on-surface ml-1">5.0/5</span>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs py-space-xs">
<div className="bg-surface-container p-space-xs px-space-sm rounded flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">Nguyên liệu Sen:</span>
<span className="font-label-sm text-label-sm text-tertiary font-bold">Sen Tịnh Tâm Huế</span>
</div>
<div className="bg-surface-container p-space-xs px-space-sm rounded flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">Lòng đỏ trứng:</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">Dẻo quánh ngâm mè</span>
</div>
<div className="bg-surface-container p-space-xs px-space-sm rounded flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">Hậu vị:</span>
<span className="font-label-sm text-label-sm text-on-surface font-semibold">Thanh mát không gắt</span>
</div>
</div>
<div className="bg-surface-container-lowest p-space-sm rounded text-on-surface-variant font-body-sm text-body-sm italic">
<span className="font-title-sm not-italic font-semibold text-on-surface">Ý kiến Hội đồng:</span>
              "Hạt sen xay nhuyễn sánh mịn tuyệt hảo, hoàn toàn không bị cảm giác ngọt gắt ở cổ họng. Trứng muối xử lý sạch thơm, nướng vừa độ bùi béo."
            </div>
<div className="flex items-center justify-between pt-1">
<label className="flex items-center gap-space-xs cursor-pointer select-none">
<input defaultChecked className="w-4 h-4 rounded accent-primary text-primary focus:ring-primary" type="checkbox"/>
<span className="font-label-md text-label-md font-semibold text-primary">Duyệt đưa vào set sản xuất chính thức</span>
</label>
<span className="text-tertiary flex items-center gap-1 font-label-sm text-label-sm">
<span className="material-symbols-outlined text-sm">verified</span> Đạt chuẩn tối đa
              </span>
</div>
</div>
{/* Item 4: Yến Sào Tuyết Nham Dưỡng Sinh */}
<div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm transition-all hover:shadow-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div className="flex items-center gap-space-sm">
<span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
<h3 className="font-title-md text-title-md text-on-surface">04. Yến Sào Tuyết Nham Dưỡng Sinh</h3>
<span className="bg-surface-variant text-on-surface-variant font-label-sm text-label-sm px-2 py-0.5 rounded">120g • Đường Tự Nhiên Isomalt</span>
</div>
<div className="flex items-center gap-1 text-secondary">
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-title-sm text-body-sm font-bold text-on-surface ml-1">4.9/5</span>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs py-space-xs">
<div className="bg-surface-container p-space-xs px-space-sm rounded flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">Hàm lượng Yến:</span>
<span className="font-label-sm text-label-sm text-primary font-bold">12% Tổ Yến Khánh Hòa</span>
</div>
<div className="bg-surface-container p-space-xs px-space-sm rounded flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">Chỉ số GI đường:</span>
<span className="font-label-sm text-label-sm text-tertiary font-bold">Thấp (Phù hợp kiêng)</span>
</div>
<div className="bg-surface-container p-space-xs px-space-sm rounded flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">Vị ngọt tự nhiên:</span>
<span className="font-label-sm text-label-sm text-on-surface font-semibold">Tuyết nham thanh mát</span>
</div>
</div>
<div className="bg-surface-container-lowest p-space-sm rounded text-on-surface-variant font-body-sm text-body-sm italic">
<span className="font-title-sm not-italic font-semibold text-on-surface">Ý kiến Hội đồng:</span>
              "Rất phù hợp với tiêu chí quà tặng sức khỏe dành cho cán bộ công nhân viên thâm niên &amp; đối tác quan tâm chế độ ăn lành mạnh. Độ dẻo mượt cao."
            </div>
<div className="flex items-center justify-between pt-1">
<label className="flex items-center gap-space-xs cursor-pointer select-none">
<input defaultChecked className="w-4 h-4 rounded accent-primary text-primary focus:ring-primary" type="checkbox"/>
<span className="font-label-md text-label-md font-semibold text-primary">Duyệt đưa vào set sản xuất chính thức</span>
</label>
<span className="text-tertiary flex items-center gap-1 font-label-sm text-label-sm">
<span className="material-symbols-outlined text-sm">check_circle</span> Đồng thuận 100%
              </span>
</div>
</div>
</section>
{/* SECTION 2: Physical Sampling Box & 24K Gold Foil Stamping QC */}
<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between pb-space-sm">
<div className="flex items-center gap-space-sm">
<span className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-title-sm text-title-sm">2</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Kiểm Tra &amp; Nghiệm Thu Mẫu Logo Dập Nhũ Vàng 24K</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Chất lượng vỏ hộp sơn mài bóng gương &amp; Mẫu ép kim thực tế đã gửi kèm</p>
</div>
</div>
<span className="bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm font-semibold px-space-sm py-1 rounded flex items-center gap-1">
<span className="material-symbols-outlined text-sm">verified_user</span> QC Mẫu Vật Lý
            </span>
</div>
{/* Proofing Imagery & Specs Mosaic */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
{/* Actual Photo of Physical Sample Box */}
<div className="md:col-span-5 relative rounded-lg overflow-hidden group shadow-md bg-surface-container">
<img className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500" data-alt="Detailed macro photo of a royal ruby lacquer luxury mooncake box with embossed 24K gold foil stamping logo reading VINGROUP - TRÂN QUÝ TRI ÂN. The lacquered surface has a mirror-like polish reflecting subtle warm ambient lights. Crisp embossed lines, luxurious beveling, imperial oriental gift aesthetic, soft golden shadows and cinematic macro photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk_cu0qG30XZ85vfdV6FfzYzfPIvjrUEsBFvzau2Iz8AhMVtDrbbrZT_BPjbSMLguTIQf1PizlJp06tvfeGaCBT8QYZoM2sKXJmnQeaEO9LEW28OHC4HmRVe0NMKCvZPIi2txvym1M3egxrfcvylf8dK5oydBOr5t6LfeTfPOruVNhugAOyAFDy71kKN5GhIgKXLnwGZW5g-7Igv6r5chTk-_BYiD2qF4xX8FObIE66yHhpr2_WKKfjA"/>
<div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-space-sm text-on-primary">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-container font-bold">Mẫu chụp vật lý thực tế</span>
<p className="font-body-sm text-body-sm truncate">Hộp nắp bản lề Sơn mài Đỏ Ruby • Logo Vingroup Dập Nổi</p>
</div>
</div>
{/* Quality Check Table */}
<div className="md:col-span-7 flex flex-col gap-space-sm">
<div className="space-y-space-xs">
{/* Check 1 */}
<div className="flex items-start gap-space-sm p-space-sm rounded bg-surface-container-low">
<span className="material-symbols-outlined text-tertiary text-xl mt-0.5">task_alt</span>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">Độ sắc nét đường nét Vector 100%</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Khuôn đồng CNC chính xác theo Brand Guideline của Tập đoàn, không răng cưa ở góc bo.</span>
</div>
</div>
{/* Check 2 */}
<div className="flex items-start gap-space-sm p-space-sm rounded bg-surface-container-low">
<span className="material-symbols-outlined text-tertiary text-xl mt-0.5">task_alt</span>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">Chuẩn sắc màu nhũ kim Pantone 871C</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Lớp màng nhũ Đức Kurz sắc sảo, chống trầy xước và không bị ố nhiệt khi bảo quản.</span>
</div>
</div>
{/* Check 3 */}
<div className="flex items-start gap-space-sm p-space-sm rounded bg-surface-container-low">
<span className="material-symbols-outlined text-tertiary text-xl mt-0.5">task_alt</span>
<div className="flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface">Độ dập sâu 0.5mm nổi khối 3D tinh xảo</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Bề mặt sơn mài 5 lớp phẳng mịn tuyệt đối, không có bọt khí hoặc gợn lồi lõm.</span>
</div>
</div>
</div>
{/* Radio Decision for Tooling */}
<div className="p-space-sm bg-surface-container rounded flex flex-col gap-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Xác nhận khuôn dập sản xuất:</span>
<div className="flex flex-col sm:flex-row gap-space-sm">
<label className="flex items-center gap-2 cursor-pointer">
<input defaultChecked className="accent-primary text-primary focus:ring-primary" name="tooling_confirm" type="radio"/>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Đồng ý mẫu dập này (Vào sản xuất 200 hộp)</span>
</label>
<label className="flex items-center gap-2 cursor-pointer">
<input className="accent-primary text-primary focus:ring-primary" name="tooling_confirm" type="radio"/>
<span className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface">Yêu cầu tinh chỉnh (Làm lại miễn phí 01 lần)</span>
</label>
</div>
</div>
</div>
</div>
</section>
{/* SECTION 3: Council Voting Protocol & Notes */}
<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between pb-space-sm">
<div className="flex items-center gap-space-sm">
<span className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-title-sm text-title-sm">3</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Biên Bản Tổng Hợp Ý Kiến Hội Đồng Nếm Thử</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Hội đồng 8 thành viên Ban Giám Đốc, Công Đoàn &amp; Quản trị Trải nghiệm</p>
</div>
</div>
<div className="flex items-center gap-space-xs">
<span className="inline-block w-2.5 h-2.5 rounded-full bg-tertiary"></span>
<span className="font-label-sm text-label-sm font-bold text-tertiary">8/8 ĐỒNG THUẬN</span>
</div>
</div>
{/* Visual Bar and Stat Overview */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md bg-surface-container-low p-space-md rounded-lg">
<div className="flex flex-col">
<span className="font-body-sm text-body-sm text-on-surface-variant">Tỷ lệ hài lòng tổng quan</span>
<span className="font-display-hero text-headline-lg text-primary leading-none mt-1">100%</span>
<span className="font-label-sm text-label-sm text-tertiary mt-1">8/8 Phiếu Rất Hài Lòng</span>
</div>
<div className="flex flex-col">
<span className="font-body-sm text-body-sm text-on-surface-variant">Điểm chất lượng hương vị</span>
<span className="font-display-hero text-headline-lg text-secondary leading-none mt-1">4.92<span className="text-headline-sm text-on-surface-variant">/5</span></span>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Cao hơn 18% tiêu chuẩn kỳ vọng</span>
</div>
<div className="flex flex-col">
<span className="font-body-sm text-body-sm text-on-surface-variant">Mức độ hoàn thiện bao bì</span>
<span className="font-display-hero text-headline-lg text-tertiary leading-none mt-1">5.0<span className="text-headline-sm text-on-surface-variant">/5</span></span>
<span className="font-label-sm text-label-sm text-tertiary mt-1">Chuẩn mực quà tặng VIP Tập đoàn</span>
</div>
</div>
{/* General Instruction Note to Bakery Atelier */}
<div className="flex flex-col gap-space-xs">
<label className="font-title-sm text-title-sm text-on-surface flex items-center justify-between">
<span>Ghi chú chỉ dẫn kỹ thuật gửi Xưởng bánh Hưng Ký:</span>
<span className="font-body-sm text-body-sm text-outline">Kèm vào phụ lục Hợp đồng điện tử</span>
</label>
<textarea  className="w-full bg-surface border-none rounded-lg p-space-sm font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary shadow-inner" placeholder="Nhập ghi chú hoặc yêu cầu riêng..." rows="3" defaultValue="Chất lượng 04 bánh mẫu và hộp sơn mài rất xuất sắc. Xưởng lưu ý giữ đúng độ mềm vỏ mỏng và độ ngọt thanh như mẫu thử số 1 và số 3 khi nướng mẻ lớn. Vị số 2 điều chỉnh giảm nhẹ 5% độ ngọt mỡ như đã thống nhất." />
</div>
{/* Upload Supplementary Docs or Photo Proofs */}
<div className="p-space-md rounded-lg bg-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-2xl">attachment</span>
<div>
<span className="font-title-sm text-body-sm text-on-surface">Tài liệu đính kèm nội bộ (Tùy chọn)</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">Phiếu nếm thử chữ ký tay scan hoặc ảnh thực tế mở hộp tại văn phòng.</p>
</div>
</div>
<div className="flex items-center gap-space-xs">
<button className="px-space-sm py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors shadow-sm flex items-center gap-1">
<span className="material-symbols-outlined text-base">upload_file</span>
                Tải lên PDF/Ảnh
              </button>
</div>
</div>
</section>
</div>
{/* RIGHT SIDEBAR COLUMN: Sticky RFQ Summary, Approval CTA & SafeTrade Escrow (4 Cols) */}
<div className="lg:col-span-4 sticky top-28 flex flex-col gap-space-md">
{/* Summary & Approval Card */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col gap-space-md">
<div className="flex items-center justify-between pb-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Hồ Sơ Đơn Hàng Doanh Nghiệp</span>
<span className="font-label-sm text-label-sm bg-primary/10 text-primary px-2 py-0.5 rounded font-mono">#RFQ-2024-8892</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-primary font-bold">200 Hộp VIP Vượng Nguyệt</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Set 4 Bánh Thượng Hạng + Trà Sen Tây Hồ + Hộp Sơn Mài Cao Cấp</p>
</div>
{/* Order Parameters List */}
<div className="space-y-space-xs pt-space-xs">
<div className="flex justify-between font-body-sm text-body-sm py-1">
<span className="text-on-surface-variant">Đơn vị chế tác:</span>
<span className="font-title-sm text-on-surface">Hưng Ký 1954 (Hà Nội)</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm py-1">
<span className="text-on-surface-variant">Đơn giá dự kiến:</span>
<span className="text-on-surface font-medium">720.000 đ / Hộp</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm py-1">
<span className="text-on-surface-variant">Chiết khấu Doanh nghiệp:</span>
<span className="text-tertiary font-medium">-15% (VIP Tier)</span>
</div>
<div className="flex justify-between items-baseline pt-space-xs bg-surface-container-low p-space-sm rounded">
<span className="font-title-sm text-title-sm text-on-surface">Tổng ngân sách:</span>
<span className="font-price-display text-price-display text-primary font-bold">144.000.000 ₫</span>
</div>
</div>
{/* Sampling Workflow Timeline */}
<div className="bg-surface-container p-space-sm rounded-lg flex flex-col gap-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Tiến độ phê duyệt mẫu:</span>
<div className="flex items-center justify-between text-xs">
<span className="text-tertiary font-medium flex items-center gap-0.5">
<span className="material-symbols-outlined text-sm">check_circle</span> Đã nhận 02/08
              </span>
<span className="material-symbols-outlined text-xs text-outline">arrow_forward</span>
<span className="text-primary font-semibold flex items-center gap-0.5">
<span className="material-symbols-outlined text-sm">pending</span> Đang đánh giá
              </span>
<span className="material-symbols-outlined text-xs text-outline">arrow_forward</span>
<span className="text-on-surface-variant">Chờ ký kết</span>
</div>
</div>
{/* Primary & Secondary Approval CTA Buttons */}
<div className="flex flex-col gap-space-xs pt-space-xs">
<button className="w-full bg-primary-container hover:bg-primary text-on-primary font-title-sm text-title-sm py-3.5 px-space-md rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-space-sm text-center">
<span className="material-symbols-outlined text-xl">draw</span>
<span>PHÊ DUYỆT MẪU &amp; KÝ HỢP ĐỒNG (E-CONTRACT)</span>
</button>
<button className="w-full bg-transparent hover:bg-surface-container text-on-surface font-label-md text-label-md py-2.5 px-space-md rounded-lg transition-colors flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-lg text-secondary">cached</span>
<span>Yêu Cầu Gửi Mẫu Điều Chỉnh (Miễn Phí)</span>
</button>
<button className="w-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-md text-label-md py-2 px-space-md rounded-lg transition-colors flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-base">picture_as_pdf</span>
<span>Xuất Biên Bản Nghiệm Thu (PDF)</span>
</button>
</div>
</div>
{/* SafeTrade Guarantee Card */}
<div className="bg-surface-container-low rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center gap-space-xs text-secondary">
<span className="material-symbols-outlined text-xl">gavel</span>
<span className="font-title-sm text-title-sm font-semibold">Bảo Chứng Chất Lượng SafeTrade</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Hợp đồng kinh tế sẽ <strong className="text-on-surface">gắn kèm trực tiếp bản lưu mẫu thử này</strong>. Nếu mẻ sản xuất hàng loạt sai lệch về trọng lượng, độ ngọt nhân hoặc chất lượng sơn mài đã duyệt, Quỹ Ký Quỹ SafeTrade bảo hộ bồi hoàn 200% giá trị hợp đồng.
          </p>
<div className="pt-space-xs flex items-center justify-between text-body-sm">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-tertiary text-base">support_agent</span>
<span className="font-label-sm text-label-sm text-on-surface">Chuyên viên B2B:</span>
</div>
<a className="font-title-sm text-primary font-bold hover:underline" href="tel:18006886">1800 6886 (Nhánh 2)</a>
</div>
</div>
</div>
</div>
{/* BOTTOM PROGRESSION SECTION: Visual 3-Step Next Process */}
<div className="mt-space-xl bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-space-md pb-space-xs">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Lộ Trình Triển Khai Tiếp Theo</span>
<h4 className="font-headline-sm text-headline-sm text-on-surface">Quy Trình Hoàn Tất Đơn Hàng Sau Phê Duyệt</h4>
</div>
<span className="font-body-sm text-body-sm text-outline">Chuẩn mực vận hành B2B Escrow Nguyệt Phố</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
{/* Step 1 (Current / Completing) */}
<div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-xs relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-label-md text-label-md font-bold">1</span>
<span className="font-label-sm text-label-sm bg-tertiary/10 text-tertiary font-bold px-2 py-0.5 rounded">Đang Hoàn Tất</span>
</div>
<h5 className="font-title-sm text-title-sm text-on-surface mt-1">Phê Duyệt Mẫu &amp; Nghiệm Thu</h5>
<p className="font-body-sm text-body-sm text-on-surface-variant">Chốt 4 vị nhân và nắp hộp sơn mài dập logo 24K thực tế cùng xưởng nghệ nhân.</p>
</div>
{/* Step 2 */}
<div className="bg-surface-container p-space-md rounded-lg flex flex-col gap-space-xs relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="w-7 h-7 rounded-full bg-surface-variant text-on-surface flex items-center justify-center font-label-md text-label-md font-bold">2</span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Kế Tiếp</span>
</div>
<h5 className="font-title-sm text-title-sm text-on-surface mt-1">Ký Hợp Đồng &amp; Khóa Ký Quỹ</h5>
<p className="font-body-sm text-body-sm text-on-surface-variant">Ký điện tử qua Token/OTP Ban Mua sắm, thanh toán 50% vào tài khoản ký quỹ SafeTrade bảo đảm.</p>
</div>
{/* Step 3 */}
<div className="bg-surface-container p-space-md rounded-lg flex flex-col gap-space-xs relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="w-7 h-7 rounded-full bg-surface-variant text-on-surface flex items-center justify-center font-label-md text-label-md font-bold">3</span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Sản Xuất &amp; Bàn Giao</span>
</div>
<h5 className="font-title-sm text-title-sm text-on-surface mt-1">Nướng Mẻ Tươi &amp; Xe Lạnh Giao Hàng</h5>
<p className="font-body-sm text-body-sm text-on-surface-variant">Giám sát quy trình nướng qua Camera xưởng, bàn giao đồng loạt tới 5 cơ sở Vingroup.</p>
</div>
</div>
</div>
</div>
</div></main>
  );
}
