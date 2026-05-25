import { useState } from 'react';
import { User, Lock, Save, LogOut } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import { useNavigate } from 'react-router';

export default function StaffAccount() {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  
  const [profile, setProfile] = useState({
    ho_ten: user?.ho_ten || '',
    email: user?.email || '',
    so_dien_thoai: user?.so_dien_thoai || '',
    dia_chi: user?.dia_chi || '',
    ngay_vao_lam: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const handleUpdateProfile = () => {
    alert('Đã cập nhật thông tin cá nhân!');
  };

  const handleChangePassword = () => {
    if (!password.current || !password.new || !password.confirm) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (password.new !== password.confirm) {
      alert('Mật khẩu mới không khớp');
      return;
    }
    alert('Đã đổi mật khẩu thành công!');
    setPassword({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl">Tài Khoản Của Tôi</h2>
        <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded">
            <LogOut className="w-5 h-5" />
            Đăng xuất
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Info */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6" />
            <h3 className="text-xl">Thông Tin Cá Nhân</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Họ và tên</label>
              <input
                type="text"
                value={profile.ho_ten}
                onChange={(e) => setProfile({ ...profile, ho_ten: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Số điện thoại</label>
              <input
                type="tel"
                value={profile.so_dien_thoai}
                onChange={(e) => setProfile({ ...profile, so_dien_thoai: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Địa chỉ</label>
              <input
                type="text"
                value={profile.dia_chi}
                onChange={(e) => setProfile({ ...profile, dia_chi: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Ngày vào làm</label>
              <input
                type="text"
                value={profile.ngay_vao_lam}
                disabled
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50"
              />
            </div>
            <button
              onClick={handleUpdateProfile}
              className="w-full bg-black text-white py-2 hover:bg-gray-800 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Cập nhật thông tin
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6" />
            <h3 className="text-xl">Đổi Mật Khẩu</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Mật khẩu hiện tại</label>
              <input
                type="password"
                value={password.current}
                onChange={(e) => setPassword({ ...password, current: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Mật khẩu mới</label>
              <input
                type="password"
                value={password.new}
                onChange={(e) => setPassword({ ...password, new: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Xác nhận mật khẩu mới</label>
              <input
                type="password"
                value={password.confirm}
                onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <button
              onClick={handleChangePassword}
              className="w-full bg-black text-white py-2 hover:bg-gray-800"
            >
              Đổi mật khẩu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
