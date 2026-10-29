export const DEMO_ORDERS = [
  {
    id: 'demo-order-001',
    orderNumber: 'ORD-DEMO-001',
    customerName: 'Công ty Cổ phần MISA',
    items: [{ productName: 'Bánh Nướng Thập Cẩm Bát Bửu · SKU-TC-200', quantity: 350 }],
    totalAmount: 29750000,
    status: 'Pending',
    deliveryDateExpected: '2026-11-10',
    isDemo: true,
  },
  {
    id: 'demo-order-002',
    orderNumber: 'ORD-DEMO-002',
    customerName: 'Ngân hàng TMCP Quân Đội',
    items: [{ productName: 'Hộp Quà Sơn Mài VIP · SKU-BOX-VIP4', quantity: 120 }],
    totalAmount: 78000000,
    status: 'Confirmed',
    deliveryDateExpected: '2026-11-15',
    isDemo: true,
  },
];

export const DEMO_RFQS = [
  {
    id: 'demo-rfq-001',
    rfqNumber: 'RFQ-DEMO-001',
    title: 'Quà tặng Trung Thu doanh nghiệp · 500 hộp sơn mài',
    deliveryDateRequired: '2026-11-15',
    budgetRangeMin: 300000000,
    budgetRangeMax: 350000000,
    status: 'Open',
    bidCount: 3,
    isDemo: true,
  },
  {
    id: 'demo-rfq-002',
    rfqNumber: 'RFQ-DEMO-002',
    title: 'Bánh Trung Thu tri ân nhân viên · 1.200 hộp',
    deliveryDateRequired: '2026-11-20',
    budgetRangeMin: 180000000,
    budgetRangeMax: 220000000,
    status: 'Awarded',
    bidCount: 4,
    isDemo: true,
  },
];

export const DEMO_BIDS = [
  { id: 'demo-bid-001', bidNumber: 'BID-DEMO-001', supplierName: 'Xưởng Bánh Tràng An Nghệ Nhân', totalPrice: 310000000, estimatedDeliveryDays: 7, validityDays: 14, status: 'Submitted', isDemo: true },
  { id: 'demo-bid-002', bidNumber: 'BID-DEMO-002', supplierName: 'Hữu Nghị Luxury Mooncake', totalPrice: 320000000, estimatedDeliveryDays: 8, validityDays: 10, status: 'Submitted', isDemo: true },
  { id: 'demo-bid-003', bidNumber: 'BID-DEMO-003', supplierName: 'Bảo Phương Gia Truyền', totalPrice: 305000000, estimatedDeliveryDays: 10, validityDays: 7, status: 'Submitted', isDemo: true },
];

export const DEMO_CONTRACTS = [
  { id: 'demo-contract-001', contractNumber: 'HD-DEMO-001', title: 'Quà tặng Trung Thu doanh nghiệp · Vingroup', totalValue: 310000000, deliveryDeadline: '2026-11-15', status: 'PendingDeposit', signedByCustomerAt: '2026-10-20T09:00:00Z', signedBySupplierAt: '2026-10-20T10:00:00Z', termsAndConditions: 'Giao 500 hộp quà sơn mài theo lịch đã thống nhất.', isDemo: true },
  { id: 'demo-contract-002', contractNumber: 'HD-DEMO-002', title: 'Bánh Trung Thu tri ân nhân viên · FPT', totalValue: 180000000, deliveryDeadline: '2026-11-20', status: 'Active', signedByCustomerAt: '2026-10-18T09:00:00Z', signedBySupplierAt: '2026-10-18T10:00:00Z', termsAndConditions: 'Đơn hàng minh họa gồm 1.200 hộp bánh.', isDemo: true },
];

export const DEMO_PAYMENTS = [
  { id: 'demo-payment-001', paymentNumber: 'PAY-DEMO-001', contractId: 'HD-DEMO-001', amount: 93000000, currency: 'VND', method: 'BankTransfer', status: 'Pending', paidAt: null, isDemo: true },
  { id: 'demo-payment-002', paymentNumber: 'PAY-DEMO-002', contractId: 'HD-DEMO-002', amount: 54000000, currency: 'VND', method: 'VNPay', status: 'Completed', paidAt: '2026-10-19T10:00:00Z', isDemo: true },
];

