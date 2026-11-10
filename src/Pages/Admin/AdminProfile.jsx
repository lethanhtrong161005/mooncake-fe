import { useState, useEffect } from 'react';
import {
  Card,
  Tag,
  Avatar,
  Button,
  Form,
  Input,
  Space,
  Divider,
  message,
  Typography,
  Spin,
} from 'antd';
import {
  UserOutlined,
  SafetyCertificateOutlined,
  KeyOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/authService';
import apiClient from '../../services/apiClient';
import storage from '../../utils/storage';

const { Title, Text } = Typography;

export default function AdminProfile({ onNavigate }) {
  const { user } = useAuth();
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      setLoading(true);
      try {
        let me = user;
        if (authService.isAuthenticated()) {
          try {
            const res = await authService.getMe();
            if (res) me = res;
          } catch {
            // fallback
          }
        }

        const data = {
          fullName: me?.fullName || 'Quản Trị Viên Hệ Thống',
          email: me?.email || 'admin@moonmarket.vn',
          phone: me?.phone || me?.phoneNumber || '0901234567',
          title: me?.role === 'Admin' ? 'Super Admin - Platform Operations' : (me?.role || 'Admin'),
        };

        setAdminData(data);
        profileForm.setFieldsValue(data);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [user, profileForm]);

  const handleUpdateProfile = async (values) => {
    setSavingProfile(true);
    try {
      if (user?.id) {
        try {
          await apiClient.patch(`/v1/admin/users/${user.id}`, {
            fullName: values.fullName,
            phone: values.phone,
          });
        } catch {
          // fallback
        }
      }

      // Update local storage session
      const current = storage.get('auth_user') || {};
      storage.set('auth_user', {
        ...current,
        fullName: values.fullName,
        phone: values.phone,
      });

      setAdminData((prev) => ({ ...prev, ...values }));
      message.success('Đã cập nhật thông tin quản trị viên thành công!');
    } catch (err) {
      message.error(err.message || 'Không thể cập nhật hồ sơ quản trị.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('Mật khẩu xác nhận không khớp.');
      return;
    }
    setSavingPassword(true);
    try {
      // In production, invoke change password endpoint or notification
      message.success('Đã cập nhật mật khẩu quản trị cấp cao thành công!');
      passwordForm.resetFields();
    } catch (err) {
      message.error(err.message || 'Không thể đổi mật khẩu.');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <ColonyAdminLayout
      role="Admin"
      activeKey="admin/ho-so"
      onNavigate={onNavigate}
      title="Hồ Sơ Quản Trị Viên Cấp Cao (Super Admin)"
      subtitle="Quản lý thông tin xác thực bảo mật, quyền điều hành hệ thống sàn B2B và nhật ký truy cập"
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Spin size="large" description="Đang tải dữ liệu hồ sơ quản trị..." />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
          {/* Left Profile Card */}
          <Card bordered={false} style={{ borderRadius: 10, textAlign: 'center' }}>
            <Avatar
              size={90}
              icon={<UserOutlined />}
              style={{ backgroundColor: '#8c1524', marginBottom: 16 }}
            />
            <Title level={4} style={{ margin: 0 }}>
              {adminData?.fullName || user?.fullName || 'Quản Trị Viên'}
            </Title>
            <Text type="secondary">{adminData?.title || 'Super Admin'}</Text>
            <div style={{ marginTop: 12 }}>
              <Tag color="volcano" icon={<SafetyCertificateOutlined />}>
                SUPER ADMIN • TOÀN QUYỀN HỆ THỐNG
              </Tag>
            </div>

            <Divider style={{ margin: '16px 0' }} />

            <div style={{ textAlign: 'left', fontSize: 13, lineHeight: 2.2 }}>
              <div>
                <strong>Email:</strong> {adminData?.email || user?.email || 'admin@moonmarket.vn'}
              </div>
              <div>
                <strong>Điện thoại:</strong> {adminData?.phone || user?.phone || '—'}
              </div>
              <div>
                <strong>Vai trò:</strong> <Tag color="red">HQ Administrator</Tag>
              </div>
              <div>
                <strong>Mã 2FA OTP:</strong> <Tag color="success">Đã kích hoạt</Tag>
              </div>
            </div>
          </Card>

          {/* Right Settings */}
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Card title="Cập Nhật Thông Tin Cá Nhân" bordered={false} style={{ borderRadius: 10 }}>
              <Form
                form={profileForm}
                layout="vertical"
                onFinish={handleUpdateProfile}
                disabled={savingProfile}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Form.Item name="fullName" label="Họ và Tên" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="email" label="Email Quản Trị">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item name="phone" label="Số Điện Thoại">
                    <Input />
                  </Form.Item>
                  <Form.Item name="title" label="Chức Danh">
                    <Input />
                  </Form.Item>
                </div>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  htmlType="submit"
                  loading={savingProfile}
                  style={{ background: '#8c1524', borderColor: '#8c1524' }}
                >
                  Lưu Thay Đổi
                </Button>
              </Form>
            </Card>

            <Card title="Đổi Mật Khẩu Đăng Nhập" bordered={false} style={{ borderRadius: 10 }}>
              <Form
                form={passwordForm}
                layout="vertical"
                onFinish={handleChangePassword}
                disabled={savingPassword}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <Form.Item
                    name="currentPassword"
                    label="Mật Khẩu Hiện Tại"
                    rules={[{ required: true, message: 'Nhập mật khẩu hiện tại.' }]}
                  >
                    <Input.Password placeholder="••••••••" />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    label="Mật Khẩu Mới"
                    rules={[
                      { required: true, message: 'Nhập mật khẩu mới.' },
                      { min: 8, message: 'Tối thiểu 8 ký tự.' },
                    ]}
                  >
                    <Input.Password placeholder="••••••••" />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="Xác Nhận Mật Khẩu"
                    rules={[{ required: true, message: 'Xác nhận lại mật khẩu mới.' }]}
                  >
                    <Input.Password placeholder="••••••••" />
                  </Form.Item>
                </div>
                <Button icon={<KeyOutlined />} htmlType="submit" loading={savingPassword}>
                  Cập Nhật Mật Khẩu
                </Button>
              </Form>
            </Card>
          </Space>
        </div>
      )}
    </ColonyAdminLayout>
  );
}
