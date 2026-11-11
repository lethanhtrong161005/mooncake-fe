import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  DatePicker,
  Descriptions,
  Divider,
  Form,
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
  ClockCircleOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import contractService from '../../services/contractService';
import usePagedList from '../../hooks/usePagedList';
import FilterBar from '../../components/common/FilterBar';
import { signalRManager } from '../../services/signalrService';

const { Paragraph, Text } = Typography;
const { TextArea } = Input;

const money = (amount) => `${Number(amount || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) => error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.';

const statusMap = {
  Draft: ['default', 'Bản nháp'],
  PendingSignature: ['warning', 'Chờ supplier xác nhận'],
  Signed: ['processing', 'Supplier đã xác nhận'],
  PendingDeposit: ['processing', 'Đã gửi hợp đồng · Chờ customer'],
  Active: ['success', 'Đang hiệu lực (Active)'],
  CompletedOnTime: ['success', 'Hoàn thành đúng hạn (+10đ)'],
  CompletedLate: ['purple', 'Hoàn thành trễ hạn (+3đ)'],
  Breached: ['error', 'Vi phạm hợp đồng (-20đ)'],
  Disputed: ['error', 'Đang tranh chấp'],
  Cancelled: ['default', 'Đã hủy'],
};

const milestoneStatusMap = {
  Pending: ['default', 'Chưa đến hạn'],
  AwaitingPayment: ['warning', 'Customer đang xử lý'],
  Paid: ['success', 'Đã nhận tiền'],
  InProgress: ['processing', 'Đang sản xuất'],
  PendingReview: ['orange', 'Đang chờ khách duyệt'],
  CompletedOnTime: ['success', 'Hoàn thành (Đúng hạn)'],
  CompletedLate: ['purple', 'Hoàn thành (Trễ hạn)'],
  Overdue: ['error', 'Quá hạn'],
  Failed: ['error', 'Khách yêu cầu sửa'],
};

export default function ContractManage({ onNavigate }) {
  const contractPage = usePagedList(contractService.listMinePaged);
  const contracts = contractPage.items;
  const loading = contractPage.loading;
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [contractDetails, setContractDetails] = useState(null);

  // Modals
  const [milestonesModalOpen, setMilestonesModalOpen] = useState(false);

  // Extension Modal
  const [extensionModalOpen, setExtensionModalOpen] = useState(false);
  const [extensionForm] = Form.useForm();

  // Progress Submission Modal
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [progressForm] = Form.useForm();

  const loadContracts = contractPage.refresh;
  useEffect(() => { if (contractPage.error) message.error(errorMessage(contractPage.error)); }, [contractPage.error]);
  useEffect(() => {
    const refreshContracts = () => loadContracts();
    signalRManager.on('ReceiveNotification', refreshContracts);
    return () => signalRManager.off('ReceiveNotification', refreshContracts);
  }, [loadContracts]);

  const handleConfirmContract = async (record) => {
    setSelectedContract(record);
    setActionLoading(true);
    try {
      await contractService.sign(record.id, '', true);
      message.success(`Đã ký và gửi hợp đồng ${record.contractNumber} cho customer xem lại.`);
      await loadContracts();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenMilestones = async (record) => {
    setSelectedContract(record);
    setActionLoading(true);
    try {
      const details = await contractService.get(record.id);
      setContractDetails(details);
      setMilestonesModalOpen(true);
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenProgressModal = (milestone) => {
    setSelectedMilestone(milestone);
    progressForm.resetFields();
    if (milestone.progressNotes) {
      progressForm.setFieldsValue({
        progressNotes: milestone.progressNotes,
        evidenceUrls: milestone.evidenceUrls?.join('\n') || '',
      });
    }
    setProgressModalOpen(true);
  };

  const handleSubmitProgress = async () => {
    try {
      const values = await progressForm.validateFields();
      setActionLoading(true);
      const urls = values.evidenceUrls
        ? values.evidenceUrls.split('\n').map((u) => u.trim()).filter(Boolean)
        : [];
      await contractService.submitProgress(
        selectedContract.id,
        selectedMilestone.id,
        values.progressNotes.trim(),
        urls
      );
      message.success(`Đã nộp bằng chứng tiến độ mốc "${selectedMilestone.name}" thành công! Đang chờ khách hàng duyệt.`);
      setProgressModalOpen(false);
      const details = await contractService.get(selectedContract.id);
      setContractDetails(details);
      await loadContracts();
    } catch (error) {
      if (error?.errorFields) return;
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenExtension = (record) => {
    setSelectedContract(record);
    extensionForm.resetFields();
    setExtensionModalOpen(true);
  };

  const handleSubmitExtension = async () => {
    try {
      const values = await extensionForm.validateFields();
      setActionLoading(true);
      const proposedDateStr = values.proposedDueDate.format('YYYY-MM-DD');
      await contractService.requestExtension(selectedContract.id, proposedDateStr, values.reason.trim());
      message.success('Đã gửi đơn xin gia hạn tiến độ tới Bên Mua và BQL Sàn MoonMarket.');
      setExtensionModalOpen(false);
      await loadContracts();
    } catch (error) {
      if (error?.errorFields) return;
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const handleRequestFinalAcceptance = async (record) => {
    setActionLoading(true);
    try {
      await contractService.requestFinalAcceptance(record.id);
      message.success('Đã gửi yêu cầu nghiệm thu dứt điểm 100% lô hàng tới Khách hàng!');
      await loadContracts();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    {
      title: 'Số Hợp Đồng',
      dataIndex: 'contractNumber',
      key: 'contractNumber',
      width: 170,
      render: (no) => <span style={{ fontWeight: 600, color: '#8c1524' }}>{no}</span>,
    },
    {
      title: 'Tiêu Đề / Ghi Chú',
      dataIndex: 'title',
      key: 'title',
      render: (t) => t || 'Hợp đồng đơn hàng RFQ',
    },
    {
      title: 'Tổng Giá Trị',
      dataIndex: 'totalValue',
      key: 'totalValue',
      align: 'right',
      render: (amt) => <span style={{ fontWeight: 700, color: '#8c1524' }}>{money(amt)}</span>,
    },
    {
      title: 'Hạn Giao Hàng',
      dataIndex: 'deliveryDeadline',
      key: 'deliveryDeadline',
      render: (d) => d || '—',
    },
    {
      title: 'Supplier xác nhận',
      key: 'signature',
      render: (_, r) => r.signedBySupplierAt
        ? <Tag color="success">✓ Supplier đã ký và gửi hợp đồng</Tag>
        : <Tag color="warning">Supplier cần ký hợp đồng</Tag>,
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (st) => (
        <Tag color={statusMap[st]?.[0] || 'default'}>
          {statusMap[st]?.[1] || st}
        </Tag>
      ),
    },
    {
      title: 'Thao Tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small" wrap>
          <Button
            type="link"
            size="small"
            icon={<FileTextOutlined />}
            onClick={() => handleOpenMilestones(record)}
          >
            Xem hợp đồng
          </Button>

          {record.status === 'PendingSignature' && !record.signedBySupplierAt && (
            <Button
              type="primary"
              size="small"
              style={{ background: '#8c1524', borderColor: '#8c1524' }}
              icon={<SafetyCertificateOutlined />}
              onClick={() => Modal.confirm({
                title: `Xác nhận hợp đồng ${record.contractNumber}?`,
                content: <Descriptions bordered size="small" column={1}>
                  <Descriptions.Item label="Hợp đồng">{record.title || 'Hợp đồng RFQ'}</Descriptions.Item>
                  <Descriptions.Item label="Tổng giá trị">{money(record.totalValue)}</Descriptions.Item>
                  <Descriptions.Item label="Hạn giao">{record.deliveryDeadline || '—'}</Descriptions.Item>
                  <Descriptions.Item label="Điều khoản">{record.termsAndConditions || 'Theo nội dung báo giá và tiến độ đã thống nhất.'}</Descriptions.Item>
                </Descriptions>,
                width: 640,
                okText: 'Xác nhận hợp đồng',
                cancelText: 'Xem lại',
                onOk: () => handleConfirmContract(record),
              })}
            >
              Xác nhận hợp đồng
            </Button>
          )}

          {record.status === 'Active' && (
            <>
              <Button
                type="text"
                size="small"
                icon={<ClockCircleOutlined />}
                onClick={() => handleOpenExtension(record)}
              >
                Xin gia hạn
              </Button>
              <Button
                type="primary"
                size="small"
                style={{ background: '#52c41a', borderColor: '#52c41a' }}
                icon={<FileDoneOutlined />}
                onClick={() => handleRequestFinalAcceptance(record)}
              >
                Yêu cầu nghiệm thu
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <ColonyAdminLayout
      role="Supplier"
      activeKey="nha-cung-cap/quan-ly-hop-dong"
      onNavigate={onNavigate}
      title="Hợp đồng & tiến độ"
      subtitle="Supplier ký và gửi hợp đồng; tại đây supplier có thể xem lại nội dung hợp đồng và tiến độ"
    >
      <Alert
        message="Quy trình hợp đồng dành cho supplier"
        description="Supplier kiểm tra điều khoản, ký và gửi hợp đồng cho customer. Sau khi gửi, supplier có thể xem lại hợp đồng và cập nhật tiến độ thực hiện tại đây."
        type="info"
        showIcon
        style={{ marginBottom: 20 }}
      />

      <Card
        bordered={false}
        style={{ borderRadius: 10 }}
        extra={<Button icon={<ReloadOutlined />} onClick={loadContracts}>Tải lại</Button>}
      >
        <FilterBar search={contractPage.search} onSearchChange={contractPage.setSearch}
          status={contractPage.query.status} onStatusChange={contractPage.setStatus}
          onReset={contractPage.reset} placeholder="Tìm mã hợp đồng"
          statusOptions={Object.keys(statusMap).map((value) => ({ value, label: statusMap[value][1] }))} />
        <Table
          columns={columns}
          dataSource={contracts}
          rowKey="id"
          loading={loading}
          pagination={{ current: contractPage.query.page, pageSize: contractPage.query.pageSize,
            total: contractPage.totalCount, onChange: contractPage.setPage, showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100] }}
          scroll={{ x: 950 }}
        />
      </Card>

      {/* Modal View Milestones */}
      {selectedContract && (
        <Modal
          title={`Tiến Độ Các Mốc Hợp Đồng: ${selectedContract.contractNumber}`}
          open={milestonesModalOpen}
          onCancel={() => setMilestonesModalOpen(false)}
          footer={<Button onClick={() => setMilestonesModalOpen(false)}>Đóng</Button>}
          width={750}
        >
          {contractDetails && (
            <div>
              <Descriptions bordered size="small" column={2} style={{ margin: '16px 0 24px' }}>
                <Descriptions.Item label="Tiêu đề">{contractDetails.title || 'Hợp đồng RFQ'}</Descriptions.Item>
                <Descriptions.Item label="Tổng Giá Trị">
                  <span style={{ fontWeight: 700, color: '#8c1524' }}>{money(contractDetails.totalValue)}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Trạng Thái HĐ">
                  <Tag color={statusMap[contractDetails.status]?.[0] || 'default'}>
                    {statusMap[contractDetails.status]?.[1] || contractDetails.status}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Cọc M1 Escrow">
                  {contractDetails.depositPaidAt ? (
                    <Tag color="success">Đã nhận cọc ({contractDetails.depositPaidAt})</Tag>
                  ) : (
                    <Tag color="orange">Chờ khách cọc</Tag>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Hạn Chót Giao Hàng">{contractDetails.deliveryDeadline || '—'}</Descriptions.Item>
                <Descriptions.Item label="Mã Băm SHA-256">
                  <span style={{ fontSize: 11, fontFamily: 'monospace' }}>
                    {contractDetails.signedDocumentSha256?.substring(0, 16)}...
                  </span>
                </Descriptions.Item>
              </Descriptions>

              {contractDetails.pendingExtension && (
                <Alert
                  type="warning"
                  showIcon
                  icon={<ClockCircleOutlined />}
                  style={{ marginBottom: 16 }}
                  message="Đang chờ khách phản hồi yêu cầu gia hạn"
                  description={`Ngày xin gia hạn: ${contractDetails.pendingExtension.proposedDueDate}. Lý do: ${contractDetails.pendingExtension.reason}`}
                />
              )}

              {contractDetails.activeDispute && (
                <Alert
                  type="error"
                  showIcon
                  icon={<AlertOutlined />}
                  style={{ marginBottom: 16 }}
                  message="Hợp đồng đang có khiếu nại tranh chấp"
                  description={`Lý do: ${contractDetails.activeDispute.disputeReason}. Quỹ ký quỹ đang bị phong tỏa để Admin giải quyết.`}
                />
              )}

              <Steps
                direction="vertical"
                current={contractDetails.milestones?.findIndex((m) => m.status === 'InProgress' || m.status === 'PendingReview')}
                items={contractDetails.milestones?.map((m) => ({
                  title: (
                    <Space>
                      <Text strong>{m.name}</Text>
                      <Tag color={milestoneStatusMap[m.status]?.[0] || 'default'}>
                        {milestoneStatusMap[m.status]?.[1] || m.status}
                      </Tag>
                    </Space>
                  ),
                  description: (
                    <div style={{ marginTop: 6, marginBottom: 16, background: '#fafafa', padding: 12, borderRadius: 6 }}>
                      <div>
                        <span>Số tiền: </span>
                        <strong style={{ color: '#8c1524' }}>{money(m.amount)}</strong>
                        <span> ({m.percentage}%)</span>
                      </div>
                      <div>Hạn chót: <strong>{m.dueDate || '—'}</strong></div>

                      {m.progressNotes && (
                        <div style={{ marginTop: 8 }}>
                          <Text type="secondary">Ghi chú tiến độ đã nộp:</Text>
                          <Paragraph style={{ margin: '4px 0', background: '#fff', padding: 8, borderRadius: 4 }}>
                            {m.progressNotes}
                          </Paragraph>
                        </div>
                      )}

                      {m.evidenceUrls && m.evidenceUrls.length > 0 && (
                        <div style={{ marginTop: 8 }}>
                          <Text type="secondary">Bằng chứng hình ảnh:</Text>
                          <div style={{ marginTop: 6, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            <Image.PreviewGroup>
                              {m.evidenceUrls.map((url, index) => (
                                <Image
                                  key={index}
                                  width={70}
                                  height={70}
                                  src={url}
                                  style={{ objectFit: 'cover', borderRadius: 4 }}
                                  fallback="https://placehold.co/100x100?text=Evidence"
                                />
                              ))}
                            </Image.PreviewGroup>
                          </div>
                        </div>
                      )}

                      {/* Action to submit progress for production/delivery milestones */}
                      {!m.isDeposit && ['InProgress', 'Pending', 'Failed'].includes(m.status) && (
                        <div style={{ marginTop: 10 }}>
                          <Divider style={{ margin: '8px 0' }} />
                          <Button
                            type="primary"
                            size="small"
                            icon={<UploadOutlined />}
                            style={{ background: '#8c1524', borderColor: '#8c1524' }}
                            onClick={() => handleOpenProgressModal(m)}
                          >
                            Báo cáo tiến độ & Nộp ảnh bằng chứng
                          </Button>
                        </div>
                      )}
                    </div>
                  ),
                }))}
              />
            </div>
          )}
        </Modal>
      )}

      {/* Modal Extension */}
      <Modal
        title="Đơn Xin Gia Hạn Tiến Độ Giao Hàng (Feature #17)"
        open={extensionModalOpen}
        onCancel={() => setExtensionModalOpen(false)}
        onOk={handleSubmitExtension}
        confirmLoading={actionLoading}
        okText="Gửi Đơn Xin Gia Hạn"
      >
        <Alert
          message="Khuyến nghị khai báo sự cố sớm"
          description="Khai báo gia hạn trước ngày đến hạn giúp xưởng bánh tránh bị phạt vi phạm hợp đồng (breach -20 điểm uy tín) và duy trì danh hiệu xưởng đạt chuẩn."
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Form form={extensionForm} layout="vertical">
          <Form.Item
            name="proposedDueDate"
            label="Ngày Đề Xuất Hoàn Thành Mới"
            rules={[{ required: true, message: 'Vui lòng chọn ngày đề xuất mới.' }]}
          >
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="reason"
            label="Lý Do Cần Gia Hạn (Tối thiểu 10 ký tự)"
            rules={[
              { required: true, message: 'Vui lòng nhập lý do cụ thể.' },
              { min: 10, message: 'Lý do phải có tối thiểu 10 ký tự.' },
            ]}
          >
            <TextArea rows={3} placeholder="VD: Khâu nhập khẩu khuôn dập logo sơn mài bị trễ 2 ngày tại hải quan..." />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Nộp Tiến Độ Milestone (Feature #16) */}
      <Modal
        title={`Báo Cáo Tiến Độ Mốc: ${selectedMilestone?.name || ''}`}
        open={progressModalOpen}
        onCancel={() => setProgressModalOpen(false)}
        onOk={handleSubmitProgress}
        confirmLoading={actionLoading}
        okText="Nộp Báo Cáo Tiến Độ"
        okButtonProps={{ style: { background: '#8c1524', borderColor: '#8c1524' } }}
      >
        <Form form={progressForm} layout="vertical">
          <Form.Item
            name="progressNotes"
            label="Nội dung tiến độ đã hoàn thành"
            rules={[{ required: true, message: 'Vui lòng mô tả chi tiết tiến độ sản xuất.' }]}
          >
            <TextArea
              rows={3}
              placeholder="VD: Đã làm xong 500 khuôn bánh thập cẩm gà quay, đóng gói màng co và dán tem phụ..."
            />
          </Form.Item>
          <Form.Item
            name="evidenceUrls"
            label="Đường link ảnh chụp bằng chứng thực tế (Mỗi link một dòng)"
          >
            <TextArea
              rows={3}
              placeholder="https://mybucket.com/evidence1.jpg&#10;https://mybucket.com/evidence2.jpg"
            />
          </Form.Item>
        </Form>
        <div style={{ fontSize: 12, color: '#888' }}>
          Khách hàng sẽ đối soát hình ảnh và bấm nghiệm thu để giải phóng thanh toán cho mốc này.
        </div>
      </Modal>
    </ColonyAdminLayout>
  );
}
