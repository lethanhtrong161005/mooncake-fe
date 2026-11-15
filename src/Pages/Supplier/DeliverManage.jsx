import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  App,
  Button,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import {
  CameraOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  ReloadOutlined,
  SendOutlined,
  ShareAltOutlined,
  TruckOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import CreateDeliveryModal from '../../components/delivery/CreateDeliveryModal';
import DeliveryDetailDrawer from '../../components/delivery/DeliveryDetailDrawer';
import PoDViewerModal from '../../components/delivery/PoDViewerModal';
import SharePoDLinkModal from '../../components/delivery/SharePoDLinkModal';
import FilterBar from '../../components/common/FilterBar';
import usePagedList from '../../hooks/usePagedList';
import contractService from '../../services/contractService';
import deliveryService from '../../services/deliveryService';
import { signalRManager } from '../../services/signalrService';
import '../../styles/supplier-deliveries.css';

const STATUS_TAG_MAP = {
  Pending: { text: 'Chờ xếp xe', color: 'default' },
  Confirmed: { text: 'Đã xác nhận', color: 'blue' },
  PickedUp: { text: 'Đã bốc lên xe', color: 'geekblue' },
  InTransit: { text: 'Đang vận chuyển', color: 'gold' },
  AwaitingCustomerConfirmation: { text: 'Chờ khách xác nhận nhận hàng', color: 'cyan' },
  Delivered: { text: 'Đã giao hàng (PoD)', color: 'green' },
  Disputed: { text: 'Đang khiếu nại PoD', color: 'red' },
  Failed: { text: 'Giao thất bại', color: 'red' },
  Returned: { text: 'Đã chuyển hoàn', color: 'volcano' },
};

const formatDateTime = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString('vi-VN');
};

/**
 * Supplier dispatch and Proof-of-Delivery workspace with inline status actions,
 * full delivery inspection drawer, and time-limited public driver PoD sharing.
 */
export default function DeliverManage({ onNavigate }) {
  const { message } = App.useApp();
  const deliveryPage = usePagedList(deliveryService.listMinePaged);
  const deliveries = deliveryPage.items;
  const loading = deliveryPage.loading;

  const [contracts, setContracts] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [detailDelivery, setDetailDelivery] = useState(null);
  const [podModalOpen, setPodModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareDelivery, setShareDelivery] = useState(null);
  const [currentProofs, setCurrentProofs] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      deliveryPage.refresh();
      const contractData = await contractService.listMine().catch(() => []);
      setContracts(Array.isArray(contractData) ? contractData : []);
    } catch {
      message.error('Không thể tải dữ liệu giao vận.');
    }
  }, [deliveryPage, message]);

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
  }, [message]);

  useEffect(() => {
    const refreshDeliveryStatus = (event) => {
      if (event?.category === 'delivery' || event?.type?.startsWith('delivery.')) fetchData();
    };
    signalRManager.on('ReceiveNotification', refreshDeliveryStatus);
    return () => signalRManager.off('ReceiveNotification', refreshDeliveryStatus);
  }, [fetchData]);

  const metrics = useMemo(() => {
    const inFlight = new Set(['Pending', 'Confirmed', 'PickedUp', 'InTransit']);
    const review = new Set(['AwaitingCustomerConfirmation', 'Disputed']);
    return {
      total: deliveryPage.totalCount || deliveries.length,
      inFlight: deliveries.filter((d) => inFlight.has(d.status)).length,
      awaitingReview: deliveries.filter((d) => review.has(d.status)).length,
      delivered: deliveries.filter((d) => d.status === 'Delivered').length,
    };
  }, [deliveries, deliveryPage.totalCount]);

  const handleOpenDetail = (record) => {
    setDetailDelivery(record);
    setDetailDrawerOpen(true);
  };

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

  const handleOpenShare = (record) => {
    setShareDelivery(record);
    setShareModalOpen(true);
  };

  const handleUpdateStatus = async (record, nextStatus, notes) => {
    try {
      await deliveryService.updateStatus(record.id || record.key, nextStatus, notes);
      message.success(
        `Đã cập nhật trạng thái chuyến giao sang: ${STATUS_TAG_MAP[nextStatus]?.text || nextStatus}`
      );
      fetchData();
    } catch (err) {
      message.error(
        err.response?.data?.message || err.message || 'Lỗi khi cập nhật trạng thái chuyến giao.'
      );
    }
  };

  const columns = [
    {
      title: 'Chuyến giao',
      dataIndex: 'deliveryNumber',
      key: 'deliveryNumber',
      width: '17%',
      render: (text, r) => (
        <div>
          <button
            type="button"
            className="dm-delivery-link"
            onClick={() => handleOpenDetail(r)}
          >
            {text || r.deliveryCode || 'DEL-N/A'}
          </button>
          <div className="dm-cell-muted">
            {r.deliveryType === 'SelfArranged' ? 'Xe xưởng tự chở' : 'Đơn vị vận chuyển'}
          </div>
          {r.createdAt && (
            <div className="dm-cell-muted">{formatDateTime(r.createdAt)}</div>
          )}
        </div>
      ),
    },
    {
      title: 'Đơn hàng / Hợp đồng',
      key: 'reference',
      width: '18%',
      render: (_, r) => (
        <div>
          <div className="dm-ref-code" title={r.orderNumber || r.contractNumber || ''}>
            {r.orderNumber || r.contractNumber || r.contractNo || 'Chuyến giao B2B'}
          </div>
          <div className="dm-cell-muted truncate">
            {r.customerName || 'Khách hàng doanh nghiệp'}
          </div>
        </div>
      ),
    },
    {
      title: 'Điểm nhận & đại diện',
      key: 'destination',
      width: '21%',
      render: (_, r) => (
        <div>
          <Tooltip title={r.toAddress}>
            <div className="dm-address-main">
              {r.toAddress || 'Kho nhận'}
            </div>
          </Tooltip>
          <div className="dm-cell-muted flex items-center gap-1">
            <UserOutlined className="shrink-0 text-[#9a6b16]" />
            <span className="truncate">
              {r.recipientName || 'Thủ kho'}
              {r.recipientPhone ? ` (${r.recipientPhone})` : ''}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Lịch giao & vận đơn',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
      width: '15%',
      render: (d, r) => (
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs tabular-nums text-[#231a18]">
            <ClockCircleOutlined className="text-[#9a6b16]" />
            <span>{d || r.expectedDate || 'Đang cập nhật'}</span>
          </div>
          <div>
            <span className="dm-tracking-pill" title={r.trackingCode || 'Xe xưởng'}>
              {r.trackingCode || 'Xe xưởng'}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Trạng thái & PoD',
      dataIndex: 'status',
      key: 'status',
      width: '13%',
      render: (status, r) => {
        const config = STATUS_TAG_MAP[status] || { text: status, color: 'default' };
        return (
          <div>
            <Tag color={config.color}>{config.text}</Tag>
            <div className="dm-cell-muted">{r.proofCount || 0} ảnh bằng chứng</div>
          </div>
        );
      },
    },
    {
      title: 'Điều phối & chi tiết',
      key: 'actions',
      align: 'right',
      width: '16%',
      render: (_, record) => {
        const status = record.status;
        return (
          <div className="dm-actions-cell">
            <div className="dm-actions-row">
              {status === 'Pending' && (
                <Button
                  size="small"
                  type="primary"
                  onClick={() =>
                    handleUpdateStatus(record, 'Confirmed', 'Xưởng xác nhận xếp xe.')
                  }
                >
                  Xác nhận xếp xe
                </Button>
              )}

              {status === 'Confirmed' && (
                <Button
                  size="small"
                  onClick={() =>
                    handleUpdateStatus(record, 'PickedUp', 'Đã bốc hàng xong tại xưởng.')
                  }
                >
                  Bốc hàng lên xe
                </Button>
              )}

              {status === 'PickedUp' && (
                <Button
                  size="small"
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={() =>
                    handleUpdateStatus(
                      record,
                      'InTransit',
                      'Xe xuất bến bắt đầu vận chuyển.'
                    )
                  }
                >
                  Xuất bến
                </Button>
              )}
            </div>

            <div className="dm-actions-row">
              <Button
                size="small"
                icon={<EyeOutlined />}
                onClick={() => handleOpenDetail(record)}
              >
                Chi tiết
              </Button>

              <Button
                size="small"
                icon={<CameraOutlined />}
                onClick={() => handleOpenPod(record)}
              >
                PoD ({record.proofCount || 0})
              </Button>

              <Tooltip title="Chia sẻ liên kết công khai có thời hạn cho tài xế nộp PoD">
                <Button
                  size="small"
                  icon={<ShareAltOutlined />}
                  onClick={() => handleOpenShare(record)}
                >
                  Tài xế PoD
                </Button>
              </Tooltip>
            </div>
          </div>
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
      subtitle="Điều phối xe xưởng, theo dõi lộ trình bàn giao và chia sẻ liên kết PoD cho tài xế."
      extra={
        <Space wrap>
          <Button icon={<ReloadOutlined />} onClick={fetchData} loading={loading}>
            Làm mới
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalOpen(true)}
          >
            Tạo chuyến giao
          </Button>
        </Space>
      }
    >
      <div>
        <div className="dm-notice">
          <div className="dm-notice__content">
            <InfoCircleOutlined className="text-[#9a6b16]" />
            <span>
              Bấm vào mã chuyến giao hoặc nút Chi tiết để xem lộ trình 2 đầu, cập nhật mã xe và chia sẻ link PoD cho tài xế.
            </span>
          </div>
        </div>

        <section className="dm-ribbon" aria-label="Tổng quan vận chuyển">
          <div className="dm-kpi">
            <div className="dm-kpi__label">
              <TruckOutlined className="text-[#7d1322]" />
              <span>Tổng chuyến giao</span>
            </div>
            <div className="dm-kpi__value">{metrics.total}</div>
            <div className="dm-kpi__caption">Theo dõi trên hệ thống</div>
          </div>

          <div className="dm-kpi">
            <div className="dm-kpi__label">
              <ClockCircleOutlined className="text-[#9a6b16]" />
              <span>Đang điều phối</span>
            </div>
            <div className="dm-kpi__value">{metrics.inFlight}</div>
            <div className="dm-kpi__caption">Chờ xếp xe đến đang giao</div>
          </div>

          <div className="dm-kpi">
            <div className="dm-kpi__label">
              <ExclamationCircleOutlined className="text-[#7d1322]" />
              <span>Chờ đối soát / khiếu nại</span>
            </div>
            <div className="dm-kpi__value">{metrics.awaitingReview}</div>
            <div className="dm-kpi__caption">Khách kiểm tra biên bản PoD</div>
          </div>

          <div className="dm-kpi">
            <div className="dm-kpi__label">
              <CheckCircleOutlined className="text-[#2d5a43]" />
              <span>Đã giao hoàn tất</span>
            </div>
            <div className="dm-kpi__value">{metrics.delivered}</div>
            <div className="dm-kpi__caption">Nghiệm thu thành công</div>
          </div>
        </section>

        <section className="dm-ledger" aria-label="Danh sách chuyến giao hàng">
          <div className="dm-ledger__header">
            <div>
              <h2 className="dm-ledger__title">Sổ điều phối vận chuyển</h2>
              <p className="dm-ledger__subtitle">
                Quản lý từng đợt giao hàng, thông tin tài xế và đối soát bằng chứng PoD
              </p>
            </div>
          </div>

          <div className="dm-filter-bar">
            <FilterBar
              search={deliveryPage.search}
              onSearchChange={deliveryPage.setSearch}
              status={deliveryPage.query.status}
              onStatusChange={deliveryPage.setStatus}
              onReset={deliveryPage.reset}
              placeholder="Tìm mã giao hàng hoặc mã vận đơn"
              statusOptions={Object.entries(STATUS_TAG_MAP).map(([value, meta]) => ({
                value,
                label: meta.text,
              }))}
            />
          </div>

          <div className="dm-table">
            <Table
              columns={columns}
              dataSource={deliveries.map((d, i) => ({ ...d, key: d.id || d.key || i }))}
              loading={loading}
              size="middle"
              tableLayout="fixed"
              pagination={{
                current: deliveryPage.query.page,
                pageSize: deliveryPage.query.pageSize,
                total: deliveryPage.totalCount,
                onChange: deliveryPage.setPage,
                showSizeChanger: true,
                pageSizeOptions: [10, 20, 50, 100],
              }}
              scroll={{ x: 960 }}
            />
          </div>
        </section>

        <CreateDeliveryModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSuccess={fetchData}
          contracts={contracts}
        />

        <DeliveryDetailDrawer
          open={detailDrawerOpen}
          delivery={detailDelivery}
          onClose={() => setDetailDrawerOpen(false)}
          onUpdated={fetchData}
          onOpenShareModal={(record) => handleOpenShare(record)}
        />

        <PoDViewerModal
          open={podModalOpen}
          onClose={() => setPodModalOpen(false)}
          delivery={selectedDelivery}
          proofs={currentProofs}
        />

        <SharePoDLinkModal
          open={shareModalOpen}
          onClose={() => {
            setShareModalOpen(false);
            fetchData();
          }}
          delivery={shareDelivery}
        />
      </div>
    </ColonyAdminLayout>
  );
}
