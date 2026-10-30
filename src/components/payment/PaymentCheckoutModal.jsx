import { useState } from 'react';
import { Modal, Radio, Alert, message, Tag, Space, Card } from 'antd';
import {
  CreditCardOutlined,
  QrcodeOutlined,
  DollarCircleOutlined,
  SafetyCertificateOutlined,
  ThunderboltFilled,
} from '@ant-design/icons';
import paymentService from '../../services/paymentService';

export default function PaymentCheckoutModal({
  open,
  onClose,
  title = null,
  order = null,
  contract = null,
  milestone = null,
  onSuccess,
  onOpenVietQr,
}) {
  const [selectedMethod, setSelectedMethod] = useState('vnpay');
  const [loading, setLoading] = useState(false);

  const amount = Number(order?.totalAmount ?? milestone?.amount ?? 0);
  const isOrder = Boolean(order?.id);
  const isContract = Boolean(contract?.id && milestone?.id);
  const packagingFee = Number(order?.packagingFee ?? 0);

  // COD limitations
  const COD_LIMIT = 10000000;
  const isCodDisabled = isContract || amount > COD_LIMIT || packagingFee > 0;
  let codDisableReason = '';
  if (isContract) {
    codDisableReason = 'COD không áp dụng cho hợp đồng ký quỹ sản xuất.';
  } else if (amount > COD_LIMIT) {
    codDisableReason = `Hạn mức COD tối đa 10.000.000 đ. Đơn này (${amount.toLocaleString('vi-VN')} đ) cần thanh toán trả trước.`;
  } else if (packagingFee > 0) {
    codDisableReason = 'Đơn hàng có thiết kế bao bì riêng yêu cầu thanh toán trước.';
  }

  const handleConfirm = async () => {
    try {
      setLoading(true);

      if (selectedMethod === 'vnpay') {
        let res;
        const returnUrl = `${window.location.origin}/#thanh-toan/ket-qua`;
        if (isOrder) {
          res = await paymentService.createOrderVnPayUrl(order.id, returnUrl);
        } else if (isContract) {
          res = await paymentService.createContractVnPayUrl(contract.id, milestone.id, returnUrl);
        } else {
          message.error('Thông tin thanh toán không hợp lệ.');
          return;
        }

        if (res?.paymentUrl) {
          message.loading('Đang chuyển hướng sang cổng thanh toán VNPay Sandbox...', 1.5);
          setTimeout(() => {
            window.location.href = res.paymentUrl;
          }, 600);
        } else {
          message.error('Không thể tạo liên kết VNPay.');
        }
      } else if (selectedMethod === 'bank_transfer') {
        const payload = {
          orderId: order?.id || null,
          contractId: contract?.id || null,
          milestoneId: milestone?.id || null,
          amount,
        };
        const res = await paymentService.createBankTransfer(payload);
        message.success('Đã tạo lệnh chuyển khoản VietQR thành công!');
        onClose();
        if (onOpenVietQr) {
          onOpenVietQr(res);
        }
      } else if (selectedMethod === 'cod') {
        if (isCodDisabled) {
          message.error(codDisableReason);
          return;
        }
        await paymentService.create({
          orderId: order.id,
          method: 'Cash',
          amount,
        });
        message.success('Đã chọn thanh toán COD khi nhận hàng.');
        onSuccess?.();
        onClose();
      }
    } catch (err) {
      message.error(err.response?.data?.message || err.message || 'Thanh toán thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <SafetyCertificateOutlined style={{ color: '#d97706', fontSize: 20 }} />
          <span style={{ fontWeight: 700, fontSize: 16 }}>
            {title ? `${title} - Cổng Thanh Toán B2B An Toàn` : 'Cổng Thanh Toán B2B An Toàn (SafeTrade)'}
          </span>
        </div>
      }
      open={open}
      onCancel={onClose}
      onOk={handleConfirm}
      okText={selectedMethod === 'vnpay' ? 'Thanh toán qua VNPay' : selectedMethod === 'bank_transfer' ? 'Tạo mã VietQR' : 'Xác nhận đặt COD'}
      cancelText="Đóng"
      confirmLoading={loading}
      width={560}
      centered
      okButtonProps={{ style: { background: 'linear-gradient(to right, #d97706, #b45309)', borderColor: '#d97706', fontWeight: 600 } }}
    >
      <div style={{ padding: '8px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Order / Contract Summary Card */}
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#57534e', marginBottom: 4 }}>
            <span>{isOrder ? 'Mã Đơn hàng:' : 'Hợp đồng / Mốc:'}</span>
            <span style={{ fontWeight: 600, color: '#1c1917' }}>
              {isOrder ? order?.orderNumber : `${contract?.contractNumber || ''} - ${milestone?.name || ''}`}
            </span>
          </div>
          {milestone?.paymentNumber && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#57534e', marginBottom: 4 }}>
              <span>Mã thanh toán:</span>
              <span style={{ fontWeight: 600, color: '#1c1917' }}>{milestone.paymentNumber}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #fef3c7', paddingTop: 8, marginTop: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#44403c' }}>Tổng thanh toán:</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#b45309' }}>
              {amount.toLocaleString('vi-VN')} <span style={{ fontSize: 13, fontWeight: 400 }}>VNĐ</span>
            </span>
          </div>
        </div>

        {/* Method Selection Radio Group */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', color: '#78716c', marginBottom: 8, textTransform: 'uppercase' }}>
            Chọn Phương Thức Thanh Toán
          </div>
          <Radio.Group
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}
          >
            {/* Method 1: VNPay Sandbox */}
            <Card
              size="small"
              style={{
                cursor: 'pointer',
                borderRadius: 12,
                border: selectedMethod === 'vnpay' ? '1.5px solid #d97706' : '1px solid #e7e5e4',
                background: selectedMethod === 'vnpay' ? '#fffbeb' : '#ffffff',
              }}
              onClick={() => setSelectedMethod('vnpay')}
            >
              <Radio value="vnpay">
                <Space>
                  <CreditCardOutlined style={{ color: '#2563eb', fontSize: 16 }} />
                  <span style={{ fontWeight: 600, color: '#1c1917' }}>Cổng VNPay Sandbox</span>
                  <Tag color="gold" style={{ fontSize: 11, fontWeight: 600, borderColor: '#fcd34d' }}>
                    <ThunderboltFilled style={{ marginRight: 4 }} /> Tức thời • Đề xuất
                  </Tag>
                </Space>
              </Radio>
              <p style={{ margin: '4px 0 0 24px', fontSize: 12, color: '#78716c', lineHeight: 1.5 }}>
                Hỗ trợ thẻ ATM nội địa 40+ ngân hàng, quét VNPAY-QR, thẻ Visa/Mastercard (Môi trường Sandbox).
              </p>
            </Card>

            {/* Method 2: VietQR MB Bank */}
            <Card
              size="small"
              style={{
                cursor: 'pointer',
                borderRadius: 12,
                border: selectedMethod === 'bank_transfer' ? '1.5px solid #d97706' : '1px solid #e7e5e4',
                background: selectedMethod === 'bank_transfer' ? '#fffbeb' : '#ffffff',
              }}
              onClick={() => setSelectedMethod('bank_transfer')}
            >
              <Radio value="bank_transfer">
                <Space orientation="horizontal">
                  <QrcodeOutlined style={{ color: '#059669', fontSize: 16 }} />
                  <span style={{ fontWeight: 600, color: '#1c1917' }}>Chuyển khoản VietQR (MB Bank 24/7)</span>
                  <Tag color="cyan" style={{ fontSize: 11, fontWeight: 600 }}>
                    Ký quỹ Escrow
                  </Tag>
                </Space>
              </Radio>
              <p style={{ margin: '4px 0 0 24px', fontSize: 12, color: '#78716c', lineHeight: 1.5 }}>
                Tạo mã VietQR động tự điền số tiền và nội dung. Tiền được lưu an toàn tại tài khoản ký quỹ sàn.
              </p>
            </Card>

            {/* Method 3: COD */}
            <Card
              size="small"
              style={{
                cursor: isCodDisabled ? 'not-allowed' : 'pointer',
                borderRadius: 12,
                opacity: isCodDisabled ? 0.6 : 1,
                border: selectedMethod === 'cod' ? '1.5px solid #d97706' : '1px solid #e7e5e4',
                background: selectedMethod === 'cod' ? '#fffbeb' : '#ffffff',
              }}
              onClick={() => !isCodDisabled && setSelectedMethod('cod')}
            >
              <Radio value="cod" disabled={isCodDisabled}>
                <Space>
                  <DollarCircleOutlined style={{ color: '#b45309', fontSize: 16 }} />
                  <span style={{ fontWeight: 600, color: '#1c1917' }}>Thanh toán khi nhận hàng (COD)</span>
                </Space>
              </Radio>
              <p style={{ margin: '4px 0 0 24px', fontSize: 12, color: '#78716c', lineHeight: 1.5 }}>
                Thanh toán bằng tiền mặt khi shipper giao hàng tận nơi.
              </p>
              {isCodDisabled && (
                <p style={{ margin: '4px 0 0 24px', fontSize: 11, color: '#e11d48', fontWeight: 500 }}>
                  &bull; {codDisableReason}
                </p>
              )}
            </Card>
          </Radio.Group>
        </div>

        <Alert
          type="info"
          showIcon
          style={{ fontSize: 12, background: '#fafaf9', border: '1px solid #e7e5e4', borderRadius: 8 }}
          message={
            <span>
              Mọi khoản thanh toán đều được bảo chứng minh bạch qua cơ chế <strong>SafeTrade Escrow</strong>. Tiền chỉ giải ngân cho Xưởng sau khi bạn ký nhận PoD hoặc nghiệm thu mốc hoàn tất.
            </span>
          }
        />
      </div>
    </Modal>
  );
}
