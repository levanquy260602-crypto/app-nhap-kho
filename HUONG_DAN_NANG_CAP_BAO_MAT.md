# Hướng dẫn triển khai bản nâng cấp bảo mật – ForensicStore Pro

Làm đúng thứ tự dưới đây. Trước khi bắt đầu, vào Cài Đặt của app bản cũ, bấm **Tải File Sao Lưu (.json)** để có bản dự phòng.

## Bước 1. Chạy SQL trên Supabase
Supabase → **SQL Editor** → **New query** → dán toàn bộ file `supabase/security_upgrade.sql` → **Run**.
Từ lúc này, link cũ `?cloud=...` và app bản cũ **không còn đọc/ghi được dữ liệu kho** (đây là điều mong muốn). Dữ liệu kho hiện có được giữ nguyên.

## Bước 2. Khóa đăng ký và tạo tài khoản Thủ kho
1. **Authentication → Sign In / Providers** → tắt **Allow new users to sign up**.
2. **Authentication → Users → Add user → Create new user**: nhập email và mật khẩu mạnh (≥ 12 ký tự), tích **Auto Confirm User**.
3. Quay lại **SQL Editor**, chạy (thay email):
   ```sql
   INSERT INTO public.app_admins (user_id, email, full_name)
   SELECT id, email, 'Lê Văn Quý' FROM auth.users WHERE email = 'email-cua-ban@gmail.com'
   ON CONFLICT (user_id) DO NOTHING;
   ```

## Bước 3. Điền cấu hình và đưa lên Vercel
1. Supabase → **Project Settings → API**: copy **Project URL** và khóa **anon public**.
2. Mở `js/config.js`, điền 2 giá trị đó. **Không dùng khóa `service_role`.**
3. Chép toàn bộ thư mục này đè lên mã nguồn cũ trên GitHub (hoặc kéo thả lên Vercel) để triển khai lại.

## Bước 4. Đổi khóa anon cũ (khuyến nghị)
Khóa cũ đã nằm trong các link gửi qua Zalo. Sau khi RLS bật, khóa đó không còn mở được kho, nhưng nên tạo khóa mới (Project Settings → API Keys) rồi cập nhật lại `js/config.js`. Xóa các tin nhắn Zalo chứa link `?cloud=`.

## Sử dụng hằng ngày
- **Thủ kho:** mở trang web → đăng nhập email + mật khẩu. Trên máy dùng chung, bỏ tích "Ghi nhớ" và bấm **Đăng xuất** khi xong (dữ liệu tạm trên máy sẽ bị xóa).
- **Khoa/Phòng:** mở cùng địa chỉ trang web → nút **"Khoa / Phòng Đăng Ký Lãnh Vật Tư & VPP"** → gửi phiếu. Không cần mật khẩu, không xem được kho. Phiếu tự về mục **Duyệt Đề Xuất** của Thủ kho.
- Hóa chất **Độc bảng A** và **Tiền chất ma túy** không hiện trong form đề xuất công khai; cấp phát các loại này theo quy trình riêng.

## Khi cần
- Xem ai sửa kho, lúc nào: chạy câu SELECT ở cuối file SQL.
- Lấy lại dữ liệu bị ghi đè nhầm: bảng `forensic_inventory_history`, cột `old_data` (giữ 150 bản gần nhất, tối đa 5 phút/bản).
- Thêm/bớt người có quyền: thêm vào hoặc xóa khỏi bảng `app_admins`.
