import { useEffect, useState } from 'react';
import {
  Alert,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Table,
  Tag,
  Typography,
  message,
} from 'antd';
import { CarOutlined, ContainerOutlined, FileTextOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import deliveryService from '../../services/deliveryService';
import contractService from '../../services/contractService';
import orderService from '../../services/orderService';

const { TextArea } = Input;
const { Text } = Typography;
const DEFAULT_FROM_ADDRESS = 'Kho Xưởng Tràng An Nghệ Nhân, Cụm CN Bát Tràng, Gia Lâm, Hà Nội';

const minimumScheduledDate = () => {
  const minimumInstant = dayjs().add(24, 'hour');
  const day = minimumInstant.startOf('day');
  return day.isBefore(minimumInstant) ? day.add(1, 'day') : day;
};

const parseTerms = (value) => {
  if (!value || typeof value !== 'string') return value || {};
  try {
    return JSON.parse(value) || {};
  } catch {
    return {};
  }
};

export default function CreateDeliveryModal({
  open,
  onClose,
  onSuccess,
  contracts = [],
  orders = [],
  initialContractId,
  initialOrderId,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [sourceType, setSourceType] = useState('contract');
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [fulfillmentLines, setFulfillmentLines] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});
  const [batchNumber, setBatchNumber] = useState(1);
  const [orderItems, setOrderItems] = useState([]);

  const selectedContractId = Form.useWatch('contractId', form);
  const selectedOrderId = Form.useWatch('orderId', form);

  useEffect(() => {
    let ignore = false;
    Promise.resolve().then(() => {
      if (ignore) return;
      if (!open) {
        setFulfillmentLines([]);
        setItemQuantities({});
        setOrderItems([]);
        setBatchNumber(1);
        return;
      }

      form.resetFields();
      const initialSource = initialOrderId ? 'order' : 'contract';
      setSourceType(initialSource);

      form.setFieldsValue({
        sourceType: initialSource,
        deliveryType: 'SelfArranged',
        fromAddress: DEFAULT_FROM_ADDRESS,
        ...(initialContractId ? { contractId: initialContractId } : {}),
        ...(initialOrderId ? { orderId: initialOrderId } : {}),
      });
    });
    return () => {
      ignore = true;
    };
  }, [form, initialContractId, initialOrderId, open]);

  // Load contract info, fulfillment lines & calculate batch number
  useEffect(() => {
    if (!open || sourceType !== 'contract' || !selectedContractId) return undefined;
    let cancelled = false;
    Promise.resolve().then(() => {
      if (!cancelled) setLoadingDetails(true);
    });

    Promise.all([
      contractService.get(selectedContractId),
      deliveryService.getContractFulfillment(selectedContractId).catch(() => []),
      deliveryService.getByContract(selectedContractId).catch(() => []),
    ])
      .then(([contract, fLines, existingDeliveries]) => {
        if (cancelled) return;
        const terms = parseTerms(contract.termsAndConditions);
        const earliestDate = minimumScheduledDate();
        const deadline = contract.deliveryDeadline ? dayjs(contract.deliveryDeadline) : null;
        const scheduledDate =
          deadline?.isValid() && !deadline.isBefore(earliestDate, 'day') ? deadline : earliestDate;

        const nextBatch = (Array.isArray(existingDeliveries) ? existingDeliveries.length : 0) + 1;
        setBatchNumber(nextBatch);

        const lines = Array.isArray(fLines) ? fLines : fLines?.items || [];
        setFulfillmentLines(lines);

        // Pre-fill quantities with available remaining quantities
        const initialQtyMap = {};
        lines.forEach((line) => {
          const lineKey = line.lineId || line.rfqItemId || line.orderItemId;
          const remaining = line.remainingQuantity ?? line.remaining ?? 0;
          initialQtyMap[lineKey] = remaining > 0 ? remaining : 0;
        });
        setItemQuantities(initialQtyMap);

        form.setFieldsValue({
          fromAddress: contract.supplierAddress || DEFAULT_FROM_ADDRESS,
          toAddress: terms.DeliveryAddress || terms.deliveryAddress || '',
          recipientName: contract.customerName || '',
          recipientPhone: contract.customerPhone?.replace(/[\s.\-()]/g, '') || '',
          scheduledDate,
          notes: `Đợt ${nextBatch} theo hợp đồng ${contract.contractNumber || ''}.`,
        });
      })
      .catch((error) => {
        if (!cancelled) {
          message.error(
            error.response?.data?.message || error.message || 'Không thể tải thông tin hợp đồng.'
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingDetails(false);
      });

    return () => {
      cancelled = true;
    };
  }, [form, open, selectedContractId, sourceType]);

  // Load bulk order info and its items
  useEffect(() => {
    if (!open || sourceType !== 'order' || !selectedOrderId) return undefined;
    let cancelled = false;
    Promise.resolve().then(() => {
      if (!cancelled) setLoadingDetails(true);
    });

    orderService
      .get(selectedOrderId)
      .then((order) => {
        if (cancelled) return;
        setBatchNumber(1);
        const items = order.items || [];
        setOrderItems(items);

        const earliestDate = minimumScheduledDate();
        const scheduledDate = earliestDate;

        form.setFieldsValue({
          fromAddress: DEFAULT_FROM_ADDRESS,
          toAddress: order.deliveryAddress || '',
          recipientName: order.recipientName || order.customerName || '',
          recipientPhone: order.recipientPhone?.replace(/[\s.\-()]/g, '') || '',
          scheduledDate,
          notes: `Chuyến giao đơn hàng sỉ ${order.orderNumber || ''}.`,
        });
      })
      .catch((error) => {
        if (!cancelled) {
          message.error(
            error.response?.data?.message || error.message || 'Không thể tải chi tiết đơn hàng.'
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingDetails(false);
      });

    return () => {
      cancelled = true;
    };
  }, [form, open, selectedOrderId, sourceType]);

  const handleSourceTypeChange = (e) => {
    const nextType = e.target.value;
    setSourceType(nextType);
    setFulfillmentLines([]);
    setItemQuantities({});
    setOrderItems([]);
    form.setFieldsValue({
      contractId: undefined,
      orderId: undefined,
      toAddress: '',
      recipientName: '',
      recipientPhone: '',
      notes: '',
    });
  };

  const handleQuantityChange = (lineKey, value) => {
    setItemQuantities((prev) => ({
      ...prev,
      [lineKey]: Number(value || 0),
    }));
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (values.scheduledDate.startOf('day').isBefore(minimumScheduledDate())) {
        form.setFields([
          {
            name: 'scheduledDate',
            errors: ['Ngày giao phải cách thời điểm tạo chuyến ít nhất 24 giờ.'],
          },
        ]);
        return;
      }

      let itemsPayload = null;
      if (sourceType === 'contract') {
        const selectedItems = [];
        for (const line of fulfillmentLines) {
          const lineKey = line.lineId || line.rfqItemId || line.orderItemId;
          const enteredQty = Number(itemQuantities[lineKey] || 0);
          const maxAllowed = line.remainingQuantity ?? line.remaining ?? 0;

          if (enteredQty > maxAllowed) {
            message.error(
              `Số lượng đợt này của món "${line.productName}" (${enteredQty}) không được vượt số lượng còn lại (${maxAllowed}).`
            );
            return;
          }

          if (enteredQty > 0) {
            selectedItems.push({
              rfqItemId: line.lineId || line.rfqItemId,
              quantity: enteredQty,
            });
          }
        }

        if (selectedItems.length === 0) {
          message.error('Vui lòng nhập số lượng đợt này (> 0) cho ít nhất một món hàng.');
          return;
        }

        itemsPayload = selectedItems;
      }

      setLoading(true);

      const payload = {
        contractId: sourceType === 'contract' ? values.contractId : null,
        orderId: sourceType === 'order' ? values.orderId : null,
        deliveryType: values.deliveryType,
        scheduledDate: values.scheduledDate ? values.scheduledDate.format('YYYY-MM-DD') : null,
        fromAddress: values.fromAddress,
        toAddress: values.toAddress,
        recipientName: values.recipientName,
        recipientPhone: values.recipientPhone,
        trackingCode: values.trackingCode || null,
        notes: values.notes || null,
        items: itemsPayload,
      };

      await deliveryService.create(payload);
      message.success(
        sourceType === 'contract'
          ? `Tạo chuyến giao Đợt ${batchNumber} cho hợp đồng thành công!`
          : 'Tạo chuyến giao đơn sỉ thành công!'
      );
      form.resetFields();
      onSuccess?.();
      onClose();
    } catch (err) {
      if (err.errorFields) return;
      message.error(
        err.response?.data?.message || err.message || 'Không thể tạo chuyến giao hàng.'
      );
    } finally {
      setLoading(false);
    }
  };

  const contractLineColumns = [
    {
      title: 'Món / Quy cách sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      render: (name, r) => (
        <div>
          <span className="font-semibold text-stone-800">{name}</span>
          {r.unit && <span className="text-xs text-stone-500"> ({r.unit})</span>}
        </div>
      ),
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      key: 'unit',
      width: 75,
      align: 'center',
      render: (u) => u || 'hộp',
    },
    {
      title: 'Tổng HĐ',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
      width: 90,
      align: 'right',
      render: (val, r) => (val ?? r.total ?? 0).toLocaleString('vi-VN'),
    },
    {
      title: 'Còn lại',
      dataIndex: 'remainingQuantity',
      key: 'remainingQuantity',
      width: 95,
      align: 'right',
      render: (val, r) => {
        const rem = val ?? r.remaining ?? 0;
        return (
          <span className={`font-semibold ${rem > 0 ? 'text-amber-700' : 'text-stone-400'}`}>
            {rem.toLocaleString('vi-VN')}
          </span>
        );
      },
    },
    {
      title: 'SL đợt này',
      key: 'quantityThisBatch',
      width: 140,
      align: 'right',
      render: (_, r) => {
        const lineKey = r.lineId || r.rfqItemId || r.orderItemId;
        const maxAllowed = r.remainingQuantity ?? r.remaining ?? 0;
        const currentVal = itemQuantities[lineKey] ?? 0;
        return (
          <InputNumber
            min={0}
            max={maxAllowed}
            disabled={maxAllowed <= 0}
            value={currentVal}
            onChange={(val) => handleQuantityChange(lineKey, val)}
            className="w-full text-right"
          />
        );
      },
    },
  ];

  const orderItemColumns = [
    {
      title: 'Món hàng đơn sỉ (Tự động)',
      dataIndex: 'productName',
      key: 'productName',
      render: (name, item) => (
        <div>
          <span className="font-semibold text-stone-800">{name}</span>
          {item.variantName && <span className="text-xs text-stone-500"> · {item.variantName}</span>}
        </div>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      align: 'right',
      render: (q) => <strong className="tabular-nums text-[#8c1524]">{q}</strong>,
    },
  ];

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-slate-800">
          <CarOutlined className="text-amber-600 text-lg" />
          <span>Tạo chuyến giao</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Tạo chuyến"
      cancelText="Hủy"
      confirmLoading={loading}
      width={720}
      centered
      okButtonProps={{ className: 'bg-amber-600 hover:bg-amber-500 font-semibold' }}
    >
      <div className="py-2 space-y-3">
        <Alert
          type="info"
          showIcon
          className="bg-amber-50/60 border-amber-200 text-xs"
          message="Đối với hợp đồng: Nhập số lượng đợt này không vượt số lượng còn lại, hệ thống tự động gán Đợt N. Đối với đơn sỉ: Danh sách món tự động và xuất 1 chuyến duy nhất."
        />

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            sourceType: 'contract',
            deliveryType: 'SelfArranged',
            fromAddress: DEFAULT_FROM_ADDRESS,
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item name="sourceType" label="Loại chứng từ xuất hàng" rules={[{ required: true }]}>
              <Radio.Group
                buttonStyle="solid"
                className="w-full flex"
                onChange={handleSourceTypeChange}
              >
                <Radio.Button value="contract" className="flex-1 text-center">
                  <FileTextOutlined className="mr-1" /> Hợp đồng
                </Radio.Button>
                <Radio.Button value="order" className="flex-1 text-center">
                  <ContainerOutlined className="mr-1" /> Đơn sỉ
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <div className="flex flex-col justify-center">
              <span className="text-xs text-stone-500 mb-1">Đợt giao hàng dự kiến:</span>
              <div>
                <Tag color="purple" className="text-sm font-semibold px-3 py-0.5">
                  Đợt {batchNumber}
                </Tag>
                <Text type="secondary" className="text-xs">
                  {sourceType === 'contract' ? '(Chia đợt hợp đồng)' : '(Đơn sỉ nguyên lô)'}
                </Text>
              </div>
            </div>
          </div>

          {sourceType === 'contract' ? (
            <Form.Item
              name="contractId"
              label="Hợp đồng áp dụng"
              rules={[{ required: true, message: 'Vui lòng chọn Hợp đồng áp dụng' }]}
            >
              <Select
                placeholder="Chọn Hợp đồng B2B đang có hiệu lực"
                loading={loadingDetails}
              >
                {contracts.map((c) => (
                  <Select.Option key={c.id || c.key} value={c.id || c.key}>
                    {c.contractNumber || c.contractNo || 'HD-B2B'} - {c.title || c.customerName || 'Đơn hàng B2B'}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          ) : (
            <Form.Item
              name="orderId"
              label="Đơn hàng sỉ áp dụng"
              rules={[{ required: true, message: 'Vui lòng chọn Đơn hàng sỉ' }]}
            >
              <Select placeholder="Chọn Đơn hàng sỉ cần giao" loading={loadingDetails}>
                {orders.map((o) => (
                  <Select.Option key={o.id || o.key} value={o.id || o.key}>
                    {o.orderNumber || 'ORD-B2B'} - {o.customerName || o.recipientName || 'Khách hàng'}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {/* Items Section */}
          {sourceType === 'contract' && selectedContractId && (
            <div className="mb-4 rounded-xl border border-stone-200 bg-stone-50/60 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-800">
                  Bảng dòng hợp đồng &amp; Nhập số lượng đợt này (Đợt {batchNumber})
                </span>
                <span className="text-xs text-stone-500">
                  Không vượt số lượng còn lại
                </span>
              </div>
              <Table
                rowKey={(r) => r.lineId || r.rfqItemId || r.orderItemId}
                columns={contractLineColumns}
                dataSource={fulfillmentLines}
                loading={loadingDetails}
                pagination={false}
                size="small"
                scroll={{ x: 500 }}
              />
            </div>
          )}

          {sourceType === 'order' && selectedOrderId && (
            <div className="mb-4 rounded-xl border border-stone-200 bg-stone-50/60 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-800">
                  Danh sách món tự động theo đơn hàng
                </span>
                <Tag color="cyan">Đơn sỉ: Xuất toàn bộ món</Tag>
              </div>
              <Table
                rowKey={(r, i) => r.id || r.productId || i}
                columns={orderItemColumns}
                dataSource={orderItems}
                loading={loadingDetails}
                pagination={false}
                size="small"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="deliveryType"
              label="Phương thức vận chuyển"
              rules={[{ required: true }]}
            >
              <Radio.Group buttonStyle="solid" style={{ display: 'flex', width: '100%' }}>
                <Radio.Button
                  value="SelfArranged"
                  style={{ flex: '1 1 0', minWidth: 0, textAlign: 'center', whiteSpace: 'nowrap' }}
                >
                  Xưởng tự chở
                </Radio.Button>
                <Radio.Button
                  value="PlatformManaged"
                  style={{ flex: '1 1 0', minWidth: 0, textAlign: 'center', whiteSpace: 'nowrap' }}
                >
                  Đơn vị vận chuyển
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="scheduledDate"
              label="Ngày dự kiến giao"
              rules={[
                { required: true, message: 'Vui lòng chọn ngày dự kiến giao' },
                {
                  validator: (_, value) =>
                    !value || !value.startOf('day').isBefore(minimumScheduledDate())
                      ? Promise.resolve()
                      : Promise.reject(
                        new Error('Ngày giao phải cách thời điểm tạo chuyến ít nhất 24 giờ.')
                      ),
                },
              ]}
            >
              <DatePicker
                className="w-full"
                placeholder="Chọn ngày giao"
                format="YYYY-MM-DD"
                disabledDate={(date) => date && date.startOf('day').isBefore(minimumScheduledDate())}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="fromAddress"
            label="Địa chỉ xuất hàng (Kho xưởng)"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ xuất hàng' }]}
          >
            <Input placeholder="Địa chỉ kho xuất phát" />
          </Form.Item>

          <Form.Item
            name="toAddress"
            label="Địa chỉ nhận hàng (Kho khách hàng)"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ nhận hàng' }]}
          >
            <Input placeholder="Số nhà, đường, cổng kho, quận/huyện, tỉnh/thành" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="recipientName"
              label="Họ tên người nhận (Thủ kho / Đại diện)"
              rules={[{ required: true, message: 'Vui lòng nhập tên người nhận' }]}
            >
              <Input placeholder="VD: Bác Nguyễn Văn Hùng" />
            </Form.Item>

            <Form.Item
              name="recipientPhone"
              label="Số điện thoại người nhận"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại' },
                { pattern: /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/, message: 'Số điện thoại không đúng định dạng' },
              ]}
            >
              <Input placeholder="VD: 0912345678" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="trackingCode" label="Mã vận đơn / Biển số xe">
              <Input placeholder="VD: TA-TRUCK-889 hoặc 29C-123.45" />
            </Form.Item>

            <Form.Item name="notes" label="Ghi chú đợt hàng">
              <TextArea rows={1} placeholder="VD: Đợt 1: 1.500 hộp sơn mài bảo quản < 25°C" />
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
