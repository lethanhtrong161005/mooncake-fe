
export default function CustomerProfile({ onNavigate }) {
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50"><div className="bg-primary text-on-primary"><div className="max-w-7xl mx-auto px-margin h-8 flex items-center justify-between text-body-sm"><div className="flex items-center gap-space-lg"><span className="flex items-center gap-space-xs font-data-mono"><span className="material-symbols-outlined text-[15px]">call</span> Hotline Doanh nghiệp: <strong className="font-label-md text-secondary-fixed">1800 6886</strong></span><span className="hidden md:flex items-center gap-space-xs"><span className="material-symbols-outlined text-[15px]">receipt_long</span> Xuất hóa đơn VAT điện tử 100% hợp lệ</span></div><div className="flex items-center gap-space-md"><span className="hidden sm:flex items-center gap-space-xs"><span className="material-symbols-outlined text-[15px]">verified_user</span> Hợp đồng mẫu &amp; Bảo chứng ký quỹ</span><div className="flex items-center gap-space-xs cursor-pointer hover:text-secondary-fixed transition-colors"><span className="material-symbols-outlined text-[16px]">language</span><span>VN / VNĐ</span></div></div></div></div><div className="h-20 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="max-w-7xl mx-auto px-margin h-20 flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-md shrink-0"><img alt="Logo biểu trưng thương hiệu sàn giao dịch B2B Bánh Trung Thu Mooncake Marketplace: biểu tượng vầng trăng rằm thanh lịch kết hợp hoa văn khuôn bánh truyền thống dập nổi vàng kim sang trọng trên nền đỏ trầm nhã nhặn.. Brand logo. - Primary color: #991b1b
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-sm
" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1V_fR3x5E0gRCMt0OUxR4aFiB0BqkMtpf12-bPVc7FYwH3DP8_YhmUjCxjPTQQnbj1Z4NVOCpNnZrhkjl0OGUQrYdjX1vTUbbtAF-kqe-9RQs3z0CnCv8AeixyAEl02PZnMU7HxooAOZlWmwHiC7KXzLjoMIGpZqEK68HzfR4mcHFRhUQcSUEVvDtx_mnsJOmEDznf-L4TAfQBAdrBRVBKZv21qBUjWxWgxHWS-tPaEhbO3nfA2EWiWqAU" /><div className="flex flex-col"><span className="font-headline-sm text-headline-sm text-primary leading-none">MoonMarket</span><span className="font-label-sm text-label-sm text-secondary tracking-wider uppercase leading-none mt-1">B2B Enterprise Portal</span></div></div><div className="relative flex-1 max-w-md hidden lg:block"><div className="relative flex items-center"><input className="w-full bg-surface-container-low pl-10 pr-4 py-2 rounded-xl text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-inner" placeholder="Tìm kiếm nhân bánh, xưởng sản xuất, hộp quà tặng VIP..." type="text" /><span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">search</span></div></div><nav className="hidden xl:flex items-center gap-space-xs" data-active-classes="bg-primary-container text-on-primary font-title-md rounded-lg"><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="trang-chu" href="#">Trang chủ</a><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="san-pham-co-san" href="#">Sản phẩm có sẵn</a><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="tim-xuong-gian-hang" href="#">Tìm xưởng &amp; Gian hàng</a><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="bao-gia-rfq" href="#">Báo giá &amp; RFQ</a><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="bang-gia-si" href="#">Bảng giá sỉ</a></nav><div className="flex items-center gap-space-md shrink-0"><button aria-label="Thông báo đơn hàng" className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary font-label-sm text-label-sm text-on-primary leading-none">3</span></button><div className="flex items-center gap-space-sm pl-space-sm cursor-pointer group"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div className="hidden md:flex flex-col text-left"><span className="font-label-md text-label-md text-on-surface leading-tight">Nguyễn Văn An</span><span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">An Phát Corp (Buyer)</span></div><span className="material-symbols-outlined text-on-surface-variant text-[18px] group-hover:text-on-surface transition-colors hidden md:inline">expand_more</span></div></div></div></div></header><main className="w-full pt-28 bg-surface"><div className="flex flex-col w-full">
        <div className="max-w-7xl mx-auto w-full px-margin py-space-md">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-data-mono text-body-sm">
              <span>B2B Portal</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span>Hồ sơ Doanh nghiệp</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary font-label-md">Định danh Pháp lý &amp; Chi nhánh</span>
            </div>
            <div className="inline-flex items-center gap-space-xs bg-tertiary-container/15 text-tertiary px-3 py-1.5 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-tertiary animate-pulse" style={{ "fontVariationSettings": "'FILL' 1" }}>verified</span>
              <span className="font-label-sm uppercase tracking-wider">Hồ sơ đã kiểm duyệt bởi FPT.eContract &amp; Ban Pháp Lý MoonMarket</span>
            </div>
          </div>

          <div className="relative bg-surface-container-lowest rounded-xl shadow-md p-space-lg mb-space-lg overflow-hidden">

            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none"></div>
            <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-primary/5 blur-2xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">

              <div className="flex items-start sm:items-center gap-space-md">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-surface-container-high flex items-center justify-center p-2 shadow-sm overflow-hidden">
                    <img className="w-full h-full object-contain" data-alt="Official corporate logo emblem of An Phat Corporation rendered in luxury gold foil and deep burgundy emblem style on ivory paper background, clean sharp vector lines, B2B enterprise branding badge." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9e9oMs2nH0Sp-voRsV-8_Fc2VvU9Tgvhz74ux2KlkfkBsN9-xilQfyWaRH4ldqOFSriIz8HAavSgkiO4-YKmULNNCjbYkjmAHeQpmnvL2E2YUM7hgdXrQyvlGM013C3cd49yCkEntwo3yySlDRXcnRxtAPqmmdBB104QYwoMmAv4A5pC6DQkdCKB4gSXZKo3vfEqWag7gMAIWoViImKEdDiLJa5p5kcZ5LAHhA897Zr92Ip2oKAef" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-tertiary text-on-tertiary rounded-full p-1 shadow-sm" title="Hồ sơ đã xác minh">
                    <span className="material-symbols-outlined text-[16px] block">verified</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <h2 className="font-headline-md text-headline-md text-on-surface">An Phát Corp</h2>
                    <span className="inline-flex items-center gap-1 bg-tertiary-container/20 text-tertiary px-2.5 py-0.5 rounded text-label-sm font-label-sm">
                      <span className="material-symbols-outlined text-[14px]">gavel</span> Đã xác minh VAT 100%
                    </span>
                    <span className="inline-flex items-center gap-1 bg-secondary-fixed text-on-secondary-fixed px-2.5 py-0.5 rounded text-label-sm font-label-sm">
                      <span className="material-symbols-outlined text-[14px]" style={{ "fontVariationSettings": "'FILL' 1" }}>diamond</span> Hạng Kim Cương
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 sm:gap-x-space-md mt-1.5 text-on-surface-variant font-body-md text-body-md">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px] text-primary">account_circle</span>
                      <strong className="text-on-surface font-title-md">Nguyễn Văn An</strong>
                      <span className="text-body-sm font-body-sm">(Trưởng phòng Mua hàng &amp; Hành chính)</span>
                    </span>
                    <span className="hidden sm:inline text-outline-variant">•</span>
                    <span className="flex items-center gap-1 font-data-mono text-body-sm">
                      <span className="material-symbols-outlined text-[16px]">domain</span> MST: 0109887766
                    </span>
                  </div>
                  <div className="flex items-center gap-space-md mt-2 text-body-sm text-on-surface-variant font-body-sm">
                    <span className="flex items-center gap-1 text-tertiary font-label-sm">
                      <span className="material-symbols-outlined text-[15px]">lock</span> Escrow Ký quỹ tín nhiệm sẵn sàng
                    </span>
                    <span>Hạn mức thanh toán sau 30 ngày: <strong className="text-secondary font-label-md">1.000.000.000đ</strong></span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-space-xs sm:gap-space-sm bg-surface-container-low p-space-sm rounded-xl">
                <div className="flex flex-col p-space-sm rounded-lg bg-surface-container-lowest shadow-sm">
                  <span className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-primary">payments</span> Tổng chi tiêu
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary mt-1">320.000.000đ</span>
                  <span className="text-body-sm font-body-sm text-tertiary flex items-center gap-0.5 mt-0.5">
                    <span className="material-symbols-outlined text-[13px]">trending_up</span> Mùa trăng 2024
                  </span>
                </div>
                <div className="flex flex-col p-space-sm rounded-lg bg-surface-container-lowest shadow-sm">
                  <span className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-secondary">contract</span> Hợp đồng sỉ
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface mt-1">5 <span className="font-body-md text-body-md text-on-surface-variant">hợp đồng</span></span>
                  <span className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">100% bàn giao đúng hạn</span>
                </div>
                <div className="flex flex-col p-space-sm rounded-lg bg-surface-container-lowest shadow-sm">
                  <span className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-tertiary">workspace_premium</span> Điểm tín nhiệm
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-headline-sm text-headline-sm text-tertiary">98</span>
                    <span className="text-body-sm text-on-surface-variant font-body-sm">/100</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div className="bg-tertiary h-full rounded-full" style={{ "width": "98%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-surface-container-low rounded-xl p-1.5 mb-space-lg flex items-center gap-1 overflow-x-auto shadow-sm" id="corporate-tabs">
            <button className="px-space-md py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md flex items-center gap-space-xs shrink-0 shadow-sm transition-all tab-btn" data-target="tab-legal">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              1. Thông tin Doanh nghiệp &amp; Pháp lý VAT
            </button>
            <button className="px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container font-label-md text-label-md flex items-center gap-space-xs shrink-0 transition-all tab-btn" data-target="tab-addresses">
              <span className="material-symbols-outlined text-[18px]">warehouse</span>
              2. Sổ địa chỉ &amp; Điểm giao hàng đa điểm (63 tỉnh thành)
              <span className="bg-secondary-fixed text-on-secondary-fixed px-1.5 py-0.5 rounded-full font-label-sm text-label-sm ml-1">3 trạm</span>
            </button>
            <button className="px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container font-label-md text-label-md flex items-center gap-space-xs shrink-0 transition-all tab-btn" data-target="tab-staff">
              <span className="material-symbols-outlined text-[18px]">badge</span>
              3. Nhân sự được ủy quyền duyệt đơn
              <span className="bg-surface-container-high text-on-surface px-1.5 py-0.5 rounded-full font-label-sm text-label-sm ml-1">4 người</span>
            </button>
            <button className="px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container font-label-md text-label-md flex items-center gap-space-xs shrink-0 transition-all tab-btn" data-target="tab-security">
              <span className="material-symbols-outlined text-[18px]">security</span>
              4. Bảo mật tài khoản &amp; Đăng nhập OTP
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">

            <div className="lg:col-span-7 flex flex-col gap-space-lg">

              <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg">
                <div className="flex items-center justify-between pb-space-sm mb-space-md bg-surface-container-low/60 -mx-space-lg -mt-space-lg p-space-md rounded-t-xl">
                  <div className="flex items-center gap-space-sm">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">account_balance</span>
                    </span>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface">Thông tin Pháp nhân Doanh nghiệp</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Căn cứ trích xuất hợp đồng mua bán bánh trung thu &amp; lập hóa đơn GTGT điện tử</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary bg-tertiary-container/15 px-2.5 py-1 rounded">
                    <span className="material-symbols-outlined text-[14px]">lock</span> Đã khóa đối soát
                  </span>
                </div>
                <form className="space-y-space-md" >
                  <div className="space-y-1">
                    <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                      <span>Tên Doanh nghiệp đầy đủ (Theo Giấy phép ĐKKD) <span className="text-error">*</span></span>
                      <span className="text-body-sm text-on-surface-variant font-data-mono">Đối chiếu Cổng Dịch vụ công Quốc gia</span>
                    </label>
                    <input className="w-full bg-surface-container-low px-space-sm py-2.5 rounded-lg text-body-md font-body-md text-on-surface shadow-inner focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all font-semibold" type="text" value="Công ty Cổ phần Đầu tư &amp; Phát triển An Phát" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div className="space-y-1">
                      <label className="font-label-md text-label-md text-on-surface">
                        Mã số thuế Doanh nghiệp (MST) <span className="text-error">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <input className="w-full bg-surface-container-low pl-10 pr-space-sm py-2.5 rounded-lg text-body-md font-data-mono text-on-surface shadow-inner focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all font-semibold tracking-wider" type="text" value="0109887766" />
                        <span className="material-symbols-outlined absolute left-3 text-tertiary text-[18px]">verified</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="font-label-md text-label-md text-on-surface">
                        Người đại diện pháp luật
                      </label>
                      <input className="w-full bg-surface-container-low px-space-sm py-2.5 rounded-lg text-body-md font-body-md text-on-surface shadow-inner focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all" type="text" value="Trần Đình Nam - Tổng Giám Đốc" />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-space-xs">
                    <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                      <span>Giấy phép ĐKKD &amp; Chứng nhận mẫu dấu</span>
                      <span className="text-tertiary font-label-sm text-label-sm">Đã thẩm định ngày 12/06/2024</span>
                    </label>
                    <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between gap-space-md">
                      <div className="flex items-center gap-space-sm min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-title-md text-body-md text-on-surface truncate">GPKD_AnPhatCorp_BanCongChung_2024.pdf</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-space-xs">
                            <span>3.4 MB</span>
                            <span>•</span>
                            <span className="text-tertiary flex items-center gap-0.5"><span className="material-symbols-outlined text-[13px]">check_circle</span> Tính pháp lý hợp lệ</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-xs shrink-0">
                        <button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors" title="Xem trước tài liệu" type="button">
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
                        <button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors" title="Tải xuống tệp" type="button">
                          <span className="material-symbols-outlined text-[20px]">download</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-space-sm pt-space-sm">
                    <div className="space-y-1">
                      <label className="font-label-md text-label-md text-on-surface">
                        Địa chỉ trụ sở xuất hóa đơn GTGT điện tử (VAT) <span className="text-error">*</span>
                      </label>
                      <div className="relative">
                        <input className="w-full bg-surface-container-low px-space-sm py-2.5 rounded-lg text-body-md font-body-md text-on-surface shadow-inner focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all" type="text" value="Tầng 18, Tòa nhà Keangnam Landmark 72, Khu E6, Khu đô thị Cầu Giấy, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                      <div className="space-y-1">
                        <label className="font-label-md text-label-md text-on-surface">
                          Email nhận hóa đơn GTGT điện tử (XML / PDF) <span className="text-error">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <input className="w-full bg-surface-container-low pl-10 pr-space-sm py-2.5 rounded-lg text-body-md font-data-mono text-on-surface shadow-inner focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all font-medium" type="email" value="ke-toan@anphatcorp.vn" />
                          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">mail</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="font-label-md text-label-md text-on-surface">
                          SĐT Bộ phận Kế toán / Mua hàng <span className="text-error">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <input className="w-full bg-surface-container-low pl-10 pr-space-sm py-2.5 rounded-lg text-body-md font-data-mono text-on-surface shadow-inner focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all" type="tel" value="024.3988.7766 (Ext 104)" />
                          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">call</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-space-lg pt-space-md bg-surface-container-low/40 p-space-md rounded-xl">
                    <div className="flex items-center gap-space-sm mb-space-sm">
                      <span className="w-7 h-7 rounded-lg bg-tertiary-container/30 text-tertiary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">shield</span>
                      </span>
                      <div>
                        <h4 className="font-title-md text-title-md text-on-surface">Tài khoản Ngân hàng liên kết Ký quỹ Escrow</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Sử dụng thanh toán tiền cọc đơn hàng sỉ trung thu &amp; nhận giải ngân hoàn quỹ khi kết thúc hợp đồng</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
                      <div className="sm:col-span-1 space-y-1">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Ngân hàng thụ hưởng</span>
                        <div className="bg-surface-container-lowest p-2.5 rounded-lg flex items-center gap-2 shadow-sm">
                          <span className="material-symbols-outlined text-primary text-[20px]">account_balance</span>
                          <span className="font-title-md text-body-md text-on-surface truncate">Vietcombank - CN Sở Giao Dịch</span>
                        </div>
                      </div>
                      <div className="sm:col-span-1 space-y-1">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Số tài khoản thanh toán VND</span>
                        <div className="bg-surface-container-lowest p-2.5 rounded-lg font-data-mono text-body-md font-bold text-on-surface shadow-sm flex items-center justify-between">
                          <span>0011 0045 88998</span>
                          <span className="material-symbols-outlined text-tertiary text-[16px]">check_circle</span>
                        </div>
                      </div>
                      <div className="sm:col-span-1 space-y-1">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Tên chủ tài khoản</span>
                        <div className="bg-surface-container-lowest p-2.5 rounded-lg font-label-md text-body-md text-on-surface truncate shadow-sm">
                          CT CP DAUTU &amp; PT AN PHAT
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-md">
                    <span className="text-body-sm font-body-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-tertiary">history</span> Lần sửa đổi gần nhất: 14:32, 28/08/2024 bởi Nguyễn Văn An
                    </span>
                    <div className="flex items-center gap-space-sm w-full sm:w-auto">
                      <button className="flex-1 sm:flex-initial px-space-md py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" type="button">
                        Hủy thay đổi
                      </button>
                      <button className="flex-1 sm:flex-initial px-space-lg py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-space-xs" type="submit">
                        <span className="material-symbols-outlined text-[18px]">save</span>
                        Cập nhật thông tin pháp lý
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg">
                <div className="flex items-center justify-between mb-space-md">
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface">Nhân sự được Ủy quyền Ký Hợp đồng &amp; Nghiệm thu Bánh</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Có thẩm quyền duyệt mẫu thử (Sample Box), ký eContract và xác nhận số lượng bàn giao</p>
                  </div>
                  <button className="px-space-sm py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">person_add</span> Thêm người duyệt
                  </button>
                </div>
                <div className="space-y-space-xs">
                  <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-label-md">
                        AN
                      </div>
                      <div>
                        <div className="flex items-center gap-space-xs">
                          <span className="font-title-md text-on-surface text-body-md">Nguyễn Văn An</span>
                          <span className="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.2 rounded font-label-sm text-label-sm">Chính (Admin)</span>
                        </div>
                        <p className="text-body-sm text-on-surface-variant">Trưởng phòng Mua hàng • an.nguyen@anphatcorp.vn • 0988.112.233</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-tertiary font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[14px]">done_all</span> Toàn quyền ký &amp; thanh toán
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-label-md">
                        LN
                      </div>
                      <div>
                        <div className="flex items-center gap-space-xs">
                          <span className="font-title-md text-on-surface text-body-md">Trần Mai Linh</span>
                          <span className="bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-0.2 rounded font-label-sm text-label-sm">Quản lý Kho HN</span>
                        </div>
                        <p className="text-body-sm text-on-surface-variant">Phó phòng Hành chính • linh.tran@anphatcorp.vn • 0977.223.344</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[14px]">local_shipping</span> Quyền nhận hàng &amp; Kiểm đếm
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-space-lg">

              <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg relative overflow-hidden">
                <div className="flex items-start justify-between mb-space-md">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-secondary-container/20 text-secondary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                      </span>
                      <h3 className="font-title-md text-title-md text-on-surface">Điểm Giao Nhận Hàng Đa Chi Nhánh</h3>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Phục vụ chia hộp quà tặng trực tiếp đến từng kho văn phòng vùng miền</p>
                  </div>
                </div>

                <div className="space-y-space-sm">

                  <div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm">
                    <div className="flex items-start justify-between gap-space-xs mb-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm uppercase">Trụ sở chính</span>
                        <span className="font-title-md text-body-md text-on-surface">Kho Văn phòng Hà Nội (Miền Bắc)</span>
                      </div>
                      <button className="text-on-surface-variant hover:text-primary transition-colors p-1" title="Chỉnh sửa điểm này">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface flex items-start gap-1.5 mt-1.5">
                      <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">location_on</span>
                      <span>Tầng 18, Toà nhà Landmark 72, Khu đô thị Cầu Giấy, Nam Từ Liêm, Hà Nội</span>
                    </p>
                    <div className="mt-2.5 pt-2 bg-surface-container-lowest/80 p-2 rounded-lg flex items-center justify-between text-body-sm font-data-mono">
                      <span className="flex items-center gap-1 text-on-surface">
                        <span className="material-symbols-outlined text-[15px] text-tertiary">person</span>
                        Người nhận: <strong>Ms. Linh</strong>
                      </span>
                      <span className="text-primary font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">call</span> 0988.112.233
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
                      <span className="inline-flex items-center gap-1 text-tertiary">
                        <span className="material-symbols-outlined text-[14px]">ac_unit</span> Xe lạnh bảo quản tiếp cận tận cửa hầm
                      </span>
                      <span>Chỉ định: <strong>650 hộp</strong></span>
                    </div>
                  </div>

                  <div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm">
                    <div className="flex items-start justify-between gap-space-xs mb-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase">Chi nhánh Miền Nam</span>
                        <span className="font-title-md text-body-md text-on-surface">Văn phòng Đại diện TP. HCM</span>
                      </div>
                      <button className="text-on-surface-variant hover:text-primary transition-colors p-1" title="Chỉnh sửa điểm này">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface flex items-start gap-1.5 mt-1.5">
                      <span className="material-symbols-outlined text-[16px] text-secondary shrink-0 mt-0.5">location_on</span>
                      <span>Số 120 Đường Pasteur, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</span>
                    </p>
                    <div className="mt-2.5 pt-2 bg-surface-container-lowest/80 p-2 rounded-lg flex items-center justify-between text-body-sm font-data-mono">
                      <span className="flex items-center gap-1 text-on-surface">
                        <span className="material-symbols-outlined text-[15px] text-tertiary">person</span>
                        Người nhận: <strong>Mr. Tuấn</strong>
                      </span>
                      <span className="text-primary font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">call</span> 0912.445.566
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
                      <span className="inline-flex items-center gap-1 text-tertiary">
                        <span className="material-symbols-outlined text-[14px]">schedule</span> Giờ nhận: 8h00 - 17h30 T2-T6
                      </span>
                      <span>Chỉ định: <strong>350 hộp</strong></span>
                    </div>
                  </div>

                  <div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm">
                    <div className="flex items-start justify-between gap-space-xs mb-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm uppercase">Chi nhánh Miền Trung</span>
                        <span className="font-title-md text-body-md text-on-surface">Trung tâm Dịch vụ Khách hàng Đà Nẵng</span>
                      </div>
                      <button className="text-on-surface-variant hover:text-primary transition-colors p-1" title="Chỉnh sửa điểm này">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface flex items-start gap-1.5 mt-1.5">
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant shrink-0 mt-0.5">location_on</span>
                      <span>Số 45 Đường Nguyễn Văn Linh, Phường Nam Dương, Quận Hải Châu, TP. Đà Nẵng</span>
                    </p>
                    <div className="mt-2.5 pt-2 bg-surface-container-lowest/80 p-2 rounded-lg flex items-center justify-between text-body-sm font-data-mono">
                      <span className="flex items-center gap-1 text-on-surface">
                        <span className="material-symbols-outlined text-[15px] text-tertiary">person</span>
                        Người nhận: <strong>Ms. Hoàng Oanh</strong>
                      </span>
                      <span className="text-primary font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">call</span> 0905.789.012
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
                      <span className="inline-flex items-center gap-1 text-tertiary">
                        <span className="material-symbols-outlined text-[14px]">check</span> Giao hàng bằng pallet có bọc màng co
                      </span>
                      <span>Chỉ định: <strong>120 hộp</strong></span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs mt-space-md pt-space-xs">
                  <button className="w-full py-2.5 px-space-sm rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors">
                    <span className="material-symbols-outlined text-[18px] text-primary">add_location_alt</span>
                    + Thêm chi nhánh mới
                  </button>
                  <button className="w-full py-2.5 px-space-sm rounded-lg bg-secondary-fixed hover:bg-secondary-fixed-dim text-on-secondary-fixed font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-sm transition-colors">
                    <span className="material-symbols-outlined text-[18px]">upload_file</span>
                    Tải Excel giao hàng loạt
                  </button>
                </div>
                <div className="mt-space-sm p-space-xs bg-surface-container-low rounded-lg flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-secondary">info</span>
                    Hỗ trợ chia đơn giao theo danh sách VIP cá nhân
                  </span>
                  <a className="text-primary font-label-sm text-label-sm hover:underline" href="#">Tải file mẫu .xlsx</a>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg">
                <div className="flex items-center gap-space-sm mb-space-md">
                  <span className="w-8 h-8 rounded-lg bg-error-container/30 text-error flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">enhanced_encryption</span>
                  </span>
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface">Bảo mật Tài khoản &amp; Ký Hợp đồng B2B</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Xác thực nâng cao nhằm phòng chống giả mạo đặt hàng số lượng lớn</p>
                  </div>
                </div>
                <div className="space-y-space-md">

                  <div className="flex items-start justify-between gap-space-md p-space-sm rounded-lg bg-surface-container-low">
                    <div className="flex items-start gap-space-sm">
                      <span className="material-symbols-outlined text-tertiary text-[22px] mt-0.5">sms</span>
                      <div>
                        <h4 className="font-title-md text-body-md text-on-surface">Xác thực OTP khi ký hợp đồng trên 50.000.000đ</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Gửi mã OTP 6 số bảo mật về số điện thoại cá nhân Trưởng phòng Mua hàng (0988.112.***) và Email công ty.</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-start justify-between gap-space-md p-space-sm rounded-lg bg-surface-container-low">
                    <div className="flex items-start gap-space-sm">
                      <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">devices</span>
                      <div>
                        <h4 className="font-title-md text-body-md text-on-surface">Cảnh báo phiên đăng nhập &amp; Thiết bị lạ</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Tự động khóa yêu cầu báo giá (RFQ) nếu phát hiện IP truy cập ngoài lãnh thổ Việt Nam.</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="pt-space-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-2">Các phiên đăng nhập đang hoạt động</span>
                    <div className="space-y-space-xs text-body-sm font-data-mono">
                      <div className="flex items-center justify-between p-2 rounded bg-surface-container-lowest shadow-sm">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-tertiary">laptop_mac</span>
                          <span className="text-on-surface font-medium">MacBook Pro (Chrome 128 - Hà Nội, VN)</span>
                        </div>
                        <span className="text-tertiary font-label-sm text-label-sm flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Phiên này
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-surface-container-lowest shadow-sm">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">phone_iphone</span>
                          <span className="text-on-surface-variant">iPhone 15 Pro (MoonMarket App - Hà Nội)</span>
                        </div>
                        <button className="text-error font-label-sm text-label-sm hover:underline">Đăng xuất</button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-space-xs flex items-center justify-between">
                    <button className="text-primary font-label-md text-label-md hover:underline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">key</span> Đổi mật khẩu tài khoản doanh nghiệp
                    </button>
                    <span className="text-body-sm text-on-surface-variant">Cập nhật 45 ngày trước</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-space-lg p-space-md rounded-xl bg-tertiary/5 flex flex-col md:flex-row items-center justify-between gap-space-md shadow-sm">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[28px]">verified</span>
              </div>
              <div>
                <h4 className="font-title-md text-title-md text-tertiary">Bảo chứng Hợp đồng B2B &amp; Ký quỹ Escrow An Toàn</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Mọi giao dịch bánh trung thu của An Phát Corp đều được ngân hàng liên kết giữ cọc trong tài khoản ký quỹ trung gian, chỉ quyết toán cho xưởng sau khi biên bản bàn giao kiểm nghiệm đạt chuẩn.</p>
              </div>
            </div>
            <div className="flex items-center gap-space-sm shrink-0">
              <button className="px-space-md py-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container shadow-sm transition-colors">
                Xem quy chế bảo chứng
              </button>
              <button className="px-space-md py-2 rounded-lg bg-tertiary text-on-tertiary font-label-md text-label-md hover:bg-tertiary-container shadow-sm transition-colors">
                Liên hệ Chuyên viên Quản lý Tài khoản (KAM)
              </button>
            </div>
          </div>
        </div>
      </div>
      </main><aside className="fixed bottom-6 right-6 z-40"><button className="flex items-center gap-space-sm bg-primary text-on-primary px-space-md py-3 rounded-full shadow-[0_4px_16px_-2px_rgba(120,113,108,0.25),0_2px_6px_-1px_rgba(153,27,27,0.2)] hover:bg-primary-container transition-all group"><span className="material-symbols-outlined text-[20px] text-secondary-fixed group-hover:scale-110 transition-transform">support_agent</span><div className="flex flex-col text-left"><span className="font-label-md text-label-md leading-none text-white">Trợ lý AI Trăng Vàng</span><span className="font-label-sm text-label-sm text-on-primary-container leading-none mt-1">Báo giá tức thì 24/7</span></div><span className="flex h-2 w-2 rounded-full bg-tertiary-fixed ml-1 animate-pulse"></span></button></aside><footer className="w-full bg-surface-container-low mt-space-xl shadow-[0_-1px_8px_rgba(0,0,0,0.03)]"><div className="max-w-7xl mx-auto px-margin pt-space-xl pb-space-lg"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-lg"><div className="lg:col-span-2 flex flex-col gap-space-sm"><div className="flex items-center gap-space-sm"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">bakery_dining</span></div><span className="font-headline-sm text-headline-sm text-primary">MoonMarket B2B</span></div><p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mt-space-xs">Sàn giao dịch thương mại điện tử chuyên biệt kết nối doanh nghiệp mua sỉ bánh trung thu với các xưởng làm bánh nghệ nhân và nhà sản xuất đạt chứng nhận an toàn thực phẩm trên toàn quốc.</p><div className="flex flex-wrap gap-space-xs mt-space-sm"><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm"><span className="material-symbols-outlined text-[14px]">verified</span> HACCP / ISO 22000</span><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm"><span className="material-symbols-outlined text-[14px]">gavel</span> Hợp đồng điện tử FPT.eContract</span><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm"><span className="material-symbols-outlined text-[14px]">account_balance</span> Ký quỹ bảo chứng ngân hàng</span></div></div><div className="flex flex-col gap-space-xs"><span className="font-title-md text-title-md text-on-surface mb-2">Dành cho Doanh Nghiệp</span><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" data-path="san-pham-co-san" href="#">Danh mục quà tặng doanh nghiệp</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" data-path="bao-gia-rfq" href="#">Gửi yêu cầu báo giá (RFQ)</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" data-path="bang-gia-si" href="#">Chính sách chiết khấu theo số lượng</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Đăng ký gửi hộp mẫu thử (Sample Box)</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Gia công in logo &amp; khắc hộp gỗ</a></div><div className="flex flex-col gap-space-xs"><span className="font-title-md text-title-md text-on-surface mb-2">Dành cho Nhà Xưởng</span><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" data-path="tim-xuong-gian-hang" href="#">Mở gian hàng cung ứng</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Quy chuẩn kiểm định chất lượng</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Đấu thầu đơn hàng lớn (Bulk Bidding)</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Quy định giao hàng &amp; Logistics bảo quản</a></div><div className="flex flex-col gap-space-xs"><span className="font-title-md text-title-md text-on-surface mb-2">Hỗ trợ &amp; Pháp lý</span><p className="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-1 py-1"><span className="material-symbols-outlined text-[16px] text-primary shrink-0">headset_mic</span> CSKH B2B: 1800 6886 (8h - 21h)</p><p className="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-1 py-1"><span className="material-symbols-outlined text-[16px] text-primary shrink-0">mail</span> corporate@moonmarket.vn</p><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Chính sách bảo mật &amp; thanh toán ký quỹ</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Điều khoản sử dụng sàn TMĐT B2B</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Quy chuẩn kiểm nghiệm ATVSTP</a></div></div><div className="mt-space-lg pt-space-md flex flex-col md:flex-row items-center justify-between text-body-sm font-body-sm text-on-surface-variant gap-space-sm"><p>© 2024 MoonMarket B2B Vietnam Co., Ltd. Bảo lưu mọi quyền.</p><div className="flex items-center gap-space-md"><span className="flex items-center gap-1 font-label-sm"><span className="material-symbols-outlined text-[15px] text-tertiary">shield_lock</span> Giao dịch an toàn 100% qua Escrow</span><span className="font-label-sm text-on-surface-variant/80">Mã số thuế: 0109886886 cấp bởi Sở Kế Hoạch &amp; Đầu Tư TP. Hà Nội</span></div></div></div></footer>
    </div>
  );
}
