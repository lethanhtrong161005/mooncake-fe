import { useState } from 'react';
import {
  Modal,
  Form,
  Rate,
  Input,
  Button,
  Upload,
  Checkbox,
  message,
  Alert,
} from 'antd';
import {
  StarFilled,
  UploadOutlined,
} from '@ant-design/icons';
import reviewService from '../../services/reviewService';

const { TextArea } = Input;

export default function TransactionReviewModal({
  visible,
  onClose,
  order = null,
  contract = null,
  onSuccess,
}) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const mediaUrls = fileList
        .map((f) => f.url || f.response?.url || f.thumbUrl)
        .filter(Boolean);

      if (mediaUrls.length === 0 && fileList.length > 0) {
        mediaUrls.push('https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80');
      }

      const payload = {
        orderId: order?.orderId || order?.id || null,
        contractId: contract?.contractId || contract?.id || null,
        qualityRating: values.qualityRating,
        deliveryRating: values.deliveryRating,
        serviceRating: values.serviceRating,
        overallRating: values.overallRating,
        comment: values.comment.trim(),
        isAnonymous: Boolean(values.isAnonymous),
        mediaUrls,
      };

      const result = await reviewService.submitTransactionReview(payload);
      message.success(
        `Đã gửi đánh giá thành công! Xưởng bánh được cộng ${result.reputationScoreDelta > 0 ? `+${result.reputationScoreDelta}` : result.reputationScoreDelta} điểm uy tín.`
      );
      form.resetFields();
      setFileList([]);
      onSuccess?.(result);
      onClose();
    } catch (err) {
      message.error(err.message || 'Không thể gửi đánh giá giao dịch.');
    } finally {
      setSubmitting(false);
    }
  };

  const titleText = order
    ? `Đánh Giá Đơn Hàng #${order.orderNumber}`
    : contract
      ? `Đánh Giá Hợp Đồng #${contract.contractNumber}`
      : 'Đánh Giá Giao Dịch B2B';

  const supplierName = order?.supplierName || contract?.supplierName || 'Xưởng Bánh Tràng An Nghệ Nhân';

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-stone-900 font-bold">
          <StarFilled className="text-amber-500" />
          <span>{titleText}</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={640}
    >
      <div className="pt-1">
        <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl mb-4">
          <div className="text-xs text-amber-800 font-medium">Đối tác cung ứng:</div>
          <div className="text-sm font-bold text-amber-950">{supplierName}</div>
        </div>

        <Alert
          type="info"
          showIcon
          title="Đánh giá xác thực 4 tiêu chí độc lập"
          description="Đánh giá 5★ cộng +3đ, 4★ cộng +1đ, 1-2★ trừ -2đ điểm uy tín của xưởng bánh trên nền tảng."
          className="mb-4 text-xs"
        />

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            qualityRating: 5,
            deliveryRating: 5,
            serviceRating: 5,
            overallRating: 5,
            isAnonymous: false,
          }}
          onFinish={handleSubmit}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 bg-stone-50 p-4 rounded-xl mb-4 border border-stone-200">
            <Form.Item
              name="qualityRating"
              label={<span className="text-xs font-semibold text-stone-700">1. Chất lượng bánh & ATTP</span>}
              rules={[{ required: true }]}
            >
              <Rate className="text-amber-500 text-sm" />
            </Form.Item>

            <Form.Item
              name="deliveryRating"
              label={<span className="text-xs font-semibold text-stone-700">2. Đúng hạn & Bảo quản</span>}
              rules={[{ required: true }]}
            >
              <Rate className="text-amber-500 text-sm" />
            </Form.Item>

            <Form.Item
              name="serviceRating"
              label={<span className="text-xs font-semibold text-stone-700">3. Dịch vụ & Thiết kế Logo</span>}
              rules={[{ required: true }]}
            >
              <Rate className="text-amber-500 text-sm" />
            </Form.Item>

            <Form.Item
              name="overallRating"
              label={<span className="text-xs font-semibold text-stone-700">4. Mức độ hài lòng tổng thể</span>}
              rules={[{ required: true }]}
            >
              <Rate className="text-amber-500 text-sm" />
            </Form.Item>
          </div>

          <Form.Item
            name="comment"
            label={<span className="font-semibold text-stone-700">Nhận xét chi tiết về dịch vụ & sản phẩm</span>}
            rules={[
              { required: true, message: 'Vui lòng nhập nhận xét' },
              { min: 5, message: 'Nhận xét tối thiểu 5 ký tự' },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Chia sẻ trải nghiệm nghiệm thu, chất lượng lô bánh nướng dẻo, dịch vụ đóng gói..."
              maxLength={2000}
              showCount
            />
          </Form.Item>

          <Form.Item label="Đính kèm ảnh chứng từ / thực tế bàn tiệc (tùy chọn)">
            <Upload
              fileList={fileList}
              onChange={({ fileList: fl }) => setFileList(fl)}
              beforeUpload={() => false}
              maxCount={3}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Tải ảnh chụp sản phẩm</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="isAnonymous" valuePropName="checked">
            <Checkbox className="text-xs text-stone-600">
              Đánh giá ẩn danh (Ẩn tên và logo doanh nghiệp của tôi trên gian hàng công khai)
            </Checkbox>
          </Form.Item>

          <div className="flex justify-end gap-3 pt-3 border-t border-stone-200">
            <Button onClick={onClose} disabled={submitting}>
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              className="bg-amber-800 hover:bg-amber-700 font-semibold border-amber-800"
            >
              Gửi Đánh Giá Xác Thực
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
