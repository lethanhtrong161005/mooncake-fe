import { useState } from 'react';

export default function PackagingAndLogoPrinting({ onNavigate }) {
  const [boxType, setBoxType] = useState('lacquer-4');
  const [foilColor, setFoilColor] = useState('gold');
  const [technique, setTechnique] = useState('ep-kim');
  const [quantity, setQuantity] = useState(200);
  const [logoFile, setLogoFile] = useState(null);

  const boxOptions = [
    {
      id: 'lacquer-4',
      name: 'Hộp Sơn Mài Thượng Hạng (4 bánh)',
      spec: 'Kích thước: 32x32x8cm, Gỗ phủ sơn mài cao cấp, lót lụa đỏ',
      price: '180.000₫/vỏ',
      minQty: 100,
    },
    {
      id: 'luxury-6',
      name: 'Hộp VIP Dạ Nguyệt (6 bánh + Trà sen)',
      spec: 'Kích thước: 38x28x9cm, Khung gỗ khắc CNC, quai xách da thật',
      price: '240.000₫/vỏ',
      minQty: 50,
    },
    {
      id: 'bamboo-4',
      name: 'Hộp Giấy Mỹ Thuật Mộc (4 bánh)',
      spec: 'Kích thước: 30x30x7cm, Giấy mỹ thuật ép nổi hoa văn truyền thống',
      price: '85.000₫/vỏ',
      minQty: 200,
    },
  ];

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">
      {/* Sub-header Navigation */}
      <div className="bg-surface-container-low border-b border-outline-variant/30 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <button onClick={() => onNavigate?.('trang-chu')} className="text-on-surface-variant hover:text-primary">Trang chủ</button>
            <span className="text-outline">/</span>
            <span className="text-primary font-semibold">Tùy biến Bao bì & Khắc Logo Doanh Nghiệp</span>
          </div>
          <button
            onClick={() => onNavigate?.('so-sanh-bao-gia')}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            ← Xem báo giá RFQ
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-semibold uppercase mb-2">
            <span className="material-symbols-outlined text-[16px]">print</span>
            Xưởng In Ấn & Bao Bì Nghệ Nhân
          </div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
            Thiết Kế Hộp & Khắc Logo Doanh Nghiệp
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1 max-w-3xl">
            Tùy biến vỏ hộp quà Trung Thu theo nhận diện thương hiệu công ty. Ứng dụng công nghệ ép kim vàng 24K, khắc laser tinh xảo và in lụa thủ công.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Customization Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Box Type */}
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 shadow-sm">
              <h3 className="font-title-md text-title-md font-bold text-on-surface mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center font-bold">1</span>
                Chọn quy cách vỏ hộp quà
              </h3>
              <div className="space-y-3">
                {boxOptions.map((opt) => (
                  <label
                    key={opt.id}
                    onClick={() => setBoxType(opt.id)}
                    className={`block p-4 rounded-xl border transition-all cursor-pointer ${boxType === opt.id
                      ? 'border-primary bg-primary-fixed/20 shadow-sm'
                      : 'border-outline-variant/40 hover:bg-surface-container-low'
                      }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="box_type"
                          checked={boxType === opt.id}
                          onChange={() => setBoxType(opt.id)}
                          className="mt-1 w-4 h-4 accent-primary"
                        />
                        <div>
                          <div className="font-semibold text-sm text-on-surface">{opt.name}</div>
                          <div className="text-xs text-on-surface-variant mt-0.5">{opt.spec}</div>
                          <div className="text-xs text-secondary font-semibold mt-1">Đơn hàng tối thiểu: {opt.minQty} hộp</div>
                        </div>
                      </div>
                      <div className="text-right font-bold text-primary text-sm whitespace-nowrap">
                        {opt.price}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 2: Logo Technique & Color */}
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 shadow-sm">
              <h3 className="font-title-md text-title-md font-bold text-on-surface mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center font-bold">2</span>
                Kỹ thuật in ấn & Nhũ kim Logo
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                {[
                  { id: 'ep-kim', title: 'Ép Kim Nổi (Foil Stamping)', desc: 'Ánh kim bóng sang trọng' },
                  { id: 'khac-laser', title: 'Khắc Laser Chìm', desc: 'Đường nét sắc sảo trên gỗ' },
                  { id: 'in-lua', title: 'In Lụa Đa Màu', desc: 'Chuẩn màu Pantonet thương hiệu' },
                ].map((tech) => (
                  <button
                    key={tech.id}
                    type="button"
                    onClick={() => setTechnique(tech.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${technique === tech.id
                      ? 'border-primary bg-primary/5 text-primary font-semibold'
                      : 'border-outline-variant/40 hover:bg-surface-container-low text-on-surface'
                      }`}
                  >
                    <div className="text-xs font-bold">{tech.title}</div>
                    <div className="text-[11px] text-on-surface-variant mt-1">{tech.desc}</div>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-2">Màu nhũ kim lựa chọn</label>
                <div className="flex items-center gap-3">
                  {[
                    { id: 'gold', label: 'Vàng Kim 24K', bg: 'bg-[#d4af37]' },
                    { id: 'rose-gold', label: 'Vàng Hồng (Rose Gold)', bg: 'bg-[#b76e79]' },
                    { id: 'silver', label: 'Bạc Ánh Trăng', bg: 'bg-[#c0c0c0]' },
                    { id: 'bronze', label: 'Đồng Cổ Điển', bg: 'bg-[#cd7f32]' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setFoilColor(c.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${foilColor === c.id
                        ? 'border-primary ring-2 ring-primary/30 font-semibold'
                        : 'border-outline-variant/40 hover:bg-surface-container-low'
                        }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${c.bg}`}></span>
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Logo Upload & Quantity */}
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 shadow-sm">
              <h3 className="font-title-md text-title-md font-bold text-on-surface mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center font-bold">3</span>
                Tải lên file Vector Logo doanh nghiệp
              </h3>

              <div className="border-2 border-dashed border-outline-variant/60 rounded-xl p-8 text-center bg-surface-container-low/50 hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-[40px] text-primary/70 mb-2">cloud_upload</span>
                <p className="text-sm font-semibold text-on-surface">Kéo thả file Logo hoặc bấm vào đây để duyệt file</p>
                <p className="text-xs text-on-surface-variant mt-1">Hỗ trợ định dạng: AI, PDF Vector, EPS, SVG, PNG phân giải cao (&gt;300 DPI)</p>
                <input
                  type="file"
                  onChange={(e) => setLogoFile(e.target.files?.[0]?.name || null)}
                  className="hidden"
                  id="logo-upload-input"
                />
                <label
                  htmlFor="logo-upload-input"
                  className="mt-4 inline-block px-4 py-2 rounded-lg bg-surface border border-outline-variant text-xs font-semibold text-primary hover:bg-surface-container cursor-pointer shadow-sm"
                >
                  Chọn file từ máy tính
                </label>
                {logoFile && (
                  <div className="mt-3 text-xs text-emerald-600 font-semibold flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Đã tải lên: {logoFile}
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between pt-4 border-t border-outline-variant/30">
                <div>
                  <div className="text-xs font-semibold text-on-surface">Số lượng đặt in (Hộp):</div>
                  <div className="text-[11px] text-on-surface-variant">Chiết khấu 15% cho đơn từ 200 hộp, 25% cho đơn từ 500 hộp</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={50}
                    step={10}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-28 px-3 py-2 text-center rounded-xl border border-outline-variant bg-surface text-sm font-bold text-on-surface"
                  />
                  <span className="text-xs text-on-surface-variant">hộp</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Mockup & Summary */}
          <div className="space-y-6">
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-title-md text-title-md font-bold text-on-surface mb-4">
                Xem Trước Phối Cảnh (3D Mockup)
              </h3>

              {/* Mockup Box Illustration */}
              <div className="w-full h-64 rounded-xl bg-gradient-to-br from-[#7a0010] to-[#3a0007] p-6 flex flex-col items-center justify-center text-center shadow-inner relative overflow-hidden">
                <div className="absolute inset-2 border-2 border-[#d4af37]/40 rounded-lg pointer-events-none"></div>
                <div className="text-4xl mb-3">🥮</div>
                <div className="font-headline-sm text-[#d4af37] font-bold tracking-widest uppercase text-sm">
                  {logoFile ? `[LOGO: ${logoFile.toUpperCase().slice(0, 15)}]` : '[LOGO DOANH NGHIỆP]'}
                </div>
                <div className="text-[11px] text-white/70 mt-1 uppercase tracking-wider">
                  Kỹ thuật: {technique === 'ep-kim' ? 'Ép kim vàng 24K' : technique === 'khac-laser' ? 'Khắc Laser Chìm' : 'In lụa thủ công'}
                </div>
                <div className="mt-4 px-3 py-1 rounded bg-black/40 text-[10px] text-[#ffdcc3] border border-[#d4af37]/30">
                  {boxOptions.find((b) => b.id === boxType)?.name}
                </div>
              </div>

              {/* Price Estimation */}
              <div className="mt-6 space-y-2.5 text-xs border-t border-outline-variant/30 pt-4">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Đơn giá vỏ hộp:</span>
                  <span className="font-semibold text-on-surface">{boxOptions.find((b) => b.id === boxType)?.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Khuôn ép kim & chế bản:</span>
                  <span className="font-semibold text-emerald-600">Miễn phí (&gt;100 hộp)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Thời gian gia công mẫu in:</span>
                  <span className="font-semibold text-on-surface">2 - 3 ngày làm việc</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-primary pt-3 border-t border-outline-variant/30">
                  <span>Ước tính tổng chi phí vỏ:</span>
                  <span>{(quantity * (boxType === 'lacquer-4' ? 180000 : boxType === 'luxury-6' ? 240000 : 85000)).toLocaleString('vi-VN')}₫</span>
                </div>
              </div>

              <div className="mt-6 space-y-2.5">
                <button
                  type="button"
                  onClick={() => onNavigate?.('so-sanh-bao-gia')}
                  className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-primary-container transition-all shadow-md"
                >
                  Áp Dụng Vào Yêu Cầu Báo Giá (RFQ)
                </button>
                <button
                  type="button"
                  onClick={() => alert('Đã gửi yêu cầu nhận mẫu vỏ hộp thử nghiệm miễn phí!')}
                  className="w-full py-2.5 rounded-xl border border-outline-variant hover:bg-surface-container text-xs font-semibold text-on-surface transition-all"
                >
                  Đăng Ký Nhận Hộp Mẫu Thử
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
