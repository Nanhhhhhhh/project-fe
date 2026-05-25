import { TrendingUp, ShoppingCart, Users, Package, AlertCircle } from 'lucide-react';

export default function StaffDashboard() {
  const stats = [
    { label: 'Đơn hàng hôm nay', value: '12', icon: ShoppingCart, color: 'bg-blue-100 text-blue-600' },
    { label: 'Khách hàng mới', value: '8', icon: Users, color: 'bg-purple-100 text-purple-600' },
    { label: 'Yêu cầu hỗ trợ', value: '5', icon: AlertCircle, color: 'bg-red-100 text-red-600' },
    { label: 'Requests chờ duyệt', value: '3', icon: Package, color: 'bg-yellow-100 text-yellow-600' },
  ];

  const myTasks = [
    { task: 'Xử lý yêu cầu hỗ trợ #YC001', status: 'Đang xử lý', priority: 'Cao' },
    { task: 'Cập nhật thông tin KH #KH045', status: 'Chờ duyệt', priority: 'Trung bình' },
    { task: 'Xác nhận đơn hàng #DH123', status: 'Hoàn thành', priority: 'Thấp' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl mb-2">Dashboard Nhân Viên</h2>
        <p className="text-gray-600">Chào mừng trở lại! Đây là tổng quan công việc của bạn.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-2xl mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-8">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-900 mb-1">Lưu ý quan trọng</h3>
            <p className="text-sm text-yellow-800">
              Các thao tác thêm/sửa/xóa trên Khách hàng, Sản phẩm và Khuyến mãi sẽ được gửi đến Quản lý để xét duyệt. 
              Bạn có thể theo dõi trạng thái các request của mình tại mục "Requests của tôi".
            </p>
          </div>
        </div>
      </div>

      {/* My Tasks */}
      <div className="bg-white p-6 border border-gray-200 rounded-lg">
        <h3 className="text-xl mb-4">Công Việc Của Tôi</h3>
        <div className="space-y-3">
          {myTasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded hover:bg-gray-50">
              <div className="flex-1">
                <p className="font-medium mb-1">{task.task}</p>
                <div className="flex items-center gap-3 text-sm">
                  <span className={`px-2 py-1 rounded text-xs ${
                    task.status === 'Hoàn thành' ? 'bg-green-100 text-green-800' :
                    task.status === 'Đang xử lý' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status}
                  </span>
                  <span className="text-gray-600">Độ ưu tiên: {task.priority}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
