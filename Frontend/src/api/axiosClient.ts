import axios from 'axios';
import authApi from './AuthAPI';
import { type refreshFormData } from '../types/user';

const axiosClient = axios.create({
  // Tự động lấy cấu hình từ file .env, nếu không có thì mới dùng localhost làm dự phòng
  baseURL: (import.meta as any).env.VITE_API_URL || 'http://localhost:5074/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => { //Interceptor = chặn request trước khi gửi.
  
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; //nếu có tự gắn header
  }
  return config;
});

axiosClient.interceptors.response.use(  //Nó chặn response sau khi API trả về.
  (response) => response, //Nếu response OK trả bình thường.  
  async (error) => { // nếu access token hết hạn thì trả về error
    const originalRequest = error.config; //Lấy request cũ được lưu lại để lát retry (tự đông gửi lại request sau khi refresh token)

    if(originalRequest.url.includes('/auth/login')) //Không refresh nếu đang login, nếu ko login fail → refresh token → loop vô hạn
    {
      return Promise.reject(error);
    }
    if(originalRequest.url.includes('/auth/refresh-token')) // KHÔNG cho refresh token tự refresh chính nó
    {
      return Promise.reject(error);
    }
    if (error.response?.status === 401  && !originalRequest._retry) { //Nếu access token hết hạn
      originalRequest._retry = true;
      try {
        const form= {
          accessToken: localStorage.getItem('access_token') || '', //lấy access token đã login trước đó.
          refreshToken: localStorage.getItem('refresh_token') || '' //Gọi refresh token
        } as refreshFormData;
        const response = await authApi.refresh(form);
        localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        originalRequest.headers['Authorization'] = 'Bearer ' + response.data.accessToken;
      } catch (error) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        localStorage.removeItem('warehouse');
        // window.location.href = '/signin';

        // Trả về lỗi để chặn các logic xử lý phía sau
        return Promise.reject(error);
      }
      return axiosClient(originalRequest); //Retry request cũ
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
