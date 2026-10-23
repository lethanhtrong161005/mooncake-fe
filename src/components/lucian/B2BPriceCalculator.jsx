// Lucian UX/UI Prompt #278 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#278
import React, { useEffect, useRef, useState } from 'react';
import './B2BPriceCalculator.css';

const TIERS = [
  { name: 'Đơn Khởi Điểm', discount: 10, min: 20, unitPrice: 450000, label: 'Bậc 20 - 49 hộp' },
  { name: 'Doanh Nghiệp Vừa', discount: 20, min: 50, unitPrice: 400000, label: 'Bậc 50 - 199 hộp' },
  { name: 'Tập Đoàn VIP', discount: 35, min: 200, unitPrice: 325000, label: 'Bậc 200+ hộp' }
];

const FEATURES = [
  'Hóa đơn VAT hợp lệ & Hợp đồng e-Contract',
  'Miễn phí khắc laser / ép kim logo lên nắp hộp',
  'Giao xe lạnh chuyên dụng PoD đa điểm chi nhánh'
];

export default function B2BPriceCalculator({ onNavigate }) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const thumbRef = useRef(null);
  const bubbleRef = useRef(null);
  const planTagRef = useRef(null);
  const [boxes, setBoxes] = useState(80);
  const [isEarlyBird, setIsEarlyBird] = useState(false);
  const [activePlanIdx, setActivePlanIdx] = useState(1);
  const [displayTotal, setDisplayTotal] = useState('');
  const [displaySaved, setDisplaySaved] = useState('');

  const MIN = 20;
  const MAX = 400;

  // Calculate pricing
  const currentTier = boxes >= 200 ? 2 : boxes >= 50 ? 1 : 0;
  const basePricePerBox = TIERS[currentTier].unitPrice;
  const earlyBirdExtra = isEarlyBird ? 0.05 : 0; // extra 5% off
  const effectiveDiscount = TIERS[currentTier].discount + (isEarlyBird ? 5 : 0);
  const effectiveUnitPrice = Math.round(500000 * (1 - effectiveDiscount / 100));
  const totalPrice = effectiveUnitPrice * boxes;
  const savedAmount = (500000 - effectiveUnitPrice) * boxes;

  useEffect(() => {
    setActivePlanIdx(currentTier);
    setDisplayTotal(totalPrice.toLocaleString('vi-VN') + ' ₫');
    setDisplaySaved(savedAmount.toLocaleString('vi-VN') + ' ₫');

    const pct = ((boxes - MIN) / (MAX - MIN)) * 100;
    if (fillRef.current) fillRef.current.style.width = `${pct}%`;
    if (thumbRef.current) thumbRef.current.style.left = `${pct}%`;
    if (bubbleRef.current) {
      bubbleRef.current.style.left = `${pct}%`;
      bubbleRef.current.textContent = `${boxes} hộp`;
    }
  }, [boxes, isEarlyBird, currentTier, totalPrice, savedAmount]);

  const updateFromPointer = (clientX) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clampedX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const val = MIN + (clampedX / rect.width) * (MAX - MIN);
    // snap to step of 5
    const rounded = Math.round(val / 5) * 5;
    setBoxes(Math.max(MIN, Math.min(MAX, rounded)));
  };

  const handlePointerDown = (e) => {
    trackRef.current?.classList.add('is-drag');
    try {
      trackRef.current?.setPointerCapture(e.pointerId);
    } catch {}
    updateFromPointer(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (trackRef.current?.classList.contains('is-drag')) {
      updateFromPointer(e.clientX);
    }
  };

  const handlePointerUp = () => {
    trackRef.current?.classList.remove('is-drag');
  };

  const handleKeyDown = (e) => {
    const delta =
      e.key === 'ArrowRight' || e.key === 'ArrowUp'
        ? 5
        : e.key === 'ArrowLeft' || e.key === 'ArrowDown'
        ? -5
        : e.key === 'PageUp'
        ? 20
        : e.key === 'PageDown'
        ? -20
        : null;
    if (delta !== null) {
      e.preventDefault();
      setBoxes((prev) => Math.max(MIN, Math.min(MAX, prev + delta)));
    }
  };

  return (
    <div
      ref={rootRef}
      className={`ux u278-card ${isEarlyBird ? 'is-yr' : ''}`}
    >
      {/* Header */}
      <div className="u278-hd">
        <div>
          <b>Bảng Ước Tính Chiết Khấu Doanh Nghiệp</b>
          <span className="u278-subtitle">Kéo thanh trượt để xem chiết khấu theo số lượng hộp</span>
        </div>
        <div className="u278-sg" role="radiogroup" aria-label="Loại đơn hàng">
          <button
            type="button"
            className="u278-bl"
            role="radio"
            aria-checked={!isEarlyBird}
            onClick={() => setIsEarlyBird(false)}
          >
            Tiêu Chuẩn
          </button>
          <button
            type="button"
            className="u278-bl"
            role="radio"
            aria-checked={isEarlyBird}
            onClick={() => setIsEarlyBird(true)}
          >
            Hợp Đồng Sớm
          </button>
        </div>
      </div>

      {isEarlyBird && (
        <span className="u278-fr animate-pulse">Giảm thêm 5% cho đơn ký sớm</span>
      )}

      {/* Slider Section */}
      <div className="u278-sl">
        <div className="flex justify-between items-center mb-1">
          <small>Số lượng hộp dự kiến: <strong className="text-primary font-bold text-sm">{boxes} hộp</strong></small>
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
            Chiết khấu: -{effectiveDiscount}%
          </span>
        </div>
        <div
          ref={trackRef}
          className="u278-tr"
          role="slider"
          tabIndex={0}
          aria-label="Số lượng hộp bánh Trung Thu"
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={boxes}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
        >
          <span className="u278-rl" />
          <span ref={fillRef} className="u278-fl" />
          {/* Tick marks at 50 and 200 */}
          <span
            className="u278-tc"
            style={{ left: `${((50 - MIN) / (MAX - MIN)) * 100}%` }}
            title="Mốc 50 hộp: -20%"
          />
          <span
            className="u278-tc"
            style={{ left: `${((200 - MIN) / (MAX - MIN)) * 100}%` }}
            title="Mốc 200 hộp: -35%"
          />
          <span ref={thumbRef} className="u278-th" />
          <span ref={bubbleRef} className="u278-bb" />
        </div>
      </div>

      {/* Result Card */}
      <div className="u278-cd">
        <div className="u278-pn">
          <span ref={planTagRef} className="u278-pl">
            <span>{TIERS[currentTier].name}</span>
          </span>
          <span className="u278-pp">
            ~{effectiveUnitPrice.toLocaleString('vi-VN')} ₫ / hộp
          </span>
          <span className="u278-sv">
            Tiết kiệm {displaySaved}
          </span>
        </div>

        <div className="u278-tt">
          <span className="u278-num">{displayTotal}</span>
          <em>(tổng ước tính)</em>
        </div>

        {/* Feature checks */}
        <ul className="u278-fs">
          {FEATURES.map((feat, i) => {
            const isOn = i <= currentTier;
            return (
              <li key={i} className={isOn ? 'is-on' : ''}>
                <i aria-hidden="true" />
                <span>{feat}</span>
              </li>
            );
          })}
        </ul>

        {/* Action Button inside calculator */}
        <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between gap-3">
          <div className="text-[11px] text-stone-500 leading-tight">
            Cam kết giá xưởng tốt nhất • Xuất VAT 100%
          </div>
          <button
            type="button"
            onClick={() => onNavigate?.('yeu-cau-bao-gia')}
            className="px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-container transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Nhận Báo Giá Số Lượng Này</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
