import { useState, useEffect } from 'react';
import {
  Rate,
  Tag,
  Button,
  Space,
  Empty,
  Spin,
  Image,
  message,
} from 'antd';
import {
  LikeOutlined,
  LikeFilled,
  CheckCircleFilled,
  CommentOutlined,
  PictureOutlined,
  FormOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import RatingHistogram from './RatingHistogram';
import WriteProductReviewModal from './WriteProductReviewModal';
import SupplierReviewReplyModal from './SupplierReviewReplyModal';
import reviewService from '../../services/reviewService';

export default function ProductReviewStream({
  productId,
  productName,
  isSupplier = false,
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [onlyWithMedia, setOnlyWithMedia] = useState(false);

  // Modals state
  const [writeModalVisible, setWriteModalVisible] = useState(false);
  const [replyingReview, setReplyingReview] = useState(null);

  useEffect(() => {
    if (!productId) return;
    let active = true;
    reviewService.getProductReviewsFeed(productId, {
      rating: selectedRating,
      hasMedia: onlyWithMedia ? true : undefined,
      sortBy: 'most_helpful',
    }).then((result) => {
      if (active) {
        setData(result);
        setLoading(false);
      }
    }).catch(() => {
      if (active) {
        setData(null);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [productId, selectedRating, onlyWithMedia]);

  const handleToggleLike = async (reviewId) => {
    try {
      const res = await reviewService.toggleProductReviewLike(reviewId);
      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          items: prev.items.map((item) => {
            if (item.id === reviewId) {
              return {
                ...item,
                isLikedByMe: res.isLiked,
                likeCount: res.likeCount,
              };
            }
            return item;
          }),
        };
      });
    } catch (err) {
      message.error(err.message || 'Không thể thích bài đánh giá.');
    }
  };

  const handleReviewCreated = (newReview) => {
    setData((prev) => {
      if (!prev) return prev;
      const existingIds = new Set((prev.items || []).map((i) => i.id));
      if (existingIds.has(newReview.id)) return prev;
      return {
        ...prev,
        items: [newReview, ...(prev.items || [])],
        summary: {
          ...prev.summary,
          totalReviews: (prev.summary?.totalReviews || 0) + 1,
        },
      };
    });
  };

  const handleReplySubmitted = (updatedReview) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        items: prev.items.map((item) =>
          item.id === updatedReview.id
            ? { ...item, supplierReply: updatedReview.supplierReply, supplierRepliedAt: updatedReview.supplierRepliedAt }
            : item
        ),
      };
    });
  };

  return (
    <div className="mt-8 pt-8 border-t border-stone-200" id="product-reviews-stream-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Đánh Giá & Nhận Xét Mạng Xã Hội (Verified Purchase)
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Hình ảnh thực tế từ các doanh nghiệp đã mua và thưởng thức mẫu bánh này
          </p>
        </div>

        <Button
          type="primary"
          icon={<FormOutlined />}
          size="large"
          onClick={() => setWriteModalVisible(true)}
          className="bg-amber-800 hover:bg-amber-700 font-semibold border-amber-800 shadow-sm"
        >
          Viết Đánh Giá Sản Phẩm
        </Button>
      </div>

      {/* Summary Histogram */}
      <div className="mb-6">
        <RatingHistogram summary={data?.summary} />
      </div>

      {/* Filter Chips Bar */}
      <div className="bg-stone-50 p-3 sm:p-4 rounded-xl border border-stone-200/80 mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-stone-600 mr-1">Lọc theo:</span>

        <button
          type="button"
          onClick={() => {
            setSelectedRating(null);
            setOnlyWithMedia(false);
          }}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-all border ${
            selectedRating === null && !onlyWithMedia
              ? 'bg-amber-800 text-white border-amber-800 shadow-sm'
              : 'bg-white text-stone-700 border-stone-300 hover:border-amber-400'
          }`}
        >
          Tất cả ({data?.summary?.totalReviews || 0})
        </button>

        {[5, 4, 3, 2, 1].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setSelectedRating(selectedRating === star ? null : star)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all border ${
              selectedRating === star
                ? 'bg-amber-800 text-white border-amber-800 shadow-sm'
                : 'bg-white text-stone-700 border-stone-300 hover:border-amber-400'
            }`}
          >
            {star} ★ ({data?.summary?.starDistribution?.[`star${star}`] || 0})
          </button>
        ))}

        <button
          type="button"
          onClick={() => setOnlyWithMedia(!onlyWithMedia)}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-all border inline-flex items-center gap-1.5 ${
            onlyWithMedia
              ? 'bg-amber-800 text-white border-amber-800 shadow-sm'
              : 'bg-white text-stone-700 border-stone-300 hover:border-amber-400'
          }`}
        >
          <PictureOutlined />
          Có ảnh / Video thực tế
        </button>
      </div>

      {/* Social Stream List */}
      {loading ? (
        <div className="py-12 text-center">
          <Spin size="large" />
        </div>
      ) : !data?.items?.length ? (
        <div className="py-8 bg-white rounded-xl border border-stone-200 text-center">
          <Empty description="Chưa có đánh giá nào phù hợp với bộ lọc đã chọn" />
        </div>
      ) : (
        <div className="space-y-4">
          {data.items.map((review) => (
            <div
              key={review.id}
              className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs hover:border-amber-200 transition-all duration-200"
            >
              {/* Header: Author info, rating & variant tag */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center font-bold text-amber-800 text-sm overflow-hidden">
                    {review.authorAvatarUrl ? (
                      <img src={review.authorAvatarUrl} alt={review.authorName} className="w-full h-full object-cover" />
                    ) : (
                      review.authorName?.charAt(0) || 'U'
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">{review.authorName}</span>
                      {review.isVerifiedPurchase && (
                        <Tag
                          color="green"
                          className="inline-flex items-center gap-1 text-[11px] font-medium border-emerald-300 text-emerald-800 bg-emerald-50 rounded-full px-2"
                        >
                          <CheckCircleFilled className="text-emerald-600" />
                          Đã mua hàng
                        </Tag>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Rate disabled defaultValue={review.rating} className="text-amber-500 text-xs" />
                      <span className="text-xs text-stone-400">
                        · {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>
                </div>

                {review.variantName && (
                  <Tag color="gold" className="text-xs font-medium border-amber-300 text-amber-900 bg-amber-50/80 rounded-md">
                    {review.variantName}
                  </Tag>
                )}
              </div>

              {/* Title & Content */}
              {review.title && (
                <div className="font-semibold text-stone-900 mt-3 text-sm">
                  {review.title}
                </div>
              )}
              <p className="text-stone-700 text-sm mt-1.5 whitespace-pre-line leading-relaxed">
                {review.content}
              </p>

              {/* Photo Gallery Grid */}
              {review.mediaUrls && review.mediaUrls.length > 0 && (
                <div className="mt-3">
                  <Image.PreviewGroup>
                    <Space wrap size={8}>
                      {review.mediaUrls.map((url, idx) => (
                        <Image
                          key={idx}
                          src={url}
                          alt="Ảnh thực tế bánh"
                          width={88}
                          height={88}
                          className="rounded-lg object-cover border border-stone-200"
                        />
                      ))}
                    </Space>
                  </Image.PreviewGroup>
                </div>
              )}

              {/* Official Supplier Reply Thread */}
              {review.supplierReply && (
                <div className="mt-4 p-3.5 bg-amber-50/60 rounded-xl border-l-4 border-amber-700 text-xs text-stone-700">
                  <div className="flex items-center gap-1.5 font-bold text-amber-950 mb-1">
                    <ShopOutlined className="text-amber-800" />
                    <span>Phản hồi chính thức từ Nhà cung cấp</span>
                    {review.supplierRepliedAt && (
                      <span className="font-normal text-stone-400">
                        ({new Date(review.supplierRepliedAt).toLocaleDateString('vi-VN')})
                      </span>
                    )}
                  </div>
                  <p className="m-0 leading-relaxed text-stone-800">{review.supplierReply}</p>
                </div>
              )}

              {/* Actions footer: Like button & Supplier reply trigger */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => handleToggleLike(review.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    review.isLikedByMe
                      ? 'bg-rose-50 text-rose-600 border border-rose-200'
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                  aria-label="Thích bài đánh giá"
                >
                  {review.isLikedByMe ? <LikeFilled /> : <LikeOutlined />}
                  <span>Hữu ích ({review.likeCount || 0})</span>
                </button>

                {isSupplier && !review.supplierReply && (
                  <Button
                    type="link"
                    size="small"
                    icon={<CommentOutlined />}
                    onClick={() => setReplyingReview(review)}
                    className="text-amber-800 hover:text-amber-700 text-xs font-semibold p-0"
                  >
                    Phản hồi đánh giá này
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Write Review */}
      <WriteProductReviewModal
        visible={writeModalVisible}
        onClose={() => setWriteModalVisible(false)}
        productId={productId}
        productName={productName}
        onSuccess={handleReviewCreated}
      />

      {/* Modal Supplier Reply */}
      {replyingReview && (
        <SupplierReviewReplyModal
          visible={Boolean(replyingReview)}
          onClose={() => setReplyingReview(null)}
          reviewId={replyingReview.id}
          isProductReview
          reviewAuthor={replyingReview.authorName}
          onSuccess={handleReplySubmitted}
        />
      )}
    </div>
  );
}
