/**
 * Formats user presence information into luxury, concise Vietnamese labels.
 */

export function formatPresence(presence) {
  if (!presence) {
    return null;
  }

  if (presence.isOnline) {
    return {
      statusText: 'Đang hoạt động',
      isOnline: true,
      badgeColor: '#52c41a',
    };
  }

  if (!presence.lastSeenAt) {
    return null;
  }

  const lastSeen = new Date(presence.lastSeenAt);
  const now = new Date();
  const diffMs = now - lastSeen;

  if (diffMs < 0 || isNaN(diffMs)) {
    return null;
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  if (diffMinutes < 1) {
    return {
      statusText: 'Vừa mới hoạt động',
      isOnline: false,
      badgeColor: '#bfbfbf',
    };
  }

  if (diffMinutes < 60) {
    return {
      statusText: `Hoạt động ${diffMinutes} phút trước`,
      isOnline: false,
      badgeColor: '#bfbfbf',
    };
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return {
      statusText: `Hoạt động ${diffHours} giờ trước`,
      isOnline: false,
      badgeColor: '#bfbfbf',
    };
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return {
      statusText: `Hoạt động ${diffDays} ngày trước`,
      isOnline: false,
      badgeColor: '#bfbfbf',
    };
  }

  const day = String(lastSeen.getDate()).padStart(2, '0');
  const month = String(lastSeen.getMonth() + 1).padStart(2, '0');
  const year = lastSeen.getFullYear();

  return {
    statusText: `Hoạt động ngày ${day}/${month}/${year}`,
    isOnline: false,
    badgeColor: '#bfbfbf',
  };
}

export default formatPresence;

