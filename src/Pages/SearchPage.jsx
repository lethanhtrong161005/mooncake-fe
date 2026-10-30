import { useCallback, useEffect, useState } from 'react';
import { Button, Card, Checkbox, Col, Empty, Input, Pagination, Row, Select, Slider, Space, Spin, Tag, Typography } from 'antd';
import { SearchOutlined, SafetyCertificateOutlined, ShopOutlined } from '@ant-design/icons';
import CustomerHeader from '../components/layout/CustomerHeader';
import productService from '../services/productService';

const { Title, Text } = Typography;
const format = (value) => Number(value || 0).toLocaleString('vi-VN');

export default function SearchPage({ onNavigate }) {
  const [q, setQ] = useState('');
  const [draft, setDraft] = useState('');
  const [categoryIds, setCategoryIds] = useState([]);
  const [price, setPrice] = useState([0, 1000000]);
  const [custom, setCustom] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState('relevance');
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    productService.categories(controller.signal).then(setCategories).catch(() => {}).finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const search = useCallback(async (signal) => {
    setLoading(true);
    try {
      const response = await productService.search({
        q: q || undefined, categoryIds, minPrice: price[0] || undefined, maxPrice: price[1] || undefined,
        supportsCustomPackaging: custom || undefined, inStockOnly, sort, page, pageSize: 24,
      }, signal);
      setData(response);
    } catch (error) {
      if (error.name !== 'CanceledError') setData({ items: [], totalCount: 0, facets: {} });
    } finally { setLoading(false); }
  }, [categoryIds, custom, inStockOnly, page, price, q, sort]);

  useEffect(() => { const controller = new AbortController(); search(controller.signal); return () => controller.abort(); }, [search]);
  const submit = () => { setPage(1); setQ(draft.trim()); };
  const facetCategories = data?.facets?.categories || categories.map((x) => ({ value: x.id, label: x.name }));
  const ceiling = Math.max(1000000, Number(data?.facets?.maxPrice || 0));

  return <div style={{ minHeight: '100vh', background: '#f8f8fa' }}>
    <CustomerHeader onNavigate={onNavigate} />
    <main style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 20px 56px' }}>
      <Title level={2}>Khám phá catalog B2B</Title>
      <Input.Search value={draft} onChange={(event) => setDraft(event.target.value)} onSearch={submit}
        placeholder="Tìm theo tên sản phẩm hoặc gian hàng" enterButton={<Button icon={<SearchOutlined />}>Tìm kiếm</Button>} size="large" />
      <Row gutter={20} style={{ marginTop: 24 }}>
        <Col xs={24} md={6}><Card title="Bộ lọc" size="small">
          <Text strong>Danh mục</Text><Checkbox.Group value={categoryIds} onChange={(values) => { setPage(1); setCategoryIds(values); }} style={{ display: 'grid', gap: 8, marginTop: 10 }}>
            {facetCategories.map((item) => <Checkbox key={item.value} value={item.value}>{item.label} {item.count ? `(${item.count})` : ''}</Checkbox>)}
          </Checkbox.Group>
          <div style={{ marginTop: 20 }}><Text strong>Khoảng giá</Text><Slider range min={0} max={ceiling} step={10000} value={price} onChange={(value) => { setPage(1); setPrice(value); }} />
            <Text type="secondary">{format(price[0])} – {format(price[1])} đ</Text></div>
          <Space direction="vertical" style={{ marginTop: 20 }}><Checkbox checked={custom} onChange={(event) => { setPage(1); setCustom(event.target.checked); }}>Có bao bì tuỳ chỉnh</Checkbox>
            <Checkbox checked={inStockOnly} onChange={(event) => { setPage(1); setInStockOnly(event.target.checked); }}>Còn hàng</Checkbox></Space>
        </Card></Col>
        <Col xs={24} md={18}><Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }} wrap>
          <Text>{data?.totalCount || 0} sản phẩm phù hợp</Text><Select value={sort} onChange={(value) => { setPage(1); setSort(value); }} style={{ width: 180 }} options={[
            { value: 'relevance', label: 'Liên quan nhất' }, { value: 'priceAsc', label: 'Giá tăng dần' },
            { value: 'priceDesc', label: 'Giá giảm dần' }, { value: 'reputation', label: 'Uy tín gian hàng' }, { value: 'newest', label: 'Mới nhất' },
          ]} /></Space>
          {loading ? <Spin /> : data?.items?.length ? <Row gutter={[16, 16]}>{data.items.map((item) => <Col xs={24} sm={12} lg={8} key={item.productId}>
            <Card hoverable onClick={() => onNavigate?.(`san-pham/${item.productId}`)} cover={item.primaryImageUrl ? <img alt={item.name} src={item.primaryImageUrl} style={{ height: 180, objectFit: 'cover' }} /> : null}>
              <Tag color={item.effectiveStatus === 'Active' ? 'success' : 'warning'}>{item.effectiveStatus === 'Active' ? 'Còn hàng' : 'Hết hàng'}</Tag>
              <Title level={5} ellipsis={{ rows: 2 }}>{item.name}</Title><Text type="secondary"><ShopOutlined /> {item.shop.name}</Text><br />
              <Text strong style={{ color: '#8c1524', fontSize: 16 }}>{format(item.minPrice)}{item.maxPrice !== item.minPrice ? ` – ${format(item.maxPrice)}` : ''} đ</Text>
              <div style={{ marginTop: 8 }}><Text type="secondary">Tối thiểu {item.minOrderQty} {item.unit}</Text>{item.supportsCustomPackaging && <Tag color="blue" style={{ marginLeft: 6 }}>In logo</Tag>}</div>
              <div style={{ marginTop: 8 }}><SafetyCertificateOutlined style={{ color: '#52c41a' }} /> <Text type="secondary">Gian hàng đã xác minh</Text>
                {item.averageRating && <Text style={{ marginLeft: 8 }}>★ {Number(item.averageRating).toFixed(1)}</Text>}</div>
            </Card></Col>)}</Row> : <Empty description="Chưa tìm thấy sản phẩm phù hợp" />}
          <Pagination current={page} pageSize={24} total={data?.totalCount || 0} showSizeChanger={false} onChange={setPage} style={{ marginTop: 24, textAlign: 'right' }} />
        </Col>
      </Row>
    </main>
  </div>;
}
