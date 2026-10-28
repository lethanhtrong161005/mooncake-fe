import { Avatar, Card, Col, ConfigProvider, Divider, Empty, Image, Row, Space, Tag, Typography } from 'antd';
import { SafetyCertificateOutlined, ShopOutlined } from '@ant-design/icons';
import { effectiveTheme, formatShopPrice, shopVariables } from '../../utils/shopTheme';
import './shop.css';

function Brand({ shop }) {
  return <Space align="start"><Avatar size={72} src={shop.logoUrl} icon={<ShopOutlined />} />
    <div><Typography.Title level={2} style={{ marginTop: 0, color: 'inherit' }}>{shop.name}</Typography.Title>
      {shop.isVerified && <Tag color="success" icon={<SafetyCertificateOutlined />}>Nhà cung cấp đã xác minh</Tag>}
      {shop.reputationScore !== undefined && <Typography.Text>Uy tín: {shop.reputationScore}</Typography.Text>}
    </div></Space>;
}

function Products({ products, catalog, columns }) {
  if (!products?.length) return <Empty description="Chưa có sản phẩm phù hợp" />;
  const price = (product) => `${formatShopPrice(product.minPrice)}${product.maxPrice !== product.minPrice ? ` – ${formatShopPrice(product.maxPrice)}` : ''}`;
  if (catalog) return <Space orientation="vertical" style={{ width: '100%' }}>{products.map((product) => <Card key={product.id} className="shop-catalog-item">
    <Space align="start" size="large">
      {product.imageUrl && <Image width={96} height={96} style={{ objectFit: 'cover' }} src={product.imageUrl} alt={product.name} />}
      <div><Typography.Title level={4}>{product.name}</Typography.Title><Typography.Paragraph strong>{price(product)}</Typography.Paragraph>
        <Typography.Text type="secondary">Đặt tối thiểu {product.minOrderQty} · {product.isInStock ? 'Còn hàng' : 'Tạm hết hàng'}</Typography.Text></div>
    </Space>
  </Card>)}</Space>;
  return <Row gutter={[16, 16]}>{products.map((product) => <Col key={product.id} xs={24} sm={12} lg={24 / columns}>
    <Card className="shop-product-card" cover={product.imageUrl ? <Image preview={false} src={product.imageUrl} alt={product.name}
      style={{ width: '100%', height: 180, objectFit: 'cover' }} /> : undefined}>
      <Typography.Title level={5}>{product.name}</Typography.Title>
      <Typography.Paragraph strong>{price(product)}</Typography.Paragraph>
      <Typography.Text type="secondary">Tối thiểu {product.minOrderQty} · {product.isInStock ? 'Còn hàng' : 'Tạm hết hàng'}</Typography.Text>
    </Card>
  </Col>)}</Row>;
}

function Contact({ shop }) {
  return <Card title="Liên hệ gian hàng"><Space orientation="vertical">
    {shop.publicContactEmail && <Typography.Link href={`mailto:${shop.publicContactEmail}`}>{shop.publicContactEmail}</Typography.Link>}
    {shop.publicContactPhone && <Typography.Link href={`tel:${shop.publicContactPhone}`}>{shop.publicContactPhone}</Typography.Link>}
    {shop.publicAddress && <Typography.Text>{shop.publicAddress}</Typography.Text>}
    {!shop.publicContactEmail && !shop.publicContactPhone && !shop.publicAddress && <Typography.Text type="secondary">Chưa công bố thông tin liên hệ</Typography.Text>}
  </Space></Card>;
}

export default function ShopRenderer({ shop, products = [], appearance, preview = false, filters, reviews, more }) {
  const theme = effectiveTheme(appearance?.defaults, appearance?.overrides ?? appearance?.effectiveTokens);
  const renderer = appearance?.rendererKey || 'heritage';
  const layout = appearance?.layout || { sectionOrder: ['Hero', 'Story', 'Products', 'Reviews', 'Contact'], productColumnsDesktop: 3 };
  const banner = shop.bannerUrl ? <Image preview={false} src={shop.bannerUrl} alt={`Banner ${shop.name}`}
    style={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: theme.borderRadiusPx }} /> : null;
  const productArea = <Space orientation="vertical" size="large" style={{ width: '100%' }}>
    <Typography.Title level={3}>Sản phẩm</Typography.Title>{renderer !== 'minimal-grid' && filters}
    <Products products={products} catalog={renderer === 'modern-catalog'} columns={layout.productColumnsDesktop || 3} />{more}
  </Space>;
  const sections = layout.sectionOrder.filter((section) => section !== 'Hero').map((section) => {
    if (section === 'Products') return <div key={section}>{productArea}</div>;
    if (section === 'Story') return <Card key={section} title="Câu chuyện thương hiệu"><Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }}>{shop.description || 'Gian hàng đang cập nhật phần giới thiệu.'}</Typography.Paragraph></Card>;
    if (section === 'Reviews') return <div key={section}>{reviews || <Card title="Đánh giá"><Empty description="Chưa có đánh giá" /></Card>}</div>;
    return <Contact key={section} shop={shop} />;
  });
  return <ConfigProvider theme={{ token: { colorPrimary: theme.primaryColor, colorText: theme.textColor,
    colorTextSecondary: theme.textColor, colorTextLightSolid: theme.buttonTextColor,
    colorLink: theme.textColor, colorLinkHover: theme.textColor,
    colorBgContainer: theme.surfaceColor, borderRadius: theme.borderRadiusPx, fontSize: Math.round(14 * theme.fontScale) } }}>
    <div className={`shop-root shop-${renderer}`} style={shopVariables(theme)}>
      {preview && <Tag color="blue" style={{ marginBottom: 16 }}>Bản xem trước · Chưa xuất bản thay đổi</Tag>}
      {renderer === 'royal-gift' ? <Row gutter={[24, 24]} align="middle"><Col xs={24} md={12}><Brand shop={shop} /></Col><Col xs={24} md={12}>{banner}</Col></Row> :
        <Space orientation="vertical" size="large" style={{ width: '100%' }}>{layout.sectionOrder.includes('Hero') && banner}<Brand shop={shop} /></Space>}
      <Divider />
      {renderer === 'minimal-grid' ? <Row gutter={[24, 24]}><Col xs={24} md={7}><Card title="Bộ lọc">{filters || <Typography.Text type="secondary">Bộ lọc sản phẩm</Typography.Text>}</Card></Col><Col xs={24} md={17}><Space orientation="vertical" size="large" style={{ width: '100%' }}>{sections}</Space></Col></Row> :
        renderer === 'artisan-story' ? <Row gutter={[24, 24]}><Col xs={24} md={7}><Contact shop={shop} /><Divider /><Typography.Paragraph>{shop.description}</Typography.Paragraph></Col>
          <Col xs={24} md={17}><Space orientation="vertical" size="large" style={{ width: '100%' }}>{sections.filter((section) => section.key !== 'Contact')}</Space></Col></Row> :
          <Space orientation="vertical" size="large" style={{ width: '100%' }}>{sections}</Space>}
    </div>
  </ConfigProvider>;
}
