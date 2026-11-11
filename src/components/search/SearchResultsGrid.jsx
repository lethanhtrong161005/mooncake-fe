import { Alert, Button, Card, Col, Empty, Pagination, Row, Skeleton, Typography } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import ProductSearchCard from './ProductSearchCard';

const { Text } = Typography;

export default function SearchResultsGrid({
  items,
  totalCount,
  pageNumber,
  pageSize,
  viewMode,
  isLoading,
  error,
  activeFilterCount,
  isMobile,
  onPaginationChange,
  onResetAll,
  onRetry,
  onNavigate,
}) {
  if (error) {
    return (
      <Alert
        type="error"
        showIcon
        data-testid="search-error-alert"
        title="Không thể tải danh sách sản phẩm"
        description={error}
        action={
          <Button
            size="small"
            danger
            icon={<ReloadOutlined />}
            onClick={onRetry}
            data-testid="search-retry-btn"
          >
            Thử lại
          </Button>
        }
        style={{
          borderRadius: 12,
          marginBottom: 24,
        }}
      />
    );
  }

  if (isLoading) {
    return (
      <Row gutter={[16, 16]} data-testid="search-loading-skeleton">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Col xs={24} sm={12} xl={8} key={`skeleton-${idx}`}>
            <Card
              style={{ borderRadius: 10, borderColor: '#e7e5e4' }}
              styles={{ body: { padding: 14 } }}
            >
              <Skeleton.Button
                active
                block
                style={{ height: 170, borderRadius: 8, marginBottom: 12 }}
              />
              <Skeleton active paragraph={{ rows: 3 }} />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  if (!items || items.length === 0) {
    return (
      <Card
        data-testid="search-empty-state"
        style={{
          borderRadius: 10,
          borderColor: '#e7e5e4',
          textAlign: 'center',
          padding: '32px 16px',
        }}
      >
        <Empty
          description={
            <div>
              <Text strong style={{ display: 'block', fontSize: 15, color: '#333' }}>
                Chưa tìm thấy sản phẩm phù hợp
              </Text>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Hãy thử mở rộng khoảng giá, bỏ bớt bộ lọc hoặc tìm với từ khóa khác.
              </Text>
            </div>
          }
        >
          {activeFilterCount > 0 && (
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={onResetAll}
              data-testid="empty-reset-filters-btn"
              style={{ background: '#8c1524', borderColor: '#8c1524' }}
            >
              Xóa tất cả bộ lọc
            </Button>
          )}
        </Empty>
      </Card>
    );
  }

  return (
    <div>
      {viewMode === 'list' && !isMobile ? (
        <div
          data-testid="search-results-list"
          style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          {items.map((item) => (
            <ProductSearchCard
              key={item.productId || item.id}
              item={item}
              viewMode="list"
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : (
        <Row gutter={[16, 16]} data-testid="search-results-grid">
          {items.map((item) => (
            <Col xs={24} sm={12} xl={8} key={item.productId || item.id}>
              <ProductSearchCard item={item} viewMode="grid" onNavigate={onNavigate} />
            </Col>
          ))}
        </Row>
      )}

      <div
        data-testid="search-pagination-wrapper"
        className="search-pagination"
      >
        <Pagination
          current={pageNumber}
          pageSize={pageSize}
          total={totalCount}
          showSizeChanger={false}
          showQuickJumper={false}
          onChange={(nextPage) => {
            onPaginationChange(nextPage);
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          responsive
        />
      </div>
    </div>
  );
}
