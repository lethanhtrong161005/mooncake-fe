import { useMemo, useState } from 'react';

const money = (value) => `${Number(value || 0).toLocaleString('vi-VN')} ₫`;

const shortMoney = (value) => {
  const num = Number(value || 0);
  if (num >= 1_000_000_000) {
    const val = num / 1_000_000_000;
    return `${Number.isInteger(val) ? val : val.toFixed(1)} tỷ`;
  }
  if (num >= 1_000_000) {
    const val = num / 1_000_000;
    return `${Number.isInteger(val) ? val : val.toFixed(1)} tr`;
  }
  if (num >= 1_000) {
    return `${Math.round(num / 1_000)} k`;
  }
  return `${Math.round(num)}`;
};

const RANGE_OPTIONS = [
  { key: '7d', label: '7 ngày' },
  { key: '14d', label: '14 ngày' },
  { key: '6m', label: '6 tháng' },
];

/**
 * Executive revenue trend and channel mix charts for the Supplier Dashboard.
 * Combines recognized B2B direct order revenue and RFQ contract revenue.
 *
 * @param {Object} props
 * @param {Object} props.metrics - Aggregated supplier dashboard summary from backend
 * @param {boolean} props.loading - Summary loading state
 * @param {string|null} props.error - Summary error message if request failed
 * @param {Function|null} props.onRetry - Retry callback for failed summary fetches
 */
export default function SupplierRevenueCharts({
  metrics = {},
  loading = false,
  error = null,
  onRetry = null,
}) {
  const [range, setRange] = useState('14d');
  const [hoveredKey, setHoveredKey] = useState(null);

  const series = useMemo(() => {
    const daily = Array.isArray(metrics.dailyTrend) ? metrics.dailyTrend : [];
    const monthly = Array.isArray(metrics.monthlyTrend) ? metrics.monthlyTrend : [];
    if (range === '7d') return daily.slice(-7);
    if (range === '6m') return monthly;
    return daily;
  }, [metrics.dailyTrend, metrics.monthlyTrend, range]);

  const chartStats = useMemo(() => {
    const totals = series.map((item) => Number(item.directOrderRevenue || 0) + Number(item.contractRevenue || 0));
    const maxRaw = Math.max(0, ...totals);
    const yMax = maxRaw > 0 ? Math.ceil(maxRaw * 1.15) : 10_000_000;
    const periodDirect = series.reduce((sum, item) => sum + Number(item.directOrderRevenue || 0), 0);
    const periodContract = series.reduce((sum, item) => sum + Number(item.contractRevenue || 0), 0);
    const periodPaid = series.reduce((sum, item) => sum + Number(item.paidRevenue || 0), 0);
    const periodOrders = series.reduce((sum, item) => sum + Number(item.orderCount || 0), 0);
    const periodContracts = series.reduce((sum, item) => sum + Number(item.contractCount || 0), 0);
    return {
      yMax,
      periodDirect,
      periodContract,
      periodTotal: periodDirect + periodContract,
      periodPaid,
      periodOrders,
      periodContracts,
    };
  }, [series]);

  const activePoint = useMemo(() => {
    if (!series.length) return null;
    if (hoveredKey) {
      return series.find((item) => item.key === hoveredKey) || null;
    }
    const lastWithRevenue = [...series]
      .reverse()
      .find((item) => Number(item.directOrderRevenue || 0) + Number(item.contractRevenue || 0) > 0);
    return lastWithRevenue || series[series.length - 1];
  }, [hoveredKey, series]);

  const totalRevenue = Number(metrics.totalRevenue || 0);
  const directRevenue = Number(metrics.directOrderRevenue || 0);
  const contractRevenue = Number(metrics.contractRevenue || 0);
  const paidRevenue = Number(metrics.directOrderPaidRevenue || 0) + Number(metrics.contractPaidRevenue || 0);
  const refundedAmount = Number(metrics.refundedAmount || 0);

  const directPct = totalRevenue > 0 ? Math.round((directRevenue / totalRevenue) * 100) : 0;
  const contractPct = totalRevenue > 0 ? 100 - directPct : 0;
  const collectionPct = totalRevenue > 0 ? Math.min(100, Math.round((paidRevenue / totalRevenue) * 100)) : 0;

  // SVG chart coordinate system
  const svgW = 640;
  const svgH = 236;
  const padL = 52;
  const padR = 14;
  const padT = 16;
  const padB = 30;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;
  const colStep = series.length > 0 ? plotW / series.length : plotW;
  const barW = Math.min(34, Math.max(12, colStep * 0.56));

  // SVG Donut ring geometry
  const ringRadius = 48;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const directArc = totalRevenue > 0 ? (directRevenue / totalRevenue) * ringCircumference : 0;
  const contractArc = totalRevenue > 0 ? (contractRevenue / totalRevenue) * ringCircumference : 0;

  const statusRows = [
    {
      key: 'delivered',
      label: 'Hoàn thành',
      count: Number(metrics.deliveredOrders || 0),
      color: '#2d5a43',
    },
    {
      key: 'processing',
      label: 'Đang xử lý & giao',
      count: Number(metrics.processingOrders || 0),
      color: '#b57914',
    },
    {
      key: 'pending',
      label: 'Chờ xác nhận',
      count: Number(metrics.pendingOrders || 0),
      color: '#8c6d1f',
    },
    {
      key: 'cancelled',
      label: 'Đã hủy / Hết hạn',
      count: Number(metrics.cancelledOrders || 0),
      color: '#a63a3a',
    },
  ];
  const totalStatusCount = Math.max(1, Number(metrics.totalOrders || 0));

  return (
    <section aria-label="Biểu đồ phân tích doanh thu" className="sd-charts-grid">
      <div className="sd-chart-panel">
        <div className="sd-chart-header">
          <div>
            <h2 className="sd-chart-title">Biểu đồ doanh thu theo thời gian</h2>
            <p className="sd-chart-subtitle">
              Tổng hợp đơn B2B hợp lệ (đã trừ hoàn tiền) và hợp đồng RFQ hiệu lực
            </p>
          </div>
          <div className="sd-range-switch" role="group" aria-label="Chọn khoảng thời gian biểu đồ">
            {RANGE_OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                aria-pressed={range === option.key}
                onClick={() => {
                  setRange(option.key);
                  setHoveredKey(null);
                }}
                className={`sd-range-btn${range === option.key ? ' is-active' : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="sd-chart-legend-bar">
          <div className="sd-legend-items">
            <span className="sd-legend-item">
              <span className="sd-legend-swatch" style={{ backgroundColor: '#7d1322' }} />
              Đơn B2B ({money(chartStats.periodDirect)})
            </span>
            <span className="sd-legend-item">
              <span className="sd-legend-swatch" style={{ backgroundColor: '#b57914' }} />
              Hợp đồng RFQ ({money(chartStats.periodContract)})
            </span>
          </div>
          {activePoint && (
            <div className="sd-point-readout" aria-live="polite">
              <span className="sd-point-readout__date">{activePoint.label}</span>
              <span>B2B: <strong>{money(activePoint.directOrderRevenue)}</strong></span>
              <span>RFQ: <strong>{money(activePoint.contractRevenue)}</strong></span>
              <span>
                ({activePoint.orderCount || 0} đơn · {activePoint.contractCount || 0} HĐ)
              </span>
            </div>
          )}
        </div>

        {loading && !series.length ? (
          <div className="sd-chart-empty">Đang tải dữ liệu biểu đồ doanh thu...</div>
        ) : error && !series.length ? (
          <div className="sd-chart-empty sd-chart-empty--error" role="alert">
            <span>Không thể tải dữ liệu biểu đồ doanh thu ({error}).</span>
            {onRetry && (
              <button
                type="button"
                className="sd-chart-retry-btn"
                onClick={onRetry}
              >
                Thử lại
              </button>
            )}
          </div>
        ) : series.length === 0 ? (
          <div className="sd-chart-empty">Chưa có dữ liệu doanh thu trong giai đoạn này.</div>
        ) : (
          <div className="sd-svg-wrap">
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="sd-revenue-svg"
              role="img"
              aria-label="Biểu đồ cột doanh thu theo thời gian giữa đơn B2B và hợp đồng RFQ"
            >
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = padT + plotH * (1 - ratio);
                const tickVal = chartStats.yMax * ratio;
                return (
                  <g key={ratio}>
                    <line
                      x1={padL}
                      x2={svgW - padR}
                      y1={y}
                      y2={y}
                      stroke={ratio === 0 ? '#d8cec3' : '#eee7de'}
                      strokeDasharray={ratio === 0 ? undefined : '4 4'}
                      strokeWidth="1"
                    />
                    <text
                      x={padL - 8}
                      y={y + 4}
                      textAnchor="end"
                      fill="#6c625e"
                      fontSize="11"
                      fontFamily="Be Vietnam Pro, sans-serif"
                    >
                      {shortMoney(tickVal)}
                    </text>
                  </g>
                );
              })}

              {series.map((item, idx) => {
                const directVal = Number(item.directOrderRevenue || 0);
                const contractVal = Number(item.contractRevenue || 0);
                const totalVal = directVal + contractVal;
                const centerX = padL + colStep * idx + colStep / 2;
                const barX = centerX - barW / 2;

                const directH = directVal > 0 ? Math.max(3, (directVal / chartStats.yMax) * plotH) : 0;
                const contractH = contractVal > 0 ? Math.max(3, (contractVal / chartStats.yMax) * plotH) : 0;
                const directY = padT + plotH - directH;
                const contractY = directY - contractH;
                const isSelected = activePoint?.key === item.key;

                const showXLabel = series.length <= 8 || idx % 2 === 0 || idx === series.length - 1;

                return (
                  <g
                    key={item.key}
                    className="sd-bar-group"
                    onMouseEnter={() => setHoveredKey(item.key)}
                    onMouseLeave={() => setHoveredKey(null)}
                    onFocus={() => setHoveredKey(item.key)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${item.label}: Đơn B2B ${money(directVal)}, Hợp đồng RFQ ${money(contractVal)}`}
                  >
                    <rect
                      x={padL + colStep * idx}
                      y={padT}
                      width={colStep}
                      height={plotH}
                      fill={isSelected ? 'rgba(125, 19, 34, 0.05)' : 'transparent'}
                      rx="4"
                    />

                    {totalVal === 0 && (
                      <line
                        x1={barX + 2}
                        x2={barX + barW - 2}
                        y1={padT + plotH - 1}
                        y2={padT + plotH - 1}
                        stroke="#ded5ca"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    )}

                    {directH > 0 && (
                      <rect
                        x={barX}
                        y={directY}
                        width={barW}
                        height={directH}
                        rx={contractH > 0 ? 0 : 3}
                        fill={isSelected ? '#660e1b' : '#7d1322'}
                      />
                    )}

                    {contractH > 0 && (
                      <rect
                        x={barX}
                        y={contractY}
                        width={barW}
                        height={contractH}
                        rx="3"
                        fill={isSelected ? '#99640b' : '#b57914'}
                      />
                    )}

                    {totalVal > 0 && isSelected && (
                      <text
                        x={centerX}
                        y={Math.max(12, Math.min(directY, contractY) - 6)}
                        textAnchor="middle"
                        fill="#231a18"
                        fontSize="11"
                        fontWeight="600"
                        fontFamily="Be Vietnam Pro, sans-serif"
                      >
                        {shortMoney(totalVal)}
                      </text>
                    )}

                    {showXLabel && (
                      <text
                        x={centerX}
                        y={svgH - 8}
                        textAnchor="middle"
                        fill={isSelected ? '#7d1322' : '#6c625e'}
                        fontWeight={isSelected ? '600' : '400'}
                        fontSize="11"
                        fontFamily="Be Vietnam Pro, sans-serif"
                      >
                        {item.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        )}
      </div>

      <div className="sd-chart-panel sd-chart-panel--side">
        <div className="sd-chart-header">
          <div>
            <h2 className="sd-chart-title">Cơ cấu nguồn thu &amp; Đối soát</h2>
            <p className="sd-chart-subtitle">Tỷ trọng theo kênh bán và tình trạng thu hồi tiền hàng</p>
          </div>
        </div>

        <div className="sd-donut-row">
          <div className="sd-donut-box">
            <svg viewBox="0 0 132 132" className="sd-donut-svg" role="img" aria-label="Biểu đồ tỷ trọng doanh thu B2B và RFQ">
              <circle
                cx="66"
                cy="66"
                r={ringRadius}
                fill="none"
                stroke="#ede6dd"
                strokeWidth="16"
              />
              {directArc > 0 && (
                <circle
                  cx="66"
                  cy="66"
                  r={ringRadius}
                  fill="none"
                  stroke="#7d1322"
                  strokeWidth="16"
                  strokeDasharray={`${directArc} ${ringCircumference}`}
                  transform="rotate(-90 66 66)"
                />
              )}
              {contractArc > 0 && (
                <circle
                  cx="66"
                  cy="66"
                  r={ringRadius}
                  fill="none"
                  stroke="#b57914"
                  strokeWidth="16"
                  strokeDasharray={`${contractArc} ${ringCircumference}`}
                  strokeDashoffset={-directArc}
                  transform="rotate(-90 66 66)"
                />
              )}
              <text
                x="66"
                y="62"
                textAnchor="middle"
                fill="#6c625e"
                fontSize="10"
                fontFamily="Be Vietnam Pro, sans-serif"
              >
                Tổng ròng
              </text>
              <text
                x="66"
                y="79"
                textAnchor="middle"
                fill="#231a18"
                fontSize="13"
                fontWeight="700"
                fontFamily="Playfair Display, Georgia, serif"
              >
                {totalRevenue > 0 ? shortMoney(totalRevenue) : '0 ₫'}
              </text>
            </svg>
          </div>

          <div className="sd-channel-list">
            <div className="sd-channel-item">
              <div className="sd-channel-item__top">
                <span className="sd-legend-item">
                  <span className="sd-legend-swatch" style={{ backgroundColor: '#7d1322' }} />
                  Đơn B2B ({directPct}%)
                </span>
                <strong>{money(directRevenue)}</strong>
              </div>
              <div className="sd-channel-item__meta">
                {metrics.activeDirectOrdersCount || 0} đơn ghi nhận · Đã thu {money(metrics.directOrderPaidRevenue)}
              </div>
            </div>

            <div className="sd-channel-item">
              <div className="sd-channel-item__top">
                <span className="sd-legend-item">
                  <span className="sd-legend-swatch" style={{ backgroundColor: '#b57914' }} />
                  Hợp đồng RFQ ({contractPct}%)
                </span>
                <strong>{money(contractRevenue)}</strong>
              </div>
              <div className="sd-channel-item__meta">
                {metrics.activeContractsCount || 0} hợp đồng · Đã thu {money(metrics.contractPaidRevenue)}
              </div>
            </div>
          </div>
        </div>

        <div className="sd-collection-block">
          <div className="sd-collection-head">
            <span>Tỷ lệ thực thu thanh toán</span>
            <strong style={{ color: '#2d5a43' }}>{collectionPct}%</strong>
          </div>
          <div className="sd-progress-track" role="progressbar" aria-valuenow={collectionPct} aria-valuemin={0} aria-valuemax={100}>
            <div className="sd-progress-fill" style={{ width: `${collectionPct}%` }} />
          </div>
          <div className="sd-collection-foot">
            <span>Đã thanh toán: {money(paidRevenue)}</span>
            {refundedAmount > 0 && (
              <span style={{ color: '#a63a3a' }}>Đã hoàn khách: {money(refundedAmount)}</span>
            )}
          </div>
        </div>

        <div className="sd-status-breakdown">
          <div className="sd-status-breakdown__title">Trạng thái toàn bộ đơn B2B</div>
          <div className="sd-status-list">
            {statusRows.map((row) => {
              const pct = Math.round((row.count / totalStatusCount) * 100);
              return (
                <div key={row.key} className="sd-status-row">
                  <div className="sd-status-row__label">
                    <span className="sd-legend-swatch" style={{ backgroundColor: row.color }} />
                    <span>{row.label}</span>
                  </div>
                  <div className="sd-status-row__bar">
                    <div
                      className="sd-status-row__fill"
                      style={{ width: `${row.count > 0 ? Math.max(6, pct) : 0}%`, backgroundColor: row.color }}
                    />
                  </div>
                  <span className="sd-status-row__val">{row.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
