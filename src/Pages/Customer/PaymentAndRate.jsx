import { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Form, Input, Rate, Select, Spin, Tag, message } from 'antd';
import { CheckCircleOutlined, CreditCardOutlined, StarOutlined } from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import CustomerBreadcrumbBar from '../../components/layout/CustomerBreadcrumbBar';
import CustomerFooter from '../../components/layout/CustomerFooter';
import paymentService from '../../services/paymentService';
import reviewService from '../../services/reviewService';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/journey-pages.css';

const { TextArea } = Input;
const money = (amount) => `${Number(amount || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) => error?.response?.data?.message || error?.message || 'Không thể tải đơn hàng cần đánh giá.';
const paymentStatusLabel = { Pending: 'Chờ thanh toán', Processing: 'Đang xử lý', Completed: 'Thành công', Failed: 'Thất bại', Refunded: 'Đã hoàn tiền' };

export default function PaymentAndRate({ onNavigate }) {
  const { user } = useAuth();
  const isSignedIn = Boolean(user?.id);
  const [form] = Form.useForm();
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(() => {
    const query = window.location.hash.split('?')[1];
    return query ? new URLSearchParams(query).get('orderId') : null;
  });
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [eligibleError, setEligibleError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [lastReview, setLastReview] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(true);

  const loadOrders = useCallback(async () => {
    if (!isSignedIn) {
      setOrders([]);
      setLoadingOrders(false);
      return;
    }
    setLoadingOrders(true);
    setEligibleError('');
    try {
      const result = await reviewService.getEligibleOrdersForReview();
      const items = (Array.isArray(result) ? result : result?.items || []).map((order) => ({
        ...order,
        id: order.orderId || order.id,
        number: order.orderNumber || order.orderCode || order.id,
        supplier: order.supplierName || 'Xưởng cung cấp',
      }));
      setOrders(items);
      setSelectedOrderId((current) => items.some((item) => item.id === current) ? current : items[0]?.id || null);
    } catch (error) {
      setOrders([]);
      setEligibleError(errorMessage(error));
    } finally {
      setLoadingOrders(false);
    }
  }, [isSignedIn]);

  useEffect(() => {
    const timeout = window.setTimeout(loadOrders, 0);
    return () => window.clearTimeout(timeout);
  }, [loadOrders]);

  useEffect(() => {
    if (!isSignedIn) {
      queueMicrotask(() => {
        setPayments([]);
        setLoadingPayments(false);
      });
      return;
    }
    let active = true;
    queueMicrotask(() => { if (active) setLoadingPayments(true); });
    paymentService.listMine()
      .then((result) => { if (active) setPayments(Array.isArray(result) ? result : result?.items || []); })
      .catch(() => { if (active) setPayments([]); })
      .finally(() => { if (active) setLoadingPayments(false); });
    return () => { active = false; };
  }, [isSignedIn]);

  const selectedOrder = orders.find((order) => order.id === selectedOrderId) || null;

  const handleSubmitReview = async (values) => {
    if (!selectedOrder) return;
    setSubmitting(true);
    try {
      await reviewService.submitTransactionReview({
        orderId: selectedOrder.id,
        qualityRating: values.quality,
        deliveryRating: values.delivery,
        serviceRating: values.service,
        overallRating: values.overall,
        comment: values.comment.trim(),
        isAnonymous: false,
      });
      setLastReview({ ...selectedOrder, ...values });
      const remaining = orders.filter((order) => order.id !== selectedOrder.id);
      setOrders(remaining);
      setSelectedOrderId(remaining[0]?.id || null);
      form.resetFields();
      message.success('Đã gửi đánh giá giao dịch.');
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="journey-page journey-page--review">
      <CustomerHeader activeKey="thanh-toan-danh-gia" onNavigate={onNavigate} />
      <CustomerBreadcrumbBar onNavigate={onNavigate} items={[{ label: 'Thanh toán & đánh giá' }]} />
      <main className="journey-page__main">
        <section className="journey-hero journey-hero--review" aria-labelledby="review-title">
          <div>
            <span className="journey-hero__label">Sau khi đơn hàng hoàn tất</span>
            <h1 id="review-title">Đánh giá trải nghiệm, ghi nhận chất lượng.</h1>
            <p>Chia sẻ cảm nhận về sản phẩm, giao hàng và dịch vụ để xưởng tiếp tục cải thiện.</p>
          </div>
          <div className="journey-hero__review-mark" aria-hidden="true"><StarOutlined /><span>Đánh giá từ giao dịch thực tế</span></div>
        </section>

        <div className="journey-review-layout">
          <section className="journey-review-form" aria-labelledby="review-form-title">
            <div className="journey-section__head"><div><h2 id="review-form-title">Gửi đánh giá</h2><p>Chọn đơn đã giao và cho điểm bốn tiêu chí.</p></div></div>
            {lastReview && <Alert type="success" showIcon className="journey-review-success" message={`Đã gửi đánh giá cho ${lastReview.number}.`} description="Cảm ơn bạn đã chia sẻ trải nghiệm thực tế." />}
            {loadingOrders ? <div className="journey-empty"><Spin description="Đang tải đơn hàng…" /></div>
              : eligibleError ? <div className="journey-empty"><strong>Chưa tải được đơn hàng</strong><p>{eligibleError}</p><Button onClick={loadOrders}>Thử lại</Button></div>
                : !isSignedIn ? <div className="journey-empty"><StarOutlined /><strong>Đăng nhập để đánh giá</strong><p>Đánh giá chỉ dành cho đơn hàng đã giao của bạn.</p><Button type="primary" onClick={() => onNavigate?.('dang-nhap')}>Đăng nhập</Button></div>
                  : !orders.length ? <div className="journey-empty"><CheckCircleOutlined /><strong>Chưa có đơn chờ đánh giá</strong><p>Đơn hàng đã giao và chưa đánh giá sẽ xuất hiện tại đây.</p><Button onClick={() => onNavigate?.('don-hang-cua-toi')}>Xem đơn hàng</Button></div>
                    : <>
                      <label className="journey-review-select-label" htmlFor="review-order">Đơn hàng cần đánh giá</label>
                      <Select
                        id="review-order"
                        value={selectedOrderId}
                        onChange={setSelectedOrderId}
                        options={orders.map((order) => ({ value: order.id, label: `${order.number} · ${order.supplier}` }))}
                        className="journey-review-select"
                        size="large"
                      />
                      {selectedOrder && <div className="journey-review-order"><span>{selectedOrder.number}</span><strong>{selectedOrder.supplier}</strong><small>Giá trị đơn: {money(selectedOrder.totalAmount)}</small></div>}
                      <Form form={form} layout="vertical" onFinish={handleSubmitReview} initialValues={{ quality: 5, delivery: 5, service: 5, overall: 5 }}>
                        <div className="journey-review-ratings">
                          <Form.Item name="quality" label="Chất lượng bánh & an toàn thực phẩm" rules={[{ required: true }]}><Rate /></Form.Item>
                          <Form.Item name="delivery" label="Giao hàng & bảo quản" rules={[{ required: true }]}><Rate /></Form.Item>
                          <Form.Item name="service" label="Hỗ trợ & tư vấn" rules={[{ required: true }]}><Rate /></Form.Item>
                          <Form.Item name="overall" label="Mức độ hài lòng chung" rules={[{ required: true }]}><Rate /></Form.Item>
                        </div>
                        <Form.Item name="comment" label="Nhận xét của bạn" rules={[{ required: true, whitespace: true, min: 5, message: 'Vui lòng viết ít nhất 5 ký tự.' }]}>
                          <TextArea rows={4} maxLength={2000} showCount placeholder="Điều gì bạn hài lòng hoặc muốn xưởng cải thiện?" />
                        </Form.Item>
                        <Button type="primary" size="large" htmlType="submit" loading={submitting}>Gửi đánh giá</Button>
                      </Form>
                    </>}
          </section>

          <aside className="journey-review-aside" aria-label="Thông tin thanh toán và đánh giá">
            <div className="journey-review-aside__payment"><CreditCardOutlined aria-hidden="true" /><h2>Thanh toán gần đây</h2><p>Theo dõi các khoản cọc và thanh toán theo hợp đồng.</p>
              {loadingPayments ? <span className="journey-review-payment-empty">Đang tải giao dịch…</span>
                : payments.length ? <ul className="journey-review-payments">{payments.slice(0, 3).map((payment) => <li key={payment.id}>
                  <span>{payment.paymentNumber || 'Giao dịch'}<small>{paymentStatusLabel[payment.status] || payment.status}</small></span>
                  <strong>{money(payment.amount)}</strong>
                </li>)}</ul> : <span className="journey-review-payment-empty">Chưa có giao dịch thanh toán.</span>}
              <Button onClick={() => onNavigate?.('hop-dong-tien-do')}>Xem hợp đồng & thanh toán</Button>
            </div>
            <div className="journey-review-aside__note"><StarOutlined aria-hidden="true" /><strong>Đánh giá từ đơn đã giao</strong><p>Mỗi đơn đủ điều kiện được đánh giá một lần. Hãy chia sẻ trải nghiệm cụ thể để người mua khác tham khảo.</p>{lastReview && <Tag color="success">Đã gửi {lastReview.number}</Tag>}</div>
          </aside>
        </div>
      </main>
      <CustomerFooter onNavigate={onNavigate} />
    </div>
  );
}
