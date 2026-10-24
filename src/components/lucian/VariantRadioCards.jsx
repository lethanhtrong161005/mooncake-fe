// Lucian UX/UI Prompt #015 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#015
import React, { useEffect, useRef } from 'react';
import './VariantRadioCards.css';

export default function VariantRadioCards({
  variants = [],
  selectedSku,
  onChange,
  compact = false,
}) {
  const rootRef = useRef(null);
  const frameRef = useRef(null);
  const optRefs = useRef({});

  const updateFrame = (sku, animate = true) => {
    const el = optRefs.current[sku];
    if (el && frameRef.current) {
      if (!animate) {
        frameRef.current.style.transition = 'none';
      }
      frameRef.current.style.top = `${el.offsetTop}px`;
      frameRef.current.style.height = `${el.offsetHeight}px`;
      if (!animate) {
        requestAnimationFrame(() => {
          if (frameRef.current) frameRef.current.style.transition = '';
        });
      }
    }
  };

  useEffect(() => {
    if (selectedSku) {
      updateFrame(selectedSku, false);
    }
  }, [selectedSku, variants]);

  const handleSelect = (sku) => {
    updateFrame(sku, true);
    onChange?.(sku);
  };

  const handleKeyDown = (e, index) => {
    const count = variants.length;
    let nextIndex = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      nextIndex = (index + 1) % count;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + count) % count;
    }
    if (nextIndex !== null) {
      e.preventDefault();
      const nextSku = variants[nextIndex].sku;
      handleSelect(nextSku);
      optRefs.current[nextSku]?.focus();
    }
  };

  return (
    <div ref={rootRef} className={`ux u015 ${compact ? 'u015-compact' : ''}`}>
      <div className="u015-grp" role="radiogroup" aria-label="Lựa chọn biến thể bánh">
        <span ref={frameRef} className="u015-frame" aria-hidden="true" />
        
        {variants.map((v, i) => {
          const isChecked = selectedSku === v.sku;
          return (
            <button
              key={v.sku}
              ref={(el) => (optRefs.current[v.sku] = el)}
              type="button"
              role="radio"
              aria-checked={isChecked}
              tabIndex={isChecked ? 0 : -1}
              className="u015-opt"
              onClick={() => handleSelect(v.sku)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            >
              <span className="u015-dot" aria-hidden="true" />
              
              <div className="u015-txt">
                <b>
                  <span>{v.flavor}</span>
                  {v.isPopular && <em>Phổ biến</em>}
                </b>
                <small>
                  {v.crust} · {v.weight}g · Còn {v.stock} hộp
                </small>
              </div>

              <div className="u015-price">
                <b>{v.price.toLocaleString('vi-VN')} ₫</b>
                <small>/ cái</small>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
