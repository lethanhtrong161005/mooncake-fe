import { useState } from 'react';
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
  Descriptions,
  message,
  Typography,
  Alert,
  Tabs,
} from 'antd';
import {
  StarOutlined,
  UploadOutlined,
  DollarOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function PaymentAndRate({ onNavigate }) {
  const [rateForm] = Form.useForm();
  const [hasSubmittedReview, setHasSubmittedReview] = useState(false);

  // Reviews History
  const [reviews, setReviews] = useState([
    {
      key: '1',
      contractNo: 'HD-2025-08500',
      supplierName: 'Hữu Nghị Luxury Mooncake',
      variant: 'Set Hộp VIP Dạ Nguyệt 6 Bánh',
      qualityRating: 5,
      deliveryRating: 5,
      serviceRating: 4,
      overallRating: 5,
      comment: 'Bánh rất ngon, vị ngọt thanh vừa phải, vỏ hộp sơn mài bóng bẩy sang trọng. Cán bộ nhân viên tập đoàn khen ngợi rất nhiều.',
      supplierResponse: 'Cảm ơn quý tập đoàn đã tin tưởng lựa chọn Hữu Nghị Luxury! Rất vinh hạnh được phục vụ mùa vụ tiếp theo.',
      reviewedAt: '2025-08-11',
    },
  ]);

  const handleSubmitReview = (values) => {
    const newRev = {
      key: `${Date.now()}`,
      contractNo: 'HD-2025-08910',
      supplierName: 'Xưởng Bánh Tràng An Nghệ Nhân',
      variant: 'Bánh Nướng Thập Cẩm Bát Bửu (SKU-TC-200)',
      qualityRating: values.quality || 5,
      deliveryRating: values.delivery || 5,
      serviceRating: values.service || 5,
      overallRating: values.overall || 5,
      comment: values.comment || 'Chất lượng xuất sắc, đóng gói cẩn thận, in logo sắc nét.',
      supplierResponse: null,
      reviewedAt: 'Vừa xong',
    };

    setReviews([newRev, ...reviews]);
    setHasSubmittedReview(true);
    message.success('Đã gửi đánh giá thành công! Xưởng Bánh Tràng An được cộng +3 điểm uy tín nhờ đánh giá 5 sao từ quý khách.');
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
            <Card title="Gửi Đánh Giá Cho Đơn Hàng Hoàn Thành Gần Nhất" bordered={false} style={{ borderRadius: 10 }}>
              <Alert
                message="Đánh giá xác thực giao dịch (Module 8 - Feature #21, #22)"
                description="Hệ thống áp dụng cơ chế đánh giá 4 tiêu chí sao độc lập. Đánh giá 5★ cộng +3đ, đánh giá 1-2★ trừ 2đ vào điểm uy tín của xưởng."
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />

              <Form
                form={rateForm}
                layout="vertical"
                initialValues={{
                  quality: 5,
                  delivery: 5,
                  service: 4,
                  overall: 5,
                  comment: 'Bánh nướng đậm vị truyền thống, vỏ bánh vàng óng không bị khô, logo doanh nghiệp dập nổi rất tinh xảo.',
                }}
                onFinish={handleSubmitReview}
              >
                <div style={{ background: '#fff9f9', padding: 14, borderRadius: 8, marginBottom: 16 }}>
                  <Text strong style={{ color: '#8c1524' }}>Hợp đồng #HD-2025-08910</Text>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Xưởng Bánh Tràng An Nghệ Nhân</div>
                  <Tag color="purple" style={{ marginTop: 4 }}>Bánh Nướng Thập Cẩm Bát Bửu (SKU-TC-200)</Tag>
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
                  <TextArea rows={4} />
                </Form.Item>

                <Form.Item label="Đính Kèm Ảnh Sản Phẩm Thực Tế Tại Bàn Tiệc (Tùy chọn)">
                  <Upload maxCount={3}>
                    <Button icon={<UploadOutlined />}>Tải Ảnh Chụp Món Bánh</Button>
                  </Upload>
                </Form.Item>

                <Button
                  type="primary"
                  block
                  size="large"
                  htmlType="submit"
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
