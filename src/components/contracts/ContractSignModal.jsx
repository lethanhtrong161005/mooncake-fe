import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Descriptions,
  Divider,
  Input,
  Modal,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import contractService from '../../services/contractService';

const { Paragraph, Text } = Typography;

const money = (amount) => `${Number(amount || 0).toLocaleString('vi-VN')} ₫`;
const formatDateTime = (val) => (val ? dayjs(val).format('HH:mm DD/MM/YYYY') : null);

const parseContractTerms = (value) => {
  if (value && typeof value === 'object') return value;
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
};

export default function ContractSignModal({
  open,
  onClose,
  onSuccess,
  contract,
  role = 'Customer',
}) {
  const [confirmTerms, setConfirmTerms] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [requestingOtp, setRequestingOtp] = useState(false);
  const [signing, setSigning] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return undefined;
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const resetState = () => {
    setConfirmTerms(false);
    setOtpCode('');
    setRequestingOtp(false);
    setSigning(false);
    setCountdown(0);
    setOtpSent(false);
  };

  const handleClose = () => {
    resetState();
    onClose?.();
  };

  if (!contract) return null;

  const supplierSignedText = contract.signedBySupplierAt
    ? `Xưởng đã ký lúc ${formatDateTime(contract.signedBySupplierAt)}`
    : 'Đang chờ xưởng ký';
  const customerSignedText = contract.signedByCustomerAt
    ? `Khách đã ký lúc ${formatDateTime(contract.signedByCustomerAt)}`
    : 'Chờ khách ký';

  const mySignedAt = role === 'Customer' ? contract.signedByCustomerAt : contract.signedBySupplierAt;
  const partnerSignedText = role === 'Customer' ? supplierSignedText : customerSignedText;
  const myStatusText = mySignedAt
    ? `Bạn đã ký lúc ${formatDateTime(mySignedAt)}`
    : 'Chờ bạn ký';

  const termsObj = parseContractTerms(contract.termsAndConditions);
  const items = Array.isArray(termsObj?.Items) ? termsObj.Items : [];

  const handleRequestOtp = async () => {
    setRequestingOtp(true);
    try {
      await contractService.requestSignatureOtp(contract.id);
      setOtpSent(true);
      setCountdown(60);
      message.success('Mã OTP ký hợp đồng đã được gửi đến email đăng ký của bạn. Vui lòng kiểm tra hộp thư.');
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Không thể gửi mã OTP. Vui lòng thử lại.';
      message.error(msg);
    } finally {
      setRequestingOtp(false);
    }
  };

  const handleSign = async () => {
    if (!confirmTerms) {
      message.warning('Vui lòng tích chọn đồng ý với điều khoản hợp đồng trước khi ký.');
      return;
    }
    const cleanOtp = otpCode.trim();
    if (!cleanOtp) {
      message.warning('Vui lòng nhập mã OTP đã nhận qua email.');
      return;
    }

    setSigning(true);
    try {
      await contractService.sign(contract.id, cleanOtp, true);
      message.success(`Ký hợp đồng ${contract.contractNumber} thành công!`);
      resetState();
      onSuccess?.();
      onClose?.();
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Ký hợp đồng thất bại. Vui lòng kiểm tra lại mã OTP.';
      message.error(msg);
    } finally {
      setSigning(false);
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <SafetyCertificateOutlined style={{ color: '#8c1524', fontSize: 20 }} />
          <span>Ký Hợp Đồng Kinh Tế Điện Tử · {contract.contractNumber}</span>
        </div>
      }
      open={open}
      onCancel={handleClose}
      width={780}
      centered
      destroyOnHidden
      footer={[
        <Button key="cancel" onClick={handleClose} disabled={signing}>
          Đóng
        </Button>,
        <Button
          key="sign"
          type="primary"
          style={{ background: '#8c1524', borderColor: '#8c1524' }}
          icon={<SafetyCertificateOutlined />}
          loading={signing}
          disabled={!confirmTerms || !otpCode.trim()}
          onClick={handleSign}
        >
          Xác nhận ký hợp đồng
        </Button>,
      ]}
    >
      <Space direction="vertical" size={16} style={{ width: '100%', marginTop: 8 }}>
        <Alert
          type="info"
          showIcon
          message="Quy trình ký hợp đồng điện tử an toàn hai bên"
          description={
            <div>
              Hợp đồng có giá trị pháp lý khi cả Bên Mua (Khách hàng) và Bên Bán (Xưởng) cùng xác nhận điều khoản và xác thực mã OTP gửi về email.
            </div>
          }
        />

        <Card size="small" title="Trạng thái xác nhận của hai bên" style={{ background: '#faf8f6', borderColor: '#e4dcd3' }}>
          <Descriptions size="small" column={{ xs: 1, sm: 2 }}>
            <Descriptions.Item label={role === 'Customer' ? 'Phía Xưởng sản xuất' : 'Phía Đối tác Khách hàng'}>
              {(role === 'Customer' ? contract.signedBySupplierAt : contract.signedByCustomerAt) ? (
                <Tag color="success" icon={<CheckCircleOutlined />}>
                  {partnerSignedText}
                </Tag>
              ) : (
                <Tag color="processing" icon={<ClockCircleOutlined />}>
                  {partnerSignedText}
                </Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Phía của bạn">
              {mySignedAt ? (
                <Tag color="success" icon={<CheckCircleOutlined />}>
                  {myStatusText}
                </Tag>
              ) : (
                <Tag color="warning" icon={<ClockCircleOutlined />}>
                  {myStatusText}
                </Tag>
              )}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Descriptions bordered size="small" column={{ xs: 1, sm: 2 }}>
          <Descriptions.Item label="Mã hợp đồng">
            <Text strong style={{ color: '#8c1524' }}>{contract.contractNumber}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Tên hợp đồng">
            {contract.title || 'Hợp đồng đơn hàng RFQ'}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng giá trị">
            <Text strong style={{ color: '#8c1524' }}>{money(contract.totalValue)}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Hạn giao hàng">
            {contract.deliveryDeadline || '—'}
          </Descriptions.Item>
          {contract.customerName && (
            <Descriptions.Item label="Khách hàng (Bên mua)">
              {contract.customerName} {contract.customerPhone ? `(${contract.customerPhone})` : ''}
            </Descriptions.Item>
          )}
          {contract.supplierAddress && (
            <Descriptions.Item label="Địa chỉ xuất hàng">
              {contract.supplierAddress}
            </Descriptions.Item>
          )}
        </Descriptions>

        <Card size="small" title="Điều khoản & Sản phẩm hợp đồng" style={{ maxHeight: 240, overflowY: 'auto' }}>
          {items.length > 0 ? (
            <Table
              size="small"
              pagination={false}
              rowKey={(item, index) => `${item.ProductName || 'line'}-${index}`}
              dataSource={items}
              columns={[
                {
                  title: 'Sản phẩm',
                  dataIndex: 'ProductName',
                  render: (name, line) => (
                    <div>
                      <Text strong>{name}</Text>
                      {line.Specifications && <div><Text type="secondary" style={{ fontSize: 12 }}>Quy cách: {line.Specifications}</Text></div>}
                    </div>
                  ),
                },
                {
                  title: 'Số lượng',
                  render: (_, line) => `${line.Quantity ?? 0} ${line.Unit || ''}`,
                  align: 'right',
                },
                {
                  title: 'Đơn giá',
                  dataIndex: 'UnitPrice',
                  render: money,
                  align: 'right',
                },
                {
                  title: 'Thành tiền',
                  dataIndex: 'Subtotal',
                  render: money,
                  align: 'right',
                },
              ]}
            />
          ) : (
            <Paragraph style={{ whiteSpace: 'pre-wrap', marginBottom: 0 }}>
              {contract.termsAndConditions || 'Thực hiện theo các điều khoản, quy cách và tiêu chuẩn chất lượng đã cam kết trong báo giá RFQ.'}
            </Paragraph>
          )}
        </Card>

        <Divider style={{ margin: '8px 0' }} />

        <div>
          <Checkbox
            checked={confirmTerms}
            onChange={(e) => setConfirmTerms(e.target.checked)}
          >
            <Text strong>
              Tôi đã đọc, hiểu rõ và đồng ý với tất cả điều khoản hợp đồng kinh tế điện tử này.
            </Text>
          </Checkbox>
        </div>

        <Card size="small" title="Xác thực OTP qua Email" style={{ background: '#fafafa' }}>
          <Space direction="vertical" size={12} style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Button
                icon={<MailOutlined />}
                loading={requestingOtp}
                disabled={countdown > 0}
                onClick={handleRequestOtp}
              >
                {countdown > 0 ? `Gửi lại sau ${countdown}s` : (otpSent ? 'Gửi lại mã OTP' : 'Gửi mã OTP qua email')}
              </Button>
              {otpSent && (
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Mã OTP 6 số đã được gửi tới email của bạn. Mã có hiệu lực trong 10 phút.
                </Text>
              )}
            </div>

            <div>
              <Text style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
                Nhập mã OTP xác thực:
              </Text>
              <Input
                placeholder="Nhập 6 ký tự số OTP từ email..."
                value={otpCode}
                maxLength={10}
                onChange={(e) => setOtpCode(e.target.value)}
                style={{
                  maxWidth: 240,
                  fontSize: 16,
                  letterSpacing: 4,
                  fontWeight: 600,
                  fontFamily: 'monospace',
                }}
              />
            </div>
          </Space>
        </Card>
      </Space>
    </Modal>
  );
}
