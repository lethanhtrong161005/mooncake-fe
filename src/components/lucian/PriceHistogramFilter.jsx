// Lucian UX/UI Prompt #024 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#024
import React, { useEffect, useRef, useState } from 'react';
import './PriceHistogramFilter.css';

const DEFAULT_COUNTS = [2, 4, 7, 12, 18, 24, 28, 20, 15, 12, 8, 5, 4, 3, 2];
const MAX_C = 28;

export default function PriceHistogramFilter({
  min = 50000,
  max = 1000000,
  value = [50000, 1000000],
  onChange,
  resultCount = 36,
}) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const [loPercent, setLoPercent] = useState(() => Math.round(((value[0] - min) / (max - min)) * 100));
  const [hiPercent, setHiPercent] = useState(() => Math.round(((value[1] - min) / (max - min)) * 100));
  const [activeDrag, setActiveDrag] = useState(null);

  const STEP = 2; // step in percent

  const toPrice = (pct) => {
    const raw = min + (pct / 100) * (max - min);
    return Math.round(raw / 10000) * 10000;
  };

  const formatShortVND = (num) => {
    return num.toLocaleString('vi-VN') + ' ₫';
  };

  const handlePointerDown = (e, key) => {
    e.target.setPointerCapture(e.pointerId);
    e.target.classList.add('drag');
    setActiveDrag(key);
  };

  const handlePointerMove = (e, key) => {
    if (!trackRef.current || activeDrag !== key) return;
    const rect = trackRef.current.getBoundingClientRect();
    const rawPct = Math.max(0, Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100 / STEP) * STEP));

    if (key === 'lo') {
      const nextLo = Math.min(rawPct, hiPercent - STEP * 3);
      setLoPercent(nextLo);
      onChange?.([toPrice(nextLo), toPrice(hiPercent)]);
    } else {
      const nextHi = Math.max(rawPct, loPercent + STEP * 3);
      setHiPercent(nextHi);
      onChange?.([toPrice(loPercent), nextHi === 100 ? max : toPrice(nextHi)]);
    }
  };

  const handlePointerUp = (e) => {
    e.target.classList.remove('drag');
    setActiveDrag(null);
  };

  const handleKeyDown = (e, key) => {
    const delta = (e.key === 'ArrowRight' || e.key === 'ArrowUp') ? STEP : (e.key === 'ArrowLeft' || e.key === 'ArrowDown') ? -STEP : 0;
    if (!delta) return;
    e.preventDefault();

    if (key === 'lo') {
      const nextLo = Math.max(0, Math.min(loPercent + delta, hiPercent - STEP * 3));
      setLoPercent(nextLo);
      onChange?.([toPrice(nextLo), toPrice(hiPercent)]);
    } else {
      const nextHi = Math.min(100, Math.max(hiPercent + delta, loPercent + STEP * 3));
      setHiPercent(nextHi);
      onChange?.([toPrice(loPercent), toPrice(nextHi)]);
    }
  };

  useEffect(() => {
    if (value && value.length === 2) {
      setLoPercent(Math.max(0, Math.min(100, Math.round(((value[0] - min) / (max - min)) * 100))));
      setHiPercent(Math.max(0, Math.min(100, Math.round(((value[1] - min) / (max - min)) * 100))));
    }
  }, [value[0], value[1], min, max]);

  return (
    <div
      ref={rootRef}
      className="ux u024"
      style={{
        '--a': loPercent,
        '--b': hiPercent,
      }}
    >
      <div className="u024-head">
        <div>
          <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">Khoảng Giá Sỉ</span>
          <span className="u024-val whitespace-nowrap">
            {formatShortVND(toPrice(loPercent))} – {formatShortVND(toPrice(hiPercent))}
          </span>
        </div>
        <span className="u024-count whitespace-nowrap">
          <span className="u024-roll">
            <span>{resultCount}</span>
          </span>
          {' '}mẫu
        </span>
      </div>

      {/* Histogram bars */}
      <div className="u024-hist" aria-hidden="true">
        {DEFAULT_COUNTS.map((c, i) => {
          const barCenter = ((i + 0.5) / DEFAULT_COUNTS.length) * 100;
          const isInside = barCenter >= loPercent && barCenter <= hiPercent;
          return (
            <span
              key={i}
              className={`u024-bar ${isInside ? 'in' : ''}`}
              style={{ '--h': Math.max(12, (c / MAX_C) * 100).toFixed(1) }}
            />
          );
        })}
      </div>

      {/* Range Track with dual handles */}
      <div ref={trackRef} className="u024-track">
        <span className="u024-rail" aria-hidden="true" />
        <span className="u024-sel" aria-hidden="true" />

        <button
          className="u024-h"
          type="button"
          role="slider"
          aria-label="Giá tối thiểu"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={toPrice(loPercent)}
          style={{ '--pos': loPercent }}
          onPointerDown={(e) => handlePointerDown(e, 'lo')}
          onPointerMove={(e) => handlePointerMove(e, 'lo')}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={(e) => handleKeyDown(e, 'lo')}
        />

        <button
          className="u024-h"
          type="button"
          role="slider"
          aria-label="Giá tối đa"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={toPrice(hiPercent)}
          style={{ '--pos': hiPercent }}
          onPointerDown={(e) => handlePointerDown(e, 'hi')}
          onPointerMove={(e) => handlePointerMove(e, 'hi')}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={(e) => handleKeyDown(e, 'hi')}
        />
      </div>

      <div className="u024-scale" aria-hidden="true">
        <span className="whitespace-nowrap">{formatShortVND(min)}</span>
        <span className="whitespace-nowrap">{formatShortVND(max)}</span>
      </div>
    </div>
  );
}
