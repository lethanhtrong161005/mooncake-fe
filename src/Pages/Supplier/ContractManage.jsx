import { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Tag,
  Space,
  Modal,
  Steps,
  Form,
  Input,
  DatePicker,
  Descriptions,
  message,
  Typography,
  Alert,
} from 'antd';
import {
  FileTextOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';

const { Text } = Typography;
const { TextArea } = Input;

export default function ContractManage({ onNavigate }) {
  const [selectedContract, setSelectedContract] = useState(null);
  const [contractModalOpen, setContractModalOpen] = useState(false);
  const [extensionModalOpen, setExtensionModalOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  // Contracts Mock Data
  const [contracts, setContracts] = useState([
    {
      key: '1',
      contractNo: 'HD-2025-08910',
      buyerCompany: 'Tập đoàn Vingroup',
      totalAmount: '310.000.000 ₫',
      status: 'active', // 'pending_signature' | 'pending_deposit' | 'active' | 'completed'
      signedBuyer: true,
      signedSeller: true,
      depositReceived: true,
      milestones: [
        { name: 'M1: Đặt cọc kích hoạt HĐ (30%)', amount: '93.000.000 ₫', dueDate: '2025-08-14', status: 'completed' },
        { name: 'M2: Giao hàng đợt 1 (50%)', amount: '155.000.000 ₫', dueDate: '2025-08-25', status: 'in_progress' },
        { name: 'M3: Nghiệm thu & Thanh toán dứt điểm (20%)', amount: '62.000.000 ₫', dueDate: '2025-09-02', status: 'pending' },
      ],
    },
    {
      key: '2',
      contractNo: 'HD-2025-08880',
      buyerCompany: 'Công ty Cổ phần Phần Mềm FPT',
      totalAmount: '500.000.000 ₫',
      status: 'pending_signature',
      signedBuyer: true,
      signedSeller: false,
      depositReceived: false,
      milestones: [
        { name: 'M1: Đặt cọc kích hoạt HĐ (30%)', amount: '150.000.000 ₫', dueDate: '2025-08-16', status: 'pending' },
        { name: 'M2: Giao hàng toàn bộ (70%)', amount: '350.000.000 ₫', dueDate: '2025-09-02', status: 'pending' },
      ],
    },
  ]);

  const handleOpenSign = (record) => {
    setSelectedContract(record);
    setOtpCode('');
    setOtpModalOpen(true);
  };

  const handleConfirmOtpSign = () => {
    if (otpCode.length < 6) {
      message.error('Vui lòng nhập mã OTP xác thực 6 chữ số gửi về điện thoại đại diện xưởng.');
      return;
    }

    setContracts((prev) =>
      prev.map((c) =>
        c.key === selectedContract.key
          ? {
              ...c,
              signedSeller: true,
              status: 'pending_deposit',
            }
          : c
      )
    );

    message.success(
      `Đã ký số thành công Hợp đồng kinh tế ${selectedContract.contractNo}! Đã chuyển yêu cầu đặt cọc M1 tới Khách hàng.`
    );
    setOtpModalOpen(false);
  };

  const handleOpenExtension = (record) => {
    setSelectedContract(record);
    setExtensionModalOpen(true);
  };

  const handleConfirmExtension = () => {
    message.success('Đã gửi đơn xin gia hạn tiến độ tới Bên Mua và BQL Sàn MoonMarket.');
    setExtensionModalOpen(false);
  };

  const columns = [
    {
      title: 'Số Hợp Đồng',
      dataIndex: 'contractNo',
      key: 'contractNo',
      width: 150,
      render: (no) => <span style={{ fontWeight: 600, color: '#1677ff' }}>{no}</span>,
    },
    {
      title: 'Đối Tác Bên Mua (Customer)',
      dataIndex: 'buyerCompany',
      key: 'buyerCompany',
      render: (c) => <strong>{c}</strong>,
    },
    {
      title: 'Tổng Giá Trị Hợp Đồng',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: 'right',
      render: (amt) => <span style={{ fontWeight: 700, color: '#8c1524' }}>{amt}</span>,
    },
    {
      title: 'Ký Điện Tử (OTP)',
      key: 'signature',
      render: (_, r) => (
        <Space direction="vertical" size={2}>
          <span style={{ fontSize: 12 }}>
            Mua: {r.signedBuyer ? <Tag color="success">✓ Đã ký</Tag> : <Tag>Chưa ký</Tag>}
          </span>
          <span style={{ fontSize: 12 }}>
            Bán: {r.signedSeller ? <Tag color="success">✓ Đã ký</Tag> : <Tag color="error">Chờ xưởng ký</Tag>}
          </span>
        </Space>
      ),
    },
    {
      title: 'Trạng Thái Hợp Đồng',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        if (status === 'pending_signature') return <Tag color="warning">Chờ 2 bên ký</Tag>;
        if (status === 'pending_deposit') return <Tag color="orange">Chờ khách cọc M1</Tag>;
        if (status === 'active') return <Tag color="success">Đang hiệu lực (Active)</Tag>;
        return <Tag color="default">Hoàn thành</Tag>;
      },
    },
    {
      title: 'Thao Tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<FileTextOutlined />}
            onClick={() => {
              setSelectedContract(record);
              setContractModalOpen(true);
            }}
          >
            Tiến độ Mốc
          </Button>
          {!record.signedSeller && (
            <Button
              type="primary"
              size="small"
              style={{ background: '#8c1524', borderColor: '#8c1524' }}
              onClick={() => handleOpenSign(record)}
            >
              Ký Số OTP
            </Button>
          )}
          {record.status === 'active' && (
            <Button
              type="text"
              size="small"
              icon={<ClockCircleOutlined />}
              onClick={() => handleOpenExtension(record)}
            >
              Xin gia hạn
            </Button>
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
      title="Quản Lý Hợp Đồng Điện Tử & Mốc Tiến Độ (Milestones)"
      subtitle="Ký kết số qua mã OTP, theo dõi điều kiện đặt cọc M1 và cập nhật tiến độ bàn giao"
    >
      <Alert
        message="Điều kiện Kích Hoạt Hợp Đồng (Mandatory M1 Deposit)"
        description="Sau khi hai bên ký điện tử, Hợp đồng chuyển sang trạng thái pending_deposit. Hợp đồng CHỈ chuyển sang Active khi Bên Mua hoàn tất đặt cọc 30% mốc M1 vào tài khoản bảo chứng Escrow."
        type="info"
        showIcon
        style={{ marginBottom: 20 }}
      />

      <Card bordered={false} style={{ borderRadius: 10 }}>
        <Table columns={columns} dataSource={contracts} pagination={false} />
      </Card>

      {/* Modal View Milestones */}
      {selectedContract && (
        <Modal
          title={`Tiến Độ Các Mốc Hợp Đồng: ${selectedContract.contractNo}`}
          open={contractModalOpen}
          onCancel={() => setContractModalOpen(false)}
          footer={<Button onClick={() => setContractModalOpen(false)}>Đóng</Button>}
          width={700}
        >
          <Descriptions bordered size="small" column={2} style={{ margin: '16px 0 24px' }}>
            <Descriptions.Item label="Bên Mua">{selectedContract.buyerCompany}</Descriptions.Item>
            <Descriptions.Item label="Tổng Giá Trị">{selectedContract.totalAmount}</Descriptions.Item>
            <Descriptions.Item label="Trạng Thái HĐ">
              <Tag color={selectedContract.status === 'active' ? 'success' : 'warning'}>
                {selectedContract.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Cọc M1 Escrow">
              {selectedContract.depositReceived ? <Tag color="green">Đã nhận cọc</Tag> : <Tag color="red">Chưa nhận</Tag>}
            </Descriptions.Item>
          </Descriptions>

          <Steps
            direction="vertical"
            current={selectedContract.milestones.findIndex((m) => m.status === 'in_progress')}
            items={selectedContract.milestones.map((m) => ({
              title: m.name,
              description: (
                <div style={{ marginTop: 4 }}>
                  <div>Số tiền: <strong style={{ color: '#8c1524' }}>{m.amount}</strong></div>
                  <div>Hạn chót: <strong>{m.dueDate}</strong></div>
                  <Tag color={m.status === 'completed' ? 'success' : m.status === 'in_progress' ? 'processing' : 'default'} style={{ marginTop: 4 }}>
                    {m.status === 'completed' ? 'Hoàn thành' : m.status === 'in_progress' ? 'Đang thực hiện' : 'Chưa đến hạn'}
                  </Tag>
                </div>
              ),
            }))}
          />
        </Modal>
      )}

      {/* Modal OTP Sign */}
      <Modal
        title="Ký Số Hợp Đồng Điện Tử B2B (Xác Thực OTP)"
        open={otpModalOpen}
        onCancel={() => setOtpModalOpen(false)}
        onOk={handleConfirmOtpSign}
        okText="Xác Nhận Ký Số Hợp Đồng"
        okButtonProps={{ style: { background: '#8c1524', borderColor: '#8c1524' } }}
      >
        <p style={{ color: '#666' }}>
          Hệ thống đã gửi mã OTP xác thực ký điện tử về số điện thoại đại diện xưởng bánh <strong>0912 345 678</strong>. Vui lòng nhập mã:
        </p>
        <Input
          placeholder="Nhập 6 chữ số OTP (VD: 123456)"
          maxLength={6}
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          style={{ fontSize: 20, textAlign: 'center', letterSpacing: 8, height: 48 }}
        />
        <div style={{ fontSize: 12, color: '#888', marginTop: 12 }}>
          Ký hợp đồng đồng nghĩa với việc cam kết thực hiện đúng quy cách mẫu bánh, tiến độ giao hàng và chịu chế tài vi phạm theo điều khoản hợp đồng.
        </div>
      </Modal>

      {/* Modal Extension */}
      <Modal
        title="Đơn Xin Gia Hạn Tiến Độ Giao Hàng"
        open={extensionModalOpen}
        onCancel={() => setExtensionModalOpen(false)}
        onOk={handleConfirmExtension}
        okText="Gửi Đơn Xin Gia Hạn"
      >
        <Alert
          message="Khuyến nghị khai báo sự cố sớm (Feature #17)"
          description="Khai báo gia hạn trước ngày đến hạn giúp xưởng bánh tránh bị phạt vi phạm hợp đồng (breach -20 điểm uy tín) và duy trì hạng Đối Tác Vàng."
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Form layout="vertical">
          <Form.Item label="Lý Do Sự Cố Cần Gia Hạn" rules={[{ required: true }]}>
            <TextArea rows={3} placeholder="VD: Khâu nhập khẩu khuôn dập logo sơn mài bị trễ 2 ngày tại hải quan..." />
          </Form.Item>
          <Form.Item label="Ngày Đề Xuất Hoàn Thành Mới" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </ColonyAdminLayout>
  );
}
