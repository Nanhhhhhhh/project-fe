import { Outlet, Link, NavLink, useNavigate } from 'react-router';
import { LayoutDashboard, Users, Package, ShoppingCart, Tag, UserCog, HeadphonesIcon, LogOut, User } from 'lucide-react';
import logoImage from 'figma:asset/6d1634c1570e980745f399e4776f353cbed86b3c.png';
import { useAuthStore } from '../../store/useAuthStore';

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/customers', icon: Users, label: 'Quản lý khách hàng' },
    { to: '/admin/orders', icon: ShoppingCart, label: 'Quản lý đơn hàng' },
    { to: '/admin/products', icon: Package, label: 'Quản lý sản phẩm' },
    { to: '/admin/promotions', icon: Tag, label: 'Quản lý khuyến mãi' },
    { to: '/admin/staff', icon: UserCog, label: 'Quản lý nhân viên' },
    { to: '/admin/support', icon: HeadphonesIcon, label: 'Hỗ trợ CSKH' },
    { to: '/admin/account', icon: User, label: 'Quản lý tài khoản' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logoImage} alt="Wolf Logo" className="w-10 h-10 object-contain" />
            <span className="font-serif text-xl">WOLFASHION</span>
          </Link>
          <p className="text-sm text-gray-600 mt-2">Quản trị viên</p>
        </div>

        <nav className="p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Về trang chủ
            </Link>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
              Đăng xuất
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Quản Trị Hệ Thống</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user?.ho_ten || 'Admin User'}</span>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center uppercase">
                {user?.ho_ten?.[0] || 'A'}
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}