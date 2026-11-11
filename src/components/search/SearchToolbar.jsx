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
  totalCount,
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
        border: '1px solid #e7e5e4',
        borderRadius: 10,
        padding: isMobile ? '10px 12px' : '12px 16px',
        marginBottom: 16,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
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
          <div>
            <Text strong style={{ fontSize: 14, color: '#1c1917', display: 'block' }}>
              {Number(totalCount || 0).toLocaleString('vi-VN')} sản phẩm phù hợp
            </Text>
            <Text type="secondary" style={{ fontSize: 11 }}>
              Chọn sản phẩm để xem biến thể và điều kiện đặt hàng
            </Text>
          </div>
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
