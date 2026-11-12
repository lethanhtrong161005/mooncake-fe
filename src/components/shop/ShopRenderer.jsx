import { Avatar, Card, ConfigProvider, Empty, Tag, Typography } from 'antd';
import { ArrowRightOutlined, EnvironmentOutlined, SafetyCertificateOutlined, ShopOutlined } from '@ant-design/icons';
import { effectiveTheme, formatShopPrice, shopVariables } from '../../utils/shopTheme';
import { routeUrl } from '../../utils/shopRoutes';
import './shop.css';

function ProductCard({ product, onNavigate }) {
  const id = product.id || product.productId;
  const target = id ? `san-pham/${encodeURIComponent(id)}` : null;
  const price = `${formatShopPrice(product.minPrice)}${product.maxPrice !== product.minPrice ? ` – ${formatShopPrice(product.maxPrice)}` : ''}`;
  return <article className="shop-product-card"><a className="shop-product-card__link"
    href={target ? routeUrl(target) : undefined} aria-label={`Xem chi tiết ${product.name}`}
    onClick={(event) => {
      if (target && onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
        event.preventDefault(); onNavigate(target);
      }
    }}>
    <div className="shop-product-card__image">
      {product.imageUrl ? <img src={product.imageUrl} alt={product.name} loading="lazy" /> : <ShopOutlined aria-hidden="true" />}
      {!product.isInStock && <span className="shop-product-card__stock">Tạm hết hàng</span>}
    </div>
    <div className="shop-product-card__body"><h3>{product.name}</h3><strong>{price}</strong>
      <span>Đặt tối thiểu {product.minOrderQty} sản phẩm</span>
      <span className="shop-product-card__action">Xem sản phẩm <ArrowRightOutlined /></span></div>
  </a></article>;
}

function Products({ products, columns, filters, more, onNavigate }) {
  return <section id="shop-products" className="shop-products" aria-labelledby="shop-products-title">
    <div className="shop-section-heading"><div><span>Sản phẩm của gian hàng</span><h2 id="shop-products-title">Khám phá bộ sưu tập</h2></div></div>
    {filters && <div className="shop-filters">{filters}</div>}
    {products?.length ? <div className="shop-products__grid" style={{ '--shop-columns': Math.min(4, Math.max(2, columns || 3)) }}>
      {products.map((product) => <ProductCard key={product.id || product.productId} product={product} onNavigate={onNavigate} />)}
    </div> : <Empty description="Chưa có sản phẩm phù hợp" />}
    {more && <div className="shop-products__more">{more}</div>}
  </section>;
}

function Contact({ shop }) {
  return <section className="shop-detail-section"><h2>Liên hệ gian hàng</h2><div className="shop-contact">
    {shop.publicContactEmail && <a href={`mailto:${shop.publicContactEmail}`}>{shop.publicContactEmail}</a>}
    {shop.publicContactPhone && <a href={`tel:${shop.publicContactPhone}`}>{shop.publicContactPhone}</a>}
    {shop.publicAddress && <span>{shop.publicAddress}</span>}
    {!shop.publicContactEmail && !shop.publicContactPhone && !shop.publicAddress && <span>Gian hàng chưa công bố thông tin liên hệ.</span>}
  </div></section>;
}

export default function ShopRenderer({ shop, products = [], appearance, preview = false, filters, reviews, more, onNavigate }) {
  const theme = effectiveTheme(appearance?.defaults, appearance?.overrides ?? appearance?.effectiveTokens);
  const renderer = appearance?.rendererKey || 'heritage';
  const layout = appearance?.layout || {};
  const sections = (layout.sectionOrder || ['Products', 'Story', 'Reviews', 'Contact'])
    .filter((section) => section !== 'Hero' && section !== 'Products');
  const description = shop.description || 'Khám phá những món quà Trung thu được chọn lọc cho doanh nghiệp.';
  return <ConfigProvider theme={{ token: { colorPrimary: theme.primaryColor, colorText: theme.textColor,
    colorBgContainer: theme.surfaceColor, borderRadius: theme.borderRadiusPx, fontSize: Math.round(14 * theme.fontScale) } }}>
    <div className={`shop-root shop-${renderer}`} style={shopVariables(theme)}>
      {preview && <Tag className="shop-preview-badge">Bản xem trước · Chưa xuất bản thay đổi</Tag>}
      <header className="shop-cover">
        {shop.bannerUrl ? <img className="shop-cover__banner" src={shop.bannerUrl} alt={`Ảnh bìa gian hàng ${shop.name}`} />
          : <div className="shop-cover__fallback" aria-hidden="true" />}
        <div className="shop-cover__caption"><span>Gian hàng chính thức</span><p>{description}</p></div>
      </header>
      <div className="shop-identity">
        <Avatar className="shop-identity__logo" size={88} src={shop.logoUrl} icon={<ShopOutlined />} />
        <div className="shop-identity__copy"><h1>{shop.name}</h1><div className="shop-identity__meta">
          {shop.isVerified && <span><SafetyCertificateOutlined /> Nhà cung cấp đã xác minh</span>}
          {shop.regionCode && <span><EnvironmentOutlined /> {shop.regionCode}</span>}
          {shop.reputationScore != null && <span>Điểm uy tín {shop.reputationScore}/100</span>}
        </div></div>
        <a className="shop-identity__cta" href="#shop-products">Xem sản phẩm <ArrowRightOutlined /></a>
      </div>
      <div className="shop-content">
        <Products products={products} columns={layout.productColumnsDesktop} filters={filters} more={more} onNavigate={onNavigate} />
        <div className="shop-content__details">{sections.map((section) => {
          if (section === 'Story') return <section className="shop-detail-section" key={section}><h2>Về gian hàng</h2><Typography.Paragraph>{description}</Typography.Paragraph></section>;
          if (section === 'Reviews') return <section className="shop-detail-section" key={section}><h2>Đánh giá khách hàng</h2>{reviews || <Card><Empty description="Chưa có đánh giá" /></Card>}</section>;
          if (section === 'Contact') return <Contact key={section} shop={shop} />;
          return null;
        })}</div>
      </div>
    </div>
  </ConfigProvider>;
}
