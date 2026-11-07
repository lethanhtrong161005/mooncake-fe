import { Badge, Button, Segmented, Select, Space, Typography } from 'antd';
import {
  AppstoreOutlined,
  BarsOutlined,
  FilterOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons';
import { SORT_OPTIONS } from '../../constants/productSearch';

const { Text } = Typography;

export default function SearchToolbar({
  sort,
  viewMode,
  activeFilterCount,
  isMobile,
  onSortChange,
  onViewModeChange,
  onOpenMobileDrawer,
}) {
  return (
    <div
      data-testid="search-toolbar"
      style={{
        background: '#ffffff',
        border: '1px solid #ebdcd5',
        borderRadius: 12,
        padding: isMobile ? '10px 12px' : '12px 16px',
        marginBottom: 16,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        boxShadow: '0 2px 8px rgba(140, 21, 36, 0.03)',
      }}
    >
      <Space size={10} wrap>
        {isMobile ? (
          <Badge count={activeFilterCount} size="small" color="#8c1524">
            <Button
              icon={<FilterOutlined />}
              onClick={onOpenMobileDrawer}
              data-testid="mobile-filter-trigger"
              style={{
                borderColor: '#8c1524',
                color: '#8c1524',
                fontWeight: 600,
              }}
            >
              Bộ lọc
            </Button>
          </Badge>
        ) : (
          <Text strong style={{ fontSize: 14, color: '#262626' }}>
            Danh mục sản phẩm B2B
          </Text>
        )}
      </Space>

      <Space size={10} wrap style={{ marginLeft: 'auto' }}>
        <Space size={6}>
          {!isMobile && (
            <Text type="secondary" style={{ fontSize: 12 }}>
              <SortAscendingOutlined /> Sắp xếp:
            </Text>
          )}
          <Select
            value={sort}
            onChange={onSortChange}
            options={SORT_OPTIONS}
            style={{ width: isMobile ? 165 : 190 }}
            data-testid="search-sort-select"
            aria-label="Sắp xếp sản phẩm"
          />
        </Space>

        {!isMobile && (
          <Segmented
            value={viewMode}
            onChange={onViewModeChange}
            options={[
              { value: 'grid', icon: <AppstoreOutlined />, title: 'Dạng lưới' },
              { value: 'list', icon: <BarsOutlined />, title: 'Dạng danh sách' },
            ]}
            data-testid="search-view-mode"
          />
        )}
      </Space>
    </div>
  );
}
