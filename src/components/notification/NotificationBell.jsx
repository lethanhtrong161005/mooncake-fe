import React, { useState } from 'react';
import { Badge, Popover } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationDropdown from './NotificationDropdown';

export default function NotificationBell({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const {
    notifications,
    unreadCount,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    markAsRead,
    markAllAsRead,
    refresh,
  } = useNotifications();

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) refresh?.();
      }}
      trigger="click"
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
      overlayInnerStyle={{
        padding: 0,
        borderRadius: 16,
        overflow: 'hidden',
        width: 390,
        maxWidth: '92vw',
        boxShadow: '0 12px 36px -6px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)',
      }}
      content={
        <NotificationDropdown
          onClose={() => setOpen(false)}
          notifications={notifications}
          unreadCount={unreadCount}
          isLoading={isLoading}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onNavigate={onNavigate}
        />
      }
    >
      <button
        type="button"
        aria-label="Thông báo hệ thống"
        className="relative p-2 rounded-full hover:bg-stone-100 transition-colors flex items-center justify-center cursor-pointer border-none bg-transparent focus:outline-none"
      >
        <Badge
          count={unreadCount}
          overflowCount={99}
          offset={[2, -2]}
          styles={{
            indicator: {
              backgroundColor: '#d97706',
              boxShadow: '0 0 8px rgba(217, 119, 6, 0.5)',
              fontWeight: 700,
            },
          }}
        >
          <BellOutlined className="text-xl text-stone-700 hover:text-amber-600 transition-colors" />
        </Badge>
      </button>
    </Popover>
  );
}
