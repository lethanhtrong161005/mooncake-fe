import './workspace.css';

/**
 * KPI row for supplier/admin workspace pages.
 * Tones map to the brand palette instead of antd's default blue/purple/green.
 *
 * items: [{ key, label, value, hint?, icon?, tone?: 'accent' | 'gold' | 'success' | 'neutral', pulse? }]
 */
export default function WorkspaceStats({ items, columns = items.length }) {
  return (
    <div className="workspace-stats" style={{ '--workspace-stats-cols': columns }}>
      {items.map((item) => (
        <div key={item.key || item.label} className={`workspace-stat workspace-stat--${item.tone || 'neutral'}`}>
          <div className="workspace-stat__head">
            <span className="workspace-stat__label">{item.label}</span>
            {item.icon && <span className="workspace-stat__icon" aria-hidden="true">{item.icon}</span>}
          </div>
          <strong className="workspace-stat__value">
            {item.value}
            {item.pulse && <span className="workspace-stat__pulse" aria-label="Cần xử lý" />}
          </strong>
          {item.hint && <span className="workspace-stat__hint">{item.hint}</span>}
        </div>
      ))}
    </div>
  );
}
