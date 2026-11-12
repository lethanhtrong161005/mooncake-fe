import { useEffect, useRef, useState } from 'react';
import { Button, Card, Collapse, Empty, Skeleton, Tag, Typography } from 'antd';
import {
  ArrowRightOutlined,
  FileDoneOutlined,
  SearchOutlined,
  ShopOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import CustomerFooter from '../components/layout/CustomerFooter';
import CustomerHeader from '../components/layout/CustomerHeader';
import WishlistButton from '../components/product/WishlistButton';
import productService from '../services/productService';
import { formatCurrency } from '../utils/formatters';
import '../styles/home-page.css';
import '../styles/home-cinematic.css';

const { Title, Text, Paragraph } = Typography;

const COLLECTIONS = [
  {
    name: 'Hộp quà sơn mài',
    description: 'Một cách trao quà thật chỉn chu.',
    image: '/categories/hop-son-mai.jpg',
  },
  {
    name: 'Bánh nướng',
    description: 'Hương vị quen, cách tặng mới.',
    image: '/categories/banh-nuong.jpg',
  },
  {
    name: 'Bánh dẻo',
    description: 'Mềm dịu cho mùa sum vầy.',
    image: '/categories/banh-deo.jpg',
  },
  {
    name: 'Bánh dinh dưỡng',
    description: 'Thêm lựa chọn cho mọi người nhận.',
    image: '/categories/banh-dinh-duong.jpg',
  },
];

const PURCHASE_STEPS = [
  {
    icon: <SearchOutlined aria-hidden="true" />,
    title: 'Chọn mẫu quà',
    detail: 'Khám phá sản phẩm và quy cách phù hợp.',
  },
  {
    icon: <SolutionOutlined aria-hidden="true" />,
    title: 'Gửi nhu cầu',
    detail: 'Cho xưởng biết số lượng, thời hạn và thiết kế.',
  },
  {
    icon: <FileDoneOutlined aria-hidden="true" />,
    title: 'Chốt phương án',
    detail: 'So sánh báo giá trước khi chọn nhà cung cấp.',
  },
];

const FAQ_ITEMS = [
  {
    key: 'custom',
    label: 'Tôi có thể đặt hộp quà theo nhận diện doanh nghiệp không?',
    children: 'Có. Bạn có thể xem sản phẩm hỗ trợ tùy chỉnh bao bì, hoặc gửi yêu cầu báo giá để mô tả logo, số lượng và quy cách mong muốn.',
  },
  {
    key: 'quote',
    label: 'Nếu chưa chọn được mẫu phù hợp thì làm gì?',
    children: 'Hãy tạo yêu cầu báo giá. Bạn mô tả nhu cầu, mời nhà cung cấp tham gia và so sánh các báo giá nhận được trong tài khoản của mình.',
  },
  {
    key: 'price',
    label: 'Giá hiển thị có phải giá cuối cùng cho đơn số lượng lớn?',
    children: 'Giá trên sản phẩm là giá tham khảo theo thông tin nhà cung cấp đăng bán. Giá cho số lượng, bao bì và thời gian giao cụ thể được xác nhận khi đặt hàng hoặc nhận báo giá.',
  },
];

const categoryImage = (category, index) => {
  const name = String(category.name || '').toLocaleLowerCase('vi-VN');
  if (name.includes('sơn mài') || name.includes('hộp')) return COLLECTIONS[0].image;
  if (name.includes('nướng')) return COLLECTIONS[1].image;
  if (name.includes('dẻo')) return COLLECTIONS[2].image;
  if (name.includes('dinh dưỡng') || name.includes('chay')) return COLLECTIONS[3].image;
  return COLLECTIONS[index % COLLECTIONS.length].image;
};

export default function HomePage({ onNavigate }) {
  const mainRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    productService.categories(controller.signal)
      .then((items) => {
        if (!controller.signal.aborted) setCategories(Array.isArray(items) ? items.slice(0, 4) : []);
      })
      .catch(() => {
        if (!controller.signal.aborted) setCategories([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) setCategoriesLoading(false);
      });

    productService.search({ page: 1, pageSize: 4, sort: 'newest' }, controller.signal)
      .then((response) => {
        if (controller.signal.aborted) return;
        setFeaturedProducts(Array.isArray(response?.items) ? response.items.slice(0, 4) : []);
        setProductsError(false);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setFeaturedProducts([]);
        setProductsError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setProductsLoading(false);
      });

    return () => controller.abort();
  }, [reloadKey]);

  useEffect(() => {
    const root = mainRef.current;
    if (!root || !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const targets = [...root.querySelectorAll('[data-home-reveal]')];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('home-await-reveal');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    targets.forEach((target) => {
      if (target.getBoundingClientRect().top <= window.innerHeight * 0.85) return;
      target.classList.add('home-await-reveal');
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  const retryCatalog = () => {
    setCategoriesLoading(true);
    setProductsLoading(true);
    setReloadKey((current) => current + 1);
  };

  const collections = categories.length > 0 ? categories : COLLECTIONS;

  return (
    <div className="home-page">
      <CustomerHeader activeKey="trang-chu" onNavigate={onNavigate} />

      <main ref={mainRef}>
        {/* Hero leads with the gift itself; procurement actions remain immediately available. */}
        <section className="home-hero home-hero--cinematic" aria-labelledby="home-hero-title">
          <div className="home-hero__copy">
            <Text className="home-hero__intro">Nguyệt Phố · Quà Trung thu doanh nghiệp</Text>
            <Title id="home-hero-title" level={1}>
              Món quà xứng với lời tri ân.
            </Title>
            <Paragraph>
              Tìm bánh và hộp quà cho đội ngũ, đối tác hoặc khách hàng. Chọn mẫu có sẵn,
              hoặc gửi nhu cầu riêng để nhận báo giá từ nhà cung cấp.
            </Paragraph>
            <div className="home-hero__actions">
              <Button type="primary" size="large" icon={<SearchOutlined />} onClick={() => onNavigate?.('tim-kiem')}>
                Xem sản phẩm
              </Button>
              <Button size="large" icon={<SolutionOutlined />} onClick={() => onNavigate?.('so-sanh-bao-gia')}>
                Yêu cầu báo giá
              </Button>
            </div>
            <Text className="home-hero__footnote">Từ lựa chọn đầu tiên đến đơn hàng cho cả doanh nghiệp.</Text>
          </div>
          <div className="home-hero__visual">
            <img
              src="/home-hero-cinematic.jpg"
              alt="Hộp quà bánh Trung thu sơn mài dưới ánh trăng"
              fetchPriority="high"
            />
            <div className="home-hero__caption">
              <span>Quà tặng mùa trăng</span>
              <span>Chọn theo cách của bạn</span>
            </div>
          </div>
        </section>

        <section className="home-journey" aria-label="Cách chọn quà doanh nghiệp">
          <div className="home-container home-journey__grid">
            {PURCHASE_STEPS.map((step) => (
              <div className="home-journey__step" key={step.title}>
                <span className="home-journey__icon">{step.icon}</span>
                <div>
                  <Text strong>{step.title}</Text>
                  <Text>{step.detail}</Text>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="home-collections" aria-labelledby="home-collections-title">
          <div className="home-container home-reveal-target" data-home-reveal>
            <div className="home-section-heading">
              <div>
                <Text className="home-section-heading__lead">Bắt đầu từ món quà</Text>
                <Title id="home-collections-title" level={2}>Chọn dòng quà phù hợp</Title>
              </div>
              <Button type="link" onClick={() => onNavigate?.('tim-kiem')}>
                Xem toàn bộ danh mục <ArrowRightOutlined aria-hidden="true" />
              </Button>
            </div>

            {categoriesLoading ? (
              <div className="home-collections__grid" aria-label="Đang tải danh mục">
                {COLLECTIONS.map((collection) => (
                  <Skeleton.Image key={collection.name} active className="home-collections__skeleton" />
                ))}
              </div>
            ) : (
              <div className="home-collections__grid">
                {collections.map((category, index) => {
                  const image = category.iconUrl || categoryImage(category, index);
                  const route = category.id
                    ? `tim-kiem?categoryIds=${encodeURIComponent(category.id)}`
                    : 'tim-kiem';

                  return (
                    <Card className="home-category" key={category.id || category.name}
                      styles={{ body: { padding: 0, height: '100%' } }}>
                      <img src={image} alt="" loading="lazy" onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = categoryImage(category, index);
                      }} />
                      <div className="home-category__content">
                        <Text>{category.description || COLLECTIONS[index]?.description}</Text>
                        <Title level={3}>{category.name}</Title>
                        <Button type="link" onClick={() => onNavigate?.(route)}
                          aria-label={`Xem sản phẩm thuộc danh mục ${category.name}`}>
                          Khám phá <ArrowRightOutlined aria-hidden="true" />
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="home-products" aria-labelledby="home-products-title">
          <div className="home-container home-reveal-target" data-home-reveal>
            <div className="home-section-heading">
              <div>
                <Text className="home-section-heading__lead">Từ gian hàng trên Nguyệt Phố</Text>
                <Title id="home-products-title" level={2}>Sản phẩm mới lên kệ</Title>
              </div>
              <Button type="link" onClick={() => onNavigate?.('tim-kiem')}>
                Xem thêm sản phẩm <ArrowRightOutlined aria-hidden="true" />
              </Button>
            </div>

            {productsLoading ? (
              <div className="home-products__grid" aria-label="Đang tải sản phẩm">
                {[0, 1, 2, 3].map((item) => (
                  <Card key={item}><Skeleton.Image active className="home-products__skeleton" />
                    <Skeleton active paragraph={{ rows: 2 }} /></Card>
                ))}
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="home-products__grid">
                {featuredProducts.map((product) => {
                  const price = product.minPrice ?? product.basePrice;
                  return (
                    <Card className="home-product" key={product.productId}>
                      <div className="home-product__image">
                        <span>Hình ảnh đang cập nhật</span>
                        {product.primaryImageUrl && (
                          <img src={product.primaryImageUrl} alt={product.name} loading="lazy"
                            onError={(event) => { event.currentTarget.hidden = true; }} />
                        )}
                        {product.shop?.isVerified === true && <Tag color="gold">Đã xác minh</Tag>}
                        <WishlistButton
                          productId={product.productId}
                          productName={product.name}
                          variant="overlay"
                        />
                      </div>
                      <div className="home-product__body">
                        <Text className="home-product__shop">{product.shop?.name || 'Nhà cung cấp'}</Text>
                        <Title level={3}>{product.name}</Title>
                        <div className="home-product__bottom">
                          <div>
                            {price != null && <Text strong className="home-product__price">Từ {formatCurrency(price)}</Text>}
                            {product.minOrderQty != null && (
                              <Text>Đặt từ {product.minOrderQty} {product.unit || 'hộp'}</Text>
                            )}
                          </div>
                          <Button type="link" onClick={() => onNavigate?.(`san-pham/${product.productId}`)}
                            aria-label={`Xem chi tiết ${product.name}`}>
                            Xem chi tiết <ArrowRightOutlined aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="home-products__empty">
                <Empty description={productsError
                  ? 'Chưa tải được sản phẩm. Vui lòng thử lại.'
                  : 'Sản phẩm mới đang được cập nhật.'} />
                <Button onClick={retryCatalog}>Tải lại sản phẩm</Button>
              </div>
            )}
          </div>
        </section>

        <section className="home-rfq" aria-labelledby="home-rfq-title">
          <div className="home-container home-rfq__inner home-reveal-target" data-home-reveal>
            <div>
              <Text className="home-rfq__lead">Dành cho đơn hàng có yêu cầu riêng</Text>
              <Title id="home-rfq-title" level={2}>Bạn có số lượng và ý tưởng. Xưởng sẽ gửi phương án.</Title>
            </div>
            <div className="home-rfq__action">
              <Paragraph>
                Gửi yêu cầu về sản phẩm, bao bì và thời hạn giao. Nhận báo giá để so sánh
                trước khi quyết định.
              </Paragraph>
              <Button type="primary" size="large" icon={<SolutionOutlined />}
                onClick={() => onNavigate?.('so-sanh-bao-gia')}>
                Tạo yêu cầu báo giá
              </Button>
            </div>
          </div>
        </section>

        <section className="home-faq" aria-labelledby="home-faq-title">
          <div className="home-container home-faq__grid">
            <div>
              <Text className="home-section-heading__lead">Trước khi đặt hàng</Text>
              <Title id="home-faq-title" level={2}>Điều bạn cần biết</Title>
              <Paragraph>Chọn mẫu có sẵn hoặc mô tả món quà bạn muốn tạo.</Paragraph>
              <Button type="link" onClick={() => onNavigate?.('tim-kiem')}>
                Khám phá sản phẩm <ArrowRightOutlined aria-hidden="true" />
              </Button>
            </div>
            <Collapse items={FAQ_ITEMS} accordion ghost defaultActiveKey="custom" />
          </div>
        </section>

        <section className="home-supplier" aria-label="Dành cho nhà cung cấp">
          <div className="home-container home-supplier__inner">
            <div>
              <ShopOutlined aria-hidden="true" />
              <span>Có xưởng bánh hoặc thương hiệu quà Trung thu?</span>
            </div>
            <Button onClick={() => onNavigate?.('dang-ky-nha-cung-cap')}>
              Đăng ký nhà cung cấp <ArrowRightOutlined aria-hidden="true" />
            </Button>
          </div>
        </section>
      </main>

      <CustomerFooter onNavigate={onNavigate} />
    </div>
  );
}
