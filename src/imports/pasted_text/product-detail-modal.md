KHI BẤM "Xem chi tiết" SẢN PHẨM
Vị trí: Màn hình Dashboard Thống kê → Khối 3: Thống kê sản phẩm bán chạy → Bảng danh sách → Cột "Hành động" → Nút [Xem chi tiết]

Hành động khi bấm: Hiển thị Modal/Popup chi tiết sản phẩm (không chuyển trang)

🪟 MODAL CHI TIẾT SẢN PHẨM
text
====================================================================================================
|  🛍️ CHI TIẾT SẢN PHẨM: Áo thun nam                                              [ Đóng X ]       |
====================================================================================================

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
|                                                                                                 |
|  ┌─────────────────────────────────────┐    ┌─────────────────────────────────────────────────┐ |
|  | 📷 ẢNH SẢN PHẨM                     |    | 📋 THÔNG TIN SẢN PHẨM                             | |
|  |                                     |    | Tên: Áo thun nam                                 | |
|  |       [ Hình ảnh sản phẩm ]         |    | Danh mục: Áo                                     | |
|  |                                     |    | Giới tính: Nam                                   | |
|  |                                     |    | Mô tả: Áo thun chất liệu cotton cao cấp...       | |
|  └─────────────────────────────────────┘    └─────────────────────────────────────────────────┘ |
|                                                                                                 |
|  📊 THỐNG KÊ BÁN HÀNG TRONG KỲ (01/04 - 30/04)                                                  |
|  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐|
|  | Tổng số lượng bán: 250 cái                              | Tổng doanh thu: 12.500.000 VNĐ     | |
|  | Tỷ lệ đóng góp: 20%                                     | Xếp hạng: #1                        | |
|  └─────────────────────────────────────────────────────────────────────────────────────────────┘|
|                                                                                                 |
|  📋 DANH SÁCH BIẾN THỂ SẢN PHẨM                                                                  |
|  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐|
|  | Màu sắc | Kích cỡ | Tồn kho | Số lượng bán | Doanh thu    |                                 |
|  | Đỏ      | M       | 50      | 120          | 6.000.000    |                                 |
|  | Đỏ      | L       | 30      | 80           | 4.000.000    |                                 |
|  | Xanh    | M       | 20      | 50           | 2.500.000    |                                 |
|  └─────────────────────────────────────────────────────────────────────────────────────────────┘|
|                                                                                                 |
|  📋 DANH SÁCH ĐƠN HÀNG CÓ CHỨA SẢN PHẨM NÀY (5 đơn gần nhất)                                    |
|  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐|
|  | Mã đơn  | Ngày đặt     | Khách hàng   | Số lượng | Thành tiền | Trạng thái | Hành động     | |
|  | #1001   | 01/04/2026   | Nguyễn Văn A | 2        | 300.000    | Đã giao    | [Xem đơn hàng]| |
|  | #1003   | 02/04/2026   | Lê Văn C     | 1        | 150.000    | Đã giao    | [Xem đơn hàng]| |
|  | #1005   | 03/04/2026   | Hoàng Văn E  | 3        | 450.000    | Đã giao    | [Xem đơn hàng]| |
|  | #1008   | 05/04/2026   | Trần Thị B   | 1        | 150.000    | Đã giao    | [Xem đơn hàng]| |
|  | #1012   | 07/04/2026   | Phạm Văn D   | 2        | 300.000    | Đã giao    | [Xem đơn hàng]| |
|  └─────────────────────────────────────────────────────────────────────────────────────────────┘|
|                                                                                                 |
|                                                      [ Xem tất cả đơn hàng ]                    |
|                                                                                                 |
└────────────────────────────────────────────────────────────────────────────────────────────────┘
📝 CHI TIẾT CÁC THÀNH PHẦN TRONG MODAL
1. HEADER MODAL
Thành phần	Mô tả
Tiêu đề	🛍️ CHI TIẾT SẢN PHẨM: [Tên sản phẩm]
Nút Đóng	Góc phải trên cùng, bấm → đóng modal
2. THÔNG TIN SẢN PHẨM (2 cột)
Cột trái - Ảnh sản phẩm:

Thành phần	Mô tả
Kích thước	200x200 px
Nội dung	Hiển thị ảnh đại diện của sản phẩm (lấy từ biến thể đầu tiên)
Trường hợp không có ảnh	Hiển thị ảnh mặc định [No Image]
Cột phải - Thông tin chung:

Trường	Dữ liệu	Ghi chú
Tên sản phẩm	Áo thun nam	Lấy từ bảng san_pham
Danh mục	Áo	Lấy từ bảng san_pham
Giới tính	Nam	1: Nam, 2: Nữ, 3: Unisex
Mô tả	Áo thun chất liệu cotton...	Lấy từ bảng san_pham
3. THỐNG KÊ BÁN HÀNG TRONG KỲ (Card)
Chỉ số	Giá trị	Công thức
Tổng số lượng bán	250 cái	Tổng số lượng đã bán trong khoảng thời gian
Tổng doanh thu	12.500.000 VNĐ	Tổng doanh thu từ sản phẩm này
Tỷ lệ đóng góp	20%	(Doanh thu SP này / Tổng doanh thu) × 100%
Xếp hạng	#1	Thứ hạng trong danh sách Top sản phẩm
4. DANH SÁCH BIẾN THỂ SẢN PHẨM
Bảng:

Cột	Mô tả	Định dạng
Màu sắc	Màu sắc biến thể	Text
Kích cỡ	S, M, L, XL, XXL	Text
Tồn kho	Số lượng tồn hiện tại	Số, căn phải
Số lượng bán	Số lượng đã bán trong kỳ	Số, căn phải
Doanh thu	Doanh thu từ biến thể	Số, căn phải, định dạng tiền tệ
Dữ liệu mẫu:

Màu sắc	Kích cỡ	Tồn kho	Số lượng bán	Doanh thu
Đỏ	M	50	120	6.000.000
Đỏ	L	30	80	4.000.000
Xanh	M	20	50	2.500.000
5. DANH SÁCH ĐƠN HÀNG CÓ CHỨA SẢN PHẨM NÀY
Hiển thị 5 đơn hàng gần nhất có chứa sản phẩm này

Bảng:

Cột	Mô tả	Định dạng
Mã đơn	Mã đơn hàng	Text, có thể bấm vào
Ngày đặt	dd/mm/yyyy	Text
Khách hàng	Tên khách hàng	Text
Số lượng	Số lượng sản phẩm trong đơn	Số, căn phải
Thành tiền	Thành tiền của sản phẩm trong đơn	Số, định dạng tiền tệ
Trạng thái	Trạng thái đơn hàng	Badge màu
Hành động	Nút [Xem đơn hàng]	Bấm → chuyển sang UC-03
Dữ liệu mẫu:

Mã đơn	Ngày đặt	Khách hàng	Số lượng	Thành tiền	Trạng thái	Hành động
#1001	01/04/2026	Nguyễn Văn A	2	300.000	Đã giao	[Xem đơn hàng]
#1003	02/04/2026	Lê Văn C	1	150.000	Đã giao	[Xem đơn hàng]
6. NÚT "Xem tất cả đơn hàng"
Thuộc tính	Giá trị
Vị trí	Góc phải dưới cùng của bảng danh sách đơn hàng
Hành động	Bấm → mở modal mới hiển thị toàn bộ danh sách đơn hàng (có phân trang)