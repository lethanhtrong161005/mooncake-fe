import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Button, Card, Skeleton, Typography } from 'antd';
import {
  ArrowLeftOutlined,
  HeartFilled,
  HeartOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import CustomerFooter from '../../components/layout/CustomerFooter';
import CustomerHeader from '../../components/layout/CustomerHeader';
import ProductSearchCard from '../../components/search/ProductSearchCard';
import { useWishlist } from '../../hooks/useWishlist';
import wishlistService from '../../services/wishlistService';
import { formatNumber } from '../../utils/formatCurrency';
import '../../styles/search-page.css';
import './wishlist.css';

const { Paragraph, Text, Title } = Typography;
const PAGE_SIZE = 12;

export default function WishlistPage({ onNavigate }) {
  const { isSaved, totalCount, syncLoadedItems } = useWishlist();

  const [items, setItems] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [pageTotal, setPageTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [loadMoreError, setLoadMoreError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  const loadMoreAbortRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    wishlistService.getPage({ pageSize: PAGE_SIZE, signal: controller.signal })
      .then((page) => {
        if (controller.signal.aborted) return;
        syncLoadedItems(page.items, page.totalCount);
        setItems(page.items);
        setNextCursor(page.nextCursor);
        setHasMore(page.hasMore);
        setPageTotal(page.totalCount);
        setError('');
        setLoadMoreError('');
      })
      .catch((err) => {
        if (
          controller.signal.aborted ||
          err?.name === 'CanceledError' ||
          err?.name === 'AbortError' ||
          err?.code === 'ERR_CANCELED'
        ) {
          return;
        }
        setError(err?.message || 'Không thể tải danh sách sản phẩm yêu thích.');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => {
      controller.abort();
      loadMoreAbortRef.current?.abort();
    };
  }, [reloadKey, syncLoadedItems]);

  const handleRetry = useCallback(() => {
    loadMoreAbortRef.current?.abort();
    setError('');
    setLoadMoreError('');
    setIsLoading(true);
    setReloadKey((current) => current + 1);
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore || !nextCursor) return;

    loadMoreAbortRef.current?.abort();
    const controller = new AbortController();
    loadMoreAbortRef.current = controller;

    setIsLoadingMore(true);
    setLoadMoreError('');

    try {
      const page = await wishlistService.getPage({
        pageSize: PAGE_SIZE,
        cursor: nextCursor,
        signal: controller.signal,
      });
      if (controller.signal.aborted) return;

      syncLoadedItems(page.items, page.totalCount);
      setItems((prev) => {
        const seenIds = new Set(prev.map((item) => String(item.productId || item.id)));
        const appended = page.items.filter(
          (item) => !seenIds.has(String(item.productId || item.id))
        );
        return [...prev, ...appended];
      });
      setNextCursor(page.nextCursor);
      setHasMore(page.hasMore);
      setPageTotal(page.totalCount);
    } catch (err) {
      if (
        controller.signal.aborted ||
        err?.name === 'CanceledError' ||
        err?.name === 'AbortError' ||
        err?.code === 'ERR_CANCELED'
      ) {
        return;
      }
      setLoadMoreError(
        err?.message || 'Không thể tải thêm sản phẩm yêu thích. Vui lòng thử lại.'
      );
    } finally {
      if (!controller.signal.aborted) {
        setIsLoadingMore(false);
      }
    }
  }, [hasMore, isLoadingMore, nextCursor, syncLoadedItems]);

  const visibleItems = useMemo(
    () => items.filter((item) => isSaved(item.productId || item.id)),
    [isSaved, items]
  );

  const resolvedTotal = totalCount !== null ? totalCount : pageTotal;
  const showEmptyState = !isLoading && !error && visibleItems.length === 0 && !hasMore;

  return (
    <div className="wishlist-page" data-testid="wishlist-page">
      <CustomerHeader activeKey="san-pham-yeu-thich" onNavigate={onNavigate} />

      <main className="wishlist-page__main">
        <div className="wishlist-page__container">
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            className="wishlist-page__back"
            onClick={() => onNavigate?.('tim-kiem')}
          >
            Khám phá thêm sản phẩm
          </Button>

          <header className="wishlist-page__header">
            <div>
              <Text className="wishlist-page__eyebrow">Bộ sưu tập đã lưu</Text>
              <Title level={1}>Sản phẩm yêu thích</Title>
              <Paragraph className="wishlist-page__subtitle">
                Lưu giữ các mẫu bánh và hộp quà phù hợp để đối chiếu nhanh khi chốt đơn
                doanh nghiệp hoặc gửi yêu cầu báo giá.
              </Paragraph>
            </div>

            <div className="wishlist-page__header-actions">
              <div className="wishlist-page__count-pill" data-testid="wishlist-total-count">
                <HeartFilled aria-hidden="true" />
                <span>
                  {resolvedTotal > 0
                    ? `${formatNumber(resolvedTotal)} sản phẩm đã lưu`
                    : 'Chưa có sản phẩm nào'}
                </span>
              </div>
              <Button
                icon={<SearchOutlined />}
                onClick={() => onNavigate?.('tim-kiem')}
              >
                Tìm thêm mẫu bánh
              </Button>
            </div>
          </header>

          {error && (
            <Alert
              type="error"
              showIcon
              message="Không thể tải danh sách sản phẩm yêu thích"
              description={error}
              action={
                <Button size="small" icon={<ReloadOutlined />} onClick={handleRetry}>
                  Thử lại
                </Button>
              }
              style={{ marginBottom: 24, borderRadius: 10 }}
            />
          )}

          {isLoading ? (
            <div className="wishlist-page__grid" aria-label="Đang tải sản phẩm yêu thích">
              {[0, 1, 2, 3].map((slot) => (
                <Card key={slot} className="wishlist-page__skeleton-card">
                  <Skeleton.Button active className="wishlist-page__skeleton-image" />
                  <Skeleton active paragraph={{ rows: 3 }} />
                </Card>
              ))}
            </div>
          ) : showEmptyState ? (
            <section className="wishlist-page__empty" data-testid="wishlist-empty-state">
              <div className="wishlist-page__empty-icon">
                <HeartOutlined aria-hidden="true" />
              </div>
              <Title level={2}>Chưa có sản phẩm yêu thích</Title>
              <Paragraph>
                Nhấn biểu tượng trái tim trên bất kỳ mẫu bánh hoặc set quà tặng nào để lưu lại
                cho kỳ chọn quà sắp tới.
              </Paragraph>
              <Button
                type="primary"
                size="large"
                icon={<SearchOutlined />}
                onClick={() => onNavigate?.('tim-kiem')}
              >
                Khám phá sản phẩm
              </Button>
            </section>
          ) : (
            <>
              {visibleItems.length > 0 ? (
                <div className="wishlist-page__grid" data-testid="wishlist-grid">
                  {visibleItems.map((item) => (
                    <ProductSearchCard
                      key={item.productId || item.id}
                      item={item}
                      viewMode="grid"
                      onNavigate={onNavigate}
                      skipWishlistCheck
                    />
                  ))}
                </div>
              ) : (
                <Alert
                  type="info"
                  showIcon
                  message="Các sản phẩm đang hiển thị đã được bỏ lưu"
                  description="Vẫn còn sản phẩm đã lưu ở trang tiếp theo. Nhấn Tải thêm sản phẩm bên dưới để xem."
                  style={{ borderRadius: 10 }}
                />
              )}

              {(hasMore && nextCursor) || visibleItems.length > 0 ? (
                <div className="wishlist-page__footer-bar">
                  <Text className="wishlist-page__progress" data-testid="wishlist-progress-text">
                    {hasMore
                      ? `Đang hiển thị ${formatNumber(visibleItems.length)} / ${formatNumber(
                        Math.max(resolvedTotal, visibleItems.length)
                      )} sản phẩm đã lưu`
                      : `Đã hiển thị toàn bộ ${formatNumber(visibleItems.length)} sản phẩm đã lưu`}
                  </Text>

                  {loadMoreError && (
                    <Alert
                      type="warning"
                      showIcon
                      message={loadMoreError}
                      action={
                        <Button size="small" onClick={handleRetry}>
                          Tải lại từ đầu
                        </Button>
                      }
                      style={{ maxWidth: 520, borderRadius: 8, textAlign: 'left' }}
                    />
                  )}

                  {hasMore && nextCursor && (
                    <Button
                      size="large"
                      loading={isLoadingMore}
                      onClick={handleLoadMore}
                      className="wishlist-page__load-more"
                      data-testid="wishlist-load-more-btn"
                    >
                      Tải thêm sản phẩm
                    </Button>
                  )}
                </div>
              ) : null}
            </>
          )}
        </div>
      </main>

      <CustomerFooter onNavigate={onNavigate} />
    </div>
  );
}

