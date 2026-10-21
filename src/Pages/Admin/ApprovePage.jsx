import { useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Input,
  Select,
  Radio,
  Modal,
  Descriptions,
  message,
  Typography,
  Alert,
} from 'antd';
import {
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  SearchOutlined,
  FileDoneOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';

const { Text } = Typography;
const { TextArea } = Input;

export default function ApprovePage({ onNavigate }) {
  const [filterStatus, setFilterStatus] = useState('pending');
  const [searchText, setSearchText] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // Initial Mock Applications
  const [applications, setApplications] = useState([
    {
      key: '1',
      id: 'APP-2025-001',
      companyName: 'Công ty TNHH Bánh Mứt Kẹo Thăng Long',
      taxCode: '0108928371',
      representative: 'Nguyễn Văn Hùng',
      phone: '0912345678',
      address: 'KCN Từ Liêm, Bắc Từ Liêm, Hà Nội',
      capacity: '60.000 hộp/vụ',
      certifications: ['ISO 22000:2018', 'HACCP', 'Giấy CN ATTP Cục ATTP'],
      appliedAt: '2025-08-10 14:30',
      status: 'pending',
    },
    {
      key: '2',
      id: 'APP-2025-002',
      companyName: 'Xưởng Bánh Nghệ Nhân Gia Truyền Ánh Nguyệt',
      taxCode: '0304567891',
      representative: 'Trần Thị Thu Trang',
      phone: '0987654321',
      address: '24 Đường Cách Mạng Tháng 8, Quận 3, TP. Hồ Chí Minh',
      capacity: '25.000 hộp/vụ',
      certifications: ['Giấy CN Cơ Sở Đủ Điều Kiện ATTP', 'OCOP 4 Sao'],
      appliedAt: '2025-08-11 09:15',
      status: 'pending',
    },
    {
      key: '3',
      id: 'APP-2025-003',
      companyName: 'Hợp Tác Xã Nông Sản & Bánh Cổ Truyền Hội An',
      taxCode: '4001234567',
      representative: 'Lê Hoàng Nam',
      phone: '0905123456',
      address: '15 Trần Phú, TP. Hội An, Quảng Nam',
      capacity: '18.000 hộp/vụ',
      certifications: ['ISO 9001:2015', 'ATTP Tỉnh Quảng Nam'],
      appliedAt: '2025-08-11 11:20',
      status: 'pending',
    },
    {
      key: '4',
      id: 'APP-2025-004',
      companyName: 'Công ty Cổ Phần Thực Phẩm Quốc Tế Hải Hà',
      taxCode: '0200889911',
      representative: 'Phạm Đức Minh',
      phone: '0936789123',
      address: 'Khu Đô Thị Nomura, Hải Phòng',
      capacity: '80.000 hộp/vụ',
      certifications: ['FSSC 22000', 'HALAL', 'ISO 22000'],
      appliedAt: '2025-08-11 16:45',
      status: 'pending',
    },
    {
      key: '5',
      id: 'APP-2025-005',
      companyName: 'Xưởng Bánh Tràng An Nghệ Nhân',
      taxCode: '0101122334',
      representative: 'Trần Đức Thắng',
      phone: '0913556677',
      address: 'Hoàng Mai, Hà Nội',
      capacity: '50.000 hộp/vụ',
      certifications: ['ISO 22000', 'HACCP'],
      appliedAt: '2025-08-01 10:00',
      status: 'approved',
    },
  ]);

  const handleApprove = (record) => {
    setApplications((prev) =>
      prev.map((item) => (item.key === record.key ? { ...item, status: 'approved' } : item))
    );
    message.success(`Đã phê duyệt thành công hồ sơ của "${record.companyName}"! Huy hiệu Verified đã được kích hoạt.`);
    setDetailModalOpen(false);
  };

  const handleOpenReject = (record) => {
    setSelectedRecord(record);
    setRejectReason('');
    setRejectModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) {
      message.error('Vui lòng nhập lý do từ chối để thông báo cho nhà cung cấp.');
      return;
    }
    setApplications((prev) =>
      prev.map((item) => (item.key === selectedRecord.key ? { ...item, status: 'rejected' } : item))
    );
    message.warning(`Đã từ chối hồ sơ "${selectedRecord.companyName}". Email giải trình đã được gửi.`);
    setRejectModalOpen(false);
    setDetailModalOpen(false);
  };

  const handleRevoke = (record) => {
    Modal.confirm({
      title: 'Xác nhận thu hồi xác minh?',
      icon: <ExclamationCircleOutlined style={{ color: '#cf1322' }} />,
      content: `Bạn có chắc muốn thu hồi xác minh của "${record.companyName}"? Gian hàng của NCC này sẽ bị tạm ẩn và các gói thầu RFQ sẽ bị tạm dừng.`,
      okText: 'Thu Hồi Ngay',
      okType: 'danger',
      cancelText: 'Hủy Bỏ',
      onOk: () => {
        setApplications((prev) =>
          prev.map((item) => (item.key === record.key ? { ...item, status: 'revoked' } : item))
        );
        message.info(`Đã thu hồi giấy phép xác minh của "${record.companyName}".`);
      },
    });
  };

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const matchStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchSearch =
      app.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
      app.taxCode.includes(searchText) ||
      app.representative.toLowerCase().includes(searchText.toLowerCase());
    return matchStatus && matchSearch;
  });

  const columns = [
    {
      title: 'Mã Hồ Sơ',
      dataIndex: 'id',
      key: 'id',
      width: 130,
      render: (id) => <span style={{ fontWeight: 600, color: '#1677ff' }}>{id}</span>,
    },
    {
      title: 'Doanh Nghiệp / MST',
      dataIndex: 'companyName',
      key: 'companyName',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1f1f1f' }}>{text}</div>
          <div style={{ fontSize: 12, color: '#666' }}>MST: <span style={{ fontFamily: 'monospace' }}>{record.taxCode}</span></div>
          <div style={{ fontSize: 11, color: '#999' }}>Đại diện: {record.representative} ({record.phone})</div>
        </div>
      ),
    },
    {
      title: 'Công Suất Vụ',
      dataIndex: 'capacity',
      key: 'capacity',
      render: (c) => <Tag color="blue">{c}</Tag>,
    },
    {
      title: 'Chứng Nhận Pháp Lý & ATTP',
      dataIndex: 'certifications',
      key: 'certifications',
      render: (certs) => (
        <Space size={[4, 4]} wrap>
          {certs.map((c, idx) => (
            <Tag key={idx} color="green" icon={<SafetyCertificateOutlined />}>
              {c}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        if (status === 'pending') return <Tag color="warning">Chờ thẩm định</Tag>;
        if (status === 'approved') return <Tag color="success">✓ Đã phê duyệt</Tag>;
        if (status === 'rejected') return <Tag color="error">Bị từ chối</Tag>;
        if (status === 'revoked') return <Tag color="default">Thu hồi xác minh</Tag>;
        return <Tag>{status}</Tag>;
      },
    },
    {
      title: 'Thao Tác',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedRecord(record);
              setDetailModalOpen(true);
            }}
          >
            Hồ sơ
          </Button>
          {record.status === 'pending' && (
            <>
              <Button
                type="primary"
                size="small"
                style={{ background: '#2e7d32', borderColor: '#2e7d32' }}
                onClick={() => handleApprove(record)}
              >
                Duyệt
              </Button>
              <Button
                type="text"
                danger
                size="small"
                onClick={() => handleOpenReject(record)}
              >
                Từ chối
              </Button>
            </>
          )}
          {record.status === 'approved' && (
            <Button
              type="text"
              danger
              size="small"
              onClick={() => handleRevoke(record)}
            >
              Thu hồi
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <ColonyAdminLayout
      role="Admin"
      activeKey="admin/phe-duyet"
      onNavigate={onNavigate}
      title="Hàng Đợi Thẩm Định & Phê Duyệt Hồ Sơ Nhà Cung Cấp"
      subtitle="Thẩm tra năng lực sản xuất, pháp lý vệ sinh an toàn thực phẩm và điều kiện kết nối sàn B2B MoonMarket"
      extra={
        <Radio.Group
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value="pending">Chờ Thẩm Định (4)</Radio.Button>
          <Radio.Button value="approved">Đã Duyệt</Radio.Button>
          <Radio.Button value="rejected">Bị Từ Chối</Radio.Button>
          <Radio.Button value="all">Tất Cả</Radio.Button>
        </Radio.Group>
      }
    >
      <Card bordered={false} style={{ borderRadius: 10, marginBottom: 16 }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }} wrap>
          <Input
            placeholder="Tìm theo MST, Tên xưởng bánh, Người đại diện..."
            prefix={<SearchOutlined style={{ color: '#aaa' }} />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 340 }}
            allowClear
          />
          <Space>
            <Select
              defaultValue="all"
              style={{ width: 200 }}
              options={[
                { value: 'all', label: 'Tất cả Tỉnh / Thành' },
                { value: 'hn', label: 'Hà Nội & Miền Bắc' },
                { value: 'hcm', label: 'TP. Hồ Chí Minh & Miền Nam' },
                { value: 'dn', label: 'Đà Nẵng & Miền Trung' },
              ]}
            />
            <Select
              defaultValue="all"
              style={{ width: 220 }}
              options={[
                { value: 'all', label: 'Quy mô: Mọi hạn mức' },
                { value: 'large', label: 'Quy mô lớn > 50.000 hộp/vụ' },
                { value: 'medium', label: 'Xưởng nghệ nhân < 30.000 hộp' },
              ]}
            />
          </Space>
        </Space>
      </Card>

      <Card bordered={false} style={{ borderRadius: 10 }}>
        <Table
          columns={columns}
          dataSource={filteredApps}
          pagination={{ pageSize: 6 }}
        />
      </Card>

      {/* Modal View Application Details */}
      {selectedRecord && (
        <Modal
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FileDoneOutlined style={{ color: '#8c1524' }} />
              <span>Hồ Sơ Doanh Nghiệp: {selectedRecord.companyName}</span>
            </div>
          }
          open={detailModalOpen}
          onCancel={() => setDetailModalOpen(false)}
          width={700}
          footer={
            selectedRecord.status === 'pending' ? (
              <Space>
                <Button onClick={() => setDetailModalOpen(false)}>Đóng</Button>
                <Button danger onClick={() => handleOpenReject(selectedRecord)}>
                  Từ Chối Hồ Sơ
                </Button>
                <Button
                  type="primary"
                  style={{ background: '#2e7d32', borderColor: '#2e7d32' }}
                  onClick={() => handleApprove(selectedRecord)}
                >
                  Phê Duyệt & Cấp Badge Verified
                </Button>
              </Space>
            ) : (
              <Button type="primary" onClick={() => setDetailModalOpen(false)}>
                Đóng
              </Button>
            )
          }
        >
          <Descriptions bordered column={2} size="small" style={{ marginTop: 16 }}>
            <Descriptions.Item label="Mã Đăng Ký">{selectedRecord.id}</Descriptions.Item>
            <Descriptions.Item label="Mã Số Thuế">{selectedRecord.taxCode}</Descriptions.Item>
            <Descriptions.Item label="Người Đại Diện">{selectedRecord.representative}</Descriptions.Item>
            <Descriptions.Item label="Số Điện Thoại">{selectedRecord.phone}</Descriptions.Item>
            <Descriptions.Item label="Địa Chỉ Xưởng" span={2}>{selectedRecord.address}</Descriptions.Item>
            <Descriptions.Item label="Công Suất">{selectedRecord.capacity}</Descriptions.Item>
            <Descriptions.Item label="Thời Điểm Gửi">{selectedRecord.appliedAt}</Descriptions.Item>
            <Descriptions.Item label="Chứng Nhận Đính Kèm" span={2}>
              <Space direction="vertical" size={2}>
                {selectedRecord.certifications.map((c, i) => (
                  <Text key={i} type="success">✓ {c} (Đã đối chiếu Cục ATTP)</Text>
                ))}
              </Space>
            </Descriptions.Item>
          </Descriptions>

          <Alert
            message="Quy trình thẩm tra theo tiêu chuẩn ISO 22000"
            description="Tài khoản Supplier sau khi phê duyệt sẽ tự động kích hoạt tính năng Mở Gian Hàng B2B và được phép tham gia đấu thầu RFQ từ các tập đoàn lớn."
            type="info"
            showIcon
            style={{ marginTop: 16 }}
          />
        </Modal>
      )}

      {/* Modal Reject Reason */}
      <Modal
        title="Lý Do Từ Chối Phê Duyệt Hồ Sơ"
        open={rejectModalOpen}
        onCancel={() => setRejectModalOpen(false)}
        onOk={handleConfirmReject}
        okText="Gửi Thông Báo Từ Chối"
        okType="danger"
        cancelText="Hủy Bỏ"
      >
        <p style={{ color: '#666' }}>
          Nhập lý do chưa đạt chuẩn (thiếu chứng chỉ ATTP, sai lệch MST, ảnh xưởng mờ...) để nhà cung cấp bổ sung hồ sơ:
        </p>
        <TextArea
          rows={4}
          placeholder="Nhập lý do từ chối cụ thể..."
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        />
      </Modal>
    </ColonyAdminLayout>
  );
}
