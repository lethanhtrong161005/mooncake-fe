import React from 'react';

export default function Notification({ onNavigate }) {
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50"><div className="bg-primary text-on-primary"><div className="max-w-7xl mx-auto px-margin h-8 flex items-center justify-between text-body-sm"><div className="flex items-center gap-space-lg"><span className="flex items-center gap-space-xs font-data-mono"><span className="material-symbols-outlined text-[15px]">call</span> Hotline Doanh nghiệp: <strong className="font-label-md text-secondary-fixed">1800 6886</strong></span><span className="hidden md:flex items-center gap-space-xs"><span className="material-symbols-outlined text-[15px]">receipt_long</span> Xuất hóa đơn VAT điện tử 100% hợp lệ</span></div><div className="flex items-center gap-space-md"><span className="hidden sm:flex items-center gap-space-xs"><span className="material-symbols-outlined text-[15px]">verified_user</span> Hợp đồng mẫu &amp; Bảo chứng ký quỹ</span><div className="flex items-center gap-space-xs cursor-pointer hover:text-secondary-fixed transition-colors"><span className="material-symbols-outlined text-[16px]">language</span><span>VN / VNĐ</span></div></div></div></div><div className="h-20 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="max-w-7xl mx-auto px-margin h-20 flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-md shrink-0"><img alt="Logo biểu trưng thương hiệu sàn giao dịch B2B Bánh Trung Thu Mooncake Marketplace: biểu tượng vầng trăng rằm thanh lịch kết hợp hoa văn khuôn bánh truyền thống dập nổi vàng kim sang trọng trên nền đỏ trầm nhã nhặn.. Brand logo. - Primary color: #991b1b
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-sm
" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1V_fR3x5E0gRCMt0OUxR4aFiB0BqkMtpf12-bPVc7FYwH3DP8_YhmUjCxjPTQQnbj1Z4NVOCpNnZrhkjl0OGUQrYdjX1vTUbbtAF-kqe-9RQs3z0CnCv8AeixyAEl02PZnMU7HxooAOZlWmwHiC7KXzLjoMIGpZqEK68HzfR4mcHFRhUQcSUEVvDtx_mnsJOmEDznf-L4TAfQBAdrBRVBKZv21qBUjWxWgxHWS-tPaEhbO3nfA2EWiWqAU" /><div className="flex flex-col"><span className="font-headline-sm text-headline-sm text-primary leading-none">MoonMarket</span><span className="font-label-sm text-label-sm text-secondary tracking-wider uppercase leading-none mt-1">B2B Enterprise Portal</span></div></div><div className="relative flex-1 max-w-md hidden lg:block"><div className="relative flex items-center"><input className="w-full bg-surface-container-low pl-10 pr-4 py-2 rounded-xl text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-inner" placeholder="Tìm kiếm nhân bánh, xưởng sản xuất, hộp quà tặng VIP..." type="text" /><span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">search</span></div></div><nav className="hidden xl:flex items-center gap-space-xs" data-active-classes="bg-primary-container text-on-primary font-title-md rounded-lg"><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="trang-chu" href="#">Trang chủ</a><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="san-pham-co-san" href="#">Sản phẩm có sẵn</a><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="tim-xuong-gian-hang" href="#">Tìm xưởng &amp; Gian hàng</a><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="bao-gia-rfq" href="#">Báo giá &amp; RFQ</a><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="bang-gia-si" href="#">Bảng giá sỉ</a></nav><div className="flex items-center gap-space-md shrink-0"><button aria-label="Thông báo đơn hàng" className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary font-label-sm text-label-sm text-on-primary leading-none">3</span></button><div className="flex items-center gap-space-sm pl-space-sm cursor-pointer group"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div className="hidden md:flex flex-col text-left"><span className="font-label-md text-label-md text-on-surface leading-tight">Nguyễn Văn An</span><span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">An Phát Corp (Buyer)</span></div><span className="material-symbols-outlined text-on-surface-variant text-[18px] group-hover:text-on-surface transition-colors hidden md:inline">expand_more</span></div></div></div></div></header><main className="w-full pt-28 bg-surface"><div className="flex flex-col w-full">
        <div className="max-w-7xl mx-auto px-margin py-space-lg w-full flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                <span className="material-symbols-outlined text-[16px]">notifications_active</span>
                <span>B2B Event Stream &amp; Webhooks</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span className="text-on-surface-variant font-data-mono">Escrow v2.4</span>
              </div>
              <div className="flex items-center gap-space-sm">
                <h1 className="font-headline-lg text-headline-lg text-primary">Trung tâm Thông báo &amp; Tương tác B2B</h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md shadow-sm" id="unread-counter">
                  3 chưa đọc
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Quản lý luồng cảnh báo hợp đồng điện tử, tiến độ nộp cọc ngân hàng bảo chứng và cập nhật giao hàng PoD thời gian thực.
              </p>
            </div>
            <div className="flex items-center gap-space-xs shrink-0">
              <button className="flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all font-label-md text-label-md shadow-sm" id="btn-mark-all" >
                <span className="material-symbols-outlined text-[18px] text-tertiary">done_all</span>
                <span>Đánh dấu tất cả là đã đọc</span>
              </button>
              <button className="flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-error transition-all font-label-md text-label-md" >
                <span className="material-symbols-outlined text-[18px]">clear_all</span>
                <span>Xóa thông báo cũ</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-space-md">
              <div className="p-1.5 rounded-xl bg-surface-container-low shadow-sm flex items-center gap-1 overflow-x-auto scrollbar-none">
                <button className="filter-tab px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm whitespace-nowrap transition-colors flex items-center gap-1" >
                  <span>Tất cả</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm">5</span>
                </button>
                <button className="filter-tab px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md whitespace-nowrap flex items-center gap-1" >
                  <span className="inline-block w-2 h-2 rounded-full bg-error animate-pulse"></span>
                  <span>Cần xử lý gấp</span>
                </button>
                <button className="filter-tab px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md whitespace-nowrap" >
                  Yêu cầu báo giá (RFQ)
                </button>
                <button className="filter-tab px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md whitespace-nowrap" >
                  Hợp đồng &amp; Milestone
                </button>
                <button className="filter-tab px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md whitespace-nowrap" >
                  Đơn hàng &amp; Vận chuyển
                </button>
              </div>
              <div className="flex flex-col gap-space-md" id="notifications-list">
                <div className="notification-item unread relative flex flex-col md:flex-row gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all" data-category="urgent contract">
                  <div className="flex items-start gap-space-sm min-w-0 flex-1">
                    <div className="relative shrink-0 w-11 h-11 rounded-xl bg-error-container text-on-error-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">gavel</span>
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-error"></span>
                    </div>
                    <div className="flex flex-col min-w-0 flex-1 gap-1">
                      <div className="flex flex-wrap items-center gap-space-xs">
                        <span className="px-2 py-0.5 rounded bg-error text-on-error font-label-sm text-label-sm uppercase font-semibold tracking-wide">
                          Cần hành động - Gấp
                        </span>
                        <span className="font-data-mono text-body-sm text-primary font-semibold">HĐ-2025-00892</span>
                        <span className="text-on-surface-variant text-body-sm">•</span>
                        <span className="text-on-surface-variant text-body-sm flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">schedule</span> 15 phút trước
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                        Nhà cung cấp Tràng An Bakery đã ký điện tử &amp; kích hoạt điều khoản M1
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Vui lòng thanh toán khoản đặt cọc <strong className="text-error font-semibold">M1 (30% - 14.500.000đ)</strong> qua tài khoản Escrow bảo chứng trước <strong>17:00 ngày 25/08</strong> để dây chuyền nướng bánh chính thức vận hành.
                      </p>
                      <div className="flex items-center gap-space-sm mt-1 p-2 rounded-lg bg-surface-container-low max-w-md">
                        <span className="material-symbols-outlined text-[18px] text-tertiary">lock</span>
                        <span className="font-body-sm text-body-sm text-on-surface">Ký quỹ an toàn bởi Techcombank • Hoàn 100% nếu vi phạm SLA</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end gap-space-sm shrink-0 md:min-w-[170px]">
                    <span className="font-label-sm text-label-sm text-error font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">alarm</span> Còn 04 giờ 30 phút
                    </span>
                    <button className="w-full px-space-md py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold transition-all shadow-sm flex items-center justify-center gap-1 group">
                      <span>Ký &amp; Nộp tiền cọc ngay</span>
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                    </button>
                  </div>
                </div>
                <div className="notification-item unread relative flex flex-col md:flex-row gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all" data-category="rfq">
                  <div className="flex items-start gap-space-sm min-w-0 flex-1">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">request_quote</span>
                    </div>
                    <div className="flex flex-col min-w-0 flex-1 gap-1">
                      <div className="flex flex-wrap items-center gap-space-xs">
                        <span className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm uppercase font-semibold">
                          RFQ / Báo giá mới
                        </span>
                        <span className="font-data-mono text-body-sm text-secondary font-semibold">RFQ-2025-00124</span>
                        <span className="text-on-surface-variant text-body-sm">•</span>
                        <span className="text-on-surface-variant text-body-sm flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">schedule</span> 1 giờ trước
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                        Xưởng Bánh Nghệ Nhân Kinh Đô Vàng vừa phản hồi báo giá sỉ
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Gửi phương án cho lô hàng <strong className="text-on-surface font-semibold">500 hộp VIP Trăng Vàng</strong>. Đơn giá trung bình <strong className="text-secondary font-semibold">340.000đ/hộp</strong> (đã chiết khấu 18% và miễn phí in khắc logo hộp sơn mài).
                      </p>
                      <div className="flex flex-wrap gap-space-xs items-center mt-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container font-data-mono text-body-sm text-on-surface-variant">
                          <span className="material-symbols-outlined text-[14px]">verified</span> ISO 22000
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container font-data-mono text-body-sm text-on-surface-variant">
                          <span className="material-symbols-outlined text-[14px]">local_shipping</span> Giao trước Rằm 10 ngày
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end gap-space-sm shrink-0 md:min-w-[170px]">
                    <button className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-secondary font-label-md text-label-md font-semibold transition-all shadow-sm flex items-center justify-center gap-1">
                      <span>So sánh báo giá</span>
                      <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
                    </button>
                  </div>
                </div>
                <div className="notification-item unread relative flex flex-col md:flex-row gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all" data-category="delivery">
                  <div className="flex items-start gap-space-sm min-w-0 flex-1">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">local_shipping</span>
                    </div>
                    <div className="flex flex-col min-w-0 flex-1 gap-1">
                      <div className="flex flex-wrap items-center gap-space-xs">
                        <span className="px-2 py-0.5 rounded bg-tertiary text-on-tertiary font-label-sm text-label-sm uppercase font-semibold">
                          Giao nhận / PoD
                        </span>
                        <span className="font-data-mono text-body-sm text-tertiary font-semibold">ORD-2025-0912</span>
                        <span className="text-on-surface-variant text-body-sm">•</span>
                        <span className="text-on-surface-variant text-body-sm flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">schedule</span> 3 giờ trước
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                        Tài xế đã cập nhật ảnh PoD và chữ ký bàn giao thành công đợt 1
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Giao hoàn tất <strong className="text-on-surface font-semibold">200 hộp quà Thu Tinh Hoa</strong> tại sảnh tầng 1 văn phòng Tập đoàn T&amp;T (Phạm Hùng, Hà Nội). Biên bản bàn giao có kèm chữ ký thủ kho kiểm đếm nguyên vẹn niêm phong.
                      </p>
                      <div className="flex items-center gap-space-sm mt-1">
                        <div className="flex items-center gap-1 text-tertiary font-label-sm text-label-sm font-semibold">
                          <span className="material-symbols-outlined text-[16px]">task_alt</span> 200/200 hộp nguyên kiện
                        </div>
                        <span className="text-on-surface-variant text-body-sm">•</span>
                        <span className="text-on-surface-variant font-data-mono text-body-sm">Ký nhận: Hoàng Thị Mai (Lễ tân)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end gap-space-sm shrink-0 md:min-w-[170px]">
                    <button className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-tertiary font-label-md text-label-md font-semibold transition-all shadow-sm flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">photo_library</span>
                      <span>Xem ảnh xác thực PoD</span>
                    </button>
                  </div>
                </div>
                <div className="notification-item relative flex flex-col md:flex-row gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all opacity-95" data-category="contract">
                  <div className="flex items-start gap-space-sm min-w-0 flex-1">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">palette</span>
                    </div>
                    <div className="flex flex-col min-w-0 flex-1 gap-1">
                      <div className="flex flex-wrap items-center gap-space-xs">
                        <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm uppercase font-semibold">
                          Thiết kế Packaging
                        </span>
                        <span className="font-data-mono text-body-sm text-on-surface-variant font-semibold">MCK-2025-V2</span>
                        <span className="text-on-surface-variant text-body-sm">•</span>
                        <span className="text-on-surface-variant text-body-sm flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">schedule</span> 1 ngày trước
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                        Cập nhật bản mockup v2 hộp gỗ ép kim logo doanh nghiệp
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Xưởng Tràng An đã hiệu chỉnh độ đậm màu nhũ đồng cổ điển và tăng kích thước logo tập đoàn lên tỷ lệ 45mm theo đúng yêu cầu Brand Guidelines gửi kèm.
                      </p>
                      <div className="flex items-center gap-space-sm mt-1">
                        <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px]">picture_as_pdf</span> 3D_Render_Box_V2.pdf (14.2 MB)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end gap-space-sm shrink-0 md:min-w-[170px]">
                    <button className="w-full px-space-md py-2.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md font-semibold transition-all shadow-sm flex items-center justify-center gap-1">
                      <span>Duyệt thiết kế</span>
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    </button>
                  </div>
                </div>
                <div className="notification-item relative flex flex-col md:flex-row gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all opacity-95" data-category="contract">
                  <div className="flex items-start gap-space-sm min-w-0 flex-1">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">hotel_class</span>
                    </div>
                    <div className="flex flex-col min-w-0 flex-1 gap-1">
                      <div className="flex flex-wrap items-center gap-space-xs">
                        <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm uppercase font-semibold">
                          Đánh giá giao dịch
                        </span>
                        <span className="font-data-mono text-body-sm text-on-surface-variant font-semibold">HĐ-2025-00781</span>
                        <span className="text-on-surface-variant text-body-sm">•</span>
                        <span className="text-on-surface-variant text-body-sm flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">schedule</span> 2 ngày trước
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                        Hợp đồng cung ứng bánh dẻo dưỡng nhan đã tất toán thành công
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Mời bạn gửi đánh giá 4 tiêu chí chất lượng cho <strong className="text-on-surface font-semibold">Xưởng Đại Phát</strong> (Vệ sinh ATTP, Đúng hạn cam kết, Đóng gói bao bì, Dịch vụ chăm sóc) để nhận 500 điểm tích lũy thành viên VIP.
                      </p>
                      <div className="flex items-center gap-space-xs mt-1 text-secondary font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[16px]">stars</span>
                        <span>Điểm thưởng có thể đổi chiết khấu vận chuyển đợt tiếp theo</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end gap-space-sm shrink-0 md:min-w-[170px]">
                    <button className="w-full px-space-md py-2.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md font-semibold transition-all shadow-sm flex items-center justify-center gap-1">
                      <span>Đánh giá ngay</span>
                      <span className="material-symbols-outlined text-[16px]">rate_review</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mt-space-sm">
                <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex items-center gap-space-md">
                  <img className="w-16 h-16 rounded-lg object-cover shrink-0 shadow-sm" data-alt="Close up photograph of artisan Vietnamese mooncakes being handcrafted in a certified hygienic workshop with golden crusts and luxury gift box packaging, warm ambient lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEp1Sw5ULHzMOg_iLwL_xQscT41B1NCThoSK7hg9Qm5YLqZctu9vmskruKHhykjmx5BRkhSDErDZCHYopwZ8T5mdz4fmkAfWBmoAXuftd3SS37OJ5_IFad4iz5LdmRA2UgMpTC2E-G2Vc7P-YQiiDZMatUQ0_H0KrWUs-CJ6PCMNVFpOnsmkUDJ0UDtDWYLZpeHQ-RSxWsnp5FDv6Dgmd8Y-hgv50jEkcYqsxAHKKmmmPw6h8BV3Bb" />
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Dịch vụ mẫu thử</span>
                    <h4 className="font-title-md text-title-md text-on-surface truncate">Hộp nếm thử Sample Box</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Nhận trực tiếp 4 vị nhân cao cấp tại văn phòng trong 24h.</p>
                  </div>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex items-center gap-space-md">
                  <img className="w-16 h-16 rounded-lg object-cover shrink-0 shadow-sm" data-alt="High quality corporate luxury gift box for mid-autumn festival embossed with gold foil stamping and silk lining, elegant dark crimson aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIw12MQRdaEYCn6OYwUft9y4pLCcr53HOD-YU0ouV5tgZMHxCRNd9uaS1gGGk4xVWP-XN-AGzVrwwL97ZeMo5KOIZLECmDwTXL6_9Kj4FHwrUFO6jYCU0YH9sIJZ6FPp8MdRGo9YqvV9V6jz5qjHIK5qUMUKFYFlG-mYzsjFRws2b_G8bU2p8TObyROoXFg-e2RAAx52XuIpnmIp8mYIGndJktvOWNRnGwUC8lA8rmeSR--kF_qS68" />
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-label-sm text-label-sm text-tertiary uppercase font-semibold">Bảo chứng Escrow</span>
                    <h4 className="font-title-md text-title-md text-on-surface truncate">Ký quỹ an toàn tuyệt đối</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Ngân hàng phong tỏa tiền cọc và chỉ giải ngân theo từng đợt PoD.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 xl:col-span-4 sticky top-32 flex flex-col gap-space-md">
              <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-md flex flex-col gap-space-md">
                <div className="flex items-start justify-between gap-space-sm">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-primary uppercase font-bold">
                      <span className="material-symbols-outlined text-[18px]">tune</span>
                      <span>Tính năng #26</span>
                    </div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">Cài đặt thông báo Real-time</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Thiết lập nhận thông tin tự động đa kênh dành cho Quản trị viên Mua hàng.
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">settings</span>
                  </div>
                </div>
                <div className="flex flex-col gap-space-xs">
                  <div className="grid grid-cols-12 py-2 px-3 rounded-lg bg-surface-container-high text-body-sm font-label-md text-on-surface-variant">
                    <span className="col-span-6 font-semibold">Loại sự kiện B2B</span>
                    <span className="col-span-2 text-center" title="Web &amp; App push">In-App</span>
                    <span className="col-span-2 text-center" title="Email doanh nghiệp">Email</span>
                    <span className="col-span-2 text-center" title="SMS hoặc tin Zalo ZNS">ZNS</span>
                  </div>
                  <div className="grid grid-cols-12 items-center py-2.5 px-3 rounded-lg bg-surface-container-low">
                    <div className="col-span-6 flex flex-col">
                      <span className="font-title-md text-body-md text-on-surface font-semibold flex items-center gap-1">
                        Ký kết HĐ &amp; Milestone
                        <span className="material-symbols-outlined text-[14px] text-tertiary" title="Bắt buộc pháp lý">lock</span>
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Kích hoạt &amp; giải ngân</span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <span className="material-symbols-outlined text-[20px] text-tertiary">check_box</span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <span className="material-symbols-outlined text-[20px] text-tertiary">check_box</span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <span className="material-symbols-outlined text-[20px] text-tertiary">check_box</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 items-center py-2.5 px-3 rounded-lg hover:bg-surface-container transition-colors">
                    <div className="col-span-6 flex flex-col">
                      <span className="font-title-md text-body-md text-on-surface font-semibold">Báo giá RFQ từ xưởng</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Báo giá cạnh tranh mới</span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input defaultChecked className="sr-only peer" type="checkbox" />
                        <div className="w-8 h-4 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input defaultChecked className="sr-only peer" type="checkbox" />
                        <div className="w-8 h-4 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input className="sr-only peer" type="checkbox" />
                        <div className="w-8 h-4 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 items-center py-2.5 px-3 rounded-lg hover:bg-surface-container transition-colors">
                    <div className="col-span-6 flex flex-col">
                      <span className="font-title-md text-body-md text-on-surface font-semibold">Giao hàng &amp; Ảnh PoD</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Tài xế xác nhận nhận hàng</span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input defaultChecked className="sr-only peer" type="checkbox" />
                        <div className="w-8 h-4 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input defaultChecked className="sr-only peer" type="checkbox" />
                        <div className="w-8 h-4 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input defaultChecked className="sr-only peer" type="checkbox" />
                        <div className="w-8 h-4 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 items-center py-2.5 px-3 rounded-lg bg-surface-container-low">
                    <div className="col-span-6 flex flex-col">
                      <span className="font-title-md text-body-md text-on-surface font-semibold flex items-center gap-1">
                        Hạn cọc Escrow &amp; Tiền
                        <span className="material-symbols-outlined text-[14px] text-tertiary" title="Bảo vệ giao dịch an toàn">lock</span>
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Cảnh báo tránh hủy cọc</span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <span className="material-symbols-outlined text-[20px] text-tertiary">check_box</span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <span className="material-symbols-outlined text-[20px] text-tertiary">check_box</span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <span className="material-symbols-outlined text-[20px] text-tertiary">check_box</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 items-center py-2.5 px-3 rounded-lg hover:bg-surface-container transition-colors">
                    <div className="col-span-6 flex flex-col">
                      <span className="font-title-md text-body-md text-on-surface font-semibold">Ưu đãi &amp; Bảng giá sỉ</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Flash sale bánh nghệ nhân</span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input defaultChecked className="sr-only peer" type="checkbox" />
                        <div className="w-8 h-4 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input className="sr-only peer" type="checkbox" />
                        <div className="w-8 h-4 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input className="sr-only peer" type="checkbox" />
                        <div className="w-8 h-4 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-surface-container flex items-start gap-space-xs text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px] text-secondary shrink-0">info</span>
                  <span>Các kênh có biểu tượng <strong className="text-on-surface">khóa vàng</strong> được mặc định kích hoạt nhằm đảm bảo tuân thủ tính pháp lý của hợp đồng thương mại B2B theo luật TMĐT.</span>
                </div>
                <button className="w-full py-2.5 px-space-md rounded-xl bg-primary text-on-primary font-title-md text-title-md font-semibold hover:bg-primary-container shadow-md transition-all flex items-center justify-center gap-space-xs" >
                  <span className="material-symbols-outlined text-[20px]">save</span>
                  <span>Lưu cấu hình thông báo</span>
                </button>
                <div className="hidden items-center justify-between p-3 rounded-lg bg-tertiary text-on-tertiary text-body-sm font-label-md transition-all" id="save-toast">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    Đã cập nhật tùy chọn thông báo thành công!
                  </span>
                </div>
              </div>
              <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Tích hợp Webhook Doanh Nghiệp</span>
                  <span className="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm">Đang kết nối</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Đồng bộ thông báo đơn hàng và hóa đơn trực tiếp vào kênh Slack / Microsoft Teams của bộ phận Procurement.
                </p>
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container font-data-mono text-body-sm text-on-surface truncate">
                  <span className="truncate">https://hooks.slack.com/services/T012...</span>
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant cursor-pointer hover:text-primary">content_copy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </main><aside className="fixed bottom-6 right-6 z-40"><button className="flex items-center gap-space-sm bg-primary text-on-primary px-space-md py-3 rounded-full shadow-[0_4px_16px_-2px_rgba(120,113,108,0.25),0_2px_6px_-1px_rgba(153,27,27,0.2)] hover:bg-primary-container transition-all group"><span className="material-symbols-outlined text-[20px] text-secondary-fixed group-hover:scale-110 transition-transform">support_agent</span><div className="flex flex-col text-left"><span className="font-label-md text-label-md leading-none text-white">Trợ lý AI Trăng Vàng</span><span className="font-label-sm text-label-sm text-on-primary-container leading-none mt-1">Báo giá tức thì 24/7</span></div><span className="flex h-2 w-2 rounded-full bg-tertiary-fixed ml-1 animate-pulse"></span></button></aside><footer className="w-full bg-surface-container-low mt-space-xl shadow-[0_-1px_8px_rgba(0,0,0,0.03)]"><div className="max-w-7xl mx-auto px-margin pt-space-xl pb-space-lg"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-lg"><div className="lg:col-span-2 flex flex-col gap-space-sm"><div className="flex items-center gap-space-sm"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">bakery_dining</span></div><span className="font-headline-sm text-headline-sm text-primary">MoonMarket B2B</span></div><p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mt-space-xs">Sàn giao dịch thương mại điện tử chuyên biệt kết nối doanh nghiệp mua sỉ bánh trung thu với các xưởng làm bánh nghệ nhân và nhà sản xuất đạt chứng nhận an toàn thực phẩm trên toàn quốc.</p><div className="flex flex-wrap gap-space-xs mt-space-sm"><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm"><span className="material-symbols-outlined text-[14px]">verified</span> HACCP / ISO 22000</span><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm"><span className="material-symbols-outlined text-[14px]">gavel</span> Hợp đồng điện tử FPT.eContract</span><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm"><span className="material-symbols-outlined text-[14px]">account_balance</span> Ký quỹ bảo chứng ngân hàng</span></div></div><div className="flex flex-col gap-space-xs"><span className="font-title-md text-title-md text-on-surface mb-2">Dành cho Doanh Nghiệp</span><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" data-path="san-pham-co-san" href="#">Danh mục quà tặng doanh nghiệp</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" data-path="bao-gia-rfq" href="#">Gửi yêu cầu báo giá (RFQ)</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" data-path="bang-gia-si" href="#">Chính sách chiết khấu theo số lượng</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Đăng ký gửi hộp mẫu thử (Sample Box)</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Gia công in logo &amp; khắc hộp gỗ</a></div><div className="flex flex-col gap-space-xs"><span className="font-title-md text-title-md text-on-surface mb-2">Dành cho Nhà Xưởng</span><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" data-path="tim-xuong-gian-hang" href="#">Mở gian hàng cung ứng</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Quy chuẩn kiểm định chất lượng</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Đấu thầu đơn hàng lớn (Bulk Bidding)</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Quy định giao hàng &amp; Logistics bảo quản</a></div><div className="flex flex-col gap-space-xs"><span className="font-title-md text-title-md text-on-surface mb-2">Hỗ trợ &amp; Pháp lý</span><p className="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-1 py-1"><span className="material-symbols-outlined text-[16px] text-primary shrink-0">headset_mic</span> CSKH B2B: 1800 6886 (8h - 21h)</p><p className="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-1 py-1"><span className="material-symbols-outlined text-[16px] text-primary shrink-0">mail</span> corporate@moonmarket.vn</p><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Chính sách bảo mật &amp; thanh toán ký quỹ</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Điều khoản sử dụng sàn TMĐT B2B</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Quy chuẩn kiểm nghiệm ATVSTP</a></div></div><div className="mt-space-lg pt-space-md flex flex-col md:flex-row items-center justify-between text-body-sm font-body-sm text-on-surface-variant gap-space-sm"><p>© 2024 MoonMarket B2B Vietnam Co., Ltd. Bảo lưu mọi quyền.</p><div className="flex items-center gap-space-md"><span className="flex items-center gap-1 font-label-sm"><span className="material-symbols-outlined text-[15px] text-tertiary">shield_lock</span> Giao dịch an toàn 100% qua Escrow</span><span className="font-label-sm text-on-surface-variant/80">Mã số thuế: 0109886886 cấp bởi Sở Kế Hoạch &amp; Đầu Tư TP. Hà Nội</span></div></div></div></footer>
    </div>
  );
}
