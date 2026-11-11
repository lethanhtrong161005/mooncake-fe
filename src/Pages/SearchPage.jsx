import { useState } from 'react';
import { AutoComplete, Button, Grid, Input, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CustomerHeader from '../components/layout/CustomerHeader';
import CustomerBreadcrumbBar from '../components/layout/CustomerBreadcrumbBar';
import ActiveFilterChips from '../components/search/ActiveFilterChips';
import SearchFilterPanel from '../components/search/SearchFilterPanel';
import SearchResultsGrid from '../components/search/SearchResultsGrid';
import SearchToolbar from '../components/search/SearchToolbar';
import { useProductSearch } from '../hooks/useProductSearch';
import '../styles/search-page.css';

const { Title, Text } = Typography;
const QUICK_KEYWORDS = ['Hộp quà VIP', 'Bánh nướng', 'Bánh dẻo', 'Bánh chay', 'Sơn mài'];

export default function SearchPage({ onNavigate }) {
  const screens = Grid.useBreakpoint();
  const hasScreenInfo = Object.keys(screens).length > 0;
  const isMobile = hasScreenInfo
    ? !screens.lg
    : typeof window !== 'undefined' && window.innerWidth < 992;

  const [viewMode, setViewMode] = useState('grid');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const {
    searchState,
    keywordDraft,
    suggestions,
    items,
    totalCount,
    facets,
    categoryOptions,
    regionOptions,
    effectiveCeiling,
    activeFilterCount,
    isLoading,
    error,
    handleKeywordChange,
    submitKeyword,
    setCategoryIds,
    toggleCategory,
    setRegionCodes,
    toggleRegion,
    setPriceRange,
    setMinReputation,
    setMaxMinOrderQty,
    setSupportsCustomPackaging,
    setInStockOnly,
    setSort,
    setPagination,
    resetAllFilters,
    retry,
  } = useProductSearch();

  const autoCompleteOptions = suggestions.map((suggestion) => ({
    value: suggestion,
    label: suggestion,
  }));

  return (
    <div className="search-page">
      <CustomerHeader activeKey="tim-kiem" onNavigate={onNavigate} />
      <CustomerBreadcrumbBar items={[{ label: 'Sản phẩm' }]} onNavigate={onNavigate} />

      <section className="search-intro" aria-labelledby="search-page-title">
        <div className="search-container search-intro__inner">
          <div className="search-intro__copy">
            <Text className="search-intro__eyebrow">Bánh Trung thu cho doanh nghiệp</Text>
            <Title id="search-page-title" level={1}>Chọn món quà đúng ý.</Title>
            <Text className="search-intro__description">
              Tìm bánh và hộp quà theo ngân sách, số lượng và khu vực nhà xưởng.
            </Text>
          </div>

          <div className="search-intro__form">
            <label className="search-intro__label" htmlFor="catalog-search-input">
              Bạn đang tìm sản phẩm nào?
            </label>
            <AutoComplete
              value={keywordDraft}
              options={autoCompleteOptions}
              onChange={handleKeywordChange}
              onSelect={submitKeyword}
              className="search-intro__autocomplete"
            >
              <Input.Search
                id="catalog-search-input"
                value={keywordDraft}
                onChange={(event) => handleKeywordChange(event.target.value)}
                onSearch={submitKeyword}
                allowClear
                placeholder="Tên bánh, hộp quà hoặc gian hàng"
                enterButton={<Button type="primary" icon={<SearchOutlined />} aria-label="Tìm sản phẩm">Tìm sản phẩm</Button>}
                size="large"
              />
            </AutoComplete>
            <div className="search-intro__suggestions" aria-label="Gợi ý tìm kiếm">
              <Text>Gợi ý:</Text>
              {QUICK_KEYWORDS.map((keyword) => (
                <Button
                  key={keyword}
                  size="small"
                  type="text"
                  className={searchState.q === keyword ? 'is-selected' : ''}
                  onClick={() => submitKeyword(keyword)}
                >
                  {keyword}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="search-container search-main">
        <div className="search-layout">
          <aside className="search-layout__filters" aria-label="Bộ lọc sản phẩm">
            <SearchFilterPanel
              searchState={searchState}
              categoryOptions={categoryOptions}
              regionOptions={regionOptions}
              facets={facets}
              effectiveCeiling={effectiveCeiling}
              activeFilterCount={activeFilterCount}
              onCategoryChange={setCategoryIds}
              onRegionChange={setRegionCodes}
              onPriceChange={setPriceRange}
              onReputationChange={setMinReputation}
              onMoqChange={setMaxMinOrderQty}
              onCustomPackagingChange={setSupportsCustomPackaging}
              onInStockChange={setInStockOnly}
              onResetAll={resetAllFilters}
              isMobile={isMobile}
              mobileDrawerOpen={mobileDrawerOpen}
              onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
            />
          </aside>

          <section className="search-layout__results" aria-label="Kết quả tìm kiếm">
            <SearchToolbar
              totalCount={totalCount}
              sort={searchState.sort}
              viewMode={viewMode}
              activeFilterCount={activeFilterCount}
              isLoading={isLoading}
              isMobile={isMobile}
              onSortChange={setSort}
              onViewModeChange={setViewMode}
              onOpenMobileDrawer={() => setMobileDrawerOpen(true)}
            />

            <ActiveFilterChips
              searchState={searchState}
              categoryOptions={categoryOptions}
              regionOptions={regionOptions}
              onClearKeyword={() => submitKeyword('')}
              onRemoveCategory={toggleCategory}
              onRemoveRegion={toggleRegion}
              onClearPrice={() => setPriceRange(null, null)}
              onClearReputation={() => setMinReputation(null)}
              onClearMoq={() => setMaxMinOrderQty(null)}
              onClearCustomPackaging={() => setSupportsCustomPackaging(false)}
              onClearInStock={() => setInStockOnly(false)}
              onResetAll={resetAllFilters}
            />

            <SearchResultsGrid
              items={items}
              totalCount={totalCount}
              pageNumber={searchState.pageNumber}
              pageSize={searchState.pageSize}
              viewMode={viewMode}
              isLoading={isLoading}
              error={error}
              activeFilterCount={activeFilterCount}
              isMobile={isMobile}
              onPaginationChange={setPagination}
              onResetAll={resetAllFilters}
              onRetry={retry}
              onNavigate={onNavigate}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
