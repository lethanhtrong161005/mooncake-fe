import { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import reviewService from '../../services/reviewService';

const { TextArea } = Input;

export default function SupplierReviewReplyModal({
  visible,
  onClose,
  reviewId,
  isProductReview = false,
  reviewAuthor = 'Khách hàng',
  onSuccess,
}) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const payload = { replyContent: values.replyContent.trim() };
      let result;
      if (isProductReview) {
        result = await reviewService.replyProductReview(reviewId, payload);
      } else {
        result = await reviewService.replyTransactionReview(reviewId, payload);
      }

      message.success('Đã gửi phản hồi chính thức từ gian hàng!');
      form.resetFields();
      onSuccess?.(result);
      onClose();
    } catch (err) {
      message.error(err.message || 'Không thể gửi phản hồi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-stone-800">
          <CommentOutlined className="text-amber-700" />
          <span>Phản Hồi Đánh Giá Của {reviewAuthor}</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={520}
    >
      <div className="pt-2">
        <div className="mb-4 text-xs text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
          * Lưu ý: Mỗi đánh giá chỉ được phản hồi chính thức <strong>1 lần duy nhất</strong>. Nội dung phản hồi sẽ được hiển thị công khai dưới bài nhận xét của khách hàng.
        </div>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="replyContent"
            label="Nội dung phản hồi từ xưởng bánh"
            rules={[
              { required: true, message: 'Vui lòng nhập nội dung phản hồi' },
              { min: 5, message: 'Nội dung phản hồi tối thiểu 5 ký tự' },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Gửi lời cảm ơn Quý khách hoặc giải thích chi tiết chính sách hỗ trợ của gian hàng..."
              maxLength={1000}
              showCount
            />
          </Form.Item>

          <div className="flex justify-end gap-3 pt-2">
            <Button onClick={onClose} disabled={submitting}>
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              className="bg-amber-800 hover:bg-amber-700 border-amber-800"
            >
              Gửi Phản Hồi
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

