import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { productService } from '../../api/services/product.service';

function Hero() {
  return (
    <section className="relative h-[600px] bg-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1617790274211-cbe0e677b425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
          alt="Hero Banner"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl mb-6 text-white tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            Bộ Sưu Tập Mới<br />
            <span className="italic font-light" style={{ fontFamily: 'Playfair Display, serif' }}>Xuân Hè 2026</span>
          </h1>
          <p className="text-lg text-gray-200 mb-8 max-w-lg">
            Khám phá những thiết kế sang trọng, tinh tế and đầy cá tính.
            Nơi phong cách gặp gỡ sự thanh lịch.
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-black px-8 py-3 hover:bg-gray-100 transition-colors">
              KHÁM PHÁ NGAY
            </button>
            <button className="border-2 border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-colors">
              XEM BỘ SƯU TẬP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Collections() {
  const collections = [
    {
      id: 1,
      title: 'THỜI TRANG NỮ',
      subtitle: 'Sang trọng & Thanh lịch',
      image: 'https://images.unsplash.com/photo-1712570430583-b6f11f333bcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    },
    {
      id: 2,
      title: 'THỜI TRANG NAM',
      subtitle: 'Lịch lãm & Hiện đại',
      image: 'https://images.unsplash.com/photo-1770181246234-013905919a5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    },
    {
      id: 3,
      title: 'PHỤ KIỆN',
      subtitle: 'Hoàn thiện phong cách',
      image: 'https://images.unsplash.com/photo-1694293086610-cd80d383e303?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">Danh Mục Sản Phẩm</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá các bộ sưu tập được tuyển chọn kỹ lưỡng, mang đến cho bạn những xu hướng thời trang mới nhất
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <ImageWithFallback
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl mb-1">{collection.title}</h3>
                <p className="text-gray-200 text-sm">{collection.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAll();
        setProducts(data.data || data || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-white text-center">
        <p>Đang tải sản phẩm...</p>
      </section>
    );
  }

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
            <div key={product.ma_san_pham} className="group">
              <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                <ImageWithFallback
                  src={product.hinh_anh || "https://images.unsplash.com/photo-1767439567342-15fcbae8fdf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500"}
                  alt={product.ten_san_pham}
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
              <h3 className="mb-1 text-gray-900">{product.ten_san_pham}</h3>
              <p className="text-gray-900">{product.gia_ban?.toLocaleString()}đ</p>
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

function Newsletter() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl mb-4 text-white">
          Đăng Ký Nhận Tin Mới Nhất
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Cập nhật những bộ sưu tập mới nhất, ưu đãi độc quyền và xu hướng thời trang
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Nhập địa chỉ email của bạn"
            className="flex-1 px-6 py-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="bg-white text-black px-8 py-3 hover:bg-gray-100 transition-colors whitespace-nowrap">
            ĐĂNG KÝ
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <Products />
      <Newsletter />
    </>
  );
}
