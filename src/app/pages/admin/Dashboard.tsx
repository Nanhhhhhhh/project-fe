import { useState } from 'react';
import { FileDown, X, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type MainTab = 'revenue' | 'order-status' | 'bestseller';
type RevenueType = 'day' | 'month' | 'year';

export default function Dashboard() {
  const [mainTab, setMainTab] = useState<MainTab>('revenue');

  // Revenue report states
  const [revenueType, setRevenueType] = useState<RevenueType>('day');
  const [revenueStartDate, setRevenueStartDate] = useState('2026-04-01');
  const [revenueEndDate, setRevenueEndDate] = useState('2026-04-30');

  // Order status states
  const [orderStatusStartDate, setOrderStatusStartDate] = useState('2026-04-01');
  const [orderStatusEndDate, setOrderStatusEndDate] = useState('2026-04-30');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Bestseller states
  const [bestsellerStartDate, setBestsellerStartDate] = useState('2026-04-01');
  const [bestsellerEndDate, setBestsellerEndDate] = useState('2026-04-30');
  const [topFilter, setTopFilter] = useState('10');
  const [rankBy, setRankBy] = useState<'quantity' | 'revenue'>('quantity');

  // Modal states
  const [showOrderDetailModal, setShowOrderDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showProductDetailModal, setShowProductDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showAllProductOrders, setShowAllProductOrders] = useState(false);

  // Mock data - Revenue
  const revenueByDay = [
    { date: '01/04', revenue: 12500000 },
    { date: '02/04', revenue: 8200000 },
    { date: '03/04', revenue: 15300000 },
    { date: '04/04', revenue: 9800000 },
    { date: '05/04', revenue: 14200000 },
    { date: '06/04', revenue: 11000000 },
    { date: '07/04', revenue: 13500000 },
    { date: '08/04', revenue: 10200000 },
    { date: '09/04', revenue: 16800000 },
    { date: '10/04', revenue: 12900000 },
  ];

  const revenueByMonth = [
    { date: '01/2026', revenue: 350000000 },
    { date: '02/2026', revenue: 420000000 },
    { date: '03/2026', revenue: 380000000 },
    { date: '04/2026', revenue: 124100000 },
  ];

  const revenueByYear = [
    { date: '2024', revenue: 4500000000 },
    { date: '2025', revenue: 5200000000 },
    { date: '2026', revenue: 1274100000 },
  ];

  // Mock data - Order status
  const ordersByStatus = [
    { status: 'Chờ xác nhận', count: 5, color: '#FFC107' },
    { status: 'Đã xác nhận', count: 8, color: '#2196F3' },
    { status: 'Đang giao', count: 3, color: '#FF9800' },
    { status: 'Đã giao', count: 20, color: '#4CAF50' },
    { status: 'Đã hủy', count: 2, color: '#F44336' },
  ];

  const totalOrders = ordersByStatus.reduce((sum, item) => sum + item.count, 0);

  // Mock data - All orders (for order list)
  const mockAllOrders = [
    { id: 1001, date: '01/04/2026', customer: 'Nguyễn Văn A', total: 500000, status: 'Đã giao' },
    { id: 1002, date: '01/04/2026', customer: 'Trần Thị B', total: 300000, status: 'Chờ xác nhận' },
    { id: 1003, date: '02/04/2026', customer: 'Lê Văn C', total: 450000, status: 'Đang giao' },
    { id: 1004, date: '02/04/2026', customer: 'Phạm Thị D', total: 200000, status: 'Đã hủy' },
    { id: 1005, date: '03/04/2026', customer: 'Hoàng Văn E', total: 600000, status: 'Đã xác nhận' },
    { id: 1006, date: '01/04/2026', customer: 'Vũ Thị F', total: 350000, status: 'Đã giao' },
    { id: 1007, date: '01/04/2026', customer: 'Đặng Văn G', total: 420000, status: 'Đang giao' },
    { id: 1008, date: '01/04/2026', customer: 'Bùi Thị H', total: 550000, status: 'Đã giao' },
    { id: 1009, date: '01/04/2026', customer: 'Ngô Văn I', total: 280000, status: 'Đã xác nhận' },
    { id: 1010, date: '01/04/2026', customer: 'Đỗ Thị K', total: 380000, status: 'Đã giao' },
    { id: 1011, date: '01/04/2026', customer: 'Hồ Văn L', total: 470000, status: 'Đã giao' },
    { id: 1012, date: '01/04/2026', customer: 'Dương Thị M', total: 320000, status: 'Đang giao' },
    { id: 1013, date: '01/04/2026', customer: 'Phan Văn N', total: 290000, status: 'Đã giao' },
    { id: 1014, date: '01/04/2026', customer: 'Lý Thị O', total: 510000, status: 'Đã giao' },
    { id: 1015, date: '01/04/2026', customer: 'Mai Văn P', total: 390000, status: 'Đã hủy' },
  ];

  // Mock data - Bestseller products
  const bestsellerProducts = [
    { rank: 1, name: 'Áo thun nam', category: 'Áo', quantity: 250, revenue: 12500000, percentage: 20 },
    { rank: 2, name: 'Quần jean nữ', category: 'Quần', quantity: 180, revenue: 9000000, percentage: 14 },
    { rank: 3, name: 'Váy hoa', category: 'Váy', quantity: 150, revenue: 7500000, percentage: 12 },
    { rank: 4, name: 'Áo sơ mi nam', category: 'Áo', quantity: 120, revenue: 6000000, percentage: 10 },
    { rank: 5, name: 'Quần short', category: 'Quần', quantity: 100, revenue: 5000000, percentage: 8 },
    { rank: 6, name: 'Áo khoác gió', category: 'Áo', quantity: 90, revenue: 4500000, percentage: 7 },
    { rank: 7, name: 'Mũ lưỡi trai', category: 'Phụ kiện', quantity: 80, revenue: 2400000, percentage: 6 },
    { rank: 8, name: 'Giày thể thao', category: 'Phụ kiện', quantity: 70, revenue: 3500000, percentage: 6 },
    { rank: 9, name: 'Váy đầm dự tiệc', category: 'Váy', quantity: 60, revenue: 3000000, percentage: 5 },
    { rank: 10, name: 'Áo len cổ lọ', category: 'Áo', quantity: 50, revenue: 2500000, percentage: 4 },
    { rank: 11, name: 'Quần tây', category: 'Quần', quantity: 45, revenue: 2250000, percentage: 3 },
    { rank: 12, name: 'Áo polo', category: 'Áo', quantity: 40, revenue: 2000000, percentage: 3 },
    { rank: 13, name: 'Váy midi', category: 'Váy', quantity: 38, revenue: 1900000, percentage: 3 },
    { rank: 14, name: 'Túi xách', category: 'Phụ kiện', quantity: 35, revenue: 1750000, percentage: 3 },
    { rank: 15, name: 'Áo khoác jean', category: 'Áo', quantity: 32, revenue: 1600000, percentage: 2 },
    { rank: 16, name: 'Quần jogger', category: 'Quần', quantity: 30, revenue: 1500000, percentage: 2 },
    { rank: 17, name: 'Áo ba lỗ', category: 'Áo', quantity: 28, revenue: 1400000, percentage: 2 },
    { rank: 18, name: 'Váy xòe', category: 'Váy', quantity: 25, revenue: 1250000, percentage: 2 },
    { rank: 19, name: 'Kính mát', category: 'Phụ kiện', quantity: 22, revenue: 1100000, percentage: 2 },
    { rank: 20, name: 'Áo hoodie', category: 'Áo', quantity: 20, revenue: 1000000, percentage: 1 },
  ];

  // Mock data - Product variants (for product detail modal)
  const productVariantsMap: Record<string, any[]> = {
    'Áo thun nam': [
      { color: 'Đỏ', size: 'M', stock: 50, soldQuantity: 120, revenue: 6000000 },
      { color: 'Đỏ', size: 'L', stock: 30, soldQuantity: 80, revenue: 4000000 },
      { color: 'Xanh', size: 'M', stock: 20, soldQuantity: 50, revenue: 2500000 },
    ],
    'Quần jean nữ': [
      { color: 'Xanh đậm', size: 'S', stock: 25, soldQuantity: 60, revenue: 3000000 },
      { color: 'Xanh đậm', size: 'M', stock: 35, soldQuantity: 80, revenue: 4000000 },
      { color: 'Xanh nhạt', size: 'L', stock: 15, soldQuantity: 40, revenue: 2000000 },
    ],
    'Váy hoa': [
      { color: 'Trắng', size: 'S', stock: 40, soldQuantity: 70, revenue: 3500000 },
      { color: 'Trắng', size: 'M', stock: 30, soldQuantity: 50, revenue: 2500000 },
      { color: 'Hồng', size: 'S', stock: 20, soldQuantity: 30, revenue: 1500000 },
    ],
    'Áo sơ mi nam': [
      { color: 'Trắng', size: 'M', stock: 45, soldQuantity: 50, revenue: 2500000 },
      { color: 'Xanh', size: 'L', stock: 35, soldQuantity: 40, revenue: 2000000 },
      { color: 'Đen', size: 'M', stock: 25, soldQuantity: 30, revenue: 1500000 },
    ],
    'Quần short': [
      { color: 'Đen', size: 'M', stock: 30, soldQuantity: 45, revenue: 2250000 },
      { color: 'Xám', size: 'L', stock: 25, soldQuantity: 35, revenue: 1750000 },
      { color: 'Be', size: 'M', stock: 20, soldQuantity: 20, revenue: 1000000 },
    ],
  };

  // Mock data - Orders containing specific product
  const productOrdersMap: Record<string, any[]> = {
    'Áo thun nam': [
      { id: 1001, date: '01/04/2026', customer: 'Nguyễn Văn A', quantity: 2, amount: 300000, status: 'Đã giao' },
      { id: 1003, date: '02/04/2026', customer: 'Lê Văn C', quantity: 1, amount: 150000, status: 'Đã giao' },
      { id: 1005, date: '03/04/2026', customer: 'Hoàng Văn E', quantity: 3, amount: 450000, status: 'Đã giao' },
      { id: 1008, date: '05/04/2026', customer: 'Trần Thị B', quantity: 1, amount: 150000, status: 'Đã giao' },
      { id: 1012, date: '07/04/2026', customer: 'Phạm Văn D', quantity: 2, amount: 300000, status: 'Đã giao' },
      { id: 1015, date: '09/04/2026', customer: 'Mai Văn P', quantity: 1, amount: 150000, status: 'Đã giao' },
      { id: 1018, date: '10/04/2026', customer: 'Lý Thị O', quantity: 2, amount: 300000, status: 'Đã giao' },
    ],
    'Quần jean nữ': [
      { id: 1002, date: '01/04/2026', customer: 'Trần Thị B', quantity: 1, amount: 200000, status: 'Đã giao' },
      { id: 1004, date: '02/04/2026', customer: 'Phạm Thị D', quantity: 2, amount: 400000, status: 'Đã giao' },
      { id: 1007, date: '04/04/2026', customer: 'Đặng Văn G', quantity: 1, amount: 200000, status: 'Đã giao' },
      { id: 1010, date: '06/04/2026', customer: 'Đỗ Thị K', quantity: 1, amount: 200000, status: 'Đã giao' },
      { id: 1013, date: '08/04/2026', customer: 'Phan Văn N', quantity: 2, amount: 400000, status: 'Đã giao' },
    ],
    'Váy hoa': [
      { id: 1006, date: '03/04/2026', customer: 'Vũ Thị F', quantity: 1, amount: 180000, status: 'Đã giao' },
      { id: 1009, date: '05/04/2026', customer: 'Ngô Văn I', quantity: 2, amount: 360000, status: 'Đã giao' },
      { id: 1011, date: '06/04/2026', customer: 'Hồ Văn L', quantity: 1, amount: 180000, status: 'Đã giao' },
      { id: 1014, date: '08/04/2026', customer: 'Lý Thị O', quantity: 1, amount: 180000, status: 'Đã giao' },
    ],
    'Áo sơ mi nam': [
      { id: 1003, date: '02/04/2026', customer: 'Lê Văn C', quantity: 1, amount: 250000, status: 'Đã giao' },
      { id: 1007, date: '04/04/2026', customer: 'Đặng Văn G', quantity: 2, amount: 500000, status: 'Đã giao' },
      { id: 1011, date: '06/04/2026', customer: 'Hồ Văn L', quantity: 1, amount: 250000, status: 'Đã giao' },
    ],
    'Quần short': [
      { id: 1005, date: '03/04/2026', customer: 'Hoàng Văn E', quantity: 2, amount: 300000, status: 'Đã giao' },
      { id: 1008, date: '05/04/2026', customer: 'Bùi Thị H', quantity: 1, amount: 150000, status: 'Đã giao' },
      { id: 1012, date: '07/04/2026', customer: 'Dương Thị M', quantity: 1, amount: 150000, status: 'Đã giao' },
    ],
  };

  const getRevenueData = () => {
    switch (revenueType) {
      case 'day': return revenueByDay;
      case 'month': return revenueByMonth;
      case 'year': return revenueByYear;
      default: return revenueByDay;
    }
  };

  const getFilteredOrders = () => {
    if (orderStatusFilter === 'all') return mockAllOrders;
    return mockAllOrders.filter(order => order.status === orderStatusFilter);
  };

  const getTopProducts = () => {
    const limit = parseInt(topFilter);
    const sorted = [...bestsellerProducts].sort((a, b) => {
      if (rankBy === 'quantity') return b.quantity - a.quantity;
      return b.revenue - a.revenue;
    });
    return sorted.slice(0, limit);
  };

  const handleExportExcel = (section: string) => {
    alert(`Xuất file Excel cho: ${section}`);
  };

  const handleViewOrderDetail = (order: any) => {
    setSelectedOrder(order);
    setShowOrderDetailModal(true);
    // Close product detail modal if open
    setShowProductDetailModal(false);
  };

  const handlePieClick = (entry: any) => {
    setOrderStatusFilter(entry.status);
  };

  const handleViewProductDetail = (product: any) => {
    setSelectedProduct(product);
    setShowProductDetailModal(true);
    setShowAllProductOrders(false);
  };

  const revenueData = getRevenueData();
  const filteredOrders = getFilteredOrders();
  const topProducts = getTopProducts();

  // Calculate summary metrics
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalCompletedOrders = ordersByStatus.find(s => s.status === 'Đã giao')?.count || 0;
  const totalProductsSold = bestsellerProducts.reduce((sum, p) => sum + p.quantity, 0);
  const totalBestsellerRevenue = bestsellerProducts.reduce((sum, p) => sum + p.revenue, 0);
  const topProduct = bestsellerProducts[0];

  // Pagination for order list
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Pagination for bestseller list
  const bestsellerItemsPerPage = 10;
  const bestsellerTotalPages = Math.ceil(topProducts.length / bestsellerItemsPerPage);
  const [bestsellerPage, setBestsellerPage] = useState(1);
  const paginatedBestsellers = topProducts.slice(
    (bestsellerPage - 1) * bestsellerItemsPerPage,
    bestsellerPage * bestsellerItemsPerPage
  );

  return (
    <div>
      {/* Header with tabs */}
      <div className="mb-6">
        <h2 className="text-3xl mb-4">Thống Kê & Báo Cáo</h2>

        {/* Main tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setMainTab('revenue')}
            className={`px-6 py-3 ${
              mainTab === 'revenue'
                ? 'border-b-2 border-black font-medium'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Thống kê báo cáo doanh thu
          </button>
          <button
            onClick={() => setMainTab('order-status')}
            className={`px-6 py-3 ${
              mainTab === 'order-status'
                ? 'border-b-2 border-black font-medium'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Thống kê trạng thái đơn hàng
          </button>
          <button
            onClick={() => setMainTab('bestseller')}
            className={`px-6 py-3 ${
              mainTab === 'bestseller'
                ? 'border-b-2 border-black font-medium'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Thống kê sản phẩm bán chạy
          </button>
        </div>
      </div>

      {/* REVENUE REPORT TAB */}
      {mainTab === 'revenue' && (
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl">THỐNG KÊ BÁO CÁO DOANH THU</h3>
            <button
              onClick={() => handleExportExcel('Báo cáo doanh thu')}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <FileDown className="w-4 h-4" />
              Xuất Excel
            </button>
          </div>

          {/* Filter card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="font-medium mb-4">CHỌN THỜI GIAN</h4>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Loại thống kê:</label>
                <select
                  value={revenueType}
                  onChange={(e) => setRevenueType(e.target.value as RevenueType)}
                  className="px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="day">Theo ngày</option>
                  <option value="month">Theo tháng</option>
                  <option value="year">Theo năm</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Khoảng thời gian:</label>
                <input
                  type="date"
                  value={revenueStartDate}
                  onChange={(e) => setRevenueStartDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded"
                />
                <span className="text-gray-400">→</span>
                <input
                  type="date"
                  value={revenueEndDate}
                  onChange={(e) => setRevenueEndDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Xem
              </button>
            </div>
          </div>

          {/* Chart card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="font-medium mb-4">BIỂU ĐỒ CỘT DOANH THU</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value: number) => `${value.toLocaleString()} VNĐ`} />
                <Bar dataKey="revenue" fill="#2196F3" name="Doanh thu (VNĐ)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="font-medium mb-4">TÓM TẮT</h4>
            <div className="grid grid-cols-3 gap-6">
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600 mb-1">TỔNG DOANH THU</p>
                <p className="text-2xl font-medium">{totalRevenue.toLocaleString()} VNĐ</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600 mb-1">TỔNG ĐƠN HÀNG</p>
                <p className="text-2xl font-medium">{totalCompletedOrders} đơn</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600 mb-1">TỔNG SẢN PHẨM BÁN ĐƯỢC</p>
                <p className="text-2xl font-medium">{totalProductsSold} sản phẩm</p>
              </div>
            </div>
          </div>

          {/* Order list card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-medium mb-4">DANH SÁCH ĐƠN HÀNG HOÀN THÀNH</h4>
            <div className="overflow-x-auto mb-4">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4">Mã đơn</th>
                    <th className="text-left py-3 px-4">Ngày đặt</th>
                    <th className="text-left py-3 px-4">Khách hàng</th>
                    <th className="text-right py-3 px-4">Tổng tiền</th>
                    <th className="text-center py-3 px-4">Trạng thái</th>
                    <th className="text-center py-3 px-4">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAllOrders.filter(o => o.status === 'Đã giao').slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">#{order.id}</td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="text-right py-3 px-4">{order.total.toLocaleString()}</td>
                      <td className="text-center py-3 px-4">
                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                          {order.status}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <button
                          onClick={() => handleViewOrderDetail(order)}
                          className="px-3 py-1 text-sm text-blue-600 hover:underline"
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">3</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">Xem tất cả</button>
            </div>
          </div>
        </div>
      )}

      {/* ORDER STATUS TAB */}
      {mainTab === 'order-status' && (
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl">THỐNG KÊ TRẠNG THÁI ĐƠN HÀNG</h3>
            <button
              onClick={() => handleExportExcel('Trạng thái đơn hàng')}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <FileDown className="w-4 h-4" />
              Xuất Excel
            </button>
          </div>

          {/* Filter card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="font-medium mb-4">CHỌN THỜI GIAN</h4>
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600">Khoảng thời gian:</label>
              <input
                type="date"
                value={orderStatusStartDate}
                onChange={(e) => setOrderStatusStartDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded"
              />
              <span className="text-gray-400">→</span>
              <input
                type="date"
                value={orderStatusEndDate}
                onChange={(e) => setOrderStatusEndDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Xem
              </button>
            </div>
          </div>

          {/* Chart + Summary card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="font-medium mb-4">📊 BIỂU ĐỒ TRẠNG THÁI ĐƠN HÀNG</h4>
            <div className="grid grid-cols-2 gap-8">
              {/* Pie chart */}
              <div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ordersByStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ status, count }) => `${status} (${((count / totalOrders) * 100).toFixed(0)}%)`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                      onClick={handlePieClick}
                      style={{ cursor: 'pointer' }}
                    >
                      {ordersByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Summary table */}
              <div>
                <h5 className="font-medium mb-3">BẢNG TÓM TẮT</h5>
                <div className="overflow-x-auto border border-gray-200 rounded">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-2 px-4">Trạng thái</th>
                        <th className="text-right py-2 px-4">Số lượng</th>
                        <th className="text-right py-2 px-4">Tỷ lệ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersByStatus.map((item, index) => (
                        <tr key={index} className="border-t border-gray-100">
                          <td className="py-2 px-4">{item.status}</td>
                          <td className="text-right py-2 px-4">{item.count}</td>
                          <td className="text-right py-2 px-4">
                            {((item.count / totalOrders) * 100).toFixed(0)}%
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-gray-300 font-medium">
                        <td className="py-2 px-4">Tổng</td>
                        <td className="text-right py-2 px-4">{totalOrders}</td>
                        <td className="text-right py-2 px-4">100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Order list card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-medium mb-4">DANH SÁCH ĐƠN HÀNG</h4>

            {/* Filter dropdown */}
            <div className="mb-4">
              <label className="text-sm text-gray-600 mr-2">Lọc theo trạng thái:</label>
              <select
                value={orderStatusFilter}
                onChange={(e) => {
                  setOrderStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 rounded"
              >
                <option value="all">Tất cả</option>
                <option value="Chờ xác nhận">Chờ xác nhận</option>
                <option value="Đã xác nhận">Đã xác nhận</option>
                <option value="Đang giao">Đang giao</option>
                <option value="Đã giao">Đã giao</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
            </div>

            <div className="overflow-x-auto mb-4">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4">Mã đơn</th>
                    <th className="text-left py-3 px-4">Ngày đặt</th>
                    <th className="text-left py-3 px-4">Khách hàng</th>
                    <th className="text-right py-3 px-4">Tổng tiền</th>
                    <th className="text-center py-3 px-4">Trạng thái</th>
                    <th className="text-center py-3 px-4">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((order) => (
                    <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">#{order.id}</td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="text-right py-3 px-4">{order.total.toLocaleString()}</td>
                      <td className="text-center py-3 px-4">
                        <span className={`px-2 py-1 text-xs rounded ${
                          order.status === 'Đã giao' ? 'bg-green-100 text-green-800' :
                          order.status === 'Đang giao' ? 'bg-orange-100 text-orange-800' :
                          order.status === 'Đã xác nhận' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Chờ xác nhận' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <button
                          onClick={() => handleViewOrderDetail(order)}
                          className="px-3 py-1 text-sm text-blue-600 hover:underline"
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2">
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border border-gray-300 rounded ${
                    currentPage === i + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              {totalPages > 3 && <span className="px-2">...</span>}
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">
                Xem tất cả
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BESTSELLER TAB */}
      {mainTab === 'bestseller' && (
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl">THỐNG KÊ SẢN PHẨM BÁN CHẠY</h3>
            <button
              onClick={() => handleExportExcel('Sản phẩm bán chạy')}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <FileDown className="w-4 h-4" />
              Xuất Excel
            </button>
          </div>

          {/* Filter card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="font-medium mb-4">CHỌN THỜI GIAN & TÙY CHỌN</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-600">Khoảng thời gian:</label>
                <input
                  type="date"
                  value={bestsellerStartDate}
                  onChange={(e) => setBestsellerStartDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded"
                />
                <span className="text-gray-400">→</span>
                <input
                  type="date"
                  value={bestsellerEndDate}
                  onChange={(e) => setBestsellerEndDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-600">Số lượng hiển thị:</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTopFilter('10')}
                    className={`px-4 py-2 rounded ${
                      topFilter === '10' ? 'bg-black text-white' : 'border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    Top 10
                  </button>
                  <button
                    onClick={() => setTopFilter('20')}
                    className={`px-4 py-2 rounded ${
                      topFilter === '20' ? 'bg-black text-white' : 'border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    Top 20
                  </button>
                  <button
                    onClick={() => setTopFilter('50')}
                    className={`px-4 py-2 rounded ${
                      topFilter === '50' ? 'bg-black text-white' : 'border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    Top 50
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-600">Xếp hạng theo:</label>
                <select
                  value={rankBy}
                  onChange={(e) => setRankBy(e.target.value as 'quantity' | 'revenue')}
                  className="px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="quantity">Theo số lượng bán</option>
                  <option value="revenue">Theo doanh thu</option>
                </select>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Xem
                </button>
              </div>
            </div>
          </div>

          {/* Chart card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="font-medium mb-4">📈 BIỂU ĐỒ CỘT TOP SẢN PHẨM BÁN CHẠY</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value: number) => rankBy === 'quantity' ? `${value} cái` : `${value.toLocaleString()} VNĐ`} />
                <Bar
                  dataKey={rankBy === 'quantity' ? 'quantity' : 'revenue'}
                  fill="#2196F3"
                  name={rankBy === 'quantity' ? 'Số lượng bán (cái)' : 'Doanh thu (VNĐ)'}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="font-medium mb-4">TÓM TẮT</h4>
            <div className="grid grid-cols-3 gap-6">
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600 mb-1">TỔNG SẢN PHẨM BÁN</p>
                <p className="text-2xl font-medium">{totalProductsSold} cái</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600 mb-1">TỔNG DOANH THU</p>
                <p className="text-2xl font-medium">{totalBestsellerRevenue.toLocaleString()} VNĐ</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600 mb-1">SẢN PHẨM BÁN CHẠY NHẤT</p>
                <p className="text-xl font-medium">{topProduct.name} - {topProduct.quantity} cái</p>
              </div>
            </div>
          </div>

          {/* Product list card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-medium mb-4">📋 DANH SÁCH TOP SẢN PHẨM BÁN CHẠY</h4>
            <div className="overflow-x-auto mb-4">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-center py-3 px-4">#</th>
                    <th className="text-left py-3 px-4">Tên sản phẩm</th>
                    <th className="text-left py-3 px-4">Danh mục</th>
                    <th className="text-right py-3 px-4">Số lượng bán</th>
                    <th className="text-right py-3 px-4">Doanh thu</th>
                    <th className="text-right py-3 px-4">Tỷ lệ</th>
                    <th className="text-center py-3 px-4">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedBestsellers.map((product) => (
                    <tr key={product.rank} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="text-center py-3 px-4 font-medium">{product.rank}</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:underline text-left">
                          {product.name}
                        </button>
                      </td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="text-right py-3 px-4">{product.quantity}</td>
                      <td className="text-right py-3 px-4">{product.revenue.toLocaleString()}</td>
                      <td className="text-right py-3 px-4">{product.percentage}%</td>
                      <td className="text-center py-3 px-4">
                        <button
                          onClick={() => handleViewProductDetail(product)}
                          className="px-3 py-1 text-sm text-blue-600 hover:underline"
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2">
              {Array.from({ length: Math.min(3, bestsellerTotalPages) }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setBestsellerPage(i + 1)}
                  className={`px-3 py-1 border border-gray-300 rounded ${
                    bestsellerPage === i + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              {bestsellerTotalPages > 3 && <span className="px-2">...</span>}
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">
                Xem tất cả
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CHI TIẾT ĐƠN HÀNG */}
      {showOrderDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-medium">🧾 Chi Tiết Đơn Hàng #{selectedOrder.id}</h3>
                <button onClick={() => setShowOrderDetailModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Thông tin chung */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
                <div>
                  <p className="text-sm text-gray-600">Ngày đặt</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trạng thái</p>
                  <p className="font-medium">{selectedOrder.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Khách hàng</p>
                  <p className="font-medium">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">SĐT</p>
                  <p className="font-medium">0912345678</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Địa chỉ</p>
                  <p className="font-medium">123 Đường ABC, Hà Nội</p>
                </div>
              </div>

              {/* Sản phẩm */}
              <div>
                <h4 className="font-medium mb-3">Sản phẩm</h4>
                <div className="overflow-x-auto border border-gray-200 rounded">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-2 px-4">Sản phẩm</th>
                        <th className="text-left py-2 px-4">Biến thể</th>
                        <th className="text-center py-2 px-4">SL</th>
                        <th className="text-right py-2 px-4">Đơn giá</th>
                        <th className="text-right py-2 px-4">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="py-2 px-4">Áo thun nam</td>
                        <td className="py-2 px-4">Đỏ - M</td>
                        <td className="text-center py-2 px-4">2</td>
                        <td className="text-right py-2 px-4">150.000</td>
                        <td className="text-right py-2 px-4">300.000</td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-2 px-4">Quần short</td>
                        <td className="py-2 px-4">Xanh - L</td>
                        <td className="text-center py-2 px-4">1</td>
                        <td className="text-right py-2 px-4">200.000</td>
                        <td className="text-right py-2 px-4">200.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tổng tiền */}
              <div className="border-t pt-4">
                <div className="space-y-2 max-w-md ml-auto">
                  <div className="flex justify-between">
                    <span>Tổng tiền:</span>
                    <span>{selectedOrder.total.toLocaleString()} VNĐ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí ship:</span>
                    <span>20.000 VNĐ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giảm giá:</span>
                    <span>0 VNĐ</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg pt-2 border-t">
                    <span>Thành toán:</span>
                    <span>{(selectedOrder.total + 20000).toLocaleString()} VNĐ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CHI TIẾT SẢN PHẨM */}
      {showProductDetailModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-medium">🛍️ CHI TIẾT SẢN PHẨM: {selectedProduct.name}</h3>
                <button onClick={() => setShowProductDetailModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Product info - 2 columns */}
              <div className="grid grid-cols-3 gap-6">
                {/* Left: Product image */}
                <div className="col-span-1">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-600 mb-3">📷 ẢNH SẢN PHẨM</p>
                    <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-gray-400">[Hình ảnh sản phẩm]</span>
                    </div>
                  </div>
                </div>

                {/* Right: Product details */}
                <div className="col-span-2">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-600 mb-4">📋 THÔNG TIN SẢN PHẨM</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Tên</p>
                        <p className="font-medium">{selectedProduct.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Danh mục</p>
                        <p className="font-medium">{selectedProduct.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Giới tính</p>
                        <p className="font-medium">Nam</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Mô tả</p>
                        <p className="font-medium">Áo thun chất liệu cotton cao cấp, thoáng mát, phù hợp cho mọi hoạt động hàng ngày.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sales statistics */}
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600 mb-4">📊 THỐNG KÊ BÁN HÀNG TRONG KỲ ({bestsellerStartDate} - {bestsellerEndDate})</p>
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600 mb-1">Tổng số lượng bán</p>
                    <p className="text-xl font-medium">{selectedProduct.quantity} cái</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600 mb-1">Tổng doanh thu</p>
                    <p className="text-xl font-medium">{selectedProduct.revenue.toLocaleString()} VNĐ</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600 mb-1">Tỷ lệ đóng góp</p>
                    <p className="text-xl font-medium">{selectedProduct.percentage}%</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600 mb-1">Xếp hạng</p>
                    <p className="text-xl font-medium">#{selectedProduct.rank}</p>
                  </div>
                </div>
              </div>

              {/* Product variants table */}
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600 mb-4">📋 DANH SÁCH BIẾN THỂ SẢN PHẨM</p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4">Màu sắc</th>
                        <th className="text-left py-3 px-4">Kích cỡ</th>
                        <th className="text-right py-3 px-4">Tồn kho</th>
                        <th className="text-right py-3 px-4">Số lượng bán</th>
                        <th className="text-right py-3 px-4">Doanh thu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(productVariantsMap[selectedProduct.name] || []).map((variant, index) => (
                        <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">{variant.color}</td>
                          <td className="py-3 px-4">{variant.size}</td>
                          <td className="text-right py-3 px-4">{variant.stock}</td>
                          <td className="text-right py-3 px-4">{variant.soldQuantity}</td>
                          <td className="text-right py-3 px-4">{variant.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Orders containing this product */}
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600 mb-4">
                  📋 DANH SÁCH ĐƠN HÀNG CÓ CHỨA SẢN PHẨM NÀY (5 đơn gần nhất)
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4">Mã đơn</th>
                        <th className="text-left py-3 px-4">Ngày đặt</th>
                        <th className="text-left py-3 px-4">Khách hàng</th>
                        <th className="text-right py-3 px-4">Số lượng</th>
                        <th className="text-right py-3 px-4">Thành tiền</th>
                        <th className="text-center py-3 px-4">Trạng thái</th>
                        <th className="text-center py-3 px-4">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(productOrdersMap[selectedProduct.name] || [])
                        .slice(0, showAllProductOrders ? undefined : 5)
                        .map((order) => (
                          <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">#{order.id}</td>
                            <td className="py-3 px-4">{order.date}</td>
                            <td className="py-3 px-4">{order.customer}</td>
                            <td className="text-right py-3 px-4">{order.quantity}</td>
                            <td className="text-right py-3 px-4">{order.amount.toLocaleString()}</td>
                            <td className="text-center py-3 px-4">
                              <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                                {order.status}
                              </span>
                            </td>
                            <td className="text-center py-3 px-4">
                              <button
                                onClick={() => handleViewOrderDetail(order)}
                                className="px-3 py-1 text-sm text-blue-600 hover:underline"
                              >
                                Xem đơn hàng
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* Show all orders button */}
                {!showAllProductOrders && (productOrdersMap[selectedProduct.name] || []).length > 5 && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => setShowAllProductOrders(true)}
                      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                    >
                      Xem tất cả đơn hàng
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
