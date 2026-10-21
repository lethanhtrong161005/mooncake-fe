import { useState } from 'react';
import {
  Card,
  Tabs,
  Table,
  Tag,
  Button,
  Space,
  Input,
  Select,
  Switch,
  Modal,
  message,
  Typography,
} from 'antd';
import {
  UserOutlined,
  ShopOutlined,
  LockOutlined,
  UnlockOutlined,
  SearchOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';

const { Text } = Typography;

export default function ControllerPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('users');

  // Users Mock Data
  const [users, setUsers] = useState([
    {
      key: '1',
      id: 'USR-001',
      fullName: 'Trần Minh Quân',
      email: 'quan.tm@moonmarket.vn',
      phone: '0901234567',
      role: 'Admin',
      isActive: true,
      createdAt: '2025-01-15',
    },
    {
      key: '2',
      id: 'USR-002',
      fullName: 'Nguyễn Bích Ngọc',
      email: 'ngoc.nb@vingroup.net',
      phone: '0912988776',
      role: 'Customer',
      isActive: true,
      createdAt: '2025-06-20',
    },
    {
      key: '3',
      id: 'USR-003',
      fullName: 'Trần Đức Thắng',
      email: 'thang.td@tranganbakery.vn',
      phone: '0934112233',
      role: 'Supplier',
      isActive: true,
      createdAt: '2025-07-02',
    },
    {
      key: '4',
      id: 'USR-004',
      fullName: 'Hoàng Anh Dũng',
      email: 'dung.ha@spamdomain.com',
      phone: '0988776655',
      role: 'Customer',
      isActive: false,
      createdAt: '2025-08-01',
    },
  ]);

  // Shops Mock Data
  const [shops, setShops] = useState([
    {
      key: '1',
      id: 'SHP-001',
      name: 'Gian Hàng Bánh Tràng An Nghệ Nhân',
      slug: 'trang-an-bakery',
      supplier: 'Trần Đức Thắng',
      template: 'Hoàng Kim Cung Đình',
      status: 'active',
      productsCount: 16,
    },
    {
      key: '2',
      id: 'SHP-002',
      name: 'Hữu Nghị Luxury Mooncake',
      slug: 'huu-nghi-luxury',
      supplier: 'Lê Hoàng Minh',
      template: 'Đương Đại Minimalist',
      status: 'active',
      productsCount: 22,
    },
    {
      key: '3',
      id: 'SHP-003',
      name: 'Xưởng Bánh Đậu Xanh Hải Dương',
      slug: 'dau-xanh-hai-duong',
      supplier: 'Vũ Đức Nam',
      template: 'Tràng An Cổ Điển',
      status: 'suspended',
      productsCount: 8,
    },
  ]);

  const toggleUserStatus = (record) => {
    setUsers((prev) =>
      prev.map((u) => (u.key === record.key ? { ...u, isActive: !u.isActive } : u))
    );
    message.info(`Đã ${record.isActive ? 'khóa' : 'mở khóa'} tài khoản của ${record.fullName}.`);
  };

  const toggleShopStatus = (record) => {
    const newStatus = record.status === 'active' ? 'suspended' : 'active';
    setShops((prev) =>
      prev.map((s) => (s.key === record.key ? { ...s, status: newStatus } : s))
    );
    message.warning(`Đã chuyển trạng thái gian hàng "${record.name}" sang ${newStatus}.`);
  };

  const userColumns = [
    { title: 'Mã User', dataIndex: 'id', key: 'id', width: 100 },
    {
      title: 'Họ & Tên',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (name, r) => (
        <div>
          <strong>{name}</strong>
          <div style={{ fontSize: 11, color: '#888' }}>{r.email}</div>
        </div>
      ),
    },
    { title: 'Điện Thoại', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Vai Trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        if (role === 'Admin') return <Tag color="volcano">Admin HQ</Tag>;
        if (role === 'Supplier') return <Tag color="gold">Supplier (Xưởng)</Tag>;
        return <Tag color="blue">Customer B2B</Tag>;
      },
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (active) => (
        <Tag color={active ? 'success' : 'error'}>
          {active ? 'Hoạt động' : 'Bị khóa'}
        </Tag>
      ),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          danger={record.isActive}
          icon={record.isActive ? <LockOutlined /> : <UnlockOutlined />}
          onClick={() => toggleUserStatus(record)}
        >
          {record.isActive ? 'Khóa' : 'Mở khóa'}
        </Button>
      ),
    },
  ];

  const shopColumns = [
    { title: 'Mã Shop', dataIndex: 'id', key: 'id', width: 100 },
    {
      title: 'Tên Gian Hàng',
      dataIndex: 'name',
      key: 'name',
      render: (name, r) => (
        <div>
          <strong>{name}</strong>
          <div style={{ fontSize: 11, color: '#888' }}>URL: /{r.slug}</div>
        </div>
      ),
    },
    { title: 'Chủ Sở Hữu', dataIndex: 'supplier', key: 'supplier' },
    { title: 'Mẫu Giao Diện', dataIndex: 'template', key: 'template', render: (t) => <Tag color="purple">{t}</Tag> },
    { title: 'Sản Phẩm', dataIndex: 'productsCount', key: 'productsCount', align: 'right' },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (s) => (
        <Tag color={s === 'active' ? 'success' : 'error'}>
          {s === 'active' ? 'Đang mở' : 'Bị đình chỉ'}
        </Tag>
      ),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          danger={record.status === 'active'}
          icon={record.status === 'active' ? <StopOutlined /> : <CheckCircleOutlined />}
          onClick={() => toggleShopStatus(record)}
        >
          {record.status === 'active' ? 'Đình chỉ' : 'Kích hoạt'}
        </Button>
      ),
    },
  ];

  return (
    <ColonyAdminLayout
      role="Admin"
      activeKey="admin/dieu-khien"
      onNavigate={onNavigate}
      title="Kiểm Soát Người Dùng, Gian Hàng & An Ninh Tài Khoản"
      subtitle="Quản lý danh sách tài khoản đa vai trò, mở/khóa truy cập và giám sát gian hàng vi phạm chính sách"
    >
      <Card bordered={false} style={{ borderRadius: 10 }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'users',
              label: '👥 Quản Lý Người Dùng (Users)',
              children: (
                <div>
                  <div style={{ marginBottom: 16 }}>
                    <Input
                      placeholder="Tìm kiếm theo Tên, Email hoặc Số điện thoại..."
                      prefix={<SearchOutlined style={{ color: '#aaa' }} />}
                      style={{ width: 320 }}
                      allowClear
                    />
                  </div>
                  <Table columns={userColumns} dataSource={users} pagination={false} />
                </div>
              ),
            },
            {
              key: 'shops',
              label: '🏪 Quản Lý Gian Hàng (Shops)',
              children: (
                <div>
                  <div style={{ marginBottom: 16 }}>
                    <Input
                      placeholder="Tìm kiếm theo Tên gian hàng, URL slug..."
                      prefix={<SearchOutlined style={{ color: '#aaa' }} />}
                      style={{ width: 320 }}
                      allowClear
                    />
                  </div>
                  <Table columns={shopColumns} dataSource={shops} pagination={false} />
                </div>
              ),
            },
          ]}
        />
      </Card>
    </ColonyAdminLayout>
  );
}
