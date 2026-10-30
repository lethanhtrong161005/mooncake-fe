import { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Radio, message, Alert } from 'antd';
import { CarOutlined } from '@ant-design/icons';
import deliveryService from '../../services/deliveryService';

const { TextArea } = Input;

export default function CreateDeliveryModal({ open, onClose, onSuccess, contracts = [] }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const payload = {
        contractId: values.contractId,
        orderId: null,
        deliveryType: values.deliveryType,
        scheduledDate: values.scheduledDate ? values.scheduledDate.format('YYYY-MM-DD') : null,
        fromAddress: values.fromAddress,
        toAddress: values.toAddress,
        recipientName: values.recipientName,
        recipientPhone: values.recipientPhone,
        trackingCode: values.trackingCode || null,
        notes: values.notes || null,
      };

      await deliveryService.create(payload);
      message.success('Khởi tạo chuyến giao hàng (Đợt hàng) thành công!');
      form.resetFields();
      onSuccess?.();
      onClose();
    } catch (err) {
      if (err.errorFields) return;
      message.error(err.response?.data?.message || err.message || 'Không thể tạo chuyến giao hàng.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-slate-800">
          <CarOutlined className="text-amber-600 text-lg" />
          <span>Tạo Chuyến Giao Hàng Mới (Chia Đợt - Split Shipment)</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Xác nhận Tạo Chuyến Giao"
      cancelText="Hủy"
      confirmLoading={loading}
      width={650}
      centered
      okButtonProps={{ className: 'bg-amber-600 hover:bg-amber-500 font-semibold' }}
    >
      <div className="py-2">
        <Alert
          type="info"
          showIcon
          className="mb-4 bg-amber-50/60 border-amber-200 text-xs"
          message="Đối với đơn hàng/hợp đồng B2B lớn, bạn có thể tạo nhiều chuyến giao tương ứng với các đợt giao mốc Milestone (M2, M3) hoặc giao tới nhiều chi nhánh kho khác nhau."
        />

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            deliveryType: 'SelfArranged',
            fromAddress: 'Kho Xưởng Tràng An Nghệ Nhân, Cụm CN Bát Tràng, Gia Lâm, Hà Nội',
          }}
        >
          <Form.Item
            name="contractId"
            label="Hợp đồng thực hiện"
            rules={[{ required: true, message: 'Vui lòng chọn Hợp đồng áp dụng' }]}
          >
            <Select placeholder="Chọn Hợp đồng B2B đang có hiệu lực (Active)">
              {contracts.map((c) => (
                <Select.Option key={c.id || c.key} value={c.id || c.key}>
                  {c.contractNumber || c.contractNo || 'HD-B2B'} - {c.title || c.customerName || 'Đơn hàng B2B'}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="deliveryType"
              label="Phương thức vận chuyển"
              rules={[{ required: true }]}
            >
              <Radio.Group buttonStyle="solid" className="w-full">
                <Radio.Button value="SelfArranged" className="w-1/2 text-center">
                  Xưởng tự chở
                </Radio.Button>
                <Radio.Button value="PlatformManaged" className="w-1/2 text-center">
                  Đơn vị vận chuyển
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="scheduledDate"
              label="Ngày dự kiến giao"
              rules={[{ required: true, message: 'Vui lòng chọn ngày dự kiến giao' }]}
            >
              <DatePicker className="w-full" placeholder="Chọn ngày giao" format="YYYY-MM-DD" />
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
              <Input placeholder="VD: TA-TRUCK-889 hoặc VTP-123456" />
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

