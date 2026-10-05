import React from 'react';

export default function LoginPopup({ isOpen = true, onClose, onNavigate }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="b2b-login-modal">
  <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden transform transition-all duration-300 animate-in fade-in zoom-in-95">
    
    
    <div className="flex items-center justify-between px-6 pt-6 pb-2">
      <div className="flex items-center gap-2">
        <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[22px]">lock</span>
        </span>
        <span className="inline-flex items-center gap-1 font-label-sm text-label-sm font-semibold uppercase px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed">
          <span className="material-symbols-outlined text-[14px]">corporate_fare</span> B2B Portal
        </span>
      </div>
      <button className="w-9 h-9 rounded-full flex items-center justify-center text-outline hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"  type="button">
        <span className="material-symbols-outlined text-[20px]">close</span>
      </button>
    </div>

    
    <div className="px-6 pb-6 pt-2 space-y-5">
      <div>
        <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">Đăng nhập Khách hàng Doanh nghiệp</h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">Truy cập báo giá sỉ, quản lý hợp đồng điện tử &amp; theo dõi đơn hàng B2B.</p>
      </div>

      <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between text-body-sm">
        <span className="text-on-surface-variant flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-tertiary">shield_person</span>Dành cho Khách hàng B2B
        </span>
        <a className="text-secondary font-semibold hover:underline text-label-sm inline-flex items-center gap-0.5" data-path="dang-ky-gian-hang" href="#">Kênh Đối tác/Xưởng →</a>
      </div>

      
      <button className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-outline-variant/60 hover:bg-surface-container hover:border-outline font-label-md text-label-md text-on-surface transition-all shadow-sm" type="button">
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4"></path>
          <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"></path>
          <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z" fill="#FBBC05"></path>
          <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
        </svg>
        <span className="font-medium">Tiếp tục với Google</span>
      </button>

      
      <div className="relative flex items-center justify-center">
        <div className="border-t border-outline-variant/40 w-full"></div>
        <span className="bg-surface-container-lowest px-3 text-body-sm text-on-surface-variant shrink-0 font-normal">Hoặc qua email doanh nghiệp / cá nhân</span>
      </div>

      
      <form className="space-y-4" >
        <div className="space-y-1.5">
          <label className="block font-label-md text-label-md font-semibold text-on-surface">Email liên hệ</label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined text-[20px] text-outline absolute left-3 pointer-events-none">mail</span>
            <input className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/60 focus:outline-none focus:border-primary text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md transition-colors" placeholder="ten.ban@congty.com hoặc email cá nhân" type="email"/>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block font-label-md text-label-md font-semibold text-on-surface">Mật khẩu</label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined text-[20px] text-outline absolute left-3 pointer-events-none">lock</span>
            <input className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/60 focus:outline-none focus:border-primary text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md transition-colors" id="customer-pwd-input" placeholder="••••••••" type="password"/>
            <button className="absolute right-3 text-outline hover:text-on-surface transition-colors cursor-pointer"  type="button">
              <span className="material-symbols-outlined text-[18px]">visibility</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-body-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input defaultChecked className="w-4 h-4 rounded accent-primary cursor-pointer" type="checkbox"/>
            <span className="text-on-surface font-normal select-none">Ghi nhớ đăng nhập trên thiết bị này</span>
          </label>
          <a className="text-primary-container font-semibold hover:underline text-label-sm" href="#">Quên mật khẩu?</a>
        </div>

        <div className="flex items-start gap-1.5 p-2 rounded-lg bg-surface-container text-[12px] text-on-surface-variant leading-relaxed">
          <span className="material-symbols-outlined text-[16px] text-tertiary shrink-0 mt-0.5">lock_clock</span>
          <span>Hệ thống bảo vệ đa tầng &amp; xác thực OTP khi phát hiện đăng nhập lạ. Khóa tài khoản sau 5 lần nhập sai.</span>
        </div>

        <button className="w-full py-3 px-4 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer" type="submit">
          <span>Đăng nhập ngay</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </form>

      
      <div className="pt-2 text-center text-body-sm text-on-surface-variant border-t border-outline-variant/30">
        Chưa có tài khoản doanh nghiệp? 
        <a className="font-semibold text-primary hover:underline ml-1" data-path="dang-nhap" href="#">Đăng ký ngay</a>
        <div className="text-[11px] text-secondary font-medium mt-0.5">(Nhận ưu đãi mẫu thử &amp; chiết khấu B2B tới 35%)</div>
      </div>
    </div>

  </div>
</div>
    </div>
  );
}
