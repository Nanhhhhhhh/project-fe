import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Trash2, Plus, Minus, Search } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { cartService } from '../../api/services/cart.service';
import { productService } from '../../api/services/product.service';
import { useAuthStore } from '../../store/useAuthStore';

interface CartItem {
  variantId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  image: string;
}

export default function Cart() {
  const { isAuthenticated } = useAuthStore();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const fetchCartData = async () => {
    if (!isAuthenticated()) {
      setError("Vui lòng đăng nhập để xem giỏ hàng");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [cartRes, productsRes] = await Promise.all([
        cartService.getCart(),
        productService.getAll()
      ]);

      const items: CartItem[] = [];
      const cartItemsData = cartRes.items || [];

      cartItemsData.forEach((item: any) => {
        const product = productsRes.find((p: any) =>
          p.bien_the && p.bien_the.some((v: any) => v._id === item.ma_sp_chi_tiet)
        );

        if (product) {
          const variant = product.bien_the.find((v: any) => v._id === item.ma_sp_chi_tiet);
          if (variant) {
            items.push({
              variantId: item.ma_sp_chi_tiet,
              productId: product._id,
              name: product.ten_san_pham,
              price: variant.gia_ban,
              quantity: item.so_luong,
              color: variant.mau_sac,
              size: variant.kich_co,
              image: variant.hinh_anh || ''
            });
          }
        }
      });

      setCartItems(items);
      // On initial load select all; on re-fetch preserve existing selection
      setSelectedItems(prev =>
        prev.length === 0
          ? items.map(i => i.variantId)
          : items.map(i => i.variantId).filter(id => prev.includes(id))
      );
      setError(null);
    } catch (err: any) {
      console.error('Error fetching cart:', err);
      setError("Không thể tải giỏ hàng. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleUpdateQuantity = async (variantId: string, qty: number) => {
    try {
      await cartService.updateItem(variantId, qty);
      await fetchCartData();
    } catch (err) {
      console.error(err);
      alert("Cập nhật số lượng thất bại");
    }
  };

  const handleRemoveItem = async (variantId: string) => {
    try {
      await cartService.removeItem(variantId);
      await fetchCartData();
    } catch (err) {
      console.error(err);
      alert("Xóa sản phẩm thất bại");
    }
  };

  const filteredCartItems = cartItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleItem = (variantId: string) => {
    setSelectedItems(prev =>
      prev.includes(variantId) ? prev.filter(id => id !== variantId) : [...prev, variantId]
    );
  };

  const handleToggleAll = () => {
    setSelectedItems(prev =>
      prev.length === filteredCartItems.length ? [] : filteredCartItems.map(item => item.variantId)
    );
  };

  const selectedCartItems = filteredCartItems.filter(item => selectedItems.includes(item.variantId));
  const subtotal = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = selectedCartItems.length > 0 ? 30000 : 0;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="py-8 min-h-screen flex items-center justify-center">
        <p className="text-xl">Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-red-600 mb-4">{error}</p>
        <Link to="/login" className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors">
          ĐĂNG NHẬP
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl mb-8">Giỏ Hàng</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Giỏ hàng của bạn đang trống</p>
            <Link to="/products" className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors">
              TIẾP TỤC MUA SẮM
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Search Box */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm trong giỏ hàng..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Select All */}
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
                <input
                  type="checkbox"
                  checked={selectedItems.length === filteredCartItems.length && filteredCartItems.length > 0}
                  onChange={handleToggleAll}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Chọn tất cả ({filteredCartItems.length} sản phẩm)</span>
              </div>

              {filteredCartItems.map((item) => (
                <div key={item.variantId} className="flex gap-4 border border-gray-200 p-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.variantId)}
                    onChange={() => handleToggleItem(item.variantId)}
                    className="w-5 h-5 mt-1 flex-shrink-0"
                  />
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-100">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Link to={`/products/${item.productId}`} className="hover:text-gray-600">
                      <h3 className="mb-1">{item.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.color} / {item.size}
                    </p>
                    <p className="mb-2">{item.price.toLocaleString()}đ</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300">
                        <button
                          className="px-3 py-1 hover:bg-gray-100"
                          onClick={() => {
                            if (item.quantity > 1) {
                              handleUpdateQuantity(item.variantId, item.quantity - 1);
                            } else {
                              handleRemoveItem(item.variantId);
                            }
                          }}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-1 border-x border-gray-300">{item.quantity}</span>
                        <button
                          className="px-3 py-1 hover:bg-gray-100"
                          onClick={() => handleUpdateQuantity(item.variantId, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.variantId)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p>{(item.price * item.quantity).toLocaleString()}đ</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-gray-200 p-6 sticky top-24">
                <h2 className="text-xl mb-4">Tóm Tắt Đơn Hàng</h2>
                <div className="mb-4 p-3 bg-gray-50 text-sm">
                  <p>Đã chọn {selectedItems.length} / {cartItems.length} sản phẩm</p>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính</span>
                    <span>{subtotal.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span>{shipping.toLocaleString()}đ</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between text-lg">
                    <strong>Tổng cộng</strong>
                    <strong>{total.toLocaleString()}đ</strong>
                  </div>
                </div>
                {selectedItems.length > 0 ? (
                  <Link
                    to="/checkout"
                    className="block w-full bg-black text-white text-center py-3 hover:bg-gray-800 transition-colors mb-2"
                  >
                    THANH TOÁN
                  </Link>
                ) : (
                  <button
                    disabled
                    className="block w-full bg-gray-300 text-gray-500 text-center py-3 cursor-not-allowed mb-2"
                  >
                    THANH TOÁN
                  </button>
                )}
                <Link
                  to="/products"
                  className="block w-full border-2 border-black text-center py-3 hover:bg-black hover:text-white transition-colors"
                >
                  TIẾP TỤC MUA SẮM
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
