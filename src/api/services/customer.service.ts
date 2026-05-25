import axiosInstance from '../axiosInstance';

export const customerService = {
  getAll: async () => {
    const response = await axiosInstance.get('/customers');
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await axiosInstance.get(`/customers/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await axiosInstance.post('/customers', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await axiosInstance.patch(`/customers/${id}`, data);
    return response.data;
  },
  remove: async (id: string) => {
    const response = await axiosInstance.delete(`/customers/${id}`);
    return response.data;
  },
};
