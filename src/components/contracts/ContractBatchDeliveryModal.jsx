import { useEffect, useState } from 'react';
import {
  Alert,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  Spin,
  Table,
  Typography,
  message,
} from 'antd';
import { TruckOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import contractService from '../../services/contractService';

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

export default function ContractBatchDeliveryModal({
  open,
  onClose,
  onSuccess,
  contract,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingLines, setLoadingLines] = useState(false);
  const [fulfillmentLines, setFulfillmentLines] = useState([]);
  const [lineQuantities, setLineQuantities] = useState({});

  useEffect(() => {
    if (!open || !contract) return undefined;
    let cancelled = false;

    const terms = parseTerms(contract.termsAndConditions);
    const earliestDate = minimumScheduledDate();
    const deadline = contract.deliveryDeadline ? dayjs(contract.deliveryDeadline) : null;
    const scheduledDate = deadline?.isValid() && !deadline.isBefore(earliestDate, 'day')
      ? deadline
      : earliestDate;

    form.setFieldsValue({
      deliveryType: 'SelfArranged',
      fromAddress: contract.supplierAddress || DEFAULT_FROM_ADDRESS,
      toAddress: terms.DeliveryAddress || terms.deliveryAddress || '',
      recipientName: contract.customerName || '',
      recipientPhone: contract.customerPhone?.replace(/[\s.\-()]/g, '') || '',
      scheduledDate,
      notes: `Chuyến giao theo hợp đồng ${contract.contractNumber}.`,
    });

    contractService.getFulfillment(contract.id)
      .then((lines) => {
        if (cancelled) return;
        const list = Array.isArray(lines) ? lines : [];
        setFulfillmentLines(list);
        const initQty = {};
        list.forEach((line) => {
          const key = line.rfqItemId || line.lineId;
          const rem = line.remainingQuantity ?? line.remaining ?? 0;
          initQty[key] = rem > 0 ? rem : 0;
        });
        setLineQuantities(initQty);
      })
      .catch(() => {
        if (!cancelled) message.error('Không thể tải dữ liệu khối lượng còn lại của hợp đồng.');
      })
      .finally(() => {
        if (!cancelled) setLoadingLines(false);
      });

    return () => {
      cancelled = true;
    };
  }, [contract, form, open]);

  const handleQuantityChange = (key, val, maxVal) => {
    const num = Number(val || 0);
    const valid = Math.max(0, Math.min(num, maxVal));
    setLineQuantities((prev) => ({
      ...prev,
      [key]: valid,
    }));
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (values.scheduledDate.startOf('day').isBefore(minimumScheduledDate())) {
        form.setFields([{ name: 'scheduledDate', errors: ['Ngày giao phải cách thời điểm tạo chuyến ít nhất 24 giờ.'] }]);
        return;
      }

      const items = fulfillmentLines
        .map((line) => {
          const key = line.rfqItemId || line.lineId;
          const qty = Number(lineQuantities[key] || 0);
          return {
            rfqItemId: line.rfqItemId || line.lineId,
            quantity: qty,
            remaining: line.remainingQuantity ?? line.remaining ?? 0,
            name: line.productName,
          };
        })
        .filter((item) => item.quantity > 0);

      if (fulfillmentLines.length > 0 && items.length === 0) {
        message.warning('Vui lòng nhập số lượng lớn hơn 0 cho ít nhất một mặt hàng cần giao trong đợt này.');
        return;
      }

      for (const item of items) {
        if (item.quantity > item.remaining) {
          message.error(`Số lượng giao cho "${item.name}" (${item.quantity}) vượt quá số lượng còn lại (${item.remaining}).`);
          return;
        }
      }

      setLoading(true);

      const payload = {
        contractId: contract.id,
        orderId: null,
        deliveryType: values.deliveryType,
        scheduledDate: values.scheduledDate ? values.scheduledDate.format('YYYY-MM-DD') : null,
        fromAddress: values.fromAddress,
        toAddress: values.toAddress,
        recipientName: values.recipientName,
        recipientPhone: values.recipientPhone,
        trackingCode: values.trackingCode || null,
        notes: values.notes || null,
        items: items.map((i) => ({ rfqItemId: i.rfqItemId, quantity: i.quantity })),
      };

      await contractService.createDelivery(payload);
      message.success('Khởi tạo đợt giao hàng cho hợp đồng thành công!');
      onSuccess?.();
      onClose();
    } catch (err) {
      if (err?.errorFields) return;
      const msg = err?.response?.data?.message || err?.message || 'Không thể tạo chuyến giao hàng.';
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TruckOutlined style={{ color: '#8c1524', fontSize: 20 }} />
          <span>Tạo Đợt Giao Hàng (Split Shipment) · {contract?.contractNumber}</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Xác nhận tạo đợt giao"
      cancelText="Hủy"
      confirmLoading={loading}
      width={720}
      centered
      destroyOnHidden
      okButtonProps={{ style: { background: '#8c1524', borderColor: '#8c1524' } }}
    >
      <div style={{ paddingTop: 8 }}>
        <Alert
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
          message="Chia đợt giao hàng theo khối lượng hợp đồng"
          description="Nhập số lượng giao của từng mặt hàng trong đợt này. Hệ thống sẽ tự động gán số thứ tự đợt và kiểm tra không vượt quá khối lượng còn lại."
        />

        <Form form={form} layout="vertical">
          <Card size="small" title="Số lượng sản phẩm giao trong đợt này" style={{ marginBottom: 16 }}>
            {loadingLines ? (
              <div style={{ textAlign: 'center', padding: 20 }}>
                <Spin size="small" /> Đang tải danh mục hàng...
              </div>
            ) : fulfillmentLines.length === 0 ? (
              <Text type="secondary">Hợp đồng không có dòng sản phẩm chi tiết.</Text>
            ) : (
              <Table
                size="small"
                pagination={false}
                rowKey={(record) => record.lineId || record.rfqItemId}
                dataSource={fulfillmentLines}
                columns={[
                  {
                    title: 'Sản phẩm',
                    dataIndex: 'productName',
                    render: (name, rec) => (
                      <div>
                        <Text strong>{name}</Text>
                        {rec.unit && <Text type="secondary"> ({rec.unit})</Text>}
                      </div>
                    ),
                  },
                  {
                    title: 'Tổng',
                    dataIndex: 'totalQuantity',
                    align: 'right',
                    width: 80,
                    render: (v, r) => (v ?? r.total ?? 0).toLocaleString('vi-VN'),
                  },
                  {
                    title: 'Đã giao',
                    dataIndex: 'deliveredQuantity',
                    align: 'right',
                    width: 90,
                    render: (v, r) => (v ?? r.delivered ?? 0).toLocaleString('vi-VN'),
                  },
                  {
                    title: 'Còn lại',
                    dataIndex: 'remainingQuantity',
                    align: 'right',
                    width: 90,
                    render: (v, r) => {
                      const rem = v ?? r.remaining ?? 0;
                      return <Text strong style={{ color: rem > 0 ? '#d48806' : '#52c41a' }}>{rem}</Text>;
                    },
                  },
                  {
                    title: 'Giao đợt này',
                    key: 'qtyInput',
                    width: 140,
                    render: (_, rec) => {
                      const key = rec.rfqItemId || rec.lineId;
                      const rem = rec.remainingQuantity ?? rec.remaining ?? 0;
                      return (
                        <InputNumber
                          min={0}
                          max={rem}
                          value={lineQuantities[key] ?? 0}
                          disabled={rem <= 0}
                          onChange={(val) => handleQuantityChange(key, val, rem)}
                          style={{ width: '100%' }}
                        />
                      );
                    },
                  },
                ]}
              />
            )}
          </Card>

          <Form.Item
            name="scheduledDate"
            label="Ngày hẹn giao hàng"
            rules={[{ required: true, message: 'Vui lòng chọn ngày giao hàng dự kiến.' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              disabledDate={(current) => current && current.isBefore(minimumScheduledDate(), 'day')}
            />
          </Form.Item>

          <Space style={{ display: 'flex' }} size={12}>
            <Form.Item
              name="recipientName"
              label="Tên người nhận"
              style={{ flex: 1 }}
              rules={[{ required: true, message: 'Vui lòng nhập tên người nhận.' }]}
            >
              <Input placeholder="Tên người nhận hàng" />
            </Form.Item>
            <Form.Item
              name="recipientPhone"
              label="Số điện thoại"
              style={{ flex: 1 }}
              rules={[{ required: true, message: 'Vui lòng nhập SĐT người nhận.' }]}
            >
              <Input placeholder="09xxxxxxxx" />
            </Form.Item>
          </Space>

          <Form.Item
            name="fromAddress"
            label="Địa chỉ xuất kho (Bên Bán)"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ xuất kho.' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="toAddress"
            label="Địa chỉ giao hàng (Bên Mua)"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ giao hàng.' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="trackingCode"
            label="Mã vận đơn / Biển số xe (Tùy chọn)"
          >
            <Input placeholder="VD: VNPOST-882941 hoặc 29C-123.45" />
          </Form.Item>

          <Form.Item
            name="notes"
            label="Ghi chú giao hàng"
          >
            <TextArea rows={2} placeholder="Chỉ dẫn tài xế, yêu cầu bốc dỡ, lưu kho lạnh..." />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
