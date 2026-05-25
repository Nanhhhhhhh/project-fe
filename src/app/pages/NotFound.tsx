import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl mb-4">404</h1>
        <h2 className="text-3xl mb-4">Trang không tìm thấy</h2>
        <p className="text-gray-600 mb-8">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link
          to="/"
          className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
        >
          VỀ TRANG CHỦ
        </Link>
      </div>
    </div>
  );
}
