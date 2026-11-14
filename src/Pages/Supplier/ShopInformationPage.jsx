import { useCallback, useState } from 'react';
import {
  Alert,
  App,
  Button,
  Form,
  Input,
  Select,
  Skeleton,
  Tag,
} from 'antd';
import {
  DashboardOutlined,
  EyeOutlined,
  GlobalOutlined,
  LayoutOutlined,
  ReloadOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import ShopMediaUpload from '../../components/shop/ShopMediaUpload';
import PackagingTemplateManager from '../../components/shop/PackagingTemplateManager';
import {
  useDirtyExit,
  useShopMutation,
  useShopResource,
} from '../../hooks/useShopResource';
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
    const selected = [...catalog.items, ...extraTemplates].find(
      (template) => template.id === values.templateId,
    );
    const body = {
      name: values.name,
      description: values.description || null,
      logoAssetId: values.logo?.id || null,
      bannerAssetId: values.banner?.id || null,
      publicContactEmail: values.publicContactEmail || null,
      publicContactPhone: values.publicContactPhone || null,
      publicAddress: values.publicAddress || null,
      ...(shop
        ? { expectedVersion: shop.version }
        : {
            slug: values.slug,
            templateId: selected?.id,
            templateRevisionId: selected?.currentRevision?.id,
          }),
    };
    const result = await mutation.run(shop ? 'update' : 'create', body, (key) =>
      shop ? shopService.update(body, key) : shopService.create(body, key),
    );
    if (result.ok) {
      onDirtyChange(false);
      message.success(
        shop ? 'Đã lưu thông tin gian hàng.' : 'Đã tạo gian hàng ở trạng thái ẩn.',
      );
      onSaved();
    } else if (result.error) {
      setShopFormErrors(form, result.error);
    }
  };

  const uploadBusy = (busy) => setUploading((value) => value + (busy ? 1 : -1));

  return (
    <Form
      form={form}
      layout="vertical"
      disabled={frozen || mutation.busy}
      initialValues={{
        name: shop?.name || '',
        description: shop?.description,
        slug: shop?.slug,
        publicContactEmail: shop?.publicContactEmail,
        publicContactPhone: shop?.publicContactPhone,
        publicAddress: shop?.publicAddress,
        logo: shop?.logoAssetId ? { id: shop.logoAssetId, url: shop.logoUrl } : null,
        banner: shop?.bannerAssetId ? { id: shop.bannerAssetId, url: shop.bannerUrl } : null,
        templateId: catalog.items[0]?.id,
      }}
      onValuesChange={() => onDirtyChange(true)}
      onFinish={submit}
    >
      {mutation.error && (
        <Alert
          type="error"
          showIcon
          title={shopError(mutation.error)}
          className="mb-5 rounded-xl"
        />
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Zone: Brand Identity & Public Contact Desk */}
        <div className="rounded-2xl border border-[#e4dcd3] bg-white p-6 sm:p-7 lg:col-span-7">
          <div className="border-b border-[#efe9e1] pb-4">
            <h2 className="m-0 font-serif text-xl font-semibold tracking-tight text-[#231a18]">
              {shop ? 'Hồ sơ gian hàng công khai' : 'Khởi tạo gian hàng đầu tiên'}
            </h2>
            <p className="mt-1 mb-0 text-sm text-[#6c625e]">
              Thiết lập tên thương hiệu, mô tả năng lực sản xuất và đầu mối liên hệ dành cho khách hàng B2B.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <Form.Item
              name="name"
              label="Tên gian hàng"
              rules={[{ required: true, whitespace: true, min: 2, max: 255 }]}
            >
              <Input maxLength={255} placeholder="Ví dụ: Xưởng Bánh Trung Thu Nguyệt Cát" />
            </Form.Item>

            <Form.Item
              name="slug"
              label="Đường dẫn gian hàng"
              extra="3–80 ký tự a–z, 0–9 và dấu gạch nối. Không đổi sau khi tạo."
              rules={
                shop
                  ? []
                  : [
                      {
                        required: true,
                        min: 3,
                        max: 80,
                        pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                      },
                    ]
              }
            >
              <Input disabled={!!shop} prefix="/shop/" maxLength={80} />
            </Form.Item>
          </div>

          {!shop && (
            <div className="mb-4 flex flex-wrap items-end gap-3">
              <Form.Item
                name="templateId"
                label="Mẫu giao diện ban đầu"
                rules={[{ required: true }]}
                className="mb-0 flex-1 min-w-[220px]"
              >
                <Select
                  options={[...catalog.items, ...extraTemplates].map((template) => ({
                    value: template.id,
                    label: template.name,
                  }))}
                />
              </Form.Item>
              {nextCursor && (
                <Button
                  onClick={async () => {
                    try {
                      const next = await shopService.catalog(nextCursor);
                      setExtraTemplates((items) => [...items, ...next.items]);
                      setNextCursor(next.nextCursor);
                    } catch (error) {
                      message.error(shopError(error));
                    }
                  }}
                >
                  Xem thêm mẫu
                </Button>
              )}
            </div>
          )}

          <Form.Item name="description" label="Giới thiệu xưởng & thế mạnh chế tác" rules={[{ max: 2000 }]}>
            <Input.TextArea
              rows={4}
              showCount
              maxLength={2000}
              placeholder="Giới thiệu lịch sử nghệ nhân, công suất sản xuất B2B, tiêu chuẩn vệ sinh an toàn thực phẩm..."
            />
          </Form.Item>

          <div className="my-6 border-t border-[#efe9e1]" />

          <div className="mb-4">
            <h3 className="m-0 font-serif text-lg font-semibold text-[#231a18]">
              Kênh liên hệ B2B công khai
            </h3>
            <p className="mt-1 mb-0 text-xs leading-relaxed text-[#6c625e]">
              Thông tin dưới đây sẽ hiển thị công khai trên trang gian hàng, tách biệt với hồ sơ pháp lý nội bộ.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <Form.Item
              name="publicContactEmail"
              label="Email công khai"
              rules={[{ type: 'email', max: 255 }]}
            >
              <Input maxLength={255} placeholder="b2b@thuonghieu.vn" />
            </Form.Item>

            <Form.Item
              name="publicContactPhone"
              label="Điện thoại công khai"
              rules={[
                {
                  pattern: /^\+[1-9][0-9]{7,14}$/,
                  message: 'Nhập số quốc tế, ví dụ +84901234567.',
                },
              ]}
            >
              <Input maxLength={20} placeholder="+84901234567" />
            </Form.Item>
          </div>

          <Form.Item name="publicAddress" label="Địa chỉ công khai" rules={[{ max: 500 }]}>
            <Input maxLength={500} placeholder="Số nhà, đường, quận/huyện, tỉnh/thành phố" />
          </Form.Item>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#efe9e1] pt-5">
            <span className="text-xs text-[#6c625e]">
              {uploading > 0 ? 'Đang tải tệp hình ảnh lên hệ thống...' : 'Kiểm tra kỹ thông tin liên hệ trước khi lưu.'}
            </span>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              disabled={frozen || uploading > 0}
              loading={mutation.busy}
              style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
            >
              {shop ? 'Lưu thông tin gian hàng' : 'Tạo gian hàng'}
            </Button>
          </div>
        </div>

        {/* Right Zone: Visual Identity Assets */}
        <aside className="flex flex-col justify-between rounded-2xl border border-[#e4dcd3] bg-[#fdfbf8] p-6 sm:p-7 lg:col-span-5">
          <div>
            <div className="border-b border-[#ebe3da] pb-4">
              <h2 className="m-0 font-serif text-xl font-semibold tracking-tight text-[#231a18]">
                Hình ảnh nhận diện
              </h2>
              <p className="mt-1 mb-0 text-sm text-[#6c625e]">
                {!shop
                  ? 'Logo và banner không bắt buộc khi khởi tạo. Bạn có thể tạo gian hàng trước rồi bổ sung ảnh sau.'
                  : 'Ảnh logo và banner xuất hiện ở phần đầu trang gian hàng của xưởng.'}
              </p>
            </div>

            <div className="mt-5 space-y-6">
              <Form.Item name="logo" label="Logo gian hàng" className="mb-0">
                <ShopMediaUpload purpose="Logo" onBusyChange={uploadBusy} disabled={frozen} />
              </Form.Item>

              <div className="border-t border-[#ebe3da]" />

              <Form.Item name="banner" label="Ảnh bìa (Banner)" className="mb-0">
                <ShopMediaUpload purpose="Banner" onBusyChange={uploadBusy} disabled={frozen} />
              </Form.Item>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[#e8dfd4] bg-white px-4 py-3 text-xs leading-relaxed text-[#6c625e]">
            Chỉ tải lên hình ảnh nhận diện thương hiệu công khai. Không tải giấy phép kinh doanh hoặc chứng từ pháp lý tại khu vực này.
          </div>
        </aside>
      </div>
    </Form>
  );
}

export default function ShopInformationPage({ onNavigate }) {
  const { user, refreshCurrentUser } = useAuth();
  const { modal, message } = App.useApp();
  const [dirty, setDirty] = useState(false);
  useDirtyExit(dirty);

  const loader = useCallback(
    async (signal) => {
      if (!user?.id) return null;
      const [shop, catalog] = await Promise.all([
        shopService.mine(signal),
        shopService.catalog(undefined, signal),
      ]);
      return { shop, catalog };
    },
    [user?.id],
  );

  const resource = useShopResource(loader);
  const mutation = useShopMutation();
  const shop = resource.data?.shop;
  const navigate = (key) => onNavigate?.(key);

  const reload = () =>
    dirty
      ? modal.confirm({
          title: 'Tải lại sẽ bỏ bản nháp hiện tại.',
          onOk: () => {
            setDirty(false);
            resource.reload();
          },
        })
      : resource.reload();

  const visibility = () =>
    modal.confirm({
      title: shop.status === 'Active' ? 'Tạm ẩn gian hàng?' : 'Hiển thị gian hàng công khai?',
      content: 'Thao tác này không hủy đơn hàng hoặc nghĩa vụ giao dịch đang có.',
      onOk: async () => {
        const body = {
          expectedVersion: shop.version,
          status: shop.status === 'Active' ? 'Inactive' : 'Active',
        };
        const result = await mutation.run('visibility', body, (key) =>
          shopService.visibility(body, key),
        );
        if (result.ok) {
          message.success('Đã cập nhật trạng thái hiển thị.');
          resource.reload();
        } else {
          if (result.error?.status === 403) {
            refreshCurrentUser().catch(() => {});
          }
          throw result.error;
        }
      },
    });

  return (
    <ColonyAdminLayout
      role="Supplier"
      activeKey="nha-cung-cap/thiet-lap-gian-hang"
      title="Thiết lập gian hàng"
      subtitle="Quản lý nhận diện thương hiệu, đầu mối liên hệ B2B và danh mục mẫu hộp quà doanh nghiệp."
      onNavigate={navigate}
      extra={
        <Button icon={<ReloadOutlined />} onClick={reload}>
          Tải lại
        </Button>
      }
    >
      {resource.error && (
        <Alert
          type="error"
          showIcon
          title={shopError(resource.error)}
          action={<Button onClick={reload}>Thử lại</Button>}
          className="mb-6 rounded-xl"
        />
      )}

      {!resource.data && resource.loading ? (
        <div className="rounded-2xl border border-[#e4dcd3] bg-white p-6">
          <Skeleton active paragraph={{ rows: 8 }} />
        </div>
      ) : (
        resource.data && (
          <div className="space-y-6">
            {/* Storefront Command Strip */}
            {shop ? (
              <section
                aria-label="Trạng thái và điều hướng nhanh gian hàng"
                className="flex flex-col gap-4 rounded-2xl border border-[#e4dcd3] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#e4dcd3] bg-[#faf7f2]">
                    {shop.logoUrl ? (
                      <img
                        src={shop.logoUrl}
                        alt={shop.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ShopOutlined className="text-xl text-[#7d1322]" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate font-serif text-lg font-semibold text-[#231a18]">
                        {shop.name}
                      </span>
                      <Tag
                        color={
                          shop.status === 'Active'
                            ? 'success'
                            : shop.status === 'Suspended'
                              ? 'error'
                              : 'default'
                        }
                        className="m-0 rounded-full px-2.5 py-0.5 text-[11px]"
                      >
                        {SHOP_STATUS[shop.status]}
                      </Tag>
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[#6c625e]">
                      <GlobalOutlined />
                      <span className="truncate">/shop/{shop.slug}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    icon={<LayoutOutlined />}
                    onClick={() => navigate('nha-cung-cap/giao-dien-gian-hang')}
                  >
                    Tùy chỉnh giao diện
                  </Button>
                  {shop.status === 'Active' && (
                    <Button
                      icon={<EyeOutlined />}
                      onClick={() => navigate(`shop/${shop.slug}`)}
                    >
                      Xem trang công khai
                    </Button>
                  )}
                  <Button
                    disabled={dirty || shop.status === 'Suspended'}
                    loading={mutation.busy}
                    onClick={visibility}
                  >
                    {shop.status === 'Active' ? 'Tạm ẩn' : 'Hiển thị gian hàng'}
                  </Button>
                  <Button
                    type="primary"
                    icon={<DashboardOutlined />}
                    style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
                    onClick={() => navigate('nha-cung-cap/dashboard')}
                  >
                    Dashboard & Đơn hàng mới
                  </Button>
                </div>
              </section>
            ) : (
              <Alert
                type="info"
                showIcon
                title="Bạn đã được duyệt Supplier. Tạo gian hàng để bắt đầu giới thiệu sản phẩm."
                className="rounded-xl"
              />
            )}

            {shop?.status === 'Suspended' && (
              <Alert
                type="error"
                showIcon
                title="Gian hàng bị đình chỉ"
                description={shop.suspensionReason}
                className="rounded-xl"
              />
            )}

            {mutation.error && (
              <Alert type="error" showIcon title={shopError(mutation.error)} className="rounded-xl" />
            )}

            <InformationForm
              key={`${user.id}:${shop?.shopId || 'new'}:${shop?.version || 0}`}
              shop={shop}
              catalog={resource.data.catalog}
              onSaved={resource.reload}
              onDirtyChange={setDirty}
            />

            {shop && <PackagingTemplateManager shopId={shop?.shopId || shop?.id} />}
          </div>
        )
      )}
    </ColonyAdminLayout>
  );
}
