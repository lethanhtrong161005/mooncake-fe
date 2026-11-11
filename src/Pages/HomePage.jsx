import { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Divider, Row, Skeleton, Space, Tag, Tooltip, Typography } from 'antd';
import {
  ArrowRightOutlined,
  AuditOutlined,
  BankOutlined,
  CheckCircleFilled,
  CompassOutlined,
  CrownFilled,
  EnvironmentOutlined,
  PhoneOutlined,
  RightOutlined,
  SafetyCertificateFilled,
  SafetyCertificateOutlined,
  ShopOutlined,
  ShoppingOutlined,
  StarFilled,
  ThunderboltFilled,
  ThunderboltOutlined,
} from '@ant-design/icons';
import CustomerFooter from '../components/layout/CustomerFooter';
import CustomerHeader from '../components/layout/CustomerHeader';
import B2BPriceCalculator from '../components/lucian/B2BPriceCalculator';
import FaqAccordion from '../components/lucian/FaqAccordion';
import TearOffCoupon from '../components/lucian/TearOffCoupon';
import TrustSecurityBadges from '../components/lucian/TrustSecurityBadges';
import productService from '../services/productService';
import { formatCurrency } from '../utils/formatters';
import '../styles/home-page.css';

const { Title, Text, Paragraph } = Typography;

const CATEGORY_FALLBACK_META = [
  {
    image: '/categories/hop-son-mai.jpg',
    tag: 'Ấn phẩm VIP',
    subtitle: 'Sơn mài truyền thống • Ép kim & khắc laser logo riêng',
    moq: 'MOQ 20 hộp',
  },
  {
    image: '/categories/banh-nuong.jpg',
    tag: 'Gia truyền',
    subtitle: 'Sen Huế thượng hạng • Công thức nướng cổ truyền 4 đời',
    moq: 'MOQ 30 hộp',
  },
  {
    image: '/categories/banh-deo.jpg',
    tag: 'Thủ công',
    subtitle: 'Cốm non & sen nhài • Bánh tươi sản xuất theo lô đặt trước',
    moq: 'MOQ 30 hộp',
  },
  {
    image: '/categories/banh-dinh-duong.jpg',
    tag: 'Thực dưỡng',
    subtitle: 'Hạt dinh dưỡng hữu cơ • Đường ăn kiêng Isomalt cao cấp',
    moq: 'MOQ 20 hộp',
  },
];

const HERO_METRICS = [
  {
    value: '50+',
    label: 'Xưởng & Nghệ nhân',
    sub: 'Thẩm định ISO / HACCP',
    accent: '#ffffff',
  },
  {
    value: 'Tới 35%',
    label: 'Chiết khấu B2B',
    sub: 'Giá gốc trực tiếp từ xưởng',
    accent: '#f5c840',
  },
  {
    value: '100%',
    label: 'Hóa đơn VAT',
    sub: 'Hợp đồng số e-Contract',
    accent: '#ffffff',
  },
  {
    value: 'SafeTrade',
    label: 'Bảo chứng ký quỹ',
    sub: 'Nghiệm thu PoD mới giải ngân',
    accent: '#34d399',
  },
];

const FEATURED_SUPPLIERS = [
  {
    id: 'trang-an',
    name: 'Xưởng Bánh Tràng An',
    image: '/suppliers/xuong-trang-an.jpg',
    avatarText: 'TA',
    desc: 'Nghề truyền thống gia truyền 4 đời tại Hà Nội. Năng lực sản xuất quy mô lớn, chuyên chế tác set quà sơn mài doanh nghiệp thượng hạng.',
    badge: 'Đối Tác Tinh Hoa',
    location: 'Hà Nội',
    capacity: '50.000 hộp/vụ',
    leadTime: '3 – 5 ngày',
    rating: 4.9,
    reviewsCount: 128,
    cert: 'ISO 22000:2018',
    tags: ['Bánh nướng gia truyền', 'Hộp sơn mài', 'Khắc laser logo'],
  },
  {
    id: 'huu-nghi',
    name: 'Xưởng Bánh Hữu Nghị',
    image: '/suppliers/xuong-huu-nghi.jpg',
    avatarText: 'HN',
    desc: 'Thương hiệu lâu năm với dây chuyền tự động hóa hiện đại, chuyên cung ứng đơn hàng quy mô tập đoàn và ngân hàng đa chi nhánh.',
    badge: 'Năng Lực Lớn',
    location: 'Hà Nội & TP. HCM',
    capacity: '120.000 hộp/vụ',
    leadTime: '2 – 4 ngày',
    rating: 4.8,
    reviewsCount: 215,
    cert: 'HACCP & Xuất Khẩu',
    tags: ['Sản xuất số lượng lớn', 'Giao đa điểm', 'Chiết khấu 35%'],
  },
  {
    id: 'bao-phuong',
    name: 'Xưởng Bánh Bảo Phương',
    image: '/suppliers/xuong-bao-phuong.jpg',
    avatarText: 'BP',
    desc: 'Bánh tươi thủ công truyền thống phố cổ Thụy Khuê, giữ trọn hương vị sen nhài cốm non nguyên bản trứ danh đất Kinh Kỳ.',
    badge: 'Nghệ Nhân Phố Cổ',
    location: 'Thụy Khuê, Hà Nội',
    capacity: '35.000 hộp/vụ',
    leadTime: 'Đặt trước 5 ngày',
    rating: 4.9,
    reviewsCount: 96,
    cert: 'Chuẩn VSATTP Quốc Gia',
    tags: ['Bánh dẻo cốm non', 'Bánh tươi thủ công', 'Quà biếu ngoại giao'],
  },
];

export default function HomePage({ onNavigate }) {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const pageRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    productService
      .categories(controller.signal)
      .then((items) => {
        if (controller.signal.aborted) return;
        setCategories(Array.isArray(items) ? items.slice(0, 4) : []);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setCategories([]);
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setCategoriesLoading(false);
      });

    productService
      .search({ page: 1, pageSize: 4, sort: 'newest' }, controller.signal)
      .then((response) => {
        if (controller.signal.aborted) return;
        const items = response?.items || [];
        setFeaturedProducts(items.slice(0, 4));
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setFeaturedProducts([]);
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setProductsLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const sections = pageRef.current?.querySelectorAll('main > section');
    if (!sections?.length) return undefined;

    const revealVariants = ['lift', 'from-left', 'from-right', 'zoom'];

    sections.forEach((section, index) => {
      section.classList.add('home-reveal');
      section.classList.add(`home-reveal--${revealVariants[index % revealVariants.length]}`);
      section.style.setProperty('--home-reveal-delay', `${Math.min(index * 55, 275)}ms`);
      if (index === 0) section.classList.add('home-hero');
    });

    if (typeof IntersectionObserver === 'undefined') {
      sections.forEach((section) => section.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={pageRef}
      className="home-page"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#faf7f2',
        color: '#1b1412',
        fontFamily: "'Be Vietnam Pro', sans-serif",
      }}
    >
      {/* 1. Customer Navigation Header */}
      <CustomerHeader activeKey="trang-chu" onNavigate={onNavigate} />

      <main style={{ flex: 1, width: '100%' }}>
        {/* =====================================================================
            2. EDITORIAL SPLIT HERO — IMPERIAL LACQUER & B2B DOSSIER
        ===================================================================== */}
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            background:
              'radial-gradient(circle at 18% 18%, rgba(158, 27, 34, 0.42) 0%, transparent 48%), radial-gradient(circle at 88% 82%, rgba(212, 136, 6, 0.22) 0%, transparent 45%), linear-gradient(135deg, #160a0d 0%, #240c12 52%, #13080b 100%)',
            borderBottom: '1px solid rgba(245, 200, 64, 0.24)',
          }}
        >
          {/* Ambient background texture image with low opacity */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.16,
              pointerEvents: 'none',
              backgroundImage: 'url(/hero_mooncake_bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mixBlendMode: 'luminosity',
            }}
          />

          {/* Fine architectural grid lines overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              backgroundImage:
                'linear-gradient(to right, rgba(245, 200, 64, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(245, 200, 64, 0.05) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 2,
              maxWidth: 1280,
              margin: '0 auto',
              padding: '44px 20px 48px',
            }}
          >
            <Row gutter={[40, 36]} align="middle">
              {/* Left Column: Editorial Value Proposition & Actions */}
              <Col xs={24} lg={14}>
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div
                    className="home-hero-kicker"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 14,
                    }}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 1,
                        background: '#f5c840',
                        display: 'inline-block',
                      }}
                    />
                    <Text
                      style={{
                        color: '#f5c840',
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Sàn Giao Dịch Quà Biếu Doanh Nghiệp B2B
                    </Text>
                  </div>

                  <Title
                    className="home-hero-title"
                    level={1}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: '#fffcf7',
                      fontSize: 'clamp(2.15rem, 4.2vw, 3.65rem)',
                      lineHeight: 1.12,
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      margin: '0 0 18px',
                    }}
                  >
                    Quà Tặng Trung Thu Doanh Nghiệp{' '}
                    <span
                      className="home-hero-emphasis"
                      style={{
                        fontStyle: 'italic',
                        fontWeight: 600,
                        color: '#f5c840',
                        display: 'inline-block',
                      }}
                    >
                      Tinh Hoa &amp; Điển Chế
                    </span>
                  </Title>

                  <Paragraph
                    className="home-hero-copy"
                    style={{
                      color: 'rgba(250, 240, 230, 0.84)',
                      fontSize: 15.5,
                      lineHeight: 1.7,
                      maxWidth: 600,
                      margin: '0 0 24px',
                    }}
                  >
                    Kết nối nguồn cung quà tặng doanh nghiệp từ các xưởng được xác minh, với giá B2B
                    và quy trình đặt hàng rõ ràng.
                  </Paragraph>

                  {/* Primary & Secondary CTAs */}
                  <Space
                    className="home-hero-actions"
                    size={[14, 12]}
                    wrap
                    className="justify-center lg:justify-start"
                    style={{ marginBottom: 22 }}
                  >
                    <Button
                      type="primary"
                      size="large"
                      icon={<ShoppingOutlined />}
                      onClick={() => onNavigate?.('tim-kiem')}
                      style={{
                        background: 'linear-gradient(135deg, #a81c2d 0%, #7a0010 100%)',
                        borderColor: '#c92a3e',
                        height: 50,
                        padding: '0 28px',
                        borderRadius: 12,
                        fontSize: 15,
                        fontWeight: 700,
                        boxShadow: '0 12px 28px rgba(140, 21, 36, 0.45)',
                      }}
                    >
                      Khám phá sản phẩm
                    </Button>

                    <Button
                      size="large"
                      icon={<ThunderboltFilled />}
                      onClick={() => onNavigate?.('so-sanh-bao-gia')}
                      style={{
                        background: 'linear-gradient(135deg, #e09600 0%, #b87300 100%)',
                        borderColor: '#f5c840',
                        color: '#ffffff',
                        height: 50,
                        padding: '0 26px',
                        borderRadius: 12,
                        fontSize: 15,
                        fontWeight: 700,
                        boxShadow: '0 12px 28px rgba(212, 136, 6, 0.32)',
                      }}
                    >
                      Yêu cầu báo giá (RFQ)
                    </Button>
                  </Space>
                </div>
              </Col>

              {/* Right Column: Imperial Lacquer Dossier Showcase Card */}
              <Col xs={24} lg={10}>
                <div
                  className="home-hero-showcase"
                  style={{ position: 'relative', maxWidth: 470, margin: '0 auto' }}
                >
                  {/* Decorative offset gold frame */}
                  <div
                    style={{
                      position: 'absolute',
                      top: -10,
                      right: -10,
                      bottom: 10,
                      left: 10,
                      borderRadius: 24,
                      border: '1px solid rgba(245, 200, 64, 0.32)',
                      pointerEvents: 'none',
                    }}
                  />

                  <Card
                    bordered={false}
                    style={{
                      borderRadius: 22,
                      overflow: 'hidden',
                      background: '#1e1114',
                      border: '1px solid rgba(245, 200, 64, 0.35)',
                      boxShadow: '0 28px 60px rgba(0, 0, 0, 0.55)',
                    }}
                    styles={{ body: { padding: 0 } }}
                  >
                    {/* Top Showcase Image */}
                    <div style={{ position: 'relative', height: 270, overflow: 'hidden' }}>
                      <img
                        src="/categories/hop-son-mai.jpg"
                        alt="Ấn phẩm Hộp Sơn Mài Hoàng Kim 2025"
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
                          inset: 0,
                          background:
                            'linear-gradient(to top, #1e1114 4%, rgba(30, 17, 20, 0.25) 55%, rgba(0,0,0,0.35) 100%)',
                        }}
                      />

                      {/* Top-left Dossier Edition Badge */}
                      <div
                        className="home-showcase-badges"
                        style={{
                          position: 'absolute',
                          top: 14,
                          left: 14,
                          display: 'flex',
                          gap: 8,
                        }}
                      >
                        <Tag
                          style={{
                            margin: 0,
                            background: 'rgba(20, 10, 12, 0.85)',
                            borderColor: 'rgba(245, 200, 64, 0.5)',
                            color: '#f5c840',
                            fontWeight: 700,
                            fontSize: 11,
                            padding: '3px 10px',
                            borderRadius: 8,
                            backdropFilter: 'blur(8px)',
                          }}
                        >
                          <CrownFilled style={{ marginRight: 5 }} />
                          ẤN PHẨM HOÀNG KIM 2025
                        </Tag>
                      </div>

                      {/* Top-right SLA Tag */}
                      <div
                        className="home-showcase-badges"
                        style={{ position: 'absolute', top: 14, right: 14 }}
                      >
                        <Tag
                          style={{
                            margin: 0,
                            background: 'rgba(6, 78, 59, 0.9)',
                            borderColor: 'rgba(52, 211, 153, 0.45)',
                            color: '#a7f3d0',
                            fontWeight: 600,
                            fontSize: 11,
                            padding: '3px 10px',
                            borderRadius: 8,
                          }}
                        >
                          <CheckCircleFilled style={{ marginRight: 4 }} />
                          Sẵn sàng giao mẫu 24h
                        </Tag>
                      </div>

                      {/* Bottom Caption over image */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 12,
                          left: 18,
                          right: 18,
                        }}
                      >
                        <Text
                          style={{
                            color: '#f5c840',
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            display: 'block',
                          }}
                        >
                          Bộ Sưu Tập Thượng Uyển • Sơn Mài Khắc Laser
                        </Text>
                        <Title
                          level={4}
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            color: '#ffffff',
                            margin: '2px 0 0',
                            fontSize: 20,
                          }}
                        >
                          Hộp Quà Ngũ Phúc Lâm Môn VIP
                        </Title>
                      </div>
                    </div>

                    {/* Dossier Spec Sheet Body */}
                    <div style={{ padding: '16px 20px 20px' }}>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: 10,
                          padding: '10px 12px',
                          borderRadius: 12,
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          marginBottom: 16,
                        }}
                      >
                        <div>
                          <Text
                            style={{
                              color: 'rgba(255,255,255,0.55)',
                              fontSize: 11,
                              display: 'block',
                            }}
                          >
                            Số lượng tối thiểu
                          </Text>
                          <Text
                            style={{
                              color: '#ffffff',
                              fontWeight: 700,
                              fontSize: 13,
                              fontVariantNumeric: 'tabular-nums',
                            }}
                          >
                            Từ 20 hộp
                          </Text>
                        </div>
                        <div
                          style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: 10 }}
                        >
                          <Text
                            style={{
                              color: 'rgba(255,255,255,0.55)',
                              fontSize: 11,
                              display: 'block',
                            }}
                          >
                            Gia công thương hiệu
                          </Text>
                          <Text style={{ color: '#f5c840', fontWeight: 700, fontSize: 13 }}>
                            Miễn phí ép kim
                          </Text>
                        </div>
                        <div
                          style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: 10 }}
                        >
                          <Text
                            style={{
                              color: 'rgba(255,255,255,0.55)',
                              fontSize: 11,
                              display: 'block',
                            }}
                          >
                            Chiết khấu bậc thang
                          </Text>
                          <Text
                            style={{
                              color: '#6ee7b7',
                              fontWeight: 700,
                              fontSize: 13,
                              fontVariantNumeric: 'tabular-nums',
                            }}
                          >
                            10% – 35%
                          </Text>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 12,
                        }}
                      >
                        <div>
                          <Text
                            style={{
                              color: 'rgba(255,255,255,0.6)',
                              fontSize: 11,
                              display: 'block',
                            }}
                          >
                            Đơn giá B2B tham khảo
                          </Text>
                          <Text
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              color: '#f5c840',
                              fontSize: 20,
                              fontWeight: 700,
                              fontVariantNumeric: 'tabular-nums',
                            }}
                          >
                            325.000 ₫ – 850.000 ₫
                          </Text>
                        </div>

                        <Button
                          type="primary"
                          icon={<ArrowRightOutlined />}
                          onClick={() => onNavigate?.('tim-kiem')}
                          style={{
                            background: '#ffffff',
                            borderColor: '#ffffff',
                            color: '#7a0010',
                            fontWeight: 700,
                            borderRadius: 10,
                            height: 40,
                          }}
                        >
                          Xem Catalog
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </Col>
            </Row>

            {/* Architectural 4-Metric Credibility Ledger Strip */}
            <div
              style={{
                marginTop: 40,
                paddingTop: 24,
                borderTop: '1px solid rgba(245, 200, 64, 0.2)',
              }}
            >
              <Row gutter={[16, 16]}>
                {HERO_METRICS.map((metric, idx) => (
                  <Col xs={12} sm={6} key={metric.label}>
                    <div
                      style={{
                        padding: '10px 16px',
                        borderLeft: idx > 0 ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          color: metric.accent,
                          fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                          fontWeight: 700,
                          lineHeight: 1.15,
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {metric.value}
                      </div>
                      <Text
                        style={{
                          color: '#ffffff',
                          fontWeight: 600,
                          fontSize: 13,
                          display: 'block',
                          marginTop: 4,
                        }}
                      >
                        {metric.label}
                      </Text>
                      <Text
                        style={{
                          color: 'rgba(255, 255, 255, 0.55)',
                          fontSize: 11.5,
                          display: 'block',
                        }}
                      >
                        {metric.sub}
                      </Text>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </section>

        {/* =====================================================================
            4. PRODUCT CATEGORIES — DÒNG BÁNH & HỘP QUÀ
        ===================================================================== */}
        <section
          style={{
            background: '#ffffff',
            borderBottom: '1px solid #e8dad2',
            padding: '56px 20px',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            {/* Editorial Section Header */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: 16,
                marginBottom: 28,
              }}
            >
              <div>
                <Text
                  style={{
                    display: 'block',
                    marginBottom: 6,
                    fontSize: 12,
                    color: '#8c726c',
                    fontWeight: 600,
                  }}
                >
                  Tuyển chọn 04 dòng chủ lực cho doanh nghiệp
                </Text>
                <Title
                  level={2}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    margin: 0,
                    fontSize: 'clamp(1.65rem, 2.6vw, 2.25rem)',
                    color: '#1b1412',
                    fontWeight: 700,
                  }}
                >
                  Dòng Bánh &amp; Hộp Quà
                </Title>
              </div>

              <Button
                type="default"
                icon={<ArrowRightOutlined />}
                iconPosition="end"
                onClick={() => onNavigate?.('tim-kiem')}
                style={{
                  borderColor: '#d9c2b8',
                  color: '#8c1524',
                  fontWeight: 700,
                  borderRadius: 10,
                  height: 40,
                  padding: '0 18px',
                  background: '#fdf8f5',
                }}
              >
                Xem tất cả danh mục
              </Button>
            </div>

            {/* 4 Curated Category Cards */}
            <Row gutter={[20, 20]}>
              {categoriesLoading &&
                [1, 2, 3, 4].map((item) => (
                  <Col xs={24} sm={12} lg={6} key={item}>
                    <Card
                      style={{ borderRadius: 18, borderColor: '#eadcd3' }}
                      styles={{ body: { padding: 16 } }}
                    >
                      <Skeleton.Image
                        active
                        style={{ width: '100%', height: 190, marginBottom: 14 }}
                      />
                      <Skeleton active paragraph={{ rows: 2 }} />
                    </Card>
                  </Col>
                ))}

              {!categoriesLoading &&
                categories.slice(0, 4).map((cat, idx) => {
                  const meta = CATEGORY_FALLBACK_META[idx % CATEGORY_FALLBACK_META.length];
                  const targetRoute = cat.id ? `tim-kiem?categoryIds=${cat.id}` : 'tim-kiem';

                  return (
                    <Col xs={24} sm={12} lg={6} key={cat.id || idx}>
                      <Card
                        hoverable
                        onClick={() => onNavigate?.(targetRoute)}
                        style={{
                          height: '100%',
                          borderRadius: 18,
                          overflow: 'hidden',
                          border: '1px solid #e6d5cb',
                          background: '#fffcf9',
                          boxShadow: '0 6px 20px rgba(27, 20, 18, 0.04)',
                        }}
                        styles={{
                          body: {
                            padding: '18px 18px 16px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: 'calc(100% - 210px)',
                          },
                        }}
                        cover={
                          <div
                            style={{
                              position: 'relative',
                              height: 210,
                              overflow: 'hidden',
                              background: '#201315',
                            }}
                          >
                            <img
                              src={cat.iconUrl || meta.image}
                              alt={cat.title || cat.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.5s ease',
                              }}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = meta.image;
                              }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                inset: 0,
                                background:
                                  'linear-gradient(to top, rgba(22, 10, 13, 0.78) 0%, rgba(22, 10, 13, 0.1) 55%, rgba(0, 0, 0, 0.25) 100%)',
                              }}
                            />

                            {/* Category label */}
                            <div
                              style={{
                                position: 'absolute',
                                top: 12,
                                left: 12,
                                right: 12,
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                              }}
                            >
                              <Tag
                                style={{
                                  margin: 0,
                                  background: 'rgba(255, 255, 255, 0.92)',
                                  borderColor: 'transparent',
                                  color: '#7a0010',
                                  fontWeight: 700,
                                  fontSize: 11,
                                  borderRadius: 6,
                                }}
                              >
                                {meta.tag}
                              </Tag>
                            </div>

                            {/* Bottom MOQ pill */}
                            <div style={{ position: 'absolute', bottom: 10, left: 12 }}>
                              <span
                                style={{
                                  fontSize: 11,
                                  color: '#f5e8dc',
                                  background: 'rgba(0, 0, 0, 0.55)',
                                  padding: '2px 8px',
                                  borderRadius: 6,
                                  border: '1px solid rgba(255,255,255,0.18)',
                                  fontVariantNumeric: 'tabular-nums',
                                }}
                              >
                                {meta.moq}
                              </span>
                            </div>
                          </div>
                        }
                      >
                        <div>
                          <Title
                            level={4}
                            style={{
                              margin: '0 0 6px',
                              fontSize: 17,
                              fontWeight: 700,
                              color: '#1b1412',
                            }}
                          >
                            {cat.name}
                          </Title>
                          <Paragraph
                            style={{
                              margin: 0,
                              fontSize: 12.5,
                              color: '#6e5a54',
                              lineHeight: 1.5,
                            }}
                          >
                            {cat.description || meta.subtitle}
                          </Paragraph>
                        </div>

                        <div
                          style={{
                            marginTop: 14,
                            paddingTop: 12,
                            borderTop: '1px solid #f0e4dc',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12.5,
                              fontWeight: 700,
                              color: '#8c1524',
                            }}
                          >
                            Khám phá dòng sản phẩm
                          </Text>
                          <RightOutlined style={{ fontSize: 11, color: '#8c1524' }} />
                        </div>
                      </Card>
                    </Col>
                  );
                })}

              {!categoriesLoading && categories.length === 0 && (
                <Col span={24}>
                  <Card
                    style={{
                      textAlign: 'center',
                      borderRadius: 16,
                      borderColor: '#e8dad2',
                      background: '#faf7f2',
                    }}
                  >
                    <Text style={{ color: '#6e5a54' }}>Danh mục đang được cập nhật.</Text>
                  </Card>
                </Col>
              )}
            </Row>
          </div>
        </section>

        {/* =====================================================================
            5. PRICE PLANNING — DỰ TOÁN NGÂN SÁCH & ĐẶC QUYỀN DOANH NGHIỆP
        ===================================================================== */}
        <section
          style={{
            background: 'linear-gradient(180deg, #f8f0e8 0%, #faf7f2 100%)',
            borderBottom: '1px solid #e8dad2',
            padding: '60px 20px',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 36px' }}>
              <Title
                level={2}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  margin: '0 0 10px',
                  fontSize: 'clamp(1.65rem, 2.6vw, 2.25rem)',
                  color: '#1b1412',
                  fontWeight: 700,
                }}
              >
                Dự Toán Ngân Sách &amp; Chiết Khấu
              </Title>
              <Paragraph style={{ margin: 0, color: '#63534e', fontSize: 14 }}>
                Tính toán tức thì mức chiết khấu bậc thang theo quy mô đơn hàng và kích hoạt mã ưu
                đãi dành riêng cho hợp đồng đặt sớm.
              </Paragraph>
            </div>

            <Row gutter={[32, 28]} align="top">
              <Col xs={24} lg={13}>
                <div className="flex flex-col items-center">
                  <B2BPriceCalculator onNavigate={onNavigate} />
                </div>
              </Col>

              <Col xs={24} lg={11}>
                <div className="flex flex-col items-center gap-5">
                  <TearOffCoupon />

                  <Card
                    style={{
                      width: '100%',
                      maxWidth: 440,
                      borderRadius: 20,
                      border: '1px solid #e4d2c8',
                      background: '#ffffff',
                      boxShadow: '0 8px 24px rgba(122, 0, 16, 0.05)',
                    }}
                    styles={{ body: { padding: '18px 20px' } }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 12,
                      }}
                    >
                      <Space size={8}>
                        <SafetyCertificateFilled style={{ color: '#8c1524', fontSize: 17 }} />
                        <Text style={{ fontWeight: 700, fontSize: 14, color: '#8c1524' }}>
                          Đặc quyền khách hàng doanh nghiệp
                        </Text>
                      </Space>
                      <Tag color="gold" style={{ margin: 0, fontWeight: 700, fontSize: 10.5 }}>
                        VIP SLA
                      </Tag>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <CheckCircleFilled style={{ color: '#16a34a', marginTop: 3 }} />
                        <Text style={{ fontSize: 12.5, color: '#3b302c' }}>
                          <strong>01 Hộp mẫu thử nguyên seal</strong> giao tận trụ sở miễn phí trong
                          24h
                        </Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <CheckCircleFilled style={{ color: '#16a34a', marginTop: 3 }} />
                        <Text style={{ fontSize: 12.5, color: '#3b302c' }}>
                          <strong>Ký quỹ SafeTrade Escrow</strong> — nghiệm thu PoD đạt chuẩn mới
                          giải ngân
                        </Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <CheckCircleFilled style={{ color: '#16a34a', marginTop: 3 }} />
                        <Text style={{ fontSize: 12.5, color: '#3b302c' }}>
                          <strong>Giao xe lạnh chuyên dụng</strong> đa chi nhánh toàn quốc, xuất VAT
                          ngay
                        </Text>
                      </div>
                    </div>
                  </Card>
                </div>
              </Col>
            </Row>
          </div>
        </section>

        {/* =====================================================================
            6. FEATURED PRODUCTS — HỘP QUÀ TIÊU BIỂU
        ===================================================================== */}
        <section
          style={{
            background: '#faf7f2',
            borderBottom: '1px solid #e8dad2',
            padding: '60px 20px',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: 16,
                marginBottom: 28,
              }}
            >
              <div>
                <Text
                  style={{
                    display: 'block',
                    marginBottom: 6,
                    fontSize: 12,
                    color: '#8c726c',
                    fontWeight: 600,
                  }}
                >
                  Sẵn sàng cung ứng số lượng lớn &amp; in logo riêng
                </Text>
                <Title
                  level={2}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    margin: 0,
                    fontSize: 'clamp(1.65rem, 2.6vw, 2.25rem)',
                    color: '#1b1412',
                    fontWeight: 700,
                  }}
                >
                  Hộp Quà Tiêu Biểu
                </Title>
              </div>

              <Button
                type="primary"
                icon={<ArrowRightOutlined />}
                iconPosition="end"
                onClick={() => onNavigate?.('tim-kiem')}
                style={{
                  background: '#8c1524',
                  borderColor: '#8c1524',
                  fontWeight: 700,
                  borderRadius: 10,
                  height: 40,
                  padding: '0 20px',
                }}
              >
                Xem tất cả (120+)
              </Button>
            </div>

            <Row gutter={[20, 20]}>
              {productsLoading &&
                [1, 2, 3, 4].map((item) => (
                  <Col xs={24} sm={12} lg={6} key={item}>
                    <Card
                      style={{ borderRadius: 18, borderColor: '#eadcd3' }}
                      styles={{ body: { padding: 16 } }}
                    >
                      <Skeleton.Image
                        active
                        style={{ width: '100%', height: 220, marginBottom: 14 }}
                      />
                      <Skeleton active paragraph={{ rows: 3 }} />
                    </Card>
                  </Col>
                ))}

              {!productsLoading &&
                featuredProducts.map((product, idx) => {
                  const fallbackImg =
                    CATEGORY_FALLBACK_META[idx % CATEGORY_FALLBACK_META.length].image;
                  const unitPrice = product.minPrice || product.basePrice || 480000;
                  const ratingVal = product.averageRating
                    ? Number(product.averageRating).toFixed(1)
                    : '4.9';

                  return (
                    <Col xs={24} sm={12} lg={6} key={product.productId || idx}>
                      <Card
                        hoverable
                        onClick={() => onNavigate?.(`san-pham/${product.productId}`)}
                        style={{
                          height: '100%',
                          borderRadius: 18,
                          overflow: 'hidden',
                          border: '1px solid #e6d5cb',
                          background: '#ffffff',
                          boxShadow: '0 8px 24px rgba(27, 20, 18, 0.05)',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                        styles={{
                          body: {
                            padding: 18,
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          },
                        }}
                        cover={
                          <div
                            style={{
                              position: 'relative',
                              aspectRatio: '1 / 1',
                              overflow: 'hidden',
                              background: '#f5ece7',
                            }}
                          >
                            <img
                              src={product.primaryImageUrl || fallbackImg}
                              alt={product.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                              }}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = fallbackImg;
                              }}
                            />

                            {product.shop?.isVerified !== false && (
                              <div style={{ position: 'absolute', top: 12, left: 12 }}>
                                <Tag
                                  style={{
                                    margin: 0,
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    borderColor: '#e8c4be',
                                    color: '#8c1524',
                                    fontWeight: 700,
                                    fontSize: 11,
                                    borderRadius: 6,
                                    padding: '2px 8px',
                                  }}
                                >
                                  <CheckCircleFilled style={{ marginRight: 4 }} />
                                  NCC Xác Minh
                                </Tag>
                              </div>
                            )}

                            <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
                              <span
                                style={{
                                  background: 'rgba(22, 10, 13, 0.82)',
                                  color: '#ffffff',
                                  padding: '3px 9px',
                                  borderRadius: 6,
                                  fontSize: 11,
                                  fontWeight: 600,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 5,
                                }}
                              >
                                <span
                                  style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    background: '#34d399',
                                    display: 'inline-block',
                                  }}
                                />
                                {product.deliveryTag ||
                                  (product.effectiveStatus === 'Active' ? 'Còn hàng' : 'Giao 48h')}
                              </span>
                            </div>
                          </div>
                        }
                      >
                        <div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginBottom: 6,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#7a655f',
                                fontWeight: 600,
                                maxWidth: '75%',
                              }}
                              ellipsis
                            >
                              <ShopOutlined style={{ marginRight: 4, color: '#8c1524' }} />
                              {product.shop?.name || 'Xưởng Nghệ Nhân'}
                            </Text>
                            <span
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: '#d48806',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 3,
                              }}
                            >
                              <StarFilled /> {ratingVal}
                            </span>
                          </div>

                          <Tooltip title={product.name}>
                            <Title
                              level={5}
                              style={{
                                margin: '0 0 10px',
                                fontSize: 15.5,
                                fontWeight: 700,
                                color: '#1b1412',
                                lineHeight: 1.4,
                                minHeight: 44,
                              }}
                              ellipsis={{ rows: 2 }}
                            >
                              {product.name}
                            </Title>
                          </Tooltip>

                          <Space size={[6, 6]} wrap style={{ marginBottom: 14 }}>
                            <Tag
                              style={{
                                margin: 0,
                                background: '#faf3ee',
                                borderColor: '#e6d5cb',
                                color: '#4f3e39',
                                fontSize: 11,
                                fontWeight: 600,
                                borderRadius: 6,
                              }}
                            >
                              Tối thiểu: {product.minOrderQty || 20} {product.unit || 'hộp'}
                            </Tag>
                            {product.supportsCustomPackaging !== false && (
                              <Tag
                                style={{
                                  margin: 0,
                                  background: '#fff8eb',
                                  borderColor: '#f0d090',
                                  color: '#945d00',
                                  fontSize: 11,
                                  fontWeight: 600,
                                  borderRadius: 6,
                                }}
                              >
                                In logo riêng
                              </Tag>
                            )}
                          </Space>
                        </div>

                        <div style={{ paddingTop: 12, borderTop: '1px solid #f0e4dc' }}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'baseline',
                              justifyContent: 'space-between',
                              marginBottom: 12,
                            }}
                          >
                            <div>
                              <Text
                                style={{
                                  fontSize: 11,
                                  color: '#8c726c',
                                  display: 'block',
                                }}
                              >
                                Đơn giá B2B từ
                              </Text>
                              <Text
                                style={{
                                  fontFamily: "'Playfair Display', serif",
                                  fontSize: 18,
                                  fontWeight: 700,
                                  color: '#8c1524',
                                  fontVariantNumeric: 'tabular-nums',
                                }}
                              >
                                {formatCurrency(unitPrice)}
                              </Text>
                            </div>
                            <Tag
                              color={product.discountBadge === 'VIP' ? 'gold' : 'red'}
                              style={{ margin: 0, fontWeight: 700, borderRadius: 6 }}
                            >
                              {product.discountBadge || 'CK B2B -35%'}
                            </Tag>
                          </div>

                          <Button
                            type="primary"
                            block
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate?.(`san-pham/${product.productId}`);
                            }}
                            style={{
                              background: '#8c1524',
                              borderColor: '#8c1524',
                              borderRadius: 10,
                              fontWeight: 700,
                              height: 38,
                            }}
                          >
                            Đặt ngay
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </div>
        </section>

        {/* =====================================================================
            7. FEATURED SUPPLIERS — XƯỞNG BÁNH TIÊU BIỂU
        ===================================================================== */}
        <section
          style={{
            background: '#ffffff',
            borderBottom: '1px solid #e8dad2',
            padding: '60px 20px',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: 16,
                marginBottom: 28,
              }}
            >
              <div>
                <Text
                  style={{
                    display: 'block',
                    marginBottom: 6,
                    fontSize: 12,
                    color: '#8c726c',
                    fontWeight: 600,
                  }}
                >
                  Đã xác minh pháp nhân, công suất vụ mùa &amp; VSATTP
                </Text>
                <Title
                  level={2}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    margin: 0,
                    fontSize: 'clamp(1.65rem, 2.6vw, 2.25rem)',
                    color: '#1b1412',
                    fontWeight: 700,
                  }}
                >
                  Xưởng Bánh Tiêu Biểu
                </Title>
              </div>

              <Button
                type="default"
                icon={<ArrowRightOutlined />}
                iconPosition="end"
                onClick={() => onNavigate?.('tim-kiem')}
                style={{
                  borderColor: '#d9c2b8',
                  color: '#8c1524',
                  fontWeight: 700,
                  borderRadius: 10,
                  height: 40,
                  padding: '0 18px',
                  background: '#fdf8f5',
                }}
              >
                Xem tất cả (50+)
              </Button>
            </div>

            <Row gutter={[24, 24]}>
              {FEATURED_SUPPLIERS.map((sup) => (
                <Col xs={24} md={8} key={sup.id}>
                  <Card
                    hoverable
                    style={{
                      height: '100%',
                      borderRadius: 20,
                      overflow: 'hidden',
                      border: '1px solid #e6d5cb',
                      background: '#fffcf9',
                      boxShadow: '0 8px 24px rgba(27, 20, 18, 0.05)',
                    }}
                    styles={{
                      body: {
                        padding: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      },
                    }}
                    cover={
                      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                        <img
                          src={sup.image}
                          alt={sup.name}
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
                            inset: 0,
                            background:
                              'linear-gradient(to top, rgba(22, 10, 13, 0.8) 0%, transparent 60%)',
                          }}
                        />

                        <div
                          style={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            right: 12,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Tag
                            style={{
                              margin: 0,
                              background: 'rgba(20, 10, 12, 0.85)',
                              borderColor: 'rgba(245, 200, 64, 0.45)',
                              color: '#f5c840',
                              fontWeight: 700,
                              fontSize: 11,
                              borderRadius: 6,
                            }}
                          >
                            ★ {sup.badge}
                          </Tag>

                          <Tag
                            style={{
                              margin: 0,
                              background: 'rgba(6, 78, 59, 0.9)',
                              borderColor: 'transparent',
                              color: '#d1fae5',
                              fontWeight: 600,
                              fontSize: 10.5,
                              borderRadius: 6,
                            }}
                          >
                            <SafetyCertificateOutlined style={{ marginRight: 4 }} />
                            {sup.cert}
                          </Tag>
                        </div>

                        <div
                          style={{
                            position: 'absolute',
                            bottom: 12,
                            left: 16,
                            right: 16,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <Title
                              level={4}
                              style={{
                                margin: 0,
                                color: '#ffffff',
                                fontSize: 18,
                                fontFamily: "'Playfair Display', serif",
                              }}
                            >
                              {sup.name}
                            </Title>
                          </div>

                          <div
                            style={{
                              background: 'rgba(255,255,255,0.95)',
                              padding: '3px 9px',
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 700,
                              color: '#b45309',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                            }}
                          >
                            <StarFilled style={{ color: '#f59e0b' }} />
                            <span>{sup.rating}</span>
                            <span style={{ color: '#8c726c', fontWeight: 500, fontSize: 11 }}>
                              ({sup.reviewsCount})
                            </span>
                          </div>
                        </div>
                      </div>
                    }
                  >
                    <div>
                      <Paragraph
                        style={{
                          fontSize: 13,
                          color: '#574742',
                          lineHeight: 1.6,
                          marginBottom: 14,
                        }}
                      >
                        {sup.desc}
                      </Paragraph>

                      {/* Capacity & Location Ledger Box */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: 8,
                          padding: '10px 12px',
                          borderRadius: 10,
                          background: '#f6eee8',
                          border: '1px solid #e8dad2',
                          marginBottom: 14,
                        }}
                      >
                        <div>
                          <Text style={{ fontSize: 11, color: '#7a655f', display: 'block' }}>
                            <EnvironmentOutlined style={{ marginRight: 4, color: '#8c1524' }} />
                            Khu vực xưởng
                          </Text>
                          <Text style={{ fontSize: 12.5, fontWeight: 700, color: '#1b1412' }}>
                            {sup.location}
                          </Text>
                        </div>
                        <div style={{ borderLeft: '1px solid #dfd0c7', paddingLeft: 10 }}>
                          <Text style={{ fontSize: 11, color: '#7a655f', display: 'block' }}>
                            Công suất mùa vụ
                          </Text>
                          <Text
                            style={{
                              fontSize: 12.5,
                              fontWeight: 700,
                              color: '#047857',
                              fontVariantNumeric: 'tabular-nums',
                            }}
                          >
                            {sup.capacity}
                          </Text>
                        </div>
                      </div>

                      <Space size={[6, 6]} wrap style={{ marginBottom: 16 }}>
                        {sup.tags.map((tag) => (
                          <Tag
                            key={tag}
                            style={{
                              margin: 0,
                              background: '#ffffff',
                              borderColor: '#e2d0c6',
                              color: '#574742',
                              fontSize: 11,
                              borderRadius: 6,
                            }}
                          >
                            #{tag}
                          </Tag>
                        ))}
                      </Space>
                    </div>

                    <Row gutter={10}>
                      <Col span={12}>
                        <Button
                          block
                          onClick={() => onNavigate?.('tim-kiem')}
                          style={{
                            borderRadius: 10,
                            fontWeight: 600,
                            borderColor: '#d9c2b8',
                            color: '#3b302c',
                            height: 38,
                          }}
                        >
                          Xem Sản Phẩm
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Button
                          type="primary"
                          block
                          onClick={() => onNavigate?.('so-sanh-bao-gia')}
                          style={{
                            background: '#8c1524',
                            borderColor: '#8c1524',
                            borderRadius: 10,
                            fontWeight: 700,
                            height: 38,
                          }}
                        >
                          Nhận Báo Giá
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* =====================================================================
            8. TRUST & OPERATIONS — CHUẨN MỰC VẬN HÀNH & BẢO CHỨNG PHÁP LÝ B2B
        ===================================================================== */}
        <section
          style={{
            background: '#fbf4ee',
            borderBottom: '1px solid #e8dad2',
            padding: '60px 20px',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <Row gutter={[40, 32]} align="middle">
              <Col xs={24} lg={10}>
                <Title
                  level={2}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    margin: '0 0 14px',
                    fontSize: 'clamp(1.65rem, 2.6vw, 2.25rem)',
                    color: '#1b1412',
                    fontWeight: 700,
                  }}
                >
                  Chuẩn Mực Vận Hành B2B
                </Title>
                <Paragraph
                  style={{
                    fontSize: 14,
                    color: '#574742',
                    lineHeight: 1.65,
                    marginBottom: 20,
                  }}
                >
                  Mọi giao dịch trên Nguyệt Phố đều được bảo vệ bởi khung pháp lý hợp đồng điện tử
                  e-Contract và cơ chế tài khoản ký quỹ ngân hàng, giúp bộ phận Thu mua &amp; Kế
                  toán hoàn toàn an tâm về chứng từ lẫn tiến độ.
                </Paragraph>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Card
                    size="small"
                    style={{
                      borderRadius: 12,
                      borderColor: '#e6d5cb',
                      background: '#ffffff',
                    }}
                  >
                    <Space align="start" size={10}>
                      <CheckCircleFilled style={{ color: '#16a34a', fontSize: 16, marginTop: 3 }} />
                      <div>
                        <Text
                          style={{
                            fontWeight: 700,
                            fontSize: 13.5,
                            color: '#1b1412',
                            display: 'block',
                          }}
                        >
                          100% Xưởng đạt chuẩn ISO 22000 / HACCP
                        </Text>
                        <Text style={{ fontSize: 12, color: '#6e5a54' }}>
                          Hồ sơ công bố chất lượng và kiểm nghiệm VSATTP đính kèm từng lô hàng.
                        </Text>
                      </div>
                    </Space>
                  </Card>

                  <Card
                    size="small"
                    style={{
                      borderRadius: 12,
                      borderColor: '#e6d5cb',
                      background: '#ffffff',
                    }}
                  >
                    <Space align="start" size={10}>
                      <BankOutlined style={{ color: '#8c1524', fontSize: 16, marginTop: 3 }} />
                      <div>
                        <Text
                          style={{
                            fontWeight: 700,
                            fontSize: 13.5,
                            color: '#1b1412',
                            display: 'block',
                          }}
                        >
                          Ký quỹ SafeTrade — Nghiệm thu PoD mới giải ngân
                        </Text>
                        <Text style={{ fontSize: 12, color: '#6e5a54' }}>
                          Chỉ thanh toán cho xưởng sau khi doanh nghiệp ký xác nhận đủ số lượng
                          &amp; quy cách.
                        </Text>
                      </div>
                    </Space>
                  </Card>

                  <Card
                    size="small"
                    style={{
                      borderRadius: 12,
                      borderColor: '#e6d5cb',
                      background: '#ffffff',
                    }}
                  >
                    <Space align="start" size={10}>
                      <AuditOutlined style={{ color: '#d48806', fontSize: 16, marginTop: 3 }} />
                      <div>
                        <Text
                          style={{
                            fontWeight: 700,
                            fontSize: 13.5,
                            color: '#1b1412',
                            display: 'block',
                          }}
                        >
                          Cam kết SLA: Đổi mới 100% trong 12 giờ
                        </Text>
                        <Text style={{ fontSize: 12, color: '#6e5a54' }}>
                          Bảo hiểm rủi ro móp méo hộp trong quá trình vận chuyển và bồi hoàn nếu trễ
                          hẹn.
                        </Text>
                      </div>
                    </Space>
                  </Card>
                </div>
              </Col>

              <Col xs={24} lg={14}>
                <div className="flex justify-center">
                  <TrustSecurityBadges />
                </div>
              </Col>
            </Row>
          </div>
        </section>

        {/* =====================================================================
            9. FAQ — CÂU HỎI THƯỜNG GẶP
        ===================================================================== */}
        <section
          style={{
            background: '#ffffff',
            borderBottom: '1px solid #e8dad2',
            padding: '60px 20px',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <Row gutter={[40, 32]} align="top">
              <Col xs={24} lg={9}>
                <Title
                  level={2}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    margin: '0 0 12px',
                    fontSize: 'clamp(1.65rem, 2.6vw, 2.25rem)',
                    color: '#1b1412',
                    fontWeight: 700,
                  }}
                >
                  Câu Hỏi Thường Gặp
                </Title>
                <Paragraph style={{ fontSize: 14, color: '#63534e', lineHeight: 1.65 }}>
                  Giải đáp chi tiết về quy trình xuất hóa đơn VAT, nhận hộp mẫu thử, thiết kế logo
                  thương hiệu riêng và cơ chế bảo vệ người mua SafeTrade Escrow.
                </Paragraph>

                <Card
                  style={{
                    marginTop: 20,
                    borderRadius: 18,
                    background: 'linear-gradient(145deg, #240c12 0%, #3b1019 100%)',
                    border: '1px solid rgba(245, 200, 64, 0.3)',
                  }}
                  styles={{ body: { padding: 22 } }}
                >
                  <Text
                    style={{
                      color: '#f5c840',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Chuyên Viên Tư Vấn Doanh Nghiệp 24/7
                  </Text>
                  <Title
                    level={4}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: '#ffffff',
                      margin: '0 0 8px',
                      fontSize: 19,
                    }}
                  >
                    Cần Tư Vấn Gói Quà Theo Ngân Sách Riêng?
                  </Title>
                  <Paragraph
                    style={{ color: 'rgba(255,255,255,0.78)', fontSize: 12.5, marginBottom: 16 }}
                  >
                    Đội ngũ Account Manager hỗ trợ lên phương án phối hộp, báo giá so sánh 3 xưởng
                    trong vòng 30 phút.
                  </Paragraph>

                  <Space direction="vertical" size={10} style={{ width: '100%' }}>
                    <Button
                      type="primary"
                      block
                      icon={<ThunderboltOutlined />}
                      onClick={() => onNavigate?.('so-sanh-bao-gia')}
                      style={{
                        background: '#d48806',
                        borderColor: '#d48806',
                        fontWeight: 700,
                        height: 40,
                        borderRadius: 10,
                      }}
                    >
                      Gửi Yêu Cầu Báo Giá Nhanh
                    </Button>
                    <div style={{ textAlign: 'center', paddingTop: 4 }}>
                      <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>
                        <PhoneOutlined style={{ color: '#f5c840', marginRight: 6 }} />
                        Hotline B2B: <strong style={{ color: '#ffffff' }}>1800 6886</strong> (Miễn
                        phí)
                      </Text>
                    </div>
                  </Space>
                </Card>
              </Col>

              <Col xs={24} lg={15}>
                <FaqAccordion onNavigate={onNavigate} />
              </Col>
            </Row>
          </div>
        </section>

        {/* =====================================================================
            10. SUPPLIER PARTNERSHIP & IMPERIAL CLOSING CTA
        ===================================================================== */}
        <section
          style={{
            background: '#faf7f2',
            padding: '52px 20px 64px',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            {/* Vendor Onboarding Strip */}
            <Card
              bordered={false}
              style={{
                borderRadius: 20,
                background: '#fffcf9',
                border: '1px solid #e2cdc2',
                marginBottom: 28,
                boxShadow: '0 6px 20px rgba(27, 20, 18, 0.04)',
              }}
              styles={{ body: { padding: '22px 28px' } }}
            >
              <Row gutter={[20, 16]} align="middle" justify="space-between">
                <Col xs={24} md={16}>
                  <Space align="center" size={12}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: '#fdf2f0',
                        border: '1px solid #e8c4be',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#8c1524',
                        fontSize: 20,
                        flexShrink: 0,
                      }}
                    >
                      <CompassOutlined />
                    </div>
                    <div>
                      <Title
                        level={4}
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          margin: '0 0 2px',
                          fontSize: 19,
                          color: '#1b1412',
                        }}
                      >
                        Hợp Tác Phân Phối Bánh Trung Thu B2B Cùng Nguyệt Phố
                      </Title>
                      <Text style={{ fontSize: 13, color: '#63534e' }}>
                        Dành cho xưởng nghệ nhân &amp; nhà máy đạt chuẩn ISO/VSATTP — tiếp cận hàng
                        nghìn đơn hàng doanh nghiệp mùa vụ 2025.
                      </Text>
                    </div>
                  </Space>
                </Col>
                <Col xs={24} md="auto">
                  <Button
                    size="large"
                    icon={<ShopOutlined />}
                    onClick={() => onNavigate?.('dang-ky-nha-cung-cap')}
                    style={{
                      borderRadius: 10,
                      fontWeight: 700,
                      borderColor: '#8c1524',
                      color: '#8c1524',
                      background: '#ffffff',
                      height: 44,
                      padding: '0 22px',
                    }}
                  >
                    Đăng ký mở gian hàng
                  </Button>
                </Col>
              </Row>
            </Card>

            {/* Imperial Lacquer Closing Banner */}
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 26,
                padding: '44px 28px',
                background:
                  'radial-gradient(circle at 85% 20%, rgba(245, 200, 64, 0.2) 0%, transparent 45%), linear-gradient(135deg, #5e0814 0%, #380c16 55%, #1d090e 100%)',
                border: '1px solid rgba(245, 200, 64, 0.35)',
                boxShadow: '0 24px 50px rgba(60, 10, 18, 0.25)',
                textAlign: 'center',
              }}
            >
              <div style={{ position: 'relative', zIndex: 2, maxWidth: 680, margin: '0 auto' }}>
                <Tag
                  style={{
                    margin: '0 0 12px',
                    background: 'rgba(245, 200, 64, 0.15)',
                    borderColor: 'rgba(245, 200, 64, 0.45)',
                    color: '#f5c840',
                    fontWeight: 700,
                    fontSize: 11,
                    borderRadius: 999,
                    padding: '2px 12px',
                  }}
                >
                  MÙA VỤ TRUNG THU DOANH NGHIỆP 2025
                </Tag>

                <Title
                  level={2}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: '#ffffff',
                    margin: '0 0 12px',
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  }}
                >
                  Sẵn Sàng Chuẩn Bị Quà Tặng Doanh Nghiệp?
                </Title>

                <Paragraph
                  style={{
                    color: 'rgba(255, 245, 238, 0.85)',
                    fontSize: 14.5,
                    marginBottom: 24,
                  }}
                >
                  Nhận ấn phẩm Catalog 2025, bảng chào giá chiết khấu gốc tới 35% và đặt lịch gửi
                  hộp mẫu thử miễn phí tận trụ sở ngay hôm nay.
                </Paragraph>

                <Space size={[14, 12]} wrap style={{ justifyContent: 'center' }}>
                  <Button
                    size="large"
                    icon={<ThunderboltFilled />}
                    onClick={() => onNavigate?.('so-sanh-bao-gia')}
                    style={{
                      background: '#d48806',
                      borderColor: '#f5c840',
                      color: '#ffffff',
                      borderRadius: 12,
                      fontWeight: 700,
                      height: 48,
                      padding: '0 28px',
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
                      borderRadius: 12,
                      fontWeight: 700,
                      height: 48,
                      padding: '0 26px',
                      borderColor: 'rgba(255, 255, 255, 0.45)',
                      color: '#ffffff',
                    }}
                  >
                    Xem 120+ Mẫu Hộp 2025
                  </Button>
                </Space>

                <Divider
                  style={{ borderColor: 'rgba(255, 255, 255, 0.12)', margin: '24px 0 16px' }}
                />

                <Space size={[20, 8]} wrap style={{ justifyContent: 'center', fontSize: 12.5 }}>
                  <span style={{ color: '#f3e5d8' }}>
                    <PhoneOutlined style={{ color: '#f5c840', marginRight: 6 }} />
                    Hotline: <strong style={{ color: '#ffffff' }}>1800 6886</strong>
                  </span>
                  <span style={{ color: '#f3e5d8' }}>
                    <CheckCircleFilled style={{ color: '#34d399', marginRight: 6 }} />
                    Ký quỹ SafeTrade 100% An Toàn
                  </span>
                  <span style={{ color: '#f3e5d8' }}>
                    <SafetyCertificateFilled style={{ color: '#f5c840', marginRight: 6 }} />
                    100% Hóa Đơn Điện Tử VAT
                  </span>
                </Space>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Customer Footer */}
      <CustomerFooter onNavigate={onNavigate} />
    </div>
  );
}
