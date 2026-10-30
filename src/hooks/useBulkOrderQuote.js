import { useEffect, useState } from 'react';
import orderService from '../services/orderService';

export default function useBulkOrderQuote(shopId, productId, variantId, quantity) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!shopId || !productId || !variantId || !quantity) {
      return undefined;
    }
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        const result = await orderService.previewQuote({
          shopId,
          items: [{ productId, variantId, quantity }],
        }, controller.signal);
        setQuote(result);
      } catch (requestError) {
        if (requestError?.name !== 'CanceledError') {
          setQuote(null);
          setError(requestError?.message || 'Không thể tính giá cho số lượng đã chọn.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 300);
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [shopId, productId, variantId, quantity]);

  return { quote, loading, error };
}
