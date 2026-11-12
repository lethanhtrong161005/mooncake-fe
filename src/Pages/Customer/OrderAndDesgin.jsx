import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Spin,
  Switch,
  Table,
  Tag,
  Typography,
  Upload,
  message,
} from 'antd';
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  CloudUploadOutlined,
  CreditCardOutlined,
  CrownOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  GiftOutlined,
  InfoCircleOutlined,
  PictureOutlined,
  PlusOutlined,
  SafetyCertificateFilled,
  ShoppingCartOutlined,
  SyncOutlined,
  TruckOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../../components/layout/CustomerHeader';
import CustomerFooter from '../../components/layout/CustomerFooter';
import CustomerBreadcrumbBar from '../../components/layout/CustomerBreadcrumbBar';
import useBulkOrderQuote from '../../hooks/useBulkOrderQuote';
import orderService from '../../services/orderService';
import productService from '../../services/productService';
import customPackagingService from '../../services/customPackagingService';
import packagingTemplateService from '../../services/packagingTemplateService';
import LiveBoxPreviewStudio from '../../components/packaging/LiveBoxPreviewStudio';
import GoogleMapAddressPicker from '../../components/common/GoogleMapAddressPicker';
import '../../styles/order-page.css';

const { TextArea } = Input;
const { Text } = Typography;
const money = (value) => `${Number(value || 0).toLocaleString('vi-VN')} ₫`;
const errorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Không thể xử lý yêu cầu.';

const COLOR_PRESETS = [
  { label: 'Đỏ Ruby & Vàng Kim', primary: '#8c1524', secondary: '#d48806' },
  { label: 'Xanh Cổ Điển & Vàng Nhạt', primary: '#1e3a5f', secondary: '#d4af37' },
  { label: 'Xanh Ngọc Lục & Vàng Đồng', primary: '#0f4c3a', secondary: '#c5a059' },
  { label: 'Huyền Bí Đen & Vàng Hoàng Gia', primary: '#1a1a1a', secondary: '#f1c40f' },
];

function resolveInitialOrderContext() {
  let draft;
  try {
    draft = JSON.parse(sessionStorage.getItem('b2b_order_draft') || 'null');
  } catch {
    draft = null;
  }

  const pathParts = window.location.pathname.replace(/^\//, '').split('/');
  const urlProductId =
    new URLSearchParams(window.location.search).get('productId') ||
    (pathParts[0] === 'dat-hang-thiet-ke' && pathParts[1] && pathParts[1].length > 10
      ? pathParts[1]
      : null) ||
    draft?.productId ||
    null;

  return { draft, urlProductId };
}

function resolveSelectedPackagingDraft() {
  try {
    return JSON.parse(sessionStorage.getItem('mooncake_selected_packaging_draft') || 'null');
  } catch {
    return null;
  }
}

export default function OrderAndDesgin({ onNavigate }) {
  const [form] = Form.useForm();
  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(() =>
    Boolean(resolveInitialOrderContext().urlProductId)
  );

  // Multi-variant line items in the order
  const [orderItems, setOrderItems] = useState([]);
  const [selectedPackagingDraft] = useState(resolveSelectedPackagingDraft);
  const [packagingEnabled, setPackagingEnabled] = useState(() =>
    Boolean(selectedPackagingDraft?.quantity)
  );
  const [submitting, setSubmitting] = useState(false);
  const [packagingTemplates, setPackagingTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Modals state
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [priceChangeModalOpen, setPriceChangeModalOpen] = useState(false);
  const [priceChangeData, setPriceChangeData] = useState(null);
  const [pendingValues, setPendingValues] = useState(null);

  const idempotencyKey = useRef({ fingerprint: '', key: crypto.randomUUID() });

  const companyName = Form.useWatch('companyName', form);
  const companyLogoUrl = Form.useWatch('companyLogoUrl', form);
  const primaryColor = Form.useWatch('primaryColor', form);
  const secondaryColor = Form.useWatch('secondaryColor', form);
  const specialMessage = Form.useWatch('specialMessage', form);
  const packagingType = Form.useWatch('packagingType', form);
  const shippingZoneCode = Form.useWatch('shippingZoneCode', form) || null;

  useEffect(() => {
    const pkg = selectedPackagingDraft;
    if (pkg?.quantity) {
      form.setFieldsValue({
        quantity: pkg.quantity,
        specialMessage: `[Tùy biến bao bì]: ${pkg.boxName} · ${pkg.techniqueName}.`,
      });
    }
  }, [form, selectedPackagingDraft]);

  useEffect(() => {
    const { draft, urlProductId } = resolveInitialOrderContext();
    if (!urlProductId) {
      return undefined;
    }

    let cancelled = false;
    productService
      .detail(urlProductId)
      .then((result) => {
        if (cancelled) return;
        if (!result) {
          setProduct(null);
          return;
        }
        setProduct(result);

        const initialVariantId =
          (draft?.productId === urlProductId ? draft.variantId : null) ||
          result.variants?.find((item) => item.isAvailable)?.id ||
          result.variants?.[0]?.id;
        const initialQty = Math.max(
          result.minOrderQty || 1,
          (draft?.productId === urlProductId ? draft.quantity : null) || result.minOrderQty || 20
        );

        setOrderItems([
          {
            key: 'item-1',
            productId: result.productId || result.id,
            variantId: initialVariantId,
            quantity: initialQty,
          },
        ]);

        form.setFieldValue('shippingZoneCode', undefined);
        setPackagingEnabled(false);

        const shopId = result.shop?.shopId || result.shop?.id;
        if (shopId && result.supportsCustomPackaging) {
          packagingTemplateService
            .getByShop(shopId)
            .then((tpls) => {
              if (Array.isArray(tpls) && tpls.length > 0) {
                setPackagingTemplates(tpls);
                const matched =
                  tpls.find((t) => t.name === form.getFieldValue('packagingType')) || tpls[0];
                setSelectedTemplate(matched);
                if (!form.getFieldValue('packagingType')) {
                  form.setFieldValue('packagingType', matched.name);
                }
              } else {
                setPackagingTemplates([]);
                setSelectedTemplate(null);
              }
            })
            .catch(() => {
              setPackagingTemplates([]);
              setSelectedTemplate(null);
            });
        } else {
          setPackagingTemplates([]);
          setSelectedTemplate(null);
        }
      })
      .catch((error) => {
        if (cancelled) return;
        setProduct(null);
        message.error(errorMessage(error));
      })
      .finally(() => {
        if (!cancelled) setLoadingProduct(false);
      });

    return () => {
      cancelled = true;
    };
  }, [form]);

  const targetShopId = product?.shop?.shopId || product?.shop?.id;
  const targetProductId = product?.productId || product?.id;
  const minQty = Math.max(1, Number(product?.minOrderQty ?? 1));
  const maxQty = product?.maxOrderQty ? Math.max(minQty, Number(product.maxOrderQty)) : null;

  // Real-time authoritative quote preview
  const packagingBriefForQuote = useMemo(() => {
    if (!packagingEnabled || !product?.supportsCustomPackaging) return null;
    return {
      boxStyle:
        form.getFieldValue('packagingType') || selectedTemplate?.name || 'Hộp Quà Doanh Nghiệp',
      pantoneColorCode: 'PANTONE 872 C',
      notes: form.getFieldValue('packagingNotes') || null,
    };
  }, [packagingEnabled, product, selectedTemplate, form]);

  const {
    quote,
    loading: quoteLoading,
    error: quoteError,
    refetchQuote,
  } = useBulkOrderQuote(targetShopId, orderItems, shippingZoneCode, packagingBriefForQuote);

  const shippingZoneOptions = useMemo(
    () =>
      (quote?.availableShippingRates || [])
        .filter((rate) => rate.isSupported)
        .map((rate) => ({
          value: rate.regionCode,
          label: `${rate.regionName} · ${rate.feeAmount > 0 ? money(rate.feeAmount) : 'Miễn phí'}${
            rate.estimatedDays ? ` · ${rate.estimatedDays} ngày` : ''
          }`,
        })),
    [quote?.availableShippingRates]
  );

  useEffect(() => {
    if (!shippingZoneCode && quote?.shippingZoneCode) {
      form.setFieldValue('shippingZoneCode', quote.shippingZoneCode);
    }
  }, [form, quote?.shippingZoneCode, shippingZoneCode]);

  const handleAddVariantRow = () => {
    if (!product?.variants || product.variants.length === 0) return;
    const availableVariant =
      product.variants.find(
        (v) => v.isAvailable && !orderItems.some((item) => item.variantId === v.id)
      ) || product.variants[0];

    setOrderItems((prev) => [
      ...prev,
      {
        key: `item-${Date.now()}`,
        productId: targetProductId,
        variantId: availableVariant?.id,
        quantity: Math.max(1, minQty),
      },
    ]);
  };

  const handleRemoveVariantRow = (key) => {
    if (orderItems.length <= 1) {
      message.warning('Đơn hàng cần có ít nhất 1 dòng sản phẩm.');
      return;
    }
    setOrderItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleUpdateItem = (key, field, value) => {
    setOrderItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, [field]: value } : item))
    );
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
        message.success('Đã tải ảnh logo doanh nghiệp thành công!');
      } else {
        message.error('Không nhận được đường dẫn logo từ máy chủ.');
      }
    } catch (err) {
      message.error(errorMessage(err));
    } finally {
      setUploadingLogo(false);
    }
    return false;
  };

  const resolveIdempotencyKey = (payload) => {
    const fingerprint = JSON.stringify(payload);
    if (idempotencyKey.current.fingerprint !== fingerprint) {
      idempotencyKey.current = { fingerprint, key: crypto.randomUUID() };
    }
    return idempotencyKey.current.key;
  };

  // Called when user clicks submit button -> Open Terms Confirmation Modal
  const handlePreSubmit = (values) => {
    if (!targetShopId || !targetProductId) {
      message.error('Thiếu thông tin nhà cung cấp hoặc sản phẩm.');
      return;
    }
    if (orderItems.length === 0) {
      message.error('Vui lòng chọn ít nhất 1 dòng sản phẩm bánh.');
      return;
    }
    setPendingValues(values);
    setTermsModalOpen(true);
  };

  // Execute order submission
  const executeSubmitOrder = async (values, overridePriceVersion = null) => {
    setSubmitting(true);
    try {
      const shouldIncludePackaging = Boolean(packagingEnabled && product?.supportsCustomPackaging);

      const customPackagingPayload = shouldIncludePackaging
        ? {
            companyName: values.companyName?.trim(),
            companyLogoUrl: values.companyLogoUrl?.trim(),
            packagingType:
              values.packagingType?.trim() || selectedTemplate?.name || 'Hộp Quà Doanh Nghiệp',
            colorScheme: JSON.stringify({
              primary: values.primaryColor || '#8c1524',
              secondary: values.secondaryColor || '#d48806',
            }),
            specialMessage: values.specialMessage?.trim() || null,
            notes: values.packagingNotes?.trim() || null,
          }
        : null;

      const itemsPayload = orderItems.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        quantity: Number(item.quantity),
      }));

      const createOrderPayload = {
        shopId: targetShopId,
        items: itemsPayload,
        shippingZoneCode: values.shippingZoneCode || null,
        deliveryAddress: values.deliveryAddress?.trim(),
        recipientName: values.recipientName?.trim(),
        recipientPhone: values.recipientPhone?.trim(),
        deliveryDateExpected: values.deliveryDateExpected || null,
        acceptedPriceVersion: overridePriceVersion || quote?.priceVersion || null,
        notes: values.notes?.trim() || null,
        ...(customPackagingPayload ? { customPackaging: customPackagingPayload } : {}),
      };

      const requestKey = resolveIdempotencyKey(createOrderPayload);
      const order = await orderService.create(createOrderPayload, requestKey);

      setTermsModalOpen(false);
      setPriceChangeModalOpen(false);
      message.success(
        `Đã tạo đơn hàng #${order.orderNumber} thành công! Nhà cung cấp sẽ phản hồi trong thời hạn SLA quy định (12 giờ).`
      );
      idempotencyKey.current = { fingerprint: '', key: crypto.randomUUID() };
      sessionStorage.removeItem('b2b_order_draft');
      onNavigate?.('don-hang-cua-toi');
    } catch (error) {
      const apiError = error?.response?.data || error?.data || {};
      const apiErrorCode = error?.errorCode || apiError.errorCode;
      if (apiErrorCode === 'PRICE_CHANGED') {
        const data = apiError.data;
        setPriceChangeData(data);
        setTermsModalOpen(false);
        setPriceChangeModalOpen(true);
      } else if (apiErrorCode === 'INSUFFICIENT_STOCK') {
        message.error(
          apiError.message ||
            'Số lượng đặt vượt quá tồn kho khả dụng tại xưởng. Vui lòng giảm số lượng.'
        );
      } else {
        message.error(errorMessage(error));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleAcceptNewPrice = async () => {
    if (!priceChangeData?.priceVersion || !pendingValues) return;
    await executeSubmitOrder(pendingValues, priceChangeData.priceVersion);
  };

  const totalItemCount = useMemo(
    () => orderItems.reduce((acc, it) => acc + Number(it.quantity || 0), 0),
    [orderItems]
  );

  const localSubtotal = useMemo(
    () =>
      orderItems.reduce((total, item) => {
        const variant = product?.variants?.find((entry) => entry.id === item.variantId);
        const unitPrice = Number(variant?.price ?? product?.basePrice ?? 0);
        return total + unitPrice * Number(item.quantity || 0);
      }, 0),
    [orderItems, product]
  );

  const quotedSubtotal = Number(quote?.subtotal ?? localSubtotal);
  const quotedTotal = Number(quote?.payableTotal ?? quote?.finalTotal ?? localSubtotal);
  const depositAmount = Number(quote?.depositAmount ?? quotedTotal);
  const balanceBeforeShipping = Number(
    quote?.balanceBeforeShippingAmount ?? Math.max(0, quotedTotal - depositAmount)
  );
  const appliedPromotions = useMemo(
    () =>
      Array.from(
        new Set(
          (quote?.lineBreakdown || []).map((line) => line.appliedPromotion?.name).filter(Boolean)
        )
      ),
    [quote?.lineBreakdown]
  );

  const columns = [
    {
      title: <span className="whitespace-nowrap">Biến thể bánh</span>,
      key: 'variant',
      width: 360,
      render: (_, record) => (
        <Select
          size="large"
          value={record.variantId}
          onChange={(val) => handleUpdateItem(record.key, 'variantId', val)}
          style={{ width: '100%' }}
          popupMatchSelectWidth={420}
          options={product?.variants?.map((v) => ({
            value: v.id,
            label: `${v.name} · ${money(v.price ?? product?.basePrice)} · ${v.sku || 'VIP'}`,
            disabled: !v.isAvailable,
          }))}
        />
      ),
    },
    {
      title: <span className="whitespace-nowrap">Số lượng</span>,
      key: 'quantity',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <InputNumber
          size="large"
          min={1}
          max={maxQty ?? 1000000}
          precision={0}
          step={1}
          value={record.quantity}
          onChange={(val) => handleUpdateItem(record.key, 'quantity', val)}
          style={{ width: 82 }}
        />
      ),
    },
    {
      title: <span className="whitespace-nowrap">Đơn giá</span>,
      key: 'price',
      width: 130,
      align: 'right',
      render: (_, record) => {
        const v = product?.variants?.find((item) => item.id === record.variantId);
        const quoteLine = quote?.lineBreakdown?.find((line) => line.variantId === record.variantId);
        return (
          <div className="text-right whitespace-nowrap tabular-nums">
            <Text strong className="whitespace-nowrap">
              {money(quoteLine?.discountedUnitPrice ?? v?.price ?? product.basePrice)}
            </Text>
            {quoteLine?.lineDiscount > 0 && (
              <div className="text-[11px] text-stone-400 line-through">
                {money(quoteLine.originalUnitPrice)}
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: <span className="whitespace-nowrap">Thành tiền</span>,
      key: 'subtotal',
      width: 140,
      align: 'right',
      render: (_, record) => {
        const v = product?.variants?.find((item) => item.id === record.variantId);
        const quoteLine = quote?.lineBreakdown?.find((line) => line.variantId === record.variantId);
        const sub =
          quoteLine?.lineTotal ?? (v?.price ?? product.basePrice) * Number(record.quantity || 0);
        return (
          <Text strong className="text-[#8c1524] whitespace-nowrap tabular-nums">
            {money(sub)}
          </Text>
        );
      },
    },
    {
      title: '',
      key: 'action',
      width: 50,
      render: (_, record) =>
        orderItems.length > 1 ? (
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleRemoveVariantRow(record.key)}
          />
        ) : null,
    },
  ];

  const createTab = loadingProduct ? (
    <div className="order-page__loading">
      <Spin size="large" description="Đang kết nối dữ liệu sản phẩm..." />
    </div>
  ) : !product ? (
    <div className="order-page__empty">
      <div className="order-page__empty-copy">
        <span className="order-page__empty-label">Bắt đầu đơn hàng</span>
        <h2>Chọn món quà trước khi tạo đơn.</h2>
        <p>
          Xem các mẫu bánh và hộp quà, chọn quy cách phù hợp rồi tiếp tục điền thông tin giao hàng.
        </p>
        <Button
          type="primary"
          size="large"
          icon={<ArrowRightOutlined />}
          iconPlacement="end"
          onClick={() => onNavigate?.('tim-kiem')}
        >
          Xem sản phẩm
        </Button>
      </div>
      <img
        src="/hero_mooncake_bg.jpg"
        alt="Hộp quà Trung thu Nguyệt Phố"
        className="order-page__empty-image"
      />
    </div>
  ) : (
    <Form
      className="order-page__form"
      form={form}
      layout="vertical"
      onFinish={handlePreSubmit}
      initialValues={{
        packagingType: 'Hộp Sơn Mài Thượng Hạng',
        primaryColor: '#8c1524',
        secondaryColor: '#d48806',
      }}
    >
      <Row gutter={[24, 24]} className="order-page__layout">
        {/* Left Column: Form Configuration */}
        <Col xs={24} lg={16}>
          <div className="flex flex-col gap-5">
            {/* 1. Multi-Item Product Configuration */}
            <div className="order-page__card order-page__product bg-white rounded-[14px] p-5 sm:p-6 border border-stone-200">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-5 border-b border-stone-100">
                <div className="flex items-start gap-4 min-w-0">
                  <img
                    src={product.images?.[0]?.imageUrl || '/hero_mooncake_bg.jpg'}
                    alt={product.name}
                    className="order-page__product-image w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-stone-200 shrink-0 shadow-sm"
                  />
                  <div className="min-w-0 pt-0.5">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-stone-500 mb-1">
                      <span>{product.shop?.name || 'Xưởng Nghệ Nhân'}</span>
                      {product.shop?.isVerified && (
                        <SafetyCertificateFilled className="text-amber-600 text-xs" />
                      )}
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug line-clamp-2 m-0">
                      {product.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                      <Tag
                        color="gold"
                        className="m-0 text-[11px] font-semibold rounded-full px-2.5"
                      >
                        Tối thiểu {minQty} {product.unit || 'hộp'}
                      </Tag>
                      <Tag color="green" className="m-0 text-[11px] rounded-full px-2.5">
                        Giá đã gồm VAT
                      </Tag>
                      <Tag color="blue" className="m-0 text-[11px] rounded-full px-2.5">
                        Giao một chuyến
                      </Tag>
                    </div>
                  </div>
                </div>

                <Button
                  type="link"
                  size="small"
                  onClick={() => onNavigate?.('tim-kiem')}
                  className="self-end sm:self-start text-stone-500 hover:text-[#8c1524] text-xs px-0 font-semibold whitespace-nowrap"
                >
                  Đổi sản phẩm
                </Button>
              </div>

              {/* Items Table */}
              <div className="mt-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 m-0">
                      Sản phẩm trong đơn
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 mb-0">
                      Chọn biến thể và số lượng cần đặt tại cùng một xưởng.
                    </p>
                  </div>
                  <Button
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={handleAddVariantRow}
                    className="self-start sm:self-auto"
                    style={{ borderRadius: 8 }}
                  >
                    Thêm biến thể
                  </Button>
                </div>

                <p className="order-page__table-hint">Vuốt ngang để xem đơn giá và thành tiền.</p>
                <Table
                  dataSource={orderItems}
                  columns={columns}
                  pagination={false}
                  size="small"
                  rowKey="key"
                  tableLayout="fixed"
                  className="order-page__items-table border border-stone-200 rounded-xl overflow-hidden [&_.ant-table-thead_.ant-table-cell]:bg-stone-50 [&_.ant-table-thead_.ant-table-cell]:font-semibold"
                  scroll={{ x: 780 }}
                />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3 px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-100 text-xs text-stone-600">
                  <span>
                    Tổng số lượng:{' '}
                    <b className="text-stone-900">
                      {totalItemCount} {product.unit || 'hộp'}
                    </b>
                  </span>
                  {totalItemCount < minQty && (
                    <span className="text-red-600 font-semibold">
                      Chưa đạt số lượng đặt hàng tối thiểu của xưởng ({minQty} hộp)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Delivery Information & Shipping Zone */}
            <div className="order-page__card order-page__delivery bg-white rounded-[14px] p-5 sm:p-6 border border-stone-200 border-l-4 border-l-[#8c1524]">
              <div className="flex items-start gap-3 mb-5 pb-4 border-b border-stone-100">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8c1524] flex items-center justify-center shrink-0">
                  <TruckOutlined className="text-lg" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 m-0">
                    Thông tin giao nhận
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 mb-0 leading-relaxed">
                    Đơn hàng được giao một lần đến địa chỉ doanh nghiệp đã xác nhận.
                  </p>
                </div>
              </div>

              <Row gutter={[18, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="shippingZoneCode"
                    label={
                      <span className="text-xs font-semibold text-stone-700">
                        Phương thức / khu vực giao hàng
                      </span>
                    }
                    rules={
                      shippingZoneOptions.length > 0
                        ? [{ required: true, message: 'Vui lòng chọn khu vực giao hàng.' }]
                        : []
                    }
                  >
                    {shippingZoneOptions.length > 0 ? (
                      <Select
                        size="large"
                        options={shippingZoneOptions}
                        placeholder="Chọn khu vực giao hàng"
                        style={{ borderRadius: 10 }}
                      />
                    ) : (
                      <Select
                        size="large"
                        disabled
                        placeholder="Xưởng chưa cấu hình bảng phí giao"
                        style={{ borderRadius: 10 }}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="deliveryDateExpected"
                    label={
                      <span className="text-xs font-semibold text-stone-700">
                        Ngày nhận hàng mong muốn
                      </span>
                    }
                    extra={
                      <span className="text-[11px] text-stone-400">
                        Tối thiểu 3 ngày làm việc kể từ hôm nay
                      </span>
                    }
                    rules={[{ required: true, message: 'Vui lòng chọn ngày giao hàng dự kiến.' }]}
                  >
                    <Input type="date" size="large" style={{ borderRadius: 10 }} />
                  </Form.Item>
                </Col>
              </Row>

              {shippingZoneOptions.length === 0 && !quoteLoading && !quoteError && (
                <Alert
                  type="info"
                  showIcon
                  className="mb-5"
                  message="Xưởng đang áp dụng phí giao 0 ₫ và sẽ xác nhận phạm vi phục vụ khi duyệt đơn."
                />
              )}

              <Row gutter={[18, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="recipientName"
                    label={
                      <span className="text-xs font-semibold text-stone-700">Người nhận hàng</span>
                    }
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên người nhận.' }]}
                  >
                    <Input size="large" placeholder="Nguyễn Văn A" style={{ borderRadius: 10 }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="recipientPhone"
                    label={
                      <span className="text-xs font-semibold text-stone-700">Số điện thoại</span>
                    }
                    rules={[
                      { required: true, message: 'Vui lòng nhập số điện thoại.' },
                      { pattern: /^[0-9+\s-]{9,15}$/, message: 'Số điện thoại không hợp lệ.' },
                    ]}
                  >
                    <Input size="large" placeholder="0901234567" style={{ borderRadius: 10 }} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="deliveryAddress"
                label={
                  <span className="text-xs font-semibold text-stone-700">Địa chỉ nhận hàng</span>
                }
                extra={
                  <span className="text-[11px] text-stone-400">
                    Dùng một địa chỉ trụ sở hoặc kho cho toàn bộ đơn hàng.
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập hoặc chọn địa chỉ nhận hàng.',
                  },
                ]}
              >
                <GoogleMapAddressPicker placeholder="Nhập số nhà, đường, tòa nhà hoặc khu công nghiệp..." />
              </Form.Item>

              <Form.Item
                name="notes"
                label={
                  <span className="text-xs font-semibold text-stone-700">
                    Ghi chú và thông tin xuất hóa đơn
                  </span>
                }
                className="mb-0"
              >
                <TextArea
                  rows={3}
                  maxLength={2000}
                  showCount
                  placeholder="Ví dụ: khung giờ nhận hàng, tên công ty, mã số thuế hoặc yêu cầu xuất hóa đơn..."
                  style={{ borderRadius: 10 }}
                />
              </Form.Item>
            </div>

            {/* 3. Custom Packaging & Branding */}
            {product.supportsCustomPackaging && (
              <div className={`order-page__card order-page__packaging bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs${packagingEnabled ? ' is-active' : ''}`}>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <CrownOutlined className="text-amber-600 text-base" />
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-stone-900 m-0">
                        Thiết kế bao bì và in logo doanh nghiệp
                      </h3>
                      <span className="text-xs text-stone-500">
                        Chỉ gửi hồ sơ thiết kế khi Quý doanh nghiệp bật tùy chọn in ấn bao bì
                      </span>
                    </div>
                  </div>

                  <Switch
                    aria-label="Bật thiết kế bao bì riêng"
                    checked={packagingEnabled}
                    onChange={setPackagingEnabled}
                    disabled={!product.supportsCustomPackaging}
                  />
                </div>

                {!product.supportsCustomPackaging ? (
                  <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-center gap-2">
                    <InfoCircleOutlined className="text-stone-400" />
                    <span>
                      Sản phẩm này phân phối theo quy cách hộp tiêu chuẩn của nghệ nhân, không hỗ
                      trợ thiết kế bao bì riêng.
                    </span>
                  </div>
                ) : packagingEnabled ? (
                  <div className="mt-4 space-y-4">
                    <Row gutter={16}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="companyName"
                          label={
                            <span className="text-xs font-semibold text-stone-700">
                              Tên doanh nghiệp / Đơn vị đặt hàng
                            </span>
                          }
                          rules={[{ required: true, message: 'Vui lòng nhập tên công ty.' }]}
                        >
                          <Input
                            size="large"
                            placeholder="Công ty TNHH Tập đoàn Công Nghệ ABC"
                            style={{ borderRadius: 10 }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="packagingType"
                          label={
                            <span className="text-xs font-semibold text-stone-700">
                              Quy cách hộp quà tặng
                            </span>
                          }
                          rules={[{ required: true, message: 'Vui lòng chọn quy cách hộp.' }]}
                        >
                          <Input
                            size="large"
                            placeholder="Hộp Sơn Mài Thượng Hạng"
                            style={{ borderRadius: 10 }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    {/* Packaging Templates Preview */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-stone-600 font-medium">
                          Gợi ý mẫu hộp gia công tiêu biểu:
                        </span>
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
                                {pkg.sampleImageUrl ? (
                                  <img
                                    src={pkg.sampleImageUrl}
                                    alt={pkg.name}
                                    className="w-16 h-16 rounded-lg object-cover shrink-0 border border-stone-200 shadow-2xs"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  <div className="w-16 h-16 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 border border-stone-200 text-stone-400">
                                    <GiftOutlined className="text-xl" />
                                  </div>
                                )}

                                <div className="flex-1 min-w-0 flex flex-col justify-between">
                                  <div>
                                    <div className="flex items-start justify-between gap-1">
                                      <span
                                        className={`text-xs font-bold leading-tight line-clamp-1 ${
                                          isSelected ? 'text-[#8c1524]' : 'text-stone-900'
                                        }`}
                                      >
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
                                      <span className="text-emerald-700 font-medium">
                                        Miễn phí kèm bánh
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-xs text-stone-500 p-3 rounded-lg border border-dashed border-stone-200 bg-stone-50/50 text-center">
                          Nhà cung cấp chưa đăng ký mẫu hộp quà tặng riêng. Quý khách có thể tự nhập
                          quy cách mong muốn bên trên.
                        </div>
                      )}
                    </div>

                    {/* Logo Upload Section */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold text-stone-700">
                          Logo doanh nghiệp (Đường dẫn HTTPS)
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
                              Đang tải logo lên máy chủ lưu trữ...
                            </span>
                          </div>
                        ) : companyLogoUrl ? (
                          <div className="py-1 flex items-center justify-between gap-3 px-2">
                            <div className="flex items-center gap-3">
                              <img
                                src={companyLogoUrl}
                                alt="Logo doanh nghiệp đã chọn"
                                className="w-14 h-14 object-contain bg-white rounded-lg p-1.5 border border-stone-200 shadow-2xs"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              <div className="text-left">
                                <span className="text-xs font-bold text-stone-900 flex items-center gap-1">
                                  <CheckCircleFilled className="text-emerald-600" /> Đã gắn đường
                                  dẫn logo
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
                              aria-label="Xóa logo đã chọn"
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
                              Khuyến khích dùng file PNG nền trong suốt để ép kim lên nắp hộp sắc
                              nét nhất
                            </span>
                          </div>
                        )}
                      </Upload.Dragger>

                      <div className="mt-2">
                        <Form.Item
                          name="companyLogoUrl"
                          className="mb-0"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng tải lên logo hoặc nhập đường dẫn HTTPS.',
                            },
                            {
                              type: 'url',
                              message: 'Vui lòng nhập định dạng URL hợp lệ (https://...).',
                            },
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
                      <span className="text-xs font-semibold text-stone-700 block mb-1.5">
                        Bảng màu nhận diện thương hiệu
                      </span>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name="primaryColor"
                            label={<span className="text-[11px] text-stone-500">Màu chủ đạo</span>}
                            className="mb-2"
                          >
                            <Input type="color" className="h-10 cursor-pointer rounded-lg" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="secondaryColor"
                            label={<span className="text-[11px] text-stone-500">Màu bổ trợ</span>}
                            className="mb-2"
                          >
                            <Input type="color" className="h-10 cursor-pointer rounded-lg" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <span className="text-[11px] text-stone-400">Gợi ý:</span>
                        {COLOR_PRESETS.map((cp) => (
                          <Button
                            key={cp.label}
                            size="small"
                            aria-label={`Chọn bảng màu ${cp.label}`}
                            onClick={() => {
                              form.setFieldsValue({
                                primaryColor: cp.primary,
                                secondaryColor: cp.secondary,
                              });
                            }}
                          >
                            <span className="inline-flex items-center gap-1 text-[11px]">
                              <span
                                className="w-2.5 h-2.5 rounded-full inline-block"
                                style={{ background: cp.primary }}
                              />
                              <span
                                className="w-2.5 h-2.5 rounded-full inline-block"
                                style={{ background: cp.secondary }}
                              />
                              <span className="text-stone-700">{cp.label}</span>
                            </span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Form.Item
                      name="specialMessage"
                      label={
                        <span className="text-xs font-semibold text-stone-700">
                          Thông điệp in trên nắp hộp / Thiệp thư pháp
                        </span>
                      }
                    >
                      <Input
                        maxLength={500}
                        showCount
                        placeholder="Kính chúc Quý Đối Tác và Gia Đình Trung Thu Như Ý - Vạn Sự Cát Tường"
                        style={{ borderRadius: 10 }}
                      />
                    </Form.Item>

                    <Form.Item
                      name="packagingNotes"
                      label={
                        <span className="text-xs font-semibold text-stone-700">
                          Yêu cầu gia công bao bì chi tiết
                        </span>
                      }
                      className="mb-0"
                    >
                      <TextArea
                        rows={2}
                        maxLength={2000}
                        showCount
                        placeholder="Quy cách ép kim chìm, vị trí khắc laser góc trên bên phải..."
                        style={{ borderRadius: 10 }}
                      />
                    </Form.Item>

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
                    Đang đặt theo hộp tiêu chuẩn của nghệ nhân (không phát sinh chi phí thiết kế bao
                    bì riêng).
                  </div>
                )}
              </div>
            )}
          </div>
        </Col>

        {/* Right Column: Sticky Quotation & Financial Schedule */}
        <Col xs={24} lg={8}>
          <div className="lg:sticky lg:top-6">
            <div className="order-page__summary bg-white rounded-[14px] overflow-hidden border border-stone-200 shadow-[0_18px_45px_rgba(41,37,36,0.08)]">
              <div className="order-page__summary-body p-5 sm:p-6 flex flex-col gap-5">
                <div className="pb-4 border-b border-stone-100">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-stone-900 m-0 leading-tight">
                        Tạm tính đơn hàng
                      </h3>
                      <p className="text-xs text-stone-500 mt-1.5 mb-0 leading-relaxed">
                        Cập nhật theo số lượng và chính sách hiện tại của xưởng.
                      </p>
                    </div>
                    {quoteLoading ? (
                      <Tag color="gold" icon={<SyncOutlined spin />} className="m-0 rounded-full">
                        Đang tính giá
                      </Tag>
                    ) : quote ? (
                      <Tag
                        color="success"
                        icon={<CheckCircleFilled />}
                        className="m-0 rounded-full"
                      >
                        Giá từ xưởng
                      </Tag>
                    ) : (
                      <Tag color="default" className="m-0 rounded-full">
                        Chưa có dự toán
                      </Tag>
                    )}
                  </div>
                </div>

                {quoteError && (
                  <Alert
                    type="warning"
                    showIcon
                    message="Chưa thể lấy dự toán từ xưởng"
                    description={quoteError}
                    action={
                      <Button
                        size="small"
                        onClick={() => void refetchQuote().catch(() => undefined)}
                      >
                        Thử lại
                      </Button>
                    }
                    style={{ fontSize: 12, borderRadius: 10 }}
                  />
                )}

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Tổng số lượng đặt:</span>
                    <b className="text-stone-900 font-semibold">
                      {totalItemCount} {product.unit || 'hộp'}
                    </b>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Tạm tính niêm yết:</span>
                    <span className="text-stone-800">{money(quotedSubtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Chiết khấu số lượng:</span>
                    <b className="text-emerald-700 font-bold">
                      {quote?.totalDiscount ? `-${money(quote.totalDiscount)}` : 'Chưa đạt mốc'}
                    </b>
                  </div>
                  {appliedPromotions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {appliedPromotions.map((promotion) => (
                        <Tag key={promotion} color="green" className="m-0 rounded-full text-[11px]">
                          {promotion}
                        </Tag>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Khu vực vận chuyển:</span>
                    <span className="text-stone-800 font-medium">
                      {quote?.shippingZoneName ||
                        shippingZoneOptions.find((zone) => zone.value === shippingZoneCode)
                          ?.label ||
                        'Chưa có bảng phí giao'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Phí vận chuyển dự kiến:</span>
                    <span className="text-stone-800">{money(quote?.shippingFee || 0)}</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Thuế GTGT (VAT):</span>
                    <span className="text-stone-800">
                      {quote?.taxAmount
                        ? money(quote.taxAmount)
                        : quote?.taxIncluded
                          ? 'Đã gồm trong giá'
                          : '0 ₫'}
                    </span>
                  </div>
                  {packagingEnabled && product.supportsCustomPackaging && (
                    <div className="flex items-center justify-between text-stone-600 pt-1 border-t border-dashed border-stone-200">
                      <span>Phí thiết kế bao bì:</span>
                      <span className="text-amber-800 font-semibold">
                        {quote?.packagingFee ? money(quote.packagingFee) : 'Theo bản vẽ duyệt'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Total and Deposit breakdown */}
                <div className="order-page__total-panel bg-[#8c1524] p-4 sm:p-5 rounded-xl space-y-3 text-white">
                  <div>
                    <span className="text-xs text-white/70 font-medium block mb-1">
                      Tổng thanh toán dự kiến
                    </span>
                    <b
                      data-testid="order-quote-total"
                      className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
                    >
                      {money(quotedTotal)}
                    </b>
                  </div>
                  <Divider style={{ margin: '8px 0', borderColor: 'rgba(255,255,255,0.18)' }} />
                  {quote?.depositRequired ? (
                    <>
                      <div className="flex items-start justify-between gap-4 text-xs">
                        <span className="text-amber-100 font-semibold flex items-center gap-1">
                          <CreditCardOutlined /> Thanh toán cọc ({quote.depositPercent}%)
                        </span>
                        <b className="text-sm font-bold text-white whitespace-nowrap">
                          {money(depositAmount)}
                        </b>
                      </div>
                      <div className="flex items-center justify-between text-xs text-white/70">
                        <span>Phần còn lại trước khi giao</span>
                        <span className="font-semibold text-white">
                          {money(balanceBeforeShipping)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-amber-100 font-semibold flex items-center gap-1.5">
                      <CreditCardOutlined /> Thanh toán một lần sau khi xưởng xác nhận
                    </div>
                  )}
                  <span className="text-[11px] text-white/65 block pt-1 leading-relaxed">
                    Chỉ phát sinh thanh toán sau khi nhà cung cấp xác nhận khả năng đáp ứng đơn
                    hàng.
                  </span>
                </div>

                <Button
                  className="order-page__submit"
                  type="primary"
                  size="large"
                  block
                  icon={<ShoppingCartOutlined />}
                  loading={submitting}
                  disabled={
                    quoteLoading || !quote || Boolean(quoteError) || totalItemCount < minQty
                  }
                  htmlType="submit"
                  style={{
                    background: '#8c1524',
                    borderColor: '#8c1524',
                    fontWeight: 700,
                    minHeight: 50,
                    borderRadius: 12,
                    fontSize: 16,
                  }}
                >
                  Gửi đơn đặt hàng
                </Button>

                <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <SafetyCertificateFilled className="text-amber-600 text-sm shrink-0" />
                    <span>Thanh toán qua VNPay sau khi xưởng xác nhận đơn</span>
                  </div>
                  {product.supportsCustomPackaging && (
                    <div className="flex items-center gap-2">
                      <CheckCircleFilled className="text-emerald-600 text-sm shrink-0" />
                      <span>Duyệt mẫu bao bì trước sản xuất nếu có in logo</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <TruckOutlined className="text-[#8c1524] text-sm shrink-0" />
                    <span>Xác nhận giao hàng trước khi tiền được giải ngân</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Modal 1: Terms & Pre-Order Confirmation Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-stone-900 font-bold">
            <SafetyCertificateFilled className="text-[#8c1524]" />
            <span>Xác nhận điều khoản đặt hàng doanh nghiệp</span>
          </div>
        }
        open={termsModalOpen}
        onCancel={() => setTermsModalOpen(false)}
        confirmLoading={submitting}
        onOk={() => executeSubmitOrder(pendingValues)}
        okText="Gửi đơn đặt hàng"
        cancelText="Quay lại chỉnh sửa"
        okButtonProps={{
          style: { background: '#8c1524', borderColor: '#8c1524', fontWeight: 700 },
        }}
        width={600}
      >
        <div className="space-y-4 my-3 text-xs sm:text-sm text-stone-700">
          <Alert
            type="info"
            showIcon
            message="Cam kết dịch vụ & Điều khoản giao dịch B2B"
            description="Đơn hàng được bảo vệ bởi cơ chế tạm giữ ký quỹ. Quý khách vui lòng lưu ý các mốc thời gian quy định:"
          />

          <Descriptions bordered size="small" column={1}>
            <Descriptions.Item label="Xưởng cung cấp">
              <b>{product?.shop?.name}</b>
            </Descriptions.Item>
            <Descriptions.Item label="Tổng số lượng bánh">
              <b>
                {totalItemCount} {product?.unit || 'hộp'}
              </b>
            </Descriptions.Item>
            <Descriptions.Item label="Tổng giá trị đơn hàng">
              <b className="text-[#8c1524]">{money(quotedTotal)}</b>
            </Descriptions.Item>
            <Descriptions.Item
              label={
                quote?.depositRequired
                  ? `Tiền cọc cần thanh toán (${quote.depositPercent}%)`
                  : 'Thanh toán sau khi xưởng xác nhận'
              }
            >
              <b className="text-amber-800">{money(depositAmount)}</b>
            </Descriptions.Item>
            <Descriptions.Item label="Thời hạn phản hồi của xưởng (SLA)">
              Tối đa <b>12 giờ</b> kể từ khi gửi đơn
            </Descriptions.Item>
            <Descriptions.Item label="Thời hạn thanh toán cọc (SLA)">
              Tối đa <b>24 giờ</b> sau khi xưởng chấp thuận
            </Descriptions.Item>
            <Descriptions.Item label="Thời hạn xem xét ảnh PoD (SLA)">
              Tối đa <b>48 giờ</b> sau khi xưởng tải ảnh giao hàng
            </Descriptions.Item>
            <Descriptions.Item label="Quy cách vận chuyển">
              Một chuyến giao nguyên lô duy nhất đến địa chỉ đã chọn
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Modal>

      {/* Modal 2: PRICE_CHANGED Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-amber-700 font-bold">
            <ExclamationCircleOutlined className="text-amber-600 text-lg" />
            <span>Giá hoặc chính sách đơn hàng đã thay đổi</span>
          </div>
        }
        open={priceChangeModalOpen}
        onCancel={() => setPriceChangeModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setPriceChangeModalOpen(false)}>
            Xem lại đơn hàng
          </Button>,
          <Button
            key="accept"
            type="primary"
            loading={submitting}
            onClick={handleAcceptNewPrice}
            style={{ background: '#8c1524', borderColor: '#8c1524', fontWeight: 700 }}
          >
            Chấp nhận giá mới và đặt hàng
          </Button>,
        ]}
        width={560}
      >
        <div className="space-y-4 my-3 text-xs sm:text-sm text-stone-700">
          <p className="leading-relaxed">
            Trong thời gian Quý khách soạn đơn, chính sách giá, chương trình chiết khấu hoặc phí vận
            chuyển của xưởng đã được cập nhật. Dưới đây là bảng đối chiếu chi tiết:
          </p>

          <Descriptions bordered size="small" column={2}>
            <Descriptions.Item label="Tổng tiền trước đây">
              <span className="line-through text-stone-400">{money(quotedTotal)}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền cập nhật mới">
              <b className="text-[#8c1524] text-base">
                {money(priceChangeData?.payableTotal || priceChangeData?.finalTotal || 0)}
              </b>
            </Descriptions.Item>
            <Descriptions.Item label="Tiền cọc yêu cầu mới">
              <b className="text-amber-800">
                {money(priceChangeData?.depositAmount ?? priceChangeData?.payableTotal ?? 0)}
              </b>
            </Descriptions.Item>
            <Descriptions.Item label="Chiết khấu mới">
              <b className="text-emerald-700">{money(priceChangeData?.totalDiscount || 0)}</b>
            </Descriptions.Item>
          </Descriptions>

          <Alert
            type="warning"
            showIcon
            message="Quý khách có thể chấp nhận báo giá mới ngay hoặc đóng cửa sổ để điều chỉnh lại số lượng."
          />
        </div>
      </Modal>
    </Form>
  );

  return (
    <div className="order-page min-h-screen bg-[#f5f6f8] flex flex-col font-['Be_Vietnam_Pro',sans-serif]">
      <CustomerHeader activeKey="dat-hang-thiet-ke" onNavigate={onNavigate} />
      <CustomerBreadcrumbBar
        items={[
          { label: 'Sản phẩm', onClick: () => onNavigate?.('tim-kiem') },
          { label: 'Đặt hàng doanh nghiệp' },
        ]}
        onNavigate={onNavigate}
      />

      <main className="order-page__main max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1">
        <div className="order-page__intro mb-7 pb-6 border-b border-stone-200">
          <span className="order-page__eyebrow">Mua sỉ bánh Trung thu</span>
          <h1 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-extrabold text-stone-950 m-0 tracking-[-0.02em]">
            Đặt hàng doanh nghiệp
          </h1>
          <p className="text-sm text-stone-600 mt-2.5 max-w-2xl leading-6">
            Chọn quy cách, điền địa chỉ giao và kiểm tra giá trước khi gửi đơn cho xưởng.
          </p>
        </div>

        {createTab}
      </main>

      <CustomerFooter onNavigate={onNavigate} />
    </div>
  );
}
