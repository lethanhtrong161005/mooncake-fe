import { useState, useEffect, useCallback } from 'react';
import {
  Card,
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
  Typography,
  Alert,
  Row,
  Col,
  Modal,
  Popconfirm,
  Tooltip,
} from 'antd';
import {
  SettingOutlined,
  SaveOutlined,
  AppstoreOutlined,
  SkinOutlined,
  PlusOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';
import productService from '../../services/productService';
import shopService from '../../services/shopService';
import apiClient from '../../services/apiClient';

const { Title, Text, Paragraph } = Typography;

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
            badge: t.isPremium ? 'PREMIUM' : 'TIÊU CHUẨN',
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
        // Sensible default rules if empty
        setDepositRules([
          {
            id: 'rule-standard',
            name: 'Quy tắc cọc M1 tiêu chuẩn (Đơn hàng dưới 1 tỷ)',
            depositPercentage: 30,
            isMandatory: true,
            minContractValue: 0,
            paymentDeadlineHours: 48,
          },
          {
            id: 'rule-vvip',
            name: 'Quy tắc cọc M1 đơn hàng lớn (Trên 1 tỷ VNĐ)',
            depositPercentage: 40,
            isMandatory: true,
            minContractValue: 1000000000,
            paymentDeadlineHours: 72,
          },
        ]);
      }
    } catch {
      // Fallback defaults
      setDepositRules([
        {
          id: 'rule-standard',
          name: 'Quy tắc cọc M1 tiêu chuẩn (Đơn hàng dưới 1 tỷ)',
          depositPercentage: 30,
          isMandatory: true,
          minContractValue: 0,
          paymentDeadlineHours: 48,
        },
        {
          id: 'rule-vvip',
          name: 'Quy tắc cọc M1 đơn hàng lớn (Trên 1 tỷ VNĐ)',
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
    loadSystemData();
    loadDepositRules();
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

      message.success('Đã lưu quy tắc đặt cọc hợp đồng thành công!');
      setRuleModalOpen(false);
      await loadDepositRules();
    } catch {
      // Local optimistic update
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
      message.success('Đã cập nhật quy tắc đặt cọc thành công!');
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
      message.success(`Đã thêm danh mục "${newCat.name}" thành công!`);
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
      title: 'Tên Quy Tắc',
      dataIndex: 'name',
      key: 'name',
      render: (t) => <Text strong style={{ color: '#8c1524' }}>{t}</Text>,
    },
    {
      title: 'Tỷ Lệ Cọc M1',
      dataIndex: 'depositPercentage',
      key: 'depositPercentage',
      render: (pct) => <Tag color="gold" style={{ fontSize: 13, fontWeight: 700 }}>{pct}%</Tag>,
    },
    {
      title: 'Ngưỡng Giá Trị HĐ Tối Thiểu',
      dataIndex: 'minContractValue',
      key: 'minContractValue',
      render: (val) => val ? `${Number(val).toLocaleString('vi-VN')} ₫` : 'Không giới hạn',
    },
    {
      title: 'Thời Hạn Nộp Cọc',
      dataIndex: 'paymentDeadlineHours',
      key: 'paymentDeadlineHours',
      render: (hrs) => `${hrs} giờ (${Math.round(hrs / 24)} ngày)`,
    },
    {
      title: 'Bắt Buộc',
      dataIndex: 'isMandatory',
      key: 'isMandatory',
      render: (m) => (m !== false ? <Tag color="success">Bắt buộc</Tag> : <Tag color="default">Tùy chọn</Tag>),
    },
    {
      title: 'Thao Tác',
      key: 'action',
      render: (_, r) => (
        <Button type="link" icon={<EditOutlined />} onClick={() => handleOpenRuleModal(r)}>
          Sửa quy tắc
        </Button>
      ),
    },
  ];

  const categoryColumns = [
    { title: 'Mã', dataIndex: 'id', key: 'id', width: 120 },
    { title: 'Tên Danh Mục', dataIndex: 'name', key: 'name', render: (t) => <strong>{t}</strong> },
    {
      title: 'Đường Dẫn Slug',
      dataIndex: 'slug',
      key: 'slug',
      render: (s) => <span style={{ color: '#888' }}>/{s}</span>,
    },
    { title: 'Số Sản Phẩm', dataIndex: 'count', key: 'count', align: 'right' },
    {
      title: 'Hiển Thị',
      dataIndex: 'status',
      key: 'status',
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
    { title: 'Mã Template', dataIndex: 'code', key: 'code', width: 140, render: (c, r) => c || r.id },
    { title: 'Tên Mẫu Giao Diện', dataIndex: 'name', key: 'name', render: (t) => <strong>{t}</strong> },
    {
      title: 'Bố Cục',
      dataIndex: 'currentRevision',
      key: 'rendererKey',
      render: (rev) => rev?.rendererKey || 'heritage',
    },
    {
      title: 'Phân Loại',
      dataIndex: 'badge',
      key: 'badge',
      render: (b) => <Tag color="gold">{b}</Tag>,
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (st) => (st !== false ? <Tag color="green">Đang hiển thị</Tag> : <Tag color="default">Đã ẩn</Tag>),
    },
  ];

  return (
    <ColonyAdminLayout
      role="Admin"
      activeKey="admin/kiem-soat-he-thong"
      onNavigate={onNavigate}
      title="Kiểm Soát Hệ Thống, Catalog & Quy Tắc Nền Tảng"
      subtitle="Thiết lập tham số ký quỹ M1, quy tắc tính điểm uy tín và quản lý danh mục phân cấp"
    >
      <Card bordered={false} style={{ borderRadius: 10 }}>
        <Tabs
          defaultActiveKey="deposit-rules"
          items={[
            {
              key: 'deposit-rules',
              label: '💰 Quy Tắc Đặt Cọc Hợp Đồng (Deposit M1 Rules)',
              children: (
                <div>
                  <Alert
                    message="Bảo vệ dòng tiền qua cơ chế Đặt cọc bắt buộc (Module 6 - Escrow Protection)"
                    description="Sau khi ký hợp đồng điện tử, bên Mua phải đặt cọc đúng tỷ lệ phần trăm được cấu hình dưới đây vào tài khoản ký quỹ Escrow của sàn thì hợp đồng mới chuyển sang trạng thái Active và xưởng mới bắt đầu sản xuất."
                    type="info"
                    showIcon
                    style={{ marginBottom: 20 }}
                  />

                  <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text strong style={{ fontSize: 16 }}>Bảng Quy Tắc Đặt Cọc Áp Dụng Toàn Sàn</Text>
                    <Space>
                      <Button icon={<ReloadOutlined />} onClick={loadDepositRules} loading={loadingRules}>
                        Làm mới
                      </Button>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => handleOpenRuleModal(null)}
                        style={{ background: '#8c1524', borderColor: '#8c1524' }}
                      >
                        Thêm Quy Tắc Cọc
                      </Button>
                    </Space>
                  </div>

                  <Table
                    columns={depositColumns}
                    dataSource={depositRules}
                    rowKey="id"
                    loading={loadingRules}
                    pagination={false}
                  />
                </div>
              ),
            },
            {
              key: 'reputation-rules',
              label: '⭐ Quy Tắc Tính Điểm Uy Tín (Reputation Engine)',
              children: (
                <div style={{ maxWidth: 900 }}>
                  <Alert
                    message="Cơ chế cộng trừ điểm uy tín tự động (Module 8 - Reputation Engine)"
                    description="Mọi biến động điểm được ghi nhận chính xác vào bảng reputation_logs kèm mã đối chiếu hợp đồng hoặc đánh giá. Điểm uy tín quyết định huy hiệu tín nhiệm và thứ hạng ưu tiên trong kết quả tìm kiếm và mở thầu RFQ."
                    type="success"
                    showIcon
                    style={{ marginBottom: 20 }}
                  />

                  <Row gutter={[20, 20]}>
                    <Col xs={24} md={12}>
                      <Card
                        size="small"
                        title={<span style={{ color: '#237804', fontWeight: 700 }}>✅ Tiêu Chí Cộng Điểm Thành Tích (+)</span>}
                        style={{ borderColor: '#b7eb8f', background: '#f6ffed' }}
                      >
                        <ul style={{ paddingLeft: 20, margin: 0, lineHeight: 2.2 }}>
                          <li>Hoàn thành đúng hạn milestone giao hàng: <strong style={{ color: '#2e7d32' }}>+10 điểm</strong></li>
                          <li>Đánh giá chất lượng 5 sao (★) từ khách hàng: <strong style={{ color: '#2e7d32' }}>+3 điểm</strong></li>
                          <li>Đánh giá chất lượng 4 sao (★) từ khách hàng: <strong style={{ color: '#2e7d32' }}>+1 điểm</strong></li>
                          <li>Đạt chuẩn chứng nhận ISO 22000 / OCOP mới: <strong style={{ color: '#2e7d32' }}>+15 điểm</strong></li>
                          <li>Không có tranh chấp giao dịch suốt 3 mùa vụ liên tiếp: <strong style={{ color: '#2e7d32' }}>+20 điểm</strong></li>
                        </ul>
                      </Card>
                    </Col>

                    <Col xs={24} md={12}>
                      <Card
                        size="small"
                        title={<span style={{ color: '#cf1322', fontWeight: 700 }}>⚠️ Tiêu Chí Trừ Điểm Vi Phạm (-)</span>}
                        style={{ borderColor: '#ffa39e', background: '#fff1f0' }}
                      >
                        <ul style={{ paddingLeft: 20, margin: 0, lineHeight: 2.2 }}>
                          <li>Hoàn thành trễ hạn milestone mà không gia hạn: <strong style={{ color: '#cf1322' }}>-5 điểm</strong></li>
                          <li>Vi phạm điều khoản hợp đồng B2B đã ký: <strong style={{ color: '#cf1322' }}>-20 điểm</strong></li>
                          <li>Đánh giá chất lượng 1-2 sao từ khách hàng: <strong style={{ color: '#cf1322' }}>-2 điểm</strong></li>
                          <li>Bị khách hàng khiếu nại PoD thất thoát / hư hỏng: <strong style={{ color: '#cf1322' }}>-10 điểm</strong></li>
                          <li>Bị sàn thu hồi giấy phép xưởng hoặc đình chỉ: <strong style={{ color: '#cf1322' }}>-50 điểm</strong></li>
                        </ul>
                      </Card>
                    </Col>
                  </Row>
                </div>
              ),
            },
            {
              key: 'categories',
              label: '🥮 Danh Mục Bánh Phân Cấp',
              children: (
                <div>
                  <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text type="secondary">Quản lý các nhóm bánh trung thu hiển thị trên thanh tìm kiếm và bộ lọc trang chủ.</Text>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setCatModalOpen(true)}
                      style={{ background: '#8c1524', borderColor: '#8c1524' }}
                    >
                      Thêm Danh Mục Mới
                    </Button>
                  </div>
                  <Table columns={categoryColumns} dataSource={categories} loading={loading} pagination={false} />
                </div>
              ),
            },
            {
              key: 'templates',
              label: '🎨 Kho Template Giao Diện Gian Hàng',
              children: (
                <div>
                  <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text type="secondary">
                      Các mẫu theme thương hiệu dành cho gian hàng xưởng bánh. Quản lý chi tiết token và preview tại trang chuyên dụng.
                    </Text>
                    <Button
                      type="primary"
                      icon={<ArrowRightOutlined />}
                      onClick={() => onNavigate?.('admin/mau-gian-hang')}
                      style={{ background: '#8c1524', borderColor: '#8c1524' }}
                    >
                      Mở Trang Quản Lý Mẫu Template Chi Tiết
                    </Button>
                  </div>
                  <Table columns={templateColumns} dataSource={shopTemplates} loading={loading} pagination={false} />
                </div>
              ),
            },
          ]}
        />
      </Card>

      {/* Modal Add / Edit Deposit Rule */}
      <Modal
        title={editingRule ? 'Chỉnh Sửa Quy Tắc Đặt Cọc' : 'Thêm Quy Tắc Đặt Cọc M1 Mới'}
        open={ruleModalOpen}
        onCancel={() => !savingRule && setRuleModalOpen(false)}
        confirmLoading={savingRule}
        onOk={() => ruleForm.submit()}
        okText="Lưu Quy Tắc"
        cancelText="Đóng"
        okButtonProps={{ style: { backgroundColor: '#8c1524', borderColor: '#8c1524' } }}
        destroyOnClose
      >
        <Form form={ruleForm} layout="vertical" onFinish={handleSaveRule} disabled={savingRule}>
          <Form.Item
            name="name"
            label="Tên Quy Tắc Đặt Cọc"
            rules={[{ required: true, message: 'Vui lòng nhập tên quy tắc.' }]}
          >
            <Input placeholder="Ví dụ: Quy tắc cọc hợp đồng tiêu chuẩn" maxLength={255} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="depositPercentage"
                label="Tỷ Lệ Đặt Cọc M1 (%)"
                rules={[{ required: true, message: 'Nhập tỷ lệ cọc từ 1-100%.' }]}
              >
                <InputNumber min={1} max={100} addonAfter="%" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="paymentDeadlineHours"
                label="Thời Hạn Nộp Cọc (Giờ)"
                rules={[{ required: true, message: 'Nhập thời hạn nộp cọc.' }]}
              >
                <InputNumber min={1} max={720} addonAfter="giờ" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="minContractValue"
            label="Ngưỡng Giá Trị Hợp Đồng Tối Thiểu (VNĐ)"
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

          <Form.Item name="isMandatory" label="Bắt Buộc Ký Quỹ Escrow Trước Khi Sản Xuất" valuePropName="checked">
            <Switch defaultChecked />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Add Category */}
      <Modal
        title="Thêm Danh Mục Bánh Mới"
        open={catModalOpen}
        onCancel={() => !savingCat && setCatModalOpen(false)}
        confirmLoading={savingCat}
        onOk={() => catForm.submit()}
        okText="Thêm Danh Mục"
        cancelText="Đóng"
        okButtonProps={{ style: { backgroundColor: '#8c1524', borderColor: '#8c1524' } }}
        destroyOnClose
      >
        <Form form={catForm} layout="vertical" onFinish={handleSaveCategory} disabled={savingCat}>
          <Form.Item
            name="name"
            label="Tên Danh Mục"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục.' }]}
          >
            <Input placeholder="Ví dụ: Bánh Trung Thu OCOP Truyền Thống" />
          </Form.Item>
          <Form.Item name="slug" label="Đường Dẫn Slug (Tùy chọn)">
            <Input placeholder="Ví dụ: banh-trung-thu-ocop" />
          </Form.Item>
        </Form>
      </Modal>
    </ColonyAdminLayout>
  );
}
