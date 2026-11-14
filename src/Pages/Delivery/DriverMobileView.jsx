import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Input,
  Result,
  Spin,
  Tag,
  Typography,
  message,
} from 'antd';
import {
  ArrowLeftOutlined,
  CameraOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CompassOutlined,
  DeleteOutlined,
  PhoneOutlined,
  PlusOutlined,
  SafetyCertificateOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import SignatureCanvas from '../../components/delivery/SignatureCanvas';
import deliveryService from '../../services/deliveryService';
import '../../components/delivery/delivery-share.css';

const { Text, Paragraph } = Typography;

const MAX_PHOTOS = 5;
const OFFLINE_QUEUE_KEY = 'mooncake_offline_pod';

const STATUS_BADGE_MAP = {
  Pending: { text: 'Chờ xếp xe', color: 'default' },
  Confirmed: { text: 'Đã xác nhận', color: 'blue' },
  PickedUp: { text: 'Đã bốc lên xe', color: 'geekblue' },
  InTransit: { text: 'Đang giao hàng', color: 'gold' },
  AwaitingCustomerConfirmation: { text: 'Chờ khách đối soát PoD', color: 'cyan' },
  Delivered: { text: 'Đã hoàn tất PoD', color: 'green' },
  Disputed: { text: 'Đang đối soát khiếu nại', color: 'red' },
  Failed: { text: 'Giao thất bại', color: 'red' },
  Returned: { text: 'Đã chuyển hoàn', color: 'volcano' },
};

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

const compressImageFileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Không thể đọc tệp ảnh.'));
    reader.onload = (ev) => {
      const img = new Image();
      img.onerror = () => resolve(ev.target?.result);
      img.onload = () => {
        const maxDim = 1280;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(ev.target?.result);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = ev.target?.result;
    };
    reader.readAsDataURL(file);
  });

export default function DriverMobileView({
  deliveryId: propDeliveryId,
  shareToken: propShareToken,
  onBack,
  onComplete,
}) {
  const [shareToken] = useState(() => {
    if (propShareToken) return propShareToken;
    return new URLSearchParams(window.location.search).get('token');
  });

  const [deliveryId] = useState(() => {
    if (propDeliveryId) return propDeliveryId;
    return new URLSearchParams(window.location.search).get('id');
  });

  const isPublicMode = Boolean(shareToken);

  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedProof, setSubmittedProof] = useState(null);

  // PoD capture state (multi-photo support up to 5)
  const [photos, setPhotos] = useState([]);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState(null);
  const [recipientName, setRecipientName] = useState('');
  const [notes, setNotes] = useState('');
  const [coords, setCoords] = useState({ lat: 21.0168, lng: 105.7838 });
  const [gpsLoading, setGpsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const fileInputRef = useRef(null);

  const syncOfflineQueue = useCallback(async () => {
    const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]');
    if (queue.length === 0) return;

    const remaining = [];
    for (const item of queue) {
      try {
        if (item.shareToken) {
          await deliveryService.submitPublicProof(item.shareToken, item.payload);
        } else if (item.deliveryId) {
          await deliveryService.submitProof(item.deliveryId, item.payload);
        }
      } catch {
        remaining.push(item);
      }
    }

    if (remaining.length === 0) {
      localStorage.removeItem(OFFLINE_QUEUE_KEY);
      message.success('Đồng bộ thành công bằng chứng đã lưu ngoại tuyến.');
    } else {
      localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(remaining));
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      message.success('Đã kết nối mạng trở lại.');
      syncOfflineQueue();
    };
    const handleOffline = () => {
      setIsOffline(true);
      message.warning('Mất kết nối mạng. Dữ liệu sẽ được lưu tạm trên thiết bị.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [syncOfflineQueue]);

  const requestLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setCoords({ lat: 21.0168, lng: 105.7838 });
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setGpsLoading(false);
      },
      () => {
        setCoords({ lat: 21.0168, lng: 105.7838 });
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  useEffect(() => {
    let ignore = false;
    const loadDelivery = async () => {
      if (!shareToken && !deliveryId) {
        setLoadError({
          status: 'warning',
          title: 'Thiếu mã liên kết giao nhận',
          subtitle:
            'Vui lòng mở đúng liên kết do xưởng cung ứng gửi hoặc liên hệ điều phối viên để được cấp lại link mới.',
        });
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setLoadError(null);
        const data = shareToken
          ? await deliveryService.getPublicByToken(shareToken)
          : await deliveryService.get(deliveryId);

        if (!ignore) {
          setDelivery(data);
          if (data?.recipientName) {
            setRecipientName(data.recipientName);
          }
        }
      } catch (err) {
        if (!ignore) {
          const status = err.status ?? err.response?.status;
          const localizedMessage =
            status === 410
              ? 'Liên kết PoD này đã hết hạn, bị thu hồi hoặc đã được thay thế. Vui lòng liên hệ xưởng cung ứng để nhận link chia sẻ mới (Reshare).'
              : status === 404
                ? 'Liên kết giao nhận không hợp lệ hoặc đã bị thay thế bằng liên kết mới.'
                : err.response?.data?.message ||
                err.message ||
                'Không thể tải thông tin chuyến giao hàng.';
          setLoadError({
            status: status === 410 || status === 404 ? 'warning' : 'error',
            title:
              status === 410
                ? 'Liên kết giao nhận đã hết hạn hoặc đã được thay thế'
                : status === 404
                  ? 'Liên kết giao nhận không tồn tại'
                  : 'Không thể tải thông tin chuyến giao hàng',
            subtitle: localizedMessage,
          });
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadDelivery();
    return () => {
      ignore = true;
    };
  }, [shareToken, deliveryId]);

  const handleCapturePhotos = async (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    e.target.value = '';
    if (selectedFiles.length === 0) return;

    const availableSlots = MAX_PHOTOS - photos.length;
    if (availableSlots <= 0) {
      message.warning(`Tối đa ${MAX_PHOTOS} ảnh bàn giao mỗi lần nộp.`);
      return;
    }

    const batch = selectedFiles.slice(0, availableSlots);
    setPhotoUploading(true);

    try {
      const nextPhotos = [];
      for (const file of batch) {
        if (file.size > 10 * 1024 * 1024) {
          message.error(`Ảnh "${file.name}" vượt quá giới hạn 10MB.`);
          continue;
        }

        const previewUrl = await compressImageFileToDataUrl(file);
        let remoteUrl = null;
        if (shareToken && !isOffline) {
          try {
            const uploaded = await deliveryService.uploadPublicProofPhoto(
              shareToken,
              file
            );
            remoteUrl = uploaded?.url || null;
          } catch {
            // Fallback seamlessly to compressed data URL when cloud upload is unavailable
            remoteUrl = null;
          }
        }

        nextPhotos.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          previewUrl,
          submitUrl: remoteUrl || previewUrl,
        });
      }

      if (nextPhotos.length > 0) {
        setPhotos((prev) => [...prev, ...nextPhotos].slice(0, MAX_PHOTOS));
      }
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleRemovePhoto = (photoId) => {
    setPhotos((prev) => prev.filter((item) => item.id !== photoId));
  };

  const handleSubmit = async () => {
    if (photos.length === 0) {
      message.error('Vui lòng chụp ít nhất 1 ảnh kiện hàng tại điểm giao.');
      return;
    }

    if (!signatureDataUrl) {
      message.error('Vui lòng lấy chữ ký cảm ứng của người nhận hàng.');
      return;
    }

    if (!recipientName.trim()) {
      message.error('Vui lòng nhập họ tên người ký nhận hàng.');
      return;
    }

    const photoUrls = photos.map((p) => p.submitUrl).filter(Boolean);
    const payload = {
      proofType: 'Delivery',
      photoUrl: photoUrls[0],
      photoUrls,
      signatureBase64: signatureDataUrl,
      takenBy: recipientName.trim(),
      locationLat: coords.lat || 21.0168,
      locationLng: coords.lng || 105.7838,
      notes: notes.trim(),
    };

    if (isOffline) {
      const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]');
      queue.push({
        shareToken: shareToken || null,
        deliveryId: delivery?.deliveryId || delivery?.id || deliveryId || null,
        payload,
        timestamp: Date.now(),
      });
      localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
      message.warning('Đã lưu tạm bằng chứng PoD ngoại tuyến, sẽ tự đồng bộ khi có mạng.');
      setSubmittedProof({
        takenAt: new Date().toISOString(),
        photoCount: photoUrls.length,
        offline: true,
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = shareToken
        ? await deliveryService.submitPublicProof(shareToken, payload)
        : await deliveryService.submitProof(
          delivery?.id || delivery?.deliveryId || deliveryId,
          payload
        );

      message.success('Đã nộp biên bản bàn giao PoD thành công.');
      setSubmittedProof({
        ...response,
        photoCount: photoUrls.length,
        offline: false,
      });
      onComplete?.();
    } catch (err) {
      message.error(
        err.response?.data?.message || err.message || 'Lỗi khi nộp bằng chứng giao hàng.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center px-4">
        <Spin size="large" />
        <Text className="mt-4 text-xs text-[#6c625e]">
          Đang tải thông tin chuyến giao hàng…
        </Text>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-[#e4dcd3] bg-white p-6">
          <Result
            status={loadError.status}
            title={
              <span className="text-base font-semibold text-[#231a18]">
                {loadError.title}
              </span>
            }
            subTitle={
              <span className="text-xs text-[#6c625e]">{loadError.subtitle}</span>
            }
            extra={
              !isPublicMode && onBack ? (
                <Button type="primary" onClick={onBack}>
                  Quay lại quản lý giao hàng
                </Button>
              ) : null
            }
          />
        </div>
      </div>
    );
  }

  const resolvedStatus = delivery?.status || 'InTransit';
  const statusMeta = STATUS_BADGE_MAP[resolvedStatus] || {
    text: resolvedStatus,
    color: 'default',
  };
  const isCompletedDelivery =
    resolvedStatus === 'Delivered' ||
    resolvedStatus === 'Returned' ||
    delivery?.canSubmitProof === false;

  if (submittedProof) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-[#dce6dd] bg-white p-6 text-center">
          <Result
            status="success"
            title={
              <span className="text-lg font-semibold text-[#231a18]">
                {submittedProof.offline
                  ? 'Đã lưu tạm PoD ngoại tuyến'
                  : 'Hoàn tất bàn giao PoD'}
              </span>
            }
            subTitle={
              <div className="space-y-1 text-xs text-[#6c625e]">
                <div>
                  Chuyến giao:{' '}
                  <span className="font-mono font-semibold text-[#7d1322]">
                    {delivery?.deliveryNumber}
                  </span>
                </div>
                <div>
                  Số ảnh đã ghi nhận: {submittedProof.photoCount || 1} ảnh · Người ký:{' '}
                  {recipientName}
                </div>
                <div>
                  Thời gian:{' '}
                  {formatDateTime(submittedProof.takenAt || new Date().toISOString())}
                </div>
                {submittedProof.tamperProofHash && (
                  <div className="driver-pod-hash">
                    SHA-256: {submittedProof.tamperProofHash}
                  </div>
                )}
              </div>
            }
            extra={
              !isPublicMode && onComplete ? (
                <Button type="primary" onClick={onComplete}>
                  Quay về quản lý vận chuyển
                </Button>
              ) : (
                <Text className="text-xs text-[#6c625e]">
                  Biên bản đã gửi về hệ thống xưởng. Bạn có thể đóng trang này.
                </Text>
              )
            }
          />
        </div>
      </div>
    );
  }

  if (isCompletedDelivery) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-[#dce6dd] bg-white p-6">
          <Result
            status="success"
            title={
              <span className="text-base font-semibold text-[#231a18]">
                Chuyến hàng đã hoàn tất bàn giao
              </span>
            }
            subTitle={
              <span className="text-xs text-[#6c625e]">
                Chuyến {delivery?.deliveryNumber} đang ở trạng thái{' '}
                <strong>{statusMeta.text}</strong> và đã có {delivery?.proofCount || 0}{' '}
                bằng chứng PoD. Không cần nộp bổ sung.
              </span>
            }
            extra={
              !isPublicMode && onBack ? (
                <Button type="primary" onClick={onBack}>
                  Quay lại
                </Button>
              ) : null
            }
          />
        </div>
      </div>
    );
  }

  const phoneLink = delivery?.recipientPhone
    ? `tel:${delivery.recipientPhone}`
    : null;
  const mapsLink = delivery?.toAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      delivery.toAddress
    )}`
    : null;

  return (
    <div className="driver-pod-page">
      <div className="driver-pod-container">
        {/* Top Mobile Bar */}
        <header className="driver-pod-topbar">
          <div className="flex items-center gap-2">
            {onBack ? (
              <Button
                type="text"
                size="small"
                icon={<ArrowLeftOutlined />}
                onClick={onBack}
                className="text-[#231a18]"
              >
                Quay lại
              </Button>
            ) : (
              <div>
                <div className="driver-pod-brand">
                  Biên bản giao hàng PoD
                </div>
                {delivery?.expiresAtUtc && (
                  <div className="driver-pod-expiry">
                    <ClockCircleOutlined className="text-[#9a6b16]" />
                    <span>Hạn link: {formatDateTime(delivery.expiresAtUtc)}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-right">
            <div className="font-mono text-xs font-semibold text-[#7d1322]">
              {delivery?.deliveryNumber || '---'}
            </div>
            <Tag color={statusMeta.color} className="m-0 mt-1 text-[11px]">
              {statusMeta.text}
            </Tag>
          </div>
        </header>

        {isOffline && (
          <Alert
            type="warning"
            showIcon
            className="text-xs"
            message="Bạn đang ngoại tuyến. Dữ liệu PoD sẽ được lưu tạm trên điện thoại và gửi khi có mạng."
          />
        )}

        {/* Destination & Contact Card */}
        <Card className="rounded-2xl border-[#e4dcd3] bg-white" size="small">
          <div className="space-y-2.5">
            <div className="driver-pod-card-row">
              <span className="font-semibold text-[#9a6b16]">Điểm giao nhận</span>
              <span className="font-mono text-[#6c625e]">
                {delivery?.referenceCode || delivery?.contractNumber || 'Đơn hàng B2B'}
              </span>
            </div>

            <Paragraph className="m-0 text-sm font-semibold text-[#231a18]">
              {delivery?.toAddress || 'Chưa có địa chỉ chi tiết'}
            </Paragraph>

            <div className="space-y-0.5 text-xs text-[#6c625e]">
              <div>
                <span className="font-medium text-[#231a18]">Người nhận:</span>{' '}
                {delivery?.recipientName || 'Thủ kho'} (
                {delivery?.recipientPhone || 'Chưa có SĐT'})
              </div>
              {delivery?.trackingCode && (
                <div>
                  <span className="font-medium text-[#231a18]">Mã xe / vận đơn:</span>{' '}
                  <span className="font-mono">{delivery.trackingCode}</span>
                </div>
              )}
              {delivery?.notes && (
                <div>
                  <span className="font-medium text-[#231a18]">Dặn dò từ xưởng:</span>{' '}
                  {delivery.notes}
                </div>
              )}
            </div>

            <div className="driver-pod-card-actions">
              <Button
                icon={<PhoneOutlined />}
                href={phoneLink}
                disabled={!phoneLink}
                style={
                  phoneLink
                    ? { borderColor: '#2d5a43', color: '#2d5a43' }
                    : undefined
                }
              >
                Gọi người nhận
              </Button>
              <Button
                icon={<CompassOutlined />}
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                disabled={!mapsLink}
              >
                Mở Google Maps
              </Button>
            </div>
          </div>
        </Card>

        {/* Step 1: Multi-Photo Capture */}
        <Card
          className="rounded-2xl border-[#e4dcd3] bg-white"
          size="small"
          title={
            <div className="driver-pod-step-header text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 font-semibold text-[#231a18]">
                <CameraOutlined className="text-[#9a6b16]" />
                1. Chụp ảnh kiện hàng ({photos.length}/{MAX_PHOTOS})
              </span>
              {photos.length > 0 && (
                <Tag color="green" className="m-0">
                  <CheckCircleOutlined /> Đã có {photos.length} ảnh
                </Tag>
              )}
            </div>
          }
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            className="driver-pod-hidden-input"
            onChange={handleCapturePhotos}
          />

          {photos.length > 0 ? (
            <div className="space-y-3">
              <div className="driver-pod-photo-grid">
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="driver-pod-photo-item"
                  >
                    <img
                      src={photo.previewUrl}
                      alt={`Ảnh bàn giao ${index + 1}`}
                    />
                    <button
                      type="button"
                      aria-label={`Xóa ảnh ${index + 1}`}
                      onClick={() => handleRemovePhoto(photo.id)}
                      className="driver-pod-photo-remove"
                    >
                      <DeleteOutlined className="text-xs" />
                    </button>
                  </div>
                ))}

                {photos.length < MAX_PHOTOS && (
                  <button
                    type="button"
                    disabled={photoUploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="driver-pod-photo-add"
                  >
                    <PlusOutlined className="text-base" />
                    <span>{photoUploading ? 'Đang tải…' : 'Thêm ảnh'}</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <button
              type="button"
              disabled={photoUploading}
              onClick={() => fileInputRef.current?.click()}
              className="driver-pod-photo-dropzone"
            >
              <CameraOutlined className="mb-2 text-3xl text-[#9a6b16]" />
              <div className="text-sm font-semibold text-[#231a18]">
                {photoUploading
                  ? 'Đang xử lý ảnh…'
                  : 'Chạm để chụp hoặc chọn ảnh bàn giao'}
              </div>
              <div className="mt-1 text-xs text-[#6c625e]">
                Chụp rõ kiện hàng, tem niêm phong hoặc biên bản có dấu mộc (tối đa 5 ảnh)
              </div>
            </button>
          )}
        </Card>

        {/* Step 2: Recipient Name & Digital Signature */}
        <Card
          className="rounded-2xl border-[#e4dcd3] bg-white"
          size="small"
          title={
            <div className="driver-pod-step-header text-xs sm:text-sm">
              <span className="font-semibold text-[#231a18]">
                2. Chữ ký điện tử người nhận hàng
              </span>
              {signatureDataUrl && (
                <Tag color="green" className="m-0">
                  <CheckCircleOutlined /> Đã ký
                </Tag>
              )}
            </div>
          }
        >
          <div className="mb-3">
            <label
              htmlFor="driver-recipient-input"
              className="mb-1 block text-xs font-medium text-[#6c625e]"
            >
              Họ tên người trực tiếp ký nhận
            </label>
            <Input
              id="driver-recipient-input"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Nhập họ tên thủ kho hoặc người nhận"
            />
          </div>

          <SignatureCanvas onSignatureChange={setSignatureDataUrl} />
        </Card>

        {/* Step 3: GPS & Notes */}
        <Card
          className="rounded-2xl border-[#e4dcd3] bg-white"
          size="small"
          title={
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-semibold text-[#231a18]">
                3. Ghi chú &amp; tọa độ GPS
              </span>
              <Button
                size="small"
                type="link"
                onClick={requestLocation}
                icon={<SyncOutlined spin={gpsLoading} />}
                className="p-0 text-xs"
              >
                Cập nhật GPS
              </Button>
            </div>
          }
        >
          <div className="space-y-3">
            <Input.TextArea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ghi chú thực tế (VD: Giao đủ số lượng hộp nguyên vẹn tại cổng 2)"
              className="text-xs"
            />

            <div className="flex items-center justify-between rounded-lg border border-[#e4dcd3] bg-[#faf7f2] px-3 py-2 text-xs">
              <span className="flex items-center gap-1.5 text-[#6c625e]">
                <CompassOutlined className="text-[#9a6b16]" />
                <span>Tọa độ thực địa</span>
              </span>
              {gpsLoading ? (
                <span className="text-[#6c625e]">
                  <SyncOutlined spin /> Đang định vị…
                </span>
              ) : (
                <span className="font-mono font-semibold text-[#231a18] tabular-nums">
                  {coords.lat
                    ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`
                    : 'Chưa có GPS'}
                </span>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="driver-pod-bottom-bar">
        <div className="driver-pod-bottom-inner">
          <Button
            type="primary"
            block
            size="large"
            loading={submitting || photoUploading}
            onClick={handleSubmit}
            icon={<SafetyCertificateOutlined />}
            className="h-12 font-semibold"
          >
            Xác nhận bàn giao &amp; nộp PoD
          </Button>
        </div>
      </div>
    </div>
  );
}
