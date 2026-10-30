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
  CameraOutlined,
  ClockCircleOutlined,
  MobileOutlined,
  FileDoneOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import PoDViewerModal from '../../components/delivery/PoDViewerModal';
import deliveryService from '../../services/deliveryService';

const { Text } = Typography;

const STATUS_TAG_MAP = {
  Pending: { text: 'Chờ xếp xe', color: 'default' },
  Confirmed: { text: 'Đã xác nhận', color: 'blue' },
  PickedUp: { text: 'Đã bốc lên xe', color: 'geekblue' },
  InTransit: { text: 'Đang vận chuyển', color: 'gold' },
  Delivered: { text: 'Đã bàn giao (PoD)', color: 'green' },
  Failed: { text: 'Giao thất bại', color: 'red' },
  Returned: { text: 'Đã chuyển hoàn', color: 'volcano' },
  in_transit: { text: 'Đang vận chuyển', color: 'gold' },
  delivered: { text: 'Đã bàn giao (PoD)', color: 'green' },
};

export default function DeliveryPoD({ onNavigate }) {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [currentProofs, setCurrentProofs] = useState([]);
  const [podModalOpen, setPodModalOpen] = useState(false);

  const fetchDeliveries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await deliveryService.listMine();
      setDeliveries(Array.isArray(data) ? data : []);
    } catch {
      message.error('Không thể tải danh sách chuyến giao hàng.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    const run = async () => {
      try {
        setLoading(true);
        const data = await deliveryService.listMine();
        if (!ignore) {
          setDeliveries(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!ignore) {
          message.error('Không thể tải danh sách chuyến giao hàng.');
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

  const handleConfirmReceived = async (record) => {
    try {
      await deliveryService.updateStatus(record.id || record.key, 'Delivered', 'Khách hàng đối soát và xác nhận đã nhận đủ hàng.');
      message.success('Đã xác nhận nhận đủ hàng nguyên vẹn! Hệ thống đã kích hoạt giải phóng đợt thanh toán Milestone tương ứng.');
      fetchDeliveries();
    } catch {
      message.error('Không thể cập nhật trạng thái nhận hàng.');
    }
  };

  const columns = [
    {
      title: 'Mã Vận Chuyển',
      dataIndex: 'deliveryNumber',
      key: 'deliveryNumber',
      render: (text, r) => (
        <div>
          <span className="font-bold text-amber-700">{text || r.deliveryCode || 'DEL-N/A'}</span>
          <div className="text-[11px] text-slate-400">
            {r.deliveryType === 'SelfArranged' ? 'Xưởng tự chở' : 'Đơn vị VC'}
          </div>
        </div>
      ),
    },
    {
      title: 'Hợp Đồng / Đơn Hàng',
      dataIndex: 'contractNumber',
      key: 'contractNumber',
      render: (text, r) => (
        <div>
          <strong className="text-slate-800">{text || r.contractNo || 'HĐ-B2B'}</strong>
          <div className="text-xs text-slate-500 truncate max-w-xs">{r.supplierName || 'Nhà cung cấp'}</div>
        </div>
      ),
    },
    {
      title: 'Điểm Nhận Hàng & Người Nhận',
      key: 'destination',
      render: (_, r) => (
        <div className="text-xs">
          <div className="font-medium text-slate-800 truncate max-w-xs">{r.toAddress || 'Tại kho khách hàng'}</div>
          <div className="text-slate-500">
            👤 {r.recipientName || 'Thủ kho'} ({r.recipientPhone || 'N/A'})
          </div>
        </div>
      ),
    },
    {
      title: 'Mã Tracking',
      dataIndex: 'trackingCode',
      key: 'trackingCode',
      render: (t) => (
        <Tag color="cyan" className="font-mono">
          {t || 'Nội bộ xưởng'}
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
      title: 'Thao Tác Bằng Chứng',
      key: 'actions',
      align: 'right',
      render: (_, record) => {
        const isDelivered = record.status === 'Delivered' || record.status === 'delivered';
        return (
          <Space size="small">
            <Button
              size="small"
              icon={<CameraOutlined />}
              onClick={() => handleOpenPod(record)}
              className="border-amber-300 text-amber-800 hover:bg-amber-50 font-medium"
            >
              Xem PoD
            </Button>

            {!isDelivered && (
              <Tooltip title="Mở giao diện Web Mobile-First giả lập tài xế nộp ảnh & ký tên">
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
            )}

            {!isDelivered && (record.status === 'InTransit' || record.status === 'in_transit') && (
              <Button
                size="small"
                type="dashed"
                className="text-emerald-700 border-emerald-400 hover:bg-emerald-50 font-medium text-xs"
                onClick={() => handleConfirmReceived(record)}
              >
                Nhận hàng
              </Button>
            )}

            {isDelivered && (
              <Button
                size="small"
                type="primary"
                icon={<FileDoneOutlined />}
                className="bg-emerald-600 hover:bg-emerald-500 font-medium text-xs"
                onClick={() => {
                  window.location.hash = 'hop-dong-tien-do';
                  onNavigate?.('hop-dong-tien-do');
                }}
              >
                Nghiệm thu Mốc
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <CustomerHeader onNavigate={onNavigate} />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <CarOutlined className="text-amber-600" />
              Theo Dõi Giao Nhận & Xác Minh Bằng Chứng PoD
            </h1>
            <Text type="secondary" className="text-sm">
              Doanh nghiệp đối soát ảnh chụp hiện trường kiện bánh, chữ ký điện tử thủ kho và tọa độ GPS chống gian lận
            </Text>
          </div>

          <Button
            icon={<ReloadOutlined />}
            onClick={fetchDeliveries}
            loading={loading}
            className="border-slate-300 font-medium self-start sm:self-auto"
          >
            Làm mới
          </Button>
        </div>

        <Alert
          type="info"
          showIcon
          className="bg-amber-50/70 border-amber-200"
          message={
            <div className="text-xs text-slate-700">
              <strong>Bảo đảm quyền lợi pháp lý:</strong> Mỗi đợt giao bánh trung thu đều bắt buộc nhân viên giao vận chụp ảnh kiện hàng nguyên đai niêm phong kèm chữ ký số cảm ứng của người nhận tại kho. Bằng chứng được niêm phong bằng mã băm SHA-256 bất biến trên cơ sở dữ liệu.
            </div>
          }
        />

        <Card className="rounded-2xl shadow-sm border-slate-200 overflow-hidden">
          <Table
            columns={columns}
            dataSource={deliveries.map((d, i) => ({ ...d, key: d.id || d.key || i }))}
            loading={loading}
            pagination={{ pageSize: 8 }}
            scroll={{ x: 900 }}
          />
        </Card>

        <PoDViewerModal
          open={podModalOpen}
          onClose={() => setPodModalOpen(false)}
          delivery={selectedDelivery}
          proofs={currentProofs}
        />
      </main>
    </div>
  );
}
