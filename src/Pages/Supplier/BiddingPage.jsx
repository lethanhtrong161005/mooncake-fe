import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Col,
  Descriptions,
  Drawer,
  Form,
  Grid,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
  message,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import RowActionMenu from '../../components/common/RowActionMenu';
import { TruncatedTooltip } from '../../components/common/TableCellHelpers';
import rfqService from '../../services/rfqService';
import usePagedList from '../../hooks/usePagedList';
import FilterBar from '../../components/common/FilterBar';
import { signalRManager } from '../../services/signalrService';

const { Text } = Typography;
const { TextArea } = Input;

const formatMoneyInput = (value) => (
  value === undefined || value === null || value === ''
    ? ''
    : Number(value).toLocaleString('en-US', { maximumFractionDigits: 2 })
);

function MoneyInput({ value, onChange, ...props }) {
  const update = (event) => {
    const input = event.target;
    const raw = input.value;
    const digitsBeforeCursor = raw.slice(0, input.selectionStart ?? raw.length).replace(/\D/g, '').length;
    const normalized = raw.replace(/,/g, '').replace(/[^\d.]/g, '');
    const amount = normalized === '' ? null : Number(normalized);
    if (normalized === '' || Number.isFinite(amount)) onChange?.(amount);
    const formatted = formatMoneyInput(normalized);
    requestAnimationFrame(() => {
      let position = 0;
      let digits = 0;
      while (position < formatted.length && digits < digitsBeforeCursor) {
        if (/\d/.test(formatted[position])) digits += 1;
        position += 1;
      }
      input.setSelectionRange(position, position);
    });
  };
  return <Input {...props} inputMode="decimal" value={formatMoneyInput(value)} onChange={update} />;
}
const money = (amount) => `${Number(amount || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) => error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.';

const STATUS_META = {
  Open: { label: 'Đang mở thầu', color: 'processing' },
  InNegotiation: { label: 'Chờ bạn xác nhận', color: 'warning' },
  Closed: { label: 'Đã đóng', color: 'default' },
  Awarded: { label: 'Đã chọn xưởng', color: 'success' },
  Cancelled: { label: 'Đã hủy', color: 'error' },
};

const helpLabel = (label, explanation) => (
  <span className="inline-flex items-center gap-1.5">
    <span>{label}</span>
    <Tooltip title={explanation}>
      <QuestionCircleOutlined
        tabIndex={0}
        aria-label="Thông tin giải thích"
        className="cursor-help text-[#8a7f7a]"
      />
    </Tooltip>
  </span>
);

export default function BiddingPage({ onNavigate }) {
  const screens = Grid.useBreakpoint();
  const rfqPage = usePagedList(rfqService.listSupplierInvitationsPaged);
  const rfqs = rfqPage.items;
  const loading = rfqPage.loading;
  const [selectedRfq, setSelectedRfq] = useState(null);
  const [maxValidityDays, setMaxValidityDays] = useState(30);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const quoteLines = Form.useWatch('items', form);

  const loadRfqs = rfqPage.refresh;
  useEffect(() => {
    if (rfqPage.error) message.error(errorMessage(rfqPage.error));
  }, [rfqPage.error]);

  useEffect(() => {
    const refreshRfqs = (notification) => {
      if (notification?.type?.startsWith('bid.') || notification?.type?.startsWith('rfq.')) {
        loadRfqs();
      }
    };
    signalRManager.on('ReceiveNotification', refreshRfqs);
    signalRManager.on('MarketplaceChanged', refreshRfqs);
    return () => {
      signalRManager.off('ReceiveNotification', refreshRfqs);
      signalRManager.off('MarketplaceChanged', refreshRfqs);
    };
  }, [loadRfqs]);

  const openBid = async (rfq) => {
    setSubmitting(true);
    try {
      const detail = await rfqService.get(rfq.id);
      setSelectedRfq(detail);
      const myBid = detail.myBid;
      const remainingValidityDays = Math.max(
        1,
        Math.ceil((new Date(detail.bidDeadline).getTime() - Date.now()) / 86400000),
      );
      setMaxValidityDays(remainingValidityDays);
      form.setFieldsValue({
        estimatedDeliveryDays: myBid?.estimatedDeliveryDays ?? 7,
        validityDays: Math.min(myBid?.validityDays ?? 30, remainingValidityDays),
        notes: myBid?.notes ?? '',
        items: detail.items.map((item) => {
          const bidItem = myBid?.items.find((line) => line.rfqItemId === item.id);
          return { rfqItemId: item.id, unitPrice: bidItem?.unitPrice ?? 0, notes: bidItem?.notes ?? '' };
        }),
      });
      setDrawerOpen(true);
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const submitBid = async (values) => {
    setSubmitting(true);
    try {
      await rfqService.submitBid(selectedRfq.id, values);
      message.success(
        selectedRfq.myBid
          ? 'Đã cập nhật báo giá. Khách hàng đã được thông báo.'
          : 'Đã nộp báo giá niêm phong. Khách hàng đã được thông báo.',
      );
      setDrawerOpen(false);
      await loadRfqs();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const decline = (rfq) => {
    let reason = '';
    Modal.confirm({
      title: `Từ chối lời mời ${rfq.rfqNumber}`,
      content: (
        <TextArea
          rows={3}
          onChange={(event) => {
            reason = event.target.value;
          }}
          placeholder="Lý do từ chối (ít nhất 3 ký tự)"
        />
      ),
      okText: 'Từ chối lời mời',
      okButtonProps: { danger: true },
      cancelText: 'Quay lại',
      onOk: async () => {
        if (reason.trim().length < 3) throw new Error('Vui lòng nhập lý do từ chối.');
        await rfqService.decline(rfq.id, reason.trim());
        message.success('Đã gửi phản hồi từ chối.');
        await loadRfqs();
      },
    });
  };

  const respondToSelection = (rfq, accept) => {
    Modal.confirm({
      title: accept ? 'Xác nhận nhận đơn hàng?' : 'Từ chối yêu cầu chọn?',
      content: accept
        ? 'Sau khi xác nhận, hệ thống sẽ tạo hợp đồng để khách hàng xem và tiếp tục các bước thanh toán.'
        : 'Yêu cầu báo giá sẽ được mở lại để khách hàng chọn xưởng khác.',
      okText: accept ? 'Xác nhận' : 'Từ chối lựa chọn',
      okButtonProps: accept ? { style: { backgroundColor: '#8c1524', borderColor: '#8c1524' } } : { danger: true },
      cancelText: 'Quay lại',
      onOk: async () => {
        setSubmitting(true);
        try {
          const result = await rfqService.respondToBidSelection(rfq.id, rfq.myBid.id, accept);
          message.success(result.message || 'Đã ghi nhận phản hồi.');
          await loadRfqs();
          if (accept) onNavigate?.('nha-cung-cap/quan-ly-hop-dong');
        } catch (error) {
          message.error(errorMessage(error));
        } finally {
          setSubmitting(false);
        }
      },
    });
  };

  const total = useMemo(
    () => selectedRfq?.items?.reduce(
      (sum, item, index) => sum + Number(quoteLines?.[index]?.unitPrice || 0) * item.quantity,
      0,
    ) || 0,
    [quoteLines, selectedRfq],
  );

  const columns = [
    {
      title: 'Mã RFQ',
      dataIndex: 'rfqNumber',
      width: 175,
      render: (value, item) => (
        <div className="max-w-[160px]">
          <TruncatedTooltip
            text={value}
            className="font-semibold tabular-nums text-[#7d1322]"
          />
          <div className="mt-0.5 text-xs text-[#6c625e]">
            {item.isInvited ? 'Được mời riêng' : 'Công khai trên sàn'}
          </div>
        </div>
      ),
    },
    {
      title: 'Gói thầu',
      dataIndex: 'title',
      width: 300,
      render: (value, item) => (
        <div className="max-w-[285px]">
          <TruncatedTooltip
            text={value}
            tooltipContent={item.description ? `${value} — ${item.description}` : value}
            className="font-medium text-[#231a18]"
          />
          <div className="mt-0.5 text-xs text-[#6c625e] tabular-nums">
            Giao trước: {item.deliveryDateRequired || 'Chưa chốt'}
          </div>
        </div>
      ),
    },
    {
      title: 'Khách hàng',
      key: 'customerName',
      width: 185,
      render: (_, item) => (
        <div className="max-w-[170px]">
          <TruncatedTooltip
            text={item.customerName || 'Doanh nghiệp B2B'}
            className="text-sm text-[#231a18]"
          />
          <div className="text-xs text-[#8a7f7a] tabular-nums">
            {item.createdAt ? new Date(item.createdAt).toLocaleString('vi-VN') : 'Chưa rõ'}
          </div>
        </div>
      ),
    },
    {
      title: 'Hạn nộp báo giá',
      dataIndex: 'bidDeadline',
      width: 140,
      render: (value) => (
        <span className="text-xs tabular-nums text-[#231a18] whitespace-nowrap">
          {new Date(value).toLocaleString('vi-VN')}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 115,
      render: (value) => {
        const meta = STATUS_META[value] || { label: value, color: 'default' };
        return <Tag color={meta.color} className="m-0 whitespace-nowrap">{meta.label}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: 90,
      render: (_, item) => (
        <RowActionMenu
          ariaLabel={`Thao tác RFQ ${item.rfqNumber}`}
          actions={item.awaitingSupplierConfirmation ? [
            {
              key: 'acceptSelection',
              label: 'Xác nhận thắng thầu',
              icon: <CheckCircleOutlined />,
              disabled: submitting,
              onClick: () => respondToSelection(item, true),
            },
            {
              key: 'rejectSelection',
              label: 'Từ chối',
              icon: <CloseOutlined />,
              danger: true,
              disabled: submitting,
              onClick: () => respondToSelection(item, false),
            },
          ] : [
            {
              key: 'decline',
              label: 'Từ chối mời thầu',
              icon: <CloseOutlined />,
              danger: true,
              show: Boolean(item.canDecline && item.status === 'Open'),
              onClick: () => decline(item),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <ColonyAdminLayout
      role="Supplier"
      activeKey="nha-cung-cap/dau-thau"
      onNavigate={onNavigate}
      title="Đấu thầu & báo giá"
      subtitle="Tham gia các yêu cầu báo giá (RFQ) đang mở. Báo giá được niêm phong cho đến khi khách hàng mở so sánh."
      extra={
        <Button icon={<ReloadOutlined />} onClick={loadRfqs} loading={loading}>
          Tải lại
        </Button>
      }
    >
      <div className="space-y-5">
        <div className="flex items-center gap-2.5 rounded-xl border border-[#e7dccf] bg-[#fdfbf8] px-4 py-3 text-xs text-[#6c625e]">
          <InfoCircleOutlined className="shrink-0 text-sm text-[#9a6b16]" />
          <span>
            Chỉ nộp hoặc sửa báo giá khi RFQ còn mở và trước hạn chót. Hồ sơ giá được niêm phong đối với các xưởng khác.
          </span>
        </div>

        <section
          aria-label="Danh sách gói thầu RFQ"
          className="rounded-2xl border border-[#e4dcd3] bg-white p-4 sm:p-6"
        >
          <div className="rounded-xl border border-[#ebe3da] bg-[#faf7f2] p-3.5">
            <FilterBar
              search={rfqPage.search}
              onSearchChange={rfqPage.setSearch}
              status={rfqPage.query.status}
              onStatusChange={rfqPage.setStatus}
              onReset={rfqPage.reset}
              placeholder="Tìm mã RFQ hoặc tiêu đề"
              statusOptions={Object.keys(STATUS_META).map((value) => ({
                value,
                label: STATUS_META[value].label,
              }))}
            />
          </div>

          <div className="mt-4">
            <Table
              rowKey="id"
              loading={loading}
              columns={columns}
              dataSource={rfqs}
              size="middle"
              tableLayout="fixed"
              scroll={{ x: 1005 }}
              onRow={(item) => {
                const canBid = item.status === 'Open' && new Date(item.bidDeadline) > new Date();
                return {
                  className: canBid ? 'cursor-pointer hover:bg-[#faf7f2]' : undefined,
                  title: canBid ? 'Nhấn để xem RFQ và nộp hoặc sửa báo giá' : undefined,
                  onClick: (event) => {
                    if (!canBid || event.target.closest('button, a, input, .ant-dropdown')) return;
                    openBid(item);
                  },
                };
              }}
              pagination={{
                current: rfqPage.query.page,
                pageSize: rfqPage.query.pageSize,
                total: rfqPage.totalCount,
                onChange: rfqPage.setPage,
                showSizeChanger: true,
                pageSizeOptions: [10, 20, 50, 100],
              }}
            />
          </div>
        </section>
      </div>

      <Drawer
        title={
          <span className="font-serif text-lg font-semibold text-[#231a18]">
            {`${selectedRfq?.myBid ? 'Sửa báo giá' : 'Nộp báo giá'} · ${selectedRfq?.rfqNumber || ''}`}
          </span>
        }
        width={screens.md ? 760 : '100%'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        footer={
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-[#6c625e]">
              Tổng dự kiến:{' '}
              <span className="font-semibold tabular-nums text-[#8c1524]">{money(total)}</span>
            </div>
            <Space wrap>
              <Button onClick={() => setDrawerOpen(false)}>Đóng</Button>
              <Button
                type="primary"
                loading={submitting}
                onClick={() => form.submit()}
              >
                {selectedRfq?.myBid ? 'Cập nhật báo giá' : 'Gửi báo giá niêm phong'}
              </Button>
            </Space>
          </div>
        }
      >
        {selectedRfq && (
          <div className="space-y-5">
            <Descriptions bordered size="small" column={1}>
              <Descriptions.Item label="Gói thầu">{selectedRfq.title}</Descriptions.Item>
              <Descriptions.Item label="Người tạo">
                {selectedRfq.customerName || 'Không rõ người tạo'}
              </Descriptions.Item>
              <Descriptions.Item label="Thời gian tạo">
                {selectedRfq.createdAt ? new Date(selectedRfq.createdAt).toLocaleString('vi-VN') : 'Không có thời gian'}
              </Descriptions.Item>
              <Descriptions.Item label="Hạn nộp">
                {new Date(selectedRfq.bidDeadline).toLocaleString('vi-VN')}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày giao">{selectedRfq.deliveryDateRequired}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ giao hàng">{selectedRfq.deliveryAddress || 'Chưa cung cấp'}</Descriptions.Item>
              <Descriptions.Item label="Ngân sách dự kiến">
                {selectedRfq.budgetRangeMin != null || selectedRfq.budgetRangeMax != null
                  ? `${selectedRfq.budgetRangeMin != null ? money(selectedRfq.budgetRangeMin) : 'Không giới hạn tối thiểu'} – ${selectedRfq.budgetRangeMax != null ? money(selectedRfq.budgetRangeMax) : 'Không giới hạn tối đa'}`
                  : 'Customer chưa đặt ngân sách'}
              </Descriptions.Item>
              {selectedRfq.description && <Descriptions.Item label="Mô tả yêu cầu">{selectedRfq.description}</Descriptions.Item>}
            </Descriptions>

            <Form form={form} layout="vertical" onFinish={submitBid}>
              <Form.List name="items">
                {(fields) => (
                  <div className="space-y-3">
                    {fields.map(({ key: fieldKey, ...restField }, index) => {
                      const item = selectedRfq.items[index];
                      return (
                        <div
                          key={fieldKey}
                          className="rounded-xl border border-[#e4dcd3] bg-[#faf7f2] p-4"
                        >
                          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#ebe3da] pb-2">
                            <span className="font-semibold text-[#231a18]">{item.productName}</span>
                            <span className="rounded border border-[#e4dcd3] bg-white px-2 py-0.5 text-xs tabular-nums text-[#6c625e]">
                              Số lượng: {item.quantity} {item.unit}
                            </span>
                          </div>
                          <div className="mb-3 space-y-1 text-sm text-[#6c625e]">
                            {item.targetPrice != null && <div><strong className="text-[#231a18]">Giá mục tiêu:</strong> {money(item.targetPrice)} / {item.unit || 'đơn vị'}</div>}
                            {item.specifications && <div><strong className="text-[#231a18]">Quy cách mong muốn:</strong> {item.specifications}</div>}
                            {item.packagingRequirements && (
                              <div>
                                <strong className="text-[#231a18]">Ảnh mẫu bao bì:</strong>
                                {/^https?:\/\//i.test(item.packagingRequirements) ? (
                                  <div className="mt-2"><Image src={item.packagingRequirements} alt={`Ảnh bao bì yêu cầu cho ${item.productName}`} width={120} height={90} style={{ objectFit: 'contain', borderRadius: 8 }} /></div>
                                ) : <span className="ml-1">{item.packagingRequirements}</span>}
                              </div>
                            )}
                          </div>
                          <Form.Item {...restField} name={[restField.name, 'rfqItemId']} hidden>
                            <Input />
                          </Form.Item>
                          <Row gutter={12}>
                            <Col xs={24} sm={12}>
                              <Form.Item
                                {...restField}
                                name={[restField.name, 'unitPrice']}
                                label={helpLabel(
                                  'Đơn giá',
                                  'Giá cho một đơn vị sản phẩm, tính bằng đồng. Tổng dòng hàng bằng đơn giá nhân số lượng.',
                                )}
                                rules={[{ required: true, message: 'Nhập đơn giá.' }]}
                              >
                                <MoneyInput min={0.01} className="w-full" />
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                              <Form.Item
                                {...restField}
                                name={[restField.name, 'notes']}
                                label={helpLabel(
                                  'Ghi chú dòng hàng',
                                  'Quy cách đóng gói, bao bì hoặc điều kiện giá riêng cho mặt hàng này.',
                                )}
                                className="mb-0"
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                          </Row>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Form.List>

              <Row gutter={12} className="mt-4">
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="estimatedDeliveryDays"
                    label={helpLabel(
                      'Số ngày giao hàng',
                      'Số ngày dự kiến chuẩn bị và giao đủ hàng theo yêu cầu của RFQ.',
                    )}
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={1} max={365} className="w-full" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="validityDays"
                    label={helpLabel(
                      'Hiệu lực báo giá',
                      'Báo giá có hiệu lực từ lúc gửi đến khi hết hạn nhận thầu.',
                    )}
                    rules={[
                      { required: true },
                      {
                        validator: (_, value) => {
                          const remaining = Math.ceil(
                            (new Date(selectedRfq.bidDeadline).getTime() - Date.now()) / 86400000,
                          );
                          return value <= Math.max(1, remaining)
                            ? Promise.resolve()
                            : Promise.reject(
                              new Error('Hiệu lực không được vượt quá thời gian còn lại đến hạn nhận thầu.'),
                            );
                        },
                      },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      max={maxValidityDays}
                      className="w-full"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="notes"
                label={helpLabel(
                  'Cam kết / ưu đãi',
                  'Điều kiện chung về vận chuyển, thanh toán, chiết khấu hoặc cam kết chất lượng.',
                )}
              >
                <TextArea rows={4} maxLength={4000} showCount />
              </Form.Item>

              <div className="flex items-center justify-between rounded-xl border border-[#e4dcd3] bg-[#faf7f2] px-4 py-3">
                <Text className="text-sm text-[#6c625e]">Tổng báo giá dự kiến</Text>
                <span className="font-serif text-lg font-semibold tabular-nums text-[#8c1524]">
                  {money(total)}
                </span>
              </div>
            </Form>
          </div>
        )}
      </Drawer>
    </ColonyAdminLayout>
  );
}
