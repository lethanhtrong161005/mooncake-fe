import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Input,
  Tabs,
  Modal,
  Descriptions,
  message,
  Alert,
  Form,
  InputNumber,
  Radio,
  Row,
  Col,
  Statistic,
  Image,
  Tooltip,
} from 'antd';
import {
  FileProtectOutlined,
  DollarCircleOutlined,
  WarningOutlined,
  BankOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import { adminService } from '../../services/adminService';
import { contractService } from '../../services/contractService';
import deliveryService from '../../services/deliveryService';
import { disputeStatusLabel, disputeIssueTypeLabel } from '../../constants/disputeLabels';
import orderService from '../../services/orderService';
import usePagedList from '../../hooks/usePagedList';
import FilterBar from '../../components/common/FilterBar';

const { TextArea } = Input;

export default function TradingOperating({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('directOrders');
  const [loading, setLoading] = useState(false);

  // Contract disputes & monitoring state (Legacy B2B)
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  const contractDisputePage = usePagedList(adminService.getDisputesPaged, { syncUrl: false });
  const disputes = contractDisputePage.items.map((d) => ({
    key: d.id, id: d.id, disputeId: d.id ? `DISP-${d.id.slice(0, 8)}` : 'DISP',
    contractNo: d.contractNumber || 'HĐ-B2B', buyer: d.customerName || 'Bên mua',
    seller: d.supplierName || 'Bên bán', reason: d.disputeReason || 'Tranh chấp hợp đồng',
    escrowAmount: `${Number(d.heldEscrowAmount || 0).toLocaleString('vi-VN')} ₫`,
    status: (d.status || 'pending').toLowerCase(), severity: 'high',
    createdAt: d.raisedAt || d.createdAt,
  }));
  const [contracts, setContracts] = useState([]);
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [resolveAction, setResolveAction] = useState('penalty');
  const [penaltyPoints, setPenaltyPoints] = useState(20);
  const [resolutionNote, setResolutionNote] = useState('');

  // Direct Bulk Order Admin Operations state (Enterprise Feature)
  const [adminOps, setAdminOps] = useState({
    sandboxSimulationOnly: true,
    platformHeldAmount: 0,
    platformDisputedAmount: 0,
    platformEligibleAmount: 0,
    platformRefundedSimulatedAmount: 0,
    platformPaidOutSimulatedAmount: 0,
    refundCases: [],
    payoutRequests: [],
    deliveryDisputes: [],
  });
  const refundPage = usePagedList(orderService.listAdminRefundCases, { syncUrl: false });
  const payoutPage = usePagedList(orderService.listAdminPayoutRequests, { syncUrl: false });
  const deliveryDisputePage = usePagedList(orderService.listAdminDeliveryDisputes, { syncUrl: false });

  // Modals for Direct Bulk Order operations
  const [activeDisputeItem, setActiveDisputeItem] = useState(null);
  const [disputeResolutionAction, setDisputeResolutionAction] = useState('ReleasePayout');
  const [disputeRefundAmount, setDisputeRefundAmount] = useState(0);
  const [disputeNotes, setDisputeNotes] = useState('');
  const [disputeSubmitting, setDisputeSubmitting] = useState(false);
  const [disputePodProofs, setDisputePodProofs] = useState([]);
  const [disputePodLoading, setDisputePodLoading] = useState(false);

  const [activeRefundCase, setActiveRefundCase] = useState(null);
  const [refundCaseApprove, setRefundCaseApprove] = useState(true);
  const [refundApprovedAmount, setRefundApprovedAmount] = useState(0);
  const [refundReferenceCode, setRefundReferenceCode] = useState('');
  const [refundCaseNotes, setRefundCaseNotes] = useState('');
  const [refundSubmitting, setRefundSubmitting] = useState(false);

  const [activePayoutRequest, setActivePayoutRequest] = useState(null);
  const [payoutApprove, setPayoutApprove] = useState(true);
  const [payoutReferenceCode, setPayoutReferenceCode] = useState('');
  const [payoutNotes, setPayoutNotes] = useState('');
  const [payoutSubmitting, setPayoutSubmitting] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [contractData, enterpriseData] = await Promise.allSettled([
        contractService.listMine(),
        orderService.getAdminOperationsSummary(),
      ]);

      if (contractData.status === 'fulfilled' && contractData.value) {
        const raw = contractData.value;
        const list = Array.isArray(raw) ? raw : (raw.items || []);
        setContracts(list.map((c, idx) => ({
          key: c.id || `${idx}`,
          contractNo: c.contractNumber || c.contractNo || `HD-2025-${idx + 1}`,
          buyer: c.customerName || c.buyer || 'Khách hàng',
          seller: c.supplierName || c.seller || 'Xưởng Bánh',
          value: typeof c.totalAmount === 'number' ? `${c.totalAmount.toLocaleString('vi-VN')} ₫` : c.value || '0 ₫',
          progress: c.status || 'Active',
          escrowStatus: c.escrowStatus || 'Bảo chứng an toàn',
          status: (c.status || 'active').toLowerCase(),
        })));
      }

      if (enterpriseData.status === 'fulfilled' && enterpriseData.value) {
        setAdminOps(enterpriseData.value);
      }
    } catch (err) {
      console.warn('TradingOperating load error:', err);
    } finally {
      setLoading(false);
    }
    refundPage.refresh();
    payoutPage.refresh();
    deliveryDisputePage.refresh();
    contractDisputePage.refresh();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refundPage.refresh, payoutPage.refresh, deliveryDisputePage.refresh, contractDisputePage.refresh]);

  useEffect(() => {
    void Promise.resolve().then(loadData);
  }, [loadData]);

  // Legacy dispute modal handler
  const handleOpenDisputeModal = (record) => {
    setSelectedDispute(record);
    setResolveAction('penalty');
    setPenaltyPoints(20);
    setResolutionNote('');
    setDisputeModalOpen(true);
  };

  const handleConfirmResolution = async () => {
    if (!resolutionNote.trim()) {
      message.error('Vui lòng nhập biên bản phán quyết phân xử.');
      return;
    }

    try {
      if (selectedDispute?.id) {
        await adminService.resolveDispute(selectedDispute.id, {
          resolutionType: resolveAction === 'penalty' ? 'SupplierAtFault' : 'MutualAgreement',
          refundAmount: 0,
          adminVerdict: resolutionNote.trim(),
          deductReputationPoints: penaltyPoints,
        });
      }

      contractDisputePage.refresh();

      message.success(
        `Đã giải quyết xong tranh chấp ${selectedDispute.disputeId}! Áp dụng chế tài: Trừ ${penaltyPoints} điểm uy tín NCC và giải ngân Escrow bảo vệ người mua.`
      );
      setDisputeModalOpen(false);
    } catch (err) {
      message.error(err.message || 'Không thể cập nhật phân xử.');
    }
  };

  // Direct Bulk Order Dispute Modal Handler
  const handleOpenDirectDisputeModal = (dispute) => {
    setActiveDisputeItem(dispute);
    setDisputePodProofs([]);
    setDisputeResolutionAction('ReleasePayout');
    setDisputeRefundAmount(dispute.orderPaidAmount || 0);
    setDisputeNotes('');

    if (dispute.orderId) {
      setDisputePodLoading(true);
      deliveryService.getByOrder(dispute.orderId)
        .then(async (deliveries) => {
          const list = (Array.isArray(deliveries) ? deliveries : [deliveries]).filter((d) => d?.id);
          const proofLists = await Promise.all(
            list.map((d) => deliveryService.getProofs(d.id).catch(() => d.proofs || [])),
          );
          const proofs = proofLists
            .flatMap((items) => (Array.isArray(items) ? items : []))
            .filter((p) => typeof p?.photoUrl === 'string' && p.photoUrl.length > 0);
          setDisputePodProofs(proofs);
        })
        .catch(() => {
          setDisputePodProofs([]);
          message.warning('Không tải được ảnh biên bản giao nhận. Hãy mở lại hộp thoại để thử lại.');
        })
        .finally(() => setDisputePodLoading(false));
    }
  };

  const handleResolveDirectDispute = async () => {
    if (!disputeNotes.trim()) {
      message.error('Vui lòng nhập căn cứ phân xử khiếu nại giao hàng.');
      return;
    }

    try {
      setDisputeSubmitting(true);
      await orderService.resolveAdminDeliveryDispute(activeDisputeItem.id, {
        resolutionAction: disputeResolutionAction,
        refundAmount: disputeResolutionAction === 'PartialRefund' ? disputeRefundAmount : 0,
        notes: disputeNotes.trim(),
      });
      message.success('Đã ban hành phán quyết khiếu nại giao hàng thành công!');
      setActiveDisputeItem(null);
      loadData();
    } catch (err) {
      message.error(err.message || 'Không thể giải quyết khiếu nại giao hàng.');
    } finally {
      setDisputeSubmitting(false);
    }
  };

  // Direct Bulk Order Refund Case Modal Handler
  const handleOpenRefundCaseModal = (rc) => {
    setActiveRefundCase(rc);
    setRefundCaseApprove(true);
    const suggested = rc.suggestedRefundAmount ?? rc.proposedRefundAmount ?? rc.requestedAmount ?? 0;
    setRefundApprovedAmount(suggested);
    setRefundReferenceCode(`REF-SIM-${Date.now().toString().slice(-6)}`);
    setRefundCaseNotes('Phê duyệt hoàn tiền theo quy chế bảo vệ đơn hàng số lượng lớn.');
  };

  const handleProcessRefundCase = async () => {
    if (!refundCaseNotes.trim()) {
      message.error('Vui lòng nhập ghi chú xử lý hoàn tiền.');
      return;
    }

    try {
      setRefundSubmitting(true);
      await orderService.processAdminRefundCase(activeRefundCase.id, {
        approve: refundCaseApprove,
        approvedAmount: refundCaseApprove ? refundApprovedAmount : 0,
        refundReferenceCode: refundCaseApprove ? refundReferenceCode : undefined,
        notes: refundCaseNotes.trim(),
      });
      message.success(refundCaseApprove ? 'Đã duyệt hoàn tiền mô phỏng thành công!' : 'Đã từ chối yêu cầu hoàn tiền.');
      setActiveRefundCase(null);
      loadData();
    } catch (err) {
      message.error(err.message || 'Không thể xử lý yêu cầu hoàn tiền.');
    } finally {
      setRefundSubmitting(false);
    }
  };

  // Direct Bulk Order Payout Request Modal Handler
  const handleOpenPayoutRequestModal = (pr) => {
    setActivePayoutRequest(pr);
    setPayoutApprove(true);
    setPayoutReferenceCode(`PAY-SIM-${Date.now().toString().slice(-6)}`);
    setPayoutNotes('Phê duyệt giải ngân tiền hàng đã giao nhận thành công và đối soát đủ điều kiện.');
  };

  const handleProcessPayoutRequest = async () => {
    if (!payoutNotes.trim()) {
      message.error('Vui lòng nhập ghi chú phê duyệt payout.');
      return;
    }

    try {
      setPayoutSubmitting(true);
      await orderService.processAdminPayoutRequest(activePayoutRequest.id, {
        approve: payoutApprove,
        payoutReferenceCode: payoutApprove ? payoutReferenceCode : undefined,
        notes: payoutNotes.trim(),
      });
      message.success(payoutApprove ? 'Đã phê duyệt giải ngân mô phỏng (Sandbox) thành công!' : 'Đã từ chối yêu cầu giải ngân.');
      setActivePayoutRequest(null);
      loadData();
    } catch (err) {
      message.error(err.message || 'Không thể xử lý yêu cầu giải ngân.');
    } finally {
      setPayoutSubmitting(false);
    }
  };

  // Columns definitions for Legacy B2B
  const disputeColumns = [
    {
      title: 'Mã Khiếu Nại',
      dataIndex: 'disputeId',
      key: 'disputeId',
      render: (id) => <span style={{ fontWeight: 600, color: '#cf1322' }}>{id}</span>,
    },
    {
      title: 'Hợp Đồng B2B',
      dataIndex: 'contractNo',
      key: 'contractNo',
      render: (c) => <span style={{ fontWeight: 600, color: '#1677ff' }}>{c}</span>,
    },
    {
      title: 'Các Bên Liên Quan',
      key: 'parties',
      render: (_, r) => (
        <div>
          <div><strong>Mua:</strong> {r.buyer}</div>
          <div style={{ color: '#666' }}><strong>Bán:</strong> {r.seller}</div>
        </div>
      ),
    },
    {
      title: 'Nguyên Nhân Tranh Chấp',
      dataIndex: 'reason',
      key: 'reason',
      render: (text) => <div style={{ maxWidth: 300, color: '#333' }}>{text}</div>,
    },
    {
      title: 'Tiền Ký Quỹ Đóng Băng',
      dataIndex: 'escrowAmount',
      key: 'escrowAmount',
      align: 'right',
      render: (amt) => <span style={{ fontWeight: 700, color: '#cf1322' }}>{amt}</span>,
    },
    {
      title: 'Mức Độ',
      dataIndex: 'severity',
      key: 'severity',
      render: (s) => (
        <Tag color={s === 'high' ? 'volcano' : 'gold'}>
          {s === 'high' ? 'Nghiêm trọng (Breach)' : 'Trung bình (Late)'}
        </Tag>
      ),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) =>
        status === 'pending' ? (
          <Tag color="error">Chờ HQ phân xử</Tag>
        ) : (
          <Tag color="success">Đã giải quyết</Tag>
        ),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          danger={record.status === 'pending'}
          icon={<FileProtectOutlined />}
          onClick={() => handleOpenDisputeModal(record)}
        >
          {record.status === 'pending' ? 'Phân Xử' : 'Xem Kết Quả'}
        </Button>
      ),
    },
  ];

  const contractColumns = [
    {
      title: 'Số Hợp Đồng',
      dataIndex: 'contractNo',
      key: 'contractNo',
      render: (c) => <span style={{ fontWeight: 600, color: '#1677ff' }}>{c}</span>,
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
      title: 'Giá Trị Hợp Đồng',
      dataIndex: 'value',
      key: 'value',
      align: 'right',
      render: (v) => <span style={{ fontWeight: 600, color: '#8c1524' }}>{v}</span>,
    },
    {
      title: 'Tiến Độ Milestone',
      dataIndex: 'progress',
      key: 'progress',
      render: (p) => <Tag color="blue">{p}</Tag>,
    },
    {
      title: 'Tình Trạng Escrow',
      dataIndex: 'escrowStatus',
      key: 'escrowStatus',
      render: (s) => <Tag color="green">{s}</Tag>,
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        if (status === 'active') return <Tag color="success">Đang hiệu lực</Tag>;
        if (status === 'completed') return <Tag color="default">Đã hoàn thành</Tag>;
        return <Tag color="warning">Chờ đặt cọc M1</Tag>;
      },
    },
  ];

  // Columns for Direct Bulk Order Delivery Disputes
  const directDisputeColumns = [
    {
      title: 'Mã Đơn / Khiếu Nại',
      key: 'identifiers',
      render: (_, r) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1677ff' }}>{r.orderNumber || 'ORD-N/A'}</div>
          <div style={{ fontSize: 11, color: '#888' }}>ID: {r.id.slice(0, 8)}...</div>
        </div>
      ),
    },
    {
      title: 'Loại Vấn Đề',
      dataIndex: 'issueType',
      key: 'issueType',
      render: (t) => {
        const map = {
          DamagedGoods: { text: 'Hàng hư hỏng / Bể vỡ', color: 'volcano' },
          MissingItems: { text: 'Thiếu số lượng', color: 'orange' },
          WrongItems: { text: 'Sai quy cách / Mẫu mã', color: 'red' },
          LateDelivery: { text: 'Giao trễ hạn nghiêm trọng', color: 'gold' },
        };
        const item = { text: disputeIssueTypeLabel(t), color: map[t]?.color || 'blue' };
        return <Tag color={item.color}>{item.text}</Tag>;
      },
    },
    {
      title: 'Mô Tả Của Khách Hàng',
      dataIndex: 'description',
      key: 'description',
      render: (desc) => <div style={{ maxWidth: 280, fontSize: 13 }}>{desc}</div>,
    },
    {
      title: 'Bằng Chứng Ảnh',
      dataIndex: 'evidenceUrls',
      key: 'evidenceUrls',
      render: (urls) => {
        if (!urls || urls.length === 0) return <span style={{ color: '#aaa', fontSize: 12 }}>Không có</span>;
        return (
          <Space orientation="horizontal" size={4}>
            {urls.slice(0, 2).map((url, i) => (
              <Image key={i} src={url} width={40} height={40} style={{ objectFit: 'cover', borderRadius: 4 }} />
            ))}
          </Space>
        );
      },
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (st, record) => {
        if (st === 'AwaitingSupplierRebuttal') {
          const deadline = record.rebuttalDeadlineAtUtc || record.rebuttalDeadlineAt;
          const isOverdue = deadline ? new Date(deadline).getTime() <= now : false;
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Tag color="warning">Chờ xưởng phản biện</Tag>
              {deadline && (
                <span style={{ fontSize: 11, color: isOverdue ? '#cf1322' : '#d48806' }}>
                  {isOverdue ? 'Đã quá hạn 48h' : `Đến: ${new Date(deadline).toLocaleString('vi-VN')}`}
                </span>
              )}
            </div>
          );
        }
        if (st === 'Open') return <Tag color="processing">{disputeStatusLabel(st)}</Tag>;
        if (st === 'Reported' || st === 'Investigating') return <Tag color="error">Đang Tranh Chấp</Tag>;
        if (st?.startsWith('Resolved')) return <Tag color="success">Đã Xử Lý</Tag>;
        return <Tag>{disputeStatusLabel(st)}</Tag>;
      },
    },
    {
      title: 'Ngày Báo',
      dataIndex: 'createdAtUtc',
      key: 'createdAtUtc',
      render: (d) => new Date(d).toLocaleString('vi-VN'),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => {
        const deadline = record.rebuttalDeadlineAtUtc || record.rebuttalDeadlineAt;
        const hasRebuttal = Boolean(
          record.supplierRebuttalNotes ||
          record.supplierRebuttalAt ||
          record.supplierRebuttalAtUtc ||
          record.status === 'Open',
        );
        const isDeadlinePassed = deadline ? new Date(deadline).getTime() <= now : false;
        const isLocked = record.status === 'AwaitingSupplierRebuttal' && !hasRebuttal && !isDeadlinePassed;
        const lockText = isLocked
          ? `Chờ xưởng phản biện đến ${deadline ? new Date(deadline).toLocaleString('vi-VN') : ''}`
          : '';

        return (
          <Tooltip title={lockText || undefined}>
            <Button
              type="primary"
              size="small"
              danger={!record.status?.startsWith('Resolved') && !isLocked}
              icon={<FileProtectOutlined />}
              onClick={() => handleOpenDirectDisputeModal(record)}
            >
              {record.status?.startsWith('Resolved') ? 'Xem Kết Quả' : isLocked ? 'Chờ phản biện' : 'Phán Quyết'}
            </Button>
          </Tooltip>
        );
      },
    },
  ];

  // Columns for Direct Bulk Order Refund Cases
  const refundCaseColumns = [
    {
      title: 'Mã Hồ Sơ',
      dataIndex: 'caseNumber',
      key: 'caseNumber',
      render: (num) => <span style={{ fontWeight: 600, color: '#cf1322' }}>{num}</span>,
    },
    {
      title: 'Số Tiền Yêu Cầu',
      dataIndex: 'requestedAmount',
      key: 'requestedAmount',
      align: 'right',
      render: (amt) => (
        <span style={{ fontWeight: 700, color: '#cf1322' }}>
          {(amt || 0).toLocaleString('vi-VN')} ₫
        </span>
      ),
    },
    {
      title: 'Lý Do Hoàn Tiền',
      dataIndex: 'reason',
      key: 'reason',
      render: (r) => <div style={{ maxWidth: 280, fontSize: 13 }}>{r}</div>,
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (st) => {
        if (st === 'PendingAdminReview') return <Tag color="warning">Chờ Admin Duyệt</Tag>;
        if (st === 'Approved' || st === 'Processed') return <Tag color="success">Đã Hoàn Tiền (Sandbox)</Tag>;
        if (st === 'Rejected') return <Tag color="default">Từ Chối</Tag>;
        return <Tag>{disputeStatusLabel(st)}</Tag>;
      },
    },
    {
      title: 'Ngày Tạo',
      dataIndex: 'createdAtUtc',
      key: 'createdAtUtc',
      render: (d) => new Date(d).toLocaleString('vi-VN'),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          disabled={record.status !== 'PendingAdminReview'}
          onClick={() => handleOpenRefundCaseModal(record)}
        >
          {record.status === 'PendingAdminReview' ? 'Xử Lý Hoàn' : 'Đã Xử Lý'}
        </Button>
      ),
    },
  ];

  // Columns for Direct Bulk Order Payout Requests
  const payoutRequestColumns = [
    {
      title: 'Mã Yêu Cầu',
      dataIndex: 'requestNumber',
      key: 'requestNumber',
      render: (num) => <span style={{ fontWeight: 600, color: '#389e0d' }}>{num}</span>,
    },
    {
      title: 'Mã Đơn Hàng',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (num) => <span style={{ fontWeight: 600, color: '#1677ff' }}>{num || 'ORD-N/A'}</span>,
    },
    {
      title: 'Số Tiền Giải Ngân',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (amt) => (
        <span style={{ fontWeight: 700, color: '#389e0d' }}>
          {(amt || 0).toLocaleString('vi-VN')} ₫
        </span>
      ),
    },
    {
      title: 'Tài Khoản Thụ Hưởng NCC',
      dataIndex: 'bankSnapshotJson',
      key: 'bankSnapshotJson',
      render: (json) => {
        try {
          const bank = JSON.parse(json);
          return (
            <div style={{ fontSize: 12 }}>
              <div style={{ fontWeight: 600 }}>{bank.BankName || bank.bankName}</div>
              <div>STK: <span style={{ fontFamily: 'monospace' }}>{bank.AccountNumber || bank.accountNumber}</span></div>
              <div style={{ color: '#666' }}>Chủ TK: {bank.AccountHolderName || bank.accountHolderName}</div>
            </div>
          );
        } catch {
          return <span style={{ fontSize: 12, color: '#888' }}>{json || 'N/A'}</span>;
        }
      },
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (st) => {
        if (st === 'PendingAdminReview') return <Tag color="warning">Chờ Duyệt Giải Ngân</Tag>;
        if (st === 'Approved' || st === 'PaidOutSimulated') return <Tag color="green">Đã Giải Ngân (Sandbox)</Tag>;
        if (st === 'Rejected') return <Tag color="default">Từ Chối</Tag>;
        return <Tag>{disputeStatusLabel(st)}</Tag>;
      },
    },
    {
      title: 'Ngày Yêu Cầu',
      dataIndex: 'createdAtUtc',
      key: 'createdAtUtc',
      render: (d) => new Date(d).toLocaleString('vi-VN'),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          disabled={record.status !== 'PendingAdminReview'}
          style={{ background: record.status === 'PendingAdminReview' ? '#389e0d' : undefined, borderColor: '#389e0d' }}
          onClick={() => handleOpenPayoutRequestModal(record)}
        >
          {record.status === 'PendingAdminReview' ? 'Duyệt Payout' : 'Đã Xong'}
        </Button>
      ),
    },
  ];

  return (
    <ColonyAdminLayout
      role="Admin"
      activeKey="admin/van-hanh-giao-dich"
      onNavigate={onNavigate}
      title="Vận Hành Giao Dịch, Đối Soát & Phân Xử Tranh Chấp"
      subtitle="Giám sát dòng tiền ký quỹ Escrow, giải quyết tranh chấp giao hàng và đối soát giải ngân cho Nhà cung cấp"
    >
      <Card bordered={false} style={{ borderRadius: 10 }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'directOrders',
              label: (
                <span>
                  📦 Đơn Hàng Doanh Nghiệp (Direct Bulk Orders){' '}
                  {((adminOps.deliveryDisputes?.length || 0) + (adminOps.refundCases?.length || 0) + (adminOps.payoutRequests?.length || 0)) > 0 && (
                    <Tag color="volcano" style={{ marginLeft: 4 }}>
                      {(adminOps.deliveryDisputes?.length || 0) + (adminOps.refundCases?.length || 0) + (adminOps.payoutRequests?.length || 0)}
                    </Tag>
                  )}
                </span>
              ),
              children: (
                <div>
                  <Alert
                    message="Mô Hình Vận Hành Ký Quỹ & Đối Soát Doanh Nghiệp (Enterprise Direct Bulk Order)"
                    description={
                      <div>
                        Toàn bộ tiền đặt cọc (Deposit) và thanh toán đợt còn lại qua VNPay được sàn tự động khóa trong trạng thái{' '}
                        <strong>Lưu ký Escrow (Held)</strong>. Sau khi NCC hoàn tất giao hàng và người mua xác nhận biên bản PoD đủ 48h, tiền được chuyển sang{' '}
                        <strong>Sẵn sàng giải ngân (Eligible)</strong>. Tính năng giải ngân được mô phỏng an toàn trong môi trường Sandbox (Chưa kích hoạt chuyển khoản thực).
                      </div>
                    }
                    type="info"
                    showIcon
                    style={{ marginBottom: 20 }}
                  />

                  {/* Financial Overview Cards */}
                  <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                    <Col xs={24} sm={12} md={8} lg={4}>
                      <Card size="small" style={{ borderRadius: 8, background: '#fafafa' }}>
                        <Statistic
                          title="Ký Quỹ Sàn (Held)"
                          value={adminOps.platformHeldAmount || 0}
                          precision={0}
                          valueStyle={{ color: '#d46b08', fontWeight: 700 }}
                          suffix="₫"
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={5}>
                      <Card size="small" style={{ borderRadius: 8, background: '#fff1f0' }}>
                        <Statistic
                          title="Đang Tranh Chấp"
                          value={adminOps.platformDisputedAmount || 0}
                          precision={0}
                          valueStyle={{ color: '#cf1322', fontWeight: 700 }}
                          suffix="₫"
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={5}>
                      <Card size="small" style={{ borderRadius: 8, background: '#f6ffed' }}>
                        <Statistic
                          title="Sẵn Sàng Giải Ngân (Eligible)"
                          value={adminOps.platformEligibleAmount || 0}
                          precision={0}
                          valueStyle={{ color: '#389e0d', fontWeight: 700 }}
                          suffix="₫"
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={5}>
                      <Card size="small" style={{ borderRadius: 8, background: '#e6f4ff' }}>
                        <Statistic
                          title="Đã Giải Ngân (PaidOut Sandbox)"
                          value={adminOps.platformPaidOutSimulatedAmount || 0}
                          precision={0}
                          valueStyle={{ color: '#0958d9', fontWeight: 700 }}
                          suffix="₫"
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={5}>
                      <Card size="small" style={{ borderRadius: 8, background: '#fffbe6' }}>
                        <Statistic
                          title="Đã Hoàn Tiền (Refunded Sandbox)"
                          value={adminOps.platformRefundedSimulatedAmount || 0}
                          precision={0}
                          valueStyle={{ color: '#ad6800', fontWeight: 700 }}
                          suffix="₫"
                        />
                      </Card>
                    </Col>
                  </Row>

                  {/* Sub-tabs for Direct Bulk Order Operations */}
                  <Tabs
                    type="card"
                    items={[
                      {
                        key: 'directDisputes',
                        label: (
                          <span>
                            🚨 Khiếu Nại Giao Hàng PoD{' '}
                            {deliveryDisputePage.totalCount > 0 && (
                              <Tag color="red" style={{ marginLeft: 4 }}>
                                {deliveryDisputePage.totalCount}
                              </Tag>
                            )}
                          </span>
                        ),
                        children: (<div>
                          <FilterBar search={deliveryDisputePage.search} onSearchChange={deliveryDisputePage.setSearch}
                            status={deliveryDisputePage.query.status} onStatusChange={deliveryDisputePage.setStatus}
                            onReset={deliveryDisputePage.reset} placeholder="Tìm mã đơn"
                            statusOptions={['Open', 'Resolved'].map((value) => ({ value, label: value }))} />
                          <Table
                            columns={directDisputeColumns}
                            dataSource={deliveryDisputePage.items}
                            rowKey="id"
                            loading={deliveryDisputePage.loading}
                            scroll={{ x: 900 }}
                            pagination={{ current: deliveryDisputePage.query.page, pageSize: deliveryDisputePage.query.pageSize,
                              total: deliveryDisputePage.totalCount, onChange: deliveryDisputePage.setPage,
                              showSizeChanger: true, pageSizeOptions: [10, 20, 50, 100] }}
                            locale={{ emptyText: 'Không có khiếu nại giao nhận nào đang chờ xử lý' }}
                          /></div>
                        ),
                      },
                      {
                        key: 'refundCases',
                        label: (
                          <span>
                            💸 Hồ Sơ Yêu Cầu Hoàn Tiền{' '}
                            {refundPage.totalCount > 0 && (
                              <Tag color="volcano" style={{ marginLeft: 4 }}>
                                {refundPage.totalCount}
                              </Tag>
                            )}
                          </span>
                        ),
                        children: (<div>
                          <FilterBar search={refundPage.search} onSearchChange={refundPage.setSearch}
                            status={refundPage.query.status} onStatusChange={refundPage.setStatus}
                            onReset={refundPage.reset} placeholder="Tìm mã hồ sơ hoặc đơn"
                            statusOptions={['Pending', 'Approved', 'Rejected'].map((value) => ({ value, label: value }))} />
                          <Table
                            columns={refundCaseColumns}
                            dataSource={refundPage.items}
                            rowKey="id"
                            loading={refundPage.loading}
                            scroll={{ x: 900 }}
                            pagination={{ current: refundPage.query.page, pageSize: refundPage.query.pageSize,
                              total: refundPage.totalCount, onChange: refundPage.setPage,
                              showSizeChanger: true, pageSizeOptions: [10, 20, 50, 100] }}
                            locale={{ emptyText: 'Không có yêu cầu hoàn tiền nào đang chờ duyệt' }}
                          /></div>
                        ),
                      },
                      {
                        key: 'payoutRequests',
                        label: (
                          <span>
                            🏦 Yêu Cầu Giải Ngân NCC (Payout Sandbox){' '}
                            {payoutPage.totalCount > 0 && (
                              <Tag color="green" style={{ marginLeft: 4 }}>
                                {payoutPage.totalCount}
                              </Tag>
                            )}
                          </span>
                        ),
                        children: (<div>
                          <FilterBar search={payoutPage.search} onSearchChange={payoutPage.setSearch}
                            status={payoutPage.query.status} onStatusChange={payoutPage.setStatus}
                            onReset={payoutPage.reset} placeholder="Tìm mã giải ngân hoặc đơn"
                            statusOptions={['Pending', 'PaidOutSimulated', 'Rejected']
                              .map((value) => ({ value, label: value }))} />
                          <Table
                            columns={payoutRequestColumns}
                            dataSource={payoutPage.items}
                            rowKey="id"
                            loading={payoutPage.loading}
                            scroll={{ x: 900 }}
                            pagination={{ current: payoutPage.query.page, pageSize: payoutPage.query.pageSize,
                              total: payoutPage.totalCount, onChange: payoutPage.setPage,
                              showSizeChanger: true, pageSizeOptions: [10, 20, 50, 100] }}
                            locale={{ emptyText: 'Không có yêu cầu giải ngân nào đang chờ duyệt' }}
                          /></div>
                        ),
                      },
                    ]}
                  />
                </div>
              ),
            },
            {
              key: 'disputes',
              label: (
                <span>
                  ⚖️ Hàng Đợi Tranh Chấp Hợp Đồng B2B{' '}
                  {contractDisputePage.totalCount > 0 && (
                    <Tag color="red" style={{ marginLeft: 4 }}>
                      {contractDisputePage.totalCount}
                    </Tag>
                  )}
                </span>
              ),
              children: (
                <div>
                  <Alert
                    message="Quy chuẩn xử lý vi phạm hợp đồng (Module 6 - Feature #17)"
                    description="Khi NCC vi phạm mốc tiến độ (breach) không lý do chính đáng: Admin trừ 20 điểm uy tín, ghi nhận vào reputation_logs và hoàn tiền đặt cọc Escrow cho người mua."
                    type="warning"
                    showIcon
                    style={{ marginBottom: 16 }}
                  />
                  <Table
                    columns={disputeColumns}
                    dataSource={disputes}
                    scroll={{ x: 900 }}
                    pagination={{ current: contractDisputePage.query.page,
                      pageSize: contractDisputePage.query.pageSize, total: contractDisputePage.totalCount,
                      onChange: contractDisputePage.setPage, showSizeChanger: true,
                      pageSizeOptions: [10, 20, 50, 100] }}
                    loading={contractDisputePage.loading}
                  />
                </div>
              ),
            },
            {
              key: 'contracts',
              label: '📑 Giám Sát Tiến Độ Hợp Đồng Toàn Nền Tảng',
              children: (
                <div>
                  <Table
                    columns={contractColumns}
                    dataSource={contracts}
                    pagination={{ pageSize: 5 }}
                    loading={loading}
                  />
                </div>
              ),
            },
          ]}
        />
      </Card>

      {/* Legacy Dispute Modal */}
      {selectedDispute && (
        <Modal
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#cf1322' }}>
              <FileProtectOutlined />
              <span>Phân Xử Tranh Chấp Hợp Đồng: {selectedDispute.disputeId}</span>
            </div>
          }
          open={disputeModalOpen}
          onCancel={() => setDisputeModalOpen(false)}
          onOk={handleConfirmResolution}
          okText="Ban Hành Quyết Định Phân Xử"
          okType="danger"
          width={650}
        >
          <Descriptions bordered size="small" column={2} style={{ marginTop: 12 }}>
            <Descriptions.Item label="Mã Hợp Đồng">{selectedDispute.contractNo}</Descriptions.Item>
            <Descriptions.Item label="Tiền Escrow Bị Khóa">{selectedDispute.escrowAmount}</Descriptions.Item>
            <Descriptions.Item label="Bên Mua (Khởi kiện)">{selectedDispute.buyer}</Descriptions.Item>
            <Descriptions.Item label="Bên Bán (Bị kiện)">{selectedDispute.seller}</Descriptions.Item>
            <Descriptions.Item label="Lý Do Khiếu Nại" span={2}>
              {selectedDispute.reason}
            </Descriptions.Item>
          </Descriptions>

          <Form layout="vertical" style={{ marginTop: 16 }}>
            <Form.Item label="Quyết Định Phân Xử">
              <Radio.Group
                value={resolveAction}
                onChange={(e) => setResolveAction(e.target.value)}
              >
                <Radio value="penalty">
                  Xác định NCC Vi Phạm (Trừ điểm uy tín & Bồi thường Escrow)
                </Radio>
                <Radio value="extend">Chấp thuận gia hạn thời hạn mốc Milestone (Cho phép khắc phục)</Radio>
                <Radio value="dismiss">Bác bỏ khiếu nại (Người mua yêu cầu không hợp lệ)</Radio>
              </Radio.Group>
            </Form.Item>

            {resolveAction === 'penalty' && (
              <Form.Item label="Mức Trừ Điểm Uy Tín (Reputation Score Delta)">
                <InputNumber
                  min={5}
                  max={50}
                  value={penaltyPoints}
                  onChange={(v) => setPenaltyPoints(v)}
                  addonAfter="điểm uy tín"
                  style={{ width: 180 }}
                />
              </Form.Item>
            )}

            <Form.Item label="Nội Dung Biên Bản / Căn Cứ Pháp Lý (Gửi Cả 2 Bên)">
              <TextArea
                rows={3}
                placeholder="Ghi rõ căn cứ vi phạm khoản 4.2 HĐ kinh tế, đối chiếu dữ liệu ảnh PoD và kết luận hòa giải..."
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}

      {/* Modal Direct Bulk Order Delivery Dispute Resolution */}
      {activeDisputeItem && (() => {
        const deadline = activeDisputeItem.rebuttalDeadlineAtUtc || activeDisputeItem.rebuttalDeadlineAt;
        const hasRebuttal = Boolean(
          activeDisputeItem.supplierRebuttalNotes ||
          activeDisputeItem.supplierRebuttalAt ||
          activeDisputeItem.supplierRebuttalAtUtc ||
          activeDisputeItem.status === 'Open',
        );
        const isDeadlinePassed = deadline ? new Date(deadline).getTime() <= now : false;
        const isAwaitingRebuttal = activeDisputeItem.status === 'AwaitingSupplierRebuttal';
        const isResolutionLocked = isAwaitingRebuttal && !hasRebuttal && !isDeadlinePassed;
        const deadlineFormatted = deadline ? new Date(deadline).toLocaleString('vi-VN') : '';
        const lockNotice = `Chờ xưởng phản biện đến ${deadlineFormatted}`;
        const isResolved = activeDisputeItem.status?.startsWith('Resolved');

        return (
          <Modal
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#cf1322' }}>
                <WarningOutlined />
                <span>Phán Quyết Khiếu Nại Giao Hàng: {activeDisputeItem.orderNumber || activeDisputeItem.id.slice(0, 8)}</span>
              </div>
            }
            open={!!activeDisputeItem}
            onCancel={() => setActiveDisputeItem(null)}
            onOk={handleResolveDirectDispute}
            confirmLoading={disputeSubmitting}
            okText={isResolutionLocked ? 'Đang Chờ Phản Biện' : 'Ban Hành Phán Quyết'}
            okType="danger"
            okButtonProps={{ disabled: isResolutionLocked || isResolved, title: isResolutionLocked ? lockNotice : undefined }}
            width={820}
          >
            {isResolutionLocked && (
              <Alert
                type="warning"
                showIcon
                icon={<ClockCircleOutlined />}
                style={{ marginTop: 8, marginBottom: 12 }}
                message={lockNotice}
                description="Xưởng có thời hạn 48 giờ để nộp phản biện và bằng chứng. Nút phân xử bị khoá cho đến khi xưởng nộp phản biện hoặc thời hạn phản biện kết thúc."
              />
            )}

            <Descriptions bordered size="small" column={2} style={{ marginTop: 12 }}>
              <Descriptions.Item label="Mã Đơn">{activeDisputeItem.orderNumber || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Trạng Thái">
                <Tag color={isAwaitingRebuttal ? 'warning' : isResolved ? 'success' : 'processing'}>
                  {disputeStatusLabel(activeDisputeItem.status)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Số Tiền Đã Cọc / Thanh Toán" span={2}>
                <strong style={{ color: '#7d1322' }}>
                  {(activeDisputeItem.orderPaidAmount || 0).toLocaleString('vi-VN')} ₫
                </strong>
              </Descriptions.Item>
            </Descriptions>

            {/* Chi tiết khiếu nại hiển thị phản biện + bằng chứng của xưởng cạnh ảnh PoD và ảnh của khách */}
            <div style={{ marginTop: 14, marginBottom: 14 }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: '#262626' }}>
                Đối chiếu chứng từ &amp; bằng chứng ba bên:
              </div>
              <Row gutter={[12, 12]}>
                {/* 1. Ảnh & Yêu cầu của khách hàng */}
                <Col xs={24} md={8}>
                  <Card
                    size="small"
                    title={<span style={{ color: '#cf1322', fontSize: 12 }}>1. Khách hàng khiếu nại</span>}
                    style={{ height: '100%', borderColor: '#ffa39e', backgroundColor: '#fff1f0' }}
                  >
                    <div style={{ fontSize: 12, marginBottom: 8 }}>
                      <div><strong>Vấn đề:</strong> {disputeIssueTypeLabel(activeDisputeItem.issueType)}</div>
                      <div style={{ color: '#595959', marginTop: 4 }}>{activeDisputeItem.description}</div>
                    </div>
                    {activeDisputeItem.evidenceUrls && activeDisputeItem.evidenceUrls.length > 0 ? (
                      <div>
                        <div style={{ fontSize: 11, color: '#8c8c8c', marginBottom: 4 }}>Ảnh khách đính kèm:</div>
                        <Image.PreviewGroup>
                          <Space wrap size={6}>
                            {activeDisputeItem.evidenceUrls.map((url, idx) => (
                              <Image
                                key={idx}
                                src={url}
                                width={60}
                                height={60}
                                style={{ objectFit: 'cover', borderRadius: 4, border: '1px solid #ffccc7' }}
                              />
                            ))}
                          </Space>
                        </Image.PreviewGroup>
                      </div>
                    ) : (
                      <span style={{ fontSize: 11, color: '#8c8c8c' }}>Không có ảnh đính kèm</span>
                    )}
                  </Card>
                </Col>

                {/* 2. Ảnh biên bản giao nhận PoD */}
                <Col xs={24} md={8}>
                  <Card
                    size="small"
                    title={<span style={{ color: '#2d5a43', fontSize: 12 }}>2. Ảnh biên bản PoD</span>}
                    style={{ height: '100%', borderColor: '#b7eb8f', backgroundColor: '#f6ffed' }}
                  >
                    <div style={{ fontSize: 12, marginBottom: 6, color: '#595959' }}>
                      Ảnh chụp khi bàn giao hàng tại kho khách:
                    </div>
                    {disputePodLoading ? (
                      <span style={{ fontSize: 11, color: '#8c8c8c' }}>Đang tải chứng từ PoD...</span>
                    ) : disputePodProofs && disputePodProofs.length > 0 ? (
                      <Image.PreviewGroup>
                        <Space wrap size={6}>
                          {disputePodProofs.map((proof, idx) => (
                            <Image
                              key={proof.id || idx}
                              src={proof.photoUrl}
                              width={60}
                              height={60}
                              style={{ objectFit: 'cover', borderRadius: 4, border: '1px solid #d9f7be' }}
                            />
                          ))}
                        </Space>
                      </Image.PreviewGroup>
                    ) : (
                      <span style={{ fontSize: 11, color: '#8c8c8c' }}>Chưa có ảnh PoD trên hệ thống</span>
                    )}
                  </Card>
                </Col>

                {/* 3. Phản biện & Bằng chứng của xưởng */}
                <Col xs={24} md={8}>
                  <Card
                    size="small"
                    title={<span style={{ color: '#1677ff', fontSize: 12 }}>3. Phản biện của xưởng</span>}
                    style={{
                      height: '100%',
                      borderColor: activeDisputeItem.supplierRebuttalNotes ? '#91caff' : '#ffd591',
                      backgroundColor: activeDisputeItem.supplierRebuttalNotes ? '#e6f4ff' : '#fffbe6',
                    }}
                  >
                    {activeDisputeItem.supplierRebuttalNotes ? (
                      <div style={{ fontSize: 12 }}>
                        <div style={{ color: '#1f1f1f', marginBottom: 4, whiteSpace: 'pre-line' }}>
                          {activeDisputeItem.supplierRebuttalNotes}
                        </div>
                        {(activeDisputeItem.supplierRebuttalAt || activeDisputeItem.supplierRebuttalAtUtc) && (
                          <div style={{ fontSize: 11, color: '#8c8c8c', marginBottom: 6 }}>
                            Nộp lúc: {new Date(activeDisputeItem.supplierRebuttalAt || activeDisputeItem.supplierRebuttalAtUtc).toLocaleString('vi-VN')}
                          </div>
                        )}
                        {activeDisputeItem.supplierRebuttalEvidenceUrls && activeDisputeItem.supplierRebuttalEvidenceUrls.length > 0 && (
                          <div>
                            <div style={{ fontSize: 11, color: '#8c8c8c', marginBottom: 4 }}>Bằng chứng phản biện:</div>
                            <Image.PreviewGroup>
                              <Space wrap size={6}>
                                {activeDisputeItem.supplierRebuttalEvidenceUrls.map((url, idx) => (
                                  <Image
                                    key={idx}
                                    src={url}
                                    width={60}
                                    height={60}
                                    style={{ objectFit: 'cover', borderRadius: 4, border: '1px solid #bae0ff' }}
                                  />
                                ))}
                              </Space>
                            </Image.PreviewGroup>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ fontSize: 12, color: '#d46b08' }}>
                        <div>Chưa nộp phản biện.</div>
                        {deadline && (
                          <div style={{ marginTop: 4, fontSize: 11 }}>
                            {isDeadlinePassed ? 'Đã quá hạn 48h' : `Hạn: ${new Date(deadline).toLocaleString('vi-VN')}`}
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                </Col>
              </Row>
            </div>

            <Form layout="vertical" style={{ marginTop: 14 }}>
              <Form.Item label="Hình Thức Giải Quyết Tranh Chấp">
                <Radio.Group
                  value={disputeResolutionAction}
                  disabled={isResolutionLocked || isResolved}
                  onChange={(e) => setDisputeResolutionAction(e.target.value)}
                >
                  <Space direction="vertical">
                    <Radio value="ReleasePayout">
                      <strong>Bác bỏ khiếu nại &amp; Giải phóng thanh toán:</strong> Người mua xác nhận sai / ảnh PoD đầy đủ, giải phóng tiền cho NCC.
                    </Radio>
                    <Radio value="FullRefund">
                      <strong>Chấp thuận Hoàn Tiền 100%:</strong> Xác định lỗi do NCC / Hàng vỡ hỏng hoàn toàn, hoàn tiền về ví người mua.
                    </Radio>
                    <Radio value="PartialRefund">
                      <strong>Hoàn tiền một phần (Hòa giải):</strong> Hoàn một phần giá trị cho người mua, phần còn lại giải phóng cho NCC.
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>

              {disputeResolutionAction === 'PartialRefund' && (
                <Form.Item label="Số Tiền Hoàn Trả Khách Hàng (VND)">
                  <InputNumber
                    min={1000}
                    step={100000}
                    value={disputeRefundAmount}
                    disabled={isResolutionLocked || isResolved}
                    onChange={(v) => setDisputeRefundAmount(v || 0)}
                    formatter={(val) => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(val) => val.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              )}

              <Form.Item label="Biên Bản &amp; Căn Cứ Phán Quyết">
                <TextArea
                  rows={3}
                  disabled={isResolutionLocked || isResolved}
                  placeholder="Ghi rõ lý do căn cứ theo ảnh PoD, biên bản giao nhận và giải trình phản biện..."
                  value={disputeNotes}
                  onChange={(e) => setDisputeNotes(e.target.value)}
                />
              </Form.Item>
            </Form>
          </Modal>
        );
      })()}

      {/* Modal Direct Bulk Order Refund Case Processing */}
      {activeRefundCase && (
        <Modal
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#cf1322' }}>
              <DollarCircleOutlined />
              <span>Xử Lý Hồ Sơ Hoàn Tiền: {activeRefundCase.caseNumber}</span>
            </div>
          }
          open={!!activeRefundCase}
          onCancel={() => setActiveRefundCase(null)}
          onOk={handleProcessRefundCase}
          confirmLoading={refundSubmitting}
          okText={refundCaseApprove ? 'Chấp Thuận Hoàn Tiền' : 'Từ Chối'}
          okType={refundCaseApprove ? 'primary' : 'default'}
          width={600}
        >
          <Descriptions bordered size="small" column={1} style={{ marginTop: 12 }}>
            <Descriptions.Item label="Mã Hồ Sơ">{activeRefundCase.caseNumber}</Descriptions.Item>
            <Descriptions.Item label="Số Tiền Yêu Cầu">
              <strong style={{ color: '#cf1322' }}>{(activeRefundCase.requestedAmount || 0).toLocaleString('vi-VN')} ₫</strong>
            </Descriptions.Item>
            {activeRefundCase.suggestedRefundAmount != null && (
              <Descriptions.Item label="Mức Hoàn Đề Xuất (D24)">
                <span style={{ color: '#d4380d', fontWeight: 600 }}>
                  {activeRefundCase.suggestedRefundAmount.toLocaleString('vi-VN')} ₫
                  {activeRefundCase.suggestedRefundPercent != null ? ` (${activeRefundCase.suggestedRefundPercent}%)` : ''}
                </span>
                {activeRefundCase.suggestionReason && (
                  <div style={{ fontSize: 11, color: '#8c8c8c' }}>{activeRefundCase.suggestionReason}</div>
                )}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Lý Do">{activeRefundCase.reason}</Descriptions.Item>
          </Descriptions>

          <Form layout="vertical" style={{ marginTop: 16 }}>
            <Form.Item label="Quyết Định Duyệt">
              <Radio.Group
                value={refundCaseApprove}
                onChange={(e) => setRefundCaseApprove(e.target.value)}
              >
                <Radio value={true}>Chấp thuận hoàn tiền</Radio>
                <Radio value={false}>Từ chối yêu cầu hoàn tiền</Radio>
              </Radio.Group>
            </Form.Item>

            {refundCaseApprove && (
              <>
                <Form.Item label="Số Tiền Hoàn Thực Tế (VND)">
                  <InputNumber
                    min={0}
                    step={100000}
                    value={refundApprovedAmount}
                    onChange={(v) => setRefundApprovedAmount(v || 0)}
                    formatter={(val) => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(val) => val.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                  />
                </Form.Item>

                <Form.Item label="Mã Giao Dịch Đối Soát Hoàn Tiền (Reference Code)">
                  <Input
                    value={refundReferenceCode}
                    onChange={(e) => setRefundReferenceCode(e.target.value)}
                    placeholder="VD: REF-VNPAY-20261105"
                  />
                </Form.Item>
              </>
            )}

            <Form.Item label="Ghi Chú Phê Duyệt Của Quản Trị Viên">
              <TextArea
                rows={3}
                placeholder="Ghi chú chi tiết cho khách hàng và bộ phận tài chính..."
                value={refundCaseNotes}
                onChange={(e) => setRefundCaseNotes(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}

      {/* Modal Direct Bulk Order Payout Request Processing */}
      {activePayoutRequest && (
        <Modal
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#389e0d' }}>
              <BankOutlined />
              <span>Duyệt Yêu Cầu Giải Ngân Sandbox: {activePayoutRequest.requestNumber}</span>
            </div>
          }
          open={!!activePayoutRequest}
          onCancel={() => setActivePayoutRequest(null)}
          onOk={handleProcessPayoutRequest}
          confirmLoading={payoutSubmitting}
          okText={payoutApprove ? 'Phê Duyệt Giải Ngân' : 'Từ Chối'}
          okType={payoutApprove ? 'primary' : 'default'}
          width={600}
        >
          <Descriptions bordered size="small" column={1} style={{ marginTop: 12 }}>
            <Descriptions.Item label="Mã Yêu Cầu">{activePayoutRequest.requestNumber}</Descriptions.Item>
            <Descriptions.Item label="Mã Đơn Hàng">{activePayoutRequest.orderNumber || 'ORD-N/A'}</Descriptions.Item>
            <Descriptions.Item label="Số Tiền Giải Ngân">
              <strong style={{ color: '#389e0d', fontSize: 16 }}>
                {(activePayoutRequest.amount || 0).toLocaleString('vi-VN')} ₫
              </strong>
            </Descriptions.Item>
            <Descriptions.Item label="Tài Khoản Ngân Hàng NCC">
              {(() => {
                try {
                  const b = JSON.parse(activePayoutRequest.bankSnapshotJson);
                  return (
                    <div>
                      <div><strong>{b.BankName || b.bankName}</strong> ({b.BankCode || b.bankCode})</div>
                      <div>STK: <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{b.AccountNumber || b.accountNumber}</span></div>
                      <div>Chủ TK: {b.AccountHolderName || b.accountHolderName}</div>
                    </div>
                  );
                } catch {
                  return activePayoutRequest.bankSnapshotJson || 'N/A';
                }
              })()}
            </Descriptions.Item>
          </Descriptions>

          <Form layout="vertical" style={{ marginTop: 16 }}>
            <Form.Item label="Quyết Định Duyệt Payout">
              <Radio.Group
                value={payoutApprove}
                onChange={(e) => setPayoutApprove(e.target.value)}
              >
                <Radio value={true}>Phê duyệt giải ngân (Mô phỏng Sandbox)</Radio>
                <Radio value={false}>Từ chối yêu cầu giải ngân</Radio>
              </Radio.Group>
            </Form.Item>

            {payoutApprove && (
              <Form.Item label="Mã Giao Dịch Chuyển Khoản / Ủy Nhiệm Chi (Reference Code)">
                <Input
                  value={payoutReferenceCode}
                  onChange={(e) => setPayoutReferenceCode(e.target.value)}
                  placeholder="VD: UNC-VCB-20261105-001"
                />
              </Form.Item>
            )}

            <Form.Item label="Ghi Chú Phê Duyệt">
              <TextArea
                rows={3}
                placeholder="Ghi chú xác nhận giao dịch đã đối soát thành công..."
                value={payoutNotes}
                onChange={(e) => setPayoutNotes(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </ColonyAdminLayout>
  );
}
