# ==============================================================================
# B2B LUXURY PLATFORM - AGENT CODING & CODE GENERATION GUIDELINES
# ==============================================================================

Mọi Agent AI khi sinh mã (generate code), sửa đổi (refactor), hoặc review mã nguồn trong dự án này BẮT BUỘC phải tuân thủ nghiêm ngặt các quy tắc dưới đây:

---

## 1. QUY TẮC CỐT LÕI (CORE CODING RULES)

### 1.1. Thụt lề & Định dạng (Indentation & Formatting)
- **Tab size:** Bắt buộc **2 spaces (indent size = 2)** cho TẤT CẢ các file (`.js`, `.jsx`, `.css`, `.json`, `.md`, `.html`).
- **Tuyệt đối không dùng hard tab (`\t`)**.
- **Cuối dòng:** Sử dụng LF (`\n`), tự động xóa khoảng trắng dư thừa ở cuối dòng (trim trailing whitespace).
- **Dòng cuối:** Luôn kết thúc file bằng một dòng trống mới (final newline).
- **Độ dài dòng khuyến nghị:** Tối đa 100 ký tự (soft wrap nếu quá dài).

### 1.2. Chuẩn mã nguồn JavaScript / JSX (ECMAScript 2024+)
- **Dấu chấm phẩy (Semicolons):** Bắt buộc dùng dấu chấm phẩy `;` kết thúc mỗi câu lệnh.
- **Dấu nháy (Quotes):**
  - File JS/JSX: Sử dụng dấu nháy đơn `'...'` cho chuỗi thông thường.
  - JSX Attributes: Sử dụng dấu nháy kép `"..."` cho HTML/JSX attributes (`className="..."`, `id="..."`).
- **Khai báo biến:**
  - Bắt buộc dùng `const` theo mặc định.
  - Chỉ dùng `let` khi giá trị biến thực sự cần gán lại (reassign).
  - **TUYỆT ĐỐI KHÔNG DÙNG `var`**.
- **Hàm & Arrow Functions:**
  - Khuyến khích dùng Arrow Functions `const fn = () => {}` cho callbacks, hooks handlers.
  - Sử dụng Functional Component dạng `export default function ComponentName() {}` hoặc `export const ComponentName = () => {}`.
- **Destructuring & Modern Syntax:**
  - Ưu tiên Object & Array destructuring với giá trị mặc định.
  - Sử dụng Optional Chaining (`?.`) và Nullish Coalescing (`??`) thay vì chuỗi điều kiện lồng nhau `a && a.b && a.b.c`.
  - Luôn sử dụng Template Literals (backticks) khi nối chuỗi: `${baseURL}/${endpoint}`.

---

## 2. KIẾN TRÚC PHÂN TẦNG DOANH NGHIỆP (ENTERPRISE LAYERED ARCHITECTURE)

Mọi code mới sinh ra phải được đặt đúng tầng trách nhiệm:

```text
src/
├── constants/    # Hằng số, API endpoints, routes, roles (KHÔNG đặt logic)
├── services/     # Tầng gọi API qua apiClient (Axios), KHÔNG gọi fetch/axios trực tiếp từ View
├── utils/        # Hàm thuần túy (pure functions): formatters, validators, storage helpers
├── context/      # Quản lý state toàn cục (Auth, Cart, Notification)
├── hooks/        # Custom React Hooks tách biệt logic khỏi UI
├── components/   # Giao diện dùng chung (Header, Footer, Button, Modal, Card)
└── Pages/        # Màn hình chức năng (HomePage, SearchPage, Customer, Supplier, Admin)
```

---

## 3. NGUYÊN TẮC GIAO TIẾP API & BACKEND (API & AXIOS RULES)

1. **Không hardcode URL:** Luôn khai báo endpoint trong `src/constants/apiEndpoints.js` và lấy biến môi trường từ `import.meta.env`.
2. **Sử dụng apiClient tập trung:** Mọi request mạng phải đi qua `src/services/apiClient.js` (Axios instance đã cấu hình sẵn Bearer Token, Timeout 15s, Error handling).
3. **Mock Fallback Pattern:** Khi viết service mới, luôn bọc try/catch và cung cấp fallback mock data khi cờ `VITE_ENABLE_MOCK_FALLBACK=true` để Frontend có thể chạy độc lập ngay cả khi Backend chưa bật.
4. **Xử lý bất đồng bộ:** Luôn dùng `async/await` kèm `try...catch...finally` sạch sẽ, quản lý trạng thái `isLoading`, `error` rõ ràng trên giao diện.

---

## 4. QUY TẮC PHÁT TRIỂN GIAO DIỆN REACT (REACT & UI/UX RULES)

1. **Design System & Tailwind CSS:**
   - Sử dụng bảng màu sang trọng (Luxury Gold, Amber, Deep Stone) của dự án.
   - Thêm micro-animations tinh tế (`transition-all duration-200`, `hover:scale-[1.02]`, hover shadows).
2. **Accessibility & Semantic HTML:**
   - Dùng đúng thẻ semantic: `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`, `<button>`, `<label>`.
   - Các nút icon hoặc tương tác bắt buộc có `aria-label` hoặc tooltip.
   - Ảnh bắt buộc có thuộc tính `alt` mô tả rõ ràng.
3. **State Management & Re-renders:**
   - Không lạm dụng `useEffect` cho các tính toán có thể derive trực tiếp từ props/state.
   - Tránh re-render không cần thiết bằng cách phân chia component con hợp lý.

---

## 5. BẢO MẬT & KIỂM THỬ (SECURITY & TESTING)

1. **Bảo mật biến môi trường:** Tuyệt đối không commit file `.env`, mật khẩu, Private Key, JWT Secret vào git.
2. **Kiểm tra tính toàn vẹn (Zero Error Build):** Sau mỗi lần sinh code hoặc sửa đổi lớn, Agent PHẢI chạy lệnh `npm run build` để kiểm tra 0 lỗi trước khi bàn giao.
3. **Bảo toàn comment:** Luôn giữ lại các comment hướng dẫn, docstrings nghiệp vụ quan trọng trong code hiện hữu.
