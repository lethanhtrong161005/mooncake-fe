import { Tag } from 'antd';
import {
  ClockCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

export const MILESTONE_STATUS_MAP = {
  Pending: { color: 'default', text: 'Chưa đến hạn' },
  AwaitingPayment: { color: 'warning', text: 'Chờ thanh toán' },
  Paid: { color: 'success', text: 'Đã thanh toán' },
  InProgress: { color: 'processing', text: 'Đang thực hiện' },
  PendingReview: { color: 'orange', text: 'Chờ nghiệm thu' },
  CompletedOnTime: { color: 'success', text: 'Đạt chuẩn (Đúng hạn)' },
  CompletedLate: { color: 'purple', text: 'Đạt chuẩn (Trễ hạn)' },
  Overdue: { color: 'error', text: 'Quá hạn' },
  Failed: { color: 'error', text: 'Khách yêu cầu sửa' },
};

export const getMilestoneDaysUntilDue = (dueDate) => {
  if (!dueDate) return null;
  const due = dayjs(dueDate).startOf('day');
  if (!due.isValid()) return null;
  const now = dayjs().startOf('day');
  return due.diff(now, 'day');
};

export const isMilestoneOverdue = (milestone) => {
  if (!milestone) return false;
  if (milestone.status === 'Overdue') return true;
  const isCompleted = ['CompletedOnTime', 'CompletedLate', 'Paid'].includes(milestone.status);
  if (isCompleted) return false;
  const diff = getMilestoneDaysUntilDue(milestone.dueDate);
  return diff !== null && diff < 0;
};

export const isMilestoneNearDeadline = (milestone) => {
  if (!milestone) return false;
  const isCompleted = ['CompletedOnTime', 'CompletedLate', 'Paid'].includes(milestone.status);
  if (isCompleted) return false;
  if (milestone.status === 'Overdue') return false;
  const diff = getMilestoneDaysUntilDue(milestone.dueDate);
  return diff !== null && diff >= 0 && diff <= 7;
};

export const renderMilestoneStatusTag = (milestone) => {
  if (!milestone) return null;

  if (isMilestoneOverdue(milestone)) {
    return (
      <Tag color="error" icon={<CloseCircleOutlined />}>
        Quá hạn
      </Tag>
    );
  }

  if (isMilestoneNearDeadline(milestone)) {
    const diff = getMilestoneDaysUntilDue(milestone.dueDate);
    const label = diff === 0 ? 'Sắp đến hạn (Hôm nay)' : `Sắp đến hạn (còn ${diff} ngày)`;
    return (
      <Tag color="warning" icon={<ClockCircleOutlined />}>
        {label}
      </Tag>
    );
  }

  const config = MILESTONE_STATUS_MAP[milestone.status] || {
    color: 'default',
    text: milestone.status || 'Chưa xác định',
  };

  return <Tag color={config.color}>{config.text}</Tag>;
};

export const extractRejectionReason = (notes) => {
  if (!notes || typeof notes !== 'string') return '';
  const match = notes.match(/\[Customer Rejection\]:\s*([\s\S]+)$/i);
  if (match) return match[1].trim();
  return notes.trim();
};
