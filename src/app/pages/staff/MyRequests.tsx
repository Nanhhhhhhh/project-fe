import { Clock, CheckCircle, XCircle, Package, User, Tag } from 'lucide-react';

type RequestType = 'customer' | 'product' | 'promotion';
type RequestStatus = 'pending' | 'approved' | 'rejected';
type ActionType = 'create' | 'update' | 'delete';

interface Request {
  id: number;
  type: RequestType;
  action: ActionType;
  status: RequestStatus;
  createdAt: string;
  description: string;
  data: any;
  feedback?: string;
}

export default function MyRequests() {
  const requests: Request[] = [
    {
      id: 1,
      type: 'customer',
      action: 'update',
      status: 'pending',
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
      status: 'approved',
      createdAt: '2026-04-07 14:20',
      description: 'Thêm sản phẩm mới: Áo Polo Classic',
      data: {
        productName: 'Áo Polo Classic',
        category: 'Áo',
        gender: 'Nam',
      },
      feedback: 'Đã được phê duyệt và thêm vào hệ thống.',
    },
    {
      id: 3,
      type: 'promotion',
      action: 'update',
      status: 'rejected',
      createdAt: '2026-04-06 11:00',
      description: 'Cập nhật khuyến mãi: SUMMER2026',
      data: {
        promoCode: 'SUMMER2026',
        changes: {
          discountValue: 50,
        },
      },
      feedback: 'Mức giảm giá quá cao, vui lòng điều chỉnh lại.',
    },
  ];

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

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl mb-2">Requests Của Tôi</h2>
        <p className="text-gray-600">
          Theo dõi trạng thái các yêu cầu thay đổi bạn đã gửi.
          {pendingCount > 0 && (
            <span className="ml-2 text-yellow-600 font-medium">
              ({pendingCount} yêu cầu đang chờ xử lý)
            </span>
          )}
        </p>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.length === 0 ? (
          <div className="bg-white border border-gray-200 p-8 rounded-lg text-center text-gray-500">
            Bạn chưa gửi yêu cầu nào
          </div>
        ) : (
          requests.map((request) => (
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
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Loại: {getTypeLabel(request.type)}</span>
                      <span>•</span>
                      <span>Thao tác: {getActionLabel(request.action)}</span>
                      <span>•</span>
                      <span>{request.createdAt}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div className="bg-gray-50 rounded p-4 mb-3">
                <h4 className="text-sm font-medium mb-2">Chi tiết yêu cầu:</h4>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(request.data, null, 2)}
                </pre>
              </div>

              {/* Feedback */}
              {request.feedback && (
                <div className={`rounded p-4 border-l-4 ${
                  request.status === 'approved' 
                    ? 'bg-green-50 border-green-500' 
                    : 'bg-red-50 border-red-500'
                }`}>
                  <p className="text-sm font-medium mb-1">
                    {request.status === 'approved' ? 'Phản hồi từ quản lý:' : 'Lý do từ chối:'}
                  </p>
                  <p className="text-sm">{request.feedback}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
