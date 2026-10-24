import { useState, useEffect, useMemo } from 'react';
import {
  Tag,
  Divider,
  Space,
  message,
  Tabs,
} from 'antd';
import {
  ShoppingOutlined,
  SolutionOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  PrinterOutlined,
  GiftOutlined,
  ShareAltOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import VariantRadioCards from '../../components/lucian/VariantRadioCards';
import ReviewFilterStars from '../../components/lucian/ReviewFilterStars';
import { getMockProductById, DEFAULT_PRODUCT_ID } from '../../constants/mockProducts';

export default function ProductInformation({ onNavigate }) {
  // Dynamically load product from mock data based on sessionStorage or fallback
  const [selectedProductId, setSelectedProductId] = useState(() => {
    return sessionStorage.getItem('selected_product_id') || DEFAULT_PRODUCT_ID;
  });

  const product = useMemo(() => {
    return getMockProductById(selectedProductId);
  }, [selectedProductId]);

  const [selectedVariantSku, setSelectedVariantSku] = useState(
    product.variants?.[0]?.sku || ''
  );
  const [quantity, setQuantity] = useState(product.minQty || 50);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeStarFilter, setActiveStarFilter] = useState(null);

  // Sync state when product changes
  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      const popular = product.variants.find((v) => v.isPopular) || product.variants[0];
      setSelectedVariantSku(popular.sku);
      if (typeof popular.imageIdx === 'number') {
        setActiveImageIdx(popular.imageIdx);
      } else {
        setActiveImageIdx(0);
      }
    }
    setQuantity(product.minQty || 50);
  }, [product]);

  const currentVariant = useMemo(() => {
    return (
      product.variants?.find((v) => v.sku === selectedVariantSku) ||
      product.variants?.[0] || {
        sku: 'DEFAULT',
        flavor: product.name,
        price: product.price || 0,
        stock: 500,
      }
    );
  }, [product, selectedVariantSku]);

  const unitPrice = currentVariant.price || product.price || 0;

  // Active pricing tier calculation
  const currentTier = useMemo(() => {
    if (!product.tieredPricing) return null;
    return product.tieredPricing.find(
      (t) => quantity >= t.minQty && quantity <= t.maxQty
    );
  }, [product.tieredPricing, quantity]);

  const discountRate = currentTier ? currentTier.rate : 0;
  const baseSubtotal = unitPrice * quantity;
  const discountAmount = baseSubtotal * discountRate;
  const finalTotal = baseSubtotal - discountAmount;
  const discountedUnitPrice = unitPrice * (1 - discountRate);

  const handleVariantChange = (sku) => {
    setSelectedVariantSku(sku);
    const v = product.variants?.find((item) => item.sku === sku);
    if (v && typeof v.imageIdx === 'number' && product.images?.[v.imageIdx]) {
      setActiveImageIdx(v.imageIdx);
    }
  };

  const handleQuickAddQty = (step) => {
    setQuantity((prev) => Math.max(product.minQty || 20, prev + step));
  };

  const handleOrderClick = () => {
    message.success(
      `Đã chọn biến thể "${currentVariant.flavor}" với số lượng ${quantity} hộp.`
    );
    setTimeout(() => {
      onNavigate?.('dat-hang-thiet-ke');
    }, 400);
  };

  const handleRfqClick = () => {
    message.info('Đang mở biểu mẫu RFQ mời báo giá với thông số sản phẩm đã chọn...');
    setTimeout(() => {
      onNavigate?.('so-sanh-bao-gia');
    }, 300);
  };

  const handleSampleKitRequest = () => {
    message.success('Đã gửi yêu cầu nhận Hộp Mẫu Thử (Sample Kit) miễn phí tới xưởng!');
  };

  const galleryImages =
    product.images?.length > 0
      ? product.images
      : [
          {
            url: product.image || '/categories/banh-nuong.jpg',
            title: product.name,
            tag: 'Sản phẩm',
          },
        ];

  return (
    <div className="min-h-screen bg-[#faf7f5] text-[#1f1b18] flex flex-col font-sans">
      <CustomerHeader activeKey="tim-kiem" onNavigate={onNavigate} />

      {/* Balanced Center Container (max-w-[1240px] avoids over-stretching horizontally) */}
      <main className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 py-3 flex-1">
        {/* Breadcrumb & Navigation Bar */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#8d706e] mb-3 pb-2 border-b border-[#7a0010]/10"
        >
          <div className="flex items-center gap-1.5 truncate">
            <button
              type="button"
              onClick={() => onNavigate?.('tim-kiem')}
              className="inline-flex items-center gap-1 font-semibold text-[#7a0010] hover:text-[#5a000c] transition-colors"
            >
              <ArrowLeftOutlined /> Danh sách sản phẩm
            </button>
            <span className="text-[#cbb8b3]">/</span>
            <span
              className="hover:text-[#1f1b18] cursor-pointer"
              onClick={() => onNavigate?.('tim-kiem')}
            >
              {product.categoryName}
            </span>
            <span className="text-[#cbb8b3]">/</span>
            <span className="font-semibold text-[#1f1b18] truncate max-w-[320px]">
              {product.name}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Sẵn kho ({currentVariant.stock || 500} hộp)
            </span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                message.info('Đã sao chép liên kết');
              }}
              className="p-1.5 rounded-lg border border-[#7a0010]/15 text-[#59413f] hover:bg-[#fff5f2] transition-colors"
              title="Chia sẻ sản phẩm"
            >
              <ShareAltOutlined className="text-xs" />
            </button>
          </div>
        </nav>

        {/* BALANCED 50/50 MAIN GRID (6 cols Left vs 6 cols Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT: Prominent Visual Gallery & Artisan Card (6 cols) */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24">
            {/* Gallery Box */}
            <div className="bg-white rounded-2xl p-3.5 border border-[#7a0010]/10 shadow-sm">
              {/* Prominent High-Res Image (aspect-4/3 for rich food & luxury packaging appreciation) */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#f5ece7] shadow-inner group">
                <img
                  src={galleryImages[activeImageIdx]?.url}
                  alt={galleryImages[activeImageIdx]?.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#7a0010] text-[#fbe8a6] shadow-sm">
                    {product.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/65 text-white backdrop-blur-sm">
                    {galleryImages[activeImageIdx]?.tag}
                  </span>
                </div>

                {product.packagingSupported && (
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-white/95 text-[#7a0010] shadow-sm border border-[#7a0010]/15">
                      In Logo 48H
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails Row */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2.5 mt-3">
                  {galleryImages.map((img, idx) => {
                    const isActive = idx === activeImageIdx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIdx(idx)}
                        className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all p-0.5 bg-white ${
                          isActive
                            ? 'border-[#7a0010] ring-2 ring-[#7a0010]/20 scale-[1.02]'
                            : 'border-transparent opacity-75 hover:opacity-100 hover:border-[#7a0010]/30'
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={img.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Artisan Credential Card */}
            <div className="bg-white rounded-2xl p-4 border border-[#7a0010]/10 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.supplierAvatar || '/suppliers/xuong-trang-an.jpg'}
                    alt={product.supplier}
                    className="w-12 h-12 rounded-xl object-cover border border-[#7a0010]/15 shadow-xs flex-none"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[#1f1b18] truncate">
                      {product.supplier}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#8d706e] mt-0.5">
                      <span className="text-[#b8860b] font-semibold flex items-center gap-1">
                        <SafetyCertificateOutlined /> Tín nhiệm {product.reputationScore}/100
                      </span>
                      <span>•</span>
                      <span className="text-emerald-700 font-medium">ISO 22000</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-none">
                  <button
                    type="button"
                    onClick={handleRfqClick}
                    className="px-3 py-2 rounded-xl border border-[#7a0010]/20 hover:border-[#7a0010] hover:bg-[#fff7f5] text-xs font-bold text-[#7a0010] transition-colors"
                  >
                    Báo Giá RFQ
                  </button>
                  <button
                    type="button"
                    onClick={handleSampleKitRequest}
                    className="px-3 py-2 rounded-xl bg-[#fff7f5] hover:bg-[#ffece8] text-xs font-bold text-[#7a0010] transition-colors"
                  >
                    Mẫu Thử
                  </button>
                </div>
              </div>

              {/* Assurance Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-[#7a0010]/10 text-[11px] text-[#59413f] text-center">
                <div className="flex items-center justify-center gap-1">
                  <CheckCircleOutlined className="text-emerald-600" />
                  <span>Hóa đơn VAT</span>
                </div>
                <div className="flex items-center justify-center gap-1 border-x border-[#7a0010]/10">
                  <TruckOutlined className="text-emerald-600" />
                  <span>Xe lạnh toàn quốc</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <PrinterOutlined className="text-emerald-600" />
                  <span>Maket 3D trong 4H</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Purchasing & Customization Module (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-4 sm:p-5 border border-[#7a0010]/10 shadow-sm space-y-3">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-[#8d706e]">Mã: {product.id}</span>
                <span className="text-xs text-[#8d706e]">• Tối thiểu: {product.minQty} hộp</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#1f1b18] leading-tight m-0 tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs text-[#59413f] leading-relaxed mt-1.5 mb-0">
                {product.description}
              </p>
            </div>

            {/* Dynamic Unit Price Box */}
            <div className="p-3.5 rounded-xl bg-[#fdf6f0] border border-[#7a0010]/15 flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-2.5">
                <span className="text-xs text-[#8d706e] font-semibold uppercase tracking-wider">Đơn giá:</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#7a0010] tracking-tight">
                  {Math.round(discountedUnitPrice).toLocaleString('vi-VN')} ₫
                </span>
                {discountRate > 0 && (
                  <span className="text-sm text-[#8d706e] line-through font-medium">
                    {unitPrice.toLocaleString('vi-VN')} ₫
                  </span>
                )}
                <span className="text-xs font-medium text-[#59413f]">/ hộp</span>
              </div>

              {discountRate > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    -{(discountRate * 100).toFixed(0)}%
                  </span>
                  <span className="text-xs font-semibold text-emerald-700">
                    Tiết kiệm {((unitPrice - discountedUnitPrice) * quantity).toLocaleString('vi-VN')} ₫
                  </span>
                </div>
              ) : (
                <span className="text-xs text-[#8d706e]">Đặt ≥ 50 để nhận chiết khấu sỉ</span>
              )}
            </div>

            {/* Variant Selector - Lucian #015 */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1f1b18]">
                    Biến thể:
                  </label>
                  <span className="text-xs text-[#8d706e]">
                    Đã chọn: <strong className="text-[#7a0010]">{currentVariant.flavor}</strong>
                  </span>
                </div>

                <VariantRadioCards
                  compact
                  variants={product.variants}
                  selectedSku={selectedVariantSku}
                  onChange={handleVariantChange}
                />
              </div>
            )}

            {/* Tiered Pricing Rules Matrix */}
            {product.tieredPricing && product.tieredPricing.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1f1b18]">
                    Chiết khấu số lượng:
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {product.tieredPricing.map((tier, idx) => {
                    const isActive = quantity >= tier.minQty && quantity <= tier.maxQty;
                    const tierNet = unitPrice * (1 - tier.rate);
                    return (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border text-left transition-all relative ${
                          isActive
                            ? 'bg-[#fff7f5] border-[#7a0010] ring-2 ring-[#7a0010]/20 shadow-xs'
                            : 'bg-white border-[#7a0010]/10 hover:border-[#7a0010]/30'
                        }`}
                      >
                        {tier.isRecommended && (
                          <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#7a0010] text-[#fbe8a6] shadow-xs">
                            Đề xuất
                          </span>
                        )}
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#1f1b18]">{tier.label}</span>
                          <span className="font-extrabold text-[#7a0010]">{tier.discountText}</span>
                        </div>
                        <div className="text-sm font-extrabold text-[#7a0010] mt-1">
                          {Math.round(tierNet).toLocaleString('vi-VN')} ₫
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Live Total Calculation */}
            <div className="p-3 rounded-xl bg-[#faf2ec] border border-[#7a0010]/15 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1f1b18]">Số lượng:</span>
                <button
                  type="button"
                  onClick={() => handleQuickAddQty(-10)}
                  disabled={quantity <= (product.minQty || 20)}
                  className="w-8 h-8 rounded-lg bg-white border border-[#7a0010]/20 font-bold text-sm text-[#7a0010] hover:bg-[#fff0ed] disabled:opacity-40 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  min={product.minQty || 20}
                  max={50000}
                  step={10}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(product.minQty || 20, parseInt(e.target.value) || (product.minQty || 20))
                    )
                  }
                  className="w-18 h-8 text-center font-bold text-sm bg-white rounded-lg border border-[#7a0010]/30 focus:outline-none focus:ring-2 focus:ring-[#7a0010]"
                />
                <button
                  type="button"
                  onClick={() => handleQuickAddQty(10)}
                  className="w-8 h-8 rounded-lg bg-white border border-[#7a0010]/20 font-bold text-sm text-[#7a0010] hover:bg-[#fff0ed] transition-colors"
                >
                  +
                </button>

                <div className="flex items-center gap-1.5 ml-1">
                  {[50, 100, 200, 500].map((step) => (
                    <button
                      key={step}
                      type="button"
                      onClick={() => setQuantity(step)}
                      className={`px-2 py-1 rounded-md text-xs font-bold transition-colors ${
                        quantity === step
                          ? 'bg-[#7a0010] text-white shadow-xs'
                          : 'bg-white border border-[#7a0010]/20 text-[#7a0010] hover:bg-[#fff0ed]'
                      }`}
                    >
                      {step}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total Price Display */}
              <div className="text-right">
                <span className="text-xs text-[#8d706e] mr-1">Tổng:</span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#7a0010]">
                  {Math.round(finalTotal).toLocaleString('vi-VN')} ₫
                </span>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={handleOrderClick}
                className="flex-1 py-3 px-5 rounded-xl bg-[#7a0010] hover:bg-[#60000d] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingOutlined className="text-base" />
                Đặt Hàng &amp; In Logo
              </button>

              <button
                type="button"
                onClick={handleRfqClick}
                className="py-3 px-5 rounded-xl bg-white border-2 border-[#7a0010] text-[#7a0010] hover:bg-[#fff7f5] font-extrabold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <SolutionOutlined /> Yêu Cầu Báo Giá (RFQ)
              </button>
            </div>

            <div className="text-center text-xs text-[#8d706e]">
              Nhận hợp đồng &amp; maket 3D trước khi tạm ứng
            </div>
          </div>
        </div>

        {/* FULL-WIDTH TABS: Specifications, Printing Policy & Customer Reviews */}
        <div className="mt-8 bg-white rounded-2xl p-6 border border-[#7a0010]/10 shadow-sm">
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: '1',
                label: (
                  <span className="font-bold text-sm sm:text-base">
                    Thông Số &amp; Quy Cách
                  </span>
                ),
                children: (
                  <div className="space-y-4 pt-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#59413f]">
                      {product.specs?.map((item, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-[#faf7f5] border border-[#7a0010]/5 flex flex-col gap-1"
                        >
                          <span className="font-bold text-[#1f1b18]">{item.label}</span>
                          <span className="text-[#59413f] leading-relaxed">{item.val}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-[#59413f] leading-relaxed pt-2 border-t border-[#7a0010]/10">
                      {product.description}
                    </p>
                  </div>
                ),
              },
              {
                key: '2',
                label: (
                  <span className="font-bold text-sm sm:text-base">
                    In Logo &amp; Mẫu Thử
                  </span>
                ),
                children: (
                  <div className="space-y-3 text-sm text-[#59413f] leading-relaxed pt-3">
                    <p>
                      <strong>Khắc laser &amp; Ép kim:</strong> Áp dụng công nghệ ép kim mạ vàng 24K hoặc khắc laser sắc nét lên nắp hộp sơn mài, hộp gỗ cho mọi đơn hàng từ {product.minQty} hộp trở lên.
                    </p>
                    <p>
                      <strong>Đăng ký nhận mẫu thử:</strong> Hỗ trợ giao 01 Hộp Mẫu Thử (Sample Kit) miễn phí tận nơi để bộ phận Thu mua / Ban giám đốc kiểm tra chất lượng bánh và mẫu bao bì thực tế trước khi ký hợp đồng.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleSampleKitRequest}
                        className="py-2.5 px-4 rounded-xl bg-[#7a0010] text-white font-bold text-xs hover:bg-[#60000d] transition-colors"
                      >
                        Đăng Ký Nhận Hộp Mẫu Thử Ngay
                      </button>
                    </div>
                  </div>
                ),
              },
              {
                key: '3',
                label: (
                  <span className="font-bold text-sm sm:text-base">
                    Đánh Giá ({product.reviews?.length || 0})
                  </span>
                ),
                children: (
                  <div className="pt-3">
                    <ReviewFilterStars
                      reviews={product.reviews || []}
                      activeStar={activeStarFilter}
                      onChangeStar={setActiveStarFilter}
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>
      </main>
    </div>
  );
}
