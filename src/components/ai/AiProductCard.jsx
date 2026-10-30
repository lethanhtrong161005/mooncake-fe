import { Button, Tag } from 'antd';
import { ShoppingOutlined, SolutionOutlined, ShopOutlined } from '@ant-design/icons';

const money = (val) => Number(val || 0).toLocaleString('vi-VN');

export default function AiProductCard({ product, onNavigate }) {
  if (!product) return null;

  return (
    <div className="mt-3 p-3.5 bg-gradient-to-r from-amber-50/90 to-stone-50 border border-amber-200/90 rounded-xl shadow-xs hover:border-amber-400 transition-all">
      <div className="flex gap-3 items-start">
        {product.primaryImageUrl ? (
          <img
            src={product.primaryImageUrl}
            alt={product.productName}
            className="w-16 h-16 rounded-lg object-cover border border-stone-200 shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-lg bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-800 text-xl font-bold shrink-0">
            🥮
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="font-bold text-stone-900 text-sm truncate">
            {product.productName}
          </div>

          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-stone-500">
            <ShopOutlined className="text-amber-700" />
            <span className="truncate">{product.shopName}</span>
            {product.reputationBadgeTitle && (
              <Tag color="gold" className="text-[10px] px-1 py-0 border-amber-300 font-semibold m-0">
                {product.reputationBadgeTitle}
              </Tag>
            )}
          </div>

          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="font-bold text-amber-900 text-sm">
              {money(product.basePrice)} đ
            </span>
            <span className="text-[11px] text-stone-400">
              · Đơn tối thiểu: {product.minOrderQty} hộp
            </span>
          </div>
        </div>
      </div>

      {product.recommendationReason && (
        <div className="mt-2 text-xs text-stone-600 bg-white/70 p-2 rounded-lg border border-amber-100 leading-relaxed">
          💡 {product.recommendationReason}
        </div>
      )}

      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-amber-100">
        <Button
          type="primary"
          size="small"
          icon={<ShoppingOutlined />}
          onClick={() => onNavigate?.(`san-pham/${product.productId}`)}
          className="bg-amber-800 hover:bg-amber-700 text-xs font-semibold border-amber-800"
        >
          Xem chi tiết bánh
        </Button>

        <Button
          size="small"
          icon={<SolutionOutlined />}
          onClick={() => onNavigate?.('so-sanh-bao-gia')}
          className="text-xs font-semibold"
        >
          Tạo RFQ chào thầu
        </Button>
      </div>
    </div>
  );
}

