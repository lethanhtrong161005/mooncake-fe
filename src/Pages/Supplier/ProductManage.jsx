import { useCallback, useEffect, useState } from 'react';
import {
  Alert, Button, Card, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Switch,
  Table, Tag, Upload, message,
} from 'antd';
import {
  DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, UploadOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import productService from '../../services/productService';

const key = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
const money = (value) => Number(value || 0).toLocaleString('vi-VN');

function statusTag(status) {
  const config = status === 'Active' ? ['success', 'Đang bán'] : status === 'OutOfStock'
    ? ['warning', 'Hết hàng'] : ['default', 'Bản nháp'];
  return <Tag color={config[0]}>{config[1]}</Tag>;
}

export default function ProductManage({ onNavigate }) {
  const [form] = Form.useForm();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [uploads, setUploads] = useState([]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [catalog, categoryRows] = await Promise.all([
        productService.mine({ page: 1, pageSize: 100, sort: 'updatedAtDesc' }),
        productService.categories(),
      ]);
      setItems(catalog.items || []);
      setCategories(categoryRows || []);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setEditing(null);
    setUploads([]);
    form.setFieldsValue({
      unit: 'box', minOrderQty: 1, supportsCustomPackaging: false,
      variants: [{ name: '', sku: '', priceAdjustment: 0, initialStockQty: 0, isGiftSet: false }],
    });
    setOpen(true);
  };

  const openEdit = async (row) => {
    setSaving(true);
    try {
      const product = await productService.mineDetail(row.productId);
      setEditing(product);
      setUploads((product.images || []).map((image) => ({
        uid: image.mediaAssetId, name: `Ảnh ${image.sortOrder + 1}`, status: 'done', url: image.imageUrl,
        mediaAssetId: image.mediaAssetId, isPrimary: image.isPrimary,
      })));
      form.setFieldsValue({ ...product, variants: product.variants || [] });
      setOpen(true);
    } catch (error) {
      message.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const upload = async ({ file, onSuccess, onError }) => {
    try {
      const media = await productService.uploadMedia(file, 'ProductGallery', key());
      setUploads((current) => [...current, {
        uid: media.mediaAssetId || media.id, name: file.name, status: 'done', url: media.publicUrl,
        mediaAssetId: media.mediaAssetId || media.id,
      }]);
      onSuccess?.(media);
    } catch (error) {
      onError?.(error);
      message.error(error.message);
    }
  };

  const save = async (values) => {
    const mediaIds = uploads.map((file) => file.mediaAssetId).filter(Boolean);
    if (!editing && mediaIds.length === 0) {
      message.error('Cần tải lên ít nhất một ảnh sản phẩm.');
      return;
    }
    setSaving(true);
    try {
      if (!editing) {
        await productService.create({
          ...values,
          maxOrderQty: values.maxOrderQty || null,
          variants: values.variants.map((variant) => ({ ...variant, imageAssetId: null })),
          images: mediaIds.map((mediaAssetId, index) => ({ mediaAssetId, sortOrder: index, isPrimary: index === 0 })),
        }, key());
      } else {
        const core = {
          name: values.name, description: values.description || null, ingredients: values.ingredients || null, categoryId: values.categoryId,
          basePrice: values.basePrice, minOrderQty: values.minOrderQty, maxOrderQty: values.maxOrderQty || null,
          unit: values.unit, supportsCustomPackaging: values.supportsCustomPackaging,
          expectedVersion: editing.version,
        };
        let updated = await productService.update(editing.productId, core, key());
        if (mediaIds.length > 0) {
          updated = await productService.gallery(editing.productId, {
            expectedVersion: updated.version,
            images: mediaIds.map((mediaAssetId, index) => ({ mediaAssetId, sortOrder: index, isPrimary: index === 0 })),
          }, key());
        }
      }
      message.success(editing ? 'Đã cập nhật sản phẩm.' : 'Đã tạo sản phẩm ở trạng thái bản nháp.');
      setOpen(false);
      await load();
    } catch (error) {
      message.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const publish = async (row, isPublished) => {
    try {
      await productService.publication(row.productId, { expectedVersion: row.version, isPublished }, key());
      message.success(isPublished ? 'Sản phẩm đã được xuất bản.' : 'Sản phẩm đã được ẩn khỏi catalog.');
      await load();
    } catch (error) { message.error(error.message); }
  };

  const remove = async (row) => {
    try {
      await productService.remove(row.productId, row.version, key());
      message.success('Đã xoá sản phẩm.');
      await load();
    } catch (error) { message.error(error.message); }
  };

  const columns = [
    { title: 'Sản phẩm', dataIndex: 'name', render: (name, row) => <Space><img alt="" src={row.primaryImageUrl} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6, background: '#f5f5f5' }} /><div><strong>{name}</strong><br /><small>{row.variantCount} biến thể · tồn {row.totalStockQty}</small></div></Space> },
    { title: 'Giá', render: (_, row) => `${money(row.minPrice)} – ${money(row.maxPrice)} đ` },
    { title: 'Trạng thái', dataIndex: 'effectiveStatus', render: statusTag },
    { title: 'Cập nhật', dataIndex: 'updatedAtUtc', render: (value) => new Date(value).toLocaleDateString('vi-VN') },
    { title: '', width: 210, render: (_, row) => <Space>
      <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(row)}>Sửa</Button>
      <Button size="small" icon={<EyeOutlined />} onClick={() => publish(row, row.effectiveStatus === 'Inactive')}>
        {row.effectiveStatus === 'Inactive' ? 'Đăng bán' : 'Ẩn'}
      </Button>
      <Popconfirm title="Xoá sản phẩm này?" onConfirm={() => remove(row)}><Button danger size="small" icon={<DeleteOutlined />} /></Popconfirm>
    </Space> },
  ];

  return <ColonyAdminLayout role="Supplier" activeKey="nha-cung-cap/quan-ly-san-pham" onNavigate={onNavigate}
    title="Sản phẩm và biến thể" subtitle="Quản lý catalog B2B, SKU, tồn kho và trạng thái xuất bản"
    extra={<Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>Thêm sản phẩm</Button>}>
    <Alert type="info" showIcon style={{ marginBottom: 16 }} message="Mỗi sản phẩm cần tối thiểu một biến thể và một ảnh trước khi xuất bản." />
    <Card><Table rowKey="productId" loading={loading} columns={columns} dataSource={items} pagination={false} locale={{ emptyText: 'Chưa có sản phẩm. Hãy tạo sản phẩm đầu tiên.' }} /></Card>
    <Modal title={editing ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm'} open={open} width={900} destroyOnClose
      onCancel={() => setOpen(false)} onOk={() => form.submit()} confirmLoading={saving} okText={editing ? 'Lưu thay đổi' : 'Tạo bản nháp'}>
      <Form form={form} layout="vertical" onFinish={save} initialValues={{ unit: 'box' }}>
        <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, min: 2, max: 255 }]}><Input /></Form.Item>
        <Form.Item name="description" label="Mô tả"><Input.TextArea rows={3} maxLength={10000} /></Form.Item>
        <Form.Item name="ingredients" label="Thành phần nguyên liệu" extra="Nhập theo từng dòng hoặc phân tách bằng dấu phẩy để khách hàng dễ kiểm tra."><Input.TextArea rows={3} maxLength={10000} /></Form.Item>
        <Space align="start" style={{ display: 'flex' }}>
          <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true }]}><Select style={{ width: 260 }} options={categories.map((x) => ({ value: x.id, label: x.name }))} /></Form.Item>
          <Form.Item name="basePrice" label="Giá cơ bản" rules={[{ required: true }]}><InputNumber min={0} precision={0} style={{ width: 160 }} /></Form.Item>
          <Form.Item name="unit" label="Đơn vị" rules={[{ required: true }]}><Select style={{ width: 120 }} options={['piece', 'box', 'set', 'tray'].map((x) => ({ value: x, label: x }))} /></Form.Item>
          <Form.Item name="minOrderQty" label="Đặt tối thiểu" rules={[{ required: true }]}><InputNumber min={1} style={{ width: 130 }} /></Form.Item>
          <Form.Item name="maxOrderQty" label="Đặt tối đa"><InputNumber min={1} style={{ width: 130 }} /></Form.Item>
        </Space>
        <Form.Item name="supportsCustomPackaging" label="Hỗ trợ bao bì tuỳ chỉnh" valuePropName="checked"><Switch /></Form.Item>
        <Form.Item label="Ảnh sản phẩm" required={!editing} extra="Tối đa 10 ảnh; ảnh đầu tiên là ảnh chính.">
          <Upload listType="picture-card" customRequest={upload} fileList={uploads} maxCount={10}
            onRemove={(file) => setUploads((current) => current.filter((item) => item.uid !== file.uid))}>
            {uploads.length < 10 && <div><UploadOutlined /><div>Tải ảnh</div></div>}
          </Upload>
        </Form.Item>
        {!editing && <><strong>Biến thể ban đầu</strong><Form.List name="variants">
          {(fields, { add, remove }) => <>{fields.map((field, index) => <Card size="small" key={field.key} style={{ marginTop: 8 }} extra={fields.length > 1 && <Button type="link" danger onClick={() => remove(field.name)}>Bỏ</Button>}>
            <Space wrap><Form.Item {...field} name={[field.name, 'name']} label="Tên" rules={[{ required: true }]}><Input style={{ width: 190 }} /></Form.Item>
              <Form.Item {...field} name={[field.name, 'sku']} label="SKU" rules={[{ required: true, pattern: /^[A-Za-z0-9._-]+$/ }]}><Input style={{ width: 150 }} /></Form.Item>
              <Form.Item {...field} name={[field.name, 'priceAdjustment']} label="Chênh lệch giá" rules={[{ required: true }]}><InputNumber style={{ width: 140 }} /></Form.Item>
              <Form.Item {...field} name={[field.name, 'initialStockQty']} label="Tồn kho" rules={[{ required: true }]}><InputNumber min={0} style={{ width: 110 }} /></Form.Item>
              <Form.Item {...field} name={[field.name, 'weightGram']} label="Khối lượng (g)"><InputNumber min={1} style={{ width: 120 }} /></Form.Item>
              <Form.Item {...field} name={[field.name, 'isGiftSet']} label="Hộp quà" valuePropName="checked"><Switch /></Form.Item>
            </Space></Card>)}<Button style={{ marginTop: 10 }} onClick={() => add({ priceAdjustment: 0, initialStockQty: 0, isGiftSet: false })}>Thêm biến thể</Button></>}
        </Form.List></>}
      </Form>
    </Modal>
  </ColonyAdminLayout>;
}
