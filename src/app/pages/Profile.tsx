import { useState, useEffect } from 'react';
import { Package, User, Key, LogOut, Eye, HelpCircle, Search, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '../../store/useAuthStore';
import { orderService } from '../../api/services/order.service';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [orderSearch, setOrderSearch] = useState('');
  
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const navigate = useNavigate();
  const { user, clearAuth, isAuthenticated } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (activeTab === 'orders' && isAuthenticated()) {
        try {
          setOrdersLoading(true);
          const data = await orderService.getMyOrders();
          setOrders(data || []);
        } catch (err) {
          console.error(err);
        } finally {
          setOrdersLoading(false);
        }
      }
    };
    fetchOrders();
  }, [activeTab, isAuthenticated]);

  const getOrderStatusText = (status: number) => {
    switch (status) {
      case 1: return 'Chờ xác nhận';
      case 2: return 'Đã xác nhận';
      case 3: return 'Đang giao';
      case 4: return 'Đã giao';
      case 5: return 'Đã hủy';
      default: return 'Không xác định';
    }
  };

  const filteredOrders = orders.filter((order) => {
    const shortCode = order._id.slice(-6).toUpperCase();
    const statusText = getOrderStatusText(order.trang_thai_don_hang);
    return shortCode.includes(orderSearch.toUpperCase()) || 
           statusText.toLowerCase().includes(orderSearch.toLowerCase());
  });

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) return;
    try {
      await orderService.updateStatus(orderId, 5);
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, trang_thai_don_hang: 5 } : o));
      alert('Đã hủy đơn hàng thành công');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Không thể hủy đơn hàng');
    }
  };

  return (
    <div className="py-8 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl mb-8">Tài Khoản Của Tôi</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1 bg-white p-4 border border-gray-200 h-fit">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  activeTab === 'profile' ? 'bg-black text-white' : 'hover:bg-gray-100'
                }`}
              >
                <User className="w-5 h-5" />
                Thông tin cá nhân
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  activeTab === 'orders' ? 'bg-black text-white' : 'hover:bg-gray-100'
                }`}
              >
                <Package className="w-5 h-5" />
                Đơn hàng của tôi
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  activeTab === 'password' ? 'bg-black text-white' : 'hover:bg-gray-100'
                }`}
              >
                <Key className="w-5 h-5" />
                Đổi mật khẩu
              </button>
              <Link
                to="/support"
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                Hỗ trợ
              </Link>
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="w-5 h-5" />
                Đăng xuất
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3 bg-white p-6 border border-gray-200">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl mb-6">Thông Tin Cá Nhân</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Họ và tên</label>
                    <input
                      type="text"
                      defaultValue={user?.ho_ten || ''}
                      className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email || ''}
                      className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      defaultValue={user?.so_dien_thoai || ''}
                      className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
                  >
                    LƯU THAY ĐỔI
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl mb-6">Đơn Hàng Của Tôi</h2>

                {/* Order Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo mã đơn hoặc trạng thái..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="space-y-4">
                  {ordersLoading ? (
                    <p className="text-center py-4">Đang tải...</p>
                  ) : filteredOrders.length === 0 ? (
                    <p className="text-center py-4">Chưa có đơn hàng nào</p>
                  ) : (
                    filteredOrders.map((order) => {
                      const shortCode = order._id.slice(-6).toUpperCase();
                      const statusText = getOrderStatusText(order.trang_thai_don_hang);
                      const badgeColor = order.trang_thai_don_hang === 4
                        ? 'bg-green-100 text-green-800'
                        : order.trang_thai_don_hang === 5
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800';

                      return (
                        <div key={order._id} className="border border-gray-200 p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="mb-1"><strong>Mã đơn hàng:</strong> {shortCode}</p>
                              <p className="text-sm text-gray-600">Ngày đặt: {new Date(order.ngay_dat).toLocaleDateString('vi-VN')}</p>
                            </div>
                            <span className={`px-3 py-1 text-xs ${badgeColor}`}>
                              {statusText}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                            <div>
                              <p><strong>Tổng: {(order.thanh_tien || 0).toLocaleString()}đ</strong></p>
                            </div>
                            <div className="flex gap-2">
                              <Link
                                to={`/orders/${order._id}`}
                                className="flex items-center gap-2 px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                                Xem chi tiết
                              </Link>
                              <button
                                onClick={() => handleCancelOrder(order._id)}
                                disabled={order.trang_thai_don_hang !== 1}
                                className={`flex items-center gap-2 px-4 py-2 border-2 transition-colors ${
                                  order.trang_thai_don_hang === 1
                                    ? 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                                    : 'border-gray-300 text-gray-400 cursor-not-allowed'
                                }`}
                              >
                                <X className="w-4 h-4" />
                                Hủy đơn
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {activeTab === 'password' && (
              <div>
                <h2 className="text-2xl mb-6">Đổi Mật Khẩu</h2>
                <form className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors"
                  >
                    GỬI MÃ XÁC NHẬN
                  </button>
                  <p className="text-sm text-gray-600">
                    Chúng tôi sẽ gửi mã xác nhận đến email của bạn để đổi mật khẩu.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
