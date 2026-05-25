import { useState } from 'react';
import { HelpCircle, MessageSquare, Send } from 'lucide-react';

export default function Support() {
  const [formData, setFormData] = useState({
    ma_don_hang: '',
    noi_dung: '',
  });

  const [requests, setRequests] = useState([
    {
      ma_yeu_cau: 1,
      ngay_gui_yeu_cau: '2026-04-05',
      noi_dung: 'Tôi muốn đổi size sản phẩm trong đơn hàng DH001',
      ma_don_hang: 'DH001',
      trang_thai: 1, // 1: Đã xử lý, 0: Chưa xử lý
      tra_loi: 'Đã xử lý yêu cầu đổi size. Vui lòng chờ bộ phận giao hàng liên hệ.',
    },
    {
      ma_yeu_cau: 2,
      ngay_gui_yeu_cau: '2026-04-03',
      noi_dung: 'Đơn hàng DH002 giao chưa đúng địa chỉ',
      ma_don_hang: 'DH002',
      trang_thai: 0,
      tra_loi: null,
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.noi_dung.trim()) {
      alert('Vui lòng nhập nội dung yêu cầu');
      return;
    }

    // Thêm yêu cầu mới
    const newRequest = {
      ma_yeu_cau: requests.length + 1,
      ngay_gui_yeu_cau: new Date().toISOString().split('T')[0],
      noi_dung: formData.noi_dung,
      ma_don_hang: formData.ma_don_hang || null,
      trang_thai: 0,
      tra_loi: null,
    };

    setRequests([newRequest, ...requests]);
    setFormData({ ma_don_hang: '', noi_dung: '' });
    alert('Đã gửi yêu cầu hỗ trợ thành công!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <HelpCircle className="w-8 h-8" />
        <h1 className="text-3xl">Hỗ Trợ Khách Hàng</h1>
      </div>

      {/* New Request Form */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8">
        <h2 className="text-xl mb-4">Gửi Yêu Cầu Hỗ Trợ</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">
              Mã đơn hàng <span className="text-gray-500">(không bắt buộc)</span>
            </label>
            <input
              type="text"
              value={formData.ma_don_hang}
              onChange={(e) => setFormData({ ...formData, ma_don_hang: e.target.value })}
              placeholder="VD: DH001"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">
              Nội dung yêu cầu <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.noi_dung}
              onChange={(e) => setFormData({ ...formData, noi_dung: e.target.value })}
              placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
              className="w-full border border-gray-300 rounded px-3 py-2 min-h-[120px]"
              required
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-black text-white px-6 py-2 hover:bg-gray-800"
          >
            <Send className="w-4 h-4" />
            Gửi yêu cầu
          </button>
        </form>
      </div>

      {/* Request History */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg">
        <h2 className="text-xl mb-4">Lịch Sử Yêu Cầu</h2>
        {requests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Bạn chưa có yêu cầu hỗ trợ nào</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.ma_yeu_cau}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Yêu cầu #{request.ma_yeu_cau}</span>
                    {request.ma_don_hang && (
                      <span className="text-sm text-gray-600">
                        (Đơn hàng: {request.ma_don_hang})
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      request.trang_thai === 1
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {request.trang_thai === 1 ? 'Đã xử lý' : 'Đang xử lý'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Ngày gửi: {new Date(request.ngay_gui_yeu_cau).toLocaleDateString('vi-VN')}
                </p>
                <div className="bg-gray-50 rounded p-3 mb-3">
                  <p className="text-sm font-medium mb-1">Nội dung yêu cầu:</p>
                  <p className="text-sm">{request.noi_dung}</p>
                </div>
                {request.tra_loi && (
                  <div className="bg-blue-50 rounded p-3 border-l-4 border-blue-500">
                    <p className="text-sm font-medium mb-1 text-blue-900">Phản hồi:</p>
                    <p className="text-sm text-blue-800">{request.tra_loi}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
