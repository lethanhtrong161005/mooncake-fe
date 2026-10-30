import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Input,
  Select,
  Tabs,
  Modal,
  Descriptions,
  message,
  Typography,
  Alert,
  Form,
  InputNumber,
  Radio,
} from 'antd';
import {
  AuditOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  SearchOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import { adminService } from '../../services/adminService';
import { contractService } from '../../services/contractService';

const { Text } = Typography;
const { TextArea } = Input;

export default function TradingOperating({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('disputes');
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [resolveAction, setResolveAction] = useState('penalty');
  const [penaltyPoints, setPenaltyPoints] = useState(20);
  const [resolutionNote, setResolutionNote] = useState('');
  const [loading, setLoading] = useState(false);

  const [disputes, setDisputes] = useState([]);
  const [contracts, setContracts] = useState([]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [disputeData, contractData] = await Promise.allSettled([
        adminService.getDisputes(),
        contractService.listMine(),
      ]);
      if (disputeData.status === 'fulfilled' && disputeData.value) {
        const raw = disputeData.value;
        const list = Array.isArray(raw) ? raw : (raw.items || []);
        setDisputes(list.map((d, idx) => ({
          key: d.id || `${idx}`,
          id: d.id,
          disputeId: d.disputeId || (d.id ? `DISP-${d.id.slice(0, 8)}` : `DISP-${idx + 1}`),
          contractNo: d.contractNumber || d.contractNo || 'HĐ-B2B',
          buyer: d.customerName || d.buyer || 'Bên mua',
          seller: d.supplierName || d.seller || 'Bên bán',
          reason: d.disputeReason || d.reason || 'Tranh chấp hợp đồng',
          escrowAmount: typeof d.heldEscrowAmount === 'number' ? `${d.heldEscrowAmount.toLocaleString('vi-VN')} ₫` : d.escrowAmount || '0 ₫',
          status: (d.status || 'pending').toLowerCase(),
          severity: d.severity || 'high',
          createdAt: d.createdAt || d.raisedAt || new Date().toISOString(),
        })));
      }
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
    } catch (err) {
      console.warn('TradingOperating load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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

      setDisputes((prev) =>
        prev.map((d) => (d.key === selectedDispute.key ? { ...d, status: 'resolved' } : d))
      );

      message.success(
        `Đã giải quyết xong tranh chấp ${selectedDispute.disputeId}! Áp dụng chế tài: Trừ ${penaltyPoints} điểm uy tín NCC và giải ngân Escrow bảo vệ người mua.`
      );
      setDisputeModalOpen(false);
    } catch (err) {
      message.error(err.message || 'Không thể cập nhật phân xử.');
    }
  };

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

  return (
    <ColonyAdminLayout
      role="Admin"
      activeKey="admin/van-hanh-giao-dich"
      onNavigate={onNavigate}
      title="Vận Hành Giao Dịch, Hợp Đồng & Phân Xử Tranh Chấp"
      subtitle="Giám sát dòng chảy đơn hàng B2B, xử lý vi phạm hợp đồng và bảo vệ nguồn quỹ Escrow sàn"
    >
      <Card bordered={false} style={{ borderRadius: 10 }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'disputes',
              label: (
                <span>
                  ⚖️ Hàng Đợi Tranh Chấp Cần Phân Xử{' '}
                  {disputes.length > 0 && (
                    <Tag color="red" style={{ marginLeft: 4 }}>
                      {disputes.length}
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
                    pagination={false}
                    loading={loading}
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

      {/* Modal Dispute Resolution */}
      {selectedDispute && (
        <Modal
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#cf1322' }}>
              <FileProtectOutlined />
              <span>Phân Xử Tranh Chấp: {selectedDispute.disputeId}</span>
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
    </ColonyAdminLayout>
  );
}
