import { Alert, Badge, Button, Empty, List, Popover, Space, Tag, Typography, App as AntApp } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import { hasSupplierWorkspace } from '../../utils/supplierAccess';
import { useVerificationNotifications } from '../../hooks/useVerificationNotifications';
import { verificationNotificationService } from '../../services/verificationNotificationService';

export default function VerificationBell({ onNavigate }) {
  const { message } = AntApp.useApp();
  const { user, isLoggedIn } = useAuth();
  const notifications = useVerificationNotifications();
  if (!isLoggedIn || !notifications) return null;
  const { inbox, unreadCount, status, refresh, error } = notifications;
  const open = async (notice) => {
    try {
      await verificationNotificationService.markRead(notice.id);
      refresh();
      onNavigate?.(user?.role === 'Admin' ? 'admin/phe-duyet' : hasSupplierWorkspace(user) ?
        'nha-cung-cap/ho-so' : 'dang-ky-nha-cung-cap');
    } catch { message.error('Không thể cập nhật thông báo.'); }
  };
  return <Popover trigger="click" placement="bottomRight" title="Thông báo xác minh nhà cung cấp"
    content={<Space orientation="vertical" style={{ width: 310, maxWidth: '80vw' }}>
      <Tag color={status === 'connected' ? 'success' : 'warning'}>{status === 'connected' ? 'Đang nhận real-time' : 'Đang kết nối lại'}</Tag>
      {error && <Alert type="warning" title={error} />}
      <List size="small" dataSource={inbox?.items?.slice(0, 5) || []} locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có thông báo" /> }}
        renderItem={(notice) => <List.Item><Button type="text" block style={{ height: 'auto', whiteSpace: 'normal', textAlign: 'left' }}
          onClick={() => open(notice)}><Typography.Text strong={!notice.isRead}>{{
            SupplierApplicationSubmitted: 'Có hồ sơ nhà cung cấp mới',
            SupplierApplicationResubmitted: 'Nhà cung cấp đã gửi lại hồ sơ',
            SupplierVerificationApproved: 'Hồ sơ đã được phê duyệt',
            SupplierVerificationRejected: 'Hồ sơ cần được bổ sung',
            SupplierVerificationRevoked: 'Xác minh đã bị thu hồi',
          }[notice.type] || 'Hồ sơ xác minh đã cập nhật'}</Typography.Text></Button></List.Item>} />
      <Button type="link" onClick={() => onNavigate?.('thong-bao')}>Xem tất cả</Button>
    </Space>}>
    <Badge count={unreadCount} size="small"><Button type="text" shape="circle" aria-label="Thông báo xác minh nhà cung cấp" icon={<BellOutlined />} /></Badge>
  </Popover>;
}
