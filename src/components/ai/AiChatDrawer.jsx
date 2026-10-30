import { useState, useEffect, useRef } from 'react';
import { Drawer, Input, Button, Spin, Tag, Space } from 'antd';
import {
  SendOutlined,
  ThunderboltFilled,
  ClearOutlined,
  CloseOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import AiProductCard from './AiProductCard';
import aiService from '../../services/aiService';

const createId = (prefix) => `${prefix}-${Date.now()}`;
const getIsoNow = () => new Date().toISOString();

const DEFAULT_FOLLOW_UPS = [
  'Tư vấn set quà đối tác VIP ngân sách 500k',
  'Ý nghĩa set 4 bánh Tứ Quý & Loại trà phối kèm',
  'Bánh Trung Thu thực dưỡng ít đường cho người ăn kiêng',
  'Tạo yêu cầu báo giá RFQ cho 200 hộp',
];

export default function AiChatDrawer({ open, onClose, onNavigate }) {
  const [sessionToken, setSessionToken] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [followUps, setFollowUps] = useState(DEFAULT_FOLLOW_UPS);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    let active = true;
    const storedToken = localStorage.getItem('mooncake_ai_session_token');

    aiService
      .startSession({ existingSessionToken: storedToken })
      .then((session) => {
        if (!active) return;
        setSessionToken(session.sessionToken);
        localStorage.setItem('mooncake_ai_session_token', session.sessionToken);

        return aiService.getChatHistory(session.sessionToken);
      })
      .then((history) => {
        if (!active || !history?.messages?.length) {
          if (active) {
            setMessages([
              {
                messageId: 'welcome-001',
                role: 'Assistant',
                content:
                  'Kính chào quý khách! Tôi là Trợ Lý AI của Nguyệt Phố B2B. Tôi có thể hỗ trợ quý khách tư vấn các set quà tặng doanh nghiệp theo ngân sách, số lượng, hoặc chia sẻ cẩm nang văn hóa Tết Trung thu và nghệ thuật thưởng trà thượng hạng ạ.',
                createdAt: getIsoNow(),
              },
            ]);
          }
          return;
        }
        setMessages(history.messages);
      })
      .catch(() => {
        if (active) {
          setMessages([
            {
              messageId: 'welcome-default',
              role: 'Assistant',
              content:
                'Kính chào quý khách! Tôi là Trợ Lý AI của Nguyệt Phố B2B. Tôi có thể hỗ trợ tư vấn set quà bánh Trung thu theo ngân sách và thông điệp tri ấn của doanh nghiệp ạ.',
              createdAt: getIsoNow(),
            },
          ]);
        }
      });

    return () => {
      active = false;
    };
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || loading) return;

    setInputText('');
    const userMsg = {
      messageId: createId('user'),
      role: 'User',
      content: text,
      createdAt: getIsoNow(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const token = sessionToken || createId('aic');
      const res = await aiService.sendMessage({
        sessionToken: token,
        content: text,
      });

      const assistantMsg = {
        messageId: res.messageId || createId('ai'),
        role: 'Assistant',
        content: res.content,
        recommendedProducts: res.recommendedProducts || [],
        createdAt: res.createdAt || getIsoNow(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (res.suggestedFollowUps?.length) {
        setFollowUps(res.suggestedFollowUps);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          messageId: createId('err'),
          role: 'Assistant',
          content:
            'Dạ hệ thống AI đang cập nhật dữ liệu. Quý khách vui lòng thử lại hoặc để lại yêu cầu báo giá RFQ để các xưởng bánh nghệ nhân phản hồi trực tiếp nhé ạ.',
          createdAt: getIsoNow(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    localStorage.removeItem('mooncake_ai_session_token');
    setSessionToken(null);
    setMessages([
      {
        messageId: 'welcome-reset',
        role: 'Assistant',
        content:
          'Phiên hội thoại đã được làm mới. Quý khách cần hỗ trợ thêm thông tin gì về set quà Trung thu doanh nghiệp không ạ?',
        createdAt: getIsoNow(),
      },
    ]);
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      closable={false}
      width={460}
      className="luxury-ai-drawer"
      styles={{
        header: { display: 'none' },
        body: { padding: 0, display: 'flex', flexDirection: 'column', height: '100%', background: '#fafaf9' },
      }}
    >
      {/* Header bar */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-4 border-b border-amber-800/40 shadow-sm shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 text-lg shadow-inner">
              🌙
            </div>
            <div>
              <div className="font-bold text-sm text-amber-100 flex items-center gap-1.5">
                Nguyệt Phố AI Concierge
                <Tag color="gold" className="text-[10px] px-1 py-0 border-amber-400 font-semibold m-0 bg-amber-900/60 text-amber-200">
                  Gemini Flash
                </Tag>
              </div>
              <div className="text-[11px] text-amber-200/70">
                Trợ lý Quà tặng & Tri thức Mùa Trăng B2B
              </div>
            </div>
          </div>

          <Space size={4}>
            <Button
              type="text"
              size="small"
              icon={<ClearOutlined />}
              onClick={handleClearHistory}
              className="text-stone-300 hover:text-white hover:bg-white/10"
              title="Làm mới cuộc trò chuyện"
            />
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={onClose}
              className="text-stone-300 hover:text-white hover:bg-white/10"
              title="Đóng cửa sổ"
            />
          </Space>
        </div>
      </div>

      {/* Message stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.messageId}
            className={`flex flex-col ${msg.role === 'User' ? 'items-end' : 'items-start'}`}
          >
            {msg.role === 'Assistant' && (
              <div className="text-[11px] text-stone-600 mb-1 flex items-center gap-1 font-semibold">
                <ThunderboltFilled className="text-amber-800 text-[10px]" />
                Nguyệt Phố AI
              </div>
            )}

            <div
              className={`max-w-[88%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'User'
                  ? 'bg-amber-800 text-white rounded-tr-xs shadow-xs'
                  : 'bg-white text-stone-800 border border-stone-200/80 rounded-tl-xs shadow-xs'
              }`}
            >
              <div className="whitespace-pre-line">{msg.content}</div>

              {/* Product recommendation cards inside AI reply */}
              {msg.recommendedProducts?.map((prod) => (
                <AiProductCard
                  key={prod.productId}
                  product={prod}
                  onNavigate={(path) => {
                    onClose?.();
                    onNavigate?.(path);
                  }}
                />
              ))}
            </div>

            <div className="text-[10px] text-stone-600 mt-1 px-1">
              {new Date(msg.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-stone-600 text-xs py-2 px-1">
            <Spin size="small" />
            <span>Nguyệt Phố AI đang suy nghĩ và tra cứu danh mục bánh...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick suggestions chips */}
      <div className="px-4 py-2 bg-stone-100/90 border-t border-stone-200/70 overflow-x-auto whitespace-nowrap scrollbar-none shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold text-stone-700 mr-1 flex items-center gap-1">
            <CustomerServiceOutlined /> Gợi ý:
          </span>
          {followUps.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(item)}
              className="text-xs px-2.5 py-1 bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-900 border border-stone-200 hover:border-amber-300 rounded-full transition-all duration-150 shrink-0 cursor-pointer shadow-2xs font-medium"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div className="p-3 bg-white border-t border-stone-200 shrink-0">
        <div className="flex items-center gap-2">
          <Input.TextArea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Hỏi về set bánh, ngân sách, số lượng hộp hoặc cẩm nang văn hóa..."
            autoSize={{ minRows: 1, maxRows: 3 }}
            className="rounded-xl border-stone-300 focus:border-amber-700 text-sm py-2"
          />

          <Button
            type="primary"
            icon={<SendOutlined />}
            loading={loading}
            onClick={() => handleSendMessage()}
            className="bg-amber-800 hover:bg-amber-700 border-amber-800 h-9 px-4 rounded-xl font-semibold shrink-0"
          >
            Gửi
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
