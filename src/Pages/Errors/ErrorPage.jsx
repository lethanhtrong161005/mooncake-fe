import { ArrowLeftOutlined, HomeOutlined, SearchOutlined } from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import CustomerFooter from '../../components/layout/CustomerFooter';
import './error-pages.css';

export default function ErrorPage({ code, title, description, onNavigate, onLogin }) {
  return (
    <div className="customer-error-page">
      <CustomerHeader onNavigate={onNavigate} />
      <main className="customer-error-page__main">
        <section className="customer-error-page__panel" aria-labelledby="customer-error-title">
          <div className="customer-error-page__moon" aria-hidden="true" />
          <span className="customer-error-page__code">{code}</span>
          <div className="customer-error-page__copy">
            <p className="customer-error-page__eyebrow">Nguyệt Phố</p>
            <h1 id="customer-error-title">{title}</h1>
            <p>{description}</p>
            <div className="customer-error-page__actions">
              {onLogin && (
                <button type="button" className="customer-error-page__primary" onClick={onLogin}>
                  Đăng nhập để tiếp tục <ArrowLeftOutlined rotate={180} />
                </button>
              )}
              <button type="button" className={onLogin ? 'customer-error-page__secondary' : 'customer-error-page__primary'} onClick={() => onNavigate?.('trang-chu')}>
                <HomeOutlined /> Về trang chủ
              </button>
              <button type="button" className="customer-error-page__text" onClick={() => onNavigate?.('tim-kiem')}>
                <SearchOutlined /> Xem sản phẩm
              </button>
            </div>
          </div>
        </section>
      </main>
      <CustomerFooter onNavigate={onNavigate} />
    </div>
  );
}
