import { useEffect, useState } from 'react';
import { Search, Eye, X, FileText, Plus, RefreshCw } from 'lucide-react';
import { orderService } from '../../../api/services/order.service';
import { customerService } from '../../../api/services/customer.service';
import { productService } from '../../../api/services/product.service';
import { invoiceService } from '../../../api/services/invoice.service';

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

export default function ManageOrders() {
  const [orders, setOrders] = useState<BackendOrder[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<BackendOrder | null>(null);
  const [invoiceData, setInvoiceData] = useState<any>(null);

  // Form state for creating order
  const [customerSelect, setCustomerSelect] = useState('');
  const [orderFormAddress, setOrderFormAddress] = useState('');
  const [orderFormNote, setOrderFormNote] = useState('');
  const [orderFormProducts, setOrderFormProducts] = useState<any[]>([]);
  const [productSearch, setProductSearch] = useState('');

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

  const handleExportInvoice = async (order: BackendOrder) => {
    if (order.trang_thai_don_hang !== 4) {
      alert('Chỉ có thể xuất hóa đơn khi đơn hàng đã giao (trạng thái "Đã giao")');
      return;
    }
    try {
      const invoice = await invoiceService.generateInvoice({ ma_don_hang: order._id });
      setInvoiceData(invoice);
      setSelectedOrder(order);
      setShowInvoiceModal(true);
    } catch (e: any) {
      // Invoice may already exist — try to fetch the existing one
      try {
        const existing = await invoiceService.findAll({ ma_don_hang: order._id });
        const existingInvoice = existing?.data?.[0] || existing?.[0];
        if (existingInvoice) {
          setInvoiceData(existingInvoice);
          setSelectedOrder(order);
          setShowInvoiceModal(true);
        } else {
          alert(e?.response?.data?.message || 'Lỗi khi xuất hóa đơn');
        }
      } catch {
        alert(e?.response?.data?.message || 'Lỗi khi xuất hóa đơn');
      }
    }
  };

  const handleCreateOrder = async () => {
    if (!customerSelect || !orderFormAddress) {
      alert('Vui lòng nhập đầy đủ thông tin khách hàng và địa chỉ');
      return;
    }
    if (orderFormProducts.length === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm');
      return;
    }

    try {
      const chi_tiet = orderFormProducts.map(p => ({
        ma_sp_chi_tiet: p.variantId,
        so_luong: p.quantity,
        gia_goc: p.price,
        giam_gia: 0,
        thanh_tien: p.price * p.quantity,
      }));
      
      const tong_tien_hang = chi_tiet.reduce((s, i) => s + i.thanh_tien, 0);
      
      await orderService.createManualOrder({
        ma_khach_hang: customerSelect,
        dia_chi_nhan: orderFormAddress,
        ghi_chu: orderFormNote,
        phuong_thuc_thanh_toan: 1,
        phi_van_chuyen: 30000,
        tong_tien_hang: tong_tien_hang,
        thanh_tien: tong_tien_hang + 30000,
        chi_tiet_don_hang: chi_tiet,
      });

      const res = await orderService.findAll({ limit: 100 });
      setOrders(res.data || []);
      setShowCreateModal(false);
      
      // Reset form
      setCustomerSelect('');
      setOrderFormAddress('');
      setOrderFormNote('');
      setOrderFormProducts([]);
      
      alert('Đã tạo đơn hàng thành công!');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Lỗi khi tạo đơn hàng');
    }
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

  const addProductToOrder = (variantId: string) => {
    const variant = variantsMap[variantId];
    if (!variant) return;

    const existing = orderFormProducts.find(p => p.variantId === variantId);
    if (existing) {
      setOrderFormProducts(
        orderFormProducts.map(p =>
          p.variantId === variantId ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setOrderFormProducts([
        ...orderFormProducts,
        {
          variantId: variantId,
          name: variant.name,
          color: variant.color,
          size: variant.size,
          price: variant.price,
          quantity: 1,
        },
      ]);
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

  // Filter products for search
  const displayProducts = products.filter(p => 
    p.ten_san_pham.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl">Quản Lý Đơn Hàng</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 hover:bg-gray-800"
        >
          <Plus className="w-5 h-5" />
          Tạo đơn hàng mới
        </button>
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
                          <button
                            onClick={() => handleExportInvoice(order)}
                            className="p-1 hover:bg-gray-200 rounded"
                            title="Xuất hóa đơn"
                          >
                            <FileText className="w-4 h-4" />
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

      {/* Create Order Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl">Tạo Đơn Hàng Mới</h3>
              <button onClick={() => setShowCreateModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="font-medium mb-3">Thông tin khách hàng</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Khách hàng *</label>
                    <select
                      value={customerSelect}
                      onChange={(e) => setCustomerSelect(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="">-- Chọn khách hàng --</option>
                      {customers.map(c => (
                        <option key={c._id} value={c._id}>{c.ho_ten} ({c.so_dien_thoai})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Địa chỉ giao hàng *</label>
                    <input
                      type="text"
                      value={orderFormAddress}
                      onChange={(e) => setOrderFormAddress(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm mb-1">Ghi chú (tùy chọn)</label>
                    <input
                      type="text"
                      value={orderFormNote}
                      onChange={(e) => setOrderFormNote(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              {/* Product Selection */}
              <div>
                <h4 className="font-medium mb-3">Chọn sản phẩm</h4>
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
                />
                <div className="max-h-40 overflow-y-auto border border-gray-200 rounded">
                  {displayProducts.map((product) => (
                    <div key={product._id} className="p-3 border-b last:border-0">
                      <p className="font-medium mb-2">{product.ten_san_pham}</p>
                      <div className="space-y-1">
                        {product.bien_the?.map((variant: any) => (
                          <button
                            key={variant._id}
                            onClick={() => addProductToOrder(variant._id)}
                            className="block w-full text-left text-sm p-2 hover:bg-gray-100 rounded"
                          >
                            {variant.mau_sac} / {variant.kich_co} - {variant.gia_ban.toLocaleString()}đ (Còn {variant.so_luong_ton})
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Products */}
              <div>
                <h4 className="font-medium mb-3">Sản phẩm đã chọn</h4>
                {orderFormProducts.length === 0 ? (
                  <p className="text-gray-500 text-sm">Chưa có sản phẩm nào</p>
                ) : (
                  <div className="space-y-2">
                    {orderFormProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded">
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.color} / {product.size}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            min="1"
                            value={product.quantity}
                            onChange={(e) => {
                              setOrderFormProducts(orderFormProducts.map((p, i) =>
                                i === index ? { ...p, quantity: parseInt(e.target.value) || 1 } : p
                              ));
                            }}
                            className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
                          />
                          <p className="font-medium w-24 text-right">{(product.price * product.quantity).toLocaleString()}đ</p>
                          <button
                            onClick={() => {
                              setOrderFormProducts(orderFormProducts.filter((_, i) => i !== index));
                            }}
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="space-y-2 text-right">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{orderFormProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0).toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>30.000đ</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium">
                    <span>Tổng cộng:</span>
                    <span>{(orderFormProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0) + 30000).toLocaleString()}đ</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleCreateOrder}
                  className="flex-1 bg-black text-white py-2 hover:bg-gray-800"
                >
                  Tạo đơn hàng
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 border border-gray-300 py-2 hover:bg-gray-100"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    <strong>Tổng tiền:</strong>
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

              {selectedOrder.trang_thai_don_hang === 4 && (
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    handleExportInvoice(selectedOrder);
                  }}
                  className="w-full bg-blue-600 text-white py-2 hover:bg-blue-700 transition-colors"
                >
                  Xem hóa đơn
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {showInvoiceModal && selectedOrder && invoiceData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl">Hóa Đơn</h3>
              <button onClick={() => setShowInvoiceModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Invoice Content */}
            <div className="border-2 border-gray-300 p-8 mb-6" id="invoice-content">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-serif mb-2">WOLFASHION</h1>
                <p className="text-sm text-gray-600">Thời Trang Cao Cấp</p>
                <p className="text-sm text-gray-600">Địa chỉ: 123 Nguyễn Huệ, Q.1, TP.HCM | Hotline: 1900 xxxx</p>
              </div>

              {/* Invoice Info */}
              <div className="mb-8">
                <h2 className="text-2xl text-center mb-6">HÓA ĐƠN BÁN HÀNG</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Mã hóa đơn:</strong> {invoiceData.so_hoa_don}</p>
                    <p><strong>Mã đơn hàng:</strong> {selectedOrder._id.slice(-6).toUpperCase()}</p>
                  </div>
                  <div className="text-right">
                    <p><strong>Ngày xuất:</strong> {new Date(invoiceData.ngay_xuat || new Date()).toLocaleDateString('vi-VN')}</p>
                    <p><strong>Khách hàng:</strong> {customersMap[selectedOrder.ma_khach_hang]?.ho_ten || selectedOrder.ma_khach_hang}</p>
                  </div>
                </div>
              </div>

              {/* Products Table */}
              <div className="mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-800">
                      <th className="text-left py-2 px-2">Tên sản phẩm</th>
                      <th className="text-center py-2 px-2">Màu sắc</th>
                      <th className="text-center py-2 px-2">Kích cỡ</th>
                      <th className="text-center py-2 px-2">SL</th>
                      <th className="text-right py-2 px-2">Đơn giá</th>
                      <th className="text-right py-2 px-2">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.chi_tiet_hoa_don?.map((item: any, idx: number) => (
                      <tr key={idx} className="border-b border-gray-300">
                        <td className="py-2 px-2">{item.ten_san_pham}</td>
                        <td className="text-center py-2 px-2">{item.mau_sac}</td>
                        <td className="text-center py-2 px-2">{item.kich_co}</td>
                        <td className="text-center py-2 px-2">{item.so_luong}</td>
                        <td className="text-right py-2 px-2">{item.don_gia.toLocaleString()}đ</td>
                        <td className="text-right py-2 px-2">{(item.don_gia * item.so_luong).toLocaleString()}đ</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div className="border-t-2 border-gray-800 pt-4">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2 text-sm">
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-800">
                      <span>TỔNG TIỀN:</span>
                      <span>{invoiceData.tong_tien.toLocaleString()}đ</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center text-sm text-gray-600">
                <p>Cảm ơn quý khách đã mua hàng tại WOLFASHION!</p>
                <p className="mt-2">Đổi trả trong 7 ngày nếu có lỗi từ nhà sản xuất</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-black text-white py-2 hover:bg-gray-800"
              >
                Xuất hóa đơn (In/PDF)
              </button>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="flex-1 border border-gray-300 py-2 hover:bg-gray-100"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
