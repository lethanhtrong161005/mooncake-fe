import { formatPresence } from '../../utils/presenceHelper';

export default function PresenceBadge({ presence, showText = true, className = '' }) {
  const formatted = formatPresence(presence);
  if (!formatted) {
    return null;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span
        className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
        style={{ backgroundColor: formatted.badgeColor }}
        aria-hidden="true"
      />
      {showText && (
        <span className="text-xs text-gray-500 font-normal">
          {formatted.statusText}
        </span>
      )}
    </span>
  );
}

