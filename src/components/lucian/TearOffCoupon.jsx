// Lucian UX/UI Prompt #298 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#298
import React, { useEffect, useRef, useState } from 'react';
import './TearOffCoupon.css';

export default function TearOffCoupon() {
  const rootRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(5 * 3600 + 18 * 60 + 45);
  const [isTorn, setIsTorn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const COUPON_CODE = 'B2BMOON2025';

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const pad = (n) => (n < 10 ? '0' : '') + n;
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  const handleGetStub = () => {
    setIsTorn(true);
  };

  const handleCopy = () => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(COUPON_CODE).catch(() => {});
      }
    } catch {}
    setCopied(true);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div
      ref={rootRef}
      className={`ux u298-card ${isTorn ? 'is-got' : ''}`}
    >
      {/* Expiry countdown */}
      <div className="u298-tm">
        Ưu đãi mùa vụ kết thúc sau: <b className="u298-cl">{formatTime(timeLeft)}</b>
      </div>

      {/* Ticket Container */}
      <div className="u298-tk">
        {/* Ticket Main Left */}
        <div className="u298-mn">
          <small>ĐẶC QUYỀN DOANH NGHIỆP 2025</small>
          <b>
            15%<em>GIẢM</em>
          </b>
          <p>Áp dụng đơn từ 50 hộp • Giảm tối đa 5.000.000 ₫</p>

          {/* Revealed Code Area */}
          <div className="u298-cd" aria-hidden={!isTorn}>
            <small>Mã ưu đãi độc quyền:</small>
            <div className="u298-cr">
              <code>{COUPON_CODE}</code>
              <button
                type="button"
                className="u298-cp"
                onClick={handleCopy}
                aria-label="Sao chép mã ưu đãi"
              >
                {copied ? (
                  <>
                    <svg viewBox="0 0 12 12" aria-hidden="true">
                      <path
                        d="M2.5 6.5l2.3 2.3L9.5 3.8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Đã chép</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 12 12" aria-hidden="true">
                      <rect
                        x="3.5"
                        y="3.5"
                        width="6.5"
                        height="6.5"
                        rx="1.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M2 8V2.8C2 2.4 2.4 2 2.8 2H8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Perforated Tear Stub */}
        <div className="u298-st">
          <button
            type="button"
            className="u298-gt"
            onClick={handleGetStub}
            disabled={isTorn}
            aria-label="Nhận phiếu giảm giá"
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M10 3v10M5.5 9l4.5 4.5L14.5 9M4 16.5h12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Nhận Mã</span>
          </button>
        </div>
      </div>

      {/* Notice Toast */}
      <div className={`u298-nt ${showToast ? 'is-on' : ''}`} role="status">
        <i aria-hidden="true" />
        <span>Đã sao chép mã {COUPON_CODE} · Tự động áp dụng khi gửi RFQ</span>
      </div>
    </div>
  );
}
