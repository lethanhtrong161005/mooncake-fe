import { useCallback, useEffect, useState } from 'react';
import { Button, Card, Result, Spin, Tag } from 'antd';
import {
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
  FileProtectOutlined,
  PrinterOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import paymentService from '../../services/paymentService';

function getReturnQueryString() {
  return window.location.search.replace(/^\?/, '');
}

export default function PaymentResultView({ onNavigate }) {
  const initialQuery = getReturnQueryString();
  const [loading, setLoading] = useState(() => Boolean(initialQuery));
  const [verificationResult, setVerificationResult] = useState(() =>
    initialQuery
      ? null
      : {
          isSuccess: false,
          responseCode: '400',
          message: 'Không tìm thấy thông tin tham số thanh toán trong URL.',
        }
  );

  const parseAndVerify = useCallback(async () => {
    const queryString = getReturnQueryString();
    if (!queryString) {
      setVerificationResult({
        isSuccess: false,
        responseCode: '400',
        message: 'Không tìm thấy thông tin tham số thanh toán trong URL.',
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
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
  }, []);

  useEffect(() => {
    const queryString = getReturnQueryString();
    if (!queryString) {
      return undefined;
    }

    let cancelled = false;
    paymentService
      .verifyReturnCallback(queryString)
      .then((res) => {
        if (!cancelled) setVerificationResult(res);
      })
      .catch(() => {
        if (!cancelled) {
          setVerificationResult({
            isSuccess: false,
            responseCode: '99',
            message: 'Không thể xác thực giao dịch từ cổng thanh toán.',
          });
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center space-y-4">
        <Spin size="large" />
        <p className="text-stone-600 font-medium text-sm">
          Đang đối soát chữ ký biên lai từ VNPay Sandbox...
        </p>
      </div>
    );
  }

  const isSignatureSuccess = Boolean(verificationResult?.isSuccess);
  const isConfirmedByIpn =
    isSignatureSuccess &&
    (verificationResult?.paymentStatus === 'Completed' || Boolean(verificationResult?.paidAt));
  const isAwaitingIpn = isSignatureSuccess && !isConfirmedByIpn;

  const resultStatus = isConfirmedByIpn ? 'success' : isAwaitingIpn ? 'info' : 'error';

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Card className="rounded-3xl border border-stone-200/80 shadow-md overflow-hidden bg-white">
        <Result
          status={resultStatus}
          icon={
            isConfirmedByIpn ? (
              <CheckCircleFilled className="text-emerald-500 text-6xl" />
            ) : isAwaitingIpn ? (
              <ClockCircleFilled className="text-amber-500 text-6xl" />
            ) : (
              <CloseCircleFilled className="text-rose-500 text-6xl" />
            )
          }
          title={
            <h1 className="text-2xl font-serif font-bold text-stone-900 mt-2">
              {isConfirmedByIpn
                ? 'Thanh Toán Đã Được Xác Nhận!'
                : isAwaitingIpn
                ? 'Đang Chờ Xác Nhận IPN Từ VNPay'
                : 'Giao Dịch Chưa Hoàn Tất'}
            </h1>
          }
          subTitle={
            <p className="text-stone-500 text-sm max-w-md mx-auto">
              {isConfirmedByIpn
                ? 'Giao dịch đã được cổng VNPay đối soát IPN thành công và ghi nhận vào hệ thống.'
                : isAwaitingIpn
                ? 'Chữ ký Return URL hợp lệ. Hệ thống chỉ ghi nhận hoàn tất thanh toán sau khi nhận thông báo IPN chính thức từ máy chủ VNPay.'
                : 'Thanh toán bị hủy hoặc chữ ký không hợp lệ. Quý khách vui lòng kiểm tra lại hoặc thực hiện thanh toán lại.'}
            </p>
          }
          extra={[
            isAwaitingIpn ? (
              <Button
                key="refresh"
                icon={<ReloadOutlined />}
                onClick={parseAndVerify}
                className="rounded-xl border-amber-400 text-amber-800"
              >
                Kiểm Tra Lại Trạng Thái IPN
              </Button>
            ) : null,
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
                onNavigate?.('don-hang-cua-toi');
              }}
              className="rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 font-semibold px-5 print:hidden"
            >
              Về Danh Sách Đơn Hàng
            </Button>,
            !verificationResult?.orderId ? (
              <Button
                key="contracts"
                icon={<FileProtectOutlined />}
                onClick={() => {
                  onNavigate?.('hop-dong-tien-do');
                }}
                className="rounded-xl border-amber-300 text-amber-800 hover:text-amber-900 print:hidden"
              >
                Xem Hợp Đồng
              </Button>
            ) : null,
          ].filter(Boolean)}
        >
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                  Biên Lai Điện Tử (E-Receipt)
                </span>
                <p className="font-mono text-sm font-bold text-stone-800 mt-0.5">
                  {verificationResult?.paymentNumber || 'N/A'}
                </p>
              </div>
              <Tag
                color={isConfirmedByIpn ? 'green' : isAwaitingIpn ? 'gold' : 'red'}
                className="text-xs px-2.5 py-0.5 font-semibold"
              >
                {isConfirmedByIpn
                  ? 'ĐÃ XÁC NHẬN IPN'
                  : isAwaitingIpn
                  ? 'CHỜ ĐỐI SOÁT IPN'
                  : 'THẤT BẠI'}
              </Tag>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-500 block">Số tiền giao dịch:</span>
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
                <span className="font-medium text-stone-800">
                  {verificationResult?.bankCode || 'VNPAY'}
                </span>
              </div>
              <div>
                <span className="text-stone-500 block">Mã giao dịch VNPay:</span>
                <span className="font-mono text-stone-800">
                  {verificationResult?.transactionNo || 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-stone-500 block">Mã phản hồi:</span>
                <span className="font-mono text-stone-800">
                  {verificationResult?.responseCode || '00'}
                </span>
              </div>
              <div>
                <span className="text-stone-500 block">Thời gian xác nhận IPN:</span>
                <span className="text-stone-800">
                  {verificationResult?.paidAt
                    ? new Date(verificationResult.paidAt).toLocaleString('vi-VN')
                    : 'Đang chờ IPN từ VNPay'}
                </span>
              </div>
            </div>

            {isConfirmedByIpn && (
              <div className="mt-4 pt-3 border-t border-stone-200 flex items-start gap-2 text-xs text-emerald-800 bg-emerald-50/60 p-3 rounded-xl">
                <SafetyCertificateOutlined className="text-emerald-600 text-base mt-0.5" />
                <div>
                  <span className="font-semibold">Đối soát thanh toán đơn hàng (Mô phỏng Sandbox):</span>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Khoản thanh toán đã được ghi nhận vào sổ cái tạm giữ mô phỏng (Held) và chỉ mở khóa đối soát cho Nhà cung cấp sau khi Quý khách xác nhận nhận hàng kèm ảnh PoD.
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
