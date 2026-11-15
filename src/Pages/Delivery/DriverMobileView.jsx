import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  Result,
  Space,
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
  FileTextOutlined,
  InboxOutlined,
  LockOutlined,
  PhoneOutlined,
  PlusOutlined,
  SafetyCertificateOutlined,
  SyncOutlined,
  UserOutlined,
} from '@ant-design/icons';
import SignatureCanvas from '../../components/delivery/SignatureCanvas';
import deliveryService from '../../services/deliveryService';
import '../../components/delivery/delivery-share.css';

const { Text } = Typography;

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
  const urlParams = useMemo(() => new URLSearchParams(window.location.search), []);

  const [initialToken] = useState(() => {
    if (propShareToken) return propShareToken;
    return urlParams.get('token');
  });

  const [initialShareCode] = useState(() => {
    return urlParams.get('code') || urlParams.get('shareCode');
  });

  const [deliveryId] = useState(() => {
    if (propDeliveryId) return propDeliveryId;
    return urlParams.get('id');
  });

  const [activeToken, setActiveToken] = useState(initialToken);
  const [manualCode, setManualCode] = useState('');
  const [searchingCode, setSearchingCode] = useState(false);

  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedProof, setSubmittedProof] = useState(null);

  // Claim trip state
  const [claimForm] = Form.useForm();
  const [claiming, setClaiming] = useState(false);
  const [claimConflictError, setClaimConflictError] = useState(null);

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

  const isClaimed = Boolean(delivery?.driverClaimedAt);
  const isPublicMode = Boolean(activeToken || initialShareCode || delivery?.shareCode);

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

  // Load delivery details by token, share code or id
  const fetchDeliveryData = useCallback(async (tokenParam, codeParam, idParam) => {
    if (!tokenParam && !codeParam && !idParam) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setLoadError(null);
      let data = null;

      if (tokenParam) {
        data = await deliveryService.getPublicByToken(tokenParam);
      } else if (codeParam) {
        data = await deliveryService.getPublicByShareCode(codeParam);
        if (data?.token) {
          setActiveToken(data.token);
        }
      } else if (idParam) {
        data = await deliveryService.get(idParam);
      }

      setDelivery(data);
      if (data?.token) {
        setActiveToken(data.token);
      }
      if (data?.recipientName) {
        setRecipientName(data.recipientName);
      }

      claimForm.setFieldsValue({
        driverName: data?.driverName || '',
        driverPhone: data?.driverPhone || '',
        vehiclePlate: data?.vehiclePlate || '',
      });
    } catch (err) {
      const status = err.status ?? err.response?.status;
      const localizedMessage =
        status === 410
          ? 'Liên kết PoD này đã hết hạn, bị thu hồi hoặc đã được thay thế. Vui lòng liên hệ xưởng cung ứng để nhận link chia sẻ mới (Reshare).'
          : status === 404
            ? 'Không tìm thấy chuyến giao hàng với thông tin hoặc mã chuyến này.'
            : err.response?.data?.message || err.message || 'Không thể tải thông tin chuyến giao hàng.';
      setLoadError({
        status: status === 410 || status === 404 ? 'warning' : 'error',
        title:
          status === 410
            ? 'Liên kết giao nhận đã hết hạn hoặc đã được thay thế'
            : status === 404
              ? 'Không tìm thấy chuyến giao hàng'
              : 'Không thể tải thông tin chuyến giao hàng',
        subtitle: localizedMessage,
      });
    } finally {
      setLoading(false);
    }
  }, [claimForm]);

  useEffect(() => {
    let ignore = false;
    Promise.resolve().then(() => {
      if (!ignore) {
        fetchDeliveryData(initialToken, initialShareCode, deliveryId);
      }
    });
    return () => {
      ignore = true;
    };
  }, [deliveryId, fetchDeliveryData, initialShareCode, initialToken]);

  const handleSearchByCode = async () => {
    const code = manualCode.trim();
    if (!code) {
      message.warning('Vui lòng nhập mã chuyến giao hàng.');
      return;
    }
    setSearchingCode(true);
    await fetchDeliveryData(null, code, null);
    setSearchingCode(false);
  };

  const handleClaimTrip = async (values) => {
    const tokenToUse = activeToken || delivery?.token || initialToken;
    if (!tokenToUse) {
      message.error('Không tìm thấy token hợp lệ của chuyến giao. Vui lòng liên hệ xưởng cung ứng.');
      return;
    }

    setClaiming(true);
    setClaimConflictError(null);
    try {
      const result = await deliveryService.claimPublicTrip(tokenToUse, {
        driverName: values.driverName.trim(),
        driverPhone: values.driverPhone.trim(),
        vehiclePlate: values.vehiclePlate.trim(),
      });

      message.success('Nhận chuyến thành công! Bạn có thể bắt đầu chụp ảnh PoD.');
      setDelivery((prev) => ({
        ...prev,
        driverName: result?.driverName || values.driverName.trim(),
        driverPhone: result?.driverPhone || values.driverPhone.trim(),
        vehiclePlate: result?.vehiclePlate || values.vehiclePlate.trim(),
        driverClaimedAt: result?.driverClaimedAt || new Date().toISOString(),
      }));
    } catch (err) {
      const status = err.status ?? err.response?.status;
      if (status === 409) {
        const conflictMsg =
          'Chuyến giao này đã được tài xế khác nhận. Vui lòng liên hệ xưởng cung ứng để được hỗ trợ điều phối.';
        setClaimConflictError(conflictMsg);
        message.error(conflictMsg);
      } else {
        message.error(err.response?.data?.message || err.message || 'Lỗi khi nhận chuyến.');
      }
    } finally {
      setClaiming(false);
    }
  };

  const handleCapturePhotos = async (e) => {
    if (!isClaimed) {
      message.warning('Vui lòng hoàn thành bước Nhận chuyến trước khi chụp ảnh.');
      return;
    }

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
      const tokenToUse = activeToken || delivery?.token || initialToken;

      for (const file of batch) {
        if (file.size > 10 * 1024 * 1024) {
          message.error(`Ảnh "${file.name}" vượt quá giới hạn 10MB.`);
          continue;
        }

        const previewUrl = await compressImageFileToDataUrl(file);
        let remoteUrl = null;
        if (tokenToUse && !isOffline) {
          try {
            const uploaded = await deliveryService.uploadPublicProofPhoto(tokenToUse, file);
            remoteUrl = uploaded?.url || null;
          } catch {
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
    if (!isClaimed) {
      message.error('Vui lòng xác nhận Nhận chuyến trước khi nộp biên bản PoD.');
      return;
    }

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

    const tokenToUse = activeToken || delivery?.token || initialToken;

    if (isOffline) {
      const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]');
      queue.push({
        shareToken: tokenToUse || null,
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
      const response = tokenToUse
        ? await deliveryService.submitPublicProof(tokenToUse, payload)
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
      message.error(err.response?.data?.message || err.message || 'Lỗi khi nộp bằng chứng giao hàng.');
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

  // If no delivery loaded yet (e.g. driver opened bare /giao-hang-tai-xe without query params)
  if (!delivery && !loadError) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-[#e4dcd3] bg-white p-6 space-y-4">
          <div className="text-center space-y-1">
            <InboxOutlined className="text-4xl text-[#8c1524]" />
            <h1 className="text-lg font-bold text-[#231a18] m-0">Tôi là Tài xế Giao hàng</h1>
            <p className="text-xs text-[#6c625e]">
              Nhập mã chuyến giao hàng do xưởng cung ứng cung cấp để xem hàng cần giao và nộp PoD
            </p>
          </div>

          <div className="space-y-3">
            <Input
              size="large"
              placeholder="VD: DEL-2026-XXXX hoặc mã chuyến"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              onPressEnter={handleSearchByCode}
              className="text-center font-mono font-bold uppercase text-lg"
            />
            <Button
              type="primary"
              block
              size="large"
              loading={searchingCode}
              onClick={handleSearchByCode}
              className="bg-[#8c1524] h-11 font-semibold"
            >
              Tìm chuyến giao hàng
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-[#e4dcd3] bg-white p-6 space-y-4">
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
          />
          <div className="pt-2 border-t border-stone-100">
            <span className="text-xs text-stone-500 block mb-2 text-center">
              Hoặc nhập mã chuyến khác:
            </span>
            <Space.Compact className="w-full">
              <Input
                placeholder="Nhập mã chuyến (Trip code)"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                onPressEnter={handleSearchByCode}
                className="font-mono text-xs uppercase"
              />
              <Button type="primary" onClick={handleSearchByCode} loading={searchingCode}>
                Tìm
              </Button>
            </Space.Compact>
          </div>
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

  const phoneLink = delivery?.recipientPhone ? `tel:${delivery.recipientPhone}` : null;
  const mapsLink = delivery?.toAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(delivery.toAddress)}`
    : null;

  const batchDisplay = delivery?.batchNumber
    ? `Đợt ${delivery.batchNumber}${delivery.totalBatches ? `/${delivery.totalBatches}` : ''}`
    : 'Đợt 1';

  return (
    <div className="driver-pod-page">
      <div className="driver-pod-container space-y-3">
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
            <div className="flex items-center justify-end gap-1 mt-1">
              <Tag color="purple" className="m-0 text-[10px]">
                {batchDisplay}
              </Tag>
              <Tag color={statusMeta.color} className="m-0 text-[10px]">
                {statusMeta.text}
              </Tag>
            </div>
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

        {/* Khối 1: Thông tin đơn hàng (Không hiển thị giá) */}
        <Card className="rounded-2xl border-[#e4dcd3] bg-white" size="small">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div className="flex items-center gap-1.5">
                <FileTextOutlined className="text-[#8c1524]" />
                <span className="font-bold text-sm text-[#231a18]">Thông tin đơn hàng</span>
              </div>
              <Space size="small">
                <Tag color={delivery?.orderType === 'Contract' ? 'gold' : 'blue'} className="m-0 text-[11px]">
                  {delivery?.orderType === 'Contract' ? 'Hợp đồng' : 'Đơn sỉ'}
                </Tag>
                <Tag color="purple" className="m-0 text-[11px]">
                  {batchDisplay}
                </Tag>
              </Space>
            </div>

            <div className="space-y-1.5 text-xs text-[#6c625e]">
              <div>
                <span className="font-medium text-[#231a18]">Mã chứng từ:</span>{' '}
                <span className="font-mono font-semibold text-[#8c1524]">
                  {delivery?.contractNumber || delivery?.orderNumber || delivery?.referenceCode || delivery?.deliveryNumber}
                </span>
              </div>

              <div>
                <span className="font-medium text-[#231a18]">Doanh nghiệp nhận:</span>{' '}
                <span className="font-semibold text-stone-900">
                  {delivery?.recipientCompanyName || delivery?.customerName || 'Doanh nghiệp nhận'}
                </span>
              </div>

              <div>
                <span className="font-medium text-[#231a18]">Lịch hẹn giao:</span>{' '}
                <span className="font-medium text-amber-900">
                  {delivery?.scheduledDate || 'Đang cập nhật'}
                </span>
              </div>

              <div>
                <span className="font-medium text-[#231a18]">Người nhận tại kho:</span>{' '}
                {delivery?.recipientName || 'Thủ kho'} ({delivery?.recipientPhone || 'Chưa có SĐT'})
              </div>

              <div>
                <span className="font-medium text-[#231a18]">Địa chỉ giao:</span>{' '}
                <span className="text-[#231a18]">{delivery?.toAddress || 'Chưa có địa chỉ chi tiết'}</span>
              </div>

              {delivery?.notes && (
                <div className="rounded-lg bg-amber-50/70 p-2 text-amber-950 border border-amber-200/60 mt-1">
                  <span className="font-semibold">Ghi chú giao / đóng gói:</span> {delivery.notes}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
              <Button
                icon={<PhoneOutlined />}
                href={phoneLink}
                disabled={!phoneLink}
                className="text-[#2d5a43] border-[#2d5a43]"
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

        {/* Khối 2: Hàng cần giao (Không hiển thị giá) */}
        <Card className="rounded-2xl border-[#e4dcd3] bg-white" size="small">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div className="flex items-center gap-1.5 font-bold text-sm text-[#231a18]">
                <InboxOutlined className="text-[#9a6b16]" />
                <span>Hàng cần giao · {batchDisplay}</span>
              </div>
              <Tag color="purple">{delivery?.items?.length || 0} món</Tag>
            </div>

            {delivery?.items && delivery.items.length > 0 ? (
              <div className="divide-y divide-stone-100 rounded-xl border border-stone-200 bg-stone-50/50">
                {delivery.items.map((it, idx) => (
                  <div key={it.id || idx} className="flex items-center justify-between p-3 text-xs">
                    <div>
                      <div className="font-semibold text-stone-900 text-sm">{it.productName}</div>
                      {it.unit && <div className="text-stone-500">Đơn vị: {it.unit}</div>}
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-base text-[#8c1524]">
                        {it.quantity?.toLocaleString('vi-VN')}
                      </span>
                      <span className="text-stone-600 ml-1 font-medium">{it.unit || 'hộp'}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 text-center">
                Toàn bộ kiện hàng theo vận đơn {delivery?.trackingCode || 'xe xưởng'}.
              </div>
            )}
          </div>
        </Card>

        {/* Khối 3: Bước Nhận chuyến (trước khi chụp ảnh) */}
        <Card
          className="rounded-2xl border-[#e4dcd3] bg-white"
          size="small"
          title={
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-semibold text-[#231a18] flex items-center gap-1.5">
                <UserOutlined className="text-[#8c1524]" />
                <span>Tiếp nhận chuyến giao</span>
              </span>
              {isClaimed ? (
                <Tag color="green" icon={<CheckCircleOutlined />}>
                  Đã nhận chuyến
                </Tag>
              ) : (
                <Tag color="orange">Chưa nhận</Tag>
              )}
            </div>
          }
        >
          {isClaimed ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold text-sm">
                <CheckCircleOutlined className="text-emerald-600" />
                <span>Bạn đã nhận chuyến lúc {formatDateTime(delivery.driverClaimedAt)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-emerald-950 pt-1">
                <div>Tài xế: <strong>{delivery.driverName || '—'}</strong></div>
                <div>SĐT: <strong>{delivery.driverPhone || '—'}</strong></div>
                <div>Biển số: <strong>{delivery.vehiclePlate || 'Xe xưởng'}</strong></div>
                {delivery.shareCode && (
                  <div>Mã chuyến: <strong className="font-mono">{delivery.shareCode}</strong></div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Alert
                type="info"
                showIcon
                className="text-xs bg-amber-50/60 border-amber-200"
                message="Tài xế xác nhận thông tin để nhận chuyến trước khi chụp ảnh và bàn giao PoD."
              />

              {claimConflictError && (
                <Alert
                  type="error"
                  showIcon
                  className="text-xs"
                  message={claimConflictError}
                />
              )}

              <Form form={claimForm} layout="vertical" onFinish={handleClaimTrip} size="small">
                <Form.Item
                  name="driverName"
                  label="Họ và tên tài xế"
                  rules={[{ required: true, message: 'Vui lòng nhập tên tài xế' }]}
                >
                  <Input placeholder="VD: Nguyễn Văn Tuấn" />
                </Form.Item>

                <Form.Item
                  name="driverPhone"
                  label="Số điện thoại tài xế"
                  rules={[
                    { required: true, message: 'Vui lòng nhập SĐT tài xế' },
                    { pattern: /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/, message: 'SĐT không đúng định dạng VN' },
                  ]}
                >
                  <Input placeholder="VD: 0987654321" />
                </Form.Item>

                <Form.Item
                  name="vehiclePlate"
                  label="Biển số xe"
                  rules={[{ required: true, message: 'Vui lòng nhập biển số xe' }]}
                >
                  <Input placeholder="VD: 29C-123.45" />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={claiming}
                  className="bg-[#8c1524] h-10 font-semibold"
                >
                  Xác nhận Nhận Chuyến Giao
                </Button>
              </Form>
            </div>
          )}
        </Card>

        {/* Khóa các bước PoD nếu chưa nhận chuyến */}
        {!isClaimed && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-center space-y-1">
            <LockOutlined className="text-xl text-amber-700" />
            <div className="text-xs font-semibold text-amber-900">
              Quyền nộp PoD đang bị khóa
            </div>
            <div className="text-[11px] text-amber-800">
              Vui lòng hoàn thành bước <strong>Tiếp nhận chuyến giao</strong> ở trên để mở chức năng chụp ảnh và lấy chữ ký PoD.
            </div>
          </div>
        )}

        {/* Step 1: Multi-Photo Capture (Chỉ mở sau khi đã nhận chuyến) */}
        {isClaimed && (
          <>
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
                      <div key={photo.id} className="driver-pod-photo-item">
                        <img src={photo.previewUrl} alt={`Ảnh bàn giao ${index + 1}`} />
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
                    {photoUploading ? 'Đang xử lý ảnh…' : 'Chạm để chụp hoặc chọn ảnh bàn giao'}
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
                      {coords.lat ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : 'Chưa có GPS'}
                    </span>
                  )}
                </div>
              </div>
            </Card>

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
                  className="h-12 font-semibold bg-[#8c1524]"
                >
                  Xác nhận bàn giao &amp; nộp PoD
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
