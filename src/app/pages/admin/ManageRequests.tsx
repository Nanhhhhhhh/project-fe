import { useState } from 'react';
import { CheckCircle, XCircle, Clock, User, Package, Tag } from 'lucide-react';

type RequestType = 'customer' | 'product' | 'promotion';
type RequestStatus = 'pending' | 'approved' | 'rejected';
type ActionType = 'create' | 'update' | 'delete';

interface Request {
  id: number;
  type: RequestType;
  action: ActionType;
  status: RequestStatus;
  staffName: string;
  staffEmail: string;
  createdAt: string;
  description: string;
  data: any;
}

export default function ManageRequests() {
  const [filter, setFilter] = useState<'all' | RequestStatus>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | RequestType>('all');

  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      type: 'customer',
      action: 'update',
      status: 'pending',
      staffName: 'Nguyễn Văn B',
      staffEmail: 'nvb@wolfashion.com',
      createdAt: '2026-04-08 10:30',
      description: 'Cập nhật thông tin khách hàng: Trần Thị C',
      data: {
        customerId: 'KH001',
        customerName: 'Trần Thị C',
        changes: {
          phone: '0987654321',
          address: '456 Lê Lợi, Quận 1, TP.HCM',
        },
      },
    },
    {
      id: 2,
      type: 'product',
      action: 'create',
      status: 'pending',
      staffName: 'Lê Thị D',
      staffEmail: 'ltd@wolfashion.com',
      createdAt: '2026-04-08 09:15',
      description: 'Thêm sản phẩm mới: Áo Khoác Dạ Cao Cấp',
      data: {
        productName: 'Áo Khoác Dạ Cao Cấp',
        category: 'Áo',
        gender: 'Nam',
        variants: [
          { color: 'Đen', size: 'L', price: 2500000, quantity: 20 },
          { color: 'Xám', size: 'L', price: 2500000, quantity: 15 },
        ],
      },
    },
    {
      id: 3,
      type: 'promotion',
      action: 'update',
      status: 'approved',
      staffName: 'Phạm Văn E',
      staffEmail: 'pve@wolfashion.com',
      createdAt: '2026-04-07 14:20',
      description: 'Cập nhật khuyến mãi: SALE30',
      data: {
        promoCode: 'SALE30',
        changes: {
          endDate: '2026-05-30',
          discountValue: 30,
        },
      },
    },
    {
      id: 4,
      type: 'product',
      action: 'delete',
      status: 'rejected',
      staffName: 'Nguyễn Văn B',
      staffEmail: 'nvb@wolfashion.com',
      createdAt: '2026-04-06 11:00',
      description: 'Xóa sản phẩm: Quần Jean Vintage',
      data: {
        productId: 'SP045',
        productName: 'Quần Jean Vintage',
        reason: 'Không còn kinh doanh',
      },
    },
  ]);

  const handleApprove = (requestId: number) => {
    setRequests(requests.map(req =>
      req.id === requestId ? { ...req, status: 'approved' as RequestStatus } : req
    ));
    alert('Đã xác nhận yêu cầu!');
  };

  const handleReject = (requestId: number) => {
    setRequests(requests.map(req =>
      req.id === requestId ? { ...req, status: 'rejected' as RequestStatus } : req
    ));
    alert('Đã từ chối yêu cầu!');
  };

  const getTypeIcon = (type: RequestType) => {
    switch (type) {
      case 'customer': return <User className="w-5 h-5" />;
      case 'product': return <Package className="w-5 h-5" />;
      case 'promotion': return <Tag className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: RequestType) => {
    switch (type) {
      case 'customer': return 'Khách hàng';
      case 'product': return 'Sản phẩm';
      case 'promotion': return 'Khuyến mãi';
    }
  };

  const getActionLabel = (action: ActionType) => {
    switch (action) {
      case 'create': return 'Thêm mới';
      case 'update': return 'Cập nhật';
      case 'delete': return 'Xóa';
    }
  };

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
          <Clock className="w-3 h-3" />
          Chờ xác nhận
        </span>;
      case 'approved':
        return <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
          <CheckCircle className="w-3 h-3" />
          Đã xác nhận
        </span>;
      case 'rejected':
        return <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
          <XCircle className="w-3 h-3" />
          Đã từ chối
        </span>;
    }
  };

  const filteredRequests = requests.filter(req => {
    if (filter !== 'all' && req.status !== filter) return false;
    if (typeFilter !== 'all' && req.type !== typeFilter) return false;
    return true;
  });

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl mb-2">Quản Lý Yêu Cầu Từ Nhân Viên</h2>
          <p className="text-gray-600">
            {pendingCount > 0 && (
              <span className="text-yellow-600 font-medium">
                {pendingCount} yêu cầu đang chờ xử lý
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 p-4 rounded-lg mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm mb-2">Trạng thái</label>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm border ${filter === 'all' ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-100'}`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 text-sm border ${filter === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'border-gray-300 hover:bg-gray-100'}`}
              >
                Chờ xác nhận
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={`px-4 py-2 text-sm border ${filter === 'approved' ? 'bg-green-100 text-green-800 border-green-300' : 'border-gray-300 hover:bg-gray-100'}`}
              >
                Đã xác nhận
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={`px-4 py-2 text-sm border ${filter === 'rejected' ? 'bg-red-100 text-red-800 border-red-300' : 'border-gray-300 hover:bg-gray-100'}`}
              >
                Đã từ chối
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-2">Loại yêu cầu</label>
            <div className="flex gap-2">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-4 py-2 text-sm border ${typeFilter === 'all' ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-100'}`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setTypeFilter('customer')}
                className={`px-4 py-2 text-sm border ${typeFilter === 'customer' ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-100'}`}
              >
                Khách hàng
              </button>
              <button
                onClick={() => setTypeFilter('product')}
                className={`px-4 py-2 text-sm border ${typeFilter === 'product' ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-100'}`}
              >
                Sản phẩm
              </button>
              <button
                onClick={() => setTypeFilter('promotion')}
                className={`px-4 py-2 text-sm border ${typeFilter === 'promotion' ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-100'}`}
              >
                Khuyến mãi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-white border border-gray-200 p-8 rounded-lg text-center text-gray-500">
            Không có yêu cầu nào
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div key={request.id} className="bg-white border border-gray-200 p-6 rounded-lg hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-gray-100 rounded">
                    {getTypeIcon(request.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{request.description}</h3>
                      {getStatusBadge(request.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>Loại: {getTypeLabel(request.type)}</span>
                      <span>•</span>
                      <span>Thao tác: {getActionLabel(request.action)}</span>
                      <span>•</span>
                      <span>{request.createdAt}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Người gửi: <span className="font-medium">{request.staffName}</span> ({request.staffEmail})
                    </p>
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div className="bg-gray-50 rounded p-4 mb-4">
                <h4 className="text-sm font-medium mb-2">Chi tiết yêu cầu:</h4>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(request.data, null, 2)}
                </pre>
              </div>

              {/* Actions */}
              {request.status === 'pending' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Xác nhận
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
                  >
                    <XCircle className="w-4 h-4" />
                    Từ chối
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
