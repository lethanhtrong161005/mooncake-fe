import { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Tag,
  Space,
  Modal,
  Steps,
  Descriptions,
  message,
  Typography,
  Alert,
  Input,
} from 'antd';
import {
  FileTextOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  SafetyCertificateOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';

const { Text } = Typography;

export default function ContractsAndMilestone({ onNavigate }) {
  const [selectedContract, setSelectedContract] = useState(null);
  const [signModalOpen, setSignModalOpen] = useState(false);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  // Customer Contracts Mock Data
  const [contracts, setContracts] = useState([
    {
      key: '1',
      contractNo: 'HD-2025-08910',
      rfqRef: 'RFQ-2025-08910',
      sellerCompany: 'Xưởng Bánh Tràng An Nghệ Nhân',
      totalAmount: '310.000.000 ₫',
      depositAmount: '93.000.000 ₫ (30%)',
      status: 'pending_deposit', // 'pending_signature' | 'pending_deposit' | 'active' | 'completed'
      signedBuyer: true,
      signedSeller: true,
      milestones: [
        { name: 'M1: Đặt cọc bảo chứng Escrow (30%)', amount: '93.000.000 ₫', dueDate: '2025-08-14', status: 'pending_payment' },
        { name: 'M2: Bàn giao hàng đợt 1 (50%)', amount: '155.000.000 ₫', dueDate: '2025-08-25', status: 'pending' },
        { name: 'M3: Nghiệm thu hoàn tất & Thanh toán cuối (20%)', amount: '62.000.000 ₫', dueDate: '2025-09-02', status: 'pending' },
      ],
    },
    {
      key: '2',
      contractNo: 'HD-2025-08500',
      rfqRef: 'RFQ-2025-08500',
      sellerCompany: 'Hữu Nghị Luxury Mooncake',
      totalAmount: '180.000.000 ₫',
      depositAmount: '54.000.000 ₫ (30%)',
      status: 'active',
      signedBuyer: true,
      signedSeller: true,
      milestones: [
        { name: 'M1: Đặt cọc kích hoạt HĐ (30%)', amount: '54.000.000 ₫', dueDate: '2025-08-01', status: 'completed' },
        { name: 'M2: Bàn giao hàng tận nơi (70%)', amount: '126.000.000 ₫', dueDate: '2025-08-20', status: 'in_progress' },
      ],
    },
  ]);

  const handlePayDeposit = (record) => {
    setSelectedContract(record);
    setDepositModalOpen(true);
  };

  const handleConfirmDepositPayment = () => {
    setContracts((prev) =>
      prev.map((c) =>
        c.key === selectedContract.key
          ? {
              ...c,
              status: 'active',
              milestones: c.milestones.map((m, idx) =>
                idx === 0 ? { ...m, status: 'completed' } : idx === 1 ? { ...m, status: 'in_progress' } : m
              ),
            }
          : c
      )
    );

    message.success(
      `Đã thanh toán thành công 93.000.000 ₫ tiền cọc M1 vào tài khoản Escrow! Hợp đồng ${selectedContract.contractNo} đã kích hoạt trạng thái ACTIVE.`
    );
    setDepositModalOpen(false);
  };

  const columns = [
    {
      title: 'Số Hợp Đồng',
      dataIndex: 'contractNo',
      key: 'contractNo',
      render: (no) => <span style={{ fontWeight: 600, color: '#1677ff' }}>{no}</span>,
    },
    {
      title: 'Nhà Cung Cấp (Bên Bán)',
      dataIndex: 'sellerCompany',
      key: 'sellerCompany',
      render: (s) => <strong>{s}</strong>,
    },
    {
      title: 'Tổng Giá Trị HĐ',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: 'right',
      render: (amt) => <span style={{ fontWeight: 700, color: '#8c1524' }}>{amt}</span>,
    },
    {
      title: 'Tiền Cọc Kích Hoạt M1 (30%)',
      dataIndex: 'depositAmount',
      key: 'depositAmount',
      align: 'right',
      render: (amt) => <span style={{ fontWeight: 600 }}>{amt}</span>,
    },
    {
      title: 'Ký Điện Tử (OTP)',
      key: 'signed',
      render: (_, r) => (
        <Tag color="success">✓ Cả 2 bên đã ký OTP</Tag>
      ),
    },
    {
      title: 'Trạng Thái HĐ',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        if (status === 'pending_deposit') return <Tag color="error">Chờ cọc M1 để kích hoạt</Tag>;
        if (status === 'active') return <Tag color="success">Đang hiệu lực (Active)</Tag>;
        return <Tag color="default">Hoàn thành</Tag>;
      },
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {record.status === 'pending_deposit' && (
            <Button
              type="primary"
              size="small"
              icon={<DollarOutlined />}
              style={{ background: '#8c1524', borderColor: '#8c1524', fontWeight: 600 }}
              onClick={() => handlePayDeposit(record)}
            >
              Đặt Cọc M1 (Kích hoạt HĐ)
            </Button>
          )}
          {record.status === 'active' && (
            <Button
              type="default"
              size="small"
              onClick={() => onNavigate?.('giao-hang-pod')}
            >
              Theo dõi giao nhận
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ background: '#f5f5f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CustomerHeader activeKey="hop-dong-tien-do" onNavigate={onNavigate} />

      <main style={{ maxWidth: 1440, margin: '24px auto', padding: '0 20px', flex: 1, width: '100%' }}>
        <div
          style={{
            background: '#ffffff',
            padding: '20px 24px',
            borderRadius: 10,
            marginBottom: 20,
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#1f1f1f' }}>
            Hợp Đồng Điện Tử B2B & Tiến Độ Mốc Thanh Toán (Milestones)
          </h1>
          <p style={{ margin: '4px 0 0', color: '#666', fontSize: 13 }}>
            Xem hợp đồng điện tử có giá trị pháp lý, thực hiện ký số xác thực OTP và nạp quỹ bảo chứng Escrow
          </p>
        </div>

        <Alert
          message="Chế tài bảo vệ hợp đồng (Module 6 - Feature #15, #16)"
          description="Khoản đặt cọc M1 (30%) được lưu trữ an toàn trong tài khoản trung gian ký quỹ (Escrow). Nhà cung cấp chỉ nhận được tiền giải ngân khi khách hàng bấm xác nhận nghiệm thu từng mốc hoặc có ảnh xác minh giao nhận PoD."
          type="info"
          showIcon
          style={{ marginBottom: 20 }}
        />

        <Card bordered={false} style={{ borderRadius: 10 }}>
          <Table columns={columns} dataSource={contracts} pagination={false} />
        </Card>

        {/* Modal Thanh Toán Đặt Cọc M1 */}
        {selectedContract && (
          <Modal
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8c1524' }}>
                <DollarOutlined />
                <span>Thanh Toán Đặt Cọc M1 Kích Hoạt Hợp Đồng: {selectedContract.contractNo}</span>
              </div>
            }
            open={depositModalOpen}
            onCancel={() => setDepositModalOpen(false)}
            onOk={handleConfirmDepositPayment}
            okText="Xác Nhận Nạp Quỹ Ký Quỹ Escrow"
            okButtonProps={{ style: { background: '#8c1524', borderColor: '#8c1524' } }}
            width={600}
          >
            <Descriptions bordered size="small" column={1} style={{ margin: '16px 0' }}>
              <Descriptions.Item label="Đối Tác Cung Ứng">{selectedContract.sellerCompany}</Descriptions.Item>
              <Descriptions.Item label="Tổng Giá Trị HĐ">{selectedContract.totalAmount}</Descriptions.Item>
              <Descriptions.Item label="Số Tiền Cọc M1 (30%)">
                <strong style={{ fontSize: 18, color: '#8c1524' }}>{selectedContract.depositAmount}</strong>
              </Descriptions.Item>
              <Descriptions.Item label="Phương Thức Ký Quỹ">
                Chuyển khoản trực tiếp vào Tài Khoản Escrow Sàn MoonMarket (Vietcombank)
              </Descriptions.Item>
            </Descriptions>

            <Alert
              message="Đảm bảo an toàn 100% dòng tiền"
              description="Sau khi nhận được tiền cọc, sàn sẽ cấp cờ ACTIVE cho hợp đồng, xưởng bắt đầu sản xuất và giao đúng ngày cam kết 25/08."
              type="success"
              showIcon
            />
          </Modal>
        )}
      </main>
    </div>
  );
}
