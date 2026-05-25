import { useState } from 'react';
import { Search, Plus, Edit, Trash2, X, Eye } from 'lucide-react';

const mockPromotions = [
  { id: 1, name: 'Giảm giá mùa hè', code: 'SUMMER2026', discountType: 1, discountValue: 20, minOrder: 500000, startDate: '2026-06-01', endDate: '2026-08-31', status: 1, usageLimit: 100, usageCount: 25 },
  { id: 2, name: 'Khuyến mãi cuối tuần', code: 'WEEKEND50', discountType: 2, discountValue: 50000, minOrder: 300000, startDate: '2026-04-01', endDate: '2026-04-30', status: 1, usageLimit: 50, usageCount: 45 },
  { id: 3, name: 'Giảm giá tết', code: 'TET2026', discountType: 1, discountValue: 30, minOrder: 1000000, startDate: '2026-01-15', endDate: '2026-02-15', status: 0, usageLimit: 200, usageCount: 200 },
];

export default function ManagePromotions() {
  const [promotions, setPromotions] = useState(mockPromotions);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<any>(null);
  const [viewingPromotion, setViewingPromotion] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    discountType: 1,
    discountValue: 0,
    minOrder: 0,
    startDate: '',
    endDate: '',
    usageLimit: 0,
    status: 1,
  });

  const handleAdd = () => {
    setEditingPromotion(null);
    setFormData({
      name: '',
      code: '',
      description: '',
      discountType: 1,
      discountValue: 0,
      minOrder: 0,
      startDate: '',
      endDate: '',
      usageLimit: 0,
      status: 1,
    });
    setShowModal(true);
  };

  const handleEdit = (promotion: any) => {
    setEditingPromotion(promotion);
    setFormData({
      name: promotion.name,
      code: promotion.code,
      description: promotion.description || '',
      discountType: promotion.discountType,
      discountValue: promotion.discountValue,
      minOrder: promotion.minOrder,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      usageLimit: promotion.usageLimit,
      status: promotion.status,
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa khuyến mãi này?')) {
      setPromotions(promotions.filter((p) => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPromotion) {
      setPromotions(
        promotions.map((p) =>
          p.id === editingPromotion.id ? { ...p, ...formData, usageCount: p.usageCount } : p
        )
      );
    } else {
      setPromotions([...promotions, { id: promotions.length + 1, ...formData, usageCount: 0 }]);
    }
    setShowModal(false);
  };

  const filteredPromotions = promotions.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl">Quản Lý Khuyến Mãi</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Thêm khuyến mãi
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 border border-gray-200 rounded-lg mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc mã khuyến mãi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Tên chương trình</th>
                <th className="text-left py-3 px-4">Mã giảm giá</th>
                <th className="text-left py-3 px-4">Loại giảm</th>
                <th className="text-left py-3 px-4">Giá trị</th>
                <th className="text-left py-3 px-4">Đơn tối thiểu</th>
                <th className="text-left py-3 px-4">Thời gian</th>
                <th className="text-left py-3 px-4">Đã dùng</th>
                <th className="text-left py-3 px-4">Trạng thái</th>
                <th className="text-left py-3 px-4">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredPromotions.map((promotion) => (
                <tr key={promotion.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{promotion.name}</td>
                  <td className="py-3 px-4">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">{promotion.code}</code>
                  </td>
                  <td className="py-3 px-4">
                    {promotion.discountType === 1 ? 'Giảm %' : 'Giảm tiền'}
                  </td>
                  <td className="py-3 px-4">
                    {promotion.discountType === 1
                      ? `${promotion.discountValue}%`
                      : `${promotion.discountValue.toLocaleString()}đ`}
                  </td>
                  <td className="py-3 px-4">{promotion.minOrder.toLocaleString()}đ</td>
                  <td className="py-3 px-4 text-sm">
                    {promotion.startDate}<br />đến {promotion.endDate}
                  </td>
                  <td className="py-3 px-4">
                    {promotion.usageCount}/{promotion.usageLimit}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        promotion.status === 1
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {promotion.status === 1 ? 'Đang áp dụng' : 'Ngừng'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setViewingPromotion(promotion);
                          setShowDetailModal(true);
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(promotion)}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(promotion.id)}
                        className="p-1 hover:bg-red-100 text-red-600 rounded"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">
                {editingPromotion ? 'Sửa khuyến mãi' : 'Thêm khuyến mãi mới'}
              </h3>
              <button onClick={() => setShowModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm mb-2">Tên chương trình *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Mã giảm giá *</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="VD: SUMMER2026"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Loại giảm *</label>
                  <select
                    required
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value={1}>Giảm %</option>
                    <option value={2}>Giảm tiền mặt</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">
                    Giá trị giảm * {formData.discountType === 1 ? '(%)' : '(đ)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Đơn tối thiểu (đ)</label>
                  <input
                    type="number"
                    value={formData.minOrder}
                    onChange={(e) => setFormData({ ...formData, minOrder: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Số lần dùng tối đa</label>
                  <input
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="0 = không giới hạn"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Ngày bắt đầu *</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Ngày kết thúc *</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm mb-2">Mô tả</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Trạng thái</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value={1}>Đang áp dụng</option>
                    <option value={0}>Ngừng</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-2 hover:bg-gray-800 transition-colors"
                >
                  {editingPromotion ? 'Cập nhật' : 'Thêm'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 py-2 hover:bg-gray-100 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && viewingPromotion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl">Chi Tiết Mã Khuyến Mãi</h3>
              <button onClick={() => setShowDetailModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Tên chương trình</p>
                  <p className="font-medium">{viewingPromotion.name}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Mã giảm</p>
                  <p className="font-medium">
                    <code className="bg-gray-100 px-2 py-1 rounded">{viewingPromotion.code}</code>
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Loại giảm</p>
                  <p className="font-medium">
                    {viewingPromotion.discountType === 1 ? 'Phần trăm (%)' : 'Tiền mặt (đ)'}
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Giá trị giảm</p>
                  <p className="font-medium">
                    {viewingPromotion.discountType === 1
                      ? `${viewingPromotion.discountValue}%`
                      : `${viewingPromotion.discountValue.toLocaleString()}đ`}
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Giảm tối thiểu</p>
                  <p className="font-medium">{viewingPromotion.minOrder.toLocaleString()}đ</p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Số lần dùng tối đa</p>
                  <p className="font-medium">
                    {viewingPromotion.usageLimit === 0 ? 'Không giới hạn' : viewingPromotion.usageLimit}
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Ngày bắt đầu</p>
                  <p className="font-medium">{new Date(viewingPromotion.startDate).toLocaleDateString('vi-VN')}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Ngày kết thúc</p>
                  <p className="font-medium">{new Date(viewingPromotion.endDate).toLocaleDateString('vi-VN')}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded col-span-2">
                  <p className="text-sm text-gray-600 mb-1">Mô tả</p>
                  <p className="font-medium">{viewingPromotion.description || 'Không có mô tả'}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Trạng thái</p>
                  <p>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        viewingPromotion.status === 1
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {viewingPromotion.status === 1 ? 'Đang áp dụng' : 'Ngừng'}
                    </span>
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Đã sử dụng</p>
                  <p className="font-medium">
                    {viewingPromotion.usageCount} / {viewingPromotion.usageLimit === 0 ? '∞' : viewingPromotion.usageLimit}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowDetailModal(false)}
                className="w-full border border-gray-300 py-2 hover:bg-gray-100"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
