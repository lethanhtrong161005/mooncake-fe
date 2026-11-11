import { Button, Card, Space, Tag, Typography } from 'antd';
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

const { Title, Text } = Typography;

function resolveStatusTag(effectiveStatus) {
  const status = effectiveStatus || 'Active';
  if (status === 'Active') {
    return { color: 'success', label: 'Còn hàng' };
  }
  if (status === 'OutOfStock') {
    return { color: 'warning', label: 'Hết hàng' };
  }
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
  const totalSold = Number(item.totalSold || 0);
  const shopName = item.shop?.name || 'Xưởng bánh đối tác';
  const regionCode = item.shop?.regionCode || '';
  const regionLabel = resolveRegionLabel(regionCode);
  const reputationScore = Number(item.shop?.reputationScore || 0);

  const handleOpenDetail = () => {
    if (productId) {
      onNavigate?.(`san-pham/${productId}`);
    }
  };

  const renderCoverImage = (height = 190) => {
    if (item.primaryImageUrl) {
      return (
        <div
          style={{
            position: 'relative',
            height,
            overflow: 'hidden',
            background: '#efeeec',
          }}
        >
          <img
            alt={item.name}
            src={item.primaryImageUrl}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = '/hero_mooncake_bg.jpg';
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              display: 'flex',
              gap: 6,
              flexWrap: 'wrap',
            }}
          >
            <Tag color={statusTag.color} style={{ margin: 0, fontWeight: 600 }}>
              {statusTag.label}
            </Tag>
            {item.supportsCustomPackaging && (
              <Tag color="gold" style={{ margin: 0, fontWeight: 600, color: '#5c3c00' }}>
                In logo
              </Tag>
            )}
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          position: 'relative',
          height,
          background: 'linear-gradient(135deg, #8c1524 0%, #5c0f19 60%, #3a0910 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
          color: '#faeae1',
        }}
      >
        <GiftOutlined style={{ fontSize: 36, color: '#f3c677', marginBottom: 8 }} />
        <Text
          style={{
            color: '#f7dfd4',
            fontSize: 12,
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          Bánh Trung Thu Doanh Nghiệp
        </Text>
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
          }}
        >
          <Tag color={statusTag.color} style={{ margin: 0, fontWeight: 600 }}>
            {statusTag.label}
          </Tag>
          {item.supportsCustomPackaging && (
            <Tag color="gold" style={{ margin: 0, fontWeight: 600, color: '#5c3c00' }}>
              In logo
            </Tag>
          )}
        </div>
      </div>
    );
  };

  if (viewMode === 'list') {
    return (
      <Card
        hoverable
        onClick={handleOpenDetail}
        data-testid="product-search-card"
        style={{
          borderRadius: 10,
          borderColor: '#e7e5e4',
          overflow: 'hidden',
        }}
        styles={{ body: { padding: 16 } }}
      >
        <div
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              width: 220,
              flexShrink: 0,
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            {renderCoverImage(156)}
          </div>

          <div
            style={{
              flex: 1,
              minWidth: 220,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Space size={6} wrap style={{ marginBottom: 6 }}>
                <Tag
                  style={{
                    margin: 0,
                    background: '#fdf5f0',
                    borderColor: '#e8cfc4',
                    color: '#8c1524',
                    fontSize: 11,
                  }}
                >
                  Đặt sỉ B2B
                </Tag>
                {regionLabel && (
                  <Tag icon={<EnvironmentOutlined />} style={{ margin: 0, fontSize: 11 }}>
                    {regionLabel}
                  </Tag>
                )}
              </Space>

              <Title
                level={5}
                ellipsis={{ rows: 2 }}
                style={{ margin: '0 0 6px', color: '#1f1f1f', fontSize: 16 }}
              >
                {item.name}
              </Title>

              {item.shortDescription && (
                <Text
                  type="secondary"
                  ellipsis
                  style={{ display: 'block', fontSize: 12, marginBottom: 8 }}
                >
                  {item.shortDescription}
                </Text>
              )}

              <Space size={12} wrap>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  <ShopOutlined style={{ color: '#8c1524', marginRight: 4 }} />
                  {shopName}
                </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  <SafetyCertificateOutlined style={{ color: '#52c41a', marginRight: 4 }} />
                  Gian hàng đã xác minh
                  {reputationScore > 0 ? ` (${reputationScore}đ)` : ''}
                </Text>
                {rating > 0 && (
                  <Text style={{ fontSize: 12, color: '#d48806', fontWeight: 600 }}>
                    <StarFilled /> {rating.toFixed(1)}
                    {reviewCount > 0 ? ` (${reviewCount})` : ''}
                  </Text>
                )}
              </Space>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginTop: 12,
                paddingTop: 10,
                borderTop: '1px dashed #f0e6e0',
                flexWrap: 'wrap',
                gap: 8,
              }}
            >
              <div>
                <Text
                  strong
                  data-testid="product-card-price"
                  style={{ color: '#8c1524', fontSize: 18, display: 'block' }}
                >
                  {priceText}
                </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Tối thiểu {formatNumber(minOrderQty)} {unit}
                  {totalSold > 0 ? ` • Đã bán ${formatNumber(totalSold)}` : ''}
                </Text>
              </div>

              <Button
                type="primary"
                size="small"
                icon={<ArrowRightOutlined />}
                iconPlacement="end"
                style={{ background: '#8c1524', borderColor: '#8c1524' }}
              >
                Xem & Đặt sỉ
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      hoverable
      onClick={handleOpenDetail}
      data-testid="product-search-card"
      cover={renderCoverImage(185)}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        borderColor: '#e7e5e4',
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(28, 25, 23, 0.04)',
      }}
      styles={{
        body: {
          padding: 14,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 6,
            marginBottom: 6,
            flexWrap: 'wrap',
          }}
        >
          {item.category?.name ? (
            <Tag
              style={{
                margin: 0,
                background: '#f5f5f4',
                borderColor: '#e7e5e4',
                color: '#57534e',
                fontSize: 11,
              }}
            >
              {item.category.name}
            </Tag>
          ) : (
            <span />
          )}

          {regionLabel && (
            <Text type="secondary" style={{ fontSize: 11 }}>
              <EnvironmentOutlined style={{ marginRight: 3 }} />
              {regionLabel}
            </Text>
          )}
        </div>

        <Title
          level={5}
          ellipsis={{ rows: 2 }}
          style={{
            margin: '0 0 6px',
            fontSize: 15,
            lineHeight: 1.4,
            minHeight: 42,
            color: '#1f1f1f',
          }}
        >
          {item.name}
        </Title>

        <div style={{ marginBottom: 8 }}>
          <Text
            type="secondary"
            ellipsis
            style={{ fontSize: 12, display: 'block', color: '#595959' }}
          >
            <ShopOutlined style={{ color: '#8c1524', marginRight: 5 }} />
            {shopName}
          </Text>
        </div>
      </div>

      <div>
        <div
          style={{
            paddingTop: 8,
            borderTop: '1px dashed #f0e6e0',
          }}
        >
          <Text
            strong
            data-testid="product-card-price"
            style={{ color: '#8c1524', fontSize: 17, display: 'block' }}
          >
            {priceText}
          </Text>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 4,
              flexWrap: 'wrap',
              gap: 4,
            }}
          >
            <Text type="secondary" style={{ fontSize: 12 }}>
              Tối thiểu <strong>{formatNumber(minOrderQty)}</strong> {unit}
            </Text>
            {totalSold > 0 && (
              <Text type="secondary" style={{ fontSize: 11 }}>
                Đã bán {formatNumber(totalSold)}
              </Text>
            )}
          </div>
        </div>

        <div
          style={{
            marginTop: 8,
            paddingTop: 8,
            borderTop: '1px solid #f7efe9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Space size={4}>
            <SafetyCertificateOutlined style={{ color: '#52c41a', fontSize: 13 }} />
            <Text type="secondary" style={{ fontSize: 11 }}>
              {reputationScore > 0 ? `Điểm uy tín ${reputationScore}đ` : 'Thông tin nhà cung cấp'}
            </Text>
          </Space>

          {rating > 0 && (
            <Text style={{ fontSize: 12, color: '#d48806', fontWeight: 600 }}>
              ★ {rating.toFixed(1)}
            </Text>
          )}
        </div>
      </div>
    </Card>
  );
}
