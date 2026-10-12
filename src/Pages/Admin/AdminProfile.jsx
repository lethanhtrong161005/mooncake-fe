import { useState } from 'react';

export default function AdminProfile({ onNavigate }) {
  const [profile, setProfile] = useState({
    name: 'Nguyễn Văn Minh',
    email: 'admin.minh@moonmarket.vn',
    phone: '0988 123 456',
    role: 'Quản trị viên Cấp cao (Super Admin)',
    department: 'Ban Vận Hành Sàn B2B',
    twoFactor: true,
    notificationEmail: true,
    notificationSms: false,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-headline-sm text-headline-sm font-bold text-primary">MoonMarket</span>
            <span className="text-xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-primary-container text-on-primary">
              Admin Portal
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate?.('admin/dashboard')}
              className="text-body-sm font-medium text-on-surface-variant hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-container"
            >
              ← Về Dashboard
            </button>
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Hồ Sơ Quản Trị Viên</h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Quản lý thông tin tài khoản quản trị, quyền hạn phân nhiệm và bảo mật hệ thống.
          </p>
        </div>

        {saved && (
          <div className="mb-6 p-4 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary/20 flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">check_circle</span>
            <span className="text-sm font-semibold">Cập nhật hồ sơ thành công!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Summary Card */}
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined text-[48px]">admin_panel_settings</span>
              </div>
              <h2 className="font-title-md text-title-md font-bold text-on-surface">{profile.name}</h2>
              <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full bg-secondary-fixed text-on-secondary-fixed">
                {profile.role}
              </span>
              <p className="text-xs text-on-surface-variant mt-2">{profile.department}</p>
              <div className="w-full mt-6 pt-6 border-t border-outline-variant/30 text-left space-y-3">
                <div className="flex items-center justify-between text-body-sm">
                  <span className="text-on-surface-variant">Mã nhân sự:</span>
                  <span className="font-semibold text-on-surface">ADM-2025-089</span>
                </div>
                <div className="flex items-center justify-between text-body-sm">
                  <span className="text-on-surface-variant">Trạng thái:</span>
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Đang hoạt động
                  </span>
                </div>
                <div className="flex items-center justify-between text-body-sm">
                  <span className="text-on-surface-variant">Lần đăng nhập cuối:</span>
                  <span className="text-xs text-on-surface-variant">Hôm nay, 14:22 (IP 118.69.x.x)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Profile Details & Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSave} className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 shadow-sm space-y-5">
              <h3 className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
                Thông tin cá nhân
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1.5">Họ và tên</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-body-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1.5">Email công việc</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-body-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1.5">Số điện thoại</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-body-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1.5">Phòng ban</label>
                  <input
                    type="text"
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-body-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/30">
                <h4 className="font-title-sm text-title-sm font-semibold text-on-surface mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">security</span>
                  Bảo mật & Xác thực hai yếu tố
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 cursor-pointer">
                    <div>
                      <div className="font-semibold text-xs text-on-surface">Xác thực 2 bước (2FA Google Authenticator)</div>
                      <div className="text-xs text-on-surface-variant">Bắt buộc đối với tài khoản Quản trị viên cấp cao</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.twoFactor}
                      onChange={(e) => setProfile({ ...profile, twoFactor: e.target.checked })}
                      className="w-5 h-5 accent-primary cursor-pointer"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 cursor-pointer">
                    <div>
                      <div className="font-semibold text-xs text-on-surface">Thông báo đăng nhập bất thường qua Email</div>
                      <div className="text-xs text-on-surface-variant">Gửi email cảnh báo khi có đăng nhập từ thiết bị lạ</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.notificationEmail}
                      onChange={(e) => setProfile({ ...profile, notificationEmail: e.target.checked })}
                      className="w-5 h-5 accent-primary cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container transition-all shadow-sm"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>

            {/* Permissions Overview */}
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 shadow-sm">
              <h3 className="font-title-md text-title-md font-bold text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[20px]">policy</span>
                Quyền hạn quản trị được cấp
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  'Phê duyệt xưởng & nhà cung cấp mới',
                  'Quản lý hợp đồng điện tử & ký quỹ Escrow',
                  'Xem báo cáo doanh thu & dòng tiền sàn',
                  'Kiểm soát tài khoản người dùng & khóa tài khoản',
                  'Cấu hình phí hoa hồng và chiết khấu B2B',
                  'Kiểm duyệt mẫu thử & chất lượng bánh',
                ].map((perm, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px]">check_circle</span>
                    <span className="text-on-surface font-medium">{perm}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
