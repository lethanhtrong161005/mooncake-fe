# Tiêu Chuẩn Phát Triển Giao Diện React (React & Ant Design Architecture Rules)

Áp dụng bắt buộc cho việc sinh mã, thêm tính năng UI mới và refactor components trong dự án:

---

## 1. QUY TẮC BẮT BUỘC SỬ DỤNG ANT DESIGN (MANDATORY ANTD DESIGN SYSTEM)

1. **Tuyệt đối không dùng thẻ HTML trần cho tương tác:**
   - Khi có thêm tính năng UI mới (nút bấm, input, bảng, thẻ, popup, thông báo, v.v.), **BẮT BUỘC 100%** phải sử dụng các components của **Ant Design (`antd`)** và bộ icon `@ant-design/icons`.
   - Bảng ánh xạ bắt buộc:
     | Yêu cầu UI | Component Ant Design Bắt Buộc | Tuyệt đối KHÔNG dùng |
     | :--- | :--- | :--- |
     | Nút bấm, hành động | `<Button type="primary/default/link" />` | `<button>` HTML trần |
     | Ô nhập dữ liệu, mật khẩu | `<Input />`, `<Input.Password />`, `<Input.Search />` | `<input>` HTML trần |
     | Lựa chọn danh sách | `<Select options={...} />` | `<select>`, `<option>` |
     | Hộp thoại, cửa sổ bật lên | `<Modal open={...} footer={...} />` | `<dialog>`, popup tự chế |
     | Thẻ hiển thị sản phẩm/tin | `<Card hoverable cover={...} />` | `<div>` tự code card |
     | Bảng danh sách dữ liệu | `<Table columns={...} dataSource={...} />` | `<table>`, `<tr>`, `<td>` |
     | Các bước quy trình (Step) | `<Steps items={...} current={...} />` | Stepper tự vẽ |
     | Thẻ nhãn, trạng thái | `<Tag color="...">...</Tag>` | `<span>` tự gắn badge |
     | Chấm đỏ số lượng, huy hiệu | `<Badge count={...} />` | `<span>` tự vẽ badge |
     | Biểu tượng tải trang | `<Spin indicator={...} />` | Loading spinner tự viết |
     | Cảnh báo, thông báo lỗi | `<Alert message={...} type="error/success" />` | Banner tự chế |
     | Màn hình kết quả, thành công | `<Result status="success/error" ... />` | Màn hình tự vẽ |
     | Số liệu thống kê, KPI | `<Statistic title="..." value={...} />` | Thẻ thống kê thô |

2. **Hệ màu & Design Tokens Luxury:**
   - Kế thừa và sử dụng theme tập trung từ `src/theme/antdTheme.js`.
   - Màu chủ đạo: Đỏ rượu vang hoàng gia (`#8c1524`), Vàng kim (`#d48806`, `#f5c840`), Nền ấm (`#faf8f6`), Viền tinh tế (`#ebdcd5`).

3. **Bố cục màn hình chuẩn (Layouts):**
   - **Phân hệ Khách hàng (Customer & Public):** Sử dụng `CustomerHeader` và `CustomerFooter` (tại `src/components/layout/`).
   - **Phân hệ Quản trị (Admin) & Xưởng (Supplier):** Bắt buộc sử dụng bố cục mẫu **Colony Admin Layout** (`src/components/layout/ColonyAdminLayout.jsx`).

---

## 2. Cấu Trúc Component Chuẩn (Component Anatomy)

Mỗi file component phải được cấu trúc rõ ràng theo chuẩn:

```jsx
// 1. Ant Design & React Imports
import { useState, useMemo } from 'react';
import { Card, Button, Tag, Space, Typography } from 'antd';
import { CheckCircleOutlined, ShopOutlined } from '@ant-design/icons';

// 2. Project Hooks & Utilities
import { useAuth } from '../hooks/useAuth';
import { formatCurrency } from '../utils/formatters';

const { Title, Text } = Typography;

// 3. Component Definition
export default function ProductCard({ product, onSelect }) {
  // 3.1 Hooks & State
  const { isLoggedIn } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  // 3.2 Derived Calculations
  const formattedPrice = useMemo(() => {
    return formatCurrency(product?.price || 0);
  }, [product?.price]);

  // 3.3 Event Handlers
  const handleSelect = () => {
    onSelect?.(product);
  };

  // 3.4 Render JSX (Sử dụng 100% Ant Design components)
  return (
    <Card
      hoverable
      bordered={false}
      style={{ borderRadius: 12, overflow: 'hidden' }}
      cover={
        <img
          alt={product?.name || 'Sản phẩm bánh'}
          src={product?.image || '/categories/banh-nuong.jpg'}
          style={{ height: 160, objectFit: 'cover' }}
        />
      }
      actions={[
        <Button
          type="primary"
          block
          icon={<ShopOutlined />}
          onClick={handleSelect}
          style={{ background: '#8c1524', borderColor: '#8c1524', fontWeight: 600 }}
        >
          Xem Chi Tiết
        </Button>,
      ]}
    >
      <Tag color="gold" style={{ marginBottom: 8, fontWeight: 700 }}>
        ★ Sản phẩm nổi bật
      </Tag>
      <Title level={5} style={{ margin: '0 0 4px', color: '#1f1f1f' }}>
        {product?.name}
      </Title>
      <Text style={{ color: '#8c1524', fontWeight: 700, fontSize: 16 }}>
        {formattedPrice}
      </Text>
    </Card>
  );
}
```

---

## 3. Khả Năng Tiếp Cận (Accessibility - A11y)
- Mọi nút icon đơn lẻ bắt buộc phải có thuộc tính `title` hoặc bọc trong `<Tooltip title="...">`.
- Mọi thẻ `<img>` bắt buộc phải có thuộc tính `alt` mô tả rõ ràng.
- Sử dụng đúng ngữ nghĩa thẻ wrapper (`<main>`, `<section>`, `<article>`, `<header>`, `<footer>`).

---

## 4. Quản Lý Trạng Thái & Tối Ưu Render
- Chia nhỏ các popup nhiều bước hoặc màn hình phức tạp thành các sub-components độc lập (như đã phân tách tại `src/Pages/Auth/`).
- Không đặt các tính toán dẫn xuất vào `useEffect`, hãy tính toán trực tiếp hoặc dùng `useMemo`.
