import { useState } from 'react';
import { User, Lock, Mail, Phone, LogOut } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import { useNavigate } from 'react-router';

export default function AdminAccount() {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [accountForm, setAccountForm] = useState({
    fullName: user?.ho_ten || '',
    email: user?.email || '',
    phone: user?.so_dien_thoai || '',
  });

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const handleUpdateInfo = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Cập nhật thông tin thành công!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    alert('Đổi mật khẩu thành công!');
    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl">Quản Lý Tài Khoản</h2>
        <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded">
            <LogOut className="w-5 h-5" />
            Đăng xuất
        </button>
      </div>

      <div className="max-w-2xl">
        {/* Account Info */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Thông Tin Tài Khoản
          </h3>
          <form onSubmit={handleUpdateInfo} className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Họ và tên</label>
              <input
                type="text"
                value={accountForm.fullName}
                onChange={(e) => setAccountForm({ ...accountForm, fullName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                value={accountForm.email}
                onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Số điện thoại
              </label>
              <input
                type="tel"
                value={accountForm.phone}
                onChange={(e) => setAccountForm({ ...accountForm, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors"
            >
              Cập nhật thông tin
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Đổi Mật Khẩu
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Để bảo mật tài khoản, vui lòng đổi mật khẩu định kỳ và sử dụng mật khẩu mạnh.
          </p>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="border-2 border-black px-6 py-2 hover:bg-black hover:text-white transition-colors"
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-2xl mb-4">Đổi Mật Khẩu</h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Mật khẩu hiện tại *</label>
                <input
                  type="password"
                  required
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Mật khẩu mới *</label>
                <input
                  type="password"
                  required
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Xác nhận mật khẩu mới *</label>
                <input
                  type="password"
                  required
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-2 hover:bg-gray-800"
                >
                  Đổi mật khẩu
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 border border-gray-300 py-2 hover:bg-gray-100"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
