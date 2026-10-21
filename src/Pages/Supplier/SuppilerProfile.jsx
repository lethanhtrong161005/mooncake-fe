import { useState } from 'react';
import {
  Card,
  Descriptions,
  Tag,
  Avatar,
  Button,
  Form,
  Input,
  Space,
  Table,
  Row,
  Col,
  Statistic,
  message,
  Typography,
} from 'antd';
import {
  TrophyOutlined,
  CheckCircleOutlined,
  SaveOutlined,
  SafetyCertificateOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';

const { Title, Text } = Typography;

export default function SuppilerProfile({ onNavigate }) {
  const [profileForm] = Form.useForm();

  // Reputation Logs Mock Data
  const reputationLogs = [
    {
      key: '1',
      date: '2025-08-10',
      event: 'Hoàn thành đúng hạn Hợp đồng #HD-2025-08880',
      delta: '+10',
      currentScore: 98,
      type: 'positive',
    },
    {
      key: '2',
      date: '2025-08-05',
      event: 'Đánh giá 5 sao từ khách hàng Tập đoàn Vingroup',
      delta: '+3',
      currentScore: 88,
      type: 'positive',
    },
    {
      key: '3',
      date: '2025-07-28',
      event: 'Gia hạn thêm chứng nhận ISO 22000:2018 thẩm định đạt chuẩn',
      delta: '+15',
      currentScore: 85,
      type: 'positive',
    },
    {
      key: '4',
      date: '2025-07-15',
      event: 'Trễ hạn giao hàng 1 ngày đơn hàng #ORD-2024-99',
      delta: '-5',
      currentScore: 70,
      type: 'negative',
    },
  ];

  const logColumns = [
    { title: 'Ngày Ghi Nhận', dataIndex: 'date', key: 'date', width: 130 },
    { title: 'Sự Kiện Phát Sinh', dataIndex: 'event', key: 'event' },
    {
      title: 'Biến Động Điểm',
      dataIndex: 'delta',
      key: 'delta',
      align: 'center',
      render: (d, r) => (
        <span style={{ fontWeight: 700, color: r.type === 'positive' ? '#2e7d32' : '#cf1322' }}>
          {d}
        </span>
      ),
    },
    {
      title: 'Điểm Sau Thay Đổi',
      dataIndex: 'currentScore',
      key: 'currentScore',
      align: 'center',
      render: (s) => <strong>{s} điểm</strong>,
    },
  ];

  const handleUpdate = () => {
    message.success('Đã cập nhật hồ sơ năng lực xưởng bánh thành công!');
  };

  return (
    <ColonyAdminLayout
      role="Supplier"
      activeKey="nha-cung-cap/ho-so"
      onNavigate={onNavigate}
      title="Hồ Sơ Năng Lực Xưởng Bánh & Nhật Ký Điểm Uy Tín (Reputation Logs)"
      subtitle="Quản lý pháp lý xưởng bánh, chứng chỉ vệ sinh an toàn thực phẩm và lịch sử tích lũy điểm uy tín"
    >
      {/* Overview Stat Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 10 }}>
            <Statistic
              title="Điểm Uy Tín Tổng Hợp"
              value={98}
              suffix="/ 100"
              valueStyle={{ color: '#d48806', fontWeight: 700 }}
              prefix={<TrophyOutlined />}
            />
            <div style={{ marginTop: 8 }}>
              <Tag color="gold" style={{ fontWeight: 700 }}>
                ★ ĐỐI TÁC VÀNG (GOLD PARTNER)
              </Tag>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 10 }}>
            <Statistic
              title="Tổng Hợp Đồng Đã Ký"
              value={48}
              suffix="Hợp đồng"
              valueStyle={{ color: '#1677ff', fontWeight: 700 }}
            />
            <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Tỷ lệ hoàn thành 99%</div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 10 }}>
            <Statistic
              title="Giao Đúng Hạn Mốc"
              value={46}
              suffix="/ 48 HĐ"
              valueStyle={{ color: '#2e7d32', fontWeight: 700 }}
            />
            <div style={{ marginTop: 8, fontSize: 12, color: '#2e7d32' }}>+10đ cho mỗi mốc đúng hạn</div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 10 }}>
            <Statistic
              title="Vi Phạm Hợp Đồng (Breach)"
              value={0}
              valueStyle={{ color: '#2e7d32', fontWeight: 700 }}
            />
            <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Không có vi phạm</div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]}>
        {/* Left Form: Profile Edit */}
        <Col xs={24} lg={12}>
          <Card title="Thông Tin Pháp Lý Xưởng Bánh" bordered={false} style={{ borderRadius: 10 }}>
            <Form
              form={profileForm}
              layout="vertical"
              initialValues={{
                companyName: 'Xưởng Bánh Tràng An Nghệ Nhân Gia Truyền',
                taxCode: '0108928371',
                representative: 'Trần Đức Thắng',
                phone: '0912 345 678',
                email: 'thang.td@tranganbakery.vn',
                capacity: '50.000 hộp/vụ',
              }}
              onFinish={handleUpdate}
            >
              <Form.Item name="companyName" label="Tên Doanh Nghiệp / Cơ Sở" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="taxCode" label="Mã Số Thuế (MST)">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="representative" label="Người Đại Diện Pháp Luật">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="phone" label="Số Điện Thoại">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="email" label="Email Nhận Thông Báo">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" icon={<SaveOutlined />} htmlType="submit" style={{ background: '#8c1524', borderColor: '#8c1524' }}>
                Lưu Thông Tin
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Right Table: Reputation History */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <HistoryOutlined style={{ color: '#d48806' }} />
                <span>Nhật Ký Tích Lũy Điểm Uy Tín (Audit Logs)</span>
              </div>
            }
            bordered={false}
            style={{ borderRadius: 10 }}
          >
            <Table columns={logColumns} dataSource={reputationLogs} pagination={false} size="small" />
          </Card>
        </Col>
      </Row>
    </ColonyAdminLayout>
  );
}
