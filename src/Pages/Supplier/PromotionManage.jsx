import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
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
  Statistic,
  Table,
  Tag,
  Typography,
  message,
} from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  GiftOutlined,
  PlusOutlined,
  ReloadOutlined,
  TagOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import supplierService from '../../services/supplierService';
import productService from '../../services/productService';

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;

export default function PromotionManage({ onNavigate }) {
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [form] = Form.useForm();
  const discountType = Form.useWatch('discountType', form);

  // Load promotions & products
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [promoRes, prodRes] = await Promise.allSettled([
        supplierService.listPromotions(),
        productService.mine({ page: 1, pageSize: 100 }),
      ]);

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
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Open modal for Create
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

  // Open modal for Edit
  const handleOpenEdit = (record) => {
    setEditingPromotion(record);
    form.resetFields();
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      productId: record.productId || null,
      minQty: record.minQty || 1,
      maxQty: record.maxQty || null,
      discountType: record.discountType === 0 || record.discountType === 'Percentage' ? 'Percentage' : 'FixedAmount',
      discountValue: Number(record.discountValue || 0),
      dateRange: record.startAtUtc && record.endAtUtc
        ? [dayjs(record.startAtUtc), dayjs(record.endAtUtc)]
        : undefined,
    });
    setModalOpen(true);
  };

  // Submit Save Promotion
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
        message.success(`Đã cập nhật khuyến mãi "${payload.name}" thành công!`);
      } else {
        await supplierService.createPromotion(payload);
        message.success(`Đã tạo chương trình khuyến mãi "${payload.name}" thành công!`);
      }

      setModalOpen(false);
      await loadData();
    } catch (err) {
      message.error(err.message || 'Không thể lưu chương trình khuyến mãi.');
    } finally {
      setSaving(false);
    }
  };

  // Deactivate / Delete Promotion
  const handleDelete = async (id, name) => {
    try {
      await supplierService.deletePromotion(id);
      message.success(`Đã hủy kích hoạt khuyến mãi "${name}".`);
      await loadData();
    } catch (err) {
      message.error(err.message || 'Không thể xóa chương trình khuyến mãi.');
    }
  };

  // Helper status determination
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

  // Filtered promotions
  const filteredPromotions = promotions.filter((p) => {
    const matchesName = !searchText || p.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchText.toLowerCase());
    const status = getPromoStatus(p);
    const matchesStatus = statusFilter === 'ALL' || status.code === statusFilter;
    return matchesName && matchesStatus;
  });

  // Metrics
  const activeCount = promotions.filter((p) => getPromoStatus(p).code === 'ACTIVE').length;
  const scheduledCount = promotions.filter((p) => getPromoStatus(p).code === 'SCHEDULED').length;
  const expiredCount = promotions.filter((p) => getPromoStatus(p).code === 'EXPIRED' || getPromoStatus(p).code === 'INACTIVE').length;

  const columns = [
    {
      title: 'Tên Chương Trình / Voucher',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        const prod = products.find((p) => p.productId === record.productId || p.id === record.productId);
        return (
          <Space orientation="vertical" size={2}>
            <Text strong style={{ color: '#8c1524', fontSize: 14 }}>
              <TagOutlined style={{ marginRight: 6 }} />
              {text}
            </Text>
            {record.description && (
              <Text type="secondary" style={{ fontSize: 12 }}>
                {record.description}
              </Text>
            )}
            <div style={{ marginTop: 4 }}>
              {prod ? (
                <Tag color="cyan">Sản phẩm: {prod.name}</Tag>
              ) : (
                <Tag color="purple">Áp dụng toàn bộ gian hàng</Tag>
              )}
            </div>
          </Space>
        );
      },
    },
    {
      title: 'Mức Giảm Giá',
      key: 'discount',
      render: (_, record) => {
        const isPercent = record.discountType === 0 || record.discountType === 'Percentage';
        return (
          <div>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#d48806' }}>
              {isPercent
                ? `Giảm ${record.discountValue}%`
                : `Giảm ${Number(record.discountValue).toLocaleString('vi-VN')} ₫`}
            </span>
            <div style={{ fontSize: 12, color: '#666' }}>
              Bậc số lượng: ≥ <strong>{record.minQty || 1}</strong> hộp
              {record.maxQty ? ` (Tối đa ${record.maxQty} hộp)` : ''}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Thời Gian Áp Dụng',
      key: 'duration',
      render: (_, record) => {
        if (!record.startAtUtc && !record.endAtUtc) {
          return <Tag color="default">Vô thời hạn</Tag>;
        }
        return (
          <div style={{ fontSize: 12 }}>
            <div>Từ: {record.startAtUtc ? dayjs(record.startAtUtc).format('DD/MM/YYYY') : '—'}</div>
            <div>Đến: {record.endAtUtc ? dayjs(record.endAtUtc).format('DD/MM/YYYY') : '—'}</div>
          </div>
        );
      },
    },
    {
      title: 'Trạng Thái',
      key: 'status',
      render: (_, record) => {
        const st = getPromoStatus(record);
        return <Tag color={st.color}>{st.text}</Tag>;
      },
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      width: 140,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleOpenEdit(record)}
            style={{ color: '#1677ff' }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Ngừng kích hoạt khuyến mãi?"
            description={`Bạn có chắc muốn hủy áp dụng chương trình "${record.name}"?`}
            onConfirm={() => handleDelete(record.id, record.name)}
            okText="Đồng ý"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button type="text" danger icon={<DeleteOutlined />}>
              Hủy
            </Button>
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
      title="Khuyến Mãi & Voucher Chiết Khấu B2B"
      subtitle="Thiết lập các mức chiết khấu theo số lượng hộp (Volume Tier Discounts) và khuyến mãi mùa vụ cho khách hàng doanh nghiệp"
      extra={
        <Space>
          <Button icon={<ReloadOutlined />} onClick={loadData} loading={loading}>
            Làm mới
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenCreate}
            style={{ backgroundColor: '#8c1524', borderColor: '#8c1524' }}
          >
            Tạo Khuyến Mãi Mới
          </Button>
        </Space>
      }
    >
      <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
        {/* KPI Metrics */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card bordered={false} style={{ borderRadius: 10, background: '#fff' }}>
              <Statistic
                title="Đang Hoạt Động"
                value={activeCount}
                prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ color: '#237804', fontWeight: 700 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card bordered={false} style={{ borderRadius: 10, background: '#fff' }}>
              <Statistic
                title="Sắp Diễn Ra"
                value={scheduledCount}
                prefix={<ClockCircleOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ color: '#096dd9', fontWeight: 700 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card bordered={false} style={{ borderRadius: 10, background: '#fff' }}>
              <Statistic
                title="Hết Hạn / Ngừng"
                value={expiredCount}
                prefix={<GiftOutlined style={{ color: '#8c8c8c' }} />}
                valueStyle={{ color: '#595959', fontWeight: 700 }}
              />
            </Card>
          </Col>
        </Row>

        {/* Filter bar & table */}
        <Card bordered={false} style={{ borderRadius: 10 }}>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }} align="middle" justify="space-between">
            <Col xs={24} md={12}>
              <Input.Search
                placeholder="Tìm tên chương trình hoặc mô tả khuyến mãi..."
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ maxWidth: 360 }}
              />
            </Col>
            <Col xs={24} md={12} style={{ textAlign: 'right' }}>
              <Space>
                <Text type="secondary">Trạng thái:</Text>
                <Radio.Group
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  buttonStyle="solid"
                >
                  <Radio.Button value="ALL">Tất cả ({promotions.length})</Radio.Button>
                  <Radio.Button value="ACTIVE">Đang áp dụng</Radio.Button>
                  <Radio.Button value="SCHEDULED">Sắp tới</Radio.Button>
                  <Radio.Button value="EXPIRED">Đã dừng</Radio.Button>
                </Radio.Group>
              </Space>
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={filteredPromotions}
            rowKey="id"
            loading={loading}
            locale={{ emptyText: 'Chưa có chương trình khuyến mãi nào được tạo.' }}
            pagination={{ pageSize: 10, showSizeChanger: true }}
          />
        </Card>
      </Space>

      {/* Modal Add / Edit Promotion */}
      <Modal
        title={editingPromotion ? 'Chỉnh Sửa Chương Trình Khuyến Mãi' : 'Tạo Chương Trình Khuyến Mãi / Voucher Mới'}
        open={modalOpen}
        onCancel={() => !saving && setModalOpen(false)}
        confirmLoading={saving}
        onOk={() => form.submit()}
        okText={editingPromotion ? 'Lưu Thay Đổi' : 'Tạo Khuyến Mãi'}
        cancelText="Đóng"
        okButtonProps={{ style: { backgroundColor: '#8c1524', borderColor: '#8c1524' } }}
        width={620}
        destroyOnClose
      >
        <Alert
          type="info"
          showIcon
          message="Khuyến Mãi Theo Bậc Số Lượng (B2B Volume Tier)"
          description="Ưu đãi sẽ được tự động áp dụng khi doanh nghiệp đặt mua số lượng bánh lớn đạt ngưỡng MinQty quy định."
          style={{ marginBottom: 18 }}
        />

        <Form form={form} layout="vertical" onFinish={handleSave} disabled={saving}>
          <Form.Item
            name="name"
            label="Tên Chương Trình Khuyến Mãi"
            rules={[
              { required: true, message: 'Vui lòng nhập tên chương trình khuyến mãi.' },
              { max: 255, message: 'Tối đa 255 ký tự.' },
            ]}
          >
            <Input placeholder="Ví dụ: Ưu Đãi Đặt Sớm Trung Thu 2026 - Chiết Khấu 15%" />
          </Form.Item>

          <Form.Item name="description" label="Mô Tả Chi Tiết & Điều Kiện Áp Dụng">
            <Input.TextArea
              rows={3}
              placeholder="Ví dụ: Áp dụng cho các đơn hàng quà tặng doanh nghiệp đặt cọc trước ngày 15/08/2026..."
              maxLength={1000}
              showCount
            />
          </Form.Item>

          <Form.Item name="productId" label="Sản Phẩm Áp Dụng">
            <Select
              allowClear
              placeholder="Áp dụng cho toàn bộ sản phẩm của gian hàng (Khuyên dùng)"
              options={[
                { value: null, label: '🌟 Toàn bộ gian hàng (Tất cả dòng bánh)' },
                ...products.map((p) => ({
                  value: p.productId || p.id,
                  label: `${p.name} (${Number(p.basePrice || 0).toLocaleString('vi-VN')} ₫)`,
                })),
              ]}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="discountType"
                label="Loại Hình Chiết Khấu"
                rules={[{ required: true }]}
              >
                <Radio.Group buttonStyle="solid" style={{ width: '100%' }}>
                  <Radio.Button value="Percentage" style={{ width: '50%', textAlign: 'center' }}>
                    Phần Trăm (%)
                  </Radio.Button>
                  <Radio.Button value="FixedAmount" style={{ width: '50%', textAlign: 'center' }}>
                    Số Tiền (₫)
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="discountValue"
                label={discountType === 'Percentage' ? 'Mức Giảm Giá (%)' : 'Số Tiền Giảm (VNĐ)'}
                rules={[{ required: true, message: 'Vui lòng nhập mức giảm giá.' }]}
              >
                <InputNumber
                  min={1}
                  max={discountType === 'Percentage' ? 90 : 100000000}
                  step={discountType === 'Percentage' ? 1 : 10000}
                  addonAfter={discountType === 'Percentage' ? '%' : '₫'}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="minQty"
                label="Số Lượng Tối Thiểu (MinQty)"
                rules={[{ required: true, message: 'Nhập số lượng tối thiểu để được giảm giá.' }]}
              >
                <InputNumber min={1} max={100000} addonAfter="hộp" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="maxQty" label="Số Lượng Tối Đa (MaxQty - Tùy chọn)">
                <InputNumber min={1} max={100000} placeholder="Không giới hạn" addonAfter="hộp" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="dateRange" label="Thời Gian Hiệu Lực (Từ Ngày - Đến Ngày)">
            <RangePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder={['Ngày bắt đầu', 'Ngày kết thúc']} />
          </Form.Item>
        </Form>
      </Modal>
    </ColonyAdminLayout>
  );
}
