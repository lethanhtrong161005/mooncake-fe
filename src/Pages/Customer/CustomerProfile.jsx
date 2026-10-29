import { useState } from 'react';
import {
  Card,
  Descriptions,
  Tag,
  Avatar,
  Button,
  Form,
  Input,
  Row,
  Col,
  message,
  Typography,
  Divider,
} from 'antd';
import {
  UserOutlined,
  SaveOutlined,
  BankOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import DemoIllustrationNotice from '../../components/DemoIllustrationNotice';

const { Title, Text } = Typography;

export default function CustomerProfile({ onNavigate }) {
  const [form] = Form.useForm();

  const handleSave = () => {
    message.success('Đã lưu thông tin hồ sơ doanh nghiệp khách hàng thành công!');
  };

  return (
    <div style={{ background: '#f5f5f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CustomerHeader activeKey="ho-so-khach-hang" onNavigate={onNavigate} />

      <main style={{ maxWidth: 1440, margin: '24px auto', padding: '0 20px', flex: 1, width: '100%' }}>
        <DemoIllustrationNotice style={{ marginBottom: 16 }} description="Hồ sơ doanh nghiệp bên dưới là dữ liệu minh họa; database chưa có API hồ sơ Customer và biểu mẫu đang ở chế độ chỉ xem." />
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
            Hồ Sơ Doanh Nghiệp Khách Hàng (B2B Buyer Profile)
          </h1>
          <p style={{ margin: '4px 0 0', color: '#666', fontSize: 13 }}>
            Quản lý thông tin pháp nhân xuất hóa đơn VAT, người đại diện mua hàng và lịch sử giao dịch
          </p>
        </div>

        <Row gutter={[20, 20]}>
          <Col xs={24} lg={8}>
            <Card bordered={false} style={{ borderRadius: 10, textAlign: 'center' }}>
              <Avatar size={80} icon={<BankOutlined />} style={{ backgroundColor: '#8c1524', marginBottom: 16 }} />
              <Title level={4} style={{ margin: 0 }}>Tập Đoàn Vingroup</Title>
              <Text type="secondary">Khách Hàng Doanh Nghiệp Thân Thiết</Text>
              <div style={{ marginTop: 12 }}>
                <Tag color="gold" icon={<SafetyCertificateOutlined />}>
                  TÀI KHOẢN ĐÃ XÁC THỰC MST
                </Tag>
              </div>

              <Divider style={{ margin: '16px 0' }} />

              <div style={{ textAlign: 'left', fontSize: 13, lineHeight: 2 }}>
                <div><strong>Mã Số Thuế:</strong> 0101245486</div>
                <div><strong>Đại diện thu mua:</strong> Bà Nguyễn Bích Ngọc</div>
                <div><strong>Số điện thoại:</strong> 0912 988 776</div>
                <div><strong>Tổng chi tiêu mùa vụ:</strong> 1.56 Tỷ VNĐ</div>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={16}>
            <Card title="Cập Nhật Thông Tin Xuất Hóa Đơn VAT & Thanh Toán" bordered={false} style={{ borderRadius: 10 }}>
              <Form
                form={form}
                layout="vertical"
                disabled
                initialValues={{
                  companyName: 'Tập Đoàn Vingroup - Công Ty Cổ Phần',
                  taxCode: '0101245486',
                  billingAddress: 'Số 7, Đường Bằng Lăng 1, KĐT Sinh Thái Vinhomes Riverside, Long Biên, Hà Nội',
                  contactPerson: 'Nguyễn Bích Ngọc',
                  phone: '0912988776',
                  email: 'ngoc.nb@vingroup.net',
                  bankAccount: '19028889999018 - Techcombank Hội Sở',
                }}
                onFinish={handleSave}
              >
                <Form.Item name="companyName" label="Tên Pháp Nhân Công Ty" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="taxCode" label="Mã Số Thuế (MST)">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="contactPerson" label="Người Đại Diện Ký HĐ & Nhận Hàng">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="billingAddress" label="Địa Chỉ Xuất Hóa Đơn Điện Tử VAT">
                  <Input />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="phone" label="Số Điện Thoại">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="email" label="Email Nhận Hóa Đơn & Báo Giá">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="bankAccount" label="Tài Khoản Ngân Hàng Thanh Toán">
                  <Input />
                </Form.Item>

                <Button
                  disabled
                  type="primary"
                  icon={<SaveOutlined />}
                  htmlType="submit"
                  style={{ background: '#8c1524', borderColor: '#8c1524' }}
                >
                  Lưu Thông Tin Doanh Nghiệp
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </main>
    </div>
  );
}
