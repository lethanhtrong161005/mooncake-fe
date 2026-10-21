# Quy Tắc Định Dạng Mã Nguồn (Code Formatting Rules)

Agent bắt buộc tuân thủ các quy tắc format dưới đây khi đọc, ghi hoặc sinh mã trong dự án:

## 1. Thụt lề (Indentation)
- **Kích thước thụt lề (Tab Size):** Bắt buộc **2 khoảng trắng (2 spaces)** cho mỗi cấp độ thụt lề.
- **Loại thụt lề:** Luôn sử dụng khoảng trắng (spaces), **không bao giờ sử dụng ký tự tab (`\t`)**.
- Áp dụng cho mọi định dạng: JavaScript (`.js`), JSX (`.jsx`), CSS (`.css`), JSON (`.json`), HTML (`.html`), Markdown (`.md`).

## 2. Dấu kết thúc câu lệnh (Semicolons)
- Luôn đặt dấu chấm phẩy `;` ở cuối mỗi câu lệnh.
- Không để trình phân tích JS phải đoán Automatic Semicolon Insertion (ASI).

## 3. Dấu nháy (Quotes)
- **Chuỗi JavaScript thông thường:** Sử dụng dấu nháy đơn `'...'`.
- **JSX Attributes:** Sử dụng dấu nháy kép `"..."` (Ví dụ: `<Button type="primary" className="btn-luxury">`).
- **Nối chuỗi động:** Bắt buộc dùng Template Literals `` `Hello ${name}` ``.

## 4. Khoảng trắng & Dấu cách (Spacing)
- Đặt 1 khoảng trắng quanh các toán tử gán, so sánh, số học (`=`, `===`, `+`, `-`, `=>`).
- Đặt 1 khoảng trắng sau dấu phẩy `,` và dấu hai chấm `:`.
- Đặt 1 khoảng trắng bên trong ngoặc nhọn của object literal: `{ id: 1, name: 'Bánh Trung Thu' }`.
- Không để khoảng trắng thừa trước dấu chấm phẩy hoặc dấu ngoặc đóng.

## 5. Dấu phẩy cuối dòng (Trailing Commas)
- Sử dụng dấu phẩy cuối dòng (trailing comma) cho object hoặc array trải dài trên nhiều dòng:
  ```javascript
  const product = {
    id: 'prod-01',
    name: 'Bánh Dẻo Hạt Sen',
    price: 350000,
  };
  ```

## 6. Quy ước đặt tên (Naming Conventions)
- **Biến và Hàm thông thường:** `camelCase` (ví dụ: `fetchProductList`, `currentUser`, `handleSubmit`).
- **React Components & Custom Context:** `PascalCase` (ví dụ: `CustomerHeader`, `LoginPopup`, `AuthContext`).
- **Hằng số toàn cục (Constants):** `UPPER_SNAKE_CASE` (ví dụ: `API_BASE_URL`, `DEFAULT_TIMEOUT`, `USER_ROLES`).
- **Custom Hooks:** Bắt đầu bằng tiền tố `use` theo `camelCase` (ví dụ: `useAuth`, `useDebounce`).
- **File Components:** Tên file trùng tên Component theo `PascalCase` (`LoginPopup.jsx`).
- **File Utilities/Services:** `camelCase` (`apiClient.js`, `formatters.js`).

## 7. Quy Tắc Bắt Buộc Giao Diện Ant Design (Mandatory Ant Design JSX)
- Khi code tính năng UI mới hoặc sửa giao diện: **100% sử dụng component của `antd`** (`Button`, `Input`, `Select`, `Card`, `Modal`, `Table`, `Tag`, `Typography`, `Row`, `Col`, `Space`, v.v.) và icon `@ant-design/icons`.
- **Tuyệt đối cấm** viết các thẻ HTML trần cho tương tác như `<button>`, `<input>`, `<select>`, `<dialog>`, `<table>`.
- Thuộc tính component Ant Design phải tuân thủ chuẩn props của thư viện (`type="primary"`, `size="middle"`, `icon={<... />}`, `loading={...}`).

