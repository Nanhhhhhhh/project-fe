import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function About() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6">WOLFASHION</h1>
          <p className="text-2xl text-gray-600 font-light">
            Khoác lên phong cách, khẳng định cá tính
          </p>
        </div>

        {/* Journey Section */}
        <div className="mb-16">
          <h2 className="text-3xl mb-6">Hành trình hình thành</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              WOLFASHION ra đời với mong muốn mang đến một làn gió mới cho thời trang Việt – nơi mỗi sản phẩm không chỉ đơn thuần là trang phục mà còn là tuyên ngôn về phong cách sống.
            </p>
            <p>
              Từ những ngày đầu xây dựng thương hiệu, WOLFASHION đã tập trung vào việc phát triển các dòng sản phẩm chất lượng, thiết kế hiện đại và phù hợp với nhịp sống năng động của giới trẻ.
            </p>
            <p className="italic text-lg">
              Chúng tôi tin rằng: <strong>Thời trang là cách bạn thể hiện chính mình mà không cần nói một lời.</strong>
            </p>
          </div>
        </div>

        {/* Store Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="aspect-[3/4] overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1765009433753-c7462637d21f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Không gian cửa hàng WOLFASHION"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="aspect-[3/4] overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1769107805412-90d9191d53e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Bộ sưu tập thời trang cao cấp"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="aspect-[3/4] overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1766934587214-86e21b3ae093?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Kệ trưng bày sản phẩm"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="aspect-[3/4] overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1776000680544-ebf0989a71df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Bộ sưu tập đa dạng màu sắc"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="border-l-4 border-black pl-6">
            <h2 className="text-3xl mb-4">Tầm nhìn</h2>
            <p className="text-gray-700 leading-relaxed">
              Trở thành thương hiệu thời trang được yêu thích, đại diện cho phong cách trẻ trung, hiện đại và cá tính.
            </p>
          </div>
          <div className="border-l-4 border-black pl-6">
            <h2 className="text-3xl mb-4">Sứ mệnh</h2>
            <p className="text-gray-700 leading-relaxed">
              Mang đến cho khách hàng những sản phẩm thời trang chất lượng, dễ ứng dụng, giúp mỗi người tự tin thể hiện bản thân trong mọi hoàn cảnh.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl mb-8 text-center">Giá trị cốt lõi</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 border border-gray-200">
              <h3 className="text-xl mb-3">1. Chất lượng là ưu tiên hàng đầu</h3>
              <p className="text-gray-700 leading-relaxed">
                WOLFASHION chú trọng kiểm soát chất lượng trong từng khâu – từ lựa chọn chất liệu đến sản xuất – nhằm mang đến sản phẩm bền, đẹp và thoải mái khi sử dụng.
              </p>
            </div>

            <div className="bg-gray-50 p-6 border border-gray-200">
              <h3 className="text-xl mb-3">2. Thiết kế hiện đại, dễ ứng dụng</h3>
              <p className="text-gray-700 leading-relaxed">
                Sản phẩm của WOLFASHION hướng đến sự tối giản nhưng tinh tế, dễ phối đồ và phù hợp với nhiều phong cách khác nhau.
              </p>
            </div>

            <div className="bg-gray-50 p-6 border border-gray-200">
              <h3 className="text-xl mb-3">3. Hướng đến phát triển bền vững</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Chúng tôi không ngừng cải tiến để giảm thiểu tác động đến môi trường:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Ưu tiên chất liệu thân thiện</li>
                <li>Tối ưu quy trình sản xuất</li>
                <li>Khuyến khích tiêu dùng có trách nhiệm</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 border border-gray-200">
              <h3 className="text-xl mb-3">4. Giá trị thật – Trải nghiệm thật</h3>
              <p className="text-gray-700 leading-relaxed">
                WOLFASHION cam kết mang lại giá trị xứng đáng với từng sản phẩm, đồng thời không ngừng nâng cao trải nghiệm mua sắm của khách hàng.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center py-12 border-t border-gray-200">
          <h2 className="text-3xl mb-4">WOLFASHION – Không chỉ là quần áo</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Chúng tôi không chỉ tạo ra thời trang, mà còn xây dựng một phong cách sống – nơi bạn tự tin, khác biệt và luôn là chính mình.
          </p>
        </div>
      </div>
    </div>
  );
}
