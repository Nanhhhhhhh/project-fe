export default function Newsletter() {
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
