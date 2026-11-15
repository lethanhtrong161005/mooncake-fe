import { useMemo, useState } from 'react';
import '../../styles/admin-dashboard.css';

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
 * Executive charts for the Admin Control Tower dashboard.
 * Visualizes combined Direct B2B Order GMV, RFQ Contract GMV, platform commission, and operational health.
 *
 * @param {Object} props
 * @param {Object|null} props.metrics - Platform metrics payload from /api/v1/reports/dashboard-metrics
 * @param {boolean} props.loading - Loading state for dashboard metrics
 * @param {string|null} props.error - Error message if fetching metrics fails
 * @param {Function|null} props.onRetry - Retry callback when fetching fails
 */
export default function AdminDashboardCharts({
  metrics = null,
  loading = false,
  error = null,
  onRetry = null,
}) {
  const [range, setRange] = useState('14d');
  const [hoveredKey, setHoveredKey] = useState(null);

  const safeMetrics = metrics || {};

  const series = useMemo(() => {
    const daily = Array.isArray(safeMetrics.dailyTrend) ? safeMetrics.dailyTrend : [];
    const monthly = Array.isArray(safeMetrics.monthlyTrend) ? safeMetrics.monthlyTrend : [];
    if (range === '7d') return daily.slice(-7);
    if (range === '6m') return monthly;
    return daily;
  }, [safeMetrics.dailyTrend, safeMetrics.monthlyTrend, range]);

  const chartStats = useMemo(() => {
    const totals = series.map(
      (item) => Number(item.directOrderGmv || 0) + Number(item.contractGmv || 0),
    );
    const maxRaw = Math.max(0, ...totals);
    const yMax = maxRaw > 0 ? Math.ceil(maxRaw * 1.15) : 50_000_000;
    const periodDirect = series.reduce((sum, item) => sum + Number(item.directOrderGmv || 0), 0);
    const periodContract = series.reduce((sum, item) => sum + Number(item.contractGmv || 0), 0);
    const periodCommission = series.reduce(
      (sum, item) => sum + Number(item.platformCommission || 0),
      0,
    );
    const periodOrders = series.reduce((sum, item) => sum + Number(item.orderCount || 0), 0);
    const periodContracts = series.reduce((sum, item) => sum + Number(item.contractCount || 0), 0);
    return {
      yMax,
      periodDirect,
      periodContract,
      periodTotal: periodDirect + periodContract,
      periodCommission,
      periodOrders,
      periodContracts,
    };
  }, [series]);

  const activePoint = useMemo(() => {
    if (!series.length) return null;
    if (hoveredKey) {
      return series.find((item) => item.key === hoveredKey) || null;
    }
    const lastWithGmv = [...series]
      .reverse()
      .find((item) => Number(item.directOrderGmv || 0) + Number(item.contractGmv || 0) > 0);
    return lastWithGmv || series[series.length - 1];
  }, [hoveredKey, series]);

  const totalGmv = Number(metrics?.totalGmv || 0);
  const directGmv = Number(metrics?.totalOrderGmv || 0);
  const contractGmv = Number(metrics?.totalContractsGmv || 0);
  const platformRevenue = Number(metrics?.platformRevenue || 0);
  const totalEscrow = Number(metrics?.totalEscrowBalance || 0);

  const directPct = totalGmv > 0 ? Math.round((directGmv / totalGmv) * 100) : 0;
  const contractPct = totalGmv > 0 ? 100 - directPct : 0;

  // Bar + Trendline SVG geometry
  const svgW = 660;
  const svgH = 240;
  const padL = 54;
  const padR = 16;
  const padT = 16;
  const padB = 30;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;
  const colStep = series.length > 0 ? plotW / series.length : plotW;
  const barW = Math.min(34, Math.max(12, colStep * 0.56));

  const trendPath = useMemo(() => {
    if (!series.length) return '';
    return series
      .map((item, idx) => {
        const total = Number(item.directOrderGmv || 0) + Number(item.contractGmv || 0);
        const cx = padL + idx * colStep + colStep / 2;
        const cy = padT + plotH - (total / chartStats.yMax) * plotH;
        return `${idx === 0 ? 'M' : 'L'} ${cx.toFixed(1)} ${cy.toFixed(1)}`;
      })
      .join(' ');
  }, [chartStats.yMax, colStep, padL, padT, plotH, series]);

  // Donut ring geometry
  const ringRadius = 48;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const directArc = totalGmv > 0 ? (directGmv / totalGmv) * ringCircumference : 0;
  const contractArc = totalGmv > 0 ? (contractGmv / totalGmv) * ringCircumference : 0;

  // Combined operational pipeline breakdown (Direct Orders + RFQ Contracts)
  const ob = metrics?.orderStatusBreakdown || {};
  const cb = metrics?.contractStatusBreakdown || {};
  const statusRows = [
    {
      key: 'completed',
      label: 'Hoàn tất / Đã giao',
      count: Number(ob.delivered || 0) + Number(cb.completed || 0),
      color: '#2d5a43',
    },
    {
      key: 'active',
      label: 'Đang triển khai',
      count: Number(ob.processing || 0) + Number(cb.active || 0),
      color: '#b57914',
    },
    {
      key: 'pending',
      label: 'Chờ xác nhận / Ký',
      count: Number(ob.pending || 0) + Number(cb.pending || 0),
      color: '#8c8078',
    },
    {
      key: 'issue',
      label: 'Hủy & Tranh chấp',
      count: Number(ob.cancelled || 0) + Number(cb.disputed || 0),
      color: '#a61d24',
    },
  ];
  const totalPipeline = statusRows.reduce((sum, item) => sum + item.count, 0);

  return (
    <section className="ad-charts-grid" aria-label="Biểu đồ điều hành toàn nền tảng">
      <div className="ad-chart-panel">
        <div className="ad-chart-head">
          <div>
            <h3 className="ad-chart-title">Diễn biến GMV toàn sàn</h3>
            <p className="ad-chart-subtitle">
              Kết hợp đơn đặt hàng B2B trực tiếp và hợp đồng chào thầu RFQ (giờ Việt Nam)
            </p>
          </div>
          <div className="ad-range-switch" role="group" aria-label="Khoảng thời gian biểu đồ">
            {RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                type="button"
                className={`ad-range-btn ${range === opt.key ? 'is-active' : ''}`}
                onClick={() => {
                  setRange(opt.key);
                  setHoveredKey(null);
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="ad-chart-legend-bar">
          <div className="ad-legend-items">
            <span className="ad-legend-item">
              <span className="ad-dot" style={{ backgroundColor: '#7d1322' }} />
              Đơn B2B trực tiếp
            </span>
            <span className="ad-legend-item">
              <span className="ad-dot" style={{ backgroundColor: '#b57914' }} />
              Hợp đồng RFQ
            </span>
            <span className="ad-legend-item">
              <span className="ad-line-swatch" style={{ backgroundColor: '#2d5a43' }} />
              Xu hướng tổng GMV
            </span>
          </div>

          {activePoint && (
            <div className="ad-point-readout" aria-live="polite">
              <span className="ad-point-readout__date">{activePoint.label}</span>
              <span>B2B: <strong>{money(activePoint.directOrderGmv)}</strong></span>
              <span>RFQ: <strong>{money(activePoint.contractGmv)}</strong></span>
              <span>Hoa hồng 3%: <strong>{money(activePoint.platformCommission)}</strong></span>
              <span>({activePoint.orderCount || 0} đơn · {activePoint.contractCount || 0} HĐ)</span>
            </div>
          )}
        </div>

        {loading && !series.length ? (
          <div className="ad-chart-empty">Đang tải dữ liệu biểu đồ toàn sàn...</div>
        ) : error && !series.length ? (
          <div className="ad-chart-empty ad-chart-empty--error" role="alert">
            <span>Không thể tải dữ liệu biểu đồ điều hành ({error}).</span>
            {onRetry && (
              <button
                type="button"
                className="ad-chart-retry-btn"
                onClick={onRetry}
              >
                Thử lại
              </button>
            )}
          </div>
        ) : series.length === 0 ? (
          <div className="ad-chart-empty">Chưa có giao dịch phát sinh trong giai đoạn này.</div>
        ) : (
          <div className="ad-svg-wrap">
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="ad-revenue-svg"
              role="img"
              aria-label="Biểu đồ cột chồng và đường xu hướng GMV toàn sàn giữa đơn B2B và hợp đồng RFQ"
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
                      stroke={ratio === 0 ? '#d8cfc5' : '#efe9e1'}
                      strokeDasharray={ratio === 0 ? undefined : '3 3'}
                    />
                    <text
                      x={padL - 8}
                      y={y + 4}
                      textAnchor="end"
                      fill="#6c625e"
                      fontSize="10.5"
                    >
                      {shortMoney(tickVal)}
                    </text>
                  </g>
                );
              })}

              {series.map((point, idx) => {
                const direct = Number(point.directOrderGmv || 0);
                const contract = Number(point.contractGmv || 0);
                const directH = (direct / chartStats.yMax) * plotH;
                const contractH = (contract / chartStats.yMax) * plotH;
                const x = padL + idx * colStep + (colStep - barW) / 2;
                const directY = padT + plotH - directH;
                const contractY = directY - contractH;
                const isSelected = activePoint?.key === point.key;
                const showLabel = series.length <= 8 || idx % 2 === 0 || idx === series.length - 1;

                return (
                  <g
                    key={point.key}
                    className={`ad-bar-group ${isSelected ? 'is-selected' : ''}`}
                    tabIndex={0}
                    aria-label={`${point.label}: Đơn B2B ${money(direct)}, Hợp đồng RFQ ${money(contract)}`}
                    onMouseEnter={() => setHoveredKey(point.key)}
                    onMouseLeave={() => setHoveredKey(null)}
                    onFocus={() => setHoveredKey(point.key)}
                  >
                    <rect
                      x={padL + idx * colStep}
                      y={padT}
                      width={colStep}
                      height={plotH}
                      fill={isSelected ? 'rgba(125, 19, 34, 0.04)' : 'transparent'}
                      rx="4"
                    />

                    {direct > 0 && (
                      <rect
                        x={x}
                        y={directY}
                        width={barW}
                        height={Math.max(directH, 2)}
                        fill="#7d1322"
                        rx={contract > 0 ? 0 : 3}
                        opacity={hoveredKey && !isSelected ? 0.58 : 1}
                      />
                    )}

                    {contract > 0 && (
                      <rect
                        x={x}
                        y={contractY}
                        width={barW}
                        height={Math.max(contractH, 2)}
                        fill="#b57914"
                        rx="3"
                        opacity={hoveredKey && !isSelected ? 0.58 : 1}
                      />
                    )}

                    {showLabel && (
                      <text
                        x={padL + idx * colStep + colStep / 2}
                        y={svgH - 9}
                        textAnchor="middle"
                        fill={isSelected ? '#7d1322' : '#6c625e'}
                        fontSize="10.5"
                        fontWeight={isSelected ? '600' : '400'}
                      >
                        {point.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {trendPath && (
                <path
                  d={trendPath}
                  fill="none"
                  stroke="#2d5a43"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pointerEvents="none"
                />
              )}

              {series.map((point, idx) => {
                const total = Number(point.directOrderGmv || 0) + Number(point.contractGmv || 0);
                const cx = padL + idx * colStep + colStep / 2;
                const cy = padT + plotH - (total / chartStats.yMax) * plotH;
                const isSelected = activePoint?.key === point.key;
                if (total <= 0 && !isSelected) return null;
                return (
                  <circle
                    key={`dot-${point.key}`}
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 4.2 : 2.8}
                    fill="#ffffff"
                    stroke="#2d5a43"
                    strokeWidth="2"
                    pointerEvents="none"
                  />
                );
              })}
            </svg>
          </div>
        )}

        <div className="ad-chart-foot">
          <div className="ad-foot-metric">
            <div className="ad-foot-metric__label">Tổng GMV kỳ đang xem</div>
            <div className="ad-foot-metric__value is-ruby">{money(chartStats.periodTotal)}</div>
          </div>
          <div className="ad-foot-metric">
            <div className="ad-foot-metric__label">Hoa hồng dự kiến (3%)</div>
            <div className="ad-foot-metric__value is-green">{money(chartStats.periodCommission)}</div>
          </div>
          <div className="ad-foot-metric">
            <div className="ad-foot-metric__label">Sản lượng giao dịch kỳ</div>
            <div className="ad-foot-metric__value">
              {chartStats.periodOrders} đơn · {chartStats.periodContracts} hợp đồng
            </div>
          </div>
        </div>
      </div>

      <div className="ad-chart-panel">
        <div className="ad-chart-head">
          <div>
            <h3 className="ad-chart-title">Cơ cấu nguồn thu & Vận hành</h3>
            <p className="ad-chart-subtitle">Tỷ trọng kênh B2B và trạng thái giao dịch toàn sàn</p>
          </div>
        </div>

        <div className="ad-donut-row">
          <div className="ad-donut-box">
            <svg viewBox="0 0 120 120" className="ad-donut-svg" role="img" aria-label="Biểu đồ tròn cơ cấu GMV toàn sàn">
              <circle
                cx="60"
                cy="60"
                r={ringRadius}
                fill="none"
                stroke="#f0eae2"
                strokeWidth="14"
              />
              {directArc > 0 && (
                <circle
                  cx="60"
                  cy="60"
                  r={ringRadius}
                  fill="none"
                  stroke="#7d1322"
                  strokeWidth="14"
                  strokeDasharray={`${directArc} ${ringCircumference}`}
                  transform="rotate(-90 60 60)"
                />
              )}
              {contractArc > 0 && (
                <circle
                  cx="60"
                  cy="60"
                  r={ringRadius}
                  fill="none"
                  stroke="#b57914"
                  strokeWidth="14"
                  strokeDasharray={`${contractArc} ${ringCircumference}`}
                  strokeDashoffset={-directArc}
                  transform="rotate(-90 60 60)"
                />
              )}
              <text x="60" y="56" textAnchor="middle" fill="#6c625e" fontSize="9.5">
                Tổng GMV
              </text>
              <text x="60" y="71" textAnchor="middle" fill="#231a18" fontSize="13" fontWeight="700">
                {totalGmv >= 1_000_000_000
                  ? `${(totalGmv / 1_000_000_000).toFixed(2).replace(/\.?0+$/, '')} tỷ`
                  : shortMoney(totalGmv)}
              </text>
            </svg>
          </div>

          <div className="ad-channel-list">
            <div className="ad-channel-item">
              <div className="ad-channel-item__top">
                <span className="ad-legend-item">
                  <span className="ad-dot" style={{ backgroundColor: '#7d1322' }} />
                  Đơn B2B trực tiếp
                </span>
                <strong>{directPct}%</strong>
              </div>
              <div className="ad-channel-item__meta">
                {money(directGmv)} · {Number(metrics?.totalOrdersCount || 0)} đơn hàng
              </div>
            </div>

            <div className="ad-channel-item">
              <div className="ad-channel-item__top">
                <span className="ad-legend-item">
                  <span className="ad-dot" style={{ backgroundColor: '#b57914' }} />
                  Hợp đồng RFQ
                </span>
                <strong>{contractPct}%</strong>
              </div>
              <div className="ad-channel-item__meta">
                {money(contractGmv)} · {Number(metrics?.totalContractsCount || 0)} hợp đồng
              </div>
            </div>
          </div>
        </div>

        <div className="ad-finance-strip">
          <div>
            <div className="ad-finance-cell__label">Hoa hồng nền tảng (3%)</div>
            <div className="ad-finance-cell__value" style={{ color: '#2d5a43' }}>
              {money(platformRevenue)}
            </div>
          </div>
          <div>
            <div className="ad-finance-cell__label">Ký quỹ hợp đồng đã thu</div>
            <div className="ad-finance-cell__value" style={{ color: '#9a6b16' }}>
              {money(totalEscrow)}
            </div>
          </div>
        </div>

        <div className="ad-pipeline-block">
          <div className="ad-pipeline-head">
            <span>Phân bổ trạng thái giao dịch ({totalPipeline})</span>
          </div>

          <div className="ad-stacked-track" role="img" aria-label="Thanh phân bổ trạng thái đơn hàng và hợp đồng">
            {totalPipeline > 0 && statusRows.map((row) => {
              const pct = (row.count / totalPipeline) * 100;
              if (pct <= 0) return null;
              return (
                <div
                  key={row.key}
                  style={{ width: `${pct}%`, backgroundColor: row.color }}
                  title={`${row.label}: ${row.count}`}
                />
              );
            })}
          </div>

          <div className="ad-status-grid">
            {statusRows.map((row) => (
              <div key={row.key} className="ad-status-row">
                <span className="ad-legend-item">
                  <span className="ad-dot" style={{ backgroundColor: row.color }} />
                  {row.label}
                </span>
                <strong>{row.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
