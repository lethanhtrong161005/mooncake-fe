# Quy Định Giao Tiếp API & Axios Service (API & Axios Guidelines)

Áp dụng cho mọi tác vụ kết nối với Backend ASP.NET Core 8 Web API:

## 1. Không Gọi Trực Tiếp từ Component Giao Diện
- Tuyệt đối KHÔNG gọi `axios.get()`, `axios.post()` hoặc `fetch()` trực tiếp từ bên trong các Component giao diện (`Pages/` hoặc `components/`).
- Mọi cuộc gọi mạng phải được bao bọc trong một hàm nghiệp vụ cụ thể nằm tại thư mục `src/services/` (ví dụ: `authService.js`, `productService.js`, `orderService.js`).

## 2. Quản Lý Endpoint Tập Trung
- Mọi đường dẫn URL endpoint phải được khai báo trong file `src/constants/apiEndpoints.js`.
- Không hardcode các chuỗi URL như `'/api/v1/auth/login'` trong code service.

## 3. Tương Thích Chuẩn Envelope `ApiResponse<T>`
- Backend ASP.NET Core trả về cấu trúc chuẩn:
  ```json
  {
    "status": 200,
    "message": "Thành công",
    "data": { ... },
    "errors": null,
    "path": "/api/v1/...",
    "traceId": "...",
    "time": "2026-10-12T..."
  }
  ```
- Axios Interceptor trong `src/services/apiClient.js` đã tự động giải phóng và trả về `response.data`. Do đó, khi nhận kết quả:
  - `response.data` chứa payload dữ liệu chính.
  - `response.message` chứa thông điệp từ máy chủ.
  - `response.status` chứa mã trạng thái HTTP.

## 4. Chiến Lược Dự Phòng Dữ Liệu Ảo (Mock Fallback Strategy)
- Để đảm bảo đội ngũ Frontend có thể tiếp tục phát triển giao diện ngay cả khi Backend chưa bật, mọi hàm service mới sinh ra PHẢI hỗ trợ cờ `VITE_ENABLE_MOCK_FALLBACK`:
  ```javascript
  const ENABLE_MOCK_FALLBACK = import.meta.env.VITE_ENABLE_MOCK_FALLBACK !== 'false';

  export const exampleService = {
    async getItems() {
      try {
        const response = await apiClient.get(API_ENDPOINTS.EXAMPLE.LIST);
        return response.data || response;
      } catch (error) {
        if (ENABLE_MOCK_FALLBACK) {
          console.warn('[Mock Fallback Active]: returning sample items');
          return MOCK_SAMPLE_ITEMS;
        }
        throw error;
      }
    },
  };
  ```
