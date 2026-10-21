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
  Form,
  Input,
  Select,
} from 'antd';
import {
  CarOutlined,
  UploadOutlined,
  CameraOutlined,
  PlusOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';

const { Text } = Typography;

export default function DeliverManage({ onNavigate }) {
  const [podModalOpen, setPodModalOpen] = useState(false);
  const [createDeliveryModalOpen, setCreateDeliveryModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  // Deliveries Mock Data
  const [deliveries, setDeliveries] = useState([
    {
      key: '1',
      deliveryCode: 'DEL-2025-01',
      contractNo: 'HD-2025-08910',
      recipientName: 'Bà Nguyễn Thị Mai (Đại diện Vingroup)',
      recipientPhone: '0988 123 456',
      destination: 'Tòa nhà Symphony, Vinhomes Riverside, Long Biên, Hà Nội',
      mode: 'self_arranged', // 'self_arranged' | 'platform_managed'
      carrierName: 'Đội xe chuyên dụng Xưởng Tràng An',
      trackingCode: 'TA-TRUCK-889',
      status: 'in_transit', // 'picked_up' | 'in_transit' | 'delivered'
      proofPhotos: ['pod_pickup_01.jpg'],
      expectedDate: '2025-08-25',
    },
    {
      key: '2',
      deliveryCode: 'DEL-2025-02',
      contractNo: 'HD-2025-08880',
      recipientName: 'Ông Lê Tuấn Anh (Kho Vận FPT)',
      recipientPhone: '0912 888 999',
      destination: 'FPT Tower, 10 Phạm Văn Bạch, Cầu Giấy, Hà Nội',
      mode: 'platform_managed',
      carrierName: 'Giao Hàng Tiết Kiệm (Đối tác Nền tảng)',
      trackingCode: 'GHTK-B2B-998811',
      status: 'delivered',
      proofPhotos: ['pod_delivery_signed.jpg', 'pod_packages_check.jpg'],
      expectedDate: '2025-08-20',
    },
  ]);

  const handleOpenPod = (record) => {
    setSelectedDelivery(record);
    setPodModalOpen(true);
  };

  const handleUploadPoDProof = () => {
    setDeliveries((prev) =>
      prev.map((d) =>
        d.key === selectedDelivery.key
          ? {
              ...d,
              status: 'delivered',
              proofPhotos: [...d.proofPhotos, 'pod_final_proof.jpg'],
            }
          : d
      )
    );
    message.success('Đã tải lên ảnh bằng chứng giao nhận (PoD) thành công! Trạng thái chuyến giao cập nhật thành Delivered.');
    setPodModalOpen(false);
  };

  const columns = [
    {
      title: 'Mã Vận Chuyển',
      dataIndex: 'deliveryCode',
      key: 'deliveryCode',
      render: (code) => <span style={{ fontWeight: 600, color: '#1677ff' }}>{code}</span>,
    },
    {
      title: 'Hợp Đồng',
      dataIndex: 'contractNo',
      key: 'contractNo',
      render: (c) => <span style={{ fontWeight: 600 }}>{c}</span>,
    },
    {
      title: 'Người Nhận & Địa Điểm',
      key: 'recipient',
      render: (_, r) => (
        <div>
          <div style={{ fontWeight: 600 }}>{r.recipientName} ({r.recipientPhone})</div>
          <div style={{ fontSize: 11, color: '#888' }}>{r.destination}</div>
        </div>
      ),
    },
    {
      title: 'Hình Thức Giao',
      dataIndex: 'mode',
      key: 'mode',
      render: (m) => (m === 'self_arranged' ? <Tag color="blue">Xưởng tự vận chuyển</Tag> : <Tag color="green">Sàn điều phối</Tag>),
    },
    {
      title: 'Mã Tracking',
      dataIndex: 'trackingCode',
      key: 'trackingCode',
      render: (t, r) => (
        <div>
          <div style={{ fontFamily: 'monospace', fontWeight: 600 }}>{t}</div>
          <div style={{ fontSize: 11, color: '#888' }}>{r.carrierName}</div>
        </div>
      ),
    },
    {
      title: 'Ảnh PoD',
      dataIndex: 'proofPhotos',
      key: 'proofPhotos',
      align: 'center',
      render: (photos) => <Tag color="purple">{photos.length} ảnh PoD</Tag>,
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        if (status === 'picked_up') return <Tag color="orange">Đã lấy hàng</Tag>;
        if (status === 'in_transit') return <Tag color="processing">Đang trên đường giao</Tag>;
        return <Tag color="success">✓ Giao thành công</Tag>;
      },
    },
    {
      title: 'Thao Tác',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<CameraOutlined />}
          style={{ background: '#8c1524', borderColor: '#8c1524' }}
          onClick={() => handleOpenPod(record)}
        >
          Ảnh PoD
        </Button>
      ),
    },
  ];

  return (
    <ColonyAdminLayout
      role="Supplier"
      activeKey="nha-cung-cap/quan-ly-giao-hang"
      onNavigate={onNavigate}
      title="Quản Lý Đơn Giao Vận & Bằng Chứng Xác Minh (Proof of Delivery)"
      subtitle="Theo dõi lộ trình giao bánh tận nơi cho doanh nghiệp, cập nhật mã tracking và lưu ảnh xác nhận PoD"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ background: '#8c1524', borderColor: '#8c1524' }}
          onClick={() => setCreateDeliveryModalOpen(true)}
        >
          Tạo Chuyến Giao Mới
        </Button>
      }
    >
      <Alert
        message="Giá trị pháp lý của Ảnh PoD (Module 7 - Feature #20)"
        description="Ảnh chụp kiện hàng nguyên vẹn kèm chữ ký bên nhận có gắn nhãn thời gian timestamp tự động là bằng chứng pháp lý giải phóng tiền ký quỹ Escrow và bảo vệ nhà cung cấp trước các khiếu nại trễ hạn."
        type="info"
        showIcon
        style={{ marginBottom: 20 }}
      />

      <Card bordered={false} style={{ borderRadius: 10 }}>
        <Table columns={columns} dataSource={deliveries} pagination={false} />
      </Card>

      {/* Modal PoD Photos */}
      {selectedDelivery && (
        <Modal
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CameraOutlined style={{ color: '#8c1524' }} />
              <span>Xác Minh Giao Nhận Bằng Ảnh (PoD): {selectedDelivery.deliveryCode}</span>
            </div>
          }
          open={podModalOpen}
          onCancel={() => setPodModalOpen(false)}
          onOk={handleUploadPoDProof}
          okText="Lưu & Xác Nhận Giao Thành Công"
          width={650}
        >
          <Descriptions bordered size="small" column={2} style={{ margin: '16px 0' }}>
            <Descriptions.Item label="Người Nhận">{selectedDelivery.recipientName}</Descriptions.Item>
            <Descriptions.Item label="Mã Tracking">{selectedDelivery.trackingCode}</Descriptions.Item>
            <Descriptions.Item label="Địa Chỉ Giao" span={2}>{selectedDelivery.destination}</Descriptions.Item>
          </Descriptions>

          <div style={{ background: '#fafafa', padding: 16, borderRadius: 8 }}>
            <Text strong style={{ display: 'block', marginBottom: 12 }}>
              Các Ảnh Bằng Chứng Đã Tải Lên (PoD Gallery):
            </Text>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              {selectedDelivery.proofPhotos.map((photo, i) => (
                <div
                  key={i}
                  style={{
                    width: 120,
                    height: 90,
                    border: '1px solid #ddd',
                    borderRadius: 6,
                    background: '#eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    color: '#666',
                    textAlign: 'center',
                    padding: 4,
                  }}
                >
                  📷 {photo} (Có GPS & Timestamp)
                </div>
              ))}
            </div>

            <Text strong style={{ display: 'block', marginBottom: 8 }}>
              Tải Lên Ảnh Giao Hàng Thành Công (Kiện hàng + Chữ ký người nhận):
            </Text>
            <Upload maxCount={2}>
              <Button icon={<UploadOutlined />}>Tải Ảnh Bằng Chứng Giao Nhận</Button>
            </Upload>
          </div>
        </Modal>
      )}

      {/* Modal Create Delivery */}
      <Modal
        title="Tạo Chuyến Giao Hàng Mới (Cho Hợp Đồng)"
        open={createDeliveryModalOpen}
        onCancel={() => setCreateDeliveryModalOpen(false)}
        onOk={() => {
          message.success('Đã tạo chuyến giao hàng thành công!');
          setCreateDeliveryModalOpen(false);
        }}
        okText="Tạo Chuyến Giao"
      >
        <Form layout="vertical">
          <Form.Item label="Hợp Đồng Thực Hiện" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'HD-2025-08910', label: 'HD-2025-08910 (Tập đoàn Vingroup - 500 hộp)' },
                { value: 'HD-2025-08880', label: 'HD-2025-08880 (FPT Software - 2500 hộp)' },
              ]}
            />
          </Form.Item>
          <Form.Item label="Hình Thức Vận Chuyển" rules={[{ required: true }]}>
            <Select
              defaultValue="self_arranged"
              options={[
                { value: 'self_arranged', label: 'Xưởng tự vận chuyển (Xe tải chuyên dụng xưởng)' },
                { value: 'platform_managed', label: 'Ủy thác sàn giao nhận (GHTK / Viettel Post B2B)' },
              ]}
            />
          </Form.Item>
          <Form.Item label="Mã Số Tracking / Biển Số Xe" rules={[{ required: true }]}>
            <Input placeholder="VD: 29C-889.90 hoặc GHTK-B2B-12345" />
          </Form.Item>
        </Form>
      </Modal>
    </ColonyAdminLayout>
  );
}
