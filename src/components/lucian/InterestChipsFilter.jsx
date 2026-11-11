// Lucian UX/UI Prompt #019 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#019
import React, { useState, useRef } from 'react';
import './InterestChipsFilter.css';

export default function InterestChipsFilter({
  title = 'Dòng Bánh',
  subtitle = '',
  options = [],
  selected = [],
  onChange,
  max = 4,
}) {
  const rootRef = useRef(null);
  const [isWarn, setIsWarn] = useState(false);
  const [msg, setMsg] = useState('');
  const [shakingKey, setShakingKey] = useState(null);
  const timerRef = useRef(null);

  const isSelected = (val) => selected.includes(val);

  const handleToggle = (val) => {
    const active = isSelected(val);

    if (!active && selected.length >= max) {
      setShakingKey(val);
      setIsWarn(true);
      setMsg(`Tối đa ${max} phân loại`);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsWarn(false);
        setShakingKey(null);
        setMsg('');
      }, 1800);
      return;
    }

    const nextSelected = active
      ? selected.filter((item) => item !== val)
      : [...selected, val];

    onChange?.(nextSelected);

    if (nextSelected.length === max) {
      setMsg(`Đã chọn ${max}/${max}`);
    } else {
      setMsg('');
    }
  };

  return (
    <div ref={rootRef} className={`ux u019 ${isWarn ? 'is-warn' : ''}`}>
      <div className="u019-head">
        <div>
          <b>{title}</b>
          {subtitle && <small>{subtitle}</small>}
        </div>
        <span className="u019-cnt">
          <span className="u019-dots" aria-hidden="true">
            {Array.from({ length: max }).map((_, idx) => (
              <i key={idx} className={idx < selected.length ? 'on' : ''} />
            ))}
          </span>
          <span className="u019-n">
            {selected.length}/{max}
          </span>
        </span>
      </div>

      <div className="u019-list" role="group" aria-label={title}>
        {options.map((opt) => {
          const pressed = isSelected(opt.value);
          const isShaking = shakingKey === opt.value;

          return (
            <button
              key={opt.value}
              type="button"
              className={`u019-chip ${isShaking ? 'is-no' : ''}`}
              aria-pressed={pressed}
              onClick={() => handleToggle(opt.value)}
            >
              <span>{opt.label}</span>
              {opt.count !== undefined && (
                <span className="ml-1 text-[11px] opacity-75 font-normal">
                  ({opt.count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {msg && (
        <p className="u019-msg" aria-live="polite">
          {msg}
        </p>
      )}
    </div>
  );
}
