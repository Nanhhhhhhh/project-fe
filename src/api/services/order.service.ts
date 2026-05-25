import axiosInstance from '../axiosInstance';

export const orderService = {
  placeOrder: async (data: { dia_chi_nhan: string; ghi_chu?: string; phuong_thuc_thanh_toan: number }) => {
    const response = await axiosInstance.post('/orders', data);
    return response.data;
  },
  createManualOrder: async (data: any) => {
    const response = await axiosInstance.post('/orders/manual', data);
    return response.data;
  },
  getMyOrders: async () => {
    const response = await axiosInstance.get('/orders/me');
    return response.data;
  },
  findAll: async (params?: any) => {
    const response = await axiosInstance.get('/orders', { params });
    return response.data;
  },
  findOne: async (id: string) => {
    const response = await axiosInstance.get(`/orders/${id}`);
    return response.data;
  },
  updateStatus: async (id: string, trang_thai_don_hang: number) => {
    const response = await axiosInstance.patch(`/orders/${id}/status`, { trang_thai_don_hang });
    return response.data;
  },
};
