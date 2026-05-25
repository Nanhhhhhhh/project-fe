import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Heart, Filter, Search } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { productService } from '../../api/services/product.service';

export default function ProductList() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAll();
        setProducts(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getGenderText = (genderCode: number) => {
    if (genderCode === 1) return 'Nam';
    if (genderCode === 2) return 'Nữ';
    if (genderCode === 3) return 'Unisex';
    return '';
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategory && product.danh_muc !== selectedCategory) return false;
    if (selectedGender && getGenderText(product.gioi_tinh) !== selectedGender) return false;
    if (search && !product.ten_san_pham?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-4">Sản Phẩm</h1>
          <p className="text-gray-600">Khám phá bộ sưu tập thời trang cao cấp</p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-6 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
          >
            <Filter className="w-5 h-5" />
            Bộ Lọc
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-8 p-4 bg-gray-50 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-2">Danh mục</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Tất cả</option>
                  <option value="Áo">Áo</option>
                  <option value="Quần">Quần</option>
                  <option value="Váy">Váy</option>
                  <option value="Phụ kiện">Phụ kiện</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Giới tính</label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Tất cả</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Sắp xếp</label>
                <select className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black">
                  <option value="default">Mặc định</option>
                  <option value="price-low">Giá: Thấp đến cao</option>
                  <option value="price-high">Giá: Cao đến thấp</option>
                  <option value="newest">Mới nhất</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-8">
            <p>Đang tải...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <p>Không tìm thấy sản phẩm nào.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link key={product._id} to={`/products/${product._id}`} className="group">
                <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                  <ImageWithFallback
                    src={product.bien_the?.[0]?.hinh_anh}
                    alt={product.ten_san_pham}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="mb-1 text-gray-900">{product.ten_san_pham}</h3>
                <p className="text-gray-900">{(product.bien_the?.[0]?.gia_ban || 0).toLocaleString()}đ</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
