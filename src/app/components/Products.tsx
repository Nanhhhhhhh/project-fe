import { Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const products = [
  {
    id: 1,
    name: 'Váy Trắng Dài Tay',
    price: '2.890.000',
    image: 'https://images.unsplash.com/photo-1767439567342-15fcbae8fdf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500',
    tag: 'MỚI',
  },
  {
    id: 2,
    name: 'Áo Xanh & Váy Đen',
    price: '3.290.000',
    image: 'https://images.unsplash.com/photo-1704775986647-b2fd38120e9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500',
    tag: 'BÁN CHẠY',
  },
  {
    id: 3,
    name: 'Set Áo Xám Thanh Lịch',
    price: '2.590.000',
    image: 'https://images.unsplash.com/photo-1704775989090-452868cbeb75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500',
  },
  {
    id: 4,
    name: 'Jumpsuit Hoa Nhí',
    price: '3.490.000',
    image: 'https://images.unsplash.com/photo-1764583473832-0a439620990f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500',
    tag: 'MỚI',
  },
  {
    id: 5,
    name: 'Set Áo Tím & Quần Trắng',
    price: '2.790.000',
    image: 'https://images.unsplash.com/photo-1704775991545-fc0507822fea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500',
  },
  {
    id: 6,
    name: 'Set Áo Be Thanh Lịch',
    price: '3.190.000',
    image: 'https://images.unsplash.com/photo-1768825182160-d5481c5ebd19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500',
    tag: 'BÁN CHẠY',
  },
];

export default function Products() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl mb-2">Sản Phẩm Nổi Bật</h2>
            <p className="text-gray-600">
              Những món đồ được yêu thích nhất trong mùa này
            </p>
          </div>
          <button className="hidden md:block border-2 border-black px-6 py-2 hover:bg-black hover:text-white transition-colors">
            XEM TẤT CẢ
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.tag && (
                  <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs">
                    {product.tag}
                  </span>
                )}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="absolute bottom-4 left-4 right-4 bg-white text-black py-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
                  THÊM VÀO GIỎ
                </button>
              </div>
              <h3 className="mb-1 text-gray-900">{product.name}</h3>
              <p className="text-gray-900">{product.price}đ</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <button className="border-2 border-black px-8 py-3 hover:bg-black hover:text-white transition-colors w-full sm:w-auto">
            XEM TẤT CẢ SẢN PHẨM
          </button>
        </div>
      </div>
    </section>
  );
}
