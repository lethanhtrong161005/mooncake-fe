# Chuẩn Mã Nguồn JavaScript Doanh Nghiệp (JavaScript Standards)

Áp dụng cho toàn bộ mã JavaScript / ES2024+ trong dự án:

## 1. Khai báo biến (Variable Declarations)
- Mặc định sử dụng `const` cho mọi khai báo.
- Chỉ dùng `let` khi giá trị biến thực sự cần gán lại (reassign).
- **Tuyệt đối cấm sử dụng `var`**.

## 2. Xử lý Mảng & Đối tượng (Array & Object Manipulation)
- Sử dụng Object Destructuring với giá trị mặc định:
  ```javascript
  const { phone = '', password = '', rememberMe = true } = payload;
  ```
- Sử dụng cú pháp Spread Operator (`...`) để clone hoặc cập nhật immutable:
  ```javascript
  const updatedUser = { ...currentUser, tier: 'VIP B2B' };
  ```
- Ưu tiên các phương thức mảng bậc cao (`map`, `filter`, `find`, `some`, `reduce`) thay vì vòng lặp `for` truyền thống.

## 3. Toán tử Hiện Đại (Modern Operators)
- Sử dụng Optional Chaining (`?.`) để truy xuất thuộc tính an toàn, tránh lỗi `Cannot read properties of undefined`:
  ```javascript
  const token = response?.data?.token;
  ```
- Sử dụng Nullish Coalescing (`??`) khi muốn fallback giá trị mặc định cho `null` hoặc `undefined` (tránh nhầm lẫn với số `0` hoặc chuỗi rỗng `""`):
  ```javascript
  const discount = product.discount ?? 0;
  ```
- Luôn sử dụng so sánh nghiêm ngặt `===` và `!==`, không dùng `==` hoặc `!=`.

## 4. Xử lý Bất Đồng Bộ & Bắt Lỗi (Async/Await & Error Handling)
- Sử dụng cú pháp `async / await` thay vì `.then().catch()` lồng nhau.
- Bọc các tác vụ gọi API hoặc I/O trong khối `try...catch...finally`:
  ```javascript
  async function loadData() {
    setIsLoading(true);
    try {
      const data = await productService.getFeaturedProducts();
      setProducts(data);
    } catch (error) {
      console.error('[Load Products Error]:', error.message);
      showToast('Không thể tải danh sách sản phẩm', 'error');
    } finally {
      setIsLoading(false);
    }
  }
  ```

## 5. Module & Import/Export
- Sử dụng ES Module (`import` / `export`), không dùng CommonJS (`require` / `module.exports`).
- Sắp xếp thứ tự import theo nhóm chuẩn:
  1. React & Core Hooks (`react`)
  2. UI Framework Ant Design (`antd`) & Icons (`@ant-design/icons`)
  3. Thư viện bên ngoài khác (`axios`, v.v.)
  4. Project Custom Components & Hooks (`useAuth`, `ColonyAdminLayout`, `CustomerHeader`)
  5. Services & API Client (`authService`, `apiClient`)
  6. Constants & Utilities (`apiEndpoints`, `formatters`)
  7. Assets & CSS Stylesheets

