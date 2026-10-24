import { useState, useMemo } from 'react';
import {
  Input,
  Select,
  Button,
  Tag,
  Pagination,
} from 'antd';
import {
  SearchOutlined,
} from '@ant-design/icons';
import CustomerHeader from '../components/layout/CustomerHeader';
import InterestChipsFilter from '../components/lucian/InterestChipsFilter';
import PriceHistogramFilter from '../components/lucian/PriceHistogramFilter';
import EmptyFilterState from '../components/lucian/EmptyFilterState';
import { PRODUCTS_DATA } from '../constants/mockProducts';

const CATEGORY_OPTIONS = [
  { value: 'nuong', label: 'Bánh Nướng', count: 18 },
  { value: 'deo', label: 'Bánh Dẻo', count: 9 },
  { value: 'tuyet', label: 'Bánh Tuyết', count: 6 },
  { value: 'hop-vip', label: 'Hộp Quà VIP', count: 14 },
  { value: 'healthy', label: 'Healthy Ít Ngọt', count: 8 },
];

const SUPPLIER_PILLS = [
  { value: 'all', label: 'Tất cả xưởng' },
  { value: 'trang-an', label: 'Tràng An' },
  { value: 'huu-nghi', label: 'Hữu Nghị' },
  { value: 'bao-phuong', label: 'Bảo Phương' },
  { value: 'kinh-do', label: 'Kinh Đô' },
];

const QUICK_SEARCH_PILLS = [
  { label: 'Bánh nướng thập cẩm', query: 'thập cẩm' },
  { label: 'Hộp sơn mài VIP', query: 'sơn mài' },
  { label: 'Bánh ít ngọt', query: 'healthy' },
  { label: 'Xưởng Tràng An', query: 'Tràng An' },
  { label: 'Xưởng Bảo Phương', query: 'Bảo Phương' },
];

const MOQ_PILLS = [
  { value: 'all', label: 'Tất cả' },
  { value: '20', label: '≤ 20 hộp' },
  { value: '50', label: '≤ 50 hộp' },
];


export default function SearchPage({ onNavigate }) {
  const [searchText, setSearchText] = useState('');

  const handleSelectProduct = (id) => {
    sessionStorage.setItem('selected_product_id', id);
    onNavigate?.('san-pham');
  };
  const [selectedCategories, setSelectedCategories] = useState(['nuong', 'hop-vip']);
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [priceRange, setPriceRange] = useState([50000, 1000000]);
  const [selectedMoq, setSelectedMoq] = useState('all');
  const [onlyCustomPackaging, setOnlyCustomPackaging] = useState(false);
  const [sortBy, setSortBy] = useState('reputation');
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8;

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      if (searchText.trim()) {
        const query = searchText.trim().toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchSupplier = p.supplier.toLowerCase().includes(query);
        const matchVariants = Array.isArray(p.variants)
          ? p.variants.some((v) => v.flavor?.toLowerCase().includes(query))
          : typeof p.variants === 'string'
          ? p.variants.toLowerCase().includes(query)
          : false;
        const matchCategory = p.categoryName.toLowerCase().includes(query);
        if (!matchName && !matchSupplier && !matchVariants && !matchCategory) {
          return false;
        }
      }

      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
        return false;
      }

      if (selectedSupplier !== 'all' && p.supplierId !== selectedSupplier) {
        return false;
      }

      if (p.price < priceRange[0] || p.price > priceRange[1]) {
        return false;
      }

      if (selectedMoq === '20' && p.minQty > 20) return false;
      if (selectedMoq === '50' && p.minQty > 50) return false;
      if (selectedMoq === '100' && p.minQty < 50) return false;

      if (onlyCustomPackaging && !p.packagingSupported) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'reputation') return b.reputationScore - a.reputationScore;
      if (sortBy === 'min_qty') return a.minQty - b.minQty;
      return 0;
    });
  }, [searchText, selectedCategories, selectedSupplier, priceRange, selectedMoq, onlyCustomPackaging, sortBy]);

  const totalResults = filteredProducts.length;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const activeFiltersCount =
    (selectedCategories.length > 0 ? 1 : 0) +
    (selectedSupplier !== 'all' ? 1 : 0) +
    (priceRange[0] > 50000 || priceRange[1] < 1000000 ? 1 : 0) +
    (selectedMoq !== 'all' ? 1 : 0) +
    (onlyCustomPackaging ? 1 : 0) +
    (searchText.trim() ? 1 : 0);

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedSupplier('all');
    setPriceRange([50000, 1000000]);
    setSelectedMoq('all');
    setOnlyCustomPackaging(false);
    setSearchText('');
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#f5f5f7] min-h-screen flex flex-col font-sans">
      <CustomerHeader activeKey="tim-kiem" onNavigate={onNavigate} />

      {/* EXPANDED FULL-WIDTH CONTAINER */}
      <main className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex-1 flex flex-col gap-5">
        
        {/* CLEAN DISCOVERY HEADER */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-stone-200/80">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Title & Clean Verification Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight m-0 whitespace-nowrap">
                Sản Phẩm
              </h1>
              
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-600">
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 font-medium whitespace-nowrap">
                  50+ xưởng
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 font-medium whitespace-nowrap">
                  Hóa đơn VAT
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 font-medium whitespace-nowrap">
                  Xe lạnh
                </span>
              </div>
            </div>

            {/* Search Input & Reset Button */}
            <div className="flex items-center gap-2 w-full lg:w-auto lg:min-w-[420px]">
              <Input
                size="large"
                prefix={<SearchOutlined style={{ color: '#8c1524', fontSize: 16, marginRight: 6 }} />}
                placeholder="Tìm bánh, xưởng, hộp quà..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setCurrentPage(1);
                }}
                allowClear
                style={{
                  borderRadius: 10,
                  fontSize: 14,
                }}
              />
              {activeFiltersCount > 0 && (
                <Button
                  size="large"
                  onClick={handleResetFilters}
                  style={{ borderRadius: 10, whiteSpace: 'nowrap' }}
                >
                  Đặt Lại
                </Button>
              )}
            </div>
          </div>

          {/* Quick Search Pills (Clean Typography) */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
            <span className="font-semibold text-stone-600 mr-1 whitespace-nowrap">Tìm nhanh:</span>
            {QUICK_SEARCH_PILLS.map((pill) => (
              <button
                key={pill.query}
                type="button"
                onClick={() => {
                  setSearchText(pill.query);
                  setCurrentPage(1);
                }}
                className="px-3 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors text-xs font-medium cursor-pointer whitespace-nowrap"
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-COLUMN WORKSPACE */}
        <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
          
          {/* LEFT: INDEPENDENT SCROLLING FILTER SIDEBAR (Nike-style) */}
          <aside className="w-full lg:w-[290px] xl:w-[310px] shrink-0 bg-white rounded-2xl p-5 shadow-xs border border-stone-200/80 flex flex-col gap-5 sticky top-20 lg:max-h-[calc(100vh-96px)] lg:overflow-y-auto filter-sidebar-scroll">
            
            <div className="sticky top-0 bg-white/95 backdrop-blur-xs pt-0 pb-3 border-b border-stone-100 flex items-center justify-between z-10 -mt-1">
              <span className="font-bold text-stone-900 text-sm uppercase tracking-wide">
                Bộ Lọc
              </span>
              {activeFiltersCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#8c1524] text-[11px] font-bold whitespace-nowrap border border-rose-200">
                  {activeFiltersCount} đang lọc
                </span>
              )}
            </div>

            {/* 1. DÒNG BÁNH (Category Chips) */}
            <div>
              <InterestChipsFilter
                title="Dòng Bánh"
                options={CATEGORY_OPTIONS}
                selected={selectedCategories}
                onChange={(newSelected) => {
                  setSelectedCategories(newSelected);
                  setCurrentPage(1);
                }}
                max={4}
              />
            </div>

            <div className="w-full h-[1px] bg-stone-100" />

            {/* 2. XƯỞNG SẢN XUẤT (MOVED TO POSITION #2 - EASY DIRECT ACCESS!) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  Xưởng Sản Xuất
                </span>
                {selectedSupplier !== 'all' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSupplier('all');
                      setCurrentPage(1);
                    }}
                    className="text-[11px] text-[#8c1524] hover:underline font-semibold cursor-pointer"
                  >
                    Xóa chọn
                  </button>
                )}
              </div>
              
              {/* Quick Pills for instant 1-click supplier switching */}
              <div className="flex flex-wrap gap-1.5">
                {SUPPLIER_PILLS.map((sp) => {
                  const active = selectedSupplier === sp.value;
                  return (
                    <button
                      key={sp.value}
                      type="button"
                      onClick={() => {
                        setSelectedSupplier(sp.value);
                        setCurrentPage(1);
                      }}
                      className={`h-8 px-3 rounded-lg text-xs font-medium cursor-pointer transition-all whitespace-nowrap ${
                        active
                          ? 'bg-[#8c1524] text-white shadow-xs font-semibold'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      {sp.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="w-full h-[1px] bg-stone-100" />

            {/* 3. KHOẢNG GIÁ SỈ (Histogram Range Slider) */}
            <div>
              <PriceHistogramFilter
                min={50000}
                max={1000000}
                value={priceRange}
                onChange={(newRange) => {
                  setPriceRange(newRange);
                  setCurrentPage(1);
                }}
                resultCount={totalResults}
              />
            </div>

            <div className="w-full h-[1px] bg-stone-100" />

            {/* 4. SỐ LƯỢNG TỐI THIỂU (MOQ) */}
            <div>
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
                Số Lượng (MOQ)
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {MOQ_PILLS.map((pill) => {
                  const active = selectedMoq === pill.value;
                  return (
                    <button
                      key={pill.value}
                      type="button"
                      onClick={() => {
                        setSelectedMoq(pill.value);
                        setCurrentPage(1);
                      }}
                      className={`h-8 px-2 rounded-lg text-xs font-semibold cursor-pointer transition-all whitespace-nowrap text-center ${
                        active
                          ? 'bg-[#8c1524] text-white'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="w-full h-[1px] bg-stone-100" />

            {/* 5. DỊCH VỤ THƯƠNG HIỆU */}
            <div>
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
                Dịch Vụ
              </span>
              <div
                onClick={() => {
                  setOnlyCustomPackaging(!onlyCustomPackaging);
                  setCurrentPage(1);
                }}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  onlyCustomPackaging
                    ? 'bg-rose-50/60 border-[#8c1524]/40'
                    : 'bg-stone-50 border-stone-200/80 hover:bg-stone-100'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-bold text-stone-900 leading-tight">
                    In Logo &amp; Khắc Laser
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Miễn phí từ 30 hộp
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center shrink-0 text-white text-[10px] ${
                    onlyCustomPackaging ? 'bg-[#8c1524]' : 'border border-stone-300 bg-white'
                  }`}
                >
                  {onlyCustomPackaging && '✓'}
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT: PRODUCT LIST */}
          <section className="flex-1 min-w-0 flex flex-col gap-4">
            
            {/* Control Bar */}
            <div className="bg-white px-4 sm:px-5 py-3 rounded-2xl border border-stone-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-stone-900 whitespace-nowrap">
                  {totalResults} sản phẩm
                </span>
                
                {/* Active Category Tags */}
                {selectedCategories.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1 ml-2">
                    {selectedCategories.map((catKey) => {
                      const found = CATEGORY_OPTIONS.find((c) => c.value === catKey);
                      return (
                        <Tag
                          key={catKey}
                          closable
                          onClose={() =>
                            setSelectedCategories((prev) => prev.filter((k) => k !== catKey))
                          }
                          color="volcano"
                          style={{ borderRadius: 6, fontSize: 11, margin: 0 }}
                        >
                          {found?.label || catKey}
                        </Tag>
                      );
                    })}
                  </div>
                )}

                {/* Active Supplier Tag */}
                {selectedSupplier !== 'all' && (
                  <Tag
                    closable
                    onClose={() => setSelectedSupplier('all')}
                    color="gold"
                    style={{ borderRadius: 6, fontSize: 11, margin: 0 }}
                  >
                    Xưởng: {SUPPLIER_PILLS.find((s) => s.value === selectedSupplier)?.label}
                  </Tag>
                )}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-stone-500 font-medium whitespace-nowrap">Sắp xếp:</span>
                <Select
                  value={sortBy}
                  onChange={setSortBy}
                  style={{ minWidth: 200 }}
                  options={[
                    { value: 'reputation', label: 'Điểm uy tín xưởng' },
                    { value: 'price_asc', label: 'Giá sỉ: Thấp đến Cao' },
                    { value: 'price_desc', label: 'Giá sỉ: Cao đến Thấp' },
                    { value: 'min_qty', label: 'MOQ nhỏ nhất trước' },
                  ]}
                />
              </div>
            </div>

            {/* EMPTY STATE */}
            {totalResults === 0 ? (
              <EmptyFilterState
                keyword={searchText}
                activeFiltersCount={activeFiltersCount}
                onResetFilters={handleResetFilters}
                onClearKeyword={() => setSearchText('')}
              />
            ) : (
              /* CLEAN PRODUCT GRID */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                {paginatedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Product Thumbnail with Badges */}
                      <div
                        className="relative w-full aspect-[16/10] overflow-hidden bg-stone-100 cursor-pointer"
                        onClick={() => handleSelectProduct(p.id)}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-80" />

                        {/* Top-left: Rating */}
                        <div className="absolute top-2.5 left-2.5 z-10">
                          <span
                            className="px-2 py-0.5 rounded text-[11px] font-bold text-white shadow-xs backdrop-blur-md whitespace-nowrap"
                            style={{ background: p.badgeColor }}
                          >
                            {p.badge} · {p.reputationScore}đ
                          </span>
                        </div>

                        {/* Top-right: Custom Branding */}
                        {p.packagingSupported && (
                          <div className="absolute top-2.5 right-2.5 z-10">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-600 text-white shadow-xs whitespace-nowrap">
                              In Logo
                            </span>
                          </div>
                        )}

                        {/* Bottom Bar over Image */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs z-10">
                          <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[11px] font-medium whitespace-nowrap">
                            {p.categoryName}
                          </span>
                          <span className="text-[11px] font-bold text-amber-300 bg-black/60 px-2 py-0.5 rounded whitespace-nowrap">
                            {p.discountTag}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-4 flex flex-col gap-2">
                        {/* Supplier */}
                        <div className="text-stone-500 text-xs font-medium truncate">
                          {p.supplier}
                        </div>

                        {/* Title (2 lines) */}
                        <h3
                          className="text-sm font-bold text-stone-900 group-hover:text-[#8c1524] transition-colors leading-snug line-clamp-2 cursor-pointer min-h-[40px] m-0"
                          onClick={() => handleSelectProduct(p.id)}
                        >
                          {p.name}
                        </h3>

                        {/* Visual Spec Badges */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[11px] font-medium whitespace-nowrap">
                            {Array.isArray(p.variants)
                              ? p.variants.map((v) => (v.weight ? `${v.weight}g` : v.flavor)).join(' · ')
                              : p.variants || 'Nhiều phân loại'}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-rose-50 text-[#8c1524] text-[11px] font-bold whitespace-nowrap border border-rose-200/60">
                            MOQ: {p.minQty} hộp
                          </span>
                        </div>

                        {/* Pricing Row */}
                        <div className="mt-2 pt-2 border-t border-stone-100 flex items-baseline justify-between">
                          <div>
                            <span className="text-[11px] text-stone-400 line-through mr-1 whitespace-nowrap">
                              {p.originalPrice.toLocaleString('vi-VN')} ₫
                            </span>
                            <span className="text-base font-extrabold text-[#8c1524] whitespace-nowrap">
                              {p.price.toLocaleString('vi-VN')} ₫
                            </span>
                            <span className="text-[10px] text-stone-500"> / hộp</span>
                          </div>

                          <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                            {p.leadTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                      <Button
                        type="primary"
                        onClick={() => onNavigate?.('dat-hang-thiet-ke')}
                        style={{
                          background: '#8c1524',
                          borderColor: '#8c1524',
                          borderRadius: 8,
                          fontWeight: 700,
                          fontSize: 12,
                          height: 36,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Báo Giá Sỉ
                      </Button>
                      <Button
                        onClick={() => handleSelectProduct(p.id)}
                        style={{
                          borderRadius: 8,
                          fontWeight: 600,
                          fontSize: 12,
                          height: 36,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Chi Tiết
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalResults > PAGE_SIZE && (
              <div className="flex justify-center mt-6">
                <Pagination
                  current={currentPage}
                  total={totalResults}
                  pageSize={PAGE_SIZE}
                  onChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  showTotal={(total) => `${total} sản phẩm`}
                />
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
