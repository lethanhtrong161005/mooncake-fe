import { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Upload,
  Switch,
  Radio,
  Tag,
  Descriptions,
  message,
  Typography,
  Alert,
  Divider,
} from 'antd';
import {
  ShoppingOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function OrderAndDesgin({ onNavigate }) {
  const [form] = Form.useForm();
  const [hasCustomPackaging, setHasCustomPackaging] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState('SKU-TC-200');
  const [quantity, setQuantity] = useState(100);

  const variants = [
    { sku: 'SKU-TC-150', name: 'Bánh Nướng Thập Cẩm Bát Bửu (150g)', price: 85000 },
    { sku: 'SKU-TC-200', name: 'Bánh Nướng Thập Cẩm Bát Bửu 2 Trứng (200g)', price: 110000 },
    { sku: 'SKU-BOX-VIP4', name: 'Set Hộp Sơn Mài 4 Bánh Thượng Hạng + Trà', price: 650000 },
  ];

  const currentVariant = variants.find((v) => v.sku === selectedVariant) || variants[0];
  const unitPrice = currentVariant.price;
  const discountRate = quantity >= 500 ? 0.18 : quantity >= 100 ? 0.10 : quantity >= 50 ? 0.05 : 0;
  const totalRaw = unitPrice * quantity;
  const discountAmount = totalRaw * discountRate;
  const packagingFee = hasCustomPackaging ? 15000 * quantity : 0;
  const finalTotal = totalRaw - discountAmount + packagingFee;

  const handlePlaceOrder = (values) => {
    message.success('Đã gửi đơn đặt hàng số lượng lớn kèm yêu cầu thiết kế bao bì tới Xưởng Bánh! Đang chờ xưởng phản hồi mockup.');
    onNavigate?.('hop-dong-tien-do');
  };

  return (
    <div style={{ background: '#f5f5f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CustomerHeader activeKey="dat-hang-thiet-ke" onNavigate={onNavigate} />

      <main style={{ maxWidth: 1440, margin: '24px auto', padding: '0 20px', flex: 1, width: '100%' }}>
        <div
          style={{
            background: '#ffffff',
            padding: '20px 24px',
            borderRadius: 10,
            marginBottom: 20,
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#1f1f1f' }}>
            Đặt Hàng Số Lượng Lớn (Bulk Order) & In Logo Doanh Nghiệp
          </h1>
          <p style={{ margin: '4px 0 0', color: '#666', fontSize: 13 }}>
            Chọn quy cách biến thể bánh, cấu hình số lượng hưởng chiết khấu bậc thang và gửi file vector logo in ấn
          </p>
        </div>

        <Row gutter={[20, 20]}>
          {/* Form Left */}
          <Col xs={24} lg={15}>
            <Card title="1. Chọn Biến Thể Bánh & Số Lượng Đặt Hàng" bordered={false} style={{ borderRadius: 10, marginBottom: 20 }}>
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  variant: 'SKU-TC-200',
                  quantity: 100,
                  deliveryAddress: 'Tòa nhà Landmark 81, Quận Bình Thạnh, TP. Hồ Chí Minh',
                  recipientName: 'Trần Minh Quân (Khối Hành chính)',
                  recipientPhone: '0901234567',
                }}
                onFinish={handlePlaceOrder}
              >
                <Form.Item label="Chọn Biến Thể Cụ Thể (Bắt buộc theo Module 4 - Feature #7)" required>
                  <Radio.Group
                    value={selectedVariant}
                    onChange={(e) => setSelectedVariant(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <Space direction="vertical" style={{ width: '100%' }}>
                      {variants.map((v) => (
                        <Radio
                          key={v.sku}
                          value={v.sku}
                          style={{
                            display: 'flex',
                            border: selectedVariant === v.sku ? '1px solid #8c1524' : '1px solid #eee',
                            borderRadius: 8,
                            padding: '10px 14px',
                            background: selectedVariant === v.sku ? '#fff9f9' : '#ffffff',
                            width: '100%',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <span><strong>{v.name}</strong> <span style={{ color: '#888' }}>({v.sku})</span></span>
                            <span style={{ fontWeight: 700, color: '#8c1524', marginLeft: 16 }}>
                              {v.price.toLocaleString('vi-VN')} ₫
                            </span>
                          </div>
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Số Lượng Đặt Hàng (≥ 50 cái/hộp)" required>
                      <InputNumber
                        min={50}
                        max={50000}
                        step={10}
                        value={quantity}
                        onChange={(val) => setQuantity(val || 50)}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '10px 14px', borderRadius: 8, marginTop: 4 }}>
                      <Text type="secondary" style={{ fontSize: 12 }}>Tỷ lệ chiết khấu theo số lượng:</Text>
                      <div style={{ fontWeight: 700, color: '#d48806' }}>
                        {discountRate > 0 ? `Áp dụng giảm ${(discountRate * 100).toFixed(0)}% (${discountAmount.toLocaleString('vi-VN')} ₫)` : 'Chưa đạt mức chiết khấu'}
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="recipientName" label="Người Nhận Hàng" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="recipientPhone" label="Số Điện Thoại Nhận Hàng" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="deliveryAddress" label="Địa Chỉ Giao Hàng Doanh Nghiệp" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Form>
            </Card>

            {/* Custom Packaging Section */}
            <Card
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>2. Đóng Gói & In Logo Doanh Nghiệp (Custom Packaging)</span>
                  <Switch checked={hasCustomPackaging} onChange={setHasCustomPackaging} />
                </div>
              }
              bordered={false}
              style={{ borderRadius: 10 }}
            >
              {hasCustomPackaging ? (
                <div>
                  <Row gutter={16}>
                    <Col span={12}>
                      <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
                        Kiểu Hộp Quà Doanh Nghiệp:
                      </label>
                      <Select
                        defaultValue="box_lacquer_vip"
                        style={{ width: '100%' }}
                        options={[
                          { value: 'box_lacquer_vip', label: 'Hộp Sơn Mài 4 Bánh Khóa Đồng VIP' },
                          { value: 'box_paper_luxury', label: 'Hộp Giấy Mỹ Thuật Ép Kim 4 Bánh' },
                          { value: 'box_double_gift', label: 'Hộp Đôi 2 Bánh Thanh Lịch' },
                        ]}
                      />
                    </Col>
                    <Col span={12}>
                      <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
                        Tải Logo Doanh Nghiệp (PNG / SVG):
                      </label>
                      <Upload maxCount={1}>
                        <Button icon={<UploadOutlined />}>Tải Logo Công Ty (≤ 5MB)</Button>
                      </Upload>
                    </Col>
                  </Row>

                  <div style={{ marginTop: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
                      Lời Chúc Tết Trung Thu In Trên Nắp Hộp:
                    </label>
                    <Input defaultValue="Kính Chúc Quý Khách Hàng & Đối Tác Trung Thu An Khang Thịnh Vượng" />
                  </div>
                </div>
              ) : (
                <div style={{ color: '#888', fontStyle: 'italic' }}>
                  Sản phẩm sẽ được đóng trong hộp tiêu chuẩn của xưởng bánh (không in thêm logo doanh nghiệp).
                </div>
              )}
            </Card>
          </Col>

          {/* Summary Right */}
          <Col xs={24} lg={9}>
            <Card
              title="Tổng Giá Trị Đơn Hàng Dự Kiến"
              bordered={false}
              style={{ borderRadius: 10, position: 'sticky', top: 84 }}
            >
              <Descriptions size="small" column={1} bordered>
                <Descriptions.Item label="Biến Thể Đã Chọn">
                  <strong>{currentVariant.name}</strong>
                </Descriptions.Item>
                <Descriptions.Item label="Số Lượng">
                  <strong>{quantity} hộp</strong>
                </Descriptions.Item>
                <Descriptions.Item label="Đơn Giá Cơ Bản">
                  {unitPrice.toLocaleString('vi-VN')} ₫ / hộp
                </Descriptions.Item>
                <Descriptions.Item label="Chiết Khấu Bậc Thang">
                  <span style={{ color: '#2e7d32', fontWeight: 600 }}>
                    -{discountAmount.toLocaleString('vi-VN')} ₫ ({(discountRate * 100).toFixed(0)}%)
                  </span>
                </Descriptions.Item>
                {hasCustomPackaging && (
                  <Descriptions.Item label="Phí In Logo & Bao Bì">
                    +{packagingFee.toLocaleString('vi-VN')} ₫
                  </Descriptions.Item>
                )}
              </Descriptions>

              <div style={{ marginTop: 20, textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: '#888' }}>Tổng cộng thanh toán:</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#8c1524' }}>
                  {finalTotal.toLocaleString('vi-VN')} ₫
                </div>
              </div>

              <Divider style={{ margin: '16px 0' }} />

              <Button
                type="primary"
                block
                size="large"
                style={{ background: '#8c1524', borderColor: '#8c1524', fontWeight: 700 }}
                onClick={() => form.submit()}
              >
                Gửi Đơn Hàng & Yêu Cầu Mockup
              </Button>
            </Card>
          </Col>
        </Row>
      </main>
    </div>
  );
}
