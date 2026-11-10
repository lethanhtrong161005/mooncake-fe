import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Row,
  Col,
  Rate,
  Form,
  Input,
  Button,
  Upload,
  Table,
  Tag,
  message,
  Typography,
  Alert,
  Select,
  Spin,
  Space,
} from 'antd';
import {
  UploadOutlined,
  CheckCircleOutlined,
  ShoppingOutlined,
  StarOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import ReputationBadge from '../../components/reviews/ReputationBadge';
import reviewService from '../../services/reviewService';
import orderService from '../../services/orderService';
import { useAuth } from '../../hooks/useAuth';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export default function PaymentAndRate({ onNavigate }) {
  const { user } = useAuth();
  const [rateForm] = Form.useForm();
  const [hasSubmittedReview, setHasSubmittedReview] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(() => {
    const hash = window.location.hash || '';
    const qIdx = hash.indexOf('?');
    if (qIdx !== -1) {
      const params = new URLSearchParams(hash.substring(qIdx));
      return params.get('orderId') || null;
    }
    return null;
  });
  const [submitting, setSubmitting] = useState(false);

  // Reviews History
  const [reviews, setReviews] = useState([
    {
      key: '1',
      contractNo: 'HD-2026-08500',
      supplierName: 'Hữu Nghị Luxury Mooncake',
      variant: 'Set Hộp VIP Dạ Nguyệt 6 Bánh',
      qualityRating: 5,
      deliveryRating: 5,
      serviceRating: 4,
      overallRating: 5,
      comment: 'Bánh rất ngon, vị ngọt thanh vừa phải, vỏ hộp sơn mài bóng bẩy sang trọng. Cán bộ nhân viên tập đoàn khen ngợi rất nhiều.',
      supplierResponse: 'Cảm ơn quý tập đoàn đã tin tưởng lựa chọn Hữu Nghị Luxury! Rất vinh hạnh được phục vụ mùa vụ tiếp theo.',
      reviewedAt: '11/08/2026',
    },
  ]);

  // Load completed orders for review
  const loadOrders = useCallback(async () => {
    setLoadingOrders(true);
    try {
      const res = await orderService.listMine({ page: 1, pageSize: 20 });
      const items = res?.items || res?.data || (Array.isArray(res) ? res : []);
      setOrders(items);
      if (!selectedOrderId && items.length > 0) {
        setSelectedOrderId(items[0].id);
      }
    } catch (err) {
      console.warn('Could not load completed orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  }, [selectedOrderId]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || (orders.length > 0 ? orders[0] : null);

  const handleSubmitReview = async (values) => {
    setSubmitting(true);
    try {
      const activeId = selectedOrderId || selectedOrder?.id || 'ord-202610-001';
      const payload = {
        orderId: activeId,
        qualityRating: values.quality || 5,
        deliveryRating: values.delivery || 5,
        serviceRating: values.service || 5,
        overallRating: values.overall || 5,
        comment: values.comment || 'Chất lượng xuất sắc, đóng gói cẩn thận, in logo sắc nét.',
        isAnonymous: false,
      };

      const result = await reviewService.submitTransactionReview(payload);

      const newRev = {
        key: `${Date.now()}`,
        contractNo: selectedOrder?.orderCode || selectedOrder?.contractNumber || `ĐH-${activeId.slice(0, 8)}`,
        supplierName: selectedOrder?.shopName || selectedOrder?.supplierName || 'Xưởng Bánh Nghệ Nhân',
        variant: selectedOrder?.items?.[0]?.productName || 'Bánh Trung Thu Thượng Hạng',
        qualityRating: values.quality || 5,
        deliveryRating: values.delivery || 5,
        serviceRating: values.service || 5,
        overallRating: values.overall || 5,
        comment: values.comment,
        supplierResponse: null,
        reviewedAt: 'Vừa xong',
      };

      setReviews((prev) => [newRev, ...prev]);
      setHasSubmittedReview(true);
      message.success(`Đã gửi đánh giá thành công! Xưởng bánh được cộng ${result?.reputationScoreDelta > 0 ? `+${result.reputationScoreDelta}` : 3} điểm uy tín.`);
    } catch (err) {
      message.error(err.message || 'Không thể gửi đánh giá.');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: 'Hợp Đồng / Đối Tác',
      dataIndex: 'contractNo',
      key: 'contractNo',
      render: (c, r) => (
        <div>
          <span style={{ fontWeight: 600, color: '#1677ff' }}>{c}</span>
          <div style={{ fontWeight: 600 }}>{r.supplierName}</div>
          <Tag color="purple" style={{ marginTop: 2 }}>{r.variant}</Tag>
        </div>
      ),
    },
    {
      title: 'Điểm 4 Tiêu Chí',
      key: 'ratings',
      render: (_, r) => (
        <div style={{ fontSize: 12 }}>
          <div>Chất lượng: <Rate disabled defaultValue={r.qualityRating} style={{ fontSize: 13, color: '#fadb14' }} /></div>
          <div>Đúng hạn: <Rate disabled defaultValue={r.deliveryRating} style={{ fontSize: 13, color: '#fadb14' }} /></div>
          <div>Tổng thể: <strong style={{ color: '#8c1524' }}>{r.overallRating} / 5 ★</strong></div>
        </div>
      ),
    },
    {
      title: 'Nhận Xét Thực Tế (Verified Purchase)',
      dataIndex: 'comment',
      key: 'comment',
      render: (c, r) => (
        <div>
          <p style={{ margin: '0 0 6px', color: '#1f1f1f' }}>"{c}"</p>
          {r.supplierResponse && (
            <div style={{ background: '#fafafa', borderLeft: '3px solid #8c1524', padding: '6px 10px', fontSize: 12 }}>
              <strong>Phản hồi từ Xưởng Bánh:</strong> {r.supplierResponse}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Ngày Đánh Giá',
      dataIndex: 'reviewedAt',
      key: 'reviewedAt',
      width: 120,
    },
  ];

  return (
    <div style={{ background: '#f5f5f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CustomerHeader activeKey="thanh-toan-danh-gia" onNavigate={onNavigate} />

      <main style={{ maxWidth: 1440, margin: '24px auto', padding: '0 20px', flex: 1, width: '100%' }}>
        <div
          style={{
            background: '#ffffff',
            padding: '20px 24px',
            borderRadius: 10,
            marginBottom: 20,
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#1f1f1f' }}>
            Đánh Giá Chất Lượng 4 Tiêu Chí & Lịch Sử Giao Dịch
          </h1>
          <p style={{ margin: '4px 0 0', color: '#666', fontSize: 13 }}>
            Đánh giá trải nghiệm thực tế (Verified Purchase), đóng góp vào điểm uy tín nhà cung cấp và nhận ưu đãi cho mùa vụ sau
          </p>
        </div>

        <Row gutter={[20, 20]}>
          {/* Left: Review Form */}
          <Col xs={24} lg={11}>
            <Card title="Gửi Đánh Giá Cho Đơn Hàng Hoàn Thành" bordered={false} style={{ borderRadius: 10 }}>
              <Alert
                message="Đánh giá xác thực giao dịch (Verified Purchase)"
                description="Hệ thống áp dụng cơ chế đánh giá 4 tiêu chí sao độc lập. Đánh giá 5★ cộng +3đ, đánh giá 1-2★ trừ 2đ vào điểm uy tín của xưởng bánh."
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />

              {orders.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <Text strong style={{ display: 'block', marginBottom: 6 }}>
                    Chọn Đơn Hàng Cần Đánh Giá:
                  </Text>
                  <Select
                    style={{ width: '100%' }}
                    value={selectedOrderId || orders[0].id}
                    onChange={setSelectedOrderId}
                    options={orders.map((o) => ({
                      value: o.id,
                      label: `${o.orderCode || o.orderNumber || o.id.slice(0, 8)} - ${o.shopName || 'Xưởng bánh'} (${Number(o.totalAmount || 0).toLocaleString('vi-VN')} ₫)`,
                    }))}
                  />
                </div>
              )}

              <Form
                form={rateForm}
                layout="vertical"
                initialValues={{
                  quality: 5,
                  delivery: 5,
                  service: 5,
                  overall: 5,
                  comment: 'Bánh nướng đậm vị truyền thống, vỏ bánh vàng óng không bị khô, logo doanh nghiệp dập nổi rất tinh xảo.',
                }}
                onFinish={handleSubmitReview}
              >
                {hasSubmittedReview && (
                  <Alert
                    type="success"
                    showIcon
                    message="Cảm ơn Quý doanh nghiệp đã gửi đánh giá!"
                    description="Nhận xét của bạn đã được ghi nhận vào lịch sử giao dịch và cộng điểm uy tín cho xưởng bánh."
                    style={{ marginBottom: 16 }}
                  />
                )}

                <div style={{ background: '#fff9f9', padding: 14, borderRadius: 8, marginBottom: 16 }}>
                  <Text strong style={{ color: '#8c1524' }}>
                    Đơn hàng: {selectedOrder?.orderCode || selectedOrder?.id || '#HD-2026-08910'}
                  </Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>
                      {selectedOrder?.shopName || selectedOrder?.supplierName || 'Xưởng Bánh Tràng An Nghệ Nhân'}
                    </span>
                    <ReputationBadge score={88.5} />
                  </div>
                  <Tag color="purple" style={{ marginTop: 6 }}>
                    {selectedOrder?.items?.[0]?.productName || 'Bánh Nướng Thập Cẩm Bát Bửu (SKU-TC-200)'}
                  </Tag>
                </div>

                <Form.Item name="quality" label="1. Chất Lượng Bánh & An Toàn Thực Phẩm" rules={[{ required: true }]}>
                  <Rate />
                </Form.Item>

                <Form.Item name="delivery" label="2. Đúng Hạn Giao Hàng & Bảo Quản Vận Chuyển" rules={[{ required: true }]}>
                  <Rate />
                </Form.Item>

                <Form.Item name="service" label="3. Dịch Vụ Hỗ Trợ & Thiết Kế Logo Mockup" rules={[{ required: true }]}>
                  <Rate />
                </Form.Item>

                <Form.Item name="overall" label="4. Mức Độ Hài Lòng Tổng Thể" rules={[{ required: true }]}>
                  <Rate />
                </Form.Item>

                <Form.Item name="comment" label="Nhận Xét Chi Tiết Về Sản Phẩm & Bao Bì" rules={[{ required: true }]}>
                  <TextArea rows={4} maxLength={1000} showCount />
                </Form.Item>

                <Form.Item label="Đính Kèm Ảnh Sản Phẩm Thực Tế Tại Bàn Tiệc (Tùy chọn)">
                  <Upload maxCount={3}>
                    <Button icon={<UploadOutlined />}>Tải Ảnh Chụp Bánh / Vỏ Hộp</Button>
                  </Upload>
                </Form.Item>

                <Button
                  type="primary"
                  block
                  size="large"
                  htmlType="submit"
                  loading={submitting}
                  style={{ background: '#8c1524', borderColor: '#8c1524', fontWeight: 600 }}
                >
                  Gửi Đánh Giá Xác Thực (Verified Review)
                </Button>
              </Form>
            </Card>
          </Col>

          {/* Right: Review History */}
          <Col xs={24} lg={13}>
            <Card title="Lịch Sử Đánh Giá Của Doanh Nghiệp" bordered={false} style={{ borderRadius: 10 }}>
              <Table columns={columns} dataSource={reviews} pagination={false} />
            </Card>
          </Col>
        </Row>
      </main>
    </div>
  );
}
