import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Button, Empty, Image, InputNumber, Rate, Spin, Tabs, Tag, message } from 'antd';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
  FileTextOutlined,
  LeftOutlined,
  RightOutlined,
  SafetyCertificateOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  StarFilled,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import CustomerFooter from '../../components/layout/CustomerFooter';
import CustomerBreadcrumbBar from '../../components/layout/CustomerBreadcrumbBar';
import ReputationBadge from '../../components/reviews/ReputationBadge';
import ProductReviewStream from '../../components/reviews/ProductReviewStream';
import ProductSearchCard from '../../components/search/ProductSearchCard';
import productService from '../../services/productService';

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
    productService
      .detail(productId, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setProduct(result);
        setActiveImageIdx(0);
        const initialVariant =
          result.variants?.find((item) => item.isAvailable) || result.variants?.[0];
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

    productService
      .related(productId, controller.signal)
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
  const clampQuantity = useCallback(
    (value) => {
      const number = Number(value);
      if (Number.isNaN(number) || number < minQty) return minQty;
      if (maxQty && number > maxQty) return maxQty;
      return Math.floor(number);
    },
    [minQty, maxQty]
  );
  const quickQuantityOptions = useMemo(() => {
    const options = new Set([minQty]);
    [20, 50, 100, 200, 500, 1000].forEach((value) => {
      if (value >= minQty && (!maxQty || value <= maxQty)) options.add(value);
    });
    if (maxQty) options.add(maxQty);
    return Array.from(options)
      .sort((a, b) => a - b)
      .slice(0, 5);
  }, [minQty, maxQty]);
  const variant = useMemo(
    () => product?.variants?.find((item) => item.id === variantId) || product?.variants?.[0],
    [product, variantId]
  );
  const images = useMemo(
    () =>
      product?.images?.length
        ? product.images
        : [{ id: 'default', imageUrl: '/hero_mooncake_bg.jpg' }],
    [product]
  );
  const currentImageUrl = images[activeImageIdx]?.imageUrl || images[0]?.imageUrl;
  const unitPrice = variant?.price ?? product?.basePrice ?? 0;
  const totalPrice = unitPrice * quantity;
  const productStatus = product?.effectiveStatus || product?.status;
  const available = productStatus === 'Active' && Boolean(variant?.isAvailable);
  const rating = Number(product?.averageRating || 0);
  const reviewCount = Number(product?.reviewCount || 0);

  const handleOrder = () => {
    if (!available) return message.warning('Biến thể sản phẩm này hiện đang tạm hết hàng.');
    const validQty = clampQuantity(quantity);
    if (validQty !== quantity) {
      setQuantity(validQty);
      message.warning(
        `Số lượng đặt hàng chỉ cho phép từ ${minQty} đến ${maxQty || 'không giới hạn'} ${product.unit || 'hộp'}.`
      );
      return;
    }
    const resolvedProductId = product?.productId || product?.id || productId;
    sessionStorage.setItem(
      'b2b_order_draft',
      JSON.stringify({
        productId: resolvedProductId,
        variantId: variantId || variant?.id,
        quantity: validQty,
      })
    );
    onNavigate?.(`dat-hang-thiet-ke?productId=${resolvedProductId}`);
  };

  const scrollToRelated = () => {
    const section = document.getElementById('related-products');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else onNavigate?.('tim-kiem');
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex flex-col font-['Be_Vietnam_Pro',sans-serif] text-stone-900">
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
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Spin size="large" description="Đang tải sản phẩm..." />
          </div>
        ) : !product ? (
          <div className="bg-white border border-stone-200 p-10 sm:p-16 text-center">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Sản phẩm không tồn tại hoặc chưa được xuất bản"
            />
            <Button
              type="primary"
              className="mt-4 !bg-[#8c1524]"
              onClick={() => onNavigate?.('tim-kiem')}
            >
              Khám phá sản phẩm
            </Button>
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] bg-white border border-stone-200 shadow-[0_12px_32px_rgba(28,25,23,0.06)]">
              <div className="p-4 sm:p-6 lg:border-r lg:border-stone-200">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-[#202020]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={currentImageUrl}
                      alt={`${product.name} - ảnh ${activeImageIdx + 1}`}
                      width="100%"
                      height="100%"
                      style={{ objectFit: 'contain', display: 'block' }}
                      fallback="/hero_mooncake_bg.jpg"
                      preview={{
                        cover: <span className="text-sm font-medium">Xem ảnh lớn</span>,
                      }}
                    />
                  </div>
                  {!available && (
                    <span className="pointer-events-none absolute left-3 top-3 z-10 rounded bg-black/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                      Tạm hết hàng
                    </span>
                  )}
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Xem ảnh trước"
                        onClick={() =>
                          setActiveImageIdx((current) =>
                            current === 0 ? images.length - 1 : current - 1
                          )
                        }
                        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-0 bg-black/55 text-white transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        <LeftOutlined />
                      </button>
                      <button
                        type="button"
                        aria-label="Xem ảnh tiếp theo"
                        onClick={() =>
                          setActiveImageIdx((current) =>
                            current === images.length - 1 ? 0 : current + 1
                          )
                        }
                        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-0 bg-black/55 text-white transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        <RightOutlined />
                      </button>
                    </>
                  )}
                  <span className="pointer-events-none absolute bottom-3 right-3 z-10 rounded bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">
                    {activeImageIdx + 1}/{images.length}
                  </span>
                </div>
                <div className="mt-3 flex gap-3 overflow-x-auto px-1 pb-2 pt-1">
                  {images.map((image, index) => (
                    <button
                      key={image.id || index}
                      type="button"
                      aria-label={`Xem ảnh ${index + 1}`}
                      aria-pressed={activeImageIdx === index}
                      onClick={() => setActiveImageIdx(index)}
                      className={`h-[72px] w-[72px] shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 bg-[#202020] p-0 transition-all ${
                        activeImageIdx === index
                          ? 'border-stone-900 ring-2 ring-stone-900/10'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image.imageUrl}
                        alt={`${product.name} - ảnh thu nhỏ ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col p-5 sm:p-7 lg:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#8c1524]/8 text-[#8c1524]">
                      <ShopOutlined />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-[13px] font-semibold">
                          {product.shop?.name || 'Nhà cung cấp'}
                        </span>
                        {product.shop?.isVerified === true && (
                          <CheckCircleFilled className="text-[#2f6b55]" aria-label="Đã xác minh" />
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-stone-500">
                        <ReputationBadge score={product.shop?.reputationScore} />
                        {product.shop?.regionCode && <span>Khu vực {product.shop.regionCode}</span>}
                      </div>
                    </div>
                  </div>
                  <Button
                    size="small"
                    onClick={() =>
                      onNavigate?.(
                        `nha-cung-cap/gian-hang/${product.shop?.slug || product.shop?.shopId || product.shop?.id}`
                      )
                    }
                  >
                    Xem gian hàng
                  </Button>
                </div>

                <div className="py-5">
                  <h1 className="m-0 max-w-3xl text-xl font-bold leading-tight tracking-[-0.02em] sm:text-2xl lg:text-[1.75rem]">
                    {product.name}
                  </h1>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-stone-500">
                    {reviewCount > 0 && rating > 0 ? (
                      <>
                        <Rate disabled allowHalf value={rating} className="text-sm" />
                        <span className="font-semibold text-stone-800">{rating.toFixed(1)}</span>
                        <span>{reviewCount} đánh giá</span>
                      </>
                    ) : (
                      <span>Chưa có đánh giá</span>
                    )}
                    {product.category?.name && <Tag className="m-0">{product.category.name}</Tag>}
                  </div>
                </div>

                <div className="border-y border-stone-200 bg-[#faf9f7] px-4 py-4 sm:px-5">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <span className="block text-xs text-stone-500">Đơn giá niêm yết</span>
                      <span
                        data-testid="product-detail-unit-price"
                        className="text-2xl font-bold tracking-tight text-[#8c1524] sm:text-3xl"
                      >
                        {money(unitPrice)} ₫
                      </span>
                      <span className="ml-2 text-xs text-stone-500">
                        / {product.unit || 'sản phẩm'}
                      </span>
                    </div>
                    <div className="text-right text-xs leading-5 text-stone-500">
                      <span className="block">
                        Tối thiểu {minQty} {product.unit || 'sản phẩm'}
                      </span>
                      {maxQty && (
                        <span className="block">
                          Tối đa {maxQty} {product.unit || 'sản phẩm'}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="mb-0 mt-2 text-xs text-stone-500">
                    Giá và tổng tiền sẽ được hệ thống xác nhận lại ở bước đặt hàng.
                  </p>
                </div>

                {product.variants?.length > 0 && (
                  <div className="py-5">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <label className="text-[13px] font-semibold">Chọn biến thể</label>
                      <span className="text-xs text-stone-500">
                        {product.variants.length} lựa chọn
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {product.variants.map((item) => {
                        const selected = item.id === variantId;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            disabled={!item.isAvailable}
                            onClick={() => setVariantId(item.id)}
                            className={`min-h-20 border p-3 text-left transition-colors ${!item.isAvailable ? 'cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400' : selected ? 'cursor-pointer border-[#8c1524] bg-[#8c1524]/[0.035] ring-1 ring-[#8c1524]' : 'cursor-pointer border-stone-200 bg-white hover:border-stone-400'}`}
                          >
                            <span className="block text-xs font-semibold leading-snug">
                              {item.name}
                            </span>
                            <span className="mt-2 flex items-center justify-between gap-2 text-xs">
                              <span
                                className={item.isAvailable ? 'font-semibold text-[#8c1524]' : ''}
                              >
                                {money(item.price)} ₫
                              </span>
                              {!item.isAvailable ? (
                                <span>Tạm hết</span>
                              ) : (
                                <span className="text-stone-500">{item.sku || 'Có sẵn'}</span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="border-t border-stone-200 pt-5">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <label htmlFor="product-quantity" className="block text-[13px] font-semibold">
                        Số lượng
                      </label>
                      <span className="mt-1 block text-xs text-stone-500">
                        Theo đơn vị {product.unit || 'sản phẩm'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
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
                        className="w-32"
                      />
                      <span className="text-xs text-stone-500">{product.unit || 'sản phẩm'}</span>
                    </div>
                  </div>
                  {available && quickQuantityOptions.length > 1 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {quickQuantityOptions.map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setQuantity(value)}
                          className={`cursor-pointer border px-3 py-1.5 text-xs ${quantity === value ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 bg-white text-stone-600'}`}
                        >
                          {value} {product.unit || 'sản phẩm'}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between border-t border-dashed border-stone-300 pt-4">
                    <span className="text-[13px] text-stone-600">Tạm tính</span>
                    <span className="text-lg font-bold text-[#8c1524]">{money(totalPrice)} ₫</span>
                  </div>
                </div>

                {!available && (
                  <Alert
                    className="mt-5 [&_.ant-alert-title]:text-[13px] [&_.ant-alert-description]:text-xs"
                    type="warning"
                    showIcon
                    title="Biến thể này đang tạm hết hàng"
                    description="Bạn có thể xem sản phẩm tương tự hoặc quay lại sau khi nhà cung cấp cập nhật tồn kho."
                  />
                )}
                <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
                  <Button
                    type="primary"
                    size="large"
                    block
                    icon={<ShoppingCartOutlined />}
                    disabled={!available}
                    onClick={handleOrder}
                    className="h-[50px] font-bold disabled:!border-stone-200 disabled:!bg-stone-200 disabled:!text-stone-500"
                    style={{
                      background: available ? '#8c1524' : undefined,
                      borderColor: available ? '#8c1524' : undefined,
                      borderRadius: 12,
                      fontSize: 14,
                    }}
                  >
                    {available ? 'Đặt hàng doanh nghiệp' : 'Tạm hết hàng'}
                  </Button>
                  {!available && (
                    <Button
                      size="large"
                      onClick={scrollToRelated}
                      className="h-[50px] !rounded-xl !text-sm"
                    >
                      Xem sản phẩm tương tự
                    </Button>
                  )}
                </div>
                {product.supportsCustomPackaging && (
                  <p className="mb-0 mt-3 text-xs text-stone-500">
                    Sản phẩm hỗ trợ yêu cầu bao bì riêng. Chi phí phát sinh được xác nhận trong bước
                    đặt hàng.
                  </p>
                )}
              </div>
            </section>

            <section className="mt-8 border border-stone-200 bg-white p-5 sm:p-7">
              <Tabs
                defaultActiveKey="description"
                items={[
                  {
                    key: 'description',
                    label: (
                      <span>
                        <FileTextOutlined className="mr-1.5" />
                        Mô tả
                      </span>
                    ),
                    children: (
                      <div className="max-w-4xl py-2 text-sm leading-7 text-stone-700 whitespace-pre-line">
                        {product.description ||
                          'Nhà cung cấp chưa cập nhật mô tả cho sản phẩm này.'}
                      </div>
                    ),
                  },
                  {
                    key: 'ingredients',
                    label: (
                      <span>
                        <SafetyCertificateOutlined className="mr-1.5" />
                        Thành phần
                      </span>
                    ),
                    children: (
                      <div className="max-w-4xl py-2">
                        <h3 className="mb-2 text-base font-semibold">
                          Nguyên liệu được nhà cung cấp công bố
                        </h3>
                        <p className="m-0 whitespace-pre-line text-sm leading-7 text-stone-700">
                          {product.ingredients ||
                            'Nhà cung cấp chưa cập nhật thông tin thành phần.'}
                        </p>
                      </div>
                    ),
                  },
                  {
                    key: 'ordering',
                    label: (
                      <span>
                        <ShoppingOutlined className="mr-1.5" />
                        Thông tin đặt hàng
                      </span>
                    ),
                    children: (
                      <dl className="grid max-w-4xl grid-cols-1 border-l border-t border-stone-200 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                          ['Đơn vị tính', product.unit || 'Chưa cập nhật'],
                          ['Số lượng tối thiểu', `${minQty} ${product.unit || 'sản phẩm'}`],
                          [
                            'Số lượng tối đa',
                            maxQty ? `${maxQty} ${product.unit || 'sản phẩm'}` : 'Không giới hạn',
                          ],
                          ['Tình trạng', available ? 'Có thể đặt hàng' : 'Tạm hết hàng'],
                          [
                            'Bao bì riêng',
                            product.supportsCustomPackaging ? 'Có hỗ trợ' : 'Không hỗ trợ',
                          ],
                          ['Khu vực nhà cung cấp', product.shop?.regionCode || 'Chưa cập nhật'],
                        ].map(([label, value]) => (
                          <div key={label} className="border-b border-r border-stone-200 p-4">
                            <dt className="text-xs text-stone-500">{label}</dt>
                            <dd className="mb-0 mt-1 text-sm font-semibold text-stone-900">
                              {value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ),
                  },
                  {
                    key: 'reviews',
                    label: (
                      <span>
                        <StarFilled className="mr-1.5 text-amber-500" />
                        Đánh giá ({reviewCount})
                      </span>
                    ),
                    children: (
                      <ProductReviewStream
                        productId={product.productId || product.id}
                        productName={product.name}
                      />
                    ),
                  },
                ]}
              />
            </section>

            {relatedProducts.length > 0 && (
              <section id="related-products" className="mt-10 scroll-mt-20">
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="m-0 text-xl font-bold tracking-tight sm:text-2xl">
                      Sản phẩm tương tự
                    </h2>
                    <p className="mb-0 mt-1 text-sm text-stone-500">
                      Thêm lựa chọn từ catalog đang được công bố.
                    </p>
                  </div>
                  <Button
                    type="link"
                    icon={<ArrowRightOutlined />}
                    iconPlacement="end"
                    onClick={() => onNavigate?.('tim-kiem')}
                    className="!text-[#8c1524]"
                  >
                    Xem tất cả
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
