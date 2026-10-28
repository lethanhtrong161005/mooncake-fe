import { useCallback, useState } from 'react';
import { Alert, App, Button, Card, Col, Form, Row, Select, Skeleton, Space, Tag, Typography } from 'antd';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import ThemeTokenForm from '../../components/shop/ThemeTokenForm';
import ShopRenderer from '../../components/shop/ShopRenderer';
import { useShopResource, useShopMutation, useDirtyExit } from '../../hooks/useShopResource';
import { useAuth } from '../../hooks/useAuth';
import { shopService } from '../../services/shopService';
import { shopError } from '../../constants/shop';
import { effectiveTheme, hasThemeContrast } from '../../utils/shopTheme';

function AppearanceEditor({ data, onSaved, onDirtyChange }) {
  const { modal, message } = App.useApp();
  const { shop, preview, catalog } = data;
  const current = shop.appearance;
  const [form] = Form.useForm();
  const [tokens, setTokens] = useState(current.effectiveTokens);
  const [selectedId, setSelectedId] = useState(current.templateRevisionId);
  const [dirty, setDirty] = useState(false);
  const [additional, setAdditional] = useState([]);
  const [nextCursor, setNextCursor] = useState(catalog.nextCursor);
  const mutation = useShopMutation();
  const currentOption = { id: current.templateId, name: `${current.templateName} · đang dùng${current.isSelectable ? '' : ' (đã ẩn)'}`,
    isPremium: current.isPremium, currentRevision: { id: current.templateRevisionId, rendererKey: current.rendererKey,
      schemaVersion: current.schemaVersion, revision: current.revision, defaults: current.defaults, layout: current.layout } };
  const choices = [...new Map([currentOption, ...catalog.items, ...additional].map((item) => [item.currentRevision.id, item])).values()];
  const selected = choices.find((item) => item.currentRevision.id === selectedId) || currentOption;
  const appearance = { ...current, templateId: selected.id, templateRevisionId: selectedId, rendererKey: selected.currentRevision.rendererKey,
    defaults: selected.currentRevision.defaults, layout: selected.currentRevision.layout, overrides: tokens };
  const updateDirty = (value) => { setDirty(value); onDirtyChange(value); };
  const select = (id) => {
    const apply = () => { const choice = choices.find((item) => item.currentRevision.id === id);
      setSelectedId(id); setTokens(choice.currentRevision.defaults); form.setFieldsValue(choice.currentRevision.defaults); updateDirty(true); };
    if (dirty) modal.confirm({ title: 'Đổi mẫu sẽ đặt lại màu và thông số đang chỉnh.', onOk: apply }); else apply();
  };
  const reset = () => { setTokens(current.effectiveTokens); form.setFieldsValue(current.effectiveTokens); setSelectedId(current.templateRevisionId); updateDirty(false); };
  const save = async () => {
    const body = { expectedVersion: shop.version, templateId: selected.id, templateRevisionId: selectedId, overrides: tokens };
    const result = await mutation.run('appearance', body, (key) => shopService.appearance(body, key));
    if (result.ok) { updateDirty(false); message.success('Đã lưu giao diện gian hàng.'); onSaved(); }
  };
  return <Row gutter={[24, 24]}><Col xs={24} xl={8}><Card title="Mẫu và thông số">
    <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
      <Select aria-label="Chọn mẫu giao diện" style={{ width: '100%' }} value={selectedId} onChange={select} disabled={shop.status === 'Suspended'}
        options={choices.map((item) => ({ value: item.currentRevision.id, label: `${item.name}${item.isPremium ? ' · Premium' : ''} · v${item.currentRevision.revision}` }))} />
      {nextCursor && <Button onClick={async () => { try { const next = await shopService.catalog(nextCursor); setAdditional((items) => [...items, ...next.items]); setNextCursor(next.nextCursor); } catch (error) { message.error(shopError(error)); } }}>Xem thêm mẫu</Button>}
      <Typography.Text type="secondary">Premium là nhãn mẫu; không phát sinh thanh toán.</Typography.Text>
      <Form form={form} layout="vertical" initialValues={current.effectiveTokens} disabled={shop.status === 'Suspended' || mutation.busy}
        onValuesChange={(_, values) => { setTokens(values); updateDirty(true); }} onFinish={save}>
        <ThemeTokenForm />
        {!hasThemeContrast(effectiveTheme(selected.currentRevision.defaults, tokens)) && <Alert type="warning" showIcon title="Điều chỉnh màu để đạt độ tương phản tối thiểu 4.5:1." />}
        {mutation.error && <Alert type="error" title={shopError(mutation.error)} style={{ marginBottom: 12 }} />}
        <Space><Button type="primary" htmlType="submit" disabled={!dirty || shop.status === 'Suspended' || !hasThemeContrast(effectiveTheme(selected.currentRevision.defaults, tokens))} loading={mutation.busy}>Lưu giao diện</Button>
          <Button disabled={mutation.busy} onClick={reset}>Bỏ thay đổi</Button></Space>
      </Form>
    </Space>
  </Card></Col><Col xs={24} xl={16}><Card title={<Space>Xem trước trực tiếp {dirty && <Tag color="gold">Chưa lưu</Tag>}</Space>}>
    <div className="shop-live-preview"><ShopRenderer shop={{ ...shop, isVerified: true }} appearance={appearance} products={preview.products} preview /></div>
  </Card></Col></Row>;
}

export default function ShopAppearance({ onNavigate }) {
  const { user } = useAuth(); const { modal } = App.useApp();
  const [dirty, setDirty] = useState(false); useDirtyExit(dirty);
  const loader = useCallback(async (signal) => {
    if (!user?.id) return null;
    const shop = await shopService.mine(signal);
    if (!shop) return null;
    const [preview, catalog] = await Promise.all([shopService.preview(signal), shopService.catalog(undefined, signal)]);
    return { shop, preview, catalog };
  }, [user?.id]);
  const resource = useShopResource(loader);
  const navigate = (key) => onNavigate?.(key);
  const reload = () => dirty ? modal.confirm({ title: 'Tải lại và bỏ bản nháp?', onOk: () => { setDirty(false); resource.reload(); } }) : resource.reload();
  return <ColonyAdminLayout role="Supplier" activeKey="nha-cung-cap/giao-dien-gian-hang" title="Giao diện gian hàng"
    subtitle="Chọn mẫu, xem trước và lưu khi bạn đã sẵn sàng." onNavigate={navigate} extra={<Button onClick={reload}>Tải phiên bản mới</Button>}>
    {resource.error && <Alert type="error" title={shopError(resource.error)} />}
    {resource.loading && !resource.data ? <Skeleton active /> : resource.data ? <>
      {resource.data.shop.status === 'Suspended' && <Alert type="error" title="Gian hàng đang bị đình chỉ; giao diện chỉ đọc." description={resource.data.shop.suspensionReason} />}
      <AppearanceEditor key={`${user.id}:${resource.data.shop.version}`} data={resource.data} onSaved={resource.reload} onDirtyChange={setDirty} />
    </> : !resource.error && <Card title="Bạn chưa có gian hàng"><Button type="primary" onClick={() => navigate('nha-cung-cap/thiet-lap-gian-hang')}>Tạo gian hàng trước</Button></Card>}
  </ColonyAdminLayout>;
}
