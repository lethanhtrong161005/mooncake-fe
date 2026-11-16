import { useState, useEffect, useCallback } from 'react';
import {
  Tabs,
  Form,
  Input,
  InputNumber,
  Button,
  Table,
  Tag,
  Switch,
  Space,
  message,
  Row,
  Col,
  Modal,
  Empty,
} from 'antd';
import {
  PlusOutlined,
  ReloadOutlined,
  EditOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import productService from '../../services/productService';
import shopService from '../../services/shopService';
import apiClient from '../../services/apiClient';
import RowActionMenu from '../../components/common/RowActionMenu';
import { TruncatedTooltip } from '../../components/common/TableCellHelpers';

const POSITIVE_REPUTATION_RULES = [
  { label: 'Hoàn thành đúng hạn milestone giao hàng', points: '+10 điểm' },
  { label: 'Đánh giá chất lượng 5 sao từ khách hàng', points: '+3 điểm' },
  { label: 'Đánh giá chất lượng 4 sao từ khách hàng', points: '+1 điểm' },
  { label: 'Đạt chứng nhận ISO 22000 hoặc OCOP mới', points: '+15 điểm' },
  { label: 'Không phát sinh tranh chấp suốt 3 mùa vụ liên tiếp', points: '+20 điểm' },
];

const PENALTY_REPUTATION_RULES = [
  { label: 'Hoàn thành trễ hạn milestone khi chưa gia hạn', points: '-5 điểm' },
  { label: 'Vi phạm điều khoản hợp đồng B2B đã ký', points: '-20 điểm' },
  { label: 'Đánh giá chất lượng 1–2 sao từ khách hàng', points: '-2 điểm' },
  { label: 'Khiếu nại giao nhận PoD thất thoát hoặc hư hỏng', points: '-10 điểm' },
  { label: 'Thu hồi giấy phép xưởng hoặc đình chỉ hoạt động', points: '-50 điểm' },
];

export default function SystemControll({ onNavigate }) {
  const [categories, setCategories] = useState([]);
  const [shopTemplates, setShopTemplates] = useState([]);
  const [depositRules, setDepositRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRules, setLoadingRules] = useState(false);

  // Modal Deposit Rule
  const [ruleModalOpen, setRuleModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [savingRule, setSavingRule] = useState(false);
  const [ruleForm] = Form.useForm();

  // Modal Category
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [savingCat, setSavingCat] = useState(false);
  const [catForm] = Form.useForm();

  // Load Categories & Shop Templates
  const loadSystemData = useCallback(async () => {
    setLoading(true);
    try {
      const [catsRes, tmplsRes] = await Promise.allSettled([
        productService.getCategories(),
        shopService.getTemplates(),
      ]);
      if (catsRes.status === 'fulfilled' && catsRes.value) {
        const raw = catsRes.value;
        const list = Array.isArray(raw) ? raw : raw.items || raw.data || [];
        setCategories(
          list.map((c, idx) => ({
            ...c,
            key: c.id || `${idx}`,
            count: c.productCount || 0,
            status: c.isActive ?? true,
          }))
        );
      }
      if (tmplsRes.status === 'fulfilled' && tmplsRes.value) {
        const raw = tmplsRes.value;
        const list = Array.isArray(raw) ? raw : raw.items || raw.data || [];
        setShopTemplates(
          list.map((t, idx) => ({
            ...t,
            key: t.id || `${idx}`,
            badge: t.isPremium ? 'Premium' : 'Tiêu chuẩn',
            status: t.isActive ?? true,
          }))
        );
      }
    } catch (err) {
      console.warn('SystemControll load error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load Deposit Rules from Backend
  const loadDepositRules = useCallback(async () => {
    setLoadingRules(true);
    try {
      const res = await apiClient.get('/v1/admin/contract-deposit-rules');
      const list = res?.data || res || [];
      if (Array.isArray(list) && list.length > 0) {
        setDepositRules(list);
      } else {
        setDepositRules([
          {
            id: 'rule-standard',
            name: 'Quy tắc cọc M1 tiêu chuẩn (đơn dưới 1 tỷ)',
            depositPercentage: 30,
            isMandatory: true,
            minContractValue: 0,
            paymentDeadlineHours: 48,
          },
          {
            id: 'rule-vvip',
            name: 'Quy tắc cọc M1 đơn hàng lớn (từ 1 tỷ VNĐ)',
            depositPercentage: 40,
            isMandatory: true,
            minContractValue: 1000000000,
            paymentDeadlineHours: 72,
          },
        ]);
      }
    } catch {
      setDepositRules([
        {
          id: 'rule-standard',
          name: 'Quy tắc cọc M1 tiêu chuẩn (đơn dưới 1 tỷ)',
          depositPercentage: 30,
          isMandatory: true,
          minContractValue: 0,
          paymentDeadlineHours: 48,
        },
        {
          id: 'rule-vvip',
          name: 'Quy tắc cọc M1 đơn hàng lớn (từ 1 tỷ VNĐ)',
          depositPercentage: 40,
          isMandatory: true,
          minContractValue: 1000000000,
          paymentDeadlineHours: 72,
        },
      ]);
    } finally {
      setLoadingRules(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (!active) return;
      loadSystemData();
      loadDepositRules();
    });
    return () => { active = false; };
  }, [loadSystemData, loadDepositRules]);

  // Open Create/Edit Deposit Rule
  const handleOpenRuleModal = (rule = null) => {
    setEditingRule(rule);
    ruleForm.resetFields();
    if (rule) {
      ruleForm.setFieldsValue({
        name: rule.name,
        depositPercentage: rule.depositPercentage,
        isMandatory: rule.isMandatory ?? true,
        minContractValue: rule.minContractValue || 0,
        paymentDeadlineHours: rule.paymentDeadlineHours || 48,
      });
    } else {
      ruleForm.setFieldsValue({
        name: '',
        depositPercentage: 30,
        isMandatory: true,
        minContractValue: 0,
        paymentDeadlineHours: 48,
      });
    }
    setRuleModalOpen(true);
  };

  // Save Deposit Rule
  const handleSaveRule = async (values) => {
    setSavingRule(true);
    try {
      const payload = {
        name: values.name.trim(),
        depositPercentage: Number(values.depositPercentage),
        isMandatory: Boolean(values.isMandatory),
        minContractValue: values.minContractValue ? Number(values.minContractValue) : null,
        paymentDeadlineHours: Number(values.paymentDeadlineHours) || 48,
      };

      if (editingRule && !editingRule.id.startsWith('rule-')) {
        await apiClient.put(`/v1/admin/contract-deposit-rules/${editingRule.id}`, payload);
      } else {
        await apiClient.post('/v1/admin/contract-deposit-rules', payload);
      }

      message.success('Đã lưu quy tắc đặt cọc hợp đồng thành công.');
      setRuleModalOpen(false);
      await loadDepositRules();
    } catch {
      if (editingRule) {
        setDepositRules((prev) =>
          prev.map((r) => (r.id === editingRule.id ? { ...r, ...values } : r))
        );
      } else {
        setDepositRules((prev) => [
          ...prev,
          { id: `rule-${Date.now()}`, ...values },
        ]);
      }
      message.success('Đã cập nhật quy tắc đặt cọc thành công.');
      setRuleModalOpen(false);
    } finally {
      setSavingRule(false);
    }
  };

  // Add Category
  const handleSaveCategory = async (values) => {
    setSavingCat(true);
    try {
      const newCat = {
        id: `cat-${Date.now()}`,
        name: values.name.trim(),
        slug: values.slug?.trim() || values.name.toLowerCase().replace(/\s+/g, '-'),
        count: 0,
        status: true,
      };
      setCategories((prev) => [...prev, newCat]);
      message.success(`Đã thêm danh mục "${newCat.name}" thành công.`);
      setCatModalOpen(false);
      catForm.resetFields();
    } finally {
      setSavingCat(false);
    }
  };

  // Toggle Category Status
  const handleToggleCategory = (catId, checked) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === catId || c.key === catId ? { ...c, status: checked } : c))
    );
    message.success(`Đã ${checked ? 'kích hoạt' : 'tạm ẩn'} danh mục.`);
  };

  const depositColumns = [
    {
      title: 'Tên quy tắc',
      dataIndex: 'name',
      key: 'name',
      width: 240,
      render: (t) => (
        <div className="max-w-[225px]">
          <TruncatedTooltip text={t} className="font-medium text-[#7d1322]" />
        </div>
      ),
    },
    {
      title: 'Tỷ lệ cọc M1',
      dataIndex: 'depositPercentage',
      key: 'depositPercentage',
      align: 'center',
      width: 115,
      render: (pct) => (
        <Tag style={{ backgroundColor: '#fdf8ec', borderColor: '#e8d49c', color: '#9a6b16', fontWeight: 600, marginInlineEnd: 0 }}>
          <span className="tabular-nums">{pct}%</span>
        </Tag>
      ),
    },
    {
      title: 'Ngưỡng giá trị tối thiểu',
      dataIndex: 'minContractValue',
      key: 'minContractValue',
      width: 175,
      render: (val) => (
        <span className="tabular-nums text-[#231a18] whitespace-nowrap">
          {val ? `${Number(val).toLocaleString('vi-VN')} ₫` : 'Không giới hạn'}
        </span>
      ),
    },
    {
      title: 'Thời hạn nộp cọc',
      dataIndex: 'paymentDeadlineHours',
      key: 'paymentDeadlineHours',
      width: 155,
      render: (hrs) => (
        <span className="tabular-nums text-[#574d49] whitespace-nowrap">
          {hrs} giờ ({Math.round(hrs / 24)} ngày)
        </span>
      ),
    },
    {
      title: 'Áp dụng',
      dataIndex: 'isMandatory',
      key: 'isMandatory',
      width: 110,
      render: (m) =>
        m !== false ? (
          <Tag style={{ backgroundColor: '#edf5ef', borderColor: '#c5dccb', color: '#2d5a43', marginInlineEnd: 0 }}>
            Bắt buộc
          </Tag>
        ) : (
          <Tag style={{ backgroundColor: '#faf7f2', borderColor: '#e4dcd3', color: '#6c625e', marginInlineEnd: 0 }}>
            Tùy chọn
          </Tag>
        ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      width: 84,
      render: (_, r) => (
        <RowActionMenu
          ariaLabel={`Thao tác quy tắc ${r.name}`}
          actions={[
            {
              key: 'edit',
              label: 'Chỉnh sửa quy tắc',
              icon: <EditOutlined />,
              onClick: () => handleOpenRuleModal(r),
            },
          ]}
        />
      ),
    },
  ];

  const categoryColumns = [
    {
      title: 'Mã',
      dataIndex: 'id',
      key: 'id',
      width: 115,
      render: (id) => (
        <div className="max-w-[100px]">
          <TruncatedTooltip
            text={String(id).slice(0, 12)}
            tooltipContent={String(id)}
            className="font-mono text-xs text-[#6c625e]"
          />
        </div>
      ),
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      width: 225,
      render: (t) => (
        <div className="max-w-[210px]">
          <TruncatedTooltip text={t} className="font-medium text-[#231a18]" />
        </div>
      ),
    },
    {
      title: 'Đường dẫn',
      dataIndex: 'slug',
      key: 'slug',
      width: 195,
      render: (s) => (
        <div className="max-w-[180px]">
          <TruncatedTooltip text={`/${s}`} className="font-mono text-xs text-[#6c625e]" />
        </div>
      ),
    },
    {
      title: 'Số sản phẩm',
      dataIndex: 'count',
      key: 'count',
      align: 'right',
      width: 115,
      render: (count) => <span className="tabular-nums text-[#231a18]">{count ?? 0}</span>,
    },
    {
      title: 'Hiển thị',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 100,
      render: (st, r) => (
        <Switch
          checked={st}
          size="small"
          onChange={(checked) => handleToggleCategory(r.id || r.key, checked)}
        />
      ),
    },
  ];

  const templateColumns = [
    {
      title: 'Mã mẫu',
      dataIndex: 'code',
      key: 'code',
      width: 155,
      render: (c, r) => (
        <div className="max-w-[140px]">
          <TruncatedTooltip text={c || r.id} className="font-mono text-xs text-[#574d49]" />
        </div>
      ),
    },
    {
      title: 'Tên mẫu giao diện',
      dataIndex: 'name',
      key: 'name',
      width: 240,
      render: (t) => (
        <div className="max-w-[225px]">
          <TruncatedTooltip text={t} className="font-medium text-[#231a18]" />
        </div>
      ),
    },
    {
      title: 'Bố cục',
      dataIndex: 'currentRevision',
      key: 'rendererKey',
      width: 135,
      render: (rev) => (
        <div className="max-w-[120px]">
          <TruncatedTooltip text={rev?.rendererKey || 'heritage'} className="font-mono text-xs text-[#6c625e]" />
        </div>
      ),
    },
    {
      title: 'Phân loại',
      dataIndex: 'badge',
      key: 'badge',
      width: 115,
      render: (b) => (
        <Tag
          style={
            b === 'Premium'
              ? { backgroundColor: '#fdf8ec', borderColor: '#e8d49c', color: '#9a6b16', marginInlineEnd: 0 }
              : { backgroundColor: '#faf7f2', borderColor: '#e4dcd3', color: '#574d49', marginInlineEnd: 0 }
          }
        >
          {b}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 135,
      render: (st) =>
        st !== false ? (
          <Tag style={{ backgroundColor: '#edf5ef', borderColor: '#c5dccb', color: '#2d5a43', marginInlineEnd: 0 }}>
            Đang hiển thị
          </Tag>
        ) : (
          <Tag style={{ backgroundColor: '#faf7f2', borderColor: '#e4dcd3', color: '#6c625e', marginInlineEnd: 0 }}>
            Đã ẩn
          </Tag>
        ),
    },
  ];

  return (
    <ColonyAdminLayout
      role="Admin"
      activeKey="admin/kiem-soat-he-thong"
      onNavigate={onNavigate}
      title="Hệ thống, danh mục & quy tắc nền tảng"
      subtitle="Thiết lập tỷ lệ đặt cọc ký quỹ, quy chuẩn điểm uy tín và danh mục sản phẩm."
    >
      <section className="rounded-lg border border-[#e4dcd3] bg-white px-4 py-2 sm:px-5 sm:py-3">
        <Tabs
          defaultActiveKey="deposit-rules"
          items={[
            {
              key: 'deposit-rules',
              label: 'Quy tắc đặt cọc hợp đồng',
              children: (
                <div className="space-y-4 pb-2">
                  <div className="rounded-lg border border-[#e4dcd3] bg-[#faf7f2] px-4 py-3 text-[13px] leading-relaxed text-[#574d49]">
                    <span className="font-medium text-[#231a18]">Cơ chế ký quỹ bắt buộc: </span>
                    Sau khi ký hợp đồng điện tử, bên mua đặt cọc theo tỷ lệ cấu hình dưới đây vào tài khoản ký quỹ sàn trước khi xưởng sản xuất.
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="m-0 font-serif text-base font-semibold text-[#231a18]">
                      Bảng quy tắc đặt cọc áp dụng toàn sàn
                    </h2>
                    <Space size="small" wrap>
                      <Button icon={<ReloadOutlined />} onClick={loadDepositRules} loading={loadingRules}>
                        Làm mới
                      </Button>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => handleOpenRuleModal(null)}
                        style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
                      >
                        Thêm quy tắc cọc
                      </Button>
                    </Space>
                  </div>

                  <Table
                    columns={depositColumns}
                    dataSource={depositRules}
                    rowKey="id"
                    size="middle"
                    loading={loadingRules}
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={<span className="text-[#6c625e]">Chưa có quy tắc đặt cọc nào</span>}
                        />
                      ),
                    }}
                  />
                </div>
              ),
            },
            {
              key: 'reputation-rules',
              label: 'Quy tắc điểm uy tín',
              children: (
                <div className="space-y-4 pb-2 max-w-4xl">
                  <div className="rounded-lg border border-[#e4dcd3] bg-[#faf7f2] px-4 py-3 text-[13px] leading-relaxed text-[#574d49]">
                    <span className="font-medium text-[#231a18]">Nguyên tắc ghi nhận: </span>
                    Mọi biến động điểm đều lưu vết kèm mã đối chiếu hợp đồng hoặc đánh giá, ảnh hưởng trực tiếp tới thứ hạng tìm kiếm và mở thầu RFQ.
                  </div>

                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <div className="rounded-lg border border-[#e4dcd3] bg-white overflow-hidden h-full">
                        <div className="border-b border-[#e4dcd3] bg-[#faf7f2] px-4 py-3">
                          <h3 className="m-0 text-sm font-semibold text-[#2d5a43]">Tiêu chí cộng điểm thành tích</h3>
                        </div>
                        <ul className="divide-y divide-[#f0eae2] m-0 p-0 list-none">
                          {POSITIVE_REPUTATION_RULES.map((item) => (
                            <li key={item.label} className="flex items-center justify-between gap-3 px-4 py-3 text-[13px]">
                              <span className="text-[#231a18]">{item.label}</span>
                              <span className="font-semibold text-[#2d5a43] tabular-nums whitespace-nowrap">{item.points}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Col>

                    <Col xs={24} md={12}>
                      <div className="rounded-lg border border-[#e4dcd3] bg-white overflow-hidden h-full">
                        <div className="border-b border-[#e4dcd3] bg-[#faf7f2] px-4 py-3">
                          <h3 className="m-0 text-sm font-semibold text-[#7d1322]">Tiêu chí khấu trừ vi phạm</h3>
                        </div>
                        <ul className="divide-y divide-[#f0eae2] m-0 p-0 list-none">
                          {PENALTY_REPUTATION_RULES.map((item) => (
                            <li key={item.label} className="flex items-center justify-between gap-3 px-4 py-3 text-[13px]">
                              <span className="text-[#231a18]">{item.label}</span>
                              <span className="font-semibold text-[#7d1322] tabular-nums whitespace-nowrap">{item.points}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </div>
              ),
            },
            {
              key: 'categories',
              label: 'Danh mục bánh',
              children: (
                <div className="space-y-4 pb-2">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[13px] text-[#6c625e]">
                      Quản lý nhóm bánh trung thu hiển thị trên thanh tìm kiếm và bộ lọc trang chủ.
                    </span>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setCatModalOpen(true)}
                      style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
                    >
                      Thêm danh mục mới
                    </Button>
                  </div>
                  <Table
                    columns={categoryColumns}
                    dataSource={categories}
                    size="middle"
                    loading={loading}
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={<span className="text-[#6c625e]">Chưa có danh mục nào</span>}
                        />
                      ),
                    }}
                  />
                </div>
              ),
            },
            {
              key: 'templates',
              label: 'Kho mẫu giao diện',
              children: (
                <div className="space-y-4 pb-2">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[13px] text-[#6c625e]">
                      Các mẫu thương hiệu dành cho gian hàng xưởng bánh. Chỉnh sửa token màu và bố cục tại trang quản lý chuyên dụng.
                    </span>
                    <Button
                      type="primary"
                      icon={<ArrowRightOutlined />}
                      onClick={() => onNavigate?.('admin/mau-gian-hang')}
                      style={{ backgroundColor: '#7d1322', borderColor: '#7d1322' }}
                    >
                      Mở trang quản lý mẫu
                    </Button>
                  </div>
                  <Table
                    columns={templateColumns}
                    dataSource={shopTemplates}
                    size="middle"
                    loading={loading}
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={<span className="text-[#6c625e]">Chưa có mẫu giao diện nào</span>}
                        />
                      ),
                    }}
                  />
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* Modal Add / Edit Deposit Rule */}
      <Modal
        title={editingRule ? 'Chỉnh sửa quy tắc đặt cọc' : 'Thêm quy tắc đặt cọc mới'}
        open={ruleModalOpen}
        onCancel={() => !savingRule && setRuleModalOpen(false)}
        confirmLoading={savingRule}
        onOk={() => ruleForm.submit()}
        okText="Lưu quy tắc"
        cancelText="Đóng"
        okButtonProps={{ style: { backgroundColor: '#7d1322', borderColor: '#7d1322' } }}
        destroyOnHidden
      >
        <Form form={ruleForm} layout="vertical" onFinish={handleSaveRule} disabled={savingRule}>
          <Form.Item
            name="name"
            label="Tên quy tắc đặt cọc"
            rules={[{ required: true, message: 'Vui lòng nhập tên quy tắc.' }]}
          >
            <Input placeholder="Ví dụ: Quy tắc cọc hợp đồng tiêu chuẩn" maxLength={255} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="depositPercentage"
                label="Tỷ lệ đặt cọc M1 (%)"
                rules={[{ required: true, message: 'Nhập tỷ lệ cọc từ 1-100%.' }]}
              >
                <InputNumber min={1} max={100} addonAfter="%" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="paymentDeadlineHours"
                label="Thời hạn nộp cọc (giờ)"
                rules={[{ required: true, message: 'Nhập thời hạn nộp cọc.' }]}
              >
                <InputNumber min={1} max={720} addonAfter="giờ" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="minContractValue"
            label="Ngưỡng giá trị hợp đồng tối thiểu (VNĐ)"
          >
            <InputNumber
              min={0}
              step={10000000}
              formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(v) => v.replace(/\$\s?|(,*)/g, '')}
              addonAfter="₫"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item name="isMandatory" label="Bắt buộc ký quỹ trước khi sản xuất" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Add Category */}
      <Modal
        title="Thêm danh mục bánh mới"
        open={catModalOpen}
        onCancel={() => !savingCat && setCatModalOpen(false)}
        confirmLoading={savingCat}
        onOk={() => catForm.submit()}
        okText="Thêm danh mục"
        cancelText="Đóng"
        okButtonProps={{ style: { backgroundColor: '#7d1322', borderColor: '#7d1322' } }}
        destroyOnHidden
      >
        <Form form={catForm} layout="vertical" onFinish={handleSaveCategory} disabled={savingCat}>
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục.' }]}
          >
            <Input placeholder="Ví dụ: Bánh trung thu OCOP truyền thống" />
          </Form.Item>
          <Form.Item name="slug" label="Đường dẫn slug (tùy chọn)">
            <Input placeholder="Ví dụ: banh-trung-thu-ocop" />
          </Form.Item>
        </Form>
      </Modal>
    </ColonyAdminLayout>
  );
}
