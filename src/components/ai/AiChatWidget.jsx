import { useState } from 'react';
import { MessageOutlined } from '@ant-design/icons';
import AiChatDrawer from './AiChatDrawer';
import './ai-chat-widget.css';

export default function AiChatWidget({ onNavigate }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="ai-chat-launcher"
        onClick={() => setDrawerOpen(true)}
        aria-label="Mở trợ lý AI Nguyệt Phố"
        aria-expanded={drawerOpen}
      >
        <span className="ai-chat-launcher__icon"><MessageOutlined /></span>
        <span className="ai-chat-launcher__copy">
          <strong>Trợ lý Nguyệt Phố</strong>
          <small>Hỏi về bánh và quà tặng</small>
        </span>
      </button>

      <AiChatDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
}
