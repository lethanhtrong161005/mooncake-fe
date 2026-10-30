import { Tag, Tooltip } from 'antd';
import {
  CrownOutlined,
  SafetyCertificateOutlined,
  StarFilled,
} from '@ant-design/icons';

const REPUTATION_TIERS = {
  New: {
    title: 'Mới',
    color: 'default',
    min: 0,
    max: 20,
    icon: <SafetyCertificateOutlined />,
    className: 'bg-stone-100 text-stone-700 border-stone-300',
  },
  Reliable: {
    title: 'Tin cậy',
    color: 'blue',
    min: 21,
    max: 50,
    icon: <SafetyCertificateOutlined />,
    className: 'bg-blue-50 text-blue-700 border-blue-300',
  },
  Reputable: {
    title: 'Uy tín',
    color: 'purple',
    min: 51,
    max: 80,
    icon: <StarFilled />,
    className: 'bg-purple-50 text-purple-700 border-purple-300',
  },
  GoldPartner: {
    title: 'Đối tác Vàng',
    color: 'gold',
    min: 81,
    max: 9999,
    icon: <CrownOutlined />,
    className: 'bg-amber-50 text-amber-800 border-amber-400 font-bold shadow-sm',
  },
};

export default function ReputationBadge({ score = 0, showScore = true }) {
  const numericScore = Number(score || 0);
  const tierKey =
    numericScore >= 81
      ? 'GoldPartner'
      : numericScore >= 51
        ? 'Reputable'
        : numericScore >= 21
          ? 'Reliable'
          : 'New';

  const tier = REPUTATION_TIERS[tierKey];

  return (
    <Tooltip
      title={
        <div className="text-xs space-y-1 p-1">
          <div className="font-semibold text-amber-300">Huy Hiệu: {tier.title}</div>
          <div>Điểm uy tín: <strong>{numericScore.toFixed(1)}đ</strong></div>
          <div className="text-stone-300">
            {tierKey === 'GoldPartner' && 'Top xưởng bánh thượng hạng, ưu tiên gợi ý thầu RFQ.'}
            {tierKey === 'Reputable' && 'Năng lực sản xuất và dịch vụ ổn định, tăng thứ hạng tìm kiếm.'}
            {tierKey === 'Reliable' && 'Đã hoàn thành các đơn hàng đầu tiên đúng hạn.'}
            {tierKey === 'New' && 'Xưởng bánh mới gia nhập nền tảng.'}
          </div>
        </div>
      }
    >
      <Tag
        color={tier.color}
        className={`inline-flex items-center gap-1.5 font-medium rounded-full px-2.5 py-0.5 border cursor-help transition-all duration-200 hover:scale-105 ${tier.className}`}
        aria-label={`Huy hiệu uy tín ${tier.title}, điểm số ${numericScore}`}
      >
        {tier.icon}
        <span>{tier.title}</span>
        {showScore && <span className="text-xs opacity-90 font-semibold">({numericScore.toFixed(0)}đ)</span>}
      </Tag>
    </Tooltip>
  );
}
