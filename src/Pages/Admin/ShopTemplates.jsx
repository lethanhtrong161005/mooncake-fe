import { useCallback, useState } from 'react';
import { Alert, App, Button, Card, Col, Drawer, Form, Input, InputNumber, Modal, Row, Select, Skeleton, Space, Table, Tag, Typography } from 'antd';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import ThemeTokenForm from '../../components/shop/ThemeTokenForm';
import ShopMediaUpload from '../../components/shop/ShopMediaUpload';
import ShopRenderer from '../../components/shop/ShopRenderer';
import { useShopResource, useShopMutation, useDirtyExit } from '../../hooks/useShopResource';
import { shopTemplateService } from '../../services/shopService';
import { RENDERERS, SECTION_OPTIONS, THEME_DEFAULTS, shopError } from '../../constants/shop';
import { hasThemeContrast } from '../../utils/shopTheme';

function TemplateEditor({ template, onClose, onSaved }) {
  const { modal, message } = App.useApp(); const [form] = Form.useForm();
  const [dirty, setDirty] = useState(false); const [uploading, setUploading] = useState(false);
  const mutation = useShopMutation(); useDirtyExit(dirty);
  const initial = template ? { code: template.code, name: template.name, description: template.description,
    sortOrder: template.sortOrder, preview: template.previewAssetId ? { id: template.previewAssetId, url: template.previewImageUrl } : null,
    rendererKey: template.currentRevision.rendererKey, defaults: template.currentRevision.defaults,
    layout: template.currentRevision.layout } : { sortOrder: 0, rendererKey: 'heritage', defaults: THEME_DEFAULTS,
    layout: { sectionOrder: ['Hero', 'Story', 'Products', 'Reviews', 'Contact'], productColumnsDesktop: 3 } };
  const values = Form.useWatch([], form) || initial;
  const close = () => dirty ? modal.confirm({ title: 'Bỏ bản nháp mẫu giao diện?', onOk: onClose }) : onClose();
  const save = async (fields) => {
    const definition = { name: fields.name.trim(), description: fields.description?.trim() || null,
      sortOrder: fields.sortOrder, previewAssetId: fields.preview?.id || null, rendererKey: fields.rendererKey,
      schemaVersion: 1, defaults: fields.defaults, layout: fields.layout };
    const body = template ? { ...definition, expectedVersion: template.version } : { ...definition, code: fields.code };
    const result = await mutation.run(template ? `publish:${template.id}` : 'create-template', body,
      (key) => template ? shopTemplateService.publish(template.id, body, key) : shopTemplateService.create(body, key));
    if (result.ok) { setDirty(false); message.success(template ? 'Đã phát hành phiên bản mới. Gian hàng cũ giữ phiên bản đang dùng.' : 'Đã tạo mẫu giao diện.'); onSaved(); }
  };
  return <Drawer open size="large" title={template ? `Phát hành phiên bản mới · ${template.code} · version ${template.version}` : 'Tạo mẫu giao diện'}
    onClose={close} maskClosable={!dirty && !mutation.busy} closable={!mutation.busy}>
    <Form form={form} layout="vertical" initialValues={initial} onValuesChange={() => setDirty(true)} onFinish={save} disabled={mutation.busy}>
      {!template && <Form.Item name="code" label="Mã mẫu (cố định)" rules={[{ required: true, min: 3, max: 50, pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: '3–50 ký tự chữ thường, số và dấu gạch ngang.' }]}><Input maxLength={50} /></Form.Item>}
      <Form.Item name="name" label="Tên mẫu" rules={[{ required: true, whitespace: true, min: 2, max: 100 }]}><Input maxLength={100} /></Form.Item>
      <Form.Item name="description" label="Mô tả"><Input.TextArea maxLength={1000} rows={3} /></Form.Item>
      <Form.Item name="sortOrder" label="Thứ tự" rules={[{ required: true }]}><InputNumber min={0} max={10000} precision={0} /></Form.Item>
      <Form.Item name="preview" label="Ảnh mẫu"><ShopMediaUpload purpose="TemplatePreview" administrator onBusyChange={setUploading} /></Form.Item>
      <Form.Item name="rendererKey" label="Bố cục" rules={[{ required: true }]}><Select options={RENDERERS} /></Form.Item>
      <Form.Item name={['layout', 'sectionOrder']} label="Các phần hiển thị (theo thứ tự chọn)" rules={[{ required: true }, { validator: (_, selected) =>
        selected?.includes('Products') && selected?.includes('Contact') ? Promise.resolve() : Promise.reject(new Error('Bắt buộc có phần sản phẩm và liên hệ.')) }]}>
        <Select mode="multiple" options={SECTION_OPTIONS} /></Form.Item>
      <Form.Item name={['layout', 'productColumnsDesktop']} label="Số cột sản phẩm" rules={[{ required: true }]}><Select options={[2, 3, 4].map((value) => ({ value, label: `${value} cột` }))} /></Form.Item>
      <Typography.Title level={5}>Thông số mặc định</Typography.Title><ThemeTokenForm prefix={['defaults']} />
      {!hasThemeContrast(values.defaults) && <Alert type="warning" title="Các cặp màu phải đạt độ tương phản 4.5:1." />}
      {mutation.error && <Alert type="error" title={shopError(mutation.error)} description="Bản nháp được giữ lại. Nếu có xung đột, đóng và mở lại bản mới trước khi sửa tiếp." />}
      <Space style={{ margin: '16px 0' }}><Button type="primary" htmlType="submit" loading={mutation.busy} disabled={uploading || !hasThemeContrast(values.defaults)}>
        {template ? 'Phát hành phiên bản' : 'Tạo mẫu'}</Button><Button onClick={close}>Đóng</Button></Space>
    </Form>
    <Card title="Xem trước bố cục"><ShopRenderer shop={{ name: values.name || 'Tên mẫu giao diện', description: values.description }}
      appearance={{ rendererKey: values.rendererKey, defaults: values.defaults, layout: values.layout }} preview /></Card>
  </Drawer>;
}

function TemplateDetailEditor({ id, onClose, onSaved }) {
  const loader = useCallback((signal) => shopTemplateService.detail(id, signal), [id]); const resource = useShopResource(loader);
  if (resource.loading) return <Drawer open onClose={onClose} title="Đang tải mẫu"><Skeleton active /></Drawer>;
  if (resource.error) return <Drawer open onClose={onClose}><Alert type="error" title={shopError(resource.error)} /></Drawer>;
  return <TemplateEditor template={resource.data} onClose={onClose} onSaved={onSaved} />;
}

function TemplateAction({ action, onClose, onSaved }) {
  const { message } = App.useApp(); const mutation = useShopMutation(); const { template, kind } = action;
  const body = kind === 'availability' ? { expectedVersion: template.version, isActive: !template.isActive } : { expectedVersion: template.version, isPremium: !template.isPremium };
  return <Modal open title={kind === 'availability' ? `${template.isActive ? 'Ẩn' : 'Hiển thị'} mẫu ${template.name}?` : `Đổi nhãn Premium của ${template.name}?`}
    onCancel={onClose} cancelButtonProps={{ disabled: mutation.busy }} confirmLoading={mutation.busy} onOk={async () => {
      const result = await mutation.run(`${kind}:${template.id}`, body, (key) => shopTemplateService[kind](template.id, body, key));
      if (result.ok) { message.success('Đã cập nhật mẫu.'); onSaved(); }
    }}><Typography.Paragraph>Phiên bản đang xem: {template.version}. Gian hàng đã chọn mẫu tiếp tục dùng phiên bản đã lưu. Premium là nhãn phân loại và không tạo phí.</Typography.Paragraph>
    {mutation.error && <Alert type="error" title={shopError(mutation.error)} />}</Modal>;
}

export default function ShopTemplates({ onNavigate }) {
  const [query, setQuery] = useState({ page: 1, pageSize: 20, sort: 'sortOrderAsc' });
  const [editor, setEditor] = useState(null); const [action, setAction] = useState(null);
  const loader = useCallback((signal) => shopTemplateService.list(query, signal), [query]); const resource = useShopResource(loader);
  const saved = () => { setEditor(null); setAction(null); resource.reload(); };
  return <ColonyAdminLayout role="Admin" activeKey="admin/mau-gian-hang" title="Mẫu giao diện gian hàng" onNavigate={onNavigate}
    subtitle="Phiên bản đã phát hành được giữ cố định cho từng gian hàng." extra={<Button type="primary" onClick={() => setEditor('new')}>Tạo mẫu giao diện</Button>}>
    <Row gutter={[16, 16]}><Col span={24}><Card>
      <Alert type="info" showIcon title="Giữ tối thiểu 5 mẫu có thể chọn. Mẫu mặc định luôn hiển thị." />
      <Form layout="inline" style={{ margin: '16px 0' }} onFinish={(values) => setQuery({ ...values, page: 1, pageSize: query.pageSize, sort: 'sortOrderAsc' })}>
        <Form.Item name="q"><Input placeholder="Tìm tên hoặc mã mẫu" allowClear maxLength={100} /></Form.Item>
        <Form.Item name="isActive"><Select allowClear placeholder="Hiển thị" style={{ width: 140 }} options={[{ value: true, label: 'Đang hiện' }, { value: false, label: 'Đã ẩn' }]} /></Form.Item>
        <Form.Item name="isPremium"><Select allowClear placeholder="Loại mẫu" style={{ width: 140 }} options={[{ value: true, label: 'Premium' }, { value: false, label: 'Tiêu chuẩn' }]} /></Form.Item>
        <Button htmlType="submit">Lọc</Button><Button onClick={resource.reload}>Tải lại</Button>
      </Form>
      {resource.error && <Alert type="error" title={shopError(resource.error)} />}
      <Table rowKey="id" loading={resource.loading} dataSource={resource.data?.items || []} scroll={{ x: 1000 }}
        pagination={{ current: query.page, pageSize: query.pageSize, total: resource.data?.totalCount || 0, onChange: (page, pageSize) => setQuery((old) => ({ ...old, page, pageSize })) }} columns={[
          { title: 'Tên mẫu', dataIndex: 'name' }, { title: 'Mã', dataIndex: 'code' },
          { title: 'Bố cục', render: (_, item) => item.currentRevision?.rendererKey },
          { title: 'Revision', render: (_, item) => item.currentRevision?.revision }, { title: 'Version', dataIndex: 'version' },
          { title: 'Trạng thái', render: (_, item) => <Space><Tag color={item.isActive ? 'green' : 'default'}>{item.isActive ? 'Đang hiện' : 'Đã ẩn'}</Tag>{item.isPremium && <Tag color="gold">Premium</Tag>}</Space> },
          { title: 'Thao tác', render: (_, template) => <Space wrap><Button onClick={() => setEditor(template.id)}>Sửa / phát hành</Button>
            <Button onClick={() => setAction({ template, kind: 'availability' })}>{template.isActive ? 'Ẩn mẫu' : 'Hiện mẫu'}</Button>
            <Button onClick={() => setAction({ template, kind: 'premium' })}>{template.isPremium ? 'Bỏ Premium' : 'Đặt Premium'}</Button></Space> },
        ]} />
    </Card></Col></Row>
    {editor === 'new' ? <TemplateEditor onClose={() => setEditor(null)} onSaved={saved} /> : editor && <TemplateDetailEditor key={editor} id={editor} onClose={() => setEditor(null)} onSaved={saved} />}
    {action && <TemplateAction action={action} onClose={() => setAction(null)} onSaved={saved} />}
  </ColonyAdminLayout>;
}
