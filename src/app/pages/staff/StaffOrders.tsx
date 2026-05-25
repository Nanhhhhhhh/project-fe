import { useEffect, useState } from 'react';
import { Search, Eye, X, RefreshCw } from 'lucide-react';
import { orderService } from '../../../api/services/order.service';
import { customerService } from '../../../api/services/customer.service';
import { productService } from '../../../api/services/product.service';

interface BackendOrder {
  _id: string;
  ma_khach_hang: string;
  phuong_thuc_thanh_toan: number;
  trang_thai_thanh_toan: number;
  trang_thai_don_hang: number;
  dia_chi_nhan: string;
  ghi_chu: string;
  phi_van_chuyen: number;
  giam_gia: number;
  tong_tien_hang: number;
  thanh_tien: number;
  chi_tiet_don_hang: Array<{
    ma_sp_chi_tiet: string;
    so_luong: number;
    gia_goc: number;
    giam_gia: number;
    thanh_tien: number;
  }>;
  ngay_dat: string;
}

const orderStatuses = [
  { value: 1, label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-800' },
  { value: 2, label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-800' },
  { value: 3, label: 'Đang giao', color: 'bg-purple-100 text-purple-800' },
  { value: 4, label: 'Đã giao', color: 'bg-green-100 text-green-800' },
  { value: 5, label: 'Đã hủy', color: 'bg-red-100 text-red-800' },
];

export default function StaffOrders() {
  const [orders, setOrders] = useState<BackendOrder[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<BackendOrder | null>(null);

  useEffect(() => {
    Promise.all([
      orderService.findAll({ limit: 100 }),
      customerService.getAll(),
      productService.getAll()
    ]).then(([ordersRes, customersRes, productsRes]) => {
      setOrders(ordersRes.data || []);
      setCustomers(customersRes);
      setProducts(productsRes);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const customersMap: Record<string, any> = {};
  customers.forEach(c => { customersMap[c._id] = c; });

  const variantsMap: Record<string, { name: string; color: string; size: string; price: number; stock: number }> = {};
  products.forEach(p => {
    p.bien_the?.forEach((v: any) => {
      variantsMap[v._id] = { name: p.ten_san_pham, color: v.mau_sac, size: v.kich_co, price: v.gia_ban, stock: v.so_luong_ton };
    });
  });

  const handleViewDetail = (order: BackendOrder) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleUpdateStatus = (order: BackendOrder) => {
    setSelectedOrder(order);
    setShowStatusModal(true);
  };

  const handleSaveStatus = async (newStatus: number) => {
    if (!selectedOrder) return;
    try {
      await orderService.updateStatus(selectedOrder._id, newStatus);
      setOrders(prev => prev.map(o => o._id === selectedOrder._id ? { ...o, trang_thai_don_hang: newStatus } : o));
      setShowStatusModal(false);
      alert('Đã cập nhật trạng thái đơn hàng thành công!');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Cập nhật trạng thái thất bại');
    }
  };

  const filteredOrders = orders.filter((o) => {
    const codeMatch = o._id.slice(-6).toLowerCase().includes(search.toLowerCase());
    const customerName = (customersMap[o.ma_khach_hang]?.ho_ten || o.ma_khach_hang).toLowerCase();
    const nameMatch = customerName.includes(search.toLowerCase());
    const statusMatch = statusFilter ? o.trang_thai_don_hang.toString() === statusFilter : true;
    
    return (codeMatch || nameMatch) && statusMatch;
  });

  const getStatusLabel = (status: number) => {
    return orderStatuses.find((s) => s.value === status) || orderStatuses[0];
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl">Quản Lý Đơn Hàng</h2>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 border border-gray-200 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã đơn hoặc khách hàng..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <select 
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            {orderStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4">Mã đơn hàng</th>
                  <th className="text-left py-3 px-4">Khách hàng</th>
                  <th className="text-left py-3 px-4">Ngày đặt</th>
                  <th className="text-left py-3 px-4">Tổng tiền</th>
                  <th className="text-left py-3 px-4">Thanh toán</th>
                  <th className="text-left py-3 px-4">Trạng thái</th>
                  <th className="text-left py-3 px-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const status = getStatusLabel(order.trang_thai_don_hang);
                  return (
                    <tr key={order._id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{order._id.slice(-6).toUpperCase()}</td>
                      <td className="py-3 px-4">{customersMap[order.ma_khach_hang]?.ho_ten || order.ma_khach_hang}</td>
                      <td className="py-3 px-4">{new Date(order.ngay_dat).toLocaleDateString('vi-VN')}</td>
                      <td className="py-3 px-4">{order.thanh_tien.toLocaleString()}đ</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            order.trang_thai_thanh_toan === 2
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.trang_thai_thanh_toan === 2 ? 'Đã TT' : 'Chưa TT'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs rounded ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDetail(order)}
                            className="p-1 hover:bg-gray-200 rounded"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(order)}
                            className="p-1 hover:bg-blue-100 text-blue-600 rounded"
                            title="Cập nhật trạng thái"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-500">Không tìm thấy đơn hàng nào</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Update Status Modal */}
      {showStatusModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl">Cập Nhật Trạng Thái</h3>
              <button onClick={() => setShowStatusModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Đơn hàng: #{selectedOrder._id.slice(-6).toUpperCase()}</p>
              <p className="text-sm text-gray-600 mb-4">
                Trạng thái hiện tại: <span className="font-medium">{getStatusLabel(selectedOrder.trang_thai_don_hang).label}</span>
              </p>
            </div>

            <div className="space-y-2 mb-6">
              {orderStatuses.map((status) => (
                <button
                  key={status.value}
                  onClick={() => handleSaveStatus(status.value)}
                  className={`w-full text-left p-3 border-2 rounded-lg transition-colors ${
                    selectedOrder.trang_thai_don_hang === status.value
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <span className={`px-2 py-1 text-xs rounded ${status.color}`}>
                    {status.label}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowStatusModal(false)}
              className="w-full border border-gray-300 py-2 hover:bg-gray-100"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl">Chi Tiết Đơn Hàng #{selectedOrder._id.slice(-6).toUpperCase()}</h3>
              <button onClick={() => setShowDetailModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
                <div>
                  <p className="text-sm text-gray-600">Khách hàng</p>
                  <p>{customersMap[selectedOrder.ma_khach_hang]?.ho_ten || selectedOrder.ma_khach_hang}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày đặt</p>
                  <p>{new Date(selectedOrder.ngay_dat).toLocaleDateString('vi-VN')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phương thức thanh toán</p>
                  <p>{selectedOrder.phuong_thuc_thanh_toan === 1 ? 'COD' : 'Chuyển khoản'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trạng thái thanh toán</p>
                  <p>{selectedOrder.trang_thai_thanh_toan === 2 ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                </div>
              </div>

              <div>
                <h4 className="mb-2">Sản phẩm</h4>
                <div className="border border-gray-200 rounded">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-2 px-4">Tên sản phẩm</th>
                        <th className="text-left py-2 px-4">SL</th>
                        <th className="text-left py-2 px-4">Giá</th>
                        <th className="text-left py-2 px-4">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.chi_tiet_don_hang?.map((item, idx) => {
                        const variant = variantsMap[item.ma_sp_chi_tiet];
                        const name = variant ? `${variant.name} (${variant.size}/${variant.color})` : item.ma_sp_chi_tiet;
                        return (
                          <tr key={idx} className="border-t">
                            <td className="py-2 px-4">{name}</td>
                            <td className="py-2 px-4">{item.so_luong}</td>
                            <td className="py-2 px-4">{item.gia_goc.toLocaleString()}đ</td>
                            <td className="py-2 px-4">{item.thanh_tien.toLocaleString()}đ</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span>{selectedOrder.tong_tien_hang.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span>{selectedOrder.phi_van_chuyen.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giá giảm:</span>
                    <span className="text-red-600">-{selectedOrder.giam_gia.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between text-lg pt-2 border-t">
                    <strong>Tổng cộng:</strong>
                    <strong>{selectedOrder.thanh_tien.toLocaleString()}đ</strong>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Địa chỉ giao hàng</p>
                <p>{selectedOrder.dia_chi_nhan}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Ghi chú</p>
                <p className="text-gray-600 italic">{selectedOrder.ghi_chu || 'Không có ghi chú'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
