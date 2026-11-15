import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  QRCode,
  Space,
  Tag,
  Typography,
  message,
} from 'antd';
import {
  CarOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  SendOutlined,
  UserOutlined,
} from '@ant-design/icons';
import deliveryService from '../../services/deliveryService';

const { Text } = Typography;

const formatDateTime = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString('vi-VN');
};

const copyToClipboard = async (text) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

export default function AssignDriverModal({ open, onClose, delivery, onSuccess }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [revoking, setRevoking] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [assignedData, setAssignedData] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  const deliveryId = delivery?.id || delivery?.key;
  const hasExistingDriver = Boolean(delivery?.driverName || assignedData?.driver?.driverName);

  useEffect(() => {
    let ignore = false;
    Promise.resolve().then(() => {
      if (ignore) return;
      if (!open) {
        setIsEditing(false);
        setAssignedData(null);
        setCopiedKey(null);
        form.resetFields();
        return;
      }

      if (delivery?.driverName) {
        setAssignedData({
          token: delivery.token || delivery.shareToken || null,
          shareCode: delivery.shareCode || '',
          driver: {
            driverName: delivery.driverName,
            driverPhone: delivery.driverPhone,
            vehiclePlate: delivery.vehiclePlate,
            driverClaimedAt: delivery.driverClaimedAt,
          },
        });
        setIsEditing(false);
      } else {
        setAssignedData(null);
        setIsEditing(true);
      }

      form.setFieldsValue({
        driverName: delivery?.driverName || '',
        driverPhone: delivery?.driverPhone || '',
        vehiclePlate: delivery?.vehiclePlate || '',
      });
    });
    return () => {
      ignore = true;
    };
  }, [delivery, form, open]);

  const shareCode = assignedData?.shareCode || delivery?.shareCode || '';
  const token = assignedData?.token || delivery?.token || delivery?.shareToken || '';
  const shareUrl = useMemo(() => {
    if (token) {
      return `${window.location.origin}/giao-hang-tai-xe?token=${encodeURIComponent(token)}`;
    }
    if (shareCode) {
      return `${window.location.origin}/giao-hang-tai-xe?code=${encodeURIComponent(shareCode)}`;
    }
    return '';
  }, [token, shareCode]);

  const templateMessage = useMemo(() => {
    const codePart = shareCode ? `nhập mã ${shareCode}` : 'nhập mã chuyến giao';
    const linkPart = shareUrl ? `, hoặc mở link ${shareUrl}` : '';
    return `Mở app Mooncake → Tôi là tài xế → ${codePart}${linkPart}`;
  }, [shareCode, shareUrl]);

  const handleCopy = async (key, text, successMsg) => {
    if (!text) return;
    try {
      await copyToClipboard(text);
      setCopiedKey(key);
      message.success(successMsg);
      window.setTimeout(() => {
        setCopiedKey((prev) => (prev === key ? null : prev));
      }, 2500);
    } catch {
      message.error('Không thể sao chép văn bản.');
    }
  };

  const handleAssign = async (values) => {
    if (!deliveryId) return;
    setLoading(true);
    try {
      const response = await deliveryService.assignDriver(deliveryId, {
        driverName: values.driverName.trim(),
        driverPhone: values.driverPhone.trim(),
        vehiclePlate: values.vehiclePlate?.trim() || null,
      });

      setAssignedData(response);
      setIsEditing(false);
      message.success('Đã gán tài xế cho chuyến giao thành công!');
      onSuccess?.();
    } catch (err) {
      message.error(err.response?.data?.message || err.message || 'Lỗi khi gán tài xế.');
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeDriver = async () => {
    if (!deliveryId) return;
    setRevoking(true);
    try {
      await deliveryService.revokeDriver(deliveryId);
      message.success('Đã gỡ tài xế. Mã chuyến và liên kết cũ đã hết hiệu lực.');
      setAssignedData(null);
      setIsEditing(true);
      form.resetFields();
      onSuccess?.();
    } catch (err) {
      message.error(err.response?.data?.message || err.message || 'Lỗi khi gỡ tài xế.');
    } finally {
      setRevoking(false);
    }
  };

  const activeDriver = assignedData?.driver || {
    driverName: delivery?.driverName,
    driverPhone: delivery?.driverPhone,
    vehiclePlate: delivery?.vehiclePlate,
    driverClaimedAt: delivery?.driverClaimedAt,
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={560}
      centered
      title={
        <div className="flex items-center gap-2 text-[#231a18]">
          <CarOutlined className="text-[#8c1524]" />
          <span>Gán tài xế &amp; Mã chuyến giao hàng</span>
        </div>
      }
    >
      <div className="py-2 space-y-4">
        {delivery && (
          <div className="rounded-xl border border-[#e4dcd3] bg-[#faf8f6] p-3 text-xs text-[#6c625e] flex items-center justify-between">
            <div>
              <span className="font-semibold text-[#8c1524]">
                {delivery.deliveryNumber || 'Chuyến giao'}
              </span>
              <span className="mx-1.5">·</span>
              <span>{delivery.orderNumber || delivery.contractNumber || 'B2B'}</span>
            </div>
            <div>
              <span className="font-medium text-[#231a18]">Người nhận:</span>{' '}
              {delivery.recipientName || 'Thủ kho'} ({delivery.recipientPhone || '—'})
            </div>
          </div>
        )}

        {isEditing ? (
          <div>
            {hasExistingDriver && (
              <Alert
                type="warning"
                showIcon
                icon={<ExclamationCircleOutlined />}
                className="mb-4 text-xs bg-amber-50/70 border-amber-300"
                message="Cảnh báo: Đổi/gỡ tài xế sẽ làm mã chuyến và liên kết cũ hết hiệu lực ngay lập tức."
              />
            )}

            <Form form={form} layout="vertical" onFinish={handleAssign}>
              <Form.Item
                name="driverName"
                label="Họ và tên tài xế"
                rules={[{ required: true, message: 'Vui lòng nhập tên tài xế' }]}
              >
                <Input prefix={<UserOutlined className="text-[#9a6b16]" />} placeholder="VD: Nguyễn Văn Tuấn" />
              </Form.Item>

              <Form.Item
                name="driverPhone"
                label="Số điện thoại tài xế"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại tài xế' },
                  { pattern: /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/, message: 'Số điện thoại không đúng định dạng VN' },
                ]}
              >
                <Input placeholder="VD: 0987654321" />
              </Form.Item>

              <Form.Item
                name="vehiclePlate"
                label="Biển số xe / Phương tiện vận chuyển"
                rules={[{ required: false }]}
              >
                <Input placeholder="VD: 29C-123.45 hoặc 51H-9876" />
              </Form.Item>

              <div className="flex items-center justify-end gap-2 pt-2">
                {hasExistingDriver && (
                  <Button onClick={() => setIsEditing(false)}>
                    Hủy sửa
                  </Button>
                )}
                <Button type="primary" htmlType="submit" loading={loading} className="bg-[#8c1524]">
                  {hasExistingDriver ? 'Lưu & Cấp lại mã chuyến' : 'Xác nhận gán tài xế'}
                </Button>
              </div>
            </Form>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-2xl border-2 border-[#d48806]/40 bg-[#fffdf9] p-4 text-center space-y-2">
              <div className="text-xs uppercase tracking-wider text-[#9a6b16] font-semibold">
                Mã chuyến giao hàng (Trip Code)
              </div>
              <div className="text-3xl font-extrabold tracking-widest text-[#8c1524] select-all font-mono py-1">
                {shareCode || 'CHƯA CẤP'}
              </div>
              <div className="text-xs text-[#6c625e]">
                Chữ số to, dễ đọc và đọc to qua điện thoại cho tài xế nhập trên app Mooncake
              </div>
              {shareCode && (
                <div>
                  <Button
                    size="small"
                    icon={copiedKey === 'code' ? <CheckOutlined /> : <CopyOutlined />}
                    onClick={() => handleCopy('code', shareCode, 'Đã sao chép mã chuyến.')}
                  >
                    {copiedKey === 'code' ? 'Đã chép mã' : 'Sao chép mã chuyến'}
                  </Button>
                </div>
              )}
            </div>

            {shareUrl && (
              <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#e4dcd3] bg-white">
                <Text className="text-xs font-semibold text-[#231a18] mb-2">
                  Quét mã QR để mở link web giao hàng trên điện thoại
                </Text>
                <QRCode
                  value={shareUrl}
                  size={170}
                  bordered={false}
                  color="#8c1524"
                />
                <Text type="secondary" className="text-[11px] mt-2">
                  Link công khai (ẩn danh) không cần tài khoản đăng nhập
                </Text>
              </div>
            )}

            {shareUrl && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#6c625e]">
                  Liên kết web cho tài xế (/giao-hang-tai-xe)
                </label>
                <Space.Compact className="w-full">
                  <Input readOnly value={shareUrl} className="font-mono text-xs" />
                  <Button
                    type="primary"
                    icon={copiedKey === 'url' ? <CheckOutlined /> : <CopyOutlined />}
                    onClick={() => handleCopy('url', shareUrl, 'Đã sao chép liên kết web.')}
                  >
                    {copiedKey === 'url' ? 'Đã chép' : 'Chép link'}
                  </Button>
                </Space.Compact>
              </div>
            )}

            <div className="rounded-xl border border-[#dce6dd] bg-[#f6f9f7] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#2d5a43] flex items-center gap-1.5">
                  <SendOutlined /> Tin nhắn mẫu gửi tài xế (SMS / Zalo)
                </span>
                <Button
                  size="small"
                  type="primary"
                  icon={copiedKey === 'message' ? <CheckOutlined /> : <CopyOutlined />}
                  onClick={() => handleCopy('message', templateMessage, 'Đã sao chép tin nhắn mẫu.')}
                  className="bg-[#2d5a43] border-[#2d5a43]"
                >
                  {copiedKey === 'message' ? 'Đã sao chép' : 'Sao chép tin nhắn mẫu'}
                </Button>
              </div>
              <div className="rounded-lg bg-white p-2.5 text-xs text-[#231a18] border border-[#e4dcd3] font-mono leading-relaxed select-all">
                {templateMessage}
              </div>
            </div>

            <div className="rounded-xl border border-[#e4dcd3] bg-[#faf8f6] p-3 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#231a18] flex items-center gap-1">
                  <UserOutlined className="text-[#8c1524]" /> Thông tin tài xế đã gán
                </span>
                {activeDriver?.driverClaimedAt ? (
                  <Tag color="green" icon={<CheckCircleOutlined />}>
                    Đã nhận lúc {formatDateTime(activeDriver.driverClaimedAt)}
                  </Tag>
                ) : (
                  <Tag color="orange" icon={<ClockCircleOutlined />}>
                    Chưa có tài xế nhận
                  </Tag>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 text-[#6c625e]">
                <div>Họ tên: <strong className="text-[#231a18]">{activeDriver?.driverName || '—'}</strong></div>
                <div>SĐT: <strong className="text-[#231a18]">{activeDriver?.driverPhone || '—'}</strong></div>
                <div>Biển số xe: <strong className="text-[#231a18]">{activeDriver?.vehiclePlate || 'Xe xưởng'}</strong></div>
                <div>Hạn link: <strong className="text-[#231a18]">{formatDateTime(assignedData?.expiresAt)}</strong></div>
              </div>
            </div>

            <Alert
              type="info"
              showIcon
              className="text-xs bg-[#faf8f6] border-[#e4dcd3]"
              message="Đổi hoặc gỡ tài xế sẽ lập tức vô hiệu hóa mã chuyến và liên kết cũ để tránh xung đột nhận chuyến."
            />

            <Divider className="my-2" />

            <div className="flex items-center justify-between">
              <Popconfirm
                title="Gỡ tài xế khỏi chuyến giao này?"
                description="Mã chuyến và liên kết cũ sẽ hết hiệu lực ngay lập tức."
                okText="Xác nhận gỡ"
                cancelText="Hủy"
                okButtonProps={{ danger: true, loading: revoking }}
                onConfirm={handleRevokeDriver}
              >
                <Button danger size="small" icon={<DeleteOutlined />} loading={revoking}>
                  Gỡ tài xế
                </Button>
              </Popconfirm>

              <Space>
                <Button
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => setIsEditing(true)}
                >
                  Đổi tài xế
                </Button>
                <Button size="small" type="primary" onClick={onClose}>
                  Hoàn tất
                </Button>
              </Space>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
