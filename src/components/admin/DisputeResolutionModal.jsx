import { useState } from 'react';
import { Modal, Form, Radio, InputNumber, Input, Alert, message, Tag } from 'antd';
import { SafetyCertificateOutlined, WarningOutlined } from '@ant-design/icons';
import { adminService } from '../../services/adminService';

const { TextArea } = Input;

export default function DisputeResolutionModal({
  open,
  dispute,
  onCancel,
  onSuccess,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const heldEscrow = dispute?.heldEscrowAmount ?? 0;

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      await adminService.resolveDispute(dispute.id, {
        resolutionType: values.resolutionType,
        refundAmount: values.refundAmount || 0,
        adminVerdict: values.adminVerdict,
        deductReputationPoints: values.resolutionType === 'SupplierAtFault' ? 20 : 0,
      });

      message.success('Đã hoàn tất phân xử trọng tài SafeTrade thành công!');
      form.resetFields();
      onSuccess?.();
    } catch (err) {
      if (err.errorFields) return;
      message.error(err.message || 'Không thể thực hiện phân xử.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
          <SafetyCertificateOutlined />
          <span>Trọng Tài Tranh Chấp Hợp Đồng SafeTrade</span>
        </div>
      }
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel?.();
      }}
      onOk={handleSubmit}
      okText="Xác nhận phán quyết & Hoàn tiền cọc"
      okButtonProps={{ danger: true, loading }}
      cancelText="Hủy bỏ"
      width={600}
      centered
    >
      <div className="py-2 space-y-3">
        {/* Dispute Summary Box */}
        <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-stone-700">Mã hợp đồng:</span>
            <Tag color="blue" className="font-mono">{dispute?.contractNumber || 'HĐ-B2B'}</Tag>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-stone-500">Khách hàng khiếu nại:</span>
            <span className="font-medium text-stone-800">{dispute?.customerName || 'Bên mua'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-stone-500">Nhà cung cấp bị khiếu nại:</span>
            <span className="font-medium text-stone-800">{dispute?.supplierName || 'Bên bán'}</span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-stone-200">
            <span className="text-stone-500">Số dư ký quỹ Escrow đang giữ:</span>
            <span className="font-bold text-amber-700 text-sm">
              {Number(heldEscrow).toLocaleString('vi-VN')} ₫
            </span>
          </div>
        </div>

        {/* Dispute Reason & Evidence */}
        <Alert
          type="warning"
          showIcon
          icon={<WarningOutlined />}
          title="Nội dung khiếu nại"
          description={dispute?.disputeReason || 'Khách hàng khiếu nại vi phạm tiến độ/chất lượng.'}
          className="rounded-lg text-xs"
        />

        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            resolutionType: 'SupplierAtFault',
            refundAmount: heldEscrow,
          }}
          className="pt-2"
        >
          <Form.Item
            name="resolutionType"
            label={<span className="font-semibold text-xs text-stone-700">Kết luận bên có lỗi</span>}
            rules={[{ required: true, message: 'Vui lòng chọn kết luận.' }]}
          >
            <Radio.Group className="grid grid-cols-1 gap-2">
              <Radio value="SupplierAtFault">
                <span className="text-xs">
                  <strong>Lỗi do Nhà cung cấp</strong> (Hoàn cọc cho bên mua & trừ 20đ uy tín xưởng)
                </span>
              </Radio>
              <Radio value="CustomerAtFault">
                <span className="text-xs">
                  <strong>Lỗi do Khách hàng</strong> (Từ chối nhận hàng vô căn cứ, giải ngân cho xưởng)
                </span>
              </Radio>
              <Radio value="MutualAgreement">
                <span className="text-xs">
                  <strong>Hòa giải hai bên</strong> (Hoàn một phần tiền cọc theo thỏa thuận)
                </span>
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="refundAmount"
            label={<span className="font-semibold text-xs text-stone-700">Số tiền hoàn cọc cho bên mua (VNĐ)</span>}
            rules={[
              { required: true, message: 'Vui lòng nhập số tiền hoàn.' },
              () => ({
                validator(_, value) {
                  if (value > heldEscrow) {
                    return Promise.reject(new Error('Số tiền hoàn không được vượt quá số dư ký quỹ thực tế.'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <InputNumber
              className="w-full"
              min={0}
              max={heldEscrow}
              step={1000000}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              addonAfter="₫"
            />
          </Form.Item>

          <Form.Item
            name="adminVerdict"
            label={<span className="font-semibold text-xs text-stone-700">Lời phán quyết & Căn cứ phân xử</span>}
            rules={[{ required: true, message: 'Vui lòng nhập lý do/phán quyết.' }]}
          >
            <TextArea
              rows={3}
              placeholder="Nhập kết luận chính thức và căn cứ phân xử để gửi thông báo tới cả hai bên..."
              maxLength={1000}
              showCount
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

