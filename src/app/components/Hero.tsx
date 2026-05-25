import { ImageWithFallback } from './figma/ImageWithFallback';

export default function Hero() {
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
          <h1 className="text-5xl md:text-6xl mb-6 text-white">
            Bộ Sưu Tập Mới
            <br />
            <span className="font-serif italic">Xuân Hè 2026</span>
          </h1>
          <p className="text-lg text-gray-200 mb-8 max-w-lg">
            Khám phá những thiết kế sang trọng, tinh tế và đầy cá tính.
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
