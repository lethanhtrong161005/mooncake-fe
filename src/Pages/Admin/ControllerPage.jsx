import { lazy, Suspense, useState } from 'react';
import {
  Tabs,
  Table,
  Tag,
  Input,
  Spin,
  Tooltip,
  Empty,
  message,
} from 'antd';
import {
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import apiClient from '../../services/apiClient';
import usePagedList from '../../hooks/usePagedList';
import FilterBar from '../../components/common/FilterBar';
import useIsMobile from '../../hooks/useIsMobile';
import RowActionMenu from '../../components/common/RowActionMenu';
import { TruncatedTooltip } from '../../components/common/TableCellHelpers';

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

const ROLE_TAG = {
  Admin: { label: 'Quản trị viên', bg: '#fdf1f2', border: '#ecc9cd', text: '#7d1322' },
  Supplier: { label: 'Nhà cung cấp', bg: '#fdf8ec', border: '#e8d49c', text: '#9a6b16' },
  Customer: { label: 'Khách hàng B2B', bg: '#f3f6f9', border: '#cfd8e3', text: '#31465a' },
};

const renderShortUuid = (value) => {
  if (!value) return <span className="text-[#8c817c]">—</span>;
  const text = String(value);
  return (
    <Tooltip title={text}>
      <span className="font-mono text-xs text-[#6c625e] whitespace-nowrap">
        {text.length > 12 ? `${text.slice(0, 8)}…` : text}
      </span>
    </Tooltip>
  );
};

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
    {
      title: 'Mã',
      dataIndex: 'id',
      key: 'id',
      width: 96,
      render: renderShortUuid,
    },
    {
      title: 'Tài khoản',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 245,
      render: (name, r) => (
        <div className="max-w-[230px]">
          <TruncatedTooltip
            text={name}
            tooltipContent={r.email ? `${name} (${r.email})` : name}
            className="font-medium text-[#231a18]"
          />
          <TruncatedTooltip
            text={r.email || 'Chưa cập nhật email'}
            className="text-xs text-[#6c625e]"
          />
        </div>
      ),
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 130,
      render: (phone) => <span className="font-mono text-xs text-[#4b423e] tabular-nums whitespace-nowrap">{phone || '—'}</span>,
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      width: 140,
      render: (role) => {
        const tone = ROLE_TAG[role] || ROLE_TAG.Customer;
        return (
          <Tag style={{ backgroundColor: tone.bg, borderColor: tone.border, color: tone.text, marginInlineEnd: 0 }}>
            {tone.label}
          </Tag>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 120,
      render: (active) => (
        <Tag
          style={
            active
              ? { backgroundColor: '#edf5ef', borderColor: '#c5dccb', color: '#2d5a43', marginInlineEnd: 0 }
              : { backgroundColor: '#fdf1f2', borderColor: '#ecc9cd', color: '#7d1322', marginInlineEnd: 0 }
          }
        >
          {active ? 'Hoạt động' : 'Bị khóa'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      width: 84,
      render: (_, record) => (
        <RowActionMenu
          ariaLabel={`Thao tác tài khoản ${record.fullName || record.phone || ''}`}
          actions={[
            {
              key: 'toggle',
              label: record.isActive ? 'Khóa tài khoản' : 'Mở khóa tài khoản',
              icon: record.isActive ? <LockOutlined /> : <UnlockOutlined />,
              danger: record.isActive,
              confirmTitle: `${record.isActive ? 'Khóa' : 'Mở khóa'} tài khoản ${record.fullName || record.phone}?`,
              onClick: () => toggleUserStatus(record),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <ColonyAdminLayout
      role="Admin"
      activeKey="admin/dieu-khien"
      onNavigate={onNavigate}
      title="Người dùng & an ninh tài khoản"
      subtitle="Quản lý tài khoản đa vai trò, nhật ký quản trị và giám sát gian hàng vi phạm."
    >
      <section className="rounded-lg border border-[#e4dcd3] bg-white px-4 py-2 sm:px-5 sm:py-3">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'users',
              label: 'Quản lý người dùng',
              children: (
                <div className="space-y-4 pb-2">
                  <FilterBar
                    search={userPage.search}
                    onSearchChange={userPage.setSearch}
                    status={userPage.query.status}
                    onStatusChange={userPage.setStatus}
                    onReset={userPage.reset}
                    placeholder="Tìm tên, email hoặc số điện thoại"
                    filterLabel="Vai trò"
                    statusOptions={[
                      { value: 'Customer', label: 'Khách hàng B2B' },
                      { value: 'Supplier', label: 'Nhà cung cấp' },
                      { value: 'Admin', label: 'Quản trị viên' },
                    ]}
                  />
                  <Table
                    columns={userColumns}
                    dataSource={users}
                    rowKey="id"
                    size="middle"
                    loading={loading}
                    scroll={{ x: 'max-content' }}
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={<span className="text-[#6c625e]">Chưa có tài khoản phù hợp</span>}
                        />
                      ),
                    }}
                    pagination={{
                      current: userPage.query.page,
                      pageSize: userPage.query.pageSize,
                      total: userPage.totalCount,
                      onChange: userPage.setPage,
                      simple: mobile,
                      showSizeChanger: !mobile,
                      pageSizeOptions: [10, 20, 50, 100],
                    }}
                  />
                </div>
              ),
            },
            {
              key: 'audit',
              label: 'Nhật ký quản trị',
              children: (
                <div className="space-y-4 pb-2">
                  <Input.Search
                    value={auditPage.search}
                    onChange={(event) => auditPage.setSearch(event.target.value)}
                    placeholder="Tìm hành động hoặc đối tượng"
                    allowClear
                    size="large"
                    className="w-full sm:max-w-xs"
                  />
                  <Table
                    rowKey="id"
                    size="middle"
                    loading={auditPage.loading}
                    dataSource={auditPage.items}
                    scroll={{ x: 'max-content' }}
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={<span className="text-[#6c625e]">Chưa có bản ghi nhật ký nào</span>}
                        />
                      ),
                    }}
                    columns={[
                      {
                        title: 'Thời gian',
                        dataIndex: 'createdAtUtc',
                        key: 'createdAtUtc',
                        render: (value) => (
                          <span className="tabular-nums text-[#574d49] whitespace-nowrap">
                            {value ? new Date(value).toLocaleString('vi-VN') : '—'}
                          </span>
                        ),
                      },
                      {
                        title: 'Hành động',
                        dataIndex: 'action',
                        key: 'action',
                        width: 220,
                        render: (value) => (
                          <div className="max-w-[205px]">
                            <TruncatedTooltip text={value} className="font-medium text-[#231a18]" />
                          </div>
                        ),
                      },
                      {
                        title: 'Đối tượng',
                        dataIndex: 'entityName',
                        key: 'entityName',
                        width: 165,
                        render: (value) => (
                          <div className="max-w-[150px]">
                            <TruncatedTooltip text={value} className="text-[#4b423e]" />
                          </div>
                        ),
                      },
                      {
                        title: 'Mã đối tượng',
                        dataIndex: 'entityId',
                        key: 'entityId',
                        render: renderShortUuid,
                      },
                      {
                        title: 'Người thực hiện',
                        dataIndex: 'actorUserId',
                        key: 'actorUserId',
                        render: renderShortUuid,
                      },
                    ]}
                    pagination={{
                      current: auditPage.query.page,
                      pageSize: auditPage.query.pageSize,
                      total: auditPage.totalCount,
                      onChange: auditPage.setPage,
                      simple: mobile,
                      showSizeChanger: !mobile,
                      pageSizeOptions: [10, 20, 50, 100],
                    }}
                  />
                </div>
              ),
            },
            {
              key: 'shops',
              label: 'Quản lý gian hàng',
              children: (
                <div className="pb-2">
                  <Suspense fallback={<div className="py-8 text-center"><Spin /></div>}>
                    <ShopManagementPanel />
                  </Suspense>
                </div>
              ),
            },
          ]}
        />
      </section>
    </ColonyAdminLayout>
  );
}
