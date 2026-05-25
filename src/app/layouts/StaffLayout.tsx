import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Package, 
  Tag, 
  HeadphonesIcon,
  User,
  LogOut,
  Menu,
  X,
  Clock
} from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

export default function StaffLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const navigation = [
    { name: 'Đơn hàng', href: '/staff/orders', icon: ShoppingCart },
    { name: 'Khách hàng', href: '/staff/customers', icon: Users },
    { name: 'Sản phẩm', href: '/staff/products', icon: Package },
    { name: 'Khuyến mãi', href: '/staff/promotions', icon: Tag },
    { name: 'Hỗ trợ CSKH', href: '/staff/support', icon: HeadphonesIcon },
    { name: 'Tài khoản', href: '/staff/account', icon: User },
  ];

  const isActive = (path: string) => {
    if (path === '/staff/orders') {
      return location.pathname === '/staff' || location.pathname === '/staff/orders';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-black text-white p-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-800 rounded"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link to="/staff" className="text-2xl" style={{ fontFamily: 'Playfair Display' }}>
              WOLFASHION
            </Link>
            <span className="text-sm bg-gray-800 px-2 py-1 rounded">Nhân viên</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Xin chào, {user?.ho_ten || 'Nhân viên'}</span>
            <button onClick={handleLogout} className="p-2 hover:bg-gray-800 rounded">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 
          transition-transform lg:translate-x-0 z-30
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <nav className="p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
