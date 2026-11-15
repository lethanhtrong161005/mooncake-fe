import { useState } from 'react';
import { Button, Image, Spin, Upload, message } from 'antd';
import { CheckCircleFilled, CloudUploadOutlined, DeleteOutlined } from '@ant-design/icons';
import customPackagingService from '../../services/customPackagingService';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

/**
 * PackagingImageUpload
 * Controlled image uploader for custom packaging logo and supplier mockup revisions.
 */
export default function PackagingImageUpload({
  id,
  value = '',
  onChange,
  uploader = (file) => customPackagingService.uploadLogo(file),
  dragTitle = 'Kéo thả hoặc nhấp để tải ảnh lên',
  dragHint = 'PNG, SVG, JPG, WEBP · Tối đa 10MB',
  previewAlt = 'Ảnh thiết kế bao bì',
  successText = 'Đã tải ảnh lên thành công',
  removeText = 'Xóa',
  previewWidth = 64,
  previewHeight = 64,
  disabled = false,
}) {
  const [uploading, setUploading] = useState(false);

  const handleUploadFile = async (file) => {
    if (!file) return false;
    const isImage =
      file.type?.startsWith('image/') ||
      /\.(png|jpe?g|webp|svg|gif)$/i.test(file.name || '');

    if (!isImage) {
      message.error('Vui lòng chọn tệp hình ảnh (PNG, SVG, JPG, WEBP).');
      return Upload.LIST_IGNORE;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      message.error('Kích thước tệp ảnh không được vượt quá 10MB.');
      return Upload.LIST_IGNORE;
    }

    setUploading(true);
    try {
      const res = await uploader(file);
      const url = res?.url || res?.data?.url || res?.secureUrl;
      if (url) {
        onChange?.(url);
        message.success(`${successText}.`);
      } else {
        message.error('Không nhận được ảnh hợp lệ từ máy chủ.');
      }
    } catch (err) {
      const errMsg =
        err?.response?.data?.message ||
        err?.message ||
        'Không thể tải ảnh lên. Vui lòng thử lại.';
      message.error(errMsg);
    } finally {
      setUploading(false);
    }
    return false;
  };

  if (value) {
    return (
      <div
        id={id}
        className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-[#faf9f6] p-3"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="shrink-0 overflow-hidden rounded-lg border border-stone-200 bg-white p-1">
            <Image
              src={value}
              alt={previewAlt}
              width={previewWidth}
              height={previewHeight}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="min-w-0">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-stone-900">
              <CheckCircleFilled className="text-emerald-600" />
              <span>{successText}</span>
            </span>
            <span className="mt-0.5 block text-[11px] text-stone-500">
              Nhấp vào ảnh để xem phóng to
            </span>
          </div>
        </div>
        <Button
          type="text"
          size="small"
          danger
          disabled={disabled || uploading}
          icon={<DeleteOutlined />}
          onClick={() => onChange?.('')}
          aria-label={removeText}
        >
          {removeText}
        </Button>
      </div>
    );
  }

  return (
    <div id={id}>
      <Upload.Dragger
        accept="image/*,.svg"
        showUploadList={false}
        beforeUpload={handleUploadFile}
        disabled={disabled || uploading}
        className="!rounded-xl !border-stone-300 !bg-[#faf9f6] hover:!border-[#8c1524]"
      >
        {uploading ? (
          <div className="py-2 flex flex-col items-center justify-center gap-1.5">
            <Spin size="small" />
            <span className="text-xs font-medium text-[#8c1524]">
              Đang tải ảnh lên...
            </span>
          </div>
        ) : (
          <div className="py-1.5 flex flex-col items-center justify-center gap-1">
            <CloudUploadOutlined className="text-xl text-[#8c1524]" />
            <span className="text-xs font-medium text-stone-800">{dragTitle}</span>
            <span className="text-[11px] text-stone-400">{dragHint}</span>
          </div>
        )}
      </Upload.Dragger>
    </div>
  );
}
