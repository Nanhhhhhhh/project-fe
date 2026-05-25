import { ImageWithFallback } from './figma/ImageWithFallback';

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

export default function Collections() {
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
