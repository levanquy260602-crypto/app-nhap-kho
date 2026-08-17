# ForensicStore Pro - Phần Mềm Quản Lý Kho Vật Tư Hóa Chất & Văn Phòng Phẩm (Trung Tâm Pháp Y)

**ForensicStore Pro** là hệ thống cơ sở dữ liệu chuyên biệt phục vụ công tác quản lý kho, theo dõi hạn sử dụng hóa chất sinh phẩm, quản lý số lô (Batch/Lot), cấp phát theo vụ án/khoa phòng và in ấn biểu mẫu A4 chuẩn thể thức cơ quan tại **Trung tâm Pháp y Thành phố**.

---

## 🌟 Các Tính Năng Nổi Bật

### 1. Quản lý 2 Phân Hệ Kho Riêng Biệt & Thống Nhất
- 🧪 **Kho Hóa chất, Sinh phẩm & Vật tư Giám định**:
  - Quản lý Sinh phẩm & Kit tách chiết/khuếch đại ADN (STR Identifiler, PrepFiler...).
  - Quản lý Que test nhanh ma túy tổng hợp 5 chân (MOP/MET/MDMA/THC/KET).
  - Quản lý Dung môi sắc ký HPLC, GC-MS (Methanol, Acetonitrile, Acid...).
  - Quản lý Chất chuẩn nồng độ cồn, chất chuẩn độc chất Paraquat, thuốc trừ sâu.
  - Quản lý Hóa chất bảo quản mô tử thi (Formalin 10% đệm trung tính).
  - Quản lý Dụng cụ mổ tử thi (Lưỡi dao mổ vô trùng, túi đựng thi thể 6 quai, găng tay Nitrile).
  - Quản lý chi tiết: Công thức hóa học, Số CAS, Mức độ độc hại (Độc bảng A, Độc bảng B, Dễ cháy, Ăn mòn), Điều kiện bảo quản (Âm sâu -20°C, Lạnh 2-8°C, Tủ chống cháy nổ), Vị trí ngăn kệ.
- 📁 **Kho Văn phòng phẩm & Vật tư Hành chính**:
  - Giấy in A4 chuyên dụng in Bản kết luận giám định pháp y.
  - Bìa còng lưu trữ hồ sơ án giám định tử thi 50 năm.
  - Hộp mực máy in các khoa phòng, tem niêm phong mẫu vật chống bóc trộm.
  - Bút lông dầu không trôi trong Formalin khi ghi nhãn mẫu phủ tạng.

### 2. Hệ Thống Cảnh Báo Khẩn Cấp Thông Minh
- 🔴 **Cảnh báo Hóa chất Quá Hạn**: Phát hiện ngay lập tức hóa chất hết hạn để cách ly, không làm sai lệch kết quả giám định pháp lý trước Tòa án.
- 🟡 **Cảnh báo Hóa chất Sắp Hết Hạn (&le; 60 ngày)**: Khuyến nghị cơ chế **FEFO (First Expired, First Out)** ưu tiên xuất trước.
- ⚠️ **Cảnh báo Tồn Kho Dưới Định Mức**: Tự động thông báo khi lượng tồn thấp hơn mức tồn tối thiểu để kịp thời lập dự trù mua sắm.

### 3. Nghiệp Vụ Nhập - Xuất - Kiểm Kê Kho
- **Lập Phiếu Nhập Kho**: Ghi nhận đơn vị cung cấp, số hóa đơn, số hợp đồng, chi tiết từng số Lô và HSD, tự động cập nhật tồn kho.
- **Lập Phiếu Xuất Kho Thông Minh**: Cấp phát cho từng Khoa phòng (*Khoa Độc chất*, *Khoa ADN*, *Khoa Tử thi*, *Khối Hành chính*), gắn mã số Vụ án hình sự / Trưng cầu giám định, tự động gợi ý xuất Lô có hạn gần nhất (FEFO).
- **In ấn Khổ A4 Trực Tiếp**: In Phiếu Nhập Kho, Phiếu Xuất Kho theo chuẩn thể thức cơ quan nhà nước, có đầy đủ các ô ký tên: Thủ kho, Người nhận, Trưởng khoa, Lãnh đạo Trung tâm Pháp y.

### 4. Báo Cáo & Thống Kê Chuyên Sâu
- **Báo cáo Xuất - Nhập - Tồn (XNT)** trong bất kỳ khoảng thời gian nào.
- **Thẻ Kho chi tiết (Stock Card)** cho từng mặt hàng: theo dõi toàn bộ lịch sử tăng giảm và số dư tồn lũy kế.
- **Thống kê tiêu hao theo Khoa/Phòng**: Phân tích chi phí và lượng tiêu thụ của từng bộ phận phục vụ lập dự trù ngân sách năm.
- **Xuất dữ liệu Excel (.csv / UTF-8 BOM)** không bao giờ bị lỗi font tiếng Việt.

### 5. An Toàn Cơ Sở Dữ Liệu & Offline-First
- Chạy trực tiếp 100% trên trình duyệt không cần cài đặt phần mềm máy chủ cồng kềnh.
- **Sao lưu (Backup)**: Tải file `.json` toàn bộ dữ liệu chỉ với 1 click.
- **Khôi phục (Restore)**: Phục hồi lại dữ liệu bất kỳ lúc nào từ file `.json`.

---

## 🚀 Hướng Dẫn Sử Dụng Nhanh

1. Mở file `index.html` trực tiếp bằng bất kỳ trình duyệt nào (Google Chrome, Microsoft Edge, Firefox).
2. Hoặc khởi chạy thông qua bất kỳ Live Server cục bộ nào.
3. Sử dụng thanh chuyển đổi nhanh trên cùng để xem riêng từng kho hoặc cả 2 kho.
4. Trải nghiệm các tính năng lập phiếu nhập, phiếu xuất, xem thẻ kho và in báo cáo.

---
*Phần mềm được thiết kế và tối ưu hóa đặc thù cho công tác giám định pháp y và quản trị hành chính.*
