import { useState, useEffect } from 'react';
import { FileDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { orderService } from '../../../api/services/order.service';
import { productService } from '../../../api/services/product.service';

type MainTab = 'revenue' | 'order-status' | 'bestseller';

const statusNames: Record<number, string> = {
  1: 'Chờ xác nhận',
  2: 'Đã xác nhận',
  3: 'Đang giao',
  4: 'Đã giao',
  5: 'Đã hủy',
};

const statusColors: Record<number, string> = {
  1: '#FFC107',
  2: '#2196F3',
  3: '#FF9800',
  4: '#4CAF50',
  5: '#F44336',
};

export default function Dashboard() {
  const [mainTab, setMainTab] = useState<MainTab>('revenue');

  const [startDate, setStartDate] = useState('2026-04-01');
  const [endDate, setEndDate] = useState('2026-04-30');

  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>({
    revenueByDay: [],
    ordersByStatus: [],
    bestsellers: [],
  });

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [statsRes, products] = await Promise.all([
        orderService.getStats(startDate, endDate),
        productService.getAll(),
      ]);

      const formattedRevenue = (statsRes.revenueByDay || []).map((item: any) => {
        const parts = item._id.split('-'); // YYYY-MM-DD
        return {
          date: parts.length === 3 ? `${parts[2]}/${parts[1]}` : item._id,
          revenue: item.revenue,
        };
      });

      const formattedOrderStatus = (statsRes.ordersByStatus || []).map((item: any) => ({
        status: statusNames[item._id] || `Trạng thái ${item._id}`,
        count: item.count,
        color: statusColors[item._id] || '#8884d8',
      }));

      const formattedBestsellers = (statsRes.bestsellers || []).map((item: any, index: number) => {
        let name = 'Sản phẩm không rõ';
        for (const prod of products) {
          const variant = prod.bien_the.find((v: any) => v._id === item._id);
          if (variant) {
            name = `${prod.ten_san_pham} (${variant.mau_sac}/${variant.kich_co})`;
            break;
          }
        }
        return {
          rank: index + 1,
          name,
          quantity: item.totalQty,
          revenue: item.totalRevenue,
        };
      });

      setStats({
        revenueByDay: formattedRevenue,
        ordersByStatus: formattedOrderStatus,
        bestsellers: formattedBestsellers,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [mainTab, startDate, endDate]);

  const handleExportExcel = () => {
    alert('Chức năng đang phát triển');
  };

  const totalRevenue = stats.revenueByDay.reduce((sum: number, item: any) => sum + item.revenue, 0);
  const totalOrders = stats.ordersByStatus.reduce((sum: number, item: any) => sum + item.count, 0);
  const totalCompletedOrders = stats.ordersByStatus.find((s: any) => s.status === 'Đã giao')?.count || 0;
  const totalProductsSold = stats.bestsellers.reduce((sum: number, p: any) => sum + p.quantity, 0);
  const totalBestsellerRevenue = stats.bestsellers.reduce((sum: number, p: any) => sum + p.revenue, 0);
  const topProduct = stats.bestsellers[0];

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

      {loading ? (
        <div className="p-8 text-center text-gray-500">Đang tải...</div>
      ) : (
        <>
          {/* REVENUE REPORT TAB */}
          {mainTab === 'revenue' && (
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl">THỐNG KÊ BÁO CÁO DOANH THU</h3>
                <button
                  onClick={handleExportExcel}
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
                    <label className="text-sm text-gray-600">Khoảng thời gian:</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded"
                    />
                    <span className="text-gray-400">→</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Chart card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="font-medium mb-4">BIỂU ĐỒ CỘT DOANH THU</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.revenueByDay}>
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
                    <p className="text-sm text-gray-600 mb-1">TỔNG ĐƠN HÀNG HOÀN THÀNH</p>
                    <p className="text-2xl font-medium">{totalCompletedOrders} đơn</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600 mb-1">TỔNG SẢN PHẨM BÁN ĐƯỢC</p>
                    <p className="text-2xl font-medium">{totalProductsSold} sản phẩm</p>
                  </div>
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
                  onClick={handleExportExcel}
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
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded"
                  />
                  <span className="text-gray-400">→</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded"
                  />
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
                          data={stats.ordersByStatus}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ status, count }) => totalOrders ? `${status} (${((count / totalOrders) * 100).toFixed(0)}%)` : status}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {stats.ordersByStatus.map((entry: any, index: number) => (
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
                          {stats.ordersByStatus.map((item: any, index: number) => (
                            <tr key={index} className="border-t border-gray-100">
                              <td className="py-2 px-4">{item.status}</td>
                              <td className="text-right py-2 px-4">{item.count}</td>
                              <td className="text-right py-2 px-4">
                                {totalOrders ? ((item.count / totalOrders) * 100).toFixed(0) : 0}%
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
            </div>
          )}

          {/* BESTSELLER TAB */}
          {mainTab === 'bestseller' && (
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl">THỐNG KÊ SẢN PHẨM BÁN CHẠY</h3>
                <button
                  onClick={handleExportExcel}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  <FileDown className="w-4 h-4" />
                  Xuất Excel
                </button>
              </div>

              {/* Filter card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="font-medium mb-4">CHỌN THỜI GIAN</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-600">Khoảng thời gian:</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded"
                    />
                    <span className="text-gray-400">→</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Chart card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="font-medium mb-4">📈 BIỂU ĐỒ CỘT TOP SẢN PHẨM BÁN CHẠY</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.bestsellers.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `${value} cái`} />
                    <Bar
                      dataKey="quantity"
                      fill="#2196F3"
                      name="Số lượng bán (cái)"
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
                    <p className="text-xl font-medium">
                      {topProduct ? `${topProduct.name} - ${topProduct.quantity} cái` : 'Chưa có dữ liệu'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
