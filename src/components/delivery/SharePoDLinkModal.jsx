import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  Input,
  Modal,
  Popconfirm,
  Space,
  Spin,
  Tag,
  Typography,
  message,
} from 'antd';
import {
  CheckOutlined,
  ClockCircleOutlined,
  CopyOutlined,
  ExportOutlined,
  LinkOutlined,
  ReloadOutlined,
  SendOutlined,
  StopOutlined,
} from '@ant-design/icons';
import deliveryService from '../../services/deliveryService';
import './delivery-share.css';

const { Text } = Typography;

const TTL_OPTIONS = [
  { value: 6, label: '6 giờ' },
  { value: 12, label: '12 giờ' },
  { value: 24, label: '24 giờ' },
  { value: 48, label: '48 giờ' },
  { value: 72, label: '72 giờ' },
];

const formatDateTime = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const formatRemainingTime = (expiresAtUtc, nowMs) => {
  if (!expiresAtUtc) return '—';
  const diffMs = new Date(expiresAtUtc).getTime() - nowMs;
  if (Number.isNaN(diffMs) || diffMs <= 0) return 'Đã hết hạn';
  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `Còn ${days} ngày ${hours} giờ`;
  if (hours > 0) return `Còn ${hours} giờ ${minutes} phút`;
  return `Còn ${Math.max(minutes, 1)} phút`;
};

const copyTextToClipboard = async (value) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

export default function SharePoDLinkModal({ open, onClose, delivery }) {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [revoking, setRevoking] = useState(false);
  const [shareInfo, setShareInfo] = useState(null);
  const [ttlHours, setTtlHours] = useState(24);
  const [copiedKey, setCopiedKey] = useState(null);
  const [nowMs, setNowMs] = useState(() => Date.now());

  const deliveryId = delivery?.id || delivery?.key;
  const isFinalized =
    delivery?.status === 'Delivered' || delivery?.status === 'Returned';

  const loadShareStatus = async (signal = { ignored: false }) => {
    if (!deliveryId) return;
    setLoading(true);
    try {
      const data = await deliveryService.getShareLink(deliveryId);
      if (!signal.ignored) {
        setShareInfo(data);
        setNowMs(Date.now());
        setCopiedKey(null);
      }
    } catch (err) {
      if (!signal.ignored) {
        message.error(
          err.response?.data?.message || err.message || 'Không thể tải trạng thái liên kết chia sẻ.'
        );
        setShareInfo(null);
      }
    } finally {
      if (!signal.ignored) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!open || !deliveryId) return undefined;
    const signal = { ignored: false };
    Promise.resolve().then(() => {
      if (!signal.ignored) loadShareStatus(signal);
    });
    return () => {
      signal.ignored = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, deliveryId]);

  useEffect(() => {
    if (!open) return undefined;
    const timer = window.setInterval(() => setNowMs(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, [open]);

  const shareUrl = useMemo(() => {
    if (!shareInfo?.token) return '';
    return `${window.location.origin}/giao-hang-tai-xe?token=${encodeURIComponent(
      shareInfo.token
    )}`;
  }, [shareInfo?.token]);

  const handleCreateOrReshare = async (reshare) => {
    if (!deliveryId) return;
    try {
      setSubmitting(true);
      const data = await deliveryService.createShareLink(deliveryId, {
        expiresInHours: ttlHours,
        reshare,
      });
      setShareInfo(data);
      setNowMs(Date.now());
      setCopiedKey(null);
      message.success(
        reshare
          ? 'Đã tạo liên kết mới (Reshare). Liên kết cũ đã bị vô hiệu hóa.'
          : 'Đã tạo liên kết PoD công khai cho tài xế.'
      );
    } catch (err) {
      message.error(
        err.response?.data?.message || 'Không thể tạo liên kết chia sẻ PoD.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleRevoke = async () => {
    if (!deliveryId) return;
    try {
      setRevoking(true);
      await deliveryService.revokeShareLink(deliveryId);
      message.success('Đã thu hồi liên kết giao nhận.');
      await loadShareStatus();
    } catch (err) {
      message.error(
        err.response?.data?.message || 'Không thể thu hồi liên kết.'
      );
    } finally {
      setRevoking(false);
    }
  };

  const handleCopy = async (key, text, successLabel) => {
    if (!text) return;
    try {
      await copyTextToClipboard(text);
      setCopiedKey(key);
      message.success(successLabel);
      window.setTimeout(() => {
        setCopiedKey((prev) => (prev === key ? null : prev));
      }, 2500);
    } catch {
      message.error('Không thể sao chép vào bộ nhớ tạm.');
    }
  };

  const handleCopyDriverMessage = () => {
    if (!shareUrl) return;
    const tripCode = shareInfo?.shareCode || delivery?.shareCode;
    const lines = [
      `Chuyến giao: ${delivery?.deliveryNumber || 'N/A'}${tripCode ? ` (Mã chuyến: ${tripCode})` : ''}`,
      `Người nhận: ${delivery?.recipientName || 'Thủ kho'} (${delivery?.recipientPhone || 'N/A'})`,
      `Địa chỉ giao: ${delivery?.toAddress || 'Xem chi tiết trong link'}`,
      `Hạn hoàn tất PoD: ${formatDateTime(shareInfo?.expiresAtUtc)}`,
      tripCode ? `Mã chuyến: ${tripCode}` : '',
      `Link chụp ảnh & ký nhận PoD (không cần đăng nhập): ${shareUrl}`,
    ].filter(Boolean);
    handleCopy('message', lines.join('\n'), 'Đã sao chép tin nhắn mẫu kèm link gửi tài xế.');
  };

  const remainingText = formatRemainingTime(shareInfo?.expiresAtUtc, nowMs);
  const isLiveActive =
    Boolean(shareInfo?.isActive && shareInfo?.token) &&
    remainingText !== 'Đã hết hạn';

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={560}
      centered
      title={
        <div className="flex items-center gap-2 text-[#231a18]">
          <LinkOutlined className="text-[#7d1322]" />
          <span>Chia sẻ liên kết PoD cho tài xế</span>
        </div>
      }
    >
      <div className="share-pod-modal__body">
        {delivery && (
          <div className="share-pod-card">
            <div className="share-pod-card__header">
              <span className="share-pod-card__code">
                {delivery.deliveryNumber || 'Chuyến giao'}
              </span>
              {isLiveActive ? (
                <Tag color="green">Đang hoạt động</Tag>
              ) : shareInfo?.isRevoked ? (
                <Tag color="red">Đã thu hồi</Tag>
              ) : shareInfo?.isExpired ? (
                <Tag color="orange">Đã hết hạn</Tag>
              ) : (
                <Tag>Chưa cấp link</Tag>
              )}
            </div>
            {(shareInfo?.shareCode || delivery.shareCode) && (
              <div className="rounded-lg border border-[#d48806]/40 bg-[#fffdf9] p-2 text-center my-2">
                <span className="text-[11px] uppercase tracking-wider text-[#9a6b16] font-semibold block">
                  Mã chuyến giao hàng (Trip Code)
                </span>
                <span className="text-xl font-bold font-mono tracking-widest text-[#8c1524] select-all">
                  {shareInfo?.shareCode || delivery.shareCode}
                </span>
              </div>
            )}
            <div className="share-pod-card__meta">
              <div>
                <span className="font-medium text-[#231a18]">Người nhận:</span>{' '}
                {delivery.recipientName || 'Thủ kho'}
                {delivery.recipientPhone ? ` (${delivery.recipientPhone})` : ''}
              </div>
              <div>
                <span className="font-medium text-[#231a18]">Ngày dự kiến:</span>{' '}
                {delivery.scheduledDate || 'Đang cập nhật'}
              </div>
              <div className="share-pod-card__meta-full truncate">
                <span className="font-medium text-[#231a18]">Điểm giao:</span>{' '}
                {delivery.toAddress || 'Chưa cập nhật'}
              </div>
            </div>
          </div>
        )}

        {isFinalized && (
          <Alert
            type="info"
            showIcon
            message="Chuyến giao này đã hoàn tất hoặc chuyển hoàn, không thể cấp liên kết nộp PoD mới."
          />
        )}

        {!isFinalized && (
          <div>
            <Text className="share-ttl-label">
              Thời hạn hiệu lực của liên kết
            </Text>
            <div className="share-ttl-group">
              {TTL_OPTIONS.map((option) => {
                const selected = ttlHours === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTtlHours(option.value)}
                    className={`share-ttl-pill${selected ? ' share-ttl-pill--active' : ''}`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-8">
            <Spin />
          </div>
        ) : isLiveActive ? (
          <div className="share-active-box">
            <div className="share-active-box__meta">
              <span className="share-active-box__remaining">
                <ClockCircleOutlined />
                <span>{remainingText}</span>
              </span>
              <span className="share-active-box__expiry">
                Hết hạn lúc: {formatDateTime(shareInfo.expiresAtUtc)}
              </span>
            </div>

            <Space.Compact className="w-full">
              <Input
                readOnly
                value={shareUrl}
                aria-label="Liên kết công khai cho tài xế PoD"
                className="font-mono text-xs"
              />
              <Button
                type="primary"
                icon={copiedKey === 'url' ? <CheckOutlined /> : <CopyOutlined />}
                onClick={() =>
                  handleCopy('url', shareUrl, 'Đã sao chép liên kết PoD công khai.')
                }
              >
                {copiedKey === 'url' ? 'Đã chép' : 'Sao chép link'}
              </Button>
            </Space.Compact>

            <div className="share-active-box__actions">
              <Space wrap size="small">
                <Button
                  size="small"
                  icon={<SendOutlined />}
                  onClick={handleCopyDriverMessage}
                >
                  {copiedKey === 'message' ? 'Đã chép tin nhắn' : 'Sao chép tin nhắn Zalo/SMS'}
                </Button>
                <Button
                  size="small"
                  icon={<ExportOutlined />}
                  href={shareUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Mở thử
                </Button>
              </Space>

              <Space wrap size="small">
                {!isFinalized && (
                  <Button
                    size="small"
                    icon={<ReloadOutlined />}
                    loading={submitting}
                    onClick={() => handleCreateOrReshare(true)}
                  >
                    Tạo lại link (Reshare)
                  </Button>
                )}

                <Popconfirm
                  title="Thu hồi liên kết này?"
                  description="Tài xế sẽ không thể truy cập link cũ nữa."
                  okText="Thu hồi"
                  cancelText="Hủy"
                  onConfirm={handleRevoke}
                >
                  <Button
                    size="small"
                    danger
                    icon={<StopOutlined />}
                    loading={revoking}
                  >
                    Thu hồi
                  </Button>
                </Popconfirm>
              </Space>
            </div>

            <p className="share-active-box__hint">
              Khi bấm Tạo lại link (Reshare), hệ thống cấp mã truy cập mới với thời hạn đã chọn và khóa ngay liên kết cũ.
            </p>
          </div>
        ) : (
          !isFinalized && (
            <div className="share-empty-box">
              {shareInfo?.isExpired && (
                <Text className="block text-xs text-[#9a6b16]">
                  Liên kết trước đã hết hạn lúc {formatDateTime(shareInfo.expiresAtUtc)}.
                </Text>
              )}
              {shareInfo?.isRevoked && (
                <Text className="block text-xs text-[#7d1322]">
                  Liên kết trước đã bị thu hồi lúc {formatDateTime(shareInfo.revokedAtUtc)}.
                </Text>
              )}
              <Text className="block text-xs text-[#6c625e]">
                Tạo liên kết công khai để gửi thẳng cho tài xế giao hàng. Tài xế mở link trên điện thoại để xem thông tin người nhận, chụp ảnh và lấy chữ ký PoD mà không cần tài khoản đăng nhập.
              </Text>
              <Button
                type="primary"
                icon={<LinkOutlined />}
                loading={submitting}
                onClick={() => handleCreateOrReshare(Boolean(shareInfo?.token || shareInfo?.isRevoked))}
              >
                Tạo liên kết chia sẻ cho tài xế
              </Button>
            </div>
          )
        )}
      </div>
    </Modal>
  );
}
