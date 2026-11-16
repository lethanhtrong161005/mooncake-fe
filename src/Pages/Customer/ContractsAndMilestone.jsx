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
  Radio,
  Select,
  Space,
  Steps,
  Table,
  Tag,
  Tooltip,
  Typography,
  message,
} from 'antd';
import {
  AlertOutlined,
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  FileDoneOutlined,
  MessageOutlined,
  OrderedListOutlined,
  ReloadOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import CustomerBreadcrumbBar from '../../components/layout/CustomerBreadcrumbBar';
import CustomerFooter from '../../components/layout/CustomerFooter';
import contractService from '../../services/contractService';
import paymentService from '../../services/paymentService';
import deliveryService from '../../services/deliveryService';
import { signalRManager } from '../../services/signalrService';
import { useChat } from '../../hooks/useChat';
import RowActionMenu from '../../components/common/RowActionMenu';
import { TruncatedTooltip } from '../../components/common/TableCellHelpers';
import '../../styles/journey-pages.css';

const { Paragraph, Text, Title } = Typography;
const { TextArea } = Input;

const money = (amount) => `${Number(amount || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) => error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.';
const normalizeSearch = (value) => String(value || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[đĐ]/g, 'd')
  .toLocaleLowerCase('vi');

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
            width: 280,
            render: (name, item) => (
              <div className="max-w-[265px] space-y-0.5 text-xs">
                <TruncatedTooltip text={name || 'Sản phẩm'} className="font-semibold text-[#231a18]" />
                {item.Description && <TruncatedTooltip text={item.Description} className="text-[#6c625e]" />}
                {item.Specifications && (
                  <TruncatedTooltip text={`Quy cách: ${item.Specifications}`} className="text-[#6c625e]" />
                )}
                {item.PackagingRequirements && (
                  <TruncatedTooltip text={`Đóng gói: ${item.PackagingRequirements}`} className="text-[#6c625e]" />
                )}
                {item.Notes && <TruncatedTooltip text={`Ghi chú: ${item.Notes}`} className="text-[#6c625e]" />}
              </div>
            ),
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
  const { openChatWithShop } = useChat();
  const [contracts, setContracts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [paymentReviewOpen, setPaymentReviewOpen] = useState(false);
  const [paymentTermsConfirmed, setPaymentTermsConfirmed] = useState(false);
  const [paymentChoice, setPaymentChoice] = useState('deposit');
  const [contractSearch, setContractSearch] = useState('');
  const [contractStatusFilter, setContractStatusFilter] = useState('all');


  // Milestones Drawer
  const [milestonesDrawerOpen, setMilestonesDrawerOpen] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [contractDetails, setContractDetails] = useState(null);
  const [contractDeliveries, setContractDeliveries] = useState([]);
  const [milestoneRejectModalOpen, setMilestoneRejectModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [payingMilestoneId, setPayingMilestoneId] = useState(null);
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
      const isDeliveryEvent = event?.category === 'delivery' || /^(delivery)\./.test(event?.type || '');
      if (!event || ['contract', 'payment'].includes(event.category)
        || /^(contract|payment)\./.test(event.type || '') || isDeliveryEvent) load();
      if (isDeliveryEvent && milestonesDrawerOpen && selected?.id) {
        Promise.all([
          contractService.get(selected.id),
          deliveryService.getByContract(selected.id),
        ]).then(([details, deliveryData]) => {
          setContractDetails(details);
          setContractDeliveries(Array.isArray(deliveryData) ? deliveryData : deliveryData?.items || []);
        }).catch((error) => message.error(errorMessage(error)));
      }
    };
    signalRManager.on('MarketplaceChanged', refreshContracts);
    signalRManager.on('ReceiveNotification', refreshContracts);
    return () => {
      signalRManager.off('MarketplaceChanged', refreshContracts);
      signalRManager.off('ReceiveNotification', refreshContracts);
    };
  }, [load, milestonesDrawerOpen, selected?.id]);

  const paymentByContract = useMemo(
    () => new Map(payments.filter((payment) => payment.contractId).map((payment) => [payment.contractId, payment])),
    [payments]
  );

  const filteredContracts = useMemo(() => {
    const query = normalizeSearch(contractSearch.trim());
    return contracts.filter((contract) => {
      const matchesStatus = contractStatusFilter === 'all' || contract.status === contractStatusFilter;
      const searchable = [
        contract.contractNumber,
        contract.title,
        contract.status,
        statusMap[contract.status]?.[1],
      ].filter(Boolean).join(' ');
      return matchesStatus && (!query || normalizeSearch(searchable).includes(query));
    });
  }, [contracts, contractSearch, contractStatusFilter]);

  const allContractDeliveriesArrived = contractDeliveries.length > 0
    && contractDeliveries.every((delivery) => delivery.status === 'Delivered');
  const contractHasDeliveryInProgress = contractDeliveries.some((delivery) => (
    !['Delivered', 'Failed', 'Returned'].includes(delivery.status)
  ));
  const milestone2IsPaid = contractDetails?.milestones?.some((milestone) => (
    milestone.sequenceNumber === 2 && milestone.status === 'Paid'
  )) || false;
  const finalMilestoneReadyForSettlement = allContractDeliveriesArrived && milestone2IsPaid;

  const openPaymentReview = async (contract) => {
    setActionLoading(true);
    try {
      const details = await contractService.get(contract.id);
      setSelected({ ...contract, ...details });
      setPaymentTermsConfirmed(false);
      setPaymentChoice('deposit');
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
    if (paymentChoice === 'deposit' && !payment?.milestoneId) {
      message.warning('Chưa tìm thấy khoản cọc M1. Hãy tải lại danh sách hợp đồng để đồng bộ khoản thanh toán.');
      return;
    }
    setSelected(contract);
    setActionLoading(true);
    try {
      const result = await paymentService.createVnPayUrl(
        contract.id,
        payment.milestoneId,
        `${window.location.origin}/thanh-toan/ket-qua`,
        paymentChoice === 'full'
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
      const [details, deliveryData, paymentData] = await Promise.all([
        contractService.get(contract.id),
        deliveryService.getByContract(contract.id),
        paymentService.listMine(),
      ]);
      setContractDetails(details);
      setContractDeliveries(Array.isArray(deliveryData) ? deliveryData : deliveryData?.items || []);
      setPayments(paymentData || []);
      setMilestonesDrawerOpen(true);
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const chatWithSupplier = async () => {
    const supplierId = contractDetails?.supplierId || selected?.supplierId;
    if (!supplierId) {
      message.error('Không tìm thấy thông tin supplier của hợp đồng để mở cuộc trò chuyện.');
      return;
    }
    setChatLoading(true);
    try {
      const thread = await openChatWithShop({ supplierId });
      if (!thread?.id) {
        message.error('Không thể mở cuộc trò chuyện. Vui lòng thử lại khi kết nối tin nhắn sẵn sàng.');
        return;
      }
      setMilestonesDrawerOpen(false);
      onNavigate?.(`tin-nhan?threadId=${encodeURIComponent(thread.id)}`);
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setChatLoading(false);
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

  const handlePayMilestone = async (milestone) => {
    if (!selected || milestone.isDeposit) return;
    if (milestone.sequenceNumber === 3) {
      if (!finalMilestoneReadyForSettlement) {
        message.warning('Mốc 3 có thể thanh toán sau khi mốc 2 đã thanh toán và tất cả chuyến giao được xác nhận đã giao.');
        return;
      }
    }
    setPayingMilestoneId(milestone.id);
    try {
      const result = await paymentService.createVnPayUrl(
        selected.id,
        milestone.id,
        `${window.location.origin}/thanh-toan/ket-qua`,
      );
      window.location.assign(result.paymentUrl);
    } catch (error) {
      message.error(errorMessage(error));
      setPayingMilestoneId(null);
    }
  };

  const handleRecordCashMilestonePayment = (milestone) => {
    if (!selected || milestone.sequenceNumber !== 3 || !finalMilestoneReadyForSettlement) return;
    Modal.confirm({
      title: 'Xác nhận đã thanh toán tiền mặt?',
      content: `Xác nhận bạn đã trả ${money(milestone.amount)} tiền mặt cho supplier. Sau khi xác nhận, mốc M3 sẽ được ghi nhận là đã thanh toán và bạn có thể tiếp tục nghiệm thu.`,
      okText: 'Đã thanh toán tiền mặt',
      cancelText: 'Hủy',
      onOk: async () => {
        setPayingMilestoneId(milestone.id);
        try {
          await paymentService.recordCashMilestonePayment(selected.id, milestone.id);
          const [details, paymentData] = await Promise.all([
            contractService.get(selected.id),
            paymentService.listMine(),
          ]);
          setContractDetails(details);
          setPayments(paymentData || []);
          message.success('Đã ghi nhận thanh toán tiền mặt cho mốc M3.');
          await load();
        } catch (error) {
          message.error(errorMessage(error));
        } finally {
          setPayingMilestoneId(null);
        }
      },
    });
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

  const openFinalAcceptance = async (contract) => {
    setActionLoading(true);
    try {
      const [details, deliveryData, paymentData] = await Promise.all([
        contractService.get(contract.id),
        deliveryService.getByContract(contract.id),
        paymentService.listMine(),
      ]);
      const deliveries = Array.isArray(deliveryData) ? deliveryData : deliveryData?.items || [];
      setPayments(paymentData || []);
      const hasDeliveredShipment = deliveries.length > 0
        && deliveries.every((delivery) => delivery.status === 'Delivered');
      const milestone2 = details.milestones?.find((item) => item.sequenceNumber === 2);
      const milestone3 = details.milestones?.find((item) => item.sequenceNumber === 3);
      const fullContractPaid = (paymentData || []).some((payment) => payment.contractId === contract.id
        && !payment.milestoneId && payment.status === 'Completed');
      if (!hasDeliveredShipment) {
        message.warning('Bạn có thể nghiệm thu khi tất cả chuyến giao đã được xác nhận hoàn tất.');
        return;
      }
      if (milestone2 && !['Paid', 'CompletedOnTime', 'CompletedLate'].includes(milestone2.status)) {
        message.warning('Vui lòng xác nhận và thanh toán mốc 2 trước khi nghiệm thu toàn bộ.');
        return;
      }
      if (milestone3 && milestone3.status !== 'Paid' && !fullContractPaid) {
        message.warning('Vui lòng thanh toán mốc 3 trước khi nghiệm thu toàn bộ.');
        return;
      }
      setSelected({ ...contract, ...details });
      setContractDetails(details);
      setContractDeliveries(deliveries);
      setConfirmedQuality(false);
      setAcceptanceNotes('');
      setAcceptanceModalOpen(true);
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
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
      width: 260,
      render: (value, item) => {
        const titleText = item.title || 'Hợp đồng từ báo giá RFQ';
        return (
          <div className="max-w-[245px]">
            <TruncatedTooltip
              text={value}
              tooltipContent={`${value} — ${titleText}`}
              className="font-mono text-sm font-semibold text-[#8c1524]"
            />
            <TruncatedTooltip
              text={titleText}
              tooltipContent={`${value} — ${titleText}`}
              className="text-xs text-[#6c625e]"
            />
          </div>
        );
      },
    },
    {
      title: 'Tổng giá trị',
      dataIndex: 'totalValue',
      align: 'right',
      width: 140,
      render: (val) => (
        <span className="whitespace-nowrap font-semibold tabular-nums text-[#231a18]">
          {money(val)}
        </span>
      ),
    },
    {
      title: 'Hạn giao',
      dataIndex: 'deliveryDeadline',
      width: 115,
      render: (value) => (
        <span className="whitespace-nowrap text-xs tabular-nums text-[#574d49]">
          {value || '—'}
        </span>
      ),
    },
    {
      title: 'Các bước xác nhận',
      width: 245,
      render: (_, item) => (
        <div className="max-w-[230px] space-y-1">
          {item.signedBySupplierAt
            ? <Tag color="success" icon={<CheckCircleOutlined />} className="m-0">Xưởng đã ký</Tag>
            : <Tag color="processing" className="m-0">Đang chờ xưởng ký</Tag>}
          {item.status === 'PendingDeposit' && (
            <Tooltip title="Bạn cần xác nhận điều khoản và thanh toán M1" color="#231a18" placement="topLeft">
              <Tag color="warning" className="m-0 max-w-[225px] truncate align-bottom">
                Xác nhận điều khoản & thanh toán M1
              </Tag>
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 180,
      render: (value) => (
        <Tag color={statusMap[value]?.[0] || 'default'} className="m-0 whitespace-nowrap">
          {statusMap[value]?.[1] || value}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: 84,
      render: (_, item) => (
        <RowActionMenu
          ariaLabel={`Thao tác hợp đồng ${item.contractNumber}`}
          actions={[
            {
              key: 'submit',
              label: 'Gửi ký hợp đồng',
              icon: <FileDoneOutlined />,
              show: item.status === 'Draft',
              onClick: async () => {
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
              },
            },
            {
              key: 'pay',
              label: 'Xem hợp đồng & xác nhận thanh toán',
              icon: <DollarOutlined />,
              show: item.status === 'PendingDeposit',
              disabled: actionLoading || !paymentByContract.get(item.id)?.milestoneId,
              onClick: () => openPaymentReview(item),
            },
            {
              key: 'milestones',
              label: 'Tiến độ & mốc nghiệm thu',
              icon: <OrderedListOutlined />,
              show: ['Active', 'CompletedOnTime', 'CompletedLate', 'Disputed', 'Breached'].includes(item.status),
              onClick: () => viewMilestones(item),
            },
            {
              key: 'accept',
              label: 'Nghiệm thu dứt điểm',
              icon: <FileDoneOutlined />,
              show: item.status === 'Active',
              onClick: () => openFinalAcceptance(item),
            },
            {
              key: 'dispute',
              label: 'Khiếu nại hợp đồng',
              icon: <AlertOutlined />,
              danger: true,
              show: item.status === 'Active',
              onClick: () => openDispute(item),
            },
          ]}
        />
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
            <div><h2 id="contracts-list-title">Hợp đồng của bạn</h2><p>{loading ? 'Đang tải hợp đồng…' : `${filteredContracts.length}${filteredContracts.length !== contracts.length ? ` / ${contracts.length}` : ''} hợp đồng`}</p></div>
            <Button icon={<ReloadOutlined />} onClick={load} loading={loading}>Tải lại</Button>
          </div>
          <Space wrap size="middle" style={{ width: '100%', marginBottom: 16 }}>
            <Input
              allowClear
              value={contractSearch}
              onChange={(event) => setContractSearch(event.target.value)}
              prefix={<SearchOutlined />}
              placeholder="Tìm theo mã hoặc tên hợp đồng"
              aria-label="Tìm hợp đồng theo mã hoặc tên"
              style={{ flex: '1 1 280px', maxWidth: 420 }}
            />
            <Select
              value={contractStatusFilter}
              onChange={setContractStatusFilter}
              aria-label="Lọc hợp đồng theo trạng thái"
              style={{ width: 240, maxWidth: '100%' }}
              options={[
                { value: 'all', label: 'Tất cả trạng thái' },
                ...Object.entries(statusMap).map(([value, [, label]]) => ({ value, label })),
              ]}
            />
          </Space>
          <div className="journey-desktop-table">
            <Table
              rowKey="id"
              loading={loading}
              dataSource={filteredContracts}
              columns={columns}
              scroll={{ x: 1024 }}
              locale={{ emptyText: filteredContracts.length === 0 && contracts.length > 0
                ? 'Không tìm thấy hợp đồng phù hợp.'
                : <div className="journey-empty"><FileDoneOutlined /><strong>Chưa có hợp đồng</strong><p>Khi bạn chọn một báo giá, hợp đồng sẽ xuất hiện tại đây để theo dõi.</p><Button onClick={() => onNavigate?.('so-sanh-bao-gia')}>Xem yêu cầu báo giá</Button></div> }}
            />
          </div>
          <div className="journey-mobile-list">
            {loading ? <p className="journey-empty">Đang tải hợp đồng…</p> : filteredContracts.length ? filteredContracts.map((item) => <article className="journey-record" key={item.id}>
              <div className="journey-record__top"><strong>{item.contractNumber}</strong><Tag color={statusMap[item.status]?.[0] || 'default'}>{statusMap[item.status]?.[1] || item.status}</Tag></div>
              <h3>{item.title || 'Hợp đồng từ báo giá RFQ'}</h3>
              <dl><div><dt>Giá trị</dt><dd>{money(item.totalValue)}</dd></div><div><dt>Hạn giao</dt><dd>{item.deliveryDeadline || '—'}</dd></div><div><dt>Xác nhận</dt><dd>{item.signedBySupplierAt ? 'Xưởng đã ký' : 'Chờ xưởng ký'}</dd></div></dl>
              <div className="journey-record__actions">{columns[5].render(null, item)}</div>
            </article>) : contracts.length > 0
              ? <div className="journey-empty">Không tìm thấy hợp đồng phù hợp.</div>
              : <div className="journey-empty"><FileDoneOutlined /><strong>Chưa có hợp đồng</strong><p>Khi bạn chọn một báo giá, hợp đồng sẽ xuất hiện tại đây.</p><Button onClick={() => onNavigate?.('so-sanh-bao-gia')}>Xem yêu cầu báo giá</Button></div>}
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
              {
                title: 'Mã giao dịch',
                dataIndex: 'paymentNumber',
                key: 'paymentNumber',
                width: 185,
                render: (val) => (
                  <div className="max-w-[170px]">
                    <TruncatedTooltip text={val} className="font-mono text-xs font-medium text-[#231a18]" />
                  </div>
                ),
              },
              {
                title: 'Hợp đồng / đơn hàng',
                key: 'reference',
                width: 225,
                render: (_, payment) => {
                  const refText = payment.contractId
                    ? `Hợp đồng · ${contracts.find((contract) => contract.id === payment.contractId)?.contractNumber || payment.contractId.slice(0, 8)}`
                    : (payment.orderId ? `Đơn hàng · ${payment.orderId.slice(0, 8)}` : '—');
                  return (
                    <div className="max-w-[210px]">
                      <TruncatedTooltip text={refText} className="text-[#4b423e]" />
                    </div>
                  );
                },
              },
              { title: 'Số tiền', dataIndex: 'amount', key: 'amount', align: 'right', width: 135, render: (v) => <span className="whitespace-nowrap font-semibold tabular-nums">{money(v)}</span> },
              { title: 'Phương thức', dataIndex: 'method', key: 'method', width: 110, render: (method) => method === 'VNPay' ? 'VNPay' : method },
              {
                title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 135,
                render: (status) => <Tag color={paymentStatusMap[status]?.[0] || 'default'} className="m-0 whitespace-nowrap">{paymentStatusMap[status]?.[1] || status}</Tag>,
              },
              {
                title: 'Thời gian', key: 'time', width: 165,
                render: (_, payment) => {
                  const value = payment.paidAt || payment.createdAt || payment.expiresAt;
                  return <span className="whitespace-nowrap text-xs tabular-nums text-[#574d49]">{value ? new Date(value).toLocaleString('vi-VN') : '—'}</span>;
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
          <Alert type="info" showIcon style={{ marginBottom: 16 }} message="Xưởng đã xác nhận hợp đồng. Bạn có thể chọn thanh toán cọc M1 hoặc nạp toàn bộ giá trị hợp đồng vào ký quỹ ngay từ đầu." />
          <Alert
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
            message="Lưu ý về hoàn tiền"
            description="Sau khi bạn xác nhận hợp đồng và thanh toán, khoản tiền đã thanh toán sẽ không được hoàn lại. Vui lòng kiểm tra kỹ hợp đồng và lựa chọn thanh toán trước khi tiếp tục."
          />
          <Descriptions bordered size="small" column={{ xs: 1, sm: 2 }}>
            <Descriptions.Item label="Mã hợp đồng">{selected.contractNumber}</Descriptions.Item>
            <Descriptions.Item label="Tên hợp đồng">{selected.title || 'Hợp đồng RFQ'}</Descriptions.Item>
            <Descriptions.Item label="Tổng giá trị">{money(selected.totalValue)}</Descriptions.Item>
            <Descriptions.Item label="Hạn giao hàng">{selected.deliveryDeadline || '—'}</Descriptions.Item>
            <Descriptions.Item label="Khoản đặt cọc M1">{paymentByContract.get(selected.id)?.amount ? money(paymentByContract.get(selected.id).amount) : '—'}</Descriptions.Item>
            <Descriptions.Item label="Xưởng xác nhận">{selected.signedBySupplierAt ? new Date(selected.signedBySupplierAt).toLocaleString('vi-VN') : 'Đã xác nhận'}</Descriptions.Item>
            <Descriptions.Item label="Chi tiết thỏa thuận" span={2}><ContractTerms value={selected.termsAndConditions} /></Descriptions.Item>
          </Descriptions>
          {selected.milestones?.length > 0 && <div style={{ marginTop: 16 }}>
            <Text strong>Lịch thanh toán, sản xuất và nghiệm thu</Text>
            {selected.milestones.map((milestone) => <Card key={milestone.id} size="small" style={{ marginTop: 8 }}>
              <Space orientation="vertical" size={2}>
                <Text strong>{milestone.sequenceNumber}. {milestone.name}</Text>
                <Text>{money(milestone.amount)} · Hạn: {milestone.dueDate || 'Theo tiến độ hợp đồng'} · {milestone.description === 'Mandatory deposit required to activate the contract.' ? 'Khoản đặt cọc bắt buộc để kích hoạt hợp đồng.' : milestone.description || ''}</Text>
              </Space>
            </Card>)}
          </div>}
          <div style={{ marginTop: 18 }}>
            <Space size={6}>
              <Text strong>Chọn cách thanh toán</Text>
              <Tooltip title="Đặt cọc M1: thanh toán khoản cọc ban đầu, các mốc còn lại thanh toán theo tiến độ. Thanh toán toàn bộ: trả tổng giá trị hợp đồng trong một lần. Cả hai khoản đều được giữ trong ký quỹ và chỉ giải ngân theo mốc sau khi nghiệm thu.">
                <QuestionCircleOutlined aria-label="Giải thích các cách thanh toán" tabIndex={0} style={{ color: '#8c1524', cursor: 'help' }} />
              </Tooltip>
            </Space>
            <Radio.Group value={paymentChoice} onChange={(event) => setPaymentChoice(event.target.value)} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
              <Radio value="deposit">Thanh toán đặt cọc M1 · {money(paymentByContract.get(selected.id)?.amount)}</Radio>
              <Radio value="full">Thanh toán toàn bộ một lần · {money(selected.totalValue)}</Radio>
            </Radio.Group>
            {paymentChoice === 'full' && <Alert type="info" showIcon style={{ marginTop: 12 }} message="Toàn bộ tiền được giữ trong ký quỹ. Supplier vẫn cần hoàn thành từng mốc và customer nghiệm thu trước khi tiền được giải ngân theo tiến độ." />}
          </div>
          <Checkbox checked={paymentTermsConfirmed} onChange={(event) => setPaymentTermsConfirmed(event.target.checked)} style={{ marginTop: 18 }}>
            Tôi đã đọc và hiểu điều khoản hợp đồng, lựa chọn thanh toán và chính sách không hoàn tiền sau khi xác nhận hợp đồng và thanh toán.
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

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <Button type="primary" size="small" icon={<MessageOutlined />} loading={chatLoading} onClick={chatWithSupplier}>
                Nhắn tin với supplier
              </Button>
            </div>

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
                    <Tag color={milestone.sequenceNumber === 3 && contractHasDeliveryInProgress
                      ? 'processing'
                      : milestone.sequenceNumber === 3 && finalMilestoneReadyForSettlement && milestone.status !== 'Paid'
                        ? 'warning' : milestoneStatusMap[milestone.status]?.[0] || 'default'}>
                      {milestone.sequenceNumber === 3 && contractHasDeliveryInProgress
                        ? 'Đang tiến hành giao hàng'
                        : milestone.sequenceNumber === 3 && finalMilestoneReadyForSettlement && milestone.status !== 'Paid'
                          ? 'Chờ thanh toán & nghiệm thu' : milestoneStatusMap[milestone.status]?.[1] || milestone.status}
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

                    {/* Customer review and payment actions for production milestones */}
                    {!milestone.isDeposit && (
                      <div style={{ marginTop: 12 }}>
                        <Divider style={{ margin: '8px 0' }} />
                        {(() => {
                          const canConfirm = ['InProgress', 'PendingReview'].includes(milestone.status);
                          const fullContractPaid = payments.some((payment) => (
                            payment.contractId === selected.id && !payment.milestoneId && payment.status === 'Completed'
                          ));
                          const canPay = milestone.sequenceNumber === 3
                            ? finalMilestoneReadyForSettlement
                            : ['CompletedOnTime', 'CompletedLate'].includes(milestone.status);
                          const alreadyPaid = milestone.status === 'Paid' || fullContractPaid || payments.some((payment) => (
                            payment.contractId === selected.id &&
                            payment.milestoneId === milestone.id &&
                            payment.status === 'Completed'
                          ));
                          return (
                            <Space wrap>
                              {milestone.sequenceNumber === 3 && contractDeliveries.length > 0 && (
                                <Button
                                  size="small"
                                  icon={<CarOutlined />}
                                  onClick={() => {
                                    setMilestonesDrawerOpen(false);
                                    onNavigate?.('giao-hang-pod');
                                  }}
                                >
                                  Xem giao nhận
                                </Button>
                              )}
                              {canConfirm && (
                                <>
                                  <Button
                                    type="primary"
                                    size="small"
                                    icon={<CheckCircleOutlined />}
                                    loading={actionLoading}
                                    onClick={() => handleVerifyMilestone(milestone, true)}
                                  >
                                    Đã xem và xác nhận
                                  </Button>
                                  {milestone.status === 'PendingReview' && (
                                    <Button
                                      danger
                                      size="small"
                                      icon={<CloseCircleOutlined />}
                                      onClick={() => handleVerifyMilestone(milestone, false)}
                                    >
                                      Yêu cầu chỉnh sửa
                                    </Button>
                                  )}
                                </>
                              )}
                              {alreadyPaid ? (
                                <Tag color="success">{fullContractPaid ? 'Đã thanh toán toàn bộ' : 'Đã thanh toán mốc'}</Tag>
                              ) : canPay ? (
                                <>
                                  <Button
                                    size="small"
                                    icon={<DollarOutlined />}
                                    loading={payingMilestoneId === milestone.id}
                                    onClick={() => handlePayMilestone(milestone)}
                                  >
                                    Thanh toán mốc {money(milestone.amount)}
                                  </Button>
                                  {milestone.sequenceNumber === 3 && (
                                    <Button
                                      size="small"
                                      icon={<CheckCircleOutlined />}
                                      loading={payingMilestoneId === milestone.id}
                                      onClick={() => handleRecordCashMilestonePayment(milestone)}
                                    >
                                      Đã thanh toán tiền mặt
                                    </Button>
                                  )}
                                </>
                              ) : null}
                            </Space>
                          );
                        })()}
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
