
export default function Footer({ onNavigate }) {
  const handleNav = (path) => {
    onNavigate?.(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#fbf2ed] text-stone-800 border-t border-[#ebdcd5] text-sm">
      {/* 1. THANH CAM KẾT / TRUST BAR CHUẨN E-COMMERCE */}
      <div className="border-b border-[#ebdcd5] bg-[#f8ece4] py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div>
              <p className="font-bold text-stone-900 text-xs sm:text-sm leading-tight">Giao Hỏa Tốc &amp; Xe Lạnh</p>
              <p className="text-[11px] text-stone-500 leading-tight">Bàn giao PoD đúng hẹn toàn quốc</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ffba00]/20 text-[#7e5703] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
            <div>
              <p className="font-bold text-stone-900 text-xs sm:text-sm leading-tight">100% Xưởng Đạt Chuẩn</p>
              <p className="text-[11px] text-stone-500 leading-tight">Kiểm định ISO 22000 &amp; HACCP</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
            </div>
            <div>
              <p className="font-bold text-stone-900 text-xs sm:text-sm leading-tight">Xuất Hóa Đơn VAT</p>
              <p className="text-[11px] text-stone-500 leading-tight">Hợp đồng điện tử B2B minh bạch</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">security</span>
            </div>
            <div>
              <p className="font-bold text-stone-900 text-xs sm:text-sm leading-tight">SafeTrade Escrow</p>
              <p className="text-[11px] text-stone-500 leading-tight">Bảo vệ dòng tiền đơn vị thu mua</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. KHỐI NỘI DUNG CHÍNH (4 CỘT GỌN GÀNG, CHUẨN UI/UX BÁN HÀNG) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

          {/* CỘT 1: THƯƠNG HIỆU & LIÊN HỆ */}
          <div className="space-y-3">
            <div
              onClick={() => handleNav('trang-chu')}
              className="flex items-center gap-2 cursor-pointer group w-fit"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[19px] text-[#fec971]">cookie</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg font-bold text-primary group-hover:text-primary-container transition-colors">
                  Nguyệt Phố
                </span>
                <span className="bg-[#ffba00] text-[#410005] font-extrabold text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">
                  B2B
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Sàn thương mại điện tử chuyên biệt kết nối doanh nghiệp thu mua số lượng lớn với các xưởng bánh Trung Thu nghệ nhân &amp; thương hiệu uy tín.
            </p>

            <div className="space-y-1.5 text-xs text-stone-700 pt-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">call</span>
                <span>Hotline: <a href="tel:18006886" className="font-bold text-primary hover:underline">1800 6886</a> (Miễn phí)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-stone-500">mail</span>
                <span>Email: <a href="mailto:b2b@nguyetpho.vn" className="hover:text-primary transition-colors">b2b@nguyetpho.vn</a></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-stone-500">schedule</span>
                <span>Giờ làm việc: 08:00 – 20:00 (Thứ 2 – Thứ 7)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-stone-500">location_on</span>
                <span>Tòa nhà Landmark, Ba Đình, Hà Nội</span>
              </div>
            </div>
          </div>

          {/* CỘT 2: HỖ TRỢ KHÁCH HÀNG */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 border-b border-[#ebdcd5] pb-2">
              Hỗ Trợ Khách Hàng
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('tim-kiem')}
                  className="hover:text-primary transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px] text-stone-400">chevron_right</span>
                  <span>Hướng dẫn đặt hàng B2B</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('tim-kiem')}
                  className="hover:text-primary transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px] text-stone-400">chevron_right</span>
                  <span>Chính sách chiết khấu bậc thang</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('san-pham')}
                  className="hover:text-primary transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px] text-stone-400">chevron_right</span>
                  <span>Đăng ký nhận hộp mẫu thử (Sample Box)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('hop-dong-tien-do')}
                  className="hover:text-primary transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px] text-stone-400">chevron_right</span>
                  <span>Quy trình giao nhận PoD &amp; Nghiệm thu</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('trang-chu')}
                  className="hover:text-primary transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px] text-stone-400">chevron_right</span>
                  <span>Chính sách đổi trả &amp; Bồi hoàn trễ hạn</span>
                </button>
              </li>
            </ul>
          </div>

          {/* CỘT 3: DỊCH VỤ DOANH NGHIỆP & ĐẤU THẦU */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 border-b border-[#ebdcd5] pb-2">
              Dịch Vụ Doanh Nghiệp
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('yeu-cau-bao-gia')}
                  className="hover:text-primary transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px] text-stone-400">chevron_right</span>
                  <span>Tạo yêu cầu báo giá nhanh (RFQ)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('dat-hang-thiet-ke')}
                  className="hover:text-primary transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px] text-stone-400">chevron_right</span>
                  <span>Gia công in ép kim &amp; Khắc laser logo</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('hop-dong-tien-do')}
                  className="hover:text-primary transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px] text-stone-400">chevron_right</span>
                  <span>Hợp đồng điện tử ký số FPT.eContract</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('thanh-toan-hoa-don')}
                  className="hover:text-primary transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px] text-stone-400">chevron_right</span>
                  <span>Hóa đơn điện tử VAT trong ngày</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('nha-cung-cap/thiet-lap-gian-hang')}
                  className="hover:text-amber-800 transition-colors flex items-center gap-1.5 text-left cursor-pointer text-amber-700 font-semibold"
                >
                  <span className="material-symbols-outlined text-[14px] text-amber-600">storefront</span>
                  <span>Dành cho xưởng: Mở gian hàng B2B</span>
                </button>
              </li>
            </ul>
          </div>

          {/* CỘT 4: THANH TOÁN & CHỨNG NHẬN PHÁP LÝ */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 border-b border-[#ebdcd5] pb-2">
              Thanh Toán &amp; Chứng Nhận
            </h4>

            {/* Badges Thanh Toán */}
            <div>
              <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
                Phương thức thanh toán
              </p>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold text-stone-700">
                <span className="px-2 py-1 rounded-md bg-white border border-[#ebdcd5] text-center flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-primary">account_balance</span>
                  <span>Chuyển khoản VAT</span>
                </span>
                <span className="px-2 py-1 rounded-md bg-white border border-[#ebdcd5] text-center flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-red-600">qr_code_2</span>
                  <span>VNPAY-QR</span>
                </span>
                <span className="px-2 py-1 rounded-md bg-white border border-[#ebdcd5] text-center flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-blue-700">credit_card</span>
                  <span>Visa / Master</span>
                </span>
                <span className="px-2 py-1 rounded-md bg-white border border-[#ebdcd5] text-center flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-emerald-700">shield</span>
                  <span>Ký quỹ Escrow</span>
                </span>
              </div>
            </div>

            {/* Chứng Nhận Tin Cậy */}
            <div className="pt-1">
              <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
                Chứng nhận tin cậy
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-900 text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-[14px] text-blue-700">verified</span>
                  <span>Bộ Công Thương</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-[14px] text-emerald-700">health_and_safety</span>
                  <span>ISO 22000 / HACCP</span>
                </div>
              </div>
            </div>

            {/* Escrow mini info */}
            <div className="p-2 rounded-lg bg-white/70 border border-[#ebdcd5] text-[11px] text-stone-600 flex items-start gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-primary shrink-0 mt-0.5">lock</span>
              <span>Giao dịch an toàn 100%: Tiền giải ngân khi đã nghiệm thu đúng phẩm cấp quà.</span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. THANH BẢN QUYỀN & CHÍNH SÁCH DƯỚI CÙNG */}
      <div className="border-t border-[#ebdcd5] bg-[#f5e7df] py-3.5 px-4 sm:px-6 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
          <p>© 2025 Nguyệt Phố B2B. Nền tảng phân phối Quà tặng Trung Thu Doanh Nghiệp uy tín.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              type="button"
              onClick={() => handleNav('trang-chu')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Điều khoản dịch vụ
            </button>
            <span className="text-stone-300">•</span>
            <button
              type="button"
              onClick={() => handleNav('trang-chu')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Chính sách bảo mật
            </button>
            <span className="text-stone-300">•</span>
            <button
              type="button"
              onClick={() => handleNav('trang-chu')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Quy chế sàn TMĐT
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
