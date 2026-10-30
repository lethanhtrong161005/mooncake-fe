import { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Table,
  Tag,
  Button,
  Tabs,
  Alert,
  Progress,
  Space,
  Badge,
  Typography,
  message,
  Modal,
  Input,
} from 'antd';
import {
  DollarOutlined,
  SafetyCertificateOutlined,
  FileDoneOutlined,
  AlertOutlined,
  ArrowUpOutlined,
  ThunderboltOutlined,
  FilePdfOutlined,
  EyeOutlined,
  RollbackOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import AiAnalyticsPanel from '../../components/ai/AiAnalyticsPanel';
import paymentService from '../../services/paymentService';
import adminService from '../../services/adminService';
import reportService from '../../services/reportService';
import DisputeResolutionModal from '../../components/admin/DisputeResolutionModal';
import NotificationBell from '../../components/notification/NotificationBell';

const { Text } = Typography;

export default function DashBoard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('campaign');
  const [escrowSummary, setEscrowSummary] = useState(null);
  const [loadingEscrow, setLoadingEscrow] = useState(false);
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [refundReason, setRefundReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Module 11: Disputes & Reporting State
  const [disputes, setDisputes] = useState([]);
  const [loadingDisputes, setLoadingDisputes] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);

  const [funnelData, setFunnelData] = useState(null);
  const [loadingFunnel, setLoadingFunnel] = useState(false);
  const [exporting, setExporting] = useState(false);

  const [topSuppliers, setTopSuppliers] = useState([]);
  const [loadingTopSuppliers, setLoadingTopSuppliers] = useState(false);
  const [dashboardMetrics, setDashboardMetrics] = useState(null);

  const loadDashboardMetrics = async () => {
    try {
      const data = await reportService.getDashboardMetrics();
      setDashboardMetrics(data);
    } catch (err) {
      console.warn('Dashboard metrics load error:', err);
    }
  };

  const loadTopSuppliers = async () => {
    try {
      setLoadingTopSuppliers(true);
      const data = await reportService.getTopSuppliers();
      setTopSuppliers(Array.isArray(data) ? data : data?.items || []);
    } catch (err) {
      console.warn('Top suppliers load error:', err);
    } finally {
      setLoadingTopSuppliers(false);
    }
  };

  const loadDisputes = async () => {
    try {
      setLoadingDisputes(true);
      const data = await adminService.getDisputes();
      setDisputes(Array.isArray(data) ? data : data?.items || []);
    } catch (err) {
      console.warn('Disputes load error:', err);
    } finally {
      setLoadingDisputes(false);
    }
  };

  const loadFunnel = async () => {
    try {
      setLoadingFunnel(true);
      const data = await reportService.getConversionFunnel();
      setFunnelData(data);
    } catch (err) {
      console.warn('Funnel load error:', err);
    } finally {
      setLoadingFunnel(false);
    }
  };

  const handleExportCsv = async () => {
    try {
      setExporting(true);
      const blob = await reportService.exportReport('csv');
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BaoCao_NguyetPho_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      message.success('Đã xuất file báo cáo CSV thành công!');
    } catch {
      message.error('Không thể xuất báo cáo.');
    } finally {
      setExporting(false);
    }
  };

  const loadEscrowSummary = async () => {
    try {
      setLoadingEscrow(true);
      const data = await paymentService.getEscrowSummary();
      setEscrowSummary(data);
    } catch (err) {
      console.warn('Escrow summary load error:', err);
    } finally {
      setLoadingEscrow(false);
    }
  };

  useEffect(() => {
    loadEscrowSummary();
    loadDisputes();
    loadFunnel();
    loadTopSuppliers();
    loadDashboardMetrics();
  }, []);

  const handleRefund = async () => {
    if (!refundReason.trim()) {
      message.warning('Vui lòng nhập lý do hoàn tiền.');
      return;
    }
    try {
      setActionLoading(true);
      await paymentService.refund(selectedRecord?.contractId, refundReason.trim());
      message.success('Đã hoàn tiền ký quỹ thành công về tài khoản bên mua.');
      setRefundModalOpen(false);
      setRefundReason('');
      await loadEscrowSummary();
    } catch (err) {
      message.error(err.message || 'Không thể hoàn tiền.');
    } finally {
      setActionLoading(false);
    }
  };

  const topSuppliersColumns = [
    {
      title: 'Hạng',
      dataIndex: 'rank',
      key: 'rank',
      width: 60,
      render: (_, __, index) => (
        <Badge
          count={index + 1}
          style={{
            backgroundColor: index === 0 ? '#f5222d' : index === 1 ? '#fa8c16' : index === 2 ? '#faad14' : '#d9d9d9',
          }}
        />
      ),
    },
    {
      title: 'Nhà Cung Cấp / Xưởng',
      dataIndex: 'shopName',
      key: 'shopName',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1f1f1f' }}>{text || record.name}</div>
          {record.taxCode && <div style={{ fontSize: 11, color: '#888' }}>MST: {record.taxCode}</div>}
        </div>
      ),
    },
    {
      title: 'Số Đơn HĐ',
      dataIndex: 'ordersCount',
      key: 'ordersCount',
      align: 'right',
      render: (val) => val ?? 0,
    },
    {
      title: 'Doanh Số GMV',
      dataIndex: 'gmv',
      key: 'gmv',
      align: 'right',
      render: (gmv) => (
        <span style={{ fontWeight: 600, color: '#8c1524' }}>
          {typeof gmv === 'number' ? `${Number(gmv).toLocaleString('vi-VN')} ₫` : gmv || '0 ₫'}
        </span>
      ),
    },
    {
      title: 'Giao Đúng Hạn',
      dataIndex: 'onTimeRate',
      key: 'onTimeRate',
      render: (rate) => (
        <div style={{ width: 120 }}>
          <Progress percent={rate ?? 100} size="small" strokeColor={(rate ?? 100) >= 95 ? '#2e7d32' : '#faad14'} />
        </div>
      ),
    },
    {
      title: 'Điểm Uy Tín',
      dataIndex: 'score',
      key: 'score',
      render: (score) => (
        <Tag color="gold" style={{ fontWeight: 700 }}>
          {score ?? 100}/100 ★
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
    {
      title: 'Hành Động',
      key: 'actions',
      render: (_, record) => (
        <Button
          size="small"
          danger
          icon={<RollbackOutlined />}
          onClick={() => {
            setSelectedRecord(record);
            setRefundModalOpen(true);
          }}
        >
          Hoàn Tiền
        </Button>
      ),
    },
  ];

  const disputeColumns = [
    {
      title: 'Mã Hợp Đồng',
      dataIndex: 'contractNumber',
      key: 'contractNumber',
      render: (text) => <span style={{ fontWeight: 600, color: '#1677ff' }}>{text}</span>,
    },
    {
      title: 'Bên Khiếu Nại (Customer)',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Nhà Cung Cấp (Supplier)',
      dataIndex: 'supplierName',
      key: 'supplierName',
    },
    {
      title: 'Lý Do Tranh Chấp',
      dataIndex: 'disputeReason',
      key: 'disputeReason',
      ellipsis: true,
    },
    {
      title: 'Tiền Cọc Ký Quỹ',
      dataIndex: 'heldEscrowAmount',
      key: 'heldEscrowAmount',
      align: 'right',
      render: (val) => (
        <span style={{ fontWeight: 600, color: '#d97706' }}>
          {Number(val || 0).toLocaleString('vi-VN')} ₫
        </span>
      ),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Pending' ? 'orange' : 'green'}>
          {status === 'Pending' ? 'Chờ phân xử' : 'Đã giải quyết'}
        </Tag>
      ),
    },
    {
      title: 'Hành Động',
      key: 'actions',
      render: (_, record) => (
        record.status === 'Pending' ? (
          <Button
            size="small"
            type="primary"
            danger
            onClick={() => {
              setSelectedDispute(record);
              setDisputeModalOpen(true);
            }}
          >
            Phân xử
          </Button>
        ) : (
          <Tag color="default">Đã đóng</Tag>
        )
      ),
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
                  {dashboardMetrics?.totalGmv ? `${(dashboardMetrics.totalGmv / 1e9).toFixed(1)} Tỷ ₫` : '0 ₫'}
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
                  {dashboardMetrics?.pendingSuppliersCount ?? 0} Hồ sơ
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
                  {dashboardMetrics?.activeContractsCount ?? 0} Hợp đồng
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
                Ký số OTP
              </Tag>
              <Text type="secondary">
                {dashboardMetrics?.totalContractsGmv ? `${(dashboardMetrics.totalContractsGmv / 1e9).toFixed(1)} Tỷ VNĐ` : '0 ₫'}
              </Text>
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
                  {disputes.filter((d) => d.status === 'Pending').length} Vụ việc
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
                    dataSource={topSuppliers.map((s, idx) => ({ ...s, key: s.supplierId || s.id || idx, rank: idx + 1 }))}
                    loading={loadingTopSuppliers}
                    pagination={false}
                    size="middle"
                  />
                </div>
              ),
            },
            {
              key: 'disputes',
              label: (
                <span>
                  ⚖️ Trọng Tài Tranh Chấp SafeTrade{' '}
                  {disputes.filter((d) => d.status === 'Pending').length > 0 && (
                    <Badge count={disputes.filter((d) => d.status === 'Pending').length} size="small" />
                  )}
                </span>
              ),
              children: (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h4 className="font-bold text-stone-800 m-0">Danh Sách Khiếu Nại & Tranh Chấp Hợp Đồng B2B</h4>
                      <p className="text-xs text-stone-500 m-0">Cơ chế trọng tài công tâm SafeTrade bảo vệ an toàn cho cả bên mua và xưởng sản xuất bánh.</p>
                    </div>
                    <Button onClick={loadDisputes} size="small">Làm mới</Button>
                  </div>
                  <Table
                    columns={disputeColumns}
                    dataSource={disputes.map((d) => ({ ...d, key: d.id }))}
                    loading={loadingDisputes}
                    pagination={{ pageSize: 5 }}
                    size="middle"
                  />
                </div>
              ),
            },
            {
              key: 'funnel',
              label: '📊 Phễu Chuyển Đổi RFQ & Báo Cáo',
              children: (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-stone-800 m-0">Hiệu Suất Phễu Chuyển Đổi RFQ Sang Hợp Đồng Ký Số</h4>
                      <p className="text-xs text-stone-500 m-0">Đo lường tỷ lệ thành công của các phiên chào thầu bánh Trung thu doanh nghiệp B2B.</p>
                    </div>
                    <Space>
                      <Button
                        icon={<FileDoneOutlined />}
                        loading={exporting}
                        onClick={handleExportCsv}
                        className="bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
                      >
                        Xuất Báo Cáo CSV
                      </Button>
                    </Space>
                  </div>

                  {/* Funnel Steps Visualizer */}
                  <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {(funnelData?.stages || [
                        { stageName: '1. RFQ Đăng Tải', count: 150, conversionRatePercentage: 100 },
                        { stageName: '2. Báo Giá Nộp', count: 420, conversionRatePercentage: 280 },
                        { stageName: '3. Báo Giá Trúng', count: 132, conversionRatePercentage: 88 },
                        { stageName: '4. HĐ Ký Số OTP', count: 128, conversionRatePercentage: 85.3 },
                        { stageName: '5. Nghiệm Thu Xong', count: 115, conversionRatePercentage: 76.7 },
                      ]).map((st, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs relative">
                          <div className="text-xs text-stone-400 font-medium">{st.stageName}</div>
                          <div className="text-2xl font-bold text-stone-800 mt-1">{st.count}</div>
                          <div className="mt-3">
                            <Progress
                              percent={Math.min(100, Math.round(st.conversionRatePercentage))}
                              size="small"
                              strokeColor={idx === 4 ? '#16a34a' : '#d97706'}
                            />
                            <div className="text-[11px] text-stone-500 mt-1">
                              Tỷ lệ: {st.conversionRatePercentage}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              key: 'escrow',
              label: '🛡️ Sổ Giám Sát Ký Quỹ Escrow & Milestone',
              children: (
                <div className="space-y-4">
                  {/* Escrow KPI Cards */}
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={6}>
                      <Card size="small" className="bg-amber-50/60 border-amber-200 rounded-xl">
                        <Text type="secondary" className="text-xs">Số Dư Ký Quỹ Đang Giữ</Text>
                        <div className="text-lg font-bold text-amber-800 mt-1">
                          {(escrowSummary?.totalEscrowBalance ?? 1285000000).toLocaleString('vi-VN')} ₫
                        </div>
                      </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                      <Card size="small" className="bg-blue-50/60 border-blue-200 rounded-xl">
                        <Text type="secondary" className="text-xs">Hợp Đồng Bảo Chứng</Text>
                        <div className="text-lg font-bold text-blue-700 mt-1">
                          {escrowSummary?.totalActiveContracts ?? 24} HĐ
                        </div>
                      </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                      <Card size="small" className="bg-emerald-50/60 border-emerald-200 rounded-xl">
                        <Text type="secondary" className="text-xs">Chờ Nghiệm Thu / Giải Ngân</Text>
                        <div className="text-lg font-bold text-emerald-700 mt-1">
                          {(escrowSummary?.pendingDisbursementAmount ?? 340000000).toLocaleString('vi-VN')} ₫
                        </div>
                      </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                      <Card size="small" className="bg-rose-50/60 border-rose-200 rounded-xl">
                        <Text type="secondary" className="text-xs">Đang Khiếu Nại / Đóng Băng</Text>
                        <div className="text-lg font-bold text-rose-700 mt-1">
                          {(escrowSummary?.disputedEscrowAmount ?? 45000000).toLocaleString('vi-VN')} ₫
                        </div>
                      </Card>
                    </Col>
                  </Row>

                  <Alert
                    message="Quy tắc bảo chứng hợp đồng (Milestone Deposit Rule)"
                    description="Khách hàng bắt buộc thanh toán đặt cọc mốc M1 (30%) vào tài khoản Escrow sàn trước khi Hợp đồng chuyển sang trạng thái Active và NCC bắt đầu sản xuất."
                    type="success"
                    showIcon
                    style={{ marginBottom: 16 }}
                  />
                  <Table
                    columns={escrowColumns}
                    dataSource={
                      escrowSummary?.escrowLedgerItems?.length
                        ? escrowSummary.escrowLedgerItems.map((item) => ({
                            key: item.contractId,
                            contractId: item.contractId,
                            contractNo: item.contractNumber,
                            buyer: item.customerName,
                            seller: item.supplierName,
                            totalValue: `${Number(item.contractTotalValue).toLocaleString('vi-VN')} ₫`,
                            depositM1: `${Number(item.heldEscrowAmount).toLocaleString('vi-VN')} ₫`,
                            escrowStatus: item.escrowStatus === 'Active' ? 'Đã nhận cọc' : item.escrowStatus,
                            milestone: `Mốc ${item.paidMilestonesCount}/${item.totalMilestonesCount}`,
                          }))
                        : []
                    }
                    pagination={false}
                    size="middle"
                    loading={loadingEscrow}
                  />
                </div>
              ),
            },
            {
              key: 'ai-insights',
              label: '✨ Báo Cáo AI Analytics (Natural Language Insights)',
              children: (
                <div style={{ padding: '8px 0' }}>
                  <AiAnalyticsPanel role="Admin" />
                </div>
              ),
            },
          ]}
        />
      </Card>

      <Modal
        title="Xác nhận hoàn tiền ký quỹ (Admin Escrow Refund)"
        open={refundModalOpen}
        onCancel={() => {
          setRefundModalOpen(false);
          setRefundReason('');
        }}
        onOk={handleRefund}
        okText="Xác nhận hoàn tiền"
        okButtonProps={{ danger: true, loading: actionLoading }}
        cancelText="Đóng"
      >
        <p className="text-xs text-stone-600 mb-3">
          Khoản tiền ký quỹ hợp đồng <strong>{selectedRecord?.contractNo}</strong> sẽ được giải tỏa và hoàn trả cho khách hàng doanh nghiệp <strong>{selectedRecord?.buyer}</strong>. Hành động này không thể hoàn tác.
        </p>
        <Input.TextArea
          placeholder="Nhập lý do hoàn tiền (VD: Khách hàng yêu cầu hủy HĐ do xưởng trễ hạn)..."
          rows={3}
          value={refundReason}
          onChange={(e) => setRefundReason(e.target.value)}
        />
      </Modal>

      <DisputeResolutionModal
        open={disputeModalOpen}
        dispute={selectedDispute}
        onCancel={() => {
          setDisputeModalOpen(false);
          setSelectedDispute(null);
        }}
        onSuccess={async () => {
          setDisputeModalOpen(false);
          setSelectedDispute(null);
          await loadDisputes();
          await loadEscrowSummary();
        }}
      />
    </ColonyAdminLayout>
  );
}
