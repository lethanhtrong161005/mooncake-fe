import { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Tag,
  Space,
  Modal,
  Upload,
  Descriptions,
  message,
  Typography,
  Alert,
  Tabs,
} from 'antd';
import {
  ShoppingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UploadOutlined,
  EyeOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';

const { Text } = Typography;

export default function OrderManage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [mockupModalOpen, setMockupModalOpen] = useState(false);

  // Orders Mock Data
  const [orders, setOrders] = useState([
    {
      key: '1',
      orderNo: 'ORD-2025-001',
      customerName: 'Công ty Cổ phần MISA',
      productName: 'Bánh Nướng Thập Cẩm Bát Bửu (SKU-TC-200)',
      quantity: 350,
      totalAmount: '29.750.000 ₫',
      status: 'pending',
      customPackaging: {
        hasPackaging: true,
        logoFile: 'logo_misa.svg',
        boxStyle: 'Hộp Sơn Mài 4 Bánh',
        greeting: 'Kính Chúc Quý Khách Vạn Sự Như Ý - MISA',
        mockupStatus: 'design_review', // 'pending' | 'design_review' | 'approved'
      },
      deliveryAddress: 'Tòa nhà Technosoft, Duy Tân, Cầu Giấy, Hà Nội',
      deliveryDate: '2025-08-22',
    },
    {
      key: '2',
      orderNo: 'ORD-2025-002',
      customerName: 'Ngân hàng Thương mại Cổ phần Quân Đội (MB)',
      productName: 'Hộp Quà Sơn Mài Doanh Nghiệp VIP (SKU-BOX-VIP4)',
      quantity: 120,
      totalAmount: '78.000.000 ₫',
      status: 'confirmed',
      customPackaging: {
        hasPackaging: true,
        logoFile: 'logo_mb.png',
        boxStyle: 'Hộp Sơn Mài Cao Cấp',
        greeting: 'Ngân Hàng MB - Chúc Mừng Trung Thu Đoàn Viên',
        mockupStatus: 'approved',
      },
      deliveryAddress: '18 Lê Văn Lương, Cầu Giấy, Hà Nội',
      deliveryDate: '2025-08-25',
    },
    {
      key: '3',
      orderNo: 'ORD-2025-003',
      customerName: 'Tập đoàn Hòa Phát',
      productName: 'Bánh Dẻo Hạt Sen Hương Bưởi (SKU-DS-150)',
      quantity: 500,
      totalAmount: '37.500.000 ₫',
      status: 'processing',
      customPackaging: {
        hasPackaging: false,
      },
      deliveryAddress: 'KCN Phố Nối A, Hưng Yên',
      deliveryDate: '2025-08-28',
    },
  ]);

  const handleConfirmOrder = (record) => {
    setOrders((prev) =>
      prev.map((o) => (o.key === record.key ? { ...o, status: 'confirmed' } : o))
    );
    message.success(`Đã xác nhận đơn hàng ${record.orderNo}! Xưởng có thể bắt đầu lên kế hoạch sản xuất.`);
  };

  const handleOpenMockup = (record) => {
    setSelectedOrder(record);
    setMockupModalOpen(true);
  };

  const handleUploadMockup = () => {
    setOrders((prev) =>
      prev.map((o) =>
        o.key === selectedOrder.key
          ? {
              ...o,
              customPackaging: {
                ...o.customPackaging,
                mockupStatus: 'approved',
              },
            }
          : o
      )
    );
    message.success('Đã tải lên bản thiết kế Mockup 3D hộp quà! Khách hàng đã được gửi thông báo phê duyệt.');
    setMockupModalOpen(false);
  };

  const columns = [
    {
      title: 'Mã Đơn Hàng',
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 140,
      render: (no) => <span style={{ fontWeight: 600, color: '#1677ff' }}>{no}</span>,
    },
    {
      title: 'Khách Hàng Doanh Nghiệp',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (c, r) => (
        <div>
          <div style={{ fontWeight: 600 }}>{c}</div>
          <div style={{ fontSize: 11, color: '#888' }}>{r.deliveryAddress}</div>
        </div>
      ),
    },
    {
      title: 'Sản Phẩm & Biến Thể Cụ Thể',
      dataIndex: 'productName',
      key: 'productName',
      render: (p) => <span style={{ color: '#1f1f1f' }}>{p}</span>,
    },
    {
      title: 'Số Lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      render: (q) => <Tag color="blue">{q} hộp</Tag>,
    },
    {
      title: 'Tổng Giá Trị',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: 'right',
      render: (amt) => <span style={{ fontWeight: 600, color: '#8c1524' }}>{amt}</span>,
    },
    {
      title: 'In Logo / Đóng Hộp',
      key: 'packaging',
      render: (_, r) => {
        if (!r.customPackaging?.hasPackaging) return <Tag color="default">Không in logo</Tag>;
        const st = r.customPackaging.mockupStatus;
        if (st === 'approved') return <Tag color="success">✓ Mockup đã duyệt</Tag>;
        return <Tag color="warning">⏳ Chờ duyệt mockup</Tag>;
      },
    },
    {
      title: 'Trạng Thái Đơn',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        if (status === 'pending') return <Tag color="orange">Chờ xác nhận</Tag>;
        if (status === 'confirmed') return <Tag color="blue">Đã xác nhận</Tag>;
        if (status === 'processing') return <Tag color="purple">Đang sản xuất</Tag>;
        if (status === 'shipped') return <Tag color="cyan">Đang giao hàng</Tag>;
        return <Tag color="success">Đã hoàn thành</Tag>;
      },
    },
    {
      title: 'Thao Tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {record.status === 'pending' && (
            <Button
              type="primary"
              size="small"
              style={{ background: '#2e7d32', borderColor: '#2e7d32' }}
              onClick={() => handleConfirmOrder(record)}
            >
              Xác Nhận Đơn
            </Button>
          )}
          {record.customPackaging?.hasPackaging && (
            <Button
              type="link"
              size="small"
              icon={<PictureOutlined />}
              onClick={() => handleOpenMockup(record)}
            >
              Mockup Bao Bì
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <ColonyAdminLayout
      role="Supplier"
      activeKey="nha-cung-cap/quan-ly-don-hang"
      onNavigate={onNavigate}
      title="Quản Lý Đơn Hàng Sỉ B2B & Thiết Kế Đóng Gói Doanh Nghiệp"
      subtitle="Theo dõi tiến độ đơn hàng số lượng lớn, tải file logo doanh nghiệp và phản hồi bản vẽ mockup duyệt mẫu"
    >
      <Alert
        message="Quy trình xử lý Thiết Kế Bao Bì (Feature #9 - Custom Packaging Loop)"
        description="Khách hàng doanh nghiệp tải lên file logo công ty (SVG/PNG) và câu chúc Tết. Xưởng tải lên file Mockup thiết kế hộp bánh để khách hàng bấm duyệt trước khi đưa vào dây chuyền in ấn hàng loạt."
        type="info"
        showIcon
        style={{ marginBottom: 20 }}
      />

      <Card bordered={false} style={{ borderRadius: 10 }}>
        <Table columns={columns} dataSource={orders} pagination={{ pageSize: 6 }} />
      </Card>

      {/* Modal Review Packaging & Upload Mockup */}
      {selectedOrder && (
        <Modal
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <PictureOutlined style={{ color: '#8c1524' }} />
              <span>Yêu Cầu In Logo Doanh Nghiệp: Đơn #{selectedOrder.orderNo}</span>
            </div>
          }
          open={mockupModalOpen}
          onCancel={() => setMockupModalOpen(false)}
          onOk={handleUploadMockup}
          okText="Gửi Bản Vẽ Mockup Cho Khách Duyệt"
          width={650}
        >
          <Descriptions bordered size="small" column={2} style={{ marginTop: 16 }}>
            <Descriptions.Item label="Khách Hàng">{selectedOrder.customerName}</Descriptions.Item>
            <Descriptions.Item label="Quy Cách Hộp">{selectedOrder.customPackaging.boxStyle}</Descriptions.Item>
            <Descriptions.Item label="File Logo Tải Lên" span={2}>
              <Tag color="blue">{selectedOrder.customPackaging.logoFile}</Tag>
              <Button type="link" size="small">Tải File Vector Gốc</Button>
            </Descriptions.Item>
            <Descriptions.Item label="Câu Chúc Tết Doanh Nghiệp" span={2}>
              <em>"{selectedOrder.customPackaging.greeting}"</em>
            </Descriptions.Item>
          </Descriptions>

          <div style={{ marginTop: 20, background: '#fafafa', padding: 16, borderRadius: 8 }}>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>
              Tải Lên Bản Vẽ Mockup 3D Mẫu Hộp Bánh Đã Gắn Logo:
            </Text>
            <Upload maxCount={1}>
              <Button icon={<UploadOutlined />}>Tải Lên File Mockup Thiết Kế (PNG/PDF)</Button>
            </Upload>
            <div style={{ fontSize: 12, color: '#888', marginTop: 8 }}>
              Sau khi tải lên, khách hàng sẽ nhận được thông báo để bấm duyệt hoặc yêu cầu chỉnh sửa màu sắc.
            </div>
          </div>
        </Modal>
      )}
    </ColonyAdminLayout>
  );
}
