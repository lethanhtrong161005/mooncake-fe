import { useState, useEffect } from 'react';
import { Result, Button, Spin, Tag, Card } from 'antd';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  PrinterOutlined,
  ShoppingOutlined,
  FileProtectOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import paymentService from '../../services/paymentService';

export default function PaymentResultView() {
  const [loading, setLoading] = useState(true);
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    const parseAndVerify = async () => {
      try {
        setLoading(true);
        // VNPay returns callback query parameters either on search or hash
        const fullUrl = window.location.href;
        const queryIndex = fullUrl.indexOf('?');
        const queryString = queryIndex !== -1 ? fullUrl.substring(queryIndex + 1) : '';

        if (!queryString) {
          setVerificationResult({
            isSuccess: false,
            responseCode: '400',
            message: 'Không tìm thấy thông tin tham số thanh toán trong URL.',
          });
          return;
        }

        const res = await paymentService.verifyReturnCallback(queryString);
        setVerificationResult(res);
      } catch {
        setVerificationResult({
          isSuccess: false,
          responseCode: '99',
          message: 'Không thể xác thực giao dịch từ cổng thanh toán.',
        });
      } finally {
        setLoading(false);
      }
    };

    parseAndVerify();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center space-y-4">
        <Spin size="large" />
        <p className="text-stone-600 font-medium text-sm">Đang đối soát biên lai thanh toán từ VNPay Sandbox...</p>
      </div>
    );
  }

  const isSuccess = verificationResult?.isSuccess;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Card className="rounded-3xl border border-stone-200/80 shadow-md overflow-hidden bg-white">
        <Result
          status={isSuccess ? 'success' : 'error'}
          icon={
            isSuccess ? (
              <CheckCircleFilled className="text-emerald-500 text-6xl" />
            ) : (
              <CloseCircleFilled className="text-rose-500 text-6xl" />
            )
          }
          title={
            <h1 className="text-2xl font-serif font-bold text-stone-900 mt-2">
              {isSuccess ? 'Thanh Toán Thành Công!' : 'Giao Dịch Chưa Hoàn Tất'}
            </h1>
          }
          subTitle={
            <p className="text-stone-500 text-sm max-w-md mx-auto">
              {isSuccess
                ? 'Giao dịch của quý khách đã được xác thực thành công qua cổng thanh toán VNPay Sandbox.'
                : 'Thanh toán bị hủy hoặc không thành công. Quý khách vui lòng kiểm tra lại tài khoản hoặc thử lại.'}
            </p>
          }
          extra={[
            <Button
              key="print"
              icon={<PrinterOutlined />}
              onClick={() => window.print()}
              className="rounded-xl border-stone-300 print:hidden"
            >
              In Biên Lai
            </Button>,
            <Button
              key="orders"
              type="primary"
              icon={<ShoppingOutlined />}
              onClick={() => {
                window.location.hash = '#/dat-hang-thiet-ke';
              }}
              className="rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 font-semibold px-5 print:hidden"
            >
              Về Danh Sách Đơn Hàng
            </Button>,
            <Button
              key="contracts"
              icon={<FileProtectOutlined />}
              onClick={() => {
                window.location.hash = '#/hop-dong-tien-do';
              }}
              className="rounded-xl border-amber-300 text-amber-800 hover:text-amber-900 print:hidden"
            >
              Xem Hợp Đồng & Ký Quỹ
            </Button>,
          ]}
        >
          {/* E-Receipt printable details */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Biên Lai Điện Tử (E-Receipt)</span>
                <p className="font-mono text-sm font-bold text-stone-800 mt-0.5">
                  {verificationResult?.paymentNumber || 'N/A'}
                </p>
              </div>
              <Tag color={isSuccess ? 'green' : 'red'} className="text-xs px-2.5 py-0.5 font-semibold">
                {isSuccess ? 'ĐÃ THANH TOÁN' : 'THẤT BẠI'}
              </Tag>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-500 block">Số tiền thanh toán:</span>
                <span className="text-base font-bold text-amber-700 font-mono">
                  {Number(verificationResult?.amount || 0).toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
              <div>
                <span className="text-stone-500 block">Cổng thanh toán:</span>
                <span className="font-medium text-stone-800">VNPay Sandbox</span>
              </div>
              <div>
                <span className="text-stone-500 block">Ngân hàng phát hành:</span>
                <span className="font-medium text-stone-800">{verificationResult?.bankCode || 'VNPAY'}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Mã giao dịch VNPay:</span>
                <span className="font-mono text-stone-800">{verificationResult?.transactionNo || 'N/A'}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Mã phản hồi:</span>
                <span className="font-mono text-stone-800">{verificationResult?.responseCode || '00'}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Thời gian thanh toán:</span>
                <span className="text-stone-800">
                  {verificationResult?.paidAt ? new Date(verificationResult.paidAt).toLocaleString('vi-VN') : new Date().toLocaleString('vi-VN')}
                </span>
              </div>
            </div>

            {isSuccess && (
              <div className="mt-4 pt-3 border-t border-stone-200 flex items-start gap-2 text-xs text-emerald-800 bg-emerald-50/60 p-3 rounded-xl">
                <SafetyCertificateOutlined className="text-emerald-600 text-base mt-0.5" />
                <div>
                  <span className="font-semibold">Bảo chứng Ký quỹ Escrow an toàn:</span>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Khoản thanh toán được phong tỏa trong tài khoản Escrow của Sàn Nguyệt Phố. Tiền chỉ chuyển cho Xưởng sản xuất khi đơn hàng/mốc hợp đồng được ký nhận PoD hoặc nghiệm thu hoàn tất.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Result>
      </Card>
    </div>
  );
}

