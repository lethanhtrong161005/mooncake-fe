import { useEffect, useMemo, useState } from 'react';
import {
  Alert, Button, Card, Col, DatePicker, Descriptions, Drawer, Form, Input,
  InputNumber, Modal, Pagination, Row, Select, Space, Spin, Table, Tag, Typography, message,
} from 'antd';
import { FileProtectOutlined, PlusOutlined, ReloadOutlined, SolutionOutlined, TeamOutlined } from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import CustomerBreadcrumbBar from '../../components/layout/CustomerBreadcrumbBar';
import CustomerFooter from '../../components/layout/CustomerFooter';
import rfqService from '../../services/rfqService';
import usePagedList from '../../hooks/usePagedList';
import FilterBar from '../../components/common/FilterBar';
import dayjs from 'dayjs';
import { signalRManager } from '../../services/signalrService';
import '../../styles/rfq-page.css';

const minDeliveryDate = () => dayjs().add(7, 'day').startOf('day');
const minBidDeadline = () => dayjs().add(1, 'day');
const formatBudgetInput = (value) => {
  if (value === undefined || value === null || value === '') return '';
  const amount = Number(value);
  if (!Number.isFinite(amount)) return value;
  return amount.toLocaleString('en-US', { maximumFractionDigits: 2 });
};
function BudgetInput({ value, onChange, ...props }) {
  const updateValue = (event) => {
    const next = event.target.value;
    const input = event.target;
    const cursor = input.selectionStart ?? next.length;
    const digitsBeforeCursor = next.slice(0, cursor).replace(/\D/g, '').length;
    const normalized = next.replace(/,/g, '').replace(/[^\d.]/g, '').trim();
    const amount = normalized === '' ? null : Number(normalized);
    if (normalized === '' || Number.isFinite(amount)) onChange(amount);

    const formatted = normalized ? formatBudgetInput(normalized) : '';
    requestAnimationFrame(() => {
      const element = input;
      let nextCursor = 0;
      let digits = 0;
      while (nextCursor < formatted.length && digits < digitsBeforeCursor) {
        if (/\d/.test(formatted[nextCursor])) digits += 1;
        nextCursor += 1;
      }
      element.setSelectionRange(nextCursor, nextCursor);
    });
  };

  return <Input {...props} inputMode="decimal" value={formatBudgetInput(value)} onChange={updateValue} />;
}

const { Title, Text } = Typography;
const { TextArea } = Input;
const money = (amount) => `${Number(amount || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) => error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.';
const statusColor = { Draft: 'default', Open: 'processing', InNegotiation: 'warning', Closed: 'gold', Awarded: 'success', Cancelled: 'error' };
const statusLabel = {
  Draft: 'Bản nháp',
  Open: 'Đang nhận báo giá',
  InNegotiation: 'Chờ xưởng xác nhận',
  Closed: 'Đã đóng',
  Awarded: 'Đã chọn xưởng',
  Cancelled: 'Đã hủy',
};
const bidStatusLabel = {
  Submitted: 'Đã gửi',
  Selected: 'Đã được chọn',
  Withdrawn: 'Đã rút',
  Rejected: 'Không được chọn',
};
const formatDeadline = (value) => value ? dayjs(value).format('DD/MM/YYYY · HH:mm') : 'Chưa có hạn';

export default function BiddingAndQuoteComparison({ onNavigate }) {
  const rfqPage = usePagedList(rfqService.listMinePaged);
  const rfqs = rfqPage.items;
  const loading = rfqPage.loading;
  const [createOpen, setCreateOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [selectedRfq, setSelectedRfq] = useState(null);
  const [bids, setBids] = useState([]);
  const [supplierProfiles, setSupplierProfiles] = useState([]);
  const [detailBid, setDetailBid] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [form] = Form.useForm();
  const [inviteForm] = Form.useForm();
  const openCreate = () => {
    form.resetFields();
    setCreateOpen(true);
  };

  const loadRfqs = rfqPage.refresh;
  useEffect(() => { if (rfqPage.error) message.error(errorMessage(rfqPage.error)); }, [rfqPage.error]);
  useEffect(() => {
    const refreshRfqs = (notification) => {
      if (notification?.type?.startsWith('bid.') || notification?.type?.startsWith('rfq.')) loadRfqs();
    };
    signalRManager.on('ReceiveNotification', refreshRfqs);
    signalRManager.on('MarketplaceChanged', refreshRfqs);
    return () => {
      signalRManager.off('ReceiveNotification', refreshRfqs);
      signalRManager.off('MarketplaceChanged', refreshRfqs);
    };
  }, [loadRfqs]);

  const createRfq = async (values) => {
    setActionLoading(true);
    try {
      const draft = await rfqService.create({
        title: values.title,
        description: values.description || null,
        deliveryAddress: values.deliveryAddress,
        deliveryDateRequired: values.deliveryDateRequired.format('YYYY-MM-DD'),
        budgetRangeMin: values.budgetRangeMin || null,
        budgetRangeMax: values.budgetRangeMax || null,
        bidDeadline: values.bidDeadline.toDate().toISOString(),
        items: values.items.map((item) => ({
          productName: item.productName,
          description: item.description || null,
          quantity: item.quantity,
          unit: item.unit,
          targetPrice: item.targetPrice || null,
          specifications: item.specifications || null,
          packagingRequirements: item.packagingRequirements || null,
          needsCustomPackaging: Boolean(item.needsCustomPackaging),
        })),
      });
      await rfqService.publish(draft.id);
      message.success(`Đã phát hành ${draft.rfqNumber}.`);
      setCreateOpen(false);
      await loadRfqs();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const openCompare = async (rfq) => {
    setSelectedRfq(rfq);
    setCompareOpen(true);
    setActionLoading(true);
    try {
      const [nextBids, nextSuppliers] = await Promise.all([
        rfqService.listBids(rfq.id), rfqService.suggestedSuppliers(rfq.id),
      ]);
      setBids(nextBids);
      setSupplierProfiles(nextSuppliers);
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const openInvite = async (rfq) => {
    setSelectedRfq(rfq);
    setInviteOpen(true);
    setSuggestions([]);
    inviteForm.resetFields();
    setActionLoading(true);
    try {
      setSuggestions(await rfqService.suggestedSuppliers(rfq.id));
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const inviteSuppliers = async ({ supplierUserIds }) => {
    setActionLoading(true);
    try {
      await rfqService.invite(selectedRfq.id, supplierUserIds);
      message.success('Đã gửi lời mời tham gia báo giá.');
      setInviteOpen(false);
      await loadRfqs();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const acceptBid = async (bid) => {
    setActionLoading(true);
    try {
      const result = await rfqService.acceptBid(selectedRfq.id, bid.id,
        'Báo giá đáp ứng tiến độ và yêu cầu kỹ thuật.');
      message.success(result.message || 'Đã gửi yêu cầu cho xưởng xác nhận.');
      setCompareOpen(false);
      await loadRfqs();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  const confirmBidSelection = (bid) => {
    const deadlineNotPassed = selectedRfq?.bidDeadline && new Date(selectedRfq.bidDeadline) > new Date();
    const submit = () => acceptBid(bid);
    if (!deadlineNotPassed) return submit();
    Modal.confirm({
      title: 'Chọn xưởng trước hạn báo giá?',
      content: 'Yêu cầu sẽ tạm đóng và không nhận thêm báo giá. Xưởng được chọn sẽ nhận thông báo; hợp đồng chỉ được tạo sau khi xưởng xác nhận.',
      okText: 'Gửi yêu cầu chọn',
      cancelText: 'Xem lại',
      onOk: submit,
    });
  };

  const bestBidId = useMemo(() => bids.filter((bid) => !bid.isExpired && bid.status === 'Submitted')
    .sort((left, right) => Number(left.totalPrice) - Number(right.totalPrice))[0]?.id, [bids]);
  const supplierForBid = (bid) => supplierProfiles.find((supplier) => supplier.supplierProfileId === bid.supplierId);
  const renderActions = (item) => <Space wrap className="rfq-page__row-actions">
    {item.status === 'Open' && <Button icon={<TeamOutlined />} onClick={() => openInvite(item)}>Mời xưởng</Button>}
    <Button type="primary" icon={<SolutionOutlined />} disabled={!item.bidCount} onClick={() => openCompare(item)}>So sánh</Button>
  </Space>;
  const columns = [
    {
      title: 'Yêu cầu', dataIndex: 'title', key: 'title',
      render: (value, item) => <div className="rfq-page__request-cell">
        <span className="rfq-page__request-number">{item.rfqNumber}</span>
        <strong>{value}</strong>
        <span>{item.items?.length || 0} mặt hàng</span>
      </div>,
    },
    { title: 'Ngân sách dự kiến', key: 'budget', render: (_, item) => <span className="rfq-page__budget">{item.budgetRangeMin || item.budgetRangeMax ? `${money(item.budgetRangeMin)} – ${money(item.budgetRangeMax)}` : 'Chưa đặt ngân sách'}</span> },
    { title: 'Hạn nhận báo giá', dataIndex: 'bidDeadline', key: 'bidDeadline', render: formatDeadline },
    { title: 'Báo giá', dataIndex: 'bidCount', key: 'bidCount', align: 'center', render: (value) => <span className="rfq-page__bid-count">{value || 0}</span> },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (value) => <Tag color={statusColor[value]}>{statusLabel[value] || value}</Tag> },
    { title: 'Thao tác', key: 'actions', render: (_, item) => renderActions(item) },
  ];
  const hasFilters = Boolean(rfqPage.search || rfqPage.query.status);
  const emptyContent = <div className="rfq-page__empty">
    <div className="rfq-page__empty-icon" aria-hidden="true"><FileProtectOutlined /></div>
    <h3>{hasFilters ? 'Không tìm thấy yêu cầu phù hợp' : 'Bắt đầu với một yêu cầu báo giá'}</h3>
    <p>{hasFilters
      ? 'Thử đổi từ khóa hoặc trạng thái để xem các yêu cầu khác.'
      : 'Mô tả số lượng, ngân sách và thời gian giao hàng. Các xưởng phù hợp sẽ gửi báo giá để bạn so sánh.'}</p>
    <Button type="primary" onClick={hasFilters ? rfqPage.reset : openCreate}>
      {hasFilters ? 'Xóa bộ lọc' : 'Tạo RFQ đầu tiên'}
    </Button>
  </div>;

  return <div className="rfq-page">
    <CustomerHeader activeKey="so-sanh-bao-gia" onNavigate={onNavigate} />
    <CustomerBreadcrumbBar onNavigate={onNavigate} items={[{ label: 'So sánh báo giá' }]} />
    <main className="rfq-page__main">
      <section className="rfq-page__hero" aria-labelledby="rfq-page-title">
        <div className="rfq-page__hero-copy">
          <span className="rfq-page__hero-kicker">Dành cho đơn hàng doanh nghiệp</span>
          <h1 id="rfq-page-title">Chọn đúng xưởng cho mùa quà của bạn.</h1>
          <p>Gửi nhu cầu một lần, nhận báo giá từ các xưởng đã xác minh và chọn phương án phù hợp với ngân sách, tiến độ.</p>
          <Button type="primary" size="large" icon={<PlusOutlined />} onClick={openCreate}>Tạo RFQ</Button>
        </div>
        <div className="rfq-page__hero-process" aria-label="Quy trình báo giá">
          <div><span>01</span><p>Tạo yêu cầu <small>Cho biết mặt hàng, số lượng và hạn giao.</small></p></div>
          <div><span>02</span><p>Nhận báo giá <small>Mời xưởng hoặc chờ xưởng gửi đề xuất.</small></p></div>
          <div><span>03</span><p>So sánh và chọn <small>Xem giá, tiến độ và năng lực từng xưởng.</small></p></div>
        </div>
      </section>

      <section className="rfq-page__workspace" aria-labelledby="rfq-page-list-title">
        <div className="rfq-page__section-heading">
          <div>
            <h2 id="rfq-page-list-title">Yêu cầu của bạn</h2>
            <p>{loading ? 'Đang tải yêu cầu…' : `${rfqPage.totalCount} yêu cầu báo giá`}</p>
          </div>
          <Button icon={<ReloadOutlined />} onClick={loadRfqs} loading={loading}>Tải lại</Button>
        </div>
        <div className="rfq-page__privacy-note"><FileProtectOutlined aria-hidden="true" /> <span><strong>Báo giá được niêm phong.</strong> Chỉ doanh nghiệp tạo yêu cầu mới xem được toàn bộ báo giá.</span></div>
        <div className="rfq-page__filters">
          <FilterBar search={rfqPage.search} onSearchChange={rfqPage.setSearch}
            status={rfqPage.query.status} onStatusChange={rfqPage.setStatus} onReset={rfqPage.reset}
            placeholder="Tìm mã RFQ hoặc tiêu đề"
            statusOptions={Object.keys(statusColor).map((value) => ({ value, label: statusLabel[value] }))} />
        </div>
        <div className="rfq-page__desktop-list">
          <Table rowKey="id" loading={loading} columns={columns} dataSource={rfqs} scroll={{ x: 1050 }}
            locale={{ emptyText: emptyContent }}
            pagination={{ current: rfqPage.query.page, pageSize: rfqPage.query.pageSize, total: rfqPage.totalCount,
              onChange: rfqPage.setPage, showSizeChanger: true, pageSizeOptions: [10, 20, 50, 100] }} />
        </div>
        <div className="rfq-page__mobile-list">
          {loading ? <div className="rfq-page__mobile-loading"><Spin description="Đang tải yêu cầu…" /></div>
            : rfqs.length ? <>
              {rfqs.map((item) => <article className="rfq-page__mobile-card" key={item.id}>
                <div className="rfq-page__mobile-card-top"><span>{item.rfqNumber}</span><Tag color={statusColor[item.status]}>{statusLabel[item.status] || item.status}</Tag></div>
                <h3>{item.title}</h3>
                <dl>
                  <div><dt>Mặt hàng</dt><dd>{item.items?.length || 0}</dd></div>
                  <div><dt>Ngân sách</dt><dd>{item.budgetRangeMin || item.budgetRangeMax ? `${money(item.budgetRangeMin)} – ${money(item.budgetRangeMax)}` : 'Chưa đặt ngân sách'}</dd></div>
                  <div><dt>Hạn báo giá</dt><dd>{formatDeadline(item.bidDeadline)}</dd></div>
                  <div><dt>Đã nhận</dt><dd>{item.bidCount || 0} báo giá</dd></div>
                </dl>
                {renderActions(item)}
              </article>)}
              {rfqPage.totalCount > rfqPage.query.pageSize && <Pagination
                current={rfqPage.query.page} pageSize={rfqPage.query.pageSize} total={rfqPage.totalCount}
                onChange={rfqPage.setPage} size="small" className="rfq-page__mobile-pagination" />}
            </> : emptyContent}
        </div>
      </section>
    </main>
    <CustomerFooter onNavigate={onNavigate} />

    <Modal title="Tạo yêu cầu báo giá" open={createOpen} onCancel={() => setCreateOpen(false)} footer={null} width={850}>
      <Form form={form} layout="vertical" onFinish={createRfq} initialValues={{ items: [{ unit: 'Hộp', quantity: 100 }] }}>
        <Row gutter={16}><Col xs={24} md={12}><Form.Item name="title" label="Tiêu đề" rules={[{ required: true, min: 5 }]}><Input /></Form.Item></Col><Col xs={24} md={12}><Form.Item name="deliveryAddress" label="Địa chỉ giao" rules={[{ required: true, min: 10 }]}><Input /></Form.Item></Col></Row>
        <Form.Item name="description" label="Mô tả"><TextArea rows={2} maxLength={5000} showCount /></Form.Item>
        <Row gutter={16}><Col xs={24} md={8}><Form.Item name="deliveryDateRequired" label="Ngày giao" rules={[{ required: true }]}><DatePicker disabledDate={(date) => date && date.isBefore(minDeliveryDate(), 'day')} style={{ width: '100%' }} /></Form.Item></Col><Col xs={24} md={8}><Form.Item name="bidDeadline" label="Hạn nhận báo giá" dependencies={['deliveryDateRequired']} rules={[{ required: true }, { validator: (_, value) => {
          if (!value) return Promise.resolve();
          if (value.isBefore(minBidDeadline())) return Promise.reject(new Error('Hạn nhận báo giá phải cách hiện tại ít nhất 24 giờ.'));
          const deliveryDate = form.getFieldValue('deliveryDateRequired');
          return !deliveryDate || !value.isAfter(deliveryDate.endOf('day'))
            ? Promise.resolve()
            : Promise.reject(new Error('Hạn nhận báo giá không được sau ngày giao hàng.'));
        } }]}><DatePicker showTime disabledDate={(date) => {
          if (!date) return false;
          const deliveryDate = form.getFieldValue('deliveryDateRequired');
          return date.isBefore(minBidDeadline(), 'day') || (deliveryDate && date.isAfter(deliveryDate, 'day'));
        }} style={{ width: '100%' }} /></Form.Item></Col><Col xs={12} md={4}><Form.Item name="budgetRangeMin" label="Ngân sách từ"><BudgetInput min={0} style={{ width: '100%' }} /></Form.Item></Col><Col xs={12} md={4}><Form.Item name="budgetRangeMax" label="Đến"><BudgetInput min={0} style={{ width: '100%' }} /></Form.Item></Col></Row>
        <Text type="secondary" style={{ display: "block", marginTop: -12, marginBottom: 16 }}>Ngân sách nhập bằng đồng (VND), không phải nghìn hay triệu. Ví dụ: 1.000.000 = một triệu đồng.</Text>
        <Form.List name="items">{(fields, { add, remove }) => <Space direction="vertical" style={{ width: '100%' }}>
          {fields.map(({ key, ...field }) => <Card key={key} size="small" title={`Mặt hàng ${field.name + 1}`} extra={fields.length > 1 && <Button danger type="link" onClick={() => remove(field.name)}>Xóa</Button>}><Row gutter={12}><Col xs={24} md={10}><Form.Item {...field} name={[field.name, 'productName']} label="Sản phẩm" rules={[{ required: true }]}><Input /></Form.Item></Col><Col xs={12} md={4}><Form.Item {...field} name={[field.name, 'quantity']} label="Số lượng" rules={[{ required: true }]}><InputNumber min={1} style={{ width: '100%' }} /></Form.Item></Col><Col xs={12} md={4}><Form.Item {...field} name={[field.name, 'unit']} label="Đơn vị" rules={[{ required: true }]}><Input /></Form.Item></Col><Col xs={24} md={6}><Form.Item {...field} name={[field.name, 'targetPrice']} label="Giá mục tiêu"><BudgetInput min={0} style={{ width: '100%' }} /></Form.Item></Col></Row><Form.Item {...field} name={[field.name, 'specifications']} label="Quy cách"><Input /></Form.Item></Card>)}
          <Button onClick={() => add({ unit: 'Hộp', quantity: 1 })}>Thêm mặt hàng</Button>
        </Space>}</Form.List>
        <Space style={{ marginTop: 18 }}><Button onClick={() => setCreateOpen(false)}>Hủy</Button><Button type="primary" htmlType="submit" loading={actionLoading}>Phát hành RFQ</Button></Space>
      </Form>
    </Modal>

    <Modal title={`Mời xưởng · ${selectedRfq?.rfqNumber || ''}`} open={inviteOpen} onCancel={() => setInviteOpen(false)} footer={null}>
      <Form form={inviteForm} layout="vertical" onFinish={inviteSuppliers}><Form.Item name="supplierUserIds" label="Xưởng được gợi ý" rules={[{ required: true }]}><Select mode="multiple" loading={actionLoading} optionFilterProp="label" options={suggestions.map((supplier) => ({ value: supplier.userId, label: `${supplier.companyName} · Uy tín ${supplier.reputationScore}` }))} /></Form.Item><Button type="primary" htmlType="submit" loading={actionLoading}>Gửi lời mời</Button></Form>
    </Modal>

    <Drawer title={`So sánh báo giá · ${selectedRfq?.rfqNumber || ''}`} open={compareOpen} onClose={() => setCompareOpen(false)} size={960} rootClassName="rfq-page__compare-drawer">
      {selectedRfq?.awardedBidId && <Alert type="success" showIcon style={{ marginBottom: 16 }} message={`Bạn đã chọn báo giá ${bids.find((bid) => bid.id === selectedRfq.awardedBidId)?.bidNumber || ''}.`} description="Xưởng đang xác nhận lựa chọn của bạn." />}
      <p className="rfq-page__compare-intro">Đối chiếu tổng giá, thời gian giao và hiệu lực trước khi chọn xưởng. Chạm vào mã báo giá để xem từng mặt hàng.</p>
      <div className="rfq-page__compare-table"><Table rowKey="id" loading={actionLoading} dataSource={bids} pagination={false} scroll={{ x: 850 }} columns={[
        { title: 'Xưởng', render: (_, bid) => { const supplier = supplierForBid(bid); return <Button type="link" style={{ padding: 0, height: 'auto' }} onClick={() => setDetailBid(bid)}>{supplier?.companyName || 'Xem xưởng'}</Button>; } },
        { title: 'Mã báo giá', dataIndex: 'bidNumber', render: (value, bid) => <Button type="link" style={{ padding: 0 }} onClick={() => setDetailBid(bid)}>{value}</Button> }, { title: 'Tổng giá', dataIndex: 'totalPrice', render: (value, bid) => <Space>{bid.id === selectedRfq?.awardedBidId && <Tag color="green">Đã chọn</Tag>}<Text strong type={bid.id === bestBidId ? 'success' : undefined}>{money(value)}{bid.id === bestBidId && ' · Giá thấp nhất'}</Text></Space> },
        { title: 'Giao hàng', dataIndex: 'estimatedDeliveryDays', render: (value) => `${value} ngày` }, { title: 'Hiệu lực', dataIndex: 'validityDays', render: (value) => `${value} ngày` }, { title: 'Trạng thái', dataIndex: 'status', render: (value) => <Tag>{bidStatusLabel[value] || value}</Tag> },
        { title: 'Lựa chọn', render: (_, bid) => <Button type="primary" disabled={selectedRfq?.status === 'InNegotiation' || bid.status !== 'Submitted' || bid.isExpired} loading={actionLoading} onClick={() => confirmBidSelection(bid)}>Chọn xưởng</Button> },
      ]} /></div>
      <div className="rfq-page__compare-cards">
        {actionLoading ? <Spin description="Đang tải báo giá…" /> : bids.length ? bids.map((bid) => <article key={bid.id} className="rfq-page__compare-card">
          <div className="rfq-page__compare-card-head">
            <span>{supplierForBid(bid)?.companyName || 'Xưởng cung cấp'}</span>
            {bid.id === bestBidId && <Tag color="gold">Giá thấp nhất</Tag>}
          </div>
          <Button type="link" onClick={() => setDetailBid(bid)}>{bid.bidNumber}</Button>
          <strong>{money(bid.totalPrice)}</strong>
          <dl>
            <div><dt>Giao hàng</dt><dd>{bid.estimatedDeliveryDays} ngày</dd></div>
            <div><dt>Hiệu lực</dt><dd>{bid.validityDays} ngày</dd></div>
            <div><dt>Trạng thái</dt><dd>{bidStatusLabel[bid.status] || bid.status}</dd></div>
          </dl>
          <Button type="primary" disabled={selectedRfq?.status === 'InNegotiation' || bid.status !== 'Submitted' || bid.isExpired} loading={actionLoading} onClick={() => confirmBidSelection(bid)}>Chọn xưởng</Button>
        </article>) : <p>Chưa có báo giá cho yêu cầu này.</p>}
      </div>
    </Drawer>
    <Modal title={detailBid ? `Chi tiết báo giá · ${detailBid.bidNumber}` : 'Chi tiết báo giá'} open={Boolean(detailBid)} onCancel={() => setDetailBid(null)} footer={<Button onClick={() => setDetailBid(null)}>Đóng</Button>} width={680}>
      {detailBid && <><Descriptions bordered size="small" column={1} style={{ marginBottom: 20 }}>
        <Descriptions.Item label="Xưởng">{supplierForBid(detailBid)?.companyName || `Xưởng ${detailBid.supplierId}`}</Descriptions.Item>
        {supplierForBid(detailBid)?.address && <Descriptions.Item label="Địa chỉ">{supplierForBid(detailBid).address}</Descriptions.Item>}
        {supplierForBid(detailBid)?.averageRating != null && <Descriptions.Item label="Đánh giá">{supplierForBid(detailBid).averageRating}</Descriptions.Item>}
        {supplierForBid(detailBid)?.reputationScore != null && <Descriptions.Item label="Điểm uy tín">{supplierForBid(detailBid).reputationScore}</Descriptions.Item>}
        <Descriptions.Item label="Tổng giá">{money(detailBid.totalPrice)}</Descriptions.Item>
        <Descriptions.Item label="Giao hàng">{detailBid.estimatedDeliveryDays} ngày</Descriptions.Item>
        <Descriptions.Item label="Hiệu lực">{detailBid.validityDays} ngày</Descriptions.Item>
        <Descriptions.Item label="Trạng thái">{detailBid.id === selectedRfq?.awardedBidId ? 'Đã chọn · chờ xưởng xác nhận' : bidStatusLabel[detailBid.status] || detailBid.status}</Descriptions.Item>
      </Descriptions><Title level={5}>Chi tiết từng mặt hàng</Title><Descriptions bordered size="small" column={1}>{detailBid.items.map((line) => <Descriptions.Item key={line.rfqItemId} label={`${line.productName} × ${line.quantity}`}>{money(line.unitPrice)} / {line.unit} · Thành tiền {money(line.subtotal)}{line.notes ? ` · ${line.notes}` : ''}</Descriptions.Item>)}</Descriptions></>}
    </Modal>
  </div>;
}
