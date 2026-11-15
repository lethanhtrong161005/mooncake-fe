import { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Tag,
  Pagination,
  message,
} from 'antd';
import {
  CarOutlined,
  CameraOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  MobileOutlined,
  FileDoneOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import CustomerBreadcrumbBar from '../../components/layout/CustomerBreadcrumbBar';
import CustomerFooter from '../../components/layout/CustomerFooter';
import PoDViewerModal from '../../components/delivery/PoDViewerModal';
import deliveryService from '../../services/deliveryService';
import usePagedList from '../../hooks/usePagedList';
import FilterBar from '../../components/common/FilterBar';
import { signalRManager } from '../../services/signalrService';
import RowActionMenu from '../../components/common/RowActionMenu';
import { TruncatedTooltip } from '../../components/common/TableCellHelpers';
import '../../styles/journey-pages.css';

const STATUS_TAG_MAP = {
  Pending: { text: 'Chờ xếp xe', color: 'default' },
  Confirmed: { text: 'Đã xác nhận', color: 'blue' },
  PickedUp: { text: 'Đã bốc lên xe', color: 'geekblue' },
  InTransit: { text: 'Đang vận chuyển', color: 'gold' },
  AwaitingCustomerConfirmation: { text: 'Chờ bạn xác nhận nhận hàng', color: 'cyan' },
  Delivered: { text: 'Đã bàn giao (PoD)', color: 'green' },
  Failed: { text: 'Giao thất bại', color: 'red' },
  Returned: { text: 'Đã chuyển hoàn', color: 'volcano' },
  in_transit: { text: 'Đang vận chuyển', color: 'gold' },
  delivered: { text: 'Đã bàn giao (PoD)', color: 'green' },
};

export default function DeliveryPoD({ onNavigate }) {
  const deliveryPage = usePagedList(deliveryService.listMinePaged);
  const deliveries = deliveryPage.items;
  const loading = deliveryPage.loading;
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [currentProofs, setCurrentProofs] = useState([]);
  const [podModalOpen, setPodModalOpen] = useState(false);

  const fetchDeliveries = deliveryPage.refresh;
  useEffect(() => { if (deliveryPage.error) message.error(deliveryPage.error.message); }, [deliveryPage.error]);
  useEffect(() => {
    const refreshOnDeliveryCreated = (event) => {
      if (event?.category === 'delivery' || event?.type?.startsWith('delivery.')) fetchDeliveries();
    };
    signalRManager.on('ReceiveNotification', refreshOnDeliveryCreated);
    return () => signalRManager.off('ReceiveNotification', refreshOnDeliveryCreated);
  }, [fetchDeliveries]);

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
      await deliveryService.confirmReceipt(record.id || record.key);
      message.success('Đã xác nhận nhận đủ hàng nguyên vẹn! Hệ thống đã kích hoạt giải phóng đợt thanh toán Milestone tương ứng.');
      fetchDeliveries();
    } catch (error) {
      message.error(error.response?.data?.message || error.message || 'Không thể cập nhật trạng thái nhận hàng.');
    }
  };

  const columns = [
    {
      title: 'Mã chuyến giao',
      dataIndex: 'deliveryNumber',
      key: 'deliveryNumber',
      width: 170,
      render: (text, r) => (
        <div className="max-w-[155px]">
          <TruncatedTooltip
            text={text || r.deliveryCode || 'Chưa có mã'}
            className="journey-delivery-code font-semibold text-[#7d1322]"
          />
          <div className="text-[11px] text-slate-400">
            {r.deliveryType === 'SelfArranged' ? 'Xưởng tự chở' : 'Đơn vị VC'}
          </div>
        </div>
      ),
    },
    {
      title: 'Hợp đồng / đơn hàng',
      dataIndex: 'contractNumber',
      key: 'contractNumber',
      width: 205,
      render: (text, r) => {
        const refCode = text || r.contractNo || 'HĐ-B2B';
        const supplier = r.supplierName || 'Nhà cung cấp';
        return (
          <div className="max-w-[190px]">
            <TruncatedTooltip
              text={refCode}
              tooltipContent={`${refCode} · ${supplier}`}
              className="font-semibold text-slate-800"
            />
            <TruncatedTooltip
              text={supplier}
              tooltipContent={`${refCode} · ${supplier}`}
              className="text-xs text-slate-500"
            />
          </div>
        );
      },
    },
    {
      title: 'Điểm nhận & người nhận',
      key: 'destination',
      width: 250,
      render: (_, r) => {
        const address = r.toAddress || 'Tại kho khách hàng';
        const recipient = `${r.recipientName || 'Chưa cập nhật'}${r.recipientPhone ? ` · ${r.recipientPhone}` : ''}`;
        return (
          <div className="max-w-[235px] text-xs">
            <TruncatedTooltip
              text={address}
              tooltipContent={`${recipient} — ${address}`}
              className="font-medium text-slate-800"
            />
            <TruncatedTooltip
              text={recipient}
              tooltipContent={`${recipient} — ${address}`}
              className="text-slate-500"
            />
          </div>
        );
      },
    },
    {
      title: 'Mã vận đơn',
      dataIndex: 'trackingCode',
      key: 'trackingCode',
      width: 165,
      render: (t) => (
        <Tag color="cyan" className="m-0 max-w-[150px] truncate align-bottom font-mono">
          <TruncatedTooltip text={t || 'Nội bộ xưởng'} className="font-mono text-xs" />
        </Tag>
      ),
    },
    {
      title: 'Ngày dự kiến',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
      width: 120,
      render: (d, r) => (
        <span className="whitespace-nowrap text-xs tabular-nums text-slate-600">
          <ClockCircleOutlined className="mr-1 text-slate-400" />
          {d || r.expectedDate || 'Đang cập nhật'}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 165,
      render: (status) => {
        const config = STATUS_TAG_MAP[status] || { text: status, color: 'default' };
        return (
          <Tag color={config.color} className="m-0 whitespace-nowrap px-2.5 py-0.5 text-xs font-semibold">
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'actions',
      align: 'center',
      width: 84,
      render: (_, record) => {
        const isDelivered = record.status === 'Delivered' || record.status === 'delivered';
        return (
          <RowActionMenu
            ariaLabel={`Thao tác chuyến giao ${record.deliveryNumber || record.deliveryCode || ''}`}
            actions={[
              {
                key: 'pod',
                label: 'Xem biên bản PoD',
                icon: <CameraOutlined />,
                onClick: () => handleOpenPod(record),
              },
              {
                key: 'driver',
                label: 'Mở giao diện tài xế',
                icon: <MobileOutlined />,
                show: !isDelivered,
                onClick: () => onNavigate?.(`driver-delivery-view?id=${record.id || record.key}`),
              },
              {
                key: 'confirm',
                label: 'Xác nhận đã nhận hàng',
                icon: <CheckCircleOutlined />,
                show: !isDelivered && record.status === 'AwaitingCustomerConfirmation',
                confirmTitle: `Xác nhận đã nhận đủ hàng cho chuyến ${record.deliveryNumber || ''}?`,
                confirmContent: 'Hệ thống sẽ giải phóng đợt thanh toán Milestone tương ứng cho xưởng.',
                onClick: () => handleConfirmReceived(record),
              },
              {
                key: 'milestones',
                label: 'Xem mốc nghiệm thu',
                icon: <FileDoneOutlined />,
                show: isDelivered,
                onClick: () => onNavigate?.('hop-dong-tien-do'),
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <div className="journey-page journey-page--delivery">
      <CustomerHeader activeKey="giao-hang-pod" onNavigate={onNavigate} />
      <CustomerBreadcrumbBar onNavigate={onNavigate} items={[{ label: 'Giao hàng & bằng chứng' }]} />
      <main className="journey-page__main">
        <section className="journey-hero journey-hero--delivery" aria-labelledby="delivery-title">
          <div>
            <span className="journey-hero__label">Theo dõi đơn hàng doanh nghiệp</span>
            <h1 id="delivery-title">Từng chuyến giao, rõ từng lần bàn giao.</h1>
            <p>Xem lộ trình và đối chiếu ảnh, chữ ký, thông tin người nhận của mỗi chuyến giao.</p>
          </div>
          <div className="journey-hero__delivery-route" aria-hidden="true"><span>Xuất xưởng</span><CarOutlined /><span>Đến điểm nhận</span></div>
        </section>

        <div className="journey-note"><CameraOutlined aria-hidden="true" /><span><strong>Kiểm tra bằng chứng trước khi xác nhận.</strong> Mở PoD để xem ảnh và chữ ký được nộp cho chuyến giao.</span></div>

        <section className="journey-section" aria-labelledby="delivery-list-title">
          <div className="journey-section__head"><div><h2 id="delivery-list-title">Các chuyến giao</h2><p>{loading ? 'Đang tải chuyến giao…' : `${deliveryPage.totalCount} chuyến giao`}</p></div><Button icon={<ReloadOutlined />} onClick={fetchDeliveries} loading={loading}>Tải lại</Button></div>
          <div className="journey-filters">
          <FilterBar search={deliveryPage.search} onSearchChange={deliveryPage.setSearch}
            status={deliveryPage.query.status} onStatusChange={deliveryPage.setStatus}
            onReset={deliveryPage.reset} placeholder="Tìm mã giao hàng"
            statusOptions={Object.keys(STATUS_TAG_MAP).filter((value) => value[0] === value[0].toUpperCase())
              .map((value) => ({ value, label: STATUS_TAG_MAP[value].text }))} />
          </div>
          <div className="journey-desktop-table">
          <Table
            columns={columns}
            dataSource={deliveries.map((d, i) => ({ ...d, key: d.id || d.key || i }))}
            loading={loading}
            pagination={{ current: deliveryPage.query.page, pageSize: deliveryPage.query.pageSize,
              total: deliveryPage.totalCount, onChange: deliveryPage.setPage, showSizeChanger: true,
              pageSizeOptions: [10, 20, 50, 100] }}
            scroll={{ x: 1159 }}
            locale={{ emptyText: <div className="journey-empty"><CarOutlined /><strong>{deliveryPage.search || deliveryPage.query.status ? 'Không tìm thấy chuyến giao' : 'Chưa có chuyến giao'}</strong><p>{deliveryPage.search || deliveryPage.query.status ? 'Thử đổi từ khóa hoặc trạng thái.' : 'Khi xưởng tạo chuyến giao, hành trình sẽ xuất hiện ở đây.'}</p><Button onClick={deliveryPage.search || deliveryPage.query.status ? deliveryPage.reset : () => onNavigate?.('hop-dong-tien-do')}>{deliveryPage.search || deliveryPage.query.status ? 'Xóa bộ lọc' : 'Xem hợp đồng'}</Button></div> }}
          />
          </div>
          <div className="journey-mobile-list">
            {loading ? <p className="journey-empty">Đang tải chuyến giao…</p> : deliveries.length ? <>
              {deliveries.map((record, index) => <article className="journey-record" key={record.id || record.key || index}>
                <div className="journey-record__top"><strong>{record.deliveryNumber || record.deliveryCode || 'Chuyến giao'}</strong><Tag color={STATUS_TAG_MAP[record.status]?.color || 'default'}>{STATUS_TAG_MAP[record.status]?.text || record.status}</Tag></div>
                <h3>{record.contractNumber || record.contractNo || 'Đơn hàng doanh nghiệp'}</h3>
                <dl><div><dt>Điểm nhận</dt><dd>{record.toAddress || 'Tại kho khách hàng'}</dd></div><div><dt>Người nhận</dt><dd>{record.recipientName || 'Chưa cập nhật'}</dd></div><div><dt>Dự kiến</dt><dd>{record.scheduledDate || record.expectedDate || 'Đang cập nhật'}</dd></div><div><dt>Mã vận đơn</dt><dd>{record.trackingCode || 'Nội bộ xưởng'}</dd></div></dl>
                <div className="journey-record__actions">{columns[6].render(null, record)}</div>
              </article>)}
              {deliveryPage.totalCount > deliveryPage.query.pageSize && <Pagination className="journey-mobile-pagination" size="small" current={deliveryPage.query.page} pageSize={deliveryPage.query.pageSize} total={deliveryPage.totalCount} onChange={deliveryPage.setPage} />}
            </> : <div className="journey-empty"><CarOutlined /><strong>{deliveryPage.search || deliveryPage.query.status ? 'Không tìm thấy chuyến giao' : 'Chưa có chuyến giao'}</strong><p>{deliveryPage.search || deliveryPage.query.status ? 'Thử đổi từ khóa hoặc trạng thái.' : 'Khi xưởng tạo chuyến giao, hành trình sẽ xuất hiện ở đây.'}</p><Button onClick={deliveryPage.search || deliveryPage.query.status ? deliveryPage.reset : () => onNavigate?.('hop-dong-tien-do')}>{deliveryPage.search || deliveryPage.query.status ? 'Xóa bộ lọc' : 'Xem hợp đồng'}</Button></div>}
          </div>
        </section>

        <PoDViewerModal
          open={podModalOpen}
          onClose={() => setPodModalOpen(false)}
          delivery={selectedDelivery}
          proofs={currentProofs}
        />
      </main>
      <CustomerFooter onNavigate={onNavigate} />
    </div>
  );
}
