import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Empty,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Upload,
  message,
} from 'antd';
import {
  ClearOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  PictureOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import productService from '../../services/productService';

const PAGE_SIZE = 10;

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'Tất cả trạng thái' },
  { value: 'Active', label: 'Đang bán' },
  { value: 'Inactive', label: 'Bản nháp / Đang ẩn' },
  { value: 'OutOfStock', label: 'Hết hàng' },
];

const SORT_OPTIONS = [
  { value: 'updatedAtDesc', label: 'Cập nhật gần nhất' },
  { value: 'createdAtDesc', label: 'Tạo gần nhất' },
  { value: 'nameAsc', label: 'Tên sản phẩm A–Z' },
  { value: 'stockAsc', label: 'Tồn kho thấp trước' },
];

const UNIT_OPTIONS = [
  { value: 'piece', label: 'Cái (piece)' },
  { value: 'box', label: 'Hộp (box)' },
  { value: 'set', label: 'Set quà (set)' },
  { value: 'tray', label: 'Khay (tray)' },
];

const key = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
const money = (value) => Number(value || 0).toLocaleString('vi-VN');

function statusTag(status) {
  if (status === 'Active') {
    return (
      <Tag color="success" className="m-0 rounded-full px-2.5 py-0.5 text-[11px]">
        Đang bán
      </Tag>
    );
  }
  if (status === 'OutOfStock') {
    return (
      <Tag color="warning" className="m-0 rounded-full px-2.5 py-0.5 text-[11px]">
        Hết hàng
      </Tag>
    );
  }
  return (
    <Tag color="default" className="m-0 rounded-full px-2.5 py-0.5 text-[11px]">
      Bản nháp
    </Tag>
  );
}

export default function ProductManage({ onNavigate }) {
  const [form] = Form.useForm();
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [reloadToken, setReloadToken] = useState(0);

  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('updatedAtDesc');

  const categoryMap = useMemo(
    () => new Map(categories.map((cat) => [cat.id, cat.name])),
    [categories],
  );

  const hasActiveFilters = useMemo(
    () =>
      Boolean(searchQuery.trim())
      || categoryFilter !== 'ALL'
      || statusFilter !== 'ALL'
      || sortBy !== 'updatedAtDesc',
    [searchQuery, categoryFilter, statusFilter, sortBy],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const normalized = searchInput.trim();
      setSearchQuery((prev) => {
        if (prev !== normalized) {
          setPage(1);
          return normalized;
        }
        return prev;
      });
    }, 320);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const controller = new AbortController();
    productService
      .categories(controller.signal)
      .then((categoryRows) => {
        if (!controller.signal.aborted) {
          setCategories(categoryRows || []);
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const loadProducts = useCallback(
    async (signal) => {
      setLoading(true);
      try {
        const params = {
          page,
          pageSize: PAGE_SIZE,
          sort: sortBy,
        };
        if (searchQuery) params.q = searchQuery;
        if (categoryFilter !== 'ALL') params.categoryId = categoryFilter;
        if (statusFilter !== 'ALL') params.status = statusFilter;

        const catalog = await productService.mine(params, signal);
        if (signal?.aborted) return;
        setItems(catalog?.items || []);
        setTotalCount(catalog?.totalCount ?? (catalog?.items?.length || 0));
      } catch (error) {
        if (error?.name === 'CanceledError' || error?.code === 'ERR_CANCELED') return;
        message.error(error?.message || 'Không thể tải danh sách sản phẩm.');
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [page, searchQuery, categoryFilter, statusFilter, sortBy],
  );

  useEffect(() => {
    const controller = new AbortController();
    Promise.resolve().then(() => {
      if (!controller.signal.aborted) {
        loadProducts(controller.signal);
      }
    });
    return () => controller.abort();
  }, [loadProducts, reloadToken]);

  const triggerReload = () => setReloadToken((prev) => prev + 1);

  const handleResetFilters = () => {
    setSearchInput('');
    setSearchQuery('');
    setCategoryFilter('ALL');
    setStatusFilter('ALL');
    setSortBy('updatedAtDesc');
    setPage(1);
  };

  const handleSearchEnter = () => {
    const normalized = searchInput.trim();
    if (normalized !== searchQuery) {
      setSearchQuery(normalized);
      setPage(1);
    } else {
      triggerReload();
    }
  };

  const openCreate = () => {
    setEditing(null);
    setUploads([]);
    form.resetFields();
    form.setFieldsValue({
      unit: 'box',
      minOrderQty: 1,
      supportsCustomPackaging: false,
      variants: [
        { name: '', sku: '', priceAdjustment: 0, initialStockQty: 0, isGiftSet: false },
      ],
    });
    setOpen(true);
  };

  const openEdit = async (row) => {
    setSaving(true);
    try {
      const product = await productService.mineDetail(row.productId);
      setEditing(product);
      setUploads(
        (product.images || []).map((image) => ({
          uid: image.mediaAssetId,
          name: `Ảnh ${image.sortOrder + 1}`,
          status: 'done',
          url: image.imageUrl,
          mediaAssetId: image.mediaAssetId,
          isPrimary: image.isPrimary,
        })),
      );
      form.setFieldsValue({ ...product, variants: product.variants || [] });
      setOpen(true);
    } catch (error) {
      message.error(error?.message || 'Không thể tải chi tiết sản phẩm.');
    } finally {
      setSaving(false);
    }
  };

  const upload = async ({ file, onSuccess, onError }) => {
    try {
      const media = await productService.uploadMedia(file, 'ProductGallery', key());
      setUploads((current) => [
        ...current,
        {
          uid: media.mediaAssetId || media.id,
          name: file.name,
          status: 'done',
          url: media.publicUrl,
          mediaAssetId: media.mediaAssetId || media.id,
        },
      ]);
      onSuccess?.(media);
    } catch (error) {
      onError?.(error);
      message.error(error?.message || 'Không thể tải ảnh lên.');
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
        await productService.create(
          {
            ...values,
            maxOrderQty: values.maxOrderQty || null,
            variants: values.variants.map((variant) => ({
              ...variant,
              imageAssetId: null,
            })),
            images: mediaIds.map((mediaAssetId, index) => ({
              mediaAssetId,
              sortOrder: index,
              isPrimary: index === 0,
            })),
          },
          key(),
        );
        if (hasActiveFilters) {
          handleResetFilters();
        } else {
          setPage(1);
        }
      } else {
        const core = {
          name: values.name,
          description: values.description || null,
          ingredients: values.ingredients || null,
          categoryId: values.categoryId,
          basePrice: values.basePrice,
          minOrderQty: values.minOrderQty,
          maxOrderQty: values.maxOrderQty || null,
          unit: values.unit,
          supportsCustomPackaging: values.supportsCustomPackaging,
          expectedVersion: editing.version,
        };
        const updated = await productService.update(editing.productId, core, key());
        if (mediaIds.length > 0) {
          await productService.gallery(
            editing.productId,
            {
              expectedVersion: updated.version,
              images: mediaIds.map((mediaAssetId, index) => ({
                mediaAssetId,
                sortOrder: index,
                isPrimary: index === 0,
              })),
            },
            key(),
          );
        }
      }
      message.success(
        editing ? 'Đã cập nhật sản phẩm.' : 'Đã tạo sản phẩm ở trạng thái bản nháp.',
      );
      setOpen(false);
      triggerReload();
    } catch (error) {
      message.error(error?.message || 'Không thể lưu sản phẩm.');
    } finally {
      setSaving(false);
    }
  };

  const publish = async (row, isPublished) => {
    try {
      await productService.publication(
        row.productId,
        { expectedVersion: row.version, isPublished },
        key(),
      );
      message.success(
        isPublished ? 'Sản phẩm đã được xuất bản.' : 'Sản phẩm đã được ẩn khỏi catalog.',
      );
      triggerReload();
    } catch (error) {
      message.error(error?.message || 'Không thể đổi trạng thái sản phẩm.');
    }
  };

  const remove = async (row) => {
    try {
      await productService.remove(row.productId, row.version, key());
      message.success('Đã xoá sản phẩm.');
      if (items.length === 1 && page > 1) {
        setPage((prev) => Math.max(1, prev - 1));
      } else {
        triggerReload();
      }
    } catch (error) {
      message.error(error?.message || 'Không thể xoá sản phẩm.');
    }
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (name, row) => {
        const categoryName = categoryMap.get(row.categoryId);
        return (
          <div className="flex items-start gap-3.5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#e4dcd3] bg-[#faf7f2]">
              {row.primaryImageUrl ? (
                <Image
                  alt={name}
                  src={row.primaryImageUrl}
                  width={56}
                  height={56}
                  fallback="/hero_mooncake_bg.jpg"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <PictureOutlined className="text-lg text-[#b3a69e]" />
              )}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-[#231a18] text-sm leading-snug">
                {name}
              </div>
              {categoryName && (
                <div className="mt-0.5 text-xs text-[#9a6b16]">{categoryName}</div>
              )}
              <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] tabular-nums text-[#6c625e]">
                <span>{row.variantCount} biến thể</span>
                <span className="rounded border border-[#e4dcd3] bg-[#faf7f2] px-1.5 py-0.5 text-[#231a18]">
                  Tồn {row.totalStockQty}
                </span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Giá B2B',
      key: 'price',
      render: (_, row) => (
        <span className="font-semibold tabular-nums text-sm text-[#7d1322]">
          {row.minPrice === row.maxPrice
            ? `${money(row.minPrice)} đ`
            : `${money(row.minPrice)} – ${money(row.maxPrice)} đ`}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'effectiveStatus',
      key: 'effectiveStatus',
      render: statusTag,
    },
    {
      title: 'Cập nhật',
      dataIndex: 'updatedAtUtc',
      key: 'updatedAtUtc',
      render: (value) => (
        <span className="tabular-nums text-xs text-[#6c625e]">
          {value ? new Date(value).toLocaleDateString('vi-VN') : 'Chưa rõ'}
        </span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      align: 'right',
      width: 220,
      render: (_, row) => (
        <Space size="small">
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(row)}>
            Sửa
          </Button>
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => publish(row, row.effectiveStatus === 'Inactive')}
          >
            {row.effectiveStatus === 'Inactive' ? 'Đăng bán' : 'Ẩn'}
          </Button>
          <Popconfirm title="Xoá sản phẩm này?" onConfirm={() => remove(row)}>
            <Button
              danger
              size="small"
              icon={<DeleteOutlined />}
              aria-label={`Xoá ${row.name}`}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const rangeStart = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(totalCount, page * PAGE_SIZE);

  return (
    <ColonyAdminLayout
      role="Supplier"
      activeKey="nha-cung-cap/quan-ly-san-pham"
      onNavigate={onNavigate}
      title="Sản phẩm và biến thể"
      subtitle="Quản lý catalog B2B, SKU, tồn kho và trạng thái xuất bản của gian hàng."
      extra={
        <Space>
          <Button icon={<ReloadOutlined />} onClick={triggerReload} loading={loading}>
            Tải lại
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreate}
            style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
          >
            Thêm sản phẩm
          </Button>
        </Space>
      }
    >
      <div className="space-y-5">
        {/* Atelier Guidance Strip */}
        <div className="flex items-center gap-2.5 rounded-xl border border-[#e7dccf] bg-[#fdfbf8] px-4 py-3 text-xs text-[#6c625e]">
          <InfoCircleOutlined className="shrink-0 text-sm text-[#9a6b16]" />
          <span>
            Mỗi sản phẩm cần tối thiểu một biến thể và một ảnh trước khi xuất bản.
          </span>
        </div>

        {/* Main Catalog Ledger */}
        <section
          aria-label="Danh sách sản phẩm và bộ lọc"
          className="rounded-2xl border border-[#e4dcd3] bg-white p-5 sm:p-6"
        >
          {/* Search & Filter Toolbar */}
          <div className="rounded-xl border border-[#ebe3da] bg-[#faf7f2] p-3.5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
              <div className="md:col-span-3">
                <Input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onPressEnter={handleSearchEnter}
                  prefix={<SearchOutlined className="text-[#8a7f7a]" />}
                  placeholder="Tìm theo tên sản phẩm hoặc mã SKU..."
                  allowClear
                  aria-label="Tìm kiếm sản phẩm"
                />
              </div>

              <div className="md:col-span-3">
                <Select
                  value={categoryFilter}
                  onChange={(value) => {
                    setCategoryFilter(value);
                    setPage(1);
                  }}
                  options={[
                    { value: 'ALL', label: 'Tất cả danh mục' },
                    ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
                  ]}
                  className="w-full"
                  aria-label="Lọc theo danh mục"
                />
              </div>

              <div className="md:col-span-2">
                <Select
                  value={statusFilter}
                  onChange={(value) => {
                    setStatusFilter(value);
                    setPage(1);
                  }}
                  options={STATUS_OPTIONS}
                  className="w-full"
                  aria-label="Lọc theo trạng thái"
                />
              </div>

              <div className="flex min-w-0 items-center gap-2 md:col-span-4">
                <Select
                  value={sortBy}
                  onChange={(value) => {
                    setSortBy(value);
                    setPage(1);
                  }}
                  options={SORT_OPTIONS}
                  className="min-w-0 flex-1"
                  aria-label="Sắp xếp sản phẩm"
                />
                {hasActiveFilters && (
                  <Button
                    icon={<ClearOutlined />}
                    onClick={handleResetFilters}
                    className="shrink-0"
                    aria-label="Xóa bộ lọc"
                  >
                    Xóa lọc
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#ebe3da] pt-2.5 text-xs text-[#6c625e]">
              <span className="tabular-nums">
                {totalCount > 0
                  ? `Hiển thị ${rangeStart}–${rangeEnd} trên tổng số ${totalCount} sản phẩm`
                  : 'Không có sản phẩm phù hợp'}
              </span>
              <span className="font-medium text-[#231a18]">
                Cố định {PAGE_SIZE} sản phẩm / trang
              </span>
            </div>
          </div>

          {/* Product Ledger Table */}
          <div className="mt-4 overflow-x-auto">
            <Table
              rowKey="productId"
              loading={loading}
              columns={columns}
              dataSource={items}
              size="middle"
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      hasActiveFilters
                        ? 'Không tìm thấy sản phẩm khớp với từ khóa hoặc bộ lọc.'
                        : 'Chưa có sản phẩm. Hãy tạo sản phẩm đầu tiên.'
                    }
                  >
                    {hasActiveFilters ? (
                      <Button icon={<ClearOutlined />} onClick={handleResetFilters}>
                        Xóa bộ lọc
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={openCreate}
                        style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
                      >
                        Thêm sản phẩm
                      </Button>
                    )}
                  </Empty>
                ),
              }}
              pagination={{
                current: page,
                pageSize: PAGE_SIZE,
                total: totalCount,
                showSizeChanger: false,
                hideOnSinglePage: false,
                showTotal: (total, range) =>
                  total > 0 ? `${range[0]}–${range[1]} / ${total} sản phẩm` : '0 sản phẩm',
                onChange: (nextPage) => setPage(nextPage),
              }}
            />
          </div>
        </section>
      </div>

      {/* Create / Edit Modal */}
      <Modal
        title={
          <span className="font-serif text-xl font-semibold text-[#231a18]">
            {editing ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm mới'}
          </span>
        }
        open={open}
        width={920}
        destroyOnHidden
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        confirmLoading={saving}
        okText={editing ? 'Lưu thay đổi' : 'Tạo bản nháp'}
        cancelText="Hủy"
        okButtonProps={{ style: { backgroundColor: '#7d1322', borderColor: '#7d1322' } }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={save}
          initialValues={{ unit: 'box' }}
          className="pt-3"
        >
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-12">
            <div className="sm:col-span-8">
              <Form.Item
                name="name"
                label="Tên sản phẩm"
                rules={[{ required: true, min: 2, max: 255 }]}
              >
                <Input placeholder="Ví dụ: Hộp Quà Trung Thu Nguyệt Cát 4 Bánh" />
              </Form.Item>
            </div>
            <div className="sm:col-span-4">
              <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true }]}>
                <Select
                  placeholder="Chọn danh mục"
                  options={categories.map((x) => ({ value: x.id, label: x.name }))}
                />
              </Form.Item>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <Form.Item name="description" label="Mô tả sản phẩm">
              <Input.TextArea rows={3} maxLength={10000} />
            </Form.Item>
            <Form.Item
              name="ingredients"
              label="Thành phần nguyên liệu"
              extra="Nhập theo từng dòng hoặc phân tách bằng dấu phẩy."
            >
              <Input.TextArea rows={3} maxLength={10000} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-x-3 sm:grid-cols-5">
            <Form.Item name="basePrice" label="Giá cơ bản" rules={[{ required: true }]}>
              <InputNumber min={0} precision={0} className="w-full" addonAfter="₫" />
            </Form.Item>
            <Form.Item name="unit" label="Đơn vị" rules={[{ required: true }]}>
              <Select options={UNIT_OPTIONS} />
            </Form.Item>
            <Form.Item name="minOrderQty" label="Đặt tối thiểu" rules={[{ required: true }]}>
              <InputNumber min={1} className="w-full" />
            </Form.Item>
            <Form.Item name="maxOrderQty" label="Đặt tối đa">
              <InputNumber min={1} className="w-full" />
            </Form.Item>
            <Form.Item
              name="supportsCustomPackaging"
              label="Bao bì riêng"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>

          <div className="my-4 border-t border-[#efe9e1]" />

          <Form.Item
            label="Ảnh sản phẩm"
            required={!editing}
            extra="Tối đa 10 ảnh; ảnh đầu tiên là ảnh chính hiển thị ngoài catalog."
          >
            <Upload
              listType="picture-card"
              customRequest={upload}
              fileList={uploads}
              maxCount={10}
              onRemove={(file) =>
                setUploads((current) => current.filter((item) => item.uid !== file.uid))
              }
            >
              {uploads.length < 10 && (
                <div>
                  <UploadOutlined />
                  <div className="mt-1 text-xs">Tải ảnh</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          {!editing && (
            <div className="rounded-xl border border-[#e4dcd3] bg-[#faf7f2] p-4">
              <div className="mb-2 flex items-center justify-between">
                <strong className="text-sm text-[#231a18]">Biến thể ban đầu</strong>
                <span className="text-xs text-[#6c625e]">
                  Khai báo SKU và tồn kho khởi tạo
                </span>
              </div>
              <Form.List name="variants">
                {(fields, { add, remove: removeVariant }) => (
                  <div className="space-y-3">
                    {fields.map((field) => (
                      <div
                        key={field.key}
                        className="rounded-xl border border-[#e4dcd3] bg-white p-3.5"
                      >
                        <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-12">
                          <div className="sm:col-span-4">
                            <Form.Item
                              {...field}
                              name={[field.name, 'name']}
                              label="Tên biến thể"
                              rules={[{ required: true }]}
                            >
                              <Input placeholder="Thập cẩm 200g" />
                            </Form.Item>
                          </div>
                          <div className="sm:col-span-2">
                            <Form.Item
                              {...field}
                              name={[field.name, 'sku']}
                              label="SKU"
                              rules={[{ required: true, pattern: /^[A-Za-z0-9._-]+$/ }]}
                            >
                              <Input placeholder="SKU-01" />
                            </Form.Item>
                          </div>
                          <div className="sm:col-span-2">
                            <Form.Item
                              {...field}
                              name={[field.name, 'priceAdjustment']}
                              label="Chênh lệch giá"
                              rules={[{ required: true }]}
                            >
                              <InputNumber className="w-full" />
                            </Form.Item>
                          </div>
                          <div className="sm:col-span-2">
                            <Form.Item
                              {...field}
                              name={[field.name, 'initialStockQty']}
                              label="Tồn kho"
                              rules={[{ required: true }]}
                            >
                              <InputNumber min={0} className="w-full" />
                            </Form.Item>
                          </div>
                          <div className="sm:col-span-2">
                            <Form.Item
                              {...field}
                              name={[field.name, 'weightGram']}
                              label="Khối lượng (g)"
                            >
                              <InputNumber min={1} className="w-full" placeholder="200" />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="flex items-center justify-between border-t border-[#f0eae2] pt-2">
                          <Form.Item
                            {...field}
                            name={[field.name, 'isGiftSet']}
                            label="Hộp quà"
                            valuePropName="checked"
                            layout="horizontal"
                            className="mb-0"
                          >
                            <Switch />
                          </Form.Item>
                          {fields.length > 1 && (
                            <Button
                              type="text"
                              danger
                              size="small"
                              onClick={() => removeVariant(field.name)}
                            >
                              Bỏ biến thể
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={() =>
                        add({ priceAdjustment: 0, initialStockQty: 0, isGiftSet: false })
                      }
                    >
                      Thêm biến thể
                    </Button>
                  </div>
                )}
              </Form.List>
            </div>
          )}
        </Form>
      </Modal>
    </ColonyAdminLayout>
  );
}
