import { Button, Space, Tag, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { resolveRegionLabel } from '../../constants/productSearch';
import { formatNumber } from '../../utils/formatCurrency';

const { Text } = Typography;

export default function ActiveFilterChips({
  searchState,
  categoryOptions,
  regionOptions,
  onClearKeyword,
  onRemoveCategory,
  onRemoveRegion,
  onClearPrice,
  onClearReputation,
  onClearMoq,
  onClearCustomPackaging,
  onClearInStock,
  onResetAll,
}) {
  const categoryMap = new Map(categoryOptions.map((item) => [String(item.value), item.label]));
  const regionMap = new Map(regionOptions.map((item) => [String(item.value), item.label]));

  const chips = [];

  if (searchState.q) {
    chips.push({
      key: 'q',
      label: `Từ khóa: "${searchState.q}"`,
      onClose: onClearKeyword,
    });
  }

  searchState.categoryIds.forEach((id) => {
    chips.push({
      key: `cat-${id}`,
      label: `Danh mục: ${categoryMap.get(String(id)) || id}`,
      onClose: () => onRemoveCategory(id),
    });
  });

  searchState.regionCodes.forEach((code) => {
    chips.push({
      key: `reg-${code}`,
      label: `Khu vực: ${regionMap.get(String(code)) || resolveRegionLabel(code)}`,
      onClose: () => onRemoveRegion(code),
    });
  });

  if (searchState.minPrice != null || searchState.maxPrice != null) {
    const minStr = searchState.minPrice != null ? `${formatNumber(searchState.minPrice)}đ` : '0đ';
    const maxStr =
      searchState.maxPrice != null ? `${formatNumber(searchState.maxPrice)}đ` : 'Trở lên';
    chips.push({
      key: 'price',
      label: `Giá: ${minStr} – ${maxStr}`,
      onClose: onClearPrice,
    });
  }

  if (searchState.minReputation != null && searchState.minReputation > 0) {
    chips.push({
      key: 'rep',
      label: `Uy tín ≥ ${searchState.minReputation} điểm`,
      onClose: onClearReputation,
    });
  }

  if (searchState.maxMinOrderQty != null && searchState.maxMinOrderQty > 0) {
    chips.push({
      key: 'moq',
      label: `MOQ ≤ ${searchState.maxMinOrderQty} hộp`,
      onClose: onClearMoq,
    });
  }

  if (searchState.supportsCustomPackaging) {
    chips.push({
      key: 'custom',
      label: 'Có bao bì tuỳ chỉnh',
      onClose: onClearCustomPackaging,
    });
  }

  if (searchState.inStockOnly) {
    chips.push({
      key: 'instock',
      label: 'Chỉ còn hàng',
      onClose: onClearInStock,
    });
  }

  if (chips.length === 0) return null;

  return (
    <div
      data-testid="active-filter-chips"
      className="search-active-filters"
    >
      <Space size={[6, 6]} wrap>
        <Text strong style={{ fontSize: 12, color: '#8c1524', marginRight: 4 }}>
          Đang lọc ({chips.length}):
        </Text>
        {chips.map((chip) => (
          <Tag
            key={chip.key}
            closable
            onClose={(e) => {
              e.preventDefault();
              chip.onClose();
            }}
            style={{
              background: '#ffffff',
              borderColor: '#d9b8ae',
              color: '#5c1822',
              borderRadius: 6,
              padding: '2px 8px',
              fontSize: 12,
              margin: 0,
            }}
          >
            {chip.label}
          </Tag>
        ))}
      </Space>

      <Button
        type="link"
        size="small"
        icon={<CloseCircleOutlined />}
        onClick={onResetAll}
        data-testid="clear-all-chips-btn"
        style={{ color: '#8c1524', fontWeight: 600, padding: 0 }}
      >
        Xóa tất cả bộ lọc
      </Button>
    </div>
  );
}
