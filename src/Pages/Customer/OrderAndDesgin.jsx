import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Empty,
  Form,
  Image,
  Input,
  InputNumber,
  List,
  Modal,
  Radio,
  Result,
  Row,
  Space,
  Spin,
  Switch,
  Tabs,
  Tag,
  Tooltip,
  Typography,
  Upload,
  message,
} from 'antd';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloudUploadOutlined,
  CreditCardOutlined,
  CrownOutlined,
  DeleteOutlined,
  EyeOutlined,
  FileTextOutlined,
  GiftOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  PictureOutlined,
  PrinterOutlined,
  ReloadOutlined,
  SafetyCertificateFilled,
  SafetyCertificateOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  SyncOutlined,
  ThunderboltFilled,
  TruckOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import CustomerFooter from '../../components/layout/CustomerFooter';
import useBulkOrderQuote from '../../hooks/useBulkOrderQuote';
import customPackagingService from '../../services/customPackagingService';
import orderService from '../../services/orderService';
import productService from '../../services/productService';
import PaymentCheckoutModal from '../../components/payment/PaymentCheckoutModal';
import VietQrModal from '../../components/payment/VietQrModal';
import packagingTemplateService from '../../services/packagingTemplateService';
import LiveBoxPreviewStudio from '../../components/packaging/LiveBoxPreviewStudio';
import GoogleMapAddressPicker from '../../components/common/GoogleMapAddressPicker';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const money = (value) => `${Number(value || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) => error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.';

const COLOR_PRESETS = [
  { label: 'Đỏ Ruby & Vàng Kim', primary: '#8c1524', secondary: '#d48806' },
  { label: 'Xanh Cổ Điển & Vàng Nhạt', primary: '#1e3a5f', secondary: '#d4af37' },
  { label: 'Xanh Ngọc Lục & Vàng Đồng', primary: '#0f4c3a', secondary: '#c5a059' },
  { label: 'Huyền Bí Đen & Vàng Hoàng Gia', primary: '#1a1a1a', secondary: '#f1c40f' },
];

const ORDER_STATUS_MAP = {
  Pending: { label: 'Chờ duyệt', color: 'gold' },
  Confirmed: { label: 'Đã xác nhận · Cần thanh toán', color: 'blue' },
  Processing: { label: 'Đang sản xuất', color: 'processing' },
  Shipped: { label: 'Đang vận chuyển PoD', color: 'cyan' },
  Delivered: { label: 'Đã giao hàng', color: 'green' },
  Completed: { label: 'Hoàn tất', color: 'success' },
  Cancelled: { label: 'Đã hủy', color: 'default' },
};

export default function OrderAndDesgin({ onNavigate }) {
  const [form] = Form.useForm();
  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [packagingEnabled, setPackagingEnabled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [reviewingOrder, setReviewingOrder] = useState(null);
  const [packaging, setPackaging] = useState(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [payingOrder, setPayingOrder] = useState(null);
  const [vietQrData, setVietQrData] = useState(null);
  const [activeTab, setActiveTab] = useState('create');
  const [packagingTemplates, setPackagingTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const idempotencyKey = useRef(crypto.randomUUID());

  const variantId = Form.useWatch('variantId', form);
  const quantity = Form.useWatch('quantity', form);
  const companyName = Form.useWatch('companyName', form);
  const companyLogoUrl = Form.useWatch('companyLogoUrl', form);
  const primaryColor = Form.useWatch('primaryColor', form);
  const secondaryColor = Form.useWatch('secondaryColor', form);
  const specialMessage = Form.useWatch('specialMessage', form);
  const packagingType = Form.useWatch('packagingType', form);

  useEffect(() => {
    let draft = null;
    try {
      draft = JSON.parse(sessionStorage.getItem('b2b_order_draft') || 'null');
    } catch {
      draft = null;
    }

    const hash = window.location.hash || '';
    const hashParts = hash.replace(/^#\/?/, '').split(/[\/?]/);
    const urlProductId =
      new URLSearchParams(window.location.search).get('productId') ||
      new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '').get('productId') ||
      (hashParts[0] === 'dat-hang-thiet-ke' && hashParts[1] && hashParts[1].length > 10 ? hashParts[1] : null);

    const draftProductId = draft?.productId || draft?.id || urlProductId;

    setLoadingProduct(true);
    const fetchTarget = draftProductId
      ? productService.detail(draftProductId).catch(() => {
          return productService.search({ pageSize: 1 }).then((res) => {
            const items = Array.isArray(res) ? res : (res?.items || res?.data || []);
            if (items.length > 0) {
              const firstId = items[0].id || items[0].productId;
              return productService.detail(firstId);
            }
            return null;
          });
        })
      : productService.search({ pageSize: 1 }).then((res) => {
          const items = Array.isArray(res) ? res : (res?.items || res?.data || []);
          if (items.length > 0) {
            const firstId = items[0].id || items[0].productId;
            return productService.detail(firstId);
          }
          return null;
        });

    fetchTarget
      .then((result) => {
        if (!result) {
          setProduct(null);
          return;
        }
        setProduct(result);
        const resolvedVariantId =
          draft?.variantId ||
          result.variants?.find((item) => item.isAvailable)?.id ||
          result.variants?.[0]?.id;
        const resolvedQty = Math.max(
          result.minOrderQty || 1,
          draft?.quantity || result.minOrderQty || 20
        );

        form.setFieldsValue({
          variantId: resolvedVariantId,
          quantity: resolvedQty,
        });
        setPackagingEnabled(Boolean(result.supportsCustomPackaging));

        // Load packaging templates managed by the supplier from API
        const shopId = result.shop?.shopId || result.shop?.id;
        if (shopId) {
          packagingTemplateService.getByShop(shopId).then((tpls) => {
            if (Array.isArray(tpls) && tpls.length > 0) {
              setPackagingTemplates(tpls);
              const matched = tpls.find((t) => t.name === form.getFieldValue('packagingType')) || tpls[0];
              setSelectedTemplate(matched);
              if (!form.getFieldValue('packagingType')) {
                form.setFieldValue('packagingType', matched.name);
              }
            } else {
              setPackagingTemplates([]);
              setSelectedTemplate(null);
            }
          }).catch(() => {
            setPackagingTemplates([]);
            setSelectedTemplate(null);
          });
        } else {
          setPackagingTemplates([]);
          setSelectedTemplate(null);
        }
      })
      .catch((error) => message.error(errorMessage(error)))
      .finally(() => setLoadingProduct(false));
  }, [form]);

  const minQty = Math.max(1, Number(product?.minOrderQty ?? 1));
  const maxQty = product?.maxOrderQty ? Math.max(minQty, Number(product.maxOrderQty)) : null;

  const quickQuantityOptions = useMemo(() => {
    if (!product) return [];
    const list = [20, 50, 100, 200, 500, 1000];
    const candidateSet = new Set();
    candidateSet.add(minQty);
    list.forEach((val) => {
      if (val >= minQty && (!maxQty || val <= maxQty)) {
        candidateSet.add(val);
      }
    });
    if (maxQty && maxQty >= minQty) {
      candidateSet.add(maxQty);
    }
    return Array.from(candidateSet).sort((a, b) => a - b).slice(0, 5);
  }, [product, minQty, maxQty]);

  const targetShopId = product?.shop?.shopId || product?.shop?.id;
  const targetProductId = product?.productId || product?.id;

  const selectedVariant = useMemo(
    () => product?.variants?.find((variant) => variant.id === variantId) || product?.variants?.[0],
    [product, variantId]
  );

  const { quote, loading: quoteLoading, error: quoteError } = useBulkOrderQuote(
    targetShopId,
    targetProductId,
    variantId || selectedVariant?.id,
    quantity || minQty
  );

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      setOrders(await orderService.listMine());
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleUploadLogoFile = async (file) => {
    if (!file) return false;
    const isImage = file.type?.startsWith('image/') || file.name?.endsWith('.svg');
    if (!isImage) {
      message.error('Vui lòng chọn tệp hình ảnh (PNG, SVG, JPG, WEBP).');
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      message.error('Kích thước logo không được vượt quá 10MB.');
      return false;
    }
    setUploadingLogo(true);
    try {
      const res = await customPackagingService.uploadLogo(file);
      const url = res?.url || res?.data?.url || res?.secureUrl;
      if (url) {
        form.setFieldValue('companyLogoUrl', url);
        message.success('Đã tải ảnh logo lên Cloudinary thành công!');
      } else {
        message.error('Không nhận được URL từ máy chủ.');
      }
    } catch (err) {
      message.error(errorMessage(err));
    } finally {
      setUploadingLogo(false);
    }
    return false;
  };

  const submitOrder = async (values) => {
    if (!targetShopId || !targetProductId) {
      message.error('Thiếu thông tin nhà cung cấp hoặc sản phẩm.');
      return;
    }
    setSubmitting(true);
    try {
      // Build full custom packaging payload from form values
      const customPackagingPayload = {
        companyName: values.companyName || 'Doanh Nghiệp Đặt Hàng',
        companyLogoUrl: values.companyLogoUrl || '',
        packagingType: values.packagingType || selectedTemplate?.name || 'Hộp Quà Doanh Nghiệp',
        colorScheme: JSON.stringify({
          primary: values.primaryColor || '#8c1524',
          secondary: values.secondaryColor || '#d48806',
        }),
        specialMessage: values.specialMessage || null,
        notes: values.packagingNotes || null,
      };

      // Also construct structured notes with full packaging specifications
      const fullNotes = [
        values.notes ? `Ghi chú giao nhận: ${values.notes}` : null,
        `[Thông Tin Thiết Kế Bao Bì & In Logo]:
- Đơn vị: ${customPackagingPayload.companyName}
- Mẫu hộp: ${customPackagingPayload.packagingType}
- Logo: ${customPackagingPayload.companyLogoUrl || '(Chưa có link)'}
- Màu nhận diện: ${values.primaryColor || '#8c1524'} (chính) / ${values.secondaryColor || '#d48806'} (phụ)
- Thông điệp nắp hộp: ${customPackagingPayload.specialMessage || '(Không)'}
- Yêu cầu gia công: ${customPackagingPayload.notes || '(Không)'}`,
      ].filter(Boolean).join('\n\n');

      const createOrderPayload = {
        shopId: targetShopId,
        items: [{ productId: targetProductId, variantId: values.variantId, quantity: values.quantity }],
        deliveryAddress: values.deliveryAddress,
        recipientName: values.recipientName,
        recipientPhone: values.recipientPhone,
        deliveryDateExpected: values.deliveryDateExpected || null,
        notes: fullNotes,
        customPackaging: customPackagingPayload,
      };

      const order = await orderService.create(createOrderPayload, idempotencyKey.current);

      message.success(`Đã tạo đơn hàng #${order.orderNumber} thành công! Xưởng sẽ phản hồi trong 2h.`);
      idempotencyKey.current = crypto.randomUUID();
      setActiveTab('mine');
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const openPackaging = async (order) => {
    setReviewingOrder(order);
    setPackaging(null);
    setReviewLoading(true);
    try {
      setPackaging(await customPackagingService.get(order.id));
    } catch (error) {
      message.info(error?.response?.status === 404 ? 'Đơn hàng không có yêu cầu bao bì riêng.' : errorMessage(error));
      setReviewingOrder(null);
    } finally {
      setReviewLoading(false);
    }
  };

  const reviewRevision = async (action) => {
    const revision = packaging?.revisions?.find((item) => item.status === 'DesignReview');
    if (!revision) return;
    if (action === 'RequestRevision' && reviewNotes.trim().length < 10) {
      message.warning('Vui lòng mô tả nội dung cần chỉnh sửa ít nhất 10 ký tự.');
      return;
    }
    setReviewLoading(true);
    try {
      await customPackagingService.reviewRevision(reviewingOrder.id, revision.id, {
        action,
        notes: reviewNotes.trim() || null,
      });
      message.success(action === 'Approve' ? 'Đã duyệt mockup bao bì thành công.' : 'Đã gửi yêu cầu chỉnh sửa.');
      setPackaging(await customPackagingService.get(reviewingOrder.id));
      setReviewNotes('');
      await loadOrders();
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setReviewLoading(false);
    }
  };

  // 1. Create Tab UI
  const createTab = loadingProduct ? (
    <div className="py-24 text-center bg-white rounded-2xl border border-stone-200">
      <Spin size="large" tip="Đang kết nối dữ liệu sản phẩm..." />
    </div>
  ) : !product ? (
    <div className="bg-white rounded-2xl p-12 text-center border border-stone-200/80 shadow-xs max-w-2xl mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#8c1524] flex items-center justify-center text-3xl mx-auto mb-4 border border-amber-200/60">
        <ShoppingCartOutlined />
      </div>
      <h3 className="font-['Playfair_Display',serif] text-xl sm:text-2xl font-bold text-stone-900 mb-2">
        Chưa Có Sản Phẩm Trong Đơn Nháp
      </h3>
      <p className="text-sm text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">
        Quý khách vui lòng chọn sản phẩm và quy cách bánh từ bộ sưu tập mùa vụ 2025 để bắt đầu quy trình đặt hàng B2B.
      </p>
      <Button
        type="primary"
        size="large"
        icon={<ArrowRightOutlined />}
        onClick={() => onNavigate?.('tim-kiem')}
        style={{
          background: '#8c1524',
          borderColor: '#8c1524',
          height: 46,
          borderRadius: 10,
          fontWeight: 700,
        }}
      >
        Khám phá bộ sưu tập bánh Trung Thu
      </Button>
    </div>
  ) : (
    <Form
      form={form}
      layout="vertical"
      onFinish={submitOrder}
      initialValues={{
        packagingType: 'Hộp Sơn Mài Thượng Hạng',
        primaryColor: '#8c1524',
        secondaryColor: '#d48806',
      }}
    >
      <Row gutter={[24, 24]}>
        {/* Left Column: Form Configuration */}
        <Col xs={24} lg={15}>
          <div className="flex flex-col gap-5">
            {/* 1. Product Summary & Variant Picker */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3.5">
                  <img
                    src={product.images?.[0]?.imageUrl || '/hero_mooncake_bg.jpg'}
                    alt={product.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-0.5">
                      <span>{product.shop?.name || 'Xưởng Nghệ Nhân'}</span>
                      {product.shop?.isVerified && (
                        <SafetyCertificateFilled className="text-amber-600 text-xs" />
                      )}
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-stone-900 line-clamp-1 m-0">
                      {product.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <Tag color="gold" className="m-0 text-[11px] font-semibold">
                        Tối thiểu: {minQty} {product.unit}
                      </Tag>
                      {maxQty && (
                        <Tag color="cyan" className="m-0 text-[11px] font-semibold">
                          Tối đa: {maxQty} {product.unit}
                        </Tag>
                      )}
                      <Tag color="green" className="m-0 text-[11px]">
                        100% VAT Điện Tử
                      </Tag>
                    </div>
                  </div>
                </div>

                <Button
                  type="link"
                  size="small"
                  onClick={() => onNavigate?.('tim-kiem')}
                  className="text-stone-500 hover:text-[#8c1524] text-xs p-0 font-medium"
                >
                  Đổi sản phẩm
                </Button>
              </div>

              {/* Variant Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-xs sm:text-sm font-bold text-stone-900">
                      1. Chọn Biến Thể / Hương Vị Bánh:
                    </label>
                    <span className="text-xs text-stone-500">
                      {product.variants.length} tùy chọn
                    </span>
                  </div>

                  <Form.Item
                    name="variantId"
                    rules={[{ required: true, message: 'Vui lòng chọn một biến thể bánh.' }]}
                    className="mb-0"
                  >
                    <Radio.Group className="w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {product.variants.map((v) => {
                          const isSelected = v.id === variantId;
                          return (
                            <div
                              key={v.id}
                              onClick={() => v.isAvailable && form.setFieldValue('variantId', v.id)}
                              className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between ${
                                !v.isAvailable
                                  ? 'opacity-50 cursor-not-allowed bg-stone-50 border-stone-200'
                                  : isSelected
                                  ? 'border-[#8c1524] bg-red-50/30 ring-1 ring-[#8c1524] cursor-pointer'
                                  : 'border-stone-200 bg-white hover:border-stone-400 cursor-pointer'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <Radio value={v.id} disabled={!v.isAvailable} className="font-semibold text-xs sm:text-sm text-stone-900">
                                  {v.name}
                                </Radio>
                                <Tag className="m-0 text-[10px] text-stone-500">
                                  SKU: {v.sku || 'VIP'}
                                </Tag>
                              </div>
                              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-stone-100 text-xs">
                                <span className="font-bold text-[#8c1524]">
                                  {money(v.price)}
                                </span>
                                {!v.isAvailable ? (
                                  <span className="text-stone-400">Tạm hết</span>
                                ) : (
                                  <span className="text-emerald-700 font-medium">Sẵn sàng xuất xưởng</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Radio.Group>
                  </Form.Item>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mt-5 pt-4 border-t border-stone-100">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div>
                    <label className="text-xs sm:text-sm font-bold text-stone-900 block">
                      2. Số Lượng Đặt Hàng ({product.unit || 'hộp'}):
                    </label>
                    <span className="text-xs text-stone-500">
                      Áp dụng biểu phí chiết khấu bậc thang theo số lượng
                    </span>
                  </div>

                  <Form.Item
                    name="quantity"
                    rules={[{ required: true, message: 'Vui lòng nhập số lượng hợp lệ.' }]}
                    className="mb-0"
                  >
                    <InputNumber
                      min={minQty}
                      max={maxQty ?? 1000000}
                      precision={0}
                      step={1}
                      size="large"
                      style={{ width: 140 }}
                    />
                  </Form.Item>
                </div>

                {/* Quick quantity selector pills */}
                {quickQuantityOptions.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="text-xs text-stone-500">Mốc đặt nhanh:</span>
                    {quickQuantityOptions.map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => form.setFieldValue('quantity', num)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                          quantity === num
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {num} {product.unit || 'hộp'}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 2. Delivery Information */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
                <TruckOutlined className="text-[#8c1524] text-base" />
                <h3 className="text-sm sm:text-base font-bold text-stone-900 m-0">
                  Thông Tin Giao Nhận & Đại Diện Doanh Nghiệp
                </h3>
              </div>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="recipientName"
                    label={<span className="text-xs font-semibold text-stone-700">Người đại diện nhận hàng</span>}
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên người nhận.' }]}
                  >
                    <Input size="large" placeholder="Nguyễn Văn A" style={{ borderRadius: 10 }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="recipientPhone"
                    label={<span className="text-xs font-semibold text-stone-700">Số điện thoại liên hệ</span>}
                    rules={[
                      { required: true, message: 'Vui lòng nhập số điện thoại.' },
                      { pattern: /^[0-9+\s-]{9,15}$/, message: 'Số điện thoại không hợp lệ.' },
                    ]}
                  >
                    <Input size="large" placeholder="0901 234 567" style={{ borderRadius: 10 }} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="deliveryAddress"
                label={<span className="text-xs font-semibold text-stone-700">Địa chỉ giao hàng (Trụ sở / Chi nhánh doanh nghiệp)</span>}
                rules={[{ required: true, message: 'Vui lòng nhập hoặc chọn địa chỉ nhận hàng từ Google Map.' }]}
              >
                <GoogleMapAddressPicker placeholder="Nhập số nhà, tên đường, tòa nhà hoặc bấm chọn trực tiếp từ Google Map..." />
              </Form.Item>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="deliveryDateExpected"
                    label={<span className="text-xs font-semibold text-stone-700">Ngày giao hàng dự kiến</span>}
                  >
                    <Input type="date" size="large" style={{ borderRadius: 10 }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <div className="h-full flex flex-col justify-center pt-1 pb-4">
                    <span className="text-xs font-semibold text-stone-500 mb-1">Phương thức vận chuyển</span>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 border border-stone-200/80 text-xs text-stone-700">
                      <TruckOutlined className="text-amber-700" />
                      <span>Xe lạnh chuyên dụng PoD phân bổ đa điểm</span>
                    </div>
                  </div>
                </Col>
              </Row>

              <Form.Item
                name="notes"
                label={<span className="text-xs font-semibold text-stone-700">Ghi chú giao nhận & Yêu cầu xuất hóa đơn VAT</span>}
                className="mb-0"
              >
                <TextArea
                  rows={3}
                  maxLength={2000}
                  showCount
                  placeholder="Ghi chú thời gian nhận hàng, phân chia các điểm giao, hoặc thông tin Mã số thuế xuất hóa đơn điện tử..."
                  style={{ borderRadius: 10 }}
                />
              </Form.Item>
            </div>

            {/* 3. Custom Packaging & Branding */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <CrownOutlined className="text-amber-600 text-base" />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 m-0">
                      Thiết Kế Bao Bì & In Logo Doanh Nghiệp
                    </h3>
                    <span className="text-xs text-stone-500">
                      Ép kim vàng 24K, khắc laser nắp gỗ, in thiệp thương hiệu riêng
                    </span>
                  </div>
                </div>

                <Switch
                  checked={packagingEnabled}
                  onChange={setPackagingEnabled}
                  disabled={!product.supportsCustomPackaging}
                />
              </div>

              {!product.supportsCustomPackaging ? (
                <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-center gap-2">
                  <InfoCircleOutlined className="text-stone-400" />
                  <span>Sản phẩm này phân phối theo quy cách hộp tiêu chuẩn của nghệ nhân, không hỗ trợ thiết kế bao bì riêng.</span>
                </div>
              ) : packagingEnabled ? (
                <div className="mt-4 space-y-4">
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="companyName"
                        label={<span className="text-xs font-semibold text-stone-700">Tên doanh nghiệp / Đơn vị đặt hàng</span>}
                        rules={[{ required: true, message: 'Vui lòng nhập tên công ty.' }]}
                      >
                        <Input size="large" placeholder="Công ty TNHH Tập đoàn Công Nghệ ABC" style={{ borderRadius: 10 }} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="packagingType"
                        label={<span className="text-xs font-semibold text-stone-700">Quy cách hộp quà tặng</span>}
                        rules={[{ required: true, message: 'Vui lòng chọn quy cách hộp.' }]}
                      >
                        <Input size="large" placeholder="Hộp Sơn Mài Thượng Hạng" style={{ borderRadius: 10 }} />
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Packaging Presets */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-stone-600 font-medium">Gợi ý mẫu hộp gia công tiêu biểu:</span>
                      {packagingTemplates.length > 0 && (
                        <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          Nhà cung cấp ({packagingTemplates.length} mẫu)
                        </span>
                      )}
                    </div>
                    {packagingTemplates.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {packagingTemplates.map((pkg) => {
                          const isSelected =
                            selectedTemplate?.id === pkg.id ||
                            selectedTemplate?.name === pkg.name ||
                            packagingType === pkg.name;
                          return (
                            <div
                              key={pkg.id || pkg.name}
                              onClick={() => {
                                setSelectedTemplate(pkg);
                                form.setFieldValue('packagingType', pkg.name);
                              }}
                              className={`p-3 rounded-xl border transition-all cursor-pointer text-left flex gap-3 relative ${
                                isSelected
                                  ? 'border-[#8c1524] bg-amber-50/50 shadow-md ring-2 ring-[#8c1524]/30'
                                  : 'border-stone-200 hover:border-amber-400 bg-white hover:bg-stone-50/70'
                              }`}
                            >
                              {/* Box Thumbnail Image */}
                              {pkg.sampleImageUrl ? (
                                <img
                                  src={pkg.sampleImageUrl}
                                  alt={pkg.name}
                                  className="w-16 h-16 rounded-lg object-cover shrink-0 border border-stone-200 shadow-2xs"
                                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                              ) : (
                                <div className="w-16 h-16 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 border border-stone-200 text-stone-400">
                                  <GiftOutlined className="text-xl" />
                                </div>
                              )}

                              <div className="flex-1 min-w-0 flex flex-col justify-between">
                                <div>
                                  <div className="flex items-start justify-between gap-1">
                                    <span className={`text-xs font-bold leading-tight line-clamp-1 ${isSelected ? 'text-[#8c1524]' : 'text-stone-900'}`}>
                                      {pkg.name}
                                    </span>
                                    {isSelected && (
                                      <span className="w-4 h-4 rounded-full bg-[#8c1524] text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                                        ✓
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[11px] text-stone-500 block mt-0.5 line-clamp-1">
                                    {pkg.material || pkg.description || 'Chất liệu cao cấp'}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between mt-1 pt-1 border-t border-stone-100 text-[11px]">
                                  <span className="text-[10px] text-amber-800 bg-amber-100/80 px-1.5 py-0.2 rounded font-medium">
                                    {pkg.capacity ? `${pkg.capacity} bánh` : '4 bánh'}
                                  </span>
                                  {pkg.basePrice > 0 ? (
                                    <span className="font-bold text-[#8c1524]">
                                      +{money(pkg.basePrice)}/hộp
                                    </span>
                                  ) : (
                                    <span className="text-emerald-700 font-medium">Miễn phí kèm bánh</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-xs text-stone-500 p-3 rounded-lg border border-dashed border-stone-200 bg-stone-50/50 text-center">
                        Nhà cung cấp chưa đăng ký mẫu hộp quà tặng riêng. Quý khách có thể tự nhập quy cách mong muốn bên trên.
                      </div>
                    )}
                  </div>

                  {/* Logo Upload & Preview Section */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-stone-700">
                        Logo doanh nghiệp (In ép kim 24K / Khắc laser)
                      </span>
                      <span className="text-[11px] text-stone-400">
                        PNG nền trong suốt, SVG, JPG (Tối đa 10MB)
                      </span>
                    </div>

                    <Upload.Dragger
                      name="logo"
                      accept="image/*,.svg"
                      multiple={false}
                      showUploadList={false}
                      beforeUpload={handleUploadLogoFile}
                      disabled={uploadingLogo}
                      className="bg-stone-50/70 hover:bg-amber-50/40 border-stone-200 hover:border-amber-500 rounded-xl transition-all"
                      style={{ padding: '16px 12px' }}
                    >
                      {uploadingLogo ? (
                        <div className="py-2 flex flex-col items-center gap-2">
                          <Spin size="default" />
                          <span className="text-xs font-semibold text-amber-800">
                            Đang tải logo lên Cloudinary...
                          </span>
                        </div>
                      ) : companyLogoUrl ? (
                        <div className="py-1 flex items-center justify-between gap-3 px-2">
                          <div className="flex items-center gap-3">
                            <img
                              src={companyLogoUrl}
                              alt="Uploaded logo"
                              className="w-14 h-14 object-contain bg-white rounded-lg p-1.5 border border-stone-200 shadow-2xs"
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                            <div className="text-left">
                              <span className="text-xs font-bold text-stone-900 block flex items-center gap-1">
                                <CheckCircleFilled className="text-emerald-600" /> Đã tải logo lên Cloudinary
                              </span>
                              <span className="text-[11px] text-stone-500 line-clamp-1 block max-w-xs mt-0.5">
                                {companyLogoUrl}
                              </span>
                            </div>
                          </div>
                          <Button
                            size="small"
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              form.setFieldValue('companyLogoUrl', '');
                            }}
                          >
                            Xóa
                          </Button>
                        </div>
                      ) : (
                        <div className="py-2 flex flex-col items-center gap-1.5">
                          <CloudUploadOutlined className="text-2xl text-amber-700" />
                          <span className="text-xs font-bold text-stone-800">
                            Kéo thả hoặc nhấp để tải logo doanh nghiệp
                          </span>
                          <span className="text-[11px] text-stone-500">
                            Khuyến khích dùng file PNG nền trong suốt để ép kim lên nắp hộp sắc nét nhất
                          </span>
                        </div>
                      )}
                    </Upload.Dragger>

                    {/* Direct URL input fallback */}
                    <div className="mt-2">
                      <Form.Item
                        name="companyLogoUrl"
                        className="mb-0"
                        rules={[
                          { required: true, message: 'Vui lòng tải lên logo hoặc nhập đường dẫn ảnh.' },
                          { type: 'url', message: 'Vui lòng nhập định dạng URL hợp lệ (https://...).' },
                        ]}
                      >
                        <Input
                          size="middle"
                          placeholder="Hoặc dán trực tiếp đường dẫn HTTPS: https://example.com/logo.png"
                          style={{ borderRadius: 8, fontSize: 12 }}
                          prefix={<PictureOutlined className="text-stone-400 mr-1" />}
                          allowClear
                        />
                      </Form.Item>
                    </div>
                  </div>

                  {/* Brand Color Pair */}
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                      Bảng màu nhận diện thương hiệu
                    </label>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item name="primaryColor" label={<span className="text-[11px] text-stone-500">Màu chủ đạo</span>} className="mb-2">
                          <Input type="color" className="h-10 cursor-pointer rounded-lg" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="secondaryColor" label={<span className="text-[11px] text-stone-500">Màu bổ trợ</span>} className="mb-2">
                          <Input type="color" className="h-10 cursor-pointer rounded-lg" />
                        </Form.Item>
                      </Col>
                    </Row>

                    {/* Presets */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      <span className="text-[11px] text-stone-400">Gợi ý:</span>
                      {COLOR_PRESETS.map((cp) => (
                        <button
                          key={cp.label}
                          type="button"
                          onClick={() => {
                            form.setFieldsValue({
                              primaryColor: cp.primary,
                              secondaryColor: cp.secondary,
                            });
                          }}
                          className="text-[11px] px-2 py-0.5 rounded border border-stone-200 bg-white hover:bg-stone-50 flex items-center gap-1 cursor-pointer"
                        >
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: cp.primary }} />
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: cp.secondary }} />
                          <span className="text-stone-700">{cp.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Form.Item
                    name="specialMessage"
                    label={<span className="text-xs font-semibold text-stone-700">Thông điệp in trên nắp hộp / Thiệp thư pháp</span>}
                  >
                    <Input maxLength={500} showCount placeholder="Kính chúc Quý Đối Tác và Gia Đình Trung Thu Như Ý - Vạn Sự Cát Tường" style={{ borderRadius: 10 }} />
                  </Form.Item>

                  <Form.Item
                    name="packagingNotes"
                    label={<span className="text-xs font-semibold text-stone-700">Yêu cầu gia công đặc biệt</span>}
                    className="mb-0"
                  >
                    <TextArea
                      rows={2}
                      maxLength={2000}
                      showCount
                      placeholder="Quy cách ép kim chìm, vị trí khắc laser góc trên bên phải, phủ cát nhung..."
                      style={{ borderRadius: 10 }}
                    />
                  </Form.Item>

                  {/* Live 3D Box Preview Studio */}
                  <div className="pt-3 border-t border-stone-100">
                    <LiveBoxPreviewStudio
                      selectedTemplate={selectedTemplate}
                      companyName={companyName}
                      companyLogoUrl={companyLogoUrl}
                      primaryColor={primaryColor || '#8c1524'}
                      secondaryColor={secondaryColor || '#d48806'}
                      specialMessage={specialMessage}
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-3 text-xs text-stone-500">
                  Bật công tắc trên nếu doanh nghiệp có nhu cầu in ấn logo và cá nhân hóa bao bì quà tặng.
                </div>
              )}
            </div>
          </div>
        </Col>

        {/* Right Column: Sticky Quotation Docket */}
        <Col xs={24} lg={9}>
          <div className="sticky top-6">
            <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-md">
              {/* Luxury Accent Bar */}
              <div className="h-1.5 bg-gradient-to-r from-[#8c1524] via-[#d48806] to-[#8c1524]" />

              <div className="p-5 sm:p-6 flex flex-col gap-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      Phiếu Dự Toán B2B
                    </span>
                    {quoteLoading ? (
                      <span className="text-xs text-amber-600 flex items-center gap-1">
                        <SyncOutlined spin /> Đang tính...
                      </span>
                    ) : (
                      <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircleFilled /> Giá trực tiếp từ xưởng
                      </span>
                    )}
                  </div>
                  <h3 className="font-['Playfair_Display',serif] text-lg font-bold text-stone-900 mt-1 mb-0">
                    Chi Tiết Dự Toán Đơn Hàng
                  </h3>
                </div>

                {quoteError && (
                  <Alert
                    type="warning"
                    showIcon
                    message="Lưu ý dự toán"
                    description={quoteError}
                    style={{ fontSize: 12, borderRadius: 10 }}
                  />
                )}

                {/* Line Items */}
                <div className="space-y-2.5 py-3 border-y border-stone-100 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Biến thể lựa chọn:</span>
                    <b className="text-stone-900 font-medium truncate max-w-[180px]">
                      {selectedVariant?.name || '—'}
                    </b>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Số lượng đặt:</span>
                    <b className="text-stone-900 font-semibold">
                      {quantity || minQty} {product.unit || 'hộp'}
                    </b>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Đơn giá niêm yết:</span>
                    <span className="text-stone-800">
                      {money(quote?.lineBreakdown?.[0]?.originalUnitPrice || selectedVariant?.price || product.basePrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Tạm tính niêm yết:</span>
                    <span className="text-stone-800">
                      {money(quote?.subtotal || (selectedVariant?.price || product.basePrice) * (quantity || minQty))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Chiết khấu số lượng lớn:</span>
                    <b className="text-emerald-700 font-bold">
                      {quote?.totalDiscount ? `-${money(quote.totalDiscount)}` : 'Chưa đạt mốc'}
                    </b>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Bậc ưu đãi:</span>
                    <Tag color="gold" className="m-0 text-[11px] font-semibold">
                      {quote?.lineBreakdown?.[0]?.appliedPromotion?.name || 'Mùa vụ 2025'}
                    </Tag>
                  </div>
                  {packagingEnabled && (
                    <div className="flex items-center justify-between text-stone-600 pt-1 border-t border-dashed border-stone-200">
                      <span>Phí mockup &amp; ép kim:</span>
                      <span className="text-amber-800 font-semibold">Báo giá theo bản vẽ</span>
                    </div>
                  )}
                </div>

                {/* Total Grand Price */}
                <div className="bg-[#faf9f6] p-4 rounded-xl border border-stone-200/80">
                  <span className="text-xs text-stone-500 font-medium block">Tổng giá trị thanh toán dự kiến:</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#8c1524] mt-1">
                    {money(quote?.finalTotal || (selectedVariant?.price || product.basePrice) * (quantity || minQty))}
                  </div>
                  <span className="text-[11px] text-stone-400 block mt-1">
                    * Đã bao gồm hóa đơn VAT điện tử &amp; bảo hiểm hàng hóa
                  </span>
                </div>

                {/* Submit Action */}
                <Button
                  type="primary"
                  size="large"
                  block
                  icon={<ShoppingCartOutlined />}
                  loading={submitting}
                  disabled={quoteLoading}
                  htmlType="submit"
                  style={{
                    background: '#8c1524',
                    borderColor: '#8c1524',
                    fontWeight: 700,
                    height: 50,
                    borderRadius: 12,
                    fontSize: 16,
                    boxShadow: '0 4px 14px rgba(140, 21, 36, 0.25)',
                  }}
                >
                  Gửi Đơn Đặt Hàng Doanh Nghiệp
                </Button>

                {/* SafeTrade & PoD Assurances */}
                <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <SafetyCertificateFilled className="text-amber-600 text-sm shrink-0" />
                    <span>Ký quỹ SafeTrade MB Bank an toàn 100%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleFilled className="text-emerald-600 text-sm shrink-0" />
                    <span>Miễn phí thiết kế bản vẽ 3D từ 30 hộp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TruckOutlined className="text-[#8c1524] text-sm shrink-0" />
                    <span>Giao hàng xe lạnh, đổi mới 100% nếu phát sinh lỗi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Form>
  );

  // 2. Orders Tab UI
  const ordersTab = (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <div>
          <h3 className="font-['Playfair_Display',serif] text-lg font-bold text-stone-900 m-0">
            Lịch Sử Đơn Đặt Hàng B2B
          </h3>
          <span className="text-xs text-stone-500">
            Theo dõi tiến độ sản xuất, duyệt mockup bao bì và thanh toán hợp đồng
          </span>
        </div>
        <Button
          icon={<ReloadOutlined />}
          onClick={loadOrders}
          loading={loadingOrders}
          style={{ borderRadius: 8 }}
        >
          Tải lại danh sách
        </Button>
      </div>

      {loadingOrders ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-stone-200">
          <Spin size="large" tip="Đang tải danh sách đơn hàng..." />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 shadow-xs">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Quý khách chưa có đơn đặt hàng nào trong hệ thống."
          />
          <Button
            type="primary"
            onClick={() => setActiveTab('create')}
            style={{ background: '#8c1524', borderColor: '#8c1524', marginTop: 16, borderRadius: 10 }}
          >
            Tạo đơn đặt hàng mới
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const statusConfig = ORDER_STATUS_MAP[order.status] || {
              label: order.status,
              color: 'default',
            };
            const totalQty = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs hover:border-stone-300 transition-all flex flex-col gap-4"
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-stone-900 text-sm sm:text-base">
                      #{order.orderNumber}
                    </span>
                    <Tag color={statusConfig.color} className="m-0 font-semibold text-xs">
                      {statusConfig.label}
                    </Tag>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-stone-500 block">Tổng thanh toán:</span>
                    <b className="text-base sm:text-lg font-extrabold text-[#8c1524]">
                      {money(order.totalAmount)}
                    </b>
                  </div>
                </div>

                {/* Order Details Body */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-stone-400 block mb-0.5 font-medium">Sản phẩm &amp; số lượng:</span>
                    <b className="text-stone-900 block text-sm">
                      {order.items?.[0]?.productName || 'Bánh Trung Thu Doanh Nghiệp'}
                    </b>
                    <span className="text-stone-600 block mt-0.5">
                      Quy mô: {totalQty} hộp {order.items?.length > 1 ? `(${order.items.length} hạng mục)` : ''}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 block mb-0.5 font-medium">Thông tin người nhận:</span>
                    <span className="text-stone-900 font-semibold block">{order.recipientName} ({order.recipientPhone})</span>
                    <span className="text-stone-600 block mt-0.5 truncate max-w-xs">{order.deliveryAddress}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 block mb-0.5 font-medium">Thời gian &amp; Bao bì:</span>
                    <span className="text-stone-900 block">
                      {order.deliveryDateExpected ? `Dự kiến: ${order.deliveryDateExpected}` : 'Theo thỏa thuận xưởng'}
                    </span>
                    {order.customPackaging ? (
                      <span className="text-amber-700 font-semibold flex items-center gap-1 mt-0.5">
                        <CrownOutlined /> Có yêu cầu thiết kế bao bì
                      </span>
                    ) : (
                      <span className="text-stone-400 block mt-0.5">Quy cách hộp tiêu chuẩn</span>
                    )}
                  </div>
                </div>

                {/* Order Actions */}
                <div className="flex flex-wrap items-center justify-end gap-2.5 pt-3 border-t border-stone-100">
                  {order.status === 'Confirmed' && (
                    <Button
                      type="primary"
                      icon={<CreditCardOutlined />}
                      onClick={() => setPayingOrder(order)}
                      style={{
                        background: '#d48806',
                        borderColor: '#d48806',
                        fontWeight: 700,
                        borderRadius: 8,
                      }}
                    >
                      Thanh toán ký quỹ ngay
                    </Button>
                  )}

                  {order.customPackaging && (
                    <Button
                      icon={<EyeOutlined />}
                      onClick={() => openPackaging(order)}
                      style={{ borderRadius: 8, fontWeight: 600, color: '#b45309', borderColor: '#f59e0b' }}
                    >
                      Xem &amp; Duyệt Mockup 3D
                    </Button>
                  )}

                  {order.status === 'Shipped' && (
                    <Button
                      type="primary"
                      icon={<CheckCircleOutlined />}
                      onClick={async () => {
                        try {
                          await orderService.confirmDelivery(order.id);
                          message.success('Đã xác nhận nhận hàng thành công.');
                          loadOrders();
                        } catch (error) {
                          message.error(errorMessage(error));
                        }
                      }}
                      style={{ background: '#16a34a', borderColor: '#16a34a', borderRadius: 8 }}
                    >
                      Xác nhận đã nhận hàng
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col font-['Be_Vietnam_Pro',sans-serif]">
      {/* 1. Header */}
      <CustomerHeader activeKey="dat-hang-thiet-ke" onNavigate={onNavigate} />

      {/* 2. Main Page Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { title: <span className="cursor-pointer" onClick={() => onNavigate?.('trang-chu')}><HomeOutlined /> Trang chủ</span> },
            { title: <span className="cursor-pointer" onClick={() => onNavigate?.('tim-kiem')}>Bộ sưu tập</span> },
            { title: 'Đặt hàng & In logo doanh nghiệp' },
          ]}
          className="mb-4 text-xs"
        />

        {/* Hero Title Section */}
        <div className="mb-6">
          <h1 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 m-0">
            Đặt Hàng Doanh Nghiệp &amp; Thiết Kế Bao Bì
          </h1>
          <p className="text-sm text-stone-600 mt-2 max-w-3xl leading-relaxed">
            Áp dụng chiết khấu bậc thang từ 10% đến 35% cho đơn hàng doanh nghiệp · Mockup 3D duyệt trực tiếp trước khi sản xuất · Ký quỹ SafeTrade MB Bank an toàn tuyệt đối.
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs
          activeKey={activeTab}
          onChange={(key) => {
            setActiveTab(key);
            if (key === 'mine') loadOrders();
          }}
          items={[
            {
              key: 'create',
              label: (
                <span className="font-bold text-sm sm:text-base flex items-center gap-2">
                  <ShoppingCartOutlined /> Tạo Đơn Hàng Mới
                </span>
              ),
              children: <div className="pt-2">{createTab}</div>,
            },
            {
              key: 'mine',
              label: (
                <span className="font-bold text-sm sm:text-base flex items-center gap-2">
                  <FileTextOutlined /> Đơn Của Tôi {orders.length > 0 && <Badge count={orders.length} style={{ backgroundColor: '#8c1524' }} />}
                </span>
              ),
              children: <div className="pt-2">{ordersTab}</div>,
            },
          ]}
        />
      </main>

      {/* 3. Customer Footer */}
      <CustomerFooter onNavigate={onNavigate} />

      {/* 4. Mockup Review Modal */}
      <Modal
        title={
          <span className="font-['Playfair_Display',serif] font-bold text-lg text-stone-900">
            Duyệt Thiết Kế Mockup Bao Bì · #{reviewingOrder?.orderNumber || ''}
          </span>
        }
        open={Boolean(reviewingOrder)}
        onCancel={() => setReviewingOrder(null)}
        footer={null}
        width={780}
        style={{ borderRadius: 16 }}
      >
        <Spin spinning={reviewLoading}>
          {packaging && (
            <div className="space-y-4 pt-2">
              <Descriptions bordered column={2} size="small">
                <Descriptions.Item label="Doanh nghiệp">{packaging.companyName}</Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  <Tag color="blue">{packaging.status}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Quy cách hộp">{packaging.packagingType}</Descriptions.Item>
                <Descriptions.Item label="Thông điệp">{packaging.specialMessage || '—'}</Descriptions.Item>
              </Descriptions>

              {packaging.revisions && packaging.revisions.length > 0 ? (
                <div className="space-y-3 mt-4">
                  <span className="text-xs font-bold text-stone-700 block">Các phiên bản mockup từ xưởng:</span>
                  {packaging.revisions.map((revision) => (
                    <Card
                      key={revision.id}
                      size="small"
                      title={<span className="font-bold text-xs">Phiên bản thiết kế #{revision.revisionNumber}</span>}
                      extra={<Tag color="purple">{revision.status}</Tag>}
                      className="rounded-xl border-stone-200"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <a
                            href={revision.mockupUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-bold text-[#8c1524] underline flex items-center gap-1"
                          >
                            <PictureOutlined /> Mở tệp thiết kế độ phân giải cao
                          </a>
                          <span className="text-xs font-semibold text-stone-800">
                            Phí gia công thiết kế: {money(revision.designFee)}
                          </span>
                        </div>

                        {revision.supplierNotes && (
                          <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700">
                            <b>Ghi chú từ xưởng:</b> {revision.supplierNotes}
                          </div>
                        )}

                        {revision.status === 'DesignReview' && (
                          <div className="space-y-2.5 pt-2 border-t border-stone-100">
                            <span className="text-xs text-stone-600 block">
                              Nếu cần chỉnh sửa, vui lòng nhập nhận xét chi tiết để nghệ nhân hoàn thiện:
                            </span>
                            <TextArea
                              value={reviewNotes}
                              onChange={(event) => setReviewNotes(event.target.value)}
                              placeholder="Mô tả cụ thể vị trí cần căn chỉnh, màu sắc ép kim, hoa văn nắp hộp..."
                              rows={3}
                              style={{ borderRadius: 8 }}
                            />
                            <div className="flex items-center justify-end gap-2 pt-1">
                              <Button
                                onClick={() => reviewRevision('RequestRevision')}
                                style={{ borderRadius: 8 }}
                              >
                                Yêu cầu chỉnh sửa lại
                              </Button>
                              <Button
                                type="primary"
                                icon={<CheckCircleOutlined />}
                                onClick={() => reviewRevision('Approve')}
                                style={{ background: '#8c1524', borderColor: '#8c1524', borderRadius: 8 }}
                              >
                                Duyệt và tiến hành sản xuất
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-stone-500">
                  Xưởng đang tiến hành phối cảnh 3D. Bản thiết kế đầu tiên sẽ được tải lên trong 24h.
                </div>
              )}
            </div>
          )}
        </Spin>
      </Modal>

      {/* 5. Payment Modals */}
      <PaymentCheckoutModal
        open={Boolean(payingOrder)}
        onClose={() => setPayingOrder(null)}
        order={payingOrder}
        onSuccess={() => {
          setPayingOrder(null);
          loadOrders();
        }}
        onOpenVietQr={(data) => {
          setVietQrData(data);
        }}
      />

      <VietQrModal
        open={Boolean(vietQrData)}
        onClose={() => setVietQrData(null)}
        transferData={vietQrData}
        onUploadSuccess={() => {
          setVietQrData(null);
          loadOrders();
        }}
      />
    </div>
  );
}
