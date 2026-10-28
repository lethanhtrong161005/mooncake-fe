import { useCallback, useState } from 'react';
import { Alert, App, Button, Card, Descriptions, Drawer, Form, Input, Modal, Select, Space, Table, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import { useShopResource, useShopMutation } from '../../hooks/useShopResource';
import { shopService } from '../../services/shopService';
import { SHOP_STATUS, shopError } from '../../constants/shop';

function Moderation({ shop, onClose, onSaved }) {
  const { message } = App.useApp(); const mutation = useShopMutation();
  const action = shop.status === 'Suspended' ? 'Restore' : 'Suspend';
  const [form] = Form.useForm();
  return <Modal open title={`${action === 'Suspend' ? 'Đình chỉ' : 'Khôi phục'}: ${shop.name}`} onCancel={onClose}
    confirmLoading={mutation.busy} onOk={() => form.submit()} cancelButtonProps={{ disabled: mutation.busy }}>
    <Alert type="info" title={`Trạng thái: ${SHOP_STATUS[shop.status]} · Phiên bản ${shop.version}`}
      description={action === 'Restore' ? 'Khôi phục trạng thái trước đình chỉ. Nhà cung cấp phải còn đủ điều kiện.' : 'Gian hàng bị ẩn và chặn giao dịch mới. Các đơn đã có tiếp tục theo chính sách hiện tại.'} />
    <Form form={form} layout="vertical" onFinish={async ({ reason }) => {
      const body = { action, reason: reason.trim(), expectedVersion: shop.version };
      const result = await mutation.run(`moderate:${shop.shopId}`, body, (key) => shopService.moderate(shop.shopId, body, key));
      if (result.ok) { message.success('Đã cập nhật trạng thái gian hàng.'); onSaved(); }
    }}><Form.Item name="reason" label="Lý do xử lý" rules={[{ required: true, whitespace: true, min: 10, max: 1000, message: 'Nhập lý do từ 10 đến 1000 ký tự.' }]}>
      <Input.TextArea rows={4} maxLength={1000} showCount /></Form.Item></Form>
    {mutation.error && <Alert type="error" title={shopError(mutation.error)} description="Bản nháp lý do được giữ lại. Đóng hộp thoại và tải phiên bản mới nếu có xung đột." />}
  </Modal>;
}

function ShopDetail({ id, onClose, onModerate }) {
  const load = useCallback((signal) => shopService.adminDetail(id, signal), [id]);
  const resource = useShopResource(load); const shop = resource.data;
  return <Drawer open title="Thông tin gian hàng" onClose={onClose} size="large" loading={resource.loading}>
    {resource.error && <Alert type="error" title={shopError(resource.error)} />}
    {shop && <Space orientation="vertical" size="large" style={{ width: '100%' }}>
      <Descriptions bordered column={1} items={[
        { key: 'name', label: 'Tên', children: shop.name }, { key: 'slug', label: 'Đường dẫn', children: `/shop/${shop.slug}` },
        { key: 'supplier', label: 'Hồ sơ nhà cung cấp', children: shop.supplierId },
        { key: 'status', label: 'Trạng thái', children: SHOP_STATUS[shop.status] }, { key: 'version', label: 'Phiên bản', children: shop.version },
        { key: 'description', label: 'Giới thiệu', children: shop.description || '—' },
        { key: 'reason', label: 'Lý do đình chỉ', children: shop.suspensionReason || '—' },
        { key: 'template', label: 'Giao diện', children: `${shop.appearance.templateName} · v${shop.appearance.revision}` },
      ]} /><Button danger={shop.status !== 'Suspended'} onClick={() => onModerate(shop)}>
        {shop.status === 'Suspended' ? 'Khôi phục gian hàng' : 'Đình chỉ gian hàng'}</Button>
    </Space>}
  </Drawer>;
}

export function ShopManagementPanel() {
  const [query, setQuery] = useState({ page: 1, pageSize: 20, sort: 'createdAtDesc' });
  const [detailId, setDetailId] = useState(null); const [moderating, setModerating] = useState(null);
  const load = useCallback((signal) => shopService.adminList(query, signal), [query]);
  const resource = useShopResource(load);
  return <Space orientation="vertical" size="large" style={{ width: '100%' }}>
    <Form layout="inline" onFinish={(values) => setQuery({ ...values, page: 1, pageSize: query.pageSize, sort: values.sort || 'createdAtDesc' })}>
      <Form.Item name="q"><Input placeholder="Tên hoặc đường dẫn gian hàng" maxLength={100} allowClear /></Form.Item>
      <Form.Item name="status"><Select allowClear placeholder="Trạng thái" style={{ width: 170 }} options={Object.entries(SHOP_STATUS).map(([value, label]) => ({ value, label }))} /></Form.Item>
      <Form.Item name="sort"><Select placeholder="Mới nhất" style={{ width: 150 }} options={[{ value: 'createdAtDesc', label: 'Mới nhất' }, { value: 'nameAsc', label: 'Tên A–Z' }]} /></Form.Item>
      <Button type="primary" htmlType="submit">Tìm kiếm</Button><Button onClick={resource.reload}>Tải lại</Button>
    </Form>
    {resource.error && <Alert type="error" title={shopError(resource.error)} />}
    <Table rowKey="shopId" loading={resource.loading} dataSource={resource.data?.items || []} scroll={{ x: 850 }}
      pagination={{ current: query.page, pageSize: query.pageSize, total: resource.data?.totalCount || 0, showSizeChanger: true,
        onChange: (page, pageSize) => setQuery((previous) => ({ ...previous, page, pageSize })) }} columns={[
        { title: 'Gian hàng', dataIndex: 'name' }, { title: 'Đường dẫn', dataIndex: 'slug' },
        { title: 'Trạng thái', dataIndex: 'status', render: (status) => <Tag color={status === 'Active' ? 'green' : status === 'Suspended' ? 'red' : 'default'}>{SHOP_STATUS[status]}</Tag> },
        { title: 'Sản phẩm', dataIndex: 'productCount' }, { title: 'Phiên bản', dataIndex: 'version' },
        { title: 'Thao tác', render: (_, shop) => <Space><Button icon={<EyeOutlined />} onClick={() => setDetailId(shop.shopId)}>Chi tiết</Button>
          <Button danger={shop.status !== 'Suspended'} onClick={() => setModerating(shop)}>{shop.status === 'Suspended' ? 'Khôi phục' : 'Đình chỉ'}</Button></Space> },
      ]} />
    {detailId && <ShopDetail key={detailId} id={detailId} onClose={() => setDetailId(null)} onModerate={setModerating} />}
    {moderating && <Moderation shop={moderating} onClose={() => setModerating(null)} onSaved={() => { setModerating(null); setDetailId(null); resource.reload(); }} />}
  </Space>;
}

export default function ShopManagement({ onNavigate }) {
  return <ColonyAdminLayout role="Admin" activeKey="admin/gian-hang" title="Quản lý gian hàng" subtitle="Tra cứu và xử lý vi phạm với lý do và lịch sử cập nhật." onNavigate={onNavigate}>
    <Card><ShopManagementPanel /></Card>
  </ColonyAdminLayout>;
}
