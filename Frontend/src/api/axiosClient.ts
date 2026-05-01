import axios from 'axios';
import authApi from './AuthAPI';
import { type refreshFormData } from '../types/user';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5074/api',//` Thay đổi URL này thành URL của API của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if(originalRequest.url.includes('/auth/login'))
    {
      return Promise.reject(error);
    }
    if(originalRequest.url.includes('/auth/refresh-token'))
    {
      return Promise.reject(error);
    }
    if (error.response?.status === 401  && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const form= {
          accessToken: localStorage.getItem('access_token') || '',
          refreshToken: localStorage.getItem('refresh_token') || ''
        } as refreshFormData;
        const response = await authApi.refresh(form);
        localStorage.setItem('access_token', response.data.accessToken);
        originalRequest.headers['Authorization'] = 'Bearer ' + response.data.accessToken;
      } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

          window.location.href = '/signin';

        // Trả về lỗi để chặn các logic xử lý phía sau
        return Promise.reject(error);
      }
      return axiosClient(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;