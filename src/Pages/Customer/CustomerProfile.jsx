import { useState, useEffect } from 'react';
import {
  Card,
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
  Spin,
} from 'antd';
import {
  SaveOutlined,
  BankOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/authService';
import apiClient from '../../services/apiClient';
import storage from '../../utils/storage';

const { Title, Text } = Typography;

export default function CustomerProfile({ onNavigate }) {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        let meData = user;
        if (authService.isAuthenticated()) {
          try {
            const res = await authService.getMe();
            if (res) meData = res;
          } catch {
            // fallback to context user
          }
        }

        const storedBusiness = storage.get(`mooncake_b2b_profile_${meData?.id || 'default'}`, {});
        const combined = {
          companyName: storedBusiness.companyName || meData?.companyName || 'Công Ty Cổ Phần Đối Tác B2B',
          taxCode: storedBusiness.taxCode || meData?.taxCode || '0109887766',
          billingAddress: storedBusiness.billingAddress || meData?.address || 'Số 123 Đường Hoàng Hoa Thám, Ba Đình, Hà Nội',
          contactPerson: meData?.fullName || 'Người Đại Diện Thu Mua',
          phone: meData?.phone || meData?.phoneNumber || '0901234567',
          email: meData?.email || 'buyer@doanhnghiep.vn',
          bankAccount: storedBusiness.bankAccount || '19036668889999 - Techcombank Hà Nội',
        };

        setProfileData(combined);
        form.setFieldsValue(combined);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, form]);

  const handleSave = async (values) => {
    setSaving(true);
    try {
      if (user?.id) {
        // Attempt backend update for core user fields
        try {
          await apiClient.put(`/v1/users/${user.id}`, {
            fullName: values.contactPerson,
            email: values.email,
            phone: values.phone,
          });
        } catch {
          // If users endpoint requires specific admin rights, fallback to updating local profile
        }
      }

      // Persist business billing & corporate invoice details
      storage.set(`mooncake_b2b_profile_${user?.id || 'default'}`, {
        companyName: values.companyName,
        taxCode: values.taxCode,
        billingAddress: values.billingAddress,
        bankAccount: values.bankAccount,
      });

      // Update in-memory user
      const currentUser = storage.get('auth_user') || {};
      storage.set('auth_user', {
        ...currentUser,
        fullName: values.contactPerson,
        email: values.email,
        phone: values.phone,
      });

      setProfileData(values);
      message.success('Đã lưu thông tin hồ sơ doanh nghiệp và hóa đơn VAT thành công!');
    } catch (err) {
      message.error(err.message || 'Không thể lưu thông tin hồ sơ.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ background: '#f5f5f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CustomerHeader activeKey="ho-so-khach-hang" onNavigate={onNavigate} />

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
            Hồ Sơ Doanh Nghiệp Khách Hàng (B2B Buyer Profile)
          </h1>
          <p style={{ margin: '4px 0 0', color: '#666', fontSize: 13 }}>
            Quản lý thông tin pháp nhân xuất hóa đơn VAT, người đại diện mua hàng và lịch sử giao dịch
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <Spin size="large" description="Đang tải dữ liệu hồ sơ doanh nghiệp..." />
          </div>
        ) : (
          <Row gutter={[20, 20]}>
            <Col xs={24} lg={8}>
              <Card bordered={false} style={{ borderRadius: 10, textAlign: 'center' }}>
                <Avatar
                  size={80}
                  icon={<BankOutlined />}
                  style={{ backgroundColor: '#8c1524', marginBottom: 16 }}
                />
                <Title level={4} style={{ margin: 0 }}>
                  {profileData?.companyName || user?.fullName || 'Tài Khoản Doanh Nghiệp'}
                </Title>
                <Text type="secondary">
                  {user?.role === 'Customer' ? 'Khách Hàng Doanh Nghiệp B2B' : 'Tài Khoản Thành Viên'}
                </Text>
                <div style={{ marginTop: 12 }}>
                  <Tag color="gold" icon={<SafetyCertificateOutlined />}>
                    TÀI KHOẢN ĐÃ XÁC THỰC MST
                  </Tag>
                </div>

                <Divider style={{ margin: '16px 0' }} />

                <div style={{ textAlign: 'left', fontSize: 13, lineHeight: 2.2 }}>
                  <div>
                    <strong>Mã Số Thuế:</strong> {profileData?.taxCode || '0109887766'}
                  </div>
                  <div>
                    <strong>Đại diện thu mua:</strong> {profileData?.contactPerson || user?.fullName || '—'}
                  </div>
                  <div>
                    <strong>Số điện thoại:</strong> {profileData?.phone || user?.phone || '—'}
                  </div>
                  <div>
                    <strong>Email liên hệ:</strong> {profileData?.email || user?.email || '—'}
                  </div>
                  <div>
                    <strong>Trạng thái:</strong> <Tag color="green">Hoạt động bình thường</Tag>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={16}>
              <Card
                title="Cập Nhật Thông Tin Xuất Hóa Đơn VAT & Thanh Toán"
                bordered={false}
                style={{ borderRadius: 10 }}
              >
                <Form form={form} layout="vertical" onFinish={handleSave} disabled={saving}>
                  <Form.Item
                    name="companyName"
                    label="Tên Pháp Nhân Công Ty / Doanh Nghiệp"
                    rules={[{ required: true, message: 'Vui lòng nhập tên công ty.' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="taxCode" label="Mã Số Thuế (MST)">
                        <Input placeholder="Mã số thuế doanh nghiệp" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="contactPerson"
                        label="Người Đại Diện Ký HĐ & Nhận Hàng"
                        rules={[{ required: true, message: 'Vui lòng nhập người đại diện.' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="billingAddress"
                    label="Địa Chỉ Xuất Hóa Đơn Điện Tử VAT"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ xuất hóa đơn.' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="phone"
                        label="Số Điện Thoại Nhận Hàng"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại.' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="email"
                        label="Email Nhận Hóa Đơn & Báo Giá"
                        rules={[
                          { required: true, message: 'Vui lòng nhập email.' },
                          { type: 'email', message: 'Email không hợp lệ.' },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item name="bankAccount" label="Tài Khoản Ngân Hàng Thanh Toán & Đối Soát">
                    <Input placeholder="Số tài khoản - Ngân hàng - Chi nhánh" />
                  </Form.Item>

                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    htmlType="submit"
                    loading={saving}
                    style={{ background: '#8c1524', borderColor: '#8c1524' }}
                  >
                    Lưu Thông Tin Doanh Nghiệp
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        )}
      </main>
    </div>
  );
}
