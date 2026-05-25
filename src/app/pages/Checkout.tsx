import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Tag } from 'lucide-react';
import { cartService } from '../../api/services/cart.service';
import { orderService } from '../../api/services/order.service';
import { productService } from '../../api/services/product.service';
import { useAuthStore } from '../../store/useAuthStore';
import axiosInstance from '../../api/axiosInstance';

interface CartItem {
  variantId: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  image: string;
}

interface Promotion {
  id: number;
  code: string;
  name: string;
  type: string;
  value: number;
  minOrder: number;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<number>(1);
  const [selectedPromotion, setSelectedPromotion] = useState<number | null>(null);

  const fetchCheckoutData = async () => {
    if (!isAuthenticated()) {
      alert("Vui lòng đăng nhập để thanh toán");
      navigate('/login');
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
      
      // Fetch promotions
      try {
        const promoRes = await axiosInstance.get('/promotions');
        setPromotions(promoRes.data || []);
      } catch (err) {
        console.error('Lỗi khi tải khuyến mãi:', err);
        setPromotions([]);
      }
      
    } catch (err: any) {
      console.error('Error fetching checkout data:', err);
      alert("Không thể tải thông tin thanh toán. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let shippingFee = 30000;
  let discount = 0;

  if (selectedPromotion) {
    const promo = promotions.find(p => p.id === selectedPromotion);
    if (promo && subtotal >= promo.minOrder) {
      if (promo.type === 'percent') {
        discount = Math.floor(subtotal * promo.value / 100);
      } else if (promo.type === 'fixed') {
        discount = promo.value;
      } else if (promo.type === 'shipping') {
        shippingFee = 0;
        discount = promo.value;
      }
    }
  }

  const total = subtotal + shippingFee - discount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      alert("Vui lòng nhập địa chỉ giao hàng");
      return;
    }
    if (cartItems.length === 0) {
      alert("Giỏ hàng trống, vui lòng thêm sản phẩm trước khi đặt hàng");
      return;
    }
    
    setSubmitting(true);
    try {
      await orderService.placeOrder({
        dia_chi_nhan: address,
        ghi_chu: notes,
        phuong_thuc_thanh_toan: paymentMethod,
      });
      alert("Đặt hàng thành công!");
      navigate("/");
    } catch (error: any) {
      console.error('Submit order error:', error);
      alert(error?.response?.data?.message || "Lỗi khi đặt hàng");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-8 min-h-screen flex items-center justify-center">
        <p className="text-xl">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="py-8 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl mb-8">Thanh Toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="bg-white p-6 border border-gray-200">
              <h2 className="text-xl mb-4">Thông Tin Giao Hàng</h2>
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Địa chỉ giao hàng *</label>
                  <textarea
                    required
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Ghi chú (tùy chọn)</label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn"
                  />
                </div>
              </form>
            </div>

            {/* Promotion Code */}
            <div className="bg-white p-6 border border-gray-200">
              <h2 className="text-xl mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Mã Khuyến Mãi
              </h2>
              <div className="space-y-3">
                {promotions.length === 0 && (
                  <p className="text-gray-500 text-sm">Không có mã khuyến mãi nào.</p>
                )}
                {promotions.map((promo) => {
                  const isEligible = subtotal >= promo.minOrder;
                  return (
                    <label
                      key={promo.id}
                      className={`flex items-start gap-3 p-4 border-2 cursor-pointer transition-colors ${
                        isEligible
                          ? 'border-gray-200 hover:border-black'
                          : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                      } ${selectedPromotion === promo.id ? 'border-black bg-gray-50' : ''}`}
                    >
                      <input
                        type="radio"
                        name="promotion"
                        value={promo.id}
                        checked={selectedPromotion === promo.id}
                        onChange={() => setSelectedPromotion(isEligible ? promo.id : null)}
                        disabled={!isEligible}
                        className="w-4 h-4 mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{promo.code}</span>
                          <span className="text-sm px-2 py-0.5 bg-red-100 text-red-600 rounded">
                            {promo.name}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Đơn hàng tối thiểu: {promo.minOrder.toLocaleString()}đ
                        </div>
                        {!isEligible && (
                          <div className="text-sm text-red-600 mt-1">
                            Không đủ điều kiện áp dụng
                          </div>
                        )}
                      </div>
                    </label>
                  );
                })}
                {promotions.length > 0 && (
                  <button
                    onClick={() => setSelectedPromotion(null)}
                    type="button"
                    className="text-sm text-gray-600 hover:text-black mt-2 inline-block"
                  >
                    Bỏ chọn mã khuyến mãi
                  </button>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 border border-gray-200">
              <h2 className="text-xl mb-4">Phương Thức Thanh Toán</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 cursor-pointer hover:border-black transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value={1}
                    checked={paymentMethod === 1}
                    onChange={(e) => setPaymentMethod(Number(e.target.value))}
                    className="w-4 h-4"
                  />
                  <div>
                    <div>Thanh toán khi nhận hàng (COD)</div>
                    <div className="text-sm text-gray-600">Thanh toán bằng tiền mặt khi nhận hàng</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 cursor-pointer hover:border-black transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value={2}
                    checked={paymentMethod === 2}
                    onChange={(e) => setPaymentMethod(Number(e.target.value))}
                    className="w-4 h-4"
                  />
                  <div>
                    <div>Chuyển khoản ngân hàng</div>
                    <div className="text-sm text-gray-600">Chuyển khoản trực tiếp vào tài khoản ngân hàng</div>
                  </div>
                </label>
              </div>

              {paymentMethod === 2 && (
                <div className="mt-4 p-4 bg-gray-50 text-sm">
                  <p className="mb-2"><strong>Thông tin chuyển khoản:</strong></p>
                  <p>Ngân hàng: Vietcombank</p>
                  <p>Số tài khoản: 1234567890</p>
                  <p>Chủ tài khoản: CÔNG TY WOLFASHION</p>
                  <p className="mt-2 text-red-600">Nội dung: [Số điện thoại] - [Họ tên]</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 border border-gray-200 sticky top-24">
              <h2 className="text-xl mb-4">Đơn Hàng</h2>
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                {cartItems.map(item => (
                  <div key={item.variantId} className="flex justify-between text-sm">
                    <span className="pr-2">{item.name} ({item.color}/{item.size}) × {item.quantity}</span>
                    <span className="whitespace-nowrap">{(item.price * item.quantity).toLocaleString()}đ</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Thành tiền</span>
                  <span>{subtotal.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span className={shippingFee === 0 ? 'line-through' : ''}>{shippingFee === 0 ? '30.000đ' : shippingFee.toLocaleString() + 'đ'}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-red-600">
                    <span>Giá giảm</span>
                    <span>-{discount.toLocaleString()}đ</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 flex justify-between text-lg">
                  <strong>Tổng tiền</strong>
                  <strong>{total.toLocaleString()}đ</strong>
                </div>
              </div>
              <button
                type="submit"
                form="checkout-form"
                disabled={submitting}
                className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors mb-2 disabled:bg-gray-400"
              >
                {submitting ? 'ĐANG XỬ LÝ...' : 'ĐẶT HÀNG'}
              </button>
              <Link
                to="/cart"
                className="block text-center text-sm text-gray-600 hover:text-black"
              >
                ← Quay lại giỏ hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
