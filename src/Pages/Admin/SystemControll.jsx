import { useState } from 'react';
import {
  Card,
  Tabs,
  Form,
  Input,
  InputNumber,
  Button,
  Table,
  Tag,
  Switch,
  Space,
  message,
  Typography,
  Alert,
  Row,
  Col,
} from 'antd';
import {
  SettingOutlined,
  SaveOutlined,
  AppstoreOutlined,
  SkinOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import DemoIllustrationNotice from '../../components/DemoIllustrationNotice';

const { Text } = Typography;

export default function SystemControll({ onNavigate }) {
  const [form] = Form.useForm();

  // Categories Mock Data
  const categoriesData = [
    { key: '1', id: 'CAT-01', name: 'Bánh Nướng Truyền Thống', slug: 'banh-nuong-truyen-thong', count: 48, status: true },
    { key: '2', id: 'CAT-02', name: 'Bánh Dẻo Hương Cốm & Sen', slug: 'banh-deo-huong-com-sen', count: 32, status: true },
    { key: '3', id: 'CAT-03', name: 'Bánh Tuyết Hiện Đại (Snow Skin)', slug: 'banh-tuyet-snow-skin', count: 24, status: true },
    { key: '4', id: 'CAT-04', name: 'Hộp Quà Doanh Nghiệp Sơn Mài VIP', slug: 'hop-qua-son-mai-vip', count: 18, status: true },
    { key: '5', id: 'CAT-05', name: 'Bánh Healthy Đường Ăn Kiêng Isomalt', slug: 'banh-healthy-isomalt', count: 15, status: true },
  ];

  // Shop Templates Mock Data
  const shopTemplatesData = [
    { key: '1', id: 'TPL-01', name: 'Hoàng Kim Cung Đình', style: 'Luxury Gold & Crimson', badge: 'VIP Khuyên dùng', status: true },
    { key: '2', id: 'TPL-02', name: 'Tràng An Cổ Điển', style: 'Vintage Hà Nội Phố', badge: 'Truyền Thống', status: true },
    { key: '3', id: 'TPL-03', name: 'Đương Đại Minimalist', style: 'Modern Slate & Amber', badge: 'Hiện Đại', status: true },
    { key: '4', id: 'TPL-04', name: 'Nguyệt Dạ Rằm Tháng Tám', style: 'Deep Midnight Indigo', badge: 'Mùa Vụ', status: true },
    { key: '5', id: 'TPL-05', name: 'Sơn Mài Thượng Phẩm', style: 'Lacquer Artisan Style', badge: 'Nghệ Nhân', status: true },
  ];

  const categoryColumns = [
    { title: 'Mã', dataIndex: 'id', key: 'id', width: 90 },
    { title: 'Tên Danh Mục', dataIndex: 'name', key: 'name', render: (t) => <strong>{t}</strong> },
    { title: 'Đường Dẫn Slug', dataIndex: 'slug', key: 'slug', render: (s) => <span style={{ color: '#888' }}>/{s}</span> },
    { title: 'Số Sản Phẩm', dataIndex: 'count', key: 'count', align: 'right' },
    {
      title: 'Hiển Thị',
      dataIndex: 'status',
      key: 'status',
      render: (st) => <Switch defaultChecked={st} size="small" disabled />,
    },
  ];

  const templateColumns = [
    { title: 'Mã Template', dataIndex: 'id', key: 'id', width: 110 },
    { title: 'Tên Mẫu Giao Diện', dataIndex: 'name', key: 'name', render: (t) => <strong>{t}</strong> },
    { title: 'Phong Cách Màu Sắc', dataIndex: 'style', key: 'style' },
    {
      title: 'Nhãn Phân Loại',
      dataIndex: 'badge',
      key: 'badge',
      render: (b) => <Tag color="gold">{b}</Tag>,
    },
    {
      title: 'Kích Hoạt',
      dataIndex: 'status',
      key: 'status',
      render: (st) => <Switch defaultChecked={st} size="small" disabled />,
    },
  ];

  const handleSaveDepositRules = (values) => {
    message.success('Đã lưu thành công cấu hình quy tắc đặt cọc và chính sách sàn!');
  };

  return (
    <ColonyAdminLayout
      role="Admin"
      activeKey="admin/kiem-soat-he-thong"
      onNavigate={onNavigate}
      title="Kiểm Soát Hệ Thống, Catalog & Quy Tắc Nền Tảng"
      subtitle="Thiết lập tham số ký quỹ M1, quy tắc tính điểm uy tín và quản lý danh mục phân cấp"
    >
      <DemoIllustrationNotice style={{ marginBottom: 16 }} description="Quy tắc, danh mục và mẫu giao diện trên trang này là dữ liệu minh họa; không thể lưu hoặc thay đổi." />
      <Card bordered={false} style={{ borderRadius: 10 }}>
        <Tabs
          defaultActiveKey="deposit-rules"
          items={[
            {
              key: 'deposit-rules',
              label: '💰 Quy Tắc Đặt Cọc Hợp Đồng (Deposit M1 Rules)',
              children: (
                <div style={{ maxWidth: 800, padding: '10px 0' }}>
                  <Alert
                    message="Bảo vệ dòng tiền qua cơ chế Đặt cọc bắt buộc (Module 6 - Feature #15, #16)"
                    description="Sau khi ký hợp đồng điện tử, bên Mua phải đặt cọc đúng tỷ lệ phần trăm được cấu hình dưới đây vào tài khoản ký quỹ Escrow của sàn thì hợp đồng mới chuyển sang Active."
                    type="info"
                    showIcon
                    style={{ marginBottom: 24 }}
                  />

                  <Form
                    form={form}
                    layout="vertical"
                    disabled
                    initialValues={{
                      defaultDepositPercent: 30,
                      largeOrderDepositPercent: 40,
                      thresholdAmount: 1000000000,
                      autoActiveOnDeposit: true,
                      escrowFeePercent: 1.5,
                    }}
                    onFinish={handleSaveDepositRules}
                  >
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="defaultDepositPercent"
                          label="Tỷ Lệ Đặt Cọc M1 Mặc Định (%)"
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={10} max={80} addonAfter="%" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="largeOrderDepositPercent"
                          label="Tỷ Lệ Cọc Đơn Hàng Lớn VVIP (%)"
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={20} max={90} addonAfter="%" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="thresholdAmount"
                          label="Ngưỡng Giá Trị Đơn Hàng Lớn (VNĐ)"
                          rules={[{ required: true }]}
                        >
                          <InputNumber
                            min={100000000}
                            step={100000000}
                            formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(v) => v.replace(/\$\s?|(,*)/g, '')}
                            addonAfter="₫"
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="escrowFeePercent"
                          label="Phí Dịch Vụ Bảo Chứng Sàn B2B (%)"
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={0.5} max={5} step={0.1} addonAfter="%" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item
                      name="autoActiveOnDeposit"
                      label="Tự Động Kích Hoạt Hợp Đồng Khi Escrow Nhận Tiền"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>

                    <Button
                      disabled
                      type="primary"
                      icon={<SaveOutlined />}
                      htmlType="submit"
                      style={{ background: '#8c1524', borderColor: '#8c1524' }}
                    >
                      Lưu Quy Tắc Đặt Cọc
                    </Button>
                  </Form>
                </div>
              ),
            },
            {
              key: 'reputation-rules',
              label: '⭐ Quy Tắc Tính Điểm Uy Tín (Reputation Engine)',
              children: (
                <div style={{ maxWidth: 800 }}>
                  <Alert
                    message="Bảng điểm sự kiện uy tín tự động (Module 8 - Feature #22)"
                    description="Mọi biến động điểm được ghi nhận chính xác vào bảng reputation_logs kèm mã đối chiếu hợp đồng hoặc đánh giá."
                    type="success"
                    showIcon
                    style={{ marginBottom: 20 }}
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Card size="small" title="Cộng Điểm Thành Tích (+)">
                      <ul style={{ paddingLeft: 20, margin: 0, lineHeight: 2 }}>
                        <li>Hoàn thành đúng hạn milestone: <strong style={{ color: '#2e7d32' }}>+10 điểm</strong></li>
                        <li>Đánh giá chất lượng 5 sao (★): <strong style={{ color: '#2e7d32' }}>+3 điểm</strong></li>
                        <li>Đánh giá chất lượng 4 sao (★): <strong style={{ color: '#2e7d32' }}>+1 điểm</strong></li>
                        <li>Đạt chuẩn chứng nhận ISO 22000 mới: <strong style={{ color: '#2e7d32' }}>+15 điểm</strong></li>
                      </ul>
                    </Card>

                    <Card size="small" title="Trừ Điểm Vi Phạm (-)">
                      <ul style={{ paddingLeft: 20, margin: 0, lineHeight: 2 }}>
                        <li>Hoàn thành trễ hạn (late): <strong style={{ color: '#cf1322' }}>-5 điểm</strong></li>
                        <li>Vi phạm hợp đồng (breach): <strong style={{ color: '#cf1322' }}>-20 điểm</strong></li>
                        <li>Đánh giá chất lượng 1-2 sao: <strong style={{ color: '#cf1322' }}>-2 điểm</strong></li>
                        <li>Bị khách hàng khiếu nại PoD: <strong style={{ color: '#cf1322' }}>-10 điểm</strong></li>
                      </ul>
                    </Card>
                  </div>
                </div>
              ),
            },
            {
              key: 'categories',
              label: '🥮 Danh Mục Bánh Phân Cấp',
              children: (
                <div>
                  <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button disabled type="primary" icon={<PlusOutlined />} style={{ background: '#8c1524', borderColor: '#8c1524' }}>
                      Thêm Danh Mục Mới
                    </Button>
                  </div>
                  <Table columns={categoryColumns} dataSource={categoriesData} pagination={false} />
                </div>
              ),
            },
            {
              key: 'templates',
              label: '🎨 Kho Template Giao Diện Gian Hàng (≥5 Mẫu)',
              children: (
                <div>
                  <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button disabled type="primary" icon={<PlusOutlined />} style={{ background: '#8c1524', borderColor: '#8c1524' }}>
                      Thêm Mẫu Template Mới
                    </Button>
                  </div>
                  <Table columns={templateColumns} dataSource={shopTemplatesData} pagination={false} />
                </div>
              ),
            },
          ]}
        />
      </Card>
    </ColonyAdminLayout>
  );
}
