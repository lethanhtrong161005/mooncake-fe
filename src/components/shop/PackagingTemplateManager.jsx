import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
  message,
} from 'antd';
import {
  CrownOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import packagingTemplateService from '../../services/packagingTemplateService';

const { Text } = Typography;
const { TextArea } = Input;
const money = (val) => `${Number(val || 0).toLocaleString('vi-VN')} ₫`;

export default function PackagingTemplateManager({ shopId }) {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const data = await packagingTemplateService.getMine();
      setTemplates(data || []);
    } catch {
      message.error('Không thể tải danh sách mẫu hộp.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, [shopId]);

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      form.setFieldsValue({
        name: item.name,
        material: item.material,
        dimensions: item.dimensions,
        capacity: item.capacity || 4,
        basePrice: item.basePrice || 0,
        sampleImageUrl: item.sampleImageUrl,
        technique: item.technique,
        minOrderQty: item.minOrderQty || 20,
        description: item.description,
        isActive: item.isActive !== false,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        capacity: 4,
        basePrice: 150000,
        minOrderQty: 20,
        isActive: true,
      });
    }
    setModalOpen(true);
  };

  const handleSave = async (values) => {
    setSubmitting(true);
    try {
      if (editingItem) {
        await packagingTemplateService.update(editingItem.id, values);
        message.success('Cập nhật mẫu hộp quà thành công.');
      } else {
        await packagingTemplateService.create(values);
        message.success('Thêm mẫu hộp quà mới thành công.');
      }
      setModalOpen(false);
      loadTemplates();
    } catch (err) {
      message.error(err?.response?.data?.message || 'Không thể lưu mẫu hộp.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await packagingTemplateService.remove(id);
      message.success('Đã xóa mẫu hộp quà.');
      loadTemplates();
    } catch (err) {
      message.error(err?.response?.data?.message || 'Không thể xóa mẫu hộp.');
    }
  };

  const columns = [
    {
      title: 'Mẫu hộp & Ảnh mẫu',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.sampleImageUrl || '/hero_mooncake_bg.jpg'}
            alt={name}
            className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
            onError={(e) => { e.currentTarget.src = '/hero_mooncake_bg.jpg'; }}
          />
          <div>
            <b className="text-stone-900 block text-xs sm:text-sm">{name}</b>
            <span className="text-[11px] text-stone-500 block">{record.dimensions || 'Kích thước tiêu chuẩn'}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Chất liệu & Kỹ thuật',
      key: 'specs',
      render: (_, record) => (
        <div className="text-xs">
          <span className="text-stone-800 block font-medium">{record.material || 'Gỗ / Giấy mỹ thuật'}</span>
          <span className="text-[11px] text-amber-700">{record.technique || 'Ép kim vàng 24K'}</span>
        </div>
      ),
    },
    {
      title: 'Quy cách & MOQ',
      key: 'capacity',
      render: (_, record) => (
        <div className="text-xs">
          <span className="block text-stone-700">{record.capacity} bánh</span>
          <Tag color="gold" className="m-0 text-[10px]">Min: {record.minOrderQty} hộp</Tag>
        </div>
      ),
    },
    {
      title: 'Phụ phí phôi',
      dataIndex: 'basePrice',
      key: 'basePrice',
      render: (val) => <b className="text-xs text-[#8c1524]">{money(val)}</b>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (val) => (
        <Tag color={val ? 'success' : 'default'} className="text-[11px]">
          {val ? 'Đang nhận gia công' : 'Tạm ngưng'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleOpenModal(record)}
          />
          <Popconfirm
            title="Xác nhận xóa mẫu hộp này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <CrownOutlined className="text-amber-600" />
          <span className="font-bold text-sm sm:text-base">Mẫu Hộp Quà Doanh Nghiệp (Custom Packaging Templates)</span>
        </div>
      }
      extra={
        <Space>
          <Button icon={<ReloadOutlined />} onClick={loadTemplates} loading={loading}>
            Tải lại
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleOpenModal()}
            style={{ background: '#8c1524', borderColor: '#8c1524' }}
          >
            Thêm Mẫu Hộp Mới
          </Button>
        </Space>
      }
      className="mt-6 border-stone-200 shadow-xs rounded-2xl"
    >
      <Text type="secondary" className="block text-xs mb-4">
        Các mẫu hộp quà dưới đây sẽ hiển thị trực tiếp cho khách hàng lựa chọn và phối cảnh 3D khi đặt hàng B2B từ gian hàng của xưởng.
      </Text>

      <Table
        dataSource={templates}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        size="middle"
      />

      {/* Add / Edit Modal */}
      <Modal
        title={editingItem ? 'Chỉnh Sửa Mẫu Hộp Quà' : 'Thêm Mẫu Hộp Quà Mới Cho Xưởng'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={680}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSave} className="pt-2">
          <Form.Item
            name="name"
            label="Tên mẫu hộp quà"
            rules={[{ required: true, message: 'Vui lòng nhập tên mẫu hộp.' }]}
          >
            <Input placeholder="Hộp Sơn Mài Thượng Hạng (4 bánh)" />
          </Form.Item>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item name="material" label="Chất liệu thân hộp">
              <Input placeholder="Gỗ tự nhiên sơn mài cao cấp" />
            </Form.Item>

            <Form.Item name="dimensions" label="Kích thước (D x R x C)">
              <Input placeholder="32 x 32 x 8 cm" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Form.Item name="capacity" label="Sức chứa bánh" rules={[{ required: true }]}>
              <InputNumber min={1} max={12} className="w-full" addonAfter="bánh" />
            </Form.Item>

            <Form.Item name="basePrice" label="Phụ phí phôi hộp" rules={[{ required: true }]}>
              <InputNumber min={0} step={10000} className="w-full" addonAfter="₫" />
            </Form.Item>

            <Form.Item name="minOrderQty" label="MOQ tối thiểu" rules={[{ required: true }]}>
              <InputNumber min={1} className="w-full" addonAfter="hộp" />
            </Form.Item>
          </div>

          <Form.Item name="technique" label="Kỹ thuật gia công logo">
            <Input placeholder="Ép kim vàng 24K, Khắc laser nắp gỗ, Dập nổi..." />
          </Form.Item>

          <Form.Item name="sampleImageUrl" label="URL hình ảnh mẫu chụp thực tế (HTTPS)">
            <Input placeholder="https://example.com/box-photo.jpg" />
          </Form.Item>

          <Form.Item name="description" label="Mô tả chi tiết cấu tạo &amp; khay lót lụa">
            <TextArea rows={3} placeholder="Nắp hít nam châm, khay nhung đỏ sang trọng, quai xách da..." />
          </Form.Item>

          {editingItem && (
            <Form.Item name="isActive" label="Nhận gia công mẫu này" valuePropName="checked">
              <Switch />
            </Form.Item>
          )}

          <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
            <Button onClick={() => setModalOpen(false)}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              style={{ background: '#8c1524', borderColor: '#8c1524' }}
            >
              Lưu mẫu hộp
            </Button>
          </div>
        </Form>
      </Modal>
    </Card>
  );
}

