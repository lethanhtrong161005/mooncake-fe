import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Descriptions,
  Divider,
  Drawer,
  Image,
  Input,
  Modal,
  Space,
  Steps,
  Table,
  Tag,
  Typography,
  message,
} from 'antd';
import {
  AlertOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  FileDoneOutlined,
  OrderedListOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import CustomerBreadcrumbBar from '../../components/layout/CustomerBreadcrumbBar';
import CustomerFooter from '../../components/layout/CustomerFooter';
import contractService from '../../services/contractService';
import paymentService from '../../services/paymentService';
import { signalRManager } from '../../services/signalrService';
import '../../styles/journey-pages.css';

const { Paragraph, Text, Title } = Typography;
const { TextArea } = Input;

const money = (amount) => `${Number(amount || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) => error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.';

const parseContractTerms = (value) => {
  if (value && typeof value === 'object') return value;
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
};

function ContractTerms({ value }) {
  const terms = parseContractTerms(value);
  if (!terms) {
    return <Paragraph style={{ marginBottom: 0, whiteSpace: 'pre-wrap' }}>
      {value || 'Thực hiện theo quy cách sản phẩm, tiến độ giao hàng và cơ chế nghiệm thu đã thống nhất trong hợp đồng.'}
    </Paragraph>;
  }

  const items = Array.isArray(terms.Items) ? terms.Items : [];
  return (
    <Space direction="vertical" size={12} style={{ width: '100%' }}>
      <Descriptions bordered size="small" column={2}>
        {terms.RfqNumber && <Descriptions.Item label="Mã yêu cầu báo giá">{terms.RfqNumber}</Descriptions.Item>}
        {terms.BidNumber && <Descriptions.Item label="Mã báo giá">{terms.BidNumber}</Descriptions.Item>}
        {terms.CompanyName && <Descriptions.Item label="Xưởng cung cấp">{terms.CompanyName}</Descriptions.Item>}
        {terms.SupplierTaxCode && <Descriptions.Item label="Mã số thuế">{terms.SupplierTaxCode}</Descriptions.Item>}
        {terms.DeliveryDateRequired && <Descriptions.Item label="Ngày giao dự kiến">{terms.DeliveryDateRequired}</Descriptions.Item>}
        {terms.DeliveryAddress && <Descriptions.Item label="Địa chỉ giao hàng" span={2}>{terms.DeliveryAddress}</Descriptions.Item>}
        {terms.Description && <Descriptions.Item label="Mô tả yêu cầu" span={2}>{terms.Description}</Descriptions.Item>}
      </Descriptions>
      {items.length > 0 && <Table
        size="small"
        pagination={false}
        rowKey={(item, index) => `${item.ProductName || 'item'}-${index}`}
        dataSource={items}
        scroll={{ x: 560 }}
        columns={[
          {
            title: 'Sản phẩm và yêu cầu',
            dataIndex: 'ProductName',
            render: (name, item) => <Space direction="vertical" size={2}>
              <Text strong>{name || 'Sản phẩm'}</Text>
              {item.Description && <Text type="secondary">{item.Description}</Text>}
              {item.Specifications && <Text type="secondary">Quy cách: {item.Specifications}</Text>}
              {item.PackagingRequirements && <Text type="secondary">Đóng gói: {item.PackagingRequirements}</Text>}
              {item.Notes && <Text type="secondary">Ghi chú: {item.Notes}</Text>}
            </Space>,
          },
          { title: 'Số lượng', render: (_, item) => `${item.Quantity ?? 0} ${item.Unit || ''}` },
          { title: 'Đơn giá', dataIndex: 'UnitPrice', align: 'right', render: money },
          { title: 'Thành tiền', dataIndex: 'Subtotal', align: 'right', render: money },
        ]}
      />}
    </Space>
  );
}

const statusMap = {
  Draft: ['default', 'Bản nháp'],
  PendingSignature: ['processing', 'Chờ xưởng ký xác nhận'],
  Signed: ['processing', 'Xưởng đã xác nhận'],
  PendingDeposit: ['warning', 'Chờ bạn xác nhận điều khoản & thanh toán cọc M1'],
  Active: ['success', 'Đang hiệu lực'],
  CompletedOnTime: ['success', 'Hoàn tất đúng hạn (+10đ)'],
  CompletedLate: ['orange', 'Hoàn tất trễ hạn (+3đ)'],
  Breached: ['error', 'Vi phạm (-20đ)'],
  Disputed: ['error', 'Đang tranh chấp'],
  Cancelled: ['default', 'Đã hủy'],
};

const milestoneStatusMap = {
  Pending: ['default', 'Chưa đến hạn'],
  AwaitingPayment: ['warning', 'Chờ thanh toán'],
  Paid: ['success', 'Đã thanh toán'],
  InProgress: ['processing', 'Đang thực hiện'],
  PendingReview: ['orange', 'Chờ khách nghiệm thu'],
  CompletedOnTime: ['success', 'Đạt chuẩn (Đúng hạn)'],
  CompletedLate: ['purple', 'Đạt chuẩn (Trễ hạn)'],
  Overdue: ['error', 'Quá hạn'],
  Failed: ['error', 'Từ chối / Cần sửa'],
};

const paymentStatusMap = {
  Pending: ['gold', 'Chờ thanh toán'],
  Processing: ['processing', 'Đang đối soát'],
  Completed: ['green', 'Thành công'],
  Failed: ['red', 'Thất bại'],
  Refunded: ['purple', 'Đã hoàn tiền'],
};

export default function ContractsAndMilestone({ onNavigate }) {
  const [contracts, setContracts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [paymentReviewOpen, setPaymentReviewOpen] = useState(false);
  const [paymentTermsConfirmed, setPaymentTermsConfirmed] = useState(false);


  // Milestones Drawer
  const [milestonesDrawerOpen, setMilestonesDrawerOpen] = useState(false);
  const [contractDetails, setContractDetails] = useState(null);
  const [milestoneRejectModalOpen, setMilestoneRejectModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  // Extension Modal
  const [extensionModalOpen, setExtensionModalOpen] = useState(false);
  const [extensionResponseNote, setExtensionResponseNote] = useState('');

  // Dispute Modal
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeEvidence, setDisputeEvidence] = useState('');

  // Final Acceptance Modal
  const [acceptanceModalOpen, setAcceptanceModalOpen] = useState(false);
  const [confirmedQuality, setConfirmedQuality] = useState(false);
  const [acceptanceNotes, setAcceptanceNotes] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      // Listing contracts may complete supplier acceptance for legacy accepted bids
      // and create the M1 payment, so fetch payments after the contract list returns.
      const contractData = await contractService.listMine();
      const paymentData = await paymentService.listMine();
      setContracts(contractData || []);
      setPayments(paymentData || []);
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(load, 0);
    return () => window.clearTimeout(timeout);
  }, [load]);

  useEffect(() => {
    const refreshContracts = (event) => {
      if (!event || ['contract', 'payment'].includes(event.category) || /^(contract|payment)\./.test(event.type || '')) load();
    };
    signalRManager.on('MarketplaceChanged', refreshContracts);
    signalRManager.on('ReceiveNotification', refreshContracts);
    return () => {
      signalRManager.off('MarketplaceChanged', refreshContracts);
      signalRManager.off('ReceiveNotification', refreshContracts);
    };
  }, [load]);

  const paymentByContract = useMemo(
    () => new Map(payments.filter((payment) => payment.contractId).map((payment) => [payment.contractId, payment])),
    [payments]
  );

  const openPaymentReview = async (contract) => {
    setActionLoading(true);
    try {
      const details = await contractService.get(contract.id);
      setSelected({ ...contract, ...details });
      setPaymentTermsConfirmed(false);
      setPaymentReviewOpen(true);
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const payWithVnPay = async () => {
    if (!paymentTermsConfirmed) {
      message.warning('Vui lòng xác nhận đã đọc điều khoản hợp đồng trước khi tiếp tục thanh toán.');
      return;
    }
    const contract = selected;
    const payment = paymentByContract.get(contract.id);
    if (!payment?.milestoneId) {
      message.warning('Chưa tìm thấy khoản cọc M1. Hãy tải lại danh sách hợp đồng để đồng bộ khoản thanh toán.');
      return;
    }
    setSelected(contract);
    setActionLoading(true);
    try {
      const result = await paymentService.createVnPayUrl(
        contract.id,
        payment.milestoneId,
        `${window.location.origin}/thanh-toan/ket-qua`
      );
      setPaymentReviewOpen(false);
      window.location.assign(result.paymentUrl);
    } catch (error) {
      message.error(errorMessage(error));
      setActionLoading(false);
    }
  };

  const viewMilestones = async (contract) => {
    setSelected(contract);
    setActionLoading(true);
    try {
      const details = await contractService.get(contract.id);
      setContractDetails(details);
      setMilestonesDrawerOpen(true);
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const handleVerifyMilestone = async (milestone, isApproved) => {
    if (!isApproved) {
      setSelectedMilestone(milestone);
      setRejectReason('');
      setMilestoneRejectModalOpen(true);
      return;
    }

    setActionLoading(true);
    try {
      await contractService.verifyMilestone(selected.id, milestone.id, true);
      message.success(`Đã phê duyệt mốc tiến độ "${milestone.name}" thành công!`);
      const details = await contractService.get(selected.id);
      setContractDetails(details);
      await load();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const submitRejectMilestone = async () => {
    if (!rejectReason.trim()) {
      message.warning('Vui lòng nhập lý do từ chối để xưởng bánh khắc phục.');
      return;
    }
    setActionLoading(true);
    try {
      await contractService.verifyMilestone(selected.id, selectedMilestone.id, false, rejectReason.trim());
      message.warning(`Đã gửi yêu cầu chỉnh sửa cho mốc "${selectedMilestone.name}".`);
      setMilestoneRejectModalOpen(false);
      const details = await contractService.get(selected.id);
      setContractDetails(details);
      await load();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const openExtensionReview = (contract) => {
    setSelected(contract);
    setExtensionResponseNote('');
    setExtensionModalOpen(true);
  };

  const respondExtension = async (isApproved) => {
    setActionLoading(true);
    try {
      await contractService.respondExtension(selected.id, isApproved, extensionResponseNote.trim());
      message.success(isApproved ? 'Đã chấp thuận gia hạn tiến độ.' : 'Đã từ chối gia hạn tiến độ.');
      setExtensionModalOpen(false);
      await load();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const openDispute = (contract) => {
    setSelected(contract);
    setDisputeReason('');
    setDisputeEvidence('');
    setDisputeModalOpen(true);
  };

  const submitDispute = async () => {
    if (!disputeReason.trim() || disputeReason.trim().length < 10) {
      message.warning('Vui lòng nhập lý do khiếu nại chi tiết (tối thiểu 10 ký tự).');
      return;
    }
    setActionLoading(true);
    try {
      const urls = disputeEvidence.trim() ? [disputeEvidence.trim()] : [];
      await contractService.raiseDispute(selected.id, disputeReason.trim(), urls);
      message.success('Đã gửi hồ sơ khiếu nại lên Hội đồng Quản trị Sàn MoonMarket.');
      setDisputeModalOpen(false);
      await load();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const openFinalAcceptance = (contract) => {
    setSelected(contract);
    setConfirmedQuality(false);
    setAcceptanceNotes('');
    setAcceptanceModalOpen(true);
  };

  const submitFinalAcceptance = async () => {
    if (!confirmedQuality) {
      message.warning('Bạn cần tích chọn xác nhận kiểm đếm đủ số lượng và đạt chất lượng.');
      return;
    }
    setActionLoading(true);
    try {
      await contractService.confirmFinalAcceptance(selected.id, true, acceptanceNotes.trim());
      message.success('Chúc mừng! Hợp đồng kinh tế đã được nghiệm thu và hoàn tất thành công.');
      setAcceptanceModalOpen(false);
      await load();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    {
      title: 'Hợp đồng',
      dataIndex: 'contractNumber',
      render: (value, item) => (
        <Space orientation="vertical" size={0}>
          <Text strong style={{ color: '#8c1524' }}>{value}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {item.title || 'Hợp đồng từ báo giá RFQ'}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Tổng giá trị',
      dataIndex: 'totalValue',
      align: 'right',
      render: money,
    },
    {
      title: 'Hạn giao',
      dataIndex: 'deliveryDeadline',
      render: (value) => value || '—',
    },
    {
      title: 'Các bước xác nhận',
      render: (_, item) =>
        <Space orientation="vertical" size={2}>
          {item.signedBySupplierAt
            ? <Tag color="success" icon={<CheckCircleOutlined />}>Xưởng đã ký</Tag>
            : <Tag color="processing">Đang chờ xưởng ký</Tag>}
          {item.status === 'PendingDeposit' && <Tag color="warning">Bạn cần xác nhận điều khoản và thanh toán M1</Tag>}
        </Space>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (value) => (
        <Tag color={statusMap[value]?.[0] || 'default'}>
          {statusMap[value]?.[1] || value}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      render: (_, item) => (
        <Space wrap size="small">
          {item.status === 'Draft' && (
            <Button
              size="small"
              onClick={async () => {
                setActionLoading(true);
                try {
                  await contractService.submitForSignature(item.id);
                  message.success('Đã gửi hợp đồng để ký.');
                  await load();
                } catch (error) {
                  message.error(errorMessage(error));
                } finally {
                  setActionLoading(false);
                }
              }}
            >
              Gửi ký
            </Button>
          )}

          {item.status === 'PendingDeposit' && (
            <Button
              type="primary"
              size="small"
              icon={<DollarOutlined />}
              loading={actionLoading}
              disabled={!paymentByContract.get(item.id)?.milestoneId}
              onClick={() => openPaymentReview(item)}
            >
              Xem hợp đồng & xác nhận thanh toán
            </Button>
          )}

          {['Active', 'CompletedOnTime', 'CompletedLate', 'Disputed', 'Breached'].includes(item.status) && (
            <Button
              size="small"
              icon={<OrderedListOutlined />}
              onClick={() => viewMilestones(item)}
            >
              Tiến độ & Mốc
            </Button>
          )}

          {item.status === 'Active' && (
            <>
              <Button
                type="primary"
                size="small"
                icon={<FileDoneOutlined />}
                onClick={() => openFinalAcceptance(item)}
              >
                Nghiệm thu dứt điểm
              </Button>
              <Button
                type="text"
                danger
                size="small"
                icon={<AlertOutlined />}
                onClick={() => openDispute(item)}
              >
                Khiếu nại
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="journey-page journey-page--contract">
      <CustomerHeader activeKey="hop-dong-tien-do" onNavigate={onNavigate} />
      <CustomerBreadcrumbBar onNavigate={onNavigate} items={[{ label: 'Hợp đồng & tiến độ' }]} />
      <main className="journey-page__main">
        <section className="journey-hero journey-hero--contract" aria-labelledby="contract-title">
          <div>
            <span className="journey-hero__label">Hồ sơ đơn hàng doanh nghiệp</span>
            <h1 id="contract-title">Hợp đồng & tiến độ thanh toán</h1>
            <p>Theo dõi điều khoản, khoản cọc và các mốc nghiệm thu của từng hợp đồng trong một nơi.</p>
          </div>
          <div className="journey-hero__aside">
            <FileDoneOutlined aria-hidden="true" />
            <strong>Mỗi mốc đều có căn cứ rõ ràng</strong>
            <span>Xem tiến độ, bằng chứng từ xưởng và xác nhận nghiệm thu khi đạt yêu cầu.</span>
          </div>
        </section>

        <div className="journey-steps" aria-label="Các bước thực hiện hợp đồng">
          <div><span>01</span><strong>Xưởng xác nhận</strong><small>Kiểm tra điều khoản hợp đồng</small></div>
          <div><span>02</span><strong>Đặt cọc M1</strong><small>Thanh toán qua VNPay</small></div>
          <div><span>03</span><strong>Nghiệm thu</strong><small>Duyệt từng mốc theo tiến độ</small></div>
        </div>

        <div className="journey-note"><DollarOutlined aria-hidden="true" /><span><strong>Khoản cọc được giữ trong ký quỹ.</strong> Tiền chỉ được giải ngân cho xưởng theo các mốc đã nghiệm thu.</span></div>

        <section className="journey-section" aria-labelledby="contracts-list-title">
          <div className="journey-section__head">
            <div><h2 id="contracts-list-title">Hợp đồng của bạn</h2><p>{loading ? 'Đang tải hợp đồng…' : `${contracts.length} hợp đồng`}</p></div>
            <Button icon={<ReloadOutlined />} onClick={load} loading={loading}>Tải lại</Button>
          </div>
          <div className="journey-desktop-table">
            <Table
              rowKey="id"
              loading={loading}
              dataSource={contracts}
              columns={columns}
              scroll={{ x: 1100 }}
              locale={{ emptyText: <div className="journey-empty"><FileDoneOutlined /><strong>Chưa có hợp đồng</strong><p>Khi bạn chọn một báo giá, hợp đồng sẽ xuất hiện tại đây để theo dõi.</p><Button onClick={() => onNavigate?.('so-sanh-bao-gia')}>Xem yêu cầu báo giá</Button></div> }}
            />
          </div>
          <div className="journey-mobile-list">
            {loading ? <p className="journey-empty">Đang tải hợp đồng…</p> : contracts.length ? contracts.map((item) => <article className="journey-record" key={item.id}>
              <div className="journey-record__top"><strong>{item.contractNumber}</strong><Tag color={statusMap[item.status]?.[0] || 'default'}>{statusMap[item.status]?.[1] || item.status}</Tag></div>
              <h3>{item.title || 'Hợp đồng từ báo giá RFQ'}</h3>
              <dl><div><dt>Giá trị</dt><dd>{money(item.totalValue)}</dd></div><div><dt>Hạn giao</dt><dd>{item.deliveryDeadline || '—'}</dd></div><div><dt>Xác nhận</dt><dd>{item.signedBySupplierAt ? 'Xưởng đã ký' : 'Chờ xưởng ký'}</dd></div></dl>
              <div className="journey-record__actions">{columns[5].render(null, item)}</div>
            </article>) : <div className="journey-empty"><FileDoneOutlined /><strong>Chưa có hợp đồng</strong><p>Khi bạn chọn một báo giá, hợp đồng sẽ xuất hiện tại đây.</p><Button onClick={() => onNavigate?.('so-sanh-bao-gia')}>Xem yêu cầu báo giá</Button></div>}
          </div>
        </section>

        <section className="journey-section" aria-labelledby="payments-list-title">
          <div className="journey-section__head"><div><h2 id="payments-list-title">Lịch sử thanh toán</h2><p>Đối chiếu các khoản cọc và thanh toán theo hợp đồng.</p></div></div>
          <div className="journey-desktop-table"><Table
            rowKey="id"
            size="small"
            pagination={{ pageSize: 8, showSizeChanger: false }}
            dataSource={payments}
            locale={{ emptyText: 'Chưa có giao dịch thanh toán nào.' }}
            columns={[
              { title: 'Mã giao dịch', dataIndex: 'paymentNumber', key: 'paymentNumber' },
              {
                title: 'Hợp đồng / đơn hàng',
                key: 'reference',
                render: (_, payment) => payment.contractId
                  ? <span>Hợp đồng · {contracts.find((contract) => contract.id === payment.contractId)?.contractNumber || payment.contractId.slice(0, 8)}</span>
                  : <span>{payment.orderId ? `Đơn hàng · ${payment.orderId.slice(0, 8)}` : '—'}</span>,
              },
              { title: 'Số tiền', dataIndex: 'amount', key: 'amount', align: 'right', render: money },
              { title: 'Phương thức', dataIndex: 'method', key: 'method', render: (method) => method === 'VNPay' ? 'VNPay' : method },
              {
                title: 'Trạng thái', dataIndex: 'status', key: 'status',
                render: (status) => <Tag color={paymentStatusMap[status]?.[0] || 'default'}>{paymentStatusMap[status]?.[1] || status}</Tag>,
              },
              {
                title: 'Thời gian', key: 'time',
                render: (_, payment) => {
                  const value = payment.paidAt || payment.createdAt || payment.expiresAt;
                  return value ? new Date(value).toLocaleString('vi-VN') : '—';
                },
              },
            ]}
          /></div>
          <div className="journey-mobile-list">
            {loading ? <p className="journey-empty">Đang tải giao dịch…</p> : payments.length ? payments.map((payment) => <article className="journey-record" key={payment.id}>
              <div className="journey-record__top"><strong>{payment.paymentNumber}</strong><Tag color={paymentStatusMap[payment.status]?.[0] || 'default'}>{paymentStatusMap[payment.status]?.[1] || payment.status}</Tag></div>
              <dl><div><dt>Số tiền</dt><dd>{money(payment.amount)}</dd></div><div><dt>Phương thức</dt><dd>{payment.method || '—'}</dd></div><div><dt>Thời gian</dt><dd>{payment.paidAt || payment.createdAt ? new Date(payment.paidAt || payment.createdAt).toLocaleString('vi-VN') : '—'}</dd></div></dl>
            </article>) : <p className="journey-empty">Chưa có giao dịch thanh toán nào.</p>}
          </div>
        </section>
      </main>
      <CustomerFooter onNavigate={onNavigate} />

      <Modal
        title={`Xem lại hợp đồng và thanh toán · ${selected?.contractNumber || ''}`}
        open={paymentReviewOpen}
        onCancel={() => setPaymentReviewOpen(false)}
        onOk={payWithVnPay}
        confirmLoading={actionLoading}
        okText="Xác nhận điều khoản & tiếp tục thanh toán"
        okButtonProps={{ disabled: !paymentTermsConfirmed, style: { background: '#8c1524', borderColor: '#8c1524' } }}
        cancelText="Quay lại"
        width={760}
      >
        {selected && <>
          <Alert type="info" showIcon style={{ marginBottom: 16 }} message="Xưởng đã xác nhận hợp đồng. Vui lòng kiểm tra toàn bộ nội dung trước khi thanh toán khoản cọc M1." />
          <Descriptions bordered size="small" column={{ xs: 1, sm: 2 }}>
            <Descriptions.Item label="Mã hợp đồng">{selected.contractNumber}</Descriptions.Item>
            <Descriptions.Item label="Tên hợp đồng">{selected.title || 'Hợp đồng RFQ'}</Descriptions.Item>
            <Descriptions.Item label="Tổng giá trị">{money(selected.totalValue)}</Descriptions.Item>
            <Descriptions.Item label="Hạn giao hàng">{selected.deliveryDeadline || '—'}</Descriptions.Item>
            <Descriptions.Item label="Khoản thanh toán">Đặt cọc M1 · {paymentByContract.get(selected.id)?.amount ? money(paymentByContract.get(selected.id).amount) : '—'}</Descriptions.Item>
            <Descriptions.Item label="Xưởng xác nhận">{selected.signedBySupplierAt ? new Date(selected.signedBySupplierAt).toLocaleString('vi-VN') : 'Đã xác nhận'}</Descriptions.Item>
            <Descriptions.Item label="Chi tiết thỏa thuận" span={2}><ContractTerms value={selected.termsAndConditions} /></Descriptions.Item>
          </Descriptions>
          {selected.milestones?.length > 0 && <div style={{ marginTop: 16 }}>
            <Text strong>Lịch thanh toán, sản xuất và nghiệm thu</Text>
            {selected.milestones.map((milestone) => <Card key={milestone.id} size="small" style={{ marginTop: 8 }}>
              <Space orientation="vertical" size={2}>
                <Text strong>{milestone.sequenceNumber}. {milestone.name}</Text>
                <Text>{money(milestone.amount)} · Hạn: {milestone.dueDate || 'Theo tiến độ hợp đồng'} · {milestone.description || ''}</Text>
              </Space>
            </Card>)}
          </div>}
          <Checkbox checked={paymentTermsConfirmed} onChange={(event) => setPaymentTermsConfirmed(event.target.checked)} style={{ marginTop: 18 }}>
            Tôi đã đọc, hiểu và xác nhận các thông tin, điều khoản hợp đồng và khoản cọc M1 ở trên.
          </Checkbox>
        </>}
      </Modal>

      {/* Modal Thanh toán Ký quỹ M1 */}
      {/* Drawer Xem Tiến Độ & Nghiệm Thu Milestones */}
      <Drawer
        title={`Tiến độ & Mốc nghiệm thu: ${selected?.contractNumber || ''}`}
        size={720}
        rootClassName="journey-milestones-drawer"
        open={milestonesDrawerOpen}
        onClose={() => setMilestonesDrawerOpen(false)}
      >
        {contractDetails && (
          <div>
            <Descriptions bordered size="small" column={{ xs: 1, sm: 2 }} style={{ marginBottom: 20 }}>
              <Descriptions.Item label="Tiêu đề">{contractDetails.title || 'Hợp đồng RFQ'}</Descriptions.Item>
              <Descriptions.Item label="Tổng giá trị">
                <Text strong style={{ color: '#8c1524' }}>{money(contractDetails.totalValue)}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Hạn chót giao">{contractDetails.deliveryDeadline || '—'}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color={statusMap[contractDetails.status]?.[0] || 'default'}>
                  {statusMap[contractDetails.status]?.[1] || contractDetails.status}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            {/* Banner nếu có yêu cầu xin gia hạn đang chờ xử lý */}
            {contractDetails.pendingExtension && (
              <Alert
                type="warning"
                showIcon
                icon={<ClockCircleOutlined />}
                style={{ marginBottom: 20 }}
                message="Xưởng sản xuất xin gia hạn tiến độ"
                description={
                  <div>
                    <p style={{ margin: '4px 0' }}>
                      <strong>Ngày đề xuất mới: </strong>
                      {contractDetails.pendingExtension.proposedDueDate}
                    </p>
                    <p style={{ margin: '4px 0' }}>
                      <strong>Lý do: </strong>
                      {contractDetails.pendingExtension.reason}
                    </p>
                    <Space style={{ marginTop: 8 }}>
                      <Button
                        type="primary"
                        size="small"
                        onClick={() => openExtensionReview(contractDetails)}
                      >
                        Phản hồi đơn gia hạn
                      </Button>
                    </Space>
                  </div>
                }
              />
            )}

            <Title level={5} style={{ marginBottom: 16 }}>Danh sách các mốc thanh toán & giao hàng</Title>
            <Steps
              direction="vertical"
              current={contractDetails.milestones?.findIndex((m) => m.status === 'PendingReview' || m.status === 'InProgress')}
              items={contractDetails.milestones?.map((milestone) => ({
                title: (
                  <Space>
                    <Text strong>{milestone.name}</Text>
                    <Tag color={milestoneStatusMap[milestone.status]?.[0] || 'default'}>
                      {milestoneStatusMap[milestone.status]?.[1] || milestone.status}
                    </Tag>
                  </Space>
                ),
                description: (
                  <div style={{ marginTop: 6, marginBottom: 16, background: '#fafafa', padding: 12, borderRadius: 6 }}>
                    <div>
                      <span>Giá trị mốc: </span>
                      <strong style={{ color: '#8c1524' }}>{money(milestone.amount)}</strong>
                      <span> ({milestone.percentage}%)</span>
                    </div>
                    <div>Hạn thực hiện: <strong>{milestone.dueDate || '—'}</strong></div>
                    {milestone.completionDate && (
                      <div>Ngày nghiệm thu: <strong>{milestone.completionDate}</strong></div>
                    )}

                    {milestone.progressNotes && (
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary">Báo cáo từ xưởng:</Text>
                        <Paragraph style={{ margin: '4px 0', background: '#fff', padding: 8, borderRadius: 4 }}>
                          {milestone.progressNotes}
                        </Paragraph>
                      </div>
                    )}

                    {milestone.evidenceUrls && milestone.evidenceUrls.length > 0 && (
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary">Hình ảnh/Chứng chỉ thực tế:</Text>
                        <div style={{ marginTop: 6, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          <Image.PreviewGroup>
                            {milestone.evidenceUrls.map((url, index) => (
                              <Image
                                key={index}
                                width={80}
                                height={80}
                                src={url}
                                style={{ objectFit: 'cover', borderRadius: 4 }}
                                fallback="https://placehold.co/100x100?text=Evidence"
                              />
                            ))}
                          </Image.PreviewGroup>
                        </div>
                      </div>
                    )}

                    {/* Customer Actions for Milestone */}
                    {milestone.status === 'PendingReview' && (
                      <div style={{ marginTop: 12 }}>
                        <Divider style={{ margin: '8px 0' }} />
                        <Space>
                          <Button
                            type="primary"
                            size="small"
                            icon={<CheckCircleOutlined />}
                            onClick={() => handleVerifyMilestone(milestone, true)}
                          >
                            Phê duyệt nghiệm thu mốc
                          </Button>
                          <Button
                            danger
                            size="small"
                            icon={<CloseCircleOutlined />}
                            onClick={() => handleVerifyMilestone(milestone, false)}
                          >
                            Yêu cầu chỉnh sửa
                          </Button>
                        </Space>
                      </div>
                    )}
                  </div>
                ),
              }))}
            />
          </div>
        )}
      </Drawer>

      {/* Modal Từ Chối Mốc Tiến Độ */}
      <Modal
        title={`Từ Chối Nghiệm Thu: ${selectedMilestone?.name || ''}`}
        open={milestoneRejectModalOpen}
        onCancel={() => setMilestoneRejectModalOpen(false)}
        onOk={submitRejectMilestone}
        confirmLoading={actionLoading}
        okText="Gửi yêu cầu chỉnh sửa"
        okButtonProps={{ danger: true }}
      >
        <p style={{ color: '#666' }}>
          Vui lòng chỉ rõ hạng mục chưa đạt yêu cầu để xưởng sản xuất khắc phục (VD: Thiếu tem phụ ATTP, tỷ lệ vỡ vỏ hộp vượt quá 2%...):
        </p>
        <TextArea
          rows={3}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Nhập lý do chi tiết..."
        />
      </Modal>

      {/* Modal Phản Hồi Đơn Xin Gia Hạn */}
      <Modal
        title="Phản Hồi Yêu Cầu Xin Gia Hạn Tiến Độ"
        open={extensionModalOpen}
        onCancel={() => setExtensionModalOpen(false)}
        footer={[
          <Button key="reject" danger onClick={() => respondExtension(false)} loading={actionLoading}>
            Từ chối gia hạn
          </Button>,
          <Button key="approve" type="primary" onClick={() => respondExtension(true)} loading={actionLoading}>
            Chấp thuận gia hạn
          </Button>,
        ]}
      >
        <p>
          Xưởng xin gia hạn ngày giao hàng mới là: <strong>{selected?.pendingExtension?.proposedDueDate}</strong>
        </p>
        <p>Lý do: <em>{selected?.pendingExtension?.reason}</em></p>
        <div style={{ marginTop: 12 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Ghi chú phản hồi (Tùy chọn):</label>
          <TextArea
            rows={2}
            value={extensionResponseNote}
            onChange={(e) => setExtensionResponseNote(e.target.value)}
            placeholder="VD: Đồng ý gia hạn với điều kiện giao đúng trước 12h trưa..."
          />
        </div>
      </Modal>

      {/* Modal Khiếu Nại Tranh Chấp */}
      <Modal
        title="Mở Khiếu Nại Tranh Chấp Hợp Đồng (Dispute)"
        open={disputeModalOpen}
        onCancel={() => setDisputeModalOpen(false)}
        onOk={submitDispute}
        confirmLoading={actionLoading}
        okText="Gửi hồ sơ khiếu nại"
        okButtonProps={{ danger: true }}
      >
        <Alert
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
          message="Đóng băng quỹ ký quỹ Escrow"
          description="Khi mở khiếu nại, hợp đồng chuyển sang trạng thái Disputed và toàn bộ tiền cọc sẽ bị tạm khóa cho đến khi Ban quản trị sàn phân xử độc lập."
        />
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
            Lý do khiếu nại vi phạm (Tối thiểu 10 ký tự):
          </label>
          <TextArea
            rows={3}
            value={disputeReason}
            onChange={(e) => setDisputeReason(e.target.value)}
            placeholder="Mô tả sự cố: bánh bị mốc hỏng, giao trễ quá hạn không thông báo, vi phạm cam kết bao bì..."
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4 }}>URL hình ảnh/biên bản chứng cứ (Tùy chọn):</label>
          <Input
            value={disputeEvidence}
            onChange={(e) => setDisputeEvidence(e.target.value)}
            placeholder="https://..."
          />
        </div>
      </Modal>

      {/* Modal Nghiệm Thu Tổng Thể Dứt Điểm (Feature #18) */}
      <Modal
        title="Biên Bản Nghiệm Thu Tổng Thể & Hoàn Tất Hợp Đồng"
        open={acceptanceModalOpen}
        onCancel={() => setAcceptanceModalOpen(false)}
        onOk={submitFinalAcceptance}
        confirmLoading={actionLoading}
        okText="Ký biên bản & Hoàn tất hợp đồng"
        okButtonProps={{ style: { background: '#52c41a', borderColor: '#52c41a' } }}
      >
        <Alert
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
          message="Quyết toán hợp đồng kinh tế B2B"
          description="Xác nhận nghiệm thu sẽ giải phóng đợt thanh toán cuối cùng cho xưởng và cộng điểm uy tín giao dịch (+10đ nếu đúng hạn, +3đ nếu trễ hạn)."
        />
        <Descriptions bordered size="small" column={1} style={{ marginBottom: 16 }}>
          <Descriptions.Item label="Hợp đồng">{selected?.contractNumber}</Descriptions.Item>
          <Descriptions.Item label="Tổng thanh toán">{money(selected?.totalValue)}</Descriptions.Item>
          <Descriptions.Item label="Hạn giao ban đầu">{selected?.deliveryDeadline || '—'}</Descriptions.Item>
        </Descriptions>
        <div style={{ marginBottom: 12 }}>
          <Checkbox
            checked={confirmedQuality}
            onChange={(e) => setConfirmedQuality(e.target.checked)}
          >
            <strong>Tôi xác nhận đã kiểm tra đủ số lượng, đạt chuẩn ATTP & bao bì nguyên vẹn 100%.</strong>
          </Checkbox>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4 }}>Nhận xét nghiệm thu (Tùy chọn):</label>
          <TextArea
            rows={2}
            value={acceptanceNotes}
            onChange={(e) => setAcceptanceNotes(e.target.value)}
            placeholder="VD: Hàng giao đúng hẹn, bánh thơm ngon, đóng gói rất cẩn thận..."
          />
        </div>
      </Modal>
    </div>
  );
}
