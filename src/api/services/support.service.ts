import axiosInstance from '../axiosInstance';

export const supportService = {
  getAll: async () => {
    const response = await axiosInstance.get('/supports');
    return response.data;
  },
  resolve: async (id: string) => {
    const response = await axiosInstance.patch(`/supports/${id}/resolve`, {});
    return response.data;
  },
};
