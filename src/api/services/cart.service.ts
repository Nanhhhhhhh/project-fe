import axiosInstance from '../axiosInstance';

export const cartService = {
  getCart: async () => {
    const response = await axiosInstance.get('/carts');
    return response.data;
  },
  addItem: async (ma_sp_chi_tiet: string, so_luong: number) => {
    const response = await axiosInstance.post('/carts/add', { ma_sp_chi_tiet, so_luong });
    return response.data;
  },
  updateItem: async (ma_sp_chi_tiet: string, so_luong: number) => {
    const response = await axiosInstance.patch(`/carts/item/${ma_sp_chi_tiet}`, { so_luong });
    return response.data;
  },
  removeItem: async (ma_sp_chi_tiet: string) => {
    const response = await axiosInstance.delete(`/carts/item/${ma_sp_chi_tiet}`);
    return response.data;
  },
  clearCart: async () => {
    const response = await axiosInstance.delete('/carts/clear');
    return response.data;
  },
};
