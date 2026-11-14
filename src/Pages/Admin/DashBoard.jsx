import { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Table,
  Tag,
  Button,
  Tabs,
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
  ThunderboltOutlined,
  FilePdfOutlined,
  EyeOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import AiAnalyticsPanel from '../../components/ai/AiAnalyticsPanel';
import paymentService from '../../services/paymentService';
import adminService from '../../services/adminService';
import reportService from '../../services/reportService';
import DisputeResolutionModal from '../../components/admin/DisputeResolutionModal';

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
      const data = await reportService.getConversionFunnel();
      setFunnelData(data);
    } catch (err) {
      console.warn('Funnel load error:', err);
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

  const pendingCount = dashboardMetrics?.pendingSuppliersCount ?? 0;
  const pendingDisputes = disputes.filter((d) => d.status === 'Pending').length;

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
      title: 'Nhà cung cấp / xưởng',
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
      title: 'Số hợp đồng',
      dataIndex: 'ordersCount',
      key: 'ordersCount',
      align: 'right',
      render: (val) => val ?? 0,
    },
    {
      title: 'Doanh số GMV',
      dataIndex: 'gmv',
      key: 'gmv',
      align: 'right',
      render: (gmv) => (
        <span style={{ fontWeight: 600, color: '#7d1322' }}>
          {typeof gmv === 'number' ? `${Number(gmv).toLocaleString('vi-VN')} ₫` : gmv || '0 ₫'}
        </span>
      ),
    },
    {
      title: 'Giao đúng hạn',
      dataIndex: 'onTimeRate',
      key: 'onTimeRate',
      render: (rate) => (
        <div style={{ width: 120 }}>
          <Progress percent={rate ?? 100} size="small" strokeColor={(rate ?? 100) >= 95 ? '#2e7d32' : '#faad14'} />
        </div>
      ),
    },
    {
      title: 'Điểm uy tín',
      dataIndex: 'score',
      key: 'score',
      render: (score) => (
        <Tag color="gold" style={{ fontWeight: 700 }}>
          {score ?? 100}/100 ★
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
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
      title: 'Mã hợp đồng',
      dataIndex: 'contractNo',
      key: 'contractNo',
      render: (text) => <span style={{ fontWeight: 600, color: '#7d1322' }}>{text}</span>,
    },
    {
      title: 'Bên mua',
      dataIndex: 'buyer',
      key: 'buyer',
    },
    {
      title: 'Bên bán',
      dataIndex: 'seller',
      key: 'seller',
    },
    {
      title: 'Tổng giá trị',
      dataIndex: 'totalValue',
      key: 'totalValue',
      align: 'right',
      render: (val) => <span style={{ fontWeight: 600 }}>{val}</span>,
    },
    {
      title: 'Cọc M1',
      dataIndex: 'depositM1',
      key: 'depositM1',
      align: 'right',
      render: (val) => <span style={{ color: '#7d1322', fontWeight: 600 }}>{val}</span>,
    },
    {
      title: 'Ký quỹ',
      dataIndex: 'escrowStatus',
      key: 'escrowStatus',
      render: (status) => (
        <Tag color={status.includes('Đã nhận') ? 'success' : 'warning'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Tiến độ',
      dataIndex: 'milestone',
      key: 'milestone',
      render: (m) => <Tag color="blue">{m}</Tag>,
    },
    {
      title: 'Thao tác',
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
          Hoàn tiền
        </Button>
      ),
    },
  ];

  const disputeColumns = [
    {
      title: 'Mã hợp đồng',
      dataIndex: 'contractNumber',
      key: 'contractNumber',
      render: (text) => <span style={{ fontWeight: 600, color: '#7d1322' }}>{text}</span>,
    },
    {
      title: 'Bên khiếu nại',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'supplierName',
      key: 'supplierName',
    },
    {
      title: 'Lý do tranh chấp',
      dataIndex: 'disputeReason',
      key: 'disputeReason',
      ellipsis: true,
    },
    {
      title: 'Tiền ký quỹ',
      dataIndex: 'heldEscrowAmount',
      key: 'heldEscrowAmount',
      align: 'right',
      render: (val) => (
        <span style={{ fontWeight: 600, color: '#9a6b16' }}>
          {Number(val || 0).toLocaleString('vi-VN')} ₫
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Pending' ? 'orange' : 'green'}>
          {status === 'Pending' ? 'Chờ phân xử' : 'Đã giải quyết'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
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
      subtitle="Theo dõi ký quỹ escrow, năng lực xưởng bánh và dòng hợp đồng B2B mùa Trung Thu."
      extra={
        <Space>
          <Button icon={<FilePdfOutlined />}>Xuất báo cáo PDF</Button>
          <Button
            type="primary"
            icon={<ThunderboltOutlined />}
            style={{ background: '#7d1322', borderColor: '#7d1322' }}
            onClick={() => setActiveTab('ai-insights')}
          >
            Tạo báo cáo AI
          </Button>
        </Space>
      }
    >
      {/* Operations notice */}
      <div
        className="mb-6 flex items-start gap-3 rounded-lg border border-[#e4dcd3] bg-[#faf7f2] px-4 py-3"
        role="status"
      >
        <SafetyCertificateOutlined className="mt-0.5 text-[#9a6b16]" />
        <p className="m-0 text-sm text-[#231a18]">
          <span className="font-medium">{pendingCount} hồ sơ nhà cung cấp</span> chờ thẩm định
          và <span className="font-medium">{pendingDisputes} tranh chấp</span> chờ phân xử.
        </p>
      </div>

      {/* Summary ribbon */}
      <section
        aria-label="Chỉ số điều hành"
        className="mb-6 grid grid-cols-1 divide-y divide-[#e4dcd3] overflow-hidden rounded-lg border border-[#e4dcd3] bg-white sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x"
      >
        <div className="p-5">
          <div className="flex items-center gap-2 text-sm text-[#6c625e]">
            <DollarOutlined className="text-[#7d1322]" />
            Tổng GMV mùa vụ
          </div>
          <div className="mt-2 font-serif text-2xl font-semibold tabular-nums text-[#7d1322]">
            {dashboardMetrics?.totalGmv ? `${(dashboardMetrics.totalGmv / 1e9).toFixed(1)} tỷ ₫` : '0 ₫'}
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 text-sm text-[#6c625e]">
            <SafetyCertificateOutlined className="text-[#9a6b16]" />
            Nhà cung cấp chờ thẩm định
          </div>
          <div className="mt-2 font-serif text-2xl font-semibold tabular-nums text-[#9a6b16]">
            {pendingCount}
          </div>
          <Button
            type="link"
            size="small"
            className="!px-0"
            onClick={() => onNavigate?.('admin/phe-duyet')}
          >
            Thẩm định ngay
          </Button>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 text-sm text-[#6c625e]">
            <FileDoneOutlined className="text-[#2d5a43]" />
            Hợp đồng đang chạy
          </div>
          <div className="mt-2 font-serif text-2xl font-semibold tabular-nums text-[#2d5a43]">
            {dashboardMetrics?.activeContractsCount ?? 0}
          </div>
          <div className="text-xs tabular-nums text-[#6c625e]">
            {dashboardMetrics?.totalContractsGmv
              ? `${(dashboardMetrics.totalContractsGmv / 1e9).toFixed(1)} tỷ ₫`
              : '0 ₫'}
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 text-sm text-[#6c625e]">
            <AlertOutlined className="text-[#7d1322]" />
            Tranh chấp đang mở
          </div>
          <div className="mt-2 font-serif text-2xl font-semibold tabular-nums text-[#7d1322]">
            {pendingDisputes}
          </div>
          <Button
            type="link"
            size="small"
            className="!px-0"
            onClick={() => onNavigate?.('admin/van-hanh-giao-dich')}
          >
            Phân xử
          </Button>
        </div>
      </section>


      {/* Main Tabs Area */}
      <section className="rounded-lg border border-[#e4dcd3] bg-white px-5 pb-5 pt-2">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'campaign',
              label: 'Bảng xếp hạng xưởng bánh',
              children: (
                <div>
                  <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong>Nhà cung cấp dẫn đầu doanh số và tỷ lệ giao đúng hạn</Text>
                    <Button type="primary" size="small" onClick={() => onNavigate?.('admin/dieu-khien')}>
                      Xem tất cả nhà cung cấp
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
                  Trọng tài tranh chấp SafeTrade{' '}
                  {disputes.filter((d) => d.status === 'Pending').length > 0 && (
                    <Badge count={disputes.filter((d) => d.status === 'Pending').length} size="small" />
                  )}
                </span>
              ),
              children: (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h4 className="m-0 font-serif text-lg font-semibold text-[#231a18]">Khiếu nại và tranh chấp hợp đồng</h4>
                      <p className="m-0 text-xs text-[#6c625e]">Trọng tài SafeTrade bảo vệ cả bên mua và xưởng sản xuất.</p>
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
              label: 'Phễu chuyển đổi RFQ & báo cáo',
              children: (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="m-0 font-serif text-lg font-semibold text-[#231a18]">Hiệu suất chuyển đổi từ RFQ sang hợp đồng</h4>
                      <p className="m-0 text-xs text-[#6c625e]">Tỷ lệ thành công của các phiên chào thầu doanh nghiệp.</p>
                    </div>
                    <Space>
                      <Button
                        icon={<FileDoneOutlined />}
                        loading={exporting}
                        onClick={handleExportCsv}
                        className="border-[#e4dcd3] bg-[#faf7f2] text-[#231a18]"
                      >
                        Xuất Báo Cáo CSV
                      </Button>
                    </Space>
                  </div>

                  {/* Funnel Steps Visualizer */}
                  <div className="rounded-lg border border-[#e4dcd3] bg-[#faf7f2] p-5">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {(funnelData?.stages || [
                        { stageName: '1. RFQ Đăng Tải', count: 150, conversionRatePercentage: 100 },
                        { stageName: '2. Báo Giá Nộp', count: 420, conversionRatePercentage: 280 },
                        { stageName: '3. Báo Giá Trúng', count: 132, conversionRatePercentage: 88 },
                        { stageName: '4. HĐ Ký Số OTP', count: 128, conversionRatePercentage: 85.3 },
                        { stageName: '5. Nghiệm Thu Xong', count: 115, conversionRatePercentage: 76.7 },
                      ]).map((st, idx) => (
                        <div key={idx} className="rounded-lg border border-[#e4dcd3] bg-white p-4">
                          <div className="text-xs text-[#6c625e]">{st.stageName}</div>
                          <div className="mt-1 font-serif text-2xl font-semibold tabular-nums text-[#231a18]">{st.count}</div>
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
              label: 'Sổ giám sát ký quỹ escrow & milestone',
              children: (
                <div className="space-y-4">
                  {/* Escrow KPI Cards */}
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={6}>
                      <div className="rounded-lg border border-[#e4dcd3] bg-[#faf7f2] p-4">
                        <Text type="secondary" className="text-xs">Số dư ký quỹ đang giữ</Text>
                        <div className="mt-1 font-serif text-lg font-semibold tabular-nums text-[#9a6b16]">
                          {(escrowSummary?.totalEscrowBalance ?? 1285000000).toLocaleString('vi-VN')} ₫
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                      <div className="rounded-lg border border-[#e4dcd3] bg-[#faf7f2] p-4">
                        <Text type="secondary" className="text-xs">Hợp đồng bảo chứng</Text>
                        <div className="mt-1 font-serif text-lg font-semibold tabular-nums text-[#231a18]">
                          {escrowSummary?.totalActiveContracts ?? 24} HĐ
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                      <div className="rounded-lg border border-[#e4dcd3] bg-[#faf7f2] p-4">
                        <Text type="secondary" className="text-xs">Chờ nghiệm thu / giải ngân</Text>
                        <div className="mt-1 font-serif text-lg font-semibold tabular-nums text-[#2d5a43]">
                          {(escrowSummary?.pendingDisbursementAmount ?? 340000000).toLocaleString('vi-VN')} ₫
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                      <div className="rounded-lg border border-[#e4dcd3] bg-[#faf7f2] p-4">
                        <Text type="secondary" className="text-xs">Đang khiếu nại / đóng băng</Text>
                        <div className="mt-1 font-serif text-lg font-semibold tabular-nums text-[#7d1322]">
                          {(escrowSummary?.disputedEscrowAmount ?? 45000000).toLocaleString('vi-VN')} ₫
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <p className="m-0 rounded-lg border border-[#e4dcd3] bg-[#faf7f2] px-4 py-3 text-sm text-[#231a18]">
                    Khách hàng đặt cọc mốc M1 (30%) vào escrow trước khi hợp đồng chuyển sang Active.
                  </p>
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
              label: 'Báo cáo AI Analytics',
              children: (
                <div style={{ padding: '8px 0' }}>
                  <AiAnalyticsPanel role="Admin" />
                </div>
              ),
            },
          ]}
        />
      </section>

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
