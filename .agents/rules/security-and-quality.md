# Tiêu Chuẩn Bảo Mật & Kiểm Soát Chất Lượng (Security & Quality Control)

Áp dụng cho mọi hoạt động sửa đổi hoặc sinh mã của Agent:

## 1. Bảo Mật Thông Tin & Môi Trường
- Tuyệt đối không commit các file nhạy cảm: `.env`, `.env.local`, file chứa Private Keys, Access Tokens.
- Mọi dữ liệu token xác thực phải được lưu trữ an toàn qua wrapper `src/utils/storage.js`.
- Tuyệt đối không sử dụng `dangerouslySetInnerHTML` với dữ liệu nhập từ người dùng mà chưa qua kiểm duyệt (sanitization).

## 2. Kiểm Soát Lỗi Trước Khi Bàn Giao (Zero-Breakage Guarantee)
- Trước khi kết thúc lượt phản hồi, Agent BẮT BUỘC phải thực thi lệnh build:
  ```bash
  npm run build
  ```
- Nếu xuất hiện bất kỳ cảnh báo biên dịch nghiêm trọng hoặc lỗi cú pháp (SyntaxError / TypeError), Agent phải tự động sửa chữa ngay lập tức.

## 3. Bảo Toàn Mã Nguồn & Bình Luận Nghiệp Vụ
- Giữ nguyên các ghi chú, docstrings và chú thích nghiệp vụ đã tồn tại trong file, trừ phi người dùng yêu cầu xóa bỏ hoặc sửa đổi cụ thể.
- Không tự ý xóa code của các phân hệ khác khi đang sửa một phân hệ cụ thể.
