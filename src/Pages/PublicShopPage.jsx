import { useCallback, useRef, useState } from 'react';
import { Alert, Button, Card, Empty, Form, Input, InputNumber, Rate, Result, Select, Skeleton, Space, Switch, Typography } from 'antd';
import CustomerHeader from '../components/layout/CustomerHeader';
import CustomerFooter from '../components/layout/CustomerFooter';
import ShopRenderer from '../components/shop/ShopRenderer';
import { useShopResource } from '../hooks/useShopResource';
import { shopService } from '../services/shopService';
import { shopError } from '../constants/shop';

function CursorList({ load, render }) {
  const resource = useShopResource(load);
  const [extra, setExtra] = useState([]);
  const [cursor, setCursor] = useState(undefined);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const running = useRef(false);
  const nextCursor = cursor === undefined ? resource.data?.nextCursor : cursor;
  const more = async () => {
    if (running.current || !nextCursor) return;
    running.current = true; setBusy(true); setError(null);
    try {
      const page = await load(undefined, nextCursor);
      setExtra((rows) => [...rows, ...page.items]); setCursor(page.nextCursor);
    } catch (failure) { setError(failure); }
    finally { running.current = false; setBusy(false); }
  };
  if (resource.loading && !resource.data) return <Skeleton active />;
  if (resource.error) return <Alert type="error" title={shopError(resource.error)} action={<Button onClick={resource.reload}>Thử lại</Button>} />;
  return <>{render([...(resource.data?.items || []), ...extra])}
    {error && <Alert type="error" title={shopError(error)} />}
    {nextCursor && <Button loading={busy} onClick={more}>Xem thêm</Button>}</>;
}

function Reviews({ slug }) {
  const [rating, setRating] = useState(undefined);
  const load = useCallback((signal, cursor) => shopService.reviews(slug, { pageSize: 10, rating, cursor }, signal), [slug, rating]);
  return <Card title="Đánh giá từ khách hàng">
    <Select aria-label="Lọc đánh giá" allowClear placeholder="Tất cả số sao"
      style={{ width: 150, marginBottom: 16 }} value={rating} onChange={setRating} options={[5, 4, 3, 2, 1].map((value) => ({ value, label: `${value} sao` }))} />
    <CursorList key={rating || 'all'} load={load} render={(rows) => rows.length ? <Space orientation="vertical" style={{ width: '100%' }}>
      {rows.map((review) => <Card key={review.id} size="small"><Space orientation="vertical">
        {review.overallRating && <Rate disabled value={review.overallRating} />}
        <Typography.Text>{review.comment || 'Khách hàng không để lại nhận xét.'}</Typography.Text>
        <Typography.Text type="secondary">{new Date(review.createdAtUtc).toLocaleDateString('vi-VN')}</Typography.Text>
      </Space></Card>)}</Space> : <Empty description="Chưa có đánh giá phù hợp" />} />
  </Card>;
}

function Catalog({ shop }) {
  const [filters, setFilters] = useState({ sort: 'newest' });
  const [categoryExtra, setCategoryExtra] = useState([]);
  const [categoryCursor, setCategoryCursor] = useState(undefined);
  const [categoryBusy, setCategoryBusy] = useState(false);
  const [categoryError, setCategoryError] = useState(null);
  const categoryLoader = useCallback((signal) => shopService.categories(shop.slug, { pageSize: 100 }, signal), [shop.slug]);
  const categories = useShopResource(categoryLoader);
  const load = useCallback((signal, cursor) => shopService.products(shop.slug, { ...filters, pageSize: 12, cursor }, signal), [shop.slug, filters]);
  const filterForm = <Form layout="vertical" initialValues={filters} onFinish={(values) => setFilters(Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined && value !== null && value !== '')))}>
    <Form.Item name="q" label="Tìm sản phẩm"><Input maxLength={100} allowClear /></Form.Item>
    <Form.Item name="categoryId" label="Danh mục"><Select allowClear loading={categories.loading}
      options={[...(categories.data?.items || []), ...categoryExtra].map((item) => ({ value: item.id, label: item.name }))} /></Form.Item>
    {(categoryCursor === undefined ? categories.data?.nextCursor : categoryCursor) && <Button loading={categoryBusy} onClick={async () => {
      setCategoryBusy(true); setCategoryError(null);
      try { const page = await shopService.categories(shop.slug, { pageSize: 100, cursor: categoryCursor ?? categories.data.nextCursor });
        setCategoryExtra((items) => [...items, ...page.items]); setCategoryCursor(page.nextCursor);
      } catch (failure) { setCategoryError(failure); } finally { setCategoryBusy(false); }
    }}>Thêm danh mục</Button>}
    {(categories.error || categoryError) && <Alert type="error" title={shopError(categoryError || categories.error)} />}
    <Space wrap align="start"><Form.Item name="minPrice" label="Giá từ"><InputNumber min={0} max={999999999999.99} /></Form.Item>
      <Form.Item name="maxPrice" label="Giá đến" rules={[({ getFieldValue }) => ({ validator(_, value) {
        return value == null || getFieldValue('minPrice') == null || value >= getFieldValue('minPrice') ? Promise.resolve() : Promise.reject(new Error('Giá đến phải lớn hơn giá từ.'));
      } })]}><InputNumber min={0} max={999999999999.99} /></Form.Item>
      <Form.Item name="flavor" label="Hương vị"><Input maxLength={100} /></Form.Item>
      <Form.Item name="filling" label="Nhân bánh"><Input maxLength={100} /></Form.Item>
      <Form.Item name="weightGram" label="Khối lượng (g)"><InputNumber min={1} max={10000} precision={0} /></Form.Item>
      <Form.Item name="sort" label="Sắp xếp"><Select style={{ width: 150 }} options={[{ value: 'newest', label: 'Mới nhất' }, { value: 'priceAsc', label: 'Giá tăng dần' }, { value: 'priceDesc', label: 'Giá giảm dần' }]} /></Form.Item>
      <Form.Item name="inStockOnly" label="Chỉ còn hàng" valuePropName="checked"><Switch /></Form.Item>
    </Space><Form.Item><Button type="primary" htmlType="submit">Áp dụng bộ lọc</Button></Form.Item>
  </Form>;
  return <CursorList key={JSON.stringify(filters)} load={load} render={(products) => <ShopRenderer shop={shop} appearance={shop.appearance}
    products={products} filters={filterForm} reviews={<Reviews slug={shop.slug} />} />} />;
}

export default function PublicShopPage({ slug, onNavigate }) {
  const load = useCallback((signal) => shopService.public(slug, signal), [slug]);
  const resource = useShopResource(load);
  return <><CustomerHeader onNavigate={onNavigate} /><main style={{ boxSizing: 'border-box', width: '100%', maxWidth: 1440, margin: '24px auto', padding: '0 16px' }}>
    {resource.loading ? <Skeleton active /> : resource.error ? <Result status={resource.error.status === 404 ? '404' : 'error'}
      title={resource.error.status === 404 ? 'Gian hàng hiện chưa khả dụng' : shopError(resource.error)}
      extra={<Button onClick={resource.reload}>Tải lại</Button>} /> : resource.data ? <>
      <Typography.Paragraph type="secondary">{resource.data.reviewCount} đánh giá · {resource.data.averageRating == null ? 'Chưa có điểm đánh giá' : `${resource.data.averageRating.toFixed(1)}/5`}</Typography.Paragraph>
      <Catalog key={slug} shop={resource.data} />
    </> : <Empty />}
  </main><CustomerFooter onNavigate={onNavigate} /></>;
}
