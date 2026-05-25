import { Outlet, Link } from 'react-router';
import { Search, ShoppingBag, User, Menu, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import logoImage from 'figma:asset/6d1634c1570e980745f399e4776f353cbed86b3c.png';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img src={logoImage} alt="Wolf Logo" className="w-12 h-12 object-contain" />
              <span className="font-serif text-2xl tracking-wide">WOLFASHION</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-900 hover:text-gray-600 transition-colors">
                TRANG CHỦ
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-gray-900 transition-colors">
                SẢN PHẨM
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                GIỚI THIỆU
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                LIÊN HỆ
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className="w-5 h-5 text-gray-600" />
              </Link>
              <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <ShoppingBag className="w-5 h-5 text-gray-600" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
              <button className="p-2 md:hidden hover:bg-gray-100 rounded-full transition-colors">
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <img src={logoImage} alt="Wolf Logo" className="w-12 h-12 object-contain" />
                <span className="font-serif text-xl">WOLFASHION</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Nơi phong cách gặp gỡ sự sang trọng. Khám phá vẻ đẹp thanh lịch và đầy cá tính.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4">Liên Kết Nhanh</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><Link to="/about" className="hover:text-gray-900 transition-colors">Giới Thiệu</Link></li>
                <li><Link to="/products" className="hover:text-gray-900 transition-colors">Sản Phẩm</Link></li>
                <li><Link to="/contact" className="hover:text-gray-900 transition-colors">Liên Hệ</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="mb-4">Hỗ Trợ Khách Hàng</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Chính Sách Đổi Trả</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Hướng Dẫn Mua Hàng</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Phương Thức Thanh Toán</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4">Liên Hệ</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>1900 8386</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>contact@wolfashion.vn</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-600 text-sm">
              © 2026 WOLFASHION. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
