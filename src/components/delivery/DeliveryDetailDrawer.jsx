import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  App,
  Button,
  Descriptions,
  Drawer,
  Empty,
  Form,
  Image,
  Input,
  Space,
  Spin,
  Tabs,
  Tag,
  Typography,
} from 'antd';
import {
  CameraOutlined,
  CheckCircleOutlined,
  CompassOutlined,
  EditOutlined,
  EnvironmentOutlined,
  LinkOutlined,
  PhoneOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  SendOutlined,
  ShareAltOutlined,
  TruckOutlined,
  UserOutlined,
} from '@ant-design/icons';
import deliveryService from '../../services/deliveryService';
import '../../styles/supplier-deliveries.css';

const { Text, Paragraph } = Typography;

const STATUS_META = {
  Pending: { text: 'Chờ xếp xe', color: 'default' },
  Confirmed: { text: 'Đã xác nhận', color: 'blue' },
  PickedUp: { text: 'Đã bốc lên xe', color: 'geekblue' },
  InTransit: { text: 'Đang vận chuyển', color: 'gold' },
  AwaitingCustomerConfirmation: { text: 'Chờ khách xác nhận nhận hàng', color: 'cyan' },
  Delivered: { text: 'Đã giao hàng (PoD)', color: 'green' },
  Disputed: { text: 'Đang khiếu nại PoD', color: 'red' },
  Failed: { text: 'Giao thất bại', color: 'red' },
  Returned: { text: 'Đã chuyển hoàn', color: 'volcano' },
};

const PROOF_TYPE_META = {
  Pickup: { text: 'Bốc hàng tại xưởng', color: 'blue' },
  InTransit: { text: 'Kiểm tra lộ trình', color: 'cyan' },
  Delivery: { text: 'Bàn giao thành công', color: 'green' },
  FailedAttempt: { text: 'Giao thất bại', color: 'red' },
};

const NEXT_STAGE_ACTION = {
  Pending: {
    status: 'Confirmed',
    label: 'Xác nhận xếp xe',
    notes: 'Xưởng xác nhận xếp xe.',
    primary: true,
  },
  Confirmed: {
    status: 'PickedUp',
    label: 'Bốc hàng lên xe',
    notes: 'Đã bốc hàng xong tại xưởng.',
    primary: false,
  },
  PickedUp: {
    status: 'InTransit',
    label: 'Xuất bến (In-Transit)',
    notes: 'Xe xuất bến bắt đầu vận chuyển.',
    primary: true,
  },
};

const formatDateTime = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString('vi-VN');
};

const errorText = (err, fallback) =>
  err?.response?.data?.message || err?.message || fallback;

/**
 * Right-hand drawer presenting complete delivery details, route overview,
 * editable carrier/tracking details, share-link status, and PoD inspection.
 */
export default function DeliveryDetailDrawer({
  open,
  delivery,
  onClose,
  onUpdated,
  onOpenShareModal,
}) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [savingCarrier, setSavingCarrier] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [editingCarrier, setEditingCarrier] = useState(false);
  const [detail, setDetail] = useState(null);
  const [shareLink, setShareLink] = useState(null);
  const [verifyingProofId, setVerifyingProofId] = useState(null);

  const deliveryId = delivery?.id || delivery?.key;

  const loadDetail = useCallback(
    async (silent = false) => {
      if (!deliveryId) return;
      if (!silent) setLoading(true);
      try {
        const [detailRes, shareRes] = await Promise.all([
          deliveryService.get(deliveryId),
          deliveryService.getShareLink(deliveryId).catch(() => null),
        ]);
        setDetail(detailRes);
        setShareLink(shareRes);
      } catch (err) {
        message.error(errorText(err, 'Không thể tải chi tiết chuyến giao hàng.'));
      } finally {
        setLoading(false);
      }
    },
    [deliveryId, message]
  );

  useEffect(() => {
    if (!open || !deliveryId) return undefined;
    let cancelled = false;
    Promise.resolve().then(() => {
      if (!cancelled) {
        setEditingCarrier(false);
        loadDetail();
      }
    });
    return () => {
      cancelled = true;
    };
  }, [open, deliveryId, loadDetail]);

  const current = detail || delivery;
  const proofs = Array.isArray(detail?.proofs) ? detail.proofs : [];
  const statusMeta = STATUS_META[current?.status] || {
    text: current?.status || 'Chưa xác định',
    color: 'default',
  };
  const nextAction = NEXT_STAGE_ACTION[current?.status];

  const handleOpenEditCarrier = () => {
    form.setFieldsValue({
      trackingCode: current?.trackingCode || '',
      recipientName: current?.recipientName || '',
      recipientPhone: current?.recipientPhone || '',
      fromAddress: current?.fromAddress || '',
      toAddress: current?.toAddress || '',
      notes: current?.notes || '',
    });
    setEditingCarrier(true);
  };

  const handleSaveCarrier = async (values) => {
    if (!deliveryId) return;
    try {
      setSavingCarrier(true);
      await deliveryService.updateCarrierInfo(deliveryId, values);
      message.success('Đã cập nhật thông tin vận chuyển.');
      setEditingCarrier(false);
      await loadDetail(true);
      onUpdated?.();
    } catch (err) {
      message.error(errorText(err, 'Không thể cập nhật thông tin vận chuyển.'));
    } finally {
      setSavingCarrier(false);
    }
  };

  const handleAdvanceStatus = async () => {
    if (!deliveryId || !nextAction) return;
    try {
      setUpdatingStatus(true);
      await deliveryService.updateStatus(
        deliveryId,
        nextAction.status,
        nextAction.notes
      );
      message.success(`Đã cập nhật trạng thái sang: ${nextAction.label}`);
      await loadDetail(true);
      onUpdated?.();
    } catch (err) {
      message.error(errorText(err, 'Không thể cập nhật trạng thái chuyến giao.'));
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleVerifyProof = async (proofId) => {
    try {
      setVerifyingProofId(proofId);
      const res = await deliveryService.verifyProof(proofId);
      if (res?.isVerified) {
        message.success('Bằng chứng PoD toàn vẹn (SHA-256 hợp lệ).');
      } else {
        message.warning('Bằng chứng chưa có chữ ký băm hợp lệ.');
      }
    } catch (err) {
      message.error(errorText(err, 'Không thể xác minh bằng chứng PoD.'));
    } finally {
      setVerifyingProofId(null);
    }
  };

  const overviewTab = (
    <div className="space-y-4">
      <div className="dd-route-box">
        <div className="dd-route-point">
          <div className="dd-route-point__label">
            <TruckOutlined />
            <span>Điểm xuất phát (Kho xưởng)</span>
          </div>
          <div className="dd-route-point__address">
            {current?.fromAddress || 'Chưa cập nhật địa chỉ xuất kho'}
          </div>
        </div>

        <div className="dd-route-point">
          <div className="dd-route-point__label">
            <EnvironmentOutlined />
            <span>Điểm giao hàng (Doanh nghiệp nhận)</span>
          </div>
          <div className="dd-route-point__address">
            {current?.toAddress || 'Chưa cập nhật địa chỉ giao'}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#6c625e]">
            <span className="inline-flex items-center gap-1">
              <UserOutlined className="text-[#9a6b16]" />
              {current?.recipientName || 'Thủ kho'}
            </span>
            {current?.recipientPhone && (
              <a
                href={`tel:${current.recipientPhone}`}
                className="inline-flex items-center gap-1 font-medium text-[#7d1322] hover:underline"
              >
                <PhoneOutlined />
                {current.recipientPhone}
              </a>
            )}
          </div>
        </div>
      </div>

      {editingCarrier ? (
        <div className="rounded-xl border border-[#e4dcd3] bg-[#faf7f2] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-[#231a18]">
              Cập nhật thông tin vận đơn &amp; người nhận
            </span>
            <Button size="small" onClick={() => setEditingCarrier(false)}>
              Hủy
            </Button>
          </div>
          <Form form={form} layout="vertical" onFinish={handleSaveCarrier} size="small">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Form.Item label="Mã vận đơn / Biển số xe" name="trackingCode">
                <Input placeholder="VD: 51H-88921 hoặc GHTK-9283" />
              </Form.Item>
              <Form.Item label="Tên người nhận tại kho" name="recipientName">
                <Input placeholder="Họ tên thủ kho / đại diện" />
              </Form.Item>
              <Form.Item label="Số điện thoại người nhận" name="recipientPhone">
                <Input placeholder="09xxxxxxxx" />
              </Form.Item>
              <Form.Item label="Địa chỉ xuất kho" name="fromAddress">
                <Input />
              </Form.Item>
            </div>
            <Form.Item label="Địa chỉ giao hàng" name="toAddress">
              <Input />
            </Form.Item>
            <Form.Item label="Ghi chú điều phối" name="notes">
              <Input.TextArea rows={2} />
            </Form.Item>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setEditingCarrier(false)}>Đóng</Button>
              <Button type="primary" htmlType="submit" loading={savingCarrier}>
                Lưu thông tin vận chuyển
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <Descriptions
          bordered
          size="small"
          column={1}
          labelStyle={{ width: 190, backgroundColor: '#faf7f2', color: '#6c625e' }}
        >
          <Descriptions.Item label="Chứng từ tham chiếu">
            <Space wrap size="small">
              <span className="font-mono font-semibold text-[#231a18]">
                {current?.orderNumber || current?.contractNumber || 'Đơn hàng B2B'}
              </span>
              {current?.orderNumber && <Tag>Đơn trực tiếp</Tag>}
              {current?.contractNumber && <Tag color="gold">Hợp đồng</Tag>}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Khách hàng / Doanh nghiệp">
            {current?.customerName || 'Khách hàng B2B'}
          </Descriptions.Item>
          <Descriptions.Item label="Hình thức vận chuyển">
            {current?.deliveryType === 'SelfArranged'
              ? 'Xe xưởng tự chở'
              : 'Đơn vị vận chuyển liên kết'}
          </Descriptions.Item>
          <Descriptions.Item label="Mã tracking / Biển số xe">
            <span className="font-mono text-xs">
              {current?.trackingCode || 'Xe xưởng nội bộ'}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="Ngày giao dự kiến">
            <span className="tabular-nums">
              {current?.scheduledDate || 'Chưa ấn định'}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="Ngày giao thực tế">
            <span className="tabular-nums">
              {current?.actualDeliveryDate || 'Chưa hoàn tất'}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="Cập nhật lần cuối">
            <span className="tabular-nums">
              {formatDateTime(current?.updatedAt || current?.createdAt)}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="Ghi chú vận chuyển">
            {current?.notes || 'Không có ghi chú thêm'}
          </Descriptions.Item>
        </Descriptions>
      )}

      <div className="rounded-xl border border-[#e4dcd3] bg-[#faf7f2] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#231a18]">
              <LinkOutlined className="text-[#7d1322]" />
              <span>Liên kết PoD công khai cho tài xế</span>
              {shareLink?.isActive ? (
                <Tag color="green">Đang hoạt động</Tag>
              ) : shareLink?.isRevoked ? (
                <Tag color="red">Đã thu hồi</Tag>
              ) : shareLink?.isExpired ? (
                <Tag color="orange">Đã hết hạn</Tag>
              ) : (
                <Tag>Chưa cấp link</Tag>
              )}
            </div>
            <div className="mt-1 text-xs text-[#6c625e]">
              {shareLink?.isActive
                ? `Liên kết hết hạn lúc ${formatDateTime(shareLink.expiresAtUtc)}.`
                : 'Cấp liên kết có thời hạn để tài xế chụp ảnh và lấy chữ ký PoD không cần đăng nhập.'}
            </div>
          </div>
          <Button
            icon={<ShareAltOutlined />}
            onClick={() => onOpenShareModal?.(current)}
          >
            {shareLink?.isActive ? 'Quản lý / Reshare link' : 'Tạo link tài xế'}
          </Button>
        </div>
      </div>
    </div>
  );

  const proofsTab =
    proofs.length === 0 ? (
      <Empty description="Chưa có bằng chứng PoD nào được nộp cho chuyến giao này." />
    ) : (
      <div>
        {proofs.map((proof, index) => {
          const typeMeta = PROOF_TYPE_META[proof.proofType] || {
            text: proof.proofType,
            color: 'default',
          };
          const mapsUrl =
            proof.locationLat && proof.locationLng
              ? `https://www.google.com/maps?q=${proof.locationLat},${proof.locationLng}`
              : null;

          return (
            <div key={proof.id || index} className="dd-proof-card">
              <div className="dd-proof-card__header">
                <Space wrap size="small">
                  <Tag color={typeMeta.color}>{typeMeta.text}</Tag>
                  <Text type="secondary" className="text-xs tabular-nums">
                    {formatDateTime(proof.takenAt)}
                  </Text>
                </Space>

                <Space size="small">
                  <Tag
                    icon={<SafetyCertificateOutlined />}
                    color={proof.isVerified ? 'success' : 'default'}
                  >
                    {proof.isVerified ? 'Đã băm SHA-256' : 'Chưa xác minh'}
                  </Tag>
                  {proof.id && (
                    <Button
                      size="small"
                      loading={verifyingProofId === proof.id}
                      onClick={() => handleVerifyProof(proof.id)}
                    >
                      Kiểm tra toàn vẹn
                    </Button>
                  )}
                </Space>
              </div>

              <div className="dd-proof-media">
                <div>
                  <Text className="mb-1.5 block text-xs font-medium text-[#6c625e]">
                    Ảnh hiện trường bàn giao
                  </Text>
                  <div className="dd-proof-box">
                    {proof.photoUrl ? (
                      <Image
                        src={proof.photoUrl}
                        alt={`Ảnh bằng chứng ${index + 1}`}
                        className="max-h-44 rounded object-contain"
                      />
                    ) : (
                      <Text type="secondary" className="text-xs">
                        Không có ảnh
                      </Text>
                    )}
                  </div>
                </div>

                <div>
                  <Text className="mb-1.5 block text-xs font-medium text-[#6c625e]">
                    Chữ ký người nhận hàng
                  </Text>
                  <div className="dd-proof-box">
                    {proof.signatureUrl ? (
                      <Image
                        src={proof.signatureUrl}
                        alt={`Chữ ký bàn giao ${index + 1}`}
                        className="max-h-36 rounded object-contain"
                      />
                    ) : (
                      <Text type="secondary" className="text-xs italic">
                        Không có chữ ký đính kèm
                      </Text>
                    )}
                  </div>
                </div>
              </div>

              <Descriptions
                size="small"
                column={1}
                bordered
                labelStyle={{ width: 150, backgroundColor: '#faf7f2', color: '#6c625e' }}
              >
                <Descriptions.Item label="Người ký / nộp">
                  {proof.takenBy || 'Tài xế giao hàng'}
                </Descriptions.Item>
                <Descriptions.Item label="Tọa độ GPS">
                  {mapsUrl ? (
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs text-[#7d1322] hover:underline"
                    >
                      <CompassOutlined />
                      {Number(proof.locationLat).toFixed(4)},{' '}
                      {Number(proof.locationLng).toFixed(4)} (Mở Google Maps)
                    </a>
                  ) : (
                    'Không có dữ liệu GPS'
                  )}
                </Descriptions.Item>
                {proof.notes && (
                  <Descriptions.Item label="Ghi chú">{proof.notes}</Descriptions.Item>
                )}
                {proof.tamperProofHash && (
                  <Descriptions.Item label="Mã băm SHA-256">
                    <Paragraph
                      copyable
                      className="m-0 font-mono text-[11px] break-all text-[#6c625e]"
                    >
                      {proof.tamperProofHash}
                    </Paragraph>
                  </Descriptions.Item>
                )}
              </Descriptions>
            </div>
          );
        })}
      </div>
    );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      width={720}
      destroyOnClose={false}
      title={
        <div className="flex items-center gap-2 text-[#231a18]">
          <TruckOutlined className="text-[#7d1322]" />
          <span>Chi tiết chuyến giao hàng</span>
        </div>
      }
      extra={
        <Button
          size="small"
          icon={<ReloadOutlined />}
          onClick={() => loadDetail()}
          loading={loading}
        >
          Làm mới
        </Button>
      }
    >
      {loading && !detail ? (
        <div className="flex justify-center py-16">
          <Spin />
        </div>
      ) : !current ? (
        <Empty description="Không tìm thấy thông tin chuyến giao." />
      ) : (
        <div>
          <div className="dd-drawer-summary">
            <div className="dd-drawer-summary__top">
              <div>
                <div className="dd-drawer-summary__code">
                  {current.deliveryNumber}
                </div>
                <div className="mt-1 text-xs text-[#6c625e]">
                  {current.orderNumber
                    ? `Đơn hàng: ${current.orderNumber}`
                    : current.contractNumber
                      ? `Hợp đồng: ${current.contractNumber}`
                      : 'Chứng từ B2B'}{' '}
                  · {current.customerName || 'Doanh nghiệp nhận'}
                </div>
              </div>

              <Tag color={statusMeta.color}>{statusMeta.text}</Tag>
            </div>

            {current.status === 'Disputed' && (
              <Alert
                type="error"
                showIcon
                className="mt-3 text-xs"
                message="Chuyến giao này đang có khiếu nại PoD từ khách hàng. Bạn có thể chia sẻ lại link cho tài xế bổ sung chứng từ hoặc phối hợp xử lý trên trang đơn hàng."
              />
            )}

            {current.status === 'AwaitingCustomerConfirmation' && (
              <Alert
                type="info"
                showIcon
                className="mt-3 text-xs"
                message="Đã có bằng chứng bàn giao. Chuyến giao đang chờ khách hàng xác nhận đã nhận hàng."
              />
            )}

            <div className="dd-drawer-summary__actions">
              {nextAction && (
                <Button
                  type={nextAction.primary ? 'primary' : 'default'}
                  icon={
                    nextAction.status === 'InTransit' ? (
                      <SendOutlined />
                    ) : (
                      <CheckCircleOutlined />
                    )
                  }
                  loading={updatingStatus}
                  onClick={handleAdvanceStatus}
                >
                  {nextAction.label}
                </Button>
              )}

              {current.status !== 'Delivered' && current.status !== 'Returned' && (
                <Button
                  icon={<EditOutlined />}
                  onClick={handleOpenEditCarrier}
                >
                  Sửa vận đơn &amp; người nhận
                </Button>
              )}

              <Button
                icon={<ShareAltOutlined />}
                onClick={() => onOpenShareModal?.(current)}
              >
                Tài xế PoD
              </Button>
            </div>
          </div>

          <Tabs
            defaultActiveKey="overview"
            items={[
              {
                key: 'overview',
                label: 'Tổng quan & lộ trình',
                children: overviewTab,
              },
              {
                key: 'proofs',
                label: (
                  <span className="inline-flex items-center gap-1.5">
                    <CameraOutlined />
                    <span>Bằng chứng PoD ({proofs.length})</span>
                  </span>
                ),
                children: proofsTab,
              },
            ]}
          />
        </div>
      )}
    </Drawer>
  );
}
