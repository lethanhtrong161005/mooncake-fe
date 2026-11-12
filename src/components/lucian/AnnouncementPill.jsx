import { useEffect, useRef, useState } from 'react';
import { Tag } from 'antd';
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  CrownOutlined,
  DownOutlined,
  PercentageOutlined,
  SafetyCertificateOutlined,
  ThunderboltFilled,
} from '@ant-design/icons';

const ANNOUNCEMENTS = [
  'Mở cổng phân phối vụ mùa 2025 • Chiết khấu tới 35%',
  'Miễn phí in logo & thiệp thương hiệu từ 30 hộp',
  'Hỗ trợ gửi 01 hộp mẫu thử nguyên seal tận nơi 24h',
  'Ký quỹ SafeTrade • 100% xuất hóa đơn VAT điện tử'
];

const POLICIES = [
  {
    tag: 'Mới nhất',
    tagColor: 'red',
    title: 'Chiết khấu bậc thang 10% – 35%',
    desc: 'Áp dụng cho đơn từ 20 đến 500+ hộp. Hỗ trợ hợp đồng nguyên tắc bảo lưu giá tốt.',
    icon: <PercentageOutlined style={{ fontSize: 15 }} />,
    iconClass: 'bg-red-50 text-[#8c1524] border border-red-200/80',
  },
  {
    tag: 'Ưu đãi',
    tagColor: 'gold',
    tagIcon: <ThunderboltFilled style={{ marginRight: 3, fontSize: 10 }} />,
    title: 'Gia công thương hiệu riêng',
    desc: 'Ép kim hoặc khắc laser logo doanh nghiệp trên nắp hộp gỗ sơn mài từ 30 hộp.',
    icon: <CrownOutlined style={{ fontSize: 15 }} />,
    iconClass: 'bg-amber-50 text-[#d48806] border border-amber-200/80',
  },
  {
    tag: 'Cam kết',
    tagColor: 'cyan',
    title: 'Bảo hành & Xe lạnh PoD',
    desc: 'Giao hàng xe lạnh chuyên dụng, đổi mới 100% trong 12h nếu phát sinh lỗi, xuất VAT.',
    icon: <SafetyCertificateOutlined style={{ fontSize: 15 }} />,
    iconClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
  },
];

export default function AnnouncementPill({ onNavigate, align = 'center' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  // Smooth rotation between announcements
  useEffect(() => {
    if (isOpen || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isOpen, isPaused]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const alignClass =
    align === 'left'
      ? 'mx-auto lg:mx-0 items-center lg:items-start'
      : 'mx-auto items-center';

  return (
    <div
      ref={containerRef}
      className={`relative z-30 w-full max-w-[480px] mb-5 flex flex-col ${alignClass}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Collapsed Luxury Pill Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={`${ANNOUNCEMENTS[currentIndex]} - Nhấn để xem chính sách`}
        className="w-full group inline-flex items-center justify-between gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-amber-500/40 bg-stone-950/80 hover:bg-stone-900/95 backdrop-blur-md shadow-lg shadow-black/30 hover:border-amber-400/70 hover:shadow-amber-950/20 transition-all duration-300 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Season Badge */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold bg-gradient-to-r from-[#8c1524] to-[#a81c2d] text-white border border-red-500/30 shadow-sm shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Vụ mùa 2025
          </span>

          {/* Rotating Announcement Text */}
          <span className="text-xs sm:text-sm font-medium text-stone-200 group-hover:text-white transition-colors duration-200 truncate">
            {ANNOUNCEMENTS[currentIndex]}
          </span>
        </div>

        {/* Action Toggle Indicator */}
        <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-amber-400 font-semibold pl-1 shrink-0 group-hover:text-amber-300 transition-colors">
          <span>{isOpen ? 'Thu gọn' : 'Chính sách'}</span>
          <DownOutlined
            className={`text-[10px] text-amber-400 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </span>
      </button>

      {/* 2. Fold-out Policy Card (Smooth accordion dropdown matching repo UI) */}
      <div
        className={`w-full transition-all duration-300 ease-out overflow-hidden text-left ${
          isOpen
            ? 'max-h-[500px] opacity-100 translate-y-0 mt-2.5'
            : 'max-h-0 opacity-0 -translate-y-2 mt-0 pointer-events-none'
        }`}
      >
        <div className="rounded-2xl bg-white border border-[#8c1524]/15 shadow-xl shadow-black/30 p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <SafetyCertificateOutlined className="text-[#8c1524] text-base" />
              <h4 className="font-['Playfair_Display','Be_Vietnam_Pro',sans-serif] text-sm sm:text-base font-bold text-stone-900 m-0">
                Chính Sách &amp; Ưu Đãi Mùa Vụ
              </h4>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onNavigate?.('yeu-cau-bao-gia');
              }}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#8c1524] hover:text-[#a81c2d] hover:underline cursor-pointer bg-transparent border-none p-0 transition-colors"
            >
              <span>Nhận Báo Giá</span>
              <ArrowRightOutlined className="text-[10px]" />
            </button>
          </div>

          {/* 3 Policy Rows */}
          <div className="py-2 divide-y divide-stone-100">
            {POLICIES.map((policy, idx) => (
              <div key={idx} className="py-2.5 first:pt-2 last:pb-1 flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${policy.iconClass}`}
                >
                  {policy.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Tag
                      color={policy.tagColor}
                      className="m-0 text-[10px] font-bold px-1.5 py-0 rounded"
                    >
                      {policy.tagIcon}
                      {policy.tag}
                    </Tag>
                    <span className="text-xs font-bold text-stone-900 truncate">
                      {policy.title}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-stone-600 m-0 leading-relaxed">
                    {policy.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Assurances */}
          <div className="mt-2.5 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <CheckCircleFilled className="text-emerald-600 text-xs" />
              Ký quỹ SafeTrade Escrow
            </span>
            <span className="text-stone-300">•</span>
            <span>Hộp mẫu thử 24h</span>
            <span className="text-stone-300">•</span>
            <span>100% Hóa đơn VAT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
