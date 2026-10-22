// Lucian UX/UI Prompt #044 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#044
import React, { useState } from 'react';
import './FaqAccordion.css';

const FAQ_ITEMS = [
  {
    q: 'Doanh nghiệp có được xuất hóa đơn VAT đầy đủ và đúng hạn không?',
    a: '100% đơn hàng doanh nghiệp qua Nguyệt Phố đều được xuất hóa đơn điện tử VAT hợp lệ ngay trong ngày hoàn tất nghiệm thu PoD, đi kèm biên bản bàn giao kiểm đếm thực tế và hợp đồng ký số điện tử e-Contract có giá trị pháp lý tuyệt đối.',
    linkText: 'Tìm hiểu quy trình xuất hóa đơn VAT',
    linkAction: 'yeu-cau-bao-gia'
  },
  {
    q: 'Doanh nghiệp có được nhận hộp bánh mẫu thử (Sample Box) trước khi đặt số lượng lớn?',
    a: 'Hoàn toàn được. Nguyệt Phố hỗ trợ gửi 01 hộp mẫu thử nguyên seal đến tận trụ sở doanh nghiệp trong 24–48h để ban giám đốc hoặc hội đồng đánh giá thực tế chất lượng bánh, bao bì và quy cách in ấn trước khi phê duyệt đơn hàng lớn.',
    linkText: 'Đăng ký nhận hộp mẫu thử miễn phí',
    linkAction: 'yeu-cau-bao-gia'
  },
  {
    q: 'Chính sách chiết khấu bậc thang và cơ chế thanh toán ký quỹ SafeTrade Escrow như thế nào?',
    a: 'Khoản thanh toán của doanh nghiệp được bảo vệ an toàn trong tài khoản bảo chứng SafeTrade Escrow và chỉ giải ngân cho xưởng khi quý công ty ký biên bản nghiệm thu đạt chuẩn. Chiết khấu tự động áp dụng bậc thang từ 10% đến 35% theo số lượng hộp.',
    linkText: 'Xem bảng chiết khấu chi tiết',
    linkAction: 'yeu-cau-bao-gia'
  },
  {
    q: 'Cam kết xử lý thế nào nếu bánh bị móp méo hộp hoặc phát sinh chậm trễ tiến độ giao?',
    a: 'Nguyệt Phố vận hành đội xe lạnh chuyên dụng kiểm soát nhiệt độ nghiêm ngặt. Hợp đồng cam kết rõ SLA giao hàng: đổi mới 100% sản phẩm lỗi trong vòng 12 giờ và bồi hoàn chi phí nếu phát sinh chậm trễ ảnh hưởng sự kiện của doanh nghiệp.',
    linkText: 'Chính sách bảo hành & SLA giao hàng',
    linkAction: 'san-pham'
  },
  {
    q: 'Có hỗ trợ in logo ép kim, khắc laser nắp hộp và thiết kế thiệp chúc mừng riêng không?',
    a: 'Có. Tất cả đơn hàng từ 30 hộp trở lên đều được miễn phí gia công in logo doanh nghiệp bằng công nghệ ép kim hoặc khắc laser tinh xảo trên nắp hộp gỗ sơn mài, kèm thiệp thư tri ân in theo nhận diện thương hiệu công ty.',
    linkText: 'Xem các mẫu hộp in logo thực tế',
    linkAction: 'tim-kiem'
  }
];

export default function FaqAccordion({ onNavigate }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleItem = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  const handleKeyDown = (e, idx) => {
    let nextIdx = idx;
    if (e.key === 'ArrowDown') nextIdx = (idx + 1) % FAQ_ITEMS.length;
    else if (e.key === 'ArrowUp') nextIdx = (idx - 1 + FAQ_ITEMS.length) % FAQ_ITEMS.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = FAQ_ITEMS.length - 1;
    else return;

    e.preventDefault();
    const btn = document.getElementById(`u044-q-${nextIdx}`);
    btn?.focus();
  };

  return (
    <div className="ux u044-container">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = openIdx === i;
        const numStr = (i + 1 < 10 ? '0' : '') + (i + 1);

        return (
          <div key={i} className={`u044-it ${isOpen ? 'open' : ''}`}>
            <button
              id={`u044-q-${i}`}
              className="u044-q"
              type="button"
              aria-expanded={isOpen}
              aria-controls={`u044-a-${i}`}
              onClick={() => toggleItem(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            >
              <span className="u044-n">{numStr}</span>
              <span className="u044-t">{item.q}</span>
              <span className="u044-pm" aria-hidden="true" />
            </button>

            <div
              id={`u044-a-${i}`}
              className="u044-body"
              role="region"
              aria-labelledby={`u044-q-${i}`}
            >
              <div>
                <div className="u044-a">
                  <p>{item.a}</p>
                  <button
                    type="button"
                    onClick={() => onNavigate?.(item.linkAction)}
                    className="u044-link"
                    tabIndex={isOpen ? 0 : -1}
                  >
                    <span>{item.linkText}</span>
                    <i aria-hidden="true">→</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
