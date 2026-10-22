import { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Tag,
  Space,
  Input,
  Drawer,
  Form,
  InputNumber,
  message,
  Typography,
  Alert,
  Descriptions,
  Badge,
  Row,
  Col,
} from 'antd';
import {
  SolutionOutlined,
  SendOutlined,
  EyeOutlined,
  LockOutlined,
  CalendarOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';

const { Text, Title } = Typography;
const { TextArea } = Input;

export default function BiddingPage({ onNavigate }) {
  const [bidDrawerOpen, setBidDrawerOpen] = useState(false);
  const [selectedRfq, setSelectedRfq] = useState(null);
  const [bidForm] = Form.useForm();

  // RFQ Invitations Mock Data
  const [rfqList, setRfqList] = useState([
    {
      key: '1',
      rfqNo: 'RFQ-2025-08910',
      title: 'Gói thầu Quà tặng Trung Thu Doanh Nghiệp VVIP (Set Sơn Mài 4 Bánh)',
      buyerCompany: 'Tập đoàn Vingroup (Khối Nhân sự)',
      totalQty: 500,
      targetPrice: '650.000 ₫ / hộp',
      budgetRange: '300.000.000 ₫ - 350.000.000 ₫',
      deliveryDateExpected: '2025-08-25',
      deadline: '2025-08-16 18:00',
      items: [
        { itemName: 'Hộp Sơn Mài 4 Bánh Nướng Thập Cẩm & Trà VIP', qty: 300, unit: 'hộp' },
        { itemName: 'Hộp Sơn Mài 4 Bánh Dẻo Hương Sen Cao Cấp', qty: 200, unit: 'hộp' },
      ],
      myBidStatus: 'drafting', // 'none' | 'drafting' | 'submitted' | 'accepted' | 'cancelled'
    },
    {
      key: '2',
      rfqNo: 'RFQ-2025-08925',
      title: 'Đơn hàng Bánh Trung Thu Tri Ân Khách Hàng Thân Thiết Masan',
      buyerCompany: 'Masan Consumer Corporation',
      totalQty: 1200,
      targetPrice: '280.000 ₫ / hộp',
      budgetRange: '320.000.000 ₫ - 350.000.000 ₫',
      deliveryDateExpected: '2025-08-28',
      deadline: '2025-08-18 12:00',
      items: [
        { itemName: 'Hộp Giấy Mỹ Thuật 4 Bánh Nướng Hạt Sen & Đậu Xanh', qty: 1200, unit: 'hộp' },
      ],
      myBidStatus: 'submitted',
    },
    {
      key: '3',
      rfqNo: 'RFQ-2025-08880',
      title: 'Gói Bánh Trung Thu Phúc Lộc Thọ Cán Bộ Nhân Viên FPT Software',
      buyerCompany: 'Công ty Cổ phần Phần Mềm FPT',
      totalQty: 2500,
      targetPrice: '200.000 ₫ / hộp',
      budgetRange: '480.000.000 ₫ - 520.000.000 ₫',
      deliveryDateExpected: '2025-09-02',
      deadline: '2025-08-15 17:00',
      items: [
        { itemName: 'Bánh Nướng Thập Cẩm 150g (Đóng hộp quà in logo FPT)', qty: 2500, unit: 'hộp' },
      ],
      myBidStatus: 'accepted',
    },
  ]);

  const handleOpenBid = (record) => {
    setSelectedRfq(record);
    bidForm.resetFields();
    setBidDrawerOpen(true);
  };

  const handleSubmitBid = (values) => {
    setRfqList((prev) =>
      prev.map((rfq) => (rfq.key === selectedRfq.key ? { ...rfq, myBidStatus: 'submitted' } : rfq))
    );
    message.success(
      `Đã nộp thành công Hồ Sơ Chào Giá (Bid) cho phiên ${selectedRfq.rfqNo}! Báo giá đã được niêm phong theo cơ chế Sealed-Bid an toàn.`
    );
    setBidDrawerOpen(false);
  };

  const columns = [
    {
      title: 'Mã RFQ',
      dataIndex: 'rfqNo',
      key: 'rfqNo',
      width: 150,
      render: (no) => <span style={{ fontWeight: 600, color: '#1677ff' }}>{no}</span>,
    },
    {
      title: 'Tên Gói Thầu & Doanh Nghiệp Mời',
      dataIndex: 'title',
      key: 'title',
      render: (t, r) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1f1f1f' }}>{t}</div>
          <div style={{ fontSize: 12, color: '#666' }}>Doanh nghiệp: <strong>{r.buyerCompany}</strong></div>
        </div>
      ),
    },
    {
      title: 'Tổng Số Lượng',
      dataIndex: 'totalQty',
      key: 'totalQty',
      align: 'center',
      render: (qty) => <Tag color="purple">{qty.toLocaleString()} hộp</Tag>,
    },
    {
      title: 'Ngân Sách Mục Tiêu',
      dataIndex: 'budgetRange',
      key: 'budgetRange',
      render: (b) => <span style={{ color: '#8c1524', fontWeight: 600 }}>{b}</span>,
    },
    {
      title: 'Hạn Chót Nộp Bid',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (d) => <Tag color="orange" icon={<CalendarOutlined />}>{d}</Tag>,
    },
    {
      title: 'Trạng Thái Báo Giá Của Bạn',
      dataIndex: 'myBidStatus',
      key: 'myBidStatus',
      render: (s) => {
        if (s === 'submitted') return <Tag color="processing">✓ Đã nộp báo giá</Tag>;
        if (s === 'accepted') return <Tag color="success">★ Trúng thầu (Awarded)</Tag>;
        if (s === 'cancelled') return <Tag color="default">Không trúng thầu</Tag>;
        return <Tag color="warning">Chưa gửi báo giá</Tag>;
      },
    },
    {
      title: 'Thao Tác',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={record.myBidStatus === 'submitted' ? <EyeOutlined /> : <SendOutlined />}
          style={{
            background: record.myBidStatus === 'submitted' ? '#2c3e50' : '#8c1524',
            borderColor: record.myBidStatus === 'submitted' ? '#2c3e50' : '#8c1524',
          }}
          onClick={() => handleOpenBid(record)}
        >
          {record.myBidStatus === 'submitted' ? 'Xem Báo Giá' : 'Soạn Báo Giá'}
        </Button>
      ),
    },
  ];

  return (
    <ColonyAdminLayout
      role="Supplier"
      activeKey="nha-cung-cap/dau-thau"
      onNavigate={onNavigate}
      title="Đấu Thầu RFQ, Hộp Thư Lời Mời & Soạn Báo Giá (Bidding)"
      subtitle="Tham gia các gói thầu bánh trung thu doanh nghiệp lớn, gửi báo giá niêm phong và theo dõi kết quả trúng thầu"
    >
      <Alert
        message="Cơ chế Bảo mật Báo giá Niêm phong (Sealed Bid)"
        description="Mọi báo giá của xưởng được mã hóa và bảo mật tuyệt đối, các nhà cung cấp khác không thể xem được giá của nhau. Khi Bên Mua accept báo giá, hệ thống sẽ tự động kích hoạt luồng Ký Hợp Đồng Điện Tử và đặt cọc M1."
        type="info"
        showIcon
        icon={<LockOutlined />}
        style={{ marginBottom: 20 }}
      />

      <Card bordered={false} style={{ borderRadius: 10 }}>
        <Table columns={columns} dataSource={rfqList} pagination={{ pageSize: 6 }} />
      </Card>

      {/* Drawer Soạn Báo Giá Bid */}
      {selectedRfq && (
        <Drawer
          title={
            <div>
              <div style={{ fontSize: 13, color: '#888' }}>Mã RFQ: {selectedRfq.rfqNo}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#1f1f1f' }}>
                Hồ Sơ Chào Giá (Bid) - {selectedRfq.buyerCompany}
              </div>
            </div>
          }
          width={640}
          open={bidDrawerOpen}
          onClose={() => setBidDrawerOpen(false)}
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <Button onClick={() => setBidDrawerOpen(false)}>Đóng</Button>
              {selectedRfq.myBidStatus !== 'submitted' && (
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  style={{ background: '#8c1524', borderColor: '#8c1524' }}
                  onClick={() => bidForm.submit()}
                >
                  Gửi Báo Giá Niêm Phong
                </Button>
              )}
            </div>
          }
        >
          <Descriptions bordered size="small" column={1} style={{ marginBottom: 20 }}>
            <Descriptions.Item label="Gói Thầu">{selectedRfq.title}</Descriptions.Item>
            <Descriptions.Item label="Ngày Cần Giao">{selectedRfq.deliveryDateExpected}</Descriptions.Item>
            <Descriptions.Item label="Hạn Chót Báo Giá">{selectedRfq.deadline}</Descriptions.Item>
            <Descriptions.Item label="Danh Mục Hàng Hóa Cần Báo Giá">
              {selectedRfq.items.map((item, idx) => (
                <div key={idx} style={{ padding: '4px 0' }}>
                  • <strong>{item.itemName}</strong> - Số lượng: <strong>{item.qty} {item.unit}</strong>
                </div>
              ))}
            </Descriptions.Item>
          </Descriptions>

          <Form
            form={bidForm}
            layout="vertical"
            initialValues={{
              unitPrice: 620000,
              validityDays: 14,
              deliveryLeadTimeDays: 7,
              specialNotes: 'Bao gồm hộp sơn mài cao cấp, miễn phí in logo doanh nghiệp dập nổi và giao hàng tận nơi tại trụ sở Vingroup.',
            }}
            onFinish={handleSubmitBid}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="unitPrice"
                  label="Đơn Giá Đề Xuất (VNĐ / Hộp)"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    min={50000}
                    step={10000}
                    formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(v) => v.replace(/\$\s?|(,*)/g, '')}
                    addonAfter="₫"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="validityDays"
                  label="Thời Hạn Hiệu Lực Báo Giá"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={7} max={30} addonAfter="ngày" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="deliveryLeadTimeDays"
                  label="Thời Gian Sản Xuất & Giao Hàng"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={3} max={30} addonAfter="ngày sau cọc M1" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <div style={{ background: '#fff9f9', padding: '10px 14px', borderRadius: 8, marginTop: 4 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>Tổng giá trị báo giá dự kiến:</Text>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#8c1524' }}>
                    {(selectedRfq.totalQty * 620000).toLocaleString('vi-VN')} ₫
                  </div>
                </div>
              </Col>
            </Row>

            <Form.Item name="specialNotes" label="Cam Kết Về Chất Lượng / Ưu Đãi Đóng Gói Kèm Theo">
              <TextArea rows={4} placeholder="Cam kết chứng chỉ ATTP, mẫu thử miễn phí, hỗ trợ in ấn logo theo chuẩn nhận diện..." />
            </Form.Item>
          </Form>
        </Drawer>
      )}
    </ColonyAdminLayout>
  );
}
