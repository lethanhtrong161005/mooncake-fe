import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert, Button, Card, Col, Descriptions, Form, Input, InputNumber, List, Modal,
  Radio, Result, Row, Space, Spin, Switch, Tabs, Tag, Typography, message,
} from 'antd';
import { CheckCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import useBulkOrderQuote from '../../hooks/useBulkOrderQuote';
import customPackagingService from '../../services/customPackagingService';
import orderService from '../../services/orderService';
import productService from '../../services/productService';
import PaymentCheckoutModal from '../../components/payment/PaymentCheckoutModal';
import VietQrModal from '../../components/payment/VietQrModal';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const money = (value) => `${Number(value || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) => error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.';
const orderDraft = JSON.parse(sessionStorage.getItem('b2b_order_draft') || 'null');

export default function OrderAndDesgin({ onNavigate }) {
  const [form] = Form.useForm();
  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(Boolean(orderDraft?.productId));
  const [packagingEnabled, setPackagingEnabled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [reviewingOrder, setReviewingOrder] = useState(null);
  const [packaging, setPackaging] = useState(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [payingOrder, setPayingOrder] = useState(null);
  const [vietQrData, setVietQrData] = useState(null);
  const idempotencyKey = useRef(crypto.randomUUID());
  const variantId = Form.useWatch('variantId', form);
  const quantity = Form.useWatch('quantity', form);

  useEffect(() => {
    if (!orderDraft?.productId) return;
    productService.detail(orderDraft.productId).then((result) => {
      setProduct(result);
      form.setFieldsValue({
        variantId: orderDraft.variantId || result.variants?.[0]?.id,
        quantity: orderDraft.quantity || result.minOrderQty,
      });
      setPackagingEnabled(Boolean(result.supportsCustomPackaging));
    }).catch((error) => message.error(errorMessage(error))).finally(() => setLoadingProduct(false));
  }, [form]);

  const selectedVariant = useMemo(
    () => product?.variants?.find((variant) => variant.id === variantId),
    [product, variantId],
  );
  const { quote, loading: quoteLoading, error: quoteError } = useBulkOrderQuote(
    product?.shop?.id, product?.id, variantId, quantity,
  );

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      setOrders(await orderService.listMine());
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setLoadingOrders(false);
    }
  };

  const submitOrder = async (values) => {
    setSubmitting(true);
    try {
      const order = await orderService.create({
        shopId: product.shop.id,
        items: [{ productId: product.id, variantId: values.variantId, quantity: values.quantity }],
        deliveryAddress: values.deliveryAddress,
        recipientName: values.recipientName,
        recipientPhone: values.recipientPhone,
        deliveryDateExpected: values.deliveryDateExpected || null,
        notes: values.notes || null,
      }, idempotencyKey.current);
      if (packagingEnabled) {
        try {
          await customPackagingService.create(order.id, {
            companyName: values.companyName,
            companyLogoUrl: values.companyLogoUrl,
            packagingType: values.packagingType,
            colorScheme: JSON.stringify({ primary: values.primaryColor, secondary: values.secondaryColor }),
            specialMessage: values.specialMessage || null,
            notes: values.packagingNotes || null,
          });
        } catch (error) {
          message.warning(`Đơn ${order.orderNumber} đã tạo, nhưng yêu cầu bao bì chưa lưu: ${errorMessage(error)}`);
          idempotencyKey.current = crypto.randomUUID();
          return;
        }
      }
      message.success(`Đã tạo đơn ${order.orderNumber}. Nhà cung cấp sẽ sớm phản hồi.`);
      idempotencyKey.current = crypto.randomUUID();
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const openPackaging = async (order) => {
    setReviewingOrder(order);
    setPackaging(null);
    setReviewLoading(true);
    try {
      setPackaging(await customPackagingService.get(order.id));
    } catch (error) {
      message.info(error?.response?.status === 404 ? 'Đơn hàng không có yêu cầu bao bì riêng.' : errorMessage(error));
      setReviewingOrder(null);
    } finally {
      setReviewLoading(false);
    }
  };

  const reviewRevision = async (action) => {
    const revision = packaging?.revisions?.find((item) => item.status === 'DesignReview');
    if (!revision) return;
    if (action === 'RequestRevision' && reviewNotes.trim().length < 10) {
      message.warning('Vui lòng mô tả nội dung cần chỉnh sửa ít nhất 10 ký tự.');
      return;
    }
    setReviewLoading(true);
    try {
      await customPackagingService.reviewRevision(reviewingOrder.id, revision.id, {
        action,
        notes: reviewNotes.trim() || null,
      });
      message.success(action === 'Approve' ? 'Đã duyệt mockup bao bì.' : 'Đã gửi yêu cầu chỉnh sửa.');
      setPackaging(await customPackagingService.get(reviewingOrder.id));
      setReviewNotes('');
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setReviewLoading(false);
    }
  };

  const createTab = loadingProduct ? <Spin /> : !product ? (
    <Result status="info" title="Chưa có sản phẩm để đặt"
      subTitle="Hãy chọn sản phẩm và biến thể trước khi tạo đơn B2B."
      extra={<Button type="primary" onClick={() => onNavigate?.('tim-kiem')}>Khám phá sản phẩm</Button>} />
  ) : (
    <Form form={form} layout="vertical" onFinish={submitOrder} initialValues={{
      packagingType: 'Hộp quà doanh nghiệp', primaryColor: '#8c1524', secondaryColor: '#d4af37',
    }}>
      <Row gutter={[20, 20]}>
        <Col xs={24} lg={15}>
          <Card title="Sản phẩm và số lượng" style={{ marginBottom: 20 }}>
            <Title level={4} style={{ marginTop: 0 }}>{product.name}</Title>
            <Paragraph type="secondary">{product.shop?.name} · Đơn tối thiểu {product.minOrderQty} {product.unit}</Paragraph>
            <Form.Item name="variantId" label="Biến thể" rules={[{ required: true, message: 'Chọn một biến thể.' }]}>
              <Radio.Group style={{ width: '100%' }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  {product.variants?.map((variant) => (
                    <Radio key={variant.id} value={variant.id} disabled={!variant.isAvailable}>
                      <Space><Text strong>{variant.name}</Text><Tag>{variant.sku}</Tag><Text>{money(variant.price)}</Text></Space>
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="quantity" label="Số lượng" rules={[{ required: true }]}>
              <InputNumber min={product.minOrderQty} max={product.maxOrderQty || 1000000} style={{ width: '100%' }} />
            </Form.Item>
          </Card>

          <Card title="Thông tin giao hàng" style={{ marginBottom: 20 }}>
            <Row gutter={16}>
              <Col xs={24} md={12}><Form.Item name="recipientName" label="Người nhận" rules={[{ required: true, message: 'Nhập tên người nhận.' }]}><Input /></Form.Item></Col>
              <Col xs={24} md={12}><Form.Item name="recipientPhone" label="Số điện thoại" rules={[{ required: true, message: 'Nhập số điện thoại.' }]}><Input /></Form.Item></Col>
            </Row>
            <Form.Item name="deliveryAddress" label="Địa chỉ giao hàng" rules={[{ required: true, message: 'Nhập địa chỉ giao hàng.' }]}><Input /></Form.Item>
            <Form.Item name="deliveryDateExpected" label="Ngày giao dự kiến"><Input type="date" /></Form.Item>
            <Form.Item name="notes" label="Ghi chú đơn hàng"><TextArea rows={3} maxLength={2000} showCount /></Form.Item>
          </Card>

          <Card title={<Space>Thiết kế bao bì riêng <Switch checked={packagingEnabled} onChange={setPackagingEnabled} disabled={!product.supportsCustomPackaging} /></Space>}>
            {!product.supportsCustomPackaging && <Alert type="info" showIcon message="Sản phẩm này chưa hỗ trợ bao bì tùy chỉnh." />}
            {packagingEnabled && <>
              <Row gutter={16}>
                <Col xs={24} md={12}><Form.Item name="companyName" label="Tên doanh nghiệp" rules={[{ required: true, min: 2 }]}><Input /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item name="packagingType" label="Quy cách hộp" rules={[{ required: true }]}><Input /></Form.Item></Col>
              </Row>
              <Form.Item name="companyLogoUrl" label="URL logo HTTPS" rules={[{ required: true }, { type: 'url' }]}><Input placeholder="https://..." /></Form.Item>
              <Row gutter={16}>
                <Col span={12}><Form.Item name="primaryColor" label="Màu chủ đạo"><Input type="color" /></Form.Item></Col>
                <Col span={12}><Form.Item name="secondaryColor" label="Màu bổ trợ"><Input type="color" /></Form.Item></Col>
              </Row>
              <Form.Item name="specialMessage" label="Thông điệp in trên hộp"><Input maxLength={500} showCount /></Form.Item>
              <Form.Item name="packagingNotes" label="Yêu cầu thiết kế"><TextArea rows={3} maxLength={2000} showCount /></Form.Item>
            </>}
          </Card>
        </Col>

        <Col xs={24} lg={9}>
          <Card title="Báo giá tức thời" style={{ position: 'sticky', top: 20 }} loading={quoteLoading}>
            {quoteError && <Alert type="error" showIcon message={quoteError} style={{ marginBottom: 16 }} />}
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Biến thể">{selectedVariant?.name || '—'}</Descriptions.Item>
              <Descriptions.Item label="Đơn giá">{money(quote?.lineBreakdown?.[0]?.originalUnitPrice)}</Descriptions.Item>
              <Descriptions.Item label="Tạm tính">{money(quote?.subtotal)}</Descriptions.Item>
              <Descriptions.Item label="Chiết khấu"><Text type="success">-{money(quote?.totalDiscount)}</Text></Descriptions.Item>
              <Descriptions.Item label="Bậc giá">{quote?.lineBreakdown?.[0]?.appliedPromotion?.name || 'Chưa áp dụng'}</Descriptions.Item>
            </Descriptions>
            <div style={{ margin: '22px 0', textAlign: 'right' }}>
              <Text type="secondary">Tổng dự kiến</Text>
              <Title level={2} style={{ color: '#8c1524', margin: 0 }}>{money(quote?.finalTotal)}</Title>
              {packagingEnabled && <Text type="secondary">Phí thiết kế được cộng sau khi duyệt mockup.</Text>}
            </div>
            <Button type="primary" size="large" block icon={<ShoppingCartOutlined />}
              loading={submitting} disabled={!quote} htmlType="submit">Gửi đơn đặt hàng</Button>
          </Card>
        </Col>
      </Row>
    </Form>
  );

  const ordersTab = (
    <Card extra={<Button onClick={loadOrders}>Tải lại</Button>}>
      <List loading={loadingOrders} dataSource={orders} locale={{ emptyText: 'Bạn chưa có đơn hàng.' }}
        renderItem={(order) => <List.Item actions={[
          order.status === 'Confirmed' ? (
            <Button
              key="pay"
              type="primary"
              className="bg-amber-600 hover:bg-amber-500 font-semibold"
              onClick={() => setPayingOrder(order)}
            >
              Thanh toán ngay
            </Button>
          ) : null,
          order.customPackaging
            ? <Button key="packaging" type="link" onClick={() => openPackaging(order)}>Xem bao bì</Button>
            : null,
          order.status === 'Shipped' ? <Button key="received" type="primary" onClick={async () => {
            try {
              await orderService.confirmDelivery(order.id);
              message.success('Đã xác nhận nhận hàng.');
              loadOrders();
            } catch (error) { message.error(errorMessage(error)); }
          }}>Đã nhận hàng</Button> : null,
        ].filter(Boolean)}>
          <List.Item.Meta title={<Space><Text strong>{order.orderNumber}</Text><Tag color="blue">{order.status}</Tag></Space>}
            description={`${order.items?.[0]?.productName || 'Đơn hàng'} · ${order.items?.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm`} />
          <Text strong>{money(order.totalAmount)}</Text>
        </List.Item>} />
    </Card>
  );

  return <div style={{ minHeight: '100vh', background: '#f5f5f7' }}>
    <CustomerHeader activeKey="dat-hang-thiet-ke" onNavigate={onNavigate} />
    <main style={{ maxWidth: 1320, margin: '0 auto', padding: '28px 20px 64px' }}>
      <Title level={2}>Đặt hàng doanh nghiệp</Title>
      <Paragraph type="secondary">Giá được tính từ hệ thống. Mockup phải được khách hàng duyệt trước khi sản xuất.</Paragraph>
      <Tabs items={[
        { key: 'create', label: 'Tạo đơn hàng', children: createTab },
        { key: 'mine', label: 'Đơn của tôi', children: ordersTab },
      ]} onChange={(key) => { if (key === 'mine') loadOrders(); }} />
    </main>

    <Modal title={`Duyệt bao bì · ${reviewingOrder?.orderNumber || ''}`} open={Boolean(reviewingOrder)}
      onCancel={() => setReviewingOrder(null)} footer={null} width={760}>
      <Spin spinning={reviewLoading}>
        {packaging && <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Descriptions bordered column={2} size="small">
            <Descriptions.Item label="Doanh nghiệp">{packaging.companyName}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái"><Tag color="blue">{packaging.status}</Tag></Descriptions.Item>
            <Descriptions.Item label="Quy cách">{packaging.packagingType}</Descriptions.Item>
            <Descriptions.Item label="Thông điệp">{packaging.specialMessage || '—'}</Descriptions.Item>
          </Descriptions>
          {packaging.revisions?.map((revision) => <Card key={revision.id} size="small"
            title={`Mockup phiên bản ${revision.revisionNumber}`} extra={<Tag>{revision.status}</Tag>}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <a href={revision.mockupUrl} target="_blank" rel="noreferrer">Mở file mockup</a>
              <Text>Phí thiết kế: {money(revision.designFee)}</Text>
              {revision.supplierNotes && <Text type="secondary">Ghi chú xưởng: {revision.supplierNotes}</Text>}
              {revision.status === 'DesignReview' && <>
                <TextArea value={reviewNotes} onChange={(event) => setReviewNotes(event.target.value)}
                  placeholder="Nội dung cần chỉnh sửa (bắt buộc nếu yêu cầu sửa)" rows={3} />
                <Space>
                  <Button type="primary" icon={<CheckCircleOutlined />} onClick={() => reviewRevision('Approve')}>Duyệt mockup</Button>
                  <Button onClick={() => reviewRevision('RequestRevision')}>Yêu cầu chỉnh sửa</Button>
                </Space>
              </>}
            </Space>
          </Card>)}
        </Space>}
      </Spin>
    </Modal>

    <PaymentCheckoutModal
      open={Boolean(payingOrder)}
      onClose={() => setPayingOrder(null)}
      order={payingOrder}
      onSuccess={() => {
        setPayingOrder(null);
        loadOrders();
      }}
      onOpenVietQr={(data) => {
        setVietQrData(data);
      }}
    />

    <VietQrModal
      open={Boolean(vietQrData)}
      onClose={() => setVietQrData(null)}
      transferData={vietQrData}
      onUploadSuccess={() => {
        setVietQrData(null);
        loadOrders();
      }}
    />
  </div>;
}
