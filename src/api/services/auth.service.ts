import axiosInstance from '../axiosInstance';

export const authService = {
  loginCustomer: async (credentials: { email: string; pass: string }) => {
    const response = await axiosInstance.post('/auth/customer/login', {
      email: credentials.email,
      password: credentials.pass,
    });
    return response.data;
  },
  loginEmployee: async (credentials: { email: string; pass: string }) => {
    const response = await axiosInstance.post('/auth/employee/login', {
      email: credentials.email,
      password: credentials.pass,
    });
    return response.data;
  },
  loginAdmin: async (credentials: { email: string; pass: string }) => {
    const response = await axiosInstance.post('/auth/admin/login', {
      email: credentials.email,
      password: credentials.pass,
    });
    return response.data;
  },
};
