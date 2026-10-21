import { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Select,
  Row,
  Col,
  Descriptions,
  message,
  Typography,
  Alert,
  Tabs,
} from 'antd';
import {
  SolutionOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function BiddingAndQuoteComparison({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('rfqs');
  const [createRfqModalOpen, setCreateRfqModalOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [selectedRfq, setSelectedRfq] = useState(null);
  const [rfqForm] = Form.useForm();

  // RFQ List Mock Data
  const [rfqs, setRfqs] = useState([
    {
      key: '1',
      rfqNo: 'RFQ-2025-08910',
      title: 'Gói thầu Quà tặng Trung Thu Doanh Nghiệp VVIP (500 Hộp Sơn Mài)',
      totalQty: 500,
      deliveryDateExpected: '2025-08-25',
      budgetRange: '300.000.000 ₫ - 350.000.000 ₫',
      status: 'open', // 'open' | 'awarded' | 'closed'
      bidsCount: 3,
      bids: [
        {
          id: 'BID-001',
          supplierName: 'Xưởng Bánh Tràng An Nghệ Nhân',
          reputationScore: 98,
          badge: 'Đối Tác Vàng',
          quotedPricePerUnit: 620000,
          totalPrice: '310.000.000 ₫',
          deliveryDays: 7,
          validityDays: 14,
          notes: 'Miễn phí in logo doanh nghiệp mạ vàng trên nắp hộp sơn mài. Tặng kèm trà Ô Long thượng hạng.',
          status: 'submitted',
        },
        {
          id: 'BID-002',
          supplierName: 'Hữu Nghị Luxury Mooncake',
          reputationScore: 95,
          badge: 'Đối Tác Vàng',
          quotedPricePerUnit: 640000,
          totalPrice: '320.000.000 ₫',
          deliveryDays: 8,
          validityDays: 10,
          notes: 'Hộp sơn mài cao cấp khóa đồng, chứng nhận ISO 22000.',
          status: 'submitted',
        },
        {
          id: 'BID-003',
          supplierName: 'Bảo Phương Gia Truyền Thụy Khuê',
          reputationScore: 97,
          badge: 'Đối Tác Vàng',
          quotedPricePerUnit: 610000,
          totalPrice: '305.000.000 ₫',
          deliveryDays: 10,
          validityDays: 7,
          notes: 'Bánh tươi thủ công truyền thống, hạn sử dụng 25 ngày.',
          status: 'submitted',
        },
      ],
    },
    {
      key: '2',
      rfqNo: 'RFQ-2025-08700',
      title: 'Đơn Hàng 1.200 Bánh Trung Thu Phổ Thông Cán Bộ Công Nhân Viên',
      totalQty: 1200,
      deliveryDateExpected: '2025-08-28',
      budgetRange: '180.000.000 ₫ - 200.000.000 ₫',
      status: 'awarded',
      bidsCount: 4,
      bids: [],
    },
  ]);

  const handleCreateRfq = (values) => {
    const newRfq = {
      key: `${Date.now()}`,
      rfqNo: `RFQ-2025-${Math.floor(10000 + Math.random() * 90000)}`,
      title: values.title,
      totalQty: values.totalQty,
      deliveryDateExpected: values.deliveryDate.format('YYYY-MM-DD'),
      budgetRange: `${values.budgetMin.toLocaleString()} ₫ - ${values.budgetMax.toLocaleString()} ₫`,
      status: 'open',
      bidsCount: 0,
      bids: [],
    };

    setRfqs([newRfq, ...rfqs]);
    message.success(`Đã tạo và phát hành yêu cầu báo giá ${newRfq.rfqNo} thành công! Các nhà cung cấp uy tín đã được mời chào giá.`);
    setCreateRfqModalOpen(false);
  };

  const handleOpenCompare = (rfq) => {
    setSelectedRfq(rfq);
    setCompareModalOpen(true);
  };

  const handleAcceptBid = (bid) => {
    // Feature #13: Accept 1 bid, automatically cancel other bids, award RFQ, trigger Contract Draft and M1 Deposit
    setRfqs((prev) =>
      prev.map((r) =>
        r.key === selectedRfq.key
          ? {
              ...r,
              status: 'awarded',
              bids: r.bids.map((b) =>
                b.id === bid.id ? { ...b, status: 'accepted' } : { ...b, status: 'cancelled' }
              ),
            }
          : r
      )
    );

    message.success(
      `Đã chấp thuận báo giá của "${bid.supplierName}"! Hệ thống đã tạo Hợp Đồng Điện Tử và hủy các báo giá còn lại. Vui lòng ký hợp đồng và đặt cọc M1.`
    );
    setCompareModalOpen(false);
    onNavigate?.('hop-dong-tien-do');
  };

  const rfqColumns = [
    {
      title: 'Mã RFQ',
      dataIndex: 'rfqNo',
      key: 'rfqNo',
      width: 150,
      render: (no) => <span style={{ fontWeight: 600, color: '#1677ff' }}>{no}</span>,
    },
    {
      title: 'Tiêu Đề Yêu Cầu Báo Giá',
      dataIndex: 'title',
      key: 'title',
      render: (t) => <strong>{t}</strong>,
    },
    {
      title: 'Số Lượng',
      dataIndex: 'totalQty',
      key: 'totalQty',
      align: 'center',
      render: (q) => <Tag color="purple">{q.toLocaleString()} hộp</Tag>,
    },
    {
      title: 'Ngân Sách Dự Kiến',
      dataIndex: 'budgetRange',
      key: 'budgetRange',
      render: (b) => <span style={{ color: '#8c1524', fontWeight: 600 }}>{b}</span>,
    },
    {
      title: 'Ngày Cần Giao',
      dataIndex: 'deliveryDateExpected',
      key: 'deliveryDateExpected',
    },
    {
      title: 'Số Báo Giá Nhận Được',
      dataIndex: 'bidsCount',
      key: 'bidsCount',
      align: 'center',
      render: (cnt) => <Tag color={cnt > 0 ? 'volcano' : 'default'}>{cnt} Báo giá (Bids)</Tag>,
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) =>
        status === 'open' ? (
          <Tag color="processing">Đang mở nhận thầu</Tag>
        ) : (
          <Tag color="success">Đã chọn NCC (Awarded)</Tag>
        ),
    },
    {
      title: 'Thao Tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {record.bidsCount > 0 ? (
            <Button
              type="primary"
              size="small"
              icon={<SolutionOutlined />}
              style={{ background: '#8c1524', borderColor: '#8c1524' }}
              onClick={() => handleOpenCompare(record)}
            >
              So Sánh Báo Giá
            </Button>
          ) : (
            <Tag>Chờ nộp bid</Tag>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ background: '#f5f5f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CustomerHeader activeKey="so-sanh-bao-gia" onNavigate={onNavigate} />

      <main style={{ maxWidth: 1440, margin: '24px auto', padding: '0 20px', flex: 1, width: '100%' }}>
        {/* Banner Header */}
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
              Quản Lý Yêu Cầu Báo Giá (RFQ) & So Sánh Báo Giá Đấu Thầu
            </h1>
            <p style={{ margin: '4px 0 0', color: '#666', fontSize: 13 }}>
              Tạo hồ sơ mời thầu B2B, nhận báo giá cạnh tranh từ các xưởng bánh uy tín và đối chiếu so sánh side-by-side
            </p>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            style={{ background: '#8c1524', borderColor: '#8c1524', fontWeight: 600 }}
            onClick={() => {
              rfqForm.resetFields();
              setCreateRfqModalOpen(true);
            }}
          >
            + Tạo Yêu Cầu Báo Giá Mới (RFQ)
          </Button>
        </div>

        <Alert
          message="Cơ chế Chốt Báo Giá Tự Động (Module 5 - Feature #13)"
          description="Doanh nghiệp xem xét các báo giá nộp lên và bấm Chấp Thuận 1 báo giá tốt nhất. Hệ thống sẽ tự động gán status Awarded cho RFQ, tự động hủy các bid khác, sinh Hợp đồng điện tử và yêu cầu thanh toán đặt cọc M1 (30%) để bảo chứng giao dịch."
          type="info"
          showIcon
          style={{ marginBottom: 20 }}
        />

        <Card bordered={false} style={{ borderRadius: 10 }}>
          <Table columns={rfqColumns} dataSource={rfqs} pagination={false} />
        </Card>

        {/* Modal Tạo RFQ */}
        <Modal
          title="Tạo Yêu Cầu Báo Giá (RFQ) Cho Doanh Nghiệp"
          open={createRfqModalOpen}
          onCancel={() => setCreateRfqModalOpen(false)}
          onOk={() => rfqForm.submit()}
          okText="Phát Hành RFQ Mời Thầu"
          okButtonProps={{ style: { background: '#8c1524', borderColor: '#8c1524' } }}
          width={700}
        >
          <Form form={rfqForm} layout="vertical" onFinish={handleCreateRfq}>
            <Form.Item name="title" label="Tiêu Đề Nhu Cầu Gói Thầu" rules={[{ required: true }]}>
              <Input placeholder="VD: Gói Quà Trung Thu 800 Hộp Tri Ân Khách Hàng Thân Thiết..." />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="totalQty" label="Số Lượng Dự Kiến (Hộp)" rules={[{ required: true }]}>
                  <InputNumber min={20} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="deliveryDate" label="Ngày Cần Giao Hàng" rules={[{ required: true }]}>
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="budgetMin" label="Ngân Sách Tối Thiểu (VNĐ)" rules={[{ required: true }]}>
                  <InputNumber min={1000000} step={1000000} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="budgetMax" label="Ngân Sách Tối Đa (VNĐ)" rules={[{ required: true }]}>
                  <InputNumber min={1000000} step={1000000} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="specifications" label="Yêu Cầu Kỹ Thuật & Quy Cách Đóng Gói / In Logo">
              <TextArea rows={3} placeholder="Yêu cầu hộp sơn mài, logo ép kim vàng, kèm thiệp chúc mừng, bánh có chứng nhận ATTP..." />
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal So Sánh Báo Giá Side-by-Side (Feature #13) */}
        {selectedRfq && (
          <Modal
            title={
              <div>
                <span style={{ fontSize: 16, fontWeight: 700 }}>
                  Bảng So Sánh Báo Giá Chi Tiết: {selectedRfq.rfqNo}
                </span>
                <div style={{ fontSize: 12, color: '#666' }}>{selectedRfq.title}</div>
              </div>
            }
            open={compareModalOpen}
            onCancel={() => setCompareModalOpen(false)}
            width={900}
            footer={null}
          >
            <div style={{ margin: '16px 0' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${selectedRfq.bids.length}, 1fr)`,
                  gap: 16,
                }}
              >
                {selectedRfq.bids.map((bid) => (
                  <Card
                    key={bid.id}
                    bordered={false}
                    style={{
                      background: '#fffcf7',
                      border: bid.status === 'accepted' ? '2px solid #2e7d32' : '1px solid #ebdcd5',
                      borderRadius: 10,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div style={{ textAlign: 'center', marginBottom: 12 }}>
                      <Tag color="gold" icon={<SafetyCertificateOutlined />}>
                        {bid.badge} ({bid.reputationScore}đ)
                      </Tag>
                      <h3 style={{ margin: '8px 0 4px', fontSize: 15, color: '#1f1f1f' }}>
                        {bid.supplierName}
                      </h3>
                      <div style={{ fontSize: 22, fontWeight: 700, color: '#8c1524' }}>
                        {bid.quotedPricePerUnit.toLocaleString('vi-VN')} ₫
                        <span style={{ fontSize: 12, fontWeight: 400, color: '#666' }}> / hộp</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#888' }}>
                        Tổng giá trị: <strong>{bid.totalPrice}</strong>
                      </div>
                    </div>

                    <Descriptions size="small" column={1} bordered style={{ marginBottom: 12 }}>
                      <Descriptions.Item label="Thời Gian Sản Xuất">
                        {bid.deliveryDays} ngày
                      </Descriptions.Item>
                      <Descriptions.Item label="Hiệu Lực Giá">
                        {bid.validityDays} ngày
                      </Descriptions.Item>
                      <Descriptions.Item label="Ưu Đãi Kèm Theo">
                        <span style={{ fontSize: 12 }}>{bid.notes}</span>
                      </Descriptions.Item>
                    </Descriptions>

                    {selectedRfq.status === 'open' ? (
                      <Button
                        type="primary"
                        block
                        icon={<CheckCircleOutlined />}
                        style={{ background: '#2e7d32', borderColor: '#2e7d32', fontWeight: 600 }}
                        onClick={() => handleAcceptBid(bid)}
                      >
                        Chấp Thuận Báo Giá Này
                      </Button>
                    ) : bid.status === 'accepted' ? (
                      <Tag color="success" style={{ width: '100%', textAlign: 'center', padding: '6px 0', fontSize: 13 }}>
                        ✓ Đã trúng thầu
                      </Tag>
                    ) : (
                      <Tag color="default" style={{ width: '100%', textAlign: 'center', padding: '6px 0' }}>
                        Đã đóng thầu
                      </Tag>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </Modal>
        )}
      </main>
    </div>
  );
}
