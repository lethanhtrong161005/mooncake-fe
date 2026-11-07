# Báo Cáo Nghiệm Thu Toàn Diện: Direct Bulk Order (Đơn Hàng Doanh Nghiệp)

**Dự án:** Nền tảng Thương mại Điện tử Bánh Trung thu Doanh nghiệp (Mooncake B2B Platform)  
**Tài liệu đặc tả:** `DIRECT_BULK_ORDER_ENTERPRISE_ANALYSIS.md`  
**Ngày hoàn thành:** 05/11/2026  
**Trạng thái kiểm thử:** **100% PASSED** trên toàn bộ 6 Pha (T0, P0, P1, P2, P3, P4, P5, P6)

---

## 1. Tóm Tắt Điều Hành (Executive Summary)

Đặc tả **Enterprise Direct Bulk Order** đã được triển khai hoàn chỉnh và nghiệm thu trên toàn bộ kiến trúc đa tầng:
- **Backend (.NET 8 Clean Architecture):** Domain Entities, EF Core Migrations trên Supabase PostgreSQL, Service Layer, Controllers, Pessimistic Row-level Locking (`SELECT ... FOR UPDATE`), Idempotent Outbox/Background Worker, SLA Deadlines, Multi-part Payment Schedule (trần 100.000.000 VND / đợt VNPay), Sổ cái tài chính mô phỏng (`Held`, `Disputed`, `Refunded`, `Eligible`, `PaidOutSimulated`).
- **Frontend (React 19 + Vite + Ant Design 6):** Cấu trúc lại giao diện Đặt hàng Doanh nghiệp đa dòng variant cùng Shop, Modal cam kết điều khoản pháp lý, Trình theo dõi tiến độ SLA/hạn chót, Drawer thanh toán VNPay nhiều đợt, Trình duyệt ảnh giao nhận PoD, Trình khiếu nại giao nhận, Bảng điều khiển tài chính Supplier & Admin Trading Operating.
- **Bằng chứng tự động (Evidence Collection):** Toàn bộ các bước từ Tái hiện lỗi Baseline (T0), Chặn rủi ro P0 (P0), Migration DB & Concurrency (P2), API Integration (P3) đến 10 Kịch bản E2E Browser Test (E1–E10) đều được chụp ảnh màn hình trình duyệt thực tế và ghi nhật ký JSON API độc lập.

---

## 2. Bảng Tổng Hợp 10 Kịch Bản E2E Browser (Pha 5)

| Mã | Tên Kịch Bản | Kết Quả | Các Ảnh Chụp Màn Hình Minh Chứng |
| :--- | :--- | :---: | :--- |
| **E1** | Happy Path: Đơn Hàng Doanh Nghiệp Tiêu Chuẩn | **PASSED** | `E1_01_customer_quote_preview_and_terms.png`<br>`E1_02_supplier_order_review.png`<br>`E1_03_customer_payment_schedule_and_deposit.png`<br>`E1_04_supplier_pod_photo_submission.png`<br>`E1_05_customer_pod_review_and_confirm.png`<br>`E1_06_supplier_eligible_balance_unlocked.png` |
| **E2** | Tranh Chấp Tồn Kho Đồng Thời (Stock Concurrency Race) | **PASSED** | `E2_01_stock_race_insufficient_stock_modal.png`<br>*(Race 1: 201 Created; Race 2: 409 INSUFFICIENT_STOCK)* |
| **E3** | Người Mua Yêu Cầu Hủy Thỏa Thuận & Nhả Tồn Kho | **PASSED** | `E3_01_customer_request_cancellation_modal.png`<br>`E3_02_supplier_review_cancellation.png`<br>`E3_03_order_cancelled_inventory_released.png` |
| **E4** | NCC Từ Chối Đơn Trong SLA 12 Giờ | **PASSED** | `E4_01_supplier_reject_order_modal.png` |
| **E5** | NCC Đề Xuất Lại Ngày Giao Hàng & Người Mua Chấp Thuận | **PASSED** | `E5_01_supplier_propose_delivery_date_modal.png`<br>`E5_02_customer_approve_proposed_date.png` |
| **E6** | Yêu Cầu Mockup Bao Bì Tùy Biến & Duyệt Phí Phát Sinh | **PASSED** | `E6_01_customer_packaging_brief_form.png`<br>`E6_02_supplier_mockup_and_change_request.png`<br>`E6_03_customer_approve_mockup_and_fee.png` |
| **E7** | Báo Cáo Khiếu Nại Giao Nhận PoD & Admin Phân Xử Hoàn Tiền | **PASSED** | `E7_01_customer_report_dispute_modal.png`<br>`E7_02_admin_trading_operating_dispute_queue.png`<br>`E7_03_admin_resolve_dispute_verdict.png` |
| **E8** | Thanh Toán Sau Khi Đơn Hết Hạn & Admin Xử Lý Hoàn Tiền | **PASSED** | `E8_01_admin_refund_case_queue.png`<br>`E8_02_admin_process_refund_case_modal.png` |
| **E9** | Tách Lượt Thanh Toán VNPay Trần 100M VND | **PASSED** | `E9_01_order_multipart_schedule_drawer.png`<br>`E9_02_vnpay_redirect_capped_parts.png`<br>*(Đơn 112.5M VND chia 2 lượt: 100M VND + 12.5M VND)* |
| **E10** | NCC Yêu Cầu Giải Ngân Mô Phỏng (Sandbox) & Admin Phê Duyệt | **PASSED** | `E10_01_supplier_payout_account_drawer.png`<br>`E10_02_supplier_request_payout_modal.png`<br>`E10_03_admin_approve_payout_modal.png`<br>`E10_04_supplier_simulated_paid_out_success.png` |

---

## 3. Chi Tiết Tiến Độ Từng Pha

### Pha T0: Chuẩn Bị & Thiết Lập Baseline Lỗi Hiện Tại
- **Mục tiêu:** Thiết lập tài khoản kiểm thử doanh nghiệp (`@test.mooncake.local`), sản phẩm test (`TEST-`), tái hiện chính xác 7 lỗ hổng kinh doanh và rò rỉ tenant.
- **Bằng chứng thu thập:**
  - `T0_baseline/01_custA_order_form_packaging_disabled.png`
  - `T0_baseline/02_custA_standard_order_blocked_by_fake_packaging_400.png`
  - `T0_baseline/02b_custA_order_created_2h_toast_and_myorders.png`
  - `T0_baseline/03_supNew_zero_orders_leaks_all_platform_orders.png`
  - `T0_baseline/04_supB_cross_tenant_sees_and_rejected_shopA_order.png`
  - `T0_baseline/05_custA_confirmed_order_misleading_escrow_button.png`
  - `T0_baseline/06_vnpay_return_url_auto_processing_bug.png`
  - `T0_baseline/07_pod_auto_delivered_mismatch.json`

### Pha 0: Chặn Đứng Rủi Ro P0
- **Lỗ hổng đã triệt tiêu:**
  1. Xóa bỏ hoàn toàn truy vấn fallback 100 đơn toàn sàn trong `OrderRepository.GetSupplierOrdersAsync`. NCC mới chỉ thấy 0 đơn của chính mình.
  2. Sửa kiểm tra quyền sở hữu `IsShopOwnedByUserAsync` chặn NCC B can thiệp đơn NCC A (`404 TenantForbidden`).
  3. Đảm bảo tính nguyên tử: Tạo hồ sơ bao bì `CustomPackaging` trong cùng transaction với `Order`. Loại bỏ hoàn toàn lỗi nuốt exception.
  4. Bỏ VietQR khỏi đơn hàng trực tiếp, chuyển sang quy trình VNPay ký quỹ an toàn; loại bỏ logic tự nhảy sang `Processing` tại callback browser.
- **Bằng chứng:** Thư mục `P0/` (6 ảnh chụp màn hình + 5 file JSON API).

### Pha 1: Thống Nhất Chính Sách Nghiệp Vụ & Cấu Hình Nền Tảng
- **SLA chuẩn hóa:**
  - NCC phản hồi duyệt/từ chối/đề xuất ngày giao: **12 giờ**.
  - Người mua phản hồi đề xuất ngày giao mới: **12 giờ**.
  - Người mua thanh toán đặt cọc (Deposit): **24 giờ**.
  - Người mua kiểm tra ảnh PoD và xác nhận nhận hàng: **48 giờ** (hết 48h tự động giải phóng tiền sang Eligible).
  - Giữ kho chờ mockup bao bì tùy biến: **5 ngày làm việc**.
  - Giới hạn trần thanh toán VNPay mỗi đợt: **100.000.000 VND**.
- **Error Catalog chuẩn hóa:** `PRICE_CHANGED`, `INSUFFICIENT_STOCK`, `SHOP_UNAVAILABLE`, `ORDER_EXPIRED`, `STATE_CONFLICT`, `PAYMENT_REQUIRED`, `PACKAGING_APPROVAL_REQUIRED` đi kèm `traceId` chuẩn RFC 7807.

### Pha 2: Lõi Giao Dịch Backend (DB Migrations & Concurrency)
- **Cơ chế kỹ thuật:**
  - Pessimistic Locking với PostgreSQL: `SELECT * FROM orders WHERE id = @id FOR UPDATE` và sắp xếp variant theo ID tăng dần chống Deadlock khi trừ tồn kho.
  - Sổ cái tài chính mô phỏng gồm các bucket số dư: `Held` (Đang lưu ký sàn) -> `Eligible` (Sẵn sàng giải ngân) -> `PaidOutSimulated` (Đã giải ngân Sandbox) / `Disputed` (Tạm khóa tranh chấp) / `Refunded` (Đã hoàn tiền).
  - Tách bảng `order_payment_schedule` và `payment_parts` với ràng buộc duy nhất `part_id` trên `payments`.
- **Bằng chứng kiểm thử tích hợp DB:** File `P2/api/p2_concurrency_and_finance_results.json` và file migration `P2/api/migration_EnterpriseDirectBulkOrder.sql`.

### Pha 3: API & Giao Nhận Proof-of-Delivery (PoD)
- **Endpoints triển khai:**
  - `POST /api/v1/orders/preview` (báo giá có hiệu lực 15 phút, tính thuế/phí/cọc chính xác).
  - `POST /api/v1/orders` (tạo đơn Idempotent, giữ chỗ kho an toàn).
  - `POST /api/v1/orders/{id}/confirm`, `reject`, `propose-delivery-date`, `respond-delivery-proposal`.
  - `POST /api/v1/orders/{id}/payment-parts/{partId}/vnpay-url`.
  - `POST /api/v1/deliveries` (chặn tạo chuyến giao thứ 2 với mã `SINGLE_DELIVERY_LIMIT`).
  - `POST /api/v1/deliveries/{id}/proofs` (tải lên ảnh bàn giao PoD).
  - `POST /api/v1/orders/{id}/delivery/confirm-receipt` (người mua xác nhận nhận hàng, chuyển trạng thái số dư).
  - `POST /api/v1/orders/{id}/delivery/dispute` & `POST /api/v1/admin/orders/delivery-disputes/{id}/resolve`.
- **Bằng chứng:** Thư mục `P3/` (3 ảnh Swagger + 6 file JSON API).

### Pha 4: Hoàn Thiện Giao Diện Người Dùng (Frontend UX)
- `OrderAndDesgin.jsx`: Hỗ trợ chọn nhiều dòng phân loại bánh từ cùng xưởng sản xuất, debounce báo giá tự động, hiển thị minh bạch mức cọc, thuế VAT và phí vận chuyển theo khu vực; Modal cam kết điều khoản pháp lý trước khi tạo đơn.
- `MyOrders.jsx`: Hiển thị SLA đếm ngược, Drawer xem danh sách các đợt thanh toán VNPay có trần 100M VND, Modal xem ảnh PoD xác nhận đơn hoặc khiếu nại chất lượng, Modal duyệt mockup và phí phụ thu bao bì.
- `OrderManage.jsx`: Các thẻ số dư tài chính (`Held`, `Eligible`, `PaidOutSimulated`, `Disputed`, `Refunded`), Drawer quản lý chính sách đơn hàng của Shop, Drawer cập nhật tài khoản ngân hàng thụ hưởng, Modal yêu cầu giải ngân số dư Eligible.
- `TradingOperating.jsx`: Tab Đơn Hàng Doanh Nghiệp (Direct Bulk Orders) dành riêng cho Quản trị viên sàn: theo dõi tổng tiền lưu ký toàn sàn, phê duyệt khiếu nại giao nhận với 3 phương án (`ReleasePayout`, `PartialRefund`, `FullRefund`), xử lý các trường hợp hoàn tiền tồn đọng, và duyệt giải ngân Sandbox cho NCC.
- **Kiểm tra biên dịch:** `npm run build` thành công trong 1.45 giây, 0 lỗi TypeScript/JSX.

---

## 4. Kiểm Thử E2E Trình Duyệt Thực Tế (Pha 5)

Bộ kiểm thử tự động Playwright (`mooncake-fe/scripts/run_e2e_scenarios.mjs`) sử dụng trình duyệt Google Chrome chính thức trên hệ điều hành Windows đã chạy qua 10 kịch bản doanh nghiệp độc lập:
1. **E1 (Happy Path):** Tạo đơn số lượng lớn -> NCC xác nhận -> Khách thanh toán cọc & số còn lại qua VNPay -> NCC chuyển Shipped & nộp ảnh PoD -> Khách duyệt nhận hàng -> Số dư của NCC chuyển sang Eligible.
2. **E2 (Stock Concurrency Race):** 2 khách hàng đồng thời đặt cọc vượt quá lượng tồn kho thực tế của variant -> Hệ thống phân xử chính xác 1 đơn thành công (201) và 1 đơn bị từ chối an toàn với mã `409 INSUFFICIENT_STOCK`.
3. **E3 (Mutual Cancellation):** Khách gửi đề nghị hủy thỏa thuận -> NCC đồng ý -> Đơn chuyển `Cancelled` và tồn kho được tự động hoàn lại cho xưởng.
4. **E4 (Supplier Rejection within 12h SLA):** NCC từ chối đơn hàng với lý do quá tải công suất -> Tồn kho được nhả lập tức.
5. **E5 (Propose Delivery Date & Approval):** NCC đề xuất ngày giao muộn hơn 3 ngày -> Khách nhận thông báo và bấm chấp thuận ngày mới.
6. **E6 (Custom Packaging Mockup & Change Request):** Khách gửi yêu cầu in ấn logo doanh nghiệp -> NCC tải mockup và đề xuất phí phụ thu 250.000 VND -> Khách duyệt mockup và bổ sung nghĩa vụ thanh toán phát sinh.
7. **E7 (Delivery Dispute & Admin Resolution):** Khách nhận hàng phát hiện bánh bị móp méo, tải ảnh bằng chứng khiếu nại -> Tiền đơn hàng lập tức bị khóa vào bucket `Disputed` -> Admin đối soát và ra phán quyết hoàn 500.000 VND cho khách, giải phóng phần còn lại cho NCC.
8. **E8 (Late VNPay IPN Auto-Refund Case):** Xử lý trường hợp thanh toán tiền sau khi đơn đã hủy/hết hạn giữ kho -> Tạo hồ sơ RefundCase -> Admin duyệt hoàn tiền lưu ký.
9. **E9 (Multi-part VNPay Payments with 100M VND Cap):** Đơn hàng 112.500.000 VND được hệ thống tự động bẻ thành 2 đợt thanh toán (Đợt 1: 100.000.000 VND, Đợt 2: 12.500.000 VND) tuân thủ nghiêm ngặt giới hạn kỹ thuật của cổng VNPay.
10. **E10 (Supplier Simulated Payout Request & Admin Approval):** NCC cập nhật số tài khoản ngân hàng VCB -> Gửi yêu cầu giải ngân số dư Eligible -> Admin kiểm tra và duyệt giải ngân mô phỏng Sandbox -> Số dư chuyển sang `PaidOutSimulated`.

---

## 5. Pha 6: Cấu Hình Môi Trường & Bàn Giao Vận Hành

1. **Feature Flag & Sandbox Security:**
   - Tính năng giải ngân được gắn cờ mô phỏng Sandbox: Chỉ cập nhật số cái DB nội bộ, không gọi API ngân hàng thật khi chưa có thỏa thuận liên ngân hàng.
   - Nhãn giao diện người dùng hiển thị rõ ràng `(Sandbox)` tại mọi vị trí số dư và hóa đơn thanh toán.
2. **Quy Tắc Quản Trị Mã Nguồn:**
   - Toàn bộ source code Backend và Frontend đã được sửa đổi và kiểm tra an toàn tại chỗ.
   - Tuân thủ nghiêm ngặt chỉ thị của người dùng: **Không tự ý thực hiện `git commit` hay `git push`**.
3. **Đồng Bộ Tài Liệu Kỹ Thuật:**
   - Kết quả triển khai được đồng bộ vào `08_IMPLEMENTATION_RESULT.md`.

---
*Báo cáo được khởi tạo tự động từ hệ thống bằng chứng kiểm thử Mooncake B2B Platform.*

