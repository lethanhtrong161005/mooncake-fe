import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  Drawer,
  InputNumber,
  Select,
  Slider,
  Space,
  Tag,
  Typography,
} from 'antd';
import {
  EnvironmentOutlined,
  FilterOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  TagsOutlined,
} from '@ant-design/icons';
import { MOQ_OPTIONS, PRICE_STEP, REPUTATION_OPTIONS } from '../../constants/productSearch';
import { formatNumber } from '../../utils/formatCurrency';

const { Text } = Typography;

const PRICE_PRESETS = [
  { label: 'Dưới 500K', min: null, max: 500000 },
  { label: '500K – 1 Triệu', min: 500000, max: 1000000 },
  { label: 'Trên 1 Triệu', min: 1000000, max: null },
];

export default function SearchFilterPanel({
  searchState,
  categoryOptions,
  regionOptions,
  facets,
  effectiveCeiling,
  activeFilterCount,
  onCategoryChange,
  onRegionChange,
  onPriceChange,
  onReputationChange,
  onMoqChange,
  onCustomPackagingChange,
  onInStockChange,
  onResetAll,
  isMobile = false,
  mobileDrawerOpen = false,
  onCloseMobileDrawer,
}) {
  const committedKey = `${searchState.minPrice ?? ''}:${searchState.maxPrice ?? ''}`;
  const [priceDraft, setPriceDraft] = useState({
    key: committedKey,
    min: searchState.minPrice,
    max: searchState.maxPrice,
  });

  const minDraft = priceDraft.key === committedKey ? priceDraft.min : searchState.minPrice;
  const maxDraft = priceDraft.key === committedKey ? priceDraft.max : searchState.maxPrice;

  const updateMinDraft = (val) => {
    setPriceDraft({
      key: committedKey,
      min: val,
      max: maxDraft,
    });
  };

  const updateMaxDraft = (val) => {
    setPriceDraft({
      key: committedKey,
      min: minDraft,
      max: val,
    });
  };

  const sliderMin = minDraft != null ? minDraft : 0;
  const sliderMax = maxDraft != null ? maxDraft : effectiveCeiling;

  const handleSliderChange = (values) => {
    const [nextMin, nextMax] = values;
    setPriceDraft({
      key: committedKey,
      min: nextMin > 0 ? nextMin : null,
      max: nextMax < effectiveCeiling ? nextMax : null,
    });
  };

  const handleSliderComplete = (values) => {
    const [nextMin, nextMax] = values;
    const resolvedMin = nextMin > 0 ? nextMin : null;
    const resolvedMax = nextMax < effectiveCeiling ? nextMax : null;
    onPriceChange(resolvedMin, resolvedMax);
  };

  const handleApplyPriceInputs = () => {
    const resolvedMin = minDraft != null && minDraft > 0 ? Number(minDraft) : null;
    const resolvedMax = maxDraft != null && maxDraft > 0 ? Number(maxDraft) : null;
    onPriceChange(resolvedMin, resolvedMax);
  };

  const filterContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Space size={6}>
            <TagsOutlined style={{ color: '#8c1524' }} />
            <Text strong style={{ fontSize: 14, color: '#262626' }}>
              Danh mục sản phẩm
            </Text>
          </Space>
          {searchState.categoryIds.length > 0 && (
            <Button
              type="link"
              size="small"
              onClick={() => onCategoryChange([])}
              style={{ padding: 0, height: 'auto', color: '#8c1524', fontSize: 12 }}
            >
              Bỏ chọn
            </Button>
          )}
        </div>
        <Checkbox.Group
          value={searchState.categoryIds}
          onChange={onCategoryChange}
          style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}
          data-testid="filter-category-group"
        >
          {categoryOptions.map((item) => (
            <div
              key={item.value}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Checkbox value={item.value} style={{ flex: 1 }}>
                <span style={{ fontSize: 13, color: '#333' }}>
                  {item.label}
                  {item.count != null ? ` (${item.count})` : ''}
                </span>
              </Checkbox>
            </div>
          ))}
        </Checkbox.Group>
      </div>

      <Divider style={{ margin: '2px 0', borderColor: '#f0e6e0' }} />

      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Text strong style={{ fontSize: 14, color: '#262626' }}>
            Khoảng giá (VNĐ)
          </Text>
          {(searchState.minPrice != null || searchState.maxPrice != null) && (
            <Button
              type="link"
              size="small"
              onClick={() => onPriceChange(null, null)}
              style={{ padding: 0, height: 'auto', color: '#8c1524', fontSize: 12 }}
            >
              Đặt lại giá
            </Button>
          )}
        </div>

        <Space size={[6, 6]} wrap style={{ marginBottom: 10 }}>
          {PRICE_PRESETS.map((preset) => {
            const isSelected =
              searchState.minPrice === preset.min && searchState.maxPrice === preset.max;
            return (
              <Tag
                key={preset.label}
                color={isSelected ? '#8c1524' : 'default'}
                style={{
                  cursor: 'pointer',
                  borderRadius: 6,
                  margin: 0,
                  borderColor: isSelected ? '#8c1524' : '#e6d8d0',
                }}
                onClick={() => onPriceChange(preset.min, preset.max)}
              >
                {preset.label}
              </Tag>
            );
          })}
        </Space>

        <Slider
          range
          min={0}
          max={effectiveCeiling}
          step={PRICE_STEP}
          value={[sliderMin, Math.min(sliderMax, effectiveCeiling)]}
          onChange={handleSliderChange}
          onChangeComplete={handleSliderComplete}
          tooltip={{ formatter: (val) => `${formatNumber(val)} đ` }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: 6,
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          <InputNumber
            size="small"
            min={0}
            max={effectiveCeiling * 2}
            step={50000}
            value={minDraft}
            onChange={updateMinDraft}
            onPressEnter={handleApplyPriceInputs}
            placeholder="Từ (đ)"
            formatter={(val) => (val ? `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '')}
            parser={(val) => (val ? Number(val.replace(/\./g, '')) : null)}
            style={{ width: '100%' }}
            aria-label="Giá tối thiểu"
          />
          <Text type="secondary">–</Text>
          <InputNumber
            size="small"
            min={0}
            max={effectiveCeiling * 2}
            step={50000}
            value={maxDraft}
            onChange={updateMaxDraft}
            onPressEnter={handleApplyPriceInputs}
            placeholder="Đến (đ)"
            formatter={(val) => (val ? `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '')}
            parser={(val) => (val ? Number(val.replace(/\./g, '')) : null)}
            style={{ width: '100%' }}
            aria-label="Giá tối đa"
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          <Text type="secondary" style={{ fontSize: 12 }}>
            {formatNumber(sliderMin)} – {formatNumber(sliderMax)} đ
          </Text>
          <Button
            size="small"
            type="default"
            onClick={handleApplyPriceInputs}
            data-testid="apply-price-btn"
            style={{
              fontSize: 12,
              borderColor: '#8c1524',
              color: '#8c1524',
            }}
          >
            Áp dụng giá
          </Button>
        </div>
      </div>

      <Divider style={{ margin: '2px 0', borderColor: '#f0e6e0' }} />

      <div>
        <Space size={6} style={{ marginBottom: 10 }}>
          <EnvironmentOutlined style={{ color: '#8c1524' }} />
          <Text strong style={{ fontSize: 14, color: '#262626' }}>
            Khu vực nhà xưởng
          </Text>
        </Space>
        <Checkbox.Group
          value={searchState.regionCodes}
          onChange={onRegionChange}
          style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}
          data-testid="filter-region-group"
        >
          {regionOptions.map((item) => (
            <Checkbox key={item.value} value={item.value}>
              <span style={{ fontSize: 13, color: '#333' }}>
                {item.label}
                {item.count != null ? ` (${item.count})` : ''}
              </span>
            </Checkbox>
          ))}
        </Checkbox.Group>
      </div>

      <Divider style={{ margin: '2px 0', borderColor: '#f0e6e0' }} />

      <div>
        <Space size={6} style={{ marginBottom: 8 }}>
          <SafetyCertificateOutlined style={{ color: '#d48806' }} />
          <Text strong style={{ fontSize: 14, color: '#262626' }}>
            Uy tín & Quy mô B2B
          </Text>
        </Space>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
              Điểm uy tín gian hàng
            </Text>
            <Select
              value={searchState.minReputation ?? 0}
              onChange={onReputationChange}
              options={REPUTATION_OPTIONS}
              style={{ width: '100%' }}
              data-testid="filter-reputation-select"
            />
          </div>
          <div>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
              Số lượng đặt tối thiểu (MOQ)
            </Text>
            <Select
              value={searchState.maxMinOrderQty ?? 0}
              onChange={onMoqChange}
              options={MOQ_OPTIONS}
              style={{ width: '100%' }}
              data-testid="filter-moq-select"
            />
          </div>
        </div>
      </div>

      <Divider style={{ margin: '2px 0', borderColor: '#f0e6e0' }} />

      <div>
        <Text strong style={{ fontSize: 14, color: '#262626', display: 'block', marginBottom: 10 }}>
          Dịch vụ & Tồn kho
        </Text>
        <Space orientation="vertical" size={10} style={{ width: '100%' }}>
          <Checkbox
            checked={searchState.supportsCustomPackaging}
            onChange={(event) => onCustomPackagingChange(event.target.checked)}
          >
            <span style={{ fontSize: 13 }}>
              Có bao bì tuỳ chỉnh
              {facets?.customPackagingCount != null ? ` (${facets.customPackagingCount})` : ''}
            </span>
          </Checkbox>
          <Checkbox
            checked={searchState.inStockOnly}
            onChange={(event) => onInStockChange(event.target.checked)}
          >
            <span style={{ fontSize: 13 }}>
              Còn hàng
              {facets?.inStockCount != null ? ` (${facets.inStockCount})` : ''}
            </span>
          </Checkbox>
        </Space>
      </div>

      {activeFilterCount > 0 && (
        <Button
          block
          icon={<ReloadOutlined />}
          onClick={onResetAll}
          data-testid="reset-filters-sidebar-btn"
          style={{
            marginTop: 4,
            borderColor: '#8c1524',
            color: '#8c1524',
            fontWeight: 500,
          }}
        >
          Xóa tất cả bộ lọc ({activeFilterCount})
        </Button>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Drawer
        title={
          <Space>
            <FilterOutlined style={{ color: '#8c1524' }} />
            <span>Bộ lọc tìm kiếm B2B</span>
            {activeFilterCount > 0 && (
              <Badge count={activeFilterCount} style={{ backgroundColor: '#8c1524' }} />
            )}
          </Space>
        }
        placement="left"
        size="default"
        open={mobileDrawerOpen}
        onClose={onCloseMobileDrawer}
        footer={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button block onClick={onResetAll} disabled={activeFilterCount === 0}>
              Đặt lại
            </Button>
            <Button
              type="primary"
              block
              onClick={onCloseMobileDrawer}
              style={{ background: '#8c1524', borderColor: '#8c1524' }}
            >
              Xem kết quả
            </Button>
          </div>
        }
      >
        {filterContent}
      </Drawer>
    );
  }

  return (
    <Card
      title={
        <Space size={8}>
          <FilterOutlined style={{ color: '#8c1524' }} />
          <span style={{ fontWeight: 700, color: '#262626' }}>Bộ lọc chuyên sâu</span>
          {activeFilterCount > 0 && (
            <Badge count={activeFilterCount} style={{ backgroundColor: '#8c1524' }} />
          )}
        </Space>
      }
      extra={
        activeFilterCount > 0 ? (
          <Button
            type="link"
            size="small"
            onClick={onResetAll}
            style={{ padding: 0, color: '#8c1524', fontWeight: 500 }}
          >
            Đặt lại
          </Button>
        ) : null
      }
      size="small"
      style={{
        borderRadius: 10,
        borderColor: '#e7e5e4',
        borderTop: '3px solid #8c1524',
        position: 'sticky',
        top: 84,
      }}
      styles={{
        header: {
          background: '#ffffff',
          borderBottom: '1px solid #e7e5e4',
          padding: '12px 16px',
        },
        body: {
          padding: '16px',
        },
      }}
    >
      {filterContent}
    </Card>
  );
}
