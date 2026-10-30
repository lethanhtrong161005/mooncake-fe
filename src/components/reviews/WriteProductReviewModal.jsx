import { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Rate,
  Input,
  Select,
  Button,
  Upload,
  message,
  Alert,
} from 'antd';
import {
  CameraOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import reviewService from '../../services/reviewService';

const { TextArea } = Input;

export default function WriteProductReviewModal({
  visible,
  onClose,
  productId,
  productName,
  onSuccess,
}) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [eligibleItems, setEligibleItems] = useState([]);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (!visible || !productId) return;
    let cancelled = false;
    reviewService
      .getEligibleOrderItemsForProduct(productId)
      .then((items) => {
        if (cancelled) return;
        setEligibleItems(items || []);
        if (items && items.length > 0) {
          form.setFieldsValue({
            orderItemId: items[0].orderItemId,
            productVariantId: items[0].productVariantId,
          });
        }
      })
      .catch(() => {
        if (!cancelled) setEligibleItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, [visible, productId, form]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const selected = eligibleItems.find((i) => i.orderItemId === values.orderItemId);
      const mediaUrls = fileList
        .map((f) => f.url || f.response?.url || f.thumbUrl)
        .filter(Boolean);


      const payload = {
        orderItemId: values.orderItemId,
        productVariantId: selected?.productVariantId || values.productVariantId || null,
        rating: values.rating,
        title: values.title?.trim() || null,
        content: values.content.trim(),
        mediaUrls,
      };

      const result = await reviewService.createProductReview(productId, payload);
      message.success('Đăng đánh giá sản phẩm thành công!');
      form.resetFields();
      setFileList([]);
      onSuccess?.(result);
      onClose();
    } catch (err) {
      message.error(err.message || 'Không thể gửi đánh giá sản phẩm.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-stone-800">
          <CheckCircleFilled className="text-amber-600 text-lg" />
          <span>Đánh Giá Mua Hàng Xác Thực (Verified Purchase)</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      width={600}
      className="luxury-review-modal"
    >
      <div className="p-1">
        <div className="mb-4 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
          <div className="text-xs text-amber-800 font-medium">Sản phẩm:</div>
          <div className="text-sm font-bold text-amber-950">{productName || 'Bánh Trung Thu'}</div>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            rating: 5,
            title: 'Chất lượng xuất sắc, đúng cam kết',
          }}
          onFinish={handleSubmit}
        >
          {eligibleItems.length === 0 ? (
            <Alert
              type="warning"
              showIcon
              title="Chưa đủ điều kiện đánh giá"
              description="Bạn chỉ có thể viết nhận xét sau khi đã đặt hàng và đơn hàng được giao thành công (Delivered)."
            />
          ) : (
            <>
              {eligibleItems.length > 1 && (
                <Form.Item
                  name="orderItemId"
                  label="Chọn đợt mua hàng & biến thể"
                  rules={[{ required: true, message: 'Vui lòng chọn đơn hàng' }]}
                >
                  <Select
                    options={eligibleItems.map((item) => ({
                      value: item.orderItemId,
                      label: `${item.variantName || 'Mặc định'} (Đơn #${item.orderNumber})`,
                    }))}
                  />
                </Form.Item>
              )}

            {eligibleItems.length === 1 && (
              <Form.Item name="orderItemId" hidden>
                <Input />
              </Form.Item>
            )}

            <Form.Item
              name="rating"
              label={<span className="font-semibold text-stone-700">Mức độ hài lòng của bạn</span>}
              rules={[{ required: true, message: 'Vui lòng chấm điểm số sao' }]}
            >
              <div className="p-3 bg-stone-50 rounded-xl flex items-center justify-center">
                <Rate className="text-2xl text-amber-500 touch-manipulation" />
              </div>
            </Form.Item>

            <Form.Item name="title" label="Tiêu đề nhận xét">
              <Input placeholder="Tóm tắt ngắn gọn cảm nhận của bạn" maxLength={100} />
            </Form.Item>

            <Form.Item
              name="content"
              label={<span className="font-semibold text-stone-700">Chi tiết trải nghiệm thực tế</span>}
              rules={[
                { required: true, message: 'Vui lòng nhập nội dung đánh giá' },
                { min: 10, message: 'Nội dung tối thiểu 10 ký tự' },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Chia sẻ về độ tươi ngon của nhân bánh, bao bì đóng gói, độ sắc nét in logo doanh nghiệp..."
                maxLength={2000}
                showCount
              />
            </Form.Item>

            <Form.Item label="Đính kèm ảnh thực tế tại bàn tiệc / công ty (Tối đa 5 ảnh)">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={({ fileList: fl }) => setFileList(fl)}
                beforeUpload={() => false}
                maxCount={5}
                accept="image/*"
              >
                {fileList.length < 5 && (
                  <div className="flex flex-col items-center justify-center text-stone-500">
                    <CameraOutlined className="text-xl mb-1 text-amber-700" />
                    <div className="text-xs">Chụp / Chọn ảnh</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <div className="flex justify-end gap-3 pt-2 border-t border-stone-200">
              <Button onClick={onClose} disabled={submitting}>
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={submitting}
                className="bg-amber-800 hover:bg-amber-700 font-semibold border-amber-800"
              >
                Đăng Đánh Giá Xác Thực
              </Button>
            </div>
          </>
        )}
      </Form>
      </div>
    </Modal>
  );
}
