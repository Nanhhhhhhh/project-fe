Giúp tôi bỏ phần tạo thống kê mới ở màn hình dashboard của quản lý và băts đaauf chỉnh sửa như sau: 
MÀN HÌNH: THỐNG KÊ & BÁO CÁO (MH15) 
Role: Quản lý
UC: UC10 – Thống kê báo cáo
Mục đích: Tổng hợp doanh thu, đơn hàng, sản phẩm bán chạy/tồn kho, kèm xuất file và xem chi tiết

🧩 BỐ CỤC TỔNG THỂ MÀN HÌNH
text
=================================================================
|                    THỐNG KÊ & BÁO CÁO                          |
=================================================================

┌─────────────────────────────────────────────────────────────┐
│ 1. THỐNG KÊ DOANH THU                          [ Xuất file] │
├─────────────────────────────────────────────────────────────┤
│ [Theo ngày] [Theo tháng] [Theo năm] [Theo sản phẩm]          │
│ ─────────────────────────────────────────────────────────── │
│ | Thời gian / Sản phẩm | Doanh thu (VNĐ) | Hành động |       │
│ | 01/04/2026          | 12.500.000      | [Xem]      |       │
│ | 02/04/2026          | 8.200.000       | [Xem]      |       │
│ | 03/04/2026          | 15.300.000      | [Xem]      |       │
│ ─────────────────────────────────────────────────────────── │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 2. THỐNG KÊ ĐƠN HÀNG THEO TRẠNG THÁI            [ Xuất file] │
├─────────────────────────────────────────────────────────────┤
│ | Trạng thái        | Số lượng | Hành động |                 │
│ | Chờ xác nhận      | 5        | [Xem]     |                 │
│ | Đã xác nhận       | 8        | [Xem]     |                 │
│ | Đang giao         | 3        | [Xem]     |                 │
│ | Đã giao           | 20       | [Xem]     |                 │
│ | Đã hủy            | 2        | [Xem]     |                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 3. THỐNG KÊ SẢN PHẨM BÁN CHẠY / TỒN KHO          [ Xuất file] │
├─────────────────────────────────────────────────────────────┤
│ [🔽 Bán chạy nhất] [🔽 Tồn kho cao] [🔽 Sắp hết hàng]        │
│ ─────────────────────────────────────────────────────────── │
│ | Sản phẩm | SL bán | Tồn kho | Hành động |       │
│ | Áo thun  |50     | 10      | [Xem]      |       │
│ | Quần jean| 35     | 5       | [Xem]      |       │
│ ─────────────────────────────────────────────────────────── │
└─────────────────────────────────────────────────────────────┘

📌 CHI TIẾT TỪNG KHỐI
1️⃣ THỐNG KÊ DOANH THU
Các tab lọc:
Tab
Chức năng
Theo ngày
Hiển thị doanh thu theo từng ngày trong khoảng thời gian chọn
Theo tháng
Hiển thị doanh thu theo từng tháng
Theo năm
Hiển thị doanh thu theo từng năm
Theo sản phẩm
Hiển thị tổng doanh thu theo từng sản phẩm

Bảng dữ liệu:
Cột
Mô tả
Thời gian / Sản phẩm
Ngày (dd/mm/yyyy) hoặc Tháng (MM/yyyy) hoặc Năm (yyyy) hoặc Tên sản phẩm
Doanh thu (VNĐ)
Tổng tiền bán được, định dạng số, căn phải
Hành động
Nút [Xem]

🔹 Nút "Xuất Excel" (góc phải khối)
Bấm → Xuất toàn bộ dữ liệu của bảng hiện tại ra file Excel
🔹 Nút "Xem" (trong bảng)
Bấm → Mở Modal/Drawer danh sách đơn hàng chi tiết cho dòng đó

2️⃣ THỐNG KÊ ĐƠN HÀNG THEO TRẠNG THÁI
Bảng dữ liệu:
Cột
Mô tả
Trạng thái
Chờ xác nhận / Đã xác nhận / Đang giao / Đã giao / Đã hủy
Số lượng
Tổng số đơn hàng có trạng thái đó
Hành động
Nút [Xem]

🔹 Nút "Xuất Excel"
Xuất bảng thống kê số lượng theo trạng thái
🔹 Nút "Xem"
Bấm → Mở Modal danh sách đơn hàng của trạng thái đó (ví dụ: tất cả đơn "Chờ xác nhận")

3️⃣ THỐNG KÊ SẢN PHẨM BÁN CHẠY / TỒN KHO
Các bộ lọc dạng dropdown/button:
Nút
Chức năng
Bán chạy nhất
Sắp xếp theo số lượng bán giảm dần, lấy top 10
Tồn kho cao
Sắp xếp theo tồn kho giảm dần
Sắp hết hàng
Lọc các biến thể có tồn kho <= ngưỡng (VD: <=5)

Bảng dữ liệu:
Cột
Mô tả
Sản phẩm
Tên sản phẩm
Biến thể
Màu sắc - Kích cỡ
SL bán
Tổng số lượng đã bán
Tồn kho
Số lượng tồn hiện tại
Hành động
Nút [Xem]

🔹 Nút "Xuất Excel"
Xuất bảng dữ liệu hiện tại (theo bộ lọc đang chọn)
🔹 Nút "Xem"
Bấm → Mở Modal danh sách đơn hàng có chứa sản phẩm/biến thể đó

🪟 MODAL CHI TIẾT DANH SÁCH ĐƠN HÀNG
Khi bấm nút "Xem" bất kỳ (ở cả 3 khối) → hiện modal:
text
=================================================================
|  📋 DANH SÁCH ĐƠN HÀNG                              [Đóng]     |
|  Tiêu chí: Doanh thu ngày 01/04/2026                          |
=================================================================
| Mã đơn | Ngày đặt | Khách hàng | Tổng tiền | Trạng thái | Chi tiết |
|--------|----------|------------|-----------|------------|----------|
| #1001  | 01/04/26 | Nguyễn A   | 500.000   | Đã giao    | [Xem]    |
| #1002  | 01/04/26 | Trần B     | 300.000   | Đang giao  | [Xem]    |
=================================================================
                                            [ Xuất danh sách Excel ]
🔹 Nút "Xem" (trong modal danh sách đơn hàng)
Bấm → Mở Modal chi tiết đơn hàng (MH09/MH17 style)

🪟 MODAL CHI TIẾT ĐƠN HÀNG
text
=================================================================
|  🧾 CHI TIẾT ĐƠN HÀNG #1001                        [Đóng]     |
=================================================================
| Ngày đặt: 01/04/2026        | Trạng thái: Đã giao              |
| Khách hàng: Nguyễn Văn A    | SĐT: 0912345678                 |
| Địa chỉ: 123 Đường ABC, Hà Nội                                |
=================================================================
| Sản phẩm         | Biến thể | SL | Đơn giá | Thành tiền       |
| Áo thun nam      | Đỏ - M   | 2  | 150.000 | 300.000          |
| Quần short       | Xanh - L | 1  | 200.000 | 200.000          |
=================================================================
| Tổng tiền: 500.000 VNĐ                                        |
| Phí ship: 20.000 VNĐ                                          |
| Giảm giá: 0 VNĐ                                               |
| Thành toán: 520.000 VNĐ                                       |
=================================================================
