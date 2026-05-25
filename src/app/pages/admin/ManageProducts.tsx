import { useState, useEffect, useRef } from 'react';
import { Search, Plus, Edit, Trash2, X, Upload } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { productService } from '../../../api/services/product.service';
import { uploadService } from '../../../api/services/upload.service';

export default function ManageProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [search, setSearch] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [viewingProduct, setViewingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    ten_san_pham: '',
    loai_san_pham: 'Áo',
    gioi_tinh: 'Nữ',
    gia_ban: 0,
    so_luong_ton: 0,
    trang_thai: 1,
    mo_ta: '',
    hinh_anh: '',
    kich_thuoc: [] as string[],
    mau_sac: [] as string[],
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const result = await uploadService.uploadProductImage(file);
        setFormData({ ...formData, hinh_anh: result.url });
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Tải ảnh thất bại');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await productService.getAll();
      setProducts(data.data || data || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      ten_san_pham: '',
      loai_san_pham: 'Áo',
      gioi_tinh: 'Nữ',
      gia_ban: 0,
      so_luong_ton: 0,
      trang_thai: 1,
      mo_ta: '',
      hinh_anh: '',
      kich_thuoc: [],
      mau_sac: [],
    });
    setShowModal(true);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      ten_san_pham: product.ten_san_pham,
      loai_san_pham: product.loai_san_pham,
      gioi_tinh: product.gioi_tinh,
      gia_ban: product.gia_ban,
      so_luong_ton: product.so_luong_ton,
      trang_thai: product.trang_thai,
      mo_ta: product.mo_ta || '',
      hinh_anh: product.hinh_anh || '',
      kich_thuoc: product.kich_thuoc || [],
      mau_sac: product.mau_sac || [],
    });
    setShowModal(true);
  };

  const handleViewDetail = (product: any) => {
    setViewingProduct(product);
    setShowDetailModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await productService.remove(id);
        fetchProducts();
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const bien_the = formData.kich_thuoc.flatMap(kich_co => 
        formData.mau_sac.map(mau_sac => ({
          mau_sac,
          kich_co,
          gia_ban: formData.gia_ban,
          so_luong_ton: formData.so_luong_ton,
          hinh_anh: formData.hinh_anh
        }))
      );

      const payload = {
        ten_san_pham: formData.ten_san_pham,
        mo_ta: formData.mo_ta,
        danh_muc: formData.loai_san_pham,
        trang_thai: formData.trang_thai,
        gioi_tinh: formData.gioi_tinh === 'Nam' ? 1 : formData.gioi_tinh === 'Nữ' ? 2 : 3,
        bien_the
      };

      if (editingProduct) {
        await productService.update(editingProduct.ma_san_pham, payload);
      } else {
        await productService.create(payload);
      }
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Có lỗi xảy ra khi lưu sản phẩm');
    }
  };

  const filteredProducts = products.filter((p) =>
    p.ten_san_pham.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl">Quản Lý Sản Phẩm</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Thêm sản phẩm
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 border border-gray-200 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black">
            <option value="">Tất cả danh mục</option>
            <option value="Áo">Áo</option>
            <option value="Quần">Quần</option>
            <option value="Váy">Váy</option>
            <option value="Phụ kiện">Phụ kiện</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black">
            <option value="">Tất cả trạng thái</option>
            <option value="1">Còn kinh doanh</option>
            <option value="0">Ngừng kinh doanh</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p>Đang tải danh sách sản phẩm...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.ma_san_pham}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleViewDetail(product)}
            >
              <div className="aspect-square bg-gray-100">
                <ImageWithFallback
                  src={product.hinh_anh}
                  alt={product.ten_san_pham}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">Mã: {product.ma_san_pham}</p>
                <h3 className="font-medium mb-2 line-clamp-2">{product.ten_san_pham}</h3>
                <p className="text-lg mb-2">{product.gia_ban?.toLocaleString()}đ</p>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span>{product.loai_san_pham} / {product.gioi_tinh}</span>
                  <span className={product.so_luong_ton === 0 ? 'text-red-600' : product.so_luong_ton < 10 ? 'text-orange-600' : ''}>
                    Kho: {product.so_luong_ton}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      product.trang_thai === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {product.trang_thai === 1 ? 'Còn KD' : 'Ngừng KD'}
                  </span>
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-1 hover:bg-gray-200 rounded"
                      title="Sửa"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.ma_san_pham)}
                      className="p-1 hover:bg-red-100 text-red-600 rounded"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">
                {editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
              </h3>
              <button onClick={() => setShowModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm mb-2 font-medium">Tên sản phẩm *</label>
                  <input
                    type="text"
                    required
                    value={formData.ten_san_pham}
                    onChange={(e) => setFormData({ ...formData, ten_san_pham: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm mb-2 font-medium">Hình ảnh sản phẩm *</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                      disabled={isUploading}
                    >
                      <Upload className="w-4 h-4" />
                      {isUploading ? 'Đang tải...' : 'Chọn ảnh'}
                    </button>
                    {formData.hinh_anh && (
                      <span className="text-sm text-green-600 truncate max-w-[200px]">
                        {formData.hinh_anh.split('/').pop()}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium">Danh mục *</label>
                  <select
                    required
                    value={formData.loai_san_pham}
                    onChange={(e) => setFormData({ ...formData, loai_san_pham: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="Áo">Áo</option>
                    <option value="Quần">Quần</option>
                    <option value="Váy">Váy</option>
                    <option value="Phụ kiện">Phụ kiện</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium">Giới tính *</label>
                  <select
                    required
                    value={formData.gioi_tinh}
                    onChange={(e) => setFormData({ ...formData, gioi_tinh: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm mb-2 font-medium">Kích cỡ (ngăn cách bởi dấu phẩy)</label>
                  <input
                    type="text"
                    placeholder="S, M, L, XL"
                    value={formData.kich_thuoc.join(', ')}
                    onChange={(e) =>
                      setFormData({ ...formData, kich_thuoc: e.target.value.split(',').map((s) => s.trim()).filter(s => s) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm mb-2 font-medium">Màu sắc (ngăn cách bởi dấu phẩy)</label>
                  <input
                    type="text"
                    placeholder="Trắng, Đen, Đỏ"
                    value={formData.mau_sac.join(', ')}
                    onChange={(e) =>
                      setFormData({ ...formData, mau_sac: e.target.value.split(',').map((s) => s.trim()).filter(s => s) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium">Giá bán *</label>
                  <input
                    type="number"
                    required
                    value={formData.gia_ban}
                    onChange={(e) => setFormData({ ...formData, gia_ban: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium">Tồn kho *</label>
                  <input
                    type="number"
                    required
                    value={formData.so_luong_ton}
                    onChange={(e) => setFormData({ ...formData, so_luong_ton: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm mb-2 font-medium">Mô tả</label>
                  <textarea
                    rows={3}
                    value={formData.mo_ta}
                    onChange={(e) => setFormData({ ...formData, mo_ta: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium">Trạng thái</label>
                  <select
                    value={formData.trang_thai}
                    onChange={(e) => setFormData({ ...formData, trang_thai: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value={1}>Còn kinh doanh</option>
                    <option value={0}>Ngừng kinh doanh</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-2 hover:bg-gray-800 transition-colors"
                >
                  {editingProduct ? 'Cập nhật' : 'Thêm'}
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

      {/* Product Detail Modal */}
      {showDetailModal && viewingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl">Chi Tiết Sản Phẩm</h3>
              <button onClick={() => setShowDetailModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Image */}
              <div>
                <div className="aspect-square bg-gray-100 mb-4">
                  <ImageWithFallback
                    src={viewingProduct.hinh_anh}
                    alt={viewingProduct.ten_san_pham}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Mã: {viewingProduct.ma_san_pham}</p>
                <h2 className="text-3xl mb-4">{viewingProduct.ten_san_pham}</h2>
                <p className="text-3xl mb-6">{viewingProduct.gia_ban?.toLocaleString()}đ</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Mô tả</p>
                    <p>{viewingProduct.mo_ta || 'Không có mô tả'}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Kích cỡ</p>
                    <div className="flex gap-2 flex-wrap">
                      {viewingProduct.kich_thuoc?.map((size: string) => (
                        <span key={size} className="px-3 py-1 border border-gray-300">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Màu sắc</p>
                    <div className="flex gap-2 flex-wrap">
                      {viewingProduct.mau_sac?.map((color: string) => (
                        <span key={color} className="px-3 py-1 border border-gray-300">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                  <p><strong>Danh mục:</strong> {viewingProduct.loai_san_pham}</p>
                  <p><strong>Giới tính:</strong> {viewingProduct.gioi_tinh}</p>
                  <p>
                    <strong>Tồn kho:</strong>{' '}
                    <span className={viewingProduct.so_luong_ton === 0 ? 'text-red-600' : ''}>
                      {viewingProduct.so_luong_ton}
                    </span>
                  </p>
                  <p>
                    <strong>Trạng thái:</strong>{' '}
                    <span className={viewingProduct.trang_thai === 1 ? 'text-green-600' : 'text-gray-600'}>
                      {viewingProduct.trang_thai === 1 ? 'Còn kinh doanh' : 'Ngừng kinh doanh'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
