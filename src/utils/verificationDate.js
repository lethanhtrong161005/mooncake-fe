export const verificationDate = (value) => value ? new Intl.DateTimeFormat('vi-VN', {
  dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Ho_Chi_Minh',
}).format(new Date(value)) : '—';
