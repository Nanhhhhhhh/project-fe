import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { authService } from '../../api/services/auth.service';
import { useAuthStore } from '../../store/useAuthStore';
import logoImage from 'figma:asset/6d1634c1570e980745f399e4776f353cbed86b3c.png';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'employee' | 'admin'>('customer');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let data;
      const credentials = { email, pass: password };
      
      if (role === 'admin') {
        data = await authService.loginAdmin(credentials);
      } else if (role === 'employee') {
        data = await authService.loginEmployee(credentials);
      } else {
        data = await authService.loginCustomer(credentials);
      }

      setAuth(data.access_token, data.user);
      
      // Redirect based on role
      if (role === 'admin') navigate('/admin');
      else if (role === 'employee') navigate('/staff');
      else navigate('/');
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3">
            <img src={logoImage} alt="Wolf Logo" className="w-16 h-16 object-contain" />
            <span className="font-serif text-3xl">WOLFASHION</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-center transition-colors ${
                isLogin
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Đăng Nhập
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-center transition-colors ${
                !isLogin
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Đăng Ký
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          {/* Login Form */}
          {isLogin ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Đăng nhập với vai trò</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'customer' | 'employee' | 'admin')}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white"
                >
                  <option value="customer">Khách hàng (Customer)</option>
                  <option value="employee">Nhân viên (Employee)</option>
                  <option value="admin">Quản trị viên (Admin)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Mật khẩu</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
                </label>
                <a href="#" className="text-sm text-gray-600 hover:text-black">
                  Quên mật khẩu?
                </a>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors disabled:bg-gray-400"
              >
                {isLoading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG NHẬP'}
              </button>
            </form>
          ) : (
            /* Register Form */
            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Họ và tên</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Số điện thoại</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="0901234567"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Mật khẩu</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors"
              >
                ĐĂNG KÝ
              </button>
            </form>
          )}
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-600 hover:text-black">
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
