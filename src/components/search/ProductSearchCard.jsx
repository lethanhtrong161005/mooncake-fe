import { Button, Card, Tag, Typography } from 'antd';
import {
  ArrowRightOutlined,
  EnvironmentOutlined,
  GiftOutlined,
  SafetyCertificateOutlined,
  ShopOutlined,
  StarFilled,
} from '@ant-design/icons';
import { resolveRegionLabel } from '../../constants/productSearch';
import { formatNumber, formatPriceRange } from '../../utils/formatCurrency';

const { Text, Title } = Typography;

function resolveStatusTag(status) {
  if (!status || status === 'Active') return { color: 'success', label: 'Còn hàng' };
  if (status === 'OutOfStock') return { color: 'warning', label: 'Hết hàng' };
  return { color: 'default', label: 'Ngừng kinh doanh' };
}

export default function ProductSearchCard({ item, viewMode = 'grid', onNavigate }) {
  const productId = item.productId || item.id;
  const statusTag = resolveStatusTag(item.effectiveStatus || item.status);
  const priceText = formatPriceRange(item.minPrice, item.maxPrice, item.basePrice);
  const minOrderQty = Number(item.minOrderQty || 1);
  const unit = item.unit || 'hộp';
  const rating = Number(item.averageRating || 0);
  const reviewCount = Number(item.reviewCount || 0);
  const shopName = item.shop?.name || 'Xưởng bánh đối tác';
  const regionLabel = resolveRegionLabel(item.shop?.regionCode || '');
  const reputationScore = Number(item.shop?.reputationScore || 0);

  const openDetail = () => {
    if (productId) onNavigate?.(`san-pham/${productId}`);
  };

  const handleKeyDown = (event) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openDetail();
    }
  };

  return (
    <Card
      className={`search-product-card search-product-card--${viewMode}`}
      hoverable
      onClick={openDetail}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`Xem sản phẩm ${item.name}`}
      data-testid="product-search-card"
      styles={{ body: { padding: 0, flex: 1, display: 'flex', flexDirection: viewMode === 'list' ? 'row' : 'column' } }}
    >
      <div className="search-product-card__media">
        {item.primaryImageUrl ? (
          <img
            src={item.primaryImageUrl}
            alt={item.name}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = '/hero_mooncake_bg.jpg';
            }}
          />
        ) : (
          <div className="search-product-card__placeholder">
            <GiftOutlined />
            <span>Nguyệt Phố</span>
          </div>
        )}
        <div className="search-product-card__badges">
          <Tag color={statusTag.color}>{statusTag.label}</Tag>
          {item.supportsCustomPackaging && <Tag color="gold">In logo</Tag>}
        </div>
      </div>

      <div className="search-product-card__content">
        <div className="search-product-card__meta">
          <Text>{item.category?.name || 'Bánh Trung thu'}</Text>
          {regionLabel && <Text><EnvironmentOutlined /> {regionLabel}</Text>}
        </div>
        <Title level={3} className="search-product-card__name">{item.name}</Title>
        {viewMode === 'list' && item.shortDescription && (
          <Text className="search-product-card__description">{item.shortDescription}</Text>
        )}
        <Text className="search-product-card__shop"><ShopOutlined /> {shopName}</Text>

        <div className="search-product-card__purchase">
          <div>
            <Text strong data-testid="product-card-price" className="search-product-card__price">
              {priceText}
            </Text>
            <Text className="search-product-card__minimum">
              Đặt tối thiểu {formatNumber(minOrderQty)} {unit}
            </Text>
          </div>
          <Button
            type="text"
            className="search-product-card__open"
            onClick={(event) => { event.stopPropagation(); openDetail(); }}
            aria-label={`Xem ${item.name}`}
          >
            <ArrowRightOutlined />
          </Button>
        </div>

        <div className="search-product-card__trust">
          <Text><SafetyCertificateOutlined /> {reputationScore > 0 ? `Uy tín ${reputationScore} điểm` : 'Thông tin nhà cung cấp'}</Text>
          {rating > 0 && (
            <Text><StarFilled /> {rating.toFixed(1)}{reviewCount > 0 ? ` (${reviewCount})` : ''}</Text>
          )}
        </div>
      </div>
    </Card>
  );
}
