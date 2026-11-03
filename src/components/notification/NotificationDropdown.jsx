import React, { useState } from 'react';
import { Empty, Spin } from 'antd';
import {
  BellOutlined,
  DollarOutlined,
  FileTextOutlined,
  RightOutlined,
  ShoppingCartOutlined,
  SlidersOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons';

const ACTIVITY_FILTERS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'order', label: 'Đơn hàng' },
  { key: 'contract', label: 'Hợp đồng' },
  { key: 'rfq', label: 'Báo giá' },
  { key: 'payment', label: 'Thanh toán' },
];

const NEWS_FILTERS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'system', label: 'Hệ thống' },
];

export default function NotificationDropdown({
  onClose,
  notifications = [],
  unreadCount = 0,
  isLoading = false,
  selectedCategory = 'all',
  onSelectCategory,
  onMarkAsRead,
  onMarkAllAsRead,
  onNavigate,
}) {
  const [activeMainTab, setActiveMainTab] = useState('activity'); // 'activity' | 'news'

  // Relative time formatter: "Vừa xong", "15 phút trước", "Hôm qua", v.v.
  const formatRelativeTime = (isoString) => {
    if (!isoString) return '';
    try {
      const now = new Date();
      const date = new Date(isoString);
      const diffMs = now - date;
      if (Number.isNaN(diffMs) || diffMs < 0) return 'Vừa xong';
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHours = Math.floor(diffMin / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffSec < 60) return 'Vừa xong';
      if (diffMin < 60) return `${diffMin} phút trước`;
      if (diffHours < 24) return `${diffHours} giờ trước`;
      if (diffDays === 1) return 'Hôm qua';
      if (diffDays < 7) return `${diffDays} ngày trước`;
      return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
    } catch {
      return '';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'account':
      case 'user':
        return <UserOutlined className="text-white text-base" />;
      case 'payment':
        return <DollarOutlined className="text-white text-base" />;
      case 'contract':
        return <FileTextOutlined className="text-white text-base" />;
      case 'order':
      case 'delivery':
        return <ShoppingCartOutlined className="text-white text-base" />;
      case 'rfq':
      case 'bid':
        return <ThunderboltOutlined className="text-white text-base" />;
      default:
        return <BellOutlined className="text-white text-base" />;
    }
  };

  const getIconBackground = (category) => {
    switch (category?.toLowerCase()) {
      case 'account':
      case 'user':
        return 'bg-blue-500';
      case 'payment':
        return 'bg-emerald-600';
      case 'contract':
        return 'bg-amber-600';
      case 'order':
      case 'delivery':
        return 'bg-indigo-600';
      case 'rfq':
      case 'bid':
        return 'bg-purple-600';
      default:
        return 'bg-[#8c1524]';
    }
  };

  // Purely use real API notifications
  const rawList = Array.isArray(notifications) ? notifications : [];

  // Filter items by main tab and filter pill
  const filteredItems = rawList.filter((item) => {
    const cat = (item.category || '').toLowerCase();
    if (activeMainTab === 'news') {
      const isNews = cat === 'news' || cat === 'system';
      if (!isNews) return false;
      if (selectedCategory !== 'all') return cat.includes(selectedCategory.toLowerCase());
      return true;
    }
    // Activity tab
    const isActivity = cat !== 'news' && cat !== 'system';
    if (!isActivity) return false;
    if (selectedCategory !== 'all') return cat.includes(selectedCategory.toLowerCase());
    return true;
  });

  const filterOptions = activeMainTab === 'activity' ? ACTIVITY_FILTERS : NEWS_FILTERS;

  const handleItemClick = (item) => {
    if (!item.isRead) {
      onMarkAsRead?.(item.id);
    }
    onClose?.();
    if (item.actionUrl) {
      const target = item.actionUrl.replace(/^\/?#?\/?/, '');
      onNavigate?.(target);
    } else {
      // Fallback navigation based on category
      const cat = (item.category || '').toLowerCase();
      if (cat.includes('order')) onNavigate?.('dat-hang-thiet-ke');
      else if (cat.includes('contract')) onNavigate?.('hop-dong-tien-do');
      else if (cat.includes('pay')) onNavigate?.('thanh-toan-danh-gia');
      else if (cat.includes('rfq')) onNavigate?.('so-sanh-bao-gia');
      else onNavigate?.('thong-bao');
    }
  };

  return (
    <div className="flex flex-col bg-white text-stone-900 select-none">
      {/* 1. Header: Title & Mark All Read */}
      <div className="px-4 pt-3.5 pb-2.5 flex items-center justify-between">
        <h3 className="text-base font-bold text-stone-900 m-0 tracking-tight">
          Thông Báo
        </h3>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="text-xs font-medium text-amber-700 hover:text-amber-800 transition-colors bg-transparent border-0 cursor-pointer p-0"
          >
            Đánh dấu đã đọc
          </button>
        )}
      </div>

      {/* 2. Main Tabs: Hoạt Động | Tin Tức */}
      <div className="flex items-center border-b border-stone-200 px-4">
        <button
          type="button"
          onClick={() => {
            setActiveMainTab('activity');
            onSelectCategory?.('all');
          }}
          className={`flex-1 py-2 text-sm font-bold text-center transition-all relative cursor-pointer bg-transparent border-0 ${
            activeMainTab === 'activity' ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          <span>Hoạt Động</span>
          {activeMainTab === 'activity' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-stone-900 rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveMainTab('news');
            onSelectCategory?.('all');
          }}
          className={`flex-1 py-2 text-sm font-bold text-center transition-all relative cursor-pointer bg-transparent border-0 ${
            activeMainTab === 'news' ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          <span>Tin Tức</span>
          {activeMainTab === 'news' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-stone-900 rounded-full" />
          )}
        </button>
      </div>

      {/* 3. Filter Row: Sliders icon + Lọc | [Chips] */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-stone-50/60 border-b border-stone-100 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 text-xs font-bold text-stone-800 shrink-0">
          <SlidersOutlined className="text-xs" />
          <span>Lọc</span>
        </div>
        <span className="text-stone-300 text-xs">|</span>
        <div className="flex items-center gap-1.5 shrink-0">
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => onSelectCategory?.(opt.key)}
              className={`text-xs font-medium px-3 py-1 rounded-full transition-all shrink-0 cursor-pointer border ${
                selectedCategory === opt.key
                  ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Notification Item List (Direct from API) */}
      <div className="max-h-[380px] overflow-y-auto divide-y divide-stone-100">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Spin tip="Đang tải thông báo từ máy chủ..." />
          </div>
        ) : filteredItems.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span className="text-stone-400 text-xs font-medium">Không có thông báo nào</span>}
            className="py-12"
          />
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`px-4 py-3 cursor-pointer transition-colors flex items-start gap-3 relative ${
                item.isRead
                  ? 'bg-white hover:bg-stone-50/80'
                  : 'bg-[#fffdf0] hover:bg-[#fff9e6]'
              }`}
            >
              {/* Avatar circular icon */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-xs mt-0.5 ${getIconBackground(
                  item.category
                )}`}
              >
                {getCategoryIcon(item.category)}
              </div>

              {/* Text Information */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-baseline justify-between gap-2 mb-0.5">
                  <h4
                    className={`text-xs sm:text-[13px] font-bold leading-snug truncate m-0 ${
                      item.isRead ? 'text-stone-800' : 'text-stone-950'
                    }`}
                  >
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-stone-400 shrink-0 font-normal">
                    {formatRelativeTime(item.createdAt)}
                  </span>
                </div>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed m-0">
                  {item.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 5. Footer: View All Link */}
      <div className="px-4 py-2.5 bg-stone-50/80 border-t border-stone-100 flex items-center justify-center">
        <button
          type="button"
          onClick={() => {
            onClose?.();
            onNavigate?.('thong-bao');
          }}
          className="text-xs font-semibold text-stone-700 hover:text-[#8c1524] transition-colors bg-transparent border-0 cursor-pointer flex items-center gap-1"
        >
          <span>Xem tất cả thông báo</span>
          <RightOutlined className="text-[9px]" />
        </button>
      </div>
    </div>
  );
}
