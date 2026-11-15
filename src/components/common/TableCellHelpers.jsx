import { Tag, Tooltip } from 'antd';
import { CrownOutlined } from '@ant-design/icons';

/**
 * TruncatedTooltip
 * Clamps long text cleanly in tables/cards and reveals the full content on hover.
 */
export function TruncatedTooltip({
  text,
  tooltipContent,
  lines = 1,
  className = '',
  fallback = '—',
  placement = 'topLeft',
  children,
}) {
  const display = children ?? text;
  if (!display) {
    return <span className="text-[#8a7f7a]">{fallback}</span>;
  }

  const clampClass = lines === 2 ? 'line-clamp-2' : 'truncate';
  const node = (
    <div className={`min-w-0 ${clampClass} cursor-default ${className}`.trim()}>
      {display}
    </div>
  );

  const hoverTitle = tooltipContent ?? text;
  if (!hoverTitle) return node;

  return (
    <Tooltip title={hoverTitle} color="#231a18" placement={placement}>
      {node}
    </Tooltip>
  );
}

/**
 * OrderItemsHoverCell
 * Compact single-line order item preview with full variant breakdown shown on hover.
 */
export function OrderItemsHoverCell({
  items = [],
  customPackaging = null,
  packagingStatusLabel = {},
  showPackagingTag = true,
  maxWidthClass = 'max-w-[198px]',
}) {
  if (!items.length) {
    return <span className="text-xs text-[#8a7f7a]">Chưa có hạng mục</span>;
  }

  const firstItem = items[0];
  const extraCount = Math.max(0, items.length - 1);
  const totalUnits = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const packagingStatusText = customPackaging
    ? (packagingStatusLabel[customPackaging.status] || customPackaging.status)
    : null;

  const hoverContent = (
    <div className="max-w-[320px] space-y-1.5 text-xs">
      <div className="border-b border-white/15 pb-1 font-semibold text-amber-200">
        Chi tiết đơn ({items.length} hạng mục · {totalUnits.toLocaleString('vi-VN')} hộp)
      </div>
      <div className="space-y-1">
        {items.map((item, idx) => (
          <div
            key={item.variantId || item.productId || idx}
            className="flex items-start justify-between gap-3"
          >
            <span className="leading-snug text-stone-100">
              {item.productName || 'Bánh Trung Thu'}
              {item.variantName ? ` (${item.variantName})` : ''}
            </span>
            <span className="shrink-0 font-semibold tabular-nums text-amber-300">
              ×{item.quantity}
            </span>
          </div>
        ))}
      </div>
      {customPackaging && (
        <div className="border-t border-white/15 pt-1 text-[11px] text-stone-300">
          Bao bì: {customPackaging.packagingType || 'Thiết kế riêng'} · {packagingStatusText}
        </div>
      )}
    </div>
  );

  return (
    <Tooltip title={hoverContent} color="#231a18" placement="topLeft">
      <div className={`${maxWidthClass} space-y-1.5 text-xs text-[#231a18] cursor-help`}>
        <div className="flex items-center justify-between gap-1.5 leading-snug">
          <span className="min-w-0 flex-1 truncate font-medium text-[#231a18]">
            {firstItem.productName || 'Bánh Trung Thu'}
            {firstItem.variantName ? ` · ${firstItem.variantName}` : ''}
          </span>
          <span className="shrink-0 font-semibold tabular-nums text-[#7d1322]">
            ×{firstItem.quantity}
          </span>
        </div>
        {(extraCount > 0 || showPackagingTag) && (
          <div className="flex flex-wrap items-center gap-1">
            {extraCount > 0 && (
              <Tag className="m-0 border-[#e4dcd3] bg-[#faf7f2] text-[11px] tabular-nums text-[#6c625e]">
                +{extraCount} dòng ({totalUnits} hộp)
              </Tag>
            )}
            {showPackagingTag && (
              customPackaging ? (
                <Tag color="geekblue" icon={<CrownOutlined />} className="m-0 text-[11px]">
                  Bao bì: {packagingStatusText}
                </Tag>
              ) : (
                <Tag className="m-0 text-[11px] text-[#6c625e]">Bao bì tiêu chuẩn</Tag>
              )
            )}
          </div>
        )}
      </div>
    </Tooltip>
  );
}

export default TruncatedTooltip;
