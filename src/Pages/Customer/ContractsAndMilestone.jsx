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
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import contractService from '../../services/contractService';
import paymentService from '../../services/paymentService';
import PaymentCheckoutModal from '../../components/payment/PaymentCheckoutModal';
import VietQrModal from '../../components/payment/VietQrModal';

const { Paragraph, Text, Title } = Typography;
const { TextArea } = Input;

const money = (amount) => `${Number(amount || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) => error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.';

const statusMap = {
  Draft: ['default', 'Bản nháp'],
  PendingSignature: ['processing', 'Chờ ký'],
  Signed: ['processing', 'Đã ký'],
  PendingDeposit: ['warning', 'Chờ cọc M1'],
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

export default function ContractsAndMilestone({ onNavigate }) {
  const [contracts, setContracts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // OTP Modal
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  // Payment Modal
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [vietQrData, setVietQrData] = useState(null);

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
      const [contractData, paymentData] = await Promise.all([
        contractService.listMine(),
        paymentService.listMine(),
      ]);
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

  const paymentByContract = useMemo(
    () => new Map(payments.filter((payment) => payment.contractId).map((payment) => [payment.contractId, payment])),
    [payments]
  );

  const requestOtp = async (contract) => {
    setActionLoading(true);
    try {
      await contractService.requestSignatureOtp(contract.id);
      setSelected(contract);
      setOtpCode('');
      setOtpOpen(true);
      message.success('Mã OTP ký hợp đồng đã được gửi đến email của bạn.');
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const sign = async () => {
    if (!otpCode.trim()) {
      message.warning('Vui lòng nhập mã OTP.');
      return;
    }
    setActionLoading(true);
    try {
      await contractService.sign(selected.id, otpCode.trim(), true);
      message.success('Đã ghi nhận chữ ký điện tử.');
      setOtpOpen(false);
      await load();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const openPayment = (contract) => {
    if (!paymentByContract.get(contract.id)?.milestoneId) {
      message.warning('Khoản cọc M1 đang được khởi tạo. Vui lòng tải lại sau ít phút.');
      return;
    }
    setSelected(contract);
    setPaymentOpen(true);
  };

  const payWithVnPay = async () => {
    const payment = paymentByContract.get(selected.id);
    if (!payment?.milestoneId) return;
    setActionLoading(true);
    try {
      const result = await paymentService.createVnPayUrl(
        selected.id,
        payment.milestoneId,
        `${window.location.origin}/#/hop-dong-tien-do`
      );
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
        <Space direction="vertical" size={0}>
          <Text strong style={{ color: '#8c1524' }}>{value}</Text>
          <Text orientation="left" type="secondary" style={{ fontSize: 12 }}>
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
      title: 'Ký điện tử',
      render: (_, item) =>
        item.signedByCustomerAt ? (
          <Tag color="success" icon={<CheckCircleOutlined />}>Đã ký</Tag>
        ) : (
          <Tag color="processing">Chờ bạn ký</Tag>
        ),
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

          {item.status === 'PendingSignature' && !item.signedByCustomerAt && (
            <Button
              type="primary"
              size="small"
              style={{ background: '#8c1524', borderColor: '#8c1524' }}
              icon={<SafetyCertificateOutlined />}
              loading={actionLoading}
              onClick={() => requestOtp(item)}
            >
              Ký OTP
            </Button>
          )}

          {item.status === 'PendingDeposit' && (
            <Button
              type="primary"
              size="small"
              icon={<DollarOutlined />}
              onClick={() => openPayment(item)}
            >
              Thanh toán M1
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
                style={{ background: '#52c41a', borderColor: '#52c41a' }}
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

  const currentPayment = selected ? paymentByContract.get(selected.id) : null;

  return (
    <div style={{ background: '#f5f5f7', minHeight: '100vh' }}>
      <CustomerHeader activeKey="hop-dong-tien-do" onNavigate={onNavigate} />
      <main style={{ maxWidth: 1320, margin: '0 auto', padding: '28px 20px 64px' }}>
        <Space direction="vertical" size={4} style={{ marginBottom: 20 }}>
          <Title level={2} style={{ margin: 0, color: '#8c1524' }}>
            Hợp đồng & tiến độ thanh toán
          </Title>
          <Text type="secondary">
            Ký số điện tử SHA-256, nộp cọc bảo chứng VNPay và đối soát biên bản nghiệm thu theo từng mốc.
          </Text>
        </Space>

        <Alert
          type="info"
          showIcon
          style={{ marginBottom: 20, borderRadius: 8 }}
          message="Tiền cọc được bảo chứng an toàn qua Escrow"
          description="Hợp đồng chuyển sang trạng thái Active khi VNPay xác nhận thanh toán M1. Tiền chỉ được giải ngân cho xưởng khi khách hàng nghiệm thu mốc đạt chuẩn."
        />

        <Card
          bordered={false}
          style={{ borderRadius: 10 }}
          extra={<Button icon={<ReloadOutlined />} onClick={load}>Tải lại</Button>}
        >
          <Table
            rowKey="id"
            loading={loading}
            dataSource={contracts}
            columns={columns}
            scroll={{ x: 900 }}
          />
        </Card>
      </main>

      {/* Modal Ký OTP */}
      <Modal
        title="Ký Hợp Đồng Bằng Mã OTP"
        open={otpOpen}
        onCancel={() => setOtpOpen(false)}
        onOk={sign}
        confirmLoading={actionLoading}
        okText="Xác nhận ký điện tử"
        okButtonProps={{ style: { background: '#8c1524', borderColor: '#8c1524' } }}
        cancelText="Hủy"
      >
        <Alert
          type="info"
          showIcon
          message="Hệ thống đã gửi mã OTP xác thực ký số về email đăng ký của bạn."
          style={{ marginBottom: 16 }}
        />
        <Input
          value={otpCode}
          onChange={(event) => setOtpCode(event.target.value)}
          inputMode="numeric"
          maxLength={12}
          placeholder="Nhập 6 chữ số OTP"
          style={{ fontSize: 20, textAlign: 'center', letterSpacing: 6, height: 48 }}
        />
        <div style={{ marginTop: 12, fontSize: 12, color: '#888' }}>
          Việc ký số đồng nghĩa bạn đã đọc và đồng thuận với các điều khoản bảo mật, quy cách sản phẩm và cơ chế giải quyết tranh chấp.
        </div>
      </Modal>

      {/* Modal Thanh toán Ký quỹ M1 */}
      <PaymentCheckoutModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        title="Thanh toán tiền cọc M1"
        contract={selected}
        milestone={{
          id: currentPayment?.milestoneId,
          name: 'Đặt cọc M1 kích hoạt sản xuất',
          amount: currentPayment?.amount || (selected?.totalValue ? selected.totalValue * 0.3 : 0),
          paymentNumber: currentPayment?.paymentNumber,
        }}
        onSuccess={() => {
          setPaymentOpen(false);
          load();
        }}
        onOpenVietQr={(data) => {
          setVietQrData(data);
        }}
      />

      <VietQrModal
        open={Boolean(vietQrData)}
        onClose={() => setVietQrData(null)}
        transferData={vietQrData}
        onUploadSuccess={() => {
          setVietQrData(null);
          load();
        }}
      />

      {/* Drawer Xem Tiến Độ & Nghiệm Thu Milestones */}
      <Drawer
        title={`Tiến độ & Mốc nghiệm thu: ${selected?.contractNumber || ''}`}
        width={720}
        open={milestonesDrawerOpen}
        onClose={() => setMilestonesDrawerOpen(false)}
      >
        {contractDetails && (
          <div>
            <Descriptions bordered size="small" column={2} style={{ marginBottom: 20 }}>
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
                            style={{ background: '#52c41a', borderColor: '#52c41a' }}
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
