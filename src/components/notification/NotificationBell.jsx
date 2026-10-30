import { useState } from 'react';
import { Badge, Button, Tooltip } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationDrawer from './NotificationDrawer';

export default function NotificationBell({ onNavigate }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
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
    <>
      <Tooltip title="Trung tâm thông báo Hoàng Gia">
        <Button
          type="text"
          shape="circle"
          size="large"
          aria-label="Thông báo hệ thống"
          onClick={() => {
            setDrawerOpen(true);
            refresh();
          }}
          className="relative hover:bg-amber-500/10 transition-colors flex items-center justify-center"
        >
          <Badge
            count={unreadCount}
            overflowCount={99}
            offset={[2, -2]}
            styles={{
              indicator: {
                backgroundColor: '#d97706',
                boxShadow: '0 0 8px rgba(217, 119, 6, 0.6)',
                fontWeight: 700,
              },
            }}
          >
            <BellOutlined className="text-xl text-amber-500 hover:text-amber-400 transition-colors" />
          </Badge>
        </Button>
      </Tooltip>

      <NotificationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        notifications={notifications}
        unreadCount={unreadCount}
        isLoading={isLoading}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onNavigate={onNavigate}
      />
    </>
  );
}

