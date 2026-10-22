// Lucian UX/UI Prompt #252 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#252
import React, { useEffect, useRef, useState } from 'react';
import './AnnouncementPill.css';

const NEWS_ITEMS = [
  'Mở cổng phân phối vụ mùa 2025 · Chiết khấu tới 35%',
  'Miễn phí in logo & thiệp thương hiệu từ 30 hộp',
  'Hỗ trợ gửi 01 hộp mẫu thử nguyên seal tận nơi 24h',
  'Ký quỹ SafeTrade · 100% xuất hóa đơn VAT điện tử'
];

const LOG_ITEMS = [
  { time: 'Mới nhất', title: 'Chính sách chiết khấu 2025', desc: 'Áp dụng bậc thang 10% - 35% cho đơn từ 20 đến 500+ hộp' },
  { time: 'Ưu đãi', title: 'Gia công thương hiệu riêng', desc: 'Ép kim hoặc khắc laser logo doanh nghiệp trên nắp hộp gỗ sơn mài' },
  { time: 'Cam kết', title: 'Bảo hành & Xe lạnh PoD', desc: 'Giao hàng xe lạnh chuyên dụng, đổi mới 100% trong 12h nếu phát sinh lỗi' }
];

export default function AnnouncementPill({ onNavigate }) {
  const rootRef = useRef(null);
  const rsRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let k = 0;
    let t = null;
    let tReset = null;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function tick() {
      if (!root || !rsRef.current) return;
      t = setTimeout(tick, 4200);
      if (isOpen || isReducedMotion) return;

      root.classList.remove('is-shine');
      void root.offsetWidth;
      root.classList.add('is-shine');

      k += 1;
      setIndex(k % NEWS_ITEMS.length);
      if (rsRef.current) {
        rsRef.current.style.transition = 'transform .5s cubic-bezier(.3,1.2,.5,1)';
        rsRef.current.style.transform = `translateY(${-18 * k}px)`;
      }

      if (k === NEWS_ITEMS.length) {
        tReset = setTimeout(() => {
          if (rsRef.current) {
            rsRef.current.style.transition = 'none';
            k = 0;
            setIndex(0);
            rsRef.current.style.transform = 'translateY(0)';
          }
        }, 560);
      }
    }

    t = setTimeout(tick, 2000);

    return () => {
      if (t) clearTimeout(t);
      if (tReset) clearTimeout(tReset);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div ref={rootRef} className={`ux u252-pill-container ${isOpen ? 'is-open' : ''}`}>
      <div className="u252-wr">
        <button
          type="button"
          className="u252-pl"
          aria-expanded={isOpen}
          onClick={toggleOpen}
          aria-label={`${NEWS_ITEMS[index]} · nhấn để xem chi tiết`}
        >
          <span className="u252-tg">2025 B2B</span>
          <span className="u252-rl">
            <span ref={rsRef} className="u252-rs">
              {NEWS_ITEMS.concat(NEWS_ITEMS[0]).map((news, i) => (
                <span key={i}>{news}</span>
              ))}
            </span>
          </span>
          <svg className="u252-ar" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M3 7h8M7.5 3.5 11 7l-3.5 3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="u252-pn">
          <h4>
            <span>Chính Sách &amp; Cập Nhật Mùa Vụ</span>
            <button
              type="button"
              onClick={() => onNavigate?.('yeu-cau-bao-gia')}
              className="u252-pn-link"
            >
              Nhận Báo Giá →
            </button>
          </h4>
          {LOG_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="u252-it"
              style={{ transitionDelay: `${0.08 + idx * 0.07}s` }}
            >
              <time>{item.time}</time>
              <div>
                <b>{item.title}</b>
                <span>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
