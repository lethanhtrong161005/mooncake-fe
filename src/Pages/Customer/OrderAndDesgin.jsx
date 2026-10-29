import { useEffect, useState } from 'react';
import { Alert, Button, Card, Form, Input, InputNumber, Select, Space, Spin, Table, Typography, message } from 'antd';
import CustomerHeader from '../../components/layout/CustomerHeader';
import { productService } from '../../services/productService';
import { orderService } from '../../services/orderService';
import { DEMO_ORDERS } from '../../constants/demoMarketplaceData';
import DemoIllustrationNotice from '../../components/DemoIllustrationNotice';

const { Title, Text } = Typography;

export default function OrderAndDesgin({ onNavigate }) {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [catalog, orderRows] = await Promise.all([
        productService.search({ page: 1, pageSize: 50, sort: 'newest', inStockOnly: true }),
        orderService.listMine(),
      ]);
      setProducts(catalog.items ?? []);
      const liveOrders = orderRows.items ?? orderRows ?? [];
      setOrders(liveOrders.length ? liveOrders : DEMO_ORDERS);
    } catch (error) {
      message.error(error.message || 'Không thể tải sản phẩm và đơn hàng.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async (values) => {
    if (!selectedProduct) return message.error('Vui lòng chọn sản phẩm.');
    setSaving(true);
    try {
      await orderService.create({
        shopId: selectedProduct.shop.shopId,
        items: [{ productId: selectedProduct.productId, variantId: values.variantId, quantity: values.quantity }],
        deliveryAddress: values.deliveryAddress,
        recipientName: values.recipientName,
        recipientPhone: values.recipientPhone,
        notes: values.notes || null,
        deliveryDateExpected: values.deliveryDateExpected || null,
      });
      message.success('Đã gửi đơn hàng tới nhà cung cấp.');
      form.resetFields();
      setSelectedProduct(null);
      await load();
    } catch (error) {
      message.error(error.message || 'Không thể tạo đơn hàng.');
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { title: 'Mã đơn', dataIndex: 'orderNumber', key: 'orderNumber' },
    { title: 'Sản phẩm', dataIndex: 'items', key: 'items', render: (items) => items?.map((item) => item.productName).join(', ') || '—' },
    { title: 'Tổng tiền', dataIndex: 'totalAmount', key: 'totalAmount', render: (amount) => amount?.toLocaleString('vi-VN') + ' ₫' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    { title: 'Ngày giao dự kiến', dataIndex: 'deliveryDateExpected', key: 'deliveryDateExpected', render: (value) => value || '—' },
  ];

  return <div style={{ minHeight: '100vh', background: '#faf8f6' }}>
    <CustomerHeader activeKey="dat-hang-thiet-ke" onNavigate={onNavigate} />
    <main style={{ maxWidth: 1200, margin: '24px auto', padding: '0 20px' }}>
      <Title level={2}>Đặt hàng số lượng lớn</Title>
      <Alert showIcon type="info" message="Chọn biến thể cụ thể và số lượng theo mức đặt tối thiểu của sản phẩm. Yêu cầu đóng gói tùy chỉnh chưa được kết nối." style={{ marginBottom: 16 }} />
      {loading ? <Spin /> : <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {products.length > 0 ? <Card title="Tạo đơn hàng">
          <Form form={form} layout="vertical" onFinish={submit} initialValues={{ quantity: 1 }}>
            <Form.Item label="Sản phẩm" name="productId" rules={[{ required: true }]}>
              <Select showSearch optionFilterProp="label" options={products.map((product) => ({ value: product.productId, label: product.name }))}
                onChange={async (id) => { form.setFieldValue('variantId', undefined); try { setSelectedProduct(await productService.detail(id)); } catch (error) { setSelectedProduct(null); message.error(error.message || 'Không thể tải biến thể.'); } }} />
            </Form.Item>
            {selectedProduct && <Text type="secondary">Đặt tối thiểu {selectedProduct.minOrderQty} {selectedProduct.unit || 'đơn vị'} · giá cơ bản {selectedProduct.basePrice?.toLocaleString('vi-VN')} ₫</Text>}
            <Form.Item label="Biến thể" name="variantId" rules={[{ required: true }]}>
              <Select disabled={!selectedProduct} options={(selectedProduct?.variants ?? []).map((variant) => ({ value: variant.id, label: `${variant.name} · ${variant.sku} · tồn ${variant.stockQty}` }))} />
            </Form.Item>
            <Form.Item label="Số lượng" name="quantity" rules={[{ required: true }]}><InputNumber min={selectedProduct?.minOrderQty || 1} max={selectedProduct?.maxOrderQty || 1000000} style={{ width: '100%' }} /></Form.Item>
            <Form.Item label="Tên người nhận" name="recipientName" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="Số điện thoại" name="recipientPhone" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="Địa chỉ giao hàng" name="deliveryAddress" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="Ngày cần giao (YYYY-MM-DD)" name="deliveryDateExpected"><Input placeholder="2026-11-15" /></Form.Item>
            <Form.Item label="Ghi chú" name="notes"><Input.TextArea rows={3} /></Form.Item>
            <Button type="primary" htmlType="submit" loading={saving} disabled={!products.length}>Gửi đơn hàng</Button>
          </Form>
        </Card> : <Card><DemoIllustrationNotice description="Database chưa có sản phẩm để đặt. Bên dưới là ví dụ giao diện đơn hàng; bản ghi mẫu không thể đặt, sửa hoặc xác nhận." />
          <Card type="inner" title="Ví dụ sản phẩm" style={{ marginTop: 16 }}><Space direction="vertical"><Text strong>Bánh Nướng Thập Cẩm Bát Bửu · SKU-TC-200</Text><Text type="secondary">110.000 ₫ / hộp · Đặt tối thiểu 50 hộp · Xưởng Tràng An</Text><Button disabled>Chọn sản phẩm mẫu</Button></Space></Card>
        </Card>}
        <Card title="Đơn hàng của tôi" extra={orders.some((order) => order.isDemo) && <Tag color="blue">Minh họa · Chỉ xem</Tag>}>
          {orders.some((order) => order.isDemo) && <DemoIllustrationNotice style={{ marginBottom: 16 }} description="Database chưa có đơn hàng; các dòng này chỉ trình bày giao diện và không thể thao tác." />}
          <Table rowKey="id" columns={columns} dataSource={orders} pagination={{ pageSize: 8 }} />
        </Card>
      </Space>}
    </main>
  </div>;
}
