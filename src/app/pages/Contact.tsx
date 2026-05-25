import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Contact() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6">Liên Hệ</h1>
          <p className="text-xl text-gray-600">
            Hãy để WOLFASHION đồng hành cùng phong cách của bạn
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl mb-8">Thông Tin Liên Hệ</h2>

            <div className="space-y-6">
              {/* Hotline */}
              <div className="flex items-start space-x-4 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Hotline</h3>
                  <p className="text-2xl font-medium text-black">1900 8386</p>
                  <p className="text-sm text-gray-600 mt-1">Hỗ trợ 24/7</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Email</h3>
                  <a
                    href="mailto:contact@wolfashion.vn"
                    className="text-xl font-medium text-black hover:text-gray-600 transition-colors"
                  >
                    contact@wolfashion.vn
                  </a>
                  <p className="text-sm text-gray-600 mt-1">Phản hồi trong vòng 24h</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Địa chỉ cửa hàng</h3>
                  <p className="text-gray-700 leading-relaxed">
                    123 Đường Lê Lợi, Quận 1<br />
                    TP. Hồ Chí Minh, Việt Nam
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-4 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Giờ làm việc</h3>
                  <p className="text-gray-700">
                    <strong>Thứ 2 - Thứ 7:</strong> 9:00 - 21:00<br />
                    <strong>Chủ nhật:</strong> 10:00 - 20:00
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Kết nối với chúng tôi</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com/wolfashion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com/wolfashion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://youtube.com/@wolfashion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl mb-8">Gửi Tin Nhắn</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm mb-2">Họ và tên *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Nhập họ và tên của bạn"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Email *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Nhập email của bạn"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Nhập số điện thoại của bạn"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Tiêu đề *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Tiêu đề tin nhắn"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Nội dung *</label>
                <textarea
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  placeholder="Nhập nội dung tin nhắn của bạn"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-4 hover:bg-gray-800 transition-colors text-lg"
              >
                GỬI TIN NHẮN
              </button>

              <p className="text-sm text-gray-600 text-center">
                * Thông tin bắt buộc
              </p>
            </form>
          </div>
        </div>

        {/* Map or Additional Info */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="bg-gray-50 p-8 border border-gray-200 rounded-lg">
            <h3 className="text-2xl mb-4 text-center">Câu hỏi thường gặp</h3>
            <div className="max-w-3xl mx-auto space-y-4">
              <div>
                <p className="font-medium mb-2">Làm thế nào để theo dõi đơn hàng của tôi?</p>
                <p className="text-gray-700 text-sm">
                  Bạn có thể theo dõi đơn hàng bằng cách đăng nhập vào tài khoản và truy cập mục "Đơn hàng của tôi" hoặc sử dụng mã đơn hàng được gửi qua email.
                </p>
              </div>
              <div>
                <p className="font-medium mb-2">Chính sách đổi trả như thế nào?</p>
                <p className="text-gray-700 text-sm">
                  WOLFASHION hỗ trợ đổi trả trong vòng 7 ngày kể từ ngày nhận hàng. Sản phẩm cần còn nguyên tem mác và chưa qua sử dụng.
                </p>
              </div>
              <div>
                <p className="font-medium mb-2">Có hỗ trợ giao hàng toàn quốc không?</p>
                <p className="text-gray-700 text-sm">
                  Có, chúng tôi giao hàng toàn quốc. Phí vận chuyển sẽ được tính tự động dựa trên địa chỉ giao hàng của bạn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
