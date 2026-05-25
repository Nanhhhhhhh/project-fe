Màn hình Dashboard (quản lý)
THỐNG KÊ BÁO CÁO DOANH THU (UC-10)
Role: Quản lý
Loại biểu đồ: Biểu đồ cột (Column Chart)

 BỐ CỤC TỔNG THỂ MÀN HÌNH (CẬP NHẬT)
text
====================================================================================================
|  THỐNG KÊ BÁO CÁO DOANH THU                                                        [ Xuất Excel ]  |
====================================================================================================

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
|  CHỌN THỜI GIAN                                                                                |
| ┌────────────────────────────────────────────────────────────────────────────────────────────┐  |
| | Loại thống kê:  [Theo ngày ▼]  [Theo tháng]  [Theo năm]                                     |  |
| | Khoảng thời gian:  [01/04/2026]  →  [30/04/2026]                                    [ Xem ] |  |
| └────────────────────────────────────────────────────────────────────────────────────────────┘  |
└────────────────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
| BIỂU ĐỒ CỘT DOANH THU                                                                        |
| ┌────────────────────────────────────────────────────────────────────────────────────────────┐  |
| |                                    BIỂU ĐỒ CỘT                               |  |
| |                                                                                             |  |
| |  20M ┤          ┌───┐                                                                       |  |
| |  15M ┤          │   │      ┌───┐                                                           |  |
| |  10M ┤      ┌───┐│   │      │   │      ┌───┐                                               |  |
| |   5M ┤  ┌───┐│   ││   │  ┌───┐│   │  ┌───┐│   │                                           |  |
| |   0M └──┴───┴┴───┴┴───┴──┴───┴┴───┴──┴───┴┴───┴───────────────────────────────────────────  |  |
| |       01/04  02/04  03/04  04/04  05/04  06/04  07/04  08/04  09/04  10/04                  |  |
| |                                                                                             |  |
| |                         ■ Doanh thu (VNĐ)                                                    |  |
| └────────────────────────────────────────────────────────────────────────────────────────────┘  |
└────────────────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
| TÓM TẮT                                                                                      |
| ┌─────────────────────────┬─────────────────────────┬─────────────────────────────────────────┐  |
| | TỔNG DOANH THU        | TỔNG ĐƠN HÀNG         |  TỔNG SẢN PHẨM BÁN ĐƯỢC              |  |
| | 36.000.000 VNĐ          | 15 đơn                   | 135 sản phẩm                           |  |
| └─────────────────────────┴─────────────────────────┴─────────────────────────────────────────┘  |
└────────────────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
|  DANH SÁCH ĐƠN HÀNG HOÀN THÀNH                                                                 |
| ┌────────────────────────────────────────────────────────────────────────────────────────────┐  |
| | Mã đơn  | Ngày đặt     | Khách hàng      | Tổng tiền   | Trạng thái | Hành động            |  |
| | #1001   | 01/04/2026   | Nguyễn Văn A    | 500.000     | Đã giao    | [Xem chi tiết]       |  |
| | #1002   | 01/04/2026   | Trần Thị B      | 300.000     | Đã giao    | [Xem chi tiết]       |  |
| | #1003   | 02/04/2026   | Lê Văn C        | 450.000     | Đã giao    | [Xem chi tiết]       |  |
| | ... (phân trang nếu nhiều)                                                                   |  |
| └────────────────────────────────────────────────────────────────────────────────────────────┘  |
|                                                                                                 |
|                                                      [ 1 ] [ 2 ] [ 3 ] ... [ Xem tất cả ]       |
└────────────────────────────────────────────────────────────────────────────────────────────────┘
 CHI TIẾT BIỂU ĐỒ CỘT
Thuộc tính	Giá trị
Loại biểu đồ	Biểu đồ cột (Column Chart / Vertical Bar Chart)
Trục X (ngang)	Mốc thời gian (ngày/tháng/năm tùy theo loại thống kê)
Trục Y (dọc)	Doanh thu (VNĐ), chia mốc tự động, bắt đầu từ 0
Dữ liệu	Tổng doanh thu theo từng mốc thời gian
Màu sắc cột	Màu xanh dương (#2196F3) hoặc gradient xanh
Độ rộng cột	Tự động điều chỉnh theo số lượng cột, có khoảng cách giữa các cột
Border radius	Bo góc nhẹ phía trên cột (4px)
Tooltip	Hover vào cột → hiển thị: "Ngày: 01/04/2026	Doanh thu: 12.500.000 VNĐ"
Giá trị trên cột	(Tùy chọn) Hiển thị số doanh thu phía trên mỗi cột
 GIAO DIỆN BIỂU ĐỒ CỘT CHI TIẾT
text
    20M ┤
         ┌─────┐
    15M ┤ │     │      ┌─────┐
         │     │      │     │
    10M ┤ │     │  ┌───┐│     │  ┌───┐
         │     │  │   ││     │  │   │
     5M ┤ │ 12.5│  │8.2││ 15.3│  │   │
         │  tr │  │tr ││  tr │  │   │
     0M └─┴─────┴──┴───┴┴─────┴──┴───┴─────
          01/04   02/04   03/04   04/04
          
          ■ Doanh thu (triệu VNĐ)
 CẬP NHẬT THEO LOẠI THỐNG KÊ
Loại thống kê	Trục X	Số lượng cột	Ghi chú
Theo ngày	Ngày (dd/mm)	Tối đa 31 cột	Nếu nhiều hơn 15 cột, có thể cuộn ngang
Theo tháng	Tháng (MM/yyyy)	Tối đa 12 cột	Hiển thị tất cả các tháng trong năm
Theo năm	Năm (yyyy)	Theo số năm chọn	Mỗi năm 1 cột
 CẬP NHẬT BẢNG DANH SÁCH ĐƠN HÀNG
Thêm cột "Hành động" để xem chi tiết từng đơn hàng:

Cột	Mô tả
Mã đơn	Mã đơn hàng (VD: #1001)
Ngày đặt	dd/mm/yyyy
Khách hàng	Tên khách hàng
Tổng tiền	Số tiền (VNĐ)
Trạng thái	"Đã giao" (Badge xanh)
Hành động	Nút [Xem chi tiết] (dạng text link hoặc button nhỏ)
Tương tác:

Bấm vào nút "Xem chi tiết" → chuyển sang màn hình chi tiết đơn hàng (UC-03)



MÔ TẢ MÀN HÌNH CHO FIGMA
THÔNG TIN CHUNG
Thuộc tính
Giá trị
Tên Frame
Thống kê trạng thái đơn hàng
Kích thước
1440 x 1024 px
Background
#F5F7FA
Padding
24px


 BỐ CỤC TỔNG THỂ
text
====================================================================================================
|  THỐNG KÊ TRẠNG THÁI ĐƠN HÀNG                                                  [ Xuất Excel ]    |
====================================================================================================

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
| CHỌN THỜI GIAN                                                                                |
| ┌────────────────────────────────────────────────────────────────────────────────────────────┐  |
| | Khoảng thời gian:  [01/04/2026]  →  [30/04/2026]                                    [ Xem ] |  |
| └────────────────────────────────────────────────────────────────────────────────────────────┘  |
└────────────────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
| 📊 BIỂU ĐỒ TRẠNG THÁI ĐƠN HÀNG                                                                   |
|                                                                                                 |
|   ┌─────────────────────────────────┐      ┌─────────────────────────────────────────────────┐ |
|   |                                 |      | BẢNG TÓM TẮT                                      | |
|   |        BIỂU ĐỒ TRÒN             |      | ┌─────────────────────────────────────────────┐ | |
|   |        (Pie Chart)              |      | | Trạng thái        | Số lượng | Tỷ lệ        | | |
|   |                                 |      | | Chờ xác nhận      | 5        | 10%          | | |
|   |    🟢 Chờ xác nhận (10%)         |      | | Đã xác nhận       | 8        | 16%          | | |
|   |    🔵 Đã xác nhận (16%)          |      | | Đang giao         | 3        | 6%           | | |
|   |    🟠 Đang giao (6%)             |      | | Đã giao           | 20       | 40%          | | |
|   |    🟣 Đã giao (40%)              |      | | Đã hủy            | 2        | 4%           | | |
|   |    🔴 Đã hủy (4%)                |      | | Tổng              | 38       | 100%         | | |
|   |                                 |      | └─────────────────────────────────────────────┘ | |
|   └─────────────────────────────────┘      └─────────────────────────────────────────────────┘ |
|                                                                                                 |
└────────────────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
|  DANH SÁCH ĐƠN HÀNG                                                                           |
| ┌────────────────────────────────────────────────────────────────────────────────────────────┐  |
| | Lọc theo trạng thái: [ Tất cả ▼ ]                                                           |  |
| └────────────────────────────────────────────────────────────────────────────────────────────┘  |
| ┌────────────────────────────────────────────────────────────────────────────────────────────┐  |
| | Mã đơn  | Ngày đặt     | Khách hàng      | Tổng tiền   | Trạng thái      | Hành động       |  |
| | #1001   | 01/04/2026   | Nguyễn Văn A    | 500.000     | Đã giao         | [Xem chi tiết]  |  |
| | #1002   | 01/04/2026   | Trần Thị B      | 300.000     | Chờ xác nhận    | [Xem chi tiết]  |  |
| | #1003   | 02/04/2026   | Lê Văn C        | 450.000     | Đang giao       | [Xem chi tiết]  |  |
| | #1004   | 02/04/2026   | Phạm Thị D      | 200.000     | Đã hủy          | [Xem chi tiết]  |  |
| | #1005   | 03/04/2026   | Hoàng Văn E     | 600.000     | Đã xác nhận     | [Xem chi tiết]  |  |
| | ... (phân trang nếu nhiều)                                                                   |  |
| └────────────────────────────────────────────────────────────────────────────────────────────┘  |
|                                                                                                 |
|                                                      [ 1 ] [ 2 ] [ 3 ] ... [ Xem tất cả ]       |
└────────────────────────────────────────────────────────────────────────────────────────────────┘

 CHI TIẾT TỪNG THÀNH PHẦN
1. HEADER
Thuộc tính
Giá trị
Vị trí
Top 0, Left 0, Width 1440, Height 72
Background
#FFFFFF
Border bottom
1px solid #E5E7EB


Element
Vị trí
Thuộc tính
Tiêu đề "Thống kê trạng thái đơn hàng"
Left 24, Top 20
Font size 24px, Bold, Color #111827
Nút "Xuất Excel"
Right 24, Top 18, Width 120, Height 36
Background #2E7D32, Text white, Border radius 6px, Hover: #1B5E20


2. BỘ LỌC THỜI GIAN (Filter Card)
Thuộc tính
Giá trị
Vị trí
Top 96, Left 24, Width 1392, Height 80
Background
#FFFFFF
Border radius
12px
Shadow
0 1px 3px rgba(0,0,0,0.1)

Nội dung bên trong:
Element
Vị trí
Thuộc tính
Label "Khoảng thời gian:"
Left 24, Top 28
Font 14px, Color #6B7280
Date picker "Ngày bắt đầu"
Left 160, Top 22, Width 180, Height 36
Border 1px #D1D5DB, Border radius 6px, Padding 8px
Icon "→"
Left 356, Top 30
Font 16px, Color #9CA3AF
Date picker "Ngày kết thúc"
Left 380, Top 22, Width 180, Height 36
Border 1px #D1D5DB, Border radius 6px
Nút "Xem"
Left 580, Top 22, Width 100, Height 36
Background #1976D2, Text white, Border radius 6px, Hover: #1565C0


3. BIỂU ĐỒ TRÒN + BẢNG TÓM TẮT (Card)
Thuộc tính
Giá trị
Vị trí
Top 200, Left 24, Width 1392, Height 360
Background
#FFFFFF
Border radius
12px
Shadow
0 1px 3px rgba(0,0,0,0.1)

3a. BIỂU ĐỒ TRÒN (Bên trái)
Thuộc tính
Giá trị
Vị trí
Left 40, Top 30, Width 400, Height 300
Loại biểu đồ
Pie Chart (biểu đồ tròn)
Tâm biểu đồ
Center (200, 150)
Bán kính
120px

Các phần của biểu đồ (theo BR15-1):
Trạng thái
Màu sắc
Góc bắt đầu
Góc kết thúc
Tỷ lệ
Chờ xác nhận
#FFC107 (Vàng)
0°
36°
10%
Đã xác nhận
#2196F3 (Xanh dương)
36°
93.6°
16%
Đang giao
#FF9800 (Cam)
93.6°
115.2°
6%
Đã giao
#4CAF50 (Xanh lá)
115.2°
259.2°
40%
Đã hủy
#F44336 (Đỏ)
259.2°
360°
4%

Chú thích (Legend) - Đặt bên phải biểu đồ:
Element
Vị trí
Thuộc tính
Legend container
Left 460, Top 40, Width 200


🟢 Chờ xác nhận (10%)
Top 0
Màu chấm #FFC107
🔵 Đã xác nhận (16%)
Top 40
Màu chấm #2196F3
🟠 Đang giao (6%)
Top 80
Màu chấm #FF9800
🟣 Đã giao (40%)
Top 120
Màu chấm #4CAF50
🔴 Đã hủy (4%)
Top 160
Màu chấm #F44336

Tương tác (theo BR15-3):
Hover vào một phần của biểu đồ → phần đó sáng lên (opacity 0.8) + tooltip hiển thị: "Đã giao: 20 đơn (40%)"
Click vào một phần của biểu đồ → lọc danh sách đơn hàng bên dưới theo trạng thái đó
3b. BẢNG TÓM TẮT (Bên phải)
Thuộc tính
Giá trị
Vị trí
Left 680, Top 30, Width 680, Height 300

Bảng:
Cột
Width
Alignment
Header color
Trạng thái
200px
Left
#F9FAFB
Số lượng
120px
Right
#F9FAFB
Tỷ lệ
100px
Right
#F9FAFB

Dữ liệu mẫu:
Trạng thái
Số lượng
Tỷ lệ
Chờ xác nhận
5
10%
Đã xác nhận
8
16%
Đang giao
3
6%
Đã giao
20
40%
Đã hủy
2
4%
Tổng
38
100%


4. DANH SÁCH ĐƠN HÀNG (Card)
Thuộc tính
Giá trị
Vị trí
Top 584, Left 24, Width 1392, Height 400
Background
#FFFFFF
Border radius
12px
Shadow
0 1px 3px rgba(0,0,0,0.1)

4a. Bộ lọc trạng thái
Thuộc tính
Giá trị
Vị trí
Top 20, Left 24, Width 200, Height 36
Loại
Dropdown select
Giá trị mặc định
"Tất cả"
Các giá trị
Tất cả, Chờ xác nhận, Đã xác nhận, Đang giao, Đã giao, Đã hủy

Tương tác:
Chọn giá trị → danh sách đơn hàng lọc theo trạng thái đó
Nếu click vào biểu đồ tròn → dropdown tự động chuyển sang trạng thái tương ứng
4b. Bảng danh sách đơn hàng
Thuộc tính
Giá trị
Vị trí
Top 70, Left 24, Width 1344

Các cột:
Cột
Width
Alignment
Màu nền header
Mã đơn
100px
Left
#F9FAFB
Ngày đặt
120px
Left
#F9FAFB
Khách hàng
200px
Left
#F9FAFB
Tổng tiền
150px
Right
#F9FAFB
Trạng thái
150px
Left
#F9FAFB
Hành động
100px
Center
#F9FAFB

Badge trạng thái (màu sắc):
Trạng thái
Màu nền
Màu chữ
Border radius
Chờ xác nhận
#FFF3E0
#E65100
16px
Đã xác nhận
#E3F2FD
#1565C0
16px
Đang giao
#FFF3E0
#EF6C00
16px
Đã giao
#E8F5E9
#2E7D32
16px
Đã hủy
#FFEBEE
#C62828
16px

Dữ liệu mẫu (5 dòng đầu):
Mã đơn
Ngày đặt
Khách hàng
Tổng tiền
Trạng thái
Hành động
#1001
01/04/2026
Nguyễn Văn A
500.000
Đã giao
[Xem chi tiết]
#1002
01/04/2026
Trần Thị B
300.000
Chờ xác nhận
[Xem chi tiết]
#1003
02/04/2026
Lê Văn C
450.000
Đang giao
[Xem chi tiết]
#1004
02/04/2026
Phạm Thị D
200.000
Đã hủy
[Xem chi tiết]
#1005
03/04/2026
Hoàng Văn E
600.000
Đã xác nhận
[Xem chi tiết]

4c. Phân trang
Thuộc tính
Giá trị
Vị trí
Bottom 20, Right 24
Các nút
[ 1 ] [ 2 ] [ 3 ] ... [ Xem tất cả ]
Nút active
Màu #1976D2, chữ trắng


🖱️ CHI TIẾT TƯƠNG TÁC (INTERACTIONS)
Khi bấm nút "Xem" (bộ lọc)
Hành động
Kết quả
Bấm "Xem"
Load lại biểu đồ tròn, bảng tóm tắt, danh sách đơn hàng theo khoảng thời gian mới

Khi click vào biểu đồ tròn (theo BR15-3)
Hành động
Kết quả
Click vào phần "Đã giao"
Dropdown lọc chuyển thành "Đã giao", danh sách đơn hàng chỉ hiển thị đơn có trạng thái "Đã giao"

Khi bấm "Xem chi tiết"
Hành động
Kết quả
Bấm "Xem chi tiết"
Mở modal chi tiết đơn hàng (UC-03) hoặc chuyển trang

Khi bấm "Xuất Excel"
Hành động
Kết quả
Bấm "Xuất Excel"
Tải file Excel gồm: Sheet1: Bảng tóm tắt, Sheet2: Danh sách đơn hàng



THỐNG KÊ BÁO CÁO SẢN PHẨM BÁN CHẠY (UC-16)
Role: Quản lý
Mục đích: Xem sản phẩm bán chạy theo số lượng và doanh thu trong một khoảng thời gian, hiển thị danh sách Top sản phẩm kèm biểu đồ so sánh, xuất báo cáo ra file Excel.

 BỐ CỤC TỔNG THỂ MÀN HÌNH
text
====================================================================================================
|  THỐNG KÊ SẢN PHẨM BÁN CHẠY                                                    [ Xuất Excel ]    |
====================================================================================================

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
|  CHỌN THỜI GIAN & TÙY CHỌN                                                                     |
| ┌────────────────────────────────────────────────────────────────────────────────────────────┐  |
| | Khoảng thời gian:  [01/04/2026]  →  [30/04/2026]                                            |  |
| | Số lượng hiển thị:  [Top 10 ▼]  [Top 20]  [Top 50]                                          |  |
| | Xếp hạng theo:     [Theo số lượng bán ▼]  [Theo doanh thu]                                  |  |
| |                                                                                  [ Xem ]    |  |
| └────────────────────────────────────────────────────────────────────────────────────────────┘  |
└────────────────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
| 📈 BIỂU ĐỒ CỘT TOP SẢN PHẨM BÁN CHẠY                                                             |
| ┌────────────────────────────────────────────────────────────────────────────────────────────┐  |
| |                                    BIỂU ĐỒ CỘT (Column Chart)                               |  |
| |                                                                                             |  |
| |  500 ┤          ┌───┐                                                                       |  |
| |  400 ┤          │   │      ┌───┐                                                           |  |
| |  300 ┤      ┌───┐│   │      │   │      ┌───┐                                               |  |
| |  200 ┤  ┌───┐│   ││   │  ┌───┐│   │  ┌───┐│   │                                           |  |
| |  100 ┤  │   ││   ││   │  │   ││   │  │   ││   │                                           |  |
| |    0 └──┴───┴┴───┴┴───┴──┴───┴┴───┴──┴───┴┴───┴───────────────────────────────────────────  |  |
| |        SP1    SP2    SP3    SP4    SP5    SP6    SP7    SP8    SP9    SP10                   |  |
| |                                                                                             |  |
| |                         ■ Số lượng bán (cái)                                                 |  |
| └────────────────────────────────────────────────────────────────────────────────────────────┘  |
└────────────────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
|  TÓM TẮT                                                                                      |
| ┌─────────────────────────┬─────────────────────────┬─────────────────────────────────────────┐  |
| | TỔNG SẢN PHẨM BÁN    | TỔNG DOANH THU        | SẢN PHẨM BÁN CHẠY NHẤT              |  |
| | 1.250 cái               | 36.000.000 VNĐ          | Áo thun nam - 250 cái                  |  |
| └─────────────────────────┴─────────────────────────┴─────────────────────────────────────────┘  |
└────────────────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
| 📋 DANH SÁCH TOP SẢN PHẨM BÁN CHẠY                                                               |
| ┌────────────────────────────────────────────────────────────────────────────────────────────┐  |
| | #  | Tên sản phẩm        | Danh mục | Số lượng bán | Doanh thu   | Tỷ lệ | Hành động       |  |
| | 1  | Áo thun nam         | Áo       | 250          | 12.500.000  | 20%   | [Xem chi tiết]  |  |
| | 2  | Quần jean nữ        | Quần     | 180          | 9.000.000   | 14%   | [Xem chi tiết]  |  |
| | 3  | Váy hoa              | Váy      | 150          | 7.500.000   | 12%   | [Xem chi tiết]  |  |
| | 4  | Áo sơ mi nam         | Áo       | 120          | 6.000.000   | 10%   | [Xem chi tiết]  |  |
| | 5  | Quần short           | Quần     | 100          | 5.000.000   | 8%    | [Xem chi tiết]  |  |
| | 6  | Áo khoác gió         | Áo       | 90           | 4.500.000   | 7%    | [Xem chi tiết]  |  |
| | 7  | Mũ lưỡi trai         | Phụ kiện | 80           | 2.400.000   | 6%    | [Xem chi tiết]  |  |
| | 8  | Giày thể thao         | Phụ kiện | 70           | 3.500.000   | 6%    | [Xem chi tiết]  |  |
| | 9  | Váy đầm dự tiệc       | Váy      | 60           | 3.000.000   | 5%    | [Xem chi tiết]  |  |
| | 10 | Áo len cổ lọ          | Áo       | 50           | 2.500.000   | 4%    | [Xem chi tiết]  |  |
| | ... (hiển thị theo số lượng đã chọn: Top 10/20/50)                                            |  |
| └────────────────────────────────────────────────────────────────────────────────────────────┘  |
|                                                                                                 |
|                                                      [ 1 ] [ 2 ] [ 3 ] ... [ Xem tất cả ]       |
└────────────────────────────────────────────────────────────────────────────────────────────────┘

 CHI TIẾT CÁC THÀNH PHẦN
1. BỘ LỌC THỜI GIAN & TÙY CHỌN
Thành phần
Mô tả
Khoảng thời gian
Date picker (ngày bắt đầu - ngày kết thúc)
Số lượng hiển thị
Dropdown: Top 10 / Top 20 / Top 50 (mặc định Top 10 - theo BR16-5)
Xếp hạng theo
Dropdown: Theo số lượng bán / Theo doanh thu (mặc định Theo số lượng bán)
Nút Xem
Bấm để áp dụng bộ lọc, load lại dữ liệu

Validation:
Nếu ngày bắt đầu > ngày kết thúc → hiện thông báo lỗi
Nếu không có dữ liệu → hiện "Không có đơn hàng hoàn thành trong khoảng thời gian này"

2. BIỂU ĐỒ CỘT TOP SẢN PHẨM BÁN CHẠY
Thuộc tính
Giá trị
Loại biểu đồ
Biểu đồ cột (Column Chart)
Trục X (ngang)
Tên sản phẩm (rút gọn)
Trục Y (dọc)
Số lượng bán (hoặc doanh thu tùy theo tiêu chí xếp hạng)
Dữ liệu
Top sản phẩm theo số lượng đã chọn
Màu sắc cột
Màu xanh dương (#2196F3)
Tooltip
Hover vào cột → hiển thị: "Áo thun nam: 250 cái"


3. BẢNG TÓM TẮT
Hiển thị 3 chỉ số chính dưới dạng card:
Card
Nội dung
Công thức
Tổng sản phẩm bán
1.250 cái
Tổng số lượng sản phẩm bán được (theo BR16-2)
Tổng doanh thu
36.000.000 VNĐ
Tổng doanh thu từ các đơn hàng đã giao (theo BR16-3)
Sản phẩm bán chạy nhất
Áo thun nam - 250 cái
Sản phẩm có số lượng bán cao nhất


4. DANH SÁCH TOP SẢN PHẨM BÁN CHẠY
Các cột:
Cột
Mô tả
Định dạng
#
Thứ tự xếp hạng
Số thứ tự (1, 2, 3...)
Tên sản phẩm
Tên sản phẩm (gộp biến thể theo BR16-4)
Text, có thể bấm vào
Danh mục
Áo, Quần, Váy, Phụ kiện
Text
Số lượng bán
Tổng số lượng đã bán
Số, căn phải
Doanh thu
Tổng doanh thu
Số, căn phải, định dạng tiền tệ
Tỷ lệ
Phần trăm so với tổng doanh thu
Số, căn phải, có dấu %
Hành động
Nút [Xem chi tiết]
Bấm → chuyển sang UC-05 (chi tiết sản phẩm)

Tương tác:
Bấm vào Tên sản phẩm hoặc "Xem chi tiết" → chuyển sang trang chi tiết sản phẩm (UC-05)

CÁC NÚT CHỨC NĂNG
Nút "Xuất Excel" (góc phải trên cùng)
Bấm vào → xuất file Excel gồm:
Sheet
Nội dung
Sheet 1 - Tóm tắt
Tổng sản phẩm bán, Tổng doanh thu, Sản phẩm bán chạy nhất
Sheet 2 - Danh sách Top sản phẩm
Bảng danh sách (Tên, Danh mục, Số lượng, Doanh thu, Tỷ lệ)
Sheet 3 - Dữ liệu biểu đồ
Bảng dữ liệu cho biểu đồ cột


Nút "Xem" (trong bộ lọc)
Bấm → áp dụng khoảng thời gian và các tùy chọn đã chọn
Load lại biểu đồ + bảng tóm tắt + danh sách sản phẩm

Nút "Xem chi tiết" (trong bảng)
Bấm → chuyển sang màn hình chi tiết sản phẩm (UC-05)

