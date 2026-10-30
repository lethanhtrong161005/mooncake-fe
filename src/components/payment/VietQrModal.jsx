import { useState, useEffect } from 'react';
import { Modal, Input, Button, message, Tag, Tooltip, Alert } from 'antd';
import {
  QrcodeOutlined,
  CopyOutlined,
  CheckOutlined,
  UploadOutlined,
  ClockCircleOutlined,
  BankOutlined,
  SafetyCertificateFilled,
} from '@ant-design/icons';
import paymentService from '../../services/paymentService';

const { TextArea } = Input;

export default function VietQrModal({
  open,
  onClose,
  transferData = null,
  onUploadSuccess,
}) {
  const [copiedField, setCopiedField] = useState(null);
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(48 * 3600); // 48 hours in seconds

  useEffect(() => {
    if (!open) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [open]);

  const formatCountdown = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h}h ${m < 10 ? '0' : ''}${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    message.success(`Đã sao chép ${fieldName}`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleConfirmTransfer = async () => {
    if (!transferData?.paymentId) {
      message.error('Giao dịch không hợp lệ.');
      return;
    }

    try {
      setLoading(true);
      const url = evidenceUrl.trim() || 'https://storage.mooncake.vn/evidence/unc-placeholder.jpg';
      const updated = await paymentService.uploadEvidence(
        transferData.paymentId,
        url,
        notes.trim() || 'Đã chuyển khoản qua VietQR Napas 247'
      );

      message.success('Đã ghi nhận chứng từ chuyển khoản! Ban Quản trị Sàn sẽ duyệt trong 15-30 phút.');
      onUploadSuccess?.(updated);
      onClose();
    } catch (err) {
      message.error(err.response?.data?.message || err.message || 'Không thể cập nhật chứng từ.');
    } finally {
      setLoading(false);
    }
  };

  if (!transferData) return null;

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-stone-800">
          <QrcodeOutlined className="text-emerald-600 text-xl" />
          <span className="font-serif font-bold text-lg">Chuyển Khoản Ngân Hàng VietQR Napas 247</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={680}
      centered
    >
      <div className="py-2 space-y-4">
        {/* Countdown & Security banner */}
        <div className="flex flex-wrap items-center justify-between bg-stone-100 rounded-xl px-4 py-2 text-xs">
          <div className="flex items-center gap-1.5 text-stone-700">
            <ClockCircleOutlined className="text-amber-600" />
            <span>Thời hạn thanh toán:</span>
            <span className="font-mono font-bold text-amber-700">{formatCountdown(timeLeft)}</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-700 font-medium">
            <SafetyCertificateFilled />
            <span>Ký quỹ SafeTrade Escrow MB Bank</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* VietQR Display (Left) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-white border border-stone-200 rounded-2xl shadow-sm text-center">
            <div className="relative p-2 bg-gradient-to-tr from-emerald-500/10 to-amber-500/10 rounded-xl border border-stone-100 mb-2">
              <img
                src={transferData.qrCodeUrl || `https://img.vietqr.io/image/MB-0988668899-compact2.png?amount=${transferData.amount}&addInfo=${encodeURIComponent(transferData.transferMemo || '')}`}
                alt="Mã VietQR Chuyển Khoản"
                className="w-48 h-48 object-contain rounded-lg shadow-sm"
              />
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Quét mã bằng app ngân hàng bất kỳ để tự động điền STK & Nội dung
            </p>
          </div>

          {/* Account Details with 1-Tap Copy (Right) */}
          <div className="md:col-span-7 space-y-2.5">
            <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3 space-y-2">
              {/* Bank Name */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Ngân hàng thụ hưởng:</span>
                <span className="font-semibold text-stone-800 flex items-center gap-1">
                  <BankOutlined className="text-blue-600" />
                  {transferData.bankName || 'Ngân hàng Quân Đội (MB Bank)'}
                </span>
              </div>

              {/* Account Number with Copy */}
              <div className="flex items-center justify-between text-xs border-t border-stone-200/60 pt-2">
                <span className="text-stone-500">Số tài khoản:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-stone-900">
                    {transferData.accountNumber || '0988668899'}
                  </span>
                  <Tooltip title="Sao chép số tài khoản">
                    <Button
                      type="text"
                      size="small"
                      icon={copiedField === 'STK' ? <CheckOutlined className="text-emerald-600" /> : <CopyOutlined />}
                      onClick={() => copyToClipboard(transferData.accountNumber || '0988668899', 'STK')}
                      className="text-stone-600 hover:text-amber-600"
                    />
                  </Tooltip>
                </div>
              </div>

              {/* Account Holder */}
              <div className="flex items-center justify-between text-xs border-t border-stone-200/60 pt-2">
                <span className="text-stone-500">Chủ tài khoản:</span>
                <span className="font-semibold text-stone-800 text-[11px]">
                  {transferData.accountName || 'CONG TY CP NGUYET PHO B2B'}
                </span>
              </div>

              {/* Amount with Copy */}
              <div className="flex items-center justify-between text-xs border-t border-stone-200/60 pt-2">
                <span className="text-stone-500 font-medium">Số tiền chuyển:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-base text-amber-700">
                    {Number(transferData.amount).toLocaleString('vi-VN')} đ
                  </span>
                  <Tooltip title="Sao chép số tiền">
                    <Button
                      type="text"
                      size="small"
                      icon={copiedField === 'Số tiền' ? <CheckOutlined className="text-emerald-600" /> : <CopyOutlined />}
                      onClick={() => copyToClipboard(String(transferData.amount), 'Số tiền')}
                      className="text-stone-600 hover:text-amber-600"
                    />
                  </Tooltip>
                </div>
              </div>

              {/* Transfer Memo with Copy */}
              <div className="flex items-center justify-between text-xs border-t border-stone-200/60 pt-2 bg-amber-50/70 p-2 rounded-lg">
                <span className="text-amber-900 font-medium">Nội dung chuyển:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-amber-800">
                    {transferData.transferMemo}
                  </span>
                  <Tooltip title="Sao chép nội dung chuyển khoản">
                    <Button
                      type="text"
                      size="small"
                      icon={copiedField === 'Nội dung' ? <CheckOutlined className="text-emerald-600" /> : <CopyOutlined />}
                      onClick={() => copyToClipboard(transferData.transferMemo, 'Nội dung')}
                      className="text-amber-800 hover:text-amber-900"
                    />
                  </Tooltip>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-rose-600 italic">
              * Lưu ý bắt buộc: Vui lòng nhập chính xác nội dung chuyển khoản để hệ thống khớp tiền tự động.
            </p>
          </div>
        </div>

        {/* Upload UNC / Evidence Area */}
        <div className="border-t border-stone-200 pt-3 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
            <UploadOutlined className="text-amber-600" />
            Đính kèm Ủy nhiệm chi (UNC) / Ảnh chụp giao dịch (Tùy chọn)
          </label>
          <Input
            placeholder="Dán liên kết ảnh chứng từ (ví dụ: https://storage... hoặc upload)"
            value={evidenceUrl}
            onChange={(e) => setEvidenceUrl(e.target.value)}
            className="rounded-lg text-xs"
          />
          <TextArea
            placeholder="Ghi chú thêm về giao dịch (VD: Đã chuyển từ ACB lúc 14h30)..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="rounded-lg text-xs"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button onClick={onClose} className="rounded-xl">
            Để chuyển sau
          </Button>
          <Button
            type="primary"
            loading={loading}
            onClick={handleConfirmTransfer}
            className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 font-semibold px-5"
          >
            Tôi đã chuyển khoản xong
          </Button>
        </div>
      </div>
    </Modal>
  );
}

