// Lucian UX/UI Prompt #261 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#261
import React, { useMemo } from 'react';
import './ReviewFilterStars.css';

/**
 * ReviewFilterStars - Adapted from Lucian #261
 * Star breakdown bars with 1-click filtering and verified review comments
 */
export default function ReviewFilterStars({
  reviews = [],
  activeStar = null,
  onChangeStar = () => {},
}) {
  const stats = useMemo(() => {
    const total = reviews.length;
    if (total === 0) return { avg: 5.0, counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }, total: 0 };
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;
    reviews.forEach((r) => {
      const star = Math.min(5, Math.max(1, Math.round(r.rating || 5)));
      counts[star] = (counts[star] || 0) + 1;
      sum += r.rating || 5;
    });
    const avg = (sum / total).toFixed(1);
    return { avg, counts, total };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    if (!activeStar) return reviews;
    return reviews.filter((r) => Math.round(r.rating) === activeStar);
  }, [reviews, activeStar]);

  return (
    <div className="u261">
      <div className="u261-top">
        <div className="u261-score">
          <div className="u261-num">{stats.avg}</div>
          <div className="u261-star-row" aria-label={`Đánh giá trung bình ${stats.avg} trên 5 sao`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>{star <= Math.round(Number(stats.avg)) ? '★' : '☆'}</span>
            ))}
          </div>
          <div className="u261-tot">{stats.total} đánh giá thực tế</div>
        </div>

        <div className="u261-bars" role="group" aria-label="Lọc đánh giá theo số sao">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = stats.counts[star] || 0;
            const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
            const isSelected = activeStar === star;

            return (
              <button
                key={star}
                type="button"
                className="u261-b"
                aria-pressed={isSelected}
                onClick={() => onChangeStar(isSelected ? null : star)}
                title={`Xem ${count} đánh giá ${star} sao`}
              >
                <span className="u261-lbl">{star} sao</span>
                <span className="u261-track">
                  <span
                    className="u261-fill"
                    style={{ transform: `scaleX(${pct / 100})` }}
                  />
                </span>
                <span className="u261-cnt">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeStar && (
        <div className="flex items-center justify-between mt-4 pb-2 border-b border-[#7a0010]/10 text-xs text-[#59413f]">
          <span>
            Đang lọc: <strong>{activeStar} sao</strong> ({filteredReviews.length} nhận xét)
          </span>
          <button
            type="button"
            onClick={() => onChangeStar(null)}
            className="text-[#7a0010] font-semibold hover:underline"
          >
            Xem tất cả
          </button>
        </div>
      )}

      <div className="u261-list">
        {filteredReviews.length === 0 ? (
          <div className="py-8 text-center text-sm text-[#8d706e]">
            Chưa có đánh giá nào cho mức {activeStar} sao.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div key={rev.id} className="u261-item">
              <div className="u261-user">
                <div>
                  <span className="u261-name">{rev.author}</span>
                  {rev.organization && (
                    <span className="text-xs text-[#8d706e] ml-2">({rev.organization})</span>
                  )}
                </div>
                {rev.verified && (
                  <span className="u261-badge">Đã xác thực đơn hàng</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-[#8d706e] mb-2">
                <span className="text-[#f59e0b] font-medium">
                  {'★'.repeat(rev.rating)}
                  {'☆'.repeat(5 - rev.rating)}
                </span>
                <span>•</span>
                <span>{rev.date}</span>
                {rev.variantTitle && (
                  <>
                    <span>•</span>
                    <span className="text-[#59413f]">Phân loại: {rev.variantTitle}</span>
                  </>
                )}
              </div>
              <p className="u261-text">{rev.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
