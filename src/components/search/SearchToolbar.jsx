import { Badge, Button, Segmented, Select, Typography } from 'antd';
import { AppstoreOutlined, BarsOutlined, FilterOutlined } from '@ant-design/icons';
import { SORT_OPTIONS } from '../../constants/productSearch';

const { Text } = Typography;

export default function SearchToolbar({
  totalCount,
  sort,
  viewMode,
  activeFilterCount,
  isMobile,
  isLoading,
  onSortChange,
  onViewModeChange,
  onOpenMobileDrawer,
}) {
  return (
    <div className="search-toolbar" data-testid="search-toolbar">
      <div className="search-toolbar__summary" aria-live="polite">
        <Text strong>{isLoading ? 'Đang tìm sản phẩm...' : `${Number(totalCount || 0).toLocaleString('vi-VN')} sản phẩm`}</Text>
        <Text>Chọn mẫu phù hợp để xem giá và điều kiện đặt sỉ.</Text>
      </div>

      <div className="search-toolbar__controls">
        {isMobile && (
          <Badge count={activeFilterCount} size="small" color="#8c1524">
            <Button
              icon={<FilterOutlined />}
              onClick={onOpenMobileDrawer}
              data-testid="mobile-filter-trigger"
            >
              Bộ lọc
            </Button>
          </Badge>
        )}
        <label className="search-toolbar__sort">
          {!isMobile && <span>Sắp xếp</span>}
          <Select
            value={sort}
            onChange={onSortChange}
            options={SORT_OPTIONS}
            data-testid="search-sort-select"
            aria-label="Sắp xếp sản phẩm"
          />
        </label>
        {!isMobile && (
          <Segmented
            value={viewMode}
            onChange={onViewModeChange}
            options={[
              { value: 'grid', icon: <AppstoreOutlined />, title: 'Dạng lưới' },
              { value: 'list', icon: <BarsOutlined />, title: 'Dạng danh sách' },
            ]}
            data-testid="search-view-mode"
            aria-label="Kiểu hiển thị sản phẩm"
          />
        )}
      </div>
    </div>
  );
}
