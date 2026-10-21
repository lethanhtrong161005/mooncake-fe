import { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Tag,
  Space,
  Input,
  Modal,
  Form,
  Select,
  InputNumber,
  Switch,
  Tabs,
  message,
  Typography,
  Alert,
  Divider,
} from 'antd';
import {
  AppstoreOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PercentageOutlined,
  TagOutlined,
} from '@ant-design/icons';
import ColonyAdminLayout from '../../components/layout/ColonyAdminLayout';

const { Text } = Typography;
const { TextArea } = Input;

export default function ProductManage({ onNavigate }) {
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm] = Form.useForm();

  // Products with Variants Mock Data
  const [products, setProducts] = useState([
    {
      key: '1',
      id: 'PRD-001',
      name: 'Bánh Nướng Thập Cẩm Bát Bửu Thượng Hạng',
      category: 'Bánh Nướng Truyền Thống',
      basePrice: 85000,
      minOrderQty: 50,
      supportsCustomPackaging: true,
      status: 'active',
      variantsCount: 3,
      variants: [
        { sku: 'SKU-TC-150', flavor: 'Thập Cẩm Bát Bửu', crust: 'Vỏ Nướng', weight: 150, priceAdj: 0, stock: 1200 },
        { sku: 'SKU-TC-200', flavor: 'Thập Cẩm Bát Bửu 2 Trứng', crust: 'Vỏ Nướng', weight: 200, priceAdj: 25000, stock: 800 },
        { sku: 'SKU-TC-250', flavor: 'Thập Cẩm Vi Cá', crust: 'Vỏ Nướng', weight: 250, priceAdj: 45000, stock: 500 },
      ],
      tieredPricing: [
        { minQty: 50, maxQty: 99, discount: '5%' },
        { minQty: 100, maxQty: 499, discount: '10%' },
        { minQty: 500, maxQty: 9999, discount: '18%' },
      ],
    },
    {
      key: '2',
      id: 'PRD-002',
      name: 'Bánh Dẻo Hạt Sen Hạt Dưa Hương Hoa Bưởi',
      category: 'Bánh Dẻo Cổ Truyền',
      basePrice: 75000,
      minOrderQty: 50,
      supportsCustomPackaging: true,
      status: 'active',
      variantsCount: 2,
      variants: [
        { sku: 'SKU-DS-150', flavor: 'Hạt Sen Hạt Dưa', crust: 'Vỏ Dẻo Trắng', weight: 150, priceAdj: 0, stock: 900 },
        { sku: 'SKU-DS-200', flavor: 'Hạt Sen Trứng Muối', crust: 'Vỏ Dẻo Cốm', weight: 200, priceAdj: 20000, stock: 650 },
      ],
      tieredPricing: [
        { minQty: 50, maxQty: 99, discount: '5%' },
        { minQty: 100, maxQty: 499, discount: '12%' },
        { minQty: 500, maxQty: 9999, discount: '20%' },
      ],
    },
    {
      key: '3',
      id: 'PRD-003',
      name: 'Hộp Quà Sơn Mài Doanh Nghiệp VIP (4 Bánh + Trà Ô Long)',
      category: 'Hộp Quà Doanh Nghiệp',
      basePrice: 650000,
      minOrderQty: 20,
      supportsCustomPackaging: true,
      status: 'active',
      variantsCount: 2,
      variants: [
        { sku: 'SKU-BOX-VIP4', flavor: 'Set 4 Bánh VIP + Trà', crust: 'Hộp Sơn Mài Đỏ', weight: 800, priceAdj: 0, stock: 300 },
        { sku: 'SKU-BOX-VIP6', flavor: 'Set 6 Bánh VIP + Rượu Vang', crust: 'Hộp Sơn Mài Vàng Kim', weight: 1200, priceAdj: 350000, stock: 150 },
      ],
      tieredPricing: [
        { minQty: 20, maxQty: 49, discount: '8%' },
        { minQty: 50, maxQty: 199, discount: '15%' },
        { minQty: 200, maxQty: 9999, discount: '25%' },
      ],
    },
  ]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    productForm.resetFields();
    setProductModalOpen(true);
  };

  const handleSaveProduct = (values) => {
    const newProduct = {
      key: `${Date.now()}`,
      id: `PRD-${Math.floor(100 + Math.random() * 900)}`,
      name: values.name,
      category: values.category,
      basePrice: values.basePrice,
      minOrderQty: values.minOrderQty,
      supportsCustomPackaging: values.supportsCustomPackaging,
      status: 'active',
      variantsCount: 1,
      variants: [
        {
          sku: `SKU-${Date.now().toString().slice(-4)}`,
          flavor: values.variantFlavor || 'Nguyên bản',
          crust: values.variantCrust || 'Vỏ nướng',
          weight: values.variantWeight || 150,
          priceAdj: 0,
          stock: values.variantStock || 500,
        },
      ],
      tieredPricing: [
        { minQty: values.minOrderQty, maxQty: values.minOrderQty * 2, discount: '5%' },
        { minQty: values.minOrderQty * 2 + 1, maxQty: 9999, discount: '12%' },
      ],
    };

    setProducts((prev) => [newProduct, ...prev]);
    message.success(`Đã thêm sản phẩm "${values.name}" kèm biến thể thành công!`);
    setProductModalOpen(false);
  };

  const columns = [
    {
      title: 'Mã SP',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (id) => <span style={{ fontWeight: 600, color: '#1677ff' }}>{id}</span>,
    },
    {
      title: 'Tên Sản Phẩm & Danh Mục',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1f1f1f' }}>{text}</div>
          <div style={{ fontSize: 12, color: '#888' }}>Danh mục: {record.category}</div>
        </div>
      ),
    },
    {
      title: 'Giá Cơ Bản',
      dataIndex: 'basePrice',
      key: 'basePrice',
      align: 'right',
      render: (p) => <span style={{ fontWeight: 600, color: '#8c1524' }}>{p.toLocaleString('vi-VN')} ₫</span>,
    },
    {
      title: 'Số Lượng Đặt Tối Thiểu (Min Qty)',
      dataIndex: 'minOrderQty',
      key: 'minOrderQty',
      align: 'center',
      render: (qty) => <Tag color="blue">≥ {qty} cái/hộp</Tag>,
    },
    {
      title: 'Số Biến Thể',
      dataIndex: 'variantsCount',
      key: 'variantsCount',
      align: 'center',
      render: (cnt) => <Tag color="purple">{cnt} biến thể</Tag>,
    },
    {
      title: 'In Logo Doanh Nghiệp',
      dataIndex: 'supportsCustomPackaging',
      key: 'supportsCustomPackaging',
      align: 'center',
      render: (supports) =>
        supports ? <Tag color="green">✓ Có hỗ trợ</Tag> : <Tag color="default">Không</Tag>,
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) =>
        status === 'active' ? <Tag color="success">Đang bán</Tag> : <Tag color="default">Tạm dừng</Tag>,
    },
  ];

  return (
    <ColonyAdminLayout
      role="Supplier"
      activeKey="nha-cung-cap/quan-ly-san-pham"
      onNavigate={onNavigate}
      title="Quản Lý Sản Phẩm, Biến Thể & Chiết Khấu Bậc Thang"
      subtitle="Thiết lập danh mục bánh, quản lý SKU biến thể độc lập và cấu hình bảng giá sỉ B2B"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenAdd}
          style={{ background: '#8c1524', borderColor: '#8c1524' }}
        >
          Thêm Sản Phẩm Mới
        </Button>
      }
    >
      <Alert
        message="Quy tắc bắt buộc Biến thể (Product Variants Rule)"
        description="Mỗi sản phẩm B2B bắt buộc có ít nhất 1 biến thể (nhân, vỏ, trọng lượng, hộp quà) với SKU độc lập. Khi khách hàng B2B đặt hàng hoặc yêu cầu RFQ, họ sẽ chọn trực tiếp từng biến thể cụ thể."
        type="info"
        showIcon
        style={{ marginBottom: 20 }}
      />

      <Card bordered={false} style={{ borderRadius: 10 }}>
        <Table
          columns={columns}
          dataSource={products}
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ background: '#fafafa', padding: 16, borderRadius: 8 }}>
                <Row gutter={24}>
                  <Col span={14}>
                    <Text strong style={{ display: 'block', marginBottom: 8, color: '#8c1524' }}>
                      📋 Danh Sách Biến Thể Độc Lập (SKU Variants):
                    </Text>
                    <Table
                      size="small"
                      pagination={false}
                      dataSource={record.variants.map((v, i) => ({ ...v, key: i }))}
                      columns={[
                        { title: 'SKU', dataIndex: 'sku', key: 'sku' },
                        { title: 'Nhân Bánh', dataIndex: 'flavor', key: 'flavor' },
                        { title: 'Vỏ Bánh', dataIndex: 'crust', key: 'crust' },
                        { title: 'Trọng Lượng', dataIndex: 'weight', key: 'weight', render: (w) => `${w}g` },
                        {
                          title: 'Điều Chỉnh Giá',
                          dataIndex: 'priceAdj',
                          key: 'priceAdj',
                          render: (adj) => (adj > 0 ? `+${adj.toLocaleString('vi-VN')} ₫` : '0 ₫'),
                        },
                        { title: 'Tồn Kho', dataIndex: 'stock', key: 'stock' },
                      ]}
                    />
                  </Col>
                  <Col span={10}>
                    <Text strong style={{ display: 'block', marginBottom: 8, color: '#d48806' }}>
                      🏷️ Bảng Giá Chiết Khấu Bậc Thang (Tiered Pricing):
                    </Text>
                    <Table
                      size="small"
                      pagination={false}
                      dataSource={record.tieredPricing.map((t, i) => ({ ...t, key: i }))}
                      columns={[
                        {
                          title: 'Khoảng Số Lượng',
                          key: 'range',
                          render: (_, t) => `${t.minQty} - ${t.maxQty >= 9999 ? 'Trở lên' : t.maxQty} hộp`,
                        },
                        {
                          title: 'Chiết Khấu',
                          dataIndex: 'discount',
                          key: 'discount',
                          render: (d) => <Tag color="gold" style={{ fontWeight: 700 }}>Giảm {d}</Tag>,
                        },
                      ]}
                    />
                  </Col>
                </Row>
              </div>
            ),
          }}
        />
      </Card>

      {/* Modal Add Product & Variant */}
      <Modal
        title="Thêm Sản Phẩm B2B & Thiết Lập Biến Thể Ban Đầu"
        open={productModalOpen}
        onCancel={() => setProductModalOpen(false)}
        onOk={() => productForm.submit()}
        okText="Tạo Sản Phẩm & Biến Thể"
        width={720}
      >
        <Form
          form={productForm}
          layout="vertical"
          initialValues={{
            category: 'Bánh Nướng Truyền Thống',
            basePrice: 85000,
            minOrderQty: 50,
            variantWeight: 150,
            variantStock: 1000,
            supportsCustomPackaging: true,
          }}
          onFinish={handleSaveProduct}
        >
          <Form.Item name="name" label="Tên Sản Phẩm Bánh" rules={[{ required: true }]}>
            <Input placeholder="VD: Bánh Nướng Thập Cẩm Gà Quay Xốt X.O" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="category" label="Danh Mục Bánh" rules={[{ required: true }]}>
                <Select
                  options={[
                    { value: 'Bánh Nướng Truyền Thống', label: 'Bánh Nướng Truyền Thống' },
                    { value: 'Bánh Dẻo Cổ Truyền', label: 'Bánh Dẻo Cổ Truyền' },
                    { value: 'Bánh Tuyết Hiện Đại', label: 'Bánh Tuyết Hiện Đại' },
                    { value: 'Hộp Quà Doanh Nghiệp', label: 'Hộp Quà Doanh Nghiệp' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="basePrice" label="Giá Cơ Bản (VNĐ)" rules={[{ required: true }]}>
                <InputNumber min={10000} step={5000} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="minOrderQty" label="Số Lượng Min (B2B)" rules={[{ required: true }]}>
                <InputNumber min={10} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Divider style={{ margin: '12px 0' }}>Biến Thể Mặc Định Đầu Tiên (Variant #1)</Divider>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="variantFlavor" label="Nhân Bánh" rules={[{ required: true }]}>
                <Input placeholder="VD: Thập Cẩm Vi Cá" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="variantCrust" label="Loại Vỏ Bánh" rules={[{ required: true }]}>
                <Input placeholder="VD: Vỏ Nướng Vàng" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="variantWeight" label="Trọng Lượng (g)">
                <InputNumber min={50} max={500} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="variantStock" label="Tồn Kho (cái)">
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="supportsCustomPackaging"
            label="Hỗ Trợ In Logo Doanh Nghiệp Lên Hộp Quà (Custom Packaging)"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </ColonyAdminLayout>
  );
}
