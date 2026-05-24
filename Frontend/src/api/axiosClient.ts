import axios from 'axios';
import authApi from './AuthAPI';
import { type refreshFormData } from '../types/user';

const axiosClient = axios.create({
  // Tu dong lay cau hinh tu file .env, neu khong co thi moi dung localhost lam du phong
  baseURL: (import.meta as any).env.VITE_API_URL || 'http://localhost:5074/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

let refreshPromise: Promise<string> | null = null;

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
    const originalRequest = error.config as (typeof error.config & { _retry?: boolean });

    if (originalRequest?.url?.includes('/auth/login')) {
      return Promise.reject(error);
    }

    if (originalRequest?.url?.includes('/auth/refresh-token')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = (async () => {
            const form = {
              accessToken: localStorage.getItem('access_token') || '',
              refreshToken: localStorage.getItem('refresh_token') || '',
            } as refreshFormData;

            const response = await authApi.refresh(form);
            localStorage.setItem('access_token', response.data.accessToken);
            localStorage.setItem('refresh_token', response.data.refreshToken);

            return response.data.accessToken as string;
          })().finally(() => {
            refreshPromise = null;
          });
        }

        const newAccessToken = await refreshPromise;
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        localStorage.removeItem('warehouse');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
