import { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Tag,
  Space,
  Modal,
  Timeline,
  Descriptions,
  message,
  Typography,
  Alert,
} from 'antd';
import {
  CarOutlined,
  CheckCircleOutlined,
  CameraOutlined,
  StarOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';

const { Text } = Typography;

export default function DeliveryPoD({ onNavigate }) {
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [podModalOpen, setPodModalOpen] = useState(false);

  // Customer Deliveries Mock Data
  const [deliveries, setDeliveries] = useState([
    {
      key: '1',
      deliveryCode: 'DEL-2025-01',
      contractNo: 'HD-2025-08910',
      supplierName: 'Xưởng Bánh Tràng An Nghệ Nhân',
      trackingCode: 'TA-TRUCK-889',
      carrier: 'Đội vận chuyển chuyên dụng xưởng',
      packagesCount: '500 Hộp Sơn Mài',
      status: 'in_transit', // 'in_transit' | 'delivered'
      expectedDate: '2025-08-25',
      proofPhotos: ['pod_pickup_package.jpg'],
    },
    {
      key: '2',
      deliveryCode: 'DEL-2025-02',
      contractNo: 'HD-2025-08500',
      supplierName: 'Hữu Nghị Luxury Mooncake',
      trackingCode: 'GHTK-B2B-998811',
      carrier: 'Giao Hàng Tiết Kiệm B2B',
      packagesCount: '300 Hộp Dạ Nguyệt',
      status: 'delivered',
      expectedDate: '2025-08-10',
      proofPhotos: ['pod_delivered_signed.jpg', 'pod_packages_dock.jpg'],
      customerConfirmed: true,
    },
  ]);

  const handleOpenPod = (record) => {
    setSelectedDelivery(record);
    setPodModalOpen(true);
  };

  const handleConfirmReceived = () => {
    setDeliveries((prev) =>
      prev.map((d) => (d.key === selectedDelivery.key ? { ...d, status: 'delivered', customerConfirmed: true } : d))
    );
    message.success(
      'Đã xác nhận nhận đủ hàng nguyên vẹn! Hệ thống đã giải phóng đợt thanh toán Escrow tương ứng và kích hoạt luồng đánh giá.'
    );
    setPodModalOpen(false);
    onNavigate?.('thanh-toan-danh-gia');
  };

  const columns = [
    {
      title: 'Mã Vận Chuyển',
      dataIndex: 'deliveryCode',
      key: 'deliveryCode',
      render: (c) => <span style={{ fontWeight: 600, color: '#1677ff' }}>{c}</span>,
    },
    {
      title: 'Hợp Đồng Tham Chiếu',
      dataIndex: 'contractNo',
      key: 'contractNo',
      render: (c) => <strong>{c}</strong>,
    },
    {
      title: 'Nhà Cung Cấp Vận Chuyển',
      dataIndex: 'supplierName',
      key: 'supplierName',
    },
    {
      title: 'Quy Cách Kiện Hàng',
      dataIndex: 'packagesCount',
      key: 'packagesCount',
      render: (p) => <Tag color="purple">{p}</Tag>,
    },
    {
      title: 'Mã Vận Đơn (Tracking)',
      dataIndex: 'trackingCode',
      key: 'trackingCode',
      render: (t, r) => (
        <div>
          <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{t}</span>
          <div style={{ fontSize: 11, color: '#888' }}>{r.carrier}</div>
        </div>
      ),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (s) => (s === 'delivered' ? <Tag color="success">✓ Đã giao thành công</Tag> : <Tag color="processing">Đang trên đường giao</Tag>),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<CameraOutlined />}
            style={{ background: '#8c1524', borderColor: '#8c1524' }}
            onClick={() => handleOpenPod(record)}
          >
            Ảnh PoD & Ký Nhận
          </Button>
          {record.status === 'delivered' && (
            <Button
              type="default"
              size="small"
              icon={<StarOutlined />}
              onClick={() => onNavigate?.('thanh-toan-danh-gia')}
            >
              Đánh Giá
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ background: '#f5f5f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CustomerHeader activeKey="giao-hang-pod" onNavigate={onNavigate} />

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
            Theo Dõi Giao Nhận & Xác Minh Bằng Chứng PoD (Proof of Delivery)
          </h1>
          <p style={{ margin: '4px 0 0', color: '#666', fontSize: 13 }}>
            Kiểm tra trạng thái kiện hàng, đối chiếu hình ảnh thực tế tại điểm giao và bấm xác nhận hoàn thành đợt giao
          </p>
        </div>

        <Alert
          message="Bằng chứng giao nhận an toàn (PoD - Proof of Delivery)"
          description="Ảnh chụp thực tế tại điểm giao hàng kèm chữ ký đại diện doanh nghiệp được mã hóa bảo mật. Quý khách vui lòng kiểm tra kỹ số lượng hộp trước khi xác nhận nghiệm thu."
          type="info"
          showIcon
          style={{ marginBottom: 20 }}
        />

        <Card bordered={false} style={{ borderRadius: 10 }}>
          <Table columns={columns} dataSource={deliveries} pagination={false} />
        </Card>

        {/* Modal PoD */}
        {selectedDelivery && (
          <Modal
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CameraOutlined style={{ color: '#8c1524' }} />
                <span>Bằng Chứng Giao Nhận PoD: {selectedDelivery.deliveryCode}</span>
              </div>
            }
            open={podModalOpen}
            onCancel={() => setPodModalOpen(false)}
            footer={
              selectedDelivery.status !== 'delivered' ? (
                <Space>
                  <Button onClick={() => setPodModalOpen(false)}>Đóng</Button>
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    style={{ background: '#2e7d32', borderColor: '#2e7d32' }}
                    onClick={handleConfirmReceived}
                  >
                    Xác Nhận Đã Nhận Đủ Hàng
                  </Button>
                </Space>
              ) : (
                <Button type="primary" onClick={() => setPodModalOpen(false)}>
                  Đóng
                </Button>
              )
            }
            width={650}
          >
            <Descriptions bordered size="small" column={2} style={{ margin: '16px 0' }}>
              <Descriptions.Item label="Đơn Vị Cung Ứng">{selectedDelivery.supplierName}</Descriptions.Item>
              <Descriptions.Item label="Mã Hợp Đồng">{selectedDelivery.contractNo}</Descriptions.Item>
              <Descriptions.Item label="Số Lượng Kiện">{selectedDelivery.packagesCount}</Descriptions.Item>
              <Descriptions.Item label="Mã Tracking">{selectedDelivery.trackingCode}</Descriptions.Item>
            </Descriptions>

            <div style={{ background: '#fafafa', padding: 16, borderRadius: 8, marginBottom: 16 }}>
              <Text strong style={{ display: 'block', marginBottom: 10 }}>
                Ảnh Chụp Bằng Chứng Giao Nhận Tại Kho / Trụ Sở Doanh Nghiệp:
              </Text>
              <div style={{ display: 'flex', gap: 12 }}>
                {selectedDelivery.proofPhotos.map((photo, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: 140,
                      height: 100,
                      border: '1px solid #ddd',
                      borderRadius: 8,
                      background: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      color: '#666',
                      padding: 6,
                    }}
                  >
                    <span style={{ fontSize: 24, marginBottom: 4 }}>📷</span>
                    <span>{photo}</span>
                    <span style={{ color: '#2e7d32', fontWeight: 600 }}>✓ GPS Verified</span>
                  </div>
                ))}
              </div>
            </div>

            <Timeline
              items={[
                { color: 'green', children: 'Hàng xuất kho xưởng Tràng An (2025-08-24 07:30)' },
                { color: 'green', children: 'Xe chuyên dụng vận chuyển đến địa chỉ doanh nghiệp (2025-08-25 09:15)' },
                {
                  color: selectedDelivery.status === 'delivered' ? 'green' : 'blue',
                  children: selectedDelivery.status === 'delivered' ? 'Đại diện doanh nghiệp đã ký nhận & đóng dấu' : 'Đang tiến hành bàn giao kiểm đếm tại sảnh',
                },
              ]}
            />
          </Modal>
        )}
      </main>
    </div>
  );
}
