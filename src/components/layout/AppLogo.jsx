export default function AppLogo({
  size = 'default',
  showText = true,
  subtitle = 'Bánh Trung Thu B2B',
  onClick,
  style = {},
}) {
  const iconSizes = {
    small: 32,
    default: 38,
    large: 48,
  };

  const titleSizes = {
    small: 15,
    default: 17,
    large: 20,
  };

  const iconPx = iconSizes[size] || 38;
  const titlePx = titleSizes[size] || 17;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        ...style,
      }}
      onClick={onClick}
    >
      <img
        src="/logo.svg"
        alt="Nguyệt Phố Logo"
        style={{
          width: iconPx,
          height: iconPx,
          marginRight: showText ? 10 : 0,
          borderRadius: 8,
          boxShadow: '0 2px 6px rgba(140, 21, 36, 0.2)',
          flexShrink: 0,
          display: 'block',
        }}
      />
      {showText && (
        <div style={{ lineHeight: 1.15 }}>
          <div
            style={{
              fontWeight: 800,
              fontSize: titlePx,
              color: '#8c1524',
              letterSpacing: '-0.3px',
              fontFamily: 'serif',
            }}
          >
            Nguyệt Phố
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 10,
                color: '#777',
                marginTop: 2,
                fontWeight: 500,
                letterSpacing: '0.2px',
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
