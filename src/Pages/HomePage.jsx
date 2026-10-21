import { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Tag,
  Space,
  Typography,
  Statistic,
  Badge,
  Avatar,
  Divider,
} from 'antd';
import {
  ShopOutlined,
  SolutionOutlined,
  ShoppingOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  CheckCircleFilled,
  EnvironmentOutlined,
  InboxOutlined,
  StarFilled,
} from '@ant-design/icons';
import CustomerHeader from '../components/layout/CustomerHeader';
import CustomerFooter from '../components/layout/CustomerFooter';

const { Title, Text, Paragraph } = Typography;

export default function HomePage({ onNavigate }) {
  const categories = [
    {
      key: 'nuong',
      image: '/categories/banh-nuong.jpg',
      title: 'Bánh Nướng Truyền Thống',
      desc: 'Thập cẩm gà quay, vi cá, jambon hảo hạng',
    },
    {
      key: 'deo',
      image: '/categories/banh-deo.jpg',
      title: 'Bánh Dẻo Truyền Thống',
      desc: 'Hạt sen hoa bưởi, đậu xanh cốm non',
    },
    {
      key: 'hop-vip',
      image: '/categories/hop-son-mai.jpg',
      title: 'Hộp Quà Sơn Mài Cao Cấp',
      desc: 'Sơn mài khóa đồng, khắc logo theo yêu cầu',
    },
    {
      key: 'healthy',
      image: '/categories/banh-dinh-duong.jpg',
      title: 'Bánh Dinh Dưỡng Ít Ngọt',
      desc: 'Đường ăn kiêng tự nhiên, hạt dinh dưỡng',
    },
  ];

  const featuredSuppliers = [
    {
      id: 'trang-an',
      name: 'Xưởng Bánh Tràng An',
      image: '/suppliers/xuong-trang-an.jpg',
      avatarText: 'TA',
      desc: 'Nghề truyền thống gia truyền 4 đời tại Hà Nội. Năng lực sản xuất quy mô lớn, chuyên set quà doanh nghiệp thượng hạng.',
      badge: '★ Đối Tác Tiêu Biểu',
      location: 'Hà Nội',
      capacity: '50.000 hộp/vụ',
      rating: 4.9,
      reviewsCount: 128,
      cert: 'Chuẩn An Toàn Thực Phẩm',
      tags: ['Bánh nướng gia truyền', 'Hộp sơn mài', 'In logo riêng'],
    },
    {
      id: 'huu-nghi',
      name: 'Xưởng Bánh Hữu Nghị',
      image: '/suppliers/xuong-huu-nghi.jpg',
      avatarText: 'HN',
      desc: 'Thương hiệu lâu năm, dây chuyền sản xuất hiện đại, chuyên cung cấp các gói quà tặng số lượng lớn cho tập đoàn.',
      badge: '★ Đối Tác Tiêu Biểu',
      location: 'Hà Nội & TP. HCM',
      capacity: '120.000 hộp/vụ',
      rating: 4.8,
      reviewsCount: 215,
      cert: 'Tiêu Chuẩn Xuất Khẩu',
      tags: ['Sản xuất số lượng lớn', 'Hộp cao cấp', 'Chiết khấu cao'],
    },
    {
      id: 'bao-phuong',
      name: 'Xưởng Bánh Bảo Phương',
      image: '/suppliers/xuong-bao-phuong.jpg',
      avatarText: 'BP',
      desc: 'Bánh tươi thủ công truyền thống phố cổ Thụy Khuê, hương vị sen nhài cốm non nguyên bản nổi tiếng thủ đô.',
      badge: '★ Đối Tác Tiêu Biểu',
      location: 'Hà Nội - Thụy Khuê',
      capacity: '35.000 hộp/vụ',
      rating: 4.9,
      reviewsCount: 96,
      cert: 'Chứng Nhận Vệ Sinh An Toàn',
      tags: ['Bánh dẻo cốm non', 'Bánh tươi thủ công', 'Quà biếu nghệ nhân'],
    },
  ];

  return (
    <div style={{ background: '#f5f5f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CustomerHeader activeKey="trang-chu" onNavigate={onNavigate} />

      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          background: 'linear-gradient(rgba(26, 2, 6, 0.72), rgba(30, 2, 7, 0.82)), url("/hero_mooncake_bg.jpg") center/cover no-repeat',
          color: '#ffffff',
          padding: '65px 20px 75px',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <Tag
            color="#d48806"
            style={{
              fontWeight: 700,
              fontSize: 12,
              padding: '4px 14px',
              borderRadius: 20,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              border: 'none',
            }}
          >
            ★ SÀN BÁNH TRUNG THU DOANH NGHIỆP UY TÍN
          </Tag>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: '#ffffff',
              margin: '20px 0 16px',
              lineHeight: 1.3,
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.7)',
            }}
          >
            Giải Pháp Quà Tặng Trung Thu Doanh Nghiệp
            <br />
            <span style={{ color: '#f5c840', textShadow: '0 2px 14px rgba(245, 200, 64, 0.35)' }}>
              Kết Nối Trực Tiếp Hơn 150 Xưởng Bánh Toàn Quốc
            </span>
          </h1>
          <p
            style={{
              fontSize: 15,
              color: '#f0d0cb',
              maxWidth: 720,
              margin: '0 auto 26px',
              lineHeight: 1.6,
              textShadow: '0 1px 6px rgba(0, 0, 0, 0.7)',
            }}
          >
            Bảo đảm an toàn giao dịch, chiết khấu sỉ đến 35%, in khắc logo riêng và giao hàng tận nơi đúng hẹn.
          </p>

          <Space size="middle" wrap>
            <Button
              type="primary"
              size="large"
              icon={<SolutionOutlined />}
              style={{
                background: '#d48806',
                borderColor: '#d48806',
                color: '#1a0500',
                fontWeight: 700,
                height: 44,
                padding: '0 24px',
                fontSize: 14,
              }}
              onClick={() => onNavigate?.('so-sanh-bao-gia')}
            >
              Yêu Cầu Báo Giá Nhanh
            </Button>
            <Button
              size="large"
              icon={<ShopOutlined />}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.4)',
                color: '#ffffff',
                fontWeight: 600,
                height: 44,
                padding: '0 24px',
                fontSize: 14,
              }}
              onClick={() => onNavigate?.('tim-kiem')}
            >
              Xem Danh Sách Sản Phẩm
            </Button>
          </Space>
        </div>
      </section>

      {/* Main Content Area */}
      <main style={{ maxWidth: 1440, margin: '0 auto', padding: '36px 20px', flex: 1, width: '100%' }}>

        {/* Categories Section */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: '#1f1f1f' }}>
                Danh Mục Bánh Trung Thu
              </h2>
              <Text type="secondary">Đa dạng hương vị truyền thống và phong cách hiện đại</Text>
            </div>
            <Button type="link" onClick={() => onNavigate?.('tim-kiem')}>
              Xem tất cả →
            </Button>
          </div>

          <Row gutter={[16, 16]}>
            {categories.map((cat) => (
              <Col xs={24} sm={12} lg={6} key={cat.key}>
                <Card
                  hoverable
                  bordered={false}
                  cover={
                    <div style={{ height: 160, overflow: 'hidden', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                      <img
                        alt={cat.title}
                        src={cat.image}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                    </div>
                  }
                  style={{ borderRadius: 10, height: '100%', cursor: 'pointer', overflow: 'hidden' }}
                  styles={{ body: { padding: '16px' } }}
                  onClick={() => onNavigate?.('tim-kiem')}
                >
                  <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 6px', color: '#1f1f1f' }}>
                    {cat.title}
                  </h3>
                  <p style={{ fontSize: 12, color: '#666', margin: 0, lineHeight: 1.5 }}>{cat.desc}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Featured Suppliers Section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: '#1f1f1f' }}>
                Xưởng Bánh Tiêu Biểu
              </h2>
              <Text type="secondary">Xưởng sản xuất uy tín, được đánh giá cao về chất lượng và tiến độ</Text>
            </div>
          </div>

          <Row gutter={[20, 20]}>
            {featuredSuppliers.map((sup) => (
              <Col xs={24} md={8} key={sup.id}>
                <Card
                  hoverable
                  bordered={false}
                  style={{
                    borderRadius: 14,
                    height: '100%',
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #f0e8e4',
                  }}
                  styles={{
                    body: {
                      padding: '16px 20px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                    },
                  }}
                  cover={
                    <div style={{ height: 140, overflow: 'hidden', position: 'relative' }}>
                      <img
                        alt={sup.name}
                        src={sup.image}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.06)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                      {/* Gradient overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 60%)',
                          pointerEvents: 'none',
                        }}
                      />
                      {/* Top left badge */}
                      <div style={{ position: 'absolute', top: 12, left: 12 }}>
                        <Tag
                          color="#d48806"
                          style={{
                            fontWeight: 700,
                            borderRadius: 12,
                            padding: '2px 10px',
                            border: 'none',
                            fontSize: 11,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                          }}
                        >
                          {sup.badge}
                        </Tag>
                      </div>
                      {/* Top right rating */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          background: 'rgba(255, 255, 255, 0.94)',
                          backdropFilter: 'blur(4px)',
                          padding: '3px 10px',
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 700,
                          color: '#d48806',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        }}
                      >
                        <StarFilled style={{ color: '#faad14', fontSize: 13 }} />
                        <span>{sup.rating}</span>
                        <span style={{ color: '#888', fontWeight: 500, fontSize: 11 }}>({sup.reviewsCount})</span>
                      </div>
                    </div>
                  }
                >
                  {/* Workshop Avatar Overlap & Title */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginTop: -32, marginBottom: 10 }}>
                    <Avatar
                      size={48}
                      style={{
                        background: 'linear-gradient(135deg, #8c1524 0%, #d48806 100%)',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: 16,
                        border: '3px solid #ffffff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        flexShrink: 0,
                      }}
                    >
                      {sup.avatarText}
                    </Avatar>
                    <div style={{ paddingTop: 18, flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: '#1f1f1f', letterSpacing: '-0.2px' }}>
                          {sup.name}
                        </h3>
                        <CheckCircleFilled style={{ color: '#52c41a', fontSize: 14 }} title="Xưởng đã xác minh" />
                      </div>
                    </div>
                  </div>

                  {/* Meta info pills: Location & Capacity */}
                  <Space size={8} wrap style={{ marginBottom: 10 }}>
                    <Tag
                      bordered={false}
                      style={{
                        background: '#f7f2ef',
                        color: '#666',
                        fontSize: 11,
                        padding: '2px 8px',
                        borderRadius: 6,
                        margin: 0,
                      }}
                    >
                      <EnvironmentOutlined style={{ color: '#8c1524', marginRight: 4 }} />
                      {sup.location}
                    </Tag>
                    <Tag
                      bordered={false}
                      style={{
                        background: '#f7f2ef',
                        color: '#666',
                        fontSize: 11,
                        padding: '2px 8px',
                        borderRadius: 6,
                        margin: 0,
                      }}
                    >
                      <InboxOutlined style={{ color: '#d48806', marginRight: 4 }} />
                      {sup.capacity}
                    </Tag>
                  </Space>

                  {/* Description */}
                  <p style={{ fontSize: 12, color: '#666', lineHeight: 1.55, margin: '0 0 10px', flex: 1 }}>
                    {sup.desc}
                  </p>

                  {/* Food Safety Certification Tag */}
                  <div style={{ marginBottom: 10 }}>
                    <Tag
                      color="green"
                      style={{
                        borderRadius: 6,
                        fontWeight: 600,
                        fontSize: 11,
                        padding: '2px 8px',
                        margin: 0,
                      }}
                    >
                      ✓ {sup.cert}
                    </Tag>
                  </div>

                  {/* Specialties tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                    {sup.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        style={{
                          fontSize: 11,
                          color: '#777',
                          background: '#faf6f3',
                          border: '1px solid #ebdcd5',
                          padding: '1px 8px',
                          borderRadius: 12,
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Divider style={{ margin: '0 0 14px', borderColor: '#f0f0f0' }} />

                  {/* Action buttons */}
                  <Space size={10} style={{ width: '100%' }}>
                    <Button
                      block
                      size="middle"
                      onClick={() => onNavigate?.('tim-kiem')}
                      style={{
                        borderRadius: 8,
                        fontWeight: 600,
                        fontSize: 13,
                        borderColor: '#d9d9d9',
                      }}
                    >
                      Xem Sản Phẩm
                    </Button>
                    <Button
                      type="primary"
                      block
                      size="middle"
                      onClick={() => onNavigate?.('so-sanh-bao-gia')}
                      style={{
                        background: '#8c1524',
                        borderColor: '#8c1524',
                        borderRadius: 8,
                        fontWeight: 700,
                        fontSize: 13,
                      }}
                    >
                      Nhận Báo Giá
                    </Button>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </main>

      {/* Footer */}
      <CustomerFooter onNavigate={onNavigate} />
    </div>
  );
}
