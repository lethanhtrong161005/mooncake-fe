import { useChat } from '../../hooks/useChat';
import ChatWindow from './ChatWindow';
import { MessageFilled } from '@ant-design/icons';
import './chat-dock.css';

export default function ChatDock({ onNavigate }) {
  const {
    activeDockThread,
    isDockMinimized,
    closeDock,
    toggleMinimizeDock,
  } = useChat();

  if (!activeDockThread) {
    return null;
  }

  // Minimized pill state
  if (isDockMinimized) {
    return (
      <div className="chat-dock-minimized">
        <div className="chat-dock-pill">
          <button type="button" onClick={toggleMinimizeDock}
            className="chat-dock-pill__open"
            aria-label={`Mở lại cuộc trò chuyện với ${activeDockThread.partner?.displayName}`}>
          {activeDockThread.partner?.avatarUrl ? (
            <img
              src={activeDockThread.partner.avatarUrl}
              alt=""
              className="chat-dock-pill__avatar"
            />
          ) : (
            <span className="chat-dock-pill__icon">
              <MessageFilled />
            </span>
          )}
          <span className="chat-dock-pill__name truncate">
            {activeDockThread.partner?.displayName}
          </span>
          </button>
          <button
            type="button"
            onClick={closeDock}
            className="chat-dock-pill__close"
            aria-label="Đóng cuộc trò chuyện"
          >
            ×
          </button>
        </div>
      </div>
    );
  }

  // Active floating window
  return (
    <div className="chat-dock-container" role="dialog" aria-label="Cửa sổ trò chuyện">
      <div className="chat-dock-card">
        <ChatWindow thread={activeDockThread} isCompact={true}
          onClose={closeDock} onMinimize={toggleMinimizeDock} onNavigate={onNavigate} />
      </div>
    </div>
  );
}

