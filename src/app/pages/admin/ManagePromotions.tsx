import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, X, Eye } from 'lucide-react';
import { promotionService } from '../../../api/services/promotion.service';

export default function ManagePromotions() {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<any>(null);
  const [viewingPromotion, setViewingPromotion] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
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

  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const data = await promotionService.getAll();
      setPromotions(data);
    } catch (error) {
      console.error('Error fetching promotions', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

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
    const productInfo = promotion.danh_sach_san_pham?.[0] || {};
    setFormData({
      name: promotion.ten_chuong_trinh,
      code: promotion.ma_giam_gia,
      description: promotion.mo_ta || '',
      discountType: productInfo.loai_giam || 1,
      discountValue: productInfo.gia_tri_giam || 0,
      minOrder: productInfo.don_toi_thieu || 0,
      startDate: promotion.ngay_bat_dau ? new Date(promotion.ngay_bat_dau).toISOString().split('T')[0] : '',
      endDate: promotion.ngay_ket_thuc ? new Date(promotion.ngay_ket_thuc).toISOString().split('T')[0] : '',
      usageLimit: productInfo.so_lan_dung_toi_da || 0,
      status: promotion.trang_thai,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa khuyến mãi này?')) {
      try {
        await promotionService.remove(id);
        fetchPromotions();
      } catch (error) {
        console.error('Error deleting promotion', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dto = {
      ten_chuong_trinh: formData.name,
      ma_giam_gia: formData.code,
      mo_ta: formData.description,
      ngay_bat_dau: formData.startDate,
      ngay_ket_thuc: formData.endDate,
      trang_thai: formData.status,
      danh_sach_san_pham: [
        {
          loai_giam: formData.discountType,
          gia_tri_giam: formData.discountValue,
          don_toi_thieu: formData.minOrder,
          so_lan_dung_toi_da: formData.usageLimit,
        },
      ],
    };

    try {
      if (editingPromotion) {
        await promotionService.update(editingPromotion._id, dto);
      } else {
        await promotionService.create(dto);
      }
      fetchPromotions();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving promotion', error);
    }
  };

  const filteredPromotions = promotions.filter((p) =>
    (p.ten_chuong_trinh || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.ma_giam_gia || '').toLowerCase().includes(search.toLowerCase())
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
          {loading ? (
            <div className="p-8 text-center text-gray-500">Đang tải...</div>
          ) : (
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
                {filteredPromotions.map((promotion) => {
                  const productInfo = promotion.danh_sach_san_pham?.[0] || {};
                  return (
                    <tr key={promotion._id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{promotion.ten_chuong_trinh}</td>
                      <td className="py-3 px-4">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">{promotion.ma_giam_gia}</code>
                      </td>
                      <td className="py-3 px-4">
                        {productInfo.loai_giam === 1 ? 'Giảm %' : 'Giảm tiền'}
                      </td>
                      <td className="py-3 px-4">
                        {productInfo.loai_giam === 1
                          ? `${productInfo.gia_tri_giam}%`
                          : `${(productInfo.gia_tri_giam || 0).toLocaleString()}đ`}
                      </td>
                      <td className="py-3 px-4">{(productInfo.don_toi_thieu || 0).toLocaleString()}đ</td>
                      <td className="py-3 px-4 text-sm">
                        {promotion.ngay_bat_dau ? new Date(promotion.ngay_bat_dau).toLocaleDateString('vi-VN') : ''}<br />
                        đến {promotion.ngay_ket_thuc ? new Date(promotion.ngay_ket_thuc).toLocaleDateString('vi-VN') : ''}
                      </td>
                      <td className="py-3 px-4">
                        {productInfo.da_dung || 0}/{productInfo.so_lan_dung_toi_da || 0}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            promotion.trang_thai === 1
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {promotion.trang_thai === 1 ? 'Đang áp dụng' : 'Ngừng'}
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
                            onClick={() => handleDelete(promotion._id)}
                            className="p-1 hover:bg-red-100 text-red-600 rounded"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
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
                  <p className="font-medium">{viewingPromotion.ten_chuong_trinh}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Mã giảm</p>
                  <p className="font-medium">
                    <code className="bg-gray-100 px-2 py-1 rounded">{viewingPromotion.ma_giam_gia}</code>
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Loại giảm</p>
                  <p className="font-medium">
                    {viewingPromotion.danh_sach_san_pham?.[0]?.loai_giam === 1 ? 'Phần trăm (%)' : 'Tiền mặt (đ)'}
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Giá trị giảm</p>
                  <p className="font-medium">
                    {viewingPromotion.danh_sach_san_pham?.[0]?.loai_giam === 1
                      ? `${viewingPromotion.danh_sach_san_pham?.[0]?.gia_tri_giam}%`
                      : `${(viewingPromotion.danh_sach_san_pham?.[0]?.gia_tri_giam || 0).toLocaleString()}đ`}
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Giảm tối thiểu</p>
                  <p className="font-medium">{(viewingPromotion.danh_sach_san_pham?.[0]?.don_toi_thieu || 0).toLocaleString()}đ</p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Số lần dùng tối đa</p>
                  <p className="font-medium">
                    {viewingPromotion.danh_sach_san_pham?.[0]?.so_lan_dung_toi_da === 0 ? 'Không giới hạn' : viewingPromotion.danh_sach_san_pham?.[0]?.so_lan_dung_toi_da}
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Ngày bắt đầu</p>
                  <p className="font-medium">{viewingPromotion.ngay_bat_dau ? new Date(viewingPromotion.ngay_bat_dau).toLocaleDateString('vi-VN') : ''}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Ngày kết thúc</p>
                  <p className="font-medium">{viewingPromotion.ngay_ket_thuc ? new Date(viewingPromotion.ngay_ket_thuc).toLocaleDateString('vi-VN') : ''}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded col-span-2">
                  <p className="text-sm text-gray-600 mb-1">Mô tả</p>
                  <p className="font-medium">{viewingPromotion.mo_ta || 'Không có mô tả'}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Trạng thái</p>
                  <p>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        viewingPromotion.trang_thai === 1
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {viewingPromotion.trang_thai === 1 ? 'Đang áp dụng' : 'Ngừng'}
                    </span>
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Đã sử dụng</p>
                  <p className="font-medium">
                    {viewingPromotion.danh_sach_san_pham?.[0]?.da_dung || 0} / {viewingPromotion.danh_sach_san_pham?.[0]?.so_lan_dung_toi_da === 0 ? '∞' : (viewingPromotion.danh_sach_san_pham?.[0]?.so_lan_dung_toi_da || 0)}
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
