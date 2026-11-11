import { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Tag,
  Space,
  Pagination,
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
import CustomerBreadcrumbBar from '../../components/layout/CustomerBreadcrumbBar';
import CustomerFooter from '../../components/layout/CustomerFooter';
import PoDViewerModal from '../../components/delivery/PoDViewerModal';
import deliveryService from '../../services/deliveryService';
import usePagedList from '../../hooks/usePagedList';
import FilterBar from '../../components/common/FilterBar';
import '../../styles/journey-pages.css';

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
  const deliveryPage = usePagedList(deliveryService.listMinePaged);
  const deliveries = deliveryPage.items;
  const loading = deliveryPage.loading;
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [currentProofs, setCurrentProofs] = useState([]);
  const [podModalOpen, setPodModalOpen] = useState(false);

  const fetchDeliveries = deliveryPage.refresh;
  useEffect(() => { if (deliveryPage.error) message.error(deliveryPage.error.message); }, [deliveryPage.error]);

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
      title: 'Mã chuyến giao',
      dataIndex: 'deliveryNumber',
      key: 'deliveryNumber',
      render: (text, r) => (
        <div>
          <span className="journey-delivery-code">{text || r.deliveryCode || 'Chưa có mã'}</span>
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
      render: (text, r) => (
        <div>
          <strong className="text-slate-800">{text || r.contractNo || 'HĐ-B2B'}</strong>
          <div className="text-xs text-slate-500 truncate max-w-xs">{r.supplierName || 'Nhà cung cấp'}</div>
        </div>
      ),
    },
    {
      title: 'Điểm nhận & người nhận',
      key: 'destination',
      render: (_, r) => (
        <div className="text-xs">
          <div className="font-medium text-slate-800 truncate max-w-xs">{r.toAddress || 'Tại kho khách hàng'}</div>
          <div className="text-slate-500">
            {r.recipientName || 'Chưa cập nhật'}{r.recipientPhone ? ` · ${r.recipientPhone}` : ''}
          </div>
        </div>
      ),
    },
    {
      title: 'Mã vận đơn',
      dataIndex: 'trackingCode',
      key: 'trackingCode',
      render: (t) => (
        <Tag color="cyan" className="font-mono">
          {t || 'Nội bộ xưởng'}
        </Tag>
      ),
    },
    {
      title: 'Ngày dự kiến',
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
      title: 'Trạng thái',
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
      title: 'Thao tác',
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
              <Tooltip title="Mở giao diện tài xế nộp ảnh và chữ ký bàn giao">
                <Button
                  size="small"
                  icon={<MobileOutlined />}
                  onClick={() => {
                    window.location.hash = `driver-delivery-view?id=${record.id || record.key}`;
                  }}
                  className="text-xs border-slate-300"
                >
                  Giao diện tài xế
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
                Xem mốc nghiệm thu
              </Button>
            )}
          </Space>
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
            scroll={{ x: 1200 }}
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
