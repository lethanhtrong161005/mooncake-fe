import { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Radio,
  InputNumber,
  Button,
  Upload,
  Typography,
  Descriptions,
  message,
  Space,
  Tag,
  Divider,
} from 'antd';
import {
  UploadOutlined,
  CheckCircleOutlined,
  PrinterOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';

const { Title, Text, Paragraph } = Typography;

export default function PackagingAndLogoPrinting({ onNavigate }) {
  const [boxType, setBoxType] = useState('lacquer-4');
  const [foilColor, setFoilColor] = useState('gold');
  const [technique, setTechnique] = useState('ep-kim');
  const [quantity, setQuantity] = useState(200);

  const boxOptions = [
    {
      id: 'lacquer-4',
      name: 'Hộp Sơn Mài Thượng Hạng (4 bánh)',
      spec: 'Kích thước: 32x32x8cm, Gỗ phủ sơn mài cao cấp, lót lụa đỏ',
      price: 180000,
      minQty: 100,
    },
    {
      id: 'luxury-6',
      name: 'Hộp VIP Dạ Nguyệt (6 bánh + Trà sen)',
      spec: 'Kích thước: 38x28x9cm, Khung gỗ khắc CNC, quai xách da thật',
      price: 240000,
      minQty: 50,
    },
    {
      id: 'bamboo-4',
      name: 'Hộp Giấy Mỹ Thuật Mộc (4 bánh)',
      spec: 'Kích thước: 30x30x7cm, Giấy mỹ thuật ép nổi hoa văn truyền thống',
      price: 85000,
      minQty: 200,
    },
  ];

  const currentBox = boxOptions.find((b) => b.id === boxType) || boxOptions[0];
  const unitCost = currentBox.price + (technique === 'khac-laser' ? 25000 : 15000);
  const totalCost = unitCost * quantity;

  const handleSubmit = () => {
    message.success('Đã gửi yêu cầu in ấn bao bì logo thành công! Xưởng in sẽ gửi bản mockup 3D trong 24h.');
    onNavigate?.('dat-hang-thiet-ke');
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
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <div>
            <Button
              type="link"
              icon={<ArrowLeftOutlined />}
              onClick={() => onNavigate?.('dat-hang-thiet-ke')}
              style={{ padding: 0, marginBottom: 4 }}
            >
              Quay lại Đặt hàng
            </Button>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#1f1f1f' }}>
              Xưởng Tùy Biến Bao Bì & Khắc Logo Doanh Nghiệp (Custom Packaging)
            </h1>
            <p style={{ margin: '4px 0 0', color: '#666', fontSize: 13 }}>
              Cá nhân hóa bộ nhận diện quà tặng Trung Thu với công nghệ ép kim vàng 24K, khắc laser gỗ và hộp sơn mài nghệ nhân
            </p>
          </div>
        </div>

        <Row gutter={[20, 20]}>
          <Col xs={24} lg={15}>
            <Card title="1. Chọn Kiểu Dáng Hộp Quà Doanh Nghiệp" bordered={false} style={{ borderRadius: 10, marginBottom: 20 }}>
              <Radio.Group
                value={boxType}
                onChange={(e) => setBoxType(e.target.value)}
                style={{ width: '100%' }}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  {boxOptions.map((b) => (
                    <Radio
                      key={b.id}
                      value={b.id}
                      style={{
                        display: 'flex',
                        border: boxType === b.id ? '2px solid #8c1524' : '1px solid #eee',
                        borderRadius: 8,
                        padding: 14,
                        background: boxType === b.id ? '#fff9f9' : '#ffffff',
                        width: '100%',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <div>
                          <strong>{b.name}</strong>
                          <div style={{ fontSize: 12, color: '#666' }}>{b.spec}</div>
                        </div>
                        <div style={{ textAlign: 'right', marginLeft: 16 }}>
                          <span style={{ fontWeight: 700, color: '#8c1524' }}>
                            {b.price.toLocaleString('vi-VN')} ₫ / vỏ
                          </span>
                          <div style={{ fontSize: 11, color: '#888' }}>Tối thiểu: {b.minQty} hộp</div>
                        </div>
                      </div>
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Card>

            <Card title="2. Kỹ Thuật Chế Tác Logo & Tải File Thiết Kế" bordered={false} style={{ borderRadius: 10 }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
                  Kỹ Thuật In Ấn Logo:
                </label>
                <Radio.Group value={technique} onChange={(e) => setTechnique(e.target.value)}>
                  <Radio.Button value="ep-kim">Ép Kim Vàng 24K / Bạc</Radio.Button>
                  <Radio.Button value="khac-laser">Khắc Laser Chìm Vào Gỗ (+25.000₫)</Radio.Button>
                  <Radio.Button value="dap-noi">Dập Nổi Hoa Văn 3D</Radio.Button>
                </Radio.Group>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
                  Tải Lên File Vector Logo (AI, EPS, SVG, PNG):
                </label>
                <Upload maxCount={1}>
                  <Button icon={<UploadOutlined />}>Tải Logo Doanh Nghiệp (≤ 5MB)</Button>
                </Upload>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
                  Số Lượng Vỏ Hộp Cần Sản Xuất:
                </label>
                <InputNumber
                  min={currentBox.minQty}
                  max={20000}
                  step={50}
                  value={quantity}
                  onChange={(val) => setQuantity(val || currentBox.minQty)}
                  addonAfter="hộp"
                  style={{ width: 200 }}
                />
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={9}>
            <Card title="Dự Toán Chi Phí Bao Bì" bordered={false} style={{ borderRadius: 10, position: 'sticky', top: 84 }}>
              <Descriptions size="small" column={1} bordered>
                <Descriptions.Item label="Mẫu Hộp">{currentBox.name}</Descriptions.Item>
                <Descriptions.Item label="Kỹ Thuật">{technique === 'khac-laser' ? 'Khắc Laser Gỗ' : 'Ép Kim Vàng'}</Descriptions.Item>
                <Descriptions.Item label="Số Lượng">{quantity} hộp</Descriptions.Item>
                <Descriptions.Item label="Đơn Giá">{unitCost.toLocaleString('vi-VN')} ₫ / hộp</Descriptions.Item>
              </Descriptions>

              <div style={{ marginTop: 20, textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: '#888' }}>Tổng chi phí sản xuất hộp:</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#8c1524' }}>
                  {totalCost.toLocaleString('vi-VN')} ₫
                </div>
              </div>

              <Divider style={{ margin: '16px 0' }} />

              <Button
                type="primary"
                block
                size="large"
                style={{ background: '#8c1524', borderColor: '#8c1524', fontWeight: 700 }}
                onClick={handleSubmit}
              >
                Gửi Yêu Cầu Chế Tác Mockup
              </Button>
            </Card>
          </Col>
        </Row>
      </main>
    </div>
  );
}
