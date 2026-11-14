import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
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
  InfoCircleOutlined,
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
const errorMessage = (error) => (
  error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.'
);

const statusMap = {
  Draft: ['default', 'Bản nháp'],
  PendingSignature: ['warning', 'Chờ xưởng xác nhận'],
  Signed: ['processing', 'Xưởng đã xác nhận'],
  PendingDeposit: ['processing', 'Chờ khách đặt cọc'],
  Active: ['success', 'Đang hiệu lực'],
  CompletedOnTime: ['success', 'Hoàn thành đúng hạn (+10đ)'],
  CompletedLate: ['purple', 'Hoàn thành trễ hạn (+3đ)'],
  Breached: ['error', 'Vi phạm hợp đồng (-20đ)'],
  Disputed: ['error', 'Đang tranh chấp'],
  Cancelled: ['default', 'Đã hủy'],
};

const milestoneStatusMap = {
  Pending: ['default', 'Chưa đến hạn'],
  AwaitingPayment: ['warning', 'Khách đang thanh toán'],
  Paid: ['success', 'Đã nhận tiền'],
  InProgress: ['processing', 'Đang sản xuất'],
  PendingReview: ['orange', 'Đang chờ khách duyệt'],
  CompletedOnTime: ['success', 'Hoàn thành đúng hạn'],
  CompletedLate: ['purple', 'Hoàn thành trễ hạn'],
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

  const [milestonesModalOpen, setMilestonesModalOpen] = useState(false);
  const [extensionModalOpen, setExtensionModalOpen] = useState(false);
  const [extensionForm] = Form.useForm();
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [progressForm] = Form.useForm();

  const loadContracts = contractPage.refresh;
  useEffect(() => {
    if (contractPage.error) message.error(errorMessage(contractPage.error));
  }, [contractPage.error]);

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
      message.success(`Đã ký và gửi hợp đồng ${record.contractNumber} cho khách hàng xem lại.`);
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
        urls,
      );
      message.success(
        `Đã nộp bằng chứng tiến độ mốc "${selectedMilestone.name}". Đang chờ khách hàng duyệt.`,
      );
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
      message.success('Đã gửi đơn xin gia hạn tiến độ tới Bên Mua và BQL sàn.');
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
      message.success('Đã gửi yêu cầu nghiệm thu dứt điểm 100% lô hàng tới khách hàng.');
      await loadContracts();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    {
      title: 'Số hợp đồng',
      dataIndex: 'contractNumber',
      key: 'contractNumber',
      width: 175,
      render: (no) => (
        <span className="font-mono text-sm font-semibold text-[#7d1322]">{no}</span>
      ),
    },
    {
      title: 'Tiêu đề / ghi chú',
      dataIndex: 'title',
      key: 'title',
      render: (t) => (
        <span className="font-medium text-[#231a18]">{t || 'Hợp đồng đơn hàng RFQ'}</span>
      ),
    },
    {
      title: 'Tổng giá trị',
      dataIndex: 'totalValue',
      key: 'totalValue',
      align: 'right',
      width: 150,
      render: (amt) => (
        <span className="font-semibold tabular-nums text-[#7d1322] whitespace-nowrap">
          {money(amt)}
        </span>
      ),
    },
    {
      title: 'Hạn giao hàng',
      dataIndex: 'deliveryDeadline',
      key: 'deliveryDeadline',
      width: 120,
      render: (d) => (
        <span className="text-xs tabular-nums text-[#6c625e] whitespace-nowrap">{d || '—'}</span>
      ),
    },
    {
      title: 'Chữ ký xưởng',
      key: 'signature',
      render: (_, r) => (
        r.signedBySupplierAt
          ? <Tag color="success">Đã ký và gửi</Tag>
          : <Tag color="warning">Cần ký hợp đồng</Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (st) => (
        <Tag color={statusMap[st]?.[0] || 'default'}>
          {statusMap[st]?.[1] || st}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'right',
      render: (_, record) => (
        <Space size="small" wrap>
          <Button
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
              style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
              icon={<SafetyCertificateOutlined />}
              onClick={() => Modal.confirm({
                title: `Xác nhận hợp đồng ${record.contractNumber}?`,
                content: (
                  <Descriptions bordered size="small" column={1}>
                    <Descriptions.Item label="Hợp đồng">
                      {record.title || 'Hợp đồng RFQ'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tổng giá trị">
                      {money(record.totalValue)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Hạn giao">
                      {record.deliveryDeadline || '—'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Điều khoản">
                      {record.termsAndConditions || 'Theo nội dung báo giá và tiến độ đã thống nhất.'}
                    </Descriptions.Item>
                  </Descriptions>
                ),
                width: 640,
                okText: 'Xác nhận hợp đồng',
                cancelText: 'Xem lại',
                okButtonProps: { style: { backgroundColor: '#7d1322', borderColor: '#7d1322' } },
                onOk: () => handleConfirmContract(record),
              })}
            >
              Xác nhận hợp đồng
            </Button>
          )}

          {record.status === 'Active' && (
            <>
              <Button
                size="small"
                icon={<ClockCircleOutlined />}
                onClick={() => handleOpenExtension(record)}
              >
                Xin gia hạn
              </Button>
              <Button
                type="primary"
                size="small"
                style={{ backgroundColor: '#2d5a43', borderColor: '#2d5a43' }}
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
      subtitle="Kiểm tra điều khoản, ký gửi hợp đồng điện tử và báo cáo tiến độ từng mốc nghiệm thu."
      extra={
        <Button icon={<ReloadOutlined />} onClick={loadContracts} loading={loading}>
          Tải lại
        </Button>
      }
    >
      <div className="space-y-5">
        <div className="flex items-center gap-2.5 rounded-xl border border-[#e7dccf] bg-[#fdfbf8] px-4 py-3 text-xs text-[#6c625e]">
          <InfoCircleOutlined className="shrink-0 text-sm text-[#9a6b16]" />
          <span>
            Xưởng kiểm tra điều khoản, ký gửi hợp đồng cho khách hàng, sau đó cập nhật bằng chứng hoàn thành theo từng mốc thanh toán.
          </span>
        </div>

        <section
          aria-label="Danh sách hợp đồng và tiến độ"
          className="rounded-2xl border border-[#e4dcd3] bg-white p-4 sm:p-6"
        >
          <div className="rounded-xl border border-[#ebe3da] bg-[#faf7f2] p-3.5">
            <FilterBar
              search={contractPage.search}
              onSearchChange={contractPage.setSearch}
              status={contractPage.query.status}
              onStatusChange={contractPage.setStatus}
              onReset={contractPage.reset}
              placeholder="Tìm mã hợp đồng"
              statusOptions={Object.keys(statusMap).map((value) => ({
                value,
                label: statusMap[value][1],
              }))}
            />
          </div>

          <div className="mt-4 overflow-x-auto">
            <Table
              columns={columns}
              dataSource={contracts}
              rowKey="id"
              loading={loading}
              size="middle"
              pagination={{
                current: contractPage.query.page,
                pageSize: contractPage.query.pageSize,
                total: contractPage.totalCount,
                onChange: contractPage.setPage,
                showSizeChanger: true,
                pageSizeOptions: [10, 20, 50, 100],
              }}
              scroll={{ x: 950 }}
            />
          </div>
        </section>
      </div>

      {selectedContract && (
        <Modal
          title={
            <span className="font-serif text-lg font-semibold text-[#231a18]">
              {`Tiến Độ Các Mốc Hợp Đồng: ${selectedContract.contractNumber}`}
            </span>
          }
          open={milestonesModalOpen}
          onCancel={() => setMilestonesModalOpen(false)}
          footer={<Button onClick={() => setMilestonesModalOpen(false)}>Đóng</Button>}
          width={760}
          destroyOnHidden
        >
          {contractDetails && (
            <div className="space-y-5 pt-2">
              <Descriptions bordered size="small" column={{ xs: 1, sm: 2 }}>
                <Descriptions.Item label="Tiêu đề">
                  {contractDetails.title || 'Hợp đồng RFQ'}
                </Descriptions.Item>
                <Descriptions.Item label="Tổng giá trị">
                  <span className="font-semibold tabular-nums text-[#7d1322]">
                    {money(contractDetails.totalValue)}
                  </span>
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái HĐ">
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
                <Descriptions.Item label="Hạn chót giao hàng">
                  <span className="tabular-nums">{contractDetails.deliveryDeadline || '—'}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Mã băm SHA-256">
                  <span className="font-mono text-xs text-[#6c625e]">
                    {contractDetails.signedDocumentSha256?.substring(0, 16) || '—'}...
                  </span>
                </Descriptions.Item>
              </Descriptions>

              {contractDetails.pendingExtension && (
                <Alert
                  type="warning"
                  showIcon
                  icon={<ClockCircleOutlined />}
                  title="Đang chờ khách phản hồi yêu cầu gia hạn"
                  description={`Ngày xin gia hạn: ${contractDetails.pendingExtension.proposedDueDate}. Lý do: ${contractDetails.pendingExtension.reason}`}
                />
              )}

              {contractDetails.activeDispute && (
                <Alert
                  type="error"
                  showIcon
                  icon={<AlertOutlined />}
                  title="Hợp đồng đang có khiếu nại tranh chấp"
                  description={`Lý do: ${contractDetails.activeDispute.disputeReason}. Quỹ ký quỹ đang bị tạm giữ để quản trị viên giải quyết.`}
                />
              )}

              <Steps
                direction="vertical"
                current={contractDetails.milestones?.findIndex(
                  (m) => m.status === 'InProgress' || m.status === 'PendingReview',
                )}
                items={contractDetails.milestones?.map((m) => ({
                  title: (
                    <Space>
                      <Text strong className="text-[#231a18]">{m.name}</Text>
                      <Tag color={milestoneStatusMap[m.status]?.[0] || 'default'}>
                        {milestoneStatusMap[m.status]?.[1] || m.status}
                      </Tag>
                    </Space>
                  ),
                  description: (
                    <div className="mb-4 mt-1.5 space-y-2 rounded-xl border border-[#e4dcd3] bg-[#faf7f2] p-3.5">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                        <span>
                          Số tiền:{' '}
                          <strong className="tabular-nums text-[#7d1322]">{money(m.amount)}</strong>{' '}
                          <span className="text-xs text-[#6c625e]">({m.percentage}%)</span>
                        </span>
                        <span className="text-xs tabular-nums text-[#6c625e]">
                          Hạn chót: <strong className="text-[#231a18]">{m.dueDate || '—'}</strong>
                        </span>
                      </div>

                      {m.progressNotes && (
                        <div>
                          <Text type="secondary" className="text-xs">Ghi chú tiến độ đã nộp</Text>
                          <Paragraph className="!my-1 rounded-lg border border-[#e4dcd3] bg-white p-2.5 text-sm">
                            {m.progressNotes}
                          </Paragraph>
                        </div>
                      )}

                      {m.evidenceUrls && m.evidenceUrls.length > 0 && (
                        <div>
                          <Text type="secondary" className="text-xs">Bằng chứng hình ảnh</Text>
                          <div className="mt-1.5 flex flex-wrap gap-2">
                            <Image.PreviewGroup>
                              {m.evidenceUrls.map((url, index) => (
                                <Image
                                  key={index}
                                  width={72}
                                  height={72}
                                  src={url}
                                  style={{ objectFit: 'cover', borderRadius: 8 }}
                                  fallback="https://placehold.co/100x100?text=Evidence"
                                />
                              ))}
                            </Image.PreviewGroup>
                          </div>
                        </div>
                      )}

                      {!m.isDeposit && ['InProgress', 'Pending', 'Failed'].includes(m.status) && (
                        <div className="pt-1">
                          <Divider className="!my-2" />
                          <Button
                            type="primary"
                            size="small"
                            icon={<UploadOutlined />}
                            style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
                            onClick={() => handleOpenProgressModal(m)}
                          >
                            Báo cáo tiến độ &amp; Nộp ảnh bằng chứng
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

      <Modal
        title={
          <span className="font-serif text-lg font-semibold text-[#231a18]">
            Đơn xin gia hạn tiến độ giao hàng
          </span>
        }
        open={extensionModalOpen}
        onCancel={() => setExtensionModalOpen(false)}
        onOk={handleSubmitExtension}
        confirmLoading={actionLoading}
        okText="Gửi đơn xin gia hạn"
        cancelText="Hủy"
        okButtonProps={{ style: { backgroundColor: '#7d1322', borderColor: '#7d1322' } }}
        destroyOnHidden
      >
        <Alert
          title="Khuyến nghị khai báo sớm"
          description="Khai báo gia hạn trước ngày đến hạn giúp tránh vi phạm hợp đồng (-20 điểm uy tín) và giữ vững chỉ số xưởng đạt chuẩn."
          type="warning"
          showIcon
          className="mb-4"
        />
        <Form form={extensionForm} layout="vertical">
          <Form.Item
            name="proposedDueDate"
            label="Ngày đề xuất hoàn thành mới"
            rules={[{ required: true, message: 'Vui lòng chọn ngày đề xuất mới.' }]}
          >
            <DatePicker className="w-full" format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="reason"
            label="Lý do gia hạn (tối thiểu 10 ký tự)"
            rules={[
              { required: true, message: 'Vui lòng nhập lý do cụ thể.' },
              { min: 10, message: 'Lý do phải có tối thiểu 10 ký tự.' },
            ]}
          >
            <TextArea
              rows={3}
              placeholder="Ví dụ: Khâu nhập khuôn dập logo sơn mài bị trễ 2 ngày..."
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={
          <span className="font-serif text-lg font-semibold text-[#231a18]">
            {`Báo Cáo Tiến Độ Mốc: ${selectedMilestone?.name || ''}`}
          </span>
        }
        open={progressModalOpen}
        onCancel={() => setProgressModalOpen(false)}
        onOk={handleSubmitProgress}
        confirmLoading={actionLoading}
        okText="Nộp Báo Cáo Tiến Độ"
        cancelText="Hủy"
        okButtonProps={{ style: { backgroundColor: '#7d1322', borderColor: '#7d1322' } }}
        destroyOnHidden
      >
        <Form form={progressForm} layout="vertical">
          <Form.Item
            name="progressNotes"
            label="Nội dung tiến độ đã hoàn thành"
            rules={[{ required: true, message: 'Vui lòng mô tả chi tiết tiến độ sản xuất.' }]}
          >
            <TextArea
              rows={3}
              placeholder="VD: Đã hoàn thành nướng 500 khuôn bánh thập cẩm, đóng hộp và dán tem..."
            />
          </Form.Item>
          <Form.Item
            name="evidenceUrls"
            label="Đường link ảnh chụp bằng chứng (mỗi link một dòng)"
          >
            <TextArea
              rows={3}
              placeholder="https://mybucket.com/evidence1.jpg&#10;https://mybucket.com/evidence2.jpg"
            />
          </Form.Item>
        </Form>
        <div className="text-xs text-[#6c625e]">
          Khách hàng sẽ đối soát hình ảnh và bấm nghiệm thu để giải phóng thanh toán cho mốc này.
        </div>
      </Modal>
    </ColonyAdminLayout>
  );
}
