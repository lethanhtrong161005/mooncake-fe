import { useEffect, useMemo, useState } from 'react';
import orderService from '../services/orderService';

export default function useBulkOrderQuote(shopId, items = [], shippingZoneCode = null, customPackagingBrief = null) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validItems = useMemo(
    () => (Array.isArray(items)
      ? items.filter((it) => it.productId && it.variantId && Number(it.quantity) > 0)
      : []),
    [items]
  );

  useEffect(() => {
    if (!shopId || validItems.length === 0) {
      const timer = setTimeout(() => setQuote(null), 0);
      return () => clearTimeout(timer);
    }
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        const result = await orderService.previewQuote({
          shopId,
          ...(shippingZoneCode ? { shippingZoneCode } : {}),
          items: validItems,
          customPackagingBrief: customPackagingBrief || undefined,
        }, controller.signal);
        setQuote(result);
      } catch (requestError) {
        if (requestError?.name !== 'CanceledError') {
          setQuote(null);
          setError(
            requestError?.response?.data?.message ||
            requestError?.message ||
            'Không thể tính giá cho các sản phẩm đã chọn.'
          );
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 300);
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [shopId, validItems, shippingZoneCode, customPackagingBrief]);

  const refetchQuote = async () => {
    if (!shopId || validItems.length === 0) return null;
    try {
      setLoading(true);
      setError('');
      const result = await orderService.previewQuote({
        shopId,
        ...(shippingZoneCode ? { shippingZoneCode } : {}),
        items: validItems,
        customPackagingBrief: customPackagingBrief || undefined,
      });
      setQuote(result);
      return result;
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Lỗi khi cập nhật báo giá.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { quote, loading, error, refetchQuote };
}
