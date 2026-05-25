import { Search, ShoppingBag, User, Menu } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1689631281261-9b5db581168e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200"
              alt="Wolf Logo"
              className="w-12 h-12 object-cover rounded-full"
            />
            <span className="font-serif text-2xl tracking-wide">WOLFASHION</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors">
              TRANG CHỦ
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              GIỚI THIỆU
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              SẢN PHẨM
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              BỘ SƯU TẬP
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              TIN TỨC
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              LIÊN HỆ
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5 text-gray-600" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            <button className="p-2 md:hidden hover:bg-gray-100 rounded-full transition-colors">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
