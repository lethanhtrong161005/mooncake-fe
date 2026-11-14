import { useCallback, useState } from 'react';
import {
  Alert,
  App,
  Button,
  Form,
  Select,
  Skeleton,
  Tag,
} from 'antd';
import {
  CheckCircleOutlined,
  DesktopOutlined,
  EyeOutlined,
  GlobalOutlined,
  MobileOutlined,
  ReloadOutlined,
  ShopOutlined,
  UndoOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import ThemeTokenForm from '../../components/shop/ThemeTokenForm';
import ShopRenderer from '../../components/shop/ShopRenderer';
import {
  useDirtyExit,
  useShopMutation,
  useShopResource,
} from '../../hooks/useShopResource';
import { useAuth } from '../../hooks/useAuth';
import { shopService } from '../../services/shopService';
import { RENDERERS, shopError } from '../../constants/shop';
import { colorContrast, effectiveTheme, hasThemeContrast } from '../../utils/shopTheme';

const RENDERER_LABELS = Object.fromEntries(
  RENDERERS.map((item) => [item.value, item.label.split('—')[0].trim()]),
);

function AppearanceEditor({ data, onSaved, onDirtyChange, onNavigate }) {
  const { modal, message } = App.useApp();
  const { shop, preview, catalog } = data;
  const current = shop.appearance;
  const [form] = Form.useForm();
  const [tokens, setTokens] = useState(current.effectiveTokens);
  const [selectedId, setSelectedId] = useState(current.templateRevisionId);
  const [dirty, setDirty] = useState(false);
  const [additional, setAdditional] = useState([]);
  const [nextCursor, setNextCursor] = useState(catalog.nextCursor);
  const [viewportMode, setViewportMode] = useState('desktop');
  const mutation = useShopMutation();

  const currentOption = {
    id: current.templateId,
    name: `${current.templateName} · đang dùng${current.isSelectable ? '' : ' (đã ẩn)'}`,
    isPremium: current.isPremium,
    currentRevision: {
      id: current.templateRevisionId,
      rendererKey: current.rendererKey,
      schemaVersion: current.schemaVersion,
      revision: current.revision,
      defaults: current.defaults,
      layout: current.layout,
    },
  };

  const choices = [
    ...new Map(
      [currentOption, ...catalog.items, ...additional].map((item) => [
        item.currentRevision.id,
        item,
      ]),
    ).values(),
  ];

  const selected =
    choices.find((item) => item.currentRevision.id === selectedId) || currentOption;

  const appearance = {
    ...current,
    templateId: selected.id,
    templateRevisionId: selectedId,
    rendererKey: selected.currentRevision.rendererKey,
    defaults: selected.currentRevision.defaults,
    layout: selected.currentRevision.layout,
    overrides: tokens,
  };

  const resolvedTheme = effectiveTheme(selected.currentRevision.defaults, tokens);
  const contrastValid = hasThemeContrast(resolvedTheme);
  const minContrastRatio = Math.min(
    colorContrast(resolvedTheme.textColor, resolvedTheme.backgroundColor),
    colorContrast(resolvedTheme.textColor, resolvedTheme.surfaceColor),
    colorContrast(resolvedTheme.buttonTextColor, resolvedTheme.primaryColor),
  );

  const updateDirty = (value) => {
    setDirty(value);
    onDirtyChange(value);
  };

  const select = (id) => {
    const apply = () => {
      const choice = choices.find((item) => item.currentRevision.id === id);
      setSelectedId(id);
      setTokens(choice.currentRevision.defaults);
      form.setFieldsValue(choice.currentRevision.defaults);
      updateDirty(true);
    };
    if (dirty) {
      modal.confirm({
        title: 'Đổi mẫu sẽ đặt lại màu và thông số đang chỉnh.',
        onOk: apply,
      });
    } else {
      apply();
    }
  };

  const reset = () => {
    setTokens(current.effectiveTokens);
    form.setFieldsValue(current.effectiveTokens);
    setSelectedId(current.templateRevisionId);
    updateDirty(false);
  };

  const save = async () => {
    const body = {
      expectedVersion: shop.version,
      templateId: selected.id,
      templateRevisionId: selectedId,
      overrides: tokens,
    };
    const result = await mutation.run('appearance', body, (key) =>
      shopService.appearance(body, key),
    );
    if (result.ok) {
      updateDirty(false);
      message.success('Đã lưu giao diện gian hàng.');
      onSaved();
    }
  };

  const rendererLabel =
    RENDERER_LABELS[selected.currentRevision.rendererKey] ||
    selected.currentRevision.rendererKey;

  return (
    <div className="space-y-5">
      {/* Studio Orientation Strip */}
      <section
        aria-label="Thông tin giao diện đang sử dụng"
        className="flex flex-col gap-3 rounded-2xl border border-[#e4dcd3] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#e4dcd3] bg-[#faf7f2]">
            {shop.logoUrl ? (
              <img
                src={shop.logoUrl}
                alt={shop.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <ShopOutlined className="text-lg text-[#7d1322]" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="truncate font-serif text-lg font-semibold text-[#231a18]">
                {shop.name}
              </span>
              <Tag className="m-0 rounded-full border-[#e7d6b4] bg-[#fdf8ed] px-2.5 py-0.5 text-[11px] font-medium text-[#8a5a0a]">
                Bố cục: {rendererLabel}
              </Tag>
              {dirty && (
                <Tag color="gold" className="m-0 rounded-full px-2.5 py-0.5 text-[11px]">
                  Chưa lưu
                </Tag>
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[#6c625e]">
              <GlobalOutlined />
              <span className="truncate">/shop/{shop.slug}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => onNavigate?.('nha-cung-cap/thiet-lap-gian-hang')}>
            Thiết lập thông tin
          </Button>
          {shop.status === 'Active' && (
            <Button
              icon={<EyeOutlined />}
              onClick={() => onNavigate?.(`shop/${shop.slug}`)}
            >
              Xem trang công khai
            </Button>
          )}
        </div>
      </section>

      {/* Split Atelier Workbench */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Left Zone: Control Inspector */}
        <aside className="rounded-2xl border border-[#e4dcd3] bg-white p-6 xl:col-span-4">
          <div className="border-b border-[#efe9e1] pb-4">
            <h2 className="m-0 font-serif text-xl font-semibold tracking-tight text-[#231a18]">
              Mẫu &amp; thông số giao diện
            </h2>
            <p className="mt-1 mb-0 text-xs leading-relaxed text-[#6c625e]">
              Chọn bố cục trưng bày và tinh chỉnh bảng màu thương hiệu trực tiếp trên khung xem trước.
            </p>
          </div>

          <div className="mt-5 space-y-5">
            {/* Template Selector */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-[#231a18]">
                Mẫu giao diện gian hàng
              </label>
              <Select
                aria-label="Chọn mẫu giao diện"
                className="w-full"
                size="large"
                value={selectedId}
                onChange={select}
                disabled={shop.status === 'Suspended'}
                options={choices.map((item) => ({
                  value: item.currentRevision.id,
                  label: `${item.name}${item.isPremium ? ' · Premium' : ''} · v${item.currentRevision.revision}`,
                }))}
              />
              {nextCursor && (
                <Button
                  className="mt-2.5"
                  size="small"
                  onClick={async () => {
                    try {
                      const next = await shopService.catalog(nextCursor);
                      setAdditional((items) => [...items, ...next.items]);
                      setNextCursor(next.nextCursor);
                    } catch (error) {
                      message.error(shopError(error));
                    }
                  }}
                >
                  Xem thêm mẫu
                </Button>
              )}
              <p className="mt-2 mb-0 text-xs text-[#6c625e]">
                Nhãn Premium là phân loại mẫu thiết kế, không phát sinh chi phí.
              </p>
            </div>

            <div className="border-t border-[#efe9e1]" />

            {/* Theme Tokens & Contrast Gauge */}
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-[#231a18]">
                  Bảng màu &amp; tỷ lệ hiển thị
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tabular-nums ${
                    contrastValid
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-amber-300 bg-amber-50 text-amber-800'
                  }`}
                >
                  {contrastValid ? <CheckCircleOutlined /> : <WarningOutlined />}
                  Tương phản {Number.isFinite(minContrastRatio) ? minContrastRatio.toFixed(1) : '0.0'}:1
                </span>
              </div>

              {/* Active Color Palette Swatch Strip */}
              <div
                aria-label="Xem trước tổ hợp màu hiện tại"
                className="mb-4 flex items-center justify-between rounded-xl border border-[#e4dcd3] bg-[#faf7f2] px-3.5 py-2.5"
              >
                <div className="flex items-center gap-1.5">
                  {[
                    { key: 'primaryColor', title: 'Màu chủ đạo' },
                    { key: 'backgroundColor', title: 'Nền trang' },
                    { key: 'surfaceColor', title: 'Nền thẻ' },
                    { key: 'textColor', title: 'Màu chữ' },
                    { key: 'buttonTextColor', title: 'Chữ nút' },
                  ].map((swatch) => (
                    <span
                      key={swatch.key}
                      title={`${swatch.title}: ${resolvedTheme[swatch.key]}`}
                      className="h-5 w-5 rounded-full border border-[#d6ccc2]"
                      style={{ backgroundColor: resolvedTheme[swatch.key] }}
                    />
                  ))}
                </div>
                <span className="text-[11px] tabular-nums text-[#6c625e]">
                  Bo góc {resolvedTheme.borderRadiusPx}px · {Math.round((resolvedTheme.fontScale || 1) * 100)}%
                </span>
              </div>

              <Form
                form={form}
                layout="vertical"
                initialValues={current.effectiveTokens}
                disabled={shop.status === 'Suspended' || mutation.busy}
                onValuesChange={(_, values) => {
                  setTokens(values);
                  updateDirty(true);
                }}
                onFinish={save}
              >
                <ThemeTokenForm />

                {!contrastValid && (
                  <Alert
                    type="warning"
                    showIcon
                    title="Điều chỉnh màu để đạt độ tương phản tối thiểu 4.5:1."
                    className="mb-4 rounded-xl"
                  />
                )}

                {mutation.error && (
                  <Alert
                    type="error"
                    showIcon
                    title={shopError(mutation.error)}
                    className="mb-4 rounded-xl"
                  />
                )}

                <div className="flex flex-wrap items-center gap-2.5 border-t border-[#efe9e1] pt-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    disabled={!dirty || shop.status === 'Suspended' || !contrastValid}
                    loading={mutation.busy}
                    style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
                    className="flex-1"
                  >
                    Lưu giao diện
                  </Button>
                  <Button
                    size="large"
                    icon={<UndoOutlined />}
                    disabled={mutation.busy || !dirty}
                    onClick={reset}
                  >
                    Bỏ thay đổi
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </aside>

        {/* Right Zone: Live Storefront Stage */}
        <section
          aria-labelledby="live-preview-heading"
          className="flex flex-col rounded-2xl border border-[#e4dcd3] bg-white p-5 sm:p-6 xl:col-span-8"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#efe9e1] pb-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h2
                  id="live-preview-heading"
                  className="m-0 font-serif text-xl font-semibold tracking-tight text-[#231a18]"
                >
                  Xem trước trực tiếp
                </h2>
                {dirty && (
                  <Tag color="gold" className="m-0 rounded-full px-2.5 py-0.5 text-[11px]">
                    Chưa lưu
                  </Tag>
                )}
              </div>
              <p className="mt-0.5 mb-0 text-xs text-[#6c625e]">
                Mô phỏng giao diện thực tế khi khách hàng doanh nghiệp truy cập gian hàng.
              </p>
            </div>

            {/* Viewport Switcher */}
            <div
              role="group"
              aria-label="Chế độ khung xem trước"
              className="inline-flex rounded-xl border border-[#e4dcd3] bg-[#faf7f2] p-1"
            >
              <button
                type="button"
                onClick={() => setViewportMode('desktop')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  viewportMode === 'desktop'
                    ? 'bg-white text-[#231a18] shadow-xs'
                    : 'text-[#6c625e] hover:text-[#231a18]'
                }`}
              >
                <DesktopOutlined />
                <span>Máy tính</span>
              </button>
              <button
                type="button"
                onClick={() => setViewportMode('mobile')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  viewportMode === 'mobile'
                    ? 'bg-white text-[#231a18] shadow-xs'
                    : 'text-[#6c625e] hover:text-[#231a18]'
                }`}
              >
                <MobileOutlined />
                <span>Di động</span>
              </button>
            </div>
          </div>

          {/* Framed Preview Canvas */}
          <div className="rounded-xl border border-[#e4dcd3] bg-[#f4efe9] p-2.5 sm:p-4">
            <div className="mb-2.5 flex items-center justify-between rounded-lg border border-[#e4dcd3] bg-white px-3 py-1.5 text-[11px] text-[#6c625e]">
              <span className="truncate font-medium text-[#231a18]">
                nguyetpho.vn/shop/{shop.slug}
              </span>
              <span>{viewportMode === 'mobile' ? '390px' : 'Toàn màn hình'}</span>
            </div>

            <div
              className={`shop-live-preview mx-auto transition-all duration-200 ${
                viewportMode === 'mobile' ? 'max-w-[390px]' : 'w-full'
              }`}
            >
              <ShopRenderer
                shop={{ ...shop, isVerified: true }}
                appearance={appearance}
                products={preview.products}
                preview
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function ShopAppearance({ onNavigate }) {
  const { user } = useAuth();
  const { modal } = App.useApp();
  const [dirty, setDirty] = useState(false);
  useDirtyExit(dirty);

  const loader = useCallback(
    async (signal) => {
      if (!user?.id) return null;
      const shop = await shopService.mine(signal);
      if (!shop) return null;
      const [preview, catalog] = await Promise.all([
        shopService.preview(signal),
        shopService.catalog(undefined, signal),
      ]);
      return { shop, preview, catalog };
    },
    [user?.id],
  );

  const resource = useShopResource(loader);
  const navigate = (key) => onNavigate?.(key);

  const reload = () =>
    dirty
      ? modal.confirm({
          title: 'Tải lại và bỏ bản nháp?',
          onOk: () => {
            setDirty(false);
            resource.reload();
          },
        })
      : resource.reload();

  return (
    <ColonyAdminLayout
      role="Supplier"
      activeKey="nha-cung-cap/giao-dien-gian-hang"
      title="Giao diện gian hàng"
      subtitle="Chọn mẫu bố cục, tinh chỉnh màu sắc đạt chuẩn tương phản và xem trước trực tiếp trước khi lưu."
      onNavigate={navigate}
      extra={
        <Button icon={<ReloadOutlined />} onClick={reload}>
          Tải phiên bản mới
        </Button>
      }
    >
      {resource.error && (
        <Alert
          type="error"
          showIcon
          title={shopError(resource.error)}
          className="mb-6 rounded-xl"
        />
      )}

      {resource.loading && !resource.data ? (
        <div className="rounded-2xl border border-[#e4dcd3] bg-white p-6">
          <Skeleton active paragraph={{ rows: 10 }} />
        </div>
      ) : resource.data ? (
        <div className="space-y-5">
          {resource.data.shop.status === 'Suspended' && (
            <Alert
              type="error"
              showIcon
              title="Gian hàng đang bị đình chỉ; giao diện chỉ đọc."
              description={resource.data.shop.suspensionReason}
              className="rounded-xl"
            />
          )}
          <AppearanceEditor
            key={`${user.id}:${resource.data.shop.version}`}
            data={resource.data}
            onSaved={resource.reload}
            onDirtyChange={setDirty}
            onNavigate={navigate}
          />
        </div>
      ) : (
        !resource.error && (
          <section className="rounded-2xl border border-[#e4dcd3] bg-white p-8 text-center">
            <ShopOutlined className="text-3xl text-[#7d1322]" />
            <h2 className="mt-3 mb-1 font-serif text-xl font-semibold text-[#231a18]">
              Bạn chưa có gian hàng
            </h2>
            <p className="mb-5 text-sm text-[#6c625e]">
              Hoàn tất thông tin gian hàng trước khi tùy chỉnh bố cục và bảng màu trưng bày.
            </p>
            <Button
              type="primary"
              style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
              onClick={() => navigate('nha-cung-cap/thiet-lap-gian-hang')}
            >
              Tạo gian hàng trước
            </Button>
          </section>
        )
      )}
    </ColonyAdminLayout>
  );
}
