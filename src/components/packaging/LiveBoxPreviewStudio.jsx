import React, { useEffect, useState } from 'react';
import { Button, Modal, Radio, Space, Tag, Tooltip } from 'antd';
import {
  CrownOutlined,
  EyeOutlined,
  FullscreenOutlined,
  GiftOutlined,
  InfoCircleOutlined,
  PictureOutlined,
  SafetyCertificateFilled,
  ThunderboltFilled,
} from '@ant-design/icons';

const money = (val) => `${Number(val || 0).toLocaleString('vi-VN')} ₫`;

export default function LiveBoxPreviewStudio({
  selectedTemplate,
  companyName = 'TÊN DOANH NGHIỆP',
  companyLogoUrl = '',
  primaryColor = '#8c1524',
  secondaryColor = '#d48806',
  specialMessage = 'Kính Chúc Quý Khách Vạn Sự Cát Tường',
}) {
  const [viewMode, setViewMode] = useState('3d_lid'); // '3d_lid' | 'real_photo' | 'inside'
  const [techniqueMode, setTechniqueMode] = useState('gold_foil'); // 'gold_foil' | 'laser_engraved'
  const [zoomOpen, setZoomOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const templateName = selectedTemplate?.name || 'Hộp Sơn Mài Thượng Hạng (4 bánh)';
  const material = selectedTemplate?.material || 'Gỗ tự nhiên phủ sơn mài';
  const dimensions = selectedTemplate?.dimensions || '32 x 32 x 8 cm';
  const capacity = Number(selectedTemplate?.capacity || 4);
  const sampleImageUrl = selectedTemplate?.sampleImageUrl || '';
  const basePrice = Number(selectedTemplate?.basePrice || 0);
  const technique = selectedTemplate?.technique || 'Ép kim vàng 24K';

  // Automatically align technique mode when template changes
  useEffect(() => {
    if (technique.toLowerCase().includes('laser') || technique.toLowerCase().includes('khắc')) {
      setTechniqueMode('laser_engraved');
    } else {
      setTechniqueMode('gold_foil');
    }
  }, [technique, selectedTemplate?.id]);

  const isLeather = templateName.includes('Da') || material.toLowerCase().includes('da');
  const isBrocade = templateName.includes('Gấm') || material.toLowerCase().includes('gấm') || material.toLowerCase().includes('lụa');
  const isPaper = templateName.includes('Giấy') || material.toLowerCase().includes('giấy');
  const isLacquer = templateName.includes('Sơn Mài') || material.toLowerCase().includes('sơn mài') || (!isLeather && !isBrocade && !isPaper);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Base Box Background Color tuned per material
  const getBoxBackgroundColor = () => {
    if (isLeather) return '#3d1a14'; // Rich deep saddle leather
    if (isBrocade) return '#134e4a'; // Royal emerald jade brocade
    if (isPaper) return '#fbfaf8'; // Fine warm stone art paper
    return primaryColor || '#8c1524'; // Lacquer Red
  };

  const isLightBackground = isPaper;

  // Box Lid 3D Renderer with distinct structural features per template
  const renderBoxLid = (isZoom = false) => {
    // 6-cake rectangular box vs 4-cake square box
    const boxSizeClass = isZoom
      ? capacity === 6
        ? 'w-[560px] h-[400px]'
        : 'w-[500px] h-[500px]'
      : capacity === 6
      ? 'w-full max-w-[450px] aspect-[16/11]'
      : 'w-full max-w-[400px] aspect-square';

    return (
      <div className="relative flex flex-col items-center">
        {/* Unique Feature: Leather Carry Strap Handle (Quai Xách Da Mạ Vàng) for Leather Box */}
        {isLeather && (
          <div className="relative z-20 -mb-3 flex items-center justify-center">
            {/* Left Brass Ring */}
            <div className="w-4 h-6 rounded-t-full border-2 border-amber-400 bg-gradient-to-b from-yellow-200 to-amber-600 shadow-sm mr-1" />
            {/* Curved Leather Strap */}
            <div className="w-36 sm:w-44 h-5 rounded-t-xl bg-gradient-to-r from-[#2c120c] via-[#522319] to-[#2c120c] border border-amber-500/70 shadow-md flex items-center justify-center">
              <span className="w-24 h-[1px] border-t border-dashed border-amber-300/60" />
            </div>
            {/* Right Brass Ring */}
            <div className="w-4 h-6 rounded-t-full border-2 border-amber-400 bg-gradient-to-b from-yellow-200 to-amber-600 shadow-sm ml-1" />
          </div>
        )}

        {/* Unique Feature: Silk Ribbon Pull Loop for Art Paper Box */}
        {isPaper && (
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-3.5 h-12 bg-amber-600 rounded-r-md border border-amber-700 shadow-sm flex items-center justify-center">
            <span className="w-[1px] h-8 bg-amber-200/50" />
          </div>
        )}

        {/* Main Box Body */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(900px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
            transition: 'transform 0.15s ease-out',
            backgroundColor: getBoxBackgroundColor(),
            boxShadow: isPaper
              ? '0 20px 40px -10px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08)'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
          }}
          className={`relative ${boxSizeClass} rounded-2xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden select-none cursor-grab active:cursor-grabbing transition-all`}
        >
          {/* MATERIAL TEXTURE OVERLAYS */}

          {/* 1. Leather Pebble Grain Texture */}
          {isLeather && (
            <div
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
              style={{
                backgroundImage:
                  'radial-gradient(#ffffff 0.8px, transparent 0.8px), radial-gradient(#000000 0.8px, transparent 0.8px)',
                backgroundSize: '8px 8px',
                backgroundPosition: '0 0, 4px 4px',
              }}
            />
          )}

          {/* 2. Royal Brocade Damask Weave Texture */}
          {isBrocade && (
            <div
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, #d4af37 1.5px, transparent 1.5px), radial-gradient(circle at 0% 0%, #ffffff 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />
          )}

          {/* 3. High-Gloss Lacquer Light Glare Reflection */}
          {isLacquer && (
            <div
              className="absolute inset-0 pointer-events-none opacity-35"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 35%, rgba(255,255,255,0.15) 50%, transparent 100%)',
              }}
            />
          )}

          {/* 4. Fine Paper Texture */}
          {isPaper && (
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(#78716c 0.5px, transparent 0.5px)',
                backgroundSize: '6px 6px',
              }}
            />
          )}

          {/* UNIQUE ORNAMENTAL DETAILS PER MATERIAL */}

          {/* Leather Stitching Perimeter Line */}
          {isLeather && (
            <div
              className="absolute inset-3 sm:inset-4 rounded-xl pointer-events-none border-2 border-dashed opacity-85"
              style={{ borderColor: '#d4af37' }}
            />
          )}

          {/* Lacquer Box: 4 Royal Brass Filigree Corner Brackets */}
          {isLacquer && (
            <>
              <div className="absolute top-2 left-2 w-7 h-7 border-t-3 border-l-3 border-amber-400 rounded-tl pointer-events-none opacity-90 shadow-sm" />
              <div className="absolute top-2 right-2 w-7 h-7 border-t-3 border-r-3 border-amber-400 rounded-tr pointer-events-none opacity-90 shadow-sm" />
              <div className="absolute bottom-2 left-2 w-7 h-7 border-b-3 border-l-3 border-amber-400 rounded-bl pointer-events-none opacity-90 shadow-sm" />
              <div className="absolute bottom-2 right-2 w-7 h-7 border-b-3 border-r-3 border-amber-400 rounded-br pointer-events-none opacity-90 shadow-sm" />
              <div
                className="absolute inset-3 rounded-lg pointer-events-none border border-solid opacity-60"
                style={{ borderColor: secondaryColor }}
              />
            </>
          )}

          {/* Brocade Silk Braided Cord Perimeter */}
          {isBrocade && (
            <div
              className="absolute inset-3 sm:inset-4 rounded-xl pointer-events-none border-2 border-solid opacity-80"
              style={{ borderColor: '#fef08a' }}
            />
          )}

          {/* Art Paper Box: Hot-stamped Geometric Frame */}
          {isPaper && (
            <div
              className="absolute inset-3 sm:inset-4 rounded-xl pointer-events-none border-2 border-solid opacity-70"
              style={{ borderColor: secondaryColor }}
            />
          )}

          {/* Top Header: Box Type Tag & Dimensions */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-semibold tracking-wider">
            <span
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${
                isLightBackground
                  ? 'bg-stone-100 text-stone-800 border-stone-300'
                  : 'bg-black/35 text-amber-200/90 border-white/10 backdrop-blur-xs'
              }`}
            >
              <CrownOutlined style={{ color: secondaryColor }} /> {material}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full border ${
                isLightBackground
                  ? 'bg-stone-100 text-stone-800 border-stone-300'
                  : 'bg-black/35 text-amber-200/90 border-white/10 backdrop-blur-xs'
              }`}
            >
              {dimensions}
            </span>
          </div>

          {/* Center: Gold Foil / Laser Engraved Corporate Identity */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-2">
            {/* Logo Container */}
            <div className="relative mb-2 flex items-center justify-center">
              {companyLogoUrl ? (
                <div
                  className="p-2 rounded-xl transition-all"
                  style={{
                    filter:
                      techniqueMode === 'gold_foil'
                        ? 'drop-shadow(0 2px 8px rgba(212,136,6,0.6)) brightness(1.2) contrast(1.1)'
                        : 'drop-shadow(0 1px 2px rgba(0,0,0,0.8)) contrast(1.3) grayscale(0.5)',
                  }}
                >
                  <img
                    src={companyLogoUrl}
                    alt="Company Logo"
                    className="max-h-14 sm:max-h-16 max-w-[150px] sm:max-w-[180px] object-contain"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              ) : (
                <div
                  className={`w-36 sm:w-40 h-14 sm:h-16 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-2 text-center ${
                    isLightBackground ? 'bg-amber-50/60' : 'bg-black/25'
                  }`}
                  style={{ borderColor: `${secondaryColor}88` }}
                >
                  <PictureOutlined style={{ color: secondaryColor, fontSize: 16 }} />
                  <span
                    className={`text-[10px] font-bold mt-0.5 leading-tight ${
                      isLightBackground ? 'text-amber-900' : 'text-amber-100/90'
                    }`}
                  >
                    {techniqueMode === 'gold_foil' ? 'Ép Kim Vàng 24K' : 'Khắc Laser Nắp Hộp'}
                  </span>
                  <span className="text-[9px] opacity-70">Logo doanh nghiệp tại đây</span>
                </div>
              )}
            </div>

            {/* Company Name Inscribed */}
            <h4
              className="font-['Playfair_Display',serif] text-base sm:text-lg font-bold tracking-widest uppercase m-0 max-w-[90%] truncate"
              style={{
                color: isLightBackground
                  ? '#8c1524'
                  : techniqueMode === 'gold_foil'
                  ? '#ffd700'
                  : '#f3efe8',
                textShadow: isLightBackground
                  ? 'none'
                  : techniqueMode === 'gold_foil'
                  ? '0 0 10px rgba(255, 215, 0, 0.7), 0 2px 4px rgba(0,0,0,0.8)'
                  : '0 1px 2px rgba(0,0,0,0.9)',
              }}
            >
              {companyName || 'TÊN DOANH NGHIỆP'}
            </h4>

            {/* Luxury Badge Subtitle */}
            <div className="flex items-center gap-2 mt-1.5">
              <span className="w-5 sm:w-7 h-[1px] bg-amber-400/60" />
              <span
                className="text-[9px] tracking-widest uppercase font-semibold"
                style={{ color: secondaryColor }}
              >
                Mùa Vụ Trung Thu 2025
              </span>
              <span className="w-5 sm:w-7 h-[1px] bg-amber-400/60" />
            </div>
          </div>

          {/* Unique Center Feature for Brocade: Antique Bronze Round Medallion Clasp */}
          {isBrocade && (
            <div className="absolute top-1/2 left-3 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 via-amber-600 to-amber-900 border-2 border-yellow-200 shadow-md flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border border-amber-900/60 bg-amber-800/40" />
            </div>
          )}

          {/* Unique Bottom Feature for Leather: Luxury Gold Lock Clasp */}
          {isLeather && (
            <div className="relative z-20 flex justify-center -mb-2">
              <div className="w-10 h-5 rounded-b-lg bg-gradient-to-b from-yellow-200 via-amber-400 to-amber-700 border border-amber-300 shadow-md flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-stone-900/60" />
              </div>
            </div>
          )}

          {/* Bottom Calligraphy Plaque */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className="w-full max-w-[88%] py-1.5 px-3 rounded-lg text-center backdrop-blur-xs border shadow-xs"
              style={{
                backgroundColor: isLightBackground ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.35)',
                borderColor: `${secondaryColor}55`,
              }}
            >
              <p
                className={`font-['Playfair_Display',serif] italic text-xs sm:text-sm m-0 line-clamp-1 ${
                  isLightBackground ? 'text-stone-800' : 'text-amber-100'
                }`}
              >
                "{specialMessage || 'Kính chúc Quý Khách Vạn Sự Cát Tường'}"
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Box Interior Visual Renderer
  const renderBoxInside = (isZoom = false) => {
    const boxSizeClass = isZoom
      ? capacity === 6
        ? 'w-[560px] h-[400px]'
        : 'w-[500px] h-[500px]'
      : capacity === 6
      ? 'w-full max-w-[450px] aspect-[16/11]'
      : 'w-full max-w-[400px] aspect-square';

    const slots = capacity === 6 ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4];

    return (
      <div
        style={{
          backgroundColor: '#1c1917',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(0,0,0,0.8)',
        }}
        className={`relative ${boxSizeClass} rounded-2xl mx-auto p-4 sm:p-6 flex flex-col justify-between overflow-hidden border-4 border-amber-900/60 select-none`}
      >
        {/* Royal Silk Fabric Interior Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-90"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at center, #8c1524 0%, #450a0a 70%, #1c0505 100%)',
          }}
        />

        {/* Interior Header */}
        <div className="relative z-10 flex items-center justify-between text-xs font-semibold text-amber-200">
          <span className="flex items-center gap-1.5">
            <GiftOutlined className="text-amber-400" />
            Khay Lót Lụa Đỏ Hoàng Gia ({capacity} Vị Quà Tặng)
          </span>
          <span className="text-[11px] bg-black/40 px-2 py-0.5 rounded-full text-amber-300 border border-amber-500/30">
            {material}
          </span>
        </div>

        {/* Mooncake Trays Layout */}
        <div className="relative z-10 my-auto py-2">
          <div
            className={`grid gap-2.5 sm:gap-3.5 ${
              capacity === 6 ? 'grid-cols-3' : 'grid-cols-2'
            }`}
          >
            {slots.map((item, idx) => (
              <div
                key={item}
                className="relative aspect-square rounded-xl bg-gradient-to-br from-amber-100/90 to-amber-200/70 p-1.5 sm:p-2 flex flex-col items-center justify-center border-2 border-amber-400/80 shadow-md group hover:scale-105 transition-transform"
              >
                {/* Traditional Mooncake Emblem / Tea Canister */}
                <div
                  className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full shadow-inner flex items-center justify-center border border-amber-300/70 text-amber-100 font-bold text-xs text-center p-1 ${
                    idx === 4 && capacity === 6
                      ? 'bg-gradient-to-br from-emerald-800 to-teal-950 border-emerald-400'
                      : 'bg-gradient-to-br from-[#c97a24] to-[#8a4b10]'
                  }`}
                >
                  {idx === 0
                    ? 'Thập Cẩm'
                    : idx === 1
                    ? 'Hạt Sen'
                    : idx === 2
                    ? 'Tiramisu'
                    : idx === 3
                    ? 'Trà Xanh'
                    : idx === 4 && capacity === 6
                    ? 'Trà Sen'
                    : 'Lava Trứng'}
                </div>
                <span className="text-[10px] font-bold text-stone-900 mt-1 block">
                  {idx === 4 && capacity === 6 ? 'Trà Sen Tây Hồ' : `Bánh Hoàng Kim 0${item}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Greeting Ribbon */}
        <div className="relative z-10 text-center bg-black/40 backdrop-blur-xs py-1 px-3 rounded-lg border border-amber-500/30">
          <span className="text-xs text-amber-200 font-serif italic line-clamp-1">
            Thiệp Tri Ân Doanh Nghiệp: "{companyName}"
          </span>
        </div>
      </div>
    );
  };

  // Real Studio Photography of the Box Template
  const renderRealPhoto = () => {
    return (
      <div className="relative w-full max-w-[440px] rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-md mx-auto">
        <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
          {sampleImageUrl ? (
            <img
              src={sampleImageUrl}
              alt={templateName}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-stone-400">
              <GiftOutlined className="text-4xl mb-2" />
              <span className="text-xs">Chưa có ảnh chụp thực tế</span>
            </div>
          )}

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className="text-[11px] font-bold bg-stone-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-full shadow-sm">
              Mẫu Thực Tế Của Shop
            </span>
            <span className="text-[10px] font-semibold bg-amber-600/90 backdrop-blur-xs text-white px-2 py-0.5 rounded-full shadow-sm">
              {capacity} Bánh · {dimensions}
            </span>
          </div>

          <div className="absolute bottom-3 right-3">
            <span className="text-xs font-bold bg-white/95 text-[#8c1524] px-2.5 py-1 rounded-lg shadow-sm border border-stone-200">
              {basePrice > 0 ? `+${money(basePrice)}/hộp` : 'Miễn phí'}
            </span>
          </div>
        </div>

        {/* Specifications Footer */}
        <div className="p-3.5 bg-stone-50 border-t border-stone-100 flex flex-col gap-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-stone-900">{templateName}</span>
            <span className="text-amber-800 font-semibold">{technique}</span>
          </div>
          <p className="text-stone-500 m-0 text-[11px] line-clamp-2">
            {selectedTemplate?.description || 'Hộp gia công thủ công nghệ nhân cao cấp, bảo quản hương vị bánh hoàn hảo.'}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col gap-4">
      {/* Studio Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Studio Xem Thử Hộp Quà
            </span>
          </div>
          <h4 className="font-['Playfair_Display',serif] text-base font-bold text-stone-900 m-0 flex items-center gap-2">
            <span>{templateName}</span>
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <Radio.Group
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            size="small"
            buttonStyle="solid"
          >
            <Radio.Button value="3d_lid">Nắp 3D Cá Nhân Hóa</Radio.Button>
            <Radio.Button value="real_photo">Ảnh Thật Của Shop</Radio.Button>
            <Radio.Button value="inside">Mở Nắp ({capacity} bánh)</Radio.Button>
          </Radio.Group>

          <Tooltip title="Xem toàn màn hình độ phân giải cao">
            <Button
              size="small"
              icon={<FullscreenOutlined />}
              onClick={() => setZoomOpen(true)}
            />
          </Tooltip>
        </div>
      </div>

      {/* Technique Toggle (Only in 3d_lid mode) */}
      {viewMode === '3d_lid' && (
        <div className="flex items-center justify-between text-xs px-2.5 py-1.5 bg-stone-50 rounded-lg border border-stone-200/70">
          <span className="text-stone-600 font-medium flex items-center gap-1">
            <CrownOutlined style={{ color: secondaryColor }} />
            Kỹ thuật logo trên nắp:
          </span>
          <Radio.Group
            value={techniqueMode}
            onChange={(e) => setTechniqueMode(e.target.value)}
            size="small"
          >
            <Radio.Button value="gold_foil">Ép Kim Vàng 24K</Radio.Button>
            <Radio.Button value="laser_engraved">Khắc Laser Chìm</Radio.Button>
          </Radio.Group>
        </div>
      )}

      {/* Visual Canvas Area */}
      <div className="py-3 bg-gradient-to-b from-stone-100/70 to-stone-200/50 rounded-xl p-4 flex items-center justify-center min-h-[380px]">
        {viewMode === '3d_lid' && renderBoxLid(false)}
        {viewMode === 'real_photo' && renderRealPhoto()}
        {viewMode === 'inside' && renderBoxInside(false)}
      </div>

      {/* Interactive Helper Hint */}
      <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
        {viewMode === '3d_lid' ? (
          <span className="flex items-center gap-1">
            <ThunderboltFilled className="text-amber-500" /> Rê chuột lên hộp để xoay góc nhìn 3D & cảm nhận chất liệu
          </span>
        ) : viewMode === 'real_photo' ? (
          <span className="flex items-center gap-1">
            <InfoCircleOutlined className="text-blue-500" /> Ảnh chụp sản phẩm thực tế do nhà cung cấp thiết kế
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <GiftOutlined className="text-amber-600" /> Bố cục khay lót lụa vàng và ngăn đựng {capacity} vị bánh
          </span>
        )}

        <span
          className="text-[#8c1524] font-semibold cursor-pointer hover:underline"
          onClick={() => setZoomOpen(true)}
        >
          Phóng to chi tiết →
        </span>
      </div>

      {/* Fullscreen Zoom Modal */}
      <Modal
        title={
          <span className="font-['Playfair_Display',serif] font-bold text-lg">
            Bản Vẽ Phối Cảnh Chi Tiết · {templateName}
          </span>
        }
        open={zoomOpen}
        onCancel={() => setZoomOpen(false)}
        footer={null}
        width={720}
        centered
      >
        <div className="py-6 bg-stone-900 rounded-2xl flex flex-col items-center justify-center p-4">
          {viewMode === '3d_lid' && renderBoxLid(true)}
          {viewMode === 'real_photo' && renderRealPhoto()}
          {viewMode === 'inside' && renderBoxInside(true)}
          <p className="text-xs text-stone-400 mt-4 m-0 text-center">
            * Mọi quy cách gia công, vị trí ép kim logo và màu sắc hoàn thiện sẽ được gửi bản in mẫu (Proof Print) cho Quý khách duyệt trước khi sản xuất hàng loạt.
          </p>
        </div>
      </Modal>
    </div>
  );
}
