// Lucian UX/UI Prompt #243 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#243
import React, { useState } from 'react';
import './TrustSecurityBadges.css';

const BADGES = [
  {
    code: 'ISO 22000',
    title: 'An toàn thực phẩm',
    scope: 'Chứng nhận VSATTP quốc tế',
    validity: '100% Xưởng đối tác đạt chuẩn · Hiệu lực 2027',
    color: '#059669'
  },
  {
    code: 'SafeTrade',
    title: 'Ký quỹ bảo chứng',
    scope: 'Bảo chứng ký quỹ ngân hàng',
    validity: 'Giải ngân sau khi công ty ký PoD nghiệm thu',
    color: '#7a0010'
  },
  {
    code: 'Hợp Đồng Số',
    title: 'Ký số & Hóa đơn VAT',
    scope: 'Hợp đồng điện tử e-Contract',
    validity: 'Giá trị pháp lý tuyệt đối · Xuất VAT trong ngày',
    color: '#d97706'
  },
  {
    code: 'Xe Lạnh PoD',
    title: 'Giao vận nhiệt độ chuẩn',
    scope: 'Kiểm soát nhiệt độ 20–25°C',
    validity: 'Đổi mới 100% trong 12h nếu bánh móp méo',
    color: '#2563eb'
  }
];

const SHIELD_SVG = (
  <svg viewBox="0 0 42 46" aria-hidden="true">
    <path
      d="M21 3l15 5.5v11.5c0 11-6.6 18.8-15 22.5C12.6 38.8 6 31 6 20V8.5z"
      fill="color-mix(in srgb, currentColor 14%, transparent)"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 22.5l4.5 4.5 9-9.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function TrustSecurityBadges() {
  const [flipped, setFlipped] = useState({});
  const [verifying, setVerifying] = useState({});
  const [verified, setVerified] = useState({});

  const toggleFlip = (index) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleVerify = (e, index) => {
    e.stopPropagation();
    if (verifying[index] || verified[index]) return;

    setVerifying((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setVerifying((prev) => ({ ...prev, [index]: false }));
      setVerified((prev) => ({ ...prev, [index]: true }));
    }, 850);
  };

  return (
    <div className="ux u243-card">
      <div className="u243-hd">
        <b>Cam Kết Pháp Lý &amp; Chất Lượng Doanh Nghiệp</b>
        <small>Chạm vào từng chứng chỉ để xem phạm vi bảo chứng và xác thực trực tiếp</small>
      </div>

      <div className="u243-gd">
        {BADGES.map((b, i) => {
          const isFlip = !!flipped[i];
          const isBusy = !!verifying[i];
          const isOk = !!verified[i];

          return (
            <div
              key={i}
              className={`u243-bg ${isFlip ? 'is-flip' : ''}`}
              style={{
                '--c': b.color,
                '--d': `${i * 1.1}s`
              }}
              tabIndex={0}
              role="button"
              aria-pressed={isFlip}
              aria-label={`${b.code} — chi tiết chứng nhận`}
              onClick={() => toggleFlip(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleFlip(i);
                }
              }}
            >
              {/* Mặt trước */}
              <div className="u243-f">
                <span className="u243-sd">{SHIELD_SVG}</span>
                <b>{b.code}</b>
                <small>{b.title}</small>
              </div>

              {/* Mặt sau */}
              <div className="u243-b">
                <b>{b.code}</b>
                <span>{b.scope}</span>
                <small>{b.validity}</small>
                <button
                  type="button"
                  className={`u243-vf ${isBusy ? 'is-busy' : ''} ${isOk ? 'is-ok' : ''}`}
                  tabIndex={isFlip ? 0 : -1}
                  onClick={(e) => handleVerify(e, i)}
                >
                  <i aria-hidden="true" />
                  <em>{isBusy ? 'Đang kiểm tra…' : isOk ? 'Hợp lệ · Đã xác thực' : 'Xác thực ngay'}</em>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
