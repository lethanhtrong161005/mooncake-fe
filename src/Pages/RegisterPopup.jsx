import React from 'react';

export default function RegisterPopup({ isOpen = true, onClose, onNavigate }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm" id="registerModalOverlay">
  
  <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-auto transform transition-all duration-300">
    
    <div className="h-1.5 w-full bg-gradient-to-r from-[#991b1b] via-[#d97706] to-[#991b1b]"></div>

    
    <div className="pt-6 px-6 sm:px-8 pb-3 flex items-start justify-between">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-red-50 text-[#991b1b] border border-red-200">
          <svg className="w-3.5 h-3.5 text-[#991b1b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
          Đăng ký Khách hàng
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-amber-50 text-amber-800 border border-amber-200">
          Ưu đãi Mùa Trăng 2025
        </span>
      </div>
      
      
      <button className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1.5 rounded-lg transition-colors cursor-pointer"  title="Đóng modal" type="button">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      </button>
    </div>

    
    <div className="px-6 sm:px-8 pb-7 max-h-[85vh] overflow-y-auto custom-scrollbar">
      
      <div className="mb-4">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Tạo tài khoản Khách hàng</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Đặt mua bánh Trung Thu nhanh chóng, nhận chiết khấu hấp dẫn và quản lý đơn hàng tiện lợi.</p>
      </div>

      
      <div className="mb-4 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/80">
        <div className="grid grid-cols-2 gap-1.5" role="tablist">
          <button className="customer-type-tab flex flex-col items-center justify-center py-2 px-3 rounded-lg text-center transition-all bg-white text-[#991b1b] shadow-sm font-semibold border border-red-100" id="tabPersonal"  type="button">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold">
              <span>👤</span><span>Cá nhân / Mua lẻ</span>
            </div>
            <span className="text-[10px] text-slate-500 font-normal mt-0.5">Người tiêu dùng, mua quà biếu gia đình</span>
          </button>
          <button className="customer-type-tab flex flex-col items-center justify-center py-2 px-3 rounded-lg text-center transition-all bg-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium" id="tabBusiness"  type="button">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold">
              <span>🏢</span><span>Doanh nghiệp / Tổ chức</span>
            </div>
            <span className="text-[10px] text-slate-400 font-normal mt-0.5">Xuất VAT, hợp đồng B2B &amp; chiết khấu sỉ</span>
          </button>
        </div>
      </div>

      
      <button className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl font-semibold text-sm shadow-sm transition-all hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer" type="button">
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
        </svg>
        <span>Đăng ký nhanh với Google</span>
      </button>

      
      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-slate-200 w-full"></div>
        <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Hoặc đăng ký bằng Email &amp; Mật khẩu</span>
      </div>

      
      <form className="space-y-3.5" >
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </span>
              <input className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#991b1b]/20 focus:border-[#991b1b] outline-none transition-all placeholder:text-slate-400 text-slate-900" placeholder="Ví dụ: Nguyễn Văn A" type="text"/>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </span>
              <input className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#991b1b]/20 focus:border-[#991b1b] outline-none transition-all placeholder:text-slate-400 text-slate-900" placeholder="0912 345 678" type="tel"/>
            </div>
          </div>
        </div>

        
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Email <span className="text-red-500">*</span></label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </span>
            <input className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#991b1b]/20 focus:border-[#991b1b] outline-none transition-all placeholder:text-slate-400 text-slate-900" placeholder="email.cua.ban@gmail.com" type="email"/>
          </div>
        </div>

        
        <div className="p-3.5 bg-slate-50/80 border border-slate-200 rounded-xl space-y-2.5 transition-all" id="businessSection">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#991b1b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
              Thông tin xuất VAT &amp; Doanh nghiệp
            </span>
            <span className="text-[11px] font-medium text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full" id="vatOptionalBadge">
              Không bắt buộc
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Tên Doanh nghiệp / Tổ chức</label>
              <input className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#991b1b]/20 focus:border-[#991b1b] outline-none transition-all placeholder:text-slate-400 text-slate-900" placeholder="Công ty CP Tập đoàn ABC (nếu có)" type="text"/>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Mã số thuế / MST (Xuất hóa đơn VAT)</label>
              <input className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#991b1b]/20 focus:border-[#991b1b] outline-none transition-all placeholder:text-slate-400 text-slate-900" placeholder="0109887766 (tùy chọn)" type="text"/>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 flex items-center gap-1">
            <span>💡</span> Bạn có thể bỏ qua hoặc cập nhật mã số thuế sau trong mục Cài đặt tài khoản bất kỳ lúc nào.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Mật khẩu <span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </span>
              <input className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#991b1b]/20 focus:border-[#991b1b] outline-none transition-all placeholder:text-slate-400 text-slate-900" placeholder="Tối thiểu 8 ký tự" type="password"/>
              <button className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer" type="button">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Xác nhận mật khẩu <span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </span>
              <input className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#991b1b]/20 focus:border-[#991b1b] outline-none transition-all placeholder:text-slate-400 text-slate-900" placeholder="Nhập lại mật khẩu" type="password"/>
            </div>
          </div>
        </div>

        
        <div className="p-3 bg-red-50/60 border border-red-100 rounded-xl flex items-start gap-2.5">
          <input defaultChecked className="mt-0.5 w-4 h-4 text-[#991b1b] border-slate-300 rounded focus:ring-[#991b1b]" id="termsCheck" type="checkbox"/>
          <label className="text-[11px] text-slate-600 leading-relaxed cursor-pointer select-none" htmlFor="termsCheck">
            Tôi đồng ý với <a className="text-[#991b1b] font-semibold hover:underline" href="#terms">Điều khoản dịch vụ</a> &amp; <a className="text-[#991b1b] font-semibold hover:underline" href="#privacy">Chính sách bảo mật</a> của MoonMarket. Đăng ký nhận thông tin khuyến mãi &amp; ưu đãi mùa Trung Thu.
          </label>
        </div>

        
        <button className="w-full py-3 px-5 bg-[#991b1b] hover:bg-[#7f1d1d] active:bg-[#681818] text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-red-950/20 hover:shadow-red-950/30 flex items-center justify-center gap-2 transition-all group cursor-pointer" type="submit">
          <span id="submitBtnText">Đăng ký tài khoản ngay</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
        </button>
      </form>

      
      <div className="mt-4 pt-3 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-500">
          Đã có tài khoản trên MoonMarket? 
          <a className="text-[#991b1b] font-bold hover:underline inline-flex items-center gap-1" href="#login">
            Đăng nhập ngay
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </a>
        </p>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}
