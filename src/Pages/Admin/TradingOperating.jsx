import { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Tag,
  Button,
  Space,
  Input,
  Tabs,
  Modal,
  Descriptions,
  message,
  Form,
  InputNumber,
  Radio,
  Image,
  Upload,
  Empty,
} from 'antd';
import {
  FileProtectOutlined,
  DollarCircleOutlined,
  WarningOutlined,
  BankOutlined,
  UploadOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import { adminService } from '../../services/adminService';
import { contractService } from '../../services/contractService';
import orderService from '../../services/orderService';
import usePagedList from '../../hooks/usePagedList';
import FilterBar from '../../components/common/FilterBar';
import { parseBankSnapshot } from '../../utils/formatters';
import RowActionMenu from '../../components/common/RowActionMenu';
import { TruncatedTooltip } from '../../components/common/TableCellHelpers';

const { TextArea } = Input;

const renderCountPill = (count, tone = 'neutral') => {
  if (!count) return null;
  const styles =
    tone === 'ruby'
      ? 'bg-[#fdf1f2] text-[#7d1322] border-[#ecc9cd]'
      : tone === 'celadon'
        ? 'bg-[#edf5ef] text-[#2d5a43] border-[#c5dccb]'
        : 'bg-[#faf7f2] text-[#574d49] border-[#e4dcd3]';
  return (
    <span className={`ml-1.5 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium tabular-nums ${styles}`}>
      {count}
    </span>
  );
};

const renderBankAccountBlock = (bankSnapshotJson, emptyText = 'Khách hàng chưa cung cấp STK ngân hàng') => {
  const bank = parseBankSnapshot(bankSnapshotJson);
  if (!bank) {
    return <span className="text-xs text-[#8c817c]">{emptyText}</span>;
  }
  const bankTitle = `${bank.bankName || ''}${bank.bankCode ? ` (${bank.bankCode})` : ''}`;
  const fullSummary = `${bankTitle} · STK: ${bank.accountNumber} · Chủ TK: ${bank.accountHolderName}`;
  return (
    <div className="max-w-[195px] text-xs leading-relaxed">
      <TruncatedTooltip
        text={bankTitle}
        tooltipContent={fullSummary}
        className="font-semibold text-[#231a18]"
      />
      <div className="truncate">
        STK:{' '}
        <span className="font-mono font-semibold text-[#7d1322]">
          {bank.accountNumber}
        </span>
      </div>
      <TruncatedTooltip
        text={`Chủ TK: ${bank.accountHolderName}`}
        tooltipContent={fullSummary}
        className="text-[#6c625e]"
      />
    </div>
  );
};

function TransferProofUploader({ url, uploading, onUpload, onClear }) {
  return (
    <div className="mt-1">
      <Space wrap align="center">
        <Upload
          showUploadList={false}
          accept="image/*"
          customRequest={onUpload}
        >
          <Button icon={<UploadOutlined />} loading={uploading}>
            {url ? 'Đổi ảnh minh chứng chuyển khoản' : 'Tải ảnh minh chứng chuyển khoản'}
          </Button>
        </Upload>
        {url && (
          <Button
            danger
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={onClear}
          >
            Xóa ảnh
          </Button>
        )}
      </Space>
      {url && (
        <div className="mt-2.5 flex items-center gap-3">
          <Image
            src={url}
            alt="Ảnh minh chứng chuyển khoản hoàn tiền"
            width={110}
            height={82}
            style={{ objectFit: 'cover', borderRadius: 8, border: '1px solid #e4dcd3' }}
          />
          <div className="text-xs text-[#2d5a43]">
            <CheckCircleOutlined /> Đã đính kèm ảnh chứng từ chuyển khoản.
          </div>
        </div>
      )}
    </div>
  );
}

export default function TradingOperating({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('directOrders');
  const [loading, setLoading] = useState(false);

  // Contract disputes & monitoring state (Legacy B2B)
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
  const [disputeTransferMode, setDisputeTransferMode] = useState('immediate');
  const [disputeRefundRefCode, setDisputeRefundRefCode] = useState('');
  const [disputeProofImageUrl, setDisputeProofImageUrl] = useState('');
  const [disputeProofUploading, setDisputeProofUploading] = useState(false);
  const [disputeSubmitting, setDisputeSubmitting] = useState(false);

  const [activeRefundCase, setActiveRefundCase] = useState(null);
  const [refundCaseApprove, setRefundCaseApprove] = useState(true);
  const [refundApprovedAmount, setRefundApprovedAmount] = useState(0);
  const [refundReferenceCode, setRefundReferenceCode] = useState('');
  const [refundProofImageUrl, setRefundProofImageUrl] = useState('');
  const [refundProofUploading, setRefundProofUploading] = useState(false);
  const [refundCaseNotes, setRefundCaseNotes] = useState('');
  const [refundSubmitting, setRefundSubmitting] = useState(false);

  const [activePayoutRequest, setActivePayoutRequest] = useState(null);
  const [payoutApprove, setPayoutApprove] = useState(true);
  const [payoutReferenceCode, setPayoutReferenceCode] = useState('');
  const [payoutNotes, setPayoutNotes] = useState('');
  const [payoutProofImageUrl, setPayoutProofImageUrl] = useState('');
  const [payoutProofUploading, setPayoutProofUploading] = useState(false);
  const [payoutSubmitting, setPayoutSubmitting] = useState(false);

  const refreshRefunds = refundPage.refresh;
  const refreshPayouts = payoutPage.refresh;
  const refreshDeliveryDisputes = deliveryDisputePage.refresh;
  const refreshContractDisputes = contractDisputePage.refresh;

  const loadSummaryData = useCallback(async () => {
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
  }, []);

  const loadData = useCallback(async () => {
    await loadSummaryData();
    refreshRefunds();
    refreshPayouts();
    refreshDeliveryDisputes();
    refreshContractDisputes();
  }, [loadSummaryData, refreshRefunds, refreshPayouts, refreshDeliveryDisputes, refreshContractDisputes]);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (active) loadSummaryData();
    });
    return () => { active = false; };
  }, [loadSummaryData]);

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

  const uploadRefundProofFile = async (file, setUrl, setUploading, onSuccess, onError) => {
    setUploading(true);
    try {
      const res = await orderService.uploadAdminRefundProof(file);
      if (res?.url) {
        setUrl(res.url);
        message.success('Đã tải ảnh minh chứng chuyển khoản lên hệ thống.');
      }
      onSuccess?.(res);
    } catch (err) {
      message.error(err?.message || 'Không thể tải ảnh minh chứng chuyển khoản.');
      onError?.(err);
    } finally {
      setUploading(false);
    }
  };

  // Direct Bulk Order Dispute Modal Handler
  const handleOpenDirectDisputeModal = (dispute) => {
    setActiveDisputeItem(dispute);
    setDisputeResolutionAction('ReleasePayout');
    setDisputeRefundAmount(Math.min(dispute?.orderPaidAmount || 0, 1000000));
    setDisputeNotes('');
    setDisputeTransferMode('immediate');
    setDisputeRefundRefCode(`TRF-RFD-${Date.now().toString().slice(-6)}`);
    setDisputeProofImageUrl('');
  };

  const handleResolveDirectDispute = async () => {
    if (!activeDisputeItem || activeDisputeItem.status !== 'Open') {
      setActiveDisputeItem(null);
      return;
    }
    if (disputeNotes.trim().length < 5) {
      message.error('Vui lòng nhập căn cứ phân xử khiếu nại giao hàng (tối thiểu 5 ký tự).');
      return;
    }

    const isRefund = disputeResolutionAction === 'FullRefund' || disputeResolutionAction === 'PartialRefund';
    if (disputeResolutionAction === 'PartialRefund' && (!disputeRefundAmount || disputeRefundAmount <= 0)) {
      message.error('Vui lòng nhập số tiền hoàn trả một phần lớn hơn 0.');
      return;
    }
    if (isRefund && disputeTransferMode === 'immediate' && !disputeProofImageUrl.trim()) {
      message.error('Vui lòng tải ảnh minh chứng chuyển khoản trước khi hoàn tất, hoặc chọn chế độ chuyển tiền sau.');
      return;
    }

    try {
      setDisputeSubmitting(true);
      await orderService.resolveAdminDeliveryDispute(activeDisputeItem.id, {
        resolutionAction: disputeResolutionAction,
        refundAmount: disputeResolutionAction === 'PartialRefund' ? disputeRefundAmount : 0,
        notes: disputeNotes.trim(),
        deferTransfer: isRefund ? disputeTransferMode === 'defer' : false,
        refundReferenceCode:
          isRefund && disputeTransferMode === 'immediate'
            ? disputeRefundRefCode.trim() || undefined
            : undefined,
        transferProofImageUrl:
          isRefund && disputeTransferMode === 'immediate'
            ? disputeProofImageUrl.trim() || undefined
            : undefined,
      });
      message.success(
        isRefund && disputeTransferMode === 'defer'
          ? 'Đã duyệt hoàn tiền và chuyển hồ sơ sang tab "Hồ Sơ Yêu Cầu Hoàn Tiền" để chuyển khoản!'
          : 'Đã ban hành phán quyết khiếu nại giao hàng thành công!'
      );
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
    setRefundApprovedAmount(rc.requestedAmount || 0);
    setRefundReferenceCode(`TRF-RFD-${Date.now().toString().slice(-6)}`);
    setRefundProofImageUrl(rc.transferProofImageUrl || '');
    setRefundCaseNotes('Đã kiểm tra STK khách hàng, chuyển khoản hoàn tiền và đính kèm chứng từ.');
  };

  const handleProcessRefundCase = async () => {
    if (refundCaseNotes.trim().length < 5) {
      message.error('Vui lòng nhập ghi chú xử lý hoàn tiền (tối thiểu 5 ký tự).');
      return;
    }
    if (refundCaseApprove && !refundProofImageUrl.trim()) {
      message.error('Vui lòng tải lên ảnh minh chứng chuyển khoản hoàn tiền cho khách hàng.');
      return;
    }

    try {
      setRefundSubmitting(true);
      await orderService.processAdminRefundCase(activeRefundCase.id, {
        approve: refundCaseApprove,
        approvedAmount: refundCaseApprove ? refundApprovedAmount : 0,
        refundReferenceCode: refundCaseApprove ? refundReferenceCode.trim() : undefined,
        transferProofImageUrl: refundCaseApprove ? refundProofImageUrl.trim() : undefined,
        notes: refundCaseNotes.trim(),
      });
      message.success(refundCaseApprove ? 'Đã hoàn tất chuyển hoàn tiền và lưu ảnh chứng từ!' : 'Đã từ chối yêu cầu hoàn tiền.');
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
    setPayoutApprove(pr.status !== 'Rejected');
    setPayoutReferenceCode(pr.payoutReferenceCode || `TRF-PYT-${Date.now().toString().slice(-6)}`);
    setPayoutNotes(pr.adminNotes || 'Đã chuyển khoản giải ngân trực tiếp vào tài khoản xưởng và đính kèm chứng từ.');
    setPayoutProofImageUrl(pr.transferProofImageUrl || '');
  };

  const handleUploadPayoutProof = async (fileOrOptions, onSuccess, onError) => {
    const targetFile = fileOrOptions?.file || fileOrOptions;
    try {
      setPayoutProofUploading(true);
      const uploaded = await orderService.uploadAdminPayoutProof(targetFile);
      const url = uploaded?.imageUrl || uploaded?.url || (typeof uploaded === 'string' ? uploaded : '');
      if (!url) throw new Error('Không nhận được đường dẫn ảnh chứng từ.');
      setPayoutProofImageUrl(url);
      message.success('Đã tải ảnh minh chứng chuyển khoản giải ngân.');
      onSuccess?.(uploaded);
    } catch (err) {
      message.error(err?.message || 'Không thể tải ảnh chứng từ giải ngân.');
      onError?.(err);
    } finally {
      setPayoutProofUploading(false);
    }
  };

  const handleProcessPayoutRequest = async () => {
    if (!payoutNotes.trim()) {
      message.error('Vui lòng nhập ghi chú phê duyệt giải ngân.');
      return;
    }
    if (payoutApprove && !payoutProofImageUrl.trim()) {
      message.error('Vui lòng tải lên ảnh minh chứng chuyển khoản (PoD/UNC) trước khi xác nhận giải ngân.');
      return;
    }

    try {
      setPayoutSubmitting(true);
      await orderService.processAdminPayoutRequest(activePayoutRequest.id, {
        approve: payoutApprove,
        payoutReferenceCode: payoutApprove ? payoutReferenceCode.trim() : undefined,
        notes: payoutNotes.trim(),
        transferProofImageUrl: payoutApprove ? payoutProofImageUrl.trim() : undefined,
      });
      message.success(payoutApprove ? 'Đã ghi nhận chuyển khoản giải ngân và lưu chứng từ thành công!' : 'Đã từ chối yêu cầu giải ngân.');
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
      title: 'Mã khiếu nại',
      dataIndex: 'disputeId',
      key: 'disputeId',
      width: 145,
      render: (id) => (
        <div className="max-w-[130px]">
          <TruncatedTooltip text={id} className="font-mono text-xs font-semibold text-[#7d1322]" />
        </div>
      ),
    },
    {
      title: 'Hợp đồng B2B',
      dataIndex: 'contractNo',
      key: 'contractNo',
      width: 150,
      render: (c) => (
        <div className="max-w-[135px]">
          <TruncatedTooltip text={c} className="font-medium text-[#31465a]" />
        </div>
      ),
    },
    {
      title: 'Các bên liên quan',
      key: 'parties',
      width: 205,
      render: (_, r) => (
        <div className="max-w-[190px] text-xs leading-relaxed">
          <TruncatedTooltip
            text={`Mua: ${r.buyer}`}
            tooltipContent={`Mua: ${r.buyer} | Bán: ${r.seller}`}
            className="font-medium text-[#231a18]"
          />
          <TruncatedTooltip
            text={`Bán: ${r.seller}`}
            tooltipContent={`Mua: ${r.buyer} | Bán: ${r.seller}`}
            className="text-[#4b423e]"
          />
        </div>
      ),
    },
    {
      title: 'Nguyên nhân tranh chấp',
      dataIndex: 'reason',
      key: 'reason',
      width: 245,
      render: (text) => (
        <div className="max-w-[230px]">
          <TruncatedTooltip text={text} lines={2} className="text-[13px] leading-snug text-[#4b423e]" />
        </div>
      ),
    },
    {
      title: 'Ký quỹ đóng băng',
      dataIndex: 'escrowAmount',
      key: 'escrowAmount',
      align: 'right',
      width: 135,
      render: (amt) => <span className="font-semibold text-[#7d1322] tabular-nums whitespace-nowrap">{amt}</span>,
    },
    {
      title: 'Mức độ',
      dataIndex: 'severity',
      key: 'severity',
      width: 120,
      render: (s) => (
        <Tag
          style={
            s === 'high'
              ? { backgroundColor: '#fdf1f2', borderColor: '#ecc9cd', color: '#7d1322', marginInlineEnd: 0 }
              : { backgroundColor: '#fdf8ec', borderColor: '#e8d49c', color: '#9a6b16', marginInlineEnd: 0 }
          }
        >
          {s === 'high' ? 'Nghiêm trọng' : 'Trung bình'}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 125,
      render: (status) =>
        status === 'pending' ? (
          <Tag style={{ backgroundColor: '#fdf1f2', borderColor: '#ecc9cd', color: '#7d1322', marginInlineEnd: 0 }}>
            Chờ phân xử
          </Tag>
        ) : (
          <Tag style={{ backgroundColor: '#edf5ef', borderColor: '#c5dccb', color: '#2d5a43', marginInlineEnd: 0 }}>
            Đã giải quyết
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
          ariaLabel={`Thao tác khiếu nại ${record.disputeId || ''}`}
          actions={[
            {
              key: 'handle',
              label: record.status === 'pending' ? 'Phân xử tranh chấp' : 'Xem kết quả',
              icon: record.status === 'pending' ? <FileProtectOutlined /> : <EyeOutlined />,
              danger: record.status === 'pending',
              onClick: () => handleOpenDisputeModal(record),
            },
          ]}
        />
      ),
    },
  ];

  const contractColumns = [
    {
      title: 'Số hợp đồng',
      dataIndex: 'contractNo',
      key: 'contractNo',
      width: 145,
      render: (c) => (
        <div className="max-w-[130px]">
          <TruncatedTooltip text={c} className="font-mono text-xs font-semibold text-[#31465a]" />
        </div>
      ),
    },
    {
      title: 'Bên mua',
      dataIndex: 'buyer',
      key: 'buyer',
      width: 170,
      render: (v) => (
        <div className="max-w-[155px]">
          <TruncatedTooltip text={v} className="font-medium text-[#231a18]" />
        </div>
      ),
    },
    {
      title: 'Bên bán',
      dataIndex: 'seller',
      key: 'seller',
      width: 170,
      render: (v) => (
        <div className="max-w-[155px]">
          <TruncatedTooltip text={v} className="text-[#4b423e]" />
        </div>
      ),
    },
    {
      title: 'Giá trị hợp đồng',
      dataIndex: 'value',
      key: 'value',
      align: 'right',
      width: 135,
      render: (v) => <span className="font-semibold text-[#7d1322] tabular-nums whitespace-nowrap">{v}</span>,
    },
    {
      title: 'Tiến độ',
      dataIndex: 'progress',
      key: 'progress',
      width: 110,
      render: (p) => (
        <Tag style={{ backgroundColor: '#f3f6f9', borderColor: '#cfd8e3', color: '#31465a', marginInlineEnd: 0 }}>
          {p}
        </Tag>
      ),
    },
    {
      title: 'Tình trạng ký quỹ',
      dataIndex: 'escrowStatus',
      key: 'escrowStatus',
      width: 135,
      render: (s) => (
        <Tag style={{ backgroundColor: '#edf5ef', borderColor: '#c5dccb', color: '#2d5a43', marginInlineEnd: 0 }}>
          {s}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 135,
      render: (status) => {
        if (status === 'active') {
          return (
            <Tag style={{ backgroundColor: '#edf5ef', borderColor: '#c5dccb', color: '#2d5a43', marginInlineEnd: 0 }}>
              Đang hiệu lực
            </Tag>
          );
        }
        if (status === 'completed') {
          return (
            <Tag style={{ backgroundColor: '#faf7f2', borderColor: '#e4dcd3', color: '#6c625e', marginInlineEnd: 0 }}>
              Đã hoàn thành
            </Tag>
          );
        }
        return (
          <Tag style={{ backgroundColor: '#fdf8ec', borderColor: '#e8d49c', color: '#9a6b16', marginInlineEnd: 0 }}>
            Chờ đặt cọc M1
          </Tag>
        );
      },
    },
  ];

  // Columns for Direct Bulk Order Delivery Disputes
  const directDisputeColumns = [
    {
      title: 'Mã đơn / Khiếu nại',
      key: 'identifiers',
      width: 185,
      render: (_, r) => (
        <div className="max-w-[170px]">
          <TruncatedTooltip
            text={r.orderNumber || 'ORD-N/A'}
            tooltipContent={`${r.orderNumber || 'ORD-N/A'} (ID: ${r.id})`}
            className="font-mono text-xs font-semibold text-[#31465a]"
          />
          <div className="truncate font-mono text-[11px] text-[#8c817c]">ID: {r.id.slice(0, 8)}…</div>
        </div>
      ),
    },
    {
      title: 'Loại vấn đề',
      dataIndex: 'issueType',
      key: 'issueType',
      width: 155,
      render: (t) => {
        const map = {
          DamagedGoods: { text: 'Hàng hư hỏng / bể vỡ', bg: '#fdf1f2', border: '#ecc9cd', color: '#7d1322' },
          MissingItems: { text: 'Thiếu số lượng', bg: '#fdf8ec', border: '#e8d49c', color: '#9a6b16' },
          WrongItems: { text: 'Sai quy cách', bg: '#fdf1f2', border: '#ecc9cd', color: '#7d1322' },
          LateDelivery: { text: 'Giao trễ hạn', bg: '#fdf8ec', border: '#e8d49c', color: '#9a6b16' },
        };
        const item = map[t] || { text: t, bg: '#faf7f2', border: '#e4dcd3', color: '#574d49' };
        return (
          <Tag style={{ backgroundColor: item.bg, borderColor: item.border, color: item.color, marginInlineEnd: 0 }}>
            {item.text}
          </Tag>
        );
      },
    },
    {
      title: 'Mô tả khách hàng',
      dataIndex: 'description',
      key: 'description',
      width: 225,
      render: (desc) => (
        <div className="max-w-[210px]">
          <TruncatedTooltip text={desc} lines={2} className="text-[13px] leading-snug text-[#4b423e]" />
        </div>
      ),
    },
    {
      title: 'Ảnh',
      dataIndex: 'evidenceUrls',
      key: 'evidenceUrls',
      render: (urls) => {
        if (!urls || urls.length === 0) return <span className="text-xs text-[#8c817c]">Không có</span>;
        return (
          <Space orientation="horizontal" size={4}>
            {urls.slice(0, 2).map((url, i) => (
              <Image
                key={i}
                src={url}
                alt={`Bằng chứng ${i + 1}`}
                width={36}
                height={36}
                style={{ objectFit: 'cover', borderRadius: 4, border: '1px solid #e4dcd3' }}
              />
            ))}
          </Space>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (st) => {
        if (st === 'Open' || st === 'Reported' || st === 'Investigating') {
          return (
            <Tag style={{ backgroundColor: '#fdf1f2', borderColor: '#ecc9cd', color: '#7d1322', marginInlineEnd: 0 }}>
              Đang tranh chấp
            </Tag>
          );
        }
        if (st === 'ResolvedRefund') {
          return (
            <Tag style={{ backgroundColor: '#fdf8ec', borderColor: '#e8d49c', color: '#9a6b16', marginInlineEnd: 0 }}>
              Đã duyệt hoàn tiền
            </Tag>
          );
        }
        if (st === 'ResolvedReleasePayout') {
          return (
            <Tag style={{ backgroundColor: '#edf5ef', borderColor: '#c5dccb', color: '#2d5a43', marginInlineEnd: 0 }}>
              Đã giải phóng NCC
            </Tag>
          );
        }
        if (st === 'Resolved') {
          return (
            <Tag style={{ backgroundColor: '#edf5ef', borderColor: '#c5dccb', color: '#2d5a43', marginInlineEnd: 0 }}>
              Đã xử lý
            </Tag>
          );
        }
        return <Tag>{st}</Tag>;
      },
    },
    {
      title: 'Ngày báo',
      dataIndex: 'createdAtUtc',
      key: 'createdAtUtc',
      render: (d) => {
        const dt = new Date(d);
        return (
          <div className="tabular-nums text-xs leading-snug text-[#574d49] whitespace-nowrap">
            <div>{dt.toLocaleDateString('vi-VN')}</div>
            <div className="text-[11px] text-[#8c817c]">{dt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      width: 84,
      render: (_, record) => {
        const isResolved = record.status !== 'Open' && record.status !== 'Reported' && record.status !== 'Investigating';
        return (
          <RowActionMenu
            ariaLabel={`Thao tác tranh chấp ${record.orderNumber || record.id}`}
            actions={[
              {
                key: 'judge',
                label: isResolved ? 'Xem kết quả' : 'Phán quyết tranh chấp',
                icon: isResolved ? <EyeOutlined /> : <FileProtectOutlined />,
                danger: !isResolved,
                onClick: () => handleOpenDirectDisputeModal(record),
              },
            ]}
          />
        );
      },
    },
  ];

  // Columns for Direct Bulk Order Refund Cases
  const refundCaseColumns = [
    {
      title: 'Mã hồ sơ',
      dataIndex: 'caseNumber',
      key: 'caseNumber',
      width: 165,
      render: (num, r) => (
        <div className="max-w-[150px]">
          <TruncatedTooltip
            text={num}
            tooltipContent={r.orderNumber ? `${num} · ${r.orderNumber}` : num}
            className="font-mono text-xs font-semibold text-[#7d1322]"
          />
          {r.orderNumber && (
            <TruncatedTooltip text={r.orderNumber} className="font-mono text-[11px] text-[#6c625e]" />
          )}
        </div>
      ),
    },
    {
      title: 'Số tiền',
      dataIndex: 'requestedAmount',
      key: 'requestedAmount',
      align: 'right',
      width: 120,
      render: (amt) => (
        <span className="font-semibold text-[#7d1322] tabular-nums whitespace-nowrap">
          {(amt || 0).toLocaleString('vi-VN')} ₫
        </span>
      ),
    },
    {
      title: 'Lý do hoàn tiền',
      dataIndex: 'reason',
      key: 'reason',
      width: 185,
      render: (r) => (
        <div className="max-w-[170px]">
          <TruncatedTooltip text={r} lines={2} className="text-[13px] leading-snug text-[#4b423e]" />
        </div>
      ),
    },
    {
      title: 'TK ngân hàng khách',
      dataIndex: 'customerBankSnapshotJson',
      key: 'customerBankSnapshotJson',
      width: 210,
      render: (json) => renderBankAccountBlock(json, 'Chưa có STK'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (st) => {
        if (st === 'Pending' || st === 'PendingAdminReview') {
          return (
            <Tag style={{ backgroundColor: '#fdf8ec', borderColor: '#e8d49c', color: '#9a6b16', marginInlineEnd: 0 }}>
              Chờ chuyển hoàn
            </Tag>
          );
        }
        if (st === 'CompletedSimulated' || st === 'Approved' || st === 'Processed') {
          return (
            <Tag style={{ backgroundColor: '#edf5ef', borderColor: '#c5dccb', color: '#2d5a43', marginInlineEnd: 0 }}>
              Đã hoàn tiền
            </Tag>
          );
        }
        if (st === 'Rejected') {
          return (
            <Tag style={{ backgroundColor: '#faf7f2', borderColor: '#e4dcd3', color: '#6c625e', marginInlineEnd: 0 }}>
              Từ chối
            </Tag>
          );
        }
        return <Tag>{st}</Tag>;
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAtUtc',
      key: 'createdAtUtc',
      width: 98,
      render: (d) => {
        const dt = new Date(d);
        return (
          <div className="tabular-nums text-xs leading-snug text-[#574d49] whitespace-nowrap">
            <div>{dt.toLocaleDateString('vi-VN')}</div>
            <div className="text-[11px] text-[#8c817c]">{dt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      width: 80,
      render: (_, record) => {
        const isPending = record.status === 'Pending' || record.status === 'PendingAdminReview';
        return (
          <RowActionMenu
            ariaLabel={`Thao tác hoàn tiền ${record.caseNumber}`}
            actions={[
              {
                key: 'refund',
                label: isPending ? 'Xử lý chuyển hoàn' : 'Xem chứng từ',
                icon: isPending ? <DollarCircleOutlined /> : <EyeOutlined />,
                onClick: () => handleOpenRefundCaseModal(record),
              },
            ]}
          />
        );
      },
    },
  ];

  // Columns for Direct Bulk Order Payout Requests
  const payoutRequestColumns = [
    {
      title: 'Mã yêu cầu / Đơn',
      dataIndex: 'requestNumber',
      key: 'requestNumber',
      width: 195,
      render: (num, r) => (
        <div className="max-w-[180px]">
          <TruncatedTooltip
            text={num}
            tooltipContent={`${num} · ${r.orderNumber || 'ORD-N/A'}`}
            className="font-mono text-xs font-semibold text-[#2d5a43]"
          />
          <TruncatedTooltip text={r.orderNumber || 'ORD-N/A'} className="font-mono text-[11px] text-[#31465a]" />
        </div>
      ),
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      width: 135,
      render: (amt) => (
        <span className="font-semibold text-[#2d5a43] tabular-nums whitespace-nowrap">
          {(amt || 0).toLocaleString('vi-VN')} ₫
        </span>
      ),
    },
    {
      title: 'Tài khoản thụ hưởng NCC',
      dataIndex: 'bankSnapshotJson',
      key: 'bankSnapshotJson',
      width: 230,
      render: (json) => renderBankAccountBlock(json, 'Chưa có thông tin STK'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 135,
      render: (st) => {
        if (st === 'Pending' || st === 'PendingAdminReview') {
          return (
            <Tag style={{ backgroundColor: '#fdf8ec', borderColor: '#e8d49c', color: '#9a6b16', marginInlineEnd: 0 }}>
              Chờ chuyển khoản
            </Tag>
          );
        }
        if (st === 'Approved' || st === 'PaidOutSimulated') {
          return (
            <Tag style={{ backgroundColor: '#edf5ef', borderColor: '#c5dccb', color: '#2d5a43', marginInlineEnd: 0 }}>
              Đã giải ngân
            </Tag>
          );
        }
        if (st === 'Rejected') {
          return (
            <Tag style={{ backgroundColor: '#faf7f2', borderColor: '#e4dcd3', color: '#6c625e', marginInlineEnd: 0 }}>
              Từ chối
            </Tag>
          );
        }
        return <Tag>{st}</Tag>;
      },
    },
    {
      title: 'Ngày yêu cầu',
      dataIndex: 'createdAtUtc',
      key: 'createdAtUtc',
      width: 110,
      render: (d) => {
        const dt = new Date(d);
        return (
          <div className="tabular-nums text-xs leading-snug text-[#574d49] whitespace-nowrap">
            <div>{dt.toLocaleDateString('vi-VN')}</div>
            <div className="text-[11px] text-[#8c817c]">{dt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      width: 84,
      render: (_, record) => {
        const isPending = record.status === 'Pending' || record.status === 'PendingAdminReview';
        return (
          <RowActionMenu
            ariaLabel={`Thao tác giải ngân ${record.requestNumber}`}
            actions={[
              {
                key: 'payout',
                label: isPending ? 'Chuyển khoản & tải PoD' : 'Xem chứng từ',
                icon: isPending ? <BankOutlined /> : <EyeOutlined />,
                onClick: () => handleOpenPayoutRequestModal(record),
              },
            ]}
          />
        );
      },
    },
  ];

  const ledgerMetrics = [
    {
      key: 'held',
      label: 'Ký quỹ sàn (Held)',
      value: adminOps.platformHeldAmount,
      tone: 'text-[#9a6b16]',
    },
    {
      key: 'disputed',
      label: 'Đang tranh chấp',
      value: adminOps.platformDisputedAmount,
      tone: 'text-[#7d1322]',
    },
    {
      key: 'eligible',
      label: 'Sẵn sàng giải ngân',
      value: adminOps.platformEligibleAmount,
      tone: 'text-[#2d5a43]',
    },
    {
      key: 'paidOut',
      label: 'Đã giải ngân',
      value: adminOps.platformPaidOutSimulatedAmount,
      tone: 'text-[#31465a]',
    },
    {
      key: 'refunded',
      label: 'Đã hoàn tiền',
      value: adminOps.platformRefundedSimulatedAmount,
      tone: 'text-[#574d49]',
    },
  ];

  const totalDirectCount =
    (adminOps.deliveryDisputes?.length || 0)
    + (adminOps.refundCases?.length || 0)
    + (adminOps.payoutRequests?.length || 0);

  return (
    <ColonyAdminLayout
      role="Admin"
      activeKey="admin/van-hanh-giao-dich"
      onNavigate={onNavigate}
      title="Vận hành giao dịch & đối soát"
      subtitle="Giám sát dòng tiền ký quỹ, xử lý tranh chấp giao nhận và đối soát giải ngân nhà cung cấp."
    >
      <section className="rounded-lg border border-[#e4dcd3] bg-white px-4 py-2 sm:px-5 sm:py-3">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'directOrders',
              label: (
                <span>
                  Đơn hàng doanh nghiệp
                  {renderCountPill(totalDirectCount, 'ruby')}
                </span>
              ),
              children: (
                <div className="space-y-5 pb-2">
                  <div className="rounded-lg border border-[#e4dcd3] bg-[#faf7f2] px-4 py-3 text-[13px] leading-relaxed text-[#574d49]">
                    <span className="font-medium text-[#231a18]">Quy trình ký quỹ & đối soát: </span>
                    Toàn bộ tiền cọc và thanh toán đợt cuối qua VNPay được giữ trong trạng thái{' '}
                    <strong className="text-[#231a18]">Lưu ký sàn</strong>. Sau khi giao hàng và người mua xác nhận biên bản PoD đủ 48 giờ, số dư chuyển sang{' '}
                    <strong className="text-[#2d5a43]">Sẵn sàng giải ngân</strong> để đối soát chuyển khoản.
                  </div>

                  {/* Editorial Ledger Strip */}
                  <div className="grid grid-cols-1 lg:grid-cols-5 rounded-lg border border-[#e4dcd3] bg-white divide-y lg:divide-y-0 lg:divide-x divide-[#e4dcd3] overflow-hidden">
                    {ledgerMetrics.map((metric) => (
                      <div key={metric.key} className="px-4 py-3.5">
                        <div className="text-xs font-medium text-[#6c625e] mb-1">{metric.label}</div>
                        <div className={`text-lg font-semibold tabular-nums whitespace-nowrap ${metric.tone}`}>
                          {(metric.value || 0).toLocaleString('vi-VN')} ₫
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sub-tabs for Direct Bulk Order Operations */}
                  <Tabs
                    type="card"
                    items={[
                      {
                        key: 'directDisputes',
                        label: (
                          <span>
                            Khiếu nại giao hàng PoD
                            {renderCountPill(deliveryDisputePage.totalCount, 'ruby')}
                          </span>
                        ),
                        children: (
                          <div className="space-y-4">
                            <FilterBar
                              search={deliveryDisputePage.search}
                              onSearchChange={deliveryDisputePage.setSearch}
                              status={deliveryDisputePage.query.status}
                              onStatusChange={deliveryDisputePage.setStatus}
                              onReset={deliveryDisputePage.reset}
                              placeholder="Tìm mã đơn"
                              statusOptions={[
                                { value: 'Open', label: 'Đang mở' },
                                { value: 'Resolved', label: 'Đã xử lý' },
                                { value: 'ResolvedRefund', label: 'Đã duyệt hoàn tiền' },
                                { value: 'ResolvedReleasePayout', label: 'Đã giải phóng NCC' },
                              ]}
                            />
                            <Table
                              columns={directDisputeColumns}
                              dataSource={deliveryDisputePage.items}
                              rowKey="id"
                              size="middle"
                              loading={deliveryDisputePage.loading}
                              scroll={{ x: 'max-content' }}
                              pagination={{
                                current: deliveryDisputePage.query.page,
                                pageSize: deliveryDisputePage.query.pageSize,
                                total: deliveryDisputePage.totalCount,
                                onChange: deliveryDisputePage.setPage,
                                showSizeChanger: true,
                                pageSizeOptions: [10, 20, 50, 100],
                              }}
                              locale={{
                                emptyText: (
                                  <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={<span className="text-[#6c625e]">Không có khiếu nại giao nhận nào đang chờ xử lý</span>}
                                  />
                                ),
                              }}
                            />
                          </div>
                        ),
                      },
                      {
                        key: 'refundCases',
                        label: (
                          <span>
                            Hồ sơ yêu cầu hoàn tiền
                            {renderCountPill(refundPage.totalCount)}
                          </span>
                        ),
                        children: (
                          <div className="space-y-4">
                            <FilterBar
                              search={refundPage.search}
                              onSearchChange={refundPage.setSearch}
                              status={refundPage.query.status}
                              onStatusChange={refundPage.setStatus}
                              onReset={refundPage.reset}
                              placeholder="Tìm mã hồ sơ hoặc đơn"
                              statusOptions={[
                                { value: 'Pending', label: 'Chờ chuyển hoàn' },
                                { value: 'CompletedSimulated', label: 'Đã hoàn tiền' },
                                { value: 'Rejected', label: 'Từ chối' },
                              ]}
                            />
                            <Table
                              columns={refundCaseColumns}
                              dataSource={refundPage.items}
                              rowKey="id"
                              size="middle"
                              loading={refundPage.loading}
                              scroll={{ x: 'max-content' }}
                              pagination={{
                                current: refundPage.query.page,
                                pageSize: refundPage.query.pageSize,
                                total: refundPage.totalCount,
                                onChange: refundPage.setPage,
                                showSizeChanger: true,
                                pageSizeOptions: [10, 20, 50, 100],
                              }}
                              locale={{
                                emptyText: (
                                  <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={<span className="text-[#6c625e]">Không có yêu cầu hoàn tiền nào đang chờ duyệt</span>}
                                  />
                                ),
                              }}
                            />
                          </div>
                        ),
                      },
                      {
                        key: 'payoutRequests',
                        label: (
                          <span>
                            Yêu cầu giải ngân NCC
                            {renderCountPill(payoutPage.totalCount, 'celadon')}
                          </span>
                        ),
                        children: (
                          <div className="space-y-4">
                            <FilterBar
                              search={payoutPage.search}
                              onSearchChange={payoutPage.setSearch}
                              status={payoutPage.query.status}
                              onStatusChange={payoutPage.setStatus}
                              onReset={payoutPage.reset}
                              placeholder="Tìm mã giải ngân hoặc đơn"
                              statusOptions={[
                                { value: 'Pending', label: 'Chờ chuyển khoản' },
                                { value: 'PaidOutSimulated', label: 'Đã giải ngân' },
                                { value: 'Rejected', label: 'Từ chối' },
                              ]}
                            />
                            <Table
                              columns={payoutRequestColumns}
                              dataSource={payoutPage.items}
                              rowKey="id"
                              size="middle"
                              loading={payoutPage.loading}
                              scroll={{ x: 'max-content' }}
                              pagination={{
                                current: payoutPage.query.page,
                                pageSize: payoutPage.query.pageSize,
                                total: payoutPage.totalCount,
                                onChange: payoutPage.setPage,
                                showSizeChanger: true,
                                pageSizeOptions: [10, 20, 50, 100],
                              }}
                              locale={{
                                emptyText: (
                                  <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={<span className="text-[#6c625e]">Không có yêu cầu giải ngân nào đang chờ duyệt</span>}
                                  />
                                ),
                              }}
                            />
                          </div>
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
                  Tranh chấp hợp đồng B2B
                  {renderCountPill(contractDisputePage.totalCount, 'ruby')}
                </span>
              ),
              children: (
                <div className="space-y-4 pb-2">
                  <div className="rounded-lg border border-[#e4dcd3] bg-[#faf7f2] px-4 py-3 text-[13px] leading-relaxed text-[#574d49]">
                    <span className="font-medium text-[#231a18]">Quy chuẩn xử lý vi phạm hợp đồng: </span>
                    Khi nhà cung cấp vi phạm mốc tiến độ không có lý do chính đáng, quản trị viên khấu trừ 20 điểm uy tín và hoàn tiền đặt cọc ký quỹ cho bên mua.
                  </div>
                  <Table
                    columns={disputeColumns}
                    dataSource={disputes}
                    size="middle"
                    scroll={{ x: 'max-content' }}
                    pagination={{
                      current: contractDisputePage.query.page,
                      pageSize: contractDisputePage.query.pageSize,
                      total: contractDisputePage.totalCount,
                      onChange: contractDisputePage.setPage,
                      showSizeChanger: true,
                      pageSizeOptions: [10, 20, 50, 100],
                    }}
                    loading={contractDisputePage.loading}
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={<span className="text-[#6c625e]">Chưa có tranh chấp hợp đồng nào</span>}
                        />
                      ),
                    }}
                  />
                </div>
              ),
            },
            {
              key: 'contracts',
              label: 'Tiến độ hợp đồng nền tảng',
              children: (
                <div className="pb-2">
                  <Table
                    columns={contractColumns}
                    dataSource={contracts}
                    size="middle"
                    scroll={{ x: 'max-content' }}
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={<span className="text-[#6c625e]">Chưa có hợp đồng nào được ghi nhận</span>}
                        />
                      ),
                    }}
                  />
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* Legacy Dispute Modal */}
      {selectedDispute && (
        <Modal
          title={
            <div className="flex items-center gap-2 text-[#7d1322]">
              <FileProtectOutlined />
              <span>Phân xử tranh chấp hợp đồng: {selectedDispute.disputeId}</span>
            </div>
          }
          open={disputeModalOpen}
          onCancel={() => setDisputeModalOpen(false)}
          onOk={handleConfirmResolution}
          okText="Ban hành quyết định"
          okButtonProps={{ style: { backgroundColor: '#7d1322', borderColor: '#7d1322' } }}
          width={650}
          style={{ maxWidth: 'calc(100vw - 24px)' }}
          destroyOnHidden
        >
          <Descriptions bordered size="small" column={2} className="mt-3">
            <Descriptions.Item label="Mã hợp đồng">{selectedDispute.contractNo}</Descriptions.Item>
            <Descriptions.Item label="Tiền ký quỹ bị khóa">{selectedDispute.escrowAmount}</Descriptions.Item>
            <Descriptions.Item label="Bên mua">{selectedDispute.buyer}</Descriptions.Item>
            <Descriptions.Item label="Bên bán">{selectedDispute.seller}</Descriptions.Item>
            <Descriptions.Item label="Lý do khiếu nại" span={2}>
              {selectedDispute.reason}
            </Descriptions.Item>
          </Descriptions>

          <Form layout="vertical" className="mt-4">
            <Form.Item label="Quyết định phân xử">
              <Radio.Group
                value={resolveAction}
                onChange={(e) => setResolveAction(e.target.value)}
              >
                <Space orientation="vertical">
                  <Radio value="penalty">
                    Xác định NCC vi phạm (Trừ điểm uy tín & bồi thường ký quỹ)
                  </Radio>
                  <Radio value="extend">Chấp thuận gia hạn mốc tiến độ để khắc phục</Radio>
                  <Radio value="dismiss">Bác bỏ khiếu nại do yêu cầu chưa hợp lệ</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            {resolveAction === 'penalty' && (
              <Form.Item label="Mức khấu trừ điểm uy tín">
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

            <Form.Item label="Nội dung biên bản & căn cứ (gửi hai bên)">
              <TextArea
                rows={3}
                placeholder="Ghi rõ căn cứ đối chiếu hợp đồng, chứng từ PoD và kết luận xử lý..."
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}

      {/* Modal Direct Bulk Order Delivery Dispute Resolution */}
      {activeDisputeItem && (() => {
        const isOpen = activeDisputeItem.status === 'Open';
        const isRefundAction =
          disputeResolutionAction === 'FullRefund' || disputeResolutionAction === 'PartialRefund';

        return (
          <Modal
            title={
              <div className="flex items-center gap-2 text-[#7d1322]">
                <WarningOutlined />
                <span>
                  {isOpen ? 'Phán quyết khiếu nại giao hàng: ' : 'Chi tiết phán quyết: '}
                  {activeDisputeItem.orderNumber || activeDisputeItem.id.slice(0, 8)}
                </span>
              </div>
            }
            open={!!activeDisputeItem}
            onCancel={() => setActiveDisputeItem(null)}
            onOk={handleResolveDirectDispute}
            confirmLoading={disputeSubmitting}
            okText="Ban hành phán quyết"
            okButtonProps={{ style: { backgroundColor: '#7d1322', borderColor: '#7d1322' } }}
            footer={
              isOpen
                ? undefined
                : (
                  <Button type="primary" style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }} onClick={() => setActiveDisputeItem(null)}>
                    Đóng
                  </Button>
                )
            }
            width={680}
            style={{ maxWidth: 'calc(100vw - 24px)' }}
            destroyOnHidden
          >
            <Descriptions bordered size="small" column={2} className="mt-3">
              <Descriptions.Item label="Mã đơn">{activeDisputeItem.orderNumber || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Loại vấn đề">{activeDisputeItem.issueType}</Descriptions.Item>
              <Descriptions.Item label="Số tiền đã thu">
                <strong className="text-[#7d1322] tabular-nums">
                  {(activeDisputeItem.orderPaidAmount || 0).toLocaleString('vi-VN')} ₫
                </strong>
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color={isOpen ? 'error' : 'default'}>{activeDisputeItem.status}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Nội dung khiếu nại" span={2}>
                {activeDisputeItem.description}
              </Descriptions.Item>
              <Descriptions.Item label="TK ngân hàng nhận hoàn" span={2}>
                {renderBankAccountBlock(activeDisputeItem.refundBankSnapshotJson)}
              </Descriptions.Item>
              {activeDisputeItem.evidenceUrls && activeDisputeItem.evidenceUrls.length > 0 && (
                <Descriptions.Item label="Ảnh bằng chứng" span={2}>
                  <Space size={8} wrap>
                    {activeDisputeItem.evidenceUrls.map((url, idx) => (
                      <Image
                        key={idx}
                        src={url}
                        alt={`Bằng chứng khiếu nại ${idx + 1}`}
                        width={80}
                        height={80}
                        style={{ objectFit: 'cover', borderRadius: 4, border: '1px solid #e4dcd3' }}
                      />
                    ))}
                  </Space>
                </Descriptions.Item>
              )}
              {!isOpen && activeDisputeItem.resolutionNotes && (
                <Descriptions.Item label="Biên bản phán quyết" span={2}>
                  {activeDisputeItem.resolutionNotes}
                </Descriptions.Item>
              )}
            </Descriptions>

            {isOpen && (
              <Form layout="vertical" className="mt-4">
                <Form.Item label="Hình thức giải quyết tranh chấp">
                  <Radio.Group
                    value={disputeResolutionAction}
                    onChange={(e) => setDisputeResolutionAction(e.target.value)}
                  >
                    <Space orientation="vertical">
                      <Radio value="ReleasePayout">
                        <strong>Bác bỏ khiếu nại & giải phóng thanh toán:</strong> Xác định giao hàng đạt chuẩn, giải phóng tiền cho NCC.
                      </Radio>
                      <Radio value="FullRefund">
                        <strong>Chấp thuận hoàn tiền 100%:</strong> Xác định lỗi phía NCC hoặc hàng hư hỏng toàn phần, hoàn tiền cho người mua.
                      </Radio>
                      <Radio value="PartialRefund">
                        <strong>Hoàn tiền một phần:</strong> Hoàn một phần giá trị cho người mua, phần còn lại giải phóng cho NCC.
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>

                {disputeResolutionAction === 'PartialRefund' && (
                  <Form.Item label="Số tiền hoàn trả khách hàng (VNĐ)">
                    <InputNumber
                      min={1000}
                      max={activeDisputeItem.orderPaidAmount || undefined}
                      step={100000}
                      value={disputeRefundAmount}
                      onChange={(v) => setDisputeRefundAmount(v || 0)}
                      formatter={(val) => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(val) => val.replace(/\$\s?|(,*)/g, '')}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                )}

                {isRefundAction && (
                  <div className="mb-4 rounded-lg border border-[#e4dcd3] bg-[#faf7f2] p-3.5">
                    <Form.Item label="Quy trình chuyển khoản hoàn tiền cho khách hàng" className="!mb-3">
                      <Radio.Group
                        value={disputeTransferMode}
                        onChange={(e) => setDisputeTransferMode(e.target.value)}
                      >
                        <Space orientation="vertical">
                          <Radio value="immediate">
                            <strong>Đã chuyển khoản ngay</strong> (Tải ảnh chứng từ & hoàn tất ngay)
                          </Radio>
                          <Radio value="defer">
                            <strong>Tạo hồ sơ chờ chuyển sau</strong> (Xử lý tiếp ở tab Hồ sơ yêu cầu hoàn tiền)
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>

                    {disputeTransferMode === 'immediate' && (
                      <>
                        <Form.Item label="Mã giao dịch chuyển khoản (Reference Code)" className="!mb-3">
                          <Input
                            value={disputeRefundRefCode}
                            onChange={(e) => setDisputeRefundRefCode(e.target.value)}
                            placeholder="VD: TRF-RFD-20261115"
                          />
                        </Form.Item>

                        <Form.Item
                          label="Ảnh minh chứng chuyển khoản (bắt buộc)"
                          required
                          className="!mb-0"
                        >
                          <TransferProofUploader
                            url={disputeProofImageUrl}
                            uploading={disputeProofUploading}
                            onUpload={({ file, onSuccess, onError }) =>
                              uploadRefundProofFile(
                                file,
                                setDisputeProofImageUrl,
                                setDisputeProofUploading,
                                onSuccess,
                                onError
                              )
                            }
                            onClear={() => setDisputeProofImageUrl('')}
                          />
                        </Form.Item>
                      </>
                    )}
                  </div>
                )}

                <Form.Item label="Biên bản & căn cứ phán quyết">
                  <TextArea
                    rows={3}
                    placeholder="Ghi rõ lý do căn cứ theo ảnh PoD, biên bản giao nhận và thỏa thuận đơn hàng..."
                    value={disputeNotes}
                    onChange={(e) => setDisputeNotes(e.target.value)}
                  />
                </Form.Item>
              </Form>
            )}
          </Modal>
        );
      })()}

      {/* Modal Direct Bulk Order Refund Case Processing */}
      {activeRefundCase && (() => {
        const isPendingRefund =
          activeRefundCase.status === 'Pending' || activeRefundCase.status === 'PendingAdminReview';

        return (
          <Modal
            title={
              <div className="flex items-center gap-2 text-[#7d1322]">
                <DollarCircleOutlined />
                <span>
                  {isPendingRefund ? 'Xử lý & chuyển khoản hoàn tiền: ' : 'Chi tiết hồ sơ hoàn tiền: '}
                  {activeRefundCase.caseNumber}
                </span>
              </div>
            }
            open={!!activeRefundCase}
            onCancel={() => setActiveRefundCase(null)}
            onOk={handleProcessRefundCase}
            confirmLoading={refundSubmitting}
            okText={refundCaseApprove ? 'Xác nhận đã chuyển & lưu chứng từ' : 'Từ chối'}
            okButtonProps={
              refundCaseApprove
                ? { style: { backgroundColor: '#7d1322', borderColor: '#7d1322' } }
                : undefined
            }
            footer={
              isPendingRefund
                ? undefined
                : (
                  <Button type="primary" style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }} onClick={() => setActiveRefundCase(null)}>
                    Đóng
                  </Button>
                )
            }
            width={640}
            style={{ maxWidth: 'calc(100vw - 24px)' }}
            destroyOnHidden
          >
            <Descriptions bordered size="small" column={1} className="mt-3">
              <Descriptions.Item label="Mã hồ sơ">{activeRefundCase.caseNumber}</Descriptions.Item>
              <Descriptions.Item label="Mã đơn hàng">{activeRefundCase.orderNumber || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Số tiền yêu cầu">
                <strong className="text-[#7d1322] tabular-nums">
                  {(activeRefundCase.requestedAmount || 0).toLocaleString('vi-VN')} ₫
                </strong>
              </Descriptions.Item>
              <Descriptions.Item label="TK ngân hàng nhận hoàn">
                {renderBankAccountBlock(activeRefundCase.customerBankSnapshotJson)}
              </Descriptions.Item>
              <Descriptions.Item label="Lý do">{activeRefundCase.reason}</Descriptions.Item>
              {!isPendingRefund && (
                <>
                  <Descriptions.Item label="Số tiền đã hoàn">
                    <strong className="text-[#2d5a43] tabular-nums">
                      {(activeRefundCase.approvedAmount || 0).toLocaleString('vi-VN')} ₫
                    </strong>
                  </Descriptions.Item>
                  {activeRefundCase.refundReferenceCode && (
                    <Descriptions.Item label="Mã tham chiếu giao dịch">
                      <span className="font-mono font-semibold">
                        {activeRefundCase.refundReferenceCode}
                      </span>
                    </Descriptions.Item>
                  )}
                  {activeRefundCase.transferProofImageUrl && (
                    <Descriptions.Item label="Ảnh minh chứng chuyển khoản">
                      <Image
                        src={activeRefundCase.transferProofImageUrl}
                        alt="Ảnh minh chứng chuyển khoản hoàn tiền"
                        width={140}
                        height={100}
                        style={{ objectFit: 'cover', borderRadius: 6, border: '1px solid #e4dcd3' }}
                      />
                    </Descriptions.Item>
                  )}
                  {activeRefundCase.adminNotes && (
                    <Descriptions.Item label="Ghi chú quản trị">{activeRefundCase.adminNotes}</Descriptions.Item>
                  )}
                </>
              )}
            </Descriptions>

            {isPendingRefund && (
              <Form layout="vertical" className="mt-4">
                <Form.Item label="Quyết định duyệt">
                  <Radio.Group
                    value={refundCaseApprove}
                    onChange={(e) => setRefundCaseApprove(e.target.value)}
                  >
                    <Radio value={true}>Đã chuyển khoản hoàn tiền cho khách</Radio>
                    <Radio value={false}>Từ chối yêu cầu hoàn tiền</Radio>
                  </Radio.Group>
                </Form.Item>

                {refundCaseApprove && (
                  <>
                    <Form.Item label="Số tiền hoàn thực tế (VNĐ)">
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

                    <Form.Item label="Mã giao dịch chuyển khoản / Ủy nhiệm chi">
                      <Input
                        value={refundReferenceCode}
                        onChange={(e) => setRefundReferenceCode(e.target.value)}
                        placeholder="VD: TRF-RFD-20261115"
                      />
                    </Form.Item>

                    <Form.Item label="Ảnh minh chứng chuyển khoản (bắt buộc)" required>
                      <TransferProofUploader
                        url={refundProofImageUrl}
                        uploading={refundProofUploading}
                        onUpload={({ file, onSuccess, onError }) =>
                          uploadRefundProofFile(
                            file,
                            setRefundProofImageUrl,
                            setRefundProofUploading,
                            onSuccess,
                            onError
                          )
                        }
                        onClear={() => setRefundProofImageUrl('')}
                      />
                    </Form.Item>
                  </>
                )}

                <Form.Item label="Ghi chú phê duyệt của quản trị viên">
                  <TextArea
                    rows={3}
                    placeholder="Ghi chú chi tiết cho khách hàng và bộ phận tài chính..."
                    value={refundCaseNotes}
                    onChange={(e) => setRefundCaseNotes(e.target.value)}
                  />
                </Form.Item>
              </Form>
            )}
          </Modal>
        );
      })()}

      {/* Modal Direct Bulk Order Payout Request Processing */}
      {activePayoutRequest && (() => {
        const isPendingPayout = activePayoutRequest.status === 'Pending' || activePayoutRequest.status === 'PendingAdminReview';
        return (
          <Modal
            title={
              <div className="flex items-center gap-2 text-[#2d5a43]">
                <BankOutlined />
                <span>
                  {isPendingPayout
                    ? `Giải ngân thủ công & tải chứng từ: ${activePayoutRequest.requestNumber}`
                    : `Chi tiết chứng từ giải ngân: ${activePayoutRequest.requestNumber}`}
                </span>
              </div>
            }
            open={!!activePayoutRequest}
            onCancel={() => setActivePayoutRequest(null)}
            onOk={handleProcessPayoutRequest}
            confirmLoading={payoutSubmitting}
            okText={payoutApprove ? 'Xác nhận đã chuyển khoản' : 'Từ chối'}
            okButtonProps={
              payoutApprove
                ? { style: { backgroundColor: '#2d5a43', borderColor: '#2d5a43' } }
                : undefined
            }
            footer={isPendingPayout ? undefined : [
              <Button key="close" onClick={() => setActivePayoutRequest(null)}>
                Đóng
              </Button>,
            ]}
            width={620}
            style={{ maxWidth: 'calc(100vw - 24px)' }}
            destroyOnHidden
          >
            <Descriptions bordered size="small" column={1} className="mt-3">
              <Descriptions.Item label="Mã yêu cầu">{activePayoutRequest.requestNumber}</Descriptions.Item>
              <Descriptions.Item label="Mã đơn hàng">{activePayoutRequest.orderNumber || 'ORD-N/A'}</Descriptions.Item>
              <Descriptions.Item label="Số tiền giải ngân">
                <strong className="text-base text-[#2d5a43] tabular-nums">
                  {(activePayoutRequest.amount || 0).toLocaleString('vi-VN')} ₫
                </strong>
              </Descriptions.Item>
              <Descriptions.Item label="Tài khoản ngân hàng NCC">
                {renderBankAccountBlock(activePayoutRequest.bankSnapshotJson, 'Chưa có thông tin STK')}
              </Descriptions.Item>
              {!isPendingPayout && activePayoutRequest.payoutReferenceCode && (
                <Descriptions.Item label="Mã tham chiếu / Ủy nhiệm chi">
                  <Tag style={{ backgroundColor: '#edf5ef', borderColor: '#c5dccb', color: '#2d5a43' }}>
                    {activePayoutRequest.payoutReferenceCode}
                  </Tag>
                </Descriptions.Item>
              )}
              {!isPendingPayout && activePayoutRequest.adminNotes && (
                <Descriptions.Item label="Ghi chú quản trị">{activePayoutRequest.adminNotes}</Descriptions.Item>
              )}
              {!isPendingPayout && activePayoutRequest.transferProofImageUrl && (
                <Descriptions.Item label="Ảnh chứng từ chuyển khoản (PoD)">
                  <Image
                    src={activePayoutRequest.transferProofImageUrl}
                    alt={`Chứng từ giải ngân ${activePayoutRequest.requestNumber}`}
                    width={160}
                    style={{ borderRadius: 8, border: '1px solid #e4dcd3' }}
                  />
                </Descriptions.Item>
              )}
            </Descriptions>

            {isPendingPayout && (
              <Form layout="vertical" className="mt-4">
                <Form.Item label="Quyết định xử lý giải ngân">
                  <Radio.Group
                    value={payoutApprove}
                    onChange={(e) => setPayoutApprove(e.target.value)}
                  >
                    <Radio value={true}>Đã chuyển khoản cho NCC & tải lên ảnh PoD</Radio>
                    <Radio value={false}>Từ chối yêu cầu giải ngân</Radio>
                  </Radio.Group>
                </Form.Item>

                {payoutApprove && (
                  <>
                    <Form.Item label="Mã giao dịch chuyển khoản / Ủy nhiệm chi">
                      <Input
                        value={payoutReferenceCode}
                        onChange={(e) => setPayoutReferenceCode(e.target.value)}
                        placeholder="VD: UNC-VCB-20261115-001"
                      />
                    </Form.Item>
                    <Form.Item label="Ảnh minh chứng chuyển khoản (PoD / Biên lai UNC)" required>
                      <TransferProofUploader
                        url={payoutProofImageUrl}
                        uploading={payoutProofUploading}
                        onUpload={({ file, onSuccess, onError }) =>
                          handleUploadPayoutProof(file, onSuccess, onError)
                        }
                        onClear={() => setPayoutProofImageUrl('')}
                      />
                    </Form.Item>
                  </>
                )}

                <Form.Item label="Ghi chú đối soát">
                  <TextArea
                    rows={3}
                    placeholder="Ghi chú xác nhận đã chuyển khoản vào STK của xưởng..."
                    value={payoutNotes}
                    onChange={(e) => setPayoutNotes(e.target.value)}
                  />
                </Form.Item>
              </Form>
            )}
          </Modal>
        );
      })()}
    </ColonyAdminLayout>
  );
}
