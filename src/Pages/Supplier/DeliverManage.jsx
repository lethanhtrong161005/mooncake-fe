import { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Space,
  Table,
  Tag,
  Tooltip,
  message,
} from 'antd';
import {
  CameraOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  MobileOutlined,
  PlusOutlined,
  ReloadOutlined,
  SendOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import CreateDeliveryModal from '../../components/delivery/CreateDeliveryModal';
import PoDViewerModal from '../../components/delivery/PoDViewerModal';
import deliveryService from '../../services/deliveryService';
import contractService from '../../services/contractService';
import usePagedList from '../../hooks/usePagedList';
import FilterBar from '../../components/common/FilterBar';

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
  const deliveryPage = usePagedList(deliveryService.listMinePaged);
  const deliveries = deliveryPage.items;
  const [contracts, setContracts] = useState([]);
  const loading = deliveryPage.loading;
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [podModalOpen, setPodModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [currentProofs, setCurrentProofs] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      deliveryPage.refresh();
      const contractData = await contractService.listMine().catch(() => []);
      setContracts(Array.isArray(contractData) ? contractData : []);
    } catch {
      message.error('Không thể tải dữ liệu giao vận.');
    }
  }, [deliveryPage]);

  useEffect(() => {
    let ignore = false;
    const run = async () => {
      try {
        const contractData = await contractService.listMine().catch(() => []);
        if (!ignore) {
          setContracts(Array.isArray(contractData) ? contractData : []);
        }
      } catch {
        if (!ignore) {
          message.error('Không thể tải dữ liệu giao vận.');
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
      message.success(
        `Đã cập nhật trạng thái chuyến giao sang: ${STATUS_TAG_MAP[nextStatus]?.text || nextStatus}`,
      );
      fetchData();
    } catch (err) {
      message.error(err.response?.data?.message || 'Lỗi khi cập nhật trạng thái chuyến giao.');
    }
  };

  const columns = [
    {
      title: 'Mã chuyến giao',
      dataIndex: 'deliveryNumber',
      key: 'deliveryNumber',
      render: (text, r) => (
        <div className="whitespace-nowrap">
          <span className="font-mono text-sm font-semibold text-[#7d1322]">
            {text || r.deliveryCode || 'DEL-N/A'}
          </span>
          <div className="mt-0.5 text-[11px] text-[#6c625e]">
            {r.deliveryType === 'SelfArranged' ? 'Xe xưởng tự chở' : 'Đơn vị vận chuyển'}
          </div>
        </div>
      ),
    },
    {
      title: 'Hợp đồng tham chiếu',
      dataIndex: 'contractNumber',
      key: 'contractNumber',
      render: (text, r) => (
        <div className="whitespace-nowrap">
          <div className="font-medium text-sm text-[#231a18]">{text || r.contractNo || 'HĐ-B2B'}</div>
          <div className="text-xs text-[#6c625e]">{r.customerName || 'Doanh nghiệp'}</div>
        </div>
      ),
    },
    {
      title: 'Nơi nhận & đại diện',
      key: 'destination',
      render: (_, r) => (
        <div className="max-w-[200px] space-y-0.5 text-xs">
          <div className="truncate font-medium text-[#231a18]">
            {r.toAddress || 'Kho nhận'}
          </div>
          <div className="flex items-center gap-1 truncate text-[#6c625e] tabular-nums">
            <UserOutlined className="shrink-0 text-[11px] text-[#9a6b16]" />
            <span className="truncate">
              {r.recipientName || 'Thủ kho'} ({r.recipientPhone || 'N/A'})
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Mã tracking / xe',
      dataIndex: 'trackingCode',
      key: 'trackingCode',
      render: (t) => (
        <span className="inline-block whitespace-nowrap rounded border border-[#e4dcd3] bg-[#faf7f2] px-2 py-0.5 font-mono text-xs text-[#231a18]">
          {t || 'Xe xưởng'}
        </span>
      ),
    },
    {
      title: 'Ngày dự kiến',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
      render: (d, r) => (
        <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs tabular-nums text-[#6c625e]">
          <ClockCircleOutlined className="text-[#9a6b16]" />
          <span>{d || r.expectedDate || 'Đang cập nhật'}</span>
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const config = STATUS_TAG_MAP[status] || { text: status, color: 'default' };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: 'Điều phối & bằng chứng',
      key: 'actions',
      align: 'right',
      render: (_, record) => {
        const status = record.status;
        return (
          <Space size="small" wrap>
            {status === 'Pending' && (
              <Button
                size="small"
                type="primary"
                style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
                onClick={() => handleUpdateStatus(record, 'Confirmed', 'Xưởng xác nhận xếp xe.')}
              >
                Xác nhận xếp xe
              </Button>
            )}

            {status === 'Confirmed' && (
              <Button
                size="small"
                style={{ borderColor: '#7d1322', color: '#7d1322' }}
                onClick={() => handleUpdateStatus(record, 'PickedUp', 'Đã bốc hàng xong tại xưởng.')}
              >
                Bốc hàng lên xe
              </Button>
            )}

            {status === 'PickedUp' && (
              <Button
                size="small"
                type="primary"
                icon={<SendOutlined />}
                style={{ backgroundColor: '#9a6b16', borderColor: '#9a6b16' }}
                onClick={() => handleUpdateStatus(record, 'InTransit', 'Xe xuất bến bắt đầu vận chuyển.')}
              >
                Xuất bến (In-Transit)
              </Button>
            )}

            <Button
              size="small"
              icon={<CameraOutlined />}
              onClick={() => handleOpenPod(record)}
            >
              Xem PoD ({record.proofCount || 0})
            </Button>

            <Tooltip title="Mở giao diện tài xế hiện trường chụp ảnh và lấy chữ ký PoD">
              <Button
                size="small"
                icon={<MobileOutlined />}
                onClick={() => {
                  onNavigate?.(`driver-delivery-view?id=${record.id || record.key}`);
                }}
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
    <ColonyAdminLayout
      role="Supplier"
      activeKey="nha-cung-cap/quan-ly-giao-hang"
      onNavigate={onNavigate}
      title="Quản lý vận chuyển & giao hàng"
      subtitle="Điều phối xe xưởng hoặc hãng vận chuyển theo từng đợt và đối soát bằng chứng PoD."
      extra={
        <Space wrap>
          <Button icon={<ReloadOutlined />} onClick={fetchData} loading={loading}>
            Làm mới
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalOpen(true)}
            style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
          >
            Tạo Chuyến Giao (Chia Đợt)
          </Button>
        </Space>
      }
    >
      <div className="space-y-5">
        <div className="flex items-center gap-2.5 rounded-xl border border-[#e7dccf] bg-[#fdfbf8] px-4 py-3 text-xs text-[#6c625e]">
          <InfoCircleOutlined className="shrink-0 text-sm text-[#9a6b16]" />
          <span>
            Quy trình giao nhận: Tạo chuyến giao → Xếp xe → Bốc hàng tại xưởng → Xuất bến → Bàn giao PoD &amp; chữ ký điện tử để kích hoạt nghiệm thu hợp đồng.
          </span>
        </div>

        <section
          aria-label="Danh sách chuyến giao hàng"
          className="rounded-2xl border border-[#e4dcd3] bg-white p-4 sm:p-6"
        >
          <div className="rounded-xl border border-[#ebe3da] bg-[#faf7f2] p-3.5">
            <FilterBar
              search={deliveryPage.search}
              onSearchChange={deliveryPage.setSearch}
              status={deliveryPage.query.status}
              onStatusChange={deliveryPage.setStatus}
              onReset={deliveryPage.reset}
              placeholder="Tìm mã giao hàng"
              statusOptions={Object.keys(STATUS_TAG_MAP)
                .filter((value) => value[0] === value[0].toUpperCase())
                .map((value) => ({ value, label: STATUS_TAG_MAP[value].text }))}
            />
          </div>

          <div className="mt-4 overflow-x-auto">
            <Table
              columns={columns}
              dataSource={deliveries.map((d, i) => ({ ...d, key: d.id || d.key || i }))}
              loading={loading}
              size="middle"
              pagination={{
                current: deliveryPage.query.page,
                pageSize: deliveryPage.query.pageSize,
                total: deliveryPage.totalCount,
                onChange: deliveryPage.setPage,
                showSizeChanger: true,
                pageSizeOptions: [10, 20, 50, 100],
              }}
              scroll={{ x: 860 }}
            />
          </div>
        </section>

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
