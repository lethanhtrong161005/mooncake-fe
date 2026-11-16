import { useCallback, useState } from 'react';
import { Alert, App, Button, Card, Drawer, Empty, Form, Input, InputNumber, Modal, Select, Skeleton, Space, Table, Tag, Typography } from 'antd';
import { CrownOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import ThemeTokenForm from '../../components/shop/ThemeTokenForm';
import ShopMediaUpload from '../../components/shop/ShopMediaUpload';
import ShopRenderer from '../../components/shop/ShopRenderer';
import { useShopResource, useShopMutation, useDirtyExit } from '../../hooks/useShopResource';
import { shopTemplateService } from '../../services/shopService';
import { RENDERERS, SECTION_OPTIONS, THEME_DEFAULTS, shopError } from '../../constants/shop';
import { hasThemeContrast } from '../../utils/shopTheme';
import RowActionMenu from '../../components/common/RowActionMenu';
import { TruncatedTooltip } from '../../components/common/TableCellHelpers';

function TemplateEditor({ template, onClose, onSaved }) {
  const { modal, message } = App.useApp();
  const [form] = Form.useForm();
  const [dirty, setDirty] = useState(false);
  const [uploading, setUploading] = useState(false);
  const mutation = useShopMutation();
  useDirtyExit(dirty);

  const initial = template
    ? {
        code: template.code,
        name: template.name,
        description: template.description,
        sortOrder: template.sortOrder,
        preview: template.previewAssetId ? { id: template.previewAssetId, url: template.previewImageUrl } : null,
        rendererKey: template.currentRevision.rendererKey,
        defaults: template.currentRevision.defaults,
        layout: template.currentRevision.layout,
      }
    : {
        sortOrder: 0,
        rendererKey: 'heritage',
        defaults: THEME_DEFAULTS,
        layout: { sectionOrder: ['Hero', 'Story', 'Products', 'Reviews', 'Contact'], productColumnsDesktop: 3 },
      };

  const values = Form.useWatch([], form) || initial;
  const close = () => (dirty ? modal.confirm({ title: 'Bỏ bản nháp mẫu giao diện?', onOk: onClose }) : onClose());
  const save = async (fields) => {
    const definition = {
      name: fields.name.trim(),
      description: fields.description?.trim() || null,
      sortOrder: fields.sortOrder,
      previewAssetId: fields.preview?.id || null,
      rendererKey: fields.rendererKey,
      schemaVersion: 1,
      defaults: fields.defaults,
      layout: fields.layout,
    };
    const body = template ? { ...definition, expectedVersion: template.version } : { ...definition, code: fields.code };
    const result = await mutation.run(
      template ? `publish:${template.id}` : 'create-template',
      body,
      (key) => (template ? shopTemplateService.publish(template.id, body, key) : shopTemplateService.create(body, key))
    );
    if (result.ok) {
      setDirty(false);
      message.success(template ? 'Đã phát hành phiên bản mới. Gian hàng cũ giữ phiên bản đang dùng.' : 'Đã tạo mẫu giao diện.');
      onSaved();
    }
  };

  return (
    <Drawer
      open
      size="large"
      title={template ? `Phát hành phiên bản mới · ${template.code} · v${template.version}` : 'Tạo mẫu giao diện'}
      onClose={close}
      mask={{ closable: !dirty && !mutation.busy }}
      closable={!mutation.busy}
    >
      <Form form={form} layout="vertical" initialValues={initial} onValuesChange={() => setDirty(true)} onFinish={save} disabled={mutation.busy}>
        {!template && (
          <Form.Item
            name="code"
            label="Mã mẫu (cố định)"
            rules={[{ required: true, min: 3, max: 50, pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: '3–50 ký tự chữ thường, số và dấu gạch ngang.' }]}
          >
            <Input maxLength={50} />
          </Form.Item>
        )}
        <Form.Item name="name" label="Tên mẫu" rules={[{ required: true, whitespace: true, min: 2, max: 100 }]}>
          <Input maxLength={100} />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <Input.TextArea maxLength={1000} rows={3} />
        </Form.Item>
        <Form.Item name="sortOrder" label="Thứ tự" rules={[{ required: true }]}>
          <InputNumber min={0} max={10000} precision={0} />
        </Form.Item>
        <Form.Item name="preview" label="Ảnh mẫu">
          <ShopMediaUpload purpose="TemplatePreview" administrator onBusyChange={setUploading} />
        </Form.Item>
        <Form.Item name="rendererKey" label="Bố cục" rules={[{ required: true }]}>
          <Select options={RENDERERS} />
        </Form.Item>
        <Form.Item
          name={['layout', 'sectionOrder']}
          label="Các phần hiển thị (theo thứ tự chọn)"
          rules={[
            { required: true },
            {
              validator: (_, selected) =>
                selected?.includes('Products') && selected?.includes('Contact')
                  ? Promise.resolve()
                  : Promise.reject(new Error('Bắt buộc có phần sản phẩm và liên hệ.')),
            },
          ]}
        >
          <Select mode="multiple" options={SECTION_OPTIONS} />
        </Form.Item>
        <Form.Item name={['layout', 'productColumnsDesktop']} label="Số cột sản phẩm" rules={[{ required: true }]}>
          <Select options={[2, 3, 4].map((value) => ({ value, label: `${value} cột` }))} />
        </Form.Item>
        <Typography.Title level={5}>Thông số mặc định</Typography.Title>
        <ThemeTokenForm prefix={['defaults']} />
        {!hasThemeContrast(values.defaults) && <Alert type="warning" title="Các cặp màu phải đạt độ tương phản 4.5:1." className="mb-3" />}
        {mutation.error && (
          <Alert
            type="error"
            title={shopError(mutation.error)}
            description="Bản nháp được giữ lại. Nếu có xung đột, đóng và mở lại bản mới trước khi sửa tiếp."
            className="mb-3"
          />
        )}
        <Space style={{ margin: '16px 0' }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={mutation.busy}
            disabled={uploading || !hasThemeContrast(values.defaults)}
            style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
          >
            {template ? 'Phát hành phiên bản' : 'Tạo mẫu'}
          </Button>
          <Button onClick={close}>Đóng</Button>
        </Space>
      </Form>
      <Card title="Xem trước bố cục" className="border-[#e4dcd3]">
        <ShopRenderer
          shop={{ name: values.name || 'Tên mẫu giao diện', description: values.description }}
          appearance={{ rendererKey: values.rendererKey, defaults: values.defaults, layout: values.layout }}
          preview
        />
      </Card>
    </Drawer>
  );
}

function TemplateDetailEditor({ id, onClose, onSaved }) {
  const loader = useCallback((signal) => shopTemplateService.detail(id, signal), [id]);
  const resource = useShopResource(loader);
  if (resource.loading) return <Drawer open onClose={onClose} title="Đang tải mẫu"><Skeleton active /></Drawer>;
  if (resource.error) return <Drawer open onClose={onClose}><Alert type="error" title={shopError(resource.error)} /></Drawer>;
  return <TemplateEditor template={resource.data} onClose={onClose} onSaved={onSaved} />;
}

function TemplateAction({ action, onClose, onSaved }) {
  const { message } = App.useApp();
  const mutation = useShopMutation();
  const { template, kind } = action;
  const body =
    kind === 'availability'
      ? { expectedVersion: template.version, isActive: !template.isActive }
      : { expectedVersion: template.version, isPremium: !template.isPremium };
  return (
    <Modal
      open
      title={kind === 'availability' ? `${template.isActive ? 'Ẩn' : 'Hiển thị'} mẫu ${template.name}?` : `Đổi phân loại mẫu ${template.name}?`}
      onCancel={onClose}
      cancelButtonProps={{ disabled: mutation.busy }}
      confirmLoading={mutation.busy}
      okButtonProps={{ style: { backgroundColor: '#7d1322', borderColor: '#7d1322' } }}
      onOk={async () => {
        const result = await mutation.run(`${kind}:${template.id}`, body, (key) => shopTemplateService[kind](template.id, body, key));
        if (result.ok) {
          message.success('Đã cập nhật mẫu.');
          onSaved();
        }
      }}
      destroyOnHidden
    >
      <Typography.Paragraph className="text-[#574d49] mb-2">
        Phiên bản đang xem: v{template.version}. Gian hàng đã chọn mẫu tiếp tục dùng phiên bản đã lưu. Nhãn Premium chỉ dùng để phân loại, không phát sinh phí.
      </Typography.Paragraph>
      {mutation.error && <Alert type="error" title={shopError(mutation.error)} />}
    </Modal>
  );
}

export default function ShopTemplates({ onNavigate }) {
  const [query, setQuery] = useState({ page: 1, pageSize: 20, sort: 'sortOrderAsc' });
  const [editor, setEditor] = useState(null);
  const [action, setAction] = useState(null);
  const loader = useCallback((signal) => shopTemplateService.list(query, signal), [query]);
  const resource = useShopResource(loader);
  const saved = () => {
    setEditor(null);
    setAction(null);
    resource.reload();
  };
  const totalCount = resource.data?.totalCount || 0;

  return (
    <ColonyAdminLayout
      role="Admin"
      activeKey="admin/mau-gian-hang"
      title="Mẫu giao diện gian hàng"
      onNavigate={onNavigate}
      subtitle="Phiên bản đã phát hành được giữ cố định cho từng gian hàng đang sử dụng."
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
          onClick={() => setEditor('new')}
        >
          Tạo mẫu giao diện
        </Button>
      }
    >
      <section className="rounded-lg border border-[#e4dcd3] bg-white overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e4dcd3] bg-[#faf7f2] px-5 py-3 text-[13px] text-[#574d49]">
          <span>Giữ tối thiểu 5 mẫu đang hiển thị để nhà cung cấp lựa chọn. Mẫu mặc định luôn được kích hoạt.</span>
          <span className="text-xs font-medium text-[#6c625e] tabular-nums">{totalCount} mẫu</span>
        </div>

        <div className="p-4 sm:p-5">
          <Form
            onFinish={(values) => setQuery({ ...values, page: 1, pageSize: query.pageSize, sort: 'sortOrderAsc' })}
            className="mb-4 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2.5"
          >
            <Form.Item name="q" className="!mb-0 w-full sm:w-64">
              <Input prefix={<SearchOutlined className="text-[#8c817c]" />} placeholder="Tìm tên hoặc mã mẫu" allowClear maxLength={100} />
            </Form.Item>
            <Form.Item name="isActive" className="!mb-0 w-full sm:w-40">
              <Select allowClear placeholder="Hiển thị" options={[{ value: true, label: 'Đang hiện' }, { value: false, label: 'Đã ẩn' }]} />
            </Form.Item>
            <Form.Item name="isPremium" className="!mb-0 w-full sm:w-40">
              <Select allowClear placeholder="Phân loại" options={[{ value: true, label: 'Premium' }, { value: false, label: 'Tiêu chuẩn' }]} />
            </Form.Item>
            <div className="flex items-center gap-2">
              <Button htmlType="submit">Lọc</Button>
              <Button icon={<ReloadOutlined />} onClick={resource.reload} loading={resource.loading}>
                Làm mới
              </Button>
            </div>
          </Form>

          {resource.error && <Alert type="error" showIcon title={shopError(resource.error)} className="mb-4" />}

          <Table
            rowKey="id"
            size="middle"
            loading={resource.loading}
            dataSource={resource.data?.items || []}
            scroll={{ x: 'max-content' }}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={<span className="text-[#6c625e]">Chưa có mẫu giao diện phù hợp</span>}
                />
              ),
            }}
            pagination={{
              current: query.page,
              pageSize: query.pageSize,
              total: totalCount,
              onChange: (page, pageSize) => setQuery((old) => ({ ...old, page, pageSize })),
            }}
            columns={[
              {
                title: 'Mẫu giao diện',
                dataIndex: 'name',
                width: 260,
                render: (name, item) => (
                  <div className="max-w-[240px]">
                    <TruncatedTooltip
                      text={name}
                      tooltipContent={`${name} (${item.code})`}
                      className="font-medium text-[#231a18]"
                    />
                    <TruncatedTooltip
                      text={item.code}
                      className="font-mono text-xs text-[#6c625e]"
                    />
                  </div>
                ),
              },
              {
                title: 'Bố cục',
                width: 135,
                render: (_, item) => (
                  <div className="max-w-[120px]">
                    <TruncatedTooltip text={item.currentRevision?.rendererKey} className="font-mono text-xs text-[#4b423e]" />
                  </div>
                ),
              },
              {
                title: 'Revision',
                align: 'center',
                width: 90,
                render: (_, item) => <span className="tabular-nums text-[#574d49]">r{item.currentRevision?.revision ?? 1}</span>,
              },
              {
                title: 'Phiên bản',
                dataIndex: 'version',
                align: 'center',
                width: 95,
                render: (value) => <span className="tabular-nums text-[#574d49]">v{value}</span>,
              },
              {
                title: 'Trạng thái',
                width: 165,
                render: (_, item) => (
                  <Space size={6}>
                    <Tag
                      style={
                        item.isActive
                          ? { backgroundColor: '#edf5ef', borderColor: '#c5dccb', color: '#2d5a43', marginInlineEnd: 0 }
                          : { backgroundColor: '#faf7f2', borderColor: '#e4dcd3', color: '#6c625e', marginInlineEnd: 0 }
                      }
                    >
                      {item.isActive ? 'Đang hiện' : 'Đã ẩn'}
                    </Tag>
                    {item.isPremium && (
                      <Tag style={{ backgroundColor: '#fdf8ec', borderColor: '#e8d49c', color: '#9a6b16', marginInlineEnd: 0 }}>
                        Premium
                      </Tag>
                    )}
                  </Space>
                ),
              },
              {
                title: 'Thao tác',
                align: 'center',
                width: 84,
                render: (_, template) => (
                  <RowActionMenu
                    ariaLabel={`Thao tác mẫu ${template.name}`}
                    actions={[
                      {
                        key: 'edit',
                        label: 'Chỉnh sửa mẫu',
                        icon: <EditOutlined />,
                        onClick: () => setEditor(template.id),
                      },
                      {
                        key: 'availability',
                        label: template.isActive ? 'Ẩn mẫu giao diện' : 'Hiện mẫu giao diện',
                        icon: template.isActive ? <EyeInvisibleOutlined /> : <EyeOutlined />,
                        onClick: () => setAction({ template, kind: 'availability' }),
                      },
                      {
                        key: 'premium',
                        label: template.isPremium ? 'Bỏ nhãn Premium' : 'Đặt làm Premium',
                        icon: <CrownOutlined />,
                        onClick: () => setAction({ template, kind: 'premium' }),
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        </div>
      </section>
      {editor === 'new' ? (
        <TemplateEditor onClose={() => setEditor(null)} onSaved={saved} />
      ) : (
        editor && <TemplateDetailEditor key={editor} id={editor} onClose={() => setEditor(null)} onSaved={saved} />
      )}
      {action && <TemplateAction action={action} onClose={() => setAction(null)} onSaved={saved} />}
    </ColonyAdminLayout>
  );
}
