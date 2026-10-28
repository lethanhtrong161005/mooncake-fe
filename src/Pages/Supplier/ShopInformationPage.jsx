import { useCallback, useState } from 'react';
import { Alert, App, Button, Card, Form, Input, Select, Skeleton, Space, Tag, Typography } from 'antd';
import { ReloadOutlined, ShopOutlined } from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import ShopMediaUpload from '../../components/shop/ShopMediaUpload';
import { useShopResource, useShopMutation, useDirtyExit } from '../../hooks/useShopResource';
import { shopService } from '../../services/shopService';
import { SHOP_STATUS, shopError } from '../../constants/shop';
import { setShopFormErrors } from '../../utils/shopTheme';
import { useAuth } from '../../hooks/useAuth';

function InformationForm({ shop, catalog, onSaved, onDirtyChange }) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const mutation = useShopMutation();
  const [uploading, setUploading] = useState(0);
  const [extraTemplates, setExtraTemplates] = useState([]);
  const [nextCursor, setNextCursor] = useState(catalog.nextCursor);
  const frozen = shop?.status === 'Suspended';
  const submit = async (values) => {
    const selected = [...catalog.items, ...extraTemplates].find((template) => template.id === values.templateId);
    const body = { name: values.name, description: values.description || null,
      logoAssetId: values.logo?.id || null, bannerAssetId: values.banner?.id || null,
      publicContactEmail: values.publicContactEmail || null, publicContactPhone: values.publicContactPhone || null,
      publicAddress: values.publicAddress || null,
      ...(shop ? { expectedVersion: shop.version } : { slug: values.slug, templateId: selected?.id, templateRevisionId: selected?.currentRevision?.id }),
    };
    const result = await mutation.run(shop ? 'update' : 'create', body, (key) => shop ? shopService.update(body, key) : shopService.create(body, key));
    if (result.ok) { onDirtyChange(false); message.success(shop ? 'Đã lưu thông tin gian hàng.' : 'Đã tạo gian hàng ở trạng thái ẩn.'); onSaved(); }
    else if (result.error) setShopFormErrors(form, result.error);
  };
  const uploadBusy = (busy) => setUploading((value) => value + (busy ? 1 : -1));
  return <Card title={shop ? 'Thông tin công khai' : 'Tạo gian hàng đầu tiên'}>
    {mutation.error && <Alert type="error" showIcon title={shopError(mutation.error)} style={{ marginBottom: 16 }} />}
    <Form form={form} layout="vertical" disabled={frozen || mutation.busy} initialValues={{
      name: shop?.name || '', description: shop?.description, slug: shop?.slug,
      publicContactEmail: shop?.publicContactEmail, publicContactPhone: shop?.publicContactPhone,
      publicAddress: shop?.publicAddress, logo: shop?.logoAssetId ? { id: shop.logoAssetId, url: shop.logoUrl } : null,
      banner: shop?.bannerAssetId ? { id: shop.bannerAssetId, url: shop.bannerUrl } : null,
      templateId: catalog.items[0]?.id,
    }} onValuesChange={() => onDirtyChange(true)} onFinish={submit}>
      <Form.Item name="name" label="Tên gian hàng" rules={[{ required: true, whitespace: true, min: 2, max: 255 }]}><Input maxLength={255} /></Form.Item>
      <Form.Item name="slug" label="Đường dẫn gian hàng" extra="3–80 ký tự a–z, 0–9 và dấu gạch nối. Không đổi sau khi tạo."
        rules={shop ? [] : [{ required: true, min: 3, max: 80, pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ }]}><Input disabled={!!shop} prefix="/shop/" maxLength={80} /></Form.Item>
      {!shop && <Form.Item name="templateId" label="Mẫu giao diện ban đầu" rules={[{ required: true }]}>
        <Select options={[...catalog.items, ...extraTemplates].map((template) => ({ value: template.id, label: template.name }))} />
      </Form.Item>}
      {!shop && nextCursor && <Button onClick={async () => {
        try { const next = await shopService.catalog(nextCursor); setExtraTemplates((items) => [...items, ...next.items]); setNextCursor(next.nextCursor); }
        catch (error) { message.error(shopError(error)); }
      }}>Xem thêm mẫu</Button>}
      <Form.Item name="description" label="Giới thiệu" rules={[{ max: 2000 }]}><Input.TextArea rows={4} showCount maxLength={2000} /></Form.Item>
      {!shop && <Typography.Paragraph type="secondary">Logo và banner không bắt buộc. Bạn có thể tạo gian hàng trước rồi bổ sung ảnh sau.</Typography.Paragraph>}
      <Form.Item name="logo" label="Logo"><ShopMediaUpload purpose="Logo" onBusyChange={uploadBusy} disabled={frozen} /></Form.Item>
      <Form.Item name="banner" label="Banner"><ShopMediaUpload purpose="Banner" onBusyChange={uploadBusy} disabled={frozen} /></Form.Item>
      <Alert type="info" title="Thông tin dưới đây sẽ hiển thị công khai. Không tự lấy thông tin từ hồ sơ pháp lý."
        style={{ marginBottom: 16 }} />
      <Form.Item name="publicContactEmail" label="Email công khai" rules={[{ type: 'email', max: 255 }]}><Input maxLength={255} /></Form.Item>
      <Form.Item name="publicContactPhone" label="Điện thoại công khai" rules={[{ pattern: /^\+[1-9][0-9]{7,14}$/, message: 'Nhập số quốc tế, ví dụ +84901234567.' }]}><Input maxLength={20} placeholder="+84901234567" /></Form.Item>
      <Form.Item name="publicAddress" label="Địa chỉ công khai" rules={[{ max: 500 }]}><Input maxLength={500} /></Form.Item>
      <Button type="primary" htmlType="submit" disabled={frozen || uploading > 0} loading={mutation.busy}>{shop ? 'Lưu thông tin gian hàng' : 'Tạo gian hàng'}</Button>
    </Form>
  </Card>;
}

export default function ShopInformationPage({ onNavigate }) {
  const { user, refreshCurrentUser } = useAuth();
  const { modal, message } = App.useApp();
  const [dirty, setDirty] = useState(false);
  useDirtyExit(dirty);
  const loader = useCallback(async (signal) => {
    if (!user?.id) return null;
    const [shop, catalog] = await Promise.all([shopService.mine(signal), shopService.catalog(undefined, signal)]);
    return { shop, catalog };
  }, [user?.id]); // Account changes must discard pending owner requests.
  const resource = useShopResource(loader);
  const mutation = useShopMutation();
  const shop = resource.data?.shop;
  const navigate = (key) => onNavigate?.(key);
  const reload = () => dirty ? modal.confirm({ title: 'Tải lại sẽ bỏ bản nháp hiện tại.', onOk: () => { setDirty(false); resource.reload(); } }) : resource.reload();
  const visibility = () => modal.confirm({ title: shop.status === 'Active' ? 'Tạm ẩn gian hàng?' : 'Hiển thị gian hàng công khai?',
    content: 'Thao tác này không hủy đơn hàng hoặc nghĩa vụ giao dịch đang có.', onOk: async () => {
      const body = { expectedVersion: shop.version, status: shop.status === 'Active' ? 'Inactive' : 'Active' };
      const result = await mutation.run('visibility', body, (key) => shopService.visibility(body, key));
      if (result.ok) { message.success('Đã cập nhật trạng thái hiển thị.'); resource.reload(); }
      else { if (result.error?.status === 403) refreshCurrentUser().catch(() => {}); throw result.error; }
    } });
  return <ColonyAdminLayout role="Supplier" activeKey="nha-cung-cap/thiet-lap-gian-hang" title="Thiết lập gian hàng"
    subtitle="Quản lý nhận diện, thông tin liên hệ và việc hiển thị gian hàng." onNavigate={navigate}
    extra={<Button icon={<ReloadOutlined />} onClick={reload}>Tải lại</Button>}>
    {resource.error && <Alert type="error" showIcon title={shopError(resource.error)} action={<Button onClick={reload}>Thử lại</Button>} />}
    {!resource.data && resource.loading ? <Skeleton active /> : resource.data && <Space orientation="vertical" size="large" style={{ width: '100%' }}>
      {shop ? <Card><Space wrap><ShopOutlined /><Typography.Text strong>{shop.name}</Typography.Text>
        <Tag color={shop.status === 'Active' ? 'success' : shop.status === 'Suspended' ? 'error' : 'default'}>{SHOP_STATUS[shop.status]}</Tag>
        <Button onClick={() => navigate('nha-cung-cap/giao-dien-gian-hang')}>Tùy chỉnh giao diện</Button>
        {shop.status === 'Active' && <Button onClick={() => navigate(`shop/${shop.slug}`)}>Xem trang công khai</Button>}
        <Button disabled={dirty || shop.status === 'Suspended'} loading={mutation.busy} onClick={visibility}>{shop.status === 'Active' ? 'Tạm ẩn' : 'Hiển thị gian hàng'}</Button>
      </Space></Card> : <Alert type="info" showIcon title="Bạn đã được duyệt Supplier. Tạo gian hàng để bắt đầu giới thiệu sản phẩm." />}
      {shop?.status === 'Suspended' && <Alert type="error" showIcon title="Gian hàng bị đình chỉ" description={shop.suspensionReason} />}
      {mutation.error && <Alert type="error" title={shopError(mutation.error)} />}
      <InformationForm key={`${user.id}:${shop?.shopId || 'new'}:${shop?.version || 0}`} shop={shop} catalog={resource.data.catalog}
        onSaved={resource.reload} onDirtyChange={setDirty} />
    </Space>}
  </ColonyAdminLayout>;
}
