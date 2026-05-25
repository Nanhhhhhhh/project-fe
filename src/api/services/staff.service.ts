import axiosInstance from '../axiosInstance';

export const staffService = {
  getAll: async () => {
    const response = await axiosInstance.get('/employees');
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await axiosInstance.get(`/employees/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await axiosInstance.post('/employees', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await axiosInstance.patch(`/employees/${id}`, data);
    return response.data;
  },
  remove: async (id: string) => {
    const response = await axiosInstance.delete(`/employees/${id}`);
    return response.data;
  },
};
