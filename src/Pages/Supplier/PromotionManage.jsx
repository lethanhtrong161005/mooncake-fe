import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import supplierService from '../../services/supplierService';
import productService from '../../services/productService';

const { Text } = Typography;
const { RangePicker } = DatePicker;

export default function PromotionManage({ onNavigate }) {
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadSeq, setReloadSeq] = useState(0);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [form] = Form.useForm();
  const discountType = Form.useWatch('discountType', form);

  const loadData = useCallback(() => {
    setLoading(true);
    setReloadSeq((seq) => seq + 1);
  }, []);

  useEffect(() => {
    let ignore = false;
    const fetchAll = async () => {
      try {
        const [promoRes, prodRes] = await Promise.allSettled([
          supplierService.listPromotions(),
          productService.mine({ page: 1, pageSize: 100 }),
        ]);

        if (ignore) return;

        if (promoRes.status === 'fulfilled') {
          const raw = promoRes.value;
          const list = Array.isArray(raw) ? raw : raw?.items || raw?.data || [];
          setPromotions(list);
        } else {
          message.error(promoRes.reason?.message || 'Không thể tải danh sách khuyến mãi.');
        }

        if (prodRes.status === 'fulfilled') {
          const pList = prodRes.value?.items || prodRes.value?.data || [];
          setProducts(pList);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchAll();
    return () => {
      ignore = true;
    };
  }, [reloadSeq]);

  const handleOpenCreate = () => {
    setEditingPromotion(null);
    form.resetFields();
    form.setFieldsValue({
      discountType: 'Percentage',
      minQty: 10,
      discountValue: 10,
      productId: null,
      dateRange: [dayjs(), dayjs().add(30, 'day')],
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (record) => {
    setEditingPromotion(record);
    form.resetFields();
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      productId: record.productId || null,
      minQty: record.minQty || 1,
      maxQty: record.maxQty || null,
      discountType:
        record.discountType === 0 || record.discountType === 'Percentage'
          ? 'Percentage'
          : 'FixedAmount',
      discountValue: Number(record.discountValue || 0),
      dateRange: record.startAtUtc && record.endAtUtc
        ? [dayjs(record.startAtUtc), dayjs(record.endAtUtc)]
        : undefined,
    });
    setModalOpen(true);
  };

  const handleSave = async (values) => {
    setSaving(true);
    try {
      const payload = {
        name: values.name.trim(),
        description: values.description?.trim() || null,
        productId: values.productId || null,
        minQty: Number(values.minQty) || 1,
        maxQty: values.maxQty ? Number(values.maxQty) : null,
        discountType: values.discountType,
        discountValue: Number(values.discountValue),
        startAtUtc: values.dateRange?.[0] ? values.dateRange[0].toISOString() : null,
        endAtUtc: values.dateRange?.[1] ? values.dateRange[1].toISOString() : null,
      };

      if (editingPromotion) {
        await supplierService.updatePromotion(editingPromotion.id, payload);
        message.success(`Đã cập nhật khuyến mãi "${payload.name}".`);
      } else {
        await supplierService.createPromotion(payload);
        message.success(`Đã tạo chương trình khuyến mãi "${payload.name}".`);
      }

      setModalOpen(false);
      await loadData();
    } catch (err) {
      message.error(err.message || 'Không thể lưu chương trình khuyến mãi.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    try {
      await supplierService.deletePromotion(id);
      message.success(`Đã ngừng áp dụng khuyến mãi "${name}".`);
      await loadData();
    } catch (err) {
      message.error(err.message || 'Không thể xóa chương trình khuyến mãi.');
    }
  };

  const getPromoStatus = (promo) => {
    if (!promo.isActive) return { text: 'Ngừng hoạt động', color: 'default', code: 'INACTIVE' };
    const now = dayjs();
    if (promo.startAtUtc && dayjs(promo.startAtUtc).isAfter(now)) {
      return { text: 'Sắp diễn ra', color: 'blue', code: 'SCHEDULED' };
    }
    if (promo.endAtUtc && dayjs(promo.endAtUtc).isBefore(now)) {
      return { text: 'Hết hạn', color: 'orange', code: 'EXPIRED' };
    }
    return { text: 'Đang áp dụng', color: 'success', code: 'ACTIVE' };
  };

  const filteredPromotions = promotions.filter((p) => {
    const keyword = searchText.toLowerCase();
    const matchesName = !keyword
      || p.name?.toLowerCase().includes(keyword)
      || p.description?.toLowerCase().includes(keyword);
    const status = getPromoStatus(p);
    const matchesStatus = statusFilter === 'ALL'
      || status.code === statusFilter
      || (statusFilter === 'EXPIRED' && (status.code === 'EXPIRED' || status.code === 'INACTIVE'));
    return matchesName && matchesStatus;
  });

  const activeCount = promotions.filter((p) => getPromoStatus(p).code === 'ACTIVE').length;
  const scheduledCount = promotions.filter((p) => getPromoStatus(p).code === 'SCHEDULED').length;
  const expiredCount = promotions.filter(
    (p) => ['EXPIRED', 'INACTIVE'].includes(getPromoStatus(p).code),
  ).length;

  const columns = [
    {
      title: 'Chương trình chiết khấu',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        const prod = products.find(
          (p) => p.productId === record.productId || p.id === record.productId,
        );
        return (
          <div className="space-y-1">
            <div className="font-semibold text-sm text-[#7d1322]">{text}</div>
            {record.description && (
              <div className="max-w-md text-xs text-[#6c625e]">{record.description}</div>
            )}
            <div className="pt-0.5">
              {prod ? (
                <Tag color="gold">Sản phẩm: {prod.name}</Tag>
              ) : (
                <Tag>Áp dụng toàn bộ gian hàng</Tag>
              )}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Mức giảm giá B2B',
      key: 'discount',
      render: (_, record) => {
        const isPercent = record.discountType === 0 || record.discountType === 'Percentage';
        return (
          <div>
            <div className="font-semibold tabular-nums text-sm text-[#9a6b16]">
              {isPercent
                ? `Giảm ${record.discountValue}%`
                : `Giảm ${Number(record.discountValue).toLocaleString('vi-VN')} ₫`}
            </div>
            <div className="mt-0.5 text-xs tabular-nums text-[#6c625e]">
              Từ <strong className="text-[#231a18]">{record.minQty || 1}</strong> hộp
              {record.maxQty ? ` (tối đa ${record.maxQty} hộp)` : ''}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Thời gian áp dụng',
      key: 'duration',
      render: (_, record) => {
        if (!record.startAtUtc && !record.endAtUtc) {
          return <Tag>Vô thời hạn</Tag>;
        }
        return (
          <div className="space-y-0.5 text-xs tabular-nums text-[#6c625e]">
            <div>Từ: {record.startAtUtc ? dayjs(record.startAtUtc).format('DD/MM/YYYY') : '—'}</div>
            <div>Đến: {record.endAtUtc ? dayjs(record.endAtUtc).format('DD/MM/YYYY') : '—'}</div>
          </div>
        );
      },
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => {
        const st = getPromoStatus(record);
        return <Tag color={st.color}>{st.text}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'actions',
      align: 'right',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleOpenEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Ngừng kích hoạt khuyến mãi?"
            description={`Hủy áp dụng chương trình "${record.name}"?`}
            onConfirm={() => handleDelete(record.id, record.name)}
            okText="Đồng ý"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button size="small" danger icon={<DeleteOutlined />} aria-label={`Hủy ${record.name}`} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <ColonyAdminLayout
      role="Supplier"
      activeKey="nha-cung-cap/khuyen-mai"
      onNavigate={onNavigate}
      title="Khuyến mãi & chiết khấu theo sản lượng"
      subtitle="Thiết lập chính sách giảm giá theo bậc số lượng hộp cho đơn hàng doanh nghiệp."
      extra={
        <Space>
          <Button icon={<ReloadOutlined />} onClick={loadData} loading={loading}>
            Làm mới
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenCreate}
            style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
          >
            Tạo khuyến mãi mới
          </Button>
        </Space>
      }
    >
      <div className="space-y-5">
        {/* Architectural Summary Ribbon */}
        <div className="grid grid-cols-1 divide-y divide-[#e4dcd3] rounded-2xl border border-[#e4dcd3] bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="px-5 py-4">
            <div className="text-xs text-[#6c625e]">Đang hoạt động</div>
            <div className="mt-1 font-serif text-2xl font-semibold tabular-nums text-[#2d5a43]">
              {activeCount}
            </div>
          </div>
          <div className="px-5 py-4">
            <div className="text-xs text-[#6c625e]">Sắp diễn ra</div>
            <div className="mt-1 font-serif text-2xl font-semibold tabular-nums text-[#9a6b16]">
              {scheduledCount}
            </div>
          </div>
          <div className="px-5 py-4">
            <div className="text-xs text-[#6c625e]">Hết hạn / đã ngừng</div>
            <div className="mt-1 font-serif text-2xl font-semibold tabular-nums text-[#6c625e]">
              {expiredCount}
            </div>
          </div>
        </div>

        {/* Filter Bar & Table */}
        <section
          aria-label="Danh sách chương trình khuyến mãi"
          className="rounded-2xl border border-[#e4dcd3] bg-white p-4 sm:p-6"
        >
          <div className="flex flex-col gap-3 rounded-xl border border-[#ebe3da] bg-[#faf7f2] p-3.5 lg:flex-row lg:items-center lg:justify-between">
            <Input
              placeholder="Tìm tên chương trình hoặc mô tả..."
              prefix={<SearchOutlined className="text-[#8a7f7a]" />}
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full lg:max-w-sm"
            />
            <div className="flex flex-wrap items-center gap-2">
              <Text className="text-xs text-[#6c625e]">Trạng thái:</Text>
              <Radio.Group
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                buttonStyle="solid"
                size="small"
              >
                <Radio.Button value="ALL">Tất cả ({promotions.length})</Radio.Button>
                <Radio.Button value="ACTIVE">Đang áp dụng</Radio.Button>
                <Radio.Button value="SCHEDULED">Sắp tới</Radio.Button>
                <Radio.Button value="EXPIRED">Đã dừng</Radio.Button>
              </Radio.Group>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <Table
              columns={columns}
              dataSource={filteredPromotions}
              rowKey="id"
              loading={loading}
              size="middle"
              locale={{ emptyText: 'Chưa có chương trình khuyến mãi nào được tạo.' }}
              pagination={{ pageSize: 10, showSizeChanger: false }}
              scroll={{ x: 860 }}
            />
          </div>
        </section>
      </div>

      <Modal
        title={
          <span className="font-serif text-lg font-semibold text-[#231a18]">
            {editingPromotion ? 'Chỉnh sửa chương trình khuyến mãi' : 'Tạo chương trình khuyến mãi mới'}
          </span>
        }
        open={modalOpen}
        onCancel={() => !saving && setModalOpen(false)}
        confirmLoading={saving}
        onOk={() => form.submit()}
        okText={editingPromotion ? 'Lưu thay đổi' : 'Tạo khuyến mãi'}
        cancelText="Đóng"
        okButtonProps={{ style: { backgroundColor: '#7d1322', borderColor: '#7d1322' } }}
        width={620}
        destroyOnHidden
      >
        <Alert
          type="info"
          showIcon
          title="Chiết khấu theo bậc số lượng (B2B Volume Tier)"
          description="Ưu đãi tự động áp dụng khi doanh nghiệp đặt mua số lượng đạt ngưỡng tối thiểu."
          className="mb-4 mt-2"
        />

        <Form form={form} layout="vertical" onFinish={handleSave} disabled={saving}>
          <Form.Item
            name="name"
            label="Tên chương trình khuyến mãi"
            rules={[
              { required: true, message: 'Vui lòng nhập tên chương trình khuyến mãi.' },
              { max: 255, message: 'Tối đa 255 ký tự.' },
            ]}
          >
            <Input placeholder="Ví dụ: Ưu đãi đặt sớm Trung Thu - Chiết khấu 15%" />
          </Form.Item>

          <Form.Item name="description" label="Mô tả & điều kiện áp dụng">
            <Input.TextArea
              rows={3}
              placeholder="Ví dụ: Áp dụng cho các đơn hàng quà tặng doanh nghiệp đặt cọc sớm..."
              maxLength={1000}
              showCount
            />
          </Form.Item>

          <Form.Item name="productId" label="Sản phẩm áp dụng">
            <Select
              allowClear
              placeholder="Áp dụng cho toàn bộ sản phẩm của gian hàng"
              options={[
                { value: null, label: 'Toàn bộ gian hàng (Tất cả sản phẩm)' },
                ...products.map((p) => ({
                  value: p.productId || p.id,
                  label: `${p.name} (${Number(p.basePrice || 0).toLocaleString('vi-VN')} ₫)`,
                })),
              ]}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="discountType"
                label="Loại hình chiết khấu"
                rules={[{ required: true }]}
              >
                <Radio.Group buttonStyle="solid" className="w-full">
                  <Radio.Button value="Percentage" style={{ width: '50%', textAlign: 'center' }}>
                    Phần trăm (%)
                  </Radio.Button>
                  <Radio.Button value="FixedAmount" style={{ width: '50%', textAlign: 'center' }}>
                    Số tiền (₫)
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="discountValue"
                label={discountType === 'Percentage' ? 'Mức giảm giá (%)' : 'Số tiền giảm (VNĐ)'}
                rules={[{ required: true, message: 'Vui lòng nhập mức giảm giá.' }]}
              >
                <InputNumber
                  min={1}
                  max={discountType === 'Percentage' ? 90 : 100000000}
                  step={discountType === 'Percentage' ? 1 : 10000}
                  addonAfter={discountType === 'Percentage' ? '%' : '₫'}
                  className="w-full"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="minQty"
                label="Số lượng tối thiểu"
                rules={[{ required: true, message: 'Nhập số lượng tối thiểu để được giảm giá.' }]}
              >
                <InputNumber min={1} max={100000} addonAfter="hộp" className="w-full" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="maxQty" label="Số lượng tối đa (tùy chọn)">
                <InputNumber min={1} max={100000} placeholder="Không giới hạn" addonAfter="hộp" className="w-full" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="dateRange" label="Thời gian hiệu lực">
            <RangePicker className="w-full" format="DD/MM/YYYY" placeholder={['Ngày bắt đầu', 'Ngày kết thúc']} />
          </Form.Item>
        </Form>
      </Modal>
    </ColonyAdminLayout>
  );
}
