import { useState } from 'react';
import {
  AutoComplete,
  Breadcrumb,
  Button,
  Col,
  Grid,
  Input,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import {
  CompassOutlined,
  HomeOutlined,
  SafetyCertificateOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../components/layout/CustomerHeader';
import ActiveFilterChips from '../components/search/ActiveFilterChips';
import SearchFilterPanel from '../components/search/SearchFilterPanel';
import SearchResultsGrid from '../components/search/SearchResultsGrid';
import SearchToolbar from '../components/search/SearchToolbar';
import { useProductSearch } from '../hooks/useProductSearch';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const QUICK_KEYWORDS = [
  'Hộp quà VIP',
  'Bánh nướng',
  'Bánh dẻo',
  'Bánh chay',
  'Sơn mài',
];

export default function SearchPage({ onNavigate }) {
  const screens = useBreakpoint();
  const hasScreenInfo = Object.keys(screens).length > 0;
  const isMobile = hasScreenInfo
    ? !screens.md
    : typeof window !== 'undefined' && window.innerWidth < 768;

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

  const autoCompleteOptions = suggestions.map((text) => ({
    value: text,
    label: (
      <Space size={6}>
        <SearchOutlined style={{ color: '#8c1524', fontSize: 12 }} />
        <span>{text}</span>
      </Space>
    ),
  }));

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#faf8f6',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CustomerHeader onNavigate={onNavigate} />

      <section
        style={{
          background:
            'linear-gradient(135deg, #5c0f19 0%, #8c1524 55%, #6e111d 100%)',
          color: '#ffffff',
          padding: isMobile ? '20px 16px 24px' : '28px 24px 32px',
          borderBottom: '3px solid #d48806',
        }}
      >
        <div style={{ maxWidth: 1360, margin: '0 auto' }}>
          <Breadcrumb
            items={[
              {
                title: (
                  <span
                    onClick={() => onNavigate?.('trang-chu')}
                    style={{ color: '#f5d3c6', cursor: 'pointer', fontSize: 12 }}
                  >
                    <HomeOutlined /> Trang chủ
                  </span>
                ),
              },
              {
                title: (
                  <span style={{ color: '#ffffff', fontSize: 12, fontWeight: 500 }}>
                    <CompassOutlined /> Khám phá catalog B2B
                  </span>
                ),
              },
            ]}
            style={{ marginBottom: 12 }}
          />

          <Row gutter={[24, 16]} align="middle" justify="space-between">
            <Col xs={24} lg={10}>
              <Title
                level={2}
                style={{
                  color: '#ffffff',
                  margin: '0 0 6px',
                  fontSize: isMobile ? 22 : 28,
                  fontWeight: 700,
                }}
              >
                Khám phá catalog B2B
              </Title>
              <Text style={{ color: '#f7dfd4', fontSize: 13 }}>
                <SafetyCertificateOutlined
                  style={{ color: '#f3c677', marginRight: 6 }}
                />
                Nguồn cung bánh Trung thu doanh nghiệp từ các xưởng nghệ nhân đã xác minh,
                hỗ trợ in logo & xuất hóa đơn VAT.
              </Text>
            </Col>

            <Col xs={24} lg={14}>
              <AutoComplete
                value={keywordDraft}
                options={autoCompleteOptions}
                onChange={handleKeywordChange}
                onSelect={(val) => submitKeyword(val)}
                style={{ width: '100%' }}
              >
                <Input.Search
                  value={keywordDraft}
                  onChange={(event) => handleKeywordChange(event.target.value)}
                  onSearch={(val) => submitKeyword(val)}
                  allowClear
                  placeholder="Tìm theo tên sản phẩm hoặc gian hàng"
                  enterButton={
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      style={{
                        background: '#d48806',
                        borderColor: '#d48806',
                        fontWeight: 600,
                      }}
                    >
                      Tìm kiếm
                    </Button>
                  }
                  size="large"
                />
              </AutoComplete>

              <Space size={[6, 6]} wrap style={{ marginTop: 10 }}>
                <Text style={{ color: '#f5d3c6', fontSize: 12 }}>Gợi ý nhanh:</Text>
                {QUICK_KEYWORDS.map((kw) => (
                  <Tag
                    key={kw}
                    onClick={() => submitKeyword(kw)}
                    style={{
                      cursor: 'pointer',
                      background:
                        searchState.q === kw
                          ? '#d48806'
                          : 'rgba(255, 255, 255, 0.14)',
                      borderColor:
                        searchState.q === kw
                          ? '#d48806'
                          : 'rgba(255, 255, 255, 0.28)',
                      color: '#ffffff',
                      borderRadius: 12,
                      fontSize: 11,
                      margin: 0,
                    }}
                  >
                    {kw}
                  </Tag>
                ))}
              </Space>
            </Col>
          </Row>
        </div>
      </section>

      <main
        style={{
          maxWidth: 1360,
          width: '100%',
          margin: '0 auto',
          padding: isMobile ? '16px 12px 40px' : '24px 24px 56px',
          flex: 1,
        }}
      >
        {isMobile ? (
          <>
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
              isMobile
              mobileDrawerOpen={mobileDrawerOpen}
              onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
            />

            <SearchToolbar
              totalCount={totalCount}
              pageNumber={searchState.pageNumber}
              pageSize={searchState.pageSize}
              sort={searchState.sort}
              viewMode={viewMode}
              activeFilterCount={activeFilterCount}
              isLoading={isLoading}
              isMobile
              onSortChange={setSort}
              onPageSizeChange={setPagination}
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
              isMobile
              onPaginationChange={setPagination}
              onResetAll={resetAllFilters}
              onRetry={retry}
              onNavigate={onNavigate}
            />
          </>
        ) : (
          <Row gutter={[24, 24]} align="top">
            <Col md={7} lg={6}>
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
              />
            </Col>

            <Col md={17} lg={18}>
              <SearchToolbar
                totalCount={totalCount}
                pageNumber={searchState.pageNumber}
                pageSize={searchState.pageSize}
                sort={searchState.sort}
                viewMode={viewMode}
                activeFilterCount={activeFilterCount}
                isLoading={isLoading}
                isMobile={false}
                onSortChange={setSort}
                onPageSizeChange={setPagination}
                onViewModeChange={setViewMode}
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
                isMobile={false}
                onPaginationChange={setPagination}
                onResetAll={resetAllFilters}
                onRetry={retry}
                onNavigate={onNavigate}
              />
            </Col>
          </Row>
        )}
      </main>
    </div>
  );
}
