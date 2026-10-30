import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Card,
  Button,
  Tag,
  Typography,
  Input,
  message,
  Alert,
  Spin,
  Badge,
} from 'antd';
import {
  PhoneOutlined,
  CompassOutlined,
  CameraOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
  SafetyCertificateOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import SignatureCanvas from '../../components/delivery/SignatureCanvas';
import deliveryService from '../../services/deliveryService';

const { Text, Paragraph } = Typography;

export default function DriverMobileView({ deliveryId: propDeliveryId, onBack, onComplete }) {
  const [deliveryId] = useState(() => {
    if (propDeliveryId) return propDeliveryId;
    const hash = window.location.hash;
    const queryIdx = hash.indexOf('?');
    if (queryIdx !== -1) {
      const params = new URLSearchParams(hash.substring(queryIdx));
      return params.get('id');
    }
    return null;
  });

  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [signatureDataUrl, setSignatureDataUrl] = useState(null);
  const [recipientName, setRecipientName] = useState('');
  const [notes, setNotes] = useState('');
  const [coords, setCoords] = useState({ lat: 21.0168, lng: 105.7838 });
  const [gpsLoading, setGpsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const fileInputRef = useRef(null);

  const syncOfflineQueue = useCallback(async () => {
    const queue = JSON.parse(localStorage.getItem('mooncake_offline_pod') || '[]');
    if (queue.length === 0) return;

    for (const item of queue) {
      try {
        await deliveryService.submitProof(item.deliveryId, item.payload);
      } catch {
        return;
      }
    }
    localStorage.removeItem('mooncake_offline_pod');
    message.success('Đồng bộ thành công bằng chứng đã lưu ngoại tuyến!');
  }, []);

  // Network offline listener
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      message.success('Đã kết nối mạng trở lại!');
      syncOfflineQueue();
    };
    const handleOffline = () => {
      setIsOffline(true);
      message.warning('Mất kết nối Internet. Dữ liệu sẽ được lưu tạm ngoại tuyến.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [syncOfflineQueue]);

  const requestLocation = useCallback(() => {
    if ('geolocation' in navigator) {
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
    } else {
      setCoords({ lat: 21.0168, lng: 105.7838 });
    }
  }, []);

  // Fetch delivery detail
  useEffect(() => {
    let ignore = false;
    const loadDelivery = async () => {
      if (!deliveryId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await deliveryService.get(deliveryId);
        if (!ignore) {
          setDelivery(data);
          if (data?.recipientName) {
            setRecipientName(data.recipientName);
          }
        }
      } catch {
        if (!ignore) {
          message.error('Không thể tải thông tin chuyến giao hàng.');
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
  }, [deliveryId]);

  const handleCapturePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      message.error('Ảnh chụp không được vượt quá 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setPhotoDataUrl(uploadEvent.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!photoDataUrl) {
      message.error('Vui lòng chụp ảnh kiện hàng tại kho nhận trước khi xác nhận.');
      return;
    }

    if (!signatureDataUrl) {
      message.error('Vui lòng lấy chữ ký cảm ứng của người nhận hàng.');
      return;
    }

    if (!recipientName.trim()) {
      message.error('Vui lòng nhập họ tên người nhận hàng.');
      return;
    }

    const targetId = delivery?.id || deliveryId;
    if (!targetId) {
      message.error('Không tìm thấy thông tin chuyến giao hàng.');
      return;
    }

    setSubmitting(true);

    const payload = {
      proofType: 'Delivery',
      photoBase64: photoDataUrl,
      signatureBase64: signatureDataUrl,
      takenBy: recipientName.trim(),
      locationLat: coords.lat || 21.0168,
      locationLng: coords.lng || 105.7838,
      notes: notes.trim(),
    };

    if (isOffline) {
      const queue = JSON.parse(localStorage.getItem('mooncake_offline_pod') || '[]');
      queue.push({ deliveryId: targetId, payload, timestamp: Date.now() });
      localStorage.setItem('mooncake_offline_pod', JSON.stringify(queue));
      message.warning('Mất mạng! Đã lưu bằng chứng vào bộ nhớ máy, sẽ tự động đồng bộ khi có 4G.');
      setSubmitting(false);
      onComplete?.();
      return;
    }

    try {
      await deliveryService.submitProof(targetId, payload);
      message.success('Bàn giao thành công! Bằng chứng PoD và chữ ký đã được lưu vào hệ thống.');
      onComplete?.();
    } catch (err) {
      message.error(err.response?.data?.message || 'Lỗi khi nộp bằng chứng giao hàng.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Spin size="large" />
        <Text className="mt-4 text-slate-500">Đang tải thông tin chuyến giao hàng...</Text>
      </div>
    );
  }

  const phoneLink = delivery?.recipientPhone ? `tel:${delivery.recipientPhone}` : null;
  const mapsLink = delivery?.toAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(delivery.toAddress)}`
    : null;

  return (
    <div className="min-h-screen bg-slate-100 pb-28 pt-2 px-3 sm:px-4 max-w-lg mx-auto">
      {/* Top Mobile Bar */}
      <div className="flex items-center justify-between mb-3 bg-white p-3 rounded-xl shadow-sm border border-slate-200">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={onBack || (() => window.history.back())}
          className="text-slate-600 font-semibold"
        >
          Quay lại
        </Button>

        <div className="text-right">
          <Badge status="processing" color="gold" text={<span className="font-bold text-amber-900">{delivery?.deliveryNumber || '---'}</span>} />
          <div>
            <Tag color={delivery?.status === 'Delivered' ? 'green' : 'gold'} className="font-semibold text-[11px] mt-0.5">
              {delivery?.status === 'Delivered' ? 'Đã giao' : 'Đang giao hàng'}
            </Tag>
          </div>
        </div>
      </div>

      {isOffline && (
        <Alert
          type="warning"
          showIcon
          className="mb-3 text-xs"
          message="Bạn đang ngoại tuyến. Dữ liệu PoD sẽ được lưu trên điện thoại và gửi đi khi có mạng."
        />
      )}

      {/* Destination & Contact Card */}
      <Card
        className="rounded-2xl shadow-sm border-amber-200/80 mb-3 bg-gradient-to-br from-amber-50/60 to-white"
        size="small"
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-800">
              📍 ĐIỂM GIAO HÀNG
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {delivery?.contractNumber || 'Hợp đồng B2B'}
            </span>
          </div>

          <Paragraph className="text-sm font-semibold text-slate-800 mb-1">
            {delivery?.toAddress || 'Chưa có địa chỉ chi tiết'}
          </Paragraph>

          <div className="text-xs text-slate-600">
            <strong>Người nhận:</strong> {delivery?.recipientName || 'Thủ kho'} ({delivery?.recipientPhone || 'N/A'})
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-100">
            <Button
              type="primary"
              className="bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs flex items-center justify-center gap-1 font-semibold"
              href={phoneLink}
              disabled={!phoneLink}
            >
              <PhoneOutlined /> Gọi Ngay
            </Button>

            <Button
              className="border-blue-400 text-blue-600 hover:bg-blue-50 rounded-lg text-xs flex items-center justify-center gap-1 font-semibold"
              href={mapsLink}
              target="_blank"
              disabled={!mapsLink}
            >
              <CompassOutlined /> Chỉ Đường
            </Button>
          </div>
        </div>
      </Card>

      {/* Step 1: Capture Photo */}
      <Card
        className="rounded-2xl shadow-sm border-slate-200 mb-3 bg-white"
        title={
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <CameraOutlined className="text-amber-600 text-base" /> 1. Chụp ảnh kiện hàng tại kho
            </span>
            {photoDataUrl && <Tag color="success"><CheckCircleOutlined /> Đã chụp</Tag>}
          </div>
        }
        size="small"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleCapturePhoto}
        />

        {photoDataUrl ? (
          <div className="space-y-2">
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 flex justify-center max-h-56">
              <img src={photoDataUrl} alt="Kiện hàng" className="object-contain max-h-56 w-full" />
            </div>
            <Button
              block
              icon={<CameraOutlined />}
              onClick={() => fileInputRef.current?.click()}
              className="border-slate-300 text-slate-700 text-xs font-semibold"
            >
              Chụp lại ảnh khác
            </Button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-amber-300 rounded-xl p-6 text-center cursor-pointer bg-amber-50/30 hover:bg-amber-50/60 transition-colors"
          >
            <CameraOutlined className="text-4xl text-amber-600 mb-2" />
            <div className="font-semibold text-slate-800 text-sm">Bấm vào đây để mở Camera</div>
            <div className="text-xs text-slate-500 mt-1">
              Chụp thùng bánh, đai niêm phong nguyên vẹn tại điểm giao
            </div>
          </div>
        )}
      </Card>

      {/* Step 2: Digital Signature */}
      <Card
        className="rounded-2xl shadow-sm border-slate-200 mb-3 bg-white"
        title={
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              ✍️ 2. Lấy chữ ký cảm ứng người nhận
            </span>
            {signatureDataUrl && <Tag color="success"><CheckCircleOutlined /> Đã ký</Tag>}
          </div>
        }
        size="small"
      >
        <div className="mb-2">
          <Text className="text-xs text-slate-500 mb-1 block">
            Họ tên người ký nhận:
          </Text>
          <Input
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Nhập họ tên người ký nhận"
            className="rounded-lg text-sm"
          />
        </div>

        <div className="mt-2">
          <SignatureCanvas onSignatureChange={setSignatureDataUrl} />
        </div>
      </Card>

      {/* Step 3: Location & Notes */}
      <Card
        className="rounded-2xl shadow-sm border-slate-200 mb-3 bg-white"
        title={
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-bold text-slate-800">3. Ghi chú & Định vị GPS</span>
            <Button
              size="small"
              type="link"
              onClick={requestLocation}
              icon={<SyncOutlined spin={gpsLoading} />}
              className="text-xs text-blue-600 p-0"
            >
              Cập nhật GPS
            </Button>
          </div>
        }
        size="small"
      >
        <div className="space-y-3">
          <Input.TextArea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ghi chú thêm về kiện hàng (VD: Đã giao 1.500 hộp nguyên vẹn, bàn giao cổng 3...)"
            className="rounded-lg text-xs"
          />

          <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="flex items-center gap-1 text-slate-600">
              <CompassOutlined className="text-blue-500" />
              Tọa độ thực địa:
            </span>
            {gpsLoading ? (
              <span className="text-slate-400"><SyncOutlined spin /> Đang lấy GPS...</span>
            ) : (
              <span className="font-mono font-semibold text-slate-700">
                {coords.lat ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : 'Chưa có GPS'}
              </span>
            )}
          </div>
        </div>
      </Card>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl z-50">
        <div className="max-w-lg mx-auto">
          <Button
            type="primary"
            block
            size="large"
            loading={submitting}
            onClick={handleSubmit}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold h-12 rounded-xl text-base shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2"
          >
            <SafetyCertificateOutlined className="text-lg" />
            XÁC NHẬN BÀN GIAO & NỘP PoD
          </Button>
        </div>
      </div>
    </div>
  );
}
