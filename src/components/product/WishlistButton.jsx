import { useEffect } from 'react';
import { Tooltip } from 'antd';
import { HeartFilled, HeartOutlined, LoadingOutlined } from '@ant-design/icons';
import { useWishlist } from '../../hooks/useWishlist';
import './wishlist-button.css';

/**
 * Reusable favorite toggle button for product cards and product detail pages.
 */
export default function WishlistButton({
  productId,
  productName = '',
  variant = 'overlay',
  skipAutoCheck = false,
  className = '',
  onAfterToggle,
}) {
  const { isSaved, isPending, toggleProduct, ensureChecked } = useWishlist();
  const normalizedId = productId ? String(productId).trim() : '';
  const saved = isSaved(normalizedId);
  const pending = isPending(normalizedId);

  useEffect(() => {
    if (normalizedId && !skipAutoCheck) {
      ensureChecked([normalizedId]);
    }
  }, [ensureChecked, normalizedId, skipAutoCheck]);

  if (!normalizedId) return null;

  const actionLabel = saved
    ? `Bỏ ${productName || 'sản phẩm'} khỏi danh sách yêu thích`
    : `Lưu ${productName || 'sản phẩm'} vào danh sách yêu thích`;

  const tooltipTitle = saved ? 'Bỏ yêu thích' : 'Lưu yêu thích';

  const handleClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const result = await toggleProduct(normalizedId);
    if (result && !result.requiresAuth) {
      onAfterToggle?.(result);
    }
  };

  const handleKeyDown = (event) => {
    event.stopPropagation();
  };

  const buttonClasses = [
    'wishlist-btn',
    `wishlist-btn--${variant}`,
    saved ? 'is-saved' : '',
    pending ? 'is-pending' : '',
    className,
  ].filter(Boolean).join(' ');

  const icon = pending
    ? <LoadingOutlined aria-hidden="true" />
    : saved
      ? <HeartFilled aria-hidden="true" />
      : <HeartOutlined aria-hidden="true" />;

  const button = (
    <button
      type="button"
      className={buttonClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={pending}
      aria-pressed={saved}
      aria-busy={pending}
      aria-label={actionLabel}
      data-testid={`wishlist-toggle-${normalizedId}`}
      data-saved={String(saved)}
    >
      {icon}
      {variant === 'detail' && (
        <span>{saved ? 'Đã lưu yêu thích' : 'Yêu thích'}</span>
      )}
    </button>
  );

  if (variant === 'overlay') {
    return <Tooltip title={tooltipTitle}>{button}</Tooltip>;
  }

  return button;
}

