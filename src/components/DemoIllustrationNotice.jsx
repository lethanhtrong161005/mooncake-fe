import { Alert } from 'antd';

export default function DemoIllustrationNotice({
  description = 'Dữ liệu mẫu chỉ dùng để minh họa giao diện; không được lưu hoặc xử lý như giao dịch thật.',
  style,
}) {
  return <Alert style={style} type="info" showIcon message="Dữ liệu minh họa · Chỉ xem" description={description} />;
}
