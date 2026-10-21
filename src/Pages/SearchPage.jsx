import { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Input,
  Select,
  Checkbox,
  Slider,
  Button,
  Tag,
  Space,
  Pagination,
  Typography,
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  ShoppingOutlined,
  ShopOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../components/layout/CustomerHeader';

const { Title, Text } = Typography;

export default function SearchPage({ onNavigate }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['nuong', 'hop-vip']);
  const [priceRange, setPriceRange] = useState([50000, 800000]);
  const [onlyCustomPackaging, setOnlyCustomPackaging] = useState(false);

  // Products Catalog Mock Data
  const products = [
    {
      id: 'PRD-001',
      name: 'Bánh Nướng Thập Cẩm Bát Bửu Thượng Hạng',
      supplier: 'Xưởng Bánh Tràng An Nghệ Nhân',
      reputationScore: 98,
      badge: 'Đối Tác Vàng',
      price: 85000,
      minQty: 50,
      packagingSupported: true,
      category: 'Bánh Nướng',
      discountTag: 'Giảm đến 18%',
      variants: '3 Biến thể (150g, 200g, 250g)',
    },
    {
      id: 'PRD-002',
      name: 'Hộp Quà Sơn Mài Doanh Nghiệp VIP (4 Bánh + Trà)',
      supplier: 'Xưởng Bánh Tràng An Nghệ Nhân',
      reputationScore: 98,
      badge: 'Đối Tác Vàng',
      price: 650000,
      minQty: 20,
      packagingSupported: true,
      category: 'Hộp Quà VIP',
      discountTag: 'Giảm đến 25%',
      variants: 'Set 4 bánh / Set 6 bánh',
    },
    {
      id: 'PRD-003',
      name: 'Bánh Dẻo Hạt Sen Hạt Dưa Hương Hoa Bưởi',
      supplier: 'Hữu Nghị Luxury Mooncake',
      reputationScore: 95,
      badge: 'Đối Tác Vàng',
      price: 75000,
      minQty: 50,
      packagingSupported: true,
      category: 'Bánh Dẻo',
      discountTag: 'Giảm đến 20%',
      variants: '2 Biến thể (150g, 200g)',
    },
    {
      id: 'PRD-004',
      name: 'Bánh Tuyết Hiện Đại Nhân Trà Xanh Matcha Trứng Chảy',
      supplier: 'Bảo Phương Gia Truyền Thụy Khuê',
      reputationScore: 97,
      badge: 'Đối Tác Vàng',
      price: 95000,
      minQty: 40,
      packagingSupported: false,
      category: 'Bánh Tuyết Snow-Skin',
      discountTag: 'Giảm 10%',
      variants: 'Vỏ tuyết lạnh',
    },
    {
      id: 'PRD-005',
      name: 'Bánh Healthy Đường Ăn Kiêng Isomalt Hạt Dinh Dưỡng',
      supplier: 'Mondelēz Kinh Đô Doanh Nghiệp',
      reputationScore: 92,
      badge: 'Uy Tín',
      price: 105000,
      minQty: 60,
      packagingSupported: true,
      category: 'Healthy / Ăn Kiêng',
      discountTag: 'Giảm 15%',
      variants: '3 Vị ít ngọt',
    },
    {
      id: 'PRD-006',
      name: 'Bộ Hộp Quà Gỗ Khắc Laser Tinh Xảo (6 Bánh + Vang)',
      supplier: 'Hữu Nghị Luxury Mooncake',
      reputationScore: 95,
      badge: 'Đối Tác Vàng',
      price: 890000,
      minQty: 15,
      packagingSupported: true,
      category: 'Hộp Quà VIP',
      discountTag: 'Giảm đến 30%',
      variants: 'Gỗ óc chó & sơn mài',
    },
  ];

  return (
    <div style={{ background: '#f5f5f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CustomerHeader activeKey="tim-kiem" onNavigate={onNavigate} />

      <main style={{ maxWidth: 1440, margin: '24px auto', padding: '0 20px', flex: 1, width: '100%' }}>
        {/* Search Bar Banner */}
        <div
          style={{
            background: '#ffffff',
            padding: '20px 24px',
            borderRadius: 10,
            marginBottom: 20,
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={16}>
              <Input.Search
                size="large"
                placeholder="Tìm theo tên bánh, nhân thập cẩm, hạt sen, tên xưởng bánh, hộp quà VIP..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                enterButton="Tìm Kiếm"
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} md={8} style={{ textAlign: 'right' }}>
              <Select
                defaultValue="reputation"
                style={{ width: 220 }}
                options={[
                  { value: 'reputation', label: 'Xếp theo: Điểm uy tín NCC' },
                  { value: 'price_asc', label: 'Giá sỉ: Thấp đến Cao' },
                  { value: 'price_desc', label: 'Giá sỉ: Cao đến Thấp' },
                  { value: 'discount', label: 'Chiết khấu cao nhất' },
                ]}
              />
            </Col>
          </Row>
        </div>

        <Row gutter={[20, 20]}>
          {/* Filter Sidebar */}
          <Col xs={24} lg={6}>
            <Card title="Bộ Lọc Nâng Cao B2B" bordered={false} style={{ borderRadius: 10 }}>
              <div style={{ marginBottom: 20 }}>
                <Text strong style={{ display: 'block', marginBottom: 10 }}>Danh Mục Bánh:</Text>
                <Checkbox.Group
                  style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                  options={[
                    { label: 'Bánh Nướng Truyền Thống', value: 'nuong' },
                    { label: 'Bánh Dẻo Hương Sen', value: 'deo' },
                    { label: 'Bánh Tuyết Snow-Skin', value: 'tuyet' },
                    { label: 'Hộp Quà Sơn Mài VIP', value: 'hop-vip' },
                    { label: 'Healthy Đường Ăn Kiêng', value: 'healthy' },
                  ]}
                  value={selectedCategories}
                  onChange={setSelectedCategories}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>Khoảng Giá (VNĐ):</Text>
                <Slider
                  range
                  min={50000}
                  max={1000000}
                  step={50000}
                  value={priceRange}
                  onChange={setPriceRange}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#888' }}>
                  <span>{priceRange[0].toLocaleString()} ₫</span>
                  <span>{priceRange[1].toLocaleString()} ₫</span>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>In Logo Doanh Nghiệp:</Text>
                <Checkbox
                  checked={onlyCustomPackaging}
                  onChange={(e) => setOnlyCustomPackaging(e.target.checked)}
                >
                  Chỉ hiện sản phẩm hỗ trợ Custom Packaging
                </Checkbox>
              </div>

              <div>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>Huy Hiệu Nhà Cung Cấp:</Text>
                <Select
                  defaultValue="all"
                  style={{ width: '100%' }}
                  options={[
                    { value: 'all', label: 'Tất cả xưởng đã verified' },
                    { value: 'gold', label: '★ Đối Tác Vàng (> 85 điểm)' },
                    { value: 'trusted', label: 'Tin Cậy (> 50 điểm)' },
                  ]}
                />
              </div>
            </Card>
          </Col>

          {/* Product Grid */}
          <Col xs={24} lg={18}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {products.map((p) => (
                <Card
                  key={p.id}
                  hoverable
                  bordered={false}
                  style={{ borderRadius: 10, overflow: 'hidden' }}
                  cover={
                    <div
                      style={{
                        height: 180,
                        background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                      onClick={() => onNavigate?.('san-pham')}
                    >
                      <div style={{ fontSize: 64 }}>🥮</div>
                      <Tag color="gold" style={{ position: 'absolute', top: 10, left: 10, fontWeight: 700 }}>
                        {p.badge} ({p.reputationScore}đ)
                      </Tag>
                      {p.packagingSupported && (
                        <Tag color="volcano" style={{ position: 'absolute', top: 10, right: 10, fontSize: 10 }}>
                          In Logo Hộp
                        </Tag>
                      )}
                    </div>
                  }
                >
                  <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>
                    {p.supplier}
                  </div>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: '#1f1f1f',
                      margin: '0 0 8px',
                      lineHeight: 1.3,
                      cursor: 'pointer',
                    }}
                    onClick={() => onNavigate?.('san-pham')}
                  >
                    {p.name}
                  </h3>
                  <div style={{ fontSize: 12, color: '#666', marginBottom: 10 }}>
                    {p.variants}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                    <div>
                      <span style={{ fontSize: 18, fontWeight: 800, color: '#8c1524' }}>
                        {p.price.toLocaleString('vi-VN')} ₫
                      </span>
                      <span style={{ fontSize: 11, color: '#888' }}> / hộp</span>
                    </div>
                    <Tag color="gold" style={{ fontWeight: 700, margin: 0 }}>
                      {p.discountTag}
                    </Tag>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <Button
                      type="primary"
                      size="small"
                      block
                      style={{ background: '#8c1524', borderColor: '#8c1524', fontWeight: 600 }}
                      onClick={() => onNavigate?.('dat-hang-thiet-ke')}
                    >
                      Đặt Hàng Sỉ (≥ {p.minQty})
                    </Button>
                    <Button
                      size="small"
                      onClick={() => onNavigate?.('san-pham')}
                    >
                      Chi Tiết
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Pagination defaultCurrent={1} total={36} pageSize={6} />
            </div>
          </Col>
        </Row>
      </main>
    </div>
  );
}
