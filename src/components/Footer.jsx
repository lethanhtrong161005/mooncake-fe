import React from 'react';

export default function Footer({ onNavigate }) {
  const handleNav = (path) => {
    onNavigate?.(path);
  };

  return (
    <footer className="w-full bg-surface-container-low border-t border-secondary/20 pt-space-xl pb-space-lg text-on-surface">
      <div className="max-w-7xl mx-auto px-margin">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter pb-space-xl border-b border-outline-variant/30">
          <div className="space-y-space-sm md:col-span-1">
            <div className="flex items-center gap-space-sm cursor-pointer" onClick={() => handleNav('trang-chu')}>
              <img
                alt="Nguyệt Phố Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJveLEK_wGE2KRnLsCiAvUmuX7W6vXgqjm6RLxajD-2yTZlgRorM4Lv1TABx4HseDrFH-6QwbM7hencCJeSoKo_EIiNVKF6-UO3FQReiq2Jmr8Xp7UVtBsFcCbljpDAbOkSRIgAXQSkgyk2amHhVEIEbKkDjZ8xzeOdrCYzIoKvdCbrdTSQTdPzeOSGjeeJOF8pS8A4Vo7fsESC4tydQAkyexGdYame7qDCvLzP2RgqdfNsKvps8jbqA"
              />
              <span className="font-headline-sm text-headline-sm text-primary">Nguyệt Phố</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Sàn thương mại điện tử B2B & B2C bánh Trung Thu nghệ nhân cao cấp, bảo chứng nguồn gốc và kết nối xưởng bánh di sản toàn quốc.
            </p>
            <div className="pt-2 flex flex-col gap-1">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                Hotline B2B Doanh Nghiệp
              </span>
              <a href="tel:18006886" className="font-title-md text-title-md text-primary font-bold hover:underline">
                1800 6886 (Nhánh 2)
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">Cam Kết & Tiêu Chuẩn</h4>
            <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                Chứng nhận ISO 22000:2018
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                Đạt chuẩn HACCP Quốc tế
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                100% Nguyên liệu kiểm định
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                Bảo chứng nghệ nhân truyền thống
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">Quy Trình & Hỗ Trợ B2B</h4>
            <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('dang-ky-mau-thu')}
                  className="hover:text-primary transition-colors text-left"
                >
                  Đăng Ký Nhận Hộp Mẫu Thử
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('danh-gia-va-phe-duyet-mau-thu')}
                  className="hover:text-primary transition-colors text-left"
                >
                  Đánh Giá & Phê Duyệt Mẫu Thử
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('so-sanh-thau-rfq')}
                  className="hover:text-primary transition-colors text-left"
                >
                  Quản Lý & So Sánh Báo Giá RFQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('hop-dong-dien-tu')}
                  className="hover:text-primary transition-colors text-left"
                >
                  Hợp Đồng Điện Tử & Ký Quỹ
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">Bảo Vệ Người Mua (Escrow)</h4>
            <div className="p-3 bg-surface rounded-lg border border-secondary/20 space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
                <span className="font-label-md text-label-md font-bold">Nguyệt Phố SafeTrade</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Thanh toán chỉ giải ngân cho xưởng khi bộ phận thu mua nghiệm thu chất lượng và bao bì đúng quy cách hợp đồng. Đền bù 200% nếu sai lệch.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-space-md flex flex-col md:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
          <p>© 2024 Nguyệt Phố Marketplace. Bản quyền thuộc Công ty Cổ phần Tinh Hoa Bánh Việt.</p>
          <div className="flex items-center gap-space-md font-label-sm text-label-sm">
            <span className="hover:text-primary cursor-pointer transition-colors">Điều khoản mua sắm B2B</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Quy chế bảo vệ giao dịch</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Chính sách mẫu thử</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
