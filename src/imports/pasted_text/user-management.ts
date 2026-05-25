Thứ tự	Màn hình	Tên màn hình	Role	UC
1	MH18	"Quản lý người dùng (khách hàng) : 3 thao tác thêm tai khoản, xóa và sửa: các trường thông tin trừ mật khẩu- 3. Bảng khách hàng (khach_hang)
Tên cột
Kiểu dữ liệu
Mô tả
ma_khach_hang
int
PK, Auto Increment
ho_ten
nvarchar(100)
Họ và tên
email
varchar(100)
Email đăng nhập, unique
so_dien_thoai
varchar(15)
Số điện thoại
ngay_dang_ky
datetime
Ngày đăng ký
trang_thai
tinyint
1: Hoạt động, 0: Khóa

"	Quản lý	UC01
2	MH10	"Hỗ trợ & CSKH (xem câu hỏi, trả lời, ticket): 13. Bảng hỗ trợ (ho_tro)
Tên cột
Kiểu dữ liệu
Mô tả
ma_yeu_cau
int
PK
ma_khach_hang
int
FK → khach_hang(ma_khach_hang) - Người gửi yêu cầu
ma_don_hang
int
FK → don_hang(ma_don_hang) - Đơn hàng liên quan (có thể NULL)
ngay_gui_yeu_cau
datetime
Ngày gửi yêu cầu
noi_dung
text
Nội dung yêu cầu
ma_nhan_vien_xu_ly
int
FK → nhan_vien(ma_nhan_vien) - Nhân viên xử lý (có thể NULL nếu chưa xử lý)
ma_admin_xu_ly
int
FK → quan_tri(ma_admin) - Quản trị xử lý (có thể NULL)
trang_thai
tinyint
1: Đã xử lý, 0: Chưa xử lý

"	Nhân viên, quản lý	UC02
3	MH10	Hỗ trợ chăm sóc khách hàng	KKhách hàng	UC02
3	MH11	"Quản lý khuyến mãi (thêm, sửa, xóa): 3 thao tác thêm xóa sửa với các trường thông tin : 10. Bảng khuyến mãi (khuyen_mai)
Tên cột
Kiểu dữ liệu
Mô tả
ma_khuyen_mai
int
PK, Auto Increment
ten_chuong_trinh
nvarchar(200)
Tên chương trình
ma_giam_gia
varchar(50)
Mã giảm giá (VD: SALE20), UNIQUE
mo_ta
nvarchar(500)
Mô tả
ngay_bat_dau
datetime
Ngày bắt đầu
ngay_ket_thuc
datetime
Ngày kết thúc
trang_thai
tinyint
1: Đang áp dụng, 0: Ngừng
Tên cột
Kiểu dữ liệu
Mô tả
ma_khuyen_mai
int
PK, Auto Increment
ten_chuong_trinh
nvarchar(200)
Tên chương trình
ma_giam_gia
varchar(50)
Mã giảm giá (VD: SALE20), UNIQUE


11. Bảng chi tiết khuyến mãi (chi_tiet_khuyen_mai)

Tên cột
Kiểu dữ liệu
Mô tả
ma_chi_tiet_km
int
PK, Auto Increment
ma_khuyen_mai
int
FK → khuyen_mai(ma_khuyen_mai)
ma_san_pham
int
FK → san_pham(ma_san_pham) - Có thể NULL nếu áp dụng toàn bộ
loai_giam
tinyint
1: Giảm %, 2: Giảm tiền mặt
gia_tri_giam
decimal(18,0)
Giá trị giảm (20% hoặc 50,000đ)
don_toi_thieu
decimal(18,0)
Đơn hàng tối thiểu để áp dụng (0 nếu không yêu cầu)
so_lan_dung_toi_da
int
Số lượt sử dụng tối đa (0 nếu không giới hạn)
da_dung
int
Số lượt đã sử dụng
"	Nhân viên	UC03
4	MH20	"Quản lý khuyến mãi (thêm, sửa, xóa): 3 thao tác thêm xóa sửa với các trường thông tin : 10. Bảng khuyến mãi (khuyen_mai)
Tên cột
Kiểu dữ liệu
Mô tả
ma_khuyen_mai
int
PK, Auto Increment
ten_chuong_trinh
nvarchar(200)
Tên chương trình
ma_giam_gia
varchar(50)
Mã giảm giá (VD: SALE20), UNIQUE
mo_ta
nvarchar(500)
Mô tả
ngay_bat_dau
datetime
Ngày bắt đầu
ngay_ket_thuc
datetime
Ngày kết thúc
trang_thai
tinyint
1: Đang áp dụng, 0: Ngừng
Tên cột
Kiểu dữ liệu
Mô tả
ma_khuyen_mai
int
PK, Auto Increment
ten_chuong_trinh
nvarchar(200)
Tên chương trình
ma_giam_gia
varchar(50)
Mã giảm giá (VD: SALE20), UNIQUE


11. Bảng chi tiết khuyến mãi (chi_tiet_khuyen_mai)

Tên cột
Kiểu dữ liệu
Mô tả
ma_chi_tiet_km
int
PK, Auto Increment
ma_khuyen_mai
int
FK → khuyen_mai(ma_khuyen_mai)
ma_san_pham
int
FK → san_pham(ma_san_pham) - Có thể NULL nếu áp dụng toàn bộ
loai_giam
tinyint
1: Giảm %, 2: Giảm tiền mặt
gia_tri_giam
decimal(18,0)
Giá trị giảm (20% hoặc 50,000đ)
don_toi_thieu
decimal(18,0)
Đơn hàng tối thiểu để áp dụng (0 nếu không yêu cầu)
so_lan_dung_toi_da
int
Số lượt sử dụng tối đa (0 nếu không giới hạn)
da_dung
int
Số lượt đã sử dụng
"	Quản lý	UC03
5	MH01	Đăng nhập / Đăng ký	Khách hàng, Nhân viên, Quản lý	UC04
6	MH02	Trang chủ	Khách hàng	UC05
7	MH03	Danh sách sản phẩm + tìm kiếm, lọc	Khách hàng, guest vãng lai chưa có tài khoản 	UC05
8	MH04	"Chi tiết sản phẩm: hiển thị những thông tin sau: . Bảng sản phẩm (san_pham)
Tên cột
Kiểu dữ liệu
Mô tả
ma_san_pham
int
PK, Auto Increment
ten_san_pham
nvarchar(200)
Tên sản phẩm
mo_ta
text
Mô tả sản phẩm
gioi_tinh
tinyint
1: Nam, 2: Nữ, 3: Unisex
danh_muc
nvarchar(100)
Áo, Quần, Váy, Phụ kiện
trang_thai
tinyint
1: Còn kinh doanh, 0: Ngừng kinh doanh


2. Bảng biến thể sản phẩm (bien_the_san_pham)
Tên cột
Kiểu dữ liệu
Mô tả
ma_bien_the
int
PK, Auto Increment
ma_san_pham
int
FK → san_pham(ma_san_pham)
mau_sac
nvarchar(50)
Màu sắc
kich_co
nvarchar(10)
S, M, L, XL, XXL
gia_ban
decimal(18,0)
Giá bán hiện tại
so_luong_ton
int
Tồn kho
sku
varchar(50)
Mã vạch, unique
hinh_anh
varchar(255)
URL ảnh biến thể
Bảng đánh giá sản phẩm (danh_gia_san_pham)
Tên cột
Kiểu dữ liệu
Mô tả
ma_danh_gia
int
PK, Auto Increment
ma_khach_hang
int
FK → khach_hang
ma_bien_the
int
FK → bien_the_san_pham(ma_bien_the)
ma_don_hang
int
FK → don_hang(ma_don_hang)
so_sao
int
1-5
binh_luan
text
Nội dung đánh giá
hinh_anh
varchar(255)
Ảnh kèm
ngay_danh_gia
datetime
Ngày đánh giá
trang_thai
tinyint
1: Hiển thị, 0: Ẩn (admin duyệt)

"	Khách hàng	UC05
9	MH12	"Quản lý sản phẩm (thêm, sửa, xóa, phân loại, tồn kho): Các thao tác thêm sửa xóa: các trg thông tin 1. Bảng sản phẩm (san_pham)
Tên cột
Kiểu dữ liệu
Mô tả
ma_san_pham
int
PK, Auto Increment
ten_san_pham
nvarchar(200)
Tên sản phẩm
mo_ta
text
Mô tả sản phẩm
gioi_tinh
tinyint
1: Nam, 2: Nữ, 3: Unisex
danh_muc
nvarchar(100)
Áo, Quần, Váy, Phụ kiện
trang_thai
tinyint
1: Còn kinh doanh, 0: Ngừng kinh doanh


2. Bảng biến thể sản phẩm (bien_the_san_pham)
Tên cột
Kiểu dữ liệu
Mô tả
ma_bien_the
int
PK, Auto Increment
ma_san_pham
int
FK → san_pham(ma_san_pham)
mau_sac
nvarchar(50)
Màu sắc
kich_co
nvarchar(10)
S, M, L, XL, XXL
gia_ban
decimal(18,0)
Giá bán hiện tại
so_luong_ton
int
Tồn kho
sku
varchar(50)
Mã vạch, unique
hinh_anh
varchar(255)
URL ảnh biến thể


"	Nhân viên	UC05
11	MH16	"Quản lý sản phẩm (thêm, sửa, xóa, phân loại, tồn kho): Các thao tác thêm sửa xóa: các trg thông tin 1. Bảng sản phẩm (san_pham)
Tên cột
Kiểu dữ liệu
Mô tả
ma_san_pham
int
PK, Auto Increment
ten_san_pham
nvarchar(200)
Tên sản phẩm
mo_ta
text
Mô tả sản phẩm
gioi_tinh
tinyint
1: Nam, 2: Nữ, 3: Unisex
danh_muc
nvarchar(100)
Áo, Quần, Váy, Phụ kiện
trang_thai
tinyint
1: Còn kinh doanh, 0: Ngừng kinh doanh


2. Bảng biến thể sản phẩm (bien_the_san_pham)
Tên cột
Kiểu dữ liệu
Mô tả
ma_bien_the
int
PK, Auto Increment
ma_san_pham
int
FK → san_pham(ma_san_pham)
mau_sac
nvarchar(50)
Màu sắc
kich_co
nvarchar(10)
S, M, L, XL, XXL
gia_ban
decimal(18,0)
Giá bán hiện tại
so_luong_ton
int
Tồn kho
sku
varchar(50)
Mã vạch, unique
hinh_anh
varchar(255)
URL ảnh biến thể


"	Quản lý	UC05
13	MH09	"Quản lý đơn hàng (xem tất cả, xóa, xuất hóa đơn)khi ấn vào các nút này các trường thông tin tương ứng hiện ra: 8. Bảng đơn hàng (don_hang)
Tên cột
Kiểu dữ liệu
Mô tả
ma_don_hang
int
PK
ma_khach_hang
int
FK 
ngay_dat
datetime
Ngày đặt hàng
thanh_tien
decimal(18,0)
Thành tiền (tổng + phí ship - giảm giá)


9. Bảng chi tiết đơn hàng (chi_tiet_don_hang)
Tên cột
Kiểu dữ liệu
Mô tả
ma_chi_tiet_dh
int
PK, Auto Increment
ma_don_hang
int
FK → don_hang(ma_don_hang)
ma_bien_the
int
FK → bien_the_san_pham(ma_bien_the)
ma_khuyen_mai
int
FK → khuyen_mai(ma_khuyen_mai) - Mã KM đã áp dụng (có thể NULL)
so_luong
int
Số lượng mua
gia_goc
decimal(18,0)
Giá tại thời điểm mua



phuong_thuc_thanh_toan
tinyint
1: COD, 2: Chuyển khoản
trang_thai_thanh_toan
tinyint
1: Chưa TT, 2: Đã TT
trang_thai_don_hang
tinyint
1: Chờ XN, 2: Đã XN, 3: Đang giao, 4: Đã giao, 5: Đã hủy
dia_chi_nhan
text
Địa chỉ nhận hàng
ghi_chu
text
Ghi chú


phi_van_chuyen
decimal(18,0)
Phí ship
giam_gia
decimal(18,0)
Tiền giảm giá

;  Bảng hóa đơn (hoa_don) 
Tên cột
Kiểu dữ liệu
Mô tả
ma_hoa_don
int
PK
ma_don_hang
int
FK 
so_hoa_don
varchar(50)
Số hóa đơn, unique
ngay_xuat
datetime
Ngày xuất hóa đơn
tong_tien
decimal(18,0)
Tổng tiền (lấy từ đơn hàng)

"	Nhân viên	UC06
14	MH17	"Quản lý đơn hàng (xem tất cả, xóa, xuất hóa đơn)khi ấn vào các nút này các trường thông tin tương ứng hiện ra: 8. Bảng đơn hàng (don_hang)
Tên cột
Kiểu dữ liệu
Mô tả
ma_don_hang
int
PK
ma_khach_hang
int
FK 
ngay_dat
datetime
Ngày đặt hàng
thanh_tien
decimal(18,0)
Thành tiền (tổng + phí ship - giảm giá)


9. Bảng chi tiết đơn hàng (chi_tiet_don_hang)
Tên cột
Kiểu dữ liệu
Mô tả
ma_chi_tiet_dh
int
PK, Auto Increment
ma_don_hang
int
FK → don_hang(ma_don_hang)
ma_bien_the
int
FK → bien_the_san_pham(ma_bien_the)
ma_khuyen_mai
int
FK → khuyen_mai(ma_khuyen_mai) - Mã KM đã áp dụng (có thể NULL)
so_luong
int
Số lượng mua
gia_goc
decimal(18,0)
Giá tại thời điểm mua



phuong_thuc_thanh_toan
tinyint
1: COD, 2: Chuyển khoản
trang_thai_thanh_toan
tinyint
1: Chưa TT, 2: Đã TT
trang_thai_don_hang
tinyint
1: Chờ XN, 2: Đã XN, 3: Đang giao, 4: Đã giao, 5: Đã hủy
dia_chi_nhan
text
Địa chỉ nhận hàng
ghi_chu
text
Ghi chú


phi_van_chuyen
decimal(18,0)
Phí ship
giam_gia
decimal(18,0)
Tiền giảm giá

;  Bảng hóa đơn (hoa_don) 
Tên cột
Kiểu dữ liệu
Mô tả
ma_hoa_don
int
PK
ma_don_hang
int
FK 
so_hoa_don
varchar(50)
Số hóa đơn, unique
ngay_xuat
datetime
Ngày xuất hóa đơn
tong_tien
decimal(18,0)
Tổng tiền (lấy từ đơn hàng)

"	Quản lý	UC06
15	MH07	"Quản lý thông tin cá nhân (hồ sơ, đổi mật khẩu - nhập email, gửi mã về email, lịch sử đơn hàng - ấn vào xem chi tiết sẽ có chi tiết các trường thông tin sau: 8. Bảng đơn hàng (don_hang)
Tên cột
Kiểu dữ liệu
Mô tả
ma_don_hang
int
PK
ma_khach_hang
int
FK 
ngay_dat
datetime
Ngày đặt hàng
thanh_tien
decimal(18,0)
Thành tiền (tổng + phí ship - giảm giá)


9. Bảng chi tiết đơn hàng (chi_tiet_don_hang)
Tên cột
Kiểu dữ liệu
Mô tả
ma_chi_tiet_dh
int
PK, Auto Increment
ma_don_hang
int
FK → don_hang(ma_don_hang)
ma_bien_the
int
FK → bien_the_san_pham(ma_bien_the)
ma_khuyen_mai
int
FK → khuyen_mai(ma_khuyen_mai) - Mã KM đã áp dụng (có thể NULL)
so_luong
int
Số lượng mua
gia_goc
decimal(18,0)
Giá tại thời điểm mua



phuong_thuc_thanh_toan
tinyint
1: COD, 2: Chuyển khoản
trang_thai_thanh_toan
tinyint
1: Chưa TT, 2: Đã TT
trang_thai_don_hang
tinyint
1: Chờ XN, 2: Đã XN, 3: Đang giao, 4: Đã giao, 5: Đã hủy
dia_chi_nhan
text
Địa chỉ nhận hàng
ghi_chu
text
Ghi chú


phi_van_chuyen
decimal(18,0)
Phí ship
giam_gia
decimal(18,0)
Tiền giảm giá

)"	Khách hàng	UC07
16	MH13	"Quản lý thông tin cá nhân (nhân viên, quản lý): 3 thao tác thêm/ sửa/ xóa với các trường thông tin sau, quản lý được sửa tất cả thông tin bao gồm chính mình, nhan viên được sửa chính mình 4. Bảng nhân viên (nhan_vien)
Tên cột
Kiểu dữ liệu
Mô tả
ma_nhan_vien
int
PK, Auto Increment
ho_ten
nvarchar(100)
Họ và tên
email
varchar(100)
Email, unique
mat_khau
varchar(255)
Mật khẩu 
so_dien_thoai
varchar(15)
Số điện thoại
dia_chi
varchar(200)
Địa chỉ nhà
ngay_vao_lam
date
Ngày vào làm
trang_thai
tinyint
1: Đang làm, 0: Đã nghỉ


5. Bảng quản trị (quan_tri)
Tên cột
Kiểu dữ liệu
Mô tả
ma_admin
int
PK
ho_ten
nvarchar(100)
Họ và tên
email
varchar(100)
Email, unique
mat_khau
varchar(255)
Mật khẩu 
ngay_tao
datetime
Ngày tạo

"	Nhân viên, Quản lý	UC07
18	MH05	"Giỏ hàng: kèm vớ sản phẩm thông tin về biến thể sản phẩm: 6. Bảng giỏ hàng (gio_hang)
Tên cột
Kiểu dữ liệu
Mô tả
ma_gio_hang
int
PK
ma_khach_hang
int
FK 


7. Bảng chi tiết giỏ hàng (chi_tiet_gio_hang)
Tên cột
Kiểu dữ liệu
Mô tả
ma_chi_tiet
int
PK
ma_gio_hang
int
FK 
ma_bien_the
int
FK 
so_luong
int
Số lượng

"	Khách hàng	UC08
19	MH06	Thanh toán / Đặt hàng - yêu cầu nhập các trường tt cần thiết : thông tin giao hàng: Họ và tên, Số điện thoại, Email, Địa chỉ giao hàng, ghi chú (nếu có), phương thức thanh toán: Cod hoặc chuyển khoản ngân hàng	Khách hàng	UC08
20	MH14	Quản lý giỏ hàng (tạo đơn hộ khách)	Nhân viên	UC08
21	MH19	"Quản lý nhân viên 4 thao tác: (thêm, sửa, xóa), phân quyền: 4. Bảng nhân viên (nhan_vien)
Tên cột
Kiểu dữ liệu
Mô tả
ma_nhan_vien
int
PK, Auto Increment
ho_ten
nvarchar(100)
Họ và tên
email
varchar(100)
Email, unique
mat_khau
varchar(255)
Mật khẩu 
so_dien_thoai
varchar(15)
Số điện thoại
dia_chi
varchar(200)
Địa chỉ nhà
ngay_vao_lam
date
Ngày vào làm
trang_thai
tinyint
1: Đang làm, 0: Đã nghỉ


5. Bảng quản trị (quan_tri)
Tên cột
Kiểu dữ liệu
Mô tả
ma_admin
int
PK
ho_ten
nvarchar(100)
Họ và tên
email
varchar(100)
Email, unique
mat_khau
varchar(255)
Mật khẩu 
ngay_tao
datetime
Ngày tạo

"	Quản lý	UC09
22	MH15	Dashboard quản lý (thống kê) tính theo doanh thu ngày tháng quý năm, thống kê đơn hàng(ấn vào hiển thị toàn bộ đơn hàng khách đã hoàn thành), khách hàng truy cập 	Quản lý	UC10
22	MH16	Trang tìm kiếm sản phẩm (hiển thị lịch sử tìm kiếm nếu có)	Quản lý, nhân viên, khách hàng	