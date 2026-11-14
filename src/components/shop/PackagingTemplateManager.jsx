import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
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
  CrownOutlined,
  DeleteOutlined,
  EditOutlined,
  LinkOutlined,
  PictureOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import packagingTemplateService from '../../services/packagingTemplateService';

const { TextArea } = Input;

const PAGE_SIZE = 5;

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'Tất cả trạng thái' },
  { value: 'ACTIVE', label: 'Đang nhận gia công' },
  { value: 'INACTIVE', label: 'Tạm ngưng' },
];

const CAPACITY_OPTIONS = [
  { value: 'ALL', label: 'Tất cả sức chứa' },
  { value: 2, label: 'Hộp 2 bánh' },
  { value: 4, label: 'Hộp 4 bánh' },
  { value: 6, label: 'Hộp 6 bánh' },
  { value: 8, label: 'Hộp 8 bánh' },
  { value: 12, label: 'Hộp 12 bánh' },
];

const MATERIAL_OPTIONS = [
  { value: 'ALL', label: 'Tất cả chất liệu' },
  { value: 'Gỗ', label: 'Gỗ & Sơn mài' },
  { value: 'Da', label: 'Da cao cấp' },
  { value: 'Gấm', label: 'Vải gấm lụa' },
  { value: 'Giấy', label: 'Giấy mỹ thuật' },
];

const money = (val) => `${Number(val || 0).toLocaleString('vi-VN')} ₫`;

const formatDateTime = (value) => {
  if (!value) return 'Chưa rõ';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Chưa rõ';
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function PackagingTemplateManager({ shopId }) {
  const [templates, setTemplates] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [capacityFilter, setCapacityFilter] = useState('ALL');
  const [materialFilter, setMaterialFilter] = useState('ALL');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [reloadToken, setReloadToken] = useState(0);

  const [form] = Form.useForm();
  const previewImageUrl = Form.useWatch('sampleImageUrl', form);

  const hasActiveFilters = useMemo(
    () =>
      Boolean(searchQuery.trim())
      || statusFilter !== 'ALL'
      || capacityFilter !== 'ALL'
      || materialFilter !== 'ALL',
    [searchQuery, statusFilter, capacityFilter, materialFilter],
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

  const fetchTemplates = useCallback(
    async (signal) => {
      setLoading(true);
      try {
        const params = {
          page,
          pageSize: PAGE_SIZE,
          sort: 'createdAtDesc',
        };
        if (searchQuery) params.q = searchQuery;
        if (statusFilter === 'ACTIVE') params.isActive = true;
        if (statusFilter === 'INACTIVE') params.isActive = false;
        if (capacityFilter !== 'ALL') params.capacity = capacityFilter;
        if (materialFilter !== 'ALL') params.material = materialFilter;

        const result = await packagingTemplateService.getMinePage(params, signal);
        if (signal?.aborted) return;
        setTemplates(result.items || []);
        setTotalCount(result.totalCount ?? 0);
      } catch (error) {
        if (error?.name === 'CanceledError' || error?.code === 'ERR_CANCELED') return;
        message.error('Không thể tải danh sách mẫu hộp.');
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [page, searchQuery, statusFilter, capacityFilter, materialFilter],
  );

  useEffect(() => {
    const controller = new AbortController();
    Promise.resolve().then(() => {
      if (!controller.signal.aborted) {
        fetchTemplates(controller.signal);
      }
    });
    return () => controller.abort();
  }, [fetchTemplates, shopId, reloadToken]);

  const triggerReload = () => setReloadToken((prev) => prev + 1);

  const handleResetFilters = () => {
    setSearchInput('');
    setSearchQuery('');
    setStatusFilter('ALL');
    setCapacityFilter('ALL');
    setMaterialFilter('ALL');
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

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    setUploadError('');
    setUploadingImage(false);
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

  const handleSampleImageUpload = async ({ file, onSuccess, onError }) => {
    setUploadingImage(true);
    setUploadError('');
    try {
      const result = await packagingTemplateService.uploadImage(file);
      const uploadedUrl = result?.url || '';
      if (!uploadedUrl) {
        throw new Error('Không nhận được đường dẫn ảnh sau khi tải lên.');
      }
      form.setFieldValue('sampleImageUrl', uploadedUrl);
      message.success('Đã tải ảnh mẫu hộp lên thành công.');
      onSuccess?.(result);
    } catch (error) {
      const errMsg = error?.response?.data?.message || error?.message || 'Không thể tải ảnh lên.';
      setUploadError(errMsg);
      onError?.(error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (values) => {
    setSubmitting(true);
    try {
      if (editingItem) {
        await packagingTemplateService.update(editingItem.id, values);
        message.success('Đã lưu thay đổi mẫu hộp quà.');
      } else {
        await packagingTemplateService.create(values);
        message.success('Đã thêm mẫu hộp quà mới.');
        if (hasActiveFilters) {
          handleResetFilters();
        } else {
          setPage(1);
        }
      }
      setModalOpen(false);
      triggerReload();
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
      if (templates.length === 1 && page > 1) {
        setPage((prev) => Math.max(1, prev - 1));
      } else {
        triggerReload();
      }
    } catch (err) {
      message.error(err?.response?.data?.message || 'Không thể xóa mẫu hộp.');
    }
  };

  const columns = [
    {
      title: 'Mẫu hộp & Ngày tạo',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div className="flex items-start gap-3.5">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-[#e4dcd3] bg-[#faf7f2]">
            <Image
              src={record.sampleImageUrl || '/hero_mooncake_bg.jpg'}
              alt={name}
              width={56}
              height={56}
              fallback="/hero_mooncake_bg.jpg"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-[#231a18] text-sm leading-snug">
              {name}
            </div>
            <div className="mt-0.5 text-xs text-[#6c625e]">
              {record.dimensions || 'Kích thước tiêu chuẩn'}
            </div>
            <div className="mt-1 text-[11px] tabular-nums text-[#8a7f7a]">
              Tạo lúc: {formatDateTime(record.createdAtUtc || record.createdAt)}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Chất liệu & Kỹ thuật',
      key: 'specs',
      render: (_, record) => (
        <div className="space-y-1 text-xs">
          <div className="font-medium text-[#231a18]">
            {record.material || 'Gỗ / Giấy mỹ thuật'}
          </div>
          <div className="text-[#9a6b16]">
            {record.technique || 'Ép kim vàng 24K'}
          </div>
        </div>
      ),
    },
    {
      title: 'Quy cách & MOQ',
      key: 'capacity',
      render: (_, record) => (
        <div className="space-y-1 text-xs tabular-nums">
          <div className="font-medium text-[#231a18]">{record.capacity} bánh</div>
          <div className="inline-flex rounded border border-[#e7d6b4] bg-[#fdf8ed] px-2 py-0.5 text-[11px] font-medium text-[#8a5a0a]">
            Tối thiểu {record.minOrderQty} hộp
          </div>
        </div>
      ),
    },
    {
      title: 'Phụ phí phôi',
      dataIndex: 'basePrice',
      key: 'basePrice',
      render: (val) => (
        <span className="font-semibold tabular-nums text-sm text-[#7d1322]">
          {money(val)}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (val) => (
        <Tag
          color={val ? 'success' : 'default'}
          className="m-0 rounded-full px-2.5 py-0.5 text-[11px]"
        >
          {val ? 'Đang nhận gia công' : 'Tạm ngưng'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            size="small"
            icon={<EditOutlined />}
            aria-label={`Chỉnh sửa ${record.name}`}
            onClick={() => handleOpenModal(record)}
          />
          <Popconfirm
            title="Xóa mẫu hộp quà này?"
            description="Thao tác này sẽ ẩn mẫu hộp khỏi lựa chọn đặt hàng mới."
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa mẫu"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button
              size="small"
              danger
              icon={<DeleteOutlined />}
              aria-label={`Xóa ${record.name}`}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const rangeStart = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(totalCount, page * PAGE_SIZE);

  return (
    <section
      aria-labelledby="packaging-templates-heading"
      className="rounded-2xl border border-[#e4dcd3] bg-white p-6 sm:p-7"
    >
      {/* Header Row */}
      <div className="flex flex-col gap-4 border-b border-[#efe9e1] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <CrownOutlined className="text-lg text-[#9a6b16]" />
            <h2
              id="packaging-templates-heading"
              className="m-0 font-serif text-xl font-semibold tracking-tight text-[#231a18] sm:text-2xl"
            >
              Mẫu Hộp Quà Doanh Nghiệp (Custom Packaging Templates)
            </h2>
          </div>
          <p className="mt-1.5 mb-0 max-w-2xl text-sm text-[#6c625e]">
            Khách hàng B2B chọn trực tiếp từ danh mục phôi hộp này khi cấu hình bao bì in logo riêng cho đơn hàng.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            icon={<ReloadOutlined />}
            onClick={triggerReload}
            loading={loading}
          >
            Tải lại
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleOpenModal()}
            style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
          >
            Thêm mẫu hộp mới
          </Button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="mt-5 rounded-xl border border-[#ebe3da] bg-[#faf7f2] p-3.5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-5">
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onPressEnter={handleSearchEnter}
              prefix={<SearchOutlined className="text-[#8a7f7a]" />}
              placeholder="Tìm tên mẫu hộp, chất liệu, kỹ thuật, kích thước..."
              allowClear
              aria-label="Tìm kiếm mẫu hộp quà"
            />
          </div>

          <div className="md:col-span-2">
            <Select
              value={statusFilter}
              onChange={(val) => {
                setStatusFilter(val);
                setPage(1);
              }}
              options={STATUS_OPTIONS}
              className="w-full"
              aria-label="Lọc theo trạng thái"
            />
          </div>

          <div className="md:col-span-2">
            <Select
              value={capacityFilter}
              onChange={(val) => {
                setCapacityFilter(val);
                setPage(1);
              }}
              options={CAPACITY_OPTIONS}
              className="w-full"
              aria-label="Lọc theo sức chứa bánh"
            />
          </div>

          <div className="md:col-span-3 flex items-center gap-2">
            <Select
              value={materialFilter}
              onChange={(val) => {
                setMaterialFilter(val);
                setPage(1);
              }}
              options={MATERIAL_OPTIONS}
              className="w-full"
              aria-label="Lọc theo chất liệu"
            />
            {hasActiveFilters && (
              <Button
                icon={<ClearOutlined />}
                onClick={handleResetFilters}
                title="Xóa bộ lọc"
                aria-label="Xóa tất cả bộ lọc"
              >
                Xóa lọc
              </Button>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#ebe3da] pt-2.5 text-xs text-[#6c625e]">
          <span className="tabular-nums">
            {totalCount > 0
              ? `Hiển thị ${rangeStart}–${rangeEnd} trên tổng số ${totalCount} mẫu hộp (tối đa ${PAGE_SIZE} mẫu/trang)`
              : 'Chưa có mẫu hộp nào khớp với điều kiện hiện tại'}
          </span>
          <span className="font-medium text-[#231a18]">
            Thứ tự: Ngày tạo gần nhất
          </span>
        </div>
      </div>

      {/* Specification Ledger Table */}
      <div className="mt-4 overflow-x-auto">
        <Table
          dataSource={templates}
          columns={columns}
          rowKey="id"
          loading={loading}
          size="middle"
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  hasActiveFilters
                    ? 'Không tìm thấy mẫu hộp phù hợp với từ khóa hoặc bộ lọc.'
                    : 'Xưởng chưa có mẫu hộp quà doanh nghiệp nào.'
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
                    onClick={() => handleOpenModal()}
                    style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
                  >
                    Thêm mẫu hộp đầu tiên
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
              total > 0 ? `${range[0]}–${range[1]} / ${total} mẫu` : '0 mẫu',
            onChange: (nextPage) => setPage(nextPage),
          }}
        />
      </div>

      {/* Add / Edit Modal */}
      <Modal
        title={
          <div className="border-b border-[#efe9e1] pb-3">
            <h3 className="m-0 font-serif text-xl font-semibold text-[#231a18]">
              {editingItem ? 'Chỉnh sửa mẫu hộp quà' : 'Thêm mẫu hộp quà mới'}
            </h3>
            <p className="mt-1 mb-0 text-xs font-normal text-[#6c625e]">
              Tải ảnh chụp thực tế hoặc nhập URL ảnh hộp, sau đó hoàn thiện thông số kỹ thuật gia công B2B.
            </p>
          </div>
        }
        open={modalOpen}
        onCancel={() => {
          if (!uploadingImage && !submitting) {
            setModalOpen(false);
          }
        }}
        footer={null}
        width={840}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSave} className="pt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left Visual Rail: Upload & Always-Visible HTTPS URL */}
            <div className="rounded-xl border border-[#e4dcd3] bg-[#faf7f2] p-4 lg:col-span-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#231a18]">
                  Hình ảnh mẫu hộp thực tế
                </span>
                {previewImageUrl && (
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      form.setFieldValue('sampleImageUrl', '');
                      setUploadError('');
                    }}
                  >
                    Gỡ ảnh
                  </Button>
                )}
              </div>

              <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-xl border border-[#e4dcd3] bg-white">
                {previewImageUrl ? (
                  <Image
                    src={previewImageUrl}
                    alt="Xem trước mẫu hộp quà"
                    width="100%"
                    height={192}
                    fallback="/hero_mooncake_bg.jpg"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 px-4 text-center text-[#8a7f7a]">
                    <PictureOutlined className="text-3xl text-[#b8aba3]" />
                    <span className="text-xs leading-relaxed">
                      Tải ảnh từ máy tính hoặc dán URL HTTPS bên dưới để xem trước mẫu hộp
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-3">
                <Upload
                  accept=".jpg,.jpeg,.png,.webp"
                  showUploadList={false}
                  customRequest={handleSampleImageUpload}
                  disabled={uploadingImage || submitting}
                  beforeUpload={(file) => {
                    if (file.size > 5 * 1024 * 1024) {
                      setUploadError('Dung lượng ảnh tối đa 5 MiB.');
                      return Upload.LIST_IGNORE;
                    }
                    return true;
                  }}
                >
                  <Button
                    block
                    icon={<UploadOutlined />}
                    loading={uploadingImage}
                    disabled={submitting}
                    className="border-[#d7cdc2] bg-white font-medium text-[#231a18] hover:border-[#7d1322] hover:text-[#7d1322]"
                  >
                    {uploadingImage ? 'Đang tải ảnh lên...' : 'Tải ảnh mẫu hộp từ thiết bị'}
                  </Button>
                </Upload>
              </div>

              {uploadError && (
                <Alert type="error" showIcon title={uploadError} className="mt-3" />
              )}

              <Form.Item
                name="sampleImageUrl"
                label="URL hình ảnh mẫu thực tế (HTTPS)"
                className="mt-4 mb-1"
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value || !String(value).trim()) return Promise.resolve();
                      const trimmed = String(value).trim();
                      if (
                        trimmed.startsWith('https://')
                        || trimmed.startsWith('http://')
                        || trimmed.startsWith('/')
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('URL ảnh phải bắt đầu bằng https:// hoặc được tải lên từ máy.'),
                      );
                    },
                  },
                ]}
              >
                <Input
                  prefix={<LinkOutlined className="text-[#8a7f7a]" />}
                  placeholder="https://res.cloudinary.com/..."
                  allowClear
                />
              </Form.Item>

              <p className="m-0 text-[11px] leading-relaxed text-[#6c625e]">
                Hỗ trợ JPG, PNG, WebP (tối đa 5 MiB). Khi tải ảnh lên, đường dẫn HTTPS sẽ tự động điền vào ô này.
              </p>
            </div>

            {/* Right Column: Technical Specs */}
            <div className="lg:col-span-7">
              <Form.Item
                name="name"
                label="Tên mẫu hộp quà"
                rules={[{ required: true, whitespace: true, message: 'Vui lòng nhập tên mẫu hộp.' }]}
              >
                <Input maxLength={255} placeholder="Ví dụ: Hộp Sơn Mài Ngọc Bích (4 bánh)" />
              </Form.Item>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Form.Item name="material" label="Chất liệu thân hộp">
                  <Input maxLength={150} placeholder="Gỗ tự nhiên sơn mài, giấy mỹ thuật, da..." />
                </Form.Item>

                <Form.Item name="dimensions" label="Kích thước (D x R x C)">
                  <Input maxLength={100} placeholder="32 x 32 x 8 cm" />
                </Form.Item>
              </div>

              <Form.Item name="technique" label="Kỹ thuật gia công logo">
                <Input maxLength={150} placeholder="Ép kim vàng 24K, Khắc laser nắp gỗ, Dập nổi..." />
              </Form.Item>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Form.Item name="capacity" label="Sức chứa bánh" rules={[{ required: true }]}>
                  <InputNumber min={1} max={100} className="w-full" addonAfter="bánh" />
                </Form.Item>

                <Form.Item name="basePrice" label="Phụ phí phôi hộp" rules={[{ required: true }]}>
                  <InputNumber min={0} step={10000} className="w-full" addonAfter="₫" />
                </Form.Item>

                <Form.Item name="minOrderQty" label="MOQ tối thiểu" rules={[{ required: true }]}>
                  <InputNumber min={1} className="w-full" addonAfter="hộp" />
                </Form.Item>
              </div>

              <Form.Item name="description" label="Mô tả cấu tạo & khay lót">
                <TextArea rows={3} placeholder="Nắp hít nam châm, khay nhung đỏ, quai xách da..." />
              </Form.Item>

              {editingItem && (
                <Form.Item name="isActive" label="Nhận gia công mẫu này" valuePropName="checked" className="mb-0">
                  <Switch />
                </Form.Item>
              )}
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-2 border-t border-[#efe9e1] pt-4">
            <Button
              disabled={uploadingImage || submitting}
              onClick={() => setModalOpen(false)}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              disabled={uploadingImage}
              style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
            >
              {editingItem ? 'Lưu thay đổi' : 'Tạo mẫu hộp'}
            </Button>
          </div>
        </Form>
      </Modal>
    </section>
  );
}
