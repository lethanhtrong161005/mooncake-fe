# Tiêu Chuẩn Phát Triển Giao Diện React 19 (React Architecture Rules)

Áp dụng cho việc sinh mã và sửa đổi components React trong dự án:

## 1. Cấu Trúc Component (Component Anatomy)
- Mỗi file Component chỉ nên đảm nhiệm một nhiệm vụ duy nhất (Single Responsibility Principle).
- Cấu trúc chuẩn bên trong một Functional Component:
  ```jsx
  // 1. Imports
  import { useState, useEffect, useMemo } from 'react';
  import { useAuth } from '../hooks/useAuth';
  import { formatCurrency } from '../utils/formatters';

  // 2. Component Definition
  export default function ProductCard({ product, onSelect }) {
    // 2.1 Hooks & State
    const [isHovered, setIsHovered] = useState(false);
    const { isLoggedIn } = useAuth();

    // 2.2 Derived State & Memoization
    const formattedPrice = useMemo(() => {
      return formatCurrency(product.price);
    }, [product.price]);

    // 2.3 Event Handlers
    const handleClick = () => {
      if (onSelect) onSelect(product);
    };

    // 2.4 Render JSX
    return (
      <div 
        className="group relative rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h3 className="font-semibold text-stone-900">{product.name}</h3>
        <p className="text-amber-600 font-bold">{formattedPrice}</p>
        <button 
          onClick={handleClick}
          className="mt-3 w-full rounded-lg bg-amber-600 py-2 text-white font-medium hover:bg-amber-700"
        >
          Xem Chi Tiết
        </button>
      </div>
    );
  }
  ```

## 2. Quản Lý Trạng Thái & Hooks (State & Hooks)
- Không lưu trữ các giá trị có thể tính toán trực tiếp từ `props` hoặc `state` vào một state mới.
- Khai báo đầy đủ dependencies trong `useEffect`. Nếu cần cleanup event listeners hoặc timers, luôn trả về hàm dọn dẹp (cleanup function).
- Tránh truyền props quá 3 cấp (prop drilling); sử dụng React Context hoặc Custom Hooks thay thế.

## 3. Quy Tắc Viết Tailwind CSS & Giao Diện Luxury
- Ưu tiên sử dụng bảng màu và lớp tiện ích đã được chuẩn hóa trong dự án:
  - Tông chính: `amber-600`, `amber-700`, `yellow-500` (Gold Luxury).
  - Tông nền & chữ: `stone-900`, `stone-800`, `stone-600`, `stone-100`, `white`.
  - Hiệu ứng: `backdrop-blur-md`, `transition-all duration-200`, `shadow-sm` đến `shadow-xl`.
- Không lạm dụng inline styles `style={{ ... }}` trừ khi bắt buộc đối với các giá trị động không cố định (như dynamic background image URL hoặc vị trí tính toán).

## 4. Khả Năng Tiếp Cận (Accessibility - A11y)
- Mọi thẻ `<button>` dạng icon hoặc không có chữ hiển thị đều phải có thuộc tính `aria-label`.
- Mọi thẻ `<img>` đều phải có thuộc tính `alt` mô tả nội dung hình ảnh.
- Sử dụng đúng thẻ semantic (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
