/**
 * ForensicStore Pro - CẤU HÌNH KẾT NỐI ĐÁM MÂY
 * ------------------------------------------------------------------
 * Điền 2 giá trị dưới đây MỘT LẦN rồi đẩy lên Vercel (GitHub).
 * Lấy trong Supabase: Project Settings -> API (hoặc Data API).
 *
 *  - supabaseUrl     : Project URL, dạng https://xxxx.supabase.co
 *  - supabaseAnonKey : khóa "anon" / "public" (KHÔNG BAO GIỜ dán khóa service_role vào đây)
 *
 * Khóa anon được thiết kế để công khai. Dữ liệu được bảo vệ bởi các chính sách
 * RLS trong file supabase/security_upgrade.sql: không đăng nhập Thủ kho thì
 * không đọc / sửa được kho, chỉ gửi được phiếu đề xuất lãnh hàng.
 *
 * Để trống cả 2 dòng = app chạy chế độ Cục bộ (Offline) trên từng máy.
 */
window.FORENSIC_CONFIG = {
  supabaseUrl: 'https://iezgwbogdfufdvuuqbzk.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imllemd3Ym9nZGZ1ZmR2dXVxYnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5MzY5NDgsImV4cCI6MjEwMjUxMjk0OH0.h_Vfm6F5WUy1o7U4wdHhI_XmquCAZkatMmvXu7kraUU'
};
