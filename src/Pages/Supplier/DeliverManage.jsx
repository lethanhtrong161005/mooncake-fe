import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Table,
  Button,
  Tag,
  Space,
  Typography,
  Alert,
  message,
  Tooltip,
} from 'antd';
import {
  CarOutlined,
  PlusOutlined,
  CameraOutlined,
  ClockCircleOutlined,
  MobileOutlined,
  ReloadOutlined,
  SendOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import CreateDeliveryModal from '../../components/delivery/CreateDeliveryModal';
import PoDViewerModal from '../../components/delivery/PoDViewerModal';
import deliveryService from '../../services/deliveryService';
import contractService from '../../services/contractService';

const { Text } = Typography;

const STATUS_TAG_MAP = {
  Pending: { text: 'Chờ xếp xe', color: 'default' },
  Confirmed: { text: 'Đã xác nhận', color: 'blue' },
  PickedUp: { text: 'Đã bốc lên xe', color: 'geekblue' },
  InTransit: { text: 'Đang vận chuyển', color: 'gold' },
  Delivered: { text: 'Đã giao hàng (PoD)', color: 'green' },
  Failed: { text: 'Giao thất bại', color: 'red' },
  Returned: { text: 'Đã chuyển hoàn', color: 'volcano' },
  in_transit: { text: 'Đang vận chuyển', color: 'gold' },
  delivered: { text: 'Đã giao hàng (PoD)', color: 'green' },
};

export default function DeliverManage({ onNavigate }) {
  const [deliveries, setDeliveries] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [podModalOpen, setPodModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [currentProofs, setCurrentProofs] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [delivData, contractData] = await Promise.all([
        deliveryService.listMine(),
        contractService.listMine().catch(() => []),
      ]);
      setDeliveries(Array.isArray(delivData) ? delivData : []);
      setContracts(Array.isArray(contractData) ? contractData : []);
    } catch {
      message.error('Không thể tải dữ liệu giao vận.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    const run = async () => {
      try {
        setLoading(true);
        const [delivData, contractData] = await Promise.all([
          deliveryService.listMine(),
          contractService.listMine().catch(() => []),
        ]);
        if (!ignore) {
          setDeliveries(Array.isArray(delivData) ? delivData : []);
          setContracts(Array.isArray(contractData) ? contractData : []);
        }
      } catch {
        if (!ignore) {
          message.error('Không thể tải dữ liệu giao vận.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };
    run();
    return () => {
      ignore = true;
    };
  }, []);

  const handleOpenPod = async (record) => {
    setSelectedDelivery(record);
    try {
      const proofs = await deliveryService.getProofs(record.id || record.key);
      setCurrentProofs(Array.isArray(proofs) ? proofs : []);
    } catch {
      setCurrentProofs([]);
    }
    setPodModalOpen(true);
  };

  const handleUpdateStatus = async (record, nextStatus, notes) => {
    try {
      await deliveryService.updateStatus(record.id || record.key, nextStatus, notes);
      message.success(`Đã cập nhật trạng thái chuyến giao sang: ${STATUS_TAG_MAP[nextStatus]?.text || nextStatus}`);
      fetchData();
    } catch (err) {
      message.error(err.response?.data?.message || 'Lỗi khi cập nhật trạng thái chuyến giao.');
    }
  };

  const columns = [
    {
      title: 'Mã Chuyến Giao',
      dataIndex: 'deliveryNumber',
      key: 'deliveryNumber',
      render: (text, r) => (
        <div>
          <span className="font-bold text-amber-700">{text || r.deliveryCode || 'DEL-N/A'}</span>
          <div className="text-[11px] text-slate-400">
            {r.deliveryType === 'SelfArranged' ? 'Xe xưởng tự chở' : 'Đơn vị VC liên kết'}
          </div>
        </div>
      ),
    },
    {
      title: 'Hợp Đồng Tham Chiếu',
      dataIndex: 'contractNumber',
      key: 'contractNumber',
      render: (text, r) => (
        <div>
          <strong className="text-slate-800">{text || r.contractNo || 'HĐ-B2B'}</strong>
          <div className="text-xs text-slate-500">{r.customerName || 'Doanh nghiệp'}</div>
        </div>
      ),
    },
    {
      title: 'Nơi Nhận & Đại Diện',
      key: 'destination',
      render: (_, r) => (
        <div className="text-xs">
          <div className="font-medium text-slate-800 truncate max-w-xs">{r.toAddress || 'Kho nhận'}</div>
          <div className="text-slate-500">
            👤 {r.recipientName || 'Thủ kho'} ({r.recipientPhone || 'N/A'})
          </div>
        </div>
      ),
    },
    {
      title: 'Mã Tracking / Xe',
      dataIndex: 'trackingCode',
      key: 'trackingCode',
      render: (t) => (
        <Tag color="cyan" className="font-mono">
          {t || 'Xe xưởng'}
        </Tag>
      ),
    },
    {
      title: 'Ngày Dự Kiến',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
      render: (d, r) => (
        <span className="text-xs text-slate-600">
          <ClockCircleOutlined className="mr-1 text-slate-400" />
          {d || r.expectedDate || 'Đang cập nhật'}
        </span>
      ),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const config = STATUS_TAG_MAP[status] || { text: status, color: 'default' };
        return (
          <Tag color={config.color} className="font-semibold text-xs px-2.5 py-0.5">
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'Điều Phối & Bằng Chứng',
      key: 'actions',
      align: 'right',
      render: (_, record) => {
        const status = record.status;
        return (
          <Space size="small">
            {status === 'Pending' && (
              <Button
                size="small"
                type="primary"
                className="bg-blue-600 hover:bg-blue-500 text-xs"
                onClick={() => handleUpdateStatus(record, 'Confirmed', 'Xưởng xác nhận xếp xe.')}
              >
                Xác nhận xếp xe
              </Button>
            )}

            {status === 'Confirmed' && (
              <Button
                size="small"
                className="border-geekblue-400 text-geekblue-600 hover:bg-geekblue-50 text-xs font-semibold"
                onClick={() => handleUpdateStatus(record, 'PickedUp', 'Đã bốc hàng xong tại xưởng.')}
              >
                Bốc hàng lên xe
              </Button>
            )}

            {status === 'PickedUp' && (
              <Button
                size="small"
                className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold"
                icon={<SendOutlined />}
                onClick={() => handleUpdateStatus(record, 'InTransit', 'Xe xuất bến bắt đầu vận chuyển.')}
              >
                Xuất bến (In-Transit)
              </Button>
            )}

            <Button
              size="small"
              icon={<CameraOutlined />}
              onClick={() => handleOpenPod(record)}
              className="border-amber-300 text-amber-800 hover:bg-amber-50 font-medium text-xs"
            >
              Xem PoD ({record.proofCount || 0})
            </Button>

            <Tooltip title="Mở Web Mobile View giả lập tài xế hiện trường chụp ảnh & lấy chữ ký">
              <Button
                size="small"
                icon={<MobileOutlined />}
                onClick={() => {
                  window.location.hash = `driver-delivery-view?id=${record.id || record.key}`;
                }}
                className="text-xs border-slate-300"
              >
                Tài xế PoD
              </Button>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <ColonyAdminLayout onNavigate={onNavigate}>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <CarOutlined className="text-amber-600" />
              Quản Lý Vận Chuyển & Giao Hàng B2B (Logistics)
            </h1>
            <Text type="secondary" className="text-sm">
              Xưởng bánh điều phối đội xe nội bộ hoặc hãng chuyển phát, quản lý chia nhiều đợt giao và giám sát PoD
            </Text>
          </div>

          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={fetchData}
              loading={loading}
              className="border-slate-300 font-medium"
            >
              Làm mới
            </Button>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateModalOpen(true)}
              className="bg-amber-600 hover:bg-amber-500 font-semibold"
            >
              Tạo Chuyến Giao (Chia Đợt)
            </Button>
          </Space>
        </div>

        <Alert
          type="info"
          showIcon
          className="bg-amber-50/70 border-amber-200"
          message={
            <div className="text-xs text-slate-700">
              <strong>Quy trình giao nhận tiêu chuẩn B2B:</strong> Tạo chuyến giao ➔ Tiếp nhận ➔ Bốc hàng tại xưởng (Pickup PoD) ➔ Vận chuyển trên đường ➔ Bàn giao tại kho khách (Delivery PoD + Chữ ký số) ➔ Tự động kích hoạt đối soát mốc Milestone nghiệm thu hợp đồng.
            </div>
          }
        />

        <Card className="rounded-2xl shadow-sm border-slate-200 overflow-hidden">
          <Table
            columns={columns}
            dataSource={deliveries.map((d, i) => ({ ...d, key: d.id || d.key || i }))}
            loading={loading}
            pagination={{ pageSize: 8 }}
            scroll={{ x: 1000 }}
          />
        </Card>

        <CreateDeliveryModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSuccess={fetchData}
          contracts={contracts}
        />

        <PoDViewerModal
          open={podModalOpen}
          onClose={() => setPodModalOpen(false)}
          delivery={selectedDelivery}
          proofs={currentProofs}
        />
      </div>
    </ColonyAdminLayout>
  );
}
