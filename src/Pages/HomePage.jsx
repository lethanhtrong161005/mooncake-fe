import {
  ArrowRightOutlined,
  CheckCircleFilled,
  PhoneOutlined,
  SafetyCertificateOutlined,
  ShopOutlined,
  ShoppingOutlined,
  StarFilled,
  ThunderboltOutlined
} from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { useEffect, useState } from 'react';
import CustomerFooter from '../components/layout/CustomerFooter';
import CustomerHeader from '../components/layout/CustomerHeader';
import AnnouncementPill from '../components/lucian/AnnouncementPill';
import B2BPriceCalculator from '../components/lucian/B2BPriceCalculator';
import FaqAccordion from '../components/lucian/FaqAccordion';
import TearOffCoupon from '../components/lucian/TearOffCoupon';
import TrustSecurityBadges from '../components/lucian/TrustSecurityBadges';
import productService from '../services/productService';
import { formatCurrency } from '../utils/formatters';



export default function HomePage({ onNavigate }) {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    productService.categories(controller.signal)
      .then((items) => setCategories(Array.isArray(items) ? items : []))
      .catch(() => setCategories([]))
      .finally(() => setCategoriesLoading(false));

    productService.search({ page: 1, pageSize: 4, sort: 'newest' }, controller.signal)
      .then((response) => {
        const items = response?.items || [];
        setFeaturedProducts(items.length > 0 ? items : DEFAULT_FEATURED_PRODUCTS);
      })
      .catch(() => setFeaturedProducts(DEFAULT_FEATURED_PRODUCTS))
      .finally(() => setProductsLoading(false));

    return () => controller.abort();
  }, []);

  /* Categories are managed in the catalog database and loaded through the public API. */
  /* The legacy inline category array below is intentionally removed from rendering. */
  const legacyCategories = [
    {
      key: 'nuong',
      image: '/categories/banh-nuong.jpg',
      title: 'Bánh Nướng Truyền Thống',
      desc: 'Thập cẩm gà quay, vi cá, jambon hảo hạng',
    },
    {
      key: 'deo',
      image: '/categories/banh-deo.jpg',
      title: 'Bánh Dẻo Truyền Thống',
      desc: 'Hạt sen hoa bưởi, đậu xanh cốm non',
    },
    {
      key: 'hop-vip',
      image: '/categories/hop-son-mai.jpg',
      title: 'Hộp Quà Sơn Mài Cao Cấp',
      desc: 'Sơn mài khóa đồng, khắc logo theo yêu cầu',
    },
    {
      key: 'healthy',
      image: '/categories/banh-dinh-duong.jpg',
      title: 'Bánh Dinh Dưỡng Ít Ngọt',
      desc: 'Đường ăn kiêng tự nhiên, hạt dinh dưỡng',
    },
  ];

  const featuredSuppliers = [
    {
      id: 'trang-an',
      name: 'Xưởng Bánh Tràng An',
      image: '/suppliers/xuong-trang-an.jpg',
      avatarText: 'TA',
      desc: 'Nghề truyền thống gia truyền 4 đời tại Hà Nội. Năng lực sản xuất quy mô lớn, chuyên set quà doanh nghiệp thượng hạng.',
      badge: '★ Đối Tác Tiêu Biểu',
      location: 'Hà Nội',
      capacity: '50.000 hộp/vụ',
      rating: 4.9,
      reviewsCount: 128,
      cert: 'Chuẩn An Toàn Thực Phẩm',
      tags: ['Bánh nướng gia truyền', 'Hộp sơn mài', 'In logo riêng'],
    },
    {
      id: 'huu-nghi',
      name: 'Xưởng Bánh Hữu Nghị',
      image: '/suppliers/xuong-huu-nghi.jpg',
      avatarText: 'HN',
      desc: 'Thương hiệu lâu năm, dây chuyền sản xuất hiện đại, chuyên cung cấp các gói quà tặng số lượng lớn cho tập đoàn.',
      badge: '★ Đối Tác Tiêu Biểu',
      location: 'Hà Nội & TP. HCM',
      capacity: '120.000 hộp/vụ',
      rating: 4.8,
      reviewsCount: 215,
      cert: 'Tiêu Chuẩn Xuất Khẩu',
      tags: ['Sản xuất số lượng lớn', 'Hộp cao cấp', 'Chiết khấu cao'],
    },
    {
      id: 'bao-phuong',
      name: 'Xưởng Bánh Bảo Phương',
      image: '/suppliers/xuong-bao-phuong.jpg',
      avatarText: 'BP',
      desc: 'Bánh tươi thủ công truyền thống phố cổ Thụy Khuê, hương vị sen nhài cốm non nguyên bản nổi tiếng thủ đô.',
      badge: '★ Đối Tác Tiêu Biểu',
      location: 'Hà Nội - Thụy Khuê',
      capacity: '35.000 hộp/vụ',
      rating: 4.9,
      reviewsCount: 96,
      cert: 'Chứng Nhận Vệ Sinh An Toàn',
      tags: ['Bánh dẻo cốm non', 'Bánh tươi thủ công', 'Quà biếu nghệ nhân'],
    },
  ];

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      {/* 1. Customer Navigation Header */}
      <CustomerHeader activeKey="trang-chu" onNavigate={onNavigate} />

      <main className="w-full bg-surface flex-1">
        <div className="flex flex-col w-full">

          {/* 2. HERO SECTION WITH ANNOUNCEMENT PILL & CALL TO ACTION */}
          <section className="relative w-full overflow-hidden py-16 sm:py-24 px-4 sm:px-6">
            <div className="absolute inset-0 z-0">
              <img
                src="/hero_mooncake_bg.jpg"
                alt="Bánh Trung Thu Doanh Nghiệp"
                className="w-full h-full object-cover object-center transform scale-100 animate-float-slow"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-stone-950/75 via-stone-950/60 to-stone-950/85" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
              {/* Expandable Announcement Pill */}
              <AnnouncementPill onNavigate={onNavigate} />

              <h1 className="font-['Playfair_Display',serif] text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.18] drop-shadow-md">
                Quà Tặng Trung Thu Doanh Nghiệp
              </h1>

              <p className="mt-3 text-sm sm:text-base text-stone-200 max-w-xl leading-relaxed font-normal">
                50+ xưởng uy tín • Chiết khấu tới 35% • In logo theo yêu cầu • 100% xuất VAT
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingOutlined />}
                  onClick={() => onNavigate?.('tim-kiem')}
                  style={{
                    background: '#8c1524',
                    borderColor: '#8c1524',
                    fontWeight: 700,
                    borderRadius: 10,
                    height: 48,
                    padding: '0 28px',
                    fontSize: 15,
                    boxShadow: '0 8px 24px rgba(140, 21, 36, 0.45)',
                  }}
                >
                  Khám phá sản phẩm
                </Button>
                <Button
                  size="large"
                  icon={<ThunderboltOutlined />}
                  onClick={() => onNavigate?.('so-sanh-bao-gia')}
                  style={{
                    background: '#d48806',
                    borderColor: '#d48806',
                    color: '#ffffff',
                    fontWeight: 700,
                    borderRadius: 10,
                    height: 48,
                    padding: '0 28px',
                    fontSize: 15,
                    boxShadow: '0 8px 24px rgba(212, 136, 6, 0.35)',
                  }}
                >
                  Yêu cầu báo giá
                </Button>
              </div>

              {/* Enterprise Credibility Bar */}
              <div className="mt-10 pt-6 border-t border-white/15 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-white font-bold text-xl sm:text-2xl font-['Playfair_Display',serif]">50+</div>
                  <div className="text-stone-300 text-xs font-medium">Xưởng tuyển chọn</div>
                </div>
                <div>
                  <div className="text-amber-300 font-bold text-xl sm:text-2xl font-['Playfair_Display',serif]">Tới 35%</div>
                  <div className="text-stone-300 text-xs font-medium">Chiết khấu B2B</div>
                </div>
                <div>
                  <div className="text-white font-bold text-xl sm:text-2xl font-['Playfair_Display',serif]">100%</div>
                  <div className="text-stone-300 text-xs font-medium">Hóa đơn VAT</div>
                </div>
                <div>
                  <div className="text-emerald-400 font-bold text-xl sm:text-2xl font-['Playfair_Display',serif]">SafeTrade</div>
                  <div className="text-stone-300 text-xs font-medium">Ký quỹ an toàn</div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. PRODUCT CATEGORIES GRID */}
          <section className="w-full py-12 px-gutter bg-white border-b border-stone-200/60">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-stone-900">
                  Dòng Bánh &amp; Hộp Quà
                </h2>
                <Button
                  type="link"
                  icon={<ArrowRightOutlined />}
                  onClick={() => onNavigate?.('tim-kiem')}
                  style={{ color: '#8c1524', fontWeight: 700 }}
                >
                  Xem tất cả
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {categoriesLoading && [1, 2, 3, 4].map((item) => (
                  <div key={item} className="animate-pulse rounded-2xl bg-stone-100 aspect-[4/3]" />
                ))}
                {!categoriesLoading && categories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => onNavigate?.('tim-kiem')}
                    className="group bg-surface-container-low rounded-2xl overflow-hidden border border-stone-200/80 hover:border-[#8c1524]/40 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                      <img
                        src={cat.iconUrl || '/categories/banh-nuong.jpg'}
                        alt={cat.title || cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-[#8c1524] transition-colors truncate">
                        {cat.name}
                      </h3>
                      <ArrowRightOutlined className="text-xs text-[#8c1524] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                    </div>
                  </div>
                ))}
                {!categoriesLoading && categories.length === 0 && (
                  <div className="col-span-full text-center text-stone-500 py-10">Danh mục đang được cập nhật.</div>
                )}
              </div>
            </div>
          </section>

          {/* 5. LUCIAN B2B PRICE CALCULATOR & TEAR-OFF COUPON */}
          <section className="w-full bg-gradient-to-b from-surface-container-low to-surface py-12 sm:py-14 px-gutter border-b border-stone-200/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-xl mx-auto mb-8">
                <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-stone-900">
                  Dự Toán Ngân Sách &amp; Chiết Khấu
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 flex flex-col items-center">
                  <B2BPriceCalculator onNavigate={onNavigate} />
                </div>

                <div className="lg:col-span-5 flex flex-col gap-5 items-center">
                  <TearOffCoupon />

                  <div className="w-full max-w-[440px] bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#8c1524]">
                      <SafetyCertificateOutlined style={{ fontSize: 16 }} />
                      <span>Đặc quyền khách hàng doanh nghiệp</span>
                    </div>
                    <ul className="text-xs text-stone-700 space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircleFilled style={{ color: '#52c41a' }} />
                        <span>01 Hộp mẫu thử tận nơi miễn phí</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircleFilled style={{ color: '#52c41a' }} />
                        <span>Ký quỹ SafeTrade — nghiệm thu mới giải ngân</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircleFilled style={{ color: '#52c41a' }} />
                        <span>Giao xe lạnh chuyên dụng toàn quốc</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. FEATURED PRODUCTS COLLECTION */}
          <section className="w-full bg-surface py-12 sm:py-14 px-gutter border-b border-stone-200/60">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-stone-900">
                  Hộp Quà Tiêu Biểu
                </h2>
                <Button
                  type="link"
                  icon={<ArrowRightOutlined />}
                  onClick={() => onNavigate?.('tim-kiem')}
                  style={{ color: '#8c1524', fontWeight: 700 }}
                >
                  Xem tất cả (120+)
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                {productsLoading && [1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="bg-surface-container-lowest rounded-2xl shadow-xs overflow-hidden p-space-md animate-pulse border border-stone-200/70"
                  >
                    <div className="w-full aspect-square bg-stone-200 rounded-xl mb-4" />
                    <div className="h-4 bg-stone-200 rounded w-1/2 mb-2" />
                    <div className="h-6 bg-stone-200 rounded w-3/4 mb-4" />
                    <div className="h-9 bg-stone-200 rounded-lg w-full mt-4" />
                  </div>
                ))}

                {!productsLoading && featuredProducts.map((product) => (
                  <div
                    key={product.productId}
                    className="bg-surface-container-lowest rounded-2xl shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-stone-200/80 hover:border-[#8c1524]/40 cursor-pointer"
                    onClick={() => onNavigate?.(`san-pham/${product.productId}`)}
                  >
                    <div className="relative w-full aspect-square bg-surface-container overflow-hidden">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        src={product.primaryImageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0gce54U1n3kxiDSj_WZFJlCiiqIoXmsqFi5RYcNbE-HyrDYGdatgnVooMWFft7pgTd6ywe3cnZFmwRXVj6-HW98F0Fwk3gNfTVBSw7rBLbrF33ZhdDpVwyiRH56g4-dfFbFya0reGpmL-Hg-p2xW4ghvbZt-9XsLApvBWLRHyojKhGRFcCW7kp_sDFULOOcoXGqIknBa3fyYIkUUZ5QoR6YDPYuQqPll4ZIqIrynw9uXYHAPGqKJt'}
                        alt={product.name}
                      />
                      {product.shop?.isVerified !== false && (
                        <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-[#8c1524] flex items-center gap-1 shadow-xs">
                          <CheckCircleFilled /> NCC Xác Minh
                        </span>
                      )}
                      <span className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-md text-white px-2 py-0.5 rounded text-[11px] font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {product.deliveryTag || (product.effectiveStatus === 'Active' ? 'Còn hàng' : 'Giao 48h')}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1">
                          <span className="truncate font-medium">{product.shop?.name || 'Xưởng Tiêu Biểu'}</span>
                          <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                            <StarFilled /> {product.averageRating ? Number(product.averageRating).toFixed(1) : '4.9'}
                          </span>
                        </div>
                        <h3 className="font-title-md text-title-md font-bold text-on-surface line-clamp-2 min-h-[44px] group-hover:text-[#8c1524] transition-colors text-sm sm:text-base">
                          {product.name}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <span className="text-[11px] px-2 py-0.5 rounded bg-surface-container text-on-surface">
                            Tối thiểu: {product.minOrderQty || 20} {product.unit || 'hộp'}
                          </span>
                          {product.supportsCustomPackaging && (
                            <span className="text-[11px] px-2 py-0.5 rounded bg-surface-container text-on-surface">
                              In logo
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 pt-2">
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="font-bold text-[#8c1524] text-base">
                            {formatCurrency(product.minPrice || product.basePrice || 480000)}
                          </span>
                          {product.discountBadge ? (
                            <Tag color={product.discountBadge === 'VIP' ? 'gold' : 'red'}>{product.discountBadge}</Tag>
                          ) : (
                            <Tag color="red">-10%</Tag>
                          )}
                        </div>
                        <Button
                          type="primary"
                          block
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate?.(`san-pham/${product.productId}`);
                          }}
                          style={{ background: '#8c1524', borderColor: '#8c1524', borderRadius: 8, fontWeight: 700 }}
                        >
                          Đặt ngay
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. FEATURED SUPPLIERS SHOWCASE */}
          <section className="w-full py-12 sm:py-14 px-gutter bg-surface-container-low border-b border-stone-200/60">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-stone-900">
                  Xưởng Bánh Tiêu Biểu
                </h2>
                <Button
                  type="link"
                  icon={<ArrowRightOutlined />}
                  onClick={() => onNavigate?.('tim-kiem')}
                  style={{ color: '#8c1524', fontWeight: 700 }}
                >
                  Xem tất cả (50+)
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredSuppliers.map((sup) => (
                  <div
                    key={sup.id}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
                      <img
                        src={sup.image}
                        alt={sup.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-md">
                        {sup.badge}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-stone-900">{sup.name}</h3>
                          <span className="text-xs text-amber-600 font-bold flex items-center gap-0.5">
                            <StarFilled /> {sup.rating}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-stone-500 mt-1 mb-2">
                          <span>{sup.location}</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-semibold">{sup.capacity}</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {sup.tags.map((tag, idx) => (
                            <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2">
                        <Button
                          onClick={() => onNavigate?.('tim-kiem')}
                          style={{ borderRadius: 8, fontWeight: 600, fontSize: 12 }}
                        >
                          Xem Sản Phẩm
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => onNavigate?.('so-sanh-bao-gia')}
                          style={{ background: '#8c1524', borderColor: '#8c1524', borderRadius: 8, fontWeight: 700, fontSize: 12 }}
                        >
                          Nhận Báo Giá
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 8. TRUST & SECURITY BADGES */}
          <section className="w-full bg-[#fbf5f2] py-12 sm:py-14 px-gutter border-b border-stone-200/60">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                    Chuẩn Mực Vận Hành B2B
                  </h2>

                  <div className="pt-1 space-y-2.5">
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-700">
                      <CheckCircleFilled style={{ color: '#52c41a', fontSize: 16 }} />
                      <span>100% xưởng đạt chứng nhận an toàn ISO / HACCP</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-700">
                      <CheckCircleFilled style={{ color: '#52c41a', fontSize: 16 }} />
                      <span>Ký quỹ SafeTrade — nghiệm thu PoD mới thanh toán</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-700">
                      <CheckCircleFilled style={{ color: '#52c41a', fontSize: 16 }} />
                      <span>Đổi mới 100% &amp; bồi hoàn nếu trễ tiến độ giao nhận</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 flex justify-center">
                  <TrustSecurityBadges />
                </div>
              </div>
            </div>
          </section>

          {/* 9. VENDOR BANNER */}
          <section className="w-full bg-surface py-space-lg px-gutter">
            <div className="max-w-7xl mx-auto">
              <div className="relative overflow-hidden bg-gradient-to-r from-[#7a0010] via-[#8f0e19] to-[#7a0010] text-on-primary rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-white/10">
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#ffba00]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-xl space-y-1 text-center md:text-left">
                  <h3 className="font-['Playfair_Display',serif] text-xl sm:text-2xl font-bold text-white leading-tight">
                    Hợp Tác Phân Phối Bánh Trung Thu B2B
                  </h3>
                  <p className="text-sm text-rose-100/90">
                    Tiếp cận hàng nghìn khách hàng doanh nghiệp trong mùa vụ 2025 cùng Nguyệt Phố.
                  </p>
                </div>
                <div className="relative z-10 shrink-0 w-full md:w-auto">
                  <Button
                    size="large"
                    icon={<ShopOutlined />}
                    onClick={() => onNavigate?.('dang-ky-nha-cung-cap')}
                    style={{
                      borderRadius: 10,
                      fontWeight: 700,
                      color: '#8c1524',
                      background: '#ffffff',
                      borderColor: '#ffffff',
                      height: 44,
                      padding: '0 20px',
                    }}
                  >
                    Đăng ký mở gian hàng
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* 10. FAQ ACCORDION */}
          <section className="w-full bg-surface-container-low py-12 sm:py-14 px-gutter border-t border-stone-200/50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                  Câu Hỏi Thường Gặp
                </h2>
              </div>

              <FaqAccordion onNavigate={onNavigate} />
            </div>
          </section>

          {/* 11. CLOSING CTA SECTION */}
          <section className="w-full bg-gradient-to-b from-stone-100 to-surface py-12 sm:py-14 px-gutter border-t border-stone-200/60">
            <div className="max-w-5xl mx-auto text-center bg-gradient-to-br from-[#7a0010] via-[#541829] to-[#3c1723] text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden border border-amber-500/30">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto space-y-3">
                <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                  Sẵn Sàng Chuẩn Bị Quà Tặng Doanh Nghiệp?
                </h2>

                <p className="text-sm text-stone-200 leading-relaxed">
                  Nhận catalog 2025, báo giá chiết khấu xưởng tới 35% và hộp mẫu thử miễn phí tận nơi.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    size="large"
                    icon={<ThunderboltOutlined />}
                    onClick={() => onNavigate?.('so-sanh-bao-gia')}
                    style={{
                      background: '#d48806',
                      borderColor: '#d48806',
                      color: '#ffffff',
                      borderRadius: 10,
                      fontWeight: 700,
                      height: 46,
                      padding: '0 24px',
                    }}
                  >
                    Tạo Yêu Cầu Báo Giá (RFQ)
                  </Button>

                  <Button
                    size="large"
                    icon={<ShoppingOutlined />}
                    onClick={() => onNavigate?.('tim-kiem')}
                    ghost
                    style={{
                      borderRadius: 10,
                      fontWeight: 700,
                      height: 46,
                      padding: '0 24px',
                      borderColor: 'rgba(255,255,255,0.4)',
                      color: '#ffffff',
                    }}
                  >
                    Xem 120+ Mẫu Hộp 2025
                  </Button>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-300">
                  <span className="flex items-center gap-1.5">
                    <PhoneOutlined style={{ color: '#d48806' }} />
                    Hotline: <strong className="text-white font-bold">1800 6886</strong>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircleFilled style={{ color: '#52c41a' }} />
                    Ký quỹ SafeTrade 100% An Toàn
                  </span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Customer Footer */}
      <CustomerFooter onNavigate={onNavigate} />
    </div>
  );
}
