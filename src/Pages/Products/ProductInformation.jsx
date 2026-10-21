import { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Radio,
  InputNumber,
  Button,
  Tag,
  Descriptions,
  Table,
  Rate,
  Upload,
  Divider,
  Space,
  message,
  Typography,
  Alert,
} from 'antd';
import {
  ShoppingOutlined,
  SolutionOutlined,
  SafetyCertificateOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';

const { Title, Text, Paragraph } = Typography;

export default function ProductInformation({ onNavigate }) {
  const [selectedVariantSku, setSelectedVariantSku] = useState('SKU-TC-200');
  const [quantity, setQuantity] = useState(100);

  const product = {
    id: 'PRD-001',
    name: 'Bánh Trung Thu Thập Cẩm Bát Bửu Thượng Hạng (Hoàng Kim Dạ Nguyệt)',
    supplierName: 'Xưởng Bánh Tràng An Nghệ Nhân',
    reputationScore: 98,
    badge: 'Đối Tác Vàng',
    category: 'Bánh Nướng Truyền Thống',
    description: 'Tuyệt phẩm bánh nướng gia truyền kết hợp 8 vị nhân quý: bào ngư, vi cá, lạp xưởng Mai Quế Lộ, hạt sen, hạt dưa, mứt bí, lá chanh và vừng rang. Vỏ bánh mỏng vàng óng, dập nổi hoa văn hoa sen cung đình.',
    variants: [
      {
        sku: 'SKU-TC-150',
        flavor: 'Thập Cẩm Bát Bửu (150g)',
        crust: 'Vỏ Nướng Truyền Thống',
        weight: 150,
        price: 85000,
        stock: 1200,
      },
      {
        sku: 'SKU-TC-200',
        flavor: 'Thập Cẩm Bát Bửu 2 Trứng Muối (200g)',
        crust: 'Vỏ Nướng Hoàng Kim',
        weight: 200,
        price: 110000,
        stock: 850,
      },
      {
        sku: 'SKU-BOX-VIP4',
        flavor: 'Set Hộp Sơn Mài VIP 4 Bánh + Trà Sen',
        crust: 'Hộp Sơn Mài Khóa Đồng',
        weight: 800,
        price: 650000,
        stock: 350,
      },
    ],
    tieredPricing: [
      { minQty: 50, maxQty: 99, discountText: 'Giảm 5%', rate: 0.05 },
      { minQty: 100, maxQty: 499, discountText: 'Giảm 10%', rate: 0.10 },
      { minQty: 500, maxQty: 9999, discountText: 'Giảm 18%', rate: 0.18 },
    ],
    reviews: [
      {
        user: 'Tập đoàn Vingroup (Chị Mai - HR)',
        rating: 5,
        variant: 'Set Hộp Sơn Mài VIP 4 Bánh',
        date: '2025-08-10',
        comment: 'Đã nhận 500 hộp đợt 1, bao bì sơn mài cực kỳ sang trọng, logo Vingroup dập nổi sắc nét. Bánh thơm và vừa vị.',
      },
      {
        user: 'Công ty Cổ phần MISA (Anh Dũng)',
        rating: 5,
        variant: 'Thập Cẩm Bát Bửu 2 Trứng Muối (200g)',
        date: '2025-08-08',
        comment: 'Nhân bánh đầy đặn, trứng muối bùi béo. Đóng gói rất chắc chắn, giao xe lạnh đúng giờ cam kết.',
      },
    ],
  };

  const currentVariant = product.variants.find((v) => v.sku === selectedVariantSku) || product.variants[0];
  const unitPrice = currentVariant.price;
  const currentTier = product.tieredPricing.find((t) => quantity >= t.minQty && quantity <= t.maxQty);
  const discountRate = currentTier ? currentTier.rate : 0;
  const subtotal = unitPrice * quantity;
  const discountAmount = subtotal * discountRate;
  const finalTotal = subtotal - discountAmount;

  return (
    <div style={{ background: '#f5f5f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CustomerHeader activeKey="tim-kiem" onNavigate={onNavigate} />

      <main style={{ maxWidth: 1440, margin: '24px auto', padding: '0 20px', flex: 1, width: '100%' }}>
        {/* Breadcrumb Context */}
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Button type="link" onClick={() => onNavigate?.('tim-kiem')} style={{ padding: 0 }}>
              ← Quay lại danh mục B2B
            </Button>
            <span style={{ color: '#bbb' }}>/</span>
            <span style={{ color: '#666' }}>{product.category}</span>
            <span style={{ color: '#bbb' }}>/</span>
            <strong style={{ color: '#1f1f1f' }}>{product.name}</strong>
          </Space>
        </div>

        <Row gutter={[24, 24]}>
          {/* Left Column: Visual Gallery */}
          <Col xs={24} lg={10}>
            <Card bordered={false} style={{ borderRadius: 10, overflow: 'hidden' }}>
              <div
                style={{
                  height: 380,
                  background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                  borderRadius: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  border: '1px solid #ffd591',
                }}
              >
                <div style={{ fontSize: 96 }}>🥮</div>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#8c1524', marginTop: 12 }}>
                  {currentVariant.flavor}
                </div>
                <Tag color="gold" style={{ position: 'absolute', top: 12, left: 12, fontWeight: 700 }}>
                  ★ {product.badge}
                </Tag>
                <Tag color="volcano" style={{ position: 'absolute', top: 12, right: 12 }}>
                  Khắc Logo 48H
                </Tag>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                {product.variants.map((v) => (
                  <div
                    key={v.sku}
                    onClick={() => setSelectedVariantSku(v.sku)}
                    style={{
                      flex: 1,
                      border: selectedVariantSku === v.sku ? '2px solid #8c1524' : '1px solid #eee',
                      borderRadius: 6,
                      padding: 8,
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: '#ffffff',
                    }}
                  >
                    <div style={{ fontSize: 20 }}>🥮</div>
                    <div style={{ fontSize: 11, fontWeight: 600, marginTop: 2 }}>{v.weight}g</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Supplier Profile Box */}
            <Card bordered={false} style={{ borderRadius: 10, marginTop: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    background: '#8c1524',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                  }}
                >
                  <ShopOutlined />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#1f1f1f' }}>
                    {product.supplierName}
                  </div>
                  <Space size={4}>
                    <Tag color="gold" icon={<SafetyCertificateOutlined />}>
                      {product.badge} ({product.reputationScore}/100)
                    </Tag>
                    <Tag color="green">✓ Đã xác thực ISO 22000</Tag>
                  </Space>
                </div>
              </div>
              <Divider style={{ margin: '14px 0' }} />
              <Button
                block
                icon={<SolutionOutlined />}
                onClick={() => onNavigate?.('so-sanh-bao-gia')}
              >
                Gửi Lời Mời Báo Giá RFQ Tới Xưởng Này
              </Button>
            </Card>
          </Col>

          {/* Right Column: Variant Selector & Tiered Pricing */}
          <Col xs={24} lg={14}>
            <Card bordered={false} style={{ borderRadius: 10 }}>
              <Tag color="volcano" style={{ fontWeight: 600 }}>SẢN PHẨM B2B SỈ</Tag>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1f1f1f', margin: '8px 0 12px' }}>
                {product.name}
              </h1>
              <Paragraph style={{ color: '#666', fontSize: 14 }}>{product.description}</Paragraph>

              <Divider style={{ margin: '16px 0' }} />

              {/* Price Display */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 32, fontWeight: 800, color: '#8c1524' }}>
                  {unitPrice.toLocaleString('vi-VN')} ₫
                </span>
                <span style={{ color: '#888', fontSize: 14 }}>/ cái hoặc hộp</span>
                {discountRate > 0 && (
                  <Tag color="success" style={{ fontWeight: 700, fontSize: 13, padding: '2px 8px' }}>
                    Áp dụng mức sỉ: -{(discountRate * 100).toFixed(0)}%
                  </Tag>
                )}
              </div>

              {/* Variant Selector (Module 3 - Feature #5) */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 10 }}>
                  Bắt buộc chọn Biến Thể Cụ Thể (Variant):
                </label>
                <Radio.Group
                  value={selectedVariantSku}
                  onChange={(e) => setSelectedVariantSku(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {product.variants.map((v) => (
                      <Radio
                        key={v.sku}
                        value={v.sku}
                        style={{
                          border: selectedVariantSku === v.sku ? '2px solid #8c1524' : '1px solid #eee',
                          borderRadius: 8,
                          padding: '10px 14px',
                          background: selectedVariantSku === v.sku ? '#fff9f9' : '#ffffff',
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}
                      >
                        <span style={{ fontWeight: 600 }}>{v.flavor} ({v.weight}g)</span>
                        <span style={{ color: '#8c1524', fontWeight: 700, marginLeft: 20 }}>
                          {v.price.toLocaleString('vi-VN')} ₫
                        </span>
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </div>

              {/* Tiered Pricing Table (Feature #8) */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 10 }}>
                  Bảng Giá Chiết Khấu Theo Số Lượng (Tiered Pricing Rules):
                </label>
                <Table
                  size="small"
                  pagination={false}
                  dataSource={product.tieredPricing.map((t, i) => ({ ...t, key: i }))}
                  columns={[
                    {
                      title: 'Khoảng Số Lượng Đặt',
                      key: 'range',
                      render: (_, t) => `${t.minQty} - ${t.maxQty >= 9999 ? 'Trở lên' : t.maxQty} hộp`,
                    },
                    {
                      title: 'Mức Chiết Khấu',
                      dataIndex: 'discountText',
                      key: 'discountText',
                      render: (d) => <Tag color="gold" style={{ fontWeight: 700 }}>{d}</Tag>,
                    },
                    {
                      title: 'Giá Sau Chiết Khấu',
                      key: 'netPrice',
                      render: (_, t) => (
                        <strong style={{ color: '#2e7d32' }}>
                          {(unitPrice * (1 - t.rate)).toLocaleString('vi-VN')} ₫
                        </strong>
                      ),
                    },
                  ]}
                />
              </div>

              {/* Bulk Quantity Picker */}
              <div style={{ background: '#fafafa', padding: 16, borderRadius: 8, marginBottom: 20 }}>
                <Row gutter={16} align="middle">
                  <Col span={8}>
                    <label style={{ fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 6 }}>
                      Số Lượng Đặt (≥ 50):
                    </label>
                    <InputNumber
                      min={50}
                      max={10000}
                      step={10}
                      value={quantity}
                      onChange={(v) => setQuantity(v || 50)}
                      style={{ width: '100%' }}
                    />
                  </Col>
                  <Col span={16} style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, color: '#888' }}>
                      Đơn giá: {unitPrice.toLocaleString('vi-VN')} ₫ x {quantity} hộp
                      {discountAmount > 0 && ` (-${discountAmount.toLocaleString('vi-VN')} ₫)`}
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#8c1524' }}>
                      Tổng: {finalTotal.toLocaleString('vi-VN')} ₫
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Action Buttons */}
              <Space size="middle" style={{ width: '100%' }}>
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingOutlined />}
                  style={{ background: '#8c1524', borderColor: '#8c1524', fontWeight: 700, flex: 1 }}
                  onClick={() => onNavigate?.('dat-hang-thiet-ke')}
                >
                  Đặt Hàng & In Logo Hộp Doanh Nghiệp
                </Button>
                <Button
                  size="large"
                  icon={<SolutionOutlined />}
                  onClick={() => onNavigate?.('so-sanh-bao-gia')}
                  style={{ fontWeight: 600 }}
                >
                  Tạo RFQ Mời Báo Giá
                </Button>
              </Space>
            </Card>

            {/* Verified Reviews Stream (Feature #22) */}
            <Card title="Đánh Giá Thực Tế (Verified Purchases Review Stream)" bordered={false} style={{ borderRadius: 10, marginTop: 20 }}>
              {product.reviews.map((rev, idx) => (
                <div key={idx} style={{ padding: '12px 0', borderBottom: idx < product.reviews.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{rev.user}</strong>
                      <Tag color="success" style={{ marginLeft: 8, fontSize: 10 }}>✓ Verified Buyer</Tag>
                    </div>
                    <Rate disabled defaultValue={rev.rating} style={{ fontSize: 13, color: '#fadb14' }} />
                  </div>
                  <Tag color="purple" style={{ marginTop: 4, fontSize: 11 }}>Biến thể: {rev.variant}</Tag>
                  <p style={{ margin: '8px 0 0', color: '#333' }}>"{rev.comment}"</p>
                </div>
              ))}
            </Card>
          </Col>
        </Row>
      </main>
    </div>
  );
}
