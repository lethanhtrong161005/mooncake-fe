import { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Col, Descriptions, Empty, InputNumber, Radio, Row, Space, Spin, Tag, Typography } from 'antd';
import { ShoppingOutlined, ShopOutlined, SolutionOutlined } from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import ReputationBadge from '../../components/reviews/ReputationBadge';
import ProductReviewStream from '../../components/reviews/ProductReviewStream';
import productService from '../../services/productService';

const { Title, Paragraph, Text } = Typography;
const money = (value) => Number(value || 0).toLocaleString('vi-VN');

export default function ProductInformation({ onNavigate, productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(Boolean(productId));
  const [variantId, setVariantId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!productId) return undefined;
    const controller = new AbortController();
    productService.detail(productId, controller.signal).then((result) => {
      setProduct(result);
      setVariantId(result.variants?.find((item) => item.isAvailable)?.id || result.variants?.[0]?.id || null);
      setQuantity(result.minOrderQty);
      productService.recordView(productId, { source: 'Direct' }).catch(() => {});
    }).catch(() => setProduct(null)).finally(() => setLoading(false));
    return () => controller.abort();
  }, [productId]);

  const variant = useMemo(() => product?.variants?.find((item) => item.id === variantId), [product, variantId]);
  return <div style={{ minHeight: '100vh', background: '#f8f8fa' }}><CustomerHeader onNavigate={onNavigate} />
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 20px 56px' }}>
      {loading ? <Spin /> : !product ? <Empty description="Sản phẩm không tồn tại hoặc chưa được xuất bản" /> : <Row gutter={[32, 24]}>
        <Col xs={24} md={11}><Card bodyStyle={{ padding: 0 }}>
          {product.images?.[0]?.imageUrl ? <img alt={product.name} src={product.images[0].imageUrl} style={{ width: '100%', height: 390, objectFit: 'cover' }} /> : <div style={{ height: 390, display: 'grid', placeItems: 'center', background: '#f0f0f0' }}>Chưa có ảnh</div>}
          <Space wrap style={{ padding: 12 }}>{product.images?.map((image) => <img key={image.id} alt="" src={image.imageUrl} style={{ width: 66, height: 66, borderRadius: 6, objectFit: 'cover' }} />)}</Space>
        </Card></Col>
        <Col xs={24} md={13}><Tag color="success">Gian hàng đã xác minh</Tag><Title>{product.name}</Title>
          <div className="flex items-center gap-2 mb-2">
            <Text type="secondary"><ShopOutlined /> {product.shop.name}</Text>
            <ReputationBadge score={product.shop.reputationScore} />
          </div>
          <Paragraph style={{ marginTop: 16, whiteSpace: 'pre-line' }}>{product.description || 'Nhà cung cấp chưa thêm mô tả.'}</Paragraph>
          <Card size="small" title="Thành phần nguyên liệu" style={{ marginTop: 16 }}>
            <Paragraph style={{ marginBottom: 0, whiteSpace: 'pre-line' }}>{product.ingredients || 'Nhà cung cấp chưa cập nhật thành phần nguyên liệu.'}</Paragraph>
          </Card>
          <Title level={3} style={{ color: '#8c1524' }}>{money(variant?.price ?? product.basePrice)} đ</Title>
          <Text type="secondary">Đơn tối thiểu: {product.minOrderQty} {product.unit}</Text>
          <Card size="small" title="Chọn biến thể" style={{ marginTop: 18 }}><Radio.Group value={variantId} onChange={(event) => setVariantId(event.target.value)}>
            <Space direction="vertical">{product.variants.map((item) => <Radio key={item.id} value={item.id} disabled={!item.isAvailable}>
              {item.name} ({item.sku}) — {money(item.price)} đ {!item.isAvailable && <Tag>Hết hàng</Tag>}
            </Radio>)}</Space></Radio.Group></Card>
          <Space align="end" style={{ marginTop: 18 }}><div><Text>Số lượng</Text><br /><InputNumber min={product.minOrderQty} max={product.maxOrderQty || 1000000} value={quantity} onChange={(value) => setQuantity(value || product.minOrderQty)} /></div>
            <Button type="primary" size="large" icon={<ShoppingOutlined />} disabled={!variant?.isAvailable} onClick={() => {
              sessionStorage.setItem('b2b_order_draft', JSON.stringify({
                productId: product.id,
                variantId,
                quantity,
              }));
              onNavigate?.('dat-hang-thiet-ke');
            }}>Đặt hàng doanh nghiệp</Button>
            <Button size="large" icon={<SolutionOutlined />} onClick={() => onNavigate?.('so-sanh-bao-gia')}>Tạo RFQ</Button></Space>
          {product.supportsCustomPackaging && <Alert style={{ marginTop: 18 }} type="info" showIcon message="Sản phẩm hỗ trợ bao bì và logo theo thương hiệu doanh nghiệp." />}
        </Col>
        <Col span={24}><Card title="Thông tin đặt hàng"><Descriptions bordered column={{ xs: 1, md: 3 }}><Descriptions.Item label="Danh mục">{product.category?.name || 'Chưa phân loại'}</Descriptions.Item><Descriptions.Item label="Đơn vị">{product.unit}</Descriptions.Item><Descriptions.Item label="Đánh giá">{product.averageRating ? `${Number(product.averageRating).toFixed(1)} / 5 (${product.reviewCount})` : 'Chưa có đánh giá'}</Descriptions.Item></Descriptions></Card></Col>
        <Col span={24}>
          <ProductReviewStream productId={product.id} productName={product.name} />
        </Col>
      </Row>}
    </main>
  </div>;
}
