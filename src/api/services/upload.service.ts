import axiosInstance from '../axiosInstance';

export const uploadService = {
  uploadProductImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axiosInstance.post('/upload/product-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Expected { url: string }
  },
};
