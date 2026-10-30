import { useState } from 'react';
import { Badge, Tooltip } from 'antd';
import AiChatDrawer from './AiChatDrawer';

export default function AiChatWidget({ onNavigate }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-22 z-50">
        <Tooltip title="Trợ lý AI Tư vấn Quà tặng & Văn hóa Trung Thu (Gemini Flash)" placement="left">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-amber-800 via-amber-700 to-stone-900 text-white rounded-full shadow-lg shadow-amber-950/30 border border-amber-400/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Mở Trợ lý AI Nguyệt Phố"
          >
            {/* Glowing ring animation */}
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 opacity-40 blur-xs group-hover:opacity-75 transition duration-300 animate-pulse" />

            <span className="relative text-xl">🌙</span>

            <span className="relative font-bold text-xs tracking-wide text-amber-100 hidden sm:inline">
              Trợ Lý AI
            </span>

            <Badge
              status="processing"
              color="#fbbf24"
              className="relative hidden sm:inline-block"
            />
          </button>
        </Tooltip>
      </div>

      <AiChatDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
}
