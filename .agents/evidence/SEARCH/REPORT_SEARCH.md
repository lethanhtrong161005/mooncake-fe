# Báo Cáo Kiểm Thử & Thiết Kế Lại Trang Tìm Kiếm B2B (`#tim-kiem`)

- **Ngày thực hiện:** 2026-11-07
- **URL kiểm thử:** `http://localhost:5173/#tim-kiem`
- **API Backend:** `GET http://localhost:8089/api/v1/products`
- **Cơ sở dữ liệu:** PostgreSQL (Supabase) — **64 sản phẩm B2B** đã xuất bản (bao gồm 36 sản phẩm bộ dữ liệu kiểm thử chuẩn `TEST-SEARCH-P01`..`P36` trải đều 4 danh mục và 3 khu vực `HCM`, `HN`, `DN`).

---

## 1. Đối Chiếu Baseline (`T0_baseline`) vs. Sau Khi Thiết Kế Lại (`AFTER`)

| Hạng mục | Trước khi sửa (`T0_baseline`) | Sau khi sửa (`AFTER`) | Bằng chứng |
| :--- | :--- | :--- | :--- |
| **Kích thước trang mặc định (`pageSize`)** | Cố định `pageSize=24`, `showSizeChanger={false}` | Mặc định **`pageSize=10`** cả FE & BE, cho phép chọn `10 / 20 / 50 / 100` trên thanh công cụ và `Pagination` | `T0_baseline/T0_01_initial_load_maxPrice_1000000_bug.png` vs `AFTER/S1_01_initial_load_pageSize10_all_prices.png` |
| **Tham số phân trang (`pageNumber` & `pageSize`)** | Chỉ có `page` nội bộ trong React state, không đồng bộ URL | Hỗ trợ đầy đủ `pageNumber` & `pageSize` trên cả Backend DTO (`ProductSearchQuery`) và URL hash `#tim-kiem?pageNumber=1&pageSize=10` | `AFTER/S2_01_pagination_page2_disjoint_items.png`, `AFTER/S3_01_pageSize20_resets_to_page1.png` |
| **Lỗi ẩn sản phẩm > 1.000.000đ khi vừa mở trang** | State mặc định `price=[0, 1000000]` gửi `maxPrice=1000000` ngay khi mở trang, làm ẩn **13 sản phẩm cao cấp** (`51/64` sản phẩm) | Mặc định `minPrice=null, maxPrice=null` (không giới hạn trần giá khi chưa lọc), hiển thị đủ **64/64 sản phẩm** | `T0_baseline/api/01_initial_search_query_and_response.json` vs `AFTER/S1_01_initial_load_pageSize10_all_prices.png` |
| **Lỗi tụt trần thanh trượt giá (`Slider ceiling`)** | Trần `Slider` tính theo `facets.maxPrice` của tập kết quả đã lọc nên bị co lại thành `1.000.000đ` sau khi lọc giá thấp | `useProductSearch` lưu `priceCeiling` theo mức giá cao nhất của catalog (`3.600.000đ`), không bị co lại khi lọc `Dưới 500K` | `T0_baseline/T0_02_slider_ceiling_and_no_url_sync_bug.png` vs `AFTER/S6_01_price_filter_and_ceiling_preserved.png` |
| **Lỗi lọc Danh mục & Khu vực (`categoryIds[]` Axios serialization)** | Axios mặc định serialize mảng kèm dấu `[]` (`categoryIds[]=...`) khiến ASP.NET Core `[FromQuery]` bỏ qua bộ lọc danh mục | Chuẩn hóa `paramsSerializer` trong `productService.js` (`categoryIds=...&regionCodes=...`), lọc chính xác 100% theo danh mục & khu vực | `AFTER/S5_01_category_and_region_filter.png` |
| **Lỗi nháy thông báo lỗi ~1s khi tải lại trang (`AbortController`)** | `apiClient` biến `CanceledError` thành lỗi mạng và `SearchPage` nuốt lỗi hoặc nháy lỗi khi `<StrictMode>` hủy request đầu | `apiClient` giữ nguyên `CanceledError` và `useProductSearch` kiểm tra `controller.signal.aborted`, không bao giờ nháy lỗi giả khi reload | `AFTER/S1_01_initial_load_pageSize10_all_prices.png`, `AFTER/S11_01_api_error_alert_with_retry.png` |
| **Bộ lọc B2B chuyên sâu & Sắp xếp** | Thiếu lọc Khu vực (`HCM`/`HN`/`DN`), Điểm uy tín, MOQ; thiếu sắp xếp `bestSelling`, `rating` | Đầy đủ lọc Danh mục, Khoảng giá + Presets, Khu vực, Uy tín (`≥80/90/95`), MOQ (`≤10/20/50/100`), Bao bì in logo, Còn hàng, cùng 7 chế độ sắp xếp và 2 chế độ xem (`Grid` / `List`) | `AFTER/S7_01_b2b_reputation_moq_custom_instock.png`, `AFTER/S8_01_sort_priceDesc_and_list_view.png` |
| **Giao diện Responsive Mobile / Tablet / Desktop** | Sidebar bộ lọc xếp chồng chiếm toàn bộ màn hình đầu trên mobile `375px` | Tự động chuyển bộ lọc sang `Drawer` trượt kèm `Badge` đếm số bộ lọc trên mobile (`< 768px`), không tràn ngang (`scrollWidth == clientWidth`) trên cả 5 kích thước màn hình | `T0_baseline/T0_03_mobile_unoptimized_filter_stack.png` vs `responsive/resp_01_mobile_375x812.png`, `responsive/resp_01b_mobile_filter_drawer_375x812.png` |

---

## 2. Kết Quả Kiểm Thử Tự Động Backend & E2E Playwright

### 2.1. Backend Integration Tests (`Module3ProductsControllerHttpTests`)
- **Lệnh thực thi:** `dotnet test --filter "FullyQualifiedName~Module3ProductsControllerHttpTests"`
- **Kết quả:** **24 / 24 PASSED** (0 Failed), bao gồm 2 test mới:
  1. `Search_DefaultsToPageSize10_AndAcceptsPageNumberQuery`
  2. `Search_Returns400BadRequest_WhenPageSizeExceeds100OrSortInvalid`

### 2.2. Kịch Bản E2E Chức Năng (`scripts/run_search_e2e.mjs`)

| Mã | Kịch bản kiểm thử | Kết quả | Chi tiết xác minh & Ảnh chụp màn hình |
| :--- | :--- | :---: | :--- |
| **S1** | Mặc định mở trang `#tim-kiem` (`pageNumber=1`, `pageSize=10`, không ép `maxPrice=1000000`, không nháy lỗi khi reload) | **PASSED** | `totalCount = 64`, render đúng `10` card, thanh công cụ hiển thị `Hiển thị 1–10 trong tổng số 64 sản phẩm phù hợp`. Ảnh: `AFTER/S1_01_initial_load_pageSize10_all_prices.png` |
| **S2** | Chuyển sang Trang 2 (`pageNumber=2&pageSize=10`) | **PASSED** | URL cập nhật `#tim-kiem?pageNumber=2&pageSize=10`, hiển thị `11–20`, tập ID sản phẩm Trang 1 và Trang 2 rời nhau tuyệt đối (`overlapCount = 0`). Ảnh: `AFTER/S2_01_pagination_page2_disjoint_items.png` |
| **S3** | Đổi `pageSize` sang `20 / trang` | **PASSED** | Tự động reset về `pageNumber=1`, URL `#tim-kiem?pageNumber=1&pageSize=20`, render đúng `20` card. Ảnh: `AFTER/S3_01_pageSize20_resets_to_page1.png` |
| **S4** | Tìm kiếm từ khóa `"Hoàng Kim"` & Chip bộ lọc đang bật | **PASSED** | Khớp `12` sản phẩm, hiển thị chip `Từ khóa: "Hoàng Kim"` có nút xóa nhanh. Ảnh: `AFTER/S4_01_keyword_search_hoang_kim.png` |
| **S5** | Lọc kết hợp Danh mục (`Bánh nướng truyền thống`) + Khu vực (`TP. Hồ Chí Minh`) | **PASSED** | Khớp `5` sản phẩm, 100% sản phẩm trả về thuộc đúng danh mục `Bánh nướng truyền thống` và `shop.regionCode === "HCM"`. Ảnh: `AFTER/S5_01_category_and_region_filter.png` |
| **S6** | Lọc khoảng giá (`Trên 1 Triệu`, `Dưới 500K`) & giữ nguyên trần Slider | **PASSED** | Lọc `Trên 1 Triệu` trả về `18` sản phẩm cao cấp (`maxPrice >= 1.000.000đ`); khi chuyển sang `Dưới 500K`, trần Slider vẫn giữ nguyên `3.600.000đ`. Ảnh: `AFTER/S6_01_price_filter_and_ceiling_preserved.png` |
| **S7** | Lọc B2B nâng cao (`Uy tín ≥ 90`, `MOQ ≤ 20 hộp`, `Có bao bì tuỳ chỉnh`, `Còn hàng`) | **PASSED** | Khớp `9` sản phẩm, 100% thỏa mãn cả 4 điều kiện B2B. Ảnh: `AFTER/S7_01_b2b_reputation_moq_custom_instock.png` |
| **S8** | Sắp xếp `Giá giảm dần` (`priceDesc`) & chuyển chế độ xem Danh sách (`List View`) | **PASSED** | Giá giảm dần nghiêm ngặt (`3.600.000đ -> 3.200.000đ -> 2.800.000đ...`), giao diện `List View` hiển thị đầy đủ thông tin B2B. Ảnh: `AFTER/S8_01_sort_priceDesc_and_list_view.png` |
| **S9** | Truy cập URL vượt quá số trang (`#tim-kiem?pageNumber=999&pageSize=10`) | **PASSED** | Tự động điều chỉnh (`auto-clamp`) về trang hợp lệ cuối cùng `#tim-kiem?pageNumber=7&pageSize=10` (hiển thị 4 sản phẩm cuối). Ảnh: `AFTER/S9_01_out_of_range_page_auto_clamped.png` |
| **S10** | Trạng thái rỗng (`Empty State`) & nút `"Xóa tất cả bộ lọc"` | **PASSED** | Hiển thị `Empty` kèm nút `"Xóa tất cả bộ lọc"`, bấm nút khôi phục ngay 10 sản phẩm trang 1. Ảnh: `AFTER/S10_01_empty_state_with_reset_cta.png` |
| **S11** | Cảnh báo lỗi API (`500 Internal Server Error`) & nút `"Thử lại"` | **PASSED** | Hiển thị `Alert` lỗi rõ ràng kèm nút `"Thử lại"`, bấm `"Thử lại"` tải lại danh sách thành công. Ảnh: `AFTER/S11_01_api_error_alert_with_retry.png` |

---

## 3. Kiểm Thử Giao Diện Responsive (5 Kích Thước Màn Hình)

| Thiết bị / Khung nhìn | Độ phân giải | `clientWidth` | `scrollWidth` | Tràn ngang (`Overflow`) | Kết quả | Ảnh chụp bằng chứng |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Mobile Small (iPhone SE/13 Mini)** | `375 x 812` | `375px` | `375px` | Không (`false`) | **PASSED** | `responsive/resp_01_mobile_375x812.png`, `responsive/resp_01b_mobile_filter_drawer_375x812.png` |
| **Mobile Large (iPhone 15 Pro Max)** | `430 x 932` | `430px` | `430px` | Không (`false`) | **PASSED** | `responsive/resp_02_mobile_large_430x932.png` |
| **Tablet Portrait (iPad Mini/Air)** | `768 x 1024` | `768px` | `768px` | Không (`false`) | **PASSED** | `responsive/resp_03_tablet_768x1024.png` |
| **Laptop Standard** | `1440 x 900` | `1440px` | `1440px` | Không (`false`) | **PASSED** | `responsive/resp_04_desktop_1440x900.png` |
| **Desktop Full HD** | `1920 x 1080` | `1920px` | `1920px` | Không (`false`) | **PASSED** | `responsive/resp_05_fhd_1920x1080.png` |

---

## 4. Kiểm Tra Tuân Thủ Quy Chuẩn Code (`.agents/AGENTS.md` & `react-architecture.md`)

- **Kiến trúc phân lớp:**
  - `src/constants/productSearch.js`: Hằng số phân trang (`DEFAULT_PAGE_SIZE = 10`, `PAGE_SIZE_OPTIONS = [10, 20, 50, 100]`), tùy chọn sắp xếp, uy tín, MOQ, nhãn khu vực.
  - `src/utils/searchQuery.js` & `src/utils/formatCurrency.js`: Hàm thuần (pure functions) xử lý parse/serialize URL query `#tim-kiem?...` và định dạng tiền tệ VNĐ.
  - `src/hooks/useProductSearch.js`: Custom hook quản lý đồng bộ URL hash, `AbortController`, debounce tìm kiếm, gợi ý `autocomplete`, bảo toàn trần giá `priceCeiling` và tự động giới hạn trang vượt quá phạm vi (`auto-clamp`).
  - `src/components/search/`: 5 component chuyên biệt (`SearchFilterPanel`, `SearchToolbar`, `ActiveFilterChips`, `ProductSearchCard`, `SearchResultsGrid`) sử dụng 100% Ant Design.
- **Kiểm tra tĩnh & Build:**
  - `npx eslint`: **0 lỗi, 0 cảnh báo**.
  - `npm run build`: **Build thành công (0 lỗi)**.

