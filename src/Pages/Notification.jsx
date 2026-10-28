import { useCallback, useState } from 'react';
import { Alert, Button, Card, List, Pagination, Space, Tag, Typography, App as AntApp } from 'antd';
import { CheckOutlined, ReloadOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { hasSupplierWorkspace } from '../utils/supplierAccess';
import { useVerificationNotifications } from '../hooks/useVerificationNotifications';
import { useVerificationMutation, useVerificationResource } from '../hooks/useVerificationResource';
import { verificationNotificationService as service } from '../services/verificationNotificationService';
import CustomerHeader from '../components/layout/CustomerHeader';
import ColonyAdminLayout from '../components/layout/ColonyAdminLayout';
import { verificationDate } from '../utils/verificationDate';

export default function Notification({ onNavigate }) {
  const { message } = AntApp.useApp();
  const { user } = useAuth();
  const notifications = useVerificationNotifications();
  const revision = notifications?.workflowVersion || 0;
  const [page, setPage] = useState(1);
  const loader = useCallback((signal) => service.list(page, signal), [page]);
  const resource = useVerificationResource(loader, revision);
  const mutation = useVerificationMutation();
  const refresh = () => { resource.reload(); notifications?.refresh(); };
  const content = <Card title="Thông báo xác minh nhà cung cấp" extra={<Button icon={<ReloadOutlined />} onClick={refresh}>Làm mới</Button>}>
    <Alert type="info" showIcon style={{ marginBottom: 16 }} title="Thông báo được lưu để bạn xem lại khi mất kết nối. Email là kênh bổ sung." />
    {resource.error && <Alert type="error" title={resource.error} />}
    {mutation.error && <Alert type="error" title={mutation.error} />}
    <Space style={{ marginBottom: 16 }}>
      <Typography.Text>Chưa đọc: {resource.data?.unreadCount || 0}</Typography.Text>
      <Button icon={<CheckOutlined />} loading={mutation.isBusy} disabled={!resource.data?.unreadCount}
        onClick={async () => {
          const token = resource.data?.readThroughToken;
          const result = await mutation.run('read-all', token, (key) => service.markAllRead(token, key));
          if (result.ok) refresh();
        }}>Đánh dấu tất cả đã đọc</Button>
    </Space>
    <List loading={resource.isLoading} dataSource={resource.data?.items || []} renderItem={(notice) => <List.Item
      actions={[<Button key="open" type="link" onClick={async () => {
        try {
          await service.markRead(notice.id);
          notifications?.refresh();
          onNavigate?.(user?.role === 'Admin' ? 'admin/phe-duyet' : hasSupplierWorkspace(user) ?
            'nha-cung-cap/ho-so' : 'dang-ky-nha-cung-cap');
        } catch { message.error('Không thể mở thông báo.'); }
      }}>Xem hồ sơ</Button>]}>
      <List.Item.Meta title={<Space>{{
        SupplierApplicationSubmitted: 'Nhà cung cấp đã gửi hồ sơ',
        SupplierApplicationResubmitted: 'Có phiên bản hồ sơ mới',
        SupplierVerificationApproved: 'Doanh nghiệp đã được xác minh',
        SupplierVerificationRejected: 'Hồ sơ xác minh cần bổ sung',
        SupplierVerificationRevoked: 'Xác minh doanh nghiệp đã bị thu hồi',
      }[notice.type] || 'Hồ sơ xác minh được cập nhật'}{!notice.isRead && <Tag color="blue">Mới</Tag>}</Space>}
        description={verificationDate(notice.createdAtUtc)} />
    </List.Item>} />
    <Pagination current={page} pageSize={20} total={resource.data?.totalCount || 0} showSizeChanger={false} onChange={setPage} />
  </Card>;
  if (user?.role === 'Admin' || hasSupplierWorkspace(user)) {
    return <ColonyAdminLayout role={user.role === 'Admin' ? 'Admin' : 'Supplier'} activeKey="thong-bao" title="Thông báo" onNavigate={onNavigate}>{content}</ColonyAdminLayout>;
  }
  return <><CustomerHeader onNavigate={onNavigate} /><main style={{ maxWidth: 1200, padding: 24, margin: 'auto' }}>{content}</main></>;
}
