import { useState } from 'react';
import {
  Card,
  List,
  Badge,
  Tag,
  Button,
  Space,
  Typography,
  Tabs,
  message,
} from 'antd';
import {
  BellOutlined,
  CheckOutlined,
  SolutionOutlined,
  FileTextOutlined,
  CarOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../components/layout/CustomerHeader';

const { Title, Text } = Typography;

export default function Notification({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('all');

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Báo giá mới cho phiên RFQ-2025-08910',
      description: 'Xưởng Bánh Tràng An Nghệ Nhân đã nộp bảng chào giá chi tiết cho 500 Hộp Sơn Mài VIP.',
      time: '10 phút trước',
      type: 'rfq',
      read: false,
      link: 'so-sanh-bao-gia',
    },
    {
      id: 2,
      title: 'Yêu cầu đặt cọc mốc M1 kích hoạt hợp đồng #HD-2025-08910',
      description: 'Cả 2 bên đã hoàn tất ký số OTP. Quý khách vui lòng nạp 93.000.000 ₫ vào tài khoản Escrow để xưởng bắt đầu sản xuất.',
      time: '1 giờ trước',
      type: 'contract',
      read: false,
      link: 'hop-dong-tien-do',
    },
    {
      id: 3,
      title: 'Chuyến giao hàng thành công & Ảnh PoD xác thực',
      description: 'Đơn hàng #DEL-2025-02 đã được bàn giao và ký nhận nguyên vẹn tại FPT Tower.',
      time: '3 giờ trước',
      type: 'delivery',
      read: true,
      link: 'giao-hang-pod',
    },
    {
      id: 4,
      title: 'Lời nhắc đánh giá trải nghiệm giao dịch',
      description: 'Đơn hàng hoàn thành, kính mời quý doanh nghiệp gửi đánh giá 4 tiêu chí sao để hỗ trợ nâng cao chất lượng dịch vụ.',
      time: '1 ngày trước',
      type: 'review',
      read: true,
      link: 'thanh-toan-danh-gia',
    },
  ]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    message.success('Đã đánh dấu tất cả thông báo là đã đọc!');
  };

  const filteredNotis = notifications.filter((n) => {
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'rfq') return n.type === 'rfq';
    if (activeTab === 'contract') return n.type === 'contract';
    return true;
  });

  return (
    <div style={{ background: '#f5f5f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CustomerHeader activeKey="thong-bao" onNavigate={onNavigate} />

      <main style={{ maxWidth: 1000, margin: '24px auto', padding: '0 20px', flex: 1, width: '100%' }}>
        <div
          style={{
            background: '#ffffff',
            padding: '20px 24px',
            borderRadius: 10,
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#1f1f1f' }}>
              Trung Tâm Thông Báo & Cảnh Báo Giao Dịch B2B
            </h1>
            <p style={{ margin: '4px 0 0', color: '#666', fontSize: 13 }}>
              Cập nhật thời gian thực về tiến độ báo giá RFQ, mốc nộp cọc hợp đồng Escrow và trạng thái vận chuyển
            </p>
          </div>
          <Button icon={<CheckOutlined />} onClick={handleMarkAllRead}>
            Đánh dấu tất cả đã đọc
          </Button>
        </div>

        <Card bordered={false} style={{ borderRadius: 10 }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              { key: 'all', label: `Tất cả (${notifications.length})` },
              { key: 'unread', label: `Chưa đọc (${notifications.filter((n) => !n.read).length})` },
              { key: 'rfq', label: 'Báo giá RFQ' },
              { key: 'contract', label: 'Hợp đồng & Cọc M1' },
            ]}
          />

          <List
            itemLayout="horizontal"
            dataSource={filteredNotis}
            renderItem={(item) => (
              <List.Item
                style={{
                  background: item.read ? '#ffffff' : '#fff9f9',
                  padding: '16px 20px',
                  borderRadius: 8,
                  marginBottom: 8,
                  border: item.read ? '1px solid #f0f0f0' : '1px solid #ffccc7',
                  cursor: 'pointer',
                }}
                onClick={() => onNavigate?.(item.link)}
                actions={[
                  <Button
                    type="link"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate?.(item.link);
                    }}
                  >
                    Xem Chi Tiết →
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: item.type === 'rfq' ? '#fff1f0' : item.type === 'contract' ? '#fff7e6' : '#f6ffed',
                        color: item.type === 'rfq' ? '#8c1524' : item.type === 'contract' ? '#d48806' : '#2e7d32',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 18,
                      }}
                    >
                      {item.type === 'rfq' ? <SolutionOutlined /> : item.type === 'contract' ? <FileTextOutlined /> : <CarOutlined />}
                    </div>
                  }
                  title={
                    <Space>
                      <strong style={{ color: item.read ? '#333' : '#8c1524' }}>{item.title}</strong>
                      {!item.read && <Badge status="processing" />}
                    </Space>
                  }
                  description={
                    <div>
                      <div style={{ color: '#666', fontSize: 13 }}>{item.description}</div>
                      <div style={{ color: '#999', fontSize: 11, marginTop: 4 }}>{item.time}</div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </main>
    </div>
  );
}
