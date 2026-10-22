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
  Divider,
  message,
  Typography,
} from 'antd';
import {
  UserOutlined,
  SafetyCertificateOutlined,
  KeyOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';

const { Title, Text } = Typography;

export default function AdminProfile({ onNavigate }) {
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const handleUpdateProfile = () => {
    message.success('Đã cập nhật thông tin quản trị viên thành công!');
  };

  const handleChangePassword = () => {
    message.success('Đã đổi mật khẩu quản trị cấp cao thành công!');
    passwordForm.resetFields();
  };

  return (
    <ColonyAdminLayout
      role="Admin"
      activeKey="admin/ho-so"
      onNavigate={onNavigate}
      title="Hồ Sơ Quản Trị Viên Cấp Cao (Super Admin)"
      subtitle="Quản lý thông tin xác thực bảo mật, quyền điều hành hệ thống sàn B2B và nhật ký truy cập"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
        {/* Left Profile Card */}
        <Card bordered={false} style={{ borderRadius: 10, textAlign: 'center' }}>
          <Avatar size={90} icon={<UserOutlined />} style={{ backgroundColor: '#8c1524', marginBottom: 16 }} />
          <Title level={4} style={{ margin: 0 }}>Trần Minh Quân</Title>
          <Text type="secondary">Head of Platform Operations</Text>
          <div style={{ marginTop: 12 }}>
            <Tag color="volcano" icon={<SafetyCertificateOutlined />}>
              SUPER ADMIN • TOÀN QUYỀN
            </Tag>
          </div>

          <Divider style={{ margin: '16px 0' }} />

          <div style={{ textAlign: 'left', fontSize: 13, lineHeight: 2 }}>
            <div><strong>Email:</strong> quan.tm@moonmarket.vn</div>
            <div><strong>Điện thoại:</strong> 090 123 4567</div>
            <div><strong>Thời gian hoạt động:</strong> 2 năm 8 tháng</div>
            <div><strong>Mã 2FA OTP:</strong> <Tag color="success">Đã kích hoạt</Tag></div>
          </div>
        </Card>

        {/* Right Settings */}
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Card title="Cập Nhật Thông Tin Cá Nhân" bordered={false} style={{ borderRadius: 10 }}>
            <Form
              form={profileForm}
              layout="vertical"
              initialValues={{
                fullName: 'Trần Minh Quân',
                email: 'quan.tm@moonmarket.vn',
                phone: '0901234567',
                title: 'Head of Platform Operations',
              }}
              onFinish={handleUpdateProfile}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Form.Item name="fullName" label="Họ và Tên" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="email" label="Email Quản Trị" rules={[{ required: true }]}>
                  <Input disabled />
                </Form.Item>
                <Form.Item name="phone" label="Số Điện Thoại">
                  <Input />
                </Form.Item>
                <Form.Item name="title" label="Chức Danh">
                  <Input />
                </Form.Item>
              </div>
              <Button type="primary" icon={<SaveOutlined />} htmlType="submit" style={{ background: '#8c1524', borderColor: '#8c1524' }}>
                Lưu Thay Đổi
              </Button>
            </Form>
          </Card>

          <Card title="Đổi Mật Khẩu Đăng Nhập" bordered={false} style={{ borderRadius: 10 }}>
            <Form form={passwordForm} layout="vertical" onFinish={handleChangePassword}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Form.Item name="currentPassword" label="Mật Khẩu Hiện Tại" rules={[{ required: true }]}>
                  <Input.Password placeholder="••••••••" />
                </Form.Item>
                <Form.Item name="newPassword" label="Mật Khẩu Mới (Tối thiểu 8 ký tự)" rules={[{ required: true }]}>
                  <Input.Password placeholder="••••••••" />
                </Form.Item>
              </div>
              <Button icon={<KeyOutlined />} htmlType="submit">
                Cập Nhật Mật Khẩu
              </Button>
            </Form>
          </Card>
        </Space>
      </div>
    </ColonyAdminLayout>
  );
}
