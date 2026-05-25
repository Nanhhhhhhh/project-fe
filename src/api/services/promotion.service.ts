import axiosInstance from '../axiosInstance';

export const promotionService = {
  getAll: async () => {
    const response = await axiosInstance.get('/promotions');
    return response.data;
  },
  create: async (data: any) => {
    const response = await axiosInstance.post('/promotions', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await axiosInstance.patch(`/promotions/${id}`, data);
    return response.data;
  },
  remove: async (id: string) => {
    const response = await axiosInstance.delete(`/promotions/${id}`);
    return response.data;
  },
};
