import { useState, useEffect } from 'react';
import { Search, Eye, X, MessageSquare } from 'lucide-react';
import { supportService } from '../../../api/services/support.service';

export default function ManageSupport() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSupports = async () => {
    setLoading(true);
    try {
      const data = await supportService.getAll();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching supports', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupports();
  }, []);

  const handleViewDetail = (ticket: any) => {
    setSelectedTicket(ticket);
    setResponseText('');
    setShowDetailModal(true);
  };

  const handleResolve = async () => {
    if (selectedTicket) {
      try {
        await supportService.resolve(selectedTicket._id);
        fetchSupports();
        alert('Đã gửi phản hồi thành công!');
        setShowDetailModal(false);
      } catch (error) {
        console.error('Error resolving support', error);
      }
    }
  };

  const filteredTickets = tickets.filter((t) => {
    const ticketCode = 'YC-' + t._id.slice(-6).toUpperCase();
    const customerStr = t.ma_khach_hang ? t.ma_khach_hang.toString() : '';
    const orderStr = t.ma_don_hang ? t.ma_don_hang.toString() : '';
    
    return (
      ticketCode.includes(search.toUpperCase()) ||
      customerStr.includes(search) ||
      orderStr.includes(search)
    );
  });

  return (
    <div>
      <h2 className="text-3xl mb-6">Hỗ Trợ & Chăm Sóc Khách Hàng</h2>

      {/* Search & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-2 bg-white p-4 border border-gray-200 rounded-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm yêu cầu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
        <div className="bg-yellow-50 p-4 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800 mb-1">Chưa xử lý</p>
          <p className="text-2xl">{tickets.filter((t) => t.trang_thai === 0).length}</p>
        </div>
        <div className="bg-green-50 p-4 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 mb-1">Đã xử lý</p>
          <p className="text-2xl">{tickets.filter((t) => t.trang_thai === 1).length}</p>
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
                  <th className="text-left py-3 px-4">Mã yêu cầu</th>
                  <th className="text-left py-3 px-4">Khách hàng</th>
                  <th className="text-left py-3 px-4">Đơn hàng</th>
                  <th className="text-left py-3 px-4">Nội dung</th>
                  <th className="text-left py-3 px-4">Ngày gửi</th>
                  <th className="text-left py-3 px-4">Người xử lý</th>
                  <th className="text-left py-3 px-4">Trạng thái</th>
                  <th className="text-left py-3 px-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => {
                  const ticketCode = 'YC-' + ticket._id.slice(-6).toUpperCase();
                  const customerDisplay = ticket.ma_khach_hang ? ticket.ma_khach_hang.toString().slice(-6).toUpperCase() : 'Khách';
                  const orderDisplay = ticket.ma_don_hang ? ticket.ma_don_hang.toString().slice(-6).toUpperCase() : '-';
                  const dateDisplay = ticket.ngay_gui_yeu_cau ? new Date(ticket.ngay_gui_yeu_cau).toLocaleDateString('vi-VN') : '';
                  return (
                    <tr key={ticket._id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{ticketCode}</td>
                      <td className="py-3 px-4">{customerDisplay}</td>
                      <td className="py-3 px-4">{orderDisplay}</td>
                      <td className="py-3 px-4 max-w-xs truncate">{ticket.noi_dung}</td>
                      <td className="py-3 px-4">{dateDisplay}</td>
                      <td className="py-3 px-4">
                        {ticket.ma_admin_xu_ly ? (
                          <span className="text-sm">{ticket.ma_admin_xu_ly.toString().slice(-6).toUpperCase()}</span>
                        ) : (
                          <span className="text-sm text-gray-400">Chưa có</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            ticket.trang_thai === 1
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {ticket.trang_thai === 1 ? 'Đã xử lý' : 'Chưa xử lý'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleViewDetail(ticket)}
                          className="p-1 hover:bg-gray-200 rounded"
                          title="Xem & Trả lời"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl">Chi Tiết Yêu Cầu #{'YC-' + selectedTicket._id.slice(-6).toUpperCase()}</h3>
              <button onClick={() => setShowDetailModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
                <div>
                  <p className="text-sm text-gray-600">Khách hàng</p>
                  <p>{selectedTicket.ma_khach_hang ? selectedTicket.ma_khach_hang.toString().slice(-6).toUpperCase() : 'Khách'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày gửi</p>
                  <p>{selectedTicket.ngay_gui_yeu_cau ? new Date(selectedTicket.ngay_gui_yeu_cau).toLocaleDateString('vi-VN') : ''}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Đơn hàng liên quan</p>
                  <p>{selectedTicket.ma_don_hang ? selectedTicket.ma_don_hang.toString().slice(-6).toUpperCase() : 'Không có'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trạng thái</p>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded ${
                      selectedTicket.trang_thai === 1
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {selectedTicket.trang_thai === 1 ? 'Đã xử lý' : 'Chưa xử lý'}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="mb-2">Nội dung yêu cầu</h4>
                <div className="p-4 bg-gray-50 rounded">
                  <p>{selectedTicket.noi_dung}</p>
                </div>
              </div>

              {selectedTicket.trang_thai === 0 && (
                <div>
                  <h4 className="mb-2">Trả lời khách hàng</h4>
                  <textarea
                    rows={4}
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Nhập nội dung phản hồi..."
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button
                    onClick={handleResolve}
                    disabled={!responseText.trim()}
                    className="mt-2 flex items-center gap-2 bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Gửi phản hồi
                  </button>
                </div>
              )}

              {selectedTicket.trang_thai === 1 && (
                <div>
                  <h4 className="mb-2">Phản hồi đã gửi</h4>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                    <p>Đã xử lý yêu cầu.</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Đã xử lý bởi: {selectedTicket.ma_admin_xu_ly ? selectedTicket.ma_admin_xu_ly.toString().slice(-6).toUpperCase() : 'Admin'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
