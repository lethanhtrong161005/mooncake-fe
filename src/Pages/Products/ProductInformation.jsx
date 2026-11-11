import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Button, Empty, Image, InputNumber, Rate, Spin, Tabs, message } from 'antd';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
  LeftOutlined,
  RightOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  StarFilled,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import CustomerFooter from '../../components/layout/CustomerFooter';
import CustomerBreadcrumbBar from '../../components/layout/CustomerBreadcrumbBar';
import ReputationBadge from '../../components/reviews/ReputationBadge';
import ProductReviewStream from '../../components/reviews/ProductReviewStream';
import ProductSearchCard from '../../components/search/ProductSearchCard';
import { resolveRegionLabel } from '../../constants/productSearch';
import productService from '../../services/productService';
import '../../styles/search-page.css';
import '../../styles/product-detail.css';

const money = (value) => Number(value || 0).toLocaleString('vi-VN');

export default function ProductInformation({ onNavigate, productId }) {
  const [product, setProduct] = useState(null);
  const [loadedProductId, setLoadedProductId] = useState(null);
  const [variantId, setVariantId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const loading = Boolean(productId) && loadedProductId !== productId;

  useEffect(() => {
    if (!productId) return undefined;
    const controller = new AbortController();
    productService.detail(productId, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setProduct(result);
        setActiveImageIdx(0);
        const initialVariant = result.variants?.find((item) => item.isAvailable) || result.variants?.[0];
        setVariantId(initialVariant?.id || null);
        const initialMin = Math.max(1, Number(result.minOrderQty ?? 1));
        const initialMax = result.maxOrderQty ? Number(result.maxOrderQty) : null;
        setQuantity(initialMax && initialMin > initialMax ? initialMax : initialMin);
        productService.recordView(productId, { source: 'Direct' }).catch(() => {});
      })
      .catch(() => {
        if (!controller.signal.aborted) setProduct(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadedProductId(productId);
      });

    productService.related(productId, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        const items = Array.isArray(result) ? result : result?.items;
        setRelatedProducts(Array.isArray(items) ? items.slice(0, 4) : []);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [productId]);

  const minQty = useMemo(() => Math.max(1, Number(product?.minOrderQty ?? 1)), [product]);
  const maxQty = useMemo(
    () => (product?.maxOrderQty ? Math.max(minQty, Number(product.maxOrderQty)) : null),
    [product, minQty]
  );
  const clampQuantity = useCallback((value) => {
    const number = Number(value);
    if (Number.isNaN(number) || number < minQty) return minQty;
    if (maxQty && number > maxQty) return maxQty;
    return Math.floor(number);
  }, [minQty, maxQty]);
  const quickQuantityOptions = useMemo(() => {
    const options = new Set([minQty]);
    [20, 50, 100, 200, 500, 1000].forEach((value) => {
      if (value >= minQty && (!maxQty || value <= maxQty)) options.add(value);
    });
    if (maxQty) options.add(maxQty);
    return Array.from(options).sort((a, b) => a - b).slice(0, 5);
  }, [minQty, maxQty]);
  const variant = useMemo(
    () => product?.variants?.find((item) => item.id === variantId) || product?.variants?.[0],
    [product, variantId]
  );
  const images = useMemo(
    () => product?.images?.length ? product.images : [{ id: 'default', imageUrl: '/hero_mooncake_bg.jpg' }],
    [product]
  );
  const currentImageUrl = images[activeImageIdx]?.imageUrl || images[0]?.imageUrl;
  const unitPrice = variant?.price ?? product?.basePrice ?? 0;
  const totalPrice = unitPrice * quantity;
  const productStatus = product?.effectiveStatus || product?.status;
  const available = productStatus === 'Active' && Boolean(variant?.isAvailable);
  const rating = Number(product?.averageRating || 0);
  const reviewCount = Number(product?.reviewCount || 0);
  const shopId = product?.shop?.slug || product?.shop?.shopId || product?.shop?.id;

  const handleOrder = () => {
    if (!available) return message.warning('Biến thể sản phẩm này hiện đang tạm hết hàng.');
    const validQty = clampQuantity(quantity);
    if (validQty !== quantity) {
      setQuantity(validQty);
      message.warning(`Số lượng đặt hàng chỉ cho phép từ ${minQty} đến ${maxQty || 'không giới hạn'} ${product.unit || 'hộp'}.`);
      return;
    }
    const resolvedProductId = product?.productId || product?.id || productId;
    sessionStorage.setItem('b2b_order_draft', JSON.stringify({
      productId: resolvedProductId,
      variantId: variantId || variant?.id,
      quantity: validQty,
    }));
    onNavigate?.(`dat-hang-thiet-ke?productId=${resolvedProductId}`);
  };

  const scrollToRelated = () => {
    const section = document.getElementById('related-products');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (section) section.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    else onNavigate?.('tim-kiem');
  };

  return (
    <div className="product-detail-page">
      <CustomerHeader onNavigate={onNavigate} activeKey="tim-kiem" />
      <CustomerBreadcrumbBar
        items={[
          { label: 'Sản phẩm', onClick: () => onNavigate?.('tim-kiem') },
          { label: product?.name || 'Chi tiết sản phẩm' },
        ]}
        action={{
          label: 'Quay lại danh mục',
          icon: <ArrowLeftOutlined />,
          onClick: () => onNavigate?.('tim-kiem'),
        }}
        onNavigate={onNavigate}
      />

      <main className="product-detail__main">
        {loading ? (
          <div className="product-detail__loading"><Spin size="large" description="Đang tải sản phẩm..." /></div>
        ) : !product ? (
          <div className="product-detail__empty">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Sản phẩm không tồn tại hoặc chưa được xuất bản" />
            <Button type="primary" onClick={() => onNavigate?.('tim-kiem')}>Khám phá sản phẩm</Button>
          </div>
        ) : (
          <>
            <section className="product-detail__hero" aria-labelledby="product-detail-title">
              <div className="product-detail__gallery">
                <div className="product-detail__image-stage">
                  <Image
                    src={currentImageUrl}
                    alt={`${product.name} - ảnh ${activeImageIdx + 1}`}
                    width="100%"
                    height="100%"
                    style={{ objectFit: 'contain', display: 'block' }}
                    fallback="/hero_mooncake_bg.jpg"
                    preview={{ cover: <span>Xem ảnh lớn</span> }}
                  />
                  {!available && <span className="product-detail__image-status">Tạm hết hàng</span>}
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="product-detail__image-arrow product-detail__image-arrow--left"
                        aria-label="Xem ảnh trước"
                        onClick={() => setActiveImageIdx((current) => current === 0 ? images.length - 1 : current - 1)}
                      >
                        <LeftOutlined />
                      </button>
                      <button
                        type="button"
                        className="product-detail__image-arrow product-detail__image-arrow--right"
                        aria-label="Xem ảnh tiếp theo"
                        onClick={() => setActiveImageIdx((current) => current === images.length - 1 ? 0 : current + 1)}
                      >
                        <RightOutlined />
                      </button>
                      <span className="product-detail__image-count">{activeImageIdx + 1}/{images.length}</span>
                    </>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="product-detail__thumbnails" aria-label="Ảnh sản phẩm">
                    {images.map((image, index) => (
                      <button
                        key={image.id || index}
                        type="button"
                        aria-label={`Xem ảnh ${index + 1}`}
                        aria-pressed={activeImageIdx === index}
                        className={`product-detail__thumbnail${activeImageIdx === index ? ' is-active' : ''}`}
                        onClick={() => setActiveImageIdx(index)}
                      >
                        <img src={image.imageUrl} alt={`${product.name} - ảnh thu nhỏ ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="product-detail__info">
                {product.category?.name && <span className="product-detail__category">{product.category.name}</span>}
                <h1 id="product-detail-title">{product.name}</h1>
                <div className="product-detail__rating">
                  {reviewCount > 0 && rating > 0 ? (
                    <>
                      <Rate disabled allowHalf value={rating} />
                      <strong>{rating.toFixed(1)}</strong>
                      <span>{reviewCount} đánh giá</span>
                    </>
                  ) : <span>Chưa có đánh giá</span>}
                </div>

                <div className="product-detail__shop">
                  <span className="product-detail__shop-icon"><ShopOutlined /></span>
                  <div className="product-detail__shop-copy">
                    <div>
                      <strong>{product.shop?.name || 'Nhà cung cấp'}</strong>
                      {product.shop?.isVerified === true && <CheckCircleFilled aria-label="Đã xác minh" />}
                    </div>
                    <div className="product-detail__shop-meta">
                      <ReputationBadge score={product.shop?.reputationScore} />
                      {product.shop?.regionCode && <span>{resolveRegionLabel(product.shop.regionCode)}</span>}
                    </div>
                  </div>
                  {shopId && (
                    <Button type="link" onClick={() => onNavigate?.(`nha-cung-cap/gian-hang/${shopId}`)}>
                      Xem gian hàng <ArrowRightOutlined />
                    </Button>
                  )}
                </div>

                <div className="product-detail__purchase">
                  <div className="product-detail__price-row">
                    <div>
                      <span className="product-detail__field-label">Đơn giá niêm yết</span>
                      <div className="product-detail__price">
                        <strong data-testid="product-detail-unit-price">{money(unitPrice)} ₫</strong>
                        <span>/ {product.unit || 'sản phẩm'}</span>
                      </div>
                    </div>
                    <div className="product-detail__limits">
                      <span>Tối thiểu {minQty} {product.unit || 'sản phẩm'}</span>
                      {maxQty && <span>Tối đa {maxQty} {product.unit || 'sản phẩm'}</span>}
                    </div>
                  </div>

                  {product.variants?.length > 0 && (
                    <fieldset className="product-detail__variants">
                      <legend>Chọn biến thể <span>{product.variants.length} lựa chọn</span></legend>
                      <div className="product-detail__variant-grid">
                        {product.variants.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            disabled={!item.isAvailable}
                            aria-pressed={item.id === variantId}
                            className={`product-detail__variant${item.id === variantId ? ' is-selected' : ''}`}
                            onClick={() => setVariantId(item.id)}
                          >
                            <strong>{item.name}</strong>
                            <span>{money(item.price)} ₫ <small>{item.isAvailable ? item.sku || 'Có sẵn' : 'Tạm hết'}</small></span>
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  )}

                  <div className="product-detail__quantity">
                    <div>
                      <label htmlFor="product-quantity">Số lượng đặt</label>
                      <span>Theo đơn vị {product.unit || 'sản phẩm'}</span>
                    </div>
                    <InputNumber
                      id="product-quantity"
                      min={minQty}
                      max={maxQty ?? undefined}
                      precision={0}
                      value={quantity}
                      disabled={!available}
                      onChange={(value) => value !== null && setQuantity(clampQuantity(value))}
                      onBlur={() => setQuantity((value) => clampQuantity(value))}
                      size="large"
                      aria-label="Số lượng đặt"
                    />
                  </div>
                  {available && quickQuantityOptions.length > 1 && (
                    <div className="product-detail__quick-quantities" aria-label="Chọn nhanh số lượng">
                      {quickQuantityOptions.map((value) => (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={quantity === value}
                          className={quantity === value ? 'is-selected' : ''}
                          onClick={() => setQuantity(value)}
                        >
                          {value} {product.unit || 'sản phẩm'}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="product-detail__total">
                    <span>Tạm tính</span>
                    <strong>{money(totalPrice)} ₫</strong>
                  </div>
                  <p className="product-detail__price-note">Giá và tổng tiền được xác nhận lại ở bước đặt hàng.</p>

                  {!available && (
                    <Alert
                      type="warning"
                      showIcon
                      title="Biến thể này đang tạm hết hàng"
                      description="Bạn có thể xem sản phẩm tương tự hoặc quay lại sau khi nhà cung cấp cập nhật tồn kho."
                    />
                  )}
                  <div className="product-detail__actions">
                    <Button
                      type="primary"
                      size="large"
                      icon={<ShoppingCartOutlined />}
                      disabled={!available}
                      onClick={handleOrder}
                    >
                      {available ? 'Đặt hàng doanh nghiệp' : 'Tạm hết hàng'}
                    </Button>
                    {!available && <Button size="large" onClick={scrollToRelated}>Xem sản phẩm tương tự</Button>}
                  </div>
                  {product.supportsCustomPackaging && (
                    <p className="product-detail__packaging-note">
                      Có thể yêu cầu bao bì riêng. Chi phí được xác nhận trong bước đặt hàng.
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="product-detail__details" aria-label="Thông tin sản phẩm">
              <h2>Thông tin sản phẩm</h2>
              <Tabs
                defaultActiveKey="description"
                items={[
                  {
                    key: 'description',
                    label: 'Mô tả',
                    children: <p className="product-detail__description">{product.description || 'Nhà cung cấp chưa cập nhật mô tả cho sản phẩm này.'}</p>,
                  },
                  {
                    key: 'ingredients',
                    label: 'Thành phần',
                    children: (
                      <div className="product-detail__description">
                        <h3>Nguyên liệu được nhà cung cấp công bố</h3>
                        <p>{product.ingredients || 'Nhà cung cấp chưa cập nhật thông tin thành phần.'}</p>
                      </div>
                    ),
                  },
                  {
                    key: 'ordering',
                    label: 'Thông tin đặt hàng',
                    children: (
                      <dl className="product-detail__specs">
                        {[
                          ['Đơn vị tính', product.unit || 'Chưa cập nhật'],
                          ['Số lượng tối thiểu', `${minQty} ${product.unit || 'sản phẩm'}`],
                          ['Số lượng tối đa', maxQty ? `${maxQty} ${product.unit || 'sản phẩm'}` : 'Không giới hạn'],
                          ['Tình trạng', available ? 'Có thể đặt hàng' : 'Tạm hết hàng'],
                          ['Bao bì riêng', product.supportsCustomPackaging ? 'Có hỗ trợ' : 'Không hỗ trợ'],
                          ['Khu vực nhà cung cấp', resolveRegionLabel(product.shop?.regionCode || '') || 'Chưa cập nhật'],
                        ].map(([label, value]) => (
                          <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                        ))}
                      </dl>
                    ),
                  },
                  {
                    key: 'reviews',
                    label: <span><StarFilled /> Đánh giá ({reviewCount})</span>,
                    children: <ProductReviewStream productId={product.productId || product.id} productName={product.name} />,
                  },
                ]}
              />
            </section>

            {relatedProducts.length > 0 && (
              <section id="related-products" className="product-detail__related" aria-labelledby="related-products-title">
                <div className="product-detail__section-heading">
                  <div>
                    <h2 id="related-products-title">Sản phẩm tương tự</h2>
                    <p>Thêm lựa chọn đang được công bố trong catalog.</p>
                  </div>
                  <Button type="link" onClick={() => onNavigate?.('tim-kiem')}>
                    Xem tất cả <ArrowRightOutlined />
                  </Button>
                </div>
                <div className="product-detail__related-grid">
                  {relatedProducts.map((item) => (
                    <ProductSearchCard
                      key={item.productId || item.id}
                      item={item}
                      viewMode="grid"
                      onNavigate={onNavigate}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <CustomerFooter onNavigate={onNavigate} />
    </div>
  );
}
