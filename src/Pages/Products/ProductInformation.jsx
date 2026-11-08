import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Empty,
  Image,
  InputNumber,
  Rate,
  Row,
  Space,
  Spin,
  Tabs,
  Tag,
  Tooltip,
  Typography,
  message,
} from 'antd';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  CrownOutlined,
  FileTextOutlined,
  HomeOutlined,
  SafetyCertificateFilled,
  SafetyCertificateOutlined,
  ShopOutlined,
  ShoppingOutlined,
  StarFilled,
  ThunderboltFilled,
  TruckOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import CustomerFooter from '../../components/layout/CustomerFooter';
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
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!productId) return undefined;
    const controller = new AbortController();
    setLoading(true);

    productService
      .detail(productId, controller.signal)
      .then((result) => {
        setProduct(result);
        const initialVariant = result.variants?.find((item) => item.isAvailable) || result.variants?.[0];
        setVariantId(initialVariant?.id || null);
        const initialMin = Math.max(1, Number(result.minOrderQty ?? 1));
        const initialMax = result.maxOrderQty ? Number(result.maxOrderQty) : null;
        let initialQty = initialMin;
        if (initialMax && initialQty > initialMax) {
          initialQty = initialMax;
        }
        setQuantity(initialQty);
        productService.recordView(productId, { source: 'Direct' }).catch(() => {});
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));

    // Fetch related products
    productService
      .related(productId, controller.signal)
      .then((res) => {
        if (Array.isArray(res)) {
          setRelatedProducts(res.slice(0, 4));
        } else if (res?.items && Array.isArray(res.items)) {
          setRelatedProducts(res.items.slice(0, 4));
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, [productId]);

  // Enforce strict min / max constraints
  const minQty = useMemo(() => {
    return Math.max(1, Number(product?.minOrderQty ?? 1));
  }, [product?.minOrderQty]);

  const maxQty = useMemo(() => {
    return product?.maxOrderQty ? Math.max(minQty, Number(product.maxOrderQty)) : null;
  }, [product?.maxOrderQty, minQty]);

  const clampQuantity = useCallback(
    (val) => {
      const num = Number(val);
      if (Number.isNaN(num) || num < minQty) return minQty;
      if (maxQty && num > maxQty) return maxQty;
      return Math.floor(num);
    },
    [minQty, maxQty]
  );

  const quickQuantityOptions = useMemo(() => {
    const list = [20, 50, 100, 200, 500, 1000];
    const candidateSet = new Set();

    candidateSet.add(minQty);

    list.forEach((val) => {
      if (val >= minQty && (!maxQty || val <= maxQty)) {
        candidateSet.add(val);
      }
    });

    if (maxQty && maxQty >= minQty) {
      candidateSet.add(maxQty);
    }

    return Array.from(candidateSet)
      .sort((a, b) => a - b)
      .slice(0, 5);
  }, [minQty, maxQty]);

  // Derived active variant
  const variant = useMemo(
    () => product?.variants?.find((item) => item.id === variantId) || product?.variants?.[0],
    [product, variantId]
  );

  // Gallery image list with safe fallback
  const images = useMemo(() => {
    if (product?.images && product.images.length > 0) {
      return product.images;
    }
    return [{ id: 'default', imageUrl: '/hero_mooncake_bg.jpg' }];
  }, [product]);

  const currentImageUrl = images[activeImageIdx]?.imageUrl || images[0]?.imageUrl;

  // Calculation
  const unitPrice = variant?.price ?? product?.basePrice ?? 0;
  const totalPrice = unitPrice * quantity;

  // B2B Procurement Actions
  const handleOrder = () => {
    if (!variant?.isAvailable) {
      message.warning('Biến thể sản phẩm này hiện đang tạm hết hàng.');
      return;
    }
    const validQty = clampQuantity(quantity);
    if (validQty !== quantity) {
      setQuantity(validQty);
      message.warning(
        `Số lượng đặt hàng chỉ cho phép từ ${minQty} đến ${maxQty || 'không giới hạn'} ${product.unit || 'hộp'}.`
      );
      return;
    }
    const resolvedProductId = product?.productId || product?.id || productId;
    const resolvedVariantId = variantId || variant?.id;
    sessionStorage.setItem(
      'b2b_order_draft',
      JSON.stringify({
        productId: resolvedProductId,
        variantId: resolvedVariantId,
        quantity: validQty,
      })
    );
    onNavigate?.(`dat-hang-thiet-ke?productId=${resolvedProductId}`);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col font-['Be_Vietnam_Pro',sans-serif]">
      {/* 1. Customer Navigation Header */}
      <CustomerHeader onNavigate={onNavigate} activeKey="tim-kiem" />

      {/* 2. Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28">
            <Spin size="large" description="Đang tải dữ liệu sản phẩm..." />
          </div>
        ) : !product ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-xs border border-stone-200">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Sản phẩm không tồn tại hoặc đã tạm dừng phân phối"
            />
            <Button
              type="primary"
              onClick={() => onNavigate?.('tim-kiem')}
              style={{ background: '#8c1524', borderColor: '#8c1524', marginTop: 16 }}
            >
              Khám phá danh mục sản phẩm
            </Button>
          </div>
        ) : (
          <>
            {/* Top Navigation & Breadcrumbs */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-stone-200/70">
              <Breadcrumb
                items={[
                  {
                    title: (
                      <span
                        onClick={() => onNavigate?.('trang-chu')}
                        className="cursor-pointer text-stone-600 hover:text-[#8c1524] transition-colors flex items-center gap-1 text-xs sm:text-sm"
                      >
                        <HomeOutlined /> Trang chủ
                      </span>
                    ),
                  },
                  {
                    title: (
                      <span
                        onClick={() => onNavigate?.('tim-kiem')}
                        className="cursor-pointer text-stone-600 hover:text-[#8c1524] transition-colors text-xs sm:text-sm"
                      >
                        Sản phẩm B2B
                      </span>
                    ),
                  },
                  ...(product.category?.name
                    ? [
                        {
                          title: (
                            <span className="text-stone-600 text-xs sm:text-sm">
                              {product.category.name}
                            </span>
                          ),
                        },
                      ]
                    : []),
                  {
                    title: (
                      <span className="font-semibold text-stone-900 text-xs sm:text-sm truncate max-w-[200px] sm:max-w-none">
                        {product.name}
                      </span>
                    ),
                  },
                ]}
              />

              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => onNavigate?.('tim-kiem')}
                className="text-stone-600 hover:text-[#8c1524] text-xs sm:text-sm font-medium p-0"
              >
                Quay lại danh mục
              </Button>
            </div>

            {/* Product Overview Showcase */}
            <Row gutter={[40, 32]}>
              {/* Left Column: Gallery & Trust Assurances */}
              <Col xs={24} lg={11}>
                <div className="sticky top-20 flex flex-col gap-4">
                  {/* Main Display Image */}
                  <div className="relative rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm aspect-[4/3] sm:aspect-square flex items-center justify-center group">
                    <Image
                      src={currentImageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                      fallback="/hero_mooncake_bg.jpg"
                    />

                    {/* Overlay Badges */}
                    <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 pointer-events-none z-10">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#8c1524] text-white shadow-md border border-red-400/30">
                        B2B Thượng Hạng
                      </span>
                      {product.supportsCustomPackaging && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#d48806] text-white shadow-md border border-amber-400/30">
                          In Logo Riêng
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Thumbnails Row */}
                  {images.length > 1 && (
                    <div className="flex items-center gap-2.5 overflow-x-auto py-1 no-scrollbar">
                      {images.map((img, idx) => (
                        <button
                          key={img.id || idx}
                          type="button"
                          onClick={() => setActiveImageIdx(idx)}
                          className={`w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden shrink-0 border-2 transition-all p-0.5 bg-white cursor-pointer ${
                            activeImageIdx === idx
                              ? 'border-[#8c1524] shadow-sm ring-2 ring-[#8c1524]/20'
                              : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={img.imageUrl}
                            alt={`Ảnh ${idx + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Core Commitments Card */}
                  <div className="mt-2 p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col gap-3">
                    <div className="flex items-center gap-2 pb-2.5 border-b border-stone-100">
                      <SafetyCertificateFilled className="text-emerald-600 text-lg" />
                      <span className="text-xs sm:text-sm font-bold text-stone-900">
                        Bảo Chứng Vận Hành Sàn Doanh Nghiệp
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs text-stone-600">
                      <div className="flex items-start gap-2">
                        <CheckCircleFilled className="text-emerald-600 text-sm mt-0.5 shrink-0" />
                        <div>
                          <b className="text-stone-900 block">Ký quỹ SafeTrade</b>
                          <span>Bảo lưu thanh toán tới khi nhận đủ hàng</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <TruckOutlined className="text-[#8c1524] text-sm mt-0.5 shrink-0" />
                        <div>
                          <b className="text-stone-900 block">Xe Lạnh Chuyên Dụng</b>
                          <span>Đảm bảo hương vị bánh tươi nguyên bản</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircleFilled className="text-emerald-600 text-sm mt-0.5 shrink-0" />
                        <div>
                          <b className="text-stone-900 block">100% Hóa Đơn VAT</b>
                          <span>Xuất hóa đơn điện tử hợp lệ đầy đủ</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <ClockCircleOutlined className="text-[#d48806] text-sm mt-0.5 shrink-0" />
                        <div>
                          <b className="text-stone-900 block">Đổi Mới Trong 12h</b>
                          <span>Đổi mới 100% nếu phát sinh lỗi bao bì</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              {/* Right Column: Specifications, Price, Variants, Actions */}
              <Col xs={24} lg={13}>
                <div className="flex flex-col gap-5">
                  {/* Shop Info Card */}
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#8c1524]/10 text-[#8c1524] flex items-center justify-center font-bold text-lg shrink-0">
                        <ShopOutlined />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 text-sm sm:text-base truncate">
                            {product.shop?.name || 'Xưởng Bánh Nghệ Nhân'}
                          </span>
                          <Tag color="volcano" className="m-0 text-[10px] font-bold">
                            Xác minh
                          </Tag>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <ReputationBadge score={product.shop?.reputationScore} />
                          {product.shop?.regionCode && (
                            <span className="text-[11px] text-stone-500">
                              • Khu vực: {product.shop.regionCode}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button
                      type="default"
                      size="small"
                      onClick={() =>
                        onNavigate?.(`nha-cung-cap/gian-hang/${product.shop?.slug || product.shop?.shopId || product.shop?.id}`)
                      }
                      className="rounded-lg text-xs font-semibold hover:border-[#8c1524] hover:text-[#8c1524] shrink-0"
                    >
                      Xem xưởng
                    </Button>
                  </div>

                  {/* Product Title & Rating */}
                  <div>
                    <h1 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight leading-snug m-0">
                      {product.name}
                    </h1>

                    <div className="flex items-center gap-3 mt-2 text-xs text-stone-600">
                      <div className="flex items-center gap-1.5">
                        <Rate
                          disabled
                          allowHalf
                          defaultValue={Number(product.averageRating || 5)}
                          style={{ fontSize: 13, color: '#f59e0b' }}
                        />
                        <span className="font-bold text-stone-900">
                          {Number(product.averageRating || 5).toFixed(1)}
                        </span>
                      </div>
                      <span>•</span>
                      <span>{product.reviewCount || 0} đánh giá doanh nghiệp</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-medium">Hàng vụ mùa 2025</span>
                    </div>
                  </div>

                  {/* Price & B2B Volume Tiers */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col gap-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-bold text-[#8c1524]">
                        {money(unitPrice)} ₫
                      </span>
                      <span className="text-stone-500 text-sm font-normal">/ {product.unit}</span>
                    </div>

                    <div className="pt-3 border-t border-stone-100">
                      <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                        Chính Sách Chiết Khấu Số Lượng Lớn
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 rounded-xl bg-stone-50 border border-stone-200/80">
                          <span className="block text-[11px] text-stone-500">20 - 49 hộp</span>
                          <b className="text-stone-900 text-xs sm:text-sm font-bold">Giảm 10%</b>
                        </div>
                        <div className="p-2 rounded-xl bg-amber-50/80 border border-amber-200">
                          <span className="block text-[11px] text-amber-800">50 - 199 hộp</span>
                          <b className="text-amber-900 text-xs sm:text-sm font-bold">Giảm 20%</b>
                        </div>
                        <div className="p-2 rounded-xl bg-red-50/80 border border-red-200">
                          <span className="block text-[11px] text-red-800">Từ 200+ hộp</span>
                          <b className="text-red-900 text-xs sm:text-sm font-bold">Giảm tới 35%</b>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Variant Selection */}
                  {product.variants && product.variants.length > 0 && (
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs sm:text-sm font-bold text-stone-900">
                          Chọn Biến Thể / Hương Vị:
                        </label>
                        <span className="text-xs text-stone-500">
                          {product.variants.length} tùy chọn
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {product.variants.map((item) => {
                          const isSelected = item.id === variantId;
                          return (
                            <div
                              key={item.id}
                              onClick={() => item.isAvailable && setVariantId(item.id)}
                              className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between ${
                                !item.isAvailable
                                  ? 'opacity-50 cursor-not-allowed bg-stone-100 border-stone-200'
                                  : isSelected
                                  ? 'border-[#8c1524] bg-red-50/30 ring-1 ring-[#8c1524] cursor-pointer shadow-xs'
                                  : 'border-stone-200 bg-white hover:border-stone-400 cursor-pointer'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="font-bold text-xs sm:text-sm text-stone-900 leading-snug">
                                  {item.name}
                                </div>
                                {isSelected && (
                                  <span className="w-4 h-4 rounded-full bg-[#8c1524] text-white flex items-center justify-center text-[10px] shrink-0">
                                    ✓
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-stone-100 text-xs">
                                <span className="font-semibold text-[#8c1524]">
                                  {money(item.price)} ₫
                                </span>
                                {!item.isAvailable ? (
                                  <Tag className="m-0 text-[10px]">Tạm hết</Tag>
                                ) : (
                                  <span className="text-[11px] text-stone-400">
                                    SKU: {item.sku || 'VIP'}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Quantity & Order Estimation */}
                  <div className="p-4 rounded-xl bg-white border border-stone-200 flex flex-col gap-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <label className="text-xs sm:text-sm font-bold text-stone-900 block">
                          Số lượng đặt hàng:
                        </label>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="inline-flex items-center text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-900 font-semibold border border-amber-200/80">
                            Tối thiểu: {minQty} {product.unit || 'hộp'}
                          </span>
                          {maxQty ? (
                            <span className="inline-flex items-center text-xs px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-semibold border border-stone-200">
                              Tối đa: {maxQty} {product.unit || 'hộp'}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <InputNumber
                          min={minQty}
                          max={maxQty ?? undefined}
                          precision={0}
                          step={1}
                          value={quantity}
                          onChange={(val) => {
                            if (val === null || val === undefined || val === '') {
                              setQuantity(minQty);
                              return;
                            }
                            const num = Number(val);
                            if (Number.isNaN(num) || num <= 0) {
                              setQuantity(minQty);
                              return;
                            }
                            if (maxQty && num > maxQty) {
                              setQuantity(maxQty);
                              message.warning(
                                `Số lượng tối đa cho phép là ${maxQty} ${product.unit || 'hộp'}`
                              );
                              return;
                            }
                            setQuantity(num);
                          }}
                          onBlur={() => {
                            setQuantity((prev) => {
                              const clamped = clampQuantity(prev);
                              if (prev < minQty) {
                                message.info(
                                  `Số lượng đặt hàng tối thiểu là ${minQty} ${product.unit || 'hộp'}`
                                );
                              }
                              return clamped;
                            });
                          }}
                          onPressEnter={() => {
                            setQuantity((prev) => clampQuantity(prev));
                          }}
                          size="large"
                          style={{ width: 140 }}
                        />
                        <span className="text-xs font-semibold text-stone-600">
                          {product.unit || 'hộp'}
                        </span>
                      </div>
                    </div>

                    {/* Quick quantity selector */}
                    {quickQuantityOptions.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
                        <span className="text-xs text-stone-500">Chọn nhanh:</span>
                        {quickQuantityOptions.map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setQuantity(clampQuantity(num))}
                            className={`text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                              quantity === num
                                ? 'bg-stone-900 text-white border-stone-900'
                                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            {num} {product.unit || 'hộp'}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Out of bounds feedback hint */}
                    {quantity < minQty && (
                      <div className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-200">
                        ⚠️ Cần đạt số lượng đặt hàng tối thiểu {minQty} {product.unit || 'hộp'}.
                      </div>
                    )}
                    {maxQty && quantity > maxQty && (
                      <div className="text-xs text-red-700 bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-200">
                        ⚠️ Đơn hàng vượt quá mức tối đa {maxQty} {product.unit || 'hộp'}.
                      </div>
                    )}

                    {/* Total Estimation */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs sm:text-sm">
                      <span className="text-stone-600 font-medium">Tổng dự toán tạm tính:</span>
                      <span className="text-base sm:text-lg font-bold text-[#8c1524]">
                        {money(totalPrice)} ₫
                      </span>
                    </div>
                  </div>

                  {/* Action CTA Button */}
                  <div>
                    <Button
                      type="primary"
                      size="large"
                      block
                      icon={<ShoppingOutlined />}
                      disabled={!variant?.isAvailable}
                      onClick={handleOrder}
                      style={{
                        background: '#8c1524',
                        borderColor: '#8c1524',
                        fontWeight: 700,
                        height: 50,
                        borderRadius: 12,
                        fontSize: 16,
                        boxShadow: '0 4px 14px rgba(140, 21, 36, 0.25)',
                      }}
                    >
                      Đặt Hàng Doanh Nghiệp
                    </Button>
                  </div>

                  {/* Custom Packaging Alert */}
                  {product.supportsCustomPackaging && (
                    <Alert
                      type="warning"
                      showIcon
                      icon={<CrownOutlined style={{ color: '#d97706' }} />}
                      style={{
                        background: '#fffbeb',
                        border: '1px solid #fde68a',
                        borderRadius: 12,
                        fontSize: 12,
                      }}
                      message={
                        <span className="text-amber-950 font-medium">
                          Sản phẩm hỗ trợ ép kim logo, khắc laser nắp hộp gỗ sơn mài & thiết kế thiệp chúc mừng doanh nghiệp miễn phí từ 30 hộp.
                        </span>
                      }
                    />
                  )}
                </div>
              </Col>
            </Row>

            {/* 3. Detailed Specifications & Information Tabs */}
            <div className="mt-12 bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 sm:p-8">
              <Tabs
                defaultActiveKey="description"
                size="large"
                items={[
                  {
                    key: 'description',
                    label: (
                      <span className="font-bold text-sm sm:text-base flex items-center gap-1.5">
                        <FileTextOutlined /> Mô Tả Chi Tiết
                      </span>
                    ),
                    children: (
                      <div className="py-2 text-stone-700 leading-relaxed max-w-4xl space-y-4">
                        <Paragraph className="text-sm sm:text-base whitespace-pre-line">
                          {product.description ||
                            'Hộp bánh trung thu thượng hạng được chế tác thủ công bởi các nghệ nhân giàu kinh nghiệm, kết hợp tinh hoa ẩm thực truyền thống và quy chuẩn kiểm định vệ sinh thực phẩm hiện đại.'}
                        </Paragraph>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70">
                            <h4 className="font-bold text-stone-900 text-sm mb-1">
                              Quy Cách Hộp Quà Doanh Nghiệp
                            </h4>
                            <p className="text-xs text-stone-600 m-0">
                              Hộp gỗ sơn mài cao cấp, khóa đồng phong cách cổ điển sang trọng, lót lụa vàng hoàng gia bảo vệ bánh nguyên vẹn suốt quá trình vận chuyển.
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70">
                            <h4 className="font-bold text-stone-900 text-sm mb-1">
                              Dịch Vụ Cá Nhân Hóa Thương Hiệu
                            </h4>
                            <p className="text-xs text-stone-600 m-0">
                              Hỗ trợ in ấn logo sắc nét, dập nổi kim tuyến nhũ vàng/bạc, in kèm thư ngỏ tri ân dành riêng cho đối tác và khách hàng VIP.
                            </p>
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: 'ingredients',
                    label: (
                      <span className="font-bold text-sm sm:text-base flex items-center gap-1.5">
                        <SafetyCertificateOutlined /> Thành Phần &amp; ATTP
                      </span>
                    ),
                    children: (
                      <div className="py-2 max-w-4xl space-y-4">
                        <div className="p-4 rounded-xl bg-[#faf9f6] border border-stone-200">
                          <h4 className="font-bold text-stone-900 text-sm mb-2">
                            Nguyên Liệu Tự Nhiên &amp; Ít Ngọt
                          </h4>
                          <Paragraph className="text-sm text-stone-700 whitespace-pre-line m-0">
                            {product.ingredients ||
                              'Bột mì hảo hạng, đậu xanh hạt sen Tây Hồ tuyển chọn, trứng muối tươi tiệt trùng, dầu thực vật cao cấp, đường ăn kiêng tự nhiên isomalt, cốm non mùa thu Hà Nội.'}
                          </Paragraph>
                        </div>

                        <Descriptions bordered column={{ xs: 1, sm: 2 }} size="middle">
                          <Descriptions.Item label="Hạn sử dụng">
                            45 ngày kể từ ngày sản xuất
                          </Descriptions.Item>
                          <Descriptions.Item label="Điều kiện bảo quản">
                            Nơi khô ráo, thoáng mát (dưới 25°C) hoặc ngăn mát sau khi mở
                          </Descriptions.Item>
                          <Descriptions.Item label="Chứng nhận tiêu chuẩn">
                            ISO 22000:2018, HACCP, Chứng nhận Vệ sinh ATTP
                          </Descriptions.Item>
                          <Descriptions.Item label="Nguồn gốc xuất xứ">
                            100% Nguyên liệu thuần Việt Nam
                          </Descriptions.Item>
                        </Descriptions>
                      </div>
                    ),
                  },
                  {
                    key: 'policy',
                    label: (
                      <span className="font-bold text-sm sm:text-base flex items-center gap-1.5">
                        <TruckOutlined /> Chính Sách Giao Nhận &amp; Hợp Đồng
                      </span>
                    ),
                    children: (
                      <div className="py-2 max-w-4xl space-y-3">
                        <Descriptions bordered column={{ xs: 1, md: 3 }} size="middle">
                          <Descriptions.Item label="Đơn vị tính">
                            {product.unit}
                          </Descriptions.Item>
                          <Descriptions.Item label="Đơn hàng tối thiểu (MOQ)">
                            {minQty} {product.unit}
                          </Descriptions.Item>
                          <Descriptions.Item label="Đơn hàng tối đa">
                            {maxQty ? `${maxQty} ${product.unit}` : 'Không giới hạn'}
                          </Descriptions.Item>
                          <Descriptions.Item label="Công suất sản xuất">
                            Tới 10.000 hộp/ngày
                          </Descriptions.Item>
                          <Descriptions.Item label="Hình thức giao hàng">
                            Xe lạnh chuyên dụng PoD đa điểm
                          </Descriptions.Item>
                          <Descriptions.Item label="Ký quỹ an toàn">
                            SafeTrade Escrow (MB Bank)
                          </Descriptions.Item>
                          <Descriptions.Item label="Hóa đơn VAT">
                            Xuất 100% VAT điện tử hợp lệ
                          </Descriptions.Item>
                        </Descriptions>

                        <Alert
                          type="info"
                          showIcon
                          style={{ fontSize: 12, borderRadius: 10, marginTop: 12 }}
                          message="Cam kết hợp đồng nguyên tắc: Giữ ổn định giá trong toàn bộ vụ mùa trung thu, bồi hoàn 100% nếu giao trễ hẹn cam kết."
                        />
                      </div>
                    ),
                  },
                  {
                    key: 'reviews',
                    label: (
                      <span className="font-bold text-sm sm:text-base flex items-center gap-1.5">
                        <StarFilled className="text-amber-500" /> Đánh Giá ({product.reviewCount || 0})
                      </span>
                    ),
                    children: (
                      <div className="py-2">
                        <ProductReviewStream
                          productId={product.productId || product.id}
                          productName={product.name}
                        />
                      </div>
                    ),
                  },
                ]}
              />
            </div>

            {/* 4. Related Products Section */}
            {relatedProducts && relatedProducts.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-['Playfair_Display',serif] text-xl sm:text-2xl font-bold text-stone-900 m-0">
                    Sản Phẩm Tương Tự Tuyển Chọn
                  </h3>
                  <Button
                    type="link"
                    icon={<ArrowRightOutlined />}
                    onClick={() => onNavigate?.('tim-kiem')}
                    className="text-[#8c1524] font-bold"
                  >
                    Xem tất cả
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {relatedProducts.map((item) => (
                    <div
                      key={item.productId || item.id}
                      onClick={() => onNavigate?.(`san-pham/${item.productId || item.id}`)}
                      className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-[#8c1524]/40 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                        <img
                          src={item.primaryImageUrl || item.iconUrl || '/hero_mooncake_bg.jpg'}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 flex flex-col justify-between flex-1">
                        <div>
                          <span className="text-[11px] text-stone-500 block truncate">
                            {item.shop?.name || 'Xưởng Bánh'}
                          </span>
                          <h4 className="font-bold text-sm text-stone-900 line-clamp-2 mt-0.5 group-hover:text-[#8c1524] transition-colors">
                            {item.name}
                          </h4>
                        </div>
                        <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                          <b className="text-[#8c1524] text-sm">
                            {money(item.minPrice || item.basePrice)} ₫
                          </b>
                          <span className="text-[11px] text-stone-500">
                            Min: {item.minOrderQty || 20}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* 5. Customer Footer */}
      <CustomerFooter onNavigate={onNavigate} />
    </div>
  );
}
