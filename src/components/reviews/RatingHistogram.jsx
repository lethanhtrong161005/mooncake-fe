import { Progress, Rate } from 'antd';

export default function RatingHistogram({ summary }) {
  const total = Math.max(1, summary?.totalReviews || 0);
  const dist = summary?.starDistribution || { star5: 0, star4: 0, star3: 0, star2: 0, star1: 0 };
  const stars = [5, 4, 3, 2, 1];

  return (
    <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
      {/* Average rating column */}
      <div className="text-center sm:border-r sm:pr-8 border-stone-200 w-full sm:w-auto">
        <div className="text-4xl sm:text-5xl font-black text-amber-900 tracking-tight">
          {(summary?.averageRating ?? 5.0).toFixed(1)}
        </div>
        <div className="my-1.5">
          <Rate disabled allowHalf value={summary?.averageRating ?? 5} className="text-amber-500 text-base" />
        </div>
        <div className="text-xs text-stone-500 font-medium">
          Dựa trên <strong>{summary?.totalReviews || 0}</strong> đánh giá
        </div>
        {summary?.verifiedPurchaseCount > 0 && (
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            ✓ 100% Mua hàng xác thực
          </div>
        )}
      </div>

      {/* Histogram bars column */}
      <div className="flex-1 w-full space-y-2">
        {stars.map((star) => {
          const count = dist[`star${star}`] || 0;
          const percent = summary?.totalReviews ? Math.round((count / total) * 100) : 0;
          return (
            <div key={star} className="flex items-center gap-2.5 text-xs">
              <span className="w-12 font-medium text-stone-700 flex items-center gap-1">
                {star} <span className="text-amber-500">★</span>
              </span>
              <div className="flex-1">
                <Progress
                  percent={percent}
                  strokeColor="#d97706"
                  trailColor="#f5f5f4"
                  showInfo={false}
                  size="small"
                />
              </div>
              <span className="w-9 text-right text-stone-500 font-medium">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

