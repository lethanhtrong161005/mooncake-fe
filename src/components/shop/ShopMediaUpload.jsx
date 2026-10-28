import { useRef, useState } from 'react';
import { Alert, Button, Image, Space, Upload } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { shopService } from '../../services/shopService';
import { shopError } from '../../constants/shop';

export default function ShopMediaUpload({ value, onChange, purpose, administrator = false, onBusyChange, disabled }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const attempts = useRef(new Map());
  const upload = async ({ file, onSuccess, onError }) => {
    setBusy(true); onBusyChange?.(true); setError('');
    try {
      const hash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', await file.arrayBuffer())))
        .map((byte) => byte.toString(16).padStart(2, '0')).join('');
      const fingerprint = `${purpose}:${hash}`;
      if (!attempts.current.has(fingerprint)) attempts.current.set(fingerprint, crypto.randomUUID());
      const asset = await shopService.upload(file, purpose, attempts.current.get(fingerprint), administrator);
      onChange?.({ id: asset.mediaAssetId, url: asset.url }); onSuccess(asset);
    } catch (failure) { setError(shopError(failure)); onError(failure); }
    finally { setBusy(false); onBusyChange?.(false); }
  };
  return <Space orientation="vertical">
    {value?.url && <Image width={purpose === 'Logo' ? 96 : 220} src={value.url} alt={`${purpose} gian hàng`} />}
    <Space><Upload accept=".jpg,.jpeg,.png,.webp" showUploadList={false} customRequest={upload} disabled={disabled || busy}
      beforeUpload={(file) => { if (file.size > 5 * 1024 * 1024) { setError('Ảnh tối đa 5 MiB.'); return Upload.LIST_IGNORE; } return true; }}>
      <Button disabled={disabled} icon={<UploadOutlined />} loading={busy}>Tải ảnh {purpose}</Button>
    </Upload>{value && <Button disabled={disabled || busy} icon={<DeleteOutlined />} aria-label={`Gỡ ảnh ${purpose}`} onClick={() => onChange?.(null)} />}</Space>
    {error && <Alert type="error" title={error} />}
    <Alert type="info" showIcon title={purpose === 'Logo' ? 'Logo: 128–2048px mỗi cạnh.' : purpose === 'Banner' ? 'Banner: rộng 640–4096px, cao 200–2048px.' : 'Ảnh mẫu: rộng 320–2048px, cao 180–2048px.'}
      description="JPG/PNG/WebP, tối đa 5 MiB. Đây là ảnh nhận diện công khai; không tải giấy tờ pháp lý tại đây." />
  </Space>;
}
