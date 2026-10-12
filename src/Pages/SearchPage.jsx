import React from 'react';

export default function SearchPage({ onNavigate }) {
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50"><div className="bg-primary text-on-primary"><div className="max-w-7xl mx-auto px-margin h-8 flex items-center justify-between text-body-sm"><div className="flex items-center gap-space-lg"><span className="flex items-center gap-space-xs font-data-mono"><span className="material-symbols-outlined text-[15px]">call</span> Hotline Doanh nghiệp: <strong className="font-label-md text-secondary-fixed">1800 6886</strong></span><span className="hidden md:flex items-center gap-space-xs"><span className="material-symbols-outlined text-[15px]">receipt_long</span> Xuất hóa đơn VAT điện tử 100% hợp lệ</span></div><div className="flex items-center gap-space-md"><span className="hidden sm:flex items-center gap-space-xs"><span className="material-symbols-outlined text-[15px]">verified_user</span> Hợp đồng mẫu &amp; Bảo chứng ký quỹ</span><div className="flex items-center gap-space-xs cursor-pointer hover:text-secondary-fixed transition-colors"><span className="material-symbols-outlined text-[16px]">language</span><span>VN / VNĐ</span></div></div></div></div><div className="h-20 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="max-w-7xl mx-auto px-margin h-20 flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-md shrink-0"><img alt="Logo biểu trưng thương hiệu sàn giao dịch B2B Bánh Trung Thu Mooncake Marketplace: biểu tượng vầng trăng rằm thanh lịch kết hợp hoa văn khuôn bánh truyền thống dập nổi vàng kim sang trọng trên nền đỏ trầm nhã nhặn.. Brand logo. - Primary color: #991b1b
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-sm
" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1V_fR3x5E0gRCMt0OUxR4aFiB0BqkMtpf12-bPVc7FYwH3DP8_YhmUjCxjPTQQnbj1Z4NVOCpNnZrhkjl0OGUQrYdjX1vTUbbtAF-kqe-9RQs3z0CnCv8AeixyAEl02PZnMU7HxooAOZlWmwHiC7KXzLjoMIGpZqEK68HzfR4mcHFRhUQcSUEVvDtx_mnsJOmEDznf-L4TAfQBAdrBRVBKZv21qBUjWxWgxHWS-tPaEhbO3nfA2EWiWqAU" /><div className="flex flex-col"><span className="font-headline-sm text-headline-sm text-primary leading-none">MoonMarket</span><span className="font-label-sm text-label-sm text-secondary tracking-wider uppercase leading-none mt-1">B2B Enterprise Portal</span></div></div><div className="relative flex-1 max-w-md hidden lg:block"><div className="relative flex items-center"><input className="w-full bg-surface-container-low pl-10 pr-4 py-2 rounded-xl text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-inner" placeholder="Tìm kiếm nhân bánh, xưởng sản xuất, hộp quà tặng VIP..." type="text" /><span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">search</span></div></div><nav className="hidden xl:flex items-center gap-space-xs" data-active-classes="bg-primary-container text-on-primary font-title-md rounded-lg"><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="trang-chu" href="#">Trang chủ</a><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="san-pham-co-san" href="#">Sản phẩm có sẵn</a><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="tim-xuong-gian-hang" href="#">Tìm xưởng &amp; Gian hàng</a><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="bao-gia-rfq" href="#">Báo giá &amp; RFQ</a><a className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors font-label-md text-label-md" data-path="bang-gia-si" href="#">Bảng giá sỉ</a></nav><div className="flex items-center gap-space-md shrink-0"><button aria-label="Thông báo đơn hàng" className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary font-label-sm text-label-sm text-on-primary leading-none">3</span></button><div className="flex items-center gap-space-sm pl-space-sm cursor-pointer group"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div className="hidden md:flex flex-col text-left"><span className="font-label-md text-label-md text-on-surface leading-tight">Nguyễn Văn An</span><span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">An Phát Corp (Buyer)</span></div><span className="material-symbols-outlined text-on-surface-variant text-[18px] group-hover:text-on-surface transition-colors hidden md:inline">expand_more</span></div></div></div></div></header><main className="w-full pt-28 bg-surface"><div className="flex flex-col w-full">
        <div className="max-w-7xl mx-auto w-full px-margin py-space-md flex flex-col gap-space-lg">

          <section className="flex flex-col gap-space-md">

            <div className="relative w-full">
              <div className="bg-surface-container-lowest p-space-xs rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-space-sm">
                <div className="relative flex-1 w-full flex items-center">
                  <span className="material-symbols-outlined text-primary text-[24px] ml-3 mr-2">search</span>
                  <input className="w-full bg-transparent py-3 pr-4 font-body-lg text-body-lg text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none" id="enterprise-search-input" placeholder="Nhập tên bánh, vị nhân cao cấp, loại hộp gỗ hoặc tên xưởng sản xuất..." type="text" value="Hộp bánh Trung Thu Doanh nghiệp VIP" />
                  <button className="p-1 mr-2 text-on-surface-variant/60 hover:text-on-surface rounded-full" id="clear-search">
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
                <div className="flex items-center gap-space-xs w-full md:w-auto shrink-0 justify-end px-2 pb-2 md:pb-0">
                  <div className="hidden sm:flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-lg text-on-surface-variant font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">inventory_2</span>
                    <span>128 SKUs có sẵn</span>
                  </div>
                  <button className="w-full md:w-auto bg-primary text-on-primary hover:bg-primary-container px-space-lg py-2.5 rounded-lg font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">tune</span>
                    <span>Tìm kiếm B2B</span>
                  </button>
                </div>
              </div>

              <div className="absolute left-0 right-0 top-full mt-1.5 z-30 bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden hidden group-focus-within:block" id="search-autocomplete-dropdown">
                <div className="grid grid-cols-1 md:grid-cols-2 p-space-sm gap-space-sm bg-surface-container-lowest">

                  <div className="flex flex-col gap-1 p-2 bg-surface-container-low/60 rounded-lg">
                    <div className="flex items-center justify-between pb-1 px-2">
                      <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">inventory</span> Sản phẩm gợi ý (4)
                      </span>
                      <span className="font-data-mono text-body-sm text-on-surface-variant/70">Khấu trừ VAT</span>
                    </div>
                    <a className="flex items-center justify-between p-2 rounded-md hover:bg-surface-container transition-colors" href="#">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[18px]">card_giftcard</span>
                        <span className="font-body-md text-body-md text-on-surface">Hộp Gỗ VIP <strong>Hoàng Kim Liên Hoa</strong> (4 bánh 200g)</span>
                      </div>
                      <span className="font-data-mono text-body-sm text-primary font-semibold">Từ 490k</span>
                    </a>
                    <a className="flex items-center justify-between p-2 rounded-md hover:bg-surface-container transition-colors" href="#">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[18px]">card_giftcard</span>
                        <span className="font-body-md text-body-md text-on-surface">Set Bánh Yến Sào Vi Cá <strong>Nguyệt Dạ Thượng Uyển</strong></span>
                      </div>
                      <span className="font-data-mono text-body-sm text-primary font-semibold">Từ 850k</span>
                    </a>
                    <a className="flex items-center justify-between p-2 rounded-md hover:bg-surface-container transition-colors" href="#">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[18px]">card_giftcard</span>
                        <span className="font-body-md text-body-md text-on-surface">Hộp Sơn Mài <strong>Long Phụng Sum Vầy</strong> kèm Trà Ô Long</span>
                      </div>
                      <span className="font-data-mono text-body-sm text-primary font-semibold">Từ 1.250k</span>
                    </a>
                  </div>

                  <div className="flex flex-col gap-1 p-2 bg-surface-container-low/60 rounded-lg">
                    <div className="flex items-center justify-between pb-1 px-2">
                      <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">factory</span> Gian hàng / Xưởng chế tác (3)
                      </span>
                      <span className="font-data-mono text-body-sm text-tertiary font-semibold">ISO &amp; HACCP</span>
                    </div>
                    <a className="flex items-center justify-between p-2 rounded-md hover:bg-surface-container transition-colors" href="#">
                      <div className="flex flex-col">
                        <span className="font-title-md text-title-md text-on-surface">Xưởng Nghệ Nhân Kinh Đô Vàng</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Hà Nội • Năng lực 20.000 hộp/ngày</span>
                      </div>
                      <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded">99đ Vàng</span>
                    </a>
                    <a className="flex items-center justify-between p-2 rounded-md hover:bg-surface-container transition-colors" href="#">
                      <div className="flex flex-col">
                        <span className="font-title-md text-title-md text-on-surface">Công ty Thực phẩm Thượng Hạng Tràng An</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Bắc Ninh • Khắc laser kim hoàn</span>
                      </div>
                      <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded">96đ Vàng</span>
                    </a>
                    <a className="flex items-center justify-between p-2 rounded-md hover:bg-surface-container transition-colors" href="#">
                      <div className="flex flex-col">
                        <span className="font-title-md text-title-md text-on-surface">Bảo Ngọc Bakery Corporate</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">TP. Hồ Chí Minh • Ép kim logo 24h</span>
                      </div>
                      <span className="bg-surface-container-highest text-on-surface font-label-sm text-label-sm px-2 py-0.5 rounded">94đ</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-space-sm bg-surface-container-low/70 p-space-md rounded-xl">
              <div className="flex flex-wrap items-center justify-between gap-space-sm">
                <div className="flex items-center gap-2">
                  <span className="flex h-3 w-3 rounded-full bg-secondary"></span>
                  <p className="font-body-md text-body-md text-on-surface">
                    Tìm thấy <strong className="text-primary font-headline-sm text-headline-sm">128</strong> sản phẩm và <strong className="text-tertiary font-headline-sm text-headline-sm">14</strong> xưởng sản xuất cho từ khóa <span className="font-title-md text-title-md text-on-surface">"Hộp bánh Trung Thu Doanh nghiệp VIP"</span>
                  </p>
                </div>
                <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
                  <span>Tất cả đã xác minh nguồn gốc xuất xứ &amp; VSATTP</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant/80 uppercase mr-1">Bộ lọc đang bật:</span>
                <div className="inline-flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1.5 rounded-lg text-primary font-label-md text-label-md shadow-sm">
                  <span>Chiết khấu ≥ 25%</span>
                  <button aria-label="Xóa bộ lọc chiết khấu" className="hover:text-primary-container flex items-center">
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1.5 rounded-lg text-on-surface font-label-md text-label-md shadow-sm">
                  <span>Số lượng tối thiểu ≤ 100 hộp</span>
                  <button aria-label="Xóa bộ lọc số lượng tối thiểu" className="hover:text-primary flex items-center">
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1.5 rounded-lg text-secondary font-label-md text-label-md shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">branding_watermark</span>
                  <span>Hỗ trợ in logo công ty</span>
                  <button aria-label="Xóa bộ lọc in logo" className="hover:text-primary flex items-center">
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1.5 rounded-lg text-tertiary font-label-md text-label-md shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Xưởng đạt chuẩn ISO/HACCP</span>
                  <button aria-label="Xóa bộ lọc chuẩn chứng nhận" className="hover:text-primary flex items-center">
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
                <button className="font-label-sm text-label-sm text-primary hover:text-primary-container underline underline-offset-4 ml-2 transition-colors">
                  Xóa tất cả bộ lọc (4)
                </button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

            <aside className="lg:col-span-4 flex flex-col gap-space-md sticky top-32">
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-lg">
                <div className="flex items-center justify-between pb-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">filter_alt</span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">Bộ lọc đa chiều B2B</h2>
                  </div>
                  <span className="font-data-mono text-body-sm text-on-surface-variant">Lọc nhanh</span>
                </div>

                <div className="flex flex-col gap-space-xs">
                  <span className="font-title-md text-title-md text-on-surface flex items-center justify-between">
                    Phân loại quà tặng &amp; Bánh
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">expand_less</span>
                  </span>
                  <div className="flex flex-col gap-2 mt-2">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-2">
                        <input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox" />
                        <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Hộp quà tặng Doanh nghiệp VIP</span>
                      </div>
                      <span className="font-data-mono text-body-sm text-on-surface-variant">68</span>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-2">
                        <input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox" />
                        <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Bánh nướng truyền thống &amp; hiện đại</span>
                      </div>
                      <span className="font-data-mono text-body-sm text-on-surface-variant">42</span>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-2">
                        <input className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox" />
                        <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Bánh dẻo cao cấp sen nhuyễn</span>
                      </div>
                      <span className="font-data-mono text-body-sm text-on-surface-variant">25</span>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-2">
                        <input className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox" />
                        <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Bánh Tuyết (Snow-skin) lạnh</span>
                      </div>
                      <span className="font-data-mono text-body-sm text-on-surface-variant">14</span>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-2">
                        <input className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox" />
                        <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Hộp sơn mài / Hộp da cao cấp</span>
                      </div>
                      <span className="font-data-mono text-body-sm text-on-surface-variant">19</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-space-xs pt-space-sm bg-surface-container-low p-space-md rounded-xl">
                  <span className="font-title-md text-title-md text-on-surface flex items-center justify-between">
                    Vị nhân tuyển chọn
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">expand_less</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <button className="px-2.5 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm">Thập cẩm gà quay xốt XO</button>
                    <button className="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm">Bào ngư sốt rượu vang</button>
                    <button className="px-2.5 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm">Đậu xanh sen nhuyễn</button>
                    <button className="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm">Lava trứng chảy Hoàng Kim</button>
                    <button className="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm">Matcha Uji &amp; Hạt sen</button>
                    <button className="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm">Tổ yến hạt sen tuyết nhĩ</button>
                    <button className="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm">Hạt dẻ Trùng Khánh</button>
                  </div>
                </div>

                <div className="flex flex-col gap-space-xs">
                  <span className="font-title-md text-title-md text-on-surface flex items-center justify-between">
                    Số lượng tối thiểu (Min MOQ)
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">expand_less</span>
                  </span>
                  <div className="flex flex-col gap-2 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input className="w-4 h-4 text-primary accent-primary cursor-pointer" name="moq" type="radio" />
                      <span className="font-body-md text-body-md text-on-surface">Dưới 50 hộp (Mua thử / Test mẫu)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input defaultChecked className="w-4 h-4 text-primary accent-primary cursor-pointer" name="moq" type="radio" />
                      <span className="font-body-md text-body-md text-primary font-semibold">50 - 200 hộp (Quy mô vừa)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input className="w-4 h-4 text-primary accent-primary cursor-pointer" name="moq" type="radio" />
                      <span className="font-body-md text-body-md text-on-surface">200 - 500 hộp (Tập đoàn &amp; Chi nhánh)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input className="w-4 h-4 text-primary accent-primary cursor-pointer" name="moq" type="radio" />
                      <span className="font-body-md text-body-md text-on-surface">Trên 500 hộp (Đấu thầu sỉ lớn)</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-title-md text-title-md text-on-surface">Khoảng giá sỉ (VNĐ / Hộp)</span>
                    <span className="font-data-mono text-body-sm text-secondary font-medium">Chưa VAT</span>
                  </div>

                  <div className="w-full flex flex-col gap-2 mt-2">
                    <div className="relative w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="absolute left-1/4 right-1/4 h-full bg-primary rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Tối thiểu:</span>
                        <div className="bg-surface-container-low px-3 py-1.5 rounded-lg flex items-center justify-between">
                          <input className="w-full bg-transparent font-data-mono text-body-sm text-on-surface focus:outline-none" type="text" value="250.000" />
                          <span className="font-label-sm text-label-sm text-on-surface-variant">đ</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Tối đa:</span>
                        <div className="bg-surface-container-low px-3 py-1.5 rounded-lg flex items-center justify-between">
                          <input className="w-full bg-transparent font-data-mono text-body-sm text-on-surface focus:outline-none" type="text" value="1.200.000" />
                          <span className="font-label-sm text-label-sm text-on-surface-variant">đ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-space-xs">
                  <span className="font-title-md text-title-md text-on-surface">Năng lực xưởng &amp; Dịch vụ VIP</span>
                  <div className="flex flex-col gap-2 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input defaultChecked className="w-4 h-4 rounded text-secondary focus:ring-secondary accent-secondary cursor-pointer" type="checkbox" />
                      <span className="font-body-md text-body-md text-on-surface">Hỗ trợ in khắc logo &amp; ép kim</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input defaultChecked className="w-4 h-4 rounded text-tertiary focus:ring-tertiary accent-tertiary cursor-pointer" type="checkbox" />
                      <span className="font-body-md text-body-md text-on-surface">Cung cấp hộp mẫu thử (Sample Box)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox" />
                      <span className="font-body-md text-body-md text-on-surface">Xuất hóa đơn VAT điện tử trong ngày</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input defaultChecked className="w-4 h-4 rounded text-tertiary focus:ring-tertiary accent-tertiary cursor-pointer" type="checkbox" />
                      <span className="font-body-md text-body-md text-on-surface">Có chứng chỉ ATTP / ISO 22000</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox" />
                      <span className="font-body-md text-body-md text-on-surface">Hỗ trợ giao hàng phân tán nhiều địa chỉ</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-space-xs">
                  <span className="font-title-md text-title-md text-on-surface">Điểm xếp hạng xưởng bánh</span>
                  <div className="flex flex-col gap-2 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input defaultChecked className="w-4 h-4 rounded text-secondary accent-secondary cursor-pointer" type="checkbox" />
                      <span className="inline-flex items-center gap-1 font-body-md text-body-md text-on-surface">
                        <span className="material-symbols-outlined text-[16px] text-secondary">workspace_premium</span>
                        Hạng Đối tác Vàng (Điểm ≥ 90)
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input defaultChecked className="w-4 h-4 rounded text-primary accent-primary cursor-pointer" type="checkbox" />
                      <span className="inline-flex items-center gap-1 font-body-md text-body-md text-on-surface">
                        <span className="material-symbols-outlined text-[16px] text-tertiary">star</span>
                        Xưởng Đạt Chuẩn (Điểm 80 - 89)
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-space-xs">
                  <span className="font-title-md text-title-md text-on-surface">Khu vực sản xuất / Giao nhận</span>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input defaultChecked className="w-4 h-4 rounded text-primary accent-primary" type="checkbox" />
                      <span className="font-body-md text-body-md text-on-surface">Hà Nội (62)</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input defaultChecked className="w-4 h-4 rounded text-primary accent-primary" type="checkbox" />
                      <span className="font-body-md text-body-md text-on-surface">TP. HCM (48)</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input className="w-4 h-4 rounded text-primary accent-primary" type="checkbox" />
                      <span className="font-body-md text-body-md text-on-surface">Đà Nẵng (11)</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input className="w-4 h-4 rounded text-primary accent-primary" type="checkbox" />
                      <span className="font-body-md text-body-md text-on-surface">Hải Phòng (7)</span>
                    </label>
                  </div>
                </div>
                <button className="w-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface py-2.5 rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                  <span>Đặt lại toàn bộ tiêu chí lọc</span>
                </button>
              </div>
            </aside>

            <main className="lg:col-span-8 flex flex-col gap-space-md">

              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
                <div className="flex flex-wrap items-center gap-space-xs w-full md:w-auto">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase mr-1">Sắp xếp:</span>
                  <button className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md">Bán chạy mùa 2025</button>
                  <button className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors">Chiết khấu cao nhất</button>
                  <button className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors">Uy tín xưởng cao nhất</button>
                  <button className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors hidden sm:block">Giá tăng dần</button>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-space-md w-full md:w-auto shrink-0">
                  <span className="font-data-mono text-body-sm text-on-surface-variant">Hiển thị 1 - 6 / 128 hộp</span>
                  <div className="flex items-center bg-surface-container-low p-1 rounded-lg">
                    <button aria-label="Xem dạng lưới" className="p-1.5 rounded bg-surface-container-lowest text-primary shadow-sm flex items-center">
                      <span className="material-symbols-outlined text-[18px]">grid_view</span>
                    </button>
                    <button aria-label="Xem dạng danh sách" className="p-1.5 rounded hover:bg-surface-container-lowest text-on-surface-variant transition-colors flex items-center">
                      <span className="material-symbols-outlined text-[18px]">view_list</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">

                <article className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Hộp bánh trung thu doanh nghiệp cao cấp thiết kế sơn mài khắc họa sen vàng hoàng gia, đặt trên mặt bàn gỗ tối màu, ánh sáng studio sang trọng ấm áp phong cách B2B thượng lưu, đi kèm hai chiếc bánh nướng vàng ruộm dập nổi hoa văn tinh xảo." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDWGnJKOc9vZruxdxZ1spHhXk5bFFSgH7EU2kw0RjZkPr0lsmd4wgCzdcABz28UNFCmkhlz6k0EEe4ktBLGCN0KitjPoWHPtCgb2_MwxjcxT9j7myuasEvFs_ToLtqwylCAzG5owhu925Itdb6_uXWqLrv-tZeIbOzVJ3946h_dGSQBRfK09xHpzPAPqnR1YAr1xvWSKwD6E8Z_eAGlnya8pEupOyfsM9y2RmmLuTqvlCcST9tOF2Q" />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2.5 py-1 rounded font-bold shadow-sm">
                        Chiết khấu đến 35%
                      </span>
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-tertiary">bolt</span> Giao trong 48h
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 flex-wrap">
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-label-sm px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">branding_watermark</span> Miễn phí khắc Logo
                      </span>
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md text-tertiary font-label-sm text-label-sm px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">featured_seasonal_and_gifts</span> Hộp mẫu 0đ
                      </span>
                    </div>
                  </div>
                  <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                    <div className="flex flex-col gap-1">

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Xưởng Bánh Kinh Đô Vàng</span>
                          <span className="material-symbols-outlined text-[15px] text-tertiary" title="Xưởng xác minh ISO 22000">verified</span>
                        </div>
                        <span className="bg-secondary-fixed text-on-secondary-fixed font-data-mono text-body-sm px-1.5 py-0.5 rounded font-semibold">98đ • Đối tác Vàng</span>
                      </div>

                      <h3 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                        Set Hộp Sơn Mài "Hoàng Kim Nguyệt Đoàn" 4 Bánh VIP
                      </h3>

                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                        Vị: Bào ngư vi cá, Cua huỳnh đế, Trà xanh matcha, Sen nhuyễn 2 trứng muối.
                      </p>

                      <div className="bg-surface-container-low p-2.5 rounded-lg mt-2 flex flex-col gap-1">
                        <div className="flex items-baseline justify-between">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Giá sỉ tham chiếu:</span>
                          <span className="font-headline-sm text-headline-sm text-primary font-bold">420.000đ - 680.000đ <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/ hộp</span></span>
                        </div>
                        <div className="flex items-center justify-between text-body-sm">
                          <span className="text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">pin</span> MOQ: Tối thiểu 50 hộp
                          </span>
                          <span className="text-on-surface-variant font-data-mono">Đã giao: 12.400 hộp (2024)</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button className="bg-primary text-on-primary hover:bg-primary-container px-2 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                        <span>Đặt hàng sỉ</span>
                      </button>
                      <button className="bg-surface-container-high hover:bg-surface-container-highest text-secondary px-2 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">request_quote</span>
                        <span>Mẫu thử / RFQ</span>
                      </button>
                    </div>
                  </div>
                </article>

                <article className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Hộp quà tặng bánh trung thu khung gỗ thông tự nhiên khắc laser logo doanh nghiệp tinh tế, bên trong lót lụa vàng ánh kim, chứa 6 bánh nướng hoa văn tinh tế và một hộp thiếc trà sen thượng hạng, ánh sáng dịu nhẹ cao cấp." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYA9O26BTQlnaOmzLhxcWJlZiR7MWKRys2dsTuuzs4OetYTZ4JJtm45jb0EY2xAjhJruzsjzlmrRH0BmGLFMgsI2X7ZvonUoQRSkv7mPUhQNN5W-FtDH2wUToKkxWJO3NwBwR6EgVt4TlVtfa7JB0cumAosSiLMSgEq-RPAucRIxoSbSaoQnnaRHz49YVluW-_8qyf_uvJOnEBgxHgrna7E06l2WyZREzIogPNNo6JqgN3LoPNIpAX" />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2.5 py-1 rounded font-bold shadow-sm">
                        Chiết khấu đến 28%
                      </span>
                      <span className="bg-tertiary text-on-tertiary font-label-sm text-label-sm px-2 py-0.5 rounded shadow-sm">
                        Bán chạy #1 Doanh Nghiệp
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 flex-wrap">
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-label-sm px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">draw</span> Khắc laser logo 3D
                      </span>
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md text-tertiary font-label-sm text-label-sm px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">receipt_long</span> VAT 100%
                      </span>
                    </div>
                  </div>
                  <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Bánh Thượng Hạng Tràng An</span>
                          <span className="material-symbols-outlined text-[15px] text-tertiary" title="Chứng nhận HACCP">verified</span>
                        </div>
                        <span className="bg-secondary-fixed text-on-secondary-fixed font-data-mono text-body-sm px-1.5 py-0.5 rounded font-semibold">96đ • Đối tác Vàng</span>
                      </div>
                      <h3 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                        Hộp Gỗ Phong Thủy "Nguyệt Dạ Thượng Uyển" Kèm Trà Quý
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                        Vị: Yến sào hạt sen, Thập cẩm gà quay ngũ vị, Lava trứng muối tan chảy.
                      </p>
                      <div className="bg-surface-container-low p-2.5 rounded-lg mt-2 flex flex-col gap-1">
                        <div className="flex items-baseline justify-between">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Giá sỉ tham chiếu:</span>
                          <span className="font-headline-sm text-headline-sm text-primary font-bold">590.000đ - 920.000đ <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/ hộp</span></span>
                        </div>
                        <div className="flex items-center justify-between text-body-sm">
                          <span className="text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">pin</span> MOQ: Tối thiểu 30 hộp
                          </span>
                          <span className="text-on-surface-variant font-data-mono">Đánh giá: 4.9 ★ (840 rv)</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button className="bg-primary text-on-primary hover:bg-primary-container px-2 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                        <span>Đặt hàng sỉ</span>
                      </button>
                      <button className="bg-surface-container-high hover:bg-surface-container-highest text-secondary px-2 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">request_quote</span>
                        <span>Mẫu thử / RFQ</span>
                      </button>
                    </div>
                  </div>
                </article>

                <article className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Bộ hộp quà bánh trung thu màu đỏ thẫm truyền thống kết hợp dập nổi vàng kim sang trọng, 4 chiếc bánh trung thu nhân hạt dẻ và trứng muối vàng ươm, phong cách mỹ thuật hiện đại thanh lịch dành riêng cho quà biếu đối tác." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMUAREMHiXvBG8ERdfn-mSGK6rhh5ocRiWMsi-0JoArqloib1niIMZ-mon1JCh4SUtDNxxglQnvNrbbTRkVAjFugyZXYR-bc_vEMYvwGKjolo2mB0cUKu-siLIaoIpWcZlJA4AM_VKcs8MAkZRrRi00fLX30egyuS0fYJOsGS0-SV0fztYIFN-XEezZsORqyVrojw0H8zvf4Snk48-U2jvp8lwXTWBoM_PdqaRTKAv_Er0ubJ6XhCZ" />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2.5 py-1 rounded font-bold shadow-sm">
                        Chiết khấu đến 32%
                      </span>
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-2 py-0.5 rounded shadow-sm">
                        Tặng thiệp in lời chúc
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 flex-wrap">
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-label-sm px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">branding_watermark</span> Ép kim nhũ vàng
                      </span>
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md text-tertiary font-label-sm text-label-sm px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">local_shipping</span> Free ship HN &amp; HCM
                      </span>
                    </div>
                  </div>
                  <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Bảo Ngọc Mooncake Factory</span>
                          <span className="material-symbols-outlined text-[15px] text-tertiary" title="Xác minh nguồn gốc">verified</span>
                        </div>
                        <span className="bg-surface-container-highest text-on-surface font-data-mono text-body-sm px-1.5 py-0.5 rounded font-semibold">94đ • Chuẩn</span>
                      </div>
                      <h3 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                        Bộ Quà Tặng "Cát Tường Như Ý" Đỏ Nhung Cao Cấp
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                        Vị: Thập cẩm Jambon xá xíu, Hạt sen nhãn nhục, Khoai môn dừa béo.
                      </p>
                      <div className="bg-surface-container-low p-2.5 rounded-lg mt-2 flex flex-col gap-1">
                        <div className="flex items-baseline justify-between">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Giá sỉ tham chiếu:</span>
                          <span className="font-headline-sm text-headline-sm text-primary font-bold">310.000đ - 480.000đ <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/ hộp</span></span>
                        </div>
                        <div className="flex items-center justify-between text-body-sm">
                          <span className="text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">pin</span> MOQ: Tối thiểu 50 hộp
                          </span>
                          <span className="text-on-surface-variant font-data-mono">Đã giao: 8.900 hộp</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button className="bg-primary text-on-primary hover:bg-primary-container px-2 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                        <span>Đặt hàng sỉ</span>
                      </button>
                      <button className="bg-surface-container-high hover:bg-surface-container-highest text-secondary px-2 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">request_quote</span>
                        <span>Mẫu thử / RFQ</span>
                      </button>
                    </div>
                  </div>
                </article>

                <article className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Hộp bánh trung thu hình tròn phong cách mặt trăng rằm dạ quang cao cấp, thiết kế mở cánh quạt hai tầng đựng 6 bánh tuyết mát lạnh và rượu vang nhập khẩu, chuẩn quà tặng ban giám đốc." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG5dlYxO3ffEbioWMGxWQCxgagVqo0LXW54yg88JrIEZkZTGX6Iu4bfkv49yzsQtVG69fqu9gHsMLs4RpvflTsK3IXPEF3oJ4C-mbdQpmjewNWfHGAaq3sZhCAd9VnMtH5wxEXkIF2VREXWASOLov6FSxfCDA8dm4DBpcyY-PLUELszGFbY7acqnwLAjm_eRUqvVmI67wFwVTsAsEnOGWp1MksrHARZ-xgQJFUjEJ4SUKtb9CnZaqF" />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2.5 py-1 rounded font-bold shadow-sm">
                        Chiết khấu đến 25%
                      </span>
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-2 py-0.5 rounded shadow-sm">
                        Kèm Rượu Vang Chile
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 flex-wrap">
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-label-sm px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">inventory</span> Hộp 2 tầng cánh quạt
                      </span>
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md text-tertiary font-label-sm text-label-sm px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">ac_unit</span> Bảo quản lạnh
                      </span>
                    </div>
                  </div>
                  <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Bếp Bánh Nghệ Nhân Hữu Nghị</span>
                          <span className="material-symbols-outlined text-[15px] text-tertiary" title="Xác minh nhà sản xuất">verified</span>
                        </div>
                        <span className="bg-secondary-fixed text-on-secondary-fixed font-data-mono text-body-sm px-1.5 py-0.5 rounded font-semibold">97đ • Đối tác Vàng</span>
                      </div>
                      <h3 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                        Hộp Trăng Vàng "Dạ Nguyệt Nghênh Thu" 6 Bánh Kèm Rượu
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                        Vị: Bào ngư sốt vang, Tôm hùm Alaska, Đậu đỏ phô mai, Sô-cô-la truffle.
                      </p>
                      <div className="bg-surface-container-low p-2.5 rounded-lg mt-2 flex flex-col gap-1">
                        <div className="flex items-baseline justify-between">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Giá sỉ tham chiếu:</span>
                          <span className="font-headline-sm text-headline-sm text-primary font-bold">850.000đ - 1.450.000đ <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/ hộp</span></span>
                        </div>
                        <div className="flex items-center justify-between text-body-sm">
                          <span className="text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">pin</span> MOQ: Tối thiểu 20 hộp
                          </span>
                          <span className="text-on-surface-variant font-data-mono">Đánh giá: 5.0 ★ (310 rv)</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button className="bg-primary text-on-primary hover:bg-primary-container px-2 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                        <span>Đặt hàng sỉ</span>
                      </button>
                      <button className="bg-surface-container-high hover:bg-surface-container-highest text-secondary px-2 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">request_quote</span>
                        <span>Mẫu thử / RFQ</span>
                      </button>
                    </div>
                  </div>
                </article>

                <article className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Hộp bánh trung thu xanh ngọc bích phong cách hoàng gia tân cổ điển, điểm xuyết hoa sen dát bạc tinh xảo, trưng bày 4 chiếc bánh nướng vàng nâu óng ánh và hũ trà ô long thượng hạng, không gian chụp hình sang trọng." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiRC3kUjOyiCEboZGQ9kZ50b70CAuqSgzIGxwjeu7cz2jwIwhLVb_E_1DRlLQ4-8qGwIjwWf2Ipu48gBgB9lLVWjZs3tObvrVKOdq749twPqVq8ht5JII9Mm1wTA8hEaMo9pQBDdxSf7rd5-2OkfSMbmTDcLkDzH5tNjfpjIzsM-PW-ntPP5C4Wq67RvHw9Rbm7gwitjBXp81ICu2yo2QJvcb8oem_4jRBcbAKxAWb6-hPOsoZeQF6" />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2.5 py-1 rounded font-bold shadow-sm">
                        Chiết khấu đến 30%
                      </span>
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-2 py-0.5 rounded shadow-sm">
                        Mẫu thử 24h
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 flex-wrap">
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-label-sm px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">branding_watermark</span> Túi giấy dập nổi
                      </span>
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md text-tertiary font-label-sm text-label-sm px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">verified</span> Hợp đồng Escrow
                      </span>
                    </div>
                  </div>
                  <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Bánh Trung Thu Như Lan</span>
                          <span className="material-symbols-outlined text-[15px] text-tertiary" title="Xác minh xưởng">verified</span>
                        </div>
                        <span className="bg-secondary-fixed text-on-secondary-fixed font-data-mono text-body-sm px-1.5 py-0.5 rounded font-semibold">95đ • Đối tác Vàng</span>
                      </div>
                      <h3 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                        Hộp Quà Doanh Nghiệp "Bích Ngọc Liên Hoa" 4 Bánh Sang Trọng
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                        Vị: Thập cẩm gà quay vi cá, Đậu xanh hạt dưa, Táo đỏ kỷ tử, Hạt sen trà lài.
                      </p>
                      <div className="bg-surface-container-low p-2.5 rounded-lg mt-2 flex flex-col gap-1">
                        <div className="flex items-baseline justify-between">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Giá sỉ tham chiếu:</span>
                          <span className="font-headline-sm text-headline-sm text-primary font-bold">360.000đ - 540.000đ <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/ hộp</span></span>
                        </div>
                        <div className="flex items-center justify-between text-body-sm">
                          <span className="text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">pin</span> MOQ: Tối thiểu 50 hộp
                          </span>
                          <span className="text-on-surface-variant font-data-mono">Đã giao: 15.600 hộp</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button className="bg-primary text-on-primary hover:bg-primary-container px-2 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                        <span>Đặt hàng sỉ</span>
                      </button>
                      <button className="bg-surface-container-high hover:bg-surface-container-highest text-secondary px-2 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">request_quote</span>
                        <span>Mẫu thử / RFQ</span>
                      </button>
                    </div>
                  </div>
                </article>

                <article className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Hộp da thủ công cao cấp màu nâu cognac với khóa kim loại đồng cổ điển chứa 4 bánh trung thu hiện đại nạm vàng thực phẩm 24k, xung quanh rải lá trà hoa cúc và hạt sen khô tinh tế." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMzt4e1pN9ijpm7jqoS0wFGrA_vHb1XOgwyddhQBrALfkv6NS1wijA8IzL-dLH4W0DYfFoX9BCXnKJH-tsyf82a16iTc0bd8fCA7-1o5qFWBrTGSGCkHcACirZ4SHXHDSUtIrWTUKM29GHydkf-DCQ_vyoHnomtEP_kGwd4EeJg2lnxQsXxpZTwfy4v9Ggv3ktyfwSAhBUdZAAJzC6qOnvW4SSNaGnyXdX9jIwrmrHBZQfswR24oCc" />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2.5 py-1 rounded font-bold shadow-sm">
                        Chiết khấu đến 20%
                      </span>
                      <span className="bg-secondary text-on-secondary font-label-sm text-label-sm px-2 py-0.5 rounded shadow-sm">
                        Dát Vàng Thực Phẩm 24K
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 flex-wrap">
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-label-sm px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">branding_watermark</span> Dập nổi nhiệt da VIP
                      </span>
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md text-tertiary font-label-sm text-label-sm px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">military_tech</span> Kiểm định vàng PNJ
                      </span>
                    </div>
                  </div>
                  <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Boutique Bánh Thượng Uyển Sài Gòn</span>
                          <span className="material-symbols-outlined text-[15px] text-tertiary" title="Xác minh nghệ nhân">verified</span>
                        </div>
                        <span className="bg-secondary-fixed text-on-secondary-fixed font-data-mono text-body-sm px-1.5 py-0.5 rounded font-semibold">99đ • Đối tác Vàng</span>
                      </div>
                      <h3 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                        Hộp Vali Da "Kim Nguyệt Hoàng Gia" Dát Vàng 24K
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                        Vị: Sâm Ngọc Linh mật ong rừng, Cua huỳnh đế tiêu đen, Sen vàng nhung hươu.
                      </p>
                      <div className="bg-surface-container-low p-2.5 rounded-lg mt-2 flex flex-col gap-1">
                        <div className="flex items-baseline justify-between">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Giá sỉ tham chiếu:</span>
                          <span className="font-headline-sm text-headline-sm text-primary font-bold">1.280.000đ - 2.100.000đ <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/ hộp</span></span>
                        </div>
                        <div className="flex items-center justify-between text-body-sm">
                          <span className="text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">pin</span> MOQ: Tối thiểu 10 hộp
                          </span>
                          <span className="text-on-surface-variant font-data-mono">Đã giao: 1.250 hộp</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button className="bg-primary text-on-primary hover:bg-primary-container px-2 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                        <span>Đặt hàng sỉ</span>
                      </button>
                      <button className="bg-surface-container-high hover:bg-surface-container-highest text-secondary px-2 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">request_quote</span>
                        <span>Mẫu thử / RFQ</span>
                      </button>
                    </div>
                  </div>
                </article>
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Hiển thị mỗi trang:</span>
                  <select className="bg-surface-container-low text-on-surface font-data-mono text-body-sm px-2.5 py-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer">
                    <option>6 hộp</option>
                    <option defaultValue>12 hộp</option>
                    <option>24 hộp</option>
                    <option>48 hộp</option>
                  </select>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-40">
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  </button>
                  <button className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary text-on-primary font-data-mono text-body-sm font-semibold">1</button>
                  <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-surface-container text-on-surface font-data-mono text-body-sm transition-colors">2</button>
                  <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-surface-container text-on-surface font-data-mono text-body-sm transition-colors">3</button>
                  <span className="px-1 text-on-surface-variant font-data-mono text-body-sm">...</span>
                  <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-surface-container text-on-surface font-data-mono text-body-sm transition-colors">11</button>
                  <button className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors">
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>

              <section className="bg-gradient-to-br from-surface-container-low via-surface-container-lowest to-secondary-fixed/20 p-space-lg rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-lg">
                <div className="flex flex-col gap-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-white">
                      <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                    </span>
                    <span className="font-label-md text-label-md text-secondary uppercase tracking-wider font-bold">
                      Trợ lý Cố Vấn Doanh Nghiệp AI Trăng Vàng
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Chưa tìm được mẫu hộp phù hợp với tổng ngân sách của bạn?
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Nhập số lượng hộp cần đặt và hạn mức ngân sách dự kiến, AI sẽ tự động phân bổ cơ cấu nhân bánh cao cấp, đàm phán chiết khấu xưởng tốt nhất và tạo file báo giá tổng hợp (PDF/Excel) gửi đến email doanh nghiệp của bạn trong 60 giây.
                  </p>
                  <div className="flex flex-wrap items-center gap-space-sm pt-1">
                    <span className="inline-flex items-center gap-1 font-body-sm text-body-sm text-tertiary">
                      <span className="material-symbols-outlined text-[16px]">check</span> Tối ưu thuế VAT &amp; Chi phí quà tặng
                    </span>
                    <span className="inline-flex items-center gap-1 font-body-sm text-body-sm text-tertiary">
                      <span className="material-symbols-outlined text-[16px]">check</span> Hỗ trợ mẫu thiết kế mockup 3D miễn phí
                    </span>
                  </div>
                </div>
                <div className="flex flex-col w-full md:w-auto shrink-0 gap-space-xs bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Ước tính nhanh cho công ty:</span>
                  <div className="flex items-center gap-2">
                    <input className="w-32 bg-surface-container-low px-3 py-2 rounded-lg font-data-mono text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Số lượng: VD 250" type="number" />
                    <input className="w-36 bg-surface-container-low px-3 py-2 rounded-lg font-data-mono text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Ngân sách: VD 150tr" type="text" />
                  </div>
                  <button className="mt-1 w-full bg-secondary hover:bg-on-secondary-fixed text-white font-label-md text-label-md py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
                    <span>Tạo Báo Giá Đề Xuất Tức Thì</span>
                  </button>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
      </main><aside className="fixed bottom-6 right-6 z-40"><button className="flex items-center gap-space-sm bg-primary text-on-primary px-space-md py-3 rounded-full shadow-[0_4px_16px_-2px_rgba(120,113,108,0.25),0_2px_6px_-1px_rgba(153,27,27,0.2)] hover:bg-primary-container transition-all group"><span className="material-symbols-outlined text-[20px] text-secondary-fixed group-hover:scale-110 transition-transform">support_agent</span><div className="flex flex-col text-left"><span className="font-label-md text-label-md leading-none text-white">Trợ lý AI Trăng Vàng</span><span className="font-label-sm text-label-sm text-on-primary-container leading-none mt-1">Báo giá tức thì 24/7</span></div><span className="flex h-2 w-2 rounded-full bg-tertiary-fixed ml-1 animate-pulse"></span></button></aside><footer className="w-full bg-surface-container-low mt-space-xl shadow-[0_-1px_8px_rgba(0,0,0,0.03)]"><div className="max-w-7xl mx-auto px-margin pt-space-xl pb-space-lg"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-lg"><div className="lg:col-span-2 flex flex-col gap-space-sm"><div className="flex items-center gap-space-sm"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">bakery_dining</span></div><span className="font-headline-sm text-headline-sm text-primary">MoonMarket B2B</span></div><p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mt-space-xs">Sàn giao dịch thương mại điện tử chuyên biệt kết nối doanh nghiệp mua sỉ bánh trung thu với các xưởng làm bánh nghệ nhân và nhà sản xuất đạt chứng nhận an toàn thực phẩm trên toàn quốc.</p><div className="flex flex-wrap gap-space-xs mt-space-sm"><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm"><span className="material-symbols-outlined text-[14px]">verified</span> HACCP / ISO 22000</span><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm"><span className="material-symbols-outlined text-[14px]">gavel</span> Hợp đồng điện tử FPT.eContract</span><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm"><span className="material-symbols-outlined text-[14px]">account_balance</span> Ký quỹ bảo chứng ngân hàng</span></div></div><div className="flex flex-col gap-space-xs"><span className="font-title-md text-title-md text-on-surface mb-2">Dành cho Doanh Nghiệp</span><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" data-path="san-pham-co-san" href="#">Danh mục quà tặng doanh nghiệp</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" data-path="bao-gia-rfq" href="#">Gửi yêu cầu báo giá (RFQ)</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" data-path="bang-gia-si" href="#">Chính sách chiết khấu theo số lượng</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Đăng ký gửi hộp mẫu thử (Sample Box)</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Gia công in logo &amp; khắc hộp gỗ</a></div><div className="flex flex-col gap-space-xs"><span className="font-title-md text-title-md text-on-surface mb-2">Dành cho Nhà Xưởng</span><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" data-path="tim-xuong-gian-hang" href="#">Mở gian hàng cung ứng</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Quy chuẩn kiểm định chất lượng</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Đấu thầu đơn hàng lớn (Bulk Bidding)</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Quy định giao hàng &amp; Logistics bảo quản</a></div><div className="flex flex-col gap-space-xs"><span className="font-title-md text-title-md text-on-surface mb-2">Hỗ trợ &amp; Pháp lý</span><p className="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-1 py-1"><span className="material-symbols-outlined text-[16px] text-primary shrink-0">headset_mic</span> CSKH B2B: 1800 6886 (8h - 21h)</p><p className="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-1 py-1"><span className="material-symbols-outlined text-[16px] text-primary shrink-0">mail</span> corporate@moonmarket.vn</p><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Chính sách bảo mật &amp; thanh toán ký quỹ</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Điều khoản sử dụng sàn TMĐT B2B</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1" href="#">Quy chuẩn kiểm nghiệm ATVSTP</a></div></div><div className="mt-space-lg pt-space-md flex flex-col md:flex-row items-center justify-between text-body-sm font-body-sm text-on-surface-variant gap-space-sm"><p>© 2024 MoonMarket B2B Vietnam Co., Ltd. Bảo lưu mọi quyền.</p><div className="flex items-center gap-space-md"><span className="flex items-center gap-1 font-label-sm"><span className="material-symbols-outlined text-[15px] text-tertiary">shield_lock</span> Giao dịch an toàn 100% qua Escrow</span><span className="font-label-sm text-on-surface-variant/80">Mã số thuế: 0109886886 cấp bởi Sở Kế Hoạch &amp; Đầu Tư TP. Hà Nội</span></div></div></div></footer>
    </div>
  );
}
