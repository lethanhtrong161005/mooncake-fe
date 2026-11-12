import { useState, useEffect } from 'react';
import { Input, Badge, Button, Spin, Empty } from 'antd';
import { SearchOutlined, MessageOutlined } from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import CustomerFooter from '../../components/layout/CustomerFooter';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../hooks/useAuth';
import ChatWindow from '../../components/chat/ChatWindow';
import './chat-page.css';

function formatThreadTime(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  const now = new Date();
  const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) {
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  if (diffDays < 7) {
    return `${diffDays} ngày`;
  }
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

export default function ChatPage({ onNavigate }) {
  const { user } = useAuth();
  const supplierView = user?.role === 'Supplier';
  const workspaceView = supplierView || user?.role === 'Admin';
  const {
    threads,
    threadsLoading,
    threadsHasMore,
    loadThreads,
    presenceMap,
    joinThread,
    leaveThread,
  } = useChat();

  const [selectedThread, setSelectedThread] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial load
  useEffect(() => {
    loadThreads({ reset: true });
  }, [loadThreads]);

  // Handle thread selection
  const handleSelectThread = (thread) => {
    if (selectedThread?.id) {
      leaveThread(selectedThread.id);
    }
    setSelectedThread(thread);
    if (thread?.id) {
      joinThread(thread.id);
    }
  };

  const filteredThreads = threads.filter((t) => {
    if (!searchQuery.trim()) return true;
    const name = t.partner?.displayName?.toLowerCase() || '';
    const preview = t.lastMessagePreview?.toLowerCase() || '';
    const q = searchQuery.toLowerCase();
    return name.includes(q) || preview.includes(q);
  });

  const conversation = (
    <main className={`chat-page-wrapper${workspaceView ? ' chat-page-wrapper--workspace' : ''}`}>
      <div className={`chat-page-container${selectedThread ? ' is-thread-open' : ''}`}>
        {/* Left Column: Thread List Sidebar */}
        <div className="chat-sidebar">
          {/* Header & Search */}
          <div className="chat-sidebar__header">
            <h1 className="chat-sidebar__title">Hộp thư tin nhắn</h1>
            <Input
              prefix={<SearchOutlined className="text-stone-400" />}
              placeholder="Tìm kiếm cuộc trò chuyện..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="chat-sidebar__search"
              allowClear
            />
          </div>

          {/* Threads List Feed */}
          <div className="chat-sidebar__list">
            {threadsLoading && threads.length === 0 ? (
              <div className="flex justify-center items-center py-20">
                <Spin />
              </div>
            ) : filteredThreads.length === 0 ? (
              <div className="py-16 text-center text-stone-400">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    searchQuery
                      ? 'Không tìm thấy cuộc trò chuyện phù hợp.'
                      : 'Chưa có cuộc trò chuyện nào.'
                  }
                />
              </div>
            ) : (
              filteredThreads.map((t) => {
                const partnerPresence = presenceMap[t.partner?.userId] || t.partner?.presence;
                const isSelected = selectedThread?.id === t.id;

                return (
                  <Button
                    key={t.id}
                    onClick={() => handleSelectThread(t)}
                    type="text"
                    aria-label={`Mở cuộc trò chuyện với ${t.partner?.displayName || 'khách hàng'}`}
                    aria-pressed={isSelected}
                    className={`chat-thread-item ${
                      isSelected ? 'chat-thread-item--active' : ''
                    }`}
                  >
                    {/* Avatar with live badge */}
                    <div className="relative flex-shrink-0">
                      {t.partner?.avatarUrl ? (
                        <img
                          src={t.partner.avatarUrl}
                          alt={t.partner.displayName}
                          className="chat-thread-item__avatar"
                        />
                      ) : (
                        <div className="chat-thread-item__avatar-fallback">
                          {t.partner?.displayName?.charAt(0) || 'G'}
                        </div>
                      )}
                      {partnerPresence?.isOnline && (
                        <span
                          className="chat-thread-item__online-dot"
                          title="Đang hoạt động"
                        />
                      )}
                    </div>

                    {/* Thread Info */}
                    <div className="chat-thread-item__content">
                      <div className="chat-thread-item__top-row">
                        <span className="chat-thread-item__name">
                          {t.partner?.displayName}
                        </span>
                        <span className="chat-thread-item__time">
                          {formatThreadTime(t.lastActivityAt)}
                        </span>
                      </div>

                      <div className="chat-thread-item__bottom-row">
                        <span
                          className={`chat-thread-item__preview ${
                            t.unreadCount > 0
                              ? 'chat-thread-item__preview--unread'
                              : ''
                          }`}
                        >
                          {t.lastMessagePreview || 'Bắt đầu cuộc trò chuyện'}
                        </span>
                        {t.unreadCount > 0 && (
                          <Badge
                            count={t.unreadCount}
                            className="chat-thread-item__badge"
                          />
                        )}
                      </div>
                    </div>
                  </Button>
                );
              })
            )}
            {threadsHasMore && (
              <Button className="chat-sidebar__more" loading={threadsLoading}
                onClick={() => loadThreads()}>
                Tải thêm cuộc trò chuyện
              </Button>
            )}
          </div>
        </div>

        {/* Right Column: Chat Window or Empty placeholder */}
        <div className="chat-main-area">
          {selectedThread ? (
            <ChatWindow
              thread={selectedThread}
              onBack={() => handleSelectThread(null)}
              isCompact={false}
              onNavigate={onNavigate}
            />
          ) : (
            <div className="chat-empty-state">
              <div className="chat-empty-state__icon">
                <MessageOutlined />
              </div>
              <h2 className="chat-empty-state__title">
                Chọn một cuộc trò chuyện
              </h2>
              <p className="chat-empty-state__subtitle">
                {supplierView
                  ? 'Trao đổi với khách hàng về sản phẩm, báo giá và đơn hàng ngay tại đây.'
                  : 'Trao đổi trực tiếp với nhà cung cấp về sản phẩm, báo giá và đơn hàng.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );

  if (workspaceView) {
    return (
      <ColonyAdminLayout role={supplierView ? 'Supplier' : 'Admin'}
        activeKey={supplierView ? 'nha-cung-cap/tin-nhan' : 'admin/dashboard'}
        onNavigate={onNavigate}
        title={supplierView ? 'Tin nhắn khách hàng' : 'Tin nhắn'}
        subtitle="Theo dõi và trả lời các cuộc trò chuyện trong cùng một hộp thư.">
        {conversation}
      </ColonyAdminLayout>
    );
  }

  return (
    <div className="chat-page-shell">
      <CustomerHeader onNavigate={onNavigate} />
      {conversation}
      <CustomerFooter onNavigate={onNavigate} />
    </div>
  );
}

