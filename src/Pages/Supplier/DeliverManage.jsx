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
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  ReloadOutlined,
  TruckOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import AssignDriverModal from '../../components/delivery/AssignDriverModal';
import CreateDeliveryModal from '../../components/delivery/CreateDeliveryModal';
import DeliveryDetailDrawer from '../../components/delivery/DeliveryDetailDrawer';
import SharePoDLinkModal from '../../components/delivery/SharePoDLinkModal';
import FilterBar from '../../components/common/FilterBar';
import { TruncatedTooltip } from '../../components/common/TableCellHelpers';
import usePagedList from '../../hooks/usePagedList';
import contractService from '../../services/contractService';
import deliveryService from '../../services/deliveryService';
import orderService from '../../services/orderService';
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
  const [orders, setOrders] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [detailDelivery, setDetailDelivery] = useState(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assignDelivery, setAssignDelivery] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareDelivery, setShareDelivery] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      deliveryPage.refresh();
      const [contractData, orderData] = await Promise.all([
        contractService.listMine().catch(() => []),
        orderService.listSupplierOrders().catch(() => []),
      ]);
      setContracts(Array.isArray(contractData) ? contractData : []);
      setOrders(Array.isArray(orderData) ? orderData : orderData?.items || []);
    } catch {
      message.error('Không thể tải dữ liệu giao vận.');
    }
  }, [deliveryPage, message]);

  useEffect(() => {
    let ignore = false;
    const run = async () => {
      try {
        const [contractData, orderData] = await Promise.all([
          contractService.listMine().catch(() => []),
          orderService.listSupplierOrders().catch(() => []),
        ]);
        if (!ignore) {
          setContracts(Array.isArray(contractData) ? contractData : []);
          setOrders(Array.isArray(orderData) ? orderData : orderData?.items || []);
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

  const handleOpenAssign = (record) => {
    setAssignDelivery(record);
    setAssignModalOpen(true);
  };

  const handleOpenShare = (record) => {
    setShareDelivery(record);
    setShareModalOpen(true);
  };

  const [detailRefreshKey, setDetailRefreshKey] = useState(0);

  const handleAfterDeliveryChange = () => {
    fetchData();
    setDetailRefreshKey((k) => k + 1);
  };

  const columns = [
    {
      title: 'Chuyến giao & Đợt',
      dataIndex: 'deliveryNumber',
      key: 'deliveryNumber',
      width: 175,
      render: (text, r) => {
        const code = text || r.deliveryCode || 'DEL-N/A';
        return (
          <div className="max-w-[160px]">
            <Tooltip title={code} color="#231a18" placement="topLeft">
              <button
                type="button"
                className="dm-delivery-link"
                onClick={() => handleOpenDetail(r)}
              >
                {code}
              </button>
            </Tooltip>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Tag color="purple" className="m-0 text-[11px]">
                {r.batchNumber ? `Đợt ${r.batchNumber}${r.totalBatches ? `/${r.totalBatches}` : ''}` : 'Đợt 1'}
              </Tag>
              <span className="dm-cell-muted">
                {r.deliveryType === 'SelfArranged' ? 'Xe xưởng' : 'Đơn vị VC'}
              </span>
            </div>
            {r.createdAt && (
              <div className="dm-cell-muted">{formatDateTime(r.createdAt)}</div>
            )}
          </div>
        );
      },
    },
    {
      title: 'Đơn hàng / Hợp đồng',
      key: 'reference',
      width: 190,
      render: (_, r) => {
        const refCode = r.orderNumber || r.contractNumber || r.contractNo || 'Chuyến giao B2B';
        const customerName = r.customerName || 'Khách hàng doanh nghiệp';
        return (
          <div className="max-w-[175px]">
            <TruncatedTooltip text={refCode} className="dm-ref-code" />
            <TruncatedTooltip text={customerName} className="dm-cell-muted" />
          </div>
        );
      },
    },
    {
      title: 'Tài xế & Nhận chuyến',
      key: 'driver',
      width: 230,
      render: (_, r) => (
        <div className="space-y-1">
          {r.driverName ? (
            <div>
              <div className="font-semibold text-stone-800 text-xs">
                {r.driverName} {r.driverPhone ? `· ${r.driverPhone}` : ''}
              </div>
              <div className="text-[11px] text-stone-500 font-mono">
                {r.vehiclePlate ? `BS: ${r.vehiclePlate}` : 'Xe xưởng'}
                {r.shareCode ? ` · Mã: ${r.shareCode}` : ''}
              </div>
              <div className="mt-0.5">
                {r.driverClaimedAt ? (
                  <Tag color="green" className="m-0 text-[10px]">
                    Đã nhận lúc {formatDateTime(r.driverClaimedAt)}
                  </Tag>
                ) : (
                  <Tag color="orange" className="m-0 text-[10px]">
                    Chưa có tài xế nhận
                  </Tag>
                )}
              </div>
            </div>
          ) : (
            <Tag color="default" className="text-xs">
              Chưa có tài xế nhận
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Điểm nhận & đại diện',
      key: 'destination',
      width: 250,
      render: (_, r) => {
        const addressText = r.toAddress || 'Kho nhận';
        const contactText = `${r.recipientName || 'Thủ kho'}${r.recipientPhone ? ` (${r.recipientPhone})` : ''}`;
        return (
          <div className="max-w-[235px]">
            <TruncatedTooltip text={addressText} className="dm-address-main" />
            <div className="dm-cell-muted flex items-center gap-1 min-w-0">
              <UserOutlined className="shrink-0 text-[#9a6b16]" />
              <div className="min-w-0 flex-1">
                <TruncatedTooltip text={contactText} />
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Lịch giao & vận đơn',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
      width: 160,
      render: (d, r) => {
        const tracking = r.trackingCode || 'Xe xưởng';
        return (
          <div className="max-w-[145px]">
            <div className="inline-flex items-center gap-1.5 text-xs tabular-nums text-[#231a18] whitespace-nowrap">
              <ClockCircleOutlined className="text-[#9a6b16]" />
              <span>{d || r.expectedDate || 'Đang cập nhật'}</span>
            </div>
            <div>
              <Tooltip title={tracking} color="#231a18" placement="topLeft">
                <span className="dm-tracking-pill">{tracking}</span>
              </Tooltip>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Trạng thái & PoD',
      dataIndex: 'status',
      key: 'status',
      width: 145,
      render: (status, r) => {
        const config = STATUS_TAG_MAP[status] || { text: status, color: 'default' };
        return (
          <div>
            <Tag color={config.color}>{config.text}</Tag>
            <div className="dm-cell-muted">{r.proofCount || 0} ảnh PoD</div>
          </div>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'actions',
      align: 'center',
      width: 110,
      render: (_, record) => (
        <Button
          size="small"
          icon={<EyeOutlined />}
          onClick={() => handleOpenDetail(record)}
          style={{ whiteSpace: 'nowrap' }}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <ColonyAdminLayout
      role="Supplier"
      activeKey="nha-cung-cap/quan-ly-giao-hang"
      onNavigate={onNavigate}
      title="Giao hàng & PoD"
      subtitle="Điều phối xe nội bộ hoặc hãng vận chuyển, chia nhiều đợt giao và theo dõi bằng chứng giao hàng."
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
              <TruckOutlined className="text-[#8c1524]" />
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
              scroll={{ x: 1300 }}
            />
          </div>
        </section>

        <CreateDeliveryModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSuccess={fetchData}
          contracts={contracts}
          orders={orders}
        />

        <DeliveryDetailDrawer
          open={detailDrawerOpen}
          delivery={detailDelivery}
          refreshKey={detailRefreshKey}
          onClose={() => setDetailDrawerOpen(false)}
          onUpdated={fetchData}
          onOpenShareModal={(record) => handleOpenShare(record)}
          onOpenAssignDriver={(record) => handleOpenAssign(record)}
        />

        <AssignDriverModal
          open={assignModalOpen}
          onClose={() => {
            setAssignModalOpen(false);
            handleAfterDeliveryChange();
          }}
          delivery={assignDelivery}
          onSuccess={handleAfterDeliveryChange}
        />

        <SharePoDLinkModal
          open={shareModalOpen}
          onClose={() => {
            setShareModalOpen(false);
            handleAfterDeliveryChange();
          }}
          delivery={shareDelivery}
        />
      </div>
    </ColonyAdminLayout>
  );
}
