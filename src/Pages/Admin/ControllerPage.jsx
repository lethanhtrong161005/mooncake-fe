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
import usePagedList from '../../hooks/usePagedList';
import FilterBar from '../../components/common/FilterBar';
import useIsMobile from '../../hooks/useIsMobile';

const fetchUsersPage = async (params, signal) => {
  const response = await apiClient.get('/v1/users', {
    params: { ...params, role: params.status, status: undefined }, signal,
  });
  return response?.data ?? response;
};
const fetchAuditPage = async (params, signal) => {
  const response = await apiClient.get('/v1/admin/audit-logs', { params, signal });
  return response?.data ?? response;
};

const ShopManagementPanel = lazy(() => import('./ShopManagement').then((module) => ({ default: module.ShopManagementPanel })));

export default function ControllerPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('users');
  const userPage = usePagedList(fetchUsersPage);
  const mobile = useIsMobile();
  const auditPage = usePagedList(fetchAuditPage, { syncUrl: false });
  const users = userPage.items;
  const loading = userPage.loading;

  const toggleUserStatus = async (record) => {
    try {
      if (record.id) {
        await apiClient.patch(`/v1/admin/users/${record.id}`, { isActive: !record.isActive });
      }
      userPage.refresh();
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
                  <FilterBar search={userPage.search} onSearchChange={userPage.setSearch}
                    status={userPage.query.status} onStatusChange={userPage.setStatus}
                    onReset={userPage.reset} placeholder="Tìm tên, email hoặc số điện thoại"
                    filterLabel="Vai trò" statusOptions={['Customer', 'Supplier', 'Admin']
                      .map((value) => ({ value, label: value }))} />
                  <Table columns={userColumns} dataSource={users} rowKey="id" loading={loading}
                    scroll={{ x: 900 }}
                    pagination={{ current: userPage.query.page, pageSize: userPage.query.pageSize,
                      total: userPage.totalCount, onChange: userPage.setPage,
                      simple: mobile, showSizeChanger: !mobile, pageSizeOptions: [10, 20, 50, 100] }} />
                </div>
              ),
            },
            {
              key: 'audit',
              label: 'Nhật ký quản trị',
              children: (
                <div>
                  <Input.Search value={auditPage.search} onChange={(event) => auditPage.setSearch(event.target.value)}
                    placeholder="Tìm hành động hoặc đối tượng" allowClear className="mb-3 w-full sm:max-w-xs" />
                  <Table rowKey="id" loading={auditPage.loading} dataSource={auditPage.items}
                    scroll={{ x: 900 }}
                    columns={[
                      { title: 'Thời gian', dataIndex: 'createdAtUtc', key: 'createdAtUtc',
                        render: (value) => value ? new Date(value).toLocaleString('vi-VN') : '—' },
                      { title: 'Hành động', dataIndex: 'action', key: 'action' },
                      { title: 'Đối tượng', dataIndex: 'entityName', key: 'entityName' },
                      { title: 'Mã đối tượng', dataIndex: 'entityId', key: 'entityId' },
                      { title: 'Người thực hiện', dataIndex: 'actorUserId', key: 'actorUserId' },
                    ]}
                    pagination={{ current: auditPage.query.page, pageSize: auditPage.query.pageSize,
                      total: auditPage.totalCount, onChange: auditPage.setPage,
                      simple: mobile, showSizeChanger: !mobile, pageSizeOptions: [10, 20, 50, 100] }} />
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
