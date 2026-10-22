import { Row, Col, Space, Divider, Typography } from 'antd';
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

const { Text, Title, Link } = Typography;

export default function CustomerFooter({ onNavigate }) {
  return (
    <footer
      style={{
        background: '#ffffff',
        borderTop: '1px solid #ebdcd5',
        marginTop: 'auto',
      }}
    >
      {/* 1. Trust Bar - Cam kết dịch vụ ngắn gọn */}
      <div
        style={{
          background: '#fdf8f5',
          borderBottom: '1px solid #ebdcd5',
          padding: '16px 20px',
        }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col xs={12} sm={6}>
              <Space align="center" size={10}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: '#faeae1',
                    color: '#8c1524',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                  }}
                >
                  <CarOutlined />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#333' }}>Giao Hàng Đúng Hẹn</div>
                  <div style={{ fontSize: 11, color: '#777' }}>Bảo đảm nhiệt độ & tiến độ</div>
                </div>
              </Space>
            </Col>

            <Col xs={12} sm={6}>
              <Space align="center" size={10}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: '#faeae1',
                    color: '#8c1524',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                  }}
                >
                  <SafetyCertificateOutlined />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#333' }}>Bảo Đảm An Toàn</div>
                  <div style={{ fontSize: 11, color: '#777' }}>Ký quỹ an tâm tuyệt đối</div>
                </div>
              </Space>
            </Col>

            <Col xs={12} sm={6}>
              <Space align="center" size={10}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: '#faeae1',
                    color: '#8c1524',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                  }}
                >
                  <FileDoneOutlined />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#333' }}>Hợp Đồng Rõ Ràng</div>
                  <div style={{ fontSize: 11, color: '#777' }}>Xuất hóa đơn tài chính</div>
                </div>
              </Space>
            </Col>

            <Col xs={12} sm={6}>
              <Space align="center" size={10}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: '#faeae1',
                    color: '#8c1524',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                  }}
                >
                  <CheckCircleOutlined />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#333' }}>Xưởng Đạt Chuẩn</div>
                  <div style={{ fontSize: 11, color: '#777' }}>An toàn vệ sinh thực phẩm</div>
                </div>
              </Space>
            </Col>
          </Row>
        </div>
      </div>

      {/* 2. Main Content - 4 Cột gọn gàng */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '32px 20px 24px' }}>
        <Row gutter={[32, 24]}>
          {/* Cột 1: Thương hiệu & Thông tin liên hệ */}
          <Col xs={24} sm={12} lg={7}>
            <AppLogo
              size="default"
              subtitle="Bánh Trung Thu Doanh Nghiệp"
              onClick={() => onNavigate?.('trang-chu')}
              style={{ marginBottom: 12 }}
            />

            <p style={{ fontSize: 12, color: '#666', lineHeight: 1.6, marginBottom: 12, maxWidth: 320 }}>
              Sàn thương mại điện tử chuyên nghiệp kết nối các xưởng bánh nghệ nhân và khách hàng doanh nghiệp trên toàn quốc.
            </p>

            <div style={{ fontSize: 12, color: '#555', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <PhoneOutlined style={{ color: '#8c1524' }} />
                <span>Tổng đài: <strong>1900 6868</strong> (8:00 - 21:00)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MailOutlined style={{ color: '#8c1524' }} />
                <span>Hộp thư: hotro@nguyetpho.vn</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <EnvironmentOutlined style={{ color: '#8c1524' }} />
                <span>Hà Nội: Hoàn Kiếm | TP. HCM: Quận 1</span>
              </div>
            </div>
          </Col>

          {/* Cột 2: Sản phẩm */}
          <Col xs={12} sm={6} lg={5}>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#222', marginBottom: 12 }}>
              Dòng Sản Phẩm
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 12, lineHeight: 2 }}>
              <li>
                <span
                  style={{ color: '#666', cursor: 'pointer' }}
                  onClick={() => onNavigate?.('tim-kiem')}
                >
                  Bánh nướng truyền thống
                </span>
              </li>
              <li>
                <span
                  style={{ color: '#666', cursor: 'pointer' }}
                  onClick={() => onNavigate?.('tim-kiem')}
                >
                  Bánh dẻo hương sen & cốm
                </span>
              </li>
              <li>
                <span
                  style={{ color: '#666', cursor: 'pointer' }}
                  onClick={() => onNavigate?.('tim-kiem')}
                >
                  Hộp sơn mài cao cấp
                </span>
              </li>
              <li>
                <span
                  style={{ color: '#666', cursor: 'pointer' }}
                  onClick={() => onNavigate?.('tim-kiem')}
                >
                  Bánh dinh dưỡng ít ngọt
                </span>
              </li>
            </ul>
          </Col>

          {/* Cột 3: Dịch vụ doanh nghiệp */}
          <Col xs={12} sm={6} lg={6}>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#222', marginBottom: 12 }}>
              Dịch Vụ Doanh Nghiệp
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 12, lineHeight: 2 }}>
              <li>
                <span
                  style={{ color: '#666', cursor: 'pointer' }}
                  onClick={() => onNavigate?.('so-sanh-bao-gia')}
                >
                  Yêu cầu báo giá nhanh
                </span>
              </li>
              <li>
                <span
                  style={{ color: '#666', cursor: 'pointer' }}
                  onClick={() => onNavigate?.('dat-hang-thiet-ke')}
                >
                  In khắc logo & thiết kế riêng
                </span>
              </li>
              <li>
                <span
                  style={{ color: '#666', cursor: 'pointer' }}
                  onClick={() => onNavigate?.('hop-dong-tien-do')}
                >
                  Hợp đồng & bảo đảm ký quỹ
                </span>
              </li>
              <li>
                <span
                  style={{ color: '#666', cursor: 'pointer' }}
                  onClick={() => onNavigate?.('giao-hang-pod')}
                >
                  Giao hàng & biên bản bàn giao
                </span>
              </li>
            </ul>
          </Col>

          {/* Cột 4: Kênh đối tác */}
          <Col xs={24} sm={12} lg={6}>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#222', marginBottom: 12 }}>
              Dành Cho Đối Tác
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 12, lineHeight: 2 }}>
              <li>
                <span
                  style={{ color: '#666', cursor: 'pointer' }}
                  onClick={() => onNavigate?.('nha-cung-cap/thiet-lap-gian-hang')}
                >
                  Dành cho xưởng: Mở gian hàng
                </span>
              </li>
              <li>
                <span
                  style={{ color: '#666', cursor: 'pointer' }}
                  onClick={() => onNavigate?.('nha-cung-cap/dau-thau-rfq')}
                >
                  Xem danh sách gói thầu báo giá
                </span>
              </li>
              <li>
                <span
                  style={{ color: '#666', cursor: 'pointer' }}
                  onClick={() => onNavigate?.('admin/dashboard')}
                >
                  Cổng quản trị hệ thống sàn
                </span>
              </li>
            </ul>
          </Col>
        </Row>

        <Divider style={{ margin: '20px 0 16px', borderColor: '#f0e6e0' }} />

        {/* 3. Bottom Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 11,
            color: '#888',
            gap: 10,
          }}
        >
          <div>
            © 2025 Sàn Giao Dịch Bánh Trung Thu Nguyệt Phố. Tất cả các quyền được bảo lưu.
          </div>
          <Space split={<span style={{ color: '#ddd' }}>•</span>} size="small">
            <span>Điều khoản dịch vụ</span>
            <span>Chính sách bảo mật</span>
            <span>Quy chế hoạt động sàn</span>
          </Space>
        </div>
      </div>
    </footer>
  );
}
