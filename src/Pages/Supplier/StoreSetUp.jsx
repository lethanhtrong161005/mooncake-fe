import { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Upload,
  Switch,
  Row,
  Col,
  Tag,
  Space,
  Divider,
  message,
  Typography,
  Alert,
} from 'antd';
import {
  ShopOutlined,
  SaveOutlined,
  EyeOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  SkinOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export default function StoreSetUp({ onNavigate }) {
  const [form] = Form.useForm();
  const [selectedTemplate, setSelectedTemplate] = useState('TPL-01');
  const [primaryColor, setPrimaryColor] = useState('#8c1524');
  const [accentColor, setAccentColor] = useState('#d48806');
  const [shopStatus, setShopStatus] = useState(true);

  const templates = [
    {
      id: 'TPL-01',
      name: 'Hoàng Kim Cung Đình',
      desc: 'Tông đỏ trầm rượu vang & vàng kim hoàng gia. Phù hợp xưởng bánh quà tặng cao cấp.',
      primary: '#8c1524',
      accent: '#d48806',
    },
    {
      id: 'TPL-02',
      name: 'Tràng An Cổ Điển',
      desc: 'Tông nâu đất & xanh rêu truyền thống phố cổ. Phù hợp bánh gia truyền lâu năm.',
      primary: '#5c3a21',
      accent: '#2e5a44',
    },
    {
      id: 'TPL-03',
      name: 'Đương Đại Minimalist',
      desc: 'Tông ghi xám thanh lịch & cam ấm. Phù hợp thương hiệu bánh hiện đại, healthy.',
      primary: '#2c3e50',
      accent: '#e67e22',
    },
    {
      id: 'TPL-04',
      name: 'Nguyệt Dạ Rằm Tháng Tám',
      desc: 'Tông lam chàm đêm trăng rằm huyền ảo. Sang trọng và ấn tượng thị giác mạnh mẽ.',
      primary: '#1a2a44',
      accent: '#f1c40f',
    },
  ];

  const handleTemplateSelect = (tpl) => {
    setSelectedTemplate(tpl.id);
    setPrimaryColor(tpl.primary);
    setAccentColor(tpl.accent);
    message.info(`Đã áp dụng mẫu giao diện "${tpl.name}"!`);
  };

  const handleSave = (values) => {
    message.success('Đã lưu cấu hình gian hàng và giao diện trực tuyến thành công!');
  };

  return (
    <ColonyAdminLayout
      role="Supplier"
      activeKey="nha-cung-cap/thiet-lap-gian-hang"
      onNavigate={onNavigate}
      title="Thiết Lập Gian Hàng & Tùy Biến Giao Diện (Storefront)"
      subtitle="Quản lý định danh xưởng bánh, tùy chọn template giao diện (≥5 mẫu) và biến màu CSS Variables"
      extra={
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => onNavigate?.('san-pham')}>
            Xem Gian Hàng Công Khai
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={() => form.submit()}
            style={{ background: '#8c1524', borderColor: '#8c1524' }}
          >
            Lưu Gian Hàng
          </Button>
        </Space>
      }
    >
      <Alert
        message="Huy hiệu Nhà cung cấp đã xác minh (✓ Verified Supplier)"
        description="Gian hàng của quý xưởng đã vượt qua thẩm định ISO 22000. Mọi thông tin cập nhật sẽ hiển thị trực tiếp tới hơn 5.000 khách hàng doanh nghiệp B2B."
        type="success"
        showIcon
        style={{ marginBottom: 20 }}
      />

      <Row gutter={[20, 20]}>
        {/* Left Form: Shop Details */}
        <Col xs={24} lg={15}>
          <Card title="1. Thông Tin Cơ Bản Gian Hàng" bordered={false} style={{ borderRadius: 10, marginBottom: 20 }}>
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                shopName: 'Xưởng Bánh Tràng An Nghệ Nhân',
                slug: 'trang-an-bakery',
                description: 'Xưởng bánh trung thu gia truyền 4 đời tại Hà Nội. Chuyên cung cấp bánh nướng, bánh dẻo truyền thống và hộp quà doanh nghiệp khắc laser cao cấp.',
                address: 'Cụm Làng Nghề Bánh Mứt Kẹo, Hoàng Mai, Hà Nội',
                phone: '0912 345 678',
              }}
              onFinish={handleSave}
            >
              <Row gutter={16}>
                <Col span={14}>
                  <Form.Item name="shopName" label="Tên Gian Hàng / Xưởng Bánh" rules={[{ required: true }]}>
                    <Input placeholder="VD: Xưởng Bánh Tràng An..." />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item name="slug" label="Đường Dẫn URL Gian Hàng" rules={[{ required: true }]}>
                    <Input prefix="moonmarket.vn/shop/" placeholder="trang-an-bakery" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="description" label="Mô Tả Xưởng & Năng Lực Sản Xuất">
                <TextArea rows={3} />
              </Form.Item>

              <Row gutter={16}>
                <Col span={14}>
                  <Form.Item name="address" label="Địa Chỉ Xưởng Sản Xuất">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item name="phone" label="Hotline B2B Tiếp Nhận RFQ">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Logo Gian Hàng (PNG / SVG)">
                    <Upload maxCount={1}>
                      <Button icon={<UploadOutlined />}>Tải Logo Xưởng (≤ 2MB)</Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Ảnh Banner Gian Hàng (1920x450)">
                    <Upload maxCount={1}>
                      <Button icon={<UploadOutlined />}>Tải Ảnh Bìa Banner</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8 }}>
                <div>
                  <strong>Trạng Thái Hoạt Động Gian Hàng:</strong>{' '}
                  <Tag color={shopStatus ? 'success' : 'default'}>
                    {shopStatus ? 'Đang mở cửa nhận đơn' : 'Tạm ẩn gian hàng'}
                  </Tag>
                </div>
                <Switch checked={shopStatus} onChange={setShopStatus} />
              </div>
            </Form>
          </Card>

          {/* Template Selection */}
          <Card title="2. Tùy Chọn Mẫu Giao Diện (Templates)" bordered={false} style={{ borderRadius: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {templates.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => handleTemplateSelect(tpl)}
                  style={{
                    border: selectedTemplate === tpl.id ? '2px solid #8c1524' : '1px solid #e8e8e8',
                    borderRadius: 8,
                    padding: 14,
                    cursor: 'pointer',
                    background: selectedTemplate === tpl.id ? '#fff9f9' : '#ffffff',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: 14 }}>{tpl.name}</strong>
                    {selectedTemplate === tpl.id && <CheckCircleOutlined style={{ color: '#8c1524', fontSize: 16 }} />}
                  </div>
                  <p style={{ fontSize: 12, color: '#666', margin: '8px 0' }}>{tpl.desc}</p>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: tpl.primary }} />
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: tpl.accent }} />
                    <span style={{ fontSize: 11, color: '#888' }}>Màu chủ đạo & điểm nhấn</span>
                  </div>
                </div>
              ))}
            </div>

            <Divider style={{ margin: '16px 0' }} />

            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                  Màu Chủ Đạo (Primary Color):
                </label>
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  style={{ width: 60, height: 32, cursor: 'pointer', borderRadius: 4, border: '1px solid #ccc' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                  Màu Điểm Nhấn (Accent Color):
                </label>
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  style={{ width: 60, height: 32, cursor: 'pointer', borderRadius: 4, border: '1px solid #ccc' }}
                />
              </div>
            </div>
          </Card>
        </Col>

        {/* Right Preview Card */}
        <Col xs={24} lg={9}>
          <Card
            title="Xem Trước Giao Diện Gian Hàng (Live Preview)"
            bordered={false}
            style={{ borderRadius: 10, position: 'sticky', top: 84 }}
          >
            {/* Mock Store Header Preview */}
            <div
              style={{
                borderRadius: 8,
                overflow: 'hidden',
                border: '1px solid #eee',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              }}
            >
              {/* Mini Banner */}
              <div
                style={{
                  height: 100,
                  background: `linear-gradient(135deg, ${primaryColor} 0%, #1f1f1f 100%)`,
                  padding: 12,
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 8,
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    }}
                  >
                    🥮
                  </div>
                  <div style={{ color: '#ffffff' }}>
                    <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>
                      Xưởng Tràng An Nghệ Nhân
                    </div>
                    <div style={{ fontSize: 10, color: accentColor, fontWeight: 600 }}>
                      ✓ Verified Supplier • 98/100 Điểm Uy Tín
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Body */}
              <div style={{ padding: 12, background: '#ffffff' }}>
                <div style={{ fontSize: 11, color: '#666', marginBottom: 12 }}>
                  moonmarket.vn/shop/trang-an-bakery
                </div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <Tag color="volcano" style={{ margin: 0 }}>Giao Hàng Toàn Quốc</Tag>
                  <Tag color="gold" style={{ margin: 0 }}>Chiết Khấu Đến 25%</Tag>
                </div>
                <Button
                  block
                  style={{
                    background: primaryColor,
                    borderColor: primaryColor,
                    color: '#ffffff',
                    fontWeight: 600,
                    height: 32,
                    fontSize: 12,
                  }}
                >
                  Yêu Cầu Báo Giá Nhanh (Gửi RFQ)
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </ColonyAdminLayout>
  );
}
