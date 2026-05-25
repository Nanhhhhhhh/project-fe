import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { productService } from '../../api/services/product.service';
import { cartService } from '../../api/services/cart.service';
import { useAuthStore } from '../../store/useAuthStore';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const data = await productService.getOne(id as string);
        setProduct(data);
        
        const uniqueSizes = [...new Set((data?.bien_the || []).map((v: any) => v.kich_co))] as string[];
        const uniqueColors = [...new Set((data?.bien_the || []).map((v: any) => v.mau_sac))] as string[];
        
        if (uniqueSizes.length > 0) setSelectedSize(uniqueSizes[0]);
        if (uniqueColors.length > 0) setSelectedColor(uniqueColors[0]);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const uniqueSizes = [...new Set((product?.bien_the || []).map((v: any) => v.kich_co))] as string[];
  const uniqueColors = [...new Set((product?.bien_the || []).map((v: any) => v.mau_sac))] as string[];

  const selectedVariant = product?.bien_the?.find(
    (v: any) => v.mau_sac === selectedColor && v.kich_co === selectedSize
  ) || product?.bien_the?.[0];

  const handleAddToCart = async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated()) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      navigate('/login');
      return;
    }
    if (!selectedVariant) {
      alert('Vui lòng chọn màu sắc và kích cỡ');
      return;
    }
    if (selectedVariant.so_luong_ton < quantity) {
      alert('Số lượng vượt quá tồn kho');
      return;
    }
    setAddingToCart(true);
    try {
      await cartService.addItem(selectedVariant._id, quantity);
      alert('Đã thêm vào giỏ hàng!');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Không thể thêm vào giỏ hàng');
    } finally {
      setAddingToCart(false);
    }
  };

  const reviews = [
    { id: 1, name: 'Nguyễn Thị A', rating: 5, comment: 'Sản phẩm đẹp, chất lượng tốt!', date: '2026-03-15' },
    { id: 2, name: 'Trần Văn B', rating: 4, comment: 'Giao hàng nhanh, đóng gói cẩn thận', date: '2026-03-10' },
  ];

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-8 text-center">
        <p>Không tìm thấy sản phẩm.</p>
        <Link to="/products" className="text-blue-600 hover:underline">Quay lại danh sách</Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-black">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-black">Sản phẩm</Link>
          <span className="mx-2">/</span>
          <span className="text-black">{product.ten_san_pham}</span>
        </div>

        {/* Product Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div>
            <div className="aspect-square bg-gray-100 mb-4">
              <ImageWithFallback
                src={selectedVariant?.hinh_anh || product.hinh_anh || "https://images.unsplash.com/photo-1767439567342-15fcbae8fdf8?w=800"}
                alt={product.ten_san_pham}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 cursor-pointer hover:opacity-75">
                  <ImageWithFallback
                    src={selectedVariant?.hinh_anh || product.hinh_anh || `https://images.unsplash.com/photo-1767439567342-15fcbae8fdf8?w=200&h=200&fit=crop&crop=center&q=80&sig=${i}`}
                    alt={`Thumbnail ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl mb-2">{product.ten_san_pham}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-gray-600">(24 đánh giá)</span>
              </div>
              <span className="text-sm text-gray-600">Mã SP: {product.ma_san_pham}</span>
            </div>

            <p className="text-3xl mb-6">{selectedVariant?.gia_ban?.toLocaleString() || 0}đ</p>

            <p className="text-gray-600 mb-6">
              {product.mo_ta || 'Thông tin mô tả đang được cập nhật.'}
            </p>

            {/* Size */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Kích cỡ</label>
              <div className="flex gap-2">
                {uniqueSizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 transition-colors ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Màu sắc</label>
              <div className="flex gap-2">
                {uniqueColors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border-2 transition-colors ${
                      selectedColor === color
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">Số lượng</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x-2 border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">Còn {selectedVariant?.so_luong_ton || 0} sản phẩm</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart || (selectedVariant?.so_luong_ton || 0) === 0}
                className="flex-1 bg-black text-white py-3 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
              >
                <ShoppingBag className="w-5 h-5" />
                {addingToCart ? 'ĐANG THÊM...' : (selectedVariant?.so_luong_ton || 0) === 0 ? 'HẾT HÀNG' : 'THÊM VÀO GIỎ'}
              </button>
              <button className="px-6 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Info */}
            <div className="border-t border-gray-200 pt-6 space-y-2 text-sm text-gray-600">
              <p><strong>Loại sản phẩm:</strong> {product.danh_muc || product.loai_san_pham}</p>
              <p><strong>Giới tính:</strong> {product.gioi_tinh === 1 ? 'Nam' : product.gioi_tinh === 2 ? 'Nữ' : 'Unisex'}</p>
              <p><strong>Thương hiệu:</strong> {product.thuong_hieu || 'WOLFASHION'}</p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl mb-6">Đánh Giá Sản Phẩm</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <strong>{review.name}</strong>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
