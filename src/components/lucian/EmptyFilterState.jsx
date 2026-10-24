// Lucian UX/UI Prompt #092 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#092
import React from 'react';
import './EmptyFilterState.css';

export default function EmptyFilterState({
  keyword = '',
  activeFiltersCount = 0,
  onResetFilters,
  onClearKeyword,
}) {
  return (
    <div className="ux u092-none" role="status">
      <div className="u092-art" aria-hidden="true">
        <svg viewBox="0 0 150 92">
          <path className="u092-shelf" d="M8 30h134M8 56h134M8 82h134" />
          <g className="u092-lens">
            <circle cx="34" cy="38" r="20" />
            <path className="gl" d="M24 30a12 12 0 0 1 8-5" />
            <path d="M48 52l14 14" />
          </g>
        </svg>
      </div>

      <p className="u092-nt">
        {keyword
          ? `Không tìm thấy mẫu bánh cho “${keyword}”`
          : 'Không có sản phẩm nào khớp với bộ lọc hiện tại'}
      </p>

      <p className="u092-ns">
        Thử nới lỏng khoảng giá, bỏ chọn một số dòng bánh hoặc thiết lập lại để xem toàn bộ danh mục.
      </p>

      <div className="u092-sgs">
        {keyword && (
          <button
            type="button"
            className="u092-sg"
            onClick={onClearKeyword}
          >
            <span>Xóa từ khóa tìm kiếm</span>
            <svg viewBox="0 0 15 15" aria-hidden="true">
              <path d="M3 7.5h9M8.5 4l3.5 3.5L8.5 11" />
            </svg>
          </button>
        )}

        {activeFiltersCount > 0 && (
          <button
            type="button"
            className="u092-sg"
            onClick={onResetFilters}
          >
            <span>Đặt lại toàn bộ bộ lọc</span>
            <svg viewBox="0 0 15 15" aria-hidden="true">
              <path d="M3 7.5h9M8.5 4l3.5 3.5L8.5 11" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
