# Báo cáo kiểm thử giao diện phân trang

Ngày chạy: 05/11/2026. Lệnh: `node scripts/run_paging_e2e.mjs`. Kết quả: **9/9 Playwright tests qua, 12 màn/bảng có ảnh**.

## Bằng chứng

| Màn | Mobile 375 | Mobile 430 | Tablet 768 | Desktop 1440 | Log API |
|---|---|---|---|---|---|
| Customer orders | [Ảnh](customer_orders/mobile_375.png) | [Ảnh](customer_orders/mobile_430.png) | [Ảnh](customer_orders/tablet_768.png) | [Ảnh](customer_orders/desktop_1440.png) | [JSON](customer_orders/api-log.json) |
| Supplier orders | [Ảnh](supplier_orders/mobile_375.png) | [Ảnh](supplier_orders/mobile_430.png) | [Ảnh](supplier_orders/tablet_768.png) | [Ảnh](supplier_orders/desktop_1440.png) | [JSON](supplier_orders/api-log.json) |
| Supplier deliveries | [Ảnh](supplier_deliveries/mobile_375.png) | [Ảnh](supplier_deliveries/mobile_430.png) | [Ảnh](supplier_deliveries/tablet_768.png) | [Ảnh](supplier_deliveries/desktop_1440.png) | [JSON](supplier_deliveries/api-log.json) |
| Supplier contracts | [Ảnh](supplier_contracts/mobile_375.png) | [Ảnh](supplier_contracts/mobile_430.png) | [Ảnh](supplier_contracts/tablet_768.png) | [Ảnh](supplier_contracts/desktop_1440.png) | [JSON](supplier_contracts/api-log.json) |
| Customer deliveries | [Ảnh](customer_deliveries/mobile_375.png) | [Ảnh](customer_deliveries/mobile_430.png) | [Ảnh](customer_deliveries/tablet_768.png) | [Ảnh](customer_deliveries/desktop_1440.png) | [JSON](customer_deliveries/api-log.json) |
| Supplier dashboard | [Ảnh](supplier_dashboard/mobile_375.png) | [Ảnh](supplier_dashboard/mobile_430.png) | [Ảnh](supplier_dashboard/tablet_768.png) | [Ảnh](supplier_dashboard/desktop_1440.png) | [JSON](supplier_dashboard/api-log.json) |
| Admin users | [Ảnh](admin_users/mobile_375.png) | [Ảnh](admin_users/mobile_430.png) | [Ảnh](admin_users/tablet_768.png) | [Ảnh](admin_users/desktop_1440.png) | [JSON](admin_users/api-log.json) |
| Admin audit | [Ảnh](admin_audit/mobile_375.png) | [Ảnh](admin_audit/mobile_430.png) | [Ảnh](admin_audit/tablet_768.png) | [Ảnh](admin_audit/desktop_1440.png) | [JSON](admin_audit/api-log.json) |
| Admin delivery disputes | [Ảnh](admin_delivery_disputes/mobile_375.png) | [Ảnh](admin_delivery_disputes/mobile_430.png) | [Ảnh](admin_delivery_disputes/tablet_768.png) | [Ảnh](admin_delivery_disputes/desktop_1440.png) | [JSON](admin_operations_api-log.json) |
| Admin refund cases | [Ảnh](admin_refund_cases/mobile_375.png) | [Ảnh](admin_refund_cases/mobile_430.png) | [Ảnh](admin_refund_cases/tablet_768.png) | [Ảnh](admin_refund_cases/desktop_1440.png) | [JSON](admin_operations_api-log.json) |
| Admin payout requests | [Ảnh](admin_payout_requests/mobile_375.png) | [Ảnh](admin_payout_requests/mobile_430.png) | [Ảnh](admin_payout_requests/tablet_768.png) | [Ảnh](admin_payout_requests/desktop_1440.png) | [JSON](admin_operations_api-log.json) |
| Admin contract disputes | [Ảnh](admin_contract_disputes/mobile_375.png) | [Ảnh](admin_contract_disputes/mobile_430.png) | [Ảnh](admin_contract_disputes/tablet_768.png) | [Ảnh](admin_contract_disputes/desktop_1440.png) | [JSON](admin_operations_api-log.json) |

Customer/Supplier orders và Admin users được kiểm tra thêm trang 2, trang cuối, đổi page size, status/role, tìm kiếm, empty state, reset và reload giữ query. Chín bảng còn lại được kiểm tra trang 2 và responsive. Test xác nhận `document.scrollWidth <= innerWidth` ở bốn viewport. Ảnh bổ sung nằm trong từng thư mục màn hình.

## Cách đọc kết quả

Mỗi API mock tạo 250 order/user/delivery/contract/audit/operation, sau đó trả trang theo query FE gửi. Điều này kiểm tra luồng UI và URL, không thay thế kiểm thử dữ liệu PostgreSQL. Chưa đo p95 hay kiểm chứng thao tác SQL trên 10.000 bản ghi; các màn ngoài ba danh sách chính chưa được kiểm tra đủ mọi tổ hợp filter/sort. Cần bổ sung các gate đó trước rollout.
