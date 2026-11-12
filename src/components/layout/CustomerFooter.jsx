import {
  CarOutlined,
  SafetyCertificateOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import AppLogo from './AppLogo';
import './customer-footer.css';

const TRUST_ITEMS = [
  { icon: <CarOutlined />, title: 'Giao Hàng Đúng Hẹn', description: 'Bảo đảm nhiệt độ & tiến độ' },
  { icon: <SafetyCertificateOutlined />, title: 'Bảo Đảm An Toàn', description: 'Ký quỹ an tâm tuyệt đối' },
  { icon: <FileDoneOutlined />, title: 'Hợp Đồng Rõ Ràng', description: 'Xuất hóa đơn tài chính' },
  { icon: <CheckCircleOutlined />, title: 'Xưởng Đạt Chuẩn', description: 'An toàn vệ sinh thực phẩm' },
];

const LINK_GROUPS = [
  {
    title: 'Dòng Sản Phẩm',
    links: [
      { label: 'Bánh nướng truyền thống', route: 'tim-kiem' },
      { label: 'Bánh dẻo hương sen & cốm', route: 'tim-kiem' },
      { label: 'Hộp sơn mài cao cấp', route: 'tim-kiem' },
      { label: 'Bánh dinh dưỡng ít ngọt', route: 'tim-kiem' },
    ],
  },
  {
    title: 'Dịch Vụ Doanh Nghiệp',
    links: [
      { label: 'Yêu cầu báo giá nhanh', route: 'so-sanh-bao-gia' },
      { label: 'In khắc logo & thiết kế riêng', route: 'dat-hang-thiet-ke' },
      { label: 'Hợp đồng & bảo đảm ký quỹ', route: 'hop-dong-tien-do' },
      { label: 'Giao hàng & biên bản bàn giao', route: 'giao-hang-pod' },
    ],
  },
  {
    title: 'Dành Cho Đối Tác',
    links: [
      { label: 'Dành cho xưởng: Mở gian hàng', route: 'dang-ky-nha-cung-cap' },
      { label: 'Xem danh sách gói thầu báo giá', route: 'nha-cung-cap/dau-thau' },
      { label: 'Cổng quản trị hệ thống sàn', route: 'admin/dashboard' },
    ],
  },
];

const CONTACTS = [
  { icon: <PhoneOutlined />, content: <>Tổng đài: <strong>1900 6868</strong> (8:00 - 21:00)</> },
  { icon: <MailOutlined />, content: 'Hộp thư: hotro@nguyetpho.vn' },
  { icon: <EnvironmentOutlined />, content: 'Hà Nội: Hoàn Kiếm | TP. HCM: Quận 1' },
];

const LEGAL_LINKS = ['Điều khoản dịch vụ', 'Chính sách bảo mật', 'Quy chế hoạt động sàn'];

export default function CustomerFooter({ onNavigate }) {
  return (
    <footer className="customer-footer">
      <ul className="customer-footer__container customer-footer__trust-list">
        {TRUST_ITEMS.map((item) => (
          <li key={item.title} className="customer-footer__trust-item">
            <span className="customer-footer__trust-icon" aria-hidden="true">{item.icon}</span>
            <span>
              <strong>{item.title}</strong>
              <small>{item.description}</small>
            </span>
          </li>
        ))}
      </ul>

      <div className="customer-footer__container customer-footer__main">
        <div className="customer-footer__brand">
          <AppLogo
            size="default"
            subtitle="Bánh Trung Thu Doanh Nghiệp"
            onClick={() => onNavigate?.('trang-chu')}
          />
          <p>
            Sàn thương mại điện tử chuyên nghiệp kết nối các xưởng bánh nghệ nhân và khách hàng doanh nghiệp trên toàn quốc.
          </p>
          <ul className="customer-footer__contacts">
            {CONTACTS.map((contact, index) => (
              <li key={index}>
                <span aria-hidden="true">{contact.icon}</span>
                <span>{contact.content}</span>
              </li>
            ))}
          </ul>
        </div>

        {LINK_GROUPS.map((group) => (
          <nav key={group.title} className="customer-footer__group" aria-label={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.links.map((link) => (
                <li key={link.label}>
                  <button type="button" onClick={() => onNavigate?.(link.route)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="customer-footer__container customer-footer__bottom">
        <span>
          © {new Date().getFullYear()} Sàn Giao Dịch Bánh Trung Thu Nguyệt Phố. Tất cả các quyền được bảo lưu.
        </span>
        <ul className="customer-footer__legal">
          {LEGAL_LINKS.map((label) => <li key={label}>{label}</li>)}
        </ul>
      </div>
    </footer>
  );
}
