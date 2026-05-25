import axiosInstance from '../axiosInstance';

export const invoiceService = {
  generateInvoice: async (data: { ma_don_hang: string }) => {
    const response = await axiosInstance.post('/invoices', data);
    return response.data;
  },
  findAll: async (params?: any) => {
    const response = await axiosInstance.get('/invoices', { params });
    return response.data;
  },
};
