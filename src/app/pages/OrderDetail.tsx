import { useParams, Link } from 'react-router';
import { ChevronLeft, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { orderService } from '../../api/services/order.service';
import { productService } from '../../api/services/product.service';
import { useAuthStore } from '../../store/useAuthStore';

export default function OrderDetail() {
  const { id } = useParams();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    productId: '',
    rating: 5,
    comment: '',
  });

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [variantsMap, setVariantsMap] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [orderData, productsData] = await Promise.all([
          orderService.findOne(id as string),
          productService.getAll()
        ]);
        
        setOrder(orderData);

        const map: Record<string, any> = {};
        if (productsData) {
          productsData.forEach((p: any) => {
            if (p.bien_the) {
              p.bien_the.forEach((v: any) => {
                map[v._id] = {
                  name: p.ten_san_pham,
                  color: v.mau_sac,
                  size: v.kich_co,
                  image: v.hinh_anh
                };
              });
            }
          });
        }
        setVariantsMap(map);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const getStatusText = (status: number) => {
    switch (status) {
      case 1: return 'Chờ xác nhận';
      case 2: return 'Đã xác nhận';
      case 3: return 'Đang giao';
      case 4: return 'Đã giao';
      case 5: return 'Đã hủy';
      default: return 'Không xác định';
    }
  };

  const getStatusIcon = (status: number) => {
    switch (status) {
      case 1: return <Package className="w-5 h-5 text-yellow-600" />;
      case 2: return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 3: return <Truck className="w-5 h-5 text-blue-600" />;
      case 4: return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 5: return <XCircle className="w-5 h-5 text-red-600" />;
      default: return null;
    }
  };

  const handleSubmitReview = () => {
    console.log('Submit review:', reviewData);
    setShowReviewModal(false);
    alert('Cảm ơn bạn đã đánh giá sản phẩm!');
  };

  if (loading) {
    return <div className="py-8 text-center"><p>Đang tải...</p></div>;
  }

  if (!order) {
    return <div className="py-8 text-center"><p>Không tìm thấy đơn hàng...</p></div>;
  }

  const subtotal = order?.chi_tiet_don_hang?.reduce((sum: number, item: any) => sum + item.gia_goc * item.so_luong, 0) || 0;
  const user = useAuthStore.getState().user;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link to="/profile" className="inline-flex items-center gap-2 mb-6 hover:underline">
        <ChevronLeft className="w-5 h-5" />
        Quay lại lịch sử đơn hàng
      </Link>

      <h1 className="text-3xl mb-8">Chi Tiết Đơn Hàng #{order._id.slice(-6).toUpperCase()}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              {getStatusIcon(order.trang_thai_don_hang)}
              <div>
                <h2 className="text-xl">Trạng Thái Đơn Hàng</h2>
                <p className="text-gray-600">{getStatusText(order.trang_thai_don_hang)}</p>
              </div>
            </div>
            
            {/* Status Timeline */}
            <div className="flex items-center justify-between mt-6">
              <div className={`flex flex-col items-center ${order.trang_thai_don_hang >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
                <Package className="w-6 h-6 mb-2" />
                <span className="text-xs text-center">Chờ xác nhận</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${order.trang_thai_don_hang >= 2 ? 'bg-green-600' : 'bg-gray-300'}`} />
              <div className={`flex flex-col items-center ${order.trang_thai_don_hang >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
                <CheckCircle className="w-6 h-6 mb-2" />
                <span className="text-xs text-center">Đã xác nhận</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${order.trang_thai_don_hang >= 3 ? 'bg-green-600' : 'bg-gray-300'}`} />
              <div className={`flex flex-col items-center ${order.trang_thai_don_hang >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
                <Truck className="w-6 h-6 mb-2" />
                <span className="text-xs text-center">Đang giao</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${order.trang_thai_don_hang >= 4 ? 'bg-green-600' : 'bg-gray-300'}`} />
              <div className={`flex flex-col items-center ${order.trang_thai_don_hang >= 4 ? 'text-green-600' : 'text-gray-400'}`}>
                <CheckCircle className="w-6 h-6 mb-2" />
                <span className="text-xs text-center">Đã giao</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <h2 className="text-xl mb-4">Sản Phẩm</h2>
            <div className="space-y-4">
              {(order.chi_tiet_don_hang || []).map((item: any) => {
                const variantInfo = variantsMap[item.ma_sp_chi_tiet] || {};
                const name = variantInfo.name || item.ma_sp_chi_tiet;
                const image = variantInfo.image || 'https://images.unsplash.com/photo-1767439567342-15fcbae8fdf8?w=400';
                
                return (
                  <div key={item.ma_sp_chi_tiet} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                    <img
                      src={image}
                      alt={name}
                      className="w-20 h-20 object-cover border border-gray-200"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Màu: {variantInfo.color || ''} | Size: {variantInfo.size || ''}
                      </p>
                      <p className="text-sm">Số lượng: {item.so_luong}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{(item.gia_goc * item.so_luong).toLocaleString()}đ</p>
                      {order.trang_thai_don_hang === 4 && (
                        <button
                          onClick={() => {
                            setReviewData({ ...reviewData, productId: item.ma_sp_chi_tiet });
                            setShowReviewModal(true);
                          }}
                          className="mt-2 text-sm text-blue-600 hover:underline"
                        >
                          Đánh giá
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Delivery Info */}
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <h2 className="text-xl mb-4">Thông Tin Giao Hàng</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Người nhận</p>
                <p className="font-medium">{user?.ho_ten}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Số điện thoại</p>
                <p className="font-medium">{user?.so_dien_thoai}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Địa chỉ</p>
                <p className="font-medium">{order.dia_chi_nhan}</p>
              </div>
              {order.ghi_chu && (
                <div>
                  <p className="text-gray-600 mb-1">Ghi chú</p>
                  <p className="font-medium">{order.ghi_chu}</p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <h2 className="text-xl mb-4">Thanh Toán</h2>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Thành tiền</span>
                <span>{subtotal.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển</span>
                <span>{(order.phi_van_chuyen || 0).toLocaleString()}đ</span>
              </div>
              {(order.giam_gia || 0) > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Giá giảm</span>
                  <span>-{(order.giam_gia || 0).toLocaleString()}đ</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-medium text-base">
                  <span>Tổng tiền</span>
                  <span>{(order.thanh_tien || 0).toLocaleString()}đ</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Phương thức thanh toán</p>
              <p className="font-medium">{order.phuong_thuc_thanh_toan === 1 ? 'COD' : 'Chuyển khoản'}</p>
              <p className={`text-sm mt-2 ${order.trang_thai_thanh_toan === 2 ? 'text-green-600' : 'text-yellow-600'}`}>
                {order.trang_thai_thanh_toan === 2 ? 'Đã thanh toán' : 'Chưa thanh toán'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl mb-4">Đánh Giá Sản Phẩm</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Số sao</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                      className={`text-2xl ${star <= reviewData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">Nhận xét của bạn</label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 min-h-[100px]"
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSubmitReview}
                  className="flex-1 bg-black text-white py-2 hover:bg-gray-800"
                >
                  Gửi đánh giá
                </button>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 border border-gray-300 py-2 hover:bg-gray-100"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
