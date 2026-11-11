import { useCallback, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  List,
  Pagination,
  Space,
  Tag,
  Typography,
  Tabs,
  Badge,
  Radio,
  Empty,
  App as AntApp,
} from 'antd';
import {
  CheckOutlined,
  ReloadOutlined,
  BellOutlined,
  SafetyCertificateOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  DollarOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { hasSupplierWorkspace } from '../utils/supplierAccess';
import { useVerificationNotifications } from '../hooks/useVerificationNotifications';
import { useVerificationMutation, useVerificationResource } from '../hooks/useVerificationResource';
import { verificationNotificationService as service } from '../services/verificationNotificationService';
import { useNotifications } from '../hooks/useNotifications';
import CustomerHeader from '../components/layout/CustomerHeader';
import ColonyAdminLayout from '../components/layout/ColonyAdminLayout';
import { verificationDate } from '../utils/verificationDate';

const { Text } = Typography;

export default function Notification({ onNavigate }) {
  const { message } = AntApp.useApp();
  const { user } = useAuth();

  // General Activity Notifications
  const {
    notifications: generalNotifs,
    unreadCount: generalUnread,
    isLoading: generalLoading,
    selectedCategory,
    setSelectedCategory,
    markAsRead,
    markAllAsRead,
    refresh: refreshGeneral,
  } = useNotifications();

  // Verification Notifications
  const verifNotifications = useVerificationNotifications();
  const revision = verifNotifications?.workflowVersion || 0;
  const [page, setPage] = useState(1);
  const loader = useCallback((signal) => service.list(page, signal), [page]);
  const resource = useVerificationResource(loader, revision);
  const mutation = useVerificationMutation();
  const refreshVerif = () => {
    resource.reload();
    verifNotifications?.refresh();
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'payment':
        return <DollarOutlined style={{ color: '#52c41a' }} />;
      case 'contract':
        return <FileTextOutlined style={{ color: '#1677ff' }} />;
      case 'order':
      case 'delivery':
        return <ShoppingCartOutlined style={{ color: '#fa8c16' }} />;
      case 'rfq':
      case 'bid':
        return <ThunderboltOutlined style={{ color: '#8c1524' }} />;
      default:
        return <BellOutlined style={{ color: '#722ed1' }} />;
    }
  };

  const handleGeneralItemClick = async (item) => {
    if (!item.isRead) {
      await markAsRead(item.id);
    }
    if (item.actionUrl) {
      const pageKey = item.actionUrl.replace(/^#\/?/, '').replace(/^\//, '');
      onNavigate?.(pageKey);
    }
  };

  const activityContent = (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Radio.Group
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value="all">Tất cả</Radio.Button>
          <Radio.Button value="order">Đơn hàng</Radio.Button>
          <Radio.Button value="contract">Hợp đồng</Radio.Button>
          <Radio.Button value="rfq">Báo giá</Radio.Button>
          <Radio.Button value="payment">Thanh toán</Radio.Button>
        </Radio.Group>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={refreshGeneral} loading={generalLoading}>
            Làm mới
          </Button>
          <Button
            icon={<CheckOutlined />}
            onClick={markAllAsRead}
            disabled={!generalUnread}
          >
            Đánh dấu tất cả đã đọc
          </Button>
        </Space>
      </div>

      <List
        loading={generalLoading}
        dataSource={generalNotifs}
        locale={{ emptyText: <Empty description="Không có thông báo hoạt động nào." /> }}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            style={{
              padding: '16px 20px',
              backgroundColor: item.isRead ? '#ffffff' : '#fcf8f6',
              borderRadius: 8,
              marginBottom: 10,
              border: item.isRead ? '1px solid #f0f0f0' : '1px solid #ffd8bf',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onClick={() => handleGeneralItemClick(item)}
            actions={[
              <Button key="view" type="link" size="small" onClick={() => handleGeneralItemClick(item)}>
                Chi tiết
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<div style={{ fontSize: 22, marginTop: 4 }}>{getCategoryIcon(item.category)}</div>}
              title={
                <Space>
                  <Text strong={!item.isRead} style={{ color: item.isRead ? '#1f1f1f' : '#8c1524' }}>
                    {item.title}
                  </Text>
                  {!item.isRead && <Tag color="gold">Mới</Tag>}
                </Space>
              }
              description={
                <div>
                  <div style={{ color: '#555', marginBottom: 4 }}>{item.content || item.message}</div>
                  <Text type="secondary" style={{ fontSize: 11 }}>
                    {item.createdAtUtc ? verificationDate(item.createdAtUtc) : 'Gần đây'}
                  </Text>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );

  const verificationContent = (
    <div>
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        title="Thông báo xác minh hồ sơ thẩm định doanh nghiệp và quyền nhà cung cấp."
      />
      {resource.error && <Alert type="error" title={resource.error} style={{ marginBottom: 12 }} />}
      {mutation.error && <Alert type="error" title={mutation.error} style={{ marginBottom: 12 }} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text>Chưa đọc: <strong>{resource.data?.unreadCount || 0}</strong></Text>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={refreshVerif}>
            Làm mới
          </Button>
          <Button
            icon={<CheckOutlined />}
            loading={mutation.isBusy}
            disabled={!resource.data?.unreadCount}
            onClick={async () => {
              const token = resource.data?.readThroughToken;
              const result = await mutation.run('read-all', token, (k) => service.markAllRead(token, k));
              if (result.ok) refreshVerif();
            }}
          >
            Đánh dấu tất cả đã đọc
          </Button>
        </Space>
      </div>

      <List
        loading={resource.isLoading}
        dataSource={resource.data?.items || []}
        locale={{ emptyText: <Empty description="Chưa có thông báo thẩm định nào." /> }}
        renderItem={(notice) => (
          <List.Item
            actions={[
              <Button
                key="open"
                type="link"
                onClick={async () => {
                  try {
                    await service.markRead(notice.id);
                    verifNotifications?.refresh();
                    onNavigate?.(
                      user?.role === 'Admin'
                        ? 'admin/phe-duyet'
                        : hasSupplierWorkspace(user)
                          ? 'nha-cung-cap/ho-so'
                          : 'dang-ky-nha-cung-cap'
                    );
                  } catch {
                    message.error('Không thể mở thông báo.');
                  }
                }}
              >
                Xem hồ sơ
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={
                <Space>
                  {{
                    SupplierApplicationSubmitted: 'Nhà cung cấp đã gửi hồ sơ',
                    SupplierApplicationResubmitted: 'Có phiên bản hồ sơ mới',
                    SupplierVerificationApproved: 'Doanh nghiệp đã được xác minh',
                    SupplierVerificationRejected: 'Hồ sơ xác minh cần bổ sung',
                    SupplierVerificationRevoked: 'Xác minh doanh nghiệp đã bị thu hồi',
                  }[notice.type] || 'Hồ sơ xác minh được cập nhật'}
                  {!notice.isRead && <Tag color="blue">Mới</Tag>}
                </Space>
              }
              description={verificationDate(notice.createdAtUtc)}
            />
          </List.Item>
        )}
      />
      <Pagination
        current={page}
        pageSize={20}
        total={resource.data?.totalCount || 0}
        showSizeChanger={false}
        onChange={setPage}
        style={{ marginTop: 16, textAlign: 'right' }}
      />
    </div>
  );

  const mainCard = (
    <Card bordered={false} style={{ borderRadius: 10 }}>
      <Tabs
        defaultActiveKey="activity"
        items={[
          {
            key: 'activity',
            label: (
              <span>
                <BellOutlined /> Hoạt Động & Giao Dịch
                {generalUnread > 0 && <Badge count={generalUnread} style={{ marginLeft: 8 }} />}
              </span>
            ),
            children: activityContent,
          },
          {
            key: 'verification',
            label: (
              <span>
                <SafetyCertificateOutlined /> Thẩm Định Doanh Nghiệp
                {resource.data?.unreadCount > 0 && (
                  <Badge count={resource.data.unreadCount} style={{ marginLeft: 8 }} />
                )}
              </span>
            ),
            children: verificationContent,
          },
        ]}
      />
    </Card>
  );

  if (user?.role === 'Admin' || hasSupplierWorkspace(user)) {
    return (
      <ColonyAdminLayout
        role={user?.role === 'Admin' ? 'Admin' : 'Supplier'}
        activeKey="thong-bao"
        title="Trung Tâm Thông Báo"
        subtitle="Theo dõi biến động đơn hàng, trạng thái hợp đồng, yêu cầu báo giá và tiến trình xác minh"
        onNavigate={onNavigate}
      >
        {mainCard}
      </ColonyAdminLayout>
    );
  }

  return (
    <div style={{ background: '#f5f5f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CustomerHeader onNavigate={onNavigate} activeKey="thong-bao" />
      <main style={{ maxWidth: 1200, width: '100%', padding: '24px 20px 48px', margin: '0 auto', flex: 1 }}>
        <div style={{ marginBottom: 20 }}>
          <Title level={3} style={{ margin: 0, color: '#1f1f1f' }}>Trung Tâm Thông Báo</Title>
          <Text type="secondary">Cập nhật mọi biến động liên quan đến đơn hàng, thanh toán và gói thầu của bạn</Text>
        </div>
        {mainCard}
      </main>
    </div>
  );
}
