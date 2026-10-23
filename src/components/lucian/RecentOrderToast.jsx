// Lucian UX/UI Prompt #253 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#253
import React, { useEffect, useRef, useState } from 'react';
import './RecentOrderToast.css';

const ACTIVITIES = [
  {
    company: 'FPT Software',
    action: 'vừa chốt 350 Hộp Nguyệt Viên Tri Kỷ',
    time: '2 phút trước',
    badge: 'Đơn Sẵn Kho',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    icon: 'order_approve',
    color: '#059669'
  },
  {
    company: 'Techcombank Chi nhánh Thăng Long',
    action: 'vừa mở thầu RFQ 500 hộp sơn mài',
    time: '4 phút trước',
    badge: 'Đấu Thầu RFQ',
    badgeColor: 'bg-amber-100 text-amber-900',
    icon: 'gavel',
    color: '#d97706'
  },
  {
    company: 'Vingroup Retail',
    action: 'đã hoàn tất nghiệm thu PoD xe lạnh',
    time: '6 phút trước',
    badge: 'Đã Nghiệm Thu',
    badgeColor: 'bg-blue-100 text-blue-900',
    icon: 'local_shipping',
    color: '#2563eb'
  },
  {
    company: 'Vinamilk Corporation',
    action: 'vừa ký kết hợp đồng e-Contract 400 hộp',
    time: '9 phút trước',
    badge: 'Ký Số B2B',
    badgeColor: 'bg-purple-100 text-purple-900',
    icon: 'draw',
    color: '#7a0010'
  }
];

export default function RecentOrderToast() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showUndo, setShowUndo] = useState(false);
  const [progress, setProgress] = useState(1);

  const SHOW_DURATION = 4500;
  const GAP_DURATION = 1500;

  useEffect(() => {
    if (isDismissed) return;

    let startTime = Date.now();
    let state = 'show'; // 'show' or 'wait'
    let animId = null;

    const tick = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      if (!isPaused) {
        if (state === 'show') {
          const remaining = Math.max(0, 1 - elapsed / SHOW_DURATION);
          setProgress(remaining);

          if (elapsed >= SHOW_DURATION) {
            state = 'wait';
            setIsVisible(false);
            startTime = Date.now();
          }
        } else if (state === 'wait') {
          if (elapsed >= GAP_DURATION) {
            state = 'show';
            setIndex((prev) => (prev + 1) % ACTIVITIES.length);
            setIsVisible(true);
            setProgress(1);
            startTime = Date.now();
          }
        }
      } else {
        // adjust start time while paused so elapsed remains constant
        startTime = now - (1 - progress) * SHOW_DURATION;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isPaused, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    setShowUndo(true);
  };

  const handleUndo = () => {
    setShowUndo(false);
    setIsDismissed(false);
    setIsVisible(true);
    setProgress(1);
  };

  const current = ACTIVITIES[index];

  return (
    <aside className="ux u253-fixed-wrapper">
      {/* Toast Notification */}
      <div
        className={`u253-tt ${isVisible && !isDismissed ? 'is-on' : ''}`}
        role="status"
        onPointerEnter={() => setIsPaused(true)}
        onPointerLeave={() => setIsPaused(false)}
      >
        <span
          className="u253-th"
          style={{
            background: `linear-gradient(150deg, ${current.color}, #1f1b18)`
          }}
        >
          <span className="material-symbols-outlined text-[20px] text-white">
            {current.icon}
          </span>
        </span>

        <div className="u253-tx">
          <div>
            <b>{current.company}</b> {current.action}
          </div>
          <small>
            <span>{current.time}</span>
            <span className="mx-1">•</span>
            <span className={`px-1 py-0.2 rounded text-[9px] font-bold ${current.badgeColor}`}>
              {current.badge}
            </span>
          </small>
        </div>

        <button
          type="button"
          className="u253-x"
          aria-label="Đóng thông báo"
          onClick={handleDismiss}
        >
          <svg viewBox="0 0 10 10" aria-hidden="true">
            <path
              d="M2 2l6 6M8 2L2 8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Progress bar timer */}
        <i
          className="u253-tm"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      </div>

      {/* Undo confirmation pill */}
      <div className={`u253-ok ${showUndo ? 'is-on' : ''}`} role="status">
        <span>Đã tắt thông báo B2B</span>
        <button type="button" className="u253-un" onClick={handleUndo}>
          Hoàn tác
        </button>
      </div>
    </aside>
  );
}
