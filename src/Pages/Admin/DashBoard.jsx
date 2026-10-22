import { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Tag,
  Button,
  Tabs,
  Alert,
  Progress,
  Space,
  Badge,
  Typography,
} from 'antd';
import {
  DollarOutlined,
  SafetyCertificateOutlined,
  FileDoneOutlined,
  AlertOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ThunderboltOutlined,
  FilePdfOutlined,
  EyeOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';

const { Text } = Typography;

export default function DashBoard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('campaign');

  // Sample data for Top Suppliers Table
  const topSuppliersData = [
    {
      key: '1',
      rank: 1,
      name: 'Xưởng Bánh Tràng An Nghệ Nhân',
      taxCode: '0108928371',
      ordersCount: 48,
      gmv: '8.450.000.000 ₫',
      onTimeRate: 98.5,
      score: 98,
      status: 'verified',
    },
    {
      key: '2',
      rank: 2,
      name: 'Bánh Trung Thu Hữu Nghị Luxury',
      taxCode: '0102345678',
      ordersCount: 42,
      gmv: '7.120.000.000 ₫',
      onTimeRate: 96.0,
      score: 95,
      status: 'verified',
    },
    {
      key: '3',
      rank: 3,
      name: 'Bảo Phương Gia Truyền Thụy Khuê',
      taxCode: '0103456789',
      ordersCount: 35,
      gmv: '5.890.000.000 ₫',
      onTimeRate: 99.0,
      score: 97,
      status: 'verified',
    },
    {
      key: '4',
      rank: 4,
      name: 'Mondelēz Kinh Đô Doanh Nghiệp',
      taxCode: '0301122334',
      ordersCount: 56,
      gmv: '12.400.000.000 ₫',
      onTimeRate: 94.2,
      score: 92,
      status: 'verified',
    },
  ];

  const topSuppliersColumns = [
    {
      title: 'Hạng',
      dataIndex: 'rank',
      key: 'rank',
      width: 60,
      render: (rank) => (
        <Badge
          count={rank}
          style={{
            backgroundColor: rank === 1 ? '#f5222d' : rank === 2 ? '#fa8c16' : rank === 3 ? '#faad14' : '#d9d9d9',
          }}
        />
      ),
    },
    {
      title: 'Nhà Cung Cấp / Xưởng',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1f1f1f' }}>{text}</div>
          <div style={{ fontSize: 11, color: '#888' }}>MST: {record.taxCode}</div>
        </div>
      ),
    },
    {
      title: 'Số Đơn HĐ',
      dataIndex: 'ordersCount',
      key: 'ordersCount',
      align: 'right',
    },
    {
      title: 'Doanh Số GMV',
      dataIndex: 'gmv',
      key: 'gmv',
      align: 'right',
      render: (gmv) => <span style={{ fontWeight: 600, color: '#8c1524' }}>{gmv}</span>,
    },
    {
      title: 'Giao Đúng Hạn',
      dataIndex: 'onTimeRate',
      key: 'onTimeRate',
      render: (rate) => (
        <div style={{ width: 120 }}>
          <Progress percent={rate} size="small" strokeColor={rate >= 95 ? '#2e7d32' : '#faad14'} />
        </div>
      ),
    },
    {
      title: 'Điểm Uy Tín',
      dataIndex: 'score',
      key: 'score',
      render: (score) => (
        <Tag color="gold" style={{ fontWeight: 700 }}>
          {score}/100 ★
        </Tag>
      ),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: () => (
        <Button
          type="link"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => onNavigate?.('admin/dieu-khien')}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  // Escrow Table Data
  const escrowData = [
    {
      key: '1',
      contractNo: 'HD-2025-001',
      buyer: 'Tập đoàn Vingroup',
      seller: 'Xưởng Tràng An',
      totalValue: '1.250.000.000 ₫',
      depositM1: '375.000.000 ₫ (30%)',
      escrowStatus: 'Đã nhận cọc',
      milestone: 'M2: Giao hàng 50%',
    },
    {
      key: '2',
      contractNo: 'HD-2025-004',
      buyer: 'Ngân hàng Techcombank',
      seller: 'Hữu Nghị Luxury',
      totalValue: '2.800.000.000 ₫',
      depositM1: '840.000.000 ₫ (30%)',
      escrowStatus: 'Đã nhận cọc',
      milestone: 'M3: Nghiệm thu hoàn tất',
    },
    {
      key: '3',
      contractNo: 'HD-2025-012',
      buyer: 'Tập đoàn Masan',
      seller: 'Bảo Phương Gia Truyền',
      totalValue: '750.000.000 ₫',
      depositM1: '225.000.000 ₫ (30%)',
      escrowStatus: 'Chờ thanh toán M1',
      milestone: 'M1: Đặt cọc kích hoạt',
    },
  ];

  const escrowColumns = [
    {
      title: 'Mã Hợp Đồng',
      dataIndex: 'contractNo',
      key: 'contractNo',
      render: (text) => <span style={{ fontWeight: 600, color: '#1677ff' }}>{text}</span>,
    },
    {
      title: 'Bên Mua (Customer)',
      dataIndex: 'buyer',
      key: 'buyer',
    },
    {
      title: 'Bên Bán (Supplier)',
      dataIndex: 'seller',
      key: 'seller',
    },
    {
      title: 'Tổng Giá Trị HĐ',
      dataIndex: 'totalValue',
      key: 'totalValue',
      align: 'right',
      render: (val) => <span style={{ fontWeight: 600 }}>{val}</span>,
    },
    {
      title: 'Tiền Cọc M1 (Bắt buộc)',
      dataIndex: 'depositM1',
      key: 'depositM1',
      align: 'right',
      render: (val) => <span style={{ color: '#8c1524', fontWeight: 600 }}>{val}</span>,
    },
    {
      title: 'Trạng Thái Ký Quỹ',
      dataIndex: 'escrowStatus',
      key: 'escrowStatus',
      render: (status) => (
        <Tag color={status.includes('Đã nhận') ? 'success' : 'warning'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Tiến Độ Hiện Tại',
      dataIndex: 'milestone',
      key: 'milestone',
      render: (m) => <Tag color="blue">{m}</Tag>,
    },
  ];

  return (
    <ColonyAdminLayout
      role="Admin"
      activeKey="admin/dashboard"
      onNavigate={onNavigate}
      title="Dashboard Điều Hành Toàn Nền Tảng"
      subtitle="Giám sát bảo chứng giao dịch Escrow, năng lực chuỗi cung ứng xưởng bánh và dòng chảy hợp đồng B2B Mùa Vụ Trung Thu 2025"
      extra={
        <Space>
          <Button icon={<FilePdfOutlined />}>Xuất Báo Cáo PDF</Button>
          <Button
            type="primary"
            icon={<ThunderboltOutlined />}
            style={{ background: '#8c1524', borderColor: '#8c1524' }}
            onClick={() => setActiveTab('ai-insights')}
          >
            Tạo Báo Cáo AI Live
          </Button>
        </Space>
      }
    >
      {/* Alert Banner for Operations */}
      <Alert
        message="Hệ thống vận hành an toàn 99.98% • Quỹ Escrow Pool bảo chứng 42.8 Tỷ VNĐ"
        description="Có 04 hồ sơ nhà cung cấp mới cần thẩm định chứng nhận ISO/ATTP và 02 yêu cầu giải quyết tranh chấp mốc giao hàng."
        type="info"
        showIcon
        closable
        style={{ marginBottom: 20 }}
      />

      {/* Colony Stat Cards Grid */}
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {/* Card 1: GMV */}
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 10, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text type="secondary" style={{ fontSize: 13 }}>Tổng GMV Mùa Vụ</Text>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#8c1524', marginTop: 4 }}>
                  42.8 Tỷ ₫
                </div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: '#fff1f0',
                  color: '#8c1524',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                <DollarOutlined />
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              <Tag color="success" style={{ margin: 0 }}>
                <ArrowUpOutlined /> +18.4%
              </Tag>
              <Text type="secondary">so với tuần trước</Text>
            </div>
          </Card>
        </Col>

        {/* Card 2: Pending Suppliers */}
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 10, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text type="secondary" style={{ fontSize: 13 }}>NCC Chờ Thẩm Định</Text>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#fa8c16', marginTop: 4 }}>
                  04 Hồ sơ
                </div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: '#fff7e6',
                  color: '#fa8c16',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                <SafetyCertificateOutlined />
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: '#cf1322', fontWeight: 600 }}>Cần xử lý trong 24h</span>
              <Button type="link" size="small" style={{ padding: 0 }} onClick={() => onNavigate?.('admin/phe-duyet')}>
                Thẩm định ngay →
              </Button>
            </div>
          </Card>
        </Col>

        {/* Card 3: Active Contracts */}
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 10, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text type="secondary" style={{ fontSize: 13 }}>Hợp Đồng B2B Đang Chạy</Text>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#1677ff', marginTop: 4 }}>
                  128 Hợp đồng
                </div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: '#e6f4ff',
                  color: '#1677ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                <FileDoneOutlined />
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              <Tag color="blue" style={{ margin: 0 }}>
                100% Đã Ký OTP
              </Tag>
              <Text type="secondary">38.2 Tỷ VNĐ</Text>
            </div>
          </Card>
        </Col>

        {/* Card 4: Disputes / Risk */}
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 10, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text type="secondary" style={{ fontSize: 13 }}>Tranh Chấp & Khiếu Nại</Text>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#cf1322', marginTop: 4 }}>
                  02 Vụ việc
                </div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: '#fff1f0',
                  color: '#cf1322',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                <AlertOutlined />
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: '#cf1322' }}>Đóng băng 1.25 Tỷ Escrow</span>
              <Button type="link" size="small" style={{ padding: 0 }} onClick={() => onNavigate?.('admin/van-hanh-giao-dich')}>
                Phân xử →
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Main Tabs Area */}
      <Card bordered={false} style={{ borderRadius: 10, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'campaign',
              label: '🏆 Bảng Xếp Hạng Xưởng Bánh (Top Suppliers)',
              children: (
                <div>
                  <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong>Top 4 nhà cung cấp dẫn đầu doanh số & tỷ lệ giao đúng hạn</Text>
                    <Button type="primary" size="small" onClick={() => onNavigate?.('admin/dieu-khien')}>
                      Xem toàn bộ 158 NCC
                    </Button>
                  </div>
                  <Table
                    columns={topSuppliersColumns}
                    dataSource={topSuppliersData}
                    pagination={false}
                    size="middle"
                  />
                </div>
              ),
            },
            {
              key: 'escrow',
              label: '🛡️ Sổ Giám Sát Ký Quỹ Escrow & Milestone',
              children: (
                <div>
                  <Alert
                    message="Quy tắc bảo chứng hợp đồng (Milestone Deposit Rule)"
                    description="Khách hàng bắt buộc thanh toán đặt cọc mốc M1 (30%) vào tài khoản Escrow sàn trước khi Hợp đồng chuyển sang trạng thái Active và NCC bắt đầu sản xuất."
                    type="success"
                    showIcon
                    style={{ marginBottom: 16 }}
                  />
                  <Table
                    columns={escrowColumns}
                    dataSource={escrowData}
                    pagination={false}
                    size="middle"
                  />
                </div>
              ),
            },
            {
              key: 'ai-insights',
              label: '✨ Báo Cáo AI Analytics (Natural Language Insights)',
              children: (
                <div style={{ padding: '8px 0' }}>
                  <Alert
                    message="Báo cáo được tổng hợp tự động từ mô hình LLM API dựa trên 1.240 giao dịch thực tế"
                    type="info"
                    showIcon
                    style={{ marginBottom: 20 }}
                  />
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <Card
                        title="📈 Xu hướng thị hiếu B2B 2025"
                        size="small"
                        style={{ background: '#fafafa' }}
                      >
                        <p>
                          • Nhu cầu dòng bánh <strong>Hộp Sơn Mài VIP</strong> in logo mạ kim loại tăng <strong>+42%</strong> so với vụ 2024.
                        </p>
                        <p>
                          • Nhân bánh <strong>Ít ngọt / Đường ăn kiêng Isomalt</strong> chiếm tỷ trọng 38% trong các đơn đặt hàng doanh nghiệp IT và tài chính.
                        </p>
                        <p>
                          • Thời gian đàm phán RFQ trung bình giảm từ 7 ngày xuống còn <strong>2.3 ngày</strong> nhờ tính năng so sánh báo giá side-by-side.
                        </p>
                      </Card>
                    </Col>
                    <Col xs={24} md={12}>
                      <Card
                        title="⚠️ Cảnh báo rủi ro chuỗi cung ứng"
                        size="small"
                        style={{ background: '#fafafa' }}
                      >
                        <p>
                          • 2 xưởng bánh khu vực Hà Nội đang vận hành ở mức <strong>92% công suất</strong>, dự kiến quá tải vào tuần cận rằm (T-7).
                        </p>
                        <p>
                          • Khuyến nghị: Điều phối các gói thầu RFQ phát sinh sau ngày 01/08 âm lịch sang cụm nhà cung cấp miền Trung và miền Nam có chứng nhận ISO 22000.
                        </p>
                      </Card>
                    </Col>
                  </Row>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </ColonyAdminLayout>
  );
}
