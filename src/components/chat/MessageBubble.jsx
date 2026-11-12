import { useState } from 'react';
import {
  Image,
  Dropdown,
  Input,
  Button,
  message as antMessage,
} from 'antd';
import {
  FileTextOutlined,
  DownloadOutlined,
  MoreOutlined,
  EditOutlined,
  RollbackOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { chatService } from '../../services/chatService';
import { routeUrl } from '../../utils/shopRoutes';

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function formatTime(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export default function MessageBubble({
  msg,
  isOwn,
  isPartnerRead,
  onRecall,
  onEdit,
  onNavigate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(msg.body || '');
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [renderedAt] = useState(() => Date.now());

  const canEdit = isOwn && !msg.isRecalled && (renderedAt - new Date(msg.createdAt).getTime() < 5 * 60 * 1000);
  const canRecall = isOwn && !msg.isRecalled;

  const handleDownload = async (attachmentId) => {
    try {
      const res = await chatService.getDownloadUrl(attachmentId);
      if (res?.url) {
        window.open(res.url, '_blank');
      }
    } catch {
      antMessage.error('Không thể tải tệp đính kèm.');
    }
  };

  const handleSaveEdit = async () => {
    if (!editText.trim()) {
      antMessage.warning('Nội dung không được để trống.');
      return;
    }
    setIsSubmittingEdit(true);
    try {
      await onEdit?.(msg.id, editText.trim());
      setIsEditing(false);
    } catch (err) {
      antMessage.error(err?.message || 'Không thể chỉnh sửa tin nhắn.');
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const menuItems = [];
  if (canEdit) {
    menuItems.push({
      key: 'edit',
      label: 'Chỉnh sửa',
      icon: <EditOutlined />,
      onClick: () => setIsEditing(true),
    });
  }
  if (canRecall) {
    menuItems.push({
      key: 'recall',
      label: 'Thu hồi',
      danger: true,
      icon: <RollbackOutlined />,
      onClick: () => onRecall?.(msg.id),
    });
  }

  // Recalled message state
  if (msg.isRecalled) {
    return (
      <div className={`flex my-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
        <div className="max-w-[75%] px-3.5 py-2 rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-gray-400 text-xs italic">
          Tin nhắn đã được thu hồi
        </div>
      </div>
    );
  }

  const imageAttachments = msg.attachments?.filter((a) => a.kind === 'Image') || [];
  const fileAttachments = msg.attachments?.filter((a) => a.kind === 'File') || [];
  const productId = msg.product?.productId || msg.product?.id;
  const productPath = productId ? `san-pham/${encodeURIComponent(productId)}` : null;

  return (
    <div className={`group flex items-end gap-1.5 my-1.5 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      {/* Action button menu on hover */}
      {isOwn && menuItems.length > 0 && !isEditing && (
        <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="topRight">
          <Button
            type="text"
            size="small"
            icon={<MoreOutlined />}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600"
            aria-label="Tùy chọn tin nhắn"
          />
        </Dropdown>
      )}

      <div
        className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-3.5 py-2.5 shadow-sm text-sm ${
          isOwn
            ? 'bg-[#8c1524] text-white rounded-br-sm'
            : 'bg-[#f3efe8] text-gray-800 rounded-bl-sm border border-stone-200'
        }`}
      >
        {/* Product Card snapshot if present */}
        {msg.product && (
          <a
            href={productPath ? routeUrl(productPath) : undefined}
            onClick={(event) => {
              if (!productPath) return;
              if (onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                onNavigate(productPath);
              }
            }}
            aria-label={`Xem chi tiết sản phẩm ${msg.product.name}`}
            className={`mb-2 p-2 rounded-xl flex items-center gap-3 border ${productPath ? 'cursor-pointer hover:ring-2 hover:ring-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300' : ''} ${
              isOwn ? 'bg-[#70101c] border-red-900/40 text-white' : 'bg-white border-stone-200 text-gray-800'
            }`}
          >
            {msg.product.imageUrl ? (
              <img
                src={msg.product.imageUrl}
                alt={msg.product.name}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400 text-xs">
                Bánh
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-xs line-clamp-1 m-0">{msg.product.name}</p>
              {typeof msg.product.price === 'number' && (
                <p className={`text-xs font-bold mt-0.5 mb-0 ${isOwn ? 'text-amber-300' : 'text-[#8c1524]'}`}>
                  {msg.product.price.toLocaleString('vi-VN')} đ
                </p>
              )}
            </div>
          </a>
        )}

        {/* Editing mode */}
        {isEditing ? (
          <div className="flex flex-col gap-2 min-w-[200px]">
            <Input.TextArea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoSize={{ minRows: 1, maxRows: 4 }}
              className="text-gray-900 text-sm"
            />
            <div className="flex justify-end gap-1.5">
              <Button size="small" onClick={() => setIsEditing(false)}>Hủy</Button>
              <Button
                size="small"
                type="primary"
                loading={isSubmittingEdit}
                onClick={handleSaveEdit}
                style={{ backgroundColor: isOwn ? '#d48806' : '#8c1524' }}
              >
                Lưu
              </Button>
            </div>
          </div>
        ) : (
          /* Normal message text */
          msg.body && (
            <p className="whitespace-pre-wrap break-words leading-relaxed m-0">
              {msg.body}
            </p>
          )
        )}

        {/* Multi-image grid */}
        {imageAttachments.length > 0 && (
          <div className="mt-2">
            <Image.PreviewGroup>
              <div
                className={`grid gap-1.5 rounded-xl overflow-hidden ${
                  imageAttachments.length === 1
                    ? 'grid-cols-1'
                    : imageAttachments.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-3'
                }`}
              >
                {imageAttachments.map((img) => (
                  <Image
                    key={img.id}
                    src={img.url}
                    alt={img.fileName}
                    className="object-cover w-full h-28 rounded-lg"
                    fallback="/placeholder-product.png"
                  />
                ))}
              </div>
            </Image.PreviewGroup>
          </div>
        )}

        {/* Document files list */}
        {fileAttachments.length > 0 && (
          <div className="mt-2 flex flex-col gap-1.5">
            {fileAttachments.map((file) => (
              <div
                key={file.id}
                onClick={() => handleDownload(file.id)}
                className={`flex items-center justify-between gap-3 p-2 rounded-xl cursor-pointer transition-all ${
                  isOwn
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-white hover:bg-stone-50 border border-stone-200 text-gray-800'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FileTextOutlined className="text-base text-amber-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate m-0">{file.fileName}</p>
                    <p className="text-[10px] opacity-75 m-0">{formatBytes(file.sizeBytes)}</p>
                  </div>
                </div>
                <DownloadOutlined className="text-xs flex-shrink-0 opacity-75 hover:opacity-100" />
              </div>
            ))}
          </div>
        )}

        {/* Footer: Time, Edited status, Read receipt */}
        <div
          className={`flex items-center justify-end gap-1.5 text-[10px] mt-1 pt-0.5 ${
            isOwn ? 'text-white/75' : 'text-gray-400'
          }`}
        >
          {msg.isEdited && <span>(đã sửa)</span>}
          <span>{formatTime(msg.createdAt)}</span>
          {isOwn && (
            <span
              title={isPartnerRead ? 'Đã xem' : 'Đã gửi'}
              className={isPartnerRead ? 'text-amber-300 font-bold' : 'text-white/70'}
            >
              <CheckOutlined />
              {isPartnerRead && <CheckOutlined className="-ml-1" />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

