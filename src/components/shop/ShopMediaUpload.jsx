import { useRef, useState } from 'react';
import { Alert, Button, Image, Upload } from 'antd';
import { DeleteOutlined, PictureOutlined, UploadOutlined } from '@ant-design/icons';
import { shopService } from '../../services/shopService';
import { shopError } from '../../constants/shop';

const PURPOSE_GUIDANCE = {
  Logo: 'Tỉ lệ vuông 1:1, từ 128–2048px mỗi cạnh (JPG, PNG, WebP, tối đa 5 MiB).',
  Banner: 'Khung ngang rộng 640–4096px, cao 200–2048px (JPG, PNG, WebP, tối đa 5 MiB).',
  TemplatePreview: 'Rộng 320–2048px, cao 180–2048px (JPG, PNG, WebP, tối đa 5 MiB).',
};

export default function ShopMediaUpload({
  value,
  onChange,
  purpose,
  administrator = false,
  onBusyChange,
  disabled,
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const attempts = useRef(new Map());

  const upload = async ({ file, onSuccess, onError }) => {
    setBusy(true);
    onBusyChange?.(true);
    setError('');
    try {
      const hash = Array.from(
        new Uint8Array(await crypto.subtle.digest('SHA-256', await file.arrayBuffer())),
      )
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
      const fingerprint = `${purpose}:${hash}`;
      if (!attempts.current.has(fingerprint)) {
        attempts.current.set(fingerprint, crypto.randomUUID());
      }
      const asset = await shopService.upload(
        file,
        purpose,
        attempts.current.get(fingerprint),
        administrator,
      );
      onChange?.({ id: asset.mediaAssetId, url: asset.url });
      onSuccess(asset);
    } catch (failure) {
      setError(shopError(failure));
      onError(failure);
    } finally {
      setBusy(false);
      onBusyChange?.(false);
    }
  };

  const isLogo = purpose === 'Logo';

  return (
    <div className="space-y-3">
      <div
        className={`flex items-center justify-center overflow-hidden rounded-xl border border-[#e4dcd3] bg-[#faf7f2] ${
          isLogo ? 'h-28 w-28 p-2' : 'min-h-[124px] w-full p-2.5'
        }`}
      >
        {value?.url ? (
          <Image
            src={value.url}
            alt={`${purpose} gian hàng`}
            width={isLogo ? 96 : '100%'}
            height={isLogo ? 96 : 112}
            className="rounded-lg object-cover"
            style={{ objectFit: isLogo ? 'contain' : 'cover', borderRadius: 8 }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1.5 py-4 text-center text-xs text-[#8a7f7a]">
            <PictureOutlined className="text-lg text-[#b3a69e]" />
            <span>Chưa có ảnh {purpose}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Upload
          accept=".jpg,.jpeg,.png,.webp"
          showUploadList={false}
          customRequest={upload}
          disabled={disabled || busy}
          beforeUpload={(file) => {
            if (file.size > 5 * 1024 * 1024) {
              setError('Ảnh tối đa 5 MiB.');
              return Upload.LIST_IGNORE;
            }
            return true;
          }}
        >
          <Button disabled={disabled} icon={<UploadOutlined />} loading={busy}>
            Tải ảnh {purpose}
          </Button>
        </Upload>

        {value && (
          <Button
            disabled={disabled || busy}
            icon={<DeleteOutlined />}
            aria-label={`Gỡ ảnh ${purpose}`}
            onClick={() => onChange?.(null)}
          />
        )}
      </div>

      {error && <Alert type="error" showIcon title={error} />}

      <p className="m-0 text-xs leading-relaxed text-[#6c625e]">
        {PURPOSE_GUIDANCE[purpose] || PURPOSE_GUIDANCE.TemplatePreview}
      </p>
    </div>
  );
}
