import axiosInstance from '../axiosInstance';

export const productService = {
  getAll: async (params?: any) => {
    const response = await axiosInstance.get('/products', { params });
    return response.data;
  },
  getOne: async (id: number) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await axiosInstance.post('/products', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await axiosInstance.patch(`/products/${id}`, data);
    return response.data;
  },
  remove: async (id: number) => {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  },
};
