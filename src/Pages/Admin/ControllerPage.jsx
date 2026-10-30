import { lazy, Suspense, useState, useEffect } from 'react';
import {
  Card,
  Tabs,
  Table,
  Tag,
  Button,
  Input,
  Spin,
  message,
} from 'antd';
import {
  LockOutlined,
  UnlockOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import apiClient from '../../services/apiClient';

const ShopManagementPanel = lazy(() => import('./ShopManagement').then((module) => ({ default: module.ShopManagementPanel })));

export default function ControllerPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get('/v1/admin/users');
        const list = Array.isArray(res) ? res : (res?.data || res?.items || []);
        setUsers(list.map((u, idx) => ({ ...u, key: u.id || `${idx}` })));
      } catch (err) {
        console.warn('Failed to load users:', err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const toggleUserStatus = async (record) => {
    try {
      if (record.id) {
        await apiClient.put(`/v1/admin/users/${record.id}/status`, { isActive: !record.isActive });
      }
      setUsers((prev) =>
        prev.map((u) => (u.key === record.key ? { ...u, isActive: !u.isActive } : u))
      );
      message.info(`Đã ${record.isActive ? 'khóa' : 'mở khóa'} tài khoản của ${record.fullName}.`);
    } catch {
      message.error('Không thể cập nhật trạng thái người dùng.');
    }
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
                  <Table columns={userColumns} dataSource={users} pagination={false} loading={loading} />
                </div>
              ),
            },
            {
              key: 'shops',
              label: '🏪 Quản Lý Gian Hàng (Shops)',
              children: <Suspense fallback={<Spin />}><ShopManagementPanel /></Suspense>,
            },
          ]}
        />
      </Card>
    </ColonyAdminLayout>
  );
}
