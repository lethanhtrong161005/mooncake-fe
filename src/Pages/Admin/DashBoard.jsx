import { useState, useEffect, useCallback } from 'react';
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
  ReloadOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import AdminDashboardCharts from '../../components/admin/AdminDashboardCharts';
import AiAnalyticsPanel from '../../components/ai/AiAnalyticsPanel';
import paymentService from '../../services/paymentService';
import adminService from '../../services/adminService';
import reportService from '../../services/reportService';
import DisputeResolutionModal from '../../components/admin/DisputeResolutionModal';
import RowActionMenu from '../../components/common/RowActionMenu';
import { TruncatedTooltip } from '../../components/common/TableCellHelpers';

const { Text } = Typography;

const formatCompactVnd = (value) => {
  const num = Number(value || 0);
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2).replace(/\.00$/, '')} tỷ ₫`;
  }
  return `${num.toLocaleString('vi-VN')} ₫`;
};

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
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [metricsError, setMetricsError] = useState(null);

  const loadDashboardMetrics = useCallback(async () => {
    setLoadingMetrics(true);
    setMetricsError(null);
    try {
      const data = await reportService.getDashboardMetrics();
      setDashboardMetrics(data);
    } catch (err) {
      setMetricsError(err?.response?.data?.message || err?.message || 'Lỗi kết nối API');
      console.warn('Dashboard metrics load error:', err);
    } finally {
      setLoadingMetrics(false);
    }
  }, []);

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
    let active = true;
    paymentService
      .getEscrowSummary()
      .then((data) => { if (active) setEscrowSummary(data); })
      .catch((err) => { console.warn('Escrow summary load error:', err); })
      .finally(() => { if (active) setLoadingEscrow(false); });

    adminService
      .getDisputes()
      .then((data) => {
        if (active) setDisputes(Array.isArray(data) ? data : data?.items || []);
      })
      .catch((err) => { console.warn('Disputes load error:', err); })
      .finally(() => { if (active) setLoadingDisputes(false); });

    reportService
      .getConversionFunnel()
      .then((data) => { if (active) setFunnelData(data); })
      .catch((err) => { console.warn('Funnel load error:', err); });

    reportService
      .getTopSuppliers()
      .then((data) => {
        if (active) setTopSuppliers(Array.isArray(data) ? data : data?.items || []);
      })
      .catch((err) => { console.warn('Top suppliers load error:', err); })
      .finally(() => { if (active) setLoadingTopSuppliers(false); });

    reportService
      .getDashboardMetrics()
      .then((data) => {
        if (!active) return;
        setMetricsError(null);
        setDashboardMetrics(data);
      })
      .catch((err) => {
        if (active) {
          setMetricsError(err?.response?.data?.message || err?.message || 'Lỗi kết nối API');
          console.warn('Dashboard metrics load error:', err);
        }
      })
      .finally(() => {
        if (active) setLoadingMetrics(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleRefreshAll = async () => {
    await Promise.all([
      loadDashboardMetrics(),
      loadTopSuppliers(),
      loadDisputes(),
      loadFunnel(),
      loadEscrowSummary(),
    ]);
  };

  const pendingCount = dashboardMetrics?.pendingSuppliersCount ?? 0;
  const pendingContractDisputes = disputes.filter((d) => d.status === 'Pending').length;
  const pendingDisputes = Math.max(
    pendingContractDisputes,
    Number(dashboardMetrics?.pendingDisputesCount ?? 0),
  );

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
      width: 245,
      render: (text, record) => (
        <div className="max-w-[230px]">
          <TruncatedTooltip
            text={text || record.name}
            tooltipContent={
              record.taxCode
                ? `${text || record.name} (MST: ${record.taxCode})`
                : (text || record.name)
            }
            className="font-semibold text-[#1f1f1f]"
          />
          {record.taxCode && (
            <div className="truncate font-mono text-[11px] text-[#888]">
              MST: {record.taxCode}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Số hợp đồng',
      dataIndex: 'ordersCount',
      key: 'ordersCount',
      align: 'right',
      width: 110,
      render: (val) => <span className="tabular-nums">{val ?? 0}</span>,
    },
    {
      title: 'Doanh số GMV',
      dataIndex: 'gmv',
      key: 'gmv',
      align: 'right',
      width: 155,
      render: (gmv) => (
        <span className="whitespace-nowrap font-semibold tabular-nums text-[#7d1322]">
          {typeof gmv === 'number' ? `${Number(gmv).toLocaleString('vi-VN')} ₫` : gmv || '0 ₫'}
        </span>
      ),
    },
    {
      title: 'Giao đúng hạn',
      dataIndex: 'onTimeRate',
      key: 'onTimeRate',
      width: 135,
      render: (rate) => (
        <div style={{ width: 115 }}>
          <Progress percent={rate ?? 100} size="small" strokeColor={(rate ?? 100) >= 95 ? '#2e7d32' : '#faad14'} />
        </div>
      ),
    },
    {
      title: 'Điểm uy tín',
      dataIndex: 'score',
      key: 'score',
      width: 115,
      render: (score) => (
        <Tag color="gold" className="m-0 whitespace-nowrap font-bold">
          {score ?? 100}/100 ★
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      width: 84,
      render: (_, record) => (
        <RowActionMenu
          ariaLabel={`Thao tác xưởng ${record.shopName || record.name || ''}`}
          actions={[
            {
              key: 'detail',
              label: 'Xem chi tiết xưởng',
              icon: <EyeOutlined />,
              onClick: () => onNavigate?.('admin/dieu-khien'),
            },
          ]}
        />
      ),
    },
  ];

  const escrowColumns = [
    {
      title: 'Mã hợp đồng',
      dataIndex: 'contractNo',
      key: 'contractNo',
      width: 145,
      render: (text) => (
        <div className="max-w-[130px]">
          <TruncatedTooltip text={text} className="font-mono text-xs font-semibold text-[#7d1322]" />
        </div>
      ),
    },
    {
      title: 'Bên mua',
      dataIndex: 'buyer',
      key: 'buyer',
      width: 155,
      render: (text) => (
        <div className="max-w-[140px]">
          <TruncatedTooltip text={text} className="font-medium text-[#231a18]" />
        </div>
      ),
    },
    {
      title: 'Bên bán',
      dataIndex: 'seller',
      key: 'seller',
      width: 155,
      render: (text) => (
        <div className="max-w-[140px]">
          <TruncatedTooltip text={text} className="text-[#4b423e]" />
        </div>
      ),
    },
    {
      title: 'Tổng giá trị',
      dataIndex: 'totalValue',
      key: 'totalValue',
      align: 'right',
      width: 130,
      render: (val) => <span className="whitespace-nowrap font-semibold tabular-nums">{val}</span>,
    },
    {
      title: 'Cọc M1',
      dataIndex: 'depositM1',
      key: 'depositM1',
      align: 'right',
      width: 120,
      render: (val) => <span className="whitespace-nowrap font-semibold tabular-nums text-[#7d1322]">{val}</span>,
    },
    {
      title: 'Ký quỹ',
      dataIndex: 'escrowStatus',
      key: 'escrowStatus',
      width: 125,
      render: (status) => (
        <Tag color={status.includes('Đã nhận') ? 'success' : 'warning'} className="m-0 whitespace-nowrap">
          {status}
        </Tag>
      ),
    },
    {
      title: 'Tiến độ',
      dataIndex: 'milestone',
      key: 'milestone',
      width: 95,
      render: (m) => <Tag color="blue" className="m-0 whitespace-nowrap">{m}</Tag>,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      align: 'center',
      width: 78,
      render: (_, record) => (
        <RowActionMenu
          ariaLabel={`Thao tác hợp đồng ${record.contractNo}`}
          actions={[
            {
              key: 'refund',
              label: 'Hoàn tiền ký quỹ',
              icon: <RollbackOutlined />,
              danger: true,
              onClick: () => {
                setSelectedRecord(record);
                setRefundModalOpen(true);
              },
            },
          ]}
        />
      ),
    },
  ];

  const disputeColumns = [
    {
      title: 'Mã hợp đồng',
      dataIndex: 'contractNumber',
      key: 'contractNumber',
      width: 150,
      render: (text) => (
        <div className="max-w-[135px]">
          <TruncatedTooltip text={text} className="font-mono text-xs font-semibold text-[#7d1322]" />
        </div>
      ),
    },
    {
      title: 'Bên khiếu nại',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 165,
      render: (text) => (
        <div className="max-w-[150px]">
          <TruncatedTooltip text={text} className="font-medium text-[#231a18]" />
        </div>
      ),
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'supplierName',
      key: 'supplierName',
      width: 165,
      render: (text) => (
        <div className="max-w-[150px]">
          <TruncatedTooltip text={text} className="text-[#4b423e]" />
        </div>
      ),
    },
    {
      title: 'Lý do tranh chấp',
      dataIndex: 'disputeReason',
      key: 'disputeReason',
      width: 225,
      render: (text) => (
        <div className="max-w-[210px]">
          <TruncatedTooltip text={text} lines={2} className="text-xs leading-snug text-[#4b423e]" />
        </div>
      ),
    },
    {
      title: 'Tiền ký quỹ',
      dataIndex: 'heldEscrowAmount',
      key: 'heldEscrowAmount',
      align: 'right',
      width: 135,
      render: (val) => (
        <span className="whitespace-nowrap font-semibold tabular-nums text-[#9a6b16]">
          {Number(val || 0).toLocaleString('vi-VN')} ₫
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => (
        <Tag color={status === 'Pending' ? 'orange' : 'green'} className="m-0 whitespace-nowrap">
          {status === 'Pending' ? 'Chờ phân xử' : 'Đã giải quyết'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      align: 'center',
      width: 84,
      render: (_, record) => (
        <RowActionMenu
          ariaLabel={`Thao tác tranh chấp ${record.contractNumber || ''}`}
          actions={[
            {
              key: 'arbitrate',
              label: 'Phân xử tranh chấp',
              icon: <SafetyCertificateOutlined />,
              danger: true,
              show: record.status === 'Pending',
              onClick: () => {
                setSelectedDispute(record);
                setDisputeModalOpen(true);
              },
            },
            {
              key: 'closed',
              label: 'Hồ sơ đã đóng',
              icon: <FileDoneOutlined />,
              disabled: true,
              show: record.status !== 'Pending',
            },
          ]}
        />
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
        <Space wrap>
          <Button icon={<ReloadOutlined />} onClick={handleRefreshAll} loading={loadingMetrics}>
            Làm mới
          </Button>
          <Button icon={<FilePdfOutlined />} onClick={handleExportCsv} loading={exporting}>
            Xuất báo cáo CSV
          </Button>
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
            {formatCompactVnd(dashboardMetrics?.totalGmv)}
          </div>
          <div className="text-xs tabular-nums text-[#6c625e]">
            Hoa hồng 3%: {Number(dashboardMetrics?.platformRevenue ?? 0).toLocaleString('vi-VN')} ₫
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
            {formatCompactVnd(dashboardMetrics?.totalContractsGmv)}
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

      {/* Executive Charts */}
      <AdminDashboardCharts
        metrics={dashboardMetrics}
        loading={loadingMetrics}
        error={metricsError}
        onRetry={loadDashboardMetrics}
      />


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
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
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
                    scroll={{ x: 'max-content' }}
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
                    scroll={{ x: 'max-content' }}
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
                          totalValue: `${Number(item.contractTotalValue).toLocaleString('vi-VN')} ₫`,
                          depositM1: `${Number(item.heldEscrowAmount).toLocaleString('vi-VN')} ₫`,
                          escrowStatus: item.escrowStatus === 'Active' ? 'Đã nhận cọc' : item.escrowStatus,
                          milestone: `Mốc ${item.paidMilestonesCount}/${item.totalMilestonesCount}`,
                        }))
                        : []
                    }
                    pagination={false}
                    size="middle"
                    loading={loadingEscrow}
                    scroll={{ x: 'max-content' }}
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
