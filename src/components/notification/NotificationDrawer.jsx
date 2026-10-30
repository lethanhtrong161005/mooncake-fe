import { useState, useEffect } from 'react';
import { Drawer, Tag, Button, Empty, Spin } from 'antd';
import {
  CheckOutlined,
  DollarOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  ThunderboltOutlined,
  InfoCircleOutlined,
  RightOutlined,
} from '@ant-design/icons';

const CATEGORIES = [
  { key: 'all', label: 'Tất cả' },
  { key: 'payment', label: 'Thanh toán' },
  { key: 'contract', label: 'Hợp đồng' },
  { key: 'order', label: 'Đơn hàng' },
  { key: 'rfq', label: 'Báo giá' },
];

export default function NotificationDrawer({
  open,
  onClose,
  notifications,
  unreadCount,
  isLoading,
  selectedCategory,
  onSelectCategory,
  onMarkAsRead,
  onMarkAllAsRead,
  onNavigate,
}) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'payment':
        return <DollarOutlined className="text-emerald-500" />;
      case 'contract':
        return <FileTextOutlined className="text-amber-500" />;
      case 'order':
        return <ShoppingCartOutlined className="text-blue-500" />;
      case 'rfq':
        return <ThunderboltOutlined className="text-purple-500" />;
      default:
        return <InfoCircleOutlined className="text-amber-400" />;
    }
  };

  const formatTime = (isoString) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' +
        date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-bold text-base">🔔 Thông Báo Hoàng Gia</span>
            {unreadCount > 0 && (
              <Tag color="gold" className="rounded-full px-2 text-xs font-semibold">
                {unreadCount} mới
              </Tag>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              type="link"
              size="small"
              icon={<CheckOutlined />}
              onClick={onMarkAllAsRead}
              className="text-amber-600 hover:text-amber-500 p-0 text-xs font-medium"
            >
              Đọc tất cả
            </Button>
          )}
        </div>
      }
      placement={isMobile ? 'bottom' : 'right'}
      height={isMobile ? '88vh' : undefined}
      width={isMobile ? '100%' : 420}
      open={open}
      onClose={onClose}
      styles={{
        wrapper: isMobile ? { borderRadius: '24px 24px 0 0', overflow: 'hidden' } : {},
        body: { padding: '12px 16px', backgroundColor: '#1C1917', color: '#F3F4F6' },
        header: { backgroundColor: '#1C1917', borderBottom: '1px solid rgba(217, 119, 6, 0.2)' },
      }}
    >
      {/* Category Chips Bar */}
      <div className="flex items-center gap-1.5 pb-3 mb-3 border-b border-amber-500/20 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.key}
            size="small"
            type={selectedCategory === cat.key ? 'primary' : 'default'}
            onClick={() => onSelectCategory(cat.key)}
            className={`rounded-full text-xs font-medium px-3 transition-all ${
              selectedCategory === cat.key
                ? 'bg-amber-600 hover:bg-amber-500 border-amber-500 text-white shadow-sm'
                : 'bg-stone-800 border-stone-700 text-stone-300 hover:text-amber-400 hover:border-amber-500/50'
            }`}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <Spin tip="Đang tải thông báo..." />
        </div>
      ) : notifications.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span className="text-stone-400 text-sm">Chưa có thông báo nào trong danh mục này</span>}
          className="py-12"
        />
      ) : (
        <div className="space-y-2.5">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              role="article"
              onClick={() => {
                if (!notif.isRead) onMarkAsRead(notif.id);
                if (notif.actionUrl) {
                  onClose();
                  const target = notif.actionUrl.replace(/^#\/?/, '');
                  onNavigate?.(target);
                }
              }}
              className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                notif.isRead
                  ? 'bg-stone-800/40 border-stone-800 hover:bg-stone-800/70 text-stone-300'
                  : 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/15 text-stone-100 shadow-sm'
              }`}
            >
              {!notif.isRead && (
                <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-amber-500/30" />
              )}

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-700/80 flex items-center justify-center shrink-0 text-base mt-0.5">
                  {getCategoryIcon(notif.category)}
                </div>

                <div className="flex-1 min-w-0 pr-3">
                  <div className="font-semibold text-sm leading-snug line-clamp-1">
                    {notif.title}
                  </div>
                  <div className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                    {notif.content}
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-700/30 text-[11px] text-stone-400">
                    <span>{formatTime(notif.createdAt)}</span>
                    <span className="text-amber-500 hover:text-amber-400 flex items-center gap-0.5 font-medium">
                      Xem chi tiết <RightOutlined className="text-[9px]" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
}

